import type { client_Client } from '../../src/client/client.js';
import type { Context } from '../../src/internal/runtime/context.js';
import { background } from '../../src/internal/runtime/context.js';
import { Ref } from '../../src/internal/runtime/ref.js';
import type { workflow_Context } from '../../src/workflow/context.js';
import {
  ExecuteActivity,
  ExecuteChildWorkflow,
  GetInfo,
  GetSignalChannel,
  SignalExternalWorkflow,
  type workflow_ChildWorkflowFuture,
} from '../../src/workflow/workflow.js';
import {
  ACTIVITY_TYPE_SIGNAL,
  WORKFLOW_TYPE_SIGNAL_EXTERNAL,
} from './constants.js';
import {
  withCanaryActivityOptions,
  withCanaryChildOptions,
} from './options.js';

export const CANARY_SIGNAL_NAME = 'canary-signal';
export const CANARY_SIGNAL_VALUE = 'canary.signal';

export type SignalParentActivity = (
  ctx: Context,
  workflowID: string,
  runID: string,
  signalName: string,
) => Promise<boolean>;

export function createSignalParentActivity(client: client_Client): SignalParentActivity {
  return async function signalParentActivity(
    _ctx: Context,
    workflowID: string,
    runID: string,
    signalName: string,
  ): Promise<boolean> {
    const ctx = background();
    await client.SignalWorkflow(
      ctx,
      workflowID,
      runID,
      signalName,
      CANARY_SIGNAL_VALUE,
    );
    await client.SignalWorkflow(
      ctx,
      workflowID,
      '',
      signalName,
      CANARY_SIGNAL_VALUE,
    );
    return true;
  };
}

export async function signalExternalWorkflow(ctx: workflow_Context): Promise<string> {
  const signalChannel = GetSignalChannel(ctx, CANARY_SIGNAL_NAME);
  const signal = new Ref<string | undefined>(undefined);
  await signalChannel.Receive(ctx, signal);

  if (signal.value !== CANARY_SIGNAL_VALUE) {
    throw new Error(`unexpected signal value: ${JSON.stringify(signal.value)}`);
  }
  return signal.value;
}

export async function signalWorkflow(ctx: workflow_Context): Promise<void> {
  const info = GetInfo(ctx);
  const activityCtx = withCanaryActivityOptions(ctx);
  const signalParent = await ExecuteActivity(
    activityCtx,
    ACTIVITY_TYPE_SIGNAL,
    info.WorkflowExecution.ID,
    info.WorkflowExecution.RunID,
    CANARY_SIGNAL_NAME,
  );
  const signaled = new Ref<boolean | undefined>(undefined);
  await signalParent.Get(activityCtx, signaled);
  if (signaled.value !== true) {
    throw new Error('signal activity did not confirm delivery');
  }

  const parentSignals: string[] = [];
  const signalChannel = GetSignalChannel(ctx, CANARY_SIGNAL_NAME);
  for (let index = 0; index < 2; index++) {
    const signal = new Ref<string | undefined>(undefined);
    await signalChannel.Receive(ctx, signal);
    if (signal.value !== undefined) {
      parentSignals.push(signal.value);
    }
  }
  if (
    parentSignals.length !== 2
    || parentSignals.some((value) => value !== CANARY_SIGNAL_VALUE)
  ) {
    throw new Error(`unexpected parent signals: ${JSON.stringify(parentSignals)}`);
  }

  await signalChild(
    ctx,
    `${info.WorkflowExecution.ID}/signal-child`,
    'child-handle',
  );
  await signalChild(
    ctx,
    `${info.WorkflowExecution.ID}/signal-external-without-run-id`,
    'external-without-run-id',
  );
  await signalChild(
    ctx,
    `${info.WorkflowExecution.ID}/signal-external-with-run-id`,
    'external-with-run-id',
  );
}

type SignalMode =
  | 'child-handle'
  | 'external-without-run-id'
  | 'external-with-run-id';

async function signalChild(
  ctx: workflow_Context,
  workflowID: string,
  mode: SignalMode,
): Promise<void> {
  const childCtx = withCanaryChildOptions(ctx, workflowID);
  const child = await ExecuteChildWorkflow(childCtx, WORKFLOW_TYPE_SIGNAL_EXTERNAL);

  if (mode === 'child-handle') {
    const signal = await child.SignalChildWorkflow(
      childCtx,
      CANARY_SIGNAL_NAME,
      CANARY_SIGNAL_VALUE,
    );
    await signal.Get(childCtx, new Ref<unknown>(undefined));
  } else {
    const execution = await childExecution(childCtx, child);
    const runID = mode === 'external-with-run-id' ? execution.RunID : '';
    const signal = SignalExternalWorkflow(
      childCtx,
      execution.ID,
      runID,
      CANARY_SIGNAL_NAME,
      CANARY_SIGNAL_VALUE,
    );
    await signal.Get(childCtx, new Ref<unknown>(undefined));
  }

  const result = new Ref<string | undefined>(undefined);
  await child.Get(childCtx, result);
  if (result.value !== CANARY_SIGNAL_VALUE) {
    throw new Error(`unexpected child signal result: ${JSON.stringify(result.value)}`);
  }
}

async function childExecution(
  ctx: workflow_Context,
  child: workflow_ChildWorkflowFuture,
): Promise<{ ID: string; RunID: string }> {
  const execution = new Ref<{ ID: string; RunID: string } | undefined>(undefined);
  await child.GetChildWorkflowExecution().Get(ctx, execution);
  if (execution.value === undefined) {
    throw new Error('child workflow did not start');
  }
  return execution.value;
}
