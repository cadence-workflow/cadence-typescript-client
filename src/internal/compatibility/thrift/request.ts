import { DeprecateDomainRequest as api_DeprecateDomainRequest, DescribeDomainRequest as api_DescribeDomainRequest, FailoverDomainRequest as api_FailoverDomainRequest, ListDomainsRequest as api_ListDomainsRequest, ListFailoverHistoryRequest as api_ListFailoverHistoryRequest, RegisterDomainRequest as api_RegisterDomainRequest, UpdateDomainRequest as api_UpdateDomainRequest } from '../../../generated/proto/cadence-idl/uber/cadence/api/v1/service_domain.js';
import { CountWorkflowExecutionsRequest as api_CountWorkflowExecutionsRequest, ListArchivedWorkflowExecutionsRequest as api_ListArchivedWorkflowExecutionsRequest, ListClosedWorkflowExecutionsRequest as api_ListClosedWorkflowExecutionsRequest, ListOpenWorkflowExecutionsRequest as api_ListOpenWorkflowExecutionsRequest, ListWorkflowExecutionsRequest as api_ListWorkflowExecutionsRequest, ScanWorkflowExecutionsRequest as api_ScanWorkflowExecutionsRequest } from '../../../generated/proto/cadence-idl/uber/cadence/api/v1/service_visibility.js';
import { PollForActivityTaskRequest as api_PollForActivityTaskRequest, PollForDecisionTaskRequest as api_PollForDecisionTaskRequest, RecordActivityTaskHeartbeatByIDRequest as api_RecordActivityTaskHeartbeatByIDRequest, RecordActivityTaskHeartbeatRequest as api_RecordActivityTaskHeartbeatRequest, ResetStickyTaskListRequest as api_ResetStickyTaskListRequest, RespondActivityTaskCanceledByIDRequest as api_RespondActivityTaskCanceledByIDRequest, RespondActivityTaskCanceledRequest as api_RespondActivityTaskCanceledRequest, RespondActivityTaskCompletedByIDRequest as api_RespondActivityTaskCompletedByIDRequest, RespondActivityTaskCompletedRequest as api_RespondActivityTaskCompletedRequest, RespondActivityTaskFailedByIDRequest as api_RespondActivityTaskFailedByIDRequest, RespondActivityTaskFailedRequest as api_RespondActivityTaskFailedRequest, RespondDecisionTaskCompletedRequest as api_RespondDecisionTaskCompletedRequest, RespondDecisionTaskFailedRequest as api_RespondDecisionTaskFailedRequest, RespondQueryTaskCompletedRequest as api_RespondQueryTaskCompletedRequest } from '../../../generated/proto/cadence-idl/uber/cadence/api/v1/service_worker.js';
import { DescribeTaskListRequest as api_DescribeTaskListRequest, DescribeWorkflowExecutionRequest as api_DescribeWorkflowExecutionRequest, DiagnoseWorkflowExecutionRequest as api_DiagnoseWorkflowExecutionRequest, GetWorkflowExecutionHistoryRequest as api_GetWorkflowExecutionHistoryRequest, ListTaskListPartitionsRequest as api_ListTaskListPartitionsRequest, QueryWorkflowRequest as api_QueryWorkflowRequest, RequestCancelWorkflowExecutionRequest as api_RequestCancelWorkflowExecutionRequest, ResetWorkflowExecutionRequest as api_ResetWorkflowExecutionRequest, SignalWithStartWorkflowExecutionRequest as api_SignalWithStartWorkflowExecutionRequest, SignalWorkflowExecutionRequest as api_SignalWorkflowExecutionRequest, StartWorkflowExecutionRequest as api_StartWorkflowExecutionRequest, TerminateWorkflowExecutionRequest as api_TerminateWorkflowExecutionRequest } from '../../../generated/proto/cadence-idl/uber/cadence/api/v1/service_workflow.js';
import { ICountWorkflowExecutionsRequest as shared_ICountWorkflowExecutionsRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/CountWorkflowExecutionsRequest.js';
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
import { ISignalWithStartWorkflowExecutionRequest as shared_ISignalWithStartWorkflowExecutionRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/SignalWithStartWorkflowExecutionRequest.js';
import { ISignalWorkflowExecutionRequest as shared_ISignalWorkflowExecutionRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/SignalWorkflowExecutionRequest.js';
import { IStartWorkflowExecutionRequest as shared_IStartWorkflowExecutionRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/StartWorkflowExecutionRequest.js';
import { ITerminateWorkflowExecutionRequest as shared_ITerminateWorkflowExecutionRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/TerminateWorkflowExecutionRequest.js';
import { IUpdateDomainRequest as shared_IUpdateDomainRequest } from '../../../generated/thrift/cadence-idl/com/uber/cadence/UpdateDomainRequest.js';

// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
export function CountWorkflowExecutionsRequest(t: api_CountWorkflowExecutionsRequest | undefined): shared_ICountWorkflowExecutionsRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function DeprecateDomainRequest(t: api_DeprecateDomainRequest | undefined): shared_IDeprecateDomainRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function DescribeDomainRequest(t: api_DescribeDomainRequest | undefined): shared_IDescribeDomainRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function DescribeTaskListRequest(t: api_DescribeTaskListRequest | undefined): shared_IDescribeTaskListRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function DescribeWorkflowExecutionRequest(t: api_DescribeWorkflowExecutionRequest | undefined): shared_IDescribeWorkflowExecutionRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function DiagnoseWorkflowExecutionRequest(t: api_DiagnoseWorkflowExecutionRequest | undefined): shared_IDiagnoseWorkflowExecutionRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function GetWorkflowExecutionHistoryRequest(t: api_GetWorkflowExecutionHistoryRequest | undefined): shared_IGetWorkflowExecutionHistoryRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ListArchivedWorkflowExecutionsRequest(t: api_ListArchivedWorkflowExecutionsRequest | undefined): shared_IListArchivedWorkflowExecutionsRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ListDomainsRequest(t: api_ListDomainsRequest | undefined): shared_IListDomainsRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ListTaskListPartitionsRequest(t: api_ListTaskListPartitionsRequest | undefined): shared_IListTaskListPartitionsRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ListWorkflowExecutionsRequest(t: api_ListWorkflowExecutionsRequest | undefined): shared_IListWorkflowExecutionsRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function PollForActivityTaskRequest(t: api_PollForActivityTaskRequest | undefined): shared_IPollForActivityTaskRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function PollForDecisionTaskRequest(t: api_PollForDecisionTaskRequest | undefined): shared_IPollForDecisionTaskRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function QueryWorkflowRequest(t: api_QueryWorkflowRequest | undefined): shared_IQueryWorkflowRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function RecordActivityTaskHeartbeatByIDRequest(t: api_RecordActivityTaskHeartbeatByIDRequest | undefined): shared_IRecordActivityTaskHeartbeatByIDRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function RecordActivityTaskHeartbeatRequest(t: api_RecordActivityTaskHeartbeatRequest | undefined): shared_IRecordActivityTaskHeartbeatRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function RegisterDomainRequest(t: api_RegisterDomainRequest | undefined): shared_IRegisterDomainRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function RequestCancelWorkflowExecutionRequest(t: api_RequestCancelWorkflowExecutionRequest | undefined): shared_IRequestCancelWorkflowExecutionRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ResetStickyTaskListRequest(t: api_ResetStickyTaskListRequest | undefined): shared_IResetStickyTaskListRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ResetWorkflowExecutionRequest(t: api_ResetWorkflowExecutionRequest | undefined): shared_IResetWorkflowExecutionRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function RespondActivityTaskCanceledByIDRequest(t: api_RespondActivityTaskCanceledByIDRequest | undefined): shared_IRespondActivityTaskCanceledByIDRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function RespondActivityTaskCanceledRequest(t: api_RespondActivityTaskCanceledRequest | undefined): shared_IRespondActivityTaskCanceledRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function RespondActivityTaskCompletedByIDRequest(t: api_RespondActivityTaskCompletedByIDRequest | undefined): shared_IRespondActivityTaskCompletedByIDRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function RespondActivityTaskCompletedRequest(t: api_RespondActivityTaskCompletedRequest | undefined): shared_IRespondActivityTaskCompletedRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function RespondActivityTaskFailedByIDRequest(t: api_RespondActivityTaskFailedByIDRequest | undefined): shared_IRespondActivityTaskFailedByIDRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function RespondActivityTaskFailedRequest(t: api_RespondActivityTaskFailedRequest | undefined): shared_IRespondActivityTaskFailedRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function RespondDecisionTaskCompletedRequest(t: api_RespondDecisionTaskCompletedRequest | undefined): shared_IRespondDecisionTaskCompletedRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function RespondDecisionTaskFailedRequest(t: api_RespondDecisionTaskFailedRequest | undefined): shared_IRespondDecisionTaskFailedRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function RespondQueryTaskCompletedRequest(t: api_RespondQueryTaskCompletedRequest | undefined): shared_IRespondQueryTaskCompletedRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ScanWorkflowExecutionsRequest(t: api_ScanWorkflowExecutionsRequest | undefined): shared_IListWorkflowExecutionsRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function SignalWithStartWorkflowExecutionRequest(t: api_SignalWithStartWorkflowExecutionRequest | undefined): shared_ISignalWithStartWorkflowExecutionRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function SignalWorkflowExecutionRequest(t: api_SignalWorkflowExecutionRequest | undefined): shared_ISignalWorkflowExecutionRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function StartWorkflowExecutionRequest(t: api_StartWorkflowExecutionRequest | undefined): shared_IStartWorkflowExecutionRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function TerminateWorkflowExecutionRequest(t: api_TerminateWorkflowExecutionRequest | undefined): shared_ITerminateWorkflowExecutionRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function UpdateDomainRequest(t: api_UpdateDomainRequest | undefined): shared_IUpdateDomainRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ListClosedWorkflowExecutionsRequest(r: api_ListClosedWorkflowExecutionsRequest | undefined): shared_IListClosedWorkflowExecutionsRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ListOpenWorkflowExecutionsRequest(r: api_ListOpenWorkflowExecutionsRequest | undefined): shared_IListOpenWorkflowExecutionsRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function FailoverDomainRequest(t: api_FailoverDomainRequest | undefined): shared_IFailoverDomainRequest | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ListFailoverHistoryRequest(t: api_ListFailoverHistoryRequest | undefined): shared_IListFailoverHistoryRequest | undefined {
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
