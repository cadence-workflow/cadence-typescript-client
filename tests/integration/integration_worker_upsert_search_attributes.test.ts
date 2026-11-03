/*
 * End-to-end integration: UPSERT SEARCH ATTRIBUTES — the workflow-level wrapper records an
 * UpsertWorkflowSearchAttributes event on the real server.
 *
 * The decision state machine path is shared with GetVersion's internal change-version
 * upsert (the sideeffect_version smoke); what this adds is the PUBLIC wrapper — the
 * attribute map is validated, encoded per key with the workflow's data converter, and
 * merged into the workflow info. CustomKeywordField is one of Cadence's default
 * registered keys. Without ElasticSearch the attribute is not queryable, so the
 * assertion is the durable history event, not a search.
 */
import { describe, it, expect } from 'vitest';
import { WorkerOptions } from '../../src/internal/worker.js';
import { UpsertSearchAttributes } from '../../src/workflow/workflow.js';
import { New as NewWorker } from '../../src/worker/worker.js';
import { newWorkflowServiceClient } from '../../src/workflow_service_client.js';
import { clientFromService, getAllEvents, showWorkflow, startWorkflow } from './harness.js';

export const DOMAIN = process.env.CADENCE_DOMAIN ?? 'default';
export const TASK_LIST = `condorance-smoke-usa-tasklist-${Date.now()}`;

describe('generated worker engine -> real Cadence server (upsert search attributes)', () => {
  it('records the UpsertWorkflowSearchAttributes event and completes', async () => {
    const observed = { upserted: false, result: '' };

    async function UpsertWF(ctx: any): Promise<string> {
      UpsertSearchAttributes(ctx, { CustomKeywordField: 'condorance-smoke-usa' });
      observed.upserted = true;
      observed.result = 'usa-done';
      return observed.result;
    }

    const service = newWorkflowServiceClient({ address: '127.0.0.1:7833', caller: 'condorance-smoke' });
    const client = clientFromService(service, DOMAIN, 'condorance-smoke-usa-client');
    const worker = await NewWorker(
      service as any,
      DOMAIN,
      TASK_LIST,
      new WorkerOptions({ Identity: 'condorance-smoke-usa-worker', DisableActivityWorker: true }) as any,
    );
    worker.RegisterWorkflow(UpsertWF);
    worker.Start();

    const workflowID = `condorance-smoke-usa-${Date.now()}`;
    try {
      await startWorkflow(client, {
        workflowID,
        taskList: TASK_LIST,
        workflowType: 'UpsertWF',
        executionTimeoutSeconds: 60,
        decisionTimeoutSeconds: 10,
      });

      await waitUntil(() => observed.result !== '', 30_000, 'workflow never completed');
      expect(observed.upserted).toBe(true);

      let history = '';
      await waitUntil(async () => {
        history = await showWorkflow(client, workflowID);
        return /WorkflowExecutionCompleted|WorkflowExecutionFailed|WorkflowExecutionTimedOut/.test(history);
      }, 20_000, 'server never recorded a terminal event');
      expect(history).toMatch(/UpsertWorkflowSearchAttributes/);
      const events = await getAllEvents(client, workflowID);
      const indexedFields = events
        .find((event) => event.upsertWorkflowSearchAttributesEventAttributes !== undefined)
        ?.upsertWorkflowSearchAttributesEventAttributes?.searchAttributes?.indexedFields;
      expect(indexedFields?.has('CustomKeywordField')).toBe(true);
      expect(history).toMatch(/WorkflowExecutionCompleted/);
      expect(history).toContain('usa-done');
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
