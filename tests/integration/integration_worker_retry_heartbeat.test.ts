/*
 * End-to-end integration: ACTIVITY RETRY + HEARTBEAT — server-side retry via
 * ActivityOptions.RetryPolicy, with heartbeat details carried across attempts.
 *
 * What this proves beyond the plain activity integration:
 *   - convertRetryPolicy delivers the RetryPolicy on the ScheduleActivityTask
 *     decision, and the SERVER (not the worker) reschedules the failed attempts —
 *     the workflow sees only the final result.
 *   - RecordHeartbeat reaches the server (RecordActivityTaskHeartbeat RPC with the
 *     attempt's task token) while the activity is running.
 *   - The retry attempt's PollForActivityTaskResponse carries the previous attempt's
 *     heartbeat details, and GetHeartbeatDetails decodes them through the
 *     EncodedValues box protocol — the activity resumes from recorded progress.
 *
 * Retried attempts do not append per-attempt events; history shows one
 * ActivityTaskScheduled and the FINAL attempt's Started/Completed, so the retry
 * count is asserted in-process and the recovered progress in the completion result.
 */
import { describe, it, expect } from 'vitest';
import { New as NewWorker } from '../../src/worker/worker.js';
import { WorkerOptions } from '../../src/internal/worker.js';
import { ExecuteActivity } from '../../src/workflow/workflow.js';
import { WithActivityOptions } from '../../src/workflow/activity_options.js';
import { RecordHeartbeat, GetHeartbeatDetails } from '../../src/activity/activity.js';
import { newWorkflowServiceClient } from '../../src/workflow_service_client.js';
import { clientFromService, showWorkflow, startWorkflow } from './harness.js';

export const DOMAIN = process.env.CADENCE_DOMAIN ?? 'default';
export const TASK_LIST = `condorance-smoke-retry-tasklist-${Date.now()}`;

export const ONE_MINUTE_NS = 60_000_000_000;
export const ONE_SECOND_NS = 1_000_000_000;

const observed = { activityRuns: 0, recovered: '', workflowResult: '' };

export async function FlakyActivity(ctx: unknown): Promise<string> {
  observed.activityRuns++;
  if (observed.activityRuns < 3) {
    // Record progress, then fail — the next attempt must see this exact detail.
    await RecordHeartbeat(ctx as never, `progress-${observed.activityRuns}`);
    throw new Error(`flaky-fail-${observed.activityRuns}`);
  }
  const hbBox: { value: unknown } = { value: undefined };
  GetHeartbeatDetails(ctx as never, hbBox);
  observed.recovered = String(hbBox.value);
  return `retried:${observed.activityRuns}:${observed.recovered}`;
}

export async function RetryWorkflow(ctx: unknown): Promise<string> {
  const optCtx = WithActivityOptions(ctx as never, {
    TaskList: TASK_LIST,
    ScheduleToCloseTimeout: 0,
    ScheduleToStartTimeout: ONE_MINUTE_NS,
    StartToCloseTimeout: ONE_MINUTE_NS,
    HeartbeatTimeout: ONE_MINUTE_NS,
    RetryPolicy: {
      InitialInterval: ONE_SECOND_NS,
      BackoffCoefficient: 1.0,
      MaximumInterval: ONE_SECOND_NS,
      ExpirationInterval: 0,
      MaximumAttempts: 5,
      NonRetriableErrorReasons: [],
    },
  } as never);
  const future = await ExecuteActivity(optCtx, 'FlakyActivity');
  const box: { value: unknown } = { value: undefined };
  await future.Get(optCtx, box);
  observed.workflowResult = String(box.value);
  return observed.workflowResult;
}

describe('generated worker engine -> real Cadence server (activity retry + heartbeat)', () => {
  it('retries a failing activity server-side and delivers heartbeat details to the retry attempt', async () => {
    const service = newWorkflowServiceClient({ address: '127.0.0.1:7833', caller: 'condorance-smoke' });
    const client = clientFromService(service, DOMAIN, 'condorance-smoke-retry-client');
    const worker = await NewWorker(
      service as any,
      DOMAIN,
      TASK_LIST,
      new WorkerOptions({ Identity: 'condorance-smoke-retry-worker' }) as any,
    );
    worker.RegisterWorkflow(RetryWorkflow);
    worker.RegisterActivityWithOptions(FlakyActivity, {
      Name: 'FlakyActivity',
      EnableShortName: false,
      DisableAlreadyRegisteredCheck: false,
      EnableAutoHeartbeat: false,
    } as never);
    worker.Start();

    const workflowID = `condorance-smoke-retry-${Date.now()}`;
    try {
      const execution = await startWorkflow(client, {
        workflowID,
        taskList: TASK_LIST,
        workflowType: 'RetryWorkflow',
        executionTimeoutSeconds: 60,
        decisionTimeoutSeconds: 10,
      });

      await waitUntil(() => observed.workflowResult !== '', 45_000, 'workflow never completed the retried activity');
      expect(observed.activityRuns).toBe(3);
      expect(observed.recovered).toBe('progress-2');
      expect(observed.workflowResult).toBe('retried:3:progress-2');

      let history = '';
      await waitUntil(async () => {
        history = await showWorkflow(client, workflowID, execution.runId);
        return /WorkflowExecutionCompleted|WorkflowExecutionFailed|WorkflowExecutionTimedOut/.test(history);
      }, 20_000, 'server never recorded a terminal event');
      expect(history).toMatch(/ActivityTaskScheduled/);
      expect(history).toMatch(/ActivityTaskCompleted/);
      expect(history).toMatch(/WorkflowExecutionCompleted/);
      expect(history).toContain('retried:3:progress-2');
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
