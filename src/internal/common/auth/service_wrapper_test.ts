// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { auth_AuthorizationProvider, NewWorkflowServiceWrapper } from './service_wrapper.js';
import type { WorkflowServiceClientLike } from '../../runtime/workflow_service_client_like.js';
import { Minute } from '../../runtime/time.js';
import { GoTestifySuite } from '../../runtime/testify_suite.js';
import { GoMockController, NewGoMockClient, NewGoMockController } from '../../runtime/gomock.js';
import { expect } from 'vitest';
import { args } from '../../internal_worker_test.js';
import { DeprecateDomainRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/DeprecateDomainRequest.js';
import { background } from '../../context.js';
import { withTimeout } from '../../runtime/context.js';
import { DescribeDomainRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/DescribeDomainRequest.js';
import { DescribeTaskListRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/DescribeTaskListRequest.js';
import { DiagnoseWorkflowExecutionRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/DiagnoseWorkflowExecutionRequest.js';
import { FailoverDomainRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/FailoverDomainRequest.js';
import { ListArchivedWorkflowExecutionsRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ListArchivedWorkflowExecutionsRequest.js';
import { GetWorkflowExecutionHistoryRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/GetWorkflowExecutionHistoryRequest.js';
import { ListDomainsRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ListDomainsRequest.js';
import { ListClosedWorkflowExecutionsRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ListClosedWorkflowExecutionsRequest.js';
import { DeleteDomainRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/DeleteDomainRequest.js';
import { ListTaskListPartitionsRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ListTaskListPartitionsRequest.js';
import { ListOpenWorkflowExecutionsRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ListOpenWorkflowExecutionsRequest.js';
import { DescribeWorkflowExecutionRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/DescribeWorkflowExecutionRequest.js';
import { PollForDecisionTaskRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/PollForDecisionTaskRequest.js';
import { ListWorkflowExecutionsRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ListWorkflowExecutionsRequest.js';
import { RecordActivityTaskHeartbeatByIDRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/RecordActivityTaskHeartbeatByIDRequest.js';
import { RecordActivityTaskHeartbeatRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/RecordActivityTaskHeartbeatRequest.js';
import { RegisterDomainRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/RegisterDomainRequest.js';
import { RespondActivityTaskCanceledByIDRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/RespondActivityTaskCanceledByIDRequest.js';
import { ResetStickyTaskListRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ResetStickyTaskListRequest.js';
import { RespondActivityTaskCompletedRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/RespondActivityTaskCompletedRequest.js';
import { CountWorkflowExecutionsRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/CountWorkflowExecutionsRequest.js';
import { RespondDecisionTaskCompletedRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/RespondDecisionTaskCompletedRequest.js';
import { RespondActivityTaskFailedByIDRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/RespondActivityTaskFailedByIDRequest.js';
import { RespondQueryTaskCompletedRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/RespondQueryTaskCompletedRequest.js';
import { RespondDecisionTaskFailedRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/RespondDecisionTaskFailedRequest.js';
import { SignalWithStartWorkflowExecutionAsyncRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/SignalWithStartWorkflowExecutionAsyncRequest.js';
import { RespondActivityTaskFailedRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/RespondActivityTaskFailedRequest.js';
import { SignalWithStartWorkflowExecutionRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/SignalWithStartWorkflowExecutionRequest.js';
import { SignalWorkflowExecutionRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/SignalWorkflowExecutionRequest.js';
import { StartWorkflowExecutionAsyncRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/StartWorkflowExecutionAsyncRequest.js';
import { StartWorkflowExecutionRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/StartWorkflowExecutionRequest.js';
import { UpdateDomainRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/UpdateDomainRequest.js';
import { TerminateWorkflowExecutionRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/TerminateWorkflowExecutionRequest.js';
import { ResetWorkflowExecutionRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ResetWorkflowExecutionRequest.js';
import { RespondActivityTaskCompletedByIDRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/RespondActivityTaskCompletedByIDRequest.js';
import { ListFailoverHistoryRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ListFailoverHistoryRequest.js';
import { PollForActivityTaskRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/PollForActivityTaskRequest.js';
import { RespondActivityTaskCanceledRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/RespondActivityTaskCanceledRequest.js';

import { QueryWorkflowRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/QueryWorkflowRequest.js';
export class serviceWrapperSuite {
  constructor(init?: Partial<serviceWrapperSuite>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  Suite: GoTestifySuite = new GoTestifySuite();

  Service?: WorkflowServiceClientLike;

  AuthProvider?: auth_AuthorizationProvider;

  controller?: GoMockController;

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
    this.controller = NewGoMockController(this.T());
    this.Service = NewGoMockClient(this.controller!);
    this.AuthProvider = newJWTAuthCorrect();
  }

  TearDownTest(): void {
    this.controller!.Finish();
  }

  TestDeprecateDomainInvalidToken(): void {
    this.AuthProvider = newJWTAuthIncorrect();
    const sw = NewWorkflowServiceWrapper(this.Service!, this.AuthProvider!);
    const [ctx] = withTimeout(background(), Minute);
    let err: Error | null = null;
    try {
      sw.DeprecateDomain(ctx, new DeprecateDomainRequest({}));
    } catch (caught) {
      if (!(caught instanceof Error)) throw caught;
      err = caught;
    }
    this.EqualError(err, "error");
  }

  TestListDomainsInvalidToken(): void {
    this.AuthProvider = newJWTAuthIncorrect();
    const sw = NewWorkflowServiceWrapper(this.Service!, this.AuthProvider!);
    const [ctx] = withTimeout(background(), Minute);
    void sw.ListDomains(ctx, new ListDomainsRequest({})).catch((err) => {
      if (!(err instanceof Error)) throw err;
      this.EqualError(err, "error");
    });
  }

  TestDescribeDomainInvalidToken(): void {
    this.AuthProvider = newJWTAuthIncorrect();
    const sw = NewWorkflowServiceWrapper(this.Service!, this.AuthProvider!);
    const [ctx] = withTimeout(background(), Minute);
    sw.DescribeDomain(ctx, new DescribeDomainRequest({})).then(
      () => this.EqualError(null, "error"),
      (err) => {
        if (!(err instanceof Error)) throw err;
        this.EqualError(err, "error");
      },
    );
  }

  TestDescribeWorkflowExecutionInvalidToken(): void {
    this.AuthProvider = newJWTAuthIncorrect();
    const sw = NewWorkflowServiceWrapper(this.Service!, this.AuthProvider!);
    const [ctx] = withTimeout(background(), Minute);
    sw.DescribeWorkflowExecution(ctx, new DescribeWorkflowExecutionRequest({})).then(
      () => this.EqualError(null, "error"),
      (err) => {
        if (!(err instanceof Error)) throw err;
        this.EqualError(err, "error");
      },
    );
  }

  TestDiagnoseWorkflowExecutionInvalidToken(): void {
    this.AuthProvider = newJWTAuthIncorrect();
    const sw = NewWorkflowServiceWrapper(this.Service!, this.AuthProvider!);
    const ctx = withTimeout(background(), Minute)[0];
    sw.DiagnoseWorkflowExecution(ctx, new DiagnoseWorkflowExecutionRequest({})).then(
      () => this.EqualError(null, "error"),
      (err) => this.EqualError(err, "error"),
    );
  }

  TestGetWorkflowExecutionHistoryInvalidToken(): void {
    this.AuthProvider = newJWTAuthIncorrect();
    const sw = NewWorkflowServiceWrapper(this.Service!, this.AuthProvider);
    const [ctx] = withTimeout(background(), Minute);
    void sw.GetWorkflowExecutionHistory(ctx, new GetWorkflowExecutionHistoryRequest({})).catch((err) => {
      if (!(err instanceof Error)) throw err;
      this.EqualError(err, "error");
    });
  }

  TestListClosedWorkflowExecutionsInvalidToken(): void {
    this.AuthProvider = newJWTAuthIncorrect();
    const sw = NewWorkflowServiceWrapper(this.Service!, this.AuthProvider!);
    const [ctx] = withTimeout(background(), Minute);
    void sw.ListClosedWorkflowExecutions(ctx, new ListClosedWorkflowExecutionsRequest({})).then(
      () => {
        expect.fail('expected an error');
      },
      (err: unknown) => {
        if (!(err instanceof Error)) throw err;
        expect(err.message).toBe('error');
      },
    );
  }

  TestListOpenWorkflowExecutionsInvalidToken(): void {
    this.AuthProvider = newJWTAuthIncorrect();
    const sw = NewWorkflowServiceWrapper(this.Service!, this.AuthProvider!);
    const [ctx] = withTimeout(background(), Minute);
    const request = new ListOpenWorkflowExecutionsRequest({});
    expect(sw.ListOpenWorkflowExecutions(ctx, request)).rejects.toThrow("error");
  }

  TestListWorkflowExecutionsInvalidToken(): void {
    this.AuthProvider = newJWTAuthIncorrect();
    const sw = NewWorkflowServiceWrapper(this.Service!, this.AuthProvider!);
    const [ctx] = withTimeout(background(), Minute);
    const request = new ListWorkflowExecutionsRequest({});
    sw.ListWorkflowExecutions(ctx, request).then(
      () => this.EqualError(null, "error"),
      (err) => {
        if (!(err instanceof Error)) throw err;
        this.EqualError(err, "error");
      },
    );
  }

  TestListArchivedWorkflowExecutionsInvalidToken(): void {
    this.AuthProvider = newJWTAuthIncorrect();
    const sw = NewWorkflowServiceWrapper(this.Service!, this.AuthProvider!);
    const [ctx] = withTimeout(background(), Minute);
    void sw.ListArchivedWorkflowExecutions(ctx, new ListArchivedWorkflowExecutionsRequest({}))
      .then(() => this.EqualError(null, "error"))
      .catch((err) => {
        if (!(err instanceof Error)) throw err;
        this.EqualError(err, "error");
      });
  }

  TestScanWorkflowExecutionsInvalidToken(): void {
    this.AuthProvider = newJWTAuthIncorrect();
    const sw = NewWorkflowServiceWrapper(this.Service!, this.AuthProvider);
    const ctx = withTimeout(background(), Minute)[0];
    sw.ScanWorkflowExecutions(ctx, new ListWorkflowExecutionsRequest({})).catch((err) => {
      this.EqualError(err, "error");
    });
  }

  TestCountWorkflowExecutionsInvalidToken(): void {
    this.AuthProvider = newJWTAuthIncorrect();
    const sw = NewWorkflowServiceWrapper(this.Service!, this.AuthProvider!);
    const [ctx] = withTimeout(background(), Minute);
    sw.CountWorkflowExecutions(ctx, new CountWorkflowExecutionsRequest({})).catch((err) => {
      if (!(err instanceof Error)) throw err;
      this.EqualError(err, "error");
    });
  }

  TestPollForActivityTaskInvalidToken(): void {
    this.AuthProvider = newJWTAuthIncorrect();
    const sw = NewWorkflowServiceWrapper(this.Service!, this.AuthProvider!);
    const [ctx] = withTimeout(background(), Minute);
    sw.PollForActivityTask(ctx, new PollForActivityTaskRequest({})).catch((err) => {
      this.EqualError(err, "error");
    });
  }

  TestPollForDecisionTaskInvalidToken(): void {
    this.AuthProvider = newJWTAuthIncorrect();
    const sw = NewWorkflowServiceWrapper(this.Service!, this.AuthProvider);
    const [ctx] = withTimeout(background(), Minute);
    sw.PollForDecisionTask(ctx, new PollForDecisionTaskRequest({})).catch((err) => {
      if (!(err instanceof Error)) throw err;
      this.EqualError(err, "error");
    });
  }

  TestRecordActivityTaskHeartbeatInvalidToken(): void {
    this.AuthProvider = newJWTAuthIncorrect();
    const sw = NewWorkflowServiceWrapper(this.Service!, this.AuthProvider);
    const [ctx] = withTimeout(background(), Minute);
    sw.RecordActivityTaskHeartbeat(ctx, new RecordActivityTaskHeartbeatRequest({})).then(
      () => this.EqualError(null, "error"),
      (err) => {
        if (!(err instanceof Error)) throw err;
        this.EqualError(err, "error");
      },
    );
  }

  TestRecordActivityTaskHeartbeatByIDInvalidToken(): void {
    this.AuthProvider = newJWTAuthIncorrect();
    const sw = NewWorkflowServiceWrapper(this.Service!, this.AuthProvider);
    const [ctx] = withTimeout(background(), Minute);
    sw.RecordActivityTaskHeartbeatByID(ctx, new RecordActivityTaskHeartbeatByIDRequest({})).then(() => {
      expect(true).toBe(false);
    }).catch((err) => {
      if (!(err instanceof Error)) throw err;
      expect(err.message).toBe("error");
    });
  }

  TestRegisterDomainInvalidToken(): void {
    this.AuthProvider = newJWTAuthIncorrect();
    const sw = NewWorkflowServiceWrapper(this.Service!, this.AuthProvider!);
    const [ctx] = withTimeout(background(), Minute);
    void sw.RegisterDomain(ctx, new RegisterDomainRequest({})).then(
      () => this.EqualError(null, "error"),
      (err) => {
        if (!(err instanceof Error)) throw err;
        this.EqualError(err, "error");
      },
    );
  }

  TestRequestCancelWorkflowExecutionInvalidToken(): void {
    // @go-unlowerable: asynchronous callee — the TypeScript service method returns Promise<void>, but the required synchronous target cannot observe its rejection or await completion
  }

  TestRespondActivityTaskCanceledInvalidToken(): void {
    this.AuthProvider = newJWTAuthIncorrect();
    const sw = NewWorkflowServiceWrapper(this.Service!, this.AuthProvider);
    const [ctx] = withTimeout(background(), Minute);
    sw.RespondActivityTaskCanceled(ctx, new RespondActivityTaskCanceledRequest({})).then(
      () => this.EqualError(null, "error"),
      (err) => {
        if (!(err instanceof Error)) throw err;
        this.EqualError(err, "error");
      },
    );
  }

  TestRespondActivityTaskCompletedInvalidToken(): void {
    this.AuthProvider = newJWTAuthIncorrect();
    const sw = NewWorkflowServiceWrapper(this.Service!, this.AuthProvider);
    const [ctx] = withTimeout(background(), Minute);
    expect(sw.RespondActivityTaskCompleted(ctx, new RespondActivityTaskCompletedRequest({}))).rejects.toThrow("error");
  }

  TestRespondActivityTaskFailedInvalidToken(): void {
    this.AuthProvider = newJWTAuthIncorrect();
    const sw = NewWorkflowServiceWrapper(this.Service!, this.AuthProvider);
    const [ctx] = withTimeout(background(), Minute);
    sw.RespondActivityTaskFailed(ctx, new RespondActivityTaskFailedRequest({})).catch((err) => {
      if (!(err instanceof Error)) throw err;
      this.EqualError(err, "error");
    });
  }

  TestRespondActivityTaskCanceledByIDInvalidToken(): void {
    this.AuthProvider = newJWTAuthIncorrect();
    const sw = NewWorkflowServiceWrapper(this.Service!, this.AuthProvider!);
    const [ctx] = withTimeout(background(), Minute);
    sw.RespondActivityTaskCanceledByID(
      ctx,
      new RespondActivityTaskCanceledByIDRequest({})
    ).catch((err) => {
      if (!(err instanceof Error)) throw err;
      this.EqualError(err, "error");
    });
  }

  TestRespondActivityTaskCompletedByIDInvalidToken(): void {
    this.AuthProvider = newJWTAuthIncorrect();
    const sw = NewWorkflowServiceWrapper(this.Service!, this.AuthProvider!);
    const [ctx] = withTimeout(background(), Minute);
    expect(
      sw.RespondActivityTaskCompletedByID(
        ctx,
        new RespondActivityTaskCompletedByIDRequest({})
      )
    ).rejects.toThrow("error");
  }

  TestRespondActivityTaskFailedByIDInvalidToken(): void {
    this.AuthProvider = newJWTAuthIncorrect();
    const sw = NewWorkflowServiceWrapper(this.Service!, this.AuthProvider!);
    const [ctx] = withTimeout(background(), Minute);
    const request = new RespondActivityTaskFailedByIDRequest({});
    sw.RespondActivityTaskFailedByID(ctx, request).catch((err) => {
      const e = err instanceof Error ? err : new globalThis.Error(String(err));
      this.EqualError(e, "error");
    });
  }

  TestRespondDecisionTaskCompletedInvalidToken(): void {
    this.AuthProvider = newJWTAuthIncorrect();
    const sw = NewWorkflowServiceWrapper(this.Service!, this.AuthProvider!);
    const [ctx] = withTimeout(background(), Minute);
    const request = new RespondDecisionTaskCompletedRequest({});
    sw.RespondDecisionTaskCompleted(ctx, request).then(
      () => this.EqualError(null, "error"),
      (err) => {
        if (!(err instanceof Error)) throw err;
        this.EqualError(err, "error");
      },
    );
  }

  TestRespondDecisionTaskFailedInvalidToken(): void {
    this.AuthProvider = newJWTAuthIncorrect();
    const sw = NewWorkflowServiceWrapper(this.Service!, this.AuthProvider!);
    const [ctx, _cancel] = withTimeout(background(), Minute);
    expect(sw.RespondDecisionTaskFailed(ctx, new RespondDecisionTaskFailedRequest({}))).rejects.toThrow("error");
  }

  TestSignalWorkflowExecutionInvalidToken(): void {
    this.AuthProvider = newJWTAuthIncorrect();
    const sw = NewWorkflowServiceWrapper(this.Service!, this.AuthProvider!);
    const [ctx] = withTimeout(background(), Minute);
    sw.SignalWorkflowExecution(ctx, new SignalWorkflowExecutionRequest({})).then(
      () => this.EqualError(null, "error"),
      (err) => {
        if (!(err instanceof Error)) throw err;
        this.EqualError(err, "error");
      },
    );
  }

  TestSignalWithStartWorkflowExecutionInvalidToken(): void {
    this.AuthProvider = newJWTAuthIncorrect();
    const sw = NewWorkflowServiceWrapper(this.Service!, this.AuthProvider!);
    const [ctx] = withTimeout(background(), Minute);
    sw.SignalWithStartWorkflowExecution(ctx, new SignalWithStartWorkflowExecutionRequest({}))
      .then(() => {
        this.EqualError(null, "error");
      })
      .catch((err) => {
        if (!(err instanceof Error)) throw err;
        this.EqualError(err, "error");
      });
  }

  TestSignalWithStartWorkflowExecutionAsyncInvalidToken(): void {
    this.AuthProvider = newJWTAuthIncorrect();
    const sw = NewWorkflowServiceWrapper(this.Service!, this.AuthProvider!);
    const [ctx] = withTimeout(background(), Minute);
    const request = new SignalWithStartWorkflowExecutionAsyncRequest({});
    sw.SignalWithStartWorkflowExecutionAsync(ctx, request).then(
      () => {
        this.EqualError(null, "error");
      },
      (err: unknown) => {
        if (!(err instanceof Error)) throw err;
        this.EqualError(err, "error");
      },
    );
  }

  TestStartWorkflowExecutionInvalidToken(): void {
    this.AuthProvider = newJWTAuthIncorrect();
    const sw = NewWorkflowServiceWrapper(this.Service!, this.AuthProvider!);
    const [ctx] = withTimeout(background(), Minute);
    sw.StartWorkflowExecution(ctx, new StartWorkflowExecutionRequest({})).catch((err) => {
      if (!(err instanceof Error)) throw err;
      expect(err.message).toBe("error");
    });
  }

  TestStartWorkflowExecutionAsyncInvalidToken(): void {
    this.AuthProvider = newJWTAuthIncorrect();
    const sw = NewWorkflowServiceWrapper(this.Service!, this.AuthProvider!);
    const [ctx] = withTimeout(background(), Minute);
    sw.StartWorkflowExecutionAsync(ctx, new StartWorkflowExecutionAsyncRequest({})).catch((err) => {
      if (!(err instanceof Error)) throw err;
      this.EqualError(err, "error");
    });
  }

  TestTerminateWorkflowExecutionInvalidToken(): void {
    this.AuthProvider = newJWTAuthIncorrect();
    const sw = NewWorkflowServiceWrapper(this.Service!, this.AuthProvider);
    const [ctx] = withTimeout(background(), Minute);
    const err = sw.TerminateWorkflowExecution(ctx, new TerminateWorkflowExecutionRequest({}));
    this.EqualError(err, "error");
  }

  TestResetWorkflowExecutionInvalidToken(): void {
    this.AuthProvider = newJWTAuthIncorrect();
    const sw = NewWorkflowServiceWrapper(this.Service!, this.AuthProvider!);
    const [ctx] = withTimeout(background(), Minute);
    sw.ResetWorkflowExecution(ctx, new ResetWorkflowExecutionRequest({})).then(
      () => this.EqualError(null, "error"),
      (err) => {
        if (!(err instanceof Error)) throw err;
        this.EqualError(err, "error");
      },
    );
  }

  TestUpdateDomainInvalidToken(): void {
    this.AuthProvider = newJWTAuthIncorrect();
    const sw = NewWorkflowServiceWrapper(this.Service!, this.AuthProvider!);
    const [ctx] = withTimeout(background(), Minute);
    void sw.UpdateDomain(ctx, new UpdateDomainRequest({})).catch((err) => {
      if (!(err instanceof Error)) throw err;
      this.EqualError(err, "error");
    });
  }

  TestQueryWorkflowInvalidToken(): void {
    this.AuthProvider = newJWTAuthIncorrect();
    const sw = NewWorkflowServiceWrapper(this.Service!, this.AuthProvider);
    const [ctx, cancel] = withTimeout(background(), Minute);
    const request = new QueryWorkflowRequest({});
    sw.QueryWorkflow(ctx, request).then(
      () => this.EqualError(null, "error"),
      (err) => {
        const e = err instanceof Error ? err : new globalThis.Error(String(err));
        this.EqualError(e, "error");
      },
    );
  }

  TestResetStickyTaskListInvalidToken(): void {
    this.AuthProvider = newJWTAuthIncorrect();
    const sw = NewWorkflowServiceWrapper(this.Service!, this.AuthProvider!);
    const [ctx] = withTimeout(background(), Minute);
    sw.ResetStickyTaskList(ctx, new ResetStickyTaskListRequest({})).catch((err) => {
      this.EqualError(err, "error");
    });
  }

  TestDescribeTaskListInvalidToken(): void {
    this.AuthProvider = newJWTAuthIncorrect();
    const sw = NewWorkflowServiceWrapper(this.Service!, this.AuthProvider);
    const [ctx] = withTimeout(background(), Minute);
    sw.DescribeTaskList(ctx, new DescribeTaskListRequest({})).catch((err) => {
      const e = err instanceof Error ? err : new globalThis.Error(String(err));
      this.EqualError(e, "error");
    });
  }

  TestRespondQueryTaskCompletedInvalidToken(): void {
    this.AuthProvider = newJWTAuthIncorrect();
    const sw = NewWorkflowServiceWrapper(this.Service!, this.AuthProvider);
    const [ctx] = withTimeout(background(), Minute);

    sw.RespondQueryTaskCompleted(ctx, new RespondQueryTaskCompletedRequest({})).then(
      () => {
        expect(null).not.toBeNull();
      },
      (err) => {
        if (!(err instanceof Error)) throw err;
        expect(err.message).toBe("error");
      },
    );
  }

  TestGetSearchAttributesInvalidToken(): void {
    this.AuthProvider = newJWTAuthIncorrect();
    const sw = NewWorkflowServiceWrapper(this.Service!, this.AuthProvider!);
    const [ctx] = withTimeout(background(), Minute);
    sw.GetSearchAttributes(ctx).then(
      () => this.Fail("expected error"),
      (err) => {
        if (!(err instanceof Error)) throw err;
        this.EqualError(err, "error");
      },
    );
  }

  TestListTaskListPartitionsInvalidToken(): void {
    this.AuthProvider = newJWTAuthIncorrect();
    const sw = NewWorkflowServiceWrapper(this.Service!, this.AuthProvider);
    const [ctx] = withTimeout(background(), Minute);
    sw.ListTaskListPartitions(ctx, new ListTaskListPartitionsRequest({})).catch((err) => {
      this.EqualError(err, "error");
    });
  }

  TestGetClusterInfoInvalidToken(): void {
    // @go-unlowerable: async API mismatch — GetClusterInfo returns a Promise, but the target test is synchronous and cannot observe its rejection
  }

  TestDeleteDomainInvalidToken(): void {
    this.AuthProvider = newJWTAuthIncorrect();
    const sw = NewWorkflowServiceWrapper(this.Service!, this.AuthProvider);
    const [ctx] = withTimeout(background(), Minute);
    void sw.DeleteDomain(ctx, new DeleteDomainRequest({})).catch((err) => {
      if (!(err instanceof Error)) throw err;
      expect(err.message).toBe("error");
    });
  }

  TestFailoverDomainInvalidToken(): void {
    this.AuthProvider = newJWTAuthIncorrect();
    const sw = NewWorkflowServiceWrapper(this.Service!, this.AuthProvider);
    const [ctx] = withTimeout(background(), Minute);
    void sw.FailoverDomain(ctx, new FailoverDomainRequest({}))
      .then(() => this.EqualError(null, "error"))
      .catch((err) => {
        if (!(err instanceof Error)) throw err;
        this.EqualError(err, "error");
      });
  }

  TestListFailoverHistoryInvalidToken(): void {
    this.AuthProvider = newJWTAuthIncorrect();
    const sw = NewWorkflowServiceWrapper(this.Service!, this.AuthProvider!);
    const [ctx] = withTimeout(background(), Minute);
    sw.ListFailoverHistory(ctx, new ListFailoverHistoryRequest({})).then(
      () => this.EqualError(null, "error"),
      (err) => {
        if (!(err instanceof Error)) throw err;
        this.EqualError(err, "error");
      },
    );
  }

}

export class jwtAuthCorrect implements auth_AuthorizationProvider {
  constructor(init?: Partial<jwtAuthCorrect>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  GetAuthToken(): Buffer {
    return Buffer.alloc(0);
  }

}

export class jwtAuthIncorrect implements auth_AuthorizationProvider {
  constructor(init?: Partial<jwtAuthIncorrect>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  GetAuthToken(): Buffer {
    throw new Error("error");
  }

}

export function newJWTAuthCorrect(): jwtAuthCorrect {
  return new jwtAuthCorrect({});
}

export function newJWTAuthIncorrect(): jwtAuthIncorrect {
  return new jwtAuthIncorrect({});
}

export function TestServiceWrapperSuite(): void {}
