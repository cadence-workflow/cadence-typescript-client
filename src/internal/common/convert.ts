import { CronOverlapPolicy as shared_CronOverlapPolicy } from '../../generated/thrift/cadence-idl/com/uber/cadence/CronOverlapPolicy.js';
import { DecisionType as shared_DecisionType } from '../../generated/thrift/cadence-idl/com/uber/cadence/DecisionType.js';
import { EventType as shared_EventType } from '../../generated/thrift/cadence-idl/com/uber/cadence/EventType.js';
import { QueryResultType as shared_QueryResultType } from '../../generated/thrift/cadence-idl/com/uber/cadence/QueryResultType.js';
import { QueryTaskCompletedType as shared_QueryTaskCompletedType } from '../../generated/thrift/cadence-idl/com/uber/cadence/QueryTaskCompletedType.js';
import { ITaskList as shared_ITaskList } from '../../generated/thrift/cadence-idl/com/uber/cadence/TaskList.js';
import { TaskListKind as shared_TaskListKind } from '../../generated/thrift/cadence-idl/com/uber/cadence/TaskListKind.js';

// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
/**
 * Int32Ceil return the int32 ceil of a float64
 */
export function Int32Ceil(v: number): number {
  return Math.trunc(Math.ceil(v));
}

/**
 * Int64Ceil return the int64 ceil of a float64
 */
export function Int64Ceil(v: number): number {
  return Math.trunc(Math.ceil(v));
}

/**
 * Int32Ptr makes a copy and returns the pointer to an int32.
 */
export function Int32Ptr(v: number): number | undefined {
	return PtrOf(v)
}

/**
 * Float64Ptr makes a copy and returns the pointer to a float64.
 */
export function Float64Ptr(v: number): number | undefined {
    return PtrOf(v)
}

/**
 * Int64Ptr makes a copy and returns the pointer to an int64.
 */
export function Int64Ptr(v: number): number | undefined {
  return PtrOf(v);
}

/**
 * StringPtr makes a copy and returns the pointer to a string.
 */
export function StringPtr(v: string): string | undefined {
  return PtrOf(v)
}

/**
 * BoolPtr makes a copy and returns the pointer to a string.
 */
export function BoolPtr(v: boolean): boolean | undefined {
	return PtrOf(v)
}

/**
 * TaskListPtr makes a copy and returns the pointer to a TaskList.
 */
export function TaskListPtr(v: shared_ITaskList): shared_ITaskList {
    return PtrOf(v);
}

/**
 * DecisionTypePtr makes a copy and returns the pointer to a DecisionType.
 */
export function DecisionTypePtr(t: shared_DecisionType): shared_DecisionType {
    return PtrOf(t);
}

/**
 * EventTypePtr makes a copy and returns the pointer to a EventType.
 */
export function EventTypePtr(t: shared_EventType): shared_EventType {
    return PtrOf(t);
}

/**
 * QueryTaskCompletedTypePtr makes a copy and returns the pointer to a QueryTaskCompletedType.
 */
export function QueryTaskCompletedTypePtr(t: shared_QueryTaskCompletedType): shared_QueryTaskCompletedType {
    return PtrOf(t);
}

/**
 * TaskListKindPtr makes a copy and returns the pointer to a TaskListKind.
 */
export function TaskListKindPtr(t: shared_TaskListKind): shared_TaskListKind {
    return PtrOf(t);
}

/**
 * QueryResultTypePtr makes a copy and returns the pointer to a QueryResultType.
 */
export function QueryResultTypePtr(t: shared_QueryResultType): shared_QueryResultType {
    return PtrOf(t);
}

/**
 * CronOverlapPolicyPtr makes a copy and returns the pointer to a CronOverlapPolicy.
 */
export function CronOverlapPolicyPtr(t: shared_CronOverlapPolicy): shared_CronOverlapPolicy {
    return PtrOf(t);
}

/**
 * PtrOf makes a copy and returns the pointer to a value.
 */
export function PtrOf<T>(v: T): T {
	return v;
}

/**
 * ValueFromPtr returns the value from a pointer.
 */
export function ValueFromPtr<T>(v: T | undefined): T {
    if (v == null) {
        return Zero<T>();
    }
    return v;
}

/**
 * Zero returns the zero value of a type by return type.
 */
export function Zero<T>(): T {
  const zero = undefined as T;
  return zero;
}
