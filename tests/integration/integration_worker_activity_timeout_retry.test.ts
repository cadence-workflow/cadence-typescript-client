/*
 * End-to-end integration: TIMEOUT-DRIVEN ACTIVITY RETRY — the SERVER times out a hung attempt
 * (StartToCloseTimeout) and reschedules it under ActivityOptions.RetryPolicy; the worker
 * only ever sees poll tasks, never a failure result from the hung attempt.
 *
 * What this proves beyond the failure-driven retry test (integration_worker_retry_heartbeat):
 *   - The retry is triggered by SERVER-side timeout detection, not by the activity
 *     reporting an error: attempt 1 parks forever and reports NOTHING, so the only way
 *     a second attempt can exist is the server timing out the first.
 *   - A JS activity attempt cannot be killed in-process; the engine must tolerate the
 *     zombie attempt while the retry attempt completes the workflow.
 */
import { describe, it, expect } from 'vitest';
import { New as NewWorker } from '../../src/worker/worker.js';
import { WorkerOptions } from '../../src/internal/worker.js';
import { ExecuteActivity } from '../../src/workflow/workflow.js';
import { WithActivityOptions } from '../../src/workflow/activity_options.js';
import { newWorkflowServiceClient } from '../../src/workflow_service_client.js';
import { clientFromService, showWorkflow, startWorkflow } from './harness.js';

export const DOMAIN = process.env.CADENCE_DOMAIN ?? 'default';
export const TASK_LIST = `condorance-smoke-timeout-retry-tasklist-${Date.now()}`;

export const ONE_MINUTE_NS = 60_000_000_000;
export const ONE_SECOND_NS = 1_000_000_000;

const observed = { activityRuns: 0, workflowResult: '' };
// Resolved in cleanup so the hung attempt's promise settles and vitest can exit.
let releaseHungAttempt: () => void = () => {};
const hungAttempt = new Promise<string>((resolve) => {
  releaseHungAttempt = () => resolve('released-after-test');
});

export async function HangingActivity(_ctx: unknown): Promise<string> {
  observed.activityRuns++;
  if (observed.activityRuns === 1) {
    return hungAttempt; // parks past StartToCloseTimeout; the server must time it out
  }
  return `attempt-${observed.activityRuns}-succeeded`;
}

export async function TimeoutRetryWorkflow(ctx: unknown): Promise<string> {
  const optCtx = WithActivityOptions(ctx as never, {
    TaskList: TASK_LIST,
    ScheduleToCloseTimeout: 0,
    ScheduleToStartTimeout: ONE_MINUTE_NS,
    StartToCloseTimeout: 3 * ONE_SECOND_NS,
    HeartbeatTimeout: 0,
    RetryPolicy: {
      InitialInterval: ONE_SECOND_NS,
      BackoffCoefficient: 1.0,
      MaximumInterval: ONE_SECOND_NS,
      ExpirationInterval: 0,
      MaximumAttempts: 3,
      NonRetriableErrorReasons: [],
    },
  } as never);
  const future = await ExecuteActivity(optCtx, 'HangingActivity');
  const box: { value: unknown } = { value: undefined };
  await future.Get(optCtx, box);
  observed.workflowResult = String(box.value);
  return observed.workflowResult;
}

describe('generated worker engine -> real Cadence server (timeout-driven activity retry)', () => {
  it('server times out the hung first attempt and the retry attempt completes the workflow', async () => {
    const service = newWorkflowServiceClient({ address: '127.0.0.1:7833', caller: 'condorance-smoke' });
    const worker = await NewWorker(
      service as any,
      DOMAIN,
      TASK_LIST,
      new WorkerOptions({ Identity: 'condorance-smoke-timeout-retry-worker' }) as any,
    );
    worker.RegisterWorkflow(TimeoutRetryWorkflow);
    worker.RegisterActivityWithOptions(HangingActivity, {
      Name: 'HangingActivity',
      EnableShortName: false,
      DisableAlreadyRegisteredCheck: false,
      EnableAutoHeartbeat: false,
    } as never);
    worker.Start();

    const client = clientFromService(service, DOMAIN, 'condorance-smoke-timeout-retry-client');
    const workflowID = `condorance-smoke-timeout-retry-${Date.now()}`;
    try {
      await startWorkflow(client, {
        workflowID,
        taskList: TASK_LIST,
        workflowType: 'TimeoutRetryWorkflow',
        executionTimeoutSeconds: 60,
        decisionTimeoutSeconds: 10,
      });

      await waitUntil(() => observed.workflowResult !== '', 45_000, 'workflow never completed after the timeout retry');
      // >= 2 runs with attempt 1 never reporting anything ⇒ the server timed it out.
      expect(observed.activityRuns).toBeGreaterThanOrEqual(2);
      expect(observed.workflowResult).toMatch(/^attempt-\d+-succeeded$/);

      let history = '';
      await waitUntil(async () => {
        history = await showWorkflow(client, workflowID);
        return /WorkflowExecutionCompleted|WorkflowExecutionFailed|WorkflowExecutionTimedOut/.test(history);
      }, 20_000, 'server never recorded a terminal event');
      expect(history).toMatch(/ActivityTaskCompleted/);
      expect(history).toMatch(/WorkflowExecutionCompleted/);
      expect(history).toContain(observed.workflowResult);
    } finally {
      releaseHungAttempt();
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
