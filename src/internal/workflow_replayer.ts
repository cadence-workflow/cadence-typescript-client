import { TaskList as shared_TaskList } from '../generated/thrift/cadence-idl/com/uber/cadence/TaskList.js';
import { PollForDecisionTaskResponse as shared_PollForDecisionTaskResponse } from '../generated/thrift/cadence-idl/com/uber/cadence/PollForDecisionTaskResponse.js';
import { Int64 } from '@creditkarma/thrift-server-core';
import { WorkflowExecution as shared_WorkflowExecution } from '../generated/thrift/cadence-idl/com/uber/cadence/WorkflowExecution.js';
import { GetWorkflowExecutionHistoryRequest as shared_GetWorkflowExecutionHistoryRequest } from '../generated/thrift/cadence-idl/com/uber/cadence/GetWorkflowExecutionHistoryRequest.js';
import { NewGoMockClient, NewGoMockController } from './runtime/gomock.js';
import { NoopLogger } from './runtime/logging.js';
import { NewTracingContextPropagator } from './tracer.js';
import { trace } from '@opentelemetry/api';
import { closeSync, openSync, readFileSync } from 'fs';
import { newWorkflowTaskHandler, workflowTask } from './internal_task_handlers.js';
import { historyIteratorImpl } from './internal_task_pollers.js';
import { DecisionType } from '../generated/thrift/cadence-idl/com/uber/cadence/DecisionType.js';
import { EventType } from '../generated/thrift/cadence-idl/com/uber/cadence/EventType.js';
import { TaskListKind } from '../generated/thrift/cadence-idl/com/uber/cadence/TaskListKind.js';
import { NoopScope } from './runtime/tally.js';
// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { RegisterActivityOptions, RegistryActivityInfo } from './activity.js';
import { internal_DataConverter } from './encoded.js';
import { internal_ContextPropagator } from './headers.js';
import { internal_WorkflowInterceptorFactory } from './interceptors.js';
import { internal_FeatureFlags, newChannelContext } from './internal_utils.js';
import { registry, newRegistry } from './registry.js';
import { internal_ActivityRegistry, internal_Registry, internal_WorkflowRegistry, workerExecutionParameters } from './worker.js';
import { RegisterWorkflowOptions, RegistryWorkflowInfo, internal_WorkflowExecution } from './workflow.js';
import type { WorkflowServiceClientLike } from './runtime/workflow_service_client_like.js';
import { Context } from './runtime/context.js';
import { IHistory as shared_IHistory, History as shared_History } from '../generated/thrift/cadence-idl/com/uber/cadence/History.js';
import { Retry } from './common/backoff/retry.js';
import { StringPtr } from './common/convert.js';
import { DeserializeBlobDataToHistoryEvents } from './common/serializer/history_serializer.js';
import { createDynamicServiceRetryPolicy, isServiceTransientError } from './internal_retry.js';
import { HistoryEventFilterType } from '../generated/thrift/cadence-idl/com/uber/cadence/HistoryEventFilterType.js';
import { IGetWorkflowExecutionHistoryResponse as shared_IGetWorkflowExecutionHistoryResponse } from '../generated/thrift/cadence-idl/com/uber/cadence/GetWorkflowExecutionHistoryResponse.js';
import { InternalServiceError as shared_InternalServiceError } from '../errors/idl_errors.js';
import { DecodeThriftJSON } from './runtime/idl_json.js';
import { Logger } from 'winston';

/**
 * ReplayOptions is used to configure the replay decision task worker.
 */
export interface internal_ReplayOptions {
  DataConverter?: internal_DataConverter;
  WorkflowInterceptorChainFactories?: internal_WorkflowInterceptorFactory[];
  ContextPropagators?: internal_ContextPropagator[];
  Tracer?: unknown;
  FeatureFlags: internal_FeatureFlags;
}

/**
 * WorkflowReplayer is used to replay workflow code from an event history
 */
export class internal_WorkflowReplayer implements internal_ActivityRegistry, internal_Registry, internal_WorkflowRegistry {
  constructor(init?: Partial<internal_WorkflowReplayer>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  registry?: registry;

  options: internal_ReplayOptions = { FeatureFlags: { WorkflowExecutionAlreadyCompletedErrorEnabled: false, AutoforwardingEnabled: false, PollerAutoScalerEnabled: false, EphemeralTaskListsEnabled: false, MetricEmitMode: 0 } };

  async RegisterWorkflow(w: unknown): Promise<void> {
    await this.registry!.RegisterWorkflow(w);
  }

  async RegisterWorkflowWithOptions(w: unknown, options: RegisterWorkflowOptions): Promise<void> {
    await this.registry!.RegisterWorkflowWithOptions(w, options);
  }

  async RegisterActivity(a: unknown): Promise<void> {
    await this.registry!.RegisterActivity(a);
  }

  async RegisterActivityWithOptions(a: unknown, options: RegisterActivityOptions): Promise<void> {
    await this.registry!.RegisterActivityWithOptions(a, options);
  }

  async GetRegisteredWorkflows(): Promise<RegistryWorkflowInfo[]> {
    const workflows = await this.registry!.GetRegisteredWorkflows();
    const result: RegistryWorkflowInfo[] = [];
    for (const wf of workflows) {
      result.push(wf);
    }
    return result;
  }

  async GetRegisteredActivities(): Promise<RegistryActivityInfo[]> {
    const activities = await this.registry!.getRegisteredActivities();
    const result: RegistryActivityInfo[] = [];
    for (const a of activities) {
      result.push(a);
    }
    return result;
  }

  async ReplayWorkflowHistoryFromJSON(logger: Logger, reader: Buffer): Promise<void> {
    await this.ReplayPartialWorkflowHistoryFromJSON(logger, reader, 0);
  }

  async ReplayWorkflowHistoryFromJSONFile(logger: Logger, jsonfileName: string): Promise<void> {
    await this.ReplayPartialWorkflowHistoryFromJSONFile(logger, jsonfileName, 0);
  }

  async ReplayPartialWorkflowHistoryFromJSONFile(logger: Logger, jsonfileName: string, lastEventID: number): Promise<void> {
      let file: number;
      try {
          file = openSync(jsonfileName, "r");
      } catch (err) {
          if (!(err instanceof Error)) throw err;
          throw new globalThis.Error("could not open file: " + err.message, { cause: err });
      }

      try {
          const reader = readFileSync(file);
          await this.ReplayPartialWorkflowHistoryFromJSON(logger, reader, lastEventID);
      } finally {
          try {
              closeSync(file);
          } catch (err) {
              if (!(err instanceof Error)) throw err;
          }
      }
  }

  async ReplayWorkflowExecution(ctx: Context, service: WorkflowServiceClientLike, logger: Logger, domain: string, execution: internal_WorkflowExecution): Promise<void> {
      const sharedExecution = new shared_WorkflowExecution({
          runId: StringPtr(execution.RunID),
          workflowId: StringPtr(execution.ID),
      });
      const request = new shared_GetWorkflowExecutionHistoryRequest({
          domain: StringPtr(domain),
          execution: sharedExecution,
      });

      let hResponse!: shared_IGetWorkflowExecutionHistoryResponse;
      await Retry(
          ctx,
          async (): Promise<void> => {
              const [tchCtx, cancel, opt] = newChannelContext(ctx, this.options.FeatureFlags);
              try {
                  hResponse = await service.GetWorkflowExecutionHistory(tchCtx, request, ...opt);
              } finally {
                  cancel();
              }
          },
          createDynamicServiceRetryPolicy(ctx),
          (err: Error | null): boolean => {
              if (err instanceof shared_InternalServiceError) {
                  return false;
              }
              return isServiceTransientError(err);
          },
      );

      if (!hResponse) {
          throw new Error('workflow execution history response is nil');
      }

      if (hResponse.rawHistory != null) {
          const history = DeserializeBlobDataToHistoryEvents(
              hResponse.rawHistory!,
              HistoryEventFilterType.ALL_EVENT,
          );
          hResponse.history = history;
      }

      await this.replayWorkflowHistory(
          logger,
          service,
          domain,
          execution,
          hResponse.history!,
          hResponse.nextPageToken!,
      );
  }

  async replayWorkflowHistory(logger: Logger | undefined, service: WorkflowServiceClientLike, domain: string, execution: internal_WorkflowExecution | undefined, history: shared_IHistory, nextPageToken: Buffer | undefined): Promise<void> {
      const events = history.events;
      if (events == null) {
          throw errReplayEmptyHistory;
      }
      if (events.length < 3) {
          throw errReplayHistoryTooShort;
      }
      const first = events[0];
      if (first.eventType !== EventType.WorkflowExecutionStarted) {
          throw errReplayInvalidFirstEvent;
      }
      const last = events[events.length - 1];

      const attr = first.workflowExecutionStartedEventAttributes;
      if (attr == null) {
          throw errReplayCorruptedStartedEvent;
      }
      const workflowType = attr.workflowType!;
      if (execution == null) {
          execution = {
              ID: replayWorkflowID,
              RunID: globalThis.crypto.randomUUID(),
          };
          if ((first.workflowExecutionStartedEventAttributes?.originalExecutionRunId ?? "") !== "") {
              execution.RunID = first.workflowExecutionStartedEventAttributes!.originalExecutionRunId!;
          }
      }

      const task = new shared_PollForDecisionTaskResponse({
          attempt: new Int64(attr.attempt ?? 0),
          taskToken: Buffer.from(replayTaskToken),
          workflowType,
          workflowExecution: new shared_WorkflowExecution({
              workflowId: StringPtr(execution.ID),
              runId: StringPtr(execution.RunID!),
          }),
          history: new shared_History({ events }),
          previousStartedEventId: new Int64(replayPreviousStartedEventID),
          nextPageToken,
      });
      if (logger == null) {
          logger = NoopLogger();
      }

      const workerParams = new workerExecutionParameters({
          Identity: replayWorkerIdentity,
          DataConverter: this.options.DataConverter,
          ContextPropagators: this.options.ContextPropagators ?? [],
          WorkflowInterceptorChainFactories: this.options.WorkflowInterceptorChainFactories ?? [],
          Tracer: this.options.Tracer,
          Logger: logger,
          DisableStickyExecution: true,
          TaskList: new shared_TaskList({
              name: StringPtr(replayTaskListName),
              kind: TaskListKind.NORMAL,
          }),
          SessionResourceID: "",
          WorkerStopTimeout: 0,
      });

      const metricScope = NoopScope;
      const iterator = new historyIteratorImpl({
          nextPageToken: task.nextPageToken,
          execution: task.workflowExecution,
          domain,
          service,
          metricsScope: metricScope,
          startedEventID: task.startedEventId?.toNumber() ?? 0,
          featureFlags: this.options.FeatureFlags,
          maxEventID: 0,
      });
      const taskHandler = newWorkflowTaskHandler(domain, workerParams, undefined, this.registry!);
      const resp = await taskHandler.ProcessWorkflowTask(new workflowTask({
          task,
          historyIterator: iterator,
      }), undefined);

      if (last.eventType !== EventType.WorkflowExecutionCompleted) {
          return;
      }

      if (resp != null && typeof resp === "object" && "decisions" in resp) {
          const completeReq = resp as { decisions?: Array<{ decisionType?: DecisionType; completeWorkflowExecutionDecisionAttributes?: { result?: Buffer } }> };
          for (const d of completeReq.decisions ?? []) {
              if (d.decisionType === DecisionType.CompleteWorkflowExecution &&
                  last.eventType === EventType.WorkflowExecutionCompleted) {
                  const resultA = last.workflowExecutionCompletedEventAttributes!.result;
                  const resultB = d.completeWorkflowExecutionDecisionAttributes!.result;
                  if (Buffer.compare(resultA ?? Buffer.alloc(0), resultB ?? Buffer.alloc(0)) === 0) {
                      return;
                  }
              }
          }
      }

      const formatValue = (value: unknown): string =>
          value instanceof Error
              ? value.message
              : typeof (value as { String?: unknown }).String === "function"
                  ? (value as { String(): string }).String()
                  : globalThis.String(value);

      throw new Error(`replay workflow doesn't return the same result as the last event, resp: ${formatValue(resp)}, last: ${formatValue(last)}`);
  }

  async ReplayWorkflowHistory(logger: Logger | undefined, history: shared_IHistory): Promise<void> {
      if (logger == null) {
          logger = NoopLogger();
      }

      const testReporter = logger;
      const controller = NewGoMockController(testReporter);
      const service = NewGoMockClient(controller);

      await this.replayWorkflowHistory(logger, service, replayDomainName, undefined, history, undefined);
  }

  async ReplayPartialWorkflowHistoryFromJSON(logger: Logger | undefined, reader: Buffer, lastEventID: number): Promise<void> {
      const history = extractHistoryFromReader(reader, lastEventID);

      if (logger == null) {
          logger = NoopLogger();
      }

      const controller = NewGoMockController(logger);
      const service = NewGoMockClient(controller);

      await this.replayWorkflowHistory(logger, service, replayDomainName, undefined, history, undefined);
  }

}

/**
 * IsReplayDomain checks if the domainName is from replay
 */
export function IsReplayDomain(dn: string): boolean {
  return replayDomainName === dn;
}

/**
 * NewWorkflowReplayer creates an instance of the WorkflowReplayer
 */
export function NewWorkflowReplayer(): internal_WorkflowReplayer {
  return NewWorkflowReplayerWithOptions({
    FeatureFlags: {
      WorkflowExecutionAlreadyCompletedErrorEnabled: false,
      AutoforwardingEnabled: false,
      PollerAutoScalerEnabled: false,
      EphemeralTaskListsEnabled: false,
      MetricEmitMode: 0,
    },
  });
}

/**
 * NewWorkflowReplayerWithOptions creates an instance of the WorkflowReplayer
 * with provided replay worker options
 */
export function NewWorkflowReplayerWithOptions(options: internal_ReplayOptions): internal_WorkflowReplayer {
  augmentReplayOptions(options);
  return new internal_WorkflowReplayer({
    registry: newRegistry(),
    options,
  });
}

export function extractHistoryFromReader(r: Buffer, lastEventID: number): shared_IHistory {
    const raw = r;

    let deserializedEvents: Array<shared_IHistory['events'] extends Array<infer T> | undefined ? T : never>;
    try {
        deserializedEvents = DecodeThriftJSON(
            'HistoryEvent',
            JSON.parse(raw.toString('utf8')),
        );
    } catch (err) {
        if (!(err instanceof Error)) throw err;
        throw new globalThis.Error(
            'invalid json contents: ' + err.message,
            { cause: err },
        );
    }

    if (lastEventID <= 0) {
        return new shared_History({ events: deserializedEvents });
    }

    const events: typeof deserializedEvents = [];
    for (const event of deserializedEvents) {
        events.push(event);
        if ((event.eventId?.toNumber() ?? 0) === lastEventID) {
            break;
        }
    }

    return new shared_History({ events });
}

export function augmentReplayOptions(options: internal_ReplayOptions): void {
  if (options.Tracer != null) {
    options.ContextPropagators!.push(
      NewTracingContextPropagator(NoopLogger(), options.Tracer!),
    );
  } else {
    options.Tracer = trace.getTracer('noop');
  }
}

export const replayDomainName = "ReplayDomain";

export const replayPreviousStartedEventID = 9223372036854774784;

export const replayTaskListName = "ReplayTaskList";

export const replayTaskToken = "ReplayTaskToken";

export const replayWorkerIdentity = "replayID";

export const replayWorkflowID = "ReplayId";

export let errReplayEmptyHistory = new Error("empty events");

export let errReplayHistoryTooShort = new Error("at least 3 events expected in the history");

export let errReplayInvalidFirstEvent = new Error("first event is not WorkflowExecutionStarted");

export let errReplayCorruptedStartedEvent = new Error("corrupted WorkflowExecutionStarted");
