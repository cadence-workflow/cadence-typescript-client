// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { expect } from 'vitest';
import { Int32Ceil, Int64Ceil, BoolPtr, CronOverlapPolicyPtr, DecisionTypePtr, EventTypePtr, Float64Ptr, Int32Ptr, Int64Ptr, PtrOf, QueryResultTypePtr, QueryTaskCompletedTypePtr, StringPtr, TaskListKindPtr, TaskListPtr, Zero, ValueFromPtr } from './convert.js';
import { CronOverlapPolicy } from '../../generated/thrift/cadence-idl/com/uber/cadence/CronOverlapPolicy.js';
import { DecisionType } from '../../generated/thrift/cadence-idl/com/uber/cadence/DecisionType.js';
import { EventType } from '../../generated/thrift/cadence-idl/com/uber/cadence/EventType.js';
import { QueryResultType } from '../../generated/thrift/cadence-idl/com/uber/cadence/QueryResultType.js';
import { QueryTaskCompletedType } from '../../generated/thrift/cadence-idl/com/uber/cadence/QueryTaskCompletedType.js';
import { TaskList } from '../../generated/thrift/cadence-idl/com/uber/cadence/TaskList.js';
import { TaskListKind } from '../../generated/thrift/cadence-idl/com/uber/cadence/TaskListKind.js';

export function TestPtrOf(): void {
  expect(PtrOf("a")).toEqual("a");
  expect(PtrOf(1)).toEqual(1);
  expect(PtrOf(1)).toEqual(1);
  expect(PtrOf(1)).toEqual(1);
  expect(PtrOf(1.1)).toEqual(1.1);
  expect(PtrOf(true)).toEqual(true);
}

export function TestPtrHelpers(): void {
    expect(Int32Ptr(1)!).toEqual(1);
    expect(Int64Ptr(1)!).toEqual(1);
    expect(Float64Ptr(1.1)!).toEqual(1.1);
    expect(BoolPtr(true)!).toEqual(true);
    expect(StringPtr("a")!).toEqual("a");
    expect(TaskListPtr(new TaskList({ name: PtrOf("a") }))).toEqual(new TaskList({ name: PtrOf("a") }));
    expect(DecisionTypePtr(DecisionType.ScheduleActivityTask)).toEqual(DecisionType.ScheduleActivityTask);
    expect(EventTypePtr(EventType.WorkflowExecutionStarted)).toEqual(EventType.WorkflowExecutionStarted);
    expect(QueryTaskCompletedTypePtr(QueryTaskCompletedType.COMPLETED)).toEqual(QueryTaskCompletedType.COMPLETED);
    expect(TaskListKindPtr(TaskListKind.NORMAL)).toEqual(TaskListKind.NORMAL);
    expect(QueryResultTypePtr(QueryResultType.FAILED)).toEqual(QueryResultType.FAILED);
    expect(CronOverlapPolicyPtr(CronOverlapPolicy.BUFFERONE)).toEqual(CronOverlapPolicy.BUFFERONE);
}

export function TestCeilHelpers(): void {
  expect(Int32Ceil(1.1)).toEqual(2);
  expect(Int64Ceil(1.1)).toEqual(2);
}

export function TestValueFromPtr(): void {
  expect(ValueFromPtr(PtrOf("a"))).toEqual("a");
  expect(ValueFromPtr(PtrOf(1))).toEqual(1);
  expect(ValueFromPtr(PtrOf(1))).toEqual(1);
  expect(ValueFromPtr(PtrOf(1))).toEqual(1);
  expect(ValueFromPtr(PtrOf(1.1))).toEqual(1.1);
  expect(ValueFromPtr(PtrOf(true))).toEqual(true);
  expect(ValueFromPtr(PtrOf(["a"]))).toEqual(["a"]);
  expect(ValueFromPtr(undefined)).toEqual(undefined);
}

export function TestZero(): void {
  expect(Zero<string>()).toEqual("");
  expect(Zero<number>()).toEqual(0);
  expect(Zero<number | undefined>()).toEqual(undefined);
}
