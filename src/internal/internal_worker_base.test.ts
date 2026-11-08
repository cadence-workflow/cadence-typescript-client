// Suite module for internal_worker_base_test.ts. Registration is kept out of the declaration module so that a sibling
// test module importing it for a helper does not also register this suite.
import { describe, it } from 'vitest';
import {
  TestBaseWorker_pollTask_no_warnLogOnShutdown,
  TestBaseWorker_processTask_warnLogOnOtherError,
  TestBaseWorker_pollTask_logsNonRetriableError,
} from './internal_worker_base_test.js';

describe("internal_worker_base", () => {
  it("TestBaseWorker_pollTask_no_warnLogOnShutdown", TestBaseWorker_pollTask_no_warnLogOnShutdown);
  it("TestBaseWorker_processTask_warnLogOnOtherError", TestBaseWorker_processTask_warnLogOnOtherError);
  it("TestBaseWorker_pollTask_logsNonRetriableError", TestBaseWorker_pollTask_logsNonRetriableError);
});
