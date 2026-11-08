// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { expect } from 'vitest';
import { IsTypeByteSlice, MergeDicts } from './util.js';

export async function Test_MergeDicts(): Promise<void> {
    const cases: {
        dic1: Record<string, string>;
        dic2: Record<string, string>;
        expected: Record<string, string>;
    }[] = [
        {
            dic1: { a: "1", b: "2" },
            dic2: { b: "3", c: "4" },
            expected: { a: "1", b: "3", c: "4" },
        },
        {
            dic1: { a: "1" },
            dic2: { a: "2" },
            expected: { a: "2" },
        },
        {
            dic1: {},
            dic2: { a: "1" },
            expected: { a: "1" },
        },
        {
            dic1: { a: "1" },
            dic2: {},
            expected: { a: "1" },
        },
        {
            dic1: {},
            dic2: {},
            expected: {},
        },
    ];

    for (const c of cases) {
        const result = await MergeDicts(c.dic1, c.dic2);
        expect(result).toEqual(c.expected);
    }
}

export async function Test_AwaitWaitGroup(): Promise<void> {
  throw new globalThis.Error("not implemented"); // @stub
}

export function Test_IsTypeByteSlice(): void {
  expect(IsTypeByteSlice(Buffer.alloc(0))).toBe(true);
  expect(IsTypeByteSlice({ value: Buffer.alloc(0) })).toBe(true);
  expect(IsTypeByteSlice([])).toBe(false);
}
