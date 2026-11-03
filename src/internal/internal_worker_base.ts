// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { ConcurrentRetrier, NewConcurrentRetrier } from './common/backoff/retry.js';
import { ExponentialRetryPolicy, NewExponentialRetryPolicy, NoInterval } from './common/backoff/retrypolicy.js';
import { common_debug_PollerTracker } from './common/debug/types.js';
import { internal_DataConverter, internal_Value } from './encoded.js';
import { internal_ContextPropagator } from './headers.js';
import { internal_WorkflowInterceptorFactory } from './interceptors.js';
import { asyncActivityClient, localActivityClient } from './internal_activity.js';
import { internal_AutoScalerOptions } from './internal_poller_autoscaler.js';
import { taskPoller, isClientSideError } from './internal_task_pollers.js';
import { workflowTimerClient } from './internal_time.js';
import { internal_FeatureFlags, getKillSignal } from './internal_utils.js';
import { executeWorkflowParams, getStackTraceRaw } from './internal_workflow.js';
import { registry } from './registry.js';
import { internal_SessionInfo, sessionTokenBucket } from './session.js';
import { ConcurrencyLimit } from './worker/concurrency.js';
import { ConcurrencyAutoScaler, NewConcurrencyAutoScaler } from './worker/concurrency_auto_scaler.js';
import { WorkflowInfo, internal_GetVersionOption, internal_Version, internal_WorkflowExecution } from './workflow.js';
import { Channel } from './runtime/channel.js';
import { Context, background, withCancel } from './runtime/context.js';
import type { Scope } from './runtime/tally.js';
import { WaitGroup } from './runtime/sync.js';
import { IHeader as shared_IHeader } from '../generated/thrift/cadence-idl/com/uber/cadence/Header.js';
import { AwaitWaitGroup } from './common/util/util.js';
import { traceLog, autoConfigHintAwareTask } from './internal_task_handlers.js';
import { WorkerStartCounter, WorkerPanicCounter, ConcurrentTaskQuota, PollerRequestBufferUsage, PollerStartCounter } from './common/metrics/constants.js';
import { mapCase, recvCase, selectOne, sendCase } from './runtime/select.js';
import { tagPanicError, tagPanicStack, tagWorkerType } from './internal_logging_tags.js';
import { tagScope } from './internal_worker.js';
import { NewResizablePermit } from './worker/resizable_permit.js';
import { RealClock } from './runtime/clock.js';
import { enableVerboseLogging } from './internal_public.js';
import { BadRequestError, ClientVersionNotSupportedError } from '../errors/idl_errors.js';
import { Logger } from 'winston';
import { RateLimiter } from 'limiter';

/**
 * baseWorkerOptions options to configure base worker.
 */
export interface baseWorkerOptions {
  pollerAutoScaler: internal_AutoScalerOptions;
  pollerCountWithoutAutoScaling: number;
  pollerRate: number;
  maxConcurrentTask: number;
  maxTaskPerSecond: number;
  taskWorker?: taskPoller;
  identity: string;
  workerType: string;
  shutdownTimeout: number;
  userContextCancel?: () => void;
  host: string;
  pollerTracker?: common_debug_PollerTracker;
}

export type laResultHandler = (p0: localActivityResultWrapper) => void | Promise<void>;

export interface localActivityResultWrapper {
  err?: Error | null;
  result?: Buffer;
  attempt: number;
  backoff: number;
}

/**
 * resultHandler that returns result
 */
export type resultHandler = (p0: Buffer, p1: Error | null) => void | Promise<void>;

export interface workflowDefinition {
  Execute(env: workflowEnvironment, header: shared_IHeader, input: Buffer): Promise<void>;
  OnDecisionTaskStarted(): Promise<void>;
  StackTrace(): Promise<string>;
  KnownQueryTypes(): string[];
  Close(): Promise<void>;
}

export interface workflowEnvironment extends asyncActivityClient, localActivityClient, workflowTimerClient {
  SideEffect(f: () => Buffer, callback: resultHandler): void;
  GetVersion(changeID: string, minSupported: internal_Version, maxSupported: internal_Version, ...opts: internal_GetVersionOption[]): Promise<internal_Version>;
  WorkflowInfo(): WorkflowInfo;
  Complete(result: Buffer, err: Error | null): Promise<void>;
  RegisterCancelHandler(handler: () => void | Promise<void>): void;
  RequestCancelChildWorkflow(domainName: string, workflowID: string): Promise<void>;
  RequestCancelExternalWorkflow(domainName: string, workflowID: string, runID: string, callback: resultHandler): Promise<void>;
  ExecuteChildWorkflow(params: executeWorkflowParams, callback: resultHandler, startedHandler: (p0: internal_WorkflowExecution, p1: Error | null) => void | Promise<void>): void;
  GetLogger(): Logger;
  GetMetricsScope(): Scope;
  RegisterSignalHandler(handler: (p0: string, p1: Buffer) => void | Promise<void>): void;
  SignalExternalWorkflow(domainName: string, workflowID: string, runID: string, signalName: string, input: Buffer, arg: unknown, childWorkflowOnly: boolean, callback: resultHandler): void;
  RegisterQueryHandler(handler: (p0: string, p1: Buffer) => Buffer | Promise<Buffer>): void;
  IsReplaying(): boolean;
  MutableSideEffect(id: string, f: () => unknown, equals: (p0: unknown, p1: unknown) => boolean): internal_Value;
  GetDataConverter(): internal_DataConverter;
  AddSession(sessionInfo: internal_SessionInfo): void;
  RemoveSession(sessionID: string): void;
  GetContextPropagators(): internal_ContextPropagator[];
  UpsertSearchAttributes(attributes: Record<string, unknown>): Promise<void>;
  GetRegistry(): registry;
  GetWorkflowInterceptors(): internal_WorkflowInterceptorFactory[];
  GetFeatureFlags(): internal_FeatureFlags;
}

/**
 * baseWorker that wraps worker activities.
 */
export class baseWorker {
  constructor(init?: Partial<baseWorker>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  options: baseWorkerOptions = { pollerAutoScaler: { Enabled: false, Cooldown: 0, PollerMinCount: 0, PollerMaxCount: 0, PollerInitCount: 0, PollerWaitTimeUpperBound: 0, PollerWaitTimeLowerBound: 0 }, pollerCountWithoutAutoScaling: 0, pollerRate: 0, maxConcurrentTask: 0, maxTaskPerSecond: 0, identity: "", workerType: "", shutdownTimeout: 0, host: "" };

  isWorkerStarted: boolean = false;

  shutdownCh?: Channel<{}>;

  shutdownWG: WaitGroup = new WaitGroup();

  pollLimiter?: RateLimiter;

  taskLimiter?: RateLimiter;

  limiterContext?: Context;

  limiterContextCancel?: (p0: Error | null) => void | Promise<void>;

  retrier?: ConcurrentRetrier;

  logger?: Logger;

  metricsScope?: Scope;

  concurrency?: ConcurrencyLimit;

  concurrencyAutoScaler?: ConcurrencyAutoScaler;

  taskQueueCh?: Channel<unknown>;

  sessionTokenBucket?: sessionTokenBucket;

  isShutdown(): boolean {
    if (this.shutdownCh == null) {
      return false;
    }

    const result = this.shutdownCh.tryRecv();
    return result.received || result.closed;
  }

  async runPoller(): Promise<void> {
    let stopper: { Stop(): void } | undefined;

    try {
      stopper = this.options.pollerTracker!.Start();
      this.metricsScope!.Counter(PollerStartCounter).Inc(1);

      for (;;) {
        const [permitChannel, channelDone] = this.concurrency!.TaskPermit!.AcquireChan(this.limiterContext!);
        const outcome = await selectOne([
          mapCase(recvCase(this.shutdownCh), () => ({ kind: 'shutdown' as const })),
          mapCase(recvCase(permitChannel), () => ({ kind: 'permit' as const })),
        ]);

        await channelDone();

        if (outcome.kind === 'shutdown') {
          return;
        }

        this.metricsScope!.Histogram(ConcurrentTaskQuota, concurrentTaskHistogramBuckets).RecordValue(
          this.concurrency!.TaskPermit!.Quota(),
        );
        this.metricsScope!.Histogram(PollerRequestBufferUsage, concurrentTaskHistogramBuckets).RecordValue(
          this.concurrency!.TaskPermit!.Count(),
        );

        if (this.sessionTokenBucket != null) {
          await this.sessionTokenBucket!.waitForAvailableToken();
        }

        await this.pollTask();
      }
    } finally {
      try {
        if (stopper != null) {
          stopper.Stop();
        }
      } finally {
        this.shutdownWG.Done();
      }
    }
  }

  async Stop(): Promise<void> {
    if (!this.isWorkerStarted) {
      return;
    }

    this.shutdownCh!.close();
    await this.limiterContextCancel!(errShutdown);
    await this.concurrencyAutoScaler?.Stop();

    const success = await AwaitWaitGroup(this.shutdownWG, this.options.shutdownTimeout);
    if (!success) {
      traceLog(() => {
        this.logger!.info("Worker graceful shutdown timed out.", {
          "Shutdown timeout": this.options.shutdownTimeout,
        });
      });
    }

    if (this.options.userContextCancel != null) {
      await this.options.userContextCancel!();
    }

    return;
  }

  async Run(): Promise<void> {
    await this.Start();
    const { value: d } = await getKillSignal().recv();
    traceLog(() => {
      this.logger!.info("Worker has been killed", {
        Signal: (d as { String(): string }).String(),
      });
    });
    await this.Stop();
  }

  async Start(): Promise<void> {
    if (this.isWorkerStarted) {
      return;
    }

    this.metricsScope!.Counter(WorkerStartCounter).Inc(1);

    await this.concurrencyAutoScaler?.Start();

    let maxPollerCount = this.options.pollerCountWithoutAutoScaling;
    if (this.options.pollerAutoScaler.Enabled) {
      maxPollerCount = this.options.pollerAutoScaler.PollerMaxCount;
    }

    for (let i = 0; i < maxPollerCount; i++) {
      this.shutdownWG.Add(1);
      void (async () => {
        await this.runPoller();
      })();
    }

    this.shutdownWG.Add(1);
    void (async () => {
      await this.runTaskDispatcher();
    })();

    this.isWorkerStarted = true;
    traceLog(() => {
      this.logger!.info("Started Worker", {
        PollerCountWithoutAutoScaling: this.options.pollerCountWithoutAutoScaling,
        MaxConcurrentTask: this.options.maxConcurrentTask,
        MaxTaskPerSecond: this.options.maxTaskPerSecond,
        AutoscalerEnabled: this.options.pollerAutoScaler.Enabled,
        AutoscalerPollerMaxCount: this.options.pollerAutoScaler.PollerMaxCount,
        AutoscalerPollerMinCount: this.options.pollerAutoScaler.PollerMinCount,
        AutoscalerPollerInitialCount: this.options.pollerAutoScaler.PollerInitCount,
      });
    });
  }

  async processTask(task: unknown): Promise<void> {
    const isPolledTask = task instanceof polledTask;
    const polledTaskLocal = isPolledTask ? task as polledTask : undefined;

    if (isPolledTask) {
      task = polledTaskLocal!.task;
    }

    try {
      try {
        await this.options.taskWorker!.ProcessTask(task);
      } catch (err) {
        if (!(err instanceof Error)) {
          throw err;
        }

        if (isClientSideError(err)) {
          this.logger!.info("Task processing failed with client side error", { error: err });
        } else {
          this.logger!.info("Task processing failed with error", { error: err });
        }
      }
    } catch (panic) {
      if (panic == null) {
        throw panic;
      }

      this.metricsScope!.Counter(WorkerPanicCounter).Inc(1);
      const topLine = `base worker for ${this.options.workerType} [panic]:`;
      const stack = getStackTraceRaw(topLine, 4, 0);
      const panicMessage =
        panic instanceof Error
          ? panic.message
          : typeof (panic as { String?: unknown }).String === "function"
            ? (panic as { String(): string }).String()
            : globalThis.String(panic);

      this.logger!.error("Unhandled panic.", {
        [tagPanicError]: panicMessage,
        [tagPanicStack]: stack
      });
    }

    if (isPolledTask) {
      this.concurrency!.TaskPermit!.Release();
    }

    this.shutdownWG.Done();
  }

  async runTaskDispatcher(): Promise<void> {
    try {
      for (;;) {
        const outcome = await selectOne([
          mapCase(recvCase(this.shutdownCh), () => ({ kind: "shutdown" as const })),
          mapCase(recvCase(this.taskQueueCh), (r) => ({
            kind: "task" as const,
            task: r.value,
          })),
        ]);

        if (outcome.kind === "shutdown") {
          return;
        }

        const task = outcome.task;
        const isPolledTask = task instanceof polledTask;

        if (isPolledTask) {
          try {
            await this.taskLimiter!.removeTokens(1);
          } catch {
            if (this.isShutdown()) {
              return;
            }
          }
        }

        this.shutdownWG.Add(1);
        void (async () => {
          await this.processTask(task);
        })();
      }
    } finally {
      this.shutdownWG.Done();
    }
  }

  async pollTask(): Promise<void> {
    let task: unknown = undefined;

    try {
      await this.concurrency!.PollerPermit!.Acquire(this.limiterContext!);
    } catch (pErr) {
      if (!(pErr instanceof Error)) throw pErr;
      if (this.limiterContext!.err() !== errShutdown) {
        this.logger!.warn("poller permit acquire error", { error: pErr });
      }
      return;
    }

    try {
      await this.retrier!.Throttle();

      let canPoll = this.pollLimiter == null;
      if (!canPoll) {
        try {
          await this.pollLimiter!.removeTokens(1);
          canPoll = true;
        } catch (pollLimiterErr) {
          if (!(pollLimiterErr instanceof Error)) throw pollLimiterErr;
        }
      }

      if (canPoll) {
        try {
          task = await this.options.taskWorker!.PollTask();
          await this.retrier!.Succeeded();

          if (
            task != null &&
            typeof task === "object" &&
            "getAutoConfigHint" in task &&
            typeof (task as { getAutoConfigHint?: unknown }).getAutoConfigHint === "function"
          ) {
            await this.concurrencyAutoScaler?.ProcessPollerHint(
              (task as autoConfigHintAwareTask).getAutoConfigHint()
            );
          }
        } catch (err) {
          if (!(err instanceof Error)) throw err;
          if (enableVerboseLogging) {
            this.logger!.debug("Failed to poll for task.", { error: err });
          }
          if (isNonRetriableError(err)) {
            this.logger!.error(
              "Worker received non-retriable error from PollTask; continue polling.",
              { error: err }
            );
          }
          await this.retrier!.Failed();
        }
      }

      if (task != null) {
        await selectOne([
          mapCase(
            sendCase(this.taskQueueCh, new polledTask({ task })),
            () => ({ kind: "task" as const })
          ),
          mapCase(
            recvCase(this.shutdownCh),
            () => ({ kind: "shutdown" as const })
          )
        ]);
      } else {
        this.concurrency!.TaskPermit!.Release();
      }
    } finally {
      this.concurrency!.PollerPermit!.Release();
    }
  }

}

export class polledTask {
  constructor(init?: Partial<polledTask>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  task?: unknown;

}

export function createPollRetryPolicy(): ExponentialRetryPolicy {
  const policy = NewExponentialRetryPolicy(retryPollOperationInitialInterval);
  policy.SetMaximumInterval(retryPollOperationMaxInterval);
  policy.SetExpirationInterval(NoInterval);
  return policy;
}

export function isNonRetriableError(err: Error | null): boolean {
    if (err == null) {
        return false;
    }
    return err instanceof BadRequestError || err instanceof ClientVersionNotSupportedError;
}

export function newBaseWorker(options: baseWorkerOptions, logger: Logger, metricsScope: Scope, sessionTokenBucket: sessionTokenBucket | undefined): baseWorker {
  const [ctx, cancel] = withCancel(background());
  logger = logger.child({ [tagWorkerType]: options.workerType });
  metricsScope = tagScope(metricsScope, tagWorkerType, options.workerType);

  let concurrency: ConcurrencyLimit = {
    PollerPermit: NewResizablePermit(options.pollerCountWithoutAutoScaling),
    TaskPermit: NewResizablePermit(options.maxConcurrentTask),
  };

  let concurrencyAS: ConcurrencyAutoScaler | undefined = undefined;
  const pollerOptions = options.pollerAutoScaler;
  if (pollerOptions.Enabled) {
    concurrency = {
      PollerPermit: NewResizablePermit(pollerOptions.PollerInitCount),
      TaskPermit: NewResizablePermit(options.maxConcurrentTask),
    };
    concurrencyAS = NewConcurrencyAutoScaler({
      Concurrency: concurrency,
      Cooldown: pollerOptions.Cooldown,
      PollerMaxCount: pollerOptions.PollerMaxCount,
      PollerMinCount: pollerOptions.PollerMinCount,
      PollerWaitTimeUpperBound: pollerOptions.PollerWaitTimeUpperBound,
      PollerWaitTimeLowerBound: pollerOptions.PollerWaitTimeLowerBound,
      Logger: logger,
      Scope: metricsScope,
      Clock: RealClock(),
      Tick: 0,
    });
  }

  const bw = new baseWorker({
    isWorkerStarted: false,
    shutdownWG: new WaitGroup(),
    options,
    shutdownCh: new Channel<{}>(0),
    taskLimiter: new RateLimiter({ tokensPerInterval: options.maxTaskPerSecond, interval: 'second' }),
    retrier: NewConcurrentRetrier(pollOperationRetryPolicy),
    logger,
    metricsScope,
    concurrency,
    concurrencyAutoScaler: concurrencyAS,
    taskQueueCh: new Channel<unknown>(0),
    limiterContext: ctx,
    limiterContextCancel: cancel,
    sessionTokenBucket,
    pollLimiter: options.pollerRate > 0
      ? new RateLimiter({ tokensPerInterval: options.pollerRate, interval: 'second' })
      : undefined,
  });

  return bw;
}

export const retryPollOperationInitialInterval = 20000000;

export const retryPollOperationMaxInterval = 10000000000;

export let pollOperationRetryPolicy = createPollRetryPolicy();

export let concurrentTaskHistogramBuckets = [0, 10, 20, 50, 100, 150, 200, 400, 600, 800, 1000, 1500, 2000, 3000, 5000, 10000];

export let errShutdown = new Error("worker shutting down");
