import { RespondActivityTaskCompletedRequest as shared_RespondActivityTaskCompletedRequest } from '../generated/thrift/cadence-idl/com/uber/cadence/RespondActivityTaskCompletedRequest.js';
import { RespondActivityTaskCanceledRequest as shared_RespondActivityTaskCanceledRequest } from '../generated/thrift/cadence-idl/com/uber/cadence/RespondActivityTaskCanceledRequest.js';
import { TaskList as shared_TaskList } from '../generated/thrift/cadence-idl/com/uber/cadence/TaskList.js';
import { WorkflowType as shared_WorkflowType } from '../generated/thrift/cadence-idl/com/uber/cadence/WorkflowType.js';
import { WorkflowExecution as shared_WorkflowExecution } from '../generated/thrift/cadence-idl/com/uber/cadence/WorkflowExecution.js';
import { ActivityType as shared_ActivityType } from '../generated/thrift/cadence-idl/com/uber/cadence/ActivityType.js';
import { Int64 } from '@creditkarma/thrift-server-core';
import { RecordActivityTaskHeartbeatResponse as shared_RecordActivityTaskHeartbeatResponse } from '../generated/thrift/cadence-idl/com/uber/cadence/RecordActivityTaskHeartbeatResponse.js';
import { RespondActivityTaskFailedRequest as shared_RespondActivityTaskFailedRequest } from '../generated/thrift/cadence-idl/com/uber/cadence/RespondActivityTaskFailedRequest.js';
import { NewNoopActivityTracker } from './common/debug/workerstats_noop.js';
import { BoolPtr, Int32Ptr, Int32Ceil, Int64Ptr, StringPtr } from './common/convert.js';
import { MockAny, NewGoMockClient, NewGoMockController } from './runtime/gomock.js';
import { NoopLogger } from './runtime/logging.js';
import * as cron from 'cron-parser';
import { noRetryBackoff, getRetryBackoffWithNowTime, getRetryBackoff } from './internal_task_handlers.js';
import { defaultCase, mapCase, recvCase, selectOne, timeoutCase } from './runtime/select.js';
import { convertFromThriftRetryPolicy } from './convert.js';
import { trace } from '@opentelemetry/api';
import { newActivityTaskHandlerWithCustomProvider } from './activity_task_handler.js';
import { TaskListKind } from '../generated/thrift/cadence-idl/com/uber/cadence/TaskListKind.js';
import { internal_WorkflowIDReusePolicy } from './client.js';
import { Ref } from './runtime/ref.js';
import { TimeoutType } from '../generated/thrift/cadence-idl/com/uber/cadence/TimeoutType.js';
import { DefaultVersion } from '../workflow/workflow.js';
// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { Mutex } from 'async-mutex';
import { RegisterActivityOptions, RegistryActivityInfo, cadence_internal_ActivityInfo, internal_ActivityType } from './activity.js';
import { TaggedScope, NewTaggedScope } from './common/metrics/scope.js';
import { internal_Context, ErrCanceled, ErrDeadlineExceeded } from './context.js';
import { internal_DataConverter, internal_Value, internal_Values, getDefaultDataConverter } from './encoded.js';
import { internal_ContextPropagator } from './headers.js';
import { internal_WorkflowInterceptorFactory } from './interceptors.js';
import { activity, activityInfo, activityOptions, asyncActivityClient, executeActivityParams, executeLocalActivityParams, localActivityClient, localActivityInfo, getValidatedActivityFunction, localActivityOptions, getKind, isActivityContext } from './internal_activity.js';
import { localActivityTask, newLocalActivityTask, createSearchAttributesForChangeVersion, validateVersion, mergeSearchAttributes, validateAndSerializeSearchAttributes } from './internal_event_handlers.js';
import { ActivityTaskHandler } from './internal_public.js';
import { localActivityResult, convertActivityResultToRespondRequest, localActivityTaskHandler } from './internal_task_pollers.js';
import { timerInfo, workflowTimerClient } from './internal_time.js';
import { internal_FeatureFlags, constructError, getErrorDetails, getYarpcCallOptions } from './internal_utils.js';
import { activityExecutor, workflowExecutor, encodeArg, AugmentWorkerOptions, getActivityFunctionName, activityExecutorWrapper, encodeArgs, isWorkflowContext, decodeArgs, workflowExecutorWrapper, defaultMaxConcurrentSessionExecutionSize, ensureRequiredParams, workerExecutionParameters } from './internal_worker.js';
import { WorkerOptions, internal_ActivityRegistry, internal_Registry, internal_WorkflowRegistry } from './worker.js';
import { laResultHandler, resultHandler, workflowDefinition, workflowEnvironment, localActivityResultWrapper } from './internal_worker_base.js';
import { executeWorkflowParams, syncWorkflowDefinition, getStackTraceRaw, getValidatedWorkflowFunction, getStackTrace, newSyncWorkflowDefinition, workflow } from './internal_workflow.js';
import { registry, newRegistry } from './registry.js';
import { internal_SessionInfo, sessionEnvironment, testSessionEnvironmentImpl, sessionCompletionActivity, sessionCompletionActivityName, sessionCreationActivity, sessionCreationActivityName, newSessionEnvironment, sessionCompletionActivityForTest, sessionCreationActivityForTest, sessionEnvironmentContextKey, sessionEnvironmentImpl } from './session.js';
import { RegisterWorkflowOptions, RegistryWorkflowInfo, WorkflowInfo, internal_GetVersionOption, internal_Version, internal_WorkflowExecution, internal_WorkflowType, newEncodedValue, getVersionConfig } from './workflow.js';
import { MockCallWrapper, WorkflowTestSuite, newEncodedValues, mockMethodForSignalExternalWorkflow, mockMethodForUpsertSearchAttributes, mockMethodForGetVersion, mockMethodForRequestCancelExternalWorkflow } from './workflow_testsuite.js';
import type { WorkflowServiceClientLike } from './runtime/workflow_service_client_like.js';
import { Channel } from './runtime/channel.js';
import { Context, ErrDeadlineExceeded as goErrDeadlineExceeded, background, withValue } from './runtime/context.js';
import { Second } from './runtime/time.js';
import type { Scope } from './runtime/tally.js';
import { GoTestifyMock, Anything } from './runtime/testify_mock.js';
import type { GoClock, GoMockClock, GoTimer } from './runtime/clock.js';
import { NewMockClock, RealClock } from './runtime/clock.js';
import { CronOverlapPolicy as shared_CronOverlapPolicy } from '../generated/thrift/cadence-idl/com/uber/cadence/CronOverlapPolicy.js';
import { IHeader as shared_IHeader } from '../generated/thrift/cadence-idl/com/uber/cadence/Header.js';
import { IPollForActivityTaskResponse as shared_IPollForActivityTaskResponse, PollForActivityTaskResponse as shared_PollForActivityTaskResponse } from '../generated/thrift/cadence-idl/com/uber/cadence/PollForActivityTaskResponse.js';
import { IRetryPolicy as shared_IRetryPolicy } from '../generated/thrift/cadence-idl/com/uber/cadence/RetryPolicy.js';
import { tagActivityID, tagTimerID, tagActivityType } from './internal_logging_tags.js';
import { errReasonPanic, newPanicError, internal_CanceledError, internal_ContinueAsNewError, internal_TimeoutError, workflowPanicError, newUnknownExternalWorkflowExecutionError, NewCanceledError, ErrActivityResultPending, NewTimeoutError } from './error.js';
import { EntityNotExistsError as shared_EntityNotExistsError, WorkflowExecutionAlreadyCompletedError as shared_WorkflowExecutionAlreadyCompletedError, WorkflowExecutionAlreadyStartedError, WorkflowExecutionAlreadyStartedError as shared_WorkflowExecutionAlreadyStartedError } from '../errors/idl_errors.js';
import { Logger } from 'winston';

export interface taskListSpecificActivity {
  fn?: unknown;
  taskLists?: Record<string, {}>;
}

export interface testActivityHandle {
  callback?: resultHandler;
  activityType: string;
  heartbeatDetails?: Buffer;
}

export interface testTimerHandle {
  env?: testWorkflowEnvironmentImpl;
  callback?: resultHandler;
  timer?: GoTimer;
  wallTimer?: GoTimer;
  duration: number;
  mockTimeToFire: number;
  wallTimeToFire: number;
  timerID: number;
}

/**
 * testWorkflowEnvironmentShared is the shared data between parent workflow and child workflow test environments
 */
export interface testWorkflowEnvironmentShared {
  locker: Mutex;
  testSuite?: WorkflowTestSuite;
  taskListSpecificActivities?: Record<string, taskListSpecificActivity>;
  mock?: GoTestifyMock;
  service?: WorkflowServiceClientLike;
  logger?: Logger;
  metricsScope?: TaggedScope;
  ctxProps?: internal_ContextPropagator[];
  mockClock?: GoMockClock;
  wallClock?: GoClock;
  startTime: number;
  callbackChannel?: Channel<testCallbackHandle>;
  testTimeout: number;
  header?: shared_IHeader;
  counterID: number;
  activities?: Record<string, testActivityHandle>;
  localActivities?: Record<string, localActivityTask>;
  timers?: Record<string, testTimerHandle>;
  runningWorkflows?: Record<string, testWorkflowHandle>;
  runningCount: number;
  expectedMockCalls?: Record<string, {}>;
  onActivityStartedListener?: (p0: cadence_internal_ActivityInfo, p1: Context, p2: internal_Values) => void | Promise<void>;
  onActivityCompletedListener?: (p0: cadence_internal_ActivityInfo, p1: internal_Value | undefined, p2: Error | null) => void | Promise<void>;
  onActivityCanceledListener?: (p0: cadence_internal_ActivityInfo) => void | Promise<void>;
  onLocalActivityStartedListener?: (p0: cadence_internal_ActivityInfo, p1: Context, p2: unknown[]) => void | Promise<void>;
  onLocalActivityCompletedListener?: (p0: cadence_internal_ActivityInfo, p1: internal_Value | undefined, p2: Error | null) => void | Promise<void>;
  onLocalActivityCanceledListener?: (p0: cadence_internal_ActivityInfo) => void | Promise<void>;
  onActivityHeartbeatListener?: (p0: cadence_internal_ActivityInfo, p1: internal_Values) => void | Promise<void>;
  onChildWorkflowStartedListener?: (p0: WorkflowInfo, p1: internal_Context, p2: internal_Values) => void | Promise<void>;
  onChildWorkflowCompletedListener?: (p0: WorkflowInfo, p1: internal_Value, p2: Error | null) => void | Promise<void>;
  onChildWorkflowCanceledListener?: (p0: WorkflowInfo) => void | Promise<void>;
  onTimerScheduledListener?: (p0: string, p1: number) => void | Promise<void>;
  onTimerFiredListener?: (p0: string) => void | Promise<void>;
  onTimerCancelledListener?: (p0: string) => void | Promise<void>;
  cronMaxIterations: number;
}

export class testWorkflowHandle {
  constructor(init?: Partial<testWorkflowHandle>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  env?: testWorkflowEnvironmentImpl;

  callback?: resultHandler;

  handled: boolean = false;

  params?: executeWorkflowParams;

  err?: Error | null;

  async rerun(asChild: boolean): Promise<boolean> {
      const env = this.env!;
      if (asChild && !env.isChildWorkflow()) {
        return false;
      }
      if (!asChild && env.isChildWorkflow()) {
        return false;
      }

      const params = this.params!;
      const resultBox: { value: Buffer } = { value: Buffer.alloc(0) };
      if (env.testResult != null) {
        env.testResult.Get(resultBox);
      }
      let result: Buffer = resultBox.value;
      if (result.length === 0) {
        result = env.workflowInfo!.lastCompletionResult;
      }

      if (asChild) {
        params.lastCompletionResult = result;

        if (params.retryPolicy != null && env.testError != null) {
          const [errReason, details] = getErrorDetails(env.testError!, env.GetDataConverter());
          let expireTime = 0;
          if ((params.retryPolicy.expirationIntervalInSeconds ?? 0) > 0) {
            expireTime =
              params.scheduledTime +
              Second * (params.retryPolicy.expirationIntervalInSeconds ?? 0);
          }
          const backoff = getRetryBackoffFromThriftRetryPolicy(
            params.retryPolicy,
            env.workflowInfo!.Attempt,
            errReason,
            env.Now(),
            expireTime,
          );
          if (backoff > 0) {
            delete env.testWorkflowEnvironmentShared!.runningWorkflows![
              env.workflowInfo!.WorkflowExecution.ID
            ];
            params.attempt++;
            env.parentEnv!.executeChildWorkflowWithDelay(
              backoff,
              params,
              this.callback!,
              undefined,
            );
            return true;
          }
        }

        if (params.cronSchedule.length > 0) {
          if (
            env.testWorkflowEnvironmentShared!.cronMaxIterations < 0 ||
            (env.testWorkflowEnvironmentShared!.cronMaxIterations > 0 &&
              env.cronIterations < env.testWorkflowEnvironmentShared!.cronMaxIterations)
          ) {
            let schedule;
            try {
              schedule = cron.CronExpressionParser.parse(params.cronSchedule, {
                currentDate: env.Now() / 1_000_000,
              });
            } catch (err) {
              const e = err instanceof Error ? err : new globalThis.Error(String(err));
              throw new globalThis.Error(
                `invalid cron schedule ${params.cronSchedule}, err: ${e.message}`,
              );
            }
            const workflowNow = env.Now();
            const backoff =
              (schedule.next().getTime() - workflowNow / 1_000_000) * 1_000_000;
            if (backoff > 0) {
              env.cronIterations++;
              delete env.testWorkflowEnvironmentShared!.runningWorkflows![
                env.workflowInfo!.WorkflowExecution.ID
              ];
              params.attempt = 0;
              params.scheduledTime = env.Now();
              env.parentEnv!.executeChildWorkflowWithDelay(
                backoff,
                params,
                this.callback!,
                undefined,
              );
              return true;
            }
          }
        }
      } else {
        if (env.workflowInfo!.CronSchedule != null) {
          if (
            env.testWorkflowEnvironmentShared!.cronMaxIterations < 0 ||
            (env.testWorkflowEnvironmentShared!.cronMaxIterations > 0 &&
              env.cronIterations < env.testWorkflowEnvironmentShared!.cronMaxIterations)
          ) {
            const cronSchedule = env.workflowInfo!.CronSchedule!;
            if (cronSchedule.length === 0) {
              return false;
            }

            let schedule;
            try {
              schedule = cron.CronExpressionParser.parse(cronSchedule, {
                currentDate: env.Now() / 1_000_000,
              });
            } catch (err) {
              const e = err instanceof Error ? err : new globalThis.Error(String(err));
              throw new globalThis.Error(
                `invalid cron schedule ${cronSchedule}, err: ${e.message}`,
              );
            }

            const workflowNow = env.Now();
            const backoff =
              (schedule.next().getTime() - workflowNow / 1_000_000) * 1_000_000;
            if (backoff > 0) {
              env.cronIterations++;
              env.testWorkflowEnvironmentShared!.runningCount--;
              env.setLastCompletionResult(result);
              env.registerDelayedCallback(async () => {
                env.testWorkflowEnvironmentShared!.runningCount++;
                env.workflowDef = await env.getWorkflowDefinition(
                  env.workflowInfo!.WorkflowType,
                );
                await env.workflowDef.Execute(
                  env,
                  env.testWorkflowEnvironmentShared!.header!,
                  env.workflowInput,
                );
                await env.startDecisionTask();
              }, backoff - backoff);
              return true;
            }
          }
        }
      }

      return false;
    }

}

export class testCallbackHandle {
  constructor(init?: Partial<testCallbackHandle>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  callback?: () => void | Promise<void>;

  startDecisionTask: boolean = false;

  env?: testWorkflowEnvironmentImpl;

  async processCallback(): Promise<void> {
    const release = await this.env!.testWorkflowEnvironmentShared!.locker.acquire();
    try {
      await this.callback!();
      if (this.startDecisionTask) {
        await this.env!.startDecisionTask();
      }
    } finally {
      release();
    }
  }

}

export class mockWrapper {
  constructor(init?: Partial<mockWrapper>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  env?: testWorkflowEnvironmentImpl;

  name: string = "";

  fn?: unknown;

  isWorkflow: boolean = false;

  dataConverter?: internal_DataConverter;

  getCtxArg(ctx: unknown): unknown[] {
      const fnType = this.fn!;
      if ((fnType as { length: number }).length > 0) {
        if (
          (!this.isWorkflow && isActivityContext(fnType)) ||
          (this.isWorkflow && isWorkflowContext(fnType))
        ) {
          return [ctx];
        }
      }
      return [];
    }

  async getMockReturn(ctx: unknown, input: Buffer): Promise<unknown[] | undefined> {
    if (!(this.name in this.env!.testWorkflowEnvironmentShared!.expectedMockCalls!)) {
      return undefined;
    }

    let reflectArgs: unknown[];
    try {
      reflectArgs = decodeArgs(this.dataConverter!, this.fn!, input);
    } catch (err) {
      if (!(err instanceof Error)) {
        throw err;
      }
      throw `Decode error: ${err.message} in ${this.name} of type ${typeof this.fn!}`;
    }

    const realArgs = this.getCtxArg(ctx);
    for (const arg of reflectArgs) {
      realArgs.push(arg);
    }

    return this.env!.testWorkflowEnvironmentShared!.mock!.MethodCalled(this.name, ...realArgs);
  }

  async getMockReturnWithActualArgs(ctx: unknown, inputArgs: unknown[]): Promise<unknown[] | undefined> {
    if (!(this.name in this.env!.testWorkflowEnvironmentShared!.expectedMockCalls!)) {
      return undefined;
    }

    let realArgs = this.getCtxArg(ctx);
    realArgs = realArgs.concat(inputArgs);
    return this.env!.testWorkflowEnvironmentShared!.mock!.MethodCalled(this.name, ...realArgs);
  }

  getMockFn(mockRet: unknown[]): unknown | undefined {
    const fnName = this.name;
    const mockRetLen = mockRet.length;
    if (mockRetLen === 0) {
      throw `mock of ${fnName} has no returns`;
    }

    const fnType = this.fn!;
    const mockFn = mockRet[0];
    const mockFnType = mockFn;
    if (typeof mockFnType === "function") {
      if (
        typeof fnType !== "function" ||
        mockFnType.length !== fnType.length
      ) {
        throw `mock of ${fnName} has incorrect return function, expected ${globalThis.String(fnType)}, but actual is ${globalThis.String(mockFnType)}`;
      }
      return mockFn;
    }
    return undefined;
  }

  getMockValue(mockRet: unknown[]): Buffer {
    const fnName = this.name;
    const mockRetLen = mockRet.length;

    const formatValue = (value: unknown): string =>
      value instanceof Error
        ? value.message
        : typeof (value as { Error?: unknown }).Error === "function"
          ? (value as { Error(): string }).Error()
          : typeof (value as { String?: unknown }).String === "function"
            ? (value as { String(): string }).String()
            : globalThis.String(value);

    if (mockRetLen !== 1 && mockRetLen !== 2) {
      throw `mock of ${fnName} has incorrect number of returns, expected 1 or 2, but actual is ${mockRetLen}`;
    }

    const mockErr = mockRet[mockRetLen - 1];
    let retErr: unknown = null;

    if (mockErr == null) {
      retErr = null;
    } else if (
      mockErr instanceof Error ||
      typeof (mockErr as { Error?: unknown }).Error === "function"
    ) {
      retErr = mockErr;
    } else {
      throw `mock of ${fnName} has incorrect return type, expected error, but actual is ${typeof mockErr} (${formatValue(mockErr)})`;
    }

    switch (mockRetLen) {
      case 1:
        if (retErr != null) {
          throw retErr;
        }
        return Buffer.alloc(0);

      case 2: {
        const mockResult = mockRet[0];
        let result: Buffer;

        try {
          result = encodeArg(this.env!.GetDataConverter(), mockResult);
        } catch (err) {
          if (!(err instanceof Error)) {
            throw err;
          }
          throw `encode result from mock of ${fnName} failed: ${err.message}`;
        }

        if (retErr != null) {
          throw retErr;
        }
        return result;
      }

      default:
        throw "mock should either have 1 return value (error) or 2 return values (result, error)";
    }
  }

  async executeMock(ctx: unknown, input: Buffer, mockRet: unknown[]): Promise<Buffer> {
    try {
      const fnName = this.name;
      const mockFn = this.getMockFn(mockRet);

      if (mockFn != null) {
        if (this.isWorkflow) {
          const executor = new workflowExecutor({ workflowType: fnName, fn: mockFn });
          return await executor.Execute(ctx as internal_Context, input);
        }

        const executor = new activityExecutor({
          name: fnName,
          fn: mockFn,
          options: {
            Name: "",
            EnableShortName: false,
            DisableAlreadyRegisteredCheck: false,
            EnableAutoHeartbeat: false,
          },
          path: "",
        });
        return await executor.Execute(ctx as Context, input);
      }

      return this.getMockValue(mockRet);
    } catch (r) {
      if (r instanceof Error) {
        throw r;
      }
      const st = getStackTrace("executeMock", "panic", 4);
      throw newPanicError(r, st);
    }
  }

  async executeMockWithActualArgs(ctx: unknown, inputArgs: unknown[], mockRet: unknown[]): Promise<Buffer> {
    const fnName = this.name;
    const mockFn = this.getMockFn(mockRet);
    if (mockFn != null) {
      const executor = new activityExecutor({
        name: fnName,
        fn: mockFn,
        options: {
          Name: "",
          EnableShortName: false,
          DisableAlreadyRegisteredCheck: false,
          EnableAutoHeartbeat: false,
        },
        path: "",
      });
      return await executor.ExecuteWithActualArgs(ctx as Context, inputArgs);
    }

    return this.getMockValue(mockRet);
  }

}

/**
 * testWorkflowEnvironmentImpl is the environment that runs the workflow/activity unit tests.
 */
export class testWorkflowEnvironmentImpl implements internal_ActivityRegistry, internal_Registry, internal_WorkflowRegistry, asyncActivityClient, localActivityClient, workflowEnvironment, workflowTimerClient {
  constructor(init?: Partial<testWorkflowEnvironmentImpl>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  testWorkflowEnvironmentShared?: testWorkflowEnvironmentShared;

  parentEnv?: testWorkflowEnvironmentImpl;

  registry?: registry;

  workflowInterceptors: internal_WorkflowInterceptorFactory[] = [];

  workflowInfo?: WorkflowInfo;

  workflowDef?: workflowDefinition;

  changeVersions: Record<string, internal_Version> = {};

  openSessions: Record<string, internal_SessionInfo> = {};

  workflowCancelHandler?: () => void | Promise<void>;

  signalHandler?: (p0: string, p1: Buffer) => void | Promise<void>;

  queryHandler?: (p0: string, p1: Buffer) => Buffer | Promise<Buffer>;

  startedHandler?: (p0: internal_WorkflowExecution, p1: Error | null) => void | Promise<void>;

  isTestCompleted: boolean = false;

  testResult?: internal_Value;

  testError?: Error | null;

  doneChannel?: Channel<{}>;

  workerOptions: WorkerOptions = new WorkerOptions();

  executionTimeout: number = 0;

  heartbeatDetails: Buffer = Buffer.alloc(0);

  workerStopChannel?: Channel<{}>;

  sessionEnvironment?: testSessionEnvironmentImpl;

  cronSchedule: string = "";

  cronIterations: number = 0;

  workflowInput: Buffer = Buffer.alloc(0);

  cronOverlapPolicy: shared_CronOverlapPolicy = 0;

  setStartTime(startTime: number): void {
    if (startTime === 0) {
      startTime = this.testWorkflowEnvironmentShared!.wallClock!.Now();
    }
    this.testWorkflowEnvironmentShared!.mockClock!.Add(
      startTime - this.testWorkflowEnvironmentShared!.mockClock!.Now(),
    );
  }

  setCronSchedule(cronSchedule: string): void {
    this.workflowInfo!.CronSchedule = cronSchedule;
  }

  setCronMaxIterationas(cronMaxIterations: number): void {
    this.testWorkflowEnvironmentShared!.cronMaxIterations = cronMaxIterations;
  }

  newTestWorkflowEnvironmentForChild(params: executeWorkflowParams, callback: resultHandler, startedHandler: (p0: internal_WorkflowExecution, p1: Error | null) => void | Promise<void>): testWorkflowEnvironmentImpl {
    const childEnv = newTestWorkflowEnvironmentImpl(this.testWorkflowEnvironmentShared!.testSuite!, this.registry!);
    childEnv.parentEnv = this;
    childEnv.startedHandler = startedHandler;
    childEnv.testWorkflowEnvironmentShared = this.testWorkflowEnvironmentShared;
    childEnv.workerOptions = this.workerOptions;
    childEnv.workerOptions.DataConverter = params.dataConverter!;
    childEnv.workflowInterceptors = this.workflowInterceptors;
    childEnv.registry = this.registry;

    if (params.workflowID === '') {
      params.workflowID = this.workflowInfo!.WorkflowExecution.RunID + '_' + getStringID(this.nextID());
    }

    let cronSchedule: string | undefined;
    if (params.cronSchedule.length > 0) {
      cronSchedule = params.cronSchedule;
    }

    childEnv.testWorkflowEnvironmentShared!.header = params.header!;
    childEnv.workflowInfo!.Attempt = params.attempt;
    childEnv.workflowInfo!.WorkflowExecution.ID = params.workflowID;
    childEnv.workflowInfo!.WorkflowExecution.RunID = params.workflowID + '_RunID';
    childEnv.workflowInfo!.Domain = params.domain!;
    childEnv.workflowInfo!.TaskListName = params.taskListName!;
    childEnv.workflowInfo!.ExecutionStartToCloseTimeoutSeconds = params.executionStartToCloseTimeoutSeconds!;
    childEnv.workflowInfo!.TaskStartToCloseTimeoutSeconds = params.taskStartToCloseTimeoutSeconds!;
    childEnv.workflowInfo!.lastCompletionResult = params.lastCompletionResult;
    childEnv.workflowInfo!.CronSchedule = cronSchedule;
    childEnv.workflowInfo!.ParentWorkflowDomain = new Ref(this.workflowInfo!.Domain);
    childEnv.workflowInfo!.ParentWorkflowExecution = this.workflowInfo!.WorkflowExecution;
    childEnv.executionTimeout = Math.trunc(params.executionStartToCloseTimeoutSeconds!) * Second;
    childEnv.cronOverlapPolicy = params.cronOverlapPolicy;

    const runningWorkflows = this.testWorkflowEnvironmentShared!.runningWorkflows!;
    if (params.workflowID in runningWorkflows) {
      const workflowHandler = runningWorkflows[params.workflowID];

      if (!workflowHandler.handled) {
        throw new WorkflowExecutionAlreadyStartedError({
          message: StringPtr('Workflow execution already started'),
        });
      }

      if (params.workflowIDReusePolicy === internal_WorkflowIDReusePolicy.WorkflowIDReusePolicyRejectDuplicate) {
        throw new WorkflowExecutionAlreadyStartedError({
          message: StringPtr('Workflow execution already started'),
        });
      }

      if (workflowHandler.err == null && params.workflowIDReusePolicy === internal_WorkflowIDReusePolicy.WorkflowIDReusePolicyAllowDuplicateFailedOnly) {
        throw new WorkflowExecutionAlreadyStartedError({
          message: StringPtr('Workflow execution already started'),
        });
      }
    }

    runningWorkflows[params.workflowID] = new testWorkflowHandle({
      env: childEnv,
      callback,
      params,
      handled: false,
    });

    return childEnv;
  }

  setWorkerOptions(options: WorkerOptions): void {
    if (options.Identity.length > 0) {
      this.workerOptions.Identity = options.Identity;
    }
    if (options.BackgroundActivityContext != null) {
      this.workerOptions.BackgroundActivityContext = options.BackgroundActivityContext!;
    }
    if (options.MetricsScope != null) {
      this.workerOptions.MetricsScope = options.MetricsScope!;
    }
    if (options.DataConverter != null) {
      this.workerOptions.DataConverter = options.DataConverter!;
    }
    if (options.MaxConcurrentSessionExecutionSize !== 0) {
      this.workerOptions.MaxConcurrentSessionExecutionSize = options.MaxConcurrentSessionExecutionSize;
    }
    if (options.ContextPropagators.length > 0) {
      this.workerOptions.ContextPropagators = options.ContextPropagators;
    }
    if (options.Logger != null) {
      this.workerOptions.Logger = options.Logger!;
    }
    this.workflowInterceptors = options.WorkflowInterceptorChainFactories;
  }

  setWorkerStopChannel(c: Channel<{}>): void {
    this.workerStopChannel = c;
  }

  async setActivityTaskList(tasklist: string, ...activityFns: unknown[]): Promise<void> {
    for (const activityFn of activityFns) {
      const fnName = await getActivityFunctionName(this.registry!, activityFn);
      let taskListActivity = this.testWorkflowEnvironmentShared!.taskListSpecificActivities![fnName];
      if (!(fnName in this.testWorkflowEnvironmentShared!.taskListSpecificActivities!)) {
        const newTaskListActivity: taskListSpecificActivity = {
          fn: activityFn,
          taskLists: {},
        };
        taskListActivity = newTaskListActivity;
        this.testWorkflowEnvironmentShared!.taskListSpecificActivities![fnName] = taskListActivity;
      }
      taskListActivity.taskLists![tasklist] = {};
    }
  }

  async executeWorkflow(workflowFn: unknown, ...args: unknown[]): Promise<void> {
    const fType = workflowFn;
    if (getKind(fType) === 'function') {
      await this.RegisterWorkflowWithOptions(workflowFn, {
        DisableAlreadyRegisteredCheck: true,
        EnableShortName: false,
        Name: ""
      });
    }
    const [workflowType, input] = await getValidatedWorkflowFunction(
      workflowFn,
      args,
      this.GetDataConverter(),
      this.GetRegistry()
    );
    await this.executeWorkflowInternal(0, workflowType.Name, input);
  }

  async executeWorkflowInternal(delayStart: number, workflowType: string, input: Buffer): Promise<void> {
    const release = await this.testWorkflowEnvironmentShared!.locker.acquire();
    if (this.workflowInfo!.WorkflowType.Name !== workflowTypeNotSpecified) {
      throw new Error(
        `Current TestWorkflowEnvironment is used to execute ${this.workflowInfo!.WorkflowType.Name}. Please create a new TestWorkflowEnvironment for ${workflowType}.`,
      );
    }
    this.workflowInfo!.WorkflowType.Name = workflowType;
    release();

    const workflowDefinition = await this.getWorkflowDefinition(this.workflowInfo!.WorkflowType);
    this.workflowDef = workflowDefinition;
    this.workflowInput = input;

    this.postCallback(async () => {
      try {
        await this.workflowDef!.Execute(this, this.testWorkflowEnvironmentShared!.header!, input);
      } catch (err) {
        if (!(err instanceof Error)) throw err;
      }

      if (delayStart === 0) {
        try {
          await this.startDecisionTask();
        } catch (err) {
          if (!(err instanceof Error)) throw err;
        }
      } else {
        this.testWorkflowEnvironmentShared!.runningCount--;
        this.registerDelayedCallback(async () => {
          this.testWorkflowEnvironmentShared!.runningCount++;
          try {
            await this.startDecisionTask();
          } catch (err) {
            if (!(err instanceof Error)) throw err;
          }
        }, delayStart);
      }
    }, false);

    if (this.executionTimeout > 0) {
      const timeoutDuration = this.executionTimeout + delayStart;
      this.registerDelayedCallback(async () => {
        if (!this.isTestCompleted) {
          try {
            await this.Complete(undefined, ErrDeadlineExceeded);
          } catch (err) {
            if (!(err instanceof Error)) throw err;
          }
        }
      }, timeoutDuration);
    }

    try {
      await this.startMainLoop();
    } catch (err) {
      if (!(err instanceof Error)) throw err;
    }
  }

  async getWorkflowDefinition(wt: internal_WorkflowType): Promise<syncWorkflowDefinition> {
    const [wf, ok] = await this.registry!.getWorkflowFn(wt.Name);
    if (!ok) {
      const supported = (await this.registry!.GetRegisteredWorkflowTypes()).join(", ");
      throw new Error(`unable to find workflow type: ${wt.Name}. Supported types: [${supported}]`);
    }
    const wd = new workflowExecutorWrapper({
      workflowType: wt.Name,
      fn: wf,
      env: this,
    });
    return newSyncWorkflowDefinition(wd);
  }

  async executeActivity(activityFn: unknown, ...args: unknown[]): Promise<internal_Value> {
    return await this.executeActivityWithOptions(
      new activityOptions({
        HeartbeatTimeoutSeconds: 0,
        OriginalTaskListName: "",
        ScheduleToCloseTimeoutSeconds: 600,
        ScheduleToStartTimeoutSeconds: 0,
        StartToCloseTimeoutSeconds: 600,
        TaskListKind: 0,
        TaskListName: "",
        WaitForCancellation: false,
      }),
      activityFn,
      ...args,
    );
  }

  async executeLocalActivity(activityFn: unknown, ...args: unknown[]): Promise<internal_Value> {
    const params = new executeLocalActivityParams({
      localActivityOptions: new localActivityOptions({
        ScheduleToCloseTimeoutSeconds: Int32Ceil(this.testWorkflowEnvironmentShared!.testTimeout / 1e9),
      }),
      ActivityFn: activityFn,
      InputArgs: args,
      WorkflowInfo: this.workflowInfo,
      ActivityType: "",
      Attempt: 0,
      ScheduledTime: 0,
    });
    const task = new localActivityTask({
      activityID: "test-local-activity",
      params,
      callback: (_lar) => {},
      attempt: 0,
      canceled: false,
      expireTime: 0,
    });
    const taskHandler = new localActivityTaskHandler({
      userContext: this.workerOptions.BackgroundActivityContext!,
      metricsScope: this.testWorkflowEnvironmentShared!.metricsScope!,
      logger: this.testWorkflowEnvironmentShared!.logger!,
      tracer: trace.getTracer("noop"),
      activityTracker: NewNoopActivityTracker(),
      contextPropagators: [],
    });

    const result = await taskHandler.executeLocalActivityTask(task);
    if (result.err != null) {
      throw result.err;
    }
    return newEncodedValue(result.result!, this.GetDataConverter());
  }

  async startDecisionTask(): Promise<void> {
    if (!this.isTestCompleted) {
      await this.workflowDef!.OnDecisionTaskStarted();
    }
  }

  isChildWorkflow(): boolean {
    return this.parentEnv != null;
  }

  async startMainLoop(): Promise<void> {
    if (this.isChildWorkflow()) {
      await this.doneChannel!.recv();
      return;
    }

    while (!this.isTestCompleted) {
      const callbackChannel = this.testWorkflowEnvironmentShared!.callbackChannel;
      const immediate = await selectOne([
        mapCase(recvCase(callbackChannel), (result) => ({
          kind: "callback" as const,
          callback: result.value!,
        })),
        defaultCase({ kind: "idle" as const }),
      ]);

      if (immediate.kind === "callback") {
        await immediate.callback.processCallback();
      } else {
        if (!this.autoFireNextTimer()) {
          if (this.isTestCompleted) {
            return;
          }

          const outcome = await selectOne([
            mapCase(recvCase(callbackChannel), (result) => ({
              kind: "callback" as const,
              callback: result.value!,
            })),
            mapCase(timeoutCase(this.testWorkflowEnvironmentShared!.testTimeout), () => ({
              kind: "timeout" as const,
            })),
          ]);

          if (outcome.kind === "callback") {
            await outcome.callback.processCallback();
          } else {
            const panicMsg = `test timeout: ${globalThis.String(this.testWorkflowEnvironmentShared!.testTimeout)}, workflow stack: ${await this.workflowDef!.StackTrace()}`;
            throw panicMsg;
          }
        }
      }
    }
  }

  registerDelayedCallback(f: () => void | Promise<void>, delayDuration: number): void {
    const timerCallback = (_result: Buffer, _err: Error | null): void => {
      f();
    };
    if (delayDuration === 0) {
      this.postCallback(f, false);
      return;
    }
    const mainLoopCallback = (): void => {
      this.newTimer(delayDuration, timerCallback, false);
    };
    this.postCallback(mainLoopCallback, false);
  }

  postCallback(cb: () => void | Promise<void>, startDecisionTask: boolean): void {
    this.testWorkflowEnvironmentShared!.callbackChannel!.send(
      new testCallbackHandle({ callback: cb, startDecisionTask, env: this }),
    );
  }

  GetLogger(): Logger {
    return this.testWorkflowEnvironmentShared!.logger!;
  }

  GetMetricsScope(): Scope {
    return this.workerOptions.MetricsScope!;
  }

  GetDataConverter(): internal_DataConverter {
    return this.workerOptions.DataConverter!;
  }

  GetContextPropagators(): internal_ContextPropagator[] {
    return this.workerOptions.ContextPropagators;
  }

  async ExecuteActivity(parameters: executeActivityParams, callback: resultHandler): Promise<activityInfo> {
    let activityID: string;
    if (parameters.activityOptions.ActivityID == null || parameters.activityOptions.ActivityID === "") {
      activityID = getStringID(this.nextID());
    } else {
      activityID = parameters.activityOptions.ActivityID!;
    }

    const activityInfoLocal: activityInfo = { activityID };
    const task = newTestActivityTask(
      defaultTestWorkflowID,
      defaultTestRunID,
      activityInfoLocal.activityID,
      defaultTestWorkflowTypeName,
      defaultTestDomainName,
      parameters,
    );

    const taskHandler = await this.newTestActivityTaskHandler(
      parameters.activityOptions.TaskListName,
      parameters.DataConverter!,
    );
    const activityHandle: testActivityHandle = {
      callback,
      activityType: parameters.ActivityType.Name,
    };

    this.setActivityHandle(activityInfoLocal.activityID, activityHandle);
    this.testWorkflowEnvironmentShared!.runningCount++;

    const createdBy = (new Error().stack ?? "").split("\n").slice(2).join("\n");

    void (async () => {
      let result: unknown = undefined;
      let panicOccurred = false;
      let panicErr: unknown = undefined;

      try {
        result = await this.executeActivityWithRetryForTest(taskHandler, parameters, task);
      } catch (err) {
        if (err != null) {
          panicOccurred = true;
          panicErr = err;
        }
      } finally {
        if (result == null && !panicOccurred) {
          result = new shared_RespondActivityTaskFailedRequest({
            reason: "activity called runtime.Goexit",
          });
        } else if (panicOccurred) {
          const panicText =
            panicErr instanceof Error
              ? panicErr.message
              : typeof (panicErr as { String?: unknown }).String === "function"
                ? (panicErr as { String(): string }).String()
                : globalThis.String(panicErr);
          let st = panicErr instanceof Error ? panicErr.stack ?? "" : "";
          if (createdBy !== "") {
            st = `${st}\ncreated by:\n${createdBy}`;
          }
          result = new shared_RespondActivityTaskFailedRequest({
            reason: errReasonPanic,
            details: this.GetDataConverter().ToData(panicText),
          });
        }

        this.postCallback(async () => {
          await this.handleActivityResult(
            activityInfoLocal.activityID,
            result,
            parameters.ActivityType.Name,
            parameters.DataConverter!,
          );
          this.testWorkflowEnvironmentShared!.runningCount--;
        }, false);
      }
    })();

    return activityInfoLocal;
  }

  getActivityHandle(activityID: string): [testActivityHandle, boolean] {
    const uniqueID = this.makeUniqueID(activityID);
    const activities = this.testWorkflowEnvironmentShared!.activities!;
    const handle = activities[uniqueID];
    const ok = uniqueID in activities;
    return [handle, ok];
  }

  setActivityHandle(activityID: string, handle: testActivityHandle): void {
    this.testWorkflowEnvironmentShared!.activities![this.makeUniqueID(activityID)] = handle;
  }

  deleteHandle(activityID: string): void {
    delete this.testWorkflowEnvironmentShared!.activities![this.makeUniqueID(activityID)];
  }

  makeUniqueID(id: string): string {
    return `${this.WorkflowInfo().WorkflowExecution.RunID}_${id}`;
  }

  async executeActivityWithRetryForTest(taskHandler: ActivityTaskHandler, parameters: executeActivityParams, task: shared_IPollForActivityTaskResponse): Promise<unknown> {
    let expireTime = 0;
    if (parameters.activityOptions.RetryPolicy != null && (parameters.activityOptions.RetryPolicy.expirationIntervalInSeconds ?? 0) > 0) {
      expireTime = this.Now() + Second * (parameters.activityOptions.RetryPolicy.expirationIntervalInSeconds ?? 0);
    }

    let result: unknown = undefined;
    for (;;) {
      try {
        result = await taskHandler.Execute(parameters.activityOptions.TaskListName, task);
      } catch (err) {
        if (!(err instanceof Error)) {
          throw err;
        }
        if (err === goErrDeadlineExceeded) {
          return err;
        }
        throw err;
      }

      if (result instanceof shared_RespondActivityTaskFailedRequest && parameters.activityOptions.RetryPolicy != null) {
        const backoff = getRetryBackoffWithNowTime(
          convertFromThriftRetryPolicy(parameters.activityOptions.RetryPolicy)!,
          task.attempt ?? 0,
          result.reason!,
          this.Now(),
          expireTime,
        );
        if (backoff > 0) {
          const wait = new Promise<void>((resolve) => {
            this.registerDelayedCallback(() => {
              this.testWorkflowEnvironmentShared!.runningCount++;
              task.attempt = Int32Ptr((task.attempt ?? 0) + 1);
              const activityID = (task.taskToken ?? Buffer.alloc(0)).toString();
              const [activityHandle, ok] = this.getActivityHandle(activityID);
              if (ok) {
                task.heartbeatDetails = activityHandle.heartbeatDetails;
              }
              resolve();
            }, backoff);
          });
          this.postCallback(() => {
            this.testWorkflowEnvironmentShared!.runningCount--;
          }, false);

          await wait;
          continue;
        }
      }

      break;
    }

    return result;
  }

  async ExecuteLocalActivity(params: executeLocalActivityParams, callback: laResultHandler): Promise<localActivityInfo> {
    const activityID = getStringID(this.nextID());
    const wOptions = AugmentWorkerOptions(this.workerOptions);
    const ae = new activityExecutor({
      name: await getActivityFunctionName(this.registry!, params.ActivityFn!),
      fn: params.ActivityFn!,
      options: { Name: "", EnableShortName: false, DisableAlreadyRegisteredCheck: false, EnableAutoHeartbeat: false },
      path: ""
    });

    let at: internal_ActivityType | undefined;
    try {
      at = await getValidatedActivityFunction(params.ActivityFn!, params.InputArgs, this.registry!);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
    }

    if (at != null) {
      ae.name = at.Name;
    }

    const aew = Object.setPrototypeOf(ae, activityExecutorWrapper.prototype) as activityExecutorWrapper;
    aew.env = this;

    params.ActivityFn = async (ctx: Context, ...inputArgs: unknown[]): Promise<Buffer> => {
      return await aew.ExecuteWithActualArgs(ctx, params.InputArgs);
    };

    const task = newLocalActivityTask(params, callback, activityID);
    const taskHandler = new localActivityTaskHandler({
      userContext: wOptions.BackgroundActivityContext!,
      metricsScope: NewTaggedScope(wOptions.MetricsScope!),
      logger: wOptions.Logger!,
      dataConverter: wOptions.DataConverter!,
      tracer: wOptions.Tracer!,
      contextPropagators: wOptions.ContextPropagators,
      activityTracker: NewNoopActivityTracker()
    });

    this.testWorkflowEnvironmentShared!.localActivities![activityID] = task;
    this.testWorkflowEnvironmentShared!.runningCount++;

    void (async () => {
      const result = await taskHandler.executeLocalActivityTask(task);
      this.postCallback(async () => {
        try {
          await this.handleLocalActivityResult(result);
        } catch (err) {
          if (!(err instanceof Error)) throw err;
        }
        this.testWorkflowEnvironmentShared!.runningCount--;
      }, false);
    })();

    return { activityID };
  }

  async runBeforeMockCallReturns(call: MockCallWrapper, args: unknown[]): Promise<void> {
    let waitDuration = 0;
    if (call.waitDuration != null) {
      waitDuration = call.waitDuration!();
    }
    if (waitDuration > 0) {
      const waitPromise = new Promise<void>((resolve) => {
        this.registerDelayedCallback(() => {
          this.testWorkflowEnvironmentShared!.runningCount++;
          this.Now();
          resolve();
        }, waitDuration);

        this.postCallback(() => {
          this.testWorkflowEnvironmentShared!.runningCount--;
        }, false);
      });
      await waitPromise;
    }

    if (call.runFn != null) {
      call.runFn!(args);
    }
  }

  newTimer(d: number, callback: resultHandler, notifyListener: boolean): timerInfo {
    const nextID = this.nextID();
    const timerInfoLocal: timerInfo = { timerID: getStringID(nextID) };
    const timer = this.testWorkflowEnvironmentShared!.mockClock!.AfterFunc(d, () => {
      delete this.testWorkflowEnvironmentShared!.timers![timerInfoLocal.timerID];
      this.postCallback(() => {
        callback(Buffer.alloc(0), null);
        if (notifyListener && this.testWorkflowEnvironmentShared!.onTimerFiredListener != null) {
          this.testWorkflowEnvironmentShared!.onTimerFiredListener(timerInfoLocal.timerID);
        }
      }, true);
    });
    this.testWorkflowEnvironmentShared!.timers![timerInfoLocal.timerID] = {
      env: this,
      callback,
      timer,
      mockTimeToFire: this.testWorkflowEnvironmentShared!.mockClock!.Now() + d,
      wallTimeToFire: this.testWorkflowEnvironmentShared!.wallClock!.Now() + d,
      duration: d,
      timerID: nextID
    };
    if (notifyListener && this.testWorkflowEnvironmentShared!.onTimerScheduledListener != null) {
      this.testWorkflowEnvironmentShared!.onTimerScheduledListener(timerInfoLocal.timerID, d);
    }
    return timerInfoLocal;
  }

  NewTimer(d: number, callback: resultHandler): timerInfo {
    return this.newTimer(d, callback, true);
  }

  Now(): number {
    return this.testWorkflowEnvironmentShared!.mockClock!.Now();
  }

  WorkflowInfo(): WorkflowInfo {
    return this.workflowInfo!;
  }

  async RegisterWorkflow(w: unknown): Promise<void> {
    await this.registry!.RegisterWorkflow(w);
  }

  async RegisterWorkflowWithOptions(w: unknown, options: RegisterWorkflowOptions): Promise<void> {
    await this.registry!.RegisterWorkflowWithOptions(w, options);
  }

  async RegisterActivity(a: unknown): Promise<void> {
    await this.registry!.RegisterActivity(a);
  }

  async RegisterActivityWithOptions(a: unknown, options: RegisterActivityOptions): Promise<void> {
    await this.registry!.RegisterActivityWithOptions(a, options);
  }

  RegisterCancelHandler(handler: () => void | Promise<void>): void {
    this.workflowCancelHandler = handler;
  }

  RegisterSignalHandler(handler: (p0: string, p1: Buffer) => void | Promise<void>): void {
    this.signalHandler = handler;
  }

  RegisterQueryHandler(handler: (p0: string, p1: Buffer) => Buffer | Promise<Buffer>): void {
    this.queryHandler = handler;
  }

  async RequestCancelChildWorkflow(domainName: string, workflowID: string): Promise<void> {
    const runningWorkflows = this.testWorkflowEnvironmentShared!.runningWorkflows!;
    const childHandle = runningWorkflows[workflowID];
    const ok = workflowID in runningWorkflows;

    if (ok && !childHandle.handled) {
      const childEnv = childHandle.env!;
      try {
        await childEnv.cancelWorkflow((_result: Buffer, _err: Error | null) => {});
      } catch (err) {
        if (!(err instanceof Error)) throw err;
      }
      return;
    }
  }

  IsReplaying(): boolean {
    return false;
  }

  IsCron(): boolean {
    return this.workflowInfo!.CronSchedule! != null && this.workflowInfo!.CronSchedule!.length > 0;
  }

  ExecuteChildWorkflow(params: executeWorkflowParams, callback: resultHandler, startedHandler: (p0: internal_WorkflowExecution, p1: Error | null) => void | Promise<void>): void {
    this.executeChildWorkflowWithDelay(0, params, callback, startedHandler);
  }

  async GetRegisteredWorkflows(): Promise<RegistryWorkflowInfo[]> {
    const workflows = await this.registry!.GetRegisteredWorkflows();
    const result: RegistryWorkflowInfo[] = [];
    for (const wf of workflows) {
      result.push(wf);
    }
    return result;
  }

  async GetRegisteredActivities(): Promise<RegistryActivityInfo[]> {
    const activities = await this.registry!.getRegisteredActivities();
    const result: RegistryActivityInfo[] = [];
    for (const a of activities) {
      result.push(a);
    }
    return result;
  }

  SideEffect(f: () => Buffer, callback: resultHandler): void {
    callback(f(), null);
  }

  async GetVersion(changeID: string, minSupported: internal_Version, maxSupported: internal_Version, ...opts: internal_GetVersionOption[]): Promise<internal_Version> {
    const [mockVersion, ok] = await this.getMockedVersion(changeID, changeID, minSupported, maxSupported);
    if (ok) {
      await this.UpsertSearchAttributes(createSearchAttributesForChangeVersion(changeID, mockVersion, this.changeVersions));
      this.changeVersions[changeID] = mockVersion;
      return mockVersion;
    }

    const [anyMockVersion, anyOk] = await this.getMockedVersion(Anything, changeID, minSupported, maxSupported);
    if (anyOk) {
      await this.UpsertSearchAttributes(createSearchAttributesForChangeVersion(changeID, anyMockVersion, this.changeVersions));
      this.changeVersions[changeID] = anyMockVersion;
      return anyMockVersion;
    }

    const versionExists = changeID in this.changeVersions;
    if (versionExists) {
      const version = this.changeVersions[changeID]!;
      validateVersion(changeID, version, minSupported, maxSupported);
      return version;
    }

    const config: getVersionConfig = {
      CustomVersion: undefined,
      UseMinVersion: false
    };
    for (const opt of opts) {
      opt.apply(config);
    }

    let version: internal_Version;
    if (config.CustomVersion != null) {
      version = config.CustomVersion!;
    } else if (config.UseMinVersion) {
      version = minSupported;
    } else {
      version = maxSupported;
    }

    validateVersion(changeID, version, minSupported, maxSupported);

    if (version !== -1) {
      await this.UpsertSearchAttributes(createSearchAttributesForChangeVersion(changeID, version, this.changeVersions));
    }

    this.changeVersions[changeID] = version;
    return version;
  }

  MutableSideEffect(id: string, f: () => unknown, equals: (p0: unknown, p1: unknown) => boolean): internal_Value {
    return newEncodedValue(this.encodeValue(f()), this.GetDataConverter());
  }

  AddSession(sessionInfo: internal_SessionInfo): void {
    this.openSessions[sessionInfo.SessionID] = sessionInfo;
  }

  RemoveSession(sessionID: string): void {
    delete this.openSessions[sessionID];
  }

  encodeValue(value: unknown | undefined): Buffer {
    return this.GetDataConverter().ToData(value);
  }

  nextID(): number {
    const activityID = this.testWorkflowEnvironmentShared!.counterID;
    this.testWorkflowEnvironmentShared!.counterID++;
    return activityID;
  }

  getActivityInfo(activityID: string, activityType: string): cadence_internal_ActivityInfo {
    return {
      ActivityID: activityID,
      ActivityType: {
        Name: activityType,
        Path: "",
      },
      TaskToken: Buffer.from(activityID),
      WorkflowExecution: this.workflowInfo!.WorkflowExecution,
      Attempt: 0,
      Deadline: 0,
      HeartbeatTimeout: 0,
      ScheduledTimestamp: 0,
      StartedTimestamp: 0,
      TaskList: "",
      WorkflowDomain: "",
    };
  }

  async cancelWorkflow(callback: resultHandler): Promise<void> {
    this.postCallback(async () => {
      await this.RequestCancelExternalWorkflow(
        this.workflowInfo!.Domain,
        this.workflowInfo!.WorkflowExecution.ID,
        this.workflowInfo!.WorkflowExecution.RunID,
        callback,
      );
    }, true);
  }

  signalWorkflow(name: string, input: unknown, startDecisionTask: boolean): void {
    const data = encodeArg(this.GetDataConverter(), input);
    this.postCallback(() => {
      this.signalHandler!(name, data);
    }, startDecisionTask);
  }

  signalWorkflowByID(workflowID: string, signalName: string, input: unknown): void {
    const data = encodeArg(this.GetDataConverter(), input);
    const runningWorkflows = this.testWorkflowEnvironmentShared!.runningWorkflows!;
    const workflowHandle = runningWorkflows[workflowID];

    if (workflowID in runningWorkflows) {
      if (workflowHandle.handled) {
        throw new shared_WorkflowExecutionAlreadyCompletedError({
          message: `Workflow ${workflowID} already completed`,
        });
      }

      workflowHandle.env!.postCallback(() => {
        workflowHandle.env!.signalHandler!(signalName, data);
      }, true);
      return;
    }

    throw new shared_EntityNotExistsError({
      message: `Workflow ${workflowID} not exists`,
    });
  }

  async queryWorkflow(queryType: string, ...args: unknown[]): Promise<internal_Value> {
    const data = encodeArgs(this.GetDataConverter(), args);
    const blob = await this.queryHandler!(queryType, data);
    return newEncodedValue(blob, this.GetDataConverter());
  }

  setLastCompletionResult(result: unknown): void {
    const data = encodeArg(this.GetDataConverter(), result);
    this.workflowInfo!.lastCompletionResult = data;
  }

  setHeartbeatDetails(details: unknown): void {
    const data = encodeArg(this.GetDataConverter(), details);
    this.heartbeatDetails = data;
  }

  GetRegistry(): registry {
    return this.registry!;
  }

  GetWorkflowInterceptors(): internal_WorkflowInterceptorFactory[] {
    return this.workflowInterceptors;
  }

  GetFeatureFlags(): internal_FeatureFlags {
    return this.workerOptions.FeatureFlags;
  }

  async newTestActivityTaskHandler(taskList: string, dataConverter: internal_DataConverter): Promise<ActivityTaskHandler> {
    const wOptions = AugmentWorkerOptions(this.workerOptions);
    wOptions.DataConverter = dataConverter;

    const params = Object.setPrototypeOf(wOptions, workerExecutionParameters.prototype) as workerExecutionParameters;
    params.TaskList = new shared_TaskList({
      name: StringPtr(taskList),
      kind: TaskListKind.NORMAL
    });
    params.UserContext = wOptions.BackgroundActivityContext;
    params.WorkerStopChannel = this.workerStopChannel;

    ensureRequiredParams(params);

    if (params.UserContext == null) {
      params.UserContext = background();
    }

    if (this.sessionEnvironment == null) {
      this.sessionEnvironment = newTestSessionEnvironment(
        this,
        params,
        wOptions.MaxConcurrentSessionExecutionSize
      );
    }

    params.UserContext = withValue(
      params.UserContext,
      sessionEnvironmentContextKey,
      this.sessionEnvironment!
    );

    const registry = this.registry!;
    if ((await registry.getRegisteredActivities()).length === 0) {
      throw `no activity is registered for tasklist '${taskList}'`;
    }

    const getActivity = async (name: string): Promise<activity | undefined> => {
      const tlsa = this.testWorkflowEnvironmentShared!.taskListSpecificActivities![name];
      if (tlsa != null && !(taskList in (tlsa.taskLists ?? {}))) {
        return undefined;
      }

      const [registeredActivity, ok] = await registry.GetActivity(name);
      if (!ok) {
        return undefined;
      }

      const ae = new activityExecutor({
        name: registeredActivity.ActivityType().Name,
        fn: registeredActivity.GetFunction(),
        options: {
          Name: "",
          EnableShortName: false,
          DisableAlreadyRegisteredCheck: false,
          EnableAutoHeartbeat: false
        },
        path: ""
      });

      if (ae.name === sessionCreationActivityName) {
        ae.fn = sessionCreationActivityForTest;
      }
      if (ae.name === sessionCompletionActivityName) {
        ae.fn = sessionCompletionActivityForTest;
      }

      const result = Object.setPrototypeOf(ae, activityExecutorWrapper.prototype) as activityExecutorWrapper;
      result.env = this;
      return result;
    };

    return newActivityTaskHandlerWithCustomProvider(
      this.testWorkflowEnvironmentShared!.service!,
      params,
      registry,
      getActivity,
      RealClock()
    );
  }

  RequestCancelTimer(timerID: string): void {
    this.testWorkflowEnvironmentShared!.logger!.debug("RequestCancelTimer", { [tagTimerID]: timerID });
    const timerHandle = this.testWorkflowEnvironmentShared!.timers![timerID];
    const ok = timerID in this.testWorkflowEnvironmentShared!.timers!;
    if (!ok) {
      this.testWorkflowEnvironmentShared!.logger!.debug("RequestCancelTimer failed, TimerID not exists.", { [tagTimerID]: timerID });
      return;
    }

    delete this.testWorkflowEnvironmentShared!.timers![timerID];
    timerHandle!.timer!.Stop();
    timerHandle!.env!.postCallback(() => {
      timerHandle!.callback!(Buffer.alloc(0), NewCanceledError());
      if (timerHandle!.env!.testWorkflowEnvironmentShared!.onTimerCancelledListener != null) {
        timerHandle!.env!.testWorkflowEnvironmentShared!.onTimerCancelledListener!(timerID);
      }
    }, true);
  }

  executeChildWorkflowWithDelay(delayStart: number, params: executeWorkflowParams, callback: resultHandler, startedHandler: ((p0: internal_WorkflowExecution, p1: Error | null) => void | Promise<void>) | undefined): void {
    let childEnv: testWorkflowEnvironmentImpl;
    try {
      childEnv = this.newTestWorkflowEnvironmentForChild(params, callback, startedHandler!);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
      this.testWorkflowEnvironmentShared!.logger!.info(`ExecuteChildWorkflow failed: ${err.message}`);
      throw err;
    }

    this.testWorkflowEnvironmentShared!.logger!.info(`ExecuteChildWorkflow: ${params.workflowType!.Name}`);
    this.testWorkflowEnvironmentShared!.runningCount++;

    void (async () => {
      await childEnv.executeWorkflowInternal(delayStart, params.workflowType!.Name, params.input);
    })();
  }

  async CompleteActivity(taskToken: Buffer | undefined, result: unknown | undefined, err: Error | null): Promise<void> {
    if (taskToken == null) {
      throw new Error("nil task token provided");
    }

    let data: Buffer = Buffer.alloc(0);
    if (result != null) {
      data = encodeArg(this.GetDataConverter(), result);
    }

    const activityID = taskToken.toString();
    this.postCallback(async () => {
      const [activityHandle, ok] = this.getActivityHandle(activityID);
      if (!ok) {
        this.testWorkflowEnvironmentShared!.logger!.debug(
          "CompleteActivity: ActivityID not found, could be already completed or cancelled.",
          { [tagActivityID]: activityID },
        );
        return;
      }

      const request = convertActivityResultToRespondRequest(
        "test-identity",
        taskToken!,
        data,
        err,
        this.GetDataConverter(),
      );
      try {
        await this.handleActivityResult(
          activityID,
          request,
          activityHandle.activityType,
          this.GetDataConverter(),
        );
      } catch (error) {
        if (!(error instanceof Error)) {
          throw error;
        }
      }
    }, false);
  }

  autoFireNextTimer(): boolean {
    const timers = this.testWorkflowEnvironmentShared!.timers!;
    if (Object.keys(timers).length === 0) {
      return false;
    }

    let nextTimer!: testTimerHandle;
    for (const t of Object.values(timers)) {
      if (nextTimer == null) {
        nextTimer = t;
      } else if (
        t.mockTimeToFire < nextTimer.mockTimeToFire ||
        (t.mockTimeToFire === nextTimer.mockTimeToFire && t.timerID < nextTimer.timerID)
      ) {
        nextTimer = t;
      }
    }

    const fireTimer = (th: testTimerHandle): void => {
      const skipDuration =
        th.mockTimeToFire - this.testWorkflowEnvironmentShared!.mockClock!.Now();
      this.testWorkflowEnvironmentShared!.logger!.debug('Auto fire timer', {
        [tagTimerID]: th.timerID,
        TimerDuration: th.duration,
        TimeSkipped: skipDuration,
      });

      this.testWorkflowEnvironmentShared!.mockClock!.Add(skipDuration);
    };

    if (this.testWorkflowEnvironmentShared!.runningCount === 0) {
      if (nextTimer.wallTimer != null) {
        nextTimer.wallTimer.Stop();
        nextTimer.wallTimer = undefined;
      }
      fireTimer(nextTimer);
      return true;
    }

    const durationToFire =
      nextTimer.mockTimeToFire - this.testWorkflowEnvironmentShared!.mockClock!.Now();
    const wallTimeToFire =
      this.testWorkflowEnvironmentShared!.wallClock!.Now() + durationToFire;

    if (
      nextTimer.wallTimer != null &&
      nextTimer.wallTimeToFire < wallTimeToFire
    ) {
      return false;
    }

    if (nextTimer.wallTimer != null) {
      nextTimer.wallTimer.Stop();
    }

    const wallTimer = this.testWorkflowEnvironmentShared!.wallClock!.AfterFunc(
      durationToFire,
      () => {
        nextTimer.env!.postCallback(() => {
          const timerID = getStringID(nextTimer.timerID);
          if (timerID in this.testWorkflowEnvironmentShared!.timers!) {
            const timerHandle = this.testWorkflowEnvironmentShared!.timers![timerID];
            fireTimer(timerHandle);
          }
        }, true);
      },
    );

    nextTimer.wallTimeToFire = wallTimeToFire;
    nextTimer.wallTimer = wallTimer;

    return false;
  }

  async executeActivityWithOptions(activityOptions: activityOptions, activityFn: unknown, ...args: unknown[]): Promise<internal_Value> {
    const activityType = await getValidatedActivityFunction(activityFn, args, this.registry!);
    const input = encodeArgs(this.GetDataConverter(), args);
    const params = new executeActivityParams({
      activityOptions,
      ActivityType: activityType,
      Input: input,
      Header: this.testWorkflowEnvironmentShared!.header!,
    });

    const task = newTestActivityTask(
      defaultTestWorkflowID,
      defaultTestRunID,
      "0",
      defaultTestWorkflowTypeName,
      defaultTestDomainName,
      params,
    );

    task.heartbeatDetails = this.heartbeatDetails;

    const taskHandler = await this.newTestActivityTaskHandler(
      defaultTestTaskList,
      this.GetDataConverter(),
    );

    let result: unknown;
    try {
      result = await taskHandler.Execute(defaultTestTaskList, task);
    } catch (err) {
      if (!(err instanceof Error)) {
        throw err;
      }
      if (err === goErrDeadlineExceeded) {
        this.testWorkflowEnvironmentShared!.logger!.debug(
          `Activity ${task.activityType!.name ?? ""} timed out`,
        );
        throw NewTimeoutError(
          TimeoutType.START_TO_CLOSE,
          goErrDeadlineExceeded.message,
        );
      }
      const topLine = `activity for ${defaultTestTaskList} [panic]:`;
      const stackTrace = getStackTraceRaw(topLine, 4, 0);
      throw newPanicError(err.message, stackTrace);
    }

    if (result === ErrActivityResultPending) {
      throw ErrActivityResultPending;
    }

    if (result instanceof shared_RespondActivityTaskCanceledRequest) {
      const details = newEncodedValues(result.details!, this.GetDataConverter());
      throw NewCanceledError(details);
    }

    if (result instanceof shared_RespondActivityTaskFailedRequest) {
      const error = constructError(
        result.reason ?? "",
        result.details!,
        this.GetDataConverter(),
      );
      if (error != null) {
        throw error;
      }
      return undefined as unknown as internal_Value;
    }

    if (result instanceof shared_RespondActivityTaskCompletedRequest) {
      return newEncodedValue(result.result!, this.GetDataConverter());
    }

    throw new globalThis.Error(`unsupported respond type ${globalThis.String(result)}`);
  }

  RequestCancelActivity(activityID: string): void {
    const [handle, ok] = this.getActivityHandle(activityID);
    if (!ok) {
      this.testWorkflowEnvironmentShared!.logger!.debug(
        "RequestCancelActivity failed, Activity not exists or already completed.",
        { [tagActivityID]: activityID },
      );
      return;
    }
    const activityInfo = this.getActivityInfo(activityID, handle.activityType);
    this.testWorkflowEnvironmentShared!.logger!.debug(
      "RequestCancelActivity",
      { [tagActivityID]: activityID },
    );
    this.deleteHandle(activityID);
    this.postCallback(() => {
      handle.callback!(Buffer.alloc(0), NewCanceledError());
      if (this.testWorkflowEnvironmentShared!.onActivityCanceledListener != null) {
        this.testWorkflowEnvironmentShared!.onActivityCanceledListener!(activityInfo);
      }
    }, true);
  }

  async handleLocalActivityResult(result: localActivityResult): Promise<void> {
    const activityID = result.task!.activityID;
    const activityType = await getActivityFunctionName(this.registry!, result.task!.params!.ActivityFn!);
    const errText = result.err! != null ? result.err!.message : "<nil>";
    const resultText = (result.result ?? Buffer.alloc(0)).toString();
    this.testWorkflowEnvironmentShared!.logger!.debug(
      `handleLocalActivityResult: Err: ${errText}, Result: ${resultText}.`,
      { [tagActivityID]: activityID, [tagActivityType]: activityType },
    );

    const activityInfo = this.getActivityInfo(activityID, activityType);
    const localActivities = this.testWorkflowEnvironmentShared!.localActivities!;
    const task = localActivities[activityID];
    if (!(activityID in localActivities)) {
      this.testWorkflowEnvironmentShared!.logger!.debug(
        "handleLocalActivityResult: ActivityID not exists, could be already completed or cancelled.",
        { [tagActivityID]: activityID },
      );
      return;
    }

    delete localActivities[activityID];
    let encodedErr: Error | null = null;
    if (result.err! != null) {
      const [errReason, errDetails] = getErrorDetails(result.err!, this.GetDataConverter());
      encodedErr = constructError(errReason, errDetails, this.GetDataConverter());
    }

    const lar: localActivityResultWrapper = {
      err: encodedErr,
      result: result.result,
      backoff: noRetryBackoff,
      attempt: 0,
    };
    if (result.task!.retryPolicy != null && result.err! != null) {
      lar.backoff = getRetryBackoff(result, this.Now());
      lar.attempt = task.attempt;
    }

    await task.callback!(lar);
    if (this.testWorkflowEnvironmentShared!.onLocalActivityCompletedListener! != null) {
      if (result.err! != null) {
        await this.testWorkflowEnvironmentShared!.onLocalActivityCompletedListener!(activityInfo, undefined, result.err!);
      } else {
        await this.testWorkflowEnvironmentShared!.onLocalActivityCompletedListener!(
          activityInfo,
          newEncodedValue(result.result!, this.GetDataConverter()),
          null,
        );
      }
    }

    await this.startDecisionTask();
  }

  async RequestCancelLocalActivity(activityID: string): Promise<void> {
    const task = this.testWorkflowEnvironmentShared!.localActivities![activityID];
    const ok = activityID in this.testWorkflowEnvironmentShared!.localActivities!;
    if (!ok) {
      this.testWorkflowEnvironmentShared!.logger!.debug(
        "RequestCancelLocalActivity failed, LocalActivity not exists or already completed.",
        { [tagActivityID]: activityID },
      );
      return;
    }
    const activityInfo = this.getActivityInfo(
      activityID,
      await getActivityFunctionName(this.registry!, task.params!.ActivityFn),
    );
    this.testWorkflowEnvironmentShared!.logger!.debug(
      "RequestCancelLocalActivity",
      { [tagActivityID]: activityID },
    );
    delete this.testWorkflowEnvironmentShared!.localActivities![activityID];
    this.postCallback(() => {
      const lar: localActivityResultWrapper = {
        err: ErrCanceled,
        backoff: noRetryBackoff,
        attempt: 0,
      };
      task.callback!(lar);
      if (this.testWorkflowEnvironmentShared!.onLocalActivityCanceledListener != null) {
        this.testWorkflowEnvironmentShared!.onLocalActivityCanceledListener!(activityInfo);
      }
    }, true);
  }

  async handleActivityResult(activityID: string, result: unknown, activityType: string, dataConverter: internal_DataConverter): Promise<void> {
    const resultType =
      result == null
        ? "<nil>"
        : typeof result === "object" || typeof result === "function"
          ? (result as { constructor?: { name?: string } }).constructor?.name ?? typeof result
          : typeof result;
    this.testWorkflowEnvironmentShared!.logger!.debug(
      `handleActivityResult: ${resultType}.`,
      { [tagActivityID]: activityID, [tagActivityType]: activityType },
    );

    const activityInfo = this.getActivityInfo(activityID, activityType);
    if (result === ErrActivityResultPending) {
      if (this.testWorkflowEnvironmentShared!.onActivityCompletedListener != null) {
        this.testWorkflowEnvironmentShared!.onActivityCompletedListener!(
          activityInfo,
          undefined,
          ErrActivityResultPending,
        );
      }
      return;
    }

    const [activityHandle, ok] = this.getActivityHandle(activityID);
    if (!ok) {
      this.testWorkflowEnvironmentShared!.logger!.debug(
        "handleActivityResult: ActivityID not exists, could be already completed or cancelled.",
        { [tagActivityID]: activityID },
      );
      return;
    }

    delete this.testWorkflowEnvironmentShared!.activities![activityID];

    let blob: Buffer = Buffer.alloc(0);
    let err: Error | null = null;

    if (result instanceof shared_RespondActivityTaskCanceledRequest) {
      const details = newEncodedValues(result.details ?? Buffer.alloc(0), dataConverter);
      err = NewCanceledError(details);
      activityHandle.callback!(Buffer.alloc(0), err);
    } else if (result instanceof shared_RespondActivityTaskFailedRequest) {
      err = constructError(result.reason!, result.details ?? Buffer.alloc(0), dataConverter);
      activityHandle.callback!(Buffer.alloc(0), err);
    } else if (result instanceof shared_RespondActivityTaskCompletedRequest) {
      blob = result.result ?? Buffer.alloc(0);
      activityHandle.callback!(blob, null);
    } else {
      if (result === goErrDeadlineExceeded) {
        err = NewTimeoutError(TimeoutType.START_TO_CLOSE, goErrDeadlineExceeded.message);
        activityHandle.callback!(Buffer.alloc(0), err);
      } else {
        throw `unsupported respond type ${resultType}`;
      }
    }

    if (this.testWorkflowEnvironmentShared!.onActivityCompletedListener != null) {
      if (err != null) {
        this.testWorkflowEnvironmentShared!.onActivityCompletedListener!(activityInfo, undefined, err);
      } else {
        this.testWorkflowEnvironmentShared!.onActivityCompletedListener!(
          activityInfo,
          newEncodedValue(blob, dataConverter),
          null,
        );
      }
    }

    await this.startDecisionTask();
  }

  async UpsertSearchAttributes(attributes: Record<string, unknown>): Promise<void> {
    const mockMethod = mockMethodForUpsertSearchAttributes;
    if (mockMethod in this.testWorkflowEnvironmentShared!.expectedMockCalls!) {
      const args = [attributes];
      const mockRet = await this.testWorkflowEnvironmentShared!.mock!.MethodCalled(mockMethod, ...args);
      if (mockRet.length > 1) {
        throw "mock of UpsertSearchAttributes should return only one error";
      }
      if (mockRet.length === 1 && mockRet[0] != null) {
        throw mockRet[0] as Error;
      }
    }

    const attr = validateAndSerializeSearchAttributes(attributes);
    this.workflowInfo!.SearchAttributes = mergeSearchAttributes(
      this.workflowInfo!.SearchAttributes,
      attr,
    );
  }

  getMockRunFn(callWrapper: MockCallWrapper): (p0: unknown[]) => void | Promise<void> {
    this.testWorkflowEnvironmentShared!.expectedMockCalls![callWrapper.call!.Method] = {};
    return (args: unknown[]) => this.runBeforeMockCallReturns(callWrapper, args);
  }

  SignalExternalWorkflow(domainName: string, workflowID: string, runID: string, signalName: string, input: Buffer, arg: unknown, childWorkflowOnly: boolean, callback: resultHandler): void {
    const childHandle = this.testWorkflowEnvironmentShared!.runningWorkflows![workflowID];
    if (childHandle != null) {
      const childEnv = childHandle.env!;
      if (childEnv.isTestCompleted) {
        callback(Buffer.alloc(0), newUnknownExternalWorkflowExecutionError());
      } else {
        childEnv.signalHandler!(signalName, input);
        callback(Buffer.alloc(0), null);
      }
      childEnv.postCallback(() => {}, true);
      return;
    }

    if (childWorkflowOnly) {
      callback(Buffer.alloc(0), newUnknownExternalWorkflowExecutionError());
      return;
    }

    this.testWorkflowEnvironmentShared!.runningCount++;
    void (async () => {
      const args = [domainName, workflowID, runID, signalName, arg];
      const mockRet = await this.testWorkflowEnvironmentShared!.mock!.MethodCalled(
        mockMethodForSignalExternalWorkflow,
        ...args,
      );
      const m = new mockWrapper({
        name: mockMethodForSignalExternalWorkflow,
        fn: mockFnSignalExternalWorkflow,
      });
      let err: Error | null = null;
      const mockFn = m.getMockFn(mockRet);
      if (mockFn != null) {
        const executor = new activityExecutor({
          name: mockMethodForSignalExternalWorkflow,
          fn: mockFn,
        });
        try {
          await executor.ExecuteWithActualArgs(undefined, args);
        } catch (e) {
          if (!(e instanceof Error)) throw e;
          err = e;
        }
      } else {
        m.getMockValue(mockRet);
      }

      this.postCallback(() => {
        callback(Buffer.alloc(0), err);
        this.testWorkflowEnvironmentShared!.runningCount--;
      }, true);
    })();
  }

  async RequestCancelExternalWorkflow(domainName: string, workflowID: string, runID: string, callback: resultHandler): Promise<void> {
    if (this.workflowInfo!.WorkflowExecution.ID === workflowID) {
      await this.workflowCancelHandler!();
      if (this.isChildWorkflow() && this.testWorkflowEnvironmentShared!.onChildWorkflowCanceledListener != null) {
        this.postCallback(() => {
          this.testWorkflowEnvironmentShared!.onChildWorkflowCanceledListener!(this.workflowInfo!);
        }, false);
      }
      return;
    } else {
      const childHandle = this.testWorkflowEnvironmentShared!.runningWorkflows![workflowID];
      if (childHandle != null && !childHandle.handled) {
        if (!childHandle.params!.waitForCancellation) {
          await childHandle.env!.Complete(undefined, ErrCanceled);
        }
        const childEnv = childHandle.env!;
        this.postCallback(() => {
          callback(Buffer.alloc(0), null);
        }, true);
        await childEnv.cancelWorkflow(callback);
        return;
      }
    }

    this.testWorkflowEnvironmentShared!.runningCount++;
    void (async () => {
      const args = [domainName, workflowID, runID];
      const mockRet = await this.testWorkflowEnvironmentShared!.mock!.MethodCalled(
        mockMethodForRequestCancelExternalWorkflow,
        ...args,
      );
      const m = new mockWrapper({
        name: mockMethodForRequestCancelExternalWorkflow,
        fn: mockFnRequestCancelExternalWorkflow,
      });
      let err: Error | null = null;
      const mockFn = m.getMockFn(mockRet);
      if (mockFn != null) {
        const executor = new activityExecutor({
          name: mockMethodForRequestCancelExternalWorkflow,
          fn: mockFn,
        });
        try {
          await executor.ExecuteWithActualArgs(undefined, args);
        } catch (e) {
          if (!(e instanceof Error)) throw e;
          err = e;
        }
      } else {
        try {
          m.getMockValue(mockRet);
        } catch (e) {
          if (!(e instanceof Error)) throw e;
          err = e;
        }
      }
      this.postCallback(() => {
        callback(Buffer.alloc(0), err);
        this.testWorkflowEnvironmentShared!.runningCount--;
      }, true);
    })();
  }

  async getMockedVersion(mockedChangeID: string, changeID: string, minSupported: internal_Version, maxSupported: internal_Version): Promise<[internal_Version, boolean]> {
    const mockMethod = getMockMethodForGetVersion(mockedChangeID);
    if (!(mockMethod in this.testWorkflowEnvironmentShared!.expectedMockCalls!)) {
      return [DefaultVersion, false];
    }

    const args = [changeID, minSupported, maxSupported];
    const mockRet = await this.testWorkflowEnvironmentShared!.mock!.MethodCalled(mockMethod, ...args);
    const m = new mockWrapper({
      name: mockMethodForGetVersion,
      fn: mockFnGetVersion,
      isWorkflow: false,
    });

    const mockFn = m.getMockFn(mockRet);
    if (mockFn != null) {
      const executor = new activityExecutor({
        name: mockMethodForGetVersion,
        fn: mockFn,
        options: {
          Name: "",
          EnableShortName: false,
          DisableAlreadyRegisteredCheck: false,
          EnableAutoHeartbeat: false,
        },
        path: "",
      });
      const reflectValues = await executor.executeWithActualArgsWithoutParseResult(undefined, args);
      const actual = reflectValues[0];
      if (reflectValues.length !== 1 || typeof actual !== typeof DefaultVersion) {
        const value = actual instanceof Error
          ? actual.message
          : typeof (actual as { String?: unknown }).String === "function"
            ? (actual as { String(): string }).String()
            : globalThis.String(actual);
        throw new Error(`mock of GetVersion has incorrect return type, expected workflow.Version, but actual is ${actual == null ? "<nil>" : typeof actual} (${value})`);
      }
      return [actual as internal_Version, true];
    }

    const actual = mockRet[0];
    if (mockRet.length !== 1 || typeof actual !== typeof DefaultVersion) {
      const value = actual instanceof Error
        ? actual.message
        : typeof (actual as { String?: unknown }).String === "function"
          ? (actual as { String(): string }).String()
          : globalThis.String(actual);
      throw new Error(`mock of GetVersion has incorrect return type, expected workflow.Version, but actual is ${actual == null ? "<nil>" : typeof actual} (${value})`);
    }
    return [actual as internal_Version, true];
  }

  async Complete(result: Buffer | undefined, err: Error | null): Promise<void> {
    if (this.isTestCompleted) {
      this.testWorkflowEnvironmentShared!.logger!.debug("Workflow already completed.");
      return;
    }

    await this.workflowDef!.Close();

    if (err instanceof internal_CanceledError && this.workflowCancelHandler != null) {
      await this.workflowCancelHandler!();
    }

    const dc = this.GetDataConverter();

    if ((!this.isChildWorkflow() && !this.IsCron()) || this.isChildWorkflow()) {
      this.isTestCompleted = true;
    }

    if (err != null) {
      if (
        err instanceof internal_CanceledError ||
        err instanceof internal_ContinueAsNewError ||
        err instanceof internal_TimeoutError ||
        err instanceof shared_WorkflowExecutionAlreadyStartedError
      ) {
        this.testError = err;
      } else if (err instanceof workflowPanicError) {
        this.testError = newPanicError(err.value, err.stackTrace);
      } else {
        const [reason, details] = getErrorDetails(err, dc);
        this.testError = constructError(reason, details, dc);
      }
    } else {
      this.testResult = newEncodedValue(result!, dc);
    }

    if (this.isChildWorkflow() && !this.IsCron()) {
      this.doneChannel!.close();
    }

    if (this.isChildWorkflow()) {
      const childWorkflowID = this.workflowInfo!.WorkflowExecution.ID;
      const runningWorkflows = this.testWorkflowEnvironmentShared!.runningWorkflows!;
      const childWorkflowHandle = runningWorkflows[childWorkflowID];
      const childWorkflowHandleOk = childWorkflowID in runningWorkflows;

      if (childWorkflowHandleOk && !childWorkflowHandle!.handled) {
        childWorkflowHandle!.handled = true;

        if (await childWorkflowHandle!.rerun(true)) {
          return;
        }

        this.parentEnv!.postCallback(async () => {
          childWorkflowHandle!.err = this.testError!;
          await childWorkflowHandle!.callback!(result!, this.testError!);
          if (this.testWorkflowEnvironmentShared!.onChildWorkflowCompletedListener != null) {
            await this.testWorkflowEnvironmentShared!.onChildWorkflowCompletedListener!(
              this.workflowInfo!,
              this.testResult!,
              this.testError!
            );
          }
        }, true);
      }
    } else {
      if (this.IsCron()) {
        const workflowID = this.workflowInfo!.WorkflowExecution.ID;
        const runningWorkflows = this.testWorkflowEnvironmentShared!.runningWorkflows!;
        const workflowHandle = runningWorkflows[workflowID];
        const workflowHandleOk = workflowID in runningWorkflows;

        if (workflowHandleOk) {
          if (await workflowHandle!.rerun(false)) {
            return;
          }
        }
      }
    }

    this.isTestCompleted = true;
  }

}

export class testReporter {
  constructor(init?: Partial<testReporter>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  logger?: Logger;

  Errorf(format: string, ...args: unknown[]): void {
    this.logger!.error(format, ...args);
  }

  Fatalf(format: string, ...args: unknown[]): void {
    this.logger!.error(format, ...args);
  }

}

export function getRetryBackoffFromThriftRetryPolicy(tp: shared_IRetryPolicy | undefined, attempt: number, errReason: string, now: number, expireTime: number): number {
    if (tp == null) {
        return noRetryBackoff;
    }

    const p = convertFromThriftRetryPolicy(tp);
    return getRetryBackoffWithNowTime(p!, attempt, errReason, now, expireTime);
}

export function newTestActivityTask(workflowID: string, runID: string, activityID: string, workflowTypeName: string, domainName: string, params: executeActivityParams): shared_IPollForActivityTaskResponse {
    const task = new shared_PollForActivityTaskResponse({
        workflowExecution: new shared_WorkflowExecution({
            workflowId: StringPtr(workflowID),
            runId: StringPtr(runID),
        }),
        activityId: StringPtr(activityID),
        taskToken: Buffer.from(activityID),
        activityType: new shared_ActivityType({
            name: StringPtr(params.ActivityType.Name),
        }),
        input: params.Input,
        scheduledTimestamp: new Int64(Int64Ptr(Date.now() * 1_000_000)!),
        scheduleToCloseTimeoutSeconds: Int32Ptr(params.activityOptions.ScheduleToCloseTimeoutSeconds),
        scheduledTimestampOfThisAttempt: new Int64(Int64Ptr(Date.now() * 1_000_000)!),
        startedTimestamp: new Int64(Int64Ptr(Date.now() * 1_000_000)!),
        startToCloseTimeoutSeconds: Int32Ptr(params.activityOptions.StartToCloseTimeoutSeconds),
        heartbeatTimeoutSeconds: Int32Ptr(params.activityOptions.HeartbeatTimeoutSeconds),
        attempt: Int32Ptr(0),
        workflowType: new shared_WorkflowType({
            name: StringPtr(workflowTypeName),
        }),
        workflowDomain: StringPtr(domainName),
        header: params.Header!,
    });
    return task;
}

export function getMockMethodForGetVersion(changeID: string): string {
  return `${mockMethodForGetVersion}_${changeID}`;
}

export function getStringID(intID: number): string {
	return intID.toString();
}

/**
 * function signature for mock SignalExternalWorkflow
 */
export function mockFnSignalExternalWorkflow(domainName: string, workflowID: string, runID: string, signalName: string, arg: unknown): void {
  return;
}

/**
 * function signature for mock RequestCancelExternalWorkflow
 */
export function mockFnRequestCancelExternalWorkflow(domainName: string, workflowID: string, runID: string): void {
  return;
}

/**
 * function signature for mock GetVersion
 */
export function mockFnGetVersion(changeID: string, minSupported: internal_Version, maxSupported: internal_Version): internal_Version {
  return -1;
}

export function newTestWorkflowEnvironmentImpl(s: WorkflowTestSuite, parentRegistry: registry | undefined): testWorkflowEnvironmentImpl {
  let r: registry;
  if (parentRegistry == null) {
    r = newRegistry();
    r.RegisterActivityWithOptions(sessionCreationActivity, {
      Name: sessionCreationActivityName,
      DisableAlreadyRegisteredCheck: false,
      EnableAutoHeartbeat: false,
      EnableShortName: false,
    });
    r.RegisterActivityWithOptions(sessionCompletionActivity, {
      Name: sessionCompletionActivityName,
      DisableAlreadyRegisteredCheck: false,
      EnableAutoHeartbeat: false,
      EnableShortName: false,
    });
  } else {
    r = parentRegistry;
  }

  const shared: testWorkflowEnvironmentShared = {
    locker: new Mutex(),
    testSuite: s,
    taskListSpecificActivities: {},
    logger: s.logger,
    metricsScope: NewTaggedScope(s.scope),
    mockClock: NewMockClock(),
    wallClock: RealClock(),
    timers: {},
    activities: {},
    localActivities: {},
    runningWorkflows: {},
    callbackChannel: new Channel<testCallbackHandle>(1000),
    testTimeout: 3 * Second,
    expectedMockCalls: {},
    cronMaxIterations: -1,
    counterID: 0,
    runningCount: 0,
    startTime: 0,
  };

  const env = new testWorkflowEnvironmentImpl({
    testWorkflowEnvironmentShared: shared,
    workflowInfo: new WorkflowInfo({
      Domain: defaultTestDomain,
      WorkflowExecution: {
        ID: defaultTestWorkflowID,
        RunID: defaultTestRunID,
      },
      WorkflowType: {
        Name: workflowTypeNotSpecified,
        Path: "",
      },
      TaskListName: defaultTestTaskList,
      ExecutionStartToCloseTimeoutSeconds: 1,
      TaskStartToCloseTimeoutSeconds: 1,
      Attempt: 0,
      DecisionStartedEventID: 0,
      HistoryBytesServer: 0,
      HistoryCount: 0,
      OriginalRunId: "",
      TotalHistoryBytes: 0,
      lastCompletionResult: Buffer.alloc(0),
    }),
    registry: r,
    changeVersions: {},
    openSessions: {},
    doneChannel: new Channel<{}>(),
    workerStopChannel: new Channel<{}>(),
    cronIterations: 0,
    cronOverlapPolicy: 0,
    cronSchedule: "",
    executionTimeout: 0,
    heartbeatDetails: Buffer.alloc(0),
    isTestCompleted: false,
    workerOptions: new WorkerOptions(),
    workflowInput: Buffer.alloc(0),
    workflowInterceptors: [],
  });

  env.setStartTime(Date.now() * 1_000_000);

  const testWorkflowHandleLocal = new testWorkflowHandle({
    env,
    callback: (_result: Buffer, _err: Error | null): void => {},
    handled: false,
  });
  if ((env.workflowInfo!.CronSchedule ?? "").length > 0) {
    testWorkflowHandleLocal.params!.cronSchedule = env.workflowInfo!.CronSchedule!;
  }
  env.testWorkflowEnvironmentShared!.runningWorkflows![env.workflowInfo!.WorkflowExecution.ID] = testWorkflowHandleLocal;

  if (env.testWorkflowEnvironmentShared!.logger == null) {
    env.testWorkflowEnvironmentShared!.logger = NoopLogger();
  }
  if (env.testWorkflowEnvironmentShared!.metricsScope == null) {
    env.testWorkflowEnvironmentShared!.metricsScope = NewTaggedScope(s.scope);
  }
  env.testWorkflowEnvironmentShared!.ctxProps = s.ctxProps;
  env.testWorkflowEnvironmentShared!.header = s.header!;

  const mockCtrl = NewGoMockController(new testReporter({ logger: env.testWorkflowEnvironmentShared!.logger }));
  const mockService = NewGoMockClient(mockCtrl);

  const mockHeartbeatFn = (
    _c: Context,
    request: { taskToken?: Buffer; details?: Buffer },
    ..._opts: unknown[]
  ): void => {
    const activityID = (request.taskToken ?? Buffer.alloc(0)).toString();
    const [activityHandle, ok] = env.getActivityHandle(activityID);
    if (!ok) {
      env.testWorkflowEnvironmentShared!.logger!.debug(
        "RecordActivityTaskHeartbeat: ActivityID not found, could be already completed or cancelled.",
        { [tagActivityID]: activityID },
      );
      throw new shared_EntityNotExistsError({});
    }

    activityHandle.heartbeatDetails = request.details;
    const activityInfo = env.getActivityInfo(activityID, activityHandle.activityType);
    env.postCallback(() => {
      const listener = env.testWorkflowEnvironmentShared!.onActivityHeartbeatListener;
      if (listener != null) {
        listener(activityInfo, newEncodedValues(request.details ?? Buffer.alloc(0), env.GetDataConverter()));
      }
    }, false);

    env.testWorkflowEnvironmentShared!.logger!.debug("RecordActivityTaskHeartbeat", {
      [tagActivityID]: activityID,
    });
  };

  const callOptions: unknown[] = [];
  const yarpcCallOptions = getYarpcCallOptions({
    AutoforwardingEnabled: false,
    EphemeralTaskListsEnabled: false,
    MetricEmitMode: 0,
    PollerAutoScalerEnabled: false,
    WorkflowExecutionAlreadyCompletedErrorEnabled: false,
  });
  for (const _ of yarpcCallOptions) {
    callOptions.push(MockAny());
  }

  const em = mockService
    .EXPECT()
    .RecordActivityTaskHeartbeat(MockAny(), MockAny(), ...callOptions)
    .Return(new shared_RecordActivityTaskHeartbeatResponse({ cancelRequested: BoolPtr(false) }), undefined);

  em.Do((
    ctx: Context,
    request: { taskToken?: Buffer; details?: Buffer },
    ...opts: unknown[]
  ) => {
    mockHeartbeatFn(ctx, request, ...opts);
  }).AnyTimes();

  env.testWorkflowEnvironmentShared!.service = mockService;

  env.workerOptions.FeatureFlags = {
    AutoforwardingEnabled: false,
    EphemeralTaskListsEnabled: true,
    MetricEmitMode: 0,
    PollerAutoScalerEnabled: false,
    WorkflowExecutionAlreadyCompletedErrorEnabled: false,
  };
  if (env.workerOptions.Logger == null) {
    env.workerOptions.Logger = env.testWorkflowEnvironmentShared!.logger;
  }
  if (env.workerOptions.MetricsScope == null) {
    env.workerOptions.MetricsScope = env.testWorkflowEnvironmentShared!.metricsScope;
  }
  if (env.workerOptions.DataConverter == null) {
    env.workerOptions.DataConverter = getDefaultDataConverter();
  }
  if (env.workerOptions.ContextPropagators.length === 0) {
    env.workerOptions.ContextPropagators = env.testWorkflowEnvironmentShared!.ctxProps!;
  }

  return env;
}

export function newTestSessionEnvironment(testWorkflowEnvironment: testWorkflowEnvironmentImpl, params: workerExecutionParameters, concurrentSessionExecutionSize: number): testSessionEnvironmentImpl {
  let resourceID = params.SessionResourceID;
  if (resourceID === "") {
    resourceID = "testResourceID";
  }
  if (concurrentSessionExecutionSize === 0) {
    concurrentSessionExecutionSize = defaultMaxConcurrentSessionExecutionSize;
  }

  const result = Object.setPrototypeOf(
    newSessionEnvironment(resourceID, concurrentSessionExecutionSize),
    testSessionEnvironmentImpl.prototype,
  ) as testSessionEnvironmentImpl;
  result.testWorkflowEnvironment = testWorkflowEnvironment;
  return result;
}

export { activityExecutorWrapper } from './internal_worker.js';

export { testSessionEnvironmentImpl } from './session.js';

export { workflowExecutorWrapper } from './internal_worker.js';

export const defaultTestDomain = "default-test-domain";

export const defaultTestDomainName = "default-test-domain-name";

export const defaultTestRunID = "default-test-run-id";

export const defaultTestTaskList = "default-test-tasklist";

export const defaultTestWorkflowID = "default-test-workflow-id";

export const defaultTestWorkflowTypeName = "default-test-workflow-type-name";

export const workflowTypeNotSpecified = "workflow-type-not-specified";
