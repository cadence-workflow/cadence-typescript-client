/*
 * End-to-end integration: CRON + LAST COMPLETION RESULT — the server re-runs the workflow on
 * a cron schedule, and each successor run reads its predecessor's return value.
 *
 * Started with --cron '* * * * *' (minimum granularity), so the first run fires at the
 * next minute boundary and the second one minute later — this test is wall-clock slow
 * by nature. Run N returns `cron-result-N`; run N+1 must see it through
 * HasLastCompletionResult / GetLastCompletionResult (the EncodedValue box protocol over
 * lastCompletionResult delivered in the decision task). After two observed runs the
 * workflow chain is terminated.
 */
import { describe, it, expect } from 'vitest';
import { New as NewWorker } from '../../src/worker/worker.js';
import { WorkerOptions } from '../../src/internal/worker.js';
import { HasLastCompletionResult, GetLastCompletionResult } from '../../src/workflow/workflow.js';
import { newWorkflowServiceClient } from '../../src/workflow_service_client.js';
import { clientFromService, startWorkflow, terminateWorkflow } from './harness.js';

export const DOMAIN = process.env.CADENCE_DOMAIN ?? 'default';
export const TASK_LIST = `condorance-smoke-cron-tasklist-${Date.now()}`;

describe('generated worker engine -> real Cadence server (cron + last completion result)', () => {
  it('runs on the cron schedule and hands each run its predecessor result', async () => {
    const observed = { runs: 0, prevSeen: [] as string[] };

    async function CronWF(ctx: any): Promise<string> {
      observed.runs++;
      let prev = '<none>';
      if (HasLastCompletionResult(ctx)) {
        const box: { value: unknown } = { value: undefined };
        GetLastCompletionResult(ctx, box);
        prev = String(box.value);
      }
      observed.prevSeen.push(prev);
      return `cron-result-${observed.runs}`;
    }

    const service = newWorkflowServiceClient({ address: '127.0.0.1:7833', caller: 'condorance-smoke' });
    const client = clientFromService(service, DOMAIN, 'condorance-smoke-cron');
    const worker = await NewWorker(
      service as any,
      DOMAIN,
      TASK_LIST,
      new WorkerOptions({ Identity: 'condorance-smoke-cron-worker', DisableActivityWorker: true }) as any,
    );
    worker.RegisterWorkflow(CronWF);
    worker.Start();

    const workflowID = `condorance-smoke-cron-${Date.now()}`;
    try {
      await startWorkflow(client, {
        workflowID,
        taskList: TASK_LIST,
        workflowType: 'CronWF',
        executionTimeoutSeconds: 30,
        decisionTimeoutSeconds: 10,
        cronSchedule: '* * * * *',
      });

      // Two cron fires: worst case just over two minutes.
      await waitUntil(() => observed.runs >= 2, 150_000, 'second cron run never fired');

      expect(observed.prevSeen[0]).toBe('<none>');
      expect(observed.prevSeen[1]).toBe('cron-result-1');
    } finally {
      // A cron workflow keeps rescheduling forever; a swallowed terminate failure
      // leaves a zombie firing (and timing out) every minute with no worker.
      await terminateWorkflow(client, workflowID, 'smoke-done').catch((err) =>
        console.error(`cron terminate FAILED — zombie cron ${workflowID} will keep firing every minute: ${err}`),
      );
      worker.Stop();
      service.close();
    }
  }, 200_000);
});

async function waitUntil(cond: () => boolean | Promise<boolean>, timeoutMs: number, what: string): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (await cond()) return;
    await new Promise((r) => setTimeout(r, 100));
  }
  throw new Error(`timed out after ${timeoutMs}ms: ${what}`);
}
