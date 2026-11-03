// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { RegisterActivityOptions, RegistryActivityInfo } from './activity.js';
import { auth_AuthorizationProvider } from './common/auth/service_wrapper.js';
import { common_debug_WorkerStats } from './common/debug/types.js';
import { internal_DataConverter } from './encoded.js';
import { internal_ContextPropagator } from './headers.js';
import { internal_WorkflowInterceptorFactory } from './interceptors.js';
import { internal_AutoScalerOptions } from './internal_poller_autoscaler.js';
import { internal_FeatureFlags } from './internal_utils.js';
import { RegisterWorkflowOptions, RegistryWorkflowInfo, internal_WorkflowExecution } from './workflow.js';
import { internal_ShadowOptions } from './workflow_shadower.js';
import type { WorkflowServiceClientLike } from './runtime/workflow_service_client_like.js';
import { Context } from './runtime/context.js';
import type { Scope } from './runtime/tally.js';
import { Channel } from './runtime/channel.js';
import { IHistory as shared_IHistory } from '../generated/thrift/cadence-idl/com/uber/cadence/History.js';
import { ITaskList as shared_ITaskList } from '../generated/thrift/cadence-idl/com/uber/cadence/TaskList.js';
import { newAggregatedWorker } from './internal_worker.js';
import { NewWorkflowReplayer } from './workflow_replayer.js';
import { history } from './internal_task_handlers.js';
import { Logger } from 'winston';
import { Second } from './runtime/time.js';

/**
 * WorkerBugPorts allows opt-in enabling of older, possibly buggy behavior, primarily intended to allow temporarily
 * emulating old behavior until a fix is deployed.
 * By default, bugs (especially rarely-occurring ones) are fixed and all users are opted into the new behavior.
 * Back-ported buggy behavior *may* be available via these flags.
 * 
 * Bugports are always deprecated and may be removed in future versions.
 * Generally speaking they will *likely* remain in place for one minor version, and then they may be removed to
 * allow cleaning up the additional code complexity that they cause.
 * Deprecated: All bugports are always deprecated and may be removed at any time
 */
export interface WorkerBugPorts {
  DisableStrictNonDeterminismCheck: boolean;
}

export interface internal_ActivityRegistry {
  RegisterActivity(a: unknown): Promise<void>;
  RegisterActivityWithOptions(a: unknown, options: RegisterActivityOptions): Promise<void>;
  GetRegisteredActivities(): Promise<RegistryActivityInfo[]>;
}

/**
 * NonDeterministicWorkflowPolicy is an enum for configuring how client's decision task handler deals with
 * mismatched history events (presumably arising from non-deterministic workflow definitions).
 */
export enum internal_NonDeterministicWorkflowPolicy {
  NonDeterministicWorkflowPolicyBlockWorkflow = 0,
  NonDeterministicWorkflowPolicyFailWorkflow = 1,
}

export interface internal_Registry extends internal_WorkflowRegistry, internal_ActivityRegistry {}

export interface internal_Worker extends internal_Registry {
  Start(): Promise<void>;
  Run(): Promise<void>;
  Stop(): Promise<void>;
}

export interface internal_WorkflowRegistry {
  RegisterWorkflow(w: unknown): Promise<void>;
  RegisterWorkflowWithOptions(w: unknown, options: RegisterWorkflowOptions): Promise<void>;
  GetRegisteredWorkflows(): Promise<RegistryWorkflowInfo[]>;
}

/**
 * WorkerOptions is used to configure a worker instance.
 * The current timeout resolution implementation is in seconds and uses math.Ceil(d.Seconds()) as the duration. But is
 * subjected to change in the future.
 */
export class WorkerOptions {
  constructor(init?: Partial<WorkerOptions>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  MaxConcurrentActivityExecutionSize: number = 0;

  WorkerActivitiesPerSecond: number = 0;

  MaxConcurrentLocalActivityExecutionSize: number = 0;

  WorkerLocalActivitiesPerSecond: number = 0;

  TaskListActivitiesPerSecond: number = 0;

  MaxConcurrentActivityTaskPollers: number = 0;

  MinConcurrentActivityTaskPollers: number = 0;

  MaxConcurrentDecisionTaskExecutionSize: number = 0;

  WorkerDecisionTasksPerSecond: number = 0;

  MaxConcurrentDecisionTaskPollers: number = 0;

  MinConcurrentDecisionTaskPollers: number = 0;

  PollerAutoScalerCooldown: number = 0;

  PollerAutoScalerTargetUtilization: number = 0;

  PollerAutoScalerDryRun: boolean = false;

  AutoScalerOptions: internal_AutoScalerOptions = { Enabled: false, Cooldown: 0, PollerMinCount: 0, PollerMaxCount: 0, PollerInitCount: 0, PollerWaitTimeUpperBound: 0, PollerWaitTimeLowerBound: 0 };

  Identity: string = "";

  IsolationGroup: string = "";

  MetricsScope?: Scope;

  Logger?: Logger;

  EnableLoggingInReplay: boolean = false;

  DisableWorkflowWorker: boolean = false;

  DisableActivityWorker: boolean = false;

  DisableStickyExecution: boolean = false;

  StickyScheduleToStartTimeout: number = 0;

  BackgroundActivityContext?: Context;

  NonDeterministicWorkflowPolicy: internal_NonDeterministicWorkflowPolicy = 0;

  DataConverter?: internal_DataConverter;

  WorkerStopTimeout: number = 0;

  EnableSessionWorker: boolean = false;

  MaxConcurrentSessionExecutionSize: number = 0;

  WorkflowInterceptorChainFactories: internal_WorkflowInterceptorFactory[] = [];

  ContextPropagators: internal_ContextPropagator[] = [];

  Tracer?: unknown;

  EnableShadowWorker: boolean = false;

  ShadowOptions: internal_ShadowOptions = new internal_ShadowOptions();

  FeatureFlags: internal_FeatureFlags = { WorkflowExecutionAlreadyCompletedErrorEnabled: false, AutoforwardingEnabled: false, PollerAutoScalerEnabled: false, EphemeralTaskListsEnabled: false, MetricEmitMode: 0 };

  Authorization?: auth_AuthorizationProvider;

  WorkerBugPorts: WorkerBugPorts = { DisableStrictNonDeterminismCheck: false };

  WorkerStats: common_debug_WorkerStats = {};

  Validate(): void {
    if (!this.DisableStickyExecution && this.MaxConcurrentDecisionTaskPollers === 1) {
      throw new Error("DecisionTaskPollers must be >= 2 or use default value");
    }
  }

}

/**
 * NewWorker creates an instance of worker for managing workflow and activity executions.
 * service 	- thrift connection to the cadence server.
 * domain - the name of the cadence domain.
 * taskList 	- is the task list name you use to identify your client worker, also
 * 
 * 	identifies group of workflow and activity implementations that are hosted by a single worker process.
 * 
 * options 	-  configure any worker specific options like logger, metrics, identity.
 */
export async function NewWorker(service: WorkflowServiceClientLike, domain: string, taskList: string, options: WorkerOptions): Promise<internal_Worker> {
  return await newAggregatedWorker(service, domain, taskList, options);
}

/**
 * ReplayWorkflowExecution loads a workflow execution history from the Cadence service and executes a single decision task for it.
 * Use for testing backwards compatibility of code changes and troubleshooting workflows in a debugger.
 * The logger is the only optional parameter. Defaults to the noop logger.
 * Deprecated: Global workflow replay methods are replaced by equivalent WorkflowReplayer instance methods.
 * This method is kept to maintain backward compatibility and should not be used.
 */
export async function ReplayWorkflowExecution(ctx: Context, service: WorkflowServiceClientLike, logger: Logger, domain: string, execution: internal_WorkflowExecution): Promise<void> {
  const r = NewWorkflowReplayer();
  await r.ReplayWorkflowExecution(ctx, service, logger, domain, execution);
}

/**
 * ReplayWorkflowHistory executes a single decision task for the given history.
 * Use for testing the backwards compatibility of code changes and troubleshooting workflows in a debugger.
 * The logger is an optional parameter. Defaults to the noop logger.
 * Deprecated: Global workflow replay methods are replaced by equivalent WorkflowReplayer instance methods.
 * This method is kept to maintain backward compatibility and should not be used.
 */
export async function ReplayWorkflowHistory(logger: Logger, history: shared_IHistory): Promise<void> {
    const r = NewWorkflowReplayer();
    await r.ReplayWorkflowHistory(logger, history);
}

/**
 * ReplayWorkflowHistoryFromJSONFile executes a single decision task for the given json history file.
 * Use for testing backwards compatibility of code changes and troubleshooting workflows in a debugger.
 * The logger is an optional parameter. Defaults to the noop logger.
 * Deprecated: Global workflow replay methods are replaced by equivalent WorkflowReplayer instance methods.
 * This method is kept to maintain backward compatibility and should not be used.
 */
export async function ReplayWorkflowHistoryFromJSONFile(logger: Logger, jsonfileName: string): Promise<void> {
  const r = NewWorkflowReplayer();
  await r.ReplayWorkflowHistoryFromJSONFile(logger, jsonfileName);
}

/**
 * ReplayPartialWorkflowHistoryFromJSONFile executes a single decision task for the given json history file upto provided
 * lastEventID(inclusive).
 * Use for testing backwards compatibility of code changes and troubleshooting workflows in a debugger.
 * The logger is an optional parameter. Defaults to the noop logger.
 * Deprecated: Global workflow replay methods are replaced by equivalent WorkflowReplayer instance methods.
 * This method is kept to maintain backward compatibility and should not be used.
 */
export async function ReplayPartialWorkflowHistoryFromJSONFile(logger: Logger, jsonfileName: string, lastEventID: number): Promise<void> {
    const r = NewWorkflowReplayer();
    await r.ReplayPartialWorkflowHistoryFromJSONFile(logger, jsonfileName, lastEventID);
}

/**
 * workerExecutionParameters defines worker configure/execution options.
 */
export class workerExecutionParameters extends WorkerOptions {
  constructor(init?: Partial<workerExecutionParameters>) {
    super(init);
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  TaskList?: shared_ITaskList;

  UserContext?: Context;

  UserContextCancel?: () => void;

  WorkerStopTimeout: number = 0;

  WorkerStopChannel?: Channel<{}>;

  SessionResourceID: string = "";

}
