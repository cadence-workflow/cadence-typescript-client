/*
 * End-to-end integration: LOCAL ACTIVITY — ExecuteLocalActivity round trip through a real
 * Cadence server.
 *
 * A local activity runs IN the workflow worker during decision processing — no
 * ActivityTaskScheduled server round trip. Its result is durably recorded as a
 * MarkerRecorded (LocalActivity marker) event so replay can serve it without re-running
 * the function. The workflow blocks on the returned future and completes with the
 * activity's result.
 *
 * What this proves beyond the activity integration:
 *   - The local-activity task path (localActivityTaskPoller / laTunnel), not the server
 *     activity tasklist.
 *   - Marker recording: history must show MarkerRecorded and must NOT show
 *     ActivityTaskScheduled.
 *   - Result delivery through the local-activity future into the workflow.
 */
import { describe, it, expect } from 'vitest';
import { Ref } from '../../src/internal/runtime/ref.js';
import { WorkerOptions } from '../../src/internal/worker.js';
import { New as NewWorker } from '../../src/worker/worker.js';
import { WithLocalActivityOptions } from '../../src/workflow/activity_options.js';
import { ExecuteLocalActivity } from '../../src/workflow/workflow.js';
import { newWorkflowServiceClient } from '../../src/workflow_service_client.js';
import { clientFromService, showWorkflow, startWorkflow } from './harness.js';

export const DOMAIN = process.env.CADENCE_DOMAIN ?? 'default';
export const TASK_LIST = `condorance-smoke-la-tasklist-${Date.now()}`;

// Go time.Duration nanoseconds.
export const TEN_SECONDS_NS = 10_000_000_000;

describe('generated worker engine -> real Cadence server (local activity)', () => {
  it('runs the local activity in-process and records a marker', async () => {
    const observed = { wfStarted: false, laRan: 0, laArg: '', wfGot: '' };

    async function EchoLocalActivity(_ctx: any, input: string): Promise<string> {
      observed.laRan++;
      observed.laArg = input;
      return `la-echo:${input}`;
    }

    async function SmokeLocalActivityWF(ctx: any): Promise<string> {
      observed.wfStarted = true;
      const lctx = WithLocalActivityOptions(ctx, {
        ScheduleToCloseTimeout: TEN_SECONDS_NS,
      } as never);
      const future = await ExecuteLocalActivity(lctx, EchoLocalActivity, 'ping');
      const box = new Ref<unknown>(undefined);
      await future.Get(lctx, box);
      observed.wfGot = String(box.value);
      return `la-saw:${box.value}`;
    }

    const service = newWorkflowServiceClient({ address: '127.0.0.1:7833', caller: 'condorance-smoke' });
    const client = clientFromService(service, DOMAIN, 'condorance-smoke-la-client');
    const worker = await NewWorker(
      service as any,
      DOMAIN,
      TASK_LIST,
      new WorkerOptions({ Identity: 'condorance-smoke-la-worker', DisableActivityWorker: true }) as any,
    );
    worker.RegisterWorkflow(SmokeLocalActivityWF);
    worker.Start();

    const workflowID = `condorance-smoke-la-${Date.now()}`;
    try {
      await startWorkflow(client, {
        workflowID,
        taskList: TASK_LIST,
        workflowType: 'SmokeLocalActivityWF',
        executionTimeoutSeconds: 120,
        decisionTimeoutSeconds: 10,
      });
      await waitUntil(() => observed.wfStarted, 20_000, 'workflow body never started');
      await waitUntil(() => observed.laRan > 0, 30_000, 'local activity never ran');
      expect(observed.laArg).toBe('ping');

      let history = '';
      await waitUntil(async () => {
        history = await showWorkflow(client, workflowID);
        return /WorkflowExecutionCompleted|WorkflowExecutionFailed|WorkflowExecutionTimedOut/.test(history);
      }, 30_000, 'server never recorded a terminal event');
      expect(history).toMatch(/MarkerRecorded/);
      // Local means local: the server never schedules a regular activity task.
      expect(history).not.toMatch(/ActivityTaskScheduled/);
      expect(history).toMatch(/WorkflowExecutionCompleted/);
      expect(history).toContain('la-saw:la-echo:ping');
      expect(observed.wfGot).toBe('la-echo:ping');
    } finally {
      worker.Stop();
      service.close();
    }
  }, 120_000);
});

async function waitUntil(cond: () => boolean | Promise<boolean>, timeoutMs: number, what: string): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (await cond()) return;
    await new Promise((r) => setTimeout(r, 100));
  }
  throw new Error(`timed out after ${timeoutMs}ms: ${what}`);
}
