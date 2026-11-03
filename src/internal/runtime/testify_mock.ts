// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
/*
 * GoTestifyMock / GoMockCall — SDK-owned runtime shim for `github.com/stretchr/testify/mock`.
 * ===========================================================================================
 * Go's `mock.Mock` is a recorder: a type EMBEDS it by value to gain `On(...)` for programming
 * expectations and `MethodCalled(...)` for dispatching against them. Its Go ZERO VALUE is a
 * live, ready-to-use recorder, so an embedded `mock.Mock` field is usable the moment the outer
 * struct exists — nothing ever constructs it.
 *
 * No npm package reproduces that surface. vitest's `vi.fn()` is a per-function spy with
 * `mockReturnValue`/`toHaveBeenCalledWith`, not a name-keyed expectation table on an object,
 * so mapping to it mismatches every method name. As with GoZapCore and SyncMap, the sound
 * target is an SDK-owned class carrying the exact Go method names.
 *
 * Design constraints
 *   - Live zero value. The mapped field VALUE-initializes to `new GoTestifyMock()`, because a
 *     Go embed is never assigned and an optional field left undefined crashes the first
 *     `this.Mock.On(...)` where Go guaranteed a working recorder.
 *   - `Arguments` is `unknown[]`. Go's `mock.Arguments` is a `[]interface{}` with typed
 *     accessors; callers here index it positionally, which an array already supports.
 *   - `Anything` is the same sentinel STRING testify uses, so a Go source `mock.Anything`
 *     lowers to this export and compares equal through the ordinary matcher.
 *   - `MethodCalled` is the dispatch entry point, and it is ASYNC: Go's `Run` hook may BLOCK
 *     the calling goroutine (the test env parks a mock on the workflow clock via a channel
 *     receive), and the only TS spelling of that park is a Promise the dispatcher awaits.
 *     A sync `MethodCalled` would return the mock's values before the park elapsed, erasing
 *     the delay the test programmed. Go's `Called()` recovers the method name from
 *     `runtime.Caller`, which has no reliable JavaScript equivalent; it is kept for
 *     surface completeness and reports that the name could not be recovered rather than
 *     silently matching the wrong expectation.
 */

/** The wildcard argument. Same sentinel value testify uses, so `mock.Anything` lowers here. */
export const Anything = "mock.Anything";

/**
 * One programmed expectation — the Go `*mock.Call` that `On(...)` returns. The fluent
 * methods each return `this` so a Go chain (`On(...).Return(...).Once()`) ports verbatim.
 */
export class GoMockCall {
  /** Method name this expectation matches. */
  Method: string;
  /** Expected arguments; an element equal to `Anything` matches anything in that position. */
  Arguments: unknown[];
  /** Values `MethodCalled` returns when this expectation matches. */
  ReturnArguments: unknown[] = [];
  /**
   * Remaining allowed matches. Go's convention, preserved exactly: 0 means unlimited,
   * a positive n means n more matches, and -1 marks an expectation that has been used up.
   */
  Repeatability = 0;
  /** How many times this expectation has actually matched. */
  totalCalls = 0;
  /** Set by `Maybe()`: the expectation may go unmatched without failing an assertion. */
  optional = false;
  /** Set by `Run()`: invoked (and AWAITED) with the actual arguments before the return values are handed back. */
  RunFn?: (args: unknown[]) => void | Promise<void>;

  private readonly parent?: GoTestifyMock;

  constructor(method: string, args: unknown[], parent?: GoTestifyMock) {
    this.Method = method;
    this.Arguments = args;
    this.parent = parent;
  }

  Return(...returnArguments: unknown[]): GoMockCall {
    this.ReturnArguments = returnArguments;
    return this;
  }

  Once(): GoMockCall {
    return this.Times(1);
  }

  Twice(): GoMockCall {
    return this.Times(2);
  }

  Times(i: number): GoMockCall {
    this.Repeatability = i;
    return this;
  }

  Maybe(): GoMockCall {
    this.optional = true;
    return this;
  }

  Run(fn: (args: unknown[]) => void | Promise<void>): GoMockCall {
    this.RunFn = fn;
    return this;
  }

  /** Programs a FURTHER expectation on the same mock, as Go's `Call.On` does. */
  On(methodName: string, ...args: unknown[]): GoMockCall {
    if (!this.parent) {
      throw new Error("GoMockCall.On: this call is not attached to a mock");
    }
    return this.parent.On(methodName, ...args);
  }
}

/**
 * The recorder a type embeds. Field and method names match Go's `mock.Mock` exactly so a
 * translated body reads the same as its source.
 */
export class GoTestifyMock {
  /** Programmed expectations, in the order `On` created them. */
  ExpectedCalls: GoMockCall[] = [];
  /** Actual calls, in the order they arrived. */
  Calls: GoMockCall[] = [];

  /** Whatever `Test(t)` was handed. Retained only so a re-read sees what was set. */
  private testReporter: unknown;
  private data: Record<string, unknown> = {};

  /** Programs an expectation for `methodName` with `args`. */
  On(methodName: string, ...args: unknown[]): GoMockCall {
    const call = new GoMockCall(methodName, args, this);
    this.ExpectedCalls.push(call);
    return call;
  }

  /**
   * Dispatches a call against the programmed expectations: records it, runs the
   * expectation's `Run` function, and returns its `Return` values.
   */
  async MethodCalled(methodName: string, ...args: unknown[]): Promise<unknown[]> {
    const call = this.findExpectedCall(methodName, args);
    if (!call) {
      throw new Error(
        `mock: I don't know what to return because the method call was unexpected: ${methodName}(${args.length} args)`,
      );
    }
    if (call.Repeatability > 0) {
      call.Repeatability--;
      if (call.Repeatability === 0) {
        call.Repeatability = -1;
      }
    }
    call.totalCalls++;
    this.Calls.push(new GoMockCall(methodName, args, this));
    await call.RunFn?.(args);
    return call.ReturnArguments;
  }

  /**
   * Go recovers the method name from `runtime.Caller`. JavaScript stack frames carry no
   * equivalent guarantee, so rather than risk matching the WRONG expectation this reports
   * that the name is unavailable. Translated bodies dispatch through `MethodCalled`.
   */
  Called(...args: unknown[]): unknown[] {
    throw new Error(
      `mock: Called() cannot recover the calling method name; call MethodCalled("<name>", ...) instead (${args.length} args)`,
    );
  }

  /** Registers the test reporter. There is no `testing.T` here, so this only records it. */
  Test(t: unknown): void {
    this.testReporter = t;
  }

  /** Arbitrary per-mock scratch data, as Go's `TestData()` objx.Map. */
  TestData(): Record<string, unknown> {
    return this.data;
  }

  String(): string {
    return this.ExpectedCalls.map((c) => `${c.Method}(${c.Arguments.length} args)`).join(", ");
  }

  /** True when every non-optional expectation has been matched at least as often as required. */
  AssertExpectations(t?: unknown): boolean {
    void t;
    return this.ExpectedCalls.every((c) => c.optional || c.totalCalls > 0);
  }

  AssertCalled(t: unknown, methodName: string, ...args: unknown[]): boolean {
    void t;
    return this.Calls.some((c) => c.Method === methodName && argumentsMatch(args, c.Arguments));
  }

  AssertNotCalled(t: unknown, methodName: string, ...args: unknown[]): boolean {
    return !this.AssertCalled(t, methodName, ...args);
  }

  AssertNumberOfCalls(t: unknown, methodName: string, expectedCalls: number): boolean {
    void t;
    return this.Calls.filter((c) => c.Method === methodName).length === expectedCalls;
  }

  /** True when an expectation for this call still has matches left. */
  IsMethodCallable(t: unknown, methodName: string, ...args: unknown[]): boolean {
    void t;
    return this.findExpectedCall(methodName, args) !== undefined;
  }

  /**
   * The first expectation that matches by name and arguments and still has matches left.
   * An exhausted expectation (`Repeatability === -1`) is skipped so a `.Once()` really is
   * once, matching Go's selection order.
   */
  private findExpectedCall(methodName: string, args: unknown[]): GoMockCall | undefined {
    return this.ExpectedCalls.find(
      (c) => c.Method === methodName && c.Repeatability > -1 && argumentsMatch(c.Arguments, args),
    );
  }
}

/**
 * Positional match with `Anything` as a wildcard on either side. Non-wildcard positions are
 * compared structurally, because a translated body programs expectations with plain objects
 * and arrays whose identity differs from the actual argument's.
 *
 * testify's Arguments.Diff iterates over the LONGER of the two lists: an expectation may
 * carry more matchers than the call has arguments, and `Anything` matches even a MISSING
 * argument (On(m, Anything, Anything, Anything) matches a one-arg call). An actual argument
 * with no matcher at its position is a mismatch.
 */
function argumentsMatch(expected: unknown[], actual: unknown[]): boolean {
  if (actual.length > expected.length) {
    return false;
  }
  for (let i = 0; i < expected.length; i++) {
    if (expected[i] === Anything) {
      continue; // matches any value, including a missing one
    }
    if (i >= actual.length) {
      return false; // concrete matcher, no argument to match
    }
    if (actual[i] !== Anything && !deepEqual(expected[i], actual[i])) {
      return false;
    }
  }
  return true;
}

function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) {
    return true;
  }
  if (typeof a !== "object" || typeof b !== "object" || a === null || b === null) {
    return false;
  }
  if (Array.isArray(a) !== Array.isArray(b)) {
    return false;
  }
  const ka = Object.keys(a as Record<string, unknown>);
  const kb = Object.keys(b as Record<string, unknown>);
  if (ka.length !== kb.length) {
    return false;
  }
  return ka.every((k) =>
    deepEqual((a as Record<string, unknown>)[k], (b as Record<string, unknown>)[k]),
  );
}
