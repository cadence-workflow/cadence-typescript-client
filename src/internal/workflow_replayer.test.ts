// Suite module for workflow_replayer_test.ts. Registration is kept out of the declaration module so that a sibling
// test module importing it for a helper does not also register this suite.
import { describe, it, beforeAll, beforeEach } from 'vitest';
import { GoTestifySuite } from './runtime/testify_suite.js';
import {
  workflowReplayerSuite,
} from './workflow_replayer_test.js';

describe("workflow_replayer", () => {
  describe("workflowReplayerSuite", () => {
    let s: workflowReplayerSuite;
    beforeAll(async () => {
      s = new workflowReplayerSuite();
    });
    beforeEach(async () => { await s.SetupTest(); });
    it("TestActivityRegistration", async (ctx) => { try { await s.TestActivityRegistration(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestReplayWorkflowHistoryFromFile", async (ctx) => { try { await s.TestReplayWorkflowHistoryFromFile(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestReplayWorkflowHistoryFromFileLocalActivities", async (ctx) => { try { await s.TestReplayWorkflowHistoryFromFileLocalActivities(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestReplayWorkflowHistoryFromFileParent", async (ctx) => { try { await s.TestReplayWorkflowHistoryFromFileParent(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestReplayWorkflowHistory_ContextPropagator", async (ctx) => { try { await s.TestReplayWorkflowHistory_ContextPropagator(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestReplayWorkflowHistory_Full", async (ctx) => { try { await s.TestReplayWorkflowHistory_Full(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestReplayWorkflowHistory_Full_ContinueAsNew", async (ctx) => { try { await s.TestReplayWorkflowHistory_Full_ContinueAsNew(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestReplayWorkflowHistory_Full_ResultMisMatch", async (ctx) => { try { await s.TestReplayWorkflowHistory_Full_ResultMisMatch(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestReplayWorkflowHistory_LocalActivity", async (ctx) => { try { await s.TestReplayWorkflowHistory_LocalActivity(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestReplayWorkflowHistory_LocalActivity_Activity_Type_Mismatch", async (ctx) => { try { await s.TestReplayWorkflowHistory_LocalActivity_Activity_Type_Mismatch(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestReplayWorkflowHistory_LocalActivity_Result_Mismatch", async (ctx) => { try { await s.TestReplayWorkflowHistory_LocalActivity_Result_Mismatch(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestReplayWorkflowHistory_Partial_NoDecisionEvents", async (ctx) => { try { await s.TestReplayWorkflowHistory_Partial_NoDecisionEvents(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestReplayWorkflowHistory_Partial_WithDecisionEvents", async (ctx) => { try { await s.TestReplayWorkflowHistory_Partial_WithDecisionEvents(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
  });
});
