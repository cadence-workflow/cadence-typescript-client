import { DescribeDomainResponse as api_DescribeDomainResponse, FailoverDomainResponse as api_FailoverDomainResponse, ListDomainsResponse as api_ListDomainsResponse, ListFailoverHistoryResponse as api_ListFailoverHistoryResponse, UpdateDomainResponse as api_UpdateDomainResponse } from '../../../generated/proto/cadence-idl/uber/cadence/api/v1/service_domain.js';
import { CountWorkflowExecutionsResponse as api_CountWorkflowExecutionsResponse, GetSearchAttributesResponse as api_GetSearchAttributesResponse, ListArchivedWorkflowExecutionsResponse as api_ListArchivedWorkflowExecutionsResponse, ListClosedWorkflowExecutionsResponse as api_ListClosedWorkflowExecutionsResponse, ListOpenWorkflowExecutionsResponse as api_ListOpenWorkflowExecutionsResponse, ListWorkflowExecutionsResponse as api_ListWorkflowExecutionsResponse, ScanWorkflowExecutionsResponse as api_ScanWorkflowExecutionsResponse } from '../../../generated/proto/cadence-idl/uber/cadence/api/v1/service_visibility.js';
import { PollForActivityTaskResponse as api_PollForActivityTaskResponse, PollForDecisionTaskResponse as api_PollForDecisionTaskResponse, RecordActivityTaskHeartbeatByIDResponse as api_RecordActivityTaskHeartbeatByIDResponse, RecordActivityTaskHeartbeatResponse as api_RecordActivityTaskHeartbeatResponse, RespondDecisionTaskCompletedResponse as api_RespondDecisionTaskCompletedResponse } from '../../../generated/proto/cadence-idl/uber/cadence/api/v1/service_worker.js';
import { DescribeTaskListResponse as api_DescribeTaskListResponse, DescribeWorkflowExecutionResponse as api_DescribeWorkflowExecutionResponse, DiagnoseWorkflowExecutionResponse as api_DiagnoseWorkflowExecutionResponse, GetClusterInfoResponse as api_GetClusterInfoResponse, GetWorkflowExecutionHistoryResponse as api_GetWorkflowExecutionHistoryResponse, ListTaskListPartitionsResponse as api_ListTaskListPartitionsResponse, QueryWorkflowResponse as api_QueryWorkflowResponse, ResetWorkflowExecutionResponse as api_ResetWorkflowExecutionResponse, RestartWorkflowExecutionResponse as api_RestartWorkflowExecutionResponse, SignalWithStartWorkflowExecutionAsyncResponse as api_SignalWithStartWorkflowExecutionAsyncResponse, SignalWithStartWorkflowExecutionResponse as api_SignalWithStartWorkflowExecutionResponse, StartWorkflowExecutionAsyncResponse as api_StartWorkflowExecutionAsyncResponse, StartWorkflowExecutionResponse as api_StartWorkflowExecutionResponse } from '../../../generated/proto/cadence-idl/uber/cadence/api/v1/service_workflow.js';
import { IClusterInfo as shared_IClusterInfo } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ClusterInfo.js';
import { ICountWorkflowExecutionsResponse as shared_ICountWorkflowExecutionsResponse } from '../../../generated/thrift/cadence-idl/com/uber/cadence/CountWorkflowExecutionsResponse.js';
import { IDescribeDomainResponse as shared_IDescribeDomainResponse } from '../../../generated/thrift/cadence-idl/com/uber/cadence/DescribeDomainResponse.js';
import { IDescribeTaskListResponse as shared_IDescribeTaskListResponse } from '../../../generated/thrift/cadence-idl/com/uber/cadence/DescribeTaskListResponse.js';
import { IDescribeWorkflowExecutionResponse as shared_IDescribeWorkflowExecutionResponse } from '../../../generated/thrift/cadence-idl/com/uber/cadence/DescribeWorkflowExecutionResponse.js';
import { IDiagnoseWorkflowExecutionResponse as shared_IDiagnoseWorkflowExecutionResponse } from '../../../generated/thrift/cadence-idl/com/uber/cadence/DiagnoseWorkflowExecutionResponse.js';
import { IFailoverDomainResponse as shared_IFailoverDomainResponse } from '../../../generated/thrift/cadence-idl/com/uber/cadence/FailoverDomainResponse.js';
import { IGetSearchAttributesResponse as shared_IGetSearchAttributesResponse } from '../../../generated/thrift/cadence-idl/com/uber/cadence/GetSearchAttributesResponse.js';
import { IGetWorkflowExecutionHistoryResponse as shared_IGetWorkflowExecutionHistoryResponse } from '../../../generated/thrift/cadence-idl/com/uber/cadence/GetWorkflowExecutionHistoryResponse.js';
import { IListArchivedWorkflowExecutionsResponse as shared_IListArchivedWorkflowExecutionsResponse } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ListArchivedWorkflowExecutionsResponse.js';
import { IListClosedWorkflowExecutionsResponse as shared_IListClosedWorkflowExecutionsResponse } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ListClosedWorkflowExecutionsResponse.js';
import { IListDomainsResponse as shared_IListDomainsResponse } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ListDomainsResponse.js';
import { IListFailoverHistoryResponse as shared_IListFailoverHistoryResponse } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ListFailoverHistoryResponse.js';
import { IListOpenWorkflowExecutionsResponse as shared_IListOpenWorkflowExecutionsResponse } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ListOpenWorkflowExecutionsResponse.js';
import { IListTaskListPartitionsResponse as shared_IListTaskListPartitionsResponse } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ListTaskListPartitionsResponse.js';
import { IListWorkflowExecutionsResponse as shared_IListWorkflowExecutionsResponse } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ListWorkflowExecutionsResponse.js';
import { IPollForActivityTaskResponse as shared_IPollForActivityTaskResponse } from '../../../generated/thrift/cadence-idl/com/uber/cadence/PollForActivityTaskResponse.js';
import { IPollForDecisionTaskResponse as shared_IPollForDecisionTaskResponse } from '../../../generated/thrift/cadence-idl/com/uber/cadence/PollForDecisionTaskResponse.js';
import { IQueryWorkflowResponse as shared_IQueryWorkflowResponse } from '../../../generated/thrift/cadence-idl/com/uber/cadence/QueryWorkflowResponse.js';
import { IRecordActivityTaskHeartbeatResponse as shared_IRecordActivityTaskHeartbeatResponse } from '../../../generated/thrift/cadence-idl/com/uber/cadence/RecordActivityTaskHeartbeatResponse.js';
import { IResetWorkflowExecutionResponse as shared_IResetWorkflowExecutionResponse } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ResetWorkflowExecutionResponse.js';
import { IRespondDecisionTaskCompletedResponse as shared_IRespondDecisionTaskCompletedResponse } from '../../../generated/thrift/cadence-idl/com/uber/cadence/RespondDecisionTaskCompletedResponse.js';
import { IRestartWorkflowExecutionResponse as shared_IRestartWorkflowExecutionResponse } from '../../../generated/thrift/cadence-idl/com/uber/cadence/RestartWorkflowExecutionResponse.js';
import { ISignalWithStartWorkflowExecutionAsyncResponse as shared_ISignalWithStartWorkflowExecutionAsyncResponse } from '../../../generated/thrift/cadence-idl/com/uber/cadence/SignalWithStartWorkflowExecutionAsyncResponse.js';
import { IStartWorkflowExecutionAsyncResponse as shared_IStartWorkflowExecutionAsyncResponse } from '../../../generated/thrift/cadence-idl/com/uber/cadence/StartWorkflowExecutionAsyncResponse.js';
import { IStartWorkflowExecutionResponse as shared_IStartWorkflowExecutionResponse } from '../../../generated/thrift/cadence-idl/com/uber/cadence/StartWorkflowExecutionResponse.js';
import { IUpdateDomainResponse as shared_IUpdateDomainResponse } from '../../../generated/thrift/cadence-idl/com/uber/cadence/UpdateDomainResponse.js';

// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
export function CountWorkflowExecutionsResponse(t: api_CountWorkflowExecutionsResponse | undefined): shared_ICountWorkflowExecutionsResponse | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function DescribeDomainResponse(t: api_DescribeDomainResponse | undefined): shared_IDescribeDomainResponse | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function DescribeTaskListResponse(t: api_DescribeTaskListResponse | undefined): shared_IDescribeTaskListResponse | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function DescribeWorkflowExecutionResponse(t: api_DescribeWorkflowExecutionResponse | undefined): shared_IDescribeWorkflowExecutionResponse | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function DiagnoseWorkflowExecutionResponse(t: api_DiagnoseWorkflowExecutionResponse | undefined): shared_IDiagnoseWorkflowExecutionResponse | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function GetClusterInfoResponse(t: api_GetClusterInfoResponse | undefined): shared_IClusterInfo | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function GetSearchAttributesResponse(t: api_GetSearchAttributesResponse | undefined): shared_IGetSearchAttributesResponse | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function GetWorkflowExecutionHistoryResponse(t: api_GetWorkflowExecutionHistoryResponse | undefined): shared_IGetWorkflowExecutionHistoryResponse | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ListArchivedWorkflowExecutionsResponse(t: api_ListArchivedWorkflowExecutionsResponse | undefined): shared_IListArchivedWorkflowExecutionsResponse | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ListClosedWorkflowExecutionsResponse(t: api_ListClosedWorkflowExecutionsResponse | undefined): shared_IListClosedWorkflowExecutionsResponse | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ListDomainsResponse(t: api_ListDomainsResponse | undefined): shared_IListDomainsResponse | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ListOpenWorkflowExecutionsResponse(t: api_ListOpenWorkflowExecutionsResponse | undefined): shared_IListOpenWorkflowExecutionsResponse | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ListTaskListPartitionsResponse(t: api_ListTaskListPartitionsResponse | undefined): shared_IListTaskListPartitionsResponse | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ListWorkflowExecutionsResponse(t: api_ListWorkflowExecutionsResponse | undefined): shared_IListWorkflowExecutionsResponse | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function PollForActivityTaskResponse(t: api_PollForActivityTaskResponse | undefined): shared_IPollForActivityTaskResponse | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function PollForDecisionTaskResponse(t: api_PollForDecisionTaskResponse | undefined): shared_IPollForDecisionTaskResponse | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function QueryWorkflowResponse(t: api_QueryWorkflowResponse | undefined): shared_IQueryWorkflowResponse | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function RecordActivityTaskHeartbeatByIDResponse(t: api_RecordActivityTaskHeartbeatByIDResponse | undefined): shared_IRecordActivityTaskHeartbeatResponse | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function RecordActivityTaskHeartbeatResponse(t: api_RecordActivityTaskHeartbeatResponse | undefined): shared_IRecordActivityTaskHeartbeatResponse | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ResetWorkflowExecutionResponse(t: api_ResetWorkflowExecutionResponse | undefined): shared_IResetWorkflowExecutionResponse | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function RespondDecisionTaskCompletedResponse(t: api_RespondDecisionTaskCompletedResponse | undefined): shared_IRespondDecisionTaskCompletedResponse | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ScanWorkflowExecutionsResponse(t: api_ScanWorkflowExecutionsResponse | undefined): shared_IListWorkflowExecutionsResponse | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function SignalWithStartWorkflowExecutionResponse(t: api_SignalWithStartWorkflowExecutionResponse | undefined): shared_IStartWorkflowExecutionResponse | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function SignalWithStartWorkflowExecutionAsyncResponse(t: api_SignalWithStartWorkflowExecutionAsyncResponse | undefined): shared_ISignalWithStartWorkflowExecutionAsyncResponse | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function StartWorkflowExecutionResponse(t: api_StartWorkflowExecutionResponse | undefined): shared_IStartWorkflowExecutionResponse | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function StartWorkflowExecutionAsyncResponse(t: api_StartWorkflowExecutionAsyncResponse | undefined): shared_IStartWorkflowExecutionAsyncResponse | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function UpdateDomainResponse(t: api_UpdateDomainResponse | undefined): shared_IUpdateDomainResponse | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function RestartWorkflowExecutionResponse(t: api_RestartWorkflowExecutionResponse | undefined): shared_IRestartWorkflowExecutionResponse | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function FailoverDomainResponse(t: api_FailoverDomainResponse | undefined): shared_IFailoverDomainResponse | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ListFailoverHistoryResponse(t: api_ListFailoverHistoryResponse | undefined): shared_IListFailoverHistoryResponse | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}
