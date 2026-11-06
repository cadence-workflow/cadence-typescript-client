// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { internal_Context } from './context.js';
import { internal_ContextPropagator, internal_HeaderReader, internal_HeaderWriter } from './headers.js';
import { Context } from './runtime/context.js';
import { Second } from './runtime/time.js';
import { GetWorkerStopChannel } from './activity.js';
import { mapCase, recvCase, selectOne, timeoutCase } from './runtime/select.js';

export interface deadlineTest {
  actWaitDuration: number;
  ScheduleTS: number;
  ScheduleDuration: number;
  StartTS: number;
  StartDuration: number;
  err?: Error | null;
}

export class failingContextPropagator implements internal_ContextPropagator {
  constructor(init?: Partial<failingContextPropagator>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  err?: Error | null;

  Inject(ctx: Context, writer: internal_HeaderWriter): Error | null {
    return this.err!;
  }

  Extract(ctx: Context, reader: internal_HeaderReader): Context {
    if (this.err) {
      throw this.err;
    }
    return undefined as unknown as Context;
  }

  InjectFromWorkflow(ctx: internal_Context, writer: internal_HeaderWriter): Error | null {
    return this.err!;
  }

  ExtractToWorkflow(ctx: internal_Context, reader: internal_HeaderReader): internal_Context {
    if (this.err!) {
      throw this.err!;
    }
    return null as unknown as internal_Context;
  }

}

export async function activityWithWorkerStop(ctx: Context): Promise<void> {
  console.log("Executing Activity with worker stop");
  const workerStopCh = GetWorkerStopChannel(ctx);

  const outcome = await selectOne([
    mapCase(recvCase(workerStopCh), () => ({ kind: 'stop' as const })),
    mapCase(timeoutCase(5 * Second), () => ({ kind: 'timeout' as const })),
  ]);

  if (outcome.kind === 'timeout') {
    throw new Error("Activity failed to handle worker stop event");
  }
}
