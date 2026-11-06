// Suite module for internal_task_handlers_interfaces_test.ts. Registration is kept out of the declaration module so that a sibling
// test module importing it for a helper does not also register this suite.
import { describe, it, beforeAll, beforeEach, afterEach } from 'vitest';
import { GoTestifySuite } from './runtime/testify_suite.js';
import {
  TestPollLayerInterfacesTestSuite,
  PollLayerInterfacesTestSuite,
} from './internal_task_handlers_interfaces_test.js';

describe("internal_task_handlers_interfaces", () => {
  it("TestPollLayerInterfacesTestSuite", TestPollLayerInterfacesTestSuite);
  describe("PollLayerInterfacesTestSuite", () => {
    let s: PollLayerInterfacesTestSuite;
    beforeAll(async () => {
      s = new PollLayerInterfacesTestSuite();
    });
    beforeEach(async () => { await s.SetupTest(); });
    afterEach(async () => { await s.TearDownTest(); });
    it("TestGetNextDecisions", async (ctx) => { try { await s.TestGetNextDecisions(); await GoTestifySuite.__drainSubtests(); } catch (e) { if ((e as Error)?.name !== "GoTestSkipped") throw e; ctx.skip(); } });
  });
});
