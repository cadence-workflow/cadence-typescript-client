// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
/*
 * REQUIREMENTS & DESIGN CONSTRAINTS — GoMockController / GoMockClient
 * ==================================================================
 * `github.com/golang/mock/gomock` is a CODE GENERATOR plus a tiny runtime. Source code
 * pairs the two halves everywhere:
 *
 *     controller := gomock.NewController(reporter)
 *     client     := somepkgtest.NewMockClient(controller)   // generated type
 *     client.EXPECT().SomeCall(gomock.Any()).Return(resp, nil)
 *
 * Neither half survives translation on its own. The generated `NewMockClient` has no
 * emitted counterpart — the generator never ran against the TypeScript surface — and no
 * npm package reproduces gomock's controller/recorder pair: vitest's `vi.fn()` is a
 * per-function spy, not a name-keyed expectation table hanging off an object. So, as with
 * GoZapCore and GoClock, the sound target is SDK-owned and carries the exact Go names.
 *
 * Why the mock cannot simply be `undefined`
 *   Two Go call sites in one file can look identical and mean different things. A replay
 *   entry point builds a mock purely to satisfy a parameter whose value is never read (the
 *   history is supplied locally), while a test environment programs a real expectation on
 *   it. `undefined as unknown as T` compiles for the first and silently returns `undefined`
 *   from every method in the second. One shim serves both: unprogrammed calls THROW — which
 *   is exactly what gomock does, since a controller with no matching expectation fails the
 *   test — and programmed ones dispatch.
 *
 * Design constraints
 *   - `NewGoMockClient` returns `any`. The generated Go mock is a distinct nominal type that
 *     satisfies some service interface; here the Proxy structurally satisfies whatever slot
 *     it flows into, and `any` lets it assign without the body naming a type argument it has
 *     no way to know. The Proxy is the type safety: a member the caller never programmed
 *     throws rather than reading `undefined`.
 *   - Property access — not construction — is what mints a method, because the emitted
 *     surface has no declaration to enumerate. `EXPECT` is the one reserved name.
 *   - Expectation matching follows gomock's order: first-registered wins among those whose
 *     arguments match and whose remaining count is non-zero. `MockAny()` matches any argument.
 *   - `Finish()` reports unmet expectations the way gomock does, so a translated test that
 *     defers it keeps its assertion. Expectations set with `AnyTimes()` are exempt.
 *   - Everything is synchronous. gomock does no I/O, and a Promise here would turn a Go
 *     value return into a pending Promise at every call site.
 */

/**
 * The wildcard argument. `gomock.Any()` lowers to this call.
 *
 * Named `MockAny` rather than `Any` on purpose: `Any` is a common IDL message name, so a
 * bare export of it would compete with a generated type for the same binding in a file that
 * uses both.
 */
export function MockAny(): unknown {
  return ANY;
}

/** Sentinel the matcher compares against; distinct from any value a caller could pass. */
export const ANY: unique symbol = Symbol("gomock.Any");

/** A caller-supplied predicate, the lowering for a custom `gomock.Matcher`. */
export interface GoMockMatcher {
  Matches(x: unknown): boolean;
  String(): string;
}

function isMatcher(v: unknown): v is GoMockMatcher {
  return (
    typeof v === "object" &&
    v !== null &&
    typeof (v as GoMockMatcher).Matches === "function"
  );
}

/** True when one expected argument accepts one actual argument. */
function argMatches(expected: unknown, actual: unknown): boolean {
  if (expected === ANY) return true;
  if (isMatcher(expected)) return expected.Matches(actual);
  return Object.is(expected, actual) || deepEqual(expected, actual);
}

/**
 * Structural comparison for expected arguments written as object/array literals. Go
 * compares with reflect.DeepEqual, so a literal in the expectation must match an
 * equivalent value the code under test constructed separately.
 */
function deepEqual(a: unknown, b: unknown): boolean {
  if (Object.is(a, b)) return true;
  if (typeof a !== "object" || typeof b !== "object" || a === null || b === null) {
    return false;
  }
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  const ak = Object.keys(a as object);
  const bk = Object.keys(b as object);
  if (ak.length !== bk.length) return false;
  return ak.every(
    (k) =>
      Object.prototype.hasOwnProperty.call(b, k) &&
      deepEqual((a as Record<string, unknown>)[k], (b as Record<string, unknown>)[k]),
  );
}

/**
 * One programmed expectation — the `*gomock.Call` that `EXPECT().Method(...)` returns. The
 * fluent methods each return `this`, so a Go chain ports verbatim.
 */
export class GoMockCall {
  /** Method name this expectation matches. */
  readonly Method: string;
  /** Expected arguments; an element equal to `MockAny()` matches anything in that position. */
  readonly Arguments: unknown[];
  /** Values handed back when this expectation matches; a single value is returned bare. */
  ReturnArguments: unknown[] = [];
  /** Minimum matches `Finish()` requires. */
  minCalls = 1;
  /** Maximum matches allowed; `Infinity` after `AnyTimes()`. */
  maxCalls = 1;
  /** How many times this expectation has actually matched. */
  numCalls = 0;
  /** Set by `Do`/`DoAndReturn`: invoked with the actual arguments. */
  private action?: (...args: unknown[]) => unknown;
  /** True when `DoAndReturn` supplied the action, so its result is the return value. */
  private actionReturns = false;

  constructor(method: string, args: unknown[]) {
    this.Method = method;
    this.Arguments = args;
  }

  Return(...values: unknown[]): this {
    this.ReturnArguments = values;
    return this;
  }

  Times(n: number): this {
    this.minCalls = n;
    this.maxCalls = n;
    return this;
  }

  /** mockery/testify chain spelling: `.Once()` is `.Times(1)`. A mockery-style generated
   * mock (`&MockXxx{}`) programs with Once/Twice where gomock uses Times, and both styles
   * flow through this one expectation class. */
  Once(): this {
    return this.Times(1);
  }

  Twice(): this {
    return this.Times(2);
  }

  AnyTimes(): this {
    this.minCalls = 0;
    this.maxCalls = Infinity;
    return this;
  }

  MinTimes(n: number): this {
    this.minCalls = n;
    if (this.maxCalls < n) this.maxCalls = Infinity;
    return this;
  }

  MaxTimes(n: number): this {
    this.maxCalls = n;
    if (this.minCalls > n) this.minCalls = 0;
    return this;
  }

  Do(fn: (...args: unknown[]) => unknown): this {
    this.action = fn;
    this.actionReturns = false;
    return this;
  }

  DoAndReturn(fn: (...args: unknown[]) => unknown): this {
    this.action = fn;
    this.actionReturns = true;
    return this;
  }

  /** True when this expectation accepts one more call with these arguments. */
  accepts(method: string, args: unknown[]): boolean {
    if (this.Method !== method || this.numCalls >= this.maxCalls) return false;
    if (this.Arguments.length !== args.length) return false;
    return this.Arguments.every((e, i) => argMatches(e, args[i]));
  }

  /** Record one match and produce the call's result. */
  invoke(args: unknown[]): unknown {
    this.numCalls++;
    if (this.action) {
      if (this.actionReturns) {
        // DoAndReturn: the action's result IS the call's result, so a throw is the
        // error return propagating to the caller — let it.
        return this.action(...args);
      }
      // Do: gomock invokes the function and DISCARDS its return values. Under this
      // SDK's error-as-throw convention, a Go callback ending in `return err` arrives
      // here as a throw — swallowing it is what "discarded" means. (A genuine Go panic
      // inside a Do callback would propagate through gomock; that case is indistinguishable
      // here and is accepted as a divergence.)
      try {
        this.action(...args);
      } catch {
        // discarded Do return value
      }
    }
    if (this.ReturnArguments.length === 0) return undefined;
    if (this.ReturnArguments.length === 1) return this.ReturnArguments[0];
    return this.ReturnArguments;
  }
}

/**
 * The `*gomock.Controller` a test creates once and threads through every mock it builds.
 * It owns the expectation list, so mocks sharing a controller share one ordering — the same
 * relationship Go has.
 */
export class GoMockController {
  /** Whatever the Go source passed as the reporter (`*testing.T`, a custom reporter). */
  readonly reporter: unknown;
  private readonly calls: GoMockCall[] = [];

  constructor(reporter?: unknown) {
    this.reporter = reporter;
  }

  /** Register an expectation. Called by a mock's recorder, not by translated bodies. */
  expect(call: GoMockCall): GoMockCall {
    this.calls.push(call);
    return call;
  }

  /** Dispatch one actual call against the registered expectations. */
  dispatch(method: string, args: unknown[]): unknown {
    const match = this.calls.find((c) => c.accepts(method, args));
    if (!match) {
      throw new Error(
        `gomock: unexpected call to ${method}(${args.length} args) — no matching expectation was programmed`,
      );
    }
    return match.invoke(args);
  }

  /**
   * Assert every expectation was met. Go's controller does this on `Finish()`, and on
   * `NewController(t)` with a modern testing handle it is registered as a cleanup; a
   * translated body that calls it explicitly keeps the assertion either way.
   */
  Finish(): void {
    const unmet = this.calls.filter((c) => c.numCalls < c.minCalls);
    if (unmet.length > 0) {
      const names = unmet
        .map((c) => `${c.Method} (want ${c.minCalls}, got ${c.numCalls})`)
        .join(", ");
      throw new Error(`gomock: missing call(s): ${names}`);
    }
  }
}

/** `gomock.NewController(reporter)` lowers here. */
export function NewGoMockController(reporter?: unknown): GoMockController {
  return new GoMockController(reporter);
}

/**
 * A generated `NewMockXxx(ctrl)` constructor lowers here.
 *
 * The result is a Proxy: `client.EXPECT()` yields a recorder whose every property is an
 * expectation builder, and every other property is a method that dispatches through the
 * controller. Returning `any` is deliberate — see the file header.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function NewGoMockClient(ctrl?: GoMockController): any {
  const controller = ctrl ?? new GoMockController();

  const recorder = new Proxy(
    {},
    {
      get(_t, prop: string | symbol) {
        if (typeof prop !== "string") return undefined;
        return (...args: unknown[]) => controller.expect(new GoMockCall(prop, args));
      },
    },
  );

  return new Proxy(
    {},
    {
      get(_t, prop: string | symbol) {
        if (typeof prop !== "string") return undefined;
        if (prop === "EXPECT") return () => recorder;
        if (prop === "ctrl") return controller;
        return (...args: unknown[]) => controller.dispatch(prop, args);
      },
    },
  );
}
