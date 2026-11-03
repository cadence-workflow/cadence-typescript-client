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
export function TaskListKind(t: api_TaskListKind): shared_TaskListKind | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function TaskListType(t: api_TaskListType): shared_TaskListType | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function EventFilterType(t: api_EventFilterType): shared_HistoryEventFilterType | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function QueryRejectCondition(t: api_QueryRejectCondition): shared_QueryRejectCondition | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function QueryConsistencyLevel(t: api_QueryConsistencyLevel): shared_QueryConsistencyLevel | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ContinueAsNewInitiator(t: api_ContinueAsNewInitiator): shared_ContinueAsNewInitiator | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function WorkflowIDReusePolicy(t: api_WorkflowIdReusePolicy): shared_WorkflowIdReusePolicy | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function QueryResultType(t: api_QueryResultType): shared_QueryResultType | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ArchivalStatus(t: api_ArchivalStatus): shared_ArchivalStatus | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ParentClosePolicy(t: api_ParentClosePolicy): shared_ParentClosePolicy | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function DecisionTaskFailedCause(t: api_DecisionTaskFailedCause): shared_DecisionTaskFailedCause | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function WorkflowExecutionCloseStatus(t: api_WorkflowExecutionCloseStatus): shared_WorkflowExecutionCloseStatus | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function QueryTaskCompletedType(t: api_QueryResultType): shared_QueryTaskCompletedType | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function DomainStatus(t: api_DomainStatus): shared_DomainStatus | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function PendingActivityState(t: api_PendingActivityState): shared_PendingActivityState | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function PendingDecisionState(t: api_PendingDecisionState): shared_PendingDecisionState | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function IndexedValueType(t: api_IndexedValueType): shared_IndexedValueType {
  throw new globalThis.Error("not implemented"); // @stub
}

export function EncodingType(t: api_EncodingType): shared_EncodingType | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function TimeoutType(t: api_TimeoutType): shared_TimeoutType | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function DecisionTaskTimedOutCause(t: api_DecisionTaskTimedOutCause): shared_DecisionTaskTimedOutCause | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function CancelExternalWorkflowExecutionFailedCause(t: api_CancelExternalWorkflowExecutionFailedCause): shared_CancelExternalWorkflowExecutionFailedCause | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function SignalExternalWorkflowExecutionFailedCause(t: api_SignalExternalWorkflowExecutionFailedCause): shared_SignalExternalWorkflowExecutionFailedCause | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ChildWorkflowExecutionFailedCause(t: api_ChildWorkflowExecutionFailedCause): shared_ChildWorkflowExecutionFailedCause | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function CronOverlapPolicy(t: api_CronOverlapPolicy): shared_CronOverlapPolicy | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function FailoverType(t: api_FailoverType): shared_FailoverType {
  throw new globalThis.Error("not implemented"); // @stub
}
