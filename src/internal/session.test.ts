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
    it("TestCompletionFailed", async (ctx) => { try { await s.TestCompletionFailed(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestCompletionWithClosedSessionContext", async (ctx) => { try { await s.TestCompletionWithClosedSessionContext(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestCompletionWithFailedSessionContext", async (ctx) => { try { await s.TestCompletionWithFailedSessionContext(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestCreationCompletion", async (ctx) => { try { await s.TestCreationCompletion(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestCreationWithClosedSessionContext", async (ctx) => { try { await s.TestCreationWithClosedSessionContext(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestCreationWithFailedSessionContext", async (ctx) => { try { await s.TestCreationWithFailedSessionContext(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestCreationWithOpenSessionContext", async (ctx) => { try { await s.TestCreationWithOpenSessionContext(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestExecuteActivityInClosedSession", async (ctx) => { try { await s.TestExecuteActivityInClosedSession(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestExecuteActivityInFailedSession", async (ctx) => { try { await s.TestExecuteActivityInFailedSession(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestGetSessionInfo", async (ctx) => { try { await s.TestGetSessionInfo(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestInvalidRecreateToken", async (ctx) => { try { await s.TestInvalidRecreateToken(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestMaxConcurrentSession_CreationOnly", async (ctx) => { try { await s.TestMaxConcurrentSession_CreationOnly(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestMaxConcurrentSession_WithRecreation", async (ctx) => { try { await s.TestMaxConcurrentSession_WithRecreation(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestRecreation", async (ctx) => { try { await s.TestRecreation(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestSessionRecreateToken", async (ctx) => { try { await s.TestSessionRecreateToken(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestSessionRecreationTaskList", async (ctx) => { try { await s.TestSessionRecreationTaskList(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestSessionTaskList", async (ctx) => { try { await s.TestSessionTaskList(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestUserTimerWithinSession", async (ctx) => { try { await s.TestUserTimerWithinSession(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
  });
});
