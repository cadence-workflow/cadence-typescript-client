import { WorkflowExecution as shared_WorkflowExecution } from '../generated/thrift/cadence-idl/com/uber/cadence/WorkflowExecution.js';
import { testWorkflowType } from './activity_test.js';
// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { internal_WorkflowShadower, NewWorkflowShadower, internal_ShadowExitCondition, internal_ShadowOptions, internal_TimeFilter, internal_ShadowMode } from './workflow_shadower.js';
import type { WorkflowServiceClientLike } from './runtime/workflow_service_client_like.js';
import { Hour } from './runtime/time.js';
import { GoTestifySuite } from './runtime/testify_suite.js';
import { goFuncName } from './runtime/reflect.js';
import { GoMockController, NewGoMockClient, NewGoMockController } from './runtime/gomock.js';
import { expect } from 'vitest';
import { IHistory as shared_IHistory } from '../generated/thrift/cadence-idl/com/uber/cadence/History.js';
import { IWorkflowExecutionInfo as shared_IWorkflowExecutionInfo, WorkflowExecutionInfo as shared_WorkflowExecutionInfo } from '../generated/thrift/cadence-idl/com/uber/cadence/WorkflowExecutionInfo.js';
import { getTestReplayWorkflowFullHistory, testReplayWorkflow } from './workflow_replayer_test.js';
import { testDomain } from './internal_task_handlers_test.js';
import { args } from './internal_worker_test.js';
import { NewMockClock } from './runtime/clock.js';
import { internal_ReplayOptions } from './workflow_replayer.js';
import { maxTimestamp, NewQueryBuilder, WorkflowStatus } from './query_builder.js';
import { getFunctionName } from './internal_worker.js';
import { StringPtr } from './common/convert.js';

export class workflowShadowerSuite {
  constructor(init?: Partial<workflowShadowerSuite>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  Assertions: GoTestifySuite = new GoTestifySuite();

  Suite: GoTestifySuite = new GoTestifySuite();

  controller?: GoMockController;

  mockService?: WorkflowServiceClientLike;

  testShadower?: internal_WorkflowShadower;

  testWorkflowHistory?: shared_IHistory;

  testTimestamp: number = 0;

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

  async SetupTest(): Promise<void> {
    this.controller = NewGoMockController(this.T());
    this.mockService = NewGoMockClient(this.controller!);

    const shadowOptions = new internal_ShadowOptions({
      Concurrency: 0,
      ExcludeTypes: [],
      ExitCondition: new internal_ShadowExitCondition(),
      Mode: 0,
      SamplingRate: 0,
      WorkflowCloseTimeFilter: new internal_TimeFilter(),
      WorkflowQuery: "",
      WorkflowStartTimeFilter: new internal_TimeFilter(),
      WorkflowStatus: [],
      WorkflowTypes: [],
    });

    const replayOptions: internal_ReplayOptions = {
      FeatureFlags: {
        WorkflowExecutionAlreadyCompletedErrorEnabled: false,
        AutoforwardingEnabled: false,
        PollerAutoScalerEnabled: false,
        EphemeralTaskListsEnabled: false,
        MetricEmitMode: 0,
      },
    };

    this.testShadower = await NewWorkflowShadower(
      this.mockService!,
      testDomain,
      shadowOptions,
      replayOptions,
      undefined,
    );
    this.NoError(null);

    this.testShadower!.clock = NewMockClock();
    await this.testShadower!.RegisterWorkflow(testReplayWorkflow);

    this.testWorkflowHistory = getTestReplayWorkflowFullHistory();
    this.testTimestamp = Date.now() * 1_000_000;
  }

  TearDownTest(): void {
    this.controller!.Finish();
  }

  TestTimeFilterValidation(): void {
    const testCases: {
      msg: string;
      timeFilter: internal_TimeFilter;
      expectErr: boolean;
      validationFn?: (f: internal_TimeFilter) => void;
    }[] = [
      {
        msg: "maxTimestamp before minTimestamp",
        timeFilter: new internal_TimeFilter({
          MinTimestamp: this.testTimestamp + Hour,
          MaxTimestamp: this.testTimestamp,
        }),
        expectErr: true,
      },
      {
        msg: "neither timestamp is specified",
        timeFilter: new internal_TimeFilter({
          MinTimestamp: 0,
          MaxTimestamp: 0,
        }),
        expectErr: false,
        validationFn: (f: internal_TimeFilter) => {
          expect(f.MinTimestamp === 0).toBe(true);
          expect(f.MaxTimestamp).toEqual(maxTimestamp);
        },
      },
      {
        msg: "only min timestamp is specified",
        timeFilter: new internal_TimeFilter({
          MinTimestamp: this.testTimestamp,
          MaxTimestamp: 0,
        }),
        expectErr: false,
        validationFn: (f: internal_TimeFilter) => {
          expect(f.MinTimestamp).toEqual(this.testTimestamp);
          expect(f.MaxTimestamp).toEqual(maxTimestamp);
        },
      },
      {
        msg: "only max timestamp is specified",
        timeFilter: new internal_TimeFilter({
          MinTimestamp: 0,
          MaxTimestamp: this.testTimestamp,
        }),
        expectErr: false,
        validationFn: (f: internal_TimeFilter) => {
          expect(f.MinTimestamp === 0).toBe(true);
          expect(f.MaxTimestamp).toEqual(this.testTimestamp);
        },
      },
    ];

    for (const test of testCases) {
      this.T().Run(test.msg, () => {
        let err: Error | null = null;
        try {
          test.timeFilter.validateAndPopulateFields();
        } catch (caught) {
          if (!(caught instanceof Error)) throw caught;
          err = caught;
        }

        if (test.expectErr) {
          expect(err).not.toBeNull();
          return;
        }

        expect(err).toBeNull();
        test.validationFn!(test.timeFilter);
      });
    }
  }

  TestTimeFilterIsEmpty(): void {
    const testCases: { msg: string; filter: internal_TimeFilter | undefined; isEmpty: boolean }[] = [
      {
        msg: "nil pointer",
        filter: undefined,
        isEmpty: true,
      },
      {
        msg: "neither field is specified",
        filter: new internal_TimeFilter({ MaxTimestamp: 0, MinTimestamp: 0 }),
        isEmpty: true,
      },
      {
        msg: "not empty",
        filter: new internal_TimeFilter({ MaxTimestamp: Date.now() * 1_000_000, MinTimestamp: 0 }),
        isEmpty: false,
      },
    ];

    for (const test of testCases) {
      this.T().Run(test.msg, (_t: unknown) => {
        expect(test.filter === undefined ? true : test.filter.isEmpty()).toEqual(test.isEmpty);
      });
    }
  }

  async TestShadowOptionsValidation(): Promise<void> {
    const testCases: {
      msg: string;
      options: internal_ShadowOptions;
      expectErr: boolean;
      validationFn?: (options: internal_ShadowOptions) => Promise<void>;
    }[] = [
      {
        msg: "exit condition not specified in continuous mode",
        options: new internal_ShadowOptions({
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
        }),
        expectErr: true,
      },
      {
        msg: "both query and other filters are specified",
        options: new internal_ShadowOptions({
          Concurrency: 0,
          ExcludeTypes: [],
          ExitCondition: new internal_ShadowExitCondition(),
          Mode: 0,
          SamplingRate: 0,
          WorkflowCloseTimeFilter: new internal_TimeFilter(),
          WorkflowQuery: "some random query",
          WorkflowStartTimeFilter: new internal_TimeFilter({
            MaxTimestamp: 0,
            MinTimestamp: Date.now() * 1_000_000,
          }),
          WorkflowStatus: [],
          WorkflowTypes: [],
        }),
        expectErr: true,
      },
      {
        msg: "populate sampling rate, concurrency and status",
        options: new internal_ShadowOptions({
          Concurrency: 0,
          ExcludeTypes: [],
          ExitCondition: new internal_ShadowExitCondition(),
          Mode: 0,
          SamplingRate: 0,
          WorkflowCloseTimeFilter: new internal_TimeFilter(),
          WorkflowQuery: "",
          WorkflowStartTimeFilter: new internal_TimeFilter(),
          WorkflowStatus: [],
          WorkflowTypes: [],
        }),
        expectErr: false,
        validationFn: async (options) => {
          expect(options.WorkflowQuery).toEqual("(CloseTime = missing)");
          expect(options.SamplingRate).toEqual(1.0);
          expect(options.Concurrency).toEqual(1);
        },
      },
      {
        msg: "construct query",
        options: new internal_ShadowOptions({
          Concurrency: 0,
          ExcludeTypes: [],
          ExitCondition: new internal_ShadowExitCondition(),
          Mode: 0,
          SamplingRate: 0,
          WorkflowCloseTimeFilter: new internal_TimeFilter(),
          WorkflowQuery: "",
          WorkflowStartTimeFilter: new internal_TimeFilter({
            MinTimestamp: this.testTimestamp - Hour,
            MaxTimestamp: this.testTimestamp,
          }),
          WorkflowStatus: [WorkflowStatus.WorkflowStatusOpen],
          WorkflowTypes: [testWorkflowType],
        }),
        expectErr: false,
        validationFn: async (options) => {
          const queryBuilder = NewQueryBuilder();
          const withTypes = await queryBuilder.WorkflowTypes(["testWorkflowType"]);
          const withStatus = await withTypes.WorkflowStatus([WorkflowStatus.WorkflowStatusOpen]);
          const withStartTime = await withStatus.StartTime(
            this.testTimestamp - Hour,
            this.testTimestamp,
          );
          const expectedQuery = withStartTime.Build();

          expect(options.WorkflowQuery).toEqual(expectedQuery);
        },
      },
    ];

    for (const test of testCases) {
      await this.Run(test.msg, async () => {
        let err: Error | null = null;
        try {
          await test.options.validateAndPopulateFields();
        } catch (caught) {
          if (!(caught instanceof Error)) throw caught;
          err = caught;
        }

        if (test.expectErr) {
          expect(err).not.toBeNull();
          return;
        }

        expect(err).toBeNull();
        if (test.validationFn !== undefined) {
          await test.validationFn(test.options);
        }
      });
    }
  }

  async TestWorkflowRegistration(): Promise<void> {
    const wfName = (await this.testShadower!.GetRegisteredWorkflows())[0].WorkflowType().Name;
    const fnName = getFunctionName(testReplayWorkflow);
    this.Equal(fnName, wfName);

    const fn = (await this.testShadower!.GetRegisteredWorkflows())[0].GetFunction();
    this.Equal(fnName, goFuncName(fn));
  }

}

export function TestWorkflowShadowerSuite(): void {
  const s = new workflowShadowerSuite();
}

export async function newTestWorkflowExecutions(size: number): Promise<shared_IWorkflowExecutionInfo[]> {
    const executions = new Array<shared_IWorkflowExecutionInfo>(size);
    for (let i = 0; i !== size; i++) {
        executions[i] = new shared_WorkflowExecutionInfo({
            execution: new shared_WorkflowExecution({
                workflowId: StringPtr("workflowID")!,
                runId: StringPtr("runID")!,
            }),
        });
    }
    return executions;
}
