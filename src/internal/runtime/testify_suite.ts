import { format } from 'node:util';
// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
/*
 * REQUIREMENTS & DESIGN CONSTRAINTS — GoTestifySuite
 * =================================================
 * What this is
 *   - The TypeScript stand-in for `github.com/stretchr/testify/suite.Suite` and the
 *     `assert.Assertions` / `require.Assertions` recorders it embeds. A Go test struct embeds
 *     one of these by VALUE and Go promotes the whole assertion set onto the receiver, so the
 *     translated bodies call `this.Equal(...)`, `this.True(...)`, `this.NoError(...)` directly.
 *   - No npm package carries that surface. vitest's `expect(x).toBe(y)` is a different shape
 *     entirely, so every method name would mismatch — this is the GoTestifyMock case, resolved
 *     the same way: an SDK-owned runtime CLASS carrying the exact Go names.
 *
 * Invariants
 *   - Every assertion THROWS on failure and returns true on success. Go's `assert.*` returns a
 *     bool and continues while `require.*` halts; a translated body ignores the bool either
 *     way, so halting is the behaviour that reports a real failure to the test runner. The
 *     return value is kept so an expression-position call still type-checks.
 *   - The Go zero value is live: a struct embedding Suite is usable the moment it exists, so
 *     the embed field is value-initialized and nothing constructs one at a call site.
 *   - Equality is STRUCTURAL and recursive, matching testify's ObjectsAreEqual: two values are
 *     equal when their own enumerable keys match pairwise. Reference identity is `Same`.
 *   - No import of `vitest`: this module is loaded by the declaration modules, which sibling
 *     modules import for helpers, and a runtime module must not drag a test framework in.
 */

/** The opaque handle Go's `t *testing.T` becomes once its harness role is dropped. */
// Brand carried by every handle T() makes, so assertion methods can recognize and drop a
// leading `t` argument (Go's `require.X(s.T(), ...)` package form).
export const goTestingHandleBrand: unique symbol = Symbol('goTestingHandle');

export interface GoTestingHandle {
  readonly [goTestingHandleBrand]?: true;
  Name(): string;
  // Go's t.Helper() only marks the caller for failure-line attribution; vitest reports
  // stacks on its own, so the marker is a no-op here.
  Helper(): void;
  Fail(): void;
  FailNow(): never;
  Skip(...msgAndArgs: unknown[]): never;
  SkipNow(): never;
  Log(...args: unknown[]): void;
  Logf(format: string, ...args: unknown[]): void;
  // Go's t.Run executes the subtest inline before returning, so a translated table loop
  // behaves the same. A skipped subtest (GoTestSkipped) does not fail its siblings; any
  // other throw surfaces on the enclosing vitest test. An ASYNC subtest closure cannot
  // block the sync Run — its failure is recorded on the owning suite and thrown by
  // __drainSubtests(), which the generated vitest wrapper awaits after the test method.
  Run(name: string, fn: (t: GoTestingHandle) => void | Promise<void>): boolean;
}

/**
 * Renders a Go format string against its arguments. Only the verb POSITIONS are honoured —
 * each verb consumes the next argument and prints it with describeValue — because a test log
 * line is read by a human and the width/precision flags carry no test-relevant meaning. An
 * argument with no verb to consume it is appended, matching Go's `%!(EXTRA ...)` in intent if
 * not in spelling; a verb with no argument left is printed verbatim.
 */
function goFormat(format: string, args: unknown[]): string {
  let next = 0;
  const out = format.replace(/%[-+# 0]*[0-9*]*(?:\.[0-9*]+)?[a-zA-Z%]/g, (verb) => {
    if (verb === '%%') return '%';
    if (next >= args.length) return verb;
    return describeValue(args[next++]);
  });
  const extra = args.slice(next);
  return extra.length === 0 ? out : `${out} ${extra.map(describeValue).join(' ')}`;
}

/**
 * Thrown by `Skip` / `SkipNow`. Go's Skip does not return — it unwinds through
 * runtime.Goexit — so the TypeScript analog cannot be a no-op that lets the rest of the test
 * body run. Throwing reproduces the abort; the generated vitest registration recognises this
 * error and marks the test skipped rather than failed.
 *
 * The registration matches on `name === 'GoTestSkipped'`, not on the class, because the
 * registration block is emitted alongside the test module and does not import this shim.
 * The name is therefore part of the contract between the two — changing it here means
 * changing the emitter in postprocess_vitest_suite_class.go.
 */
export class GoTestSkipped extends Error {
  constructor(reason = 'skipped') {
    super(reason);
    this.name = 'GoTestSkipped';
  }
}

function describeValue(v: unknown): string {
  if (typeof v === 'string') return JSON.stringify(v);
  if (v instanceof Error) return `${v.name}: ${v.message}`;
  try {
    return JSON.stringify(v) ?? String(v);
  } catch {
    return String(v);
  }
}

function message(fallback: string, msgAndArgs: unknown[]): string {
  if (msgAndArgs.length === 0) return fallback;
  const [first, ...rest] = msgAndArgs;
  const head = typeof first === 'string' ? first : describeValue(first);
  return rest.length === 0 ? `${fallback}: ${head}` : `${fallback}: ${head} ${rest.map(describeValue).join(' ')}`;
}

/** Structural, recursive equality — testify's ObjectsAreEqual, not `===`. */
export function goTestifyEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (typeof a === 'number' && typeof b === 'number') return Number.isNaN(a) && Number.isNaN(b);
  if (a === null || b === null || a === undefined || b === undefined) return false;
  if (typeof a !== 'object' || typeof b !== 'object') return false;
  if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();
  // Go's reflect.DeepEqual follows pointers. The Ref pointer box serializes as its
  // pointee (toJSON), and a decoded object carries the bare pointee where a constructed
  // one carries the box — compare through toJSON so both worlds agree, as Go does.
  const ua = typeof (a as { toJSON?: unknown }).toJSON === 'function' ? (a as { toJSON(): unknown }).toJSON() : a;
  const ub = typeof (b as { toJSON?: unknown }).toJSON === 'function' ? (b as { toJSON(): unknown }).toJSON() : b;
  if (ua !== a || ub !== b) return goTestifyEqual(ua, ub);
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  if (Array.isArray(a) && Array.isArray(b)) {
    return a.length === b.length && a.every((x, i) => goTestifyEqual(x, b[i]));
  }
  // Class instances declare every field, so an UNSET Go pointer field appears as an
  // explicitly-undefined key, while a decoded object omits it — both are Go nil.
  // Compare only present (non-undefined) keys, as reflect.DeepEqual sees them.
  const ka = Object.keys(a as object).filter((k) => (a as Record<string, unknown>)[k] !== undefined);
  const kb = Object.keys(b as object).filter((k) => (b as Record<string, unknown>)[k] !== undefined);
  if (ka.length !== kb.length) return false;
  return ka.every((k) =>
    goTestifyEqual((a as Record<string, unknown>)[k], (b as Record<string, unknown>)[k]),
  );
}

function lengthOf(v: unknown): number {
  if (v === null || v === undefined) return 0;
  if (typeof v === 'string' || Array.isArray(v)) return v.length;
  if (v instanceof Map || v instanceof Set) return v.size;
  if (Buffer.isBuffer(v)) return v.length;
  if (typeof v === 'object') return Object.keys(v as object).length;
  return 0;
}

function containsValue(haystack: unknown, needle: unknown): boolean {
  if (typeof haystack === 'string') return haystack.includes(String(needle));
  if (Array.isArray(haystack)) return haystack.some((x) => goTestifyEqual(x, needle));
  if (haystack instanceof Set) return [...haystack].some((x) => goTestifyEqual(x, needle));
  if (haystack instanceof Map) return haystack.has(needle);
  if (haystack && typeof haystack === 'object') {
    return Object.prototype.hasOwnProperty.call(haystack, String(needle));
  }
  return false;
}

function errorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (err && typeof (err as { Error?: () => string }).Error === 'function') {
    return (err as { Error: () => string }).Error();
  }
  return String(err);
}

function fail(reason: string): never {
  throw new Error(reason);
}

/**
 * The assertion surface a Go test struct gets by embedding `suite.Suite`,
 * `*assert.Assertions` or `*require.Assertions`. Method names are the exact Go spellings,
 * because Go promotion put them on the receiver under those names.
 */
export class GoTestifySuite {
  /** Present so a body that reaches the embedded recorder explicitly still resolves. */
  get Assertions(): GoTestifySuite {
    return this;
  }

  Assert(): GoTestifySuite {
    return this;
  }

  Require(): GoTestifySuite {
    return this;
  }

  private name = '';

  T(): GoTestingHandle {
    const self = this;
    const makeHandle = (name: string): GoTestingHandle => ({
      // Brands the handle so assertion methods can drop a leading `t` argument —
      // Go's package form (`require.Len(s.T(), obj, n)`) is a legal spelling of the
      // receiver form and must not consume an assertion slot. See the prototype wrap
      // below the class.
      [goTestingHandleBrand]: true,
      Name: () => name,
      Helper: () => {},
      Fail: () => {},
      FailNow: () => fail('FailNow'),
      Skip: (...msgAndArgs: unknown[]) => {
        throw new GoTestSkipped(message('skipped', msgAndArgs));
      },
      SkipNow: () => {
        throw new GoTestSkipped();
      },
      // Go's t.Log/t.Logf write to the test's own log, which the runner shows only for a
      // failing test. console.log is the closest available sink: a passing test's output is
      // noise a reporter can filter, whereas dropping the call loses the diagnostic the Go
      // test author put there deliberately.
      Log: (...args: unknown[]) => {
        console.log(args.map(describeValue).join(' '));
      },
      Logf: (format: string, ...args: unknown[]) => {
        console.log(goFormat(format, args));
      },
      Run: (sub: string, fn: (t: GoTestingHandle) => void | Promise<void>): boolean => {
        try {
          const r = fn(makeHandle(`${name}/${sub}`));
          if (r instanceof Promise) {
            GoTestifySuite.pendingSubtests.push(r.then(
              () => null,
              (e) => (e instanceof GoTestSkipped ? null : new Error(message(`subtest ${sub} failed`, [e]))),
            ));
          }
          return true;
        } catch (e) {
          if (e instanceof GoTestSkipped) {
            return true; // a skipped subtest does not fail its siblings
          }
          throw e;
        }
      },
    });
    return makeHandle(self.name);
  }

  SetT(_t: unknown): void {}

  /**
   * Async-subtest failures, already handled (no unhandled rejection) and held until the
   * vitest wrapper awaits GoTestifySuite.__drainSubtests() at the end of the test method.
   * Go's s.Run signature is sync (`Run(...) bool`), so an async subtest's rejection cannot
   * fail the parent inline — recording it is the only route back into the parent's test
   * result. STATIC because translated suites hold the recorder as an embedded field the
   * wrapper cannot name; tests within a vitest file run sequentially, so one list drained
   * after each test method attributes every failure to the test that spawned it.
   */
  private static pendingSubtests: Promise<Error | null>[] = [];

  /** testify's subtest: the closure runs inline, so a failure surfaces on the parent test. */
  Run(name: string, subtest: () => void | Promise<void>): boolean {
    const previous = this.name;
    this.name = name;
    try {
      const r = subtest();
      if (r instanceof Promise) {
        GoTestifySuite.pendingSubtests.push(r.then(
          () => null,
          (e) => (e instanceof GoTestSkipped ? null : new Error(message(`subtest ${name} failed`, [e]))),
        ));
      }
    } finally {
      this.name = previous;
    }
    return true;
  }

  /**
   * Awaited by the generated vitest wrapper after each test method; throws the first
   * recorded async-subtest failure so the parent test reports it.
   */
  static async __drainSubtests(): Promise<void> {
    const pending = GoTestifySuite.pendingSubtests;
    GoTestifySuite.pendingSubtests = [];
    const failures = (await Promise.all(pending)).filter((e): e is Error => e !== null);
    if (failures.length > 0) {
      throw failures[0];
    }
  }

  Equal(expected: unknown, actual: unknown, ...msgAndArgs: unknown[]): boolean {
    if (!goTestifyEqual(expected, actual)) {
      fail(message(`not equal: expected ${describeValue(expected)}, got ${describeValue(actual)}`, msgAndArgs));
    }
    return true;
  }

  NotEqual(expected: unknown, actual: unknown, ...msgAndArgs: unknown[]): boolean {
    if (goTestifyEqual(expected, actual)) {
      fail(message(`expected values to differ, both ${describeValue(actual)}`, msgAndArgs));
    }
    return true;
  }

  /** testify's loose numeric/string comparison; structural equality is the same predicate. */
  EqualValues(expected: unknown, actual: unknown, ...msgAndArgs: unknown[]): boolean {
    if (goTestifyEqual(expected, actual)) return true;
    if (expected !== null && actual !== null && expected !== undefined && actual !== undefined) {
      // eslint-disable-next-line eqeqeq
      if ((expected as never) == (actual as never)) return true;
    }
    return this.Equal(expected, actual, ...msgAndArgs);
  }

  Exactly(expected: unknown, actual: unknown, ...msgAndArgs: unknown[]): boolean {
    return this.Equal(expected, actual, ...msgAndArgs);
  }

  Same(expected: unknown, actual: unknown, ...msgAndArgs: unknown[]): boolean {
    if (expected !== actual) fail(message('expected the same reference', msgAndArgs));
    return true;
  }

  NotSame(expected: unknown, actual: unknown, ...msgAndArgs: unknown[]): boolean {
    if (expected === actual) fail(message('expected different references', msgAndArgs));
    return true;
  }

  True(value: unknown, ...msgAndArgs: unknown[]): boolean {
    if (value !== true) fail(message(`expected true, got ${describeValue(value)}`, msgAndArgs));
    return true;
  }

  False(value: unknown, ...msgAndArgs: unknown[]): boolean {
    if (value !== false) fail(message(`expected false, got ${describeValue(value)}`, msgAndArgs));
    return true;
  }

  /** Go's nil reaches this SDK as `undefined` (absent optional) as often as `null`. */
  Nil(value: unknown, ...msgAndArgs: unknown[]): boolean {
    if (value !== null && value !== undefined) {
      fail(message(`expected nil, got ${describeValue(value)}`, msgAndArgs));
    }
    return true;
  }

  NotNil(value: unknown, ...msgAndArgs: unknown[]): boolean {
    if (value === null || value === undefined) fail(message('expected non-nil', msgAndArgs));
    return true;
  }

  Zero(value: unknown, ...msgAndArgs: unknown[]): boolean {
    if (value !== 0 && value !== '' && value !== false && value !== null && value !== undefined) {
      fail(message(`expected the zero value, got ${describeValue(value)}`, msgAndArgs));
    }
    return true;
  }

  NotZero(value: unknown, ...msgAndArgs: unknown[]): boolean {
    if (value === 0 || value === '' || value === false || value === null || value === undefined) {
      fail(message('expected a non-zero value', msgAndArgs));
    }
    return true;
  }

  Error(err: unknown, ...msgAndArgs: unknown[]): boolean {
    if (err === null || err === undefined) fail(message('expected an error', msgAndArgs));
    return true;
  }

  NoError(err: unknown, ...msgAndArgs: unknown[]): boolean {
    if (err !== null && err !== undefined) {
      fail(message(`unexpected error: ${errorMessage(err)}`, msgAndArgs));
    }
    return true;
  }

  EqualError(err: unknown, expected: string, ...msgAndArgs: unknown[]): boolean {
    this.Error(err, ...msgAndArgs);
    const got = errorMessage(err);
    if (got !== expected) fail(message(`error message ${JSON.stringify(got)} != ${JSON.stringify(expected)}`, msgAndArgs));
    return true;
  }

  ErrorContains(err: unknown, substring: string, ...msgAndArgs: unknown[]): boolean {
    this.Error(err, ...msgAndArgs);
    const got = errorMessage(err);
    if (!got.includes(substring)) {
      fail(message(`error ${JSON.stringify(got)} does not contain ${JSON.stringify(substring)}`, msgAndArgs));
    }
    return true;
  }

  ErrorIs(err: unknown, target: unknown, ...msgAndArgs: unknown[]): boolean {
    if (err !== target && errorMessage(err) !== errorMessage(target)) {
      fail(message(`error ${describeValue(err)} is not ${describeValue(target)}`, msgAndArgs));
    }
    return true;
  }

  NotErrorIs(err: unknown, target: unknown, ...msgAndArgs: unknown[]): boolean {
    if (err === target || errorMessage(err) === errorMessage(target)) {
      fail(message('expected a different error', msgAndArgs));
    }
    return true;
  }

  Len(value: unknown, expected: number, ...msgAndArgs: unknown[]): boolean {
    const got = lengthOf(value);
    if (got !== expected) fail(message(`expected length ${expected}, got ${got}`, msgAndArgs));
    return true;
  }

  Empty(value: unknown, ...msgAndArgs: unknown[]): boolean {
    if (lengthOf(value) !== 0 && value !== 0 && value !== false) {
      fail(message(`expected empty, got ${describeValue(value)}`, msgAndArgs));
    }
    return true;
  }

  NotEmpty(value: unknown, ...msgAndArgs: unknown[]): boolean {
    if (lengthOf(value) === 0) fail(message('expected non-empty', msgAndArgs));
    return true;
  }

  Contains(haystack: unknown, needle: unknown, ...msgAndArgs: unknown[]): boolean {
    if (!containsValue(haystack, needle)) {
      fail(message(`${describeValue(haystack)} does not contain ${describeValue(needle)}`, msgAndArgs));
    }
    return true;
  }

  NotContains(haystack: unknown, needle: unknown, ...msgAndArgs: unknown[]): boolean {
    if (containsValue(haystack, needle)) {
      fail(message(`${describeValue(haystack)} contains ${describeValue(needle)}`, msgAndArgs));
    }
    return true;
  }

  /** Same elements, order-insensitive, counting duplicates. */
  ElementsMatch(listA: unknown, listB: unknown, ...msgAndArgs: unknown[]): boolean {
    const a = Array.isArray(listA) ? [...listA] : [];
    const b = Array.isArray(listB) ? [...listB] : [];
    if (a.length !== b.length) {
      fail(message(`element counts differ: ${a.length} vs ${b.length}`, msgAndArgs));
    }
    for (const want of a) {
      const at = b.findIndex((x) => goTestifyEqual(x, want));
      if (at < 0) fail(message(`missing element ${describeValue(want)}`, msgAndArgs));
      b.splice(at, 1);
    }
    return true;
  }

  Subset(list: unknown, subset: unknown, ...msgAndArgs: unknown[]): boolean {
    for (const want of Array.isArray(subset) ? subset : []) {
      if (!containsValue(list, want)) fail(message(`missing element ${describeValue(want)}`, msgAndArgs));
    }
    return true;
  }

  Greater(a: number, b: number, ...msgAndArgs: unknown[]): boolean {
    if (!(a > b)) fail(message(`${a} is not greater than ${b}`, msgAndArgs));
    return true;
  }

  GreaterOrEqual(a: number, b: number, ...msgAndArgs: unknown[]): boolean {
    if (!(a >= b)) fail(message(`${a} is not >= ${b}`, msgAndArgs));
    return true;
  }

  Less(a: number, b: number, ...msgAndArgs: unknown[]): boolean {
    if (!(a < b)) fail(message(`${a} is not less than ${b}`, msgAndArgs));
    return true;
  }

  LessOrEqual(a: number, b: number, ...msgAndArgs: unknown[]): boolean {
    if (!(a <= b)) fail(message(`${a} is not <= ${b}`, msgAndArgs));
    return true;
  }

  InDelta(expected: number, actual: number, delta: number, ...msgAndArgs: unknown[]): boolean {
    if (Math.abs(expected - actual) > delta) {
      fail(message(`${actual} is not within ${delta} of ${expected}`, msgAndArgs));
    }
    return true;
  }

  Panics(fn: () => unknown, ...msgAndArgs: unknown[]): boolean {
    try {
      fn();
    } catch {
      return true;
    }
    return fail(message('expected a panic', msgAndArgs));
  }

  NotPanics(fn: () => unknown, ...msgAndArgs: unknown[]): boolean {
    try {
      fn();
    } catch (e) {
      fail(message(`unexpected panic: ${errorMessage(e)}`, msgAndArgs));
    }
    return true;
  }

  IsType(expected: unknown, actual: unknown, ...msgAndArgs: unknown[]): boolean {
    const want = expected === null || expected === undefined ? String(expected) : (expected as object).constructor?.name;
    const got = actual === null || actual === undefined ? String(actual) : (actual as object).constructor?.name;
    if (want !== got) fail(message(`expected type ${want}, got ${got}`, msgAndArgs));
    return true;
  }

  Regexp(pattern: string | RegExp, value: unknown, ...msgAndArgs: unknown[]): boolean {
    const re = pattern instanceof RegExp ? pattern : new RegExp(pattern);
    if (!re.test(String(value))) {
      fail(message(`${describeValue(value)} does not match ${String(re)}`, msgAndArgs));
    }
    return true;
  }

  JSONEq(expected: string, actual: string, ...msgAndArgs: unknown[]): boolean {
    return this.Equal(JSON.parse(expected), JSON.parse(actual), ...msgAndArgs);
  }

  WithinDuration(expected: number, actual: number, delta: number, ...msgAndArgs: unknown[]): boolean {
    return this.InDelta(expected, actual, delta, ...msgAndArgs);
  }

  Fail(reason: string, ...msgAndArgs: unknown[]): boolean {
    return fail(message(reason, msgAndArgs));
  }

  FailNow(reason: string, ...msgAndArgs: unknown[]): boolean {
    return fail(message(reason, msgAndArgs));
  }
}

// Go's testify has two equivalent spellings: the receiver form `s.Len(obj, n)` and the
// package form `require.Len(s.T(), obj, n)`. Translated bodies use both, so every
// assertion method drops a leading branded T() handle before reading its arguments —
// otherwise the handle silently consumes the first assertion slot.
for (const key of Object.getOwnPropertyNames(GoTestifySuite.prototype)) {
  if (key === 'constructor' || key === 'T' || key === 'SetT' || key === 'Run' ||
      key === 'Assert' || key === 'Require' || key === 'Assertions') continue;
  const desc = Object.getOwnPropertyDescriptor(GoTestifySuite.prototype, key);
  if (!desc || typeof desc.value !== 'function') continue;
  const original = desc.value as (...args: unknown[]) => unknown;
  Object.defineProperty(GoTestifySuite.prototype, key, {
    ...desc,
    value: function (this: GoTestifySuite, ...args: unknown[]) {
      if (args.length > 0 && args[0] != null && typeof args[0] === 'object' &&
          (args[0] as Record<PropertyKey, unknown>)[goTestingHandleBrand] === true) {
        args = args.slice(1);
      }
      return original.apply(this, args);
    },
  });
}
