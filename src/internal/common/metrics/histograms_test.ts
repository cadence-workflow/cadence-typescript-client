// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { Millisecond, Second } from '../../runtime/time.js';
import type { DurationBuckets } from '../../runtime/tally.js';
import { NewTestScope } from '../../runtime/tally.js';
import { expect } from 'vitest';
import { Default1ms100s, High1ms24h, Low1ms100s, Mid1ms24h, makeSubsettableHistogram, RecordHistogram } from './histograms.js';

export function TestHistogramBuckets(): void {
  const tests: {
    name: string;
    histogram: typeof Default1ms100s;
    wantMin: number;
    wantMax: number;
  }[] = [
    {
      name: "Default1ms100s",
      histogram: Default1ms100s,
      wantMin: 80,
      wantMax: 85,
    },
    {
      name: "Low1ms100s",
      histogram: Low1ms100s,
      wantMin: 40,
      wantMax: 45,
    },
    {
      name: "High1ms24h",
      histogram: High1ms24h,
      wantMin: 112,
      wantMax: 115,
    },
    {
      name: "Mid1ms24h",
      histogram: Mid1ms24h,
      wantMin: 56,
      wantMax: 60,
    },
  ];

  for (const tt of tests) {
    const buckets = tt.histogram.Buckets();

    expect(
      buckets.length >= tt.wantMin && buckets.length <= tt.wantMax,
    ).toBe(true);

    expect(buckets[0]).toEqual(0);

    for (let i = 1; i < buckets.length; i++) {
      expect(buckets[i] > buckets[i - 1]).toBe(true);
    }
  }
}

export function TestHistogramValues(): void {
	const defaultHistogram = Default1ms100s as unknown as { Buckets(): number[] };
	const defaultBuckets = defaultHistogram.Buckets();

	expect(defaultBuckets[0]).toEqual(0);
	expect(defaultBuckets[1]).toEqual(Millisecond);

	const defaultLast = defaultBuckets[defaultBuckets.length - 1];
	expect(defaultLast >= 200 * Second).toBe(true);

	const lowHistogram = Low1ms100s as unknown as { Buckets(): number[] };
	const lowBuckets = lowHistogram.Buckets();

	expect(lowBuckets[0]).toEqual(0);
	expect(lowBuckets[1]).toEqual(Millisecond);
}

export async function TestSubset(): Promise<void> {
  const tests: { name: string; original: typeof Default1ms100s; newScale: number }[] = [
    {
      name: "Default1ms100s scale 2 to 1",
      original: Default1ms100s,
      newScale: 1,
    },
    {
      name: "Default1ms100s scale 2 to 0",
      original: Default1ms100s,
      newScale: 0,
    },
    {
      name: "High1ms24h scale 2 to 1",
      original: High1ms24h,
      newScale: 1,
    },
  ];

  for (const tt of tests) {
    const subset = await tt.original.subsetTo(tt.newScale);
    const originalBuckets = tt.original.Buckets();
    const subsetBuckets = subset.Buckets();

    expect(subsetBuckets.length).toBeLessThan(originalBuckets.length);
    expect(subsetBuckets[0]).toEqual(originalBuckets[0]);
    expect(subsetBuckets[subsetBuckets.length - 1]).toEqual(
      originalBuckets[originalBuckets.length - 1],
    );

    for (const sb of subsetBuckets) {
      let found = false;
      for (const ob of originalBuckets) {
        if (sb === ob) {
          found = true;
          break;
        }
      }
      expect(found).toBe(true);
    }

    console.log(
      `Original: ${originalBuckets.length} buckets, Subset: ${subsetBuckets.length} buckets`,
    );
  }
}

export async function TestSubsetPanics(): Promise<void> {
  await expect(Default1ms100s.subsetTo(2)).rejects.toThrow();
  await expect(Default1ms100s.subsetTo(3)).rejects.toThrow();
  await expect(Default1ms100s.subsetTo(-1)).rejects.toThrow();
}

export function TestMakeSubsettableHistogramPanics(): void {
  expect(() => {
    makeSubsettableHistogram(-1, Millisecond, 100 * Second, 80);
  }).toThrow();

  expect(() => {
    makeSubsettableHistogram(4, Millisecond, 100 * Second, 80);
  }).toThrow();

  expect(() => {
    makeSubsettableHistogram(2, 0, 100 * Second, 80);
  }).toThrow();

  expect(() => {
    makeSubsettableHistogram(2, -Millisecond, 100 * Second, 80);
  }).toThrow();

  expect(() => {
    makeSubsettableHistogram(2, 100 * Second, 100 * Second, 80);
  }).toThrow();

  expect(() => {
    makeSubsettableHistogram(2, 200 * Second, 100 * Second, 80);
  }).toThrow();

  expect(() => {
    makeSubsettableHistogram(2, Millisecond, 100 * Second, 5);
  }).toThrow();

  expect(() => {
    makeSubsettableHistogram(2, Millisecond, 100 * Second, 200);
  }).toThrow();

  expect(() => {
    makeSubsettableHistogram(2, Millisecond, 100 * Second, 81);
  }).toThrow();

  expect(() => {
    makeSubsettableHistogram(2, Millisecond, 100 * Second, 12);
  }).toThrow();
}

export function TestRecordHistogram(): void {
  const scope = NewTestScope("test", {});

  RecordHistogram(scope, "test-metric", 50 * Millisecond, Default1ms100s);

  const snapshot = scope.Snapshot();
  const histograms = snapshot.Histograms();

  const hist = histograms["test.test-metric_ns+"];
  const ok = "test.test-metric_ns+" in histograms;
  expect(ok).toBe(true);
  expect(hist).not.toBeNull();
  expect(hist!.Durations()).not.toBeNull();
}

export async function TestStartHistogram(): Promise<void> {
  throw new globalThis.Error("not implemented"); // @stub
}

/**
 * printBuckets prints histogram buckets in a readable format, grouped by rows
 */
export function printBuckets(buckets: DurationBuckets, width: number): void {
  console.log(`[${buckets[0]}]`);
  for (let rowStart = 1; rowStart < buckets.length; rowStart += width) {
    let end = rowStart + width;
    if (end > buckets.length) {
      end = buckets.length;
    }
    const row = buckets.slice(rowStart, end);
    console.log(formatDurations(row));
  }
}

/**
 * formatDurations formats a slice of durations as a string
 */
export function formatDurations(durations: number[]): string {
    const durationString = (duration: number): string => {
        let d = Math.trunc(duration);
        if (d === 0) {
            return "0s";
        }
        if (d < 0) {
            return `-${durationString(-d)}`;
        }
        if (d < 1_000) {
            return `${d}ns`;
        }
        if (d < 1_000_000) {
            const whole = Math.trunc(d / 1_000);
            const fraction = String(d % 1_000).padStart(3, "0").replace(/0+$/, "");
            return `${whole}${fraction ? `.${fraction}` : ""}µs`;
        }
        if (d < 1_000_000_000) {
            const whole = Math.trunc(d / 1_000_000);
            const fraction = String(Math.trunc((d % 1_000_000) / 1_000)).padStart(3, "0").replace(/0+$/, "");
            return `${whole}${fraction ? `.${fraction}` : ""}ms`;
        }

        let result = "";
        const hasHour = d >= 3_600_000_000_000;
        if (hasHour) {
            result += `${Math.trunc(d / 3_600_000_000_000)}h`;
            d %= 3_600_000_000_000;
        }

        const hasMinute = hasHour || d >= 60_000_000_000;
        if (hasMinute) {
            result += `${Math.trunc(d / 60_000_000_000)}m`;
            d %= 60_000_000_000;
        }

        const seconds = Math.trunc(d / 1_000_000_000);
        const fraction = String(d % 1_000_000_000).padStart(9, "0").replace(/0+$/, "");
        result += `${seconds}${fraction ? `.${fraction}` : ""}s`;
        return result;
    };

    const parts: string[] = [];
    for (const duration of durations) {
        parts.push(durationString(duration));
    }
    return `[${parts.join(" ")}]`;
}
