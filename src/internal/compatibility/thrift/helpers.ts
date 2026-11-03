// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { Duration as types_Duration } from '../../../generated/proto/cadence-idl/google/protobuf/duration.js';
import { FieldMask as types_FieldMask } from '../../../generated/proto/cadence-idl/google/protobuf/field_mask.js';
import { Timestamp as types_Timestamp } from '../../../generated/proto/cadence-idl/google/protobuf/timestamp.js';
import { DoubleValue as types_DoubleValue, Int64Value as types_Int64Value } from '../../../generated/proto/cadence-idl/google/protobuf/wrappers.js';
import { Hour, Second } from '../../runtime/time.js';

export class fieldSet {
  constructor(public value: Record<string, {}> = {}) {}

  isSet(field: string): boolean {
    throw new globalThis.Error("not implemented"); // @stub
  }

}

export function boolPtr(b: boolean): boolean | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function toDoubleValue(v: types_DoubleValue | undefined): number | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function toInt64Value(v: types_Int64Value | undefined): number | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function timeToUnixNano(t: types_Timestamp | undefined): number | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function durationToDays(d: types_Duration | undefined): number | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function durationToSeconds(d: types_Duration | undefined): number | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function int32To64(v: number | undefined): number | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function newFieldSet(mask: types_FieldMask | undefined): fieldSet {
  throw new globalThis.Error("not implemented"); // @stub
}
