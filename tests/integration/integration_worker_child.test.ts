/*
 * End-to-end integration: CHILD WORKFLOW — parent spawns a child through the REAL Cadence server.
 *
 * The parent workflow sets ChildWorkflowOptions, calls ExecuteChildWorkflow, and blocks on
 * the returned future. The server schedules the child as its own execution ON THE SAME
 * TASK LIST, so this one worker must interleave BOTH executions: the parent's
 * StartChildWorkflowExecution decision, the child's own decision tasks, and the parent's
 * resume on ChildWorkflowExecutionCompleted with the child's decoded result.
 *
 * What this proves beyond the activity integration:
 *   - StartChildWorkflowExecution decision state machine round trip.
 *   - Two concurrent workflow executions cached/replayed by one worker.
 *   - Child result decode: the parent's future.Get writes the child's return value.
 */
import { describe, it, expect } from 'vitest';
import { New as NewWorker } from '../../src/worker/worker.js';
import { WorkerOptions } from '../../src/internal/worker.js';
import { ExecuteChildWorkflow } from '../../src/workflow/workflow.js';
import { WithChildOptions } from '../../src/workflow/workflow_options.js';
import { Ref } from '../../src/internal/runtime/ref.js';
import { EventType } from '../../src/generated/thrift/cadence-idl/com/uber/cadence/EventType.js';
import { newWorkflowServiceClient } from '../../src/workflow_service_client.js';
import {
  clientFromService,
  getAllEvents,
  hasEvent,
  hasTerminalEvent,
  showWorkflow,
  startWorkflow,
} from './harness.js';

export const DOMAIN = process.env.CADENCE_DOMAIN ?? 'default';
export const TASK_LIST = `condorance-smoke-child-tasklist-${Date.now()}`;

// Go time.Duration nanoseconds.
export const ONE_MINUTE_NS = 60_000_000_000;

describe('generated worker engine -> real Cadence server (child workflow)', () => {
  it('parent starts a child, child runs, parent resumes with the child result', async () => {
    const observed = { parentStarted: false, childRan: 0, childArg: '', parentGot: '' };

    async function SmokeChildWF(_ctx: any, input: string): Promise<string> {
      observed.childRan++;
      observed.childArg = input;
      return `child-echo:${input}`;
    }

    async function SmokeParentWF(ctx: any): Promise<string> {
      observed.parentStarted = true;
      const cctx = WithChildOptions(ctx, {
        Domain: DOMAIN,
        WorkflowID: '',
        TaskList: TASK_LIST,
        ExecutionStartToCloseTimeout: ONE_MINUTE_NS,
        TaskStartToCloseTimeout: 10_000_000_000,
        WaitForCancellation: false,
        WorkflowIDReusePolicy: 0 as never,
        CronSchedule: '',
        ParentClosePolicy: 0 as never,
        Bugports: {} as never,
      } as never);
      const future = await ExecuteChildWorkflow(cctx, 'SmokeChildWF', 'ping');
      const box = new Ref<unknown>(undefined);
      await future.Get(cctx, box);
      observed.parentGot = String(box.value);
      return `parent-saw:${box.value}`;
    }

    const service = newWorkflowServiceClient({ address: '127.0.0.1:7833', caller: 'condorance-smoke' });
    const client = clientFromService(service, DOMAIN, 'condorance-smoke-child');
    const worker = await NewWorker(
      service as any,
      DOMAIN,
      TASK_LIST,
      new WorkerOptions({ Identity: 'condorance-smoke-child-worker', DisableActivityWorker: true }) as any,
    );
    worker.RegisterWorkflow(SmokeParentWF);
    worker.RegisterWorkflow(SmokeChildWF);
    worker.Start();

    const workflowID = `condorance-smoke-child-${Date.now()}`;
    try {
      await startWorkflow(client, {
        workflowID,
        taskList: TASK_LIST,
        workflowType: 'SmokeParentWF',
        executionTimeoutSeconds: 120,
        decisionTimeoutSeconds: 10,
      });
      await waitUntil(() => observed.parentStarted, 20_000, 'parent body never started');
      await waitUntil(() => observed.childRan > 0, 30_000, 'child workflow never ran');
      expect(observed.childArg).toBe('ping');

      await waitUntil(async () => {
        return hasTerminalEvent(await getAllEvents(client, workflowID));
      }, 30_000, 'server never recorded a parent terminal event');
      const events = await getAllEvents(client, workflowID);
      const history = await showWorkflow(client, workflowID);
      expect(history).toMatch(/StartChildWorkflowExecutionInitiated/);
      expect(history).toMatch(/ChildWorkflowExecutionStarted/);
      expect(history).toMatch(/ChildWorkflowExecutionCompleted/);
      expect(hasEvent(events, EventType.WorkflowExecutionCompleted)).toBe(true);
      // The parent's completion result must carry the child's decoded value.
      expect(history).toContain('parent-saw:child-echo:ping');
      expect(observed.parentGot).toBe('child-echo:ping');
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
