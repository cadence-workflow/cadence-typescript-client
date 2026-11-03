// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { internal_ActivityOptions, internal_LocalActivityOptions } from '../internal/activity.js';
import { internal_RetryPolicy } from '../internal/client.js';
import { workflow_Context } from './context.js';
import { GetActivityOptions as internal_GetActivityOptions, GetActivityTaskList as internal_GetActivityTaskList, WithHeartbeatTimeout as internal_WithHeartbeatTimeout, WithRetryPolicy as internal_WithRetryPolicy, WithActivityOptions as internal_WithActivityOptions, WithWaitForCancellation as internal_WithWaitForCancellation, WithScheduleToCloseTimeout as internal_WithScheduleToCloseTimeout, WithLocalActivityOptions as internal_WithLocalActivityOptions, WithStartToCloseTimeout as internal_WithStartToCloseTimeout, WithTaskList as internal_WithTaskList, WithScheduleToStartTimeout as internal_WithScheduleToStartTimeout } from '../internal/workflow.js';
import { GetInfo } from './workflow.js';

/**
 * ActivityOptions stores all activity-specific invocation parameters that will be stored inside of a context.
 */
export type workflow_ActivityOptions = internal_ActivityOptions;

/**
 * LocalActivityOptions doc
 */
export type workflow_LocalActivityOptions = internal_LocalActivityOptions;

/**
 * RetryPolicy specify how to retry activity if error happens.
 */
export type workflow_RetryPolicy = internal_RetryPolicy;

/**
 * WithActivityOptions makes a copy of the context and adds the
 * passed in options to the context. If an activity options exists,
 * it will be overwritten by the passed in value as a whole.
 * So specify all the values in the options as necessary, as values
 * in the existing context options will not be carried over.
 */
export function WithActivityOptions(ctx: workflow_Context, options: workflow_ActivityOptions): workflow_Context {
	return internal_WithActivityOptions(ctx, options);
}

/**
 * WithLocalActivityOptions makes a copy of the context and adds the
 * passed in options to the context. If a local activity options exists,
 * it will be overwritten by the passed in value.
 */
export function WithLocalActivityOptions(ctx: workflow_Context, options: workflow_LocalActivityOptions): workflow_Context {
  return internal_WithLocalActivityOptions(ctx, options);
}

/**
 * WithTaskList makes a copy of the current context and update the taskList
 * field in its activity options. An empty activity options will be created
 * if it does not exist in the original context.
 */
export function WithTaskList(ctx: workflow_Context, name: string): workflow_Context {
	return internal_WithTaskList(ctx, name);
}

/**
 * GetActivityTaskList returns tasklist in the Context's current ActivityOptions,
 * or workflow.GetInfo(ctx).TaskListName if not set or empty
 */
export function GetActivityTaskList(ctx: workflow_Context): string {
  const tl = internal_GetActivityTaskList(ctx);
  if (tl != null && tl !== "") {
    return tl;
  }
  return GetInfo(ctx).TaskListName;
}

/**
 * GetActivityOptions returns the current ActivityOptions from the context.
 * Returns nil if no activity options have been set on the context.
 */
export function GetActivityOptions(ctx: workflow_Context): workflow_ActivityOptions {
  return internal_GetActivityOptions(ctx)!;
}

/**
 * WithScheduleToCloseTimeout makes a copy of the current context and update
 * the ScheduleToCloseTimeout field in its activity options. An empty activity
 * options will be created if it does not exist in the original context.
 * 
 * Cadence time resolution is in seconds and the library uses math.Ceil(d.Seconds())
 * to calculate the final value. This is subject to change in the future.
 */
export function WithScheduleToCloseTimeout(ctx: workflow_Context, d: number): workflow_Context {
	return internal_WithScheduleToCloseTimeout(ctx, d);
}

/**
 * WithScheduleToStartTimeout makes a copy of the current context and update
 * the ScheduleToStartTimeout field in its activity options. An empty activity
 * options will be created if it does not exist in the original context.
 * 
 * Cadence time resolution is in seconds and the library uses math.Ceil(d.Seconds())
 * to calculate the final value. This is subject to change in the future.
 */
export function WithScheduleToStartTimeout(ctx: workflow_Context, d: number): workflow_Context {
  return internal_WithScheduleToStartTimeout(ctx, d);
}

/**
 * WithStartToCloseTimeout makes a copy of the current context and update
 * the StartToCloseTimeout field in its activity options. An empty activity
 * options will be created if it does not exist in the original context.
 * 
 * Cadence time resolution is in seconds and the library uses math.Ceil(d.Seconds())
 * to calculate the final value. This is subject to change in the future.
 */
export function WithStartToCloseTimeout(ctx: workflow_Context, d: number): workflow_Context {
  return internal_WithStartToCloseTimeout(ctx, d);
}

/**
 * WithHeartbeatTimeout makes a copy of the current context and update
 * the HeartbeatTimeout field in its activity options. An empty activity
 * options will be created if it does not exist in the original context.
 * 
 * Cadence time resolution is in seconds and the library uses math.Ceil(d.Seconds())
 * to calculate the final value. This is subject to change in the future.
 */
export function WithHeartbeatTimeout(ctx: workflow_Context, d: number): workflow_Context {
    return internal_WithHeartbeatTimeout(ctx, d);
}

/**
 * WithWaitForCancellation makes a copy of the current context and update
 * the WaitForCancellation field in its activity options. An empty activity
 * options will be created if it does not exist in the original context.
 */
export function WithWaitForCancellation(ctx: workflow_Context, wait: boolean): workflow_Context {
  return internal_WithWaitForCancellation(ctx, wait);
}

/**
 * WithRetryPolicy makes a copy of the current context and update
 * the RetryPolicy field in its activity options. An empty activity
 * options will be created if it does not exist in the original context.
 */
export function WithRetryPolicy(ctx: workflow_Context, retryPolicy: workflow_RetryPolicy): workflow_Context {
  return internal_WithRetryPolicy(ctx, retryPolicy);
}
