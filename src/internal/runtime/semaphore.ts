// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
/*
 * GoSemaphore — SDK-owned shim for `github.com/marusama/semaphore/v2.Semaphore`.
 * =============================================================================
 * This is a RESIZABLE counting semaphore, and it tracks three separate quantities:
 *   - the LIMIT (capacity, changeable at runtime via SetLimit)
 *   - the COUNT currently acquired (GetCount)
 *   - the remainder, which is limit - count
 *
 * The nearest npm pick, async-mutex's `Semaphore`, tracks ONE number and exposes it as
 * `getValue()`/`setValue()` — the remainder. Neither the limit nor the acquired count can
 * be recovered from it once the two have diverged, so `GetLimit()` and `GetCount()` have
 * no faithful target; nor do the Go method NAMES exist there. Go's `Acquire` also takes a
 * `context.Context` and fails when that context is done, which async-mutex's `acquire`
 * has no parameter for. As with `GoClock` and `GoZapCore`, an external type with no
 * faithful npm equivalent maps to an SDK-owned target carrying the Go surface.
 *
 * Blocking and cancellation
 *   - `Acquire` is async: it parks until enough capacity exists, and the only way another
 *     coroutine can `Release` in a single-threaded host is if this one yields.
 *   - Go returns an error when the context is done first; the SDK convention is to THROW,
 *     so `Acquire` rejects with the context's own error.
 *   - The context parameter is typed permissively and read structurally. The Context shim
 *     is emitted only when the chosen policy needs it, and a dangling sibling import would
 *     break every file that touches a semaphore.
 *
 * Fairness
 *   - Waiters are served STRICTLY FIFO, matching the upstream library. A waiter that does
 *     not fit blocks the ones behind it rather than letting a smaller later request jump
 *     the queue, so a large acquire cannot be starved by a stream of small ones.
 */

/** The part of the SDK's stdlib Context this shim reads, kept structural on purpose. */
export interface GoSemaphoreContext {
  readonly signal?: { aborted: boolean; reason?: unknown; addEventListener?: unknown; removeEventListener?: unknown };
  err?: () => Error | null;
}

export interface GoSemaphore {
  Acquire(ctx: unknown, n: number): Promise<void>;
  TryAcquire(n: number): boolean;
  Release(n: number): void;
  SetLimit(limit: number): void;
  GetLimit(): number;
  GetCount(): number;
}

interface goSemaphoreWaiter {
  n: number;
  resolve: () => void;
  reject: (err: Error) => void;
  detach: () => void;
}

// The error a cancelled Acquire reports when the context carries none of its own.
const goSemaphoreCanceled: Error = new globalThis.Error('context canceled');

function goSemaphoreContextError(ctx: unknown): Error {
  const c = (ctx ?? {}) as GoSemaphoreContext;
  const own = typeof c.err === 'function' ? c.err() : null;
  if (own instanceof globalThis.Error) {
    return own;
  }
  const reason = c.signal?.reason;
  return reason instanceof globalThis.Error ? reason : goSemaphoreCanceled;
}

function goSemaphoreAborted(ctx: unknown): boolean {
  const c = (ctx ?? {}) as GoSemaphoreContext;
  if (c.signal?.aborted === true) {
    return true;
  }
  return typeof c.err === 'function' && c.err() != null;
}

class goSemaphore implements GoSemaphore {
  private count = 0;
  private readonly waiters: goSemaphoreWaiter[] = [];

  constructor(private limit: number) {}

  GetLimit(): number {
    return this.limit;
  }

  GetCount(): number {
    return this.count;
  }

  TryAcquire(n: number): boolean {
    // A pending waiter has priority: granting past it would break FIFO and could starve it.
    if (this.waiters.length > 0 || this.count + n > this.limit) {
      return false;
    }
    this.count += n;
    return true;
  }

  Acquire(ctx: unknown, n: number): Promise<void> {
    if (goSemaphoreAborted(ctx)) {
      return Promise.reject(goSemaphoreContextError(ctx));
    }
    if (this.waiters.length === 0 && this.count + n <= this.limit) {
      this.count += n;
      return Promise.resolve();
    }
    return new Promise<void>((resolve, reject) => {
      const waiter: goSemaphoreWaiter = { n, resolve, reject, detach: (): void => undefined };
      const signal = ((ctx ?? {}) as GoSemaphoreContext).signal;
      if (signal !== undefined && typeof signal.addEventListener === 'function') {
        const target = signal as unknown as {
          addEventListener(t: string, l: () => void): void;
          removeEventListener(t: string, l: () => void): void;
        };
        const onAbort = (): void => {
          this.remove(waiter);
          reject(goSemaphoreContextError(ctx));
        };
        target.addEventListener('abort', onAbort);
        waiter.detach = (): void => target.removeEventListener('abort', onAbort);
      }
      this.waiters.push(waiter);
    });
  }

  // Go PANICS when a release would return more permits than are held — an over-release is
  // a bookkeeping bug in the caller, not a state to absorb. Clamping instead would let the
  // count drift silently and hand out permits the limit never authorized, so this throws.
  Release(n: number): void {
    if (n > this.count) {
      throw new globalThis.Error('semaphore: released more than held');
    }
    this.count -= n;
    this.drain();
  }

  SetLimit(limit: number): void {
    this.limit = limit;
    this.drain();
  }

  private remove(w: goSemaphoreWaiter): void {
    const i = this.waiters.indexOf(w);
    if (i >= 0) {
      this.waiters.splice(i, 1);
    }
  }

  // FIFO: stop at the first waiter that does not fit rather than skipping over it.
  private drain(): void {
    while (this.waiters.length > 0) {
      const next = this.waiters[0];
      if (this.count + next.n > this.limit) {
        return;
      }
      this.waiters.shift();
      this.count += next.n;
      next.detach();
      next.resolve();
    }
  }
}

/*
 * NewSemaphore — the lowering for `semaphore.New(limit)`.
 * =======================================================
 * Named for the type rather than transcribing Go's bare `New`: a one-word `New` collides
 * with every other package's constructor once the qualifier is gone, and an emitted body
 * that calls a bare `New` binds to whichever project module exports that name.
 */
export function NewSemaphore(limit: number): GoSemaphore {
  return new goSemaphore(limit);
}
