// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { WorkflowTestSuite } from '../../internal/workflow_testsuite.js';
import { Millisecond, Second } from '../../internal/runtime/time.js';
import { GoTestifySuite } from '../../internal/runtime/testify_suite.js';
import { expect } from 'vitest';
import { args } from '../../internal/internal_worker_test.js';
import { NoopLogger } from '../../internal/runtime/logging.js';
import { GetSignalChannel, NewSelector, Now, internal_Future } from '../../internal/workflow.js';
import { New } from './resettable_timer.js';
import { internal_Context } from '../../internal/context.js';

export class ResettableTimerTestSuite extends WorkflowTestSuite {
  constructor(init?: Partial<ResettableTimerTestSuite>) {
    super(init);
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  Suite: GoTestifySuite = new GoTestifySuite();

  T = (...args: Parameters<GoTestifySuite['T']>): ReturnType<GoTestifySuite['T']> => this.Suite.T(...args);

  SetT = (...args: Parameters<GoTestifySuite['SetT']>): ReturnType<GoTestifySuite['SetT']> => this.Suite.SetT(...args);

  Assert = (...args: Parameters<GoTestifySuite['Assert']>): ReturnType<GoTestifySuite['Assert']> => this.Suite.Assert(...args);

  Require = (...args: Parameters<GoTestifySuite['Require']>): ReturnType<GoTestifySuite['Require']> => this.Suite.Require(...args);

  Run = (...args: Parameters<GoTestifySuite['Run']>): ReturnType<GoTestifySuite['Run']> => this.Suite.Run(...args);

  Equal = (...args: Parameters<GoTestifySuite['Equal']>): ReturnType<GoTestifySuite['Equal']> => this.Suite.Equal(...args);

  NotEqual = (...args: Parameters<GoTestifySuite['NotEqual']>): ReturnType<GoTestifySuite['NotEqual']> => this.Suite.NotEqual(...args);

  EqualValues = (...args: Parameters<GoTestifySuite['EqualValues']>): ReturnType<GoTestifySuite['EqualValues']> => this.Suite.EqualValues(...args);

  Exactly = (...args: Parameters<GoTestifySuite['Exactly']>): ReturnType<GoTestifySuite['Exactly']> => this.Suite.Exactly(...args);

  Same = (...args: Parameters<GoTestifySuite['Same']>): ReturnType<GoTestifySuite['Same']> => this.Suite.Same(...args);

  NotSame = (...args: Parameters<GoTestifySuite['NotSame']>): ReturnType<GoTestifySuite['NotSame']> => this.Suite.NotSame(...args);

  True = (...args: Parameters<GoTestifySuite['True']>): ReturnType<GoTestifySuite['True']> => this.Suite.True(...args);

  False = (...args: Parameters<GoTestifySuite['False']>): ReturnType<GoTestifySuite['False']> => this.Suite.False(...args);

  Nil = (...args: Parameters<GoTestifySuite['Nil']>): ReturnType<GoTestifySuite['Nil']> => this.Suite.Nil(...args);

  NotNil = (...args: Parameters<GoTestifySuite['NotNil']>): ReturnType<GoTestifySuite['NotNil']> => this.Suite.NotNil(...args);

  Zero = (...args: Parameters<GoTestifySuite['Zero']>): ReturnType<GoTestifySuite['Zero']> => this.Suite.Zero(...args);

  NotZero = (...args: Parameters<GoTestifySuite['NotZero']>): ReturnType<GoTestifySuite['NotZero']> => this.Suite.NotZero(...args);

  Error = (...args: Parameters<GoTestifySuite['Error']>): ReturnType<GoTestifySuite['Error']> => this.Suite.Error(...args);

  NoError = (...args: Parameters<GoTestifySuite['NoError']>): ReturnType<GoTestifySuite['NoError']> => this.Suite.NoError(...args);

  EqualError = (...args: Parameters<GoTestifySuite['EqualError']>): ReturnType<GoTestifySuite['EqualError']> => this.Suite.EqualError(...args);

  ErrorContains = (...args: Parameters<GoTestifySuite['ErrorContains']>): ReturnType<GoTestifySuite['ErrorContains']> => this.Suite.ErrorContains(...args);

  ErrorIs = (...args: Parameters<GoTestifySuite['ErrorIs']>): ReturnType<GoTestifySuite['ErrorIs']> => this.Suite.ErrorIs(...args);

  NotErrorIs = (...args: Parameters<GoTestifySuite['NotErrorIs']>): ReturnType<GoTestifySuite['NotErrorIs']> => this.Suite.NotErrorIs(...args);

  Len = (...args: Parameters<GoTestifySuite['Len']>): ReturnType<GoTestifySuite['Len']> => this.Suite.Len(...args);

  Empty = (...args: Parameters<GoTestifySuite['Empty']>): ReturnType<GoTestifySuite['Empty']> => this.Suite.Empty(...args);

  NotEmpty = (...args: Parameters<GoTestifySuite['NotEmpty']>): ReturnType<GoTestifySuite['NotEmpty']> => this.Suite.NotEmpty(...args);

  Contains = (...args: Parameters<GoTestifySuite['Contains']>): ReturnType<GoTestifySuite['Contains']> => this.Suite.Contains(...args);

  NotContains = (...args: Parameters<GoTestifySuite['NotContains']>): ReturnType<GoTestifySuite['NotContains']> => this.Suite.NotContains(...args);

  ElementsMatch = (...args: Parameters<GoTestifySuite['ElementsMatch']>): ReturnType<GoTestifySuite['ElementsMatch']> => this.Suite.ElementsMatch(...args);

  Subset = (...args: Parameters<GoTestifySuite['Subset']>): ReturnType<GoTestifySuite['Subset']> => this.Suite.Subset(...args);

  Greater = (...args: Parameters<GoTestifySuite['Greater']>): ReturnType<GoTestifySuite['Greater']> => this.Suite.Greater(...args);

  GreaterOrEqual = (...args: Parameters<GoTestifySuite['GreaterOrEqual']>): ReturnType<GoTestifySuite['GreaterOrEqual']> => this.Suite.GreaterOrEqual(...args);

  Less = (...args: Parameters<GoTestifySuite['Less']>): ReturnType<GoTestifySuite['Less']> => this.Suite.Less(...args);

  LessOrEqual = (...args: Parameters<GoTestifySuite['LessOrEqual']>): ReturnType<GoTestifySuite['LessOrEqual']> => this.Suite.LessOrEqual(...args);

  InDelta = (...args: Parameters<GoTestifySuite['InDelta']>): ReturnType<GoTestifySuite['InDelta']> => this.Suite.InDelta(...args);

  Panics = (...args: Parameters<GoTestifySuite['Panics']>): ReturnType<GoTestifySuite['Panics']> => this.Suite.Panics(...args);

  NotPanics = (...args: Parameters<GoTestifySuite['NotPanics']>): ReturnType<GoTestifySuite['NotPanics']> => this.Suite.NotPanics(...args);

  IsType = (...args: Parameters<GoTestifySuite['IsType']>): ReturnType<GoTestifySuite['IsType']> => this.Suite.IsType(...args);

  Regexp = (...args: Parameters<GoTestifySuite['Regexp']>): ReturnType<GoTestifySuite['Regexp']> => this.Suite.Regexp(...args);

  JSONEq = (...args: Parameters<GoTestifySuite['JSONEq']>): ReturnType<GoTestifySuite['JSONEq']> => this.Suite.JSONEq(...args);

  WithinDuration = (...args: Parameters<GoTestifySuite['WithinDuration']>): ReturnType<GoTestifySuite['WithinDuration']> => this.Suite.WithinDuration(...args);

  Fail = (...args: Parameters<GoTestifySuite['Fail']>): ReturnType<GoTestifySuite['Fail']> => this.Suite.Fail(...args);

  FailNow = (...args: Parameters<GoTestifySuite['FailNow']>): ReturnType<GoTestifySuite['FailNow']> => this.Suite.FailNow(...args);

  SetupTest(): void {
    this.SetLogger(NoopLogger());
  }

  async TestTimerFiresAfterExpiration(): Promise<void> {
    const wf = async (ctx: internal_Context): Promise<void> => {
      const startTime = Now(ctx);
      const timer = await New(ctx, 5 * Second);

      let timerFired = false;
      await NewSelector(ctx)
        .AddFuture(timer.Future!, async (f) => {
          await f.Get(ctx, null);
          timerFired = true;
        })
        .Select(ctx);

      const elapsedTime = Now(ctx) - startTime;
      this.Equal(5 * Second, elapsedTime);
      this.True(timerFired);
    };

    const env = this.NewTestWorkflowEnvironment();
    env.Test(this.T());
    await env.ExecuteWorkflow(wf);
    this.True(env.IsWorkflowCompleted());
    this.NoError(env.GetWorkflowError());
  }

  async TestTimerDoesNotFireWhenKeptReset(): Promise<void> {
    const wf = async (ctx: internal_Context): Promise<void> => {
      const d = 2 * Second;
      const timer = await New(ctx, d);
      const activityCh = GetSignalChannel(ctx, "activity");
      const stopCh = GetSignalChannel(ctx, "stop");

      let timerFired = false;
      let activityCount = 0;
      let stopped = false;

      while (!stopped) {
        const selector = NewSelector(ctx);

        selector.AddFuture(timer.Future!, (f) => {
          timerFired = true;
        });

        selector.AddReceive(activityCh, (c, more) => {
          const signalBox: { value: string } = { value: '' };
          c.Receive(ctx, signalBox);
          activityCount++;
          timer.Reset(d);
        });

        selector.AddReceive(stopCh, (c, more) => {
          const stopBox: { value: boolean } = { value: false };
          c.Receive(ctx, stopBox);
          stopped = true;
        });

        await selector.Select(ctx);
      }

      expect(activityCount).toEqual(3);
      expect(timerFired).toBe(false);
    };

    const env = this.NewTestWorkflowEnvironment();
    env.Test(this.T());

    env.RegisterDelayedCallback(() => {
      env.SignalWorkflow("activity", "scan1");
    }, 500 * Millisecond);

    env.RegisterDelayedCallback(() => {
      env.SignalWorkflow("activity", "scan2");
    }, 1500 * Millisecond);

    env.RegisterDelayedCallback(() => {
      env.SignalWorkflow("activity", "scan3");
    }, 2500 * Millisecond);

    env.RegisterDelayedCallback(() => {
      env.SignalWorkflow("stop", true);
    }, 4 * Second);

    await env.ExecuteWorkflow(wf);
    expect(env.IsWorkflowCompleted()).toBe(true);
    expect(env.GetWorkflowError()).toBeNull();
  }

  async TestTimerFiresAfterResetsStop(): Promise<void> {
    const wf = async (ctx: internal_Context): Promise<void> => {
      const d = 5 * Second;
      const timer = await New(ctx, d);

      timer.Reset(d);
      timer.Reset(2 * Second);

      let timerFired = false;
      await NewSelector(ctx)
        .AddFuture(timer.Future!, async (f) => {
          await f.Get(ctx, null);
          this.NoError(null);
          timerFired = true;
        })
        .Select(ctx);

      this.True(timerFired);
    };

    const env = this.NewTestWorkflowEnvironment();
    env.Test(this.T());
    await env.ExecuteWorkflow(wf);
    this.True(env.IsWorkflowCompleted());
    this.NoError(env.GetWorkflowError());
  }

  async TestTimerResetAfterFireIsNoop(): Promise<void> {
    const wf = async (ctx: any): Promise<void> => {
      const d = 1 * Second;
      const timer = await New(ctx, d);

      await timer.Future!.Get(ctx, null);
      expect(timer.Future!.IsReady()).toBe(true);

      timer.Reset(5 * Second);
      expect(timer.Future!.IsReady()).toBe(true);

      timer.Reset(d);
      expect(timer.Future!.IsReady()).toBe(true);
    };

    const env = this.NewTestWorkflowEnvironment();
    env.Test(this.T());
    await env.ExecuteWorkflow(wf);
    expect(env.IsWorkflowCompleted()).toBe(true);
    expect(env.GetWorkflowError()).toBeNull();
  }

  async TestTimerResetWithDifferentDurations(): Promise<void> {
    const wf = async (ctx: internal_Context): Promise<void> => {
      const timer = await New(ctx, 10 * Second);

      timer.Reset(1 * Second);

      let timerFired = false;
      const startTime = Now(ctx);

      await NewSelector(ctx)
        .AddFuture(timer.Future!, async (f: internal_Future): Promise<void> => {
          try {
            await f.Get(ctx, null);
            this.NoError(null);
          } catch (err) {
            if (!(err instanceof Error)) throw err;
            this.NoError(err);
          }
          timerFired = true;
        })
        .Select(ctx);

      const elapsed = Now(ctx) - startTime;

      this.True(timerFired);
      this.Less(elapsed, 5 * Second);
    };

    const env = this.NewTestWorkflowEnvironment();
    env.Test(this.T());
    await env.ExecuteWorkflow(wf);
    this.True(env.IsWorkflowCompleted());
    this.NoError(env.GetWorkflowError());
  }

}

export function TestResettableTimerSuite(): void {}
