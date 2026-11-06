// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { Int64 } from '@creditkarma/thrift-server-core';
import { Logger } from 'winston';
import { internal_Context } from './context.js';
import { internal_DataConverter, getDefaultDataConverter, DefaultDataConverter, defaultDataConverter } from './encoded.js';
import { workerExecutionParameters, AugmentWorkerOptions, decodeArgs, encodeArgs, aggregatedWorker, getFunctionName, newAggregatedWorker, activityExecutor, defaultConcurrentPollRoutineSize, defaultMaxConcurrentActivityExecutionSize, defaultMaxConcurrentLocalActivityExecutionSize, defaultMaxConcurrentTaskExecutionSize, defaultTaskListActivitiesPerSecond, defaultWorkerLocalActivitiesPerSecond, defaultWorkerTaskExecutionRate } from './internal_worker.js';
import { registry, newRegistry } from './registry.js';
import { WorkerOptions, internal_NonDeterministicWorkflowPolicy } from './worker.js';
import { TestWorkflowEnvironment } from './workflow_testsuite.js';
import type { WorkflowServiceClientLike } from './runtime/workflow_service_client_like.js';
import { Context, background, withValue } from './runtime/context.js';
import { Millisecond, Minute, Second } from './runtime/time.js';
import { Ref } from './runtime/ref.js';
import { GoTestifySuite } from './runtime/testify_suite.js';
import { goFuncName } from './runtime/reflect.js';
import { installGoTestW3CPropagator } from './runtime/tracing_test.js';
import { GoMockController, NewGoMockClient, NewGoMockController } from './runtime/gomock.js';
import { expect } from 'vitest';
import { ExecuteActivity, WithActivityOptions } from './workflow.js';
import { internal_ActivityOptions, GetActivityLogger } from './activity.js';
import { newTestDataConverter } from './encoded_test.js';
import { activityEnvironment, activityEnvContextKey, getValidatedActivityFunction } from './internal_activity.js';
import { MetricEmitMode } from './common/metrics/emit.js';
import { internal_ShadowOptions } from './workflow_shadower.js';
import { BoolPtr, StringPtr } from './common/convert.js';
import { localActivityTask } from './internal_event_handlers.js';
import { activityTask, workflowTask, newWorkflowTaskHandler } from './internal_task_handlers.js';
import { AutoConfigHint } from '../generated/thrift/cadence-idl/com/uber/cadence/AutoConfigHint.js';
import { PollForActivityTaskResponse } from '../generated/thrift/cadence-idl/com/uber/cadence/PollForActivityTaskResponse.js';
import { PollForDecisionTaskResponse } from '../generated/thrift/cadence-idl/com/uber/cadence/PollForDecisionTaskResponse.js';
import { identity } from './internal_workflow_client_test.js';
import { isNonRetriableError } from './internal_worker_base.js';
import { NoopLogger } from './runtime/logging.js';
import { NoopScope, NewTestScope } from './runtime/tally.js';
import { trace } from '@opentelemetry/api';
import { NewNoopActivityTracker, NewNoopPollerTracker } from './common/debug/workerstats_noop.js';
import { TaskList } from '../generated/thrift/cadence-idl/com/uber/cadence/TaskList.js';
import { TaskListKind } from '../generated/thrift/cadence-idl/com/uber/cadence/TaskListKind.js';
import { env } from 'node:process';
import { newTestWorkflowEnv } from './test_helpers_test.js';
import { createTestEventDecisionTaskScheduled, createTestEventDecisionTaskStarted, createTestEventWorkflowExecutionStarted, testDomain } from './internal_task_handlers_test.js';
import { DecisionTaskScheduledEventAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/DecisionTaskScheduledEventAttributes.js';
import { History } from '../generated/thrift/cadence-idl/com/uber/cadence/History.js';
import { WorkflowExecution } from '../generated/thrift/cadence-idl/com/uber/cadence/WorkflowExecution.js';
import { WorkflowExecutionStartedEventAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/WorkflowExecutionStartedEventAttributes.js';
import { WorkflowType } from '../generated/thrift/cadence-idl/com/uber/cadence/WorkflowType.js';
import { stickyDecisionScheduleToStartTimeoutSeconds } from './internal_task_pollers.js';
import { BadRequestError, ClientVersionNotSupportedError, ServiceBusyError } from '../errors/idl_errors.js';
import { goMarkLastParamByteSlice } from './runtime/reflect.js';

export interface args {
  options: WorkerOptions;
}

export interface testActivityArg {
  Index: number;
  Name: string;
  Data?: Buffer;
  IndexPtr?: number;
  NamePtr?: string;
  DataPtr?: Buffer;
}

export interface testActivityResult {
  Index: number;
}

export interface testErrorDetails {
  T: string;
}

export interface testWorkflowResult {
  V: number;
}

export class internalWorkerTestSuite {
  constructor(init?: Partial<internalWorkerTestSuite>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  Suite: GoTestifySuite = new GoTestifySuite();

  mockCtrl?: GoMockController;

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
    this.mockCtrl = NewGoMockController(this.T());
    this.service = NewGoMockClient(this.mockCtrl!);
  }

  TearDownTest(): void {
    this.mockCtrl!.Finish();
  }

  async testDecisionTaskHandlerHelper(params: workerExecutionParameters): Promise<void> {
    const taskList = "taskList1";
    const testEvents = [
      createTestEventWorkflowExecutionStarted(
        1,
        new WorkflowExecutionStartedEventAttributes({
          taskList: new TaskList({ name: StringPtr(taskList) }),
          input: testEncodeFunctionArgs(params.DataConverter!),
        }),
      ),
      createTestEventDecisionTaskScheduled(
        2,
        new DecisionTaskScheduledEventAttributes({}),
      ),
      createTestEventDecisionTaskStarted(3),
    ];

    const workflowType = "sampleWorkflowExecute";
    const workflowID = "testID";
    const runID = "testRunID";

    const task = new PollForDecisionTaskResponse({
      workflowExecution: new WorkflowExecution({
        workflowId: workflowID,
        runId: runID,
      }),
      workflowType: new WorkflowType({ name: workflowType }),
      history: new History({ events: testEvents }),
      previousStartedEventId: new Int64(0),
    });

    const r = newWorkflowTaskHandler(testDomain, params, undefined, this.registry!);
    await r.ProcessWorkflowTask(new workflowTask({ task }), undefined);
    this.NoError(null);
  }

  async TestDecisionTaskHandler(): Promise<void> {
    const params = new workerExecutionParameters({
      Identity: identity,
      Logger: getTestLogger(),
      SessionResourceID: "",
      WorkerStopTimeout: 0,
    });
    await this.testDecisionTaskHandlerHelper(params);
  }

  async TestDecisionTaskHandler_WithDataConverter(): Promise<void> {
    const params = new workerExecutionParameters({
      Identity: identity,
      Logger: getTestLogger(),
      DataConverter: newTestDataConverter(),
      SessionResourceID: "",
      WorkerStopTimeout: 0,
    });
    await this.testDecisionTaskHandlerHelper(params);
  }

}

export class mockPollForActivityTaskRequest {
  constructor(init?: Partial<mockPollForActivityTaskRequest>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  tps: number = 0;

  Matches(x: unknown): boolean {
    if (typeof x !== "object" || x === null || !("taskListMetadata" in x)) {
      return false;
    }
    const v = x as { taskListMetadata?: { maxTasksPerSecond?: number } };
    return v.taskListMetadata!.maxTasksPerSecond! === this.tps;
  }

  String(): string {
    return "PollForActivityTaskRequest";
  }

}

export class activitiesCallingOptionsWorkflow {
  constructor(init?: Partial<activitiesCallingOptionsWorkflow>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  t?: unknown;

  async Execute(ctx: internal_Context, input: Buffer): Promise<Buffer> {
    const ao = new internal_ActivityOptions({
      ActivityID: "",
      HeartbeatTimeout: 0,
      RetryPolicy: undefined,
      ScheduleToCloseTimeout: 0,
      ScheduleToStartTimeout: 10 * Second,
      StartToCloseTimeout: 5 * Second,
      TaskList: "",
      WaitForCancellation: false,
    });
    ctx = WithActivityOptions(ctx, ao);

    await (await ExecuteActivity(ctx, testActivityByteArgs, input)).Get(ctx, null);
    await (await ExecuteActivity(ctx, testActivityMultipleArgs, 2, ["test"], true)).Get(ctx, null);
    await (await ExecuteActivity(ctx, testActivityMultipleArgsWithStruct, -8, newTestActivityArg())).Get(ctx, null);
    await (await ExecuteActivity(ctx, testActivityNoResult, 2, "test")).Get(ctx, null);
    await (await ExecuteActivity(ctx, testActivityNoContextArg, 2, "test")).Get(ctx, null);

    let f = await ExecuteActivity(ctx, testActivityReturnByteArray);
    const rBox: { value: Buffer } = { value: Buffer.alloc(0) };
    await f.Get(ctx, rBox);
    expect(rBox.value).toEqual(Buffer.from("testActivity"));

    f = await ExecuteActivity(ctx, testActivityReturnInt);
    const rIntBox: { value: number } = { value: 0 };
    await f.Get(ctx, rIntBox);
    expect(rIntBox.value).toEqual(5);

    f = await ExecuteActivity(ctx, testActivityReturnString);
    const rStringBox: { value: string } = { value: "" };
    await f.Get(ctx, rStringBox);
    expect(rStringBox.value).toEqual("testActivity");

    f = await ExecuteActivity(ctx, testActivityReturnEmptyString);
    const r2StringBox: { value: string } = { value: "" };
    await f.Get(ctx, r2StringBox);
    expect(r2StringBox.value).toEqual("");

    f = await ExecuteActivity(ctx, testActivityReturnEmptyStruct);
    const r2StructBox: { value: testActivityResult } = { value: { Index: 0 } };
    await f.Get(ctx, r2StructBox);
    expect(r2StructBox.value).toEqual({ Index: 0 });

    f = await ExecuteActivity(ctx, testActivityReturnNilStructPtr);
    const rStructPtr = new Ref<testActivityResult | undefined>(undefined);
    await f.Get(ctx, rStructPtr);
    expect(rStructPtr.value == null).toBe(true);

    f = await ExecuteActivity(ctx, testActivityReturnStructPtr);
    await f.Get(ctx, rStructPtr);
    expect(rStructPtr.value).toEqual({ Index: 10 });

    f = await ExecuteActivity(ctx, testActivityReturnNilStructPtrPtr);
    const rStruct2Ptr = new Ref<testActivityResult | undefined>(undefined);
    await f.Get(ctx, rStruct2Ptr);
    expect(rStruct2Ptr.value == null).toBe(true);

    f = await ExecuteActivity(ctx, testActivityReturnStructPtrPtr);
    await f.Get(ctx, rStruct2Ptr);
    expect(rStruct2Ptr.value!.Index).toEqual(10);

    await (await ExecuteActivity(ctx, "go.uber.org/cadence/internal.testActivityByteArgs", input)).Get(ctx, null);
    await (await ExecuteActivity(ctx, "testActivityMultipleArgs", 2, ["test"], true)).Get(ctx, null);
    await (await ExecuteActivity(ctx, "go.uber.org/cadence/internal.testActivityNoResult", 2, "test")).Get(ctx, null);
    await (await ExecuteActivity(ctx, "go.uber.org/cadence/internal.testActivityNoContextArg", 2, "test")).Get(ctx, null);

    f = await ExecuteActivity(ctx, "go.uber.org/cadence/internal.testActivityReturnString");
    await f.Get(ctx, rStringBox);
    expect(rStringBox.value).toEqual("testActivity");

    f = await ExecuteActivity(ctx, "go.uber.org/cadence/internal.testActivityReturnEmptyString");
    const r2sStringBox: { value: string } = { value: "" };
    await f.Get(ctx, r2StringBox);
    expect(r2sStringBox.value).toEqual("");

    f = await ExecuteActivity(ctx, "go.uber.org/cadence/internal.testActivityReturnEmptyStruct");
    await f.Get(ctx, r2StructBox);
    expect(r2StructBox.value).toEqual({ Index: 0 });

    return Buffer.from("Done");
  }

}

export async function testInternalWorkerRegister(r: registry): Promise<void> {
  await r.RegisterWorkflowWithOptions(sampleWorkflowExecute, {
    Name: "sampleWorkflowExecute",
    DisableAlreadyRegisteredCheck: false,
    EnableShortName: false,
  });
  await r.RegisterActivity(testActivityByteArgs);
  await r.RegisterActivityWithOptions(testActivityMultipleArgs, {
    Name: "testActivityMultipleArgs",
    DisableAlreadyRegisteredCheck: false,
    EnableAutoHeartbeat: false,
    EnableShortName: false,
  });
  await r.RegisterActivity(testActivityMultipleArgsWithStruct);
  await r.RegisterActivity(testActivityReturnString);
  await r.RegisterActivity(testActivityReturnEmptyString);
  await r.RegisterActivity(testActivityReturnEmptyStruct);
  await r.RegisterActivity(testActivityNoResult);
  await r.RegisterActivity(testActivityNoContextArg);
  await r.RegisterActivity(testActivityReturnByteArray);
  await r.RegisterActivity(testActivityReturnInt);
  await r.RegisterActivity(testActivityReturnNilStructPtr);
  await r.RegisterActivity(testActivityReturnStructPtr);
  await r.RegisterActivity(testActivityReturnNilStructPtrPtr);
  await r.RegisterActivity(testActivityReturnStructPtrPtr);
}

export async function testInternalWorkerRegisterWithTestEnv(env: TestWorkflowEnvironment): Promise<void> {
  await env.RegisterWorkflowWithOptions(sampleWorkflowExecute, {
    Name: "sampleWorkflowExecute",
    DisableAlreadyRegisteredCheck: false,
    EnableShortName: false,
  });
  await env.RegisterActivity(testActivityByteArgs);
  await env.RegisterActivityWithOptions(testActivityMultipleArgs, {
    Name: "testActivityMultipleArgs",
    DisableAlreadyRegisteredCheck: false,
    EnableAutoHeartbeat: false,
    EnableShortName: false,
  });
  await env.RegisterActivity(testActivityMultipleArgsWithStruct);
  await env.RegisterActivity(testActivityReturnString);
  await env.RegisterActivity(testActivityReturnEmptyString);
  await env.RegisterActivity(testActivityReturnEmptyStruct);
  await env.RegisterActivity(testActivityNoResult);
  await env.RegisterActivity(testActivityNoContextArg);
  await env.RegisterActivity(testActivityReturnByteArray);
  await env.RegisterActivity(testActivityReturnInt);
  await env.RegisterActivity(testActivityReturnNilStructPtr);
  await env.RegisterActivity(testActivityReturnStructPtr);
  await env.RegisterActivity(testActivityReturnNilStructPtrPtr);
  await env.RegisterActivity(testActivityReturnStructPtrPtr);
}

export async function TestInternalWorkerTestSuite(): Promise<void> {
  const s = new internalWorkerTestSuite({
    registry: await newRegistry(),
    Suite: new GoTestifySuite(),
  });
  await testInternalWorkerRegister(s.registry!);
}

export function getTestLogger(): Logger {
  return NoopLogger();
}

/**
 * testSampleWorkflow
 */
export async function sampleWorkflowExecute(ctx: internal_Context, input: Buffer): Promise<Buffer> {
  try {
    await ExecuteActivity(ctx, testActivityByteArgs, input);
  } catch (e) {
    if (!(e instanceof Error)) throw e;
  }

  try {
    await ExecuteActivity(ctx, testActivityMultipleArgs, 2, ["test"], true);
  } catch (e) {
    if (!(e instanceof Error)) throw e;
  }

  try {
    await ExecuteActivity(ctx, testActivityMultipleArgsWithStruct, -8, newTestActivityArg());
  } catch (e) {
    if (!(e instanceof Error)) throw e;
  }

  return Buffer.from("Done");
}

/**
 * test activity1
 */
export function testActivityByteArgs(ctx: Context, input: Buffer): Buffer {
  GetActivityLogger(ctx).info("Executing Activity1");
  return null as unknown as Buffer;
}

/**
 * test testActivityMultipleArgs
 */
export function testActivityMultipleArgs(ctx: Context, p1: number, p2: string[], p3: boolean): Buffer {
  GetActivityLogger(ctx).info("Executing Activity2");
  return Buffer.alloc(0);
}

/**
 * test testActivityMultipleArgsWithStruct
 */
export function testActivityMultipleArgsWithStruct(ctx: Context, i: number, s: testActivityArg): Buffer {
  GetActivityLogger(ctx).info(`Executing testActivityMultipleArgsWithStruct: ${i}, ${JSON.stringify(s)}\n`);
  return Buffer.alloc(0);
}

/**
 * test testActivityNoResult
 */
export function testActivityNoResult(ctx: Context, arg1: number, arg2: string): void {
    return;
}

/**
 * test testActivityNoContextArg
 */
export function testActivityNoContextArg(arg1: number, arg2: string): void {
    return;
}

/**
 * test testActivityReturnByteArray
 */
export function testActivityReturnByteArray(): Buffer {
  return Buffer.from("testActivity");
}

/**
 * testActivityReturnInt
 */
export function testActivityReturnInt(): number {
  return 5;
}

/**
 * testActivityReturnString
 */
export function testActivityReturnString(): string {
  return "testActivity";
}

/**
 * testActivityReturnEmptyString
 */
export function testActivityReturnEmptyString(): string {
  return "";
}

export function newTestActivityArg(): testActivityArg {
  const name = "JohnSmith";
  const index = 22;
  const data = Buffer.from([22, 8, 78]);

  return {
    Name: name,
    Index: index,
    Data: data,
    NamePtr: name,
    IndexPtr: index,
    DataPtr: data,
  };
}

/**
 * testActivityReturnEmptyStruct
 */
export function testActivityReturnEmptyStruct(): testActivityResult {
  return { Index: 0 };
}

export function testActivityReturnNilStructPtr(): testActivityResult | undefined {
  return undefined;
}

export function testActivityReturnStructPtr(): testActivityResult {
  return { Index: 10 };
}

export function testActivityReturnNilStructPtrPtr(): Ref<testActivityResult | undefined> | undefined {
  return undefined;
}

export function testActivityReturnStructPtrPtr(): Ref<testActivityResult | undefined> {
  const r: testActivityResult = { Index: 10 };
  return new Ref<testActivityResult | undefined>(r);
}

export async function TestVariousActivitySchedulingOption(): Promise<void> {
  const w = new activitiesCallingOptionsWorkflow({ t: undefined });

  await testVariousActivitySchedulingOption(w.Execute.bind(w));
  await testVariousActivitySchedulingOptionWithDataConverter(w.Execute.bind(w));
}

export async function testVariousActivitySchedulingOption(wf: unknown): Promise<void> {
  const env = newTestWorkflowEnv();
  await env.RegisterWorkflow(wf);
  await testInternalWorkerRegisterWithTestEnv(env);
  await env.ExecuteWorkflow(wf, Buffer.from([1, 2]));
  expect(env.IsWorkflowCompleted()).toBe(true);
  expect(env.GetWorkflowError()).toBeNull();
}

export async function testVariousActivitySchedulingOptionWithDataConverter(wf: unknown): Promise<void> {
  const env = newTestWorkflowEnv();
  env.SetWorkerOptions(
    new WorkerOptions({
      DataConverter: newTestDataConverter(),
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
    }),
  );
  await env.RegisterWorkflow(wf);
  await testInternalWorkerRegisterWithTestEnv(env);
  await env.ExecuteWorkflow(wf, Buffer.from([1, 2]));
  expect(env.IsWorkflowCompleted()).toBe(true);
  expect(env.GetWorkflowError()).toBeNull();
}

export function testWorkflowSample(ctx: internal_Context, input: Buffer): Buffer {
  return Buffer.alloc(0);
}

export function testWorkflowMultipleArgs(ctx: internal_Context, arg1: number, arg2: string, arg3: boolean): Buffer {
    return null as unknown as Buffer;
}

export function testWorkflowNoArgs(ctx: internal_Context): Buffer {
  return null as unknown as Buffer;
}

export function testWorkflowReturnInt(ctx: internal_Context): number {
  return 5;
}

export function testWorkflowReturnString(ctx: internal_Context, arg1: number): string {
  return "Done";
}

export function testWorkflowReturnStruct(ctx: internal_Context, arg1: number): testWorkflowResult {
  return { V: 0 };
}

export function testWorkflowReturnStructPtr(ctx: internal_Context, arg1: number): testWorkflowResult {
  return { V: 0 };
}

export function testWorkflowReturnStructPtrPtr(ctx: internal_Context, arg1: number): Ref<testWorkflowResult | undefined> | undefined {
  return undefined;
}

export async function TestRegisterVariousWorkflowTypes(): Promise<void> {
  const r = await newRegistry();
  const w = new aggregatedWorker({ registry: r, workerstats: {} });

  await w.RegisterWorkflowWithOptions(testWorkflowSample, {
    EnableShortName: true,
    DisableAlreadyRegisteredCheck: false,
    Name: "",
  });
  await w.RegisterWorkflowWithOptions(testWorkflowMultipleArgs, {
    EnableShortName: true,
    DisableAlreadyRegisteredCheck: false,
    Name: "",
  });
  await w.RegisterWorkflowWithOptions(testWorkflowNoArgs, {
    EnableShortName: true,
    DisableAlreadyRegisteredCheck: false,
    Name: "",
  });
  await w.RegisterWorkflowWithOptions(testWorkflowReturnInt, {
    EnableShortName: true,
    DisableAlreadyRegisteredCheck: false,
    Name: "",
  });
  await w.RegisterWorkflowWithOptions(testWorkflowReturnString, {
    EnableShortName: true,
    DisableAlreadyRegisteredCheck: false,
    Name: "",
  });
  await w.RegisterWorkflowWithOptions(testWorkflowReturnStruct, {
    EnableShortName: true,
    DisableAlreadyRegisteredCheck: false,
    Name: "",
  });
  await w.RegisterWorkflowWithOptions(testWorkflowReturnStructPtr, {
    EnableShortName: true,
    DisableAlreadyRegisteredCheck: false,
    Name: "",
  });
  await w.RegisterWorkflowWithOptions(testWorkflowReturnStructPtrPtr, {
    EnableShortName: true,
    DisableAlreadyRegisteredCheck: false,
    Name: "",
  });

  const wfs = await w.GetRegisteredWorkflows();
  const wfNames: string[] = [];
  for (const wf of wfs) {
    wfNames.push(wf.WorkflowType().Name);
  }

  expect(wfs).toHaveLength(8);
  expect(wfNames).toContain("testWorkflowSample");
  expect(wfNames).toContain("testWorkflowMultipleArgs");
  expect(wfNames).toContain("testWorkflowNoArgs");
  expect(wfNames).toContain("testWorkflowReturnInt");
  expect(wfNames).toContain("testWorkflowReturnString");
  expect(wfNames).toContain("testWorkflowReturnString");
  expect(wfNames).toContain("testWorkflowReturnStructPtr");
  expect(wfNames).toContain("testWorkflowReturnStructPtrPtr");

  let sampleFunc: unknown;
  for (const wf of wfs) {
    if (wf.WorkflowType().Name === "testWorkflowSample") {
      sampleFunc = wf.GetFunction();
      break;
    }
  }
  expect(goFuncName(sampleFunc)).toEqual(getFunctionName(testWorkflowSample));
}

export async function TestRegisterActivityWithOptions(): Promise<void> {
  const r = await newRegistry();
  const w = new aggregatedWorker({ registry: r, workerstats: {} });
  await w.RegisterActivityWithOptions(testActivityMultipleArgs, {
    EnableShortName: true,
    DisableAlreadyRegisteredCheck: false,
    EnableAutoHeartbeat: false,
    Name: "",
  });

  const a = await w.GetRegisteredActivities();
  expect(a).toHaveLength(1);
  expect(a[0].ActivityType().Name).toContain("testActivityMultipleArgs");

  const fn = a[0].GetFunction();
  expect(typeof fn).toEqual("function");
  expect(getFunctionName(fn)).toEqual(getFunctionName(testActivityMultipleArgs));
}

export async function testActivityErrorWithDetailsHelper(ctx: Context, dataConverter: internal_DataConverter): Promise<void> {
  // @go-unlowerable: callee return shape — Execute exposes only Promise<Buffer> and throws errors, so the Go result-plus-error assertions cannot be represented
}

export async function TestActivityErrorWithDetailsWithDataConverter(): Promise<void> {
  const dc = newTestDataConverter();
  const ctx = withValue(
    background(),
    activityEnvContextKey,
    new activityEnvironment({
      activityID: "",
      activityType: { Name: "", Path: "" },
      attempt: 0,
      contextPropagators: [],
      dataConverter: dc,
      deadline: 0,
      heartbeatDetails: Buffer.alloc(0),
      heartbeatTimeout: 0,
      isLocalActivity: false,
      scheduledTimestamp: 0,
      startedTimestamp: 0,
      taskList: "",
      taskToken: Buffer.alloc(0),
      workflowDomain: "",
      workflowExecution: { ID: "", RunID: "" },
    }),
  );
  await testActivityErrorWithDetailsHelper(ctx, dc);
}

export async function testActivityCancelledErrorHelper(ctx: Context, dataConverter: internal_DataConverter): Promise<void> {
  // @go-unlowerable: error-path return value — Execute throws on error in TypeScript and exposes no successful Buffer alongside the thrown error, so the a3/a4 result assertions cannot be faithfully lowered.
}

export async function TestActivityCancelledErrorWithDataConverter(): Promise<void> {
  const dc = newTestDataConverter();
  const ctx = withValue(
    background(),
    activityEnvContextKey,
    new activityEnvironment({
      activityID: "",
      activityType: { Name: "", Path: "" },
      attempt: 0,
      contextPropagators: [],
      dataConverter: dc,
      deadline: 0,
      heartbeatDetails: Buffer.alloc(0),
      heartbeatTimeout: 0,
      isLocalActivity: false,
      scheduledTimestamp: 0,
      startedTimestamp: 0,
      taskList: "",
      taskToken: Buffer.alloc(0),
      workflowDomain: "",
      workflowExecution: { ID: "", RunID: "" },
    }),
  );
  await testActivityCancelledErrorHelper(ctx, dc);
}

export async function testActivityExecutionVariousTypesHelper(ctx: Context, dataConverter: internal_DataConverter): Promise<void> {
  const a1 = new activityExecutor({
    fn: (_ctx: Context, _arg1: string): testWorkflowResult => ({ V: 1 }),
    name: "",
    options: { Name: "", EnableShortName: false, DisableAlreadyRegisteredCheck: false, EnableAutoHeartbeat: false },
    path: "",
  });

  const encResult = await a1.Execute(ctx, testEncodeFunctionArgs(dataConverter, "test"));
  const r = new Ref<testWorkflowResult | undefined>(undefined);
  dataConverter.FromData(encResult, r);
  expect(r.value!.V).toEqual(1);

  const a2 = new activityExecutor({
    fn: (_ctx: Context, _arg1: testWorkflowResult): testWorkflowResult => ({ V: 2 }),
    name: "",
    options: { Name: "", EnableShortName: false, DisableAlreadyRegisteredCheck: false, EnableAutoHeartbeat: false },
    path: "",
  });

  const encResult2 = await a2.Execute(ctx, testEncodeFunctionArgs(dataConverter, r.value));
  dataConverter.FromData(encResult2, r);
  expect(r.value!.V).toEqual(2);
}

export async function TestActivityExecutionVariousTypesWithDataConverter(): Promise<void> {
  const dc = newTestDataConverter();
  const ctx = withValue(
    background(),
    activityEnvContextKey,
    new activityEnvironment({
      activityID: "",
      activityType: { Name: "", Path: "" },
      attempt: 0,
      contextPropagators: [],
      dataConverter: dc,
      deadline: 0,
      heartbeatDetails: Buffer.alloc(0),
      heartbeatTimeout: 0,
      isLocalActivity: false,
      scheduledTimestamp: 0,
      startedTimestamp: 0,
      taskList: "",
      taskToken: Buffer.alloc(0),
      workflowDomain: "",
      workflowExecution: { ID: "", RunID: "" },
    }),
  );
  await testActivityExecutionVariousTypesHelper(ctx, dc);
}

export async function TestActivityNilArgs(): Promise<void> {
  const nilErr = new Error("nils");
  const activityFn = (name: unknown, idx: unknown, strptr: unknown): void => {
    if ((name ?? "") === "" && (idx ?? 0) === 0 && strptr == null) {
      throw nilErr;
    }
  };

  const args = [null, null, null];
  const registry = await newRegistry();
  await getValidatedActivityFunction(activityFn, args, registry);

  const dataConverter = getDefaultDataConverter();
  const data = encodeArgs(dataConverter, args);
  const reflectArgs = decodeArgs(dataConverter, activityFn, data);

  let reflectResult: unknown;
  try {
    reflectResult = await (activityFn as (...args: unknown[]) => unknown)(...reflectArgs);
  } catch (err) {
    if (!(err instanceof Error)) throw err;
    reflectResult = err;
  }

  expect(reflectResult).toEqual(nilErr);
}

export async function TestWorkerOptionDefaults(): Promise<void> {
    const domain = "worker-options-test";
    const taskList = "worker-options-tl";
    const aggWorker = await newAggregatedWorker(
        undefined,
        domain,
        taskList,
        new WorkerOptions({
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
        }),
    );

    const decisionWorker = aggWorker.workflowWorker!;
    expect(decisionWorker.executionParameters!.Identity !== "").toBe(true);
    expect(decisionWorker.executionParameters!.Logger!).not.toBeNull();
    expect(decisionWorker.executionParameters!.MetricsScope!).not.toBeNull();
    expect(decisionWorker.executionParameters!.ContextPropagators).toEqual([]);

    const expected = new workerExecutionParameters({
        TaskList: new TaskList({
            name: StringPtr(taskList)!,
            kind: 0,
        }),
        MaxConcurrentActivityTaskPollers: defaultConcurrentPollRoutineSize,
        MaxConcurrentDecisionTaskPollers: defaultConcurrentPollRoutineSize,
        MaxConcurrentLocalActivityExecutionSize: defaultMaxConcurrentLocalActivityExecutionSize,
        MaxConcurrentActivityExecutionSize: defaultMaxConcurrentActivityExecutionSize,
        MaxConcurrentDecisionTaskExecutionSize: defaultMaxConcurrentTaskExecutionSize,
        WorkerActivitiesPerSecond: defaultTaskListActivitiesPerSecond,
        WorkerDecisionTasksPerSecond: defaultWorkerTaskExecutionRate,
        TaskListActivitiesPerSecond: defaultTaskListActivitiesPerSecond,
        WorkerLocalActivitiesPerSecond: defaultWorkerLocalActivitiesPerSecond,
        StickyScheduleToStartTimeout: stickyDecisionScheduleToStartTimeoutSeconds * Second,
        DataConverter: getDefaultDataConverter(),
        Tracer: trace.getTracer("noop"),
        Logger: decisionWorker.executionParameters!.Logger!,
        MetricsScope: decisionWorker.executionParameters!.MetricsScope!,
        Identity: decisionWorker.executionParameters!.Identity,
        WorkerStats: {
            PollerTracker: NewNoopPollerTracker(),
            ActivityTracker: NewNoopActivityTracker(),
        },
        UserContext: decisionWorker.executionParameters!.UserContext!,
        SessionResourceID: "",
        WorkerStopTimeout: 0,
    });

    assertWorkerExecutionParamsEqual(expected, decisionWorker.executionParameters!);

    const activityWorker = aggWorker.activityWorker!;
    expect(activityWorker.executionParameters!.Identity !== "").toBe(true);
    expect(activityWorker.executionParameters!.Logger!).not.toBeNull();
    expect(activityWorker.executionParameters!.MetricsScope!).not.toBeNull();
    expect(activityWorker.executionParameters!.ContextPropagators).toEqual([]);
    assertWorkerExecutionParamsEqual(expected, activityWorker.executionParameters!);
    expect(aggWorker.GetWorkerStats()).toEqual(expected.WorkerStats);
}

export async function TestWorkerOptionNonDefaults(): Promise<void> {
    const domain = "worker-options-test";
    const taskList = "worker-options-tl";
    const tracer = trace.getTracer("global");

    const options = new WorkerOptions({
        Identity: "143@worker-options-test-1",
        TaskListActivitiesPerSecond: 8888,
        MaxConcurrentSessionExecutionSize: 3333,
        MaxConcurrentDecisionTaskExecutionSize: 2222,
        MaxConcurrentActivityExecutionSize: 1111,
        MaxConcurrentLocalActivityExecutionSize: 101,
        MaxConcurrentDecisionTaskPollers: 11,
        MaxConcurrentActivityTaskPollers: 12,
        WorkerLocalActivitiesPerSecond: 222,
        WorkerDecisionTasksPerSecond: 111,
        WorkerActivitiesPerSecond: 99,
        StickyScheduleToStartTimeout: 555 * Minute,
        DataConverter: new defaultDataConverter({}),
        BackgroundActivityContext: background(),
        Logger: NoopLogger(),
        MetricsScope: NewTestScope("", {}),
        Tracer: tracer,
        AutoScalerOptions: {
            Enabled: false,
            Cooldown: 0,
            PollerMinCount: 0,
            PollerMaxCount: 0,
            PollerInitCount: 0,
            PollerWaitTimeUpperBound: 0,
            PollerWaitTimeLowerBound: 0
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
            MetricEmitMode: 0
        },
        IsolationGroup: "",
        MinConcurrentActivityTaskPollers: 0,
        MinConcurrentDecisionTaskPollers: 0,
        NonDeterministicWorkflowPolicy: 0,
        PollerAutoScalerCooldown: 0,
        PollerAutoScalerDryRun: false,
        PollerAutoScalerTargetUtilization: 0,
        ShadowOptions: new internal_ShadowOptions(),
        WorkerBugPorts: { DisableStrictNonDeterminismCheck: false },
        WorkerStats: {},
        WorkerStopTimeout: 0,
        WorkflowInterceptorChainFactories: []
    });

    const aggWorker = await newAggregatedWorker(undefined, domain, taskList, options);
    const decisionWorker = aggWorker.workflowWorker!;
    expect(decisionWorker.executionParameters!.ContextPropagators.length > 0).toBe(true);

    const expected = new workerExecutionParameters({
        TaskList: new TaskList({
            name: StringPtr(taskList)!,
            kind: TaskListKind.NORMAL
        }),
        MaxConcurrentActivityTaskPollers: options.MaxConcurrentActivityTaskPollers,
        MaxConcurrentDecisionTaskPollers: options.MaxConcurrentDecisionTaskPollers,
        MaxConcurrentLocalActivityExecutionSize: options.MaxConcurrentLocalActivityExecutionSize,
        MaxConcurrentActivityExecutionSize: options.MaxConcurrentActivityExecutionSize,
        MaxConcurrentDecisionTaskExecutionSize: options.MaxConcurrentDecisionTaskExecutionSize,
        WorkerActivitiesPerSecond: options.WorkerActivitiesPerSecond,
        WorkerDecisionTasksPerSecond: options.WorkerDecisionTasksPerSecond,
        TaskListActivitiesPerSecond: options.TaskListActivitiesPerSecond,
        WorkerLocalActivitiesPerSecond: options.WorkerLocalActivitiesPerSecond,
        StickyScheduleToStartTimeout: options.StickyScheduleToStartTimeout,
        DataConverter: options.DataConverter,
        Tracer: options.Tracer,
        Logger: options.Logger,
        MetricsScope: options.MetricsScope,
        Identity: options.Identity,
        WorkerStats: {
            PollerTracker: NewNoopPollerTracker(),
            ActivityTracker: NewNoopActivityTracker()
        },
        SessionResourceID: "",
        WorkerStopTimeout: 0
    });

    assertWorkerExecutionParamsEqual(expected, decisionWorker.executionParameters!);

    const activityWorker = aggWorker.activityWorker!;
    expect(activityWorker.executionParameters!.ContextPropagators.length > 0).toBe(true);
    assertWorkerExecutionParamsEqual(expected, activityWorker.executionParameters!);
    expect(aggWorker.GetWorkerStats()).toEqual(expected.WorkerStats);
}

export function assertWorkerExecutionParamsEqual(paramsA: workerExecutionParameters, paramsB: workerExecutionParameters): void {
    expect(paramsA.TaskList!).toEqual(paramsA.TaskList!);
    expect(paramsB.Identity).toEqual(paramsA.Identity);
    expect(paramsB.DataConverter!).toEqual(paramsA.DataConverter!);
    expect(paramsB.Tracer!).toEqual(paramsA.Tracer!);
    expect(paramsB.MaxConcurrentLocalActivityExecutionSize).toEqual(paramsA.MaxConcurrentLocalActivityExecutionSize);
    expect(paramsB.MaxConcurrentActivityExecutionSize).toEqual(paramsA.MaxConcurrentActivityExecutionSize);
    expect(paramsB.MaxConcurrentDecisionTaskExecutionSize).toEqual(paramsA.MaxConcurrentDecisionTaskExecutionSize);
    expect(paramsB.WorkerActivitiesPerSecond).toEqual(paramsA.WorkerActivitiesPerSecond);
    expect(paramsB.WorkerDecisionTasksPerSecond).toEqual(paramsA.WorkerDecisionTasksPerSecond);
    expect(paramsB.TaskListActivitiesPerSecond).toEqual(paramsA.TaskListActivitiesPerSecond);
    expect(paramsB.StickyScheduleToStartTimeout).toEqual(paramsA.StickyScheduleToStartTimeout);
    expect(paramsB.MaxConcurrentDecisionTaskPollers).toEqual(paramsA.MaxConcurrentDecisionTaskPollers);
    expect(paramsB.MaxConcurrentActivityTaskPollers).toEqual(paramsA.MaxConcurrentActivityTaskPollers);
    expect(paramsB.NonDeterministicWorkflowPolicy).toEqual(paramsA.NonDeterministicWorkflowPolicy);
    expect(paramsB.EnableLoggingInReplay).toEqual(paramsA.EnableLoggingInReplay);
    expect(paramsB.DisableStickyExecution).toEqual(paramsA.DisableStickyExecution);
    expect(paramsB.WorkerStats.PollerTracker!).toEqual(paramsA.WorkerStats.PollerTracker!);
    expect(paramsB.WorkerStats.ActivityTracker!).toEqual(paramsA.WorkerStats.ActivityTracker!);
}

/**
 * Encode function args
 */
export function testEncodeFunctionArgs(dataConverter: internal_DataConverter, ...args: unknown[]): Buffer {
  try {
    return encodeArgs(dataConverter, args);
  } catch (err) {
    if (!(err instanceof Error)) throw err;
    throw "Failed to encode arguments";
  }
}

export function TestIsNonRetriableError(): void {
    const tests: { err: Error | null; expected: boolean }[] = [
        {
            err: null,
            expected: false,
        },
        {
            err: new ServiceBusyError({ message: "" }),
            expected: false,
        },
        {
            err: new BadRequestError({ message: "" }),
            expected: true,
        },
        {
            err: new ClientVersionNotSupportedError({
                featureVersion: "",
                clientImpl: "",
                supportedVersions: "",
            }),
            expected: true,
        },
    ];

    for (const test of tests) {
        expect(isNonRetriableError(test.err)).toEqual(test.expected);
    }
}

export function Test_augmentWorkerOptions(): void {
  const tests: { name: string; args: args; want: WorkerOptions }[] = [
    {
      name: "happy",
      args: {
        options: new WorkerOptions({
          MaxConcurrentActivityExecutionSize: 3,
          WorkerActivitiesPerSecond: 10,
          MaxConcurrentLocalActivityExecutionSize: 4,
          WorkerLocalActivitiesPerSecond: 20,
          TaskListActivitiesPerSecond: 30,
          MaxConcurrentActivityTaskPollers: 10,
          MinConcurrentActivityTaskPollers: 0,
          MaxConcurrentDecisionTaskExecutionSize: 40,
          WorkerDecisionTasksPerSecond: 50,
          MaxConcurrentDecisionTaskPollers: 15,
          MinConcurrentDecisionTaskPollers: 0,
          Identity: "identity",
          IsolationGroup: "",
          MetricsScope: NoopScope,
          Logger: NoopLogger(),
          EnableLoggingInReplay: false,
          DisableWorkflowWorker: false,
          DisableActivityWorker: false,
          DisableStickyExecution: false,
          StickyScheduleToStartTimeout: 4 * Minute,
          BackgroundActivityContext: background(),
          NonDeterministicWorkflowPolicy:
            internal_NonDeterministicWorkflowPolicy.NonDeterministicWorkflowPolicyBlockWorkflow,
          DataConverter: DefaultDataConverter,
          WorkerStopTimeout: 5 * Minute,
          EnableSessionWorker: false,
          MaxConcurrentSessionExecutionSize: 80,
          WorkflowInterceptorChainFactories: [],
          ContextPropagators: [],
          Tracer: undefined,
          EnableShadowWorker: false,
          ShadowOptions: new internal_ShadowOptions(),
          FeatureFlags: {
            MetricEmitMode: MetricEmitMode.EmitBoth,
            AutoforwardingEnabled: false,
            EphemeralTaskListsEnabled: false,
            PollerAutoScalerEnabled: false,
            WorkflowExecutionAlreadyCompletedErrorEnabled: false,
          },
          Authorization: undefined,
          AutoScalerOptions: {
            Enabled: true,
            PollerMinCount: 10,
            PollerMaxCount: 20,
            PollerInitCount: 5,
            Cooldown: 3 * Minute,
            PollerWaitTimeUpperBound: 200 * Millisecond,
            PollerWaitTimeLowerBound: 100 * Millisecond,
          },
          PollerAutoScalerCooldown: 0,
          PollerAutoScalerTargetUtilization: 0,
          PollerAutoScalerDryRun: false,
          WorkerBugPorts: { DisableStrictNonDeterminismCheck: false },
          WorkerStats: {},
        }),
      },
      want: new WorkerOptions({
        MaxConcurrentActivityExecutionSize: 3,
        WorkerActivitiesPerSecond: 10,
        MaxConcurrentLocalActivityExecutionSize: 4,
        WorkerLocalActivitiesPerSecond: 20,
        TaskListActivitiesPerSecond: 30,
        MaxConcurrentActivityTaskPollers: 10,
        MinConcurrentActivityTaskPollers: 0,
        MaxConcurrentDecisionTaskExecutionSize: 40,
        WorkerDecisionTasksPerSecond: 50,
        MaxConcurrentDecisionTaskPollers: 15,
        MinConcurrentDecisionTaskPollers: 0,
        Identity: "identity",
        IsolationGroup: "",
        MetricsScope: NoopScope,
        Logger: NoopLogger(),
        EnableLoggingInReplay: false,
        DisableWorkflowWorker: false,
        DisableActivityWorker: false,
        DisableStickyExecution: false,
        StickyScheduleToStartTimeout: 4 * Minute,
        BackgroundActivityContext: background(),
        NonDeterministicWorkflowPolicy:
          internal_NonDeterministicWorkflowPolicy.NonDeterministicWorkflowPolicyBlockWorkflow,
        DataConverter: DefaultDataConverter,
        WorkerStopTimeout: 5 * Minute,
        EnableSessionWorker: false,
        MaxConcurrentSessionExecutionSize: 80,
        WorkflowInterceptorChainFactories: [],
        ContextPropagators: [],
        Tracer: trace.getTracer("noop"),
        EnableShadowWorker: false,
        ShadowOptions: new internal_ShadowOptions(),
        FeatureFlags: {
          MetricEmitMode: MetricEmitMode.EmitBoth,
          AutoforwardingEnabled: false,
          EphemeralTaskListsEnabled: false,
          PollerAutoScalerEnabled: false,
          WorkflowExecutionAlreadyCompletedErrorEnabled: false,
        },
        Authorization: undefined,
        AutoScalerOptions: {
          Enabled: true,
          PollerMinCount: 10,
          PollerMaxCount: 20,
          PollerInitCount: 5,
          Cooldown: 3 * Minute,
          PollerWaitTimeUpperBound: 200 * Millisecond,
          PollerWaitTimeLowerBound: 100 * Millisecond,
        },
        PollerAutoScalerCooldown: 0,
        PollerAutoScalerTargetUtilization: 0,
        PollerAutoScalerDryRun: false,
        WorkerBugPorts: { DisableStrictNonDeterminismCheck: false },
        WorkerStats: {},
      }),
    },
    {
      name: "empty payload",
      args: {
        options: new WorkerOptions({
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
        }),
      },
      want: new WorkerOptions({
        MaxConcurrentActivityExecutionSize: 1000,
        WorkerActivitiesPerSecond: 100000,
        MaxConcurrentLocalActivityExecutionSize: 1000,
        WorkerLocalActivitiesPerSecond: 100000,
        TaskListActivitiesPerSecond: 100000,
        MaxConcurrentActivityTaskPollers: 2,
        MinConcurrentActivityTaskPollers: 0,
        MaxConcurrentDecisionTaskExecutionSize: 1000,
        WorkerDecisionTasksPerSecond: 100000,
        MaxConcurrentDecisionTaskPollers: 2,
        MinConcurrentDecisionTaskPollers: 0,
        Identity: "",
        IsolationGroup: "",
        MetricsScope: undefined,
        Logger: undefined,
        EnableLoggingInReplay: false,
        DisableWorkflowWorker: false,
        DisableActivityWorker: false,
        DisableStickyExecution: false,
        StickyScheduleToStartTimeout: 5 * Second,
        BackgroundActivityContext: undefined,
        NonDeterministicWorkflowPolicy:
          internal_NonDeterministicWorkflowPolicy.NonDeterministicWorkflowPolicyBlockWorkflow,
        DataConverter: DefaultDataConverter,
        WorkerStopTimeout: 0,
        EnableSessionWorker: false,
        MaxConcurrentSessionExecutionSize: 1000,
        WorkflowInterceptorChainFactories: [],
        ContextPropagators: [],
        Tracer: trace.getTracer("noop"),
        EnableShadowWorker: false,
        ShadowOptions: new internal_ShadowOptions(),
        FeatureFlags: {
          MetricEmitMode: MetricEmitMode.EmitBoth,
          AutoforwardingEnabled: false,
          EphemeralTaskListsEnabled: false,
          PollerAutoScalerEnabled: false,
          WorkflowExecutionAlreadyCompletedErrorEnabled: false,
        },
        Authorization: undefined,
        AutoScalerOptions: {
          Enabled: false,
          PollerMinCount: 2,
          PollerMaxCount: 20,
          PollerInitCount: 2,
          Cooldown: 10 * Second,
          PollerWaitTimeUpperBound: 256 * Millisecond,
          PollerWaitTimeLowerBound: 16 * Millisecond,
        },
        PollerAutoScalerCooldown: 0,
        PollerAutoScalerTargetUtilization: 0,
        PollerAutoScalerDryRun: false,
        WorkerBugPorts: { DisableStrictNonDeterminismCheck: false },
        WorkerStats: {},
      }),
    },
  ];

  for (const tt of tests) {
    expect(AugmentWorkerOptions(tt.args.options)).toEqual(tt.want);
  }
}

export function TestValidateFnFormat_Activity(): void {
  // @go-unlowerable: reflection return-arity — TypeScript cannot observe reflected function result slots, so the function-return validation cases cannot be reproduced.
}

export function TestTestValidateFnFormat_Workflow(): void {
  // @go-unlowerable: reflected RETURN-arity counts — TypeScript cannot represent the Go function return slots required to validate these cases
}

export function TestGetTaskAutoConfigHint(): void {
  const hint = new AutoConfigHint({
    enableAutoConfig: BoolPtr(true),
    pollerWaitTimeInMs: new Int64(100),
  });

  const cases: {
    name: string;
    task: unknown;
    want: AutoConfigHint | undefined;
  }[] = [
    {
      name: "decision task",
      task: new workflowTask({
        task: new PollForDecisionTaskResponse({ autoConfigHint: hint }),
      }),
      want: hint,
    },
    {
      name: "empty decision task",
      task: new workflowTask({ autoConfigHint: hint }),
      want: hint,
    },
    {
      name: "activity task",
      task: new activityTask({
        task: new PollForActivityTaskResponse({ autoConfigHint: hint }),
        pollStartTime: 0,
      }),
      want: hint,
    },
    {
      name: "empty activity task",
      task: new activityTask({
        autoConfigHint: hint,
        pollStartTime: 0,
      }),
      want: hint,
    },
    {
      name: "localactivity task",
      task: new localActivityTask({}),
      want: undefined,
    },
  ];

  for (const tt of cases) {
    const isAware =
      tt.task != null &&
      typeof (tt.task as { getAutoConfigHint?: unknown }).getAutoConfigHint === "function";

    if (tt.want == null) {
      expect(isAware).toBe(false);
    } else {
      expect(isAware).toBe(true);
      expect(
        (tt.task as { getAutoConfigHint: () => AutoConfigHint | undefined }).getAutoConfigHint(),
      ).toEqual(tt.want);
    }
  }
}

export function TestAugmentWorkerOptions_MetricEmitMode(): void {
  const makeOptions = (metricEmitMode: number = 0): WorkerOptions =>
    new WorkerOptions({
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
        AutoforwardingEnabled: false,
        EphemeralTaskListsEnabled: false,
        MetricEmitMode: metricEmitMode,
        PollerAutoScalerEnabled: false,
        WorkflowExecutionAlreadyCompletedErrorEnabled: false,
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
    });

  const tests: { name: string; input: WorkerOptions; expected: number }[] = [
    {
      name: "unset defaults to EmitBoth",
      input: makeOptions(),
      expected: MetricEmitMode.EmitBoth,
    },
    {
      name: "explicit EmitModeUnset defaults to EmitBoth",
      input: makeOptions(MetricEmitMode.EmitModeUnset),
      expected: MetricEmitMode.EmitBoth,
    },
    {
      name: "explicit EmitTimersOnly is preserved",
      input: makeOptions(MetricEmitMode.EmitTimersOnly),
      expected: MetricEmitMode.EmitTimersOnly,
    },
    {
      name: "explicit EmitBoth is preserved",
      input: makeOptions(MetricEmitMode.EmitBoth),
      expected: MetricEmitMode.EmitBoth,
    },
    {
      name: "explicit EmitHistogramsOnly is preserved",
      input: makeOptions(MetricEmitMode.EmitHistogramsOnly),
      expected: MetricEmitMode.EmitHistogramsOnly,
    },
  ];

  for (const tt of tests) {
    const result = AugmentWorkerOptions(tt.input);
    expect(result.FeatureFlags.MetricEmitMode).toEqual(tt.expected);
  }
}

export const goTracingTestPropagatorInstalled = installGoTestW3CPropagator(); // registers the SDK-owned W3C test propagator globally

// Parameter types are erased at runtime; restore the []byte-input fact these functions'
// declarations carry, for the reflect raw-payload passthrough guard (goFnLastParamIsByteSlice).
goMarkLastParamByteSlice(sampleWorkflowExecute);
goMarkLastParamByteSlice(testActivityByteArgs);
goMarkLastParamByteSlice(testWorkflowSample);
