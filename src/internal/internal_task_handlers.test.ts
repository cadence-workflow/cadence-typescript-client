// Suite module for internal_task_handlers_test.ts. Registration is kept out of the declaration module so that a sibling
// test module importing it for a helper does not also register this suite.
import { describe, it, beforeAll, beforeEach } from 'vitest';
import { GoTestifySuite } from './runtime/testify_suite.js';
import {
  TestTaskHandlersTestSuite,
  Test_NonDeterministicCheck,
  Test_IsDecisionMatchEvent_UpsertWorkflowSearchAttributes,
  Test_IsSearchAttributesMatched,
  Test__GetWorkflowStartedEvent,
  Test__verifyAllEventsProcessed,
  Test__workflowCategorizedByTimeout,
  Test__getRetryBackoffWithNowTime,
  TaskHandlersTestSuite,
} from './internal_task_handlers_test.js';

describe("internal_task_handlers", () => {
  it("TestTaskHandlersTestSuite", TestTaskHandlersTestSuite);
  it.skip("Test_NonDeterministicCheck", Test_NonDeterministicCheck);
  it("Test_IsDecisionMatchEvent_UpsertWorkflowSearchAttributes", Test_IsDecisionMatchEvent_UpsertWorkflowSearchAttributes);
  it("Test_IsSearchAttributesMatched", Test_IsSearchAttributesMatched);
  it("Test__GetWorkflowStartedEvent", Test__GetWorkflowStartedEvent);
  it("Test__verifyAllEventsProcessed", Test__verifyAllEventsProcessed);
  it("Test__workflowCategorizedByTimeout", Test__workflowCategorizedByTimeout);
  it("Test__getRetryBackoffWithNowTime", Test__getRetryBackoffWithNowTime);
  describe("TaskHandlersTestSuite", () => {
    let s: TaskHandlersTestSuite;
    beforeAll(async () => {
      s = new TaskHandlersTestSuite();
      await s.SetupSuite();
    });
    beforeEach(async () => { await s.SetupTest(); });
    it("TestCacheEvictionWhenErrorOccurs", async (ctx) => { try { await s.TestCacheEvictionWhenErrorOccurs(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestConsistentQuery_InvalidQueryTask", async (ctx) => { try { await s.TestConsistentQuery_InvalidQueryTask(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestConsistentQuery_Success", async (ctx) => { try { await s.TestConsistentQuery_Success(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestGetWorkflowInfo", async (ctx) => { try { await s.TestGetWorkflowInfo(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestHeartBeatLogCanceledError", async (ctx) => { try { await s.TestHeartBeatLogCanceledError(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestHeartBeatLogNil", async (ctx) => { try { await s.TestHeartBeatLogNil(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestHeartBeatLogNotCanceled", async (ctx) => { try { await s.TestHeartBeatLogNotCanceled(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestLocalActivityRetry_DecisionHeartbeatFail", async (ctx) => { try { await s.TestLocalActivityRetry_DecisionHeartbeatFail(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it.skip("TestRegression_QueriesDoNotLeakGoroutines", async () => { await s.TestRegression_QueriesDoNotLeakGoroutines(); });
    it("TestSideEffectDefer_NonSticky", async (ctx) => { try { await s.TestSideEffectDefer_NonSticky(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestSideEffectDefer_Sticky", async (ctx) => { try { await s.TestSideEffectDefer_Sticky(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestWithMissingHistoryEvents", async (ctx) => { try { await s.TestWithMissingHistoryEvents(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestWithTruncatedHistory", async (ctx) => { try { await s.TestWithTruncatedHistory(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestWorkflowTask_ActivityTaskScheduled", async (ctx) => { try { await s.TestWorkflowTask_ActivityTaskScheduled(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestWorkflowTask_BinaryChecksum", async (ctx) => { try { await s.TestWorkflowTask_BinaryChecksum(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestWorkflowTask_CancelActivityBeforeSent", async (ctx) => { try { await s.TestWorkflowTask_CancelActivityBeforeSent(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestWorkflowTask_NondeterministicDetection", async (ctx) => { try { await s.TestWorkflowTask_NondeterministicDetection(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestWorkflowTask_NondeterministicLogNonexistingID", async (ctx) => { try { await s.TestWorkflowTask_NondeterministicLogNonexistingID(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestWorkflowTask_PageToken", async (ctx) => { try { await s.TestWorkflowTask_PageToken(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestWorkflowTask_QueryWorkflow", async (ctx) => { try { await s.TestWorkflowTask_QueryWorkflow(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestWorkflowTask_QueryWorkflow_2", async (ctx) => { try { await s.TestWorkflowTask_QueryWorkflow_2(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestWorkflowTask_WorkflowExecutionStarted", async (ctx) => { try { await s.TestWorkflowTask_WorkflowExecutionStarted(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestWorkflowTask_WorkflowExecutionStarted_WithDataConverter", async (ctx) => { try { await s.TestWorkflowTask_WorkflowExecutionStarted_WithDataConverter(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestWorkflowTask_WorkflowPanics", async (ctx) => { try { await s.TestWorkflowTask_WorkflowPanics(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestWorkflowTask_WorkflowReturnsPanicError", async (ctx) => { try { await s.TestWorkflowTask_WorkflowReturnsPanicError(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
  });
});
