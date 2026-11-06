import { ActivityTaskScheduledEventAttributes as shared_ActivityTaskScheduledEventAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/ActivityTaskScheduledEventAttributes.js';
import { ScheduleActivityTaskDecisionAttributes as shared_ScheduleActivityTaskDecisionAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/ScheduleActivityTaskDecisionAttributes.js';
import { ActivityType as shared_ActivityType } from '../generated/thrift/cadence-idl/com/uber/cadence/ActivityType.js';
import { Int64 } from '@creditkarma/thrift-server-core';
import { WorkflowExecutionFailedEventAttributes as shared_WorkflowExecutionFailedEventAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/WorkflowExecutionFailedEventAttributes.js';
import { WorkflowExecutionCompletedEventAttributes as shared_WorkflowExecutionCompletedEventAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/WorkflowExecutionCompletedEventAttributes.js';
import { WorkflowExecutionCanceledEventAttributes as shared_WorkflowExecutionCanceledEventAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/WorkflowExecutionCanceledEventAttributes.js';
import { WorkflowExecution as shared_WorkflowExecution } from '../generated/thrift/cadence-idl/com/uber/cadence/WorkflowExecution.js';
import { TimerStartedEventAttributes as shared_TimerStartedEventAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/TimerStartedEventAttributes.js';
import { TimerCanceledEventAttributes as shared_TimerCanceledEventAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/TimerCanceledEventAttributes.js';
import { TaskList as shared_TaskList } from '../generated/thrift/cadence-idl/com/uber/cadence/TaskList.js';
import { StartTimerDecisionAttributes as shared_StartTimerDecisionAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/StartTimerDecisionAttributes.js';
import { StartChildWorkflowExecutionInitiatedEventAttributes as shared_StartChildWorkflowExecutionInitiatedEventAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/StartChildWorkflowExecutionInitiatedEventAttributes.js';
import { StartChildWorkflowExecutionDecisionAttributes as shared_StartChildWorkflowExecutionDecisionAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/StartChildWorkflowExecutionDecisionAttributes.js';
import { SignalExternalWorkflowExecutionInitiatedEventAttributes as shared_SignalExternalWorkflowExecutionInitiatedEventAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/SignalExternalWorkflowExecutionInitiatedEventAttributes.js';
import { SignalExternalWorkflowExecutionDecisionAttributes as shared_SignalExternalWorkflowExecutionDecisionAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/SignalExternalWorkflowExecutionDecisionAttributes.js';
import { RequestCancelExternalWorkflowExecutionInitiatedEventAttributes as shared_RequestCancelExternalWorkflowExecutionInitiatedEventAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/RequestCancelExternalWorkflowExecutionInitiatedEventAttributes.js';
import { RequestCancelExternalWorkflowExecutionDecisionAttributes as shared_RequestCancelExternalWorkflowExecutionDecisionAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/RequestCancelExternalWorkflowExecutionDecisionAttributes.js';
import { RequestCancelActivityTaskDecisionAttributes as shared_RequestCancelActivityTaskDecisionAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/RequestCancelActivityTaskDecisionAttributes.js';
import { RecordMarkerDecisionAttributes as shared_RecordMarkerDecisionAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/RecordMarkerDecisionAttributes.js';
import { MarkerRecordedEventAttributes as shared_MarkerRecordedEventAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/MarkerRecordedEventAttributes.js';
import { FailWorkflowExecutionDecisionAttributes as shared_FailWorkflowExecutionDecisionAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/FailWorkflowExecutionDecisionAttributes.js';
import { CompleteWorkflowExecutionDecisionAttributes as shared_CompleteWorkflowExecutionDecisionAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/CompleteWorkflowExecutionDecisionAttributes.js';
import { CancelWorkflowExecutionDecisionAttributes as shared_CancelWorkflowExecutionDecisionAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/CancelWorkflowExecutionDecisionAttributes.js';
import { CancelTimerFailedEventAttributes as shared_CancelTimerFailedEventAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/CancelTimerFailedEventAttributes.js';
import { CancelTimerDecisionAttributes as shared_CancelTimerDecisionAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/CancelTimerDecisionAttributes.js';
import { ActivityTaskCancelRequestedEventAttributes as shared_ActivityTaskCancelRequestedEventAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/ActivityTaskCancelRequestedEventAttributes.js';
import { WorkflowInfo } from './workflow.js';
import { decisionType } from './internal_decision_state_machine.js';
// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { expect } from 'vitest';
import { IDecision as shared_IDecision, Decision as shared_Decision } from '../generated/thrift/cadence-idl/com/uber/cadence/Decision.js';
import { DecisionType as shared_DecisionType } from '../generated/thrift/cadence-idl/com/uber/cadence/DecisionType.js';
import { EventType as shared_EventType } from '../generated/thrift/cadence-idl/com/uber/cadence/EventType.js';
import { IHistoryEvent as shared_IHistoryEvent, HistoryEvent as shared_HistoryEvent } from '../generated/thrift/cadence-idl/com/uber/cadence/HistoryEvent.js';
import { DecisionTypePtr, EventTypePtr, StringPtr } from './common/convert.js';
import { isDecisionMatchEvent, matchReplayWithHistory } from './workflow_replayer_utils.js';

export interface matchReplayWithHistoryTestCase {
  name: string;
  replayDecisions?: shared_IDecision[];
  historyEvents?: shared_IHistoryEvent[];
  expectError: boolean;
}

export function TestMatchReplayWithHistory(): void {
  const testCases: matchReplayWithHistoryTestCase[] = [
    {
      name: "Success matching",
      replayDecisions: [
        mockDecision(shared_DecisionType.ScheduleActivityTask),
      ],
      historyEvents: [
        mockHistoryEvent(shared_EventType.ActivityTaskScheduled),
      ],
      expectError: false,
    },
    {
      name: "Mismatch error",
      replayDecisions: [
        mockDecision(shared_DecisionType.StartTimer),
      ],
      historyEvents: [
        mockHistoryEvent(shared_EventType.TimerCanceled),
      ],
      expectError: true,
    },
  ];

  for (const tc of testCases) {
    const info = new WorkflowInfo();

    if (tc.expectError) {
      expect(() =>
        matchReplayWithHistory(info, tc.replayDecisions!, tc.historyEvents!),
      ).toThrow();
    } else {
      matchReplayWithHistory(info, tc.replayDecisions!, tc.historyEvents!);
    }
  }
}

export function TestIsDecisionMatchEvent(): void {
    const tests = [
        {
            decision: new shared_Decision({
                decisionType: DecisionTypePtr(shared_DecisionType.ScheduleActivityTask),
            }),
            expected: false,
            strictMode: false,
        },
        {
            decision: new shared_Decision({
                decisionType: DecisionTypePtr(shared_DecisionType.RequestCancelActivityTask),
            }),
            expected: false,
            strictMode: false,
        },
        {
            decision: new shared_Decision({
                decisionType: DecisionTypePtr(shared_DecisionType.RequestCancelActivityTask),
                requestCancelActivityTaskDecisionAttributes:
                    new shared_RequestCancelActivityTaskDecisionAttributes({
                        activityId: StringPtr("ActivityID-1"),
                    }),
            }),
            event: new shared_HistoryEvent({
                eventType: EventTypePtr(shared_EventType.ActivityTaskCancelRequested),
                activityTaskCancelRequestedEventAttributes:
                    new shared_ActivityTaskCancelRequestedEventAttributes({
                        activityId: StringPtr("ActivityID-2"),
                    }),
            }),
            expected: false,
            strictMode: false,
        },
        {
            decision: new shared_Decision({
                decisionType: DecisionTypePtr(shared_DecisionType.RequestCancelActivityTask),
                requestCancelActivityTaskDecisionAttributes:
                    new shared_RequestCancelActivityTaskDecisionAttributes({
                        activityId: StringPtr("ActivityID"),
                    }),
            }),
            event: new shared_HistoryEvent({
                eventType: EventTypePtr(shared_EventType.ActivityTaskCancelRequested),
                activityTaskCancelRequestedEventAttributes:
                    new shared_ActivityTaskCancelRequestedEventAttributes({
                        activityId: StringPtr("ActivityID"),
                    }),
            }),
            expected: true,
            strictMode: false,
        },
        {
            decision: new shared_Decision({
                decisionType: DecisionTypePtr(shared_DecisionType.StartTimer),
            }),
            expected: false,
            strictMode: false,
        },
        {
            decision: new shared_Decision({
                decisionType: DecisionTypePtr(shared_DecisionType.StartTimer),
                startTimerDecisionAttributes: new shared_StartTimerDecisionAttributes({
                    timerId: StringPtr("timerID-1"),
                }),
            }),
            event: new shared_HistoryEvent({
                eventType: EventTypePtr(shared_EventType.TimerStarted),
                timerStartedEventAttributes: new shared_TimerStartedEventAttributes({
                    timerId: StringPtr("timerID-2"),
                }),
            }),
            expected: false,
            strictMode: false,
        },
        {
            decision: new shared_Decision({
                decisionType: DecisionTypePtr(shared_DecisionType.StartTimer),
                startTimerDecisionAttributes: new shared_StartTimerDecisionAttributes({
                    timerId: StringPtr("timerID"),
                }),
            }),
            event: new shared_HistoryEvent({
                eventType: EventTypePtr(shared_EventType.TimerStarted),
                timerStartedEventAttributes: new shared_TimerStartedEventAttributes({
                    timerId: StringPtr("timerID"),
                }),
            }),
            expected: true,
            strictMode: false,
        },
        {
            decision: new shared_Decision({
                decisionType: DecisionTypePtr(shared_DecisionType.CancelTimer),
            }),
            expected: false,
            strictMode: false,
        },
        {
            decision: new shared_Decision({
                decisionType: DecisionTypePtr(shared_DecisionType.CancelTimer),
                cancelTimerDecisionAttributes: new shared_CancelTimerDecisionAttributes({
                    timerId: StringPtr("timerID-1"),
                }),
            }),
            event: new shared_HistoryEvent({
                eventType: EventTypePtr(shared_EventType.TimerCanceled),
                timerCanceledEventAttributes: new shared_TimerCanceledEventAttributes({
                    timerId: StringPtr("timerID-2"),
                }),
            }),
            expected: false,
            strictMode: false,
        },
        {
            decision: new shared_Decision({
                decisionType: DecisionTypePtr(shared_DecisionType.CancelTimer),
                cancelTimerDecisionAttributes: new shared_CancelTimerDecisionAttributes({
                    timerId: StringPtr("timerID-1"),
                }),
            }),
            event: new shared_HistoryEvent({
                eventType: EventTypePtr(shared_EventType.CancelTimerFailed),
                cancelTimerFailedEventAttributes: new shared_CancelTimerFailedEventAttributes({
                    timerId: StringPtr("timerID-2"),
                }),
            }),
            expected: false,
            strictMode: false,
        },
        {
            decision: new shared_Decision({
                decisionType: DecisionTypePtr(shared_DecisionType.CancelTimer),
                cancelTimerDecisionAttributes: new shared_CancelTimerDecisionAttributes({
                    timerId: StringPtr("timerID"),
                }),
            }),
            event: new shared_HistoryEvent({
                eventType: EventTypePtr(shared_EventType.CancelTimerFailed),
                cancelTimerFailedEventAttributes: new shared_CancelTimerFailedEventAttributes({
                    timerId: StringPtr("timerID"),
                }),
            }),
            expected: true,
            strictMode: false,
        },
        {
            decision: new shared_Decision({
                decisionType: DecisionTypePtr(shared_DecisionType.CompleteWorkflowExecution),
            }),
            event: new shared_HistoryEvent({
                eventType: EventTypePtr(shared_EventType.WorkflowExecutionCompleted),
            }),
            expected: true,
            strictMode: false,
        },
        {
            decision: new shared_Decision({
                decisionType: DecisionTypePtr(shared_DecisionType.CompleteWorkflowExecution),
            }),
            expected: false,
            strictMode: false,
        },
        {
            decision: new shared_Decision({
                decisionType: DecisionTypePtr(shared_DecisionType.CompleteWorkflowExecution),
                completeWorkflowExecutionDecisionAttributes:
                    new shared_CompleteWorkflowExecutionDecisionAttributes({
                        result: Buffer.from("some-result-1"),
                    }),
            }),
            event: new shared_HistoryEvent({
                eventType: EventTypePtr(shared_EventType.WorkflowExecutionCompleted),
                workflowExecutionCompletedEventAttributes:
                    new shared_WorkflowExecutionCompletedEventAttributes({
                        result: Buffer.from("some-result-2"),
                    }),
            }),
            expected: false,
            strictMode: true,
        },
        {
            decision: new shared_Decision({
                decisionType: DecisionTypePtr(shared_DecisionType.FailWorkflowExecution),
            }),
            event: new shared_HistoryEvent({
                eventType: EventTypePtr(shared_EventType.WorkflowExecutionFailed),
            }),
            expected: true,
            strictMode: false,
        },
        {
            decision: new shared_Decision({
                decisionType: DecisionTypePtr(shared_DecisionType.FailWorkflowExecution),
            }),
            expected: false,
            strictMode: false,
        },
        {
            decision: new shared_Decision({
                decisionType: DecisionTypePtr(shared_DecisionType.FailWorkflowExecution),
                failWorkflowExecutionDecisionAttributes:
                    new shared_FailWorkflowExecutionDecisionAttributes({
                        reason: StringPtr("some-reason-1"),
                        details: Buffer.from("some-details-1"),
                    }),
            }),
            event: new shared_HistoryEvent({
                eventType: EventTypePtr(shared_EventType.WorkflowExecutionFailed),
                workflowExecutionFailedEventAttributes:
                    new shared_WorkflowExecutionFailedEventAttributes({
                        reason: StringPtr("some-reason-2"),
                        details: Buffer.from("some-details-2"),
                    }),
            }),
            expected: false,
            strictMode: true,
        },
        {
            decision: new shared_Decision({
                decisionType: DecisionTypePtr(shared_DecisionType.RecordMarker),
                recordMarkerDecisionAttributes: new shared_RecordMarkerDecisionAttributes({
                    markerName: StringPtr("some-name"),
                }),
            }),
            event: new shared_HistoryEvent({
                eventType: EventTypePtr(shared_EventType.MarkerRecorded),
                markerRecordedEventAttributes: new shared_MarkerRecordedEventAttributes({
                    markerName: StringPtr("some-name"),
                }),
            }),
            expected: true,
            strictMode: false,
        },
        {
            decision: new shared_Decision({
                decisionType: DecisionTypePtr(shared_DecisionType.RecordMarker),
                recordMarkerDecisionAttributes: new shared_RecordMarkerDecisionAttributes({
                    markerName: StringPtr("some-name-1"),
                }),
            }),
            event: new shared_HistoryEvent({
                eventType: EventTypePtr(shared_EventType.MarkerRecorded),
                markerRecordedEventAttributes: new shared_MarkerRecordedEventAttributes({
                    markerName: StringPtr("some-name-2"),
                }),
            }),
            expected: false,
            strictMode: false,
        },
        {
            decision: new shared_Decision({
                decisionType: DecisionTypePtr(shared_DecisionType.RecordMarker),
            }),
            event: new shared_HistoryEvent({
                eventType: EventTypePtr(-24 as shared_EventType),
            }),
            expected: false,
            strictMode: false,
        },
        {
            decision: new shared_Decision({
                decisionType: DecisionTypePtr(shared_DecisionType.RequestCancelExternalWorkflowExecution),
            }),
            event: new shared_HistoryEvent({
                eventType: EventTypePtr(-24 as shared_EventType),
            }),
            expected: false,
            strictMode: false,
        },
        {
            decision: new shared_Decision({
                decisionType: DecisionTypePtr(shared_DecisionType.RequestCancelExternalWorkflowExecution),
                requestCancelExternalWorkflowExecutionDecisionAttributes:
                    new shared_RequestCancelExternalWorkflowExecutionDecisionAttributes({
                        workflowId: StringPtr("some-worklfow-id-1"),
                    }),
            }),
            event: new shared_HistoryEvent({
                eventType: EventTypePtr(
                    shared_EventType.RequestCancelExternalWorkflowExecutionInitiated,
                ),
                requestCancelExternalWorkflowExecutionInitiatedEventAttributes:
                    new shared_RequestCancelExternalWorkflowExecutionInitiatedEventAttributes({
                        workflowExecution: new shared_WorkflowExecution({
                            workflowId: StringPtr("some-workflow-id-2"),
                        }),
                    }),
            }),
            expected: false,
            strictMode: false,
        },
        {
            decision: new shared_Decision({
                decisionType: DecisionTypePtr(shared_DecisionType.RequestCancelExternalWorkflowExecution),
                requestCancelExternalWorkflowExecutionDecisionAttributes:
                    new shared_RequestCancelExternalWorkflowExecutionDecisionAttributes({
                        workflowId: StringPtr("some-workflow-id"),
                    }),
            }),
            event: new shared_HistoryEvent({
                eventType: EventTypePtr(
                    shared_EventType.RequestCancelExternalWorkflowExecutionInitiated,
                ),
                requestCancelExternalWorkflowExecutionInitiatedEventAttributes:
                    new shared_RequestCancelExternalWorkflowExecutionInitiatedEventAttributes({
                        workflowExecution: new shared_WorkflowExecution({
                            workflowId: StringPtr("some-workflow-id"),
                        }),
                    }),
            }),
            expected: true,
            strictMode: false,
        },
        {
            decision: new shared_Decision({
                decisionType: DecisionTypePtr(shared_DecisionType.SignalExternalWorkflowExecution),
            }),
            event: new shared_HistoryEvent({
                eventType: EventTypePtr(-24 as shared_EventType),
            }),
            expected: false,
            strictMode: false,
        },
        {
            decision: new shared_Decision({
                decisionType: DecisionTypePtr(shared_DecisionType.SignalExternalWorkflowExecution),
                signalExternalWorkflowExecutionDecisionAttributes:
                    new shared_SignalExternalWorkflowExecutionDecisionAttributes({
                        execution: new shared_WorkflowExecution({
                            workflowId: StringPtr("some-workflow-id-1"),
                        }),
                    }),
            }),
            event: new shared_HistoryEvent({
                eventType: EventTypePtr(
                    shared_EventType.SignalExternalWorkflowExecutionInitiated,
                ),
                signalExternalWorkflowExecutionInitiatedEventAttributes:
                    new shared_SignalExternalWorkflowExecutionInitiatedEventAttributes({
                        workflowExecution: new shared_WorkflowExecution({
                            workflowId: StringPtr("some-workflow-id-2"),
                        }),
                    }),
            }),
            expected: false,
            strictMode: false,
        },
        {
            decision: new shared_Decision({
                decisionType: DecisionTypePtr(shared_DecisionType.CancelWorkflowExecution),
            }),
            event: new shared_HistoryEvent({
                eventType: EventTypePtr(-24 as shared_EventType),
            }),
            expected: false,
            strictMode: false,
        },
        {
            decision: new shared_Decision({
                decisionType: DecisionTypePtr(shared_DecisionType.CancelWorkflowExecution),
                cancelWorkflowExecutionDecisionAttributes:
                    new shared_CancelWorkflowExecutionDecisionAttributes({
                        details: Buffer.from("some-details-1"),
                    }),
            }),
            event: new shared_HistoryEvent({
                eventType: EventTypePtr(shared_EventType.WorkflowExecutionCanceled),
                workflowExecutionCanceledEventAttributes:
                    new shared_WorkflowExecutionCanceledEventAttributes({
                        details: Buffer.from("some-details-2"),
                    }),
            }),
            expected: false,
            strictMode: true,
        },
        {
            decision: new shared_Decision({
                decisionType: DecisionTypePtr(shared_DecisionType.CancelWorkflowExecution),
                cancelWorkflowExecutionDecisionAttributes:
                    new shared_CancelWorkflowExecutionDecisionAttributes({
                        details: Buffer.from("some-details"),
                    }),
            }),
            event: new shared_HistoryEvent({
                eventType: EventTypePtr(shared_EventType.WorkflowExecutionCanceled),
                workflowExecutionCanceledEventAttributes:
                    new shared_WorkflowExecutionCanceledEventAttributes({
                        details: Buffer.from("some-details"),
                    }),
            }),
            expected: true,
            strictMode: true,
        },
        {
            decision: new shared_Decision({
                decisionType: DecisionTypePtr(shared_DecisionType.ContinueAsNewWorkflowExecution),
            }),
            event: new shared_HistoryEvent({
                eventType: EventTypePtr(-24 as shared_EventType),
            }),
            expected: false,
            strictMode: false,
        },
        {
            decision: new shared_Decision({
                decisionType: DecisionTypePtr(shared_DecisionType.ContinueAsNewWorkflowExecution),
            }),
            event: new shared_HistoryEvent({
                eventType: EventTypePtr(shared_EventType.WorkflowExecutionContinuedAsNew),
            }),
            expected: true,
            strictMode: false,
        },
        {
            decision: new shared_Decision({
                decisionType: DecisionTypePtr(shared_DecisionType.StartChildWorkflowExecution),
            }),
            event: new shared_HistoryEvent({
                eventType: EventTypePtr(-24 as shared_EventType),
            }),
            expected: false,
            strictMode: false,
        },
        {
            decision: new shared_Decision({
                decisionType: DecisionTypePtr(shared_DecisionType.StartChildWorkflowExecution),
                startChildWorkflowExecutionDecisionAttributes:
                    new shared_StartChildWorkflowExecutionDecisionAttributes({
                        taskList: new shared_TaskList({
                            name: StringPtr("some-tasklist-1"),
                        }),
                    }),
            }),
            event: new shared_HistoryEvent({
                eventType: EventTypePtr(shared_EventType.StartChildWorkflowExecutionInitiated),
                startChildWorkflowExecutionInitiatedEventAttributes:
                    new shared_StartChildWorkflowExecutionInitiatedEventAttributes({
                        taskList: new shared_TaskList({
                            name: StringPtr("some-tasklist-2"),
                        }),
                    }),
            }),
            expected: false,
            strictMode: true,
        },
        {
            decision: new shared_Decision({
                decisionType: DecisionTypePtr(-23 as shared_DecisionType),
            }),
            expected: false,
            strictMode: false,
        },
    ];

    for (const test of tests) {
        const decision = test.decision ?? new shared_Decision({});
        const event = test.event ?? new shared_HistoryEvent({});
        const ok = isDecisionMatchEvent(decision, event, test.strictMode);
        expect(ok).toEqual(test.expected);
    }
}

export function mockHistoryEvent(eventType: shared_EventType): shared_IHistoryEvent {
    const event = new shared_HistoryEvent({
        eventType,
    });

    switch (eventType) {
        case shared_EventType.ActivityTaskScheduled:
            event.activityTaskScheduledEventAttributes = new shared_ActivityTaskScheduledEventAttributes({
                activityId: StringPtr("mockActivityId"),
                activityType: new shared_ActivityType({
                    name: StringPtr("mockActivityType"),
                }),
                taskList: new shared_TaskList({
                    name: StringPtr("mockTaskList"),
                }),
                input: Buffer.from("mockInput"),
            });
            break;
        case shared_EventType.TimerCanceled:
            event.timerCanceledEventAttributes = new shared_TimerCanceledEventAttributes({
                timerId: StringPtr("mockTimerId"),
            });
            break;
    }

    return event;
}

export function mockDecision(decisionType: shared_DecisionType): shared_IDecision {
    const decision = new shared_Decision({
        decisionType,
    });

    switch (decisionType) {
        case shared_DecisionType.ScheduleActivityTask:
            decision.scheduleActivityTaskDecisionAttributes =
                new shared_ScheduleActivityTaskDecisionAttributes({
                    activityId: StringPtr('mockActivityId'),
                    activityType: new shared_ActivityType({
                        name: StringPtr('mockActivityType'),
                    }),
                    taskList: new shared_TaskList({
                        name: StringPtr('mockTaskList'),
                    }),
                    input: Buffer.from('mockInput'),
                });
            break;
        case shared_DecisionType.StartTimer:
            decision.startTimerDecisionAttributes =
                new shared_StartTimerDecisionAttributes({
                    timerId: StringPtr('mockTimerId'),
                    startToFireTimeoutSeconds: new Int64(60),
                });
            break;
    }

    return decision;
}
