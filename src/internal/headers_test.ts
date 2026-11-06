// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { expect } from 'vitest';
import { NewHeaderReader, NewHeaderWriter } from './headers.js';
import { Header } from '../generated/thrift/cadence-idl/com/uber/cadence/Header.js';

export async function TestHeaderWriter(): Promise<void> {
    const tests: {
        name: string;
        initial: Header;
        expected: Header;
        vals: Record<string, Buffer>;
    }[] = [
        {
            name: 'no values',
            initial: new Header({
                fields: new Map(),
            }),
            expected: new Header({
                fields: new Map(),
            }),
            vals: {},
        },
        {
            name: 'add values',
            initial: new Header({
                fields: new Map(),
            }),
            expected: new Header({
                fields: new Map([
                    ['key1', Buffer.from('val1')],
                    ['key2', Buffer.from('val2')],
                ]),
            }),
            vals: {
                key1: Buffer.from('val1'),
                key2: Buffer.from('val2'),
            },
        },
        {
            name: 'overwrite values',
            initial: new Header({
                fields: new Map([
                    ['key1', Buffer.from('unexpected')],
                ]),
            }),
            expected: new Header({
                fields: new Map([
                    ['key1', Buffer.from('val1')],
                    ['key2', Buffer.from('val2')],
                ]),
            }),
            vals: {
                key1: Buffer.from('val1'),
                key2: Buffer.from('val2'),
            },
        },
    ];

    for (const test of tests) {
        const writer = await NewHeaderWriter(test.initial);
        for (const [key, val] of Object.entries(test.vals)) {
            writer.Set(key, val);
        }
        expect(test.initial).toEqual(test.expected);
    }
}

export function TestHeaderReader(): void {
    const tests: {
        name: string;
        header: Header;
        keys: Record<string, unknown>;
        isError: boolean;
    }[] = [
        {
            name: "valid values",
            header: new Header({
                fields: new Map([
                    ["key1", Buffer.from("val1")],
                    ["key2", Buffer.from("val2")],
                ]),
            }),
            keys: { key1: {}, key2: {} },
            isError: false,
        },
        {
            name: "invalid values",
            header: new Header({
                fields: new Map([
                    ["key1", Buffer.from("val1")],
                    ["key2", Buffer.from("val2")],
                ]),
            }),
            keys: { key2: {} },
            isError: true,
        },
    ];

    for (const test of tests) {
        const reader = NewHeaderReader(test.header);
        const operation = (): void => {
            reader.ForEachKey((_key: string, _val: Buffer): void => {
                if (!(_key in test.keys)) {
                    throw new Error();
                }
            });
        };

        if (test.isError) {
            expect(operation).toThrow();
        } else {
            expect(operation).not.toThrow();
        }
    }
}
