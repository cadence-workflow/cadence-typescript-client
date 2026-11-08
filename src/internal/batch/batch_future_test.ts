// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { internal_Context } from '../context.js';
import { Context } from '../runtime/context.js';
import { Millisecond, Second } from '../runtime/time.js';
import { expect } from 'vitest';
import { WorkflowTestSuite } from '../workflow_testsuite.js';
import { mapCase, recvCase, selectOne, timeoutCase } from '../runtime/select.js';
import { ExecuteActivity, WithActivityOptions, internal_Future } from '../workflow.js';
import { NewBatchFuture } from './batch_future.js';
import { internal_ActivityOptions } from '../activity.js';

export interface batchWorkflowInput {
  Concurrency: number;
  TotalSize: number;
}

export async function batchWorkflow(ctx: internal_Context, input: batchWorkflowInput): Promise<number[]> {
  const factories: ((p0: internal_Context) => internal_Future)[] = new Array(input.TotalSize);

  for (let i = 0; i < input.TotalSize; i++) {
    const iLocal = i;
    factories[iLocal] = (ctx: internal_Context): internal_Future => {
      const aCtx = WithActivityOptions(ctx, new internal_ActivityOptions({
        ActivityID: "",
        HeartbeatTimeout: 0,
        ScheduleToCloseTimeout: 0,
        ScheduleToStartTimeout: 0,
        StartToCloseTimeout: 10 * Second,
        TaskList: "",
        WaitForCancellation: false,
      }));
      return ExecuteActivity(aCtx, batchActivity, iLocal) as unknown as internal_Future;
    };
  }

  const batchFuture = await NewBatchFuture(ctx, input.Concurrency, factories);
  const result: number[] = new Array(input.TotalSize);
  await batchFuture.Get(ctx, result);
  return result;
}

export async function batchWorkflowUsingFutures(ctx: internal_Context, input: batchWorkflowInput): Promise<number[]> {
  const factories: ((p0: internal_Context) => internal_Future)[] = new Array(input.TotalSize);

  for (let i = 0; i < input.TotalSize; i++) {
    const iLocal = i;
    factories[iLocal] = (factoryCtx: internal_Context): internal_Future => {
      const aCtx = WithActivityOptions(
        factoryCtx,
        new internal_ActivityOptions({
          ActivityID: "",
          HeartbeatTimeout: 0,
          ScheduleToCloseTimeout: 0,
          ScheduleToStartTimeout: 10 * Second,
          StartToCloseTimeout: 10 * Second,
          TaskList: "",
          WaitForCancellation: false,
        }),
      );

      const activityPromise = ExecuteActivity(aCtx, batchActivity, iLocal);
      return {
        Get: async (getCtx: internal_Context, valuePtr: unknown): Promise<void> => {
          const future = await activityPromise;
          await future.Get(getCtx, valuePtr);
        },
      } as unknown as internal_Future;
    };
  }

  const batchFuture = await NewBatchFuture(ctx, input.Concurrency, factories);
  const result = new Array<number>(input.TotalSize);

  for (const [i, f] of batchFuture.GetFutures().entries()) {
    const valuePtr = { value: 0 };
    await f.Get(ctx, valuePtr);
    result[i] = valuePtr.value;
  }

  return result;
}

export async function batchActivity(ctx: Context, taskID: number): Promise<number> {
  const outcome = await selectOne([
    mapCase(recvCase(ctx.done()), () => ({ kind: 'cancel' as const })),
    mapCase(
      timeoutCase((Math.floor(Math.random() * 100) + 900) * Millisecond),
      () => ({ kind: 'timeout' as const }),
    ),
  ]);

  if (outcome.kind === 'cancel') {
    const cause = ctx.err();
    throw new globalThis.Error(
      `batch activity ${taskID} failed: ${cause instanceof Error ? cause.message : String(cause)}`,
      { cause },
    );
  }

  return taskID;
}

export async function Test_BatchWorkflow(): Promise<void> {
  const testSuite = new WorkflowTestSuite({ ctxProps: [] });
  const env = testSuite.NewTestWorkflowEnvironment();

  await env.RegisterWorkflow(batchWorkflow);
  await env.RegisterActivity(batchActivity);

  const totalSize = 100;
  const concurrency = 20;

  const startTime = Date.now() * 1_000_000;
  await env.ExecuteWorkflow(batchWorkflow, {
    Concurrency: concurrency,
    TotalSize: totalSize,
  });

  expect(Date.now() * 1_000_000 - startTime).toBeLessThan(
    Second * Math.trunc(totalSize / concurrency),
  );
  expect(env.IsWorkflowCompleted()).toBe(true);

  expect(env.GetWorkflowError()).toBeNull();

  const result = { value: [] as number[] };
  env.GetWorkflowResult(result);

  const expected: number[] = [];
  for (let i = 0; i < totalSize; i++) {
    expected.push(i);
  }

  expect(result.value).toEqual(expected);
}

export async function Test_BatchWorkflow_Cancel(): Promise<void> {
  // @go-unlowerable: error aggregation — the TypeScript facts do not specify how errors.Unwrap and multierr.Errors are represented
  return;
}

export async function Test_BatchWorkflowUsingFutures(): Promise<void> {
  const testSuite = new WorkflowTestSuite({ ctxProps: [] });
  const env = testSuite.NewTestWorkflowEnvironment();

  await env.RegisterWorkflow(batchWorkflowUsingFutures);
  await env.RegisterActivity(batchActivity);

  const totalSize = 100;
  const concurrency = 20;

  const startTime = Date.now() * 1_000_000;
  await env.ExecuteWorkflow(batchWorkflowUsingFutures, {
    Concurrency: concurrency,
    TotalSize: totalSize,
  });
  expect(Date.now() * 1_000_000 - startTime).toBeLessThan(
    Second * Math.trunc(totalSize / concurrency),
  );
  expect(env.IsWorkflowCompleted()).toBe(true);

  expect(env.GetWorkflowError()).toBeNull();
  const result = { value: undefined as number[] | undefined };
  env.GetWorkflowResult(result);
  const expected: number[] = [];
  for (let i = 0; i < totalSize; i++) {
    expected.push(i);
  }
  expect(result.value).toEqual(expected);
}

export async function batchWorkflowAssignWithSlice(ctx: internal_Context): Promise<number[]> {
  const totalSize = 5;
  const concurrency = 2;
  const factories: ((p0: internal_Context) => internal_Future)[] = new Array(totalSize);

  for (let i = 0; i < totalSize; i++) {
    const iLocal = i;
    factories[iLocal] = (ctx: internal_Context): internal_Future => {
      const aCtx = WithActivityOptions(
        ctx,
        new internal_ActivityOptions({
          ActivityID: "",
          HeartbeatTimeout: 0,
          ScheduleToCloseTimeout: 0,
          ScheduleToStartTimeout: 10 * Second,
          StartToCloseTimeout: 10 * Second,
          TaskList: "",
          WaitForCancellation: false,
        }),
      );
      return ExecuteActivity(aCtx, batchActivity, iLocal) as unknown as internal_Future;
    };
  }

  const batchFuture = await NewBatchFuture(ctx, concurrency, factories);
  const valuePtr: { value: number[] } = { value: [] };
  await batchFuture.Get(ctx, valuePtr);
  return valuePtr.value;
}

export async function batchWorkflowAssignWithSliceOfPointers(ctx: internal_Context): Promise<number[]> {
  const totalSize = 5;
  const concurrency = 2;
  const factories: ((p0: internal_Context) => internal_Future)[] = new Array(totalSize);
  for (let i = 0; i < totalSize; i++) {
    const iLocal = i;
    factories[iLocal] = (ctx: internal_Context): internal_Future => {
      const aCtx = WithActivityOptions(ctx, new internal_ActivityOptions({
        ActivityID: "",
        HeartbeatTimeout: 0,
        ScheduleToCloseTimeout: 0,
        ScheduleToStartTimeout: 10 * Second,
        StartToCloseTimeout: 10 * Second,
        TaskList: "",
        WaitForCancellation: false
      }));
      return ExecuteActivity(aCtx, batchActivity, iLocal) as unknown as internal_Future;
    };
  }
  const batchFuture = await NewBatchFuture(ctx, concurrency, factories);
  const valuePtr: { value: number[] } = { value: [] };
  await batchFuture.Get(ctx, valuePtr);

  const result: number[] = [];
  for (const v of valuePtr.value) {
    result.push(v);
  }
  return result;
}

export async function batchWorkflowAssignWithNil(ctx: internal_Context): Promise<number[]> {
  const totalSize = 5;
  const concurrency = 2;
  const factories: ((p0: internal_Context) => internal_Future)[] = [];

  for (let i = 0; i < totalSize; i++) {
    const iLocal = i;
    factories[i] = (async (ctx: internal_Context): Promise<internal_Future> => {
      const aCtx = WithActivityOptions(
        ctx,
        new internal_ActivityOptions({
          ActivityID: "",
          HeartbeatTimeout: 0,
          ScheduleToCloseTimeout: 0,
          ScheduleToStartTimeout: 10 * Second,
          StartToCloseTimeout: 10 * Second,
          TaskList: "",
          WaitForCancellation: false,
        }),
      );
      return await ExecuteActivity(aCtx, batchActivity, iLocal);
    }) as unknown as (p0: internal_Context) => internal_Future;
  }

  const batchFuture = await NewBatchFuture(ctx, concurrency, factories);
  await batchFuture.Get(ctx, undefined);
  return null as unknown as number[];
}

export async function Test_BatchFuture_Get(): Promise<void> {
  const tests: { name: string; workflow: unknown; want: number[] }[] = [
    {
      name: "success with nil slice",
      workflow: batchWorkflowAssignWithSlice,
      want: [0, 1, 2, 3, 4],
    },
    {
      name: "success with non-nil slice",
      workflow: batchWorkflowAssignWithSliceOfPointers,
      want: [0, 1, 2, 3, 4],
    },
    {
      name: "success with nil",
      workflow: batchWorkflowAssignWithNil,
      want: [],
    },
  ];

  for (const tt of tests) {
    const testSuite = new WorkflowTestSuite();
    const env = testSuite.NewTestWorkflowEnvironment();
    await env.RegisterWorkflow(tt.workflow);
    await env.RegisterActivity(batchActivity);
    await env.ExecuteWorkflow(tt.workflow);
    expect(env.IsWorkflowCompleted()).toBe(true);
    expect(env.GetWorkflowError()).toBeNull();
    const result = { value: [] as number[] };
    env.GetWorkflowResult(result);
    expect(result.value).toEqual(tt.want);
  }
}
