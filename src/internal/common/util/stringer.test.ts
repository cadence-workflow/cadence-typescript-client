// Suite module for stringer_test.ts. Registration is kept out of the declaration module so that a sibling
// test module importing it for a helper does not also register this suite.
import { describe, it } from 'vitest';
import {
  Test_anyToString,
  Test_byteSliceToString,
  TestHistoryEventToString,
  Test_getHistoryEventData,
  TestDecisionToString,
  Test_decisionGetData,
} from './stringer_test.js';

describe("stringer", () => {
  it("Test_anyToString", Test_anyToString);
  it("Test_byteSliceToString", Test_byteSliceToString);
  it("TestHistoryEventToString", TestHistoryEventToString);
  it("Test_getHistoryEventData", Test_getHistoryEventData);
  it("TestDecisionToString", TestDecisionToString);
  it("Test_decisionGetData", Test_decisionGetData);
});
