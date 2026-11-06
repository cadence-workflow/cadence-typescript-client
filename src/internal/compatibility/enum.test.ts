// Suite module for enum_test.ts. Registration is kept out of the declaration module so that a sibling
// test module importing it for a helper does not also register this suite.
import { describe, it } from 'vitest';
import {
  TestArchivalStatus,
  TestCancelExternalWorkflowExecutionFailedCause,
  TestChildWorkflowExecutionFailedCause,
  TestContinueAsNewInitiator,
  TestDecisionTaskFailedCause,
  TestDomainStatus,
  TestEncodingType,
  TestEventFilterType,
  TestIndexedValueType,
  TestParentClosePolicy,
  TestPendingActivityState,
  TestPendingDecisionState,
  TestQueryConsistencyLevel,
  TestQueryRejectCondition,
  TestQueryResultType,
  TestQueryTaskCompletedType,
  TestSignalExternalWorkflowExecutionFailedCause,
  TestTaskListKind,
  TestTaskListType,
  TestTimeoutType,
  TestDecisionTaskTimedOutCause,
  TestWorkflowExecutionCloseStatus,
  TestWorkflowIDReusePolicy,
  TestCronOverlapPolicy,
  TestFailoverType,
} from './enum_test.js';

describe("enum", () => {
  it("TestArchivalStatus", TestArchivalStatus);
  it("TestCancelExternalWorkflowExecutionFailedCause", TestCancelExternalWorkflowExecutionFailedCause);
  it("TestChildWorkflowExecutionFailedCause", TestChildWorkflowExecutionFailedCause);
  it("TestContinueAsNewInitiator", TestContinueAsNewInitiator);
  it("TestDecisionTaskFailedCause", TestDecisionTaskFailedCause);
  it("TestDomainStatus", TestDomainStatus);
  it("TestEncodingType", TestEncodingType);
  it("TestEventFilterType", TestEventFilterType);
  it("TestIndexedValueType", TestIndexedValueType);
  it("TestParentClosePolicy", TestParentClosePolicy);
  it("TestPendingActivityState", TestPendingActivityState);
  it("TestPendingDecisionState", TestPendingDecisionState);
  it("TestQueryConsistencyLevel", TestQueryConsistencyLevel);
  it("TestQueryRejectCondition", TestQueryRejectCondition);
  it("TestQueryResultType", TestQueryResultType);
  it("TestQueryTaskCompletedType", TestQueryTaskCompletedType);
  it("TestSignalExternalWorkflowExecutionFailedCause", TestSignalExternalWorkflowExecutionFailedCause);
  it("TestTaskListKind", TestTaskListKind);
  it("TestTaskListType", TestTaskListType);
  it("TestTimeoutType", TestTimeoutType);
  it("TestDecisionTaskTimedOutCause", TestDecisionTaskTimedOutCause);
  it("TestWorkflowExecutionCloseStatus", TestWorkflowExecutionCloseStatus);
  it("TestWorkflowIDReusePolicy", TestWorkflowIDReusePolicy);
  it("TestCronOverlapPolicy", TestCronOverlapPolicy);
  it("TestFailoverType", TestFailoverType);
});
