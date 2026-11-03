// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { internal_WorkflowRegistry } from './worker.js';
import { RegisterWorkflowOptions, RegistryWorkflowInfo } from './workflow.js';
import { internal_ReplayOptions, internal_WorkflowReplayer, NewWorkflowReplayerWithOptions } from './workflow_replayer.js';
import type { WorkflowServiceClientLike } from './runtime/workflow_service_client_like.js';
import { Channel } from './runtime/channel.js';
import { background } from './runtime/context.js';
import { Minute } from './runtime/time.js';
import { WaitGroup } from './runtime/sync.js';
import type { GoClock } from './runtime/clock.js';
import { RealClock } from './runtime/clock.js';
import { IExitCondition as shadower_IExitCondition, ExitCondition as shadower_ExitCondition } from '../generated/thrift/cadence-idl/com/uber/cadence/shadower/ExitCondition.js';
import { Mode as shadower_Mode } from '../generated/thrift/cadence-idl/com/uber/cadence/shadower/Mode.js';
import { NoopLogger } from './runtime/logging.js';
import { Int32Ptr, Float64Ptr, StringPtr } from './common/convert.js';
import { AwaitWaitGroup } from './common/util/util.js';
import { NewQueryBuilder, ToWorkflowStatus, WorkflowStatus, maxTimestamp } from './query_builder.js';
import { tagVisibilityQuery } from './internal_logging_tags.js';
import { replayWorkflowExecutionHelper, scanWorkflowExecutionsHelper } from './workflow_shadower_activities.js';
import { ScanWorkflowActivityParams as shadower_ScanWorkflowActivityParams } from '../generated/thrift/cadence-idl/com/uber/cadence/shadower/ScanWorkflowActivityParams.js';
import { Logger } from 'winston';

/**
 * ShadowMode is an enum for configuring if shadowing should continue after all workflows matches the WorkflowQuery have been replayed.
 */
export enum internal_ShadowMode {
  ShadowModeNormal = 0,
  ShadowModeContinuous = 1,
}

/**
 * ShadowOptions is used to configure workflow shadowing.
 */
export class internal_ShadowOptions {
  constructor(init?: Partial<internal_ShadowOptions>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  WorkflowQuery: string = "";

  WorkflowTypes: string[] = [];

  ExcludeTypes: string[] = [];

  WorkflowStatus: string[] = [];

  WorkflowStartTimeFilter: internal_TimeFilter = new internal_TimeFilter();

  WorkflowCloseTimeFilter: internal_TimeFilter = new internal_TimeFilter();

  SamplingRate: number = 0;

  Mode: internal_ShadowMode = 0;

  ExitCondition: internal_ShadowExitCondition = new internal_ShadowExitCondition();

  Concurrency: number = 0;

  validateAndPopulateFields(): void {
      const exitConditionSpecified =
          this.ExitCondition.ExpirationInterval > 0 ||
          this.ExitCondition.ShadowCount > 0;

      if (
          this.Mode === internal_ShadowMode.ShadowModeContinuous &&
          !exitConditionSpecified
      ) {
          throw new Error(
              "exit condition must be specified if shadow mode is set to continuous",
          );
      }

      if (this.SamplingRate < 0 || this.SamplingRate > 1) {
          throw new Error("sampling rate should be in range [0, 1]");
      }

      if (
          this.WorkflowQuery.length !== 0 &&
          (this.WorkflowTypes.length !== 0 ||
              this.WorkflowStatus.length !== 0 ||
              !this.WorkflowStartTimeFilter!.isEmpty())
      ) {
          throw new Error(
              "workflow types, status, start time and close time filter can't be specified when workflow query is specified",
          );
      }

      if (this.WorkflowQuery.length === 0) {
          const queryBuilder = NewQueryBuilder();

          if (this.WorkflowTypes.length > 0) {
              queryBuilder.WorkflowTypes(this.WorkflowTypes);
          }

          if (this.ExcludeTypes.length > 0) {
              queryBuilder.ExcludeWorkflowTypes(this.ExcludeTypes);
          }

          const statuses: WorkflowStatus[] = [];
          for (const statusString of this.WorkflowStatus) {
              const status = ToWorkflowStatus(statusString);
              statuses.push(status);
          }

          if (statuses.length === 0) {
              statuses.push(WorkflowStatus.WorkflowStatusOpen);
          }

          queryBuilder.WorkflowStatus(statuses);

          if (!this.WorkflowStartTimeFilter!.isEmpty()) {
              try {
                  this.WorkflowStartTimeFilter!.validateAndPopulateFields();
              } catch (err) {
                  if (!(err instanceof Error)) {
                      throw err;
                  }
                  throw new Error(`invalid start time filter, error: ${err.message}`);
              }

              queryBuilder.StartTime(
                  this.WorkflowStartTimeFilter!.MinTimestamp,
                  this.WorkflowStartTimeFilter!.MaxTimestamp,
              );
          }

          if (!this.WorkflowCloseTimeFilter!.isEmpty()) {
              try {
                  this.WorkflowCloseTimeFilter!.validateAndPopulateFields();
              } catch (err) {
                  if (!(err instanceof Error)) {
                      throw err;
                  }
                  throw new Error(`invalid close time filter, error: ${err.message}`);
              }

              queryBuilder.CloseTime(
                  this.WorkflowCloseTimeFilter!.MinTimestamp,
                  this.WorkflowCloseTimeFilter!.MaxTimestamp,
              );
          }

          this.WorkflowQuery = queryBuilder.Build();
      }

      if (this.SamplingRate === 0) {
          this.SamplingRate = 1;
      }

      if (this.Concurrency === 0) {
          this.Concurrency = 1;
      }
  }

}

/**
 * TimeFilter represents a time range through the min and max timestamp
 */
export class internal_TimeFilter {
  constructor(init?: Partial<internal_TimeFilter>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  MinTimestamp: number = 0;

  MaxTimestamp: number = 0;

  validateAndPopulateFields(): void {
      if (this.MaxTimestamp === 0) {
          this.MaxTimestamp = maxTimestamp;
      }

      if (this.MaxTimestamp < this.MinTimestamp) {
          throw new Error("maxTimestamp should be after minTimestamp");
      }
  }

  isEmpty(): boolean {
      if (this == null) {
          return true;
      }

      return this.MinTimestamp === 0 && this.MaxTimestamp === 0;
  }

}

/**
 * ShadowExitCondition configures when the workflow shadower should exit.
 * If not specified shadower will exit after replaying all workflows satisfying the visibility query.
 */
export class internal_ShadowExitCondition {
  constructor(init?: Partial<internal_ShadowExitCondition>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  ExpirationInterval: number = 0;

  ShadowCount: number = 0;

  toThriftPtr(): shadower_IExitCondition {
      return new shadower_ExitCondition({
          shadowCount: Int32Ptr(this.ShadowCount),
          expirationIntervalInSeconds: Int32Ptr(Math.trunc(this.ExpirationInterval / 1e9)),
      });
  }

}

/**
 * WorkflowShadower retrieves and replays workflow history from Cadence service
 * to determine if there's any nondeterministic changes in the workflow definition
 */
export class internal_WorkflowShadower implements internal_WorkflowRegistry {
  constructor(init?: Partial<internal_WorkflowShadower>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  service?: WorkflowServiceClientLike;

  domain: string = "";

  shadowOptions: internal_ShadowOptions = new internal_ShadowOptions();

  logger?: Logger;

  replayer?: internal_WorkflowReplayer;

  status: number = 0;

  shutdownCh?: Channel<{}>;

  shutdownWG: WaitGroup = new WaitGroup();

  clock?: GoClock;

  async RegisterWorkflow(w: unknown): Promise<void> {
    await this.replayer!.RegisterWorkflow(w);
  }

  async RegisterWorkflowWithOptions(w: unknown, options: RegisterWorkflowOptions): Promise<void> {
    await this.replayer!.RegisterWorkflowWithOptions(w, options);
  }

  async Run(): Promise<void> {
      if (this.status !== statusInitialized) {
          throw new Error("Workflow shadower already started");
      }

      this.status = statusStarted;
      await this.shadowWorker();
  }

  async GetRegisteredWorkflows(): Promise<RegistryWorkflowInfo[]> {
    return this.replayer!.GetRegisteredWorkflows();
  }

  async shadowWorker(): Promise<void> {
      this.shutdownWG.Add(1);
      try {
          const scanRequest = new shadower_ScanWorkflowActivityParams({
              domain: StringPtr(this.domain),
              workflowQuery: StringPtr(this.shadowOptions.WorkflowQuery),
              samplingRate: Float64Ptr(this.shadowOptions.SamplingRate),
          });

          this.logger!.info("Shadow workflow query", {
              [tagVisibilityQuery]: this.shadowOptions.WorkflowQuery,
          });

          const ctx = background();
          let expirationTime = 9223372036854775807;
          if (this.shadowOptions.ExitCondition.ExpirationInterval !== 0) {
              expirationTime =
                  this.clock!.Now() + this.shadowOptions.ExitCondition.ExpirationInterval;
          }

          let replayCount = 0;
          let maxReplayCount = 9223372036854775807;
          if (this.shadowOptions.ExitCondition.ShadowCount !== 0) {
              maxReplayCount = this.shadowOptions.ExitCondition.ShadowCount;
          }

          for (;;) {
              const scanResult = await scanWorkflowExecutionsHelper(
                  ctx,
                  this.service!,
                  scanRequest,
                  this.logger!,
              );

              for (const execution of scanResult.executions ?? []) {
                  if (this.clock!.Now() > expirationTime) {
                      return;
                  }

                  const success = await replayWorkflowExecutionHelper(
                      ctx,
                      this.replayer!,
                      this.service!,
                      this.logger!,
                      this.domain,
                      {
                          ID: execution.workflowId ?? "",
                          RunID: execution.runId ?? "",
                      },
                  );

                  if (success) {
                      replayCount++;
                  }

                  if (replayCount === maxReplayCount) {
                      return;
                  }
              }

              if ((scanResult.nextPageToken?.length ?? 0) === 0) {
                  if (
                      this.shadowOptions.Mode === internal_ShadowMode.ShadowModeNormal ||
                      this.clock!.Now() + defaultWaitDurationPerIteration > expirationTime
                  ) {
                      return;
                  }

                  await this.clock!.Sleep(defaultWaitDurationPerIteration);
              }

              scanRequest.nextPageToken = scanResult.nextPageToken;
          }
      } finally {
          this.shutdownWG.Done();
      }
  }

  Stop(): void {
  	if (this.status !== statusStarted) {
  		return;
  	}
  	this.status = statusStopped;

  	this.shutdownCh?.close();

  	void AwaitWaitGroup(this.shutdownWG, Minute).then((success) => {
  		if (!success) {
  			this.logger?.warn("Workflow Shadower timedout on shutdown");
  		}
  	});
  }

}

/**
 * NewWorkflowShadower creates an instance of the WorkflowShadower for testing
 * The logger is an optional parameter. Defaults to noop logger if not provided and will override the logger in WorkerOptions
 */
export function NewWorkflowShadower(service: WorkflowServiceClientLike, domain: string, shadowOptions: internal_ShadowOptions, replayOptions: internal_ReplayOptions, logger: Logger | undefined): internal_WorkflowShadower {
  if (domain.length === 0) {
    throw new Error("domain is not set");
  }

  shadowOptions.validateAndPopulateFields();

  if (shadowOptions.Concurrency > 1) {
    throw new Error("local workflow shadower doesn't support concurrency > 1");
  }

  if (logger == null) {
    logger = NoopLogger();
  }

  return new internal_WorkflowShadower({
    service,
    domain,
    shadowOptions,
    logger,
    replayer: NewWorkflowReplayerWithOptions(replayOptions),
    status: statusInitialized,
    shutdownCh: new Channel<{}>(0),
    shutdownWG: new WaitGroup(),
    clock: RealClock(),
  });
}

export function internal_ShadowMode_toThriftPtr(m: internal_ShadowMode): shadower_Mode {
  switch (m) {
    case internal_ShadowMode.ShadowModeNormal:
      return shadower_Mode.Normal;
    case internal_ShadowMode.ShadowModeContinuous:
      return shadower_Mode.Continuous;
    default:
      throw `unknown shadow mode ${m}`;
  }
}

export const defaultWaitDurationPerIteration = 300000000000;

export const statusInitialized = 0;

export const statusStarted = 1;

export const statusStopped = 2;
