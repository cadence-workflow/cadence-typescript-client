import { RespondDecisionTaskCompletedRequest as shared_RespondDecisionTaskCompletedRequest } from '../generated/thrift/cadence-idl/com/uber/cadence/RespondDecisionTaskCompletedRequest.js';
import { WorkflowExecutionStartedEventAttributes as shared_WorkflowExecutionStartedEventAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/WorkflowExecutionStartedEventAttributes.js';
import { TaskList as shared_TaskList } from '../generated/thrift/cadence-idl/com/uber/cadence/TaskList.js';
import { HistoryEvent as shared_HistoryEvent } from '../generated/thrift/cadence-idl/com/uber/cadence/HistoryEvent.js';
import { History as shared_History } from '../generated/thrift/cadence-idl/com/uber/cadence/History.js';
import { DecisionTaskScheduledEventAttributes as shared_DecisionTaskScheduledEventAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/DecisionTaskScheduledEventAttributes.js';
import { Int64 } from '@creditkarma/thrift-server-core';
import { RespondActivityTaskFailedRequest as shared_RespondActivityTaskFailedRequest } from '../generated/thrift/cadence-idl/com/uber/cadence/RespondActivityTaskFailedRequest.js';
import { RespondActivityTaskCompletedRequest as shared_RespondActivityTaskCompletedRequest } from '../generated/thrift/cadence-idl/com/uber/cadence/RespondActivityTaskCompletedRequest.js';
import { EventTypePtr } from './common/convert.js';
import { createTestEventDecisionTaskScheduled, createTestEventDecisionTaskStarted, createTestEventWorkflowExecutionStarted, createWorkflowTask } from './internal_task_handlers_test.js';
import { historyIteratorImpl } from './internal_task_pollers.js';
import { EventType } from '../generated/thrift/cadence-idl/com/uber/cadence/EventType.js';
// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { ActivityTaskHandler, WorkflowTaskHandler, decisionHeartbeatFunc } from './internal_public.js';
import { workflowTask, newHistory } from './internal_task_handlers.js';
import type { WorkflowServiceClientLike } from './runtime/workflow_service_client_like.js';
import { background } from './runtime/context.js';
import { GoTestifySuite } from './runtime/testify_suite.js';
import { GoMockController, NewGoMockClient, NewGoMockController } from './runtime/gomock.js';
import { IPollForActivityTaskResponse as shared_IPollForActivityTaskResponse } from '../generated/thrift/cadence-idl/com/uber/cadence/PollForActivityTaskResponse.js';
import { greeterActivity } from './internal_worker_interfaces_test.js';
import { args } from './internal_worker_test.js';

export class PollLayerInterfacesTestSuite {
  constructor(init?: Partial<PollLayerInterfacesTestSuite>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  Suite: GoTestifySuite = new GoTestifySuite();

  mockCtrl?: GoMockController;

  service?: WorkflowServiceClientLike;

  T = (...args: Parameters<GoTestifySuite['T']>): ReturnType<GoTestifySuite['T']> => this.Suite.T(...args);

  SetT = (...args: Parameters<GoTestifySuite['SetT']>): ReturnType<GoTestifySuite['SetT']> => this.Suite.SetT(...args);

  Assert = (...args: Parameters<GoTestifySuite['Assert']>): ReturnType<GoTestifySuite['Assert']> => this.Suite.Assert(...args);

  Require = (...args: Parameters<GoTestifySuite['Require']>): ReturnType<GoTestifySuite['Require']> => this.Suite.Require(...args);

  Run = (...args: Parameters<GoTestifySuite['Run']>): ReturnType<GoTestifySuite['Run']> => this.Suite.Run(...args);

  Equal = (...args: Parameters<GoTestifySuite['Equal']>): ReturnType<GoTestifySuite['Equal']> => this.Suite.Equal(...args);

  NotEqual = (...args: Parameters<GoTestifySuite['NotEqual']>): ReturnType<GoTestifySuite['NotEqual']> => this.Suite.NotEqual(...args);

  EqualValues = (...args: Parameters<GoTestifySuite['EqualValues']>): ReturnType<GoTestifySuite['EqualValues']> => this.Suite.EqualValues(...args);

  Exactly = (...args: Parameters<GoTestifySuite['Exactly']>): ReturnType<GoTestifySuite['Exactly']> => this.Suite.Exactly(...args);

  Same = (...args: Parameters<GoTestifySuite['Same']>): ReturnType<GoTestifySuite['Same']> => this.Suite.Same(...args);

  NotSame = (...args: Parameters<GoTestifySuite['NotSame']>): ReturnType<GoTestifySuite['NotSame']> => this.Suite.NotSame(...args);

  True = (...args: Parameters<GoTestifySuite['True']>): ReturnType<GoTestifySuite['True']> => this.Suite.True(...args);

  False = (...args: Parameters<GoTestifySuite['False']>): ReturnType<GoTestifySuite['False']> => this.Suite.False(...args);

  Nil = (...args: Parameters<GoTestifySuite['Nil']>): ReturnType<GoTestifySuite['Nil']> => this.Suite.Nil(...args);

  NotNil = (...args: Parameters<GoTestifySuite['NotNil']>): ReturnType<GoTestifySuite['NotNil']> => this.Suite.NotNil(...args);

  Zero = (...args: Parameters<GoTestifySuite['Zero']>): ReturnType<GoTestifySuite['Zero']> => this.Suite.Zero(...args);

  NotZero = (...args: Parameters<GoTestifySuite['NotZero']>): ReturnType<GoTestifySuite['NotZero']> => this.Suite.NotZero(...args);

  Error = (...args: Parameters<GoTestifySuite['Error']>): ReturnType<GoTestifySuite['Error']> => this.Suite.Error(...args);

  NoError = (...args: Parameters<GoTestifySuite['NoError']>): ReturnType<GoTestifySuite['NoError']> => this.Suite.NoError(...args);

  EqualError = (...args: Parameters<GoTestifySuite['EqualError']>): ReturnType<GoTestifySuite['EqualError']> => this.Suite.EqualError(...args);

  ErrorContains = (...args: Parameters<GoTestifySuite['ErrorContains']>): ReturnType<GoTestifySuite['ErrorContains']> => this.Suite.ErrorContains(...args);

  ErrorIs = (...args: Parameters<GoTestifySuite['ErrorIs']>): ReturnType<GoTestifySuite['ErrorIs']> => this.Suite.ErrorIs(...args);

  NotErrorIs = (...args: Parameters<GoTestifySuite['NotErrorIs']>): ReturnType<GoTestifySuite['NotErrorIs']> => this.Suite.NotErrorIs(...args);

  Len = (...args: Parameters<GoTestifySuite['Len']>): ReturnType<GoTestifySuite['Len']> => this.Suite.Len(...args);

  Empty = (...args: Parameters<GoTestifySuite['Empty']>): ReturnType<GoTestifySuite['Empty']> => this.Suite.Empty(...args);

  NotEmpty = (...args: Parameters<GoTestifySuite['NotEmpty']>): ReturnType<GoTestifySuite['NotEmpty']> => this.Suite.NotEmpty(...args);

  Contains = (...args: Parameters<GoTestifySuite['Contains']>): ReturnType<GoTestifySuite['Contains']> => this.Suite.Contains(...args);

  NotContains = (...args: Parameters<GoTestifySuite['NotContains']>): ReturnType<GoTestifySuite['NotContains']> => this.Suite.NotContains(...args);

  ElementsMatch = (...args: Parameters<GoTestifySuite['ElementsMatch']>): ReturnType<GoTestifySuite['ElementsMatch']> => this.Suite.ElementsMatch(...args);

  Subset = (...args: Parameters<GoTestifySuite['Subset']>): ReturnType<GoTestifySuite['Subset']> => this.Suite.Subset(...args);

  Greater = (...args: Parameters<GoTestifySuite['Greater']>): ReturnType<GoTestifySuite['Greater']> => this.Suite.Greater(...args);

  GreaterOrEqual = (...args: Parameters<GoTestifySuite['GreaterOrEqual']>): ReturnType<GoTestifySuite['GreaterOrEqual']> => this.Suite.GreaterOrEqual(...args);

  Less = (...args: Parameters<GoTestifySuite['Less']>): ReturnType<GoTestifySuite['Less']> => this.Suite.Less(...args);

  LessOrEqual = (...args: Parameters<GoTestifySuite['LessOrEqual']>): ReturnType<GoTestifySuite['LessOrEqual']> => this.Suite.LessOrEqual(...args);

  InDelta = (...args: Parameters<GoTestifySuite['InDelta']>): ReturnType<GoTestifySuite['InDelta']> => this.Suite.InDelta(...args);

  Panics = (...args: Parameters<GoTestifySuite['Panics']>): ReturnType<GoTestifySuite['Panics']> => this.Suite.Panics(...args);

  NotPanics = (...args: Parameters<GoTestifySuite['NotPanics']>): ReturnType<GoTestifySuite['NotPanics']> => this.Suite.NotPanics(...args);

  IsType = (...args: Parameters<GoTestifySuite['IsType']>): ReturnType<GoTestifySuite['IsType']> => this.Suite.IsType(...args);

  Regexp = (...args: Parameters<GoTestifySuite['Regexp']>): ReturnType<GoTestifySuite['Regexp']> => this.Suite.Regexp(...args);

  JSONEq = (...args: Parameters<GoTestifySuite['JSONEq']>): ReturnType<GoTestifySuite['JSONEq']> => this.Suite.JSONEq(...args);

  WithinDuration = (...args: Parameters<GoTestifySuite['WithinDuration']>): ReturnType<GoTestifySuite['WithinDuration']> => this.Suite.WithinDuration(...args);

  Fail = (...args: Parameters<GoTestifySuite['Fail']>): ReturnType<GoTestifySuite['Fail']> => this.Suite.Fail(...args);

  FailNow = (...args: Parameters<GoTestifySuite['FailNow']>): ReturnType<GoTestifySuite['FailNow']> => this.Suite.FailNow(...args);

  SetupTest(): void {
    this.mockCtrl = NewGoMockController(this.T());
    this.service = NewGoMockClient(this.mockCtrl);
  }

  TearDownTest(): void {
    this.mockCtrl!.Finish();
  }

  async TestGetNextDecisions(): Promise<void> {
    const taskList = "tl1";
    const testEvents = [
      createTestEventWorkflowExecutionStarted(
        1,
        new shared_WorkflowExecutionStartedEventAttributes({
          taskList: new shared_TaskList({ name: taskList }),
        }),
      ),
      createTestEventDecisionTaskScheduled(
        2,
        new shared_DecisionTaskScheduledEventAttributes({
          taskList: new shared_TaskList({ name: taskList }),
        }),
      ),
      createTestEventDecisionTaskStarted(3),
      new shared_HistoryEvent({
        eventId: new Int64(4),
        eventType: EventTypePtr(EventType.DecisionTaskFailed),
      }),
      new shared_HistoryEvent({
        eventId: new Int64(5),
        eventType: EventTypePtr(EventType.WorkflowExecutionSignaled),
      }),
      createTestEventDecisionTaskScheduled(
        6,
        new shared_DecisionTaskScheduledEventAttributes({
          taskList: new shared_TaskList({ name: taskList }),
        }),
      ),
      createTestEventDecisionTaskStarted(7),
    ];

    const task = await createWorkflowTask(
      testEvents.slice(0, 3),
      0,
      "HelloWorld_Workflow",
    );

    const historyIterator = new historyIteratorImpl({
      iteratorFunc: (_nextToken) => [
        new shared_History({ events: testEvents.slice(3) }),
        Buffer.alloc(0),
      ],
      nextPageToken: Buffer.from("test"),
      domain: "",
      featureFlags: {
        WorkflowExecutionAlreadyCompletedErrorEnabled: false,
        AutoforwardingEnabled: false,
        PollerAutoScalerEnabled: false,
        EphemeralTaskListsEnabled: false,
        MetricEmitMode: 0,
      },
      maxEventID: 0,
      startedEventID: 0,
    });

    const workflowTaskLocal = new workflowTask({
      task,
      historyIterator,
    });

    const eh = newHistory(workflowTaskLocal, undefined);
    const [events] = await eh.NextDecisionEvents();

    this.NoError(null);
    this.Equal(3, events.length);
    this.Equal(EventType.WorkflowExecutionSignaled, events[1].eventType);
    this.Equal(EventType.DecisionTaskStarted, events[2].eventType);
    this.Equal(7, events[2].eventId!.toNumber());
  }

}

/**
 * Sample Workflow task handler
 */
export class sampleWorkflowTaskHandler implements WorkflowTaskHandler {
  constructor(init?: Partial<sampleWorkflowTaskHandler>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  async ProcessWorkflowTask(workflowTask: workflowTask, d: decisionHeartbeatFunc | undefined): Promise<unknown> {
    return new shared_RespondDecisionTaskCompletedRequest({
      taskToken: Buffer.from(workflowTask.task!.taskToken!),
    });
  }

}

/**
 * Sample ActivityTaskHandler
 */
export class sampleActivityTaskHandler implements ActivityTaskHandler {
  constructor(init?: Partial<sampleActivityTaskHandler>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  async Execute(taskList: string, task: shared_IPollForActivityTaskResponse): Promise<unknown> {
    const activityImplementation = new greeterActivity({});
    try {
      const result = await activityImplementation.Execute(background(), task.input!);
      return new shared_RespondActivityTaskCompletedRequest({
        taskToken: task.taskToken!,
        result,
      });
    } catch (err) {
      if (!(err instanceof Error)) throw err;
      const reason = err.message;
      return new shared_RespondActivityTaskFailedRequest({
        taskToken: task.taskToken!,
        reason,
      });
    }
  }

}

export function newSampleWorkflowTaskHandler(): sampleWorkflowTaskHandler {
  return new sampleWorkflowTaskHandler({});
}

export function newSampleActivityTaskHandler(): sampleActivityTaskHandler {
  return new sampleActivityTaskHandler({});
}

/**
 * Test suite.
 */
export function TestPollLayerInterfacesTestSuite(): void {}
