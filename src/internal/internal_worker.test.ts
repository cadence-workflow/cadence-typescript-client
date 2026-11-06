// Suite module for internal_worker_test.ts. Registration is kept out of the declaration module so that a sibling
// test module importing it for a helper does not also register this suite.
import { describe, it, beforeAll, beforeEach, afterEach } from 'vitest';
import { GoTestifySuite } from './runtime/testify_suite.js';
import {
  TestInternalWorkerTestSuite,
  TestVariousActivitySchedulingOption,
  TestRegisterVariousWorkflowTypes,
  TestRegisterActivityWithOptions,
  TestActivityErrorWithDetailsWithDataConverter,
  TestActivityCancelledErrorWithDataConverter,
  TestActivityExecutionVariousTypesWithDataConverter,
  TestActivityNilArgs,
  TestWorkerOptionDefaults,
  TestWorkerOptionNonDefaults,
  TestIsNonRetriableError,
  Test_augmentWorkerOptions,
  TestValidateFnFormat_Activity,
  TestTestValidateFnFormat_Workflow,
  TestGetTaskAutoConfigHint,
  TestAugmentWorkerOptions_MetricEmitMode,
  internalWorkerTestSuite,
} from './internal_worker_test.js';

describe("internal_worker", () => {
  it("TestInternalWorkerTestSuite", TestInternalWorkerTestSuite);
  it("TestVariousActivitySchedulingOption", TestVariousActivitySchedulingOption);
  it("TestRegisterVariousWorkflowTypes", TestRegisterVariousWorkflowTypes);
  it("TestRegisterActivityWithOptions", TestRegisterActivityWithOptions);
  it.skip("TestActivityErrorWithDetailsWithDataConverter", TestActivityErrorWithDetailsWithDataConverter);
  it.skip("TestActivityCancelledErrorWithDataConverter", TestActivityCancelledErrorWithDataConverter);
  it("TestActivityExecutionVariousTypesWithDataConverter", TestActivityExecutionVariousTypesWithDataConverter);
  it("TestActivityNilArgs", TestActivityNilArgs);
  it("TestWorkerOptionDefaults", TestWorkerOptionDefaults);
  it("TestWorkerOptionNonDefaults", TestWorkerOptionNonDefaults);
  it("TestIsNonRetriableError", TestIsNonRetriableError);
  it("Test_augmentWorkerOptions", Test_augmentWorkerOptions);
  it.skip("TestValidateFnFormat_Activity", TestValidateFnFormat_Activity);
  it.skip("TestTestValidateFnFormat_Workflow", TestTestValidateFnFormat_Workflow);
  it("TestGetTaskAutoConfigHint", TestGetTaskAutoConfigHint);
  it("TestAugmentWorkerOptions_MetricEmitMode", TestAugmentWorkerOptions_MetricEmitMode);
  describe("internalWorkerTestSuite", () => {
    let s: internalWorkerTestSuite;
    beforeAll(async () => {
      s = new internalWorkerTestSuite();
    });
    beforeEach(async () => { await s.SetupTest(); });
    afterEach(async () => { await s.TearDownTest(); });
    it("TestDecisionTaskHandler", async (ctx) => { try { await s.TestDecisionTaskHandler(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestDecisionTaskHandler_WithDataConverter", async (ctx) => { try { await s.TestDecisionTaskHandler_WithDataConverter(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
  });
});
