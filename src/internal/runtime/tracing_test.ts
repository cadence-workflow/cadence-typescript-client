// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { trace, propagation } from '@opentelemetry/api';
import type { Context as OtelContext, TextMapPropagator, TextMapSetter, TextMapGetter } from '@opentelemetry/api';

/*
 * Test-harness stand-in for the Go tracer tests' opentracing tracer (jaeger
 * config / NoopTracer), which carries its own wire format. The TS SDK
 * propagates through OpenTelemetry's GLOBAL propagation API, and a bare
 * vitest environment registers none (the default is a noop that writes and
 * reads nothing), so every header round trip silently drops. This minimal W3C
 * traceparent propagator gives Inject/Extract a real wire format so the SDK's
 * own logic (span gating, header bridging, context restore, baggage round
 * trip) is what the assertions exercise.
 */
export class GoTestW3CPropagator implements TextMapPropagator {
  inject(context: OtelContext, carrier: unknown, setter: TextMapSetter): void {
    const sc = trace.getSpanContext(context) as any;
    // An all-zero trace id is the invalid span context a noop tracer mints;
    // Go's tracer likewise injects nothing for an unstarted span.
    if (sc == null || !/[1-9a-f]/.test(sc.traceId ?? '')) {
      return;
    }
    const flags = (sc.traceFlags ?? 0).toString(16).padStart(2, '0');
    setter.set(carrier, 'traceparent', `00-${sc.traceId}-${sc.spanId}-${flags}`);
    if (sc.baggage instanceof Map && sc.baggage.size > 0) {
      const parts: string[] = [];
      for (const [k, v] of sc.baggage) {
        parts.push(`${k}=${v}`);
      }
      setter.set(carrier, 'baggage', parts.join(','));
    }
  }

  extract(context: OtelContext, carrier: unknown, getter: TextMapGetter): OtelContext {
    const tp = getter.get(carrier, 'traceparent');
    const value = Array.isArray(tp) ? tp[0] : tp;
    if (value == null) {
      return context;
    }
    const m = /^00-([0-9a-f]{32})-([0-9a-f]{16})-([0-9a-f]{2})$/.exec(value);
    if (m == null) {
      return context;
    }
    const sc: any = {
      traceId: m[1],
      spanId: m[2],
      traceFlags: parseInt(m[3], 16),
      isRemote: true,
    };
    const bg = getter.get(carrier, 'baggage');
    const bgValue = Array.isArray(bg) ? bg[0] : bg;
    const baggage = new Map<string, string>();
    if (bgValue != null && bgValue !== '') {
      for (const part of bgValue.split(',')) {
        const eq = part.indexOf('=');
        if (eq > 0) {
          baggage.set(part.slice(0, eq), part.slice(eq + 1));
        }
      }
    }
    sc.baggage = baggage;
    // Non-enumerable: two extracts of one header must deep-equal, and each
    // extract mints a fresh closure.
    Object.defineProperty(sc, 'ForeachBaggageItem', {
      value: (fn: (k: string, v: string) => boolean): void => {
        for (const [k, v] of baggage) {
          if (!fn(k, v)) {
            return;
          }
        }
      },
      enumerable: false,
    });
    return trace.setSpanContext(context, sc);
  }

  fields(): string[] {
    return ['traceparent', 'baggage'];
  }
}

// Registers the propagator globally and reports success. Returned value exists
// so the generated test module can hold the call in a NAMED const — a named
// declaration survives merge/re-emit, where a bare statement would be dropped.
export function installGoTestW3CPropagator(): boolean {
  propagation.setGlobalPropagator(new GoTestW3CPropagator());
  return true;
}
