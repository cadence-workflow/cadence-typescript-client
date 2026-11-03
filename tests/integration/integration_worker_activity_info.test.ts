/*
 * End-to-end integration: ACTIVITY INFO INSPECTION — activity.GetInfo/HasInfo inside a real
 * activity attempt (mirrors go-client TestInspectActivityInfo).
 *
 * What this proves: the poll response's task metadata is threaded into the activity
 * context, and GetInfo exposes it Go-shaped — activity type name, task list, workflow
 * execution identity, attempt counter, and a non-empty task token. HasInfo must be
 * true inside an activity context.
 */
import { describe, it, expect } from 'vitest';
import { New as NewWorker } from '../../src/worker/worker.js';
import { WorkerOptions } from '../../src/internal/worker.js';
import { ExecuteActivity } from '../../src/workflow/workflow.js';
import { WithActivityOptions } from '../../src/workflow/activity_options.js';
import { GetInfo, HasInfo } from '../../src/activity/activity.js';
import { Ref } from '../../src/internal/runtime/ref.js';
import { newWorkflowServiceClient } from '../../src/workflow_service_client.js';
import { clientFromService, showWorkflow, startWorkflow } from './harness.js';

export const DOMAIN = process.env.CADENCE_DOMAIN ?? 'default';
export const TASK_LIST = `condorance-smoke-actinfo-tasklist-${Date.now()}`;
export const WORKFLOW_ID = `condorance-smoke-actinfo-${Date.now()}`;

export const ONE_MINUTE_NS = 60_000_000_000;

const observed = { hasInfo: false, info: undefined as any };

export async function InspectInfoActivity(ctx: unknown): Promise<string> {
  observed.hasInfo = HasInfo(ctx as never);
  observed.info = GetInfo(ctx as never);
  return 'inspected';
}

export async function InspectInfoWorkflow(ctx: unknown): Promise<string> {
  const optCtx = WithActivityOptions(ctx as never, {
    TaskList: TASK_LIST,
    ScheduleToCloseTimeout: 0,
    ScheduleToStartTimeout: ONE_MINUTE_NS,
    StartToCloseTimeout: ONE_MINUTE_NS,
    HeartbeatTimeout: 0,
  } as never);
  const future = await ExecuteActivity(optCtx, 'InspectInfoActivity');
  const box = new Ref<unknown>(undefined);
  await future.Get(optCtx, box);
  return String(box.value);
}

describe('generated worker engine -> real Cadence server (activity info inspection)', () => {
  it('GetInfo inside the activity carries the real task metadata', async () => {
    const service = newWorkflowServiceClient({ address: '127.0.0.1:7833', caller: 'condorance-smoke' });
    const worker = await NewWorker(
      service as any, DOMAIN, TASK_LIST,
      new WorkerOptions({ Identity: 'condorance-smoke-actinfo-worker' }) as any,
    );
    worker.RegisterWorkflow(InspectInfoWorkflow);
    worker.RegisterActivityWithOptions(InspectInfoActivity, {
      Name: 'InspectInfoActivity', EnableShortName: false, DisableAlreadyRegisteredCheck: false, EnableAutoHeartbeat: false,
    } as never);
    worker.Start();

    const client = clientFromService(service, DOMAIN, 'condorance-smoke-actinfo-client');
    try {
      await startWorkflow(client, {
        workflowID: WORKFLOW_ID,
        taskList: TASK_LIST,
        workflowType: 'InspectInfoWorkflow',
        executionTimeoutSeconds: 60,
        decisionTimeoutSeconds: 10,
      });

      let history = '';
      await waitUntil(async () => {
        history = await showWorkflow(client, WORKFLOW_ID);
        return /WorkflowExecutionCompleted|WorkflowExecutionFailed|WorkflowExecutionTimedOut/.test(history);
      }, 45_000, 'inspect-info workflow never reached a terminal event');
      expect(history).toMatch(/WorkflowExecutionCompleted/);

      expect(observed.hasInfo).toBe(true);
      const info = observed.info;
      expect(info?.ActivityType?.Name).toBe('InspectInfoActivity');
      expect(info?.TaskList).toBe(TASK_LIST);
      expect(info?.WorkflowDomain).toBe(DOMAIN);
      expect(info?.WorkflowExecution?.ID).toBe(WORKFLOW_ID);
      expect((info?.WorkflowExecution?.RunID?.length ?? 0)).toBeGreaterThan(0);
      expect(info?.TaskToken?.length ?? 0).toBeGreaterThan(0);
      // First and only attempt: Go attempt counters start at 0.
      expect(info?.Attempt).toBe(0);
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
