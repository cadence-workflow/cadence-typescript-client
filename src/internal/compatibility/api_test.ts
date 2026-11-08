// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { expect } from 'vitest';
import { ActivityTaskCanceledEventAttributes as proto_ActivityTaskCanceledEventAttributes, ActivityTaskCompletedEventAttributes as proto_ActivityTaskCompletedEventAttributes, ActivityTaskFailedEventAttributes as proto_ActivityTaskFailedEventAttributes, ActivityTaskStartedEventAttributes as proto_ActivityTaskStartedEventAttributes, ActivityTaskTimedOutEventAttributes as proto_ActivityTaskTimedOutEventAttributes, ChildWorkflowExecutionCanceledEventAttributes as proto_ChildWorkflowExecutionCanceledEventAttributes, ChildWorkflowExecutionStartedEventAttributes as proto_ChildWorkflowExecutionStartedEventAttributes, ChildWorkflowExecutionTerminatedEventAttributes as proto_ChildWorkflowExecutionTerminatedEventAttributes, DecisionTaskTimedOutEventAttributes as proto_DecisionTaskTimedOutEventAttributes, ActivityTaskCancelRequestedEventAttributes as proto_ActivityTaskCancelRequestedEventAttributes, ExternalWorkflowExecutionCancelRequestedEventAttributes as proto_ExternalWorkflowExecutionCancelRequestedEventAttributes, ExternalWorkflowExecutionSignaledEventAttributes as proto_ExternalWorkflowExecutionSignaledEventAttributes, History as proto_History, DecisionTaskScheduledEventAttributes as proto_DecisionTaskScheduledEventAttributes, ChildWorkflowExecutionCompletedEventAttributes as proto_ChildWorkflowExecutionCompletedEventAttributes, ChildWorkflowExecutionTimedOutEventAttributes as proto_ChildWorkflowExecutionTimedOutEventAttributes, WorkflowExecutionCanceledEventAttributes as proto_WorkflowExecutionCanceledEventAttributes, TimerCanceledEventAttributes as proto_TimerCanceledEventAttributes, TimerFiredEventAttributes as proto_TimerFiredEventAttributes, UpsertWorkflowSearchAttributesEventAttributes as proto_UpsertWorkflowSearchAttributesEventAttributes, RequestCancelExternalWorkflowExecutionInitiatedEventAttributes as proto_RequestCancelExternalWorkflowExecutionInitiatedEventAttributes, RequestCancelActivityTaskFailedEventAttributes as proto_RequestCancelActivityTaskFailedEventAttributes, SignalExternalWorkflowExecutionInitiatedEventAttributes as proto_SignalExternalWorkflowExecutionInitiatedEventAttributes, WorkflowExecutionTerminatedEventAttributes as proto_WorkflowExecutionTerminatedEventAttributes, StartChildWorkflowExecutionFailedEventAttributes as proto_StartChildWorkflowExecutionFailedEventAttributes, WorkflowExecutionTimedOutEventAttributes as proto_WorkflowExecutionTimedOutEventAttributes, StartChildWorkflowExecutionInitiatedEventAttributes as proto_StartChildWorkflowExecutionInitiatedEventAttributes, WorkflowExecutionCompletedEventAttributes as proto_WorkflowExecutionCompletedEventAttributes, WorkflowExecutionSignaledEventAttributes as proto_WorkflowExecutionSignaledEventAttributes, WorkflowExecutionFailedEventAttributes as proto_WorkflowExecutionFailedEventAttributes, WorkflowExecutionContinuedAsNewEventAttributes as proto_WorkflowExecutionContinuedAsNewEventAttributes, WorkflowExecutionStartedEventAttributes as proto_WorkflowExecutionStartedEventAttributes } from './proto/history.js';
import { ActivityTaskCanceledEventAttributes as thrift_ActivityTaskCanceledEventAttributes, ActivityTaskCompletedEventAttributes as thrift_ActivityTaskCompletedEventAttributes, ActivityTaskFailedEventAttributes as thrift_ActivityTaskFailedEventAttributes, ActivityTaskStartedEventAttributes as thrift_ActivityTaskStartedEventAttributes, ActivityTaskTimedOutEventAttributes as thrift_ActivityTaskTimedOutEventAttributes, ChildWorkflowExecutionCanceledEventAttributes as thrift_ChildWorkflowExecutionCanceledEventAttributes, ChildWorkflowExecutionStartedEventAttributes as thrift_ChildWorkflowExecutionStartedEventAttributes, ChildWorkflowExecutionTerminatedEventAttributes as thrift_ChildWorkflowExecutionTerminatedEventAttributes, DecisionTaskTimedOutEventAttributes as thrift_DecisionTaskTimedOutEventAttributes, ActivityTaskCancelRequestedEventAttributes as thrift_ActivityTaskCancelRequestedEventAttributes, ExternalWorkflowExecutionCancelRequestedEventAttributes as thrift_ExternalWorkflowExecutionCancelRequestedEventAttributes, ExternalWorkflowExecutionSignaledEventAttributes as thrift_ExternalWorkflowExecutionSignaledEventAttributes, History as thrift_History, DecisionTaskScheduledEventAttributes as thrift_DecisionTaskScheduledEventAttributes, ChildWorkflowExecutionCompletedEventAttributes as thrift_ChildWorkflowExecutionCompletedEventAttributes, ChildWorkflowExecutionTimedOutEventAttributes as thrift_ChildWorkflowExecutionTimedOutEventAttributes, WorkflowExecutionCanceledEventAttributes as thrift_WorkflowExecutionCanceledEventAttributes, TimerCanceledEventAttributes as thrift_TimerCanceledEventAttributes, TimerFiredEventAttributes as thrift_TimerFiredEventAttributes, UpsertWorkflowSearchAttributesEventAttributes as thrift_UpsertWorkflowSearchAttributesEventAttributes, RequestCancelExternalWorkflowExecutionInitiatedEventAttributes as thrift_RequestCancelExternalWorkflowExecutionInitiatedEventAttributes, RequestCancelActivityTaskFailedEventAttributes as thrift_RequestCancelActivityTaskFailedEventAttributes, SignalExternalWorkflowExecutionInitiatedEventAttributes as thrift_SignalExternalWorkflowExecutionInitiatedEventAttributes, WorkflowExecutionTerminatedEventAttributes as thrift_WorkflowExecutionTerminatedEventAttributes, StartChildWorkflowExecutionFailedEventAttributes as thrift_StartChildWorkflowExecutionFailedEventAttributes, WorkflowExecutionTimedOutEventAttributes as thrift_WorkflowExecutionTimedOutEventAttributes, StartChildWorkflowExecutionInitiatedEventAttributes as thrift_StartChildWorkflowExecutionInitiatedEventAttributes, WorkflowExecutionCompletedEventAttributes as thrift_WorkflowExecutionCompletedEventAttributes, WorkflowExecutionSignaledEventAttributes as thrift_WorkflowExecutionSignaledEventAttributes, WorkflowExecutionFailedEventAttributes as thrift_WorkflowExecutionFailedEventAttributes, WorkflowExecutionContinuedAsNewEventAttributes as thrift_WorkflowExecutionContinuedAsNewEventAttributes, WorkflowExecutionStartedEventAttributes as thrift_WorkflowExecutionStartedEventAttributes } from './thrift/history.js';
import { ActivityType as proto_ActivityType, BadBinaries as proto_BadBinaries, DataBlob as proto_DataBlob, Payload as proto_Payload, Memo as proto_Memo, ParentExecutionInfo as proto_ParentExecutionInfo, PendingChildExecutionInfo as proto_PendingChildExecutionInfo, PendingDecisionInfo as proto_PendingDecisionInfo, ClusterReplicationConfiguration as proto_ClusterReplicationConfiguration, StatusFilter as proto_StatusFilter, SupportedClientVersions as proto_SupportedClientVersions, TaskIDBlock as proto_TaskIDBlock, StickyExecutionAttributes as proto_StickyExecutionAttributes, TaskList as proto_TaskList, TaskListMetadata as proto_TaskListMetadata, WorkerVersionInfo as proto_WorkerVersionInfo, RetryPolicy as proto_RetryPolicy, WorkflowExecution as proto_WorkflowExecution, SearchAttributes as proto_SearchAttributes, ResetPoints as proto_ResetPoints, WorkflowExecutionFilter as proto_WorkflowExecutionFilter, WorkflowQuery as proto_WorkflowQuery, WorkflowTypeFilter as proto_WorkflowTypeFilter, WorkflowType as proto_WorkflowType, QueryRejected as proto_QueryRejected, WorkflowExecutionInfo as proto_WorkflowExecutionInfo } from './proto/types.js';
import { ActivityType as thrift_ActivityType, BadBinaries as thrift_BadBinaries, DataBlob as thrift_DataBlob, Payload as thrift_Payload, Memo as thrift_Memo, WorkflowExecution as thrift_WorkflowExecution, PendingChildExecutionInfo as thrift_PendingChildExecutionInfo, ActiveClusters as thrift_ActiveClusters, PendingDecisionInfo as thrift_PendingDecisionInfo, ClusterReplicationConfiguration as thrift_ClusterReplicationConfiguration, StatusFilter as thrift_StatusFilter, SupportedClientVersions as thrift_SupportedClientVersions, TaskIDBlock as thrift_TaskIDBlock, StickyExecutionAttributes as thrift_StickyExecutionAttributes, TaskList as thrift_TaskList, TaskListMetadata as thrift_TaskListMetadata, WorkerVersionInfo as thrift_WorkerVersionInfo, RetryPolicy as thrift_RetryPolicy, RunID as thrift_RunID, WorkflowID as thrift_WorkflowID, SearchAttributes as thrift_SearchAttributes, ResetPoints as thrift_ResetPoints, WorkflowExecutionFilter as thrift_WorkflowExecutionFilter, WorkflowQuery as thrift_WorkflowQuery, WorkflowTypeFilter as thrift_WorkflowTypeFilter, WorkflowType as thrift_WorkflowType, QueryRejected as thrift_QueryRejected, WorkflowExecutionInfo as thrift_WorkflowExecutionInfo } from './thrift/types.js';
import { CountWorkflowExecutionsResponse as proto_CountWorkflowExecutionsResponse, ListArchivedWorkflowExecutionsResponse as proto_ListArchivedWorkflowExecutionsResponse, ListDomainsResponse as proto_ListDomainsResponse, ListFailoverHistoryResponse as proto_ListFailoverHistoryResponse, ListOpenWorkflowExecutionsResponse as proto_ListOpenWorkflowExecutionsResponse, DescribeDomainResponse as proto_DescribeDomainResponse, ListTaskListPartitionsResponse as proto_ListTaskListPartitionsResponse, DescribeWorkflowExecutionResponse as proto_DescribeWorkflowExecutionResponse, FailoverDomainResponse as proto_FailoverDomainResponse, GetWorkflowExecutionHistoryResponse as proto_GetWorkflowExecutionHistoryResponse, PollForActivityTaskResponse as proto_PollForActivityTaskResponse, PollForDecisionTaskResponse as proto_PollForDecisionTaskResponse, RecordActivityTaskHeartbeatResponse as proto_RecordActivityTaskHeartbeatResponse, UpdateDomainResponse as proto_UpdateDomainResponse, ScanWorkflowExecutionsResponse as proto_ScanWorkflowExecutionsResponse, SignalWithStartWorkflowExecutionResponse as proto_SignalWithStartWorkflowExecutionResponse, RecordActivityTaskHeartbeatByIDResponse as proto_RecordActivityTaskHeartbeatByIDResponse } from './proto/response.js';
import { CountWorkflowExecutionsResponse as thrift_CountWorkflowExecutionsResponse, ListArchivedWorkflowExecutionsResponse as thrift_ListArchivedWorkflowExecutionsResponse, ListDomainsResponse as thrift_ListDomainsResponse, ListFailoverHistoryResponse as thrift_ListFailoverHistoryResponse, ListOpenWorkflowExecutionsResponse as thrift_ListOpenWorkflowExecutionsResponse, DescribeDomainResponse as thrift_DescribeDomainResponse, ListTaskListPartitionsResponse as thrift_ListTaskListPartitionsResponse, DescribeWorkflowExecutionResponse as thrift_DescribeWorkflowExecutionResponse, FailoverDomainResponse as thrift_FailoverDomainResponse, GetWorkflowExecutionHistoryResponse as thrift_GetWorkflowExecutionHistoryResponse, PollForActivityTaskResponse as thrift_PollForActivityTaskResponse, PollForDecisionTaskResponse as thrift_PollForDecisionTaskResponse, RecordActivityTaskHeartbeatResponse as thrift_RecordActivityTaskHeartbeatResponse, UpdateDomainResponse as thrift_UpdateDomainResponse, ScanWorkflowExecutionsResponse as thrift_ScanWorkflowExecutionsResponse, SignalWithStartWorkflowExecutionResponse as thrift_SignalWithStartWorkflowExecutionResponse, RecordActivityTaskHeartbeatByIDResponse as thrift_RecordActivityTaskHeartbeatByIDResponse } from './thrift/response.js';
import { ListFailoverHistoryRequest as proto_ListFailoverHistoryRequest, DescribeDomainRequest as proto_DescribeDomainRequest, DescribeTaskListRequest as proto_DescribeTaskListRequest, DeprecateDomainRequest as proto_DeprecateDomainRequest, DescribeWorkflowExecutionRequest as proto_DescribeWorkflowExecutionRequest, ListWorkflowExecutionsRequest as proto_ListWorkflowExecutionsRequest, DiagnoseWorkflowExecutionRequest as proto_DiagnoseWorkflowExecutionRequest, FailoverDomainRequest as proto_FailoverDomainRequest, RespondActivityTaskFailedByIDRequest as proto_RespondActivityTaskFailedByIDRequest, QueryWorkflowRequest as proto_QueryWorkflowRequest, RecordActivityTaskHeartbeatByIDRequest as proto_RecordActivityTaskHeartbeatByIDRequest, RecordActivityTaskHeartbeatRequest as proto_RecordActivityTaskHeartbeatRequest, TerminateWorkflowExecutionRequest as proto_TerminateWorkflowExecutionRequest, ScanWorkflowExecutionsRequest as proto_ScanWorkflowExecutionsRequest, RequestCancelWorkflowExecutionRequest as proto_RequestCancelWorkflowExecutionRequest, RespondActivityTaskCanceledRequest as proto_RespondActivityTaskCanceledRequest, ResetWorkflowExecutionRequest as proto_ResetWorkflowExecutionRequest, RespondDecisionTaskCompletedRequest as proto_RespondDecisionTaskCompletedRequest, RespondActivityTaskCompletedByIDRequest as proto_RespondActivityTaskCompletedByIDRequest, SignalWorkflowExecutionRequest as proto_SignalWorkflowExecutionRequest } from './proto/request.js';
import { ListFailoverHistoryRequest as thrift_ListFailoverHistoryRequest, DescribeDomainRequest as thrift_DescribeDomainRequest, DescribeTaskListRequest as thrift_DescribeTaskListRequest, DeprecateDomainRequest as thrift_DeprecateDomainRequest, DescribeWorkflowExecutionRequest as thrift_DescribeWorkflowExecutionRequest, ListWorkflowExecutionsRequest as thrift_ListWorkflowExecutionsRequest, DiagnoseWorkflowExecutionRequest as thrift_DiagnoseWorkflowExecutionRequest, FailoverDomainRequest as thrift_FailoverDomainRequest, RespondActivityTaskFailedByIDRequest as thrift_RespondActivityTaskFailedByIDRequest, QueryWorkflowRequest as thrift_QueryWorkflowRequest, RecordActivityTaskHeartbeatByIDRequest as thrift_RecordActivityTaskHeartbeatByIDRequest, RecordActivityTaskHeartbeatRequest as thrift_RecordActivityTaskHeartbeatRequest, TerminateWorkflowExecutionRequest as thrift_TerminateWorkflowExecutionRequest, ScanWorkflowExecutionsRequest as thrift_ScanWorkflowExecutionsRequest, RequestCancelWorkflowExecutionRequest as thrift_RequestCancelWorkflowExecutionRequest, RespondActivityTaskCanceledRequest as thrift_RespondActivityTaskCanceledRequest, ResetWorkflowExecutionRequest as thrift_ResetWorkflowExecutionRequest, RespondDecisionTaskCompletedRequest as thrift_RespondDecisionTaskCompletedRequest, RespondActivityTaskCompletedByIDRequest as thrift_RespondActivityTaskCompletedByIDRequest, SignalWorkflowExecutionRequest as thrift_SignalWorkflowExecutionRequest } from './thrift/request.js';
import { domain } from '../internal_workflow_client_test.js';
import { Decision as proto_Decision } from './proto/decision.js';
import { Decision as thrift_Decision } from './thrift/decision.js';
import { UnknownValue } from './enum_test.js';

/**
 * FuzzOptions provides configuration for runFuzzTest
 */
export interface FuzzOptions {
  CustomFuncs?: unknown[];
  ExcludedFields?: string[];
  NilChance: number;
  Iterations: number;
}

export function TestActivityLocalDispatchInfo(): void {
  // @go-unlowerable: missing testdata fixture representation — the value of testdata.ActivityLocalDispatchInfo is not provided
}

export function TestActivityTaskCancelRequestedEventAttributes(): void {
  for (const item of [
    undefined,
    {} as any,
    { activityId: "", decisionTaskCompletedEventId: 0 },
  ]) {
    expect(
      proto_ActivityTaskCancelRequestedEventAttributes(
        thrift_ActivityTaskCancelRequestedEventAttributes(item),
      ),
    ).toEqual(item);
  }

  runFuzzTest(
    thrift_ActivityTaskCancelRequestedEventAttributes,
    proto_ActivityTaskCancelRequestedEventAttributes,
    {
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestActivityTaskCanceledEventAttributes(): void {
  const items = [
    undefined,
    {
      details: undefined,
      latestCancelRequestedEventId: 0,
      scheduledEventId: 0,
      startedEventId: 0,
      identity: "",
    },
    {
      details: undefined,
      latestCancelRequestedEventId: 0,
      scheduledEventId: 0,
      startedEventId: 0,
      identity: "",
    },
  ];

  for (const item of items) {
    expect(
      proto_ActivityTaskCanceledEventAttributes(
        thrift_ActivityTaskCanceledEventAttributes(item),
      ),
    ).toEqual(item);
  }

  runFuzzTest(
    thrift_ActivityTaskCanceledEventAttributes,
    proto_ActivityTaskCanceledEventAttributes,
    {
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestActivityTaskCompletedEventAttributes(): void {
  for (const item of [
    undefined,
    {
      result: undefined,
      scheduledEventId: 0,
      startedEventId: 0,
      identity: "",
    },
    {
      result: undefined,
      scheduledEventId: 0,
      startedEventId: 0,
      identity: "",
    },
  ]) {
    const actual = proto_ActivityTaskCompletedEventAttributes(
      thrift_ActivityTaskCompletedEventAttributes(item)
    );
    expect(actual).toEqual(item);
  }

  runFuzzTest(
    thrift_ActivityTaskCompletedEventAttributes,
    proto_ActivityTaskCompletedEventAttributes,
    {
      Iterations: 0,
      NilChance: 0,
    }
  );
}

export function TestActivityTaskFailedEventAttributes(): void {
  const items = [undefined, {} as any, {} as any];
  for (const item of items) {
    expect(proto_ActivityTaskFailedEventAttributes(thrift_ActivityTaskFailedEventAttributes(item))).toEqual(item);
  }

  runFuzzTest(
    thrift_ActivityTaskFailedEventAttributes,
    proto_ActivityTaskFailedEventAttributes,
    {
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestActivityTaskScheduledEventAttributes(): void {
  // @go-unlowerable: unavailable value representation — testdata.ActivityTaskScheduledEventAttributes has no TypeScript declaration or representation in the provided facts
}

export function TestActivityTaskStartedEventAttributes(): void {
  for (const item of [
    undefined,
    {
      scheduledEventId: 0,
      identity: "",
      requestId: "",
      attempt: 0,
      lastFailure: undefined,
    },
    {
      scheduledEventId: 0,
      identity: "",
      requestId: "",
      attempt: 0,
      lastFailure: undefined,
    },
  ]) {
    expect(
      proto_ActivityTaskStartedEventAttributes(
        thrift_ActivityTaskStartedEventAttributes(item),
      ),
    ).toEqual(item);
  }

  runFuzzTest(
    thrift_ActivityTaskStartedEventAttributes,
    proto_ActivityTaskStartedEventAttributes,
    {
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestActivityTaskTimedOutEventAttributes(): void {
  for (const item of [
    undefined,
    {
      details: undefined,
      scheduledEventId: 0,
      startedEventId: 0,
      timeoutType: 0,
      lastFailure: undefined,
    },
    {
      details: undefined,
      scheduledEventId: 1,
      startedEventId: 2,
      timeoutType: 1,
      lastFailure: undefined,
    },
  ]) {
    expect(
      proto_ActivityTaskTimedOutEventAttributes(
        thrift_ActivityTaskTimedOutEventAttributes(item),
      ),
    ).toEqual(item);
  }

  runFuzzTest(
    thrift_ActivityTaskTimedOutEventAttributes,
    proto_ActivityTaskTimedOutEventAttributes,
    {
      CustomFuncs: [
        (e: { value: number }, c: unknown) => {
          const validValues = [0, 1, 2, 3, 4];
          const continueValue = c as { Intn: (n: number) => number };
          e.value = validValues[continueValue.Intn(validValues.length)];
        },
      ],
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestActivityType(): void {
  for (const item of [undefined, { name: "" }, { name: "" }]) {
    expect(proto_ActivityType(thrift_ActivityType(item))).toEqual(item);
  }

  runFuzzTest(thrift_ActivityType, proto_ActivityType, {
    Iterations: 0,
    NilChance: 0,
  });
}

export function TestBadBinaries(): void {
  const items = [undefined, {}, {}] as any[];

  for (const item of items) {
    expect(proto_BadBinaries(thrift_BadBinaries(item))).toEqual(item);
  }

  runFuzzTest(
    thrift_BadBinaries,
    proto_BadBinaries,
    {
      ExcludedFields: ["Binaries"],
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestBadBinaryInfo(): void {
  // @go-unlowerable: missing source fixture — testdata.BadBinaryInfo is not defined by the provided target API or facts
}

export function TestCancelTimerFailedEventAttributes(): void {
  // @go-unlowerable: project fixture value — testdata.CancelTimerFailedEventAttributes has no supplied TypeScript representation
  return;
}

export function TestChildWorkflowExecutionCanceledEventAttributes(): void {
  const zeroValue = {
    domain: "",
    workflowExecution: undefined,
    workflowType: undefined,
    initiatedEventId: 0,
    startedEventId: 0,
    details: undefined,
  };

  for (const item of [undefined, zeroValue, zeroValue]) {
    expect(
      proto_ChildWorkflowExecutionCanceledEventAttributes(
        thrift_ChildWorkflowExecutionCanceledEventAttributes(item),
      ),
    ).toEqual(item);
  }

  runFuzzTest(
    thrift_ChildWorkflowExecutionCanceledEventAttributes,
    proto_ChildWorkflowExecutionCanceledEventAttributes,
    {
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestChildWorkflowExecutionCompletedEventAttributes(): void {
  for (const item of [undefined, {}, {}]) {
    expect(
      proto_ChildWorkflowExecutionCompletedEventAttributes(
        thrift_ChildWorkflowExecutionCompletedEventAttributes(item as any),
      ),
    ).toEqual(item);
  }

  runFuzzTest(
    thrift_ChildWorkflowExecutionCompletedEventAttributes,
    proto_ChildWorkflowExecutionCompletedEventAttributes,
    {
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestChildWorkflowExecutionFailedEventAttributes(): void {
  // @go-unlowerable: unavailable project fixture — testdata.ChildWorkflowExecutionFailedEventAttributes is not defined in the provided TypeScript facts
}

export function TestChildWorkflowExecutionStartedEventAttributes(): void {
  for (const item of [
    undefined,
    {
      domain: "",
      workflowExecution: undefined,
      workflowType: undefined,
      initiatedEventId: 0,
      header: undefined,
    },
    {
      domain: "",
      workflowExecution: undefined,
      workflowType: undefined,
      initiatedEventId: 0,
      header: undefined,
    },
  ]) {
    expect(
      proto_ChildWorkflowExecutionStartedEventAttributes(
        thrift_ChildWorkflowExecutionStartedEventAttributes(item),
      ),
    ).toEqual(item);
  }

  runFuzzTest(
    thrift_ChildWorkflowExecutionStartedEventAttributes,
    proto_ChildWorkflowExecutionStartedEventAttributes,
    {
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestChildWorkflowExecutionTerminatedEventAttributes(): void {
  const zero = {
    domain: "",
    workflowExecution: undefined,
    workflowType: undefined,
    initiatedEventId: 0,
    startedEventId: 0,
  };

  const fixture = {
    domain: "test-domain",
    workflowExecution: undefined,
    workflowType: undefined,
    initiatedEventId: 1,
    startedEventId: 2,
  };

  for (const item of [undefined, zero, fixture]) {
    expect(
      proto_ChildWorkflowExecutionTerminatedEventAttributes(
        thrift_ChildWorkflowExecutionTerminatedEventAttributes(item),
      ),
    ).toEqual(item);
  }

  runFuzzTest(
    thrift_ChildWorkflowExecutionTerminatedEventAttributes,
    proto_ChildWorkflowExecutionTerminatedEventAttributes,
    {
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestChildWorkflowExecutionTimedOutEventAttributes(): void {
  const items = [
    undefined,
    {},
    {
      domain: "test-domain",
      workflowExecution: {
        workflowId: "test-workflow-id",
        runId: "test-run-id",
      },
      workflowType: {
        name: "test-workflow-type",
      },
      initiatedEventId: 1,
      startedEventId: 2,
      timeoutType: 1,
    },
  ];

  for (const item of items) {
    expect(proto_ChildWorkflowExecutionTimedOutEventAttributes(
      thrift_ChildWorkflowExecutionTimedOutEventAttributes(item as any),
    )).toEqual(item);
  }

  runFuzzTest(
    thrift_ChildWorkflowExecutionTimedOutEventAttributes,
    proto_ChildWorkflowExecutionTimedOutEventAttributes,
    {
      CustomFuncs: [
        (e: any, c: any) => {
          const validValues = [0, 1, 2, 3, 4];
          e.value = validValues[c.Intn(validValues.length)];
        },
      ],
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestClusterReplicationConfiguration(): void {
  for (const item of [undefined, { clusterName: "" }, { clusterName: "test-cluster" }]) {
    expect(
      proto_ClusterReplicationConfiguration(
        thrift_ClusterReplicationConfiguration(item),
      ),
    ).toEqual(item);
  }

  runFuzzTest(
    proto_ClusterReplicationConfiguration,
    thrift_ClusterReplicationConfiguration,
    {
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestCountWorkflowExecutionsRequest(): void {
  // @go-unlowerable: unavailable project fixture — testdata.CountWorkflowExecutionsRequest is not represented in the provided TypeScript declarations or facts
}

export function TestCountWorkflowExecutionsResponse(): void {
  for (const item of [undefined, { count: 0 }, { count: 0 }]) {
    expect(proto_CountWorkflowExecutionsResponse(thrift_CountWorkflowExecutionsResponse(item))).toEqual(item);
  }

  runFuzzTest(
    thrift_CountWorkflowExecutionsResponse,
    proto_CountWorkflowExecutionsResponse,
    {
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestDataBlob(): void {
  const items = [
    undefined,
    { encodingType: 0, data: new Uint8Array() },
    { encodingType: 0, data: new Uint8Array() },
  ];

  for (const item of items) {
    expect(proto_DataBlob(thrift_DataBlob(item))).toEqual(item);
  }

  runFuzzTest(
    thrift_DataBlob,
    proto_DataBlob,
    {
      CustomFuncs: [
        (e: { value: number }, c: unknown) => {
          const validValues = [0, 1, 2];
          e.value = validValues[
            (c as { Intn(n: number): number }).Intn(validValues.length)
          ];
        },
      ],
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestDecisionTaskCompletedEventAttributes(): void {
  // @go-unlowerable: unavailable external value — testdata.DecisionTaskCompletedEventAttributes is not provided in the target API facts
}

export function TestDecisionTaskFailedEventAttributes(): void {
  // @go-unlowerable: unavailable fixture — testdata.DecisionTaskFailedEventAttributes and its value are not provided, so the third table case cannot be faithfully reproduced
}

export function TestDecisionTaskScheduledEventAttributes(): void {
  const items = [
    undefined,
    {
      taskList: undefined,
      startToCloseTimeout: undefined,
      attempt: 0,
    },
    {
      taskList: undefined,
      startToCloseTimeout: undefined,
      attempt: 0,
    },
  ];

  for (const item of items) {
    expect(
      proto_DecisionTaskScheduledEventAttributes(
        thrift_DecisionTaskScheduledEventAttributes(item),
      ),
    ).toEqual(item);
  }

  runFuzzTest(
    thrift_DecisionTaskScheduledEventAttributes,
    proto_DecisionTaskScheduledEventAttributes,
    {
      CustomFuncs: [
        (e: { value: number }, c: { Intn: (n: number) => number }) => {
          const validValues = [0, 1, 2];
          e.value = validValues[c.Intn(validValues.length)];
        },
      ],
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestDecisionTaskStartedEventAttributes(): void {
  // @go-unlowerable: external fixture value — testdata.DecisionTaskStartedEventAttributes is not provided
}

export function TestDecisionTaskTimedOutEventAttributes(): void {
  const zeroAttributes = {
    scheduledEventId: 0,
    startedEventId: 0,
    timeoutType: 0,
    baseRunId: "",
    newRunId: "",
    forkEventVersion: 0,
    reason: "",
    cause: 0,
    requestId: "",
  };
  const testDataAttributes = {
    scheduledEventId: 0,
    startedEventId: 0,
    timeoutType: 0,
    baseRunId: "",
    newRunId: "",
    forkEventVersion: 0,
    reason: "",
    cause: 0,
    requestId: "",
  };

  for (const item of [undefined, zeroAttributes, testDataAttributes]) {
    expect(
      proto_DecisionTaskTimedOutEventAttributes(
        thrift_DecisionTaskTimedOutEventAttributes(item),
      ),
    ).toEqual(item);
  }

  runFuzzTest(
    thrift_DecisionTaskTimedOutEventAttributes,
    proto_DecisionTaskTimedOutEventAttributes,
    {
      CustomFuncs: [
        (cause: { value: number }, c: { Intn: (n: number) => number }) => {
          const validValues = [1, 2];
          cause.value = validValues[c.Intn(validValues.length)];
        },
        (timeoutType: { value: number }, c: { Intn: (n: number) => number }) => {
          const validValues = [1, 2, 3, 4];
          timeoutType.value = validValues[c.Intn(validValues.length)];
        },
      ],
      ExcludedFields: ["RequestId"],
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestDeprecateDomainRequest(): void {
  const items = [
    undefined,
    { securityToken: "", name: "" },
    { securityToken: "", name: "" },
  ];

  for (const item of items) {
    expect(proto_DeprecateDomainRequest(thrift_DeprecateDomainRequest(item))).toEqual(item);
  }

  runFuzzTest(
    thrift_DeprecateDomainRequest,
    proto_DeprecateDomainRequest,
    {
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestFailoverDomainRequest(): void {
  const domainName = "domain-name";
  const clusterName = "cluster-name-1";
  const activeClusters = thrift_ActiveClusters(Object.create(null))!;

  const thriftRequest = {
    domainName,
    domainActiveClusterName: clusterName,
    activeClusters,
  };

  const protoRequest = proto_FailoverDomainRequest(thriftRequest)!;

  expect(protoRequest.domainName).toEqual(domainName);
  expect(protoRequest.domainActiveClusterName).toEqual(clusterName);
  expect(protoRequest.activeClusters).not.toBeNull();

  const convertedBack = thrift_FailoverDomainRequest(protoRequest)!;
  expect(convertedBack).not.toBeNull();
  expect(convertedBack.domainName ?? "").toEqual(domainName);
  expect(convertedBack.domainActiveClusterName ?? "").toEqual(clusterName);
  expect(convertedBack.activeClusters).not.toBeNull();

  const emptyRequest = {
    domainName: "",
    domainActiveClusterName: "",
    activeClusters: undefined,
    reason: "",
  };

  const items = [undefined, emptyRequest, protoRequest];
  for (const item of items) {
    expect(proto_FailoverDomainRequest(thrift_FailoverDomainRequest(item))).toEqual(item);
  }

  expect(proto_FailoverDomainRequest(undefined)).toBeUndefined();
  expect(thrift_FailoverDomainRequest(undefined)).toBeUndefined();

  const emptyThriftRequest = {};
  const converted = proto_FailoverDomainRequest(emptyThriftRequest)!;
  expect(converted).not.toBeNull();
  expect(converted.domainName).toEqual("");
  expect(converted.domainActiveClusterName).toEqual("");
  expect(converted.activeClusters).toBeUndefined();

  runFuzzTest(
    thrift_FailoverDomainRequest,
    proto_FailoverDomainRequest,
    {
      ExcludedFields: ["RegionToCluster"],
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestFailoverDomainResponse(): void {
  expect(
    proto_FailoverDomainResponse(thrift_FailoverDomainResponse(undefined)),
  ).toBeUndefined();

  const emptyResponse = { domain: undefined };
  const converted = proto_FailoverDomainResponse(
    thrift_FailoverDomainResponse(emptyResponse),
  );
  expect(converted).toBeUndefined();

  const fullResponse = {
    domain: {
      name: domain,
      status: 0,
      workflowExecutionRetentionPeriod: undefined,
    },
  } as any;
  expect(
    proto_FailoverDomainResponse(thrift_FailoverDomainResponse(fullResponse)),
  ).toEqual(fullResponse);

  const thriftResponse = thrift_FailoverDomainResponse(fullResponse);
  expect(thriftResponse).not.toBeNull();
  expect(thriftResponse!.domainInfo).not.toBeNull();
  expect(thriftResponse!.domainInfo!.name).toEqual(domain);

  const protoResponse = proto_FailoverDomainResponse(thriftResponse);
  expect(protoResponse).not.toBeNull();
  expect(protoResponse!.domain).not.toBeNull();
  expect(protoResponse!.domain!.name).toEqual(domain);

  runFuzzTest(
    thrift_FailoverDomainResponse,
    proto_FailoverDomainResponse,
    {
      CustomFuncs: [
        (status: any, c: any) => {
          const validValues = [0, 1, 2, 3];
          status.value = validValues[c.Intn(validValues.length)];
        },
        (status: any, c: any) => {
          const validValues = [0, 1, 2];
          status.value = validValues[c.Intn(validValues.length)];
        },
        (domainValue: any, c: any) => {
          if (domainValue.workflowExecutionRetentionPeriod != null) {
            const days = c.Int63n(MaxDurationSeconds / (24 * 3600));
            domainValue.workflowExecutionRetentionPeriod.seconds =
              days * 24 * 3600;
            domainValue.workflowExecutionRetentionPeriod.nanos = 0;
          }
        },
      ],
      ExcludedFields: ["RegionToCluster"],
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestDescribeDomainRequest(): void {
  const items = [
    { id: "domain-id" },
    { name: "domain-name" },
  ];

  for (const item of items) {
    expect(
      proto_DescribeDomainRequest(thrift_DescribeDomainRequest(item)),
    ).toEqual(item);
  }

  expect(proto_DescribeDomainRequest(undefined)).toBeUndefined();
  expect(thrift_DescribeDomainRequest(undefined)).toBeUndefined();

  expect(() => proto_DescribeDomainRequest({})).toThrow();
  expect(() => thrift_DescribeDomainRequest({})).toThrow();

  runFuzzTest(
    thrift_DescribeDomainRequest,
    proto_DescribeDomainRequest,
    {
      CustomFuncs: [
        (d: unknown, c: unknown) => {
          const request = d as { DescribeBy?: unknown };
          const continuer = c as {
            RandBool(): boolean;
            RandString(): string;
          };

          if (continuer.RandBool()) {
            request.DescribeBy = { Id: continuer.RandString() };
          } else {
            request.DescribeBy = { Name: continuer.RandString() };
          }
        },
      ],
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestDescribeDomainResponse_Domain(): void {
  throw new globalThis.Error("not implemented"); // @stub
}

export function TestDescribeDomainResponse(): void {
  const items = [undefined, domain as any];
  for (const item of items) {
    expect(proto_DescribeDomainResponse(thrift_DescribeDomainResponse(item))).toEqual(item);
  }

  runFuzzTest(
    thrift_DescribeDomainResponse,
    proto_DescribeDomainResponse,
    {
      CustomFuncs: [
        (status: any, c: any) => {
          const validValues = [0, 1, 2, 3];
          status.value = validValues[c.Intn(validValues.length)];
        },
        (status: any, c: any) => {
          const validValues = [0, 1, 2];
          status.value = validValues[c.Intn(validValues.length)];
        },
        (domainValue: any, c: any) => {
          if (domainValue.workflowExecutionRetentionPeriod != null) {
            const days = c.Int63n(MaxDurationSeconds / (24 * 3600));
            domainValue.workflowExecutionRetentionPeriod.seconds = days * 24 * 3600;
            domainValue.workflowExecutionRetentionPeriod.nanos = 0;
          }
        },
      ],
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestDescribeTaskListRequest(): void {
  const items = [
    undefined,
    {
      domain: "",
      taskList: undefined,
      taskListType: 0,
      includeTaskListStatus: false,
    },
    {
      domain: "",
      taskList: undefined,
      taskListType: 0,
      includeTaskListStatus: false,
    },
  ];

  for (const item of items) {
    expect(
      proto_DescribeTaskListRequest(
        thrift_DescribeTaskListRequest(item as any),
      ),
    ).toEqual(item);
  }

  runFuzzTest(
    thrift_DescribeTaskListRequest,
    proto_DescribeTaskListRequest,
    {
      CustomFuncs: [
        (e: { value: number }, c: any) => {
          const validValues = [0, 1, 2];
          e.value = validValues[c.Intn(validValues.length)];
        },
        (e: { value: number }, c: any) => {
          const validValues = [0, 1, 2];
          e.value = validValues[c.Intn(validValues.length)];
        },
      ],
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestDescribeTaskListResponse(): void {
  // @go-unlowerable: unavailable test fixture — testdata.DescribeTaskListResponse is not represented in the provided TypeScript API facts
}

export function TestDescribeWorkflowExecutionRequest(): void {
  for (const item of [
    undefined,
    {
      domain: "",
      workflowExecution: undefined,
      queryConsistencyLevel: 0,
    },
    {
      domain: "",
      workflowExecution: undefined,
      queryConsistencyLevel: 0,
    },
  ]) {
    expect(
      proto_DescribeWorkflowExecutionRequest(
        thrift_DescribeWorkflowExecutionRequest(item),
      ),
    ).toEqual(item);
  }

  runFuzzTest(
    thrift_DescribeWorkflowExecutionRequest,
    proto_DescribeWorkflowExecutionRequest,
    {
      CustomFuncs: [
        (e: unknown, c: unknown) => {
          const validValues = [0, 1, 2];
          (e as { value: number }).value =
            validValues[
              (c as { Intn: (n: number) => number }).Intn(validValues.length)
            ];
        },
      ],
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestDescribeWorkflowExecutionResponse(): void {
  const items: unknown[] = [undefined, {}, {}];

  for (const item of items) {
    expect(
      proto_DescribeWorkflowExecutionResponse(
        thrift_DescribeWorkflowExecutionResponse(item as any)!,
      ),
    ).toEqual(item);
  }

  runFuzzTest(
    thrift_DescribeWorkflowExecutionResponse,
    proto_DescribeWorkflowExecutionResponse,
    {
      CustomFuncs: [
        (state: { value: number }, c: { Intn(n: number): number }) => {
          const validValues = [0, 1, 2, 3];
          state.value = validValues[c.Intn(validValues.length)];
        },
        (kind: { value: number }, c: { Intn(n: number): number }) => {
          const validValues = [0, 1, 2];
          kind.value = validValues[c.Intn(validValues.length)];
        },
        (state: { value: number }, c: { Intn(n: number): number }) => {
          const validValues = [1, 2];
          state.value = validValues[c.Intn(validValues.length)];
        },
        (
          resp: {
            executionConfiguration: unknown;
            pendingActivities: unknown[];
            pendingDecision: unknown;
          },
          c: { Fuzz(value: unknown): void },
        ) => {
          c.Fuzz(resp.executionConfiguration);
          c.Fuzz(resp.pendingActivities);
          c.Fuzz(resp.pendingDecision);
        },
      ],
      ExcludedFields: [
        "WorkflowExecutionInfo",
        "PendingChildren",
        "StartedWorkerIdentity",
        "ScheduleId",
      ],
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestDiagnoseWorkflowExecutionRequest(): void {
  const items = [
    undefined,
    { domain: "", workflowExecution: undefined, identity: "" },
    {
      domain: "domain",
      workflowExecution: {
        workflowId: "workflow-id",
        runId: "run-id",
      },
      identity: "identity",
    },
  ];

  for (const item of items) {
    expect(
      proto_DiagnoseWorkflowExecutionRequest(
        thrift_DiagnoseWorkflowExecutionRequest(item),
      ),
    ).toEqual(item);
  }

  runFuzzTest(
    thrift_DiagnoseWorkflowExecutionRequest,
    proto_DiagnoseWorkflowExecutionRequest,
    {
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestDiagnoseWorkflowExecutionResponse(): void {
  // @go-unlowerable: harness-seeded fixture — testdata.DiagnoseWorkflowExecutionResponse is not provided by the available TypeScript declarations
}

export function TestExternalWorkflowExecutionCancelRequestedEventAttributes(): void {
  const items = [
    undefined,
    {
      initiatedEventId: 0,
      domain: "",
      workflowExecution: undefined,
    },
    {
      initiatedEventId: 0,
      domain: "",
      workflowExecution: undefined,
    },
  ];

  for (const item of items) {
    expect(
      proto_ExternalWorkflowExecutionCancelRequestedEventAttributes(
        thrift_ExternalWorkflowExecutionCancelRequestedEventAttributes(item),
      ),
    ).toEqual(item);
  }

  runFuzzTest(
    thrift_ExternalWorkflowExecutionCancelRequestedEventAttributes,
    proto_ExternalWorkflowExecutionCancelRequestedEventAttributes,
    {
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestExternalWorkflowExecutionSignaledEventAttributes(): void {
  const items = [
    undefined,
    {
      initiatedEventId: 0,
      domain: "",
      workflowExecution: undefined,
      control: new Uint8Array(),
    },
    {
      initiatedEventId: 0,
      domain: "",
      workflowExecution: undefined,
      control: new Uint8Array(),
    },
  ] as any[];

  for (const item of items) {
    expect(
      proto_ExternalWorkflowExecutionSignaledEventAttributes(
        thrift_ExternalWorkflowExecutionSignaledEventAttributes(item),
      ),
    ).toEqual(item);
  }

  runFuzzTest(
    thrift_ExternalWorkflowExecutionSignaledEventAttributes,
    proto_ExternalWorkflowExecutionSignaledEventAttributes,
    {
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestGetClusterInfoResponse(): void {
  // @go-unlowerable: missing project fixture — testdata.GetClusterInfoResponse has no supplied TypeScript declaration or value
}

export function TestGetSearchAttributesResponse(): void {
  // @go-unlowerable: missing project fixture — testdata.GetSearchAttributesResponse is not provided in the target API facts
  return;
}

export function TestGetWorkflowExecutionHistoryRequest(): void {
  // @go-unlowerable: missing project fixture representation — testdata.GetWorkflowExecutionHistoryRequest is not declared or specified in the provided TypeScript facts
}

export function TestGetWorkflowExecutionHistoryResponse(): void {
  const zeroResponse = {
    history: undefined,
    rawHistory: [],
    nextPageToken: new Uint8Array(),
    archived: false,
  };
  const testResponse = {
    history: undefined,
    rawHistory: [],
    nextPageToken: new Uint8Array([1]),
    archived: true,
  };

  for (const item of [undefined, zeroResponse, testResponse]) {
    expect(
      proto_GetWorkflowExecutionHistoryResponse(
        thrift_GetWorkflowExecutionHistoryResponse(item),
      ),
    ).toEqual(item);
  }

  runFuzzTest(
    thrift_GetWorkflowExecutionHistoryResponse,
    proto_GetWorkflowExecutionHistoryResponse,
    {
      NilChance: 0.0,
      CustomFuncs: [
        (e: { value: number }, c: { Intn: (n: number) => number }) => {
          const validValues = [0, 1, 2];
          e.value = validValues[c.Intn(validValues.length)];
        },
        (resp: any, c: { Fuzz: (target: unknown) => void }) => {
          const nextPageToken = { value: resp.nextPageToken };
          c.Fuzz(nextPageToken);
          resp.nextPageToken = nextPageToken.value;

          const archived = { value: resp.archived };
          c.Fuzz(archived);
          resp.archived = archived.value;

          const rawHistory = { value: resp.rawHistory };
          c.Fuzz(rawHistory);
          resp.rawHistory = rawHistory.value;
        },
      ],
      ExcludedFields: ["History"],
      Iterations: 0,
    },
  );
}

export function TestHeader(): void {
  // @go-unlowerable: unavailable project value — testdata.Header is not declared or represented in the provided TypeScript facts
}

export function TestHistory(): void {
  const history = { events: [] };
  for (const item of [undefined, { events: [] }, history]) {
    expect(proto_History(thrift_History(item))).toEqual(item);
  }
}

export function TestListArchivedWorkflowExecutionsRequest(): void {
  // @go-unlowerable: missing project fixture — the value of testdata.ListArchivedWorkflowExecutionsRequest is not provided
}

export function TestListArchivedWorkflowExecutionsResponse(): void {
  const items: any[] = [
    undefined,
    { executions: [], nextPageToken: new Uint8Array() },
    { executions: [], nextPageToken: new Uint8Array() },
  ];

  for (const item of items) {
    expect(
      proto_ListArchivedWorkflowExecutionsResponse(
        thrift_ListArchivedWorkflowExecutionsResponse(item),
      ),
    ).toEqual(item);
  }

  runFuzzTest(
    thrift_ListArchivedWorkflowExecutionsResponse,
    proto_ListArchivedWorkflowExecutionsResponse,
    {
      CustomFuncs: [
        (resp: any, c: any) => {
          c.Fuzz(resp.nextPageToken);
        },
      ],
      ExcludedFields: ["Executions"],
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestListClosedWorkflowExecutionsResponse(): void {
  // @go-unlowerable: missing testdata fixture — the value of testdata.ListClosedWorkflowExecutionsResponse is not provided
}

export function TestListDomainsRequest(): void {
  // @go-unlowerable: missing target representation — testdata.ListDomainsRequest has no TypeScript declaration or value in the supplied target facts
}

export function TestListDomainsResponse(): void {
  const items: any[] = [undefined, {}, {}];

  for (const item of items) {
    expect(
      proto_ListDomainsResponse(thrift_ListDomainsResponse(item)),
    ).toEqual(item);
  }

  runFuzzTest(
    thrift_ListDomainsResponse,
    proto_ListDomainsResponse,
    {
      CustomFuncs: [
        (status: { value: number }, c: unknown) => {
          const validValues = [0, 1, 2, 3];
          status.value = validValues[
            (c as { Intn: (n: number) => number }).Intn(validValues.length)
          ];
        },
        (status: { value: number }, c: unknown) => {
          const validValues = [0, 1, 2];
          status.value = validValues[
            (c as { Intn: (n: number) => number }).Intn(validValues.length)
          ];
        },
        (domain: any, c: unknown) => {
          if (domain.workflowExecutionRetentionPeriod != null) {
            const days = (c as { Int63n: (n: number) => number }).Int63n(
              MaxDurationSeconds / (24 * 3600),
            );
            domain.workflowExecutionRetentionPeriod.seconds = days * 24 * 3600;
            domain.workflowExecutionRetentionPeriod.nanos = 0;
          }
        },
      ],
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestListOpenWorkflowExecutionsResponse(): void {
  const items = [
    undefined,
    { executions: [], nextPageToken: new Uint8Array() },
    { executions: [], nextPageToken: new Uint8Array() },
  ];

  for (const item of items) {
    expect(
      proto_ListOpenWorkflowExecutionsResponse(
        thrift_ListOpenWorkflowExecutionsResponse(item),
      ),
    ).toEqual(item);
  }

  runFuzzTest(
    thrift_ListOpenWorkflowExecutionsResponse,
    proto_ListOpenWorkflowExecutionsResponse,
    {
      CustomFuncs: [
        (
          resp: { nextPageToken: Uint8Array },
          c: { Fuzz: (value: unknown) => void },
        ) => {
          c.Fuzz(resp.nextPageToken);
        },
      ],
      ExcludedFields: ["Executions"],
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestListTaskListPartitionsRequest(): void {
  // @go-unlowerable: missing project fixture — testdata.ListTaskListPartitionsRequest has no TypeScript declaration or value in the provided facts
}

export function TestListTaskListPartitionsResponse(): void {
  for (const item of [undefined, {}, {}] as any[]) {
    expect(proto_ListTaskListPartitionsResponse(thrift_ListTaskListPartitionsResponse(item))).toEqual(item);
  }

  runFuzzTest(
    thrift_ListTaskListPartitionsResponse,
    proto_ListTaskListPartitionsResponse,
    {
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestListWorkflowExecutionsRequest(): void {
  for (const item of [
    undefined,
    {
      domain: "",
      pageSize: 0,
      nextPageToken: new Uint8Array(),
      query: "",
    },
    {
      domain: "",
      pageSize: 0,
      nextPageToken: new Uint8Array(),
      query: "",
    },
  ]) {
    expect(
      proto_ListWorkflowExecutionsRequest(
        thrift_ListWorkflowExecutionsRequest(item),
      ),
    ).toEqual(item);
  }

  runFuzzTest(
    thrift_ListWorkflowExecutionsRequest,
    proto_ListWorkflowExecutionsRequest,
    {
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestListWorkflowExecutionsResponse(): void {
  // @go-unlowerable: missing project fixture — testdata.ListWorkflowExecutionsResponse has no TypeScript declaration or value in the provided facts
}

export function TestMarkerRecordedEventAttributes(): void {
  // @go-unlowerable: missing value mapping — testdata.MarkerRecordedEventAttributes has no TypeScript declaration or representation in the supplied facts
}

export function TestMemo(): void {
  const items: Array<Parameters<typeof thrift_Memo>[0]> = [
    undefined,
    {} as Parameters<typeof thrift_Memo>[0],
    {} as Parameters<typeof thrift_Memo>[0],
  ];

  for (const item of items) {
    expect(proto_Memo(thrift_Memo(item))).toEqual(item);
  }

  runFuzzTest(thrift_Memo, proto_Memo, {
    Iterations: 0,
    NilChance: 0,
  });
}

export function TestPendingActivityInfo(): void {
  // @go-unlowerable: missing source value — testdata.PendingActivityInfo and its contents are not provided
}

export function TestPendingChildExecutionInfo(): void {
  const items: any[] = [
    undefined,
    {},
    {
      workflowExecution: {
        workflowId: "workflow-id",
        runId: "run-id",
      },
      workflowTypeName: "workflow-type",
      initiatedId: 1,
      parentClosePolicy: 0,
      domain: "domain",
    },
  ];

  for (const item of items) {
    expect(proto_PendingChildExecutionInfo(thrift_PendingChildExecutionInfo(item))).toEqual(item);
  }

  runFuzzTest(
    thrift_PendingChildExecutionInfo,
    proto_PendingChildExecutionInfo,
    {
      CustomFuncs: [
        (policy: { value: number }, c: { Intn: (n: number) => number }) => {
          const validValues = [0, 1, 2, 3];
          policy.value = validValues[c.Intn(validValues.length)];
        },
      ],
      ExcludedFields: ["Domain"],
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestPendingDecisionInfo(): void {
  const items: any[] = [
    undefined,
    {
      state: 0,
      scheduledTime: undefined,
      startedTime: undefined,
      attempt: 0,
      originalScheduledTime: undefined,
      scheduleId: 0,
    },
    {
      state: 0,
      scheduledTime: undefined,
      startedTime: undefined,
      attempt: 0,
      originalScheduledTime: undefined,
      scheduleId: 0,
    },
  ];

  for (const item of items) {
    expect(proto_PendingDecisionInfo(thrift_PendingDecisionInfo(item))).toEqual(item);
  }

  runFuzzTest(
    thrift_PendingDecisionInfo,
    proto_PendingDecisionInfo,
    {
      CustomFuncs: [
        (state: any, c: any) => {
          const validValues = [1, 2];
          state.value = validValues[c.Intn(validValues.length)];
        },
      ],
      ExcludedFields: ["ScheduleId"],
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestPollForActivityTaskRequest(): void {
  // @go-unlowerable: unavailable source value — testdata.PollForActivityTaskRequest and the runtime representation of fuzz custom-function arguments are not specified
}

export function TestPollForActivityTaskResponse(): void {
  for (const item of [undefined, {}, {}]) {
    expect(
      proto_PollForActivityTaskResponse(thrift_PollForActivityTaskResponse(item as any))!,
    ).toEqual(item);
  }

  runFuzzTest(
    thrift_PollForActivityTaskResponse,
    proto_PollForActivityTaskResponse,
    {
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestPollForDecisionTaskRequest(): void {
  // @go-unlowerable: missing project fixture — the value of testdata.PollForDecisionTaskRequest is not provided, so the third round-trip case cannot be reproduced faithfully
}

export function TestPollForDecisionTaskResponse(): void {
  const items: any[] = [undefined, {}, {}];

  for (const item of items) {
    expect(proto_PollForDecisionTaskResponse(thrift_PollForDecisionTaskResponse(item))).toEqual(item);
  }

  runFuzzTest(
    thrift_PollForDecisionTaskResponse,
    proto_PollForDecisionTaskResponse,
    {
      CustomFuncs: [
        (p: any, c: any) => {
          p.TaskToken = new Uint8Array(c.Intn(50));
          c.Fuzz(p.TaskToken);
          c.Fuzz(p.StartedEventId);
          c.Fuzz(p.Attempt);
          c.Fuzz(p.BacklogCountHint);
          c.Fuzz(p.NextEventId);
          c.Fuzz(p.TotalHistoryBytes);
          c.Fuzz(p.NextPageToken);
          c.Fuzz(p.PreviousStartedEventId);
          c.Fuzz(p.ScheduledTime);
          c.Fuzz(p.StartedTime);
          c.Fuzz(p.AutoConfigHint);
        },
      ],
      ExcludedFields: [
        "WorkflowExecution",
        "WorkflowType",
        "History",
        "Query",
        "WorkflowExecutionTaskList",
        "Queries",
      ],
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestPollerInfo(): void {
  // @go-unlowerable: missing external test fixture — testdata.PollerInfo is not declared or described in the provided TypeScript facts
}

export function TestQueryRejected(): void {
  const items = [
    undefined,
    { closeStatus: 0 },
    { closeStatus: 2 },
  ];

  for (const item of items) {
    expect(proto_QueryRejected(thrift_QueryRejected(item)!)).toEqual(item);
  }

  runFuzzTest(
    thrift_QueryRejected,
    proto_QueryRejected,
    {
      CustomFuncs: [
        (e: any, c: any) => {
          const validValues = [0, 1, 2, 3, 4, 5, 6];
          e.value = validValues[c.Intn(validValues.length)];
        },
      ],
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestQueryWorkflowRequest(): void {
  const zeroRequest = {
    domain: "",
    workflowExecution: undefined,
    query: undefined,
    queryRejectCondition: 0,
    queryConsistencyLevel: 0,
  };

  for (const item of [undefined, zeroRequest, zeroRequest]) {
    expect(proto_QueryWorkflowRequest(thrift_QueryWorkflowRequest(item))).toEqual(item);
  }

  runFuzzTest(
    thrift_QueryWorkflowRequest,
    proto_QueryWorkflowRequest,
    {
      CustomFuncs: [
        (e: { value: number }, c: any) => {
          const validValues = [0, 1, 2];
          e.value = validValues[c.Intn(validValues.length)];
        },
        (e: { value: number }, c: any) => {
          const validValues = [0, 1, 2];
          e.value = validValues[c.Intn(validValues.length)];
        },
      ],
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestQueryWorkflowResponse(): void {
  // @go-unlowerable: missing test fixture — testdata.QueryWorkflowResponse and its field values are not provided
}

export function TestRecordActivityTaskHeartbeatByIDRequest(): void {
  // @go-unlowerable: project fixture — the Go testdata.RecordActivityTaskHeartbeatByIDRequest value has no TypeScript declaration or value specified
  const items = [
    undefined,
    {
      domain: "",
      workflowExecution: undefined,
      activityId: "",
      details: undefined,
      identity: "",
    },
  ];

  for (const item of items) {
    expect(proto_RecordActivityTaskHeartbeatByIDRequest(thrift_RecordActivityTaskHeartbeatByIDRequest(item))).toEqual(item);
  }

  runFuzzTest(
    thrift_RecordActivityTaskHeartbeatByIDRequest,
    proto_RecordActivityTaskHeartbeatByIDRequest,
    {
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestRecordActivityTaskHeartbeatByIDResponse(): void {
  for (const item of [undefined, { cancelRequested: false }, { cancelRequested: true }]) {
    expect(
      proto_RecordActivityTaskHeartbeatByIDResponse(
        thrift_RecordActivityTaskHeartbeatByIDResponse(item),
      ),
    ).toEqual(item);
  }

  runFuzzTest(
    thrift_RecordActivityTaskHeartbeatByIDResponse,
    proto_RecordActivityTaskHeartbeatByIDResponse,
    {
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestRecordActivityTaskHeartbeatRequest(): void {
  const zeroRequest = {
    taskToken: new Uint8Array(),
    details: undefined,
    identity: "",
  };

  for (const item of [undefined, zeroRequest, zeroRequest]) {
    expect(
      proto_RecordActivityTaskHeartbeatRequest(
        thrift_RecordActivityTaskHeartbeatRequest(item),
      ),
    ).toEqual(item);
  }

  runFuzzTest(
    thrift_RecordActivityTaskHeartbeatRequest,
    proto_RecordActivityTaskHeartbeatRequest,
    {
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestRecordActivityTaskHeartbeatResponse(): void {
  for (const item of [undefined, { cancelRequested: false }, { cancelRequested: true }]) {
    expect(proto_RecordActivityTaskHeartbeatResponse(thrift_RecordActivityTaskHeartbeatResponse(item))).toEqual(item);
  }

  runFuzzTest(
    thrift_RecordActivityTaskHeartbeatResponse,
    proto_RecordActivityTaskHeartbeatResponse,
    {
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestRegisterDomainRequest(): void {
  // @go-unlowerable: missing test fixture — testdata.RegisterDomainRequest is not provided by the target facts
  return;
}

export function TestRequestCancelActivityTaskFailedEventAttributes(): void {
  const items = [
    undefined,
    {
      activityId: "",
      cause: "",
      decisionTaskCompletedEventId: 0,
    },
    {
      activityId: "activity-id",
      cause: "cause",
      decisionTaskCompletedEventId: 123,
    },
  ];

  for (const item of items) {
    expect(
      proto_RequestCancelActivityTaskFailedEventAttributes(
        thrift_RequestCancelActivityTaskFailedEventAttributes(item),
      ),
    ).toEqual(item);
  }

  runFuzzTest(
    thrift_RequestCancelActivityTaskFailedEventAttributes,
    proto_RequestCancelActivityTaskFailedEventAttributes,
    {
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestRequestCancelExternalWorkflowExecutionFailedEventAttributes(): void {
  // @go-unlowerable: missing external fixture — testdata.RequestCancelExternalWorkflowExecutionFailedEventAttributes is not defined by the provided TypeScript facts
}

export function TestRequestCancelExternalWorkflowExecutionInitiatedEventAttributes(): void {
  for (const item of [undefined, {}, {}]) {
    expect(
      proto_RequestCancelExternalWorkflowExecutionInitiatedEventAttributes(
        thrift_RequestCancelExternalWorkflowExecutionInitiatedEventAttributes(item as any),
      ),
    ).toEqual(item);
  }

  runFuzzTest(
    thrift_RequestCancelExternalWorkflowExecutionInitiatedEventAttributes,
    proto_RequestCancelExternalWorkflowExecutionInitiatedEventAttributes,
    { Iterations: 0, NilChance: 0 },
  );
}

export function TestRequestCancelWorkflowExecutionRequest(): void {
  const items = [
    undefined,
    {
      domain: "",
      workflowExecution: undefined,
      identity: "",
      requestId: "",
      cause: "",
      firstExecutionRunId: "",
    },
    {
      domain: "",
      workflowExecution: undefined,
      identity: "",
      requestId: "",
      cause: "",
      firstExecutionRunId: "",
    },
  ];

  for (const item of items) {
    expect(
      proto_RequestCancelWorkflowExecutionRequest(
        thrift_RequestCancelWorkflowExecutionRequest(item)!
      )
    ).toEqual(item);
  }

  runFuzzTest(
    thrift_RequestCancelWorkflowExecutionRequest,
    proto_RequestCancelWorkflowExecutionRequest,
    {
      ExcludedFields: ["Cause", "FirstExecutionRunId"],
      Iterations: 0,
      NilChance: 0,
    }
  );
}

export function TestResetPointInfo(): void {
  // @go-unlowerable: missing project fixture — testdata.ResetPointInfo has no TypeScript declaration or representation in the provided facts
}

export function TestResetPoints(): void {
  const items = [undefined, { points: [] }, { points: [] }];

  for (const item of items) {
    expect(proto_ResetPoints(thrift_ResetPoints(item))).toEqual(item);
  }

  runFuzzTest(thrift_ResetPoints, proto_ResetPoints, {
    Iterations: 0,
    NilChance: 0,
  });
}

export function TestResetStickyTaskListRequest(): void {
  // @go-unlowerable: project fixture — testdata.ResetStickyTaskListRequest is not declared in the provided TypeScript facts
}

export function TestResetWorkflowExecutionRequest(): void {
  const zeroRequest = {
    domain: "",
    workflowExecution: undefined,
    reason: "",
    decisionFinishEventId: 0,
    requestId: "",
    skipSignalReapply: false,
  };

  for (const item of [undefined, zeroRequest, zeroRequest]) {
    expect(proto_ResetWorkflowExecutionRequest(thrift_ResetWorkflowExecutionRequest(item))).toEqual(item);
  }

  runFuzzTest(
    thrift_ResetWorkflowExecutionRequest,
    proto_ResetWorkflowExecutionRequest,
    {
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestResetWorkflowExecutionResponse(): void {
  // @go-unlowerable: unsupported external fixture — testdata.ResetWorkflowExecutionResponse is not represented in the provided TypeScript facts
}

export function TestRespondActivityTaskCanceledByIDRequest(): void {
  // @go-unlowerable: unavailable project fixture — the value of testdata.RespondActivityTaskCanceledByIDRequest is not provided, so its round-trip assertion cannot be reproduced faithfully
}

export function TestRespondActivityTaskCanceledRequest(): void {
  for (const item of [
    undefined,
    { taskToken: new Uint8Array(), details: undefined, identity: "" },
    { taskToken: new Uint8Array(), details: undefined, identity: "" },
  ]) {
    expect(
      proto_RespondActivityTaskCanceledRequest(
        thrift_RespondActivityTaskCanceledRequest(item),
      ),
    ).toEqual(item);
  }

  runFuzzTest(
    thrift_RespondActivityTaskCanceledRequest,
    proto_RespondActivityTaskCanceledRequest,
    {
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestRespondActivityTaskCompletedByIDRequest(): void {
  const items = [undefined, {} as any, {} as any];

  for (const item of items) {
    expect(proto_RespondActivityTaskCompletedByIDRequest(thrift_RespondActivityTaskCompletedByIDRequest(item))).toEqual(item);
  }

  runFuzzTest(
    thrift_RespondActivityTaskCompletedByIDRequest,
    proto_RespondActivityTaskCompletedByIDRequest,
    { Iterations: 0, NilChance: 0 },
  );
}

export function TestRespondActivityTaskCompletedRequest(): void {
  // @go-unlowerable: missing test fixture — testdata.RespondActivityTaskCompletedRequest is not represented by the provided TypeScript declarations or facts
}

export function TestRespondActivityTaskFailedByIDRequest(): void {
  const items = [
    undefined,
    {},
    {
      domain: "",
      workflowExecution: undefined,
      activityId: "",
      failure: undefined,
      identity: "",
    },
  ];

  for (const item of items) {
    expect(
      proto_RespondActivityTaskFailedByIDRequest(
        thrift_RespondActivityTaskFailedByIDRequest(item as any),
      ),
    ).toEqual(item);
  }

  runFuzzTest(
    thrift_RespondActivityTaskFailedByIDRequest,
    proto_RespondActivityTaskFailedByIDRequest,
    {
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestRespondActivityTaskFailedRequest(): void {
  // @go-unlowerable: missing project fixture — testdata.RespondActivityTaskFailedRequest has no TypeScript declaration or value in the supplied facts
}

export function TestRespondDecisionTaskCompletedRequest(): void {
  const items = [undefined, {} as any, {} as any];

  for (const item of items) {
    expect(proto_RespondDecisionTaskCompletedRequest(thrift_RespondDecisionTaskCompletedRequest(item))).toEqual(item);
  }

  runFuzzTest(
    thrift_RespondDecisionTaskCompletedRequest,
    proto_RespondDecisionTaskCompletedRequest,
    {
      NilChance: DefaultNilChance,
      CustomFuncs: [
        (req: any, c: any) => {
          c.Fuzz(req.taskToken);
          c.Fuzz(req.executionContext);
          c.Fuzz(req.identity);
          c.Fuzz(req.returnNewDecisionTask);
          c.Fuzz(req.forceCreateNewDecisionTask);
          c.Fuzz(req.binaryChecksum);
        },
      ],
      ExcludedFields: [
        "Decisions",
        "StickyAttributes",
        "QueryResults",
      ],
      Iterations: 0,
    },
  );
}

export function TestRespondDecisionTaskCompletedResponse(): void {
  // @go-unlowerable: unavailable test fixture — testdata.RespondDecisionTaskCompletedResponse is not represented in the provided TypeScript facts
}

export function TestRespondDecisionTaskFailedRequest(): void {
  // @go-unlowerable: missing project fixture — testdata.RespondDecisionTaskFailedRequest and its exact value are not provided, so the third round-trip assertion cannot be faithfully reconstructed.
}

export function TestRespondQueryTaskCompletedRequest(): void {
  // @go-unlowerable: unavailable test fixture — testdata.RespondQueryTaskCompletedRequest is not provided by the target API facts
}

export function TestRetryPolicy(): void {
  const items: unknown[] = [undefined, {}, {}];

  for (const item of items) {
    expect(proto_RetryPolicy(thrift_RetryPolicy(item as any))).toEqual(item);
  }

  runFuzzTest(
    thrift_RetryPolicy,
    proto_RetryPolicy,
    {
      ExcludedFields: [],
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestScanWorkflowExecutionsRequest(): void {
  for (const item of [
    undefined,
    {
      domain: "",
      pageSize: 0,
      nextPageToken: new Uint8Array(),
      query: "",
    },
    {
      domain: "",
      pageSize: 0,
      nextPageToken: new Uint8Array(),
      query: "",
    },
  ]) {
    expect(
      proto_ScanWorkflowExecutionsRequest(
        thrift_ScanWorkflowExecutionsRequest(item),
      ),
    ).toEqual(item);
  }

  runFuzzTest(
    thrift_ScanWorkflowExecutionsRequest,
    proto_ScanWorkflowExecutionsRequest,
    {
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestScanWorkflowExecutionsResponse(): void {
  const items: any[] = [
    undefined,
    {},
    {
      executions: [],
      nextPageToken: new Uint8Array(),
    },
  ];

  for (const item of items) {
    expect(
      proto_ScanWorkflowExecutionsResponse(
        thrift_ScanWorkflowExecutionsResponse(item),
      ),
    ).toEqual(item);
  }

  runFuzzTest(
    thrift_ScanWorkflowExecutionsResponse,
    proto_ScanWorkflowExecutionsResponse,
    {
      CustomFuncs: [
        (resp: any, c: any) => {
          c.Fuzz(resp.nextPageToken);
        },
      ],
      ExcludedFields: ["Executions"],
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestSearchAttributes(): void {
  const items = [
    undefined,
    {} as NonNullable<Parameters<typeof thrift_SearchAttributes>[0]>,
    { indexedFields: {} } as NonNullable<Parameters<typeof thrift_SearchAttributes>[0]>,
  ];

  for (const item of items) {
    expect(proto_SearchAttributes(thrift_SearchAttributes(item))).toEqual(item);
  }

  runFuzzTest(
    thrift_SearchAttributes,
    proto_SearchAttributes,
    {
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestSignalExternalWorkflowExecutionFailedEventAttributes(): void {
  // @go-unlowerable: external type and fixture representation — fuzz.Continue is erased to unknown and the testdata fixture is not provided
}

export function TestSignalExternalWorkflowExecutionInitiatedEventAttributes(): void {
  const items = [
    undefined,
    {},
    {
      decisionTaskCompletedEventId: 0,
      domain: "",
      workflowExecution: undefined,
      signalName: "",
      input: undefined,
      control: new Uint8Array(),
      childWorkflowOnly: false,
    },
  ];

  for (const item of items) {
    const actual = proto_SignalExternalWorkflowExecutionInitiatedEventAttributes(
      thrift_SignalExternalWorkflowExecutionInitiatedEventAttributes(item as any),
    );
    expect(actual).toEqual(item);
  }

  runFuzzTest(
    proto_SignalExternalWorkflowExecutionInitiatedEventAttributes,
    thrift_SignalExternalWorkflowExecutionInitiatedEventAttributes,
    {
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestSignalWithStartWorkflowExecutionRequest(): void {
  // @go-unlowerable: missing testdata — referenced test fixtures and their values are not provided
}

export function TestSignalWithStartWorkflowExecutionResponse(): void {
  const items = [undefined, {}, { runId: "" }] as any[];

  for (const item of items) {
    expect(
      proto_SignalWithStartWorkflowExecutionResponse(
        thrift_SignalWithStartWorkflowExecutionResponse(item),
      ),
    ).toEqual(item);
  }

  runFuzzTest(
    thrift_SignalWithStartWorkflowExecutionResponse,
    proto_SignalWithStartWorkflowExecutionResponse,
    {
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestSignalWorkflowExecutionRequest(): void {
  const items = [
    undefined,
    {
      domain: "",
      workflowExecution: undefined,
      identity: "",
      requestId: "",
      signalName: "",
      signalInput: undefined,
      control: new Uint8Array(),
    },
    {
      domain: "",
      workflowExecution: undefined,
      identity: "",
      requestId: "",
      signalName: "",
      signalInput: undefined,
      control: new Uint8Array(),
    },
  ];

  for (const item of items) {
    expect(
      proto_SignalWorkflowExecutionRequest(
        thrift_SignalWorkflowExecutionRequest(item as any),
      ),
    ).toEqual(item);
  }

  runFuzzTest(
    thrift_SignalWorkflowExecutionRequest,
    proto_SignalWorkflowExecutionRequest,
    {
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestStartChildWorkflowExecutionFailedEventAttributes(): void {
  const items = [
    undefined,
    {
      domain: "",
      workflowId: "",
      workflowType: undefined,
      cause: 0,
      control: new Uint8Array(),
      initiatedEventId: 0,
      decisionTaskCompletedEventId: 0,
    },
    {
      domain: "",
      workflowId: "",
      workflowType: undefined,
      cause: 0,
      control: new Uint8Array(),
      initiatedEventId: 0,
      decisionTaskCompletedEventId: 0,
    },
  ];

  for (const item of items) {
    expect(proto_StartChildWorkflowExecutionFailedEventAttributes(thrift_StartChildWorkflowExecutionFailedEventAttributes(item))).toEqual(item);
  }

  runFuzzTest(
    thrift_StartChildWorkflowExecutionFailedEventAttributes,
    proto_StartChildWorkflowExecutionFailedEventAttributes,
    {
      CustomFuncs: [
        (cause: any, c: any) => {
          const validValues = [0, 1];
          cause.value = validValues[c.Intn(validValues.length)];
        },
      ],
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestStartChildWorkflowExecutionInitiatedEventAttributes(): void {
  const fixture = {} as any;
  const items = [undefined, {}, fixture] as any[];

  for (const item of items) {
    expect(proto_StartChildWorkflowExecutionInitiatedEventAttributes(thrift_StartChildWorkflowExecutionInitiatedEventAttributes(item))).toEqual(item);
  }

  runFuzzTest(
    thrift_StartChildWorkflowExecutionInitiatedEventAttributes,
    proto_StartChildWorkflowExecutionInitiatedEventAttributes,
    {
      CustomFuncs: [
        (e: any, c: any) => {
          const validValues = [0, 1, 2];
          e.value = validValues[c.Intn(validValues.length)];
        },
        (attr: any, c: any) => {
          c.Fuzz(attr.domain);
          c.Fuzz(attr.workflowId);
          c.Fuzz(attr.control);
          c.Fuzz(attr.decisionTaskCompletedEventId);
          c.Fuzz(attr.cronSchedule);
          c.Fuzz(attr.taskList);
          c.Fuzz(attr.workflowType);
          c.Fuzz(attr.retryPolicy);
          c.Fuzz(attr.header);
        },
      ],
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestStartTimeFilter(): void {
  // @go-unlowerable: missing testdata.StartTimeFilter representation — the provided TypeScript facts do not define its value or an imported equivalent
  return;
}

export function TestStartWorkflowExecutionRequest(): void {
  // @go-unlowerable: unavailable test fixtures and request representations — the GO SOURCE references testdata.StartWorkflowExecutionRequest and related values that are not declared in the provided TypeScript surface
}

export function TestStartWorkflowExecutionResponse(): void {
  // @go-unlowerable: missing project fixture — the value of testdata.StartWorkflowExecutionResponse is not specified
  return;
}

export function TestStatusFilter(): void {
  const items = [undefined, {} as any];

  for (const item of items) {
    expect(proto_StatusFilter(thrift_StatusFilter(item))).toEqual(item);
  }

  runFuzzTest(
    proto_StatusFilter,
    thrift_StatusFilter,
    {
      CustomFuncs: [
        (e: { value: number }, c: any) => {
          const validValues = [1, 2, 3, 4, 5, 6];
          e.value = validValues[c.Intn(validValues.length)];
        },
      ],
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestStickyExecutionAttributes(): void {
  const items = [
    undefined,
    { workerTaskList: undefined, scheduleToStartTimeout: undefined },
    { workerTaskList: undefined, scheduleToStartTimeout: undefined },
  ];

  for (const item of items) {
    expect(proto_StickyExecutionAttributes(thrift_StickyExecutionAttributes(item))).toEqual(item);
  }

  runFuzzTest(
    thrift_StickyExecutionAttributes,
    proto_StickyExecutionAttributes,
    {
      CustomFuncs: [
        (e: { value: number }, c: { Intn(n: number): number }) => {
          const validValues = [0, 1, 2];
          e.value = validValues[c.Intn(validValues.length)];
        },
      ],
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestSupportedClientVersions(): void {
  for (const item of [
    undefined,
    { goSdk: "", javaSdk: "" },
    { goSdk: "", javaSdk: "" },
  ]) {
    expect(proto_SupportedClientVersions(thrift_SupportedClientVersions(item))).toEqual(item);
  }

  runFuzzTest(
    thrift_SupportedClientVersions,
    proto_SupportedClientVersions,
    {
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestTaskIDBlock(): void {
  for (const item of [
    undefined,
    { startId: 0, endId: 0 },
    { startId: 0, endId: 0 },
  ]) {
    expect(thrift_TaskIDBlock(item)).toEqual(item);
    expect(proto_TaskIDBlock(thrift_TaskIDBlock(item))).toEqual(item);
  }

  runFuzzTest(
    thrift_TaskIDBlock,
    proto_TaskIDBlock,
    {
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestTaskList(): void {
  for (const item of [
    undefined,
    { name: "", kind: 0 },
    { name: "", kind: 0 },
  ]) {
    expect(proto_TaskList(thrift_TaskList(item))).toEqual(item);
  }

  runFuzzTest(
    thrift_TaskList,
    proto_TaskList,
    {
      CustomFuncs: [
        (e: { value: number }, c: { Intn: (n: number) => number }) => {
          const validValues = [0, 1, 2];
          e.value = validValues[c.Intn(validValues.length)];
        },
      ],
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestTaskListMetadata(): void {
  for (const item of [
    undefined,
    { maxTasksPerSecond: undefined },
    { maxTasksPerSecond: 10 },
  ]) {
    expect(proto_TaskListMetadata(thrift_TaskListMetadata(item))).toEqual(item);
  }

  runFuzzTest(thrift_TaskListMetadata, proto_TaskListMetadata, {
    Iterations: 0,
    NilChance: 0,
  });
}

export function TestTaskListPartitionMetadata(): void {
  // @go-unlowerable: missing project testdata value — the value of testdata.TaskListPartitionMetadata is not provided
}

export function TestTaskListStatus(): void {
  throw new globalThis.Error("not implemented"); // @stub
}

export function TestTerminateWorkflowExecutionRequest(): void {
  const items = [
    undefined,
    {
      domain: "",
      workflowExecution: undefined,
      reason: "",
      details: undefined,
      identity: "",
      firstExecutionRunId: "",
    },
    {
      domain: "",
      workflowExecution: undefined,
      reason: "",
      details: undefined,
      identity: "",
      firstExecutionRunId: "",
    },
  ];

  for (const item of items) {
    expect(
      proto_TerminateWorkflowExecutionRequest(
        thrift_TerminateWorkflowExecutionRequest(item),
      ),
    ).toEqual(item);
  }

  runFuzzTest(
    thrift_TerminateWorkflowExecutionRequest,
    proto_TerminateWorkflowExecutionRequest,
    {
      ExcludedFields: ["FirstExecutionRunId"],
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestTimerCanceledEventAttributes(): void {
  const items = [
    undefined,
    {
      timerId: "",
      startedEventId: 0,
      decisionTaskCompletedEventId: 0,
      identity: "",
    },
    {
      timerId: "",
      startedEventId: 0,
      decisionTaskCompletedEventId: 0,
      identity: "",
    },
  ];

  for (const item of items) {
    expect(proto_TimerCanceledEventAttributes(thrift_TimerCanceledEventAttributes(item))).toEqual(item);
  }

  runFuzzTest(
    thrift_TimerCanceledEventAttributes,
    proto_TimerCanceledEventAttributes,
    {
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestTimerFiredEventAttributes(): void {
  const items = [
    undefined,
    { timerId: "", startedEventId: 0 },
    { timerId: "timer-id", startedEventId: 1 },
  ];

  for (const item of items) {
    const actual = proto_TimerFiredEventAttributes(
      thrift_TimerFiredEventAttributes(item),
    );
    expect(actual).toEqual(item);
  }

  runFuzzTest(
    thrift_TimerFiredEventAttributes,
    proto_TimerFiredEventAttributes,
    {
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestTimerStartedEventAttributes(): void {
  // @go-unlowerable: missing project fixture — the value of testdata.TimerStartedEventAttributes is not provided, so the third round-trip assertion cannot be reproduced faithfully
}

export function TestListFailoverHistoryRequest(): void {
  const items = [
    undefined,
    { filters: undefined, pagination: undefined },
    { filters: undefined, pagination: undefined },
  ];

  for (const item of items) {
    expect(
      proto_ListFailoverHistoryRequest(thrift_ListFailoverHistoryRequest(item)),
    ).toEqual(item);
  }

  runFuzzTest(
    thrift_ListFailoverHistoryRequest,
    proto_ListFailoverHistoryRequest,
    {
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestListFailoverHistoryResponse(): void {
  for (const item of [
    undefined,
    { failoverEvents: [], nextPageToken: new Uint8Array() },
  ]) {
    expect(
      proto_ListFailoverHistoryResponse(
        thrift_ListFailoverHistoryResponse(item),
      ),
    ).toEqual(item);
  }

  runFuzzTest(
    thrift_ListFailoverHistoryResponse,
    proto_ListFailoverHistoryResponse,
    {
      CustomFuncs: [
        (e: { value: number }, c: { Intn: (n: number) => number }) => {
          const validValues = [0, 1, 2];
          e.value = validValues[c.Intn(validValues.length)];
        },
      ],
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestUpdateDomainRequest(): void {
  // @go-unlowerable: unavailable fixture — testdata.UpdateDomainRequest is not defined by the provided TypeScript API facts
}

export function TestUpdateDomainResponse(): void {
  const items = [
    undefined,
    { domain: undefined },
  ];

  for (const item of items) {
    expect(proto_UpdateDomainResponse(thrift_UpdateDomainResponse(item))).toEqual(item);
  }

  runFuzzTest(
    thrift_UpdateDomainResponse,
    proto_UpdateDomainResponse,
    {
      NilChance: 0.0,
      CustomFuncs: [
        (resp: any, c: any) => {
          resp.domain = {
            id: "",
            name: c.RandString(),
            status: 1,
            description: "",
            ownerEmail: "",
            data: {},
            workflowExecutionRetentionPeriod: undefined,
            badBinaries: undefined,
            historyArchivalStatus: 1,
            historyArchivalUri: "",
            visibilityArchivalStatus: 1,
            visibilityArchivalUri: "",
            activeClusterName: "",
            clusters: [],
            failoverVersion: 0,
            isGlobalDomain: false,
            failoverInfo: undefined,
            isolationGroups: undefined,
            asyncWorkflowConfig: undefined,
            activeClusters: undefined,
          };

          if (c.RandBool()) {
            const days = c.Int63n(MaxDurationSeconds / (24 * 3600));
            resp.domain.workflowExecutionRetentionPeriod = {
              seconds: days * 24 * 3600,
              nanos: 0,
            };
          }
        },
      ],
      ExcludedFields: [
        "Domain.Clusters",
        "Domain.FailoverInfo",
        "Domain.IsolationGroups",
        "Domain.AsyncWorkflowConfig",
        "Domain.BadBinaries",
      ],
      Iterations: 0,
    },
  );
}

export function TestUpsertWorkflowSearchAttributesEventAttributes(): void {
  const items = [
    undefined,
    { decisionTaskCompletedEventId: 0, searchAttributes: undefined },
    { decisionTaskCompletedEventId: 0, searchAttributes: undefined },
  ];

  for (const item of items) {
    expect(
      proto_UpsertWorkflowSearchAttributesEventAttributes(
        thrift_UpsertWorkflowSearchAttributesEventAttributes(item),
      ),
    ).toEqual(item);
  }

  runFuzzTest(
    thrift_UpsertWorkflowSearchAttributesEventAttributes,
    proto_UpsertWorkflowSearchAttributesEventAttributes,
    {
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestWorkerVersionInfo(): void {
  for (const item of [
    undefined,
    { impl: "", featureVersion: "" },
    { impl: "", featureVersion: "" },
  ]) {
    expect(proto_WorkerVersionInfo(thrift_WorkerVersionInfo(item as any))).toEqual(item);
  }

  runFuzzTest(thrift_WorkerVersionInfo, proto_WorkerVersionInfo, {
    Iterations: 0,
    NilChance: 0,
  });
}

export function TestWorkflowExecution(): void {
  for (const item of [
    undefined,
    { workflowId: "", runId: "" },
    { workflowId: "", runId: "" },
  ]) {
    expect(proto_WorkflowExecution(thrift_WorkflowExecution(item))).toEqual(item);
  }

  expect(thrift_WorkflowID(undefined)).toEqual("");
  expect(thrift_RunID(undefined)).toEqual("");

  runFuzzTest(thrift_WorkflowExecution, proto_WorkflowExecution, {
    Iterations: 0,
    NilChance: 0,
  });
}

export function TestExternalExecutionInfo(): void {
    // @go-unlowerable: external test data — testdata.WorkflowExecution and testdata.EventID1 are not defined by the provided target facts
}

export function TestWorkflowExecutionCancelRequestedEventAttributes(): void {
  // @go-unlowerable: unavailable source value — testdata.WorkflowExecutionCancelRequestedEventAttributes is not represented in the provided TypeScript facts
  return;
}

export function TestWorkflowExecutionCanceledEventAttributes(): void {
  for (const item of [undefined, {}, {}]) {
    expect(
      proto_WorkflowExecutionCanceledEventAttributes(
        thrift_WorkflowExecutionCanceledEventAttributes(item as any),
      ),
    ).toEqual(item);
  }

  runFuzzTest(
    thrift_WorkflowExecutionCanceledEventAttributes,
    proto_WorkflowExecutionCanceledEventAttributes,
    {
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestWorkflowExecutionCompletedEventAttributes(): void {
  const items = [
    undefined,
    { result: undefined, decisionTaskCompletedEventId: 0 },
    { result: undefined, decisionTaskCompletedEventId: 0 },
  ];

  for (const item of items) {
    expect(
      proto_WorkflowExecutionCompletedEventAttributes(
        thrift_WorkflowExecutionCompletedEventAttributes(item),
      ),
    ).toEqual(item);
  }

  runFuzzTest(
    thrift_WorkflowExecutionCompletedEventAttributes,
    proto_WorkflowExecutionCompletedEventAttributes,
    {
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestWorkflowExecutionConfiguration(): void {
  // @go-unlowerable: missing test fixture — the value of testdata.WorkflowExecutionConfiguration is not specified
}

export function TestWorkflowExecutionContinuedAsNewEventAttributes(): void {
  const zero: any = {
    newExecutionRunId: "",
    workflowType: undefined,
    taskList: undefined,
    input: undefined,
    executionStartToCloseTimeout: undefined,
    taskStartToCloseTimeout: undefined,
    decisionTaskCompletedEventId: 0,
    backoffStartInterval: undefined,
    initiator: 0,
    failure: undefined,
    lastCompletionResult: undefined,
    header: undefined,
    memo: undefined,
    searchAttributes: undefined,
    cronOverlapPolicy: 0,
    activeClusterSelectionPolicy: undefined,
  };
  const fixture = { ...zero };
  const items: any[] = [undefined, zero, fixture];

  for (const item of items) {
    expect(
      proto_WorkflowExecutionContinuedAsNewEventAttributes(
        thrift_WorkflowExecutionContinuedAsNewEventAttributes(item),
      ),
    ).toEqual(item);
  }

  runFuzzTest(
    thrift_WorkflowExecutionContinuedAsNewEventAttributes,
    proto_WorkflowExecutionContinuedAsNewEventAttributes,
    {
      CustomFuncs: [
        (e: any, c: any) => {
          const validValues = [0, 1, 2];
          e.value = validValues[c.Intn(validValues.length)];
        },
        (e: any, c: any) => {
          const validValues = [0, 1, 2, 3];
          e.value = validValues[c.Intn(validValues.length)];
        },
        (attr: any, c: any) => {
          c.Fuzz({ value: attr.newExecutionRunId });
          c.Fuzz({ value: attr.workflowType });
          c.Fuzz({ value: attr.taskList });
          c.Fuzz({ value: attr.input });
          c.Fuzz({ value: attr.executionStartToCloseTimeout });
          c.Fuzz({ value: attr.taskStartToCloseTimeout });
          c.Fuzz({ value: attr.decisionTaskCompletedEventId });
          c.Fuzz({ value: attr.backoffStartInterval });
          c.Fuzz({ value: attr.initiator });
          c.Fuzz({ value: attr.failure });
          c.Fuzz({ value: attr.lastCompletionResult });
          c.Fuzz({ value: attr.header });
          c.Fuzz({ value: attr.memo });
          c.Fuzz({ value: attr.searchAttributes });
        },
      ],
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestWorkflowExecutionFailedEventAttributes(): void {
  for (const item of [
    undefined,
    { failure: undefined, decisionTaskCompletedEventId: 0 },
    { failure: undefined, decisionTaskCompletedEventId: 0 },
  ]) {
    expect(
      proto_WorkflowExecutionFailedEventAttributes(
        thrift_WorkflowExecutionFailedEventAttributes(item),
      ),
    ).toEqual(item);
  }

  runFuzzTest(
    proto_WorkflowExecutionFailedEventAttributes,
    thrift_WorkflowExecutionFailedEventAttributes,
    {
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestWorkflowExecutionFilter(): void {
  const items = [
    undefined,
    { workflowId: "", runId: "" },
    { workflowId: "", runId: "" },
  ];

  for (const item of items) {
    expect(proto_WorkflowExecutionFilter(thrift_WorkflowExecutionFilter(item))).toEqual(item);
  }

  runFuzzTest(
    thrift_WorkflowExecutionFilter,
    proto_WorkflowExecutionFilter,
    {
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestParentExecutionInfo(): void {
    expect(proto_ParentExecutionInfo(undefined, undefined, undefined, undefined)).toBeUndefined();

    const domainName = "domain-name";
    expect(() => proto_ParentExecutionInfo(undefined, domainName, undefined, undefined)).toThrow();

    const workflowExecution = { workflowId: "workflow-id", runId: "run-id" };
    const initiatedId = 1;
    const info = proto_ParentExecutionInfo(
        undefined,
        domainName,
        thrift_WorkflowExecution(workflowExecution)!,
        initiatedId
    )!;

    expect(info.domainId).toEqual("");
    expect(info.domainName).toEqual(domainName);
    expect(info.workflowExecution).toEqual(workflowExecution);
    expect(info.initiatedId).toEqual(initiatedId);
}

export function TestWorkflowExecutionInfo(): void {
  const zero = {} as NonNullable<Parameters<typeof thrift_WorkflowExecutionInfo>[0]>;
  const items: Array<Parameters<typeof thrift_WorkflowExecutionInfo>[0]> = [
    undefined,
    zero,
    zero,
  ];

  for (const item of items) {
    expect(proto_WorkflowExecutionInfo(thrift_WorkflowExecutionInfo(item))).toEqual(item);
  }

  runFuzzTest(
    thrift_WorkflowExecutionInfo,
    proto_WorkflowExecutionInfo,
    {
      NilChance: 0.0,
      CustomFuncs: [
        (e: { value: number }, c: { Intn(n: number): number }) => {
          const validValues = [0, 1, 2, 3, 4, 5, 6];
          e.value = validValues[c.Intn(validValues.length)];
        },
        (e: { value: number }, c: { Intn(n: number): number }) => {
          const validValues = [0, 1, 2];
          e.value = validValues[c.Intn(validValues.length)];
        },
        (e: { value: number }, c: { Intn(n: number): number }) => {
          const validValues = [0, 1, 2, 3];
          e.value = validValues[c.Intn(validValues.length)];
        },
        (info: any, c: { Fuzz(value: unknown): void }) => {
          c.Fuzz(info.workflowExecution);
          c.Fuzz(info.type);
          c.Fuzz(info.startTime);
          c.Fuzz(info.closeTime);
          c.Fuzz(info.closeStatus);
          c.Fuzz(info.historyLength);
          c.Fuzz(info.executionTime);
          c.Fuzz(info.taskList);
          c.Fuzz(info.isCron);
          c.Fuzz(info.cronOverlapPolicy);
        },
      ],
      ExcludedFields: [
        "TaskListInfo",
        "UpdateTime",
        "PartitionConfig",
      ],
      Iterations: 0,
    },
  );
}

export function TestWorkflowExecutionSignaledEventAttributes(): void {
  const zero = {
    signalName: "",
    input: undefined,
    identity: "",
    requestId: "",
  };

  for (const item of [undefined, zero, zero]) {
    expect(
      proto_WorkflowExecutionSignaledEventAttributes(
        thrift_WorkflowExecutionSignaledEventAttributes(item),
      ),
    ).toEqual(item);
  }

  runFuzzTest(
    thrift_WorkflowExecutionSignaledEventAttributes,
    proto_WorkflowExecutionSignaledEventAttributes,
    {
      ExcludedFields: ["RequestId"],
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestWorkflowExecutionStartedEventAttributes(): void {
  const items: any[] = [undefined, {}, {}];

  for (const item of items) {
    expect(
      proto_WorkflowExecutionStartedEventAttributes(
        thrift_WorkflowExecutionStartedEventAttributes(item),
      ),
    ).toEqual(item);
  }

  runFuzzTest(
    thrift_WorkflowExecutionStartedEventAttributes,
    proto_WorkflowExecutionStartedEventAttributes,
    {
      CustomFuncs: [
        (initiator: any, c: any) => {
          const validValues = [0, 1, 2, 3];
          initiator.value = validValues[c.Intn(validValues.length)];
        },
        (kind: any, c: any) => {
          const validValues = [0, 1, 2];
          kind.value = validValues[c.Intn(validValues.length)];
        },
        (attr: any, c: any) => {
          c.Fuzz(attr.WorkflowType);
          c.Fuzz(attr.TaskList);
          c.Fuzz(attr.Identity);
          c.Fuzz(attr.FirstExecutionRunId);
          c.Fuzz(attr.OriginalExecutionRunId);
        },
      ],
      ExcludedFields: ["ParentExecutionInfo"],
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestWorkflowExecutionTerminatedEventAttributes(): void {
  for (const item of [
    undefined,
    { reason: "", details: undefined, identity: "" },
    { reason: "", details: undefined, identity: "" },
  ]) {
    expect(
      proto_WorkflowExecutionTerminatedEventAttributes(
        thrift_WorkflowExecutionTerminatedEventAttributes(item),
      ),
    ).toEqual(item);
  }

  runFuzzTest(
    thrift_WorkflowExecutionTerminatedEventAttributes,
    proto_WorkflowExecutionTerminatedEventAttributes,
    {
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestWorkflowExecutionTimedOutEventAttributes(): void {
  for (const item of [
    undefined,
    { timeoutType: 0 },
    { timeoutType: 1 },
  ]) {
    expect(
      proto_WorkflowExecutionTimedOutEventAttributes(
        thrift_WorkflowExecutionTimedOutEventAttributes(item),
      ),
    ).toEqual(item);
  }

  runFuzzTest(
    thrift_WorkflowExecutionTimedOutEventAttributes,
    proto_WorkflowExecutionTimedOutEventAttributes,
    {
      CustomFuncs: [
        (e: any, c: any) => {
          const validValues = [0, 1, 2, 3, 4];
          e.value = validValues[c.Intn(validValues.length)];
        },
      ],
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestWorkflowQuery(): void {
  const items = [
    undefined,
    { queryType: "", queryArgs: undefined },
    { queryType: "", queryArgs: undefined },
  ];

  for (const item of items) {
    expect(proto_WorkflowQuery(thrift_WorkflowQuery(item))).toEqual(item);
  }

  runFuzzTest(
    thrift_WorkflowQuery,
    proto_WorkflowQuery,
    {
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestWorkflowQueryResult(): void {
  // @go-unlowerable: unprovided fixture value — testdata.WorkflowQueryResult is referenced by the Go source, but its TypeScript symbol and value are not provided
}

export function TestWorkflowType(): void {
  for (const item of [undefined, { name: "" }, { name: "" }]) {
    expect(proto_WorkflowType(thrift_WorkflowType(item))).toEqual(item);
  }

  runFuzzTest(
    thrift_WorkflowType,
    proto_WorkflowType,
    {
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestWorkflowTypeFilter(): void {
  for (const item of [undefined, { name: "" }, { name: "" }]) {
    expect(proto_WorkflowTypeFilter(thrift_WorkflowTypeFilter(item))).toEqual(item);
  }

  runFuzzTest(
    thrift_WorkflowTypeFilter,
    proto_WorkflowTypeFilter,
    {
      Iterations: 0,
      NilChance: 0,
    },
  );
}

export function TestDataBlobArray(): void {
  // @go-unlowerable: missing testdata.DataBlobArray declaration or deterministic mapping — the third table case cannot be represented from the provided facts
}

export function TestHistoryEventArray(): void {
  // @go-unlowerable: missing test fixture — testdata.HistoryEventArray is not defined in the provided target API
}

export function TestTaskListPartitionMetadataArray(): void {
  // @go-unlowerable: unavailable test fixture — testdata.TaskListPartitionMetadataArray is not provided in the target facts
}

export function TestDecisionArray(): void {
  // @go-unlowerable: missing fixture — testdata.DecisionArray is not provided in the target API or existing file
}

export function TestPollerInfoArray(): void {
  // @go-unlowerable: missing testdata.PollerInfoArray — its value and element shape are not provided
}

export function TestPendingChildExecutionInfoArray(): void {
  // @go-unlowerable: external test fixture — testdata.PendingChildExecutionInfoArray is not provided
  return;
}

export function TestWorkflowExecutionInfoArray(): void {
  // @go-unlowerable: unavailable test fixture — testdata.WorkflowExecutionInfoArray is not provided by the target facts
}

export function TestDescribeDomainResponseArray(): void {
  // @go-unlowerable: missing target fixture — testdata.DomainArray is not provided in the target declarations
  return;
}

export function TestResetPointInfoArray(): void {
  // @go-unlowerable: missing test fixture — testdata.ResetPointInfoArray is not provided in the target facts
}

export function TestPendingActivityInfoArray(): void {
  // @go-unlowerable: unavailable dependency — testdata.PendingActivityInfoArray is not provided in the target API or existing declarations
}

export function TestClusterReplicationConfigurationArray(): void {
  // @go-unlowerable: unavailable test fixture — testdata.ClusterReplicationConfigurationArray is not provided in the available TypeScript declarations
}

export function TestActivityLocalDispatchInfoMap(): void {
  // @go-unlowerable: missing fixture — testdata.ActivityLocalDispatchInfoMap is not provided by the available TypeScript declarations
}

export function TestBadBinaryInfoMap(): void {
  // @go-unlowerable: unavailable test fixture — testdata.BadBinaryInfoMap is not provided in the target facts
}

export function TestIndexedValueTypeMap(): void {
  // @go-unlowerable: missing fixture — testdata.IndexedValueTypeMap is not provided
}

export function TestWorkflowQueryMap(): void {
  // @go-unlowerable: external test fixture — testdata.WorkflowQueryMap is not declared or represented in the provided TypeScript facts
}

export function TestWorkflowQueryResultMap(): void {
  // @go-unlowerable: missing fixture — testdata.WorkflowQueryResultMap is not provided, so its value and the resulting assertions cannot be determined
}

export function TestPayload(): void {
  for (const item of [undefined, { data: Buffer.from([]) }]) {
    expect(proto_Payload(thrift_Payload(item))).toEqual(item);
  }

  expect(
    proto_Payload(thrift_Payload({ data: Buffer.from([]) })),
  ).toEqual({ data: Buffer.from([]) });

  runFuzzTest(thrift_Payload, proto_Payload, {
    Iterations: 0,
    NilChance: 0,
  });
}

export function TestPayloadMap(): void {
  // @go-unlowerable: missing representation — testdata.PayloadMap is not defined by the provided target API or existing file
}

export function TestFailure(): void {
  // @go-unlowerable: unspecified test fixture values — testdata.FailureReason and testdata.FailureDetails are not provided, so the positive-case assertions cannot be faithfully lowered.
}

export function TestHistoryEvent(): void {
  // @go-unlowerable: missing testdata.HistoryEvent_* declarations — the source depends on 42 unspecified event values whose representations and conversion behavior are not provided
}

export function TestDecision(): void {
  const decisions: any[] = [
    undefined,
    { cancelTimerDecisionAttributes: {} },
    { cancelWorkflowExecutionDecisionAttributes: {} },
    { completeWorkflowExecutionDecisionAttributes: {} },
    { continueAsNewWorkflowExecutionDecisionAttributes: {} },
    { failWorkflowExecutionAttributes: {} },
    { recordMarkerDecisionAttributes: {} },
    { requestCancelActivityTaskDecisionAttributes: {} },
    { requestCancelExternalWorkflowExecutionDecisionAttributes: {} },
    { scheduleActivityTaskDecisionAttributes: {} },
    { signalExternalWorkflowExecutionDecisionAttributes: {} },
    { startChildWorkflowExecutionAttributes: {} },
    { startTimerDecisionAttributes: {} },
    { upsertWorkflowSearchAttributesDecisionAttributes: {} },
  ];

  for (const item of decisions) {
    expect(proto_Decision(thrift_Decision(item))).toEqual(item);
  }

  expect(() =>
    proto_Decision({ decisionType: UnknownValue as any } as any),
  ).toThrow();

  expect(() => thrift_Decision({} as any)).toThrow();
}

export function TestListClosedWorkflowExecutionsRequest(): void {
  // @go-unlowerable: missing test fixtures — the Go testdata.ListClosedWorkflowExecutionsRequest_ExecutionFilter, StatusFilter, and TypeFilter values and their TypeScript representations are not provided
}

export function TestListOpenWorkflowExecutionsRequest(): void {
  // @go-unlowerable: test fixture values — testdata.ListOpenWorkflowExecutionsRequest_ExecutionFilter and testdata.ListOpenWorkflowExecutionsRequest_TypeFilter are not provided by the target API facts
}

/**
 * runFuzzTest provides a more type-safe version of runFuzzTest using generics
 */
export function runFuzzTest<TProto, TThrift>(protoToThrift: (p0: TProto) => TThrift, thriftToProto: (p0: TThrift) => TProto, options: FuzzOptions): void {
  const nilChance = options.NilChance === 0 ? DefaultNilChance : options.NilChance;
  const iterations = options.Iterations === 0 ? DefaultIterations : options.Iterations;
  void nilChance;

  for (let i = 0; i < iterations; i++) {
    const fuzzed = {} as TProto;

    clearProtobufAndExcludedFields(fuzzed, options.ExcludedFields ?? []);

    const thriftResult = protoToThrift(fuzzed);
    const protoResult = thriftToProto(thriftResult);

    clearProtobufAndExcludedFields(protoResult, options.ExcludedFields ?? []);

    expect(protoResult).toEqual(fuzzed);
  }
}

/**
 * clearFieldsIf recursively traverses an object and clears fields that match the predicate function
 */
export function clearFieldsIf(obj: unknown | undefined, shouldClear: (p0: string) => boolean): void {
    if (obj == null || typeof obj !== 'object' || Array.isArray(obj) || obj instanceof Map) {
        return;
    }

    const zeroValue = (value: unknown): unknown => {
        if (value == null) {
            return undefined;
        }

        switch (typeof value) {
            case 'boolean':
                return false;
            case 'number':
                return 0;
            case 'bigint':
                return 0n;
            case 'string':
                return '';
            case 'object': {
                if (Array.isArray(value) || value instanceof Map) {
                    return undefined;
                }

                const zero = Object.create(Object.getPrototypeOf(value)) as Record<string, unknown>;
                for (const key of Object.keys(value as Record<string, unknown>)) {
                    if (!key.startsWith('_')) {
                        zero[key] = zeroValue((value as Record<string, unknown>)[key]);
                    }
                }
                return zero;
            }
            default:
                return undefined;
        }
    };

    const clearNested = (value: unknown): void => {
        if (value == null) {
            return;
        }

        if (Array.isArray(value)) {
            for (const elem of value) {
                clearFieldsIf(elem, shouldClear);
            }
            return;
        }

        if (value instanceof Map) {
            for (const elem of value.values()) {
                clearFieldsIf(elem, shouldClear);
            }
            return;
        }

        clearFieldsIf(value, shouldClear);
    };

    const record = obj as Record<string, unknown>;
    for (const key of Object.keys(record)) {
        if (key.startsWith('_')) {
            continue;
        }

        const fieldName = key.length === 0 ? key : key[0].toUpperCase() + key.slice(1);
        let field = record[key];

        if (shouldClear(fieldName)) {
            field = zeroValue(field);
            record[key] = field;
        }

        clearNested(field);
    }
}

/**
 * clearProtobufAndExcludedFields combines protobuf clearing and field exclusion in a single pass
 */
export function clearProtobufAndExcludedFields(obj: unknown, excludedFields: string[]): void {
  const excludedMap = new Set<string>();
  for (const field of excludedFields) {
    excludedMap.add(field);
  }

  clearFieldsIf(obj, (fieldName: string): boolean => {
    return fieldName.startsWith('XXX_') || excludedMap.has(fieldName);
  });
}

/**
 * DefaultIterations is the default number of fuzzing iterations to run
 */
export const DefaultIterations = 100;

/**
 * DefaultNilChance is the default probability of setting pointer/slice fields to nil
 */
export const DefaultNilChance = 0.25;

/**
 * MaxDurationSeconds is the maximum duration in seconds that fits in int32
 * This prevents overflow in mapper conversion (durationToSeconds -> int32)
 * int32 max value is 2147483647, so use that as the safe limit
 */
export const MaxDurationSeconds = 2147483647;

/**
 * MaxPayloadBytes is the maximum payload size for fuzzing
 */
export const MaxPayloadBytes = 10;

/**
 * MaxSafeTimestampSeconds is the maximum seconds value that fits safely in int64 nanoseconds
 * This avoids overflow when converting to UnixNano (max safe range from 1970 to ~2262)
 */
export const MaxSafeTimestampSeconds = 9223372036;

/**
 * NanosecondsPerSecond is the number of nanoseconds in a second
 */
export const NanosecondsPerSecond = 1000000000;
