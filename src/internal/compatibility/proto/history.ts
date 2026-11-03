import { ActivityTaskCancelRequestedEventAttributes as api_ActivityTaskCancelRequestedEventAttributes, ActivityTaskCanceledEventAttributes as api_ActivityTaskCanceledEventAttributes, ActivityTaskCompletedEventAttributes as api_ActivityTaskCompletedEventAttributes, ActivityTaskFailedEventAttributes as api_ActivityTaskFailedEventAttributes, ActivityTaskScheduledEventAttributes as api_ActivityTaskScheduledEventAttributes, ActivityTaskStartedEventAttributes as api_ActivityTaskStartedEventAttributes, ActivityTaskTimedOutEventAttributes as api_ActivityTaskTimedOutEventAttributes, CancelTimerFailedEventAttributes as api_CancelTimerFailedEventAttributes, ChildWorkflowExecutionCanceledEventAttributes as api_ChildWorkflowExecutionCanceledEventAttributes, ChildWorkflowExecutionCompletedEventAttributes as api_ChildWorkflowExecutionCompletedEventAttributes, ChildWorkflowExecutionFailedEventAttributes as api_ChildWorkflowExecutionFailedEventAttributes, ChildWorkflowExecutionStartedEventAttributes as api_ChildWorkflowExecutionStartedEventAttributes, ChildWorkflowExecutionTerminatedEventAttributes as api_ChildWorkflowExecutionTerminatedEventAttributes, ChildWorkflowExecutionTimedOutEventAttributes as api_ChildWorkflowExecutionTimedOutEventAttributes, DecisionTaskCompletedEventAttributes as api_DecisionTaskCompletedEventAttributes, DecisionTaskFailedEventAttributes as api_DecisionTaskFailedEventAttributes, DecisionTaskScheduledEventAttributes as api_DecisionTaskScheduledEventAttributes, DecisionTaskStartedEventAttributes as api_DecisionTaskStartedEventAttributes, DecisionTaskTimedOutEventAttributes as api_DecisionTaskTimedOutEventAttributes, ExternalWorkflowExecutionCancelRequestedEventAttributes as api_ExternalWorkflowExecutionCancelRequestedEventAttributes, ExternalWorkflowExecutionSignaledEventAttributes as api_ExternalWorkflowExecutionSignaledEventAttributes, History as api_History, HistoryEvent as api_HistoryEvent, MarkerRecordedEventAttributes as api_MarkerRecordedEventAttributes, RequestCancelActivityTaskFailedEventAttributes as api_RequestCancelActivityTaskFailedEventAttributes, RequestCancelExternalWorkflowExecutionFailedEventAttributes as api_RequestCancelExternalWorkflowExecutionFailedEventAttributes, RequestCancelExternalWorkflowExecutionInitiatedEventAttributes as api_RequestCancelExternalWorkflowExecutionInitiatedEventAttributes, SignalExternalWorkflowExecutionFailedEventAttributes as api_SignalExternalWorkflowExecutionFailedEventAttributes, SignalExternalWorkflowExecutionInitiatedEventAttributes as api_SignalExternalWorkflowExecutionInitiatedEventAttributes, StartChildWorkflowExecutionFailedEventAttributes as api_StartChildWorkflowExecutionFailedEventAttributes, StartChildWorkflowExecutionInitiatedEventAttributes as api_StartChildWorkflowExecutionInitiatedEventAttributes, TimerCanceledEventAttributes as api_TimerCanceledEventAttributes, TimerFiredEventAttributes as api_TimerFiredEventAttributes, TimerStartedEventAttributes as api_TimerStartedEventAttributes, UpsertWorkflowSearchAttributesEventAttributes as api_UpsertWorkflowSearchAttributesEventAttributes, WorkflowExecutionCancelRequestedEventAttributes as api_WorkflowExecutionCancelRequestedEventAttributes, WorkflowExecutionCanceledEventAttributes as api_WorkflowExecutionCanceledEventAttributes, WorkflowExecutionCompletedEventAttributes as api_WorkflowExecutionCompletedEventAttributes, WorkflowExecutionContinuedAsNewEventAttributes as api_WorkflowExecutionContinuedAsNewEventAttributes, WorkflowExecutionFailedEventAttributes as api_WorkflowExecutionFailedEventAttributes, WorkflowExecutionSignaledEventAttributes as api_WorkflowExecutionSignaledEventAttributes, WorkflowExecutionStartedEventAttributes as api_WorkflowExecutionStartedEventAttributes, WorkflowExecutionTerminatedEventAttributes as api_WorkflowExecutionTerminatedEventAttributes, WorkflowExecutionTimedOutEventAttributes as api_WorkflowExecutionTimedOutEventAttributes } from '../../../generated/proto/cadence-idl/uber/cadence/api/v1/history.js';
import { IActivityTaskCancelRequestedEventAttributes as shared_IActivityTaskCancelRequestedEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ActivityTaskCancelRequestedEventAttributes.js';
import { IActivityTaskCanceledEventAttributes as shared_IActivityTaskCanceledEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ActivityTaskCanceledEventAttributes.js';
import { IActivityTaskCompletedEventAttributes as shared_IActivityTaskCompletedEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ActivityTaskCompletedEventAttributes.js';
import { IActivityTaskFailedEventAttributes as shared_IActivityTaskFailedEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ActivityTaskFailedEventAttributes.js';
import { IActivityTaskScheduledEventAttributes as shared_IActivityTaskScheduledEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ActivityTaskScheduledEventAttributes.js';
import { IActivityTaskStartedEventAttributes as shared_IActivityTaskStartedEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ActivityTaskStartedEventAttributes.js';
import { IActivityTaskTimedOutEventAttributes as shared_IActivityTaskTimedOutEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ActivityTaskTimedOutEventAttributes.js';
import { ICancelTimerFailedEventAttributes as shared_ICancelTimerFailedEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/CancelTimerFailedEventAttributes.js';
import { IChildWorkflowExecutionCanceledEventAttributes as shared_IChildWorkflowExecutionCanceledEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ChildWorkflowExecutionCanceledEventAttributes.js';
import { IChildWorkflowExecutionCompletedEventAttributes as shared_IChildWorkflowExecutionCompletedEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ChildWorkflowExecutionCompletedEventAttributes.js';
import { IChildWorkflowExecutionFailedEventAttributes as shared_IChildWorkflowExecutionFailedEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ChildWorkflowExecutionFailedEventAttributes.js';
import { IChildWorkflowExecutionStartedEventAttributes as shared_IChildWorkflowExecutionStartedEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ChildWorkflowExecutionStartedEventAttributes.js';
import { IChildWorkflowExecutionTerminatedEventAttributes as shared_IChildWorkflowExecutionTerminatedEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ChildWorkflowExecutionTerminatedEventAttributes.js';
import { IChildWorkflowExecutionTimedOutEventAttributes as shared_IChildWorkflowExecutionTimedOutEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ChildWorkflowExecutionTimedOutEventAttributes.js';
import { IDecisionTaskCompletedEventAttributes as shared_IDecisionTaskCompletedEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/DecisionTaskCompletedEventAttributes.js';
import { IDecisionTaskFailedEventAttributes as shared_IDecisionTaskFailedEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/DecisionTaskFailedEventAttributes.js';
import { IDecisionTaskScheduledEventAttributes as shared_IDecisionTaskScheduledEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/DecisionTaskScheduledEventAttributes.js';
import { IDecisionTaskStartedEventAttributes as shared_IDecisionTaskStartedEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/DecisionTaskStartedEventAttributes.js';
import { IDecisionTaskTimedOutEventAttributes as shared_IDecisionTaskTimedOutEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/DecisionTaskTimedOutEventAttributes.js';
import { IExternalWorkflowExecutionCancelRequestedEventAttributes as shared_IExternalWorkflowExecutionCancelRequestedEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ExternalWorkflowExecutionCancelRequestedEventAttributes.js';
import { IExternalWorkflowExecutionSignaledEventAttributes as shared_IExternalWorkflowExecutionSignaledEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ExternalWorkflowExecutionSignaledEventAttributes.js';
import { IHistory as shared_IHistory } from '../../../generated/thrift/cadence-idl/com/uber/cadence/History.js';
import { IHistoryEvent as shared_IHistoryEvent } from '../../../generated/thrift/cadence-idl/com/uber/cadence/HistoryEvent.js';
import { IMarkerRecordedEventAttributes as shared_IMarkerRecordedEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/MarkerRecordedEventAttributes.js';
import { IRequestCancelActivityTaskFailedEventAttributes as shared_IRequestCancelActivityTaskFailedEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/RequestCancelActivityTaskFailedEventAttributes.js';
import { IRequestCancelExternalWorkflowExecutionFailedEventAttributes as shared_IRequestCancelExternalWorkflowExecutionFailedEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/RequestCancelExternalWorkflowExecutionFailedEventAttributes.js';
import { IRequestCancelExternalWorkflowExecutionInitiatedEventAttributes as shared_IRequestCancelExternalWorkflowExecutionInitiatedEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/RequestCancelExternalWorkflowExecutionInitiatedEventAttributes.js';
import { ISignalExternalWorkflowExecutionFailedEventAttributes as shared_ISignalExternalWorkflowExecutionFailedEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/SignalExternalWorkflowExecutionFailedEventAttributes.js';
import { ISignalExternalWorkflowExecutionInitiatedEventAttributes as shared_ISignalExternalWorkflowExecutionInitiatedEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/SignalExternalWorkflowExecutionInitiatedEventAttributes.js';
import { IStartChildWorkflowExecutionFailedEventAttributes as shared_IStartChildWorkflowExecutionFailedEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/StartChildWorkflowExecutionFailedEventAttributes.js';
import { IStartChildWorkflowExecutionInitiatedEventAttributes as shared_IStartChildWorkflowExecutionInitiatedEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/StartChildWorkflowExecutionInitiatedEventAttributes.js';
import { ITimerCanceledEventAttributes as shared_ITimerCanceledEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/TimerCanceledEventAttributes.js';
import { ITimerFiredEventAttributes as shared_ITimerFiredEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/TimerFiredEventAttributes.js';
import { ITimerStartedEventAttributes as shared_ITimerStartedEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/TimerStartedEventAttributes.js';
import { IUpsertWorkflowSearchAttributesEventAttributes as shared_IUpsertWorkflowSearchAttributesEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/UpsertWorkflowSearchAttributesEventAttributes.js';
import { IWorkflowExecutionCancelRequestedEventAttributes as shared_IWorkflowExecutionCancelRequestedEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/WorkflowExecutionCancelRequestedEventAttributes.js';
import { IWorkflowExecutionCanceledEventAttributes as shared_IWorkflowExecutionCanceledEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/WorkflowExecutionCanceledEventAttributes.js';
import { IWorkflowExecutionCompletedEventAttributes as shared_IWorkflowExecutionCompletedEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/WorkflowExecutionCompletedEventAttributes.js';
import { IWorkflowExecutionContinuedAsNewEventAttributes as shared_IWorkflowExecutionContinuedAsNewEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/WorkflowExecutionContinuedAsNewEventAttributes.js';
import { IWorkflowExecutionFailedEventAttributes as shared_IWorkflowExecutionFailedEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/WorkflowExecutionFailedEventAttributes.js';
import { IWorkflowExecutionSignaledEventAttributes as shared_IWorkflowExecutionSignaledEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/WorkflowExecutionSignaledEventAttributes.js';
import { IWorkflowExecutionStartedEventAttributes as shared_IWorkflowExecutionStartedEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/WorkflowExecutionStartedEventAttributes.js';
import { IWorkflowExecutionTerminatedEventAttributes as shared_IWorkflowExecutionTerminatedEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/WorkflowExecutionTerminatedEventAttributes.js';
import { IWorkflowExecutionTimedOutEventAttributes as shared_IWorkflowExecutionTimedOutEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/WorkflowExecutionTimedOutEventAttributes.js';

// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
export function History(t: shared_IHistory | undefined): api_History | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function HistoryEventArray(t: shared_IHistoryEvent[] | undefined): api_HistoryEvent[] {
  throw new globalThis.Error("not implemented"); // @stub
}

export function HistoryEvent(e: shared_IHistoryEvent | undefined): api_HistoryEvent | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ActivityTaskCancelRequestedEventAttributes(t: shared_IActivityTaskCancelRequestedEventAttributes | undefined): api_ActivityTaskCancelRequestedEventAttributes | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ActivityTaskCanceledEventAttributes(t: shared_IActivityTaskCanceledEventAttributes | undefined): api_ActivityTaskCanceledEventAttributes | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ActivityTaskCompletedEventAttributes(t: shared_IActivityTaskCompletedEventAttributes | undefined): api_ActivityTaskCompletedEventAttributes | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ActivityTaskFailedEventAttributes(t: shared_IActivityTaskFailedEventAttributes | undefined): api_ActivityTaskFailedEventAttributes | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ActivityTaskScheduledEventAttributes(t: shared_IActivityTaskScheduledEventAttributes | undefined): api_ActivityTaskScheduledEventAttributes | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ActivityTaskStartedEventAttributes(t: shared_IActivityTaskStartedEventAttributes | undefined): api_ActivityTaskStartedEventAttributes | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ActivityTaskTimedOutEventAttributes(t: shared_IActivityTaskTimedOutEventAttributes | undefined): api_ActivityTaskTimedOutEventAttributes | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function CancelTimerFailedEventAttributes(t: shared_ICancelTimerFailedEventAttributes | undefined): api_CancelTimerFailedEventAttributes | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ChildWorkflowExecutionCanceledEventAttributes(t: shared_IChildWorkflowExecutionCanceledEventAttributes | undefined): api_ChildWorkflowExecutionCanceledEventAttributes | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ChildWorkflowExecutionCompletedEventAttributes(t: shared_IChildWorkflowExecutionCompletedEventAttributes | undefined): api_ChildWorkflowExecutionCompletedEventAttributes | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ChildWorkflowExecutionFailedEventAttributes(t: shared_IChildWorkflowExecutionFailedEventAttributes | undefined): api_ChildWorkflowExecutionFailedEventAttributes | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ChildWorkflowExecutionStartedEventAttributes(t: shared_IChildWorkflowExecutionStartedEventAttributes | undefined): api_ChildWorkflowExecutionStartedEventAttributes | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ChildWorkflowExecutionTerminatedEventAttributes(t: shared_IChildWorkflowExecutionTerminatedEventAttributes | undefined): api_ChildWorkflowExecutionTerminatedEventAttributes | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ChildWorkflowExecutionTimedOutEventAttributes(t: shared_IChildWorkflowExecutionTimedOutEventAttributes | undefined): api_ChildWorkflowExecutionTimedOutEventAttributes | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function DecisionTaskFailedEventAttributes(t: shared_IDecisionTaskFailedEventAttributes | undefined): api_DecisionTaskFailedEventAttributes | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function DecisionTaskScheduledEventAttributes(t: shared_IDecisionTaskScheduledEventAttributes | undefined): api_DecisionTaskScheduledEventAttributes | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function DecisionTaskStartedEventAttributes(t: shared_IDecisionTaskStartedEventAttributes | undefined): api_DecisionTaskStartedEventAttributes | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function DecisionTaskCompletedEventAttributes(t: shared_IDecisionTaskCompletedEventAttributes | undefined): api_DecisionTaskCompletedEventAttributes | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function DecisionTaskTimedOutEventAttributes(t: shared_IDecisionTaskTimedOutEventAttributes | undefined): api_DecisionTaskTimedOutEventAttributes | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ExternalWorkflowExecutionCancelRequestedEventAttributes(t: shared_IExternalWorkflowExecutionCancelRequestedEventAttributes | undefined): api_ExternalWorkflowExecutionCancelRequestedEventAttributes | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ExternalWorkflowExecutionSignaledEventAttributes(t: shared_IExternalWorkflowExecutionSignaledEventAttributes | undefined): api_ExternalWorkflowExecutionSignaledEventAttributes | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function MarkerRecordedEventAttributes(t: shared_IMarkerRecordedEventAttributes | undefined): api_MarkerRecordedEventAttributes | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function RequestCancelActivityTaskFailedEventAttributes(t: shared_IRequestCancelActivityTaskFailedEventAttributes | undefined): api_RequestCancelActivityTaskFailedEventAttributes | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function RequestCancelExternalWorkflowExecutionFailedEventAttributes(t: shared_IRequestCancelExternalWorkflowExecutionFailedEventAttributes | undefined): api_RequestCancelExternalWorkflowExecutionFailedEventAttributes | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function RequestCancelExternalWorkflowExecutionInitiatedEventAttributes(t: shared_IRequestCancelExternalWorkflowExecutionInitiatedEventAttributes | undefined): api_RequestCancelExternalWorkflowExecutionInitiatedEventAttributes | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function SignalExternalWorkflowExecutionFailedEventAttributes(t: shared_ISignalExternalWorkflowExecutionFailedEventAttributes | undefined): api_SignalExternalWorkflowExecutionFailedEventAttributes | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function SignalExternalWorkflowExecutionInitiatedEventAttributes(t: shared_ISignalExternalWorkflowExecutionInitiatedEventAttributes | undefined): api_SignalExternalWorkflowExecutionInitiatedEventAttributes | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function StartChildWorkflowExecutionFailedEventAttributes(t: shared_IStartChildWorkflowExecutionFailedEventAttributes | undefined): api_StartChildWorkflowExecutionFailedEventAttributes | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function StartChildWorkflowExecutionInitiatedEventAttributes(t: shared_IStartChildWorkflowExecutionInitiatedEventAttributes | undefined): api_StartChildWorkflowExecutionInitiatedEventAttributes | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function TimerCanceledEventAttributes(t: shared_ITimerCanceledEventAttributes | undefined): api_TimerCanceledEventAttributes | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function TimerFiredEventAttributes(t: shared_ITimerFiredEventAttributes | undefined): api_TimerFiredEventAttributes | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function TimerStartedEventAttributes(t: shared_ITimerStartedEventAttributes | undefined): api_TimerStartedEventAttributes | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function UpsertWorkflowSearchAttributesEventAttributes(t: shared_IUpsertWorkflowSearchAttributesEventAttributes | undefined): api_UpsertWorkflowSearchAttributesEventAttributes | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function WorkflowExecutionCancelRequestedEventAttributes(t: shared_IWorkflowExecutionCancelRequestedEventAttributes | undefined): api_WorkflowExecutionCancelRequestedEventAttributes | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function WorkflowExecutionCanceledEventAttributes(t: shared_IWorkflowExecutionCanceledEventAttributes | undefined): api_WorkflowExecutionCanceledEventAttributes | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function WorkflowExecutionCompletedEventAttributes(t: shared_IWorkflowExecutionCompletedEventAttributes | undefined): api_WorkflowExecutionCompletedEventAttributes | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function WorkflowExecutionContinuedAsNewEventAttributes(t: shared_IWorkflowExecutionContinuedAsNewEventAttributes | undefined): api_WorkflowExecutionContinuedAsNewEventAttributes | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function WorkflowExecutionFailedEventAttributes(t: shared_IWorkflowExecutionFailedEventAttributes | undefined): api_WorkflowExecutionFailedEventAttributes | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function WorkflowExecutionSignaledEventAttributes(t: shared_IWorkflowExecutionSignaledEventAttributes | undefined): api_WorkflowExecutionSignaledEventAttributes | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function WorkflowExecutionStartedEventAttributes(t: shared_IWorkflowExecutionStartedEventAttributes | undefined): api_WorkflowExecutionStartedEventAttributes | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function WorkflowExecutionTerminatedEventAttributes(t: shared_IWorkflowExecutionTerminatedEventAttributes | undefined): api_WorkflowExecutionTerminatedEventAttributes | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function WorkflowExecutionTimedOutEventAttributes(t: shared_IWorkflowExecutionTimedOutEventAttributes | undefined): api_WorkflowExecutionTimedOutEventAttributes | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}
