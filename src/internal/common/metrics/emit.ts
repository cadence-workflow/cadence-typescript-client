// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { SubsettableHistogram, RecordHistogram, StartHistogram } from './histograms.js';
import type { Scope } from '../../runtime/tally.js';
import { Stopwatch } from '../../runtime/tally.js';

/**
 * MetricEmitMode controls which metrics are emitted for latency measurements.
 */
export enum MetricEmitMode {
  EmitModeUnset = 0,
  EmitTimersOnly = 1,
  EmitBoth = 2,
  EmitHistogramsOnly = 3,
}

/**
 * DualStopwatch is a stopwatch that emits metrics based on the current emit mode setting.
 * This supports flexible metric emission during timer→histogram migration.
 */
export class DualStopwatch {
  constructor(init?: Partial<DualStopwatch>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  timerSW?: Stopwatch;

  histogramSW?: Stopwatch;

  mode: MetricEmitMode = 0;

  Stop(): void {
    switch (this.mode) {
      case MetricEmitMode.EmitTimersOnly:
        this.timerSW!.Stop();
        break;
      case MetricEmitMode.EmitBoth:
        this.timerSW!.Stop();
        this.histogramSW!.Stop();
        break;
      case MetricEmitMode.EmitHistogramsOnly:
        this.histogramSW!.Stop();
        break;
    }
  }

}

/**
 * SetEmitMode configures the metric emission strategy.
 * This should be called during application initialization, before any metrics are emitted.
 * Alternatively, use WorkerOptions.FeatureFlags.MetricEmitMode.
 * This function is safe for concurrent use.
 * 
 * Example usage:
 * 
 * 	import "go.uber.org/cadence/internal/common/metrics"
 * 
 * 	func init() {
 * 	    // To use only timers (legacy behavior)
 * 	    metrics.SetEmitMode(metrics.EmitTimersOnly)
 * 	}
 */
export function SetEmitMode(mode: MetricEmitMode): void {
  currentEmitMode = mode;
}

/**
 * getCurrentEmitMode returns the current emission mode.
 * This function is safe for concurrent use.
 */
export function getCurrentEmitMode(): MetricEmitMode {
  return currentEmitMode as MetricEmitMode;
}

/**
 * GetCurrentEmitMode returns the current emission mode (exported for testing).
 * This function is safe for concurrent use.
 */
export function GetCurrentEmitMode(): MetricEmitMode {
  return currentEmitMode as MetricEmitMode;
}

/**
 * EmitLatency records latency based on the current emit mode setting.
 * This helper function supports flexible metric emission during timer→histogram migration.
 * 
 * Parameters:
 *   - scope: The tally scope to emit metrics to
 *   - name: The metric name (without suffix)
 *   - latency: The duration to record
 *   - buckets: The histogram bucket configuration to use
 * 
 * Example:
 * 
 * 	EmitLatency(scope, "decision-poll-latency", duration, Default1ms100s)
 */
export function EmitLatency(scope: Scope, name: string, latency: number, buckets: SubsettableHistogram): void {
  switch (getCurrentEmitMode()) {
    case MetricEmitMode.EmitTimersOnly:
      scope.Timer(name).Record(latency);
      break;
    case MetricEmitMode.EmitBoth:
      scope.Timer(name).Record(latency);
      RecordHistogram(scope, name, latency, buckets);
      break;
    case MetricEmitMode.EmitHistogramsOnly:
      RecordHistogram(scope, name, latency, buckets);
      break;
  }
}

/**
 * StartLatency creates a stopwatch that emits based on current emit mode setting.
 * Call .Stop() on the returned stopwatch to record the duration.
 * 
 * Parameters:
 *   - scope: The tally scope to emit metrics to
 *   - name: The metric name (without suffix)
 *   - buckets: The histogram bucket configuration to use
 * 
 * Example:
 * 
 * 	sw := StartLatency(scope, "activity-execution-latency", Default1ms100s)
 * 	// ... do work ...
 * 	sw.Stop()
 */
export function StartLatency(scope: Scope, name: string, buckets: SubsettableHistogram): DualStopwatch {
  const mode = getCurrentEmitMode();
  const sw = new DualStopwatch({ mode });

  switch (mode) {
    case MetricEmitMode.EmitTimersOnly:
      sw.timerSW = scope.Timer(name).Start();
      break;
    case MetricEmitMode.EmitBoth:
      sw.timerSW = scope.Timer(name).Start();
      sw.histogramSW = StartHistogram(scope, name, buckets);
      break;
    case MetricEmitMode.EmitHistogramsOnly:
      sw.histogramSW = StartHistogram(scope, name, buckets);
      break;
  }

  return sw;
}

/**
 * currentEmitMode is the active emission mode. Default is EmitBoth for migration.
 * This should be set during application initialization (e.g., in init() or before starting workers).
 * It should NOT be changed dynamically after workers have started.
 * Access via atomic operations for thread-safety.
 */
export let currentEmitMode = (MetricEmitMode.EmitBoth as any);
