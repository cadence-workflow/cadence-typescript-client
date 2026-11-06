// Suite module for resettable_timer_test.ts. Registration is kept out of the declaration module so that a sibling
// test module importing it for a helper does not also register this suite.
import { describe, it, beforeAll, beforeEach } from 'vitest';
import { GoTestifySuite } from '../../internal/runtime/testify_suite.js';
import {
  TestResettableTimerSuite,
  ResettableTimerTestSuite,
} from './resettable_timer_test.js';

describe("resettable_timer", () => {
  it("TestResettableTimerSuite", TestResettableTimerSuite);
  describe("ResettableTimerTestSuite", () => {
    let s: ResettableTimerTestSuite;
    beforeAll(async () => {
      s = new ResettableTimerTestSuite();
    });
    beforeEach(async () => { await s.SetupTest(); });
    it("TestTimerDoesNotFireWhenKeptReset", async (ctx) => { try { await s.TestTimerDoesNotFireWhenKeptReset(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestTimerFiresAfterExpiration", async (ctx) => { try { await s.TestTimerFiresAfterExpiration(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestTimerFiresAfterResetsStop", async (ctx) => { try { await s.TestTimerFiresAfterResetsStop(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestTimerResetAfterFireIsNoop", async (ctx) => { try { await s.TestTimerResetAfterFireIsNoop(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
    it("TestTimerResetWithDifferentDurations", async (ctx) => { try { await s.TestTimerResetWithDifferentDurations(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
  });
});
