/*
 * End-to-end integration: the GENERATED WORKER ENGINE runs a workflow on a REAL Cadence server.
 *
 * This is the worker lane. The client lane (integration_signal.test.ts) proves an outbound RPC round
 * trip; here the execution path runs the other way — the server hands a decision task to OUR
 * generated engine, which must decode the history, drive the workflow function, block it on a
 * signal channel, resume it when the signal arrives, and report completion. Everything on that
 * path is generated except the transport:
 *
 *   worker.New -> internal.NewWorker -> the decision-task poller -> the task handler ->
 *   the coroutine dispatcher -> the registered workflow function -> GetSignalChannel/Receive
 *
 * STARTING AND SIGNALLING THE WORKFLOW
 *   The test builds the generated high-level client over the same service transport as the
 *   worker, then starts and signals the workflow through the SDK client lane.
 *
 * WHAT IT ASSERTS, AND WHY THAT SHAPE
 *   The workflow records into module state and completes only after the signal is received, so
 *   a pass means the engine both SUSPENDED the workflow on an empty channel and RESUMED it on
 *   delivery. Asserting only "the workflow started" would pass on an engine that never blocks.
 *
 * TIMING
 *   The signal is sent only after the workflow body is observed running, so the decision task
 *   for the start and the one for the signal are separate — the engine has to survive a second
 *   decision task on the same execution, which is where a lost coroutine state shows up.
 */
import { describe, it, expect } from 'vitest';
import { New as NewWorker } from '../../src/worker/worker.js';
import { WorkerOptions } from '../../src/internal/worker.js';
import { GetSignalChannel } from '../../src/workflow/workflow.js';
import { Ref } from '../../src/internal/runtime/ref.js';
import { newWorkflowServiceClient } from '../../src/workflow_service_client.js';
import { clientFromService, signalWorkflow, startWorkflow } from './harness.js';

// The engine reports a failed decision task through its winston logger as `error: <Error>`, and
// JSON.stringify(new Error('boom')) is '{}' — the message and stack are non-enumerable. Without
// this the only diagnosis available is "something threw". Installed here rather than in the
// generated tree so the SDK stays exactly as generated.
Object.defineProperty(Error.prototype, 'toJSON', {
  configurable: true,
  value(this: Error) {
    return { name: this.name, message: this.message, stack: this.stack };
  },
});

// A dropped promise inside the engine (a fire-and-forget task-processing chain that rejects)
// is otherwise invisible: vitest only reports rejections it can tie to a test.
if (process.env.SMOKE_TRACE) {
  process.on('unhandledRejection', (e) => {
    // eslint-disable-next-line no-console
    console.error(`[unhandledRejection] ${e instanceof Error ? e.stack : String(e)}`);
  });
}

export const DOMAIN = process.env.CADENCE_DOMAIN ?? 'default';
export const TASK_LIST = 'condorance-smoke-tasklist';
export const SIGNAL_NAME = 'my-signal';

// Observed by the assertion below. The workflow runs inside the generated engine, so this is
// the only channel through which the test can see that the body actually executed.
// NOTE on replay: every decision task re-executes the workflow from history, so `started`
// increments once per decision task and `payloads` is rebuilt each replay — the assertions
// read only the FINAL replay's view, which must contain every signal in delivery order.
const observed: { started: number; receives: number; payloads: unknown[]; finished: boolean } = {
  started: 0,
  receives: 0,
  payloads: [],
  finished: false,
};

export const SIGNAL_COUNT = 3;

export async function SignalledWorkflow(ctx: any): Promise<void> {
  observed.started++;
  const ch = GetSignalChannel(ctx, SIGNAL_NAME);
  const payloads: unknown[] = [];
  for (let i = 0; i < SIGNAL_COUNT; i++) {
    const box = new Ref<unknown>(undefined);
    await ch.Receive(ctx, box);
    // Monotonic progress marker: increments once per delivered signal on a sticky (cached)
    // resume, and re-counts from the top on a full replay — either way it strictly grows
    // when a new signal is consumed, which is all the waiter below relies on.
    observed.receives++;
    payloads.push(box.value);
  }
  observed.payloads = payloads;
  observed.finished = true;
}

// SMOKE_TRACE=1 wraps the transport client in a logging Proxy so every RPC the engine makes —
// and every throw it swallows — is visible. The engine's own error reporting goes through its
// logger, which a failure BEFORE logger setup (or inside a Retry closure that classifies an
// unknown throw as transient) never reaches; the transport boundary sees everything.
function traceService<T extends object>(service: T): T {
  if (!process.env.SMOKE_TRACE) return service;
  return new Proxy(service, {
    get(target, prop, receiver) {
      const v = Reflect.get(target, prop, receiver);
      if (typeof v !== 'function' || typeof prop !== 'string') return v;
      return function (this: unknown, ...args: unknown[]) {
        const t0 = Date.now();
        // eslint-disable-next-line no-console
        console.error(`[rpc] -> ${prop}`);
        try {
          const out = v.apply(target, args);
          if (out instanceof Promise) {
            return out.then(
              (r) => {
                // For polls, whether the response carried a task is the whole diagnosis:
                // an empty poll should re-poll, a task-carrying poll should produce a
                // RespondDecisionTaskCompleted — silence after either names the broken stage.
                const token = (r as { taskToken?: { length?: number } } | undefined)?.taskToken;
                const detail = prop.startsWith('PollFor')
                  ? ` taskToken=${token ? token.length + 'B' : 'ABSENT (empty poll)'}`
                  : '';
                console.error(`[rpc] <- ${prop} ok (${Date.now() - t0}ms)${detail}`);
                return r;
              },
              (e) => { console.error(`[rpc] <- ${prop} THREW (${Date.now() - t0}ms): ${e}`); throw e; },
            );
          }
          console.error(`[rpc] <- ${prop} sync ok`);
          return out;
        } catch (e) {
          console.error(`[rpc] <- ${prop} SYNC THREW: ${e}`);
          throw e;
        }
      };
    },
  });
}

describe('generated worker engine -> real Cadence server', () => {
  it('runs a workflow that blocks on a signal and resumes when it arrives', async () => {
    const service = traceService(newWorkflowServiceClient({ address: '127.0.0.1:7833', caller: 'condorance-smoke' }));
    // `await` tolerates both API shapes: the async-propagation planner may color the public
    // `New` async (over-marking is sound), and awaiting a plain value is a no-op.
    const worker = await NewWorker(
      service as any,
      DOMAIN,
      TASK_LIST,
      new WorkerOptions({ Identity: 'condorance-smoke-worker', DisableActivityWorker: true }) as any,
    );
    worker.RegisterWorkflow(SignalledWorkflow);
    worker.Start();

    const client = clientFromService(service, DOMAIN, 'condorance-smoke-client');
    const workflowID = `condorance-smoke-${Date.now()}`;
    try {
      await startWorkflow(client, {
        workflowID,
        taskList: TASK_LIST,
        workflowType: 'SignalledWorkflow',
        executionTimeoutSeconds: 60,
        decisionTimeoutSeconds: 10,
      });

      // Give the engine a decision task to pick up before the first signal lands, so every
      // signal arrives on its own later decision task against a suspended coroutine.
      await waitUntil(() => observed.started > 0, 20_000, 'workflow body never started');

      for (let i = 1; i <= SIGNAL_COUNT; i++) {
        const before = observed.receives;
        await signalWorkflow(client, workflowID, SIGNAL_NAME, `hello-${i}`);
        if (i < SIGNAL_COUNT) {
          // Wait for this signal to actually be consumed before sending the next one, so each
          // signal arrives on its OWN decision task against a suspended coroutine (exercising
          // both the sticky-resume and full-replay delivery paths).
          await waitUntil(() => observed.receives > before, 20_000, `signal ${i} never woke the engine`);
        }
      }
      await waitUntil(() => observed.finished, 20_000, 'workflow never finished after all signals');

      expect(observed.payloads).toEqual(['hello-1', 'hello-2', 'hello-3']);
    } finally {
      worker.Stop();
      service.close();
    }
  }, 90_000);
});

// Polls cond until true or the deadline passes. Fails with the supplied description rather than
// a bare timeout so a failure names which half of the round trip did not happen.
async function waitUntil(cond: () => boolean, timeoutMs: number, what: string): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (cond()) return;
    await new Promise((r) => setTimeout(r, 100));
  }
  throw new Error(`timed out after ${timeoutMs}ms: ${what}`);
}
