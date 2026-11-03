// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { BytesBuffer } from '../../runtime/bytes_buffer.js';
import { GoThriftStructLike, thriftDecode, thriftEncode, isThriftStruct, thriftDecodeList, thriftEncodeList } from '../../runtime/thrift_codec.js';
import { IDataBlob as shared_IDataBlob, DataBlob as shared_DataBlob } from '../../../generated/thrift/cadence-idl/com/uber/cadence/DataBlob.js';
import { EncodingType as shared_EncodingType } from '../../../generated/thrift/cadence-idl/com/uber/cadence/EncodingType.js';
import { IHistory as shared_IHistory, History as shared_History } from '../../../generated/thrift/cadence-idl/com/uber/cadence/History.js';
import { IHistoryEvent as shared_IHistoryEvent } from '../../../generated/thrift/cadence-idl/com/uber/cadence/HistoryEvent.js';
import { HistoryEventFilterType as shared_HistoryEventFilterType } from '../../../generated/thrift/cadence-idl/com/uber/cadence/HistoryEventFilterType.js';
import { BadRequestError, InternalServiceError as shared_InternalServiceError } from '../../../errors/idl_errors.js';
import { EncodeThriftJSON } from '../../runtime/idl_json.js';

export type ThriftObject = GoThriftStructLike;

/**
 * Decode decode the object
 */
export function Decode(binary: Buffer, val: ThriftObject): void {
    if (binary.length < 1) {
        throw MissingBinaryEncodingVersion;
    }

    const version = binary[0];
    if (version !== preambleVersion0) {
        throw InvalidBinaryEncodingVersion;
    }

    Object.assign(
        val,
        thriftDecode(
            binary.subarray(1),
            val.constructor as unknown as { read(input: any): typeof val }
        )
    );
}

/**
 * Encode encode the object
 */
export function Encode(obj: ThriftObject | undefined): Buffer {
    if (obj == null) {
        throw MsgPayloadNotThriftEncoded;
    }

    const writer = new BytesBuffer();
    writer.WriteByte(preambleVersion0);
    writer.Write(thriftEncode(obj));
    return writer.Bytes();
}

/**
 * SerializeBatchEvents will serialize history event data to blob data
 */
export function SerializeBatchEvents(events: shared_IHistoryEvent[], encodingType: shared_EncodingType): shared_IDataBlob {
    return serialize(events, encodingType)!;
}

/**
 * DeserializeBatchEvents will deserialize blob data to history event data
 */
export function DeserializeBatchEvents(data: shared_IDataBlob | undefined): shared_IHistoryEvent[] {
    if (data == null) {
        return [];
    }

    const events = { value: [] as shared_IHistoryEvent[] };
    if (data.Data == null || data.Data.length === 0) {
        return events.value;
    }

    deserialize(data, events);
    return events.value;
}

export function serialize(input: unknown | undefined, encodingType: shared_EncodingType): shared_IDataBlob | undefined {
    if (input == null) {
        return;
    }

    let data: Buffer = Buffer.alloc(0);

    switch (encodingType) {
        case shared_EncodingType.ThriftRW:
            try {
                data = thriftrwEncode(input!);
            } catch (err) {
                if (!(err instanceof Error)) {
                    throw err;
                }
                throw new Error(`cadence serialization error: ${err.message}`);
            }
            break;
        case shared_EncodingType.JSON:
            encodingType = shared_EncodingType.JSON;
            try {
                data = Buffer.from(JSON.stringify(EncodeThriftJSON(input!))!);
            } catch (err) {
                if (!(err instanceof Error)) {
                    throw err;
                }
                throw new Error(`cadence serialization error: ${err.message}`);
            }
            break;
        default:
            throw new Error(`unknown or unsupported encoding type ${encodingType}`);
    }

    return NewDataBlob(data, encodingType);
}

export function thriftrwEncode(input: unknown): Buffer {
  if (Array.isArray(input)) {
    return Encode(new shared_History({ events: input as any[] }));
  }

  if (input !== null && typeof input === 'object') {
    return Encode(input as ThriftObject);
  }

  return Buffer.alloc(0);
}

export function deserialize(data: shared_IDataBlob | undefined, target: unknown): void {
    if (data == null) {
        return;
    }
    if (data.Data == null || data.Data.length === 0) {
        throw new Error("DeserializeEvent empty data");
    }

    try {
        switch (data.EncodingType!) {
            case shared_EncodingType.ThriftRW:
                thriftrwDecode(data.Data, target);
                break;
            case shared_EncodingType.JSON:
                Object.assign(target as object, JSON.parse(data.Data.toString("utf8")));
                break;
        }
    } catch (err) {
        if (!(err instanceof Error)) {
            throw err;
        }
        throw new Error(`DeserializeBatchEvents encoding: "${data.EncodingType!}", error: ${err.message}`);
    }
}

/**
 * NewDataBlob creates new blob data
 */
export function NewDataBlob(data: Buffer | undefined, encodingType: shared_EncodingType): shared_IDataBlob | undefined {
    if (data == null || data.length === 0) {
        return;
    }

    return new shared_DataBlob({
        Data: data,
        EncodingType: encodingType,
    });
}

/**
 * DeserializeBlobDataToHistoryEvents deserialize the blob data to history event data
 */
export function DeserializeBlobDataToHistoryEvents(dataBlobs: shared_IDataBlob[], filterType: shared_HistoryEventFilterType): shared_IHistory {
    let historyEvents: shared_IHistoryEvent[] = [];

    for (const batch of dataBlobs) {
        const events = DeserializeBatchEvents(batch);
        if (events.length === 0) {
            throw new shared_InternalServiceError({
                message: 'corrupted history event batch, empty events',
            });
        }

        historyEvents.push(...events);
    }

    if (filterType === shared_HistoryEventFilterType.CLOSE_EVENT) {
        if (historyEvents.length === 0) {
            throw new Error('runtime error: index out of range');
        }
        historyEvents = [historyEvents[historyEvents.length - 1]];
    }

    return new shared_History({ events: historyEvents });
}

export function thriftrwDecode(data: Buffer, target: unknown): void {
    if (target != null && typeof target === "object") {
        const box = target as { value?: unknown };
        if (Array.isArray(box.value)) {
            const history = new shared_History({ events: box.value as shared_IHistory["events"] });
            Decode(data, history);
            box.value = history.events;
            return;
        }

        const constructorName = (target as { constructor?: { name?: string } }).constructor?.name;
        if (
            constructorName === "HistoryEvent" ||
            constructorName === "Memo" ||
            constructorName === "ResetPoints" ||
            constructorName === "BadBinaries" ||
            constructorName === "VersionHistories"
        ) {
            Decode(data, target as ThriftObject);
        }
    }
}

/**
 * used by thriftrw binary codec
 */
export const preambleVersion0 = 89;

/**
 * MissingBinaryEncodingVersion indicate that the encoding version is missing
 */
export let MissingBinaryEncodingVersion = new BadRequestError({ message: "Missing binary encoding version." });

/**
 * InvalidBinaryEncodingVersion indicate that the encoding version is incorrect
 */
export let InvalidBinaryEncodingVersion = new BadRequestError({ message: "Invalid binary encoding version." });

/**
 * MsgPayloadNotThriftEncoded indicate message is not thrift encoded
 */
export let MsgPayloadNotThriftEncoded = new BadRequestError({ message: "Message payload is not thrift encoded." });
