/*
 * End-to-end integration: VISIBILITY LIST APIs — ListOpenWorkflow / ListClosedWorkflow /
 * DescribeWorkflowExecution through the generated client against the REAL server.
 *
 * A workflow parks on a signal (OPEN), is found by ListOpenWorkflow with a
 * workflowId execution filter, is released by SignalWorkflow, and is then found by
 * ListClosedWorkflow with closeStatus COMPLETED. Basic (DB) visibility only — the
 * ListWorkflow/CountWorkflow query APIs need advanced visibility (Elasticsearch),
 * which a minimal single-node server typically does not run.
 *
 * Time filter values are Go time.Time.UnixNano() int64s; a ±1h window tolerates the
 * float64 precision loss on nanosecond timestamps.
 */
import { describe, it, expect } from 'vitest';
import { WorkflowExecutionCloseStatus } from '../../src/generated/thrift/cadence-idl/com/uber/cadence/WorkflowExecutionCloseStatus.js';
import { background } from '../../src/internal/runtime/context.js';
import { Ref } from '../../src/internal/runtime/ref.js';
import { WorkerOptions } from '../../src/internal/worker.js';
import { GetSignalChannel } from '../../src/workflow/workflow.js';
import { New as NewWorker } from '../../src/worker/worker.js';
import { newWorkflowServiceClient } from '../../src/workflow_service_client.js';
import {
  clientFromService,
  showWorkflow,
  signalWorkflow,
  startWorkflow,
} from './harness.js';

export const DOMAIN = process.env.CADENCE_DOMAIN ?? 'default';
export const TASK_LIST = `condorance-smoke-visibility-tasklist-${Date.now()}`;

describe('generated client -> real Cadence server (visibility list APIs)', () => {
  it('finds the run in ListOpenWorkflow while parked and in ListClosedWorkflow after completion', async () => {
    async function VisibilityProbeWorkflow(ctx: any): Promise<string> {
      const ch = await GetSignalChannel(ctx, 'release');
      const box = new Ref<unknown>(undefined);
      await ch.Receive(ctx, box);
      return `released:${box.value}`;
    }

    const service = newWorkflowServiceClient({ address: '127.0.0.1:7833', caller: 'condorance-smoke' });
    const client = clientFromService(service, DOMAIN, 'condorance-smoke-visibility');
    const worker = await NewWorker(
      service as any, DOMAIN, TASK_LIST,
      new WorkerOptions({ Identity: 'condorance-smoke-visibility-worker', DisableActivityWorker: true }) as any,
    );
    worker.RegisterWorkflow(VisibilityProbeWorkflow);
    worker.Start();

    const WORKFLOW_ID = `condorance-smoke-visibility-${Date.now()}`;
    const HOUR_NS = 3_600_000_000_000_000;
    const nowNs = Date.now() * 1_000_000;
    const listRequest = {
      maximumPageSize: 10,
      StartTimeFilter: { earliestTime: nowNs - HOUR_NS, latestTime: nowNs + HOUR_NS },
      executionFilter: { workflowId: WORKFLOW_ID },
    };

    try {
      await startWorkflow(client, {
        workflowID: WORKFLOW_ID,
        taskList: TASK_LIST,
        workflowType: 'VisibilityProbeWorkflow',
        executionTimeoutSeconds: 120,
        decisionTimeoutSeconds: 10,
      });

      // OPEN: the parked run must appear in basic visibility's open list.
      let openExecs: any[] = [];
      await waitUntil(async () => {
        const resp: any = await client.ListOpenWorkflow(background() as any, listRequest as never);
        openExecs = resp?.executions ?? [];
        return openExecs.length === 1;
      }, 30_000, 'ListOpenWorkflow never returned the parked run');
      expect(openExecs[0]?.execution?.workflowId).toBe(WORKFLOW_ID);
      expect(openExecs[0]?.closeStatus == null).toBe(true);

      await signalWorkflow(client, WORKFLOW_ID, 'release', 'go');

      // CLOSED: after completion the run must move to the closed list with COMPLETED.
      let closedExecs: any[] = [];
      await waitUntil(async () => {
        const resp: any = await client.ListClosedWorkflow(background() as any, listRequest as never);
        closedExecs = resp?.executions ?? [];
        return closedExecs.length === 1;
      }, 30_000, 'ListClosedWorkflow never returned the completed run');
      expect(closedExecs[0]?.execution?.workflowId).toBe(WORKFLOW_ID);
      expect(closedExecs[0]?.closeStatus).toBe(WorkflowExecutionCloseStatus.COMPLETED);

      const history = await showWorkflow(client, WORKFLOW_ID);
      expect(history).toContain('released:go');
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
    await new Promise((r) => setTimeout(r, 200));
  }
  throw new Error(`timed out after ${timeoutMs}ms: ${what}`);
}
