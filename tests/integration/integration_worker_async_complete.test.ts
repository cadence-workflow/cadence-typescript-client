/*
 * End-to-end integration: ASYNC ACTIVITY COMPLETION — an activity returns "result pending"
 * and is completed later from OUTSIDE the worker via client.CompleteActivity /
 * CompleteActivityByID (the human-in-the-loop shape from the cadence-samples
 * expense recipe; upstream covers this API by unit tests only).
 *
 * What this proves:
 *   - the activity worker recognizes the ErrActivityResultPending sentinel and does
 *     NOT respond to the server (convertActivityResultToRespondRequest returns the
 *     sentinel; the poller's respond path skips it) — the activity stays running
 *     server-side with no result;
 *   - client.CompleteActivity builds RespondActivityTaskCompleted from a raw task
 *     token captured inside the activity, and the workflow's ExecuteActivity future
 *     then resolves with the externally supplied value;
 *   - client.CompleteActivityByID does the same addressed by
 *     domain/workflowID/runID/activityID instead of the token.
 */
import { describe, it, expect } from 'vitest';
import { New as NewWorker } from '../../src/worker/worker.js';
import { WorkerOptions } from '../../src/internal/worker.js';
import { ExecuteActivity } from '../../src/workflow/workflow.js';
import { WithActivityOptions } from '../../src/workflow/activity_options.js';
import { GetInfo } from '../../src/activity/activity.js';
import { ErrActivityResultPending } from '../../src/internal/error.js';
import { background } from '../../src/internal/runtime/context.js';
import { newWorkflowServiceClient } from '../../src/workflow_service_client.js';
import { clientFromService, showWorkflow, startWorkflow } from './harness.js';

export const DOMAIN = process.env.CADENCE_DOMAIN ?? 'default';
export const TASK_LIST = 'condorance-smoke-asynccomplete-tasklist';

export const ONE_MINUTE_NS = 60_000_000_000;

// Module-scope mailboxes: the worker runs in-process, so the activity can hand its
// coordinates straight to the test. Replay caveat as in the other integration tests.
const observed: {
  taskToken: Buffer | null;
  activityID: string;
  runID: string;
  workflowResult: string;
} = { taskToken: null, activityID: '', runID: '', workflowResult: '' };

// Throwing the exact ErrActivityResultPending object is the TS lowering of Go's
// `return "", activity.ErrResultPending` — the handler matches it by identity.
export async function PendingTokenActivity(ctx: unknown): Promise<string> {
  const info = GetInfo(ctx as never);
  observed.taskToken = info.TaskToken ?? null;
  throw ErrActivityResultPending;
}

export async function PendingByIDActivity(ctx: unknown): Promise<string> {
  const info = GetInfo(ctx as never);
  observed.activityID = String(info.ActivityID ?? '');
  observed.runID = String(info.WorkflowExecution?.RunID ?? '');
  throw ErrActivityResultPending;
}

function makeWorkflow(activityName: string) {
  return async function (ctx: unknown): Promise<string> {
    const optCtx = WithActivityOptions(ctx as never, {
      TaskList: TASK_LIST,
      ScheduleToCloseTimeout: 0,
      ScheduleToStartTimeout: ONE_MINUTE_NS,
      StartToCloseTimeout: ONE_MINUTE_NS,
      HeartbeatTimeout: 0,
    } as never);
    const future = await ExecuteActivity(optCtx, activityName);
    const box: { value: unknown } = { value: undefined };
    await future.Get(optCtx, box);
    observed.workflowResult = String(box.value);
    return observed.workflowResult;
  };
}
export const AsyncCompleteTokenWorkflow = makeWorkflow('PendingTokenActivity');
Object.defineProperty(AsyncCompleteTokenWorkflow, 'name', { value: 'AsyncCompleteTokenWorkflow' });
export const AsyncCompleteByIDWorkflow = makeWorkflow('PendingByIDActivity');
Object.defineProperty(AsyncCompleteByIDWorkflow, 'name', { value: 'AsyncCompleteByIDWorkflow' });

describe('generated worker engine -> real Cadence server (async activity completion)', () => {
  it('CompleteActivity by task token resolves the pending activity from outside the worker', async () => {
    const service = newWorkflowServiceClient({ address: '127.0.0.1:7833', caller: 'condorance-smoke' });
    const worker = await NewWorker(
      service as any, DOMAIN, TASK_LIST,
      new WorkerOptions({ Identity: 'condorance-smoke-worker' }) as any,
    );
    worker.RegisterWorkflow(AsyncCompleteTokenWorkflow);
    worker.RegisterActivityWithOptions(PendingTokenActivity, { Name: 'PendingTokenActivity' } as never);
    worker.RegisterWorkflow(AsyncCompleteByIDWorkflow);
    worker.RegisterActivityWithOptions(PendingByIDActivity, { Name: 'PendingByIDActivity' } as never);
    worker.Start();

    const client = clientFromService(service, DOMAIN, 'condorance-smoke');

    const workflowID = `condorance-smoke-asynccomplete-${Date.now()}`;
    try {
      await startWorkflow(client, {
        workflowID,
        taskList: TASK_LIST,
        workflowType: 'AsyncCompleteTokenWorkflow',
        executionTimeoutSeconds: 120,
        decisionTimeoutSeconds: 10,
      });

      await waitUntil(() => observed.taskToken !== null, 30_000, 'activity never captured its task token');
      // The sentinel must have SUPPRESSED the response: give the engine a beat and
      // confirm the workflow is still waiting on the activity.
      await new Promise((r) => setTimeout(r, 1_500));
      expect(observed.workflowResult).toBe('');

      await client.CompleteActivity(background() as any, observed.taskToken!, 'expense-approved', null);

      await waitUntil(() => observed.workflowResult !== '', 30_000, 'CompleteActivity result never reached the workflow');
      expect(observed.workflowResult).toBe('expense-approved');

      let history = '';
      await waitUntil(async () => {
        history = await showWorkflow(client, workflowID);
        return /WorkflowExecutionCompleted|WorkflowExecutionFailed|WorkflowExecutionTimedOut/.test(history);
      }, 20_000, 'server never recorded a terminal event');
      expect(history).toMatch(/ActivityTaskCompleted/);
      expect(history).toMatch(/WorkflowExecutionCompleted/);
      expect(history).toContain('expense-approved');

      // ---- ByID variant on a fresh run ----
      observed.workflowResult = '';
      const byIDWorkflowID = `condorance-smoke-asynccomplete-byid-${Date.now()}`;
      await startWorkflow(client, {
        workflowID: byIDWorkflowID,
        taskList: TASK_LIST,
        workflowType: 'AsyncCompleteByIDWorkflow',
        executionTimeoutSeconds: 120,
        decisionTimeoutSeconds: 10,
      });
      await waitUntil(() => observed.activityID !== '', 30_000, 'ByID activity never captured its coordinates');

      await client.CompleteActivityByID(
        background() as any, DOMAIN, byIDWorkflowID, observed.runID, observed.activityID,
        'expense-approved-byid', null,
      );

      await waitUntil(() => observed.workflowResult !== '', 30_000, 'CompleteActivityByID result never reached the workflow');
      expect(observed.workflowResult).toBe('expense-approved-byid');
      let history2 = '';
      await waitUntil(async () => {
        history2 = await showWorkflow(client, byIDWorkflowID);
        return /WorkflowExecutionCompleted|WorkflowExecutionFailed|WorkflowExecutionTimedOut/.test(history2);
      }, 20_000, 'server never recorded a terminal event for the ByID run');
      expect(history2).toMatch(/WorkflowExecutionCompleted/);
      expect(history2).toContain('expense-approved-byid');
    } finally {
      worker.Stop();
      service.close();
    }
  }, 150_000);
});

async function waitUntil(cond: () => boolean | Promise<boolean>, timeoutMs: number, what: string): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (await cond()) return;
    await new Promise((r) => setTimeout(r, 100));
  }
  throw new Error(`timed out after ${timeoutMs}ms: ${what}`);
}
