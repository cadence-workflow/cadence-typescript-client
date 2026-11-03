/*
 * End-to-end integration: LOCAL-ACTIVITY GetInfo — activity.GetInfo/HasInfo inside a LOCAL
 * activity reflect the calling workflow's metadata (mirrors go-client
 * TestInspectLocalActivityInfo).
 *
 * The workflow reads its own workflow.GetInfo (Domain, WorkflowType.Name,
 * TaskListName) and passes them to a local activity; the local activity re-derives
 * the same values from activity.GetInfo and the test asserts the two views agree —
 * exactly the upstream fixture's cross-check, but with the comparison surfaced into
 * test-scope observations.
 */
import { describe, it, expect } from 'vitest';
import { GetInfo as GetActivityInfo, HasInfo } from '../../src/activity/activity.js';
import { Ref } from '../../src/internal/runtime/ref.js';
import { WorkerOptions } from '../../src/internal/worker.js';
import { New as NewWorker } from '../../src/worker/worker.js';
import { WithLocalActivityOptions } from '../../src/workflow/activity_options.js';
import { ExecuteLocalActivity, GetInfo as GetWorkflowInfo } from '../../src/workflow/workflow.js';
import { newWorkflowServiceClient } from '../../src/workflow_service_client.js';
import { clientFromService, showWorkflow, startWorkflow } from './harness.js';

export const DOMAIN = process.env.CADENCE_DOMAIN ?? 'default';
export const TASK_LIST = `condorance-smoke-lainfo-tasklist-${Date.now()}`;
export const TEN_SECONDS_NS = 10_000_000_000;

const observed = {
  laHasInfo: undefined as boolean | undefined,
  laDomain: '', laTaskList: '', laWfType: '',
  wfDomain: '', wfTaskList: '', wfType: '',
};

export async function InspectLAInfoActivity(ctx: unknown, domain: string, taskList: string, wfType: string): Promise<string> {
  observed.laHasInfo = HasInfo(ctx as never);
  const info = GetActivityInfo(ctx as never);
  observed.laDomain = info?.WorkflowDomain ?? '';
  observed.laTaskList = info?.TaskList ?? '';
  observed.laWfType = info?.WorkflowType?.Name ?? '';
  // The upstream fixture's own cross-check: mismatches fail the activity.
  if (observed.laDomain !== domain) throw new Error(`domain mismatch: ${observed.laDomain} != ${domain}`);
  if (observed.laWfType !== wfType) throw new Error(`wfType mismatch: ${observed.laWfType} != ${wfType}`);
  if (observed.laTaskList !== taskList) throw new Error(`taskList mismatch: ${observed.laTaskList} != ${taskList}`);
  return 'la-info-ok';
}

export async function InspectLAInfoWorkflow(ctx: any): Promise<string> {
  const info = GetWorkflowInfo(ctx);
  observed.wfDomain = String(info?.Domain ?? '');
  observed.wfTaskList = String(info?.TaskListName ?? '');
  observed.wfType = String(info?.WorkflowType?.Name ?? '');
  const lctx = WithLocalActivityOptions(ctx, {
    ScheduleToCloseTimeout: TEN_SECONDS_NS,
  } as never);
  const future = await ExecuteLocalActivity(lctx, InspectLAInfoActivity, observed.wfDomain, observed.wfTaskList, observed.wfType);
  const box = new Ref<unknown>(undefined);
  await future.Get(lctx, box);
  return `wf-saw:${box.value}`;
}

describe('generated worker engine -> real Cadence server (local-activity GetInfo)', () => {
  it('activity.GetInfo inside a local activity matches the workflow metadata', async () => {
    const service = newWorkflowServiceClient({ address: '127.0.0.1:7833', caller: 'condorance-smoke' });
    const client = clientFromService(service, DOMAIN, 'condorance-smoke-lainfo-client');
    const worker = await NewWorker(
      service as any, DOMAIN, TASK_LIST,
      new WorkerOptions({ Identity: 'condorance-smoke-lainfo-worker', DisableActivityWorker: true }) as any,
    );
    worker.RegisterWorkflow(InspectLAInfoWorkflow);
    worker.Start();

    const workflowID = `condorance-smoke-lainfo-${Date.now()}`;
    try {
      await startWorkflow(client, {
        workflowID,
        taskList: TASK_LIST,
        workflowType: 'InspectLAInfoWorkflow',
        executionTimeoutSeconds: 120,
        decisionTimeoutSeconds: 10,
      });

      let history = '';
      await waitUntil(async () => {
        history = await showWorkflow(client, workflowID);
        return /WorkflowExecutionCompleted|WorkflowExecutionFailed|WorkflowExecutionTimedOut/.test(history);
      }, 45_000, 'workflow never reached a terminal event');

      expect(observed.wfDomain).toBe(DOMAIN);
      expect(observed.wfTaskList).toBe(TASK_LIST);
      expect(observed.wfType).toBe('InspectLAInfoWorkflow');
      expect(observed.laHasInfo).toBe(true);
      expect(observed.laDomain).toBe(DOMAIN);
      expect(observed.laTaskList).toBe(TASK_LIST);
      expect(observed.laWfType).toBe('InspectLAInfoWorkflow');
      expect(history).toContain('wf-saw:la-info-ok');
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
