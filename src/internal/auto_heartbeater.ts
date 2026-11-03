// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { ServiceInvoker } from './activity.js';
import { Channel } from './runtime/channel.js';
import { Context } from './runtime/context.js';
import type { GoClock } from './runtime/clock.js';
import { IWorkflowExecution as shared_IWorkflowExecution } from '../generated/thrift/cadence-idl/com/uber/cadence/WorkflowExecution.js';
import { IsCanceledError } from './error.js';
import { tagActivityType, tagRunID, tagWorkflowID } from './internal_logging_tags.js';
import { mapCase, recvCase, selectOne } from './runtime/select.js';
import { Logger } from 'winston';

export class autoHeartbeater {
  constructor(init?: Partial<autoHeartbeater>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  stopCh?: Channel<{}>;

  invoker?: ServiceInvoker;

  logger?: Logger;

  clock?: GoClock;

  activityType: string = "";

  execution?: shared_IWorkflowExecution;

  async Run(ctx: Context, timeout: number): Promise<void> {
    const autoHbInterval = timeout / 2;
    const ticker = this.clock!.NewTicker(autoHbInterval);
    try {
      for (;;) {
        const outcome = await selectOne([
          mapCase(recvCase(this.stopCh), () => "stop"),
          mapCase(recvCase(ctx.done()), () => "cancel"),
          mapCase(recvCase(ticker.Chan()), () => "tick"),
        ]);

        if (outcome === "stop" || outcome === "cancel") {
          return;
        }

        try {
          await this.invoker!.BackgroundHeartbeat();
        } catch (err) {
          if (!(err instanceof Error)) {
            throw err;
          }
          if (!IsCanceledError(err)) {
            this.logger!.error("Activity auto heartbeat error.", {
              [tagWorkflowID]: this.execution!.workflowId ?? "",
              [tagRunID]: this.execution!.runId ?? "",
              [tagActivityType]: this.activityType,
              error: err,
            });
          }
        }
      }
    } finally {
      ticker.Stop();
    }
  }

}

export function newHeartbeater(stopChannel: Channel<{}>, invoker: ServiceInvoker, logger: Logger, clock: GoClock, activityType: string, execution: shared_IWorkflowExecution): autoHeartbeater {
  return new autoHeartbeater({
    stopCh: stopChannel,
    invoker,
    logger,
    clock,
    activityType,
    execution,
  });
}
