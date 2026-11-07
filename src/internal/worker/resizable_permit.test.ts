// Suite module for resizable_permit_test.ts. Registration is kept out of the declaration module so that a sibling
// test module importing it for a helper does not also register this suite.
import { describe, it } from 'vitest';
import {
  Test_Permit_Release,
} from './resizable_permit_test.js';
describe("resizable_permit", () => {
  it("Test_Permit_Release", Test_Permit_Release);
});
