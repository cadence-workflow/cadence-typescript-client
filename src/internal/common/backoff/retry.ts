// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { Mutex } from 'async-mutex';
import { Retrier, backoff_RetryPolicy, NewRetrier, SystemClock, done } from './retrypolicy.js';
import { Context } from '../../runtime/context.js';
import { Second } from '../../runtime/time.js';
import { mapCase, recvCase, selectOne, timeoutCase } from '../../runtime/select.js';
import { ServiceBusyError } from '../../../errors/idl_errors.js';

/**
 * IsRetryable handler can be used to exclude certain errors during retry
 */
export type IsRetryable = (p0: Error | null) => boolean;

/**
 * Operation to retry
 */
export type Operation = () => void | Promise<void>;

/**
 * ConcurrentRetrier is used for client-side throttling. It determines whether to
 * throttle outgoing traffic in case downstream backend server rejects
 * requests due to out-of-quota or server busy errors.
 */
export class ConcurrentRetrier {
  constructor(init?: Partial<ConcurrentRetrier>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  Mutex: Mutex = new Mutex();

  retrier?: Retrier;

  failureCount: number = 0;

  async Throttle(): Promise<void> {
    await this.throttleInternal();
  }

  async throttleInternal(): Promise<number> {
    let next = done;

    await this.Lock();
    if (this.failureCount > 0) {
      next = this.retrier!.NextBackOff();
    }
    this.Unlock();

    if (next !== done) {
      await new Promise<void>((resolve) => setTimeout(resolve, next / 1e6));
    }

    return next;
  }

  async Succeeded(): Promise<void> {
    try {
      await this.Lock();
      this.failureCount = 0;
      this.retrier!.Reset();
    } finally {
      this.Unlock();
    }
  }

  async Failed(): Promise<void> {
    try {
      await this.Lock();
      this.failureCount++;
    } finally {
      this.Unlock();
    }
  }

  async Lock(): Promise<void> {
    await this.Mutex.acquire();
  }

  TryLock(): boolean {
    if (this.Mutex.isLocked()) {
      return false;
    }
    void this.Mutex.acquire();
    return true;
  }

  Unlock(): void {
    this.Mutex.release();
  }

}

/**
 * NewConcurrentRetrier returns an instance of concurrent backoff retrier.
 */
export function NewConcurrentRetrier(retryPolicy: backoff_RetryPolicy): ConcurrentRetrier {
  const retrier = NewRetrier(retryPolicy, SystemClock);
  return new ConcurrentRetrier({ retrier, Mutex: new Mutex(), failureCount: 0 });
}

/**
 * Retry function can be used to wrap any call with retry logic using the passed in policy
 */
export async function Retry(ctx: Context, operation: Operation, policy: backoff_RetryPolicy, isRetriable: IsRetryable): Promise<void> {
  let err: Error | null = null;
  let next = 0;

  const r = NewRetrier(policy, SystemClock);

  for (;;) {
    try {
      await operation();
      err = null;
    } catch (e) {
      if (!(e instanceof Error)) {
        throw e;
      }
      err = e;
    }

    if (err == null) {
      return;
    }

    next = r.NextBackOff();
    if (next === done) {
      throw err;
    }

    if (!isRetriable(err)) {
      throw err;
    }

    const retryAfter = ErrRetryableAfter(err);
    next += retryAfter;

    if (ctx.err() != null) {
      throw err;
    }

    const ctxDone = ctx.done();
    if (ctxDone != null) {
      const cancelled = await selectOne([
        mapCase(recvCase(ctxDone), () => true),
        mapCase(timeoutCase(next), () => false),
      ]);

      if (cancelled) {
        throw err;
      }

      continue;
    }

    await new Promise<void>((resolve) => {
      setTimeout(resolve, next / 1e6);
    });
  }
}

/**
 * ErrRetryableAfter returns a minimum delay until the next attempt.
 * 
 * for most errors this will be 0, and normal backoff logic will determine
 * the full retry period, but e.g. service busy errors (or any case where the
 * server knows a "time until it is not useful to retry") are safe to assume
 * that a literally immediate retry is *not* going to be useful.
 * 
 * note that this is only a minimum, however.  longer delays are assumed to
 * be equally valid.
 */
export function ErrRetryableAfter(err: Error | null): number {
    if (err instanceof ServiceBusyError) {
        return Second;
    }
    return 0;
}
