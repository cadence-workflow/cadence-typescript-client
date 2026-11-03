import { TaskListMetadata as shared_TaskListMetadata } from '../generated/thrift/cadence-idl/com/uber/cadence/TaskListMetadata.js';
import { PollForActivityTaskRequest as shared_PollForActivityTaskRequest } from '../generated/thrift/cadence-idl/com/uber/cadence/PollForActivityTaskRequest.js';
import { Int64 } from '@creditkarma/thrift-server-core';
import { StickyExecutionAttributes as shared_StickyExecutionAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/StickyExecutionAttributes.js';
import { GetWorkflowExecutionHistoryRequest as shared_GetWorkflowExecutionHistoryRequest } from '../generated/thrift/cadence-idl/com/uber/cadence/GetWorkflowExecutionHistoryRequest.js';
import { RespondActivityTaskFailedRequest as shared_RespondActivityTaskFailedRequest } from '../generated/thrift/cadence-idl/com/uber/cadence/RespondActivityTaskFailedRequest.js';
import { RespondActivityTaskCompletedRequest as shared_RespondActivityTaskCompletedRequest } from '../generated/thrift/cadence-idl/com/uber/cadence/RespondActivityTaskCompletedRequest.js';
import { RespondActivityTaskCanceledRequest as shared_RespondActivityTaskCanceledRequest } from '../generated/thrift/cadence-idl/com/uber/cadence/RespondActivityTaskCanceledRequest.js';
import { ActivityEndToEndLatency, ActivityExecutionFailedCounter, ActivityExecutionLatency, ActivityResponseFailedCounter, ActivityResponseLatency, LocalActivityCanceledCounter, LocalActivityExecutionLatency, LocalActivityPanicCounter, LocalActivityTimeoutCounter, LocalActivityTotalCounter, WorkflowGetHistoryCounter, WorkflowGetHistoryFailedCounter, WorkflowGetHistoryLatency, WorkflowGetHistorySucceedCounter, ActivityLocalDispatchFailedCounter, ActivityLocalDispatchSucceedCounter, ActivityPollCounter, LocallyDispatchedActivityPollCounter, LocallyDispatchedActivityPollNoTaskCounter, LocallyDispatchedActivityPollSucceedCounter, DecisionPollCounter, DecisionPollFailedCounter, DecisionPollLatency, DecisionPollNoTaskCounter, DecisionPollSucceedCounter, DecisionPollTransientFailedCounter, DecisionScheduledToStartLatency, ActivityPollFailedCounter, ActivityPollNoTaskCounter, ActivityPollTransientFailedCounter, StickyCacheEvict, ActivityTaskCanceledCounter, ActivityTaskCompletedCounter, ActivityTaskFailedCounter, DecisionExecutionFailedCounter, DecisionExecutionLatency, DecisionResponseFailedCounter, DecisionResponseLatency, DecisionTaskCompletedCounter, DecisionPollInvalidCounter, DecisionTaskForceCompleted, ActivityPollLatency, ActivityPollSucceedCounter, ActivityScheduledToStartLatency, ActivityTaskCanceledByIDCounter, ActivityTaskCompletedByIDCounter, ActivityTaskFailedByIDCounter } from './common/metrics/constants.js';
import { EmitLatency } from './common/metrics/emit.js';
import { Default1ms100s, High1ms24h } from './common/metrics/histograms.js';
import { activityEnvContextKey, activityEnvironment } from './internal_activity.js';
import { tagAttempt, tagLocalActivityID, tagLocalActivityType, tagPanicError, tagPanicStack, tagRunID, tagWorkflowID, tagWorkflowType, causeTag } from './internal_logging_tags.js';
import { getStackTraceRaw } from './internal_workflow.js';
import { createOpenTracingActivitySpan } from './propagation.js';
import { Retry, ErrRetryableAfter } from './common/backoff/retry.js';
import { DeserializeBlobDataToHistoryEvents } from './common/serializer/history_serializer.js';
import { createDynamicServiceRetryPolicy, isServiceTransientError } from './internal_retry.js';
import { EventType } from '../generated/thrift/cadence-idl/com/uber/cadence/EventType.js';
import { HistoryEventFilterType } from '../generated/thrift/cadence-idl/com/uber/cadence/HistoryEventFilterType.js';
import { NewNoopActivityTracker } from './common/debug/workerstats_noop.js';
import { trace } from '@opentelemetry/api';
import { RespondQueryTaskCompletedRequest } from '../generated/thrift/cadence-idl/com/uber/cadence/RespondQueryTaskCompletedRequest.js';
import { RespondActivityTaskCanceledByIDRequest } from '../generated/thrift/cadence-idl/com/uber/cadence/RespondActivityTaskCanceledByIDRequest.js';
import { RespondActivityTaskCompletedByIDRequest } from '../generated/thrift/cadence-idl/com/uber/cadence/RespondActivityTaskCompletedByIDRequest.js';
import { RespondActivityTaskFailedByIDRequest } from '../generated/thrift/cadence-idl/com/uber/cadence/RespondActivityTaskFailedByIDRequest.js';
// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { Mutex } from 'async-mutex';
import { common_debug_ActivityTracker } from './common/debug/types.js';
import { TaggedScope, NewTaggedScope } from './common/metrics/scope.js';
import { internal_DataConverter } from './encoded.js';
import { internal_ContextPropagator, NewHeaderReader } from './headers.js';
import { localActivityTask, locallyDispatchedActivityTask } from './internal_event_handlers.js';
import { ActivityTaskHandler, HistoryIterator, WorkflowTaskHandler } from './internal_public.js';
import { activityTask, resetStickinessTask, workflowTask, traceLog, errorToFailDecisionTask, decisionHeartbeatError } from './internal_task_handlers.js';
import { internal_FeatureFlags, getErrorDetails, getWorkerTaskList, chanTimeout, newChannelContext, getMetricsScopeForActivity, getMetricsScopeForLocalActivity, getYarpcCallOptions } from './internal_utils.js';
import { getBinaryChecksum, activityExecutor, workerExecutionParameters } from './internal_worker.js';
import type { WorkflowServiceClientLike } from './runtime/workflow_service_client_like.js';
import { Channel } from './runtime/channel.js';
import { Context, ErrCanceled as goErrCanceled, ErrDeadlineExceeded as goErrDeadlineExceeded, background, withDeadline, withValue } from './runtime/context.js';
import { Second } from './runtime/time.js';
import type { Scope } from './runtime/tally.js';
import { IHistory as shared_IHistory } from '../generated/thrift/cadence-idl/com/uber/cadence/History.js';
import { IPollForActivityTaskResponse as shared_IPollForActivityTaskResponse, PollForActivityTaskResponse as shared_PollForActivityTaskResponse } from '../generated/thrift/cadence-idl/com/uber/cadence/PollForActivityTaskResponse.js';
import { IPollForDecisionTaskRequest as shared_IPollForDecisionTaskRequest, PollForDecisionTaskRequest as shared_PollForDecisionTaskRequest } from '../generated/thrift/cadence-idl/com/uber/cadence/PollForDecisionTaskRequest.js';
import { IPollForDecisionTaskResponse as shared_IPollForDecisionTaskResponse } from '../generated/thrift/cadence-idl/com/uber/cadence/PollForDecisionTaskResponse.js';
import { IRespondDecisionTaskCompletedRequest as shared_IRespondDecisionTaskCompletedRequest, RespondDecisionTaskCompletedRequest } from '../generated/thrift/cadence-idl/com/uber/cadence/RespondDecisionTaskCompletedRequest.js';
import { IRespondDecisionTaskCompletedResponse as shared_IRespondDecisionTaskCompletedResponse } from '../generated/thrift/cadence-idl/com/uber/cadence/RespondDecisionTaskCompletedResponse.js';
import { IRespondDecisionTaskFailedRequest as shared_IRespondDecisionTaskFailedRequest, RespondDecisionTaskFailedRequest } from '../generated/thrift/cadence-idl/com/uber/cadence/RespondDecisionTaskFailedRequest.js';
import { ITaskList as shared_ITaskList, TaskList as shared_TaskList } from '../generated/thrift/cadence-idl/com/uber/cadence/TaskList.js';
import { TaskListKind as shared_TaskListKind } from '../generated/thrift/cadence-idl/com/uber/cadence/TaskListKind.js';
import { IWorkflowExecution as shared_IWorkflowExecution } from '../generated/thrift/cadence-idl/com/uber/cadence/WorkflowExecution.js';
import { errShutdown } from './internal_worker_base.js';
import { mapCase, recvCase, selectOne, sendCase, timeoutCase, promiseCase } from './runtime/select.js';
import { StringPtr, TaskListKindPtr, TaskListPtr, BoolPtr, Int32Ptr } from './common/convert.js';
import { ErrActivityResultPending, internal_CanceledError, NewCustomError, newPanicError } from './error.js';
import { IGetWorkflowExecutionHistoryResponse as shared_IGetWorkflowExecutionHistoryResponse } from '../generated/thrift/cadence-idl/com/uber/cadence/GetWorkflowExecutionHistoryResponse.js';
import { ServiceBusyError } from '../errors/idl_errors.js';
import { Logger } from 'winston';

export interface localActivityResult {
  result?: Buffer;
  err?: Error | null;
  task?: localActivityTask;
  backoff: number;
}

export interface localDispatcher {
  SendTask(task: locallyDispatchedActivityTask): boolean;
}

export type pollFunc = (p0: Context) => [shared_IPollForActivityTaskResponse | undefined, number] | Promise<[shared_IPollForActivityTaskResponse | undefined, number]>;

export interface taskPoller {
  PollTask(): Promise<unknown>;
  ProcessTask(p0: unknown): Promise<void>;
}

/**
 * basePoller is the base class for all poller implementations
 */
export class basePoller {
  constructor(init?: Partial<basePoller>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  shutdownC?: Channel<{}>;

  shuttingDown(): boolean {
    return this.shutdownC!.tryRecv().received;
  }

  async doPoll(featureFlags: internal_FeatureFlags, pollFunc: (p0: Context) => unknown): Promise<unknown> {
    if (this.shuttingDown()) {
      throw errShutdown;
    }

    let result: unknown = undefined;
    let pollError: Error | null = null;
    const doneC = new Channel<{}>();
    const [ctx, cancel, options] = newChannelContext(
      background(),
      featureFlags,
      chanTimeout(pollTaskServiceTimeOut),
    );

    void (async () => {
      try {
        result = await pollFunc(ctx);
      } catch (error) {
        if (!(error instanceof Error)) {
          throw error;
        }
        pollError = error;
      }
      cancel();
      doneC.close();
    })();

    const outcome = await selectOne([
      mapCase(recvCase(doneC), () => ({ kind: 'done' as const })),
      mapCase(recvCase(this.shutdownC!), () => ({ kind: 'shutdown' as const })),
    ]);

    if (outcome.kind === 'shutdown') {
      cancel();
      throw errShutdown;
    }

    if (pollError != null) {
      throw pollError;
    }

    return result;
  }

}

/**
 * workflowTaskPoller implements polling/processing a workflow task
 */
export class workflowTaskPoller extends basePoller implements taskPoller {
  constructor(init?: Partial<workflowTaskPoller>) {
    super(init);
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  domain: string = "";

  taskListName: string = "";

  identity: string = "";

  service?: WorkflowServiceClientLike;

  taskHandler?: WorkflowTaskHandler;

  ldaTunnel?: localDispatcher;

  metricsScope?: TaggedScope;

  logger?: Logger;

  stickyUUID: string = "";

  disableStickyExecution: boolean = false;

  StickyScheduleToStartTimeout: number = 0;

  pendingRegularPollCount: number = 0;

  pendingStickyPollCount: number = 0;

  stickyBacklog: number = 0;

  requestLock: Mutex = new Mutex();

  featureFlags: internal_FeatureFlags = { WorkflowExecutionAlreadyCompletedErrorEnabled: false, AutoforwardingEnabled: false, PollerAutoScalerEnabled: false, EphemeralTaskListsEnabled: false, MetricEmitMode: 0 };

  async PollTask(): Promise<unknown> {
      const workflowTask = await this.doPoll(this.featureFlags, (ctx) => this.poll(ctx));
      return workflowTask;
    }

  async ProcessTask(task: unknown): Promise<void> {
    if (this.shuttingDown()) {
      throw errShutdown;
    }

    if (task instanceof workflowTask) {
      await this.processWorkflowTask(task as workflowTask);
    } else if (task instanceof resetStickinessTask) {
      await this.processResetStickinessTask(task as resetStickinessTask);
    } else {
      throw "unknown task type.";
    }
  }

  async respondTaskCompleted(completedRequest: unknown, task: shared_IPollForDecisionTaskResponse): Promise<shared_IRespondDecisionTaskCompletedResponse> {
    const ctx = background();
    let response!: shared_IRespondDecisionTaskCompletedResponse;

    await Retry(
      ctx,
      async (): Promise<void> => {
        response = await this.respondTaskCompletedAttempt(completedRequest, task);
      },
      createDynamicServiceRetryPolicy(ctx),
      isServiceTransientError,
    );

    return response;
  }

  async handleDecisionFailedRequest(ctx: Context, task: shared_IPollForDecisionTaskResponse, request: shared_IRespondDecisionTaskFailedRequest, ...opts: unknown[]): Promise<void> {
      if (task.attempt != null && (task.attempt?.toNumber() ?? 0) === 0) {
          await this.service!.RespondDecisionTaskFailed(ctx, request, ...opts);
      }
  }

  async handleDecisionTaskCompletedRequest(ctx: Context, task: shared_IPollForDecisionTaskResponse, request: shared_IRespondDecisionTaskCompletedRequest, ...opts: unknown[]): Promise<shared_IRespondDecisionTaskCompletedResponse> {
    if (request.stickyAttributes == null && !this.disableStickyExecution) {
      request.stickyAttributes = new shared_StickyExecutionAttributes({
        workerTaskList: new shared_TaskList({
          name: StringPtr(getWorkerTaskList(this.stickyUUID)),
        }),
        scheduleToStartTimeoutSeconds: Int32Ptr(
          Math.ceil(this.StickyScheduleToStartTimeout / 1e9),
        ),
      });
    } else {
      request.returnNewDecisionTask = BoolPtr(false);
    }

    if (this.ldaTunnel != null) {
      const activityTasks: locallyDispatchedActivityTask[] = [];

      for (const decision of request.decisions ?? []) {
        const attr = decision.scheduleActivityTaskDecisionAttributes;
        if (attr != null && this.taskListName === (attr.taskList?.name ?? "")) {
          const activityTask: locallyDispatchedActivityTask = {
            readyCh: new Channel<boolean>(1),
            ActivityID: attr.activityId!,
            ActivityType: attr.activityType!,
            Input: attr.input!,
            Header: attr.header,
            WorkflowDomain: StringPtr(this.domain),
            ScheduleToCloseTimeoutSeconds: attr.scheduleToCloseTimeoutSeconds,
            StartToCloseTimeoutSeconds: attr.startToCloseTimeoutSeconds,
            HeartbeatTimeoutSeconds: attr.heartbeatTimeoutSeconds,
            WorkflowExecution: task.workflowExecution!,
            WorkflowType: task.workflowType!,
          };

          if (this.ldaTunnel!.SendTask(activityTask)) {
            this.metricsScope!.Counter(ActivityLocalDispatchSucceedCounter).Inc(1);
            decision.scheduleActivityTaskDecisionAttributes!.requestLocalDispatch = BoolPtr(true);
            activityTasks.push(activityTask);
          } else {
            this.metricsScope!.Counter(ActivityLocalDispatchFailedCounter).Inc(1);
          }
        }
      }

      let response: shared_IRespondDecisionTaskCompletedResponse | undefined;
      try {
        response = await this.service!.RespondDecisionTaskCompleted(ctx, request, ...opts);
        return response;
      } finally {
        for (const at of activityTasks) {
          let started = false;
          if (response != null) {
            const adl = response.activitiesToDispatchLocally!.get(at.ActivityID!);
            if (adl != null) {
              at.ScheduledTimestamp = adl.scheduledTimestamp!.toNumber();
              at.StartedTimestamp = adl.startedTimestamp!.toNumber();
              at.ScheduledTimestampOfThisAttempt = adl.scheduledTimestampOfThisAttempt!.toNumber();
              at.TaskToken = adl.taskToken!;
              started = true;
            }
          }
          await at.readyCh!.send(started);
        }
      }
    }

    return await this.service!.RespondDecisionTaskCompleted(ctx, request, ...opts);
  }

  async release(kind: shared_TaskListKind): Promise<void> {
    if (this.disableStickyExecution) {
      return;
    }

    await this.requestLock.acquire();
    if (kind === shared_TaskListKind.STICKY) {
      this.pendingStickyPollCount--;
    } else {
      this.pendingRegularPollCount--;
    }
    this.requestLock.release();
  }

  async updateBacklog(taskListKind: shared_TaskListKind, backlogCountHint: number): Promise<void> {
    if (taskListKind === shared_TaskListKind.NORMAL || this.disableStickyExecution) {
      return;
    }
    await this.requestLock.acquire();
    this.stickyBacklog = backlogCountHint;
    this.requestLock.release();
  }

  async getNextPollRequest(): Promise<shared_IPollForDecisionTaskRequest> {
    let taskListName = this.taskListName;
    let taskListKind = shared_TaskListKind.NORMAL;

    if (!this.disableStickyExecution) {
      const release = await this.requestLock.acquire();
      if (this.stickyBacklog > 0 || this.pendingStickyPollCount <= this.pendingRegularPollCount) {
        this.pendingStickyPollCount++;
        taskListName = getWorkerTaskList(this.stickyUUID);
        taskListKind = shared_TaskListKind.STICKY;
      } else {
        this.pendingRegularPollCount++;
      }
      release();
    }

    const taskList = new shared_TaskList({
      name: StringPtr(taskListName),
      kind: TaskListKindPtr(taskListKind),
    });

    return new shared_PollForDecisionTaskRequest({
      domain: StringPtr(this.domain),
      taskList: TaskListPtr(taskList),
      identity: StringPtr(this.identity),
      binaryChecksum: StringPtr(await getBinaryChecksum()),
    });
  }

  async processResetStickinessTask(rst: resetStickinessTask): Promise<void> {
    const [tchCtx, cancel, opt] = newChannelContext(background(), this.featureFlags);
    try {
      this.metricsScope!.Counter(StickyCacheEvict).Inc(1);
      try {
        await this.service!.ResetStickyTaskList(tchCtx, rst.task!, ...opt);
      } catch (err) {
        if (!(err instanceof Error)) {
          throw err;
        }
        this.logger!.warn("ResetStickyTaskList failed", {
          [tagWorkflowID]: rst.task!.execution?.workflowId ?? "",
          [tagRunID]: rst.task!.execution?.runId ?? "",
          error: err,
        });
        throw err;
      }
    } finally {
      cancel();
    }
  }

  async poll(ctx: Context): Promise<workflowTask> {
      const startTime = Date.now() * 1_000_000;
      this.metricsScope!.Counter(DecisionPollCounter).Inc(1);

      traceLog(() => {
          this.logger!.debug("workflowTaskPoller::Poll");
      });

      const request = await this.getNextPollRequest();
      const taskListKind = request.taskList!.kind!;

      try {
          let response: shared_IPollForDecisionTaskResponse;
          try {
              response = await this.service!.PollForDecisionTask(
                  ctx,
                  request,
                  ...getYarpcCallOptions(this.featureFlags),
              );
          } catch (err) {
              if (!(err instanceof Error)) {
                  throw err;
              }

              const retryable = isServiceTransientError(err);

              if (retryable) {
                  if (err instanceof ServiceBusyError) {
                      this.metricsScope!
                          .Tagged({ [causeTag]: serviceBusy })
                          .Counter(DecisionPollTransientFailedCounter)
                          .Inc(1);
                  } else {
                      this.metricsScope!.Counter(DecisionPollTransientFailedCounter).Inc(1);
                  }
              } else {
                  this.metricsScope!.Counter(DecisionPollFailedCounter).Inc(1);
              }

              try {
                  await this.updateBacklog(taskListKind, 0);
              } catch (updateErr) {
                  if (!(updateErr instanceof Error)) {
                      throw updateErr;
                  }
              }

              const retryAfter = ErrRetryableAfter(err);
              if (retryAfter > 0) {
                  await selectOne([
                      mapCase(recvCase(ctx.done()), () => true),
                      mapCase(timeoutCase(retryAfter), () => false),
                  ]);
              }

              throw err;
          }

          if (response == null || response.taskToken == null || response.taskToken.length === 0) {
              this.metricsScope!.Counter(DecisionPollNoTaskCounter).Inc(1);

              try {
                  await this.updateBacklog(taskListKind, 0);
              } catch (updateErr) {
                  if (!(updateErr instanceof Error)) {
                      throw updateErr;
                  }
              }

              return new workflowTask({ autoConfigHint: response?.autoConfigHint });
          }

          try {
              await this.updateBacklog(taskListKind, response.backlogCountHint?.toNumber() ?? 0);
          } catch (updateErr) {
              if (!(updateErr instanceof Error)) {
                  throw updateErr;
              }
          }

          const task = this.toWorkflowTask(response);

          traceLog(() => {
              let firstEventID = -1;
              if (response.history != null && response.history.events!.length > 0) {
                  firstEventID = response.history.events![0]!.eventId?.toNumber() ?? 0;
              }

              this.logger!.debug("workflowTaskPoller::Poll Succeed", {
                  StartedEventID: response.startedEventId?.toNumber() ?? 0,
                  Attempt: response.attempt?.toNumber() ?? 0,
                  FirstEventID: firstEventID,
                  IsQueryTask: response.query != null,
              });
          });

          const metricsScope = this.metricsScope!.GetTaggedScope(
              tagWorkflowType,
              response.workflowType?.name ?? "",
          );
          metricsScope.Counter(DecisionPollSucceedCounter).Inc(1);
          EmitLatency(
              metricsScope,
              DecisionPollLatency,
              Date.now() * 1_000_000 - startTime,
              Default1ms100s,
          );

          const scheduledToStartLatency =
              (response.startedTimestamp?.toNumber() ?? 0) -
              (response.scheduledTimestamp?.toNumber() ?? 0);
          EmitLatency(
              metricsScope,
              DecisionScheduledToStartLatency,
              scheduledToStartLatency,
              High1ms24h,
          );

          return task;
      } finally {
          try {
              await this.release(taskListKind);
          } catch (releaseErr) {
              if (!(releaseErr instanceof Error)) {
                  throw releaseErr;
              }
          }
      }
  }

  async processWorkflowTask(task: workflowTask): Promise<void> {
    if (task.task == null) {
      traceLog(() => {
        this.logger!.debug("Workflow task unavailable");
      });
      return;
    }

    const doneCh = new Channel<{}>();
    const laResultCh = new Channel<localActivityResult>();

    try {
      for (;;) {
        const startTime = Date.now() * 1_000_000;
        task.doneCh = doneCh;
        task.laResultCh = laResultCh;

        let completedRequest: unknown | undefined;
        let handlerErr: Error | null = null;

        try {
          completedRequest = await this.taskHandler!.ProcessWorkflowTask(
            task,
            async (response: unknown, heartbeatStartTime: number): Promise<workflowTask | undefined> => {
              this.logger!.debug("Force RespondDecisionTaskCompleted.", {
                TaskStartedEventID: task.task!.startedEventId?.toNumber() ?? 0,
              });
              this.metricsScope!.Counter(DecisionTaskForceCompleted).Inc(1);

              const heartbeatResponse = await this.RespondTaskCompletedWithMetrics(
                response,
                null,
                task.task!,
                heartbeatStartTime,
              );

              if (heartbeatResponse == null || heartbeatResponse.decisionTask == null) {
                return undefined;
              }

              const nextTask = this.toWorkflowTask(heartbeatResponse.decisionTask);
              nextTask.doneCh = doneCh;
              nextTask.laResultCh = laResultCh;
              return nextTask;
            },
          );
        } catch (err) {
          if (!(err instanceof Error)) {
            throw err;
          }
          handlerErr = err;
        }

        if (completedRequest == null && handlerErr == null) {
          return;
        }

        if (handlerErr instanceof decisionHeartbeatError) {
          throw handlerErr;
        }

        const response = await this.RespondTaskCompletedWithMetrics(
          completedRequest,
          handlerErr,
          task.task!,
          startTime,
        );

        if (response == null || response.decisionTask == null) {
          return;
        }

        task = this.toWorkflowTask(response.decisionTask);
      }
    } finally {
      doneCh.close();
    }
  }

  async respondTaskCompletedAttempt(completedRequest: unknown, task: shared_IPollForDecisionTaskResponse): Promise<shared_IRespondDecisionTaskCompletedResponse> {
    const [ctx, cancel, opts] = newChannelContext(background(), this.featureFlags);
    let response: shared_IRespondDecisionTaskCompletedResponse | undefined = undefined;
    let operation = "";
    let caughtError: Error | null = null;

    try {
      try {
        if (completedRequest instanceof RespondDecisionTaskFailedRequest) {
          await this.handleDecisionFailedRequest(ctx, task, completedRequest, ...opts);
          operation = "RespondDecisionTaskFailed";
        } else if (completedRequest instanceof RespondDecisionTaskCompletedRequest) {
          response = await this.handleDecisionTaskCompletedRequest(ctx, task, completedRequest, ...opts);
          operation = "RespondDecisionTaskCompleted";
        } else if (completedRequest instanceof RespondQueryTaskCompletedRequest) {
          await this.service!.RespondQueryTaskCompleted(ctx, completedRequest, ...opts);
          operation = "RespondQueryTaskCompleted";
        } else {
          throw "unknown request type from ProcessWorkflowTask()";
        }
      } catch (err) {
        if (!(err instanceof Error)) {
          throw err;
        }
        caughtError = err;
      }

      traceLog(() => {
        if (caughtError != null) {
          this.logger!.debug(`${operation} failed.`, { error: caughtError });
        }
      });

      if (caughtError != null) {
        throw caughtError;
      }

      return response as shared_IRespondDecisionTaskCompletedResponse;
    } finally {
      cancel();
    }
  }

  toWorkflowTask(response: shared_IPollForDecisionTaskResponse): workflowTask {
    const startEventID = response.startedEventId?.toNumber() ?? 0;
    let nextEventID = response.nextEventId?.toNumber() ?? 0;
    if (nextEventID !== 0 && startEventID !== 0) {
      if (nextEventID - 1 !== startEventID && nextEventID + 1 !== startEventID) {
        this.logger!.warn("Invalid PollForDecisionTaskResponse, nextEventID doesn't match startedEventID", {
          StartedEventID: startEventID,
          NextEventID: nextEventID,
        });
        this.metricsScope!.Counter(DecisionPollInvalidCounter).Inc(1);
      } else {
        nextEventID = startEventID + 1;
      }
    }
    const historyIterator = new historyIteratorImpl({
      nextPageToken: response.nextPageToken!,
      execution: response.workflowExecution!,
      domain: this.domain,
      service: this.service,
      metricsScope: this.metricsScope,
      startedEventID: startEventID,
      maxEventID: nextEventID - 1,
      featureFlags: this.featureFlags,
    });
    const task = new workflowTask({
      task: response,
      historyIterator,
      autoConfigHint: response.autoConfigHint,
    });
    return task;
  }

  async RespondTaskCompletedWithMetrics(completedRequest: unknown, taskErr: Error | null, task: shared_IPollForDecisionTaskResponse, startTime: number): Promise<shared_IRespondDecisionTaskCompletedResponse> {
    const metricsScope = this.metricsScope!.GetTaggedScope(tagWorkflowType, task.workflowType!.name ?? "");

    if (taskErr != null) {
      metricsScope.Counter(DecisionExecutionFailedCounter).Inc(1);
      this.logger!.warn("Failed to process decision task.", {
        [tagWorkflowType]: task.workflowType!.name ?? "",
        [tagWorkflowID]: task.workflowExecution!.workflowId ?? "",
        [tagRunID]: task.workflowExecution!.runId ?? "",
        error: taskErr,
      });
      completedRequest = await errorToFailDecisionTask(task.taskToken!, taskErr, this.identity);
    } else {
      metricsScope.Counter(DecisionTaskCompletedCounter).Inc(1);
    }

    EmitLatency(
      metricsScope,
      DecisionExecutionLatency,
      Date.now() * 1_000_000 - startTime,
      Default1ms100s,
    );

    const responseStartTime = Date.now() * 1_000_000;
    try {
      const response = await this.respondTaskCompleted(completedRequest, task);
      EmitLatency(
        metricsScope,
        DecisionResponseLatency,
        Date.now() * 1_000_000 - responseStartTime,
        Default1ms100s,
      );
      return response;
    } catch (err) {
      if (!(err instanceof Error)) {
        throw err;
      }
      metricsScope.Counter(DecisionResponseFailedCounter).Inc(1);
      throw err;
    }
  }

}

/**
 * activityTaskPoller implements polling/processing a workflow task
 */
export class activityTaskPoller extends basePoller implements taskPoller {
  constructor(init?: Partial<activityTaskPoller>) {
    super(init);
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  domain: string = "";

  taskList?: shared_ITaskList;

  identity: string = "";

  service?: WorkflowServiceClientLike;

  taskHandler?: ActivityTaskHandler;

  metricsScope?: TaggedScope;

  logger?: Logger;

  activitiesPerSecond: number = 0;

  featureFlags: internal_FeatureFlags = { WorkflowExecutionAlreadyCompletedErrorEnabled: false, AutoforwardingEnabled: false, PollerAutoScalerEnabled: false, EphemeralTaskListsEnabled: false, MetricEmitMode: 0 };

  pollWithMetricsFunc(pollFunc: pollFunc): (p0: Context) => unknown {
    return (ctx: Context): unknown => this.pollWithMetrics(ctx, pollFunc);
  }

  async pollWithMetrics(ctx: Context, pollFunc: (p0: Context) => [shared_IPollForActivityTaskResponse | undefined, number] | Promise<[shared_IPollForActivityTaskResponse | undefined, number]>): Promise<activityTask> {
    const [response, startTime] = await pollFunc(ctx);

    if (response == null || response.taskToken == null || response.taskToken.length === 0) {
      return new activityTask({
        pollStartTime: 0,
        autoConfigHint: response?.autoConfigHint,
      });
    }

    const workflowType = response.workflowType?.name ?? "";
    const activityType = response.activityType?.name ?? "";
    const metricsScope = getMetricsScopeForActivity(this.metricsScope!, workflowType, activityType);

    metricsScope.Counter(ActivityPollSucceedCounter).Inc(1);
    EmitLatency(
      metricsScope,
      ActivityPollLatency,
      Date.now() * 1_000_000 - startTime,
      Default1ms100s,
    );

    const scheduledToStartLatency =
      (response.startedTimestamp?.toNumber() ?? 0) -
      (response.scheduledTimestampOfThisAttempt?.toNumber() ?? 0);

    EmitLatency(
      metricsScope,
      ActivityScheduledToStartLatency,
      scheduledToStartLatency,
      High1ms24h,
    );

    return new activityTask({
      task: response,
      pollStartTime: startTime,
      autoConfigHint: response.autoConfigHint,
    });
  }

  async PollTask(): Promise<unknown> {
    const activityTask = await this.doPoll(
      this.featureFlags,
      this.pollWithMetricsFunc((ctx) => this.poll(ctx)),
    );
    return activityTask;
  }

  async poll(ctx: Context): Promise<[shared_IPollForActivityTaskResponse, number]> {
    this.metricsScope!.Counter(ActivityPollCounter).Inc(1);
    const startTime = Date.now() * 1_000_000;

    traceLog(() => {
      this.logger!.debug("activityTaskPoller::Poll");
    });

    const request = new shared_PollForActivityTaskRequest({
      domain: StringPtr(this.domain),
      taskList: this.taskList,
      identity: StringPtr(this.identity),
      taskListMetadata: new shared_TaskListMetadata({
        maxTasksPerSecond: this.activitiesPerSecond,
      }),
    });

    let response: shared_IPollForActivityTaskResponse;
    try {
      response = await this.service!.PollForActivityTask(
        ctx,
        request,
        ...getYarpcCallOptions(this.featureFlags),
      );
    } catch (caught) {
      if (!(caught instanceof Error)) {
        throw caught;
      }
      const err = caught;
      const retryable = isServiceTransientError(err);

      if (retryable) {
        if (err instanceof ServiceBusyError) {
          this.metricsScope!
            .Tagged({ [causeTag]: serviceBusy })
            .Counter(ActivityPollTransientFailedCounter)
            .Inc(1);
        } else {
          this.metricsScope!.Counter(ActivityPollTransientFailedCounter).Inc(1);
        }
      } else {
        this.metricsScope!.Counter(ActivityPollFailedCounter).Inc(1);
      }

      const retryAfter = ErrRetryableAfter(err);
      if (retryAfter > 0) {
        await selectOne([
          mapCase(recvCase(ctx.done()), () => true),
          mapCase(timeoutCase(retryAfter), () => false),
        ]);
      }

      throw err;
    }

    if (response == null || response.taskToken!.length === 0) {
      this.metricsScope!.Counter(ActivityPollNoTaskCounter).Inc(1);
      return [response, startTime];
    }

    return [response, startTime];
  }

  async ProcessTask(task: unknown): Promise<void> {
    if (this.shuttingDown()) {
      throw errShutdown;
    }

    const activityTaskLocal = task as activityTask;
    if (activityTaskLocal.task == null) {
      traceLog(() => {
        this.logger!.debug("Activity task unavailable");
      });
      return;
    }

    const workflowType = activityTaskLocal.task.workflowType?.name ?? "";
    const activityType = activityTaskLocal.task.activityType?.name ?? "";
    const metricsScope = getMetricsScopeForActivity(this.metricsScope!, workflowType, activityType);

    const executionStartTime = Date.now() * 1_000_000;
    let request: unknown;
    try {
      request = await this.taskHandler!.Execute(
        (this.taskList!.name ?? ""),
        activityTaskLocal.task,
      );
    } catch (err) {
      if (!(err instanceof Error)) {
        throw err;
      }
      metricsScope.Counter(ActivityExecutionFailedCounter).Inc(1);
      throw err;
    }

    EmitLatency(
      metricsScope,
      ActivityExecutionLatency,
      Date.now() * 1_000_000 - executionStartTime,
      High1ms24h,
    );

    if (request === ErrActivityResultPending) {
      return;
    }

    if (this.shuttingDown()) {
      throw errShutdown;
    }

    const responseStartTime = Date.now() * 1_000_000;
    try {
      await reportActivityComplete(
        background(),
        this.service!,
        request,
        metricsScope,
        this.featureFlags,
      );
    } catch (err) {
      if (!(err instanceof Error)) {
        throw err;
      }
      metricsScope.Counter(ActivityResponseFailedCounter).Inc(1);
      traceLog(() => {
        this.logger!.debug("reportActivityComplete failed", { error: err });
      });
      throw err;
    }

    EmitLatency(
      metricsScope,
      ActivityResponseLatency,
      Date.now() * 1_000_000 - responseStartTime,
      Default1ms100s,
    );
    EmitLatency(
      metricsScope,
      ActivityEndToEndLatency,
      Date.now() * 1_000_000 - activityTaskLocal.pollStartTime,
      High1ms24h,
    );
  }

}

/**
 * locallyDispatchedActivityTaskPoller implements polling/processing a locally dispatched activity task
 */
export class locallyDispatchedActivityTaskPoller extends activityTaskPoller implements taskPoller {
  constructor(init?: Partial<locallyDispatchedActivityTaskPoller>) {
    super(init);
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  ldaTunnel?: locallyDispatchedActivityTunnel;

  async PollTask(): Promise<unknown> {
    const activityTask = await this.doPoll(
      this.featureFlags,
      this.pollWithMetricsFunc(this.pollLocallyDispatchedActivity.bind(this)),
    );
    return activityTask;
  }

  async pollLocallyDispatchedActivity(ctx: Context): Promise<[shared_IPollForActivityTaskResponse | undefined, number]> {
    const task = await this.ldaTunnel!.getTask();
    this.metricsScope!.Counter(LocallyDispatchedActivityPollCounter).Inc(1);
    const startTime = Date.now() * 1_000_000;
    if (task == null) {
      this.metricsScope!.Counter(LocallyDispatchedActivityPollNoTaskCounter).Inc(1);
      return [undefined, startTime];
    }
    this.metricsScope!.Counter(ActivityPollCounter).Inc(1);
    this.metricsScope!.Counter(LocallyDispatchedActivityPollSucceedCounter).Inc(1);
    const response = new shared_PollForActivityTaskResponse({
      activityId: task.ActivityID!,
      activityType: task.ActivityType!,
      header: task.Header!,
      input: task.Input!,
      workflowExecution: task.WorkflowExecution!,
      scheduledTimestampOfThisAttempt: new Int64(task.ScheduledTimestampOfThisAttempt!),
      scheduledTimestamp: new Int64(task.ScheduledTimestamp!),
      scheduleToCloseTimeoutSeconds: task.ScheduleToCloseTimeoutSeconds!,
      startedTimestamp: new Int64(task.StartedTimestamp!),
      startToCloseTimeoutSeconds: task.StartToCloseTimeoutSeconds!,
      heartbeatTimeoutSeconds: task.HeartbeatTimeoutSeconds!,
      taskToken: task.TaskToken!,
      workflowType: task.WorkflowType!,
      workflowDomain: task.WorkflowDomain!,
      attempt: Int32Ptr(0),
    });
    return [response, startTime];
  }

}

export class historyIteratorImpl implements HistoryIterator {
  constructor(init?: Partial<historyIteratorImpl>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  iteratorFunc?: (p0: Buffer) => [shared_IHistory, Buffer] | Promise<[shared_IHistory, Buffer]>;

  execution?: shared_IWorkflowExecution;

  nextPageToken?: Buffer;

  domain: string = "";

  service?: WorkflowServiceClientLike;

  metricsScope?: Scope;

  startedEventID: number = 0;

  maxEventID: number = 0;

  featureFlags: internal_FeatureFlags = { WorkflowExecutionAlreadyCompletedErrorEnabled: false, AutoforwardingEnabled: false, PollerAutoScalerEnabled: false, EphemeralTaskListsEnabled: false, MetricEmitMode: 0 };

  async GetNextPage(): Promise<shared_IHistory> {
    if (this.iteratorFunc == null) {
      this.iteratorFunc = newGetHistoryPageFunc(
        background(),
        this.service!,
        this.domain,
        this.execution!,
        this.startedEventID,
        this.maxEventID,
        this.metricsScope!,
        this.featureFlags
      );
    }

    const [history, token] = await this.iteratorFunc!(this.nextPageToken!);
    this.nextPageToken = token;
    return history;
  }

  Reset(): void {
    this.nextPageToken = undefined;
  }

  HasNextPage(): boolean {
    return this.nextPageToken! != null;
  }

  GetHistoryCount(): number {
    return this.maxEventID;
  }

}

export class localActivityTaskPoller extends basePoller implements taskPoller {
  constructor(init?: Partial<localActivityTaskPoller>) {
    super(init);
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  handler?: localActivityTaskHandler;

  metricsScope?: Scope;

  logger?: Logger;

  laTunnel?: localActivityTunnel;

  async PollTask(): Promise<unknown> {
      return await this.laTunnel!.getTask();
  }

  async ProcessTask(task: unknown): Promise<void> {
    if (this.shuttingDown()) {
      throw errShutdown;
    }

    const result = await this.handler!.executeLocalActivityTask(task as localActivityTask);
    const workflowTask = result.task!.workflowTask!;

    await selectOne([
      mapCase(sendCase(workflowTask.laResultCh, result), () => undefined),
      mapCase(recvCase(workflowTask.doneCh), () => undefined),
    ]);
  }

}

export class localActivityTaskHandler {
  constructor(init?: Partial<localActivityTaskHandler>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  userContext?: Context;

  metricsScope?: TaggedScope;

  logger?: Logger;

  dataConverter?: internal_DataConverter;

  contextPropagators: internal_ContextPropagator[] = [];

  tracer?: unknown;

  activityTracker?: common_debug_ActivityTracker;

  async executeLocalActivityTask(task: localActivityTask): Promise<localActivityResult> {
    const workflowType = task.params!.WorkflowInfo!.WorkflowType.Name;
    const activityType = task.params!.ActivityType;
    const metricsScope = getMetricsScopeForLocalActivity(this.metricsScope!, workflowType, activityType);

    const logger = this.logger!.child({
      [tagLocalActivityID]: task.activityID,
      [tagLocalActivityType]: activityType,
      [tagWorkflowType]: workflowType,
      [tagWorkflowID]: task.params!.WorkflowInfo!.WorkflowExecution.ID,
      [tagRunID]: task.params!.WorkflowInfo!.WorkflowExecution.RunID,
      [tagAttempt]: task.attempt,
    });

    metricsScope.Counter(LocalActivityTotalCounter).Inc(1);

    const ae = new activityExecutor({
      name: activityType,
      fn: task.params!.ActivityFn!,
      options: {
        Name: "",
        EnableShortName: false,
        DisableAlreadyRegisteredCheck: false,
        EnableAutoHeartbeat: false,
      },
      path: "",
    });

    let rootCtx = this.userContext;
    if (rootCtx == null) {
      rootCtx = background();
    }

    const workflowTypeLocal = task.params!.WorkflowInfo!.WorkflowType;
    let ctx = withValue(
      rootCtx,
      activityEnvContextKey,
      new activityEnvironment({
        workflowType: workflowTypeLocal,
        workflowDomain: task.params!.WorkflowInfo!.Domain,
        taskList: task.params!.WorkflowInfo!.TaskListName,
        activityType: { Name: activityType, Path: "" },
        activityID: task.activityID,
        workflowExecution: task.params!.WorkflowInfo!.WorkflowExecution,
        logger,
        metricsScope,
        isLocalActivity: true,
        dataConverter: this.dataConverter,
        attempt: task.attempt,
        contextPropagators: [],
        deadline: 0,
        heartbeatDetails: Buffer.alloc(0),
        heartbeatTimeout: 0,
        scheduledTimestamp: 0,
        startedTimestamp: 0,
        taskToken: Buffer.alloc(0),
      }),
    );

    for (const ctxProp of this.contextPropagators) {
      ctx = ctxProp.Extract(ctx, NewHeaderReader(task.header!));
    }

    const timeoutDuration =
      task.params!.localActivityOptions.ScheduleToCloseTimeoutSeconds * Second;
    let deadline = Date.now() * 1_000_000 + timeoutDuration;
    if (task.attempt > 0 && task.expireTime !== 0 && task.expireTime < deadline) {
      deadline = task.expireTime;
    }

    const [ctxLocal, cancel] = withDeadline(ctx, deadline);

    await task.Lock();
    if (task.canceled) {
      task.Unlock();
      return { backoff: 0, err: goErrCanceled, task };
    }
    task.Unlock();

    let laResult: Buffer = Buffer.alloc(0);
    let err: Error | null = null;
    let completed = false;

    const donePromise = new Promise<void>((resolve) => {
      const createdBy = (new Error().stack ?? "").split("\n").slice(2).join("\n");

      void (async () => {
        try {
          try {
            const laStartTime = Date.now() * 1_000_000;
            const [activityCtx, span] = createOpenTracingActivitySpan(
              ctxLocal,
              this.tracer!,
              Date.now() * 1_000_000,
              task.params!.ActivityType,
              task.params!.WorkflowInfo!.WorkflowExecution.ID,
              task.params!.WorkflowInfo!.WorkflowExecution.RunID,
            );

            const activityInfo = {
              TaskList: task.params!.WorkflowInfo!.TaskListName,
              ActivityType: activityType,
            };

            const stopper = this.activityTracker!.Start(activityInfo);
            try {
              try {
                laResult = await ae.ExecuteWithActualArgs(activityCtx, task.params!.InputArgs);
              } catch (caught) {
                if (!(caught instanceof Error)) {
                  throw caught;
                }
                err = caught;
              }

              const executionLatency = Date.now() * 1_000_000 - laStartTime;
              EmitLatency(
                metricsScope,
                LocalActivityExecutionLatency,
                executionLatency,
                Default1ms100s,
              );

              if (executionLatency > timeoutDuration) {
                logger.warn("LocalActivity takes too long to complete.", {
                  ScheduleToCloseTimeoutSeconds:
                    task.params!.localActivityOptions.ScheduleToCloseTimeoutSeconds,
                  ActualExecutionDuration: executionLatency,
                });
              }
            } finally {
              try {
                (span as { end(): void }).end();
              } finally {
                stopper.Stop();
              }
            }
          } catch (panicValue) {
            const topLine = `local activity for ${activityType} [panic]:`;
            let stackTrace = getStackTraceRaw(topLine, 4, 0);
            if (createdBy !== "") {
              stackTrace = `${stackTrace}\ncreated by:\n${createdBy}`;
            }

            logger.error("LocalActivity panic.", {
              [tagPanicError]:
                panicValue instanceof Error
                  ? panicValue.message
                  : typeof (panicValue as { String?: unknown }).String === "function"
                    ? (panicValue as { String(): string }).String()
                    : globalThis.String(panicValue),
              [tagPanicStack]: stackTrace,
            });
            metricsScope.Counter(LocalActivityPanicCounter).Inc(1);
            err = newPanicError(panicValue, stackTrace);
          }
        } finally {
          completed = true;
          resolve();
        }
      })();
    });

    while (true) {
      const outcome = await selectOne([
        mapCase(recvCase(ctxLocal.done()), () => ({ kind: "cancel" as const })),
        mapCase(promiseCase(donePromise), () => ({ kind: "done" as const })),
      ]);

      if (outcome.kind === "done" || completed) {
        break;
      }

      if (completed) {
        break;
      }

      const contextErr = ctxLocal.err();
      if (contextErr === goErrCanceled) {
        metricsScope.Counter(LocalActivityCanceledCounter).Inc(1);
        return { backoff: 0, err: goErrCanceled, task };
      }
      if (contextErr === goErrDeadlineExceeded) {
        metricsScope.Counter(LocalActivityTimeoutCounter).Inc(1);
        return { backoff: 0, err: goErrDeadlineExceeded, task };
      }
      return { backoff: 0, err: NewCustomError("unexpected context done"), task };
    }

    return { backoff: 0, result: laResult, err, task };
  }

}

export class localActivityTunnel {
  constructor(init?: Partial<localActivityTunnel>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  taskCh?: Channel<localActivityTask>;

  resultCh?: Channel<unknown>;

  stopCh?: Channel<{}>;

  async getTask(): Promise<localActivityTask | undefined> {
    const outcome = await selectOne([
      mapCase(recvCase(this.taskCh!), (r) => ({ kind: 'task' as const, r })),
      mapCase(recvCase(this.stopCh!), () => ({ kind: 'stop' as const })),
    ]);
    if (outcome.kind === 'stop') {
      return undefined;
    }
    return outcome.r.value!;
  }

  async sendTask(task: localActivityTask): Promise<boolean> {
    const outcome = await selectOne([
      mapCase(sendCase(this.taskCh, task), () => ({ kind: 'task' as const })),
      mapCase(recvCase(this.stopCh), () => ({ kind: 'stop' as const })),
    ]);

    return outcome.kind === 'task';
  }

}

export class locallyDispatchedActivityTunnel implements localDispatcher {
  constructor(init?: Partial<locallyDispatchedActivityTunnel>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  taskCh?: Channel<locallyDispatchedActivityTask>;

  stopCh?: Channel<{}>;

  metricsScope?: TaggedScope;

  async getTask(): Promise<locallyDispatchedActivityTask | undefined> {
    const first = await selectOne([
      mapCase(recvCase(this.taskCh), (r) => ({
        kind: 'task' as const,
        task: r.value!,
      })),
      mapCase(recvCase(this.stopCh), () => ({
        kind: 'stop' as const,
      })),
    ]);

    if (first.kind === 'stop') {
      return undefined;
    }

    const task = first.task;
    const second = await selectOne([
      mapCase(recvCase(task.readyCh), (r) => ({
        kind: 'ready' as const,
        ready: r.value ?? false,
      })),
      mapCase(recvCase(this.stopCh), () => ({
        kind: 'stop' as const,
      })),
    ]);

    if (second.kind === 'stop' || !second.ready) {
      return undefined;
    }

    return task;
  }

  SendTask(task: locallyDispatchedActivityTask): boolean {
      return this.taskCh?.trySend(task) ?? false;
  }

}

export function newLocalActivityTunnel(stopCh: Channel<{}>): localActivityTunnel {
  return new localActivityTunnel({
    taskCh: new Channel<localActivityTask>(1000),
    resultCh: new Channel<unknown>(0),
    stopCh
  });
}

export function newLocallyDispatchedActivityTunnel(stopCh: Channel<{}>): locallyDispatchedActivityTunnel {
  return new locallyDispatchedActivityTunnel({
    taskCh: new Channel<locallyDispatchedActivityTask>(0),
    stopCh,
  });
}

export function isClientSideError(err: Error | null): boolean {
  if (err === goErrDeadlineExceeded) {
    return true;
  }

  return false;
}

/**
 * newWorkflowTaskPoller creates a new workflow task poller which must have a one to one relationship to workflow worker
 */
export function newWorkflowTaskPoller(taskHandler: WorkflowTaskHandler, ldaTunnel: locallyDispatchedActivityTunnel | undefined, service: WorkflowServiceClientLike, domain: string, params: workerExecutionParameters): workflowTaskPoller {
  let ldaTunnelInterface: localDispatcher | undefined;
  if (ldaTunnel != null) {
    ldaTunnelInterface = ldaTunnel;
  }

  return new workflowTaskPoller({
    shutdownC: params.WorkerStopChannel!,
    service,
    domain,
    taskListName: params.TaskList!.name ?? "",
    identity: params.Identity,
    taskHandler,
    ldaTunnel: ldaTunnelInterface,
    metricsScope: NewTaggedScope(params.MetricsScope!),
    logger: params.Logger!,
    stickyUUID: globalThis.crypto.randomUUID(),
    disableStickyExecution: params.DisableStickyExecution,
    StickyScheduleToStartTimeout: params.StickyScheduleToStartTimeout,
    featureFlags: params.FeatureFlags,
    pendingRegularPollCount: 0,
    pendingStickyPollCount: 0,
    requestLock: new Mutex(),
    stickyBacklog: 0,
  });
}

export function newLocalActivityPoller(params: workerExecutionParameters, laTunnel: localActivityTunnel): localActivityTaskPoller {
  if (params.Tracer == null) {
    params.Tracer = trace.getTracer('noop');
  }
  if (params.WorkerStats.ActivityTracker == null) {
    params.WorkerStats.ActivityTracker = NewNoopActivityTracker();
  }
  const handler = new localActivityTaskHandler({
    userContext: params.UserContext!,
    metricsScope: NewTaggedScope(params.MetricsScope),
    logger: params.Logger!,
    dataConverter: params.DataConverter!,
    contextPropagators: params.ContextPropagators,
    tracer: params.Tracer!,
    activityTracker: params.WorkerStats.ActivityTracker!,
  });
  return new localActivityTaskPoller({
    shutdownC: params.WorkerStopChannel!,
    handler,
    metricsScope: params.MetricsScope!,
    logger: params.Logger!,
    laTunnel,
  });
}

export function shouldTruncateHistory(h: shared_IHistory, maxEventID: number): boolean {
    const size = h.events?.length ?? 0;
    return size > 0 && maxEventID > 0 && (h.events![size - 1]!.eventId?.toNumber() ?? 0) > maxEventID;
}

export function isQueryTask(atDecisionTaskCompletedEventID: number): boolean {
  return atDecisionTaskCompletedEventID === 0;
}

export function newActivityTaskPoller(taskHandler: ActivityTaskHandler, service: WorkflowServiceClientLike, domain: string, params: workerExecutionParameters): activityTaskPoller {
  const activityTaskPollerLocal = new activityTaskPoller({
    shutdownC: params.WorkerStopChannel!,
    taskHandler,
    service,
    domain,
    taskList: params.TaskList!,
    identity: params.Identity,
    logger: params.Logger!,
    metricsScope: NewTaggedScope(params.MetricsScope!),
    activitiesPerSecond: params.TaskListActivitiesPerSecond,
    featureFlags: params.FeatureFlags,
  });
  return activityTaskPollerLocal;
}

export async function reportActivityComplete(ctx: Context, service: WorkflowServiceClientLike, request: unknown | undefined, metricsScope: Scope, featureFlags: internal_FeatureFlags): Promise<void> {
    if (request == null) {
        return;
    }

    if (request instanceof shared_RespondActivityTaskCanceledRequest) {
        await Retry(
            ctx,
            async () => {
                const [tchCtx, cancel, opt] = newChannelContext(ctx, featureFlags);
                try {
                    await service.RespondActivityTaskCanceled(tchCtx, request, ...opt);
                } finally {
                    cancel();
                }
            },
            createDynamicServiceRetryPolicy(ctx),
            isServiceTransientError,
        );
    } else if (request instanceof shared_RespondActivityTaskFailedRequest) {
        await Retry(
            ctx,
            async () => {
                const [tchCtx, cancel, opt] = newChannelContext(ctx, featureFlags);
                try {
                    await service.RespondActivityTaskFailed(tchCtx, request, ...opt);
                } finally {
                    cancel();
                }
            },
            createDynamicServiceRetryPolicy(ctx),
            isServiceTransientError,
        );
    } else if (request instanceof shared_RespondActivityTaskCompletedRequest) {
        await Retry(
            ctx,
            async () => {
                const [tchCtx, cancel, opt] = newChannelContext(ctx, featureFlags);
                try {
                    await service.RespondActivityTaskCompleted(tchCtx, request, ...opt);
                } finally {
                    cancel();
                }
            },
            createDynamicServiceRetryPolicy(ctx),
            isServiceTransientError,
        );
    }

    if (request instanceof shared_RespondActivityTaskCanceledRequest) {
        metricsScope.Counter(ActivityTaskCanceledCounter).Inc(1);
        metricsScope.Counter(ActivityTaskFailedCounter).Inc(1);
    } else if (request instanceof shared_RespondActivityTaskFailedRequest) {
        metricsScope.Counter(ActivityTaskFailedCounter).Inc(1);
    } else if (request instanceof shared_RespondActivityTaskCompletedRequest) {
        metricsScope.Counter(ActivityTaskCompletedCounter).Inc(1);
    }
}

export async function reportActivityCompleteByID(ctx: Context, service: WorkflowServiceClientLike, request: unknown | undefined, metricsScope: Scope, featureFlags: internal_FeatureFlags): Promise<void> {
    if (request == null) {
        return;
    }

    if (request instanceof RespondActivityTaskCanceledByIDRequest) {
        await Retry(
            ctx,
            async () => {
                const [tchCtx, cancel, opt] = newChannelContext(ctx, featureFlags);
                try {
                    await service.RespondActivityTaskCanceledByID(tchCtx, request, ...opt);
                } finally {
                    cancel();
                }
            },
            createDynamicServiceRetryPolicy(ctx),
            isServiceTransientError,
        );
    } else if (request instanceof RespondActivityTaskFailedByIDRequest) {
        await Retry(
            ctx,
            async () => {
                const [tchCtx, cancel, opt] = newChannelContext(ctx, featureFlags);
                try {
                    await service.RespondActivityTaskFailedByID(tchCtx, request, ...opt);
                } finally {
                    cancel();
                }
            },
            createDynamicServiceRetryPolicy(ctx),
            isServiceTransientError,
        );
    } else if (request instanceof RespondActivityTaskCompletedByIDRequest) {
        await Retry(
            ctx,
            async () => {
                const [tchCtx, cancel, opt] = newChannelContext(ctx, featureFlags);
                try {
                    await service.RespondActivityTaskCompletedByID(tchCtx, request, ...opt);
                } finally {
                    cancel();
                }
            },
            createDynamicServiceRetryPolicy(ctx),
            isServiceTransientError,
        );
    }

    if (request instanceof RespondActivityTaskCanceledByIDRequest) {
        metricsScope.Counter(ActivityTaskCanceledByIDCounter).Inc(1);
        metricsScope.Counter(ActivityTaskFailedByIDCounter).Inc(1);
    } else if (request instanceof RespondActivityTaskFailedByIDRequest) {
        metricsScope.Counter(ActivityTaskFailedByIDCounter).Inc(1);
    } else if (request instanceof RespondActivityTaskCompletedByIDRequest) {
        metricsScope.Counter(ActivityTaskCompletedByIDCounter).Inc(1);
    }
}

export function convertActivityResultToRespondRequest(identity: string, taskToken: Buffer, result: Buffer | undefined, err: Error | null, dataConverter: internal_DataConverter): unknown {
    if (err === ErrActivityResultPending) {
        return ErrActivityResultPending;
    }

    if (err == null) {
        return new shared_RespondActivityTaskCompletedRequest({
            taskToken,
            result: result!,
            identity: StringPtr(identity)!
        });
    }

    const [reason, details] = getErrorDetails(err, dataConverter);

    if (err instanceof internal_CanceledError || err === goErrCanceled) {
        return new shared_RespondActivityTaskCanceledRequest({
            taskToken,
            details,
            identity: StringPtr(identity)!
        });
    }

    return new shared_RespondActivityTaskFailedRequest({
        taskToken,
        reason: StringPtr(reason)!,
        details,
        identity: StringPtr(identity)!
    });
}

export function convertActivityResultToRespondRequestByID(identity: string, domain: string, workflowID: string, runID: string, activityID: string, result: Buffer, err: Error | null, dataConverter: internal_DataConverter): unknown | undefined {
    if (err === ErrActivityResultPending) {
        return undefined;
    }

    if (err == null) {
        return new RespondActivityTaskCompletedByIDRequest({
            domain: StringPtr(domain),
            workflowID: StringPtr(workflowID),
            runID: StringPtr(runID),
            activityID: StringPtr(activityID),
            result,
            identity: StringPtr(identity)
        });
    }

    const [reason, details] = getErrorDetails(err, dataConverter);

    if (err instanceof internal_CanceledError || err === goErrCanceled) {
        return new RespondActivityTaskCanceledByIDRequest({
            domain: StringPtr(domain),
            workflowID: StringPtr(workflowID),
            runID: StringPtr(runID),
            activityID: StringPtr(activityID),
            details,
            identity: StringPtr(identity)
        });
    }

    return new RespondActivityTaskFailedByIDRequest({
        domain: StringPtr(domain),
        workflowID: StringPtr(workflowID),
        runID: StringPtr(runID),
        activityID: StringPtr(activityID),
        reason: StringPtr(reason),
        details,
        identity: StringPtr(identity)
    });
}

export function newLocallyDispatchedActivityTaskPoller(taskHandler: ActivityTaskHandler, service: WorkflowServiceClientLike, domain: string, params: workerExecutionParameters): locallyDispatchedActivityTaskPoller {
  const locallyDispatchedActivityTaskPollerLocal = new locallyDispatchedActivityTaskPoller({
    ...newActivityTaskPoller(taskHandler, service, domain, params),
    ldaTunnel: newLocallyDispatchedActivityTunnel(params.WorkerStopChannel!),
  });
  return locallyDispatchedActivityTaskPollerLocal;
}

export function newGetHistoryPageFunc(ctx: Context, service: WorkflowServiceClientLike, domain: string, execution: shared_IWorkflowExecution, atDecisionTaskCompletedEventID: number, maxEventID: number, metricsScope: Scope, featureFlags: internal_FeatureFlags): (p0: Buffer) => [shared_IHistory, Buffer] | Promise<[shared_IHistory, Buffer]> {
    return (nextPageToken: Buffer) => {
        metricsScope.Counter(WorkflowGetHistoryCounter).Inc(1);
        const startTime = Date.now() * 1_000_000;
        let resp!: shared_IGetWorkflowExecutionHistoryResponse;

        const retryResult = Retry(
            ctx,
            () => {
                const [tchCtx, cancel, opt] = newChannelContext(ctx, featureFlags);
                const request = new shared_GetWorkflowExecutionHistoryRequest({
                    domain: StringPtr(domain),
                    execution,
                    nextPageToken,
                });
                return service.GetWorkflowExecutionHistory(tchCtx, request, ...opt)
                    .then((result) => {
                        resp = result;
                    })
                    .finally(cancel);
            },
            createDynamicServiceRetryPolicy(ctx),
            isServiceTransientError,
        ).catch((err) => {
            if (!(err instanceof Error)) {
                throw err;
            }
            metricsScope.Counter(WorkflowGetHistoryFailedCounter).Inc(1);
            throw err;
        });

        return retryResult.then(() => {
            metricsScope.Counter(WorkflowGetHistorySucceedCounter).Inc(1);
            EmitLatency(
                metricsScope,
                WorkflowGetHistoryLatency,
                Date.now() * 1_000_000 - startTime,
                Default1ms100s,
            );

            if (!resp) {
                throw new Error('newGetHistoryPageFunc: missing history response');
            }

            let h: shared_IHistory;
            if (resp.rawHistory != null) {
                h = DeserializeBlobDataToHistoryEvents(resp.rawHistory!, HistoryEventFilterType.ALL_EVENT);
            } else {
                h = resp.history!;
            }

            if (shouldTruncateHistory(h, atDecisionTaskCompletedEventID)) {
                const first = (h.events![0]!.eventId?.toNumber() ?? 0);
                h.events = h.events!.slice(0, atDecisionTaskCompletedEventID - first + 1);
                if (h.events![h.events!.length - 1]!.eventType !== EventType.DecisionTaskCompleted) {
                    throw new Error(
                        `newGetHistoryPageFunc: atDecisionTaskCompletedEventID(${atDecisionTaskCompletedEventID}) points to event that is not DecisionTaskCompleted`,
                    );
                }
                return [h, Buffer.alloc(0)];
            }

            if (shouldTruncateHistory(h, maxEventID) && isQueryTask(atDecisionTaskCompletedEventID)) {
                const first = (h.events![0]!.eventId?.toNumber() ?? 0);
                h.events = h.events!.slice(0, maxEventID - first + 1);
                return [h, Buffer.alloc(0)];
            }

            return [h, resp.nextPageToken!];
        });
    };
}

export const pollTaskServiceTimeOut = 150000000000;

export const ratioToForceCompleteDecisionTaskComplete = 0.8;

export const serviceBusy = "serviceBusy";

export const stickyDecisionScheduleToStartTimeoutSeconds = 5;
