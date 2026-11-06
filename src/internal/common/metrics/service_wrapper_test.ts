// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { CapturingStatsReporter, realClock } from './capturingStatsReporter.js';
import { Second } from '../../runtime/time.js';
import type { Scope } from '../../runtime/tally.js';
import { NewRootScope } from '../../runtime/tally.js';
import { Ref } from '../../runtime/ref.js';
import { expect } from 'vitest';
import { CadenceLatency, CadenceMetricsPrefix } from './constants.js';
import { WrapScope } from './scope.js';

export interface errCase {
  err?: Error | null;
  expectedCounters?: string[];
}

export interface testCase {
  serviceMethod: string;
  callArgs?: unknown[];
}

export function assertMetrics(reporter: CapturingStatsReporter, methodName: string, counterNames: string[]): void {
  expect(reporter.counts.length).toEqual(counterNames.length);

  for (const name of counterNames) {
    const counterName = CadenceMetricsPrefix + methodName + "." + name;
    let find = false;

    for (const counter of reporter.counts) {
      if (counterName === counter.name) {
        find = true;
        break;
      }
    }

    expect(find).toBe(true);
  }

  expect(reporter.timers.length).toEqual(1);
  expect(reporter.timers[0]!.name).toEqual(
    CadenceMetricsPrefix + methodName + "." + CadenceLatency,
  );
}

export function assertPromMetrics(reporter: CapturingStatsReporter, methodName: string, counterNames: string[]): void {
  expect(reporter.counts.length).toEqual(counterNames.length);

  for (const name of counterNames) {
    const counterName = makePromCompatible(CadenceMetricsPrefix + methodName + "." + name);
    let find = false;

    for (const counter of reporter.counts) {
      if (counterName === counter.name) {
        find = true;
        break;
      }
    }

    expect(find).toBe(true);
  }

  expect(reporter.timers.length).toEqual(1);
  const expected = makePromCompatible(CadenceMetricsPrefix + methodName + "." + CadenceLatency);
  expect(reporter.timers[0]!.name).toEqual(expected);
}

export function makePromCompatible(name: string): string {
  name = name.replace(/-/g, "_");
  name = name.replace(/\./g, "_");
  return name;
}

export function newPromScope(isReplay: Ref<boolean>): [Scope, { Close(): void }, CapturingStatsReporter] {
  const reporter = new CapturingStatsReporter({
    capabilities: 0,
    counts: [],
    flush: 0,
    gauges: [],
    histogramDurationSamples: [],
    histogramValueSamples: [],
    timers: [],
  });
  const opts = {
    Reporter: reporter,
    SanitizeOptions: sanitizeOptions,
  };
  const [scope, closer] = NewRootScope(opts, Second);
  return [WrapScope(isReplay, scope, new realClock({})), closer, reporter];
}

export let safeCharacters = [];

export let sanitizeOptions = undefined as any; // @unlowered-var: tally.SanitizeOptions{ NameCharacters: tally.ValidCharacters{ Ranges: AlphanumericRange, Characters: safeCharacters, }, KeyCharacters: tally.ValidCharacters{ Ranges: AlphanumericRange, Characters: safeCharacters, }, ValueCharacters: tally.ValidCharacters{ Ranges: AlphanumericRange, Characters: safeCharacters, }, ReplacementCharacter: DefaultReplacementCharacter, }
