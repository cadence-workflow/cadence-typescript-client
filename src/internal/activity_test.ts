// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { Logger } from 'winston';
import type { WorkflowServiceClientLike } from './runtime/workflow_service_client_like.js';
import { Channel } from './runtime/channel.js';
import { background, withValue } from './runtime/context.js';
import { GoTestifySuite } from './runtime/testify_suite.js';
import { GoMockController, NewGoMockClient, NewGoMockController } from './runtime/gomock.js';
import { args } from './internal_worker_test.js';
import { NoopLogger } from './runtime/logging.js';
import { GetWorkerStopChannel, HasActivityInfo } from './activity.js';
import { activityEnvironment, activityEnvContextKey, activityOptionsContextKey } from './internal_activity.js';

export class activityTestSuite {
  constructor(init?: Partial<activityTestSuite>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  Suite: GoTestifySuite = new GoTestifySuite();

  mockCtrl?: GoMockController;

  service?: WorkflowServiceClientLike;

  logger?: Logger;

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
    this.service = NewGoMockClient(this.mockCtrl);
    this.logger = NoopLogger();
  }

  TearDownTest(): void {
    this.mockCtrl!.Finish();
  }

  async TestGetWorkerStopChannel(): Promise<void> {
    const ch = new Channel<{}>(1);
    const ctx = withValue(
      background(),
      activityEnvContextKey,
      new activityEnvironment({
        activityID: "",
        activityType: { Name: "", Path: "" },
        attempt: 0,
        contextPropagators: [],
        deadline: 0,
        heartbeatDetails: Buffer.alloc(0),
        heartbeatTimeout: 0,
        isLocalActivity: false,
        scheduledTimestamp: 0,
        startedTimestamp: 0,
        taskList: "",
        taskToken: Buffer.alloc(0),
        workflowDomain: "",
        workflowExecution: { ID: "", RunID: "" },
        workerStopChannel: ch,
      }),
    );
    const channel = GetWorkerStopChannel(ctx);
    this.NotNil(channel);
  }

  TestHasActivityInfo(): void {
    const ctx = background();
    this.False(HasActivityInfo(ctx));

    const activityEnv = new activityEnvironment({
      activityID: "test-activity-id",
      activityType: { Name: "test-activity-type", Path: "" },
      attempt: 0,
      contextPropagators: [],
      deadline: 0,
      heartbeatDetails: Buffer.alloc(0),
      heartbeatTimeout: 0,
      isLocalActivity: false,
      scheduledTimestamp: 0,
      startedTimestamp: 0,
      taskList: "",
      taskToken: Buffer.alloc(0),
      workflowDomain: "",
      workflowExecution: { ID: "", RunID: "" },
    });
    const ctxWithActivity = withValue(ctx, activityEnvContextKey, activityEnv);
    this.True(HasActivityInfo(ctxWithActivity));

    const ctxWithNilActivity = withValue(ctx, activityEnvContextKey, null);
    this.False(HasActivityInfo(ctxWithNilActivity));

    const ctxWithOtherValue = withValue(ctx, activityOptionsContextKey, "other-value");
    this.False(HasActivityInfo(ctxWithOtherValue));
  }

}

export function TestActivityTestSuite(): void {
  const s = new activityTestSuite();
}

export const testActivityType = "test-activity-type";

export const testWorkflowType = "test-workflow-type";
