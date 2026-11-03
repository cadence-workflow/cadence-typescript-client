/*
 * End-to-end integration: CHILD WORKFLOW RETRY ON TIMEOUT — a child that outlives its own
 * ExecutionStartToCloseTimeout is timed out BY THE SERVER and rescheduled under its
 * RetryPolicy (mirrors go-client TestChildWFRetryOnTimeout).
 *
 * The first two child runs park on a 60s durable timer inside a 3s execution
 * timeout, so only the server timeout can end them; the third run returns
 * immediately. The parent blocks on one child future and sees only the final
 * success. Every retry is a NEW child execution, so a run counter in test scope
 * observes each attempt.
 */
import { describe, it, expect } from 'vitest';
import { New as NewWorker } from '../../src/worker/worker.js';
import { WorkerOptions } from '../../src/internal/worker.js';
import { ExecuteChildWorkflow } from '../../src/workflow/workflow.js';
import { WithChildOptions } from '../../src/workflow/workflow_options.js';
import { Sleep } from '../../src/workflow/deterministic_wrappers.js';
import { Ref } from '../../src/internal/runtime/ref.js';
import { newWorkflowServiceClient } from '../../src/workflow_service_client.js';
import { clientFromService, showWorkflow, startWorkflow } from './harness.js';

export const DOMAIN = process.env.CADENCE_DOMAIN ?? 'default';
export const TASK_LIST = `condorance-smoke-childtimeout-tasklist-${Date.now()}`;

export const ONE_MINUTE_NS = 60_000_000_000;
export const ONE_SECOND_NS = 1_000_000_000;

const observed = { childRuns: 0 };

export async function TimeoutChildWF(ctx: any): Promise<string> {
  observed.childRuns++;
  if (observed.childRuns < 3) {
    // Far past the child's 3s execution timeout — only the server can end this run.
    await Sleep(ctx, ONE_MINUTE_NS);
    return 'child-slept-through';
  }
  return `child-succeeded-on-run-${observed.childRuns}`;
}

export async function ChildTimeoutParentWF(ctx: any): Promise<string> {
  // Value-typed fields all present (task #270: omitted required field -> NaN on the wire).
  const cctx = WithChildOptions(ctx, {
    Domain: DOMAIN,
    WorkflowID: '',
    TaskList: TASK_LIST,
    ExecutionStartToCloseTimeout: 3 * ONE_SECOND_NS,
    TaskStartToCloseTimeout: 2 * ONE_SECOND_NS,
    WaitForCancellation: false,
    WorkflowIDReusePolicy: 0,
    CronSchedule: '',
    ParentClosePolicy: 0,
    Bugports: {},
    RetryPolicy: {
      InitialInterval: ONE_SECOND_NS,
      BackoffCoefficient: 1.0,
      MaximumInterval: ONE_SECOND_NS,
      ExpirationInterval: 0,
      MaximumAttempts: 5,
      NonRetriableErrorReasons: [],
    },
  } as never);
  const future = await ExecuteChildWorkflow(cctx, 'TimeoutChildWF', null);
  const box = new Ref<unknown>(undefined);
  await future.Get(cctx, box);
  return `parent-saw:${box.value}`;
}

describe('generated worker engine -> real Cadence server (child retry on timeout)', () => {
  it('server times out the long child runs and the retry succeeds', async () => {
    const service = newWorkflowServiceClient({ address: '127.0.0.1:7833', caller: 'condorance-smoke' });
    const client = clientFromService(service, DOMAIN, 'condorance-smoke-childtimeout');
    const worker = await NewWorker(
      service as any, DOMAIN, TASK_LIST,
      new WorkerOptions({ Identity: 'condorance-smoke-childtimeout-worker', DisableActivityWorker: true }) as any,
    );
    worker.RegisterWorkflow(ChildTimeoutParentWF);
    worker.RegisterWorkflow(TimeoutChildWF);
    worker.Start();

    const workflowID = `condorance-smoke-childtimeout-${Date.now()}`;
    try {
      await startWorkflow(client, {
        workflowID,
        taskList: TASK_LIST,
        workflowType: 'ChildTimeoutParentWF',
        executionTimeoutSeconds: 120,
        decisionTimeoutSeconds: 10,
      });

      let history = '';
      await waitUntil(async () => {
        history = await showWorkflow(client, workflowID);
        // Anchor away from ChildWorkflowExecutionTimedOut/-Failed entries: only the
        // PARENT's own terminal event ends the wait.
        return /(?<!Child)WorkflowExecution(Completed|Failed|TimedOut)\b/.test(history);
      }, 60_000, 'child-timeout parent never reached a terminal event');
      expect(history).toMatch(/WorkflowExecutionCompleted/);
      expect(history).toContain('parent-saw:child-succeeded-on-run-3');
      expect(observed.childRuns).toBe(3);
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
