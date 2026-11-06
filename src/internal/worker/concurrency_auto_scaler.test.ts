// Suite module for concurrency_auto_scaler_test.ts. Registration is kept out of the declaration module so that a sibling
// test module importing it for a helper does not also register this suite.
import { describe, it } from 'vitest';
import {
  TestConcurrencyAutoScaler,
  TestRollingAverage,
  TestRollingAverage_Race,
} from './concurrency_auto_scaler_test.js';

describe("concurrency_auto_scaler", () => {
  it("TestConcurrencyAutoScaler", TestConcurrencyAutoScaler);
  it("TestRollingAverage", TestRollingAverage);
  it("TestRollingAverage_Race", TestRollingAverage_Race);
});
