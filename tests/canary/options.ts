import {
  internal_ParentClosePolicy,
  internal_WorkflowIDReusePolicy,
} from '../../src/internal/client.js';
import {
  WithActivityOptions,
  type workflow_ActivityOptions,
} from '../../src/workflow/activity_options.js';
import type { workflow_Context } from '../../src/workflow/context.js';
import { GetInfo, type workflow_ChildWorkflowOptions } from '../../src/workflow/workflow.js';
import { WithChildOptions } from '../../src/workflow/workflow_options.js';
import { ACTIVITY_TIMEOUT, CHILD_WORKFLOW_TIMEOUT, SECOND } from './constants.js';

export function withCanaryActivityOptions(
  ctx: workflow_Context,
  overrides: Partial<workflow_ActivityOptions> = {},
): workflow_Context {
  return WithActivityOptions(ctx, {
    TaskList: GetInfo(ctx).TaskListName,
    ScheduleToCloseTimeout: ACTIVITY_TIMEOUT,
    ScheduleToStartTimeout: ACTIVITY_TIMEOUT,
    StartToCloseTimeout: ACTIVITY_TIMEOUT,
    HeartbeatTimeout: 0,
    WaitForCancellation: false,
    ActivityID: '',
    ...overrides,
  });
}

export function withCanaryChildOptions(
  ctx: workflow_Context,
  workflowID: string,
  overrides: Partial<workflow_ChildWorkflowOptions> = {},
): workflow_Context {
  const info = GetInfo(ctx);
  return WithChildOptions(ctx, {
    Domain: info.Domain,
    WorkflowID: workflowID,
    TaskList: info.TaskListName,
    ExecutionStartToCloseTimeout: CHILD_WORKFLOW_TIMEOUT,
    TaskStartToCloseTimeout: 10 * SECOND,
    WaitForCancellation: false,
    WorkflowIDReusePolicy:
      internal_WorkflowIDReusePolicy.WorkflowIDReusePolicyAllowDuplicateFailedOnly,
    CronSchedule: '',
    ParentClosePolicy: internal_ParentClosePolicy.ParentClosePolicyTerminate,
    Bugports: {
      StartChildWorkflowsOnCanceledContext: false,
    },
    ...overrides,
  });
}
