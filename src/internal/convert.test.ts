// Suite module for convert_test.ts. Registration is kept out of the declaration module so that a sibling
// test module importing it for a helper does not also register this suite.
import { describe, it } from 'vitest';
import {
  TestConvertRetryPolicy,
  TestConvertActiveClusterSelectionPolicy,
  TestConvertQueryConsistencyLevel,
} from './convert_test.js';

describe("convert", () => {
  it("TestConvertRetryPolicy", TestConvertRetryPolicy);
  it("TestConvertActiveClusterSelectionPolicy", TestConvertActiveClusterSelectionPolicy);
  it("TestConvertQueryConsistencyLevel", TestConvertQueryConsistencyLevel);
});
