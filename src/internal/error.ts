// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { internal_WorkflowIDReusePolicy } from './client.js';
import { internal_Context } from './context.js';
import { internal_Values } from './encoded.js';
import { executeWorkflowParams, getValidatedWorkflowFunction, getWorkflowEnvOptions, getWorkflowEnvironment, validateCronSchedule } from './internal_workflow.js';
import { WorkflowInfo, internal_WorkflowType, getWorkflowHeader } from './workflow.js';
import { IDecision as shared_IDecision } from '../generated/thrift/cadence-idl/com/uber/cadence/Decision.js';
import { IHeader as shared_IHeader } from '../generated/thrift/cadence-idl/com/uber/cadence/Header.js';
import { IHistoryEvent as shared_IHistoryEvent } from '../generated/thrift/cadence-idl/com/uber/cadence/HistoryEvent.js';
import { TimeoutType as shared_TimeoutType } from '../generated/thrift/cadence-idl/com/uber/cadence/TimeoutType.js';
import { EncodedValues } from './workflow_testsuite.js';
import { DecisionToString, HistoryEventToString } from './common/util/stringer.js';
import { history } from './internal_task_handlers.js';

/**
 * CustomError returned from workflow and activity implementations with reason and optional details.
 */
export class internal_CustomError extends globalThis.Error {
  constructor(init?: Partial<internal_CustomError>) {
    super(typeof init?.message === "string" ? init.message : "");
    this.name = "internal_CustomError";
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
    if (typeof init?.message !== "string") {
      this.message = this.Error();
    }
  }

  reason: string = "";

  details?: internal_Values;

  Error(): string {
      return this.reason;
  }

  Reason(): string {
    return this.reason;
  }

  HasDetails(): boolean {
    return this.details != null && this.details.HasValues();
  }

  Details(...d: unknown[]): void {
      if (!this.HasDetails()) {
          throw ErrNoData;
      }
      this.details!.Get(...d);
  }

}

/**
 * GenericError returned from workflow/workflow when the implementations return errors other than from NewCustomError() API.
 */
export class internal_GenericError extends globalThis.Error {
  constructor(init?: Partial<internal_GenericError>) {
    super(typeof init?.message === "string" ? init.message : "");
    this.name = "internal_GenericError";
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
    if (typeof init?.message !== "string") {
      this.message = this.Error();
    }
  }

  err: string = "";

  Error(): string {
    return this.err;
  }

}

/**
 * TimeoutError returned when activity or child workflow timed out.
 */
export class internal_TimeoutError extends globalThis.Error {
  constructor(init?: Partial<internal_TimeoutError>) {
    super(typeof init?.message === "string" ? init.message : "");
    this.name = "internal_TimeoutError";
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
    if (typeof init?.message !== "string") {
      this.message = this.Error();
    }
  }

  timeoutType: shared_TimeoutType = 0;

  details?: internal_Values;

  Error(): string {
    return `TimeoutType: ${shared_TimeoutType[this.timeoutType]}`;
  }

  TimeoutType(): shared_TimeoutType {
      return this.timeoutType;
  }

  HasDetails(): boolean {
    return this.details != null && this.details.HasValues();
  }

  Details(...d: unknown[]): void {
      if (!this.HasDetails()) {
          throw ErrNoData;
      }
      this.details!.Get(...d);
  }

}

/**
 * CanceledError returned when operation was canceled.
 */
export class internal_CanceledError extends globalThis.Error {
  constructor(init?: Partial<internal_CanceledError>) {
    super(typeof init?.message === "string" ? init.message : "");
    this.name = "internal_CanceledError";
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
    if (typeof init?.message !== "string") {
      this.message = this.Error();
    }
  }

  details?: internal_Values;

  Error(): string {
    return "CanceledError";
  }

  HasDetails(): boolean {
    return this.details != null && this.details.HasValues();
  }

  Details(...d: unknown[]): void {
      if (!this.HasDetails()) {
          throw ErrNoData;
      }
      this.details!.Get(...d);
  }

}

/**
 * TerminatedError returned when workflow was terminated.
 */
export class internal_TerminatedError extends globalThis.Error {
  constructor(init?: Partial<internal_TerminatedError>) {
    super(typeof init?.message === "string" ? init.message : "");
    this.name = "internal_TerminatedError";
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
    if (typeof init?.message !== "string") {
      this.message = this.Error();
    }
  }

  Error(): string {
    return "Terminated";
  }

}

/**
 * PanicError contains information about panicked workflow/activity.
 */
export class internal_PanicError extends globalThis.Error {
  constructor(init?: Partial<internal_PanicError>) {
    super(typeof init?.message === "string" ? init.message : "");
    this.name = "internal_PanicError";
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
    if (typeof init?.message !== "string") {
      this.message = this.Error();
    }
  }

  value?: unknown;

  stackTrace: string = "";

  Error(): string {
      return this.value instanceof Error
          ? this.value.message
          : typeof (this.value as { String?: () => string }).String === "function"
              ? (this.value as { String?: () => string }).String!()
              : globalThis.String(this.value);
  }

  StackTrace(): string {
  	return this.stackTrace;
  }

}

/**
 * workflowPanicError contains information about panicked workflow.
 * Used to distinguish go panic in the workflow code from a PanicError returned from a workflow function.
 */
export class workflowPanicError extends globalThis.Error {
  constructor(init?: Partial<workflowPanicError>) {
    super(typeof init?.message === "string" ? init.message : "");
    this.name = "workflowPanicError";
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
    if (typeof init?.message !== "string") {
      this.message = this.Error();
    }
  }

  value?: unknown;

  stackTrace: string = "";

  Error(): string {
    const value = this.value!;
    return value instanceof globalThis.Error
      ? value.message
      : typeof (value as { String?: unknown }).String === "function"
        ? (value as { String(): string }).String()
        : globalThis.String(value);
  }

  StackTrace(): string {
    return this.stackTrace;
  }

}

/**
 * NonDeterministicError contains some structured data related to a non-deterministic
 * replay failure, and is primarily intended for allowing richer error reporting.
 * 
 * WorkflowType, WorkflowID, RunID, TaskList, and DomainName will likely be long-term stable
 * and included in some form in future library versions, but the rest of these fields may
 * change at any time, or be removed in a future major version change.
 */
export class internal_NonDeterministicError extends globalThis.Error {
  constructor(init?: Partial<internal_NonDeterministicError>) {
    super(typeof init?.message === "string" ? init.message : "");
    this.name = "internal_NonDeterministicError";
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
    if (typeof init?.message !== "string") {
      this.message = this.Error();
    }
  }

  Reason: string = "";

  WorkflowType: string = "";

  WorkflowID: string = "";

  RunID: string = "";

  TaskList: string = "";

  DomainName: string = "";

  HistoryEventText: string = "";

  DecisionText: string = "";

  Error(): string {
      switch (this.Reason) {
          case "missing replay decision":
              return "nondeterministic workflow: " +
                  "missing replay decision for " + this.HistoryEventText;
          case "extra replay decision":
              return "nondeterministic workflow: " +
                  "extra replay decision for " + this.DecisionText;
          case "mismatch":
              return "nondeterministic workflow: " +
                  "history event is " + this.HistoryEventText + ", " +
                  "replay decision is " + this.DecisionText;
          default:
              return "unknown reason " + JSON.stringify(this.Reason) +
                  ", history event is: " + this.HistoryEventText +
                  ", replay decision is: " + this.DecisionText;
      }
  }

}

/**
 * ContinueAsNewError contains information about how to continue the workflow as new.
 */
export class internal_ContinueAsNewError extends globalThis.Error {
  constructor(init?: Partial<internal_ContinueAsNewError>) {
    super(typeof init?.message === "string" ? init.message : "");
    this.name = "internal_ContinueAsNewError";
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
    if (typeof init?.message !== "string") {
      this.message = this.Error();
    }
  }

  wfn?: unknown;

  args: unknown[] = [];

  params?: executeWorkflowParams;

  Error(): string {
    return "ContinueAsNew";
  }

  WorkflowIDReusePolicy(): internal_WorkflowIDReusePolicy {
    return this.params!.workflowIDReusePolicy;
  }

  WorkflowType(): internal_WorkflowType {
    return this.params!.workflowType!;
  }

  Args(): unknown[] {
    return this.args;
  }

  Input(): Buffer {
    return this.params!.input;
  }

  Header(): shared_IHeader {
      return this.params!.header!;
  }

}

/**
 * UnknownExternalWorkflowExecutionError can be returned when external workflow doesn't exist
 */
export class internal_UnknownExternalWorkflowExecutionError extends globalThis.Error {
  constructor(init?: Partial<internal_UnknownExternalWorkflowExecutionError>) {
    super(typeof init?.message === "string" ? init.message : "");
    this.name = "internal_UnknownExternalWorkflowExecutionError";
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
    if (typeof init?.message !== "string") {
      this.message = this.Error();
    }
  }

  Error(): string {
    return "UnknownExternalWorkflowExecution";
  }

}

/**
 * ErrorDetailsValues is a type alias used hold error details objects.
 */
export class ErrorDetailsValues implements internal_Values {
  constructor(public value: unknown[] = []) {}

  HasValues(): boolean {
      return this.value != null && this.value.length !== 0;
    }

  Get(...valuePtr: unknown[]): void {
    if (!this.HasValues()) {
      throw ErrNoData;
    }
    if (valuePtr.length > this.value.length) {
      throw ErrTooManyArg;
    }

    for (let i = 0; i < valuePtr.length; i++) {
      const item = valuePtr[i] as { value: unknown };
      const val = this.value[i];
      const target = item.value;

      let assignable = target == null;

      if (!assignable) {
        const valIsArray = Array.isArray(val);
        const targetIsArray = Array.isArray(target);
        const valIsBuffer = typeof Buffer !== "undefined" && Buffer.isBuffer(val);
        const targetIsBuffer = typeof Buffer !== "undefined" && Buffer.isBuffer(target);

        if (valIsArray || targetIsArray) {
          assignable = valIsArray && targetIsArray;
        } else if (valIsBuffer || targetIsBuffer) {
          assignable = valIsBuffer && targetIsBuffer;
        } else if (typeof val === "object" && val !== null && typeof target === "object" && target !== null) {
          const valKeys = Object.keys(val).sort();
          const targetKeys = Object.keys(target).sort();
          assignable = valKeys.length === targetKeys.length && valKeys.every((key, index) => key === targetKeys[index]);
        } else {
          assignable = typeof val === typeof target;
        }
      }

      if (!assignable) {
        throw new Error(
          `unable to decode argument: cannot set ${typeof val} value to ${typeof target} field`,
        );
      }

      item.value = val;
    }
  }

}

/**
 * NewCustomError create new instance of *CustomError with reason and optional details.
 */
export function NewCustomError(reason: string, ...details: unknown[]): internal_CustomError {
  if (reason.startsWith("cadenceInternal:")) {
    throw "'cadenceInternal:' is reserved prefix, please use different reason";
  }
  if (details.length === 1 && details[0] instanceof EncodedValues) {
    return new internal_CustomError({ reason, details: details[0] });
  }
  return new internal_CustomError({ reason, details: new ErrorDetailsValues(details) });
}

/**
 * NewTimeoutError creates TimeoutError instance.
 * Use NewHeartbeatTimeoutError to create heartbeat TimeoutError
 */
export function NewTimeoutError(timeoutType: shared_TimeoutType, ...details: unknown[]): internal_TimeoutError {
  if (details.length === 1) {
    if (details[0] instanceof EncodedValues) {
      return new internal_TimeoutError({ timeoutType, details: details[0] });
    }
  }
  return new internal_TimeoutError({ timeoutType, details: new ErrorDetailsValues(details) });
}

/**
 * NewHeartbeatTimeoutError creates TimeoutError instance
 */
export function NewHeartbeatTimeoutError(...details: unknown[]): internal_TimeoutError {
  return NewTimeoutError(shared_TimeoutType.HEARTBEAT, ...details);
}

/**
 * NewCanceledError creates CanceledError instance
 */
export function NewCanceledError(...details: unknown[]): internal_CanceledError {
  if (details.length === 1 && details[0] instanceof EncodedValues) {
    return new internal_CanceledError({ details: details[0] });
  }
  return new internal_CanceledError({ details: new ErrorDetailsValues(details) });
}

/**
 * IsCanceledError return whether error in CanceledError
 */
export function IsCanceledError(err: Error | null): boolean {
  return err instanceof internal_CanceledError;
}

export function newPanicError(value: unknown, stackTrace: string): internal_PanicError {
  return new internal_PanicError({ value, stackTrace });
}

export function newWorkflowPanicError(value: unknown, stackTrace: string): workflowPanicError {
  return new workflowPanicError({ value, stackTrace });
}

/**
 * newTerminatedError creates NewTerminatedError instance
 */
export function newTerminatedError(): internal_TerminatedError {
  return new internal_TerminatedError({});
}

/**
 * newUnknownExternalWorkflowExecutionError creates UnknownExternalWorkflowExecutionError instance
 */
export function newUnknownExternalWorkflowExecutionError(): internal_UnknownExternalWorkflowExecutionError {
  return new internal_UnknownExternalWorkflowExecutionError({});
}

/**
 * NewNonDeterminsticError constructs a new *NonDeterministicError.
 * 
 *   - reason should be a documented NonDeterminsticError.Reason value
 *   - info is always required.  only a portion of it is used, but it is a convenient
 *     and currently always-available object.
 *   - history and decision may each be present or nil at any time
 */
export function NewNonDeterminsticError(reason: string, info: WorkflowInfo, history: shared_IHistoryEvent | undefined, decision: shared_IDecision | undefined): Error | null {
    let historyText = '';
    if (history != null) {
        historyText = HistoryEventToString(history);
    }
    let decisionText = '';
    if (decision != null) {
        decisionText = DecisionToString(decision);
    }
    return new internal_NonDeterministicError({
        Reason: reason,
        WorkflowType: info.WorkflowType.Name,
        WorkflowID: info.WorkflowExecution.ID,
        RunID: info.WorkflowExecution.RunID,
        TaskList: info.TaskListName,
        DomainName: info.Domain,
        HistoryEventText: historyText,
        DecisionText: decisionText,
    });
}

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
export async function NewContinueAsNewError(ctx: internal_Context, wfn: unknown, ...args: unknown[]): Promise<internal_ContinueAsNewError> {
  const options = getWorkflowEnvOptions(ctx);
  if (options == null) {
    throw "context is missing required options for continue as new";
  }

  const env = getWorkflowEnvironment(ctx);
  const [workflowType, input] = await getValidatedWorkflowFunction(
    wfn,
    args,
    options.dataConverter!,
    env.GetRegistry(),
  );

  if (options.taskListName == null || options.taskListName === "") {
    throw "invalid task list provided";
  }
  if (
    options.executionStartToCloseTimeoutSeconds == null ||
    options.executionStartToCloseTimeoutSeconds <= 0
  ) {
    throw "invalid executionStartToCloseTimeoutSeconds provided";
  }
  if (
    options.taskStartToCloseTimeoutSeconds == null ||
    options.taskStartToCloseTimeoutSeconds <= 0
  ) {
    throw "invalid taskStartToCloseTimeoutSeconds provided";
  }

  validateCronSchedule(options.cronSchedule);

  const params = new executeWorkflowParams({
    ...options,
    workflowType,
    input,
    header: getWorkflowHeader(ctx, options.contextPropagators),
  });

  return new internal_ContinueAsNewError({
    wfn,
    args,
    params,
  });
}

export const badNilErrMsgFmt = "cadence received an invalid nil `%T`. this likely means you have a typed nil which is being converted into an `error` value: https://go.dev/doc/faq#nil_error";

export const errReasonCanceled = "cadenceInternal:Canceled";

export const errReasonGeneric = "cadenceInternal:Generic";

export const errReasonPanic = "cadenceInternal:Panic";

export const errReasonTimeout = "cadenceInternal:Timeout";

/**
 * ErrNoData is returned when trying to extract strong typed data while there is no data available.
 */
export let ErrNoData = new Error("no data available");

/**
 * ErrTooManyArg is returned when trying to extract strong typed data with more arguments than available data.
 */
export let ErrTooManyArg = new Error("too many arguments");

/**
 * ErrActivityResultPending is returned from activity's implementation to indicate the activity is not completed when
 * activity method returns. Activity needs to be completed by Client.CompleteActivity() separately. For example, if an
 * activity require human interaction (like approve an expense report), the activity could return activity.ErrResultPending
 * which indicate the activity is not done yet. Then, when the waited human action happened, it needs to trigger something
 * that could report the activity completed event to cadence server via Client.CompleteActivity() API.
 */
export let ErrActivityResultPending = new Error("not error: do not autocomplete, using Client.CompleteActivity() to complete");
