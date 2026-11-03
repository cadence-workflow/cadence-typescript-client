// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { BytesBuffer } from '../../runtime/bytes_buffer.js';
import { goSprint, goStructEntries, isByteSlice, isByteSliceTarget } from '../../runtime/reflect.js';
import { IDecision as shared_IDecision } from '../../../generated/thrift/cadence-idl/com/uber/cadence/Decision.js';
import { IHistoryEvent as shared_IHistoryEvent } from '../../../generated/thrift/cadence-idl/com/uber/cadence/HistoryEvent.js';

export function anyToString(d: unknown): string {
  if (d !== null && typeof d === 'object' && 'value' in d) {
    return anyToString((d as { value: unknown }).value);
  }

  if (
    d !== null &&
    typeof d === 'object' &&
    !Array.isArray(d) &&
    !(d instanceof Map)
  ) {
    const buf = new BytesBuffer();
    buf.WriteString('(');

    for (const [name, field] of goStructEntries(d)) {
      if (field === null || field === undefined) {
        continue;
      }

      const fieldValue = valueToString(field);
      if (fieldValue.length === 0) {
        continue;
      }

      if (buf.Len() > 1) {
        buf.WriteString(', ');
      }
      buf.WriteString(`${name}:${fieldValue}`);
    }

    buf.WriteString(')');
    return buf.String();
  }

  return goSprint(d);
}

export function valueToString(v: unknown): string {
  if (v === null || v === undefined) {
    return "";
  }

  if (
    typeof v === "object" &&
    !Array.isArray(v) &&
    !isByteSlice(v) &&
    Object.prototype.hasOwnProperty.call(v, "value")
  ) {
    return valueToString((v as { value: unknown }).value);
  }

  if (isByteSlice(v)) {
    return `[${new TextDecoder().decode(v as Uint8Array)}]`;
  }

  if (Array.isArray(v)) {
    return `[len=${v.length}]`;
  }

  if (typeof v === "object") {
    return anyToString(v);
  }

  return goSprint(v);
}

/**
 * HistoryEventToString convert HistoryEvent to string
 */
export function HistoryEventToString(e: shared_IHistoryEvent): string {
    const data = getHistoryEventData(e);
    const eventTypeNames = [
        'WorkflowExecutionStarted',
        'WorkflowExecutionCompleted',
        'WorkflowExecutionFailed',
        'WorkflowExecutionTimedOut',
        'DecisionTaskScheduled',
        'DecisionTaskStarted',
        'DecisionTaskCompleted',
        'DecisionTaskTimedOut',
        'DecisionTaskFailed',
        'ActivityTaskScheduled',
        'ActivityTaskStarted',
        'ActivityTaskCompleted',
        'ActivityTaskFailed',
        'ActivityTaskTimedOut',
        'ActivityTaskCancelRequested',
        'RequestCancelActivityTaskFailed',
        'ActivityTaskCanceled',
        'TimerStarted',
        'TimerFired',
        'CancelTimerFailed',
        'TimerCanceled',
        'WorkflowExecutionCancelRequested',
        'WorkflowExecutionCanceled',
        'RequestCancelExternalWorkflowExecutionInitiated',
        'RequestCancelExternalWorkflowExecutionFailed',
        'ExternalWorkflowExecutionCancelRequested',
        'MarkerRecorded',
        'WorkflowExecutionSignaled',
        'WorkflowExecutionTerminated',
        'WorkflowExecutionContinuedAsNew',
        'StartChildWorkflowExecutionInitiated',
        'StartChildWorkflowExecutionFailed',
        'ChildWorkflowExecutionStarted',
        'ChildWorkflowExecutionCompleted',
        'ChildWorkflowExecutionFailed',
        'ChildWorkflowExecutionCanceled',
        'ChildWorkflowExecutionTimedOut',
        'ChildWorkflowExecutionTerminated',
        'SignalExternalWorkflowExecutionInitiated',
        'SignalExternalWorkflowExecutionFailed',
        'ExternalWorkflowExecutionSignaled',
        'UpsertWorkflowSearchAttributes',
    ];

    return `${eventTypeNames[e.eventType!]}: ${anyToString(data)}`;
}

export function getHistoryEventData(e: shared_IHistoryEvent): unknown {
    switch (e.eventType ?? 0) {
        case 0:
            return e.workflowExecutionStartedEventAttributes;
        case 1:
            return e.workflowExecutionCompletedEventAttributes;
        case 2:
            return e.workflowExecutionFailedEventAttributes;
        case 3:
            return e.workflowExecutionTimedOutEventAttributes;
        case 4:
            return e.decisionTaskScheduledEventAttributes;
        case 5:
            return e.decisionTaskStartedEventAttributes;
        case 6:
            return e.decisionTaskCompletedEventAttributes;
        case 7:
            return e.decisionTaskTimedOutEventAttributes;
        case 9:
            return e.activityTaskScheduledEventAttributes;
        case 10:
            return e.activityTaskStartedEventAttributes;
        case 11:
            return e.activityTaskCompletedEventAttributes;
        case 12:
            return e.activityTaskFailedEventAttributes;
        case 13:
            return e.activityTaskTimedOutEventAttributes;
        case 14:
            return e.activityTaskCancelRequestedEventAttributes;
        case 15:
            return e.requestCancelActivityTaskFailedEventAttributes;
        case 16:
            return e.activityTaskCanceledEventAttributes;
        case 17:
            return e.timerStartedEventAttributes;
        case 18:
            return e.timerFiredEventAttributes;
        case 19:
            return e.cancelTimerFailedEventAttributes;
        case 20:
            return e.timerCanceledEventAttributes;
        case 26:
            return e.markerRecordedEventAttributes;
        case 28:
            return e.workflowExecutionTerminatedEventAttributes;
        default:
            return e;
    }
}

/**
 * DecisionToString convert Decision to string
 */
export function DecisionToString(d: shared_IDecision): string {
    const data = decisionGetData(d);
    const decisionTypeNames: Record<number, string> = {
        0: "ScheduleActivityTask",
        1: "RequestCancelActivityTask",
        2: "StartTimer",
        3: "CompleteWorkflowExecution",
        4: "FailWorkflowExecution",
        5: "CancelTimer",
        6: "CancelWorkflowExecution",
        7: "RequestCancelExternalWorkflowExecution",
        8: "RecordMarker",
        9: "ContinueAsNewWorkflowExecution",
        10: "StartChildWorkflowExecution",
        11: "SignalExternalWorkflowExecution",
        12: "UpsertWorkflowSearchAttributes",
    };

    return decisionTypeNames[d.decisionType!] + ": " + anyToString(data);
}

export function decisionGetData(d: shared_IDecision): unknown {
    switch (d.decisionType) {
        case 0:
            return d.scheduleActivityTaskDecisionAttributes;
        case 1:
            return d.requestCancelActivityTaskDecisionAttributes;
        case 2:
            return d.startTimerDecisionAttributes;
        case 5:
            return d.cancelTimerDecisionAttributes;
        case 3:
            return d.completeWorkflowExecutionDecisionAttributes;
        case 4:
            return d.failWorkflowExecutionDecisionAttributes;
        case 8:
            return d.recordMarkerDecisionAttributes;
        default:
            return d;
    }
}
