// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { Mutex } from 'async-mutex';
import { internal_Channel, NewSelector, NewNamedChannel } from './workflow.js';
import { NewCanceledError, NewTimeoutError } from './error.js';
import { TimeoutType as shared_TimeoutType } from '../generated/thrift/cadence-idl/com/uber/cadence/TimeoutType.js';

export interface canceler {
  cancel(removeFromParent: boolean, err: Error | null): Promise<void>;
  Done(): internal_Channel;
}

/**
 * A CancelFunc tells an operation to abandon its work.
 * A CancelFunc does not wait for the work to stop.
 * After the first call, subsequent calls to a CancelFunc do nothing.
 */
export type internal_CancelFunc = () => void | Promise<void>;

export interface internal_Context {
  Deadline(): [number, boolean];
  Done(): internal_Channel;
  Err(): Error | null;
  Value(key: unknown): unknown;
}

/**
 * An emptyCtx is never canceled, has no values, and has no deadline.  It is not
 * struct{}, since vars of this type must have distinct addresses.
 */
export class emptyCtx implements internal_Context {
  constructor(public value: number = 0) {}

  Deadline(): [number, boolean] {
    return [0, false];
  }

  Done(): internal_Channel {
    return null as unknown as internal_Channel;
  }

  Err(): Error | null {
    return null;
  }

  Value(key: unknown): unknown | undefined {
    return undefined;
  }

  String(): string {
    if (this === background) {
      return "context.Background";
    }
    if (this === todo) {
      return "context.TODO";
    }
    return "unknown empty Context";
  }

}

/**
 * A cancelCtx can be canceled.  When canceled, it also cancels any children
 * that implement canceler.
 */
export class cancelCtx implements internal_Context, canceler {
  constructor(init?: Partial<cancelCtx>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  Context?: internal_Context;

  done?: internal_Channel;

  cancelLock: Mutex = new Mutex();

  canceled: boolean = false;

  childrenLock: Mutex = new Mutex();

  children: canceler[] = [];

  err?: Error | null;

  Done(): internal_Channel {
    return this.done!;
  }

  Err(): Error | null {
    return this.err!;
  }

  String(): string {
    const contextString =
      typeof (this.Context! as { String?: () => string }).String === "function"
        ? (this.Context! as { String?: () => string }).String!()
        : globalThis.String(this.Context!);
    return `${contextString}.WithCancel`;
  }

  async getChildren(): Promise<canceler[]> {
    const release = await this.childrenLock.acquire();
    try {
      return [...this.children];
    } finally {
      release();
    }
  }

  async cancel(removeFromParent: boolean, err: Error | null): Promise<void> {
    await this.cancelLock.acquire();
    if (this.canceled) {
      this.cancelLock.release();
      return;
    }
    this.canceled = true;

    if (err == null) {
      throw "context: internal error: missing cancel error";
    }
    if (this.err != null) {
      this.cancelLock.release();
      return;
    }
    this.err = err;
    this.cancelLock.release();

    this.done!.Close();

    const children = await this.getChildren();
    for (const child of children) {
      await child.cancel(false, err);
    }

    await this.childrenLock.acquire();
    this.children = [];
    this.childrenLock.release();

    if (removeFromParent) {
      removeChild(this.Context!, this);
    }
  }

  Deadline(): [number, boolean] {
    return this.Context!.Deadline();
  }

  Value(key: unknown): unknown {
    return this.Context!.Value(key);
  }

}

/**
 * A valueCtx carries a key-value pair.  It implements Value for that key and
 * delegates all other calls to the embedded Context.
 */
export class valueCtx implements internal_Context {
  constructor(init?: Partial<valueCtx>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  Context?: internal_Context;

  key?: unknown;

  val?: unknown;

  String(): string {
    return `${typeof (this.Context! as { String?: () => string }).String === "function" ? (this.Context! as { String?: () => string }).String!() : globalThis.String(this.Context!)}.WithValue(${globalThis.String(this.key!)}, ${globalThis.String(this.val!)})`;
  }

  Value(key: unknown): unknown {
    if (this.key! === key) {
      return this.val!;
    }
    return this.Context!.Value(key);
  }

  Deadline(): [number, boolean] {
    return this.Context!.Deadline();
  }

  Done(): internal_Channel {
    return this.Context!.Done();
  }

  Err(): Error | null {
    return this.Context!.Err();
  }

}

/**
 * Background returns a non-nil, empty Context. It is never canceled, has no
 * values, and has no deadline
 */
export function Background(): internal_Context {
  return background;
}

/**
 * WithCancel returns a copy of parent with a new Done channel. The returned
 * context's Done channel is closed when the returned cancel function is called
 * or when the parent context's Done channel is closed, whichever happens first.
 * 
 * Canceling this context releases resources associated with it, so code should
 * call cancel as soon as the operations running in this Context complete.
 */
export async function WithCancel(parent: internal_Context): Promise<[internal_Context, internal_CancelFunc]> {
  const c = newCancelCtx(parent);
  await propagateCancel(parent, c);
  return [c, async () => {
    await c.cancel(true, ErrCanceled);
  }];
}

/**
 * NewDisconnectedContext returns a new context that won't propagate parent's cancellation to the new child context.
 * One common use case is to do cleanup work after workflow is cancelled.
 * 
 * 	err := workflow.ExecuteActivity(ctx, ActivityFoo).Get(ctx, &activityFooResult)
 * 	if err != nil && cadence.IsCanceledError(ctx.Err()) {
 * 	  // activity failed, and workflow context is canceled
 * 	  disconnectedCtx, _ := workflow.newDisconnectedContext(ctx);
 * 	  workflow.ExecuteActivity(disconnectedCtx, handleCancellationActivity).Get(disconnectedCtx, nil)
 * 	  return err // workflow return CanceledError
 * 	}
 */
export async function NewDisconnectedContext(parent: internal_Context): Promise<[internal_Context, internal_CancelFunc]> {
  const c = newCancelCtx(parent);
  return [c, async () => {
    await c.cancel(true, ErrCanceled);
  }];
}

/**
 * newCancelCtx returns an initialized cancelCtx.
 */
export function newCancelCtx(parent: internal_Context): cancelCtx {
  return new cancelCtx({
    Context: parent,
    done: NewNamedChannel(parent, "cancelCtx-done-channel"),
    cancelLock: new Mutex(),
    canceled: false,
    children: [],
    childrenLock: new Mutex(),
  });
}

/**
 * propagateCancel arranges for child to be canceled when parent is.
 */
export async function propagateCancel(parent: internal_Context, child: canceler): Promise<void> {
  if (parent.Done() == null) {
    return;
  }

  const [p, ok] = parentCancelCtx(parent);
  if (ok) {
    const releaseCancelLock = await p!.cancelLock.acquire();
    try {
      const err = p!.err;
      if (err != null) {
        releaseCancelLock();
        await child.cancel(false, err);
      } else {
        const releaseChildrenLock = await p!.childrenLock.acquire();
        try {
          p!.children.push(child);
        } finally {
          releaseChildrenLock();
        }
        releaseCancelLock();
      }
    } catch (err) {
      releaseCancelLock();
      throw err;
    }
  } else {
    void (async () => {
      const s = NewSelector(parent);
      s.AddReceive(parent.Done(), async (_c, _more) => {
        await child.cancel(false, parent.Err());
      });
      s.AddReceive(child.Done(), (_c, _more) => {});
      await s.Select(parent);
    })();
  }
}

/**
 * parentCancelCtx follows a chain of parent references until it finds a
 * *cancelCtx.  This function understands how each of the concrete types in this
 * package represents its parent.
 */
export function parentCancelCtx(parent: internal_Context): [cancelCtx | undefined, boolean] {
  while (true) {
    if (parent instanceof cancelCtx) {
      return [parent, true];
    }

    if (parent instanceof valueCtx) {
      parent = parent.Context!;
      continue;
    }

    return [undefined, false];
  }
}

/**
 * removeChild removes a context from its parent.
 */
export function removeChild(parent: internal_Context, child: canceler): void {
  const [p, ok] = parentCancelCtx(parent);
  if (!ok || p == null) {
    return;
  }

  if (p.children != null) {
    removeChildFromSlice(p.children, child);
  }
}

/**
 * Helper to remove a child from a context's canceler list.
 * There should only ever be one instance per list due to code elsewhere,
 * but this func does not check or enforce that.
 */
export function removeChildFromSlice(children: canceler[], child: canceler): canceler[] {
  let found = -1;
  for (let idx = 0; idx < children.length; idx++) {
    const c = children[idx];
    if (c === child) {
      found = idx;
      break;
    }
  }
  if (found >= 0) {
    children = children.slice(0, found).concat(children.slice(found + 1));
  }
  return children;
}

/**
 * WithValue returns a copy of parent in which the value associated with key is
 * val.
 * 
 * Use context Values only for request-scoped data that transits processes and
 * APIs, not for passing optional parameters to functions.
 */
export function WithValue(parent: internal_Context, key: unknown, val: unknown): internal_Context {
  return new valueCtx({ Context: parent, key, val });
}

export function GetSpanContext(ctx: internal_Context): AbortSignal | undefined {
  const val = ctx.Value(activeSpanContextKey);
  if (val instanceof AbortSignal) {
    return val;
  }
  return undefined;
}

export function WithSpanContext(ctx: internal_Context, spanContext: AbortSignal): internal_Context {
  return WithValue(ctx, activeSpanContextKey, spanContext);
}

export const activeSpanContextKey = "activeSpanContextKey";

export let background = new emptyCtx();

export let todo = new emptyCtx();

/**
 * ErrCanceled is the error returned by Context.Err when the context is canceled.
 */
export let ErrCanceled: ReturnType<typeof NewCanceledError> = ((): ReturnType<typeof NewCanceledError> => {
  // Deferred init: './error.js' can be mid-cycle while this module
  // evaluates (its declarations still in TDZ). Zero-delay timer retries
  // interleave with the module loader's transform I/O and succeed right
  // after that module's body completes — long before the binding's first
  // real read (worker code after network round trips).
  const attempt = (attempts: number): ReturnType<typeof NewCanceledError> | undefined => {
    try {
      return NewCanceledError();
    } catch (e) {
      if (attempts > 10000) throw e;
      // Assigning from a timer runs after this module body, so the
      // binding is out of TDZ by then.
      setTimeout(() => {
        const v = attempt(attempts + 1);
        if (v !== undefined) ErrCanceled = v;
      }, 0);
      return undefined;
    }
  };
  return attempt(0) as ReturnType<typeof NewCanceledError>;
})();

/**
 * ErrDeadlineExceeded is the error returned by Context.Err when the context's
 * deadline passes.
 */
export let ErrDeadlineExceeded: ReturnType<typeof NewTimeoutError> = ((): ReturnType<typeof NewTimeoutError> => {
  // Deferred init: './error.js' can be mid-cycle while this module
  // evaluates (its declarations still in TDZ). Zero-delay timer retries
  // interleave with the module loader's transform I/O and succeed right
  // after that module's body completes — long before the binding's first
  // real read (worker code after network round trips).
  const attempt = (attempts: number): ReturnType<typeof NewTimeoutError> | undefined => {
    try {
      return NewTimeoutError(shared_TimeoutType.SCHEDULE_TO_CLOSE);
    } catch (e) {
      if (attempts > 10000) throw e;
      // Assigning from a timer runs after this module body, so the
      // binding is out of TDZ by then.
      setTimeout(() => {
        const v = attempt(attempts + 1);
        if (v !== undefined) ErrDeadlineExceeded = v;
      }, 0);
      return undefined;
    }
  };
  return attempt(0) as ReturnType<typeof NewTimeoutError>;
})();
