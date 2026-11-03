// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { workflowTask } from './internal_task_handlers.js';
import { localActivityResult } from './internal_task_pollers.js';
import { IHistory as shared_IHistory } from '../generated/thrift/cadence-idl/com/uber/cadence/History.js';
import { IPollForActivityTaskResponse as shared_IPollForActivityTaskResponse } from '../generated/thrift/cadence-idl/com/uber/cadence/PollForActivityTaskResponse.js';
import { IPollForDecisionTaskResponse as shared_IPollForDecisionTaskResponse } from '../generated/thrift/cadence-idl/com/uber/cadence/PollForDecisionTaskResponse.js';

export interface ActivityTaskHandler {
  Execute(taskList: string, task: shared_IPollForActivityTaskResponse): Promise<unknown>;
}

export interface HistoryIterator {
  GetNextPage(): Promise<shared_IHistory>;
  Reset(): void;
  HasNextPage(): boolean;
}

export interface WorkflowExecutionContext {
  Lock(): void;
  Unlock(err: Error | null): void;
  ProcessWorkflowTask(workflowTask: workflowTask): unknown;
  ProcessLocalActivityResult(workflowTask: workflowTask, lar: localActivityResult): unknown;
  CompleteDecisionTask(workflowTask: workflowTask, waitLocalActivity: boolean): unknown;
  GetDecisionTimeout(): number;
  GetCurrentDecisionTask(): shared_IPollForDecisionTaskResponse;
  IsDestroyed(): boolean;
  StackTrace(): string;
}

export interface WorkflowTaskHandler {
  ProcessWorkflowTask(task: workflowTask, f: decisionHeartbeatFunc): Promise<unknown | undefined>;
}

export type decisionHeartbeatFunc = (p0: unknown, p1: number) => workflowTask | undefined | Promise<workflowTask | undefined>;

/**
 * EnableVerboseLogging enable or disable verbose logging. This is for internal use only.
 */
export function EnableVerboseLogging(enable: boolean): void {
  enableVerboseLogging = enable;
}

export let enableVerboseLogging = false;
