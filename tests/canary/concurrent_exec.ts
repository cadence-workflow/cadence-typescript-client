import type { Context } from '../../src/internal/runtime/context.js';
import { Ref } from '../../src/internal/runtime/ref.js';
import type { workflow_Context } from '../../src/workflow/context.js';
import { ExecuteActivity } from '../../src/workflow/workflow.js';
import { ACTIVITY_TYPE_CONCURRENT_EXECUTION } from './constants.js';
import { withCanaryActivityOptions } from './options.js';

export const TOTAL_CONCURRENT_ACTIVITIES = 250;

export async function concurrentExecutionActivity(
  _ctx: Context,
  index: number,
): Promise<number> {
  return index;
}

export async function concurrentExecutionWorkflow(ctx: workflow_Context): Promise<void> {
  const activityCtx = withCanaryActivityOptions(ctx);
  const futures = await Promise.all(
    Array.from(
      { length: TOTAL_CONCURRENT_ACTIVITIES },
      (_, index) => ExecuteActivity(
        activityCtx,
        ACTIVITY_TYPE_CONCURRENT_EXECUTION,
        index,
      ),
    ),
  );

  const results: number[] = [];
  for (const future of futures) {
    const result = new Ref<number | undefined>(undefined);
    await future.Get(activityCtx, result);
    if (result.value === undefined) {
      throw new Error('concurrent activity returned no result');
    }
    results.push(result.value);
  }

  if (
    results.length !== TOTAL_CONCURRENT_ACTIVITIES
    || results.some((value, index) => value !== index)
  ) {
    throw new Error('concurrent activities returned unexpected results');
  }
}
