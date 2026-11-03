/*
 * End-to-end integration: workflow SHAPES beyond the signal lane, on a REAL Cadence server.
 *
 * integration_worker.test.ts proves the engine's suspend/resume core with a void, no-argument
 * workflow. This file walks the remaining basic shapes, one test per shape, so a failure
 * names the exact frontier:
 *
 *   1. ARGUMENT DELIVERY — the start input must arrive in the workflow function's parameter
 *      (exercises history-input decode: decodeArgsToValues -> FromData -> Unmarshal, the
 *      value-box write-through path).
 *   2. RESULT DELIVERY — the returned value must appear in the server-recorded
 *      WorkflowExecutionCompleted event (exercises serializeResults under the erased Go
 *      error slot: a TS `return x` arrives as `[x]`, never `[x, error]`).
 *
 * Both run against the same live server and the same generated engine as the signal test;
 * only the workflow function differs. The server's CLOSE STATUS is the assertion of record —
 * an in-process green with a server-side FAILED is a failure (a decision the server rejects
 * is invisible to module state).
 */
import { describe, it, expect } from 'vitest';
import { New as NewWorker } from '../../src/worker/worker.js';
import { WorkerOptions } from '../../src/internal/worker.js';
import { newWorkflowServiceClient } from '../../src/workflow_service_client.js';
import { clientFromService, showWorkflow, startWorkflow } from './harness.js';

export const DOMAIN = process.env.CADENCE_DOMAIN ?? 'default';
export const TASK_LIST = 'condorance-smoke-shapes-tasklist';

// Module-state observation channel, same replay caveat as the signal integration: every decision
// task re-executes the function from history, so reads below take the FINAL replay's view.
const observed: { arg: unknown; finished: boolean; noArgFinished: boolean } = {
  arg: undefined,
  finished: false,
  noArgFinished: false,
};

export async function EchoWorkflow(ctx: unknown, name: string): Promise<string> {
  observed.arg = name;
  observed.finished = true;
  return `hello ${name}`;
}

// Isolates RESULT DELIVERY from argument decode: no input, fixed return value.
export async function FixedResultWorkflow(ctx: unknown): Promise<string> {
  observed.noArgFinished = true;
  return 'fixed-result';
}

describe('generated worker engine -> real Cadence server (shapes)', () => {
  it('records a returned result in the server-side completion event (no arguments)', async () => {
    const service = newWorkflowServiceClient({ address: '127.0.0.1:7833', caller: 'condorance-smoke' });
    const client = clientFromService(service, DOMAIN, 'condorance-smoke-shapes-client');
    const worker = await NewWorker(
      service as any,
      DOMAIN,
      TASK_LIST,
      new WorkerOptions({ Identity: 'condorance-smoke-worker', DisableActivityWorker: true }) as any,
    );
    worker.RegisterWorkflow(FixedResultWorkflow);
    worker.Start();

    const workflowID = `condorance-smoke-result-${Date.now()}`;
    try {
      const execution = await startWorkflow(client, {
        workflowID,
        taskList: TASK_LIST,
        workflowType: 'FixedResultWorkflow',
        executionTimeoutSeconds: 60,
        decisionTimeoutSeconds: 10,
      });

      await waitUntil(() => observed.noArgFinished, 20_000, 'workflow body never finished');

      let history = '';
      await waitUntil(async () => {
        history = await showWorkflow(client, workflowID, execution.runId);
        return /WorkflowExecutionCompleted|WorkflowExecutionFailed|WorkflowExecutionTimedOut/.test(history);
      }, 20_000, 'server never recorded a terminal event');
      expect(history).toMatch(/WorkflowExecutionCompleted/);
      expect(history).toContain('fixed-result');
    } finally {
      worker.Stop();
      service.close();
    }
  }, 90_000);

  it('delivers the start argument and records the returned result', async () => {
    const service = newWorkflowServiceClient({ address: '127.0.0.1:7833', caller: 'condorance-smoke' });
    const client = clientFromService(service, DOMAIN, 'condorance-smoke-shapes-client');
    const worker = await NewWorker(
      service as any,
      DOMAIN,
      TASK_LIST,
      new WorkerOptions({ Identity: 'condorance-smoke-worker', DisableActivityWorker: true }) as any,
    );
    worker.RegisterWorkflow(EchoWorkflow);
    worker.Start();

    const workflowID = `condorance-smoke-echo-${Date.now()}`;
    try {
      const execution = await startWorkflow(client, {
        workflowID,
        taskList: TASK_LIST,
        workflowType: 'EchoWorkflow',
        executionTimeoutSeconds: 60,
        decisionTimeoutSeconds: 10,
        args: ['world'],
      });

      await waitUntil(() => observed.finished, 20_000, 'workflow body never finished');
      // ARGUMENT DELIVERY: the client passed the string "world"; anything else here means
      // the input-decode path dropped or mangled the argument.
      expect(observed.arg).toBe('world');

      // RESULT DELIVERY: the server history must close with WorkflowExecutionCompleted and
      // the completion event must carry the returned string. Poll because the final
      // RespondDecisionTaskCompleted races this assertion.
      let history = '';
      await waitUntil(async () => {
        history = await showWorkflow(client, workflowID, execution.runId);
        return /WorkflowExecutionCompleted|WorkflowExecutionFailed|WorkflowExecutionTimedOut/.test(history);
      }, 20_000, 'server never recorded a terminal event');
      expect(history).toMatch(/WorkflowExecutionCompleted/);
      expect(history).toContain('hello world');
    } finally {
      worker.Stop();
      service.close();
    }
  }, 90_000);
});

async function waitUntil(
  cond: () => boolean | Promise<boolean>,
  timeoutMs: number,
  what: string,
): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (await cond()) return;
    await new Promise((r) => setTimeout(r, 100));
  }
  throw new Error(`timed out after ${timeoutMs}ms: ${what}`);
}
