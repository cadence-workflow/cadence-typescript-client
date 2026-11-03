// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
/*
 * Go `sync` runtime shim: SyncMap (sync.Map), WaitGroup (sync.WaitGroup), and Once (sync.Once).
 *
 * Go's `sync.Map` is a concurrent map with value methods (Store/Load/LoadOrStore/
 * LoadAndDelete/Delete/Range/Swap/CompareAndSwap/CompareAndDelete/Clear). Its Go ZERO
 * VALUE is a ready-to-use empty map, so a bare field `var m sync.Map` is immediately live.
 *
 * JavaScript is single-threaded: reads/writes never interleave, so a faithful port is a
 * plain `Map` with the same method surface — no real concurrency primitive needed. Method
 * names keep their exact Go PascalCase; tuple-returning methods return `[value, ok]` to
 * match Go's `(value, ok)` multi-return.
 *
 * Key equality follows JavaScript `Map` (SameValueZero: primitives by value, objects by
 * reference), not Go's comparable-value equality. This matches how the corpus uses it
 * (string keys).
 */
export class SyncMap<K = unknown, V = unknown> {
  private m = new Map<K, V>();

  Store(key: K, value: V): void {
    this.m.set(key, value);
  }

  Load(key: K): [V | undefined, boolean] {
    return [this.m.get(key), this.m.has(key)];
  }

  LoadOrStore(key: K, value: V): [V, boolean] {
    if (this.m.has(key)) {
      return [this.m.get(key) as V, true];
    }
    this.m.set(key, value);
    return [value, false];
  }

  LoadAndDelete(key: K): [V | undefined, boolean] {
    const loaded = this.m.has(key);
    const prev = this.m.get(key);
    this.m.delete(key);
    return [prev, loaded];
  }

  Delete(key: K): void {
    this.m.delete(key);
  }

  Swap(key: K, value: V): [V | undefined, boolean] {
    const loaded = this.m.has(key);
    const prev = this.m.get(key);
    this.m.set(key, value);
    return [prev, loaded];
  }

  CompareAndSwap(key: K, old: V, newValue: V): boolean {
    if (this.m.has(key) && this.m.get(key) === old) {
      this.m.set(key, newValue);
      return true;
    }
    return false;
  }

  CompareAndDelete(key: K, old: V): boolean {
    if (this.m.has(key) && this.m.get(key) === old) {
      this.m.delete(key);
      return true;
    }
    return false;
  }

  Range(f: (key: K, value: V) => boolean): void {
    for (const [k, v] of this.m) {
      if (!f(k, v)) {
        return;
      }
    }
  }

  Clear(): void {
    this.m.clear();
  }
}

/*
 * Go's `sync.WaitGroup` waits for a set of goroutines to finish: `Add(delta)` bumps a
 * counter, `Done()` decrements it (Add(-1)), and `Wait()` blocks until the counter is zero.
 * Its Go ZERO VALUE is a ready-to-use group, so `var wg sync.WaitGroup` is immediately live.
 *
 * The single-threaded async port keeps the counter and turns the blocking `Wait()` into a
 * Promise that resolves when the counter reaches zero — a goroutine `go f()` becomes a
 * dangling async call `void f()` that eventually calls `wg.Done()`, and a caller awaits
 * `wg.Wait()`. Method names keep their exact Go PascalCase. `Add` throws on a negative
 * counter, matching Go's panic ("sync: negative WaitGroup counter").
 */
export class WaitGroup {
  private count = 0;
  private resolvers: Array<() => void> = [];

  Add(delta: number): void {
    this.count += delta;
    if (this.count < 0) {
      throw new Error('sync: negative WaitGroup counter');
    }
    if (this.count === 0) {
      const pending = this.resolvers;
      this.resolvers = [];
      for (const resolve of pending) {
        resolve();
      }
    }
  }

  Done(): void {
    this.Add(-1);
  }

  Wait(): Promise<void> {
    if (this.count === 0) {
      return Promise.resolve();
    }
    return new Promise<void>((resolve) => {
      this.resolvers.push(resolve);
    });
  }
}

// Once is the faithful async port of Go's sync.Once. Go's Do blocks every caller until
// the one callback returns; translated work can turn that callback into a Promise (for
// example, when it acquires an async-mutex). `completion` is installed before invoking f
// so concurrent/reentrant calls cannot run another callback and instead wait for the
// first. A callback failure still consumes the Once: the initiating call observes it,
// while other callers only wait for completion, matching Go's panic/defer latch.
export class Once {
  private started = false;
  private completion?: Promise<void>;

  Do(f: () => void | Promise<void>): Promise<void> {
    if (this.started) {
      return this.completion!;
    }

    this.started = true;
    let complete!: () => void;
    this.completion = new Promise<void>((resolve) => {
      complete = resolve;
    });

    let result: void | Promise<void>;
    try {
      result = f();
    } catch (error) {
      complete();
      throw error;
    }

    return Promise.resolve(result).then(
      () => {
        complete();
      },
      (error) => {
        complete();
        throw error;
      },
    );
  }
}

/*
 * GoCond is the single-threaded port of Go's `sync.Cond` (`sync.NewCond(&sync.Mutex{})`
 * → `new GoCond()`).
 *
 * Go's Cond parks a goroutine in `Wait()` until another goroutine calls `Signal()` (wake
 * one) or `Broadcast()` (wake all). The JS port turns the blocking `Wait()` into a
 * `Promise<void>` a caller MUST `await` (so any function calling it becomes async); the
 * waiters queue preserves Go's FIFO wake order for `Signal()`.
 *
 * `L` keeps the Go surface (`c.L.Lock()` / `c.L.Unlock()` compile and run) but locking is
 * a no-op: the runtime is single-threaded, so the mutex protects nothing — and unlike
 * Go's Wait (which atomically unlocks L while parked), the port has no lock to release.
 * Go's re-check loop `for cond { c.Wait() }` translates directly:
 * `while (cond) { await c.Wait(); }`.
 */
export class GoCond {
  L = {
    Lock(): void {
      // single-threaded runtime: mutex guard is a no-op
    },
    Unlock(): void {
      // single-threaded runtime: mutex guard is a no-op
    },
  };

  private waiters: Array<() => void> = [];

  Wait(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.waiters.push(resolve);
    });
  }

  Signal(): void {
    const wake = this.waiters.shift();
    if (wake) {
      wake();
    }
  }

  Broadcast(): void {
    const pending = this.waiters;
    this.waiters = [];
    for (const wake of pending) {
      wake();
    }
  }
}
