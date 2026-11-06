// Suite module for worker_test.ts. Registration is kept out of the declaration module so that a sibling
// test module importing it for a helper does not also register this suite.
import { describe, it } from 'vitest';
import {
  TestMain,
  Test_NewWorker,
} from './worker_test.js';

describe("worker", () => {
  it("TestMain", TestMain);
  it("Test_NewWorker", Test_NewWorker);
});
