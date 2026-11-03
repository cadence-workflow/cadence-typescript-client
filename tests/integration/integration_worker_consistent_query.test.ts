/*
 * End-to-end integration: CONSISTENT QUERY — QueryWorkflowWithOptions with
 * QueryConsistencyLevel STRONG plus a QueryRejectCondition round trip
 * (mirrors go-client TestConsistentQuery).
 *
 * What this proves beyond the plain query test (SDK-driven, eventual):
 *   - the NATIVE QueryWorkflowWithOptions request path: queryConsistencyLevel and
 *     queryRejectCondition ride the thrift QueryWorkflowRequest,
 *   - STRONG consistency: the query is answered only after the just-sent signal's
 *     effect is applied, so querying IMMEDIATELY after SignalWorkflow (no client-side
 *     wait for the worker to observe it) must already see the signal's value,
 *   - the QueryRejected arm: NOT_OPEN against a completed run returns a rejection
 *     with the run's close status instead of a result.
 */
import { describe, it, expect } from 'vitest';
import { New as NewWorker } from '../../src/worker/worker.js';
import { WorkerOptions } from '../../src/internal/worker.js';
import { GetSignalChannel, SetQueryHandler } from '../../src/workflow/workflow.js';
import { background } from '../../src/internal/runtime/context.js';
import { newWorkflowServiceClient } from '../../src/workflow_service_client.js';
import { QueryConsistencyLevel } from '../../src/generated/thrift/cadence-idl/com/uber/cadence/QueryConsistencyLevel.js';
import { QueryRejectCondition } from '../../src/generated/thrift/cadence-idl/com/uber/cadence/QueryRejectCondition.js';
import {
  clientFromService,
  showWorkflow,
  signalWorkflow,
  startWorkflow,
} from './harness.js';

export const DOMAIN = process.env.CADENCE_DOMAIN ?? 'default';
export const TASK_LIST = `condorance-smoke-consistentquery-tasklist-${Date.now()}`;
export const WORKFLOW_ID = `condorance-smoke-consistentquery-${Date.now()}`;
export const SIGNAL_NAME = 'cq-signal';
export const QUERY_TYPE = 'collected-state';

const observed = { parked: false };

export async function ConsistentQueryWorkflow(ctx: any): Promise<string> {
  let collected = '';
  await SetQueryHandler(ctx, QUERY_TYPE, () => collected);
  const ch = GetSignalChannel(ctx, SIGNAL_NAME);
  observed.parked = true;
  for (;;) {
    const box: { value: unknown } = { value: undefined };
    await (ch as any).Receive(ctx, box);
    const v = String(box.value);
    if (v === 'done') break;
    collected = collected === '' ? v : `${collected},${v}`;
  }
  return collected;
}

describe('generated client + worker -> real Cadence server (consistent query)', () => {
  it('STRONG query right after a signal sees the signal; NOT_OPEN rejects on the closed run', async ({ skip }) => {
    const service = newWorkflowServiceClient({ address: '127.0.0.1:7833', caller: 'condorance-smoke' });
    const worker = await NewWorker(
      service as any, DOMAIN, TASK_LIST,
      new WorkerOptions({ Identity: 'condorance-smoke-consistentquery-worker', DisableActivityWorker: true }) as any,
    );
    worker.RegisterWorkflow(ConsistentQueryWorkflow);
    worker.Start();

    const client = clientFromService(service, DOMAIN, 'condorance-smoke-consistentquery');

    try {
      await startWorkflow(client, {
        workflowID: WORKFLOW_ID,
        taskList: TASK_LIST,
        workflowType: 'ConsistentQueryWorkflow',
        executionTimeoutSeconds: 120,
        decisionTimeoutSeconds: 10,
      });
      await waitUntil(() => observed.parked, 20_000, 'workflow never reached the signal park point');

      // Signal, then query STRONG immediately — no wait for the worker to observe the
      // signal. Strong consistency must make the answer include the signal's effect.
      await signalWorkflow(client, WORKFLOW_ID, SIGNAL_NAME, 'one');
      let strongResp;
      try {
        strongResp = await client.QueryWorkflowWithOptions(background() as any, {
          WorkflowID: WORKFLOW_ID,
          RunID: '',
          QueryType: QUERY_TYPE,
          QueryConsistencyLevel: QueryConsistencyLevel.STRONG,
        } as never);
      } catch (err) {
        if (/does not enable strongly consistent query/i.test(String(err))) {
          skip('Cadence cluster/domain does not enable strongly consistent queries');
          return;
        }
        throw err;
      }
      expect(strongResp.QueryRejected == null).toBe(true);
      const strongBox: { value: string } = { value: '' };
      strongResp.QueryResult!.Get(strongBox);
      expect(strongBox.value).toBe('one');

      // Second signal + STRONG query: state accumulates in signal order.
      await signalWorkflow(client, WORKFLOW_ID, SIGNAL_NAME, 'two');
      const strongResp2 = await client.QueryWorkflowWithOptions(background() as any, {
        WorkflowID: WORKFLOW_ID,
        RunID: '',
        QueryType: QUERY_TYPE,
        QueryConsistencyLevel: QueryConsistencyLevel.STRONG,
      } as never);
      const strongBox2: { value: string } = { value: '' };
      strongResp2.QueryResult!.Get(strongBox2);
      expect(strongBox2.value).toBe('one,two');

      // Complete the run, then exercise the rejection arm: NOT_OPEN on a closed run.
      await signalWorkflow(client, WORKFLOW_ID, SIGNAL_NAME, 'done');
      await waitUntil(async () => {
        const history = await showWorkflow(client, WORKFLOW_ID);
        return /WorkflowExecutionCompleted/.test(history);
      }, 30_000, 'run never completed on the server');

      const rejectedResp = await client.QueryWorkflowWithOptions(background() as any, {
        WorkflowID: WORKFLOW_ID,
        RunID: '',
        QueryType: QUERY_TYPE,
        QueryRejectCondition: QueryRejectCondition.NOT_OPEN,
      } as never);
      expect(rejectedResp.QueryRejected != null).toBe(true);
      expect(rejectedResp.QueryResult == null).toBe(true);
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
