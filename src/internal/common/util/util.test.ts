// Suite module for util_test.ts. Registration is kept out of the declaration module so that a sibling
// test module importing it for a helper does not also register this suite.
import { describe, it } from 'vitest';
import {
  Test_MergeDicts,
  Test_AwaitWaitGroup,
  Test_IsTypeByteSlice,
} from './util_test.js';

describe("util", () => {
  it("Test_MergeDicts", Test_MergeDicts);
  it("Test_AwaitWaitGroup", Test_AwaitWaitGroup);
  it("Test_IsTypeByteSlice", Test_IsTypeByteSlice);
});
