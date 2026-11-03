import { GetWorkflowExecutionHistoryRequest as shared_GetWorkflowExecutionHistoryRequest } from '../generated/thrift/cadence-idl/com/uber/cadence/GetWorkflowExecutionHistoryRequest.js';
import { RefreshWorkflowTasksRequest as shared_RefreshWorkflowTasksRequest } from '../generated/thrift/cadence-idl/com/uber/cadence/RefreshWorkflowTasksRequest.js';
import { SignalWithStartWorkflowExecutionAsyncRequest as shared_SignalWithStartWorkflowExecutionAsyncRequest } from '../generated/thrift/cadence-idl/com/uber/cadence/SignalWithStartWorkflowExecutionAsyncRequest.js';
import { Int64 } from '@creditkarma/thrift-server-core';
import { StartWorkflowExecutionAsyncRequest as shared_StartWorkflowExecutionAsyncRequest } from '../generated/thrift/cadence-idl/com/uber/cadence/StartWorkflowExecutionAsyncRequest.js';
import { TerminateWorkflowExecutionRequest as shared_TerminateWorkflowExecutionRequest } from '../generated/thrift/cadence-idl/com/uber/cadence/TerminateWorkflowExecutionRequest.js';
import { WorkflowQuery as shared_WorkflowQuery } from '../generated/thrift/cadence-idl/com/uber/cadence/WorkflowQuery.js';
import { QueryWorkflowRequest as shared_QueryWorkflowRequest } from '../generated/thrift/cadence-idl/com/uber/cadence/QueryWorkflowRequest.js';
import { DescribeWorkflowExecutionRequest as shared_DescribeWorkflowExecutionRequest } from '../generated/thrift/cadence-idl/com/uber/cadence/DescribeWorkflowExecutionRequest.js';
import { TaskList as shared_TaskList } from '../generated/thrift/cadence-idl/com/uber/cadence/TaskList.js';
import { DescribeTaskListRequest as shared_DescribeTaskListRequest } from '../generated/thrift/cadence-idl/com/uber/cadence/DescribeTaskListRequest.js';
import { WorkflowExecution as shared_WorkflowExecution } from '../generated/thrift/cadence-idl/com/uber/cadence/WorkflowExecution.js';
import { RequestCancelWorkflowExecutionRequest as shared_RequestCancelWorkflowExecutionRequest } from '../generated/thrift/cadence-idl/com/uber/cadence/RequestCancelWorkflowExecutionRequest.js';
import { convertActivityResultToRespondRequestByID, reportActivityCompleteByID, convertActivityResultToRespondRequest, reportActivityComplete } from './internal_task_pollers.js';
import { encodeArg, encodeArgs } from './internal_worker.js';
import { convertQueryConsistencyLevel, convertActiveClusterSelectionPolicy, convertRetryPolicy } from './convert.js';
import { NewCanceledError, NewTimeoutError, newTerminatedError } from './error.js';
import { deSerializeFunctionResult } from './internal_activity.js';
import { newEncodedValues } from './workflow_testsuite.js';
import { EventType } from '../generated/thrift/cadence-idl/com/uber/cadence/EventType.js';
import { recordActivityHeartbeat, signalWorkflow, recordActivityHeartbeatByID } from './internal_task_handlers.js';
import { WorkflowSignalWithStartCounter, WorkflowStartCounter, WorkflowStartAsyncCounter, WorkflowSignalWithStartAsyncCounter } from './common/metrics/constants.js';
import { tagTaskList, tagWorkflowType } from './internal_logging_tags.js';
import { workflow, getValidatedWorkflowFunction } from './internal_workflow.js';
import { createOpenTracingWorkflowSpan } from './propagation.js';
import { DeserializeBlobDataToHistoryEvents } from './common/serializer/history_serializer.js';
import { Span } from '@opentelemetry/api';
// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { Option, internal_Client, internal_QueryConsistencyLevel, internal_StartWorkflowOptions, CancelReason, internal_WorkflowIDReusePolicy_toThriftPtr } from './client.js';
import { TaggedScope } from './common/metrics/scope.js';
import { internal_DataConverter, internal_Value } from './encoded.js';
import { internal_ContextPropagator, NewHeaderWriter } from './headers.js';
import { internal_FeatureFlags, newChannelContext, constructError, chanTimeout, minRPCTimeout, newChannelContextForQuery, workflowTypePtr } from './internal_utils.js';
import { registry } from './registry.js';
import { WorkflowExecutionAsync, internal_WorkflowExecution, newEncodedValue } from './workflow.js';
import type { WorkflowServiceClientLike } from './runtime/workflow_service_client_like.js';
import { Context, ErrDeadlineExceeded } from './runtime/context.js';
import { Minute, Second } from './runtime/time.js';
import { ICountWorkflowExecutionsRequest as shared_ICountWorkflowExecutionsRequest } from '../generated/thrift/cadence-idl/com/uber/cadence/CountWorkflowExecutionsRequest.js';
import { ICountWorkflowExecutionsResponse as shared_ICountWorkflowExecutionsResponse } from '../generated/thrift/cadence-idl/com/uber/cadence/CountWorkflowExecutionsResponse.js';
import { IDescribeTaskListResponse as shared_IDescribeTaskListResponse } from '../generated/thrift/cadence-idl/com/uber/cadence/DescribeTaskListResponse.js';
import { IDescribeWorkflowExecutionResponse as shared_IDescribeWorkflowExecutionResponse } from '../generated/thrift/cadence-idl/com/uber/cadence/DescribeWorkflowExecutionResponse.js';
import { IGetSearchAttributesResponse as shared_IGetSearchAttributesResponse } from '../generated/thrift/cadence-idl/com/uber/cadence/GetSearchAttributesResponse.js';
import { IGetWorkflowExecutionHistoryResponse as shared_IGetWorkflowExecutionHistoryResponse } from '../generated/thrift/cadence-idl/com/uber/cadence/GetWorkflowExecutionHistoryResponse.js';
import { IHeader as shared_IHeader, Header as shared_Header } from '../generated/thrift/cadence-idl/com/uber/cadence/Header.js';
import { IHistoryEvent as shared_IHistoryEvent } from '../generated/thrift/cadence-idl/com/uber/cadence/HistoryEvent.js';
import { HistoryEventFilterType as shared_HistoryEventFilterType } from '../generated/thrift/cadence-idl/com/uber/cadence/HistoryEventFilterType.js';
import { IListArchivedWorkflowExecutionsRequest as shared_IListArchivedWorkflowExecutionsRequest } from '../generated/thrift/cadence-idl/com/uber/cadence/ListArchivedWorkflowExecutionsRequest.js';
import { IListArchivedWorkflowExecutionsResponse as shared_IListArchivedWorkflowExecutionsResponse } from '../generated/thrift/cadence-idl/com/uber/cadence/ListArchivedWorkflowExecutionsResponse.js';
import { IListClosedWorkflowExecutionsRequest as shared_IListClosedWorkflowExecutionsRequest } from '../generated/thrift/cadence-idl/com/uber/cadence/ListClosedWorkflowExecutionsRequest.js';
import { IListClosedWorkflowExecutionsResponse as shared_IListClosedWorkflowExecutionsResponse } from '../generated/thrift/cadence-idl/com/uber/cadence/ListClosedWorkflowExecutionsResponse.js';
import { IListOpenWorkflowExecutionsRequest as shared_IListOpenWorkflowExecutionsRequest } from '../generated/thrift/cadence-idl/com/uber/cadence/ListOpenWorkflowExecutionsRequest.js';
import { IListOpenWorkflowExecutionsResponse as shared_IListOpenWorkflowExecutionsResponse } from '../generated/thrift/cadence-idl/com/uber/cadence/ListOpenWorkflowExecutionsResponse.js';
import { IListWorkflowExecutionsRequest as shared_IListWorkflowExecutionsRequest } from '../generated/thrift/cadence-idl/com/uber/cadence/ListWorkflowExecutionsRequest.js';
import { IListWorkflowExecutionsResponse as shared_IListWorkflowExecutionsResponse } from '../generated/thrift/cadence-idl/com/uber/cadence/ListWorkflowExecutionsResponse.js';
import { IMemo as shared_IMemo, Memo as shared_Memo } from '../generated/thrift/cadence-idl/com/uber/cadence/Memo.js';
import { QueryConsistencyLevel as shared_QueryConsistencyLevel } from '../generated/thrift/cadence-idl/com/uber/cadence/QueryConsistencyLevel.js';
import { QueryRejectCondition as shared_QueryRejectCondition } from '../generated/thrift/cadence-idl/com/uber/cadence/QueryRejectCondition.js';
import { IQueryRejected as shared_IQueryRejected } from '../generated/thrift/cadence-idl/com/uber/cadence/QueryRejected.js';
import { IResetWorkflowExecutionRequest as shared_IResetWorkflowExecutionRequest } from '../generated/thrift/cadence-idl/com/uber/cadence/ResetWorkflowExecutionRequest.js';
import { IResetWorkflowExecutionResponse as shared_IResetWorkflowExecutionResponse } from '../generated/thrift/cadence-idl/com/uber/cadence/ResetWorkflowExecutionResponse.js';
import { ISearchAttributes as shared_ISearchAttributes, SearchAttributes as shared_SearchAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/SearchAttributes.js';
import { ISignalWithStartWorkflowExecutionRequest as shared_ISignalWithStartWorkflowExecutionRequest, SignalWithStartWorkflowExecutionRequest as shared_SignalWithStartWorkflowExecutionRequest } from '../generated/thrift/cadence-idl/com/uber/cadence/SignalWithStartWorkflowExecutionRequest.js';
import { IStartWorkflowExecutionRequest as shared_IStartWorkflowExecutionRequest, StartWorkflowExecutionRequest as shared_StartWorkflowExecutionRequest } from '../generated/thrift/cadence-idl/com/uber/cadence/StartWorkflowExecutionRequest.js';
import { TaskListType as shared_TaskListType } from '../generated/thrift/cadence-idl/com/uber/cadence/TaskListType.js';
import { Retry } from './common/backoff/retry.js';
import { StringPtr, CronOverlapPolicyPtr, Int32Ceil, Int32Ptr, TaskListPtr, BoolPtr } from './common/convert.js';
import { createDynamicServiceRetryPolicy, isServiceTransientError } from './internal_retry.js';
import { IQueryWorkflowResponse as shared_IQueryWorkflowResponse } from '../generated/thrift/cadence-idl/com/uber/cadence/QueryWorkflowResponse.js';
import { IStartWorkflowExecutionResponse as shared_IStartWorkflowExecutionResponse } from '../generated/thrift/cadence-idl/com/uber/cadence/StartWorkflowExecutionResponse.js';
import { EntityNotExistsError, WorkflowExecutionAlreadyStartedError } from '../errors/idl_errors.js';

/**
 * DescribeWorkflowExecutionWithOptionsRequest is the request to DescribeWorkflowExecutionWithOptions
 */
export interface internal_DescribeWorkflowExecutionWithOptionsRequest {
  WorkflowID: string;
  RunID: string;
  QueryConsistencyLevel: internal_QueryConsistencyLevel;
}

/**
 * GetWorkflowHistoryWithOptionsRequest is the request to GetWorkflowHistoryWithOptions
 */
export interface internal_GetWorkflowHistoryWithOptionsRequest {
  WorkflowID: string;
  RunID: string;
  IsLongPoll: boolean;
  FilterType: shared_HistoryEventFilterType;
  QueryConsistencyLevel: internal_QueryConsistencyLevel;
}

export interface internal_HistoryEventIterator {
  HasNext(): Promise<boolean>;
  Next(): Promise<shared_IHistoryEvent>;
}

/**
 * QueryWorkflowWithOptionsRequest is the request to QueryWorkflowWithOptions
 */
export interface internal_QueryWorkflowWithOptionsRequest {
  WorkflowID: string;
  RunID: string;
  QueryType: string;
  Args?: unknown[];
  QueryRejectCondition?: shared_QueryRejectCondition;
  QueryConsistencyLevel?: shared_QueryConsistencyLevel;
}

/**
 * QueryWorkflowWithOptionsResponse is the response to QueryWorkflowWithOptions
 */
export interface internal_QueryWorkflowWithOptionsResponse {
  QueryResult?: internal_Value;
  QueryRejected?: shared_IQueryRejected;
}

export interface internal_WorkflowRun {
  GetID(): string;
  GetRunID(): string;
  Get(ctx: Context, valuePtr: unknown): Promise<void>;
}

/**
 * workflowClient is the client for starting a workflow execution.
 */
export class workflowClient implements internal_Client {
  constructor(init?: Partial<workflowClient>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  workflowService?: WorkflowServiceClientLike;

  domain: string = "";

  registry?: registry;

  metricsScope?: TaggedScope;

  identity: string = "";

  dataConverter?: internal_DataConverter;

  contextPropagators: internal_ContextPropagator[] = [];

  tracer?: unknown;

  featureFlags: internal_FeatureFlags = { WorkflowExecutionAlreadyCompletedErrorEnabled: false, AutoforwardingEnabled: false, PollerAutoScalerEnabled: false, EphemeralTaskListsEnabled: false, MetricEmitMode: 0 };

  async StartWorkflow(ctx: Context, options: internal_StartWorkflowOptions, workflowFunc: unknown, ...args: unknown[]): Promise<internal_WorkflowExecution> {
      const startRequest = await this.getWorkflowStartRequest(ctx, "StartWorkflow", options, workflowFunc, ...args);

      let response!: shared_IStartWorkflowExecutionResponse;

      await Retry(
        ctx,
        async (): Promise<void> => {
          const [tchCtx, cancel, opt] = newChannelContext(ctx, this.featureFlags);
          try {
            response = await this.workflowService!.StartWorkflowExecution(tchCtx, startRequest, ...opt);
          } finally {
            cancel();
          }
        },
        createDynamicServiceRetryPolicy(ctx),
        isServiceTransientError,
      );

      if (!response) {
        throw new Error("workflow service returned no response");
      }

      if (this.metricsScope != null) {
        const scope = this.metricsScope!.GetTaggedScope(
          tagTaskList,
          options.TaskList,
          tagWorkflowType,
          startRequest.workflowType!.name!,
        );
        scope.Counter(WorkflowStartCounter).Inc(1);
      }

      const executionInfo: internal_WorkflowExecution = {
        ID: startRequest.workflowId!,
        RunID: response.runId ?? "",
      };
      return executionInfo;
    }

  async StartWorkflowAsync(ctx: Context, options: internal_StartWorkflowOptions, workflowFunc: unknown, ...args: unknown[]): Promise<WorkflowExecutionAsync> {
      const startRequest = await this.getWorkflowStartRequest(ctx, "StartWorkflowAsync", options, workflowFunc, ...args);

      const asyncStartRequest = new shared_StartWorkflowExecutionAsyncRequest({
        request: startRequest,
      });

      await Retry(
        ctx,
        async () => {
          const [tchCtx, cancel, opt] = newChannelContext(ctx, this.featureFlags);
          try {
            await this.workflowService!.StartWorkflowExecutionAsync(tchCtx, asyncStartRequest, ...opt);
          } finally {
            cancel();
          }
        },
        createDynamicServiceRetryPolicy(ctx),
        isServiceTransientError,
      );

      if (this.metricsScope != null) {
        const scope = this.metricsScope!.GetTaggedScope(
          tagTaskList,
          options.TaskList,
          tagWorkflowType,
          startRequest.workflowType!.name!,
        );
        scope.Counter(WorkflowStartAsyncCounter).Inc(1);
      }

      const executionInfo: WorkflowExecutionAsync = {
        ID: startRequest.workflowId!,
      };
      return executionInfo;
    }

  async ExecuteWorkflow(ctx: Context, options: internal_StartWorkflowOptions, workflow: unknown, ...args: unknown[]): Promise<internal_WorkflowRun> {
    let runID!: string;
    let workflowID!: string;

    try {
      const executionInfo = await this.StartWorkflow(ctx, options, workflow, ...args);
      runID = executionInfo.RunID;
      workflowID = executionInfo.ID;
    } catch (err) {
      if (!(err instanceof Error)) throw err;

      if (err instanceof WorkflowExecutionAlreadyStartedError) {
        runID = err.runId ?? "";
        workflowID = options.ID;
      } else {
        throw err;
      }
    }

    const iterFn = (fnCtx: Context, fnRunID: string): Promise<internal_HistoryEventIterator> =>
      this.GetWorkflowHistory(fnCtx, workflowID, fnRunID, true, shared_HistoryEventFilterType.CLOSE_EVENT);

    return new workflowRunImpl({
      workflowFn: workflow,
      workflowID,
      firstRunID: runID,
      currentRunID: runID,
      iterFn,
      dataConverter: this.dataConverter,
      registry: this.registry,
    });
  }

  async GetWorkflow(ctx: Context, workflowID: string, runID: string): Promise<internal_WorkflowRun> {
    const iterFn = async (fnCtx: Context, fnRunID: string): Promise<internal_HistoryEventIterator> => {
      return await this.GetWorkflowHistory(fnCtx, workflowID, fnRunID, true, shared_HistoryEventFilterType.CLOSE_EVENT);
    };

    return new workflowRunImpl({
      workflowID,
      firstRunID: runID,
      currentRunID: runID,
      iterFn,
      dataConverter: this.dataConverter!,
      registry: this.registry!,
    });
  }

  async SignalWorkflow(ctx: Context, workflowID: string, runID: string, signalName: string, arg: unknown): Promise<void> {
    const input = encodeArg(this.dataConverter!, arg);
    await signalWorkflow(ctx, this.workflowService!, this.identity, this.domain, workflowID, runID, signalName, input, this.featureFlags);
  }

  async SignalWithStartWorkflow(ctx: Context, workflowID: string, signalName: string, signalArg: unknown, options: internal_StartWorkflowOptions, workflowFunc: unknown, ...workflowArgs: unknown[]): Promise<internal_WorkflowExecution> {
    const signalWithStartRequest = await this.getSignalWithStartRequest(ctx, "SignalWithStartWorkflow", workflowID, signalName, signalArg, options, workflowFunc, ...workflowArgs);

    let response!: shared_IStartWorkflowExecutionResponse;

    const operation = async (): Promise<void> => {
      const [tchCtx, cancel, opt] = newChannelContext(ctx, this.featureFlags);
      try {
        response = await this.workflowService!.SignalWithStartWorkflowExecution(tchCtx, signalWithStartRequest, ...opt);
      } finally {
        cancel();
      }
    };

    await Retry(ctx, operation, createDynamicServiceRetryPolicy(ctx), isServiceTransientError);

    if (!response) {
      throw new Error("SignalWithStartWorkflowExecution returned no response");
    }

    if (this.metricsScope != null) {
      const scope = this.metricsScope!.GetTaggedScope(
        tagTaskList,
        options.TaskList,
        tagWorkflowType,
        signalWithStartRequest.workflowType!.name!,
      );
      scope.Counter(WorkflowSignalWithStartCounter).Inc(1);
    }

    const executionInfo: internal_WorkflowExecution = {
      ID: options.ID,
      RunID: response.runId ?? "",
    };
    return executionInfo;
  }

  async SignalWithStartWorkflowAsync(ctx: Context, workflowID: string, signalName: string, signalArg: unknown, options: internal_StartWorkflowOptions, workflowFunc: unknown, ...workflowArgs: unknown[]): Promise<WorkflowExecutionAsync> {
    const signalWithStartRequest = await this.getSignalWithStartRequest(
      ctx,
      "SignalWithStartWorkflow",
      workflowID,
      signalName,
      signalArg,
      options,
      workflowFunc,
      ...workflowArgs,
    );

    const asyncSignalWithStartRequest = new shared_SignalWithStartWorkflowExecutionAsyncRequest({
      request: signalWithStartRequest,
    });

    await Retry(
      ctx,
      async (): Promise<void> => {
        const [tchCtx, cancel, opt] = newChannelContext(ctx, this.featureFlags);
        try {
          await this.workflowService!.SignalWithStartWorkflowExecutionAsync(
            tchCtx,
            asyncSignalWithStartRequest,
            ...opt,
          );
        } finally {
          cancel();
        }
      },
      createDynamicServiceRetryPolicy(ctx),
      isServiceTransientError,
    );

    if (this.metricsScope != null) {
      const scope = this.metricsScope!.GetTaggedScope(
        tagTaskList,
        options.TaskList,
        tagWorkflowType,
        signalWithStartRequest.workflowType!.name!,
      );
      scope.Counter(WorkflowSignalWithStartAsyncCounter).Inc(1);
    }

    const executionInfo: WorkflowExecutionAsync = {
      ID: options.ID,
    };
    return executionInfo;
  }

  async CancelWorkflow(ctx: Context, workflowID: string, runID: string, ...opts: Option[]): Promise<void> {
    const request = new shared_RequestCancelWorkflowExecutionRequest({
      domain: StringPtr(this.domain),
      workflowExecution: new shared_WorkflowExecution({
        workflowId: StringPtr(workflowID),
        runId: getRunID(runID),
      }),
      identity: StringPtr(this.identity),
      requestId: StringPtr(globalThis.crypto.randomUUID()),
    });

    for (const opt of opts) {
      if (opt instanceof CancelReason) {
        const cause = opt.value;
        request.cause = cause;
      }
    }

    await Retry(
      ctx,
      async (): Promise<void> => {
        const [tchCtx, cancel, channelOpts] = newChannelContext(ctx, this.featureFlags);
        try {
          await this.workflowService!.RequestCancelWorkflowExecution(tchCtx, request, ...channelOpts);
        } finally {
          cancel();
        }
      },
      createDynamicServiceRetryPolicy(ctx),
      isServiceTransientError,
    );
  }

  async TerminateWorkflow(ctx: Context, workflowID: string, runID: string, reason: string, details: Buffer): Promise<void> {
    const request = new shared_TerminateWorkflowExecutionRequest({
      domain: StringPtr(this.domain),
      workflowExecution: new shared_WorkflowExecution({
        workflowId: StringPtr(workflowID),
        runId: getRunID(runID),
      }),
      reason: StringPtr(reason),
      details,
      identity: StringPtr(this.identity),
    });

    await Retry(
      ctx,
      async (): Promise<void> => {
        const [tchCtx, cancel, opt] = newChannelContext(ctx, this.featureFlags);
        try {
          await this.workflowService!.TerminateWorkflowExecution(tchCtx, request, ...opt);
        } finally {
          cancel();
        }
      },
      createDynamicServiceRetryPolicy(ctx),
      isServiceTransientError,
    );
  }

  async GetWorkflowHistory(ctx: Context, workflowID: string, runID: string, isLongPoll: boolean, filterType: shared_HistoryEventFilterType): Promise<internal_HistoryEventIterator> {
    const request: internal_GetWorkflowHistoryWithOptionsRequest = {
      WorkflowID: workflowID,
      RunID: runID,
      IsLongPoll: isLongPoll,
      FilterType: filterType,
      QueryConsistencyLevel: internal_QueryConsistencyLevel.QueryConsistencyLevelUnspecified,
    };
    const iter = await this.GetWorkflowHistoryWithOptions(ctx, request);
    return iter;
  }

  async GetWorkflowHistoryWithOptions(ctx: Context, request: internal_GetWorkflowHistoryWithOptionsRequest): Promise<internal_HistoryEventIterator> {
      const domain = this.domain;
      const paginate = async (nextToken: Buffer): Promise<shared_IGetWorkflowExecutionHistoryResponse> => {
        const req = new shared_GetWorkflowExecutionHistoryRequest({
          domain: StringPtr(domain),
          execution: new shared_WorkflowExecution({
            workflowId: StringPtr(request.WorkflowID),
            runId: getRunID(request.RunID),
          }),
          waitForNewEvent: BoolPtr(request.IsLongPoll),
          HistoryEventFilterType: request.FilterType,
          nextPageToken: nextToken,
          skipArchival: BoolPtr(request.IsLongPoll),
          queryConsistencyLevel: convertQueryConsistencyLevel(request.QueryConsistencyLevel),
        });

        let response!: shared_IGetWorkflowExecutionHistoryResponse;

        for (;;) {
          let isFinalLongPoll!: boolean;

          await Retry(
            ctx,
            async () => {
              const [tchCtx, cancel, opt] = newChannelContext(
                ctx,
                this.featureFlags,
                (builder) => {
                  if (request.IsLongPoll) {
                    builder.Timeout = defaultGetHistoryTimeoutInSecs * Second;
                    const [deadline, ok] = ctx.deadline();
                    if (ok && deadline < Date.now() * 1_000_000 + builder.Timeout) {
                      isFinalLongPoll = true;
                    }
                  }
                },
              );

              try {
                response = await this.workflowService!.GetWorkflowExecutionHistory(tchCtx, req, ...opt);

                if (response.rawHistory != null) {
                  response.history = DeserializeBlobDataToHistoryEvents(response.rawHistory!, request.FilterType);
                }
              } finally {
                cancel();
              }
            },
            createDynamicServiceRetryPolicy(ctx),
            (err) => isServiceTransientError(err) || isEntityNonExistFromPassive(err),
          );

          if (!response) {
            throw new globalThis.Error("workflow history response is nil");
          }

          if (
            request.IsLongPoll &&
            (response.history!.events ?? []).length === 0 &&
            (response.nextPageToken?.length ?? 0) !== 0
          ) {
            if (isFinalLongPoll) {
              throw new globalThis.Error(
                "timed out waiting for the workflow to finish: " +
                  (ErrDeadlineExceeded instanceof Error ? ErrDeadlineExceeded.message : String(ErrDeadlineExceeded)),
                { cause: ErrDeadlineExceeded },
              );
            }

            req.nextPageToken = response.nextPageToken;
            continue;
          }

          break;
        }

        return response;
      };

      return new historyEventIteratorImpl({
        paginate,
        events: [],
        initialized: false,
        nextEventIndex: 0,
        nexttoken: Buffer.alloc(0),
      });
    }

  async CompleteActivity(ctx: Context, taskToken: Buffer | undefined, result: unknown | undefined, err: Error | null): Promise<void> {
    if (taskToken == null) {
      throw new Error("invalid task token provided");
    }

    let data: Buffer = Buffer.alloc(0);
    if (result != null) {
      data = encodeArg(this.dataConverter!, result!);
    }

    const request = convertActivityResultToRespondRequest(this.identity, taskToken!, data, err, this.dataConverter!);
    await reportActivityComplete(ctx, this.workflowService!, request, this.metricsScope!, this.featureFlags);
  }

  async CompleteActivityByID(ctx: Context, domain: string, workflowID: string, runID: string, activityID: string, result: unknown | undefined, err: Error | null): Promise<void> {
    if (activityID === "" || workflowID === "" || domain === "") {
      throw new Error("empty activity or workflow id or domainName");
    }

    let data: Buffer = Buffer.alloc(0);
    if (result != null) {
      data = encodeArg(this.dataConverter!, result);
    }

    const request = convertActivityResultToRespondRequestByID(
      this.identity,
      domain,
      workflowID,
      runID,
      activityID,
      data,
      err,
      this.dataConverter!
    );
    await reportActivityCompleteByID(
      ctx,
      this.workflowService!,
      request,
      this.metricsScope!,
      this.featureFlags
    );
  }

  async RecordActivityHeartbeat(ctx: Context, taskToken: Buffer, ...details: unknown[]): Promise<void> {
    const data = encodeArgs(this.dataConverter!, details);
    await recordActivityHeartbeat(ctx, this.workflowService!, this.identity, taskToken, data, this.featureFlags);
  }

  async RecordActivityHeartbeatByID(ctx: Context, domain: string, workflowID: string, runID: string, activityID: string, ...details: unknown[]): Promise<void> {
    const data = encodeArgs(this.dataConverter!, details);
    await recordActivityHeartbeatByID(ctx, this.workflowService!, this.identity, domain, workflowID, runID, activityID, data, this.featureFlags);
  }

  async ListClosedWorkflow(ctx: Context, request: shared_IListClosedWorkflowExecutionsRequest): Promise<shared_IListClosedWorkflowExecutionsResponse> {
    if ((request.domain ?? "").length === 0) {
      request.domain = StringPtr(this.domain);
    }

    let response!: shared_IListClosedWorkflowExecutionsResponse;

    await Retry(
      ctx,
      async (): Promise<void> => {
        const [tchCtx, cancel, opt] = newChannelContext(ctx, this.featureFlags);
        try {
          response = await this.workflowService!.ListClosedWorkflowExecutions(tchCtx, request, ...opt);
        } finally {
          cancel();
        }
      },
      createDynamicServiceRetryPolicy(ctx),
      isServiceTransientError,
    );

    if (!response) {
      throw new Error("ListClosedWorkflowExecutions returned a nil response");
    }

    return response;
  }

  async ListOpenWorkflow(ctx: Context, request: shared_IListOpenWorkflowExecutionsRequest): Promise<shared_IListOpenWorkflowExecutionsResponse> {
    if ((request.domain ?? "").length === 0) {
      request.domain = StringPtr(this.domain);
    }

    let response!: shared_IListOpenWorkflowExecutionsResponse;

    await Retry(
      ctx,
      async (): Promise<void> => {
        const [tchCtx, cancel, opt] = newChannelContext(ctx, this.featureFlags);
        try {
          response = await this.workflowService!.ListOpenWorkflowExecutions(tchCtx, request, ...opt);
        } finally {
          cancel();
        }
      },
      createDynamicServiceRetryPolicy(ctx),
      isServiceTransientError,
    );

    if (!response) {
      throw new Error("ListOpenWorkflowExecutions returned no response");
    }

    return response;
  }

  async ListWorkflow(ctx: Context, request: shared_IListWorkflowExecutionsRequest): Promise<shared_IListWorkflowExecutionsResponse> {
    if ((request.domain ?? "").length === 0) {
      request.domain = StringPtr(this.domain);
    }

    let response!: shared_IListWorkflowExecutionsResponse;
    await Retry(
      ctx,
      async () => {
        const [tchCtx, cancel, opt] = newChannelContext(ctx, this.featureFlags);
        try {
          response = await this.workflowService!.ListWorkflowExecutions(tchCtx, request, ...opt);
        } finally {
          cancel();
        }
      },
      createDynamicServiceRetryPolicy(ctx),
      isServiceTransientError
    );

    return response;
  }

  async ListArchivedWorkflow(ctx: Context | undefined, request: shared_IListArchivedWorkflowExecutionsRequest): Promise<shared_IListArchivedWorkflowExecutionsResponse> {
    if ((request.domain ?? "").length === 0) {
      request.domain = StringPtr(this.domain);
    }

    let response!: shared_IListArchivedWorkflowExecutionsResponse;

    await Retry(
      ctx!,
      async () => {
        let timeout = maxListArchivedWorkflowTimeout;
        const now = Date.now() * 1_000_000;

        if (ctx != null) {
          const [expiration, ok] = ctx.deadline();
          if (ok && expiration > now) {
            timeout = expiration - now;
            if (timeout > maxListArchivedWorkflowTimeout) {
              timeout = maxListArchivedWorkflowTimeout;
            } else if (timeout < minRPCTimeout) {
              timeout = minRPCTimeout;
            }
          }
        }

        const [tchCtx, cancel, opt] = newChannelContext(ctx!, this.featureFlags, chanTimeout(timeout));
        try {
          response = await this.workflowService!.ListArchivedWorkflowExecutions(tchCtx, request, ...opt);
        } finally {
          cancel();
        }
      },
      createDynamicServiceRetryPolicy(ctx),
      isServiceTransientError,
    );

    return response;
  }

  async ScanWorkflow(ctx: Context, request: shared_IListWorkflowExecutionsRequest): Promise<shared_IListWorkflowExecutionsResponse> {
    if ((request.domain ?? "").length === 0) {
      request.domain = StringPtr(this.domain);
    }
    let response!: shared_IListWorkflowExecutionsResponse;
    await Retry(
      ctx,
      async (): Promise<void> => {
        const [tchCtx, cancel, opt] = newChannelContext(ctx, this.featureFlags);
        try {
          response = await this.workflowService!.ScanWorkflowExecutions(tchCtx, request, ...opt);
        } finally {
          cancel();
        }
      },
      createDynamicServiceRetryPolicy(ctx),
      isServiceTransientError,
    );
    if (!response) {
      throw new Error("unexpected nil response");
    }
    return response;
  }

  async CountWorkflow(ctx: Context, request: shared_ICountWorkflowExecutionsRequest): Promise<shared_ICountWorkflowExecutionsResponse> {
    if ((request.domain ?? "").length === 0) {
      request.domain = StringPtr(this.domain);
    }

    let response!: shared_ICountWorkflowExecutionsResponse;
    await Retry(
      ctx,
      async (): Promise<void> => {
        const [tchCtx, cancel, opt] = newChannelContext(ctx, this.featureFlags);
        try {
          response = await this.workflowService!.CountWorkflowExecutions(tchCtx, request, ...opt);
        } finally {
          cancel();
        }
      },
      createDynamicServiceRetryPolicy(ctx),
      isServiceTransientError,
    );

    if (!response) {
      throw new Error("CountWorkflowExecutions returned no response");
    }
    return response;
  }

  async ResetWorkflow(ctx: Context, request: shared_IResetWorkflowExecutionRequest): Promise<shared_IResetWorkflowExecutionResponse> {
    if ((request.domain ?? "").length === 0) {
      request.domain = StringPtr(this.domain);
    }

    let response!: shared_IResetWorkflowExecutionResponse;

    await Retry(
      ctx,
      async (): Promise<void> => {
        const [tchCtx, cancel, opt] = newChannelContext(ctx, this.featureFlags);
        try {
          response = await this.workflowService!.ResetWorkflowExecution(tchCtx, request, ...opt);
        } finally {
          cancel();
        }
      },
      createDynamicServiceRetryPolicy(ctx),
      isServiceTransientError
    );

    return response;
  }

  async GetSearchAttributes(ctx: Context): Promise<shared_IGetSearchAttributesResponse> {
    let response!: shared_IGetSearchAttributesResponse;
    const operation = async (): Promise<void> => {
      const [tchCtx, cancel, opt] = newChannelContext(ctx, this.featureFlags);
      try {
        response = await this.workflowService!.GetSearchAttributes(tchCtx, ...opt);
      } finally {
        cancel();
      }
    };
    await Retry(ctx, operation, createDynamicServiceRetryPolicy(ctx), isServiceTransientError);
    if (!response) {
      throw new Error('GetSearchAttributes returned no response');
    }
    return response;
  }

  async DescribeWorkflowExecution(ctx: Context, workflowID: string, runID: string): Promise<shared_IDescribeWorkflowExecutionResponse> {
    const request: internal_DescribeWorkflowExecutionWithOptionsRequest = {
      WorkflowID: workflowID,
      RunID: runID,
      QueryConsistencyLevel: internal_QueryConsistencyLevel.QueryConsistencyLevelUnspecified,
    };
    return await this.DescribeWorkflowExecutionWithOptions(ctx, request);
  }

  async DescribeWorkflowExecutionWithOptions(ctx: Context, request: internal_DescribeWorkflowExecutionWithOptionsRequest): Promise<shared_IDescribeWorkflowExecutionResponse> {
    const req = new shared_DescribeWorkflowExecutionRequest({
      domain: StringPtr(this.domain),
      execution: new shared_WorkflowExecution({
        workflowId: StringPtr(request.WorkflowID),
        runId: StringPtr(request.RunID),
      }),
      queryConsistencyLevel: convertQueryConsistencyLevel(request.QueryConsistencyLevel),
    });

    let response!: shared_IDescribeWorkflowExecutionResponse;

    await Retry(
      ctx,
      async (): Promise<void> => {
        const [tchCtx, cancel, opt] = newChannelContext(ctx, this.featureFlags);
        try {
          response = await this.workflowService!.DescribeWorkflowExecution(tchCtx, req, ...opt);
        } finally {
          cancel();
        }
      },
      createDynamicServiceRetryPolicy(ctx),
      isServiceTransientError,
    );

    return response;
  }

  async QueryWorkflow(ctx: Context, workflowID: string, runID: string, queryType: string, ...args: unknown[]): Promise<internal_Value> {
    const queryWorkflowWithOptionsRequest: internal_QueryWorkflowWithOptionsRequest = {
      WorkflowID: workflowID,
      RunID: runID,
      QueryType: queryType,
      Args: args,
    };
    const result = await this.QueryWorkflowWithOptions(ctx, queryWorkflowWithOptionsRequest);
    return result.QueryResult!;
  }

  async QueryWorkflowWithOptions(ctx: Context, request: internal_QueryWorkflowWithOptionsRequest): Promise<internal_QueryWorkflowWithOptionsResponse> {
    let input: Buffer = Buffer.alloc(0);
    if ((request.Args?.length ?? 0) > 0) {
      input = encodeArgs(this.dataConverter, request.Args!);
    }

    const req = new shared_QueryWorkflowRequest({
      domain: StringPtr(this.domain)!,
      execution: new shared_WorkflowExecution({
        workflowId: StringPtr(request.WorkflowID)!,
        runId: getRunID(request.RunID),
      }),
      query: new shared_WorkflowQuery({
        queryType: StringPtr(request.QueryType)!,
        queryArgs: input,
      }),
      queryRejectCondition: request.QueryRejectCondition,
      queryConsistencyLevel: request.QueryConsistencyLevel,
    });

    let resp!: shared_IQueryWorkflowResponse;
    await Retry(
      ctx,
      async (): Promise<void> => {
        const [tchCtx, cancel, opt] = newChannelContextForQuery(ctx, this.featureFlags);
        try {
          resp = await this.workflowService!.QueryWorkflow(tchCtx, req, ...opt);
        } finally {
          cancel();
        }
      },
      createDynamicServiceRetryPolicy(ctx),
      isServiceTransientError,
    );

    if (!resp) {
      throw new Error('QueryWorkflow returned no response');
    }

    if (resp.queryRejected != null) {
      return {
        QueryRejected: resp.queryRejected,
        QueryResult: undefined,
      };
    }

    return {
      QueryRejected: undefined,
      QueryResult: newEncodedValue(resp.queryResult!, this.dataConverter!),
    };
  }

  async DescribeTaskList(ctx: Context, tasklist: string, tasklistType: shared_TaskListType): Promise<shared_IDescribeTaskListResponse> {
    const request = new shared_DescribeTaskListRequest({
      domain: StringPtr(this.domain),
      taskList: new shared_TaskList({
        name: StringPtr(tasklist),
      }),
      taskListType: tasklistType,
    });

    let resp!: shared_IDescribeTaskListResponse;
    await Retry(
      ctx,
      async (): Promise<void> => {
        const [tchCtx, cancel, opt] = newChannelContext(ctx, this.featureFlags);
        try {
          resp = await this.workflowService!.DescribeTaskList(tchCtx, request, ...opt);
        } finally {
          cancel();
        }
      },
      createDynamicServiceRetryPolicy(ctx),
      isServiceTransientError,
    );

    return resp;
  }

  async RefreshWorkflowTasks(ctx: Context, workflowID: string, runID: string): Promise<void> {
      const request = new shared_RefreshWorkflowTasksRequest({
        domain: StringPtr(this.domain),
        execution: new shared_WorkflowExecution({
          workflowId: StringPtr(workflowID),
          runId: getRunID(runID),
        }),
      });

      await Retry(
        ctx,
        async () => {
          const [tchCtx, cancel, opt] = newChannelContext(ctx, this.featureFlags);
          try {
            await this.workflowService!.RefreshWorkflowTasks(tchCtx, request, ...opt);
          } finally {
            cancel();
          }
        },
        createDynamicServiceRetryPolicy(ctx),
        isServiceTransientError,
      );
    }

  getWorkflowHeader(ctx: Context): shared_IHeader {
    const header = new shared_Header({
      fields: new Map<string, Buffer>(),
    });
    const writer = NewHeaderWriter(header);
    for (const ctxProp of this.contextPropagators) {
      ctxProp.Inject(ctx, writer);
    }
    return header;
  }

  async getWorkflowStartRequest(ctx: Context, tracePrefix: string, options: internal_StartWorkflowOptions, workflowFunc: unknown, ...args: unknown[]): Promise<shared_IStartWorkflowExecutionRequest> {
      let workflowID = options.ID;
      if (workflowID.length === 0) {
        workflowID = globalThis.crypto.randomUUID();
      }

      if (options.TaskList === "") {
        throw new Error("missing TaskList");
      }

      const executionTimeout = Int32Ceil(options.ExecutionStartToCloseTimeout / 1e9);
      if (executionTimeout <= 0) {
        throw new Error("missing or invalid ExecutionStartToCloseTimeout");
      }

      let decisionTaskTimeout = Int32Ceil(options.DecisionTaskStartToCloseTimeout / 1e9);
      if (decisionTaskTimeout < 0) {
        throw new Error("negative DecisionTaskStartToCloseTimeout provided");
      }
      if (decisionTaskTimeout === 0) {
        decisionTaskTimeout = defaultDecisionTaskTimeoutInSecs;
      }

      const [workflowType, input] = await getValidatedWorkflowFunction(
        workflowFunc,
        args,
        this.dataConverter!,
        this.registry!,
      );

      const memo = getWorkflowMemo(options.Memo, this.dataConverter!);
      const searchAttr = serializeSearchAttributes(options.SearchAttributes);

      const delayStartSeconds = Int32Ceil(options.DelayStart / 1e9);
      if (delayStartSeconds < 0) {
        throw new Error("Invalid DelayStart option");
      }

      const jitterStartSeconds = Int32Ceil(options.JitterStart / 1e9);
      if (jitterStartSeconds < 0) {
        throw new Error("Invalid JitterStart option");
      }

      const firstRunAtTimestamp = options.FirstRunAt === 0 ? 0 : options.FirstRunAt;
      if (firstRunAtTimestamp < 0) {
        throw new Error("Invalid FirstRunAt option");
      }

      const activeClusterSelectionPolicy = convertActiveClusterSelectionPolicy(
        options.ActiveClusterSelectionPolicy!,
      );

      const [ctxLocal, span] = createOpenTracingWorkflowSpan(
        ctx,
        this.tracer!,
        Date.now() * 1_000_000,
        `${tracePrefix}-${workflowType.Name}`,
        workflowID,
      );
      (span as Span).end();

      const header = this.getWorkflowHeader(ctxLocal);

      const startRequest = new shared_StartWorkflowExecutionRequest({
        domain: StringPtr(this.domain),
        requestId: StringPtr(globalThis.crypto.randomUUID()),
        workflowId: StringPtr(workflowID),
        workflowType: workflowTypePtr(workflowType),
        taskList: TaskListPtr(new shared_TaskList({
          name: StringPtr(options.TaskList),
        })),
        input,
        executionStartToCloseTimeoutSeconds: Int32Ptr(executionTimeout),
        taskStartToCloseTimeoutSeconds: Int32Ptr(decisionTaskTimeout),
        identity: StringPtr(this.identity),
        workflowIdReusePolicy: internal_WorkflowIDReusePolicy_toThriftPtr(options.WorkflowIDReusePolicy),
        retryPolicy: convertRetryPolicy(options.RetryPolicy!),
        cronSchedule: StringPtr(options.CronSchedule),
        memo,
        searchAttributes: searchAttr,
        header,
        delayStartSeconds: Int32Ptr(delayStartSeconds),
        jitterStartSeconds: Int32Ptr(jitterStartSeconds),
        firstRunAtTimestamp: new Int64(firstRunAtTimestamp),
        cronOverlapPolicy: CronOverlapPolicyPtr(options.CronOverlapPolicy),
        activeClusterSelectionPolicy,
      });

      return startRequest;
    }

  async getSignalWithStartRequest(ctx: Context, tracePrefix: string, workflowID: string, signalName: string, signalArg: unknown, options: internal_StartWorkflowOptions, workflowFunc: unknown, ...workflowArgs: unknown[]): Promise<shared_ISignalWithStartWorkflowExecutionRequest> {
      const signalInput = encodeArg(this.dataConverter, signalArg);

      if (workflowID === "") {
        workflowID = globalThis.crypto.randomUUID();
      }

      if (options.TaskList === "") {
        throw new Error("missing TaskList");
      }

      const executionTimeout = Int32Ceil(options.ExecutionStartToCloseTimeout / 1e9);
      if (executionTimeout <= 0) {
        throw new Error("missing or invalid ExecutionStartToCloseTimeout");
      }

      let decisionTaskTimeout = Int32Ceil(options.DecisionTaskStartToCloseTimeout / 1e9);
      if (decisionTaskTimeout < 0) {
        throw new Error("negative DecisionTaskStartToCloseTimeout provided");
      }
      if (decisionTaskTimeout === 0) {
        decisionTaskTimeout = defaultDecisionTaskTimeoutInSecs;
      }

      const [workflowType, input] = await getValidatedWorkflowFunction(
        workflowFunc,
        workflowArgs,
        this.dataConverter,
        this.registry,
      );

      const memo = getWorkflowMemo(options.Memo, this.dataConverter!);
      const searchAttr = serializeSearchAttributes(options.SearchAttributes);

      const delayStartSeconds = Int32Ceil(options.DelayStart / 1e9);
      if (delayStartSeconds < 0) {
        throw new Error("Invalid DelayStart option");
      }

      const jitterStartSeconds = Int32Ceil(options.JitterStart / 1e9);
      if (jitterStartSeconds < 0) {
        throw new Error("Invalid JitterStart option");
      }

      let firstRunAtTimestamp = options.FirstRunAt;
      if (options.FirstRunAt === 0) {
        firstRunAtTimestamp = 0;
      }
      if (firstRunAtTimestamp < 0) {
        throw new Error("Invalid FirstRunAt option");
      }

      const activeClusterSelectionPolicy = convertActiveClusterSelectionPolicy(
        options.ActiveClusterSelectionPolicy!,
      );

      const [ctxLocal, span] = createOpenTracingWorkflowSpan(
        ctx,
        this.tracer!,
        Date.now() * 1_000_000,
        `${tracePrefix}-${workflowType.Name}`,
        workflowID,
      );
      (span as Span).end();

      const header = this.getWorkflowHeader(ctxLocal);

      return new shared_SignalWithStartWorkflowExecutionRequest({
        domain: StringPtr(this.domain),
        requestId: StringPtr(globalThis.crypto.randomUUID()),
        workflowId: StringPtr(workflowID),
        workflowType: workflowTypePtr(workflowType),
        taskList: TaskListPtr(new shared_TaskList({
          name: StringPtr(options.TaskList),
        })),
        input,
        executionStartToCloseTimeoutSeconds: Int32Ptr(executionTimeout),
        taskStartToCloseTimeoutSeconds: Int32Ptr(decisionTaskTimeout),
        signalName: StringPtr(signalName),
        signalInput,
        identity: StringPtr(this.identity),
        retryPolicy: convertRetryPolicy(options.RetryPolicy!),
        cronSchedule: StringPtr(options.CronSchedule),
        memo,
        searchAttributes: searchAttr,
        workflowIdReusePolicy: internal_WorkflowIDReusePolicy_toThriftPtr(options.WorkflowIDReusePolicy),
        header,
        delayStartSeconds: Int32Ptr(delayStartSeconds),
        jitterStartSeconds: Int32Ptr(jitterStartSeconds),
        firstRunAtTimestamp: new Int64(firstRunAtTimestamp),
        cronOverlapPolicy: CronOverlapPolicyPtr(options.CronOverlapPolicy),
        activeClusterSelectionPolicy,
      });
    }

}

/**
 * workflowRunImpl is an implementation of WorkflowRun
 */
export class workflowRunImpl implements internal_WorkflowRun {
  constructor(init?: Partial<workflowRunImpl>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  workflowFn?: unknown;

  workflowID: string = "";

  firstRunID: string = "";

  currentRunID: string = "";

  iterFn?: (p0: Context, p1: string) => internal_HistoryEventIterator | Promise<internal_HistoryEventIterator>;

  dataConverter?: internal_DataConverter;

  registry?: registry;

  GetRunID(): string {
    return this.firstRunID;
  }

  GetID(): string {
    return this.workflowID;
  }

  async Get(ctx: Context, valuePtr: unknown | undefined): Promise<void> {
    const iter = await this.iterFn!(ctx, this.currentRunID);
    if (!(await iter.HasNext())) {
      throw "could not get last history event for workflow";
    }
    const closeEvent = await iter.Next();

    switch (closeEvent.eventType) {
      case EventType.WorkflowExecutionCompleted: {
        const attributes = closeEvent.workflowExecutionCompletedEventAttributes!;
        if (valuePtr == null || attributes.result == null) {
          return;
        }
        if (typeof valuePtr !== "object") {
          throw new Error("value parameter is not a pointer");
        }
        await deSerializeFunctionResult(
          this.workflowFn!,
          attributes.result!,
          valuePtr,
          this.dataConverter!,
          this.registry!
        );
        return;
      }
      case EventType.WorkflowExecutionFailed: {
        const attributes = closeEvent.workflowExecutionFailedEventAttributes!;
        const err = constructError(
          attributes.reason ?? "",
          attributes.details ?? Buffer.alloc(0),
          this.dataConverter!
        );
        if (err != null) {
          throw err;
        }
        return;
      }
      case EventType.WorkflowExecutionCanceled: {
        const attributes = closeEvent.workflowExecutionCanceledEventAttributes!;
        const details = newEncodedValues(
          attributes.details ?? Buffer.alloc(0),
          this.dataConverter
        );
        throw NewCanceledError(details);
      }
      case EventType.WorkflowExecutionTerminated: {
        throw newTerminatedError();
      }
      case EventType.WorkflowExecutionTimedOut: {
        const attributes = closeEvent.workflowExecutionTimedOutEventAttributes!;
        throw NewTimeoutError(attributes.timeoutType ?? 0);
      }
      case EventType.WorkflowExecutionContinuedAsNew: {
        const attributes = closeEvent.workflowExecutionContinuedAsNewEventAttributes!;
        this.currentRunID = attributes.newExecutionRunId ?? "";
        await this.Get(ctx, valuePtr);
        return;
      }
      default: {
        throw new Error(
          `Unexpected event type ${closeEvent.eventType} when handling workflow execution result`
        );
      }
    }
  }

}

/**
 * historyEventIteratorImpl is the implementation of HistoryEventIterator
 */
export class historyEventIteratorImpl implements internal_HistoryEventIterator {
  constructor(init?: Partial<historyEventIteratorImpl>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  initialized: boolean = false;

  nextEventIndex: number = 0;

  events: shared_IHistoryEvent[] = [];

  nexttoken: Buffer = Buffer.alloc(0);

  err?: Error | null;

  paginate?: (p0: Buffer) => shared_IGetWorkflowExecutionHistoryResponse | Promise<shared_IGetWorkflowExecutionHistoryResponse>;

  async HasNext(): Promise<boolean> {
    if (this.nextEventIndex < this.events.length || this.err != null) {
      return true;
    } else if (!this.initialized || this.nexttoken.length !== 0) {
      this.initialized = true;

      let response: shared_IGetWorkflowExecutionHistoryResponse;
      try {
        response = await this.paginate!(this.nexttoken);
      } catch (err) {
        if (!(err instanceof Error)) {
          throw err;
        }
        this.nextEventIndex = 0;
        this.events = [];
        this.nexttoken = Buffer.alloc(0);
        this.err = err;
        return true;
      }

      this.nextEventIndex = 0;
      this.events = response.history!.events!;
      this.nexttoken = response.nextPageToken ?? Buffer.alloc(0);
      this.err = null;

      if (this.nextEventIndex < this.events.length || this.err != null) {
        return true;
      }
      return false;
    }

    return false;
  }

  async Next(): Promise<shared_IHistoryEvent> {
    if (!(await this.HasNext())) {
      throw "HistoryEventIterator Next() called without checking HasNext()";
    }

    if (this.nextEventIndex < this.events.length) {
      const index = this.nextEventIndex;
      this.nextEventIndex++;
      return this.events[index]!;
    } else if (this.err != null) {
      const err = this.err!;
      this.err = null;
      throw err;
    }

    throw "HistoryEventIterator Next() should return either a history event or a err";
  }

}

export function isEntityNonExistFromPassive(err: Error | null): boolean {
    if (err instanceof EntityNotExistsError) {
        return (
            (err.activeCluster ?? "") !== "" &&
            (err.currentCluster ?? "") !== "" &&
            (err.activeCluster ?? "") !== (err.currentCluster ?? "")
        );
    }

    return false;
}

export function getRunID(runID: string): string | undefined {
    if (runID === "") {
        return undefined;
    }
    return StringPtr(runID);
}

export function getWorkflowMemo(input: Record<string, unknown> | undefined, dc: internal_DataConverter): shared_IMemo | undefined {
    if (input == null) {
        return;
    }

    const memo = new Map<string, Buffer>();
    for (const [k, v] of Object.entries(input ?? {})) {
        let memoBytes: Buffer;
        try {
            memoBytes = encodeArg(dc, v);
        } catch (err) {
            if (!(err instanceof Error)) {
                throw err;
            }
            throw new globalThis.Error(`encode workflow memo error: ${err.message}`);
        }
        memo.set(k, memoBytes);
    }

    return new shared_Memo({ fields: memo });
}

export function serializeSearchAttributes(input: Record<string, unknown> | undefined): shared_ISearchAttributes | undefined {
    if (input == null) {
        return;
    }

    const attr: Record<string, Buffer> = {};
    for (const [k, v] of Object.entries(input)) {
        let encoded: string | undefined;
        try {
            encoded = JSON.stringify(v === undefined ? null : v);
        } catch (err) {
            const e = err instanceof Error ? err : new globalThis.Error(String(err));
            throw new globalThis.Error(`encode search attribute [${k}] error: ${e.message}`);
        }
        if (encoded === undefined) {
            throw new globalThis.Error(`encode search attribute [${k}] error: unsupported value`);
        }
        attr[k] = Buffer.from(encoded);
    }

    return new shared_SearchAttributes({
        indexedFields: new Map(Object.entries(attr)),
    });
}

export const defaultDecisionTaskTimeoutInSecs = 10;

export const defaultGetHistoryTimeoutInSecs = 25;

export let maxListArchivedWorkflowTimeout = Minute * 3;
