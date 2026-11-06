// Suite module for blocks_test.ts. Registration is kept out of the declaration module so that a sibling
// test module importing it for a helper does not also register this suite.
import { describe, it } from 'vitest';
import {
  TestExample,
} from './blocks_test.js';

describe("blocks", () => {
  it("TestExample", TestExample);
});
