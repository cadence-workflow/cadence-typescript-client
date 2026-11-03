// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { RegisterActivityOptions, ServiceInvoker, internal_ActivityType } from './activity.js';
import { internal_RetryPolicy } from './client.js';
import { internal_Context, WithValue } from './context.js';
import { internal_DataConverter, getDefaultDataConverter } from './encoded.js';
import { internal_ContextPropagator } from './headers.js';
import { laResultHandler, resultHandler } from './internal_worker_base.js';
import { registry } from './registry.js';
import { WorkflowInfo, internal_WorkflowExecution, internal_WorkflowType, errLocalActivityParamsBadRequest, errActivityParamsBadRequest } from './workflow.js';
import { Channel } from './runtime/channel.js';
import { Context } from './runtime/context.js';
import type { Scope } from './runtime/tally.js';
import { IHeader as shared_IHeader } from '../generated/thrift/cadence-idl/com/uber/cadence/Header.js';
import { IRetryPolicy as shared_IRetryPolicy } from '../generated/thrift/cadence-idl/com/uber/cadence/RetryPolicy.js';
import { TaskListKind as shared_TaskListKind } from '../generated/thrift/cadence-idl/com/uber/cadence/TaskListKind.js';
import { decodeArg, getFunctionName, encodeArg, isWorkflowContext } from './internal_worker.js';
import { Int32Ptr } from './common/convert.js';
import { Logger } from 'winston';

export interface activity {
  Execute(ctx: Context, input: Buffer): Promise<Buffer>;
  ActivityType(): internal_ActivityType;
  GetFunction(): unknown;
  GetOptions(): RegisterActivityOptions;
}

export interface activityInfo {
  activityID: string;
}

export interface asyncActivityClient {
  ExecuteActivity(parameters: executeActivityParams, callback: resultHandler): Promise<activityInfo>;
  RequestCancelActivity(activityID: string): void;
}

/**
 * context.WithValue need this type instead of basic type string to avoid lint error
 */
export type contextKey = string;

export interface localActivityClient {
  ExecuteLocalActivity(params: executeLocalActivityParams, callback: laResultHandler): Promise<localActivityInfo>;
  RequestCancelLocalActivity(activityID: string): Promise<void>;
}

export interface localActivityInfo {
  activityID: string;
}

/**
 * activityOptions configuration parameters for scheduling an activity
 */
export class activityOptions {
  constructor(init?: Partial<activityOptions>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  ActivityID?: string;

  TaskListName: string = "";

  TaskListKind: shared_TaskListKind = 0;

  ScheduleToCloseTimeoutSeconds: number = 0;

  ScheduleToStartTimeoutSeconds: number = 0;

  StartToCloseTimeoutSeconds: number = 0;

  HeartbeatTimeoutSeconds: number = 0;

  WaitForCancellation: boolean = false;

  OriginalTaskListName: string = "";

  RetryPolicy?: shared_IRetryPolicy;

}

export class localActivityOptions {
  constructor(init?: Partial<localActivityOptions>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  ScheduleToCloseTimeoutSeconds: number = 0;

  RetryPolicy?: internal_RetryPolicy;

}

export class executeActivityParams {
  constructor(init?: Partial<executeActivityParams>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  activityOptions: activityOptions = { TaskListName: "", TaskListKind: 0, ScheduleToCloseTimeoutSeconds: 0, ScheduleToStartTimeoutSeconds: 0, StartToCloseTimeoutSeconds: 0, HeartbeatTimeoutSeconds: 0, WaitForCancellation: false, OriginalTaskListName: "" };

  ActivityType: internal_ActivityType = { Name: "", Path: "" };

  Input: Buffer = Buffer.alloc(0);

  DataConverter?: internal_DataConverter;

  Header?: shared_IHeader;

}

export class executeLocalActivityParams {
  constructor(init?: Partial<executeLocalActivityParams>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  localActivityOptions: localActivityOptions = { ScheduleToCloseTimeoutSeconds: 0 };

  ActivityFn?: unknown;

  ActivityType: string = "";

  InputArgs: unknown[] = [];

  WorkflowInfo?: WorkflowInfo;

  DataConverter?: internal_DataConverter;

  Attempt: number = 0;

  ScheduledTime: number = 0;

  Header?: shared_IHeader;

}

export class activityEnvironment {
  constructor(init?: Partial<activityEnvironment>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  taskToken: Buffer = Buffer.alloc(0);

  workflowExecution: internal_WorkflowExecution = { ID: "", RunID: "" };

  activityID: string = "";

  activityType: internal_ActivityType = { Name: "", Path: "" };

  serviceInvoker?: ServiceInvoker;

  logger?: Logger;

  metricsScope?: Scope;

  isLocalActivity: boolean = false;

  heartbeatTimeout: number = 0;

  deadline: number = 0;

  scheduledTimestamp: number = 0;

  startedTimestamp: number = 0;

  taskList: string = "";

  dataConverter?: internal_DataConverter;

  attempt: number = 0;

  heartbeatDetails: Buffer = Buffer.alloc(0);

  workflowType?: internal_WorkflowType;

  workflowDomain: string = "";

  workerStopChannel?: Channel<{}>;

  contextPropagators: internal_ContextPropagator[] = [];

  tracer?: unknown;

}

export function getActivityEnv(ctx: Context): activityEnvironment {
  const env = ctx.value(activityEnvContextKey);
  if (env == null) {
    throw "getActivityEnv: Not an activity context";
  }
  return env as activityEnvironment;
}

export function hasActivityEnv(ctx: Context): boolean {
  const env = ctx.value(activityEnvContextKey);
  return env != null;
}

export function getActivityOptions(ctx: internal_Context): activityOptions | undefined {
  const eap = ctx.Value(activityOptionsContextKey);
  if (eap == null) {
    return undefined;
  }
  return eap as activityOptions;
}

export function getLocalActivityOptions(ctx: internal_Context): localActivityOptions | undefined {
  const opts = ctx.Value(localActivityOptionsContextKey);
  if (opts == null) {
    return undefined;
  }
  return opts as localActivityOptions;
}

export function getValidatedActivityOptions(ctx: internal_Context): activityOptions {
  const p = getActivityOptions(ctx);
  if (p == null) {
    throw errActivityParamsBadRequest;
  }
  if (p.TaskListName === "") {
    p.TaskListName = p.OriginalTaskListName;
  }
  if (p.ScheduleToStartTimeoutSeconds <= 0) {
    throw new Error("missing or negative ScheduleToStartTimeoutSeconds");
  }
  if (p.StartToCloseTimeoutSeconds <= 0) {
    throw new Error("missing or negative StartToCloseTimeoutSeconds");
  }
  if (p.ScheduleToCloseTimeoutSeconds < 0) {
    throw new Error("invalid negative ScheduleToCloseTimeoutSeconds");
  }
  if (p.ScheduleToCloseTimeoutSeconds === 0) {
    p.ScheduleToCloseTimeoutSeconds =
      p.ScheduleToStartTimeoutSeconds + p.StartToCloseTimeoutSeconds;
  }
  if (p.HeartbeatTimeoutSeconds < 0) {
    throw new Error("invalid negative HeartbeatTimeoutSeconds");
  }
  validateRetryPolicy(p.RetryPolicy);
  return p;
}

export function getValidatedLocalActivityOptions(ctx: internal_Context): localActivityOptions {
  const p = getLocalActivityOptions(ctx);
  if (p == null) {
    throw errLocalActivityParamsBadRequest;
  }
  if (p.ScheduleToCloseTimeoutSeconds <= 0) {
    throw new Error("missing or negative ScheduleToCloseTimeoutSeconds");
  }
  return p;
}

export function validateRetryPolicy(p: shared_IRetryPolicy | undefined): void {
    if (p == null) {
        return;
    }

    if ((p.initialIntervalInSeconds ?? 0) <= 0) {
        throw new Error("missing or negative InitialIntervalInSeconds on retry policy");
    }
    if ((p.maximumIntervalInSeconds ?? 0) < 0) {
        throw new Error("negative MaximumIntervalInSeconds on retry policy is invalid");
    }
    if ((p.maximumIntervalInSeconds ?? 0) === 0) {
        p.maximumIntervalInSeconds = Int32Ptr(100 * (p.initialIntervalInSeconds ?? 0));
    }
    if ((p.maximumAttempts ?? 0) < 0) {
        throw new Error("negative MaximumAttempts on retry policy is invalid");
    }
    if ((p.expirationIntervalInSeconds ?? 0) < 0) {
        throw new Error("ExpirationIntervalInSeconds cannot be less than 0 on retry policy");
    }
    if ((p.backoffCoefficient ?? 0) < 1) {
        throw new Error("BackoffCoefficient on retry policy cannot be less than 1.0");
    }
    if ((p.maximumAttempts ?? 0) === 0 && (p.expirationIntervalInSeconds ?? 0) === 0) {
        throw new Error("both MaximumAttempts and ExpirationIntervalInSeconds on retry policy are not set, at least one of them must be set");
    }

    return;
}

export function validateFunctionArgs(f: unknown, args: unknown[], isWorkflow: boolean): void {
    const formatValue = (value: unknown): string =>
        value instanceof Error
            ? value.message
            : typeof (value as { String?: unknown }).String === 'function'
                ? (value as { String(): string }).String()
                : globalThis.String(value);

    if (typeof f !== 'function') {
        throw new Error(`Provided type: ${formatValue(f)} is not a function type`);
    }

    const fnName = getFunctionName(f);
    let fnArgIndex = 0;
    const parameterCount = (f as { length: number }).length;

    if (parameterCount > 0) {
        if (isWorkflow && isWorkflowContext(f)) {
            fnArgIndex++;
        }
        if (!isWorkflow && isActivityContext(f)) {
            fnArgIndex++;
        }
    }

    if (parameterCount - fnArgIndex !== args.length) {
        throw new Error(
            `expected ${parameterCount - fnArgIndex} args for function: ${fnName} but found ${args.length}`,
        );
    }
}

export async function getValidatedActivityFunction(f: unknown, args: unknown[], registry: registry): Promise<internal_ActivityType> {
  let fnName = "";
  const fType = f;

  switch (getKind(fType)) {
    case "string":
      fnName = globalThis.String(f);
      break;
    case "function":
      validateFunctionArgs(f, args, false);
      fnName = getFunctionName(f);
      {
        const [alias, ok] = await registry.getActivityAlias(fnName);
        if (ok) {
          fnName = alias;
        }
      }
      break;
    default: {
      const renderedF =
        f instanceof Error
          ? f.message
          : typeof (f as { String?: unknown }).String === "function"
            ? (f as { String(): string }).String()
            : globalThis.String(f);
      throw new Error(
        `invalid type 'f' parameter provided, it can be either activity function or name of the activity: ${renderedF}`,
      );
    }
  }

  return { Name: fnName, Path: "" };
}

export function getKind(fType: unknown | undefined): unknown {
    if (fType == null) {
        return null;
    }
    return typeof fType;
}

export function isActivityContext(inType: unknown | undefined): boolean {
  return inType != null && typeof inType === "function" && inType.length >= 1;
}

export function validateFunctionAndGetResults(f: unknown, values: unknown[], dataConverter: internal_DataConverter): Buffer {
  const resultSize = values.length;

  if (resultSize > 1) {
    const fnName = getFunctionName(f);
    throw new Error(
      `the function: ${fnName} signature returns ${resultSize} results, it is expecting to return either error or (result, error)`,
    );
  }

  let result: Buffer = Buffer.alloc(0);

  if (values.length === 1 && values[0] != null) {
    if (values[0] instanceof Error) {
      throw values[0];
    }
    result = encodeArg(dataConverter, values[0]);
  }

  return result;
}

export function serializeResults(f: unknown, results: unknown[], dataConverter: internal_DataConverter): Buffer {
    if (results.length > 1) {
        const fnName = getFunctionName(f);
        throw new Error(
            `the function: ${fnName} signature returns ${results.length} results, it is expecting to return either error or (result, error)`,
        );
    }

    if (results.length === 1 && results[0] != null) {
        if (results[0] instanceof Error) {
            throw results[0];
        }
        return encodeArg(dataConverter, results[0]);
    }

    return Buffer.alloc(0);
}

export async function deSerializeFunctionResult(f: unknown, result: Buffer, to: unknown, dataConverter: internal_DataConverter | undefined, registry: registry): Promise<void> {
	const fType = f;
	if (dataConverter == null) {
		dataConverter = getDefaultDataConverter();
	}

	switch (getKind(fType)) {
		case 'function':
			deSerializeFnResultFromFnType(fType, result, to, dataConverter);
			return;

		case 'string': {
			const fnName = f as string;
			const [activity, ok] = await registry.GetActivity(fnName);
			if (ok) {
				deSerializeFnResultFromFnType(activity.GetFunction(), result, to, dataConverter);
				return;
			}
			break;
		}
	}

	decodeArg(dataConverter, result, to);
}

export function setActivityParametersIfNotExist(ctx: internal_Context): internal_Context {
  const params = getActivityOptions(ctx);
  const newParams = new activityOptions();

  if (params != null) {
    Object.assign(newParams, params);
    if (params.RetryPolicy != null) {
      newParams.RetryPolicy = Object.assign({}, newParams.RetryPolicy);
    }
  }

  return WithValue(ctx, activityOptionsContextKey, newParams);
}

export function setLocalActivityParametersIfNotExist(ctx: internal_Context): internal_Context {
  const params = getLocalActivityOptions(ctx);
  const newParams = new localActivityOptions();
  if (params != null) {
    newParams.ScheduleToCloseTimeoutSeconds = params.ScheduleToCloseTimeoutSeconds;
    newParams.RetryPolicy = params.RetryPolicy;
  }
  return WithValue(ctx, localActivityOptionsContextKey, newParams);
}

export function deSerializeFnResultFromFnType(fnType: unknown, result: Buffer | undefined, to: unknown, dataConverter: internal_DataConverter): void {
    if (typeof fnType !== 'function') {
        const fnTypeString =
            fnType instanceof Error
                ? fnType.message
                : typeof (fnType as { String?: unknown }).String === 'function'
                    ? (fnType as { String(): string }).String()
                    : globalThis.String(fnType);
        throw new Error(`expecting only function type but got type: ${fnTypeString}`);
    }

    if (result == null) {
        return;
    }

    decodeArg(dataConverter, result, to);
}

export const activityEnvContextKey = "activityEnv";

export const activityOptionsContextKey = "activityOptions";

export const localActivityOptionsContextKey = "localActivityOptions";
