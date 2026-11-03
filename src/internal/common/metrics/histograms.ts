// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { Hour, Millisecond, Second } from '../../runtime/time.js';
import type { DurationBuckets, Scope } from '../../runtime/tally.js';
import { Stopwatch } from '../../runtime/tally.js';

/**
 * SubsettableHistogram is a duration-based histogram that is compatible with OpenTelemetry's
 * exponential histogram specification: https://opentelemetry.io/docs/specs/otel/metrics/data-model/#exponentialhistogram
 * 
 * These histograms provide logarithmic precision - finer detail at lower values, coarser at higher values,
 * which matches how latency/duration metrics typically behave.
 * 
 * All histogram metric names MUST have a "_ns" suffix to differentiate them from timers.
 */
export class SubsettableHistogram {
  constructor(init?: Partial<SubsettableHistogram>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  tallyBuckets?: DurationBuckets;

  scale: number = 0;

  subsetTo(newScale: number): SubsettableHistogram {
      if (newScale >= this.scale) {
        throw `scale ${newScale} is not less than the current scale ${this.scale}`;
      }
      if (newScale < 0) {
        throw `negative scales (${newScale}) are not supported yet`;
      }

      const dup = new SubsettableHistogram({
        tallyBuckets: this.tallyBuckets!.slice(),
        scale: this.scale,
      });

      while (dup.scale > newScale) {
        if ((dup.tallyBuckets!.length - 2) % 2 !== 0) {
          throw `cannot subset from scale ${dup.scale} to ${dup.scale - 1}, ${dup.tallyBuckets!.length - 2} buckets is not divisible by 2`;
        }
        if (dup.tallyBuckets!.length <= 3) {
          throw `not enough buckets to subset from scale ${dup.scale} to ${dup.scale - 1}, only have ${dup.tallyBuckets!.length}`;
        }

        const bucketsToCompress = dup.tallyBuckets!.slice(1, dup.tallyBuckets!.length - 1);
        const half: number[] = [dup.tallyBuckets![0]];
        for (let i = 0; i < bucketsToCompress.length; i += 2) {
          half.push(bucketsToCompress[i]);
        }
        half.push(dup.tallyBuckets![dup.tallyBuckets!.length - 1]);

        dup.tallyBuckets = half;
        dup.scale--;
      }
      return dup;
    }

  Buckets(): DurationBuckets {
    return this.tallyBuckets!;
  }

}

/**
 * makeSubsettableHistogram creates an exponential histogram with the specified parameters.
 * 
 * The bucket boundaries are calculated using the formula:
 * 
 * 	bucket[i] = start × 2^(i / 2^scale)
 * 
 * Parameters:
 *   - scale: Controls bucket density (0-3). Higher scale = more buckets = finer granularity
 *   - scale=0: buckets double every 1 step (growth factor ≈ 2.00×)
 *   - scale=1: buckets double every 2 steps (growth factor ≈ 1.41×)
 *   - scale=2: buckets double every 4 steps (growth factor ≈ 1.19×)
 *   - scale=3: buckets double every 8 steps (growth factor ≈ 1.09×)
 *   - start: First bucket value (e.g., 1ms). Must be > 0.
 *   - end: Target maximum value. Actual max will exceed this by at least 2x.
 *   - length: Number of buckets. Must be divisible by 2^scale.
 */
export function makeSubsettableHistogram(scale: number, start: number, end: number, length: number): SubsettableHistogram {
  if (scale < 0 || scale > 3) {
    throw `scale must be between 0 (grows by *2) and 3 (grows by *2^1/8), got: ${scale}`;
  }
  if (start <= 0) {
    throw `start must be greater than 0, got ${start}`;
  }
  if (start >= end) {
    throw `start must be less than end (${start} < ${end})`;
  }
  if (length < 12 || length > 160) {
    throw `length must be between 12 and 160, got ${length}`;
  }

  const powerOfTwoWidth = Math.trunc(Math.pow(2, scale));
  const missing = length % powerOfTwoWidth;
  if (missing !== 0) {
    throw `number of buckets must end at a power of 2. got ${length}, raise to ${length + missing}`;
  }

  const buckets: number[] = [];
  for (let i = 0; i < length; i++) {
    buckets.push(nextBucket(start, buckets.length, scale));
  }
  buckets.push(nextBucket(start, buckets.length, scale));

  if (last(buckets) < end * 2) {
    throw `not enough buckets (${length}) to exceed the end target (${end}) by at least 2x. last bucket: ${last(buckets)}. Consider increasing length or reducing end.`;
  }

  return new SubsettableHistogram({
    tallyBuckets: [0, ...buckets],
    scale,
  });
}

/**
 * nextBucket calculates the next bucket boundary using the exponential formula.
 * Calculating from start each time reduces floating point error, ensuring "clean" values
 * (e.g., 2ms instead of 1.9999994ms).
 */
export function nextBucket(start: number, num: number, scale: number): number {
  return Math.trunc(start * Math.pow(2, num / Math.pow(2, scale)));
}

/**
 * RecordHistogram is a convenience helper to record a duration to a histogram.
 * This makes it easier to migrate from Timer to Histogram.
 * 
 * Example:
 * 
 * 	RecordHistogram(scope, "my-operation-latency", duration, Default1ms100s)
 */
export function RecordHistogram(scope: Scope, name: string, duration: number, buckets: SubsettableHistogram): void {
  scope.Histogram(name + "_ns", buckets.Buckets()).RecordDuration(duration);
}

/**
 * StartHistogram returns a stopwatch for timing operations with a histogram.
 * Call .Stop() on the returned stopwatch to record the duration.
 * 
 * Example:
 * 
 * 	sw := StartHistogram(scope, "my-operation-latency", Default1ms100s)
 * 	// ... do work ...
 * 	sw.Stop()
 */
export function StartHistogram(scope: Scope, name: string, buckets: SubsettableHistogram): Stopwatch {
  return scope.Histogram(name + "_ns", buckets.Buckets()).Start();
}

/**
 * last returns the last element in a slice
 */
export function last<T>(s: T[]): T {
  if (s.length === 0) {
    throw new Error("index out of range");
  }
  return s[s.length - 1];
}

/**
 * Default1ms100s is the default histogram for most client-side latency metrics.
 * Range: 1ms → ~15 minutes
 * Buckets: 80 (scale=2, ~4 buckets per doubling)
 * Use for: API calls, decision execution, activity execution, poll latencies
 */
export let Default1ms100s = makeSubsettableHistogram(2, Millisecond, 100*Second, 80);

/**
 * High1ms24h is for long-running operations like workflow end-to-end latency.
 * Range: 1ms → ~3 days
 * Buckets: 112 (scale=2, ~4 buckets per doubling)
 * Use for: Workflow end-to-end latency, long-running activity latency
 */
export let High1ms24h = makeSubsettableHistogram(2, Millisecond, 24*Hour, 112);

/**
 * Low1ms100s is a half-resolution version of Default1ms100s for high-cardinality metrics.
 * Range: 1ms → ~15 minutes
 * Buckets: 40 (scale=1, ~2 buckets per doubling)
 * Use for: Per-activity-type metrics, per-workflow-type metrics where cardinality is high
 */
export let Low1ms100s = Default1ms100s.subsetTo(1);

/**
 * Mid1ms24h is a lower-resolution version of High1ms24h.
 * Range: 1ms → ~3 days
 * Buckets: 56 (scale=1, ~2 buckets per doubling)
 * Use for: When High1ms24h's cardinality is too high
 */
export let Mid1ms24h = High1ms24h.subsetTo(1);
