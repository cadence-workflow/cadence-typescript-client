// Suite module for lru_test.ts. Registration is kept out of the declaration module so that a sibling
// test module importing it for a helper does not also register this suite.
import { describe, it } from 'vitest';
import {
  TestLRU,
  TestExist,
  TestPutIfNotExistSuccess,
  TestNoPutInPin,
  TestPinningTTL,
  TestLRUWithTTL,
  TestLRUCacheConcurrentAccess,
} from './lru_test.js';
describe("lru", () => {
  it("TestLRU", TestLRU);
  it("TestExist", TestExist);
  it("TestPutIfNotExistSuccess", TestPutIfNotExistSuccess);
  it("TestNoPutInPin", TestNoPutInPin);
  it("TestPinningTTL", TestPinningTTL);
  it("TestLRUWithTTL", TestLRUWithTTL);
  it("TestLRUCacheConcurrentAccess", TestLRUCacheConcurrentAccess);
});
