/*
 * End-to-end integration: CONTINUE-AS-NEW — a workflow ends its run by continuing as a new
 * execution carrying fresh arguments; the server chains the runs under one workflow ID.
 *
 * Go returns *ContinueAsNewError from the workflow function; the throw-based lowering
 * THROWS it. The engine must classify that error as the continue-as-new close (not a
 * failure), emit ContinueAsNewWorkflowExecution with the re-encoded argument, and the
 * SAME worker must then poll and run the successor execution to completion.
 *
 * Assertions: the workflow function ran twice with the carried-over argument (1 then 2),
 * run 1's history closes with WorkflowExecutionContinuedAsNew, and the latest run
 * completes with the final value.
 */
import { describe, it, expect } from 'vitest';
import { New as NewWorker } from '../../src/worker/worker.js';
import { WorkerOptions } from '../../src/internal/worker.js';
import { NewContinueAsNewError } from '../../src/workflow/error.js';
import { newWorkflowServiceClient } from '../../src/workflow_service_client.js';
import { clientFromService, showWorkflow, startWorkflow } from './harness.js';

export const DOMAIN = process.env.CADENCE_DOMAIN ?? 'default';
export const TASK_LIST = `condorance-smoke-can-tasklist-${Date.now()}`;

describe('generated worker engine -> real Cadence server (continue as new)', () => {
  it('continues as a new run carrying the next argument and completes the successor', async () => {
    const observed = { runs: [] as number[], result: '' };

    async function ContinueAsNewWF(ctx: any, n: number): Promise<string> {
      observed.runs.push(n);
      if (n < 2) {
        throw await NewContinueAsNewError(ctx, ContinueAsNewWF, n + 1);
      }
      observed.result = `can-done:${n}`;
      return observed.result;
    }

    const service = newWorkflowServiceClient({ address: '127.0.0.1:7833', caller: 'condorance-smoke' });
    const client = clientFromService(service, DOMAIN, 'condorance-smoke-can');
    const worker = await NewWorker(
      service as any,
      DOMAIN,
      TASK_LIST,
      new WorkerOptions({ Identity: 'condorance-smoke-can-worker', DisableActivityWorker: true }) as any,
    );
    worker.RegisterWorkflow(ContinueAsNewWF);
    worker.Start();

    const workflowID = `condorance-smoke-can-${Date.now()}`;
    try {
      const { runId: firstRunID } = await startWorkflow(client, {
        workflowID,
        taskList: TASK_LIST,
        workflowType: 'ContinueAsNewWF',
        executionTimeoutSeconds: 60,
        decisionTimeoutSeconds: 10,
        args: [1],
      });
      expect(firstRunID).not.toBe('');

      await waitUntil(() => observed.result !== '', 30_000, 'successor run never completed');
      expect(observed.runs).toEqual([1, 2]);
      expect(observed.result).toBe('can-done:2');

      // Run 1 must close as ContinuedAsNew, not Completed/Failed.
      let firstHistory = '';
      await waitUntil(async () => {
        firstHistory = await showWorkflow(client, workflowID, firstRunID);
        return /WorkflowExecutionContinuedAsNew/.test(firstHistory);
      }, 20_000, 'run 1 never recorded ContinuedAsNew');

      // The latest run (successor) completes with the final value.
      let lastHistory = '';
      await waitUntil(async () => {
        lastHistory = await showWorkflow(client, workflowID);
        return /WorkflowExecutionCompleted/.test(lastHistory);
      }, 20_000, 'successor run never recorded completion');
      expect(lastHistory).toContain('can-done:2');
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
