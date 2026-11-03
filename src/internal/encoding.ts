// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { BytesBuffer } from './runtime/bytes_buffer.js';
import { GoThriftStructLike, isThriftStruct, thriftDecode, thriftDecodeList, thriftEncode, thriftEncodeList } from './runtime/thrift_codec.js';
import { IsThriftType, TListSerialize, TListDeserialize } from './common/thrift_util.js';
import { goZeroOfSameType } from './runtime/reflect.js';

export interface encoding {
  Marshal(p0: unknown[]): Buffer;
  Unmarshal(p0: Buffer, p1: unknown[]): void;
}

/**
 * jsonEncoding encapsulates json encoding and decoding
 */
export class jsonEncoding implements encoding {
  constructor(init?: Partial<jsonEncoding>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  Marshal(objs: unknown[]): Buffer {
    const buf = new BytesBuffer();

    for (let i = 0; i < objs.length; i++) {
      const obj = objs[i];
      try {
        const encoded = JSON.stringify(obj === undefined ? null : obj);
        if (encoded === undefined) {
          throw new Error("json: unsupported value");
        }
        buf.WriteString(encoded);
        buf.WriteByte(10);
      } catch (err) {
        const error = err instanceof Error ? err : new globalThis.Error(String(err));
        const typeName =
          obj == null
            ? "<nil>"
            : typeof obj === "string"
              ? "string"
              : typeof obj === "number"
                ? "float64"
                : typeof obj === "boolean"
                  ? "bool"
                  : typeof obj === "function"
                    ? "func()"
                    : Array.isArray(obj)
                      ? "[]interface {}"
                      : "map[string]interface {}";
        throw new globalThis.Error(
          `unable to encode argument: ${i}, ${typeName}, with json error: ${error.message}`,
        );
      }
    }

    return buf.Bytes();
  }

  Unmarshal(data: Buffer, objs: unknown[]): void {
    const text = new BytesBuffer(data).String();
    let offset = 0;

    for (let i = 0; i < objs.length; i++) {
      while (
        offset < text.length &&
        (text[offset] === " " ||
          text[offset] === "\t" ||
          text[offset] === "\r" ||
          text[offset] === "\n")
      ) {
        offset++;
      }

      const newline = text.indexOf("\n", offset);
      const end = newline === -1 ? text.length : newline;
      const line = text.slice(offset, end);

      try {
        const parsed = JSON.parse(line);
        (objs[i] as { value: unknown }).value = parsed;
      } catch (err) {
        const e = err instanceof Error ? err : new globalThis.Error(String(err));
        const objType =
          typeof (objs[i] as { String?: unknown }).String === "function"
            ? (objs[i] as { String(): string }).String()
            : globalThis.String(objs[i]);
        throw new globalThis.Error(
          `unable to decode argument: ${i}, ${objType}, with json error: ${e.message}`,
        );
      }

      offset = newline === -1 ? text.length : newline + 1;
    }
  }

}

/**
 * thriftEncoding encapsulates thrift serializer/de-serializer.
 */
export class thriftEncoding implements encoding {
  constructor(init?: Partial<thriftEncoding>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  Marshal(objs: unknown[]): Buffer {
    const tlist: GoThriftStructLike[] = [];
    for (let i = 0; i < objs.length; i++) {
      if (!IsThriftType(objs[i])) {
        throw new Error(`pointer to thrift.TStruct type is required for ${i + 1} argument`);
      }
      tlist.push(objs[i] as GoThriftStructLike);
    }
    return TListSerialize(tlist);
  }

  Unmarshal(data: Buffer, objs: unknown[]): void {
    const tlist: GoThriftStructLike[] = [];

    for (let i = 0; i < objs.length; i++) {
      const obj = objs[i] as { value: unknown };

      if (obj == null || typeof obj !== 'object' || !IsThriftType(obj.value)) {
        throw new Error(`pointer to pointer thrift.TStruct type is required for ${i + 1} argument`);
      }

      const t = goZeroOfSameType(obj.value) as GoThriftStructLike;
      tlist.push(t);
    }

    TListDeserialize(tlist, data);

    for (let i = 0; i < tlist.length; i++) {
      (objs[i] as { value: unknown }).value = tlist[i];
    }
  }

}
