// Suite module for internal_task_pollers_test.ts. Registration is kept out of the declaration module so that a sibling
// test module importing it for a helper does not also register this suite.
import { describe, it } from 'vitest';
import {
  Test_newWorkflowTaskPoller,
  TestLocalActivityPanic,
} from './internal_task_pollers_test.js';

describe("internal_task_pollers", () => {
  it("Test_newWorkflowTaskPoller", Test_newWorkflowTaskPoller);
  it("TestLocalActivityPanic", TestLocalActivityPanic);
});
