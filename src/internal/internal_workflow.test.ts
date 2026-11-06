// Suite module for internal_workflow_test.ts. Registration is kept out of the declaration module so that a sibling
// test module importing it for a helper does not also register this suite.
import { describe, it, beforeAll, beforeEach } from 'vitest';
import { GoTestifySuite } from './runtime/testify_suite.js';
import {
  TestWorkflowUnitTest,
  TestWorkflowPanic,
  TestWorkflowReturnsPanic,
  TestTimerWorkflow,
  TestActivityCancellation,
  TestWorkflowOption,
  WorkflowUnitTest,
  WorkflowOptionTest,
} from './internal_workflow_test.js';

describe("internal_workflow", () => {
  it("TestWorkflowUnitTest", TestWorkflowUnitTest);
  it.skip("TestWorkflowPanic", TestWorkflowPanic);
  it.skip("TestWorkflowReturnsPanic", TestWorkflowReturnsPanic);
  it("TestTimerWorkflow", TestTimerWorkflow);
  it("TestActivityCancellation", TestActivityCancellation);
  it("TestWorkflowOption", TestWorkflowOption);
  describe("WorkflowUnitTest", () => {
    let s: WorkflowUnitTest;
    beforeAll(async () => {
      s = new WorkflowUnitTest();
      await s.SetupSuite();
    });
    beforeEach(async () => { await s.SetupTest(); });
    it("Test_ActivityOptionsWorkflow", async (ctx) => { try { await s.Test_ActivityOptionsWorkflow(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_BufferedChanWithSelectorWorkflow", async (ctx) => { try { await s.Test_BufferedChanWithSelectorWorkflow(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_BufferedChanWorkflow", async (ctx) => { try { await s.Test_BufferedChanWorkflow(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_CancelWorkflow", async (ctx) => { try { await s.Test_CancelWorkflow(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_CancelWorkflowAfterActivity", async (ctx) => { try { await s.Test_CancelWorkflowAfterActivity(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_ClockWorkflow", async (ctx) => { try { await s.Test_ClockWorkflow(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_CloseChannelInSelectWorkflow", async (ctx) => { try { await s.Test_CloseChannelInSelectWorkflow(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_CloseChannelWorkflow", async (ctx) => { try { await s.Test_CloseChannelWorkflow(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_ContinueAsNewWorkflow", async (ctx) => { try { await s.Test_ContinueAsNewWorkflow(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_ConvertFromThriftRetryPolicyNil", async (ctx) => { try { await s.Test_ConvertFromThriftRetryPolicyNil(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_CorruptedSignalOnClosedChannelWorkflow_ReceiveAsync_ShouldComplete", async (ctx) => { try { await s.Test_CorruptedSignalOnClosedChannelWorkflow_ReceiveAsync_ShouldComplete(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_CorruptedSignalOnClosedChannelWorkflow_Receive_ShouldComplete", async (ctx) => { try { await s.Test_CorruptedSignalOnClosedChannelWorkflow_Receive_ShouldComplete(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_CorruptedSignalWorkflow_OnSelectorRead_ShouldLogMetricsAndNotPanic", async (ctx) => { try { await s.Test_CorruptedSignalWorkflow_OnSelectorRead_ShouldLogMetricsAndNotPanic(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_CorruptedSignalWorkflow_ReceiveAsync_ShouldLogMetricsAndNotPanic", async (ctx) => { try { await s.Test_CorruptedSignalWorkflow_ReceiveAsync_ShouldLogMetricsAndNotPanic(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_CorruptedSignalWorkflow_ShouldLogMetricsAndNotPanic", async (ctx) => { try { await s.Test_CorruptedSignalWorkflow_ShouldLogMetricsAndNotPanic(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_ExternalExampleWorkflow", async (ctx) => { try { await s.Test_ExternalExampleWorkflow(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_GetActivityOptions", async (ctx) => { try { await s.Test_GetActivityOptions(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_GetActivityOptionsNil", async (ctx) => { try { await s.Test_GetActivityOptionsNil(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_GetActivityOptionsNoContext", async (ctx) => { try { await s.Test_GetActivityOptionsNoContext(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_MemoWorkflow", async (ctx) => { try { await s.Test_MemoWorkflow(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_SignalWorkflow", async (ctx) => { try { await s.Test_SignalWorkflow(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_SingleActivityWorkflow", async (ctx) => { try { await s.Test_SingleActivityWorkflow(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_SingleActivityWorkflowIsErrorMessagesMatched", async (ctx) => { try { await s.Test_SingleActivityWorkflowIsErrorMessagesMatched(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_SplitJoinActivityWorkflow", async (ctx) => { try { await s.Test_SplitJoinActivityWorkflow(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_StaleGoroutinesAreShutDown", async (ctx) => { try { await s.Test_StaleGoroutinesAreShutDown(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_WaitGroupMultipleConcurrentWaitsPanicsWorkflowTest", async (ctx) => { try { await s.Test_WaitGroupMultipleConcurrentWaitsPanicsWorkflowTest(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_WaitGroupMultipleWaitsWorkflowTest", async (ctx) => { try { await s.Test_WaitGroupMultipleWaitsWorkflowTest(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_WaitGroupWaitForMWorkflowTest", async (ctx) => { try { await s.Test_WaitGroupWaitForMWorkflowTest(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_WaitGroupWorkflowTest", async (ctx) => { try { await s.Test_WaitGroupWorkflowTest(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_WorldWorkflow", async (ctx) => { try { await s.Test_WorldWorkflow(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_waitGroupNegativeCounterPanicsWorkflowTest", async (ctx) => { try { await s.Test_waitGroupNegativeCounterPanicsWorkflowTest(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
  });
  describe("WorkflowOptionTest", () => {
    let s: WorkflowOptionTest;
    beforeAll(async () => {
      s = new WorkflowOptionTest();
    });
    it("TestKnowQueryType_NoHandlers", async (ctx) => { try { await s.TestKnowQueryType_NoHandlers(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestKnowQueryType_WithHandlers", async (ctx) => { try { await s.TestKnowQueryType_WithHandlers(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
  });
});
