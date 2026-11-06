// Suite module for histograms_test.ts. Registration is kept out of the declaration module so that a sibling
// test module importing it for a helper does not also register this suite.
import { describe, it } from 'vitest';
import {
  TestHistogramBuckets,
  TestHistogramValues,
  TestSubset,
  TestSubsetPanics,
  TestMakeSubsettableHistogramPanics,
  TestRecordHistogram,
  TestStartHistogram,
} from './histograms_test.js';

describe("histograms", () => {
  it("TestHistogramBuckets", TestHistogramBuckets);
  it("TestHistogramValues", TestHistogramValues);
  it("TestSubset", TestSubset);
  it("TestSubsetPanics", TestSubsetPanics);
  it("TestMakeSubsettableHistogramPanics", TestMakeSubsettableHistogramPanics);
  it("TestRecordHistogram", TestRecordHistogram);
  it("TestStartHistogram", TestStartHistogram);
});
