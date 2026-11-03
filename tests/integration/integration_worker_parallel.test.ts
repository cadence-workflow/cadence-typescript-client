/*
 * End-to-end integration: PARALLEL WORKFLOW SHAPES — fan-out/merge and pick-first race, the
 * cadence-samples branch/splitmerge/pickfirst recipes, against the REAL Cadence server.
 *
 * What this proves beyond the single-activity integration:
 *   - Fan-out: one decision schedules SEVERAL concurrent activities; the workflow then
 *     blocks on each future in turn and merges results deterministically.
 *   - Pick-first: Selector.AddFuture + Select resolves on whichever activity future
 *     completes FIRST, the losing sibling is cancelled through the child cancel
 *     context, and the workflow completes with only the winner's result.
 */
import { describe, it, expect } from 'vitest';
import { New as NewWorker } from '../../src/worker/worker.js';
import { WorkerOptions } from '../../src/internal/worker.js';
import { ExecuteActivity } from '../../src/workflow/workflow.js';
import { NewSelector } from '../../src/workflow/deterministic_wrappers.js';
import { WithCancel } from '../../src/workflow/context.js';
import { WithActivityOptions } from '../../src/workflow/activity_options.js';
import { Ref } from '../../src/internal/runtime/ref.js';
import { newWorkflowServiceClient } from '../../src/workflow_service_client.js';
import { clientFromService, showWorkflow, startWorkflow } from './harness.js';

export const DOMAIN = process.env.CADENCE_DOMAIN ?? 'default';
export const TASK_LIST = `condorance-smoke-parallel-tasklist-${Date.now()}`;

export const ONE_MINUTE_NS = 60_000_000_000;

function activityOptions(ctx: unknown): unknown {
  return WithActivityOptions(ctx as never, {
    TaskList: TASK_LIST,
    ScheduleToCloseTimeout: 0,
    ScheduleToStartTimeout: ONE_MINUTE_NS,
    StartToCloseTimeout: ONE_MINUTE_NS,
    HeartbeatTimeout: 0,
  } as never);
}

const observed = { branchRuns: 0, raceRuns: 0, slowFinished: false };

export async function BranchActivity(_ctx: unknown, part: string): Promise<string> {
  observed.branchRuns++;
  return `done-${part}`;
}

export async function RaceActivity(_ctx: unknown, speed: string): Promise<string> {
  observed.raceRuns++;
  const delayMs = speed === 'fast' ? 100 : 3_000;
  await new Promise((r) => setTimeout(r, delayMs));
  if (speed !== 'fast') observed.slowFinished = true;
  return `winner-${speed}`;
}

// Fan-out THEN merge: all three futures exist before the first Get blocks, so one
// decision carries three ScheduleActivityTask decisions.
export async function SplitMergeWorkflow(ctx: unknown): Promise<string> {
  const optCtx = activityOptions(ctx);
  const futures = await Promise.all(
    ['a', 'b', 'c'].map((part) => ExecuteActivity(optCtx as never, 'BranchActivity', part)),
  );
  const merged: string[] = [];
  for (const future of futures) {
    const box = new Ref<unknown>(undefined);
    await future.Get(optCtx as never, box);
    merged.push(String(box.value));
  }
  return merged.join('|');
}

// Pick-first: Select resolves on the FIRST completed future; the loser is cancelled.
export async function PickFirstWorkflow(ctx: unknown): Promise<string> {
  try {
    return await pickFirstBody(ctx);
  } catch (e) {
    console.error('PICKFIRST-PANIC-STACK:', (e as Error).stack);
    throw e;
  }
}

async function pickFirstBody(ctx: unknown): Promise<string> {
  const [cancelCtx, cancel] = await WithCancel(ctx as never);
  const optCtx = activityOptions(cancelCtx);
  const [fast, slow] = await Promise.all([
    ExecuteActivity(optCtx as never, 'RaceActivity', 'fast'),
    ExecuteActivity(optCtx as never, 'RaceActivity', 'slow'),
  ]);

  let first = '';
  const selector = NewSelector(optCtx as never);
  const record = (label: string) => async (f: { Get(ctx: unknown, box: unknown): Promise<unknown> }) => {
    const box = new Ref<unknown>(undefined);
    await f.Get(optCtx as never, box);
    if (first === '') first = String(box.value ?? label);
  };
  selector.AddFuture(fast as never, record('fast') as never);
  selector.AddFuture(slow as never, record('slow') as never);
  await selector.Select(optCtx as never);

  await cancel(); // cancel the losing activity — pickfirst's whole point
  return `first:${first}`;
}

describe('generated worker engine -> real Cadence server (parallel shapes)', () => {
  it('fans out three activities and merges all results', async () => {
    const service = newWorkflowServiceClient({ address: '127.0.0.1:7833', caller: 'condorance-smoke' });
    const client = clientFromService(service, DOMAIN, 'condorance-smoke-parallel-client');
    const worker = await NewWorker(
      service as any, DOMAIN, TASK_LIST,
      new WorkerOptions({ Identity: 'condorance-smoke-parallel-worker' }) as any,
    );
    worker.RegisterWorkflow(SplitMergeWorkflow);
    worker.RegisterWorkflow(PickFirstWorkflow);
    worker.RegisterActivityWithOptions(BranchActivity, {
      Name: 'BranchActivity', EnableShortName: false, DisableAlreadyRegisteredCheck: false, EnableAutoHeartbeat: false,
    } as never);
    worker.RegisterActivityWithOptions(RaceActivity, {
      Name: 'RaceActivity', EnableShortName: false, DisableAlreadyRegisteredCheck: false, EnableAutoHeartbeat: false,
    } as never);
    worker.Start();

    try {
      // --- splitmerge ---
      const splitID = `condorance-smoke-splitmerge-${Date.now()}`;
      const splitExecution = await startWorkflow(client, {
        workflowID: splitID,
        taskList: TASK_LIST,
        workflowType: 'SplitMergeWorkflow',
        executionTimeoutSeconds: 60,
        decisionTimeoutSeconds: 10,
      });
      let history = '';
      await waitUntil(async () => {
        history = await showWorkflow(client, splitID, splitExecution.runId);
        return /WorkflowExecutionCompleted|WorkflowExecutionFailed|WorkflowExecutionTimedOut/.test(history);
      }, 45_000, 'splitmerge never reached a terminal event');
      expect(history).toContain('done-a|done-b|done-c');
      expect(history).toMatch(/WorkflowExecutionCompleted/);
      expect(observed.branchRuns).toBe(3);

      // --- pickfirst ---
      const raceID = `condorance-smoke-pickfirst-${Date.now()}`;
      const raceExecution = await startWorkflow(client, {
        workflowID: raceID,
        taskList: TASK_LIST,
        workflowType: 'PickFirstWorkflow',
        executionTimeoutSeconds: 60,
        decisionTimeoutSeconds: 10,
      });
      await waitUntil(async () => {
        history = await showWorkflow(client, raceID, raceExecution.runId);
        return /WorkflowExecutionCompleted|WorkflowExecutionFailed|WorkflowExecutionTimedOut/.test(history);
      }, 45_000, 'pickfirst never reached a terminal event');
      expect(history).toContain('first:winner-fast');
      expect(history).toMatch(/WorkflowExecutionCompleted/);
      expect(observed.raceRuns).toBe(2);
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
