// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { WorkflowInfo, CadenceChangeVersion } from './workflow.js';
import { IDecision as shared_IDecision } from '../generated/thrift/cadence-idl/com/uber/cadence/Decision.js';
import { IHistoryEvent as shared_IHistoryEvent } from '../generated/thrift/cadence-idl/com/uber/cadence/HistoryEvent.js';
import { ISearchAttributes as shared_ISearchAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/SearchAttributes.js';
import { IsReplayDomain } from './workflow_replayer.js';
import { mutableSideEffectMarkerName, versionMarkerName } from './internal_decision_state_machine.js';
import { DecisionType } from '../generated/thrift/cadence-idl/com/uber/cadence/DecisionType.js';
import { NewNonDeterminsticError } from './error.js';
import { EventType } from '../generated/thrift/cadence-idl/com/uber/cadence/EventType.js';

export function lastPartOfName(name: string): string {
  if (name.endsWith("-fm")) {
    name = name.slice(0, -3);
  }
  const lastDotIdx = name.lastIndexOf(".");
  if (lastDotIdx < 0 || lastDotIdx === name.length - 1) {
    return name;
  }
  return name.slice(lastDotIdx + 1);
}

export function skipDeterministicCheckForEvent(e: shared_IHistoryEvent): boolean {
    if (e.eventType === EventType.MarkerRecorded) {
        const markerName = e.markerRecordedEventAttributes?.markerName ?? "";
        if (markerName === versionMarkerName || markerName === mutableSideEffectMarkerName) {
            return true;
        }
    }
    return false;
}

export function skipDeterministicCheckForDecision(d: shared_IDecision): boolean {
    if (d.decisionType === DecisionType.RecordMarker) {
        const markerName = d.recordMarkerDecisionAttributes?.markerName ?? "";
        if (markerName === versionMarkerName || markerName === mutableSideEffectMarkerName) {
            return true;
        }
    }
    return false;
}

export function isDecisionMatchEvent(d: shared_IDecision, e: shared_IHistoryEvent, strictMode: boolean): boolean {
    switch (d.decisionType) {
        case DecisionType.ScheduleActivityTask: {
            if (e.eventType !== EventType.ActivityTaskScheduled) {
                return false;
            }
            const eventAttributes = e.activityTaskScheduledEventAttributes!;
            const decisionAttributes = d.scheduleActivityTaskDecisionAttributes!;

            if (
                (eventAttributes.activityId ?? "") !== (decisionAttributes.activityId ?? "") ||
                lastPartOfName(eventAttributes.activityType?.name ?? "") !== lastPartOfName(decisionAttributes.activityType?.name ?? "") ||
                (strictMode && (eventAttributes.taskList?.name ?? "") !== (decisionAttributes.taskList?.name ?? "")) ||
                (strictMode && Buffer.compare(eventAttributes.input!, decisionAttributes.input!) !== 0)
            ) {
                return false;
            }

            return true;
        }

        case DecisionType.RequestCancelActivityTask: {
            if (e.eventType !== EventType.ActivityTaskCancelRequested) {
                return false;
            }
            const decisionAttributes = d.requestCancelActivityTaskDecisionAttributes!;
            const eventAttributes = e.activityTaskCancelRequestedEventAttributes!;
            if ((eventAttributes.activityId ?? "") !== (decisionAttributes.activityId ?? "")) {
                return false;
            }

            return true;
        }

        case DecisionType.StartTimer: {
            if (e.eventType !== EventType.TimerStarted) {
                return false;
            }
            const eventAttributes = e.timerStartedEventAttributes!;
            const decisionAttributes = d.startTimerDecisionAttributes!;

            if (
                (eventAttributes.timerId ?? "") !== (decisionAttributes.timerId ?? "") ||
                (strictMode &&
                    (eventAttributes.startToFireTimeoutSeconds?.toNumber() ?? 0) !==
                        (decisionAttributes.startToFireTimeoutSeconds?.toNumber() ?? 0))
            ) {
                return false;
            }

            return true;
        }

        case DecisionType.CancelTimer: {
            if (e.eventType !== EventType.TimerCanceled && e.eventType !== EventType.CancelTimerFailed) {
                return false;
            }
            const decisionAttributes = d.cancelTimerDecisionAttributes!;
            if (e.eventType === EventType.TimerCanceled) {
                const eventAttributes = e.timerCanceledEventAttributes!;
                if ((eventAttributes.timerId ?? "") !== (decisionAttributes.timerId ?? "")) {
                    return false;
                }
            } else if (e.eventType === EventType.CancelTimerFailed) {
                const eventAttributes = e.cancelTimerFailedEventAttributes!;
                if ((eventAttributes.timerId ?? "") !== (decisionAttributes.timerId ?? "")) {
                    return false;
                }
            }

            return true;
        }

        case DecisionType.CompleteWorkflowExecution: {
            if (e.eventType !== EventType.WorkflowExecutionCompleted) {
                return false;
            }
            if (strictMode) {
                const eventAttributes = e.workflowExecutionCompletedEventAttributes!;
                const decisionAttributes = d.completeWorkflowExecutionDecisionAttributes!;

                if (Buffer.compare(eventAttributes.result!, decisionAttributes.result!) !== 0) {
                    return false;
                }
            }

            return true;
        }

        case DecisionType.FailWorkflowExecution: {
            if (e.eventType !== EventType.WorkflowExecutionFailed) {
                return false;
            }
            if (strictMode) {
                const eventAttributes = e.workflowExecutionFailedEventAttributes!;
                const decisionAttributes = d.failWorkflowExecutionDecisionAttributes!;

                if (
                    (eventAttributes.reason ?? "") !== (decisionAttributes.reason ?? "") ||
                    Buffer.compare(eventAttributes.details!, decisionAttributes.details!) !== 0
                ) {
                    return false;
                }
            }

            return true;
        }

        case DecisionType.RecordMarker: {
            if (e.eventType !== EventType.MarkerRecorded) {
                return false;
            }
            const eventAttributes = e.markerRecordedEventAttributes!;
            const decisionAttributes = d.recordMarkerDecisionAttributes!;
            if ((eventAttributes.markerName ?? "") !== (decisionAttributes.markerName ?? "")) {
                return false;
            }

            return true;
        }

        case DecisionType.RequestCancelExternalWorkflowExecution: {
            if (e.eventType !== EventType.RequestCancelExternalWorkflowExecutionInitiated) {
                return false;
            }
            const eventAttributes = e.requestCancelExternalWorkflowExecutionInitiatedEventAttributes!;
            const decisionAttributes = d.requestCancelExternalWorkflowExecutionDecisionAttributes!;
            if (
                checkDomainsInDecisionAndEvent(
                    eventAttributes.domain ?? "",
                    decisionAttributes.domain ?? ""
                ) ||
                (eventAttributes.workflowExecution?.workflowId ?? "") !== (decisionAttributes.workflowId ?? "")
            ) {
                return false;
            }

            return true;
        }

        case DecisionType.SignalExternalWorkflowExecution: {
            if (e.eventType !== EventType.SignalExternalWorkflowExecutionInitiated) {
                return false;
            }
            const eventAttributes = e.signalExternalWorkflowExecutionInitiatedEventAttributes!;
            const decisionAttributes = d.signalExternalWorkflowExecutionDecisionAttributes!;
            if (
                checkDomainsInDecisionAndEvent(
                    eventAttributes.domain ?? "",
                    decisionAttributes.domain ?? ""
                ) ||
                (eventAttributes.signalName ?? "") !== (decisionAttributes.signalName ?? "") ||
                (eventAttributes.workflowExecution?.workflowId ?? "") !==
                    (decisionAttributes.execution?.workflowId ?? "")
            ) {
                return false;
            }

            return true;
        }

        case DecisionType.CancelWorkflowExecution: {
            if (e.eventType !== EventType.WorkflowExecutionCanceled) {
                return false;
            }
            if (strictMode) {
                const eventAttributes = e.workflowExecutionCanceledEventAttributes!;
                const decisionAttributes = d.cancelWorkflowExecutionDecisionAttributes!;
                if (Buffer.compare(eventAttributes.details!, decisionAttributes.details!) !== 0) {
                    return false;
                }
            }
            return true;
        }

        case DecisionType.ContinueAsNewWorkflowExecution: {
            if (e.eventType !== EventType.WorkflowExecutionContinuedAsNew) {
                return false;
            }

            return true;
        }

        case DecisionType.StartChildWorkflowExecution: {
            if (e.eventType !== EventType.StartChildWorkflowExecutionInitiated) {
                return false;
            }
            const eventAttributes = e.startChildWorkflowExecutionInitiatedEventAttributes!;
            const decisionAttributes = d.startChildWorkflowExecutionDecisionAttributes!;
            if (
                lastPartOfName(eventAttributes.workflowType?.name ?? "") !==
                    lastPartOfName(decisionAttributes.workflowType?.name ?? "") ||
                (strictMode &&
                    checkDomainsInDecisionAndEvent(
                        eventAttributes.domain ?? "",
                        decisionAttributes.domain ?? ""
                    )) ||
                (strictMode &&
                    (eventAttributes.taskList?.name ?? "") !== (decisionAttributes.taskList?.name ?? ""))
            ) {
                return false;
            }

            return true;
        }

        case DecisionType.UpsertWorkflowSearchAttributes: {
            if (e.eventType !== EventType.UpsertWorkflowSearchAttributes) {
                return false;
            }
            const eventAttributes = e.upsertWorkflowSearchAttributesEventAttributes!;
            const decisionAttributes = d.upsertWorkflowSearchAttributesDecisionAttributes!;
            if (
                strictMode &&
                !isSearchAttributesMatched(
                    eventAttributes.searchAttributes,
                    decisionAttributes.searchAttributes
                )
            ) {
                return false;
            }
            return true;
        }
    }

    return false;
}

export function isSearchAttributesMatched(attrFromEvent: shared_ISearchAttributes | undefined, attrFromDecision: shared_ISearchAttributes | undefined): boolean {
    if (attrFromEvent != null && attrFromDecision != null) {
        const eventFields = attrFromEvent.indexedFields!;
        const decisionFields = attrFromDecision.indexedFields!;

        if (eventFields == null || decisionFields == null) {
            return eventFields == null && decisionFields == null;
        }

        if (eventFields.size !== decisionFields.size) {
            return false;
        }

        for (const [key, eventValue] of eventFields) {
            const decisionValue = decisionFields.get(key);
            if (decisionValue === undefined || !eventValue.equals(decisionValue)) {
                return false;
            }
        }

        return true;
    }

    return attrFromEvent == null && attrFromDecision == null;
}

/**
 * return true if the check fails:
 * 
 * 	domain is not empty in decision
 * 	and domain is not replayDomain
 * 	and domains unmatch in decision and events
 */
export function checkDomainsInDecisionAndEvent(eventDomainName: string, decisionDomainName: string): boolean {
    if (decisionDomainName === "" || IsReplayDomain(decisionDomainName)) {
        return false;
    }
    return eventDomainName !== decisionDomainName;
}

/**
 * special check for upsert change version event
 */
export function skipDeterministicCheckForUpsertChangeVersion(events: shared_IHistoryEvent[], idx: number): boolean {
    const e = events[idx];
    if (
        e.eventType === EventType.MarkerRecorded &&
        (e.markerRecordedEventAttributes?.markerName ?? "") === versionMarkerName &&
        idx < events.length - 1 &&
        events[idx + 1]!.eventType === EventType.UpsertWorkflowSearchAttributes
    ) {
        if (
            events[idx + 1]!.upsertWorkflowSearchAttributesEventAttributes!.searchAttributes!.indexedFields!.has(
                CadenceChangeVersion
            )
        ) {
            return true;
        }
    }
    return false;
}

export function matchReplayWithHistory(info: WorkflowInfo, replayDecisions: shared_IDecision[], historyEvents: shared_IHistoryEvent[]): void {
    let di = 0;
    let hi = 0;
    const hSize = historyEvents.length;
    const dSize = replayDecisions.length;

    for (; hi < hSize || di < dSize;) {
        let e: shared_IHistoryEvent | undefined = undefined;
        if (hi < hSize) {
            e = historyEvents[hi];
            if (skipDeterministicCheckForUpsertChangeVersion(historyEvents, hi)) {
                hi += 2;
                continue;
            }
            if (skipDeterministicCheckForEvent(e)) {
                hi++;
                continue;
            }
        }

        let d: shared_IDecision | undefined = undefined;
        if (di < dSize) {
            d = replayDecisions[di];
            if (skipDeterministicCheckForDecision(d)) {
                di++;
                continue;
            }
        }

        if (d == null) {
            const err = NewNonDeterminsticError("missing replay decision", info, e, undefined);
            if (err != null) {
                throw err;
            }
        }

        if (e == null) {
            const err = NewNonDeterminsticError("extra replay decision", info, undefined, d);
            if (err != null) {
                throw err;
            }
        }

        if (!isDecisionMatchEvent(d!, e!, false)) {
            const err = NewNonDeterminsticError("mismatch", info, e, d);
            if (err != null) {
                throw err;
            }
        }

        di++;
        hi++;
    }
}
