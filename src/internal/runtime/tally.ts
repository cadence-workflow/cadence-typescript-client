// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
// Runtime shim for github.com/uber-go/tally (metric scopes, counters, gauges, timers,
// histograms and their reporters). Go's tally has no npm equivalent, so the generator emits
// this minimal but faithful implementation whenever the source uses the tally package.
//
// Design constraints:
//   - Durations are numbers in nanoseconds (the project-wide time model, matching Go's
//     time.Duration). ValueBuckets and DurationBuckets are therefore both `number[]`.
//   - Scopes report each metric operation straight to their StatsReporter (an unbuffered
//     model). tally itself buffers and flushes on an interval; reporting eagerly is simpler,
//     captures the same events for a test/capturing reporter, and needs no timer plumbing.
//   - The whole file is emitted verbatim and never merged, so regeneration cannot duplicate
//     or drift these definitions.

// ---- Bucket representations -------------------------------------------------
// A bucket set is an ascending list of boundaries. Value buckets are plain numbers; duration
// buckets are nanosecond counts. All three are the same JS shape (number[]).
export type ValueBuckets = number[];
export type DurationBuckets = number[];
export type Buckets = number[];

// tally.DefaultBuckets is the empty set (the reporter falls back to its own defaults).
export const DefaultBuckets: Buckets = [];

// MustMakeLinearValueBuckets returns `num` buckets starting at `start`, each `width` apart.
export function MustMakeLinearValueBuckets(start: number, width: number, num: number): ValueBuckets {
  if (num <= 0) {
    throw new Error("MustMakeLinearValueBuckets requires a positive count");
  }
  const out: ValueBuckets = [];
  for (let i = 0; i < num; i++) {
    out.push(start + width * i);
  }
  return out;
}

// MustMakeLinearDurationBuckets is the duration (nanosecond) analogue of the value form.
export function MustMakeLinearDurationBuckets(start: number, width: number, num: number): DurationBuckets {
  return MustMakeLinearValueBuckets(start, width, num);
}

// MustMakeExponentialValueBuckets returns `num` buckets starting at `start`, each the previous
// times `factor`. `start` must be non-zero and `factor` greater than 1.
export function MustMakeExponentialValueBuckets(start: number, factor: number, num: number): ValueBuckets {
  if (num <= 0) {
    throw new Error("MustMakeExponentialValueBuckets requires a positive count");
  }
  if (start === 0) {
    throw new Error("MustMakeExponentialValueBuckets requires a non-zero start");
  }
  if (factor <= 1) {
    throw new Error("MustMakeExponentialValueBuckets requires a factor greater than 1");
  }
  const out: ValueBuckets = [];
  let current = start;
  for (let i = 0; i < num; i++) {
    out.push(current);
    current *= factor;
  }
  return out;
}

// MustMakeExponentialDurationBuckets is the duration (nanosecond) analogue; boundaries are
// rounded to whole nanoseconds to stay integral like Go's time.Duration.
export function MustMakeExponentialDurationBuckets(start: number, factor: number, num: number): DurationBuckets {
  return MustMakeExponentialValueBuckets(start, factor, num).map((v) => Math.round(v));
}

// ---- Capabilities ----------------------------------------------------------
export interface Capabilities {
  Reporting(): boolean;
  Tagging(): boolean;
}

// ---- Metric handles --------------------------------------------------------
export interface Counter {
  Inc(delta: number): void;
}

export interface Gauge {
  Update(value: number): void;
}

export interface Timer {
  Record(value: number): void;
  Start(): Stopwatch;
}

export interface Histogram {
  RecordValue(value: number): void;
  RecordDuration(value: number): void;
  Start(): Stopwatch;
}

// StopwatchRecorder is the sink a Stopwatch reports its elapsed time to when stopped.
export interface StopwatchRecorder {
  RecordStopwatch(stopwatchStart: number): void;
}

// Stopwatch measures elapsed time; Stop() reports the interval since start to its recorder.
// `start` is a nanosecond instant (time.Time in Go, a number here).
export class Stopwatch {
  constructor(private readonly start: number, private readonly recorder: StopwatchRecorder) {}
  Stop(): void {
    this.recorder.RecordStopwatch(this.start);
  }
}

// NewStopwatch constructs a Stopwatch anchored at `start`, reporting to `recorder`.
export function NewStopwatch(start: number, recorder: StopwatchRecorder): Stopwatch {
  return new Stopwatch(start, recorder);
}

// ---- Scope -----------------------------------------------------------------
export interface Scope {
  Counter(name: string): Counter;
  Gauge(name: string): Gauge;
  Timer(name: string): Timer;
  Histogram(name: string, buckets: Buckets | null): Histogram;
  Tagged(tags: Record<string, string> | null): Scope;
  SubScope(name: string): Scope;
  Capabilities(): Capabilities;
}

// ---- Reporter --------------------------------------------------------------
export interface StatsReporter {
  ReportCounter(name: string, tags: Record<string, string>, value: number): void;
  ReportGauge(name: string, tags: Record<string, string>, value: number): void;
  ReportTimer(name: string, tags: Record<string, string>, interval: number): void;
  ReportHistogramValueSamples(
    name: string,
    tags: Record<string, string>,
    buckets: Buckets,
    bucketLowerBound: number,
    bucketUpperBound: number,
    samples: number,
  ): void;
  ReportHistogramDurationSamples(
    name: string,
    tags: Record<string, string>,
    buckets: Buckets,
    bucketLowerBound: number,
    bucketUpperBound: number,
    samples: number,
  ): void;
  Capabilities(): Capabilities;
  Flush(): void;
}

// ---- Scope / reporter options ----------------------------------------------
export interface SanitizeOptions {
  NameCharacters?: unknown;
  KeyCharacters?: unknown;
  ValueCharacters?: unknown;
  ReplacementCharacter?: string;
}

export interface ScopeOptions {
  Tags?: Record<string, string>;
  Prefix?: string;
  Separator?: string;
  Reporter?: StatsReporter;
  CachedReporter?: unknown;
  SanitizeOptions?: SanitizeOptions;
}

// Name-sanitization surface (used by callers that build custom SanitizeOptions). Ranges are
// represented as [lo, hi] codepoint pairs; the concrete matching is left to the reporter.
export const ValidCharacters: unknown[] = [];
export const AlphanumericRange: unknown[] = [];
export const DefaultReplacementCharacter = "_";

// ---- Capabilities constants ------------------------------------------------
const capabilitiesReportingTagging: Capabilities = {
  Reporting(): boolean {
    return true;
  },
  Tagging(): boolean {
    return true;
  },
};

const capabilitiesNone: Capabilities = {
  Reporting(): boolean {
    return false;
  },
  Tagging(): boolean {
    return false;
  },
};

// ---- No-op scope -----------------------------------------------------------
// Returned metric handles discard everything; Stopwatches report to a no-op recorder.
const noopRecorder: StopwatchRecorder = { RecordStopwatch(): void {} };

class noopScope implements Scope {
  Counter(): Counter {
    return { Inc(): void {} };
  }
  Gauge(): Gauge {
    return { Update(): void {} };
  }
  Timer(): Timer {
    return {
      Record(): void {},
      Start: () => new Stopwatch(0, noopRecorder),
    };
  }
  Histogram(): Histogram {
    return {
      RecordValue(): void {},
      RecordDuration(): void {},
      Start: () => new Stopwatch(0, noopRecorder),
    };
  }
  Tagged(): Scope {
    return this;
  }
  SubScope(): Scope {
    return this;
  }
  Capabilities(): Capabilities {
    return capabilitiesNone;
  }
}

// NoopScope is a shared scope that ignores every metric (tally.NoopScope).
export const NoopScope: Scope = new noopScope();

// ---- Reporting scope -------------------------------------------------------
// A scope that forwards each operation to a StatsReporter, carrying an accumulated name prefix
// and tag set. Sub-scopes and tagged scopes derive new reportingScopes sharing the reporter.
function findBucketBounds(buckets: Buckets, value: number): [number, number] {
  let lower = Number.NEGATIVE_INFINITY;
  for (const boundary of buckets) {
    if (value < boundary) {
      return [lower, boundary];
    }
    lower = boundary;
  }
  return [lower, Number.POSITIVE_INFINITY];
}

// counterRegistry accumulates counter increments per metric identity so a scope tree reports each
// counter's total ONCE on flush — mirroring tally, whose scope buffers a counter and emits an
// aggregated ReportCounter on flush/Close rather than one report per Inc. It is shared across a
// root scope and every sub/tagged scope derived from it (threaded through reportingScope), so a
// counter incremented through any of them aggregates into a single report keyed by tally's metric
// identity. Gauges, timers, and histograms stay eager: their capturing/snapshot reporters already
// model tally's last-value (gauge) and per-sample (timer/histogram) semantics.
class counterRegistry {
  private readonly counters = new Map<string, { name: string; tags: Record<string, string>; value: number }>();

  add(name: string, tags: Record<string, string>, delta: number): void {
    const key = snapshotKey(name, tags);
    const cur = this.counters.get(key);
    if (cur) {
      cur.value += delta;
    } else {
      this.counters.set(key, { name, tags, value: delta });
    }
  }

  // flush reports each accumulated counter once, then clears, so a subsequent flush reports only new
  // increments (tally's delta-on-flush behavior) and never re-reports an already-flushed total.
  flush(reporter: StatsReporter): void {
    for (const c of this.counters.values()) {
      reporter.ReportCounter(c.name, c.tags, c.value);
    }
    this.counters.clear();
  }
}

class reportingScope implements Scope {
  constructor(
    private readonly prefix: string,
    private readonly separator: string,
    private readonly tags: Record<string, string>,
    private readonly reporter: StatsReporter,
    private readonly registry: counterRegistry,
  ) {}

  private qualify(name: string): string {
    return this.prefix === "" ? name : this.prefix + this.separator + name;
  }

  Counter(name: string): Counter {
    const full = this.qualify(name);
    const registry = this.registry;
    const tags = this.tags;
    return {
      Inc(delta: number): void {
        // Aggregate rather than report eagerly — tally buffers a counter and emits its
        // total once on flush/Close. See counterRegistry.
        registry.add(full, tags, delta);
      },
    };
  }

  Gauge(name: string): Gauge {
    const full = this.qualify(name);
    const reporter = this.reporter;
    const tags = this.tags;
    return {
      Update(value: number): void {
        reporter.ReportGauge(full, tags, value);
      },
    };
  }

  Timer(name: string): Timer {
    const full = this.qualify(name);
    const reporter = this.reporter;
    const tags = this.tags;
    const recorder: StopwatchRecorder = {
      RecordStopwatch(stopwatchStart: number): void {
        reporter.ReportTimer(full, tags, Date.now() * 1_000_000 - stopwatchStart);
      },
    };
    return {
      Record(value: number): void {
        reporter.ReportTimer(full, tags, value);
      },
      Start(): Stopwatch {
        return new Stopwatch(Date.now() * 1_000_000, recorder);
      },
    };
  }

  Histogram(name: string, buckets: Buckets | null): Histogram {
    const full = this.qualify(name);
    const reporter = this.reporter;
    const tags = this.tags;
    const bkts: Buckets = buckets ?? DefaultBuckets;
    const recorder: StopwatchRecorder = {
      RecordStopwatch(stopwatchStart: number): void {
        const [lo, hi] = findBucketBounds(bkts, Date.now() * 1_000_000 - stopwatchStart);
        reporter.ReportHistogramDurationSamples(full, tags, bkts, lo, hi, 1);
      },
    };
    return {
      RecordValue(value: number): void {
        const [lo, hi] = findBucketBounds(bkts, value);
        reporter.ReportHistogramValueSamples(full, tags, bkts, lo, hi, 1);
      },
      RecordDuration(value: number): void {
        const [lo, hi] = findBucketBounds(bkts, value);
        reporter.ReportHistogramDurationSamples(full, tags, bkts, lo, hi, 1);
      },
      Start(): Stopwatch {
        return new Stopwatch(Date.now() * 1_000_000, recorder);
      },
    };
  }

  Tagged(tags: Record<string, string> | null): Scope {
    return new reportingScope(this.prefix, this.separator, { ...this.tags, ...(tags ?? {}) }, this.reporter, this.registry);
  }

  SubScope(name: string): Scope {
    return new reportingScope(this.qualify(name), this.separator, this.tags, this.reporter, this.registry);
  }

  Capabilities(): Capabilities {
    return this.reporter.Capabilities();
  }
}

// Closer mirrors Go's io.Closer for the value NewRootScope returns alongside the scope.
export interface Closer {
  Close(): void;
}

// NewRootScope builds a reporting scope rooted at the given options plus a Closer that flushes the
// scope's buffered counters and then the reporter. `interval` (report cadence, ns) is accepted for
// signature parity; counters flush on Close, and gauges/timers/histograms report eagerly, so there
// is no background timer to stop.
export function NewRootScope(opts: ScopeOptions, _interval: number): [Scope, Closer] {
  const reporter = opts.Reporter ?? NoopStatsReporter;
  const registry = new counterRegistry();
  const scope = new reportingScope(opts.Prefix ?? "", opts.Separator ?? ".", opts.Tags ?? {}, reporter, registry);
  const closer: Closer = {
    Close(): void {
      registry.flush(reporter);
      reporter.Flush();
    },
  };
  return [scope, closer];
}

// NoopStatsReporter discards every report; used as the default reporter when none is supplied.
export const NoopStatsReporter: StatsReporter = {
  ReportCounter(): void {},
  ReportGauge(): void {},
  ReportTimer(): void {},
  ReportHistogramValueSamples(): void {},
  ReportHistogramDurationSamples(): void {},
  Capabilities(): Capabilities {
    return capabilitiesReportingTagging;
  },
  Flush(): void {},
};

// NewTestScope returns a TestScope backed by a snapshotting reporter, so tests can drive metrics
// through the scope and then inspect the recorded values via Snapshot() (tally.NewTestScope). Tags
// seed the scope; the prefix defaults to empty.
export function NewTestScope(prefix: string, tags: Record<string, string> | null | undefined): TestScope {
  return new testScope(prefix ?? "", tags ?? {});
}

// ---- Test scope / snapshot -------------------------------------------------
// tally's test scope records every reported metric and exposes them through Snapshot() for
// assertions. Snapshot entries are keyed by tally's identity string `name + "+" + sortedTags`
// (e.g. an unprefixed metric with no tags is `"name+"`), matching the keys tests look up.

// Per-metric snapshot entries. Getter methods mirror tally's *Snapshot interfaces.
export interface CounterSnapshot {
  Name(): string;
  Tags(): Record<string, string>;
  Value(): number;
}
export interface GaugeSnapshot {
  Name(): string;
  Tags(): Record<string, string>;
  Value(): number;
}
export interface TimerSnapshot {
  Name(): string;
  Tags(): Record<string, string>;
  Values(): number[];
}
export interface HistogramSnapshot {
  Name(): string;
  Tags(): Record<string, string>;
  Values(): Record<number, number>; // upper-bound value -> sample count
  Durations(): Record<number, number>; // upper-bound duration (ns) -> sample count
}

// Snapshot is the immutable view of everything a TestScope has recorded, grouped by metric kind.
export interface Snapshot {
  Counters(): Record<string, CounterSnapshot>;
  Gauges(): Record<string, GaugeSnapshot>;
  Timers(): Record<string, TimerSnapshot>;
  Histograms(): Record<string, HistogramSnapshot>;
}

// TestScope is a Scope that also captures reported metrics for inspection (tally.TestScope).
export interface TestScope extends Scope {
  Snapshot(): Snapshot;
}

// snapshotKey builds tally's metric identity: the qualified name, a `+`, then tag `k=v` pairs
// sorted by key and comma-joined (empty when there are no tags).
function snapshotKey(name: string, tags: Record<string, string>): string {
  const tagStr = Object.keys(tags)
    .sort()
    .map((k) => `${k}=${tags[k]}`)
    .join(",");
  return `${name}+${tagStr}`;
}

// snapshotStatsReporter accumulates every report into per-kind maps so Snapshot() can return them.
class snapshotStatsReporter implements StatsReporter {
  readonly counters: Record<string, { name: string; tags: Record<string, string>; value: number }> = {};
  readonly gauges: Record<string, { name: string; tags: Record<string, string>; value: number }> = {};
  readonly timers: Record<string, { name: string; tags: Record<string, string>; values: number[] }> = {};
  readonly histograms: Record<
    string,
    { name: string; tags: Record<string, string>; values: Record<number, number>; durations: Record<number, number> }
  > = {};

  ReportCounter(name: string, tags: Record<string, string>, value: number): void {
    const key = snapshotKey(name, tags);
    const cur = this.counters[key] ?? { name, tags, value: 0 };
    cur.value += value;
    this.counters[key] = cur;
  }
  ReportGauge(name: string, tags: Record<string, string>, value: number): void {
    this.gauges[snapshotKey(name, tags)] = { name, tags, value };
  }
  ReportTimer(name: string, tags: Record<string, string>, interval: number): void {
    const key = snapshotKey(name, tags);
    const cur = this.timers[key] ?? { name, tags, values: [] };
    cur.values.push(interval);
    this.timers[key] = cur;
  }
  ReportHistogramValueSamples(
    name: string,
    tags: Record<string, string>,
    _buckets: Buckets,
    _bucketLowerBound: number,
    bucketUpperBound: number,
    samples: number,
  ): void {
    const key = snapshotKey(name, tags);
    const cur = this.histograms[key] ?? { name, tags, values: {}, durations: {} };
    cur.values[bucketUpperBound] = (cur.values[bucketUpperBound] ?? 0) + samples;
    this.histograms[key] = cur;
  }
  ReportHistogramDurationSamples(
    name: string,
    tags: Record<string, string>,
    _buckets: Buckets,
    _bucketLowerBound: number,
    bucketUpperBound: number,
    samples: number,
  ): void {
    const key = snapshotKey(name, tags);
    const cur = this.histograms[key] ?? { name, tags, values: {}, durations: {} };
    cur.durations[bucketUpperBound] = (cur.durations[bucketUpperBound] ?? 0) + samples;
    this.histograms[key] = cur;
  }
  Capabilities(): Capabilities {
    return capabilitiesReportingTagging;
  }
  Flush(): void {}
}

// testScope delegates all Scope operations to an inner reportingScope wired to a snapshotting
// reporter, and reads that reporter back through Snapshot(). Sub/tagged scopes share the reporter
// (reportingScope forwards it), so metrics reported on any derived scope land in this snapshot.
class testScope implements TestScope {
  private readonly reporter = new snapshotStatsReporter();
  private readonly registry = new counterRegistry();
  private readonly scope: Scope;
  constructor(prefix: string, tags: Record<string, string>) {
    this.scope = new reportingScope(prefix, ".", tags, this.reporter, this.registry);
  }
  Counter(name: string): Counter {
    return this.scope.Counter(name);
  }
  Gauge(name: string): Gauge {
    return this.scope.Gauge(name);
  }
  Timer(name: string): Timer {
    return this.scope.Timer(name);
  }
  Histogram(name: string, buckets: Buckets | null): Histogram {
    return this.scope.Histogram(name, buckets);
  }
  Tagged(tags: Record<string, string> | null): Scope {
    return this.scope.Tagged(tags);
  }
  SubScope(name: string): Scope {
    return this.scope.SubScope(name);
  }
  Capabilities(): Capabilities {
    return this.scope.Capabilities();
  }
  Snapshot(): Snapshot {
    // Push buffered counter totals into the reporter before reading, so a Snapshot taken without a
    // Close still reflects every Inc (tally's test scope reads live aggregated state).
    this.registry.flush(this.reporter);
    const r = this.reporter;
    return {
      Counters(): Record<string, CounterSnapshot> {
        const out: Record<string, CounterSnapshot> = {};
        for (const [k, v] of Object.entries(r.counters)) {
          out[k] = { Name: () => v.name, Tags: () => v.tags, Value: () => v.value };
        }
        return out;
      },
      Gauges(): Record<string, GaugeSnapshot> {
        const out: Record<string, GaugeSnapshot> = {};
        for (const [k, v] of Object.entries(r.gauges)) {
          out[k] = { Name: () => v.name, Tags: () => v.tags, Value: () => v.value };
        }
        return out;
      },
      Timers(): Record<string, TimerSnapshot> {
        const out: Record<string, TimerSnapshot> = {};
        for (const [k, v] of Object.entries(r.timers)) {
          out[k] = { Name: () => v.name, Tags: () => v.tags, Values: () => v.values };
        }
        return out;
      },
      Histograms(): Record<string, HistogramSnapshot> {
        const out: Record<string, HistogramSnapshot> = {};
        for (const [k, v] of Object.entries(r.histograms)) {
          out[k] = {
            Name: () => v.name,
            Tags: () => v.tags,
            Values: () => v.values,
            Durations: () => v.durations,
          };
        }
        return out;
      },
    };
  }
}
