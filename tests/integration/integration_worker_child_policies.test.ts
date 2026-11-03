/*
 * End-to-end integration: PARENT CLOSE POLICIES — what happens to a still-running child when
 * its parent completes, against the REAL Cadence server.
 *
 * Two parents run back to back on one worker. Each starts a child that parks forever on
 * a signal channel, waits only for the child to START (GetChildWorkflowExecution — the
 * child-started future, not the result future), and returns while the child still runs:
 *   - ParentClosePolicy TERMINATE: the server must terminate the child when the parent
 *     closes → child closeStatus TERMINATED.
 *   - ParentClosePolicy ABANDON: the child must survive the parent's completion → child
 *     still OPEN afterwards (terminated manually at the end for cleanup).
 *
 * What this proves beyond the child integration: the ParentClosePolicy option round-trips
 * through WithChildOptions → StartChildWorkflowExecution decision → server-side child
 * lifecycle, and the child-started future resolves separately from the child result.
 */
import { describe, it, expect } from 'vitest';
import { New as NewWorker } from '../../src/worker/worker.js';
import { WorkerOptions } from '../../src/internal/worker.js';
import { ExecuteChildWorkflow, GetSignalChannel } from '../../src/workflow/workflow.js';
import { WithChildOptions } from '../../src/workflow/workflow_options.js';
import { Ref } from '../../src/internal/runtime/ref.js';
import { newWorkflowServiceClient } from '../../src/workflow_service_client.js';
import { WorkflowExecutionCloseStatus } from '../../src/generated/thrift/cadence-idl/com/uber/cadence/WorkflowExecutionCloseStatus.js';
import {
  clientFromService,
  describeWorkflow,
  showWorkflow,
  startWorkflow,
  terminateWorkflow,
} from './harness.js';

export const DOMAIN = process.env.CADENCE_DOMAIN ?? 'default';
export const TASK_LIST = `condorance-smoke-childpolicy-tasklist-${Date.now()}`;

// Go time.Duration nanoseconds.
export const ONE_MINUTE_NS = 60_000_000_000;

// internal_ParentClosePolicy: Terminate=0, RequestCancel=1, Abandon=2 (client.ts enum).
export const POLICY_TERMINATE = 0;
export const POLICY_ABANDON = 2;

function childOptions(childID: string, policy: number): unknown {
  // Value-typed fields all present: an omitted required field rides the thrift wire as
  // NaN (task #270), so every non-pointer Go field carries its explicit zero value.
  return {
    Domain: DOMAIN,
    WorkflowID: childID,
    TaskList: TASK_LIST,
    ExecutionStartToCloseTimeout: 5 * ONE_MINUTE_NS,
    TaskStartToCloseTimeout: 10_000_000_000,
    WaitForCancellation: false,
    WorkflowIDReusePolicy: 0,
    CronSchedule: '',
    ParentClosePolicy: policy,
    Bugports: {},
  };
}

describe('generated worker engine -> real Cadence server (parent close policies)', () => {
  it('TERMINATE kills the running child; ABANDON leaves it running', async () => {
    const observed = { childStarts: 0 };

    // Parks forever: only outside termination/cancellation ends this child.
    async function ParkedChildWF(ctx: any): Promise<string> {
      observed.childStarts++;
      const ch = await GetSignalChannel(ctx, 'never-sent');
      const box = new Ref<unknown>(undefined);
      await ch.Receive(ctx, box);
      return 'unreachable';
    }

    // The parent factory: starts the child under the given policy, waits ONLY for the
    // child-started future, then completes while the child is still parked.
    function makeParent(childID: string, policy: number) {
      return async function PolicyParentWF(ctx: any): Promise<string> {
        const cctx = WithChildOptions(ctx, childOptions(childID, policy) as never);
        const future = await ExecuteChildWorkflow(cctx, 'ParkedChildWF', null);
        const started = new Ref<unknown>(undefined);
        await future.GetChildWorkflowExecution().Get(cctx, started);
        return 'parent-done';
      };
    }

    const terminateChildID = `condorance-smoke-childpolicy-terminate-child-${Date.now()}`;
    const abandonChildID = `condorance-smoke-childpolicy-abandon-child-${Date.now()}`;
    const TerminatePolicyParentWF = makeParent(terminateChildID, POLICY_TERMINATE);
    Object.defineProperty(TerminatePolicyParentWF, 'name', { value: 'TerminatePolicyParentWF' });
    const AbandonPolicyParentWF = makeParent(abandonChildID, POLICY_ABANDON);
    Object.defineProperty(AbandonPolicyParentWF, 'name', { value: 'AbandonPolicyParentWF' });

    const service = newWorkflowServiceClient({ address: '127.0.0.1:7833', caller: 'condorance-smoke' });
    const client = clientFromService(service, DOMAIN, 'condorance-smoke-childpolicy');
    const worker = await NewWorker(
      service as any,
      DOMAIN,
      TASK_LIST,
      new WorkerOptions({ Identity: 'condorance-smoke-childpolicy-worker', DisableActivityWorker: true }) as any,
    );
    worker.RegisterWorkflow(TerminatePolicyParentWF);
    worker.RegisterWorkflow(AbandonPolicyParentWF);
    worker.RegisterWorkflow(ParkedChildWF);
    worker.Start();

    const describeChild = async (childID: string) => {
      const resp: any = await describeWorkflow(client, childID);
      return resp?.workflowExecutionInfo?.closeStatus;
    };

    try {
      // --- TERMINATE ---
      const terminateParentID = `condorance-smoke-childpolicy-terminate-${Date.now()}`;
      await startWorkflow(client, {
        workflowID: terminateParentID,
        taskList: TASK_LIST,
        workflowType: 'TerminatePolicyParentWF',
        executionTimeoutSeconds: 120,
        decisionTimeoutSeconds: 10,
      });
      await waitUntil(async () => {
        const history = await showWorkflow(client, terminateParentID);
        return /WorkflowExecutionCompleted/.test(history);
      }, 30_000, 'terminate-policy parent never completed');
      // The server applies the policy asynchronously; poll the child's close status.
      await waitUntil(
        async () => (await describeChild(terminateChildID)) === WorkflowExecutionCloseStatus.TERMINATED,
        30_000, 'child under TERMINATE policy never reached TERMINATED',
      );

      // --- ABANDON ---
      const abandonParentID = `condorance-smoke-childpolicy-abandon-${Date.now()}`;
      await startWorkflow(client, {
        workflowID: abandonParentID,
        taskList: TASK_LIST,
        workflowType: 'AbandonPolicyParentWF',
        executionTimeoutSeconds: 120,
        decisionTimeoutSeconds: 10,
      });
      await waitUntil(async () => {
        const history = await showWorkflow(client, abandonParentID);
        return /WorkflowExecutionCompleted/.test(history);
      }, 30_000, 'abandon-policy parent never completed');
      // Give the server the same policy-application window TERMINATE needed, then
      // assert the abandoned child is STILL open (closeStatus unset).
      await new Promise((r) => setTimeout(r, 3_000));
      const abandonStatus = await describeChild(abandonChildID);
      expect(abandonStatus == null).toBe(true);

      expect(observed.childStarts).toBeGreaterThanOrEqual(2);

      // Cleanup: the abandoned child would otherwise run until its execution timeout.
      await terminateWorkflow(client, abandonChildID, 'smoke cleanup');
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
