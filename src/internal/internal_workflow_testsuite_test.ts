// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { internal_ActivityOptions, internal_LocalActivityOptions, GetHeartbeatDetails, HasHeartbeatDetails, RecordActivityHeartbeat, GetActivityInfo, cadence_internal_ActivityInfo, GetActivityLogger } from './activity.js';
import { internal_Context, WithCancel, NewDisconnectedContext, WithValue } from './context.js';
import { WorkflowTestSuite, TestWorkflowEnvironment, ErrMockStartChildWorkflowFailed } from './workflow_testsuite.js';
import { Channel } from './runtime/channel.js';
import { Context, background, withValue } from './runtime/context.js';
import { Hour, Millisecond, Minute, Second } from './runtime/time.js';
import { GoTestifySuite } from './runtime/testify_suite.js';
import { expect } from 'vitest';
import { NewStringMapPropagator, testHeader } from './internal_workflow_client_test.js';
import { Header } from '../generated/thrift/cadence-idl/com/uber/cadence/Header.js';
import { args } from './internal_worker_test.js';
import { NoopLogger } from './runtime/logging.js';
import { ExecuteActivity, WithActivityOptions, ExecuteChildWorkflow, WithChildWorkflowOptions, internal_ChildWorkflowOptions, ExecuteLocalActivity, WithLocalActivityOptions, NewSelector, NewTimer, internal_Future, Await, WithDataConverter, GetWorkflowInfo, WorkflowInfo, GetLastCompletionResult, HasLastCompletionResult, Sleep, Go, NewChannel, GetSignalChannel, ExecuteWithMinVersion, GetVersion, GetLogger, CadenceChangeVersion, ExecuteWithVersion, SideEffect, RegisterWorkflow, UpsertSearchAttributes, SetQueryHandler, SignalExternalWorkflow, internal_WorkflowExecution, WithWorkflowDomain, internal_Channel, internal_Version, RequestCancelExternalWorkflow, NewBufferedChannel } from './workflow.js';
import { TimeoutType } from '../generated/thrift/cadence-idl/com/uber/cadence/TimeoutType.js';
import { internal_TimeoutError, NewCustomError, internal_GenericError, internal_CustomError, NewCanceledError, IsCanceledError, NewTimeoutError, internal_CanceledError, ErrActivityResultPending, NewContinueAsNewError, internal_ContinueAsNewError } from './error.js';
import { mapCase, recvCase, selectOne } from './runtime/select.js';
import { getFunctionName } from './internal_worker.js';
import { Anything } from './runtime/testify_mock.js';
import { internal_WorkflowIDReusePolicy, NewValue } from './client.js';
import { WorkerOptions } from './worker.js';
import { internal_ShadowOptions } from './workflow_shadower.js';
import { testErrorDetails1 } from './error_test.js';
import { internal_Values, getDefaultDataConverter, internal_Value } from './encoded.js';
import { activityInfo } from './internal_activity.js';
import { newTestDataConverter } from './encoded_test.js';
import { StringPtr } from './common/convert.js';
import { WorkflowExecution } from '../generated/thrift/cadence-idl/com/uber/cadence/WorkflowExecution.js';
import { WorkflowType } from '../generated/thrift/cadence-idl/com/uber/cadence/WorkflowType.js';
import { Ref } from './runtime/ref.js';
import { newTestWorkflowEnvironmentImpl } from './internal_workflow_testsuite.js';
import { WorkflowExecutionAlreadyStartedError } from '../errors/idl_errors.js';

export type testContextKey = string;

export class WorkflowTestSuiteUnitTest extends WorkflowTestSuite {
  constructor(init?: Partial<WorkflowTestSuiteUnitTest>) {
    super(init);
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  Suite: GoTestifySuite = new GoTestifySuite();

  activityOptions: internal_ActivityOptions = { TaskList: "", ScheduleToCloseTimeout: 0, ScheduleToStartTimeout: 0, StartToCloseTimeout: 0, HeartbeatTimeout: 0, WaitForCancellation: false, ActivityID: "" };

  localActivityOptions: internal_LocalActivityOptions = { ScheduleToCloseTimeout: 0 };

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

  async SetupSuite(): Promise<void> {
    this.activityOptions = new internal_ActivityOptions({
      ActivityID: "",
      ScheduleToCloseTimeout: 0,
      ScheduleToStartTimeout: Minute,
      StartToCloseTimeout: Minute,
      HeartbeatTimeout: 20 * Second,
      TaskList: "",
      WaitForCancellation: false,
    });
    this.localActivityOptions = {
      ScheduleToCloseTimeout: Second * 3,
    };
    this.header = new Header({
      fields: new Map([["test", Buffer.from("test-data")]]),
    });
    this.ctxProps = [await NewStringMapPropagator(["test"])];
  }

  SetupTest(): void {
    this.SetLogger(NoopLogger());
  }

  async Test_ActivityMockFunction(): Promise<void> {
    const mockActivity = (_ctx: Context, msg: string): string => "mock_" + msg;

    const env = this.NewTestWorkflowEnvironment();

    try {
      await env.RegisterActivity(testActivityHello);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
    }

    const activityCall = await env.OnActivity(
      testActivityHello,
      Anything,
      Anything,
    );
    activityCall.Return(mockActivity).Once();

    try {
      await env.RegisterWorkflow(testWorkflowHello);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
    }

    try {
      await env.ExecuteWorkflow(testWorkflowHello);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
    }

    this.True(env.IsWorkflowCompleted());
    this.NoError(env.GetWorkflowError());

    const result = { value: "" };
    env.GetWorkflowResult(result);

    this.Equal("mock_world", result.value);
    env.AssertExpectations(this.T());
  }

  async Test_ActivityMockFunction_WithDataConverter(): Promise<void> {
    const mockActivity = (_ctx: Context, msg: string): string => {
      return "mock_" + msg;
    };

    const workflowFn = async (ctx: internal_Context): Promise<string> => {
      const ao = new internal_ActivityOptions({
        ActivityID: "",
        HeartbeatTimeout: 20 * Second,
        ScheduleToCloseTimeout: 0,
        ScheduleToStartTimeout: Minute,
        StartToCloseTimeout: Minute,
        TaskList: "",
        WaitForCancellation: false,
      });
      ctx = WithActivityOptions(ctx, ao);

      const [ctxWithConverter] = [await WithDataConverter(ctx, newTestDataConverter())];
      ctx = ctxWithConverter;
      const resultBox: { value: string } = { value: "" };
      const future = await ExecuteActivity(ctx, testActivityHello, "world");
      await future.Get(ctx, resultBox);

      const ctx1 = await WithDataConverter(ctx, getDefaultDataConverter());
      const result1Box: { value: string } = { value: "" };
      const future1 = await ExecuteActivity(ctx1, testActivityHello, "world1");
      await future1.Get(ctx1, result1Box);

      return resultBox.value + "," + result1Box.value;
    };

    const env = this.NewTestWorkflowEnvironment();
    await env.RegisterWorkflow(workflowFn);
    await env.RegisterActivity(testActivityHello);

    env.SetWorkerOptions(new WorkerOptions({
      AutoScalerOptions: {
        Enabled: false,
        Cooldown: 0,
        PollerMinCount: 0,
        PollerMaxCount: 0,
        PollerInitCount: 0,
        PollerWaitTimeUpperBound: 0,
        PollerWaitTimeLowerBound: 0,
      },
      ContextPropagators: [],
      DataConverter: newTestDataConverter(),
      DisableActivityWorker: false,
      DisableStickyExecution: false,
      DisableWorkflowWorker: false,
      EnableLoggingInReplay: false,
      EnableSessionWorker: false,
      EnableShadowWorker: false,
      FeatureFlags: {
        WorkflowExecutionAlreadyCompletedErrorEnabled: false,
        AutoforwardingEnabled: false,
        PollerAutoScalerEnabled: false,
        EphemeralTaskListsEnabled: false,
        MetricEmitMode: 0,
      },
      Identity: "",
      IsolationGroup: "",
      MaxConcurrentActivityExecutionSize: 0,
      MaxConcurrentActivityTaskPollers: 0,
      MaxConcurrentDecisionTaskExecutionSize: 0,
      MaxConcurrentDecisionTaskPollers: 0,
      MaxConcurrentLocalActivityExecutionSize: 0,
      MaxConcurrentSessionExecutionSize: 0,
      MinConcurrentActivityTaskPollers: 0,
      MinConcurrentDecisionTaskPollers: 0,
      NonDeterministicWorkflowPolicy: 0,
      PollerAutoScalerCooldown: 0,
      PollerAutoScalerDryRun: false,
      PollerAutoScalerTargetUtilization: 0,
      ShadowOptions: new internal_ShadowOptions(),
      StickyScheduleToStartTimeout: 0,
      TaskListActivitiesPerSecond: 0,
      WorkerActivitiesPerSecond: 0,
      WorkerBugPorts: { DisableStrictNonDeterminismCheck: false },
      WorkerDecisionTasksPerSecond: 0,
      WorkerLocalActivitiesPerSecond: 0,
      WorkerStats: {},
      WorkerStopTimeout: 0,
      WorkflowInterceptorChainFactories: [],
    }));

    (await env.OnActivity(testActivityHello, Anything, Anything))
      .Return(mockActivity)
      .Twice();

    await env.ExecuteWorkflow(workflowFn);

    expect(env.IsWorkflowCompleted()).toBe(true);
    expect(env.GetWorkflowError()).toBeNull();

    const resultBox: { value: string } = { value: "" };
    env.GetWorkflowResult(resultBox);
    expect(resultBox.value).toEqual("mock_world,mock_world1");

    env.AssertExpectations(this.T());
  }

  async Test_ActivityMockValues(): Promise<void> {
    const env = this.NewTestWorkflowEnvironment();
    await env.RegisterWorkflow(testWorkflowHello);
    await env.RegisterActivity(testActivityHello);

    (await env.OnActivity(testActivityHello, Anything, Anything))
      .Return("mock_value", null)
      .Once();
    await env.ExecuteWorkflow(testWorkflowHello);

    this.True(env.IsWorkflowCompleted());
    this.NoError(env.GetWorkflowError());
    const result = { value: "" };
    env.GetWorkflowResult(result);
    this.Equal("mock_value", result.value);
    env.AssertExpectations(this.T());
  }

  async Test_OnActivityStartedListener(): Promise<void> {
    const runCount = 100;
    const workflowFn = async (ctx: internal_Context): Promise<void> => {
      ctx = WithActivityOptions(ctx, this.activityOptions);

      for (let i = 1; i <= runCount; i++) {
        await (await ExecuteActivity(ctx, testActivityHello, `msg${i}`)).Get(ctx, null);
      }
    };

    const env = this.NewTestWorkflowEnvironment();
    await env.RegisterWorkflow(workflowFn);
    await env.RegisterActivityWithOptions(testActivityHello, {
      Name: "testActivityHello",
      DisableAlreadyRegisteredCheck: false,
      EnableAutoHeartbeat: false,
      EnableShortName: false,
    });

    const activityCalls: string[] = [];
    env.SetOnActivityStartedListener((activityInfo: cadence_internal_ActivityInfo, ctx: Context, args: internal_Values): void => {
      let input = "";
      args.Get({ value: input });
      activityCalls.push(`${activityInfo.ActivityType.Name}:${input}`);
    });

    const expectedCalls: string[] = [];
    for (let i = 1; i <= runCount; i++) {
      expectedCalls.push(`testActivityHello:msg${i}`);
    }

    await env.ExecuteWorkflow(workflowFn);
    expect(env.IsWorkflowCompleted()).toBe(true);
    expect(env.GetWorkflowError()).toBeNull();
    expect(activityCalls).toEqual(expectedCalls);
  }

  async Test_TimerWorkflow_ClockAutoFastForward(): Promise<void> {
    const firedTimerRecord: string[] = [];
    const workflowFn = async (ctx: internal_Context): Promise<void> => {
      const t1 = NewTimer(ctx, 5 * Second);
      const t2 = NewTimer(ctx, 1 * Second);
      const t3 = NewTimer(ctx, 2 * Second);
      const t4 = NewTimer(ctx, 5 * Second);

      const selector = NewSelector(ctx);
      selector
        .AddFuture(t1, (f: internal_Future): void => {
          firedTimerRecord.push("t1");
        })
        .AddFuture(t2, (f: internal_Future): void => {
          firedTimerRecord.push("t2");
        })
        .AddFuture(t3, (f: internal_Future): void => {
          firedTimerRecord.push("t3");
        })
        .AddFuture(t4, (f: internal_Future): void => {
          firedTimerRecord.push("t4");
        });

      await selector.Select(ctx);
      await selector.Select(ctx);
      await selector.Select(ctx);
      await selector.Select(ctx);
    };

    const env = this.NewTestWorkflowEnvironment();
    await env.RegisterWorkflow(workflowFn);
    await env.ExecuteWorkflow(workflowFn);

    this.True(env.IsWorkflowCompleted());
    this.NoError(env.GetWorkflowError());
    this.Equal(["t2", "t3", "t1", "t4"], firedTimerRecord);
  }

  async Test_WorkflowAutoForwardClock(): Promise<void> {
    const workflowFn = async (ctx: internal_Context): Promise<string> => {
      const f1 = NewTimer(ctx, Minute);

      ctx = WithActivityOptions(ctx, this.activityOptions);
      const f2 = await ExecuteActivity(ctx, testActivityHello, "controlled_execution");

      await f1.Get(ctx, undefined);

      if (!f2.IsReady()) {
        throw new Error("activity is not completed when timer fired");
      }

      const activityResult: { value: string } = { value: "" };
      await f2.Get(ctx, activityResult);

      return activityResult.value;
    };

    const env = this.NewTestWorkflowEnvironment();
    await env.RegisterWorkflow(workflowFn);
    await env.RegisterActivity(testActivityHello);
    await env.ExecuteWorkflow(workflowFn);

    this.True(env.IsWorkflowCompleted());
    this.NoError(env.GetWorkflowError());
    const result: { value: string } = { value: "" };
    env.GetWorkflowResult(result);
    this.Equal("hello_controlled_execution", result.value);
  }

  async Test_WorkflowMixedClock(): Promise<void> {
    const workflowFn = async (ctx: internal_Context): Promise<string> => {
      const t1 = NewTimer(ctx, Minute);

      ctx = WithActivityOptions(ctx, this.activityOptions);
      const f1 = await ExecuteActivity(ctx, testActivityHello, "controlled_execution");
      const [f2Ctx, f2Cancel] = await WithCancel(ctx);
      const f2 = await ExecuteActivity(f2Ctx, testActivityHeartbeat, Second * 10);

      await f1.Get(ctx, null);

      const t2 = NewTimer(ctx, Millisecond);
      await NewSelector(ctx)
        .AddFuture(t2, async (f: internal_Future): Promise<void> => {
          if (!f2.IsReady()) {
            await f2Cancel();
          }
        })
        .Select(ctx);

      await t1.Get(ctx, null);

      return "expected";
    };

    const env = this.NewTestWorkflowEnvironment();

    try {
      await env.RegisterWorkflow(workflowFn);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
    }
    try {
      await env.RegisterActivity(testActivityHeartbeat);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
    }
    try {
      await env.RegisterActivity(testActivityHello);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
    }
    try {
      await env.ExecuteWorkflow(workflowFn);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
    }

    this.True(env.IsWorkflowCompleted());
    this.NoError(env.GetWorkflowError());
    const result = { value: "" };
    env.GetWorkflowResult(result);
    this.Equal("expected", result.value);
  }

  async Test_WorkflowActivityCancellation(): Promise<void> {
    const workflowFn = async (ctx: internal_Context): Promise<void> => {
      const ctxWithOptions = WithActivityOptions(ctx, this.activityOptions);
      const [ctxLocal, cancelHandler] = await WithCancel(ctxWithOptions);

      const f1 = await ExecuteActivity(ctxLocal, testActivityHeartbeat, "fast", Millisecond);
      const f2 = await ExecuteActivity(ctxLocal, testActivityHeartbeat, "slow", Second * 3);

      NewSelector(ctxLocal)
        .AddFuture(f1, (_f: internal_Future) => {
          cancelHandler();
        })
        .AddFuture(f2, (_f: internal_Future) => {
          cancelHandler();
        })
        .Select(ctxLocal);

      let err: Error | null = null;
      try {
        await f2.Get(ctxLocal, undefined);
      } catch (e) {
        if (!(e instanceof Error)) throw e;
        err = e;
      }

      if (err !== null && !(err instanceof internal_CanceledError)) {
        throw err;
      }
    };

    const env = this.NewTestWorkflowEnvironment();
    await env.RegisterWorkflow(workflowFn);
    await env.RegisterActivity(testActivityHeartbeat);

    const activityMap: Record<string, string> = {};
    let completedActivityID = "";
    let cancelledActivityID = "";

    env.SetOnActivityStartedListener((activityInfo: cadence_internal_ActivityInfo, _ctx: Context, args: internal_Values) => {
      const msgBox: { value: string } = { value: "" };
      let getErr: Error | null = null;
      try {
        args.Get(msgBox);
      } catch (e) {
        if (!(e instanceof Error)) throw e;
        getErr = e;
      }
      this.NoError(getErr);
      activityMap[msgBox.value] = activityInfo.ActivityID;
    });

    env.SetOnActivityCompletedListener((_activityInfo: cadence_internal_ActivityInfo, _result: internal_Value | undefined, _err: Error | null) => {
      completedActivityID = _activityInfo.ActivityID;
    });

    env.SetOnActivityCanceledListener((activityInfo: cadence_internal_ActivityInfo) => {
      cancelledActivityID = activityInfo.ActivityID;
    });

    await env.ExecuteWorkflow(workflowFn);

    expect(env.IsWorkflowCompleted()).toBe(true);
    expect(env.GetWorkflowError()).toBeNull();
    expect(activityMap["fast"]).toEqual(completedActivityID);
    expect(activityMap["slow"]).toEqual(cancelledActivityID);
  }

  async Test_ActivityWithUserContext(): Promise<void> {
    const testKey = "test_key";
    const testValue = "test_value";
    const userCtx = withValue(background(), testKey, testValue);
    const workerOptions = new WorkerOptions({
      AutoScalerOptions: { Enabled: false, Cooldown: 0, PollerMinCount: 0, PollerMaxCount: 0, PollerInitCount: 0, PollerWaitTimeUpperBound: 0, PollerWaitTimeLowerBound: 0 },
      BackgroundActivityContext: userCtx,
      ContextPropagators: [],
      DisableActivityWorker: false,
      DisableStickyExecution: false,
      DisableWorkflowWorker: false,
      EnableLoggingInReplay: false,
      EnableSessionWorker: false,
      EnableShadowWorker: false,
      FeatureFlags: { WorkflowExecutionAlreadyCompletedErrorEnabled: false, AutoforwardingEnabled: false, PollerAutoScalerEnabled: false, EphemeralTaskListsEnabled: false, MetricEmitMode: 0 },
      Identity: "",
      IsolationGroup: "",
      MaxConcurrentActivityExecutionSize: 0,
      MaxConcurrentActivityTaskPollers: 0,
      MaxConcurrentDecisionTaskExecutionSize: 0,
      MaxConcurrentDecisionTaskPollers: 0,
      MaxConcurrentLocalActivityExecutionSize: 0,
      MaxConcurrentSessionExecutionSize: 0,
      MinConcurrentActivityTaskPollers: 0,
      MinConcurrentDecisionTaskPollers: 0,
      NonDeterministicWorkflowPolicy: 0,
      PollerAutoScalerCooldown: 0,
      PollerAutoScalerDryRun: false,
      PollerAutoScalerTargetUtilization: 0,
      ShadowOptions: new internal_ShadowOptions(),
      StickyScheduleToStartTimeout: 0,
      TaskListActivitiesPerSecond: 0,
      WorkerActivitiesPerSecond: 0,
      WorkerBugPorts: { DisableStrictNonDeterminismCheck: false },
      WorkerDecisionTasksPerSecond: 0,
      WorkerLocalActivitiesPerSecond: 0,
      WorkerStats: {},
      WorkerStopTimeout: 0,
      WorkflowInterceptorChainFactories: []
    });

    const activityWithUserContext = (ctx: Context, keyName: string): string => {
      const value = ctx.value(keyName);
      if (value != null) {
        return value as string;
      }
      throw new Error("value not found from ctx");
    };

    const env = this.NewTestActivityEnvironment();
    await env.RegisterActivity(activityWithUserContext);
    env.SetWorkerOptions(workerOptions);
    const blob = await env.ExecuteActivity(activityWithUserContext, testKey);
    this.NoError(null);

    const value = { value: "" };
    blob.Get(value);
    this.Equal(testValue, value.value);
  }

  async Test_ActivityWithHeaderContext(): Promise<void> {
    const contextPropagator = await NewStringMapPropagator([testHeader]);
    const workerOptions = new WorkerOptions({
      AutoScalerOptions: { Enabled: false, Cooldown: 0, PollerMinCount: 0, PollerMaxCount: 0, PollerInitCount: 0, PollerWaitTimeUpperBound: 0, PollerWaitTimeLowerBound: 0 },
      ContextPropagators: [contextPropagator],
      DisableActivityWorker: false,
      DisableStickyExecution: false,
      DisableWorkflowWorker: false,
      EnableLoggingInReplay: false,
      EnableSessionWorker: false,
      EnableShadowWorker: false,
      FeatureFlags: { WorkflowExecutionAlreadyCompletedErrorEnabled: false, AutoforwardingEnabled: false, PollerAutoScalerEnabled: false, EphemeralTaskListsEnabled: false, MetricEmitMode: 0 },
      Identity: "",
      IsolationGroup: "",
      MaxConcurrentActivityExecutionSize: 0,
      MaxConcurrentActivityTaskPollers: 0,
      MaxConcurrentDecisionTaskExecutionSize: 0,
      MaxConcurrentDecisionTaskPollers: 0,
      MaxConcurrentLocalActivityExecutionSize: 0,
      MaxConcurrentSessionExecutionSize: 0,
      MinConcurrentActivityTaskPollers: 0,
      MinConcurrentDecisionTaskPollers: 0,
      NonDeterministicWorkflowPolicy: 0,
      PollerAutoScalerCooldown: 0,
      PollerAutoScalerDryRun: false,
      PollerAutoScalerTargetUtilization: 0,
      ShadowOptions: new internal_ShadowOptions(),
      StickyScheduleToStartTimeout: 0,
      TaskListActivitiesPerSecond: 0,
      WorkerActivitiesPerSecond: 0,
      WorkerBugPorts: { DisableStrictNonDeterminismCheck: false },
      WorkerDecisionTasksPerSecond: 0,
      WorkerLocalActivitiesPerSecond: 0,
      WorkerStats: {},
      WorkerStopTimeout: 0,
      WorkflowInterceptorChainFactories: []
    });

    const activityWithUserContext = async (ctx: Context): Promise<string> => {
      const value = ctx.value(testHeader);
      if (typeof value === "string") {
        return value;
      }
      throw new Error("value not found from ctx");
    };

    this.SetHeader(new Header({
      fields: new Map([[testHeader, Buffer.from("test-data")]])
    }));

    const env = this.NewTestActivityEnvironment();
    try {
      await env.RegisterActivity(activityWithUserContext);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
    }
    env.SetWorkerOptions(workerOptions);
    const blob = await env.ExecuteActivity(activityWithUserContext);
    const valueBox: { value: string } = { value: "" };
    blob.Get(valueBox);
    this.Equal("test-data", valueBox.value);
  }

  async Test_CompleteActivity(): Promise<void> {
    const env = this.NewTestWorkflowEnvironment();
    let activityInfo!: cadence_internal_ActivityInfo;
    const mockActivity = async (ctx: Context, msg: string): Promise<string> => {
      activityInfo = GetActivityInfo(ctx);
      env.RegisterDelayedCallback(async () => {
        try {
          await env.CompleteActivity(activityInfo.TaskToken!, "async_complete", null);
          this.NoError(null);
        } catch (err) {
          if (!(err instanceof Error)) throw err;
          this.NoError(err);
        }
      }, Minute);
      throw ErrActivityResultPending;
    };

    await env.RegisterWorkflow(testWorkflowHello);
    await env.RegisterActivity(testActivityHello);
    (await env.OnActivity(testActivityHello, Anything, Anything)).Return(mockActivity).Once();

    await env.ExecuteWorkflow(testWorkflowHello);

    this.True(env.IsWorkflowCompleted());
    this.NoError(env.GetWorkflowError());
    env.AssertExpectations(this.T());

    const result = { value: "" };
    env.GetWorkflowResult(result);
    this.Equal("async_complete", result.value);
  }

  async Test_ActivityReturnsErrActivityResultPending(): Promise<void> {
    const env = this.NewTestActivityEnvironment();
    const activityFn = async (ctx: Context): Promise<string> => {
      throw ErrActivityResultPending;
    };
    await env.RegisterActivity(activityFn);
    try {
      await env.ExecuteActivity(activityFn);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
      expect(err).toEqual(ErrActivityResultPending);
    }
  }

  async Test_WorkflowCancellation(): Promise<void> {
    const workflowFn = async (ctx: internal_Context): Promise<void> => {
      ctx = WithActivityOptions(ctx, this.activityOptions);
      const f = await ExecuteActivity(ctx, testActivityHeartbeat, "msg1", 10 * Second);
      await f.Get(ctx, null);
    };

    const env = this.NewTestWorkflowEnvironment();

    env.RegisterDelayedCallback(async () => {
      await env.CancelWorkflow();
    }, Millisecond);

    try {
      await env.RegisterWorkflow(workflowFn);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
    }

    try {
      await env.RegisterActivity(testActivityHeartbeat);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
    }

    try {
      await env.ExecuteWorkflow(workflowFn);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
    }

    this.True(env.IsWorkflowCompleted());
    this.NotNil(env.GetWorkflowError());
    const ok = env.GetWorkflowError() instanceof internal_CanceledError;
    this.True(ok);
  }

  async Test_SideEffect(): Promise<void> {
    const value = 12345;
    const workflowFn = async (ctx: internal_Context): Promise<void> => {
      ctx = WithActivityOptions(ctx, this.activityOptions);
      const se = await SideEffect(ctx, (_ctx: internal_Context) => value);
      const vBox: { value: number } = { value: 0 };
      se.Get(vBox);
      const v = vBox.value;
      if (v !== value) {
        throw new Error("unexpected");
      }
      const f = await ExecuteActivity(ctx, testActivityHello, "msg1");
      await f.Get(ctx, null);
    };

    const env = this.NewTestWorkflowEnvironment();

    try {
      await env.RegisterWorkflow(workflowFn);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
    }

    try {
      await env.RegisterActivity(testActivityHello);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
    }

    try {
      await env.ExecuteWorkflow(workflowFn);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
    }

    expect(env.IsWorkflowCompleted()).toBe(true);
    expect(env.GetWorkflowError()).toBeNull();
  }

  async Test_ChildWorkflow_Basic(): Promise<void> {
    const workflowFn = async (ctx: internal_Context): Promise<string> => {
      ctx = WithActivityOptions(ctx, this.activityOptions);

      const helloActivityResult: { value: string } = { value: "" };
      const activityFuture = await ExecuteActivity(ctx, testActivityHello, "activity");
      await activityFuture.Get(ctx, helloActivityResult);

      const cwo: internal_ChildWorkflowOptions = {
        Bugports: { StartChildWorkflowsOnCanceledContext: false },
        CronSchedule: "",
        Domain: "",
        ExecutionStartToCloseTimeout: Minute,
        ParentClosePolicy: 0,
        TaskList: "",
        TaskStartToCloseTimeout: 0,
        WaitForCancellation: false,
        WorkflowID: "",
        WorkflowIDReusePolicy: 0
      };
      ctx = await WithChildWorkflowOptions(ctx, cwo);

      const helloWorkflowResult: { value: string } = { value: "" };
      const childWorkflowFuture = await ExecuteChildWorkflow(ctx, testWorkflowHello);
      await childWorkflowFuture.Get(ctx, helloWorkflowResult);

      return `${helloActivityResult.value} ${helloWorkflowResult.value}`;
    };

    const env = this.NewTestWorkflowEnvironment();

    try {
      await env.RegisterWorkflow(workflowFn);
    } catch (e) {
      if (!(e instanceof Error)) throw e;
    }
    try {
      await env.RegisterWorkflow(testWorkflowHello);
    } catch (e) {
      if (!(e instanceof Error)) throw e;
    }
    try {
      await env.RegisterActivity(testActivityHello);
    } catch (e) {
      if (!(e instanceof Error)) throw e;
    }
    try {
      await env.ExecuteWorkflow(workflowFn);
    } catch (e) {
      if (!(e instanceof Error)) throw e;
    }

    expect(env.IsWorkflowCompleted()).toBe(true);
    expect(env.GetWorkflowError()).toBeNull();

    const actualResult: { value: string } = { value: "" };
    env.GetWorkflowResult(actualResult);
    expect(actualResult.value).toEqual("hello_activity hello_world");
  }

  async Test_ChildWorkflow_Basic_WithDataConverter(): Promise<void> {
    const workflowFn = async (ctx: internal_Context): Promise<string> => {
      ctx = WithActivityOptions(ctx, this.activityOptions);
      const helloActivityResult: { value: string } = { value: "" };
      const activityFuture = await ExecuteActivity(ctx, testActivityHello, "activity");
      await activityFuture.Get(ctx, helloActivityResult);

      const cwo: internal_ChildWorkflowOptions = {
        Bugports: { StartChildWorkflowsOnCanceledContext: false },
        CronSchedule: "",
        Domain: "",
        ExecutionStartToCloseTimeout: Minute,
        ParentClosePolicy: 0,
        TaskList: "",
        TaskStartToCloseTimeout: 0,
        WaitForCancellation: false,
        WorkflowID: "",
        WorkflowIDReusePolicy: 0
      };
      ctx = await WithChildWorkflowOptions(ctx, cwo);
      const helloWorkflowResult: { value: string } = { value: "" };
      ctx = await WithDataConverter(ctx, newTestDataConverter());
      const workflowFuture = await ExecuteChildWorkflow(ctx, testWorkflowHello);
      await workflowFuture.Get(ctx, helloWorkflowResult);

      return `${helloActivityResult.value} ${helloWorkflowResult.value}`;
    };

    const env = this.NewTestWorkflowEnvironment();
    await env.RegisterWorkflow(workflowFn);
    await env.RegisterWorkflow(testWorkflowHello);
    await env.RegisterActivity(testActivityHello);

    await env.ExecuteWorkflow(workflowFn);

    expect(env.IsWorkflowCompleted()).toBe(true);
    expect(env.GetWorkflowError()).toBeNull();
    const actualResult: { value: string } = { value: "" };
    env.GetWorkflowResult(actualResult);
    expect(actualResult.value).toEqual("hello_activity hello_world");
  }

  async Test_ChildWorkflowCancel(): Promise<void> {
    const workflowFn = async (ctx: internal_Context): Promise<void> => {
      const cwo: internal_ChildWorkflowOptions = {
        Bugports: { StartChildWorkflowsOnCanceledContext: false },
        CronSchedule: "",
        Domain: "",
        ExecutionStartToCloseTimeout: Minute,
        ParentClosePolicy: 0,
        TaskList: "",
        TaskStartToCloseTimeout: 0,
        WaitForCancellation: true,
        WorkflowID: "",
        WorkflowIDReusePolicy: 0
      };
      ctx = await WithChildWorkflowOptions(ctx, cwo);
      const [ctx1, cancel1] = await WithCancel(ctx);
      const [ctx2, cancel2] = await WithCancel(ctx);
      const f1 = await ExecuteChildWorkflow(ctx1, testWorkflowHeartbeat, "fast", Millisecond);
      const f2 = await ExecuteChildWorkflow(ctx2, testWorkflowHeartbeat, "slow", Hour);

      const selector = NewSelector(ctx);
      selector
        .AddFuture(f1, (_f: internal_Future) => {
          cancel2();
        })
        .AddFuture(f2, (_f: internal_Future) => {
          cancel1();
        });
      await selector.Select(ctx);
    };

    const env = this.NewTestWorkflowEnvironment();
    await env.RegisterWorkflow(workflowFn);
    await env.RegisterWorkflow(testWorkflowHeartbeat);
    await env.RegisterActivity(testActivityHeartbeat);

    await env.ExecuteWorkflow(workflowFn);

    expect(env.IsWorkflowCompleted()).toBe(true);
    expect(env.GetWorkflowError()).toBeNull();
  }

  async Test_ChildWorkflow_Mock(): Promise<void> {
    const workflowFn = async (ctx: internal_Context): Promise<string> => {
      ctx = WithActivityOptions(ctx, this.activityOptions);
      const helloActivityResult = { value: "" };
      const activityFuture = await ExecuteActivity(ctx, testActivityHello, "activity");
      await activityFuture.Get(ctx, helloActivityResult);

      let cwo: internal_ChildWorkflowOptions = {
        Bugports: { StartChildWorkflowsOnCanceledContext: false },
        CronSchedule: "",
        Domain: "",
        ExecutionStartToCloseTimeout: Minute,
        ParentClosePolicy: 0,
        TaskList: "",
        TaskStartToCloseTimeout: 0,
        WaitForCancellation: false,
        WorkflowID: "",
        WorkflowIDReusePolicy: 0
      };
      ctx = await WithChildWorkflowOptions(ctx, cwo);
      const helloWorkflowResult = { value: "" };
      const workflowFuture = await ExecuteChildWorkflow(ctx, testWorkflowHello);
      await workflowFuture.Get(ctx, helloWorkflowResult);

      cwo = {
        Bugports: { StartChildWorkflowsOnCanceledContext: false },
        CronSchedule: "",
        Domain: "",
        ExecutionStartToCloseTimeout: Minute,
        ParentClosePolicy: 0,
        TaskList: "",
        TaskStartToCloseTimeout: 0,
        WaitForCancellation: false,
        WorkflowID: "workflow-id",
        WorkflowIDReusePolicy: 0
      };
      ctx = await WithChildWorkflowOptions(ctx, cwo);
      const heartbeatWorkflowResult = { value: "" };
      const heartbeatFuture = await ExecuteChildWorkflow(ctx, testWorkflowHeartbeat, "slow", Hour);
      await heartbeatFuture.Get(ctx, heartbeatWorkflowResult);

      return `${helloActivityResult.value} ${helloWorkflowResult.value} ${heartbeatWorkflowResult.value}`;
    };

    const env = this.NewTestWorkflowEnvironment();
    await env.RegisterWorkflow(workflowFn);
    await env.RegisterWorkflow(testWorkflowHello);
    await env.RegisterWorkflow(testWorkflowHeartbeat);
    await env.RegisterActivity(testActivityHeartbeat);
    await env.RegisterActivity(testActivityHello);

    (await env.OnActivity(testActivityHello, Anything, Anything)).Return("mock_msg", null);
    (await env.OnWorkflow(testWorkflowHeartbeat, Anything, Anything, Anything))
      .Run((a: unknown[]) => {
        const ctx = a[0] as internal_Context;
        const info = GetWorkflowInfo(ctx);
        this.Equal("workflow-id", info.WorkflowExecution.ID);
      })
      .Return("mock_heartbeat", null);

    await env.ExecuteWorkflow(workflowFn);

    this.True(env.IsWorkflowCompleted());
    this.NoError(env.GetWorkflowError());
    const actualResult = { value: "" };
    env.GetWorkflowResult(actualResult);
    this.Equal("mock_msg mock_msg mock_heartbeat", actualResult.value);
  }

  async Test_ChildWorkflow_Mock_Panic_GetChildWorkflowExecution(): Promise<void> {
    const workflowFn = async (ctx: internal_Context): Promise<string> => {
      const cwo: internal_ChildWorkflowOptions = {
        Bugports: { StartChildWorkflowsOnCanceledContext: false },
        CronSchedule: "",
        Domain: "",
        ExecutionStartToCloseTimeout: Minute,
        ParentClosePolicy: 0,
        TaskList: "",
        TaskStartToCloseTimeout: 0,
        WaitForCancellation: false,
        WorkflowID: "",
        WorkflowIDReusePolicy: 0
      };
      ctx = await WithChildWorkflowOptions(ctx, cwo);
      const helloWorkflowResult: { value: string } = { value: "" };
      const childWorkflow = await ExecuteChildWorkflow(ctx, testWorkflowHello);
      await childWorkflow.GetChildWorkflowExecution().Get(ctx, null);
      await childWorkflow.Get(ctx, helloWorkflowResult);
      return helloWorkflowResult.value;
    };

    const env = this.NewTestWorkflowEnvironment();
    await env.RegisterWorkflowWithOptions(testWorkflowHello, {
      Name: "testWorkflowHello",
      EnableShortName: false,
      DisableAlreadyRegisteredCheck: false
    });
    await env.RegisterWorkflow(workflowFn);
    (await env.OnWorkflow(testWorkflowHello, Anything, Anything, Anything))
      .Return("mock_result", null, "extra_argument");
    await env.ExecuteWorkflow(workflowFn);

    this.True(env.IsWorkflowCompleted());
    const workflowError = env.GetWorkflowError();
    this.Error(workflowError);
    this.Equal(
      "mock of testWorkflowHello has incorrect number of returns, expected 2, but actual is 3",
      workflowError!.message
    );
  }

  async Test_ChildWorkflow_StartFailed(): Promise<void> {
    const workflowFn = async (ctx: internal_Context): Promise<string> => {
      const cwo: internal_ChildWorkflowOptions = {
        Bugports: { StartChildWorkflowsOnCanceledContext: false },
        CronSchedule: "",
        Domain: "",
        ExecutionStartToCloseTimeout: 1 * Minute,
        ParentClosePolicy: 0,
        TaskList: "",
        TaskStartToCloseTimeout: 0,
        WaitForCancellation: false,
        WorkflowID: "",
        WorkflowIDReusePolicy: 0
      };
      ctx = await WithChildWorkflowOptions(ctx, cwo);

      try {
        const childWorkflow = await ExecuteChildWorkflow(ctx, testWorkflowHello);
        await childWorkflow.GetChildWorkflowExecution().Get(ctx, null);
      } catch (err) {
        if (!(err instanceof Error)) throw err;
        throw new Error("fail to start child");
      }

      return "should-not-go-here";
    };

    const env = this.NewTestWorkflowEnvironment();
    await env.RegisterWorkflow(workflowFn);
    await env.RegisterWorkflow(testWorkflowHello);
    const workflowMock = await env.OnWorkflow(testWorkflowHello, Anything);
    workflowMock.Return("", ErrMockStartChildWorkflowFailed);
    await env.ExecuteWorkflow(workflowFn);

    this.True(env.IsWorkflowCompleted());
    this.Error(env.GetWorkflowError());
    this.Equal("fail to start child", env.GetWorkflowError()!.message);
  }

  async Test_ChildWorkflow_Listener(): Promise<void> {
    const workflowFn = async (ctx: internal_Context): Promise<string> => {
      ctx = WithActivityOptions(ctx, this.activityOptions);
      const helloActivityResult: { value: string } = { value: "" };
      const activityFuture = await ExecuteActivity(ctx, testActivityHello, "activity");
      await activityFuture.Get(ctx, helloActivityResult);

      const cwo: internal_ChildWorkflowOptions = {
        Bugports: { StartChildWorkflowsOnCanceledContext: false },
        CronSchedule: "",
        Domain: "",
        ExecutionStartToCloseTimeout: Minute,
        ParentClosePolicy: 0,
        TaskList: "",
        TaskStartToCloseTimeout: 0,
        WaitForCancellation: false,
        WorkflowID: "",
        WorkflowIDReusePolicy: 0,
      };
      ctx = await WithChildWorkflowOptions(ctx, cwo);
      const helloWorkflowResult: { value: string } = { value: "" };
      const childWorkflowFuture = await ExecuteChildWorkflow(ctx, testWorkflowHello);
      await childWorkflowFuture.Get(ctx, helloWorkflowResult);

      return `${helloActivityResult.value} ${helloWorkflowResult.value}`;
    };

    const env = this.NewTestWorkflowEnvironment();
    await env.RegisterWorkflow(workflowFn);
    await env.RegisterWorkflowWithOptions(testWorkflowHello, {
      Name: "testWorkflowHello",
      EnableShortName: false,
      DisableAlreadyRegisteredCheck: false,
    });
    await env.RegisterActivity(testActivityHello);

    let childWorkflowName = "";
    const childWorkflowResult: { value: string } = { value: "" };
    env.SetOnChildWorkflowStartedListener((workflowInfo: WorkflowInfo, ctx: internal_Context, args: internal_Values) => {
      childWorkflowName = workflowInfo.WorkflowType.Name;
    });
    env.SetOnChildWorkflowCompletedListener((workflowInfo: WorkflowInfo, result: internal_Value, err: Error | null) => {
      this.NoError(err);
      result.Get(childWorkflowResult);
    });
    await env.ExecuteWorkflow(workflowFn);

    this.True(env.IsWorkflowCompleted());
    this.NoError(env.GetWorkflowError());
    const actualResult: { value: string } = { value: "" };
    env.GetWorkflowResult(actualResult);
    this.Equal("hello_activity hello_world", actualResult.value);
    this.Equal("hello_world", childWorkflowResult.value);
    this.Equal("testWorkflowHello", childWorkflowName);
  }

  async Test_ChildWorkflow_Clock(): Promise<void> {
    const expected = [
      "child: activity completed",
      "parent: 1m timer fired",
      "parent: 10m timer fired",
      "child: 1h timer fired",
      "parent: child completed",
    ];

    const history: string[] = [];
    const addHistory = (event: string): void => {
      history.push(event);
    };

    const childWorkflowFn = async (ctx: internal_Context): Promise<void> => {
      const t1 = NewTimer(ctx, Hour);
      ctx = WithActivityOptions(ctx, this.activityOptions);
      const f1 = await ExecuteActivity(ctx, testActivityHello, "from child workflow");

      const selector = NewSelector(ctx);
      selector
        .AddFuture(t1, (f: internal_Future): void => {
          addHistory("child: 1h timer fired");
        })
        .AddFuture(f1, (f: internal_Future): void => {
          addHistory("child: activity completed");
        });

      await selector.Select(ctx);
      await selector.Select(ctx);

      try {
        await t1.Get(ctx, null);
      } catch (err) {
        if (!(err instanceof Error)) throw err;
      }
      try {
        await f1.Get(ctx, null);
      } catch (err) {
        if (!(err instanceof Error)) throw err;
      }
    };

    const workflowFn = async (ctx: internal_Context): Promise<void> => {
      const t1 = NewTimer(ctx, Minute);
      const t2 = NewTimer(ctx, Minute * 10);

      const cwo: internal_ChildWorkflowOptions = {
        Bugports: { StartChildWorkflowsOnCanceledContext: false },
        CronSchedule: "",
        Domain: "",
        ExecutionStartToCloseTimeout: Hour * 2,
        ParentClosePolicy: 0,
        TaskList: "",
        TaskStartToCloseTimeout: 0,
        WaitForCancellation: false,
        WorkflowID: "",
        WorkflowIDReusePolicy: 0,
      };
      ctx = await WithChildWorkflowOptions(ctx, cwo);
      const f1 = await ExecuteChildWorkflow(ctx, childWorkflowFn);

      const selector = NewSelector(ctx);
      selector
        .AddFuture(f1, (f: internal_Future): void => {
          addHistory("parent: child completed");
        })
        .AddFuture(t1, (f: internal_Future): void => {
          addHistory("parent: 1m timer fired");
        })
        .AddFuture(t2, (f: internal_Future): void => {
          addHistory("parent: 10m timer fired");
        });

      await selector.Select(ctx);
      await selector.Select(ctx);
      await selector.Select(ctx);
    };

    const env = this.NewTestWorkflowEnvironment();
    await env.RegisterWorkflow(workflowFn);
    await env.RegisterWorkflow(childWorkflowFn);
    await env.RegisterActivity(testActivityHello);

    await env.ExecuteWorkflow(workflowFn);

    this.True(env.IsWorkflowCompleted());
    this.NoError(env.GetWorkflowError());
    this.Equal(expected, history);
  }

  async Test_MockActivityWait(): Promise<void> {
    const workflowFn = async (ctx: internal_Context): Promise<void> => {
      const t1 = NewTimer(ctx, Hour);
      ctx = WithActivityOptions(ctx, this.activityOptions);
      const f1 = await ExecuteActivity(ctx, testActivityHello, "mock_delay");

      await NewSelector(ctx)
        .AddFuture(t1, (f: internal_Future) => {})
        .AddFuture(f1, (f: internal_Future) => {})
        .Select(ctx);

      if (f1.IsReady()) {
        return;
      }

      throw new Error("activity takes too long");
    };

    let env = this.NewTestWorkflowEnvironment();
    await env.RegisterWorkflow(workflowFn);
    await env.RegisterActivity(testActivityHello);
    (await env.OnActivity(testActivityHello, Anything, Anything))
      .Return("hello_mock_delayed", null)
      .Once();

    await env.ExecuteWorkflow(workflowFn);
    this.True(env.IsWorkflowCompleted());
    this.NoError(env.GetWorkflowError());
    env.AssertExpectations(this.T());

    env = this.NewTestWorkflowEnvironment();
    await env.RegisterActivity(testActivityHello);
    (await env.OnActivity(testActivityHello, Anything, Anything))
      .After(10 * Minute)
      .Return("hello_mock_delayed", null)
      .Once();
    await env.ExecuteWorkflow(workflowFn);
    this.True(env.IsWorkflowCompleted());
    this.NoError(env.GetWorkflowError());
    env.AssertExpectations(this.T());

    env = this.NewTestWorkflowEnvironment();
    await env.RegisterActivity(testActivityHello);
    (await env.OnActivity(testActivityHello, Anything, Anything))
      .After(2 * Hour)
      .Return("hello_mock_delayed", null)
      .Once();
    await env.ExecuteWorkflow(workflowFn);
    this.True(env.IsWorkflowCompleted());
    this.Error(env.GetWorkflowError());
    env.AssertExpectations(this.T());

    env = this.NewTestWorkflowEnvironment();
    await env.RegisterActivity(testActivityHello);
    await env.ExecuteWorkflow(workflowFn);
    this.True(env.IsWorkflowCompleted());
    this.NoError(env.GetWorkflowError());
  }

  async Test_MockActivityWaitFn(): Promise<void> {
    const workflowFn = async (ctx: internal_Context): Promise<string[]> => {
      let activityCtx = WithActivityOptions(ctx, this.activityOptions);

      const first = { value: "" };
      const second = { value: "" };

      const firstFuture = await ExecuteActivity(activityCtx, testActivityHello, "mock_delay_1");
      await firstFuture.Get(activityCtx, first);

      const secondFuture = await ExecuteActivity(activityCtx, testActivityHello, "mock_delay_2");
      await secondFuture.Get(activityCtx, second);

      return [first.value, second.value];
    };

    const expectResult = (env: TestWorkflowEnvironment, expected: string[]) => {
      const result = { value: [] as string[] };
      env.GetWorkflowResult(result);
      this.Equal(expected, result.value);
    };

    const expectDuration = async (
      env: TestWorkflowEnvironment,
      seconds: number,
      fn: () => Promise<void>,
    ) => {
      const before = env.Now();

      await fn();

      const after = env.Now();
      const expected = Second * seconds;
      const rounded = Math.round((after - before) / Second) * Second;
      this.True(rounded === expected);
    };

    let env = this.NewTestWorkflowEnvironment();
    await env.RegisterWorkflow(workflowFn);
    await env.RegisterActivity(testActivityHello);

    const firstCall = await env.OnActivity(testActivityHello, Anything, "mock_delay_1");
    firstCall.After(Second).Return("one", null).Once();

    const secondCall = await env.OnActivity(testActivityHello, Anything, "mock_delay_2");
    secondCall.After(Minute).Return("two", null).Once();

    await expectDuration(env, 61, async () => {
      await env.ExecuteWorkflow(workflowFn);
    });

    this.True(env.IsWorkflowCompleted());
    this.NoError(env.GetWorkflowError());
    env.AssertExpectations(this.T());
    expectResult(env, ["one", "two"]);

    env = this.NewTestWorkflowEnvironment();
    await env.RegisterWorkflow(workflowFn);
    await env.RegisterActivity(testActivityHello);

    let afterCount = 0;
    let returnCount = 0;
    const afters = [Second, Minute];
    const returns = ["first", "second"];

    const dynamicCall = await env.OnActivity(testActivityHello, Anything, Anything);
    dynamicCall
      .AfterFn(() => {
        const delay = afters[afterCount];
        afterCount++;
        return delay;
      })
      .Return((_ctx: Context, _msg: string) => {
        const value = returns[returnCount];
        returnCount++;
        return value;
      })
      .Twice();

    await expectDuration(env, 61, async () => {
      await env.ExecuteWorkflow(workflowFn);
    });

    this.True(env.IsWorkflowCompleted());
    this.NoError(env.GetWorkflowError());
    env.AssertExpectations(this.T());
    expectResult(env, returns);
  }

  async Test_MockWorkflowWait(): Promise<void> {
    const workflowFn = async (ctx: internal_Context): Promise<void> => {
      const t1 = NewTimer(ctx, Hour);
      const cwo: internal_ChildWorkflowOptions = {
        Bugports: { StartChildWorkflowsOnCanceledContext: false },
        CronSchedule: "",
        Domain: "",
        ExecutionStartToCloseTimeout: Hour,
        Memo: undefined,
        ParentClosePolicy: 0,
        RetryPolicy: undefined,
        SearchAttributes: undefined,
        TaskList: "",
        TaskStartToCloseTimeout: 0,
        WaitForCancellation: false,
        WorkflowID: "",
        WorkflowIDReusePolicy: 0
      };
      ctx = await WithChildWorkflowOptions(ctx, cwo);
      const f1 = await ExecuteChildWorkflow(ctx, testWorkflowHello);

      await NewSelector(ctx)
        .AddFuture(t1, (f: internal_Future) => {})
        .AddFuture(f1, (f: internal_Future) => {})
        .Select(ctx);

      if (f1.IsReady()) {
        return;
      }

      throw new Error("child workflow takes too long");
    };

    let env = this.NewTestWorkflowEnvironment();
    await env.RegisterWorkflow(workflowFn);
    await env.RegisterWorkflow(testWorkflowHello);
    await env.OnWorkflow(testWorkflowHello, Anything).then((call) =>
      call.Return("hello_mock_delayed", null).Once()
    );
    await env.RegisterActivity(testActivityHello);
    await env.ExecuteWorkflow(workflowFn);
    this.True(env.IsWorkflowCompleted());
    this.NoError(env.GetWorkflowError());
    env.AssertExpectations(this.T());

    env = this.NewTestWorkflowEnvironment();
    await env.RegisterWorkflow(workflowFn);
    await env.RegisterWorkflow(testWorkflowHello);
    await env.OnWorkflow(testWorkflowHello, Anything).then((call) =>
      call.After(10 * Minute).Return("hello_mock_delayed", null).Once()
    );
    await env.RegisterActivity(testActivityHello);
    await env.ExecuteWorkflow(workflowFn);
    this.True(env.IsWorkflowCompleted());
    this.NoError(env.GetWorkflowError());
    env.AssertExpectations(this.T());

    env = this.NewTestWorkflowEnvironment();
    await env.RegisterWorkflow(workflowFn);
    await env.RegisterWorkflow(testWorkflowHello);
    await env.OnWorkflow(testWorkflowHello, Anything).then((call) =>
      call.After(2 * Hour).Return("hello_mock_delayed", null).Once()
    );
    await env.RegisterActivity(testActivityHello);
    await env.ExecuteWorkflow(workflowFn);
    this.True(env.IsWorkflowCompleted());
    this.Error(env.GetWorkflowError());
    env.AssertExpectations(this.T());

    env = this.NewTestWorkflowEnvironment();
    await env.RegisterWorkflow(workflowFn);
    await env.RegisterWorkflow(testWorkflowHello);
    await env.RegisterActivity(testActivityHello);
    await env.ExecuteWorkflow(workflowFn);
    this.True(env.IsWorkflowCompleted());
    this.NoError(env.GetWorkflowError());
  }

  async Test_MockPanic(): Promise<void> {
    const oldLogger = this.GetLogger();
    this.SetLogger(NoopLogger());
    const env = this.NewTestWorkflowEnvironment();
    (await env.OnActivity(testActivityHello, Anything, Anything))
      .Return("hello_mock_panic", null)
      .Run((args: unknown[]) => {
        throw "mock-panic";
      });
    await env.RegisterWorkflow(testWorkflowHello);
    await env.RegisterActivity(testActivityHello);
    try {
      await env.ExecuteWorkflow(testWorkflowHello);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
    }
    this.True(env.IsWorkflowCompleted());
    const err = env.GetWorkflowError();
    this.Error(err);
    this.Contains(err!.message, "mock-panic");
    env.AssertExpectations(this.T());
    this.SetLogger(oldLogger);
  }

  async Test_ChildWithChild(): Promise<void> {
    const env = this.NewTestWorkflowEnvironment();

    const childWorkflowFn = async (ctx: internal_Context): Promise<void> => {
      const t1 = NewTimer(ctx, 1 * Hour);
      const cwo: internal_ChildWorkflowOptions = {
        Bugports: { StartChildWorkflowsOnCanceledContext: false },
        CronSchedule: "",
        Domain: "",
        ExecutionStartToCloseTimeout: 1 * Hour,
        ParentClosePolicy: 0,
        TaskList: "",
        TaskStartToCloseTimeout: 0,
        WaitForCancellation: false,
        WorkflowID: "",
        WorkflowIDReusePolicy: 0
      };
      ctx = await WithChildWorkflowOptions(ctx, cwo);
      const f1 = await ExecuteChildWorkflow(ctx, testWorkflowHello);

      await (await NewSelector(ctx)
        .AddFuture(t1, (f: internal_Future) => {})
        .AddFuture(f1, (f: internal_Future) => {}))
        .Select(ctx);

      if (f1.IsReady()) {
        return;
      }

      throw new Error("child workflow takes too long");
    };

    const workflowFn = async (ctx: internal_Context): Promise<void> => {
      const t1 = NewTimer(ctx, 1 * Hour);
      const cwo: internal_ChildWorkflowOptions = {
        Bugports: { StartChildWorkflowsOnCanceledContext: false },
        CronSchedule: "",
        Domain: "",
        ExecutionStartToCloseTimeout: 1 * Hour,
        ParentClosePolicy: 0,
        TaskList: "",
        TaskStartToCloseTimeout: 0,
        WaitForCancellation: false,
        WorkflowID: "",
        WorkflowIDReusePolicy: 0
      };
      ctx = await WithChildWorkflowOptions(ctx, cwo);
      const f1 = await ExecuteChildWorkflow(ctx, childWorkflowFn);

      await (await NewSelector(ctx)
        .AddFuture(t1, (f: internal_Future) => {})
        .AddFuture(f1, (f: internal_Future) => {}))
        .Select(ctx);

      if (f1.IsReady()) {
        await f1.Get(ctx, null);
        return;
      }

      throw new Error("child workflow takes too long");
    };

    await env.RegisterWorkflow(childWorkflowFn);
    await env.RegisterWorkflow(workflowFn);
    await env.RegisterWorkflow(testWorkflowHello);
    await env.RegisterActivity(testActivityHello);
    (await env.OnWorkflow(testWorkflowHello, Anything))
      .Return("hello_mock_delayed", null)
      .Once();
    await env.ExecuteWorkflow(workflowFn);
    this.True(env.IsWorkflowCompleted());
    this.NoError(env.GetWorkflowError());
    env.AssertExpectations(this.T());

    let env2 = this.NewTestWorkflowEnvironment();
    await env2.RegisterWorkflow(workflowFn);
    await env2.RegisterWorkflow(childWorkflowFn);
    await env2.RegisterWorkflow(testWorkflowHello);
    await env2.RegisterActivity(testActivityHello);

    (await env2.OnWorkflow(testWorkflowHello, Anything))
      .After(10 * Minute)
      .Return("hello_mock_delayed", null)
      .Once();
    await env2.ExecuteWorkflow(workflowFn);
    this.True(env2.IsWorkflowCompleted());
    this.NoError(env2.GetWorkflowError());
    env2.AssertExpectations(this.T());

    env2 = this.NewTestWorkflowEnvironment();
    await env2.RegisterWorkflow(workflowFn);
    await env2.RegisterWorkflow(childWorkflowFn);
    await env2.RegisterWorkflow(testWorkflowHello);
    await env2.RegisterActivity(testActivityHello);

    (await env2.OnWorkflow(testWorkflowHello, Anything))
      .After(2 * Hour)
      .Return("hello_mock_delayed", null)
      .Once();
    await env2.ExecuteWorkflow(workflowFn);
    this.True(env2.IsWorkflowCompleted());
    this.Error(env2.GetWorkflowError());
    env2.AssertExpectations(this.T());

    env2 = this.NewTestWorkflowEnvironment();
    await env2.RegisterWorkflow(workflowFn);
    await env2.RegisterWorkflow(childWorkflowFn);
    await env2.RegisterWorkflow(testWorkflowHello);
    await env2.RegisterActivity(testActivityHello);

    await env2.ExecuteWorkflow(workflowFn);
    this.True(env2.IsWorkflowCompleted());
    this.NoError(env2.GetWorkflowError());
  }

  async Test_GetVersion(): Promise<void> {
    const oldActivity = (_ctx: Context, msg: string): string => {
      return "hello" + "_" + msg;
    };

    const newActivity = (_ctx: Context, msg: string): string => {
      return "hello" + "_" + msg;
    };

    const workflowFn = async (ctx: internal_Context): Promise<void> => {
      ctx = WithActivityOptions(ctx, this.activityOptions);
      let f!: internal_Future;
      const v = await GetVersion(ctx, "test_change_id", -1, 2);

      if (v === -1) {
        f = await ExecuteActivity(ctx, oldActivity, "ols_msg");
      } else {
        f = await ExecuteActivity(ctx, newActivity, "new_msg");
      }

      await f.Get(ctx, null);

      const wfInfo = GetWorkflowInfo(ctx);
      expect(wfInfo.SearchAttributes).not.toBeNull();

      const indexedFields = wfInfo.SearchAttributes!.indexedFields!;
      const changeVersionsBytes = indexedFields.get(CadenceChangeVersion);
      const ok = indexedFields.has(CadenceChangeVersion);
      expect(ok).toBe(true);

      let changeVersions: string[] = [];
      let unmarshalError: Error | null = null;
      try {
        changeVersions = JSON.parse(changeVersionsBytes!.toString("utf8"));
      } catch (err) {
        if (!(err instanceof Error)) throw err;
        unmarshalError = err;
      }

      expect(unmarshalError).toBeNull();
      expect(changeVersions).toHaveLength(1);
      expect(changeVersions[0]).toEqual("test_change_id-2");
    };

    const env = this.NewTestWorkflowEnvironment();
    await env.RegisterWorkflow(workflowFn);
    await env.RegisterActivity(oldActivity);
    await env.RegisterActivity(newActivity);
    (await env.OnActivity(newActivity, Anything, "new_msg"))
      .Return("hello new_mock_msg", null)
      .Once();
    await env.ExecuteWorkflow(workflowFn);

    expect(env.IsWorkflowCompleted()).toBe(true);
    expect(env.GetWorkflowError()).toBeNull();
    env.AssertExpectations(this.T());
  }

  async Test_GetVersion_ExecuteWithMinVersion(): Promise<void> {
    const oldActivity = (ctx: Context, msg: string): string => {
      return "hello" + "_" + msg;
    };

    const newActivity = (ctx: Context, msg: string): string => {
      return "hello" + "_" + msg;
    };

    const workflowFn = async (ctx: internal_Context): Promise<void> => {
      ctx = WithActivityOptions(ctx, this.activityOptions);
      const v = await GetVersion(ctx, "test_change_id", -1, 2, ExecuteWithMinVersion());

      let f!: internal_Future;
      if (v === -1) {
        f = await ExecuteActivity(ctx, oldActivity, "ols_msg");
      } else {
        f = await ExecuteActivity(ctx, newActivity, "new_msg");
      }

      await f.Get(ctx, null);

      const wfInfo = GetWorkflowInfo(ctx);
      this.Nil(wfInfo.SearchAttributes!);
    };

    const env = this.NewTestWorkflowEnvironment();

    try {
      await env.RegisterWorkflow(workflowFn);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
    }

    try {
      await env.RegisterActivity(oldActivity);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
    }

    try {
      await env.RegisterActivity(newActivity);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
    }

    (await env.OnActivity(oldActivity, Anything, "ols_msg")).Return("hello_ols_msg", null).Once();

    try {
      await env.ExecuteWorkflow(workflowFn);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
    }

    this.True(env.IsWorkflowCompleted());
    this.Nil(env.GetWorkflowError());
    env.AssertExpectations(this.T());
  }

  async Test_GetVersion_ExecuteWithVersion(): Promise<void> {
    const oldActivity = (ctx: Context, msg: string): string => "hello" + "_" + msg;
    const newActivity = (ctx: Context, msg: string): string => "hello" + "_" + msg;

    const workflowFn = async (ctx: internal_Context): Promise<void> => {
      ctx = WithActivityOptions(ctx, this.activityOptions);
      const v = await GetVersion(ctx, "test_change_id", -1, 2, ExecuteWithVersion(1));

      let f: internal_Future;
      if (v === -1) {
        f = await ExecuteActivity(ctx, oldActivity, "ols_msg");
      } else {
        f = await ExecuteActivity(ctx, newActivity, "new_msg");
      }
      await f.Get(ctx, undefined);

      const wfInfo = GetWorkflowInfo(ctx);
      this.NotNil(wfInfo.SearchAttributes);

      const indexedFields = wfInfo.SearchAttributes!.indexedFields;
      const changeVersionsBytes = indexedFields?.get(CadenceChangeVersion);
      const ok = indexedFields?.has(CadenceChangeVersion) ?? false;
      this.True(ok);

      const changeVersions = JSON.parse(changeVersionsBytes!.toString("utf8")) as string[];
      this.NoError(null);
      this.ElementsMatch(changeVersions, ["test_change_id-1"]);
    };

    const env = this.NewTestWorkflowEnvironment();
    await env.RegisterWorkflow(workflowFn);
    await env.RegisterActivity(oldActivity);
    await env.RegisterActivity(newActivity);
    const call = await env.OnActivity(newActivity, Anything, "new_msg");
    call.Return("hello new_mock_msg", null).Once();
    await env.ExecuteWorkflow(workflowFn);

    this.True(env.IsWorkflowCompleted());
    this.Nil(env.GetWorkflowError());
    env.AssertExpectations(this.T());
  }

  async Test_MockGetVersion_ExecuteWithVersion(): Promise<void> {
    const oldActivity = (ctx: Context, msg: string) => "hello" + "_" + msg;
    const newActivity = (ctx: Context, msg: string) => "hello" + "_" + msg;

    const workflowFn = async (ctx: internal_Context): Promise<string> => {
      ctx = WithActivityOptions(ctx, this.activityOptions);

      let f: internal_Future;
      const v1 = await GetVersion(ctx, "change_1", -1, 2, ExecuteWithVersion(1));
      if (v1 === -1) {
        f = await ExecuteActivity(ctx, oldActivity, "old1");
      } else {
        f = await ExecuteActivity(ctx, newActivity, "new1");
      }

      const ret1 = { value: "" };
      await f.Get(ctx, ret1);

      const v2 = await GetVersion(ctx, "change_2", -1, 2);
      if (v2 === -1) {
        f = await ExecuteActivity(ctx, oldActivity, "old2");
      } else {
        f = await ExecuteActivity(ctx, newActivity, "new2");
      }

      const ret2 = { value: "" };
      await f.Get(ctx, ret2);

      const wfInfo = GetWorkflowInfo(ctx);
      this.NotNil(wfInfo.SearchAttributes);
      const changeVersionsBytes = wfInfo.SearchAttributes!.indexedFields?.get(CadenceChangeVersion);
      this.True(changeVersionsBytes != null);

      const changeVersions = JSON.parse(changeVersionsBytes!.toString("utf8")) as string[];
      this.ElementsMatch(changeVersions, ["change_2-2", "change_1--1"]);

      return ret1.value + ret2.value;
    };

    const env = this.NewTestWorkflowEnvironment();
    await env.RegisterWorkflow(workflowFn);
    await env.RegisterActivity(oldActivity);
    await env.RegisterActivity(newActivity);

    env.OnGetVersion("change_1", -1, 2).Return(-1);
    env.OnGetVersion("change_2", -1, 2).Return(2);
    await env.ExecuteWorkflow(workflowFn);

    this.True(env.IsWorkflowCompleted());
    this.Nil(env.GetWorkflowError());
    const ret = { value: "" };
    env.GetWorkflowResult(ret);
    this.Equal("hello_old1hello_new2", ret.value);
    env.AssertExpectations(this.T());
  }

  async Test_MockGetVersion_ExecuteWithMinVersion(): Promise<void> {
    const oldActivity = (ctx: Context, msg: string): string => {
      return "hello" + "_" + msg;
    };
    const newActivity = (ctx: Context, msg: string): string => {
      return "hello" + "_" + msg;
    };
    const workflowFn = async (ctx: internal_Context): Promise<string> => {
      ctx = WithActivityOptions(ctx, this.activityOptions);
      let f: internal_Future;
      const v1 = await GetVersion(ctx, "change_1", -1, 2);
      if (v1 === -1) {
        f = await ExecuteActivity(ctx, oldActivity, "old1");
      } else {
        f = await ExecuteActivity(ctx, newActivity, "new1");
      }
      const ret1Box: { value: string } = { value: "" };
      await f.Get(ctx, ret1Box);
      const ret1 = ret1Box.value;

      const v2 = await GetVersion(ctx, "change_2", -1, 2, ExecuteWithMinVersion());
      if (v2 === -1) {
        f = await ExecuteActivity(ctx, oldActivity, "old2");
      } else {
        f = await ExecuteActivity(ctx, newActivity, "new2");
      }
      const ret2Box: { value: string } = { value: "" };
      await f.Get(ctx, ret2Box);
      const ret2 = ret2Box.value;

      const wfInfo = GetWorkflowInfo(ctx);
      expect(wfInfo.SearchAttributes).not.toBeNull();
      const indexedFields = wfInfo.SearchAttributes!.indexedFields!;
      const changeVersionsBytes = indexedFields.get(CadenceChangeVersion);
      const ok = indexedFields.has(CadenceChangeVersion);
      expect(ok).toBe(true);
      const changeVersions = JSON.parse(changeVersionsBytes!.toString("utf8")) as string[];
      expect(changeVersions).toHaveLength(2);
      expect(changeVersions).toEqual(expect.arrayContaining(["change_2-2", "change_1--1"]));

      return ret1 + ret2;
    };

    const env = this.NewTestWorkflowEnvironment();
    await env.RegisterWorkflow(workflowFn);
    await env.RegisterActivity(oldActivity);
    await env.RegisterActivity(newActivity);

    env.OnGetVersion("change_1", -1, 2).Return(
      (changeID: string, minSupported: internal_Version, maxSupported: internal_Version) => -1,
    );
    env.OnGetVersion(Anything, -1, 2).Return(
      (changeID: string, minSupported: internal_Version, maxSupported: internal_Version) => 2,
    );
    await env.ExecuteWorkflow(workflowFn);

    expect(env.IsWorkflowCompleted()).toBe(true);
    expect(env.GetWorkflowError()).toBeNull();
    const retBox: { value: string } = { value: "" };
    env.GetWorkflowResult(retBox);
    expect(retBox.value).toEqual("hello_old1hello_new2");
    env.AssertExpectations(this.T());
  }

  async Test_MockGetVersion(): Promise<void> {
    const oldActivity = (ctx: Context, msg: string): string => {
      return "hello" + "_" + msg;
    };

    const newActivity = (ctx: Context, msg: string): string => {
      return "hello" + "_" + msg;
    };

    const workflowFn = async (ctx: internal_Context): Promise<string> => {
      ctx = WithActivityOptions(ctx, this.activityOptions);

      let f!: internal_Future;
      const v1 = await GetVersion(ctx, "change_1", -1, 2);
      if (v1 === -1) {
        f = await ExecuteActivity(ctx, oldActivity, "old1");
      } else {
        f = await ExecuteActivity(ctx, newActivity, "new1");
      }

      const ret1Box: { value: string } = { value: "" };
      await f.Get(ctx, ret1Box);

      const v2 = await GetVersion(ctx, "change_2", -1, 2);
      if (v2 === -1) {
        f = await ExecuteActivity(ctx, oldActivity, "old2");
      } else {
        f = await ExecuteActivity(ctx, newActivity, "new2");
      }

      const ret2Box: { value: string } = { value: "" };
      await f.Get(ctx, ret2Box);

      const wfInfo = GetWorkflowInfo(ctx);
      expect(wfInfo.SearchAttributes).not.toBeNull();

      const indexedFields = Object.fromEntries(wfInfo.SearchAttributes!.indexedFields ?? new Map());
      const changeVersionsBytes = indexedFields[CadenceChangeVersion];
      expect(CadenceChangeVersion in indexedFields).toBe(true);

      let changeVersions: string[] = [];
      let unmarshalError: unknown = null;
      try {
        changeVersions = JSON.parse(changeVersionsBytes.toString("utf8"));
      } catch (err) {
        unmarshalError = err;
      }
      expect(unmarshalError).toBeNull();
      expect(changeVersions).toEqual(["change_2-2", "change_1--1"]);

      return ret1Box.value + ret2Box.value;
    };

    const env = this.NewTestWorkflowEnvironment();
    await env.RegisterWorkflow(workflowFn);
    await env.RegisterActivity(oldActivity);
    await env.RegisterActivity(newActivity);

    env.OnGetVersion("change_1", -1, 2).Return(
      (changeID: string, minSupported: internal_Version, maxSupported: internal_Version): internal_Version => -1
    );
    env.OnGetVersion(Anything, -1, 2).Return(2);

    await env.ExecuteWorkflow(workflowFn);

    expect(env.IsWorkflowCompleted()).toBe(true);
    expect(env.GetWorkflowError()).toBeNull();

    const retBox: { value: string } = { value: "" };
    env.GetWorkflowResult(retBox);
    expect(retBox.value).toEqual("hello_old1hello_new2");

    env.AssertExpectations(this.T());
  }

  async Test_UpsertSearchAttributes_ReservedKey(): Promise<void> {
    const workflowFn = async (ctx: internal_Context): Promise<void> => {
      const attr = {
        [CadenceChangeVersion]: "some change version",
      };
      let err: Error | null = null;
      try {
        await UpsertSearchAttributes(ctx, attr);
      } catch (caught) {
        if (!(caught instanceof Error)) throw caught;
        err = caught;
      }
      expect(err).not.toBeNull();

      const wfInfo = GetWorkflowInfo(ctx);
      expect(wfInfo.SearchAttributes!).toBeNull();
    };

    const env = this.NewTestWorkflowEnvironment();
    await env.RegisterWorkflow(workflowFn);

    await env.ExecuteWorkflow(workflowFn);
    expect(env.IsWorkflowCompleted()).toBe(true);
    expect(env.GetWorkflowError()).toBeNull();
    env.AssertExpectations(this.T());
  }

  async Test_MockUpsertSearchAttributes(): Promise<void> {
    const workflowFn = async (ctx: internal_Context): Promise<void> => {
      const attr: Record<string, unknown> = {};
      let err: Error | null = null;
      try {
        await UpsertSearchAttributes(ctx, attr);
      } catch (caught) {
        if (!(caught instanceof Error)) throw caught;
        err = caught;
      }
      this.Error(err);

      let wfInfo = GetWorkflowInfo(ctx);
      this.Nil(wfInfo.SearchAttributes);

      attr["CustomIntField"] = 1;
      await UpsertSearchAttributes(ctx, attr);
      this.NoError(null);

      wfInfo = GetWorkflowInfo(ctx);
      this.NotNil(wfInfo.SearchAttributes);
      const valBytes = wfInfo.SearchAttributes!.indexedFields!.get("CustomIntField")!;
      const result: { value: number } = { value: 0 };
      NewValue(valBytes).Get(result);
      this.Equal(1, result.value);
    };

    let env = this.NewTestWorkflowEnvironment();
    await env.RegisterWorkflow(workflowFn);

    await env.ExecuteWorkflow(workflowFn);
    this.True(env.IsWorkflowCompleted());
    this.Nil(env.GetWorkflowError());
    env.AssertExpectations(this.T());

    env = this.NewTestWorkflowEnvironment();
    env.OnUpsertSearchAttributes({}).Return(new Error("empty")).Once();
    env.OnUpsertSearchAttributes({ CustomIntField: 1 }).Return(null).Once();

    await env.ExecuteWorkflow(workflowFn);
    this.True(env.IsWorkflowCompleted());
    this.Nil(env.GetWorkflowError());
    env.AssertExpectations(this.T());

    env = this.NewTestWorkflowEnvironment();
    env.OnUpsertSearchAttributes({}).Once();
    env.OnUpsertSearchAttributes({ CustomIntField: 1 }).Once();

    await env.ExecuteWorkflow(workflowFn);
    this.True(env.IsWorkflowCompleted());
    this.Nil(env.GetWorkflowError());
    env.AssertExpectations(this.T());
  }

  async Test_MockUpsertSearchAttributes_OnError(): Promise<void> {
    const workflowFn = async (ctx: internal_Context): Promise<void> => {
      const attr: Record<string, unknown> = {};
      attr["CustomIntField"] = 1;

      try {
        await UpsertSearchAttributes(ctx, attr);
        this.Error(null);
      } catch (err) {
        if (!(err instanceof Error)) throw err;
        this.Error(err);
        throw err;
      }
    };

    const env = this.NewTestWorkflowEnvironment();
    env.OnUpsertSearchAttributes({ CustomIntField: 1 }).Return(new Error("test error")).Once();

    await env.ExecuteWorkflow(workflowFn);
    this.True(env.IsWorkflowCompleted());
    this.Error(env.GetWorkflowError());
    env.AssertExpectations(this.T());
  }

  async Test_ActivityWithThriftTypes(): Promise<void> {
    const actualValues: string[] = [];
    const retVal = new WorkflowExecution({
      workflowId: StringPtr("retwID2"),
      runId: StringPtr("retrID2"),
    });

    const activitySingleFn = async (_ctx: Context, wf: WorkflowExecution): Promise<WorkflowExecution> => {
      actualValues.push(wf.workflowId ?? "");
      actualValues.push(wf.runId ?? "");
      return retVal;
    };

    let input = new WorkflowExecution({
      workflowId: StringPtr("wID1"),
      runId: StringPtr("rID1"),
    });
    let env = this.NewTestActivityEnvironment();
    await env.RegisterActivity(activitySingleFn);
    let blob = await env.ExecuteActivity(activitySingleFn, input);
    this.NoError(null);
    const ret = new Ref<WorkflowExecution | undefined>(new WorkflowExecution({}));
    blob.Get(ret);
    this.Equal(retVal, ret.value);

    const activityDoubleArgFn = async (
      _ctx: Context,
      wf: WorkflowExecution,
      t: WorkflowType,
    ): Promise<WorkflowExecution> => {
      actualValues.push(wf.workflowId ?? "");
      actualValues.push(wf.runId ?? "");
      actualValues.push(t.name ?? "");
      return retVal;
    };

    input = new WorkflowExecution({
      workflowId: StringPtr("wID2"),
      runId: StringPtr("rID3"),
    });
    const wt = new WorkflowType({ name: StringPtr("wType") });
    env = this.NewTestActivityEnvironment();
    await env.RegisterActivity(activityDoubleArgFn);
    blob = await env.ExecuteActivity(activityDoubleArgFn, input, wt);
    this.NoError(null);
    blob.Get(ret);
    this.Equal(retVal, ret.value);

    const expectedValues = [
      "wID1",
      "rID1",
      "wID2",
      "rID3",
      "wType",
    ];
    this.EqualValues(expectedValues, actualValues);
  }

  async Test_ActivityRegistration(): Promise<void> {
    const activityFn = (msg: string): string => msg;
    const activityAlias = "some-random-activity-alias";

    const env = this.NewTestActivityEnvironment();
    try {
      await env.RegisterActivityWithOptions(activityFn, {
        Name: activityAlias,
        DisableAlreadyRegisteredCheck: false,
        EnableAutoHeartbeat: false,
        EnableShortName: false,
      });
    } catch (err) {
      if (!(err instanceof Error)) throw err;
    }

    const input = "some random input";

    let encodedValue = await env.ExecuteActivity(activityFn, input);
    const output = { value: "" };
    encodedValue.Get(output);
    this.Equal(input, output.value);

    encodedValue = await env.ExecuteActivity(activityAlias, input);
    output.value = "";
    encodedValue.Get(output);
    this.Equal(input, output.value);
  }

  async Test_WorkflowRegistration(): Promise<void> {
    const workflowFn = (_ctx: internal_Context): void => {
    };
    const workflowAlias = "some-random-workflow-alias";

    let env = this.NewTestWorkflowEnvironment();

    await env.ExecuteWorkflow(workflowFn);

    env = this.NewTestWorkflowEnvironment();
    await env.RegisterWorkflowWithOptions(workflowFn, {
      Name: workflowAlias,
      DisableAlreadyRegisteredCheck: false,
      EnableShortName: false
    });

    await env.ExecuteWorkflow(workflowAlias);
  }

  async Test_ActivityFriendlyName(): Promise<void> {
    const activityFn = (msg: string): string => {
      return "hello_" + msg;
    };

    const workflowFn = async (ctx: internal_Context): Promise<void> => {
      ctx = WithActivityOptions(ctx, this.activityOptions);
      const resultBox: { value: string } = { value: "" };

      const firstFuture = await ExecuteActivity(ctx, activityFn, "friendly_name");
      await firstFuture.Get(ctx, resultBox);

      const secondFuture = await ExecuteActivity(ctx, "foo", "friendly_name");
      await secondFuture.Get(ctx, resultBox);
    };

    const env = this.NewTestWorkflowEnvironment();
    await env.RegisterWorkflow(workflowFn).catch((err) => {
      if (!(err instanceof Error)) throw err;
    });
    await env.RegisterActivityWithOptions(activityFn, {
      Name: "foo",
      EnableShortName: false,
      DisableAlreadyRegisteredCheck: false,
      EnableAutoHeartbeat: false,
    }).catch((err) => {
      if (!(err instanceof Error)) throw err;
    });

    let called: string[] = [];
    env.SetOnActivityStartedListener(
      (activityInfo: cadence_internal_ActivityInfo, ctx: Context, args: internal_Values) => {
        called.push(activityInfo.ActivityType.Name);
      },
    );

    await env.ExecuteWorkflow(workflowFn).catch((err) => {
      if (!(err instanceof Error)) throw err;
    });

    this.True(env.IsWorkflowCompleted());
    this.NoError(env.GetWorkflowError());
    this.Equal(2, called.length);
    this.Equal("foo", called[0]);
    this.Equal("foo", called[1]);
  }

  async Test_WorkflowFriendlyName(): Promise<void> {
    const workflowFn = async (ctx: internal_Context): Promise<void> => {
      const cwo: internal_ChildWorkflowOptions = {
        Bugports: { StartChildWorkflowsOnCanceledContext: false },
        CronSchedule: "",
        Domain: "",
        ExecutionStartToCloseTimeout: 0,
        ParentClosePolicy: 0,
        TaskList: "",
        TaskStartToCloseTimeout: 0,
        WaitForCancellation: false,
        WorkflowID: "",
        WorkflowIDReusePolicy: 0
      };
      ctx = await WithChildWorkflowOptions(ctx, cwo);
      const result: { value: string } = { value: "" };
      const firstChild = await ExecuteChildWorkflow(ctx, testWorkflowHello);
      await firstChild.Get(ctx, result);
      const secondChild = await ExecuteChildWorkflow(ctx, "testWorkflowHello");
      await secondChild.Get(ctx, result);
    };

    const env = this.NewTestWorkflowEnvironment();
    await env.RegisterWorkflow(workflowFn);
    await env.RegisterWorkflowWithOptions(testWorkflowHello, {
      Name: "testWorkflowHello",
      EnableShortName: false,
      DisableAlreadyRegisteredCheck: false
    });
    await env.RegisterActivity(testActivityHello);
    const called: string[] = [];
    env.SetOnChildWorkflowStartedListener((workflowInfo: WorkflowInfo, ctx: internal_Context, args: internal_Values): void => {
      called.push(workflowInfo.WorkflowType.Name);
    });

    await env.ExecuteWorkflow(workflowFn);

    this.True(env.IsWorkflowCompleted());
    this.NoError(env.GetWorkflowError());
    this.Equal(2, called.length);
    this.Equal("testWorkflowHello", called[0]);
    this.Equal("testWorkflowHello", called[1]);
  }

  async Test_WorkflowHeaderContext(): Promise<void> {
    const workflowFn = async (ctx: internal_Context): Promise<void> => {
      const value = ctx.Value(testHeader);
      if (typeof value === "string") {
        this.Equal("test-data", value);
      } else {
        throw new Error("context did not propagate to workflow");
      }

      const cwo: internal_ChildWorkflowOptions = {
        Bugports: { StartChildWorkflowsOnCanceledContext: false },
        CronSchedule: "",
        Domain: "",
        ExecutionStartToCloseTimeout: 0,
        ParentClosePolicy: 0,
        TaskList: "",
        TaskStartToCloseTimeout: 0,
        WaitForCancellation: false,
        WorkflowID: "",
        WorkflowIDReusePolicy: 0,
      };
      ctx = await WithChildWorkflowOptions(ctx, cwo);

      const resultBox: { value: string } = { value: "" };
      const childWorkflowFuture = await ExecuteChildWorkflow(ctx, testWorkflowContext);
      await childWorkflowFuture.Get(ctx, resultBox);
      this.Equal("test-data", resultBox.value);

      const ao = new internal_ActivityOptions({
        ActivityID: "",
        HeartbeatTimeout: 20 * Second,
        ScheduleToCloseTimeout: 0,
        ScheduleToStartTimeout: Minute,
        StartToCloseTimeout: Minute,
        TaskList: "",
        WaitForCancellation: false,
      });
      ctx = WithActivityOptions(ctx, ao);

      const activityFuture = await ExecuteActivity(ctx, testActivityContext);
      await activityFuture.Get(ctx, resultBox);
      this.Equal("test-data", resultBox.value);
    };

    this.SetContextPropagators([
      await NewStringMapPropagator([testHeader]),
    ]);
    this.SetHeader(new Header({
      fields: new Map([[testHeader, Buffer.from("test-data")]]),
    }));

    const env = this.NewTestWorkflowEnvironment();
    await env.RegisterWorkflow(workflowFn);
    await env.ExecuteWorkflow(testWorkflowContext);

    this.True(env.IsWorkflowCompleted());
    this.NoError(env.GetWorkflowError());
  }

  async Test_ChildWorkflowContextPropagation(): Promise<void> {
    const childWorkflowFn = async (ctx: internal_Context): Promise<void> => {
      const value = ctx.Value(testHeader);
      if (typeof value === "string") {
        this.Equal("test-data-for-child", value);
      } else {
        throw new Error("context did not propagate to child workflow");
      }
    };

    const workflowFn = async (ctx: internal_Context): Promise<void> => {
      const value = ctx.Value(testHeader);
      if (typeof value === "string") {
        this.Equal("test-data", value);
      } else {
        throw new Error("context did not propagate to workflow");
      }

      const cwo: internal_ChildWorkflowOptions = {
        Bugports: { StartChildWorkflowsOnCanceledContext: false },
        CronSchedule: "",
        Domain: "",
        ExecutionStartToCloseTimeout: Hour,
        ParentClosePolicy: 0,
        TaskList: "",
        TaskStartToCloseTimeout: 0,
        WaitForCancellation: false,
        WorkflowID: "",
        WorkflowIDReusePolicy: 0,
      };
      ctx = await WithChildWorkflowOptions(ctx, cwo);
      const childCtx = WithValue(ctx, testHeader, "test-data-for-child");
      const childWorkflow = await ExecuteChildWorkflow(childCtx, childWorkflowFn);
      await childWorkflow.Get(childCtx, undefined);
    };

    this.SetContextPropagators([
      await NewStringMapPropagator([testHeader]),
    ]);
    this.SetHeader(new Header({
      fields: new Map([
        [testHeader, Buffer.from("test-data")],
      ]),
    }));

    const env = this.NewTestWorkflowEnvironment();
    await env.RegisterWorkflow(workflowFn);
    await env.RegisterWorkflow(childWorkflowFn);
    await env.ExecuteWorkflow(workflowFn);

    this.True(env.IsWorkflowCompleted());
    this.NoError(env.GetWorkflowError());
  }

  async Test_ActivityFullyQualifiedName(): Promise<void> {
    this.T().Skip();

    const workflowFn = async (ctx: internal_Context): Promise<void> => {
      ctx = WithActivityOptions(ctx, this.activityOptions);
      const result = { value: "" };
      const fut = await ExecuteActivity(ctx, getFunctionName(testActivityHello), "friendly_name");
      await fut.Get(ctx, result);
    };

    const env = this.NewTestWorkflowEnvironment();
    await env.RegisterWorkflow(workflowFn);
    await env.ExecuteWorkflow(workflowFn);
    this.False(env.IsWorkflowCompleted());
    this.Contains(env.GetWorkflowError()!.message, "Unable to find activityType");
  }

  async Test_WorkflowUnknownName(): Promise<void> {
    try {
      const env = this.NewTestWorkflowEnvironment();

      await env.ExecuteWorkflow(getFunctionName(testWorkflowHello));
      this.Fail("Should have panic'ed at ExecuteWorkflow");
    } catch (r) {
      if (r != null) {
        expect((r as Error).message).toContain("unable to find workflow type");
      }
    }
  }

  async Test_QueryWorkflow(): Promise<void> {
    const queryType = "state";
    const stateWaitSignal = "wait for signal";
    const stateWaitActivity = "wait for activity";
    const stateDone = "done";

    const workflowFn = async (ctx: internal_Context): Promise<void> => {
      let state = "";
      await SetQueryHandler(ctx, queryType, (queryInput: string): string => {
        return queryInput + state;
      });

      state = stateWaitSignal;
      const signalData: { value: string } = { value: "" };
      await GetSignalChannel(ctx, "query-signal").Receive(ctx, signalData);

      state = stateWaitActivity;
      ctx = WithActivityOptions(ctx, this.activityOptions);
      const activityFuture = await ExecuteActivity(ctx, testActivityHello, "mock_delay");
      await activityFuture.Get(ctx, undefined);

      state = stateDone;
    };

    const env = this.NewTestWorkflowEnvironment();
    await env.RegisterWorkflow(workflowFn);
    await env.RegisterActivity(testActivityHello);

    const verifyStateWithQuery = async (expected: string): Promise<void> => {
      const encodedValue = await env.QueryWorkflow(queryType, "input");
      this.NotNil(encodedValue);
      const state: { value: string } = { value: "" };
      encodedValue.Get(state);
      this.Equal("input" + expected, state.value);
    };

    env.RegisterDelayedCallback(async () => {
      await verifyStateWithQuery(stateWaitSignal);
      env.SignalWorkflow("query-signal", "hello-query");
    }, Hour);

    (await env.OnActivity(testActivityHello, Anything, Anything))
      .After(Hour)
      .Return("hello_mock", undefined);

    env.SetOnActivityStartedListener(async (
      activityInfo: cadence_internal_ActivityInfo,
      ctx: Context,
      args: internal_Values
    ) => {
      await verifyStateWithQuery(stateWaitActivity);
    });

    await env.ExecuteWorkflow(workflowFn);

    this.True(env.IsWorkflowCompleted());
    this.NoError(env.GetWorkflowError());
    env.AssertExpectations(this.T());
    await verifyStateWithQuery(stateDone);
  }

  async Test_WorkflowWithLocalActivity(): Promise<void> {
    const localActivityFn = (ctx: Context, name: string): string => {
      return "hello " + name;
    };

    const workflowFn = async (ctx: internal_Context): Promise<string> => {
      ctx = WithLocalActivityOptions(ctx, this.localActivityOptions);
      const f = await ExecuteLocalActivity(ctx, localActivityFn, "local_activity");
      const resultBox: { value: string } = { value: "" };
      await f.Get(ctx, resultBox);
      return resultBox.value;
    };

    const env = this.NewTestWorkflowEnvironment();

    try {
      await env.RegisterWorkflow(workflowFn);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
    }

    try {
      await env.ExecuteWorkflow(workflowFn);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
    }

    expect(env.IsWorkflowCompleted()).toBe(true);
    expect(env.GetWorkflowError()).toBeNull();

    const resultBox: { value: string } = { value: "" };
    let resultError: Error | null = null;
    try {
      env.GetWorkflowResult(resultBox);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
      resultError = err;
    }

    expect(resultError).toBeNull();
    expect(resultBox.value).toEqual("hello local_activity");
  }

  async Test_LocalActivity(): Promise<void> {
    const localActivityFn = async (ctx: Context, name: string): Promise<string> => {
      return "hello " + name;
    };

    const env = this.NewTestActivityEnvironment();
    const result = await env.ExecuteLocalActivity(localActivityFn, "local_activity");
    this.NoError(null);

    const laResult: { value: string } = { value: "" };
    result.Get(laResult);
    this.NoError(null);

    this.Equal("hello local_activity", laResult.value);
  }

  async Test_WorkflowLocalActivityWithMockAndListeners(): Promise<void> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async Test_SignalChildWorkflow(): Promise<void> {
    const signalName = "test-signal-name";
    const signalData = "test-signal-data";

    const childWorkflowFn = async (ctx: internal_Context, parentExec: internal_WorkflowExecution): Promise<string> => {
      const dataBox: { value: string } = { value: "" };
      await GetSignalChannel(ctx, signalName).Receive(ctx, dataBox);
      const data = dataBox.value;

      const signalFuture = await SignalExternalWorkflow(
        ctx,
        parentExec.ID,
        parentExec.RunID,
        signalName,
        data + "-received",
      );
      await signalFuture.Get(ctx, null);

      return data + "-processed";
    };

    const workflowFn = async (ctx: internal_Context): Promise<void> => {
      const cwo: internal_ChildWorkflowOptions = {
        Bugports: { StartChildWorkflowsOnCanceledContext: false },
        CronSchedule: "",
        Domain: "test-domain",
        ExecutionStartToCloseTimeout: Minute,
        ParentClosePolicy: 0,
        TaskList: "",
        TaskStartToCloseTimeout: 0,
        WaitForCancellation: false,
        WorkflowID: "",
        WorkflowIDReusePolicy: 0,
      };

      ctx = await WithChildWorkflowOptions(ctx, cwo);
      const childFuture = await ExecuteChildWorkflow(
        ctx,
        childWorkflowFn,
        GetWorkflowInfo(ctx).WorkflowExecution,
      );

      const signalFuture = await childFuture.SignalChildWorkflow(ctx, signalName, signalData);
      await signalFuture.Get(ctx, null);

      const ackBox: { value: string } = { value: "" };
      await GetSignalChannel(ctx, signalName).Receive(ctx, ackBox);
      const ackMsg = ackBox.value;
      this.Equal(signalData + "-received", ackMsg);

      const childResultBox: { value: string } = { value: "" };
      await childFuture.Get(ctx, childResultBox);
      const childResult = childResultBox.value;

      this.Equal(signalData + "-processed", childResult);
    };

    const env = this.NewTestWorkflowEnvironment();
    await env.RegisterWorkflow(childWorkflowFn);
    await env.RegisterWorkflow(workflowFn);
    await env.ExecuteWorkflow(workflowFn);
    this.True(env.IsWorkflowCompleted());
    this.NoError(env.GetWorkflowError());
  }

  async Test_SignalExternalWorkflow(): Promise<void> {
    const signalName = "test-signal-name";
    const signalData = "test-signal-data";
    const workflowFn = async (ctx: internal_Context): Promise<void> => {
      ctx = await WithWorkflowDomain(ctx, "test-domain");
      const f1 = await SignalExternalWorkflow(ctx, "test-workflow-id1", "test-runid1", signalName, signalData);
      const f2 = await SignalExternalWorkflow(ctx, "test-workflow-id2", "test-runid2", signalName, signalData);
      const f3 = await SignalExternalWorkflow(ctx, "test-workflow-id3", "test-runid3", signalName, signalData);

      await f1.Get(ctx, null);

      try {
        await f2.Get(ctx, null);
        throw new Error("signal2 should fail");
      } catch (err) {
        if (!(err instanceof Error)) throw err;
      }

      const t = NewTimer(ctx, 30 * Second);
      let timerFired = false;
      let signalSend = false;

      await NewSelector(ctx)
        .AddFuture(t, (_f: internal_Future) => {
          timerFired = true;
        })
        .AddFuture(f3, (_f: internal_Future) => {
          signalSend = true;
        })
        .Select(ctx);

      expect(timerFired).toBe(true);
      expect(signalSend).toBe(false);

      await f3.Get(ctx, null);
    };

    const env = this.NewTestWorkflowEnvironment();
    await env.RegisterWorkflow(workflowFn);

    env.OnSignalExternalWorkflow("test-domain", "test-workflow-id1", "test-runid1", signalName, signalData).Return(null).Once();

    env.OnSignalExternalWorkflow("test-domain", "test-workflow-id2", "test-runid2", signalName, signalData)
      .Return((_domainName: unknown, _workflowID: unknown, _runID: unknown, _signalName: string, _arg: unknown): void => {
        throw new Error("unknown external workflow");
      })
      .Once();

    env.OnSignalExternalWorkflow("test-domain", "test-workflow-id3", "test-runid3", signalName, signalData)
      .After(Minute)
      .Return(null)
      .Once();

    await env.ExecuteWorkflow(workflowFn);
    env.AssertExpectations(this.T());
    expect(env.IsWorkflowCompleted()).toBe(true);
    expect(env.GetWorkflowError()).toBeNull();
  }

  async Test_CancelChildWorkflow(): Promise<void> {
    const childWorkflowFn = async (ctx: internal_Context): Promise<void> => {
      let err: Error | null = null;
      const selector = NewSelector(ctx);
      const timer = NewTimer(ctx, 10 * Second);
      await selector.AddFuture(timer, async (f: internal_Future): Promise<void> => {
        try {
          await f.Get(ctx, null);
        } catch (e) {
          if (!(e instanceof Error)) throw e;
          err = e;
        }
      }).Select(ctx);

      GetLogger(ctx).info("child workflow returned error", { error: err });
      if (err != null) throw err;
    };

    const workflowFn = async (ctx: internal_Context): Promise<void> => {
      const cwo: internal_ChildWorkflowOptions = {
        Bugports: { StartChildWorkflowsOnCanceledContext: false },
        CronSchedule: "",
        Domain: "test-domain",
        ExecutionStartToCloseTimeout: Minute,
        ParentClosePolicy: 0,
        TaskList: "",
        TaskStartToCloseTimeout: 0,
        WaitForCancellation: false,
        WorkflowID: "",
        WorkflowIDReusePolicy: 0
      };

      const configuredChildCtx = await WithChildWorkflowOptions(ctx, cwo);
      const [childCtx, cancel] = await WithCancel(configuredChildCtx);
      const childFuture = await ExecuteChildWorkflow(childCtx, childWorkflowFn);
      await Sleep(ctx, 2 * Second);
      await cancel();

      let err: Error | null = null;
      try {
        await childFuture.Get(childCtx, null);
      } catch (e) {
        if (!(e instanceof Error)) throw e;
        err = e;
      }

      if (!(err instanceof internal_CanceledError)) {
        throw new Error(`Cancel child workflow should receive CanceledError, instead got: ${err instanceof Error ? err.message : globalThis.String(err)}`);
      }
    };

    const env = this.NewTestWorkflowEnvironment();
    await env.RegisterWorkflow(childWorkflowFn);
    await env.RegisterWorkflow(workflowFn);
    await env.ExecuteWorkflow(workflowFn);
    this.True(env.IsWorkflowCompleted());
    this.NoError(env.GetWorkflowError());
  }

  async Test_CancelExternalWorkflow(): Promise<void> {
    const workflowFn = async (ctx: internal_Context): Promise<void> => {
      ctx = await WithWorkflowDomain(ctx, "test-domain");
      const f1 = await RequestCancelExternalWorkflow(ctx, "test-workflow-id1", "test-runid1");
      const f2 = await RequestCancelExternalWorkflow(ctx, "test-workflow-id2", "test-runid2");

      await f1.Get(ctx, null);

      try {
        await f2.Get(ctx, null);
        throw new Error("cancellation 2 should fail");
      } catch (err) {
        if (!(err instanceof Error)) throw err;
        if (err.message === "cancellation 2 should fail") throw err;
      }
    };

    const env = this.NewTestWorkflowEnvironment();
    await env.RegisterWorkflow(workflowFn);

    env.OnRequestCancelExternalWorkflow("test-domain", "test-workflow-id1", "test-runid1").Return(null).Once();
    env.OnRequestCancelExternalWorkflow("test-domain", "test-workflow-id2", "test-runid2").Return(
      (domainName: string, workflowID: string, runID: string): void => {
        throw new Error("unknown external workflow");
      }
    ).Once();

    await env.ExecuteWorkflow(workflowFn);
    env.AssertExpectations(this.T());
    this.True(env.IsWorkflowCompleted());
    this.NoError(env.GetWorkflowError());
  }

  async Test_DisconnectedContext(): Promise<void> {
    const childWorkflowFn = async (ctx: internal_Context): Promise<string> => {
      let err: Error | null = null;
      try {
        await NewTimer(ctx, 10 * Minute).Get(ctx, null);
      } catch (e) {
        if (!(e instanceof Error)) throw e;
        err = e;
      }

      if (err instanceof internal_CanceledError) {
        let [dCtx, ] = await NewDisconnectedContext(ctx);
        dCtx = WithActivityOptions(dCtx, this.activityOptions);
        const cleanupResult: { value: string } = { value: "" };
        await ExecuteActivity(dCtx, testActivityHello, "cleanup").then((future) =>
          future.Get(dCtx, cleanupResult)
        );
        return cleanupResult.value;
      }

      throw new Error("should not reach here");
    };

    const workflowFn = async (ctx: internal_Context): Promise<string> => {
      const cwo: internal_ChildWorkflowOptions = {
        Bugports: { StartChildWorkflowsOnCanceledContext: false },
        CronSchedule: "",
        Domain: "",
        ExecutionStartToCloseTimeout: Hour,
        ParentClosePolicy: 0,
        TaskList: "",
        TaskStartToCloseTimeout: 0,
        WaitForCancellation: true,
        WorkflowID: "",
        WorkflowIDReusePolicy: 0
      };
      ctx = await WithChildWorkflowOptions(ctx, cwo);
      const [childCtx, cancelChild] = await WithCancel(ctx);
      const childFuture = await ExecuteChildWorkflow(childCtx, childWorkflowFn);

      await NewSelector(ctx)
        .AddFuture(childFuture, (f: internal_Future) => {
          this.Fail("f1 should not complete before t1");
        })
        .AddFuture(NewTimer(ctx, Minute), (f: internal_Future) => {
          cancelChild();
        })
        .Select(ctx);

      const result: { value: string } = { value: "" };
      await childFuture.Get(childCtx, result);
      return result.value;
    };

    const env = this.NewTestWorkflowEnvironment();
    await env.RegisterWorkflow(childWorkflowFn);
    await env.RegisterWorkflow(workflowFn);
    await env.RegisterActivity(testActivityHello);

    await env.ExecuteWorkflow(workflowFn);

    expect(env.IsWorkflowCompleted()).toBe(true);
    expect(env.GetWorkflowError()).toBeNull();

    const workflowResult: { value: string } = { value: "" };
    env.GetWorkflowResult(workflowResult);
    expect(workflowResult.value).toEqual("hello_cleanup");
  }

  async Test_WorkflowIDReusePolicy(): Promise<void> {
    const captureError = async (operation: () => void | Promise<void>): Promise<Error | null> => {
      try {
        await operation();
        return null;
      } catch (err) {
        if (!(err instanceof Error)) throw err;
        return err;
      }
    };

    const discardError = async (operation: () => void | Promise<void>): Promise<void> => {
      try {
        await operation();
      } catch (err) {
        if (!(err instanceof Error)) throw err;
      }
    };

    const workflowFn = async (ctx: internal_Context): Promise<string> => {
      const cwo: internal_ChildWorkflowOptions = {
        Bugports: { StartChildWorkflowsOnCanceledContext: false },
        CronSchedule: "",
        Domain: "",
        ExecutionStartToCloseTimeout: Minute,
        ParentClosePolicy: 0,
        TaskList: "",
        TaskStartToCloseTimeout: 0,
        WaitForCancellation: false,
        WorkflowID: "test-child-workflow-id",
        WorkflowIDReusePolicy: internal_WorkflowIDReusePolicy.WorkflowIDReusePolicyRejectDuplicate,
      };

      ctx = await WithChildWorkflowOptions(ctx, cwo);
      const helloWorkflowResult: { value: string } = { value: "" };

      let f = await ExecuteChildWorkflow(ctx, testWorkflowHello);
      const firstExecutionError = await captureError(() => f.GetChildWorkflowExecution().Get(ctx, null));
      expect(firstExecutionError).toBeNull();

      const firstResultError = await captureError(() => f.Get(ctx, helloWorkflowResult));
      expect(firstResultError).toBeNull();

      f = await ExecuteChildWorkflow(ctx, testWorkflowHello);
      const duplicateExecutionError = await captureError(() => f.GetChildWorkflowExecution().Get(ctx, null));
      expect(duplicateExecutionError).not.toBeNull();

      const duplicateResultError = await captureError(() => f.Get(ctx, helloWorkflowResult));
      expect(duplicateResultError).not.toBeNull();

      cwo.WorkflowIDReusePolicy = internal_WorkflowIDReusePolicy.WorkflowIDReusePolicyAllowDuplicate;
      ctx = await WithChildWorkflowOptions(ctx, cwo);
      f = await ExecuteChildWorkflow(ctx, testWorkflowHello);

      const allowedExecutionError = await captureError(() => f.GetChildWorkflowExecution().Get(ctx, null));
      expect(allowedExecutionError).toBeNull();

      const allowedResultError = await captureError(() => f.Get(ctx, helloWorkflowResult));
      expect(allowedResultError).toBeNull();

      return helloWorkflowResult.value;
    };

    const env = this.NewTestWorkflowEnvironment();
    await discardError(() => env.RegisterWorkflow(workflowFn));
    await discardError(() => env.RegisterWorkflow(testWorkflowHello));
    await discardError(() => env.RegisterActivity(testActivityHello));
    await discardError(() => env.ExecuteWorkflow(workflowFn));

    const actualResult: { value: string } = { value: "" };
    const workflowResultError = await captureError(() => env.GetWorkflowResult(actualResult));
    expect(workflowResultError).toBeNull();
    expect(actualResult.value).toEqual("hello_world");
  }

  async Test_Channel(): Promise<void> {
    const workflowFn = async (ctx: internal_Context): Promise<void> => {
      const signalCh = GetSignalChannel(ctx, "test-signal");
      const doneCh = NewBufferedChannel(ctx, 100);
      const selector = NewSelector(ctx);

      selector
        .AddReceive(signalCh, (c: internal_Channel, more: boolean) => {})
        .AddReceive(doneCh, async (c: internal_Channel, more: boolean) => {
          const doneSignalBox: { value: string } = { value: "" };
          await c.Receive(ctx, doneSignalBox);
        });

      const fanoutChs = [
        NewBufferedChannel(ctx, 100),
        NewBufferedChannel(ctx, 100),
      ];

      let processedCount = 0;
      let runningCount = 0;

      for (;;) {
        await selector.Select(ctx);
        const signalBox: { value: string } = { value: "" };
        if (!signalCh.ReceiveAsync(signalBox)) {
          if (runningCount > 0) {
            continue;
          }

          if (processedCount < 4) {
            continue;
          }

          throw await NewContinueAsNewError(ctx, "this-workflow");
        }

        for (let i = 0; i < fanoutChs.length; i++) {
          const ch = fanoutChs[i];
          ch.SendAsync(signalBox.value);
          processedCount++;
          runningCount++;
          void Go(ctx, async (ctx: internal_Context) => {
            doneCh.SendAsync("done");
            runningCount--;
          });
        }
      }
    };

    const env = this.NewTestWorkflowEnvironment();
    await env.RegisterWorkflow(workflowFn);

    env.RegisterDelayedCallback(() => {
      env.SignalWorkflow("test-signal", "s1");
      env.SignalWorkflow("test-signal", "s2");
    }, Minute);

    await env.ExecuteWorkflow(workflowFn);

    expect(env.IsWorkflowCompleted()).toBe(true);
    expect(env.GetWorkflowError()).not.toBeNull();
    expect(env.GetWorkflowError() instanceof internal_ContinueAsNewError).toBe(true);
  }

  async Test_ContextMisuse(): Promise<void> {
    const workflowFn = async (ctx: internal_Context): Promise<void> => {
      const ch = NewChannel(ctx);

      try {
        await Go(ctx, async (shouldUseThisCtx: internal_Context): Promise<void> => {
          try {
            await Sleep(ctx, Hour);
          } catch (e) {
            if (!(e instanceof Error)) throw e;
          }
          try {
            await ch.Send(ctx, "done");
          } catch (e) {
            if (!(e instanceof Error)) throw e;
          }
        });
      } catch (e) {
        if (!(e instanceof Error)) throw e;
      }

      const doneBox: { value: string } = { value: "" };
      try {
        await ch.Receive(ctx, doneBox);
      } catch (e) {
        if (!(e instanceof Error)) throw e;
      }
    };

    const env = this.NewTestWorkflowEnvironment();

    try {
      await env.RegisterWorkflow(workflowFn);
    } catch (e) {
      if (!(e instanceof Error)) throw e;
    }

    try {
      await env.ExecuteWorkflow(workflowFn);
    } catch (e) {
      if (!(e instanceof Error)) throw e;
    }

    expect(env.IsWorkflowCompleted()).toBe(true);
    expect(env.GetWorkflowError()).not.toBeNull();
    expect(env.GetWorkflowError()!.message).toContain("block on coroutine which is already blocked");
  }

  async Test_DrainSignalChannel(): Promise<void> {
    const workflowFn = async (ctx: internal_Context): Promise<string> => {
      const signalCh = GetSignalChannel(ctx, "test-signal");
      const s1Box = { value: "" };
      const s2Box = { value: "" };
      const s3Box = { value: "" };

      await signalCh.Receive(ctx, s1Box);
      if (!signalCh.ReceiveAsync(s2Box)) {
        throw new Error("expected signal");
      }
      if (signalCh.ReceiveAsync(s3Box)) {
        throw new Error("unexpected signal");
      }
      return s1Box.value + s2Box.value;
    };

    const env = this.NewTestWorkflowEnvironment();
    await env.RegisterWorkflow(workflowFn);

    env.RegisterDelayedCallback(() => {
      env.SignalWorkflowSkippingDecision("test-signal", "s1");
      env.SignalWorkflow("test-signal", "s2");
    }, Minute);

    await env.ExecuteWorkflow(workflowFn);

    expect(env.IsWorkflowCompleted()).toBe(true);
    expect(env.GetWorkflowError()).toBeNull();
    const resultBox = { value: "" };
    env.GetWorkflowResult(resultBox);
    expect(resultBox.value).toEqual("s1s2");
  }

  async Test_ActivityRetry(): Promise<void> {
    let attempt1Count = 0;
    const activityFailedFn = (ctx: Context): string => {
      attempt1Count++;
      throw NewCustomError("bad-bug");
    };

    let attempt2Count = 0;
    const activityFn = (ctx: Context): string => {
      attempt2Count++;
      const info = GetActivityInfo(ctx);
      if (info.Attempt < 2) {
        throw NewCustomError("bad-luck");
      }
      return "retry-done";
    };

    const workflowFn = async (ctx: internal_Context): Promise<string> => {
      const ao = new internal_ActivityOptions({
        ActivityID: "",
        HeartbeatTimeout: 0,
        ScheduleToCloseTimeout: 0,
        ScheduleToStartTimeout: Minute,
        StartToCloseTimeout: Minute,
        TaskList: "",
        WaitForCancellation: false,
        RetryPolicy: {
          MaximumAttempts: 5,
          InitialInterval: Second,
          MaximumInterval: Second * 10,
          BackoffCoefficient: 2,
          NonRetriableErrorReasons: ["bad-bug"],
          ExpirationInterval: Minute,
        },
      });
      ctx = WithActivityOptions(ctx, ao);

      let err: Error | null = null;
      try {
        const future = await ExecuteActivity(ctx, activityFailedFn);
        await future.Get(ctx, undefined);
      } catch (e) {
        if (!(e instanceof Error)) throw e;
        err = e;
      }

      expect(err instanceof internal_CustomError).toBe(true);
      const badBug = err as internal_CustomError;
      expect(badBug.Reason()).toEqual("bad-bug");

      const resultBox: { value: string } = { value: "" };
      const future = await ExecuteActivity(ctx, activityFn);
      await future.Get(ctx, resultBox);
      return resultBox.value;
    };

    const env = this.NewTestWorkflowEnvironment();
    await env.RegisterWorkflow(workflowFn);
    await env.RegisterActivity(activityFailedFn);
    await env.RegisterActivity(activityFn);

    env.SetWorkflowTimeout(10 * Second);
    await env.ExecuteWorkflow(workflowFn);

    expect(env.IsWorkflowCompleted()).toBe(true);
    expect(env.GetWorkflowError()).toBeNull();

    const resultBox: { value: string } = { value: "" };
    env.GetWorkflowResult(resultBox);
    expect(resultBox.value).toEqual("retry-done");
    expect(attempt1Count).toEqual(1);
    expect(attempt2Count).toEqual(3);
  }

  async Test_ActivityHeartbeatRetry(): Promise<void> {
    const startedFrom: number[] = [];

    const activityHeartBeatFn = async (
      ctx: Context,
      firstTaskID: number,
      taskCount: number,
    ): Promise<void> => {
      let i = firstTaskID;
      if (HasHeartbeatDetails(ctx)) {
        const lastProcessed = { value: 0 };
        try {
          GetHeartbeatDetails(ctx, lastProcessed);
          i = lastProcessed.value + 1;
        } catch (err) {
          if (!(err instanceof Error)) throw err;
        }
      }

      startedFrom.push(i);

      for (let j = 0; i < firstTaskID + taskCount; i++, j++) {
        try {
          await RecordActivityHeartbeat(ctx, i);
        } catch (err) {
          if (!(err instanceof Error)) throw err;
        }
        if (j === 2 && i < firstTaskID + taskCount - 1) {
          throw NewCustomError("bad-luck");
        }
      }
    };

    const workflowFn = async (ctx: internal_Context): Promise<void> => {
      const ao = new internal_ActivityOptions({
        ActivityID: "",
        HeartbeatTimeout: 0,
        ScheduleToCloseTimeout: 0,
        ScheduleToStartTimeout: Minute,
        StartToCloseTimeout: Minute,
        TaskList: "",
        WaitForCancellation: false,
        RetryPolicy: {
          MaximumAttempts: 3,
          InitialInterval: Second,
          MaximumInterval: Second * 10,
          BackoffCoefficient: 2,
          NonRetriableErrorReasons: ["bad-bug"],
          ExpirationInterval: Minute,
        },
      });
      ctx = WithActivityOptions(ctx, ao);

      const future = await ExecuteActivity(ctx, activityHeartBeatFn, 0, 9);
      await future.Get(ctx, null);
    };

    const env = this.NewTestWorkflowEnvironment();
    env.SetTestTimeout(Hour);

    try {
      await env.RegisterWorkflow(workflowFn);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
    }

    try {
      await env.RegisterActivity(activityHeartBeatFn);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
    }

    try {
      await env.ExecuteWorkflow(workflowFn);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
    }

    expect(env.IsWorkflowCompleted()).toBe(true);
    expect(env.GetWorkflowError()).toBeNull();
    expect(startedFrom).toHaveLength(3);
    expect(startedFrom).toEqual([0, 3, 6]);
  }

  async Test_LocalActivityRetry(): Promise<void> {
    let nonretriableCount = 0;
    const nonretriableFn = (ctx: Context): string => {
      nonretriableCount++;
      throw NewCustomError("bad-bug");
    };

    let retriableCount = 0;
    const retriableFn = (ctx: Context): string => {
      retriableCount++;
      const info = GetActivityInfo(ctx);
      if (info.Attempt < 2) {
        throw NewCustomError("bad-luck");
      }
      return "retry-done";
    };

    const workflowFn = async (ctx: internal_Context): Promise<string> => {
      const lao: internal_LocalActivityOptions = {
        ScheduleToCloseTimeout: Minute,
        RetryPolicy: {
          MaximumAttempts: 3,
          InitialInterval: Second,
          MaximumInterval: Second * 10,
          BackoffCoefficient: 2,
          NonRetriableErrorReasons: ["bad-bug"],
          ExpirationInterval: Minute,
        },
      };
      ctx = WithLocalActivityOptions(ctx, lao);

      let err: Error | null = null;
      try {
        const future = await ExecuteLocalActivity(ctx, nonretriableFn);
        await future.Get(ctx, null);
      } catch (e) {
        if (!(e instanceof Error)) throw e;
        err = e;
      }

      const badBug = err as internal_CustomError;
      expect(err instanceof internal_CustomError).toBe(true);
      expect(badBug.Reason()).toEqual("bad-bug");

      const resultBox: { value: string } = { value: "" };
      const future = await ExecuteLocalActivity(ctx, retriableFn);
      await future.Get(ctx, resultBox);
      return resultBox.value;
    };

    const env = this.NewTestWorkflowEnvironment();
    await env.RegisterWorkflow(workflowFn);
    await env.ExecuteWorkflow(workflowFn);

    expect(env.IsWorkflowCompleted()).toBe(true);
    expect(env.GetWorkflowError()).toBeNull();

    const resultBox: { value: string } = { value: "" };
    env.GetWorkflowResult(resultBox);
    expect(resultBox.value).toEqual("retry-done");
    expect(nonretriableCount).toEqual(1);
    expect(retriableCount).toEqual(3);
  }

  async Test_LocalActivityRetryOnCancel(): Promise<void> {
    let attempts = 0;
    const localActivityFn = (ctx: Context): number => {
      attempts++;
      const info = GetActivityInfo(ctx);
      if (info.Attempt < 2) {
        throw NewCanceledError("details");
      }
      return info.Attempt;
    };

    const workflowFn = async (ctx: internal_Context): Promise<number> => {
      const lao: internal_LocalActivityOptions = {
        ScheduleToCloseTimeout: Minute,
        RetryPolicy: {
          MaximumAttempts: 3,
          InitialInterval: Second,
          MaximumInterval: Second * 10,
          BackoffCoefficient: 2,
          NonRetriableErrorReasons: ["bad-bug"],
          ExpirationInterval: Minute,
        },
      };
      ctx = WithLocalActivityOptions(ctx, lao);

      const resultBox: { value: number } = { value: 0 };
      const future = await ExecuteLocalActivity(ctx, localActivityFn);
      await future.Get(ctx, resultBox);
      return resultBox.value;
    };

    const env = this.NewTestWorkflowEnvironment();
    await env.RegisterWorkflow(workflowFn);
    await env.ExecuteWorkflow(workflowFn);

    expect(env.IsWorkflowCompleted()).toBe(true);
    expect(env.GetWorkflowError()).not.toBeNull();
    expect(IsCanceledError(env.GetWorkflowError())).toBe(true);
    expect(attempts).toEqual(1);
  }

  async Test_ActivityRetryOnCancel(): Promise<void> {
    const workflowFn = async (ctx: internal_Context): Promise<number> => {
      const ao = new internal_ActivityOptions({
        ActivityID: "",
        HeartbeatTimeout: 0,
        ScheduleToCloseTimeout: 0,
        ScheduleToStartTimeout: Minute,
        StartToCloseTimeout: Minute,
        TaskList: "",
        WaitForCancellation: false,
        RetryPolicy: {
          MaximumAttempts: 3,
          InitialInterval: Second,
          MaximumInterval: Second * 10,
          BackoffCoefficient: 2,
          NonRetriableErrorReasons: ["bad-bug"],
          ExpirationInterval: Minute,
        },
      });
      ctx = WithActivityOptions(ctx, ao);

      const resultBox: { value: number } = { value: 0 };
      const future = await ExecuteActivity(ctx, testActivityCanceled);
      await future.Get(ctx, resultBox);
      return resultBox.value;
    };

    const env = this.NewTestWorkflowEnvironment();
    await env.RegisterWorkflow(workflowFn);
    await env.RegisterActivity(testActivityCanceled);

    await env.ExecuteWorkflow(workflowFn);

    this.True(env.IsWorkflowCompleted());
    this.Error(env.GetWorkflowError());
    this.True(IsCanceledError(env.GetWorkflowError()));
  }

  async Test_ChildWorkflowRetry(): Promise<void> {
    const childWorkflowFn = (ctx: internal_Context): string => {
      const info = GetWorkflowInfo(ctx);
      if (info.Attempt < 2) {
        throw NewCustomError("bad-luck");
      }
      return "retry-done";
    };

    const workflowFn = async (ctx: internal_Context): Promise<string> => {
      const cwo: internal_ChildWorkflowOptions = {
        Bugports: { StartChildWorkflowsOnCanceledContext: false },
        CronSchedule: "",
        Domain: "",
        ExecutionStartToCloseTimeout: Minute,
        Memo: undefined,
        ParentClosePolicy: 0,
        RetryPolicy: {
          MaximumAttempts: 3,
          InitialInterval: Second,
          MaximumInterval: Second * 10,
          BackoffCoefficient: 2,
          NonRetriableErrorReasons: ["bad-bug"],
          ExpirationInterval: Minute,
        },
        SearchAttributes: undefined,
        TaskList: "",
        TaskStartToCloseTimeout: 0,
        WaitForCancellation: false,
        WorkflowID: "",
        WorkflowIDReusePolicy: 0,
      };

      ctx = await WithChildWorkflowOptions(ctx, cwo);
      const childResult = { value: "" };
      const childWorkflow = await ExecuteChildWorkflow(ctx, childWorkflowFn);
      await childWorkflow.Get(ctx, childResult);
      return childResult.value;
    };

    const env = this.NewTestWorkflowEnvironment();
    await env.RegisterWorkflow(childWorkflowFn);
    await env.RegisterWorkflow(workflowFn);
    await env.ExecuteWorkflow(workflowFn);

    expect(env.IsWorkflowCompleted()).toBe(true);
    expect(env.GetWorkflowError()).toBeNull();
    const result = { value: "" };
    env.GetWorkflowResult(result);
    expect(result.value).toEqual("retry-done");
  }

  async Test_SignalChildWorkflowRetry(): Promise<void> {
    const childWorkflowFn = async (ctx: internal_Context): Promise<string> => {
      const info = GetWorkflowInfo(ctx);
      if (info.Attempt < 2) {
        throw NewCustomError("bad-luck");
      }

      const ch = GetSignalChannel(ctx, "test-signal-name");
      const timeout = NewTimer(ctx, 3 * Second);
      const s = NewSelector(ctx);
      const signalBox: { value: string } = { value: "" };

      await s
        .AddFuture(timeout, (_f: internal_Future) => {
          signalBox.value = "timeout";
        })
        .AddReceive(ch, async (c: internal_Channel, _more: boolean) => {
          try {
            await c.Receive(ctx, signalBox);
          } catch (err) {
            if (!(err instanceof Error)) throw err;
          }
        })
        .Select(ctx)
        .catch((err) => {
          if (!(err instanceof Error)) throw err;
        });

      return signalBox.value;
    };

    const workflowFn = async (ctx: internal_Context): Promise<string> => {
      const cwo: internal_ChildWorkflowOptions = {
        Bugports: { StartChildWorkflowsOnCanceledContext: false },
        CronSchedule: "",
        Domain: "",
        ExecutionStartToCloseTimeout: Minute,
        Memo: undefined,
        ParentClosePolicy: 0,
        RetryPolicy: {
          MaximumAttempts: 3,
          InitialInterval: 3 * Second,
          MaximumInterval: 3 * Second,
          BackoffCoefficient: 1,
          NonRetriableErrorReasons: ["bad-bug"],
          ExpirationInterval: Minute,
        },
        SearchAttributes: undefined,
        TaskList: "",
        TaskStartToCloseTimeout: 0,
        WaitForCancellation: false,
        WorkflowID: "test-retry-signal-child-workflow",
        WorkflowIDReusePolicy: 0,
      };

      ctx = await WithChildWorkflowOptions(ctx, cwo);
      const childResultBox: { value: string } = { value: "" };
      const childWorkflow = await ExecuteChildWorkflow(ctx, childWorkflowFn);
      await childWorkflow.Get(ctx, childResultBox);
      return childResultBox.value;
    };

    const env = this.NewTestWorkflowEnvironment();

    await env.RegisterWorkflow(childWorkflowFn);
    await env.RegisterWorkflow(workflowFn);

    env.RegisterDelayedCallback(() => {
      env.SignalWorkflowByID(
        "test-retry-signal-child-workflow",
        "test-signal-name",
        "test-signal-data",
      );
    }, 7 * Second);

    await env.ExecuteWorkflow(workflowFn);

    expect(env.IsWorkflowCompleted()).toBe(true);
    expect(env.GetWorkflowError()).toBeNull();

    const resultBox: { value: string } = { value: "" };
    env.GetWorkflowResult(resultBox);
    expect(resultBox.value).toEqual("test-signal-data");
  }

  async Test_TestWorkflowTimeoutInBusyLoop(): Promise<void> {
    const neverEndingWorkflow = async (ctx: internal_Context): Promise<void> => {
      for (;;) {
        try {
          await Sleep(ctx, Hour);
        } catch (err) {
          if (!(err instanceof Error)) throw err;
        }
      }
    };

    const env = this.NewTestWorkflowEnvironment();
    env.SetWorkflowTimeout((Hour * 10) + Minute);
    let timerFiredCount = 0;
    env.SetOnTimerFiredListener((_timerID: string) => {
      timerFiredCount++;
    });
    await env.RegisterWorkflow(neverEndingWorkflow);

    await env.ExecuteWorkflow(neverEndingWorkflow);
    expect(timerFiredCount).toEqual(10);
    expect(env.GetWorkflowError()).not.toBeNull();
    expect(env.GetWorkflowError() instanceof internal_TimeoutError).toBe(true);
  }

  async Test_TestChildWorkflowTimeout(): Promise<void> {
    const childWorkflowFn = async (ctx: internal_Context): Promise<void> => {
      await Sleep(ctx, 5 * Hour);
    };

    const workflowFn = async (ctx: internal_Context): Promise<void> => {
      const cwo: internal_ChildWorkflowOptions = {
        Bugports: { StartChildWorkflowsOnCanceledContext: false },
        CronSchedule: "",
        Domain: "",
        ExecutionStartToCloseTimeout: 3 * Hour,
        ParentClosePolicy: 0,
        TaskList: "",
        TaskStartToCloseTimeout: 0,
        WaitForCancellation: false,
        WorkflowID: "",
        WorkflowIDReusePolicy: 0,
      };
      ctx = await WithChildWorkflowOptions(ctx, cwo);

      let err: Error | null = null;
      try {
        const future = await ExecuteChildWorkflow(ctx, childWorkflowFn);
        await future.Get(ctx, null);
      } catch (e) {
        if (!(e instanceof Error)) throw e;
        err = e;
      }

      expect(err).not.toBeNull();
      if (err instanceof internal_TimeoutError) {
        return;
      }
      if (err !== null) {
        throw err;
      }
    };

    const env = this.NewTestWorkflowEnvironment();
    env.SetWorkflowTimeout(10 * Hour);
    let timerFiredCount = 0;
    env.SetOnTimerFiredListener((_timerID: string) => {
      timerFiredCount++;
    });
    await env.RegisterWorkflow(childWorkflowFn);
    await env.RegisterWorkflow(workflowFn);

    await env.ExecuteWorkflow(workflowFn);
    expect(env.GetWorkflowError()).toBeNull();
  }

  async Test_SameActivityIDFromDifferentChildWorkflow(): Promise<void> {
    const childWorkflowFn = async (ctx: internal_Context): Promise<string> => {
      const ao = new internal_ActivityOptions({
        ActivityID: "per_workflow_unique_activity_id",
        ScheduleToStartTimeout: Minute,
        StartToCloseTimeout: Minute,
        HeartbeatTimeout: 0,
        ScheduleToCloseTimeout: 0,
        TaskList: "",
        WaitForCancellation: false,
      });
      ctx = WithActivityOptions(ctx, ao);

      const info = GetWorkflowInfo(ctx);

      const resultBox: { value: string } = { value: "" };
      const activity = await ExecuteActivity(ctx, testActivityHello, info.WorkflowExecution.ID);
      await activity.Get(ctx, resultBox);

      return resultBox.value;
    };

    const workflowFn = async (ctx: internal_Context): Promise<string> => {
      const ctx1 = await WithChildWorkflowOptions(ctx, {
        Bugports: { StartChildWorkflowsOnCanceledContext: false },
        CronSchedule: "",
        Domain: "",
        ExecutionStartToCloseTimeout: Minute,
        ParentClosePolicy: 0,
        TaskList: "",
        TaskStartToCloseTimeout: 0,
        WaitForCancellation: false,
        WorkflowID: "child_1",
        WorkflowIDReusePolicy: 0,
      });
      const f1 = await ExecuteChildWorkflow(ctx1, childWorkflowFn);

      const ctx2 = await WithChildWorkflowOptions(ctx, {
        Bugports: { StartChildWorkflowsOnCanceledContext: false },
        CronSchedule: "",
        Domain: "",
        ExecutionStartToCloseTimeout: Minute,
        ParentClosePolicy: 0,
        TaskList: "",
        TaskStartToCloseTimeout: 0,
        WaitForCancellation: false,
        WorkflowID: "child_2",
        WorkflowIDReusePolicy: 0,
      });
      const f2 = await ExecuteChildWorkflow(ctx2, childWorkflowFn);

      const result1Box: { value: string } = { value: "" };
      await f1.Get(ctx1, result1Box);

      const result2Box: { value: string } = { value: "" };
      await f2.Get(ctx1, result2Box);

      return result1Box.value + " " + result2Box.value;
    };

    const env = this.NewTestWorkflowEnvironment();

    try {
      await env.RegisterWorkflow(workflowFn);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
    }

    try {
      await env.RegisterWorkflow(childWorkflowFn);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
    }

    try {
      await env.RegisterActivity(testActivityHello);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
    }

    try {
      await env.ExecuteWorkflow(workflowFn);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
    }

    this.True(env.IsWorkflowCompleted());
    this.NoError(env.GetWorkflowError());

    const actualResultBox: { value: string } = { value: "" };
    env.GetWorkflowResult(actualResultBox);

    this.Equal("hello_child_1 hello_child_2", actualResultBox.value);
  }

  async Test_MockChildWorkflowAlreadyRunning(): Promise<void> {
    const childWorkflowFn = (ctx: internal_Context): void => {
      return;
    };

    const runID = "run-id";
    const workflowFn = async (ctx: internal_Context): Promise<void> => {
      const cwo: internal_ChildWorkflowOptions = {
        Bugports: { StartChildWorkflowsOnCanceledContext: false },
        CronSchedule: "",
        Domain: "",
        ExecutionStartToCloseTimeout: 1 * Minute,
        ParentClosePolicy: 0,
        TaskList: "",
        TaskStartToCloseTimeout: 0,
        WaitForCancellation: false,
        WorkflowID: "",
        WorkflowIDReusePolicy: 0,
      };
      ctx = await WithChildWorkflowOptions(ctx, cwo);

      let err: Error | null = null;
      try {
        const future = await ExecuteChildWorkflow(ctx, childWorkflowFn);
        await future.Get(ctx, null);
      } catch (e) {
        if (!(e instanceof Error)) throw e;
        err = e;
      }

      this.Error(err);
      this.True(err instanceof WorkflowExecutionAlreadyStartedError);
      const alreadySytartedErr = err as WorkflowExecutionAlreadyStartedError;
      this.Equal(runID, alreadySytartedErr.runId!);

      return;
    };

    const env = this.NewTestWorkflowEnvironment();
    await RegisterWorkflow(childWorkflowFn);
    await RegisterWorkflow(workflowFn);

    (await env.OnWorkflow(childWorkflowFn, Anything)).Return(
      new WorkflowExecutionAlreadyStartedError({ runId: runID }),
    );

    await env.ExecuteWorkflow(workflowFn);
    this.NoError(env.GetWorkflowError());
  }

  async Test_ChildWorkflowAlreadyRunning(): Promise<void> {
    const workflowFn = async (ctx: internal_Context): Promise<string> => {
      const ctx1 = await WithChildWorkflowOptions(ctx, {
        Bugports: { StartChildWorkflowsOnCanceledContext: false },
        CronSchedule: "",
        Domain: "",
        ExecutionStartToCloseTimeout: Minute,
        ParentClosePolicy: 0,
        TaskList: "",
        TaskStartToCloseTimeout: 0,
        WaitForCancellation: false,
        WorkflowID: "Test_ChildWorkflowAlreadyRunning",
        WorkflowIDReusePolicy: 0,
      });

      const result1Box: { value: string } = { value: "" };
      const f1 = await ExecuteChildWorkflow(ctx1, testWorkflowHeartbeat, "child1", Millisecond);
      let err: Error | null = null;
      try {
        await f1.Get(ctx1, result1Box);
      } catch (e) {
        if (!(e instanceof Error)) throw e;
        err = e;
      }
      this.NoError(err);

      const result2Box: { value: string } = { value: "" };
      const f2 = await ExecuteChildWorkflow(ctx1, testWorkflowHeartbeat, "child2", Second);

      err = null;
      try {
        await f2.Get(ctx1, result2Box);
      } catch (e) {
        if (!(e instanceof Error)) throw e;
        err = e;
      }
      this.Error(err);
      this.True(err instanceof WorkflowExecutionAlreadyStartedError);

      return `${result1Box.value} ${result2Box.value}`;
    };

    const env = this.NewTestWorkflowEnvironment();
    await env.RegisterWorkflow(workflowFn);
    await env.RegisterWorkflow(testWorkflowHeartbeat);
    await env.RegisterActivity(testActivityHeartbeat);
    await env.ExecuteWorkflow(workflowFn);

    this.True(env.IsWorkflowCompleted());
    const err = env.GetWorkflowError();
    this.NoError(err);

    const resultBox: { value: string } = { value: "" };
    env.GetWorkflowResult(resultBox);
    this.Equal("heartbeat_child1 ", resultBox.value);
  }

  async Test_CronChildWorkflow(): Promise<void> {
    let failedCount = 0;
    let successCount = 0;
    let lastCompletionResult = 0;

    const cronWorkflow = async (ctx: internal_Context): Promise<number> => {
      const info = GetWorkflowInfo(ctx);
      const result = { value: 0 };

      if (HasLastCompletionResult(ctx)) {
        GetLastCompletionResult(ctx, result);
      }

      await Sleep(ctx, 3 * Second);

      if (info.Attempt === 0) {
        failedCount++;
        throw new Error("please-retry");
      }

      successCount++;
      result.value++;
      lastCompletionResult = result.value;
      return result.value;
    };

    const testWorkflow = async (ctx: internal_Context): Promise<void> => {
      const ctx1 = await WithChildWorkflowOptions(ctx, {
        Bugports: { StartChildWorkflowsOnCanceledContext: false },
        Domain: "",
        ExecutionStartToCloseTimeout: 10 * Minute,
        ParentClosePolicy: 0,
        RetryPolicy: {
          MaximumAttempts: 5,
          InitialInterval: Second,
          MaximumInterval: 10 * Second,
          BackoffCoefficient: 2,
          NonRetriableErrorReasons: ["bad-bug"],
          ExpirationInterval: 60 * Minute,
        },
        CronSchedule: "0 * * * *",
        SearchAttributes: undefined,
        Memo: undefined,
        TaskList: "",
        TaskStartToCloseTimeout: 0,
        WaitForCancellation: false,
        WorkflowID: "",
        WorkflowIDReusePolicy: 0,
      });

      const cronFuture = await ExecuteChildWorkflow(ctx1, cronWorkflow);

      const timeoutTimer = NewTimer(ctx, 3 * Hour);
      const selector = NewSelector(ctx);
      let err: Error | null = null;

      selector
        .AddFuture(cronFuture, (_f: internal_Future) => {
          err = new Error("cron workflow returns, this is not expected");
        })
        .AddFuture(timeoutTimer, (_f: internal_Future) => {
        });

      await selector.Select(ctx);

      if (err != null) {
        throw err;
      }
    };

    const env = this.NewTestWorkflowEnvironment();
    await env.RegisterWorkflow(cronWorkflow);
    await env.RegisterWorkflow(testWorkflow);

    const startTime = 1545294600000000000;
    env.SetStartTime(startTime);
    await env.ExecuteWorkflow(testWorkflow);

    this.True(env.IsWorkflowCompleted());
    const err = env.GetWorkflowError();
    this.NoError(err);

    this.Equal(4, failedCount);
    this.Equal(4, successCount);
    this.Equal(4, lastCompletionResult);
  }

  async Test_CronWorkflow(): Promise<void> {
    const totalRuns = { value: 0 };

    const cronWorkflow = async (ctx: internal_Context): Promise<number> => {
      const result = { value: 0 };
      if (HasLastCompletionResult(ctx)) {
        GetLastCompletionResult(ctx, result);
      }
      await Sleep(ctx, 3 * Second);
      result.value++;
      return result.value;
    };

    const env = this.NewTestWorkflowEnvironment();
    env.SetWorkflowCronSchedule("0 * * * *");
    env.SetWorkflowCronMaxIterations(1);
    await env.RegisterWorkflow(cronWorkflow);

    const startTime = Date.parse("2018-12-20T16:30:00+08:00") * Millisecond;
    env.SetStartTime(startTime);
    await env.ExecuteWorkflow(cronWorkflow);

    env.GetWorkflowResult(totalRuns);
    this.True(env.IsWorkflowCompleted());
    const err = env.GetWorkflowError();
    this.NoError(err);

    this.Equal(2, totalRuns.value);
  }

  async Test_CronHasLastResult(): Promise<void> {
    const cronWorkflow = (ctx: internal_Context): number => {
      const result = { value: 0 };
      if (HasLastCompletionResult(ctx)) {
        GetLastCompletionResult(ctx, result);
      }
      return result.value + 1;
    };

    const env = this.NewTestWorkflowEnvironment();
    await env.RegisterWorkflow(cronWorkflow);
    const lastResult = 3;
    env.SetLastCompletionResult(lastResult);
    await env.ExecuteWorkflow(cronWorkflow);

    this.True(env.IsWorkflowCompleted());
    this.NoError(env.GetWorkflowError());

    const result = { value: 0 };
    env.GetWorkflowResult(result);
    this.NoError(env.GetWorkflowError());

    this.Equal(lastResult + 1, result.value);
  }

  async Test_ActivityWithProgress(): Promise<void> {
    const activityFn = (ctx: Context): number => {
      const progress = { value: 0 };
      if (HasHeartbeatDetails(ctx)) {
        GetHeartbeatDetails(ctx, progress);
      }
      return progress.value + 1;
    };

    const env = this.NewTestActivityEnvironment();
    await env.RegisterActivity(activityFn);
    const lastProgress = 3;
    env.SetHeartbeatDetails(lastProgress);
    const result = await env.ExecuteActivity(activityFn);

    const newProgress = { value: 0 };
    result.Get(newProgress);

    this.Equal(lastProgress + 1, newProgress.value);
  }

  async Test_ActivityGoexit(): Promise<void> {
    const fn = (ctx: Context): void => {
      throw null;
    };

    const wf = async (ctx: internal_Context): Promise<void> => {
      const ao = new internal_ActivityOptions({
        ActivityID: "",
        HeartbeatTimeout: 0,
        ScheduleToCloseTimeout: 0,
        ScheduleToStartTimeout: Minute,
        StartToCloseTimeout: 5 * Second,
        TaskList: "",
        WaitForCancellation: false,
      });
      ctx = WithActivityOptions(ctx, ao);
      const future = await ExecuteActivity(ctx, fn);
      await future.Get(ctx, null);
    };

    const env = this.NewTestWorkflowEnvironment();
    await env.RegisterActivity(fn);
    await env.RegisterWorkflow(wf);
    await env.ExecuteWorkflow(wf);
    const err = env.GetWorkflowError();
    this.EqualError(err, "activity called runtime.Goexit");
  }

  async Test_SetWorkerStopChannel(): Promise<void> {
    const env = newTestWorkflowEnvironmentImpl(this, undefined);
    const c = new Channel<{}>();
    env.setWorkerStopChannel(c);
    this.NotNil(env.workerStopChannel!);
  }

  async Test_ActivityTimeoutWithDetails(): Promise<void> {
    let count = 0;
    const timeoutFn = (): void => {
      count++;
      throw NewTimeoutError(TimeoutType.START_TO_CLOSE, testErrorDetails1);
    };

    const timeoutWf = async (ctx: internal_Context): Promise<void> => {
      const ao = new internal_ActivityOptions({
        ActivityID: "",
        HeartbeatTimeout: 0,
        ScheduleToCloseTimeout: 0,
        ScheduleToStartTimeout: Minute,
        StartToCloseTimeout: 5 * Second,
        TaskList: "",
        WaitForCancellation: false,
        RetryPolicy: {
          InitialInterval: Second,
          BackoffCoefficient: 1.1,
          MaximumAttempts: 3,
          NonRetriableErrorReasons: ["cadenceInternal:Timeout START_TO_CLOSE"],
          ExpirationInterval: 0,
          MaximumInterval: 0,
        },
      });
      ctx = WithActivityOptions(ctx, ao);
      const future = await ExecuteActivity(ctx, timeoutFn);
      await future.Get(ctx, null);
    };

    const wfEnv = this.NewTestWorkflowEnvironment();
    await wfEnv.RegisterWorkflow(timeoutWf);
    await wfEnv.RegisterActivity(timeoutFn);

    await wfEnv.ExecuteWorkflow(timeoutWf);
    const err = wfEnv.GetWorkflowError();
    this.Error(err);
    this.True(err instanceof internal_TimeoutError);
    const timeoutErr = err as internal_TimeoutError;
    this.Equal(TimeoutType.START_TO_CLOSE, timeoutErr.TimeoutType());
    this.True(timeoutErr.HasDetails());
    const details = { value: "" };
    timeoutErr.Details(details);
    this.NoError(null);
    this.Equal(testErrorDetails1, details.value);
    this.Equal(1, count);

    const activityEnv = this.NewTestActivityEnvironment();
    await activityEnv.RegisterActivity(timeoutFn);

    let activityErr: Error | null = null;
    try {
      await activityEnv.ExecuteActivity(timeoutFn);
    } catch (e) {
      if (!(e instanceof Error)) throw e;
      activityErr = e;
    }
    this.Error(activityErr);
    this.True(activityErr instanceof internal_TimeoutError);
    const activityTimeoutErr = activityErr as internal_TimeoutError;
    this.Equal(TimeoutType.START_TO_CLOSE, activityTimeoutErr.TimeoutType());
    this.True(activityTimeoutErr.HasDetails());
    activityTimeoutErr.Details(details);
    this.NoError(null);
    this.Equal(testErrorDetails1, details.value);
  }

  async Test_ActivityDeadlineExceeded(): Promise<void> {
    const timeoutFn = async (ctx: Context): Promise<void> => {
      await selectOne([
        mapCase(recvCase(ctx.done()), () => true),
      ]);
    };

    const timeoutWf = async (ctx: internal_Context): Promise<void> => {
      const ao = new internal_ActivityOptions({
        ActivityID: "",
        HeartbeatTimeout: 0,
        ScheduleToCloseTimeout: 0,
        ScheduleToStartTimeout: 1 * Minute,
        StartToCloseTimeout: 1 * Second,
        TaskList: "",
        WaitForCancellation: false,
      });
      ctx = WithActivityOptions(ctx, ao);
      const future = await ExecuteActivity(ctx, timeoutFn);
      await future.Get(ctx, null);
    };

    const wfEnv = this.NewTestWorkflowEnvironment();
    await wfEnv.RegisterActivity(timeoutFn);
    await wfEnv.RegisterWorkflow(timeoutWf);
    await wfEnv.ExecuteWorkflow(timeoutWf);
    const err = wfEnv.GetWorkflowError();
    this.Error(err);
    const timeoutErr = err as internal_TimeoutError;
    this.True(err instanceof internal_TimeoutError);
    this.Equal(TimeoutType.START_TO_CLOSE, timeoutErr.TimeoutType());
    this.True(timeoutErr.HasDetails());
    const details = { value: "" };
    timeoutErr.Details(details);
    this.NoError(null);
    this.Equal("context deadline exceeded", details.value);
  }

  async Test_AwaitWithTimeout(): Promise<void> {
    const workflowFn = async (ctx: internal_Context): Promise<boolean> => {
      const t = NewTimer(ctx, Second);
      const value = false;
      await Await(ctx, () => t.IsReady() || value);
      return value;
    };

    const env = this.NewTestWorkflowEnvironment();
    await env.RegisterWorkflow(workflowFn);
    await env.ExecuteWorkflow(workflowFn);
    this.True(env.IsWorkflowCompleted());
    this.NoError(env.GetWorkflowError());
    const result = { value: true };
    env.GetWorkflowResult(result);
    this.False(result.value);
  }

  async Test_Regression_ExecuteChildWorkflowWithCanceledContext(): Promise<void> {
    const check = async (cancelTime: number, bugport: boolean, expected: string) => {
      const env = this.NewTestWorkflowEnvironment();
      env.Test(this.T());
      await env.RegisterWorkflowWithOptions(async (ctx: internal_Context) => {
        await Sleep(ctx, Minute);
      }, {
        Name: "child",
        EnableShortName: false,
        DisableAlreadyRegisteredCheck: false,
      });
      await env.RegisterWorkflowWithOptions(async (ctx: internal_Context) => {
        const [ctxLocalInitial, cancel] = await WithCancel(ctx);
        let ctxLocal = ctxLocalInitial;
        if (cancelTime === 0) {
          await cancel();
        } else if (cancelTime > 0) {
          await Go(ctxLocal, async (ctx: internal_Context) => {
            try {
              await Sleep(ctx, cancelTime);
            } catch (e) {
              if (!(e instanceof Error)) throw e;
            }
            await cancel();
          });
        }

        ctxLocal = await WithChildWorkflowOptions(ctxLocal, {
          ExecutionStartToCloseTimeout: 2 * Minute,
          TaskStartToCloseTimeout: 2 * Minute,
          Bugports: {
            StartChildWorkflowsOnCanceledContext: bugport,
          },
          CronSchedule: "",
          Domain: "",
          ParentClosePolicy: 0,
          TaskList: "",
          WaitForCancellation: false,
          WorkflowID: "",
          WorkflowIDReusePolicy: 0,
        });
        let err: Error | null = null;
        try {
          const future = await ExecuteChildWorkflow(ctxLocal, "child");
          await future.Get(ctxLocal, null);
        } catch (e) {
          if (!(e instanceof Error)) throw e;
          err = e;
        }

        if (err == null) {
          return "no err";
        } else if (err instanceof internal_CanceledError) {
          return "canceled";
        }
        return "unknown: " + err.message;
      }, {
        Name: "parent",
        EnableShortName: false,
        DisableAlreadyRegisteredCheck: false,
      });

      await env.ExecuteWorkflow("parent");
      this.True(env.IsWorkflowCompleted());
      this.NoError(env.GetWorkflowError());

      const result = { value: "" };
      env.GetWorkflowResult(result);
      this.Equal(expected, result.value);
    };

    await this.Run("sanity check", async () => {
      await check(-1, false, "no err");
    });
    await this.Run("canceled after child starts", async () => {
      await check(30 * Second, false, "canceled");
    });
    await this.Run("canceled before child starts", async () => {
      await check(0, false, "canceled");
    });
    await this.Run("canceled before child starts with bugport enabled", async () => {
      await check(0, true, "no err");
    });
  }

}

export function TestUnitTestSuite(): void {
}

export async function testWorkflowHello(ctx: internal_Context): Promise<string> {
  const ao = new internal_ActivityOptions({
    ActivityID: "",
    HeartbeatTimeout: 20 * Second,
    ScheduleToCloseTimeout: 0,
    ScheduleToStartTimeout: Minute,
    StartToCloseTimeout: Minute,
    TaskList: "",
    WaitForCancellation: false,
  });
  ctx = WithActivityOptions(ctx, ao);

  const result = { value: "" };
  const future = await ExecuteActivity(ctx, testActivityHello, "world");
  await future.Get(ctx, result);
  return result.value;
}

export function testWorkflowContext(ctx: internal_Context): string {
  const value = ctx.Value(testHeader);
  if (typeof value === "string") {
    return value;
  }
  throw new Error("context did not propagate to workflow");
}

export function testActivityHello(_ctx: Context, msg: string): string {
  return "hello" + "_" + msg;
}

export function testActivityContext(ctx: Context): string {
  const value = ctx.value<unknown>(testHeader);
  if (typeof value === "string") {
    return value;
  }
  throw new Error("context did not propagate to workflow");
}

export function testActivityCanceled(ctx: Context): number {
    const info = GetActivityInfo(ctx);
    if (info.Attempt < 2) {
        throw NewCanceledError("details");
    }
    return info.Attempt;
}

export async function testWorkflowHeartbeat(ctx: internal_Context, msg: string, waitTime: number): Promise<string> {
  const ao = new internal_ActivityOptions({
    ActivityID: "",
    HeartbeatTimeout: 20 * Second,
    ScheduleToCloseTimeout: 0,
    ScheduleToStartTimeout: Minute,
    StartToCloseTimeout: Minute,
    TaskList: "",
    WaitForCancellation: false,
  });
  ctx = WithActivityOptions(ctx, ao);

  const result = { value: "" };
  const future = await ExecuteActivity(ctx, testActivityHeartbeat, msg, waitTime);
  await future.Get(ctx, result);
  return result.value;
}

export async function testActivityHeartbeat(ctx: Context, msg: string, waitTime: number): Promise<string> {
  GetActivityLogger(ctx).info("testActivityHeartbeat start", { msg, waitTime });

  let currWaitTime = 0;
  while (currWaitTime < waitTime) {
    await RecordActivityHeartbeat(ctx);

    const err = ctx.err();
    if (err != null) {
      throw err;
    }

    let sleepDuration = Second;
    if (currWaitTime + sleepDuration > waitTime) {
      sleepDuration = waitTime - currWaitTime;
    }

    await new Promise<void>((resolve) => {
      globalThis.setTimeout(() => resolve(), sleepDuration / 1e6);
    });
    currWaitTime += sleepDuration;
  }

  return "heartbeat_" + msg;
}

export async function TestRegression_LocalActivityErrorEncoding(): Promise<void> {
  const s = new WorkflowTestSuite({ ctxProps: [] });
  s.SetLogger(NoopLogger());
  const env = s.NewTestWorkflowEnvironment();
  const sentinel = new globalThis.Error('sentinel error value');

  await env.RegisterWorkflowWithOptions(
    async (ctx: internal_Context) => {
      ctx = WithLocalActivityOptions(ctx, {
        ScheduleToCloseTimeout: Second,
      });

      let err: Error | null = null;
      try {
        const future = await ExecuteLocalActivity(
          ctx,
          (ctx: Context) => {
            throw sentinel;
          },
        );
        await future.Get(ctx, null);
      } catch (caught) {
        if (!(caught instanceof Error)) throw caught;
        err = caught;
      }

      const isSentinel = (value: Error | null): value is Error => {
        let current: unknown = value;
        while (current instanceof Error) {
          if (current === sentinel) return true;
          current = current.cause;
        }
        return false;
      };

      if (isSentinel(err)) {
        throw new globalThis.Error(
          'local activity errors need to be encoded, and must not be `.Is` a specific value: ' + err.message,
          { cause: err },
        );
      }

      throw sentinel;
    },
    {
      Name: 'errorsis',
      DisableAlreadyRegisteredCheck: false,
      EnableShortName: false,
    },
  );

  await env.ExecuteWorkflow('errorsis');
  const workflowError = env.GetWorkflowError();

  expect(workflowError).not.toBeNull();
  expect(workflowError instanceof internal_GenericError).toBe(true);
  expect(workflowError === sentinel).toBe(false);
  expect(workflowError?.message ?? '').toContain('sentinel error value');
  expect(workflowError?.message ?? '').not.toContain('need to be encoded');
}
