// Suite module for rsa_test.ts. Registration is kept out of the declaration module so that a sibling
// test module importing it for a helper does not also register this suite.
import { describe, it } from 'vitest';
import {
  TestLoadRSAPublicKey,
  TestLoadRSAPrivateKey,
} from './rsa_test.js';

describe("rsa", () => {
  it("TestLoadRSAPublicKey", TestLoadRSAPublicKey);
  it("TestLoadRSAPrivateKey", TestLoadRSAPrivateKey);
});
