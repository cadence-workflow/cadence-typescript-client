/*
 * End-to-end integration: ACTIVITY FAILURE shape — a thrown activity error must round-trip
 * through the REAL Cadence server and come back to the workflow AS THE SAME ERROR CLASS.
 *
 * This exercises the error-identity path no other test touches: the activity worker
 * must classify the thrown error (getErrorDetails → reason + encoded details) and
 * respond RespondActivityTaskFailed; the decision side must decode the failure event
 * (handleActivityTaskFailed → constructError) into the SDK's error class, reject the
 * ExecuteActivity future with it, and the workflow must observe `instanceof` identity
 * and the original reason. A failure that surfaces as a plain Error (or as undefined —
 * the constructError-returns-void bug) fails the instanceof/reason assertions.
 */
import { describe, it, expect } from 'vitest';
import { New as NewWorker } from '../../src/worker/worker.js';
import { WorkerOptions } from '../../src/internal/worker.js';
import { ExecuteActivity } from '../../src/workflow/workflow.js';
import { WithActivityOptions } from '../../src/workflow/activity_options.js';
import { NewCustomError, internal_CustomError } from '../../src/internal/error.js';
import { newWorkflowServiceClient } from '../../src/workflow_service_client.js';
import { clientFromService, showWorkflow, startWorkflow } from './harness.js';

export const DOMAIN = process.env.CADENCE_DOMAIN ?? 'default';
export const TASK_LIST = 'condorance-smoke-activity-failure-tasklist';
export const FAIL_REASON = 'condorance-custom-reason';

// Replay caveat as in the other integration tests: reads take the FINAL replay's view.
const observed: {
  activityRuns: number;
  caught: unknown;
  workflowResult: string;
} = { activityRuns: 0, caught: undefined, workflowResult: '' };

export const ONE_MINUTE_NS = 60_000_000_000;

export async function FailingActivity(): Promise<string> {
  observed.activityRuns++;
  throw NewCustomError(FAIL_REASON);
}

export async function FailureWorkflow(ctx: unknown): Promise<string> {
  const optCtx = WithActivityOptions(ctx as never, {
    TaskList: TASK_LIST,
    ScheduleToCloseTimeout: 0,
    ScheduleToStartTimeout: ONE_MINUTE_NS,
    StartToCloseTimeout: ONE_MINUTE_NS,
    HeartbeatTimeout: 0,
  } as never);
  const future = await ExecuteActivity(optCtx, 'FailingActivity');
  const box: { value: unknown } = { value: undefined };
  try {
    await future.Get(optCtx, box);
    observed.workflowResult = 'no-error';
  } catch (e) {
    observed.caught = e;
    const reason =
      e instanceof internal_CustomError ? e.Reason() : `unexpected:${String(e)}`;
    observed.workflowResult = `caught:${reason}`;
  }
  return observed.workflowResult;
}

describe('generated worker engine -> real Cadence server (activity failure)', () => {
  it('propagates a thrown CustomError back to the workflow with class identity and reason', async () => {
    const service = newWorkflowServiceClient({ address: '127.0.0.1:7833', caller: 'condorance-smoke' });
    const worker = await NewWorker(
      service as any,
      DOMAIN,
      TASK_LIST,
      new WorkerOptions({ Identity: 'condorance-smoke-worker' }) as any,
    );
    worker.RegisterWorkflow(FailureWorkflow);
    worker.RegisterActivityWithOptions(FailingActivity, {
      Name: 'FailingActivity',
      EnableShortName: false,
      DisableAlreadyRegisteredCheck: false,
      EnableAutoHeartbeat: false,
    } as never);
    worker.Start();

    const client = clientFromService(service, DOMAIN, 'condorance-smoke-client');
    const workflowID = `condorance-smoke-activity-failure-${Date.now()}`;
    try {
      await startWorkflow(client, {
        workflowID,
        taskList: TASK_LIST,
        workflowType: 'FailureWorkflow',
        executionTimeoutSeconds: 60,
        decisionTimeoutSeconds: 10,
      });

      await waitUntil(() => observed.activityRuns > 0, 30_000, 'activity never ran');
      await waitUntil(() => observed.workflowResult !== '', 30_000, 'activity failure never reached the workflow');

      // Error identity: the workflow must see the SDK error class, not a plain Error.
      expect(observed.caught).toBeInstanceOf(internal_CustomError);
      expect(observed.workflowResult).toBe(`caught:${FAIL_REASON}`);

      let history = '';
      await waitUntil(async () => {
        history = await showWorkflow(client, workflowID);
        return /WorkflowExecutionCompleted|WorkflowExecutionFailed|WorkflowExecutionTimedOut/.test(history);
      }, 20_000, 'server never recorded a terminal event');
      expect(history).toMatch(/ActivityTaskScheduled/);
      expect(history).toMatch(/ActivityTaskFailed/);
      // The workflow CATCHES the failure, so the execution itself completes.
      expect(history).toMatch(/WorkflowExecutionCompleted/);
      expect(history).toContain(`caught:${FAIL_REASON}`);
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
