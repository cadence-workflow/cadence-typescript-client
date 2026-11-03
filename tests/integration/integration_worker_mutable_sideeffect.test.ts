/*
 * End-to-end integration: MUTABLE SIDE EFFECT — MutableSideEffect records a marker only
 * when the observed value CHANGES, serves the recorded value during replay, and
 * re-records when the live value differs (upstream covers this API by unit tests
 * only; no integration fixture exists).
 *
 * Shape (sticky DISABLED, so every decision is a full replay — the strongest
 * consistency setting for this API):
 *   decision 1: MutableSideEffect reads live value 100 -> marker(100); Sleep starts.
 *   test flips the live value to 200 while the timer runs.
 *   decision 2 (full replay): the FIRST call must return the RECORDED 100, not the
 *   live 200 — that is the marker-replay assertion; the post-timer SECOND call runs
 *   live, sees 200 != 100, records a second marker and returns 200.
 * Workflow result "100:200" therefore proves both halves in one run.
 */
import { describe, it, expect } from 'vitest';
import { Ref } from '../../src/internal/runtime/ref.js';
import { WorkerOptions } from '../../src/internal/worker.js';
import { New as NewWorker } from '../../src/worker/worker.js';
import { Sleep } from '../../src/workflow/deterministic_wrappers.js';
import { MutableSideEffect } from '../../src/workflow/workflow.js';
import { newWorkflowServiceClient } from '../../src/workflow_service_client.js';
import { clientFromService, showWorkflow, startWorkflow } from './harness.js';

export const DOMAIN = process.env.CADENCE_DOMAIN ?? 'default';
export const TASK_LIST = 'condorance-smoke-mse-tasklist';
export const FIVE_SECONDS_NS = 5_000_000_000;

const observed = { liveValue: 100, decision1Done: false, wfResult: '' };

export async function MutableSideEffectWorkflow(ctx: unknown): Promise<string> {
  const eq = (a: unknown, b: unknown) => a === b;
  const read = async (): Promise<number> => {
    const v = await MutableSideEffect(ctx as never, 'mse-id', () => observed.liveValue, eq);
    const box = new Ref<unknown>(undefined);
    (v as { Get(b: Ref<unknown>): unknown }).Get(box);
    return Number(box.value);
  };
  const first = await read();
  observed.decision1Done = true;
  await Sleep(ctx as never, FIVE_SECONDS_NS);
  const second = await read();
  observed.wfResult = `${first}:${second}`;
  return observed.wfResult;
}

describe('generated worker engine -> real Cadence server (MutableSideEffect)', () => {
  it('serves the recorded value on replay and re-records when the live value changes', async () => {
    observed.liveValue = 100;
    const service = newWorkflowServiceClient({ address: '127.0.0.1:7833', caller: 'condorance-smoke' });
    const client = clientFromService(service, DOMAIN, 'condorance-smoke-mse-client');
    const worker = await NewWorker(
      service as any, DOMAIN, TASK_LIST,
      new WorkerOptions({
        Identity: 'condorance-smoke-worker',
        DisableStickyExecution: true,
      }) as any,
    );
    worker.RegisterWorkflow(MutableSideEffectWorkflow);
    worker.Start();

    const workflowID = `condorance-smoke-mse-${Date.now()}`;
    try {
      await startWorkflow(client, {
        workflowID,
        taskList: TASK_LIST,
        workflowType: 'MutableSideEffectWorkflow',
        executionTimeoutSeconds: 60,
        decisionTimeoutSeconds: 10,
      });

      await waitUntil(() => observed.decision1Done, 30_000, 'first MutableSideEffect never ran');
      // Flip the live value while the durable timer runs: the replayed first call
      // must NOT see this.
      observed.liveValue = 200;

      await waitUntil(() => observed.wfResult !== '', 40_000, 'workflow never finished both reads');
      expect(observed.wfResult).toBe('100:200');

      let history = '';
      await waitUntil(async () => {
        history = await showWorkflow(client, workflowID);
        return /WorkflowExecutionCompleted|WorkflowExecutionFailed|WorkflowExecutionTimedOut/.test(history);
      }, 20_000, 'server never recorded a terminal event');
      expect(history).toMatch(/WorkflowExecutionCompleted/);
      expect(history).toContain('100:200');
      // One marker per DISTINCT value: 100 then 200.
      const markers = history.match(/MarkerRecorded/g) ?? [];
      expect(markers.length).toBeGreaterThanOrEqual(2);
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
