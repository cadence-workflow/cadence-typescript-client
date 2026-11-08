// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import type { WorkflowServiceClientLike } from './runtime/workflow_service_client_like.js';
import { GoTestifySuite } from './runtime/testify_suite.js';
import { GoMockController, NewGoMockClient } from './runtime/gomock.js';
import { args } from './internal_worker_test.js';
import { newRegistry } from './registry.js';
import { workerExecutionParameters } from './worker.js';
import { newShadowWorker } from './workflow_shadower_worker.js';
import { testDomain } from './internal_task_handlers_test.js';
import { NoopLogger } from './runtime/logging.js';
import { testTaskList } from './workflow_replayer_test.js';
import { internal_ShadowExitCondition, internal_ShadowMode, internal_ShadowOptions, internal_TimeFilter } from './workflow_shadower.js';

export class shadowWorkerSuite {
  constructor(init?: Partial<shadowWorkerSuite>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  Assertions: GoTestifySuite = new GoTestifySuite();

  Suite: GoTestifySuite = new GoTestifySuite();

  controller?: GoMockController;

  mockService?: WorkflowServiceClientLike;

  T = (...args: Parameters<GoTestifySuite['T']>): ReturnType<GoTestifySuite['T']> => this.Assertions.T(...args);

  SetT = (...args: Parameters<GoTestifySuite['SetT']>): ReturnType<GoTestifySuite['SetT']> => this.Assertions.SetT(...args);

  Assert = (...args: Parameters<GoTestifySuite['Assert']>): ReturnType<GoTestifySuite['Assert']> => this.Assertions.Assert(...args);

  Require = (...args: Parameters<GoTestifySuite['Require']>): ReturnType<GoTestifySuite['Require']> => this.Assertions.Require(...args);

  Run = (...args: Parameters<GoTestifySuite['Run']>): ReturnType<GoTestifySuite['Run']> => this.Assertions.Run(...args);

  Equal = (...args: Parameters<GoTestifySuite['Equal']>): ReturnType<GoTestifySuite['Equal']> => this.Assertions.Equal(...args);

  NotEqual = (...args: Parameters<GoTestifySuite['NotEqual']>): ReturnType<GoTestifySuite['NotEqual']> => this.Assertions.NotEqual(...args);

  EqualValues = (...args: Parameters<GoTestifySuite['EqualValues']>): ReturnType<GoTestifySuite['EqualValues']> => this.Assertions.EqualValues(...args);

  Exactly = (...args: Parameters<GoTestifySuite['Exactly']>): ReturnType<GoTestifySuite['Exactly']> => this.Assertions.Exactly(...args);

  Same = (...args: Parameters<GoTestifySuite['Same']>): ReturnType<GoTestifySuite['Same']> => this.Assertions.Same(...args);

  NotSame = (...args: Parameters<GoTestifySuite['NotSame']>): ReturnType<GoTestifySuite['NotSame']> => this.Assertions.NotSame(...args);

  True = (...args: Parameters<GoTestifySuite['True']>): ReturnType<GoTestifySuite['True']> => this.Assertions.True(...args);

  False = (...args: Parameters<GoTestifySuite['False']>): ReturnType<GoTestifySuite['False']> => this.Assertions.False(...args);

  Nil = (...args: Parameters<GoTestifySuite['Nil']>): ReturnType<GoTestifySuite['Nil']> => this.Assertions.Nil(...args);

  NotNil = (...args: Parameters<GoTestifySuite['NotNil']>): ReturnType<GoTestifySuite['NotNil']> => this.Assertions.NotNil(...args);

  Zero = (...args: Parameters<GoTestifySuite['Zero']>): ReturnType<GoTestifySuite['Zero']> => this.Assertions.Zero(...args);

  NotZero = (...args: Parameters<GoTestifySuite['NotZero']>): ReturnType<GoTestifySuite['NotZero']> => this.Assertions.NotZero(...args);

  Error = (...args: Parameters<GoTestifySuite['Error']>): ReturnType<GoTestifySuite['Error']> => this.Assertions.Error(...args);

  NoError = (...args: Parameters<GoTestifySuite['NoError']>): ReturnType<GoTestifySuite['NoError']> => this.Assertions.NoError(...args);

  EqualError = (...args: Parameters<GoTestifySuite['EqualError']>): ReturnType<GoTestifySuite['EqualError']> => this.Assertions.EqualError(...args);

  ErrorContains = (...args: Parameters<GoTestifySuite['ErrorContains']>): ReturnType<GoTestifySuite['ErrorContains']> => this.Assertions.ErrorContains(...args);

  ErrorIs = (...args: Parameters<GoTestifySuite['ErrorIs']>): ReturnType<GoTestifySuite['ErrorIs']> => this.Assertions.ErrorIs(...args);

  NotErrorIs = (...args: Parameters<GoTestifySuite['NotErrorIs']>): ReturnType<GoTestifySuite['NotErrorIs']> => this.Assertions.NotErrorIs(...args);

  Len = (...args: Parameters<GoTestifySuite['Len']>): ReturnType<GoTestifySuite['Len']> => this.Assertions.Len(...args);

  Empty = (...args: Parameters<GoTestifySuite['Empty']>): ReturnType<GoTestifySuite['Empty']> => this.Assertions.Empty(...args);

  NotEmpty = (...args: Parameters<GoTestifySuite['NotEmpty']>): ReturnType<GoTestifySuite['NotEmpty']> => this.Assertions.NotEmpty(...args);

  Contains = (...args: Parameters<GoTestifySuite['Contains']>): ReturnType<GoTestifySuite['Contains']> => this.Assertions.Contains(...args);

  NotContains = (...args: Parameters<GoTestifySuite['NotContains']>): ReturnType<GoTestifySuite['NotContains']> => this.Assertions.NotContains(...args);

  ElementsMatch = (...args: Parameters<GoTestifySuite['ElementsMatch']>): ReturnType<GoTestifySuite['ElementsMatch']> => this.Assertions.ElementsMatch(...args);

  Subset = (...args: Parameters<GoTestifySuite['Subset']>): ReturnType<GoTestifySuite['Subset']> => this.Assertions.Subset(...args);

  Greater = (...args: Parameters<GoTestifySuite['Greater']>): ReturnType<GoTestifySuite['Greater']> => this.Assertions.Greater(...args);

  GreaterOrEqual = (...args: Parameters<GoTestifySuite['GreaterOrEqual']>): ReturnType<GoTestifySuite['GreaterOrEqual']> => this.Assertions.GreaterOrEqual(...args);

  Less = (...args: Parameters<GoTestifySuite['Less']>): ReturnType<GoTestifySuite['Less']> => this.Assertions.Less(...args);

  LessOrEqual = (...args: Parameters<GoTestifySuite['LessOrEqual']>): ReturnType<GoTestifySuite['LessOrEqual']> => this.Assertions.LessOrEqual(...args);

  InDelta = (...args: Parameters<GoTestifySuite['InDelta']>): ReturnType<GoTestifySuite['InDelta']> => this.Assertions.InDelta(...args);

  Panics = (...args: Parameters<GoTestifySuite['Panics']>): ReturnType<GoTestifySuite['Panics']> => this.Assertions.Panics(...args);

  NotPanics = (...args: Parameters<GoTestifySuite['NotPanics']>): ReturnType<GoTestifySuite['NotPanics']> => this.Assertions.NotPanics(...args);

  IsType = (...args: Parameters<GoTestifySuite['IsType']>): ReturnType<GoTestifySuite['IsType']> => this.Assertions.IsType(...args);

  Regexp = (...args: Parameters<GoTestifySuite['Regexp']>): ReturnType<GoTestifySuite['Regexp']> => this.Assertions.Regexp(...args);

  JSONEq = (...args: Parameters<GoTestifySuite['JSONEq']>): ReturnType<GoTestifySuite['JSONEq']> => this.Assertions.JSONEq(...args);

  WithinDuration = (...args: Parameters<GoTestifySuite['WithinDuration']>): ReturnType<GoTestifySuite['WithinDuration']> => this.Assertions.WithinDuration(...args);

  Fail = (...args: Parameters<GoTestifySuite['Fail']>): ReturnType<GoTestifySuite['Fail']> => this.Assertions.Fail(...args);

  FailNow = (...args: Parameters<GoTestifySuite['FailNow']>): ReturnType<GoTestifySuite['FailNow']> => this.Assertions.FailNow(...args);

  SetupTest(): void {
    this.controller = new GoMockController(this.T());
    this.mockService = NewGoMockClient(this.controller!);
  }

  TearDownTest(): void {
    this.controller!.Finish();
  }

  async TestNewShadowWorker(): Promise<void> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async TestStartShadowWorker_Failed_InvalidShadowOption(): Promise<void> {
    const shadowOptions = new internal_ShadowOptions({
      Concurrency: 0,
      ExcludeTypes: [],
      ExitCondition: new internal_ShadowExitCondition(),
      Mode: internal_ShadowMode.ShadowModeContinuous,
      SamplingRate: 0,
      WorkflowCloseTimeFilter: new internal_TimeFilter(),
      WorkflowQuery: "",
      WorkflowStartTimeFilter: new internal_TimeFilter(),
      WorkflowStatus: [],
      WorkflowTypes: [],
    });
    const params = new workerExecutionParameters({
      TaskList: testTaskList,
      Logger: NoopLogger(),
      SessionResourceID: "",
      WorkerStopTimeout: 0,
    });
    const registry = await newRegistry();
    const shadowWorker = await newShadowWorker(
      this.mockService!,
      testDomain,
      shadowOptions,
      params,
      registry,
    );

    let startError: Error | null = null;
    try {
      await shadowWorker.Start();
    } catch (err) {
      if (!(err instanceof Error)) throw err;
      startError = err;
    }
    this.Error(startError);
  }

}

export function TestShadowWorkerSuite(): void {
  const s = new shadowWorkerSuite();
}
