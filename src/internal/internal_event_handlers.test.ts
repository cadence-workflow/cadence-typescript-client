// Suite module for internal_event_handlers_test.ts. Registration is kept out of the declaration module so that a sibling
// test module importing it for a helper does not also register this suite.
import { describe, it } from 'vitest';
import {
  TestReplayAwareLogger,
  TestDecodedValue,
  TestDecodedValue_WithDataConverter,
  Test_DecodedValuePtr,
  Test_DecodedValueNil,
  Test_ValidateAndSerializeSearchAttributes,
  Test_UpsertSearchAttributes,
  Test_MergeSearchAttributes,
  Test_GetChangeVersion,
  Test_GetChangeVersions,
  Test_CreateSearchAttributesForChangeVersion,
  TestHistoryEstimationforSmallEvents,
  TestHistoryEstimationforPackedEvents,
  TestProcessQuery_KnownQueryTypes,
  TestWorkflowExecutionEventHandler_ProcessEvent_WorkflowExecutionStarted,
  TestWorkflowExecutionEventHandler_ProcessEvent_Noops,
  TestWorkflowExecutionEventHandler_ProcessEvent_nil,
  TestWorkflowExecutionEventHandler_ProcessEvent_no_error_events,
  TestSideEffect,
  TestGetVersion_validation,
  TestGetVersion,
  TestMutableSideEffect,
  TestEventHandler_handleMarkerRecorded,
  TestEventHandler_handleMarkerRecorded_failures,
  TestWorkflowEnvironment_sessions,
  TestWorkflowExecutionEnvironment_NewTimer_immediate_calls,
} from './internal_event_handlers_test.js';

describe("internal_event_handlers", () => {
  it("TestReplayAwareLogger", TestReplayAwareLogger);
  it("TestDecodedValue", TestDecodedValue);
  it("TestDecodedValue_WithDataConverter", TestDecodedValue_WithDataConverter);
  it("Test_DecodedValuePtr", Test_DecodedValuePtr);
  it("Test_DecodedValueNil", Test_DecodedValueNil);
  it("Test_ValidateAndSerializeSearchAttributes", Test_ValidateAndSerializeSearchAttributes);
  it("Test_UpsertSearchAttributes", Test_UpsertSearchAttributes);
  it("Test_MergeSearchAttributes", Test_MergeSearchAttributes);
  it("Test_GetChangeVersion", Test_GetChangeVersion);
  it("Test_GetChangeVersions", Test_GetChangeVersions);
  it("Test_CreateSearchAttributesForChangeVersion", Test_CreateSearchAttributesForChangeVersion);
  it("TestHistoryEstimationforSmallEvents", TestHistoryEstimationforSmallEvents);
  it("TestHistoryEstimationforPackedEvents", TestHistoryEstimationforPackedEvents);
  it("TestProcessQuery_KnownQueryTypes", TestProcessQuery_KnownQueryTypes);
  it("TestWorkflowExecutionEventHandler_ProcessEvent_WorkflowExecutionStarted", TestWorkflowExecutionEventHandler_ProcessEvent_WorkflowExecutionStarted);
  it("TestWorkflowExecutionEventHandler_ProcessEvent_Noops", TestWorkflowExecutionEventHandler_ProcessEvent_Noops);
  it("TestWorkflowExecutionEventHandler_ProcessEvent_nil", TestWorkflowExecutionEventHandler_ProcessEvent_nil);
  it("TestWorkflowExecutionEventHandler_ProcessEvent_no_error_events", TestWorkflowExecutionEventHandler_ProcessEvent_no_error_events);
  it("TestSideEffect", TestSideEffect);
  it("TestGetVersion_validation", TestGetVersion_validation);
  it("TestGetVersion", TestGetVersion);
  it("TestMutableSideEffect", TestMutableSideEffect);
  it("TestEventHandler_handleMarkerRecorded", TestEventHandler_handleMarkerRecorded);
  it("TestEventHandler_handleMarkerRecorded_failures", TestEventHandler_handleMarkerRecorded_failures);
  it("TestWorkflowEnvironment_sessions", TestWorkflowEnvironment_sessions);
  it("TestWorkflowExecutionEnvironment_NewTimer_immediate_calls", TestWorkflowExecutionEnvironment_NewTimer_immediate_calls);
});
