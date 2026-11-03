// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { common_debug_ActivityTracker, common_debug_ActivityInfo } from './common/debug/types.js';
import { TaggedScope, NewTaggedScope } from './common/metrics/scope.js';
import { internal_DataConverter } from './encoded.js';
import { internal_ContextPropagator, NewHeaderReader } from './headers.js';
import { activity, activityEnvContextKey, activityEnvironment } from './internal_activity.js';
import { ActivityTaskHandler } from './internal_public.js';
import { activityProvider, newServiceInvoker, traceLog } from './internal_task_handlers.js';
import { internal_FeatureFlags, getMetricsScopeForActivity } from './internal_utils.js';
import { workerExecutionParameters } from './worker.js';
import { registry } from './registry.js';
import type { WorkflowServiceClientLike } from './runtime/workflow_service_client_like.js';
import { Channel } from './runtime/channel.js';
import { Context, ErrDeadlineExceeded, background, withCancel, withDeadline } from './runtime/context.js';
import { Second } from './runtime/time.js';
import type { GoClock } from './runtime/clock.js';
import { RealClock } from './runtime/clock.js';
import { IPollForActivityTaskResponse as shared_IPollForActivityTaskResponse } from '../generated/thrift/cadence-idl/com/uber/cadence/PollForActivityTaskResponse.js';
import { WithActivityTask } from './activity.js';
import { newHeartbeater } from './auto_heartbeater.js';
import { ActivityTaskPanicCounter } from './common/metrics/constants.js';
import { ErrActivityResultPending, newPanicError } from './error.js';
import { tagActivityType, tagPanicError, tagPanicStack, tagRunID, tagWorkflowID } from './internal_logging_tags.js';
import { convertActivityResultToRespondRequest } from './internal_task_pollers.js';
import { getStackTraceRaw } from './internal_workflow.js';
import { createOpenTracingActivitySpan } from './propagation.js';
import { NewNoopActivityTracker } from './common/debug/workerstats_noop.js';
import { trace, Span } from '@opentelemetry/api';
import { Logger } from 'winston';

/**
 * activityTaskHandlerImpl is the implementation of ActivityTaskHandler
 */
export class activityTaskHandlerImpl implements ActivityTaskHandler {
  constructor(init?: Partial<activityTaskHandlerImpl>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  clock?: GoClock;

  taskListName: string = "";

  identity: string = "";

  service?: WorkflowServiceClientLike;

  metricsScope?: TaggedScope;

  logger?: Logger;

  userContext?: Context;

  registry?: registry;

  activityProvider?: activityProvider;

  dataConverter?: internal_DataConverter;

  workerStopCh?: Channel<{}>;

  contextPropagators: internal_ContextPropagator[] = [];

  tracer?: unknown;

  featureFlags: internal_FeatureFlags = { WorkflowExecutionAlreadyCompletedErrorEnabled: false, AutoforwardingEnabled: false, PollerAutoScalerEnabled: false, EphemeralTaskListsEnabled: false, MetricEmitMode: 0 };

  activityTracker?: common_debug_ActivityTracker;

  async getActivity(name: string): Promise<activity | undefined> {
    if (this.activityProvider != null) {
      return await this.activityProvider!(name);
    }

    const [a, ok] = await this.registry!.GetActivity(name);
    if (ok) {
      return a;
    }

    return undefined;
  }

  async getRegisteredActivityNames(): Promise<string[]> {
    const activities = await this.registry!.getRegisteredActivities();
    const activityNames: string[] = [];
    for (const activity of activities) {
      activityNames.push(activity.ActivityType().Name);
    }
    return activityNames;
  }

  async Execute(taskList: string, t: shared_IPollForActivityTaskResponse): Promise<unknown> {
    traceLog(() => {
      this.logger!.debug("Processing new activity task", {
        [tagWorkflowID]: t.workflowExecution?.workflowId ?? "",
        [tagRunID]: t.workflowExecution?.runId ?? "",
        [tagActivityType]: t.activityType?.name ?? "",
      });
    });

    let rootCtx = this.userContext;
    if (rootCtx == null) {
      rootCtx = background();
    }
    const [canCtx, cancel] = withCancel(rootCtx);

    const workflowType = t.workflowType?.name ?? "";
    const activityType = t.activityType?.name ?? "";
    const invoker = newServiceInvoker(
      t.taskToken!,
      this.identity,
      this.service!,
      cancel,
      t.heartbeatTimeoutSeconds ?? 0,
      this.workerStopCh!,
      this.featureFlags,
      this.logger!,
      workflowType,
      activityType,
    );

    let result: unknown;
    let activityCompleted = false;

    try {
      const metricsScope = getMetricsScopeForActivity(this.metricsScope!, workflowType, activityType);
      const ctxWithTask = WithActivityTask(
        canCtx,
        t,
        taskList,
        invoker,
        this.logger!,
        metricsScope,
        this.dataConverter!,
        this.workerStopCh!,
        this.contextPropagators,
        this.tracer!,
      );

      const activityImplementation = await this.getActivity(activityType);
      if (activityImplementation == null) {
        const supported = (await this.getRegisteredActivityNames()).join(", ");
        throw new globalThis.Error(`unable to find activityType=${activityType}. Supported types: [${supported}]`);
      }

      try {
        let ctx = ctxWithTask;

        for (const ctxProp of this.contextPropagators) {
          ctx = ctxProp.Extract(ctx, NewHeaderReader(t.header!));
        }

        const info = ctx.value<activityEnvironment>(activityEnvContextKey) as activityEnvironment;
        const [deadlineCtx, dlCancelFunc] = withDeadline(ctx, info.deadline);
        ctx = deadlineCtx;

        try {
          const [spanCtx, spanValue] = createOpenTracingActivitySpan(
            ctx,
            this.tracer!,
            this.clock!.Now(),
            activityType,
            t.workflowExecution?.workflowId ?? "",
            t.workflowExecution?.runId ?? "",
          );
          ctx = spanCtx;
          const span = spanValue as Span;

          try {
            if (
              activityImplementation.GetOptions().EnableAutoHeartbeat &&
              t.heartbeatTimeoutSeconds != null &&
              t.heartbeatTimeoutSeconds > 0
            ) {
              const heartBeater = newHeartbeater(
                this.workerStopCh!,
                invoker,
                this.logger!,
                this.clock!,
                activityType,
                t.workflowExecution!,
              );
              void (async () => {
                await heartBeater.Run(ctx, t.heartbeatTimeoutSeconds! * Second);
              })();
            }

            const activityInfo: common_debug_ActivityInfo = {
              TaskList: this.taskListName,
              ActivityType: activityType,
            };
            const stopper = this.activityTracker!.Start(activityInfo);

            try {
              let output: Buffer | undefined;
              let activityErr: Error | null = null;

              try {
                output = await activityImplementation.Execute(ctx, t.input!);
              } catch (err) {
                if (!(err instanceof Error)) {
                  throw err;
                }
                activityErr = err;
              }

              dlCancelFunc();
              const ctxErr = ctx.err();
              if (ctxErr === ErrDeadlineExceeded) {
                this.logger!.warn("Activity timeout.", {
                  [tagWorkflowID]: t.workflowExecution?.workflowId ?? "",
                  [tagRunID]: t.workflowExecution?.runId ?? "",
                  [tagActivityType]: activityType,
                });
                throw ctxErr;
              }

              if (activityErr != null && activityErr !== ErrActivityResultPending) {
                this.logger!.error("Activity error.", {
                  [tagWorkflowID]: t.workflowExecution?.workflowId ?? "",
                  [tagRunID]: t.workflowExecution?.runId ?? "",
                  [tagActivityType]: activityType,
                  error: activityErr,
                });
              }

              activityCompleted = activityErr == null;
              result = convertActivityResultToRespondRequest(
                this.identity,
                t.taskToken!,
                output,
                activityErr,
                this.dataConverter!,
              );
              return result;
            } finally {
              stopper.Stop();
            }
          } finally {
            span.end();
          }
        } finally {
          dlCancelFunc();
        }
      } catch (r) {
        if (r instanceof Error) {
          throw r;
        }
        if (r == null) {
          throw r;
        }

        const topLine = `activity for ${this.taskListName} [panic]:`;
        const st = getStackTraceRaw(topLine, 4, 0);
        const panicValue =
          r instanceof Error
            ? r.message
            : typeof (r as { String?: unknown }).String === "function"
              ? (r as { String(): string }).String()
              : globalThis.String(r);

        this.logger!.error("Activity panic.", {
          [tagWorkflowID]: t.workflowExecution?.workflowId ?? "",
          [tagRunID]: t.workflowExecution?.runId ?? "",
          [tagActivityType]: activityType,
          [tagPanicError]: panicValue,
          [tagPanicStack]: st,
        });
        metricsScope.Counter(ActivityTaskPanicCounter).Inc(1);

        const panicErr = newPanicError(r, st);
        result = convertActivityResultToRespondRequest(
          this.identity,
          t.taskToken!,
          undefined,
          panicErr,
          this.dataConverter!,
        );
        return result;
      }
    } finally {
      await invoker.Close(!activityCompleted);
      cancel();
    }
  }

}

export function newActivityTaskHandler(service: WorkflowServiceClientLike, params: workerExecutionParameters, registry: registry): ActivityTaskHandler {
  return newActivityTaskHandlerWithCustomProvider(service, params, registry, undefined, RealClock());
}

export function newActivityTaskHandlerWithCustomProvider(service: WorkflowServiceClientLike, params: workerExecutionParameters, registry: registry, activityProvider: activityProvider | undefined, clock: GoClock): activityTaskHandlerImpl {
  if (params.Tracer == null) {
    params.Tracer = trace.getTracer('noop');
  }
  if (params.WorkerStats.ActivityTracker == null) {
    params.WorkerStats.ActivityTracker = NewNoopActivityTracker();
  }
  return new activityTaskHandlerImpl({
    clock,
    taskListName: params.TaskList?.name ?? "",
    identity: params.Identity,
    service,
    logger: params.Logger!,
    metricsScope: NewTaggedScope(params.MetricsScope),
    userContext: params.UserContext!,
    registry,
    activityProvider,
    dataConverter: params.DataConverter!,
    workerStopCh: params.WorkerStopChannel!,
    contextPropagators: params.ContextPropagators,
    tracer: params.Tracer!,
    featureFlags: params.FeatureFlags,
    activityTracker: params.WorkerStats.ActivityTracker!
  });
}
