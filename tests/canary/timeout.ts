import { internal_TimeoutError } from '../../src/internal/error.js';
import type { Context } from '../../src/internal/runtime/context.js';
import { Ref } from '../../src/internal/runtime/ref.js';
import type { workflow_Context } from '../../src/workflow/context.js';
import { ExecuteActivity } from '../../src/workflow/workflow.js';
import { ACTIVITY_TYPE_TIMEOUT, SECOND } from './constants.js';
import { withCanaryActivityOptions } from './options.js';

export async function timeoutActivity(_ctx: Context): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 4_000));
}

export async function timeoutWorkflow(ctx: workflow_Context): Promise<void> {
  const activityCtx = withCanaryActivityOptions(ctx, {
    ScheduleToCloseTimeout: 2 * SECOND,
    ScheduleToStartTimeout: SECOND,
    StartToCloseTimeout: SECOND,
  });
  const future = await ExecuteActivity(activityCtx, ACTIVITY_TYPE_TIMEOUT);

  try {
    await future.Get(activityCtx, new Ref<unknown>(undefined));
  } catch (error) {
    if (error instanceof internal_TimeoutError) {
      return;
    }
    throw error;
  }
  throw new Error('expected activity to time out');
}
