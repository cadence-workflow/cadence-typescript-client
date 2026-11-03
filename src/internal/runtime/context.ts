// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { Channel, type ReceiveChannel } from "./channel.js";

/** ctx.Err() sentinels — mirror Go's context.Canceled / context.DeadlineExceeded. */
export const ErrCanceled: Error = new globalThis.Error("context canceled");
export const ErrDeadlineExceeded: Error = new globalThis.Error("context deadline exceeded");

/**
 * Context is the faithful TypeScript port of Go's stdlib context.Context. One stable
 * type covers the roles Go's context carries:
 *   - cancellation / deadline  -> signal (a real AbortSignal; also the interop point
 *                                 for fetch(), AbortController, and timers)
 *   - cancellation wait        -> done() (a stable read-only channel, or undefined
 *                                 for a context that can never be cancelled)
 *   - error after done         -> err()   (null | ErrCanceled | ErrDeadlineExceeded)
 *   - request-scoped values    -> value() (context.WithValue / ctx.Value)
 *   - deadline introspection   -> deadline() ([nanoseconds since epoch, ok])
 *
 * NOTE: this is stdlib context only. The deterministic workflow context is a separate
 * type and must not be represented with a real AbortSignal.
 *
 * A derived context detaches from its parent when it stops. The parent signal is often a
 * shutdown signal that never fires; leaving the child linked there retains the child
 * controller and every abort listener still closed over a request entity.
 *
 * The Done channel is created lazily and closed by the signal. Value-only contexts
 * delegate done() to their parent so they preserve the same channel identity.
 */
export interface Context {
  readonly signal: AbortSignal;
  done(): ReceiveChannel<void> | undefined;
  err(): Error | null;
  value<T = unknown>(key: unknown): T | undefined;
  deadline(): [number, boolean];
}

type DoneMode = "none" | "signal" | "parent";

class ctxImpl implements Context {
  readonly signal: AbortSignal;
  private readonly parent: Context | null;
  private readonly doneMode: DoneMode;
  private readonly hasEntry: boolean;
  private readonly key: unknown;
  private readonly val: unknown;
  private readonly deadlineNs: number | null;
  private doneChannel: Channel<void> | undefined;

  constructor(opts: {
    signal: AbortSignal;
    doneMode: DoneMode;
    parent?: Context | null;
    key?: unknown;
    val?: unknown;
    hasEntry?: boolean;
    deadlineNs?: number | null;
  }) {
    this.signal = opts.signal;
    this.parent = opts.parent ?? null;
    this.doneMode = opts.doneMode;
    this.hasEntry = opts.hasEntry ?? false;
    this.key = opts.key;
    this.val = opts.val;
    this.deadlineNs = opts.deadlineNs ?? null;
  }

  done(): ReceiveChannel<void> | undefined {
    if (this.doneMode === "none") {
      return undefined;
    }
    if (this.doneMode === "parent") {
      return this.parent?.done();
    }
    if (this.doneChannel) {
      return this.doneChannel;
    }

    const done = new Channel<void>();
    this.doneChannel = done;
    if (this.signal.aborted) {
      done.close();
    } else {
      this.signal.addEventListener("abort", () => done.close(), { once: true });
    }
    return done;
  }

  err(): Error | null {
    if (this.signal.aborted) {
      return (this.signal.reason as Error) ?? ErrCanceled;
    }
    return null;
  }

  value<T = unknown>(key: unknown): T | undefined {
    if (this.hasEntry && this.key === key) {
      return this.val as T;
    }
    return this.parent ? this.parent.value<T>(key) : undefined;
  }

  deadline(): [number, boolean] {
    if (this.deadlineNs !== null) {
      return [this.deadlineNs, true];
    }
    return this.parent ? this.parent.deadline() : [0, false];
  }
}

// Go's context.Background() returns one package-level singleton — code that compares
// ctx == context.Background() (or deep-equals structs holding it) relies on that
// identity. The background context is never cancelable, so one shared instance is safe.
let backgroundSingleton: Context | undefined;

/** context.Background() / context.TODO(): a never-cancelled, empty context. */
export function background(): Context {
  if (!backgroundSingleton) {
    backgroundSingleton = new ctxImpl({
      signal: new AbortController().signal,
      doneMode: "none",
    });
  }
  return backgroundSingleton;
}

/** context.WithCancel(parent) AND context.WithCancelCause(parent): returns
 * [child context, cancel] — a Go-style 2-tuple so "ctx, cancel := context.WithCancel(p)"
 * maps to "const [ctx, cancel] = withCancel(p)", the same positional destructure used
 * for every other Go multi-return (comma-ok, error tuples).
 *
 * The cancel accepts an optional CAUSE, covering WithCancelCause with the same function:
 * `cancel(errShutdown)` records the cause as the abort reason, so a body that compares
 * `ctx.err() === errShutdown` observes it — the lowering for Go's
 * `errors.Is(context.Cause(ctx), errShutdown)`. Go keeps Err()=Canceled separate from
 * Cause(); here err() IS the cause, which is the identity every ported comparison uses.
 * A bare `cancel()` still reads as plain context.Canceled. */
export function withCancel(parent: Context): [Context, (cause?: Error | null) => void] {
  const controller = new AbortController();
  const unlink = linkParent(parent, controller);
  onAbort(controller.signal, unlink);
  const ctx = new ctxImpl({ signal: controller.signal, parent, doneMode: "signal" });
  return [
    ctx,
    (cause?: Error | null) => {
      unlink();
      controller.abort(cause ?? ErrCanceled);
    },
  ];
}

/** context.WithTimeout(parent, d): d is nanoseconds (the SDK Duration unit).
 * Returns [child context, cancel] — see withCancel for the tuple rationale. */
export function withTimeout(parent: Context, timeoutNs: number): [Context, () => void] {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(ErrDeadlineExceeded), Math.max(0, timeoutNs) / 1e6);
  const unlink = linkParent(parent, controller);
  const stop = () => {
    clearTimeout(timer);
    unlink();
  };
  onAbort(controller.signal, stop);
  const ctx = new ctxImpl({
    signal: controller.signal,
    parent,
    doneMode: "signal",
    deadlineNs: Date.now() * 1e6 + timeoutNs,
  });
  return [
    ctx,
    () => {
      stop();
      controller.abort(ErrCanceled);
    },
  ];
}

// linkParent forwards parent cancellation onto controller and returns an unlink
// that drops that listener. The closure must not live in withCancel's scope: a
// parent shutdown signal would otherwise retain the child context.
function linkParent(parent: Context, controller: AbortController): () => void {
  if (parent.signal.aborted) {
    controller.abort(parent.err() ?? ErrCanceled);
    return () => {};
  }
  const propagate = () => controller.abort(parent.err() ?? ErrCanceled);
  parent.signal.addEventListener("abort", propagate, { once: true });
  let linked = true;
  return () => {
    if (!linked) {
      return;
    }
    linked = false;
    parent.signal.removeEventListener("abort", propagate);
  };
}

function onAbort(signal: AbortSignal, stop: () => void): void {
  if (signal.aborted) {
    stop();
    return;
  }
  signal.addEventListener("abort", stop, { once: true });
}

/** context.WithDeadline(parent, t): t is nanoseconds since epoch (the SDK time.Time unit —
 * the same clock deadline() reports). Delegates to withTimeout with the remaining duration,
 * clamped at 0 so an already-passed deadline aborts immediately, exactly like Go. */
export function withDeadline(parent: Context, deadlineNs: number): [Context, () => void] {
  return withTimeout(parent, Math.max(0, deadlineNs - Date.now() * 1e6));
}

/** context.WithValue(parent, key, val): a child carrying one extra key/value. */
export function withValue(parent: Context, key: unknown, val: unknown): Context {
  return new ctxImpl({
    signal: parent.signal,
    parent,
    doneMode: "parent",
    key,
    val,
    hasEntry: true,
  });
}
