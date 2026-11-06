// Suite module for workflow_shadower_test.ts. Registration is kept out of the declaration module so that a sibling
// test module importing it for a helper does not also register this suite.
import { describe, it, beforeAll, beforeEach, afterEach } from 'vitest';
import { GoTestifySuite } from './runtime/testify_suite.js';
import {
  workflowShadowerSuite,
} from './workflow_shadower_test.js';

describe("workflow_shadower", () => {
  describe("workflowShadowerSuite", () => {
    let s: workflowShadowerSuite;
    beforeAll(async () => {
      s = new workflowShadowerSuite();
    });
    beforeEach(async () => { await s.SetupTest(); });
    afterEach(async () => { await s.TearDownTest(); });
    it("TestShadowOptionsValidation", async (ctx) => { try { await s.TestShadowOptionsValidation(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestTimeFilterIsEmpty", async (ctx) => { try { await s.TestTimeFilterIsEmpty(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestTimeFilterValidation", async (ctx) => { try { await s.TestTimeFilterValidation(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestWorkflowRegistration", async (ctx) => { try { await s.TestWorkflowRegistration(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
  });
});
