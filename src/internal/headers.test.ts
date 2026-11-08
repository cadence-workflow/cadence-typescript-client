// Suite module for headers_test.ts. Registration is kept out of the declaration module so that a sibling
// test module importing it for a helper does not also register this suite.
import { describe, it } from 'vitest';
import {
  TestHeaderWriter,
  TestHeaderReader,
} from './headers_test.js';

describe("headers", () => {
  it("TestHeaderWriter", TestHeaderWriter);
  it("TestHeaderReader", TestHeaderReader);
});
