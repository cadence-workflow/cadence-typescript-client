// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { internal_ContinueAsNewError, internal_GenericError, internal_PanicError, internal_TerminatedError, internal_TimeoutError, internal_UnknownExternalWorkflowExecutionError, NewContinueAsNewError as internal_NewContinueAsNewError, NewTimeoutError as internal_NewTimeoutError, NewHeartbeatTimeoutError as internal_NewHeartbeatTimeoutError } from '../internal/error.js';
import { workflow_Context } from './context.js';
import { TimeoutType as shared_TimeoutType } from '../generated/thrift/cadence-idl/com/uber/cadence/TimeoutType.js';

/**
 * ContinueAsNewError can be returned by a workflow implementation function and indicates that
 * the workflow should continue as new with the same WorkflowID, but new RunID and new history.
 */
export type workflow_ContinueAsNewError = internal_ContinueAsNewError;

/**
 * GenericError is returned from activity or child workflow when an implementations return error
 * other than from workflow.NewCustomError() API.
 */
export type workflow_GenericError = internal_GenericError;

/**
 * PanicError contains information about panicked workflow/activity.
 */
export type workflow_PanicError = internal_PanicError;

/**
 * TerminatedError returned when workflow was terminated.
 */
export type workflow_TerminatedError = internal_TerminatedError;

/**
 * TimeoutError returned when activity or child workflow timed out.
 */
export type workflow_TimeoutError = internal_TimeoutError;

/**
 * UnknownExternalWorkflowExecutionError can be returned when external workflow doesn't exist
 */
export type workflow_UnknownExternalWorkflowExecutionError = internal_UnknownExternalWorkflowExecutionError;

/**
 * NewContinueAsNewError creates ContinueAsNewError instance
 * If the workflow main function returns this error then the current execution is ended and
 * the new execution with same workflow ID is started automatically with options
 * provided to this function.
 * 
 * 	 ctx - use context to override any options for the new workflow like execution timeout, decision task timeout, task list.
 * 		  if not mentioned it would use the defaults that the current workflow is using.
 * 	       ctx := WithExecutionStartToCloseTimeout(ctx, 30 * time.Minute)
 * 	       ctx := WithWorkflowTaskStartToCloseTimeout(ctx, time.Minute)
 * 		  ctx := WithWorkflowTaskList(ctx, "example-group")
 * 	 wfn - workflow function. for new execution it can be different from the currently running.
 * 	 args - arguments for the new workflow.
 */
export async function NewContinueAsNewError(ctx: workflow_Context, wfn: unknown, ...args: unknown[]): Promise<workflow_ContinueAsNewError> {
  return await internal_NewContinueAsNewError(ctx, wfn, ...args);
}

/**
 * NewTimeoutError creates TimeoutError instance.
 * Use NewHeartbeatTimeoutError to create heartbeat TimeoutError
 * WARNING: This function is public only to support unit testing of workflows.
 * It shouldn't be used by application level code.
 */
export function NewTimeoutError(timeoutType: shared_TimeoutType, ...details: unknown[]): workflow_TimeoutError {
    return internal_NewTimeoutError(timeoutType, ...details);
}

/**
 * NewHeartbeatTimeoutError creates TimeoutError instance
 * WARNING: This function is public only to support unit testing of workflows.
 * It shouldn't be used by application level code.
 */
export function NewHeartbeatTimeoutError(...details: unknown[]): workflow_TimeoutError {
  return internal_NewHeartbeatTimeoutError(...details);
}
