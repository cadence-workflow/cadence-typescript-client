// Suite module for error_test.ts. Registration is kept out of the declaration module so that a sibling
// test module importing it for a helper does not also register this suite.
import { describe, it } from 'vitest';
import {
  TestErrors,
} from './error_test.js';

describe("error", () => {
  it("TestErrors", TestErrors);
});
