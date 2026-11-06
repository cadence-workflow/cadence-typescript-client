// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { expect } from 'vitest';
import { CronOverlapPolicy as proto_CronOverlapPolicy, ArchivalStatus as proto_ArchivalStatus, DomainStatus as proto_DomainStatus, EncodingType as proto_EncodingType, CancelExternalWorkflowExecutionFailedCause as proto_CancelExternalWorkflowExecutionFailedCause, DecisionTaskTimedOutCause as proto_DecisionTaskTimedOutCause, FailoverType as proto_FailoverType, ParentClosePolicy as proto_ParentClosePolicy, QueryConsistencyLevel as proto_QueryConsistencyLevel, IndexedValueType as proto_IndexedValueType, QueryRejectCondition as proto_QueryRejectCondition, ContinueAsNewInitiator as proto_ContinueAsNewInitiator, PendingDecisionState as proto_PendingDecisionState, QueryResultType as proto_QueryResultType, PendingActivityState as proto_PendingActivityState, TaskListType as proto_TaskListType, ChildWorkflowExecutionFailedCause as proto_ChildWorkflowExecutionFailedCause, DecisionTaskFailedCause as proto_DecisionTaskFailedCause, TimeoutType as proto_TimeoutType, WorkflowExecutionCloseStatus as proto_WorkflowExecutionCloseStatus, EventFilterType as proto_EventFilterType, WorkflowIDReusePolicy as proto_WorkflowIDReusePolicy, SignalExternalWorkflowExecutionFailedCause as proto_SignalExternalWorkflowExecutionFailedCause, TaskListKind as proto_TaskListKind } from './proto/enum.js';
import { CronOverlapPolicy as thrift_CronOverlapPolicy, ArchivalStatus as thrift_ArchivalStatus, DomainStatus as thrift_DomainStatus, EncodingType as thrift_EncodingType, CancelExternalWorkflowExecutionFailedCause as thrift_CancelExternalWorkflowExecutionFailedCause, DecisionTaskTimedOutCause as thrift_DecisionTaskTimedOutCause, FailoverType as thrift_FailoverType, ParentClosePolicy as thrift_ParentClosePolicy, QueryConsistencyLevel as thrift_QueryConsistencyLevel, IndexedValueType as thrift_IndexedValueType, QueryRejectCondition as thrift_QueryRejectCondition, ContinueAsNewInitiator as thrift_ContinueAsNewInitiator, PendingDecisionState as thrift_PendingDecisionState, QueryResultType as thrift_QueryResultType, PendingActivityState as thrift_PendingActivityState, TaskListType as thrift_TaskListType, ChildWorkflowExecutionFailedCause as thrift_ChildWorkflowExecutionFailedCause, DecisionTaskFailedCause as thrift_DecisionTaskFailedCause, TimeoutType as thrift_TimeoutType, WorkflowExecutionCloseStatus as thrift_WorkflowExecutionCloseStatus, EventFilterType as thrift_EventFilterType, WorkflowIDReusePolicy as thrift_WorkflowIDReusePolicy, SignalExternalWorkflowExecutionFailedCause as thrift_SignalExternalWorkflowExecutionFailedCause, TaskListKind as thrift_TaskListKind } from './thrift/enum.js';

export function TestArchivalStatus(): void {
    for (const item of [0, 1, 2]) {
        expect(proto_ArchivalStatus(thrift_ArchivalStatus(item as any))).toEqual(item);
    }
    expect(() => proto_ArchivalStatus(UnknownValue as any)).toThrow();
    expect(() => thrift_ArchivalStatus(UnknownValue as any)).toThrow();
}

export function TestCancelExternalWorkflowExecutionFailedCause(): void {
  for (const item of [0, 1, 2] as any[]) {
    expect(
      proto_CancelExternalWorkflowExecutionFailedCause(
        thrift_CancelExternalWorkflowExecutionFailedCause(item),
      ),
    ).toEqual(item);
  }

  expect(() =>
    proto_CancelExternalWorkflowExecutionFailedCause(UnknownValue as any),
  ).toThrow();

  expect(() =>
    thrift_CancelExternalWorkflowExecutionFailedCause(UnknownValue as any),
  ).toThrow();
}

export function TestChildWorkflowExecutionFailedCause(): void {
  for (const item of [0, 1]) {
    expect(proto_ChildWorkflowExecutionFailedCause(thrift_ChildWorkflowExecutionFailedCause(item as any))).toEqual(item);
  }

  expect(() => {
    proto_ChildWorkflowExecutionFailedCause(UnknownValue as any);
  }).toThrow();

  expect(() => {
    thrift_ChildWorkflowExecutionFailedCause(UnknownValue as any);
  }).toThrow();
}

export function TestContinueAsNewInitiator(): void {
  for (const item of [0, 1, 2, 3, -1]) {
    expect(proto_ContinueAsNewInitiator(thrift_ContinueAsNewInitiator(item as any)!)).toEqual(item);
  }
  expect(() => proto_ContinueAsNewInitiator(UnknownValue as any)).toThrow();
  expect(() => thrift_ContinueAsNewInitiator(UnknownValue as any)).toThrow();
}

export function TestDecisionTaskFailedCause(): void {
  for (const item of [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
  ]) {
    expect(proto_DecisionTaskFailedCause(thrift_DecisionTaskFailedCause(item as any))).toEqual(item);
  }
  expect(() => proto_DecisionTaskFailedCause(UnknownValue as any)).toThrow();
  expect(() => thrift_DecisionTaskFailedCause(UnknownValue as any)).toThrow();
}

export function TestDomainStatus(): void {
  for (const item of [0, 1, 2, 3]) {
    expect(proto_DomainStatus(thrift_DomainStatus(item as any)!)).toEqual(item);
  }
  expect(() => proto_DomainStatus(UnknownValue as any)).toThrow();
  expect(() => thrift_DomainStatus(UnknownValue as any)).toThrow();
}

export function TestEncodingType(): void {
  for (const item of [0, 1, 2]) {
    expect(proto_EncodingType(thrift_EncodingType(item as any)!)).toEqual(item);
  }
  expect(() => proto_EncodingType(UnknownValue as any)).toThrow();
  expect(() => thrift_EncodingType(UnknownValue as any)).toThrow();
  expect(() => thrift_EncodingType(3 as any)).toThrow();
}

export function TestEventFilterType(): void {
  for (const item of [0, 1, 2] as any[]) {
    expect(proto_EventFilterType(thrift_EventFilterType(item as any))).toEqual(item);
  }

  expect(() => proto_EventFilterType(UnknownValue as any)).toThrow();
  expect(() => thrift_EventFilterType(UnknownValue as any)).toThrow();
}

export function TestIndexedValueType(): void {
  for (const item of [1, 2, 3, 4, 5, 6]) {
    expect(proto_IndexedValueType(thrift_IndexedValueType(item as any) as any)).toEqual(item);
  }
  expect(() => thrift_IndexedValueType(0 as any)).toThrow();
  expect(() => proto_IndexedValueType(UnknownValue as any)).toThrow();
  expect(() => thrift_IndexedValueType(UnknownValue as any)).toThrow();
}

export function TestParentClosePolicy(): void {
  for (const item of [0, 1, 2, 3]) {
    expect(proto_ParentClosePolicy(thrift_ParentClosePolicy(item as any))).toEqual(item);
  }
  expect(() => proto_ParentClosePolicy(UnknownValue as any)).toThrow();
  expect(() => thrift_ParentClosePolicy(UnknownValue as any)).toThrow();
}

export function TestPendingActivityState(): void {
  for (const item of [0, 1, 2, 3]) {
    expect(proto_PendingActivityState(thrift_PendingActivityState(item as any)!)).toEqual(item);
  }

  expect(() => proto_PendingActivityState(UnknownValue as any)).toThrow();
  expect(() => thrift_PendingActivityState(UnknownValue as any)).toThrow();
}

export function TestPendingDecisionState(): void {
  for (const item of [0, 1, 2]) {
    expect(proto_PendingDecisionState(thrift_PendingDecisionState(item as any)!)).toEqual(item);
  }
  expect(() => proto_PendingDecisionState(UnknownValue as any)).toThrow();
  expect(() => thrift_PendingDecisionState(UnknownValue as any)).toThrow();
}

export function TestQueryConsistencyLevel(): void {
  for (const item of [0, 1, 2]) {
    expect(proto_QueryConsistencyLevel(thrift_QueryConsistencyLevel(item as any))).toEqual(item);
  }

  expect(() => proto_QueryConsistencyLevel(UnknownValue as any)).toThrow();
  expect(() => thrift_QueryConsistencyLevel(UnknownValue as any)).toThrow();
}

export function TestQueryRejectCondition(): void {
  for (const item of [0, 1, 2]) {
    expect(proto_QueryRejectCondition(thrift_QueryRejectCondition(item as any)!)).toEqual(item);
  }
  expect(() => proto_QueryRejectCondition(UnknownValue as any)).toThrow();
  expect(() => thrift_QueryRejectCondition(UnknownValue as any)).toThrow();
}

export function TestQueryResultType(): void {
	for (const item of [0, 1, 2]) {
		expect(proto_QueryResultType(thrift_QueryResultType(item as any)!)).toEqual(item);
	}
	expect(() => proto_QueryResultType(UnknownValue as any)).toThrow();
	expect(() => thrift_QueryResultType(UnknownValue as any)).toThrow();
}

export function TestQueryTaskCompletedType(): void {
  throw new globalThis.Error("not implemented"); // @stub
}

export function TestSignalExternalWorkflowExecutionFailedCause(): void {
  for (const item of [0, 1, 2]) {
    expect(
      proto_SignalExternalWorkflowExecutionFailedCause(
        thrift_SignalExternalWorkflowExecutionFailedCause(item as any)!,
      ),
    ).toEqual(item);
  }

  expect(() =>
    proto_SignalExternalWorkflowExecutionFailedCause(UnknownValue as any),
  ).toThrow();

  expect(() =>
    thrift_SignalExternalWorkflowExecutionFailedCause(UnknownValue as any),
  ).toThrow();
}

export function TestTaskListKind(): void {
	for (const item of [0, 1, 2, 3]) {
		expect(proto_TaskListKind(thrift_TaskListKind(item as any)!)).toEqual(item as any);
	}
	expect(() => proto_TaskListKind(UnknownValue as any)).toThrow();
	expect(() => thrift_TaskListKind(UnknownValue as any)).toThrow();
}

export function TestTaskListType(): void {
	for (const item of [0, 1, 2]) {
		expect(proto_TaskListType(thrift_TaskListType(item as any)!)).toEqual(item);
	}
	expect(() => proto_TaskListType(UnknownValue as any)).toThrow();
	expect(() => thrift_TaskListType(UnknownValue as any)).toThrow();
}

export function TestTimeoutType(): void {
  for (const item of [0, 1, 2, 3, 4]) {
    expect(proto_TimeoutType(thrift_TimeoutType(item as any))).toEqual(item);
  }
  expect(() => proto_TimeoutType(UnknownValue as any)).toThrow();
  expect(() => thrift_TimeoutType(UnknownValue as any)).toThrow();
}

export function TestDecisionTaskTimedOutCause(): void {
	for (const item of [
		0,
		1,
		2,
	]) {
		expect(proto_DecisionTaskTimedOutCause(thrift_DecisionTaskTimedOutCause(item as any))).toEqual(item);
	}
	expect(() => proto_DecisionTaskTimedOutCause(UnknownValue as any)).toThrow();
	expect(() => thrift_DecisionTaskTimedOutCause(UnknownValue as any)).toThrow();
}

export function TestWorkflowExecutionCloseStatus(): void {
  for (const item of [0, 1, 2, 3, 4, 5, 6]) {
    expect(proto_WorkflowExecutionCloseStatus(thrift_WorkflowExecutionCloseStatus(item as any))).toEqual(item);
  }
  expect(() => proto_WorkflowExecutionCloseStatus(UnknownValue as any)).toThrow();
  expect(() => thrift_WorkflowExecutionCloseStatus(UnknownValue as any)).toThrow();
}

export function TestWorkflowIDReusePolicy(): void {
  const items = [0, 1, 2, 3, 4] as const;
  for (const item of items) {
    expect(proto_WorkflowIDReusePolicy(thrift_WorkflowIDReusePolicy(item as any))).toEqual(item);
  }
  expect(() => proto_WorkflowIDReusePolicy(thrift_WorkflowIDReusePolicy(UnknownValue as any))).toThrow();
  expect(() => thrift_WorkflowIDReusePolicy(UnknownValue as any)).toThrow();
}

export function TestCronOverlapPolicy(): void {
  for (const v of [0, 1, 2] as const) {
    expect(proto_CronOverlapPolicy(thrift_CronOverlapPolicy(v as any)!)).toEqual(v);
  }
  expect(proto_CronOverlapPolicy(thrift_CronOverlapPolicy(999 as any)!)).toEqual(0);
}

export function TestFailoverType(): void {
  for (const v of [0, 1, 2]) {
    expect(
      proto_FailoverType(
        thrift_FailoverType(v as Parameters<typeof thrift_FailoverType>[0]),
      ),
    ).toEqual(v);
  }

  expect(
    proto_FailoverType(
      thrift_FailoverType(999 as Parameters<typeof thrift_FailoverType>[0]),
    ),
  ).toEqual(0);
}

export const UnknownValue = 9999;
