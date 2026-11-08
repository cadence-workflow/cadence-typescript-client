// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { expect } from 'vitest';
import { DecisionToString, HistoryEventToString, valueToString, anyToString, getHistoryEventData, decisionGetData } from './stringer.js';
import { ActivityType } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ActivityType.js';
import { Decision } from '../../../generated/thrift/cadence-idl/com/uber/cadence/Decision.js';
import { DecisionType } from '../../../generated/thrift/cadence-idl/com/uber/cadence/DecisionType.js';
import { ScheduleActivityTaskDecisionAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ScheduleActivityTaskDecisionAttributes.js';
import { EventType } from '../../../generated/thrift/cadence-idl/com/uber/cadence/EventType.js';
import { HistoryEvent } from '../../../generated/thrift/cadence-idl/com/uber/cadence/HistoryEvent.js';
import { TaskList } from '../../../generated/thrift/cadence-idl/com/uber/cadence/TaskList.js';
import { WorkflowExecutionStartedEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/WorkflowExecutionStartedEventAttributes.js';
import { WorkflowType } from '../../../generated/thrift/cadence-idl/com/uber/cadence/WorkflowType.js';
import { ActivityTaskCancelRequestedEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ActivityTaskCancelRequestedEventAttributes.js';
import { ActivityTaskCanceledEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ActivityTaskCanceledEventAttributes.js';
import { ActivityTaskCompletedEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ActivityTaskCompletedEventAttributes.js';
import { ActivityTaskFailedEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ActivityTaskFailedEventAttributes.js';
import { ActivityTaskScheduledEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ActivityTaskScheduledEventAttributes.js';
import { ActivityTaskStartedEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ActivityTaskStartedEventAttributes.js';
import { ActivityTaskTimedOutEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ActivityTaskTimedOutEventAttributes.js';
import { CancelTimerFailedEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/CancelTimerFailedEventAttributes.js';
import { DecisionTaskCompletedEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/DecisionTaskCompletedEventAttributes.js';
import { DecisionTaskScheduledEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/DecisionTaskScheduledEventAttributes.js';
import { DecisionTaskStartedEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/DecisionTaskStartedEventAttributes.js';
import { DecisionTaskTimedOutEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/DecisionTaskTimedOutEventAttributes.js';
import { MarkerRecordedEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/MarkerRecordedEventAttributes.js';
import { RequestCancelActivityTaskFailedEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/RequestCancelActivityTaskFailedEventAttributes.js';
import { TimerCanceledEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/TimerCanceledEventAttributes.js';
import { TimerFiredEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/TimerFiredEventAttributes.js';
import { TimerStartedEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/TimerStartedEventAttributes.js';
import { WorkflowExecutionCompletedEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/WorkflowExecutionCompletedEventAttributes.js';
import { WorkflowExecutionFailedEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/WorkflowExecutionFailedEventAttributes.js';
import { WorkflowExecutionTerminatedEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/WorkflowExecutionTerminatedEventAttributes.js';
import { WorkflowExecutionTimedOutEventAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/WorkflowExecutionTimedOutEventAttributes.js';
import { CancelTimerDecisionAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/CancelTimerDecisionAttributes.js';
import { CompleteWorkflowExecutionDecisionAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/CompleteWorkflowExecutionDecisionAttributes.js';
import { FailWorkflowExecutionDecisionAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/FailWorkflowExecutionDecisionAttributes.js';
import { RecordMarkerDecisionAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/RecordMarkerDecisionAttributes.js';
import { RequestCancelActivityTaskDecisionAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/RequestCancelActivityTaskDecisionAttributes.js';
import { StartTimerDecisionAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/StartTimerDecisionAttributes.js';

export function Test_anyToString(): void {
  const testCases: { name: string; thingToSerialize: unknown; expected: string }[] = [
    {
      name: "nil",
      thingToSerialize: undefined,
      expected: "<nil>",
    },
    {
      name: "int",
      thingToSerialize: 1,
      expected: "1",
    },
    {
      name: "string",
      thingToSerialize: "test",
      expected: "test",
    },
    {
      name: "struct",
      thingToSerialize: { A: "test", B: 1, C: true },
      expected: "(A:test, B:1, C:true)",
    },
    {
      name: "pointer",
      thingToSerialize: { A: "test", B: 1, C: true },
      expected: "(A:test, B:1, C:true)",
    },
    {
      name: "slice",
      thingToSerialize: [1, 2, 3],
      expected: "[1 2 3]",
    },
    {
      name: "struct with slice",
      thingToSerialize: { A: [1, 2, 3] },
      expected: "(A:[len=3])",
    },
    {
      name: "struct with blob",
      thingToSerialize: { A: Buffer.from("blob-data") },
      expected: "(A:[blob-data])",
    },
    {
      name: "struct with struct",
      thingToSerialize: { A: { B: 1 } },
      expected: "(A:(B:1))",
    },
    {
      name: "struct with pointer",
      thingToSerialize: { A: 0 },
      expected: "(A:0)",
    },
  ];

  for (const tc of testCases) {
    const actual = anyToString(tc.thingToSerialize);
    expect(actual).toEqual(tc.expected);
  }
}

export function Test_byteSliceToString(): void {
  const data = Buffer.from("blob-data");
  const strVal = valueToString(data);

  expect(strVal).toEqual("[blob-data]");

  const intBlob = [1, 2, 3];
  const strVal2 = valueToString(intBlob);

  expect(strVal2).toEqual("[len=3]");
}

export function TestHistoryEventToString(): void {
    const event = new HistoryEvent({
        eventType: toPtr(EventType.WorkflowExecutionStarted),
        workflowExecutionStartedEventAttributes: new WorkflowExecutionStartedEventAttributes({
            workflowType: new WorkflowType({
                name: toPtr("test-workflow"),
            }),
            taskList: new TaskList({
                name: toPtr("task-list"),
            }),
            executionStartToCloseTimeoutSeconds: toPtr(60),
        }),
    });

    const strVal = HistoryEventToString(event);

    // @go-weakened: Go reflection rendering and unset zero-valued fields
    expect(strVal).toContain("WorkflowExecutionStarted");
    expect(strVal).toContain("test-workflow");
    expect(strVal).toContain("task-list");
    expect(strVal).toContain("60");
}

/**
 * This just tests that we pick the right attributes to return
 * the other attributes will be nil
 */
export function Test_getHistoryEventData(): void {
    const cases: { event: HistoryEvent; expected: unknown }[] = [
        {
            event: new HistoryEvent({
                eventType: toPtr(EventType.WorkflowExecutionStarted),
                workflowExecutionStartedEventAttributes: new WorkflowExecutionStartedEventAttributes({}),
            }),
            expected: new WorkflowExecutionStartedEventAttributes({}),
        },
        {
            event: new HistoryEvent({
                eventType: toPtr(EventType.WorkflowExecutionCompleted),
                workflowExecutionCompletedEventAttributes: new WorkflowExecutionCompletedEventAttributes({}),
            }),
            expected: new WorkflowExecutionCompletedEventAttributes({}),
        },
        {
            event: new HistoryEvent({
                eventType: toPtr(EventType.WorkflowExecutionFailed),
                workflowExecutionFailedEventAttributes: new WorkflowExecutionFailedEventAttributes({}),
            }),
            expected: new WorkflowExecutionFailedEventAttributes({}),
        },
        {
            event: new HistoryEvent({
                eventType: toPtr(EventType.WorkflowExecutionTimedOut),
                workflowExecutionTimedOutEventAttributes: new WorkflowExecutionTimedOutEventAttributes({}),
            }),
            expected: new WorkflowExecutionTimedOutEventAttributes({}),
        },
        {
            event: new HistoryEvent({
                eventType: toPtr(EventType.DecisionTaskScheduled),
                decisionTaskScheduledEventAttributes: new DecisionTaskScheduledEventAttributes({}),
            }),
            expected: new DecisionTaskScheduledEventAttributes({}),
        },
        {
            event: new HistoryEvent({
                eventType: toPtr(EventType.DecisionTaskStarted),
                decisionTaskStartedEventAttributes: new DecisionTaskStartedEventAttributes({}),
            }),
            expected: new DecisionTaskStartedEventAttributes({}),
        },
        {
            event: new HistoryEvent({
                eventType: toPtr(EventType.DecisionTaskCompleted),
                decisionTaskCompletedEventAttributes: new DecisionTaskCompletedEventAttributes({}),
            }),
            expected: new DecisionTaskCompletedEventAttributes({}),
        },
        {
            event: new HistoryEvent({
                eventType: toPtr(EventType.DecisionTaskTimedOut),
                decisionTaskTimedOutEventAttributes: new DecisionTaskTimedOutEventAttributes({}),
            }),
            expected: new DecisionTaskTimedOutEventAttributes({}),
        },
        {
            event: new HistoryEvent({
                eventType: toPtr(EventType.ActivityTaskScheduled),
                activityTaskScheduledEventAttributes: new ActivityTaskScheduledEventAttributes({}),
            }),
            expected: new ActivityTaskScheduledEventAttributes({}),
        },
        {
            event: new HistoryEvent({
                eventType: toPtr(EventType.ActivityTaskStarted),
                activityTaskStartedEventAttributes: new ActivityTaskStartedEventAttributes({}),
            }),
            expected: new ActivityTaskStartedEventAttributes({}),
        },
        {
            event: new HistoryEvent({
                eventType: toPtr(EventType.ActivityTaskCompleted),
                activityTaskCompletedEventAttributes: new ActivityTaskCompletedEventAttributes({}),
            }),
            expected: new ActivityTaskCompletedEventAttributes({}),
        },
        {
            event: new HistoryEvent({
                eventType: toPtr(EventType.ActivityTaskFailed),
                activityTaskFailedEventAttributes: new ActivityTaskFailedEventAttributes({}),
            }),
            expected: new ActivityTaskFailedEventAttributes({}),
        },
        {
            event: new HistoryEvent({
                eventType: toPtr(EventType.ActivityTaskTimedOut),
                activityTaskTimedOutEventAttributes: new ActivityTaskTimedOutEventAttributes({}),
            }),
            expected: new ActivityTaskTimedOutEventAttributes({}),
        },
        {
            event: new HistoryEvent({
                eventType: toPtr(EventType.ActivityTaskCancelRequested),
                activityTaskCancelRequestedEventAttributes: new ActivityTaskCancelRequestedEventAttributes({}),
            }),
            expected: new ActivityTaskCancelRequestedEventAttributes({}),
        },
        {
            event: new HistoryEvent({
                eventType: toPtr(EventType.RequestCancelActivityTaskFailed),
                requestCancelActivityTaskFailedEventAttributes: new RequestCancelActivityTaskFailedEventAttributes({}),
            }),
            expected: new RequestCancelActivityTaskFailedEventAttributes({}),
        },
        {
            event: new HistoryEvent({
                eventType: toPtr(EventType.ActivityTaskCanceled),
                activityTaskCanceledEventAttributes: new ActivityTaskCanceledEventAttributes({}),
            }),
            expected: new ActivityTaskCanceledEventAttributes({}),
        },
        {
            event: new HistoryEvent({
                eventType: toPtr(EventType.TimerStarted),
                timerStartedEventAttributes: new TimerStartedEventAttributes({}),
            }),
            expected: new TimerStartedEventAttributes({}),
        },
        {
            event: new HistoryEvent({
                eventType: toPtr(EventType.TimerFired),
                timerFiredEventAttributes: new TimerFiredEventAttributes({}),
            }),
            expected: new TimerFiredEventAttributes({}),
        },
        {
            event: new HistoryEvent({
                eventType: toPtr(EventType.CancelTimerFailed),
                cancelTimerFailedEventAttributes: new CancelTimerFailedEventAttributes({}),
            }),
            expected: new CancelTimerFailedEventAttributes({}),
        },
        {
            event: new HistoryEvent({
                eventType: toPtr(EventType.TimerCanceled),
                timerCanceledEventAttributes: new TimerCanceledEventAttributes({}),
            }),
            expected: new TimerCanceledEventAttributes({}),
        },
        {
            event: new HistoryEvent({
                eventType: toPtr(EventType.MarkerRecorded),
                markerRecordedEventAttributes: new MarkerRecordedEventAttributes({}),
            }),
            expected: new MarkerRecordedEventAttributes({}),
        },
        {
            event: new HistoryEvent({
                eventType: toPtr(EventType.WorkflowExecutionTerminated),
                workflowExecutionTerminatedEventAttributes: new WorkflowExecutionTerminatedEventAttributes({}),
            }),
            expected: new WorkflowExecutionTerminatedEventAttributes({}),
        },
        {
            event: new HistoryEvent({
                eventType: toPtr(123456789 as EventType),
            }),
            expected: new HistoryEvent({
                eventType: toPtr(123456789 as EventType),
            }),
        },
    ];

    for (const tc of cases) {
        expect(getHistoryEventData(tc.event)).toEqual(tc.expected);
    }
}

export function TestDecisionToString(): void {
    const decision = new Decision({
        decisionType: toPtr(DecisionType.ScheduleActivityTask),
        scheduleActivityTaskDecisionAttributes: new ScheduleActivityTaskDecisionAttributes({
            activityId: toPtr("activity-id"),
            activityType: new ActivityType({
                name: toPtr("activity-type"),
            }),
        }),
    });

    const strVal = DecisionToString(decision);
    // @go-weakened: omitted unset Input field from Go reflection rendering
    expect(strVal).toContain("ScheduleActivityTask");
    expect(strVal).toContain("activity-id");
    expect(strVal).toContain("activity-type");
}

/**
 * This just tests that we pick the right attributes to return
 * the other attributes will be nil
 */
export function Test_decisionGetData(): void {
    const cases: { decision: Decision; expected: unknown }[] = [
        {
            decision: new Decision({
                decisionType: toPtr(DecisionType.ScheduleActivityTask),
                scheduleActivityTaskDecisionAttributes: new ScheduleActivityTaskDecisionAttributes({})
            }),
            expected: new ScheduleActivityTaskDecisionAttributes({})
        },
        {
            decision: new Decision({
                decisionType: toPtr(DecisionType.RequestCancelActivityTask),
                requestCancelActivityTaskDecisionAttributes: new RequestCancelActivityTaskDecisionAttributes({})
            }),
            expected: new RequestCancelActivityTaskDecisionAttributes({})
        },
        {
            decision: new Decision({
                decisionType: toPtr(DecisionType.StartTimer),
                startTimerDecisionAttributes: new StartTimerDecisionAttributes({})
            }),
            expected: new StartTimerDecisionAttributes({})
        },
        {
            decision: new Decision({
                decisionType: toPtr(DecisionType.CancelTimer),
                cancelTimerDecisionAttributes: new CancelTimerDecisionAttributes({})
            }),
            expected: new CancelTimerDecisionAttributes({})
        },
        {
            decision: new Decision({
                decisionType: toPtr(DecisionType.CompleteWorkflowExecution),
                completeWorkflowExecutionDecisionAttributes: new CompleteWorkflowExecutionDecisionAttributes({})
            }),
            expected: new CompleteWorkflowExecutionDecisionAttributes({})
        },
        {
            decision: new Decision({
                decisionType: toPtr(DecisionType.FailWorkflowExecution),
                failWorkflowExecutionDecisionAttributes: new FailWorkflowExecutionDecisionAttributes({})
            }),
            expected: new FailWorkflowExecutionDecisionAttributes({})
        },
        {
            decision: new Decision({
                decisionType: toPtr(DecisionType.RecordMarker),
                recordMarkerDecisionAttributes: new RecordMarkerDecisionAttributes({})
            }),
            expected: new RecordMarkerDecisionAttributes({})
        },
        {
            decision: new Decision({
                decisionType: toPtr(123456789 as DecisionType)
            }),
            expected: new Decision({
                decisionType: toPtr(123456789 as DecisionType)
            })
        }
    ];

    for (const tc of cases) {
        expect(decisionGetData(tc.decision)).toEqual(tc.expected);
    }
}

export function toPtr<v>(x: v): v {
  return x;
}
