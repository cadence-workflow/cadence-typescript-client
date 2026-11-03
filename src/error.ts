// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { internal_CanceledError, internal_CustomError, internal_NonDeterministicError, ErrNoData as internal_ErrNoData, internal_PanicError, internal_TerminatedError, NewCanceledError as internal_NewCanceledError, internal_TimeoutError, internal_GenericError, NewCustomError as internal_NewCustomError } from './internal/error.js';
import { WorkflowExecutionAlreadyStartedError } from './errors/idl_errors.js';

/**
 * CanceledError returned when operation was canceled.
 */
export type cadence_CanceledError = internal_CanceledError;

/**
 * CustomError returned from workflow and activity implementations with reason and optional details.
 */
export type cadence_CustomError = internal_CustomError;

/**
 * NonDeterministicError is returned when a workflow's replay was non-deterministic, and it could not be resumed safely.
 */
export type cadence_NonDeterministicError = internal_NonDeterministicError;

/**
 * NewCustomError create new instance of *CustomError with reason and optional details.
 * Use CustomError for any use case specific errors that cross activity and child workflow boundaries.
 */
export function NewCustomError(reason: string, ...details: unknown[]): cadence_CustomError {
    return internal_NewCustomError(reason, ...details);
}

/**
 * NewCanceledError creates CanceledError instance.
 * Return this error from activity or child workflow to indicate that it was successfully cancelled.
 */
export function NewCanceledError(...details: unknown[]): cadence_CanceledError {
  return internal_NewCanceledError(...details);
}

/**
 * IsCustomError return if the err is a CustomError
 */
export function IsCustomError(err: Error | null): boolean {
  return err instanceof internal_CustomError;
}

/**
 * IsWorkflowExecutionAlreadyStartedError return if the err is a WorkflowExecutionAlreadyStartedError
 */
export function IsWorkflowExecutionAlreadyStartedError(err: Error | null): boolean {
    return err instanceof WorkflowExecutionAlreadyStartedError;
}

/**
 * IsCanceledError return if the err is a CanceledError
 */
export function IsCanceledError(err: Error | null): boolean {
  return err instanceof internal_CanceledError;
}

/**
 * IsGenericError return if the err is a GenericError
 */
export function IsGenericError(err: Error | null): boolean {
  return err instanceof internal_GenericError;
}

/**
 * IsTimeoutError return if the err is a TimeoutError
 */
export function IsTimeoutError(err: Error | null): boolean {
  return err instanceof internal_TimeoutError;
}

/**
 * IsTerminatedError return if the err is a TerminatedError
 */
export function IsTerminatedError(err: Error | null): boolean {
  return err instanceof internal_TerminatedError;
}

/**
 * IsPanicError return if the err is a PanicError
 */
export function IsPanicError(err: Error | null): boolean {
  return err instanceof internal_PanicError;
}

/**
 * ErrNoData is returned when trying to extract strong typed data while there is no data available.
 */
export let ErrNoData = internal_ErrNoData;
