/*
 * End-to-end integration: HEARTBEAT-TIMEOUT-DRIVEN ACTIVITY RETRY — an activity that promises
 * heartbeats but never sends one is timed out by the SERVER on HeartbeatTimeout and
 * rescheduled under its RetryPolicy (mirrors go-client TestActivityRetryOnHBTimeout).
 *
 * What this proves beyond the StartToClose-timeout integration: the HeartbeatTimeout value
 * rides the ScheduleActivityTask decision and the server enforces it independently of
 * StartToClose (StartToClose here is long; only the missing heartbeat can trigger the
 * retry). Attempt 1 parks silently; the retry attempt heartbeats and completes.
 */
import { describe, it, expect } from 'vitest';
import { RecordHeartbeat } from '../../src/activity/activity.js';
import { WorkerOptions } from '../../src/internal/worker.js';
import { New as NewWorker } from '../../src/worker/worker.js';
import { WithActivityOptions } from '../../src/workflow/activity_options.js';
import { ExecuteActivity } from '../../src/workflow/workflow.js';
import { newWorkflowServiceClient } from '../../src/workflow_service_client.js';
import { clientFromService, showWorkflow, startWorkflow } from './harness.js';

export const DOMAIN = process.env.CADENCE_DOMAIN ?? 'default';
export const TASK_LIST = `condorance-smoke-hbtimeout-tasklist-${Date.now()}`;

export const ONE_MINUTE_NS = 60_000_000_000;
export const ONE_SECOND_NS = 1_000_000_000;

const observed = { activityRuns: 0, workflowResult: '' };
// Resolved in cleanup so the silent attempt's promise settles and vitest can exit.
let releaseSilentAttempt: () => void = () => {};
const silentAttempt = new Promise<string>((resolve) => {
  releaseSilentAttempt = () => resolve('released-after-test');
});

export async function NoHeartbeatActivity(ctx: unknown): Promise<string> {
  observed.activityRuns++;
  if (observed.activityRuns === 1) {
    return silentAttempt; // never heartbeats; server must fire HeartbeatTimeout
  }
  await RecordHeartbeat(ctx as never, 'alive');
  return `attempt-${observed.activityRuns}-heartbeated`;
}

export async function HeartbeatTimeoutWorkflow(ctx: unknown): Promise<string> {
  const optCtx = WithActivityOptions(ctx as never, {
    TaskList: TASK_LIST,
    ScheduleToCloseTimeout: 0,
    ScheduleToStartTimeout: ONE_MINUTE_NS,
    // StartToClose long on purpose: only the missing heartbeat can time attempt 1 out.
    StartToCloseTimeout: ONE_MINUTE_NS,
    HeartbeatTimeout: 2 * ONE_SECOND_NS,
    RetryPolicy: {
      InitialInterval: ONE_SECOND_NS,
      BackoffCoefficient: 1.0,
      MaximumInterval: ONE_SECOND_NS,
      ExpirationInterval: 0,
      MaximumAttempts: 3,
      NonRetriableErrorReasons: [],
    },
  } as never);
  const future = await ExecuteActivity(optCtx, 'NoHeartbeatActivity');
  const box: { value: unknown } = { value: undefined };
  await future.Get(optCtx, box);
  observed.workflowResult = String(box.value);
  return observed.workflowResult;
}

describe('generated worker engine -> real Cadence server (heartbeat-timeout retry)', () => {
  it('server times out the silent attempt on HeartbeatTimeout and the retry completes', async () => {
    const service = newWorkflowServiceClient({ address: '127.0.0.1:7833', caller: 'condorance-smoke' });
    const client = clientFromService(service, DOMAIN, 'condorance-smoke-hbtimeout-client');
    const worker = await NewWorker(
      service as any, DOMAIN, TASK_LIST,
      new WorkerOptions({ Identity: 'condorance-smoke-hbtimeout-worker' }) as any,
    );
    worker.RegisterWorkflow(HeartbeatTimeoutWorkflow);
    worker.RegisterActivityWithOptions(NoHeartbeatActivity, {
      Name: 'NoHeartbeatActivity', EnableShortName: false, DisableAlreadyRegisteredCheck: false, EnableAutoHeartbeat: false,
    } as never);
    worker.Start();

    const workflowID = `condorance-smoke-hbtimeout-${Date.now()}`;
    try {
      await startWorkflow(client, {
        workflowID,
        taskList: TASK_LIST,
        workflowType: 'HeartbeatTimeoutWorkflow',
        executionTimeoutSeconds: 120,
        decisionTimeoutSeconds: 10,
      });

      await waitUntil(() => observed.workflowResult !== '', 60_000, 'workflow never completed after the heartbeat-timeout retry');
      expect(observed.activityRuns).toBeGreaterThanOrEqual(2);
      expect(observed.workflowResult).toMatch(/^attempt-\d+-heartbeated$/);

      let history = '';
      await waitUntil(async () => {
        history = await showWorkflow(client, workflowID);
        return /WorkflowExecutionCompleted|WorkflowExecutionFailed|WorkflowExecutionTimedOut/.test(history);
      }, 20_000, 'server never recorded a terminal event');
      expect(history).toMatch(/ActivityTaskCompleted/);
      expect(history).toMatch(/WorkflowExecutionCompleted/);
    } finally {
      releaseSilentAttempt();
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
