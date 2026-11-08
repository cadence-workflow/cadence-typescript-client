// Suite module for retrypolicy_test.ts. Registration is kept out of the declaration module so that a sibling
// test module importing it for a helper does not also register this suite.
import { describe, it } from 'vitest';
import {
  TestExponentialBackoff,
  TestNumberOfAttempts,
  TestMaximumInterval,
  TestBackoffCoefficient,
  TestExpirationInterval,
  TestExpirationOverflow,
  TestDefaultPublishRetryPolicy,
  TestNoMaxAttempts,
  TestUnbounded,
} from './retrypolicy_test.js';

describe("retrypolicy", () => {
  it("TestExponentialBackoff", TestExponentialBackoff);
  it("TestNumberOfAttempts", TestNumberOfAttempts);
  it("TestMaximumInterval", TestMaximumInterval);
  it("TestBackoffCoefficient", TestBackoffCoefficient);
  it("TestExpirationInterval", TestExpirationInterval);
  it("TestExpirationOverflow", TestExpirationOverflow);
  it("TestDefaultPublishRetryPolicy", TestDefaultPublishRetryPolicy);
  it("TestNoMaxAttempts", TestNoMaxAttempts);
  it("TestUnbounded", TestUnbounded);
});
