// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { internal_FeatureFlags, newChannelContext, workflowTypePtr } from './internal_utils.js';
import { activityWorker, verifyDomainExist, ensureRequiredParams, newActivityWorker, tagScope, workerExecutionParameters } from './internal_worker.js';
import { registry } from './registry.js';
import { internal_ShadowOptions, internal_ShadowMode_toThriftPtr } from './workflow_shadower.js';
import type { WorkflowServiceClientLike } from './runtime/workflow_service_client_like.js';
import { background, withValue } from './runtime/context.js';
import { errTaskListNotSet } from './workflow.js';
import { StringPtr, Float64Ptr, Int32Ptr } from './common/convert.js';
import { getDefaultDataConverter } from './encoded.js';
import { tagTaskList } from './internal_logging_tags.js';
import { NewWorkflowReplayerWithOptions } from './workflow_replayer.js';
import { replayWorkflowActivity, scanWorkflowActivity, serviceClientContextKey, workflowReplayerContextKey } from './workflow_shadower_activities.js';
import { TaskList } from '../generated/thrift/cadence-idl/com/uber/cadence/TaskList.js';
import { trace } from '@opentelemetry/api';
import { Retry } from './common/backoff/retry.js';
import { createDynamicServiceRetryPolicy, isServiceTransientError } from './internal_retry.js';
import { getValidatedWorkflowFunction } from './internal_workflow.js';
import { StartWorkflowExecutionRequest } from '../generated/thrift/cadence-idl/com/uber/cadence/StartWorkflowExecutionRequest.js';
import { WorkflowIdReusePolicy } from '../generated/thrift/cadence-idl/com/uber/cadence/WorkflowIdReusePolicy.js';
import { WorkflowParams } from '../generated/thrift/cadence-idl/com/uber/cadence/shadower/WorkflowParams.js';
import { LocalDomainName as shadower_LocalDomainName, ReplayWorkflowActivityName as shadower_ReplayWorkflowActivityName, ScanWorkflowActivityName as shadower_ScanWorkflowActivityName, TaskList as shadower_TaskList, WorkflowIDSuffix as shadower_WorkflowIDSuffix, WorkflowName as shadower_WorkflowName } from '../generated/thrift/cadence-idl/com/uber/cadence/shadower/constants.js';
import { WorkflowExecutionAlreadyStartedError } from '../errors/idl_errors.js';
import { Logger } from 'winston';

export class shadowWorker {
  constructor(init?: Partial<shadowWorker>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  activityWorker?: activityWorker;

  service?: WorkflowServiceClientLike;

  domain: string = "";

  taskList: string = "";

  options: internal_ShadowOptions = new internal_ShadowOptions();

  logger?: Logger;

  featureFlags: internal_FeatureFlags = { WorkflowExecutionAlreadyCompletedErrorEnabled: false, AutoforwardingEnabled: false, PollerAutoScalerEnabled: false, EphemeralTaskListsEnabled: false, MetricEmitMode: 0 };

  async Start(): Promise<void> {
    this.options.validateAndPopulateFields();

    await verifyDomainExist(this.service!, this.domain, this.logger!, this.featureFlags);

    if (this.taskList.length === 0) {
      throw errTaskListNotSet;
    }

    await this.startShadowWorkflow();

    await this.activityWorker!.Start();
  }

  async Stop(): Promise<void> {
    await this.activityWorker!.Stop();
  }

  async startShadowWorkflow(): Promise<void> {
    const workflowParams = new WorkflowParams({
      domain: StringPtr(this.domain),
      taskList: StringPtr(this.taskList),
      workflowQuery: StringPtr(this.options.WorkflowQuery),
      samplingRate: Float64Ptr(this.options.SamplingRate),
      shadowMode: internal_ShadowMode_toThriftPtr(this.options.Mode),
      exitCondition: this.options.ExitCondition.toThriftPtr(),
      concurrency: Int32Ptr(Math.trunc(this.options.Concurrency)),
    });

    const ctx = background();

    const [workflowType, input] = await getValidatedWorkflowFunction(
      shadower_WorkflowName,
      [workflowParams],
      getDefaultDataConverter(),
      undefined,
    );

    const startWorkflowRequest = new StartWorkflowExecutionRequest({
      domain: StringPtr(shadower_LocalDomainName),
      workflowId: StringPtr(this.domain + shadower_WorkflowIDSuffix),
      workflowType: workflowTypePtr(workflowType),
      taskList: new TaskList({
        name: StringPtr(shadower_TaskList),
      }),
      input,
      executionStartToCloseTimeoutSeconds: Int32Ptr(864000),
      taskStartToCloseTimeoutSeconds: Int32Ptr(60),
      requestId: StringPtr(globalThis.crypto.randomUUID()),
      workflowIdReusePolicy: WorkflowIdReusePolicy.AllowDuplicate,
    });

    const startWorkflowOp = async (): Promise<void> => {
      const [tchCtx, cancel, opt] = newChannelContext(ctx, this.featureFlags);
      try {
        await this.service!.StartWorkflowExecution(tchCtx, startWorkflowRequest, ...opt);
      } catch (err) {
        if (!(err instanceof Error)) {
          throw err;
        }
        if (err instanceof WorkflowExecutionAlreadyStartedError) {
          return;
        }
        throw err;
      } finally {
        cancel();
      }
    };

    await Retry(ctx, startWorkflowOp, createDynamicServiceRetryPolicy(ctx), isServiceTransientError);
  }

}

export function generateShadowTaskList(domain: string, taskList: string): string {
  return domain + "-" + taskList;
}

export async function newShadowWorker(service: WorkflowServiceClientLike, domain: string, shadowOptions: internal_ShadowOptions, params: workerExecutionParameters, registry: registry): Promise<shadowWorker> {
  await registry.RegisterActivityWithOptions(scanWorkflowActivity, {
    Name: shadower_ScanWorkflowActivityName,
    DisableAlreadyRegisteredCheck: false,
    EnableAutoHeartbeat: false,
    EnableShortName: false,
  });
  await registry.RegisterActivityWithOptions(replayWorkflowActivity, {
    Name: shadower_ReplayWorkflowActivityName,
    EnableAutoHeartbeat: true,
    DisableAlreadyRegisteredCheck: false,
    EnableShortName: false,
  });

  const replayer = NewWorkflowReplayerWithOptions({
    DataConverter: params.DataConverter,
    ContextPropagators: params.ContextPropagators,
    WorkflowInterceptorChainFactories: params.WorkflowInterceptorChainFactories,
    Tracer: params.Tracer,
    FeatureFlags: params.FeatureFlags,
  });
  replayer.registry = registry;

  ensureRequiredParams(params);
  if ((params.TaskList!.name ?? "") !== "") {
    params.TaskList = new TaskList({
      name: StringPtr(generateShadowTaskList(domain, params.TaskList!.name ?? "")),
      kind: params.TaskList!.kind,
    });
    params.MetricsScope = tagScope(params.MetricsScope!, tagTaskList, params.TaskList!.name ?? "");
    params.Logger = params.Logger!.child({ [tagTaskList]: params.TaskList!.name ?? "" });
  }

  params.UserContext = withValue(params.UserContext!, serviceClientContextKey, service);
  params.UserContext = withValue(params.UserContext, workflowReplayerContextKey, replayer);

  params.DataConverter = getDefaultDataConverter();
  params.WorkflowInterceptorChainFactories = [];
  params.ContextPropagators = [];
  params.Tracer = trace.getTracer('noop');

  const activityWorker = newActivityWorker(
    service,
    shadower_LocalDomainName,
    params,
    undefined,
    registry,
    undefined,
  );

  return new shadowWorker({
    activityWorker,
    service,
    domain,
    taskList: params.TaskList!.name ?? "",
    options: shadowOptions,
    logger: params.Logger,
    featureFlags: params.FeatureFlags,
  });
}
