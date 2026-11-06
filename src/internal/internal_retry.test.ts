// Suite module for internal_retry_test.ts. Registration is kept out of the declaration module so that a sibling
// test module importing it for a helper does not also register this suite.
import { describe, it } from 'vitest';
import {
  TestErrRetries,
  TestRetryWhileTransientError,
} from './internal_retry_test.js';

describe("internal_retry", () => {
  it("TestErrRetries", TestErrRetries);
  it("TestRetryWhileTransientError", TestRetryWhileTransientError);
});
