// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { Context } from '../runtime/context.js';
import { expect } from 'vitest';
import { PtrOf } from './convert.js';
import { IsUseThriftDecoding, IsThriftType, TListDeserialize, TListSerialize, IsUseThriftEncoding } from './thrift_util.js';

export class mockThriftStruct {
  constructor(init?: Partial<mockThriftStruct>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  Field1: string = "";

  Field2: number = 0;

  Read(ctx: Context, iprot: unknown): void {
    return;
  }

  Write(ctx: Context, oprot: unknown): void {
    return;
  }

  String(): string {
    return "";
  }

}

export function TestTListSerialize(): void {
  const data = TListSerialize(undefined);
  expect(data).toEqual(Buffer.alloc(0));

  const ts = [
    new mockThriftStruct({ Field1: "value1", Field2: 1 }),
    new mockThriftStruct({ Field1: "value2", Field2: 2 }),
  ];

  TListSerialize(ts);
}

export function TestTListDeserialize(): void {
  const ts = [
    new mockThriftStruct({ Field1: "", Field2: 0 }),
    new mockThriftStruct({ Field1: "", Field2: 0 }),
  ];

  const data = TListSerialize(ts);
  TListDeserialize(ts, data);
}

export function TestIsUseThriftEncoding(): void {
  const cases: { name: string; input: unknown[]; expected: boolean }[] = [
    {
      name: "nil",
      input: undefined as unknown as unknown[],
      expected: false,
    },
    {
      name: "success",
      input: [
        new mockThriftStruct({ Field1: "", Field2: 0 }),
        new mockThriftStruct({ Field1: "", Field2: 0 }),
      ],
      expected: true,
    },
    {
      name: "fail",
      input: [
        new mockThriftStruct({ Field1: "", Field2: 0 }),
        PtrOf("string"),
      ],
      expected: false,
    },
  ];

  for (const tc of cases) {
    expect(IsUseThriftEncoding(tc.input)).toEqual(tc.expected);
  }
}

export function TestIsUseThriftDecoding(): void {
  const cases: { name: string; input: unknown[]; expected: boolean }[] = [
    {
      name: "nil",
      input: [],
      expected: false,
    },
    {
      name: "success",
      input: [
        PtrOf(new mockThriftStruct({ Field1: "", Field2: 0 })),
        PtrOf(new mockThriftStruct({ Field1: "", Field2: 0 })),
      ],
      expected: true,
    },
    {
      name: "fail",
      input: [
        PtrOf(new mockThriftStruct({ Field1: "", Field2: 0 })),
        PtrOf("string"),
      ],
      expected: false,
    },
  ];

  for (const tc of cases) {
    expect(IsUseThriftDecoding(tc.input)).toEqual(tc.expected);
  }
}

export function TestIsThriftType(): void {
  expect(IsThriftType(new mockThriftStruct({ Field1: "", Field2: 0 }))).toBe(true);
  expect(IsThriftType(Object.assign({}, new mockThriftStruct({ Field1: "", Field2: 0 })))).toBe(false);
}
