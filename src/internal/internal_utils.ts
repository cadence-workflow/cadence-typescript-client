// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { internal_ActivityType } from './activity.js';
import { MetricEmitMode } from './common/metrics/emit.js';
import { TaggedScope } from './common/metrics/scope.js';
import { internal_DataConverter } from './encoded.js';
import { internal_WorkflowType } from './workflow.js';
import { Channel } from './runtime/channel.js';
import { Context, background, withTimeout } from './runtime/context.js';
import type { Scope } from './runtime/tally.js';
import { FeatureFlags as api_FeatureFlags } from '../generated/proto/cadence-idl/uber/cadence/api/v1/service_workflow.js';
import { IActivityType as shared_IActivityType, ActivityType as shared_ActivityType } from '../generated/thrift/cadence-idl/com/uber/cadence/ActivityType.js';
import { IHistoryEvent as shared_IHistoryEvent } from '../generated/thrift/cadence-idl/com/uber/cadence/HistoryEvent.js';
import { TimeoutType as shared_TimeoutType } from '../generated/thrift/cadence-idl/com/uber/cadence/TimeoutType.js';
import { IWorkflowType as shared_IWorkflowType, WorkflowType as shared_WorkflowType } from '../generated/thrift/cadence-idl/com/uber/cadence/WorkflowType.js';
import { StringPtr } from './common/convert.js';
import { NewCanceledError, NewCustomError, NewTimeoutError, errReasonCanceled, errReasonGeneric, errReasonPanic, errReasonTimeout, newPanicError, internal_GenericError, badNilErrMsgFmt, ErrorDetailsValues, internal_CanceledError, internal_CustomError, internal_PanicError, internal_TimeoutError } from './error.js';
import { newEncodedValues, EncodedValues } from './workflow_testsuite.js';
import { tagActivityType, tagWorkflowType, tagLocalActivityType } from './internal_logging_tags.js';
import * as os from 'node:os';
import { encodeArgs } from './internal_worker.js';
import * as grpc from '@grpc/grpc-js';
import { historySizeEstimationBuffer } from './internal_event_handlers.js';
import { EventType } from '../generated/thrift/cadence-idl/com/uber/cadence/EventType.js';
import { Logger } from 'winston';

export interface internal_FeatureFlags {
  WorkflowExecutionAlreadyCompletedErrorEnabled: boolean;
  AutoforwardingEnabled: boolean;
  PollerAutoScalerEnabled: boolean;
  EphemeralTaskListsEnabled: boolean;
  MetricEmitMode: MetricEmitMode;
}

/**
 * ContextBuilder stores all Channel-specific parameters that will
 * be stored inside of a context.
 */
export class contextBuilder {
  constructor(init?: Partial<contextBuilder>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  Timeout: number = 0;

  ParentContext?: Context;

  Build(): [Context, () => void] {
    let parent = this.ParentContext!;
    if (parent == null) {
      parent = background();
    }
    return withTimeout(parent, this.Timeout);
  }

}

export function fromInternalFeatureFlags(featureFlags: internal_FeatureFlags): api_FeatureFlags {
  return {
    workflowExecutionAlreadyCompletedErrorEnabled: featureFlags.WorkflowExecutionAlreadyCompletedErrorEnabled,
    autoforwardingEnabled: featureFlags.AutoforwardingEnabled,
  };
}

export function featureFlagsHeader(featureFlags: internal_FeatureFlags): string {
  const flags = fromInternalFeatureFlags(featureFlags);
  try {
    return JSON.stringify(flags) ?? "";
  } catch (err) {
    if (!(err instanceof Error)) throw err;
    return "";
  }
}

export function getYarpcCallOptions(featureFlags: internal_FeatureFlags): unknown[] {
  const metadata = new grpc.Metadata();
  metadata.set(clientFeatureFlagsHeaderName, featureFlagsHeader(featureFlags));
  return [..._yarpcCallOptions, { metadata }];
}

/**
 * sets the rpc timeout for a context
 */
export function chanTimeout(timeout: number): (p0: contextBuilder) => void | Promise<void> {
  return (b: contextBuilder): void => {
    b.Timeout = timeout;
  };
}

/**
 * newChannelContext - Get a rpc channel context for query
 */
export function newChannelContextForQuery(ctx: Context, featureFlags: internal_FeatureFlags, ...options: ((p0: contextBuilder) => void | Promise<void>)[]): [Context, () => void, unknown[]] {
  return newChannelContextHelper(ctx, true, featureFlags, ...options);
}

/**
 * newChannelContext - Get a rpc channel context
 */
export function newChannelContext(ctx: Context, featureFlags: internal_FeatureFlags, ...options: ((p0: contextBuilder) => void | Promise<void>)[]): [Context, () => void, unknown[]] {
  const [context, cancel, callOptions] = newChannelContextHelper(ctx, false, featureFlags, ...options);
  return [context, cancel, callOptions];
}

export function newChannelContextHelper(ctx: Context | undefined, isQuery: boolean, featureFlags: internal_FeatureFlags, ...options: ((p0: contextBuilder) => void | Promise<void>)[]): [Context, () => void, unknown[]] {
  let rpcTimeout = defaultRPCTimeout;
  if (ctx != null) {
    const now = Date.now() * 1_000_000;
    const [expiration, ok] = ctx.deadline();
    if (ok && expiration > now) {
      rpcTimeout = (expiration - now) / 2;
      if (rpcTimeout < minRPCTimeout) {
        rpcTimeout = minRPCTimeout;
      } else if (rpcTimeout > maxRPCTimeout && !isQuery) {
        rpcTimeout = maxRPCTimeout;
      } else if (rpcTimeout > maxQueryRPCTimeout && isQuery) {
        rpcTimeout = maxQueryRPCTimeout;
      }
    }
  }

  const builder = new contextBuilder({ Timeout: rpcTimeout });
  if (ctx != null) {
    builder.ParentContext = ctx;
  }
  for (const opt of options) {
    opt(builder);
  }

  const [builtContext, cancelFn] = builder.Build();
  return [builtContext, cancelFn, getYarpcCallOptions(featureFlags)];
}

/**
 * GetWorkerIdentity gets a default identity for the worker.
 * 
 * This contains a random UUID, generated each time it is called, to prevent identity collisions when workers share
 * other host/pid/etc information.  These alone are not guaranteed to be unique, especially when Docker is involved.
 * Take care to retrieve this only once per worker.
 */
export function getWorkerIdentity(tasklistName: string): string {
  return `${process.pid}@${getHostName()}@${tasklistName}@${globalThis.crypto.randomUUID()}`;
}

export function getHostName(): string {
  let hostName: string;
  try {
    hostName = os.hostname();
  } catch (err) {
    if (!(err instanceof Error)) throw err;
    hostName = "UnKnown";
  }
  return hostName;
}

export function getWorkerTaskList(stickyUUID: string): string {
  return `${getHostName()}:${stickyUUID}`;
}

/**
 * ActivityTypePtr makes a copy and returns the pointer to a ActivityType.
 */
export function activityTypePtr(v: internal_ActivityType): shared_IActivityType {
    return new shared_ActivityType({ name: StringPtr(v.Name) });
}

export function flowWorkflowTypeFrom(v: shared_IWorkflowType): internal_WorkflowType {
  return { Name: v.name ?? "", Path: "" };
}

/**
 * WorkflowTypePtr makes a copy and returns the pointer to a WorkflowType.
 */
export function workflowTypePtr(t: internal_WorkflowType): shared_IWorkflowType {
    return new shared_WorkflowType({ name: StringPtr(t.Name) });
}

/**
 * getErrorDetails gets reason and details.
 */
export function getErrorDetails(err: Error | null, dataConverter: internal_DataConverter | undefined): [string, Buffer] {
  if (err instanceof internal_CustomError) {
    if (err == null) {
      return [errReasonGeneric, Buffer.from(badNilErrMsgFmt.replace("%v", "<nil>"))];
    }

    let data: Buffer = Buffer.alloc(0);
    const details = err.details;
    if (details instanceof ErrorDetailsValues) {
      data = encodeArgs(dataConverter, details.value);
    } else if (details instanceof EncodedValues) {
      data = details.values ?? Buffer.alloc(0);
    } else {
      throw "unknown error type";
    }

    return [err.Reason(), data];
  }

  if (err instanceof internal_CanceledError) {
    if (err == null) {
      return [errReasonGeneric, Buffer.from(badNilErrMsgFmt.replace("%v", "<nil>"))];
    }

    let data: Buffer = Buffer.alloc(0);
    const details = err.details;
    if (details instanceof ErrorDetailsValues) {
      data = encodeArgs(dataConverter, details.value);
    } else if (details instanceof EncodedValues) {
      data = details.values ?? Buffer.alloc(0);
    } else {
      throw "unknown error type";
    }

    return [errReasonCanceled, data];
  }

  if (err instanceof internal_PanicError) {
    if (err == null) {
      return [errReasonGeneric, Buffer.from(badNilErrMsgFmt.replace("%v", "<nil>"))];
    }

    const data = encodeArgs(dataConverter, [err.Error(), err.StackTrace()]);
    return [errReasonPanic, data];
  }

  if (err instanceof internal_TimeoutError) {
    if (err == null) {
      return [errReasonGeneric, Buffer.from(badNilErrMsgFmt.replace("%v", "<nil>"))];
    }

    let data: Buffer = Buffer.alloc(0);
    const details = err.details;
    if (details instanceof ErrorDetailsValues) {
      data = encodeArgs(dataConverter, details.value);
    } else if (details instanceof EncodedValues) {
      data = details.values ?? Buffer.alloc(0);
    } else {
      throw "unknown error type";
    }

    return [`${errReasonTimeout} ${shared_TimeoutType[err.timeoutType]}`, data];
  }

  return [errReasonGeneric, Buffer.from(err!.message)];
}

/**
 * constructError construct error from reason and details sending down from server.
 */
export function constructError(reason: string, details: Buffer, dataConverter: internal_DataConverter): Error | null {
    if (reason.startsWith(errReasonTimeout)) {
        const detailsLocal = newEncodedValues(details, dataConverter);
        const timeoutType = getTimeoutTypeFromErrReason(reason);
        return NewTimeoutError(timeoutType, detailsLocal);
    }

    switch (reason) {
        case errReasonPanic: {
            const msg = { value: '' };
            const st = { value: '' };
            const detailsLocal = newEncodedValues(details, dataConverter);
            detailsLocal.Get(msg, st);
            return newPanicError(msg.value, st.value);
        }
        case errReasonGeneric:
            return new internal_GenericError({
                err: (details ?? Buffer.alloc(0)).toString(),
            });
        case errReasonCanceled: {
            const detailsLocal = newEncodedValues(details, dataConverter);
            return NewCanceledError(detailsLocal);
        }
        default: {
            const detailsLocal = newEncodedValues(details, dataConverter);
            return NewCustomError(reason, detailsLocal);
        }
    }
}

export function getKillSignal(): Channel<unknown> {
  const c = new Channel<unknown>(1);
  process.on('SIGINT', () => {
    c.trySend('SIGINT');
  });
  process.on('SIGTERM', () => {
    c.trySend('SIGTERM');
  });
  return c;
}

/**
 * getMetricsScopeForActivity return properly tagged tally scope for activity
 */
export function getMetricsScopeForActivity(ts: TaggedScope, workflowType: string, activityType: string): Scope {
  return ts.GetTaggedScope(tagWorkflowType, workflowType, tagActivityType, activityType);
}

/**
 * getMetricsScopeForLocalActivity return properly tagged tally scope for local activity
 */
export function getMetricsScopeForLocalActivity(ts: TaggedScope, workflowType: string, localActivityType: string): Scope {
  return ts.GetTaggedScope(tagWorkflowType, workflowType, tagLocalActivityType, localActivityType);
}

export function getTimeoutTypeFromErrReason(reason: string): shared_TimeoutType {
    const timeoutTypeStr = reason.slice(reason.indexOf(' ') + 1);
    const timeoutType = shared_TimeoutType[timeoutTypeStr as keyof typeof shared_TimeoutType];

    if (timeoutType === undefined || typeof timeoutType !== 'number') {
        throw new Error(`invalid timeout type: ${timeoutTypeStr}`);
    }

    return timeoutType;
}

/**
 * simple function to estimate the size of a map[string][]byte
 */
export function sizeOf(o: Record<string, Buffer>): number {
  let sum = 0;
  for (const [k, v] of Object.entries(o ?? {})) {
    sum += Buffer.byteLength(k) + v.length;
  }
  return sum;
}

/**
 * simple function to estimate the size of a string pointer
 */
export function getLengthOfStringPointer(s: string | undefined): number {
    if (s == null) {
        return 0;
    }
    return s.length;
}

export function estimateHistorySize(logger: Logger, event: shared_IHistoryEvent): number {
    let sum = historySizeEstimationBuffer;

    switch (event.eventType!) {
        case EventType.WorkflowExecutionStarted:
            if (event.workflowExecutionStartedEventAttributes != null) {
                sum += event.workflowExecutionStartedEventAttributes.input?.length ?? 0;
                sum += event.workflowExecutionStartedEventAttributes.continuedFailureDetails?.length ?? 0;
                sum += event.workflowExecutionStartedEventAttributes.lastCompletionResult?.length ?? 0;
                sum += sizeOf(event.workflowExecutionStartedEventAttributes.memo?.fields != null
                    ? Object.fromEntries(event.workflowExecutionStartedEventAttributes.memo.fields)
                    : {});
                sum += sizeOf(event.workflowExecutionStartedEventAttributes.header?.fields != null
                    ? Object.fromEntries(event.workflowExecutionStartedEventAttributes.header.fields)
                    : {});
                sum += sizeOf(event.workflowExecutionStartedEventAttributes.searchAttributes?.indexedFields != null
                    ? Object.fromEntries(event.workflowExecutionStartedEventAttributes.searchAttributes.indexedFields)
                    : {});
            }
            break;
        case EventType.WorkflowExecutionCompleted:
            if (event.workflowExecutionCompletedEventAttributes != null) {
                sum += event.workflowExecutionCompletedEventAttributes.result?.length ?? 0;
            }
            break;
        case EventType.WorkflowExecutionSignaled:
            if (event.workflowExecutionSignaledEventAttributes != null) {
                sum += event.workflowExecutionSignaledEventAttributes.input?.length ?? 0;
            }
            break;
        case EventType.WorkflowExecutionFailed:
            if (event.workflowExecutionFailedEventAttributes != null) {
                sum += event.workflowExecutionFailedEventAttributes.details?.length ?? 0;
            }
            break;
        case EventType.DecisionTaskStarted:
            if (event.decisionTaskStartedEventAttributes != null) {
                sum += getLengthOfStringPointer(event.decisionTaskStartedEventAttributes.identity);
            }
            break;
        case EventType.DecisionTaskCompleted:
            if (event.decisionTaskCompletedEventAttributes != null) {
                sum += event.decisionTaskCompletedEventAttributes.executionContext?.length ?? 0;
                sum += getLengthOfStringPointer(event.decisionTaskCompletedEventAttributes.identity);
                sum += getLengthOfStringPointer(event.decisionTaskCompletedEventAttributes.binaryChecksum);
            }
            break;
        case EventType.DecisionTaskFailed:
            if (event.decisionTaskFailedEventAttributes != null) {
                sum += event.decisionTaskFailedEventAttributes.details?.length ?? 0;
            }
            break;
        case EventType.ActivityTaskScheduled:
            if (event.activityTaskScheduledEventAttributes != null) {
                sum += event.activityTaskScheduledEventAttributes.input?.length ?? 0;
                sum += sizeOf(event.activityTaskScheduledEventAttributes.header?.fields != null
                    ? Object.fromEntries(event.activityTaskScheduledEventAttributes.header.fields)
                    : {});
            }
            break;
        case EventType.ActivityTaskStarted:
            if (event.activityTaskStartedEventAttributes != null) {
                sum += event.activityTaskStartedEventAttributes.lastFailureDetails?.length ?? 0;
            }
            break;
        case EventType.ActivityTaskCompleted:
            if (event.activityTaskCompletedEventAttributes != null) {
                sum += event.activityTaskCompletedEventAttributes.result?.length ?? 0;
                sum += getLengthOfStringPointer(event.activityTaskCompletedEventAttributes.identity);
            }
            break;
        case EventType.ActivityTaskFailed:
            if (event.activityTaskFailedEventAttributes != null) {
                sum += event.activityTaskFailedEventAttributes.details?.length ?? 0;
            }
            break;
        case EventType.ActivityTaskTimedOut:
            if (event.activityTaskTimedOutEventAttributes != null) {
                sum += event.activityTaskTimedOutEventAttributes.details?.length ?? 0;
                sum += event.activityTaskTimedOutEventAttributes.lastFailureDetails?.length ?? 0;
            }
            break;
        case EventType.ActivityTaskCanceled:
            if (event.activityTaskCanceledEventAttributes != null) {
                sum += event.activityTaskCanceledEventAttributes.details?.length ?? 0;
            }
            break;
        case EventType.MarkerRecorded:
            if (event.markerRecordedEventAttributes != null) {
                sum += event.markerRecordedEventAttributes.details?.length ?? 0;
            }
            break;
        case EventType.WorkflowExecutionTerminated:
            if (event.workflowExecutionTerminatedEventAttributes != null) {
                sum += event.workflowExecutionTerminatedEventAttributes.details?.length ?? 0;
            }
            break;
        case EventType.WorkflowExecutionCanceled:
            if (event.workflowExecutionCanceledEventAttributes != null) {
                sum += event.workflowExecutionCanceledEventAttributes.details?.length ?? 0;
            }
            break;
        case EventType.WorkflowExecutionContinuedAsNew:
            if (event.workflowExecutionContinuedAsNewEventAttributes != null) {
                sum += event.workflowExecutionContinuedAsNewEventAttributes.input?.length ?? 0;
                sum += event.workflowExecutionContinuedAsNewEventAttributes.failureDetails?.length ?? 0;
                sum += event.workflowExecutionContinuedAsNewEventAttributes.lastCompletionResult?.length ?? 0;
                sum += sizeOf(event.workflowExecutionContinuedAsNewEventAttributes.memo?.fields != null
                    ? Object.fromEntries(event.workflowExecutionContinuedAsNewEventAttributes.memo.fields)
                    : {});
                sum += sizeOf(event.workflowExecutionContinuedAsNewEventAttributes.header?.fields != null
                    ? Object.fromEntries(event.workflowExecutionContinuedAsNewEventAttributes.header.fields)
                    : {});
                sum += sizeOf(event.workflowExecutionContinuedAsNewEventAttributes.searchAttributes?.indexedFields != null
                    ? Object.fromEntries(event.workflowExecutionContinuedAsNewEventAttributes.searchAttributes.indexedFields)
                    : {});
            }
            break;
        case EventType.StartChildWorkflowExecutionInitiated:
            if (event.startChildWorkflowExecutionInitiatedEventAttributes != null) {
                sum += event.startChildWorkflowExecutionInitiatedEventAttributes.input?.length ?? 0;
                sum += event.startChildWorkflowExecutionInitiatedEventAttributes.control?.length ?? 0;
                sum += sizeOf(event.startChildWorkflowExecutionInitiatedEventAttributes.memo?.fields != null
                    ? Object.fromEntries(event.startChildWorkflowExecutionInitiatedEventAttributes.memo.fields)
                    : {});
                sum += sizeOf(event.startChildWorkflowExecutionInitiatedEventAttributes.header?.fields != null
                    ? Object.fromEntries(event.startChildWorkflowExecutionInitiatedEventAttributes.header.fields)
                    : {});
                sum += sizeOf(event.startChildWorkflowExecutionInitiatedEventAttributes.searchAttributes?.indexedFields != null
                    ? Object.fromEntries(event.startChildWorkflowExecutionInitiatedEventAttributes.searchAttributes.indexedFields)
                    : {});
            }
            break;
        case EventType.ChildWorkflowExecutionCompleted:
            if (event.childWorkflowExecutionCompletedEventAttributes != null) {
                sum += event.childWorkflowExecutionCompletedEventAttributes.result?.length ?? 0;
            }
            break;
        case EventType.ChildWorkflowExecutionFailed:
            if (event.childWorkflowExecutionFailedEventAttributes != null) {
                sum += event.childWorkflowExecutionFailedEventAttributes.details?.length ?? 0;
                sum += getLengthOfStringPointer(event.childWorkflowExecutionFailedEventAttributes.reason);
            }
            break;
        case EventType.ChildWorkflowExecutionCanceled:
            if (event.childWorkflowExecutionCanceledEventAttributes != null) {
                sum += event.childWorkflowExecutionCanceledEventAttributes.details?.length ?? 0;
            }
            break;
        case EventType.SignalExternalWorkflowExecutionInitiated:
            if (event.signalExternalWorkflowExecutionInitiatedEventAttributes != null) {
                sum += event.signalExternalWorkflowExecutionInitiatedEventAttributes.control?.length ?? 0;
                sum += event.signalExternalWorkflowExecutionInitiatedEventAttributes.input?.length ?? 0;
            }
            break;
        default:
            logger.debug("unsupported event type for history size estimation", {
                "Event Type": EventType[event.eventType!]
            });
    }

    return sum;
}

/**
 * callerTypeHeaderName refers to the name of the header that contains the caller type
 */
export const callerTypeHeaderName = "cadence-caller-type";

export const callerTypeHeaderValue = "sdk";

export const clientFeatureFlagsHeaderName = "cadence-client-feature-flags";

/**
 * clientImplHeaderName refers to the name of the
 * header that contains the client implementation
 */
export const clientImplHeaderName = "cadence-client-name";

export const clientImplHeaderValue = "uber-go";

/**
 * defaultRPCTimeout is the default tchannel rpc call timeout
 */
export const defaultRPCTimeout = 10000000000;

/**
 * featureVersionHeaderName refers to the name of the
 * tchannel / http header that contains the client
 * feature version
 */
export const featureVersionHeaderName = "cadence-client-feature-version";

/**
 * libraryVersionHeaderName refers to the name of the
 * tchannel / http header that contains the client
 * library version
 */
export const libraryVersionHeaderName = "cadence-client-library-version";

/**
 * maxQueryRPCTimeout is the maximum rpc call timeout allowed for query
 */
export const maxQueryRPCTimeout = 20000000000;

/**
 * maxRPCTimeout is maximum rpc call timeout allowed
 */
export const maxRPCTimeout = 5000000000;

/**
 * minRPCTimeout is minimum rpc call timeout allowed
 */
export const minRPCTimeout = 1000000000;

/**
 * call header to cadence server
 */
export let _yarpcCallOptions = [];
