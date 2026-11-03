// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
/**
 * Go-style select for the single-threaded JavaScript event loop.
 *
 * Cases first poll in a randomized order. If none is ready, they register
 * against one shared selection group. Channel operations claim that group
 * before committing, so exactly one case can win.
 * Losing registrations detach without leaving Promise reactions rooted in a
 * channel or timer.
 */

export interface SelectReceive<T> {
  value: T | undefined;
  received: boolean;
  closed: boolean;
}

/**
 * The small protocol Channel implements for recvCase/sendCase. Keeping this
 * structural avoids a runtime import cycle between select.ts and channel.ts.
 */
export interface SelectableReceiveChannel<T> {
  selectTryRecv(registration: SelectRegistration<SelectReceive<T>>): boolean;
  selectRegisterRecv(registration: SelectRegistration<SelectReceive<T>>): () => void;
}

export interface SelectableSendChannel<T> {
  selectTrySend(value: T, registration: SelectRegistration<boolean>): boolean;
  selectRegisterSend(value: T, registration: SelectRegistration<boolean>): () => void;
}

export interface SelectGroup {
  selected: boolean;
  claim(): boolean;
  claimPair(other: SelectGroup): boolean;
}

/** @internal Channel-facing handle for one case in a selectOne call. */
export interface SelectRegistration<T> {
  readonly group: SelectGroup;
  resolve(value: T): void;
  reject(error: unknown): void;
}

interface SelectCaseOps<T> {
  readonly isDefault?: boolean;
  poll(registration: SelectRegistration<T>): boolean;
  register(registration: SelectRegistration<T>): () => void;
}

const selectCaseOps: unique symbol = Symbol("selectCaseOps");
const selectCaseValue: unique symbol = Symbol("selectCaseValue");

export interface SelectCase<T> {
  readonly [selectCaseOps]: SelectCaseOps<T>;
  readonly [selectCaseValue]?: T;
}

type SelectCaseValue<C> = C extends SelectCase<infer T> ? T : never;

class selectionGroup<T> implements SelectGroup {
  selected = false;
  private completed = false;
  private resolveFn: ((value: T) => void) | null;
  private rejectFn: ((error: unknown) => void) | null;
  private cleanups: Array<() => void> = [];

  constructor(resolve: (value: T) => void, reject: (error: unknown) => void) {
    this.resolveFn = resolve;
    this.rejectFn = reject;
  }

  claim(): boolean {
    if (this.selected) {
      return false;
    }
    this.selected = true;
    return true;
  }

  claimPair(other: SelectGroup): boolean {
    if (this === other || this.selected || other.selected) {
      return false;
    }
    this.selected = true;
    other.selected = true;
    return true;
  }

  addCleanup(cleanup: () => void): void {
    if (this.selected) {
      cleanup();
      return;
    }
    this.cleanups.push(cleanup);
  }

  complete(makeValue: () => T): void {
    if (this.completed) {
      return;
    }
    this.completed = true;
    const resolve = this.resolveFn;
    const reject = this.rejectFn;
    this.drop();
    try {
      resolve?.(makeValue());
    } catch (error) {
      reject?.(error);
    }
  }

  fail(error: unknown): void {
    if (this.completed) {
      return;
    }
    this.completed = true;
    const reject = this.rejectFn;
    this.drop();
    reject?.(error);
  }

  private drop(): void {
    this.resolveFn = null;
    this.rejectFn = null;
    const cleanups = this.cleanups;
    this.cleanups = [];
    for (const cleanup of cleanups) {
      cleanup();
    }
  }
}

function makeCase<T>(ops: SelectCaseOps<T>): SelectCase<T> {
  return { [selectCaseOps]: ops };
}

function registration<T, U>(
  group: selectionGroup<U>,
  map: (value: T) => U,
): SelectRegistration<T> {
  return {
    group,
    resolve: (value) => group.complete(() => map(value)),
    reject: (error) => group.fail(error),
  };
}

function mappedRegistration<T, U>(
  outer: SelectRegistration<U>,
  map: (value: T) => U,
): SelectRegistration<T> {
  return {
    group: outer.group,
    resolve(value) {
      try {
        outer.resolve(map(value));
      } catch (error) {
        outer.reject(error);
      }
    },
    reject: (error) => outer.reject(error),
  };
}

function shuffled<T>(values: readonly T[]): T[] {
  const result = [...values];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j]!, result[i]!];
  }
  return result;
}

/**
 * Selects exactly one ready case. Ready cases are polled in a fresh random
 * order; if none is ready, all cases register under one winner token.
 */
export function selectOne<const Cases extends readonly SelectCase<unknown>[]>(
  cases: Cases,
): Promise<SelectCaseValue<Cases[number]>> {
  type Result = SelectCaseValue<Cases[number]>;
  let resolvePromise!: (value: Result) => void;
  let rejectPromise!: (error: unknown) => void;
  const promise = new Promise<Result>((resolve, reject) => {
    resolvePromise = resolve;
    rejectPromise = reject;
  });
  const group = new selectionGroup<Result>(resolvePromise, rejectPromise);
  const defaults = cases.filter((item) => item[selectCaseOps].isDefault);
  if (defaults.length > 1) {
    if (group.claim()) {
      group.fail(new Error("select: multiple default cases"));
    }
    return promise;
  }

  const active = shuffled(cases.filter((item) => !item[selectCaseOps].isDefault));
  for (const item of active) {
    const ops = item[selectCaseOps] as SelectCaseOps<unknown>;
    try {
      ops.poll(registration(group, (value) => value as Result));
    } catch (error) {
      if (group.claim()) {
        group.fail(error);
      }
    }
    if (group.selected) {
      return promise;
    }
  }

  const defaultItem = defaults[0];
  if (defaultItem) {
    const ops = defaultItem[selectCaseOps] as SelectCaseOps<unknown>;
    try {
      ops.poll(registration(group, (value) => value as Result));
    } catch (error) {
      if (group.claim()) {
        group.fail(error);
      }
    }
    return promise;
  }

  for (const item of active) {
    const ops = item[selectCaseOps] as SelectCaseOps<unknown>;
    if (group.selected) {
      break;
    }
    try {
      const cleanup = ops.register(registration(group, (value) => value as Result));
      group.addCleanup(cleanup);
    } catch (error) {
      if (group.claim()) {
        group.fail(error);
      }
    }
  }
  return promise;
}

/** A receive from null/undefined models a receive from a nil Go channel. */
export function recvCase<T>(
  channel: SelectableReceiveChannel<T> | null | undefined,
): SelectCase<SelectReceive<T>> {
  return makeCase({
    poll: (registration) => channel?.selectTryRecv(registration) ?? false,
    register: (registration) => channel?.selectRegisterRecv(registration) ?? (() => {}),
  });
}

/** A send to null/undefined models a send to a nil Go channel. */
export function sendCase<T>(
  channel: SelectableSendChannel<T> | null | undefined,
  value: T,
): SelectCase<boolean> {
  return makeCase({
    poll: (registration) => channel?.selectTrySend(value, registration) ?? false,
    register: (registration) => channel?.selectRegisterSend(value, registration) ?? (() => {}),
  });
}

/** A timer case. Durations are nanoseconds; setTimeout consumes milliseconds. */
export function timeoutCase(durationNs: number): SelectCase<void> {
  return makeCase({
    poll(registration) {
      if (durationNs > 0 || !registration.group.claim()) {
        return false;
      }
      registration.resolve();
      return true;
    },
    register(registration) {
      let live: SelectRegistration<void> | null = registration;
      const timer = setTimeout(() => {
        const current = live;
        live = null;
        if (current?.group.claim()) {
          current.resolve();
        }
      }, Math.max(0, durationNs) / 1e6);
      return () => {
        live = null;
        clearTimeout(timer);
      };
    },
  });
}

/**
 * A Promise case supports translated worker-completion selects. Losing cannot
 * stop the underlying work, but cleanup drops this select's references.
 */
export function promiseCase<T>(value: PromiseLike<T> | T): SelectCase<Awaited<T>> {
  type Outcome =
    | { ok: true; result: Awaited<T> }
    | { ok: false; error: unknown };
  let outcome: Outcome | undefined;
  const settled = Promise.resolve(value)
    .then<Outcome, Outcome>(
      (result) => ({ ok: true, result }),
      (error) => ({ ok: false, error }),
    )
    .then((result) => {
      outcome = result;
      return result;
    });
  const deliver = (registration: SelectRegistration<Awaited<T>>, result: Outcome) => {
    if (result.ok) {
      registration.resolve(result.result);
    } else {
      registration.reject(result.error);
    }
  };
  return makeCase({
    poll(registration) {
      if (!outcome || !registration.group.claim()) {
        return false;
      }
      deliver(registration, outcome);
      return true;
    },
    register(registration) {
      let live: SelectRegistration<Awaited<T>> | null = registration;
      void settled.then((result) => {
        const current = live;
        live = null;
        if (!current?.group.claim()) {
          return;
        }
        deliver(current, result);
      });
      return () => {
        live = null;
      };
    },
  });
}

/** Selected only when no non-default case is immediately ready. */
export function defaultCase<T>(value: T): SelectCase<T> {
  return makeCase({
    isDefault: true,
    poll(registration) {
      if (!registration.group.claim()) {
        return false;
      }
      registration.resolve(value);
      return true;
    },
    register: () => () => {},
  });
}

/** Retags a case without changing its readiness or cancellation behavior. */
export function mapCase<T, U>(item: SelectCase<T>, map: (value: T) => U): SelectCase<U> {
  const ops = item[selectCaseOps];
  return makeCase({
    isDefault: ops.isDefault,
    poll: (registration) => ops.poll(mappedRegistration(registration, map)),
    register: (registration) => ops.register(mappedRegistration(registration, map)),
  });
}
