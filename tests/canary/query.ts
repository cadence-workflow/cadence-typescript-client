import type { client_Client } from '../../src/client/client.js';
import type { Context } from '../../src/internal/runtime/context.js';
import { background } from '../../src/internal/runtime/context.js';
import { Ref } from '../../src/internal/runtime/ref.js';
import type { workflow_Context } from '../../src/workflow/context.js';
import {
  ExecuteActivity,
  GetInfo,
  SetQueryHandler,
} from '../../src/workflow/workflow.js';
import {
  ACTIVITY_TYPE_QUERY_ONE,
  ACTIVITY_TYPE_QUERY_TWO,
} from './constants.js';
import { withCanaryActivityOptions } from './options.js';

export const CANARY_QUERY_TYPE = 'canary-query-status';
export const QUERY_STATUS_STARTED = 'started';
export const QUERY_STATUS_CLOSE_TO_FINISHED = 'close-to-finished';

export type QueryStatusActivity = (
  ctx: Context,
  workflowID: string,
  runID: string,
) => Promise<string>;

export interface QueryStatusActivities {
  queryStatusOneActivity: QueryStatusActivity;
  queryStatusTwoActivity: QueryStatusActivity;
}

export function createQueryStatusActivities(client: client_Client): QueryStatusActivities {
  return {
    queryStatusOneActivity: async function queryStatusOneActivity(
      _ctx: Context,
      workflowID: string,
      runID: string,
    ): Promise<string> {
      return queryWorkflowStatus(client, workflowID, runID);
    },
    queryStatusTwoActivity: async function queryStatusTwoActivity(
      _ctx: Context,
      workflowID: string,
      runID: string,
    ): Promise<string> {
      return queryWorkflowStatus(client, workflowID, runID);
    },
  };
}

export async function queryWorkflow(ctx: workflow_Context): Promise<void> {
  let status = QUERY_STATUS_STARTED;
  await SetQueryHandler(ctx, CANARY_QUERY_TYPE, () => status);

  const info = GetInfo(ctx);
  const activityCtx = withCanaryActivityOptions(ctx);
  const firstStatus = await executeStatusQuery(
    activityCtx,
    ACTIVITY_TYPE_QUERY_ONE,
    info.WorkflowExecution.ID,
    info.WorkflowExecution.RunID,
  );
  if (firstStatus !== status) {
    throw new Error(`expected query status ${JSON.stringify(status)}, got ${JSON.stringify(firstStatus)}`);
  }

  status = QUERY_STATUS_CLOSE_TO_FINISHED;
  const secondStatus = await executeStatusQuery(
    activityCtx,
    ACTIVITY_TYPE_QUERY_TWO,
    info.WorkflowExecution.ID,
    info.WorkflowExecution.RunID,
  );
  if (secondStatus !== status) {
    throw new Error(`expected query status ${JSON.stringify(status)}, got ${JSON.stringify(secondStatus)}`);
  }
}

async function queryWorkflowStatus(
  client: client_Client,
  workflowID: string,
  runID: string,
): Promise<string> {
  const value = await client.QueryWorkflow(
    background(),
    workflowID,
    runID,
    CANARY_QUERY_TYPE,
  );
  const result = new Ref<string | undefined>(undefined);
  value.Get(result);
  if (result.value === undefined) {
    throw new Error('query returned no result');
  }
  return result.value;
}

async function executeStatusQuery(
  ctx: workflow_Context,
  activityType: string,
  workflowID: string,
  runID: string,
): Promise<string> {
  const future = await ExecuteActivity(ctx, activityType, workflowID, runID);
  const result = new Ref<string | undefined>(undefined);
  await future.Get(ctx, result);
  if (result.value === undefined) {
    throw new Error(`${activityType} returned no result`);
  }
  return result.value;
}
