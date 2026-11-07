// Suite module for concurrency_auto_scaler_test.ts. Registration is kept out of the declaration module so that a sibling
// test module importing it for a helper does not also register this suite.
import { describe, it } from 'vitest';
import {
  TestRollingAverage,
} from './concurrency_auto_scaler_test.js';
describe("concurrency_auto_scaler", () => {
  it("TestRollingAverage", TestRollingAverage);
});
