/*
 * End-to-end integration: MULTI-ACTIVITY CANCEL REPRO — the upstream activity-cancel state
 * machine repro (mirrors go-client TestActivityCancelRepro / ActivityCancelRepro).
 *
 * Three workflow coroutines share one cancelable root context:
 *   1. runs a real activity on OUR task list, then cancels the root context;
 *   2. and 3. schedule activities on a task list NO worker polls, so they sit in
 *      SCHEDULED state and the cancel must sweep them while never-started.
 * The main coroutine parks on a 10s sleep that the cancel cuts short. The repro
 * passes when the workflow still COMPLETES normally (the cancel of scheduled-but-
 * never-started activities must not wedge the decision state machine) and only the
 * first activity ever ran.
 */
import { describe, it, expect } from 'vitest';
import { New as NewWorker } from '../../src/worker/worker.js';
import { WorkerOptions } from '../../src/internal/worker.js';
import { ExecuteActivity } from '../../src/workflow/workflow.js';
import { WithActivityOptions } from '../../src/workflow/activity_options.js';
import { WithCancel } from '../../src/workflow/context.js';
import { Go, Sleep } from '../../src/workflow/deterministic_wrappers.js';
import { newWorkflowServiceClient } from '../../src/workflow_service_client.js';
import { clientFromService, showWorkflow, startWorkflow } from './harness.js';

export const DOMAIN = process.env.CADENCE_DOMAIN ?? 'default';
export const TASK_LIST = `condorance-smoke-actcancel-tasklist-${Date.now()}`;
export const BAD_TASK_LIST = `condorance-smoke-actcancel-bad-tl-${Date.now()}`;
export const WORKFLOW_ID = `condorance-smoke-actcancel-${Date.now()}`;

export const ONE_SECOND_NS = 1_000_000_000;
export const TEN_SECONDS_NS = 10_000_000_000;

const observed = { invoked: [] as string[] };

export async function ToUpperWithDelayActivity(_ctx: unknown, input: string): Promise<string> {
  observed.invoked.push('toUpperWithDelay');
  await new Promise((r) => setTimeout(r, 1_000));
  return input.toUpperCase();
}

export async function ToUpperActivity(_ctx: unknown, input: string): Promise<string> {
  observed.invoked.push('toUpper');
  return input.toUpperCase();
}

export async function ActivityCancelReproWF(ctx: any): Promise<string[]> {
  const [cctx, cancel] = await WithCancel(ctx);

  // First coroutine: real activity on our task list, then cancel the root context.
  Go(cctx as never, async (ctx1: any) => {
    const actx = WithActivityOptions(ctx1 as never, {
      TaskList: TASK_LIST,
      ScheduleToStartTimeout: TEN_SECONDS_NS,
      ScheduleToCloseTimeout: TEN_SECONDS_NS,
      StartToCloseTimeout: 9 * ONE_SECOND_NS,
      HeartbeatTimeout: 0,
    } as never);
    const future = await ExecuteActivity(actx, 'ToUpperWithDelayActivity', 'hello');
    const box: { value: unknown } = { value: undefined };
    try {
      await future.Get(actx, box);
    } catch {
      return;
    }
    await cancel();
  });

  // Second and third coroutines: activities on a task list nobody polls — they
  // stay SCHEDULED and must be swept by the cancel while never-started.
  for (let i = 0; i < 2; i++) {
    Go(cctx as never, async (ctx1: any) => {
      const actx = WithActivityOptions(ctx1 as never, {
        TaskList: BAD_TASK_LIST,
        ScheduleToStartTimeout: TEN_SECONDS_NS,
        ScheduleToCloseTimeout: TEN_SECONDS_NS,
        StartToCloseTimeout: ONE_SECOND_NS,
        HeartbeatTimeout: 0,
      } as never);
      const future = await ExecuteActivity(actx, 'ToUpperActivity', 'hello');
      const box: { value: unknown } = { value: undefined };
      try {
        await future.Get(actx, box);
      } catch {
        // expected: canceled before start
      }
    });
  }

  // Block the main coroutine; the cancel cuts this short (error ignored, as upstream).
  try {
    await Sleep(cctx, TEN_SECONDS_NS);
  } catch {
    // canceled — fine
  }

  return ['toUpperWithDelay'];
}

describe('generated worker engine -> real Cadence server (multi-activity cancel repro)', () => {
  it('cancel sweeps scheduled-but-never-started activities and the workflow completes', async () => {
    const service = newWorkflowServiceClient({ address: '127.0.0.1:7833', caller: 'condorance-smoke' });
    const worker = await NewWorker(
      service as any, DOMAIN, TASK_LIST,
      new WorkerOptions({ Identity: 'condorance-smoke-actcancel-worker' }) as any,
    );
    worker.RegisterWorkflow(ActivityCancelReproWF);
    worker.RegisterActivityWithOptions(ToUpperWithDelayActivity, {
      Name: 'ToUpperWithDelayActivity',
      EnableShortName: false,
      DisableAlreadyRegisteredCheck: false,
      EnableAutoHeartbeat: false,
    } as never);
    worker.RegisterActivityWithOptions(ToUpperActivity, {
      Name: 'ToUpperActivity',
      EnableShortName: false,
      DisableAlreadyRegisteredCheck: false,
      EnableAutoHeartbeat: false,
    } as never);
    worker.Start();

    const client = clientFromService(service, DOMAIN, 'condorance-smoke-actcancel-client');
    try {
      await startWorkflow(client, {
        workflowID: WORKFLOW_ID,
        taskList: TASK_LIST,
        workflowType: 'ActivityCancelReproWF',
        executionTimeoutSeconds: 60,
        decisionTimeoutSeconds: 10,
      });

      let history = '';
      await waitUntil(async () => {
        history = await showWorkflow(client, WORKFLOW_ID);
        return /(?<!Child)WorkflowExecution(Completed|Failed|TimedOut)\b/.test(history);
      }, 45_000, 'cancel-repro workflow never reached a terminal event');

      // Upstream contract: the workflow COMPLETES (no wedged state machine) and only
      // the delayed activity ever executed.
      expect(history).toMatch(/WorkflowExecutionCompleted/);
      expect(history).toContain('toUpperWithDelay');
      expect(observed.invoked).toEqual(['toUpperWithDelay']);
      // The two bad-task-list activities were scheduled, then cancel-requested.
      expect(history.match(/ActivityTaskScheduled/g)?.length ?? 0).toBe(3);
      expect(history).toMatch(/ActivityTaskCancelRequested/);
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
