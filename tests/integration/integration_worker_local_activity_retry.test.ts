/*
 * End-to-end integration: LOCAL ACTIVITY RETRY — the client-side retry loop inside
 * ExecuteLocalActivity, driven by LocalActivityOptions.RetryPolicy.
 *
 * Unlike a regular activity (the server reschedules failed attempts), a local activity
 * is retried BY THE WORKER: the local-activity result handler computes the backoff from
 * the retry policy, the future rejects with needRetryError, and ExecuteLocalActivity's
 * loop sleeps the backoff and schedules the next attempt — all within decision
 * processing. The final result is recorded as one LocalActivity marker.
 *
 * This is the seam fix 53 closed: the loop must bind the Go error result of
 * `f.Get(ctx, &result)` via try/catch (emitted futures THROW), or the needRetryError
 * branch is unreachable and the first failure is final.
 */
import { describe, it, expect } from 'vitest';
import { Ref } from '../../src/internal/runtime/ref.js';
import { WorkerOptions } from '../../src/internal/worker.js';
import { New as NewWorker } from '../../src/worker/worker.js';
import { WithLocalActivityOptions } from '../../src/workflow/activity_options.js';
import { ExecuteLocalActivity } from '../../src/workflow/workflow.js';
import { newWorkflowServiceClient } from '../../src/workflow_service_client.js';
import { clientFromService, showWorkflow, startWorkflow } from './harness.js';

export const DOMAIN = process.env.CADENCE_DOMAIN ?? 'default';
export const TASK_LIST = `condorance-smoke-laretry-tasklist-${Date.now()}`;

// Go time.Duration nanoseconds.
export const THIRTY_SECONDS_NS = 30_000_000_000;
export const ONE_SECOND_NS = 1_000_000_000;

describe('generated worker engine -> real Cadence server (local activity retry)', () => {
  it('retries a failing local activity in the worker and completes with the final result', async () => {
    const observed = { laRuns: 0, wfGot: '' };

    async function FlakyLocalActivity(_ctx: any): Promise<string> {
      observed.laRuns++;
      if (observed.laRuns < 3) {
        throw new Error(`la-flaky-${observed.laRuns}`);
      }
      return `la-ok-after-${observed.laRuns}`;
    }

    async function SmokeLaRetryWF(ctx: any): Promise<string> {
      const lctx = WithLocalActivityOptions(ctx, {
        ScheduleToCloseTimeout: THIRTY_SECONDS_NS,
        RetryPolicy: {
          InitialInterval: ONE_SECOND_NS,
          BackoffCoefficient: 1.0,
          MaximumInterval: ONE_SECOND_NS,
          ExpirationInterval: 0,
          MaximumAttempts: 5,
          NonRetriableErrorReasons: [],
        },
      } as never);
      const future = await ExecuteLocalActivity(lctx, FlakyLocalActivity);
      const box = new Ref<unknown>(undefined);
      await future.Get(lctx, box);
      observed.wfGot = String(box.value);
      return `la-retry-saw:${box.value}`;
    }

    const service = newWorkflowServiceClient({ address: '127.0.0.1:7833', caller: 'condorance-smoke' });
    const client = clientFromService(service, DOMAIN, 'condorance-smoke-laretry-client');
    const worker = await NewWorker(
      service as any,
      DOMAIN,
      TASK_LIST,
      new WorkerOptions({ Identity: 'condorance-smoke-laretry-worker', DisableActivityWorker: true }) as any,
    );
    worker.RegisterWorkflow(SmokeLaRetryWF);
    worker.Start();

    const workflowID = `condorance-smoke-laretry-${Date.now()}`;
    try {
      await startWorkflow(client, {
        workflowID,
        taskList: TASK_LIST,
        workflowType: 'SmokeLaRetryWF',
        executionTimeoutSeconds: 60,
        decisionTimeoutSeconds: 10,
      });

      await waitUntil(() => observed.wfGot !== '', 45_000, 'workflow never completed the retried local activity');
      expect(observed.laRuns).toBe(3);
      expect(observed.wfGot).toBe('la-ok-after-3');

      let history = '';
      await waitUntil(async () => {
        history = await showWorkflow(client, workflowID);
        return /WorkflowExecutionCompleted|WorkflowExecutionFailed|WorkflowExecutionTimedOut/.test(history);
      }, 20_000, 'server never recorded a terminal event');
      // Local activity: marker recording, never a server-side activity schedule.
      expect(history).toMatch(/MarkerRecorded/);
      expect(history).not.toMatch(/ActivityTaskScheduled/);
      expect(history).toMatch(/WorkflowExecutionCompleted/);
      expect(history).toContain('la-retry-saw:la-ok-after-3');
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
