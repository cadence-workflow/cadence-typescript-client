import { EncodingType as api_EncodingType, FailoverType as api_FailoverType } from '../../../generated/proto/cadence-idl/uber/cadence/api/v1/common.js';
import { ArchivalStatus as api_ArchivalStatus, DomainStatus as api_DomainStatus } from '../../../generated/proto/cadence-idl/uber/cadence/api/v1/domain.js';
import { EventFilterType as api_EventFilterType } from '../../../generated/proto/cadence-idl/uber/cadence/api/v1/history.js';
import { QueryConsistencyLevel as api_QueryConsistencyLevel, QueryRejectCondition as api_QueryRejectCondition, QueryResultType as api_QueryResultType } from '../../../generated/proto/cadence-idl/uber/cadence/api/v1/query.js';
import { TaskListKind as api_TaskListKind, TaskListType as api_TaskListType } from '../../../generated/proto/cadence-idl/uber/cadence/api/v1/tasklist.js';
import { IndexedValueType as api_IndexedValueType } from '../../../generated/proto/cadence-idl/uber/cadence/api/v1/visibility.js';
import { CancelExternalWorkflowExecutionFailedCause as api_CancelExternalWorkflowExecutionFailedCause, ChildWorkflowExecutionFailedCause as api_ChildWorkflowExecutionFailedCause, ContinueAsNewInitiator as api_ContinueAsNewInitiator, CronOverlapPolicy as api_CronOverlapPolicy, DecisionTaskFailedCause as api_DecisionTaskFailedCause, DecisionTaskTimedOutCause as api_DecisionTaskTimedOutCause, ParentClosePolicy as api_ParentClosePolicy, PendingActivityState as api_PendingActivityState, PendingDecisionState as api_PendingDecisionState, SignalExternalWorkflowExecutionFailedCause as api_SignalExternalWorkflowExecutionFailedCause, TimeoutType as api_TimeoutType, WorkflowExecutionCloseStatus as api_WorkflowExecutionCloseStatus, WorkflowIdReusePolicy as api_WorkflowIdReusePolicy } from '../../../generated/proto/cadence-idl/uber/cadence/api/v1/workflow.js';
import { ArchivalStatus as shared_ArchivalStatus } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ArchivalStatus.js';
import { CancelExternalWorkflowExecutionFailedCause as shared_CancelExternalWorkflowExecutionFailedCause } from '../../../generated/thrift/cadence-idl/com/uber/cadence/CancelExternalWorkflowExecutionFailedCause.js';
import { ChildWorkflowExecutionFailedCause as shared_ChildWorkflowExecutionFailedCause } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ChildWorkflowExecutionFailedCause.js';
import { ContinueAsNewInitiator as shared_ContinueAsNewInitiator } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ContinueAsNewInitiator.js';
import { CronOverlapPolicy as shared_CronOverlapPolicy } from '../../../generated/thrift/cadence-idl/com/uber/cadence/CronOverlapPolicy.js';
import { DecisionTaskFailedCause as shared_DecisionTaskFailedCause } from '../../../generated/thrift/cadence-idl/com/uber/cadence/DecisionTaskFailedCause.js';
import { DecisionTaskTimedOutCause as shared_DecisionTaskTimedOutCause } from '../../../generated/thrift/cadence-idl/com/uber/cadence/DecisionTaskTimedOutCause.js';
import { DomainStatus as shared_DomainStatus } from '../../../generated/thrift/cadence-idl/com/uber/cadence/DomainStatus.js';
import { EncodingType as shared_EncodingType } from '../../../generated/thrift/cadence-idl/com/uber/cadence/EncodingType.js';
import { FailoverType as shared_FailoverType } from '../../../generated/thrift/cadence-idl/com/uber/cadence/FailoverType.js';
import { HistoryEventFilterType as shared_HistoryEventFilterType } from '../../../generated/thrift/cadence-idl/com/uber/cadence/HistoryEventFilterType.js';
import { IndexedValueType as shared_IndexedValueType } from '../../../generated/thrift/cadence-idl/com/uber/cadence/IndexedValueType.js';
import { ParentClosePolicy as shared_ParentClosePolicy } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ParentClosePolicy.js';
import { PendingActivityState as shared_PendingActivityState } from '../../../generated/thrift/cadence-idl/com/uber/cadence/PendingActivityState.js';
import { PendingDecisionState as shared_PendingDecisionState } from '../../../generated/thrift/cadence-idl/com/uber/cadence/PendingDecisionState.js';
import { QueryConsistencyLevel as shared_QueryConsistencyLevel } from '../../../generated/thrift/cadence-idl/com/uber/cadence/QueryConsistencyLevel.js';
import { QueryRejectCondition as shared_QueryRejectCondition } from '../../../generated/thrift/cadence-idl/com/uber/cadence/QueryRejectCondition.js';
import { QueryResultType as shared_QueryResultType } from '../../../generated/thrift/cadence-idl/com/uber/cadence/QueryResultType.js';
import { QueryTaskCompletedType as shared_QueryTaskCompletedType } from '../../../generated/thrift/cadence-idl/com/uber/cadence/QueryTaskCompletedType.js';
import { SignalExternalWorkflowExecutionFailedCause as shared_SignalExternalWorkflowExecutionFailedCause } from '../../../generated/thrift/cadence-idl/com/uber/cadence/SignalExternalWorkflowExecutionFailedCause.js';
import { TaskListKind as shared_TaskListKind } from '../../../generated/thrift/cadence-idl/com/uber/cadence/TaskListKind.js';
import { TaskListType as shared_TaskListType } from '../../../generated/thrift/cadence-idl/com/uber/cadence/TaskListType.js';
import { TimeoutType as shared_TimeoutType } from '../../../generated/thrift/cadence-idl/com/uber/cadence/TimeoutType.js';
import { WorkflowExecutionCloseStatus as shared_WorkflowExecutionCloseStatus } from '../../../generated/thrift/cadence-idl/com/uber/cadence/WorkflowExecutionCloseStatus.js';
import { WorkflowIdReusePolicy as shared_WorkflowIdReusePolicy } from '../../../generated/thrift/cadence-idl/com/uber/cadence/WorkflowIdReusePolicy.js';

// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
export function TaskListKind(t: shared_TaskListKind | undefined): api_TaskListKind {
  throw new globalThis.Error("not implemented"); // @stub
}

export function TaskListType(t: shared_TaskListType | undefined): api_TaskListType {
  throw new globalThis.Error("not implemented"); // @stub
}

export function EventFilterType(t: shared_HistoryEventFilterType | undefined): api_EventFilterType {
  throw new globalThis.Error("not implemented"); // @stub
}

export function QueryRejectCondition(t: shared_QueryRejectCondition | undefined): api_QueryRejectCondition {
  throw new globalThis.Error("not implemented"); // @stub
}

export function QueryConsistencyLevel(t: shared_QueryConsistencyLevel | undefined): api_QueryConsistencyLevel {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ContinueAsNewInitiator(t: shared_ContinueAsNewInitiator | undefined): api_ContinueAsNewInitiator {
  throw new globalThis.Error("not implemented"); // @stub
}

export function WorkflowIDReusePolicy(t: shared_WorkflowIdReusePolicy | undefined): api_WorkflowIdReusePolicy {
  throw new globalThis.Error("not implemented"); // @stub
}

export function QueryResultType(t: shared_QueryResultType | undefined): api_QueryResultType {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ArchivalStatus(t: shared_ArchivalStatus | undefined): api_ArchivalStatus {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ParentClosePolicy(t: shared_ParentClosePolicy | undefined): api_ParentClosePolicy {
  throw new globalThis.Error("not implemented"); // @stub
}

export function DecisionTaskFailedCause(t: shared_DecisionTaskFailedCause | undefined): api_DecisionTaskFailedCause {
  throw new globalThis.Error("not implemented"); // @stub
}

export function WorkflowExecutionCloseStatus(t: shared_WorkflowExecutionCloseStatus | undefined): api_WorkflowExecutionCloseStatus {
  throw new globalThis.Error("not implemented"); // @stub
}

export function QueryTaskCompletedType(t: shared_QueryTaskCompletedType | undefined): api_QueryResultType {
  throw new globalThis.Error("not implemented"); // @stub
}

export function DomainStatus(t: shared_DomainStatus | undefined): api_DomainStatus {
  throw new globalThis.Error("not implemented"); // @stub
}

export function PendingActivityState(t: shared_PendingActivityState | undefined): api_PendingActivityState {
  throw new globalThis.Error("not implemented"); // @stub
}

export function PendingDecisionState(t: shared_PendingDecisionState | undefined): api_PendingDecisionState {
  throw new globalThis.Error("not implemented"); // @stub
}

export function IndexedValueType(t: shared_IndexedValueType): api_IndexedValueType {
  throw new globalThis.Error("not implemented"); // @stub
}

export function EncodingType(t: shared_EncodingType | undefined): api_EncodingType {
  throw new globalThis.Error("not implemented"); // @stub
}

export function TimeoutType(t: shared_TimeoutType | undefined): api_TimeoutType {
  throw new globalThis.Error("not implemented"); // @stub
}

export function DecisionTaskTimedOutCause(t: shared_DecisionTaskTimedOutCause | undefined): api_DecisionTaskTimedOutCause {
  throw new globalThis.Error("not implemented"); // @stub
}

export function CancelExternalWorkflowExecutionFailedCause(t: shared_CancelExternalWorkflowExecutionFailedCause | undefined): api_CancelExternalWorkflowExecutionFailedCause {
  throw new globalThis.Error("not implemented"); // @stub
}

export function SignalExternalWorkflowExecutionFailedCause(t: shared_SignalExternalWorkflowExecutionFailedCause | undefined): api_SignalExternalWorkflowExecutionFailedCause {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ChildWorkflowExecutionFailedCause(t: shared_ChildWorkflowExecutionFailedCause | undefined): api_ChildWorkflowExecutionFailedCause {
  throw new globalThis.Error("not implemented"); // @stub
}

export function CronOverlapPolicy(t: shared_CronOverlapPolicy | undefined): api_CronOverlapPolicy {
  throw new globalThis.Error("not implemented"); // @stub
}

export function FailoverType(t: shared_FailoverType | undefined): api_FailoverType {
  throw new globalThis.Error("not implemented"); // @stub
}
