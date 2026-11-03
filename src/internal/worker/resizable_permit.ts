// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { Permit } from './concurrency.js';
import { Channel } from '../runtime/channel.js';
import { Context, withCancel } from '../runtime/context.js';
import { WaitGroup } from '../runtime/sync.js';
import type { GoSemaphore } from '../runtime/semaphore.js';
import { NewSemaphore } from '../runtime/semaphore.js';
import { mapCase, recvCase, selectOne, sendCase } from '../runtime/select.js';

export class resizablePermit implements Permit {
  constructor(init?: Partial<resizablePermit>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  sem?: GoSemaphore;

  async Acquire(ctx: Context): Promise<void> {
    try {
      await this.sem!.Acquire(ctx, 1);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
      throw new globalThis.Error(
        "failed to acquire permit before context is done: " + err.message,
        { cause: err },
      );
    }
  }

  Release(): void {
    this.sem!.Release(1);
  }

  Quota(): number {
    return this.sem!.GetLimit();
  }

  SetQuota(c: number): void {
    this.sem!.SetLimit(c);
  }

  Count(): number {
    return this.sem!.GetCount();
  }

  AcquireChan(ctx: Context): [Channel<{}>, () => void | Promise<void>] {
    const [ctxLocal, cancel] = withCancel(ctx);
    const pc = new permitChannel({
      p: this,
      c: new Channel<{}>(0),
      ctx: ctxLocal,
      cancel,
      wg: new WaitGroup(),
    });
    pc.Start();
    return [pc.C(), () => {
      pc.Close();
    }];
  }

}

/**
 * permitChannel is an implementation to acquire a permit through channel
 */
export class permitChannel {
  constructor(init?: Partial<permitChannel>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  p?: Permit;

  c?: Channel<{}>;

  ctx?: Context;

  cancel?: () => void;

  wg?: WaitGroup;

  C(): Channel<{}> {
    return this.c!;
  }

  Start(): void {
    this.wg!.Add(1);
    void (async () => {
      try {
        try {
          await this.p!.Acquire(this.ctx!);
        } catch (err) {
          if (!(err instanceof Error)) throw err;
          return;
        }

        const outcome = await selectOne([
          mapCase(sendCase(this.c, {}), () => ({ kind: "sent" as const })),
          mapCase(recvCase(this.ctx!.done()), () => ({ kind: "cancelled" as const })),
        ]);

        if (outcome.kind === "cancelled") {
          this.p!.Release();
        }
      } finally {
        this.wg!.Done();
      }
    })();
  }

  Close(): void {
    this.cancel!();
    this.wg!.Wait();
  }

}

/**
 * NewResizablePermit creates a dynamic permit that's resizable
 */
export function NewResizablePermit(initCount: number): Permit {
  return new resizablePermit({ sem: NewSemaphore(initCount) });
}
