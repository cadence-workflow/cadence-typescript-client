// Suite module for internal_utils_test.ts. Registration is kept out of the declaration module so that a sibling
// test module importing it for a helper does not also register this suite.
import { describe, it } from 'vitest';
import {
  TestChannelBuilderOptions,
  TestNewValues,
  TestNewValue,
  TestGetErrorDetails_CustomError,
  TestGetErrorDetails_CancelError,
  TestGetErrorDetails_TimeoutError,
  Test_getErrorDetails_nil,
  TestConstructError_TimeoutError,
  TestFeatureFlagsHeader,
  TestFromInternalFeatureFlags,
} from './internal_utils_test.js';

describe("internal_utils", () => {
  it("TestChannelBuilderOptions", TestChannelBuilderOptions);
  it("TestNewValues", TestNewValues);
  it("TestNewValue", TestNewValue);
  it("TestGetErrorDetails_CustomError", TestGetErrorDetails_CustomError);
  it("TestGetErrorDetails_CancelError", TestGetErrorDetails_CancelError);
  it("TestGetErrorDetails_TimeoutError", TestGetErrorDetails_TimeoutError);
  it.skip("Test_getErrorDetails_nil", Test_getErrorDetails_nil);
  it("TestConstructError_TimeoutError", TestConstructError_TimeoutError);
  it("TestFeatureFlagsHeader", TestFeatureFlagsHeader);
  it("TestFromInternalFeatureFlags", TestFromInternalFeatureFlags);
});
