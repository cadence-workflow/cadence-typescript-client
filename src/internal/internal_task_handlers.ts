import { SignalWorkflowExecutionRequest as shared_SignalWorkflowExecutionRequest } from '../generated/thrift/cadence-idl/com/uber/cadence/SignalWorkflowExecutionRequest.js';
import { RecordActivityTaskHeartbeatByIDRequest as shared_RecordActivityTaskHeartbeatByIDRequest } from '../generated/thrift/cadence-idl/com/uber/cadence/RecordActivityTaskHeartbeatByIDRequest.js';
import { WorkflowExecution as shared_WorkflowExecution } from '../generated/thrift/cadence-idl/com/uber/cadence/WorkflowExecution.js';
import { RecordActivityTaskHeartbeatRequest as shared_RecordActivityTaskHeartbeatRequest } from '../generated/thrift/cadence-idl/com/uber/cadence/RecordActivityTaskHeartbeatRequest.js';
import { WorkflowQueryResult as shared_WorkflowQueryResult } from '../generated/thrift/cadence-idl/com/uber/cadence/WorkflowQueryResult.js';
import { TaskList as shared_TaskList } from '../generated/thrift/cadence-idl/com/uber/cadence/TaskList.js';
import { RespondQueryTaskCompletedRequest as shared_RespondQueryTaskCompletedRequest } from '../generated/thrift/cadence-idl/com/uber/cadence/RespondQueryTaskCompletedRequest.js';
import { RespondDecisionTaskCompletedRequest as shared_RespondDecisionTaskCompletedRequest } from '../generated/thrift/cadence-idl/com/uber/cadence/RespondDecisionTaskCompletedRequest.js';
import { FailWorkflowExecutionDecisionAttributes as shared_FailWorkflowExecutionDecisionAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/FailWorkflowExecutionDecisionAttributes.js';
import { ContinueAsNewWorkflowExecutionDecisionAttributes as shared_ContinueAsNewWorkflowExecutionDecisionAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/ContinueAsNewWorkflowExecutionDecisionAttributes.js';
import { CompleteWorkflowExecutionDecisionAttributes as shared_CompleteWorkflowExecutionDecisionAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/CompleteWorkflowExecutionDecisionAttributes.js';
import { CancelWorkflowExecutionDecisionAttributes as shared_CancelWorkflowExecutionDecisionAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/CancelWorkflowExecutionDecisionAttributes.js';
import { Ref } from './runtime/ref.js';
import { ErrDeadlineExceeded } from './context.js';
import { TimeoutType } from '../generated/thrift/cadence-idl/com/uber/cadence/TimeoutType.js';
import { mapCase, promiseCase, recvCase, selectOne, timeoutCase } from './runtime/select.js';
import { Retry } from './common/backoff/retry.js';
import { createDynamicServiceRetryPolicy, isServiceTransientError } from './internal_retry.js';
import { New } from './common/cache/lru.js';
import { DecisionTaskFailedCause } from '../generated/thrift/cadence-idl/com/uber/cadence/DecisionTaskFailedCause.js';
import { getRunID } from './internal_workflow_client.js';
// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { Mutex } from 'async-mutex';
import { ServiceInvoker } from './activity.js';
import { internal_RetryPolicy } from './client.js';
import { Cache } from './common/cache/cache.js';
import { TaggedScope, NewTaggedScope } from './common/metrics/scope.js';
import { internal_DataConverter } from './encoded.js';
import { workflowPanicError, NewCustomError, internal_CanceledError, internal_ContinueAsNewError, NewCanceledError, IsCanceledError, internal_PanicError } from './error.js';
import { internal_ContextPropagator } from './headers.js';
import { internal_WorkflowInterceptorFactory } from './interceptors.js';
import { activity } from './internal_activity.js';
import { workflowExecutionEventHandlerImpl, newWorkflowExecutionEventHandler } from './internal_event_handlers.js';
import { pressurePointMgr, pressurePointTypeActivityTaskScheduleTimeout, pressurePointTypeActivityTaskStartTimeout, pressurePointTypeDecisionTaskCompleted, pressurePointTypeDecisionTaskStartTimeout } from './internal_pressure_points.js';
import { HistoryIterator, WorkflowTaskHandler, decisionHeartbeatFunc, enableVerboseLogging } from './internal_public.js';
import { localActivityResult, localActivityTunnel, ratioToForceCompleteDecisionTaskComplete } from './internal_task_pollers.js';
import { internal_FeatureFlags, getErrorDetails, workflowTypePtr, flowWorkflowTypeFrom, newChannelContext } from './internal_utils.js';
import { getBinaryChecksum, ensureRequiredParams, workerExecutionParameters } from './internal_worker.js';
import { internal_NonDeterministicWorkflowPolicy } from './worker.js';
import { registry } from './registry.js';
import { WorkflowInfo, internal_WorkflowExecution } from './workflow.js';
import type { WorkflowServiceClientLike } from './runtime/workflow_service_client_like.js';
import { Channel } from './runtime/channel.js';
import { Context, background, withTimeout } from './runtime/context.js';
import { Second } from './runtime/time.js';
import { Once } from './runtime/sync.js';
import { IAutoConfigHint as shared_IAutoConfigHint } from '../generated/thrift/cadence-idl/com/uber/cadence/AutoConfigHint.js';
import { IDecision as shared_IDecision, Decision as shared_Decision } from '../generated/thrift/cadence-idl/com/uber/cadence/Decision.js';
import { DecisionType as shared_DecisionType } from '../generated/thrift/cadence-idl/com/uber/cadence/DecisionType.js';
import { EventType as shared_EventType } from '../generated/thrift/cadence-idl/com/uber/cadence/EventType.js';
import { IHistory as shared_IHistory, History as shared_History } from '../generated/thrift/cadence-idl/com/uber/cadence/History.js';
import { IHistoryEvent as shared_IHistoryEvent } from '../generated/thrift/cadence-idl/com/uber/cadence/HistoryEvent.js';
import { IPollForActivityTaskResponse as shared_IPollForActivityTaskResponse } from '../generated/thrift/cadence-idl/com/uber/cadence/PollForActivityTaskResponse.js';
import { IPollForDecisionTaskResponse as shared_IPollForDecisionTaskResponse } from '../generated/thrift/cadence-idl/com/uber/cadence/PollForDecisionTaskResponse.js';
import { IResetStickyTaskListRequest as shared_IResetStickyTaskListRequest, ResetStickyTaskListRequest as shared_ResetStickyTaskListRequest } from '../generated/thrift/cadence-idl/com/uber/cadence/ResetStickyTaskListRequest.js';
import { IRespondDecisionTaskFailedRequest as shared_IRespondDecisionTaskFailedRequest, RespondDecisionTaskFailedRequest as shared_RespondDecisionTaskFailedRequest } from '../generated/thrift/cadence-idl/com/uber/cadence/RespondDecisionTaskFailedRequest.js';
import { StringPtr, BoolPtr, DecisionTypePtr, QueryResultTypePtr, QueryTaskCompletedTypePtr } from './common/convert.js';
import { EstimatedHistorySize, NonDeterministicError, ServerSideHistorySize, StickyCacheStall, DecisionTaskPanicCounter, WorkflowCanceledCounter, WorkflowCompletedCounter, WorkflowContinueAsNewCounter, WorkflowEndToEndLatency, WorkflowFailedCounter, StickyCacheHit, StickyCacheMiss, StickyCacheSize } from './common/metrics/constants.js';
import { localActivityMarkerName, stateMachineIllegalStatePanic, decisionType } from './internal_decision_state_machine.js';
import { nonDeterminismDetectionTypeIllegalStatePanic, nonDeterminismDetectionTypeReplayComparison, tagNonDeterminismDetectionType, tagRunID, tagWorkflowID, tagWorkflowType, tagPanicError, tagPanicStack, tagWorkflowRuntimeLength, tagActivityType, tagDomain } from './internal_logging_tags.js';
import { replayPreviousStartedEventID } from './workflow_replayer.js';
import { matchReplayWithHistory } from './workflow_replayer_utils.js';
import { EmitLatency } from './common/metrics/emit.js';
import { High1ms24h } from './common/metrics/histograms.js';
import { QueryResultType } from '../generated/thrift/cadence-idl/com/uber/cadence/QueryResultType.js';
import { QueryTaskCompletedType } from '../generated/thrift/cadence-idl/com/uber/cadence/QueryTaskCompletedType.js';
import { IRecordActivityTaskHeartbeatResponse as shared_IRecordActivityTaskHeartbeatResponse } from '../generated/thrift/cadence-idl/com/uber/cadence/RecordActivityTaskHeartbeatResponse.js';
import { DomainNotActiveError, EntityNotExistsError, WorkflowExecutionAlreadyCompletedError } from '../errors/idl_errors.js';
import { Logger } from 'winston';

export type activityProvider = (p0: string) => activity | undefined | Promise<activity | undefined>;

export interface autoConfigHintAwareTask {
  getAutoConfigHint(): shared_IAutoConfigHint | undefined;
}

export interface workflowExecutionEventHandler {
  ProcessEvent(event: shared_IHistoryEvent, isReplay: boolean, isLast: boolean): Promise<void>;
  ProcessQuery(queryType: string, queryArgs: Buffer): Promise<Buffer>;
  StackTrace(): Promise<string>;
  Close(): Promise<void>;
}

/**
 * workflowTask wraps a decision task.
 */
export class workflowTask implements autoConfigHintAwareTask {
  constructor(init?: Partial<workflowTask>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  task?: shared_IPollForDecisionTaskResponse;

  autoConfigHint?: shared_IAutoConfigHint;

  historyIterator?: HistoryIterator;

  doneCh?: Channel<{}>;

  laResultCh?: Channel<localActivityResult>;

  getAutoConfigHint(): shared_IAutoConfigHint | undefined {
      if (this.autoConfigHint != null) {
          return this.autoConfigHint!;
      }
      if (this.task != null) {
          return this.task!.autoConfigHint!;
      }
      return undefined;
  }

}

/**
 * activityTask wraps a activity task.
 */
export class activityTask implements autoConfigHintAwareTask {
  constructor(init?: Partial<activityTask>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  task?: shared_IPollForActivityTaskResponse;

  autoConfigHint?: shared_IAutoConfigHint;

  pollStartTime: number = 0;

  getAutoConfigHint(): shared_IAutoConfigHint | undefined {
    if (this.autoConfigHint != null) {
      return this.autoConfigHint!;
    }
    if (this.task != null) {
      return this.task!.autoConfigHint!;
    }
    return undefined;
  }

}

/**
 * resetStickinessTask wraps a ResetStickyTaskListRequest.
 */
export class resetStickinessTask {
  constructor(init?: Partial<resetStickinessTask>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  task?: shared_IResetStickyTaskListRequest;

}

/**
 * workflowExecutionContextImpl is the cached workflow state for sticky execution
 */
export class workflowExecutionContextImpl {
  constructor(init?: Partial<workflowExecutionContextImpl>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  mutex: Mutex = new Mutex();

  workflowStartTime: number = 0;

  workflowInfo?: WorkflowInfo;

  wth?: workflowTaskHandlerImpl;

  eventHandler?: unknown;

  isWorkflowCompleted: boolean = false;

  result: Buffer = Buffer.alloc(0);

  err?: Error | null;

  previousStartedEventID: number = 0;

  newDecisions: shared_IDecision[] = [];

  currentDecisionTask?: shared_IPollForDecisionTaskResponse;

  laTunnel?: localActivityTunnel;

  decisionStartTime: number = 0;

  async Lock(): Promise<void> {
    await this.mutex.acquire();
  }

  async Unlock(err: Error | null): Promise<void> {
    let cleared = false;
    const cache = await getWorkflowCache();
    const cached = await cache.Exist(this.workflowInfo!.WorkflowExecution.RunID);

    if (
      err != null ||
      this.err! != null ||
      this.isWorkflowCompleted ||
      (this.wth!.disableStickyExecution && !this.hasPendingLocalActivityWork())
    ) {
      if (cached) {
        await removeWorkflowContext(this.workflowInfo!.WorkflowExecution.RunID);
      } else {
        await this.clearState();
      }
      cleared = true;
    }

    if (!cleared && !cached) {
      await this.clearState();
    }

    this.mutex.release();
  }

  getEventHandler(): workflowExecutionEventHandlerImpl | undefined {
    const eventHandler = this.eventHandler;
    if (eventHandler == null) {
      return undefined;
    }
    if (!(eventHandler instanceof workflowExecutionEventHandlerImpl)) {
      throw "unknown type for workflow execution event handler";
    }
    return eventHandler;
  }

  completeWorkflow(result: Buffer, err: Error | null): void {
    this.isWorkflowCompleted = true;
    this.result = result;
    this.err = err;
  }

  shouldResetStickyOnEviction(): boolean {
    return this.err == null && !this.isWorkflowCompleted;
  }

  async onEviction(): Promise<void> {
    const release = await this.mutex.acquire();

    try {
      if (this.shouldResetStickyOnEviction()) {
        this.queueResetStickinessTask();
      }

      await this.clearState();
    } finally {
      release();
    }
  }

  IsDestroyed(): boolean {
    return this.getEventHandler() == null;
  }

  queueResetStickinessTask(): void {
    const task = new resetStickinessTask();
    task.task = new shared_ResetStickyTaskListRequest({
      domain: StringPtr(this.workflowInfo!.Domain),
      execution: new shared_WorkflowExecution({
        workflowId: StringPtr(this.workflowInfo!.WorkflowExecution.ID),
        runId: StringPtr(this.workflowInfo!.WorkflowExecution.RunID),
      }),
    });

    if (this.laTunnel != null && this.laTunnel.resultCh != null) {
      this.laTunnel.resultCh.trySend(task);
    }
  }

  async clearState(): Promise<void> {
    this.clearCurrentTask();
    this.isWorkflowCompleted = false;
    this.result = Buffer.alloc(0);
    this.err = null;
    this.previousStartedEventID = 0;
    this.newDecisions = [];

    const eventHandler = this.getEventHandler();
    if (eventHandler != null) {
      eventHandler.isReplay = true;
      await eventHandler.Close();
      this.eventHandler = undefined;
    }
  }

  async createEventHandler(): Promise<void> {
    await this.clearState();
    const eventHandler = newWorkflowExecutionEventHandler(
      this.workflowInfo!,
      this.completeWorkflow.bind(this),
      this.wth!.logger!,
      this.wth!.enableLoggingInReplay,
      this.wth!.metricsScope!,
      this.wth!.registry!,
      this.wth!.dataConverter!,
      this.wth!.contextPropagators,
      this.wth!.tracer!,
      this.wth!.workflowInterceptorFactories,
      this.wth!.featureFlags,
    );
    this.eventHandler = eventHandler;
  }

  async resetStateIfDestroyed(task: shared_IPollForDecisionTaskResponse, historyIterator: HistoryIterator): Promise<void> {
    if (this.IsDestroyed()) {
      try {
        await this.createEventHandler();
      } catch (err) {
        if (!(err instanceof Error)) throw err;
      }

      if (!isFullHistory(task.history!)) {
        await resetHistory(task, historyIterator);
      }
    }
  }

  async ProcessLocalActivityResult(workflowTask: workflowTask, lar: localActivityResult): Promise<unknown | undefined> {
    if (lar.err != null && await this.retryLocalActivity(lar)) {
      return;
    }

    const eventHandler = this.getEventHandler()!;
    await eventHandler.ProcessLocalActivityResult(lar);

    return await this.CompleteDecisionTask(workflowTask, true);
  }

  async retryLocalActivity(lar: localActivityResult): Promise<boolean> {
    if (lar.task!.retryPolicy == null || lar.err! == null || IsCanceledError(lar.err!)) {
      return false;
    }

    const backoff = getRetryBackoff(lar, Date.now() * 1_000_000);
    if (backoff > 0 && backoff <= this.GetDecisionTimeout()) {
      setTimeout(async () => {
        const eventHandler = this.getEventHandler();

        if (eventHandler == null) {
          return;
        }

        if (!(lar.task!.activityID in eventHandler.pendingLaTasks)) {
          return;
        }

        lar.task!.attempt++;

        if (!(await this.laTunnel!.sendTask(lar.task!))) {
          lar.task!.attempt--;
        }
      }, backoff / 1_000_000);

      return true;
    }

    lar.backoff = backoff;
    return false;
  }

  async CompleteDecisionTask(workflowTask: workflowTask, waitLocalActivities: boolean): Promise<unknown | undefined> {
    if (this.currentDecisionTask == null) {
      return;
    }

    const eventHandler = this.getEventHandler()!;

    if (this.hasPendingLocalActivityWork() && this.laTunnel != null) {
      if (Object.keys(eventHandler.unstartedLaTasks).length > 0) {
        const unstartedLaTasks: Record<string, {}> = {};
        for (const activityID of Object.keys(eventHandler.unstartedLaTasks)) {
          const task = eventHandler.pendingLaTasks[activityID]!;
          task.wc = this;
          task.workflowTask = workflowTask;
          if (!(await this.laTunnel!.sendTask(task))) {
            unstartedLaTasks[activityID] = {};
            task.wc = undefined;
            task.workflowTask = undefined;
          }
        }
        eventHandler.unstartedLaTasks = unstartedLaTasks;
      }

      if (waitLocalActivities) {
        return;
      }
    }

    const eventDecisions = eventHandler.decisionsHelper!.getDecisions(true);
    if (eventDecisions.length > 0) {
      this.newDecisions.push(...eventDecisions);
    }

    const completeRequest = await this.wth!.completeWorkflow(
      eventHandler,
      this.currentDecisionTask!,
      this,
      this.newDecisions,
      !waitLocalActivities,
    );
    this.clearCurrentTask();

    return completeRequest;
  }

  hasPendingLocalActivityWork(): boolean {
    const eventHandler = this.getEventHandler();
    return !this.isWorkflowCompleted &&
      this.currentDecisionTask != null &&
      this.currentDecisionTask!.query == null &&
      eventHandler != null &&
      Object.keys(eventHandler.pendingLaTasks).length > 0;
  }

  clearCurrentTask(): void {
    this.newDecisions = [];
    this.currentDecisionTask = undefined;
  }

  skipReplayCheck(): boolean {
    return this.currentDecisionTask!.query != null || !isFullHistory(this.currentDecisionTask!.history!);
  }

  SetCurrentTask(task: shared_IPollForDecisionTaskResponse): void {
    this.currentDecisionTask = task;
    if (task.query == null) {
      this.previousStartedEventID = task.startedEventId?.toNumber() ?? 0;
    }
    this.decisionStartTime = Date.now() * 1_000_000;
  }

  GetDecisionTimeout(): number {
    return Second * this.workflowInfo!.TaskStartToCloseTimeoutSeconds;
  }

  getWorkflowPanicIfIllegaleStatePanic(): [workflowPanicError | undefined, boolean] {
    if (!this.isWorkflowCompleted || this.err == null) {
      return [undefined, false];
    }

    if (!(this.err! instanceof workflowPanicError)) {
      return [undefined, false];
    }

    const panicErr = this.err! as workflowPanicError;
    if (panicErr.value == null) {
      return [undefined, false];
    }

    if (!(panicErr.value instanceof stateMachineIllegalStatePanic)) {
      return [undefined, false];
    }

    return [panicErr, true];
  }

  async ResetIfStale(task: shared_IPollForDecisionTaskResponse, historyIterator: HistoryIterator): Promise<void> {
    if (
      task.history!.events!.length > 0 &&
      (task.history!.events![0]!.eventId?.toNumber() ?? 0) !== this.previousStartedEventID + 1
    ) {
      this.wth!.logger!.debug("Cached state staled, new task has unexpected events", {
        [tagWorkflowID]: task.workflowExecution!.workflowId ?? "",
        [tagRunID]: task.workflowExecution!.runId ?? "",
        CachedPreviousStartedEventID: this.previousStartedEventID,
        TaskFirstEventID: task.history!.events![0]!.eventId?.toNumber() ?? 0,
        TaskStartedEventID: task.startedEventId?.toNumber() ?? 0,
        TaskPreviousStartedEventID: task.previousStartedEventId?.toNumber() ?? 0,
      });

      this.wth!.metricsScope!
        .GetTaggedScope(tagWorkflowType, task.workflowType!.name ?? "")
        .Counter(StickyCacheStall)
        .Inc(1);

      try {
        await this.clearState();
      } catch (err) {
        if (!(err instanceof Error)) throw err;
      }

      await this.resetStateIfDestroyed(task, historyIterator);
    }
  }

  async ProcessWorkflowTask(workflowTask: workflowTask): Promise<unknown> {
    const task = workflowTask.task!;
    const historyIterator = workflowTask.historyIterator!;
    this.workflowInfo!.HistoryBytesServer = task.totalHistoryBytes?.toNumber() ?? 0;
    this.workflowInfo!.HistoryCount = (task.nextEventId?.toNumber() ?? 0) - 1;
    await this.ResetIfStale(task, historyIterator);
    this.SetCurrentTask(task);

    const eventHandler = this.getEventHandler()!;
    const reorderedHistory = newHistory(workflowTask, eventHandler);
    let replayDecisions: shared_IDecision[] = [];
    let respondEvents: shared_IHistoryEvent[] = [];

    const skipReplayCheck = this.skipReplayCheck();
    const isReplayTest = (task.previousStartedEventId?.toNumber() ?? 0) === replayPreviousStartedEventID;
    if (isReplayTest) {
      this.wth!.logger!.info("Processing workflow task in replay test mode", {
        [tagWorkflowType]: task.workflowType?.name ?? "",
        [tagWorkflowID]: task.workflowExecution?.workflowId ?? "",
        [tagRunID]: task.workflowExecution?.runId ?? "",
      });
    }

    ProcessEvents: for (;;) {
      const [reorderedEvents, markers, binaryChecksum] = await reorderedHistory.NextDecisionEvents();
      this.wth!.metricsScope!.GetTaggedScope(
        "workflowtype",
        this.workflowInfo!.WorkflowType.Name,
      ).Gauge(EstimatedHistorySize).Update(this.workflowInfo!.TotalHistoryBytes);
      this.wth!.metricsScope!.GetTaggedScope(
        "workflowtype",
        this.workflowInfo!.WorkflowType.Name,
      ).Gauge(ServerSideHistorySize).Update(this.workflowInfo!.HistoryBytesServer);

      if (reorderedEvents.length === 0) {
        break ProcessEvents;
      }

      if (binaryChecksum == null) {
        this.workflowInfo!.BinaryChecksum = StringPtr(await getBinaryChecksum());
      } else {
        this.workflowInfo!.BinaryChecksum = binaryChecksum;
      }

      for (const marker of markers) {
        if ((marker.markerRecordedEventAttributes?.markerName ?? "") !== localActivityMarkerName) {
          await eventHandler.ProcessEvent(marker, true, false);
          if (this.isWorkflowCompleted) {
            break ProcessEvents;
          }
        }
      }

      for (let i = 0; i < reorderedEvents.length; i++) {
        const event = reorderedEvents[i];
        const isInReplay = reorderedHistory.IsReplayEvent(event);
        const isLast = !isInReplay && i === reorderedEvents.length - 1;

        if (!skipReplayCheck && isDecisionEvent(event.eventType!)) {
          respondEvents.push(event);
        }

        if (isPreloadMarkerEvent(event)) {
          continue;
        }

        await this.wth!.executeAnyPressurePoints(event, isInReplay);
        await eventHandler.ProcessEvent(event, isInReplay, isLast);

        if (this.isWorkflowCompleted) {
          break ProcessEvents;
        }
      }

      for (const marker of markers) {
        if ((marker.markerRecordedEventAttributes?.markerName ?? "") === localActivityMarkerName) {
          await eventHandler.ProcessEvent(marker, true, false);
          if (this.isWorkflowCompleted) {
            break ProcessEvents;
          }
        }
      }

      const isReplay = reorderedEvents.length > 0 &&
        reorderedHistory.IsReplayEvent(reorderedEvents[reorderedEvents.length - 1]);
      const lastDecisionEventsForReplayTest =
        isReplayTest && !reorderedHistory.HasNextDecisionEvents();

      if (isReplay && !lastDecisionEventsForReplayTest) {
        const eventDecisions = eventHandler.decisionsHelper!.getDecisions(true);
        if (eventDecisions.length > 0 && !skipReplayCheck) {
          replayDecisions.push(...eventDecisions);
        }
      }
    }

    let nonDeterministicErr: Error | null = null;
    let nonDeterminismType = nonDeterminismDetectionTypeReplayComparison;

    if ((!skipReplayCheck && !this.isWorkflowCompleted) || isReplayTest) {
      try {
        matchReplayWithHistory(this.workflowInfo!, replayDecisions, respondEvents);
      } catch (err) {
        if (!(err instanceof Error)) {
          throw err;
        }
        nonDeterministicErr = err;
        nonDeterminismType = nonDeterminismDetectionTypeReplayComparison;
      }
    } else {
      const [panicErr, ok] = this.getWorkflowPanicIfIllegaleStatePanic();
      if (ok) {
        nonDeterministicErr = panicErr!;
        nonDeterminismType = nonDeterminismDetectionTypeIllegalStatePanic;

        let replayErr: Error | null = null;
        try {
          matchReplayWithHistory(this.workflowInfo!, replayDecisions, respondEvents);
        } catch (err) {
          if (!(err instanceof Error)) {
            throw err;
          }
          replayErr = err;
        }

        this.wth!.logger!.error("Illegal state caused panic", {
          [tagWorkflowType]: task.workflowType?.name ?? "",
          [tagWorkflowID]: task.workflowExecution?.workflowId ?? "",
          [tagRunID]: task.workflowExecution?.runId ?? "",
          error: nonDeterministicErr,
          ReplayError: replayErr,
        });
      }
    }

    if (nonDeterministicErr != null) {
      const scope = this.wth!.metricsScope!.GetTaggedScope(
        tagWorkflowType,
        task.workflowType?.name ?? "",
        tagNonDeterminismDetectionType,
        String(nonDeterminismType),
      );
      scope.Counter(NonDeterministicError).Inc(1);

      this.wth!.logger!.error("non-deterministic-error", {
        [tagWorkflowType]: task.workflowType?.name ?? "",
        [tagWorkflowID]: task.workflowExecution?.workflowId ?? "",
        [tagRunID]: task.workflowExecution?.runId ?? "",
        error: nonDeterministicErr,
      });

      switch (this.wth!.nonDeterministicWorkflowPolicy) {
        case internal_NonDeterministicWorkflowPolicy.NonDeterministicWorkflowPolicyFailWorkflow:
          try {
            await eventHandler.Complete(
              undefined,
              NewCustomError("NonDeterministicWorkflowPolicyFailWorkflow", nonDeterministicErr.message),
            );
          } catch (err) {
            if (!(err instanceof Error)) {
              throw err;
            }
          }
          break;
        case internal_NonDeterministicWorkflowPolicy.NonDeterministicWorkflowPolicyBlockWorkflow:
          throw nonDeterministicErr;
        default:
          throw "unknown mismatched workflow history policy.";
      }
    }

    return await this.CompleteDecisionTask(workflowTask, true);
  }

}

/**
 * workflowTaskHandlerImpl is the implementation of WorkflowTaskHandler
 */
export class workflowTaskHandlerImpl implements WorkflowTaskHandler {
  constructor(init?: Partial<workflowTaskHandlerImpl>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  domain: string = "";

  metricsScope?: TaggedScope;

  ppMgr?: pressurePointMgr;

  logger?: Logger;

  identity: string = "";

  enableLoggingInReplay: boolean = false;

  disableStickyExecution: boolean = false;

  registry?: registry;

  laTunnel?: localActivityTunnel;

  nonDeterministicWorkflowPolicy: internal_NonDeterministicWorkflowPolicy = 0;

  dataConverter?: internal_DataConverter;

  contextPropagators: internal_ContextPropagator[] = [];

  tracer?: unknown;

  workflowInterceptorFactories: internal_WorkflowInterceptorFactory[] = [];

  disableStrictNonDeterminism: boolean = false;

  featureFlags: internal_FeatureFlags = { WorkflowExecutionAlreadyCompletedErrorEnabled: false, AutoforwardingEnabled: false, PollerAutoScalerEnabled: false, EphemeralTaskListsEnabled: false, MetricEmitMode: 0 };

  async createWorkflowContext(task: shared_IPollForDecisionTaskResponse): Promise<workflowExecutionContextImpl> {
    const h = task.history!;
    const attributes = h.events![0].workflowExecutionStartedEventAttributes;
    if (attributes == null) {
      throw new Error("first history event is not WorkflowExecutionStarted");
    }

    const taskList = attributes.taskList;
    if (taskList == null) {
      throw new Error("nil TaskList in WorkflowExecutionStarted event");
    }

    const runID = task.workflowExecution!.runId ?? "";
    const workflowID = task.workflowExecution!.workflowId ?? "";

    let parentWorkflowExecution: internal_WorkflowExecution | undefined;
    if (attributes.parentWorkflowExecution != null) {
      parentWorkflowExecution = {
        ID: attributes.parentWorkflowExecution.workflowId ?? "",
        RunID: attributes.parentWorkflowExecution.runId ?? "",
      };
    }

    const workflowInfo = new WorkflowInfo({
      WorkflowExecution: {
        ID: workflowID,
        RunID: runID,
      },
      OriginalRunId: attributes.originalExecutionRunId ?? "",
      WorkflowType: flowWorkflowTypeFrom(task.workflowType!),
      TaskListName: taskList.name ?? "",
      ExecutionStartToCloseTimeoutSeconds: attributes.executionStartToCloseTimeoutSeconds ?? 0,
      TaskStartToCloseTimeoutSeconds: attributes.taskStartToCloseTimeoutSeconds ?? 0,
      Domain: this.domain,
      Attempt: attributes.attempt ?? 0,
      lastCompletionResult: attributes.lastCompletionResult ?? Buffer.alloc(0),
      CronSchedule: attributes.cronSchedule,
      ContinuedExecutionRunID: attributes.continuedExecutionRunId != null ? new Ref(attributes.continuedExecutionRunId) : undefined,
      ParentWorkflowDomain: attributes.parentWorkflowDomain != null ? new Ref(attributes.parentWorkflowDomain) : undefined,
      ParentWorkflowExecution: parentWorkflowExecution,
      Memo: attributes.memo!,
      SearchAttributes: attributes.searchAttributes!,
      RetryPolicy: attributes.retryPolicy!,
      DecisionStartedEventID: 0,
      HistoryBytesServer: 0,
      HistoryCount: 0,
      TotalHistoryBytes: 0,
    });

    const wfStartTime = h.events![0].timestamp?.toNumber() ?? 0;
    return await newWorkflowExecutionContext(wfStartTime, workflowInfo, this);
  }

  async getOrCreateWorkflowContext(task: shared_IPollForDecisionTaskResponse, historyIterator: HistoryIterator): Promise<workflowExecutionContextImpl> {
    const metricsScope = this.metricsScope!.GetTaggedScope(tagWorkflowType, task.workflowType?.name ?? "");
    let workflowContext: workflowExecutionContextImpl | undefined;
    let history = task.history!;
    const isFullHistoryLocal = isFullHistory(history);
    let completed = false;

    try {
      const runID = task.workflowExecution?.runId ?? "";

      if (task.query == null || (task.query != null && !isFullHistoryLocal)) {
        workflowContext = await getWorkflowContext(runID);
      }

      if (workflowContext != null) {
        await workflowContext.Lock();

        const scope = metricsScope.Tagged({
          [tagWorkflowRuntimeLength]: workflowCategorizedByTimeout(workflowContext),
        });

        if (task.query != null && !isFullHistoryLocal) {
          scope.Counter(StickyCacheHit).Inc(1);
        } else if ((history.events![0]!.eventId?.toNumber() ?? 0) === workflowContext.previousStartedEventID + 1) {
          scope.Counter(StickyCacheHit).Inc(1);
        } else {
          await workflowContext.ResetIfStale(task, historyIterator);
        }
      } else {
        if (!isFullHistoryLocal) {
          metricsScope.Counter(StickyCacheMiss).Inc(1);
          history = await resetHistory(task, historyIterator);
        }

        workflowContext = await this.createWorkflowContext(task);

        if (!this.disableStickyExecution && task.query == null) {
          try {
            workflowContext = await putWorkflowContext(runID, workflowContext);
          } catch (err) {
            if (!(err instanceof Error)) {
              throw err;
            }
          }
        }

        await workflowContext.Lock();
      }

      try {
        await workflowContext.resetStateIfDestroyed(task, historyIterator);
      } catch (err) {
        if (!(err instanceof Error)) {
          throw err;
        }

        try {
          await workflowContext.Unlock(err);
        } catch (unlockErr) {
          if (!(unlockErr instanceof Error)) {
            throw unlockErr;
          }
        }

        throw err;
      }

      completed = true;
      return workflowContext;
    } finally {
      if (completed && workflowContext != null && workflowContext.laTunnel == null) {
        workflowContext.laTunnel = this.laTunnel;
      }

      const cache = await getWorkflowCache();
      metricsScope.Gauge(StickyCacheSize).Update(await cache.Size());
    }
  }

  async executeAnyPressurePoints(event: shared_IHistoryEvent, isInReplay: boolean): Promise<void> {
    if (this.ppMgr != null && !isInReplay) {
      switch (event.eventType) {
        case shared_EventType.DecisionTaskStarted:
          await this.ppMgr!.Execute(pressurePointTypeDecisionTaskStartTimeout);
          return;
        case shared_EventType.ActivityTaskScheduled:
          await this.ppMgr!.Execute(pressurePointTypeActivityTaskScheduleTimeout);
          return;
        case shared_EventType.ActivityTaskStarted:
          await this.ppMgr!.Execute(pressurePointTypeActivityTaskStartTimeout);
          return;
        case shared_EventType.DecisionTaskCompleted:
          await this.ppMgr!.Execute(pressurePointTypeDecisionTaskCompleted);
          return;
      }
    }
  }

  async ProcessWorkflowTask(workflowTask: workflowTask | undefined, heartbeatFunc: decisionHeartbeatFunc | undefined): Promise<unknown | undefined> {
    if (workflowTask == null || workflowTask.task == null) {
      throw new globalThis.Error("nil workflow task provided");
    }

    const task = workflowTask.task!;
    if (task.history == null || (task.history.events?.length ?? 0) === 0) {
      task.history = new shared_History({ events: [] });
    }
    if (task.query == null && (task.history!.events?.length ?? 0) === 0) {
      throw new globalThis.Error("nil or empty history");
    }

    if (task.query != null && (task.queries?.size ?? 0) !== 0) {
      throw new globalThis.Error("invalid query decision task");
    }

    const runID = task.workflowExecution?.runId ?? "";
    const workflowID = task.workflowExecution?.workflowId ?? "";
    traceLog(() => {
      this.logger!.debug("Processing new workflow task.", {
        [tagWorkflowType]: task.workflowType?.name ?? "",
        [tagWorkflowID]: workflowID,
        [tagRunID]: runID,
        PreviousStartedEventId: task.previousStartedEventId?.toNumber() ?? 0,
      });
    });

    const workflowContext = await this.getOrCreateWorkflowContext(task, workflowTask.historyIterator!);
    let errRet: Error | null = null;

    try {
      let response: unknown;

      for (;;) {
        const startTime = Date.now() * 1_000_000;
        response = await workflowContext.ProcessWorkflowTask(workflowTask);

        if (response == null) {
          for (;;) {
            const deadlineToTrigger = Math.trunc(
              ratioToForceCompleteDecisionTaskComplete * workflowContext.GetDecisionTimeout(),
            );
            const delayDuration = startTime + deadlineToTrigger - Date.now() * 1_000_000;

            const outcome = await selectOne([
              mapCase(timeoutCase(delayDuration), () => ({ kind: "timeout" as const })),
              mapCase(recvCase(workflowTask!.laResultCh), (result) => ({
                kind: "localActivity" as const,
                result,
              })),
            ]);

            if (outcome.kind === "timeout") {
              try {
                workflowTask = await heartbeatFunc!(
                  workflowContext.CompleteDecisionTask(workflowTask, false),
                  startTime,
                );
              } catch (err) {
                if (!(err instanceof Error)) {
                  throw err;
                }
                throw new decisionHeartbeatError({
                  Message: `error sending decision heartbeat ${err.message}`,
                });
              }

              if (workflowTask == null) {
                return;
              }
              break;
            }

            response = await workflowContext.ProcessLocalActivityResult(
              workflowTask,
              outcome.result.value!,
            );
            if (response == null) {
              continue;
            }
            return response;
          }
        }

        return response;
      }
    } catch (err) {
      if (!(err instanceof Error)) {
        throw err;
      }
      errRet = err;
      throw err;
    } finally {
      await workflowContext.Unlock(errRet);
    }
  }

  async completeWorkflow(eventHandler: workflowExecutionEventHandlerImpl, task: shared_IPollForDecisionTaskResponse, workflowContext: workflowExecutionContextImpl, decisions: shared_IDecision[], forceNewDecision: boolean): Promise<unknown> {
    if (task.query != null) {
      const queryCompletedRequest = new shared_RespondQueryTaskCompletedRequest({
        taskToken: task.taskToken!,
      });
      const query = task.query;

      if (workflowContext.err instanceof internal_PanicError) {
        const panicErr = workflowContext.err;
        this.logger!.warn("Encountered PanicError in workflow query task", {
          [tagWorkflowID]: task.workflowExecution?.workflowId ?? "",
          [tagRunID]: task.workflowExecution?.runId ?? "",
          [tagPanicError]: panicErr.Error(),
          [tagPanicStack]: panicErr.StackTrace(),
        });

        queryCompletedRequest.completedType = QueryTaskCompletedTypePtr(QueryTaskCompletedType.FAILED);
        queryCompletedRequest.errorMessage = StringPtr(`Workflow panic: ${panicErr.Error()}`);
        return queryCompletedRequest;
      }

      if (workflowContext.err instanceof workflowPanicError) {
        const workflowPanicErr = workflowContext.err;
        this.logger!.warn("Ignored workflow panic error for query, query result may be partial", {
          [tagWorkflowID]: task.workflowExecution?.workflowId ?? "",
          [tagRunID]: task.workflowExecution?.runId ?? "",
          [tagPanicError]: workflowPanicErr.Error(),
          [tagPanicStack]: workflowPanicErr.StackTrace(),
          PreviousStartedEventID: task.previousStartedEventId?.toNumber() ?? 0,
        });
      }

      try {
        const result = await eventHandler.ProcessQuery(
          query.queryType ?? "",
          query.queryArgs!,
        );
        queryCompletedRequest.completedType = QueryTaskCompletedTypePtr(QueryTaskCompletedType.COMPLETED);
        queryCompletedRequest.queryResult = result;
      } catch (caught) {
        if (!(caught instanceof Error)) {
          throw caught;
        }
        queryCompletedRequest.completedType = QueryTaskCompletedTypePtr(QueryTaskCompletedType.FAILED);
        queryCompletedRequest.errorMessage = StringPtr(caught.message);
      }

      return queryCompletedRequest;
    }

    const metricsScope = this.metricsScope!.GetTaggedScope(
      tagWorkflowType,
      eventHandler.workflowInfo!.WorkflowType.Name,
    );

    if (workflowContext.err instanceof workflowPanicError) {
      const panicErr = workflowContext.err;
      metricsScope.Counter(DecisionTaskPanicCounter).Inc(1);
      this.logger!.error("Workflow panic.", {
        [tagWorkflowType]: task.workflowType?.name ?? "",
        [tagWorkflowID]: task.workflowExecution?.workflowId ?? "",
        [tagRunID]: task.workflowExecution?.runId ?? "",
        [tagPanicError]: panicErr.Error(),
        [tagPanicStack]: panicErr.StackTrace(),
      });
      return await errorToFailDecisionTask(task.taskToken!, panicErr, this.identity);
    }

    let closeDecision: shared_IDecision | undefined;

    if (workflowContext.err instanceof internal_CanceledError) {
      const canceledErr = workflowContext.err;
      metricsScope.Counter(WorkflowCanceledCounter).Inc(1);
      closeDecision = createNewDecision(shared_DecisionType.CancelWorkflowExecution);
      const [, details] = getErrorDetails(canceledErr, this.dataConverter!);
      closeDecision.cancelWorkflowExecutionDecisionAttributes =
        new shared_CancelWorkflowExecutionDecisionAttributes({ details });
    } else if (workflowContext.err instanceof internal_ContinueAsNewError) {
      const contErr = workflowContext.err;
      const params = contErr.params!;
      metricsScope.Counter(WorkflowContinueAsNewCounter).Inc(1);
      closeDecision = createNewDecision(shared_DecisionType.ContinueAsNewWorkflowExecution);
      closeDecision.continueAsNewWorkflowExecutionDecisionAttributes =
        new shared_ContinueAsNewWorkflowExecutionDecisionAttributes({
          workflowType: workflowTypePtr(params.workflowType!),
          input: params.input,
          taskList: new shared_TaskList({ name: params.taskListName }),
          executionStartToCloseTimeoutSeconds: params.executionStartToCloseTimeoutSeconds,
          taskStartToCloseTimeoutSeconds: params.taskStartToCloseTimeoutSeconds,
          header: params.header,
          memo: workflowContext.workflowInfo!.Memo,
          searchAttributes: workflowContext.workflowInfo!.SearchAttributes,
          retryPolicy: workflowContext.workflowInfo!.RetryPolicy,
        });
    } else if (workflowContext.err != null) {
      metricsScope.Counter(WorkflowFailedCounter).Inc(1);
      closeDecision = createNewDecision(shared_DecisionType.FailWorkflowExecution);
      const [reason, details] = getErrorDetails(workflowContext.err!, this.dataConverter!);
      closeDecision.failWorkflowExecutionDecisionAttributes =
        new shared_FailWorkflowExecutionDecisionAttributes({
          reason: StringPtr(reason),
          details,
        });
    } else if (workflowContext.isWorkflowCompleted) {
      metricsScope.Counter(WorkflowCompletedCounter).Inc(1);
      closeDecision = createNewDecision(shared_DecisionType.CompleteWorkflowExecution);
      closeDecision.completeWorkflowExecutionDecisionAttributes =
        new shared_CompleteWorkflowExecutionDecisionAttributes({
          result: workflowContext.result,
        });
    }

    if (closeDecision != null) {
      decisions = [...decisions, closeDecision];
      EmitLatency(
        metricsScope,
        WorkflowEndToEndLatency,
        Date.now() * 1_000_000 - workflowContext.workflowStartTime,
        High1ms24h,
      );
      forceNewDecision = false;
    }

    let queryResults: Map<string, shared_WorkflowQueryResult> | undefined;
    if (task.queries != null && task.queries.size !== 0) {
      queryResults = new Map<string, shared_WorkflowQueryResult>();
      for (const [queryID, query] of task.queries) {
        try {
          const result = await eventHandler.ProcessQuery(
            query.queryType ?? "",
            query.queryArgs!,
          );
          queryResults.set(
            queryID,
            new shared_WorkflowQueryResult({
              resultType: QueryResultTypePtr(QueryResultType.ANSWERED),
              answer: result,
            }),
          );
        } catch (caught) {
          if (!(caught instanceof Error)) {
            throw caught;
          }
          queryResults.set(
            queryID,
            new shared_WorkflowQueryResult({
              resultType: QueryResultTypePtr(QueryResultType.FAILED),
              errorMessage: StringPtr(caught.message),
            }),
          );
        }
      }
    }

    return new shared_RespondDecisionTaskCompletedRequest({
      taskToken: task.taskToken!,
      decisions,
      identity: StringPtr(this.identity),
      returnNewDecisionTask: BoolPtr(true),
      forceCreateNewDecisionTask: BoolPtr(forceNewDecision),
      binaryChecksum: StringPtr(await getBinaryChecksum()),
      queryResults,
    });
  }

}

/**
 * history wrapper method to help information about events.
 */
export class history {
  constructor(init?: Partial<history>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  workflowTask?: workflowTask;

  eventsHandler?: workflowExecutionEventHandlerImpl;

  loadedEvents: shared_IHistoryEvent[] = [];

  currentIndex: number = 0;

  nextEventID: number = 0;

  lastEventID: number = 0;

  next?: shared_IHistoryEvent[];

  binaryChecksum?: string;

  GetWorkflowStartedEvent(): shared_IHistoryEvent {
      const events = this.workflowTask!.task!.history!.events!;
      if (events.length === 0 || (events[0].eventType ?? 0) !== shared_EventType.WorkflowExecutionStarted) {
          throw new Error("unable to find WorkflowExecutionStartedEventAttributes in the history");
      }
      return events[0];
  }

  IsReplayEvent(event: shared_IHistoryEvent): boolean {
    return (event.eventId?.toNumber() ?? 0) <=
      (this.workflowTask!.task!.previousStartedEventId?.toNumber() ?? 0) ||
      isDecisionEvent(event.eventType!);
  }

  async IsNextDecisionFailed(): Promise<[boolean, string | undefined]> {
    const nextIndex = this.currentIndex + 1;
    if (nextIndex >= this.loadedEvents.length && this.hasMoreEvents()) {
      await this.loadMoreEvents();
    }

    if (nextIndex < this.loadedEvents.length) {
      const nextEvent = this.loadedEvents[nextIndex]!;
      const nextEventType = nextEvent.eventType;
      const isFailed =
        nextEventType === shared_EventType.DecisionTaskTimedOut ||
        nextEventType === shared_EventType.DecisionTaskFailed;
      let binaryChecksum: string | undefined;
      if (nextEventType === shared_EventType.DecisionTaskCompleted) {
        binaryChecksum =
          nextEvent.decisionTaskCompletedEventAttributes!.binaryChecksum!;
      }
      return [isFailed, binaryChecksum];
    }
    return [false, undefined];
  }

  async loadMoreEvents(): Promise<void> {
    const historyPage = await this.getMoreEvents();
    this.loadedEvents.push(...historyPage.events!);
    if (this.nextEventID === 0 && this.loadedEvents.length > 0) {
      this.nextEventID = this.loadedEvents[0]!.eventId?.toNumber() ?? 0;
    }
  }

  async NextDecisionEvents(): Promise<[shared_IHistoryEvent[], shared_IHistoryEvent[], string | undefined]> {
      if (this.next == null) {
        const [next] = await this.nextDecisionEvents();
        this.next = next;
      }

      const result = this.next!;
      let markers: shared_IHistoryEvent[] = [];
      const checksum = this.binaryChecksum!;
      if (result.length > 0) {
        const [next, nextMarkers] = await this.nextDecisionEvents();
        this.next = next;
        markers = nextMarkers;
      }
      return [result, markers, checksum];
    }

  HasNextDecisionEvents(): boolean {
    return (this.next?.length ?? 0) !== 0 ||
      this.currentIndex !== this.loadedEvents.length ||
      this.hasMoreEvents();
  }

  hasMoreEvents(): boolean {
    const historyIterator = this.workflowTask!.historyIterator!;
    return historyIterator != null && historyIterator.HasNextPage();
  }

  async getMoreEvents(): Promise<shared_IHistory> {
      return await this.workflowTask!.historyIterator!.GetNextPage();
  }

  async nextDecisionEvents(): Promise<[shared_IHistoryEvent[], shared_IHistoryEvent[]]> {
    if (this.currentIndex === this.loadedEvents.length && !this.hasMoreEvents()) {
      this.verifyAllEventsProcessed();
      return [[], []];
    }

    const nextEvents: shared_IHistoryEvent[] = [];
    const markers: shared_IHistoryEvent[] = [];

    OrderEvents: for (;;) {
      while (this.currentIndex === this.loadedEvents.length) {
        if (!this.hasMoreEvents()) {
          this.verifyAllEventsProcessed();
          break OrderEvents;
        }
        await this.loadMoreEvents();
      }

      const event = this.loadedEvents[this.currentIndex]!;
      const eventID = event.eventId?.toNumber() ?? 0;
      if (eventID !== this.nextEventID) {
        throw new Error(
          `missing history events, expectedNextEventID=${this.nextEventID} but receivedNextEventID=${eventID}`,
        );
      }

      this.nextEventID++;

      switch (event.eventType) {
        case shared_EventType.DecisionTaskStarted: {
          const [isFailed, binaryChecksum] = await this.IsNextDecisionFailed();
          if (!isFailed) {
            this.binaryChecksum = binaryChecksum;
            this.currentIndex++;
            nextEvents.push(event);
            break OrderEvents;
          }
          break;
        }
        case shared_EventType.DecisionTaskScheduled:
        case shared_EventType.DecisionTaskTimedOut:
        case shared_EventType.DecisionTaskFailed:
          break;
        default:
          if (isPreloadMarkerEvent(event)) {
            markers.push(event);
          }
          nextEvents.push(event);
      }

      this.currentIndex++;
    }

    this.loadedEvents = this.loadedEvents.slice(this.currentIndex);
    this.currentIndex = 0;

    return [nextEvents, markers];
  }

  verifyAllEventsProcessed(): void {
    if (this.lastEventID > 0 && this.nextEventID <= this.lastEventID) {
      throw new Error(
        `history_events: premature end of stream, expectedLastEventID=${this.lastEventID} but no more events after eventID=${this.nextEventID - 1}`,
      );
    }
    if (this.lastEventID > 0 && this.nextEventID !== this.lastEventID + 1) {
      this.eventsHandler!.logger!.warn(
        "history_events: processed events past the expected lastEventID",
        {
          expectedLastEventID: this.lastEventID,
          processedLastEventID: this.nextEventID - 1,
        },
      );
    }
  }

}

export class decisionHeartbeatError extends globalThis.Error {
  constructor(init?: Partial<decisionHeartbeatError>) {
    super(typeof init?.message === "string" ? init.message : "");
    this.name = "decisionHeartbeatError";
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
    if (typeof init?.message !== "string") {
      this.message = this.Error();
    }
  }

  Message: string = "";

  Error(): string {
    return this.Message;
  }

}

export class cadenceInvoker implements ServiceInvoker {
  constructor(init?: Partial<cadenceInvoker>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  Mutex: Mutex = new Mutex();

  identity: string = "";

  service?: WorkflowServiceClientLike;

  taskToken: Buffer = Buffer.alloc(0);

  cancelHandler?: () => void | Promise<void>;

  heartBeatTimeoutInSec: number = 0;

  hbBatchEndTimer?: ReturnType<typeof setTimeout>;

  detailsToReport?: Buffer;

  lastDetailsReported?: Buffer;

  closeCh?: Channel<{}>;

  workerStopChannel?: Channel<{}>;

  featureFlags: internal_FeatureFlags = { WorkflowExecutionAlreadyCompletedErrorEnabled: false, AutoforwardingEnabled: false, PollerAutoScalerEnabled: false, EphemeralTaskListsEnabled: false, MetricEmitMode: 0 };

  logger?: Logger;

  workflowType: string = "";

  activityType: string = "";

  async Heartbeat(details: Buffer): Promise<void> {
    await this.Lock();
    try {
      await this.internalHeartBeat(details);
    } finally {
      this.Unlock();
    }
  }

  async BackgroundHeartbeat(): Promise<void> {
    await this.Lock();
    try {
      if (this.hbBatchEndTimer != null) {
        if (this.detailsToReport == null) {
          this.detailsToReport = this.lastDetailsReported;
        }

        return;
      }

      let details: Buffer = Buffer.alloc(0);
      if (this.detailsToReport != null) {
        details = this.detailsToReport!;
      } else if (this.lastDetailsReported != null) {
        details = this.lastDetailsReported!;
      }

      await this.heartbeatAndScheduleNextRun(details);
    } finally {
      this.Unlock();
    }
  }

  async BatchHeartbeat(details: Buffer): Promise<void> {
    await this.Lock();
    try {
      if (this.hbBatchEndTimer != null) {
        this.detailsToReport = details;
        return;
      }

      await this.heartbeatAndScheduleNextRun(details);
    } finally {
      this.Unlock();
    }
  }

  async heartbeatAndScheduleNextRun(details: Buffer): Promise<void> {
    const isActivityCancelled = await this.internalHeartBeat(details);

    this.lastDetailsReported = details;
    this.detailsToReport = undefined;

    let deadlineToTrigger = this.heartBeatTimeoutInSec;
    if (deadlineToTrigger <= 0) {
      deadlineToTrigger = defaultHeartBeatIntervalInSec;
    }

    const duration = Math.trunc(0.8 * deadlineToTrigger) * Second;
    const timerFired = new Promise<void>((resolve) => {
      this.hbBatchEndTimer = setTimeout(resolve, duration / 1_000_000);
    });

    void (async () => {
      const outcome = await selectOne([
        mapCase(promiseCase(timerFired), () => ({ kind: 'timer' as const })),
        mapCase(recvCase(this.workerStopChannel), () => ({ kind: 'workerStop' as const })),
        mapCase(recvCase(this.closeCh), () => ({ kind: 'close' as const })),
      ]);

      if (outcome.kind === 'close') {
        return;
      }

      await this.Lock();
      const detailsToReport = this.detailsToReport;
      clearTimeout(this.hbBatchEndTimer!);
      this.hbBatchEndTimer = undefined;

      let err: Error | null = null;
      if (detailsToReport != null) {
        try {
          await this.heartbeatAndScheduleNextRun(detailsToReport);
        } catch (caught) {
          if (!(caught instanceof Error)) {
            throw caught;
          }
          err = caught;
        }
      }

      this.Unlock();
      this.logFailedHeartBeat(err);
    })();
  }

  async internalHeartBeat(details: Buffer): Promise<boolean> {
    let isActivityCancelled = false;
    let timeout = Math.trunc(this.heartBeatTimeoutInSec) * Second;
    if (timeout <= 0) {
      timeout = defaultHeartBeatIntervalInSec * Second;
    }

    const [ctx, cancel] = withTimeout(background(), timeout);

    try {
      let err: Error | null = null;
      try {
        await recordActivityHeartbeat(ctx, this.service!, this.identity, this.taskToken, details, this.featureFlags);
      } catch (e) {
        if (!(e instanceof Error)) {
          throw e;
        }
        err = e;
      }

      if (err instanceof internal_CanceledError) {
        await this.cancelHandler!();
        isActivityCancelled = true;
      } else if (
        err instanceof EntityNotExistsError ||
        err instanceof WorkflowExecutionAlreadyCompletedError ||
        err instanceof DomainNotActiveError
      ) {
        await this.cancelHandler!();
        isActivityCancelled = true;
      }

      return isActivityCancelled;
    } finally {
      cancel();
    }
  }

  async Close(flushBufferedHeartbeat: boolean): Promise<void> {
    await this.Lock();
    try {
      this.closeCh!.close();
      if (this.hbBatchEndTimer != null) {
        clearTimeout(this.hbBatchEndTimer!);
        if (flushBufferedHeartbeat && this.detailsToReport != null) {
          await this.internalHeartBeat(this.detailsToReport!);
          this.lastDetailsReported = this.detailsToReport;
          this.detailsToReport = undefined;
        }
      }
    } finally {
      this.Unlock();
    }
  }

  async SignalWorkflow(ctx: Context, domain: string, workflowID: string, runID: string, signalName: string, signalInput: Buffer): Promise<void> {
    await signalWorkflow(ctx, this.service!, this.identity, domain, workflowID, runID, signalName, signalInput, this.featureFlags);
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

  logFailedHeartBeat(err: Error | null): void {
    if (err != null && !(err instanceof internal_CanceledError)) {
      this.logger!.error("Failed to send heartbeat", {
        error: err,
        [tagWorkflowType]: this.workflowType,
        [tagActivityType]: this.activityType,
      });
    }
  }

}

export function newHistory(task: workflowTask, eventsHandler: workflowExecutionEventHandlerImpl): history {
  const result = new history({
    workflowTask: task,
    eventsHandler,
    loadedEvents: task.task!.history!.events!,
    currentIndex: 0,
    lastEventID: task.task!.startedEventId?.toNumber() ?? 0,
    nextEventID: 0,
  });
  if (result.loadedEvents.length > 0) {
    result.nextEventID = result.loadedEvents[0].eventId?.toNumber() ?? 0;
  }
  return result;
}

export function isDecisionEvent(eventType: shared_EventType): boolean {
    switch (eventType) {
        case shared_EventType.WorkflowExecutionCompleted:
        case shared_EventType.WorkflowExecutionFailed:
        case shared_EventType.WorkflowExecutionCanceled:
        case shared_EventType.WorkflowExecutionContinuedAsNew:
        case shared_EventType.ActivityTaskScheduled:
        case shared_EventType.ActivityTaskCancelRequested:
        case shared_EventType.TimerStarted:
        case shared_EventType.TimerCanceled:
        case shared_EventType.CancelTimerFailed:
        case shared_EventType.MarkerRecorded:
        case shared_EventType.StartChildWorkflowExecutionInitiated:
        case shared_EventType.RequestCancelExternalWorkflowExecutionInitiated:
        case shared_EventType.SignalExternalWorkflowExecutionInitiated:
        case shared_EventType.UpsertWorkflowSearchAttributes:
            return true;
        default:
            return false;
    }
}

export function isPreloadMarkerEvent(event: shared_IHistoryEvent): boolean {
    return event.eventType === shared_EventType.MarkerRecorded;
}

/**
 * SetStickyWorkflowCacheSize sets the cache size for sticky workflow cache. Sticky workflow execution is the affinity
 * between decision tasks of a specific workflow execution to a specific worker. The affinity is set if sticky execution
 * is enabled via Worker.Options (It is enabled by default unless disabled explicitly). The benefit of sticky execution
 * is that workflow does not have to reconstruct the state by replaying from beginning of history events. But the cost
 * is it consumes more memory as it rely on caching workflow execution's running state on the worker. The cache is shared
 * between workers running within same process. This must be called before any worker is started. If not called, the
 * default size of 10K (might change in future) will be used.
 */
export async function SetStickyWorkflowCacheSize(cacheSize: number): Promise<void> {
  const release = await stickyCacheLock.acquire();
  try {
    if (workflowCache != null) {
      throw "cache already created, please set cache size before worker starts.";
    }
    stickyCacheSize = cacheSize;
  } finally {
    release();
  }
}

export async function getWorkflowCache(): Promise<Cache> {
  await initCacheOnce.Do(async () => {
    const release = await stickyCacheLock.acquire();
    try {
      workflowCache = New(stickyCacheSize, {
        InitialCapacity: 0,
        Pin: false,
        RemovedFunc: (cachedEntity: unknown): void => {
          const wc = cachedEntity as workflowExecutionContextImpl;
          void wc.onEviction();
        },
        TTL: 0,
      });
    } finally {
      release();
    }
  });
  return workflowCache;
}

export async function getWorkflowContext(runID: string): Promise<workflowExecutionContextImpl | undefined> {
  const cache = await getWorkflowCache();
  const o = await cache.Get(runID);
  if (o == null) {
    return undefined;
  }
  return o as workflowExecutionContextImpl;
}

export async function putWorkflowContext(runID: string, wc: workflowExecutionContextImpl): Promise<workflowExecutionContextImpl> {
  const cache = await getWorkflowCache();
  const existing = await cache.PutIfNotExist(runID, wc);
  return existing as workflowExecutionContextImpl;
}

export async function removeWorkflowContext(runID: string): Promise<void> {
  const cache = await getWorkflowCache();
  await cache.Delete(runID);
}

export async function newWorkflowExecutionContext(startTime: number, workflowInfo: WorkflowInfo, taskHandler: workflowTaskHandlerImpl): Promise<workflowExecutionContextImpl> {
  const workflowContext = new workflowExecutionContextImpl({
    workflowStartTime: startTime,
    workflowInfo,
    wth: taskHandler,
    decisionStartTime: 0,
    isWorkflowCompleted: false,
    mutex: new Mutex(),
    newDecisions: [],
    previousStartedEventID: 0,
    result: Buffer.alloc(0),
  });
  await workflowContext.createEventHandler();
  return workflowContext;
}

export async function resetHistory(task: shared_IPollForDecisionTaskResponse, historyIterator: HistoryIterator): Promise<shared_IHistory> {
    historyIterator.Reset();
    const firstPageHistory = await historyIterator.GetNextPage();
    task.history = firstPageHistory;
    return firstPageHistory;
}

export function isFullHistory(history: shared_IHistory): boolean {
  if ((history.events?.length ?? 0) === 0 || (history.events?.[0]?.eventType ?? 0) !== shared_EventType.WorkflowExecutionStarted) {
    return false;
  }
  return true;
}

export function getRetryBackoff(lar: localActivityResult, now: number): number {
    const p = lar.task!.retryPolicy!;
    let errReason = '';
    if ((p.NonRetriableErrorReasons?.length ?? 0) > 0) {
        if (lar.err! === ErrDeadlineExceeded) {
            errReason = 'timeout:' + TimeoutType[TimeoutType.SCHEDULE_TO_CLOSE];
        } else {
            [errReason] = getErrorDetails(lar.err!, undefined);
        }
    }
    return getRetryBackoffWithNowTime(p, lar.task!.attempt, errReason, now, lar.task!.expireTime);
}

export function getRetryBackoffWithNowTime(p: internal_RetryPolicy, attempt: number, errReason: string, now: number, expireTime: number): number {
    if (p.MaximumAttempts === 0 && p.ExpirationInterval === 0) {
        return noRetryBackoff;
    }

    if (p.MaximumAttempts > 0 && attempt > p.MaximumAttempts - 1) {
        return noRetryBackoff;
    }

    let backoffInterval = Math.trunc(p.InitialInterval * Math.pow(p.BackoffCoefficient, attempt));
    if (backoffInterval <= 0) {
        if (p.MaximumInterval > 0) {
            backoffInterval = p.MaximumInterval;
        } else {
            return noRetryBackoff;
        }
    }

    if (p.MaximumInterval > 0 && backoffInterval > p.MaximumInterval) {
        backoffInterval = p.MaximumInterval;
    }

    const nextScheduleTime = now + backoffInterval;
    if (expireTime !== 0 && nextScheduleTime > expireTime) {
        return noRetryBackoff;
    }

    for (const er of p.NonRetriableErrorReasons ?? []) {
        if (er === errReason) {
            return noRetryBackoff;
        }
    }

    return backoffInterval;
}

export async function errorToFailDecisionTask(taskToken: Buffer, err: Error | null, identity: string): Promise<shared_IRespondDecisionTaskFailedRequest> {
    const [, details] = getErrorDetails(err, undefined);
    const binaryChecksum = await getBinaryChecksum();
    return new shared_RespondDecisionTaskFailedRequest({
        taskToken,
        cause: DecisionTaskFailedCause.WORKFLOW_WORKER_UNHANDLED_FAILURE,
        details,
        identity: StringPtr(identity),
        binaryChecksum: StringPtr(binaryChecksum),
    });
}

export function newServiceInvoker(taskToken: Buffer, identity: string, service: WorkflowServiceClientLike, cancelHandler: () => void | Promise<void>, heartBeatTimeoutInSec: number, workerStopChannel: Channel<{}>, featureFlags: internal_FeatureFlags, logger: Logger, workflowType: string, activityType: string): cadenceInvoker {
  return new cadenceInvoker({
    Mutex: new Mutex(),
    taskToken,
    identity,
    service,
    cancelHandler,
    heartBeatTimeoutInSec,
    closeCh: new Channel<{}>(),
    workerStopChannel,
    featureFlags,
    logger,
    workflowType,
    activityType,
  });
}

export function createNewDecision(decisionType: shared_DecisionType): shared_IDecision {
    return new shared_Decision({
        decisionType: DecisionTypePtr(decisionType),
    });
}

export async function signalWorkflow(ctx: Context, service: WorkflowServiceClientLike, identity: string, domain: string, workflowID: string, runID: string, signalName: string, signalInput: Buffer, featureFlags: internal_FeatureFlags): Promise<void> {
    const request = new shared_SignalWorkflowExecutionRequest({
        domain: StringPtr(domain),
        workflowExecution: new shared_WorkflowExecution({
            workflowId: StringPtr(workflowID),
            runId: getRunID(runID),
        }),
        signalName: StringPtr(signalName),
        input: signalInput,
        identity: StringPtr(identity),
        requestId: StringPtr(globalThis.crypto.randomUUID()),
    });

    await Retry(
        ctx,
        async () => {
            const [tchCtx, cancel, opt] = newChannelContext(ctx, featureFlags);
            try {
                await service.SignalWorkflowExecution(tchCtx, request, ...opt);
            } finally {
                cancel();
            }
        },
        createDynamicServiceRetryPolicy(ctx),
        isServiceTransientError,
    );
}

export async function recordActivityHeartbeat(ctx: Context, service: WorkflowServiceClientLike, identity: string, taskToken: Buffer, details: Buffer, featureFlags: internal_FeatureFlags): Promise<void> {
    const request = new shared_RecordActivityTaskHeartbeatRequest({
        taskToken,
        details,
        identity: StringPtr(identity)!
    });

    let heartbeatResponse!: shared_IRecordActivityTaskHeartbeatResponse;

    await Retry(
        ctx,
        async () => {
            const [tchCtx, cancel, opt] = newChannelContext(ctx, featureFlags);
            try {
                heartbeatResponse = await service.RecordActivityTaskHeartbeat(tchCtx, request, ...opt);
            } finally {
                cancel();
            }
        },
        createDynamicServiceRetryPolicy(ctx),
        isServiceTransientError
    );

    if (!heartbeatResponse) {
        return;
    }

    if (heartbeatResponse.cancelRequested ?? false) {
        throw NewCanceledError();
    }
}

export async function recordActivityHeartbeatByID(ctx: Context, service: WorkflowServiceClientLike, identity: string, domain: string, workflowID: string, runID: string, activityID: string, details: Buffer, featureFlags: internal_FeatureFlags): Promise<void> {
    const request = new shared_RecordActivityTaskHeartbeatByIDRequest({
        domain: StringPtr(domain),
        workflowID: StringPtr(workflowID),
        runID: StringPtr(runID),
        activityID: StringPtr(activityID),
        details,
        identity: StringPtr(identity),
    });

    let heartbeatResponse!: shared_IRecordActivityTaskHeartbeatResponse;

    await Retry(
        ctx,
        async () => {
            const [tchCtx, cancel, opt] = newChannelContext(ctx, featureFlags);
            try {
                heartbeatResponse = await service.RecordActivityTaskHeartbeatByID(tchCtx, request, ...opt);
            } finally {
                cancel();
            }
        },
        createDynamicServiceRetryPolicy(ctx),
        isServiceTransientError,
    );

    if (heartbeatResponse && (heartbeatResponse.cancelRequested ?? false)) {
        throw NewCanceledError();
    }
}

/**
 * This enables verbose logging in the client library.
 * check worker.EnableVerboseLogging()
 */
export function traceLog(fn: () => void | Promise<void>): void {
  if (enableVerboseLogging) {
    fn();
  }
}

export function workflowCategorizedByTimeout(wfContext: workflowExecutionContextImpl): string {
  const executionTimeout = wfContext.workflowInfo!.ExecutionStartToCloseTimeoutSeconds;
  if (executionTimeout <= defaultInstantLivedWorkflowTimeoutUpperLimitInSec) {
    return "instant";
  } else if (executionTimeout <= defaultShortLivedWorkflowTimeoutUpperLimitInSec) {
    return "short";
  } else if (executionTimeout <= defaultMediumLivedWorkflowTimeoutUpperLimitInSec) {
    return "intermediate";
  } else {
    return "long";
  }
}

/**
 * newWorkflowTaskHandler returns an implementation of workflow task handler.
 */
export function newWorkflowTaskHandler(domain: string, params: workerExecutionParameters, ppMgr: pressurePointMgr | undefined, registry: registry): workflowTaskHandlerImpl {
  ensureRequiredParams(params);

  const wth = new workflowTaskHandlerImpl({
    domain,
    logger: params.Logger!,
    ppMgr,
    metricsScope: NewTaggedScope(params.MetricsScope!),
    identity: params.Identity,
    enableLoggingInReplay: params.EnableLoggingInReplay,
    disableStickyExecution: params.DisableStickyExecution,
    registry,
    nonDeterministicWorkflowPolicy: params.NonDeterministicWorkflowPolicy,
    dataConverter: params.DataConverter!,
    contextPropagators: params.ContextPropagators,
    tracer: params.Tracer!,
    workflowInterceptorFactories: params.WorkflowInterceptorChainFactories,
    disableStrictNonDeterminism: params.WorkerBugPorts.DisableStrictNonDeterminismCheck,
    featureFlags: params.FeatureFlags,
  });

  traceLog(() => {
    wth.logger!.debug('Workflow task handler is created.', {
      [tagDomain]: wth.domain,
      disableStrictNonDeterminism: wth.disableStrictNonDeterminism,
    });
  });

  return wth;
}

export const defaultHeartBeatIntervalInSec = 600;

export const defaultInstantLivedWorkflowTimeoutUpperLimitInSec = 1;

export const defaultMediumLivedWorkflowTimeoutUpperLimitInSec = 28800;

export const defaultShortLivedWorkflowTimeoutUpperLimitInSec = 1800;

export const defaultStickyCacheSize = 10000;

export const noRetryBackoff = -1;

/**
 * TODO: need a better eviction policy based on memory usage
 */
export let workflowCache: any = undefined;

export let initCacheOnce = new Once();

export let stickyCacheLock = new Mutex();

export let stickyCacheSize = defaultStickyCacheSize;
