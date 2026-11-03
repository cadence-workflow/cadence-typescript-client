/*
 * End-to-end integration: CHILD WORKFLOW CANCEL PROPAGATION — cancelling the parent-side
 * child context sends RequestCancelExternalWorkflowExecution for the child; the child
 * observes its own cancellation and closes CANCELED; with WaitForCancellation the
 * parent's child future resolves with a CanceledError (mirrors go-client
 * TestChildWFCancel).
 *
 * Everything is driven from INSIDE the parent workflow (deterministic): start the
 * child, wait only for it to START (GetChildWorkflowExecution), cancel(), then block
 * on the child future and record the error identity.
 */
import { describe, it, expect } from 'vitest';
import { New as NewWorker } from '../../src/worker/worker.js';
import { WorkerOptions } from '../../src/internal/worker.js';
import { ExecuteChildWorkflow } from '../../src/workflow/workflow.js';
import { WithChildOptions } from '../../src/workflow/workflow_options.js';
import { WithCancel } from '../../src/workflow/context.js';
import { Sleep } from '../../src/workflow/deterministic_wrappers.js';
import { internal_CanceledError, IsCanceledError } from '../../src/internal/error.js';
import { Ref } from '../../src/internal/runtime/ref.js';
import { newWorkflowServiceClient } from '../../src/workflow_service_client.js';
import { clientFromService, showWorkflow, startWorkflow } from './harness.js';

export const DOMAIN = process.env.CADENCE_DOMAIN ?? 'default';
export const TASK_LIST = `condorance-smoke-childcancel-tasklist-${Date.now()}`;
export const CHILD_ID = `condorance-smoke-childcancel-child-${Date.now()}`;

export const ONE_MINUTE_NS = 60_000_000_000;

const observed = { childStarted: false, childCaughtCanceled: false, parentCaughtClass: '', parentIsCanceled: false };

export async function CancelableChildWF(ctx: any): Promise<string> {
  observed.childStarted = true;
  try {
    // Only cancellation can end this timer within the test window.
    await Sleep(ctx, ONE_MINUTE_NS);
    return 'child-slept-through';
  } catch (err) {
    observed.childCaughtCanceled = err instanceof Error && IsCanceledError(err);
    throw err; // close the child AS CANCELED
  }
}

export async function ChildCancelParentWF(ctx: any): Promise<string> {
  const [cancelCtx, cancel] = await WithCancel(ctx);
  // Value-typed fields all present (task #270: omitted required field -> NaN on the wire).
  const cctx = WithChildOptions(cancelCtx as never, {
    Domain: DOMAIN,
    WorkflowID: CHILD_ID,
    TaskList: TASK_LIST,
    ExecutionStartToCloseTimeout: ONE_MINUTE_NS,
    TaskStartToCloseTimeout: 10_000_000_000,
    WaitForCancellation: true,
    WorkflowIDReusePolicy: 0,
    CronSchedule: '',
    ParentClosePolicy: 0,
    Bugports: {},
  } as never);
  const future = await ExecuteChildWorkflow(cctx, 'CancelableChildWF', null);
  const started = new Ref<unknown>(undefined);
  await (future as any).GetChildWorkflowExecution().Get(cctx, started);
  await cancel();
  const box = new Ref<unknown>(undefined);
  try {
    await future.Get(cctx, box);
    return 'parent-saw-child-complete';
  } catch (err) {
    observed.parentCaughtClass = err instanceof internal_CanceledError ? 'internal_CanceledError'
      : err instanceof Error ? err.constructor.name : typeof err;
    observed.parentIsCanceled = err instanceof Error && IsCanceledError(err);
    return `parent-saw-cancel:${observed.parentCaughtClass}`;
  }
}

describe('generated worker engine -> real Cadence server (child cancel propagation)', () => {
  it('cancel() on the child context cancels the child; parent future gets CanceledError', async () => {
    const service = newWorkflowServiceClient({ address: '127.0.0.1:7833', caller: 'condorance-smoke' });
    const client = clientFromService(service, DOMAIN, 'condorance-smoke-childcancel');
    const worker = await NewWorker(
      service as any, DOMAIN, TASK_LIST,
      new WorkerOptions({ Identity: 'condorance-smoke-childcancel-worker', DisableActivityWorker: true }) as any,
    );
    worker.RegisterWorkflow(ChildCancelParentWF);
    worker.RegisterWorkflow(CancelableChildWF);
    worker.Start();

    const parentID = `condorance-smoke-childcancel-${Date.now()}`;
    try {
      await startWorkflow(client, {
        workflowID: parentID,
        taskList: TASK_LIST,
        workflowType: 'ChildCancelParentWF',
        executionTimeoutSeconds: 120,
        decisionTimeoutSeconds: 10,
      });

      let history = '';
      await waitUntil(async () => {
        history = await showWorkflow(client, parentID);
        return /WorkflowExecutionCompleted|WorkflowExecutionFailed|WorkflowExecutionTimedOut/.test(history);
      }, 60_000, 'parent never reached a terminal event');

      expect(observed.childStarted).toBe(true);
      expect(observed.childCaughtCanceled).toBe(true);
      expect(observed.parentIsCanceled).toBe(true);
      expect(history).toContain('parent-saw-cancel:internal_CanceledError');
      expect(history).toMatch(/WorkflowExecutionCompleted/);

      // The child's own history closes CANCELED, not completed/failed.
      const childHistory = await showWorkflow(client, CHILD_ID);
      expect(childHistory).toMatch(/WorkflowExecutionCanceled/);
      expect(childHistory).not.toMatch(/WorkflowExecutionCompleted|WorkflowExecutionFailed/);
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
