// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { ExponentialRetryPolicy, NewExponentialRetryPolicy } from './common/backoff/retrypolicy.js';
import { Context } from './runtime/context.js';
import { Retry } from './common/backoff/retry.js';
import { errShutdown } from './internal_worker_base.js';
import { AccessDeniedError, BadRequestError, CancellationAlreadyRequestedError, ClientVersionNotSupportedError, DomainAlreadyExistsError, DomainNotActiveError, EntityNotExistsError, FeatureNotEnabledError, LimitExceededError, QueryFailedError, ServiceBusyError, WorkflowExecutionAlreadyCompletedError, WorkflowExecutionAlreadyStartedError } from '../errors/idl_errors.js';

/**
 * Creates a retry policy which allows appropriate retries for the deadline passed in as context.
 * It uses the context deadline to set MaxInterval as 1/10th of context timeout
 * MaxInterval = Max(context_timeout/10, 20ms)
 * defaults to ExpirationInterval of 60 seconds, or uses context deadline as expiration interval
 */
export function createDynamicServiceRetryPolicy(ctx: Context | undefined): ExponentialRetryPolicy {
  let timeout = retryServiceOperationExpirationInterval;
  if (ctx != null) {
    const now = Date.now() * 1_000_000;
    const [expiration, ok] = ctx.deadline();
    if (ok && expiration > now) {
      timeout = expiration - now;
    }
  }

  const initialInterval = retryServiceOperationInitialInterval;
  let maximumInterval = Math.trunc(timeout / 10);
  if (maximumInterval < retryServiceOperationInitialInterval) {
    maximumInterval = retryServiceOperationInitialInterval;
  }

  const policy = NewExponentialRetryPolicy(initialInterval);
  policy.SetBackoffCoefficient(retryServiceOperationBackoff);
  policy.SetMaximumInterval(maximumInterval);
  policy.SetExpirationInterval(timeout);
  return policy;
}

export function isServiceTransientError(err: Error | null): boolean {
    if (err instanceof AccessDeniedError) {
        return false;
    }
    if (err instanceof BadRequestError) {
        return false;
    }
    if (err instanceof CancellationAlreadyRequestedError) {
        return false;
    }
    if (err instanceof ClientVersionNotSupportedError) {
        return false;
    }
    if (err instanceof DomainAlreadyExistsError) {
        return false;
    }
    if (err instanceof DomainNotActiveError) {
        return false;
    }
    if (err instanceof EntityNotExistsError) {
        return false;
    }
    if (err instanceof FeatureNotEnabledError) {
        return false;
    }
    if (err instanceof LimitExceededError) {
        return false;
    }
    if (err instanceof QueryFailedError) {
        return false;
    }
    if (err instanceof WorkflowExecutionAlreadyCompletedError) {
        return false;
    }
    if (err instanceof WorkflowExecutionAlreadyStartedError) {
        return false;
    }
    if (err === errShutdown) {
        return false;
    }
    if (err instanceof ServiceBusyError) {
        return true;
    }
    return true;
}

export async function retryWhileTransientError(ctx: Context, fn: () => void | Promise<void>): Promise<void> {
  await Retry(ctx, fn, createDynamicServiceRetryPolicy(ctx), isServiceTransientError);
}

export const retryServiceOperationBackoff = 1.2;

export const retryServiceOperationExpirationInterval = 60000000000;

export const retryServiceOperationInitialInterval = 20000000;
