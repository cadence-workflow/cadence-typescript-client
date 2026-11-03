/*
 * End-to-end integration: ACTIVITY RETRY ON TIMEOUT WITH A STABLE ERROR — an activity
 * that always fails with the same CustomError is retried until the retry policy's
 * ExpirationInterval runs out, and the error the workflow finally receives is that
 * STABLE CustomError, not a timeout (mirrors go-client
 * TestActivityRetryOnTimeoutStableError / RetryTimeoutStableErrorWorkflow).
 *
 * The activity takes 3s per attempt and the expiration is 5s, so attempt 2's
 * failure lands past the expiration and closes the retry loop; the server must
 * surface the last REAL error, and the generated error path must decode it back
 * into a CustomError with the original reason.
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
export const TASK_LIST = `condorance-smoke-stableerr-tasklist-${Date.now()}`;
export const WORKFLOW_ID = `condorance-smoke-stableerr-${Date.now()}`;
export const STABLE_REASON = 'failing-on-purpose';

export const ONE_SECOND_NS = 1_000_000_000;

const observed = { activityRuns: 0, errName: '', errReason: '' };

export async function StableErrorActivity(_ctx: unknown): Promise<void> {
  observed.activityRuns++;
  await new Promise((r) => setTimeout(r, 3_000));
  throw NewCustomError(STABLE_REASON);
}

export async function RetryTimeoutStableErrorWF(ctx: any): Promise<string> {
  const actx = WithActivityOptions(ctx as never, {
    TaskList: TASK_LIST,
    ScheduleToCloseTimeout: 0,
    ScheduleToStartTimeout: 2 * ONE_SECOND_NS,
    StartToCloseTimeout: 6 * ONE_SECOND_NS,
    HeartbeatTimeout: 0,
    RetryPolicy: {
      InitialInterval: ONE_SECOND_NS,
      BackoffCoefficient: 1.0,
      MaximumInterval: ONE_SECOND_NS,
      ExpirationInterval: 5 * ONE_SECOND_NS,
      MaximumAttempts: 0,
      NonRetriableErrorReasons: [],
    },
  } as never);

  const future = await ExecuteActivity(actx, 'StableErrorActivity');
  const box: { value: unknown } = { value: undefined };
  try {
    await future.Get(actx, box);
    return 'unexpected-success';
  } catch (err) {
    observed.errName = (err as Error)?.constructor?.name ?? '';
    if (err instanceof internal_CustomError) {
      observed.errReason = err.Reason();
      if (observed.errReason === STABLE_REASON) return 'stable-error-ok';
      return `wrong-reason:${observed.errReason}`;
    }
    return `wrong-error-type:${observed.errName}`;
  }
}

describe('generated worker engine -> real Cadence server (retry expiration keeps the stable error)', () => {
  it('the workflow receives the CustomError, not a timeout, after retries expire', async () => {
    const service = newWorkflowServiceClient({ address: '127.0.0.1:7833', caller: 'condorance-smoke' });
    const client = clientFromService(service, DOMAIN, 'condorance-smoke-stableerr-client');
    const worker = await NewWorker(
      service as any, DOMAIN, TASK_LIST,
      new WorkerOptions({ Identity: 'condorance-smoke-stableerr-worker' }) as any,
    );
    worker.RegisterWorkflow(RetryTimeoutStableErrorWF);
    worker.RegisterActivityWithOptions(StableErrorActivity, {
      Name: 'StableErrorActivity',
      EnableShortName: false,
      DisableAlreadyRegisteredCheck: false,
      EnableAutoHeartbeat: false,
    } as never);
    worker.Start();

    try {
      const execution = await startWorkflow(client, {
        workflowID: WORKFLOW_ID,
        taskList: TASK_LIST,
        workflowType: 'RetryTimeoutStableErrorWF',
        executionTimeoutSeconds: 60,
        decisionTimeoutSeconds: 10,
      });

      let history = '';
      await waitUntil(async () => {
        history = await showWorkflow(client, WORKFLOW_ID, execution.runId);
        return /(?<!Child)WorkflowExecution(Completed|Failed|TimedOut)\b/.test(history);
      }, 60_000, 'stable-error workflow never reached a terminal event');

      expect(history).toMatch(/WorkflowExecutionCompleted/);
      expect(history).toContain('stable-error-ok');
      expect(observed.errReason).toBe(STABLE_REASON);
      // The retry policy really retried before expiring.
      expect(observed.activityRuns).toBeGreaterThanOrEqual(2);
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
