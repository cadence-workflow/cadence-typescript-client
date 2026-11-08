// Suite module for internal_decision_state_machine_test.ts. Registration is kept out of the declaration module so that a sibling
// test module importing it for a helper does not also register this suite.
import { describe, it } from 'vitest';
import {
  Test_TimerStateMachine_CancelBeforeSent,
  Test_TimerStateMachine_CancelAfterInitiated,
  Test_TimerStateMachine_CompletedAfterCancel,
  Test_TimerStateMachine_CompleteWithoutCancel,
  Test_TimerStateMachine_PanicInvalidStateTransition,
  Test_TimerCancelEventOrdering,
  Test_ActivityStateMachine_CompleteWithoutCancel,
  Test_ActivityStateMachine_CancelBeforeSent,
  Test_ActivityStateMachine_CancelAfterSent,
  Test_ActivityStateMachine_CompletedAfterCancel,
  Test_ActivityStateMachine_PanicInvalidStateTransition,
  Test_ChildWorkflowStateMachine_Basic,
  Test_ChildWorkflowStateMachine_CancelSucceed,
  Test_ChildWorkflowStateMachine_InvalidStates,
  Test_ChildWorkflowStateMachine_CancelFailed,
  Test_MarkerStateMachine,
  Test_UpsertSearchAttributesDecisionStateMachine,
  Test_CancelExternalWorkflowStateMachine_Succeed,
  Test_CancelExternalWorkflowStateMachine_Failed,
} from './internal_decision_state_machine_test.js';

describe("internal_decision_state_machine", () => {
  it("Test_TimerStateMachine_CancelBeforeSent", Test_TimerStateMachine_CancelBeforeSent);
  it("Test_TimerStateMachine_CancelAfterInitiated", Test_TimerStateMachine_CancelAfterInitiated);
  it("Test_TimerStateMachine_CompletedAfterCancel", Test_TimerStateMachine_CompletedAfterCancel);
  it("Test_TimerStateMachine_CompleteWithoutCancel", Test_TimerStateMachine_CompleteWithoutCancel);
  it("Test_TimerStateMachine_PanicInvalidStateTransition", Test_TimerStateMachine_PanicInvalidStateTransition);
  it("Test_TimerCancelEventOrdering", Test_TimerCancelEventOrdering);
  it("Test_ActivityStateMachine_CompleteWithoutCancel", Test_ActivityStateMachine_CompleteWithoutCancel);
  it("Test_ActivityStateMachine_CancelBeforeSent", Test_ActivityStateMachine_CancelBeforeSent);
  it("Test_ActivityStateMachine_CancelAfterSent", Test_ActivityStateMachine_CancelAfterSent);
  it("Test_ActivityStateMachine_CompletedAfterCancel", Test_ActivityStateMachine_CompletedAfterCancel);
  it("Test_ActivityStateMachine_PanicInvalidStateTransition", Test_ActivityStateMachine_PanicInvalidStateTransition);
  it("Test_ChildWorkflowStateMachine_Basic", Test_ChildWorkflowStateMachine_Basic);
  it("Test_ChildWorkflowStateMachine_CancelSucceed", Test_ChildWorkflowStateMachine_CancelSucceed);
  it("Test_ChildWorkflowStateMachine_InvalidStates", Test_ChildWorkflowStateMachine_InvalidStates);
  it("Test_ChildWorkflowStateMachine_CancelFailed", Test_ChildWorkflowStateMachine_CancelFailed);
  it("Test_MarkerStateMachine", Test_MarkerStateMachine);
  it("Test_UpsertSearchAttributesDecisionStateMachine", Test_UpsertSearchAttributesDecisionStateMachine);
  it("Test_CancelExternalWorkflowStateMachine_Succeed", Test_CancelExternalWorkflowStateMachine_Succeed);
  it("Test_CancelExternalWorkflowStateMachine_Failed", Test_CancelExternalWorkflowStateMachine_Failed);
});
