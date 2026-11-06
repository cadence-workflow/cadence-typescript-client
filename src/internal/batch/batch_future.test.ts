// Suite module for batch_future_test.ts. Registration is kept out of the declaration module so that a sibling
// test module importing it for a helper does not also register this suite.
import { describe, it } from 'vitest';
import {
  Test_BatchWorkflow,
  Test_BatchWorkflow_Cancel,
  Test_BatchWorkflowUsingFutures,
  Test_BatchFuture_Get,
} from './batch_future_test.js';

describe("batch_future", () => {
  it("Test_BatchWorkflow", Test_BatchWorkflow);
  it.skip("Test_BatchWorkflow_Cancel", Test_BatchWorkflow_Cancel);
  it("Test_BatchWorkflowUsingFutures", Test_BatchWorkflowUsingFutures);
  it("Test_BatchFuture_Get", Test_BatchFuture_Get);
});
