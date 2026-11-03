import { describe, expect, it } from 'vitest';
import { EventType } from '../../src/generated/thrift/cadence-idl/com/uber/cadence/EventType.js';
import { WorkerOptions } from '../../src/internal/worker.js';
import type { WorkflowServiceClientLike } from '../../src/internal/runtime/workflow_service_client_like.js';
import { New as NewWorker } from '../../src/worker/worker.js';
import { newWorkflowServiceClient } from '../../src/workflow_service_client.js';
import {
  SANITY_WORKFLOW_TIMEOUT,
  WORKFLOW_TYPE_SANITY,
  registerCanary,
} from '../canary/index.js';
import { SECOND } from '../canary/constants.js';
import {
  CADENCE_ADDRESS,
  DOMAIN,
  clientFromService,
  formatHistory,
  getAllEvents,
  hasTerminalEvent,
  startWorkflow,
} from './harness.js';

describe('Python SDK canary port', () => {
  it('completes the sanity workflow and all default child workflows', async () => {
    const taskList = `typescript-canary-${Date.now()}`;
    const service = newWorkflowServiceClient({
      address: CADENCE_ADDRESS,
      caller: 'typescript-canary',
    });
    const client = clientFromService(
      service,
      DOMAIN,
      'typescript-canary-client',
    );
    const worker = await NewWorker(
      service as unknown as WorkflowServiceClientLike,
      DOMAIN,
      taskList,
      new WorkerOptions({ Identity: 'typescript-canary-worker' }),
    );

    await registerCanary(worker, client);
    void worker.Start();

    const workflowID = `typescript-canary-sanity-${Date.now()}`;
    try {
      const execution = await startWorkflow(client, {
        workflowID,
        taskList,
        workflowType: WORKFLOW_TYPE_SANITY,
        executionTimeoutSeconds: SANITY_WORKFLOW_TIMEOUT / SECOND,
        decisionTimeoutSeconds: 10,
      });

      let events = await getAllEvents(client, workflowID, execution.runId);
      await waitUntil(async () => {
        events = await getAllEvents(client, workflowID, execution.runId);
        return hasTerminalEvent(events);
      }, 330_000, 'sanity workflow never reached a terminal event');

      const history = formatHistory(events);
      expect(events.at(-1)?.eventType, history).toBe(
        EventType.WorkflowExecutionCompleted,
      );
      expect(
        events.filter(
          (event) => event.eventType
            === EventType.StartChildWorkflowExecutionInitiated,
        ),
      ).toHaveLength(7);
      expect(
        events.filter(
          (event) => event.eventType
            === EventType.ChildWorkflowExecutionCompleted,
        ),
      ).toHaveLength(7);
    } finally {
      await worker.Stop();
      service.close();
    }
  }, 390_000);
});

async function waitUntil(
  condition: () => boolean | Promise<boolean>,
  timeoutMs: number,
  description: string,
): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (await condition()) {
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  throw new Error(`timed out after ${timeoutMs}ms: ${description}`);
}
