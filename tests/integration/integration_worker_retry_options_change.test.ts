/*
 * End-to-end integration: ACTIVITY RETRY OPTIONS CHANGE ACROSS REPLAY — a RetryPolicy
 * whose MaximumAttempts differs between the original execution and its replay
 * (IsReplaying flips it 2 → 3) must NOT trip nondeterminism detection: replay
 * matching compares the activity's identity, not its options, and the server keeps
 * retrying with the RECORDED policy (mirrors go-client
 * TestActivityRetryOptionsChange / ActivityRetryOptionsChange).
 *
 * Sticky execution is disabled so replays actually happen, and the failing
 * activity forces multiple decisions. The workflow completes normally and the
 * activity ran exactly the recorded MaximumAttempts=2 times.
 */
import { describe, it, expect } from 'vitest';
import { New as NewWorker } from '../../src/worker/worker.js';
import { WorkerOptions } from '../../src/internal/worker.js';
import { ExecuteActivity, IsReplaying } from '../../src/workflow/workflow.js';
import { WithActivityOptions } from '../../src/workflow/activity_options.js';
import { NewCustomError } from '../../src/internal/error.js';
import { newWorkflowServiceClient } from '../../src/workflow_service_client.js';
import { clientFromService, showWorkflow, startWorkflow } from './harness.js';

export const DOMAIN = process.env.CADENCE_DOMAIN ?? 'default';
export const TASK_LIST = `condorance-smoke-retryopts-tasklist-${Date.now()}`;
export const WORKFLOW_ID = `condorance-smoke-retryopts-${Date.now()}`;

export const ONE_SECOND_NS = 1_000_000_000;
export const ONE_MINUTE_NS = 60_000_000_000;

const observed = { activityRuns: 0, sawReplay: false };

export async function AlwaysFailActivity(_ctx: unknown): Promise<void> {
  observed.activityRuns++;
  throw NewCustomError('fail');
}

export async function RetryOptionsChangeWF(ctx: any): Promise<string> {
  // The recorded (first-execution) policy allows 2 attempts; a replay computes 3.
  let maxAttempts = 2;
  if (IsReplaying(ctx)) {
    observed.sawReplay = true;
    maxAttempts = 3;
  }
  const actx = WithActivityOptions(ctx as never, {
    TaskList: TASK_LIST,
    ScheduleToCloseTimeout: 0,
    ScheduleToStartTimeout: ONE_MINUTE_NS,
    StartToCloseTimeout: 5 * ONE_SECOND_NS,
    HeartbeatTimeout: 0,
    RetryPolicy: {
      InitialInterval: ONE_SECOND_NS,
      BackoffCoefficient: 1.0,
      MaximumInterval: ONE_SECOND_NS,
      ExpirationInterval: 0,
      MaximumAttempts: maxAttempts,
      NonRetriableErrorReasons: [],
    },
  } as never);

  const future = await ExecuteActivity(actx, 'AlwaysFailActivity');
  const box: { value: unknown } = { value: undefined };
  try {
    await future.Get(actx, box);
    return 'unexpected-success';
  } catch {
    return 'failed-as-expected';
  }
}

describe('generated worker engine -> real Cadence server (retry options change across replay)', () => {
  it('a policy that differs under replay is tolerated; the recorded attempts apply', async () => {
    const service = newWorkflowServiceClient({ address: '127.0.0.1:7833', caller: 'condorance-smoke' });
    const client = clientFromService(service, DOMAIN, 'condorance-smoke-retryopts-client');
    const worker = await NewWorker(
      service as any, DOMAIN, TASK_LIST,
      new WorkerOptions({
        Identity: 'condorance-smoke-retryopts-worker',
        // Replays must actually happen for the options change to be exercised.
        DisableStickyExecution: true,
      }) as any,
    );
    worker.RegisterWorkflow(RetryOptionsChangeWF);
    worker.RegisterActivityWithOptions(AlwaysFailActivity, {
      Name: 'AlwaysFailActivity',
      EnableShortName: false,
      DisableAlreadyRegisteredCheck: false,
      EnableAutoHeartbeat: false,
    } as never);
    worker.Start();

    try {
      const execution = await startWorkflow(client, {
        workflowID: WORKFLOW_ID,
        taskList: TASK_LIST,
        workflowType: 'RetryOptionsChangeWF',
        executionTimeoutSeconds: 60,
        decisionTimeoutSeconds: 10,
      });

      let history = '';
      await waitUntil(async () => {
        history = await showWorkflow(client, WORKFLOW_ID, execution.runId);
        return /(?<!Child)WorkflowExecution(Completed|Failed|TimedOut)\b/.test(history);
      }, 45_000, 'retry-options-change workflow never reached a terminal event');

      // No nondeterminism failure: the workflow completes normally.
      expect(history).toMatch(/WorkflowExecutionCompleted/);
      expect(history).toContain('failed-as-expected');
      expect(history).not.toContain('NonDeterministicWorkflowPolicy');
      // The RECORDED policy (2 attempts) governed the server-side retry.
      expect(observed.activityRuns).toBe(2);
      // The options change was actually exercised on a replay.
      expect(observed.sawReplay).toBe(true);
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
