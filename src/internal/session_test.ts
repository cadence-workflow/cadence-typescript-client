// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { internal_Context, Background } from './context.js';
import { internal_SessionOptions, CompleteSession, CreateSession, setSessionInfo, internal_SessionInfo, sessionStateClosed, GetSessionInfo, sessionCompletionActivityName, sessionCreationActivity, sessionCreationActivityName, sessionCompletionActivity, sessionStateOpen, sessionStateFailed, errFoundExistingOpenSession, ErrSessionFailed, errTooManySessionsMsg, RecreateSession, deserializeRecreateToken, getCreationTasklist, getResourceSpecificTasklist, createSession } from './session.js';
import { WorkflowTestSuite } from './workflow_testsuite.js';
import { Context } from './runtime/context.js';
import { Hour, Minute, Second } from './runtime/time.js';
import { GoTestifySuite } from './runtime/testify_suite.js';
import { expect } from 'vitest';
import { args } from './internal_worker_test.js';
import { newTestWorkflowEnv } from './test_helpers_test.js';
import { ExecuteActivity, WithActivityOptions, NewTimer } from './workflow.js';
import { internal_ActivityOptions, cadence_internal_ActivityInfo } from './activity.js';
import { Anything } from './runtime/testify_mock.js';
import { tasklist } from './internal_workflow_client_test.js';
import { internal_Values } from './encoded.js';
import { activityInfo, getActivityOptions } from './internal_activity.js';
import { defaultTestTaskList } from './internal_workflow_testsuite.js';
import { WorkerOptions } from './worker.js';
import { internal_ShadowOptions } from './workflow_shadower.js';

export class SessionTestSuite extends WorkflowTestSuite {
  constructor(init?: Partial<SessionTestSuite>) {
    super(init);
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  Assertions: GoTestifySuite = new GoTestifySuite();

  Suite: GoTestifySuite = new GoTestifySuite();

  sessionOptions?: internal_SessionOptions;

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

  SetupSuite(): void {
    this.sessionOptions = {
      ExecutionTimeout: Minute,
      CreationTimeout: Minute,
      HeartbeatTimeout: 0,
    };
  }

  SetupTest(): void {
  }

  async TestCreationCompletion(): Promise<void> {
    const workflowFn = async (ctx: internal_Context): Promise<void> => {
      const ao = new internal_ActivityOptions({
        ScheduleToStartTimeout: Minute,
        StartToCloseTimeout: Minute,
        HeartbeatTimeout: Second * 20,
        ActivityID: "",
        ScheduleToCloseTimeout: 0,
        TaskList: "",
        WaitForCancellation: false
      });
      ctx = WithActivityOptions(ctx, ao);
      const sessionCtx = await CreateSession(ctx, this.sessionOptions!);
      let info = GetSessionInfo(sessionCtx);
      if (info == null || info.sessionState !== sessionStateOpen) {
        throw new Error("session state should be open after creation");
      }

      try {
        await CompleteSession(sessionCtx);
      } catch (err) {
        if (!(err instanceof Error)) {
          throw err;
        }
      }

      info = GetSessionInfo(sessionCtx);
      if (info == null || info.sessionState !== sessionStateClosed) {
        throw new Error("session state should be closed after completion");
      }
    };

    const env = newTestWorkflowEnv();
    await env.RegisterWorkflow(workflowFn);
    (await env.OnActivity(sessionCreationActivityName, Anything, Anything))
      .Return(sessionCreationActivity)
      .Once();
    (await env.OnActivity(sessionCompletionActivityName, Anything, Anything))
      .Return(sessionCompletionActivity)
      .Once();
    await env.ExecuteWorkflow(workflowFn);

    this.True(env.IsWorkflowCompleted());
    this.NoError(env.GetWorkflowError());
    env.AssertExpectations(this.T());
  }

  async TestCreationWithOpenSessionContext(): Promise<void> {
    const workflowFn = async (ctx: internal_Context): Promise<void> => {
      const sessionCtx = setSessionInfo(ctx, new internal_SessionInfo({
        SessionID: "some random sessionID",
        tasklist: "some random tasklist",
        sessionState: sessionStateOpen,
        HostName: "",
        resourceID: "",
      }));
      await CreateSession(sessionCtx, this.sessionOptions!);
    };

    const env = newTestWorkflowEnv();
    try {
      await env.ExecuteWorkflow(workflowFn);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
    }

    this.True(env.IsWorkflowCompleted());
    this.Equal(errFoundExistingOpenSession.message, env.GetWorkflowError()!.message);
    env.AssertExpectations(this.T());
  }

  async TestCreationWithClosedSessionContext(): Promise<void> {
    const workflowFn = async (ctx: internal_Context): Promise<void> => {
      const ao = new internal_ActivityOptions({
        ActivityID: "",
        HeartbeatTimeout: Second * 20,
        ScheduleToCloseTimeout: 0,
        ScheduleToStartTimeout: Minute,
        StartToCloseTimeout: Minute,
        TaskList: "",
        WaitForCancellation: false,
      });
      ctx = WithActivityOptions(ctx, ao);
      const sessionCtx = setSessionInfo(ctx, new internal_SessionInfo({
        HostName: "",
        SessionID: "some random sessionID",
        resourceID: "",
        sessionState: sessionStateClosed,
        tasklist: tasklist,
      }));

      const createdSessionCtx = await CreateSession(sessionCtx, this.sessionOptions!);
      try {
        await CompleteSession(createdSessionCtx);
      } catch (err) {
        if (!(err instanceof Error)) throw err;
      }
    };

    const env = newTestWorkflowEnv();
    await env.RegisterWorkflow(workflowFn);
    (await env.OnActivity(sessionCreationActivityName, Anything, Anything)).Return(sessionCreationActivity).Once();
    (await env.OnActivity(sessionCompletionActivityName, Anything, Anything)).Return(sessionCompletionActivity).Once();
    await env.ExecuteWorkflow(workflowFn);

    this.True(env.IsWorkflowCompleted());
    this.NoError(env.GetWorkflowError());
    env.AssertExpectations(this.T());
  }

  async TestCreationWithFailedSessionContext(): Promise<void> {
    const workflowFn = async (ctx: internal_Context): Promise<void> => {
      const ao = new internal_ActivityOptions({
        ActivityID: "",
        HeartbeatTimeout: Second * 20,
        ScheduleToCloseTimeout: 0,
        ScheduleToStartTimeout: Minute,
        StartToCloseTimeout: Minute,
        TaskList: "",
        WaitForCancellation: false,
      });
      ctx = WithActivityOptions(ctx, ao);
      let sessionCtx = setSessionInfo(ctx, new internal_SessionInfo({
        HostName: "",
        SessionID: "some random sessionID",
        resourceID: "",
        tasklist,
        sessionState: sessionStateFailed,
      }));

      sessionCtx = await CreateSession(sessionCtx, this.sessionOptions!);
      try {
        await CompleteSession(sessionCtx);
      } catch (err) {
        if (!(err instanceof Error)) {
          throw err;
        }
      }
    };

    const env = newTestWorkflowEnv();
    await env.RegisterWorkflow(workflowFn);
    const creationCall = await env.OnActivity(sessionCreationActivityName, Anything, Anything);
    creationCall.Return(sessionCreationActivity).Once();
    const completionCall = await env.OnActivity(sessionCompletionActivityName, Anything, Anything);
    completionCall.Return(sessionCompletionActivity).Once();
    await env.ExecuteWorkflow(workflowFn);

    this.True(env.IsWorkflowCompleted());
    this.NoError(env.GetWorkflowError());
    env.AssertExpectations(this.T());
  }

  async TestCompletionWithClosedSessionContext(): Promise<void> {
    const workflowFn = async (ctx: internal_Context): Promise<void> => {
      const sessionCtx = setSessionInfo(ctx, new internal_SessionInfo({
        HostName: "",
        SessionID: "some random sessionID",
        resourceID: "",
        tasklist: "some random tasklist",
        sessionState: sessionStateClosed,
      }));
      await CompleteSession(sessionCtx);
    };

    const env = newTestWorkflowEnv();
    await env.RegisterWorkflow(workflowFn);
    await env.ExecuteWorkflow(workflowFn);

    expect(env.IsWorkflowCompleted()).toBe(true);
    expect(env.GetWorkflowError()).toBeNull();
    env.AssertExpectations(this.T());
  }

  async TestCompletionWithFailedSessionContext(): Promise<void> {
    const workflowFn = async (ctx: internal_Context): Promise<void> => {
      const sessionCtx = setSessionInfo(ctx, new internal_SessionInfo({
        HostName: "",
        SessionID: "some random sessionID",
        resourceID: "",
        tasklist,
        sessionState: sessionStateFailed,
      }));
      try {
        await CompleteSession(sessionCtx);
      } catch (err) {
        if (!(err instanceof Error)) throw err;
      }
    };

    const env = newTestWorkflowEnv();
    await env.RegisterWorkflow(workflowFn);
    await env.ExecuteWorkflow(workflowFn);

    expect(env.IsWorkflowCompleted()).toBe(true);
    expect(env.GetWorkflowError()).toBeNull();
    env.AssertExpectations(this.T());
  }

  async TestGetSessionInfo(): Promise<void> {
    const workflowFn = (ctx: internal_Context): void => {
      let info = GetSessionInfo(ctx);
      if (info != null) {
        throw new Error("GetSessionInfo should return nil when there's no session info");
      }

      let sessionCtx = setSessionInfo(ctx, new internal_SessionInfo({
        HostName: "",
        resourceID: "",
        SessionID: "some random sessionID",
        tasklist,
        sessionState: sessionStateFailed,
      }));
      info = GetSessionInfo(sessionCtx);
      if (info == null) {
        throw new Error("returned session info should not be nil");
      }

      const newSessionInfo = new internal_SessionInfo({
        HostName: "",
        resourceID: "",
        SessionID: "another sessionID",
        tasklist: "another tasklist",
        sessionState: sessionStateClosed,
      });
      sessionCtx = setSessionInfo(ctx, newSessionInfo);
      info = GetSessionInfo(sessionCtx);
      if (info == null) {
        throw new Error("returned session info should not be nil");
      }
      if (info !== newSessionInfo) {
        throw new Error("GetSessionInfo should return info for the most recent session in the context");
      }
    };

    const env = newTestWorkflowEnv();
    await env.RegisterWorkflow(workflowFn);
    await env.ExecuteWorkflow(workflowFn);

    this.True(env.IsWorkflowCompleted());
    this.NoError(env.GetWorkflowError());
  }

  async TestRecreation(): Promise<void> {
    const workflowFn = async (ctx: internal_Context): Promise<void> => {
      const ao = new internal_ActivityOptions({
        ActivityID: "",
        HeartbeatTimeout: Second * 20,
        RetryPolicy: undefined,
        ScheduleToCloseTimeout: 0,
        ScheduleToStartTimeout: Minute,
        StartToCloseTimeout: Minute,
        TaskList: "",
        WaitForCancellation: false,
      });
      ctx = WithActivityOptions(ctx, ao);
      const sessionInfo = new internal_SessionInfo({
        HostName: "",
        SessionID: "some random sessionID",
        resourceID: "",
        sessionState: sessionStateFailed,
        tasklist,
      });

      const sessionCtx = await RecreateSession(
        ctx,
        sessionInfo.GetRecreateToken(),
        this.sessionOptions!,
      );
      try {
        await CompleteSession(sessionCtx);
      } catch (err) {
        if (!(err instanceof Error)) throw err;
      }
    };

    const env = newTestWorkflowEnv();
    try {
      await env.RegisterWorkflow(workflowFn);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
    }
    (await env.OnActivity(sessionCreationActivityName, Anything, Anything))
      .Return(sessionCreationActivity)
      .Once();
    (await env.OnActivity(sessionCompletionActivityName, Anything, Anything))
      .Return(sessionCompletionActivity)
      .Once();
    try {
      await env.ExecuteWorkflow(workflowFn);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
    }

    expect(env.IsWorkflowCompleted()).toBe(true);
    expect(env.GetWorkflowError()).toBeNull();
    env.AssertExpectations(this.T());
  }

  async TestMaxConcurrentSession_CreationOnly(): Promise<void> {
    const maxConcurrentSessionExecutionSize = 3;
    const workflowFn = async (ctx: internal_Context): Promise<void> => {
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
      for (let i = 0; i !== maxConcurrentSessionExecutionSize + 1; i++) {
        await this.createSessionWithoutRetry(ctx);
      }
    };

    const env = newTestWorkflowEnv();
    await env.RegisterWorkflow(workflowFn);
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
      MaxConcurrentSessionExecutionSize: maxConcurrentSessionExecutionSize,
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
    await env.ExecuteWorkflow(workflowFn);

    this.True(env.IsWorkflowCompleted());
    this.Equal(errTooManySessionsMsg, env.GetWorkflowError()!.message);
  }

  async TestMaxConcurrentSession_WithRecreation(): Promise<void> {
    const maxConcurrentSessionExecutionSize = 3;
    const workflowFn = async (ctx: internal_Context): Promise<void> => {
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
      const sessionCtx = await CreateSession(ctx, this.sessionOptions!);
      const sessionInfo = GetSessionInfo(sessionCtx);
      if (sessionInfo == null) {
        throw new Error("Returned session info should not be nil");
      }

      for (let i = 0; i !== maxConcurrentSessionExecutionSize; i++) {
        if (i % 2 === 0) {
          await this.createSessionWithoutRetry(ctx);
        } else {
          await RecreateSession(ctx, sessionInfo.GetRecreateToken(), this.sessionOptions!);
        }
      }
    };

    const env = newTestWorkflowEnv();
    await env.RegisterWorkflow(workflowFn);
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
      MaxConcurrentSessionExecutionSize: maxConcurrentSessionExecutionSize,
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
    (await env.OnActivity(sessionCreationActivityName, Anything, Anything)).Return(sessionCreationActivity);
    await env.ExecuteWorkflow(workflowFn);

    this.True(env.IsWorkflowCompleted());
    this.Equal(errTooManySessionsMsg, env.GetWorkflowError()!.message);
    env.AssertExpectations(this.T());
  }

  async TestSessionTaskList(): Promise<void> {
    const numActivities = 3;
    const workflowFn = async (ctx: internal_Context): Promise<void> => {
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
      const sessionCtx = await CreateSession(ctx, this.sessionOptions!);

      for (let i = 0; i !== numActivities; i++) {
        const future = await ExecuteActivity(sessionCtx, testSessionActivity, "a random name");
        await future.Get(sessionCtx, undefined);
      }

      try {
        await CompleteSession(sessionCtx);
      } catch (err) {
        if (!(err instanceof Error)) throw err;
      }
    };

    const env = newTestWorkflowEnv();
    try {
      await env.RegisterActivity(testSessionActivity);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
    }

    const taskListUsed: string[] = [];
    env.SetOnActivityStartedListener((activityInfo: cadence_internal_ActivityInfo, ctx: Context, args: internal_Values) => {
      taskListUsed.push(activityInfo.TaskList);
    });
    const resourceID = "testResourceID";
    (await env.OnActivity(sessionCreationActivityName, Anything, Anything)).Return(sessionCreationActivity).Once();
    (await env.OnActivity(sessionCompletionActivityName, Anything, Anything)).Return(sessionCompletionActivity).Once();
    try {
      await env.ExecuteWorkflow(workflowFn);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
    }

    this.True(env.IsWorkflowCompleted());
    this.NoError(env.GetWorkflowError());
    this.Equal(getCreationTasklist(defaultTestTaskList), taskListUsed[0]);
    const expectedTaskList = getResourceSpecificTasklist(resourceID);
    for (const taskList of taskListUsed.slice(1)) {
      this.Equal(expectedTaskList, taskList);
    }
    env.AssertExpectations(this.T());
  }

  async TestSessionRecreationTaskList(): Promise<void> {
    const numActivities = 3;
    const resourceID = "testResourceID";
    const resourceSpecificTaskList = getResourceSpecificTasklist(resourceID);

    const workflowFn = async (ctx: internal_Context): Promise<void> => {
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

      const sessionInfo = new internal_SessionInfo({
        HostName: "",
        SessionID: "testSessionID",
        resourceID: "",
        tasklist: resourceSpecificTaskList,
        sessionState: sessionStateClosed,
      });
      const sessionCtx = await RecreateSession(
        ctx,
        sessionInfo.GetRecreateToken(),
        this.sessionOptions!,
      );

      for (let i = 0; i !== numActivities; i++) {
        const future = await ExecuteActivity(sessionCtx, testSessionActivity, "a random name");
        await future.Get(sessionCtx, undefined);
      }

      try {
        await CompleteSession(sessionCtx);
      } catch (err) {
        if (!(err instanceof Error)) throw err;
      }
    };

    const env = newTestWorkflowEnv();
    try {
      await env.RegisterActivity(testSessionActivity);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
    }

    const taskListUsed: string[] = [];
    env.SetOnActivityStartedListener((activityInfo: cadence_internal_ActivityInfo, ctx: Context, args: internal_Values) => {
      taskListUsed.push(activityInfo.TaskList);
    });

    (await env.OnActivity(sessionCreationActivityName, Anything, Anything))
      .Return(sessionCreationActivity)
      .Once();
    (await env.OnActivity(sessionCompletionActivityName, Anything, Anything))
      .Return(sessionCompletionActivity)
      .Once();

    try {
      await env.ExecuteWorkflow(workflowFn);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
    }

    this.True(env.IsWorkflowCompleted());
    this.NoError(env.GetWorkflowError());
    for (const taskList of taskListUsed) {
      this.Equal(resourceSpecificTaskList, taskList);
    }
    env.AssertExpectations(this.T());
  }

  async TestExecuteActivityInFailedSession(): Promise<void> {
    const workflowFn = async (ctx: internal_Context): Promise<void> => {
      const ao = new internal_ActivityOptions({
        ActivityID: "",
        HeartbeatTimeout: Second * 20,
        ScheduleToCloseTimeout: 0,
        ScheduleToStartTimeout: Minute,
        StartToCloseTimeout: Minute,
        TaskList: "",
        WaitForCancellation: false,
      });
      ctx = WithActivityOptions(ctx, ao);
      const sessionCtx = setSessionInfo(
        ctx,
        new internal_SessionInfo({
          HostName: "",
          SessionID: "random sessionID",
          resourceID: "",
          tasklist: "random tasklist",
          sessionState: sessionStateFailed,
        }),
      );

      const future = await ExecuteActivity(sessionCtx, testSessionActivity, "a random name");
      await future.Get(sessionCtx, null);
    };

    const env = newTestWorkflowEnv();
    await env.RegisterWorkflow(workflowFn);
    await env.ExecuteWorkflow(workflowFn);

    this.True(env.IsWorkflowCompleted());
    this.Equal(ErrSessionFailed.message, env.GetWorkflowError()!.message);
  }

  async TestExecuteActivityInClosedSession(): Promise<void> {
    const workflowFn = async (ctx: internal_Context): Promise<void> => {
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
      const sessionCtx = setSessionInfo(ctx, new internal_SessionInfo({
        HostName: "",
        SessionID: "random sessionID",
        resourceID: "",
        tasklist: "random tasklist",
        sessionState: sessionStateClosed,
      }));

      const future = await ExecuteActivity(sessionCtx, testSessionActivity, "some random message");
      await future.Get(sessionCtx, undefined);
    };

    const env = newTestWorkflowEnv();
    try {
      await env.RegisterWorkflow(workflowFn);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
    }
    try {
      await env.RegisterActivity(testSessionActivity);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
    }

    let taskListUsed = "";
    env.SetOnActivityStartedListener(async (activityInfo: cadence_internal_ActivityInfo, ctx: Context, args: internal_Values): Promise<void> => {
      taskListUsed = activityInfo.TaskList;
    });

    try {
      await env.ExecuteWorkflow(workflowFn);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
    }

    expect(env.IsWorkflowCompleted()).toBe(true);
    expect(env.GetWorkflowError()).toBeNull();
    expect(taskListUsed).toEqual(defaultTestTaskList);
  }

  TestSessionRecreateToken(): void {
    const testTasklist = "some random tasklist";

    const sessionInfo = new internal_SessionInfo({
      HostName: "",
      SessionID: "testSessionID",
      resourceID: "",
      tasklist,
      sessionState: sessionStateClosed,
    });
    const token = sessionInfo.GetRecreateToken();
    const params = deserializeRecreateToken(token);
    this.Equal(testTasklist, params.Tasklist);
  }

  async TestInvalidRecreateToken(): Promise<void> {
    const token = Buffer.from("some invalid token");
    let sessionCtx: internal_Context | null = null;
    try {
      sessionCtx = await RecreateSession(Background(), token, this.sessionOptions!);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
      this.Error(err);
    }
    this.Nil(sessionCtx);
  }

  async TestCompletionFailed(): Promise<void> {
    const workflowFn = async (ctx: internal_Context): Promise<void> => {
      const ao = new internal_ActivityOptions({
        ActivityID: "",
        HeartbeatTimeout: 20 * Second,
        RetryPolicy: undefined,
        ScheduleToCloseTimeout: 0,
        ScheduleToStartTimeout: Minute,
        StartToCloseTimeout: Minute,
        TaskList: "",
        WaitForCancellation: false,
      });
      ctx = WithActivityOptions(ctx, ao);
      const sessionCtx = await CreateSession(ctx, this.sessionOptions!);

      try {
        await CompleteSession(sessionCtx);
      } catch (err) {
        if (!(err instanceof Error)) {
          throw err;
        }
      }

      const info = GetSessionInfo(sessionCtx);
      if (info == null || info.sessionState !== sessionStateClosed) {
        throw new Error("session state should be closed after completion even when completion activity failed");
      }
    };

    const env = newTestWorkflowEnv();
    await env.RegisterWorkflow(workflowFn);
    (await env.OnActivity(sessionCreationActivityName, Anything, Anything)).Return(sessionCreationActivity).Once();
    (await env.OnActivity(sessionCompletionActivityName, Anything, Anything)).Return(new Error("some random error")).Once();
    await env.ExecuteWorkflow(workflowFn);

    env.AssertExpectations(this.T());
    this.True(env.IsWorkflowCompleted());
    this.NoError(env.GetWorkflowError());
    env.AssertExpectations(this.T());
  }

  async TestUserTimerWithinSession(): Promise<void> {
    const workflowFn = async (ctx: internal_Context): Promise<void> => {
      const sessionCtx = await CreateSession(ctx, this.sessionOptions!);
      try {
        await NewTimer(sessionCtx, Hour).Get(sessionCtx, null);
      } finally {
        try {
          await CompleteSession(sessionCtx);
        } catch (err) {
          if (!(err instanceof Error)) throw err;
        }
      }
    };

    const env = newTestWorkflowEnv();
    await env.RegisterWorkflow(workflowFn);
    await env.ExecuteWorkflow(workflowFn);

    env.AssertExpectations(this.T());
    this.True(env.IsWorkflowCompleted());
    this.NoError(env.GetWorkflowError());
  }

  async TestActivityRetryWithinSession(): Promise<void> {
    const workflowFn = async (ctx: internal_Context): Promise<void> => {
      const ao = new internal_ActivityOptions({
        ActivityID: "",
        HeartbeatTimeout: Second * 20,
        RetryPolicy: {
          InitialInterval: Second,
          BackoffCoefficient: 2.0,
          MaximumInterval: Minute,
          ExpirationInterval: Minute * 10,
          MaximumAttempts: 0,
          NonRetriableErrorReasons: ["bad-error"],
        },
        ScheduleToCloseTimeout: 0,
        ScheduleToStartTimeout: Minute,
        StartToCloseTimeout: Minute,
        TaskList: "",
        WaitForCancellation: false,
      });
      ctx = WithActivityOptions(ctx, ao);
      const sessionCtx = await CreateSession(ctx, this.sessionOptions!);

      try {
        const future = await ExecuteActivity(sessionCtx, testSessionActivity, "");
        await future.Get(sessionCtx, null);
      } finally {
        try {
          await CompleteSession(sessionCtx);
        } catch (err) {
          if (!(err instanceof Error)) throw err;
        }
      }
    };

    const env = newTestWorkflowEnv();
    await env.RegisterActivity(testSessionActivity);
    (await env.OnActivity(testSessionActivity, Anything, Anything)).Return(
      "",
      new Error("some random error"),
    );
    await env.ExecuteWorkflow(workflowFn);

    env.AssertExpectations(this.T());
    this.True(env.IsWorkflowCompleted());
    this.Error(env.GetWorkflowError());
  }

  async createSessionWithoutRetry(ctx: internal_Context): Promise<internal_Context> {
    const options = getActivityOptions(ctx)!;
    let baseTasklist = options.TaskListName;
    if (baseTasklist === "") {
      baseTasklist = options.OriginalTaskListName;
    }
    return await createSession(ctx, getCreationTasklist(baseTasklist), this.sessionOptions!, false);
  }

}

export function TestSessionTestSuite(): void {
}

export function testSessionActivity(ctx: Context, name: string): string {
  return "Hello" + name + "!";
}
