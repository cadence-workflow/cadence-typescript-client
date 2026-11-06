// Suite module for registry_test.ts. Registration is kept out of the declaration module so that a sibling
// test module importing it for a helper does not also register this suite.
import { describe, it } from 'vitest';
import {
  TestWorkflowRegistration,
  TestActivityRegistration,
} from './registry_test.js';

describe("registry", () => {
  it("TestWorkflowRegistration", TestWorkflowRegistration);
  it("TestActivityRegistration", TestActivityRegistration);
});
