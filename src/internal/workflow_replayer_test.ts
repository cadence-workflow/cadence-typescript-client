import { DecisionTaskFailedEventAttributes as shared_DecisionTaskFailedEventAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/DecisionTaskFailedEventAttributes.js';
import { ActivityType as shared_ActivityType } from '../generated/thrift/cadence-idl/com/uber/cadence/ActivityType.js';
import { ActivityTaskStartedEventAttributes as shared_ActivityTaskStartedEventAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/ActivityTaskStartedEventAttributes.js';
import { ActivityTaskScheduledEventAttributes as shared_ActivityTaskScheduledEventAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/ActivityTaskScheduledEventAttributes.js';
import { ActivityTaskCompletedEventAttributes as shared_ActivityTaskCompletedEventAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/ActivityTaskCompletedEventAttributes.js';
import { WorkflowType as shared_WorkflowType } from '../generated/thrift/cadence-idl/com/uber/cadence/WorkflowType.js';
import { WorkflowExecutionStartedEventAttributes as shared_WorkflowExecutionStartedEventAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/WorkflowExecutionStartedEventAttributes.js';
import { WorkflowExecutionCompletedEventAttributes as shared_WorkflowExecutionCompletedEventAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/WorkflowExecutionCompletedEventAttributes.js';
import { MarkerRecordedEventAttributes as shared_MarkerRecordedEventAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/MarkerRecordedEventAttributes.js';
import { DecisionTaskScheduledEventAttributes as shared_DecisionTaskScheduledEventAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/DecisionTaskScheduledEventAttributes.js';
import { DecisionTaskCompletedEventAttributes as shared_DecisionTaskCompletedEventAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/DecisionTaskCompletedEventAttributes.js';
import { Int64 } from '@creditkarma/thrift-server-core';
import { Header as shared_Header } from '../generated/thrift/cadence-idl/com/uber/cadence/Header.js';
import { localActivityMarkerData } from './internal_event_handlers.js';
import { getDefaultDataConverter } from './encoded.js';
import { localActivityMarkerName } from './internal_decision_state_machine.js';
// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { Logger } from 'winston';
import { internal_Context } from './context.js';
import { internal_WorkflowReplayer, NewWorkflowReplayerWithOptions } from './workflow_replayer.js';
import { Context } from './runtime/context.js';
import { Minute, Second } from './runtime/time.js';
import { GoTestifySuite } from './runtime/testify_suite.js';
import { expect } from 'vitest';
import { StringPtr as common_StringPtr, StringPtr } from './common/convert.js';
import { IHistory as shared_IHistory, History as shared_History } from '../generated/thrift/cadence-idl/com/uber/cadence/History.js';
import { TaskListKind as shared_TaskListKind } from '../generated/thrift/cadence-idl/com/uber/cadence/TaskListKind.js';
import { testActivityResult, args, testActivityByteArgs, testActivityMultipleArgs, testActivityNoContextArg, testActivityNoResult, testActivityReturnByteArray, testActivityReturnEmptyString, testActivityReturnEmptyStruct, testActivityReturnInt, testActivityReturnNilStructPtr, testActivityReturnNilStructPtrPtr, testActivityReturnString, testActivityReturnStructPtr, testActivityReturnStructPtrPtr, getTestLogger, testEncodeFunctionArgs } from './internal_worker_test.js';
import { ExecuteLocalActivity, WithLocalActivityOptions, ExecuteActivity, GetLogger, WithActivityOptions, ExecuteChildWorkflow, GetWorkflowInfo, WithChildWorkflowOptions, internal_ChildWorkflowOptions } from './workflow.js';
import { TaskList } from '../generated/thrift/cadence-idl/com/uber/cadence/TaskList.js';
import { internal_LocalActivityOptions, internal_ActivityOptions } from './activity.js';
import { Ref } from './runtime/ref.js';
import { NewStringMapPropagator, testHeader, activityID } from './internal_workflow_client_test.js';
import { EventType } from '../generated/thrift/cadence-idl/com/uber/cadence/EventType.js';
import { createTestEventWorkflowExecutionContinuedAsNew, createTestEventDecisionTaskCompleted, createTestEventDecisionTaskScheduled, createTestEventDecisionTaskStarted, createTestEventLocalActivity, createTestEventWorkflowExecutionCompleted, createTestEventWorkflowExecutionStarted, createTestEventActivityTaskCompleted, createTestEventActivityTaskScheduled, createTestEventActivityTaskStarted, createTestEventDecisionTaskFailed } from './internal_task_handlers_test.js';
import { getFunctionName, encodeArg } from './internal_worker.js';
import { testActivityFunction } from './registry_test.js';

export class workflowReplayerSuite {
  constructor(init?: Partial<workflowReplayerSuite>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  Assertions: GoTestifySuite = new GoTestifySuite();

  Suite: GoTestifySuite = new GoTestifySuite();

  replayer?: internal_WorkflowReplayer;

  logger?: Logger;

  T = (...args: Parameters<GoTestifySuite['T']>): ReturnType<GoTestifySuite['T']> => this.Assertions.T(...args);

  SetT = (...args: Parameters<GoTestifySuite['SetT']>): ReturnType<GoTestifySuite['SetT']> => this.Assertions.SetT(...args);

  Assert = (...args: Parameters<GoTestifySuite['Assert']>): ReturnType<GoTestifySuite['Assert']> => this.Assertions.Assert(...args);

  Require = (...args: Parameters<GoTestifySuite['Require']>): ReturnType<GoTestifySuite['Require']> => this.Assertions.Require(...args);

  Run = (...args: Parameters<GoTestifySuite['Run']>): ReturnType<GoTestifySuite['Run']> => this.Assertions.Run(...args);

  Equal = (...args: Parameters<GoTestifySuite['Equal']>): ReturnType<GoTestifySuite['Equal']> => this.Assertions.Equal(...args);

  NotEqual = (...args: Parameters<GoTestifySuite['NotEqual']>): ReturnType<GoTestifySuite['NotEqual']> => this.Assertions.NotEqual(...args);

  EqualValues = (...args: Parameters<GoTestifySuite['EqualValues']>): ReturnType<GoTestifySuite['EqualValues']> => this.Assertions.EqualValues(...args);

  Exactly = (...args: Parameters<GoTestifySuite['Exactly']>): ReturnType<GoTestifySuite['Exactly']> => this.Assertions.Exactly(...args);

  Same = (...args: Parameters<GoTestifySuite['Same']>): ReturnType<GoTestifySuite['Same']> => this.Assertions.Same(...args);

  NotSame = (...args: Parameters<GoTestifySuite['NotSame']>): ReturnType<GoTestifySuite['NotSame']> => this.Assertions.NotSame(...args);

  True = (...args: Parameters<GoTestifySuite['True']>): ReturnType<GoTestifySuite['True']> => this.Assertions.True(...args);

  False = (...args: Parameters<GoTestifySuite['False']>): ReturnType<GoTestifySuite['False']> => this.Assertions.False(...args);

  Nil = (...args: Parameters<GoTestifySuite['Nil']>): ReturnType<GoTestifySuite['Nil']> => this.Assertions.Nil(...args);

  NotNil = (...args: Parameters<GoTestifySuite['NotNil']>): ReturnType<GoTestifySuite['NotNil']> => this.Assertions.NotNil(...args);

  Zero = (...args: Parameters<GoTestifySuite['Zero']>): ReturnType<GoTestifySuite['Zero']> => this.Assertions.Zero(...args);

  NotZero = (...args: Parameters<GoTestifySuite['NotZero']>): ReturnType<GoTestifySuite['NotZero']> => this.Assertions.NotZero(...args);

  Error = (...args: Parameters<GoTestifySuite['Error']>): ReturnType<GoTestifySuite['Error']> => this.Assertions.Error(...args);

  NoError = (...args: Parameters<GoTestifySuite['NoError']>): ReturnType<GoTestifySuite['NoError']> => this.Assertions.NoError(...args);

  EqualError = (...args: Parameters<GoTestifySuite['EqualError']>): ReturnType<GoTestifySuite['EqualError']> => this.Assertions.EqualError(...args);

  ErrorContains = (...args: Parameters<GoTestifySuite['ErrorContains']>): ReturnType<GoTestifySuite['ErrorContains']> => this.Assertions.ErrorContains(...args);

  ErrorIs = (...args: Parameters<GoTestifySuite['ErrorIs']>): ReturnType<GoTestifySuite['ErrorIs']> => this.Assertions.ErrorIs(...args);

  NotErrorIs = (...args: Parameters<GoTestifySuite['NotErrorIs']>): ReturnType<GoTestifySuite['NotErrorIs']> => this.Assertions.NotErrorIs(...args);

  Len = (...args: Parameters<GoTestifySuite['Len']>): ReturnType<GoTestifySuite['Len']> => this.Assertions.Len(...args);

  Empty = (...args: Parameters<GoTestifySuite['Empty']>): ReturnType<GoTestifySuite['Empty']> => this.Assertions.Empty(...args);

  NotEmpty = (...args: Parameters<GoTestifySuite['NotEmpty']>): ReturnType<GoTestifySuite['NotEmpty']> => this.Assertions.NotEmpty(...args);

  Contains = (...args: Parameters<GoTestifySuite['Contains']>): ReturnType<GoTestifySuite['Contains']> => this.Assertions.Contains(...args);

  NotContains = (...args: Parameters<GoTestifySuite['NotContains']>): ReturnType<GoTestifySuite['NotContains']> => this.Assertions.NotContains(...args);

  ElementsMatch = (...args: Parameters<GoTestifySuite['ElementsMatch']>): ReturnType<GoTestifySuite['ElementsMatch']> => this.Assertions.ElementsMatch(...args);

  Subset = (...args: Parameters<GoTestifySuite['Subset']>): ReturnType<GoTestifySuite['Subset']> => this.Assertions.Subset(...args);

  Greater = (...args: Parameters<GoTestifySuite['Greater']>): ReturnType<GoTestifySuite['Greater']> => this.Assertions.Greater(...args);

  GreaterOrEqual = (...args: Parameters<GoTestifySuite['GreaterOrEqual']>): ReturnType<GoTestifySuite['GreaterOrEqual']> => this.Assertions.GreaterOrEqual(...args);

  Less = (...args: Parameters<GoTestifySuite['Less']>): ReturnType<GoTestifySuite['Less']> => this.Assertions.Less(...args);

  LessOrEqual = (...args: Parameters<GoTestifySuite['LessOrEqual']>): ReturnType<GoTestifySuite['LessOrEqual']> => this.Assertions.LessOrEqual(...args);

  InDelta = (...args: Parameters<GoTestifySuite['InDelta']>): ReturnType<GoTestifySuite['InDelta']> => this.Assertions.InDelta(...args);

  Panics = (...args: Parameters<GoTestifySuite['Panics']>): ReturnType<GoTestifySuite['Panics']> => this.Assertions.Panics(...args);

  NotPanics = (...args: Parameters<GoTestifySuite['NotPanics']>): ReturnType<GoTestifySuite['NotPanics']> => this.Assertions.NotPanics(...args);

  IsType = (...args: Parameters<GoTestifySuite['IsType']>): ReturnType<GoTestifySuite['IsType']> => this.Assertions.IsType(...args);

  Regexp = (...args: Parameters<GoTestifySuite['Regexp']>): ReturnType<GoTestifySuite['Regexp']> => this.Assertions.Regexp(...args);

  JSONEq = (...args: Parameters<GoTestifySuite['JSONEq']>): ReturnType<GoTestifySuite['JSONEq']> => this.Assertions.JSONEq(...args);

  WithinDuration = (...args: Parameters<GoTestifySuite['WithinDuration']>): ReturnType<GoTestifySuite['WithinDuration']> => this.Assertions.WithinDuration(...args);

  Fail = (...args: Parameters<GoTestifySuite['Fail']>): ReturnType<GoTestifySuite['Fail']> => this.Assertions.Fail(...args);

  FailNow = (...args: Parameters<GoTestifySuite['FailNow']>): ReturnType<GoTestifySuite['FailNow']> => this.Assertions.FailNow(...args);

  async SetupTest(): Promise<void> {
    this.logger = getTestLogger();

    this.replayer = await NewWorkflowReplayerWithOptions({
      ContextPropagators: [await NewStringMapPropagator([testHeader])],
      FeatureFlags: {
        WorkflowExecutionAlreadyCompletedErrorEnabled: false,
        AutoforwardingEnabled: false,
        PollerAutoScalerEnabled: false,
        EphemeralTaskListsEnabled: false,
        MetricEmitMode: 0,
      },
    });

    await this.replayer!.RegisterWorkflow(testReplayWorkflow);
    await this.replayer!.RegisterWorkflow(testReplayWorkflowLocalActivity);
    await this.replayer!.RegisterWorkflow(testReplayWorkflowContextPropagator);
    await this.replayer!.RegisterWorkflow(testReplayWorkflowFromFile);
    await this.replayer!.RegisterWorkflow(testReplayWorkflowFromFileParent);

    const workflow = new localActivitiesCallingOptionsWorkflow({ t: this.T() });
    await this.replayer!.RegisterWorkflow(workflow.Execute.bind(workflow));
  }

  async TestReplayWorkflowHistory_Full(): Promise<void> {
    await this.replayer!.ReplayWorkflowHistory(this.logger, getTestReplayWorkflowFullHistory());
    expect(null).toBeNull();
  }

  async TestReplayWorkflowHistory_Full_ResultMisMatch(): Promise<void> {
    const fullHistory = getTestReplayWorkflowFullHistory();
    const completedEvent = fullHistory.events![fullHistory.events!.length - 1]!;
    expect(completedEvent.eventType ?? 0).toEqual(EventType.WorkflowExecutionCompleted);
    completedEvent.workflowExecutionCompletedEventAttributes!.result = Buffer.from("some random result");

    let err: Error | null = null;
    try {
      await this.replayer!.ReplayWorkflowHistory(this.logger, fullHistory);
    } catch (caught) {
      if (!(caught instanceof Error)) throw caught;
      err = caught;
    }
    expect(err).not.toBeNull();
  }

  async TestReplayWorkflowHistory_Full_ContinueAsNew(): Promise<void> {
    const fullHistory = getTestReplayWorkflowFullHistory();
    const completedEventIdx = fullHistory.events!.length - 1;
    this.Equal(
      EventType.WorkflowExecutionCompleted,
      fullHistory.events![completedEventIdx]!.eventType,
    );
    fullHistory.events![completedEventIdx] = createTestEventWorkflowExecutionContinuedAsNew(
      completedEventIdx + 1,
      undefined,
    );

    await this.replayer!.ReplayWorkflowHistory(this.logger!, fullHistory);
  }

  async TestReplayWorkflowHistory_Partial_WithDecisionEvents(): Promise<void> {
    await this.replayer!.ReplayWorkflowHistory(
      this.logger!,
      getTestReplayWorkflowPartialHistoryWithDecisionEvents(),
    );
  }

  async TestReplayWorkflowHistory_Partial_NoDecisionEvents(): Promise<void> {
    const history = getTestReplayWorkflowPartialHistoryNoDecisionEvents();
    let err: Error | null = null;
    try {
      await this.replayer!.ReplayWorkflowHistory(this.logger!, history);
    } catch (caught) {
      if (!(caught instanceof Error)) throw caught;
      err = caught;
    }
    expect(err).toBeNull();
  }

  async TestReplayWorkflowHistory_LocalActivity(): Promise<void> {
    await this.replayer!.ReplayWorkflowHistory(
      this.logger,
      getTestReplayWorkflowLocalActivityHistory(),
    );
  }

  async TestReplayWorkflowHistory_LocalActivity_Result_Mismatch(): Promise<void> {
    let err: Error | null = null;
    try {
      await this.replayer!.ReplayWorkflowHistory(
        this.logger!,
        getTestReplayWorkflowLocalActivityResultMismatchHistory()
      );
    } catch (caught) {
      if (!(caught instanceof Error)) throw caught;
      err = caught;
    }
    this.Error(err);
  }

  async TestReplayWorkflowHistory_LocalActivity_Activity_Type_Mismatch(): Promise<void> {
    try {
      await this.replayer!.ReplayWorkflowHistory(
        this.logger!,
        getTestReplayWorkflowLocalActivityTypeMismatchHistory()
      );
    } catch (err) {
      if (!(err instanceof Error)) throw err;
      this.Error(err);
    }
  }

  async TestReplayWorkflowHistory_ContextPropagator(): Promise<void> {
    let err: Error | null = null;
    try {
      await this.replayer!.ReplayWorkflowHistory(
        this.logger,
        getTestReplayWorkflowContextPropagatorHistory(),
      );
    } catch (caught) {
      if (!(caught instanceof Error)) throw caught;
      err = caught;
    }
    this.NoError(err);
  }

  async TestReplayWorkflowHistoryFromFileLocalActivities(): Promise<void> {
    let err: Error | null = null;
    try {
      await this.replayer!.ReplayWorkflowHistoryFromJSONFile(this.logger!, "testdata/localActivities.json");
    } catch (caught) {
      if (!(caught instanceof Error)) throw caught;
      err = caught;
    }
    expect(err).toBeNull();
  }

  async TestReplayWorkflowHistoryFromFileParent(): Promise<void> {
    let err: Error | null = null;
    try {
      await this.replayer!.ReplayWorkflowHistoryFromJSONFile(this.logger!, "testdata/parentWF.json");
    } catch (e) {
      if (!(e instanceof Error)) throw e;
      err = e;
    }
    expect(err).toBeNull();
  }

  async TestReplayWorkflowHistoryFromFile(): Promise<void> {
    await this.replayer!.ReplayWorkflowHistoryFromJSONFile(
      this.logger!,
      "testdata/sampleHistory.json",
    );
    expect(null).toBeNull();
  }

  async TestActivityRegistration(): Promise<void> {
    const name = "test-Activity";
    await this.replayer!.RegisterActivityWithOptions(testActivityFunction, {
      Name: name,
      EnableShortName: false,
      DisableAlreadyRegisteredCheck: false,
      EnableAutoHeartbeat: false,
    });

    const activities = await this.replayer!.GetRegisteredActivities();
    const a = activities[0]!.ActivityType().Name;
    this.Equal(name, a);

    const registeredActivities = await this.replayer!.GetRegisteredActivities();
    const fn = registeredActivities[0]!.GetFunction();
    this.Equal("function", typeof fn);
    this.Equal(getFunctionName(testActivityFunction), getFunctionName(fn));
  }

}

export class localActivitiesCallingOptionsWorkflow {
  constructor(init?: Partial<localActivitiesCallingOptionsWorkflow>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  t?: unknown;

  async Execute(ctx: internal_Context, input: Buffer): Promise<Buffer> {
    const ao: internal_LocalActivityOptions = {
      ScheduleToCloseTimeout: Second,
    };
    ctx = WithLocalActivityOptions(ctx, ao);

    await (await ExecuteLocalActivity(ctx, testActivityByteArgs, input)).Get(ctx, null);
    await (await ExecuteLocalActivity(ctx, testActivityMultipleArgs, 2, ["test"], true)).Get(ctx, null);
    await (await ExecuteLocalActivity(ctx, testActivityNoResult, 2, "test")).Get(ctx, null);
    await (await ExecuteLocalActivity(ctx, testActivityNoContextArg, 2, "test")).Get(ctx, null);

    let f = await ExecuteLocalActivity(ctx, testActivityReturnByteArray);
    const rBox: { value: Buffer } = { value: Buffer.alloc(0) };
    await f.Get(ctx, rBox);
    expect(rBox.value).toEqual(Buffer.from("testActivity"));

    f = await ExecuteLocalActivity(ctx, testActivityReturnInt);
    const rIntBox: { value: number } = { value: 0 };
    await f.Get(ctx, rIntBox);
    expect(rIntBox.value).toEqual(5);

    f = await ExecuteLocalActivity(ctx, testActivityReturnString);
    const rStringBox: { value: string } = { value: "" };
    await f.Get(ctx, rStringBox);
    expect(rStringBox.value).toEqual("testActivity");

    f = await ExecuteLocalActivity(ctx, testActivityReturnEmptyString);
    const r2StringBox: { value: string } = { value: "" };
    await f.Get(ctx, r2StringBox);
    expect(r2StringBox.value).toEqual("");

    f = await ExecuteLocalActivity(ctx, testActivityReturnEmptyStruct);
    const r2StructBox: { value: testActivityResult } = { value: { Index: 0 } };
    await f.Get(ctx, r2StructBox);
    expect(r2StructBox.value).toEqual({ Index: 0 });

    f = await ExecuteLocalActivity(ctx, testActivityReturnNilStructPtr);
    const rStructPtr = new Ref<testActivityResult | undefined>(undefined);
    await f.Get(ctx, rStructPtr);
    expect(rStructPtr.value == null).toBe(true);

    f = await ExecuteLocalActivity(ctx, testActivityReturnStructPtr);
    await f.Get(ctx, rStructPtr);
    expect(rStructPtr.value).toEqual({ Index: 10 });

    f = await ExecuteLocalActivity(ctx, testActivityReturnNilStructPtrPtr);
    const rStruct2Ptr = new Ref<Ref<testActivityResult | undefined> | undefined>(undefined);
    await f.Get(ctx, rStruct2Ptr);
    expect(rStruct2Ptr.value == null).toBe(true);

    f = await ExecuteLocalActivity(ctx, testActivityReturnStructPtrPtr);
    await f.Get(ctx, rStruct2Ptr);
    expect(rStruct2Ptr.value?.value).toEqual({ Index: 10 });

    return Buffer.from("Done");
  }

}

export function TestWorkflowReplayerSuite(): void {
  const s = new workflowReplayerSuite();
}

export async function testReplayWorkflow(ctx: internal_Context): Promise<void> {
    const ao = new internal_ActivityOptions({
        ActivityID: "",
        HeartbeatTimeout: 0,
        RetryPolicy: undefined,
        ScheduleToCloseTimeout: 0,
        ScheduleToStartTimeout: Second,
        StartToCloseTimeout: Second,
        TaskList: "",
        WaitForCancellation: false,
    });
    ctx = WithActivityOptions(ctx, ao);
    const future = await ExecuteActivity(ctx, "testActivity");
    try {
        await future.Get(ctx, null);
    } catch (err) {
        if (!(err instanceof Error)) throw err;
        GetLogger(ctx).error("activity failed with error.", err);
        throw "Failed workflow";
    }
}

export async function testReplayWorkflowLocalActivity(ctx: internal_Context): Promise<void> {
	const ao: internal_LocalActivityOptions = {
		ScheduleToCloseTimeout: Second,
	};
	ctx = WithLocalActivityOptions(ctx, ao);
	const future = await ExecuteLocalActivity(ctx, testActivity);
	try {
		await future.Get(ctx, undefined);
	} catch (err) {
		if (!(err instanceof Error)) throw err;
		GetLogger(ctx).error("activity failed with error.", { error: err });
		throw "Failed workflow";
	}
}

export async function testReplayWorkflowContextPropagator(ctx: internal_Context): Promise<void> {
  const value = ctx.Value(testHeader);
  if (typeof value === "string" && value !== "") {
    await testReplayWorkflow(ctx);
    return;
  }

  throw new Error("context propagator is not setup correctly for workflow replayer");
}

export async function testReplayWorkflowFromFile(ctx: internal_Context): Promise<void> {
    const ao = new internal_ActivityOptions({
        ActivityID: "",
        HeartbeatTimeout: 20 * Second,
        ScheduleToCloseTimeout: 0,
        ScheduleToStartTimeout: Minute,
        StartToCloseTimeout: Minute,
        TaskList: "",
        WaitForCancellation: true,
    });
    ctx = WithActivityOptions(ctx, ao);
    const future = await ExecuteActivity(ctx, "testActivityMultipleArgs", 2, "test", true);
    try {
        await future.Get(ctx, null);
    } catch (err) {
        if (!(err instanceof Error)) throw err;
        GetLogger(ctx).error("activity failed with error.", { error: err });
        throw "Failed workflow";
    }
}

export async function testReplayWorkflowFromFileParent(ctx: internal_Context): Promise<void> {
  const execution = GetWorkflowInfo(ctx).WorkflowExecution;
  const childID = `child_workflow:${execution.RunID}`;
  const cwo: internal_ChildWorkflowOptions = {
    Bugports: { StartChildWorkflowsOnCanceledContext: false },
    CronSchedule: "",
    Domain: "",
    ExecutionStartToCloseTimeout: Minute,
    Memo: undefined,
    ParentClosePolicy: 0,
    RetryPolicy: undefined,
    SearchAttributes: undefined,
    TaskList: "",
    TaskStartToCloseTimeout: 0,
    WaitForCancellation: false,
    WorkflowID: childID,
    WorkflowIDReusePolicy: 0,
  };
  ctx = await WithChildWorkflowOptions(ctx, cwo);
  const result = { value: "" };
  const cwf = await ExecuteChildWorkflow(ctx, testReplayWorkflowFromFile);
  const f1 = await cwf.SignalChildWorkflow(ctx, "test-signal", "test-data");
  await f1.Get(ctx, undefined);
  await cwf.Get(ctx, result);
}

export function testActivity(ctx: Context): void {
  return;
}

export function getTestReplayWorkflowFullHistory(): shared_IHistory {
    return new shared_History({
        events: [
            createTestEventWorkflowExecutionStarted(
                1,
                new shared_WorkflowExecutionStartedEventAttributes({
                    workflowType: new shared_WorkflowType({
                        name: StringPtr("go.uber.org/cadence/internal.testReplayWorkflow"),
                    }),
                    taskList: testTaskList,
                    input: testEncodeFunctionArgs(getDefaultDataConverter()),
                }),
            ),
            createTestEventDecisionTaskScheduled(
                2,
                new shared_DecisionTaskScheduledEventAttributes({}),
            ),
            createTestEventDecisionTaskStarted(3),
            createTestEventDecisionTaskCompleted(
                4,
                new shared_DecisionTaskCompletedEventAttributes({}),
            ),
            createTestEventActivityTaskScheduled(
                5,
                new shared_ActivityTaskScheduledEventAttributes({
                    activityId: StringPtr("0"),
                    activityType: new shared_ActivityType({
                        name: StringPtr("testActivity"),
                    }),
                    taskList: testTaskList,
                }),
            ),
            createTestEventActivityTaskStarted(
                6,
                new shared_ActivityTaskStartedEventAttributes({
                    scheduledEventId: new Int64(5),
                }),
            ),
            createTestEventActivityTaskCompleted(
                7,
                new shared_ActivityTaskCompletedEventAttributes({
                    scheduledEventId: new Int64(5),
                    startedEventId: new Int64(6),
                }),
            ),
            createTestEventDecisionTaskScheduled(
                8,
                new shared_DecisionTaskScheduledEventAttributes({}),
            ),
            createTestEventDecisionTaskStarted(9),
            createTestEventDecisionTaskCompleted(
                10,
                new shared_DecisionTaskCompletedEventAttributes({
                    scheduledEventId: new Int64(8),
                    startedEventId: new Int64(9),
                }),
            ),
            createTestEventWorkflowExecutionCompleted(
                11,
                new shared_WorkflowExecutionCompletedEventAttributes({
                    decisionTaskCompletedEventId: new Int64(10),
                }),
            ),
        ],
    });
}

export function getTestReplayWorkflowPartialHistoryWithDecisionEvents(): shared_IHistory {
    return new shared_History({
        events: [
            createTestEventWorkflowExecutionStarted(
                1,
                new shared_WorkflowExecutionStartedEventAttributes({
                    workflowType: new shared_WorkflowType({
                        name: StringPtr("go.uber.org/cadence/internal.testReplayWorkflow")!,
                    }),
                    taskList: testTaskList,
                    input: testEncodeFunctionArgs(getDefaultDataConverter()),
                }),
            ),
            createTestEventDecisionTaskScheduled(
                2,
                new shared_DecisionTaskScheduledEventAttributes({}),
            ),
            createTestEventDecisionTaskStarted(3),
            createTestEventDecisionTaskCompleted(
                4,
                new shared_DecisionTaskCompletedEventAttributes({}),
            ),
            createTestEventActivityTaskScheduled(
                5,
                new shared_ActivityTaskScheduledEventAttributes({
                    activityId: StringPtr("0")!,
                    activityType: new shared_ActivityType({
                        name: StringPtr("testActivity-fm")!,
                    }),
                    taskList: testTaskList,
                }),
            ),
        ],
    });
}

export function getTestReplayWorkflowPartialHistoryNoDecisionEvents(): shared_IHistory {
    return new shared_History({
        events: [
            createTestEventWorkflowExecutionStarted(1, new shared_WorkflowExecutionStartedEventAttributes({
                workflowType: new shared_WorkflowType({
                    name: common_StringPtr("go.uber.org/cadence/internal.testReplayWorkflow"),
                }),
                taskList: testTaskList,
                input: testEncodeFunctionArgs(getDefaultDataConverter()),
            })),
            createTestEventDecisionTaskScheduled(2, new shared_DecisionTaskScheduledEventAttributes({})),
            createTestEventDecisionTaskStarted(3),
            createTestEventDecisionTaskFailed(4, new shared_DecisionTaskFailedEventAttributes({
                scheduledEventId: new Int64(2),
            })),
            createTestEventDecisionTaskScheduled(5, new shared_DecisionTaskScheduledEventAttributes({})),
            createTestEventDecisionTaskStarted(6),
        ],
    });
}

export function getTestReplayWorkflowMismatchHistory(): shared_IHistory {
    return new shared_History({
        events: [
            createTestEventWorkflowExecutionStarted(1, new shared_WorkflowExecutionStartedEventAttributes({
                workflowType: new shared_WorkflowType({
                    name: StringPtr("go.uber.org/cadence/internal.testReplayWorkflow"),
                }),
                taskList: new TaskList({
                    name: StringPtr("taskList"),
                }),
                input: testEncodeFunctionArgs(getDefaultDataConverter()),
            })),
            createTestEventDecisionTaskScheduled(2, new shared_DecisionTaskScheduledEventAttributes({})),
            createTestEventDecisionTaskStarted(3),
            createTestEventDecisionTaskCompleted(4, new shared_DecisionTaskCompletedEventAttributes({})),
            createTestEventActivityTaskScheduled(5, new shared_ActivityTaskScheduledEventAttributes({
                activityId: StringPtr("0"),
                activityType: new shared_ActivityType({
                    name: StringPtr("unknownActivityType"),
                }),
                taskList: new TaskList({
                    name: StringPtr("taskList"),
                }),
            })),
        ],
    });
}

export function getTestReplayWorkflowLocalActivityHistory(): shared_IHistory {
    return new shared_History({
        events: [
            createTestEventWorkflowExecutionStarted(1, new shared_WorkflowExecutionStartedEventAttributes({
                workflowType: new shared_WorkflowType({
                    name: StringPtr("go.uber.org/cadence/internal.testReplayWorkflowLocalActivity"),
                }),
                taskList: testTaskList,
                input: testEncodeFunctionArgs(getDefaultDataConverter()),
            })),
            createTestEventDecisionTaskScheduled(2, new shared_DecisionTaskScheduledEventAttributes({})),
            createTestEventDecisionTaskStarted(3),
            createTestEventDecisionTaskCompleted(4, new shared_DecisionTaskCompletedEventAttributes({})),
            createTestEventLocalActivity(5, new shared_MarkerRecordedEventAttributes({
                markerName: StringPtr(localActivityMarkerName),
                details: createLocalActivityMarkerDataForTest("0", "go.uber.org/cadence/internal.testActivity"),
                decisionTaskCompletedEventId: new Int64(4),
            })),
            createTestEventWorkflowExecutionCompleted(6, new shared_WorkflowExecutionCompletedEventAttributes({
                decisionTaskCompletedEventId: new Int64(4),
            })),
        ],
    });
}

export function getTestReplayWorkflowLocalActivityResultMismatchHistory(): shared_IHistory {
    return new shared_History({
        events: [
            createTestEventWorkflowExecutionStarted(1, new shared_WorkflowExecutionStartedEventAttributes({
                workflowType: new shared_WorkflowType({
                    name: StringPtr("go.uber.org/cadence/internal.testReplayWorkflowLocalActivity"),
                }),
                taskList: testTaskList,
                input: testEncodeFunctionArgs(getDefaultDataConverter()),
            })),
            createTestEventDecisionTaskScheduled(2, new shared_DecisionTaskScheduledEventAttributes({})),
            createTestEventDecisionTaskStarted(3),
            createTestEventDecisionTaskCompleted(4, new shared_DecisionTaskCompletedEventAttributes({})),
            createTestEventLocalActivity(5, new shared_MarkerRecordedEventAttributes({
                markerName: StringPtr(localActivityMarkerName),
                details: createLocalActivityMarkerDataForTest("0", ""),
                decisionTaskCompletedEventId: new Int64(4),
            })),
            createTestEventWorkflowExecutionCompleted(6, new shared_WorkflowExecutionCompletedEventAttributes({
                result: Buffer.from("some-incorrect-result"),
                decisionTaskCompletedEventId: new Int64(4),
            })),
        ],
    });
}

export function getTestReplayWorkflowLocalActivityTypeMismatchHistory(): shared_IHistory {
    return new shared_History({
        events: [
            createTestEventWorkflowExecutionStarted(1, new shared_WorkflowExecutionStartedEventAttributes({
                workflowType: new shared_WorkflowType({
                    name: common_StringPtr("go.uber.org/cadence/internal.testReplayWorkflowLocalActivity"),
                }),
                taskList: testTaskList,
                input: testEncodeFunctionArgs(getDefaultDataConverter()),
            })),
            createTestEventDecisionTaskScheduled(2, new shared_DecisionTaskScheduledEventAttributes({})),
            createTestEventDecisionTaskStarted(3),
            createTestEventDecisionTaskCompleted(4, new shared_DecisionTaskCompletedEventAttributes({})),
            createTestEventLocalActivity(5, new shared_MarkerRecordedEventAttributes({
                markerName: common_StringPtr(localActivityMarkerName),
                details: createLocalActivityMarkerDataForTest("0", "different-activity-type"),
                decisionTaskCompletedEventId: new Int64(4),
            })),
            createTestEventWorkflowExecutionCompleted(6, new shared_WorkflowExecutionCompletedEventAttributes({
                decisionTaskCompletedEventId: new Int64(4),
            })),
        ],
    });
}

export function getTestReplayWorkflowContextPropagatorHistory(): shared_IHistory {
    const history = getTestReplayWorkflowFullHistory();
    history.events![0]!.workflowExecutionStartedEventAttributes!.workflowType!.name =
        StringPtr("go.uber.org/cadence/internal.testReplayWorkflowContextPropagator");
    history.events![0]!.workflowExecutionStartedEventAttributes!.header = new shared_Header({
        fields: new Map([[testHeader, Buffer.from("testValue")]]),
    });
    return history;
}

export function createLocalActivityMarkerDataForTest(activityID: string, activityType: string): Buffer {
  const lamd: localActivityMarkerData = {
    ActivityID: activityID,
    ActivityType: activityType,
    ErrReason: "",
    ErrJSON: "",
    ResultJSON: "",
    ReplayTime: Date.now() * 1_000_000,
    Attempt: 0,
    Backoff: 0,
  };

  try {
    return encodeArg(undefined, lamd);
  } catch (err) {
    if (!(err instanceof Error)) throw err;
    throw new Error(`error encoding local activity marker data: ${err.message}`);
  }
}

export let testTaskList = new TaskList({ name: common_StringPtr("testTaskList"), kind: shared_TaskListKind.NORMAL });
