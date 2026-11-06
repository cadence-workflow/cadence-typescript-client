// Suite module for resizable_permit_test.ts. Registration is kept out of the declaration module so that a sibling
// test module importing it for a helper does not also register this suite.
import { describe, it } from 'vitest';
import {
  TestPermit_Simulation,
  Test_Permit_Acquire,
  Test_Permit_Release,
  Test_Permit_AcquireChan,
} from './resizable_permit_test.js';

describe("resizable_permit", () => {
  it("TestPermit_Simulation", TestPermit_Simulation);
  it("Test_Permit_Acquire", Test_Permit_Acquire);
  it("Test_Permit_Release", Test_Permit_Release);
  it("Test_Permit_AcquireChan", Test_Permit_AcquireChan);
});
