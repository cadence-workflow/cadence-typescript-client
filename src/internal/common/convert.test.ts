// Suite module for convert_test.ts. Registration is kept out of the declaration module so that a sibling
// test module importing it for a helper does not also register this suite.
import { describe, it } from 'vitest';
import {
  TestPtrOf,
  TestPtrHelpers,
  TestCeilHelpers,
  TestValueFromPtr,
  TestZero,
} from './convert_test.js';

describe("convert", () => {
  it("TestPtrOf", TestPtrOf);
  it("TestPtrHelpers", TestPtrHelpers);
  it("TestCeilHelpers", TestCeilHelpers);
  it("TestValueFromPtr", TestValueFromPtr);
  it("TestZero", TestZero);
});
