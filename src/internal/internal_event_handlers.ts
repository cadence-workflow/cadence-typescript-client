import { StartTimerDecisionAttributes as shared_StartTimerDecisionAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/StartTimerDecisionAttributes.js';
import { Int64 } from '@creditkarma/thrift-server-core';
import { ScheduleActivityTaskDecisionAttributes as shared_ScheduleActivityTaskDecisionAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/ScheduleActivityTaskDecisionAttributes.js';
import { TaskList as shared_TaskList } from '../generated/thrift/cadence-idl/com/uber/cadence/TaskList.js';
import { StartChildWorkflowExecutionDecisionAttributes as shared_StartChildWorkflowExecutionDecisionAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/StartChildWorkflowExecutionDecisionAttributes.js';
import { WrapScope } from './common/metrics/scope.js';
import { tagScope, encodeArgs } from './internal_worker.js';
import { DecisionTaskPanicCounter } from './common/metrics/constants.js';
import { newWorkflowPanicError, NewCanceledError, NewTimeoutError, newTerminatedError, newUnknownExternalWorkflowExecutionError } from './error.js';
import { EventType } from '../generated/thrift/cadence-idl/com/uber/cadence/EventType.js';
import { newEncodedValues } from './workflow_testsuite.js';
import { TimeoutType } from '../generated/thrift/cadence-idl/com/uber/cadence/TimeoutType.js';
import { lastPartOfName } from './workflow_replayer_utils.js';
import { ErrCanceled } from './context.js';
import { SignalExternalWorkflowExecutionFailedCause } from '../generated/thrift/cadence-idl/com/uber/cadence/SignalExternalWorkflowExecutionFailedCause.js';
// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { Mutex } from 'async-mutex';
import { internal_RetryPolicy, internal_ParentClosePolicy_toThriftPtr, internal_WorkflowIDReusePolicy_toThriftPtr, QueryTypeOpenSessions, QueryTypeQueryTypes, QueryTypeStackTrace } from './client.js';
import { internal_DataConverter, internal_Value } from './encoded.js';
import { internal_ContextPropagator } from './headers.js';
import { internal_WorkflowInterceptorFactory } from './interceptors.js';
import { activityInfo, asyncActivityClient, executeActivityParams, executeLocalActivityParams, localActivityClient, localActivityInfo } from './internal_activity.js';
import { decisionsHelper, newDecisionsHelper, panicIllegalState, localActivityMarkerName, mutableSideEffectMarkerName, sideEffectMarkerName, versionMarkerName } from './internal_decision_state_machine.js';
import { workflowExecutionContextImpl, workflowExecutionEventHandler, workflowTask, traceLog } from './internal_task_handlers.js';
import { localActivityResult } from './internal_task_pollers.js';
import { timerInfo, workflowTimerClient } from './internal_time.js';
import { internal_FeatureFlags, workflowTypePtr, activityTypePtr, estimateHistorySize, constructError, getErrorDetails } from './internal_utils.js';
import { laResultHandler, resultHandler, workflowDefinition, workflowEnvironment, localActivityResultWrapper } from './internal_worker_base.js';
import { executeWorkflowParams, getStackTraceRaw } from './internal_workflow.js';
import { registry } from './registry.js';
import { internal_SessionInfo } from './session.js';
import { WorkflowInfo, internal_GetVersionOption, internal_Version, internal_WorkflowExecution, newEncodedValue, errSearchAttributesNotSet, CadenceChangeVersion, getVersionConfig } from './workflow.js';
import { Channel } from './runtime/channel.js';
import type { Scope } from './runtime/tally.js';
import { Ref } from './runtime/ref.js';
import type { GoZapCore } from './runtime/logging.js';
import { CoreFromLogger, LoggerFromCore } from './runtime/logging.js';
import { IActivityType as shared_IActivityType } from '../generated/thrift/cadence-idl/com/uber/cadence/ActivityType.js';
import { IHeader as shared_IHeader } from '../generated/thrift/cadence-idl/com/uber/cadence/Header.js';
import { IHistoryEvent as shared_IHistoryEvent, HistoryEvent as shared_HistoryEvent } from '../generated/thrift/cadence-idl/com/uber/cadence/HistoryEvent.js';
import { IMarkerRecordedEventAttributes as shared_IMarkerRecordedEventAttributes, MarkerRecordedEventAttributes as shared_MarkerRecordedEventAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/MarkerRecordedEventAttributes.js';
import { ISearchAttributes as shared_ISearchAttributes, SearchAttributes as shared_SearchAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/SearchAttributes.js';
import { IWorkflowExecution as shared_IWorkflowExecution } from '../generated/thrift/cadence-idl/com/uber/cadence/WorkflowExecution.js';
import { IWorkflowExecutionSignaledEventAttributes as shared_IWorkflowExecutionSignaledEventAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/WorkflowExecutionSignaledEventAttributes.js';
import { IWorkflowExecutionStartedEventAttributes as shared_IWorkflowExecutionStartedEventAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/WorkflowExecutionStartedEventAttributes.js';
import { IWorkflowType as shared_IWorkflowType } from '../generated/thrift/cadence-idl/com/uber/cadence/WorkflowType.js';
import { StringPtr, Int32Ptr, Int64Ceil, EventTypePtr, TaskListPtr } from './common/convert.js';
import { tagChildWorkflowID, tagWorkflowType, tagActivityID, tagActivityType, tagRunID, tagWorkflowID, tagQueryType, tagEventID, tagEventType, tagPanicError, tagPanicStack, tagTimerID, tagSideEffectID } from './internal_logging_tags.js';
import { getWorkflowMemo, serializeSearchAttributes } from './internal_workflow_client.js';
import { WorkflowExecutionAlreadyStartedError as shared_WorkflowExecutionAlreadyStartedError } from '../errors/idl_errors.js';
import { Logger } from 'winston';

/**
 * completionHandler Handler to indicate completion result
 */
export type completionHandler = (p0: Buffer, p1: Error | null) => void | Promise<void>;

export interface localActivityMarkerData {
  ActivityID: string;
  ActivityType: string;
  ErrReason: string;
  ErrJSON: string;
  ResultJSON: string;
  ReplayTime: number;
  Attempt: number;
  Backoff: number;
}

export interface locallyDispatchedActivityTask {
  readyCh?: Channel<boolean>;
  TaskToken?: Buffer;
  WorkflowExecution?: shared_IWorkflowExecution;
  ActivityID?: string;
  ActivityType?: shared_IActivityType;
  Input?: Buffer;
  ScheduledTimestamp?: number;
  ScheduleToCloseTimeoutSeconds?: number;
  StartedTimestamp?: number;
  StartToCloseTimeoutSeconds?: number;
  HeartbeatTimeoutSeconds?: number;
  ScheduledTimestampOfThisAttempt?: number;
  WorkflowType?: shared_IWorkflowType;
  WorkflowDomain?: string;
  Header?: shared_IHeader;
}

/**
 * workflowEnvironmentImpl an implementation of workflowEnvironment represents a environment for workflow execution.
 */
export class workflowEnvironmentImpl implements asyncActivityClient, localActivityClient, workflowEnvironment, workflowTimerClient {
  constructor(init?: Partial<workflowEnvironmentImpl>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  workflowInfo?: WorkflowInfo;

  decisionsHelper?: decisionsHelper;

  sideEffectResult: Record<number, Buffer> = {};

  changeVersions: Record<string, internal_Version> = {};

  pendingLaTasks: Record<string, localActivityTask> = {};

  mutableSideEffect: Record<string, Buffer> = {};

  unstartedLaTasks: Record<string, {}> = {};

  openSessions: Record<string, internal_SessionInfo> = {};

  counterID: number = 0;

  currentReplayTime: number = 0;

  currentLocalTime: number = 0;

  completeHandler?: completionHandler;

  cancelHandler?: () => void | Promise<void>;

  signalHandler?: (p0: string, p1: Buffer) => void | Promise<void>;

  queryHandler?: (p0: string, p1: Buffer) => Buffer | Promise<Buffer>;

  logger?: Logger;

  isReplay: boolean = false;

  enableLoggingInReplay: boolean = false;

  metricsScope?: Scope;

  registry?: registry;

  dataConverter?: internal_DataConverter;

  contextPropagators: internal_ContextPropagator[] = [];

  tracer?: unknown;

  workflowInterceptorFactories: internal_WorkflowInterceptorFactory[] = [];

  featureFlags: internal_FeatureFlags = { WorkflowExecutionAlreadyCompletedErrorEnabled: false, AutoforwardingEnabled: false, PollerAutoScalerEnabled: false, EphemeralTaskListsEnabled: false, MetricEmitMode: 0 };

  WorkflowInfo(): WorkflowInfo {
      return this.workflowInfo!;
    }

  async Complete(result: Buffer | undefined, err: Error | null): Promise<void> {
    await this.completeHandler!(result!, err);
  }

  async RequestCancelExternalWorkflow(domainName: string, workflowID: string, runID: string, callback: resultHandler): Promise<void> {
    const isChildWorkflowOnly = false;
    const cancellationID = this.GenerateSequenceID();
    const decision = this.decisionsHelper!.requestCancelExternalWorkflowExecution(
      domainName,
      workflowID,
      runID,
      cancellationID,
      isChildWorkflowOnly,
    );
    decision.setData(new scheduledCancellation({ callback, handled: false }));
  }

  SignalExternalWorkflow(domainName: string, workflowID: string, runID: string, signalName: string, input: Buffer, p5: unknown, childWorkflowOnly: boolean, callback: resultHandler): void {
    const signalID = this.GenerateSequenceID();
    const decision = this.decisionsHelper!.signalExternalWorkflowExecution(
      domainName,
      workflowID,
      runID,
      signalName,
      input,
      signalID,
      childWorkflowOnly,
    );
    decision.setData(new scheduledSignal({ callback, handled: false }));
  }

  async UpsertSearchAttributes(attributes: Record<string, unknown>): Promise<void> {
    const attr = validateAndSerializeSearchAttributes(attributes);

    let upsertID: string;
    if (CadenceChangeVersion in attributes) {
      upsertID = (attributes[CadenceChangeVersion] as string[])[0];
    } else {
      upsertID = this.GenerateSequenceID();
    }

    this.decisionsHelper!.upsertSearchAttributes(upsertID, attr);
    this.updateWorkflowInfoWithSearchAttributes(attr);
  }

  updateWorkflowInfoWithSearchAttributes(attributes: shared_ISearchAttributes): void {
    this.workflowInfo!.SearchAttributes = mergeSearchAttributes(this.workflowInfo!.SearchAttributes, attributes);
  }

  RegisterCancelHandler(handler: () => void | Promise<void>): void {
    this.cancelHandler = handler;
  }

  RegisterSignalHandler(handler: (p0: string, p1: Buffer) => void | Promise<void>): void {
    this.signalHandler = handler;
  }

  RegisterQueryHandler(handler: (p0: string, p1: Buffer) => Buffer | Promise<Buffer>): void {
    this.queryHandler = handler;
  }

  GetLogger(): Logger {
      return this.logger!;
  }

  GetMetricsScope(): Scope {
    return this.metricsScope!;
  }

  GetDataConverter(): internal_DataConverter {
    return this.dataConverter!;
  }

  GetContextPropagators(): internal_ContextPropagator[] {
    return this.contextPropagators;
  }

  IsReplaying(): boolean {
    return this.isReplay;
  }

  GenerateSequenceID(): string {
    return String(this.GenerateSequence());
  }

  GenerateSequence(): number {
    const result = this.counterID;
    this.counterID++;
    return result;
  }

  async ExecuteLocalActivity(params: executeLocalActivityParams, callback: laResultHandler): Promise<localActivityInfo> {
    const activityID = this.GenerateSequenceID();
    const task = newLocalActivityTask(params, callback, activityID);

    this.pendingLaTasks[activityID] = task;
    this.unstartedLaTasks[activityID] = {};

    return { activityID };
  }

  async RequestCancelLocalActivity(activityID: string): Promise<void> {
    const task = this.pendingLaTasks[activityID]!;
    if (activityID in this.pendingLaTasks) {
      await task.cancel();
    }
  }

  SetCurrentReplayTime(replayTime: number): void {
    if (replayTime < this.currentReplayTime) {
      return;
    }
    this.currentReplayTime = replayTime;
    this.currentLocalTime = Date.now() * 1_000_000;
  }

  Now(): number {
    return this.currentReplayTime;
  }

  MutableSideEffect(id: string, f: () => unknown, equals: (p0: unknown, p1: unknown) => boolean): internal_Value {
    if (id in this.mutableSideEffect) {
      const result = this.mutableSideEffect[id]!;
      const encodedResult = newEncodedValue(result, this.GetDataConverter());

      if (this.isReplay) {
        return encodedResult;
      }

      const newValue = f();
      if (this.isEqualValue(newValue, result, equals)) {
        return encodedResult;
      }

      return this.recordMutableSideEffect(id, this.encodeValue(newValue));
    }

    if (this.isReplay) {
      throw `Non deterministic workflow code change detected. MutableSideEffect API call doesn't have a correspondent event in the workflow history. MutableSideEffect ID: ${id}`;
    }

    return this.recordMutableSideEffect(id, this.encodeValue(f()));
  }

  isEqualValue(newValue: unknown | undefined, encodedOldValue: Buffer, equals: (p0: unknown, p1: unknown) => boolean): boolean {
    if (newValue == null) {
      const newEncodedValue = this.encodeValue(undefined);
      return newEncodedValue.equals(encodedOldValue);
    }

    const oldValue = decodeValue(newEncodedValue(encodedOldValue, this.GetDataConverter()), newValue);
    return equals(newValue, oldValue);
  }

  encodeValue(value: unknown | undefined): Buffer {
      return this.encodeArg(value);
    }

  encodeArg(arg: unknown): Buffer {
    return this.GetDataConverter().ToData(arg);
  }

  recordMutableSideEffect(id: string, data: Buffer): internal_Value {
    const details = encodeArgs(this.GetDataConverter(), [id, (data ?? Buffer.alloc(0)).toString()]);
    this.decisionsHelper!.recordMutableSideEffectMarker(id, details);
    this.mutableSideEffect[id] = data;
    return newEncodedValue(data, this.GetDataConverter());
  }

  AddSession(sessionInfo: internal_SessionInfo): void {
    this.openSessions[sessionInfo.SessionID] = sessionInfo;
  }

  RemoveSession(sessionID: string): void {
    delete this.openSessions[sessionID];
  }

  getOpenSessions(): internal_SessionInfo[] {
    const openSessions: internal_SessionInfo[] = [];
    for (const info of Object.values(this.openSessions ?? {})) {
      openSessions.push(info);
    }
    return openSessions;
  }

  GetRegistry(): registry {
    return this.registry!;
  }

  GetWorkflowInterceptors(): internal_WorkflowInterceptorFactory[] {
    return this.workflowInterceptorFactories;
  }

  GetFeatureFlags(): internal_FeatureFlags {
    return this.featureFlags;
  }

  async RequestCancelChildWorkflow(domainName: string, workflowID: string): Promise<void> {
    const isChildWorkflowOnly = true;
    const cancellationID = "";
    const runID = "";
    this.decisionsHelper!.requestCancelExternalWorkflowExecution(
      domainName,
      workflowID,
      runID,
      cancellationID,
      isChildWorkflowOnly,
    );
  }

  async GetVersion(changeID: string, minSupported: internal_Version, maxSupported: internal_Version, ...opts: internal_GetVersionOption[]): Promise<internal_Version> {
    if (changeID in this.changeVersions) {
      const version = this.changeVersions[changeID]!;
      validateVersion(changeID, version, minSupported, maxSupported);
      return version;
    }

    const config: getVersionConfig = { UseMinVersion: false };
    for (const opt of opts) {
      opt.apply(config);
    }

    let version: internal_Version;
    if (this.isReplay) {
      version = -1;
    } else if (config.CustomVersion != null) {
      version = config.CustomVersion!;
    } else if (config.UseMinVersion) {
      version = minSupported;
    } else {
      version = maxSupported;
    }

    validateVersion(changeID, version, minSupported, maxSupported);

    if (!this.isReplay && version !== -1) {
      this.decisionsHelper!.recordVersionMarker(changeID, version, this.GetDataConverter());
      try {
        await this.UpsertSearchAttributes(
          createSearchAttributesForChangeVersion(changeID, version, this.changeVersions)
        );
      } catch (err) {
        if (!(err instanceof Error)) throw err;
        this.logger!.warn("UpsertSearchAttributes failed", { error: err });
      }
    }

    this.changeVersions[changeID] = version;
    return version;
  }

  NewTimer(d: number, callback: resultHandler): timerInfo | undefined {
    const durationInSeconds = Int64Ceil(d / 1e9);
    if (durationInSeconds < 0) {
      callback(Buffer.alloc(0), new Error(`negative duration provided ${durationInSeconds}`));
      return undefined;
    }
    if (durationInSeconds === 0) {
      callback(Buffer.alloc(0), null);
      return undefined;
    }

    const timerID = this.GenerateSequenceID();
    const startTimerAttr = new shared_StartTimerDecisionAttributes({
      timerId: StringPtr(timerID),
      startToFireTimeoutSeconds: new Int64(durationInSeconds),
    });

    const decision = this.decisionsHelper!.startTimer(startTimerAttr);
    decision.setData(new scheduledTimer({ callback, handled: false }));

    this.logger!.debug("NewTimer", {
      [tagTimerID]: startTimerAttr.timerId ?? "",
      Duration: d,
      DurationInSeconds: durationInSeconds,
    });

    return { timerID };
  }

  ExecuteChildWorkflow(params: executeWorkflowParams, callback: resultHandler, startedHandler: (p0: internal_WorkflowExecution, p1: Error | null) => void | Promise<void>): void {
      let workflowID = params.workflowID;
      if (workflowID === "") {
        if (this.workflowInfo!.OriginalRunId !== "") {
          workflowID = this.workflowInfo!.OriginalRunId + "_" + this.GenerateSequenceID();
        } else {
          workflowID = this.workflowInfo!.WorkflowExecution.RunID + "_" + this.GenerateSequenceID();
        }
      }

      const memo = getWorkflowMemo(params.memo, this.dataConverter!);
      const searchAttr = serializeSearchAttributes(params.searchAttributes);

      const attributes = new shared_StartChildWorkflowExecutionDecisionAttributes({
        domain: params.domain!,
        taskList: new shared_TaskList({ name: params.taskListName! }),
        workflowId: StringPtr(workflowID),
        executionStartToCloseTimeoutSeconds: params.executionStartToCloseTimeoutSeconds!,
        taskStartToCloseTimeoutSeconds: params.taskStartToCloseTimeoutSeconds!,
        input: params.input,
        workflowType: workflowTypePtr(params.workflowType!),
        workflowIdReusePolicy: internal_WorkflowIDReusePolicy_toThriftPtr(params.workflowIDReusePolicy),
        parentClosePolicy: internal_ParentClosePolicy_toThriftPtr(params.parentClosePolicy),
        retryPolicy: params.retryPolicy!,
        header: params.header!,
        memo,
        searchAttributes: searchAttr,
        ...(params.cronSchedule.length > 0 ? { cronSchedule: StringPtr(params.cronSchedule) } : {})
      });

      const decision = this.decisionsHelper!.startChildWorkflowExecution(attributes);
      decision.setData(new scheduledChildWorkflow({
        resultCallback: callback,
        startedCallback: startedHandler,
        waitForCancellation: params.waitForCancellation,
        handled: false
      }));

      this.logger!.debug("ExecuteChildWorkflow", {
        [tagChildWorkflowID]: workflowID,
        [tagWorkflowType]: params.workflowType!.Name
      });
    }

  RequestCancelActivity(activityID: string): void {
    const decision = this.decisionsHelper!.requestCancelActivityTask(activityID);
    const activity = decision.getData() as scheduledActivity;
    if (activity.handled) {
      return;
    }

    if (decision.isDone() || !activity.waitForCancelRequest) {
      activity.handle(undefined, ErrCanceled);
    }

    this.logger!.debug("RequestCancelActivity", { [tagActivityID]: activityID });
  }

  RequestCancelTimer(timerID: string): void {
    const decision = this.decisionsHelper!.cancelTimer(timerID);
    const timer = decision.getData() as scheduledTimer;
    if (timer.handled) {
      return;
    }
    timer.handle(undefined, ErrCanceled);
    this.logger!.debug("RequestCancelTimer", { [tagTimerID]: timerID });
  }

  SideEffect(f: () => Buffer, callback: resultHandler): void {
    const sideEffectID = this.GenerateSequence();
    let details: Buffer = Buffer.alloc(0);
    let result: Buffer = Buffer.alloc(0);

    if (this.isReplay) {
      const ok = sideEffectID in this.sideEffectResult;
      if (!ok) {
        const keys = Object.keys(this.sideEffectResult).map((key) => Number(key));
        throw `No cached result found for side effectID=${sideEffectID}. KnownSideEffects=[${keys.join(" ")}]`;
      }
      result = this.sideEffectResult[sideEffectID]!;
      this.logger!.debug("SideEffect returning already calculated result.", {
        [tagSideEffectID]: sideEffectID,
      });
      details = result;
    } else {
      try {
        result = f();
      } catch (err) {
        if (!(err instanceof Error)) {
          throw err;
        }
        callback(result, err);
        return;
      }

      try {
        details = encodeArgs(this.GetDataConverter(), [sideEffectID, result]);
      } catch (err) {
        if (!(err instanceof Error)) {
          throw err;
        }
        callback(result, new Error(`failure encoding sideEffectID: ${err.message}`));
        return;
      }
    }

    this.decisionsHelper!.recordSideEffectMarker(sideEffectID, details);
    callback(result, null);
    this.logger!.debug("SideEffect Marker added", {
      [tagSideEffectID]: sideEffectID,
    });
  }

  async ExecuteActivity(parameters: executeActivityParams, callback: resultHandler): Promise<activityInfo> {
      const scheduleTaskAttr = new shared_ScheduleActivityTaskDecisionAttributes({});
      if (parameters.activityOptions.ActivityID == null || parameters.activityOptions.ActivityID! === "") {
        scheduleTaskAttr.activityId = StringPtr(this.GenerateSequenceID());
      } else {
        scheduleTaskAttr.activityId = parameters.activityOptions.ActivityID!;
      }
      const activityID = scheduleTaskAttr.activityId ?? "";
      scheduleTaskAttr.activityType = activityTypePtr(parameters.ActivityType);
      scheduleTaskAttr.taskList = TaskListPtr(new shared_TaskList({
        name: StringPtr(parameters.activityOptions.TaskListName),
        kind: parameters.activityOptions.TaskListKind
      }));
      scheduleTaskAttr.input = parameters.Input;
      scheduleTaskAttr.scheduleToCloseTimeoutSeconds = Int32Ptr(parameters.activityOptions.ScheduleToCloseTimeoutSeconds);
      scheduleTaskAttr.startToCloseTimeoutSeconds = Int32Ptr(parameters.activityOptions.StartToCloseTimeoutSeconds);
      scheduleTaskAttr.scheduleToStartTimeoutSeconds = Int32Ptr(parameters.activityOptions.ScheduleToStartTimeoutSeconds);
      scheduleTaskAttr.heartbeatTimeoutSeconds = Int32Ptr(parameters.activityOptions.HeartbeatTimeoutSeconds);
      scheduleTaskAttr.retryPolicy = parameters.activityOptions.RetryPolicy!;
      scheduleTaskAttr.header = parameters.Header!;

      const decision = this.decisionsHelper!.scheduleActivityTask(scheduleTaskAttr);
      decision.setData(new scheduledActivity({
        callback,
        waitForCancelRequest: parameters.activityOptions.WaitForCancellation,
        handled: false
      }));

      this.logger!.debug("ExecuteActivity", {
        [tagActivityID]: activityID,
        [tagActivityType]: scheduleTaskAttr.activityType?.name ?? ""
      });

      return { activityID };
    }

}

/**
 * workflowExecutionEventHandlerImpl handler to handle workflowExecutionEventHandler
 */
export class workflowExecutionEventHandlerImpl extends workflowEnvironmentImpl implements asyncActivityClient, localActivityClient, workflowEnvironment, workflowExecutionEventHandler, workflowTimerClient {
  constructor(init?: Partial<workflowExecutionEventHandlerImpl>) {
    super(init);
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  workflowDefinition?: workflowDefinition;

  KnownQueryTypes(): string[] {
    return this.workflowDefinition!.KnownQueryTypes();
  }

  async StackTrace(): Promise<string> {
    return this.workflowDefinition!.StackTrace();
  }

  async Close(): Promise<void> {
    if (this.workflowDefinition != null) {
      await this.workflowDefinition!.Close();
    }
  }

  async handleWorkflowExecutionStarted(attributes: shared_IWorkflowExecutionStartedEventAttributes): Promise<void> {
      this.workflowDefinition = await this.registry!.getWorkflowDefinition(
        this.workflowInfo!.WorkflowType,
      );

      try {
        await this.workflowDefinition!.Execute(this, attributes.header!, attributes.input!);
      } catch (err) {
        if (!(err instanceof Error)) throw err;
      }
    }

  handleActivityTaskCompleted(event: shared_IHistoryEvent): void {
    const activityID = this.decisionsHelper!.getActivityID(event);
    const decision = this.decisionsHelper!.handleActivityTaskClosed(activityID);
    const activity = decision.getData() as scheduledActivity;
    if (activity.handled) {
      return;
    }
    activity.handle(event.activityTaskCompletedEventAttributes!.result!, null);
  }

  handleActivityTaskFailed(event: shared_IHistoryEvent): void {
      const activityID = this.decisionsHelper!.getActivityID(event);
      const decision = this.decisionsHelper!.handleActivityTaskClosed(activityID);
      const activity = decision.getData() as scheduledActivity;
      if (activity.handled) {
        return;
      }

      const attributes = event.activityTaskFailedEventAttributes!;
      const err = constructError(attributes.reason!, attributes.details!, this.GetDataConverter());
      activity.handle(undefined, err);
    }

  handleActivityTaskTimedOut(event: shared_IHistoryEvent): void {
      const activityID = this.decisionsHelper!.getActivityID(event);
      const decision = this.decisionsHelper!.handleActivityTaskClosed(activityID);
      const activity = decision.getData() as scheduledActivity;
      if (activity.handled) {
        return;
      }

      const attributes = event.activityTaskTimedOutEventAttributes!;
      let err: Error | null;
      if ((attributes.lastFailureReason ?? "").length > 0 && attributes.timeoutType! === TimeoutType.START_TO_CLOSE) {
        err = constructError(
          attributes.lastFailureReason ?? "",
          attributes.lastFailureDetails!,
          this.GetDataConverter()
        );
      } else {
        const details = newEncodedValues(attributes.details!, this.GetDataConverter());
        err = NewTimeoutError(attributes.timeoutType!, details);
      }
      activity.handle(undefined, err);
    }

  handleActivityTaskCanceled(event: shared_IHistoryEvent): void {
    const activityID = this.decisionsHelper!.getActivityID(event);
    const decision = this.decisionsHelper!.handleActivityTaskCanceled(activityID);
    const activity = decision.getData() as scheduledActivity;
    if (activity.handled) {
      return;
    }

    if (decision.isDone() || !activity.waitForCancelRequest) {
      const details = newEncodedValues(
        event.activityTaskCanceledEventAttributes!.details!,
        this.GetDataConverter(),
      );
      const err = NewCanceledError(details);
      activity.handle(undefined, err);
    }
  }

  handleTimerFired(event: shared_IHistoryEvent): void {
    const timerID = event.timerFiredEventAttributes?.timerId ?? "";
    const decision = this.decisionsHelper!.handleTimerClosed(timerID);
    const timer = decision.getData() as scheduledTimer;
    if (timer.handled) {
      return;
    }

    timer.handle(undefined, null);
  }

  handleWorkflowExecutionCancelRequested(): void {
    this.cancelHandler!();
  }

  async handleMarkerRecorded(eventID: number, attributes: shared_IMarkerRecordedEventAttributes): Promise<void> {
    const encodedValues = newEncodedValues(attributes.details!, this.dataConverter!);
    switch (attributes.markerName ?? "") {
      case sideEffectMarkerName: {
        const sideEffectID = { value: 0 };
        const result = { value: Buffer.alloc(0) };
        try {
          encodedValues.Get(sideEffectID, result);
        } catch (err) {
          if (!(err instanceof Error)) throw err;
          throw new globalThis.Error("extract side effect: " + err.message, { cause: err });
        }
        this.sideEffectResult[sideEffectID.value] = result.value;
        return;
      }
      case versionMarkerName: {
        const changeID = { value: "" };
        const version: { value: internal_Version } = { value: 0 as internal_Version };
        try {
          encodedValues.Get(changeID, version);
        } catch (err) {
          if (!(err instanceof Error)) throw err;
          throw new globalThis.Error("extract change id: " + err.message, { cause: err });
        }
        this.changeVersions[changeID.value] = version.value;
        return;
      }
      case localActivityMarkerName:
        await this.handleLocalActivityMarker(attributes.details!);
        return;
      case mutableSideEffectMarkerName: {
        const fixedID = { value: "" };
        const result = { value: "" };
        try {
          encodedValues.Get(fixedID, result);
        } catch (err) {
          if (!(err instanceof Error)) throw err;
          throw new globalThis.Error("extract fixed id: " + err.message, { cause: err });
        }
        this.mutableSideEffect[fixedID.value] = Buffer.from(result.value);
        return;
      }
      default:
        throw new globalThis.Error(`unknown marker name "${attributes.markerName ?? ""}" for eventID "${eventID}"`);
    }
  }

  async handleLocalActivityMarker(markerData: Buffer): Promise<void> {
      const lamdBox: { value: localActivityMarkerData } = {
        value: {
          ActivityID: '',
          ActivityType: '',
          ErrReason: '',
          ErrJSON: '',
          ResultJSON: '',
          ReplayTime: 0,
          Attempt: 0,
          Backoff: 0,
        },
      };
      newEncodedValue(markerData, this.dataConverter).Get(lamdBox);
      const lamd = lamdBox.value;

      const la = this.pendingLaTasks[lamd.ActivityID];
      if (la != null) {
        if (
          lamd.ActivityType.length > 0 &&
          lastPartOfName(lamd.ActivityType) !== lastPartOfName(la.params!.ActivityType)
        ) {
          const panicMsg = `code execute local activity ${la.params!.ActivityType}, but history event found ${lamd.ActivityType}, markerData: ${markerData.toString()}`;
          panicIllegalState(panicMsg);
        }

        this.decisionsHelper!.recordLocalActivityMarker(lamd.ActivityID, markerData);
        delete this.pendingLaTasks[lamd.ActivityID];
        delete this.unstartedLaTasks[lamd.ActivityID];

        const lar: localActivityResultWrapper = {
          attempt: 0,
          backoff: 0,
        };
        if (lamd.ErrReason.length > 0) {
          lar.attempt = lamd.Attempt;
          lar.backoff = lamd.Backoff;
          lar.err = constructError(
            lamd.ErrReason,
            Buffer.from(lamd.ErrJSON),
            this.GetDataConverter(),
          );
        } else if (lamd.ResultJSON.length > 0) {
          lar.result = Buffer.from(lamd.ResultJSON);
        }

        await la.callback!(lar);

        this.SetCurrentReplayTime(lamd.ReplayTime);
        await this.workflowDefinition!.OnDecisionTaskStarted();
      }
    }

  async ProcessLocalActivityResult(lar: localActivityResult): Promise<void> {
    const lamd: localActivityMarkerData = {
      ActivityID: lar.task!.activityID,
      ActivityType: lar.task!.params!.ActivityType,
      ReplayTime: this.currentReplayTime + (Date.now() * 1_000_000 - this.currentLocalTime),
      Attempt: lar.task!.attempt,
      Backoff: 0,
      ErrJSON: "",
      ErrReason: "",
      ResultJSON: "",
    };

    if (lar.err != null) {
      const [errReason, errDetails] = getErrorDetails(lar.err!, this.GetDataConverter());
      lamd.ErrReason = errReason;
      lamd.ErrJSON = errDetails.toString();
      lamd.Backoff = lar.backoff;
    } else {
      lamd.ResultJSON = (lar.result! ?? Buffer.alloc(0)).toString();
    }

    const markerData = this.encodeArg(lamd);
    const markerEvent = new shared_HistoryEvent({
      eventType: EventTypePtr(EventType.MarkerRecorded),
      markerRecordedEventAttributes: new shared_MarkerRecordedEventAttributes({
        markerName: StringPtr(localActivityMarkerName)!,
        details: markerData,
      }),
    });

    await this.ProcessEvent(markerEvent, false, false);
  }

  handleWorkflowExecutionSignaled(attributes: shared_IWorkflowExecutionSignaledEventAttributes): void {
    this.signalHandler!(attributes.signalName ?? "", attributes.input!);
  }

  handleStartChildWorkflowExecutionFailed(event: shared_IHistoryEvent): void {
    const attributes = event.startChildWorkflowExecutionFailedEventAttributes!;
    const childWorkflowID = attributes.workflowId ?? "";
    const decision = this.decisionsHelper!.handleStartChildWorkflowExecutionFailed(childWorkflowID);
    const childWorkflow = decision.getData() as scheduledChildWorkflow;
    if (childWorkflow.handled) {
      return;
    }

    const err = new shared_WorkflowExecutionAlreadyStartedError({
      message: StringPtr("Workflow execution already started"),
    });
    childWorkflow.startedCallback!({ ID: "", RunID: "" }, err);
    childWorkflow.handle(undefined, err);
  }

  handleChildWorkflowExecutionStarted(event: shared_IHistoryEvent): void {
    const attributes = event.childWorkflowExecutionStartedEventAttributes!;
    const childWorkflowID = attributes.workflowExecution?.workflowId ?? "";
    const childRunID = attributes.workflowExecution?.runId ?? "";
    const decision = this.decisionsHelper!.handleChildWorkflowExecutionStarted(childWorkflowID);
    const childWorkflow = decision.getData() as scheduledChildWorkflow;
    if (childWorkflow.handled) {
      return;
    }

    const childWorkflowExecution: internal_WorkflowExecution = {
      ID: childWorkflowID,
      RunID: childRunID,
    };
    childWorkflow.startedCallback!(childWorkflowExecution, null);
  }

  handleChildWorkflowExecutionCompleted(event: shared_IHistoryEvent): void {
    const attributes = event.childWorkflowExecutionCompletedEventAttributes!;
    const childWorkflowID = attributes.workflowExecution?.workflowId ?? "";
    const decision = this.decisionsHelper!.handleChildWorkflowExecutionClosed(childWorkflowID);
    const childWorkflow = decision.getData() as scheduledChildWorkflow;
    if (childWorkflow.handled) {
      return;
    }
    childWorkflow.handle(Buffer.from(attributes.result!), null);
  }

  handleChildWorkflowExecutionFailed(event: shared_IHistoryEvent): void {
    const attributes = event.childWorkflowExecutionFailedEventAttributes!;
    const childWorkflowID = attributes.workflowExecution?.workflowId ?? "";
    const decision = this.decisionsHelper!.handleChildWorkflowExecutionClosed(childWorkflowID);
    const childWorkflow = decision.getData() as scheduledChildWorkflow;
    if (childWorkflow.handled) {
      return;
    }

    const err = constructError(attributes.reason ?? "", attributes.details!, this.GetDataConverter());
    childWorkflow.handle(undefined, err);
  }

  handleChildWorkflowExecutionCanceled(event: shared_IHistoryEvent): void {
      const attributes = event.childWorkflowExecutionCanceledEventAttributes!;
      const childWorkflowID = attributes.workflowExecution?.workflowId ?? "";
      const decision = this.decisionsHelper!.handleChildWorkflowExecutionCanceled(childWorkflowID);
      const childWorkflow = decision.getData() as scheduledChildWorkflow;
      if (childWorkflow.handled) {
        return;
      }
      const details = newEncodedValues(attributes.details!, this.GetDataConverter());
      const err = NewCanceledError(details);
      childWorkflow.handle(undefined, err);
    }

  handleChildWorkflowExecutionTimedOut(event: shared_IHistoryEvent): void {
    const attributes = event.childWorkflowExecutionTimedOutEventAttributes!;
    const childWorkflowID = attributes.workflowExecution?.workflowId ?? "";
    const decision = this.decisionsHelper!.handleChildWorkflowExecutionClosed(childWorkflowID);
    const childWorkflow = decision.getData() as scheduledChildWorkflow;
    if (childWorkflow.handled) {
      return;
    }
    const err = NewTimeoutError(attributes.timeoutType ?? 0);
    childWorkflow.handle(undefined, err);
  }

  handleChildWorkflowExecutionTerminated(event: shared_IHistoryEvent): void {
    const attributes = event.childWorkflowExecutionTerminatedEventAttributes!;
    const childWorkflowID = attributes.workflowExecution?.workflowId ?? "";
    const decision = this.decisionsHelper!.handleChildWorkflowExecutionClosed(childWorkflowID);
    const childWorkflow = decision.getData() as scheduledChildWorkflow;
    if (childWorkflow.handled) {
      return;
    }
    const err = newTerminatedError();
    childWorkflow.handle(undefined, err);
  }

  handleUpsertWorkflowSearchAttributes(event: shared_IHistoryEvent): void {
    this.updateWorkflowInfoWithSearchAttributes(event.upsertWorkflowSearchAttributesEventAttributes!.searchAttributes!);
  }

  handleRequestCancelExternalWorkflowExecutionInitiated(event: shared_IHistoryEvent): void {
      const attribute = event.requestCancelExternalWorkflowExecutionInitiatedEventAttributes!;
      const workflowID = attribute.workflowExecution?.workflowId ?? "";
      const cancellationID = (attribute.control ?? Buffer.alloc(0)).toString();
      this.decisionsHelper!.handleRequestCancelExternalWorkflowExecutionInitiated(
        event.eventId?.toNumber() ?? 0,
        workflowID,
        cancellationID,
      );
  }

  handleExternalWorkflowExecutionCancelRequested(event: shared_IHistoryEvent): void {
    const attributes = event.externalWorkflowExecutionCancelRequestedEventAttributes!;
    const workflowID = attributes.workflowExecution?.workflowId ?? "";
    const [isExternal, decision] = this.decisionsHelper!.handleExternalWorkflowExecutionCancelRequested(
      attributes.initiatedEventId?.toNumber() ?? 0,
      workflowID
    );
    if (isExternal) {
      const cancellation = decision.getData() as scheduledCancellation;
      if (cancellation.handled) {
        return;
      }
      cancellation.handle(undefined, null);
    }
  }

  handleRequestCancelExternalWorkflowExecutionFailed(event: shared_IHistoryEvent): void {
      const attributes = event.requestCancelExternalWorkflowExecutionFailedEventAttributes!;
      const workflowID = attributes.workflowExecution?.workflowId ?? "";
      const [isExternal, decision] = this.decisionsHelper!.handleRequestCancelExternalWorkflowExecutionFailed(
        attributes.initiatedEventId?.toNumber() ?? 0,
        workflowID,
      );
      if (isExternal) {
        const cancellation = decision.getData() as scheduledCancellation;
        if (cancellation.handled) {
          return;
        }
        const err = new Error(`cancel external workflow failed, ${attributes.cause}`);
        cancellation.handle(undefined, err);
      }
    }

  handleSignalExternalWorkflowExecutionCompleted(event: shared_IHistoryEvent): void {
    const attributes = event.externalWorkflowExecutionSignaledEventAttributes!;
    const decision = this.decisionsHelper!.handleSignalExternalWorkflowExecutionCompleted(
      attributes.initiatedEventId?.toNumber() ?? 0,
    );
    const signal = decision.getData() as scheduledSignal;
    if (signal.handled) {
      return;
    }
    signal.handle(undefined, null);
  }

  handleSignalExternalWorkflowExecutionFailed(event: shared_IHistoryEvent): void {
      const attributes = event.signalExternalWorkflowExecutionFailedEventAttributes!;
      const decision = this.decisionsHelper!.handleSignalExternalWorkflowExecutionFailed(
        attributes.initiatedEventId?.toNumber() ?? 0
      );
      const signal = decision.getData() as scheduledSignal;
      if (signal.handled) {
        return;
      }

      let err: Error;
      switch (attributes.cause) {
        case SignalExternalWorkflowExecutionFailedCause.UNKNOWN_EXTERNAL_WORKFLOW_EXECUTION:
          err = newUnknownExternalWorkflowExecutionError();
          break;
        default:
          err = new globalThis.Error(`signal external workflow failed, ${attributes.cause}`);
      }

      signal.handle(undefined, err);
    }

  async ProcessQuery(queryType: string, queryArgs: Buffer): Promise<Buffer> {
    switch (queryType) {
      case QueryTypeStackTrace:
        return this.encodeArg(await this.StackTrace());
      case QueryTypeOpenSessions:
        return this.encodeArg(this.getOpenSessions());
      case QueryTypeQueryTypes:
        return this.encodeArg(this.KnownQueryTypes());
      default: {
        const result = await this.queryHandler!(queryType, queryArgs);
        const resultSize = result.length;
        if (resultSize > queryResultSizeLimit) {
          this.logger!.error("Query result size exceeds limit.", {
            [tagQueryType]: queryType,
            [tagWorkflowID]: this.workflowInfo!.WorkflowExecution.ID,
            [tagRunID]: this.workflowInfo!.WorkflowExecution.RunID,
          });
          throw new Error(`query result size (${resultSize}) exceeds limit (${queryResultSizeLimit})`);
        }
        return result;
      }
    }
  }

  async ProcessEvent(event: shared_IHistoryEvent | undefined, isReplay: boolean, isLast: boolean): Promise<void> {
    if (event == null) {
      throw new Error("nil event provided");
    }

    try {
      this.isReplay = isReplay;
      traceLog(() => {
        const eventType = event.eventType!;
        this.logger!.debug("ProcessEvent", {
          [tagEventID]: event.eventId?.toNumber() ?? 0,
          [tagEventType]: EventType[eventType],
        });
      });

      switch (event.eventType!) {
        case EventType.WorkflowExecutionCompleted:
        case EventType.WorkflowExecutionTimedOut:
        case EventType.WorkflowExecutionFailed:
        case EventType.DecisionTaskScheduled:
        case EventType.DecisionTaskTimedOut:
        case EventType.DecisionTaskFailed:
        case EventType.ActivityTaskStarted:
        case EventType.DecisionTaskCompleted:
        case EventType.WorkflowExecutionCanceled:
        case EventType.WorkflowExecutionContinuedAsNew:
          break;
        case EventType.WorkflowExecutionStarted:
          await this.handleWorkflowExecutionStarted(event.workflowExecutionStartedEventAttributes!);
          break;
        case EventType.DecisionTaskStarted:
          this.SetCurrentReplayTime(event.timestamp?.toNumber() ?? 0);
          await this.workflowDefinition!.OnDecisionTaskStarted();
          this.workflowInfo!.DecisionStartedEventID = event.eventId?.toNumber() ?? 0;
          break;
        case EventType.ActivityTaskScheduled:
          this.decisionsHelper!.handleActivityTaskScheduled(
            event.eventId?.toNumber() ?? 0,
            event.activityTaskScheduledEventAttributes?.activityId ?? "",
          );
          break;
        case EventType.ActivityTaskCompleted:
          this.handleActivityTaskCompleted(event);
          break;
        case EventType.ActivityTaskFailed:
          this.handleActivityTaskFailed(event);
          break;
        case EventType.ActivityTaskTimedOut:
          this.handleActivityTaskTimedOut(event);
          break;
        case EventType.ActivityTaskCancelRequested:
          this.decisionsHelper!.handleActivityTaskCancelRequested(
            event.activityTaskCancelRequestedEventAttributes?.activityId ?? "",
          );
          break;
        case EventType.RequestCancelActivityTaskFailed:
          this.decisionsHelper!.handleRequestCancelActivityTaskFailed(
            event.requestCancelActivityTaskFailedEventAttributes?.activityId ?? "",
          );
          break;
        case EventType.ActivityTaskCanceled:
          this.handleActivityTaskCanceled(event);
          break;
        case EventType.TimerStarted:
          this.decisionsHelper!.handleTimerStarted(
            event.timerStartedEventAttributes?.timerId ?? "",
          );
          break;
        case EventType.TimerFired:
          this.handleTimerFired(event);
          break;
        case EventType.TimerCanceled:
          this.decisionsHelper!.handleTimerCanceled(
            event.timerCanceledEventAttributes?.timerId ?? "",
          );
          break;
        case EventType.CancelTimerFailed:
          this.decisionsHelper!.handleCancelTimerFailed(
            event.cancelTimerFailedEventAttributes?.timerId ?? "",
          );
          break;
        case EventType.WorkflowExecutionCancelRequested:
          this.handleWorkflowExecutionCancelRequested();
          break;
        case EventType.RequestCancelExternalWorkflowExecutionInitiated:
          this.handleRequestCancelExternalWorkflowExecutionInitiated(event);
          break;
        case EventType.RequestCancelExternalWorkflowExecutionFailed:
          this.handleRequestCancelExternalWorkflowExecutionFailed(event);
          break;
        case EventType.ExternalWorkflowExecutionCancelRequested:
          this.handleExternalWorkflowExecutionCancelRequested(event);
          break;
        case EventType.WorkflowExecutionSignaled:
          this.handleWorkflowExecutionSignaled(event.workflowExecutionSignaledEventAttributes!);
          break;
        case EventType.SignalExternalWorkflowExecutionInitiated:
          this.decisionsHelper!.handleSignalExternalWorkflowExecutionInitiated(
            event.eventId?.toNumber() ?? 0,
            (event.signalExternalWorkflowExecutionInitiatedEventAttributes!.control ?? Buffer.alloc(0)).toString(),
          );
          break;
        case EventType.SignalExternalWorkflowExecutionFailed:
          this.handleSignalExternalWorkflowExecutionFailed(event);
          break;
        case EventType.ExternalWorkflowExecutionSignaled:
          this.handleSignalExternalWorkflowExecutionCompleted(event);
          break;
        case EventType.MarkerRecorded:
          await this.handleMarkerRecorded(
            event.eventId?.toNumber() ?? 0,
            event.markerRecordedEventAttributes!,
          );
          break;
        case EventType.StartChildWorkflowExecutionInitiated:
          this.decisionsHelper!.handleStartChildWorkflowExecutionInitiated(
            event.startChildWorkflowExecutionInitiatedEventAttributes?.workflowId ?? "",
          );
          break;
        case EventType.StartChildWorkflowExecutionFailed:
          this.handleStartChildWorkflowExecutionFailed(event);
          break;
        case EventType.ChildWorkflowExecutionStarted:
          this.handleChildWorkflowExecutionStarted(event);
          break;
        case EventType.ChildWorkflowExecutionCompleted:
          this.handleChildWorkflowExecutionCompleted(event);
          break;
        case EventType.ChildWorkflowExecutionFailed:
          this.handleChildWorkflowExecutionFailed(event);
          break;
        case EventType.ChildWorkflowExecutionCanceled:
          this.handleChildWorkflowExecutionCanceled(event);
          break;
        case EventType.ChildWorkflowExecutionTimedOut:
          this.handleChildWorkflowExecutionTimedOut(event);
          break;
        case EventType.ChildWorkflowExecutionTerminated:
          this.handleChildWorkflowExecutionTerminated(event);
          break;
        case EventType.UpsertWorkflowSearchAttributes:
          this.handleUpsertWorkflowSearchAttributes(event);
          break;
        default:
          this.logger!.error("unknown event type", {
            [tagEventID]: event.eventId?.toNumber() ?? 0,
            [tagEventType]: EventType[event.eventType!],
          });
          break;
      }

      const historySum = estimateHistorySize(this.logger!, event);
      this.workflowInfo!.TotalHistoryBytes += historySum;

      if (isLast && event.eventType! !== EventType.DecisionTaskStarted) {
        await this.workflowDefinition!.OnDecisionTaskStarted();
      }
    } catch (panic) {
      if (panic instanceof Error) {
        throw panic;
      }

      this.metricsScope!.Counter(DecisionTaskPanicCounter).Inc(1);
      const topLine = `process event for ${this.workflowInfo!.TaskListName} [panic]:`;
      const st = getStackTraceRaw(topLine, 4, 0);
      const panicError =
        panic instanceof Error
          ? panic.message
          : typeof (panic as { String?: unknown }).String === "function"
            ? (panic as { String(): string }).String()
            : globalThis.String(panic);

      this.logger!.error("ProcessEvent panic.", {
        [tagPanicError]: panicError,
        [tagPanicStack]: st,
      });

      void this.Complete(undefined, newWorkflowPanicError(panic, st)).catch((error) => {
        if (!(error instanceof Error)) {
          throw error;
        }
      });
    }
  }

}

export class scheduledTimer {
  constructor(init?: Partial<scheduledTimer>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  callback?: resultHandler;

  handled: boolean = false;

  handle(result: Buffer | undefined, err: Error | null): void {
    if (this.handled) {
      throw `timer already handled ${this}`;
    }
    this.handled = true;
    this.callback!(result!, err);
  }

}

export class scheduledActivity {
  constructor(init?: Partial<scheduledActivity>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  callback?: resultHandler;

  waitForCancelRequest: boolean = false;

  handled: boolean = false;

  handle(result: Buffer | undefined, err: Error | null): void {
    if (this.handled) {
      throw `activity already handled ${this}`;
    }
    this.handled = true;
    this.callback!(result!, err);
  }

}

export class scheduledChildWorkflow {
  constructor(init?: Partial<scheduledChildWorkflow>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  resultCallback?: resultHandler;

  startedCallback?: (p0: internal_WorkflowExecution, p1: Error | null) => void | Promise<void>;

  waitForCancellation: boolean = false;

  handled: boolean = false;

  handle(result: Buffer | undefined, err: Error | null): void {
    if (this.handled) {
      throw `child workflow already handled ${this}`;
    }
    this.handled = true;
    this.resultCallback!(result!, err);
  }

}

export class scheduledCancellation {
  constructor(init?: Partial<scheduledCancellation>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  callback?: resultHandler;

  handled: boolean = false;

  handle(result: Buffer | undefined, err: Error | null): void {
    if (this.handled) {
      throw `cancellation already handled ${this}`;
    }
    this.handled = true;
    this.callback!(result!, err);
  }

}

export class scheduledSignal {
  constructor(init?: Partial<scheduledSignal>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  callback?: resultHandler;

  handled: boolean = false;

  handle(result: Buffer | undefined, err: Error | null): void {
    if (this.handled) {
      throw `signal already handled ${this}`;
    }
    this.handled = true;
    this.callback!(result!, err);
  }

}

export class localActivityTask {
  constructor(init?: Partial<localActivityTask>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  Mutex: Mutex = new Mutex();

  workflowTask?: workflowTask;

  activityID: string = "";

  params?: executeLocalActivityParams;

  callback?: laResultHandler;

  wc?: workflowExecutionContextImpl;

  canceled: boolean = false;

  cancelFunc?: () => void | Promise<void>;

  attempt: number = 0;

  retryPolicy?: internal_RetryPolicy;

  expireTime: number = 0;

  header?: shared_IHeader;

  async cancel(): Promise<void> {
    await this.Lock();
    this.canceled = true;
    if (this.cancelFunc != null) {
      await this.cancelFunc!();
    }
    this.Unlock();
  }

  async Lock(): Promise<void> {
    await this.Mutex.acquire();
  }

  TryLock(): boolean {
    if (this.Mutex.isLocked()) {
      return false;
    }
    void this.Mutex.acquire();
    return true;
  }

  Unlock(): void {
    this.Mutex.release();
  }

}

/**
 * wrapper around zapcore.Core that will be aware of replay
 */
export class replayAwareZapCore {
  constructor(init?: Partial<replayAwareZapCore>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  Core?: GoZapCore;

  isReplay?: Ref<boolean>;

  enableLoggingInReplay?: Ref<boolean>;

  Check(entry: unknown, checkedEntry: unknown): unknown {
    if (this.isReplay!.value && !this.enableLoggingInReplay!.value) {
      return checkedEntry;
    }
    return this.Core!.Check(entry, checkedEntry);
  }

  With(fields: unknown[]): GoZapCore {
    const coreWithFields = this.Core!.With(fields);
    return new replayAwareZapCore({
      Core: coreWithFields,
      isReplay: this.isReplay!,
      enableLoggingInReplay: this.enableLoggingInReplay!,
    });
  }

  Enabled(p0: unknown): boolean {
    return this.Core!.Enabled(p0);
  }

  Sync(): void {
    return this.Core!.Sync();
  }

  Write(p0: unknown, p1: unknown[]): void {
    return this.Core!.Write(p0, p1);
  }

}

export function wrapLogger(isReplay: Ref<boolean>, enableLoggingInReplay: Ref<boolean>): (p0: GoZapCore) => GoZapCore {
  return (p0: GoZapCore): GoZapCore =>
    new replayAwareZapCore({ Core: p0, isReplay, enableLoggingInReplay });
}

export function mergeSearchAttributes(current: shared_ISearchAttributes | undefined, upsert: shared_ISearchAttributes | undefined): shared_ISearchAttributes | undefined {
    if (current == null || (current.indexedFields?.size ?? 0) === 0) {
        if (upsert == null || (upsert.indexedFields?.size ?? 0) === 0) {
            return undefined;
        }
        current = new shared_SearchAttributes({
            indexedFields: new Map(),
        });
    }

    const fields = current.indexedFields!;
    for (const [k, v] of (upsert!.indexedFields ?? new Map<string, Buffer>())) {
        fields.set(k, v);
    }
    return current;
}

export function validateAndSerializeSearchAttributes(attributes: Record<string, unknown>): shared_ISearchAttributes {
    if (Object.keys(attributes).length === 0) {
        throw errSearchAttributesNotSet;
    }
    return serializeSearchAttributes(attributes)!;
}

export function newLocalActivityTask(params: executeLocalActivityParams, callback: laResultHandler, activityID: string): localActivityTask {
  const task = new localActivityTask({
    Mutex: new Mutex(),
    canceled: false,
    expireTime: 0,
    activityID,
    params,
    callback,
    retryPolicy: params.localActivityOptions.RetryPolicy!,
    attempt: params.Attempt,
    header: params.Header!,
  });

  if (params.localActivityOptions.RetryPolicy! != null && params.localActivityOptions.RetryPolicy!.ExpirationInterval > 0) {
    task.expireTime = params.ScheduledTime + params.localActivityOptions.RetryPolicy!.ExpirationInterval;
  }

  return task;
}

export function validateVersion(changeID: string, version: internal_Version, minSupported: internal_Version, maxSupported: internal_Version): void {
    if (version < minSupported) {
        throw `Workflow code removed support of version ${version}. for "${changeID}" changeID. The oldest supported version is ${minSupported}`;
    }
    if (version > maxSupported) {
        throw `Workflow code is too old to support version ${version} for "${changeID}" changeID. The maximum supported version is ${maxSupported}`;
    }
}

export function createSearchAttributesForChangeVersion(changeID: string, version: internal_Version, existingChangeVersions: Record<string, internal_Version>): Record<string, unknown> {
    return {
        [CadenceChangeVersion]: getChangeVersions(changeID, version, existingChangeVersions),
    };
}

export function getChangeVersions(changeID: string, version: internal_Version, existingChangeVersions: Record<string, internal_Version>): string[] {
  const res = [getChangeVersion(changeID, version)];
  for (const [k, v] of Object.entries(existingChangeVersions ?? {})) {
    res.push(getChangeVersion(k, v));
  }
  return res;
}

export function getChangeVersion(changeID: string, version: internal_Version): string {
  return `${changeID}-${version}`;
}

export function decodeValue(encodedValue: internal_Value, value: unknown): unknown {
  const valuePtr: { value: unknown } = { value };
  encodedValue.Get(valuePtr);
  return valuePtr.value;
}

export function newWorkflowExecutionEventHandler(workflowInfo: WorkflowInfo, completeHandler: completionHandler, logger: Logger, enableLoggingInReplay: boolean, scope: Scope | undefined, registry: registry, dataConverter: internal_DataConverter, contextPropagators: internal_ContextPropagator[], tracer: unknown, workflowInterceptorFactories: internal_WorkflowInterceptorFactory[], featureFlags: internal_FeatureFlags): workflowExecutionEventHandlerImpl {
  const context = new workflowEnvironmentImpl({
    workflowInfo,
    decisionsHelper: newDecisionsHelper(),
    sideEffectResult: {},
    mutableSideEffect: {},
    changeVersions: {},
    pendingLaTasks: {},
    unstartedLaTasks: {},
    openSessions: {},
    completeHandler,
    enableLoggingInReplay,
    registry,
    dataConverter,
    contextPropagators,
    tracer,
    workflowInterceptorFactories,
    featureFlags,
    counterID: 0,
    currentLocalTime: 0,
    currentReplayTime: 0,
    isReplay: false,
  });

  context.logger = LoggerFromCore(
    wrapLogger(
      Ref.property(context, "isReplay"),
      Ref.property(context, "enableLoggingInReplay"),
    )(CoreFromLogger(
      logger.child({
        [tagWorkflowType]: workflowInfo.WorkflowType.Name,
        [tagWorkflowID]: workflowInfo.WorkflowExecution.ID,
        [tagRunID]: workflowInfo.WorkflowExecution.RunID,
      }),
    )),
  );

  if (scope != null) {
    context.metricsScope = tagScope(
      WrapScope(Ref.property(context, "isReplay"), scope, context),
      tagWorkflowType,
      workflowInfo.WorkflowType.Name,
    );
  }

  return new workflowExecutionEventHandlerImpl({
    workflowInfo: context.workflowInfo,
    decisionsHelper: context.decisionsHelper,
    sideEffectResult: context.sideEffectResult,
    mutableSideEffect: context.mutableSideEffect,
    changeVersions: context.changeVersions,
    pendingLaTasks: context.pendingLaTasks,
    unstartedLaTasks: context.unstartedLaTasks,
    openSessions: context.openSessions,
    completeHandler: context.completeHandler,
    enableLoggingInReplay: context.enableLoggingInReplay,
    registry: context.registry,
    dataConverter: context.dataConverter,
    contextPropagators: context.contextPropagators,
    tracer: context.tracer,
    workflowInterceptorFactories: context.workflowInterceptorFactories,
    featureFlags: context.featureFlags,
    counterID: context.counterID,
    currentLocalTime: context.currentLocalTime,
    currentReplayTime: context.currentReplayTime,
    isReplay: context.isReplay,
    logger: context.logger,
    metricsScope: context.metricsScope,
    workflowDefinition: undefined,
  });
}

export const historySizeEstimationBuffer = 400;

export const queryResultSizeLimit = 2000000;
