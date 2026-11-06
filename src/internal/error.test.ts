// Suite module for error_test.ts. Registration is kept out of the declaration module so that a sibling
// test module importing it for a helper does not also register this suite.
import { describe, it } from 'vitest';
import {
  Test_GenericError,
  Test_ActivityNotRegistered,
  Test_TimeoutError,
  Test_TimeoutError_WithDetails,
  Test_CustomError,
  Test_CustomError_Pointer,
  Test_CustomError_WrongDecodedType,
  Test_CanceledError,
  Test_IsCanceledError,
  TestErrorDetailsValues,
  TestErrorDetailsValues_WrongDecodedType,
  TestErrorDetailsValues_AssignableType,
  Test_SignalExternalWorkflowExecutionFailedError,
  Test_ContinueAsNewError,
} from './error_test.js';

describe("error", () => {
  it("Test_GenericError", Test_GenericError);
  it("Test_ActivityNotRegistered", Test_ActivityNotRegistered);
  it("Test_TimeoutError", Test_TimeoutError);
  it("Test_TimeoutError_WithDetails", Test_TimeoutError_WithDetails);
  it("Test_CustomError", Test_CustomError);
  it("Test_CustomError_Pointer", Test_CustomError_Pointer);
  it("Test_CustomError_WrongDecodedType", Test_CustomError_WrongDecodedType);
  it("Test_CanceledError", Test_CanceledError);
  it("Test_IsCanceledError", Test_IsCanceledError);
  it("TestErrorDetailsValues", TestErrorDetailsValues);
  it("TestErrorDetailsValues_WrongDecodedType", TestErrorDetailsValues_WrongDecodedType);
  it("TestErrorDetailsValues_AssignableType", TestErrorDetailsValues_AssignableType);
  it("Test_SignalExternalWorkflowExecutionFailedError", Test_SignalExternalWorkflowExecutionFailedError);
  it("Test_ContinueAsNewError", Test_ContinueAsNewError);
});
