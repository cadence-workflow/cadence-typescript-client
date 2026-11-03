/*
 * End-to-end integration: AUTO-HEARTBEAT — RegisterActivityOptions.EnableAutoHeartbeat makes
 * the worker heartbeat on the activity's behalf (mirrors go-client
 * TestActivityAutoHeartbeat).
 *
 * The activity runs LONGER than its HeartbeatTimeout (5s of real work vs a 2s timeout)
 * and never calls RecordHeartbeat itself. Without auto-heartbeat the server would time
 * the attempt out and retry (exactly what integration_worker_heartbeat_timeout_retry proves);
 * with EnableAutoHeartbeat the background heartbeater keeps the attempt alive, so the
 * FIRST attempt completes: activityRuns === 1 and the history has no ActivityTaskTimedOut.
 */
import { describe, it, expect } from 'vitest';
import { New as NewWorker } from '../../src/worker/worker.js';
import { WorkerOptions } from '../../src/internal/worker.js';
import { ExecuteActivity } from '../../src/workflow/workflow.js';
import { WithActivityOptions } from '../../src/workflow/activity_options.js';
import { newWorkflowServiceClient } from '../../src/workflow_service_client.js';
import { clientFromService, showWorkflow, startWorkflow } from './harness.js';

export const DOMAIN = process.env.CADENCE_DOMAIN ?? 'default';
export const TASK_LIST = `condorance-smoke-autohb-tasklist-${Date.now()}`;

export const ONE_MINUTE_NS = 60_000_000_000;
export const ONE_SECOND_NS = 1_000_000_000;

const observed = { activityRuns: 0, workflowResult: '' };

export async function SlowSilentActivity(_ctx: unknown): Promise<string> {
  observed.activityRuns++;
  // Real 5s of wall-clock work — over twice the 2s HeartbeatTimeout — with NO manual
  // heartbeat. Only the auto-heartbeater can keep this attempt alive.
  await new Promise((r) => setTimeout(r, 5_000));
  return `auto-hb-attempt-${observed.activityRuns}`;
}

export async function AutoHeartbeatWorkflow(ctx: unknown): Promise<string> {
  const optCtx = WithActivityOptions(ctx as never, {
    TaskList: TASK_LIST,
    ScheduleToCloseTimeout: 0,
    ScheduleToStartTimeout: ONE_MINUTE_NS,
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
  const future = await ExecuteActivity(optCtx, 'SlowSilentActivity');
  const box: { value: unknown } = { value: undefined };
  await future.Get(optCtx, box);
  observed.workflowResult = String(box.value);
  return observed.workflowResult;
}

describe('generated worker engine -> real Cadence server (auto-heartbeat)', () => {
  it('EnableAutoHeartbeat keeps a slow silent activity alive past its HeartbeatTimeout', async () => {
    const service = newWorkflowServiceClient({ address: '127.0.0.1:7833', caller: 'condorance-smoke' });
    const worker = await NewWorker(
      service as any, DOMAIN, TASK_LIST,
      new WorkerOptions({ Identity: 'condorance-smoke-autohb-worker' }) as any,
    );
    worker.RegisterWorkflow(AutoHeartbeatWorkflow);
    worker.RegisterActivityWithOptions(SlowSilentActivity, {
      Name: 'SlowSilentActivity', EnableShortName: false, DisableAlreadyRegisteredCheck: false, EnableAutoHeartbeat: true,
    } as never);
    worker.Start();

    const client = clientFromService(service, DOMAIN, 'condorance-smoke-autohb-client');
    const workflowID = `condorance-smoke-autohb-${Date.now()}`;
    try {
      await startWorkflow(client, {
        workflowID,
        taskList: TASK_LIST,
        workflowType: 'AutoHeartbeatWorkflow',
        executionTimeoutSeconds: 120,
        decisionTimeoutSeconds: 10,
      });

      await waitUntil(() => observed.workflowResult !== '', 60_000, 'workflow never completed');
      // The whole point: the FIRST attempt survives its HeartbeatTimeout.
      expect(observed.activityRuns).toBe(1);
      expect(observed.workflowResult).toBe('auto-hb-attempt-1');

      let history = '';
      await waitUntil(async () => {
        history = await showWorkflow(client, workflowID);
        return /WorkflowExecutionCompleted|WorkflowExecutionFailed|WorkflowExecutionTimedOut/.test(history);
      }, 20_000, 'server never recorded a terminal event');
      expect(history).toMatch(/ActivityTaskCompleted/);
      expect(history).toMatch(/WorkflowExecutionCompleted/);
      expect(history).not.toMatch(/ActivityTaskTimedOut/);
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
