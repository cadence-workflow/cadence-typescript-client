// Suite module for internal_workflow_client_test.ts. Registration is kept out of the declaration module so that a sibling
// test module importing it for a helper does not also register this suite.
import { describe, it, beforeAll, beforeEach, afterEach } from 'vitest';
import { GoTestifySuite } from './runtime/testify_suite.js';
import {
  TestHistoryEventIteratorSuite,
  TestWorkflowRunSuite,
  TestWorkflowClientSuite,
  workflowClientTestSuite,
} from './internal_workflow_client_test.js';

describe("internal_workflow_client", () => {
  it("TestHistoryEventIteratorSuite", TestHistoryEventIteratorSuite);
  it("TestWorkflowRunSuite", TestWorkflowRunSuite);
  it("TestWorkflowClientSuite", TestWorkflowClientSuite);
  describe("workflowClientTestSuite", () => {
    let s: workflowClientTestSuite;
    beforeAll(async () => {
      s = new workflowClientTestSuite();
      await s.SetupSuite();
    });
    beforeEach(async () => { await s.SetupTest(); });
    afterEach(async () => { await s.TearDownTest(); });
    it("TestGetWorkflowMemo", async (ctx) => { try { await s.TestGetWorkflowMemo(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestSerializeSearchAttributes", async (ctx) => { try { await s.TestSerializeSearchAttributes(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestSignalWithStartWorkflowAsync_RequestCreationFails", async (ctx) => { try { await s.TestSignalWithStartWorkflowAsync_RequestCreationFails(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestSignalWithStartWorkflow_RequestCreationFails", async (ctx) => { try { await s.TestSignalWithStartWorkflow_RequestCreationFails(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestStartWorkflowAsync_RequestCreationFails", async (ctx) => { try { await s.TestStartWorkflowAsync_RequestCreationFails(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestStartWorkflow_RequestCreationFails", async (ctx) => { try { await s.TestStartWorkflow_RequestCreationFails(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
  });
});
