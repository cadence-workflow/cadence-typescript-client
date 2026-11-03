// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { internal_Context } from '../context.js';
import { internal_Future, internal_Settable, internal_WaitGroup, NewFuture, NewWaitGroup, GoNamed, NewBufferedChannel, NewNamedChannel } from '../workflow.js';

/**
 * BatchFuture is an implementation of public BatchFuture interface.
 */
export class batch_BatchFuture {
  constructor(init?: Partial<batch_BatchFuture>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  futures: internal_Future[] = [];

  settables: internal_Settable[] = [];

  factories: ((p0: internal_Context) => internal_Future)[] = [];

  batchSize: number = 0;

  wg?: internal_WaitGroup;

  GetFutures(): internal_Future[] {
    return this.futures;
  }

  async start(ctx: internal_Context): Promise<void> {
      const discardError = async (operation: Promise<unknown>): Promise<void> => {
          try {
              await operation;
          } catch (err) {
              if (!(err instanceof Error)) {
                  throw err;
              }
          }
      };

      const semaphore = NewBufferedChannel(ctx, this.batchSize);
      const workChan = NewNamedChannel(ctx, "batch-future-channel");

      this.wg!.Add(1);
      GoNamed(ctx, "batch-future-submitter", async (ctx: internal_Context) => {
          try {
              for (let i = 0; i < this.factories.length; i++) {
                  await discardError(semaphore.Send(ctx, undefined));
                  await discardError(workChan.Send(ctx, i));
              }
              workChan.Close();
          } finally {
              this.wg!.Done();
          }
      });

      this.wg!.Add(1);
      GoNamed(ctx, "batch-future-processor", async (ctx: internal_Context) => {
          try {
              const wgForFutures = NewWaitGroup(ctx);
              const idxBox: { value: number } = { value: 0 };

              while (await workChan.Receive(ctx, idxBox)) {
                  const idxLocal = idxBox.value;

                  wgForFutures.Add(1);
                  GoNamed(ctx, `batch-future-processor-one-future-${idxLocal}`, async (ctx: internal_Context) => {
                      try {
                          const f = this.factories[idxLocal](ctx);
                          this.settables[idxLocal].Chain(f);

                          await discardError(f.Get(ctx, undefined));
                          await discardError(semaphore.Receive(ctx, undefined));
                      } finally {
                          wgForFutures.Done();
                      }
                  });
              }

              await discardError(wgForFutures.Wait(ctx));
          } finally {
              this.wg!.Done();
          }
      });
  }

  IsReady(): boolean {
      for (const future of this.futures) {
          if (!future.IsReady()) {
              return false;
          }
      }
      return true;
  }

  async Get(ctx: internal_Context, valuePtr: unknown | undefined): Promise<void> {
      const errors: Error[] = [];

      if (valuePtr == null) {
          try {
              await this.wg!.Wait(ctx);
          } catch (err) {
              if (!(err instanceof Error)) throw err;
          }

          for (let i = 0; i < this.futures.length; i++) {
              try {
                  await this.futures[i].Get(ctx, null);
              } catch (err) {
                  if (!(err instanceof Error)) throw err;
                  errors.push(err);
              }
          }

          if (errors.length === 1) throw errors[0];
          if (errors.length > 1) throw new AggregateError(errors);
          return;
      }

      const sliceBox = valuePtr as { value: unknown };
      if (typeof valuePtr !== 'object' || valuePtr === null || !Array.isArray(sliceBox.value)) {
          const kind = valuePtr === null ? 'object' : typeof valuePtr;
          throw new Error(`valuePtr must be a pointer to a slice, got ${kind}`);
      }

      const slice = sliceBox.value;
      slice.length = this.futures.length;

      try {
          await this.wg!.Wait(ctx);
      } catch (err) {
          if (!(err instanceof Error)) throw err;
      }

      for (let i = 0; i < this.futures.length; i++) {
          const elementBox = { value: slice[i] };
          try {
              await this.futures[i].Get(ctx, elementBox);
          } catch (err) {
              if (!(err instanceof Error)) throw err;
              errors.push(err);
          } finally {
              slice[i] = elementBox.value;
          }
      }

      if (errors.length === 1) throw errors[0];
      if (errors.length > 1) throw new AggregateError(errors);
  }

}

export async function NewBatchFuture(ctx: internal_Context, batchSize: number, factories: ((p0: internal_Context) => internal_Future)[]): Promise<batch_BatchFuture> {
  const futures: internal_Future[] = [];
  const settables: internal_Settable[] = [];

  for (const _ of factories) {
    const [future, settable] = NewFuture(ctx);
    futures.push(future);
    settables.push(settable);
  }

  const batchFuture = new batch_BatchFuture({
    futures,
    settables,
    factories,
    batchSize,
    wg: NewWaitGroup(ctx),
  });

  batchFuture.start(ctx);
  return batchFuture;
}
