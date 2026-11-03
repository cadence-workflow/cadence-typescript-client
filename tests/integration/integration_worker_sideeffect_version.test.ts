/*
 * End-to-end integration: SIDE EFFECT + GET VERSION — non-deterministic code capture and
 * change versioning through a real Cadence server.
 *
 * SideEffect runs a non-deterministic function ONCE, records its encoded result as a
 * SideEffect marker in history, and serves the recorded value on replay. GetVersion
 * records a Version marker the first time a change ID is seen and returns the same
 * version forever after. The workflow blocks on both and completes with the values.
 *
 * What this proves beyond the earlier integration tests:
 *   - The marker recording path for sideEffect and version markers (recordVersionMarker,
 *     the sideEffect decision), not just the local-activity marker.
 *   - handleMarkerRecorded's decode of BOTH marker shapes on replay-capable histories
 *     (the decode-box protocol on multi-value EncodedValues).
 *   - The SideEffect future delivers the recorded EncodedValue through futureImpl.Get's
 *     raw-assign path (a struct out-param, not a byte-slice target).
 */
import { describe, it, expect } from 'vitest';
import { New as NewWorker } from '../../src/worker/worker.js';
import { WorkerOptions } from '../../src/internal/worker.js';
import { SideEffect, GetVersion } from '../../src/workflow/workflow.js';
import { internal_Version } from '../../src/internal/workflow.js';
import { Ref } from '../../src/internal/runtime/ref.js';
import { newWorkflowServiceClient } from '../../src/workflow_service_client.js';
import { clientFromService, showWorkflow, startWorkflow } from './harness.js';

export const DOMAIN = process.env.CADENCE_DOMAIN ?? 'default';
export const TASK_LIST = `condorance-smoke-sev-tasklist-${Date.now()}`;

describe('generated worker engine -> real Cadence server (side effect + version)', () => {
  it('records SideEffect and Version markers and completes with their values', async () => {
    const observed = { wfStarted: false, sideEffectRuns: 0, seGot: '', versionGot: -999 };

    async function SmokeSideEffectWF(ctx: any): Promise<string> {
      observed.wfStarted = true;

      const value = await SideEffect(ctx, () => {
        observed.sideEffectRuns++;
        return 'lucky-42';
      });
      const seBox = new Ref<unknown>(undefined);
      value.Get(seBox);
      observed.seGot = String(seBox.value);

      const version = await GetVersion(ctx, 'smoke-change', internal_Version.DefaultVersion, 2 as internal_Version);
      observed.versionGot = version as number;

      return `se:${seBox.value};v:${version}`;
    }

    const service = newWorkflowServiceClient({ address: '127.0.0.1:7833', caller: 'condorance-smoke' });
    const client = clientFromService(service, DOMAIN, 'condorance-smoke-sev-client');
    const worker = await NewWorker(
      service as any,
      DOMAIN,
      TASK_LIST,
      new WorkerOptions({ Identity: 'condorance-smoke-sev-worker', DisableActivityWorker: true }) as any,
    );
    worker.RegisterWorkflow(SmokeSideEffectWF);
    worker.Start();

    const workflowID = `condorance-smoke-sev-${Date.now()}`;
    try {
      await startWorkflow(client, {
        workflowID,
        taskList: TASK_LIST,
        workflowType: 'SmokeSideEffectWF',
        executionTimeoutSeconds: 60,
        decisionTimeoutSeconds: 10,
      });

      await waitUntil(() => observed.versionGot !== -999, 30_000, 'workflow never passed GetVersion');

      expect(observed.wfStarted).toBe(true);
      expect(observed.sideEffectRuns).toBe(1);
      expect(observed.seGot).toBe('lucky-42');
      // Fresh execution takes maxSupported.
      expect(observed.versionGot).toBe(2);

      await waitUntil(async () => {
        const out = await showWorkflow(client, workflowID);
        return /WorkflowExecutionCompleted/.test(out);
      }, 30_000, 'server never recorded completion');

      const history = await showWorkflow(client, workflowID);
      // Both markers must be durably recorded.
      expect(history).toMatch(/MarkerRecorded[^\n]*"markerName":"SideEffect"/);
      expect(history).toMatch(/MarkerRecorded[^\n]*"markerName":"Version"/);
      expect(history).toContain('se:lucky-42;v:2');
    } finally {
      worker.Stop();
      service.close();
    }
  }, 90_000);
});

async function waitUntil(cond: () => boolean | Promise<boolean>, timeoutMs: number, what: string): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (await cond()) return;
    await new Promise((r) => setTimeout(r, 100));
  }
  throw new Error(`timed out after ${timeoutMs}ms: ${what}`);
}
