/*
 * End-to-end integration: REPLAY — the generated engine must rebuild coroutine state purely
 * from server history, not from its in-process cache.
 *
 * The other integration tests exercise replay only incidentally (a cache hit sticky-resumes; a miss
 * replays). This file forces the replay lane deterministically, twice:
 *
 *   A. DisableStickyExecution — the workflow context is evicted after EVERY decision task
 *      (workflowExecutionContextImpl.Unlock), so each subsequent decision arrives with full
 *      history and the workflow function re-executes from the top. The function-invocation
 *      counter must therefore exceed the single run a sticky worker would need.
 *
 *   B. Worker hand-off — worker1 handles the first decisions, then stops; a NEW worker
 *      (different identity, different sticky task list) takes the next decision. The server
 *      falls back from worker1's sticky task list to the normal one with FULL history, and
 *      worker2 must replay from scratch to a consistent suspension point before consuming
 *      the final signal. Server-side COMPLETED is the consistency judge: a divergent replay
 *      produces decisions the server rejects.
 */
import { describe, it, expect } from 'vitest';
import { New as NewWorker } from '../../src/worker/worker.js';
import { WorkerOptions, internal_NonDeterministicWorkflowPolicy } from '../../src/internal/worker.js';
import { GetSignalChannel } from '../../src/workflow/workflow.js';
import { Sleep } from '../../src/workflow/deterministic_wrappers.js';
import { Ref } from '../../src/internal/runtime/ref.js';
import { removeWorkflowContext } from '../../src/internal/internal_task_handlers.js';
import { newWorkflowServiceClient } from '../../src/workflow_service_client.js';
import {
  clientFromService,
  showWorkflow,
  signalWorkflow,
  startWorkflow,
} from './harness.js';

export const DOMAIN = process.env.CADENCE_DOMAIN ?? 'default';
export const SIGNAL_NAME = 'replay-signal';
type WorkflowClient = ReturnType<typeof clientFromService>;

// One observation struct per test; the workflow factory closes over it. `runs` counts
// FUNCTION INVOCATIONS (one per replay-from-scratch, plus the original), `receives` and
// `payloads` follow the same replay caveat as the signal integration: reads take the final view.
export type Observed = { runs: number; receives: number; payloads: unknown[]; finished: boolean };

function makeWorkflow(observed: Observed, signalCount: number) {
  return async function ReplayWorkflow(ctx: any): Promise<void> {
    observed.runs++;
    const ch = GetSignalChannel(ctx, SIGNAL_NAME);
    const payloads: unknown[] = [];
    for (let i = 0; i < signalCount; i++) {
      const box = new Ref<unknown>(undefined);
      await ch.Receive(ctx, box);
      observed.receives++;
      payloads.push(box.value);
    }
    observed.payloads = payloads;
    observed.finished = true;
  };
}

async function startAndAwait(
  client: WorkflowClient,
  observed: Observed,
  taskList: string,
  workflowType: string,
  workflowID: string,
): Promise<string> {
  const execution = await startWorkflow(client, {
    workflowID,
    taskList,
    workflowType,
    executionTimeoutSeconds: 120,
    decisionTimeoutSeconds: 10,
  });
  await waitUntil(() => observed.runs > 0, 20_000, 'workflow body never started');
  return execution.runId;
}

async function sendSignal(
  client: WorkflowClient,
  workflowID: string,
  runID: string,
  payload: string,
): Promise<void> {
  await signalWorkflow(client, workflowID, SIGNAL_NAME, payload, runID);
}

async function expectCompleted(
  client: WorkflowClient,
  workflowID: string,
  runID: string,
  mustContain: RegExp,
): Promise<void> {
  let history = '';
  await waitUntil(async () => {
    history = await showWorkflow(client, workflowID, runID);
    return /WorkflowExecutionCompleted|WorkflowExecutionFailed|WorkflowExecutionTimedOut/.test(history);
  }, 20_000, 'server never recorded a terminal event');
  expect(history).toMatch(/WorkflowExecutionCompleted/);
  expect(history).toMatch(mustContain);
}

describe('generated worker engine -> real Cadence server (replay)', () => {
  it('A: with sticky disabled, every decision task fully replays the function from history', async () => {
    const observed: Observed = { runs: 0, receives: 0, payloads: [], finished: false };
    const TASK_LIST = 'condorance-smoke-replay-nosticky-tasklist';
    const service = newWorkflowServiceClient({ address: '127.0.0.1:7833', caller: 'condorance-smoke' });
    const client = clientFromService(service, DOMAIN, 'condorance-smoke-replay-client');
    const worker = await NewWorker(
      service as any,
      DOMAIN,
      TASK_LIST,
      new WorkerOptions({
        Identity: 'condorance-smoke-replay-worker',
        DisableActivityWorker: true,
        DisableStickyExecution: true,
      }) as any,
    );
    const ReplayNoStickyWorkflow = makeWorkflow(observed, 2);
    Object.defineProperty(ReplayNoStickyWorkflow, 'name', { value: 'ReplayNoStickyWorkflow' });
    worker.RegisterWorkflow(ReplayNoStickyWorkflow);
    worker.Start();

    const workflowID = `condorance-smoke-replay-nosticky-${Date.now()}`;
    try {
      const runID = await startAndAwait(
        client,
        observed,
        TASK_LIST,
        'ReplayNoStickyWorkflow',
        workflowID,
      );

      const runsAfterStart = observed.runs;
      let before = observed.receives;
      await sendSignal(client, workflowID, runID, 'replay-1');
      await waitUntil(() => observed.receives > before, 20_000, 'signal 1 never woke the engine');

      before = observed.receives;
      await sendSignal(client, workflowID, runID, 'replay-2');
      await waitUntil(() => observed.finished, 20_000, 'workflow never finished');

      // Replay evidence: the eviction after each decision forces the NEXT decision to
      // re-invoke the function from the top — one extra full run per signal decision.
      expect(observed.runs).toBeGreaterThan(runsAfterStart);
      expect(observed.runs).toBeGreaterThanOrEqual(3);
      expect(observed.payloads).toEqual(['replay-1', 'replay-2']);

      await expectCompleted(client, workflowID, runID, /WorkflowExecutionCompleted/);
    } finally {
      worker.Stop();
      service.close();
    }
  }, 120_000);

  it('B: a fresh worker takes over mid-workflow and replays to a consistent suspension point', async () => {
    const observed: Observed = { runs: 0, receives: 0, payloads: [], finished: false };
    const TASK_LIST = 'condorance-smoke-replay-handoff-tasklist';
    const service = newWorkflowServiceClient({ address: '127.0.0.1:7833', caller: 'condorance-smoke' });
    const client = clientFromService(service, DOMAIN, 'condorance-smoke-replay-handoff-client');
    const ReplayHandoffWorkflow = makeWorkflow(observed, 2);
    Object.defineProperty(ReplayHandoffWorkflow, 'name', { value: 'ReplayHandoffWorkflow' });

    const worker1 = await NewWorker(
      service as any,
      DOMAIN,
      TASK_LIST,
      new WorkerOptions({ Identity: 'condorance-smoke-replay-worker-1', DisableActivityWorker: true }) as any,
    );
    worker1.RegisterWorkflow(ReplayHandoffWorkflow);
    worker1.Start();

    const workflowID = `condorance-smoke-replay-handoff-${Date.now()}`;
    let worker2: { Stop(): void } | undefined;
    try {
      const runID = await startAndAwait(
        client,
        observed,
        TASK_LIST,
        'ReplayHandoffWorkflow',
        workflowID,
      );

      const before = observed.receives;
      await sendSignal(client, workflowID, runID, 'handoff-1');
      await waitUntil(() => observed.receives > before, 20_000, 'signal 1 never woke worker1');

      // Hand-off: worker1 leaves; a NEW worker with a different identity (and therefore a
      // different sticky task list) must reconstruct the coroutine purely from history.
      // The workflow cache is PROCESS-global (as in the Go client), so an in-process
      // hand-off would otherwise reuse worker1's cached coroutine — evicting the run's
      // entry is the faithful stand-in for a real process restart.
      worker1.Stop();
      expect(runID).toBeTruthy();
      removeWorkflowContext(runID);
      const runsBeforeHandoff = observed.runs;

      const w2 = await NewWorker(
        service as any,
        DOMAIN,
        TASK_LIST,
        new WorkerOptions({ Identity: 'condorance-smoke-replay-worker-2', DisableActivityWorker: true }) as any,
      );
      w2.RegisterWorkflow(ReplayHandoffWorkflow);
      w2.Start();
      worker2 = w2 as any;

      await sendSignal(client, workflowID, runID, 'handoff-2');
      // Generous budget: the server first offers worker1's sticky task list and only falls
      // back to the normal task list after the sticky schedule-to-start timeout.
      await waitUntil(() => observed.finished, 60_000, 'workflow never finished after hand-off');

      // Replay evidence: worker2 could not have a cached coroutine at its suspension point —
      // finishing requires at least one fresh from-the-top run after the hand-off.
      expect(observed.runs).toBeGreaterThan(runsBeforeHandoff);
      expect(observed.payloads).toEqual(['handoff-1', 'handoff-2']);

      await expectCompleted(client, workflowID, runID, /WorkflowExecutionCompleted/);
    } finally {
      worker2?.Stop();
      service.close();
    }
  }, 150_000);

  it('C: a nondeterministic workflow is DETECTED on replay and failed under the FailWorkflow policy', async () => {
    // Negative test for matchReplayWithHistory: the function's behavior depends on which
    // invocation it is, so the replay produces different decisions than history records.
    // Invocation 1 starts a TIMER; every replay parks on a signal instead — when the timer
    // fires, the (sticky-disabled) replay of decision 2 emits no StartTimer where history
    // has one. The detector must flag it, and the FailWorkflow policy turns the flag into
    // an observable server-side WorkflowExecutionFailed with the policy's reason. A silent
    // pass here would mean the determinism guard never fires.
    const TASK_LIST = 'condorance-smoke-replay-nondet-tasklist';
    const observed = { invocations: 0 };
    const ONE_SECOND_NS = 1_000_000_000;

    async function NonDeterministicWorkflow(ctx: any): Promise<void> {
      observed.invocations++;
      if (observed.invocations === 1) {
        await Sleep(ctx as never, ONE_SECOND_NS);
      } else {
        const ch = GetSignalChannel(ctx, SIGNAL_NAME);
        const box = new Ref<unknown>(undefined);
        await ch.Receive(ctx, box);
      }
    }

    const service = newWorkflowServiceClient({ address: '127.0.0.1:7833', caller: 'condorance-smoke' });
    const client = clientFromService(service, DOMAIN, 'condorance-smoke-replay-nondet-client');
    const worker = await NewWorker(
      service as any,
      DOMAIN,
      TASK_LIST,
      new WorkerOptions({
        Identity: 'condorance-smoke-replay-nondet-worker',
        DisableActivityWorker: true,
        DisableStickyExecution: true,
        NonDeterministicWorkflowPolicy:
          internal_NonDeterministicWorkflowPolicy.NonDeterministicWorkflowPolicyFailWorkflow,
      }) as any,
    );
    worker.RegisterWorkflow(NonDeterministicWorkflow);
    worker.Start();

    const workflowID = `condorance-smoke-replay-nondet-${Date.now()}`;
    try {
      const execution = await startWorkflow(client, {
        workflowID,
        taskList: TASK_LIST,
        workflowType: 'NonDeterministicWorkflow',
        executionTimeoutSeconds: 60,
        decisionTimeoutSeconds: 10,
      });

      let history = '';
      await waitUntil(async () => {
        history = await showWorkflow(client, workflowID, execution.runId);
        return /WorkflowExecutionCompleted|WorkflowExecutionFailed|WorkflowExecutionTimedOut/.test(history);
      }, 40_000, 'server never recorded a terminal event');

      expect(observed.invocations).toBeGreaterThanOrEqual(2);
      expect(history).toMatch(/WorkflowExecutionFailed/);
      expect(history).toContain('NonDeterministicWorkflowPolicyFailWorkflow');
    } finally {
      worker.Stop();
      service.close();
    }
  }, 120_000);
});

async function waitUntil(
  cond: () => boolean | Promise<boolean>,
  timeoutMs: number,
  what: string,
): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (await cond()) return;
    await new Promise((r) => setTimeout(r, 100));
  }
  throw new Error(`timed out after ${timeoutMs}ms: ${what}`);
}
