// Suite module for retry_test.ts. Registration is kept out of the declaration module so that a sibling
// test module importing it for a helper does not also register this suite.
import { describe, it } from 'vitest';
import {
  TestRetry,
  TestConcurrentRetrier,
} from './retry_test.js';

describe("retry", () => {
  it("TestRetry", TestRetry);
  it("TestConcurrentRetrier", TestConcurrentRetrier);
});
