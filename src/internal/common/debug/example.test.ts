// Suite module for example_test.ts. Registration is kept out of the declaration module so that a sibling
// test module importing it for a helper does not also register this suite.
import { describe, it } from 'vitest';
import {
  Example,
} from './example_test.js';

describe("example", () => {
  it("Example", Example);
});
