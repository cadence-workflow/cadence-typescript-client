/*
 * End-to-end integration: CHILD WORKFLOW MEMO — ChildWorkflowOptions.Memo rides the
 * StartChildWorkflowExecution decision and lands on the child's visibility record
 * (mirrors go-client TestChildWFWithMemoAndSearchAttributes' memo half; the
 * SearchAttributes half needs advanced visibility/Elasticsearch, absent on the
 * single-node server).
 *
 * The parent starts a child with a Memo and waits for its result; afterwards
 * DescribeWorkflowExecution on the child's fixed WorkflowID must return the memo
 * key with the JSON-encoded value.
 */
import { describe, it, expect } from 'vitest';
import { New as NewWorker } from '../../src/worker/worker.js';
import { WorkerOptions } from '../../src/internal/worker.js';
import { ExecuteChildWorkflow } from '../../src/workflow/workflow.js';
import { WithChildOptions } from '../../src/workflow/workflow_options.js';
import { Ref } from '../../src/internal/runtime/ref.js';
import { newWorkflowServiceClient } from '../../src/workflow_service_client.js';
import {
  clientFromService,
  describeWorkflow,
  getAllEvents,
  hasTerminalEvent,
  showWorkflow,
  startWorkflow,
} from './harness.js';

export const DOMAIN = process.env.CADENCE_DOMAIN ?? 'default';
export const TASK_LIST = `condorance-smoke-childmemo-tasklist-${Date.now()}`;
export const CHILD_ID = `condorance-smoke-childmemo-child-${Date.now()}`;

export const ONE_MINUTE_NS = 60_000_000_000;

export async function MemoChildWF(_ctx: any): Promise<string> {
  return 'memo-child-done';
}

export async function MemoParentWF(ctx: any): Promise<string> {
  // Value-typed fields all present (task #270: omitted required field -> NaN on the wire).
  const cctx = WithChildOptions(ctx, {
    Domain: DOMAIN,
    WorkflowID: CHILD_ID,
    TaskList: TASK_LIST,
    ExecutionStartToCloseTimeout: ONE_MINUTE_NS,
    TaskStartToCloseTimeout: 10_000_000_000,
    WaitForCancellation: false,
    WorkflowIDReusePolicy: 0,
    CronSchedule: '',
    ParentClosePolicy: 0,
    Bugports: {},
    Memo: { smokeKey: 'smoke-memo-value' },
  } as never);
  const future = await ExecuteChildWorkflow(cctx, 'MemoChildWF', null);
  const box = new Ref<unknown>(undefined);
  await future.Get(cctx, box);
  return `parent-saw:${box.value}`;
}

describe('generated worker engine -> real Cadence server (child workflow memo)', () => {
  it('the child visibility record carries the memo set in ChildWorkflowOptions', async () => {
    const service = newWorkflowServiceClient({ address: '127.0.0.1:7833', caller: 'condorance-smoke' });
    const client = clientFromService(service, DOMAIN, 'condorance-smoke-childmemo');
    const worker = await NewWorker(
      service as any, DOMAIN, TASK_LIST,
      new WorkerOptions({ Identity: 'condorance-smoke-childmemo-worker', DisableActivityWorker: true }) as any,
    );
    worker.RegisterWorkflow(MemoParentWF);
    worker.RegisterWorkflow(MemoChildWF);
    worker.Start();

    const parentID = `condorance-smoke-childmemo-${Date.now()}`;
    try {
      await startWorkflow(client, {
        workflowID: parentID,
        taskList: TASK_LIST,
        workflowType: 'MemoParentWF',
        executionTimeoutSeconds: 120,
        decisionTimeoutSeconds: 10,
      });

      await waitUntil(async () => {
        return hasTerminalEvent(await getAllEvents(client, parentID));
      }, 45_000, 'memo parent never reached a terminal event');
      const history = await showWorkflow(client, parentID);
      expect(history).toContain('parent-saw:memo-child-done');

      const resp: any = await describeWorkflow(client, CHILD_ID);
      // creditkarma decodes thrift map<string,binary> as a JS Map.
      const memoFields = resp?.workflowExecutionInfo?.memo?.fields;
      const raw = memoFields instanceof Map ? memoFields.get('smokeKey') : memoFields?.['smokeKey'];
      expect(raw != null).toBe(true);
      // Memo payloads are the SDK's JSON data-converter encoding.
      expect(String(raw)).toContain('smoke-memo-value');
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
