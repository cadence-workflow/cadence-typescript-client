/*
 * End-to-end integration: ACTIVITY shape — the generated engine must round-trip a real
 * activity through the REAL Cadence server.
 *
 * This exercises the halves no other test touches: the workflow side must emit a
 * ScheduleActivityTask decision (activity decision state machine), and the ACTIVITY
 * worker must poll the activity task list, look the function up in the registry
 * (getRegisteredActivities / GetActivity), run it, and respond with
 * RespondActivityTaskCompleted; a separate decision task must then resolve the
 * ExecuteActivity future with the activity's decoded result. An in-process call of
 * the activity function would pass a broken engine, so the assertions demand the
 * server-side ActivityTaskScheduled/Started/Completed events AND the workflow
 * completion carrying the activity's return value.
 */
import { describe, it, expect } from 'vitest';
import { New as NewWorker } from '../../src/worker/worker.js';
import { WorkerOptions } from '../../src/internal/worker.js';
import { ExecuteActivity } from '../../src/workflow/workflow.js';
import { WithActivityOptions } from '../../src/workflow/activity_options.js';
import { newWorkflowServiceClient } from '../../src/workflow_service_client.js';
import { clientFromService, showWorkflow, startWorkflow } from './harness.js';

export const DOMAIN = process.env.CADENCE_DOMAIN ?? 'default';
export const TASK_LIST = 'condorance-smoke-activity-tasklist';

// Replay caveat as in the other integration tests: reads take the FINAL replay's view.
const observed: { activityRuns: number; workflowResult: string } = { activityRuns: 0, workflowResult: '' };

// 1 minute in Go time.Duration nanoseconds — the unit ActivityOptions keeps.
export const ONE_MINUTE_NS = 60_000_000_000;

export async function EchoActivity(_ctx: unknown, input: string): Promise<string> {
  observed.activityRuns++;
  return `echoed:${input}`;
}

export async function ActivityWorkflow(ctx: unknown): Promise<string> {
  const optCtx = WithActivityOptions(ctx as never, {
    TaskList: TASK_LIST,
    ScheduleToCloseTimeout: 0,
    ScheduleToStartTimeout: ONE_MINUTE_NS,
    StartToCloseTimeout: ONE_MINUTE_NS,
    HeartbeatTimeout: 0,
  } as never);
  const future = await ExecuteActivity(optCtx, 'EchoActivity', 'ping');
  const box: { value: unknown } = { value: undefined };
  await future.Get(optCtx, box);
  observed.workflowResult = String(box.value);
  return observed.workflowResult;
}

describe('generated worker engine -> real Cadence server (activity)', () => {
  it('schedules a real activity, the activity worker runs it, and the result reaches the workflow', async () => {
    const service = newWorkflowServiceClient({ address: '127.0.0.1:7833', caller: 'condorance-smoke' });
    const worker = await NewWorker(
      service as any,
      DOMAIN,
      TASK_LIST,
      new WorkerOptions({ Identity: 'condorance-smoke-worker' }) as any,
    );
    worker.RegisterWorkflow(ActivityWorkflow);
    worker.RegisterActivityWithOptions(EchoActivity, {
      Name: 'EchoActivity',
      EnableShortName: false,
      DisableAlreadyRegisteredCheck: false,
      EnableAutoHeartbeat: false,
    } as never);
    worker.Start();

    const client = clientFromService(service, DOMAIN, 'condorance-smoke-client');
    const workflowID = `condorance-smoke-activity-${Date.now()}`;
    try {
      await startWorkflow(client, {
        workflowID,
        taskList: TASK_LIST,
        workflowType: 'ActivityWorkflow',
        executionTimeoutSeconds: 60,
        decisionTimeoutSeconds: 10,
      });

      await waitUntil(() => observed.activityRuns > 0, 30_000, 'activity never ran');
      await waitUntil(() => observed.workflowResult !== '', 30_000, 'activity result never reached the workflow');
      expect(observed.workflowResult).toBe('echoed:ping');

      let history = '';
      await waitUntil(async () => {
        history = await showWorkflow(client, workflowID);
        return /WorkflowExecutionCompleted|WorkflowExecutionFailed|WorkflowExecutionTimedOut/.test(history);
      }, 20_000, 'server never recorded a terminal event');
      expect(history).toMatch(/ActivityTaskScheduled/);
      expect(history).toMatch(/ActivityTaskStarted/);
      expect(history).toMatch(/ActivityTaskCompleted/);
      expect(history).toMatch(/WorkflowExecutionCompleted/);
      expect(history).toContain('echoed:ping');
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
