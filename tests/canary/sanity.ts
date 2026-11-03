import { Ref } from '../../src/internal/runtime/ref.js';
import type { workflow_Context } from '../../src/workflow/context.js';
import {
  ExecuteChildWorkflow,
  GetInfo,
  SideEffect,
  type workflow_ChildWorkflowFuture,
} from '../../src/workflow/workflow.js';
import {
  DEFAULT_SANITY_CHILD_WORKFLOWS,
} from './constants.js';
import { withCanaryChildOptions } from './options.js';

interface RunningChild {
  workflowType: string;
  ctx: workflow_Context;
  future: workflow_ChildWorkflowFuture;
}

interface ChildFailure {
  workflowType: string;
  error: unknown;
}

export async function sanityWorkflow(ctx: workflow_Context): Promise<void> {
  const parentID = GetInfo(ctx).WorkflowExecution.ID;
  const encodedChildWorkflows = await SideEffect(
    ctx,
    () => [...DEFAULT_SANITY_CHILD_WORKFLOWS],
  );
  const childWorkflows = new Ref<string[] | undefined>(undefined);
  encodedChildWorkflows.Get(childWorkflows);
  if (childWorkflows.value === undefined) {
    throw new Error('sanity child workflow side effect returned no value');
  }

  const runningChildren: RunningChild[] = [];
  for (const workflowType of childWorkflows.value) {
    const childCtx = withCanaryChildOptions(
      ctx,
      `${parentID}/${workflowType}`,
    );
    runningChildren.push({
      workflowType,
      ctx: childCtx,
      future: await ExecuteChildWorkflow(childCtx, workflowType),
    });
  }

  const failures: ChildFailure[] = [];
  for (const child of runningChildren) {
    try {
      await child.future.Get(child.ctx, null);
    } catch (error) {
      failures.push({ workflowType: child.workflowType, error });
    }
  }

  if (failures.length > 0) {
    const details = failures
      .map(({ workflowType, error }) => `${workflowType}: ${formatError(error)}`)
      .join('; ');
    throw new Error(`sanity child workflows failed: ${details}`);
  }
}

function formatError(error: unknown): string {
  if (error instanceof Error) {
    return `${error.constructor.name}: ${error.message}`;
  }
  return `${typeof error}: ${String(error)}`;
}
