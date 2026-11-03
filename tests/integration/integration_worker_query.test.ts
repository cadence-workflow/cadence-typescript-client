/*
 * End-to-end integration: QUERY — SetQueryHandler round trip through a real Cadence server.
 *
 * The workflow registers a query handler for 'state' that reports its current phase,
 * then parks on a signal. The test queries it through the high-level SDK client
 * while the workflow is parked (query result must reflect live coroutine state, served
 * by ProcessQuery -> the registered handler -> dataConverter encode), then signals it
 * to completion and queries again against the CLOSED execution (served via replay).
 *
 * What this proves beyond the signal integration:
 *   - SetQueryHandler wrapper -> internal setQueryHandler -> queryHandlers registry.
 *   - Query task delivery (poller IsQueryTask routing) + RespondQueryTaskCompleted.
 *   - Query results are decoded server-side exactly as the handler returned them.
 */
import { describe, it, expect } from 'vitest';
import { New as NewWorker } from '../../src/worker/worker.js';
import { WorkerOptions } from '../../src/internal/worker.js';
import { GetSignalChannel, SetQueryHandler } from '../../src/workflow/workflow.js';
import { Ref } from '../../src/internal/runtime/ref.js';
import { newWorkflowServiceClient } from '../../src/workflow_service_client.js';
import {
  clientFromService,
  queryWorkflow,
  showWorkflow,
  signalWorkflow,
  startWorkflow,
} from './harness.js';

export const DOMAIN = process.env.CADENCE_DOMAIN ?? 'default';
export const TASK_LIST = `condorance-smoke-query-tasklist-${Date.now()}`;
export const SIGNAL_NAME = 'query-release-signal';
export const QUERY_TYPE = 'state';

// SMOKE_TRACE=1 wraps the transport in a logging Proxy — the transport boundary sees every
// RPC including ones whose errors the engine swallows. For decision polls it also reports
// whether the response carried a QUERY task, which is the whole diagnosis for a query test.
function traceService<T extends object>(service: T): T {
  if (!process.env.SMOKE_TRACE) return service;
  let rpcSeq = 0;
  return new Proxy(service, {
    get(target, prop, receiver) {
      const v = Reflect.get(target, prop, receiver);
      if (typeof v !== 'function' || typeof prop !== 'string') return v;
      return function (this: unknown, ...args: unknown[]) {
        const t0 = Date.now();
        const seq = ++rpcSeq;
        // eslint-disable-next-line no-console
        let reqDetail = '';
        if (prop === 'PollForDecisionTask') {
          const req = args[1] as { taskList?: { name?: string; kind?: number } } | undefined;
          reqDetail = ` taskList=${req?.taskList?.name} kind=${req?.taskList?.kind}`;
        } else if (prop === 'RespondDecisionTaskCompleted') {
          const req = args[1] as { stickyAttributes?: { workerTaskList?: { name?: string }; scheduleToStartTimeoutSeconds?: number }; returnNewDecisionTask?: boolean } | undefined;
          reqDetail = ` sticky=${JSON.stringify(req?.stickyAttributes ?? null)}`;
        }
        console.error(`[rpc] -> #${seq} ${prop}${reqDetail} @${t0 % 100000}`);
        try {
          const out = v.apply(target, args);
          if (out instanceof Promise) {
            return out.then(
              (r) => {
                const resp = r as { taskToken?: { length?: number }; query?: unknown } | undefined;
                const detail = prop.startsWith('PollFor')
                  ? ` taskToken=${resp?.taskToken ? resp.taskToken.length + 'B' : 'ABSENT (empty poll)'} query=${resp?.query != null}`
                  : '';
                console.error(`[rpc] <- #${seq} ${prop} ok (${Date.now() - t0}ms)${detail}`);
                return r;
              },
              (e) => { console.error(`[rpc] <- #${seq} ${prop} THREW (${Date.now() - t0}ms): ${e}`); throw e; },
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

describe('generated worker engine -> real Cadence server (query)', () => {
  it('serves live queries while parked and after completion', async () => {
    const observed = { started: false, released: false, handlerCalls: 0 };

    async function SmokeQueryWF(ctx: any): Promise<void> {
      // Phase is coroutine-local state; the handler must observe it live.
      let phase = 'waiting';
      await SetQueryHandler(ctx, QUERY_TYPE, () => {
        observed.handlerCalls++;
        return `phase:${phase}`;
      });
      observed.started = true;

      const ch = GetSignalChannel(ctx, SIGNAL_NAME);
      const box = new Ref<unknown>(undefined);
      await ch.Receive(ctx, box);
      phase = `released:${box.value}`;
      observed.released = true;
    }

    const service = traceService(newWorkflowServiceClient({ address: '127.0.0.1:7833', caller: 'condorance-smoke' }));
    const client = clientFromService(service, DOMAIN, 'condorance-smoke-query-client');
    const worker = await NewWorker(
      service as any,
      DOMAIN,
      TASK_LIST,
      new WorkerOptions({ Identity: 'condorance-smoke-query-worker', DisableActivityWorker: true }) as any,
    );
    worker.RegisterWorkflow(SmokeQueryWF);
    worker.Start();

    const workflowID = `condorance-smoke-query-${Date.now()}`;
    try {
      const execution = await startWorkflow(client, {
        workflowID,
        taskList: TASK_LIST,
        workflowType: 'SmokeQueryWF',
        executionTimeoutSeconds: 120,
        decisionTimeoutSeconds: 10,
      });
      await waitUntil(() => observed.started, 20_000, 'workflow body never started');

      // Query the OPEN, parked workflow.
      const liveResult = await queryWorkflow<string>(
        client,
        workflowID,
        QUERY_TYPE,
        execution.runId,
      );
      expect(liveResult).toContain('phase:waiting');
      expect(observed.handlerCalls).toBeGreaterThan(0);

      await signalWorkflow(client, workflowID, SIGNAL_NAME, 'go', execution.runId);
      await waitUntil(() => observed.released, 20_000, 'signal never released the workflow');

      let history = '';
      await waitUntil(async () => {
        history = await showWorkflow(client, workflowID, execution.runId);
        return /WorkflowExecutionCompleted|WorkflowExecutionFailed|WorkflowExecutionTimedOut/.test(history);
      }, 20_000, 'server never recorded a terminal event');
      expect(history).toMatch(/WorkflowExecutionCompleted/);

      // Query the CLOSED workflow: the server dispatches a query-only decision task and
      // the worker must replay to the final state before answering.
      const closedResult = await queryWorkflow<string>(
        client,
        workflowID,
        QUERY_TYPE,
        execution.runId,
      );
      expect(closedResult).toContain('phase:released:go');
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
