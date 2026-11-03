// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { encoded_DataConverter } from '../encoded/encoded.js';
import { workflow_Context } from './context.js';
import { workflow_ChildWorkflowOptions, GetInfo } from './workflow.js';
import { GetWorkflowTaskList as internal_GetWorkflowTaskList, WithChildWorkflowOptions, WithExecutionStartToCloseTimeout as internal_WithExecutionStartToCloseTimeout, WithWorkflowTaskList as internal_WithWorkflowTaskList, WithWorkflowID as internal_WithWorkflowID, WithWorkflowDomain as internal_WithWorkflowDomain, WithWorkflowTaskStartToCloseTimeout as internal_WithWorkflowTaskStartToCloseTimeout, WithDataConverter as internal_WithDataConverter } from '../internal/workflow.js';

/**
 * WithChildOptions adds all workflow options to the context.
 */
export function WithChildOptions(ctx: workflow_Context, cwo: workflow_ChildWorkflowOptions): workflow_Context {
    return WithChildWorkflowOptions(ctx, cwo);
}

/**
 * WithWorkflowDomain adds a domain to the context.
 */
export function WithWorkflowDomain(ctx: workflow_Context, name: string): workflow_Context {
  return internal_WithWorkflowDomain(ctx, name);
}

/**
 * WithWorkflowTaskList adds a task list to the context.
 */
export function WithWorkflowTaskList(ctx: workflow_Context, name: string): workflow_Context {
	return internal_WithWorkflowTaskList(ctx, name);
}

/**
 * GetWorkflowTaskList returns tasklist in the Context's current ChildWorkflowOptions
 * or workflow.GetInfo(ctx).TaskListName if not set or empty.
 */
export function GetWorkflowTaskList(ctx: workflow_Context): string {
  const tl = internal_GetWorkflowTaskList(ctx);
  if (tl != null && tl !== "") {
    return tl;
  }
  return GetInfo(ctx).TaskListName;
}

/**
 * WithWorkflowID adds a workflowID to the context.
 */
export function WithWorkflowID(ctx: workflow_Context, workflowID: string): workflow_Context {
	return internal_WithWorkflowID(ctx, workflowID)
}

/**
 * WithExecutionStartToCloseTimeout adds a workflow execution timeout to the context.
 */
export function WithExecutionStartToCloseTimeout(ctx: workflow_Context, d: number): workflow_Context {
  return internal_WithExecutionStartToCloseTimeout(ctx, d);
}

/**
 * WithWorkflowTaskStartToCloseTimeout adds a decision timeout to the context.
 */
export function WithWorkflowTaskStartToCloseTimeout(ctx: workflow_Context, d: number): workflow_Context {
    return internal_WithWorkflowTaskStartToCloseTimeout(ctx, d);
}

/**
 * WithDataConverter adds DataConverter to the context.
 */
export function WithDataConverter(ctx: workflow_Context, dc: encoded_DataConverter): workflow_Context {
	return internal_WithDataConverter(ctx, dc)
}
