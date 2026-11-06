// Suite module for encoded_test.ts. Registration is kept out of the declaration module so that a sibling
// test module importing it for a helper does not also register this suite.
import { describe, it } from 'vitest';
import {
  TestDefaultDataConverter,
  TestDecodeArg,
} from './encoded_test.js';

describe("encoded", () => {
  it("TestDefaultDataConverter", TestDefaultDataConverter);
  it("TestDecodeArg", TestDecodeArg);
});
