/*
 * End-to-end integration: TERMINATE + DESCRIBE — client-native TerminateWorkflow and
 * DescribeWorkflowExecution against a real Cadence server.
 *
 * A workflow parks on a signal that never arrives; the client terminates it with a
 * reason + details payload, then Describe must report closeStatus=TERMINATED. This is
 * the first coverage of both request paths (they were @stubs until the client-API
 * closure regen) and of the Describe response decode (thrift IDescribeWorkflowExecutionResponse
 * surfaced through the SDK unchanged, as in Go).
 */
import { describe, it, expect } from 'vitest';
import { WorkflowExecutionCloseStatus } from '../../src/generated/thrift/cadence-idl/com/uber/cadence/WorkflowExecutionCloseStatus.js';
import { internal_WorkflowIDReusePolicy } from '../../src/internal/client.js';
import { WorkerOptions } from '../../src/internal/worker.js';
import { GetSignalChannel } from '../../src/workflow/workflow.js';
import { New as NewWorker } from '../../src/worker/worker.js';
import { newWorkflowServiceClient } from '../../src/workflow_service_client.js';
import {
  clientFromService,
  describeWorkflow,
  showWorkflow,
  startWorkflow,
  terminateWorkflow,
} from './harness.js';

export const DOMAIN = process.env.CADENCE_DOMAIN ?? 'default';
export const TASK_LIST = `condorance-smoke-terminate-tasklist-${Date.now()}`;
export const WORKFLOW_ID = `condorance-smoke-terminate-${Date.now()}`;

const observed = { parked: false };

export async function ParkForeverWorkflow(ctx: unknown): Promise<void> {
  const ch = GetSignalChannel(ctx as never, 'never-sent');
  observed.parked = true;
  await (ch as any).Receive(ctx, { value: undefined });
}

describe('generated client + worker -> real Cadence server (terminate + describe)', () => {
  it('terminates a parked run and Describe reports TERMINATED', async () => {
    const service = newWorkflowServiceClient({ address: '127.0.0.1:7833', caller: 'condorance-smoke' });
    const worker = await NewWorker(
      service as any,
      DOMAIN,
      TASK_LIST,
      new WorkerOptions({ Identity: 'condorance-smoke-worker', DisableActivityWorker: true }) as any,
    );
    worker.RegisterWorkflow(ParkForeverWorkflow);
    worker.Start();

    const client = clientFromService(service, DOMAIN, 'condorance-smoke-terminate-client');

    try {
      const exec = await startWorkflow(client, {
        workflowID: WORKFLOW_ID,
        taskList: TASK_LIST,
        workflowType: 'ParkForeverWorkflow',
        executionTimeoutSeconds: 60,
        decisionTimeoutSeconds: 10,
        workflowIDReusePolicy:
          internal_WorkflowIDReusePolicy.WorkflowIDReusePolicyAllowDuplicate,
      });
      await waitUntil(() => observed.parked, 20_000, 'workflow never parked');

      await terminateWorkflow(client, WORKFLOW_ID, 'smoke-terminate', exec.runId);

      // Server-side truth first (memory: green needs the terminal event).
      await waitUntil(
        async () => /WorkflowExecutionTerminated/.test(
          await showWorkflow(client, WORKFLOW_ID, exec.runId),
        ),
        20_000, 'server never recorded WorkflowExecutionTerminated',
      );

      const desc = await describeWorkflow(client, WORKFLOW_ID, exec.runId);
      const info = (desc as any).workflowExecutionInfo;
      expect(info).toBeTruthy();
      expect(info.closeStatus).toBe(WorkflowExecutionCloseStatus.TERMINATED);
      expect(info.execution?.workflowId).toBe(WORKFLOW_ID);
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
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error(`timed out after ${timeoutMs}ms: ${what}`);
}
