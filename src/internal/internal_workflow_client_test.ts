import { WorkflowExecution as shared_WorkflowExecution } from '../generated/thrift/cadence-idl/com/uber/cadence/WorkflowExecution.js';
// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { internal_Client, ClientOptions, NewClient, internal_StartWorkflowOptions } from './client.js';
import { internal_Context, WithValue } from './context.js';
import { internal_ContextPropagator, internal_HeaderReader, internal_HeaderWriter } from './headers.js';
import { workflowClient, getWorkflowMemo, serializeSearchAttributes, getRunID } from './internal_workflow_client.js';
import type { WorkflowServiceClientLike } from './runtime/workflow_service_client_like.js';
import { Channel } from './runtime/channel.js';
import { Context, background, withValue } from './runtime/context.js';
import { GoTestifySuite } from './runtime/testify_suite.js';
import { GoMockController, NewGoMockClient, NewGoMockController } from './runtime/gomock.js';
import { expect } from 'vitest';
import { IDataBlob as shared_IDataBlob, DataBlob as shared_DataBlob } from '../generated/thrift/cadence-idl/com/uber/cadence/DataBlob.js';
import { IGetWorkflowExecutionHistoryRequest as shared_IGetWorkflowExecutionHistoryRequest, GetWorkflowExecutionHistoryRequest as shared_GetWorkflowExecutionHistoryRequest } from '../generated/thrift/cadence-idl/com/uber/cadence/GetWorkflowExecutionHistoryRequest.js';
import { IHistoryEvent as shared_IHistoryEvent } from '../generated/thrift/cadence-idl/com/uber/cadence/HistoryEvent.js';
import { HistoryEventFilterType as shared_HistoryEventFilterType } from '../generated/thrift/cadence-idl/com/uber/cadence/HistoryEventFilterType.js';
import { args } from './internal_worker_test.js';
import { key } from './internal_workflow_test.js';
import { NewTaggedScope } from './common/metrics/scope.js';
import { decodeArg } from './internal_worker.js';
import { SerializeBatchEvents } from './common/serializer/history_serializer.js';
import { EncodingType } from '../generated/thrift/cadence-idl/com/uber/cadence/EncodingType.js';
import { BoolPtr, StringPtr } from './common/convert.js';

export class historyEventIteratorSuite {
  constructor(init?: Partial<historyEventIteratorSuite>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  Suite: GoTestifySuite = new GoTestifySuite();

  mockCtrl?: GoMockController;

  workflowServiceClient?: WorkflowServiceClientLike;

  wfClient?: workflowClient;

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

  SetupSuite(): void {
    if (process.env.GO_TEST_VERBOSE === "1") {
      console.log = (...args: unknown[]): void => {
        process.stdout.write(`${args.join(" ")}\n`);
      };
    }
  }

  SetupTest(): void {
    this.mockCtrl = NewGoMockController(this.T());
    this.workflowServiceClient = NewGoMockClient(this.mockCtrl!);

    this.wfClient = new workflowClient({
      workflowService: this.workflowServiceClient,
      domain,
      contextPropagators: [],
      featureFlags: {
        WorkflowExecutionAlreadyCompletedErrorEnabled: false,
        AutoforwardingEnabled: false,
        PollerAutoScalerEnabled: false,
        EphemeralTaskListsEnabled: false,
        MetricEmitMode: 0,
      },
      identity: "",
    });
  }

  TearDownTest(): void {
    this.mockCtrl!.Finish();
  }

}

/**
 * stringMapPropagator propagates the list of keys across a workflow,
 * interpreting the payloads as strings.
 */
export class stringMapPropagator implements internal_ContextPropagator {
  constructor(init?: Partial<stringMapPropagator>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  keys: Record<string, {}> = {};

  Inject(ctx: Context, writer: internal_HeaderWriter): void {
    for (const key of Object.keys(this.keys)) {
      const value = ctx.value<unknown>(key);
      if (typeof value !== "string") {
        throw new Error(`unable to extract key from context ${key}`);
      }
      writer.Set(key, Buffer.from(value));
    }
  }

  InjectFromWorkflow(ctx: internal_Context, writer: internal_HeaderWriter): void {
    for (const key of Object.keys(this.keys)) {
      const value = ctx.Value(key);
      if (typeof value !== "string") {
        throw new Error(`unable to extract key from context ${key}`);
      }
      writer.Set(key, Buffer.from(value));
    }
    return;
  }

  Extract(ctx: Context, reader: internal_HeaderReader): Context {
    reader.ForEachKey((key: string, value: Buffer): void => {
      if (key in this.keys) {
        ctx = withValue(ctx, key, (value ?? Buffer.alloc(0)).toString());
      }
    });
    return ctx;
  }

  ExtractToWorkflow(ctx: internal_Context, reader: internal_HeaderReader): internal_Context {
    reader.ForEachKey((key: string, value: Buffer): void => {
      if (key in this.keys) {
        ctx = WithValue(ctx, key, (value ?? Buffer.alloc(0)).toString());
      }
    });
    return ctx;
  }

}

/**
 * minor helper type to allow faking deadlines between calls, as we cannot normally modify a context that way.
 */
export class fakeDeadlineContext {
  constructor(init?: Partial<fakeDeadlineContext>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  Context?: Context;

  d: number = 0;

  Deadline(): [number, boolean] {
    return [this.d, true];
  }

}

export class workflowRunSuite {
  constructor(init?: Partial<workflowRunSuite>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  Suite: GoTestifySuite = new GoTestifySuite();

  mockCtrl?: GoMockController;

  workflowServiceClient?: WorkflowServiceClientLike;

  workflowClient?: internal_Client;

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

  SetupSuite(): void {
  }

  TearDownSuite(): void {
  }

  async SetupTest(): Promise<void> {
    this.mockCtrl = NewGoMockController(this.T());
    this.workflowServiceClient = NewGoMockClient(this.mockCtrl);

    const metricsScope = NewTaggedScope(undefined);
    const options: ClientOptions = {
      MetricsScope: metricsScope,
      Identity: identity,
      IsolationGroup: "",
      FeatureFlags: {
        WorkflowExecutionAlreadyCompletedErrorEnabled: false,
        AutoforwardingEnabled: false,
        PollerAutoScalerEnabled: false,
        EphemeralTaskListsEnabled: false,
        MetricEmitMode: 0,
      },
    };
    this.workflowClient = await NewClient(this.workflowServiceClient!, domain, options);
  }

  TearDownTest(): void {
    this.mockCtrl!.Finish();
  }

}

/**
 * workflow client test suite
 */
export class workflowClientTestSuite {
  constructor(init?: Partial<workflowClientTestSuite>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  Suite: GoTestifySuite = new GoTestifySuite();

  mockCtrl?: GoMockController;

  service?: WorkflowServiceClientLike;

  client?: internal_Client;

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

  SetupSuite(): void {
    if (process.env.VERBOSE === "1" || process.env.VERBOSE === "true") {
      process.stdout.write("");
    }
  }

  async SetupTest(): Promise<void> {
    this.mockCtrl = NewGoMockController(this.T());
    this.service = NewGoMockClient(this.mockCtrl);
    this.client = await NewClient(this.service!, domain, {
      Identity: identity,
      IsolationGroup: "",
      FeatureFlags: {
        WorkflowExecutionAlreadyCompletedErrorEnabled: false,
        AutoforwardingEnabled: false,
        PollerAutoScalerEnabled: false,
        EphemeralTaskListsEnabled: false,
        MetricEmitMode: 0,
      },
    });
  }

  TearDownTest(): void {
    this.mockCtrl!.Finish();
  }

  async SetupSubTest(): Promise<void> {
    await this.SetupTest();
  }

  TearDownSubTest(): void {
    this.TearDownTest();
  }

  async TestStartWorkflow_RequestCreationFails(): Promise<void> {
    const client = this.client! as workflowClient;
    const options: internal_StartWorkflowOptions = {
      ID: workflowID,
      TaskList: "",
      ExecutionStartToCloseTimeout: timeoutInSeconds,
      DecisionTaskStartToCloseTimeout: timeoutInSeconds,
      CronOverlapPolicy: 0,
      CronSchedule: "",
      DelayStart: 0,
      FirstRunAt: 0,
      JitterStart: 0,
      WorkflowIDReusePolicy: 0,
    };
    const f1 = (ctx: internal_Context, r: Buffer): string => {
      return "result";
    };

    let err: Error | null = null;
    try {
      await client.StartWorkflow(background(), options, f1, Buffer.from("test"));
    } catch (caught) {
      if (!(caught instanceof Error)) throw caught;
      err = caught;
    }
    this.ErrorContains(err, "missing TaskList");
  }

  async TestSignalWithStartWorkflow_RequestCreationFails(): Promise<void> {
    const options: internal_StartWorkflowOptions = {
      ID: workflowID,
      TaskList: "",
      ExecutionStartToCloseTimeout: timeoutInSeconds,
      DecisionTaskStartToCloseTimeout: timeoutInSeconds,
      CronOverlapPolicy: 0,
      CronSchedule: "",
      DelayStart: 0,
      FirstRunAt: 0,
      JitterStart: 0,
      WorkflowIDReusePolicy: 0,
    };
    const wf = (_ctx: internal_Context): string => {
      return "result";
    };

    let err: Error | null;
    try {
      await this.client!.SignalWithStartWorkflow(
        background(),
        "wid",
        "signal",
        "value",
        options,
        wf,
      );
      err = null;
    } catch (caught) {
      if (!(caught instanceof Error)) throw caught;
      err = caught;
    }
    this.ErrorContains(err, "missing TaskList");
  }

  async TestSignalWithStartWorkflowAsync_RequestCreationFails(): Promise<void> {
    const options: internal_StartWorkflowOptions = {
      ID: workflowID,
      TaskList: "",
      ExecutionStartToCloseTimeout: timeoutInSeconds,
      DecisionTaskStartToCloseTimeout: timeoutInSeconds,
      CronOverlapPolicy: 0,
      CronSchedule: "",
      DelayStart: 0,
      FirstRunAt: 0,
      JitterStart: 0,
      WorkflowIDReusePolicy: 0,
    };
    const wf = (ctx: internal_Context): string => {
      return "result";
    };

    try {
      await this.client!.SignalWithStartWorkflowAsync(
        background(),
        "wid",
        "signal",
        "value",
        options,
        wf,
      );
    } catch (err) {
      if (!(err instanceof Error)) throw err;
      this.ErrorContains(err, "missing TaskList");
    }
  }

  async TestStartWorkflowAsync_RequestCreationFails(): Promise<void> {
    const client = this.client! as workflowClient;
    const options: internal_StartWorkflowOptions = {
      ID: workflowID,
      TaskList: "",
      ExecutionStartToCloseTimeout: timeoutInSeconds,
      DecisionTaskStartToCloseTimeout: timeoutInSeconds,
      CronOverlapPolicy: 0,
      CronSchedule: "",
      DelayStart: 0,
      FirstRunAt: 0,
      JitterStart: 0,
      WorkflowIDReusePolicy: 0,
    };
    const f1 = (ctx: internal_Context, r: Buffer): string => {
      return "result";
    };

    try {
      await client.StartWorkflowAsync(background(), options, f1, Buffer.from("test"));
    } catch (err) {
      if (!(err instanceof Error)) throw err;
      this.ErrorContains(err, "missing TaskList");
      return;
    }

    this.ErrorContains(null, "missing TaskList");
  }

  async TestGetWorkflowMemo(): Promise<void> {
    let input1: Record<string, unknown> | undefined = undefined;
    const result1 = await getWorkflowMemo(input1, undefined);
    expect(result1).toBeUndefined();

    input1 = {};
    const result2 = await getWorkflowMemo(input1, undefined);
    expect(result2).toBeDefined();
    expect(result2?.fields?.size ?? 0).toBe(0);

    input1["t1"] = "v1";
    const result3 = await getWorkflowMemo(input1, undefined);
    expect(result3).toBeDefined();
    expect(result3?.fields?.size ?? 0).toBe(1);

    const resultString = { value: "" };
    decodeArg(undefined, result3!.fields!.get("t1")!, resultString);
    expect(resultString.value).toBe("v1");

    input1["non-serializable"] = new Channel<number>(0);
    let caught: Error | null = null;
    try {
      await getWorkflowMemo(input1, undefined);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
      caught = err;
    }
    expect(caught).not.toBeNull();
  }

  async TestSerializeSearchAttributes(): Promise<void> {
    let input1: Record<string, unknown> | undefined = undefined;
    const result1 = await serializeSearchAttributes(input1);
    this.NoError(null);
    this.Nil(result1);

    input1 = {};
    const result2 = await serializeSearchAttributes(input1);
    this.NoError(null);
    this.NotNil(result2);
    this.Equal(0, result2!.indexedFields?.size ?? 0);

    input1["t1"] = "v1";
    const result3 = await serializeSearchAttributes(input1);
    this.NoError(null);
    this.NotNil(result3);
    this.Equal(1, result3!.indexedFields?.size ?? 0);
    const resultString = { value: '' };
    decodeArg(undefined, result3!.indexedFields?.get("t1")!, resultString);
    this.Equal("v1", resultString.value);

    input1["non-serializable"] = new Map();
    let finalError: Error | null = null;
    try {
      await serializeSearchAttributes(input1);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
      finalError = err;
    }
    this.Error(finalError);
  }

}

/**
 * NewStringMapPropagator returns a context propagator that propagates a set of
 * string key-value pairs across a workflow
 */
export async function NewStringMapPropagator(keys: string[]): Promise<internal_ContextPropagator> {
  const keyMap: Record<string, {}> = {};
  for (const key of keys) {
    keyMap[key] = {};
  }
  return new stringMapPropagator({ keys: keyMap });
}

export function TestHistoryEventIteratorSuite(): void {
  const s = new historyEventIteratorSuite();
}

export function TestWorkflowRunSuite(): void {
  const s = new workflowRunSuite();
}

export function getGetWorkflowExecutionHistoryRequest(filterType: shared_HistoryEventFilterType): shared_IGetWorkflowExecutionHistoryRequest {
    const isLongPoll = true;

    const request = new shared_GetWorkflowExecutionHistoryRequest({
        domain: StringPtr(domain),
        execution: new shared_WorkflowExecution({
            workflowId: StringPtr(workflowID),
            runId: getRunID(runID),
        }),
        waitForNewEvent: BoolPtr(isLongPoll),
        HistoryEventFilterType: filterType,
        skipArchival: BoolPtr(true),
    });

    return request;
}

export function TestWorkflowClientSuite(): void {
}

export function serializeEvents(events: shared_IHistoryEvent[]): shared_IDataBlob {
    const blob = SerializeBatchEvents(events, EncodingType.ThriftRW);

    return new shared_DataBlob({
        EncodingType: EncodingType.ThriftRW,
        Data: blob.Data!,
    });
}

export const activityID = "1234";

export const domain = "some random domain";

export const identity = "some random identity";

export const runID = "some random run ID";

export const taskToken = "some random task-token";

export const tasklist = "some random tasklist";

export const testHeader = "test-header";

export const timeoutInSeconds = 20;

export const workflowID = "some random workflow ID";

export const workflowIDReusePolicy = 0;

export const workflowType = "some random workflow type";
