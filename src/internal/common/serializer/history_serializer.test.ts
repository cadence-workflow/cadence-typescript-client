// Suite module for history_serializer_test.ts. Registration is kept out of the declaration module so that a sibling
// test module importing it for a helper does not also register this suite.
import { describe, it } from 'vitest';
import {
  TestSerializationRoundup,
  TestDeserializeBlobDataToHistoryEvents,
  TestDeserializeBlobDataToHistoryEvents_failure,
  TestThriftEncodingRoundtrip,
  TestSerialization_corner_cases,
} from './history_serializer_test.js';

describe("history_serializer", () => {
  it("TestSerializationRoundup", TestSerializationRoundup);
  it("TestDeserializeBlobDataToHistoryEvents", TestDeserializeBlobDataToHistoryEvents);
  it("TestDeserializeBlobDataToHistoryEvents_failure", TestDeserializeBlobDataToHistoryEvents_failure);
  it("TestThriftEncodingRoundtrip", TestThriftEncodingRoundtrip);
  it("TestSerialization_corner_cases", TestSerialization_corner_cases);
});
