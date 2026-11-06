// Suite module for service_wrapper_test.ts. Registration is kept out of the declaration module so that a sibling
// test module importing it for a helper does not also register this suite.
import { describe, it, beforeAll, beforeEach, afterEach } from 'vitest';
import { GoTestifySuite } from '../../runtime/testify_suite.js';
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
    it("TestCountWorkflowExecutionsInvalidToken", async (ctx) => { try { await s.TestCountWorkflowExecutionsInvalidToken(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestDeleteDomainInvalidToken", async (ctx) => { try { await s.TestDeleteDomainInvalidToken(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestDeprecateDomainInvalidToken", async (ctx) => { try { await s.TestDeprecateDomainInvalidToken(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestDescribeDomainInvalidToken", async (ctx) => { try { await s.TestDescribeDomainInvalidToken(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestDescribeTaskListInvalidToken", async (ctx) => { try { await s.TestDescribeTaskListInvalidToken(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestDescribeWorkflowExecutionInvalidToken", async (ctx) => { try { await s.TestDescribeWorkflowExecutionInvalidToken(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestDiagnoseWorkflowExecutionInvalidToken", async (ctx) => { try { await s.TestDiagnoseWorkflowExecutionInvalidToken(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestFailoverDomainInvalidToken", async (ctx) => { try { await s.TestFailoverDomainInvalidToken(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it.skip("TestGetClusterInfoInvalidToken", async () => { await s.TestGetClusterInfoInvalidToken(); });
    it("TestGetSearchAttributesInvalidToken", async (ctx) => { try { await s.TestGetSearchAttributesInvalidToken(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestGetWorkflowExecutionHistoryInvalidToken", async (ctx) => { try { await s.TestGetWorkflowExecutionHistoryInvalidToken(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestListArchivedWorkflowExecutionsInvalidToken", async (ctx) => { try { await s.TestListArchivedWorkflowExecutionsInvalidToken(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestListClosedWorkflowExecutionsInvalidToken", async (ctx) => { try { await s.TestListClosedWorkflowExecutionsInvalidToken(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestListDomainsInvalidToken", async (ctx) => { try { await s.TestListDomainsInvalidToken(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestListFailoverHistoryInvalidToken", async (ctx) => { try { await s.TestListFailoverHistoryInvalidToken(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestListOpenWorkflowExecutionsInvalidToken", async (ctx) => { try { await s.TestListOpenWorkflowExecutionsInvalidToken(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestListTaskListPartitionsInvalidToken", async (ctx) => { try { await s.TestListTaskListPartitionsInvalidToken(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestListWorkflowExecutionsInvalidToken", async (ctx) => { try { await s.TestListWorkflowExecutionsInvalidToken(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestPollForActivityTaskInvalidToken", async (ctx) => { try { await s.TestPollForActivityTaskInvalidToken(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestPollForDecisionTaskInvalidToken", async (ctx) => { try { await s.TestPollForDecisionTaskInvalidToken(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestQueryWorkflowInvalidToken", async (ctx) => { try { await s.TestQueryWorkflowInvalidToken(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestRecordActivityTaskHeartbeatByIDInvalidToken", async (ctx) => { try { await s.TestRecordActivityTaskHeartbeatByIDInvalidToken(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestRecordActivityTaskHeartbeatInvalidToken", async (ctx) => { try { await s.TestRecordActivityTaskHeartbeatInvalidToken(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestRegisterDomainInvalidToken", async (ctx) => { try { await s.TestRegisterDomainInvalidToken(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it.skip("TestRequestCancelWorkflowExecutionInvalidToken", async () => { await s.TestRequestCancelWorkflowExecutionInvalidToken(); });
    it("TestResetStickyTaskListInvalidToken", async (ctx) => { try { await s.TestResetStickyTaskListInvalidToken(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestResetWorkflowExecutionInvalidToken", async (ctx) => { try { await s.TestResetWorkflowExecutionInvalidToken(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestRespondActivityTaskCanceledByIDInvalidToken", async (ctx) => { try { await s.TestRespondActivityTaskCanceledByIDInvalidToken(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestRespondActivityTaskCanceledInvalidToken", async (ctx) => { try { await s.TestRespondActivityTaskCanceledInvalidToken(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestRespondActivityTaskCompletedByIDInvalidToken", async (ctx) => { try { await s.TestRespondActivityTaskCompletedByIDInvalidToken(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestRespondActivityTaskCompletedInvalidToken", async (ctx) => { try { await s.TestRespondActivityTaskCompletedInvalidToken(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestRespondActivityTaskFailedByIDInvalidToken", async (ctx) => { try { await s.TestRespondActivityTaskFailedByIDInvalidToken(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestRespondActivityTaskFailedInvalidToken", async (ctx) => { try { await s.TestRespondActivityTaskFailedInvalidToken(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestRespondDecisionTaskCompletedInvalidToken", async (ctx) => { try { await s.TestRespondDecisionTaskCompletedInvalidToken(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestRespondDecisionTaskFailedInvalidToken", async (ctx) => { try { await s.TestRespondDecisionTaskFailedInvalidToken(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestRespondQueryTaskCompletedInvalidToken", async (ctx) => { try { await s.TestRespondQueryTaskCompletedInvalidToken(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestScanWorkflowExecutionsInvalidToken", async (ctx) => { try { await s.TestScanWorkflowExecutionsInvalidToken(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestSignalWithStartWorkflowExecutionAsyncInvalidToken", async (ctx) => { try { await s.TestSignalWithStartWorkflowExecutionAsyncInvalidToken(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestSignalWithStartWorkflowExecutionInvalidToken", async (ctx) => { try { await s.TestSignalWithStartWorkflowExecutionInvalidToken(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestSignalWorkflowExecutionInvalidToken", async (ctx) => { try { await s.TestSignalWorkflowExecutionInvalidToken(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestStartWorkflowExecutionAsyncInvalidToken", async (ctx) => { try { await s.TestStartWorkflowExecutionAsyncInvalidToken(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestStartWorkflowExecutionInvalidToken", async (ctx) => { try { await s.TestStartWorkflowExecutionInvalidToken(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestTerminateWorkflowExecutionInvalidToken", async (ctx) => { try { await s.TestTerminateWorkflowExecutionInvalidToken(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestUpdateDomainInvalidToken", async (ctx) => { try { await s.TestUpdateDomainInvalidToken(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
  });
});
