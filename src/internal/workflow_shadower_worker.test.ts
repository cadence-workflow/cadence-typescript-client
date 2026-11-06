// Suite module for workflow_shadower_worker_test.ts. Registration is kept out of the declaration module so that a sibling
// test module importing it for a helper does not also register this suite.
import { describe, it, beforeAll, beforeEach, afterEach } from 'vitest';
import { GoTestifySuite } from './runtime/testify_suite.js';
import {
  shadowWorkerSuite,
} from './workflow_shadower_worker_test.js';

describe("workflow_shadower_worker", () => {
  describe("shadowWorkerSuite", () => {
    let s: shadowWorkerSuite;
    beforeAll(async () => {
      s = new shadowWorkerSuite();
    });
    beforeEach(async () => { await s.SetupTest(); });
    afterEach(async () => { await s.TearDownTest(); });
    it("TestNewShadowWorker", async (ctx) => { try { await s.TestNewShadowWorker(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestStartShadowWorker_Failed_InvalidShadowOption", async (ctx) => { try { await s.TestStartShadowWorker_Failed_InvalidShadowOption(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
  });
});
