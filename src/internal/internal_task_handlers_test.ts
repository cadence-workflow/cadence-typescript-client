// Parameter types are erased at runtime; restore the []byte-input fact these functions'
// declarations carry, for the reflect raw-payload passthrough guard (goFnLastParamIsByteSlice).
import { TimerStartedEventAttributes as shared_TimerStartedEventAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/TimerStartedEventAttributes.js';
import { WorkflowExecutionSignaledEventAttributes as shared_WorkflowExecutionSignaledEventAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/WorkflowExecutionSignaledEventAttributes.js';
import { TimerFiredEventAttributes as shared_TimerFiredEventAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/TimerFiredEventAttributes.js';
import { History as shared_History } from '../generated/thrift/cadence-idl/com/uber/cadence/History.js';
import { UpsertWorkflowSearchAttributesEventAttributes as shared_UpsertWorkflowSearchAttributesEventAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/UpsertWorkflowSearchAttributesEventAttributes.js';
import { UpsertWorkflowSearchAttributesDecisionAttributes as shared_UpsertWorkflowSearchAttributesDecisionAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/UpsertWorkflowSearchAttributesDecisionAttributes.js';
import { SearchAttributes as shared_SearchAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/SearchAttributes.js';
import { Decision as shared_Decision } from '../generated/thrift/cadence-idl/com/uber/cadence/Decision.js';
import { ActivityType as shared_ActivityType } from '../generated/thrift/cadence-idl/com/uber/cadence/ActivityType.js';
import { Int64 } from '@creditkarma/thrift-server-core';
import { WorkflowExecution as shared_WorkflowExecution } from '../generated/thrift/cadence-idl/com/uber/cadence/WorkflowExecution.js';
import { TaskList as shared_TaskList } from '../generated/thrift/cadence-idl/com/uber/cadence/TaskList.js';
import { RetryPolicy as shared_RetryPolicy } from '../generated/thrift/cadence-idl/com/uber/cadence/RetryPolicy.js';
import { QueryResultType } from '../generated/thrift/cadence-idl/com/uber/cadence/QueryResultType.js';
import { errQueryType, queryErr, queryType, signalCh, binaryChecksumWorkflowFunc, greeterActivityFunc, helloWorldWorkflowCancelFunc, helloWorldWorkflowFunc, querySignalWorkflowFunc } from './internal_worker_interfaces_test.js';
import { internal_CanceledError, newPanicError } from './error.js';
import { newTestDataConverter } from './encoded_test.js';
import { isDecisionMatchEvent, isSearchAttributesMatched } from './workflow_replayer_utils.js';
import { EventType } from '../generated/thrift/cadence-idl/com/uber/cadence/EventType.js';
import { workflowExecutionEventHandlerImpl } from './internal_event_handlers.js';
import { internal_RetryPolicy } from './client.js';
import { historyIteratorImpl } from './internal_task_pollers.js';
import { tagWorkflowType } from './internal_logging_tags.js';
import { workflowTypePtr } from './internal_utils.js';
import { IRespondQueryTaskCompletedRequest, RespondQueryTaskCompletedRequest } from '../generated/thrift/cadence-idl/com/uber/cadence/RespondQueryTaskCompletedRequest.js';
// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { Logger } from 'winston';
import { RegisterActivityOptions, RegistryActivityInfo, internal_ActivityType } from './activity.js';
import { internal_Context } from './context.js';
import { activity } from './internal_activity.js';
import { workerExecutionParameters, newWorkflowTaskWorkerInternal, getBinaryChecksum } from './internal_worker.js';
import { registry, newRegistry } from './registry.js';
import { WorkflowInfo, GetWorkflowInfo, IsReplaying, Sleep, newEncodedValue } from './workflow.js';
import type { WorkflowServiceClientLike } from './runtime/workflow_service_client_like.js';
import { Channel } from './runtime/channel.js';
import { Context } from './runtime/context.js';
import { Minute, Second } from './runtime/time.js';
import { GoTestifySuite } from './runtime/testify_suite.js';
import type { GoObservedLogEntry } from './runtime/logging.js';
import { WarnLevel, ErrorLevel, LoggerFromCore, ObserverCore, NoopLogger } from './runtime/logging.js';
import { expect } from 'vitest';
import { IActivityTaskCompletedEventAttributes as shared_IActivityTaskCompletedEventAttributes, ActivityTaskCompletedEventAttributes as shared_ActivityTaskCompletedEventAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/ActivityTaskCompletedEventAttributes.js';
import { IActivityTaskScheduledEventAttributes as shared_IActivityTaskScheduledEventAttributes, ActivityTaskScheduledEventAttributes as shared_ActivityTaskScheduledEventAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/ActivityTaskScheduledEventAttributes.js';
import { IActivityTaskStartedEventAttributes as shared_IActivityTaskStartedEventAttributes, ActivityTaskStartedEventAttributes as shared_ActivityTaskStartedEventAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/ActivityTaskStartedEventAttributes.js';
import { IActivityTaskTimedOutEventAttributes as shared_IActivityTaskTimedOutEventAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/ActivityTaskTimedOutEventAttributes.js';
import { IDecisionTaskCompletedEventAttributes as shared_IDecisionTaskCompletedEventAttributes, DecisionTaskCompletedEventAttributes as shared_DecisionTaskCompletedEventAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/DecisionTaskCompletedEventAttributes.js';
import { IDecisionTaskFailedEventAttributes as shared_IDecisionTaskFailedEventAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/DecisionTaskFailedEventAttributes.js';
import { IDecisionTaskScheduledEventAttributes as shared_IDecisionTaskScheduledEventAttributes, DecisionTaskScheduledEventAttributes as shared_DecisionTaskScheduledEventAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/DecisionTaskScheduledEventAttributes.js';
import { IHistoryEvent as shared_IHistoryEvent, HistoryEvent as shared_HistoryEvent } from '../generated/thrift/cadence-idl/com/uber/cadence/HistoryEvent.js';
import { IMarkerRecordedEventAttributes as shared_IMarkerRecordedEventAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/MarkerRecordedEventAttributes.js';
import { IPollForDecisionTaskResponse as shared_IPollForDecisionTaskResponse, PollForDecisionTaskResponse as shared_PollForDecisionTaskResponse } from '../generated/thrift/cadence-idl/com/uber/cadence/PollForDecisionTaskResponse.js';
import { ISignalExternalWorkflowExecutionFailedEventAttributes as shared_ISignalExternalWorkflowExecutionFailedEventAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/SignalExternalWorkflowExecutionFailedEventAttributes.js';
import { IWorkflowExecutionCompletedEventAttributes as shared_IWorkflowExecutionCompletedEventAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/WorkflowExecutionCompletedEventAttributes.js';
import { IWorkflowExecutionContinuedAsNewEventAttributes as shared_IWorkflowExecutionContinuedAsNewEventAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/WorkflowExecutionContinuedAsNewEventAttributes.js';
import { IWorkflowExecutionStartedEventAttributes as shared_IWorkflowExecutionStartedEventAttributes, WorkflowExecutionStartedEventAttributes as shared_WorkflowExecutionStartedEventAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/WorkflowExecutionStartedEventAttributes.js';
import { IWorkflowQuery as shared_IWorkflowQuery, WorkflowQuery as shared_WorkflowQuery } from '../generated/thrift/cadence-idl/com/uber/cadence/WorkflowQuery.js';
import { IWorkflowQueryResult as shared_IWorkflowQueryResult, WorkflowQueryResult as shared_WorkflowQueryResult } from '../generated/thrift/cadence-idl/com/uber/cadence/WorkflowQueryResult.js';
import { args } from './internal_worker_test.js';
import { recvCase, selectOne } from './runtime/select.js';
import { RecordActivityTaskHeartbeatRequest } from '../generated/thrift/cadence-idl/com/uber/cadence/RecordActivityTaskHeartbeatRequest.js';
import { Float64Ptr, Int32Ptr, StringPtr, EventTypePtr, Int64Ptr } from './common/convert.js';
import { getDefaultDataConverter } from './encoded.js';
import { newWorkflowTaskHandler, workflowTask, getWorkflowCache, cadenceInvoker, history, workflowCategorizedByTimeout, workflowExecutionContextImpl, getRetryBackoffWithNowTime, noRetryBackoff } from './internal_task_handlers.js';
import { DecisionType } from '../generated/thrift/cadence-idl/com/uber/cadence/DecisionType.js';
import { TaskListKind } from '../generated/thrift/cadence-idl/com/uber/cadence/TaskListKind.js';
import { internal_NonDeterministicWorkflowPolicy } from './worker.js';

export class TaskHandlersTestSuite {
  constructor(init?: Partial<TaskHandlersTestSuite>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  Suite: GoTestifySuite = new GoTestifySuite();

  logger?: Logger;

  service?: WorkflowServiceClientLike;

  registry?: registry;

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
    this.logger = NoopLogger();
  }

  async SetupSuite(): Promise<void> {
    this.logger = NoopLogger();
    await registerWorkflows(this.registry!);
  }

  async testWorkflowTaskWorkflowExecutionStartedHelper(params: workerExecutionParameters): Promise<void> {
    const testEvents = [
      createTestEventWorkflowExecutionStarted(
        1,
        new shared_WorkflowExecutionStartedEventAttributes({
          taskList: new shared_TaskList({ name: testWorkflowTaskTasklist }),
        }),
      ),
    ];
    const task = await createWorkflowTask(testEvents, 0, "HelloWorld_Workflow");
    const taskHandler = newWorkflowTaskHandler(testDomain, params, undefined, this.registry!);
    const request = await taskHandler.ProcessWorkflowTask(new workflowTask({ task }), undefined);
    const response = request as {
      decisions?: Array<{
        decisionType?: number;
        scheduleActivityTaskDecisionAttributes?: unknown;
      }>;
    };

    this.NoError(null);
    this.NotNil(response);
    this.Equal(1, response!.decisions?.length ?? 0);
    this.Equal(0, response!.decisions![0].decisionType);
    this.NotNil(response!.decisions![0].scheduleActivityTaskDecisionAttributes);
  }

  async TestWorkflowTask_WorkflowExecutionStarted(): Promise<void> {
    const params = new workerExecutionParameters({
      TaskList: new shared_TaskList({
        name: StringPtr(testWorkflowTaskTasklist),
        kind: TaskListKind.NORMAL,
      }),
      Identity: "test-id-1",
      Logger: this.logger,
      SessionResourceID: "",
      WorkerStopTimeout: 0,
    });
    await this.testWorkflowTaskWorkflowExecutionStartedHelper(params);
  }

  async TestWorkflowTask_WorkflowExecutionStarted_WithDataConverter(): Promise<void> {
    const params = new workerExecutionParameters({
      TaskList: new shared_TaskList({
        name: StringPtr(testWorkflowTaskTasklist),
        kind: TaskListKind.NORMAL,
      }),
      Identity: "test-id-1",
      Logger: this.logger,
      DataConverter: newTestDataConverter(),
      SessionResourceID: "",
      WorkerStopTimeout: 0,
    });
    await this.testWorkflowTaskWorkflowExecutionStartedHelper(params);
  }

  async TestWorkflowTask_BinaryChecksum(): Promise<void> {
    const taskList = new shared_TaskList({
      name: "taskList",
      kind: TaskListKind.NORMAL,
    });
    const checksum1 = "chck1";
    const checksum2 = "chck2";
    const testEvents = [
      createTestEventWorkflowExecutionStarted(
        1,
        new shared_WorkflowExecutionStartedEventAttributes({ taskList }),
      ),
      createTestEventDecisionTaskScheduled(
        2,
        new shared_DecisionTaskScheduledEventAttributes({ taskList }),
      ),
      createTestEventDecisionTaskStarted(3),
      createTestEventDecisionTaskCompleted(
        4,
        new shared_DecisionTaskCompletedEventAttributes({
          scheduledEventId: new Int64(2),
          binaryChecksum: checksum1,
        }),
      ),
      createTestEventTimerStarted(5, 0),
      createTestEventTimerFired(6, 0),
      createTestEventDecisionTaskScheduled(
        7,
        new shared_DecisionTaskScheduledEventAttributes({ taskList }),
      ),
      createTestEventDecisionTaskStarted(8),
      createTestEventDecisionTaskCompleted(
        9,
        new shared_DecisionTaskCompletedEventAttributes({
          scheduledEventId: new Int64(7),
          binaryChecksum: checksum2,
        }),
      ),
      createTestEventTimerStarted(10, 1),
      createTestEventTimerFired(11, 1),
      createTestEventDecisionTaskScheduled(
        12,
        new shared_DecisionTaskScheduledEventAttributes({ taskList }),
      ),
      createTestEventDecisionTaskStarted(13),
    ];
    const task = await createWorkflowTask(testEvents, 8, "BinaryChecksumWorkflow");
    const params = new workerExecutionParameters({
      TaskList: taskList,
      Identity: "test-id-1",
      Logger: this.logger!,
      SessionResourceID: "",
      WorkerStopTimeout: 0,
    });
    const taskHandler = newWorkflowTaskHandler(
      testDomain,
      params,
      undefined,
      this.registry!,
    );
    const request = await taskHandler.ProcessWorkflowTask(
      new workflowTask({ task }),
      undefined,
    );
    const response = request as {
      decisions?: Array<{
        decisionType?: unknown;
        completeWorkflowExecutionDecisionAttributes?: {
          result?: Buffer;
        };
      }>;
    };

    expect(response).not.toBeNull();
    expect(response.decisions!).toHaveLength(1);
    expect(response.decisions![0].decisionType).toEqual(
      DecisionType.CompleteWorkflowExecution,
    );

    const checksumsBytes =
      response.decisions![0].completeWorkflowExecutionDecisionAttributes!.result!;
    let checksums: string[] = [];
    try {
      checksums = JSON.parse(checksumsBytes.toString("utf8"));
    } catch (err) {
      if (!(err instanceof Error)) throw err;
    }

    expect(checksums).toHaveLength(3);
    expect(checksums[0]).toEqual("chck1");
    expect(checksums[1]).toEqual("chck2");
    expect(checksums[2]).toEqual(await getBinaryChecksum());
  }

  async TestWorkflowTask_ActivityTaskScheduled(): Promise<void> {
    const taskList = new shared_TaskList({
      name: "taskList",
      kind: TaskListKind.NORMAL,
    });
    const testEvents = [
      createTestEventWorkflowExecutionStarted(
        1,
        new shared_WorkflowExecutionStartedEventAttributes({ taskList }),
      ),
      createTestEventDecisionTaskScheduled(
        2,
        new shared_DecisionTaskScheduledEventAttributes({ taskList }),
      ),
      createTestEventDecisionTaskStarted(3),
      createTestEventDecisionTaskCompleted(
        4,
        new shared_DecisionTaskCompletedEventAttributes({
          scheduledEventId: new Int64(2),
        }),
      ),
      createTestEventActivityTaskScheduled(
        5,
        new shared_ActivityTaskScheduledEventAttributes({
          activityId: "0",
          activityType: new shared_ActivityType({ name: "Greeter_Activity" }),
          taskList,
        }),
      ),
      createTestEventActivityTaskStarted(
        6,
        new shared_ActivityTaskStartedEventAttributes({}),
      ),
      createTestEventActivityTaskCompleted(
        7,
        new shared_ActivityTaskCompletedEventAttributes({
          scheduledEventId: new Int64(5),
        }),
      ),
      createTestEventDecisionTaskStarted(8),
    ];

    let task = await createWorkflowTask(
      testEvents.slice(0, 3),
      0,
      "HelloWorld_Workflow",
    );
    const params = new workerExecutionParameters({
      TaskList: taskList,
      Identity: "test-id-1",
      Logger: this.logger!,
      SessionResourceID: "",
      WorkerStopTimeout: 0,
    });
    const taskHandler = newWorkflowTaskHandler(
      testDomain,
      params,
      undefined,
      this.registry!,
    );

    let request = await taskHandler.ProcessWorkflowTask(
      new workflowTask({ task }),
      undefined,
    );
    const response = request as any;

    expect(null).toBeNull();
    expect(response).not.toBeNull();
    expect(response.decisions).toHaveLength(1);
    expect(response.decisions[0].decisionType ?? 0).toEqual(
      DecisionType.ScheduleActivityTask,
    );
    expect(response.decisions[0].scheduleActivityTaskDecisionAttributes).not.toBeNull();

    task = await createWorkflowTask(
      testEvents,
      3,
      "HelloWorld_Workflow",
    );
    request = await taskHandler.ProcessWorkflowTask(
      new workflowTask({ task }),
      undefined,
    );
    const response2 = request as any;

    expect(null).toBeNull();
    expect(response2).not.toBeNull();
    expect(response2.decisions).toHaveLength(1);
    expect(response2.decisions[0].decisionType ?? 0).toEqual(
      DecisionType.CompleteWorkflowExecution,
    );
    expect(response2.decisions[0].completeWorkflowExecutionDecisionAttributes).not.toBeNull();
  }

  async TestWorkflowTask_QueryWorkflow(): Promise<void> {
    const taskList = new shared_TaskList({ name: "taskList", kind: 0 });
    const execution = new shared_WorkflowExecution({
      workflowId: "fake-workflow-id",
      runId: globalThis.crypto.randomUUID(),
    });
    const testEvents = [
      createTestEventWorkflowExecutionStarted(
        1,
        new shared_WorkflowExecutionStartedEventAttributes({ taskList }),
      ),
      createTestEventDecisionTaskScheduled(
        2,
        new shared_DecisionTaskScheduledEventAttributes({ taskList }),
      ),
      createTestEventDecisionTaskStarted(3),
      createTestEventDecisionTaskCompleted(
        4,
        new shared_DecisionTaskCompletedEventAttributes({ scheduledEventId: new Int64(2) }),
      ),
      createTestEventActivityTaskScheduled(5, {
        activityId: "0",
        activityType: { name: "Greeter_Activity" },
        taskList,
      }),
      createTestEventActivityTaskStarted(6, {}),
      createTestEventActivityTaskCompleted(7, { scheduledEventId: new Int64(5) }),
    ];

    const params = new workerExecutionParameters({
      TaskList: taskList,
      Identity: "test-id-1",
      Logger: this.logger!,
      SessionResourceID: "",
      WorkerStopTimeout: 0,
    });
    const taskHandler = newWorkflowTaskHandler(testDomain, params, undefined, this.registry!);

    let task = await createWorkflowTask(testEvents.slice(0, 1), 0, "HelloWorld_Workflow");
    task.startedEventId = new Int64(1);
    task.workflowExecution = execution;
    const request = await taskHandler.ProcessWorkflowTask(new workflowTask({ task }), undefined);
    const response = request as {
      decisions?: Array<{
        decisionType?: number;
        scheduleActivityTaskDecisionAttributes?: unknown;
      }>;
    };

    expect(response).not.toBeNull();
    expect(response.decisions).toHaveLength(1);
    expect(response.decisions![0].decisionType).toBe(0);
    expect(response.decisions![0].scheduleActivityTaskDecisionAttributes).not.toBeNull();

    task = await createQueryTask([], 6, "HelloWorld_Workflow", queryType);
    task.workflowExecution = execution;
    const queryResp = await taskHandler.ProcessWorkflowTask(new workflowTask({ task }), undefined);
    this.verifyQueryResult(queryResp, "waiting-activity-result");
  }

  async TestWorkflowTask_QueryWorkflow_2(): Promise<void> {
    const taskList = new shared_TaskList({
      name: StringPtr("taskList"),
      kind: TaskListKind.NORMAL,
    });
    const testEvents = [
      createTestEventWorkflowExecutionStarted(
        1,
        new shared_WorkflowExecutionStartedEventAttributes({ taskList }),
      ),
      createTestEventDecisionTaskScheduled(
        2,
        new shared_DecisionTaskScheduledEventAttributes({ taskList }),
      ),
      createTestEventDecisionTaskStarted(3),
      createTestEventDecisionTaskCompleted(
        4,
        new shared_DecisionTaskCompletedEventAttributes({ scheduledEventId: new Int64(2) }),
      ),
      createTestEventActivityTaskScheduled(
        5,
        new shared_ActivityTaskScheduledEventAttributes({
          activityId: StringPtr("0"),
          activityType: new shared_ActivityType({ name: StringPtr("Greeter_Activity") }),
          taskList,
        }),
      ),
      createTestEventActivityTaskStarted(
        6,
        new shared_ActivityTaskStartedEventAttributes({}),
      ),
      createTestEventActivityTaskCompleted(
        7,
        new shared_ActivityTaskCompletedEventAttributes({ scheduledEventId: new Int64(5) }),
      ),
      createTestEventDecisionTaskStarted(8),
      createTestEventWorkflowExecutionSignaled(9, "test-signal"),
    ];

    const params = new workerExecutionParameters({
      TaskList: taskList,
      Identity: "test-id-1",
      Logger: this.logger,
      SessionResourceID: "",
      WorkerStopTimeout: 0,
    });

    let task = await createQueryTask(
      testEvents.slice(0, 3),
      3,
      "HelloWorld_Workflow",
      queryType,
    );
    let taskHandler = newWorkflowTaskHandler(testDomain, params, undefined, this.registry!);
    let response = await taskHandler.ProcessWorkflowTask(new workflowTask({ task }), undefined);
    this.verifyQueryResult(response, "waiting-activity-result");

    task = await createQueryTask(
      testEvents.slice(0, 7),
      7,
      "HelloWorld_Workflow",
      queryType,
    );
    taskHandler = newWorkflowTaskHandler(testDomain, params, undefined, this.registry!);
    response = await taskHandler.ProcessWorkflowTask(new workflowTask({ task }), undefined);
    this.verifyQueryResult(response, "waiting-activity-result");

    task = await createQueryTask(
      testEvents.slice(0, 8),
      8,
      "HelloWorld_Workflow",
      queryType,
    );
    taskHandler = newWorkflowTaskHandler(testDomain, params, undefined, this.registry!);
    response = await taskHandler.ProcessWorkflowTask(new workflowTask({ task }), undefined);
    this.verifyQueryResult(response, "done");

    task = await createQueryTask(
      testEvents.slice(0, 9),
      9,
      "HelloWorld_Workflow",
      queryType,
    );
    taskHandler = newWorkflowTaskHandler(testDomain, params, undefined, this.registry!);
    response = await taskHandler.ProcessWorkflowTask(new workflowTask({ task }), undefined);
    this.verifyQueryResult(response, "done");

    task = await createQueryTask(
      testEvents.slice(0, 9),
      9,
      "HelloWorld_Workflow",
      "invalid-query-type",
    );
    taskHandler = newWorkflowTaskHandler(testDomain, params, undefined, this.registry!);
    response = await taskHandler.ProcessWorkflowTask(new workflowTask({ task }), undefined);

    this.NotNil(response);
    const ok =
      response !== null &&
      typeof response === "object" &&
      "errorMessage" in response;
    this.True(ok);
    const queryResp = response as { errorMessage?: string };
    this.NotNil(queryResp.errorMessage);
    this.Contains(queryResp.errorMessage!, "unknown queryType");
  }

  verifyQueryResult(response: unknown, expectedResult: string): void {
    expect(response).not.toBeNull();
    const ok = response instanceof RespondQueryTaskCompletedRequest;
    expect(ok).toBe(true);
    const queryResp = response as IRespondQueryTaskCompletedRequest;
    expect(queryResp.errorMessage ?? null).toBeNull();
    expect(queryResp.queryResult ?? null).not.toBeNull();
    const encodedValue = newEncodedValue(queryResp.queryResult!, undefined);
    const queryResultBox: { value: string } = { value: '' };
    encodedValue.Get(queryResultBox);
    const queryResult = queryResultBox.value;
    expect(queryResult).toEqual(expectedResult);
  }

  async TestCacheEvictionWhenErrorOccurs(): Promise<void> {
    const taskList = new shared_TaskList({
      name: StringPtr("taskList"),
      kind: TaskListKind.NORMAL,
    });
    const testEvents = [
      createTestEventWorkflowExecutionStarted(
        1,
        new shared_WorkflowExecutionStartedEventAttributes({ taskList }),
      ),
      createTestEventDecisionTaskScheduled(
        2,
        new shared_DecisionTaskScheduledEventAttributes({ taskList }),
      ),
      createTestEventDecisionTaskStarted(3),
      createTestEventDecisionTaskCompleted(
        4,
        new shared_DecisionTaskCompletedEventAttributes({
          scheduledEventId: new Int64(2),
        }),
      ),
      createTestEventActivityTaskScheduled(
        5,
        new shared_ActivityTaskScheduledEventAttributes({
          activityId: StringPtr("0"),
          activityType: new shared_ActivityType({
            name: StringPtr("pkg.Greeter_Activity"),
          }),
          taskList,
        }),
      ),
    ];

    const params = new workerExecutionParameters({
      TaskList: taskList,
      Identity: "test-id-1",
      Logger: NoopLogger(),
      NonDeterministicWorkflowPolicy:
        internal_NonDeterministicWorkflowPolicy.NonDeterministicWorkflowPolicyBlockWorkflow,
      SessionResourceID: "",
      WorkerStopTimeout: 0,
    });

    const taskHandler = newWorkflowTaskHandler(
      testDomain,
      params,
      undefined,
      this.registry!,
    );

    testEvents[4].activityTaskScheduledEventAttributes!.activityType!.name =
      StringPtr("some-other-activity");

    const task = await createWorkflowTask(
      testEvents,
      3,
      "HelloWorld_Workflow",
    );

    try {
      await newWorkflowTaskWorkerInternal(
        taskHandler,
        this.service!,
        testDomain,
        params,
        new Channel<{}>(0),
        undefined,
      );
    } catch (e) {
      if (!(e instanceof Error)) throw e;
    }

    let request: unknown = null;
    let err: Error | null = null;
    try {
      request = await taskHandler.ProcessWorkflowTask(
        new workflowTask({ task }),
        undefined,
      );
    } catch (e) {
      if (!(e instanceof Error)) throw e;
      err = e;
    }

    expect(err).not.toBeNull();
    expect(request).toBeNull();
    expect(err!.message).toContain("nondeterministic");

    const cache = await getWorkflowCache();
    expect(await cache.Size()).toEqual(0);
  }

  async TestWithMissingHistoryEvents(): Promise<void> {
    const taskList = new shared_TaskList({
      name: StringPtr("taskList"),
      kind: TaskListKind.NORMAL,
    });
    const testEvents = [
      createTestEventWorkflowExecutionStarted(
        1,
        new shared_WorkflowExecutionStartedEventAttributes({ taskList }),
      ),
      createTestEventDecisionTaskScheduled(
        2,
        new shared_DecisionTaskScheduledEventAttributes({ taskList }),
      ),
      createTestEventDecisionTaskStarted(3),
      createTestEventDecisionTaskCompleted(
        4,
        new shared_DecisionTaskCompletedEventAttributes({
          scheduledEventId: new Int64(2),
        }),
      ),
      createTestEventDecisionTaskScheduled(
        6,
        new shared_DecisionTaskScheduledEventAttributes({ taskList }),
      ),
      createTestEventDecisionTaskStarted(7),
    ];

    const params = new workerExecutionParameters({
      TaskList: taskList,
      Identity: "test-id-1",
      Logger: NoopLogger(),
      NonDeterministicWorkflowPolicy:
        internal_NonDeterministicWorkflowPolicy.NonDeterministicWorkflowPolicyBlockWorkflow,
      SessionResourceID: "",
      WorkerStopTimeout: 0,
    });

    for (const startEventID of [0, 3]) {
      const taskHandler = newWorkflowTaskHandler(
        testDomain,
        params,
        undefined,
        this.registry!,
      );
      const task = await createWorkflowTask(
        testEvents,
        startEventID,
        "HelloWorld_Workflow",
      );
      await newWorkflowTaskWorkerInternal(
        taskHandler,
        this.service!,
        testDomain,
        params,
        new Channel<{}>(0),
        undefined,
      );

      let request: unknown | undefined;
      let err: Error | null = null;
      try {
        request = await taskHandler.ProcessWorkflowTask(
          new workflowTask({ task }),
          undefined,
        );
      } catch (caught) {
        if (!(caught instanceof Error)) {
          throw caught;
        }
        err = caught;
      }

      this.Error(err);
      this.Nil(request);
      this.Contains(err!.message, "missing history events");

      const cache = await getWorkflowCache();
      this.EqualValues(await cache.Size(), 0);
    }
  }

  async TestWithTruncatedHistory(): Promise<void> {
    const taskList = new shared_TaskList({
      name: "taskList",
      kind: TaskListKind.NORMAL,
    });
    const testEvents = [
      createTestEventWorkflowExecutionStarted(
        1,
        new shared_WorkflowExecutionStartedEventAttributes({ taskList }),
      ),
      createTestEventDecisionTaskScheduled(2, { taskList }),
      createTestEventDecisionTaskStarted(3),
      createTestEventDecisionTaskFailed(4, { scheduledEventId: new Int64(2) }),
      createTestEventDecisionTaskScheduled(5, { taskList }),
      createTestEventDecisionTaskStarted(6),
      createTestEventDecisionTaskCompleted(
        7,
        new shared_DecisionTaskCompletedEventAttributes({ scheduledEventId: new Int64(5) }),
      ),
      createTestEventActivityTaskScheduled(8, {
        activityId: "0",
        activityType: { name: "pkg.Greeter_Activity" },
        taskList,
      }),
    ];

    const params = new workerExecutionParameters({
      TaskList: taskList,
      Identity: "test-id-1",
      Logger: NoopLogger(),
      NonDeterministicWorkflowPolicy:
        internal_NonDeterministicWorkflowPolicy.NonDeterministicWorkflowPolicyBlockWorkflow,
      SessionResourceID: "",
      WorkerStopTimeout: 0,
    });

    const testCases: {
      startedEventID: number;
      previousStartedEventID: number;
      isResultErr: boolean;
    }[] = [
      { startedEventID: 0, previousStartedEventID: 6, isResultErr: false },
      { startedEventID: 10, previousStartedEventID: 0, isResultErr: true },
      { startedEventID: 10, previousStartedEventID: 6, isResultErr: true },
    ];

    for (const [, testCase] of testCases.entries()) {
      const taskHandler = newWorkflowTaskHandler(testDomain, params, undefined, this.registry!);
      const task = await createWorkflowTask(
        testEvents,
        testCase.previousStartedEventID,
        "HelloWorld_Workflow",
      );
      task.startedEventId = new Int64(testCase.startedEventID);

      await newWorkflowTaskWorkerInternal(
        taskHandler,
        this.service!,
        testDomain,
        params,
        new Channel<{}>(0),
        undefined,
      );

      try {
        const request = await taskHandler.ProcessWorkflowTask(new workflowTask({ task }), undefined);

        if (testCase.isResultErr) {
          this.Fail("expected ProcessWorkflowTask to fail");
          this.Nil(request);
          continue;
        }

        this.NoError(null);
      } catch (err) {
        if (!(err instanceof Error)) throw err;

        if (!testCase.isResultErr) {
          this.Fail(err.message);
          continue;
        }

        this.Error(err);
        this.Nil(undefined);
        this.Contains(err.message, "premature end of stream");
        const cache = await getWorkflowCache();
        this.EqualValues(1, await cache.Size());
      }
    }
  }

  async TestSideEffectDefer_Sticky(): Promise<void> {
    await this.testSideEffectDeferHelper(false);
  }

  async TestSideEffectDefer_NonSticky(): Promise<void> {
    await this.testSideEffectDeferHelper(true);
  }

  async testSideEffectDeferHelper(disableSticky: boolean): Promise<void> {
    let value = "should not be modified";
    const expectedValue = value;
    let resolveDone!: () => void;
    const doneCh = new Promise<void>((resolve) => {
      resolveDone = resolve;
    });

    const workflowFunc = async (ctx: internal_Context): Promise<void> => {
      try {
        await Sleep(ctx, 1 * Second);
      } finally {
        if (!IsReplaying(ctx)) {
          value = "";
        }
        resolveDone();
      }
    };

    const workflowName = `SideEffectDeferWorkflow-Sticky=${disableSticky}`;
    await this.registry!.RegisterWorkflowWithOptions(workflowFunc, {
      Name: workflowName,
      EnableShortName: false,
      DisableAlreadyRegisteredCheck: false,
    });

    const taskList = new shared_TaskList({
      name: StringPtr("taskList"),
      kind: TaskListKind.NORMAL,
    });
    const testEvents = [
      createTestEventWorkflowExecutionStarted(
        1,
        new shared_WorkflowExecutionStartedEventAttributes({ taskList }),
      ),
      createTestEventDecisionTaskScheduled(
        2,
        new shared_DecisionTaskScheduledEventAttributes({ taskList }),
      ),
      createTestEventDecisionTaskStarted(3),
    ];

    const params = new workerExecutionParameters({
      TaskList: taskList,
      Identity: "test-id-1",
      Logger: NoopLogger(),
      DisableStickyExecution: disableSticky,
      SessionResourceID: "",
      WorkerStopTimeout: 0,
    });

    const taskHandler = newWorkflowTaskHandler(testDomain, params, undefined, this.registry!);
    const task = await createWorkflowTask(testEvents, 0, workflowName);
    await taskHandler.ProcessWorkflowTask(new workflowTask({ task }), undefined);

    if (!params.DisableStickyExecution) {
      const workflowCache = await getWorkflowCache();
      await workflowCache.Delete(task.workflowExecution!.runId ?? "");
    }

    await doneCh;
    this.Equal(expectedValue, value);

    const workflowCache = await getWorkflowCache();
    this.EqualValues(0, await workflowCache.Size());
  }

  async TestWorkflowTask_NondeterministicDetection(): Promise<void> {
    const taskList = new shared_TaskList({
      name: StringPtr("taskList"),
      kind: TaskListKind.NORMAL,
    });
    const testEvents = [
      createTestEventWorkflowExecutionStarted(
        1,
        new shared_WorkflowExecutionStartedEventAttributes({ taskList }),
      ),
      createTestEventDecisionTaskScheduled(
        2,
        new shared_DecisionTaskScheduledEventAttributes({ taskList }),
      ),
      createTestEventDecisionTaskStarted(3),
      createTestEventDecisionTaskCompleted(
        4,
        new shared_DecisionTaskCompletedEventAttributes({
          scheduledEventId: new Int64(2),
        }),
      ),
      createTestEventActivityTaskScheduled(
        5,
        new shared_ActivityTaskScheduledEventAttributes({
          activityId: StringPtr("0"),
          activityType: new shared_ActivityType({
            name: StringPtr("pkg.Greeter_Activity"),
          }),
          taskList,
        }),
      ),
    ];

    let task = await createWorkflowTask(testEvents, 3, "HelloWorld_Workflow");
    const stopC = new Channel<{}>();
    const params = new workerExecutionParameters({
      TaskList: taskList,
      Identity: "test-id-1",
      Logger: NoopLogger(),
      NonDeterministicWorkflowPolicy:
        internal_NonDeterministicWorkflowPolicy.NonDeterministicWorkflowPolicyBlockWorkflow,
      WorkerStopChannel: stopC,
      SessionResourceID: "",
      WorkerStopTimeout: 0,
    });

    const taskHandler = newWorkflowTaskHandler(
      testDomain,
      params,
      undefined,
      this.registry!,
    );

    let request: unknown;
    let err: Error | null = null;
    try {
      request = await taskHandler.ProcessWorkflowTask(
        new workflowTask({ task }),
        undefined,
      );
    } catch (caught) {
      if (!(caught instanceof Error)) throw caught;
      err = caught;
    }

    const response = request as unknown;
    expect(err).toBeNull();
    expect(response).not.toBeNull();

    testEvents[4].activityTaskScheduledEventAttributes!.activityType!.name =
      StringPtr("some-other-activity");
    task = await createWorkflowTask(testEvents, 3, "HelloWorld_Workflow");

    try {
      await newWorkflowTaskWorkerInternal(
        taskHandler,
        this.service!,
        testDomain,
        params,
        stopC,
        undefined,
      );
    } catch (caught) {
      if (!(caught instanceof Error)) throw caught;
    }

    request = undefined;
    err = null;
    try {
      request = await taskHandler.ProcessWorkflowTask(
        new workflowTask({ task }),
        undefined,
      );
    } catch (caught) {
      if (!(caught instanceof Error)) throw caught;
      err = caught;
    }

    expect(err).not.toBeNull();
    expect(request).toBeUndefined();
    expect(err!.message).toContain("nondeterministic");

    params.NonDeterministicWorkflowPolicy =
      internal_NonDeterministicWorkflowPolicy.NonDeterministicWorkflowPolicyFailWorkflow;
    const failOnNondeterminismTaskHandler = newWorkflowTaskHandler(
      testDomain,
      params,
      undefined,
      this.registry!,
    );

    task = await createWorkflowTask(testEvents, 3, "HelloWorld_Workflow");
    request = undefined;
    err = null;
    try {
      request = await failOnNondeterminismTaskHandler.ProcessWorkflowTask(
        new workflowTask({ task }),
        undefined,
      );
    } catch (caught) {
      if (!(caught instanceof Error)) throw caught;
      err = caught;
    }

    expect(err).toBeNull();

    const responseWithDecisions = request as {
      decisions?: Array<{
        decisionType?: DecisionType;
        failWorkflowExecutionDecisionAttributes?: {
          reason?: string;
        };
      }>;
    };
    const ok = request != null;
    expect(ok).toBe(true);

    expect(responseWithDecisions.decisions!.length > 0).toBe(true);
    const closeDecision =
      responseWithDecisions.decisions![
        responseWithDecisions.decisions!.length - 1
      ];
    expect(closeDecision.decisionType).toEqual(
      DecisionType.FailWorkflowExecution,
    );
    expect(
      closeDecision.failWorkflowExecutionDecisionAttributes!.reason,
    ).toContain("NonDeterministicWorkflowPolicyFailWorkflow");

    testEvents[4].activityTaskScheduledEventAttributes!.activityType!.name =
      StringPtr("new-package.Greeter_Activity");
    task = await createWorkflowTask(testEvents, 3, "HelloWorld_Workflow");

    request = undefined;
    err = null;
    try {
      request = await taskHandler.ProcessWorkflowTask(
        new workflowTask({ task }),
        undefined,
      );
    } catch (caught) {
      if (!(caught instanceof Error)) throw caught;
      err = caught;
    }

    expect(err).toBeNull();
    expect(request).not.toBeNull();
  }

  async TestWorkflowTask_NondeterministicLogNonexistingID(): Promise<void> {
    const taskList = new shared_TaskList({
      name: StringPtr("taskList")!,
      kind: TaskListKind.NORMAL,
    });
    const testEvents = [
      createTestEventWorkflowExecutionStarted(1, new shared_WorkflowExecutionStartedEventAttributes({
        taskList,
      })),
      createTestEventDecisionTaskScheduled(2, new shared_DecisionTaskScheduledEventAttributes({
        taskList,
      })),
      createTestEventDecisionTaskStarted(3),
      createTestEventDecisionTaskCompleted(4, new shared_DecisionTaskCompletedEventAttributes({
        scheduledEventId: new Int64(2),
      })),
      createTestEventActivityTaskScheduled(5, new shared_ActivityTaskScheduledEventAttributes({
        activityId: StringPtr("NotAnActivityID")!,
        activityType: new shared_ActivityType({
          name: StringPtr("pkg.Greeter_Activity")!,
        }),
        taskList,
      })),
    ];

    const [core, logs] = ObserverCore(ErrorLevel);
    const logger = LoggerFromCore(core);

    const task = await createWorkflowTask(testEvents, 3, "HelloWorld_Workflow");
    const stopC = new Channel<{}>();
    const params = new workerExecutionParameters({
      TaskList: taskList,
      Identity: "test-id-1",
      Logger: logger,
      WorkerStopChannel: stopC,
      SessionResourceID: "",
      WorkerStopTimeout: 0,
    });

    const taskHandler = newWorkflowTaskHandler(testDomain, params, undefined, this.registry!);
    let request: unknown | undefined;
    let err: Error | null = null;
    try {
      request = await taskHandler.ProcessWorkflowTask(new workflowTask({ task }), undefined);
    } catch (caught) {
      if (!(caught instanceof Error)) {
        throw caught;
      }
      err = caught;
    }

    expect(request).toBeNull();
    expect(err?.message ?? "").toContain("nondeterministic workflow");

    const illegalPanicLogs = logs.FilterMessage("Illegal state caused panic");
    expect(illegalPanicLogs.All()).toHaveLength(1);

    const replayErrorField = findLogField(illegalPanicLogs.All()[0], "ReplayError");
    expect(replayErrorField).not.toBeNull();

    const replayError = replayErrorField!["ReplayError"];
    const replayErrorMessage = replayError instanceof Error
      ? replayError.message
      : typeof (replayError as { Error?: unknown }).Error === "function"
        ? (replayError as { Error: () => string }).Error()
        : String(replayError);

    // @go-weakened: the runtime has no counterpart for the reflected zap field type and normalizes the detailed rendering.
    expect(replayErrorMessage).toContain("nondeterministic workflow");
  }

  async TestWorkflowTask_WorkflowReturnsPanicError(): Promise<void> {
    const taskList = new shared_TaskList({
      name: StringPtr("taskList"),
      kind: TaskListKind.NORMAL,
    });
    const testEvents = [
      createTestEventWorkflowExecutionStarted(
        1,
        new shared_WorkflowExecutionStartedEventAttributes({ taskList }),
      ),
      createTestEventDecisionTaskScheduled(
        2,
        new shared_DecisionTaskScheduledEventAttributes({ taskList }),
      ),
      createTestEventDecisionTaskStarted(3),
    ];
    const task = await createWorkflowTask(testEvents, 3, "ReturnPanicWorkflow");
    const params = new workerExecutionParameters({
      TaskList: taskList,
      Identity: "test-id-1",
      Logger: NoopLogger(),
      NonDeterministicWorkflowPolicy:
        internal_NonDeterministicWorkflowPolicy.NonDeterministicWorkflowPolicyBlockWorkflow,
      SessionResourceID: "",
      WorkerStopTimeout: 0,
    });

    const taskHandler = newWorkflowTaskHandler(testDomain, params, undefined, this.registry!);
    let request: unknown;
    let processError: Error | null = null;
    try {
      request = await taskHandler.ProcessWorkflowTask(new workflowTask({ task }), undefined);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
      processError = err;
    }
    this.NoError(processError);
    if (processError !== null) throw processError;
    this.NotNil(request);

    const ok = request !== null && request !== undefined && typeof request === "object";
    const r = request as {
      decisions?: Array<{
        decisionType?: DecisionType;
        failWorkflowExecutionDecisionAttributes?: { reason?: string; details?: Buffer };
      }>;
    };
    this.True(ok);
    this.EqualValues(DecisionType.FailWorkflowExecution, r.decisions![0].decisionType);

    const attr = r.decisions![0].failWorkflowExecutionDecisionAttributes!;
    this.EqualValues("cadenceInternal:Panic", attr.reason ?? "");
    const details = (attr.details ?? Buffer.alloc(0)).toString();
    this.True(details.startsWith("\"panicError"));
  }

  async TestWorkflowTask_WorkflowPanics(): Promise<void> {
    const taskList = new shared_TaskList({
      name: StringPtr("taskList"),
      kind: TaskListKind.NORMAL,
    });
    const testEvents = [
      createTestEventWorkflowExecutionStarted(
        1,
        new shared_WorkflowExecutionStartedEventAttributes({ taskList }),
      ),
      createTestEventDecisionTaskScheduled(
        2,
        new shared_DecisionTaskScheduledEventAttributes({ taskList }),
      ),
      createTestEventDecisionTaskStarted(3),
    ];

    const [core, logs] = ObserverCore(ErrorLevel);
    const logger = LoggerFromCore(core);

    const task = await createWorkflowTask(testEvents, 3, "PanicWorkflow");
    const params = new workerExecutionParameters({
      TaskList: taskList,
      Identity: "test-id-1",
      Logger: logger,
      NonDeterministicWorkflowPolicy:
        internal_NonDeterministicWorkflowPolicy.NonDeterministicWorkflowPolicyBlockWorkflow,
      SessionResourceID: "",
      WorkerStopTimeout: 0,
    });

    const taskHandler = newWorkflowTaskHandler(
      testDomain,
      params,
      undefined,
      this.registry!,
    );
    const request = await taskHandler.ProcessWorkflowTask(
      new workflowTask({ task }),
      undefined,
    );

    expect(request).not.toBeNull();
    const response = request as { cause?: number; details?: Buffer };
    expect(response.cause).toEqual(13);
    expect((response.details ?? Buffer.alloc(0)).toString()).toEqual("panicError");

    const panicLogs = logs.FilterMessage("Workflow panic.");
    expect(panicLogs.All()).toHaveLength(1);

    const wfTypeField = findLogField(panicLogs.All()[0], tagWorkflowType);
    expect(wfTypeField).not.toBeNull();
    expect(wfTypeField![tagWorkflowType]).toEqual("PanicWorkflow");
  }

  async TestGetWorkflowInfo(): Promise<void> {
    const taskList = new shared_TaskList({
      name: "taskList",
      kind: TaskListKind.NORMAL,
    });
    const parentID = "parentID";
    const parentRunID = "parentRun";
    const cronSchedule = "5 4 * * *";
    const continuedRunID = globalThis.crypto.randomUUID();
    const parentExecution = new shared_WorkflowExecution({
      workflowId: parentID,
      runId: parentRunID,
    });
    const parentDomain = "parentDomain";
    const attempt = 123;
    const executionTimeout = 213456;
    const taskTimeout = 21;
    const workflowTypeName = "GetWorkflowInfoWorkflow";
    const lastCompletionResult = getDefaultDataConverter().ToData("lastCompletionData");
    const retryPolicy = new shared_RetryPolicy({
      initialIntervalInSeconds: Int32Ptr(1),
      backoffCoefficient: Float64Ptr(1.0),
      maximumIntervalInSeconds: Int32Ptr(1),
      maximumAttempts: Int32Ptr(3),
    });
    const startedEventAttributes = new shared_WorkflowExecutionStartedEventAttributes({
      input: lastCompletionResult,
      taskList,
      parentWorkflowExecution: parentExecution,
      cronSchedule,
      continuedExecutionRunId: continuedRunID,
      parentWorkflowDomain: parentDomain,
      attempt,
      executionStartToCloseTimeoutSeconds: executionTimeout,
      taskStartToCloseTimeoutSeconds: taskTimeout,
      lastCompletionResult,
      retryPolicy,
    });
    const testEvents = [
      createTestEventWorkflowExecutionStarted(1, startedEventAttributes),
      createTestEventDecisionTaskScheduled(
        2,
        new shared_DecisionTaskScheduledEventAttributes({ taskList }),
      ),
      createTestEventDecisionTaskStarted(3),
    ];
    const task = await createWorkflowTask(testEvents, 3, workflowTypeName);
    const params = new workerExecutionParameters({
      TaskList: taskList,
      Identity: "test-id-1",
      Logger: NoopLogger(),
      NonDeterministicWorkflowPolicy:
        internal_NonDeterministicWorkflowPolicy.NonDeterministicWorkflowPolicyBlockWorkflow,
      WorkerStopTimeout: 0,
      SessionResourceID: "",
    });

    const taskHandler = newWorkflowTaskHandler(testDomain, params, undefined, this.registry!);
    const request = await taskHandler.ProcessWorkflowTask(
      new workflowTask({ task }),
      undefined,
    );
    expect(request).not.toBeNull();

    const response = request as {
      decisions?: Array<{
        decisionType?: number;
        completeWorkflowExecutionDecisionAttributes?: {
          result?: Buffer;
        };
      }>;
    };
    const decision = response.decisions![0];
    expect(decision.decisionType).toEqual(DecisionType.CompleteWorkflowExecution);

    const attr = decision.completeWorkflowExecutionDecisionAttributes;
    const resultBox: { value: WorkflowInfo } = {
      value: {
        Attempt: 0,
        ContinuedExecutionRunID: undefined,
        CronSchedule: undefined,
        Domain: "",
        ExecutionStartToCloseTimeoutSeconds: 0,
        ParentWorkflowDomain: undefined,
        ParentWorkflowExecution: undefined,
        RetryPolicy: undefined,
        TaskListName: "",
        TaskStartToCloseTimeoutSeconds: 0,
        WorkflowExecution: {
          ID: "",
          RunID: "",
        },
        WorkflowType: {
          Name: "",
        },
        lastCompletionResult: Buffer.alloc(0),
      },
    };
    getDefaultDataConverter().FromData(attr!.result!, resultBox);

    const result = resultBox.value;
    expect(result.TaskListName).toEqual(taskList.name ?? "");
    expect(result.ParentWorkflowExecution!.ID).toEqual(parentID);
    expect(result.ParentWorkflowExecution!.RunID).toEqual(parentRunID);
    expect(result.CronSchedule!.value).toEqual(cronSchedule);
    expect(result.ContinuedExecutionRunID!.value).toEqual(continuedRunID);
    expect(result.ParentWorkflowDomain!.value).toEqual(parentDomain);
    expect(result.Attempt).toEqual(attempt);
    expect(result.ExecutionStartToCloseTimeoutSeconds).toEqual(executionTimeout);
    expect(result.TaskStartToCloseTimeoutSeconds).toEqual(taskTimeout);
    expect(result.WorkflowType.Name).toEqual(workflowTypeName);
    expect(result.Domain).toEqual(testDomain);
    expect(result.RetryPolicy!).toEqual(retryPolicy);
  }

  async TestConsistentQuery_InvalidQueryTask(): Promise<void> {
    const taskList = new shared_TaskList({
      name: StringPtr("taskList"),
      kind: TaskListKind.NORMAL,
    });
    const params = new workerExecutionParameters({
      TaskList: taskList,
      Identity: "test-id-1",
      Logger: NoopLogger(),
      NonDeterministicWorkflowPolicy: internal_NonDeterministicWorkflowPolicy.NonDeterministicWorkflowPolicyBlockWorkflow,
      SessionResourceID: "",
      WorkerStopTimeout: 0,
    });

    const taskHandler = newWorkflowTaskHandler(testDomain, params, undefined, this.registry!);
    const task = await createWorkflowTask(undefined, 3, "HelloWorld_Workflow");
    task.query = new shared_WorkflowQuery({});
    task.queries = new Map([
      ["query_id", new shared_WorkflowQuery({})],
    ]);

    try {
      await newWorkflowTaskWorkerInternal(
        taskHandler,
        this.service!,
        testDomain,
        params,
        new Channel<{}>(),
        undefined,
      );
    } catch (err) {
      if (!(err instanceof Error)) {
        throw err;
      }
    }

    const workflowTask = new workflowTask({ task });
    let request: unknown;
    let err: Error | null = null;
    try {
      request = await taskHandler.ProcessWorkflowTask(workflowTask, undefined);
    } catch (caught) {
      if (!(caught instanceof Error)) {
        throw caught;
      }
      err = caught;
    }

    expect(err).not.toBeNull();
    expect(request).toBeNull();
    expect(err!.message).toContain("invalid query decision task");

    const cache = await getWorkflowCache();
    expect(0).toEqual(await cache.Size());
  }

  async TestConsistentQuery_Success(): Promise<void> {
    const taskList = new shared_TaskList({
      name: "taskList",
      kind: TaskListKind.NORMAL,
    });
    const checksum1 = "chck1";

    const numberOfSignalsToComplete = getDefaultDataConverter().ToData(2);
    const signal = getDefaultDataConverter().ToData("signal data");

    const testEvents = [
      createTestEventWorkflowExecutionStarted(
        1,
        new shared_WorkflowExecutionStartedEventAttributes({
          taskList,
          input: numberOfSignalsToComplete,
        }),
      ),
      createTestEventDecisionTaskScheduled(
        2,
        new shared_DecisionTaskScheduledEventAttributes({}),
      ),
      createTestEventDecisionTaskStarted(3),
      createTestEventDecisionTaskCompleted(
        4,
        new shared_DecisionTaskCompletedEventAttributes({
          scheduledEventId: new Int64(2),
          binaryChecksum: checksum1,
        }),
      ),
      createTestEventWorkflowExecutionSignaledWithPayload(
        5,
        signalCh,
        signal,
      ),
      createTestEventDecisionTaskScheduled(
        6,
        new shared_DecisionTaskScheduledEventAttributes({}),
      ),
      createTestEventDecisionTaskStarted(7),
    ];

    const queries = {
      id1: new shared_WorkflowQuery({ queryType }),
      id2: new shared_WorkflowQuery({ queryType: errQueryType }),
    };

    const task = await createWorkflowTaskWithQueries(
      testEvents.slice(0, 3),
      0,
      "QuerySignalWorkflow",
      queries,
    );

    const params = new workerExecutionParameters({
      TaskList: taskList,
      Identity: "test-id-1",
      Logger: this.logger,
      SessionResourceID: "",
      WorkerStopTimeout: 0,
    });

    const taskHandler = newWorkflowTaskHandler(
      testDomain,
      params,
      undefined,
      this.registry!,
    );
    const request = await taskHandler.ProcessWorkflowTask(
      new workflowTask({ task }),
      undefined,
    );
    const response = request as {
      decisions?: unknown[];
      queryResults?: Map<string, shared_IWorkflowQueryResult>;
    };

    expect(response).not.toBeNull();
    expect(response.decisions ?? []).toHaveLength(0);

    const expectedQueryResults = {
      id1: new shared_WorkflowQueryResult({
        resultType: QueryResultType.ANSWERED,
        answer: Buffer.from('""\n'),
      }),
      id2: new shared_WorkflowQueryResult({
        resultType: QueryResultType.FAILED,
        errorMessage: queryErr,
      }),
    };

    this.assertQueryResultsEqual(
      expectedQueryResults,
      Object.fromEntries(response.queryResults ?? new Map()),
    );

    const secondTask = await createWorkflowTaskWithQueries(
      testEvents,
      3,
      "QuerySignalWorkflow",
      queries,
    );
    secondTask.workflowExecution = {
      ...secondTask.workflowExecution!,
      runId: task.workflowExecution!.runId,
    };

    const secondRequest = await taskHandler.ProcessWorkflowTask(
      new workflowTask({ task: secondTask }),
      undefined,
    );
    const secondResponse = secondRequest as {
      decisions?: unknown[];
      queryResults?: Map<string, shared_IWorkflowQueryResult>;
    };

    expect(secondResponse).not.toBeNull();
    expect(secondResponse.decisions ?? []).toHaveLength(1);

    const secondExpectedQueryResults = {
      id1: new shared_WorkflowQueryResult({
        resultType: QueryResultType.ANSWERED,
        answer: Buffer.from('"signal data"\n'),
      }),
      id2: new shared_WorkflowQueryResult({
        resultType: QueryResultType.FAILED,
        errorMessage: queryErr,
      }),
    };

    this.assertQueryResultsEqual(
      secondExpectedQueryResults,
      Object.fromEntries(secondResponse.queryResults ?? new Map()),
    );

    const cache = await getWorkflowCache();
    await cache.Delete(task.workflowExecution!.runId!);
  }

  assertQueryResultsEqual(expected: Record<string, shared_IWorkflowQueryResult>, actual: Record<string, shared_IWorkflowQueryResult>): void {
    this.Equal(Object.keys(expected).length, Object.keys(actual).length);
    for (const [expectedID, expectedResult] of Object.entries(expected ?? {})) {
      this.Contains(actual, expectedID);
      this.Equal(expectedResult, actual[expectedID]);
    }
  }

  async TestWorkflowTask_CancelActivityBeforeSent(): Promise<void> {
    const taskList = new shared_TaskList({
      name: StringPtr("taskList"),
      kind: TaskListKind.NORMAL,
    });
    const testEvents = [
      createTestEventWorkflowExecutionStarted(
        1,
        new shared_WorkflowExecutionStartedEventAttributes({ taskList }),
      ),
      createTestEventDecisionTaskScheduled(
        2,
        new shared_DecisionTaskScheduledEventAttributes({}),
      ),
      createTestEventDecisionTaskStarted(3),
    ];
    const task = await createWorkflowTask(testEvents, 0, "HelloWorld_WorkflowCancel");

    const params = new workerExecutionParameters({
      TaskList: taskList,
      Identity: "test-id-1",
      Logger: this.logger,
      SessionResourceID: "",
      WorkerStopTimeout: 0,
    });
    const taskHandler = newWorkflowTaskHandler(testDomain, params, undefined, this.registry!);
    const request = await taskHandler.ProcessWorkflowTask(new workflowTask({ task }), undefined);
    const response = request as {
      decisions?: Array<{
        decisionType?: unknown;
        completeWorkflowExecutionDecisionAttributes?: unknown;
      }>;
    };

    expect(response).not.toBeNull();
    const decisions = response.decisions ?? [];
    expect(decisions).toHaveLength(1);
    expect(decisions[0].decisionType ?? 0).toEqual(DecisionType.CompleteWorkflowExecution);
    expect(decisions[0].completeWorkflowExecutionDecisionAttributes).not.toBeNull();
  }

  async TestWorkflowTask_PageToken(): Promise<void> {
    const taskList = new shared_TaskList({
      name: StringPtr("taskList"),
      kind: 0,
    });
    const testEvents = [
      createTestEventWorkflowExecutionStarted(
        1,
        new shared_WorkflowExecutionStartedEventAttributes({ taskList }),
      ),
      createTestEventDecisionTaskScheduled(
        2,
        new shared_DecisionTaskScheduledEventAttributes({}),
      ),
    ];
    const task = await createWorkflowTask(testEvents, 0, "HelloWorld_Workflow");
    task.nextPageToken = Buffer.from("token");

    const params = new workerExecutionParameters({
      TaskList: taskList,
      Identity: "test-id-1",
      Logger: this.logger,
      SessionResourceID: "",
      WorkerStopTimeout: 0,
    });

    const nextEvents = [createTestEventDecisionTaskStarted(3)];
    const historyIterator = new historyIteratorImpl({
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
      iteratorFunc: (_nextToken) => [
        new shared_History({ events: nextEvents }),
        Buffer.alloc(0),
      ],
    });
    const taskHandler = newWorkflowTaskHandler(
      testDomain,
      params,
      undefined,
      this.registry!,
    );
    const request = await taskHandler.ProcessWorkflowTask(
      new workflowTask({ task, historyIterator }),
      undefined,
    );
    const response = request;
    this.NotNil(response);
  }

  async TestLocalActivityRetry_DecisionHeartbeatFail(): Promise<void> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  TestHeartBeatLogNil(): void {
    const [core, obs] = ObserverCore(ErrorLevel);
    const logger = LoggerFromCore(core);

    const cadenceInv = new cadenceInvoker({
      identity: "Test_Cadence_Invoker",
      logger,
    });

    cadenceInv.logFailedHeartBeat(null);

    this.Empty(obs.All());
  }

  TestHeartBeatLogCanceledError(): void {
    const [core, obs] = ObserverCore(ErrorLevel);
    const logger = LoggerFromCore(core);

    const cadenceInv = new cadenceInvoker({
      identity: "Test_Cadence_Invoker",
      logger,
    });

    const workflowCompleatedErr = new internal_CanceledError();
    cadenceInv.logFailedHeartBeat(workflowCompleatedErr);

    this.Empty(obs.All());
  }

  TestHeartBeatLogNotCanceled(): void {
    const [core, obs] = ObserverCore(ErrorLevel);
    const logger = LoggerFromCore(core);

    const cadenceInv = new cadenceInvoker({
      identity: "Test_Cadence_Invoker",
      logger,
    });

    const workflowCompleatedErr = new globalThis.Error();
    cadenceInv.logFailedHeartBeat(workflowCompleatedErr);

    expect(obs.All()).toHaveLength(1);
    expect(obs.All()[0].Message).toEqual("Failed to send heartbeat");
  }

  async TestRegression_QueriesDoNotLeakGoroutines(): Promise<void> {
    // @go-unlowerable: unavailable runtime API — goleak.Find and its leak-detection behavior are not provided in the TypeScript facts
  }

}

export class recordHeartbeatRequestMatcher {
  constructor(init?: Partial<recordHeartbeatRequestMatcher>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  details: Buffer = Buffer.alloc(0);

  String(): string {
    throw "implement me";
  }

  Matches(x: unknown): boolean {
    if (!(x instanceof RecordActivityTaskHeartbeatRequest)) {
      return false;
    }

    return Buffer.isBuffer(x.details) && this.details.equals(x.details);
  }

}

export class testActivityDeadline implements RegistryActivityInfo, activity {
  constructor(init?: Partial<testActivityDeadline>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  logger?: Logger;

  d: number = 0;

  async Execute(ctx: Context, input: Buffer): Promise<Buffer> {
    const [d] = ctx.deadline();
    if (d === 0) {
      throw "invalid deadline provided";
    }
    if (this.d !== 0) {
      await selectOne([recvCase(ctx.done())]);
      throw ctx.err();
    }
    return null as unknown as Buffer;
  }

  ActivityType(): internal_ActivityType {
    return { Name: "test", Path: "" };
  }

  GetFunction(): unknown {
      return this.Execute.bind(this);
  }

  GetOptions(): RegisterActivityOptions {
    return {
      DisableAlreadyRegisteredCheck: false,
      EnableAutoHeartbeat: false,
      EnableShortName: false,
      Name: "",
    };
  }

}

export async function registerWorkflows(r: registry): Promise<void> {
  await r.RegisterWorkflowWithOptions(
    helloWorldWorkflowFunc,
    {
      Name: "HelloWorld_Workflow",
      DisableAlreadyRegisteredCheck: false,
      EnableShortName: false,
    },
  );
  await r.RegisterWorkflowWithOptions(
    helloWorldWorkflowCancelFunc,
    {
      Name: "HelloWorld_WorkflowCancel",
      DisableAlreadyRegisteredCheck: false,
      EnableShortName: false,
    },
  );
  await r.RegisterWorkflowWithOptions(
    returnPanicWorkflowFunc,
    {
      Name: "ReturnPanicWorkflow",
      DisableAlreadyRegisteredCheck: false,
      EnableShortName: false,
    },
  );
  await r.RegisterWorkflowWithOptions(
    panicWorkflowFunc,
    {
      Name: "PanicWorkflow",
      DisableAlreadyRegisteredCheck: false,
      EnableShortName: false,
    },
  );
  await r.RegisterWorkflowWithOptions(
    getWorkflowInfoWorkflowFunc,
    {
      Name: "GetWorkflowInfoWorkflow",
      DisableAlreadyRegisteredCheck: false,
      EnableShortName: false,
    },
  );
  await r.RegisterWorkflowWithOptions(
    querySignalWorkflowFunc,
    {
      Name: "QuerySignalWorkflow",
      DisableAlreadyRegisteredCheck: false,
      EnableShortName: false,
    },
  );
  await r.RegisterActivityWithOptions(
    greeterActivityFunc,
    {
      Name: "Greeter_Activity",
      DisableAlreadyRegisteredCheck: false,
      EnableAutoHeartbeat: false,
      EnableShortName: false,
    },
  );
  await r.RegisterWorkflowWithOptions(
    binaryChecksumWorkflowFunc,
    {
      Name: "BinaryChecksumWorkflow",
      DisableAlreadyRegisteredCheck: false,
      EnableShortName: false,
    },
  );
}

export function returnPanicWorkflowFunc(ctx: internal_Context, input: Buffer): Error | null {
	return newPanicError("panicError", "stackTrace");
}

export function panicWorkflowFunc(ctx: internal_Context, input: Buffer): void {
  throw "panicError";
}

export function getWorkflowInfoWorkflowFunc(ctx: internal_Context, expectedLastCompletionResult: string): WorkflowInfo {
  const result = GetWorkflowInfo(ctx);
  const lastCompletionResult = { value: "" };
  getDefaultDataConverter().FromData(result.lastCompletionResult, lastCompletionResult);
  if (lastCompletionResult.value !== expectedLastCompletionResult) {
    throw new Error("lastCompletionResult is not " + expectedLastCompletionResult);
  }
  return result;
}

export async function TestTaskHandlersTestSuite(): Promise<void> {
  new TaskHandlersTestSuite({
    Suite: new GoTestifySuite(),
    registry: await newRegistry(),
  });
}

export function createTestEventWorkflowExecutionCompleted(eventID: number, attr: shared_IWorkflowExecutionCompletedEventAttributes): shared_IHistoryEvent {
    return new shared_HistoryEvent({
        eventId: new Int64(eventID),
        eventType: EventTypePtr(EventType.WorkflowExecutionCompleted),
        workflowExecutionCompletedEventAttributes: attr
    });
}

export function createTestEventWorkflowExecutionContinuedAsNew(eventID: number, attr: shared_IWorkflowExecutionContinuedAsNewEventAttributes | undefined): shared_IHistoryEvent {
    return new shared_HistoryEvent({
        eventId: new Int64(eventID),
        eventType: EventTypePtr(EventType.WorkflowExecutionContinuedAsNew),
        workflowExecutionContinuedAsNewEventAttributes: attr
    });
}

export function createTestEventWorkflowExecutionStarted(eventID: number, attr: shared_IWorkflowExecutionStartedEventAttributes): shared_IHistoryEvent {
    return new shared_HistoryEvent({
        eventId: new Int64(eventID),
        eventType: EventTypePtr(EventType.WorkflowExecutionStarted),
        workflowExecutionStartedEventAttributes: attr,
    });
}

export function createTestEventLocalActivity(eventID: number, attr: shared_IMarkerRecordedEventAttributes): shared_IHistoryEvent {
    return new shared_HistoryEvent({
        eventId: new Int64(eventID),
        eventType: EventTypePtr(EventType.MarkerRecorded),
        markerRecordedEventAttributes: attr,
    });
}

export function createTestEventActivityTaskScheduled(eventID: number, attr: shared_IActivityTaskScheduledEventAttributes): shared_IHistoryEvent {
    return new shared_HistoryEvent({
        eventId: Int64Ptr(eventID)!,
        eventType: EventTypePtr(EventType.ActivityTaskScheduled),
        activityTaskScheduledEventAttributes: attr as shared_ActivityTaskScheduledEventAttributes,
    });
}

export function createTestEventActivityTaskStarted(eventID: number, attr: shared_IActivityTaskStartedEventAttributes): shared_IHistoryEvent {
    return new shared_HistoryEvent({
        eventId: new Int64(eventID),
        eventType: EventTypePtr(EventType.ActivityTaskStarted),
        activityTaskStartedEventAttributes: new shared_ActivityTaskStartedEventAttributes(attr)
    });
}

export function createTestEventActivityTaskCompleted(eventID: number, attr: shared_IActivityTaskCompletedEventAttributes): shared_IHistoryEvent {
    return new shared_HistoryEvent({
        eventId: new Int64(eventID),
        eventType: EventTypePtr(EventType.ActivityTaskCompleted),
        activityTaskCompletedEventAttributes: attr
    });
}

export function createTestEventActivityTaskTimedOut(eventID: number, attr: shared_IActivityTaskTimedOutEventAttributes): shared_IHistoryEvent {
    return new shared_HistoryEvent({
        eventId: new Int64(eventID),
        eventType: EventTypePtr(EventType.ActivityTaskTimedOut),
        activityTaskTimedOutEventAttributes: attr
    });
}

export function createTestEventDecisionTaskScheduled(eventID: number, attr: shared_IDecisionTaskScheduledEventAttributes): shared_IHistoryEvent {
    return new shared_HistoryEvent({
        eventId: new Int64(eventID),
        eventType: EventTypePtr(EventType.DecisionTaskScheduled),
        decisionTaskScheduledEventAttributes: attr
    });
}

export function createTestEventDecisionTaskStarted(eventID: number): shared_IHistoryEvent {
    return new shared_HistoryEvent({
        eventId: Int64Ptr(eventID)!,
        eventType: EventTypePtr(EventType.DecisionTaskStarted),
    });
}

export function createTestEventWorkflowExecutionSignaled(eventID: number, signalName: string): shared_IHistoryEvent {
    return createTestEventWorkflowExecutionSignaledWithPayload(eventID, signalName, undefined);
}

export function createTestEventWorkflowExecutionSignaledWithPayload(eventID: number, signalName: string, payload: Buffer | undefined): shared_IHistoryEvent {
    return new shared_HistoryEvent({
        eventId: new Int64(eventID),
        eventType: EventTypePtr(EventType.WorkflowExecutionSignaled),
        workflowExecutionSignaledEventAttributes: new shared_WorkflowExecutionSignaledEventAttributes({
            signalName: StringPtr(signalName)!,
            input: payload,
            identity: StringPtr("test-identity")!
        })
    });
}

export function createTestEventDecisionTaskCompleted(eventID: number, attr: shared_IDecisionTaskCompletedEventAttributes): shared_IHistoryEvent {
    return new shared_HistoryEvent({
        eventId: Int64Ptr(eventID)!,
        eventType: EventTypePtr(EventType.DecisionTaskCompleted),
        decisionTaskCompletedEventAttributes: attr
    });
}

export function createTestEventDecisionTaskFailed(eventID: number, attr: shared_IDecisionTaskFailedEventAttributes): shared_IHistoryEvent {
    return new shared_HistoryEvent({
        eventId: new Int64(Int64Ptr(eventID)!),
        eventType: EventTypePtr(EventType.DecisionTaskFailed),
        decisionTaskFailedEventAttributes: attr
    });
}

export function createTestEventSignalExternalWorkflowExecutionFailed(eventID: number, attr: shared_ISignalExternalWorkflowExecutionFailedEventAttributes): shared_IHistoryEvent {
    return new shared_HistoryEvent({
        eventId: Int64Ptr(eventID)!,
        eventType: EventTypePtr(EventType.SignalExternalWorkflowExecutionFailed),
        signalExternalWorkflowExecutionFailedEventAttributes: attr,
    });
}

export async function createWorkflowTask(events: shared_IHistoryEvent[] | undefined, previousStartEventID: number, workflowName: string): Promise<shared_IPollForDecisionTaskResponse> {
    return await createWorkflowTaskWithQueries(events ?? [], previousStartEventID, workflowName, undefined);
}

export async function createWorkflowTaskWithQueries(events: shared_IHistoryEvent[], previousStartEventID: number, workflowName: string, queries: Record<string, shared_IWorkflowQuery> | undefined): Promise<shared_IPollForDecisionTaskResponse> {
    return new shared_PollForDecisionTaskResponse({
        previousStartedEventId: new Int64(previousStartEventID),
        workflowType: workflowTypePtr({ Name: workflowName, Path: "" }),
        history: new shared_History({ events: events.slice() }),
        workflowExecution: new shared_WorkflowExecution({
            workflowId: StringPtr("fake-workflow-id"),
            runId: StringPtr(globalThis.crypto.randomUUID()),
        }),
        queries: queries === undefined ? undefined : new Map(Object.entries(queries)),
    });
}

export async function createQueryTask(events: shared_IHistoryEvent[], previousStartEventID: number, workflowName: string, queryType: string): Promise<shared_IPollForDecisionTaskResponse> {
    const task = await createWorkflowTask(events, previousStartEventID, workflowName);
    task.query = new shared_WorkflowQuery({
        queryType: StringPtr(queryType),
    });
    return task;
}

export function createTestEventTimerStarted(eventID: number, id: number): shared_IHistoryEvent {
    const timerID = String(id);
    const attr = new shared_TimerStartedEventAttributes({
        timerId: StringPtr(timerID),
        startToFireTimeoutSeconds: undefined,
        decisionTaskCompletedEventId: undefined
    });
    return new shared_HistoryEvent({
        eventId: new Int64(eventID),
        eventType: EventTypePtr(EventType.TimerStarted),
        timerStartedEventAttributes: attr
    });
}

export function createTestEventTimerFired(eventID: number, id: number): shared_IHistoryEvent {
    const timerID = String(id);
    const attr = new shared_TimerFiredEventAttributes({
        timerId: StringPtr(timerID)!,
    });

    return new shared_HistoryEvent({
        eventId: new Int64(Int64Ptr(eventID)!),
        eventType: EventTypePtr(EventType.TimerFired),
        timerFiredEventAttributes: attr,
    });
}

export function findLogField(entry: GoObservedLogEntry, fieldName: string): Record<string, unknown> | undefined {
    const fields = entry.ContextMap();
    for (const [key, value] of Object.entries(fields)) {
        if (key === fieldName) {
            return { [key]: value };
        }
    }
    return undefined;
}

/**
 * a regrettably-hacky func to use goleak to count leaking goroutines.
 * ideally there will be a structured way to do this in the future, rather than string parsing
 */
export function countLeaks(leaks: Error | null): number {
	if (leaks == null) {
		return 0;
	}
	return leaks.message.split("on top of the stack").length - 1;
}

export function Test_NonDeterministicCheck(): void {
	// @go-unlowerable: missing target API — DecisionType_Values and EventType_Values are not provided
}

export function Test_IsDecisionMatchEvent_UpsertWorkflowSearchAttributes(): void {
    const diType = DecisionType.UpsertWorkflowSearchAttributes;
    const eType = EventType.UpsertWorkflowSearchAttributes;
    let strictMode = false;

    let testCases: {
        name: string;
        decision: shared_Decision;
        event: shared_HistoryEvent;
        expected: boolean;
    }[] = [
        {
            name: 'event type not match',
            decision: new shared_Decision({
                decisionType: diType,
                upsertWorkflowSearchAttributesDecisionAttributes:
                    new shared_UpsertWorkflowSearchAttributesDecisionAttributes({
                        searchAttributes: new shared_SearchAttributes({}),
                    }),
            }),
            event: new shared_HistoryEvent({}),
            expected: false,
        },
        {
            name: 'attributes not match',
            decision: new shared_Decision({
                decisionType: diType,
                upsertWorkflowSearchAttributesDecisionAttributes:
                    new shared_UpsertWorkflowSearchAttributesDecisionAttributes({
                        searchAttributes: new shared_SearchAttributes({}),
                    }),
            }),
            event: new shared_HistoryEvent({
                eventType: eType,
                upsertWorkflowSearchAttributesEventAttributes:
                    new shared_UpsertWorkflowSearchAttributesEventAttributes({}),
            }),
            expected: true,
        },
        {
            name: 'attributes match',
            decision: new shared_Decision({
                decisionType: diType,
                upsertWorkflowSearchAttributesDecisionAttributes:
                    new shared_UpsertWorkflowSearchAttributesDecisionAttributes({
                        searchAttributes: new shared_SearchAttributes({}),
                    }),
            }),
            event: new shared_HistoryEvent({
                eventType: eType,
                upsertWorkflowSearchAttributesEventAttributes:
                    new shared_UpsertWorkflowSearchAttributesEventAttributes({
                        searchAttributes: new shared_SearchAttributes({}),
                    }),
            }),
            expected: true,
        },
    ];

    for (const testCase of testCases) {
        expect(isDecisionMatchEvent(testCase.decision, testCase.event, strictMode)).toEqual(testCase.expected);
    }

    strictMode = true;

    testCases = [
        {
            name: 'attributes not match',
            decision: new shared_Decision({
                decisionType: diType,
                upsertWorkflowSearchAttributesDecisionAttributes:
                    new shared_UpsertWorkflowSearchAttributesDecisionAttributes({
                        searchAttributes: new shared_SearchAttributes({}),
                    }),
            }),
            event: new shared_HistoryEvent({
                eventType: eType,
                upsertWorkflowSearchAttributesEventAttributes:
                    new shared_UpsertWorkflowSearchAttributesEventAttributes({}),
            }),
            expected: false,
        },
    ];

    for (const testCase of testCases) {
        expect(isDecisionMatchEvent(testCase.decision, testCase.event, strictMode)).toEqual(testCase.expected);
    }
}

export function Test_IsSearchAttributesMatched(): void {
    const testCases: {
        name: string;
        lhs: shared_SearchAttributes | undefined;
        rhs: shared_SearchAttributes | undefined;
        expected: boolean;
    }[] = [
        {
            name: "both nil",
            lhs: undefined,
            rhs: undefined,
            expected: true,
        },
        {
            name: "left nil",
            lhs: undefined,
            rhs: new shared_SearchAttributes({}),
            expected: false,
        },
        {
            name: "right nil",
            lhs: new shared_SearchAttributes({}),
            rhs: undefined,
            expected: false,
        },
        {
            name: "not match",
            lhs: new shared_SearchAttributes({
                indexedFields: new Map([
                    ["key1", Buffer.from("1")],
                    ["key2", Buffer.from("abc")],
                ]),
            }),
            rhs: new shared_SearchAttributes({}),
            expected: false,
        },
        {
            name: "match",
            lhs: new shared_SearchAttributes({
                indexedFields: new Map([
                    ["key1", Buffer.from("1")],
                    ["key2", Buffer.from("abc")],
                ]),
            }),
            rhs: new shared_SearchAttributes({
                indexedFields: new Map([
                    ["key2", Buffer.from("abc")],
                    ["key1", Buffer.from("1")],
                ]),
            }),
            expected: true,
        },
    ];

    for (const testCase of testCases) {
        expect(isSearchAttributesMatched(testCase.lhs, testCase.rhs)).toEqual(testCase.expected);
    }
}

export function Test__GetWorkflowStartedEvent(): void {
    const wfStartedEvent = createTestEventWorkflowExecutionStarted(
        1,
        new shared_WorkflowExecutionStartedEventAttributes({
            taskList: new shared_TaskList({ name: StringPtr("tl1") }),
        }),
    );
    const h = new history({
        currentIndex: 0,
        lastEventID: 0,
        loadedEvents: [],
        nextEventID: 0,
        workflowTask: new workflowTask({
            task: {
                history: {
                    events: [wfStartedEvent],
                },
            },
        }),
    });
    const result = h.GetWorkflowStartedEvent();
    expect(result).toEqual(wfStartedEvent);

    const emptyHistory = new history({
        currentIndex: 0,
        lastEventID: 0,
        loadedEvents: [],
        nextEventID: 0,
        workflowTask: new workflowTask({
            task: {
                history: {},
            },
        }),
    });
    let emptyResult: ReturnType<typeof emptyHistory.GetWorkflowStartedEvent> | undefined;
    let emptyError: unknown;
    try {
        emptyResult = emptyHistory.GetWorkflowStartedEvent();
    } catch (err) {
        emptyError = err;
    }
    expect(emptyError).toThrow("unable to find WorkflowExecutionStartedEventAttributes");
    expect(emptyResult).toBeUndefined();
}

export function Test__verifyAllEventsProcessed(): void {
	const testCases: {
		name: string;
		lastEventID: number;
		nextEventID: number;
		Message: string;
	}[] = [
		{
			name: "error",
			lastEventID: 1,
			nextEventID: 1,
			Message: "history_events: premature end of stream",
		},
		{
			name: "warn",
			lastEventID: 1,
			nextEventID: 3,
			Message: "history_events: processed events past the expected lastEventID",
		},
		{
			name: "success",
			lastEventID: 1,
			nextEventID: 2,
			Message: "",
		},
	];

	for (const testCase of testCases) {
		const [core, logs] = ObserverCore(WarnLevel);
		const logger = LoggerFromCore(core);
		const h = new history({
			lastEventID: testCase.lastEventID,
			nextEventID: testCase.nextEventID,
			eventsHandler: new workflowExecutionEventHandlerImpl({ logger }),
		});

		if (testCase.name === "error") {
			expect(() => h.verifyAllEventsProcessed()).toThrow(testCase.Message);
		} else if (testCase.name === "warn") {
			const warnLogs = logs.FilterMessage(testCase.Message);
			expect(warnLogs.All()).toHaveLength(1);
		} else {
			h.verifyAllEventsProcessed();
		}
	}
}

export function Test__workflowCategorizedByTimeout(): void {
  const testCases: { timeout: number; expectedCategory: string }[] = [
    { timeout: 1, expectedCategory: "instant" },
    { timeout: 1000, expectedCategory: "short" },
    { timeout: 2000, expectedCategory: "intermediate" },
    { timeout: 30000, expectedCategory: "long" },
  ];

  for (const tt of testCases) {
    const wfContext = new workflowExecutionContextImpl({
      workflowInfo: new WorkflowInfo({
        Attempt: 0,
        DecisionStartedEventID: 0,
        Domain: "",
        ExecutionStartToCloseTimeoutSeconds: tt.timeout,
        HistoryBytesServer: 0,
        HistoryCount: 0,
        OriginalRunId: "",
        TaskListName: "",
        TaskStartToCloseTimeoutSeconds: 0,
        TotalHistoryBytes: 0,
        WorkflowExecution: { ID: "", RunID: "" },
        WorkflowType: { Name: "", Path: "" },
        lastCompletionResult: Buffer.alloc(0),
      }),
    });
    expect(workflowCategorizedByTimeout(wfContext)).toEqual(tt.expectedCategory);
  }
}

export function Test__getRetryBackoffWithNowTime(): void {
  const now = Date.now() * 1_000_000;
  const testCases: {
    name: string;
    maxAttempts: number;
    ExpInterval: number;
    result: number;
    attempt: number;
    errReason: string;
    expireTime: number;
    initialInterval: number;
    maxInterval: number;
  }[] = [
    {
      name: "no max attempts or expiration interval set",
      maxAttempts: 0,
      ExpInterval: 0,
      result: noRetryBackoff,
      attempt: 0,
      errReason: "",
      expireTime: 0,
      initialInterval: 0,
      maxInterval: 0,
    },
    {
      name: "max attempts done",
      maxAttempts: 5,
      ExpInterval: 0,
      result: noRetryBackoff,
      attempt: 5,
      errReason: "",
      expireTime: 0,
      initialInterval: 0,
      maxInterval: 0,
    },
    {
      name: "non retryable error",
      maxAttempts: 5,
      ExpInterval: 0,
      result: noRetryBackoff,
      attempt: 2,
      errReason: "bad request",
      expireTime: 0,
      initialInterval: Minute,
      maxInterval: Minute,
    },
    {
      name: "fallback to max interval when calculated backoff is 0",
      maxAttempts: 5,
      ExpInterval: 0,
      result: Minute,
      attempt: 2,
      errReason: "",
      expireTime: 0,
      initialInterval: 0,
      maxInterval: Minute,
    },
    {
      name: "fallback to no retry backoff when calculated backoff is 0 and max interval is not set",
      maxAttempts: 5,
      ExpInterval: 0,
      result: noRetryBackoff,
      attempt: 2,
      errReason: "",
      expireTime: 0,
      initialInterval: 0,
      maxInterval: 0,
    },
    {
      name: "expiry time reached",
      maxAttempts: 5,
      ExpInterval: 0,
      result: noRetryBackoff,
      attempt: 2,
      errReason: "",
      expireTime: now + Second,
      initialInterval: Minute,
      maxInterval: Minute,
    },
    {
      name: "retry after backoff",
      maxAttempts: 5,
      ExpInterval: 0,
      result: Minute,
      attempt: 2,
      errReason: "timeout",
      expireTime: 0,
      initialInterval: Minute,
      maxInterval: Minute,
    },
  ];

  for (const tt of testCases) {
    const policy: internal_RetryPolicy = {
      MaximumAttempts: tt.maxAttempts,
      ExpirationInterval: tt.ExpInterval,
      BackoffCoefficient: 2,
      NonRetriableErrorReasons: ["bad request"],
      MaximumInterval: tt.maxInterval,
      InitialInterval: tt.initialInterval,
    };
    expect(
      getRetryBackoffWithNowTime(
        policy,
        tt.attempt,
        tt.errReason,
        now,
        tt.expireTime,
      ),
    ).toEqual(tt.result);
  }
}

export const testDomain = "test-domain";

export let testWorkflowTaskTasklist = "tl1";
