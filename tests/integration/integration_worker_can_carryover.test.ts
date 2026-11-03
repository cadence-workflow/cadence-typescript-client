/*
 * End-to-end integration: CONTINUE-AS-NEW CARRY-OVER — the memo set at START must ride the
 * ContinueAsNewWorkflowExecution decision onto the successor run (mirrors go-client
 * TestContinueAsNewCarryOver's memo half; the SearchAttributes half needs advanced
 * visibility/Elasticsearch, absent on the single-node server).
 *
 * The first run receives the memo from StartWorkflowOptions.Memo (native client start
 * path -> getWorkflowMemo encoding). The successor run's memo can ONLY come from the
 * carry-over in the engine's continue-as-new close decision, so asserting the second
 * run observes the same memo value proves the carry-over end to end.
 */
import { describe, it, expect } from 'vitest';
import { New as NewWorker } from '../../src/worker/worker.js';
import { WorkerOptions } from '../../src/internal/worker.js';
import { NewContinueAsNewError } from '../../src/workflow/error.js';
import { GetInfo } from '../../src/workflow/workflow.js';
import { internal_WorkflowIDReusePolicy } from '../../src/internal/client.js';
import { newWorkflowServiceClient } from '../../src/workflow_service_client.js';
import { clientFromService, showWorkflow, startWorkflow } from './harness.js';

export const DOMAIN = process.env.CADENCE_DOMAIN ?? 'default';
export const TASK_LIST = `condorance-smoke-cancarry-tasklist-${Date.now()}`;
export const WORKFLOW_ID = `condorance-smoke-cancarry-${Date.now()}`;
export const MEMO_KEY = 'carryKey';
export const MEMO_VALUE = 'carry-value';
export const SECOND_NS = 1_000_000_000;

// Per-run memo observations, keyed by the run counter argument.
const observed = { memoByRun: [] as string[], result: '' };

function readMemoValue(ctx: any): string {
  const fields = GetInfo(ctx)?.Memo?.fields;
  // creditkarma decodes thrift map<string,binary> as a JS Map.
  const raw = fields instanceof Map ? fields.get(MEMO_KEY) : (fields as any)?.[MEMO_KEY];
  return raw == null ? '' : String(raw);
}

export async function CarryOverWF(ctx: any, n: number): Promise<string> {
  try {
    observed.memoByRun.push(readMemoValue(ctx));
    if (n < 2) {
      throw await NewContinueAsNewError(ctx, CarryOverWF, n + 1);
    }
    observed.result = `carry-done:${n}`;
    return observed.result;
  } catch (e: any) {
    if (!/continue/i.test(String(e?.constructor?.name))) {
      console.error('CARRYOVER-PANIC-STACK:', e?.stack ?? e);
    }
    throw e;
  }
}

describe('generated worker engine -> real Cadence server (continue-as-new memo carry-over)', () => {
  it('the successor run observes the memo set at start', async () => {
    const service = newWorkflowServiceClient({ address: '127.0.0.1:7833', caller: 'condorance-smoke' });
    const worker = await NewWorker(
      service as any, DOMAIN, TASK_LIST,
      new WorkerOptions({ Identity: 'condorance-smoke-cancarry-worker', DisableActivityWorker: true }) as any,
    );
    worker.RegisterWorkflow(CarryOverWF);
    worker.Start();

    const client = clientFromService(service, DOMAIN, 'condorance-smoke-cancarry');

    try {
      const exec = await startWorkflow(client, {
        workflowID: WORKFLOW_ID,
        taskList: TASK_LIST,
        workflowType: 'CarryOverWF',
        executionTimeoutSeconds: 60,
        decisionTimeoutSeconds: 10,
        workflowIDReusePolicy:
          internal_WorkflowIDReusePolicy.WorkflowIDReusePolicyAllowDuplicate,
        memo: { [MEMO_KEY]: MEMO_VALUE },
        args: [1],
      });

      await waitUntil(() => observed.result !== '', 30_000, 'successor run never completed');
      expect(observed.result).toBe('carry-done:2');
      // Run 1's memo came from the start request; run 2's can only come from the
      // continue-as-new carry-over. Payloads are the SDK's JSON encoding of the value.
      expect(observed.memoByRun.length).toBe(2);
      expect(observed.memoByRun[0]).toContain(MEMO_VALUE);
      expect(observed.memoByRun[1]).toContain(MEMO_VALUE);

      let firstHistory = '';
      await waitUntil(async () => {
        firstHistory = await showWorkflow(client, WORKFLOW_ID, exec.runId);
        return /WorkflowExecutionContinuedAsNew/.test(firstHistory);
      }, 20_000, 'run 1 never recorded ContinuedAsNew');

      let lastHistory = '';
      await waitUntil(async () => {
        lastHistory = await showWorkflow(client, WORKFLOW_ID);
        return /WorkflowExecutionCompleted/.test(lastHistory);
      }, 20_000, 'successor run never recorded completion');
      expect(lastHistory).toContain('carry-done:2');
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
