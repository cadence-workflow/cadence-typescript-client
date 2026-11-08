// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { Hour, Minute } from './runtime/time.js';
import { expect } from 'vitest';
import { newTestWorkflowEnv } from './test_helpers_test.js';
import { ExecuteActivity, WithActivityOptions } from './workflow.js';
import { internal_ActivityOptions } from './activity.js';
import { internal_Context } from './context.js';
import { Context } from './runtime/context.js';

export function TestSetWorkflowTimeout(): void {
  const env = newTestWorkflowEnv();
  const executionTimeout = 30 * Minute;

  expect(env.impl!.workflowInfo!.ExecutionStartToCloseTimeoutSeconds).toEqual(1);

  const result = env.SetWorkflowTimeout(executionTimeout);

  expect(result).toEqual(env);
  expect(result.impl!.workflowInfo!.ExecutionStartToCloseTimeoutSeconds).toEqual(
    Math.trunc(executionTimeout / 1e9),
  );
  expect(result.impl!.executionTimeout).toEqual(executionTimeout);
}

export async function TestSetMemoOnStart(): Promise<void> {
    const env = newTestWorkflowEnv();

    let memo: Record<string, unknown> = {
        key: BigInt(1),
    };
    let err: unknown = null;
    try {
        await env.SetMemoOnStart(memo);
    } catch (e) {
        err = e;
    }
    expect(err).not.toBeNull();

    memo = {
        memoKey: "memo",
    };
    expect(env.impl!.workflowInfo!.Memo).toBeUndefined();
    await env.SetMemoOnStart(memo);
    expect(env.impl!.workflowInfo!.Memo!).not.toBeNull();
}

export async function TestSetSearchAttributesOnStart(): Promise<void> {
  const env = newTestWorkflowEnv();

  const invalidSearchAttr = {
    key: BigInt(1),
  };
  await expect(env.SetSearchAttributesOnStart(invalidSearchAttr)).rejects.toThrow();

  const searchAttr = {
    CustomIntField: 1,
  };
  await env.SetSearchAttributesOnStart(searchAttr);
  expect(env.impl!.workflowInfo!.SearchAttributes!).not.toBeNull();
}

export async function TestUnregisteredActivity(): Promise<void> {
  const env = newTestWorkflowEnv();
  const workflow = async (ctx: internal_Context): Promise<void> => {
    ctx = WithActivityOptions(
      ctx,
      new internal_ActivityOptions({
        ActivityID: "",
        HeartbeatTimeout: 0,
        RetryPolicy: undefined,
        ScheduleToCloseTimeout: 0,
        ScheduleToStartTimeout: Minute,
        StartToCloseTimeout: Minute,
        TaskList: "",
        WaitForCancellation: false,
      }),
    );
    const future = await ExecuteActivity(ctx, "unregistered");
    await future.Get(ctx, null);
  };
  await env.RegisterWorkflow(workflow);
  await env.ExecuteWorkflow(workflow);
  expect(env.GetWorkflowError()).not.toBeNull();
  const ee = env.GetWorkflowError();
  expect(ee).not.toBeNull();
  expect(ee!.message.startsWith("unable to find activityType=unregistered")).toBe(true);
}

export async function TestNoExplicitRegistrationRequired(): Promise<void> {
  const env = newTestWorkflowEnv();
  const activity = (ctx: Context, arg: string): string => arg + " World!";

  await env.RegisterActivity(activity);

  await env.ExecuteWorkflow(async (ctx: internal_Context, arg1: string): Promise<string> => {
    ctx = WithActivityOptions(ctx, new internal_ActivityOptions({
      ActivityID: "",
      HeartbeatTimeout: 0,
      RetryPolicy: undefined,
      ScheduleToCloseTimeout: Hour,
      ScheduleToStartTimeout: Hour,
      StartToCloseTimeout: Hour,
      TaskList: "",
      WaitForCancellation: false,
    }));

    const future = await ExecuteActivity(ctx, activity, arg1);
    const resultBox: { value: string } = { value: "" };
    await future.Get(ctx, resultBox);
    return resultBox.value;
  }, "Hello");

  expect(env.GetWorkflowError()).toBeNull();

  const resultBox: { value: string } = { value: "" };
  env.GetWorkflowResult(resultBox);
  expect(resultBox.value).toEqual("Hello World!");
}

export async function TestWorkflowReturnNil(): Promise<void> {
  const env = newTestWorkflowEnv();

  let isExecuted = false;
  const testWF = (_ctx: unknown): void => {
    isExecuted = true;
  };

  await env.ExecuteWorkflow(testWF);

  expect(env.IsWorkflowCompleted()).toBe(true);
  expect(env.GetWorkflowError()).toBeNull();
  expect(isExecuted).toBe(true);

  const r = {};
  env.GetWorkflowResult(r);
}
