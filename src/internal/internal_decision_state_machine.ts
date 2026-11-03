import { CancelTimerDecisionAttributes as shared_CancelTimerDecisionAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/CancelTimerDecisionAttributes.js';
import { WorkflowExecution as shared_WorkflowExecution } from '../generated/thrift/cadence-idl/com/uber/cadence/WorkflowExecution.js';
import { RequestCancelActivityTaskDecisionAttributes as shared_RequestCancelActivityTaskDecisionAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/RequestCancelActivityTaskDecisionAttributes.js';
import { StringPtr, BoolPtr } from './common/convert.js';
import { encodeArgs } from './internal_worker.js';
// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { internal_DataConverter } from './encoded.js';
import { internal_Version } from './workflow.js';
import { Element, List } from './runtime/container_list.js';
import { IDecision as shared_IDecision } from '../generated/thrift/cadence-idl/com/uber/cadence/Decision.js';
import { IHistoryEvent as shared_IHistoryEvent } from '../generated/thrift/cadence-idl/com/uber/cadence/HistoryEvent.js';
import { IRecordMarkerDecisionAttributes as shared_IRecordMarkerDecisionAttributes, RecordMarkerDecisionAttributes as shared_RecordMarkerDecisionAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/RecordMarkerDecisionAttributes.js';
import { IRequestCancelExternalWorkflowExecutionDecisionAttributes as shared_IRequestCancelExternalWorkflowExecutionDecisionAttributes, RequestCancelExternalWorkflowExecutionDecisionAttributes as shared_RequestCancelExternalWorkflowExecutionDecisionAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/RequestCancelExternalWorkflowExecutionDecisionAttributes.js';
import { IScheduleActivityTaskDecisionAttributes as shared_IScheduleActivityTaskDecisionAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/ScheduleActivityTaskDecisionAttributes.js';
import { ISearchAttributes as shared_ISearchAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/SearchAttributes.js';
import { ISignalExternalWorkflowExecutionDecisionAttributes as shared_ISignalExternalWorkflowExecutionDecisionAttributes, SignalExternalWorkflowExecutionDecisionAttributes as shared_SignalExternalWorkflowExecutionDecisionAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/SignalExternalWorkflowExecutionDecisionAttributes.js';
import { IStartChildWorkflowExecutionDecisionAttributes as shared_IStartChildWorkflowExecutionDecisionAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/StartChildWorkflowExecutionDecisionAttributes.js';
import { IStartTimerDecisionAttributes as shared_IStartTimerDecisionAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/StartTimerDecisionAttributes.js';
import { IUpsertWorkflowSearchAttributesDecisionAttributes as shared_IUpsertWorkflowSearchAttributesDecisionAttributes, UpsertWorkflowSearchAttributesDecisionAttributes as shared_UpsertWorkflowSearchAttributesDecisionAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/UpsertWorkflowSearchAttributesDecisionAttributes.js';
import { HistoryEventToString } from './common/util/stringer.js';
import { EventType } from '../generated/thrift/cadence-idl/com/uber/cadence/EventType.js';
import { createNewDecision } from './internal_task_handlers.js';
import { DecisionType } from '../generated/thrift/cadence-idl/com/uber/cadence/DecisionType.js';

export type decisionState = number;

export interface decisionStateMachine {
  getState(): decisionState;
  getID(): decisionID;
  isDone(): boolean;
  getDecision(): shared_IDecision | undefined;
  cancel(): void;
  handleStartedEvent(): void;
  handleCancelInitiatedEvent(): void;
  handleCanceledEvent(): void;
  handleCancelFailedEvent(): void;
  handleCompletionEvent(): void;
  handleInitiationFailedEvent(): void;
  handleInitiatedEvent(): void;
  handleDecisionSent(): void;
  setData(data: unknown): void;
  getData(): unknown;
}

export type decisionType = number;

export class decisionID {
  constructor(init?: Partial<decisionID>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  decisionType: decisionType = 0;

  id: string = "";

  String(): string {
      return `DecisionType: ${this.decisionType}, ID: ${this.id}`;
    }

}

export class decisionStateMachineBase {
  constructor(init?: Partial<decisionStateMachineBase>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  id: decisionID = new decisionID();

  state: decisionState = 0;

  history: string[] = [];

  data?: unknown;

  helper?: decisionsHelper;

  getState(): decisionState {
    return this.state;
  }

  getID(): decisionID {
    return this.id;
  }

  isDone(): boolean {
    return this.state === decisionStateCompleted || this.state === decisionStateCompletedAfterCancellationDecisionSent;
  }

  setData(data: unknown): void {
    this.data = data;
  }

  getData(): unknown {
    return this.data!;
  }

  moveState(newState: decisionState, event: string): void {
    this.history.push(event);
    this.state = newState;
    this.history.push(decisionState_String(newState));

    if (newState === decisionStateCompleted) {
      const elem = this.helper!.decisions.get(this.getID().String());
      if (elem !== undefined) {
        this.helper!.orderedDecisions!.Remove(elem);
        this.helper!.decisions.delete(this.getID().String());
      }
    }
  }

  failStateTransition(event: string): void {
    panicIllegalState(`invalid state transition: attempt to ${event}, ${this.String()}`);
  }

  handleDecisionSent(): void {
    switch (this.state) {
      case decisionStateCreated:
        this.moveState(decisionStateDecisionSent, eventDecisionSent);
        break;
    }
  }

  cancel(): void {
    switch (this.state) {
      case decisionStateCompleted:
      case decisionStateCompletedAfterCancellationDecisionSent:
        break;
      case decisionStateCreated:
        this.moveState(decisionStateCompleted, eventCancel);
        break;
      case decisionStateDecisionSent:
        this.moveState(decisionStateCanceledBeforeInitiated, eventCancel);
        break;
      case decisionStateInitiated:
        this.moveState(decisionStateCanceledAfterInitiated, eventCancel);
        break;
      default:
        this.failStateTransition(eventCancel);
        break;
    }
  }

  handleInitiatedEvent(): void {
    switch (this.state) {
      case decisionStateDecisionSent:
        this.moveState(decisionStateInitiated, eventInitiated);
        break;
      case decisionStateCanceledBeforeInitiated:
        this.moveState(decisionStateCanceledAfterInitiated, eventInitiated);
        break;
      default:
        this.failStateTransition(eventInitiated);
    }
  }

  handleInitiationFailedEvent(): void {
    switch (this.state) {
      case decisionStateInitiated:
      case decisionStateDecisionSent:
      case decisionStateCanceledBeforeInitiated:
        this.moveState(decisionStateCompleted, eventInitiationFailed);
        break;
      default:
        this.failStateTransition(eventInitiationFailed);
    }
  }

  handleStartedEvent(): void {
    this.history.push(eventStarted);
  }

  handleCompletionEvent(): void {
    switch (this.state) {
      case decisionStateCanceledAfterInitiated:
      case decisionStateInitiated:
        this.moveState(decisionStateCompleted, eventCompletion);
        break;
      case decisionStateCancellationDecisionSent:
        this.moveState(decisionStateCompletedAfterCancellationDecisionSent, eventCompletion);
        break;
      default:
        this.failStateTransition(eventCompletion);
    }
  }

  handleCancelInitiatedEvent(): void {
    this.history.push(eventCancelInitiated);
    if (this.state !== decisionStateCancellationDecisionSent) {
      this.failStateTransition(eventCancelInitiated);
    }
  }

  handleCancelFailedEvent(): void {
    switch (this.state) {
      case decisionStateCompletedAfterCancellationDecisionSent:
        this.moveState(decisionStateCompleted, eventCancelFailed);
        break;
      default:
        this.failStateTransition(eventCancelFailed);
    }
  }

  handleCanceledEvent(): void {
    switch (this.state) {
      case decisionStateCancellationDecisionSent:
        this.moveState(decisionStateCompleted, eventCanceled);
        break;
      default:
        this.failStateTransition(eventCanceled);
    }
  }

  String(): string {
    return `${this.id.String()}, state=${this.state}, isDone()=${this.isDone()}, history=[${this.history.join(" ")}]`;
  }

}

export class activityDecisionStateMachine extends decisionStateMachineBase implements decisionStateMachine {
  constructor(init?: Partial<activityDecisionStateMachine>) {
    super(init);
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  attributes?: shared_IScheduleActivityTaskDecisionAttributes;

  getDecision(): shared_IDecision | undefined {
    switch (this.state) {
      case decisionStateCreated: {
        const decision = createNewDecision(DecisionType.ScheduleActivityTask);
        decision.scheduleActivityTaskDecisionAttributes = this.attributes!;
        return decision;
      }
      case decisionStateCanceledAfterInitiated: {
        const decision = createNewDecision(DecisionType.RequestCancelActivityTask);
        decision.requestCancelActivityTaskDecisionAttributes =
          new shared_RequestCancelActivityTaskDecisionAttributes({
            activityId: this.attributes!.activityId!,
          });
        return decision;
      }
      default:
        return undefined;
    }
  }

  handleDecisionSent(): void {
    switch (this.state) {
      case decisionStateCanceledAfterInitiated:
        this.moveState(decisionStateCancellationDecisionSent, eventDecisionSent);
        break;
      default:
        super.handleDecisionSent();
        break;
    }
  }

  handleCancelFailedEvent(): void {
    switch (this.state) {
      case decisionStateCancellationDecisionSent:
        this.moveState(decisionStateInitiated, eventCancelFailed);
        break;
      default:
        super.handleCancelFailedEvent();
    }
  }

}

export class timerDecisionStateMachine extends decisionStateMachineBase implements decisionStateMachine {
  constructor(init?: Partial<timerDecisionStateMachine>) {
    super(init);
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  attributes?: shared_IStartTimerDecisionAttributes;

  canceled: boolean = false;

  cancel(): void {
    this.canceled = true;
    super.cancel();
  }

  isDone(): boolean {
    return this.state === decisionStateCompleted || this.canceled;
  }

  handleDecisionSent(): void {
    switch (this.state) {
      case decisionStateCanceledAfterInitiated:
        this.moveState(decisionStateCancellationDecisionSent, eventDecisionSent);
        break;
      default:
        super.handleDecisionSent();
    }
  }

  handleCancelFailedEvent(): void {
    switch (this.state) {
      case decisionStateCancellationDecisionSent:
        this.moveState(decisionStateInitiated, eventCancelFailed);
        break;
      default:
        super.handleCancelFailedEvent();
    }
  }

  getDecision(): shared_IDecision | undefined {
    switch (this.state) {
      case decisionStateCreated: {
        const decision = createNewDecision(DecisionType.StartTimer);
        decision.startTimerDecisionAttributes = this.attributes;
        return decision;
      }
      case decisionStateCanceledAfterInitiated: {
        const decision = createNewDecision(DecisionType.CancelTimer);
        decision.cancelTimerDecisionAttributes = new shared_CancelTimerDecisionAttributes({
          timerId: this.attributes!.timerId!
        });
        return decision;
      }
      default:
        return undefined;
    }
  }

}

export class childWorkflowDecisionStateMachine extends decisionStateMachineBase implements decisionStateMachine {
  constructor(init?: Partial<childWorkflowDecisionStateMachine>) {
    super(init);
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  attributes?: shared_IStartChildWorkflowExecutionDecisionAttributes;

  getDecision(): shared_IDecision | undefined {
    switch (this.state) {
      case decisionStateCreated: {
        const decision = createNewDecision(DecisionType.StartChildWorkflowExecution);
        decision.startChildWorkflowExecutionDecisionAttributes = this.attributes;
        return decision;
      }
      case decisionStateCanceledAfterStarted: {
        const decision = createNewDecision(DecisionType.RequestCancelExternalWorkflowExecution);
        decision.requestCancelExternalWorkflowExecutionDecisionAttributes =
          new shared_RequestCancelExternalWorkflowExecutionDecisionAttributes({
            domain: this.attributes!.domain!,
            workflowId: this.attributes!.workflowId!,
            childWorkflowOnly: BoolPtr(true),
          });
        return decision;
      }
      default:
        return undefined;
    }
  }

  handleDecisionSent(): void {
    switch (this.state) {
      case decisionStateCanceledAfterStarted:
        this.moveState(decisionStateCancellationDecisionSent, eventDecisionSent);
        break;
      default:
        super.handleDecisionSent();
    }
  }

  handleStartedEvent(): void {
    switch (this.state) {
      case decisionStateInitiated:
        this.moveState(decisionStateStarted, eventStarted);
        break;
      case decisionStateCanceledAfterInitiated:
        this.moveState(decisionStateCanceledAfterStarted, eventStarted);
        break;
      default:
        super.handleStartedEvent();
    }
  }

  handleCancelFailedEvent(): void {
    switch (this.state) {
      case decisionStateCancellationDecisionSent:
        this.moveState(decisionStateStarted, eventCancelFailed);
        break;
      default:
        super.handleCancelFailedEvent();
    }
  }

  cancel(): void {
    switch (this.state) {
      case decisionStateStarted:
        this.moveState(decisionStateCanceledAfterStarted, eventCancel);
        break;
      default:
        super.cancel();
    }
  }

  handleCanceledEvent(): void {
    switch (this.state) {
      case decisionStateStarted:
        this.moveState(decisionStateCompleted, eventCanceled);
        break;
      default:
        super.handleCanceledEvent();
    }
  }

  handleCompletionEvent(): void {
    switch (this.state) {
      case decisionStateStarted:
      case decisionStateCanceledAfterStarted:
        this.moveState(decisionStateCompleted, eventCompletion);
        break;
      default:
        super.handleCompletionEvent();
    }
  }

}

export class naiveDecisionStateMachine extends decisionStateMachineBase implements decisionStateMachine {
  constructor(init?: Partial<naiveDecisionStateMachine>) {
    super(init);
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  decision?: shared_IDecision;

  getDecision(): shared_IDecision | undefined {
    switch (this.state) {
      case decisionStateCreated:
        return this.decision!;
      default:
        return undefined;
    }
  }

  cancel(): void {
    throw "unsupported operation";
  }

  handleCompletionEvent(): void {
    throw "unsupported operation";
  }

  handleInitiatedEvent(): void {
    throw "unsupported operation";
  }

  handleInitiationFailedEvent(): void {
    throw "unsupported operation";
  }

  handleStartedEvent(): void {
    throw "unsupported operation";
  }

  handleCanceledEvent(): void {
    throw "unsupported operation";
  }

  handleCancelFailedEvent(): void {
    throw "unsupported operation";
  }

  handleCancelInitiatedEvent(): void {
    throw "unsupported operation";
  }

}

/**
 * only possible state transition is: CREATED->SENT->INITIATED->COMPLETED
 */
export class cancelExternalWorkflowDecisionStateMachine extends naiveDecisionStateMachine implements decisionStateMachine {
  constructor(init?: Partial<cancelExternalWorkflowDecisionStateMachine>) {
    super(init);
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  handleInitiatedEvent(): void {
    switch (this.state) {
      case decisionStateDecisionSent:
        this.moveState(decisionStateInitiated, eventInitiated);
        break;
      default:
        this.failStateTransition(eventInitiated);
    }
  }

  handleCompletionEvent(): void {
    switch (this.state) {
      case decisionStateInitiated:
        this.moveState(decisionStateCompleted, eventCompletion);
        break;
      default:
        this.failStateTransition(eventCompletion);
    }
  }

}

export class signalExternalWorkflowDecisionStateMachine extends naiveDecisionStateMachine implements decisionStateMachine {
  constructor(init?: Partial<signalExternalWorkflowDecisionStateMachine>) {
    super(init);
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  handleInitiatedEvent(): void {
    switch (this.state) {
      case decisionStateDecisionSent:
        this.moveState(decisionStateInitiated, eventInitiated);
        break;
      default:
        this.failStateTransition(eventInitiated);
    }
  }

  handleCompletionEvent(): void {
    switch (this.state) {
      case decisionStateInitiated:
        this.moveState(decisionStateCompleted, eventCompletion);
        break;
      default:
        this.failStateTransition(eventCompletion);
    }
  }

}

/**
 * only possible state transition is: CREATED->SENT->COMPLETED
 */
export class markerDecisionStateMachine extends naiveDecisionStateMachine implements decisionStateMachine {
  constructor(init?: Partial<markerDecisionStateMachine>) {
    super(init);
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  handleDecisionSent(): void {
    switch (this.state) {
      case decisionStateCreated:
        this.moveState(decisionStateCompleted, eventDecisionSent);
        break;
    }
  }

}

export class upsertSearchAttributesDecisionStateMachine extends naiveDecisionStateMachine implements decisionStateMachine {
  constructor(init?: Partial<upsertSearchAttributesDecisionStateMachine>) {
    super(init);
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  handleDecisionSent(): void {
    switch (this.state) {
      case decisionStateCreated:
        this.moveState(decisionStateCompleted, eventDecisionSent);
        break;
    }
  }

}

export class decisionsHelper {
  constructor(init?: Partial<decisionsHelper>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  orderedDecisions?: List;

  decisions: Map<string, Element> = new Map(); // Go keyed by decisionID VALUE; JS objects compare by reference — key with k.String(); this is a Map — use .get/.set/.delete, never [] indexing

  scheduledEventIDToActivityID: Record<number, string> = {};

  scheduledEventIDToCancellationID: Record<number, string> = {};

  scheduledEventIDToSignalID: Record<number, string> = {};

  newDecisionStateMachineBase(decisionType: decisionType, id: string): decisionStateMachineBase {
    return new decisionStateMachineBase({
      id: makeDecisionID(decisionType, id),
      state: decisionStateCreated,
      history: [decisionState_String(decisionStateCreated)],
      helper: this,
    });
  }

  newActivityDecisionStateMachine(attributes: shared_IScheduleActivityTaskDecisionAttributes): activityDecisionStateMachine {
    const base = this.newDecisionStateMachineBase(decisionTypeActivity, attributes.activityId ?? "");
    const result = Object.setPrototypeOf(base, activityDecisionStateMachine.prototype) as activityDecisionStateMachine;
    result.attributes = attributes;
    return result;
  }

  newTimerDecisionStateMachine(attributes: shared_IStartTimerDecisionAttributes): timerDecisionStateMachine {
    const base = this.newDecisionStateMachineBase(decisionTypeTimer, attributes.timerId ?? "");
    const result = Object.setPrototypeOf(base, timerDecisionStateMachine.prototype) as timerDecisionStateMachine;
    result.attributes = attributes;
    return result;
  }

  newChildWorkflowDecisionStateMachine(attributes: shared_IStartChildWorkflowExecutionDecisionAttributes): childWorkflowDecisionStateMachine {
    const base = this.newDecisionStateMachineBase(decisionTypeChildWorkflow, attributes.workflowId ?? "");
    const result = Object.setPrototypeOf(base, childWorkflowDecisionStateMachine.prototype) as childWorkflowDecisionStateMachine;
    result.attributes = attributes;
    return result;
  }

  newNaiveDecisionStateMachine(decisionType: decisionType, id: string, decision: shared_IDecision): naiveDecisionStateMachine {
    const base = this.newDecisionStateMachineBase(decisionType, id);
    const result = Object.setPrototypeOf(base, naiveDecisionStateMachine.prototype) as naiveDecisionStateMachine;
    result.decision = decision;
    return result;
  }

  newMarkerDecisionStateMachine(id: string, attributes: shared_IRecordMarkerDecisionAttributes): markerDecisionStateMachine {
    const d = createNewDecision(DecisionType.RecordMarker);
    d.recordMarkerDecisionAttributes = attributes;
    const result = Object.setPrototypeOf(
      this.newNaiveDecisionStateMachine(decisionTypeMarker, id, d),
      markerDecisionStateMachine.prototype,
    ) as markerDecisionStateMachine;
    return result;
  }

  newCancelExternalWorkflowStateMachine(attributes: shared_IRequestCancelExternalWorkflowExecutionDecisionAttributes, cancellationID: string): cancelExternalWorkflowDecisionStateMachine {
    const d = createNewDecision(DecisionType.RequestCancelExternalWorkflowExecution);
    d.requestCancelExternalWorkflowExecutionDecisionAttributes = attributes;
    const result = Object.setPrototypeOf(
      this.newNaiveDecisionStateMachine(decisionTypeCancellation, cancellationID, d),
      cancelExternalWorkflowDecisionStateMachine.prototype,
    ) as cancelExternalWorkflowDecisionStateMachine;
    return result;
  }

  newSignalExternalWorkflowStateMachine(attributes: shared_ISignalExternalWorkflowExecutionDecisionAttributes, signalID: string): signalExternalWorkflowDecisionStateMachine {
    const d = createNewDecision(DecisionType.SignalExternalWorkflowExecution);
    d.signalExternalWorkflowExecutionDecisionAttributes = attributes;
    return Object.setPrototypeOf(
      this.newNaiveDecisionStateMachine(decisionTypeSignal, signalID, d),
      signalExternalWorkflowDecisionStateMachine.prototype
    ) as signalExternalWorkflowDecisionStateMachine;
  }

  newUpsertSearchAttributesStateMachine(attributes: shared_IUpsertWorkflowSearchAttributesDecisionAttributes, upsertID: string): upsertSearchAttributesDecisionStateMachine {
    const d = createNewDecision(DecisionType.UpsertWorkflowSearchAttributes);
    d.upsertWorkflowSearchAttributesDecisionAttributes = attributes;
    const result = Object.setPrototypeOf(
      this.newNaiveDecisionStateMachine(decisionTypeUpsertSearchAttributes, upsertID, d),
      upsertSearchAttributesDecisionStateMachine.prototype
    ) as upsertSearchAttributesDecisionStateMachine;
    return result;
  }

  getDecision(id: decisionID): decisionStateMachine {
    const decision = this.decisions.get(id.String());
    if (decision === undefined) {
      const panicMsg = "unknown decision " + id.String() + ", possible causes are nondeterministic workflow definition code or incompatible change in the workflow definition";
      panicIllegalState(panicMsg);
    }
    this.orderedDecisions!.MoveToBack(decision!);
    return decision!.Value as decisionStateMachine;
  }

  addDecision(decision: decisionStateMachine): void {
    if (this.decisions.has(decision.getID().String())) {
      const panicMsg = `adding duplicate decision ${typeof (decision as { String?: () => string }).String === "function" ? (decision as { String?: () => string }).String!() : globalThis.String(decision)}`;
      panicIllegalState(panicMsg);
    }
    const element = this.orderedDecisions!.PushBack(decision);
    this.decisions.set(decision.getID().String(), element);
  }

  scheduleActivityTask(attributes: shared_IScheduleActivityTaskDecisionAttributes): decisionStateMachine {
    const decision = this.newActivityDecisionStateMachine(attributes);
    this.addDecision(decision);
    return decision;
  }

  requestCancelActivityTask(activityID: string): decisionStateMachine {
    const id = makeDecisionID(decisionTypeActivity, activityID);
    const decision = this.getDecision(id);
    decision.cancel();
    return decision;
  }

  handleActivityTaskClosed(activityID: string): decisionStateMachine {
    const decision = this.getDecision(makeDecisionID(decisionTypeActivity, activityID));
    decision.handleCompletionEvent();
    return decision;
  }

  handleActivityTaskScheduled(scheduledEventID: number, activityID: string): void {
    this.scheduledEventIDToActivityID[scheduledEventID] = activityID;
    const decision = this.getDecision(makeDecisionID(decisionTypeActivity, activityID));
    decision.handleInitiatedEvent();
  }

  handleActivityTaskCancelRequested(activityID: string): void {
    const decision = this.getDecision(makeDecisionID(decisionTypeActivity, activityID));
    decision.handleCancelInitiatedEvent();
  }

  handleActivityTaskCanceled(activityID: string): decisionStateMachine {
    const decision = this.getDecision(makeDecisionID(decisionTypeActivity, activityID));
    decision.handleCanceledEvent();
    return decision;
  }

  handleRequestCancelActivityTaskFailed(activityID: string): void {
    const decision = this.getDecision(makeDecisionID(decisionTypeActivity, activityID));
    decision.handleCancelFailedEvent();
  }

  getActivityID(event: shared_IHistoryEvent): string {
    const eventType = event.eventType ?? 0;
    let scheduledEventID = -1;

    switch (eventType) {
      case EventType.ActivityTaskCanceled:
        scheduledEventID = event.activityTaskCanceledEventAttributes?.scheduledEventId?.toNumber() ?? 0;
        break;
      case EventType.ActivityTaskCompleted:
        scheduledEventID = event.activityTaskCompletedEventAttributes?.scheduledEventId?.toNumber() ?? 0;
        break;
      case EventType.ActivityTaskFailed:
        scheduledEventID = event.activityTaskFailedEventAttributes?.scheduledEventId?.toNumber() ?? 0;
        break;
      case EventType.ActivityTaskTimedOut:
        scheduledEventID = event.activityTaskTimedOutEventAttributes?.scheduledEventId?.toNumber() ?? 0;
        break;
      default:
        panicIllegalState(`unexpected event type ${EventType[eventType]}`);
    }

    const activityID = this.scheduledEventIDToActivityID[scheduledEventID];
    if (!(scheduledEventID in this.scheduledEventIDToActivityID)) {
      panicIllegalState(`unable to find activity ID for the event ${HistoryEventToString(event)}`);
    }
    return activityID!;
  }

  recordVersionMarker(changeID: string, version: internal_Version, dataConverter: internal_DataConverter): decisionStateMachine {
    const markerID = `${versionMarkerName}_${changeID}`;
    const details = encodeArgs(dataConverter, [changeID, version]);
    const recordMarker = new shared_RecordMarkerDecisionAttributes({
      markerName: StringPtr(versionMarkerName),
      details,
    });
    const decision = this.newMarkerDecisionStateMachine(markerID, recordMarker);
    this.addDecision(decision);
    return decision;
  }

  recordSideEffectMarker(sideEffectID: number, data: Buffer): decisionStateMachine {
    const markerID = `${sideEffectMarkerName}_${sideEffectID}`;
    const attributes = new shared_RecordMarkerDecisionAttributes({
      markerName: StringPtr(sideEffectMarkerName),
      details: data,
    });
    const decision = this.newMarkerDecisionStateMachine(markerID, attributes);
    this.addDecision(decision);
    return decision;
  }

  recordLocalActivityMarker(activityID: string, result: Buffer): decisionStateMachine {
    const markerID = `${localActivityMarkerName}_${activityID}`;
    const attributes = new shared_RecordMarkerDecisionAttributes({
      markerName: StringPtr(localActivityMarkerName),
      details: result,
    });
    const decision = this.newMarkerDecisionStateMachine(markerID, attributes);
    this.addDecision(decision);
    return decision;
  }

  recordMutableSideEffectMarker(mutableSideEffectID: string, data: Buffer): decisionStateMachine {
    const markerID = `${mutableSideEffectMarkerName}_${mutableSideEffectID}`;
    const attributes = new shared_RecordMarkerDecisionAttributes({
      markerName: StringPtr(mutableSideEffectMarkerName),
      details: data
    });
    const decision = this.newMarkerDecisionStateMachine(markerID, attributes);
    this.addDecision(decision);
    return decision;
  }

  startChildWorkflowExecution(attributes: shared_IStartChildWorkflowExecutionDecisionAttributes): decisionStateMachine {
    const decision = this.newChildWorkflowDecisionStateMachine(attributes);
    this.addDecision(decision);
    return decision;
  }

  handleStartChildWorkflowExecutionInitiated(workflowID: string): void {
    const decision = this.getDecision(makeDecisionID(decisionTypeChildWorkflow, workflowID));
    decision.handleInitiatedEvent();
  }

  handleStartChildWorkflowExecutionFailed(workflowID: string): decisionStateMachine {
    const decision = this.getDecision(makeDecisionID(decisionTypeChildWorkflow, workflowID));
    decision.handleInitiationFailedEvent();
    return decision;
  }

  requestCancelExternalWorkflowExecution(domain: string, workflowID: string, runID: string, cancellationID: string, childWorkflowOnly: boolean): decisionStateMachine {
    if (childWorkflowOnly) {
      if (cancellationID.length !== 0) {
        throw "cancellation on child workflow should not use cancellation ID";
      }
      if (runID.length !== 0) {
        throw "cancellation on child workflow should not use run ID";
      }

      const decision = this.getDecision(makeDecisionID(decisionTypeChildWorkflow, workflowID));
      decision.cancel();
      return decision;
    }

    if (cancellationID.length === 0) {
      throw "cancellation on external workflow should use cancellation ID";
    }

    const attributes = new shared_RequestCancelExternalWorkflowExecutionDecisionAttributes({
      domain: StringPtr(domain),
      workflowId: StringPtr(workflowID),
      runId: StringPtr(runID),
      control: Buffer.from(cancellationID),
      childWorkflowOnly: BoolPtr(false)
    });
    const decision = this.newCancelExternalWorkflowStateMachine(attributes, cancellationID);
    this.addDecision(decision);

    return decision;
  }

  handleRequestCancelExternalWorkflowExecutionInitiated(initiatedeventID: number, workflowID: string, cancellationID: string): void {
    if (this.isCancelExternalWorkflowEventForChildWorkflow(cancellationID)) {
      const decision = this.getDecision(makeDecisionID(decisionTypeChildWorkflow, workflowID));
      decision.handleCancelInitiatedEvent();
    } else {
      this.scheduledEventIDToCancellationID[initiatedeventID] = cancellationID;
      const decision = this.getDecision(makeDecisionID(decisionTypeCancellation, cancellationID));
      decision.handleInitiatedEvent();
    }
  }

  handleExternalWorkflowExecutionCancelRequested(initiatedeventID: number, workflowID: string): [boolean, decisionStateMachine] {
    let decision!: decisionStateMachine;
    const isExternal = initiatedeventID in this.scheduledEventIDToCancellationID;

    if (!isExternal) {
      decision = this.getDecision(makeDecisionID(decisionTypeChildWorkflow, workflowID));
    } else {
      const cancellationID = this.scheduledEventIDToCancellationID[initiatedeventID]!;
      decision = this.getDecision(makeDecisionID(decisionTypeCancellation, cancellationID));
      decision.handleCompletionEvent();
    }

    return [isExternal, decision];
  }

  handleRequestCancelExternalWorkflowExecutionFailed(initiatedeventID: number, workflowID: string): [boolean, decisionStateMachine] {
    let decision!: decisionStateMachine;
    const cancellationID = this.scheduledEventIDToCancellationID[initiatedeventID]!;
    const isExternal = initiatedeventID in this.scheduledEventIDToCancellationID;

    if (!isExternal) {
      decision = this.getDecision(makeDecisionID(decisionTypeChildWorkflow, workflowID));
      decision.handleCancelFailedEvent();
    } else {
      decision = this.getDecision(makeDecisionID(decisionTypeCancellation, cancellationID));
      decision.handleCompletionEvent();
    }

    return [isExternal, decision];
  }

  signalExternalWorkflowExecution(domain: string, workflowID: string, runID: string, signalName: string, input: Buffer, signalID: string, childWorkflowOnly: boolean): decisionStateMachine {
    const attributes = new shared_SignalExternalWorkflowExecutionDecisionAttributes({
      domain: StringPtr(domain),
      execution: new shared_WorkflowExecution({
        workflowId: StringPtr(workflowID),
        runId: StringPtr(runID),
      }),
      signalName: StringPtr(signalName),
      input,
      control: Buffer.from(signalID),
      childWorkflowOnly: BoolPtr(childWorkflowOnly),
    });
    const decision = this.newSignalExternalWorkflowStateMachine(attributes, signalID);
    this.addDecision(decision);
    return decision;
  }

  upsertSearchAttributes(upsertID: string, searchAttr: shared_ISearchAttributes): decisionStateMachine {
    const attributes = new shared_UpsertWorkflowSearchAttributesDecisionAttributes({
      searchAttributes: searchAttr,
    });
    const decision = this.newUpsertSearchAttributesStateMachine(attributes, upsertID);
    this.addDecision(decision);
    return decision;
  }

  handleSignalExternalWorkflowExecutionInitiated(initiatedEventID: number, signalID: string): void {
    this.scheduledEventIDToSignalID[initiatedEventID]! = signalID;
    const decision = this.getDecision(makeDecisionID(decisionTypeSignal, signalID));
    decision.handleInitiatedEvent();
  }

  handleSignalExternalWorkflowExecutionCompleted(initiatedEventID: number): decisionStateMachine {
    const decision = this.getDecision(makeDecisionID(decisionTypeSignal, this.getSignalID(initiatedEventID)));
    decision.handleCompletionEvent();
    return decision;
  }

  handleSignalExternalWorkflowExecutionFailed(initiatedEventID: number): decisionStateMachine {
    const decision = this.getDecision(makeDecisionID(decisionTypeSignal, this.getSignalID(initiatedEventID)));
    decision.handleCompletionEvent();
    return decision;
  }

  getSignalID(initiatedEventID: number): string {
    const signalID = this.scheduledEventIDToSignalID[initiatedEventID]!;
    const ok = initiatedEventID in this.scheduledEventIDToSignalID;
    if (!ok) {
      throw `unable to find signal ID: ${initiatedEventID}`;
    }
    return signalID;
  }

  startTimer(attributes: shared_IStartTimerDecisionAttributes): decisionStateMachine {
    const decision = this.newTimerDecisionStateMachine(attributes);
    this.addDecision(decision);
    return decision;
  }

  cancelTimer(timerID: string): decisionStateMachine {
    const decision = this.getDecision(makeDecisionID(decisionTypeTimer, timerID));
    decision.cancel();
    return decision;
  }

  handleTimerClosed(timerID: string): decisionStateMachine {
    const decision = this.getDecision(makeDecisionID(decisionTypeTimer, timerID));
    decision.handleCompletionEvent();
    return decision;
  }

  handleTimerStarted(timerID: string): void {
    const decision = this.getDecision(makeDecisionID(decisionTypeTimer, timerID));
    decision.handleInitiatedEvent();
  }

  handleTimerCanceled(timerID: string): void {
    const decision = this.getDecision(makeDecisionID(decisionTypeTimer, timerID));
    decision.handleCanceledEvent();
  }

  handleCancelTimerFailed(timerID: string): void {
    const decision = this.getDecision(makeDecisionID(decisionTypeTimer, timerID));
    decision.handleCancelFailedEvent();
  }

  handleChildWorkflowExecutionStarted(workflowID: string): decisionStateMachine {
    const decision = this.getDecision(makeDecisionID(decisionTypeChildWorkflow, workflowID));
    decision.handleStartedEvent();
    return decision;
  }

  handleChildWorkflowExecutionClosed(workflowID: string): decisionStateMachine {
    const decision = this.getDecision(makeDecisionID(decisionTypeChildWorkflow, workflowID));
    decision.handleCompletionEvent();
    return decision;
  }

  handleChildWorkflowExecutionCanceled(workflowID: string): decisionStateMachine {
    const decision = this.getDecision(makeDecisionID(decisionTypeChildWorkflow, workflowID));
    decision.handleCanceledEvent();
    return decision;
  }

  getDecisions(markAsSent: boolean): shared_IDecision[] {
    const result: shared_IDecision[] = [];
    for (let curr = this.orderedDecisions!.Front(); curr != null;) {
      const next = curr.Next();
      const d = curr.Value as decisionStateMachine;
      const decision = d.getDecision();
      if (decision != null) {
        result.push(decision);
      }

      if (markAsSent) {
        d.handleDecisionSent();
      }

      if (d.getState() === decisionStateCompleted) {
        this.orderedDecisions!.Remove(curr);
        this.decisions.delete(d.getID().String());
      }

      curr = next;
    }

    return result;
  }

  isCancelExternalWorkflowEventForChildWorkflow(cancellationID: string): boolean {
    return cancellationID.length === 0;
  }

}

/**
 * panic when decision state machine is in illegal state
 */
export class stateMachineIllegalStatePanic {
  constructor(init?: Partial<stateMachineIllegalStatePanic>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  message: string = "";

  String(): string {
    return this.message;
  }

}

export function makeDecisionID(decisionType: decisionType, id: string): decisionID {
  return new decisionID({ decisionType, id });
}

export function panicIllegalState(message: string): void {
  throw new stateMachineIllegalStatePanic({ message });
}

export function newDecisionsHelper(): decisionsHelper {
  return new decisionsHelper({
    orderedDecisions: new List(),
    decisions: new Map<string, Element>(),
    scheduledEventIDToActivityID: {},
    scheduledEventIDToCancellationID: {},
    scheduledEventIDToSignalID: {},
  });
}

export function decisionState_String(d: decisionState): string {
  switch (d) {
    case decisionStateCreated:
      return "Created";
    case decisionStateDecisionSent:
      return "DecisionSent";
    case decisionStateCanceledBeforeInitiated:
      return "CanceledBeforeInitiated";
    case decisionStateInitiated:
      return "Initiated";
    case decisionStateStarted:
      return "Started";
    case decisionStateCanceledAfterInitiated:
      return "CanceledAfterInitiated";
    case decisionStateCanceledAfterStarted:
      return "CanceledAfterStarted";
    case decisionStateCancellationDecisionSent:
      return "CancellationDecisionSent";
    case decisionStateCompletedAfterCancellationDecisionSent:
      return "CompletedAfterCancellationDecisionSent";
    case decisionStateCompleted:
      return "Completed";
    default:
      return "Unknown";
  }
}

export function decisionType_String(d: decisionType): string {
  switch (d) {
    case decisionTypeActivity:
      return "Activity";
    case decisionTypeChildWorkflow:
      return "ChildWorkflow";
    case decisionTypeCancellation:
      return "Cancellation";
    case decisionTypeMarker:
      return "Marker";
    case decisionTypeTimer:
      return "Timer";
    case decisionTypeSignal:
      return "Signal";
    default:
      return "Unknown";
  }
}

export const decisionStateCanceledAfterInitiated = 5;

export const decisionStateCanceledAfterStarted = 6;

export const decisionStateCanceledBeforeInitiated = 2;

export const decisionStateCancellationDecisionSent = 7;

export const decisionStateCompleted = 9;

export const decisionStateCompletedAfterCancellationDecisionSent = 8;

export const decisionStateCreated = 0;

export const decisionStateDecisionSent = 1;

export const decisionStateInitiated = 3;

export const decisionStateStarted = 4;

export const decisionTypeActivity = 0;

export const decisionTypeCancellation = 2;

export const decisionTypeChildWorkflow = 1;

export const decisionTypeMarker = 3;

export const decisionTypeSignal = 5;

export const decisionTypeTimer = 4;

export const decisionTypeUpsertSearchAttributes = 6;

export const eventCancel = "cancel";

export const eventCancelFailed = "handleCancelFailedEvent";

export const eventCancelInitiated = "handleCancelInitiatedEvent";

export const eventCanceled = "handleCanceledEvent";

export const eventCompletion = "handleCompletionEvent";

export const eventDecisionSent = "handleDecisionSent";

export const eventInitiated = "handleInitiatedEvent";

export const eventInitiationFailed = "handleInitiationFailedEvent";

export const eventStarted = "handleStartedEvent";

export const localActivityMarkerName = "LocalActivity";

export const mutableSideEffectMarkerName = "MutableSideEffect";

export const sideEffectMarkerName = "SideEffect";

export const versionMarkerName = "Version";
