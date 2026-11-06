// Suite module for jwt_authorization_test.ts. Registration is kept out of the declaration module so that a sibling
// test module importing it for a helper does not also register this suite.
import { describe, it } from 'vitest';
import {
  TestCorrectTokenCreation,
  TestIncorrectPrivateKeyForTokenCreation,
} from './jwt_authorization_test.js';

describe("jwt_authorization", () => {
  it("TestCorrectTokenCreation", TestCorrectTokenCreation);
  it("TestIncorrectPrivateKeyForTokenCreation", TestIncorrectPrivateKeyForTokenCreation);
});
