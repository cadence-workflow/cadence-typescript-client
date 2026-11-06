// Parameter types are erased at runtime; restore the []byte-input fact these functions'
// declarations carry, for the reflect raw-payload passthrough guard (goFnLastParamIsByteSlice).
// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { RegisterActivityOptions, RegistryActivityInfo, internal_ActivityType, internal_ActivityOptions } from './activity.js';
import { internal_Context } from './context.js';
import { activity } from './internal_activity.js';
import type { WorkflowServiceClientLike } from './runtime/workflow_service_client_like.js';
import { Context } from './runtime/context.js';
import { Hour, Minute, Second } from './runtime/time.js';
import { GoTestifySuite } from './runtime/testify_suite.js';
import { GoMockController, NewGoMockClient, NewGoMockController } from './runtime/gomock.js';
import { args } from './internal_worker_test.js';
import { GetWorkflowInfo, Sleep, ExecuteActivity, SetQueryHandler, WithActivityOptions, GetSignalChannel } from './workflow.js';
import { getWorkflowEnvironment } from './internal_workflow.js';

/**
 * Greeter activity
 */
export class greeterActivity implements RegistryActivityInfo, activity {
  constructor(init?: Partial<greeterActivity>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  ActivityType(): internal_ActivityType {
    const activityName = "Greeter_Activity";
    return { Name: activityName, Path: "" };
  }

  async Execute(ctx: Context, input: Buffer): Promise<Buffer> {
    return Buffer.from("World");
  }

  GetFunction(): unknown {
    return this.Execute.bind(this);
  }

  GetOptions(): RegisterActivityOptions {
    return {
      DisableAlreadyRegisteredCheck: false,
      EnableAutoHeartbeat: false,
      EnableShortName: false,
      Name: "",
    };
  }

}

export class InterfacesTestSuite {
  constructor(init?: Partial<InterfacesTestSuite>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  Suite: GoTestifySuite = new GoTestifySuite();

  mockCtrl?: GoMockController;

  service?: WorkflowServiceClientLike;

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
    this.mockCtrl = NewGoMockController(this.T());
    this.service = NewGoMockClient(this.mockCtrl!);
  }

  TearDownTest(): void {
    this.mockCtrl!.Finish();
  }

}

export async function helloWorldWorkflowFunc(ctx: internal_Context, input: Buffer): Promise<void> {
  let queryResult = startingQueryValue;
  await SetQueryHandler(ctx, queryType, () => queryResult);

  const activityName = "Greeter_Activity";
  const ao = new internal_ActivityOptions({
    TaskList: "taskList",
    ActivityID: "0",
    ScheduleToStartTimeout: Minute,
    StartToCloseTimeout: Minute,
    HeartbeatTimeout: 20 * Second,
    ScheduleToCloseTimeout: 0,
    WaitForCancellation: false,
  });

  ctx = WithActivityOptions(ctx, ao);
  const resultBox: { value: Buffer } = { value: Buffer.alloc(0) };
  queryResult = "waiting-activity-result";

  try {
    const future = await ExecuteActivity(ctx, activityName);
    await future.Get(ctx, resultBox);
  } catch (err) {
    if (!(err instanceof Error)) {
      throw err;
    }
    queryResult = "error:" + err.message;
    throw err;
  }

  queryResult = finishedQueryValue;
}

export async function querySignalWorkflowFunc(ctx: internal_Context, numSignals: number): Promise<void> {
    let queryResult = startingQueryValue;

    await SetQueryHandler(ctx, queryType, () => queryResult).catch((e) => {
        if (!(e instanceof Error)) throw e;
    });

    await SetQueryHandler(ctx, errQueryType, () => {
        throw new Error(queryErr);
    }).catch((e) => {
        if (!(e instanceof Error)) throw e;
    });

    const ch = GetSignalChannel(ctx, signalCh);
    for (let i = 0; i < numSignals; i++) {
        await ch.Receive(ctx, queryResult);

        const ao = new internal_ActivityOptions({
            TaskList: "taskList",
            ActivityID: "0",
            ScheduleToStartTimeout: Minute,
            StartToCloseTimeout: Minute,
            HeartbeatTimeout: 20 * Second,
            ScheduleToCloseTimeout: 0,
            WaitForCancellation: false
        });

        await ExecuteActivity(
            WithActivityOptions(ctx, ao),
            "Greeter_Activity"
        ).catch((e) => {
            if (!(e instanceof Error)) throw e;
        });
    }
}

export async function binaryChecksumWorkflowFunc(ctx: internal_Context): Promise<string[]> {
  const result: string[] = [];
  result.push(await GetWorkflowInfo(ctx).GetBinaryChecksum());

  try {
    await Sleep(ctx, Hour);
  } catch (err) {
    if (!(err instanceof Error)) throw err;
  }

  result.push(await GetWorkflowInfo(ctx).GetBinaryChecksum());

  try {
    await Sleep(ctx, Hour);
  } catch (err) {
    if (!(err instanceof Error)) throw err;
  }

  result.push(await GetWorkflowInfo(ctx).GetBinaryChecksum());
  return result;
}

export async function helloWorldWorkflowCancelFunc(ctx: internal_Context, input: Buffer): Promise<void> {
  const activityName = "Greeter_Activity";
  const ao = new internal_ActivityOptions({
    TaskList: "taskList",
    ActivityID: "0",
    ScheduleToStartTimeout: Minute,
    StartToCloseTimeout: Minute,
    HeartbeatTimeout: 20 * Second,
    ScheduleToCloseTimeout: 0,
    WaitForCancellation: false,
  });
  ctx = WithActivityOptions(ctx, ao);
  try {
    await ExecuteActivity(ctx, activityName);
  } catch (err) {
    if (!(err instanceof Error)) throw err;
  }
  getWorkflowEnvironment(ctx).RequestCancelActivity("0");
}

/**
 * Greeter activity func
 */
export function greeterActivityFunc(ctx: Context, input: Buffer): Buffer {
    return Buffer.from("Hello world");
}

/**
 * Test suite.
 */
export function TestInterfacesTestSuite(): void {}

export const errQueryType = "test-err-query";

export const finishedQueryValue = "done";

export const queryErr = "error handling query";

export const queryType = "test-query";

export const signalCh = "signal-chan";

export const startingQueryValue = "";
