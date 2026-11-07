// Suite module for thrift_util_test.ts. Registration is kept out of the declaration module so that a sibling
// test module importing it for a helper does not also register this suite.
import { describe, it } from 'vitest';
import {
  TestTListSerialize,
  TestTListDeserialize,
  TestIsUseThriftDecoding,
  TestIsThriftType,
} from './thrift_util_test.js';
describe("thrift_util", () => {
  it("TestTListSerialize", TestTListSerialize);
  it("TestTListDeserialize", TestTListDeserialize);
  it("TestIsUseThriftDecoding", TestIsUseThriftDecoding);
  it("TestIsThriftType", TestIsThriftType);
});
