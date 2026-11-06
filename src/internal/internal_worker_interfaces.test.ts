// Suite module for internal_worker_interfaces_test.ts. Registration is kept out of the declaration module so that a sibling
// test module importing it for a helper does not also register this suite.
import { describe, it } from 'vitest';
import {
  TestInterfacesTestSuite,
} from './internal_worker_interfaces_test.js';

describe("internal_worker_interfaces", () => {
  it("TestInterfacesTestSuite", TestInterfacesTestSuite);
});
