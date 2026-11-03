import { DeleteDomainRequest as api_DeleteDomainRequest, DeprecateDomainRequest as api_DeprecateDomainRequest, DescribeDomainRequest as api_DescribeDomainRequest, FailoverDomainRequest as api_FailoverDomainRequest, ListDomainsRequest as api_ListDomainsRequest, ListFailoverHistoryRequest as api_ListFailoverHistoryRequest, RegisterDomainRequest as api_RegisterDomainRequest, UpdateDomainRequest as api_UpdateDomainRequest } from '../../../generated/proto/cadence-idl/uber/cadence/api/v1/service_domain.js';
import { CountWorkflowExecutionsRequest as api_CountWorkflowExecutionsRequest, ListArchivedWorkflowExecutionsRequest as api_ListArchivedWorkflowExecutionsRequest, ListClosedWorkflowExecutionsRequest as api_ListClosedWorkflowExecutionsRequest, ListOpenWorkflowExecutionsRequest as api_ListOpenWorkflowExecutionsRequest, ListWorkflowExecutionsRequest as api_ListWorkflowExecutionsRequest, ScanWorkflowExecutionsRequest as api_ScanWorkflowExecutionsRequest } from '../../../generated/proto/cadence-idl/uber/cadence/api/v1/service_visibility.js';
import { PollForActivityTaskRequest as api_PollForActivityTaskRequest, PollForDecisionTaskRequest as api_PollForDecisionTaskRequest, RecordActivityTaskHeartbeatByIDRequest as api_RecordActivityTaskHeartbeatByIDRequest, RecordActivityTaskHeartbeatRequest as api_RecordActivityTaskHeartbeatRequest, ResetStickyTaskListRequest as api_ResetStickyTaskListRequest, RespondActivityTaskCanceledByIDRequest as api_RespondActivityTaskCanceledByIDRequest, RespondActivityTaskCanceledRequest as api_RespondActivityTaskCanceledRequest, RespondActivityTaskCompletedByIDRequest as api_RespondActivityTaskCompletedByIDRequest, RespondActivityTaskCompletedRequest as api_RespondActivityTaskCompletedRequest, RespondActivityTaskFailedByIDRequest as api_RespondActivityTaskFailedByIDRequest, RespondActivityTaskFailedRequest as api_RespondActivityTaskFailedRequest, RespondDecisionTaskCompletedRequest as api_RespondDecisionTaskCompletedRequest, RespondDecisionTaskFailedRequest as api_RespondDecisionTaskFailedRequest, RespondQueryTaskCompletedRequest as api_RespondQueryTaskCompletedRequest } from '../../../generated/proto/cadence-idl/uber/cadence/api/v1/service_worker.js';
import { DescribeTaskListRequest as api_DescribeTaskListRequest, DescribeWorkflowExecutionRequest as api_DescribeWorkflowExecutionRequest, DiagnoseWorkflowExecutionRequest as api_DiagnoseWorkflowExecutionRequest, GetWorkflowExecutionHistoryRequest as api_GetWorkflowExecutionHistoryRequest, ListTaskListPartitionsRequest as api_ListTaskListPartitionsRequest, QueryWorkflowRequest as api_QueryWorkflowRequest, RefreshWorkflowTasksRequest as api_RefreshWorkflowTasksRequest, RequestCancelWorkflowExecutionRequest as api_RequestCancelWorkflowExecutionRequest, ResetWorkflowExecutionRequest as api_ResetWorkflowExecutionRequest, RestartWorkflowExecutionRequest as api_RestartWorkflowExecutionRequest, SignalWithStartWorkflowExecutionAsyncRequest as api_SignalWithStartWorkflowExecutionAsyncRequest, SignalWithStartWorkflowExecutionRequest as api_SignalWithStartWorkflowExecutionRequest, SignalWorkflowExecutionRequest as api_SignalWorkflowExecutionRequest, StartWorkflowExecutionAsyncRequest as api_StartWorkflowExecutionAsyncRequest, StartWorkflowExecutionRequest as api_StartWorkflowExecutionRequest, TerminateWorkflowExecutionRequest as api_TerminateWorkflowExecutionRequest } from '../../../generated/proto/cadence-idl/uber/cadence/api/v1/service_workflow.js';
import { ICountWorkflowExecutionsRequest as shared_ICountWorkflowExecutionsRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/CountWorkflowExecutionsRequest.js';
import { IDeleteDomainRequest as shared_IDeleteDomainRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/DeleteDomainRequest.js';
import { IDeprecateDomainRequest as shared_IDeprecateDomainRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/DeprecateDomainRequest.js';
import { IDescribeDomainRequest as shared_IDescribeDomainRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/DescribeDomainRequest.js';
import { IDescribeTaskListRequest as shared_IDescribeTaskListRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/DescribeTaskListRequest.js';
import { IDescribeWorkflowExecutionRequest as shared_IDescribeWorkflowExecutionRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/DescribeWorkflowExecutionRequest.js';
import { IDiagnoseWorkflowExecutionRequest as shared_IDiagnoseWorkflowExecutionRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/DiagnoseWorkflowExecutionRequest.js';
import { IFailoverDomainRequest as shared_IFailoverDomainRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/FailoverDomainRequest.js';
import { IGetWorkflowExecutionHistoryRequest as shared_IGetWorkflowExecutionHistoryRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/GetWorkflowExecutionHistoryRequest.js';
import { IListArchivedWorkflowExecutionsRequest as shared_IListArchivedWorkflowExecutionsRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ListArchivedWorkflowExecutionsRequest.js';
import { IListClosedWorkflowExecutionsRequest as shared_IListClosedWorkflowExecutionsRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ListClosedWorkflowExecutionsRequest.js';
import { IListDomainsRequest as shared_IListDomainsRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ListDomainsRequest.js';
import { IListFailoverHistoryRequest as shared_IListFailoverHistoryRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ListFailoverHistoryRequest.js';
import { IListOpenWorkflowExecutionsRequest as shared_IListOpenWorkflowExecutionsRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ListOpenWorkflowExecutionsRequest.js';
import { IListTaskListPartitionsRequest as shared_IListTaskListPartitionsRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ListTaskListPartitionsRequest.js';
import { IListWorkflowExecutionsRequest as shared_IListWorkflowExecutionsRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ListWorkflowExecutionsRequest.js';
import { IPollForActivityTaskRequest as shared_IPollForActivityTaskRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/PollForActivityTaskRequest.js';
import { IPollForDecisionTaskRequest as shared_IPollForDecisionTaskRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/PollForDecisionTaskRequest.js';
import { IQueryWorkflowRequest as shared_IQueryWorkflowRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/QueryWorkflowRequest.js';
import { IRecordActivityTaskHeartbeatByIDRequest as shared_IRecordActivityTaskHeartbeatByIDRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/RecordActivityTaskHeartbeatByIDRequest.js';
import { IRecordActivityTaskHeartbeatRequest as shared_IRecordActivityTaskHeartbeatRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/RecordActivityTaskHeartbeatRequest.js';
import { IRefreshWorkflowTasksRequest as shared_IRefreshWorkflowTasksRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/RefreshWorkflowTasksRequest.js';
import { IRegisterDomainRequest as shared_IRegisterDomainRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/RegisterDomainRequest.js';
import { IRequestCancelWorkflowExecutionRequest as shared_IRequestCancelWorkflowExecutionRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/RequestCancelWorkflowExecutionRequest.js';
import { IResetStickyTaskListRequest as shared_IResetStickyTaskListRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ResetStickyTaskListRequest.js';
import { IResetWorkflowExecutionRequest as shared_IResetWorkflowExecutionRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ResetWorkflowExecutionRequest.js';
import { IRespondActivityTaskCanceledByIDRequest as shared_IRespondActivityTaskCanceledByIDRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/RespondActivityTaskCanceledByIDRequest.js';
import { IRespondActivityTaskCanceledRequest as shared_IRespondActivityTaskCanceledRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/RespondActivityTaskCanceledRequest.js';
import { IRespondActivityTaskCompletedByIDRequest as shared_IRespondActivityTaskCompletedByIDRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/RespondActivityTaskCompletedByIDRequest.js';
import { IRespondActivityTaskCompletedRequest as shared_IRespondActivityTaskCompletedRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/RespondActivityTaskCompletedRequest.js';
import { IRespondActivityTaskFailedByIDRequest as shared_IRespondActivityTaskFailedByIDRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/RespondActivityTaskFailedByIDRequest.js';
import { IRespondActivityTaskFailedRequest as shared_IRespondActivityTaskFailedRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/RespondActivityTaskFailedRequest.js';
import { IRespondDecisionTaskCompletedRequest as shared_IRespondDecisionTaskCompletedRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/RespondDecisionTaskCompletedRequest.js';
import { IRespondDecisionTaskFailedRequest as shared_IRespondDecisionTaskFailedRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/RespondDecisionTaskFailedRequest.js';
import { IRespondQueryTaskCompletedRequest as shared_IRespondQueryTaskCompletedRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/RespondQueryTaskCompletedRequest.js';
import { IRestartWorkflowExecutionRequest as shared_IRestartWorkflowExecutionRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/RestartWorkflowExecutionRequest.js';
import { ISignalWithStartWorkflowExecutionAsyncRequest as shared_ISignalWithStartWorkflowExecutionAsyncRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/SignalWithStartWorkflowExecutionAsyncRequest.js';
import { ISignalWithStartWorkflowExecutionRequest as shared_ISignalWithStartWorkflowExecutionRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/SignalWithStartWorkflowExecutionRequest.js';
import { ISignalWorkflowExecutionRequest as shared_ISignalWorkflowExecutionRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/SignalWorkflowExecutionRequest.js';
import { IStartWorkflowExecutionAsyncRequest as shared_IStartWorkflowExecutionAsyncRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/StartWorkflowExecutionAsyncRequest.js';
import { IStartWorkflowExecutionRequest as shared_IStartWorkflowExecutionRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/StartWorkflowExecutionRequest.js';
import { ITerminateWorkflowExecutionRequest as shared_ITerminateWorkflowExecutionRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/TerminateWorkflowExecutionRequest.js';
import { IUpdateDomainRequest as shared_IUpdateDomainRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/UpdateDomainRequest.js';

// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
export function CountWorkflowExecutionsRequest(t: shared_ICountWorkflowExecutionsRequest | undefined): api_CountWorkflowExecutionsRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function DeprecateDomainRequest(t: shared_IDeprecateDomainRequest | undefined): api_DeprecateDomainRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function DescribeDomainRequest(t: shared_IDescribeDomainRequest | undefined): api_DescribeDomainRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function DescribeTaskListRequest(t: shared_IDescribeTaskListRequest | undefined): api_DescribeTaskListRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function DescribeWorkflowExecutionRequest(t: shared_IDescribeWorkflowExecutionRequest | undefined): api_DescribeWorkflowExecutionRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function DiagnoseWorkflowExecutionRequest(t: shared_IDiagnoseWorkflowExecutionRequest | undefined): api_DiagnoseWorkflowExecutionRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function GetWorkflowExecutionHistoryRequest(t: shared_IGetWorkflowExecutionHistoryRequest | undefined): api_GetWorkflowExecutionHistoryRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ListArchivedWorkflowExecutionsRequest(t: shared_IListArchivedWorkflowExecutionsRequest | undefined): api_ListArchivedWorkflowExecutionsRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ListDomainsRequest(t: shared_IListDomainsRequest | undefined): api_ListDomainsRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ListTaskListPartitionsRequest(t: shared_IListTaskListPartitionsRequest | undefined): api_ListTaskListPartitionsRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ListWorkflowExecutionsRequest(t: shared_IListWorkflowExecutionsRequest | undefined): api_ListWorkflowExecutionsRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function PollForActivityTaskRequest(t: shared_IPollForActivityTaskRequest | undefined): api_PollForActivityTaskRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function PollForDecisionTaskRequest(t: shared_IPollForDecisionTaskRequest | undefined): api_PollForDecisionTaskRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function QueryWorkflowRequest(t: shared_IQueryWorkflowRequest | undefined): api_QueryWorkflowRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function RecordActivityTaskHeartbeatByIDRequest(t: shared_IRecordActivityTaskHeartbeatByIDRequest | undefined): api_RecordActivityTaskHeartbeatByIDRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function RecordActivityTaskHeartbeatRequest(t: shared_IRecordActivityTaskHeartbeatRequest | undefined): api_RecordActivityTaskHeartbeatRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function RegisterDomainRequest(t: shared_IRegisterDomainRequest | undefined): api_RegisterDomainRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function RequestCancelWorkflowExecutionRequest(t: shared_IRequestCancelWorkflowExecutionRequest | undefined): api_RequestCancelWorkflowExecutionRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ResetStickyTaskListRequest(t: shared_IResetStickyTaskListRequest | undefined): api_ResetStickyTaskListRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ResetWorkflowExecutionRequest(t: shared_IResetWorkflowExecutionRequest | undefined): api_ResetWorkflowExecutionRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function RespondActivityTaskCanceledByIDRequest(t: shared_IRespondActivityTaskCanceledByIDRequest | undefined): api_RespondActivityTaskCanceledByIDRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function RespondActivityTaskCanceledRequest(t: shared_IRespondActivityTaskCanceledRequest | undefined): api_RespondActivityTaskCanceledRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function RespondActivityTaskCompletedByIDRequest(t: shared_IRespondActivityTaskCompletedByIDRequest | undefined): api_RespondActivityTaskCompletedByIDRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function RespondActivityTaskCompletedRequest(t: shared_IRespondActivityTaskCompletedRequest | undefined): api_RespondActivityTaskCompletedRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function RespondActivityTaskFailedByIDRequest(t: shared_IRespondActivityTaskFailedByIDRequest | undefined): api_RespondActivityTaskFailedByIDRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function RespondActivityTaskFailedRequest(t: shared_IRespondActivityTaskFailedRequest | undefined): api_RespondActivityTaskFailedRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function RespondDecisionTaskCompletedRequest(t: shared_IRespondDecisionTaskCompletedRequest | undefined): api_RespondDecisionTaskCompletedRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function RespondDecisionTaskFailedRequest(t: shared_IRespondDecisionTaskFailedRequest | undefined): api_RespondDecisionTaskFailedRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function RespondQueryTaskCompletedRequest(t: shared_IRespondQueryTaskCompletedRequest | undefined): api_RespondQueryTaskCompletedRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ScanWorkflowExecutionsRequest(t: shared_IListWorkflowExecutionsRequest | undefined): api_ScanWorkflowExecutionsRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function SignalWithStartWorkflowExecutionRequest(t: shared_ISignalWithStartWorkflowExecutionRequest | undefined): api_SignalWithStartWorkflowExecutionRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function SignalWithStartWorkflowExecutionAsyncRequest(t: shared_ISignalWithStartWorkflowExecutionAsyncRequest | undefined): api_SignalWithStartWorkflowExecutionAsyncRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function SignalWorkflowExecutionRequest(t: shared_ISignalWorkflowExecutionRequest | undefined): api_SignalWorkflowExecutionRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function StartWorkflowExecutionRequest(t: shared_IStartWorkflowExecutionRequest | undefined): api_StartWorkflowExecutionRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function StartWorkflowExecutionAsyncRequest(t: shared_IStartWorkflowExecutionAsyncRequest | undefined): api_StartWorkflowExecutionAsyncRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function TerminateWorkflowExecutionRequest(t: shared_ITerminateWorkflowExecutionRequest | undefined): api_TerminateWorkflowExecutionRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function UpdateDomainRequest(t: shared_IUpdateDomainRequest | undefined): api_UpdateDomainRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ListClosedWorkflowExecutionsRequest(r: shared_IListClosedWorkflowExecutionsRequest | undefined): api_ListClosedWorkflowExecutionsRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ListOpenWorkflowExecutionsRequest(r: shared_IListOpenWorkflowExecutionsRequest | undefined): api_ListOpenWorkflowExecutionsRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function RefreshWorkflowTasksRequest(r: shared_IRefreshWorkflowTasksRequest | undefined): api_RefreshWorkflowTasksRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function RestartWorkflowExecutionRequest(r: shared_IRestartWorkflowExecutionRequest | undefined): api_RestartWorkflowExecutionRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function DeleteDomainRequest(r: shared_IDeleteDomainRequest | undefined): api_DeleteDomainRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function FailoverDomainRequest(t: shared_IFailoverDomainRequest | undefined): api_FailoverDomainRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ListFailoverHistoryRequest(t: shared_IListFailoverHistoryRequest | undefined): api_ListFailoverHistoryRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export const DomainUpdateActiveClusterNameField = "active_cluster_name";

export const DomainUpdateActiveClustersField = "active_clusters";

export const DomainUpdateBadBinariesField = "bad_binaries";

export const DomainUpdateClustersField = "clusters";

export const DomainUpdateDataField = "data";

export const DomainUpdateDeleteBadBinaryField = "delete_bad_binary";

export const DomainUpdateDescriptionField = "description";

export const DomainUpdateFailoverTimeoutField = "failover_timeout";

export const DomainUpdateHistoryArchivalStatusField = "history_archival_status";

export const DomainUpdateHistoryArchivalURIField = "history_archival_uri";

export const DomainUpdateOwnerEmailField = "owner_email";

export const DomainUpdateRetentionPeriodField = "workflow_execution_retention_period";

export const DomainUpdateVisibilityArchivalStatusField = "visibility_archival_status";

export const DomainUpdateVisibilityArchivalURIField = "visibility_archival_uri";
