// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { RegisterActivityOptions, RegistryActivityInfo, cadence_internal_ActivityInfo, internal_ActivityType, GetHeartbeatDetails as internal_GetHeartbeatDetails, GetActivityInfo, GetActivityMetricsScope, HasActivityInfo, GetWorkerStopChannel as internal_GetWorkerStopChannel, RegisterActivity, HasHeartbeatDetails as internal_HasHeartbeatDetails, GetActivityLogger, RecordActivityHeartbeat, RegisterActivityWithOptions } from '../internal/activity.js';
import { Channel } from '../internal/runtime/channel.js';
import { Context } from '../internal/runtime/context.js';
import type { Scope } from '../internal/runtime/tally.js';
import { ErrActivityResultPending as internal_ErrActivityResultPending } from '../internal/error.js';
import { Logger } from 'winston';

/**
 * Info contains information about a currently executing activity.
 */
export type activity_Info = cadence_internal_ActivityInfo;

/**
 * RegisterOptions consists of options for registering an activity
 */
export type activity_RegisterOptions = RegisterActivityOptions;

/**
 * RegistryInfo
 */
export type activity_RegistryInfo = RegistryActivityInfo;

/**
 * Type identifies an activity type.
 */
export type activity_Type = internal_ActivityType;

/**
 * Register - calls RegisterWithOptions with default registration options.
 * Deprecated: Global activity registration methods are replaced by equivalent Worker instance methods.
 * This method is kept to maintain backward compatibility and should not be used.
 */
export async function Register(activityFunc: unknown): Promise<void> {
  await RegisterActivity(activityFunc);
}

/**
 * RegisterWithOptions registers the activity function with options
 * The user can use options to provide an external name for the activity or leave it empty if no
 * external name is required. This can be used as
 * 
 * 	client.Register(barActivity, RegisterOptions{})
 * 	client.Register(barActivity, RegisterOptions{Name: "barExternal"})
 * 
 * An activity takes a context and input and returns a (result, error) or just error.
 * Examples:
 * 
 * 	func sampleActivity(ctx context.Context, input []byte) (result []byte, err error)
 * 	func sampleActivity(ctx context.Context, arg1 int, arg2 string) (result *customerStruct, err error)
 * 	func sampleActivity(ctx context.Context) (err error)
 * 	func sampleActivity() (result string, err error)
 * 	func sampleActivity(arg1 bool) (result int, err error)
 * 	func sampleActivity(arg1 bool) (err error)
 * 
 * Serialization of all primitive types, structures is supported ... except channels, functions, unsafe pointer.
 * If function implementation returns activity.ErrResultPending then activity is not completed from the
 * calling workflow point of view. See documentation of activity.ErrResultPending for more info.
 * This method calls panic if activityFunc doesn't comply with the expected format.
 * Deprecated: Global activity registration methods are replaced by equivalent Worker instance methods.
 * This method is kept to maintain backward compatibility and should not be used.
 */
export async function RegisterWithOptions(activityFunc: unknown, opts: activity_RegisterOptions): Promise<void> {
  await RegisterActivityWithOptions(activityFunc, opts);
}

/**
 * GetInfo returns information about currently executing activity.
 */
export function GetInfo(ctx: Context): activity_Info {
  return GetActivityInfo(ctx);
}

/**
 * HasInfo returns if the context contains activity information
 */
export function HasInfo(ctx: Context): boolean {
  return HasActivityInfo(ctx);
}

/**
 * GetLogger returns a logger that can be used in activity
 */
export function GetLogger(ctx: Context): Logger {
	return GetActivityLogger(ctx);
}

/**
 * GetMetricsScope returns a metrics scope that can be used in activity
 */
export function GetMetricsScope(ctx: Context): Scope {
  return GetActivityMetricsScope(ctx);
}

/**
 * RecordHeartbeat sends heartbeat for the currently executing activity
 * If the activity is either cancelled (or) workflow/activity doesn't exist then we would cancel
 * the context with error context.Canceled.
 * 
 * details - the details that you provided here can be seen in the workflow when it receives TimeoutError, you
 * can check error with TimeoutType()/Details().
 */
export async function RecordHeartbeat(ctx: Context, ...details: unknown[]): Promise<void> {
  await RecordActivityHeartbeat(ctx, ...details);
}

/**
 * HasHeartbeatDetails checks if there is heartbeat details from last attempt.
 */
export function HasHeartbeatDetails(ctx: Context): boolean {
  return internal_HasHeartbeatDetails(ctx);
}

/**
 * GetHeartbeatDetails extract heartbeat details from last failed attempt. This is used in combination with retry policy.
 * An activity could be scheduled with an optional retry policy on ActivityOptions. If the activity failed then server
 * would attempt to dispatch another activity task to retry according to the retry policy. If there was heartbeat
 * details reported by activity from the failed attempt, the details would be delivered along with the activity task for
 * retry attempt. Activity could extract the details by GetHeartbeatDetails() and resume from the progress.
 * See TestActivityEnvironment.SetHeartbeatDetails() for unit test support.
 */
export function GetHeartbeatDetails(ctx: Context, ...d: unknown[]): void {
  internal_GetHeartbeatDetails(ctx, ...d);
}

/**
 * GetWorkerStopChannel returns a read-only channel. The closure of this channel indicates the activity worker is stopping.
 * When the worker is stopping, it will close this channel and wait until the worker stop timeout finishes. After the timeout
 * hit, the worker will cancel the activity context and then exit. The timeout can be defined by worker option: WorkerStopTimeout.
 * Use this channel to handle activity graceful exit when the activity worker stops.
 */
export function GetWorkerStopChannel(ctx: Context): Channel<{}> {
  return internal_GetWorkerStopChannel(ctx);
}

/**
 * ErrResultPending is returned from activity's implementation to indicate the activity is not completed when
 * activity method returns.  The Activity needs to be completed by [go.uber.org/cadence/client.Client.CompleteActivity]
 * separately.
 * 
 * For example, if an activity requires human interaction (like approving an expense report), the activity could push
 * its [Info.TaskToken] to an external system, and return [ErrResultPending].  Later on, a human can approve it, and the
 * system can use the associated token with [go.uber.org/cadence/client.Client.CompleteActivity] to finish the
 * still-"running" activity.
 * 
 * Caution: since using this frequently implies "long" timeouts, but there is no actually-running activity function
 * that can use [go.uber.org/cadence/client.Client.RecordActivityHeartbeat], activity-worker losses prior to recording
 * the [Info.TaskToken] in an external system may not be noticed until the "long" timeout occurs.  This can be resolved
 * by having another system call RecordActivityHeartbeat while that external action is running, but there is currently
 * no way to mitigate this issue without these heartbeats.
 * 
 * If you cannot heartbeat and cannot tolerate this kind of delayed-activity-loss detection, consider emulating a long
 * activity via a signal channel instead: you can start a short-lived activity and wait for a "saved to external system"
 * signal, retrying as necessary, and then wait for an "external system finished" signal containing the final result.
 */
export let ErrResultPending = internal_ErrActivityResultPending;
