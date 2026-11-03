/*
 * End-to-end integration: LARGE QUERY RESULT ERROR — a query handler whose encoded result
 * exceeds the 2,000,000-byte limit must fail the QUERY (QueryFailedError with the
 * size message), not the workflow (mirrors go-client TestLargeQueryResultError).
 *
 * The workflow parks on a signal with a handler returning a 3MB string. The native
 * client.QueryWorkflow call must REJECT with the engine's size message; the workflow
 * itself stays healthy and completes normally once released.
 */
import { describe, it, expect } from 'vitest';
import { WorkerOptions } from '../../src/internal/worker.js';
import { New as NewWorker } from '../../src/worker/worker.js';
import { GetSignalChannel, SetQueryHandler } from '../../src/workflow/workflow.js';
import { newWorkflowServiceClient } from '../../src/workflow_service_client.js';
import {
  clientFromService,
  queryWorkflow,
  showWorkflow,
  signalWorkflow,
  startWorkflow,
} from './harness.js';

export const DOMAIN = process.env.CADENCE_DOMAIN ?? 'default';
export const TASK_LIST = `condorance-smoke-largequery-tasklist-${Date.now()}`;
export const WORKFLOW_ID = `condorance-smoke-largequery-${Date.now()}`;
export const SIGNAL_NAME = 'large-query-release';
export const QUERY_TYPE = 'large_query';

const observed = { parked: false };

export async function LargeQueryResultWorkflow(ctx: any): Promise<string> {
  await SetQueryHandler(ctx, QUERY_TYPE, () => 'a'.repeat(3_000_000));
  const ch = GetSignalChannel(ctx, SIGNAL_NAME);
  observed.parked = true;
  await (ch as any).Receive(ctx, { value: undefined });
  return 'released';
}

describe('generated client + worker -> real Cadence server (large query result error)', () => {
  it('a 3MB query result fails the query with the size message; the workflow survives', async () => {
    const service = newWorkflowServiceClient({ address: '127.0.0.1:7833', caller: 'condorance-smoke' });
    const worker = await NewWorker(
      service as any, DOMAIN, TASK_LIST,
      new WorkerOptions({ Identity: 'condorance-smoke-largequery-worker', DisableActivityWorker: true }) as any,
    );
    worker.RegisterWorkflow(LargeQueryResultWorkflow);
    worker.Start();

    const client = clientFromService(service, DOMAIN, 'condorance-smoke-largequery');

    try {
      await startWorkflow(client, {
        workflowID: WORKFLOW_ID,
        taskList: TASK_LIST,
        workflowType: 'LargeQueryResultWorkflow',
        executionTimeoutSeconds: 120,
        decisionTimeoutSeconds: 10,
      });
      await waitUntil(() => observed.parked, 20_000, 'workflow never reached the park point');

      let queryErr: unknown;
      try {
        await queryWorkflow(client, WORKFLOW_ID, QUERY_TYPE);
      } catch (err) {
        queryErr = err;
      }
      expect(queryErr).toBeTruthy();
      const message = queryErr instanceof Error ? queryErr.message : String(queryErr);
      expect(message).toMatch(/query result size \(\d+\) exceeds limit \(2000000\)/);

      // The oversized QUERY must not damage the workflow: release it and expect a
      // normal completion.
      await signalWorkflow(client, WORKFLOW_ID, SIGNAL_NAME, 'go');
      let history = '';
      await waitUntil(async () => {
        history = await showWorkflow(client, WORKFLOW_ID);
        return /(?<!Child)WorkflowExecution(Completed|Failed|TimedOut)\b/.test(history);
      }, 30_000, 'workflow never completed after release');
      expect(history).toMatch(/WorkflowExecutionCompleted/);
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
