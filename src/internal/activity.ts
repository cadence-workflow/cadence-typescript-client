// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { internal_RetryPolicy } from './client.js';
import { internal_DataConverter } from './encoded.js';
import { internal_ContextPropagator } from './headers.js';
import { internal_WorkflowExecution, internal_WorkflowType } from './workflow.js';
import { Channel } from './runtime/channel.js';
import { Context, withValue } from './runtime/context.js';
import { Second } from './runtime/time.js';
import type { Scope } from './runtime/tally.js';
import { IPollForActivityTaskResponse as shared_IPollForActivityTaskResponse } from '../generated/thrift/cadence-idl/com/uber/cadence/PollForActivityTaskResponse.js';
import { getActivityEnv, hasActivityEnv, activityEnvContextKey, activityEnvironment } from './internal_activity.js';
import { ErrNoData } from './error.js';
import { newEncodedValues } from './workflow_testsuite.js';
import { tagActivityID, tagActivityType, tagAttempt, tagRunID, tagWorkflowID, tagWorkflowType } from './internal_logging_tags.js';
import { encodeArgs, getDataConverterFromActivityCtx } from './internal_worker.js';
import { getGlobalRegistry } from './registry.js';
import { Logger } from 'winston';

/**
 * RegisterActivityOptions consists of options for registering an activity
 */
export interface RegisterActivityOptions {
  Name: string;
  EnableShortName: boolean;
  DisableAlreadyRegisteredCheck: boolean;
  EnableAutoHeartbeat: boolean;
}

export interface RegistryActivityInfo {
  ActivityType(): internal_ActivityType;
  GetFunction(): unknown;
}

export interface ServiceInvoker {
  Heartbeat(details: Buffer): Promise<void>;
  BatchHeartbeat(details: Buffer): Promise<void>;
  BackgroundHeartbeat(): Promise<void>;
  Close(flushBufferedHeartbeat: boolean): Promise<void>;
  SignalWorkflow(ctx: Context, domain: string, workflowID: string, runID: string, signalName: string, signalInput: Buffer): Promise<void>;
}

/**
 * ActivityInfo contains information about currently executing activity.
 */
export interface cadence_internal_ActivityInfo {
  TaskToken?: Buffer;
  WorkflowType?: internal_WorkflowType;
  WorkflowDomain: string;
  WorkflowExecution: internal_WorkflowExecution;
  ActivityID: string;
  ActivityType: internal_ActivityType;
  TaskList: string;
  HeartbeatTimeout: number;
  ScheduledTimestamp: number;
  StartedTimestamp: number;
  Deadline: number;
  Attempt: number;
}

/**
 * ActivityOptions stores all activity-specific parameters that will be stored inside of a context.
 * The current timeout resolution implementation is in seconds and uses math.Ceil(d.Seconds()) as the duration. But is
 * subjected to change in the future.
 */
export interface internal_ActivityOptions {
  TaskList: string;
  ScheduleToCloseTimeout: number;
  ScheduleToStartTimeout: number;
  StartToCloseTimeout: number;
  HeartbeatTimeout: number;
  WaitForCancellation: boolean;
  ActivityID: string;
  RetryPolicy?: internal_RetryPolicy;
}

/**
 * ActivityType identifies a activity type.
 */
export interface internal_ActivityType {
  Name: string;
  Path: string;
}

/**
 * LocalActivityOptions stores local activity specific parameters that will be stored inside of a context.
 */
export interface internal_LocalActivityOptions {
  ScheduleToCloseTimeout: number;
  RetryPolicy?: internal_RetryPolicy;
}

/**
 * RegisterActivity - register an activity function or a pointer to a structure with the framework.
 * The public form is: activity.Register(...)
 * An activity function takes a context and input and returns a (result, error) or just error.
 *
 * And activity struct is a structure with all its exported methods treated as activities. The default
 * name of each activity is the <structure name>_<method name>. Use RegisterActivityWithOptions to override the
 * "<structure name>_" prefix.
 *
 * Examples:
 *
 * 		func sampleActivity(ctx context.Context, input []byte) (result []byte, err error)
 * 		func sampleActivity(ctx context.Context, arg1 int, arg2 string) (result *customerStruct, err error)
 * 		func sampleActivity(ctx context.Context) (err error)
 * 		func sampleActivity() (result string, err error)
 * 		func sampleActivity(arg1 bool) (result int, err error)
 * 		func sampleActivity(arg1 bool) (err error)
 *
 * 	 type Activities struct {
 * 	    // fields
 * 	 }
 * 	 func (a *Activities) SampleActivity1(ctx context.Context, arg1 int, arg2 string) (result *customerStruct, err error) {
 * 	   ...
 * 	 }
 *
 * 	 func (a *Activities) SampleActivity2(ctx context.Context, arg1 int, arg2 *customerStruct) (result string, err error) {
 * 	   ...
 * 	 }
 *
 * Serialization of all primitive types, structures is supported ... except channels, functions, variadic, unsafe pointer.
 * This method calls panic if activityFunc doesn't comply with the expected format.
 * Deprecated: Global activity registration methods are replaced by equivalent Worker instance methods.
 * This method is kept to maintain backward compatibility and should not be used.
 */
export async function RegisterActivity(activityFunc: unknown): Promise<void> {
  await RegisterActivityWithOptions(activityFunc, {
    DisableAlreadyRegisteredCheck: false,
    EnableAutoHeartbeat: false,
    EnableShortName: false,
    Name: "",
  });
}

/**
 * RegisterActivityWithOptions registers the activity function or struct pointer with options.
 * The public form is: activity.RegisterWithOptions(...)
 * The user can use options to provide an external name for the activity or leave it empty if no
 * external name is required. This can be used as
 *
 * 	activity.RegisterWithOptions(barActivity, RegisterActivityOptions{})
 * 	activity.RegisterWithOptions(barActivity, RegisterActivityOptions{Name: "barExternal"})
 *
 * When registering the structure that implements activities the name is used as a prefix that is
 * prepended to the activity method name.
 *
 * 	activity.RegisterWithOptions(&Activities{ ... }, RegisterActivityOptions{Name: "MyActivities_"})
 *
 * To override each name of activities defined through a structure register the methods one by one:
 * activities := &Activities{ ... }
 * activity.RegisterWithOptions(activities.SampleActivity1, RegisterActivityOptions{Name: "Sample1"})
 * activity.RegisterWithOptions(activities.SampleActivity2, RegisterActivityOptions{Name: "Sample2"})
 * See RegisterActivity function for more info.
 * The other use of options is to disable duplicated activity registration check
 * which might be useful for integration tests.
 * activity.RegisterWithOptions(barActivity, RegisterActivityOptions{DisableAlreadyRegisteredCheck: true})
 * Deprecated: Global activity registration methods are replaced by equivalent Worker instance methods.
 * This method is kept to maintain backward compatibility and should not be used.
 */
export async function RegisterActivityWithOptions(activityFunc: unknown, opts: RegisterActivityOptions): Promise<void> {
  const registry = getGlobalRegistry();
  await registry.RegisterActivityWithOptions(activityFunc, opts);
}

/**
 * GetActivityInfo returns information about currently executing activity.
 */
export function GetActivityInfo(ctx: Context): cadence_internal_ActivityInfo {
  const env = getActivityEnv(ctx);
  return {
    ActivityID: env.activityID,
    ActivityType: env.activityType,
    TaskToken: env.taskToken,
    WorkflowExecution: env.workflowExecution,
    HeartbeatTimeout: env.heartbeatTimeout,
    Deadline: env.deadline,
    ScheduledTimestamp: env.scheduledTimestamp,
    StartedTimestamp: env.startedTimestamp,
    TaskList: env.taskList,
    Attempt: env.attempt,
    WorkflowType: env.workflowType!,
    WorkflowDomain: env.workflowDomain,
  };
}

/**
 * HasActivityInfo returns if the context contains activity information
 */
export function HasActivityInfo(ctx: Context): boolean {
  return hasActivityEnv(ctx);
}

/**
 * HasHeartbeatDetails checks if there is heartbeat details from last attempt.
 */
export function HasHeartbeatDetails(ctx: Context): boolean {
  const env = getActivityEnv(ctx);
  return env.heartbeatDetails.length > 0;
}

/**
 * GetHeartbeatDetails extract heartbeat details from last failed attempt. This is used in combination with retry policy.
 * An activity could be scheduled with an optional retry policy on ActivityOptions. If the activity failed then server
 * would attempt to dispatch another activity task to retry according to the retry policy. If there was heartbeat
 * details reported by activity from the failed attempt, the details would be delivered along with the activity task for
 * retry attempt. Activity could extract the details by GetHeartbeatDetails() and resume from the progress.
 */
export function GetHeartbeatDetails(ctx: Context, ...d: unknown[]): void {
  const env = getActivityEnv(ctx);
  if (env.heartbeatDetails.length === 0) {
    throw ErrNoData;
  }
  const encoded = newEncodedValues(env.heartbeatDetails, env.dataConverter!);
  encoded.Get(...d);
}

/**
 * GetActivityLogger returns a logger that can be used in activity
 */
export function GetActivityLogger(ctx: Context): Logger {
  const env = getActivityEnv(ctx);
  return env.logger!;
}

/**
 * GetActivityMetricsScope returns a metrics scope that can be used in activity
 */
export function GetActivityMetricsScope(ctx: Context): Scope {
  const env = getActivityEnv(ctx);
  return env.metricsScope!;
}

/**
 * GetWorkerStopChannel returns a read-only channel. The closure of this channel indicates the activity worker is stopping.
 * When the worker is stopping, it will close this channel and wait until the worker stop timeout finishes. After the timeout
 * hit, the worker will cancel the activity context and then exit. The timeout can be defined by worker option: WorkerStopTimeout.
 * Use this channel to handle activity graceful exit when the activity worker stops.
 */
export function GetWorkerStopChannel(ctx: Context): Channel<{}> {
  const env = getActivityEnv(ctx);
  return env.workerStopChannel!;
}

/**
 * WithActivityTask adds activity specific information into context.
 * Use this method to unit test activity implementations that use context extractor methodshared.
 */
export function WithActivityTask(ctx: Context, task: shared_IPollForActivityTaskResponse, taskList: string, invoker: ServiceInvoker, logger: Logger, scope: Scope, dataConverter: internal_DataConverter, workerStopChannel: Channel<{}>, contextPropagators: internal_ContextPropagator[], tracer: unknown): Context {
  const scheduled = task.scheduledTimestampOfThisAttempt?.toNumber() ?? 0;
  const started = task.startedTimestamp?.toNumber() ?? 0;
  const scheduleToCloseTimeout = (task.scheduleToCloseTimeoutSeconds ?? 0) * Second;
  const startToCloseTimeout = (task.startToCloseTimeoutSeconds ?? 0) * Second;
  const heartbeatTimeout = (task.heartbeatTimeoutSeconds ?? 0) * Second;
  const scheduleToCloseDeadline = scheduled + scheduleToCloseTimeout;
  const startToCloseDeadline = started + startToCloseTimeout;
  const deadline = scheduleToCloseDeadline < startToCloseDeadline
    ? scheduleToCloseDeadline
    : startToCloseDeadline;

  logger = logger.child({
    [tagActivityID]: task.activityId!,
    [tagActivityType]: task.activityType!.name!,
    [tagWorkflowType]: task.workflowType!.name!,
    [tagWorkflowID]: task.workflowExecution!.workflowId!,
    [tagRunID]: task.workflowExecution!.runId!,
    [tagAttempt]: task.attempt ?? 0,
  });

  return withValue(
    ctx,
    activityEnvContextKey,
    new activityEnvironment({
      taskToken: task.taskToken!,
      serviceInvoker: invoker,
      activityType: {
        Name: task.activityType!.name!,
        Path: "",
      },
      activityID: task.activityId!,
      workflowExecution: {
        RunID: task.workflowExecution!.runId!,
        ID: task.workflowExecution!.workflowId!,
      },
      logger,
      metricsScope: scope,
      isLocalActivity: false,
      deadline,
      heartbeatTimeout,
      scheduledTimestamp: scheduled,
      startedTimestamp: started,
      taskList,
      dataConverter,
      attempt: task.attempt ?? 0,
      heartbeatDetails: task.heartbeatDetails!,
      workflowType: {
        Name: task.workflowType!.name!,
        Path: "",
      },
      workflowDomain: task.workflowDomain!,
      workerStopChannel,
      contextPropagators,
      tracer,
    }),
  );
}

/**
 * RecordActivityHeartbeat sends heartbeat for the currently executing activity
 * If the activity is either cancelled (or) workflow/activity doesn't exist then we would cancel
 * the context with error context.Canceled.
 *
 * 	TODO: we don't have a way to distinguish between the two cases when context is cancelled because
 * 	context doesn't support overriding value of ctx.Error.
 * 	TODO: Implement automatic heartbeating with cancellation through ctx.
 *
 * details - the details that you provided here can be seen in the workflow when it receives TimeoutError, you
 * can check error TimeoutType()/Details().
 */
export async function RecordActivityHeartbeat(ctx: Context, ...details: unknown[]): Promise<void> {
	const env = getActivityEnv(ctx);
	if (env.isLocalActivity) {
		return;
	}

	let data: Buffer = Buffer.alloc(0);
	if (details.length !== 1 || details[0] != null) {
		data = encodeArgs(getDataConverterFromActivityCtx(ctx), details);
	}

	try {
		await env.serviceInvoker!.BatchHeartbeat(data);
	} catch (err) {
		if (!(err instanceof Error)) {
			throw err;
		}
		const log = GetActivityLogger(ctx);
		log.debug("RecordActivityHeartbeat With Error:", { error: err });
	}
}
