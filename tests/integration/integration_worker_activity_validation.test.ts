import { describe, expect, it } from 'vitest';
import { EventType } from '../../src/generated/thrift/cadence-idl/com/uber/cadence/EventType.js';
import { WorkerOptions } from '../../src/internal/worker.js';
import { New as NewWorker } from '../../src/worker/worker.js';
import { WithActivityOptions } from '../../src/workflow/activity_options.js';
import { ExecuteActivity } from '../../src/workflow/workflow.js';
import { newWorkflowServiceClient } from '../../src/workflow_service_client.js';
import {
  clientFromService,
  getAllEvents,
  hasTerminalEvent,
  startWorkflow,
} from './harness.js';

const DOMAIN = process.env.CADENCE_DOMAIN ?? 'default';
const ONE_MINUTE_NS = 60_000_000_000;
const EXPECTED_ERROR = 'missing or negative ScheduleToStartTimeoutSeconds';

let observedError = '';

export async function InvalidActivityOptionsWorkflow(
  ctx: unknown,
): Promise<string> {
  const activityCtx = WithActivityOptions(ctx as never, {
    TaskList: 'unused-activity-task-list',
    ScheduleToCloseTimeout: ONE_MINUTE_NS,
    ScheduleToStartTimeout: 0,
    StartToCloseTimeout: 0,
    HeartbeatTimeout: 0,
    WaitForCancellation: false,
    ActivityID: '',
  });
  const future = await ExecuteActivity(activityCtx, 'NeverScheduledActivity');

  try {
    await future.Get(activityCtx, null);
  } catch (error) {
    observedError = error instanceof Error ? error.message : String(error);
    return observedError;
  }
  throw new Error('invalid activity options unexpectedly scheduled an activity');
}

describe('generated worker engine -> real Cadence server (activity validation)', () => {
  it('delivers an immediate validation error without deadlocking the workflow', async () => {
    observedError = '';
    const taskList = `condorance-activity-validation-${Date.now()}`;
    const workflowID = `condorance-activity-validation-${Date.now()}`;
    const service = newWorkflowServiceClient({
      address: '127.0.0.1:7833',
      caller: 'condorance-activity-validation',
    });
    const worker = await NewWorker(
      service as never,
      DOMAIN,
      taskList,
      new WorkerOptions({
        Identity: 'condorance-activity-validation-worker',
        DisableActivityWorker: true,
      }),
    );
    worker.RegisterWorkflow(InvalidActivityOptionsWorkflow);
    worker.Start();

    const client = clientFromService(
      service,
      DOMAIN,
      'condorance-activity-validation-client',
    );
    try {
      const execution = await startWorkflow(client, {
        workflowID,
        taskList,
        workflowType: 'InvalidActivityOptionsWorkflow',
        executionTimeoutSeconds: 30,
        decisionTimeoutSeconds: 10,
      });

      let events = await getAllEvents(client, workflowID, execution.runId);
      await waitUntil(async () => {
        events = await getAllEvents(client, workflowID, execution.runId);
        return hasTerminalEvent(events);
      }, 15_000, 'workflow did not surface the validation error');

      expect(observedError).toBe(EXPECTED_ERROR);
      expect(events.at(-1)?.eventType).toBe(
        EventType.WorkflowExecutionCompleted,
      );
      expect(
        events.some(
          (event) => event.eventType === EventType.ActivityTaskScheduled,
        ),
      ).toBe(false);
    } finally {
      worker.Stop();
      service.close();
    }
  }, 30_000);
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
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error(`timed out after ${timeoutMs}ms: ${description}`);
}
