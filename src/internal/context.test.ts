// Suite module for context_test.ts. Registration is kept out of the declaration module so that a sibling
// test module importing it for a helper does not also register this suite.
import { describe, it } from 'vitest';
import {
  TestContextChildParentCancelRace,
  TestContextConcurrentCancelRace,
  TestContextAddChildCancelParentRace,
  TestContextCancellationOrderDeterminism,
} from './context_test.js';

describe("context", () => {
  it("TestContextChildParentCancelRace", TestContextChildParentCancelRace);
  it("TestContextConcurrentCancelRace", TestContextConcurrentCancelRace);
  it("TestContextAddChildCancelParentRace", TestContextAddChildCancelParentRace);
  it("TestContextCancellationOrderDeterminism", TestContextCancellationOrderDeterminism);
});
