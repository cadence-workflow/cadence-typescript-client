// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { internal_Channel, internal_Future, internal_Selector, internal_Settable, internal_WaitGroup, Await as internal_Await, GoNamed as internal_GoNamed, NewChannel as internal_NewChannel, NewBufferedChannel as internal_NewBufferedChannel, NewNamedBufferedChannel as internal_NewNamedBufferedChannel, NewWaitGroup as internal_NewWaitGroup, Sleep as internal_Sleep, Go as internal_Go, Now as internal_Now, NewFuture as internal_NewFuture, NewNamedChannel as internal_NewNamedChannel, NewSelector as internal_NewSelector, NewTimer as internal_NewTimer, NewNamedSelector as internal_NewNamedSelector } from '../internal/workflow.js';
import { workflow_Context } from './context.js';

/**
 * Channel must be used instead of native go channel by workflow code.
 * Use workflow.NewChannel(ctx) method to create Channel instance.
 */
export type workflow_Channel = internal_Channel;

/**
 * Future represents the result of an asynchronous computation.
 */
export type workflow_Future = internal_Future;

/**
 * Selector must be used instead of native go select by workflow code.
 * Use workflow.NewSelector(ctx) method to create a Selector instance.
 */
export type workflow_Selector = internal_Selector;

/**
 * Settable is used to set value or error on a future.
 * See more: workflow.NewFuture(ctx).
 */
export type workflow_Settable = internal_Settable;

/**
 * WaitGroup is used to wait for a collection of
 * coroutines to finish
 */
export type workflow_WaitGroup = internal_WaitGroup;

/**
 * Await blocks the calling thread until condition() returns true.
 * Do not mutate values or trigger side effects inside condition.
 * Returns CanceledError if the ctx is canceled.
 * The following code is going to block until the captured count
 * variable is set to 5.
 * 
 * 	workflow.Await(ctx, func() bool {
 * 	  return count == 5
 * 	})
 */
export async function Await(ctx: workflow_Context, condition: () => boolean): Promise<void> {
  await internal_Await(ctx, condition);
}

/**
 * NewChannel create new Channel instance
 */
export function NewChannel(ctx: workflow_Context): workflow_Channel {
  return internal_NewChannel(ctx);
}

/**
 * NewNamedChannel create new Channel instance with a given human readable name.
 * Name appears in stack traces that are blocked on this channel.
 */
export function NewNamedChannel(ctx: workflow_Context, name: string): workflow_Channel {
  return internal_NewNamedChannel(ctx, name);
}

/**
 * NewBufferedChannel create new buffered Channel instance
 */
export function NewBufferedChannel(ctx: workflow_Context, size: number): workflow_Channel {
  return internal_NewBufferedChannel(ctx, size);
}

/**
 * NewNamedBufferedChannel create new BufferedChannel instance with a given human readable name.
 * Name appears in stack traces that are blocked on this Channel.
 */
export function NewNamedBufferedChannel(ctx: workflow_Context, name: string, size: number): workflow_Channel {
  return internal_NewNamedBufferedChannel(ctx, name, size);
}

/**
 * NewSelector creates a new Selector instance.
 */
export function NewSelector(ctx: workflow_Context): workflow_Selector {
  return internal_NewSelector(ctx);
}

/**
 * NewNamedSelector creates a new Selector instance with a given human readable name.
 * Name appears in stack traces that are blocked on this Selector.
 */
export function NewNamedSelector(ctx: workflow_Context, name: string): workflow_Selector {
	return internal_NewNamedSelector(ctx, name);
}

/**
 * NewWaitGroup creates a new WaitGroup instance.
 */
export function NewWaitGroup(ctx: workflow_Context): workflow_WaitGroup {
	return internal_NewWaitGroup(ctx)
}

/**
 * Go creates a new coroutine. It has similar semantic to goroutine in a context of the workflow.
 */
export function Go(ctx: workflow_Context, f: (p0: workflow_Context) => void | Promise<void>): void {
  internal_Go(ctx, f);
}

/**
 * GoNamed creates a new coroutine with a given human readable name.
 * It has similar semantic to goroutine in a context of the workflow.
 * Name appears in stack traces that include this coroutine.
 */
export function GoNamed(ctx: workflow_Context, name: string, f: (p0: workflow_Context) => void | Promise<void>): void {
  internal_GoNamed(ctx, name, f);
}

/**
 * NewFuture creates a new future as well as associated Settable that is used to set its value.
 */
export function NewFuture(ctx: workflow_Context): [workflow_Future, workflow_Settable] {
  return internal_NewFuture(ctx);
}

/**
 * Now returns the time that the current decision task was started.
 * Workflows need to base any behavior off this time, rather than `time.Now()`, because `time.Now()` will change during
 * future replays.
 * 
 * Because it is based on the decision task start time (not the scheduled time), this means it is nearly identical to
 * `time.Now()`, with roughly only RPC delay difference, clock skew, etc.
 * However, because it is stable during a decision task, operations like this will not work like a normal `time.Time`:
 * 
 * 	before := workflow.Now(ctx)
 * 	somethingComputationallyExpensive() // no activities, i.e. non-blocking, takes 1 second to compute
 * 	after := workflow.Now(ctx)
 * 	elapsed := after.Sub(before) // this will be 0
 * 
 * It will however show the elapsed time spent waiting for an activity and any decision task delays, because there will
 * be a new decision task for the second `workflow.Now(ctx)` call:
 * 
 * 	before := workflow.Now(ctx)
 * 	workflow.ExecuteActivity(...).Get(ctx, nil) // takes 1 second to schedule, run, and schedule the new decision task
 * 	after := workflow.Now(ctx)
 * 	elapsed := after.Sub(before) // this will be 1 second or more (depending on when the decision task started).
 * 
 * Some actions may also advance `workflow.Now(ctx)` to a new time, e.g. local activities update the time when they
 * complete.  Generally speaking this occurs when there is a recorded event, as that event has a recorded time.
 */
export function Now(ctx: workflow_Context): number {
	return internal_Now(ctx);
}

/**
 * NewTimer returns immediately and the future becomes ready after the specified duration d. The workflow needs to use
 * this NewTimer() to get the timer instead of the Go lang library one(timer.NewTimer()). You can cancel the pending
 * timer by cancel the Context (using context from workflow.WithCancel(ctx)) and that will cancel the timer. After timer
 * is canceled, the returned Future become ready, and Future.Get() will return *CanceledError.
 * The current timer resolution implementation is in seconds and uses math.Ceil(d.Seconds()) as the duration. But is
 * subjected to change in the future.
 */
export function NewTimer(ctx: workflow_Context, d: number): workflow_Future {
    return internal_NewTimer(ctx, d);
}

/**
 * Sleep pauses the current workflow for at least the duration d. A negative or zero duration causes Sleep to return
 * immediately. Workflow code needs to use this Sleep() to sleep instead of the Go lang library one(timer.Sleep()).
 * You can cancel the pending sleep by cancel the Context (using context from workflow.WithCancel(ctx)).
 * Sleep() returns nil if the duration d is passed, or it returns *CanceledError if the ctx is canceled. There are 2
 * reasons the ctx could be canceled: 1) your workflow code cancel the ctx (with workflow.WithCancel(ctx));
 * 2) your workflow itself is canceled by external request.
 * The current timer resolution implementation is in seconds and uses math.Ceil(d.Seconds()) as the duration. But is
 * subjected to change in the future.
 */
export async function Sleep(ctx: workflow_Context, d: number): Promise<void> {
  await internal_Sleep(ctx, d);
}
