// Suite module for query_builder_test.ts. Registration is kept out of the declaration module so that a sibling
// test module importing it for a helper does not also register this suite.
import { describe, it, beforeAll, beforeEach } from 'vitest';
import { GoTestifySuite } from './runtime/testify_suite.js';
import {
  queryBuilderSuite,
} from './query_builder_test.js';

describe("query_builder", () => {
  describe("queryBuilderSuite", () => {
    let s: queryBuilderSuite;
    beforeAll(async () => {
      s = new queryBuilderSuite();
    });
    beforeEach(async () => { await s.SetupTest(); });
    it("TestExcludeWorkflowTypesQuery", async (ctx) => { try { await s.TestExcludeWorkflowTypesQuery(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestMultipleFilters", async (ctx) => { try { await s.TestMultipleFilters(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestStartTimeQuery", async (ctx) => { try { await s.TestStartTimeQuery(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestToWorkflowStatus", async (ctx) => { try { await s.TestToWorkflowStatus(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestWorkflowStatusQuery", async (ctx) => { try { await s.TestWorkflowStatusQuery(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestWorkflowTypeQuery", async (ctx) => { try { await s.TestWorkflowTypeQuery(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
  });
});
