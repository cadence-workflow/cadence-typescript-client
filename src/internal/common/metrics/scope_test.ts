// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { CapturingStatsReporter, NewTaggedMetricsScope, NewMetricsScope, realClock } from './capturingStatsReporter.js';
import { TaggedScope, WrapScope } from './scope.js';
import { Hour, Minute, Second } from '../../runtime/time.js';
import type { Buckets, Capabilities, Scope } from '../../runtime/tally.js';
import { NewRootScope } from '../../runtime/tally.js';
import { Ref } from '../../runtime/ref.js';
import { SyncMap } from '../../runtime/sync.js';
import { expect } from 'vitest';

export interface capturedCount {
  name: string;
  tags?: Record<string, string>;
  value: number;
}

export interface capturedGauge {
  name: string;
  tags?: Record<string, string>;
  value: number;
}

export interface capturedHistogramDurationSamples {
  name: string;
  tags?: Record<string, string>;
  bucketLowerBound: number;
  bucketUpperBound: number;
  samples: number;
}

export interface capturedHistogramValueSamples {
  name: string;
  tags?: Record<string, string>;
  bucketLowerBound: number;
  bucketUpperBound: number;
  samples: number;
}

export interface capturedTimer {
  name: string;
  tags?: Record<string, string>;
  value: number;
}

/**
 * capturingStatsReporter is a reporter used by tests to capture the metric so we can verify our tests.
 */
export class capturingStatsReporter {
  constructor(init?: Partial<capturingStatsReporter>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  counts: capturedCount[] = [];

  gauges: capturedGauge[] = [];

  timers: capturedTimer[] = [];

  histogramValueSamples: capturedHistogramValueSamples[] = [];

  histogramDurationSamples: capturedHistogramDurationSamples[] = [];

  capabilities: number = 0;

  flush: number = 0;

  ReportCounter(name: string, tags: Record<string, string>, value: number): void {
    this.counts.push({ name, tags, value });
  }

  ReportGauge(name: string, tags: Record<string, string>, value: number): void {
    this.gauges.push({ name, tags, value });
  }

  ReportTimer(name: string, tags: Record<string, string>, value: number): void {
    this.timers.push({ name, tags, value });
  }

  ReportHistogramValueSamples(name: string, tags: Record<string, string>, buckets: Buckets, bucketLowerBound: number, bucketUpperBound: number, samples: number): void {
    const elem: capturedHistogramValueSamples = {
      name,
      tags,
      bucketLowerBound,
      bucketUpperBound,
      samples,
    };
    this.histogramValueSamples.push(elem);
  }

  ReportHistogramDurationSamples(name: string, tags: Record<string, string>, buckets: Buckets, bucketLowerBound: number, bucketUpperBound: number, samples: number): void {
    const elem: capturedHistogramDurationSamples = {
      name,
      tags,
      bucketLowerBound,
      bucketUpperBound,
      samples,
    };
    this.histogramDurationSamples.push(elem);
  }

  Capabilities(): Capabilities {
    this.capabilities++;
    return this;
  }

  Reporting(): boolean {
    return true;
  }

  Tagging(): boolean {
    return true;
  }

  Flush(): void {
    this.flush++;
  }

}

export function Test_Counter(): void {
  const [replayed, executed] = withScope((scope) => {
    scope.Counter("test-name").Inc(3);
  });
  expect(replayed.Counts().length).toEqual(0);
  expect(executed.Counts().length).toEqual(1);
  expect(executed.Counts()[0].Value()).toEqual(3);
}

export function Test_Gauge(): void {
    const [replayed, executed] = withScope((scope: Scope) => {
        scope.Gauge("test-name").Update(3);
    });
    expect(replayed.Gauges().length).toEqual(0);
    expect(executed.Gauges().length).toEqual(1);
    expect(executed.Gauges()[0].Value()).toEqual(3);
}

export function Test_Timer(): void {
  const [replayed, executed] = withScope((scope) => {
    scope.Timer("test-name").Record(Second);
    scope.Timer("test-stopwatch").Start().Stop();
  });
  expect(replayed.Timers().length).toEqual(0);
  expect(executed.Timers().length).toEqual(2);
  expect(executed.Timers()[0].Value()).toEqual(Second);
}

export function Test_Histogram(): void {
  const [replayedValues, executedValues] = withScope((scope) => {
    const valueBuckets = Array.from({ length: 10 }, (_, i) => i * 10);
    scope.Histogram("test-hist-1", valueBuckets).RecordValue(5);
    scope.Histogram("test-hist-2", valueBuckets).RecordValue(15);
  });
  expect(replayedValues.HistogramValueSamples().length).toEqual(0);
  expect(executedValues.HistogramValueSamples().length).toEqual(2);

  const [replayedDurations, executedDurations] = withScope((scope) => {
    const durationBuckets = Array.from({ length: 10 }, (_, i) => i * Hour);
    scope.Histogram("test-hist-1", durationBuckets).RecordDuration(Minute);
    scope.Histogram("test-hist-2", durationBuckets).RecordDuration(Minute * 61);
    scope.Histogram("test-hist-3", durationBuckets).Start().Stop();
  });
  expect(replayedDurations.HistogramDurationSamples().length).toEqual(0);
  expect(executedDurations.HistogramDurationSamples().length).toEqual(3);
}

export async function Test_ScopeCoverage(): Promise<void> {
  const isReplay = new Ref(false);
  const [scope, closer, reporter] = NewMetricsScope(isReplay);
  const caps = scope.Capabilities();
  expect(caps.Reporting()).toEqual(true);
  expect(caps.Tagging()).toEqual(true);
  const subScope = scope.SubScope("test");
  const taggedScope = subScope.Tagged({});
  taggedScope.Counter("test-counter").Inc(1);
  closer.Close();
  expect(reporter.Counts().length).toEqual(1);
}

export function Test_TaggedScope(): void {
    let [taggedScope, closer, reporter] = NewTaggedMetricsScope();
    let scope = taggedScope.GetTaggedScope("tag1", "val1");
    scope.Counter("test-name").Inc(3);
    closer.Close();
    expect(reporter.Counts().length).toEqual(1);
    expect(reporter.Counts()[0].Value()).toEqual(3);

    const m = new SyncMap();
    [taggedScope, closer, reporter] = NewTaggedMetricsScope();
    taggedScope.Map = m;
    scope = taggedScope.GetTaggedScope("tag2", "val1");
    scope.Counter("test-name").Inc(2);

    const [taggedScope2, closer2, reporter2] = NewTaggedMetricsScope();
    taggedScope2.Map = m;
    scope = taggedScope2.GetTaggedScope("tag2", "val1");
    scope.Counter("test-name").Inc(1);
    closer2.Close();
    expect(reporter2.Counts().length).toEqual(0);
    closer.Close();
    expect(reporter.Counts().length).toEqual(1);
    expect(reporter.Counts()[0].Value()).toEqual(3);
}

export function Test_TaggedScope_WithMultiTags(): void {
  let [taggedScope, closer, reporter] = newTaggedMetricsScope();
  let scope = taggedScope.GetTaggedScope("tag1", "val1", "tag2", "val2");
  scope.Counter("test-name").Inc(3);
  closer.Close();
  expect(reporter.counts.length).toEqual(1);
  expect(reporter.counts[0].value).toEqual(3);

  const m = new SyncMap();
  [taggedScope, closer, reporter] = newTaggedMetricsScope();
  taggedScope.Map = m;
  scope = taggedScope.GetTaggedScope("tag2", "val1", "tag3", "val3");
  scope.Counter("test-name").Inc(2);

  const [taggedScope2, closer2, reporter2] = newTaggedMetricsScope();
  taggedScope2.Map = m;
  scope = taggedScope2.GetTaggedScope("tag2", "val1", "tag3", "val3");
  scope.Counter("test-name").Inc(1);
  closer2.Close();
  expect(reporter2.counts.length).toEqual(0);
  closer.Close();
  expect(reporter.counts.length).toEqual(1);
  expect(reporter.counts[0].value).toEqual(3);

  expect(() => taggedScope2.GetTaggedScope("tag")).toThrow();
}

export function newMetricsScope(isReplay: Ref<boolean>): [Scope, { Close(): void }, capturingStatsReporter] {
  const reporter = new capturingStatsReporter({
    capabilities: 0,
    counts: [],
    flush: 0,
    gauges: [],
    histogramDurationSamples: [],
    histogramValueSamples: [],
    timers: [],
  });
  const opts = { Reporter: reporter };
  const [scope, closer] = NewRootScope(opts, Second);
  return [WrapScope(isReplay, scope, new realClock({})), closer, reporter];
}

export function newTaggedMetricsScope(): [TaggedScope, { Close(): void }, capturingStatsReporter] {
  const isReplay = new Ref(false);
  const [scope, closer, reporter] = newMetricsScope(isReplay);
  return [new TaggedScope({ Scope: scope }), closer, reporter];
}

/**
 * withScope runs your callback twice, once for "during replay" and once for "after replay" / "executing".
 * stats are captured, and the results are returned for your validation.
 */
export function withScope(cb: (p0: Scope) => void | Promise<void>): [CapturingStatsReporter, CapturingStatsReporter] {
    const replaying = new Ref<boolean>(true);
    const executing = new Ref<boolean>(false);

    const [replayingScope, replayingCloser, replayed] = NewMetricsScope(replaying);
    const [executingScope, executingCloser, executed] = NewMetricsScope(executing);

    try {
        cb(replayingScope);
        cb(executingScope);
        return [replayed, executed];
    } finally {
        replayingCloser.Close();
        executingCloser.Close();
    }
}
