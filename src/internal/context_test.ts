// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { internal_Context, WithCancel } from './context.js';
import { Hour, Minute, Second } from './runtime/time.js';
import { expect } from 'vitest';
import { Go, Sleep, ExecuteActivity, NewSelector, WithActivityOptions, internal_Future } from './workflow.js';
import { WorkflowTestSuite } from './workflow_testsuite.js';
import { newTestWorkflowEnv } from './test_helpers_test.js';
import { IsCanceledError } from './error.js';
import { internal_ActivityOptions } from './activity.js';
import { Context } from './runtime/context.js';
import { Anything } from './runtime/testify_mock.js';

export interface cancelerContext {
  ctx?: internal_Context;
  canceler?: () => void | Promise<void>;
}

export interface variant {
  name: string;
  separateStart: boolean;
  separateSelect: boolean;
}

export async function TestContextChildParentCancelRace(): Promise<void> {
  const env = newTestWorkflowEnv();

  const wf = async (ctx: internal_Context): Promise<void> => {
    const [parentCtx, parentCancel] = await WithCancel(ctx);

    try {
      const children: cancelerContext[] = [];
      const numChildren = 100;

      for (let i = 0; i < numChildren; i++) {
        const [c, canceler] = await WithCancel(parentCtx);
        children.push({
          ctx: c,
          canceler,
        });
      }

      for (let i = 0; i < numChildren; i++) {
        void (async () => {
          await children[i].canceler!();
        })();

        if (i === numChildren / 2) {
          void (async () => {
            await parentCancel();
          })();
        }
      }
    } finally {
      await parentCancel();
    }
  };

  await env.RegisterWorkflow(wf);
  await env.ExecuteWorkflow(wf);
  expect(env.IsWorkflowCompleted()).toBe(true);
  expect(env.GetWorkflowError()).toBeNull();
}

export async function TestContextConcurrentCancelRace(): Promise<void> {
  const env = new WorkflowTestSuite({ ctxProps: [] }).NewTestWorkflowEnvironment();
  const wf = async (ctx: internal_Context): Promise<void> => {
    const [ctxLocal, cancel] = await WithCancel(ctx);
    const racyCancel = async (ctx: internal_Context): Promise<void> => {
      try {
        await Sleep(ctx, Hour);
      } catch (e) {
        if (!(e instanceof Error)) throw e;
      } finally {
        await cancel();
      }
    };

    for (let i = 0; i < 10; i++) {
      void Go(ctxLocal, racyCancel);
    }

    try {
      await Sleep(ctxLocal, Minute);
    } catch (e) {
      if (!(e instanceof Error)) throw e;
    }
  };

  await env.RegisterWorkflow(wf);
  await env.ExecuteWorkflow(wf);
  expect(env.IsWorkflowCompleted()).toBe(true);
  expect(env.GetWorkflowError()).toBeNull();
}

export async function TestContextAddChildCancelParentRace(): Promise<void> {
  const env = new WorkflowTestSuite({ ctxProps: [] }).NewTestWorkflowEnvironment();

  const wf = async (ctx: internal_Context): Promise<void> => {
    const [ctxLocal, cancel] = await WithCancel(ctx);

    const racyCancel = async (ctx: internal_Context): Promise<void> => {
      try {
        try {
          try {
            await Sleep(ctx, Hour);
          } catch (err) {
            if (!(err instanceof Error)) throw err;
          }
        } finally {
          const [, ccancel] = await WithCancel(ctx);
          await cancel();
          await ccancel();
        }
      } finally {
        await cancel();
      }
    };

    for (let i = 0; i < 10; i++) {
      await Go(ctxLocal, racyCancel);
    }

    try {
      await Sleep(ctxLocal, Minute);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
    }

    return;
  };

  await env.RegisterWorkflow(wf);
  await env.ExecuteWorkflow(wf);
  expect(env.IsWorkflowCompleted()).toBe(true);
  expect(env.GetWorkflowError()).toBeNull();
}

export async function TestContextCancellationOrderDeterminism(): Promise<void> {
  const check = async (separateStart: boolean, separateSelect: boolean): Promise<void> => {
    const env = newTestWorkflowEnv();
    const act = (ctx: Context): void => {};
    const wf = async (ctx: internal_Context): Promise<void> => {
      const [ctxLocal, cancel] = await WithCancel(ctx);

      Go(ctxLocal, async (childCtx: internal_Context) => {
        await Sleep(childCtx, Minute).catch((err) => {
          if (!(err instanceof Error)) throw err;
        });
        await cancel();
      });

      const activityCtx = WithActivityOptions(
        ctxLocal,
        new internal_ActivityOptions({
          ActivityID: "",
          HeartbeatTimeout: 0,
          ScheduleToCloseTimeout: Hour,
          ScheduleToStartTimeout: Hour,
          StartToCloseTimeout: Hour,
          TaskList: "",
          WaitForCancellation: false,
        }),
      );
      const s = NewSelector(activityCtx);
      const result: number[] = [];

      for (let i = 0; i < 10; i++) {
        const iLocal = i;
        const [cctx, ccancel] = await WithCancel(activityCtx);

        s.AddFuture(await ExecuteActivity(cctx, act), async (f: internal_Future) => {
          await ccancel();
          let err: Error | null = null;
          try {
            await f.Get(activityCtx, undefined);
          } catch (caught) {
            if (!(caught instanceof Error)) throw caught;
            err = caught;
          }

          if (err == null || !IsCanceledError(err)) {
            throw new Error(
              "activity completion or failure for some reason other than cancel",
            );
          }
          result.push(iLocal);
        });

        if (separateStart) {
          await Sleep(activityCtx, Second).catch((err) => {
            if (!(err instanceof Error)) throw err;
          });
        }
      }

      for (let i = 0; i < 10; i++) {
        if (separateSelect) {
          await Sleep(activityCtx, Second).catch((err) => {
            if (!(err instanceof Error)) throw err;
          });
        }
        await s.Select(activityCtx);
      }
    };

    await env.RegisterWorkflow(wf);
    await env.RegisterActivity(act);

    (await env.OnActivity(act, Anything))
      .After(5 * Minute)
      .Return(null);

    await env.ExecuteWorkflow(wf);
    expect(env.GetWorkflowError()).toBeNull();

    const result: number[] = [];
    env.GetWorkflowResult(result);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toEqual(0);
    expect(result.slice(1)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  };

  const variants: variant[] = [
    { name: "many in one decision", separateStart: false, separateSelect: false },
    { name: "many started at once, selected slowly", separateStart: false, separateSelect: true },
    { name: "started slowly, selected quickly", separateStart: true, separateSelect: false },
    { name: "started and selected slowly", separateStart: true, separateSelect: true },
  ];

  for (const test of variants) {
    await check(test.separateStart, test.separateSelect);
  }
}

export function BenchmarkSliceMaintenance(): void {}
