/*
 * End-to-end integration: CANCEL — external cancellation round trip through a real Cadence server.
 *
 * The workflow parks on Sleep (a long durable timer). The test drives `cadence workflow
 * cancel`; the server appends WorkflowExecutionCancelRequested and dispatches a decision
 * task. The engine's ProcessEvent must invoke the registered cancelHandler, which cancels
 * the root context; the timer's ctx.Done() callback must emit a CancelTimer decision AND
 * resolve the parked Sleep with ErrCanceled (a real CanceledError). The workflow observes
 * the error, asserts its class identity, and rethrows — completeWorkflow must then emit a
 * CancelWorkflowExecution close decision so the server records WorkflowExecutionCanceled.
 *
 * What this proves beyond the timer integration:
 *   - WorkflowExecutionCancelRequested handling -> cancelHandler -> cancelCtx.cancel
 *     propagation (context.ts propagateCancel / children).
 *   - Blocked Sleep wakes with error identity: instanceof internal_CanceledError.
 *   - CancelWorkflowExecution close decision accepted by the server (terminal event
 *     WorkflowExecutionCanceled, not Completed/Failed).
 */
import { describe, it, expect } from 'vitest';
import { New as NewWorker } from '../../src/worker/worker.js';
import { WorkerOptions } from '../../src/internal/worker.js';
import { Sleep } from '../../src/workflow/deterministic_wrappers.js';
import { internal_CanceledError, IsCanceledError } from '../../src/internal/error.js';
import { newWorkflowServiceClient } from '../../src/workflow_service_client.js';
import {
  cancelWorkflow,
  clientFromService,
  showWorkflow,
  startWorkflow,
} from './harness.js';

export const DOMAIN = process.env.CADENCE_DOMAIN ?? 'default';
export const TASK_LIST = `condorance-smoke-cancel-tasklist-${Date.now()}`;

// 1 minute in Go time.Duration nanoseconds — long enough that the timer can only end
// via cancellation, never by firing.
export const ONE_MINUTE_NS = 60_000_000_000;

describe('generated worker engine -> real Cadence server (cancel)', () => {
  it('wakes a parked Sleep with CanceledError and closes as Canceled', async () => {
    const observed: { started: boolean; caughtClass: string; isCanceled: boolean; sleptThrough: boolean } =
      { started: false, caughtClass: '', isCanceled: false, sleptThrough: false };

    async function SmokeCancelWF(ctx: any): Promise<void> {
      observed.started = true;
      try {
        await Sleep(ctx, ONE_MINUTE_NS);
        observed.sleptThrough = true;
      } catch (err) {
        observed.caughtClass = err instanceof internal_CanceledError ? 'internal_CanceledError'
          : err instanceof Error ? err.constructor.name : typeof err;
        observed.isCanceled = err instanceof Error && IsCanceledError(err);
        // Rethrow so the engine closes the workflow AS CANCELED (Go: return err).
        throw err;
      }
    }

    const service = newWorkflowServiceClient({ address: '127.0.0.1:7833', caller: 'condorance-smoke' });
    const client = clientFromService(service, DOMAIN, 'condorance-smoke-cancel');
    const worker = await NewWorker(
      service as any,
      DOMAIN,
      TASK_LIST,
      new WorkerOptions({ Identity: 'condorance-smoke-cancel-worker', DisableActivityWorker: true }) as any,
    );
    worker.RegisterWorkflow(SmokeCancelWF);
    worker.Start();

    const workflowID = `condorance-smoke-cancel-${Date.now()}`;
    try {
      await startWorkflow(client, {
        workflowID,
        taskList: TASK_LIST,
        workflowType: 'SmokeCancelWF',
        executionTimeoutSeconds: 120,
        decisionTimeoutSeconds: 10,
      });
      await waitUntil(() => observed.started, 20_000, 'workflow body never started');

      await cancelWorkflow(client, workflowID);

      await waitUntil(() => observed.caughtClass !== '', 20_000, 'Sleep never observed the cancellation');
      expect(observed.caughtClass).toBe('internal_CanceledError');
      expect(observed.isCanceled).toBe(true);
      expect(observed.sleptThrough).toBe(false);

      let history = '';
      await waitUntil(async () => {
        history = await showWorkflow(client, workflowID);
        return /WorkflowExecutionCanceled|WorkflowExecutionCompleted|WorkflowExecutionFailed|WorkflowExecutionTimedOut/.test(history);
      }, 20_000, 'server never recorded a terminal event');
      expect(history).toMatch(/WorkflowExecutionCancelRequested/);
      expect(history).toMatch(/WorkflowExecutionCanceled/);
      // Canceled, not a generic failure or a completion.
      expect(history).not.toMatch(/WorkflowExecutionFailed|WorkflowExecutionCompleted/);
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
