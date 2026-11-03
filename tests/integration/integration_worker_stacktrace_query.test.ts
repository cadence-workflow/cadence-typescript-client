/*
 * End-to-end integration: BUILT-IN __stack_trace QUERY — mirrors go-client TestStackTraceQuery.
 *
 * While a workflow is PARKED on a signal channel, client.QueryWorkflow with the built-in
 * QueryTypeStackTrace must return a textual dump of the suspended coroutine stacks. This
 * exercises, beyond the plain query test (which drives a user handler via the SDK client):
 *   - the NATIVE client.QueryWorkflow path (request construction + EncodedValue decode),
 *   - the engine's built-in query routing (__stack_trace is answered by the task handler
 *     itself, not a user-registered handler),
 *   - stack capture across a parked coroutine (the whole point of the Go test).
 */
import { describe, it, expect } from 'vitest';
import { QueryTypeStackTrace } from '../../src/client/client.js';
import { internal_WorkflowIDReusePolicy } from '../../src/internal/client.js';
import { WorkerOptions } from '../../src/internal/worker.js';
import { GetSignalChannel } from '../../src/workflow/workflow.js';
import { New as NewWorker } from '../../src/worker/worker.js';
import { newWorkflowServiceClient } from '../../src/workflow_service_client.js';
import {
  clientFromService,
  queryWorkflow,
  showWorkflow,
  signalWorkflow,
  startWorkflow,
} from './harness.js';

export const DOMAIN = process.env.CADENCE_DOMAIN ?? 'default';
export const TASK_LIST = `condorance-smoke-stacktrace-tasklist-${Date.now()}`;
export const WORKFLOW_ID = `condorance-smoke-stacktrace-${Date.now()}`;
export const SIGNAL_NAME = 'stacktrace-release';

const observed = { parked: false, released: false };

export async function StackTraceProbeWorkflow(ctx: unknown): Promise<string> {
  const ch = GetSignalChannel(ctx as never, SIGNAL_NAME);
  observed.parked = true;
  await (ch as any).Receive(ctx, { value: undefined });
  observed.released = true;
  return 'released';
}

describe('generated client + worker -> real Cadence server (__stack_trace query)', () => {
  it('returns the parked coroutine stack for the built-in stack-trace query', async () => {
    const service = newWorkflowServiceClient({ address: '127.0.0.1:7833', caller: 'condorance-smoke' });
    const worker = await NewWorker(
      service as any,
      DOMAIN,
      TASK_LIST,
      new WorkerOptions({ Identity: 'condorance-smoke-worker', DisableActivityWorker: true }) as any,
    );
    worker.RegisterWorkflow(StackTraceProbeWorkflow);
    worker.Start();

    const client = clientFromService(service, DOMAIN, 'condorance-smoke-stacktrace-client');

    try {
      const exec = await startWorkflow(client, {
        workflowID: WORKFLOW_ID,
        taskList: TASK_LIST,
        workflowType: 'StackTraceProbeWorkflow',
        executionTimeoutSeconds: 60,
        decisionTimeoutSeconds: 10,
        workflowIDReusePolicy:
          internal_WorkflowIDReusePolicy.WorkflowIDReusePolicyAllowDuplicate,
      });

      await waitUntil(() => observed.parked, 20_000, 'workflow never reached the park point');

      // Query the LIVE parked execution. Empty runID = latest run, as in Go.
      const stack = await queryWorkflow<string>(client, WORKFLOW_ID, QueryTypeStackTrace);
      expect(stack).toBeDefined();
      // The Go test asserts the workflow function's frame is visible; our engine dumps
      // the JS stacks of parked coroutines, so the workflow function name must appear.
      expect(stack.length).toBeGreaterThan(0);
      expect(stack).toContain('StackTraceProbeWorkflow');

      await signalWorkflow(client, WORKFLOW_ID, SIGNAL_NAME, 'go');
      await waitUntil(() => observed.released, 20_000, 'signal never released the workflow');
      await waitUntil(
        async () => /WorkflowExecutionCompleted/.test(
          await showWorkflow(client, WORKFLOW_ID, exec.runId),
        ),
        20_000, 'run never completed on the server',
      );
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
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error(`timed out after ${timeoutMs}ms: ${what}`);
}
