// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { internal_ActivityOptions, GetActivityInfo } from './activity.js';
import { internal_Context, WithCancel, Background, ErrCanceled } from './context.js';
import { internal_WorkflowInterceptor, internal_WorkflowInterceptorBase, internal_WorkflowInterceptorFactory } from './interceptors.js';
import { WorkflowInfo, internal_Future, NewSelector, NewTimer, Sleep, ExecuteActivity, WithActivityOptions, Now, ExecuteChildWorkflow, Go, NewWaitGroup, WithChildWorkflowOptions, GetActivityOptions, NewChannel, GetWorkflowInfo, NewBufferedChannel, GetSignalChannel, internal_Channel } from './workflow.js';
import { WorkflowTestSuite } from './workflow_testsuite.js';
import { Context, background, withValue } from './runtime/context.js';
import { Hour, Minute, Second } from './runtime/time.js';
import { GoTestifySuite } from './runtime/testify_suite.js';
import { expect } from 'vitest';
import { internal_CanceledError, internal_PanicError, newPanicError, internal_ContinueAsNewError, NewContinueAsNewError } from './error.js';
import { args } from './internal_worker_test.js';
import { NoopLogger } from './runtime/logging.js';
import { workflowOptions, getWorkflowEnvOptions } from './internal_workflow.js';
import { QueryTypeOpenSessions, QueryTypeQueryTypes, QueryTypeStackTrace, NewValue } from './client.js';
import { newTestWorkflowEnv } from './test_helpers_test.js';
import { workflowType, tasklist } from './internal_workflow_client_test.js';
import { convertFromThriftRetryPolicy } from './convert.js';
import { WorkerOptions } from './worker.js';
import { Anything } from './runtime/testify_mock.js';
import { internal_ShadowOptions } from './workflow_shadower.js';
import { getActivityOptions } from './internal_activity.js';

export type key = number;

export interface message {
  Value: string;
}

export interface sayGreetingActivityRequest {
  Name: string;
  Greeting: string;
}

export class WorkflowUnitTest extends WorkflowTestSuite {
  constructor(init?: Partial<WorkflowUnitTest>) {
    super(init);
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  Suite: GoTestifySuite = new GoTestifySuite();

  activityOptions: internal_ActivityOptions = { TaskList: "", ScheduleToCloseTimeout: 0, ScheduleToStartTimeout: 0, StartToCloseTimeout: 0, HeartbeatTimeout: 0, WaitForCancellation: false, ActivityID: "" };

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

  SetupSuite(): void {
    this.activityOptions = new internal_ActivityOptions({
      ActivityID: "",
      ScheduleToCloseTimeout: 0,
      ScheduleToStartTimeout: Minute,
      StartToCloseTimeout: Minute,
      HeartbeatTimeout: 20 * Second,
      TaskList: "",
      WaitForCancellation: false
    });
  }

  SetupTest(): void {
    this.T();
    this.SetLogger(NoopLogger());
  }

  async Test_WorldWorkflow(): Promise<void> {
    const env = newTestWorkflowEnv();
    await env.ExecuteWorkflow(worldWorkflow, "Hello");
    expect(env.IsWorkflowCompleted()).toBe(true);
    expect(env.GetWorkflowError()).toBeNull();
  }

  async Test_SingleActivityWorkflow(): Promise<void> {
    const ao = new internal_ActivityOptions({
      ScheduleToStartTimeout: 10 * Second,
      StartToCloseTimeout: 5 * Second,
      HeartbeatTimeout: 2 * Second,
      ActivityID: "id1",
      TaskList: tasklist,
      ScheduleToCloseTimeout: 0,
      WaitForCancellation: false,
    });
    await singleActivityWorkflowWithOptions(this, ao);
  }

  async Test_SingleActivityWorkflowIsErrorMessagesMatched(): Promise<void> {
    const testCases = [
      {
        name: "ZeroScheduleToStartTimeout",
        ScheduleToStartTimeout: 0 * Second,
        StartToCloseTimeout: 5 * Second,
        ScheduleToCloseTimeout: 0 * Second,
        expectedErrorMessage: "missing or negative ScheduleToStartTimeoutSeconds",
      },
      {
        name: "ZeroStartToCloseTimeout",
        ScheduleToStartTimeout: 10 * Second,
        StartToCloseTimeout: 0 * Second,
        ScheduleToCloseTimeout: 0 * Second,
        expectedErrorMessage: "missing or negative StartToCloseTimeoutSeconds",
      },
      {
        name: "NegativeScheduleToCloseTimeout",
        ScheduleToStartTimeout: 10 * Second,
        StartToCloseTimeout: 5 * Second,
        ScheduleToCloseTimeout: -1 * Second,
        expectedErrorMessage: "invalid negative ScheduleToCloseTimeoutSeconds",
      },
    ];

    for (const testCase of testCases) {
      const ao = new internal_ActivityOptions({
        ScheduleToStartTimeout: testCase.ScheduleToStartTimeout,
        StartToCloseTimeout: testCase.StartToCloseTimeout,
        ScheduleToCloseTimeout: testCase.ScheduleToCloseTimeout,
        HeartbeatTimeout: 2 * Second,
        ActivityID: "id1",
        TaskList: tasklist,
        WaitForCancellation: false,
      });

      this.Run(testCase.name, async () => {
        try {
          await singleActivityWorkflowWithOptions(this, ao);
        } catch (err) {
          if (!(err instanceof Error)) throw err;
          this.ErrorContains(err, testCase.expectedErrorMessage);
        }
      });
    }
  }

  async Test_SplitJoinActivityWorkflow(): Promise<void> {
    const env = newTestWorkflowEnv();
    await env.RegisterWorkflowWithOptions(splitJoinActivityWorkflow, {
      Name: "splitJoinActivityWorkflow",
      DisableAlreadyRegisteredCheck: false,
      EnableShortName: false,
    });
    await env.RegisterActivityWithOptions(testAct, {
      Name: "testActivityWithOptions",
      DisableAlreadyRegisteredCheck: false,
      EnableAutoHeartbeat: false,
      EnableShortName: false,
    });
    (await env.OnActivity(testAct, Anything)).Return((ctx: Context) => {
      const activityID = GetActivityInfo(ctx).ActivityID;
      switch (activityID) {
        case "id1":
          return "Hello";
        case "id2":
          return " Flow!";
        default:
          throw `Unexpected activityID: ${activityID}`;
      }
    }).Twice();

    const tracer = new tracingInterceptorFactory({ instances: [] });
    env.SetWorkerOptions(new WorkerOptions({
      AutoScalerOptions: { Enabled: false, Cooldown: 0, PollerMinCount: 0, PollerMaxCount: 0, PollerInitCount: 0, PollerWaitTimeUpperBound: 0, PollerWaitTimeLowerBound: 0 },
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
      WorkflowInterceptorChainFactories: [tracer],
    }));
    await env.ExecuteWorkflow(splitJoinActivityWorkflow, false);
    this.True(env.IsWorkflowCompleted());
    this.NoError(env.GetWorkflowError());
    env.AssertExpectations(this.T());

    let result = "";
    env.GetWorkflowResult({ value: result });
    this.Equal("Hello Flow!", result);
    this.Equal(1, tracer.instances.length);
    const trace = tracer.instances[tracer.instances.length - 1].trace;
    this.Equal([
      "ExecuteWorkflow splitJoinActivityWorkflow begin",
      "ExecuteActivity testActivityWithOptions",
      "ExecuteActivity testActivityWithOptions",
      "ExecuteWorkflow splitJoinActivityWorkflow end",
    ], trace);
  }

  async Test_ClockWorkflow(): Promise<void> {
    const env = newTestWorkflowEnv();
    await env.ExecuteWorkflow(testClockWorkflow);
    expect(env.IsWorkflowCompleted()).toBe(true);
    expect(env.GetWorkflowError()).toBeNull();
    const nowTime = { value: 0 };
    env.GetWorkflowResult(nowTime);
    expect(nowTime.value !== 0).toBe(true);
  }

  async Test_ExternalExampleWorkflow(): Promise<void> {
    const env = newTestWorkflowEnv();
    await env.RegisterActivity(getGreetingActivity);
    await env.RegisterActivity(getNameActivity);
    await env.RegisterActivity(sayGreetingActivity);

    await env.ExecuteWorkflow(greetingsWorkflow);

    this.True(env.IsWorkflowCompleted());
    this.NoError(env.GetWorkflowError());
    const result = { value: "" };
    env.GetWorkflowResult(result);
    this.Equal("Hello cadence!", result.value);
  }

  async Test_ContinueAsNewWorkflow(): Promise<void> {
    const env = newTestWorkflowEnv();
    await env.ExecuteWorkflow(continueAsNewWorkflowTest);
    this.True(env.IsWorkflowCompleted());
    this.NotNil(env.GetWorkflowError());
    const resultErr = env.GetWorkflowError() as internal_ContinueAsNewError;
    this.EqualValues("continueAsNewWorkflowTest", resultErr.params!.workflowType!.Name);
    this.EqualValues(1, resultErr.params!.executionStartToCloseTimeoutSeconds!);
    this.EqualValues(1, resultErr.params!.taskStartToCloseTimeoutSeconds!);
    this.EqualValues("default-test-tasklist", resultErr.params!.taskListName!);
  }

  async Test_CancelWorkflow(): Promise<void> {
    const env = newTestWorkflowEnv();
    env.RegisterDelayedCallback(async () => {
      await env.CancelWorkflow();
    }, Hour);
    await env.ExecuteWorkflow(cancelWorkflowTest);
    this.True(env.IsWorkflowCompleted(), "Workflow failed to complete");
  }

  async Test_CancelWorkflowAfterActivity(): Promise<void> {
    const env = newTestWorkflowEnv();
    env.RegisterDelayedCallback(async () => {
      await env.CancelWorkflow();
    }, Hour);
    await env.ExecuteWorkflow(cancelWorkflowAfterActivityTest);
    this.True(env.IsWorkflowCompleted());
  }

  async Test_SignalWorkflow(): Promise<void> {
    const expected = [
      "Sig1Value1;",
      "Sig1Value2;",
      "Sig2Value1;",
      "Sig2Value2;",
      "Sig2Value3;",
      "Sig2Value4;",
      "Sig2Value5;",
      "Sig2Value6;",
      "Sig2Value7;",
      "Sig3Value1;",
    ];
    const env = newTestWorkflowEnv();

    for (let i = 0; i < 2; i++) {
      const msg = expected[i];
      let delay = 0;
      if (i > 0) {
        delay = Second;
      }
      env.RegisterDelayedCallback(() => {
        env.SignalWorkflow("testSig1", msg);
      }, delay);
    }

    env.RegisterDelayedCallback(() => {
      env.SignalWorkflow("testSig3", expected[9]);
    }, Hour);

    for (let i = 2; i < 9; i++) {
      const msg = expected[i];
      env.RegisterDelayedCallback(() => {
        env.SignalWorkflow("testSig2", msg);
      }, Hour);
    }

    await env.ExecuteWorkflow(signalWorkflowTest);
    expect(env.IsWorkflowCompleted()).toBe(true);
    expect(env.GetWorkflowError()).toBeNull();

    const result = { value: Buffer.alloc(0) };
    env.GetWorkflowResult(result);
    expect((result.value ?? Buffer.alloc(0)).toString()).toEqual(expected.join(""));
  }

  async Test_CorruptedSignalWorkflow_ShouldLogMetricsAndNotPanic(): Promise<void> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async Test_CorruptedSignalWorkflow_OnSelectorRead_ShouldLogMetricsAndNotPanic(): Promise<void> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async Test_CorruptedSignalWorkflow_ReceiveAsync_ShouldLogMetricsAndNotPanic(): Promise<void> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async Test_CorruptedSignalOnClosedChannelWorkflow_ReceiveAsync_ShouldComplete(): Promise<void> {
    const env = newTestWorkflowEnv();

    await env.ExecuteWorkflow(receiveAsyncCorruptSignalOnClosedChannelWorkflowTest);
    this.True(env.IsWorkflowCompleted());
    this.NoError(env.GetWorkflowError());

    const result = { value: undefined as message[] | undefined };
    env.GetWorkflowResult(result);
    this.EqualValues(0, result.value?.length ?? 0);
  }

  async Test_CorruptedSignalOnClosedChannelWorkflow_Receive_ShouldComplete(): Promise<void> {
    const env = newTestWorkflowEnv();

    env.RegisterDelayedCallback(() => {
      env.SignalWorkflow("channelExpectingTypeMessage", "wrong");
    }, Second);

    await env.ExecuteWorkflow(receiveCorruptSignalOnClosedChannelWorkflowTest);
    expect(env.IsWorkflowCompleted()).toBe(true);
    expect(env.GetWorkflowError()).toBeNull();

    const result = { value: [] as message[] };
    env.GetWorkflowResult(result);
    expect(result.value).toHaveLength(1);
    expect(result.value[0].Value).toBe("false");
  }

  async Test_CloseChannelWorkflow(): Promise<void> {
    const env = newTestWorkflowEnv();
    await env.ExecuteWorkflow(closeChannelTest);
    this.True(env.IsWorkflowCompleted());
    this.NoError(env.GetWorkflowError());
  }

  async Test_CloseChannelInSelectWorkflow(): Promise<void> {
    const env = newTestWorkflowEnv();
    await env.ExecuteWorkflow(closeChannelInSelectTest);
    this.True(env.IsWorkflowCompleted());
    this.NoError(env.GetWorkflowError());
  }

  async Test_BufferedChanWorkflow(): Promise<void> {
    const bufferSizeList = [1, 5];
    for (const bufferSize of bufferSizeList) {
      const env = newTestWorkflowEnv();
      try {
        await env.ExecuteWorkflow(bufferedChanWorkflowTest, bufferSize);
      } catch (err) {
        if (!(err instanceof Error)) throw err;
      }
      this.True(env.IsWorkflowCompleted());
      this.NoError(env.GetWorkflowError());
    }
  }

  async Test_BufferedChanWithSelectorWorkflow(): Promise<void> {
    const bufferSizeList = [1, 5];
    for (const bufferSize of bufferSizeList) {
      const bufferSizeLocal = bufferSize;
      const env = newTestWorkflowEnv();
      try {
        await env.ExecuteWorkflow(bufferedChanWithSelectorWorkflowTest, bufferSizeLocal);
      } catch (err) {
        if (!(err instanceof Error)) throw err;
      }
      this.True(env.IsWorkflowCompleted());
      this.NoError(env.GetWorkflowError());
    }
  }

  async Test_ActivityOptionsWorkflow(): Promise<void> {
    const env = newTestWorkflowEnv();
    await env.ExecuteWorkflow(activityOptionsWorkflow);
    expect(env.IsWorkflowCompleted()).toBe(true);
    expect(env.GetWorkflowError()).toBeNull();
    const result = { value: "" };
    env.GetWorkflowResult(result);
    expect(result.value).toEqual("id1 id2");
  }

  async Test_GetActivityOptions(): Promise<void> {
    const env = newTestWorkflowEnv();
    await env.ExecuteWorkflow(getActivityOptionsWorkflow);
    expect(env.IsWorkflowCompleted()).toBe(true);
    expect(env.GetWorkflowError()).toBeNull();
    const result = { value: "" };
    env.GetWorkflowResult(result);
    expect(result.value).toEqual("ok");
  }

  async Test_GetActivityOptionsNil(): Promise<void> {
    const env = newTestWorkflowEnv();
    await env.ExecuteWorkflow(getActivityOptionsNilWorkflow);
    expect(env.IsWorkflowCompleted()).toBe(true);
    expect(env.GetWorkflowError()).toBeNull();
    const result = { value: "" };
    env.GetWorkflowResult(result);
    expect(result.value).toEqual("defaults");
  }

  Test_GetActivityOptionsNoContext(): void {
    expect(GetActivityOptions(Background())).toBeNull();
  }

  Test_ConvertFromThriftRetryPolicyNil(): void {
    expect(convertFromThriftRetryPolicy(undefined)).toBeUndefined();
  }

  async Test_MemoWorkflow(): Promise<void> {
    const env = newTestWorkflowEnv();
    const memo = {
      [memoTestKey]: memoTestVal,
    };
    await env.SetMemoOnStart(memo);
    await env.ExecuteWorkflow(getMemoTest);
    this.True(env.IsWorkflowCompleted());
    this.NoError(env.GetWorkflowError());
    const result = { value: "" };
    env.GetWorkflowResult(result);
    this.Equal(memoTestVal, result.value);
  }

  async Test_waitGroupNegativeCounterPanicsWorkflowTest(): Promise<void> {
    const env = newTestWorkflowEnv();
    await env.RegisterWorkflow(waitGroupNegativeCounterPanicsWorkflowTest);
    await env.ExecuteWorkflow(waitGroupNegativeCounterPanicsWorkflowTest);
    expect(env.IsWorkflowCompleted()).toBe(true);

    const workflowError = env.GetWorkflowError();
    const resultErr = workflowError as internal_PanicError;
    expect(resultErr.Error()).toEqual("negative WaitGroup counter");
    // @go-weakened: goroutine stack-frame lines are not reproducible in TypeScript
    expect(workflowError).not.toBeNull();
  }

  async Test_WaitGroupMultipleConcurrentWaitsPanicsWorkflowTest(): Promise<void> {
    const env = newTestWorkflowEnv();

    try {
      await env.RegisterWorkflow(waitGroupMultipleConcurrentWaitsPanicsWorkflowTest);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
    }

    try {
      await env.RegisterWorkflow(sleepWorkflow);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
    }

    try {
      await env.ExecuteWorkflow(waitGroupMultipleConcurrentWaitsPanicsWorkflowTest);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
    }

    this.True(env.IsWorkflowCompleted());

    const resultErr = env.GetWorkflowError() as internal_PanicError;
    this.EqualValues("WaitGroup is reused before previous Wait has returned", resultErr.Error());
    this.Contains(resultErr.StackTrace(), "cadence/internal.waitGroupMultipleConcurrentWaitsPanicsWorkflowTest");
  }

  async Test_WaitGroupMultipleWaitsWorkflowTest(): Promise<void> {
    const env = newTestWorkflowEnv();
    await env.RegisterWorkflow(waitGroupMultipleWaitsWorkflowTest);
    await env.RegisterWorkflow(sleepWorkflow);
    await env.ExecuteWorkflow(waitGroupMultipleWaitsWorkflowTest);
    expect(env.IsWorkflowCompleted()).toBe(true);
    expect(env.GetWorkflowError()).toBeNull();

    const total = { value: 0 };
    env.GetWorkflowResult(total);
    expect(total.value).toEqual(10);
  }

  async Test_WaitGroupWaitForMWorkflowTest(): Promise<void> {
    const env = newTestWorkflowEnv();
    await env.RegisterWorkflow(waitGroupWaitForMWorkflowTest);
    await env.RegisterWorkflow(sleepWorkflow);

    const n = 10;
    const m = 5;
    await env.ExecuteWorkflow(waitGroupWaitForMWorkflowTest, n, m);
    this.True(env.IsWorkflowCompleted());
    this.NoError(env.GetWorkflowError());

    const total = { value: 0 };
    env.GetWorkflowResult(total);
    this.Equal(m, total.value);
  }

  async Test_WaitGroupWorkflowTest(): Promise<void> {
    const env = newTestWorkflowEnv();
    await env.RegisterWorkflow(waitGroupWorkflowTest);
    await env.RegisterWorkflow(sleepWorkflow);

    const n = 10;
    await env.ExecuteWorkflow(waitGroupWorkflowTest, n);
    expect(env.IsWorkflowCompleted()).toBe(true);
    expect(env.GetWorkflowError()).toBeNull();
    expect(env.GetWorkflowError()).toBeNull();

    const total = { value: 0 };
    env.GetWorkflowResult(total);
    expect(total.value).toEqual(n);
  }

  async Test_StaleGoroutinesAreShutDown(): Promise<void> {
    throw new globalThis.Error("not implemented"); // @stub
  }

}

export class testTimerWorkflow {
  constructor(init?: Partial<testTimerWorkflow>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  t?: unknown;

  async Execute(ctx: internal_Context, input: Buffer): Promise<Buffer> {
    const t = NewTimer(ctx, 1);

    let isWokeByTimer = false;

    await NewSelector(ctx)
      .AddFuture(t, async (f: internal_Future) => {
        let getErr: Error | null = null;
        try {
          await f.Get(ctx, undefined);
        } catch (err) {
          if (!(err instanceof Error)) throw err;
          getErr = err;
        }
        expect(getErr).toBeNull();
        isWokeByTimer = true;
      })
      .Select(ctx);

    expect(isWokeByTimer).toBe(true);

    const [ctx2, c2] = await WithCancel(ctx);
    const t2 = NewTimer(ctx2, 1);
    await c2();

    let err2: Error | null = null;
    try {
      await t2.Get(ctx2, undefined);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
      err2 = err;
    }

    expect(err2).not.toBeNull();
    expect(err2 instanceof internal_CanceledError).toBe(true);

    const [ctx3] = await WithCancel(ctx);
    let err3: Error | null = null;
    try {
      await Sleep(ctx3, 1);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
      err3 = err;
    }
    expect(err3).toBeNull();

    const [ctx4, c4] = await WithCancel(ctx);
    await c4();

    let err4: Error | null = null;
    try {
      await Sleep(ctx4, 1);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
      err4 = err;
    }

    expect(err4).not.toBeNull();
    expect(err4 instanceof internal_CanceledError).toBe(true);

    return Buffer.from('workflow-completed');
  }

}

export class testActivityCancelWorkflow {
  constructor(init?: Partial<testActivityCancelWorkflow>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  t?: unknown;

  async Execute(ctx: internal_Context, input: Buffer): Promise<Buffer> {
    const ao = new internal_ActivityOptions({
      ActivityID: "",
      HeartbeatTimeout: 0,
      ScheduleToCloseTimeout: 0,
      ScheduleToStartTimeout: 10 * Second,
      StartToCloseTimeout: 5 * Second,
      TaskList: "",
      WaitForCancellation: false,
    });
    ctx = WithActivityOptions(ctx, ao);

    const [ctx1Base, c1] = await WithCancel(ctx);
    let ctx1 = ctx1Base;

    try {
      ao.ActivityID = "id1";
      ctx1 = WithActivityOptions(ctx1, ao);
      let f = await ExecuteActivity(ctx1, testAct);

      const res1Box: { value: string } = { value: "" };
      await f.Get(ctx, res1Box);
      const res1 = res1Box.value;

      if (res1 !== "test") {
        throw new Error("expected activity result to equal test");
      }

      const [ctx2Base, c2] = await WithCancel(ctx);
      let ctx2 = ctx2Base;
      ao.ActivityID = "id2";
      ctx2 = WithActivityOptions(ctx2, ao);
      f = await ExecuteActivity(ctx2, testAct);
      await c2();

      const res2Box: { value: string } = { value: "" };
      let err2: Error | null = null;
      try {
        await f.Get(ctx, res2Box);
      } catch (err) {
        if (!(err instanceof Error)) {
          throw err;
        }
        err2 = err;
      }

      if (err2 === null || !(err2 instanceof internal_CanceledError)) {
        throw new Error("expected activity cancellation");
      }

      return Buffer.from("workflow-completed");
    } finally {
      await c1();
    }
  }

}

export class tracingInterceptorFactory implements internal_WorkflowInterceptorFactory {
  constructor(init?: Partial<tracingInterceptorFactory>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  instances: tracingInterceptor[] = [];

  NewInterceptor(info: WorkflowInfo, next: internal_WorkflowInterceptor): internal_WorkflowInterceptor {
    const result = new tracingInterceptor({ Next: next, trace: [] });
    this.instances.push(result);
    return result;
  }

}

export class tracingInterceptor extends internal_WorkflowInterceptorBase implements internal_WorkflowInterceptor {
  constructor(init?: Partial<tracingInterceptor>) {
    super(init);
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  trace: string[] = [];

  async ExecuteActivity(ctx: internal_Context, activityType: string, ...args: unknown[]): Promise<internal_Future> {
      this.trace.push("ExecuteActivity " + activityType);
      return await this.Next!.ExecuteActivity(ctx, activityType, ...args);
  }

  async ExecuteWorkflow(ctx: internal_Context, workflowType: string, ...args: unknown[]): Promise<unknown[]> {
    this.trace.push("ExecuteWorkflow " + workflowType + " begin");
    const result = await this.Next!.ExecuteWorkflow(ctx, workflowType, ...args);
    this.trace.push("ExecuteWorkflow " + workflowType + " end");
    return result;
  }

}

export class WorkflowOptionTest {
  constructor(init?: Partial<WorkflowOptionTest>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  Suite: GoTestifySuite = new GoTestifySuite();

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

  async TestKnowQueryType_NoHandlers(): Promise<void> {
    const wo = new workflowOptions({
      bugports: { StartChildWorkflowsOnCanceledContext: false },
      contextPropagators: [],
      cronOverlapPolicy: 0,
      cronSchedule: "",
      memo: {},
      parentClosePolicy: 0,
      queryHandlers: {},
      searchAttributes: {},
      signalChannels: {},
      waitForCancellation: false,
      workflowID: "",
      workflowIDReusePolicy: 0,
    });
    this.ElementsMatch(
      [
        QueryTypeStackTrace,
        QueryTypeOpenSessions,
        QueryTypeQueryTypes,
      ],
      wo.KnownQueryTypes(),
    );
  }

  TestKnowQueryType_WithHandlers(): void {
    const wo = new workflowOptions({
      bugports: { StartChildWorkflowsOnCanceledContext: false },
      contextPropagators: [],
      cronOverlapPolicy: 0,
      cronSchedule: "",
      memo: {},
      parentClosePolicy: 0,
      queryHandlers: {
        a: undefined,
        b: undefined,
      },
      searchAttributes: {},
      signalChannels: {},
      waitForCancellation: false,
      workflowID: "",
      workflowIDReusePolicy: 0,
    });

    this.ElementsMatch(
      [
        QueryTypeStackTrace,
        QueryTypeOpenSessions,
        QueryTypeQueryTypes,
        "a",
        "b",
      ],
      wo.KnownQueryTypes(),
    );
  }

}

export function TestWorkflowUnitTest(): void {}

export function worldWorkflow(ctx: internal_Context, input: string): string {
  return input + " World!";
}

export function helloWorldAct(ctx: Context): string {
  const s = ctx.value<WorkflowUnitTest>(unitTestKey) as WorkflowUnitTest;
  const info = GetActivityInfo(ctx);
  s.Equal(tasklist, info.TaskList);
  s.Equal(2 * Second, info.HeartbeatTimeout);
  return "test";
}

export async function singleActivityWorkflowWithOptions(s: WorkflowUnitTest, ao: internal_ActivityOptions): Promise<void> {
  const helloWorldActivityWorkflow = async (ctx: internal_Context, input: string): Promise<string> => {
    const ctx1 = WithActivityOptions(ctx, ao);
    const f = await ExecuteActivity(ctx1, helloWorldAct);
    const r1 = { value: "" };
    await f.Get(ctx, r1);
    return r1.value;
  };

  const env = newTestWorkflowEnv();
  const ctx = withValue(background(), unitTestKey, s);
  env.SetWorkerOptions(new WorkerOptions({
    AutoScalerOptions: { Enabled: false, Cooldown: 0, PollerMinCount: 0, PollerMaxCount: 0, PollerInitCount: 0, PollerWaitTimeUpperBound: 0, PollerWaitTimeLowerBound: 0 },
    BackgroundActivityContext: ctx,
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
    WorkerStopTimeout: 0,
    WorkflowInterceptorChainFactories: []
  }));
  await env.RegisterActivity(helloWorldAct);
  await env.ExecuteWorkflow(helloWorldActivityWorkflow, "Hello");
  s.True(env.IsWorkflowCompleted());

  const workflowError = env.GetWorkflowError();
  if (workflowError != null) {
    throw workflowError;
  }
}

export async function splitJoinActivityWorkflow(ctx: internal_Context, testPanic: boolean): Promise<string> {
  const result1: { value: string } = { value: "" };
  const result2: { value: string } = { value: "" };
  let err1: Error | null = null;
  let err2: Error | null = null;

  const ao = new internal_ActivityOptions({
    ActivityID: "",
    HeartbeatTimeout: 0,
    RetryPolicy: undefined,
    ScheduleToCloseTimeout: 0,
    ScheduleToStartTimeout: 10 * Second,
    StartToCloseTimeout: 5 * Second,
    TaskList: "",
    WaitForCancellation: false
  });
  ctx = WithActivityOptions(ctx, ao);

  const c1 = NewChannel(ctx);
  const c2 = NewChannel(ctx);

  void Go(ctx, async (ctx: internal_Context) => {
    ao.ActivityID = "id1";
    const ctx1 = WithActivityOptions(ctx, ao);
    const f = await ExecuteActivity(ctx1, testAct);
    try {
      await f.Get(ctx, result1);
      err1 = null;
    } catch (err) {
      if (!(err instanceof Error)) throw err;
      err1 = err;
    }
    if (err1 == null) {
      await c1.Send(ctx, true);
    }
  }).catch((err) => {
    if (!(err instanceof Error)) throw err;
  });

  void Go(ctx, async (ctx: internal_Context) => {
    ao.ActivityID = "id2";
    const ctx2 = WithActivityOptions(ctx, ao);
    const f = await ExecuteActivity(ctx2, testAct);
    let err1: Error | null = null;
    try {
      await f.Get(ctx, result2);
      err1 = null;
    } catch (err) {
      if (!(err instanceof Error)) throw err;
      err1 = err;
    }
    if (testPanic) {
      throw "simulated";
    }
    if (err1 == null) {
      await c2.Send(ctx, true);
    }
  }).catch((err) => {
    if (!(err instanceof Error)) throw err;
  });

  await c1.Receive(ctx, null);

  let selected = false;
  await NewSelector(ctx)
    .AddReceive(c2, (c: internal_Channel, more: boolean) => {
      if (!more) {
        throw "more should be true";
      }
      selected = true;
    })
    .Select(ctx);

  if (!selected) {
    throw new Error("selector does not work");
  }
  if (err1 != null) {
    throw err1;
  }
  if (err2 != null) {
    throw err2;
  }

  return result1.value + result2.value;
}

export function returnPanicWorkflow(ctx: internal_Context): Error | null {
  return newPanicError("panicError", "stackTrace");
}

export async function TestWorkflowPanic(): Promise<void> {
  // @go-unlowerable: goroutine stack-frame lines — the Go stack-frame content cannot be reproduced in TypeScript
  const env = newTestWorkflowEnv();

  try {
    await env.RegisterActivity(testAct);
  } catch (err) {
    if (!(err instanceof Error)) throw err;
  }

  try {
    await env.ExecuteWorkflow(splitJoinActivityWorkflow, true);
  } catch (err) {
    if (!(err instanceof Error)) throw err;
  }

  expect(env.IsWorkflowCompleted()).toBe(true);
  expect(env.GetWorkflowError()).not.toBeNull();
  const resultErr = env.GetWorkflowError() as internal_PanicError;
  expect(resultErr.Error()).toEqual("simulated");
  expect(resultErr.StackTrace()).toContain("cadence/internal.splitJoinActivityWorkflow");
}

export async function TestWorkflowReturnsPanic(): Promise<void> {
  // @go-unlowerable: goroutine stack-frame lines — the Go stack-trace content cannot be reproduced in TypeScript
}

export function testClockWorkflow(ctx: internal_Context): number {
  const c = Now(ctx);
  return c;
}

export async function TestTimerWorkflow(): Promise<void> {
  const env = newTestWorkflowEnv();
  const w = new testTimerWorkflow({});

  await env.RegisterWorkflow(w.Execute.bind(w));
  await env.ExecuteWorkflow(w.Execute.bind(w), Buffer.from([1, 2]));
  expect(env.IsWorkflowCompleted()).toBe(true);
  expect(env.GetWorkflowError()).toBeNull();
}

export function testAct(ctx: Context): string {
    return "test";
}

export async function TestActivityCancellation(): Promise<void> {
  const env = newTestWorkflowEnv();
  const w = new testActivityCancelWorkflow();

  try {
    await env.RegisterActivity(testAct);
  } catch (err) {
    if (!(err instanceof Error)) throw err;
  }

  try {
    await env.RegisterWorkflow(w.Execute);
  } catch (err) {
    if (!(err instanceof Error)) throw err;
  }

  try {
    await env.ExecuteWorkflow(w.Execute, Buffer.from([1, 2]));
  } catch (err) {
    if (!(err instanceof Error)) throw err;
  }

  expect(env.IsWorkflowCompleted()).toBe(true);
  expect(env.GetWorkflowError()).toBeNull();
}

export function getGreetingActivity(): string {
  return "Hello";
}

export function getNameActivity(): string {
  return "cadence";
}

export function sayGreetingActivity(input: sayGreetingActivityRequest): string {
  return `${input.Greeting} ${input.Name}!`;
}

/**
 * Greetings Workflow Decider.
 */
export async function greetingsWorkflow(ctx: internal_Context): Promise<string> {
  const ao = new internal_ActivityOptions({
    ActivityID: "",
    HeartbeatTimeout: 0,
    ScheduleToCloseTimeout: 0,
    ScheduleToStartTimeout: 10 * Second,
    StartToCloseTimeout: 5 * Second,
    TaskList: "",
    WaitForCancellation: false
  });
  const ctx1 = WithActivityOptions(ctx, ao);

  let f = await ExecuteActivity(ctx1, getGreetingActivity);
  const greetResultBox: { value: string } = { value: "" };
  await f.Get(ctx, greetResultBox);

  f = await ExecuteActivity(ctx1, getNameActivity);
  const nameResultBox: { value: string } = { value: "" };
  await f.Get(ctx, nameResultBox);

  const request: sayGreetingActivityRequest = {
    Name: nameResultBox.value,
    Greeting: greetResultBox.value
  };
  const resultBox: { value: string } = { value: "" };
  f = await ExecuteActivity(ctx1, sayGreetingActivity, request);
  await f.Get(ctx, resultBox);

  return resultBox.value;
}

export async function continueAsNewWorkflowTest(ctx: internal_Context): Promise<Error | null> {
  return await NewContinueAsNewError(ctx, "continueAsNewWorkflowTest", Buffer.from("start"));
}

export async function cancelWorkflowTest(ctx: internal_Context): Promise<string> {
  await ctx.Done().Receive(ctx, undefined);
  if (ctx.Err() === ErrCanceled) {
    throw ctx.Err();
  }
  return "Completed.";
}

export async function cancelWorkflowAfterActivityTest(ctx: internal_Context): Promise<Buffer> {
    const ao = new internal_ActivityOptions({
        ActivityID: "",
        HeartbeatTimeout: 0,
        ScheduleToCloseTimeout: 0,
        ScheduleToStartTimeout: 10 * Second,
        StartToCloseTimeout: 5 * Second,
        TaskList: "",
        WaitForCancellation: false
    });
    ctx = WithActivityOptions(ctx, ao);

    const future = await ExecuteActivity(ctx, testAct);
    await future.Get(ctx, undefined);

    await Sleep(ctx, 1);

    await ctx.Done().Receive(ctx, undefined);
    if (ctx.Err() === ErrCanceled) {
        const err = ctx.Err();
        if (err != null) {
            throw err;
        }
        return Buffer.from("Cancelled.");
    }
    return Buffer.from("Completed.");
}

export async function signalWorkflowTest(ctx: internal_Context): Promise<Buffer> {
  let result = '';
  const ch = GetSignalChannel(ctx, 'testSig1');
  const v = { value: '' };

  const ok = ch.ReceiveAsync(v);
  if (!ok) {
    throw new Error('testSig1 not received');
  }

  result += v.value;
  await ch.Receive(ctx, v);
  result += v.value;

  let ch2 = GetSignalChannel(ctx, 'testSig2');
  let s = NewSelector(ctx);
  s.AddReceive(ch2, async (c, more) => {
    await c.Receive(ctx, v);
    result += v.value;
  });
  await s.Select(ctx);
  await s.Select(ctx);
  await s.Select(ctx);

  ch2 = GetSignalChannel(ctx, 'testSig2');
  s = NewSelector(ctx);
  s.AddReceive(ch2, async (c, more) => {
    for (let i = 0; i < 4; i++) {
      await c.Receive(ctx, v);
      result += v.value;
    }
  });
  await s.Select(ctx);

  let list = getWorkflowEnvOptions(ctx)!.getUnhandledSignalNames();
  if (list.length !== 1 || list[0] !== 'testSig3') {
    throw 'expecting one unhandled signal';
  }

  const ch3 = GetSignalChannel(ctx, 'testSig3');
  await ch3.Receive(ctx, v);
  result += v.value;

  list = getWorkflowEnvOptions(ctx)!.getUnhandledSignalNames();
  if (list.length !== 0) {
    throw 'expecting no unhandled signals';
  }

  return Buffer.from(result);
}

export async function receiveCorruptSignalWorkflowTest(ctx: internal_Context): Promise<message[]> {
  const ch = GetSignalChannel(ctx, "channelExpectingTypeMessage");
  let result: message[] = [];
  const mBox: { value: message } = { value: { Value: "" } };
  await ch.Receive(ctx, mBox);
  result = [...result, mBox.value];
  return result;
}

export async function receiveCorruptSignalOnClosedChannelWorkflowTest(ctx: internal_Context): Promise<message[]> {
  const ch = GetSignalChannel(ctx, "channelExpectingTypeMessage");
  let result: message[] = [];
  const m: { value: message } = { value: { Value: "" } };
  ch.Close();
  const more = await ch.Receive(ctx, m);

  result.push({ Value: String(more) });
  return result;
}

export async function receiveWithSelectorCorruptSignalWorkflowTest(ctx: internal_Context): Promise<message[]> {
  const result: message[] = [];
  const ch = GetSignalChannel(ctx, "channelExpectingTypeMessage");
  const s = NewSelector(ctx);
  s.AddReceive(ch, async (c: internal_Channel, more: boolean) => {
    const mBox: { value: message } = { value: { Value: "" } };
    await ch.Receive(ctx, mBox);
    result.push(mBox.value);
  });
  await s.Select(ctx);
  return result;
}

export function receiveAsyncCorruptSignalOnClosedChannelWorkflowTest(ctx: internal_Context): number[] {
    const ch = GetSignalChannel(ctx, "channelExpectingInt");
    const result: number[] = [];
    const m = { value: 0 };

    ch.SendAsync("wrong");
    ch.Close();
    const ok = ch.ReceiveAsync(m);
    if (ok === true) {
        result.push(m.value);
    }

    return result;
}

export function receiveAsyncCorruptSignalWorkflowTest(ctx: internal_Context): message[] {
  const ch = GetSignalChannel(ctx, "channelExpectingTypeMessage");
  const result: message[] = [];
  const m: { value: message | undefined } = { value: undefined };

  ch.SendAsync("wrong");
  let ok = ch.ReceiveAsync(m);
  if (ok === true) {
    result.push(m.value!);
  }

  ch.SendAsync("wrong again");
  ch.SendAsync({
    Value: "the right interface",
  });
  ok = ch.ReceiveAsync(m);
  if (ok === true) {
    result.push(m.value!);
  }

  return result;
}

export async function closeChannelTest(ctx: internal_Context): Promise<void> {
  const ch = NewChannel(ctx);

  await Go(ctx, async (ctx: internal_Context) => {
    const dummyBox: { value: Record<string, never> } = { value: {} };
    await ch.Receive(ctx, dummyBox);
    ch.Close();
  });

  await ch.Send(ctx, {});
  return;
}

export async function closeChannelInSelectTest(ctx: internal_Context): Promise<void> {
    const s = NewSelector(ctx);
    const sendCh = NewChannel(ctx);
    const receiveCh = NewChannel(ctx);
    const expectedValue = "expected value";

    await Go(ctx, async (ctx: internal_Context) => {
        sendCh.Close();
        await receiveCh.Send(ctx, expectedValue);
    });

    const vBox: { value: string } = { value: "" };

    s.AddSend(sendCh, {}, () => {
        throw "callback for sendCh should not be executed";
    });

    s.AddReceive(receiveCh, async (c: typeof receiveCh, m: boolean) => {
        await c.Receive(ctx, vBox);
    });

    await s.Select(ctx);

    if (vBox.value !== expectedValue) {
        throw "callback for receiveCh is not executed";
    }
}

export async function bufferedChanWorkflowTest(ctx: internal_Context, bufferSize: number): Promise<void> {
    const bufferedCh = NewBufferedChannel(ctx, bufferSize);

    await Go(ctx, async (ctx: internal_Context) => {
        const dummy: { value: number } = { value: 0 };
        for (let i = 0; i < bufferSize; i++) {
            await bufferedCh.Receive(ctx, dummy);
        }
    });

    for (let i = 0; i < bufferSize + 1; i++) {
        await bufferedCh.Send(ctx, i);
    }
}

export async function bufferedChanWithSelectorWorkflowTest(ctx: internal_Context, bufferSize: number): Promise<void> {
  const bufferedCh = NewBufferedChannel(ctx, bufferSize);
  const selectedCh = NewChannel(ctx);
  const done = NewChannel(ctx);
  const dummy = {};

  for (let i = 0; i < bufferSize; i++) {
    await bufferedCh.Send(ctx, dummy);
  }

  void Go(ctx, async (ctx: internal_Context) => {
    await bufferedCh.Send(ctx, dummy);
    await done.Send(ctx, dummy);
  });

  void Go(ctx, async (ctx: internal_Context) => {
    await selectedCh.Receive(ctx, undefined);
    await bufferedCh.Receive(ctx, undefined);
  });

  const selector = NewSelector(ctx);
  selector.AddSend(selectedCh, dummy, () => {});
  selector.AddSend(bufferedCh, dummy, () => {});
  await selector.Select(ctx);

  await done.Receive(ctx, undefined);
}

export function activityOptionsWorkflow(ctx: internal_Context): string {
	const ao1 = new internal_ActivityOptions({
		ActivityID: "id1",
		HeartbeatTimeout: 0,
		ScheduleToCloseTimeout: 0,
		ScheduleToStartTimeout: 0,
		StartToCloseTimeout: 0,
		TaskList: "",
		WaitForCancellation: false,
	});
	const ao2 = new internal_ActivityOptions({
		ActivityID: "id2",
		HeartbeatTimeout: 0,
		ScheduleToCloseTimeout: 0,
		ScheduleToStartTimeout: 0,
		StartToCloseTimeout: 0,
		TaskList: "",
		WaitForCancellation: false,
	});
	const ctx1 = WithActivityOptions(ctx, ao1);
	const ctx2 = WithActivityOptions(ctx, ao2);

	const ctx1Ao = getActivityOptions(ctx1);
	const ctx2Ao = getActivityOptions(ctx2);
	return ctx1Ao!.ActivityID! + " " + ctx2Ao!.ActivityID!;
}

export function getActivityOptionsWorkflow(ctx: internal_Context): string {
    const ao = new internal_ActivityOptions({
        TaskList: "test-task-list",
        ActivityID: "test-activity-id",
        ScheduleToCloseTimeout: 10 * Second,
        ScheduleToStartTimeout: 5 * Second,
        StartToCloseTimeout: 7 * Second,
        HeartbeatTimeout: 3 * Second,
        WaitForCancellation: true,
        RetryPolicy: {
            InitialInterval: Second,
            BackoffCoefficient: 2.0,
            MaximumInterval: 10 * Second,
            ExpirationInterval: 60 * Second,
            MaximumAttempts: 5,
            NonRetriableErrorReasons: ["bad-error"],
        },
    });

    ctx = WithActivityOptions(ctx, ao);
    const got = GetActivityOptions(ctx);

    if (got == null) {
        throw new Error("GetActivityOptions returned nil");
    }
    if (got.TaskList !== ao.TaskList) {
        throw new Error(`TaskList: got "${got.TaskList}", want "${ao.TaskList}"`);
    }
    if (got.ActivityID !== ao.ActivityID) {
        throw new Error(`ActivityID: got "${got.ActivityID}", want "${ao.ActivityID}"`);
    }
    if (got.ScheduleToCloseTimeout !== ao.ScheduleToCloseTimeout) {
        throw new Error(`ScheduleToCloseTimeout: got ${got.ScheduleToCloseTimeout}, want ${ao.ScheduleToCloseTimeout}`);
    }
    if (got.ScheduleToStartTimeout !== ao.ScheduleToStartTimeout) {
        throw new Error(`ScheduleToStartTimeout: got ${got.ScheduleToStartTimeout}, want ${ao.ScheduleToStartTimeout}`);
    }
    if (got.StartToCloseTimeout !== ao.StartToCloseTimeout) {
        throw new Error(`StartToCloseTimeout: got ${got.StartToCloseTimeout}, want ${ao.StartToCloseTimeout}`);
    }
    if (got.HeartbeatTimeout !== ao.HeartbeatTimeout) {
        throw new Error(`HeartbeatTimeout: got ${got.HeartbeatTimeout}, want ${ao.HeartbeatTimeout}`);
    }
    if (got.WaitForCancellation !== ao.WaitForCancellation) {
        throw new Error(`WaitForCancellation: got ${got.WaitForCancellation}, want ${ao.WaitForCancellation}`);
    }
    if (got.RetryPolicy == null) {
        throw new Error("RetryPolicy is nil");
    }
    if (got.RetryPolicy!.InitialInterval !== ao.RetryPolicy!.InitialInterval) {
        throw new Error(`RetryPolicy.InitialInterval: got ${got.RetryPolicy!.InitialInterval}, want ${ao.RetryPolicy!.InitialInterval}`);
    }
    if (got.RetryPolicy!.BackoffCoefficient !== ao.RetryPolicy!.BackoffCoefficient) {
        throw new Error(`RetryPolicy.BackoffCoefficient: got ${got.RetryPolicy!.BackoffCoefficient}, want ${ao.RetryPolicy!.BackoffCoefficient}`);
    }
    if (got.RetryPolicy!.MaximumInterval !== ao.RetryPolicy!.MaximumInterval) {
        throw new Error(`RetryPolicy.MaximumInterval: got ${got.RetryPolicy!.MaximumInterval}, want ${ao.RetryPolicy!.MaximumInterval}`);
    }
    if (got.RetryPolicy!.ExpirationInterval !== ao.RetryPolicy!.ExpirationInterval) {
        throw new Error(`RetryPolicy.ExpirationInterval: got ${got.RetryPolicy!.ExpirationInterval}, want ${ao.RetryPolicy!.ExpirationInterval}`);
    }
    if (got.RetryPolicy!.MaximumAttempts !== ao.RetryPolicy!.MaximumAttempts) {
        throw new Error(`RetryPolicy.MaximumAttempts: got ${got.RetryPolicy!.MaximumAttempts}, want ${ao.RetryPolicy!.MaximumAttempts}`);
    }
    if (
        got.RetryPolicy!.NonRetriableErrorReasons!.length !== 1 ||
        got.RetryPolicy!.NonRetriableErrorReasons![0] !== "bad-error"
    ) {
        throw new Error(
            `RetryPolicy.NonRetriableErrorReasons: got [${got.RetryPolicy!.NonRetriableErrorReasons!.join(" ")}], want [bad-error]`,
        );
    }

    return "ok";
}

export function getActivityOptionsNilWorkflow(ctx: internal_Context): string {
    const got = GetActivityOptions(ctx);
    if (got == null) {
        throw new Error("GetActivityOptions returned nil, expected non-nil with defaults");
    }
    if (got.ActivityID !== "") {
        throw new Error(`ActivityID: got ${JSON.stringify(got.ActivityID)}, want empty`);
    }
    if (got.RetryPolicy != null) {
        throw new Error(`RetryPolicy: got ${String(got.RetryPolicy!)}, want nil`);
    }
    return "defaults";
}

export function getMemoTest(ctx: internal_Context): string {
    const info = GetWorkflowInfo(ctx);
    const fields = info.Memo!.fields!;
    const val = fields.get(memoTestKey);
    if (!fields.has(memoTestKey)) {
        throw new Error("no memo found");
    }
    const resultBox: { value: string } = { value: "" };
    NewValue(val!).Get(resultBox);
    return resultBox.value;
}

export async function sleepWorkflow(ctx: internal_Context, input: number): Promise<number> {
  await Sleep(ctx, input);
  return 1;
}

export async function waitGroupWorkflowTest(ctx: internal_Context, n: number): Promise<number> {
  ctx = await WithChildWorkflowOptions(ctx, {
    Bugports: { StartChildWorkflowsOnCanceledContext: false },
    CronSchedule: "",
    Domain: "",
    ExecutionStartToCloseTimeout: 30 * Second,
    ParentClosePolicy: 0,
    TaskList: "",
    TaskStartToCloseTimeout: 0,
    WaitForCancellation: false,
    WorkflowID: "",
    WorkflowIDReusePolicy: 0,
  });

  let err: Error | null = null;
  const results: number[] = [];
  const waitGroup = NewWaitGroup(ctx);

  for (let i = 0; i < n; i++) {
    waitGroup.Add(1);
    const t = Second * (i + 1);
    await Go(ctx, async (ctx: internal_Context) => {
      const resultBox: { value: number } = { value: 0 };
      try {
        const future = await ExecuteChildWorkflow(ctx, sleepWorkflow, t);
        await future.Get(ctx, resultBox);
      } catch (caught) {
        if (!(caught instanceof Error)) throw caught;
        err = caught;
      }
      results.push(resultBox.value);
      waitGroup.Done();
    });
  }

  await waitGroup.Wait(ctx);
  if (err != null) {
    throw err;
  }

  let sum = 0;
  for (const v of results) {
    sum = sum + v;
  }

  return sum;
}

export async function waitGroupWaitForMWorkflowTest(ctx: internal_Context, n: number, m: number): Promise<number> {
  ctx = await WithChildWorkflowOptions(ctx, {
    Bugports: { StartChildWorkflowsOnCanceledContext: false },
    CronSchedule: "",
    Domain: "",
    ExecutionStartToCloseTimeout: 30 * Second,
    ParentClosePolicy: 0,
    TaskList: "",
    TaskStartToCloseTimeout: 0,
    WaitForCancellation: false,
    WorkflowID: "",
    WorkflowIDReusePolicy: 0
  });

  let err: Error | null = null;
  const results: number[] = [];
  const waitGroup = NewWaitGroup(ctx);
  waitGroup.Add(m);

  for (let i = 0; i < n; i++) {
    const t = Second * (i + 1);
    await Go(ctx, async (childCtx: internal_Context) => {
      const resultBox: { value: number } = { value: 0 };

      try {
        const future = await ExecuteChildWorkflow(childCtx, sleepWorkflow, t);
        await future.Get(childCtx, resultBox);
      } catch (caught) {
        if (!(caught instanceof Error)) throw caught;
        err = caught;
      }

      results.push(resultBox.value);
      waitGroup.Done();
    });
  }

  await waitGroup.Wait(ctx);

  if (err != null) {
    throw err;
  }

  let sum = 0;
  for (const v of results) {
    sum = sum + v;
  }

  return sum;
}

export async function waitGroupMultipleWaitsWorkflowTest(ctx: internal_Context): Promise<number> {
  ctx = await WithChildWorkflowOptions(ctx, {
    Bugports: { StartChildWorkflowsOnCanceledContext: false },
    CronSchedule: "",
    Domain: "",
    ExecutionStartToCloseTimeout: 30 * Second,
    ParentClosePolicy: 0,
    TaskList: "",
    TaskStartToCloseTimeout: 0,
    WaitForCancellation: false,
    WorkflowID: "",
    WorkflowIDReusePolicy: 0,
  });

  const n = 10;
  let err: Error | null = null;
  const results: number[] = [];
  const waitGroup = NewWaitGroup(ctx);
  waitGroup.Add(4);

  for (let i = 0; i < n; i++) {
    const t = Second * (i + 1);
    await Go(ctx, async (ctx) => {
      const resultBox: { value: number } = { value: 0 };
      try {
        const future = await ExecuteChildWorkflow(ctx, sleepWorkflow, t);
        await future.Get(ctx, resultBox);
        err = null;
      } catch (caught) {
        if (!(caught instanceof Error)) {
          throw caught;
        }
        err = caught;
      }
      results.push(resultBox.value);
      waitGroup.Done();
    });
  }

  try {
    await waitGroup.Wait(ctx);
  } catch (caught) {
    if (!(caught instanceof Error)) {
      throw caught;
    }
  }
  if (err != null) {
    throw err;
  }

  waitGroup.Add(6);
  try {
    await waitGroup.Wait(ctx);
  } catch (caught) {
    if (!(caught instanceof Error)) {
      throw caught;
    }
  }
  if (err != null) {
    throw err;
  }

  let sum = 0;
  for (const v of results) {
    sum = sum + v;
  }

  return sum;
}

export async function waitGroupMultipleConcurrentWaitsPanicsWorkflowTest(ctx: internal_Context): Promise<number> {
  ctx = await WithChildWorkflowOptions(ctx, {
    Bugports: { StartChildWorkflowsOnCanceledContext: false },
    CronSchedule: "",
    Domain: "",
    ExecutionStartToCloseTimeout: 30 * Second,
    ParentClosePolicy: 0,
    TaskList: "",
    TaskStartToCloseTimeout: 0,
    WaitForCancellation: false,
    WorkflowID: "",
    WorkflowIDReusePolicy: 0,
  });

  let err: Error | null = null;
  const result1 = { value: 0 };
  const result2 = { value: 0 };

  const waitGroup = NewWaitGroup(ctx);
  waitGroup.Add(2);

  void Go(ctx, async (ctx: internal_Context) => {
    try {
      const future = await ExecuteChildWorkflow(ctx, sleepWorkflow, 5 * Second);
      await future.Get(ctx, result1);
      err = null;
    } catch (e) {
      if (!(e instanceof Error)) throw e;
      err = e;
    } finally {
      waitGroup.Done();
    }
  }).catch((e) => {
    if (!(e instanceof Error)) throw e;
  });

  void Go(ctx, async (ctx: internal_Context) => {
    try {
      const future = await ExecuteChildWorkflow(ctx, sleepWorkflow, 10 * Second);
      await future.Get(ctx, result2);
      err = null;
    } catch (e) {
      if (!(e instanceof Error)) throw e;
      err = e;
    }
    await waitGroup.Wait(ctx);
  }).catch((e) => {
    if (!(e instanceof Error)) throw e;
  });

  await waitGroup.Wait(ctx);
  if (err != null) {
    throw err;
  }

  return result1.value + result2.value;
}

export async function waitGroupNegativeCounterPanicsWorkflowTest(ctx: internal_Context): Promise<number> {
  ctx = await WithChildWorkflowOptions(ctx, {
    Bugports: { StartChildWorkflowsOnCanceledContext: false },
    CronSchedule: "",
    Domain: "",
    ExecutionStartToCloseTimeout: 30 * Second,
    ParentClosePolicy: 0,
    TaskList: "",
    TaskStartToCloseTimeout: 0,
    WaitForCancellation: false,
    WorkflowID: "",
    WorkflowIDReusePolicy: 0,
  });

  const resultBox: { value: number } = { value: 0 };
  const waitGroup = NewWaitGroup(ctx);

  await Go(ctx, async (ctx: internal_Context) => {
    waitGroup.Done();
    const childWorkflow = await ExecuteChildWorkflow(ctx, sleepWorkflow, 5 * Second);
    await childWorkflow.Get(ctx, resultBox);
  });

  await waitGroup.Wait(ctx);

  return resultBox.value;
}

export function TestWorkflowOption(): void {}

export const memoTestKey = "testKey";

export const memoTestVal = "testVal";

export const unitTestKey = 1;
