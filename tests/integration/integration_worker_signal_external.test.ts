/*
 * End-to-end integration: SIGNAL EXTERNAL WORKFLOW — one workflow signals ANOTHER workflow
 * from inside workflow code via workflow.SignalExternalWorkflow (the coordination
 * primitive behind the cadence-samples mutex recipe; upstream covers this API by
 * unit tests only).
 *
 * What this proves:
 *   - the sender emits a SignalExternalWorkflowExecution DECISION (not a client RPC),
 *     and its future resolves only after the server confirms delivery
 *     (ExternalWorkflowExecutionSignaled in the sender's history);
 *   - the target — a separate execution parked on GetSignalChannel — receives the
 *     payload through the ordinary WorkflowExecutionSignaled event and completes
 *     with it, proving cross-execution payload integrity.
 */
import { describe, it, expect } from 'vitest';
import { New as NewWorker } from '../../src/worker/worker.js';
import { WorkerOptions } from '../../src/internal/worker.js';
import { GetSignalChannel, SignalExternalWorkflow } from '../../src/workflow/workflow.js';
import { Ref } from '../../src/internal/runtime/ref.js';
import { newWorkflowServiceClient } from '../../src/workflow_service_client.js';
import { clientFromService, showWorkflow, startWorkflow } from './harness.js';

export const DOMAIN = process.env.CADENCE_DOMAIN ?? 'default';
export const TASK_LIST = 'condorance-smoke-extsignal-tasklist';
export const SIGNAL_NAME = 'ext-sig';

const observed = { targetResult: '', senderDone: false };

export async function ExtSignalTargetWorkflow(ctx: unknown): Promise<string> {
  const ch = GetSignalChannel(ctx as never, SIGNAL_NAME);
  const box = new Ref<unknown>(undefined);
  await ch.Receive(ctx as never, box);
  observed.targetResult = `got:${box.value}`;
  return observed.targetResult;
}

export async function ExtSignalSenderWorkflow(ctx: unknown, targetID: string): Promise<string> {
  const future = SignalExternalWorkflow(ctx as never, targetID, '', SIGNAL_NAME, 'hello-ext');
  const box = new Ref<unknown>(undefined);
  await future.Get(ctx as never, box);
  observed.senderDone = true;
  return 'sent';
}

describe('generated worker engine -> real Cadence server (SignalExternalWorkflow)', () => {
  it('a workflow signals another workflow through a decision and both complete', async () => {
    const service = newWorkflowServiceClient({ address: '127.0.0.1:7833', caller: 'condorance-smoke' });
    const client = clientFromService(service, DOMAIN, 'condorance-smoke-extsignal-client');
    const worker = await NewWorker(
      service as any, DOMAIN, TASK_LIST,
      new WorkerOptions({ Identity: 'condorance-smoke-worker' }) as any,
    );
    worker.RegisterWorkflow(ExtSignalTargetWorkflow);
    worker.RegisterWorkflow(ExtSignalSenderWorkflow);
    worker.Start();

    const targetID = `condorance-smoke-extsignal-target-${Date.now()}`;
    const senderID = `condorance-smoke-extsignal-sender-${Date.now()}`;
    try {
      await startWorkflow(client, {
        workflowID: targetID,
        taskList: TASK_LIST,
        workflowType: 'ExtSignalTargetWorkflow',
        executionTimeoutSeconds: 60,
        decisionTimeoutSeconds: 10,
      });
      // Let the target park on its signal channel before the sender fires.
      await new Promise((r) => setTimeout(r, 1_500));

      await startWorkflow(client, {
        workflowID: senderID,
        taskList: TASK_LIST,
        workflowType: 'ExtSignalSenderWorkflow',
        executionTimeoutSeconds: 60,
        decisionTimeoutSeconds: 10,
        args: [targetID],
      });

      await waitUntil(() => observed.senderDone, 30_000, 'sender future never resolved');
      await waitUntil(() => observed.targetResult !== '', 30_000, 'target never received the external signal');
      expect(observed.targetResult).toBe('got:hello-ext');

      let senderHistory = '';
      await waitUntil(async () => {
        senderHistory = await showWorkflow(client, senderID);
        return /WorkflowExecutionCompleted|WorkflowExecutionFailed|WorkflowExecutionTimedOut/.test(senderHistory);
      }, 20_000, 'sender never reached a terminal event');
      expect(senderHistory).toMatch(/SignalExternalWorkflowExecutionInitiated/);
      expect(senderHistory).toMatch(/ExternalWorkflowExecutionSignaled/);
      expect(senderHistory).toMatch(/WorkflowExecutionCompleted/);

      let targetHistory = '';
      await waitUntil(async () => {
        targetHistory = await showWorkflow(client, targetID);
        return /WorkflowExecutionCompleted|WorkflowExecutionFailed|WorkflowExecutionTimedOut/.test(targetHistory);
      }, 20_000, 'target never reached a terminal event');
      expect(targetHistory).toMatch(/WorkflowExecutionSignaled/);
      expect(targetHistory).toMatch(/WorkflowExecutionCompleted/);
      expect(targetHistory).toContain('hello-ext');
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
