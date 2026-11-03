// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { IsUseThriftDecoding, IsUseThriftEncoding } from './common/thrift_util.js';
import { IsTypeByteSlice } from './common/util/util.js';
import { jsonEncoding, thriftEncoding } from './encoding.js';
import { isByteSlice, isByteSliceTarget } from './runtime/reflect.js';

export interface internal_DataConverter {
  ToData(...value: unknown[]): Buffer;
  FromData(input: Buffer, ...valuePtr: unknown[]): void;
}

export interface internal_Value {
  HasValue(): boolean;
  Get(valuePtr: unknown): void;
}

export interface internal_Values {
  HasValues(): boolean;
  Get(...valuePtr: unknown[]): void;
}

/**
 * defaultDataConverter uses thrift encoder/decoder when possible, for everything else use json.
 */
export class defaultDataConverter implements internal_DataConverter {
  constructor(init?: Partial<defaultDataConverter>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  ToData(...r: unknown[]): Buffer {
    if (r.length === 1 && IsTypeByteSlice(r[0])) {
      return r[0] as Buffer;
    }

    let encoder = new jsonEncoding({});
    if (IsUseThriftEncoding(r)) {
      encoder = new thriftEncoding({});
    }

    return encoder.Marshal(r);
  }

  FromData(data: Buffer, ...to: unknown[]): void {
    if (to.length === 1 && IsTypeByteSlice(to[0])) {
      (to[0] as { value: unknown }).value = data;
      return;
    }

    const encoder = IsUseThriftDecoding(to)
      ? new thriftEncoding({})
      : new jsonEncoding({});

    encoder.Unmarshal(data, to);
  }

}

/**
 * getDefaultDataConverter return default data converter used by Cadence worker
 */
export function getDefaultDataConverter(): defaultDataConverter {
  return defaultJSONDataConverter;
}

export let defaultJSONDataConverter = new defaultDataConverter();

/**
 * DefaultDataConverter is default data converter used by Cadence worker
 */
export let DefaultDataConverter = getDefaultDataConverter();
