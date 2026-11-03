// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { internal_WorkflowExecution } from './workflow.js';
import { internal_WorkflowReplayer } from './workflow_replayer.js';
import type { WorkflowServiceClientLike } from './runtime/workflow_service_client_like.js';
import { Context } from './runtime/context.js';
import { IReplayWorkflowActivityParams as shadower_IReplayWorkflowActivityParams } from '../generated/thrift/cadence-idl/com/uber/cadence/shadower/ReplayWorkflowActivityParams.js';
import { IReplayWorkflowActivityResult as shadower_IReplayWorkflowActivityResult, ReplayWorkflowActivityResult as shadower_ReplayWorkflowActivityResult } from '../generated/thrift/cadence-idl/com/uber/cadence/shadower/ReplayWorkflowActivityResult.js';
import { IScanWorkflowActivityParams as shadower_IScanWorkflowActivityParams } from '../generated/thrift/cadence-idl/com/uber/cadence/shadower/ScanWorkflowActivityParams.js';
import { IScanWorkflowActivityResult as shadower_IScanWorkflowActivityResult, ScanWorkflowActivityResult as shadower_ScanWorkflowActivityResult } from '../generated/thrift/cadence-idl/com/uber/cadence/shadower/ScanWorkflowActivityResult.js';
import { GetActivityInfo, GetActivityLogger, GetActivityMetricsScope, GetHeartbeatDetails, RecordActivityHeartbeat } from './activity.js';
import { Int32Ptr } from './common/convert.js';
import { ReplayFailedCounter, ReplayLatency, ReplaySkippedCounter, ReplaySucceedCounter } from './common/metrics/constants.js';
import { StartLatency } from './common/metrics/emit.js';
import { Default1ms100s } from './common/metrics/histograms.js';
import { NewCustomError } from './error.js';
import { tagDomain, tagTaskList, tagRunID, tagWorkflowID, tagVisibilityQuery } from './internal_logging_tags.js';
import { tagScope } from './internal_worker.js';
import { Retry } from './common/backoff/retry.js';
import { createDynamicServiceRetryPolicy, isServiceTransientError } from './internal_retry.js';
import { newChannelContext } from './internal_utils.js';
import { errMsgUnknownWorkflowType } from './registry.js';
import { ListWorkflowExecutionsRequest as shadower_ListWorkflowExecutionsRequest } from '../generated/thrift/cadence-idl/com/uber/cadence/ListWorkflowExecutionsRequest.js';
import { IListWorkflowExecutionsResponse as shadower_IListWorkflowExecutionsResponse } from '../generated/thrift/cadence-idl/com/uber/cadence/ListWorkflowExecutionsResponse.js';
import { ErrReasonDomainNotExists as shadower_ErrReasonDomainNotExists, ErrReasonInvalidQuery as shadower_ErrReasonInvalidQuery, ErrReasonWorkflowTypeNotRegistered as shadower_ErrReasonWorkflowTypeNotRegistered } from '../generated/thrift/cadence-idl/com/uber/cadence/shadower/constants.js';
import { BadRequestError, EntityNotExistsError } from '../errors/idl_errors.js';
import { Logger } from 'winston';

export interface replayWorkflowActivityProgress {
  Result: shadower_IReplayWorkflowActivityResult;
  NextExecutionIdx: number;
}

export function shouldReplay(probability: number): boolean {
  if (probability === 0) {
    return true;
  }

  return Math.random() <= probability;
}

export async function replayWorkflowActivity(ctx: Context, params: shadower_IReplayWorkflowActivityParams): Promise<shadower_IReplayWorkflowActivityResult> {
  const logger = GetActivityLogger(ctx);
  const scope = tagScope(
    GetActivityMetricsScope(ctx),
    tagDomain,
    params.domain ?? "",
    tagTaskList,
    GetActivityInfo(ctx).TaskList,
  );
  const service = ctx.value<WorkflowServiceClientLike>(serviceClientContextKey) as WorkflowServiceClientLike;
  const replayer = ctx.value<internal_WorkflowReplayer>(workflowReplayerContextKey) as internal_WorkflowReplayer;

  let progress: replayWorkflowActivityProgress = {
    NextExecutionIdx: 0,
    Result: new shadower_ReplayWorkflowActivityResult({
      succeeded: Int32Ptr(0),
      skipped: Int32Ptr(0),
      failed: Int32Ptr(0),
    }),
  };

  try {
    GetHeartbeatDetails(ctx, progress);
  } catch (err) {
    if (!(err instanceof Error)) throw err;
    progress = {
      NextExecutionIdx: 0,
      Result: new shadower_ReplayWorkflowActivityResult({
        succeeded: Int32Ptr(0),
        skipped: Int32Ptr(0),
        failed: Int32Ptr(0),
      }),
    };
  }

  for (const execution of (params.executions ?? []).slice(progress.NextExecutionIdx)) {
    if (execution == null) {
      continue;
    }

    const sw = StartLatency(scope, ReplayLatency, Default1ms100s);
    let success = false;
    let failed = false;

    try {
      success = await replayWorkflowExecutionHelper(
        ctx,
        replayer,
        service,
        logger,
        params.domain ?? "",
        {
          ID: execution.workflowId ?? "",
          RunID: execution.runId ?? "",
        },
      );
    } catch (err) {
      if (!(err instanceof Error)) throw err;
      failed = true;
      scope.Counter(ReplayFailedCounter).Inc(1);
      progress.Result.failed!++;
      if (isWorkflowTypeNotRegisteredError(err)) {
        throw NewCustomError(shadower_ErrReasonWorkflowTypeNotRegistered, err.message);
      }
    }

    if (!failed) {
      if (success) {
        scope.Counter(ReplaySucceedCounter).Inc(1);
        progress.Result.succeeded!++;
      } else {
        scope.Counter(ReplaySkippedCounter).Inc(1);
        progress.Result.skipped!++;
      }
    }

    sw.Stop();
    progress.NextExecutionIdx++;

    try {
      await RecordActivityHeartbeat(ctx, progress);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
    }
  }

  return progress.Result;
}

export function isNondeterministicErr(err: Error | null): boolean {
  return err!.message.includes("nondeterministic");
}

export function isWorkflowTypeNotRegisteredError(err: Error | null): boolean {
  return err!.message.includes(errMsgUnknownWorkflowType);
}

export async function scanWorkflowActivity(ctx: Context, params: shadower_IScanWorkflowActivityParams): Promise<shadower_IScanWorkflowActivityResult> {
    const logger = GetActivityLogger(ctx);
    const service = ctx.value<WorkflowServiceClientLike>(serviceClientContextKey) as WorkflowServiceClientLike;

    try {
        return await scanWorkflowExecutionsHelper(ctx, service, params, logger);
    } catch (err) {
        if (!(err instanceof Error)) {
            throw err;
        }
        if (err instanceof EntityNotExistsError) {
            throw NewCustomError(shadower_ErrReasonDomainNotExists, err.Error());
        }
        if (err instanceof BadRequestError) {
            throw NewCustomError(shadower_ErrReasonInvalidQuery, err.Error());
        }
        throw err;
    }
}

export async function replayWorkflowExecutionHelper(ctx: Context, replayer: internal_WorkflowReplayer, service: WorkflowServiceClientLike, logger: Logger, domain: string, execution: internal_WorkflowExecution): Promise<boolean> {
  const taggedLogger = logger.child({
    [tagWorkflowID]: execution.ID,
    [tagRunID]: execution.RunID,
  });

  try {
    await replayer.ReplayWorkflowExecution(ctx, service, logger, domain, execution);
    taggedLogger.info("Successfully replayed workflow");
    return true;
  } catch (err) {
    if (!(err instanceof Error)) {
      throw err;
    }

    if (isNondeterministicErr(err) || isWorkflowTypeNotRegisteredError(err)) {
      taggedLogger.error("Replay workflow failed", { error: err });
      throw err;
    }

    taggedLogger.info("Skipped replaying workflow", { error: err });
    return false;
  }
}

export async function scanWorkflowExecutionsHelper(ctx: Context, service: WorkflowServiceClientLike, params: shadower_IScanWorkflowActivityParams, logger: Logger): Promise<shadower_IScanWorkflowActivityResult> {
    let completionTime = 0;
    const [deadline, ok] = ctx.deadline();
    if (ok) {
        const now = Date.now() * 1_000_000;
        const activityTimeout = deadline - now;
        completionTime = now + ratioToCompleteScanWorkflow * activityTimeout;
    }

    const request = new shadower_ListWorkflowExecutionsRequest({
        domain: params.domain!,
        query: params.workflowQuery!,
        nextPageToken: params.nextPageToken!,
        pageSize: params.pageSize!,
    });

    const result = new shadower_ScanWorkflowActivityResult();

    for (;;) {
        let resp!: shadower_IListWorkflowExecutionsResponse;

        try {
            await Retry(
                ctx,
                async (): Promise<void> => {
                    const [tchCtx, cancel, opt] = newChannelContext(ctx, {
                        AutoforwardingEnabled: false,
                        EphemeralTaskListsEnabled: false,
                        MetricEmitMode: 0,
                        PollerAutoScalerEnabled: false,
                        WorkflowExecutionAlreadyCompletedErrorEnabled: false,
                    });

                    try {
                        resp = await service.ScanWorkflowExecutions(tchCtx, request, ...opt);
                    } catch (err) {
                        if (!(err instanceof Error)) {
                            throw err;
                        }
                        cancel();
                        throw err;
                    }

                    cancel();
                },
                createDynamicServiceRetryPolicy(ctx),
                isServiceTransientError,
            );
        } catch (err) {
            if (!(err instanceof Error)) {
                throw err;
            }
            logger.error('Failed to scan workflow executions', {
                [tagDomain]: params.domain ?? '',
                [tagVisibilityQuery]: params.workflowQuery ?? '',
                error: err,
            });
            throw err;
        }

        if (!resp) {
            throw new Error('ScanWorkflowExecutions returned no response');
        }

        for (const execution of resp.executions ?? []) {
            if (shouldReplay(params.samplingRate ?? 0)) {
                (result.executions ??= []).push(execution.execution!);
            }
        }

        request.nextPageToken = resp.nextPageToken;

        if (
            request.nextPageToken?.length === 0 ||
            (result.executions?.length ?? 0) >= minScanWorkflowResultSize ||
            (completionTime !== 0 && Date.now() * 1_000_000 > completionTime)
        ) {
            result.nextPageToken = request.nextPageToken;
            break;
        }

        await new Promise<void>((resolve) => setTimeout(resolve, scanWorkflowWaitPeriod / 1_000_000));
    }

    return result;
}

export const minScanWorkflowResultSize = 10;

export const ratioToCompleteScanWorkflow = 0.8;

export const scanWorkflowWaitPeriod = 100000000;

export const serviceClientContextKey = "serviceClient";

export const workflowReplayerContextKey = "workflowReplayer";
