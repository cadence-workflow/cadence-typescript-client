// Suite module for workflow_testsuite_test.ts. Registration is kept out of the declaration module so that a sibling
// test module importing it for a helper does not also register this suite.
import { describe, it } from 'vitest';
import {
  TestSetWorkflowTimeout,
  TestSetMemoOnStart,
  TestSetSearchAttributesOnStart,
  TestUnregisteredActivity,
  TestNoExplicitRegistrationRequired,
  TestWorkflowReturnNil,
} from './workflow_testsuite_test.js';

describe("workflow_testsuite", () => {
  it("TestSetWorkflowTimeout", TestSetWorkflowTimeout);
  it("TestSetMemoOnStart", TestSetMemoOnStart);
  it("TestSetSearchAttributesOnStart", TestSetSearchAttributesOnStart);
  it("TestUnregisteredActivity", TestUnregisteredActivity);
  it("TestNoExplicitRegistrationRequired", TestNoExplicitRegistrationRequired);
  it("TestWorkflowReturnNil", TestWorkflowReturnNil);
});
