// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { internal_ActivityOptions, internal_LocalActivityOptions } from './activity.js';
import { internal_ParentClosePolicy, internal_RetryPolicy, internal_WorkflowIDReusePolicy } from './client.js';
import { internal_Context, WithValue } from './context.js';
import { internal_DataConverter, internal_Value, getDefaultDataConverter } from './encoded.js';
import { internal_ContextPropagator, NewHeaderWriter } from './headers.js';
import { Second } from './runtime/time.js';
import type { Scope } from './runtime/tally.js';
import { Ref } from './runtime/ref.js';
import { IHeader as shared_IHeader, Header as shared_Header } from '../generated/thrift/cadence-idl/com/uber/cadence/Header.js';
import { IMemo as shared_IMemo } from '../generated/thrift/cadence-idl/com/uber/cadence/Memo.js';
import { IRetryPolicy as shared_IRetryPolicy } from '../generated/thrift/cadence-idl/com/uber/cadence/RetryPolicy.js';
import { ISearchAttributes as shared_ISearchAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/SearchAttributes.js';
import { NewCanceledError, ErrNoData } from './error.js';
import { getState, getWorkflowEnvironment, getWorkflowInterceptor, getWorkflowEnvOptions, setWorkflowEnvOptionsIfNotExist, channelImpl, getDataConverterFromWorkflowContext, futureImpl, selectorImpl, getRegistryFromWorkflowContext, localActivityFnContextKey, waitGroupImpl } from './internal_workflow.js';
import { getWorkflowFunctionName, decodeArg, getBinaryChecksum, encodeArg, getActivityFunctionName } from './internal_worker.js';
import { convertFromThriftRetryPolicy, convertRetryPolicy } from './convert.js';
import { getActivityOptions, activity, setActivityParametersIfNotExist, getLocalActivityOptions, setLocalActivityParametersIfNotExist } from './internal_activity.js';
import { getGlobalRegistry } from './registry.js';
import { Int32Ceil, StringPtr, Int32Ptr } from './common/convert.js';
import { Logger } from 'winston';
import { QueryFailedError } from '../errors/idl_errors.js';

/**
 * RegisterWorkflowOptions consists of options for registering a workflow
 */
export interface RegisterWorkflowOptions {
  Name: string;
  EnableShortName: boolean;
  DisableAlreadyRegisteredCheck: boolean;
}

export interface RegistryWorkflowInfo {
  WorkflowType(): internal_WorkflowType;
  GetFunction(): unknown;
}

/**
 * WorkflowExecutionAsync Details.
 */
export interface WorkflowExecutionAsync {
  ID: string;
}

/**
 * getVersionConfig holds the configuration for GetVersion
 */
export interface getVersionConfig {
  CustomVersion?: internal_Version;
  UseMinVersion: boolean;
}

/**
 * Bugports allows opt-in enabling of older, possibly buggy behavior, primarily intended to allow temporarily
 * emulating old behavior until a fix is deployed.
 * By default, bugs (especially rarely-occurring ones) are fixed and all users are opted into the new behavior.
 * Back-ported buggy behavior *may* be available via these flags.
 * 
 * Fields in here are NOT guaranteed to be stable.  They will almost certainly be removed in the next major
 * release, and might be removed earlier if a need arises, e.g. if the historical behavior causes too much of an
 * increase in code complexity.
 * 
 * See each individual field for details.
 * 
 * Bugports are always deprecated and may be removed in future versions.
 * Generally speaking they will *likely* remain in place for one minor version, and then they may be removed to
 * allow cleaning up the additional code complexity that they cause.
 * 
 * DEPRECATED: All bugports are always deprecated and may be removed at any time.
 */
export interface internal_Bugports {
  StartChildWorkflowsOnCanceledContext: boolean;
}

export interface internal_Channel {
  Receive(ctx: internal_Context, valuePtr: unknown): Promise<boolean>;
  ReceiveAsync(valuePtr: unknown): boolean;
  ReceiveAsyncWithMoreFlag(valuePtr: unknown): [boolean, boolean];
  Send(ctx: internal_Context, v: unknown): Promise<void>;
  SendAsync(v: unknown): boolean;
  Close(): void;
}

export interface internal_ChildWorkflowFuture extends internal_Future {
  GetChildWorkflowExecution(): internal_Future;
  SignalChildWorkflow(ctx: internal_Context, signalName: string, data: unknown): Promise<internal_Future>;
}

/**
 * ChildWorkflowOptions stores all child workflow specific parameters that will be stored inside of a Context.
 * The current timeout resolution implementation is in seconds and uses math.Ceil(d.Seconds()) as the duration. But is
 * subjected to change in the future.
 */
export interface internal_ChildWorkflowOptions {
  Domain: string;
  WorkflowID: string;
  TaskList: string;
  ExecutionStartToCloseTimeout: number;
  TaskStartToCloseTimeout: number;
  WaitForCancellation: boolean;
  WorkflowIDReusePolicy: internal_WorkflowIDReusePolicy;
  RetryPolicy?: internal_RetryPolicy;
  CronSchedule: string;
  Memo?: Record<string, unknown>;
  SearchAttributes?: Record<string, unknown>;
  ParentClosePolicy: internal_ParentClosePolicy;
  Bugports: internal_Bugports;
}

export interface internal_Future {
  Get(ctx: internal_Context, valuePtr: unknown): Promise<void>;
  IsReady(): boolean;
}

export interface internal_GetVersionOption {
  apply(p0: getVersionConfig): void;
}

export interface internal_Selector {
  AddReceive(c: internal_Channel, f: (p0: internal_Channel, p1: boolean) => void | Promise<void>): internal_Selector;
  AddSend(c: internal_Channel, v: unknown, f: () => void | Promise<void>): internal_Selector;
  AddFuture(future: internal_Future, f: (p0: internal_Future) => void | Promise<void>): internal_Selector;
  AddDefault(f: () => void | Promise<void>): void;
  Select(ctx: internal_Context): Promise<void>;
}

export interface internal_Settable {
  Set(value: unknown, err: Error | null): void;
  SetValue(value: unknown): void;
  SetError(err: Error | null): void;
  Chain(future: internal_Future): void;
}

/**
 * Version represents a change version. See GetVersion call.
 */
export type internal_Version = number;

export interface internal_WaitGroup {
  Add(delta: number): void;
  Done(): void;
  Wait(ctx: internal_Context): Promise<void>;
}

/**
 * WorkflowExecution Details.
 */
export interface internal_WorkflowExecution {
  ID: string;
  RunID: string;
}

/**
 * WorkflowType identifies a workflow type.
 */
export interface internal_WorkflowType {
  Name: string;
  Path: string;
}

/**
 * EncodedValue is type alias used to encapsulate/extract encoded result from workflow/activity.
 */
export class EncodedValue implements internal_Value {
  constructor(init?: Partial<EncodedValue>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  value?: Buffer;

  dataConverter?: internal_DataConverter;

  Get(valuePtr: unknown): void {
    if (!this.HasValue()) {
      throw ErrNoData;
    }
    decodeArg(this.dataConverter!, this.value!, valuePtr);
  }

  HasValue(): boolean {
    return this.value != null;
  }

}

export class needRetryError extends globalThis.Error {
  constructor(init?: Partial<needRetryError>) {
    super(typeof init?.message === "string" ? init.message : "");
    this.name = "needRetryError";
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
    if (typeof init?.message !== "string") {
      this.message = this.Error();
    }
  }

  Backoff: number = 0;

  Attempt: number = 0;

  Error(): string {
    return `Retry backoff: ${this.Backoff}, Attempt: ${this.Attempt}`;
  }

}

/**
 * WorkflowInfo information about currently executing workflow
 */
export class WorkflowInfo {
  constructor(init?: Partial<WorkflowInfo>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  WorkflowExecution: internal_WorkflowExecution = { ID: "", RunID: "" };

  OriginalRunId: string = "";

  WorkflowType: internal_WorkflowType = { Name: "", Path: "" };

  TaskListName: string = "";

  ExecutionStartToCloseTimeoutSeconds: number = 0;

  TaskStartToCloseTimeoutSeconds: number = 0;

  Domain: string = "";

  Attempt: number = 0;

  lastCompletionResult: Buffer = Buffer.alloc(0);

  CronSchedule?: string;

  ContinuedExecutionRunID?: Ref<string>;

  ParentWorkflowDomain?: Ref<string>;

  ParentWorkflowExecution?: internal_WorkflowExecution;

  Memo?: shared_IMemo;

  SearchAttributes?: shared_ISearchAttributes;

  BinaryChecksum?: string;

  DecisionStartedEventID: number = 0;

  RetryPolicy?: shared_IRetryPolicy;

  TotalHistoryBytes: number = 0;

  HistoryBytesServer: number = 0;

  HistoryCount: number = 0;

  async GetBinaryChecksum(): Promise<string> {
    if (this.BinaryChecksum == null) {
      return await getBinaryChecksum();
    }
    return this.BinaryChecksum!;
  }

  GetDecisionStartedEventID(): number {
    return this.DecisionStartedEventID;
  }

}

/**
 * customVersionOption forces GetVersion to return a specific version
 */
export class customVersionOption implements internal_GetVersionOption {
  constructor(public value?: internal_Version) {}

  apply(config: getVersionConfig): void {
    const version = this.value;
    config.CustomVersion = version;
  }

}

/**
 * useMinVersionOption forces GetVersion to return minSupported version
 */
export class useMinVersionOption implements internal_GetVersionOption {
  constructor(init?: Partial<useMinVersionOption>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  apply(config: getVersionConfig): void {
    config.UseMinVersion = true;
  }

}

/**
 * RegisterWorkflow - registers a workflow function with the framework.
 * The public form is: workflow.Register(...)
 * A workflow takes a cadence context and input and returns a (result, error) or just error.
 * Examples:
 * 
 * 	func sampleWorkflow(ctx workflow.Context, input []byte) (result []byte, err error)
 * 	func sampleWorkflow(ctx workflow.Context, arg1 int, arg2 string) (result []byte, err error)
 * 	func sampleWorkflow(ctx workflow.Context) (result []byte, err error)
 * 	func sampleWorkflow(ctx workflow.Context, arg1 int) (result string, err error)
 * 
 * Serialization of all primitive types, structures is supported ... except channels, functions, variadic, unsafe pointer.
 * This method calls panic if workflowFunc doesn't comply with the expected format.
 * Deprecated: Global workflow registration methods are replaced by equivalent Worker instance methods.
 * This method is kept to maintain backward compatibility and should not be used.
 */
export async function RegisterWorkflow(workflowFunc: unknown): Promise<void> {
  await RegisterWorkflowWithOptions(workflowFunc, {
    DisableAlreadyRegisteredCheck: false,
    EnableShortName: false,
    Name: "",
  });
}

/**
 * RegisterWorkflowWithOptions registers the workflow function with options.
 * The public form is: workflow.RegisterWithOptions(...)
 * The user can use options to provide an external name for the workflow or leave it empty if no
 * external name is required. This can be used as
 * 
 * 	workflow.RegisterWithOptions(sampleWorkflow, RegisterWorkflowOptions{})
 * 	workflow.RegisterWithOptions(sampleWorkflow, RegisterWorkflowOptions{Name: "foo"})
 * 
 * A workflow takes a cadence context and input and returns a (result, error) or just error.
 * Examples:
 * 
 * 	func sampleWorkflow(ctx workflow.Context, input []byte) (result []byte, err error)
 * 	func sampleWorkflow(ctx workflow.Context, arg1 int, arg2 string) (result []byte, err error)
 * 	func sampleWorkflow(ctx workflow.Context) (result []byte, err error)
 * 	func sampleWorkflow(ctx workflow.Context, arg1 int) (result string, err error)
 * 
 * Serialization of all primitive types, structures is supported ... except channels, functions, variadic, unsafe pointer.
 * This method calls panic if workflowFunc doesn't comply with the expected format or tries to register the same workflow
 * type name twice. Use workflow.RegisterOptions.DisableAlreadyRegisteredCheck to allow multiple registrations.
 * Deprecated: Global workflow registration methods are replaced by equivalent Worker instance methods.
 * This method is kept to maintain backward compatibility and should not be used.
 */
export async function RegisterWorkflowWithOptions(workflowFunc: unknown, opts: RegisterWorkflowOptions): Promise<void> {
  const registry = getGlobalRegistry();
  await registry.RegisterWorkflowWithOptions(workflowFunc, opts);
}

/**
 * GetRegisteredWorkflowTypes returns the registered workflow function/alias names.
 * The public form is: workflow.GetRegisteredWorkflowTypes(...)
 */
export async function GetRegisteredWorkflowTypes(): Promise<string[]> {
  const registry = getGlobalRegistry();
  return await registry.GetRegisteredWorkflowTypes();
}

/**
 * Await blocks the calling thread until condition() returns true
 * Returns CanceledError if the ctx is canceled.
 */
export async function Await(ctx: internal_Context, condition: () => boolean): Promise<void> {
  const state = getState(ctx);
  try {
    while (!condition()) {
      const doneCh = ctx.Done();
      if (doneCh != null) {
        const [, more] = doneCh.ReceiveAsyncWithMoreFlag(null);
        if (!more) {
          throw NewCanceledError("Await context cancelled");
        }
      }
      await state.yield("Await");
    }
  } finally {
    state.unblocked();
  }
}

/**
 * NewChannel create new Channel instance
 */
export function NewChannel(ctx: internal_Context): internal_Channel {
  const state = getState(ctx);
  state.dispatcher!.channelSequence++;
  return NewNamedChannel(ctx, `chan-${state.dispatcher!.channelSequence}`);
}

/**
 * NewNamedChannel create new Channel instance with a given human readable name.
 * Name appears in stack traces that are blocked on this channel.
 */
export function NewNamedChannel(ctx: internal_Context, name: string): internal_Channel {
  const env = getWorkflowEnvironment(ctx);
  return new channelImpl({
    blockedReceives: [],
    blockedSends: [],
    buffer: [],
    closed: false,
    size: 0,
    name,
    dataConverter: getDataConverterFromWorkflowContext(ctx),
    env,
  });
}

/**
 * NewBufferedChannel create new buffered Channel instance
 */
export function NewBufferedChannel(ctx: internal_Context, size: number): internal_Channel {
  const env = getWorkflowEnvironment(ctx);
  return new channelImpl({
    blockedReceives: [],
    blockedSends: [],
    buffer: [],
    closed: false,
    name: "",
    size,
    dataConverter: getDataConverterFromWorkflowContext(ctx),
    env,
  });
}

/**
 * NewNamedBufferedChannel create new BufferedChannel instance with a given human readable name.
 * Name appears in stack traces that are blocked on this Channel.
 */
export function NewNamedBufferedChannel(ctx: internal_Context, name: string, size: number): internal_Channel {
  const env = getWorkflowEnvironment(ctx);
  return new channelImpl({
    name,
    size,
    dataConverter: getDataConverterFromWorkflowContext(ctx),
    env,
    blockedReceives: [],
    blockedSends: [],
    buffer: [],
    closed: false,
  });
}

/**
 * NewSelector creates a new Selector instance.
 */
export function NewSelector(ctx: internal_Context): internal_Selector {
  const state = getState(ctx);
  state.dispatcher!.selectorSequence++;
  return NewNamedSelector(ctx, `selector-${state.dispatcher!.selectorSequence}`);
}

/**
 * NewNamedSelector creates a new Selector instance with a given human readable name.
 * Name appears in stack traces that are blocked on this Selector.
 */
export function NewNamedSelector(ctx: internal_Context, name: string): internal_Selector {
  return new selectorImpl({ cases: [], name });
}

/**
 * NewWaitGroup creates a new WaitGroup instance.
 */
export function NewWaitGroup(ctx: internal_Context): internal_WaitGroup {
  const [f, s] = NewFuture(ctx);
  return new waitGroupImpl({ future: f, settable: s, n: 0, waiting: false });
}

/**
 * Go creates a new coroutine. It has similar semantic to goroutine in a context of the workflow.
 */
export function Go(ctx: internal_Context, f: (p0: internal_Context) => void | Promise<void>): void {
  const state = getState(ctx);
  state.dispatcher!.newCoroutine(ctx, f);
}

/**
 * GoNamed creates a new coroutine with a given human readable name.
 * It has similar semantic to goroutine in a context of the workflow.
 * Name appears in stack traces that are blocked on this Channel.
 */
export function GoNamed(ctx: internal_Context, name: string, f: (p0: internal_Context) => void | Promise<void>): void {
  const state = getState(ctx);
  state.dispatcher?.newNamedCoroutine(ctx, name, f);
}

/**
 * NewFuture creates a new future as well as associated Settable that is used to set its value.
 */
export function NewFuture(ctx: internal_Context): [internal_Future, internal_Settable] {
  const impl = new futureImpl({ channel: NewChannel(ctx) as channelImpl, chained: [], ready: false });
  return [impl, impl];
}

/**
 * ExecuteActivity requests activity execution in the context of a workflow.
 * Context can be used to pass the settings for this activity.
 * For example: task list that this need to be routed, timeouts that need to be configured.
 * Use ActivityOptions to pass down the options.
 * 
 * 	 ao := ActivityOptions{
 * 		    TaskList: "exampleTaskList",
 * 		    ScheduleToStartTimeout: 10 * time.Second,
 * 		    StartToCloseTimeout: 5 * time.Second,
 * 		    ScheduleToCloseTimeout: 10 * time.Second,
 * 		    HeartbeatTimeout: 0,
 * 		}
 * 		ctx := WithActivityOptions(ctx, ao)
 * 
 * Or to override a single option
 * 
 * 	ctx := WithTaskList(ctx, "exampleTaskList")
 * 
 * Input activity is either an activity name (string) or a function representing an activity that is getting scheduled.
 * Input args are the arguments that need to be passed to the scheduled activity.
 * 
 * If the activity failed to complete then the future get error would indicate the failure, and it can be one of
 * CustomError, TimeoutError, CanceledError, PanicError, GenericError.
 * You can cancel the pending activity using context(workflow.WithCancel(ctx)) and that will fail the activity with
 * error CanceledError.
 * 
 * ExecuteActivity returns Future with activity result or failure.
 */
export async function ExecuteActivity(ctx: internal_Context, activity: unknown, ...args: unknown[]): Promise<internal_Future> {
  const i = getWorkflowInterceptor(ctx);
  const registry = getRegistryFromWorkflowContext(ctx);
  const activityType = await getActivityFunctionName(registry, activity);
  return await i.ExecuteActivity(ctx, activityType, ...args);
}

/**
 * ExecuteLocalActivity requests to run a local activity. A local activity is like a regular activity with some key
 * differences:
 * * Local activity is scheduled and run by the workflow worker locally.
 * * Local activity does not need Cadence server to schedule activity task and does not rely on activity worker.
 * * No need to register local activity.
 * * The parameter activity to ExecuteLocalActivity() must be a function.
 * * Local activity is for short living activities (usually finishes within seconds).
 * * Local activity cannot heartbeat.
 * 
 * Context can be used to pass the settings for this local activity.
 * For now there is only one setting for timeout to be set:
 * 
 * 	 lao := LocalActivityOptions{
 * 		    ScheduleToCloseTimeout: 5 * time.Second,
 * 		}
 * 		ctx := WithLocalActivityOptions(ctx, lao)
 * 
 * The timeout here should be relative shorter than the DecisionTaskStartToCloseTimeout of the workflow. If you need a
 * longer timeout, you probably should not use local activity and instead should use regular activity. Local activity is
 * designed to be used for short living activities (usually finishes within seconds).
 * 
 * Input args are the arguments that will to be passed to the local activity. The input args will be hand over directly
 * to local activity function without serialization/deserialization because we don't need to pass the input across process
 * boundary. However, the result will still go through serialization/deserialization because we need to record the result
 * as history to cadence server so if the workflow crashes, a different worker can replay the history without running
 * the local activity again.
 * 
 * If the activity failed to complete then the future get error would indicate the failure, and it can be one of
 * CustomError, TimeoutError, CanceledError, PanicError, GenericError.
 * You can cancel the pending activity by cancel the context(workflow.WithCancel(ctx)) and that will fail the activity
 * with error CanceledError.
 * 
 * ExecuteLocalActivity returns Future with local activity result or failure.
 */
export async function ExecuteLocalActivity(ctx: internal_Context, activity: unknown, ...args: unknown[]): Promise<internal_Future> {
  const i = getWorkflowInterceptor(ctx);
  const env = getWorkflowEnvironment(ctx);
  const activityType = await getActivityFunctionName(env.GetRegistry(), activity);
  ctx = WithValue(ctx, localActivityFnContextKey, activity);
  return await i.ExecuteLocalActivity(ctx, activityType, ...args);
}

/**
 * ExecuteChildWorkflow requests child workflow execution in the context of a workflow.
 * Context can be used to pass the settings for the child workflow.
 * For example: task list that this child workflow should be routed, timeouts that need to be configured.
 * Use ChildWorkflowOptions to pass down the options.
 * 
 * 	 cwo := ChildWorkflowOptions{
 * 		    ExecutionStartToCloseTimeout: 10 * time.Minute,
 * 		    TaskStartToCloseTimeout: time.Minute,
 * 		}
 * 	 ctx := WithChildWorkflowOptions(ctx, cwo)
 * 
 * Input childWorkflow is either a workflow name or a workflow function that is getting scheduled.
 * Input args are the arguments that need to be passed to the child workflow function represented by childWorkflow.
 * If the child workflow failed to complete then the future get error would indicate the failure and it can be one of
 * CustomError, TimeoutError, CanceledError, GenericError.
 * You can cancel the pending child workflow using context(workflow.WithCancel(ctx)) and that will fail the workflow with
 * error CanceledError.
 * ExecuteChildWorkflow returns ChildWorkflowFuture.
 */
export async function ExecuteChildWorkflow(ctx: internal_Context, childWorkflow: unknown, ...args: unknown[]): Promise<internal_ChildWorkflowFuture> {
  const i = getWorkflowInterceptor(ctx);
  const env = getWorkflowEnvironment(ctx);
  const workflowType = await getWorkflowFunctionName(env.GetRegistry(), childWorkflow);
  return await i.ExecuteChildWorkflow(ctx, workflowType, ...args);
}

export function getWorkflowHeader(ctx: internal_Context, ctxProps: internal_ContextPropagator[]): shared_IHeader {
    const header = new shared_Header({ fields: new Map<string, Buffer>() });
    const writer = NewHeaderWriter(header);
    for (const ctxProp of ctxProps) {
        ctxProp.InjectFromWorkflow(ctx, writer);
    }
    return header;
}

/**
 * GetWorkflowInfo extracts info of a current workflow from a context.
 */
export function GetWorkflowInfo(ctx: internal_Context): WorkflowInfo {
  const i = getWorkflowInterceptor(ctx);
  return i.GetWorkflowInfo(ctx);
}

/**
 * GetLogger returns a logger to be used in workflow's context
 */
export function GetLogger(ctx: internal_Context): Logger {
  const i = getWorkflowInterceptor(ctx);
  return i.GetLogger(ctx);
}

/**
 * GetMetricsScope returns a metrics scope to be used in workflow's context
 */
export function GetMetricsScope(ctx: internal_Context): Scope {
  const i = getWorkflowInterceptor(ctx);
  return i.GetMetricsScope(ctx);
}

/**
 * GetTotalEstimatedHistoryBytes returns the current history size of that workflow
 */
export function GetTotalEstimatedHistoryBytes(ctx: internal_Context): number {
  const i = getWorkflowInterceptor(ctx);
  return i.GetWorkflowInfo(ctx).TotalHistoryBytes;
}

/**
 * GetHistoryCount returns the current number of history events of that workflow
 */
export function GetHistoryCount(ctx: internal_Context): number {
  const i = getWorkflowInterceptor(ctx);
  return i.GetWorkflowInfo(ctx).HistoryCount;
}

/**
 * Now returns the current time in UTC. It corresponds to the time when the decision task is started or replayed.
 * Workflow needs to use this method to get the wall clock time instead of the one from the golang library.
 */
export function Now(ctx: internal_Context): number {
  const i = getWorkflowInterceptor(ctx);
  return i.Now(ctx);
}

/**
 * NewTimer returns immediately and the future becomes ready after the specified duration d. The workflow needs to use
 * this NewTimer() to get the timer instead of the Go lang library one(timer.NewTimer()). You can cancel the pending
 * timer by cancel the Context (using context from workflow.WithCancel(ctx)) and that will cancel the timer. After timer
 * is canceled, the returned Future become ready, and Future.Get() will return *CanceledError.
 * The current timer resolution implementation is in seconds and uses math.Ceil(d.Seconds()) as the duration. But is
 * subjected to change in the future.
 */
export function NewTimer(ctx: internal_Context, d: number): internal_Future {
  const i = getWorkflowInterceptor(ctx);
  return i.NewTimer(ctx, d);
}

/**
 * Sleep pauses the current workflow for at least the duration d. A negative or zero duration causes Sleep to return
 * immediately. Workflow code needs to use this Sleep() to sleep instead of the Go lang library one(timer.Sleep()).
 * You can cancel the pending sleep by cancel the Context (using context from workflow.WithCancel(ctx)).
 * Sleep() returns nil if the duration d is passed, or it returns *CanceledError if the ctx is canceled. There are 2
 * reasons the ctx could be canceled: 1) your workflow code cancel the ctx (with workflow.WithCancel(ctx));
 * 2) your workflow itself is canceled by external request.
 * The current timer resolution implementation is in seconds and uses math.Ceil(d.Seconds()) as the duration. But is
 * subjected to change in the future.
 */
export async function Sleep(ctx: internal_Context, d: number): Promise<void> {
  const i = getWorkflowInterceptor(ctx);
  await i.Sleep(ctx, d);
}

/**
 * RequestCancelExternalWorkflow can be used to request cancellation of an external workflow.
 * Input workflowID is the workflow ID of target workflow.
 * Input runID indicates the instance of a workflow. Input runID is optional (default is ""). When runID is not specified,
 * then the currently running instance of that workflowID will be used.
 * By default, the current workflow's domain will be used as target domain. However, you can specify a different domain
 * of the target workflow using the context like:
 * 
 * 	ctx := WithWorkflowDomain(ctx, "domain-name")
 * 
 * RequestCancelExternalWorkflow return Future with failure or empty success result.
 */
export async function RequestCancelExternalWorkflow(ctx: internal_Context, workflowID: string, runID: string): Promise<internal_Future> {
  const i = getWorkflowInterceptor(ctx);
  return await i.RequestCancelExternalWorkflow(ctx, workflowID, runID);
}

/**
 * SignalExternalWorkflow can be used to send signal info to an external workflow.
 * Input workflowID is the workflow ID of target workflow.
 * Input runID indicates the instance of a workflow. Input runID is optional (default is ""). When runID is not specified,
 * then the currently running instance of that workflowID will be used.
 * By default, the current workflow's domain will be used as target domain. However, you can specify a different domain
 * of the target workflow using the context like:
 * 
 * 	ctx := WithWorkflowDomain(ctx, "domain-name")
 * 
 * SignalExternalWorkflow return Future with failure or empty success result.
 */
export function SignalExternalWorkflow(ctx: internal_Context, workflowID: string, runID: string, signalName: string, arg: unknown): internal_Future {
  const i = getWorkflowInterceptor(ctx);
  return i.SignalExternalWorkflow(ctx, workflowID, runID, signalName, arg);
}

export function signalExternalWorkflow(ctx: internal_Context, workflowID: string, runID: string, signalName: string, arg: unknown, childWorkflowOnly: boolean): internal_Future {
  const env = getWorkflowEnvironment(ctx);
  const ctx1 = setWorkflowEnvOptionsIfNotExist(ctx);
  const options = getWorkflowEnvOptions(ctx1)!;
  const [future, settable] = NewFuture(ctx1);

  if (options.domain == null || options.domain === "") {
    settable.Set(null, errDomainNotSet);
    return future;
  }

  if (workflowID === "") {
    settable.Set(null, errWorkflowIDNotSet);
    return future;
  }

  let input: Buffer;
  try {
    input = encodeArg(options.dataConverter!, arg);
  } catch (err) {
    if (!(err instanceof Error)) throw err;
    settable.Set(null, err);
    return future;
  }

  const resultCallback = (result: Buffer, err: Error | null): void => {
    settable.Set(result, err);
  };

  env.SignalExternalWorkflow(
    options.domain,
    workflowID,
    runID,
    signalName,
    input,
    arg,
    childWorkflowOnly,
    resultCallback,
  );

  return future;
}

/**
 * UpsertSearchAttributes is used to add or update workflow search attributes.
 * The search attributes can be used in query of List/Scan/Count workflow APIs.
 * The key and value type must be registered on cadence server side;
 * The value has to deterministic when replay;
 * The value has to be Json serializable.
 * UpsertSearchAttributes will merge attributes to existing map in workflow, for example workflow code:
 * 
 * 	  func MyWorkflow(ctx workflow.Context, input string) error {
 * 		   attr1 := map[string]interface{}{
 * 			   "CustomIntField": 1,
 * 			   "CustomBoolField": true,
 * 		   }
 * 		   workflow.UpsertSearchAttributes(ctx, attr1)
 * 
 * 		   attr2 := map[string]interface{}{
 * 			   "CustomIntField": 2,
 * 			   "CustomKeywordField": "seattle",
 * 		   }
 * 		   workflow.UpsertSearchAttributes(ctx, attr2)
 * 	  }
 * 
 * will eventually have search attributes:
 * 
 * 	map[string]interface{}{
 * 		"CustomIntField": 2,
 * 		"CustomBoolField": true,
 * 		"CustomKeywordField": "seattle",
 * 	}
 * 
 * This is only supported when using ElasticSearch.
 */
export async function UpsertSearchAttributes(ctx: internal_Context, attributes: Record<string, unknown>): Promise<void> {
  const i = getWorkflowInterceptor(ctx);
  await i.UpsertSearchAttributes(ctx, attributes);
}

/**
 * WithChildWorkflowOptions adds all workflow options to the context.
 * The current timeout resolution implementation is in seconds and uses math.Ceil(d.Seconds()) as the duration. But is
 * subjected to change in the future.
 */
export function WithChildWorkflowOptions(ctx: internal_Context, cwo: internal_ChildWorkflowOptions): internal_Context {
  const ctx1 = setWorkflowEnvOptionsIfNotExist(ctx);
  const wfOptions = getWorkflowEnvOptions(ctx1)!;
  wfOptions.domain = StringPtr(cwo.Domain);
  wfOptions.taskListName = StringPtr(cwo.TaskList);
  wfOptions.workflowID = cwo.WorkflowID;
  wfOptions.executionStartToCloseTimeoutSeconds = Int32Ptr(
    Int32Ceil(cwo.ExecutionStartToCloseTimeout / 1e9),
  );
  wfOptions.taskStartToCloseTimeoutSeconds = Int32Ptr(
    Int32Ceil(cwo.TaskStartToCloseTimeout / 1e9),
  );
  wfOptions.waitForCancellation = cwo.WaitForCancellation;
  wfOptions.workflowIDReusePolicy = cwo.WorkflowIDReusePolicy;
  wfOptions.retryPolicy = convertRetryPolicy(cwo.RetryPolicy!);
  wfOptions.cronSchedule = cwo.CronSchedule;
  wfOptions.memo = cwo.Memo!;
  wfOptions.searchAttributes = cwo.SearchAttributes!;
  wfOptions.parentClosePolicy = cwo.ParentClosePolicy;
  wfOptions.bugports = cwo.Bugports;

  return ctx1;
}

/**
 * WithWorkflowDomain adds a domain to the context.
 */
export function WithWorkflowDomain(ctx: internal_Context, name: string): internal_Context {
  const ctx1 = setWorkflowEnvOptionsIfNotExist(ctx);
  getWorkflowEnvOptions(ctx1)!.domain = StringPtr(name);
  return ctx1;
}

/**
 * WithWorkflowTaskList adds a task list to the context.
 */
export function WithWorkflowTaskList(ctx: internal_Context, name: string): internal_Context {
  const ctx1 = setWorkflowEnvOptionsIfNotExist(ctx);
  getWorkflowEnvOptions(ctx1)!.taskListName = StringPtr(name);
  return ctx1;
}

/**
 * GetWorkflowTaskList retrieves current workflow tasklist from context
 */
export function GetWorkflowTaskList(ctx: internal_Context): string | undefined {
	const wo = getWorkflowEnvOptions(ctx);
	if (wo == null || wo.taskListName == null) {
		return undefined;
	}
	const tl = wo.taskListName;
	return tl;
}

/**
 * WithWorkflowID adds a workflowID to the context.
 */
export function WithWorkflowID(ctx: internal_Context, workflowID: string): internal_Context {
  const ctx1 = setWorkflowEnvOptionsIfNotExist(ctx);
  getWorkflowEnvOptions(ctx1)!.workflowID = workflowID;
  return ctx1;
}

/**
 * WithExecutionStartToCloseTimeout adds a workflow execution timeout to the context.
 * The current timeout resolution implementation is in seconds and uses math.Ceil(d.Seconds()) as the duration. But is
 * subjected to change in the future.
 */
export function WithExecutionStartToCloseTimeout(ctx: internal_Context, d: number): internal_Context {
  const ctx1 = setWorkflowEnvOptionsIfNotExist(ctx);
  getWorkflowEnvOptions(ctx1)!.executionStartToCloseTimeoutSeconds = Int32Ptr(Int32Ceil(d / 1e9));
  return ctx1;
}

/**
 * WithWorkflowTaskStartToCloseTimeout adds a decision timeout to the context.
 * The current timeout resolution implementation is in seconds and uses math.Ceil(d.Seconds()) as the duration. But is
 * subjected to change in the future.
 */
export function WithWorkflowTaskStartToCloseTimeout(ctx: internal_Context, d: number): internal_Context {
  const ctx1 = setWorkflowEnvOptionsIfNotExist(ctx);
  getWorkflowEnvOptions(ctx1)!.taskStartToCloseTimeoutSeconds = Int32Ptr(Int32Ceil(d / 1e9));
  return ctx1;
}

/**
 * WithDataConverter adds DataConverter to the context.
 */
export function WithDataConverter(ctx: internal_Context, dc: internal_DataConverter | undefined): internal_Context {
  if (dc == null) {
    throw "data converter is nil for WithDataConverter";
  }
  const ctx1 = setWorkflowEnvOptionsIfNotExist(ctx);
  getWorkflowEnvOptions(ctx1)!.dataConverter = dc;
  return ctx1;
}

/**
 * withContextPropagators adds ContextPropagators to the context.
 */
export function withContextPropagators(ctx: internal_Context, contextPropagators: internal_ContextPropagator[]): internal_Context {
  const ctx1 = setWorkflowEnvOptionsIfNotExist(ctx);
  getWorkflowEnvOptions(ctx1)!.contextPropagators = contextPropagators;
  return ctx1;
}

/**
 * GetSignalChannel returns channel corresponding to the signal name.
 */
export function GetSignalChannel(ctx: internal_Context, signalName: string): internal_Channel {
  const i = getWorkflowInterceptor(ctx);
  return i.GetSignalChannel(ctx, signalName);
}

export function newEncodedValue(value: Buffer, dc: internal_DataConverter | undefined): EncodedValue {
  if (dc == null) {
    dc = getDefaultDataConverter();
  }
  return new EncodedValue({ value, dataConverter: dc });
}

/**
 * SideEffect docs are in the public API to prevent duplication: [go.uber.org/cadence/workflow.SideEffect]
 */
export async function SideEffect(ctx: internal_Context, f: (p0: internal_Context) => unknown | Promise<unknown>): Promise<internal_Value> {
  const i = getWorkflowInterceptor(ctx);
  return await i.SideEffect(ctx, f);
}

/**
 * MutableSideEffect docs are in the public API to prevent duplication: [go.uber.org/cadence/workflow.MutableSideEffect]
 */
export function MutableSideEffect(ctx: internal_Context, id: string, f: (p0: internal_Context) => unknown | Promise<unknown>, equals: (p0: unknown, p1: unknown) => boolean): internal_Value {
  const i = getWorkflowInterceptor(ctx);
  return i.MutableSideEffect(ctx, id, f, equals);
}

/**
 * ExecuteWithVersion forces a specific version to be returned when GetVersion is executed for the first time,
 * instead of returning maxSupported version. Check public documentation of workflow.ExecuteWithVersion
 */
export function ExecuteWithVersion(version: internal_Version): internal_GetVersionOption {
  return new customVersionOption(version);
}

/**
 * ExecuteWithMinVersion forces minSupported version to be returned when GetVersion is executed for the first time,
 * instead of returning maxSupported version. Check public documentation of workflow.ExecuteWithMinVersion
 */
export function ExecuteWithMinVersion(): internal_GetVersionOption {
  return new useMinVersionOption({});
}

/**
 * GetVersion is used to safely perform backwards incompatible changes to workflow definitions.
 * It is not allowed to update workflow code while there are workflows running as it is going to break
 * determinism. The solution is to have both old code that is used to replay existing workflows
 * as well as the new one that is used when it is executed for the first time.
 * GetVersion returns maxSupported version when is executed for the first time. This version is recorded into the
 * workflow history as a marker event. Even if maxSupported version is changed the version that was recorded is
 * returned on replay. DefaultVersion constant contains version of code that wasn't versioned before.
 * Check documentation for ExecuteWithVersion and ExecuteWithMinVersion to make your changes forward and backward compatible.
 * 
 * For example initially workflow has the following code:
 * 
 * 	err = workflow.ExecuteActivity(ctx, foo).Get(ctx, nil)
 * 
 * it should be updated to
 * 
 * 	err = workflow.ExecuteActivity(ctx, bar).Get(ctx, nil)
 * 
 * The backwards compatible way to execute the update is
 * 
 * 	v :=  GetVersion(ctx, "fooChange", DefaultVersion, 1)
 * 	if v  == DefaultVersion {
 * 	    err = workflow.ExecuteActivity(ctx, foo).Get(ctx, nil)
 * 	} else {
 * 	    err = workflow.ExecuteActivity(ctx, bar).Get(ctx, nil)
 * 	}
 * 
 * Then bar has to be changed to baz:
 * 
 * 	v :=  GetVersion(ctx, "fooChange", DefaultVersion, 2)
 * 	if v  == DefaultVersion {
 * 	    err = workflow.ExecuteActivity(ctx, foo).Get(ctx, nil)
 * 	} else if v == 1 {
 * 	    err = workflow.ExecuteActivity(ctx, bar).Get(ctx, nil)
 * 	} else {
 * 	    err = workflow.ExecuteActivity(ctx, baz).Get(ctx, nil)
 * 	}
 * 
 * Later when there are no workflow executions running DefaultVersion the correspondent branch can be removed:
 * 
 * 	v :=  GetVersion(ctx, "fooChange", 1, 2)
 * 	if v == 1 {
 * 	    err = workflow.ExecuteActivity(ctx, bar).Get(ctx, nil)
 * 	} else {
 * 	    err = workflow.ExecuteActivity(ctx, baz).Get(ctx, nil)
 * 	}
 * 
 * It is recommended to keep the GetVersion() call even if single branch is left:
 * 
 * 	GetVersion(ctx, "fooChange", 2, 2)
 * 	err = workflow.ExecuteActivity(ctx, baz).Get(ctx, nil)
 * 
 * The reason to keep it is: 1) it ensures that if there is older version execution still running, it will fail here
 * and not proceed; 2) if you ever need to make more changes for "fooChange", for example change activity from baz to qux,
 * you just need to update the maxVersion from 2 to 3.
 * 
 * Note that, you only need to preserve the first call to GetVersion() for each changeID. All subsequent call to GetVersion()
 * with same changeID are safe to remove. However, if you really want to get rid of the first GetVersion() call as well,
 * you can do so, but you need to make sure: 1) all older version executions are completed; 2) you can no longer use "fooChange"
 * as changeID. If you ever need to make changes to that same part like change from baz to qux, you would need to use a
 * different changeID like "fooChange-fix2", and start minVersion from DefaultVersion again. The code would looks like:
 * 
 * 	v := workflow.GetVersion(ctx, "fooChange-fix2", workflow.DefaultVersion, 1)
 * 	if v == workflow.DefaultVersion {
 * 	  err = workflow.ExecuteActivity(ctx, baz, data).Get(ctx, nil)
 * 	} else {
 * 	  err = workflow.ExecuteActivity(ctx, qux, data).Get(ctx, nil)
 * 	}
 */
export async function GetVersion(ctx: internal_Context, changeID: string, minSupported: internal_Version, maxSupported: internal_Version, ...opts: internal_GetVersionOption[]): Promise<internal_Version> {
  const i = getWorkflowInterceptor(ctx);
  return await i.GetVersion(ctx, changeID, minSupported, maxSupported, ...opts);
}

/**
 * SetQueryHandler sets the query handler to handle workflow query. The queryType specify which query type this handler
 * should handle. The handler must be a function that returns 2 values. The first return value must be a serializable
 * result. The second return value must be an error. The handler function could receive any number of input parameters.
 * All the input parameter must be serializable. You should call workflow.SetQueryHandler() at the beginning of the workflow
 * code. When client calls Client.QueryWorkflow() to cadence server, a task will be generated on server that will be dispatched
 * to a workflow worker, which will replay the history events and then execute a query handler based on the query type.
 * The query handler will be invoked out of the context of the workflow, meaning that the handler code must not use cadence
 * context to do things like workflow.NewChannel(), workflow.Go() or to call any workflow blocking functions like
 * Channel.Get() or Future.Get(). Trying to do so in query handler code will fail the query and client will receive
 * QueryFailedError.
 * Example of workflow code that support query type "current_state":
 * 
 * 	func MyWorkflow(ctx workflow.Context, input string) error {
 * 	  currentState := "started" // this could be any serializable struct
 * 	  err := workflow.SetQueryHandler(ctx, "current_state", func() (string, error) {
 * 	    return currentState, nil
 * 	  })
 * 	  if err != nil {
 * 	    currentState = "failed to register query handler"
 * 	    return err
 * 	  }
 * 	  // your normal workflow code begins here, and you update the currentState as the code makes progress.
 * 	  currentState = "waiting timer"
 * 	  err = NewTimer(ctx, time.Hour).Get(ctx, nil)
 * 	  if err != nil {
 * 	    currentState = "timer failed"
 * 	    return err
 * 	  }
 * 
 * 	  currentState = "waiting activity"
 * 	  ctx = WithActivityOptions(ctx, myActivityOptions)
 * 	  err = ExecuteActivity(ctx, MyActivity, "my_input").Get(ctx, nil)
 * 	  if err != nil {
 * 	    currentState = "activity failed"
 * 	    return err
 * 	  }
 * 	  currentState = "done"
 * 	  return nil
 * 	}
 */
export async function SetQueryHandler(ctx: internal_Context, queryType: string, handler: unknown): Promise<void> {
  const i = getWorkflowInterceptor(ctx);
  await i.SetQueryHandler(ctx, queryType, handler);
}

/**
 * IsReplaying returns whether the current workflow code is replaying.
 * 
 * Warning! Never make decisions, like schedule activity/childWorkflow/timer or send/wait on future/channel, based on
 * this flag as it is going to break workflow determinism requirement.
 * The only reasonable use case for this flag is to avoid some external actions during replay, like custom logging or
 * metric reporting. Please note that Cadence already provide standard logging/metric via workflow.GetLogger(ctx) and
 * workflow.GetMetricsScope(ctx), and those standard mechanism are replay-aware and it will automatically suppress during
 * replay. Only use this flag if you need custom logging/metrics reporting, for example if you want to log to kafka.
 * 
 * Warning! Any action protected by this flag should not fail or if it does fail should ignore that failure or panic
 * on the failure. If workflow don't want to be blocked on those failure, it should ignore those failure; if workflow do
 * want to make sure it proceed only when that action succeed then it should panic on that failure. Panic raised from a
 * workflow causes decision task to fail and cadence server will rescheduled later to retry.
 */
export function IsReplaying(ctx: internal_Context): boolean {
  const i = getWorkflowInterceptor(ctx);
  return i.IsReplaying(ctx);
}

/**
 * HasLastCompletionResult checks if there is completion result from previous runs.
 * This is used in combination with cron schedule. A workflow can be started with an optional cron schedule.
 * If a cron workflow wants to pass some data to next schedule, it can return any data and that data will become
 * available when next run starts.
 * This HasLastCompletionResult() checks if there is such data available passing down from previous successful run.
 */
export function HasLastCompletionResult(ctx: internal_Context): boolean {
  const i = getWorkflowInterceptor(ctx);
  return i.HasLastCompletionResult(ctx);
}

/**
 * GetLastCompletionResult extract last completion result from previous run for this cron workflow.
 * This is used in combination with cron schedule. A workflow can be started with an optional cron schedule.
 * If a cron workflow wants to pass some data to next schedule, it can return any data and that data will become
 * available when next run starts.
 * This GetLastCompletionResult() extract the data into expected data structure.
 */
export function GetLastCompletionResult(ctx: internal_Context, ...d: unknown[]): void {
  const i = getWorkflowInterceptor(ctx);
  i.GetLastCompletionResult(ctx, ...d);
}

/**
 * WithActivityOptions adds all options to the copy of the context.
 * The current timeout resolution implementation is in seconds and uses math.Ceil(d.Seconds()) as the duration. But is
 * subjected to change in the future.
 */
export function WithActivityOptions(ctx: internal_Context, options: internal_ActivityOptions): internal_Context {
  const ctx1 = setActivityParametersIfNotExist(ctx);
  const eap = getActivityOptions(ctx1)!;

  eap.TaskListName = options.TaskList;
  eap.ScheduleToCloseTimeoutSeconds = Int32Ceil(options.ScheduleToCloseTimeout / 1e9);
  eap.StartToCloseTimeoutSeconds = Int32Ceil(options.StartToCloseTimeout / 1e9);
  eap.ScheduleToStartTimeoutSeconds = Int32Ceil(options.ScheduleToStartTimeout / 1e9);
  eap.HeartbeatTimeoutSeconds = Int32Ceil(options.HeartbeatTimeout / 1e9);
  eap.WaitForCancellation = options.WaitForCancellation;
  eap.ActivityID = StringPtr(options.ActivityID);
  eap.RetryPolicy = convertRetryPolicy(options.RetryPolicy!);
  return ctx1;
}

/**
 * WithLocalActivityOptions adds local activity options to the copy of the context.
 * The current timeout resolution implementation is in seconds and uses math.Ceil(d.Seconds()) as the duration. But is
 * subjected to change in the future.
 */
export function WithLocalActivityOptions(ctx: internal_Context, options: internal_LocalActivityOptions): internal_Context {
  const ctx1 = setLocalActivityParametersIfNotExist(ctx);
  const opts = getLocalActivityOptions(ctx1)!;

  opts.ScheduleToCloseTimeoutSeconds = Int32Ceil(options.ScheduleToCloseTimeout / 1e9);
  opts.RetryPolicy = options.RetryPolicy!;

  return ctx1;
}

/**
 * WithTaskList adds a task list to the copy of the context.
 * Note this shall not confuse with WithWorkflowTaskList. This is the tasklist for activities
 */
export function WithTaskList(ctx: internal_Context, name: string): internal_Context {
  const ctx1 = setActivityParametersIfNotExist(ctx);
  getActivityOptions(ctx1)!.TaskListName = name;
  return ctx1;
}

/**
 * GetActivityTaskList retrieves tasklist info from context
 */
export function GetActivityTaskList(ctx: internal_Context): string | undefined {
	const ao = getActivityOptions(ctx);
	if (ao == null) {
		return undefined;
	}
	const tl = ao.TaskListName;
	return tl;
}

/**
 * GetActivityOptions retrieves ActivityOptions from the context.
 * Returns nil if no activity options have been set on the context.
 */
export function GetActivityOptions(ctx: internal_Context): internal_ActivityOptions | undefined {
  const ao = getActivityOptions(ctx);
  if (ao == null) {
    return;
  }
  const opts: internal_ActivityOptions = {
    TaskList: ao.TaskListName,
    ScheduleToCloseTimeout: Math.trunc(ao.ScheduleToCloseTimeoutSeconds) * Second,
    ScheduleToStartTimeout: Math.trunc(ao.ScheduleToStartTimeoutSeconds) * Second,
    StartToCloseTimeout: Math.trunc(ao.StartToCloseTimeoutSeconds) * Second,
    HeartbeatTimeout: Math.trunc(ao.HeartbeatTimeoutSeconds) * Second,
    WaitForCancellation: ao.WaitForCancellation,
    ActivityID: "",
  };
  if (ao.ActivityID != null) {
    opts.ActivityID = ao.ActivityID!;
  }
  if (ao.RetryPolicy != null) {
    opts.RetryPolicy = convertFromThriftRetryPolicy(ao.RetryPolicy!);
  }
  return opts;
}

/**
 * WithScheduleToCloseTimeout adds a timeout to the copy of the context.
 * The current timeout resolution implementation is in seconds and uses math.Ceil(d.Seconds()) as the duration. But is
 * subjected to change in the future.
 */
export function WithScheduleToCloseTimeout(ctx: internal_Context, d: number): internal_Context {
  const ctx1 = setActivityParametersIfNotExist(ctx);
  getActivityOptions(ctx1)!.ScheduleToCloseTimeoutSeconds = Int32Ceil(d / 1e9);
  return ctx1;
}

/**
 * WithScheduleToStartTimeout adds a timeout to the copy of the context.
 * The current timeout resolution implementation is in seconds and uses math.Ceil(d.Seconds()) as the duration. But is
 * subjected to change in the future.
 */
export function WithScheduleToStartTimeout(ctx: internal_Context, d: number): internal_Context {
  const ctx1 = setActivityParametersIfNotExist(ctx);
  getActivityOptions(ctx1)!.ScheduleToStartTimeoutSeconds = Int32Ceil(d / 1e9);
  return ctx1;
}

/**
 * WithStartToCloseTimeout adds a timeout to the copy of the context.
 * The current timeout resolution implementation is in seconds and uses math.Ceil(d.Seconds()) as the duration. But is
 * subjected to change in the future.
 */
export function WithStartToCloseTimeout(ctx: internal_Context, d: number): internal_Context {
  const ctx1 = setActivityParametersIfNotExist(ctx);
  getActivityOptions(ctx1)!.StartToCloseTimeoutSeconds = Int32Ceil(d / 1e9);
  return ctx1;
}

/**
 * WithHeartbeatTimeout adds a timeout to the copy of the context.
 * The current timeout resolution implementation is in seconds and uses math.Ceil(d.Seconds()) as the duration. But is
 * subjected to change in the future.
 */
export function WithHeartbeatTimeout(ctx: internal_Context, d: number): internal_Context {
  const ctx1 = setActivityParametersIfNotExist(ctx);
  getActivityOptions(ctx1)!.HeartbeatTimeoutSeconds = Int32Ceil(d / 1e9);
  return ctx1;
}

/**
 * WithWaitForCancellation adds wait for the cacellation to the copy of the context.
 */
export function WithWaitForCancellation(ctx: internal_Context, wait: boolean): internal_Context {
  const ctx1 = setActivityParametersIfNotExist(ctx);
  getActivityOptions(ctx1)!.WaitForCancellation = wait;
  return ctx1;
}

/**
 * WithRetryPolicy adds retry policy to the copy of the context
 */
export function WithRetryPolicy(ctx: internal_Context, retryPolicy: internal_RetryPolicy): internal_Context {
  const ctx1 = setActivityParametersIfNotExist(ctx);
  getActivityOptions(ctx1)!.RetryPolicy = convertRetryPolicy(retryPolicy);
  return ctx1;
}

export const internal_Version = { DefaultVersion: -1 } as const;

/**
 * CadenceChangeVersion is used as search attributes key to find workflows with specific change version.
 */
export const CadenceChangeVersion = "CadenceChangeVersion";

export let errDomainNotSet = new Error("domain is not set");

export let errTaskListNotSet = new Error("task list is not set");

export let errWorkflowIDNotSet = new Error("workflowId is not set");

export let errLocalActivityParamsBadRequest = new Error("missing local activity parameters through context, check LocalActivityOptions");

export let errActivityParamsBadRequest = new Error("missing activity parameters through context, check ActivityOptions");

export let errWorkflowOptionBadRequest = new Error("missing workflow options through context, check WorkflowOptions");

export let errSearchAttributesNotSet = new Error("search attributes is empty");
