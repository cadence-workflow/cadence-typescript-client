import { GetInfo as getActivityInfo } from '../../src/activity/activity.js';
import type { internal_RetryPolicy } from '../../src/internal/client.js';
import type { Context } from '../../src/internal/runtime/context.js';
import { Ref } from '../../src/internal/runtime/ref.js';
import type { workflow_Context } from '../../src/workflow/context.js';
import { ExecuteActivity } from '../../src/workflow/workflow.js';
import {
  ACTIVITY_TYPE_RETRY_ON_FAILURE,
  ACTIVITY_TYPE_RETRY_ON_TIMEOUT,
  SECOND,
} from './constants.js';
import { withCanaryActivityOptions } from './options.js';

const RETRY_POLICY: internal_RetryPolicy = {
  InitialInterval: SECOND,
  BackoffCoefficient: 1,
  MaximumInterval: SECOND,
  ExpirationInterval: 0,
  MaximumAttempts: 5,
  NonRetriableErrorReasons: [],
};

export async function retryOnTimeoutActivity(ctx: Context): Promise<number> {
  const attempt = getActivityInfo(ctx).Attempt;
  if (attempt < 2) {
    await new Promise((resolve) => setTimeout(resolve, 2_000));
  }
  return attempt * 100;
}

export async function retryOnFailureActivity(ctx: Context): Promise<number> {
  const attempt = getActivityInfo(ctx).Attempt;
  if (attempt < 3) {
    throw new Error('retry me');
  }
  return attempt;
}

export async function retryWorkflow(ctx: workflow_Context): Promise<void> {
  const timeoutCtx = withCanaryActivityOptions(ctx, {
    ScheduleToCloseTimeout: 30 * SECOND,
    StartToCloseTimeout: SECOND,
    RetryPolicy: RETRY_POLICY,
  });
  const failureCtx = withCanaryActivityOptions(ctx, {
    ScheduleToCloseTimeout: 30 * SECOND,
    StartToCloseTimeout: 5 * SECOND,
    RetryPolicy: RETRY_POLICY,
  });

  const [timeoutFuture, failureFuture] = await Promise.all([
    ExecuteActivity(
      timeoutCtx,
      ACTIVITY_TYPE_RETRY_ON_TIMEOUT,
    ),
    ExecuteActivity(
      failureCtx,
      ACTIVITY_TYPE_RETRY_ON_FAILURE,
    ),
  ]);

  const timeoutResult = new Ref<number | undefined>(undefined);
  const failureResult = new Ref<number | undefined>(undefined);
  await timeoutFuture.Get(timeoutCtx, timeoutResult);
  await failureFuture.Get(failureCtx, failureResult);

  if (timeoutResult.value === undefined || timeoutResult.value < 200) {
    throw new Error(`unexpected timeout retry result: ${String(timeoutResult.value)}`);
  }
  if (failureResult.value === undefined || failureResult.value < 3) {
    throw new Error(`unexpected failure retry result: ${String(failureResult.value)}`);
  }
}
