// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
/**
 * DecodeThriftJSON — the lowering for Go's `json.Unmarshal` into a thrift-generated type.
 * Derived from the vendored .thrift IDL at generation time. It returns CONSTRUCTOR-READY
 * args: enum member names -> numeric values, base64 strings -> Buffer for binary fields,
 * plain objects -> Map for map fields. Nested structs and i64 stay raw — the generated
 * @creditkarma constructors normalize those themselves. Idempotent: already-decoded
 * values and unknown keys pass through untouched.
 */

const enumValues: Record<string, Record<string, number>> = {
  ActiveClusterSelectionStrategy: { REGION_STICKY: 0, EXTERNAL_ENTITY: 1 },
  ArchivalStatus: { DISABLED: 0, ENABLED: 1 },
  AsyncRequestType: { StartWorkflowExecutionAsyncRequest: 0, SignalWithStartWorkflowExecutionAsyncRequest: 1 },
  CancelExternalWorkflowExecutionFailedCause: { UNKNOWN_EXTERNAL_WORKFLOW_EXECUTION: 0, WORKFLOW_ALREADY_COMPLETED: 1 },
  ChildWorkflowExecutionFailedCause: { WORKFLOW_ALREADY_RUNNING: 0 },
  ContinueAsNewInitiator: { Decider: 0, RetryPolicy: 1, CronSchedule: 2 },
  CronOverlapPolicy: { SKIPPED: 0, BUFFERONE: 1 },
  CrossClusterTaskFailedCause: { DOMAIN_NOT_ACTIVE: 0, DOMAIN_NOT_EXISTS: 1, WORKFLOW_ALREADY_RUNNING: 2, WORKFLOW_NOT_EXISTS: 3, WORKFLOW_ALREADY_COMPLETED: 4, UNCATEGORIZED: 5 },
  CrossClusterTaskType: { StartChildExecution: 0, CancelExecution: 1, SignalExecution: 2, RecordChildWorkflowExecutionComplete: 3, ApplyParentClosePolicy: 4 },
  DLQType: { Replication: 0, Domain: 1 },
  DecisionTaskFailedCause: { UNHANDLED_DECISION: 0, BAD_SCHEDULE_ACTIVITY_ATTRIBUTES: 1, BAD_REQUEST_CANCEL_ACTIVITY_ATTRIBUTES: 2, BAD_START_TIMER_ATTRIBUTES: 3, BAD_CANCEL_TIMER_ATTRIBUTES: 4, BAD_RECORD_MARKER_ATTRIBUTES: 5, BAD_COMPLETE_WORKFLOW_EXECUTION_ATTRIBUTES: 6, BAD_FAIL_WORKFLOW_EXECUTION_ATTRIBUTES: 7, BAD_CANCEL_WORKFLOW_EXECUTION_ATTRIBUTES: 8, BAD_REQUEST_CANCEL_EXTERNAL_WORKFLOW_EXECUTION_ATTRIBUTES: 9, BAD_CONTINUE_AS_NEW_ATTRIBUTES: 10, START_TIMER_DUPLICATE_ID: 11, RESET_STICKY_TASKLIST: 12, WORKFLOW_WORKER_UNHANDLED_FAILURE: 13, BAD_SIGNAL_WORKFLOW_EXECUTION_ATTRIBUTES: 14, BAD_START_CHILD_EXECUTION_ATTRIBUTES: 15, FORCE_CLOSE_DECISION: 16, FAILOVER_CLOSE_DECISION: 17, BAD_SIGNAL_INPUT_SIZE: 18, RESET_WORKFLOW: 19, BAD_BINARY: 20, SCHEDULE_ACTIVITY_DUPLICATE_ID: 21, BAD_SEARCH_ATTRIBUTES: 22 },
  DecisionTaskTimedOutCause: { TIMEOUT: 0, RESET: 1 },
  DecisionType: { ScheduleActivityTask: 0, RequestCancelActivityTask: 1, StartTimer: 2, CompleteWorkflowExecution: 3, FailWorkflowExecution: 4, CancelTimer: 5, CancelWorkflowExecution: 6, RequestCancelExternalWorkflowExecution: 7, RecordMarker: 8, ContinueAsNewWorkflowExecution: 9, StartChildWorkflowExecution: 10, SignalExternalWorkflowExecution: 11, UpsertWorkflowSearchAttributes: 12 },
  DomainOperation: { Create: 0, Update: 1, Delete: 2 },
  DomainStatus: { REGISTERED: 0, DEPRECATED: 1, DELETED: 2 },
  EncodingType: { ThriftRW: 0, JSON: 1 },
  EventType: { WorkflowExecutionStarted: 0, WorkflowExecutionCompleted: 1, WorkflowExecutionFailed: 2, WorkflowExecutionTimedOut: 3, DecisionTaskScheduled: 4, DecisionTaskStarted: 5, DecisionTaskCompleted: 6, DecisionTaskTimedOut: 7, DecisionTaskFailed: 8, ActivityTaskScheduled: 9, ActivityTaskStarted: 10, ActivityTaskCompleted: 11, ActivityTaskFailed: 12, ActivityTaskTimedOut: 13, ActivityTaskCancelRequested: 14, RequestCancelActivityTaskFailed: 15, ActivityTaskCanceled: 16, TimerStarted: 17, TimerFired: 18, CancelTimerFailed: 19, TimerCanceled: 20, WorkflowExecutionCancelRequested: 21, WorkflowExecutionCanceled: 22, RequestCancelExternalWorkflowExecutionInitiated: 23, RequestCancelExternalWorkflowExecutionFailed: 24, ExternalWorkflowExecutionCancelRequested: 25, MarkerRecorded: 26, WorkflowExecutionSignaled: 27, WorkflowExecutionTerminated: 28, WorkflowExecutionContinuedAsNew: 29, StartChildWorkflowExecutionInitiated: 30, StartChildWorkflowExecutionFailed: 31, ChildWorkflowExecutionStarted: 32, ChildWorkflowExecutionCompleted: 33, ChildWorkflowExecutionFailed: 34, ChildWorkflowExecutionCanceled: 35, ChildWorkflowExecutionTimedOut: 36, ChildWorkflowExecutionTerminated: 37, SignalExternalWorkflowExecutionInitiated: 38, SignalExternalWorkflowExecutionFailed: 39, ExternalWorkflowExecutionSignaled: 40, UpsertWorkflowSearchAttributes: 41 },
  FailoverType: { INVALID: 0, FORCE: 1, GRACEFUL: 2 },
  FieldType: { String: 0, Int: 1, Bool: 2, Binary: 3 },
  GetTaskFailedCause: { SERVICE_BUSY: 0, TIMEOUT: 1, SHARD_OWNERSHIP_LOST: 2, UNCATEGORIZED: 3 },
  HistoryEventFilterType: { ALL_EVENT: 0, CLOSE_EVENT: 1 },
  IndexedValueType: { STRING: 0, KEYWORD: 1, INT: 2, DOUBLE: 3, BOOL: 4, DATETIME: 5 },
  IsolationGroupState: { INVALID: 0, HEALTHY: 1, DRAINED: 2 },
  MessageType: { Index: 0, Delete: 1, Create: 2 },
  Mode: { Normal: 0, Continuous: 1 },
  ParentClosePolicy: { ABANDON: 0, REQUEST_CANCEL: 1, TERMINATE: 2 },
  PendingActivityState: { SCHEDULED: 0, STARTED: 1, CANCEL_REQUESTED: 2 },
  PendingDecisionState: { SCHEDULED: 0, STARTED: 1 },
  PredicateType: { Universal: 0, Empty: 1, DomainID: 2 },
  QueryConsistencyLevel: { EVENTUAL: 0, STRONG: 1 },
  QueryRejectCondition: { NOT_OPEN: 0, NOT_COMPLETED_CLEANLY: 1 },
  QueryResultType: { ANSWERED: 0, FAILED: 1 },
  QueryTaskCompletedType: { COMPLETED: 0, FAILED: 1 },
  ReplicationTaskType: { Domain: 0, History: 1, SyncShardStatus: 2, SyncActivity: 3, HistoryMetadata: 4, HistoryV2: 5, FailoverMarker: 6 },
  SignalExternalWorkflowExecutionFailedCause: { UNKNOWN_EXTERNAL_WORKFLOW_EXECUTION: 0, WORKFLOW_ALREADY_COMPLETED: 1 },
  TaskListKind: { NORMAL: 0, STICKY: 1, EPHEMERAL: 2 },
  TaskListType: { Decision: 0, Activity: 1 },
  TaskSource: { HISTORY: 0, DB_BACKLOG: 1 },
  TimeoutType: { START_TO_CLOSE: 0, SCHEDULE_TO_START: 1, SCHEDULE_TO_CLOSE: 2, HEARTBEAT: 3 },
  VisibilityOperation: { RecordStarted: 0, RecordClosed: 1, UpsertSearchAttributes: 2 },
  WorkflowExecutionCloseStatus: { COMPLETED: 0, FAILED: 1, CANCELED: 2, TERMINATED: 3, CONTINUED_AS_NEW: 4, TIMED_OUT: 5 },
  WorkflowExecutionStatus: { PENDING: 0, STARTED: 1, COMPLETED: 2, FAILED: 3, CANCELED: 4, TERMINATED: 5, CONTINUED_AS_NEW: 6, TIMED_OUT: 7 },
  WorkflowIdReusePolicy: { AllowDuplicateFailedOnly: 0, AllowDuplicate: 1, RejectDuplicate: 2, TerminateIfRunning: 3 },
};

const fieldSpecs: Record<string, Record<string, string>> = {
  ActiveClusterSelectionPolicy: { strategy: 'e:ActiveClusterSelectionStrategy' },
  ActiveClusters: { activeClustersByRegion: 'm:', activeClustersByClusterAttribute: 'm:s:ClusterAttributeScope' },
  ActivityInfo: { scheduledEvent: 'b', startedEvent: 'b', taskListKind: 'e:TaskListKind', retryLastFailureDetails: 'b' },
  ActivityLocalDispatchInfo: { taskToken: 'b' },
  ActivityTaskCanceledEventAttributes: { details: 'b' },
  ActivityTaskCompletedEventAttributes: { result: 'b' },
  ActivityTaskDispatchInfo: { scheduledEvent: 's:HistoryEvent', heartbeatDetails: 'b' },
  ActivityTaskFailedEventAttributes: { details: 'b' },
  ActivityTaskScheduledEventAttributes: { taskList: 's:TaskList', input: 'b', header: 's:Header' },
  ActivityTaskStartedEventAttributes: { lastFailureDetails: 'b' },
  ActivityTaskTimedOutEventAttributes: { details: 'b', timeoutType: 'e:TimeoutType', lastFailureDetails: 'b' },
  AddActivityTaskRequest: { taskList: 's:TaskList', source: 'e:TaskSource', activityTaskDispatchInfo: 's:ActivityTaskDispatchInfo', partitionConfig: 'm:' },
  AddDecisionTaskRequest: { taskList: 's:TaskList', source: 'e:TaskSource', partitionConfig: 'm:' },
  AddSearchAttributeRequest: { searchAttribute: 'm:e:IndexedValueType' },
  Any: { Value: 'b' },
  ApplyParentClosePolicyAttributes: { parentClosePolicy: 'e:ParentClosePolicy' },
  ApplyParentClosePolicyRequest: { child: 's:ApplyParentClosePolicyAttributes', status: 's:ApplyParentClosePolicyStatus' },
  ApplyParentClosePolicyResult: { child: 's:ApplyParentClosePolicyAttributes', failedCause: 'e:CrossClusterTaskFailedCause' },
  ApplyParentClosePolicyStatus: { failedCause: 'e:CrossClusterTaskFailedCause' },
  AsyncRequestMessage: { type: 'e:AsyncRequestType', header: 's:Header', payload: 'b' },
  AsyncWorkflowConfiguration: { queueConfig: 's:DataBlob' },
  BadBinaries: { binaries: 'm:' },
  CancelOutstandingPollRequest: { taskList: 's:TaskList' },
  CancelWorkflowExecutionDecisionAttributes: { details: 'b' },
  ChildExecutionInfo: { initiatedEvent: 'b', startedRunID: 'b', startedEvent: 'b' },
  ChildWorkflowExecutionCanceledEventAttributes: { details: 'b' },
  ChildWorkflowExecutionCompletedEventAttributes: { result: 'b' },
  ChildWorkflowExecutionFailedEventAttributes: { details: 'b' },
  ChildWorkflowExecutionStartedEventAttributes: { header: 's:Header' },
  ChildWorkflowExecutionTimedOutEventAttributes: { timeoutType: 'e:TimeoutType' },
  ClusterAttributeScope: { clusterAttributes: 'm:' },
  CompleteWorkflowExecutionDecisionAttributes: { result: 'b' },
  ContinueAsNewWorkflowExecutionDecisionAttributes: { taskList: 's:TaskList', input: 'b', initiator: 'e:ContinueAsNewInitiator', failureDetails: 'b', lastCompletionResult: 'b', header: 's:Header', memo: 's:Memo', searchAttributes: 's:SearchAttributes', cronOverlapPolicy: 'e:CronOverlapPolicy', activeClusterSelectionPolicy: 's:ActiveClusterSelectionPolicy' },
  CrossClusterApplyParentClosePolicyRequestAttributes: { children: 'l:s:ApplyParentClosePolicyRequest' },
  CrossClusterApplyParentClosePolicyResponseAttributes: { childrenStatus: 'l:s:ApplyParentClosePolicyResult' },
  CrossClusterRecordChildWorkflowExecutionCompleteRequestAttributes: { completionEvent: 's:HistoryEvent' },
  CrossClusterSignalExecutionRequestAttributes: { signalInput: 'b', control: 'b' },
  CrossClusterStartChildExecutionRequestAttributes: { initiatedEventAttributes: 's:StartChildWorkflowExecutionInitiatedEventAttributes', partitionConfig: 'm:' },
  CrossClusterTaskInfo: { taskType: 'e:CrossClusterTaskType' },
  CrossClusterTaskRequest: { taskInfo: 's:CrossClusterTaskInfo', startChildExecutionAttributes: 's:CrossClusterStartChildExecutionRequestAttributes', signalExecutionAttributes: 's:CrossClusterSignalExecutionRequestAttributes', recordChildWorkflowExecutionCompleteAttributes: 's:CrossClusterRecordChildWorkflowExecutionCompleteRequestAttributes', applyParentClosePolicyAttributes: 's:CrossClusterApplyParentClosePolicyRequestAttributes' },
  CrossClusterTaskResponse: { taskType: 'e:CrossClusterTaskType', failedCause: 'e:CrossClusterTaskFailedCause', applyParentClosePolicyAttributes: 's:CrossClusterApplyParentClosePolicyResponseAttributes' },
  CurrentBranchChangedError: { currentBranchToken: 'b' },
  DataBlob: { EncodingType: 'e:EncodingType', Data: 'b' },
  Decision: { decisionType: 'e:DecisionType', scheduleActivityTaskDecisionAttributes: 's:ScheduleActivityTaskDecisionAttributes', completeWorkflowExecutionDecisionAttributes: 's:CompleteWorkflowExecutionDecisionAttributes', failWorkflowExecutionDecisionAttributes: 's:FailWorkflowExecutionDecisionAttributes', cancelWorkflowExecutionDecisionAttributes: 's:CancelWorkflowExecutionDecisionAttributes', requestCancelExternalWorkflowExecutionDecisionAttributes: 's:RequestCancelExternalWorkflowExecutionDecisionAttributes', recordMarkerDecisionAttributes: 's:RecordMarkerDecisionAttributes', continueAsNewWorkflowExecutionDecisionAttributes: 's:ContinueAsNewWorkflowExecutionDecisionAttributes', startChildWorkflowExecutionDecisionAttributes: 's:StartChildWorkflowExecutionDecisionAttributes', signalExternalWorkflowExecutionDecisionAttributes: 's:SignalExternalWorkflowExecutionDecisionAttributes', upsertWorkflowSearchAttributesDecisionAttributes: 's:UpsertWorkflowSearchAttributesDecisionAttributes' },
  DecisionTaskCompletedEventAttributes: { executionContext: 'b' },
  DecisionTaskFailedEventAttributes: { cause: 'e:DecisionTaskFailedCause', details: 'b' },
  DecisionTaskScheduledEventAttributes: { taskList: 's:TaskList' },
  DecisionTaskTimedOutEventAttributes: { timeoutType: 'e:TimeoutType', cause: 'e:DecisionTaskTimedOutCause' },
  DescribeClusterResponse: { persistenceInfo: 'm:' },
  DescribeDomainResponse: { domainInfo: 's:DomainInfo', configuration: 's:DomainConfiguration', replicationConfiguration: 's:DomainReplicationConfiguration' },
  DescribeShardDistributionResponse: { shards: 'm:' },
  DescribeTaskListRequest: { taskList: 's:TaskList', taskListType: 'e:TaskListType' },
  DescribeTaskListResponse: { taskListStatus: 's:TaskListStatus', taskList: 's:TaskList' },
  DescribeWorkflowExecutionRequest: { queryConsistencyLevel: 'e:QueryConsistencyLevel' },
  DescribeWorkflowExecutionResponse: { executionConfiguration: 's:WorkflowExecutionConfiguration', workflowExecutionInfo: 's:WorkflowExecutionInfo', pendingActivities: 'l:s:PendingActivityInfo', pendingChildren: 'l:s:PendingChildExecutionInfo', pendingDecision: 's:PendingDecisionInfo' },
  DomainConfiguration: { isolationgroups: 's:IsolationGroupConfiguration', badBinaries: 's:BadBinaries', historyArchivalStatus: 'e:ArchivalStatus', visibilityArchivalStatus: 'e:ArchivalStatus', AsyncWorkflowConfiguration: 's:AsyncWorkflowConfiguration' },
  DomainInfo: { data: 'm:', badBinaries: 'b', isolationGroupsConfiguration: 'b', asyncWorkflowConfiguration: 'b', activeClustersConfiguration: 'b' },
  DomainReplicationConfiguration: { activeClusters: 's:ActiveClusters' },
  DomainTaskAttributes: { domainOperation: 'e:DomainOperation', info: 's:DomainInfo', config: 's:DomainConfiguration', replicationConfig: 's:DomainReplicationConfiguration' },
  DynamicConfigBlob: { entries: 'l:s:DynamicConfigEntry' },
  DynamicConfigEntry: { values: 'l:s:DynamicConfigValue' },
  DynamicConfigFilter: { value: 's:DataBlob' },
  DynamicConfigValue: { value: 's:DataBlob', filters: 'l:s:DynamicConfigFilter' },
  ExternalWorkflowExecutionSignaledEventAttributes: { control: 'b' },
  FailWorkflowExecutionDecisionAttributes: { details: 'b' },
  FailoverDomainRequest: { activeClusters: 's:ActiveClusters' },
  FailoverDomainResponse: { domainInfo: 's:DomainInfo', configuration: 's:DomainConfiguration', replicationConfiguration: 's:DomainReplicationConfiguration' },
  FailoverEvent: { failoverType: 'e:FailoverType' },
  Field: { type: 'e:FieldType', binaryData: 'b' },
  GetCrossClusterTasksResponse: { failedCauseByShard: 'm:e:GetTaskFailedCause' },
  GetDLQReplicationMessagesRequest: { taskInfos: 'l:s:ReplicationTaskInfo' },
  GetDLQReplicationMessagesResponse: { replicationTasks: 'l:s:ReplicationTask' },
  GetDomainAsyncWorkflowConfiguratonResponse: { configuration: 's:AsyncWorkflowConfiguration' },
  GetDomainIsolationGroupsResponse: { isolationGroups: 's:IsolationGroupConfiguration' },
  GetDomainReplicationMessagesResponse: { messages: 's:ReplicationMessages' },
  GetDynamicConfigRequest: { filters: 'l:s:DynamicConfigFilter' },
  GetDynamicConfigResponse: { value: 's:DataBlob' },
  GetGlobalIsolationGroupsResponse: { isolationGroups: 's:IsolationGroupConfiguration' },
  GetMutableStateRequest: { currentBranchToken: 'b' },
  GetMutableStateResponse: { taskList: 's:TaskList', stickyTaskList: 's:TaskList', currentBranchToken: 'b', versionHistories: 's:VersionHistories' },
  GetReplicationMessagesResponse: { messagesByShard: 'm:s:ReplicationMessages' },
  GetSearchAttributesResponse: { keys: 'm:e:IndexedValueType' },
  GetTaskListsByDomainResponse: { decisionTaskListMap: 'm:s:DescribeTaskListResponse', activityTaskListMap: 'm:s:DescribeTaskListResponse' },
  GetWorkflowExecutionHistoryRequest: { nextPageToken: 'b', HistoryEventFilterType: 'e:HistoryEventFilterType', queryConsistencyLevel: 'e:QueryConsistencyLevel' },
  GetWorkflowExecutionHistoryResponse: { history: 's:History', rawHistory: 'l:s:DataBlob', nextPageToken: 'b' },
  GetWorkflowExecutionRawHistoryV2Request: { nextPageToken: 'b' },
  GetWorkflowExecutionRawHistoryV2Response: { nextPageToken: 'b', historyBatches: 'l:s:DataBlob', versionHistory: 's:VersionHistory' },
  Header: { fields: 'm:b' },
  History: { events: 'l:s:HistoryEvent' },
  HistoryEvent: { eventType: 'e:EventType', workflowExecutionStartedEventAttributes: 's:WorkflowExecutionStartedEventAttributes', workflowExecutionCompletedEventAttributes: 's:WorkflowExecutionCompletedEventAttributes', workflowExecutionFailedEventAttributes: 's:WorkflowExecutionFailedEventAttributes', workflowExecutionTimedOutEventAttributes: 's:WorkflowExecutionTimedOutEventAttributes', decisionTaskScheduledEventAttributes: 's:DecisionTaskScheduledEventAttributes', decisionTaskCompletedEventAttributes: 's:DecisionTaskCompletedEventAttributes', decisionTaskTimedOutEventAttributes: 's:DecisionTaskTimedOutEventAttributes', decisionTaskFailedEventAttributes: 's:DecisionTaskFailedEventAttributes', activityTaskScheduledEventAttributes: 's:ActivityTaskScheduledEventAttributes', activityTaskStartedEventAttributes: 's:ActivityTaskStartedEventAttributes', activityTaskCompletedEventAttributes: 's:ActivityTaskCompletedEventAttributes', activityTaskFailedEventAttributes: 's:ActivityTaskFailedEventAttributes', activityTaskTimedOutEventAttributes: 's:ActivityTaskTimedOutEventAttributes', activityTaskCanceledEventAttributes: 's:ActivityTaskCanceledEventAttributes', markerRecordedEventAttributes: 's:MarkerRecordedEventAttributes', workflowExecutionSignaledEventAttributes: 's:WorkflowExecutionSignaledEventAttributes', workflowExecutionTerminatedEventAttributes: 's:WorkflowExecutionTerminatedEventAttributes', workflowExecutionCanceledEventAttributes: 's:WorkflowExecutionCanceledEventAttributes', requestCancelExternalWorkflowExecutionInitiatedEventAttributes: 's:RequestCancelExternalWorkflowExecutionInitiatedEventAttributes', requestCancelExternalWorkflowExecutionFailedEventAttributes: 's:RequestCancelExternalWorkflowExecutionFailedEventAttributes', workflowExecutionContinuedAsNewEventAttributes: 's:WorkflowExecutionContinuedAsNewEventAttributes', startChildWorkflowExecutionInitiatedEventAttributes: 's:StartChildWorkflowExecutionInitiatedEventAttributes', startChildWorkflowExecutionFailedEventAttributes: 's:StartChildWorkflowExecutionFailedEventAttributes', childWorkflowExecutionStartedEventAttributes: 's:ChildWorkflowExecutionStartedEventAttributes', childWorkflowExecutionCompletedEventAttributes: 's:ChildWorkflowExecutionCompletedEventAttributes', childWorkflowExecutionFailedEventAttributes: 's:ChildWorkflowExecutionFailedEventAttributes', childWorkflowExecutionCanceledEventAttributes: 's:ChildWorkflowExecutionCanceledEventAttributes', childWorkflowExecutionTimedOutEventAttributes: 's:ChildWorkflowExecutionTimedOutEventAttributes', signalExternalWorkflowExecutionInitiatedEventAttributes: 's:SignalExternalWorkflowExecutionInitiatedEventAttributes', signalExternalWorkflowExecutionFailedEventAttributes: 's:SignalExternalWorkflowExecutionFailedEventAttributes', externalWorkflowExecutionSignaledEventAttributes: 's:ExternalWorkflowExecutionSignaledEventAttributes', upsertWorkflowSearchAttributesEventAttributes: 's:UpsertWorkflowSearchAttributesEventAttributes' },
  HistoryTaskV2Attributes: { events: 's:DataBlob', newRunEvents: 's:DataBlob' },
  IsolationGroupConfiguration: { isolationGroups: 'l:s:IsolationGroupPartition' },
  IsolationGroupPartition: { state: 'e:IsolationGroupState' },
  ListArchivedWorkflowExecutionsRequest: { nextPageToken: 'b' },
  ListArchivedWorkflowExecutionsResponse: { executions: 'l:s:WorkflowExecutionInfo', nextPageToken: 'b' },
  ListClosedWorkflowExecutionsRequest: { nextPageToken: 'b', statusFilter: 'e:WorkflowExecutionCloseStatus' },
  ListClosedWorkflowExecutionsResponse: { executions: 'l:s:WorkflowExecutionInfo', nextPageToken: 'b' },
  ListDomainsRequest: { nextPageToken: 'b' },
  ListDomainsResponse: { domains: 'l:s:DescribeDomainResponse', nextPageToken: 'b' },
  ListDynamicConfigResponse: { entries: 'l:s:DynamicConfigEntry' },
  ListFailoverHistoryRequest: { pagination: 's:PaginationOptions' },
  ListFailoverHistoryResponse: { failoverEvents: 'l:s:FailoverEvent', nextPageToken: 'b' },
  ListOpenWorkflowExecutionsRequest: { nextPageToken: 'b' },
  ListOpenWorkflowExecutionsResponse: { executions: 'l:s:WorkflowExecutionInfo', nextPageToken: 'b' },
  ListTaskListPartitionsRequest: { taskList: 's:TaskList' },
  ListWorkflowExecutionsRequest: { nextPageToken: 'b' },
  ListWorkflowExecutionsResponse: { executions: 'l:s:WorkflowExecutionInfo', nextPageToken: 'b' },
  MarkerRecordedEventAttributes: { details: 'b', header: 's:Header' },
  Memo: { fields: 'm:b' },
  MergeDLQMessagesRequest: { type: 'e:DLQType', nextPageToken: 'b' },
  MergeDLQMessagesResponse: { nextPageToken: 'b' },
  Message: { messageType: 'e:MessageType', fields: 'm:s:Field', visibilityOperation: 'e:VisibilityOperation' },
  MutableStateChecksumPayload: { VersionHistories: 's:VersionHistories' },
  PaginationOptions: { nextPageToken: 'b' },
  PendingActivityInfo: { state: 'e:PendingActivityState', heartbeatDetails: 'b', lastFailureDetails: 'b' },
  PendingChildExecutionInfo: { parentClosePolicy: 'e:ParentClosePolicy' },
  PendingDecisionInfo: { state: 'e:PendingDecisionState' },
  PinotMessage: { payload: 'b' },
  PollForActivityTaskRequest: { taskList: 's:TaskList' },
  PollForActivityTaskResponse: { taskToken: 'b', input: 'b', heartbeatDetails: 'b', header: 's:Header' },
  PollForDecisionTaskRequest: { taskList: 's:TaskList' },
  PollForDecisionTaskResponse: { taskToken: 'b', history: 's:History', nextPageToken: 'b', query: 's:WorkflowQuery', WorkflowExecutionTaskList: 's:TaskList', queries: 'm:s:WorkflowQuery' },
  PollMutableStateRequest: { currentBranchToken: 'b' },
  PollMutableStateResponse: { taskList: 's:TaskList', stickyTaskList: 's:TaskList', currentBranchToken: 'b', versionHistories: 's:VersionHistories' },
  Predicate: { predicateType: 'e:PredicateType' },
  PurgeDLQMessagesRequest: { type: 'e:DLQType' },
  QueryRejected: { closeStatus: 'e:WorkflowExecutionCloseStatus' },
  QueryWorkflowRequest: { query: 's:WorkflowQuery', queryRejectCondition: 'e:QueryRejectCondition', queryConsistencyLevel: 'e:QueryConsistencyLevel' },
  QueryWorkflowResponse: { queryResult: 'b', queryRejected: 's:QueryRejected' },
  QueueState: { virtualQueueStates: 'm:s:VirtualQueueState' },
  RatelimitUpdateRequest: { data: 's:Any' },
  RatelimitUpdateResponse: { data: 's:Any' },
  ReadDLQMessagesRequest: { type: 'e:DLQType', nextPageToken: 'b' },
  ReadDLQMessagesResponse: { type: 'e:DLQType', replicationTasks: 'l:s:ReplicationTask', nextPageToken: 'b', replicationTasksInfo: 'l:s:ReplicationTaskInfo' },
  ReapplyEventsRequest: { events: 's:DataBlob' },
  RecordActivityTaskHeartbeatByIDRequest: { details: 'b' },
  RecordActivityTaskHeartbeatRequest: { taskToken: 'b', details: 'b' },
  RecordActivityTaskStartedRequest: { pollRequest: 's:PollForActivityTaskRequest' },
  RecordActivityTaskStartedResponse: { scheduledEvent: 's:HistoryEvent', heartbeatDetails: 'b' },
  RecordChildExecutionCompletedRequest: { completionEvent: 's:HistoryEvent' },
  RecordDecisionTaskStartedRequest: { pollRequest: 's:PollForDecisionTaskRequest' },
  RecordDecisionTaskStartedResponse: { decisionInfo: 's:TransientDecisionInfo', WorkflowExecutionTaskList: 's:TaskList', branchToken: 'b', queries: 'm:s:WorkflowQuery' },
  RecordMarkerDecisionAttributes: { details: 'b', header: 's:Header' },
  RegisterDomainRequest: { activeClustersByRegion: 'm:', activeClusters: 's:ActiveClusters', data: 'm:', historyArchivalStatus: 'e:ArchivalStatus', visibilityArchivalStatus: 'e:ArchivalStatus' },
  ReplicateEventsV2Request: { events: 's:DataBlob', newRunEvents: 's:DataBlob' },
  ReplicationMessages: { replicationTasks: 'l:s:ReplicationTask' },
  ReplicationTask: { taskType: 'e:ReplicationTaskType', domainTaskAttributes: 's:DomainTaskAttributes', syncActivityTaskAttributes: 's:SyncActivityTaskAttributes', historyTaskV2Attributes: 's:HistoryTaskV2Attributes' },
  ReplicationTaskInfo: { domainID: 'b', runID: 'b', branch_token: 'b', newRunBranchToken: 'b' },
  RequestCancelExternalWorkflowExecutionDecisionAttributes: { control: 'b' },
  RequestCancelExternalWorkflowExecutionFailedEventAttributes: { cause: 'e:CancelExternalWorkflowExecutionFailedCause', control: 'b' },
  RequestCancelExternalWorkflowExecutionInitiatedEventAttributes: { control: 'b' },
  RespondActivityTaskCanceledByIDRequest: { details: 'b' },
  RespondActivityTaskCanceledRequest: { taskToken: 'b', details: 'b' },
  RespondActivityTaskCompletedByIDRequest: { result: 'b' },
  RespondActivityTaskCompletedRequest: { taskToken: 'b', result: 'b' },
  RespondActivityTaskFailedByIDRequest: { details: 'b' },
  RespondActivityTaskFailedRequest: { taskToken: 'b', details: 'b' },
  RespondCrossClusterTasksCompletedRequest: { taskResponses: 'l:s:CrossClusterTaskResponse' },
  RespondCrossClusterTasksCompletedResponse: { tasks: 'l:s:CrossClusterTaskRequest' },
  RespondDecisionTaskCompletedRequest: { taskToken: 'b', decisions: 'l:s:Decision', executionContext: 'b', stickyAttributes: 's:StickyExecutionAttributes', queryResults: 'm:s:WorkflowQueryResult' },
  RespondDecisionTaskCompletedResponse: { decisionTask: 's:PollForDecisionTaskResponse', activitiesToDispatchLocally: 'm:s:ActivityLocalDispatchInfo' },
  RespondDecisionTaskFailedRequest: { taskToken: 'b', cause: 'e:DecisionTaskFailedCause', details: 'b' },
  RespondQueryTaskCompletedRequest: { taskToken: 'b', completedType: 'e:QueryTaskCompletedType', queryResult: 'b' },
  RestoreDynamicConfigRequest: { filters: 'l:s:DynamicConfigFilter' },
  ScanWorkflowActivityParams: { nextPageToken: 'b' },
  ScanWorkflowActivityResult: { nextPageToken: 'b' },
  ScheduleActivityTaskDecisionAttributes: { taskList: 's:TaskList', input: 'b', header: 's:Header' },
  SearchAttributes: { indexedFields: 'm:b' },
  ShardInfo: { clusterTransferAckLevel: 'm:', clusterTimerAckLevel: 'm:', clusterReplicationLevel: 'm:', pendingFailoverMarkers: 'b', replicationDlqAckLevel: 'm:', transferProcessingQueueStates: 'b', timerProcessingQueueStates: 'b', crossClusterProcessingQueueStates: 'b', queueStates: 'm:s:QueueState' },
  SignalExternalWorkflowExecutionDecisionAttributes: { input: 'b', control: 'b' },
  SignalExternalWorkflowExecutionFailedEventAttributes: { cause: 'e:SignalExternalWorkflowExecutionFailedCause', control: 'b' },
  SignalExternalWorkflowExecutionInitiatedEventAttributes: { input: 'b', control: 'b' },
  SignalInfo: { input: 'b', control: 'b' },
  SignalWithStartWorkflowExecutionAsyncRequest: { request: 's:SignalWithStartWorkflowExecutionRequest' },
  SignalWithStartWorkflowExecutionRequest: { taskList: 's:TaskList', input: 'b', workflowIdReusePolicy: 'e:WorkflowIdReusePolicy', signalInput: 'b', control: 'b', memo: 's:Memo', searchAttributes: 's:SearchAttributes', header: 's:Header', cronOverlapPolicy: 'e:CronOverlapPolicy', activeClusterSelectionPolicy: 's:ActiveClusterSelectionPolicy' },
  SignalWorkflowExecutionRequest: { input: 'b', control: 'b' },
  StartChildWorkflowExecutionDecisionAttributes: { taskList: 's:TaskList', input: 'b', parentClosePolicy: 'e:ParentClosePolicy', control: 'b', workflowIdReusePolicy: 'e:WorkflowIdReusePolicy', header: 's:Header', memo: 's:Memo', searchAttributes: 's:SearchAttributes', cronOverlapPolicy: 'e:CronOverlapPolicy', activeClusterSelectionPolicy: 's:ActiveClusterSelectionPolicy' },
  StartChildWorkflowExecutionFailedEventAttributes: { cause: 'e:ChildWorkflowExecutionFailedCause', control: 'b' },
  StartChildWorkflowExecutionInitiatedEventAttributes: { taskList: 's:TaskList', input: 'b', parentClosePolicy: 'e:ParentClosePolicy', control: 'b', workflowIdReusePolicy: 'e:WorkflowIdReusePolicy', header: 's:Header', memo: 's:Memo', searchAttributes: 's:SearchAttributes', cronOverlapPolicy: 'e:CronOverlapPolicy', activeClusterSelectionPolicy: 's:ActiveClusterSelectionPolicy' },
  StartWorkflowExecutionAsyncRequest: { request: 's:StartWorkflowExecutionRequest' },
  StartWorkflowExecutionRequest: { taskList: 's:TaskList', input: 'b', workflowIdReusePolicy: 'e:WorkflowIdReusePolicy', memo: 's:Memo', searchAttributes: 's:SearchAttributes', header: 's:Header', cronOverlapPolicy: 'e:CronOverlapPolicy', activeClusterSelectionPolicy: 's:ActiveClusterSelectionPolicy' },
  StickyExecutionAttributes: { workerTaskList: 's:TaskList' },
  SyncActivityRequest: { details: 'b', lastFailureDetails: 'b', versionHistory: 's:VersionHistory' },
  SyncActivityTaskAttributes: { details: 'b', lastFailureDetails: 'b', versionHistory: 's:VersionHistory' },
  TaskInfo: { runID: 'b', partitionConfig: 'm:' },
  TaskList: { kind: 'e:TaskListKind' },
  TaskListInfo: { adaptivePartitionConfig: 's:TaskListPartitionConfig' },
  TaskListPartitionConfig: { readPartitions: 'm:', writePartitions: 'm:' },
  TaskListStatus: { isolationGroupMetrics: 'm:' },
  TerminateWorkflowExecutionRequest: { details: 'b' },
  TimerTaskInfo: { domainID: 'b', runID: 'b' },
  TransferTaskInfo: { domainID: 'b', runID: 'b', targetDomainID: 'b', targetRunID: 'b', targetDomainIDs: 'l:b' },
  TransientDecisionInfo: { scheduledEvent: 's:HistoryEvent', startedEvent: 's:HistoryEvent' },
  UpdateDomainAsyncWorkflowConfiguratonRequest: { configuration: 's:AsyncWorkflowConfiguration' },
  UpdateDomainInfo: { data: 'm:' },
  UpdateDomainIsolationGroupsRequest: { isolationGroups: 's:IsolationGroupConfiguration' },
  UpdateDomainRequest: { updatedInfo: 's:UpdateDomainInfo', configuration: 's:DomainConfiguration', replicationConfiguration: 's:DomainReplicationConfiguration' },
  UpdateDomainResponse: { domainInfo: 's:DomainInfo', configuration: 's:DomainConfiguration', replicationConfiguration: 's:DomainReplicationConfiguration' },
  UpdateDynamicConfigRequest: { configValues: 'l:s:DynamicConfigValue' },
  UpdateGlobalIsolationGroupsRequest: { isolationGroups: 's:IsolationGroupConfiguration' },
  UpsertWorkflowSearchAttributesDecisionAttributes: { searchAttributes: 's:SearchAttributes' },
  UpsertWorkflowSearchAttributesEventAttributes: { searchAttributes: 's:SearchAttributes' },
  VersionHistories: { histories: 'l:s:VersionHistory' },
  VersionHistory: { branchToken: 'b' },
  VirtualQueueState: { virtualSliceStates: 'l:s:VirtualSliceState' },
  VirtualSliceState: { predicate: 's:Predicate' },
  WeightedRatelimitQuotas: { quotas: 'm:' },
  WeightedRatelimitUsage: { calls: 'm:' },
  WeightedRatelimitUsageQuotas: { quotas: 'm:' },
  WorkflowExecutionCanceledEventAttributes: { details: 'b' },
  WorkflowExecutionCompletedEventAttributes: { result: 'b' },
  WorkflowExecutionConfiguration: { taskList: 's:TaskList' },
  WorkflowExecutionContinuedAsNewEventAttributes: { taskList: 's:TaskList', input: 'b', initiator: 'e:ContinueAsNewInitiator', failureDetails: 'b', lastCompletionResult: 'b', header: 's:Header', memo: 's:Memo', searchAttributes: 's:SearchAttributes', cronOverlapPolicy: 'e:CronOverlapPolicy', activeClusterSelectionPolicy: 's:ActiveClusterSelectionPolicy' },
  WorkflowExecutionFailedEventAttributes: { details: 'b' },
  WorkflowExecutionInfo: { parentDomainID: 'b', parentRunID: 'b', completionEvent: 'b', taskListKind: 'e:TaskListKind', executionContext: 'b', eventBranchToken: 'b', autoResetPoints: 'b', searchAttributes: 'm:b', memo: 'm:b', versionHistories: 'b', firstExecutionRunID: 'b', partitionConfig: 'm:', checksum: 'b', cronOverlapPolicy: 'e:CronOverlapPolicy', activeClusterSelectionPolicy: 'b' },
  WorkflowExecutionSignaledEventAttributes: { input: 'b' },
  WorkflowExecutionStartedEventAttributes: { taskList: 's:TaskList', input: 'b', initiator: 'e:ContinueAsNewInitiator', continuedFailureDetails: 'b', lastCompletionResult: 'b', memo: 's:Memo', searchAttributes: 's:SearchAttributes', header: 's:Header', partitionConfig: 'm:', cronOverlapPolicy: 'e:CronOverlapPolicy', activeClusterSelectionPolicy: 's:ActiveClusterSelectionPolicy' },
  WorkflowExecutionTerminatedEventAttributes: { details: 'b' },
  WorkflowExecutionTimedOutEventAttributes: { timeoutType: 'e:TimeoutType' },
  WorkflowParams: { nextPageToken: 'b', shadowMode: 'e:Mode' },
  WorkflowQuery: { queryArgs: 'b' },
  WorkflowQueryResult: { resultType: 'e:QueryResultType', answer: 'b' },
};

const structStringerKinds: Record<string, Array<[string, string]>> = {
  AccessDeniedError: [['message', '']],
  ActiveClusterInfo: [['activeClusterName', ''], ['failoverVersion', '']],
  ActiveClusterSelectionPolicy: [['clusterAttribute', ''], ['strategy', 'e:ActiveClusterSelectionStrategy'], ['stickyRegion', ''], ['externalEntityType', ''], ['externalEntityKey', '']],
  ActiveClusters: [['activeClustersByRegion', 'm'], ['activeClustersByClusterAttribute', 'm']],
  ActivityInfo: [['version', ''], ['scheduledEventBatchID', ''], ['scheduledEvent', 'b'], ['scheduledEventEncoding', ''], ['scheduledTimeNanos', ''], ['startedID', ''], ['startedEvent', 'b'], ['startedEventEncoding', ''], ['startedTimeNanos', ''], ['activityID', ''], ['requestID', ''], ['scheduleToStartTimeoutSeconds', ''], ['scheduleToCloseTimeoutSeconds', ''], ['startToCloseTimeoutSeconds', ''], ['heartbeatTimeoutSeconds', ''], ['cancelRequested', ''], ['cancelRequestID', ''], ['timerTaskStatus', ''], ['attempt', ''], ['taskList', ''], ['taskListKind', 'e:TaskListKind'], ['startedIdentity', ''], ['hasRetryPolicy', ''], ['retryInitialIntervalSeconds', ''], ['retryMaximumIntervalSeconds', ''], ['retryMaximumAttempts', ''], ['retryExpirationTimeNanos', ''], ['retryBackoffCoefficient', ''], ['retryNonRetryableErrors', 'l'], ['retryLastFailureReason', ''], ['retryLastWorkerIdentity', ''], ['retryLastFailureDetails', 'b']],
  ActivityLocalDispatchInfo: [['activityId', ''], ['scheduledTimestamp', ''], ['startedTimestamp', ''], ['scheduledTimestampOfThisAttempt', ''], ['taskToken', 'b']],
  ActivityTaskCancelRequestedEventAttributes: [['activityId', ''], ['decisionTaskCompletedEventId', '']],
  ActivityTaskCanceledEventAttributes: [['details', 'b'], ['latestCancelRequestedEventId', ''], ['scheduledEventId', ''], ['startedEventId', ''], ['identity', '']],
  ActivityTaskCompletedEventAttributes: [['result', 'b'], ['scheduledEventId', ''], ['startedEventId', ''], ['identity', '']],
  ActivityTaskDispatchInfo: [['scheduledEvent', ''], ['startedTimestamp', ''], ['attempt', ''], ['scheduledTimestampOfThisAttempt', ''], ['scheduledTimestamp', ''], ['heartbeatDetails', 'b'], ['workflowType', ''], ['workflowDomain', '']],
  ActivityTaskFailedEventAttributes: [['reason', ''], ['details', 'b'], ['scheduledEventId', ''], ['startedEventId', ''], ['identity', '']],
  ActivityTaskScheduledEventAttributes: [['activityId', ''], ['activityType', ''], ['domain', ''], ['taskList', ''], ['input', 'b'], ['scheduleToCloseTimeoutSeconds', ''], ['scheduleToStartTimeoutSeconds', ''], ['startToCloseTimeoutSeconds', ''], ['heartbeatTimeoutSeconds', ''], ['decisionTaskCompletedEventId', ''], ['retryPolicy', ''], ['header', '']],
  ActivityTaskStartedEventAttributes: [['scheduledEventId', ''], ['identity', ''], ['requestId', ''], ['attempt', ''], ['lastFailureReason', ''], ['lastFailureDetails', 'b']],
  ActivityTaskTimedOutEventAttributes: [['details', 'b'], ['scheduledEventId', ''], ['startedEventId', ''], ['timeoutType', 'e:TimeoutType'], ['lastFailureReason', ''], ['lastFailureDetails', 'b']],
  ActivityType: [['name', '']],
  AddActivityTaskRequest: [['domainUUID', ''], ['execution', ''], ['sourceDomainUUID', ''], ['taskList', ''], ['scheduleId', ''], ['scheduleToStartTimeoutSeconds', ''], ['source', 'e:TaskSource'], ['forwardedFrom', ''], ['activityTaskDispatchInfo', ''], ['partitionConfig', 'm']],
  AddDecisionTaskRequest: [['domainUUID', ''], ['execution', ''], ['taskList', ''], ['scheduleId', ''], ['scheduleToStartTimeoutSeconds', ''], ['source', 'e:TaskSource'], ['forwardedFrom', ''], ['partitionConfig', 'm']],
  AddSearchAttributeRequest: [['searchAttribute', 'm'], ['securityToken', '']],
  AdminDeleteWorkflowRequest: [['domain', ''], ['execution', '']],
  AdminDeleteWorkflowResponse: [['historyDeleted', ''], ['executionsDeleted', ''], ['visibilityDeleted', '']],
  AdminMaintainWorkflowRequest: [['domain', ''], ['execution', '']],
  AdminMaintainWorkflowResponse: [['historyDeleted', ''], ['executionsDeleted', ''], ['visibilityDeleted', '']],
  Any: [['ValueType', ''], ['Value', 'b']],
  ApplyParentClosePolicyAttributes: [['childDomainID', ''], ['childWorkflowID', ''], ['childRunID', ''], ['parentClosePolicy', 'e:ParentClosePolicy']],
  ApplyParentClosePolicyRequest: [['child', ''], ['status', '']],
  ApplyParentClosePolicyResult: [['child', ''], ['failedCause', 'e:CrossClusterTaskFailedCause']],
  ApplyParentClosePolicyStatus: [['completed', ''], ['failedCause', 'e:CrossClusterTaskFailedCause']],
  AsyncRequestMessage: [['partitionKey', ''], ['type', 'e:AsyncRequestType'], ['header', ''], ['encoding', ''], ['payload', 'b']],
  AsyncWorkflowConfiguration: [['enabled', ''], ['predefinedQueueName', ''], ['queueType', ''], ['queueConfig', '']],
  AutoConfigHint: [['enableAutoConfig', ''], ['pollerWaitTimeInMs', '']],
  BadBinaries: [['binaries', 'm']],
  BadBinaryInfo: [['reason', ''], ['operator', ''], ['createdTimeNano', '']],
  BadRequestError: [['message', '']],
  CancelOutstandingPollRequest: [['domainUUID', ''], ['taskListType', ''], ['taskList', ''], ['pollerID', '']],
  CancelTimerDecisionAttributes: [['timerId', '']],
  CancelTimerFailedEventAttributes: [['timerId', ''], ['cause', ''], ['decisionTaskCompletedEventId', ''], ['identity', '']],
  CancelWorkflowExecutionDecisionAttributes: [['details', 'b']],
  CancellationAlreadyRequestedError: [['message', '']],
  ChildExecutionInfo: [['version', ''], ['initiatedEventBatchID', ''], ['startedID', ''], ['initiatedEvent', 'b'], ['initiatedEventEncoding', ''], ['startedWorkflowID', ''], ['startedRunID', 'b'], ['startedEvent', 'b'], ['startedEventEncoding', ''], ['createRequestID', ''], ['domainID', ''], ['domainName', ''], ['workflowTypeName', ''], ['parentClosePolicy', '']],
  ChildWorkflowExecutionCanceledEventAttributes: [['details', 'b'], ['domain', ''], ['workflowExecution', ''], ['workflowType', ''], ['initiatedEventId', ''], ['startedEventId', '']],
  ChildWorkflowExecutionCompletedEventAttributes: [['result', 'b'], ['domain', ''], ['workflowExecution', ''], ['workflowType', ''], ['initiatedEventId', ''], ['startedEventId', '']],
  ChildWorkflowExecutionFailedEventAttributes: [['reason', ''], ['details', 'b'], ['domain', ''], ['workflowExecution', ''], ['workflowType', ''], ['initiatedEventId', ''], ['startedEventId', '']],
  ChildWorkflowExecutionStartedEventAttributes: [['domain', ''], ['initiatedEventId', ''], ['workflowExecution', ''], ['workflowType', ''], ['header', '']],
  ChildWorkflowExecutionTerminatedEventAttributes: [['domain', ''], ['workflowExecution', ''], ['workflowType', ''], ['initiatedEventId', ''], ['startedEventId', '']],
  ChildWorkflowExecutionTimedOutEventAttributes: [['timeoutType', 'e:TimeoutType'], ['domain', ''], ['workflowExecution', ''], ['workflowType', ''], ['initiatedEventId', ''], ['startedEventId', '']],
  ClientVersionNotSupportedError: [['featureVersion', ''], ['clientImpl', ''], ['supportedVersions', '']],
  CloseShardRequest: [['shardID', '']],
  ClusterAttribute: [['scope', ''], ['name', '']],
  ClusterAttributeScope: [['clusterAttributes', 'm']],
  ClusterFailover: [['fromCluster', ''], ['toCluster', ''], ['clusterAttribute', '']],
  ClusterInfo: [['supportedClientVersions', '']],
  ClusterReplicationConfiguration: [['clusterName', '']],
  CompleteWorkflowExecutionDecisionAttributes: [['result', 'b']],
  ContinueAsNewWorkflowExecutionDecisionAttributes: [['workflowType', ''], ['taskList', ''], ['input', 'b'], ['executionStartToCloseTimeoutSeconds', ''], ['taskStartToCloseTimeoutSeconds', ''], ['backoffStartIntervalInSeconds', ''], ['retryPolicy', ''], ['initiator', 'e:ContinueAsNewInitiator'], ['failureReason', ''], ['failureDetails', 'b'], ['lastCompletionResult', 'b'], ['cronSchedule', ''], ['header', ''], ['memo', ''], ['searchAttributes', ''], ['jitterStartSeconds', ''], ['cronOverlapPolicy', 'e:CronOverlapPolicy'], ['activeClusterSelectionPolicy', '']],
  CountWorkflowExecutionsRequest: [['domain', ''], ['query', '']],
  CountWorkflowExecutionsResponse: [['count', '']],
  CrossClusterApplyParentClosePolicyRequestAttributes: [['children', 'l']],
  CrossClusterApplyParentClosePolicyResponseAttributes: [['childrenStatus', 'l']],
  CrossClusterCancelExecutionRequestAttributes: [['targetDomainID', ''], ['targetWorkflowID', ''], ['targetRunID', ''], ['requestID', ''], ['initiatedEventID', ''], ['childWorkflowOnly', '']],
  CrossClusterRecordChildWorkflowExecutionCompleteRequestAttributes: [['targetDomainID', ''], ['targetWorkflowID', ''], ['targetRunID', ''], ['initiatedEventID', ''], ['completionEvent', '']],
  CrossClusterSignalExecutionRequestAttributes: [['targetDomainID', ''], ['targetWorkflowID', ''], ['targetRunID', ''], ['requestID', ''], ['initiatedEventID', ''], ['childWorkflowOnly', ''], ['signalName', ''], ['signalInput', 'b'], ['control', 'b']],
  CrossClusterStartChildExecutionRequestAttributes: [['targetDomainID', ''], ['requestID', ''], ['initiatedEventID', ''], ['initiatedEventAttributes', ''], ['targetRunID', ''], ['partitionConfig', 'm']],
  CrossClusterStartChildExecutionResponseAttributes: [['runID', '']],
  CrossClusterTaskInfo: [['domainID', ''], ['workflowID', ''], ['runID', ''], ['taskType', 'e:CrossClusterTaskType'], ['taskState', ''], ['taskID', ''], ['visibilityTimestamp', '']],
  CrossClusterTaskRequest: [['taskInfo', ''], ['startChildExecutionAttributes', ''], ['cancelExecutionAttributes', ''], ['signalExecutionAttributes', ''], ['recordChildWorkflowExecutionCompleteAttributes', ''], ['applyParentClosePolicyAttributes', '']],
  CrossClusterTaskResponse: [['taskID', ''], ['taskType', 'e:CrossClusterTaskType'], ['taskState', ''], ['failedCause', 'e:CrossClusterTaskFailedCause'], ['startChildExecutionAttributes', ''], ['cancelExecutionAttributes', ''], ['signalExecutionAttributes', ''], ['recordChildWorkflowExecutionCompleteAttributes', ''], ['applyParentClosePolicyAttributes', '']],
  CurrentBranchChangedError: [['message', ''], ['currentBranchToken', 'b']],
  DataBlob: [['EncodingType', 'e:EncodingType'], ['Data', 'b']],
  Decision: [['decisionType', 'e:DecisionType'], ['scheduleActivityTaskDecisionAttributes', ''], ['startTimerDecisionAttributes', ''], ['completeWorkflowExecutionDecisionAttributes', ''], ['failWorkflowExecutionDecisionAttributes', ''], ['requestCancelActivityTaskDecisionAttributes', ''], ['cancelTimerDecisionAttributes', ''], ['cancelWorkflowExecutionDecisionAttributes', ''], ['requestCancelExternalWorkflowExecutionDecisionAttributes', ''], ['recordMarkerDecisionAttributes', ''], ['continueAsNewWorkflowExecutionDecisionAttributes', ''], ['startChildWorkflowExecutionDecisionAttributes', ''], ['signalExternalWorkflowExecutionDecisionAttributes', ''], ['upsertWorkflowSearchAttributesDecisionAttributes', '']],
  DecisionTaskCompletedEventAttributes: [['executionContext', 'b'], ['scheduledEventId', ''], ['startedEventId', ''], ['identity', ''], ['binaryChecksum', '']],
  DecisionTaskFailedEventAttributes: [['scheduledEventId', ''], ['startedEventId', ''], ['cause', 'e:DecisionTaskFailedCause'], ['details', 'b'], ['identity', ''], ['reason', ''], ['baseRunId', ''], ['newRunId', ''], ['forkEventVersion', ''], ['binaryChecksum', ''], ['requestId', '']],
  DecisionTaskScheduledEventAttributes: [['taskList', ''], ['startToCloseTimeoutSeconds', ''], ['attempt', '']],
  DecisionTaskStartedEventAttributes: [['scheduledEventId', ''], ['identity', ''], ['requestId', '']],
  DecisionTaskTimedOutEventAttributes: [['scheduledEventId', ''], ['startedEventId', ''], ['timeoutType', 'e:TimeoutType'], ['baseRunId', ''], ['newRunId', ''], ['forkEventVersion', ''], ['reason', ''], ['cause', 'e:DecisionTaskTimedOutCause'], ['requestId', '']],
  DeleteDomainRequest: [['name', ''], ['securityToken', '']],
  DeprecateDomainRequest: [['name', ''], ['securityToken', '']],
  DescribeClusterResponse: [['supportedClientVersions', ''], ['membershipInfo', ''], ['persistenceInfo', 'm']],
  DescribeDomainRequest: [['name', ''], ['uuid', '']],
  DescribeDomainResponse: [['domainInfo', ''], ['configuration', ''], ['replicationConfiguration', ''], ['failoverVersion', ''], ['isGlobalDomain', ''], ['failoverInfo', '']],
  DescribeHistoryHostRequest: [['hostAddress', ''], ['shardIdForHost', ''], ['executionForHost', '']],
  DescribeHistoryHostResponse: [['numberOfShards', ''], ['shardIDs', 'l'], ['domainCache', ''], ['shardControllerStatus', ''], ['address', '']],
  DescribeMutableStateRequest: [['domainUUID', ''], ['execution', '']],
  DescribeMutableStateResponse: [['mutableStateInCache', ''], ['mutableStateInDatabase', '']],
  DescribeQueueRequest: [['shardID', ''], ['clusterName', ''], ['type', '']],
  DescribeQueueResponse: [['processingQueueStates', 'l']],
  DescribeShardDistributionRequest: [['pageSize', ''], ['pageID', '']],
  DescribeShardDistributionResponse: [['numberOfShards', ''], ['shards', 'm']],
  DescribeTaskListRequest: [['domain', ''], ['taskList', ''], ['taskListType', 'e:TaskListType'], ['includeTaskListStatus', '']],
  DescribeTaskListResponse: [['pollers', 'l'], ['taskListStatus', ''], ['taskList', '']],
  DescribeWorkflowExecutionRequest: [['domain', ''], ['execution', ''], ['queryConsistencyLevel', 'e:QueryConsistencyLevel']],
  DescribeWorkflowExecutionResponse: [['executionConfiguration', ''], ['workflowExecutionInfo', ''], ['pendingActivities', 'l'], ['pendingChildren', 'l'], ['pendingDecision', '']],
  DiagnoseWorkflowExecutionRequest: [['domain', ''], ['workflowExecution', ''], ['identity', '']],
  DiagnoseWorkflowExecutionResponse: [['domain', ''], ['diagnosticWorkflowExecution', '']],
  DomainAlreadyExistsError: [['message', '']],
  DomainCacheInfo: [['numOfItemsInCacheByID', ''], ['numOfItemsInCacheByName', '']],
  DomainConfiguration: [['workflowExecutionRetentionPeriodInDays', ''], ['emitMetric', ''], ['isolationgroups', ''], ['badBinaries', ''], ['historyArchivalStatus', 'e:ArchivalStatus'], ['historyArchivalURI', ''], ['visibilityArchivalStatus', 'e:ArchivalStatus'], ['visibilityArchivalURI', ''], ['AsyncWorkflowConfiguration', '']],
  DomainFilter: [['domainIDs', 'l'], ['reverseMatch', '']],
  DomainIDPredicateAttributes: [['domainIDs', 'l'], ['isExclusive', '']],
  DomainInfo: [['name', ''], ['description', ''], ['owner', ''], ['status', ''], ['retentionDays', ''], ['emitMetric', ''], ['archivalBucket', ''], ['archivalStatus', ''], ['configVersion', ''], ['notificationVersion', ''], ['failoverNotificationVersion', ''], ['failoverVersion', ''], ['activeClusterName', ''], ['clusters', 'l'], ['data', 'm'], ['badBinaries', 'b'], ['badBinariesEncoding', ''], ['historyArchivalStatus', ''], ['historyArchivalURI', ''], ['visibilityArchivalStatus', ''], ['visibilityArchivalURI', ''], ['failoverEndTime', ''], ['previousFailoverVersion', ''], ['lastUpdatedTime', ''], ['isolationGroupsConfiguration', 'b'], ['isolationGroupsConfigurationEncoding', ''], ['asyncWorkflowConfiguration', 'b'], ['asyncWorkflowConfigurationEncoding', ''], ['activeClustersConfiguration', 'b'], ['activeClustersConfigurationEncoding', '']],
  DomainNotActiveError: [['message', ''], ['domainName', ''], ['currentCluster', ''], ['activeCluster', ''], ['activeClusters', 'l']],
  DomainReplicationConfiguration: [['activeClusterName', ''], ['clusters', 'l'], ['activeClusters', '']],
  DomainTaskAttributes: [['domainOperation', 'e:DomainOperation'], ['id', ''], ['info', ''], ['config', ''], ['replicationConfig', ''], ['configVersion', ''], ['failoverVersion', ''], ['previousFailoverVersion', '']],
  DynamicConfigBlob: [['schemaVersion', ''], ['entries', 'l']],
  DynamicConfigEntry: [['name', ''], ['values', 'l']],
  DynamicConfigFilter: [['name', ''], ['value', '']],
  DynamicConfigValue: [['value', ''], ['filters', 'l']],
  EntityNotExistsError: [['message', ''], ['currentCluster', ''], ['activeCluster', ''], ['activeClusters', 'l']],
  EventAlreadyStartedError: [['message', '']],
  ExitCondition: [['expirationIntervalInSeconds', ''], ['shadowCount', '']],
  ExternalWorkflowExecutionCancelRequestedEventAttributes: [['initiatedEventId', ''], ['domain', ''], ['workflowExecution', '']],
  ExternalWorkflowExecutionSignaledEventAttributes: [['initiatedEventId', ''], ['domain', ''], ['workflowExecution', ''], ['control', 'b']],
  FailWorkflowExecutionDecisionAttributes: [['reason', ''], ['details', 'b']],
  FailoverDomainRequest: [['domainName', ''], ['domainActiveClusterName', ''], ['activeClusters', ''], ['reason', '']],
  FailoverDomainResponse: [['domainInfo', ''], ['configuration', ''], ['replicationConfiguration', ''], ['failoverVersion', ''], ['isGlobalDomain', '']],
  FailoverEvent: [['id', ''], ['createdTime', ''], ['failoverType', 'e:FailoverType'], ['clusterFailovers', 'l']],
  FailoverInfo: [['failoverVersion', ''], ['failoverStartTimestamp', ''], ['failoverExpireTimestamp', ''], ['completedShardCount', ''], ['pendingShards', 'l']],
  FailoverMarkerAttributes: [['domainID', ''], ['failoverVersion', ''], ['creationTime', '']],
  FailoverMarkerToken: [['shardIDs', 'l'], ['failoverMarker', '']],
  FailoverMarkers: [['failoverMarkers', 'l']],
  FeatureFlags: [['WorkflowExecutionAlreadyCompletedErrorEnabled', ''], ['AutoForwardingEnabled', '']],
  FeatureNotEnabledError: [['featureFlag', '']],
  Field: [['type', 'e:FieldType'], ['stringData', ''], ['intData', ''], ['boolData', ''], ['binaryData', 'b']],
  GetCrossClusterTasksRequest: [['shardIDs', 'l'], ['targetCluster', '']],
  GetCrossClusterTasksResponse: [['map', ''], ['failedCauseByShard', 'm']],
  GetDLQReplicationMessagesRequest: [['taskInfos', 'l']],
  GetDLQReplicationMessagesResponse: [['replicationTasks', 'l']],
  GetDomainAsyncWorkflowConfiguratonRequest: [['domain', '']],
  GetDomainAsyncWorkflowConfiguratonResponse: [['configuration', '']],
  GetDomainIsolationGroupsRequest: [['domain', '']],
  GetDomainIsolationGroupsResponse: [['isolationGroups', '']],
  GetDomainReplicationMessagesRequest: [['lastRetrievedMessageId', ''], ['lastProcessedMessageId', ''], ['clusterName', '']],
  GetDomainReplicationMessagesResponse: [['messages', '']],
  GetDynamicConfigRequest: [['configName', ''], ['filters', 'l']],
  GetDynamicConfigResponse: [['value', '']],
  GetFailoverInfoRequest: [['domainID', '']],
  GetFailoverInfoResponse: [['completedShardCount', ''], ['pendingShards', 'l']],
  GetGlobalIsolationGroupsResponse: [['isolationGroups', '']],
  GetMutableStateRequest: [['domainUUID', ''], ['execution', ''], ['expectedNextEventId', ''], ['currentBranchToken', 'b'], ['versionHistoryItem', '']],
  GetMutableStateResponse: [['execution', ''], ['workflowType', ''], ['NextEventId', ''], ['PreviousStartedEventId', ''], ['LastFirstEventId', ''], ['taskList', ''], ['stickyTaskList', ''], ['clientLibraryVersion', ''], ['clientFeatureVersion', ''], ['clientImpl', ''], ['isWorkflowRunning', ''], ['stickyTaskListScheduleToStartTimeout', ''], ['eventStoreVersion', ''], ['currentBranchToken', 'b'], ['workflowState', ''], ['workflowCloseState', ''], ['versionHistories', ''], ['isStickyTaskListEnabled', ''], ['historySize', '']],
  GetReplicationMessagesRequest: [['tokens', 'l'], ['clusterName', '']],
  GetReplicationMessagesResponse: [['messagesByShard', 'm']],
  GetSearchAttributesResponse: [['keys', 'm']],
  GetTaskListsByDomainRequest: [['domainName', '']],
  GetTaskListsByDomainResponse: [['decisionTaskListMap', 'm'], ['activityTaskListMap', 'm']],
  GetWorkflowExecutionHistoryRequest: [['domain', ''], ['execution', ''], ['maximumPageSize', ''], ['nextPageToken', 'b'], ['waitForNewEvent', ''], ['HistoryEventFilterType', 'e:HistoryEventFilterType'], ['skipArchival', ''], ['queryConsistencyLevel', 'e:QueryConsistencyLevel']],
  GetWorkflowExecutionHistoryResponse: [['history', ''], ['rawHistory', 'l'], ['nextPageToken', 'b'], ['archived', '']],
  GetWorkflowExecutionRawHistoryV2Request: [['domain', ''], ['execution', ''], ['startEventId', ''], ['startEventVersion', ''], ['endEventId', ''], ['endEventVersion', ''], ['maximumPageSize', ''], ['nextPageToken', 'b']],
  GetWorkflowExecutionRawHistoryV2Response: [['nextPageToken', 'b'], ['historyBatches', 'l'], ['versionHistory', '']],
  Header: [['fields', 'm']],
  HealthStatus: [['ok', ''], ['msg', '']],
  History: [['events', 'l']],
  HistoryBranch: [['treeID', ''], ['branchID', ''], ['ancestors', 'l']],
  HistoryBranchRange: [['branchID', ''], ['beginNodeID', ''], ['endNodeID', '']],
  HistoryEvent: [['eventId', ''], ['timestamp', ''], ['eventType', 'e:EventType'], ['version', ''], ['taskId', ''], ['workflowExecutionStartedEventAttributes', ''], ['workflowExecutionCompletedEventAttributes', ''], ['workflowExecutionFailedEventAttributes', ''], ['workflowExecutionTimedOutEventAttributes', ''], ['decisionTaskScheduledEventAttributes', ''], ['decisionTaskStartedEventAttributes', ''], ['decisionTaskCompletedEventAttributes', ''], ['decisionTaskTimedOutEventAttributes', ''], ['decisionTaskFailedEventAttributes', ''], ['activityTaskScheduledEventAttributes', ''], ['activityTaskStartedEventAttributes', ''], ['activityTaskCompletedEventAttributes', ''], ['activityTaskFailedEventAttributes', ''], ['activityTaskTimedOutEventAttributes', ''], ['timerStartedEventAttributes', ''], ['timerFiredEventAttributes', ''], ['activityTaskCancelRequestedEventAttributes', ''], ['requestCancelActivityTaskFailedEventAttributes', ''], ['activityTaskCanceledEventAttributes', ''], ['timerCanceledEventAttributes', ''], ['cancelTimerFailedEventAttributes', ''], ['markerRecordedEventAttributes', ''], ['workflowExecutionSignaledEventAttributes', ''], ['workflowExecutionTerminatedEventAttributes', ''], ['workflowExecutionCancelRequestedEventAttributes', ''], ['workflowExecutionCanceledEventAttributes', ''], ['requestCancelExternalWorkflowExecutionInitiatedEventAttributes', ''], ['requestCancelExternalWorkflowExecutionFailedEventAttributes', ''], ['externalWorkflowExecutionCancelRequestedEventAttributes', ''], ['workflowExecutionContinuedAsNewEventAttributes', ''], ['startChildWorkflowExecutionInitiatedEventAttributes', ''], ['startChildWorkflowExecutionFailedEventAttributes', ''], ['childWorkflowExecutionStartedEventAttributes', ''], ['childWorkflowExecutionCompletedEventAttributes', ''], ['childWorkflowExecutionFailedEventAttributes', ''], ['childWorkflowExecutionCanceledEventAttributes', ''], ['childWorkflowExecutionTimedOutEventAttributes', ''], ['childWorkflowExecutionTerminatedEventAttributes', ''], ['signalExternalWorkflowExecutionInitiatedEventAttributes', ''], ['signalExternalWorkflowExecutionFailedEventAttributes', ''], ['externalWorkflowExecutionSignaledEventAttributes', ''], ['upsertWorkflowSearchAttributesEventAttributes', '']],
  HistoryTaskV2Attributes: [['taskId', ''], ['domainId', ''], ['workflowId', ''], ['runId', ''], ['versionHistoryItems', 'l'], ['events', ''], ['newRunEvents', '']],
  HistoryTreeInfo: [['createdTimeNanos', ''], ['ancestors', 'l'], ['info', '']],
  HostInfo: [['Identity', '']],
  InternalDataInconsistencyError: [['message', '']],
  InternalServiceError: [['message', '']],
  IsolationGroupConfiguration: [['isolationGroups', 'l']],
  IsolationGroupMetrics: [['newTasksPerSecond', ''], ['pollerCount', '']],
  IsolationGroupPartition: [['name', ''], ['state', 'e:IsolationGroupState']],
  LimitExceededError: [['message', '']],
  ListArchivedWorkflowExecutionsRequest: [['domain', ''], ['pageSize', ''], ['nextPageToken', 'b'], ['query', '']],
  ListArchivedWorkflowExecutionsResponse: [['executions', 'l'], ['nextPageToken', 'b']],
  ListClosedWorkflowExecutionsRequest: [['domain', ''], ['maximumPageSize', ''], ['nextPageToken', 'b'], ['StartTimeFilter', ''], ['executionFilter', ''], ['typeFilter', ''], ['statusFilter', 'e:WorkflowExecutionCloseStatus']],
  ListClosedWorkflowExecutionsResponse: [['executions', 'l'], ['nextPageToken', 'b']],
  ListDomainsRequest: [['pageSize', ''], ['nextPageToken', 'b']],
  ListDomainsResponse: [['domains', 'l'], ['nextPageToken', 'b']],
  ListDynamicConfigRequest: [['configName', '']],
  ListDynamicConfigResponse: [['entries', 'l']],
  ListFailoverHistoryRequest: [['filters', ''], ['pagination', '']],
  ListFailoverHistoryRequestFilters: [['domainID', '']],
  ListFailoverHistoryResponse: [['failoverEvents', 'l'], ['nextPageToken', 'b']],
  ListOpenWorkflowExecutionsRequest: [['domain', ''], ['maximumPageSize', ''], ['nextPageToken', 'b'], ['StartTimeFilter', ''], ['executionFilter', ''], ['typeFilter', '']],
  ListOpenWorkflowExecutionsResponse: [['executions', 'l'], ['nextPageToken', 'b']],
  ListTaskListPartitionsRequest: [['domain', ''], ['taskList', '']],
  ListTaskListPartitionsResponse: [['activityTaskListPartitions', 'l'], ['decisionTaskListPartitions', 'l']],
  ListWorkflowExecutionsRequest: [['domain', ''], ['pageSize', ''], ['nextPageToken', 'b'], ['query', '']],
  ListWorkflowExecutionsResponse: [['executions', 'l'], ['nextPageToken', 'b']],
  MarkerRecordedEventAttributes: [['markerName', ''], ['details', 'b'], ['decisionTaskCompletedEventId', ''], ['header', '']],
  MembershipInfo: [['currentHost', ''], ['reachableMembers', 'l'], ['rings', 'l']],
  Memo: [['fields', 'm']],
  MergeDLQMessagesRequest: [['type', 'e:DLQType'], ['shardID', ''], ['sourceCluster', ''], ['inclusiveEndMessageID', ''], ['maximumPageSize', ''], ['nextPageToken', 'b']],
  MergeDLQMessagesResponse: [['nextPageToken', 'b']],
  Message: [['messageType', 'e:MessageType'], ['domainID', ''], ['workflowID', ''], ['runID', ''], ['version', ''], ['fields', 'm'], ['visibilityOperation', 'e:VisibilityOperation']],
  MutableStateChecksumPayload: [['cancelRequested', ''], ['state', ''], ['closeStatus', ''], ['lastWriteVersion', ''], ['lastWriteEventID', ''], ['lastFirstEventID', ''], ['nextEventID', ''], ['lastProcessedEventID', ''], ['signalCount', ''], ['decisionAttempt', ''], ['decisionVersion', ''], ['decisionScheduledID', ''], ['decisionStartedID', ''], ['pendingTimerStartedIDs', 'l'], ['pendingActivityScheduledIDs', 'l'], ['pendingSignalInitiatedIDs', 'l'], ['pendingReqCancelInitiatedIDs', 'l'], ['pendingChildInitiatedIDs', 'l'], ['stickyTaskListName', ''], ['VersionHistories', '']],
  NotifyFailoverMarkersRequest: [['failoverMarkerTokens', 'l']],
  PaginationOptions: [['pageSize', ''], ['nextPageToken', 'b']],
  ParentExecutionInfo: [['domainUUID', ''], ['domain', ''], ['execution', ''], ['initiatedId', '']],
  PendingActivityInfo: [['activityID', ''], ['activityType', ''], ['state', 'e:PendingActivityState'], ['heartbeatDetails', 'b'], ['lastHeartbeatTimestamp', ''], ['lastStartedTimestamp', ''], ['attempt', ''], ['maximumAttempts', ''], ['scheduledTimestamp', ''], ['expirationTimestamp', ''], ['lastFailureReason', ''], ['lastWorkerIdentity', ''], ['lastFailureDetails', 'b'], ['startedWorkerIdentity', ''], ['scheduleID', '']],
  PendingChildExecutionInfo: [['domain', ''], ['workflowID', ''], ['runID', ''], ['workflowTypName', ''], ['initiatedID', ''], ['parentClosePolicy', 'e:ParentClosePolicy']],
  PendingDecisionInfo: [['state', 'e:PendingDecisionState'], ['scheduledTimestamp', ''], ['startedTimestamp', ''], ['attempt', ''], ['originalScheduledTimestamp', ''], ['scheduleID', '']],
  PersistenceFeature: [['key', ''], ['enabled', '']],
  PersistenceInfo: [['backend', ''], ['settings', 'l'], ['features', 'l']],
  PersistenceSetting: [['key', ''], ['value', '']],
  PinotMessage: [['workflowID', ''], ['payload', 'b']],
  PollForActivityTaskRequest: [['domain', ''], ['taskList', ''], ['identity', ''], ['taskListMetadata', '']],
  PollForActivityTaskResponse: [['taskToken', 'b'], ['workflowExecution', ''], ['activityId', ''], ['activityType', ''], ['input', 'b'], ['scheduledTimestamp', ''], ['scheduleToCloseTimeoutSeconds', ''], ['startedTimestamp', ''], ['startToCloseTimeoutSeconds', ''], ['heartbeatTimeoutSeconds', ''], ['attempt', ''], ['scheduledTimestampOfThisAttempt', ''], ['heartbeatDetails', 'b'], ['workflowType', ''], ['workflowDomain', ''], ['header', ''], ['autoConfigHint', '']],
  PollForDecisionTaskRequest: [['domain', ''], ['taskList', ''], ['identity', ''], ['binaryChecksum', '']],
  PollForDecisionTaskResponse: [['taskToken', 'b'], ['workflowExecution', ''], ['workflowType', ''], ['previousStartedEventId', ''], ['startedEventId', ''], ['attempt', ''], ['backlogCountHint', ''], ['history', ''], ['nextPageToken', 'b'], ['query', ''], ['WorkflowExecutionTaskList', ''], ['scheduledTimestamp', ''], ['startedTimestamp', ''], ['queries', 'm'], ['nextEventId', ''], ['totalHistoryBytes', ''], ['autoConfigHint', '']],
  PollMutableStateRequest: [['domainUUID', ''], ['execution', ''], ['expectedNextEventId', ''], ['currentBranchToken', 'b']],
  PollMutableStateResponse: [['execution', ''], ['workflowType', ''], ['NextEventId', ''], ['PreviousStartedEventId', ''], ['LastFirstEventId', ''], ['taskList', ''], ['stickyTaskList', ''], ['clientLibraryVersion', ''], ['clientFeatureVersion', ''], ['clientImpl', ''], ['stickyTaskListScheduleToStartTimeout', ''], ['currentBranchToken', 'b'], ['versionHistories', ''], ['workflowState', ''], ['workflowCloseState', '']],
  PollerInfo: [['lastAccessTime', ''], ['identity', ''], ['ratePerSecond', '']],
  Predicate: [['predicateType', 'e:PredicateType'], ['universalPredicateAttributes', ''], ['emptyPredicateAttributes', ''], ['domainIDPredicateAttributes', '']],
  ProcessingQueueState: [['level', ''], ['ackLevel', ''], ['maxLevel', ''], ['domainFilter', '']],
  ProcessingQueueStates: [['map', '']],
  PurgeDLQMessagesRequest: [['type', 'e:DLQType'], ['shardID', ''], ['sourceCluster', ''], ['inclusiveEndMessageID', '']],
  QueryFailedError: [['message', '']],
  QueryRejected: [['closeStatus', 'e:WorkflowExecutionCloseStatus']],
  QueryWorkflowRequest: [['domain', ''], ['execution', ''], ['query', ''], ['queryRejectCondition', 'e:QueryRejectCondition'], ['queryConsistencyLevel', 'e:QueryConsistencyLevel']],
  QueryWorkflowResponse: [['queryResult', 'b'], ['queryRejected', '']],
  QueueState: [['virtualQueueStates', 'm'], ['exclusiveMaxReadLevel', '']],
  RatelimitUpdateRequest: [['data', '']],
  RatelimitUpdateResponse: [['data', '']],
  ReadDLQMessagesRequest: [['type', 'e:DLQType'], ['shardID', ''], ['sourceCluster', ''], ['inclusiveEndMessageID', ''], ['maximumPageSize', ''], ['nextPageToken', 'b']],
  ReadDLQMessagesResponse: [['type', 'e:DLQType'], ['replicationTasks', 'l'], ['nextPageToken', 'b'], ['replicationTasksInfo', 'l']],
  ReapplyEventsRequest: [['domainName', ''], ['workflowExecution', ''], ['events', '']],
  RecordActivityTaskHeartbeatByIDRequest: [['domain', ''], ['workflowID', ''], ['runID', ''], ['activityID', ''], ['details', 'b'], ['identity', '']],
  RecordActivityTaskHeartbeatRequest: [['taskToken', 'b'], ['details', 'b'], ['identity', '']],
  RecordActivityTaskHeartbeatResponse: [['cancelRequested', '']],
  RecordActivityTaskStartedRequest: [['domainUUID', ''], ['workflowExecution', ''], ['scheduleId', ''], ['taskId', ''], ['requestId', ''], ['pollRequest', '']],
  RecordActivityTaskStartedResponse: [['scheduledEvent', ''], ['startedTimestamp', ''], ['attempt', ''], ['scheduledTimestampOfThisAttempt', ''], ['heartbeatDetails', 'b'], ['workflowType', ''], ['workflowDomain', '']],
  RecordChildExecutionCompletedRequest: [['domainUUID', ''], ['workflowExecution', ''], ['initiatedId', ''], ['completedExecution', ''], ['completionEvent', ''], ['startedId', '']],
  RecordDecisionTaskStartedRequest: [['domainUUID', ''], ['workflowExecution', ''], ['scheduleId', ''], ['taskId', ''], ['requestId', ''], ['pollRequest', '']],
  RecordDecisionTaskStartedResponse: [['workflowType', ''], ['previousStartedEventId', ''], ['scheduledEventId', ''], ['startedEventId', ''], ['nextEventId', ''], ['attempt', ''], ['stickyExecutionEnabled', ''], ['decisionInfo', ''], ['WorkflowExecutionTaskList', ''], ['eventStoreVersion', ''], ['branchToken', 'b'], ['scheduledTimestamp', ''], ['startedTimestamp', ''], ['queries', 'm'], ['historySize', '']],
  RecordMarkerDecisionAttributes: [['markerName', ''], ['details', 'b'], ['header', '']],
  RefreshWorkflowTasksRequest: [['domain', ''], ['execution', '']],
  RegisterDomainRequest: [['name', ''], ['description', ''], ['ownerEmail', ''], ['workflowExecutionRetentionPeriodInDays', ''], ['emitMetric', ''], ['clusters', 'l'], ['activeClusterName', ''], ['activeClustersByRegion', 'm'], ['activeClusters', ''], ['data', 'm'], ['securityToken', ''], ['isGlobalDomain', ''], ['historyArchivalStatus', 'e:ArchivalStatus'], ['historyArchivalURI', ''], ['visibilityArchivalStatus', 'e:ArchivalStatus'], ['visibilityArchivalURI', '']],
  RemoteSyncMatchedError: [['message', '']],
  RemoveSignalMutableStateRequest: [['domainUUID', ''], ['workflowExecution', ''], ['requestId', '']],
  RemoveTaskRequest: [['shardID', ''], ['type', ''], ['taskID', ''], ['visibilityTimestamp', ''], ['clusterName', '']],
  ReplayWorkflowActivityParams: [['domain', ''], ['executions', 'l']],
  ReplayWorkflowActivityResult: [['succeeded', ''], ['skipped', ''], ['failed', '']],
  ReplicateEventsV2Request: [['domainUUID', ''], ['workflowExecution', ''], ['versionHistoryItems', 'l'], ['events', ''], ['newRunEvents', '']],
  ReplicationMessages: [['replicationTasks', 'l'], ['lastRetrievedMessageId', ''], ['hasMore', ''], ['syncShardStatus', '']],
  ReplicationTask: [['taskType', 'e:ReplicationTaskType'], ['sourceTaskId', ''], ['domainTaskAttributes', ''], ['syncShardStatusTaskAttributes', ''], ['syncActivityTaskAttributes', ''], ['historyTaskV2Attributes', ''], ['failoverMarkerAttributes', ''], ['creationTime', '']],
  ReplicationTaskInfo: [['domainID', 'b'], ['workflowID', ''], ['runID', 'b'], ['taskType', ''], ['version', ''], ['firstEventID', ''], ['nextEventID', ''], ['scheduledID', ''], ['eventStoreVersion', ''], ['newRunEventStoreVersion', ''], ['branch_token', 'b'], ['newRunBranchToken', 'b'], ['creationTime', '']],
  ReplicationToken: [['shardID', ''], ['lastRetrievedMessageId', ''], ['lastProcessedMessageId', '']],
  RequestCancelActivityTaskDecisionAttributes: [['activityId', '']],
  RequestCancelActivityTaskFailedEventAttributes: [['activityId', ''], ['cause', ''], ['decisionTaskCompletedEventId', '']],
  RequestCancelExternalWorkflowExecutionDecisionAttributes: [['domain', ''], ['workflowId', ''], ['runId', ''], ['control', 'b'], ['childWorkflowOnly', '']],
  RequestCancelExternalWorkflowExecutionFailedEventAttributes: [['cause', 'e:CancelExternalWorkflowExecutionFailedCause'], ['decisionTaskCompletedEventId', ''], ['domain', ''], ['workflowExecution', ''], ['initiatedEventId', ''], ['control', 'b']],
  RequestCancelExternalWorkflowExecutionInitiatedEventAttributes: [['decisionTaskCompletedEventId', ''], ['domain', ''], ['workflowExecution', ''], ['control', 'b'], ['childWorkflowOnly', '']],
  RequestCancelInfo: [['version', ''], ['initiatedEventBatchID', ''], ['cancelRequestID', '']],
  RequestCancelWorkflowExecutionRequest: [['domain', ''], ['workflowExecution', ''], ['identity', ''], ['requestId', ''], ['cause', ''], ['firstExecutionRunID', '']],
  ResendReplicationTasksRequest: [['domainID', ''], ['workflowID', ''], ['runID', ''], ['remoteCluster', ''], ['startEventID', ''], ['startVersion', ''], ['endEventID', ''], ['endVersion', '']],
  ResetPointInfo: [['binaryChecksum', ''], ['runId', ''], ['firstDecisionCompletedId', ''], ['createdTimeNano', ''], ['expiringTimeNano', ''], ['resettable', '']],
  ResetPoints: [['points', 'l']],
  ResetQueueRequest: [['shardID', ''], ['clusterName', ''], ['type', '']],
  ResetStickyTaskListRequest: [['domain', ''], ['execution', '']],
  ResetWorkflowExecutionRequest: [['domain', ''], ['workflowExecution', ''], ['reason', ''], ['decisionFinishEventId', ''], ['requestId', ''], ['skipSignalReapply', '']],
  ResetWorkflowExecutionResponse: [['runId', '']],
  RespondActivityTaskCanceledByIDRequest: [['domain', ''], ['workflowID', ''], ['runID', ''], ['activityID', ''], ['details', 'b'], ['identity', '']],
  RespondActivityTaskCanceledRequest: [['taskToken', 'b'], ['details', 'b'], ['identity', '']],
  RespondActivityTaskCompletedByIDRequest: [['domain', ''], ['workflowID', ''], ['runID', ''], ['activityID', ''], ['result', 'b'], ['identity', '']],
  RespondActivityTaskCompletedRequest: [['taskToken', 'b'], ['result', 'b'], ['identity', '']],
  RespondActivityTaskFailedByIDRequest: [['domain', ''], ['workflowID', ''], ['runID', ''], ['activityID', ''], ['reason', ''], ['details', 'b'], ['identity', '']],
  RespondActivityTaskFailedRequest: [['taskToken', 'b'], ['reason', ''], ['details', 'b'], ['identity', '']],
  RespondCrossClusterTasksCompletedRequest: [['shardID', ''], ['targetCluster', ''], ['taskResponses', 'l'], ['fetchNewTasks', '']],
  RespondCrossClusterTasksCompletedResponse: [['tasks', 'l']],
  RespondDecisionTaskCompletedRequest: [['taskToken', 'b'], ['decisions', 'l'], ['executionContext', 'b'], ['identity', ''], ['stickyAttributes', ''], ['returnNewDecisionTask', ''], ['forceCreateNewDecisionTask', ''], ['binaryChecksum', ''], ['queryResults', 'm']],
  RespondDecisionTaskCompletedResponse: [['decisionTask', ''], ['activitiesToDispatchLocally', 'm']],
  RespondDecisionTaskFailedRequest: [['taskToken', 'b'], ['cause', 'e:DecisionTaskFailedCause'], ['details', 'b'], ['identity', ''], ['binaryChecksum', '']],
  RespondQueryTaskCompletedRequest: [['taskToken', 'b'], ['completedType', 'e:QueryTaskCompletedType'], ['queryResult', 'b'], ['errorMessage', ''], ['workerVersionInfo', '']],
  RestartWorkflowExecutionRequest: [['domain', ''], ['workflowExecution', ''], ['reason', ''], ['identity', '']],
  RestartWorkflowExecutionResponse: [['runId', '']],
  RestoreDynamicConfigRequest: [['configName', ''], ['filters', 'l']],
  RetryPolicy: [['initialIntervalInSeconds', ''], ['backoffCoefficient', ''], ['maximumIntervalInSeconds', ''], ['maximumAttempts', ''], ['nonRetriableErrorReasons', 'l'], ['expirationIntervalInSeconds', '']],
  RetryTaskV2Error: [['message', ''], ['domainId', ''], ['workflowId', ''], ['runId', ''], ['startEventId', ''], ['startEventVersion', ''], ['endEventId', ''], ['endEventVersion', '']],
  RingInfo: [['role', ''], ['memberCount', ''], ['members', 'l']],
  ScanWorkflowActivityParams: [['domain', ''], ['workflowQuery', ''], ['nextPageToken', 'b'], ['pageSize', ''], ['samplingRate', '']],
  ScanWorkflowActivityResult: [['executions', 'l'], ['nextPageToken', 'b']],
  ScheduleActivityTaskDecisionAttributes: [['activityId', ''], ['activityType', ''], ['domain', ''], ['taskList', ''], ['input', 'b'], ['scheduleToCloseTimeoutSeconds', ''], ['scheduleToStartTimeoutSeconds', ''], ['startToCloseTimeoutSeconds', ''], ['heartbeatTimeoutSeconds', ''], ['retryPolicy', ''], ['header', ''], ['requestLocalDispatch', '']],
  ScheduleDecisionTaskRequest: [['domainUUID', ''], ['workflowExecution', ''], ['isFirstDecision', '']],
  SearchAttributes: [['indexedFields', 'm']],
  ServiceBusyError: [['message', ''], ['reason', '']],
  ShardInfo: [['stolenSinceRenew', ''], ['updatedAtNanos', ''], ['replicationAckLevel', ''], ['transferAckLevel', ''], ['timerAckLevelNanos', ''], ['domainNotificationVersion', ''], ['clusterTransferAckLevel', 'm'], ['clusterTimerAckLevel', 'm'], ['owner', ''], ['clusterReplicationLevel', 'm'], ['pendingFailoverMarkers', 'b'], ['pendingFailoverMarkersEncoding', ''], ['replicationDlqAckLevel', 'm'], ['transferProcessingQueueStates', 'b'], ['transferProcessingQueueStatesEncoding', ''], ['timerProcessingQueueStates', 'b'], ['timerProcessingQueueStatesEncoding', ''], ['crossClusterProcessingQueueStates', 'b'], ['crossClusterProcessingQueueStatesEncoding', ''], ['queueStates', 'm']],
  ShardOwnershipLostError: [['message', ''], ['owner', '']],
  SignalExternalWorkflowExecutionDecisionAttributes: [['domain', ''], ['execution', ''], ['signalName', ''], ['input', 'b'], ['control', 'b'], ['childWorkflowOnly', '']],
  SignalExternalWorkflowExecutionFailedEventAttributes: [['cause', 'e:SignalExternalWorkflowExecutionFailedCause'], ['decisionTaskCompletedEventId', ''], ['domain', ''], ['workflowExecution', ''], ['initiatedEventId', ''], ['control', 'b']],
  SignalExternalWorkflowExecutionInitiatedEventAttributes: [['decisionTaskCompletedEventId', ''], ['domain', ''], ['workflowExecution', ''], ['signalName', ''], ['input', 'b'], ['control', 'b'], ['childWorkflowOnly', '']],
  SignalInfo: [['version', ''], ['initiatedEventBatchID', ''], ['requestID', ''], ['name', ''], ['input', 'b'], ['control', 'b']],
  SignalWithStartWorkflowExecutionAsyncRequest: [['request', '']],
  SignalWithStartWorkflowExecutionRequest: [['domain', ''], ['workflowId', ''], ['workflowType', ''], ['taskList', ''], ['input', 'b'], ['executionStartToCloseTimeoutSeconds', ''], ['taskStartToCloseTimeoutSeconds', ''], ['identity', ''], ['requestId', ''], ['workflowIdReusePolicy', 'e:WorkflowIdReusePolicy'], ['signalName', ''], ['signalInput', 'b'], ['control', 'b'], ['retryPolicy', ''], ['cronSchedule', ''], ['memo', ''], ['searchAttributes', ''], ['header', ''], ['delayStartSeconds', ''], ['jitterStartSeconds', ''], ['firstRunAtTimestamp', ''], ['cronOverlapPolicy', 'e:CronOverlapPolicy'], ['activeClusterSelectionPolicy', '']],
  SignalWorkflowExecutionRequest: [['domain', ''], ['workflowExecution', ''], ['signalName', ''], ['input', 'b'], ['identity', ''], ['requestId', ''], ['control', 'b']],
  StartChildWorkflowExecutionDecisionAttributes: [['domain', ''], ['workflowId', ''], ['workflowType', ''], ['taskList', ''], ['input', 'b'], ['executionStartToCloseTimeoutSeconds', ''], ['taskStartToCloseTimeoutSeconds', ''], ['parentClosePolicy', 'e:ParentClosePolicy'], ['control', 'b'], ['workflowIdReusePolicy', 'e:WorkflowIdReusePolicy'], ['retryPolicy', ''], ['cronSchedule', ''], ['header', ''], ['memo', ''], ['searchAttributes', ''], ['cronOverlapPolicy', 'e:CronOverlapPolicy'], ['activeClusterSelectionPolicy', '']],
  StartChildWorkflowExecutionFailedEventAttributes: [['domain', ''], ['workflowId', ''], ['workflowType', ''], ['cause', 'e:ChildWorkflowExecutionFailedCause'], ['control', 'b'], ['initiatedEventId', ''], ['decisionTaskCompletedEventId', '']],
  StartChildWorkflowExecutionInitiatedEventAttributes: [['domain', ''], ['workflowId', ''], ['workflowType', ''], ['taskList', ''], ['input', 'b'], ['executionStartToCloseTimeoutSeconds', ''], ['taskStartToCloseTimeoutSeconds', ''], ['parentClosePolicy', 'e:ParentClosePolicy'], ['control', 'b'], ['decisionTaskCompletedEventId', ''], ['workflowIdReusePolicy', 'e:WorkflowIdReusePolicy'], ['retryPolicy', ''], ['cronSchedule', ''], ['header', ''], ['memo', ''], ['searchAttributes', ''], ['delayStartSeconds', ''], ['jitterStartSeconds', ''], ['firstRunAtTimestamp', ''], ['cronOverlapPolicy', 'e:CronOverlapPolicy'], ['activeClusterSelectionPolicy', '']],
  StartTimeFilter: [['earliestTime', ''], ['latestTime', '']],
  StartTimerDecisionAttributes: [['timerId', ''], ['startToFireTimeoutSeconds', '']],
  StartWorkflowExecutionAsyncRequest: [['request', '']],
  StartWorkflowExecutionRequest: [['domain', ''], ['workflowId', ''], ['workflowType', ''], ['taskList', ''], ['input', 'b'], ['executionStartToCloseTimeoutSeconds', ''], ['taskStartToCloseTimeoutSeconds', ''], ['identity', ''], ['requestId', ''], ['workflowIdReusePolicy', 'e:WorkflowIdReusePolicy'], ['retryPolicy', ''], ['cronSchedule', ''], ['memo', ''], ['searchAttributes', ''], ['header', ''], ['delayStartSeconds', ''], ['jitterStartSeconds', ''], ['firstRunAtTimestamp', ''], ['cronOverlapPolicy', 'e:CronOverlapPolicy'], ['activeClusterSelectionPolicy', '']],
  StartWorkflowExecutionResponse: [['runId', '']],
  StickyExecutionAttributes: [['workerTaskList', ''], ['scheduleToStartTimeoutSeconds', '']],
  StickyWorkerUnavailableError: [['message', '']],
  SupportedClientVersions: [['goSdk', ''], ['javaSdk', '']],
  SyncActivityRequest: [['domainId', ''], ['workflowId', ''], ['runId', ''], ['version', ''], ['scheduledId', ''], ['scheduledTime', ''], ['startedId', ''], ['startedTime', ''], ['lastHeartbeatTime', ''], ['details', 'b'], ['attempt', ''], ['lastFailureReason', ''], ['lastWorkerIdentity', ''], ['lastFailureDetails', 'b'], ['versionHistory', '']],
  SyncActivityTaskAttributes: [['domainId', ''], ['workflowId', ''], ['runId', ''], ['version', ''], ['scheduledId', ''], ['scheduledTime', ''], ['startedId', ''], ['startedTime', ''], ['lastHeartbeatTime', ''], ['details', 'b'], ['attempt', ''], ['lastFailureReason', ''], ['lastWorkerIdentity', ''], ['lastFailureDetails', 'b'], ['versionHistory', '']],
  SyncShardStatus: [['timestamp', '']],
  SyncShardStatusRequest: [['sourceCluster', ''], ['shardId', ''], ['timestamp', '']],
  SyncShardStatusTaskAttributes: [['sourceCluster', ''], ['shardId', ''], ['timestamp', '']],
  TaskIDBlock: [['startID', ''], ['endID', '']],
  TaskInfo: [['workflowID', ''], ['runID', 'b'], ['scheduleID', ''], ['expiryTimeNanos', ''], ['createdTimeNanos', ''], ['partitionConfig', 'm']],
  TaskKey: [['scheduledTimeNano', ''], ['taskID', '']],
  TaskList: [['name', ''], ['kind', 'e:TaskListKind']],
  TaskListInfo: [['kind', ''], ['ackLevel', ''], ['expiryTimeNanos', ''], ['lastUpdatedNanos', ''], ['adaptivePartitionConfig', '']],
  TaskListMetadata: [['maxTasksPerSecond', '']],
  TaskListNotOwnedByHostError: [['ownedByIdentity', ''], ['myIdentity', ''], ['tasklistName', '']],
  TaskListPartition: [['isolationGroups', 'l']],
  TaskListPartitionConfig: [['version', ''], ['numReadPartitions', ''], ['numWritePartitions', ''], ['readPartitions', 'm'], ['writePartitions', 'm']],
  TaskListPartitionMetadata: [['key', ''], ['ownerHostName', '']],
  TaskListStatus: [['backlogCountHint', ''], ['readLevel', ''], ['ackLevel', ''], ['ratePerSecond', ''], ['taskIDBlock', ''], ['isolationGroupMetrics', 'm'], ['newTasksPerSecond', ''], ['empty', '']],
  TaskRange: [['inclusiveMin', ''], ['exclusiveMax', '']],
  TerminateWorkflowExecutionRequest: [['domain', ''], ['workflowExecution', ''], ['reason', ''], ['details', 'b'], ['identity', ''], ['firstExecutionRunID', '']],
  TimerCanceledEventAttributes: [['timerId', ''], ['startedEventId', ''], ['decisionTaskCompletedEventId', ''], ['identity', '']],
  TimerFiredEventAttributes: [['timerId', ''], ['startedEventId', '']],
  TimerInfo: [['version', ''], ['startedID', ''], ['expiryTimeNanos', ''], ['taskID', '']],
  TimerStartedEventAttributes: [['timerId', ''], ['startToFireTimeoutSeconds', ''], ['decisionTaskCompletedEventId', '']],
  TimerTaskInfo: [['domainID', 'b'], ['workflowID', ''], ['runID', 'b'], ['taskType', ''], ['timeoutType', ''], ['version', ''], ['scheduleAttempt', ''], ['eventID', ''], ['taskList', '']],
  TransferTaskInfo: [['domainID', 'b'], ['workflowID', ''], ['runID', 'b'], ['taskType', ''], ['targetDomainID', 'b'], ['targetWorkflowID', ''], ['targetRunID', 'b'], ['taskList', ''], ['targetChildWorkflowOnly', ''], ['scheduleID', ''], ['version', ''], ['visibilityTimestampNanos', ''], ['targetDomainIDs', 'l'], ['originalTaskList', '']],
  TransientDecisionInfo: [['scheduledEvent', ''], ['startedEvent', '']],
  UpdateDomainAsyncWorkflowConfiguratonRequest: [['domain', ''], ['configuration', '']],
  UpdateDomainInfo: [['description', ''], ['ownerEmail', ''], ['data', 'm']],
  UpdateDomainIsolationGroupsRequest: [['domain', ''], ['isolationGroups', '']],
  UpdateDomainRequest: [['name', ''], ['updatedInfo', ''], ['configuration', ''], ['replicationConfiguration', ''], ['securityToken', ''], ['deleteBadBinary', ''], ['failoverTimeoutInSeconds', '']],
  UpdateDomainResponse: [['domainInfo', ''], ['configuration', ''], ['replicationConfiguration', ''], ['failoverVersion', ''], ['isGlobalDomain', '']],
  UpdateDynamicConfigRequest: [['configName', ''], ['configValues', 'l']],
  UpdateGlobalIsolationGroupsRequest: [['isolationGroups', '']],
  UpsertWorkflowSearchAttributesDecisionAttributes: [['searchAttributes', '']],
  UpsertWorkflowSearchAttributesEventAttributes: [['decisionTaskCompletedEventId', ''], ['searchAttributes', '']],
  VersionHistories: [['currentVersionHistoryIndex', ''], ['histories', 'l']],
  VersionHistory: [['branchToken', 'b'], ['items', 'l']],
  VersionHistoryItem: [['eventID', ''], ['version', '']],
  VirtualQueueState: [['virtualSliceStates', 'l']],
  VirtualSliceState: [['taskRange', ''], ['predicate', '']],
  WeightedRatelimitCalls: [['allowed', ''], ['rejected', '']],
  WeightedRatelimitQuotas: [['quotas', 'm']],
  WeightedRatelimitUsage: [['caller', ''], ['elapsedMS', ''], ['calls', 'm']],
  WeightedRatelimitUsageQuotaEntry: [['weight', ''], ['used', '']],
  WeightedRatelimitUsageQuotas: [['quotas', 'm']],
  WorkerVersionInfo: [['impl', ''], ['featureVersion', '']],
  WorkflowExecution: [['workflowId', ''], ['runId', '']],
  WorkflowExecutionAlreadyCompletedError: [['message', '']],
  WorkflowExecutionAlreadyStartedError: [['message', ''], ['startRequestId', ''], ['runId', '']],
  WorkflowExecutionCancelRequestedEventAttributes: [['cause', ''], ['externalInitiatedEventId', ''], ['externalWorkflowExecution', ''], ['identity', ''], ['requestId', '']],
  WorkflowExecutionCanceledEventAttributes: [['decisionTaskCompletedEventId', ''], ['details', 'b']],
  WorkflowExecutionCompletedEventAttributes: [['result', 'b'], ['decisionTaskCompletedEventId', '']],
  WorkflowExecutionConfiguration: [['taskList', ''], ['executionStartToCloseTimeoutSeconds', ''], ['taskStartToCloseTimeoutSeconds', '']],
  WorkflowExecutionContinuedAsNewEventAttributes: [['newExecutionRunId', ''], ['workflowType', ''], ['taskList', ''], ['input', 'b'], ['executionStartToCloseTimeoutSeconds', ''], ['taskStartToCloseTimeoutSeconds', ''], ['decisionTaskCompletedEventId', ''], ['backoffStartIntervalInSeconds', ''], ['initiator', 'e:ContinueAsNewInitiator'], ['failureReason', ''], ['failureDetails', 'b'], ['lastCompletionResult', 'b'], ['header', ''], ['memo', ''], ['searchAttributes', ''], ['cronOverlapPolicy', 'e:CronOverlapPolicy'], ['activeClusterSelectionPolicy', '']],
  WorkflowExecutionFailedEventAttributes: [['reason', ''], ['details', 'b'], ['decisionTaskCompletedEventId', '']],
  WorkflowExecutionFilter: [['workflowId', ''], ['runId', '']],
  WorkflowExecutionInfo: [['parentDomainID', 'b'], ['parentWorkflowID', ''], ['parentRunID', 'b'], ['initiatedID', ''], ['completionEventBatchID', ''], ['completionEvent', 'b'], ['completionEventEncoding', ''], ['taskList', ''], ['taskListKind', 'e:TaskListKind'], ['workflowTypeName', ''], ['workflowTimeoutSeconds', ''], ['decisionTaskTimeoutSeconds', ''], ['executionContext', 'b'], ['state', ''], ['closeStatus', ''], ['startVersion', ''], ['lastWriteEventID', ''], ['lastEventTaskID', ''], ['lastFirstEventID', ''], ['lastProcessedEvent', ''], ['startTimeNanos', ''], ['lastUpdatedTimeNanos', ''], ['decisionVersion', ''], ['decisionScheduleID', ''], ['decisionStartedID', ''], ['decisionTimeout', ''], ['decisionAttempt', ''], ['decisionStartedTimestampNanos', ''], ['decisionScheduledTimestampNanos', ''], ['cancelRequested', ''], ['decisionOriginalScheduledTimestampNanos', ''], ['createRequestID', ''], ['decisionRequestID', ''], ['cancelRequestID', ''], ['stickyTaskList', ''], ['stickyScheduleToStartTimeout', ''], ['retryAttempt', ''], ['retryInitialIntervalSeconds', ''], ['retryMaximumIntervalSeconds', ''], ['retryMaximumAttempts', ''], ['retryExpirationSeconds', ''], ['retryBackoffCoefficient', ''], ['retryExpirationTimeNanos', ''], ['retryNonRetryableErrors', 'l'], ['hasRetryPolicy', ''], ['cronSchedule', ''], ['eventStoreVersion', ''], ['eventBranchToken', 'b'], ['signalCount', ''], ['historySize', ''], ['clientLibraryVersion', ''], ['clientFeatureVersion', ''], ['clientImpl', ''], ['autoResetPoints', 'b'], ['autoResetPointsEncoding', ''], ['searchAttributes', 'm'], ['memo', 'm'], ['versionHistories', 'b'], ['versionHistoriesEncoding', ''], ['firstExecutionRunID', 'b'], ['partitionConfig', 'm'], ['checksum', 'b'], ['checksumEncoding', ''], ['cronOverlapPolicy', 'e:CronOverlapPolicy'], ['activeClusterSelectionPolicy', 'b'], ['activeClusterSelectionPolicyEncoding', '']],
  WorkflowExecutionSignaledEventAttributes: [['signalName', ''], ['input', 'b'], ['identity', ''], ['requestId', '']],
  WorkflowExecutionStartedEventAttributes: [['workflowType', ''], ['parentWorkflowDomain', ''], ['parentWorkflowExecution', ''], ['parentInitiatedEventId', ''], ['taskList', ''], ['input', 'b'], ['executionStartToCloseTimeoutSeconds', ''], ['taskStartToCloseTimeoutSeconds', ''], ['continuedExecutionRunId', ''], ['initiator', 'e:ContinueAsNewInitiator'], ['continuedFailureReason', ''], ['continuedFailureDetails', 'b'], ['lastCompletionResult', 'b'], ['originalExecutionRunId', ''], ['identity', ''], ['firstExecutionRunId', ''], ['firstScheduledTimeNano', ''], ['retryPolicy', ''], ['attempt', ''], ['expirationTimestamp', ''], ['cronSchedule', ''], ['firstDecisionTaskBackoffSeconds', ''], ['memo', ''], ['searchAttributes', ''], ['prevAutoResetPoints', ''], ['header', ''], ['partitionConfig', 'm'], ['requestId', ''], ['cronOverlapPolicy', 'e:CronOverlapPolicy'], ['activeClusterSelectionPolicy', '']],
  WorkflowExecutionTerminatedEventAttributes: [['reason', ''], ['details', 'b'], ['identity', '']],
  WorkflowExecutionTimedOutEventAttributes: [['timeoutType', 'e:TimeoutType']],
  WorkflowParams: [['domain', ''], ['taskList', ''], ['workflowQuery', ''], ['nextPageToken', 'b'], ['samplingRate', ''], ['shadowMode', 'e:Mode'], ['exitCondition', ''], ['concurrency', ''], ['lastRunResult', '']],
  WorkflowQuery: [['queryType', ''], ['queryArgs', 'b']],
  WorkflowQueryResult: [['resultType', 'e:QueryResultType'], ['answer', 'b'], ['errorMessage', '']],
  WorkflowResult: [['succeeded', ''], ['skipped', ''], ['failed', '']],
  WorkflowType: [['name', '']],
  WorkflowTypeFilter: [['name', '']],
};

/**
 * IDLStructGoStringFields — the Go %v / util-stringer field walk for an emitted IDL class
 * instance, restored from the .thrift declaration. Returns entries in thrift (= Go struct)
 * order: 'rendered' is set where the JS value has lost what Go prints — an unset
 * binary/list/map field's empty form ('[]', '[len=0]', 'map[]'), and an enum value's
 * member NAME (Go calls the enum's String(); a TS enum is a bare number). Unset
 * pointer-modeled fields are omitted, as Go's walk skips them. Returns undefined for
 * anything that is not a recognized IDL class instance — the caller keeps its own walk.
 */
export function IDLStructGoStringFields(
  obj: object,
): Array<{ name: string; value: unknown; rendered?: string }> | undefined {
  if (!Object.prototype.hasOwnProperty.call(obj, '_annotations')) {
    return undefined;
  }
  const cls = (obj as { constructor?: { name?: string } }).constructor?.name ?? '';
  const kinds = structStringerKinds[cls];
  if (kinds === undefined) {
    return undefined;
  }
  const rec = obj as Record<string, unknown>;
  const out: Array<{ name: string; value: unknown; rendered?: string }> = [];
  for (const [field, kind] of kinds) {
    const value = rec[field];
    const name = field.charAt(0).toUpperCase() + field.slice(1);
    if (value === null || value === undefined) {
      if (kind === 'b') {
        out.push({ name, value, rendered: '[]' });
      } else if (kind === 'l') {
        out.push({ name, value, rendered: '[len=0]' });
      } else if (kind === 'm') {
        out.push({ name, value, rendered: 'map[]' });
      }
      continue;
    }
    if (kind.startsWith('e:') && typeof value === 'number') {
      const members = enumValues[kind.slice(2)];
      const memberName = members === undefined
        ? undefined
        : Object.keys(members).find((k) => members[k] === value);
      if (memberName !== undefined) {
        out.push({ name, value, rendered: memberName });
        continue;
      }
    }
    out.push({ name, value });
  }
  return out;
}

function walkSpec(spec: string, v: unknown): unknown {
  if (v == null || spec === '') {
    return v;
  }
  if (spec === 'b') {
    return typeof v === 'string' ? Buffer.from(v, 'base64') : v;
  }
  if (spec.startsWith('e:')) {
    if (typeof v === 'string') {
      const mapped = enumValues[spec.slice(2)]?.[v];
      return mapped !== undefined ? mapped : v;
    }
    return v;
  }
  if (spec.startsWith('l:')) {
    return Array.isArray(v) ? v.map((x) => walkSpec(spec.slice(2), x)) : v;
  }
  if (spec.startsWith('m:')) {
    const sub = spec.slice(2);
    const out = new Map<unknown, unknown>();
    if (v instanceof Map) {
      v.forEach((val, key) => out.set(key, walkSpec(sub, val)));
      return out;
    }
    if (typeof v === 'object' && !Array.isArray(v)) {
      for (const [key, val] of Object.entries(v as Record<string, unknown>)) {
        out.set(key, walkSpec(sub, val));
      }
      return out;
    }
    return v;
  }
  if (spec.startsWith('s:')) {
    return DecodeThriftJSON(spec.slice(2), v);
  }
  return v;
}

/**
 * Decode a parsed-JSON value (or array of them) into constructor-ready args for the named
 * thrift struct. Pass the BARE type name ('HistoryEvent'); arrays map element-wise.
 *
 * The result type parameter defaults to 'any' on purpose: the walker is driven by a
 * runtime name, so it cannot prove a static type, and Go's json.Unmarshal fills a slot the
 * CALLER declared — the translated call site assigns into a typed variable the same way.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function DecodeThriftJSON<T = any>(structName: string, v: unknown): T {
  if (v == null) {
    return v as T;
  }
  if (Array.isArray(v)) {
    return v.map((x) => DecodeThriftJSON(structName, x)) as T;
  }
  const specs = fieldSpecs[structName];
  if (specs === undefined || typeof v !== 'object') {
    return v as T;
  }
  const src = v as Record<string, unknown>;
  const out: Record<string, unknown> = { ...src };
  for (const [field, spec] of Object.entries(specs)) {
    if (field in src) {
      out[field] = walkSpec(spec, src[field]);
    }
  }
  return out as T;
}

/**
 * EncodeThriftJSON — the lowering for Go's json.Marshal OF a thrift-generated value.
 * Go's generated MarshalJSON emits base64 strings for binary, plain numbers for i64, and
 * plain objects for maps; a bare JSON.stringify instead emits Buffer's {type,data} object
 * and Int64's {buffer} wrapper, which neither DecodeThriftJSON nor a Go reader accepts.
 * Purely value-driven (no struct name needed): Buffer -> base64, Int64-like -> number,
 * Map -> object, arrays element-wise, other objects walked with '_'-prefixed bookkeeping
 * keys and undefined fields dropped. Enum fields stay numeric — DecodeThriftJSON and Go's
 * UnmarshalJSON both accept the numeric form. Feed the result to JSON.stringify.
 */
export function EncodeThriftJSON(v: unknown): unknown {
  if (v == null) {
    return undefined;
  }
  if (Buffer.isBuffer(v)) {
    return v.toString('base64');
  }
  if (Array.isArray(v)) {
    return v.map(EncodeThriftJSON);
  }
  if (v instanceof Map) {
    const out: Record<string, unknown> = {};
    v.forEach((val, key) => {
      out[String(key)] = EncodeThriftJSON(val);
    });
    return out;
  }
  if (typeof v === 'object') {
    const maybeI64 = v as { buffer?: unknown; toNumber?: unknown };
    if (typeof maybeI64.toNumber === 'function' && Buffer.isBuffer(maybeI64.buffer)) {
      return (maybeI64.toNumber as () => number)();
    }
    const out: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(v as Record<string, unknown>)) {
      if (key.startsWith('_') || val === undefined) {
        continue;
      }
      const enc = EncodeThriftJSON(val);
      if (enc !== undefined) {
        out[key] = enc;
      }
    }
    return out;
  }
  return v;
}
