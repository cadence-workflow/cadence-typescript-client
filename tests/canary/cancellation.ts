import { IsCanceledError } from '../../src/internal/error.js';
import { Ref } from '../../src/internal/runtime/ref.js';
import { WithCancel, type workflow_Context } from '../../src/workflow/context.js';
import { Sleep } from '../../src/workflow/deterministic_wrappers.js';
import {
  ExecuteChildWorkflow,
  GetInfo,
} from '../../src/workflow/workflow.js';
import {
  SECOND,
  WORKFLOW_TYPE_CANCELLATION_EXTERNAL,
} from './constants.js';
import { withCanaryChildOptions } from './options.js';

export async function cancellationExternalWorkflow(
  ctx: workflow_Context,
): Promise<string> {
  await Sleep(ctx, 10 * SECOND);
  return 'not cancelled';
}

export async function cancellationWorkflow(ctx: workflow_Context): Promise<void> {
  const parentID = GetInfo(ctx).WorkflowExecution.ID;
  const [cancelCtx, cancel] = await WithCancel(ctx);
  const childCtx = withCanaryChildOptions(
    cancelCtx,
    `${parentID}/cancellation-child`,
    { WaitForCancellation: true },
  );
  const child = await ExecuteChildWorkflow(
    childCtx,
    WORKFLOW_TYPE_CANCELLATION_EXTERNAL,
  );

  await child
    .GetChildWorkflowExecution()
    .Get(childCtx, new Ref<unknown>(undefined));
  await Sleep(ctx, SECOND);
  await cancel();

  try {
    await child.Get(childCtx, new Ref<unknown>(undefined));
  } catch (error) {
    if (error instanceof Error && IsCanceledError(error)) {
      return;
    }
    throw error;
  }
  throw new Error('child workflow completed without being cancelled');
}
