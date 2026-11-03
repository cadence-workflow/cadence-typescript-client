import {
  NewClient,
  type client_Client,
  type client_Options,
  type client_StartWorkflowOptions,
} from '../../src/client/client.js';
import { CronOverlapPolicy } from '../../src/generated/thrift/cadence-idl/com/uber/cadence/CronOverlapPolicy.js';
import { EventType } from '../../src/generated/thrift/cadence-idl/com/uber/cadence/EventType.js';
import { HistoryEventFilterType } from '../../src/generated/thrift/cadence-idl/com/uber/cadence/HistoryEventFilterType.js';
import type { IDescribeWorkflowExecutionResponse } from '../../src/generated/thrift/cadence-idl/com/uber/cadence/DescribeWorkflowExecutionResponse.js';
import type { IHistoryEvent } from '../../src/generated/thrift/cadence-idl/com/uber/cadence/HistoryEvent.js';
import { internal_WorkflowIDReusePolicy } from '../../src/internal/client.js';
import { background, type Context } from '../../src/internal/runtime/context.js';
import type { WorkflowServiceClientLike } from '../../src/internal/runtime/workflow_service_client_like.js';
import { newWorkflowServiceClient } from '../../src/workflow_service_client.js';

export const DOMAIN = process.env.CADENCE_DOMAIN ?? 'default';
export const CADENCE_ADDRESS = process.env.CADENCE_ADDRESS ?? '127.0.0.1:7833';
export const SECOND = 1_000_000_000;

const terminalEventTypes = new Set<EventType>([
  EventType.WorkflowExecutionCompleted,
  EventType.WorkflowExecutionFailed,
  EventType.WorkflowExecutionTimedOut,
  EventType.WorkflowExecutionCanceled,
  EventType.WorkflowExecutionTerminated,
  EventType.WorkflowExecutionContinuedAsNew,
]);

export interface StartWorkflowInput {
  workflowID: string;
  taskList: string;
  workflowType: string;
  executionTimeoutSeconds: number;
  decisionTimeoutSeconds?: number;
  args?: unknown[];
  cronSchedule?: string;
  workflowIDReusePolicy?: internal_WorkflowIDReusePolicy;
  retryPolicy?: client_StartWorkflowOptions['RetryPolicy'];
  memo?: Record<string, unknown>;
  searchAttributes?: Record<string, unknown>;
}

export interface WorkflowExecution {
  workflowId: string;
  runId: string;
}

export interface WorkflowClientHandle {
  client: client_Client;
  context: Context;
  service: ReturnType<typeof newWorkflowServiceClient>;
  close(): void;
}

export function clientOptions(identity: string): client_Options {
  return {
    Identity: identity,
    IsolationGroup: '',
    FeatureFlags: {
      WorkflowExecutionAlreadyCompletedErrorEnabled: false,
      AutoforwardingEnabled: false,
      PollerAutoScalerEnabled: false,
      EphemeralTaskListsEnabled: false,
      MetricEmitMode: 0,
    },
  };
}

export function newWorkflowClient(
  identity = 'cadence-integration-client',
  domain = DOMAIN,
): WorkflowClientHandle {
  const service = newWorkflowServiceClient({ address: CADENCE_ADDRESS, caller: identity });
  const client = NewClient(
    service as unknown as WorkflowServiceClientLike,
    domain,
    clientOptions(identity),
  );
  return {
    client,
    context: background(),
    service,
    close: () => service.close(),
  };
}

export function clientFromService(
  service: unknown,
  domain = DOMAIN,
  identity = 'cadence-integration-client',
): client_Client {
  return NewClient(
    service as WorkflowServiceClientLike,
    domain,
    clientOptions(identity),
  );
}

export function startOptions(input: StartWorkflowInput): client_StartWorkflowOptions {
  return {
    ID: input.workflowID,
    TaskList: input.taskList,
    ExecutionStartToCloseTimeout: input.executionTimeoutSeconds * SECOND,
    DecisionTaskStartToCloseTimeout: (input.decisionTimeoutSeconds ?? 10) * SECOND,
    WorkflowIDReusePolicy:
      input.workflowIDReusePolicy
      ?? internal_WorkflowIDReusePolicy.WorkflowIDReusePolicyAllowDuplicateFailedOnly,
    RetryPolicy: input.retryPolicy,
    CronSchedule: input.cronSchedule ?? '',
    Memo: input.memo,
    SearchAttributes: input.searchAttributes,
    DelayStart: 0,
    JitterStart: 0,
    FirstRunAt: 0,
    CronOverlapPolicy: CronOverlapPolicy.SKIPPED,
  };
}

export async function startWorkflow(
  client: client_Client,
  input: StartWorkflowInput,
  ctx: Context = background(),
): Promise<WorkflowExecution> {
  const execution = await client.StartWorkflow(
    ctx,
    startOptions(input),
    input.workflowType,
    ...(input.args ?? []),
  );
  return { workflowId: execution.ID, runId: execution.RunID };
}

export async function signalWorkflow(
  client: client_Client,
  workflowID: string,
  signalName: string,
  input: unknown,
  runID = '',
  ctx: Context = background(),
): Promise<void> {
  await client.SignalWorkflow(ctx, workflowID, runID, signalName, input);
}

export async function queryWorkflow<T>(
  client: client_Client,
  workflowID: string,
  queryType: string,
  runID = '',
  args: unknown[] = [],
  ctx: Context = background(),
): Promise<T> {
  const value = await client.QueryWorkflow(ctx, workflowID, runID, queryType, ...args);
  const result = { value: undefined as T | undefined };
  value.Get(result);
  return result.value as T;
}

export async function cancelWorkflow(
  client: client_Client,
  workflowID: string,
  runID = '',
  ctx: Context = background(),
): Promise<void> {
  await client.CancelWorkflow(ctx, workflowID, runID);
}

export async function terminateWorkflow(
  client: client_Client,
  workflowID: string,
  reason: string,
  runID = '',
  ctx: Context = background(),
): Promise<void> {
  await client.TerminateWorkflow(ctx, workflowID, runID, reason, Buffer.alloc(0));
}

export async function describeWorkflow(
  client: client_Client,
  workflowID: string,
  runID = '',
  ctx: Context = background(),
): Promise<IDescribeWorkflowExecutionResponse> {
  return client.DescribeWorkflowExecution(ctx, workflowID, runID);
}

export async function getAllEvents(
  client: client_Client,
  workflowID: string,
  runID = '',
  ctx: Context = background(),
): Promise<IHistoryEvent[]> {
  const runtimeClient = client as unknown as {
    workflowService: WorkflowServiceClientLike;
    domain: string;
  };
  const events: IHistoryEvent[] = [];
  let nextPageToken: Buffer | undefined;
  do {
    const response = await runtimeClient.workflowService.GetWorkflowExecutionHistory(ctx, {
      domain: runtimeClient.domain,
      execution: {
        workflowId: workflowID,
        ...(runID === '' ? {} : { runId: runID }),
      },
      maximumPageSize: 1_000,
      waitForNewEvent: false,
      HistoryEventFilterType: HistoryEventFilterType.ALL_EVENT,
      skipArchival: true,
      ...(nextPageToken === undefined ? {} : { nextPageToken }),
    });
    events.push(...(response.history?.events ?? []));
    nextPageToken =
      response.nextPageToken !== undefined && response.nextPageToken.length > 0
        ? response.nextPageToken
        : undefined;
  } while (nextPageToken !== undefined);
  return events;
}

export function hasEvent(events: IHistoryEvent[], eventType: EventType): boolean {
  return events.some((event) => event.eventType === eventType);
}

export function hasTerminalEvent(events: IHistoryEvent[]): boolean {
  return events.some(
    (event) => event.eventType !== undefined && terminalEventTypes.has(event.eventType),
  );
}

export async function showWorkflow(
  client: client_Client,
  workflowID: string,
  runID = '',
  ctx: Context = background(),
): Promise<string> {
  return formatHistory(await getAllEvents(client, workflowID, runID, ctx));
}

export function formatHistory(events: IHistoryEvent[]): string {
  return events
    .map((event) => {
      const eventName =
        event.eventType === undefined ? 'UnknownEvent' : EventType[event.eventType];
      return `${eventName} ${JSON.stringify(toPrintable(event))}`;
    })
    .join('\n');
}

function toPrintable(value: unknown, seen = new WeakSet<object>()): unknown {
  if (Buffer.isBuffer(value)) {
    const utf8 = value.toString('utf8');
    return { utf8, base64: value.toString('base64') };
  }
  if (value instanceof Uint8Array) {
    const buffer = Buffer.from(value);
    return { utf8: buffer.toString('utf8'), base64: buffer.toString('base64') };
  }
  if (Array.isArray(value)) {
    return value.map((entry) => toPrintable(entry, seen));
  }
  if (value === null || typeof value !== 'object') {
    return value;
  }
  if (seen.has(value)) {
    return '[Circular]';
  }
  seen.add(value);
  const printable: Record<string, unknown> = {};
  for (const [key, entry] of Object.entries(value)) {
    printable[key] = toPrintable(entry, seen);
  }
  return printable;
}
