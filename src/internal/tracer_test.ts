// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { background, withValue } from './runtime/context.js';
import { installGoTestW3CPropagator } from './runtime/tracing_test.js';
import { expect } from 'vitest';
import { NewHeaderReader, NewHeaderWriter } from './headers.js';
import { NewTracingContextPropagator } from './tracer.js';
import { Header } from '../generated/thrift/cadence-idl/com/uber/cadence/Header.js';
import { activeSpanContextKey, Background, GetSpanContext, WithSpanContext } from './context.js';
import { NoopLogger } from './runtime/logging.js';
import { trace } from '@opentelemetry/api';

export async function TestTracingContextPropagator(): Promise<void> {
    const tracer = {
        startSpan: (_name: string) => ({
            spanContext: () => ({
                traceId: '0123456789abcdef0123456789abcdef',
                spanId: '0123456789abcdef',
                traceFlags: 1,
                isRemote: false,
            }),
            end: () => {},
        }),
    } as Parameters<typeof NewTracingContextPropagator>[1];

    const ctxProp = NewTracingContextPropagator(NoopLogger(), tracer);
    const span = tracer.startSpan('test-operation');
    const ctx = withValue(background(), activeSpanContextKey, span);
    const header = new Header({ fields: new Map<string, Buffer>() });

    const writer = await NewHeaderWriter(header);
    ctxProp.Inject(ctx, writer);

    const returnCtx = ctxProp.Extract(background(), NewHeaderReader(header));
    expect(returnCtx.err()).toBeNull();

    const spanCtx = returnCtx.value(activeSpanContextKey);
    expect(spanCtx).not.toBeNull();
}

export async function TestTracingContextPropagatorNoSpan(): Promise<void> {
    const ctxProp = NewTracingContextPropagator(NoopLogger(), trace.getTracer('noop'));

    const header = new Header({
        fields: new Map(),
    });
    const writer = await NewHeaderWriter(header);
    ctxProp.Inject(background(), writer);

    let returnCtx = background();
    returnCtx = ctxProp.Extract(returnCtx, NewHeaderReader(header));
    const err = returnCtx.err();
    expect(err).toBeNull();
}

export async function TestTracingContextPropagatorWorkflowContext(): Promise<void> {
  const tracer = {
    startSpan: () => ({
      spanContext: () => ({
        traceId: '0123456789abcdef0123456789abcdef',
        spanId: '0123456789abcdef',
        traceFlags: 1,
        isRemote: false,
      }),
    }),
  } as unknown as Parameters<typeof NewTracingContextPropagator>[1];

  const ctxProp = NewTracingContextPropagator(NoopLogger(), tracer);
  const span = tracer.startSpan('test-operation');
  const spanContext = span.spanContext();
  expect(spanContext).not.toBeNull();

  const ctx = WithSpanContext(
    Background(),
    spanContext as unknown as AbortSignal,
  );
  const header = new Header({ fields: new Map() });

  const writer = await NewHeaderWriter(header);
  ctxProp.InjectFromWorkflow(ctx, writer);

  const returnCtx = ctxProp.ExtractToWorkflow(
    Background(),
    NewHeaderReader(header),
  );

  const returnCtx2 = ctxProp.ExtractToWorkflow(
    Background(),
    NewHeaderReader(header),
  );

  const newSpanContext = GetSpanContext(returnCtx);
  expect(newSpanContext).not.toBeNull();

  const newSpanContext2 = GetSpanContext(returnCtx2);
  expect(newSpanContext2).not.toBeNull();
  expect(newSpanContext2).toEqual(newSpanContext);
}

export async function TestTracingContextPropagatorWorkflowContextNoSpan(): Promise<void> {
    const ctxProp = NewTracingContextPropagator(NoopLogger(), trace.getTracer('noop'));

    const header = new Header({
        fields: new Map<string, Buffer>(),
    });
    const headerWriter = await NewHeaderWriter(header);
    ctxProp.InjectFromWorkflow(Background(), headerWriter);

    const returnCtx = Background();
    const extractedCtx = ctxProp.ExtractToWorkflow(returnCtx, NewHeaderReader(header));
    const err = extractedCtx.err();
    expect(err).toBeNull();
}

export async function TestConsistentInjectionExtraction(): Promise<void> {
  throw new globalThis.Error("not implemented"); // @stub
}

export const goTracingTestPropagatorInstalled = installGoTestW3CPropagator(); // registers the SDK-owned W3C test propagator globally
