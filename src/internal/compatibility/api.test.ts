// Suite module for api_test.ts. Registration is kept out of the declaration module so that a sibling
// test module importing it for a helper does not also register this suite.
import { describe, it } from 'vitest';
import {
  TestActivityLocalDispatchInfo,
  TestActivityTaskScheduledEventAttributes,
  TestBadBinaryInfo,
  TestCancelTimerFailedEventAttributes,
  TestChildWorkflowExecutionFailedEventAttributes,
  TestCountWorkflowExecutionsRequest,
  TestDecisionTaskCompletedEventAttributes,
  TestDecisionTaskFailedEventAttributes,
  TestDecisionTaskStartedEventAttributes,
  TestDescribeTaskListResponse,
  TestDiagnoseWorkflowExecutionResponse,
  TestGetClusterInfoResponse,
  TestGetSearchAttributesResponse,
  TestGetWorkflowExecutionHistoryRequest,
  TestHeader,
  TestListArchivedWorkflowExecutionsRequest,
  TestListClosedWorkflowExecutionsResponse,
  TestListDomainsRequest,
  TestListTaskListPartitionsRequest,
  TestListWorkflowExecutionsResponse,
  TestMarkerRecordedEventAttributes,
  TestPendingActivityInfo,
  TestPollForActivityTaskRequest,
  TestPollForDecisionTaskRequest,
  TestPollerInfo,
  TestQueryWorkflowResponse,
  TestRecordActivityTaskHeartbeatByIDRequest,
  TestRegisterDomainRequest,
  TestRequestCancelExternalWorkflowExecutionFailedEventAttributes,
  TestResetPointInfo,
  TestResetStickyTaskListRequest,
  TestResetWorkflowExecutionResponse,
  TestRespondActivityTaskCanceledByIDRequest,
  TestRespondActivityTaskCompletedRequest,
  TestRespondActivityTaskFailedRequest,
  TestRespondDecisionTaskCompletedResponse,
  TestRespondDecisionTaskFailedRequest,
  TestRespondQueryTaskCompletedRequest,
  TestSignalExternalWorkflowExecutionFailedEventAttributes,
  TestSignalWithStartWorkflowExecutionRequest,
  TestStartTimeFilter,
  TestStartWorkflowExecutionRequest,
  TestStartWorkflowExecutionResponse,
  TestTaskListPartitionMetadata,
  TestTimerStartedEventAttributes,
  TestUpdateDomainRequest,
  TestExternalExecutionInfo,
  TestWorkflowExecutionCancelRequestedEventAttributes,
  TestWorkflowExecutionConfiguration,
  TestWorkflowQueryResult,
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
  TestPayloadMap,
  TestFailure,
  TestHistoryEvent,
  TestListClosedWorkflowExecutionsRequest,
  TestListOpenWorkflowExecutionsRequest,
} from './api_test.js';
describe("api", () => {
  it.skip("TestActivityLocalDispatchInfo", TestActivityLocalDispatchInfo);
  it.skip("TestActivityTaskScheduledEventAttributes", TestActivityTaskScheduledEventAttributes);
  it.skip("TestBadBinaryInfo", TestBadBinaryInfo);
  it.skip("TestCancelTimerFailedEventAttributes", TestCancelTimerFailedEventAttributes);
  it.skip("TestChildWorkflowExecutionFailedEventAttributes", TestChildWorkflowExecutionFailedEventAttributes);
  it.skip("TestCountWorkflowExecutionsRequest", TestCountWorkflowExecutionsRequest);
  it.skip("TestDecisionTaskCompletedEventAttributes", TestDecisionTaskCompletedEventAttributes);
  it.skip("TestDecisionTaskFailedEventAttributes", TestDecisionTaskFailedEventAttributes);
  it.skip("TestDecisionTaskStartedEventAttributes", TestDecisionTaskStartedEventAttributes);
  it.skip("TestDescribeTaskListResponse", TestDescribeTaskListResponse);
  it.skip("TestDiagnoseWorkflowExecutionResponse", TestDiagnoseWorkflowExecutionResponse);
  it.skip("TestGetClusterInfoResponse", TestGetClusterInfoResponse);
  it.skip("TestGetSearchAttributesResponse", TestGetSearchAttributesResponse);
  it.skip("TestGetWorkflowExecutionHistoryRequest", TestGetWorkflowExecutionHistoryRequest);
  it.skip("TestHeader", TestHeader);
  it.skip("TestListArchivedWorkflowExecutionsRequest", TestListArchivedWorkflowExecutionsRequest);
  it.skip("TestListClosedWorkflowExecutionsResponse", TestListClosedWorkflowExecutionsResponse);
  it.skip("TestListDomainsRequest", TestListDomainsRequest);
  it.skip("TestListTaskListPartitionsRequest", TestListTaskListPartitionsRequest);
  it.skip("TestListWorkflowExecutionsResponse", TestListWorkflowExecutionsResponse);
  it.skip("TestMarkerRecordedEventAttributes", TestMarkerRecordedEventAttributes);
  it.skip("TestPendingActivityInfo", TestPendingActivityInfo);
  it.skip("TestPollForActivityTaskRequest", TestPollForActivityTaskRequest);
  it.skip("TestPollForDecisionTaskRequest", TestPollForDecisionTaskRequest);
  it.skip("TestPollerInfo", TestPollerInfo);
  it.skip("TestQueryWorkflowResponse", TestQueryWorkflowResponse);
  it.skip("TestRecordActivityTaskHeartbeatByIDRequest", TestRecordActivityTaskHeartbeatByIDRequest);
  it.skip("TestRegisterDomainRequest", TestRegisterDomainRequest);
  it.skip("TestRequestCancelExternalWorkflowExecutionFailedEventAttributes", TestRequestCancelExternalWorkflowExecutionFailedEventAttributes);
  it.skip("TestResetPointInfo", TestResetPointInfo);
  it.skip("TestResetStickyTaskListRequest", TestResetStickyTaskListRequest);
  it.skip("TestResetWorkflowExecutionResponse", TestResetWorkflowExecutionResponse);
  it.skip("TestRespondActivityTaskCanceledByIDRequest", TestRespondActivityTaskCanceledByIDRequest);
  it.skip("TestRespondActivityTaskCompletedRequest", TestRespondActivityTaskCompletedRequest);
  it.skip("TestRespondActivityTaskFailedRequest", TestRespondActivityTaskFailedRequest);
  it.skip("TestRespondDecisionTaskCompletedResponse", TestRespondDecisionTaskCompletedResponse);
  it.skip("TestRespondDecisionTaskFailedRequest", TestRespondDecisionTaskFailedRequest);
  it.skip("TestRespondQueryTaskCompletedRequest", TestRespondQueryTaskCompletedRequest);
  it.skip("TestSignalExternalWorkflowExecutionFailedEventAttributes", TestSignalExternalWorkflowExecutionFailedEventAttributes);
  it.skip("TestSignalWithStartWorkflowExecutionRequest", TestSignalWithStartWorkflowExecutionRequest);
  it.skip("TestStartTimeFilter", TestStartTimeFilter);
  it.skip("TestStartWorkflowExecutionRequest", TestStartWorkflowExecutionRequest);
  it.skip("TestStartWorkflowExecutionResponse", TestStartWorkflowExecutionResponse);
  it.skip("TestTaskListPartitionMetadata", TestTaskListPartitionMetadata);
  it.skip("TestTimerStartedEventAttributes", TestTimerStartedEventAttributes);
  it.skip("TestUpdateDomainRequest", TestUpdateDomainRequest);
  it.skip("TestExternalExecutionInfo", TestExternalExecutionInfo);
  it.skip("TestWorkflowExecutionCancelRequestedEventAttributes", TestWorkflowExecutionCancelRequestedEventAttributes);
  it.skip("TestWorkflowExecutionConfiguration", TestWorkflowExecutionConfiguration);
  it.skip("TestWorkflowQueryResult", TestWorkflowQueryResult);
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
  it.skip("TestPayloadMap", TestPayloadMap);
  it.skip("TestFailure", TestFailure);
  it.skip("TestHistoryEvent", TestHistoryEvent);
  it.skip("TestListClosedWorkflowExecutionsRequest", TestListClosedWorkflowExecutionsRequest);
  it.skip("TestListOpenWorkflowExecutionsRequest", TestListOpenWorkflowExecutionsRequest);
});
