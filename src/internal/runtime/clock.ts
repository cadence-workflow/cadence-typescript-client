// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { Channel, type ReceiveChannel } from "./channel.js";

/*
 * GoClock — SDK-owned structural shim for the Go clock-abstraction interfaces
 * `github.com/facebookgo/clock.Clock` and `github.com/jonboulle/clockwork.Clock`.
 * ============================================================================
 * Both are the standard "injectable clock" interface (a real wall clock in prod, a
 * controllable mock in tests) whose central method is `Now()`. The natural npm pick,
 * `@sinonjs/fake-timers`' `Clock`, is a TEST fake-timer whose surface mismatches: its
 * `now` is a numeric PROPERTY, not a `Now()` method, so `clock.Now()` is a TS2551.
 * As with `GoZapCore` / `GoThriftStructLike`, an external interface with no faithful
 * npm equivalent maps to an SDK-owned structural interface carrying the Go method
 * names, not a concrete lib class.
 *
 * Go `time.Time` / `time.Duration` are modelled as `number` across the SDK, so `Now`
 * returns `number`. Duration/Time params are permissive. The interface is only ever a
 * field/param TYPE; values flow in via `Object.assign`/`Partial<>` (no strict
 * construction check), and usage is method calls — so carrying the full clock surface
 * is strictly safer than a partial one (every call resolves).
 */
export interface GoClock {
  Now(): number;
  Since(t: unknown): number;
  // A FAKE clock's Sleep cannot return synchronously: it parks until another coroutine
  // advances the clock, which can only happen after this one yields. The real clock's
  // synchronous `void` still satisfies this, and a caller that ignores the result is
  // unaffected — only a caller that must actually block writes `await`.
  Sleep(d: unknown): void | Promise<void>;
  After(d: unknown): GoTickChannel;
  AfterFunc(d: unknown, f: () => void): GoTimer;
  Tick(d: unknown): GoTickChannel;
  NewTicker(d: unknown): GoTicker;
  NewTimer(d: unknown): GoTimer;
}

/*
 * GoTickChannel — the receive-only generic channel a clock hands back.
 * ==================================================================
 * Go's `After`/`Tick` return `<-chan time.Time`, and `Ticker`/`Timer` expose the same
 * channel; `time.Time` is `number` across the SDK. Reusing `ReceiveChannel<number>`
 * gives direct receives and Go select the same queue and commit protocol as every other
 * channel. The emitter therefore treats channel.ts and select.ts as dependencies of
 * clock.ts even when no source-level `chan` type selected the generic channel policy.
 *
 * Receive-only is the faithful public direction — a clock consumer cannot send ticks.
 * Producers retain a private `Channel<number>` and use non-blocking `trySend`, preserving
 * Go's capacity-one/drop-late-ticks behavior instead of accumulating blocked sends.
 */
export type GoTickChannel = ReceiveChannel<number>;

/*
 * GoTicker / GoTimer — the scheduled-event handles a clock returns.
 * =================================================================
 * `clockwork.Ticker`/`clockwork.Timer` reach the channel through a `Chan()` METHOD;
 * `clock.Ticker`/`clock.Timer` expose it as the `C` FIELD. One shim serves both roles
 * for the same reason `GoClock` carries the whole clock surface: the interface is only
 * ever a field/param type, values flow in via `Object.assign`/`Partial<>`, and carrying
 * both spellings means every call and every field read resolves.
 *
 * `Stop`/`Reset` return `boolean` on a timer (Go reports whether the timer was still
 * armed) and nothing on a ticker.
 */
export interface GoTicker {
  Chan(): GoTickChannel;
  C: GoTickChannel;
  Reset(d: unknown): void;
  Stop(): void;
}

export interface GoTimer {
  Chan(): GoTickChannel;
  C: GoTickChannel;
  Reset(d: unknown): boolean;
  Stop(): boolean;
}

/*
 * GoMockClock — the controllable counterpart, for `github.com/facebookgo/clock.Mock`.
 * ==================================================================================
 * `clock.Mock` is the same clock surface plus the two methods that DRIVE it: `Add`
 * advances the clock by a duration (firing anything scheduled in that window) and
 * `Set` jumps it to an absolute time. A test environment holds both — a wall clock
 * for real elapsed time and a mock clock it advances by hand — so mapping the mock
 * to the npm `Clock` loses `Now()` exactly as above, and mapping it to `GoClock`
 * would lose `Add`/`Set`.
 */
export interface GoMockClock extends GoClock {
  Add(d: unknown): void;
  Set(t: unknown): void;
}

/*
 * GoFakeClock — the controllable counterpart for `github.com/jonboulle/clockwork.FakeClock`.
 * ==========================================================================================
 * clockwork's fake carries a DIFFERENT driving surface from facebookgo's `clock.Mock`:
 * `Advance` moves fake time forward and `BlockUntil(n)` parks until n sleepers/waiters are
 * registered — the handshake a test uses to know the code under test has reached its wait
 * before the clock is moved. Mapping it to `GoMockClock` would lose both.
 */
export interface GoFakeClock extends GoClock {
  Advance(d: unknown): void;
  BlockUntil(n: number): Promise<void>;
  Set(t: unknown): void;
}

/*
 * RealClock — the lowering for the wall-clock constructors
 * `github.com/jonboulle/clockwork.NewRealClock()` and `github.com/facebookgo/clock.New()`.
 * =========================================================================================
 * `GoClock` is the TYPE those constructors produce. A body that calls one needs a VALUE, and
 * for the same reason the type is SDK-owned — no npm package carries these method names —
 * the value is too. It is a plain function so the Go call transcribes one for one:
 * `clockwork.NewRealClock()` becomes `RealClock()`, with no `new`.
 *
 * Time model
 *   - The SDK carries `time.Time` and `time.Duration` as numeric NANOSECONDS, so `Now()` is
 *     `Date.now() * 1_000_000` and every duration argument is divided down before it reaches
 *     a host timer, which counts milliseconds.
 *
 * Process lifetime
 *   - Handles stay REF'd, the host default. A pending `recv()` is not itself work the event
 *     loop tracks, so the timer is the only thing keeping the process alive long enough to
 *     deliver the tick; unref'ing would let Node exit first and the receive would never
 *     resolve. `Stop()` is how a caller releases the loop, exactly as in Go.
 */

const goClockNsPerMs = 1_000_000;

function goClockNowNanos(): number {
  return Date.now() * goClockNsPerMs;
}

function goClockDurationMillis(d: unknown): number {
  const ns = Number(d);
  return Number.isFinite(ns) ? ns / goClockNsPerMs : 0;
}

// A fake clock never reaches a host timer, so its deadlines stay in the SDK's nanosecond
// duration unit rather than being divided down to host milliseconds.
function goClockDurationNanos(d: unknown): number {
  const ns = Number(d);
  return Number.isFinite(ns) ? ns : 0;
}

class goRealTicker implements GoTicker {
  readonly C: GoTickChannel;
  private readonly chan = new Channel<number>(1);
  private handle: ReturnType<typeof setInterval> | undefined;

  constructor(d: unknown) {
    this.C = this.chan;
    this.arm(d);
  }

  private arm(d: unknown): void {
    this.handle = setInterval(() => {
      this.chan.trySend(goClockNowNanos());
    }, goClockDurationMillis(d));
  }

  Chan(): GoTickChannel {
    return this.chan;
  }

  Reset(d: unknown): void {
    this.Stop();
    this.arm(d);
  }

  Stop(): void {
    if (this.handle !== undefined) {
      clearInterval(this.handle);
      this.handle = undefined;
    }
  }
}

class goRealTimer implements GoTimer {
  readonly C: GoTickChannel;
  private readonly chan = new Channel<number>(1);
  private handle: ReturnType<typeof setTimeout> | undefined;
  private readonly onFire: (() => void) | undefined;

  constructor(d: unknown, onFire?: () => void) {
    this.onFire = onFire;
    this.C = this.chan;
    this.arm(d);
  }

  private arm(d: unknown): void {
    this.handle = setTimeout(() => {
      this.handle = undefined;
      this.chan.trySend(goClockNowNanos());
      if (this.onFire) {
        this.onFire();
      }
    }, goClockDurationMillis(d));
  }

  Chan(): GoTickChannel {
    return this.chan;
  }

  // Go reports whether the timer was still armed, so a caller can tell a cancel from a race
  // with the firing itself.
  Reset(d: unknown): boolean {
    const wasArmed = this.Stop();
    this.arm(d);
    return wasArmed;
  }

  Stop(): boolean {
    if (this.handle === undefined) {
      return false;
    }
    clearTimeout(this.handle);
    this.handle = undefined;
    return true;
  }
}

export function RealClock(): GoClock {
  return {
    Now: (): number => goClockNowNanos(),
    Since: (t: unknown): number => goClockNowNanos() - Number(t),
    // `Sleep` is declared to return void, so it must BLOCK the way Go's does rather than
    // hand back a promise a synchronous caller would drop on the floor. Atomics.wait is the
    // only real synchronous sleep available; where the host forbids it (a browser main
    // thread) the call returns at once, which is the same outcome as a zero duration.
    Sleep: (d: unknown): void => {
      const ms = goClockDurationMillis(d);
      if (ms <= 0) {
        return;
      }
      try {
        Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
      } catch {
        // Waiting is not permitted on this thread.
      }
    },
    After: (d: unknown): GoTickChannel => new goRealTimer(d).Chan(),
    AfterFunc: (d: unknown, f: () => void): GoTimer => new goRealTimer(d, f),
    Tick: (d: unknown): GoTickChannel => new goRealTicker(d).Chan(),
    NewTicker: (d: unknown): GoTicker => new goRealTicker(d),
    NewTimer: (d: unknown): GoTimer => new goRealTimer(d),
  };
}

/*
 * NewFakeClock / NewFakeClockAt — the lowering for `clockwork.NewFakeClock()` and
 * `clockwork.NewFakeClockAt(t)`.
 * ================================================================================
 * A fake clock holds its own notion of "now" and moves only when the test calls `Advance`.
 * Everything scheduled against it — sleepers, timers, tickers — is held in ONE deadline list
 * so a single advance fires them in time order, not in registration order: a test that
 * advances past several deadlines at once must observe the same sequence Go would produce.
 *
 * Why Sleep is a promise
 *   - The coroutine that sleeps and the coroutine that advances are different ones, and in a
 *     single-threaded host the sleeper must YIELD for the advancer to ever run. A synchronous
 *     block would deadlock the whole test. GoClock.Sleep is typed `void | Promise<void>` for
 *     exactly this.
 *
 * Why BlockUntil exists
 *   - Advancing before the code under test has registered its wait loses the tick entirely.
 *     `BlockUntil(n)` is the test's handshake: park until n waiters are registered, then
 *     advance. It counts sleepers AND armed timers/tickers, matching clockwork.
 */

// Waiters are resolved in deadline order; ties keep registration order, so a burst scheduled
// at the same instant fires the way it was armed.
interface goFakeWaiter {
  deadline: number;
  fire: (now: number) => void;
}

/*
 * One class backs both controllable surfaces. facebookgo's `clock.Mock` and clockwork's
 * `FakeClock` are the same fake clock with two spellings for "move time forward" — `Add`
 * and `Advance` — so a second implementation would be the same deadline list twice, with
 * two chances to diverge.
 */
class goFakeClock implements GoFakeClock, GoMockClock {
  private nowNs: number;
  private waiters: goFakeWaiter[] = [];
  private blockers: { count: number; resolve: () => void }[] = [];

  constructor(startNs: number) {
    this.nowNs = startNs;
  }

  private register(w: goFakeWaiter): void {
    this.waiters.push(w);
    this.releaseBlockers();
  }

  private unregister(w: goFakeWaiter): void {
    const i = this.waiters.indexOf(w);
    if (i >= 0) {
      this.waiters.splice(i, 1);
    }
  }

  // A blocker is satisfied the moment enough waiters exist, including by a registration that
  // happens after the BlockUntil call — which is the ordering the handshake exists to allow.
  private releaseBlockers(): void {
    if (this.blockers.length === 0) {
      return;
    }
    const still: { count: number; resolve: () => void }[] = [];
    for (const b of this.blockers) {
      if (this.waiters.length >= b.count) {
        b.resolve();
      } else {
        still.push(b);
      }
    }
    this.blockers = still;
  }

  Now(): number {
    return this.nowNs;
  }

  Since(t: unknown): number {
    return this.nowNs - Number(t);
  }

  Sleep(d: unknown): Promise<void> {
    const ns = goClockDurationNanos(d);
    if (ns <= 0) {
      return Promise.resolve();
    }
    return new Promise<void>((resolve) => {
      this.register({ deadline: this.nowNs + ns, fire: () => resolve() });
    });
  }

  // Advance fires every deadline at or before the new instant, in time order, moving the
  // clock TO each deadline as it fires so a handler reading Now() sees its own scheduled
  // time rather than the end of the whole jump.
  // facebookgo's `clock.Mock.Add` — the same operation clockwork spells `Advance`.
  Add(d: unknown): void {
    this.Advance(d);
  }

  Advance(d: unknown): void {
    const target = this.nowNs + goClockDurationNanos(d);
    for (;;) {
      let next: goFakeWaiter | undefined;
      for (const w of this.waiters) {
        if (w.deadline <= target && (next === undefined || w.deadline < next.deadline)) {
          next = w;
        }
      }
      if (next === undefined) {
        break;
      }
      this.unregister(next);
      this.nowNs = next.deadline;
      next.fire(this.nowNs);
    }
    this.nowNs = target;
  }

  Set(t: unknown): void {
    this.Advance(Number(t) - this.nowNs);
  }

  BlockUntil(n: number): Promise<void> {
    if (this.waiters.length >= n) {
      return Promise.resolve();
    }
    return new Promise<void>((resolve) => {
      this.blockers.push({ count: n, resolve });
    });
  }

  After(d: unknown): GoTickChannel {
    return this.NewTimer(d).Chan();
  }

  AfterFunc(d: unknown, f: () => void): GoTimer {
    return new goFakeTimer(this, d, f);
  }

  Tick(d: unknown): GoTickChannel {
    return this.NewTicker(d).Chan();
  }

  NewTicker(d: unknown): GoTicker {
    return new goFakeTicker(this, d);
  }

  NewTimer(d: unknown): GoTimer {
    return new goFakeTimer(this, d);
  }

  // The handles below arm themselves through these two, so they participate in BlockUntil
  // counting and in deadline ordering exactly as a sleeper does.
  arm(deadline: number, fire: (now: number) => void): goFakeWaiter {
    const w: goFakeWaiter = { deadline, fire };
    this.register(w);
    return w;
  }

  disarm(w: goFakeWaiter | undefined): boolean {
    if (w === undefined) {
      return false;
    }
    const armed = this.waiters.indexOf(w) >= 0;
    this.unregister(w);
    return armed;
  }
}

class goFakeTicker implements GoTicker {
  readonly C: GoTickChannel;
  private readonly chan = new Channel<number>(1);
  private armed: goFakeWaiter | undefined;
  private readonly clock: goFakeClock;
  private period: unknown;

  constructor(clock: goFakeClock, period: unknown) {
    this.clock = clock;
    this.period = period;
    this.C = this.chan;
    this.arm();
  }

  // A ticker re-arms from the instant it fired, so a single large Advance produces one tick
  // per elapsed period rather than one tick total.
  private arm(): void {
    const ns = goClockDurationNanos(this.period);
    this.armed = this.clock.arm(this.clock.Now() + ns, (now: number) => {
      this.chan.trySend(now);
      this.arm();
    });
  }

  Chan(): GoTickChannel {
    return this.chan;
  }

  Reset(d: unknown): void {
    this.Stop();
    this.period = d;
    this.arm();
  }

  Stop(): void {
    this.clock.disarm(this.armed);
    this.armed = undefined;
  }
}

class goFakeTimer implements GoTimer {
  readonly C: GoTickChannel;
  private readonly chan = new Channel<number>(1);
  private armed: goFakeWaiter | undefined;
  private readonly clock: goFakeClock;
  private readonly onFire: (() => void) | undefined;

  constructor(clock: goFakeClock, d: unknown, onFire?: () => void) {
    this.clock = clock;
    this.onFire = onFire;
    this.C = this.chan;
    this.arm(d);
  }

  private arm(d: unknown): void {
    this.armed = this.clock.arm(this.clock.Now() + goClockDurationNanos(d), (now: number) => {
      this.armed = undefined;
      this.chan.trySend(now);
      if (this.onFire) {
        this.onFire();
      }
    });
  }

  Chan(): GoTickChannel {
    return this.chan;
  }

  Reset(d: unknown): boolean {
    const wasArmed = this.Stop();
    this.arm(d);
    return wasArmed;
  }

  Stop(): boolean {
    const wasArmed = this.clock.disarm(this.armed);
    this.armed = undefined;
    return wasArmed;
  }
}

// Go hands `NewFakeClockAt` a `time.Time`, which the SDK carries as numeric nanoseconds. A
// host `Date` is accepted too, because a body translating `time.Date(...)` naturally reaches
// for one and silently starting the clock at NaN would make every deadline unreachable.
function goClockInstantNanos(t: unknown): number {
  if (t instanceof Date) {
    return t.getTime() * goClockNsPerMs;
  }
  const ns = Number(t);
  return Number.isFinite(ns) ? ns : 0;
}

export function NewFakeClockAt(t: unknown): GoFakeClock {
  return new goFakeClock(goClockInstantNanos(t));
}

export function NewFakeClock(): GoFakeClock {
  return new goFakeClock(goClockNowNanos());
}

/*
 * NewMockClock — the lowering for `github.com/facebookgo/clock.NewMock()`.
 * ========================================================================
 * `GoMockClock` is the TYPE that constructor produces; this is the VALUE, for the same
 * reason `RealClock` is one — the method names exist in no npm package, so the SDK owns
 * both halves. A plain function, so the Go call transcribes one for one.
 */
export function NewMockClock(): GoMockClock {
  return new goFakeClock(goClockNowNanos());
}
