// Suite module for auto_heartbeater_test.ts. Registration is kept out of the declaration module so that a sibling
// test module importing it for a helper does not also register this suite.
import { describe, it } from 'vitest';
import {
  TestAutoHearbeater_Run,
} from './auto_heartbeater_test.js';

describe("auto_heartbeater", () => {
  it("TestAutoHearbeater_Run", TestAutoHearbeater_Run);
});
