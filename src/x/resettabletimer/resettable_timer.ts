// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { workflow_CancelFunc, workflow_Context, WithCancel } from '../../workflow/context.js';
import { workflow_Future, workflow_Settable, NewFuture, Go, NewTimer } from '../../workflow/deterministic_wrappers.js';
import { IsCanceledError } from '../../error.js';

export interface ResettableTimer {
  Reset(d: number): void;
}

export class resettabletimer_Timer {
  constructor(init?: Partial<resettabletimer_Timer>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  ctx?: workflow_Context;

  timerCtx?: workflow_Context;

  cancelTimer?: workflow_CancelFunc;

  Future?: workflow_Future;

  settable?: workflow_Settable;

  duration: number = 0;

  isReady: boolean = false;

  async startTimer(d: number): Promise<void> {
      this.duration = d;

      if (this.cancelTimer != null) {
          await this.cancelTimer();
      }

      [this.timerCtx, this.cancelTimer] = await WithCancel(this.ctx!);

      const timer = NewTimer(this.timerCtx, d);

      Go(this.ctx!, async (ctx) => {
          let err: Error | null = null;

          try {
              await timer.Get(ctx, null);
          } catch (caught) {
              if (!(caught instanceof Error)) {
                  throw caught;
              }
              err = caught;
          }

          if (!IsCanceledError(err) && !this.isReady) {
              this.isReady = true;
              this.settable!.Set(null, err);
          }
      });
  }

  async Reset(d: number): Promise<void> {
    if (!this.isReady) {
      await this.startTimer(d);
    }
  }

}

/**
 * New returns a timer that can be reset to restart its countdown. The timer becomes ready after the
 * specified duration d. The timer can be reset using timer.Reset(duration) with a new duration. This is useful for
 * implementing timeout patterns that should restart based on external events. The workflow needs to use this
 * New() instead of creating new timers repeatedly. The current timer resolution implementation is in
 * seconds and uses math.Ceil(d.Seconds()) as the duration. But is subjected to change in the future.
 */
export async function New(ctx: workflow_Context, d: number): Promise<resettabletimer_Timer> {
  const rt = new resettabletimer_Timer({
    ctx,
    duration: d,
    isReady: false,
  });
  [rt.Future, rt.settable] = NewFuture(ctx);
  rt.startTimer(d);
  return rt;
}
