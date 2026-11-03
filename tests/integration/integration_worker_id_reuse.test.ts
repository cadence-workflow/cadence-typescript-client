/*
 * End-to-end integration: WORKFLOW ID REUSE POLICY — client-native start path against a real
 * Cadence server (mirrors go-client test/ TestWorkflowIDReuse*).
 *
 * This test drives client.StartWorkflow directly, covering the generated
 * StartWorkflow request construction (policy enum -> thrift mapping included).
 *
 * Scenario (same workflow ID throughout):
 *   1. Start + complete a run (policy AllowDuplicate for a clean baseline).
 *   2. Re-start with RejectDuplicate           -> server must reject; the SDK must
 *      surface the SHIM WorkflowExecutionAlreadyStartedError (error identity, fix 46/73).
 *   3. Re-start with AllowDuplicateFailedOnly  -> previous run COMPLETED, so also rejected.
 *   4. Re-start with AllowDuplicate            -> accepted, NEW RunID, completes.
 */
import { describe, it, expect } from 'vitest';
import { WorkflowExecutionAlreadyStartedError } from '../../src/errors/idl_errors.js';
import { internal_WorkflowIDReusePolicy } from '../../src/internal/client.js';
import { background } from '../../src/internal/runtime/context.js';
import { WorkerOptions } from '../../src/internal/worker.js';
import { New as NewWorker } from '../../src/worker/worker.js';
import { newWorkflowServiceClient } from '../../src/workflow_service_client.js';
import { clientFromService, showWorkflow } from './harness.js';

export const DOMAIN = process.env.CADENCE_DOMAIN ?? 'default';
export const TASK_LIST = `condorance-smoke-idreuse-tasklist-${Date.now()}`;
export const WORKFLOW_ID = `condorance-smoke-idreuse-${Date.now()}`;

export const SECOND_NS = 1_000_000_000;

const observed = { runs: 0 };

export async function IdReuseEchoWorkflow(_ctx: unknown): Promise<string> {
  observed.runs++;
  return 'done';
}

function startOptions(policy: internal_WorkflowIDReusePolicy) {
  // Durations are Go time.Duration NANOSECONDS (SDK-wide convention).
  // Every value-typed field is spelled out with its Go zero value: the emitted
  // interface requires them, and an omitted field is undefined -> NaN on the
  // thrift wire (task #270 tracks making omission behave like Go).
  return {
    ID: WORKFLOW_ID,
    TaskList: TASK_LIST,
    ExecutionStartToCloseTimeout: 60 * SECOND_NS,
    DecisionTaskStartToCloseTimeout: 10 * SECOND_NS,
    WorkflowIDReusePolicy: policy,
    CronSchedule: '',
    DelayStart: 0,
    JitterStart: 0,
    FirstRunAt: 0,
    CronOverlapPolicy: 0,
  } as any;
}

describe('generated client + worker -> real Cadence server (workflow ID reuse policy)', () => {
  it('enforces RejectDuplicate / AllowDuplicateFailedOnly / AllowDuplicate on one ID', async () => {
    const service = newWorkflowServiceClient({ address: '127.0.0.1:7833', caller: 'condorance-smoke' });
    const worker = await NewWorker(
      service as any,
      DOMAIN,
      TASK_LIST,
      new WorkerOptions({ Identity: 'condorance-smoke-worker', DisableActivityWorker: true }) as any,
    );
    worker.RegisterWorkflow(IdReuseEchoWorkflow);
    worker.Start();

    const client = clientFromService(service, DOMAIN, 'condorance-smoke');

    try {
      // 1. Baseline run: start by NAME (registration lives in the worker, not the client).
      const first = await client.StartWorkflow(
        background() as any,
        startOptions(internal_WorkflowIDReusePolicy.WorkflowIDReusePolicyAllowDuplicate),
        'IdReuseEchoWorkflow',
      );
      expect(first.ID).toBe(WORKFLOW_ID);
      expect(first.RunID).toBeTruthy();

      await waitUntil(() => observed.runs >= 1, 20_000, 'first run never executed');
      await waitUntil(
        async () => /WorkflowExecutionCompleted/.test(
          await showWorkflow(client, WORKFLOW_ID, first.RunID),
        ),
        20_000, 'first run never completed on the server',
      );

      // 2. RejectDuplicate against a COMPLETED run -> AlreadyStarted, as the SHIM class.
      await expectAlreadyStarted(
        () => client.StartWorkflow(
          background() as any,
          startOptions(internal_WorkflowIDReusePolicy.WorkflowIDReusePolicyRejectDuplicate),
          'IdReuseEchoWorkflow',
        ),
        'RejectDuplicate',
      );

      // 3. AllowDuplicateFailedOnly: prior run COMPLETED (not failed) -> also rejected.
      await expectAlreadyStarted(
        () => client.StartWorkflow(
          background() as any,
          startOptions(internal_WorkflowIDReusePolicy.WorkflowIDReusePolicyAllowDuplicateFailedOnly),
          'IdReuseEchoWorkflow',
        ),
        'AllowDuplicateFailedOnly',
      );

      // 4. AllowDuplicate -> accepted with a fresh run.
      const second = await client.StartWorkflow(
        background() as any,
        startOptions(internal_WorkflowIDReusePolicy.WorkflowIDReusePolicyAllowDuplicate),
        'IdReuseEchoWorkflow',
      );
      expect(second.RunID).toBeTruthy();
      expect(second.RunID).not.toBe(first.RunID);
      await waitUntil(() => observed.runs >= 2, 20_000, 'second run never executed');
      await waitUntil(
        async () => /WorkflowExecutionCompleted/.test(
          await showWorkflow(client, WORKFLOW_ID, second.RunID),
        ),
        20_000, 'second run never completed on the server',
      );
    } finally {
      worker.Stop();
      service.close();
    }
  }, 120_000);
});

async function expectAlreadyStarted(start: () => Promise<unknown>, label: string): Promise<void> {
  let thrown: unknown;
  try {
    await start();
  } catch (e) {
    thrown = e;
  }
  if (thrown === undefined) {
    throw new Error(`${label}: server accepted a duplicate start it must reject`);
  }
  // Identity assertion: the SDK must surface the typed shim, not a generic Error —
  // callers branch on this exact class (see internal ExecuteWorkflow).
  expect(thrown, `${label}: wrong error type: ${String(thrown)}`)
    .toBeInstanceOf(WorkflowExecutionAlreadyStartedError);
}

async function waitUntil(cond: () => boolean | Promise<boolean>, timeoutMs: number, what: string): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (await cond()) return;
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error(`timed out after ${timeoutMs}ms: ${what}`);
}
