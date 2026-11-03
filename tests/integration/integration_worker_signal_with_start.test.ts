/*
 * End-to-end integration: SIGNAL-WITH-START — client.SignalWithStartWorkflow against a real
 * Cadence server (mirrors go-client's signal-with-start behavior).
 *
 * One workflow ID, two SignalWithStartWorkflow calls:
 *   1. No execution exists -> the call must START the workflow AND deliver the first
 *      signal (SignalWithStartWorkflowExecution request construction).
 *   2. The run is still open -> the call must NOT start a new run (same RunID
 *      returned) and must deliver the second signal to the running execution.
 * The workflow collects two signals and completes; the result proves both signals
 * landed in order on one run.
 */
import { describe, it, expect } from 'vitest';
import { New as NewWorker } from '../../src/worker/worker.js';
import { WorkerOptions } from '../../src/internal/worker.js';
import { GetSignalChannel } from '../../src/workflow/workflow.js';
import { Ref } from '../../src/internal/runtime/ref.js';
import { background } from '../../src/internal/runtime/context.js';
import { newWorkflowServiceClient } from '../../src/workflow_service_client.js';
import { clientFromService, showWorkflow } from './harness.js';

export const DOMAIN = process.env.CADENCE_DOMAIN ?? 'default';
export const TASK_LIST = `condorance-smoke-sigstart-tasklist-${Date.now()}`;
export const WORKFLOW_ID = `condorance-smoke-sigstart-${Date.now()}`;
export const SIGNAL_NAME = 'accumulate';

export const SECOND_NS = 1_000_000_000;

const observed = { starts: 0 };

export async function SignalCollectorWorkflow(ctx: any): Promise<string> {
  observed.starts++;
  const ch = await GetSignalChannel(ctx, SIGNAL_NAME);
  const values: string[] = [];
  while (values.length < 2) {
    const box = new Ref<unknown>(undefined);
    await ch.Receive(ctx, box);
    values.push(String(box.value));
  }
  return `collected:${values.join(',')}`;
}

// Every value-typed field spelled out with its Go zero value (task #270: an omitted
// required field rides the thrift wire as NaN).
const startOptions = {
  ID: WORKFLOW_ID,
  TaskList: TASK_LIST,
  ExecutionStartToCloseTimeout: 60 * SECOND_NS,
  DecisionTaskStartToCloseTimeout: 10 * SECOND_NS,
  WorkflowIDReusePolicy: 0,
  CronSchedule: '',
  DelayStart: 0,
  JitterStart: 0,
  FirstRunAt: 0,
  CronOverlapPolicy: 0,
} as any;

describe('generated client + worker -> real Cadence server (signal-with-start)', () => {
  it('starts on the first call, signals the running execution on the second, one run collects both', async () => {
    const service = newWorkflowServiceClient({ address: '127.0.0.1:7833', caller: 'condorance-smoke' });
    const worker = await NewWorker(
      service as any, DOMAIN, TASK_LIST,
      new WorkerOptions({ Identity: 'condorance-smoke-sigstart-worker', DisableActivityWorker: true }) as any,
    );
    worker.RegisterWorkflow(SignalCollectorWorkflow);
    worker.Start();

    const client = clientFromService(service, DOMAIN, 'condorance-smoke-sigstart');

    try {
      const first: any = await client.SignalWithStartWorkflow(
        background() as any, WORKFLOW_ID, SIGNAL_NAME, 'one', startOptions, 'SignalCollectorWorkflow',
      );
      expect(first?.RunID?.length ?? 0).toBeGreaterThan(0);

      const second: any = await client.SignalWithStartWorkflow(
        background() as any, WORKFLOW_ID, SIGNAL_NAME, 'two', startOptions, 'SignalCollectorWorkflow',
      );
      // Still-open run: signal only, no new execution.
      expect(second?.RunID).toBe(first?.RunID);

      let history = '';
      await waitUntil(async () => {
        history = await showWorkflow(client, WORKFLOW_ID);
        return /WorkflowExecutionCompleted|WorkflowExecutionFailed|WorkflowExecutionTimedOut/.test(history);
      }, 30_000, 'signal-with-start run never reached a terminal event');
      expect(history).toContain('collected:one,two');
      expect(history).toMatch(/WorkflowExecutionCompleted/);
      expect(observed.starts).toBe(1);
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
