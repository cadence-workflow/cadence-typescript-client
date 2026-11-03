/*
 * End-to-end integration: NON-DETERMINISTIC WORKFLOW, FAIL-WORKFLOW POLICY — a workflow
 * whose behavior alternates between executions is caught by the decision state
 * machine during replay and, under NonDeterministicWorkflowPolicyFailWorkflow,
 * FAILS the workflow with the policy name as the failure reason (mirrors go-client
 * TestNonDeterministicWorkflowFailPolicy and its NonDeterminismSimulatorWorkflow).
 *
 * Sticky execution is disabled so every decision task replays the function from
 * the beginning. A module-scope call counter increments once per full run-through,
 * so the optional ACTIVITY step flips on and off between replays; when the replay
 * that skips the activity meets the history's ActivityTaskScheduled event, the
 * decision kinds mismatch and the nondeterminism path fires.
 * (An alternating TIMER is not enough: timer IDs realign and durations are not
 * compared, so the divergence must change the decision KIND.)
 */
import { describe, it, expect } from 'vitest';
import { New as NewWorker } from '../../src/worker/worker.js';
import { WorkerOptions, internal_NonDeterministicWorkflowPolicy } from '../../src/internal/worker.js';
import { ExecuteActivity } from '../../src/workflow/workflow.js';
import { WithActivityOptions } from '../../src/workflow/activity_options.js';
import { Sleep } from '../../src/workflow/deterministic_wrappers.js';
import { newWorkflowServiceClient } from '../../src/workflow_service_client.js';
import { clientFromService, showWorkflow, startWorkflow } from './harness.js';

export const DOMAIN = process.env.CADENCE_DOMAIN ?? 'default';
export const TASK_LIST = `condorance-smoke-nondet-tasklist-${Date.now()}`;
export const WORKFLOW_ID = `condorance-smoke-nondet-${Date.now()}`;

export const ONE_SECOND_NS = 1_000_000_000;
export const ONE_MINUTE_NS = 60_000_000_000;

const observed = { calls: 0 };

export async function ToUpperActivity(_ctx: unknown, input: string): Promise<string> {
  return input.toUpperCase();
}

// Mirrors upstream NonDeterminismSimulatorWorkflow: the counter increments once
// per full execution (between the two park points), so consecutive full replays
// disagree about whether the leading activity happens.
export async function NonDeterminismSimulatorWF(ctx: any): Promise<string> {
  const actx = WithActivityOptions(ctx as never, {
    TaskList: TASK_LIST,
    ScheduleToCloseTimeout: 0,
    ScheduleToStartTimeout: ONE_MINUTE_NS,
    StartToCloseTimeout: ONE_MINUTE_NS,
    HeartbeatTimeout: 0,
  } as never);

  if (observed.calls % 2 === 0) {
    const future = await ExecuteActivity(actx, 'ToUpperActivity', 'hello');
    const box: { value: unknown } = { value: undefined };
    await future.Get(actx, box);
  }

  observed.calls++;

  await Sleep(ctx, 5 * ONE_SECOND_NS);
  return 'should-never-complete';
}

describe('generated worker engine -> real Cadence server (nondeterminism fail policy)', () => {
  it('replay divergence fails the workflow with the policy-name reason', async () => {
    const service = newWorkflowServiceClient({ address: '127.0.0.1:7833', caller: 'condorance-smoke' });
    const client = clientFromService(service, DOMAIN, 'condorance-smoke-nondet-client');
    const worker = await NewWorker(
      service as any, DOMAIN, TASK_LIST,
      new WorkerOptions({
        Identity: 'condorance-smoke-nondet-worker',
        // Every workflow yield reruns the function from the beginning (upstream
        // disables sticky for exactly this test).
        DisableStickyExecution: true,
        NonDeterministicWorkflowPolicy:
          internal_NonDeterministicWorkflowPolicy.NonDeterministicWorkflowPolicyFailWorkflow,
      }) as any,
    );
    worker.RegisterWorkflow(NonDeterminismSimulatorWF);
    worker.RegisterActivityWithOptions(ToUpperActivity, {
      Name: 'ToUpperActivity',
      EnableShortName: false,
      DisableAlreadyRegisteredCheck: false,
      EnableAutoHeartbeat: false,
    } as never);
    worker.Start();

    try {
      const execution = await startWorkflow(client, {
        workflowID: WORKFLOW_ID,
        taskList: TASK_LIST,
        workflowType: 'NonDeterminismSimulatorWF',
        executionTimeoutSeconds: 60,
        decisionTimeoutSeconds: 10,
      });

      let history = '';
      await waitUntil(async () => {
        history = await showWorkflow(client, WORKFLOW_ID, execution.runId);
        return /(?<!Child)WorkflowExecution(Completed|Failed|TimedOut)\b/.test(history);
      }, 45_000, 'nondeterministic workflow never reached a terminal event');

      // The policy must FAIL the workflow (not time it out, not complete it) and the
      // failure reason must be the policy name — the upstream CustomError contract.
      expect(history).toMatch(/WorkflowExecutionFailed/);
      expect(history).not.toMatch(/(?<!Child)WorkflowExecutionCompleted/);
      expect(history).toContain('NonDeterministicWorkflowPolicyFailWorkflow');
      // The divergence needed at least two full executions of the function.
      expect(observed.calls).toBeGreaterThanOrEqual(2);
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
