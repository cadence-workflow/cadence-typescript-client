// Suite module for session_test.ts. Registration is kept out of the declaration module so that a sibling
// test module importing it for a helper does not also register this suite.
import { describe, it, beforeAll, beforeEach } from 'vitest';
import { GoTestifySuite } from './runtime/testify_suite.js';
import {
  TestSessionTestSuite,
  SessionTestSuite,
} from './session_test.js';

describe("session", () => {
  it("TestSessionTestSuite", TestSessionTestSuite);
  describe("SessionTestSuite", () => {
    let s: SessionTestSuite;
    beforeAll(async () => {
      s = new SessionTestSuite();
      await s.SetupSuite();
    });
    beforeEach(async () => { await s.SetupTest(); });
    it("TestActivityRetryWithinSession", async (ctx) => { try { await s.TestActivityRetryWithinSession(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestCreationWithOpenSessionContext", async (ctx) => { try { await s.TestCreationWithOpenSessionContext(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestGetSessionInfo", async (ctx) => { try { await s.TestGetSessionInfo(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestInvalidRecreateToken", async (ctx) => { try { await s.TestInvalidRecreateToken(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestSessionRecreateToken", async (ctx) => { try { await s.TestSessionRecreateToken(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestUserTimerWithinSession", async (ctx) => { try { await s.TestUserTimerWithinSession(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
  });
});
