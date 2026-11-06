// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { internal_DataConverter, getDefaultDataConverter } from './encoded.js';
import { BytesBuffer } from './runtime/bytes_buffer.js';
import { GobDecoder, GobEncoder } from './runtime/gob.js';
import { expect } from 'vitest';
import { decodeArg, encodeArg, encodeArgs } from './internal_worker.js';
import { testErrorDetails1, testErrorDetails2, testErrorDetails3 } from './error_test.js';
import { args } from './internal_worker_test.js';
import { internal_Context } from './context.js';

/**
 * testDataConverter implements encoded.DataConverter using gob
 */
export class testDataConverter implements internal_DataConverter {
  constructor(init?: Partial<testDataConverter>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  ToData(...value: unknown[]): Buffer {
    const buf = new BytesBuffer();
    const enc = new GobEncoder(buf);

    for (let i = 0; i < value.length; i++) {
      const obj = value[i];
      try {
        enc.Encode(obj);
      } catch (err) {
        if (!(err instanceof Error)) throw err;
        const objText =
          obj instanceof Error
            ? obj.message
            : typeof (obj as { String?: unknown }).String === "function"
              ? (obj as { String(): string }).String()
              : globalThis.String(obj);
        throw new Error(`unable to encode argument: ${i}, ${objText}, with gob error: ${err.message}`);
      }
    }

    return buf.Bytes();
  }

  FromData(input: Buffer, ...valuePtr: unknown[]): void {
    const dec = new GobDecoder(new BytesBuffer(input));

    for (let i = 0; i < valuePtr.length; i++) {
      const obj = valuePtr[i];

      try {
        dec.Decode(obj);
      } catch (err) {
        if (!(err instanceof Error)) {
          throw err;
        }

        const objText =
          obj == null
            ? "<nil>"
            : obj instanceof Error
              ? obj.message
              : typeof (obj as { String?: unknown }).String === "function"
                ? (obj as { String(): string }).String()
                : globalThis.String(obj);

        throw new Error(`unable to decode argument: ${i}, ${objText}, with gob error: ${err.message}`);
      }
    }
  }

}

export function testDataConverterFunction(dc: internal_DataConverter, f: unknown, ...args: unknown[]): string {
    const input = dc.ToData(args...);
    const result: Array<{ value: unknown }> = [];

    for (const v of args) {
        const arg = {
            value: v instanceof Uint8Array ? Buffer.alloc(0) : undefined,
        };
        result.push(arg);
    }

    dc.FromData(input, ...result);

    const targetArgs = result.map((arg) => arg.value);
    const ret = (f as (...args: unknown[]) => unknown)(...targetArgs);
    const retValues = ret == null ? [] : Array.isArray(ret) ? ret : [ret];

    return retValues[0] as string;
}

export function TestDefaultDataConverter(): void {
  const dc = getDefaultDataConverter();

  const f1 = (ctx: internal_Context, r: Buffer): string => {
    return "result";
  };
  const r1 = testDataConverterFunction(dc, f1, {} as internal_Context, Buffer.from("test"));
  expect("result").toEqual(r1);

  const f2 = (): string => {
    return "empty-result";
  };
  const r2 = testDataConverterFunction(dc, f2);
  expect("empty-result").toEqual(r2);

  const f3 = (r: Buffer): string => {
    return "nil-result";
  };
  const r3 = testDataConverterFunction(dc, f3, Buffer.from(""));
  expect("nil-result").toEqual(r3);
}

export function newTestDataConverter(): testDataConverter {
  return new testDataConverter({});
}

export function TestDecodeArg(): void {
    const dc = getDefaultDataConverter();

    let b: Buffer = encodeArg(dc, testErrorDetails3);
    const r = { value: { Name: "", Age: 0 } };
    decodeArg(dc, b, r);
    expect(r.value).toEqual(testErrorDetails3);

    b = encodeArgs(dc, [testErrorDetails1, testErrorDetails2]);
    expect(() => decodeArg(dc, b, r)).toThrow();
}
