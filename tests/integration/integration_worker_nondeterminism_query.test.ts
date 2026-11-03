/*
 * End-to-end integration: QUERY A NONDETERMINISTICALLY-FAILED WORKFLOW — after the
 * FailWorkflow policy fails a workflow over replay divergence, a __stack_trace
 * query against that CLOSED run must still succeed (mirrors go-client
 * TestNonDeterministicWorkflowQuery).
 *
 * Same divergence fixture as integration_worker_nondeterminism_failpolicy (module-scope
 * counter flips an optional ACTIVITY step between full replays, sticky disabled).
 * The new half under test: the query path must build a workflow context for a run
 * whose replay is nondeterministic and whose execution is already closed, and the
 * stack-trace query handler must answer rather than surface the replay error.
 */
import { describe, it, expect } from 'vitest';
import { New as NewWorker } from '../../src/worker/worker.js';
import { WorkerOptions, internal_NonDeterministicWorkflowPolicy } from '../../src/internal/worker.js';
import { ExecuteActivity } from '../../src/workflow/workflow.js';
import { WithActivityOptions } from '../../src/workflow/activity_options.js';
import { Sleep } from '../../src/workflow/deterministic_wrappers.js';
import { newWorkflowServiceClient } from '../../src/workflow_service_client.js';
import { clientFromService, queryWorkflow, showWorkflow, startWorkflow } from './harness.js';

export const DOMAIN = process.env.CADENCE_DOMAIN ?? 'default';
export const TASK_LIST = `condorance-smoke-nondetq-tasklist-${Date.now()}`;
export const WORKFLOW_ID = `condorance-smoke-nondetq-${Date.now()}`;

export const ONE_SECOND_NS = 1_000_000_000;
export const ONE_MINUTE_NS = 60_000_000_000;

const observed = { calls: 0 };

export async function ToUpperActivity(_ctx: unknown, input: string): Promise<string> {
  return input.toUpperCase();
}

// Same shape as the fail-policy integration: the counter increments once per full
// execution, so consecutive full replays disagree about the leading activity.
export async function NonDeterminismQueryWF(ctx: any): Promise<string> {
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

describe('generated worker engine -> real Cadence server (query a nondeterministically-failed run)', () => {
  it('__stack_trace still answers after the FailWorkflow policy closed the run', async () => {
    const service = newWorkflowServiceClient({ address: '127.0.0.1:7833', caller: 'condorance-smoke' });
    const client = clientFromService(service, DOMAIN, 'condorance-smoke-nondetq');
    const worker = await NewWorker(
      service as any, DOMAIN, TASK_LIST,
      new WorkerOptions({
        Identity: 'condorance-smoke-nondetq-worker',
        DisableStickyExecution: true,
        NonDeterministicWorkflowPolicy:
          internal_NonDeterministicWorkflowPolicy.NonDeterministicWorkflowPolicyFailWorkflow,
      }) as any,
    );
    worker.RegisterWorkflow(NonDeterminismQueryWF);
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
        workflowType: 'NonDeterminismQueryWF',
        executionTimeoutSeconds: 60,
        decisionTimeoutSeconds: 10,
      });

      let history = '';
      await waitUntil(async () => {
        history = await showWorkflow(client, WORKFLOW_ID, execution.runId);
        return /(?<!Child)WorkflowExecution(Completed|Failed|TimedOut)\b/.test(history);
      }, 45_000, 'nondeterministic workflow never reached a terminal event');

      expect(history).toMatch(/WorkflowExecutionFailed/);
      expect(history).toContain('NonDeterministicWorkflowPolicyFailWorkflow');

      // The upstream contract: querying the FAILED run still works — the query
      // succeeds and decodes into a string. Upstream does NOT require the trace to
      // be non-empty (the run is closed, so no coroutine is parked anymore).
      const value = await queryWorkflow<string>(
        client,
        WORKFLOW_ID,
        '__stack_trace',
        execution.runId,
      );
      expect(value).toBeDefined();
      expect(typeof value).toBe('string');
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
