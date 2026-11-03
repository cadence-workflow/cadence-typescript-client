// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import type { Buckets, Capabilities, Counter, Gauge, Histogram, Scope, Timer } from '../../runtime/tally.js';
import { NoopScope, Stopwatch } from '../../runtime/tally.js';
import { Ref } from '../../runtime/ref.js';
import { SyncMap } from '../../runtime/sync.js';

export interface durationRecorder {
  RecordDuration(duration: number): void;
}

export interface metrics_Clock {
  Now(): number;
}

export class replayAwareScope {
  constructor(init?: Partial<replayAwareScope>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  isReplay?: Ref<boolean>;

  scope?: Scope;

  clock?: metrics_Clock;

  Counter(name: string): Counter {
    return new replayAwareCounter({
      isReplay: this.isReplay!,
      counter: this.scope!.Counter(name),
    });
  }

  Gauge(name: string): Gauge {
    return new replayAwareGauge({
      isReplay: this.isReplay!,
      gauge: this.scope!.Gauge(name),
    });
  }

  Timer(name: string): Timer {
    return new replayAwareTimer({
      isReplay: this.isReplay!,
      timer: this.scope!.Timer(name),
      clock: this.clock!,
    });
  }

  Histogram(name: string, buckets: Buckets): Histogram {
    return new replayAwareHistogram({
      isReplay: this.isReplay!,
      histogram: this.scope!.Histogram(name, buckets),
      clock: this.clock!,
    });
  }

  Tagged(tags: Record<string, string>): Scope {
    return new replayAwareScope({
      isReplay: this.isReplay!,
      scope: this.scope!.Tagged(tags),
      clock: this.clock!,
    });
  }

  SubScope(name: string): Scope {
    return new replayAwareScope({
      isReplay: this.isReplay!,
      scope: this.scope!.SubScope(name),
      clock: this.clock!,
    });
  }

  Capabilities(): Capabilities {
    return this.scope!.Capabilities();
  }

}

export class replayAwareCounter {
  constructor(init?: Partial<replayAwareCounter>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  isReplay?: Ref<boolean>;

  counter?: Counter;

  Inc(delta: number): void {
    if (this.isReplay!.value) {
      return;
    }
    this.counter!.Inc(delta);
  }

}

export class replayAwareGauge {
  constructor(init?: Partial<replayAwareGauge>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  isReplay?: Ref<boolean>;

  gauge?: Gauge;

  Update(value: number): void {
    if (this.isReplay!.value) {
      return;
    }
    this.gauge!.Update(value);
  }

}

export class replayAwareTimer implements durationRecorder {
  constructor(init?: Partial<replayAwareTimer>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  isReplay?: Ref<boolean>;

  timer?: Timer;

  clock?: metrics_Clock;

  Record(value: number): void {
    if (this.isReplay!.value) {
      return;
    }
    this.timer!.Record(value);
  }

  RecordDuration(duration: number): void {
    this.Record(duration);
  }

  Start(): Stopwatch {
    return new Stopwatch(
      this.clock!.Now(),
      new replayAwareStopwatchRecorder({
        isReplay: this.isReplay!,
        recorder: this,
        clock: this.clock!,
      }),
    );
  }

}

export class replayAwareHistogram implements durationRecorder {
  constructor(init?: Partial<replayAwareHistogram>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  isReplay?: Ref<boolean>;

  histogram?: Histogram;

  clock?: metrics_Clock;

  RecordValue(value: number): void {
    if (this.isReplay!.value) {
      return;
    }
    this.histogram!.RecordValue(value);
  }

  RecordDuration(value: number): void {
    if (this.isReplay!.value) {
      return;
    }
    this.histogram!.RecordDuration(value);
  }

  Start(): Stopwatch {
    return new Stopwatch(
      this.clock!.Now(),
      new replayAwareStopwatchRecorder({
        isReplay: this.isReplay!,
        recorder: this,
        clock: this.clock!,
      }),
    );
  }

}

export class replayAwareStopwatchRecorder {
  constructor(init?: Partial<replayAwareStopwatchRecorder>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  isReplay?: Ref<boolean>;

  recorder?: durationRecorder;

  clock?: metrics_Clock;

  RecordStopwatch(stopwatchStart: number): void {
    if (this.isReplay!.value) {
      return;
    }
    const d = this.clock!.Now() - stopwatchStart;
    this.recorder!.RecordDuration(d);
  }

}

/**
 * TaggedScope provides metricScope with tags
 */
export class TaggedScope {
  constructor(init?: Partial<TaggedScope>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  Scope?: Scope;

  Map?: SyncMap;

  GetTaggedScope(...keyValueinPairs: string[]): Scope {
    if (keyValueinPairs.length % 2 !== 0) {
      throw "GetTaggedScope key value are not in pairs";
    }
    if (this.Map == null) {
      this.Map = new SyncMap();
    }

    let key = "";
    const tagsMap: Record<string, string> = {};
    for (let i = 0; i < keyValueinPairs.length; i += 2) {
      const tagName = keyValueinPairs[i];
      const tagValue = keyValueinPairs[i + 1];
      key = key + tagName + ":" + tagValue + "-";
      tagsMap[tagName] = tagValue;
    }

    let [taggedScope, ok] = this.Load(key);
    if (!ok) {
      this.Store(key, this.Scope!.Tagged(tagsMap));
      [taggedScope] = this.Load(key);
    }
    if (taggedScope == null) {
      throw "metric scope cannot be tagged";
    }

    return taggedScope as Scope;
  }

  Capabilities(): Capabilities {
    return this.Scope!.Capabilities();
  }

  Clear(): void {
    return this.Map!.Clear();
  }

  CompareAndDelete(key: unknown, old: unknown): boolean {
    return this.Map!.CompareAndDelete(key, old);
  }

  CompareAndSwap(key: unknown, old: unknown, new_: unknown): boolean {
    return this.Map!.CompareAndSwap(key, old, new_);
  }

  Counter(name: string): Counter {
    return this.Scope!.Counter(name);
  }

  Delete(key: unknown): void {
    return this.Map!.Delete(key);
  }

  Gauge(name: string): Gauge {
    return this.Scope!.Gauge(name);
  }

  Histogram(name: string, buckets: Buckets): Histogram {
    return this.Scope!.Histogram(name, buckets);
  }

  Load(key: unknown): [unknown, boolean] {
    return this.Map!.Load(key);
  }

  LoadAndDelete(key: unknown): [unknown, boolean] {
    return this.Map!.LoadAndDelete(key);
  }

  LoadOrStore(key: unknown, value: unknown): [unknown, boolean] {
    return this.Map!.LoadOrStore(key, value);
  }

  Range(f: (p0: unknown, p1: unknown) => boolean): void {
    return this.Map!.Range(f);
  }

  Store(key: unknown, value: unknown): void {
    return this.Map!.Store(key, value);
  }

  SubScope(name: string): Scope {
    return this.Scope!.SubScope(name);
  }

  Swap(key: unknown, value: unknown): [unknown, boolean] {
    return this.Map!.Swap(key, value);
  }

  Tagged(tags: Record<string, string>): Scope {
    return this.Scope!.Tagged(tags);
  }

  Timer(name: string): Timer {
    return this.Scope!.Timer(name);
  }

}

/**
 * WrapScope wraps a scope and skip recording metrics when isReplay is true.
 * This is designed to be used by only by workflowEnvironmentImpl so we suppress metrics while replaying history events.
 * Parameter isReplay is a pointer to workflowEnvironmentImpl.isReplay which will be updated when replaying history events.
 */
export function WrapScope(isReplay: Ref<boolean>, scope: Scope, clock: metrics_Clock): Scope {
  return new replayAwareScope({ isReplay, scope, clock });
}

/**
 * NewTaggedScope create a new TaggedScope
 */
export function NewTaggedScope(scope: Scope | undefined): TaggedScope {
  if (scope == null) {
    scope = NoopScope;
  }
  return new TaggedScope({ Scope: scope!, Map: new SyncMap() });
}
