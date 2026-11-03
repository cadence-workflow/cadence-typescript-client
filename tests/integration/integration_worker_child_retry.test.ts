/*
 * End-to-end integration: CHILD WORKFLOW RETRY — ChildWorkflowOptions.RetryPolicy drives
 * SERVER-side retries of a failing child (mirrors go-client TestChildWFRetryOnError).
 *
 * The child fails its first two runs; the server (not the parent, not the worker)
 * reschedules it under the child's RetryPolicy; the parent blocks on one child future
 * and sees only the final success. Each retry is a NEW child execution, so a run
 * counter in test scope observes every attempt.
 */
import { describe, it, expect } from 'vitest';
import { New as NewWorker } from '../../src/worker/worker.js';
import { WorkerOptions } from '../../src/internal/worker.js';
import { ExecuteChildWorkflow } from '../../src/workflow/workflow.js';
import { WithChildOptions } from '../../src/workflow/workflow_options.js';
import { Ref } from '../../src/internal/runtime/ref.js';
import { EventType } from '../../src/generated/thrift/cadence-idl/com/uber/cadence/EventType.js';
import { newWorkflowServiceClient } from '../../src/workflow_service_client.js';
import {
  clientFromService,
  getAllEvents,
  hasEvent,
  hasTerminalEvent,
  showWorkflow,
  startWorkflow,
} from './harness.js';

export const DOMAIN = process.env.CADENCE_DOMAIN ?? 'default';
export const TASK_LIST = `condorance-smoke-childretry-tasklist-${Date.now()}`;

export const ONE_MINUTE_NS = 60_000_000_000;
export const ONE_SECOND_NS = 1_000_000_000;

const observed = { childRuns: 0 };

export async function FlakyChildWF(_ctx: any): Promise<string> {
  observed.childRuns++;
  if (observed.childRuns < 3) {
    throw new Error(`child-fail-${observed.childRuns}`);
  }
  return `child-succeeded-on-run-${observed.childRuns}`;
}

export async function ChildRetryParentWF(ctx: any): Promise<string> {
  // Value-typed fields all present (task #270: omitted required field -> NaN on the wire).
  const cctx = WithChildOptions(ctx, {
    Domain: DOMAIN,
    WorkflowID: '',
    TaskList: TASK_LIST,
    ExecutionStartToCloseTimeout: ONE_MINUTE_NS,
    TaskStartToCloseTimeout: 10 * ONE_SECOND_NS,
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
  const future = await ExecuteChildWorkflow(cctx, 'FlakyChildWF', null);
  const box = new Ref<unknown>(undefined);
  await future.Get(cctx, box);
  return `parent-saw:${box.value}`;
}

describe('generated worker engine -> real Cadence server (child workflow retry)', () => {
  it('server retries the failing child under its RetryPolicy; parent sees the final success', async () => {
    const service = newWorkflowServiceClient({ address: '127.0.0.1:7833', caller: 'condorance-smoke' });
    const client = clientFromService(service, DOMAIN, 'condorance-smoke-childretry');
    const worker = await NewWorker(
      service as any, DOMAIN, TASK_LIST,
      new WorkerOptions({ Identity: 'condorance-smoke-childretry-worker', DisableActivityWorker: true }) as any,
    );
    worker.RegisterWorkflow(ChildRetryParentWF);
    worker.RegisterWorkflow(FlakyChildWF);
    worker.Start();

    const workflowID = `condorance-smoke-childretry-${Date.now()}`;
    try {
      await startWorkflow(client, {
        workflowID,
        taskList: TASK_LIST,
        workflowType: 'ChildRetryParentWF',
        executionTimeoutSeconds: 120,
        decisionTimeoutSeconds: 10,
      });

      await waitUntil(async () => {
        return hasTerminalEvent(await getAllEvents(client, workflowID));
      }, 60_000, 'child-retry parent never reached a terminal event');
      const events = await getAllEvents(client, workflowID);
      const history = await showWorkflow(client, workflowID);
      expect(hasEvent(events, EventType.WorkflowExecutionCompleted)).toBe(true);
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
