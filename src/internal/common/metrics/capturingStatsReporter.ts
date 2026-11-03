// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { TaggedScope, metrics_Clock, WrapScope } from './scope.js';
import { Second } from '../../runtime/time.js';
import type { Buckets, Capabilities, Scope } from '../../runtime/tally.js';
import { NewRootScope } from '../../runtime/tally.js';
import { Ref } from '../../runtime/ref.js';

/**
 * CapturedHistogramDurationSamples has related information for CapturedHistogramDurationSamples
 */
export interface CapturedHistogramDurationSamples {
  name: string;
  tags?: Record<string, string>;
  bucketLowerBound: number;
  bucketUpperBound: number;
  samples: number;
}

/**
 * CapturedHistogramValueSamples has related information for CapturedHistogramValueSamples
 */
export interface CapturedHistogramValueSamples {
  name: string;
  tags?: Record<string, string>;
  bucketLowerBound: number;
  bucketUpperBound: number;
  samples: number;
}

export class realClock implements metrics_Clock {
  constructor(init?: Partial<realClock>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  Now(): number {
    return Date.now() * 1_000_000;
  }

}

/**
 * CapturingStatsReporter is a reporter used by tests to capture the metric so we can verify our tests.
 */
export class CapturingStatsReporter {
  constructor(init?: Partial<CapturingStatsReporter>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  counts: CapturedCount[] = [];

  gauges: CapturedGauge[] = [];

  timers: CapturedTimer[] = [];

  histogramValueSamples: CapturedHistogramValueSamples[] = [];

  histogramDurationSamples: CapturedHistogramDurationSamples[] = [];

  capabilities: number = 0;

  flush: number = 0;

  HistogramDurationSamples(): CapturedHistogramDurationSamples[] {
    return this.histogramDurationSamples;
  }

  HistogramValueSamples(): CapturedHistogramValueSamples[] {
    return this.histogramValueSamples;
  }

  Timers(): CapturedTimer[] {
    return this.timers;
  }

  Gauges(): CapturedGauge[] {
    return this.gauges;
  }

  Counts(): CapturedCount[] {
    return this.counts;
  }

  ReportCounter(name: string, tags: Record<string, string>, value: number): void {
    this.counts.push(new CapturedCount({ name, tags, value }));
  }

  ReportGauge(name: string, tags: Record<string, string>, value: number): void {
    this.gauges.push(new CapturedGauge({ name, tags, value }));
  }

  ReportTimer(name: string, tags: Record<string, string>, value: number): void {
    this.timers.push(new CapturedTimer({ name, tags, value }));
  }

  ReportHistogramValueSamples(name: string, tags: Record<string, string>, buckets: Buckets, bucketLowerBound: number, bucketUpperBound: number, samples: number): void {
    const elem: CapturedHistogramValueSamples = {
      name,
      tags,
      bucketLowerBound,
      bucketUpperBound,
      samples,
    };
    this.histogramValueSamples.push(elem);
  }

  ReportHistogramDurationSamples(name: string, tags: Record<string, string>, buckets: Buckets, bucketLowerBound: number, bucketUpperBound: number, samples: number): void {
    const elem: CapturedHistogramDurationSamples = {
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

/**
 * CapturedCount has associated name, tags and value
 */
export class CapturedCount {
  constructor(init?: Partial<CapturedCount>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  name: string = "";

  tags: Record<string, string> = {};

  value: number = 0;

  Value(): number {
    return this.value;
  }

  Tags(): Record<string, string> {
    return this.tags;
  }

  Name(): string {
    return this.name;
  }

}

/**
 * CapturedGauge has CapturedGauge name, tag and values
 */
export class CapturedGauge {
  constructor(init?: Partial<CapturedGauge>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  name: string = "";

  tags: Record<string, string> = {};

  value: number = 0;

  Value(): number {
    return this.value;
  }

  Tags(): Record<string, string> {
    return this.tags;
  }

  Name(): string {
    return this.name;
  }

}

/**
 * CapturedTimer has related name , tags and value
 */
export class CapturedTimer {
  constructor(init?: Partial<CapturedTimer>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  name: string = "";

  tags: Record<string, string> = {};

  value: number = 0;

  Value(): number {
    return this.value;
  }

  Tags(): Record<string, string> {
    return this.tags;
  }

  Name(): string {
    return this.name;
  }

}

/**
 * NewMetricsScope returns a new metric scope
 */
export function NewMetricsScope(isReplay: Ref<boolean>): [Scope, { Close(): void }, CapturingStatsReporter] {
  const reporter = new CapturingStatsReporter({
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

/**
 * NewTaggedMetricsScope return NewTaggedMetricsScope
 */
export function NewTaggedMetricsScope(): [TaggedScope, { Close(): void }, CapturingStatsReporter] {
  const isReplay = new Ref(false);
  const [scope, closer, reporter] = NewMetricsScope(isReplay);
  return [new TaggedScope({ Scope: scope }), closer, reporter];
}
