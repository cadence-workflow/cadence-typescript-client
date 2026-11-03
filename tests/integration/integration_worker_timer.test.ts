/*
 * End-to-end integration: TIMER shape — the generated engine must round-trip a durable timer
 * through the REAL Cadence server.
 *
 * Unlike a signal (external wake-up), a timer is the engine's OWN decision: Sleep must
 * emit a StartTimer decision, the server persists it and later appends TimerFired, and a
 * SEPARATE decision task must resume the suspended coroutine exactly where it slept. This
 * exercises the timer decision state machine and the TimerFired event handler — none of
 * which the signal test touches. A fake in-process timer (setTimeout without the server
 * round trip) would pass a broken engine, so the assertions demand the server-side
 * TimerStarted/TimerFired events AND the completion.
 */
import { describe, it, expect } from 'vitest';
import { WorkerOptions } from '../../src/internal/worker.js';
import { Sleep } from '../../src/workflow/deterministic_wrappers.js';
import { New as NewWorker } from '../../src/worker/worker.js';
import { newWorkflowServiceClient } from '../../src/workflow_service_client.js';
import { clientFromService, showWorkflow, startWorkflow } from './harness.js';

export const DOMAIN = process.env.CADENCE_DOMAIN ?? 'default';
export const TASK_LIST = 'condorance-smoke-timer-tasklist';

// Replay caveat as in the other integration tests: reads take the FINAL replay's view.
const observed: { started: number; awake: boolean } = { started: 0, awake: false };

// 1 second in Go time.Duration nanoseconds — the unit Sleep's contract keeps.
export const ONE_SECOND_NS = 1_000_000_000;

export async function TimerWorkflow(ctx: unknown): Promise<void> {
  observed.started++;
  await Sleep(ctx as never, ONE_SECOND_NS);
  observed.awake = true;
}

describe('generated worker engine -> real Cadence server (timer)', () => {
  it('suspends on Sleep and resumes when the server fires the timer', async () => {
    const service = newWorkflowServiceClient({ address: '127.0.0.1:7833', caller: 'condorance-smoke' });
    const client = clientFromService(service, DOMAIN, 'condorance-smoke-timer-client');
    const worker = await NewWorker(
      service as any,
      DOMAIN,
      TASK_LIST,
      new WorkerOptions({ Identity: 'condorance-smoke-worker', DisableActivityWorker: true }) as any,
    );
    worker.RegisterWorkflow(TimerWorkflow);
    worker.Start();

    const workflowID = `condorance-smoke-timer-${Date.now()}`;
    try {
      const t0 = Date.now();
      await startWorkflow(client, {
        workflowID,
        taskList: TASK_LIST,
        workflowType: 'TimerWorkflow',
        executionTimeoutSeconds: 60,
        decisionTimeoutSeconds: 10,
      });

      await waitUntil(() => observed.started > 0, 20_000, 'workflow body never started');
      await waitUntil(() => observed.awake, 30_000, 'workflow never woke from Sleep');
      // A timer that "fires" instantly means the engine completed the future locally
      // instead of round-tripping the server (the timer resolution is whole seconds).
      expect(Date.now() - t0).toBeGreaterThanOrEqual(900);

      let history = '';
      await waitUntil(async () => {
        history = await showWorkflow(client, workflowID);
        return /WorkflowExecutionCompleted|WorkflowExecutionFailed|WorkflowExecutionTimedOut/.test(history);
      }, 20_000, 'server never recorded a terminal event');
      expect(history).toMatch(/TimerStarted/);
      expect(history).toMatch(/TimerFired/);
      expect(history).toMatch(/WorkflowExecutionCompleted/);
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
