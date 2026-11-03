import { ActiveClusterSelectionPolicy as api_ActiveClusterSelectionPolicy, ActivityType as api_ActivityType, ClusterAttribute as api_ClusterAttribute, DataBlob as api_DataBlob, Failure as api_Failure, Header as api_Header, Memo as api_Memo, PaginationOptions as api_PaginationOptions, Payload as api_Payload, RetryPolicy as api_RetryPolicy, SearchAttributes as api_SearchAttributes, SupportedClientVersions as api_SupportedClientVersions, WorkerVersionInfo as api_WorkerVersionInfo, WorkflowExecution as api_WorkflowExecution, WorkflowType as api_WorkflowType } from '../../../generated/proto/cadence-idl/uber/cadence/api/v1/common.js';
import { ActiveClusterInfo as api_ActiveClusterInfo, ActiveClusters as api_ActiveClusters, BadBinaries as api_BadBinaries, BadBinaryInfo as api_BadBinaryInfo, ClusterAttributeScope as api_ClusterAttributeScope, ClusterReplicationConfiguration as api_ClusterReplicationConfiguration, Domain as api_Domain } from '../../../generated/proto/cadence-idl/uber/cadence/api/v1/domain.js';
import { QueryRejected as api_QueryRejected, WorkflowQuery as api_WorkflowQuery, WorkflowQueryResult as api_WorkflowQueryResult } from '../../../generated/proto/cadence-idl/uber/cadence/api/v1/query.js';
import { ClusterFailover as api_ClusterFailover, FailoverEvent as api_FailoverEvent, ListFailoverHistoryRequestFilters as api_ListFailoverHistoryRequestFilters } from '../../../generated/proto/cadence-idl/uber/cadence/api/v1/service_domain.js';
import { AutoConfigHint as api_AutoConfigHint } from '../../../generated/proto/cadence-idl/uber/cadence/api/v1/service_worker.js';
import { PollerInfo as api_PollerInfo, StickyExecutionAttributes as api_StickyExecutionAttributes, TaskIDBlock as api_TaskIDBlock, TaskList as api_TaskList, TaskListMetadata as api_TaskListMetadata, TaskListPartitionMetadata as api_TaskListPartitionMetadata, TaskListStatus as api_TaskListStatus } from '../../../generated/proto/cadence-idl/uber/cadence/api/v1/tasklist.js';
import { IndexedValueType as api_IndexedValueType, StartTimeFilter as api_StartTimeFilter, StatusFilter as api_StatusFilter, WorkflowExecutionFilter as api_WorkflowExecutionFilter, WorkflowTypeFilter as api_WorkflowTypeFilter } from '../../../generated/proto/cadence-idl/uber/cadence/api/v1/visibility.js';
import { ActivityLocalDispatchInfo as api_ActivityLocalDispatchInfo, ExternalExecutionInfo as api_ExternalExecutionInfo, ParentExecutionInfo as api_ParentExecutionInfo, PendingActivityInfo as api_PendingActivityInfo, PendingChildExecutionInfo as api_PendingChildExecutionInfo, PendingDecisionInfo as api_PendingDecisionInfo, ResetPointInfo as api_ResetPointInfo, ResetPoints as api_ResetPoints, WorkflowExecutionConfiguration as api_WorkflowExecutionConfiguration, WorkflowExecutionInfo as api_WorkflowExecutionInfo } from '../../../generated/proto/cadence-idl/uber/cadence/api/v1/workflow.js';
import { IActiveClusterInfo as shared_IActiveClusterInfo } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ActiveClusterInfo.js';
import { IActiveClusterSelectionPolicy as shared_IActiveClusterSelectionPolicy } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ActiveClusterSelectionPolicy.js';
import { IActiveClusters as shared_IActiveClusters } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ActiveClusters.js';
import { IActivityLocalDispatchInfo as shared_IActivityLocalDispatchInfo } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ActivityLocalDispatchInfo.js';
import { IActivityType as shared_IActivityType } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ActivityType.js';
import { IAutoConfigHint as shared_IAutoConfigHint } from '../../../generated/thrift/cadence-idl/com/uber/cadence/AutoConfigHint.js';
import { IBadBinaries as shared_IBadBinaries } from '../../../generated/thrift/cadence-idl/com/uber/cadence/BadBinaries.js';
import { IBadBinaryInfo as shared_IBadBinaryInfo } from '../../../generated/thrift/cadence-idl/com/uber/cadence/BadBinaryInfo.js';
import { IClusterAttribute as shared_IClusterAttribute } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ClusterAttribute.js';
import { IClusterAttributeScope as shared_IClusterAttributeScope } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ClusterAttributeScope.js';
import { IClusterFailover as shared_IClusterFailover } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ClusterFailover.js';
import { IClusterReplicationConfiguration as shared_IClusterReplicationConfiguration } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ClusterReplicationConfiguration.js';
import { IDataBlob as shared_IDataBlob } from '../../../generated/thrift/cadence-idl/com/uber/cadence/DataBlob.js';
import { IDescribeDomainResponse as shared_IDescribeDomainResponse } from '../../../generated/thrift/cadence-idl/com/uber/cadence/DescribeDomainResponse.js';
import { IFailoverEvent as shared_IFailoverEvent } from '../../../generated/thrift/cadence-idl/com/uber/cadence/FailoverEvent.js';
import { IHeader as shared_IHeader } from '../../../generated/thrift/cadence-idl/com/uber/cadence/Header.js';
import { IndexedValueType as shared_IndexedValueType } from '../../../generated/thrift/cadence-idl/com/uber/cadence/IndexedValueType.js';
import { IListFailoverHistoryRequestFilters as shared_IListFailoverHistoryRequestFilters } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ListFailoverHistoryRequestFilters.js';
import { IMemo as shared_IMemo } from '../../../generated/thrift/cadence-idl/com/uber/cadence/Memo.js';
import { IPaginationOptions as shared_IPaginationOptions } from '../../../generated/thrift/cadence-idl/com/uber/cadence/PaginationOptions.js';
import { IPendingActivityInfo as shared_IPendingActivityInfo } from '../../../generated/thrift/cadence-idl/com/uber/cadence/PendingActivityInfo.js';
import { IPendingChildExecutionInfo as shared_IPendingChildExecutionInfo } from '../../../generated/thrift/cadence-idl/com/uber/cadence/PendingChildExecutionInfo.js';
import { IPendingDecisionInfo as shared_IPendingDecisionInfo } from '../../../generated/thrift/cadence-idl/com/uber/cadence/PendingDecisionInfo.js';
import { IPollerInfo as shared_IPollerInfo } from '../../../generated/thrift/cadence-idl/com/uber/cadence/PollerInfo.js';
import { IQueryRejected as shared_IQueryRejected } from '../../../generated/thrift/cadence-idl/com/uber/cadence/QueryRejected.js';
import { IResetPointInfo as shared_IResetPointInfo } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ResetPointInfo.js';
import { IResetPoints as shared_IResetPoints } from '../../../generated/thrift/cadence-idl/com/uber/cadence/ResetPoints.js';
import { IRetryPolicy as shared_IRetryPolicy } from '../../../generated/thrift/cadence-idl/com/uber/cadence/RetryPolicy.js';
import { ISearchAttributes as shared_ISearchAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/SearchAttributes.js';
import { IStartTimeFilter as shared_IStartTimeFilter } from '../../../generated/thrift/cadence-idl/com/uber/cadence/StartTimeFilter.js';
import { IStickyExecutionAttributes as shared_IStickyExecutionAttributes } from '../../../generated/thrift/cadence-idl/com/uber/cadence/StickyExecutionAttributes.js';
import { ISupportedClientVersions as shared_ISupportedClientVersions } from '../../../generated/thrift/cadence-idl/com/uber/cadence/SupportedClientVersions.js';
import { ITaskIDBlock as shared_ITaskIDBlock } from '../../../generated/thrift/cadence-idl/com/uber/cadence/TaskIDBlock.js';
import { ITaskList as shared_ITaskList } from '../../../generated/thrift/cadence-idl/com/uber/cadence/TaskList.js';
import { ITaskListMetadata as shared_ITaskListMetadata } from '../../../generated/thrift/cadence-idl/com/uber/cadence/TaskListMetadata.js';
import { ITaskListPartitionMetadata as shared_ITaskListPartitionMetadata } from '../../../generated/thrift/cadence-idl/com/uber/cadence/TaskListPartitionMetadata.js';
import { ITaskListStatus as shared_ITaskListStatus } from '../../../generated/thrift/cadence-idl/com/uber/cadence/TaskListStatus.js';
import { IWorkerVersionInfo as shared_IWorkerVersionInfo } from '../../../generated/thrift/cadence-idl/com/uber/cadence/WorkerVersionInfo.js';
import { IWorkflowExecution as shared_IWorkflowExecution } from '../../../generated/thrift/cadence-idl/com/uber/cadence/WorkflowExecution.js';
import { WorkflowExecutionCloseStatus as shared_WorkflowExecutionCloseStatus } from '../../../generated/thrift/cadence-idl/com/uber/cadence/WorkflowExecutionCloseStatus.js';
import { IWorkflowExecutionConfiguration as shared_IWorkflowExecutionConfiguration } from '../../../generated/thrift/cadence-idl/com/uber/cadence/WorkflowExecutionConfiguration.js';
import { IWorkflowExecutionFilter as shared_IWorkflowExecutionFilter } from '../../../generated/thrift/cadence-idl/com/uber/cadence/WorkflowExecutionFilter.js';
import { IWorkflowExecutionInfo as shared_IWorkflowExecutionInfo } from '../../../generated/thrift/cadence-idl/com/uber/cadence/WorkflowExecutionInfo.js';
import { IWorkflowQuery as shared_IWorkflowQuery } from '../../../generated/thrift/cadence-idl/com/uber/cadence/WorkflowQuery.js';
import { IWorkflowQueryResult as shared_IWorkflowQueryResult } from '../../../generated/thrift/cadence-idl/com/uber/cadence/WorkflowQueryResult.js';
import { IWorkflowType as shared_IWorkflowType } from '../../../generated/thrift/cadence-idl/com/uber/cadence/WorkflowType.js';
import { IWorkflowTypeFilter as shared_IWorkflowTypeFilter } from '../../../generated/thrift/cadence-idl/com/uber/cadence/WorkflowTypeFilter.js';

// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
export function Payload(p: api_Payload | undefined): Buffer {
  throw new globalThis.Error("not implemented"); // @stub
}

export function Domain(domain: string): string | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function FailureReason(failure: api_Failure | undefined): string | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function FailureDetails(failure: api_Failure | undefined): Buffer {
  throw new globalThis.Error("not implemented"); // @stub
}

export function WorkflowExecution(t: api_WorkflowExecution | undefined): shared_IWorkflowExecution | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function WorkflowID(t: api_WorkflowExecution | undefined): string | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function RunID(t: api_WorkflowExecution | undefined): string | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ActivityType(t: api_ActivityType | undefined): shared_IActivityType | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function AutoConfigHint(t: api_AutoConfigHint | undefined): shared_IAutoConfigHint | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function WorkflowType(t: api_WorkflowType | undefined): shared_IWorkflowType | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function TaskList(t: api_TaskList | undefined): shared_ITaskList | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function TaskListMetadata(t: api_TaskListMetadata | undefined): shared_ITaskListMetadata | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function RetryPolicy(t: api_RetryPolicy | undefined): shared_IRetryPolicy | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function Header(t: api_Header | undefined): shared_IHeader | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function Memo(t: api_Memo | undefined): shared_IMemo | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function SearchAttributes(t: api_SearchAttributes | undefined): shared_ISearchAttributes | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function BadBinaries(t: api_BadBinaries | undefined): shared_IBadBinaries | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function BadBinaryInfo(t: api_BadBinaryInfo | undefined): shared_IBadBinaryInfo | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ClusterReplicationConfiguration(t: api_ClusterReplicationConfiguration | undefined): shared_IClusterReplicationConfiguration | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function WorkflowQuery(t: api_WorkflowQuery | undefined): shared_IWorkflowQuery | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function WorkflowQueryResult(t: api_WorkflowQueryResult | undefined): shared_IWorkflowQueryResult | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function StickyExecutionAttributes(t: api_StickyExecutionAttributes | undefined): shared_IStickyExecutionAttributes | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function WorkerVersionInfo(t: api_WorkerVersionInfo | undefined): shared_IWorkerVersionInfo | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function StartTimeFilter(t: api_StartTimeFilter | undefined): shared_IStartTimeFilter | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function WorkflowExecutionFilter(t: api_WorkflowExecutionFilter | undefined): shared_IWorkflowExecutionFilter | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function WorkflowTypeFilter(t: api_WorkflowTypeFilter | undefined): shared_IWorkflowTypeFilter | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function StatusFilter(t: api_StatusFilter | undefined): shared_WorkflowExecutionCloseStatus | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function PayloadMap(t: Record<string, api_Payload> | undefined): Record<string, Buffer> {
  throw new globalThis.Error("not implemented"); // @stub
}

export function BadBinaryInfoMap(t: Record<string, api_BadBinaryInfo> | undefined): Record<string, shared_IBadBinaryInfo> {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ClusterReplicationConfigurationArray(t: api_ClusterReplicationConfiguration[] | undefined): shared_IClusterReplicationConfiguration[] {
  throw new globalThis.Error("not implemented"); // @stub
}

export function WorkflowQueryResultMap(t: Record<string, api_WorkflowQueryResult> | undefined): Record<string, shared_IWorkflowQueryResult> {
  throw new globalThis.Error("not implemented"); // @stub
}

export function DataBlob(t: api_DataBlob | undefined): shared_IDataBlob | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ExternalInitiatedID(t: api_ExternalExecutionInfo | undefined): number | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ExternalWorkflowExecution(t: api_ExternalExecutionInfo | undefined): shared_IWorkflowExecution | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ResetPoints(t: api_ResetPoints | undefined): shared_IResetPoints | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ResetPointInfo(t: api_ResetPointInfo | undefined): shared_IResetPointInfo | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function PollerInfo(t: api_PollerInfo | undefined): shared_IPollerInfo | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function TaskListStatus(t: api_TaskListStatus | undefined): shared_ITaskListStatus | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function TaskIDBlock(t: api_TaskIDBlock | undefined): shared_ITaskIDBlock | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function WorkflowExecutionConfiguration(t: api_WorkflowExecutionConfiguration | undefined): shared_IWorkflowExecutionConfiguration | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function WorkflowExecutionInfo(t: api_WorkflowExecutionInfo | undefined): shared_IWorkflowExecutionInfo | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ParentDomainID(pei: api_ParentExecutionInfo | undefined): string | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ParentDomainName(pei: api_ParentExecutionInfo | undefined): string | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ParentInitiatedID(pei: api_ParentExecutionInfo | undefined): number | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ParentWorkflowExecution(pei: api_ParentExecutionInfo | undefined): shared_IWorkflowExecution | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function PendingActivityInfo(t: api_PendingActivityInfo | undefined): shared_IPendingActivityInfo | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function PendingChildExecutionInfo(t: api_PendingChildExecutionInfo | undefined): shared_IPendingChildExecutionInfo | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function PendingDecisionInfo(t: api_PendingDecisionInfo | undefined): shared_IPendingDecisionInfo | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ActivityLocalDispatchInfo(t: api_ActivityLocalDispatchInfo | undefined): shared_IActivityLocalDispatchInfo | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function SupportedClientVersions(t: api_SupportedClientVersions | undefined): shared_ISupportedClientVersions | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function DescribeDomainResponseDomain(t: api_Domain | undefined): shared_IDescribeDomainResponse | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function TaskListPartitionMetadata(t: api_TaskListPartitionMetadata | undefined): shared_ITaskListPartitionMetadata | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function QueryRejected(t: api_QueryRejected | undefined): shared_IQueryRejected | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function PollerInfoArray(t: api_PollerInfo[] | undefined): shared_IPollerInfo[] {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ResetPointInfoArray(t: api_ResetPointInfo[] | undefined): shared_IResetPointInfo[] {
  throw new globalThis.Error("not implemented"); // @stub
}

export function PendingActivityInfoArray(t: api_PendingActivityInfo[] | undefined): shared_IPendingActivityInfo[] {
  throw new globalThis.Error("not implemented"); // @stub
}

export function PendingChildExecutionInfoArray(t: api_PendingChildExecutionInfo[] | undefined): shared_IPendingChildExecutionInfo[] {
  throw new globalThis.Error("not implemented"); // @stub
}

export function IndexedValueTypeMap(t: Record<string, api_IndexedValueType> | undefined): Record<string, shared_IndexedValueType> {
  throw new globalThis.Error("not implemented"); // @stub
}

export function DataBlobArray(t: api_DataBlob[] | undefined): shared_IDataBlob[] {
  throw new globalThis.Error("not implemented"); // @stub
}

export function WorkflowExecutionInfoArray(t: api_WorkflowExecutionInfo[] | undefined): shared_IWorkflowExecutionInfo[] {
  throw new globalThis.Error("not implemented"); // @stub
}

export function DescribeDomainResponseArray(t: api_Domain[] | undefined): shared_IDescribeDomainResponse[] {
  throw new globalThis.Error("not implemented"); // @stub
}

export function TaskListPartitionMetadataArray(t: api_TaskListPartitionMetadata[] | undefined): shared_ITaskListPartitionMetadata[] {
  throw new globalThis.Error("not implemented"); // @stub
}

export function WorkflowQueryMap(t: Record<string, api_WorkflowQuery> | undefined): Record<string, shared_IWorkflowQuery> {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ActivityLocalDispatchInfoMap(t: Record<string, api_ActivityLocalDispatchInfo> | undefined): Record<string, shared_IActivityLocalDispatchInfo> {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ActiveClusterSelectionPolicy(t: api_ActiveClusterSelectionPolicy | undefined): shared_IActiveClusterSelectionPolicy | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ClusterAttribute(t: api_ClusterAttribute | undefined): shared_IClusterAttribute | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ActiveClusters(t: api_ActiveClusters | undefined): shared_IActiveClusters | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ClusterAttributeScope(t: api_ClusterAttributeScope | undefined): shared_IClusterAttributeScope | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ActiveClusterInfo(t: api_ActiveClusterInfo | undefined): shared_IActiveClusterInfo | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ClusterFailoverArray(t: api_ClusterFailover[] | undefined): shared_IClusterFailover[] {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ClusterFailover(t: api_ClusterFailover | undefined): shared_IClusterFailover | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function FailoverEventArray(t: api_FailoverEvent[] | undefined): shared_IFailoverEvent[] {
  throw new globalThis.Error("not implemented"); // @stub
}

export function FailoverEvent(t: api_FailoverEvent | undefined): shared_IFailoverEvent | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function PaginationOptions(t: api_PaginationOptions | undefined): shared_IPaginationOptions | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function ListFailoverHistoryRequestFilters(t: api_ListFailoverHistoryRequestFilters | undefined): shared_IListFailoverHistoryRequestFilters | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}
