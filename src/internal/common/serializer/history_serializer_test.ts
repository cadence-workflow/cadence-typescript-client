// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { Int64 } from '@creditkarma/thrift-server-core';
import { expect } from 'vitest';
import { EventTypePtr } from '../convert.js';
import { DeserializeBlobDataToHistoryEvents, SerializeBatchEvents, Encode, serialize, MsgPayloadNotThriftEncoded, DeserializeBatchEvents, thriftrwDecode, thriftrwEncode } from './history_serializer.js';
import { ActivityTaskCompletedEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ActivityTaskCompletedEventAttributes.js';
import { DecisionTaskStartedEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/DecisionTaskStartedEventAttributes.js';
import { EncodingType } from '../../../generated/thrift/cadence-idl/com/uber/cadence/EncodingType.js';
import { EventType } from '../../../generated/thrift/cadence-idl/com/uber/cadence/EventType.js';
import { HistoryEvent } from '../../../generated/thrift/cadence-idl/com/uber/cadence/HistoryEvent.js';
import { HistoryEventFilterType } from '../../../generated/thrift/cadence-idl/com/uber/cadence/HistoryEventFilterType.js';
import { DataBlob } from '../../../generated/thrift/cadence-idl/com/uber/cadence/DataBlob.js';
import { BadBinaries } from '../../../generated/thrift/cadence-idl/com/uber/cadence/BadBinaries.js';
import { BadBinaryInfo } from '../../../generated/thrift/cadence-idl/com/uber/cadence/BadBinaryInfo.js';
import { Memo } from '../../../generated/thrift/cadence-idl/com/uber/cadence/Memo.js';
import { ResetPointInfo } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ResetPointInfo.js';
import { ResetPoints } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ResetPoints.js';
import { VersionHistories } from '../../../generated/thrift/cadence-idl/com/uber/cadence/VersionHistories.js';
import { goZeroOfSameType } from '../../runtime/reflect.js';
import { BadRequestError } from '../../../errors/idl_errors.js';

export function TestSerializationRoundup(): void {
    for (const encoding of [EncodingType.JSON, EncodingType.ThriftRW]) {
        const events = [
            new HistoryEvent({
                eventId: new Int64(1),
                timestamp: new Int64(1),
                eventType: EventTypePtr(EventType.ActivityTaskCompleted),
                version: new Int64(1),
                activityTaskCompletedEventAttributes: new ActivityTaskCompletedEventAttributes({
                    result: Buffer.from('result'),
                }),
            }),
        ];

        const serialized = SerializeBatchEvents(events, encoding);
        const deserialized = DeserializeBatchEvents(serialized);

        expect(deserialized).toEqual(events);
    }
}

export function TestDeserializeBlobDataToHistoryEvents(): void {
    const events = [
        new HistoryEvent({
            eventId: new Int64(1),
            timestamp: new Int64(1),
            eventType: EventTypePtr(EventType.DecisionTaskStarted),
            version: new Int64(1),
            decisionTaskStartedEventAttributes: new DecisionTaskStartedEventAttributes({
                scheduledEventId: new Int64(1)
            })
        }),
        new HistoryEvent({
            eventId: new Int64(1),
            timestamp: new Int64(1),
            eventType: EventTypePtr(EventType.ActivityTaskCompleted),
            version: new Int64(1),
            activityTaskCompletedEventAttributes: new ActivityTaskCompletedEventAttributes({
                result: Buffer.from("result")
            })
        })
    ];

    const serialized = SerializeBatchEvents(events, EncodingType.ThriftRW);
    const deserialized = DeserializeBlobDataToHistoryEvents(
        [serialized],
        HistoryEventFilterType.CLOSE_EVENT
    );

    expect(deserialized.events![0]).toEqual(events[1]);
}

export function TestDeserializeBlobDataToHistoryEvents_failure(): void {
    const cases = [
        {
            serialized: new DataBlob({}),
            expectedErrString: 'corrupted history event batch, empty events',
        },
        {
            serialized: new DataBlob({
                Data: Buffer.from('corrupted'),
                EncodingType: EncodingType.ThriftRW,
            }),
            expectedErrString: 'BadRequestError{Message: Invalid binary encoding version.}',
        },
    ];

    for (const tc of cases) {
        expect(() =>
            DeserializeBlobDataToHistoryEvents(
                [tc.serialized],
                HistoryEventFilterType.CLOSE_EVENT,
            ),
        ).toThrow(tc.expectedErrString);
    }
}

export function TestThriftEncodingRoundtrip(): void {
    const inputs: unknown[] = [
        new HistoryEvent({
            eventId: new Int64(1),
            eventType: EventType.DecisionTaskStarted,
        }),
        new Memo({
            fields: new Map([['key', Buffer.from('value')]]),
        }),
        new ResetPoints({
            points: [
                new ResetPointInfo({
                    binaryChecksum: 'checksum',
                }),
            ],
        }),
        new BadBinaries({
            binaries: new Map([
                [
                    'key',
                    new BadBinaryInfo({
                        reason: 'reason',
                    }),
                ],
            ]),
        }),
        new VersionHistories({
            currentVersionHistoryIndex: 1,
        }),
        undefined,
    ];

    for (const input of inputs) {
        const serialized = thriftrwEncode(input);
        let deserialized: unknown = undefined;

        if (input != null) {
            deserialized = createEmptyPointer(input);
            thriftrwDecode(serialized, deserialized);
        }

        expect(deserialized).toEqual(input);
    }
}

export function TestSerialization_corner_cases(): void {
    const res = serialize(undefined, EncodingType.ThriftRW);
    expect(res).toBeUndefined();

    expect(() => SerializeBatchEvents(undefined, -1 as EncodingType)).toThrow(
        'unknown or unsupported encoding type'
    );

    expect(() => Encode(undefined)).toThrow(MsgPayloadNotThriftEncoded);
}

export function createEmptyPointer(input: unknown): unknown {
  if (input === null || typeof input !== "object") {
    throw "input must be a pointer to a struct";
  }
  return goZeroOfSameType(input);
}
