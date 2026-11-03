import { internal_RetryPolicy } from './client.js';

/**
 * BackfillInfo describes a single active or completed backfill operation.
 */
export interface internal_BackfillInfo {
  BackfillID: string;
  StartTime: number;
  EndTime: number;
  RunsCompleted: number;
  RunsTotal: number;
}

/**
 * BackfillRequest triggers workflow runs for a historical time range.
 */
export interface internal_BackfillRequest {
  StartTime: number;
  EndTime: number;
  OverlapPolicy: internal_ScheduleOverlapPolicy;
  BackfillID: string;
}

/**
 * CreateScheduleRequest is the request to ScheduleClient.Create.
 */
export interface internal_CreateScheduleRequest {
  ScheduleID: string;
  Spec?: internal_ScheduleSpec;
  Action?: internal_ScheduleAction;
  Policies?: internal_SchedulePolicies;
  Memo?: Record<string, unknown>;
  SearchAttributes?: Record<string, unknown>;
}

/**
 * DescribeScheduleResponse is returned by ScheduleClient.Describe.
 */
export interface internal_DescribeScheduleResponse {
  Spec?: internal_ScheduleSpec;
  Action?: internal_ScheduleActionDescription;
  Policies?: internal_SchedulePolicies;
  State?: internal_ScheduleState;
  Info?: internal_ScheduleInfo;
  Memo?: Record<string, Buffer>;
  SearchAttributes?: Record<string, Buffer>;
}

/**
 * ListSchedulesResponse is returned by ScheduleClient.List.
 */
export interface internal_ListSchedulesResponse {
  Schedules?: internal_ScheduleListEntry[];
  NextPageToken?: Buffer;
}

/**
 * ScheduleAction defines what the schedule does when it triggers (request-side / write).
 * Currently only StartWorkflow is supported.
 */
export interface internal_ScheduleAction {
  StartWorkflow?: internal_ScheduleStartWorkflowAction;
}

/**
 * ScheduleActionDescription is the describe (read) counterpart of ScheduleAction.
 */
export interface internal_ScheduleActionDescription {
  StartWorkflow?: internal_ScheduleStartWorkflowActionDescription;
}

/**
 * ScheduleCatchUpPolicy controls how missed runs are handled when a schedule resumes after being paused.
 */
export enum internal_ScheduleCatchUpPolicy {
  ScheduleCatchUpPolicyUnspecified = 0,
  ScheduleCatchUpPolicySkip = 1,
  ScheduleCatchUpPolicyOne = 2,
  ScheduleCatchUpPolicyAll = 3,
}

/**
 * ScheduleInfo contains runtime statistics for a schedule.
 */
export interface internal_ScheduleInfo {
  LastRunTime: number;
  NextRunTime: number;
  TotalRuns: number;
  CreateTime: number;
  LastUpdateTime: number;
  OngoingBackfills?: internal_BackfillInfo[];
}

/**
 * ScheduleListEntry is a summary of a schedule returned by ScheduleClient.List.
 */
export interface internal_ScheduleListEntry {
  ScheduleID: string;
  WorkflowType: string;
  State?: internal_ScheduleState;
  CronExpression: string;
}

/**
 * ScheduleOverlapPolicy defines behavior when a new run is triggered while a previous run is still active.
 */
export enum internal_ScheduleOverlapPolicy {
  ScheduleOverlapPolicyUnspecified = 0,
  ScheduleOverlapPolicySkipNew = 1,
  ScheduleOverlapPolicyBuffer = 2,
  ScheduleOverlapPolicyConcurrent = 3,
  ScheduleOverlapPolicyCancelPrevious = 4,
  ScheduleOverlapPolicyTerminatePrevious = 5,
}

/**
 * SchedulePauseInfo records when and why a schedule was paused.
 */
export interface internal_SchedulePauseInfo {
  Reason: string;
  PausedAt: number;
  PausedBy: string;
}

/**
 * SchedulePolicies controls the runtime behavior of a schedule.
 */
export interface internal_SchedulePolicies {
  OverlapPolicy: internal_ScheduleOverlapPolicy;
  CatchUpPolicy: internal_ScheduleCatchUpPolicy;
  CatchUpWindow: number;
  PauseOnFailure: boolean;
  BufferLimit: number;
  ConcurrencyLimit: number;
}

/**
 * ScheduleSpec defines when a schedule triggers.
 */
export interface internal_ScheduleSpec {
  CronExpression: string;
  StartTime: number;
  EndTime: number;
  Jitter: number;
}

/**
 * ScheduleStartWorkflowAction describes the workflow to start when the schedule triggers.
 * This is the request-side (write) type: Memo/SearchAttributes are native Go values that
 * the SDK encodes for you. The describe (read) counterpart is
 * ScheduleStartWorkflowActionDescription, which returns them as raw bytes.
 */
export interface internal_ScheduleStartWorkflowAction {
  WorkflowType: string;
  TaskList: string;
  Input?: Buffer;
  WorkflowIDPrefix: string;
  ExecutionStartToCloseTimeout: number;
  DecisionTaskStartToCloseTimeout: number;
  RetryPolicy?: internal_RetryPolicy;
  Memo?: Record<string, unknown>;
  SearchAttributes?: Record<string, unknown>;
}

/**
 * ScheduleStartWorkflowActionDescription is the describe (read) counterpart of
 * ScheduleStartWorkflowAction. Memo/SearchAttributes are returned as raw encoded bytes —
 * exactly as the server stores them — for you to decode with your DataConverter. The
 * request-side type takes native values that the SDK encodes for you.
 */
export interface internal_ScheduleStartWorkflowActionDescription {
  WorkflowType: string;
  TaskList: string;
  Input?: Buffer;
  WorkflowIDPrefix: string;
  ExecutionStartToCloseTimeout: number;
  DecisionTaskStartToCloseTimeout: number;
  RetryPolicy?: internal_RetryPolicy;
  Memo?: Record<string, Buffer>;
  SearchAttributes?: Record<string, Buffer>;
}

/**
 * ScheduleState is the runtime pause/unpause state of a schedule.
 */
export interface internal_ScheduleState {
  Paused: boolean;
  PauseInfo?: internal_SchedulePauseInfo;
}

/**
 * UpdateScheduleRequest is the request to ScheduleClient.Update.
 * Only non-nil fields are applied at the top level; nil fields leave the existing value unchanged.
 * Note: when Action is non-nil, the entire StartWorkflow configuration is replaced — it is not
 * merged with the existing action. All fields of ScheduleStartWorkflowAction must be provided,
 * including those you are not changing (e.g. TaskList, ExecutionStartToCloseTimeout, RetryPolicy).
 * Call Describe first to read the current values if you need to preserve them.
 */
export interface internal_UpdateScheduleRequest {
  ScheduleID: string;
  Spec?: internal_ScheduleSpec;
  Action?: internal_ScheduleAction;
  Policies?: internal_SchedulePolicies;
  SearchAttributes?: Record<string, unknown>;
}
