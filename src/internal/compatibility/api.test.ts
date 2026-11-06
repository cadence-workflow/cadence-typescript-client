// Suite module for api_test.ts. Registration is kept out of the declaration module so that a sibling
// test module importing it for a helper does not also register this suite.
import { describe, it } from 'vitest';
import {
  TestActivityLocalDispatchInfo,
  TestActivityTaskCancelRequestedEventAttributes,
  TestActivityTaskCanceledEventAttributes,
  TestActivityTaskCompletedEventAttributes,
  TestActivityTaskFailedEventAttributes,
  TestActivityTaskScheduledEventAttributes,
  TestActivityTaskStartedEventAttributes,
  TestActivityTaskTimedOutEventAttributes,
  TestActivityType,
  TestBadBinaries,
  TestBadBinaryInfo,
  TestCancelTimerFailedEventAttributes,
  TestChildWorkflowExecutionCanceledEventAttributes,
  TestChildWorkflowExecutionCompletedEventAttributes,
  TestChildWorkflowExecutionFailedEventAttributes,
  TestChildWorkflowExecutionStartedEventAttributes,
  TestChildWorkflowExecutionTerminatedEventAttributes,
  TestChildWorkflowExecutionTimedOutEventAttributes,
  TestClusterReplicationConfiguration,
  TestCountWorkflowExecutionsRequest,
  TestCountWorkflowExecutionsResponse,
  TestDataBlob,
  TestDecisionTaskCompletedEventAttributes,
  TestDecisionTaskFailedEventAttributes,
  TestDecisionTaskScheduledEventAttributes,
  TestDecisionTaskStartedEventAttributes,
  TestDecisionTaskTimedOutEventAttributes,
  TestDeprecateDomainRequest,
  TestFailoverDomainRequest,
  TestFailoverDomainResponse,
  TestDescribeDomainRequest,
  TestDescribeDomainResponse_Domain,
  TestDescribeDomainResponse,
  TestDescribeTaskListRequest,
  TestDescribeTaskListResponse,
  TestDescribeWorkflowExecutionRequest,
  TestDescribeWorkflowExecutionResponse,
  TestDiagnoseWorkflowExecutionRequest,
  TestDiagnoseWorkflowExecutionResponse,
  TestExternalWorkflowExecutionCancelRequestedEventAttributes,
  TestExternalWorkflowExecutionSignaledEventAttributes,
  TestGetClusterInfoResponse,
  TestGetSearchAttributesResponse,
  TestGetWorkflowExecutionHistoryRequest,
  TestGetWorkflowExecutionHistoryResponse,
  TestHeader,
  TestHistory,
  TestListArchivedWorkflowExecutionsRequest,
  TestListArchivedWorkflowExecutionsResponse,
  TestListClosedWorkflowExecutionsResponse,
  TestListDomainsRequest,
  TestListDomainsResponse,
  TestListOpenWorkflowExecutionsResponse,
  TestListTaskListPartitionsRequest,
  TestListTaskListPartitionsResponse,
  TestListWorkflowExecutionsRequest,
  TestListWorkflowExecutionsResponse,
  TestMarkerRecordedEventAttributes,
  TestMemo,
  TestPendingActivityInfo,
  TestPendingChildExecutionInfo,
  TestPendingDecisionInfo,
  TestPollForActivityTaskRequest,
  TestPollForActivityTaskResponse,
  TestPollForDecisionTaskRequest,
  TestPollForDecisionTaskResponse,
  TestPollerInfo,
  TestQueryRejected,
  TestQueryWorkflowRequest,
  TestQueryWorkflowResponse,
  TestRecordActivityTaskHeartbeatByIDRequest,
  TestRecordActivityTaskHeartbeatByIDResponse,
  TestRecordActivityTaskHeartbeatRequest,
  TestRecordActivityTaskHeartbeatResponse,
  TestRegisterDomainRequest,
  TestRequestCancelActivityTaskFailedEventAttributes,
  TestRequestCancelExternalWorkflowExecutionFailedEventAttributes,
  TestRequestCancelExternalWorkflowExecutionInitiatedEventAttributes,
  TestRequestCancelWorkflowExecutionRequest,
  TestResetPointInfo,
  TestResetPoints,
  TestResetStickyTaskListRequest,
  TestResetWorkflowExecutionRequest,
  TestResetWorkflowExecutionResponse,
  TestRespondActivityTaskCanceledByIDRequest,
  TestRespondActivityTaskCanceledRequest,
  TestRespondActivityTaskCompletedByIDRequest,
  TestRespondActivityTaskCompletedRequest,
  TestRespondActivityTaskFailedByIDRequest,
  TestRespondActivityTaskFailedRequest,
  TestRespondDecisionTaskCompletedRequest,
  TestRespondDecisionTaskCompletedResponse,
  TestRespondDecisionTaskFailedRequest,
  TestRespondQueryTaskCompletedRequest,
  TestRetryPolicy,
  TestScanWorkflowExecutionsRequest,
  TestScanWorkflowExecutionsResponse,
  TestSearchAttributes,
  TestSignalExternalWorkflowExecutionFailedEventAttributes,
  TestSignalExternalWorkflowExecutionInitiatedEventAttributes,
  TestSignalWithStartWorkflowExecutionRequest,
  TestSignalWithStartWorkflowExecutionResponse,
  TestSignalWorkflowExecutionRequest,
  TestStartChildWorkflowExecutionFailedEventAttributes,
  TestStartChildWorkflowExecutionInitiatedEventAttributes,
  TestStartTimeFilter,
  TestStartWorkflowExecutionRequest,
  TestStartWorkflowExecutionResponse,
  TestStatusFilter,
  TestStickyExecutionAttributes,
  TestSupportedClientVersions,
  TestTaskIDBlock,
  TestTaskList,
  TestTaskListMetadata,
  TestTaskListPartitionMetadata,
  TestTaskListStatus,
  TestTerminateWorkflowExecutionRequest,
  TestTimerCanceledEventAttributes,
  TestTimerFiredEventAttributes,
  TestTimerStartedEventAttributes,
  TestListFailoverHistoryRequest,
  TestListFailoverHistoryResponse,
  TestUpdateDomainRequest,
  TestUpdateDomainResponse,
  TestUpsertWorkflowSearchAttributesEventAttributes,
  TestWorkerVersionInfo,
  TestWorkflowExecution,
  TestExternalExecutionInfo,
  TestWorkflowExecutionCancelRequestedEventAttributes,
  TestWorkflowExecutionCanceledEventAttributes,
  TestWorkflowExecutionCompletedEventAttributes,
  TestWorkflowExecutionConfiguration,
  TestWorkflowExecutionContinuedAsNewEventAttributes,
  TestWorkflowExecutionFailedEventAttributes,
  TestWorkflowExecutionFilter,
  TestParentExecutionInfo,
  TestWorkflowExecutionInfo,
  TestWorkflowExecutionSignaledEventAttributes,
  TestWorkflowExecutionStartedEventAttributes,
  TestWorkflowExecutionTerminatedEventAttributes,
  TestWorkflowExecutionTimedOutEventAttributes,
  TestWorkflowQuery,
  TestWorkflowQueryResult,
  TestWorkflowType,
  TestWorkflowTypeFilter,
  TestDataBlobArray,
  TestHistoryEventArray,
  TestTaskListPartitionMetadataArray,
  TestDecisionArray,
  TestPollerInfoArray,
  TestPendingChildExecutionInfoArray,
  TestWorkflowExecutionInfoArray,
  TestDescribeDomainResponseArray,
  TestResetPointInfoArray,
  TestPendingActivityInfoArray,
  TestClusterReplicationConfigurationArray,
  TestActivityLocalDispatchInfoMap,
  TestBadBinaryInfoMap,
  TestIndexedValueTypeMap,
  TestWorkflowQueryMap,
  TestWorkflowQueryResultMap,
  TestPayload,
  TestPayloadMap,
  TestFailure,
  TestHistoryEvent,
  TestDecision,
  TestListClosedWorkflowExecutionsRequest,
  TestListOpenWorkflowExecutionsRequest,
} from './api_test.js';

describe("api", () => {
  it.skip("TestActivityLocalDispatchInfo", TestActivityLocalDispatchInfo);
  it("TestActivityTaskCancelRequestedEventAttributes", TestActivityTaskCancelRequestedEventAttributes);
  it("TestActivityTaskCanceledEventAttributes", TestActivityTaskCanceledEventAttributes);
  it("TestActivityTaskCompletedEventAttributes", TestActivityTaskCompletedEventAttributes);
  it("TestActivityTaskFailedEventAttributes", TestActivityTaskFailedEventAttributes);
  it.skip("TestActivityTaskScheduledEventAttributes", TestActivityTaskScheduledEventAttributes);
  it("TestActivityTaskStartedEventAttributes", TestActivityTaskStartedEventAttributes);
  it("TestActivityTaskTimedOutEventAttributes", TestActivityTaskTimedOutEventAttributes);
  it("TestActivityType", TestActivityType);
  it("TestBadBinaries", TestBadBinaries);
  it.skip("TestBadBinaryInfo", TestBadBinaryInfo);
  it.skip("TestCancelTimerFailedEventAttributes", TestCancelTimerFailedEventAttributes);
  it("TestChildWorkflowExecutionCanceledEventAttributes", TestChildWorkflowExecutionCanceledEventAttributes);
  it("TestChildWorkflowExecutionCompletedEventAttributes", TestChildWorkflowExecutionCompletedEventAttributes);
  it.skip("TestChildWorkflowExecutionFailedEventAttributes", TestChildWorkflowExecutionFailedEventAttributes);
  it("TestChildWorkflowExecutionStartedEventAttributes", TestChildWorkflowExecutionStartedEventAttributes);
  it("TestChildWorkflowExecutionTerminatedEventAttributes", TestChildWorkflowExecutionTerminatedEventAttributes);
  it("TestChildWorkflowExecutionTimedOutEventAttributes", TestChildWorkflowExecutionTimedOutEventAttributes);
  it("TestClusterReplicationConfiguration", TestClusterReplicationConfiguration);
  it.skip("TestCountWorkflowExecutionsRequest", TestCountWorkflowExecutionsRequest);
  it("TestCountWorkflowExecutionsResponse", TestCountWorkflowExecutionsResponse);
  it("TestDataBlob", TestDataBlob);
  it.skip("TestDecisionTaskCompletedEventAttributes", TestDecisionTaskCompletedEventAttributes);
  it.skip("TestDecisionTaskFailedEventAttributes", TestDecisionTaskFailedEventAttributes);
  it("TestDecisionTaskScheduledEventAttributes", TestDecisionTaskScheduledEventAttributes);
  it.skip("TestDecisionTaskStartedEventAttributes", TestDecisionTaskStartedEventAttributes);
  it("TestDecisionTaskTimedOutEventAttributes", TestDecisionTaskTimedOutEventAttributes);
  it("TestDeprecateDomainRequest", TestDeprecateDomainRequest);
  it("TestFailoverDomainRequest", TestFailoverDomainRequest);
  it("TestFailoverDomainResponse", TestFailoverDomainResponse);
  it("TestDescribeDomainRequest", TestDescribeDomainRequest);
  it("TestDescribeDomainResponse_Domain", TestDescribeDomainResponse_Domain);
  it("TestDescribeDomainResponse", TestDescribeDomainResponse);
  it("TestDescribeTaskListRequest", TestDescribeTaskListRequest);
  it.skip("TestDescribeTaskListResponse", TestDescribeTaskListResponse);
  it("TestDescribeWorkflowExecutionRequest", TestDescribeWorkflowExecutionRequest);
  it("TestDescribeWorkflowExecutionResponse", TestDescribeWorkflowExecutionResponse);
  it("TestDiagnoseWorkflowExecutionRequest", TestDiagnoseWorkflowExecutionRequest);
  it.skip("TestDiagnoseWorkflowExecutionResponse", TestDiagnoseWorkflowExecutionResponse);
  it("TestExternalWorkflowExecutionCancelRequestedEventAttributes", TestExternalWorkflowExecutionCancelRequestedEventAttributes);
  it("TestExternalWorkflowExecutionSignaledEventAttributes", TestExternalWorkflowExecutionSignaledEventAttributes);
  it.skip("TestGetClusterInfoResponse", TestGetClusterInfoResponse);
  it.skip("TestGetSearchAttributesResponse", TestGetSearchAttributesResponse);
  it.skip("TestGetWorkflowExecutionHistoryRequest", TestGetWorkflowExecutionHistoryRequest);
  it("TestGetWorkflowExecutionHistoryResponse", TestGetWorkflowExecutionHistoryResponse);
  it.skip("TestHeader", TestHeader);
  it("TestHistory", TestHistory);
  it.skip("TestListArchivedWorkflowExecutionsRequest", TestListArchivedWorkflowExecutionsRequest);
  it("TestListArchivedWorkflowExecutionsResponse", TestListArchivedWorkflowExecutionsResponse);
  it.skip("TestListClosedWorkflowExecutionsResponse", TestListClosedWorkflowExecutionsResponse);
  it.skip("TestListDomainsRequest", TestListDomainsRequest);
  it("TestListDomainsResponse", TestListDomainsResponse);
  it("TestListOpenWorkflowExecutionsResponse", TestListOpenWorkflowExecutionsResponse);
  it.skip("TestListTaskListPartitionsRequest", TestListTaskListPartitionsRequest);
  it("TestListTaskListPartitionsResponse", TestListTaskListPartitionsResponse);
  it("TestListWorkflowExecutionsRequest", TestListWorkflowExecutionsRequest);
  it.skip("TestListWorkflowExecutionsResponse", TestListWorkflowExecutionsResponse);
  it.skip("TestMarkerRecordedEventAttributes", TestMarkerRecordedEventAttributes);
  it("TestMemo", TestMemo);
  it.skip("TestPendingActivityInfo", TestPendingActivityInfo);
  it("TestPendingChildExecutionInfo", TestPendingChildExecutionInfo);
  it("TestPendingDecisionInfo", TestPendingDecisionInfo);
  it.skip("TestPollForActivityTaskRequest", TestPollForActivityTaskRequest);
  it("TestPollForActivityTaskResponse", TestPollForActivityTaskResponse);
  it.skip("TestPollForDecisionTaskRequest", TestPollForDecisionTaskRequest);
  it("TestPollForDecisionTaskResponse", TestPollForDecisionTaskResponse);
  it.skip("TestPollerInfo", TestPollerInfo);
  it("TestQueryRejected", TestQueryRejected);
  it("TestQueryWorkflowRequest", TestQueryWorkflowRequest);
  it.skip("TestQueryWorkflowResponse", TestQueryWorkflowResponse);
  it.skip("TestRecordActivityTaskHeartbeatByIDRequest", TestRecordActivityTaskHeartbeatByIDRequest);
  it("TestRecordActivityTaskHeartbeatByIDResponse", TestRecordActivityTaskHeartbeatByIDResponse);
  it("TestRecordActivityTaskHeartbeatRequest", TestRecordActivityTaskHeartbeatRequest);
  it("TestRecordActivityTaskHeartbeatResponse", TestRecordActivityTaskHeartbeatResponse);
  it.skip("TestRegisterDomainRequest", TestRegisterDomainRequest);
  it("TestRequestCancelActivityTaskFailedEventAttributes", TestRequestCancelActivityTaskFailedEventAttributes);
  it.skip("TestRequestCancelExternalWorkflowExecutionFailedEventAttributes", TestRequestCancelExternalWorkflowExecutionFailedEventAttributes);
  it("TestRequestCancelExternalWorkflowExecutionInitiatedEventAttributes", TestRequestCancelExternalWorkflowExecutionInitiatedEventAttributes);
  it("TestRequestCancelWorkflowExecutionRequest", TestRequestCancelWorkflowExecutionRequest);
  it.skip("TestResetPointInfo", TestResetPointInfo);
  it("TestResetPoints", TestResetPoints);
  it.skip("TestResetStickyTaskListRequest", TestResetStickyTaskListRequest);
  it("TestResetWorkflowExecutionRequest", TestResetWorkflowExecutionRequest);
  it.skip("TestResetWorkflowExecutionResponse", TestResetWorkflowExecutionResponse);
  it.skip("TestRespondActivityTaskCanceledByIDRequest", TestRespondActivityTaskCanceledByIDRequest);
  it("TestRespondActivityTaskCanceledRequest", TestRespondActivityTaskCanceledRequest);
  it("TestRespondActivityTaskCompletedByIDRequest", TestRespondActivityTaskCompletedByIDRequest);
  it.skip("TestRespondActivityTaskCompletedRequest", TestRespondActivityTaskCompletedRequest);
  it("TestRespondActivityTaskFailedByIDRequest", TestRespondActivityTaskFailedByIDRequest);
  it.skip("TestRespondActivityTaskFailedRequest", TestRespondActivityTaskFailedRequest);
  it("TestRespondDecisionTaskCompletedRequest", TestRespondDecisionTaskCompletedRequest);
  it.skip("TestRespondDecisionTaskCompletedResponse", TestRespondDecisionTaskCompletedResponse);
  it.skip("TestRespondDecisionTaskFailedRequest", TestRespondDecisionTaskFailedRequest);
  it.skip("TestRespondQueryTaskCompletedRequest", TestRespondQueryTaskCompletedRequest);
  it("TestRetryPolicy", TestRetryPolicy);
  it("TestScanWorkflowExecutionsRequest", TestScanWorkflowExecutionsRequest);
  it("TestScanWorkflowExecutionsResponse", TestScanWorkflowExecutionsResponse);
  it("TestSearchAttributes", TestSearchAttributes);
  it.skip("TestSignalExternalWorkflowExecutionFailedEventAttributes", TestSignalExternalWorkflowExecutionFailedEventAttributes);
  it("TestSignalExternalWorkflowExecutionInitiatedEventAttributes", TestSignalExternalWorkflowExecutionInitiatedEventAttributes);
  it.skip("TestSignalWithStartWorkflowExecutionRequest", TestSignalWithStartWorkflowExecutionRequest);
  it("TestSignalWithStartWorkflowExecutionResponse", TestSignalWithStartWorkflowExecutionResponse);
  it("TestSignalWorkflowExecutionRequest", TestSignalWorkflowExecutionRequest);
  it("TestStartChildWorkflowExecutionFailedEventAttributes", TestStartChildWorkflowExecutionFailedEventAttributes);
  it("TestStartChildWorkflowExecutionInitiatedEventAttributes", TestStartChildWorkflowExecutionInitiatedEventAttributes);
  it.skip("TestStartTimeFilter", TestStartTimeFilter);
  it.skip("TestStartWorkflowExecutionRequest", TestStartWorkflowExecutionRequest);
  it.skip("TestStartWorkflowExecutionResponse", TestStartWorkflowExecutionResponse);
  it("TestStatusFilter", TestStatusFilter);
  it("TestStickyExecutionAttributes", TestStickyExecutionAttributes);
  it("TestSupportedClientVersions", TestSupportedClientVersions);
  it("TestTaskIDBlock", TestTaskIDBlock);
  it("TestTaskList", TestTaskList);
  it("TestTaskListMetadata", TestTaskListMetadata);
  it.skip("TestTaskListPartitionMetadata", TestTaskListPartitionMetadata);
  it("TestTaskListStatus", TestTaskListStatus);
  it("TestTerminateWorkflowExecutionRequest", TestTerminateWorkflowExecutionRequest);
  it("TestTimerCanceledEventAttributes", TestTimerCanceledEventAttributes);
  it("TestTimerFiredEventAttributes", TestTimerFiredEventAttributes);
  it.skip("TestTimerStartedEventAttributes", TestTimerStartedEventAttributes);
  it("TestListFailoverHistoryRequest", TestListFailoverHistoryRequest);
  it("TestListFailoverHistoryResponse", TestListFailoverHistoryResponse);
  it.skip("TestUpdateDomainRequest", TestUpdateDomainRequest);
  it("TestUpdateDomainResponse", TestUpdateDomainResponse);
  it("TestUpsertWorkflowSearchAttributesEventAttributes", TestUpsertWorkflowSearchAttributesEventAttributes);
  it("TestWorkerVersionInfo", TestWorkerVersionInfo);
  it("TestWorkflowExecution", TestWorkflowExecution);
  it.skip("TestExternalExecutionInfo", TestExternalExecutionInfo);
  it.skip("TestWorkflowExecutionCancelRequestedEventAttributes", TestWorkflowExecutionCancelRequestedEventAttributes);
  it("TestWorkflowExecutionCanceledEventAttributes", TestWorkflowExecutionCanceledEventAttributes);
  it("TestWorkflowExecutionCompletedEventAttributes", TestWorkflowExecutionCompletedEventAttributes);
  it.skip("TestWorkflowExecutionConfiguration", TestWorkflowExecutionConfiguration);
  it("TestWorkflowExecutionContinuedAsNewEventAttributes", TestWorkflowExecutionContinuedAsNewEventAttributes);
  it("TestWorkflowExecutionFailedEventAttributes", TestWorkflowExecutionFailedEventAttributes);
  it("TestWorkflowExecutionFilter", TestWorkflowExecutionFilter);
  it("TestParentExecutionInfo", TestParentExecutionInfo);
  it("TestWorkflowExecutionInfo", TestWorkflowExecutionInfo);
  it("TestWorkflowExecutionSignaledEventAttributes", TestWorkflowExecutionSignaledEventAttributes);
  it("TestWorkflowExecutionStartedEventAttributes", TestWorkflowExecutionStartedEventAttributes);
  it("TestWorkflowExecutionTerminatedEventAttributes", TestWorkflowExecutionTerminatedEventAttributes);
  it("TestWorkflowExecutionTimedOutEventAttributes", TestWorkflowExecutionTimedOutEventAttributes);
  it("TestWorkflowQuery", TestWorkflowQuery);
  it.skip("TestWorkflowQueryResult", TestWorkflowQueryResult);
  it("TestWorkflowType", TestWorkflowType);
  it("TestWorkflowTypeFilter", TestWorkflowTypeFilter);
  it.skip("TestDataBlobArray", TestDataBlobArray);
  it.skip("TestHistoryEventArray", TestHistoryEventArray);
  it.skip("TestTaskListPartitionMetadataArray", TestTaskListPartitionMetadataArray);
  it.skip("TestDecisionArray", TestDecisionArray);
  it.skip("TestPollerInfoArray", TestPollerInfoArray);
  it.skip("TestPendingChildExecutionInfoArray", TestPendingChildExecutionInfoArray);
  it.skip("TestWorkflowExecutionInfoArray", TestWorkflowExecutionInfoArray);
  it.skip("TestDescribeDomainResponseArray", TestDescribeDomainResponseArray);
  it.skip("TestResetPointInfoArray", TestResetPointInfoArray);
  it.skip("TestPendingActivityInfoArray", TestPendingActivityInfoArray);
  it.skip("TestClusterReplicationConfigurationArray", TestClusterReplicationConfigurationArray);
  it.skip("TestActivityLocalDispatchInfoMap", TestActivityLocalDispatchInfoMap);
  it.skip("TestBadBinaryInfoMap", TestBadBinaryInfoMap);
  it.skip("TestIndexedValueTypeMap", TestIndexedValueTypeMap);
  it.skip("TestWorkflowQueryMap", TestWorkflowQueryMap);
  it.skip("TestWorkflowQueryResultMap", TestWorkflowQueryResultMap);
  it("TestPayload", TestPayload);
  it.skip("TestPayloadMap", TestPayloadMap);
  it.skip("TestFailure", TestFailure);
  it.skip("TestHistoryEvent", TestHistoryEvent);
  it("TestDecision", TestDecision);
  it.skip("TestListClosedWorkflowExecutionsRequest", TestListClosedWorkflowExecutionsRequest);
  it.skip("TestListOpenWorkflowExecutionsRequest", TestListOpenWorkflowExecutionsRequest);
});
