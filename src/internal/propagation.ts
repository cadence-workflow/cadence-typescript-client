// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { Context, withValue } from './runtime/context.js';
import { activeSpanContextKey } from './context.js';
import { Span, trace } from '@opentelemetry/api';

/**
 * createOpenTracingWorkflowSpan creates a new context with a workflow started span
 */
export function createOpenTracingWorkflowSpan(ctx: Context, tracer: unknown, start: number, workflowType: string, workflowID: string): [Context, unknown] {
  const tags: Record<string, unknown> = {
    [workflowTag]: workflowID,
  };
  return createOpenTracingSpan(ctx, tracer, start, workflowType, tags);
}

/**
 * createOpenTracingActivitySpan creates a new context with an activity started span
 */
export function createOpenTracingActivitySpan(ctx: Context, tracer: unknown, start: number, activityType: string, workflowID: string, runID: string): [Context, unknown] {
  const tags: Record<string, unknown> = {
    workflowTag: workflowID,
    runTag: runID,
  };
  return createOpenTracingSpan(ctx, tracer, start, activityType, tags);
}

export function createOpenTracingSpan(ctx: Context, tracer: unknown, start: number, name: string, tags: Record<string, unknown>): [Context, unknown] {
  const noopTracer = trace.getTracer('noop');
  if (tracer === noopTracer) {
    return [ctx, noopTracer.startSpan('StartWorkflow-Span')];
  }

  const parentSpan = ctx.value<Span>(activeSpanContextKey);
  let parent: unknown;
  if (parentSpan != null) {
    parent = parentSpan.spanContext();
  } else {
    const spanContext = ctx.value<unknown>(activeSpanContextKey);
    if (spanContext != null) {
      parent = spanContext;
    }
  }

  const span = (tracer as {
    startSpan: (name: string, options?: unknown) => unknown;
  }).startSpan(name, {
    startTime: start,
    attributes: tags,
    links: parent != null ? [{ context: parent }] : [],
  });

  return [withValue(ctx, activeSpanContextKey, span), span];
}

export const runTag = "cadenceRunID";

export const workflowTag = "cadenceWorkflowID";
