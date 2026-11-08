// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { Hour } from './runtime/time.js';
import { GoTestifySuite } from './runtime/testify_suite.js';
import { expect } from 'vitest';
import { args } from './internal_worker_test.js';
import { NewQueryBuilder, WorkflowStatus, ToWorkflowStatus } from './query_builder.js';
import { testWorkflowType } from './activity_test.js';

export class queryBuilderSuite {
  constructor(init?: Partial<queryBuilderSuite>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  Assertions: GoTestifySuite = new GoTestifySuite();

  Suite: GoTestifySuite = new GoTestifySuite();

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
  }

  async TestWorkflowTypeQuery(): Promise<void> {
    const testCases: { msg: string; workflowTypes: string[]; expectedQuery: string }[] = [
      {
        msg: "empty workflowTypes",
        workflowTypes: [],
        expectedQuery: "",
      },
      {
        msg: "single workflowType",
        workflowTypes: [testWorkflowType],
        expectedQuery: `(WorkflowType = "test-workflow-type")`,
      },
      {
        msg: "multiple workflowTypes",
        workflowTypes: ["testWorkflowType1", "testWorkflowType2"],
        expectedQuery: `(WorkflowType = "testWorkflowType1" or WorkflowType = "testWorkflowType2")`,
      },
    ];

    for (const test of testCases) {
      await this.T().Run(test.msg, async (_t: unknown) => {
        const builder = NewQueryBuilder();
        await builder.WorkflowTypes(test.workflowTypes);
        this.Equal(test.expectedQuery, builder.Build());
      });
    }
  }

  async TestWorkflowStatusQuery(): Promise<void> {
    const testCases: { msg: string; workflowStatuses: WorkflowStatus[]; expectedQuery: string }[] = [
      {
        msg: "empty workflow status",
        workflowStatuses: [],
        expectedQuery: "",
      },
      {
        msg: "open workflow",
        workflowStatuses: [WorkflowStatus.WorkflowStatusOpen],
        expectedQuery: "(CloseTime = missing)",
      },
      {
        msg: "closed workflow",
        workflowStatuses: [WorkflowStatus.WorkflowStatusClosed],
        expectedQuery: "(CloseTime != missing)",
      },
      {
        msg: "multiple workflow statuses",
        workflowStatuses: [
          WorkflowStatus.WorkflowStatusFailed,
          WorkflowStatus.WorkflowStatusTimedOut,
        ],
        expectedQuery: `(CloseStatus = "FAILED" or CloseStatus = "TIMED_OUT")`,
      },
      {
        msg: "all workflows",
        workflowStatuses: [
          WorkflowStatus.WorkflowStatusTerminated,
          WorkflowStatus.WorkflowStatusALL,
        ],
        expectedQuery: "",
      },
    ];

    for (const test of testCases) {
      await this.T().Run(test.msg, async (t: any) => {
        const builder = NewQueryBuilder();
        await builder.WorkflowStatus(test.workflowStatuses);
        expect(builder.Build()).toEqual(test.expectedQuery);
      });
    }
  }

  async TestStartTimeQuery(): Promise<void> {
    const testTimestamp = Date.now() * 1_000_000;
    const testCases: {
      msg: string;
      minStartTime: number;
      maxStartTime: number;
      expectedQuery: string;
    }[] = [
      {
        msg: "empty minTimestamp",
        minStartTime: 0,
        maxStartTime: testTimestamp,
        expectedQuery: `(StartTime <= ${testTimestamp})`,
      },
      {
        msg: "max maxTimestamp",
        minStartTime: testTimestamp,
        maxStartTime: 9223372036854774784,
        expectedQuery: `(StartTime >= ${testTimestamp})`,
      },
      {
        msg: "both timestamps are used",
        minStartTime: testTimestamp - Hour,
        maxStartTime: testTimestamp,
        expectedQuery: `(StartTime >= ${testTimestamp - Hour} and StartTime <= ${testTimestamp})`,
      },
    ];

    for (const test of testCases) {
      await this.T().Run(test.msg, async (t: unknown) => {
        const builder = NewQueryBuilder();
        await builder.StartTime(test.minStartTime, test.maxStartTime);
        expect(builder.Build()).toEqual(test.expectedQuery);
      });
    }
  }

  async TestExcludeWorkflowTypesQuery(): Promise<void> {
    const testCases: { msg: string; excludeTypes: string[]; expectedQuery: string }[] = [
      {
        msg: "empty excludeTypes",
        excludeTypes: [],
        expectedQuery: "",
      },
      {
        msg: "single excludeType",
        excludeTypes: ["excludedWorkflowType"],
        expectedQuery: `(WorkflowType != "excludedWorkflowType")`,
      },
      {
        msg: "multiple excludeTypes",
        excludeTypes: ["excludedWorkflowType1", "excludedWorkflowType2"],
        expectedQuery: `(WorkflowType != "excludedWorkflowType1" and WorkflowType != "excludedWorkflowType2")`,
      },
    ];

    for (const test of testCases) {
      await this.T().Run(test.msg, async (_t: unknown) => {
        const builder = NewQueryBuilder();
        await builder.ExcludeWorkflowTypes(test.excludeTypes);
        expect(builder.Build()).toEqual(test.expectedQuery);
      });
    }
  }

  async TestMultipleFilters(): Promise<void> {
    const maxStartTime = Date.now() * 1_000_000;
    const minStartTime = maxStartTime - Hour;

    let builder = NewQueryBuilder();
    builder = await builder.WorkflowTypes(["testWorkflowType1", "testWorkflowType2"]);
    builder = await builder.WorkflowStatus([WorkflowStatus.WorkflowStatusOpen]);
    builder = await builder.StartTime(minStartTime, maxStartTime);

    const expectedQuery = `(WorkflowType = "testWorkflowType1" or WorkflowType = "testWorkflowType2") and (CloseTime = missing) and (StartTime >= ${minStartTime} and StartTime <= ${maxStartTime})`;
    this.Equal(expectedQuery, builder.Build());
  }

  TestToWorkflowStatus(): void {
    const testCases: {
      msg: string;
      statusString: string;
      expectErr: boolean;
      expectedStatus?: WorkflowStatus;
    }[] = [
      {
        msg: 'unknown status',
        statusString: 'unknown',
        expectErr: true,
      },
      {
        msg: 'lower case status string',
        statusString: 'open',
        expectErr: false,
        expectedStatus: WorkflowStatus.WorkflowStatusOpen,
      },
      {
        msg: 'mixed case status string',
        statusString: 'Timed_Out',
        expectErr: false,
        expectedStatus: WorkflowStatus.WorkflowStatusTimedOut,
      },
      {
        msg: 'upper case status string',
        statusString: 'TERMINATED',
        expectErr: false,
        expectedStatus: WorkflowStatus.WorkflowStatusTerminated,
      },
      {
        msg: 'all',
        statusString: 'ALL',
        expectErr: false,
        expectedStatus: WorkflowStatus.WorkflowStatusALL,
      },
      {
        msg: 'closed',
        statusString: 'CLOSED',
        expectErr: false,
        expectedStatus: WorkflowStatus.WorkflowStatusClosed,
      },
      {
        msg: 'failed',
        statusString: 'FAILED',
        expectErr: false,
        expectedStatus: WorkflowStatus.WorkflowStatusFailed,
      },
      {
        msg: 'completed',
        statusString: 'COMPLETED',
        expectErr: false,
        expectedStatus: WorkflowStatus.WorkflowStatusCompleted,
      },
      {
        msg: 'canceled',
        statusString: 'CANCELED',
        expectErr: false,
        expectedStatus: WorkflowStatus.WorkflowStatusCanceled,
      },
      {
        msg: 'continued as new',
        statusString: 'CONTINUED_AS_NEW',
        expectErr: false,
        expectedStatus: WorkflowStatus.WorkflowStatusContinuedAsNew,
      },
    ];

    for (const test of testCases) {
      this.T().Run(test.msg, (_t: unknown) => {
        let actualStatus: WorkflowStatus | undefined;
        let err: Error | null = null;

        try {
          actualStatus = ToWorkflowStatus(test.statusString);
        } catch (caught) {
          if (!(caught instanceof Error)) {
            throw caught;
          }
          err = caught;
        }

        if (test.expectErr) {
          this.Error(err);
          return;
        }

        this.Equal(test.expectedStatus, actualStatus);
      });
    }
  }

}

export function TestQueryBuilderSuite(): void {
  const s = new queryBuilderSuite();
}
