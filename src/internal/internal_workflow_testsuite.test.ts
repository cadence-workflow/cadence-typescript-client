// Suite module for internal_workflow_testsuite_test.ts. Registration is kept out of the declaration module so that a sibling
// test module importing it for a helper does not also register this suite.
import { describe, it, beforeAll, beforeEach } from 'vitest';
import { GoTestifySuite } from './runtime/testify_suite.js';
import {
  TestUnitTestSuite,
  TestRegression_LocalActivityErrorEncoding,
  WorkflowTestSuiteUnitTest,
} from './internal_workflow_testsuite_test.js';

describe("internal_workflow_testsuite", () => {
  it("TestUnitTestSuite", TestUnitTestSuite);
  it("TestRegression_LocalActivityErrorEncoding", TestRegression_LocalActivityErrorEncoding);
  describe("WorkflowTestSuiteUnitTest", () => {
    let s: WorkflowTestSuiteUnitTest;
    beforeAll(async () => {
      s = new WorkflowTestSuiteUnitTest();
      await s.SetupSuite();
    });
    beforeEach(async () => { await s.SetupTest(); });
    it("Test_ActivityDeadlineExceeded", async (ctx) => { try { await s.Test_ActivityDeadlineExceeded(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_ActivityFriendlyName", async (ctx) => { try { await s.Test_ActivityFriendlyName(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_ActivityFullyQualifiedName", async (ctx) => { try { await s.Test_ActivityFullyQualifiedName(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_ActivityGoexit", async (ctx) => { try { await s.Test_ActivityGoexit(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_ActivityHeartbeatRetry", async (ctx) => { try { await s.Test_ActivityHeartbeatRetry(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_ActivityMockFunction", async (ctx) => { try { await s.Test_ActivityMockFunction(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_ActivityMockFunction_WithDataConverter", async (ctx) => { try { await s.Test_ActivityMockFunction_WithDataConverter(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_ActivityMockValues", async (ctx) => { try { await s.Test_ActivityMockValues(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_ActivityRegistration", async (ctx) => { try { await s.Test_ActivityRegistration(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_ActivityRetry", async (ctx) => { try { await s.Test_ActivityRetry(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_ActivityRetryOnCancel", async (ctx) => { try { await s.Test_ActivityRetryOnCancel(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_ActivityReturnsErrActivityResultPending", async (ctx) => { try { await s.Test_ActivityReturnsErrActivityResultPending(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_ActivityTimeoutWithDetails", async (ctx) => { try { await s.Test_ActivityTimeoutWithDetails(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_ActivityWithHeaderContext", async (ctx) => { try { await s.Test_ActivityWithHeaderContext(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_ActivityWithProgress", async (ctx) => { try { await s.Test_ActivityWithProgress(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_ActivityWithThriftTypes", async (ctx) => { try { await s.Test_ActivityWithThriftTypes(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_ActivityWithUserContext", async (ctx) => { try { await s.Test_ActivityWithUserContext(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_AwaitWithTimeout", async (ctx) => { try { await s.Test_AwaitWithTimeout(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_CancelChildWorkflow", async (ctx) => { try { await s.Test_CancelChildWorkflow(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_CancelExternalWorkflow", async (ctx) => { try { await s.Test_CancelExternalWorkflow(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_Channel", async (ctx) => { try { await s.Test_Channel(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_ChildWithChild", async (ctx) => { try { await s.Test_ChildWithChild(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_ChildWorkflowAlreadyRunning", async (ctx) => { try { await s.Test_ChildWorkflowAlreadyRunning(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_ChildWorkflowCancel", async (ctx) => { try { await s.Test_ChildWorkflowCancel(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_ChildWorkflowContextPropagation", async (ctx) => { try { await s.Test_ChildWorkflowContextPropagation(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_ChildWorkflowRetry", async (ctx) => { try { await s.Test_ChildWorkflowRetry(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_ChildWorkflow_Basic", async (ctx) => { try { await s.Test_ChildWorkflow_Basic(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_ChildWorkflow_Basic_WithDataConverter", async (ctx) => { try { await s.Test_ChildWorkflow_Basic_WithDataConverter(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_ChildWorkflow_Clock", async (ctx) => { try { await s.Test_ChildWorkflow_Clock(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_ChildWorkflow_Listener", async (ctx) => { try { await s.Test_ChildWorkflow_Listener(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_ChildWorkflow_Mock", async (ctx) => { try { await s.Test_ChildWorkflow_Mock(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_ChildWorkflow_Mock_Panic_GetChildWorkflowExecution", async (ctx) => { try { await s.Test_ChildWorkflow_Mock_Panic_GetChildWorkflowExecution(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_ChildWorkflow_StartFailed", async (ctx) => { try { await s.Test_ChildWorkflow_StartFailed(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_CompleteActivity", async (ctx) => { try { await s.Test_CompleteActivity(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_ContextMisuse", async (ctx) => { try { await s.Test_ContextMisuse(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_CronChildWorkflow", async (ctx) => { try { await s.Test_CronChildWorkflow(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_CronHasLastResult", async (ctx) => { try { await s.Test_CronHasLastResult(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_CronWorkflow", async (ctx) => { try { await s.Test_CronWorkflow(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_DisconnectedContext", async (ctx) => { try { await s.Test_DisconnectedContext(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_DrainSignalChannel", async (ctx) => { try { await s.Test_DrainSignalChannel(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_GetVersion", async (ctx) => { try { await s.Test_GetVersion(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_GetVersion_ExecuteWithMinVersion", async (ctx) => { try { await s.Test_GetVersion_ExecuteWithMinVersion(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_GetVersion_ExecuteWithVersion", async (ctx) => { try { await s.Test_GetVersion_ExecuteWithVersion(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_LocalActivity", async (ctx) => { try { await s.Test_LocalActivity(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_LocalActivityRetry", async (ctx) => { try { await s.Test_LocalActivityRetry(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_LocalActivityRetryOnCancel", async (ctx) => { try { await s.Test_LocalActivityRetryOnCancel(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_MockActivityWait", async (ctx) => { try { await s.Test_MockActivityWait(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_MockActivityWaitFn", async (ctx) => { try { await s.Test_MockActivityWaitFn(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_MockChildWorkflowAlreadyRunning", async (ctx) => { try { await s.Test_MockChildWorkflowAlreadyRunning(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_MockGetVersion", async (ctx) => { try { await s.Test_MockGetVersion(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_MockGetVersion_ExecuteWithMinVersion", async (ctx) => { try { await s.Test_MockGetVersion_ExecuteWithMinVersion(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_MockGetVersion_ExecuteWithVersion", async (ctx) => { try { await s.Test_MockGetVersion_ExecuteWithVersion(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_MockPanic", async (ctx) => { try { await s.Test_MockPanic(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_MockUpsertSearchAttributes", async (ctx) => { try { await s.Test_MockUpsertSearchAttributes(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_MockUpsertSearchAttributes_OnError", async (ctx) => { try { await s.Test_MockUpsertSearchAttributes_OnError(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_MockWorkflowWait", async (ctx) => { try { await s.Test_MockWorkflowWait(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_OnActivityStartedListener", async (ctx) => { try { await s.Test_OnActivityStartedListener(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_QueryWorkflow", async (ctx) => { try { await s.Test_QueryWorkflow(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_Regression_ExecuteChildWorkflowWithCanceledContext", async (ctx) => { try { await s.Test_Regression_ExecuteChildWorkflowWithCanceledContext(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_SameActivityIDFromDifferentChildWorkflow", async (ctx) => { try { await s.Test_SameActivityIDFromDifferentChildWorkflow(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_SetWorkerStopChannel", async (ctx) => { try { await s.Test_SetWorkerStopChannel(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_SideEffect", async (ctx) => { try { await s.Test_SideEffect(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_SignalChildWorkflow", async (ctx) => { try { await s.Test_SignalChildWorkflow(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_SignalChildWorkflowRetry", async (ctx) => { try { await s.Test_SignalChildWorkflowRetry(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_SignalExternalWorkflow", async (ctx) => { try { await s.Test_SignalExternalWorkflow(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_TestChildWorkflowTimeout", async (ctx) => { try { await s.Test_TestChildWorkflowTimeout(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_TestWorkflowTimeoutInBusyLoop", async (ctx) => { try { await s.Test_TestWorkflowTimeoutInBusyLoop(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_TimerWorkflow_ClockAutoFastForward", async (ctx) => { try { await s.Test_TimerWorkflow_ClockAutoFastForward(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_UpsertSearchAttributes_ReservedKey", async (ctx) => { try { await s.Test_UpsertSearchAttributes_ReservedKey(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_WorkflowActivityCancellation", async (ctx) => { try { await s.Test_WorkflowActivityCancellation(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_WorkflowAutoForwardClock", async (ctx) => { try { await s.Test_WorkflowAutoForwardClock(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_WorkflowCancellation", async (ctx) => { try { await s.Test_WorkflowCancellation(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_WorkflowFriendlyName", async (ctx) => { try { await s.Test_WorkflowFriendlyName(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_WorkflowHeaderContext", async (ctx) => { try { await s.Test_WorkflowHeaderContext(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_WorkflowIDReusePolicy", async (ctx) => { try { await s.Test_WorkflowIDReusePolicy(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_WorkflowLocalActivityWithMockAndListeners", async (ctx) => { try { await s.Test_WorkflowLocalActivityWithMockAndListeners(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_WorkflowMixedClock", async (ctx) => { try { await s.Test_WorkflowMixedClock(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_WorkflowRegistration", async (ctx) => { try { await s.Test_WorkflowRegistration(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_WorkflowUnknownName", async (ctx) => { try { await s.Test_WorkflowUnknownName(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("Test_WorkflowWithLocalActivity", async (ctx) => { try { await s.Test_WorkflowWithLocalActivity(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
  });
});
