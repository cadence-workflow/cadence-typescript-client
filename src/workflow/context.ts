// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { internal_CancelFunc, internal_Context, ErrCanceled as internal_ErrCanceled, ErrDeadlineExceeded as internal_ErrDeadlineExceeded, NewDisconnectedContext as internal_NewDisconnectedContext, WithSpanContext as internal_WithSpanContext, WithCancel as internal_WithCancel, GetSpanContext as internal_GetSpanContext, WithValue as internal_WithValue } from '../internal/context.js';

/**
 * A CancelFunc tells an operation to abandon its work.
 * A CancelFunc does not wait for the work to stop.
 * After the first call, subsequent calls to a CancelFunc do nothing.
 */
export type workflow_CancelFunc = internal_CancelFunc;

/**
 * Context is a clone of context.Context with Done() returning Channel instead
 * of native channel.
 * A Context carries a deadline, a cancellation signal, and other values across
 * API boundaries.
 * 
 * Context's methods may be called by multiple goroutines simultaneously.
 */
export type workflow_Context = internal_Context;

/**
 * WithCancel returns a copy of parent with a new Done channel. The returned
 * context's Done channel is closed when the returned cancel function is called
 * or when the parent context's Done channel is closed, whichever happens first.
 * 
 * Canceling this context releases resources associated with it, so code should
 * call cancel as soon as the operations running in this Context complete.
 */
export async function WithCancel(parent: workflow_Context): Promise<[workflow_Context, workflow_CancelFunc]> {
  return await internal_WithCancel(parent);
}

/**
 * WithValue returns a copy of parent in which the value associated with key is
 * val.
 * 
 * Use context Values only for request-scoped data that transits processes and
 * APIs, not for passing optional parameters to functions.
 */
export function WithValue(parent: workflow_Context, key: unknown, val: unknown): workflow_Context {
	return internal_WithValue(parent, key, val);
}

/**
 * NewDisconnectedContext returns a new context that won't propagate parent's cancellation to the new child context.
 * One common use case is to do cleanup work after workflow is cancelled.
 * 
 * 	err := workflow.ExecuteActivity(ctx, ActivityFoo).Get(ctx, &activityFooResult)
 * 	if err != nil && cadence.IsCanceledError(ctx.Err()) {
 * 	  // activity failed, and workflow context is canceled
 * 	  disconnectedCtx, _ := workflow.newDisconnectedContext(ctx);
 * 	  workflow.ExecuteActivity(disconnectedCtx, handleCancellationActivity).Get(disconnectedCtx, nil)
 * 	  return err // workflow return CanceledError
 * 	}
 */
export async function NewDisconnectedContext(parent: workflow_Context): Promise<[workflow_Context, workflow_CancelFunc]> {
  return await internal_NewDisconnectedContext(parent);
}

/**
 * GetSpanContext returns the [opentracing.SpanContext] from [Context].
 * Returns nil if tracer is not set in [go.uber.org/cadence/worker.Options].
 * 
 * Note: If tracer is set, we already activate a span for each workflow.
 * This SpanContext will be passed to the activities and child workflows to start new spans.
 * 
 * Example Usage:
 * 
 * 	span := GetSpanContext(ctx)
 * 	if span != nil {
 * 		span.SetTag("foo", "bar")
 * 	}
 */
export function GetSpanContext(ctx: workflow_Context): AbortSignal {
  return internal_GetSpanContext(ctx)!;
}

/**
 * WithSpanContext returns [Context] with override [opentracing.SpanContext].
 * This is useful to modify baggage items of current workflow and pass it to activities and child workflows.
 * 
 * Example Usage:
 * 
 * 	func goodWorkflow(ctx Context) (string, error) {
 * 		// start a short lived new workflow span within SideEffect to avoid duplicate span creation during replay
 * 		type spanActivationResult struct {
 * 			Carrier map[string]string // exported field so it's json encoded
 * 			Err     error
 * 		}
 * 		resultValue := workflow.SideEffect(ctx, func(ctx workflow.Context) interface{} {
 * 			wSpan := w.tracer.StartSpan("workflow-operation-with-new-span", opentracing.ChildOf(workflow.GetSpanContext(ctx)))
 * 			defer wSpan.Finish()
 * 			wSpan.SetBaggageItem("some-key", "some-value")
 * 			carrier := make(map[string]string)
 * 			err := w.tracer.Inject(wSpan.Context(), opentracing.TextMap, opentracing.TextMapCarrier(carrier))
 * 			return spanActivationResult{Carrier: carrier, Err: err}
 * 		})
 * 		var activationResult spanActivationResult
 * 		if err := resultValue.Get(&activationResult); err != nil {
 * 			return nil, fmt.Errorf("failed to decode span activation result: %v", err)
 * 		}
 * 		if activationResult.Err != nil {
 * 			return nil, fmt.Errorf("failed to activate new span: %v", activationResult.Err)
 * 		}
 * 		spanContext, err := w.tracer.Extract(opentracing.TextMap, opentracing.TextMapCarrier(activationResult.Carrier))
 * 		if err != nil {
 * 			return nil, fmt.Errorf("failed to extract span context: %v", err)
 * 		}
 * 		ctx = workflow.WithSpanContext(ctx, spanContext)
 * 		var activityFooResult string
 * 		aCtx := workflow.WithActivityOptions(ctx, opts)
 * 		err = workflow.ExecuteActivity(aCtx, activityFoo).Get(aCtx, &activityFooResult)
 * 		return activityFooResult, err
 * 	}
 * 
 * Bad Example:
 * 
 * 	func badWorkflow(ctx Context) (string, error) {
 * 		// start a new workflow span for EVERY REPLAY
 * 		wSpan := opentracing.StartSpan("workflow-operation", opentracing.ChildOf(GetSpanContext(ctx)))
 * 		wSpan.SetBaggageItem("some-key", "some-value")
 * 		// pass the new span context to activity
 * 		ctx = WithSpanContext(ctx, wSpan.Context())
 * 	    aCtx := workflow.WithActivityOptions(ctx, opts)
 * 		var activityFooResult string
 * 		err := ExecuteActivity(aCtx, activityFoo).Get(aCtx, &activityFooResult)
 * 		wSpan.Finish()
 * 		return activityFooResult, err
 * 	}
 * 
 * 	func activityFoo(ctx Context) (string, error) {
 * 		return "activity-foo-result", nil
 * 	}
 */
export function WithSpanContext(ctx: workflow_Context, spanContext: AbortSignal): workflow_Context {
  return internal_WithSpanContext(ctx, spanContext);
}

/**
 * ErrCanceled is the error returned by Context.Err when the context is canceled.
 */
export let ErrCanceled = internal_ErrCanceled;

/**
 * ErrDeadlineExceeded is the error returned by Context.Err when the context's
 * deadline passes.
 */
export let ErrDeadlineExceeded = internal_ErrDeadlineExceeded;
