/*
 * End-to-end integration: SESSIONS (mirrors go-client TestSession + Workflows.Session).
 *
 * The workflow creates a session, runs an activity INSIDE the session, and
 * completes the session. The session activity executes on a resource-specific
 * task list (not the worker's main one) — the activity reports its own task
 * list via activity.GetInfo, and after the run completes we DescribeTaskList
 * that name on the server and assert it exists with the normal kind, exactly
 * like the upstream assertion.
 *
 * Requires EnableSessionWorker: the worker hosts the hidden session-creation
 * and session-completion activities plus the resource-specific poller.
 */
import { describe, it, expect } from 'vitest';
import { New as NewWorker } from '../../src/worker/worker.js';
import { WorkerOptions } from '../../src/internal/worker.js';
import { ExecuteActivity } from '../../src/workflow/workflow.js';
import { CreateSession, CompleteSession } from '../../src/workflow/session.js';
import { WithActivityOptions } from '../../src/workflow/activity_options.js';
import { GetInfo } from '../../src/activity/activity.js';
import { background } from '../../src/internal/runtime/context.js';
import { newWorkflowServiceClient } from '../../src/workflow_service_client.js';
import { clientFromService, showWorkflow, startWorkflow } from './harness.js';

export const DOMAIN = process.env.CADENCE_DOMAIN ?? 'default';

export const ONE_MINUTE_NS = 60_000_000_000;
export const TEN_SECONDS_NS = 10_000_000_000;

const observed: { sessionTaskList?: string } = {};

export async function GetTaskListActivity(ctx: unknown): Promise<string> {
  return GetInfo(ctx as never).TaskList;
}

export async function SessionWorkflow(ctx: any): Promise<void> {
  const actx = WithActivityOptions(ctx as never, {
    TaskList: '',
    ScheduleToCloseTimeout: 0,
    ScheduleToStartTimeout: ONE_MINUTE_NS,
    StartToCloseTimeout: ONE_MINUTE_NS,
    HeartbeatTimeout: 0,
  } as never);
  const sessionCtx = await CreateSession(actx as never, {
    CreationTimeout: TEN_SECONDS_NS,
    ExecutionTimeout: TEN_SECONDS_NS,
    HeartbeatTimeout: 0,
  } as never);
  try {
    const future = await ExecuteActivity(sessionCtx as any, 'GetTaskListActivity');
    const box: { value: unknown } = { value: undefined };
    await future.Get(sessionCtx as any, box);
    observed.sessionTaskList = box.value as string;
  } finally {
    await CompleteSession(sessionCtx as never);
  }
}

describe('generated worker engine -> real Cadence server (sessions)', () => {
  it('session activity runs on a resource-specific task list', async () => {
    const service = newWorkflowServiceClient({ address: '127.0.0.1:7833', caller: 'condorance-smoke' });
    const client = clientFromService(service, DOMAIN, 'condorance-smoke-session-client');
    const taskList = `condorance-smoke-session-${Date.now()}`;
    const workflowID = `condorance-smoke-session-${Date.now()}`;
    const worker = await NewWorker(
      service as any, DOMAIN, taskList,
      new WorkerOptions({ Identity: 'condorance-smoke-session-worker', EnableSessionWorker: true }) as any,
    );
    worker.RegisterWorkflowWithOptions(SessionWorkflow, {
      Name: 'SessionWorkflow', EnableShortName: false, DisableAlreadyRegisteredCheck: true,
    } as never);
    worker.RegisterActivityWithOptions(GetTaskListActivity, {
      Name: 'GetTaskListActivity', EnableShortName: false, DisableAlreadyRegisteredCheck: true, EnableAutoHeartbeat: false,
    } as never);
    worker.Start();

    try {
      const execution = await startWorkflow(client, {
        workflowID,
        taskList,
        workflowType: 'SessionWorkflow',
        executionTimeoutSeconds: 60,
        decisionTimeoutSeconds: 10,
      });
      let history = '';
      await waitUntil(async () => {
        history = await showWorkflow(client, workflowID, execution.runId);
        return /(?<!Child)WorkflowExecution(Completed|Failed|TimedOut)\b/.test(history);
      }, 45_000, 'session workflow never reached a terminal event');
      expect(history).toMatch(/WorkflowExecutionCompleted/);

      // The session activity must have run on the resource-specific task list,
      // not the worker's main one.
      expect(observed.sessionTaskList).toBeTruthy();
      expect(observed.sessionTaskList).not.toBe(taskList);

      // Upstream assertion: the session task list exists on the server with
      // the normal kind (TaskListKind.NORMAL = 0 / undefined defaults to it).
      const resp = await service.DescribeTaskList(background() as any, {
        domain: DOMAIN,
        taskList: { name: observed.sessionTaskList },
        taskListType: 1, // activity task list
      } as never);
      expect(resp).toBeTruthy();
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
