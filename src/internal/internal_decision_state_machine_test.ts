// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { workflowPanicError, newWorkflowPanicError } from './error.js';
import { expect } from 'vitest';
import { StringPtr, BoolPtr } from './common/convert.js';
import { newDecisionsHelper, decisionStateCanceledAfterInitiated, decisionStateCanceledBeforeInitiated, decisionStateCompleted, decisionStateCreated, decisionStateCompletedAfterCancellationDecisionSent, makeDecisionID, decisionStateInitiated, decisionTypeCancellation, decisionStateCanceledAfterStarted, decisionStateCancellationDecisionSent, decisionStateDecisionSent, decisionStateStarted } from './internal_decision_state_machine.js';
import { DecisionType } from '../generated/thrift/cadence-idl/com/uber/cadence/DecisionType.js';
import { ScheduleActivityTaskDecisionAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/ScheduleActivityTaskDecisionAttributes.js';
import { RequestCancelExternalWorkflowExecutionDecisionAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/RequestCancelExternalWorkflowExecutionDecisionAttributes.js';
import { StartChildWorkflowExecutionDecisionAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/StartChildWorkflowExecutionDecisionAttributes.js';
import { StartTimerDecisionAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/StartTimerDecisionAttributes.js';
import { SearchAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/SearchAttributes.js';
import { getStackTraceRaw } from './internal_workflow.js';

export async function Test_TimerStateMachine_CancelBeforeSent(): Promise<void> {
    const timerID = "test-timer-1";
    const attributes = new StartTimerDecisionAttributes({
        timerId: StringPtr(timerID),
    });
    const h = await newDecisionsHelper();
    const d = h.startTimer(attributes);
    expect(d.getState()).toEqual(decisionStateCreated);
    h.cancelTimer(timerID);
    expect(d.getState()).toEqual(decisionStateCompleted);
    const decisions = h.getDecisions(true);
    expect(decisions.length).toEqual(0);
}

export async function Test_TimerStateMachine_CancelAfterInitiated(): Promise<void> {
    const timerID = "test-timer-1";
    const attributes = new StartTimerDecisionAttributes({
        timerId: StringPtr(timerID)
    });
    const h = await newDecisionsHelper();
    const d = h.startTimer(attributes);
    expect(d.getState()).toEqual(decisionStateCreated);
    let decisions = h.getDecisions(true);
    expect(d.getState()).toEqual(decisionStateDecisionSent);
    expect(decisions.length).toEqual(1);
    expect(decisions[0].decisionType).toEqual(DecisionType.StartTimer);
    expect(decisions[0].startTimerDecisionAttributes).toEqual(attributes);
    h.handleTimerStarted(timerID);
    expect(d.getState()).toEqual(decisionStateInitiated);
    h.cancelTimer(timerID);
    expect(d.getState()).toEqual(decisionStateCanceledAfterInitiated);
    decisions = h.getDecisions(true);
    expect(decisions.length).toEqual(1);
    expect(decisions[0].decisionType).toEqual(DecisionType.CancelTimer);
    expect(d.getState()).toEqual(decisionStateCancellationDecisionSent);
    h.handleTimerCanceled(timerID);
    expect(d.getState()).toEqual(decisionStateCompleted);
}

export async function Test_TimerStateMachine_CompletedAfterCancel(): Promise<void> {
    const timerID = "test-timer-1";
    const attributes = new StartTimerDecisionAttributes({
        timerId: StringPtr(timerID),
    });
    const h = await newDecisionsHelper();
    const d = h.startTimer(attributes);
    expect(d.getState()).toEqual(decisionStateCreated);
    let decisions = h.getDecisions(true);
    expect(d.getState()).toEqual(decisionStateDecisionSent);
    expect(decisions.length).toEqual(1);
    expect(decisions[0].decisionType).toEqual(DecisionType.StartTimer);
    h.cancelTimer(timerID);
    expect(d.getState()).toEqual(decisionStateCanceledBeforeInitiated);
    expect(h.getDecisions(true).length).toEqual(0);
    h.handleTimerStarted(timerID);
    expect(d.getState()).toEqual(decisionStateCanceledAfterInitiated);
    decisions = h.getDecisions(true);
    expect(decisions.length).toEqual(1);
    expect(decisions[0].decisionType).toEqual(DecisionType.CancelTimer);
    expect(d.getState()).toEqual(decisionStateCancellationDecisionSent);
    h.handleTimerClosed(timerID);
    expect(d.getState()).toEqual(decisionStateCompletedAfterCancellationDecisionSent);
}

export async function Test_TimerStateMachine_CompleteWithoutCancel(): Promise<void> {
    const timerID = "test-timer-1";
    const attributes = new StartTimerDecisionAttributes({
        timerId: StringPtr(timerID)
    });
    const h = await newDecisionsHelper();
    const d = h.startTimer(attributes);
    expect(d.getState()).toEqual(decisionStateCreated);
    const decisions = h.getDecisions(true);
    expect(d.getState()).toEqual(decisionStateDecisionSent);
    expect(decisions.length).toEqual(1);
    expect(decisions[0].decisionType).toEqual(DecisionType.StartTimer);
    h.handleTimerStarted(timerID);
    expect(d.getState()).toEqual(decisionStateInitiated);
    expect(h.getDecisions(false).length).toEqual(0);
    h.handleTimerClosed(timerID);
    expect(d.getState()).toEqual(decisionStateCompleted);
}

export async function Test_TimerStateMachine_PanicInvalidStateTransition(): Promise<void> {
    const timerID = "test-timer-1";
    const attributes = new StartTimerDecisionAttributes({
        timerId: StringPtr(timerID),
    });
    const h = await newDecisionsHelper();
    h.startTimer(attributes);
    h.getDecisions(true);
    h.handleTimerStarted(timerID);
    h.handleTimerClosed(timerID);

    const panicErr = runAndCatchPanic(() => {
        h.handleCancelTimerFailed(timerID);
    });

    expect(panicErr).not.toBeNull();
}

export async function Test_TimerCancelEventOrdering(): Promise<void> {
    const timerID = "test-timer-1";
    const localActivityID = "test-activity-1";
    const attributes = new StartTimerDecisionAttributes({
        timerId: StringPtr(timerID),
    });
    const h = await newDecisionsHelper();
    const d = h.startTimer(attributes);
    expect(d.getState()).toEqual(decisionStateCreated);
    let decisions = h.getDecisions(true);
    expect(d.getState()).toEqual(decisionStateDecisionSent);
    expect(decisions.length).toEqual(1);
    expect(decisions[0].decisionType).toEqual(DecisionType.StartTimer);
    expect(decisions[0].startTimerDecisionAttributes).toEqual(attributes);
    h.handleTimerStarted(timerID);
    expect(d.getState()).toEqual(decisionStateInitiated);
    const m = h.recordLocalActivityMarker(localActivityID, Buffer.from([]));
    expect(m.getState()).toEqual(decisionStateCreated);
    h.cancelTimer(timerID);
    expect(d.getState()).toEqual(decisionStateCanceledAfterInitiated);
    decisions = h.getDecisions(true);
    expect(decisions.length).toEqual(2);
    expect(decisions[0].decisionType).toEqual(DecisionType.RecordMarker);
    expect(decisions[1].decisionType).toEqual(DecisionType.CancelTimer);
}

export async function Test_ActivityStateMachine_CompleteWithoutCancel(): Promise<void> {
    const activityID = "test-activity-1";
    const attributes = new ScheduleActivityTaskDecisionAttributes({
        activityId: StringPtr(activityID)
    });
    const h = await newDecisionsHelper();

    const d = h.scheduleActivityTask(attributes);
    expect(d.getState()).toEqual(decisionStateCreated);
    const decisions = h.getDecisions(true);
    expect(d.getState()).toEqual(decisionStateDecisionSent);
    expect(decisions.length).toEqual(1);
    expect(decisions[0].decisionType).toEqual(DecisionType.ScheduleActivityTask);

    h.handleActivityTaskScheduled(1, activityID);
    expect(d.getState()).toEqual(decisionStateInitiated);

    h.handleActivityTaskClosed(activityID);
    expect(d.getState()).toEqual(decisionStateCompleted);
}

export async function Test_ActivityStateMachine_CancelBeforeSent(): Promise<void> {
    const activityID = "test-activity-1";
    const attributes = new ScheduleActivityTaskDecisionAttributes({
        activityId: StringPtr(activityID),
    });
    const h = await newDecisionsHelper();

    const d = h.scheduleActivityTask(attributes);
    expect(d.getState()).toEqual(decisionStateCreated);

    h.requestCancelActivityTask(activityID);
    expect(d.getState()).toEqual(decisionStateCompleted);

    const decisions = h.getDecisions(true);
    expect(decisions.length).toEqual(0);
}

export async function Test_ActivityStateMachine_CancelAfterSent(): Promise<void> {
    const activityID = "test-activity-1";
    const attributes = new ScheduleActivityTaskDecisionAttributes({
        activityId: StringPtr(activityID)
    });
    const h = await newDecisionsHelper();

    const d = h.scheduleActivityTask(attributes);
    expect(d.getState()).toEqual(decisionStateCreated);
    let decisions = h.getDecisions(true);
    expect(decisions.length).toEqual(1);
    expect(decisions[0].decisionType).toEqual(DecisionType.ScheduleActivityTask);

    h.requestCancelActivityTask(activityID);
    expect(d.getState()).toEqual(decisionStateCanceledBeforeInitiated);
    expect(h.getDecisions(true).length).toEqual(0);

    h.handleActivityTaskScheduled(1, activityID);
    expect(d.getState()).toEqual(decisionStateCanceledAfterInitiated);
    decisions = h.getDecisions(true);
    expect(decisions.length).toEqual(1);
    expect(decisions[0].decisionType).toEqual(DecisionType.RequestCancelActivityTask);

    h.handleActivityTaskCanceled(activityID);
    expect(d.getState()).toEqual(decisionStateCompleted);
    expect(h.getDecisions(false).length).toEqual(0);
}

export async function Test_ActivityStateMachine_CompletedAfterCancel(): Promise<void> {
    const activityID = "test-activity-1";
    const attributes = new ScheduleActivityTaskDecisionAttributes({
        activityId: StringPtr(activityID),
    });
    const h = await newDecisionsHelper();

    const d = h.scheduleActivityTask(attributes);
    expect(d.getState()).toEqual(decisionStateCreated);
    let decisions = h.getDecisions(true);
    expect(decisions.length).toEqual(1);
    expect(decisions[0].decisionType).toEqual(DecisionType.ScheduleActivityTask);

    h.requestCancelActivityTask(activityID);
    expect(d.getState()).toEqual(decisionStateCanceledBeforeInitiated);
    expect(h.getDecisions(true).length).toEqual(0);

    h.handleActivityTaskScheduled(1, activityID);
    expect(d.getState()).toEqual(decisionStateCanceledAfterInitiated);
    decisions = h.getDecisions(true);
    expect(decisions.length).toEqual(1);
    expect(decisions[0].decisionType).toEqual(DecisionType.RequestCancelActivityTask);

    h.handleActivityTaskClosed(activityID);
    expect(d.getState()).toEqual(decisionStateCompletedAfterCancellationDecisionSent);
    expect(h.getDecisions(false).length).toEqual(0);
}

export async function Test_ActivityStateMachine_PanicInvalidStateTransition(): Promise<void> {
    const activityID = "test-activity-1";
    const attributes = new ScheduleActivityTaskDecisionAttributes({
        activityId: StringPtr(activityID),
    });
    const h = await newDecisionsHelper();

    h.scheduleActivityTask(attributes);

    const err = runAndCatchPanic(() => {
        h.handleActivityTaskClosed("invalid-activity-id");
    });
    expect(err).not.toBeNull();

    h.getDecisions(true);
    h.handleActivityTaskScheduled(1, activityID);

    const err2 = runAndCatchPanic(() => {
        h.handleActivityTaskCanceled(activityID);
    });
    expect(err2).not.toBeNull();
}

export async function Test_ChildWorkflowStateMachine_Basic(): Promise<void> {
    const workflowID = "test-child-workflow-1";
    const attributes = new StartChildWorkflowExecutionDecisionAttributes({
        workflowId: StringPtr(workflowID),
    });
    const h = await newDecisionsHelper();

    const d = h.startChildWorkflowExecution(attributes);
    expect(d.getState()).toEqual(decisionStateCreated);

    const decisions = h.getDecisions(true);
    expect(d.getState()).toEqual(decisionStateDecisionSent);
    expect(decisions.length).toEqual(1);
    expect(decisions[0].decisionType).toEqual(DecisionType.StartChildWorkflowExecution);

    h.handleStartChildWorkflowExecutionInitiated(workflowID);
    expect(d.getState()).toEqual(decisionStateInitiated);
    expect(h.getDecisions(true).length).toEqual(0);

    h.handleChildWorkflowExecutionStarted(workflowID);
    expect(d.getState()).toEqual(decisionStateStarted);
    expect(h.getDecisions(true).length).toEqual(0);

    h.handleChildWorkflowExecutionClosed(workflowID);
    expect(d.getState()).toEqual(decisionStateCompleted);
    expect(h.getDecisions(true).length).toEqual(0);
}

export async function Test_ChildWorkflowStateMachine_CancelSucceed(): Promise<void> {
    const domain = "test-domain";
    const workflowID = "test-child-workflow";
    const runID = "";
    const cancellationID = "";
    const initiatedEventID = 28;
    const isChildWorkflowOnly = true;
    const attributes = new StartChildWorkflowExecutionDecisionAttributes({
        workflowId: StringPtr(workflowID)
    });
    const h = await newDecisionsHelper();

    const d = h.startChildWorkflowExecution(attributes);
    let decisions = h.getDecisions(true);
    h.handleStartChildWorkflowExecutionInitiated(workflowID);
    h.handleChildWorkflowExecutionStarted(workflowID);

    h.requestCancelExternalWorkflowExecution(
        domain,
        workflowID,
        runID,
        cancellationID,
        isChildWorkflowOnly
    );
    expect(d.getState()).toEqual(decisionStateCanceledAfterStarted);

    decisions = h.getDecisions(true);
    expect(d.getState()).toEqual(decisionStateCancellationDecisionSent);
    expect(decisions.length).toEqual(1);
    expect(decisions[0].decisionType).toEqual(DecisionType.RequestCancelExternalWorkflowExecution);

    h.handleRequestCancelExternalWorkflowExecutionInitiated(
        initiatedEventID,
        workflowID,
        cancellationID
    );
    expect(d.getState()).toEqual(decisionStateCancellationDecisionSent);

    h.handleExternalWorkflowExecutionCancelRequested(initiatedEventID, workflowID);
    expect(d.getState()).toEqual(decisionStateCancellationDecisionSent);

    h.handleChildWorkflowExecutionCanceled(workflowID);
    expect(d.getState()).toEqual(decisionStateCompleted);
}

export async function Test_ChildWorkflowStateMachine_InvalidStates(): Promise<void> {
    const domain = "test-domain";
    const workflowID = "test-workflow-id";
    const runID = "";
    const attributes = new StartChildWorkflowExecutionDecisionAttributes({
        workflowId: StringPtr(workflowID),
    });
    const cancellationID = "";
    const initiatedEventID = 28;
    const isChildWorkflowOnly = true;
    const h = await newDecisionsHelper();

    const d = h.startChildWorkflowExecution(attributes);
    expect(d.getState()).toEqual(decisionStateCreated);

    let err = runAndCatchPanic(() => {
        h.handleStartChildWorkflowExecutionFailed(workflowID);
    });
    expect(err).not.toBeNull();

    let decisions = h.getDecisions(true);
    expect(d.getState()).toEqual(decisionStateDecisionSent);
    expect(decisions.length).toEqual(1);

    err = runAndCatchPanic(() => {
        h.handleChildWorkflowExecutionClosed(workflowID);
    });
    expect(err).not.toBeNull();

    h.handleStartChildWorkflowExecutionInitiated(workflowID);
    expect(d.getState()).toEqual(decisionStateInitiated);

    h.handleChildWorkflowExecutionStarted(workflowID);
    expect(d.getState()).toEqual(decisionStateStarted);

    err = runAndCatchPanic(() => {
        h.handleRequestCancelExternalWorkflowExecutionFailed(initiatedEventID, workflowID);
    });
    expect(err).not.toBeNull();

    h.requestCancelExternalWorkflowExecution(
        domain,
        workflowID,
        runID,
        cancellationID,
        isChildWorkflowOnly,
    );
    expect(d.getState()).toEqual(decisionStateCanceledAfterStarted);

    decisions = h.getDecisions(true);
    expect(d.getState()).toEqual(decisionStateCancellationDecisionSent);
    expect(decisions.length).toEqual(1);
    expect(decisions[0].decisionType).toEqual(
        DecisionType.RequestCancelExternalWorkflowExecution,
    );

    err = runAndCatchPanic(() => {
        h.handleStartChildWorkflowExecutionFailed(workflowID);
    });
    expect(err).not.toBeNull();

    err = runAndCatchPanic(() => {
        h.handleStartChildWorkflowExecutionInitiated(workflowID);
    });
    expect(err).not.toBeNull();

    h.handleRequestCancelExternalWorkflowExecutionInitiated(
        initiatedEventID,
        workflowID,
        cancellationID,
    );
    expect(d.getState()).toEqual(decisionStateCancellationDecisionSent);

    h.handleChildWorkflowExecutionClosed(workflowID);
    expect(d.getState()).toEqual(decisionStateCompletedAfterCancellationDecisionSent);

    err = runAndCatchPanic(() => {
        h.handleChildWorkflowExecutionCanceled(workflowID);
    });
    expect(err).not.toBeNull();
}

export async function Test_ChildWorkflowStateMachine_CancelFailed(): Promise<void> {
    const domain = "test-domain";
    const workflowID = "test-workflow-id";
    const runID = "";
    const attributes = new StartChildWorkflowExecutionDecisionAttributes({
        workflowId: StringPtr(workflowID),
    });
    const cancellationID = "";
    const initiatedEventID = 28;
    const isChildWorkflowOnly = true;
    const h = await newDecisionsHelper();

    const d = h.startChildWorkflowExecution(attributes);
    h.getDecisions(true);
    h.handleStartChildWorkflowExecutionInitiated(workflowID);
    h.handleChildWorkflowExecutionStarted(workflowID);
    h.requestCancelExternalWorkflowExecution(
        domain,
        workflowID,
        runID,
        cancellationID,
        isChildWorkflowOnly,
    );
    h.getDecisions(true);
    h.handleRequestCancelExternalWorkflowExecutionInitiated(
        initiatedEventID,
        workflowID,
        cancellationID,
    );

    h.handleRequestCancelExternalWorkflowExecutionFailed(
        initiatedEventID,
        workflowID,
    );
    expect(d.getState()).toEqual(decisionStateStarted);

    h.handleChildWorkflowExecutionClosed(workflowID);
    expect(d.getState()).toEqual(decisionStateCompleted);
}

export async function Test_MarkerStateMachine(): Promise<void> {
    const h = await newDecisionsHelper();

    const d = h.recordSideEffectMarker(1, Buffer.from([]));
    expect(d.getState()).toEqual(decisionStateCreated);

    const decisions = h.getDecisions(true);
    expect(d.getState()).toEqual(decisionStateCompleted);
    expect(decisions.length).toEqual(1);
    expect(decisions[0].decisionType).toEqual(DecisionType.RecordMarker);
}

export async function Test_UpsertSearchAttributesDecisionStateMachine(): Promise<void> {
    const h = await newDecisionsHelper();

    const attr = new SearchAttributes({});
    const d = h.upsertSearchAttributes("1", attr);
    expect(d.getState()).toEqual(decisionStateCreated);

    const decisions = h.getDecisions(true);
    expect(d.getState()).toEqual(decisionStateCompleted);
    expect(decisions.length).toEqual(1);
    expect(decisions[0].decisionType).toEqual(DecisionType.UpsertWorkflowSearchAttributes);
}

export async function Test_CancelExternalWorkflowStateMachine_Succeed(): Promise<void> {
    const domain = "test-domain";
    const workflowID = "test-workflow-id";
    const runID = "test-run-id";
    const cancellationID = "1";
    const initiatedEventID = 28;
    const childWorkflowOnly = false;
    const h = await newDecisionsHelper();

    const decision = h.requestCancelExternalWorkflowExecution(
        domain,
        workflowID,
        runID,
        cancellationID,
        childWorkflowOnly,
    );
    expect(decision.isDone()).toBe(false);

    const d = h.getDecision(makeDecisionID(decisionTypeCancellation, cancellationID));
    expect(d.getState()).toEqual(decisionStateCreated);

    const decisions = h.getDecisions(true);
    expect(decisions.length).toEqual(1);
    expect(decisions[0].decisionType).toEqual(DecisionType.RequestCancelExternalWorkflowExecution);
    expect(decisions[0].requestCancelExternalWorkflowExecutionDecisionAttributes).toEqual(
        new RequestCancelExternalWorkflowExecutionDecisionAttributes({
            domain: StringPtr(domain),
            workflowId: StringPtr(workflowID),
            runId: StringPtr(runID),
            control: Buffer.from(cancellationID),
            childWorkflowOnly: BoolPtr(childWorkflowOnly),
        }),
    );

    h.handleRequestCancelExternalWorkflowExecutionInitiated(
        initiatedEventID,
        workflowID,
        cancellationID,
    );
    expect(d.getState()).toEqual(decisionStateInitiated);

    h.handleExternalWorkflowExecutionCancelRequested(initiatedEventID, workflowID);
    expect(d.getState()).toEqual(decisionStateCompleted);

    const err = runAndCatchPanic(() => {
        h.handleRequestCancelExternalWorkflowExecutionFailed(initiatedEventID, workflowID);
    });
    expect(err).not.toBeNull();
}

export async function Test_CancelExternalWorkflowStateMachine_Failed(): Promise<void> {
    const domain = "test-domain";
    const workflowID = "test-workflow-id";
    const runID = "test-run-id";
    const cancellationID = "2";
    const initiatedEventID = 28;
    const childWorkflowOnly = false;
    const h = await newDecisionsHelper();

    const decision = h.requestCancelExternalWorkflowExecution(
        domain,
        workflowID,
        runID,
        cancellationID,
        childWorkflowOnly,
    );
    expect(decision.isDone()).toBe(false);

    const d = h.getDecision(makeDecisionID(decisionTypeCancellation, cancellationID));
    expect(d.getState()).toEqual(decisionStateCreated);

    const decisions = h.getDecisions(true);
    expect(decisions.length).toEqual(1);
    expect(decisions[0].decisionType).toEqual(DecisionType.RequestCancelExternalWorkflowExecution);
    expect(decisions[0].requestCancelExternalWorkflowExecutionDecisionAttributes).toEqual(
        new RequestCancelExternalWorkflowExecutionDecisionAttributes({
            domain: StringPtr(domain),
            workflowId: StringPtr(workflowID),
            runId: StringPtr(runID),
            control: Buffer.from(cancellationID),
            childWorkflowOnly: BoolPtr(childWorkflowOnly),
        }),
    );

    h.handleRequestCancelExternalWorkflowExecutionInitiated(
        initiatedEventID,
        workflowID,
        cancellationID,
    );
    expect(d.getState()).toEqual(decisionStateInitiated);

    h.handleRequestCancelExternalWorkflowExecutionFailed(initiatedEventID, workflowID);
    expect(d.getState()).toEqual(decisionStateCompleted);

    const err = runAndCatchPanic(() => {
        h.handleExternalWorkflowExecutionCancelRequested(initiatedEventID, workflowID);
    });
    expect(err).not.toBeNull();
}

export function runAndCatchPanic(f: () => void | Promise<void>): workflowPanicError | undefined {
  try {
    f();
    return undefined;
  } catch (p) {
    if (p != null) {
      const topLine = "runAndCatchPanic [panic]:";
      const st = getStackTraceRaw(topLine, 4, 0);
      return newWorkflowPanicError(p, st);
    }
    return undefined;
  }
}
