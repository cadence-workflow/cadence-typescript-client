// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import type { WorkflowServiceClientLike } from '../runtime/workflow_service_client_like.js';
import { Context } from '../runtime/context.js';
import { DeprecateDomainRequest as api_DeprecateDomainRequest, DeprecateDomainResponse as api_DeprecateDomainResponse, DescribeDomainRequest as api_DescribeDomainRequest, DescribeDomainResponse as api_DescribeDomainResponse, DomainAPI, ListDomainsRequest as api_ListDomainsRequest, ListDomainsResponse as api_ListDomainsResponse, RegisterDomainRequest as api_RegisterDomainRequest, RegisterDomainResponse as api_RegisterDomainResponse, UpdateDomainRequest as api_UpdateDomainRequest, UpdateDomainResponse as api_UpdateDomainResponse } from '../../generated/proto/cadence-idl/uber/cadence/api/v1/service_domain.js';
import { CountWorkflowExecutionsRequest as api_CountWorkflowExecutionsRequest, CountWorkflowExecutionsResponse as api_CountWorkflowExecutionsResponse, GetSearchAttributesRequest as api_GetSearchAttributesRequest, GetSearchAttributesResponse as api_GetSearchAttributesResponse, ListArchivedWorkflowExecutionsRequest as api_ListArchivedWorkflowExecutionsRequest, ListArchivedWorkflowExecutionsResponse as api_ListArchivedWorkflowExecutionsResponse, ListClosedWorkflowExecutionsRequest as api_ListClosedWorkflowExecutionsRequest, ListClosedWorkflowExecutionsResponse as api_ListClosedWorkflowExecutionsResponse, ListOpenWorkflowExecutionsRequest as api_ListOpenWorkflowExecutionsRequest, ListOpenWorkflowExecutionsResponse as api_ListOpenWorkflowExecutionsResponse, ListWorkflowExecutionsRequest as api_ListWorkflowExecutionsRequest, ListWorkflowExecutionsResponse as api_ListWorkflowExecutionsResponse, ScanWorkflowExecutionsRequest as api_ScanWorkflowExecutionsRequest, ScanWorkflowExecutionsResponse as api_ScanWorkflowExecutionsResponse, VisibilityAPI } from '../../generated/proto/cadence-idl/uber/cadence/api/v1/service_visibility.js';
import { PollForActivityTaskRequest as api_PollForActivityTaskRequest, PollForActivityTaskResponse as api_PollForActivityTaskResponse, PollForDecisionTaskRequest as api_PollForDecisionTaskRequest, PollForDecisionTaskResponse as api_PollForDecisionTaskResponse, RecordActivityTaskHeartbeatByIDRequest as api_RecordActivityTaskHeartbeatByIDRequest, RecordActivityTaskHeartbeatByIDResponse as api_RecordActivityTaskHeartbeatByIDResponse, RecordActivityTaskHeartbeatRequest as api_RecordActivityTaskHeartbeatRequest, RecordActivityTaskHeartbeatResponse as api_RecordActivityTaskHeartbeatResponse, ResetStickyTaskListRequest as api_ResetStickyTaskListRequest, ResetStickyTaskListResponse as api_ResetStickyTaskListResponse, RespondActivityTaskCanceledByIDRequest as api_RespondActivityTaskCanceledByIDRequest, RespondActivityTaskCanceledByIDResponse as api_RespondActivityTaskCanceledByIDResponse, RespondActivityTaskCanceledRequest as api_RespondActivityTaskCanceledRequest, RespondActivityTaskCanceledResponse as api_RespondActivityTaskCanceledResponse, RespondActivityTaskCompletedByIDRequest as api_RespondActivityTaskCompletedByIDRequest, RespondActivityTaskCompletedByIDResponse as api_RespondActivityTaskCompletedByIDResponse, RespondActivityTaskCompletedRequest as api_RespondActivityTaskCompletedRequest, RespondActivityTaskCompletedResponse as api_RespondActivityTaskCompletedResponse, RespondActivityTaskFailedByIDRequest as api_RespondActivityTaskFailedByIDRequest, RespondActivityTaskFailedByIDResponse as api_RespondActivityTaskFailedByIDResponse, RespondActivityTaskFailedRequest as api_RespondActivityTaskFailedRequest, RespondActivityTaskFailedResponse as api_RespondActivityTaskFailedResponse, RespondDecisionTaskCompletedRequest as api_RespondDecisionTaskCompletedRequest, RespondDecisionTaskCompletedResponse as api_RespondDecisionTaskCompletedResponse, RespondDecisionTaskFailedRequest as api_RespondDecisionTaskFailedRequest, RespondDecisionTaskFailedResponse as api_RespondDecisionTaskFailedResponse, RespondQueryTaskCompletedRequest as api_RespondQueryTaskCompletedRequest, RespondQueryTaskCompletedResponse as api_RespondQueryTaskCompletedResponse, WorkerAPI } from '../../generated/proto/cadence-idl/uber/cadence/api/v1/service_worker.js';
import { DescribeTaskListRequest as api_DescribeTaskListRequest, DescribeTaskListResponse as api_DescribeTaskListResponse, DescribeWorkflowExecutionRequest as api_DescribeWorkflowExecutionRequest, DescribeWorkflowExecutionResponse as api_DescribeWorkflowExecutionResponse, DiagnoseWorkflowExecutionRequest as api_DiagnoseWorkflowExecutionRequest, DiagnoseWorkflowExecutionResponse as api_DiagnoseWorkflowExecutionResponse, GetClusterInfoRequest as api_GetClusterInfoRequest, GetClusterInfoResponse as api_GetClusterInfoResponse, GetWorkflowExecutionHistoryRequest as api_GetWorkflowExecutionHistoryRequest, GetWorkflowExecutionHistoryResponse as api_GetWorkflowExecutionHistoryResponse, ListTaskListPartitionsRequest as api_ListTaskListPartitionsRequest, ListTaskListPartitionsResponse as api_ListTaskListPartitionsResponse, QueryWorkflowRequest as api_QueryWorkflowRequest, QueryWorkflowResponse as api_QueryWorkflowResponse, RequestCancelWorkflowExecutionRequest as api_RequestCancelWorkflowExecutionRequest, RequestCancelWorkflowExecutionResponse as api_RequestCancelWorkflowExecutionResponse, ResetWorkflowExecutionRequest as api_ResetWorkflowExecutionRequest, ResetWorkflowExecutionResponse as api_ResetWorkflowExecutionResponse, SignalWithStartWorkflowExecutionRequest as api_SignalWithStartWorkflowExecutionRequest, SignalWithStartWorkflowExecutionResponse as api_SignalWithStartWorkflowExecutionResponse, SignalWorkflowExecutionRequest as api_SignalWorkflowExecutionRequest, SignalWorkflowExecutionResponse as api_SignalWorkflowExecutionResponse, StartWorkflowExecutionRequest as api_StartWorkflowExecutionRequest, StartWorkflowExecutionResponse as api_StartWorkflowExecutionResponse, TerminateWorkflowExecutionRequest as api_TerminateWorkflowExecutionRequest, TerminateWorkflowExecutionResponse as api_TerminateWorkflowExecutionResponse, WorkflowAPI } from '../../generated/proto/cadence-idl/uber/cadence/api/v1/service_workflow.js';
import { IClusterInfo as shared_IClusterInfo } from '../../generated/thrift/cadence-idl/com/uber/cadence/ClusterInfo.js';
import { ICountWorkflowExecutionsRequest as shared_ICountWorkflowExecutionsRequest } from '../../generated/thrift/cadence-idl/com/uber/cadence/CountWorkflowExecutionsRequest.js';
import { ICountWorkflowExecutionsResponse as shared_ICountWorkflowExecutionsResponse } from '../../generated/thrift/cadence-idl/com/uber/cadence/CountWorkflowExecutionsResponse.js';
import { IDeleteDomainRequest as shared_IDeleteDomainRequest } from '../../generated/thrift/cadence-idl/com/uber/cadence/DeleteDomainRequest.js';
import { IDeprecateDomainRequest as shared_IDeprecateDomainRequest } from '../../generated/thrift/cadence-idl/com/uber/cadence/DeprecateDomainRequest.js';
import { IDescribeDomainRequest as shared_IDescribeDomainRequest } from '../../generated/thrift/cadence-idl/com/uber/cadence/DescribeDomainRequest.js';
import { IDescribeDomainResponse as shared_IDescribeDomainResponse } from '../../generated/thrift/cadence-idl/com/uber/cadence/DescribeDomainResponse.js';
import { IDescribeTaskListRequest as shared_IDescribeTaskListRequest } from '../../generated/thrift/cadence-idl/com/uber/cadence/DescribeTaskListRequest.js';
import { IDescribeTaskListResponse as shared_IDescribeTaskListResponse } from '../../generated/thrift/cadence-idl/com/uber/cadence/DescribeTaskListResponse.js';
import { IDescribeWorkflowExecutionRequest as shared_IDescribeWorkflowExecutionRequest } from '../../generated/thrift/cadence-idl/com/uber/cadence/DescribeWorkflowExecutionRequest.js';
import { IDescribeWorkflowExecutionResponse as shared_IDescribeWorkflowExecutionResponse } from '../../generated/thrift/cadence-idl/com/uber/cadence/DescribeWorkflowExecutionResponse.js';
import { IDiagnoseWorkflowExecutionRequest as shared_IDiagnoseWorkflowExecutionRequest } from '../../generated/thrift/cadence-idl/com/uber/cadence/DiagnoseWorkflowExecutionRequest.js';
import { IDiagnoseWorkflowExecutionResponse as shared_IDiagnoseWorkflowExecutionResponse } from '../../generated/thrift/cadence-idl/com/uber/cadence/DiagnoseWorkflowExecutionResponse.js';
import { IFailoverDomainRequest as shared_IFailoverDomainRequest } from '../../generated/thrift/cadence-idl/com/uber/cadence/FailoverDomainRequest.js';
import { IFailoverDomainResponse as shared_IFailoverDomainResponse } from '../../generated/thrift/cadence-idl/com/uber/cadence/FailoverDomainResponse.js';
import { IGetSearchAttributesResponse as shared_IGetSearchAttributesResponse } from '../../generated/thrift/cadence-idl/com/uber/cadence/GetSearchAttributesResponse.js';
import { IGetTaskListsByDomainRequest as shared_IGetTaskListsByDomainRequest } from '../../generated/thrift/cadence-idl/com/uber/cadence/GetTaskListsByDomainRequest.js';
import { IGetTaskListsByDomainResponse as shared_IGetTaskListsByDomainResponse } from '../../generated/thrift/cadence-idl/com/uber/cadence/GetTaskListsByDomainResponse.js';
import { IGetWorkflowExecutionHistoryRequest as shared_IGetWorkflowExecutionHistoryRequest } from '../../generated/thrift/cadence-idl/com/uber/cadence/GetWorkflowExecutionHistoryRequest.js';
import { IGetWorkflowExecutionHistoryResponse as shared_IGetWorkflowExecutionHistoryResponse } from '../../generated/thrift/cadence-idl/com/uber/cadence/GetWorkflowExecutionHistoryResponse.js';
import { IListArchivedWorkflowExecutionsRequest as shared_IListArchivedWorkflowExecutionsRequest } from '../../generated/thrift/cadence-idl/com/uber/cadence/ListArchivedWorkflowExecutionsRequest.js';
import { IListArchivedWorkflowExecutionsResponse as shared_IListArchivedWorkflowExecutionsResponse } from '../../generated/thrift/cadence-idl/com/uber/cadence/ListArchivedWorkflowExecutionsResponse.js';
import { IListClosedWorkflowExecutionsRequest as shared_IListClosedWorkflowExecutionsRequest } from '../../generated/thrift/cadence-idl/com/uber/cadence/ListClosedWorkflowExecutionsRequest.js';
import { IListClosedWorkflowExecutionsResponse as shared_IListClosedWorkflowExecutionsResponse } from '../../generated/thrift/cadence-idl/com/uber/cadence/ListClosedWorkflowExecutionsResponse.js';
import { IListDomainsRequest as shared_IListDomainsRequest } from '../../generated/thrift/cadence-idl/com/uber/cadence/ListDomainsRequest.js';
import { IListDomainsResponse as shared_IListDomainsResponse } from '../../generated/thrift/cadence-idl/com/uber/cadence/ListDomainsResponse.js';
import { IListFailoverHistoryRequest as shared_IListFailoverHistoryRequest } from '../../generated/thrift/cadence-idl/com/uber/cadence/ListFailoverHistoryRequest.js';
import { IListFailoverHistoryResponse as shared_IListFailoverHistoryResponse } from '../../generated/thrift/cadence-idl/com/uber/cadence/ListFailoverHistoryResponse.js';
import { IListOpenWorkflowExecutionsRequest as shared_IListOpenWorkflowExecutionsRequest } from '../../generated/thrift/cadence-idl/com/uber/cadence/ListOpenWorkflowExecutionsRequest.js';
import { IListOpenWorkflowExecutionsResponse as shared_IListOpenWorkflowExecutionsResponse } from '../../generated/thrift/cadence-idl/com/uber/cadence/ListOpenWorkflowExecutionsResponse.js';
import { IListTaskListPartitionsRequest as shared_IListTaskListPartitionsRequest } from '../../generated/thrift/cadence-idl/com/uber/cadence/ListTaskListPartitionsRequest.js';
import { IListTaskListPartitionsResponse as shared_IListTaskListPartitionsResponse } from '../../generated/thrift/cadence-idl/com/uber/cadence/ListTaskListPartitionsResponse.js';
import { IListWorkflowExecutionsRequest as shared_IListWorkflowExecutionsRequest } from '../../generated/thrift/cadence-idl/com/uber/cadence/ListWorkflowExecutionsRequest.js';
import { IListWorkflowExecutionsResponse as shared_IListWorkflowExecutionsResponse } from '../../generated/thrift/cadence-idl/com/uber/cadence/ListWorkflowExecutionsResponse.js';
import { IPollForActivityTaskRequest as shared_IPollForActivityTaskRequest } from '../../generated/thrift/cadence-idl/com/uber/cadence/PollForActivityTaskRequest.js';
import { IPollForActivityTaskResponse as shared_IPollForActivityTaskResponse } from '../../generated/thrift/cadence-idl/com/uber/cadence/PollForActivityTaskResponse.js';
import { IPollForDecisionTaskRequest as shared_IPollForDecisionTaskRequest } from '../../generated/thrift/cadence-idl/com/uber/cadence/PollForDecisionTaskRequest.js';
import { IPollForDecisionTaskResponse as shared_IPollForDecisionTaskResponse } from '../../generated/thrift/cadence-idl/com/uber/cadence/PollForDecisionTaskResponse.js';
import { IQueryWorkflowRequest as shared_IQueryWorkflowRequest } from '../../generated/thrift/cadence-idl/com/uber/cadence/QueryWorkflowRequest.js';
import { IQueryWorkflowResponse as shared_IQueryWorkflowResponse } from '../../generated/thrift/cadence-idl/com/uber/cadence/QueryWorkflowResponse.js';
import { IRecordActivityTaskHeartbeatByIDRequest as shared_IRecordActivityTaskHeartbeatByIDRequest } from '../../generated/thrift/cadence-idl/com/uber/cadence/RecordActivityTaskHeartbeatByIDRequest.js';
import { IRecordActivityTaskHeartbeatRequest as shared_IRecordActivityTaskHeartbeatRequest } from '../../generated/thrift/cadence-idl/com/uber/cadence/RecordActivityTaskHeartbeatRequest.js';
import { IRecordActivityTaskHeartbeatResponse as shared_IRecordActivityTaskHeartbeatResponse } from '../../generated/thrift/cadence-idl/com/uber/cadence/RecordActivityTaskHeartbeatResponse.js';
import { IRefreshWorkflowTasksRequest as shared_IRefreshWorkflowTasksRequest } from '../../generated/thrift/cadence-idl/com/uber/cadence/RefreshWorkflowTasksRequest.js';
import { IRegisterDomainRequest as shared_IRegisterDomainRequest } from '../../generated/thrift/cadence-idl/com/uber/cadence/RegisterDomainRequest.js';
import { IRequestCancelWorkflowExecutionRequest as shared_IRequestCancelWorkflowExecutionRequest } from '../../generated/thrift/cadence-idl/com/uber/cadence/RequestCancelWorkflowExecutionRequest.js';
import { IResetStickyTaskListRequest as shared_IResetStickyTaskListRequest } from '../../generated/thrift/cadence-idl/com/uber/cadence/ResetStickyTaskListRequest.js';
import { IResetStickyTaskListResponse as shared_IResetStickyTaskListResponse } from '../../generated/thrift/cadence-idl/com/uber/cadence/ResetStickyTaskListResponse.js';
import { IResetWorkflowExecutionRequest as shared_IResetWorkflowExecutionRequest } from '../../generated/thrift/cadence-idl/com/uber/cadence/ResetWorkflowExecutionRequest.js';
import { IResetWorkflowExecutionResponse as shared_IResetWorkflowExecutionResponse } from '../../generated/thrift/cadence-idl/com/uber/cadence/ResetWorkflowExecutionResponse.js';
import { IRespondActivityTaskCanceledByIDRequest as shared_IRespondActivityTaskCanceledByIDRequest } from '../../generated/thrift/cadence-idl/com/uber/cadence/RespondActivityTaskCanceledByIDRequest.js';
import { IRespondActivityTaskCanceledRequest as shared_IRespondActivityTaskCanceledRequest } from '../../generated/thrift/cadence-idl/com/uber/cadence/RespondActivityTaskCanceledRequest.js';
import { IRespondActivityTaskCompletedByIDRequest as shared_IRespondActivityTaskCompletedByIDRequest } from '../../generated/thrift/cadence-idl/com/uber/cadence/RespondActivityTaskCompletedByIDRequest.js';
import { IRespondActivityTaskCompletedRequest as shared_IRespondActivityTaskCompletedRequest } from '../../generated/thrift/cadence-idl/com/uber/cadence/RespondActivityTaskCompletedRequest.js';
import { IRespondActivityTaskFailedByIDRequest as shared_IRespondActivityTaskFailedByIDRequest } from '../../generated/thrift/cadence-idl/com/uber/cadence/RespondActivityTaskFailedByIDRequest.js';
import { IRespondActivityTaskFailedRequest as shared_IRespondActivityTaskFailedRequest } from '../../generated/thrift/cadence-idl/com/uber/cadence/RespondActivityTaskFailedRequest.js';
import { IRespondDecisionTaskCompletedRequest as shared_IRespondDecisionTaskCompletedRequest } from '../../generated/thrift/cadence-idl/com/uber/cadence/RespondDecisionTaskCompletedRequest.js';
import { IRespondDecisionTaskCompletedResponse as shared_IRespondDecisionTaskCompletedResponse } from '../../generated/thrift/cadence-idl/com/uber/cadence/RespondDecisionTaskCompletedResponse.js';
import { IRespondDecisionTaskFailedRequest as shared_IRespondDecisionTaskFailedRequest } from '../../generated/thrift/cadence-idl/com/uber/cadence/RespondDecisionTaskFailedRequest.js';
import { IRespondQueryTaskCompletedRequest as shared_IRespondQueryTaskCompletedRequest } from '../../generated/thrift/cadence-idl/com/uber/cadence/RespondQueryTaskCompletedRequest.js';
import { IRestartWorkflowExecutionRequest as shared_IRestartWorkflowExecutionRequest } from '../../generated/thrift/cadence-idl/com/uber/cadence/RestartWorkflowExecutionRequest.js';
import { IRestartWorkflowExecutionResponse as shared_IRestartWorkflowExecutionResponse } from '../../generated/thrift/cadence-idl/com/uber/cadence/RestartWorkflowExecutionResponse.js';
import { ISignalWithStartWorkflowExecutionAsyncRequest as shared_ISignalWithStartWorkflowExecutionAsyncRequest } from '../../generated/thrift/cadence-idl/com/uber/cadence/SignalWithStartWorkflowExecutionAsyncRequest.js';
import { ISignalWithStartWorkflowExecutionAsyncResponse as shared_ISignalWithStartWorkflowExecutionAsyncResponse } from '../../generated/thrift/cadence-idl/com/uber/cadence/SignalWithStartWorkflowExecutionAsyncResponse.js';
import { ISignalWithStartWorkflowExecutionRequest as shared_ISignalWithStartWorkflowExecutionRequest } from '../../generated/thrift/cadence-idl/com/uber/cadence/SignalWithStartWorkflowExecutionRequest.js';
import { ISignalWorkflowExecutionRequest as shared_ISignalWorkflowExecutionRequest } from '../../generated/thrift/cadence-idl/com/uber/cadence/SignalWorkflowExecutionRequest.js';
import { IStartWorkflowExecutionAsyncRequest as shared_IStartWorkflowExecutionAsyncRequest } from '../../generated/thrift/cadence-idl/com/uber/cadence/StartWorkflowExecutionAsyncRequest.js';
import { IStartWorkflowExecutionAsyncResponse as shared_IStartWorkflowExecutionAsyncResponse } from '../../generated/thrift/cadence-idl/com/uber/cadence/StartWorkflowExecutionAsyncResponse.js';
import { IStartWorkflowExecutionRequest as shared_IStartWorkflowExecutionRequest } from '../../generated/thrift/cadence-idl/com/uber/cadence/StartWorkflowExecutionRequest.js';
import { IStartWorkflowExecutionResponse as shared_IStartWorkflowExecutionResponse } from '../../generated/thrift/cadence-idl/com/uber/cadence/StartWorkflowExecutionResponse.js';
import { ITerminateWorkflowExecutionRequest as shared_ITerminateWorkflowExecutionRequest } from '../../generated/thrift/cadence-idl/com/uber/cadence/TerminateWorkflowExecutionRequest.js';
import { IUpdateDomainRequest as shared_IUpdateDomainRequest } from '../../generated/thrift/cadence-idl/com/uber/cadence/UpdateDomainRequest.js';
import { IUpdateDomainResponse as shared_IUpdateDomainResponse } from '../../generated/thrift/cadence-idl/com/uber/cadence/UpdateDomainResponse.js';

export class thrift2protoAdapter {
  constructor(init?: Partial<thrift2protoAdapter>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  domain?: DomainAPI;

  workflow?: WorkflowAPI;

  worker?: WorkerAPI;

  visibility?: VisibilityAPI;

  async CountWorkflowExecutions(ctx: Context, request: shared_ICountWorkflowExecutionsRequest, ...opts: unknown[]): Promise<shared_ICountWorkflowExecutionsResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async DeprecateDomain(ctx: Context, request: shared_IDeprecateDomainRequest, ...opts: unknown[]): Promise<void> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async DescribeDomain(ctx: Context, request: shared_IDescribeDomainRequest, ...opts: unknown[]): Promise<shared_IDescribeDomainResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async DescribeTaskList(ctx: Context, request: shared_IDescribeTaskListRequest, ...opts: unknown[]): Promise<shared_IDescribeTaskListResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async DescribeWorkflowExecution(ctx: Context, request: shared_IDescribeWorkflowExecutionRequest, ...opts: unknown[]): Promise<shared_IDescribeWorkflowExecutionResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async DiagnoseWorkflowExecution(ctx: Context, request: shared_IDiagnoseWorkflowExecutionRequest, ...opts: unknown[]): Promise<shared_IDiagnoseWorkflowExecutionResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async GetClusterInfo(ctx: Context, ...opts: unknown[]): Promise<shared_IClusterInfo> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async GetSearchAttributes(ctx: Context, ...opts: unknown[]): Promise<shared_IGetSearchAttributesResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async GetWorkflowExecutionHistory(ctx: Context, request: shared_IGetWorkflowExecutionHistoryRequest, ...opts: unknown[]): Promise<shared_IGetWorkflowExecutionHistoryResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async ListArchivedWorkflowExecutions(ctx: Context, request: shared_IListArchivedWorkflowExecutionsRequest, ...opts: unknown[]): Promise<shared_IListArchivedWorkflowExecutionsResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async ListClosedWorkflowExecutions(ctx: Context, request: shared_IListClosedWorkflowExecutionsRequest, ...opts: unknown[]): Promise<shared_IListClosedWorkflowExecutionsResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async ListDomains(ctx: Context, request: shared_IListDomainsRequest, ...opts: unknown[]): Promise<shared_IListDomainsResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async ListOpenWorkflowExecutions(ctx: Context, request: shared_IListOpenWorkflowExecutionsRequest, ...opts: unknown[]): Promise<shared_IListOpenWorkflowExecutionsResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async ListTaskListPartitions(ctx: Context, request: shared_IListTaskListPartitionsRequest, ...opts: unknown[]): Promise<shared_IListTaskListPartitionsResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async ListWorkflowExecutions(ctx: Context, request: shared_IListWorkflowExecutionsRequest, ...opts: unknown[]): Promise<shared_IListWorkflowExecutionsResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async PollForActivityTask(ctx: Context, request: shared_IPollForActivityTaskRequest, ...opts: unknown[]): Promise<shared_IPollForActivityTaskResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async PollForDecisionTask(ctx: Context, request: shared_IPollForDecisionTaskRequest, ...opts: unknown[]): Promise<shared_IPollForDecisionTaskResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async QueryWorkflow(ctx: Context, request: shared_IQueryWorkflowRequest, ...opts: unknown[]): Promise<shared_IQueryWorkflowResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async RecordActivityTaskHeartbeat(ctx: Context, request: shared_IRecordActivityTaskHeartbeatRequest, ...opts: unknown[]): Promise<shared_IRecordActivityTaskHeartbeatResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async RecordActivityTaskHeartbeatByID(ctx: Context, request: shared_IRecordActivityTaskHeartbeatByIDRequest, ...opts: unknown[]): Promise<shared_IRecordActivityTaskHeartbeatResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async RegisterDomain(ctx: Context, request: shared_IRegisterDomainRequest, ...opts: unknown[]): Promise<void> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async RequestCancelWorkflowExecution(ctx: Context, request: shared_IRequestCancelWorkflowExecutionRequest, ...opts: unknown[]): Promise<void> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async ResetStickyTaskList(ctx: Context, request: shared_IResetStickyTaskListRequest, ...opts: unknown[]): Promise<shared_IResetStickyTaskListResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async ResetWorkflowExecution(ctx: Context, request: shared_IResetWorkflowExecutionRequest, ...opts: unknown[]): Promise<shared_IResetWorkflowExecutionResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async RespondActivityTaskCanceled(ctx: Context, request: shared_IRespondActivityTaskCanceledRequest, ...opts: unknown[]): Promise<void> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async RespondActivityTaskCanceledByID(ctx: Context, request: shared_IRespondActivityTaskCanceledByIDRequest, ...opts: unknown[]): Promise<void> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async RespondActivityTaskCompleted(ctx: Context, request: shared_IRespondActivityTaskCompletedRequest, ...opts: unknown[]): Promise<void> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async RespondActivityTaskCompletedByID(ctx: Context, request: shared_IRespondActivityTaskCompletedByIDRequest, ...opts: unknown[]): Promise<void> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async RespondActivityTaskFailed(ctx: Context, request: shared_IRespondActivityTaskFailedRequest, ...opts: unknown[]): Promise<void> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async RespondActivityTaskFailedByID(ctx: Context, request: shared_IRespondActivityTaskFailedByIDRequest, ...opts: unknown[]): Promise<void> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async RespondDecisionTaskCompleted(ctx: Context, request: shared_IRespondDecisionTaskCompletedRequest, ...opts: unknown[]): Promise<shared_IRespondDecisionTaskCompletedResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async RespondDecisionTaskFailed(ctx: Context, request: shared_IRespondDecisionTaskFailedRequest, ...opts: unknown[]): Promise<void> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async RespondQueryTaskCompleted(ctx: Context, request: shared_IRespondQueryTaskCompletedRequest, ...opts: unknown[]): Promise<void> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async ScanWorkflowExecutions(ctx: Context, request: shared_IListWorkflowExecutionsRequest, ...opts: unknown[]): Promise<shared_IListWorkflowExecutionsResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async SignalWithStartWorkflowExecution(ctx: Context, request: shared_ISignalWithStartWorkflowExecutionRequest, ...opts: unknown[]): Promise<shared_IStartWorkflowExecutionResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async SignalWithStartWorkflowExecutionAsync(ctx: Context, request: shared_ISignalWithStartWorkflowExecutionAsyncRequest, ...opts: unknown[]): Promise<shared_ISignalWithStartWorkflowExecutionAsyncResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async SignalWorkflowExecution(ctx: Context, request: shared_ISignalWorkflowExecutionRequest, ...opts: unknown[]): Promise<void> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async StartWorkflowExecution(ctx: Context, request: shared_IStartWorkflowExecutionRequest, ...opts: unknown[]): Promise<shared_IStartWorkflowExecutionResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async StartWorkflowExecutionAsync(ctx: Context, request: shared_IStartWorkflowExecutionAsyncRequest, ...opts: unknown[]): Promise<shared_IStartWorkflowExecutionAsyncResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async TerminateWorkflowExecution(ctx: Context, request: shared_ITerminateWorkflowExecutionRequest, ...opts: unknown[]): Promise<void> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async UpdateDomain(ctx: Context, request: shared_IUpdateDomainRequest, ...opts: unknown[]): Promise<shared_IUpdateDomainResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async GetTaskListsByDomain(ctx: Context, request: shared_IGetTaskListsByDomainRequest, ...opts: unknown[]): Promise<shared_IGetTaskListsByDomainResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async RefreshWorkflowTasks(ctx: Context, request: shared_IRefreshWorkflowTasksRequest, ...opts: unknown[]): Promise<void> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async RestartWorkflowExecution(ctx: Context, request: shared_IRestartWorkflowExecutionRequest, ...opts: unknown[]): Promise<shared_IRestartWorkflowExecutionResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async DeleteDomain(ctx: Context, deleteRequest: shared_IDeleteDomainRequest, ...opts: unknown[]): Promise<void> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async FailoverDomain(ctx: Context, request: shared_IFailoverDomainRequest, ...opts: unknown[]): Promise<shared_IFailoverDomainResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async ListFailoverHistory(ctx: Context, request: shared_IListFailoverHistoryRequest, ...opts: unknown[]): Promise<shared_IListFailoverHistoryResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

}

export class domainAPIthriftAdapter {
  constructor(init?: Partial<domainAPIthriftAdapter>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  service?: WorkflowServiceClientLike;

  async RegisterDomain(ctx: Context, request: api_RegisterDomainRequest, ...opts: unknown[]): Promise<api_RegisterDomainResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async DescribeDomain(ctx: Context, request: api_DescribeDomainRequest, ...opts: unknown[]): Promise<api_DescribeDomainResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async ListDomains(ctx: Context, request: api_ListDomainsRequest, ...opts: unknown[]): Promise<api_ListDomainsResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async UpdateDomain(ctx: Context, request: api_UpdateDomainRequest, ...opts: unknown[]): Promise<api_UpdateDomainResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async DeprecateDomain(ctx: Context, request: api_DeprecateDomainRequest, ...opts: unknown[]): Promise<api_DeprecateDomainResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

}

export class workflowAPIthriftAdapter {
  constructor(init?: Partial<workflowAPIthriftAdapter>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  service?: WorkflowServiceClientLike;

  async StartWorkflowExecution(ctx: Context, request: api_StartWorkflowExecutionRequest, ...opts: unknown[]): Promise<api_StartWorkflowExecutionResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async SignalWorkflowExecution(ctx: Context, request: api_SignalWorkflowExecutionRequest, ...opts: unknown[]): Promise<api_SignalWorkflowExecutionResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async SignalWithStartWorkflowExecution(ctx: Context, request: api_SignalWithStartWorkflowExecutionRequest, ...opts: unknown[]): Promise<api_SignalWithStartWorkflowExecutionResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async ResetWorkflowExecution(ctx: Context, request: api_ResetWorkflowExecutionRequest, ...opts: unknown[]): Promise<api_ResetWorkflowExecutionResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async RequestCancelWorkflowExecution(ctx: Context, request: api_RequestCancelWorkflowExecutionRequest, ...opts: unknown[]): Promise<api_RequestCancelWorkflowExecutionResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async TerminateWorkflowExecution(ctx: Context, request: api_TerminateWorkflowExecutionRequest, ...opts: unknown[]): Promise<api_TerminateWorkflowExecutionResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async DescribeWorkflowExecution(ctx: Context, request: api_DescribeWorkflowExecutionRequest, ...opts: unknown[]): Promise<api_DescribeWorkflowExecutionResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async DiagnoseWorkflowExecution(ctx: Context, request: api_DiagnoseWorkflowExecutionRequest, ...opts: unknown[]): Promise<api_DiagnoseWorkflowExecutionResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async QueryWorkflow(ctx: Context, request: api_QueryWorkflowRequest, ...opts: unknown[]): Promise<api_QueryWorkflowResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async DescribeTaskList(ctx: Context, request: api_DescribeTaskListRequest, ...opts: unknown[]): Promise<api_DescribeTaskListResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async ListTaskListPartitions(ctx: Context, request: api_ListTaskListPartitionsRequest, ...opts: unknown[]): Promise<api_ListTaskListPartitionsResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async GetClusterInfo(ctx: Context, request: api_GetClusterInfoRequest, ...opts: unknown[]): Promise<api_GetClusterInfoResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async GetWorkflowExecutionHistory(ctx: Context, request: api_GetWorkflowExecutionHistoryRequest, ...opts: unknown[]): Promise<api_GetWorkflowExecutionHistoryResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

}

export class workerAPIthriftAdapter {
  constructor(init?: Partial<workerAPIthriftAdapter>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  service?: WorkflowServiceClientLike;

  async PollForDecisionTask(ctx: Context, request: api_PollForDecisionTaskRequest, ...opts: unknown[]): Promise<api_PollForDecisionTaskResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async RespondDecisionTaskCompleted(ctx: Context, request: api_RespondDecisionTaskCompletedRequest, ...opts: unknown[]): Promise<api_RespondDecisionTaskCompletedResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async RespondDecisionTaskFailed(ctx: Context, request: api_RespondDecisionTaskFailedRequest, ...opts: unknown[]): Promise<api_RespondDecisionTaskFailedResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async PollForActivityTask(ctx: Context, request: api_PollForActivityTaskRequest, ...opts: unknown[]): Promise<api_PollForActivityTaskResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async RespondActivityTaskCompleted(ctx: Context, request: api_RespondActivityTaskCompletedRequest, ...opts: unknown[]): Promise<api_RespondActivityTaskCompletedResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async RespondActivityTaskCompletedByID(ctx: Context, request: api_RespondActivityTaskCompletedByIDRequest, ...opts: unknown[]): Promise<api_RespondActivityTaskCompletedByIDResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async RespondActivityTaskFailed(ctx: Context, request: api_RespondActivityTaskFailedRequest, ...opts: unknown[]): Promise<api_RespondActivityTaskFailedResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async RespondActivityTaskFailedByID(ctx: Context, request: api_RespondActivityTaskFailedByIDRequest, ...opts: unknown[]): Promise<api_RespondActivityTaskFailedByIDResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async RespondActivityTaskCanceled(ctx: Context, request: api_RespondActivityTaskCanceledRequest, ...opts: unknown[]): Promise<api_RespondActivityTaskCanceledResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async RespondActivityTaskCanceledByID(ctx: Context, request: api_RespondActivityTaskCanceledByIDRequest, ...opts: unknown[]): Promise<api_RespondActivityTaskCanceledByIDResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async RecordActivityTaskHeartbeat(ctx: Context, request: api_RecordActivityTaskHeartbeatRequest, ...opts: unknown[]): Promise<api_RecordActivityTaskHeartbeatResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async RecordActivityTaskHeartbeatByID(ctx: Context, request: api_RecordActivityTaskHeartbeatByIDRequest, ...opts: unknown[]): Promise<api_RecordActivityTaskHeartbeatByIDResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async RespondQueryTaskCompleted(ctx: Context, request: api_RespondQueryTaskCompletedRequest, ...opts: unknown[]): Promise<api_RespondQueryTaskCompletedResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async ResetStickyTaskList(ctx: Context, request: api_ResetStickyTaskListRequest, ...opts: unknown[]): Promise<api_ResetStickyTaskListResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

}

export class visibilityAPIthriftAdapter {
  constructor(init?: Partial<visibilityAPIthriftAdapter>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  service?: WorkflowServiceClientLike;

  async ListWorkflowExecutions(ctx: Context, request: api_ListWorkflowExecutionsRequest, ...opts: unknown[]): Promise<api_ListWorkflowExecutionsResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async ListOpenWorkflowExecutions(ctx: Context, request: api_ListOpenWorkflowExecutionsRequest, ...opts: unknown[]): Promise<api_ListOpenWorkflowExecutionsResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async ListClosedWorkflowExecutions(ctx: Context, request: api_ListClosedWorkflowExecutionsRequest, ...opts: unknown[]): Promise<api_ListClosedWorkflowExecutionsResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async ListArchivedWorkflowExecutions(ctx: Context, request: api_ListArchivedWorkflowExecutionsRequest, ...opts: unknown[]): Promise<api_ListArchivedWorkflowExecutionsResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async ScanWorkflowExecutions(ctx: Context, request: api_ScanWorkflowExecutionsRequest, ...opts: unknown[]): Promise<api_ScanWorkflowExecutionsResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async CountWorkflowExecutions(ctx: Context, request: api_CountWorkflowExecutionsRequest, ...opts: unknown[]): Promise<api_CountWorkflowExecutionsResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async GetSearchAttributes(ctx: Context, request: api_GetSearchAttributesRequest, ...opts: unknown[]): Promise<api_GetSearchAttributesResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

}

export function NewThrift2ProtoAdapter(domain: DomainAPI, workflow: WorkflowAPI, worker: WorkerAPI, visibility: VisibilityAPI): WorkflowServiceClientLike {
  throw new globalThis.Error("not implemented"); // @stub
}

export function NewDomainAPITriftAdapter(thrift: WorkflowServiceClientLike): domainAPIthriftAdapter {
  throw new globalThis.Error("not implemented"); // @stub
}

export function NewWorkflowAPITriftAdapter(thrift: WorkflowServiceClientLike): workflowAPIthriftAdapter {
  throw new globalThis.Error("not implemented"); // @stub
}

export function NewWorkerAPITriftAdapter(thrift: WorkflowServiceClientLike): workerAPIthriftAdapter {
  throw new globalThis.Error("not implemented"); // @stub
}

export function NewVisibilityAPITriftAdapter(thrift: WorkflowServiceClientLike): visibilityAPIthriftAdapter {
  throw new globalThis.Error("not implemented"); // @stub
}
