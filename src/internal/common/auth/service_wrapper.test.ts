// Suite module for service_wrapper_test.ts. Registration is kept out of the declaration module so that a sibling
// test module importing it for a helper does not also register this suite.
import { describe, it, beforeAll, beforeEach, afterEach } from 'vitest';
import {
  TestServiceWrapperSuite,
  serviceWrapperSuite,
} from './service_wrapper_test.js';

describe("service_wrapper", () => {
  it("TestServiceWrapperSuite", TestServiceWrapperSuite);
  describe("serviceWrapperSuite", () => {
    let s: serviceWrapperSuite;
    beforeAll(async () => {
      s = new serviceWrapperSuite();
    });
    beforeEach(async () => { await s.SetupTest(); });
    afterEach(async () => { await s.TearDownTest(); });
    it.skip("TestGetClusterInfoInvalidToken", async () => { await s.TestGetClusterInfoInvalidToken(); });
    it.skip("TestRequestCancelWorkflowExecutionInvalidToken", async () => { await s.TestRequestCancelWorkflowExecutionInvalidToken(); });
  });
});
