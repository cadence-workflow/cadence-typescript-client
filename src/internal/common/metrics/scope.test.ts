// Suite module for scope_test.ts. Registration is kept out of the declaration module so that a sibling
// test module importing it for a helper does not also register this suite.
import { describe, it } from 'vitest';
import {
  Test_Counter,
  Test_Gauge,
  Test_Timer,
  Test_Histogram,
  Test_ScopeCoverage,
  Test_TaggedScope,
  Test_TaggedScope_WithMultiTags,
} from './scope_test.js';

describe("scope", () => {
  it("Test_Counter", Test_Counter);
  it("Test_Gauge", Test_Gauge);
  it("Test_Timer", Test_Timer);
  it("Test_Histogram", Test_Histogram);
  it("Test_ScopeCoverage", Test_ScopeCoverage);
  it("Test_TaggedScope", Test_TaggedScope);
  it("Test_TaggedScope_WithMultiTags", Test_TaggedScope_WithMultiTags);
});
