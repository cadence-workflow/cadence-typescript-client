// Suite module for workerstats_noop_test.ts. Registration is kept out of the declaration module so that a sibling
// test module importing it for a helper does not also register this suite.
import { describe, it } from 'vitest';
import {
  TestWorkerStats,
} from './workerstats_noop_test.js';

describe("workerstats_noop", () => {
  it("TestWorkerStats", TestWorkerStats);
});
