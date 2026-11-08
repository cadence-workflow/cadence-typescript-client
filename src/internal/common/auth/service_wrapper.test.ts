// Suite module for service_wrapper_test.ts. Registration is kept out of the declaration module so that a sibling
// test module importing it for a helper does not also register this suite.
import { describe, it } from 'vitest';
import {
  TestServiceWrapperSuite,
} from './service_wrapper_test.js';

describe("service_wrapper", () => {
  it("TestServiceWrapperSuite", TestServiceWrapperSuite);
});
