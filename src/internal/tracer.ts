// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { internal_Context, activeSpanContextKey, WithSpanContext, GetSpanContext } from './context.js';
import { internal_ContextPropagator, internal_HeaderReader, internal_HeaderWriter } from './headers.js';
import { Context, withValue } from './runtime/context.js';
import { ROOT_CONTEXT, propagation, trace, Span } from '@opentelemetry/api';
import { Logger } from 'winston';

export class tracingReader {
  constructor(init?: Partial<tracingReader>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  reader?: internal_HeaderReader;

  ForeachKey(handler: (p0: string, p1: string) => void | Promise<void>): void {
    this.reader!.ForEachKey((k: string, v: Buffer) => {
      handler(k, (v ?? Buffer.alloc(0)).toString());
    });
  }

}

export class tracingWriter {
  constructor(init?: Partial<tracingWriter>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  writer?: internal_HeaderWriter;

  Set(key: string, val: string): void {
    this.writer!.Set(key, Buffer.from(val));
  }

}

/**
 * tracingContextPropagator implements the ContextPropagator interface for
 * tracing context propagation.
 * 
 * Inject -> context.Context to Header - this extracts the Span from the
 * 
 * 	context and places the SpanContext into the Header
 * 
 * Extract -> Header to context.Context - this extracts the SpanContext from
 * 
 * 	the header, returns a context.Context containing the SpanContext
 * 
 * InjectFromWorkflow -> Context to Header - extracts a SpanContext from the
 * 
 * 	workflow context and puts it in the header
 * 
 * ExtractToWorkflow -> Header to Context - takes the SpanContext present in
 * 
 * 	the header and puts it in the Context object. Does not start a new span
 * 	as that is started outside when the workflow is actually executed
 */
export class tracingContextPropagator implements internal_ContextPropagator {
  constructor(init?: Partial<tracingContextPropagator>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  logger?: Logger;

  tracer?: unknown;

  Inject(ctx: Context, hw: internal_HeaderWriter): void {
    const span = ctx.value<Span>(activeSpanContextKey);
    if (span == null) {
      return;
    }

    const carrier: Record<string, string> = {};
    propagation.inject(
      trace.setSpanContext(ROOT_CONTEXT, span.spanContext()),
      carrier,
    );

    const writer = new tracingWriter({ writer: hw });
    for (const [key, value] of Object.entries(carrier)) {
      writer.Set(key, value);
    }
  }

  Extract(ctx: Context, hr: internal_HeaderReader): Context {
    const carrier: Record<string, string> = {};
    const reader = new tracingReader({ reader: hr });
    reader.ForeachKey((key: string, value: string) => {
      carrier[key] = value;
    });
    const sc = trace.getSpanContext(propagation.extract(ROOT_CONTEXT, carrier));
    if (sc == null) {
      return ctx;
    }
    return withValue(ctx, activeSpanContextKey, sc);
  }

  InjectFromWorkflow(ctx: internal_Context, hw: internal_HeaderWriter): void {
    const spanContext = GetSpanContext(ctx);
    if (spanContext == null) {
      return;
    }
    (this.tracer! as {
      Inject(spanContext: AbortSignal, format: unknown, carrier: tracingWriter): void;
    }).Inject(spanContext, 'text_map', new tracingWriter({ writer: hw }));
  }

  ExtractToWorkflow(ctx: internal_Context, hr: internal_HeaderReader): internal_Context {
    const reader = new tracingReader({ reader: hr });
    const carrier: Record<string, string> = {};
    reader.ForeachKey((key: string, value: string) => {
      carrier[key] = value;
    });
    const sc = trace.getSpanContext(propagation.extract(ROOT_CONTEXT, carrier));
    if (sc == null) {
      return ctx;
    }
    return WithSpanContext(ctx, sc as unknown as AbortSignal);
  }

}

/**
 * NewTracingContextPropagator returns new tracing context propagator object
 */
export function NewTracingContextPropagator(logger: Logger, tracer: unknown): internal_ContextPropagator {
  return new tracingContextPropagator({ logger, tracer });
}
