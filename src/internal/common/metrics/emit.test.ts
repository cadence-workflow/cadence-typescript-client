// Suite module for emit_test.ts. Registration is kept out of the declaration module so that a sibling
// test module importing it for a helper does not also register this suite.
import { describe, it } from 'vitest';
import {
  TestEmitLatency_DefaultMode,
  TestEmitLatency_DualMode,
  TestEmitLatency_HistogramOnlyMode,
  TestEmitLatency_TimersOnlyMode,
  TestEmitLatency_DifferentHistograms,
  TestMetricEmitMode_ConcurrentAccess,
} from './emit_test.js';
describe("emit", () => {
  it("TestEmitLatency_DefaultMode", TestEmitLatency_DefaultMode);
  it("TestEmitLatency_DualMode", TestEmitLatency_DualMode);
  it("TestEmitLatency_HistogramOnlyMode", TestEmitLatency_HistogramOnlyMode);
  it("TestEmitLatency_TimersOnlyMode", TestEmitLatency_TimersOnlyMode);
  it("TestEmitLatency_DifferentHistograms", TestEmitLatency_DifferentHistograms);
  it("TestMetricEmitMode_ConcurrentAccess", TestMetricEmitMode_ConcurrentAccess);
});
