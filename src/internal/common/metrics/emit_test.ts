// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { Millisecond } from '../../runtime/time.js';
import { WaitGroup } from '../../runtime/sync.js';
import { expect } from 'vitest';
import { EmitLatency, SetEmitMode, MetricEmitMode, GetCurrentEmitMode } from './emit.js';
import { Default1ms100s, High1ms24h, Low1ms100s, Mid1ms24h } from './histograms.js';
import { NewTestScope } from '../../runtime/tally.js';

export function TestEmitLatency_DefaultMode(): void {
  SetEmitMode(MetricEmitMode.EmitBoth);

  const scope = NewTestScope("test", {});
  EmitLatency(scope, "test-metric", 50 * Millisecond, Default1ms100s);

  const snapshot = scope.Snapshot();
  const timers = snapshot.Timers();
  const histograms = snapshot.Histograms();

  const timer = timers["test.test-metric+"];
  const timerExists = "test.test-metric+" in timers;
  const hist = histograms["test.test-metric_ns+"];
  const histExists = "test.test-metric_ns+" in histograms;

  expect(timerExists).toBe(true);
  expect(timer).not.toBeNull();
  expect(histExists).toBe(true);
  expect(hist).not.toBeNull();
}

export function TestEmitLatency_DualMode(): void {
  SetEmitMode(MetricEmitMode.EmitBoth);
  try {
    const scope = NewTestScope("test", {});
    EmitLatency(scope, "test-metric", 50 * Millisecond, Default1ms100s);

    const snapshot = scope.Snapshot();
    const timers = snapshot.Timers();
    const histograms = snapshot.Histograms();

    const timer = timers["test.test-metric+"];
    const timerExists = "test.test-metric+" in timers;
    const hist = histograms["test.test-metric_ns+"];
    const histExists = "test.test-metric_ns+" in histograms;

    expect(timerExists).toBe(true);
    expect(timer).not.toBeNull();
    expect(histExists).toBe(true);
    expect(hist).not.toBeNull();
  } finally {
    SetEmitMode(MetricEmitMode.EmitBoth);
  }
}

export function TestEmitLatency_HistogramOnlyMode(): void {
  SetEmitMode(MetricEmitMode.EmitHistogramsOnly);
  try {
    const scope = NewTestScope("test", {});
    EmitLatency(scope, "test-metric", 50 * Millisecond, Default1ms100s);

    const snapshot = scope.Snapshot();
    const timers = snapshot.Timers();
    const histograms = snapshot.Histograms();

    const timerExists = "test.test-metric+" in timers;
    const hist = histograms["test.test-metric_ns+"];
    const histExists = "test.test-metric_ns+" in histograms;

    expect(timerExists).toBe(false);
    expect(histExists).toBe(true);
    expect(hist).not.toBeNull();
  } finally {
    SetEmitMode(MetricEmitMode.EmitBoth);
  }
}

export function TestEmitLatency_TimersOnlyMode(): void {
  SetEmitMode(MetricEmitMode.EmitTimersOnly);
  try {
    const scope = NewTestScope("test", {});
    EmitLatency(scope, "test-metric", 50 * Millisecond, Default1ms100s);

    const snapshot = scope.Snapshot();
    const timers = snapshot.Timers();
    const histograms = snapshot.Histograms();

    const timer = timers["test.test-metric+"];
    const timerExists = "test.test-metric+" in timers;
    const histExists = "test.test-metric_ns+" in histograms;

    expect(timerExists).toBe(true);
    expect(timer).not.toBeNull();
    expect(histExists).toBe(false);
  } finally {
    SetEmitMode(MetricEmitMode.EmitBoth);
  }
}

export async function TestStartLatency_DefaultMode(): Promise<void> {
  throw new globalThis.Error("not implemented"); // @stub
}

export async function TestStartLatency_DualMode(): Promise<void> {
  throw new globalThis.Error("not implemented"); // @stub
}

export async function TestStartLatency_HistogramOnlyMode(): Promise<void> {
  throw new globalThis.Error("not implemented"); // @stub
}

export async function TestDualStopwatch_MultipleStops(): Promise<void> {
  throw new globalThis.Error("not implemented"); // @stub
}

export function TestEmitLatency_DifferentHistograms(): void {
  const tests = [
    { name: 'Default1ms100s', histogram: Default1ms100s },
    { name: 'Low1ms100s', histogram: Low1ms100s },
    { name: 'High1ms24h', histogram: High1ms24h },
    { name: 'Mid1ms24h', histogram: Mid1ms24h },
  ];

  for (const tt of tests) {
    SetEmitMode(MetricEmitMode.EmitBoth);
    try {
      const scope = NewTestScope('test', {});
      EmitLatency(
        scope,
        'test-metric',
        50 * Millisecond,
        tt.histogram as Parameters<typeof EmitLatency>[3],
      );

      const snapshot = scope.Snapshot();
      const timers = snapshot.Timers();
      const histograms = snapshot.Histograms();
      const timer = timers['test.test-metric+'];
      const timerOk = 'test.test-metric+' in timers;
      const hist = histograms['test.test-metric_ns+'];
      const histOk = 'test.test-metric_ns+' in histograms;

      expect(timerOk).toBe(true);
      expect(timer).not.toBeNull();
      expect(histOk).toBe(true);
      expect(hist).not.toBeNull();
    } finally {
      SetEmitMode(MetricEmitMode.EmitBoth);
    }
  }
}

export function TestMetricEmitMode_ConcurrentAccess(): void {
  const numGoroutines = 100;
  const iterations = 100;

  const wg = new WaitGroup();
  wg.Add(numGoroutines);

  for (let i = 0; i < numGoroutines; i++) {
    void (async (id: number) => {
      try {
        for (let j = 0; j < iterations; j++) {
          const mode = ((id + j) % 3) as MetricEmitMode;
          switch (mode) {
            case 0:
              SetEmitMode(MetricEmitMode.EmitTimersOnly);
              break;
            case 1:
              SetEmitMode(MetricEmitMode.EmitBoth);
              break;
            case 2:
              SetEmitMode(MetricEmitMode.EmitHistogramsOnly);
              break;
          }

          const currentMode = GetCurrentEmitMode();
          expect(
            currentMode >= MetricEmitMode.EmitModeUnset &&
              currentMode <= MetricEmitMode.EmitHistogramsOnly,
          ).toBe(true);
        }
      } finally {
        wg.Done();
      }
    })(i);
  }

  void wg.Wait().then(() => {
    SetEmitMode(MetricEmitMode.EmitBoth);
  });
}
