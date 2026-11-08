// Suite module for activity_test.ts. Registration is kept out of the declaration module so that a sibling
// test module importing it for a helper does not also register this suite.
import { describe, it, beforeAll, beforeEach, afterEach } from 'vitest';
import { GoTestifySuite } from './runtime/testify_suite.js';
import {
  activityTestSuite,
} from './activity_test.js';

describe("activity", () => {
  describe("activityTestSuite", () => {
    let s: activityTestSuite;
    beforeAll(async () => {
      s = new activityTestSuite();
    });
    beforeEach(async () => { await s.SetupTest(); });
    afterEach(async () => { await s.TearDownTest(); });
    it("TestGetWorkerStopChannel", async (ctx) => { try { await s.TestGetWorkerStopChannel(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestHasActivityInfo", async (ctx) => { try { await s.TestHasActivityInfo(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
  });
});
