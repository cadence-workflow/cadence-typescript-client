// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { Mutex } from 'async-mutex';
import { ConcurrencyLimit } from './concurrency.js';
import { Channel } from '../runtime/channel.js';
import { Millisecond } from '../runtime/time.js';
import type { Scope } from '../runtime/tally.js';
import { WaitGroup } from '../runtime/sync.js';
import type { GoClock } from '../runtime/clock.js';
import { MustMakeExponentialDurationBuckets, MustMakeExponentialValueBuckets } from '../runtime/tally.js';
import { IAutoConfigHint as shared_IAutoConfigHint } from '../../generated/thrift/cadence-idl/com/uber/cadence/AutoConfigHint.js';
import { ConcurrencyAutoScalerScope } from '../common/metrics/constants.js';
import { mapCase, recvCase, selectOne } from '../runtime/select.js';
import { Logger } from 'winston';

export interface ConcurrencyAutoScalerInput {
  Concurrency?: ConcurrencyLimit;
  Cooldown: number;
  Tick: number;
  PollerMaxCount: number;
  PollerMinCount: number;
  PollerWaitTimeUpperBound: number;
  PollerWaitTimeLowerBound: number;
  Logger?: Logger;
  Scope?: Scope;
  Clock?: GoClock;
}

export type autoScalerEvent = string;

export class ConcurrencyAutoScaler {
  constructor(init?: Partial<ConcurrencyAutoScaler>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  shutdownChan?: Channel<{}>;

  wg: WaitGroup = new WaitGroup();

  log?: Logger;

  scope?: Scope;

  clock?: GoClock;

  concurrency?: ConcurrencyLimit;

  cooldown: number = 0;

  updateTick: number = 0;

  lock: Mutex = new Mutex();

  enabled: boolean = false;

  pollerInitCount: number = 0;

  pollerMaxCount: number = 0;

  pollerMinCount: number = 0;

  pollerWaitTime?: rollingAverage<number>;

  pollerPermitLastUpdate: number = 0;

  pollerWaitTimeUpperBound: number = 0;

  pollerWaitTimeLowerBound: number = 0;

  async Stop(): Promise<void> {
    if (this == null) {
      return;
    }
    await this.lock.acquire();
    await this.logEvent(autoScalerEventStop);
    this.lock.release();
    this.shutdownChan!.close();
    await this.wg.Wait();
  }

  async ProcessPollerHint(hint: shared_IAutoConfigHint | undefined): Promise<void> {
    if (hint == null) {
      return;
    }

    const release = await this.lock.acquire();
    try {
      if (hint.pollerWaitTimeInMs != null && hint.pollerWaitTimeInMs.toNumber() >= 0) {
        const waitTimeInMs = hint.pollerWaitTimeInMs.toNumber();
        await this.pollerWaitTime!.Add(Millisecond * waitTimeInMs);
      }

      let shouldEnable = false;
      if (hint.enableAutoConfig != null && hint.enableAutoConfig) {
        shouldEnable = true;
      }

      if (shouldEnable !== this.enabled) {
        this.enabled = shouldEnable;
        if (shouldEnable) {
          await this.logEvent(autoScalerEventEnable);
        } else {
          this.resetConcurrency();
          await this.logEvent(autoScalerEventDisable);
        }
      }
    } finally {
      release();
    }
  }

  resetConcurrency(): void {
    this.concurrency!.PollerPermit!.SetQuota(this.pollerInitCount);
  }

  async updatePollerPermit(): Promise<void> {
    if (!this.enabled) {
      await this.logEvent(autoScalerEventPollerSkipUpdateNotEnabled);
      return;
    }

    const updateTime = this.clock!.Now();
    if (updateTime < this.pollerPermitLastUpdate + this.cooldown) {
      await this.logEvent(autoScalerEventPollerSkipUpdateCooldown);
      return;
    }

    let newQuota = 0;
    const pollerWaitTime = await this.pollerWaitTime!.Average();

    if (pollerWaitTime < this.pollerWaitTimeLowerBound) {
      newQuota = this.scaleUpPollerPermit(pollerWaitTime);
      this.concurrency!.PollerPermit!.SetQuota(newQuota);
      this.pollerPermitLastUpdate = updateTime;
      await this.logEvent(autoScalerEventPollerScaleUp);
    } else if (pollerWaitTime > this.pollerWaitTimeUpperBound) {
      newQuota = this.scaleDownPollerPermit(pollerWaitTime);
      this.concurrency!.PollerPermit!.SetQuota(newQuota);
      this.pollerPermitLastUpdate = updateTime;
      await this.logEvent(autoScalerEventPollerScaleDown);
    } else {
      await this.logEvent(autoScalerEventPollerSkipUpdateNoChange);
    }
  }

  scaleUpPollerPermit(pollerWaitTime: number): number {
    const currentQuota = this.concurrency!.PollerPermit!.Quota();
    let newQuota = Math.sign(
      currentQuota * smoothingFunc(this.pollerWaitTimeLowerBound) / smoothingFunc(pollerWaitTime),
    ) * Math.floor(
      Math.abs(
        currentQuota * smoothingFunc(this.pollerWaitTimeLowerBound) / smoothingFunc(pollerWaitTime),
      ) + 0.5,
    );
    newQuota = Math.max(
      this.pollerMinCount,
      Math.min(this.pollerMaxCount, newQuota),
    );
    return Math.trunc(newQuota);
  }

  scaleDownPollerPermit(pollerWaitTime: number): number {
    const currentQuota = this.concurrency!.PollerPermit!.Quota();

    let newQuota = Math.sign(
      currentQuota *
        smoothingFunc(this.pollerWaitTimeUpperBound) /
        smoothingFunc(pollerWaitTime),
    ) *
      Math.floor(
        Math.abs(
          currentQuota *
            smoothingFunc(this.pollerWaitTimeUpperBound) /
            smoothingFunc(pollerWaitTime),
        ) + 0.5,
      );

    newQuota = Math.max(
      this.pollerMinCount,
      Math.min(this.pollerMaxCount, newQuota),
    );

    return Math.trunc(newQuota);
  }

  async logEvent(event: autoScalerEvent): Promise<void> {
    if (this.enabled) {
      this.scope!.Counter(metricsEnabled).Inc(1);
    } else {
      this.scope!.Counter(metricsDisabled).Inc(1);
    }

    this.scope!
      .Histogram(metricsPollerQuota, metricsPollerQuotaBuckets)
      .RecordValue(this.concurrency!.PollerPermit!.Quota());

    this.scope!
      .Histogram(metricsPollerWaitTime, metricsPollerWaitTimeBuckets)
      .RecordDuration(await this.pollerWaitTime!.Average());

    if (event !== autoScalerEventEmitMetrics) {
      this.log!.debug(autoScalerEventLogMsg, {
        event: event,
        enabled: this.enabled,
        poller_quota: this.concurrency!.PollerPermit!.Quota(),
      });
    }
  }

  async Start(): Promise<void> {
    if (this == null) {
      return;
    }

    try {
      await this.logEvent(autoScalerEventStart);
    } catch (err) {
      if (!(err instanceof Error)) {
        throw err;
      }
    }

    this.wg.Add(1);
    const createdBy = (new Error().stack ?? "").split("\n").slice(2).join("\n");

    void (async () => {
      try {
        const ticker = this.clock!.NewTicker(this.updateTick);
        try {
          for (;;) {
            const outcome = await selectOne([
              mapCase(recvCase(this.shutdownChan), () => ({ kind: "shutdown" as const })),
              mapCase(recvCase(ticker.Chan()), () => ({ kind: "tick" as const })),
            ]);

            if (outcome.kind === "shutdown") {
              return;
            }

            await this.lock.acquire();
            try {
              try {
                await this.logEvent(autoScalerEventEmitMetrics);
              } catch (err) {
                if (!(err instanceof Error)) {
                  throw err;
                }
              }

              try {
                await this.updatePollerPermit();
              } catch (err) {
                if (!(err instanceof Error)) {
                  throw err;
                }
              }
            } finally {
              this.lock.release();
            }
          }
        } finally {
          ticker.Stop();
        }
      } catch (r) {
        if (r != null) {
          let stack = r instanceof Error ? (r.stack ?? "") : "";
          if (createdBy !== "") {
            stack = `${stack}\ncreated by:\n${createdBy}`;
          }
          this.log!.error("panic in concurrency auto scaler, stopping the auto scaler", {
            error: r,
            stack,
          });
        }
      } finally {
        this.wg.Done();
      }
    })();
  }

}

export class rollingAverage<T> {
  constructor(init?: Partial<rollingAverage<T>>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  mu: Mutex = new Mutex();

  window: T[] = [];

  index: number = 0;

  sum: T = 0 as unknown as T;

  count: number = 0;

  async Add(value: T): Promise<void> {
    if (this.window.length === 0) {
      return;
    }

    const release = await this.mu.acquire();
    try {
      this.sum = ((this.sum as any) + (value as any) - (this.window[this.index]! as any)) as T;
      this.window[this.index] = value;
      this.index++;
      this.index %= this.window.length;

      if (this.count < this.window.length) {
        this.count++;
      }
    } finally {
      release();
    }
  }

  async Average(): Promise<T> {
    const release = await this.mu.acquire();
    try {
      if (this.count === 0) {
        return 0 as unknown as T;
      }
      return ((this.sum as any) / this.count) as T;
    } finally {
      release();
    }
  }

}

/**
 * smoothingFunc is a log2 function with offset to smooth the scaling and address 0 values
 */
export function smoothingFunc(x: number): number {
  return Math.log2(2 + Math.trunc(x / Millisecond));
}

export function newRollingAverage<T>(capacity: number): rollingAverage<T> {
  return new rollingAverage<T>({
    window: Array.from({ length: capacity }, () => 0 as unknown as T),
  });
}

export function NewConcurrencyAutoScaler(input: ConcurrencyAutoScalerInput): ConcurrencyAutoScaler {
  const tick = input.Tick !== 0 ? input.Tick : defaultAutoScalerUpdateTick;
  return new ConcurrencyAutoScaler({
    shutdownChan: new Channel<{}>(0),
    concurrency: input.Concurrency,
    cooldown: input.Cooldown,
    log: input.Logger!.child({ component: ConcurrencyAutoScalerScope }),
    scope: input.Scope!.SubScope(ConcurrencyAutoScalerScope),
    clock: input.Clock,
    updateTick: tick,
    enabled: false,
    pollerInitCount: input.Concurrency!.PollerPermit!.Quota(),
    pollerMaxCount: input.PollerMaxCount,
    pollerMinCount: input.PollerMinCount,
    pollerWaitTime: newRollingAverage<number>(numberOfPollsInRollingAverage),
    pollerWaitTimeUpperBound: input.PollerWaitTimeUpperBound,
    pollerWaitTimeLowerBound: input.PollerWaitTimeLowerBound,
    pollerPermitLastUpdate: input.Clock!.Now(),
    lock: new Mutex(),
    wg: new WaitGroup(),
  });
}

export const autoScalerEventDisable = "auto-scaler-disable";

export const autoScalerEventEmitMetrics = "auto-scaler-emit-metrics";

export const autoScalerEventEnable = "auto-scaler-enable";

export const autoScalerEventLogMsg = "concurrency auto scaler event";

export const autoScalerEventPollerScaleDown = "poller-limit-scale-down";

export const autoScalerEventPollerScaleUp = "poller-limit-scale-up";

export const autoScalerEventPollerSkipUpdateCooldown = "poller-limit-skip-update-cooldown";

export const autoScalerEventPollerSkipUpdateNoChange = "poller-limit-skip-update-no-change";

export const autoScalerEventPollerSkipUpdateNotEnabled = "poller-limit-skip-update-not-enabled";

export const autoScalerEventStart = "auto-scaler-start";

export const autoScalerEventStop = "auto-scaler-stop";

export const defaultAutoScalerUpdateTick = 1000000000;

export const metricsDisabled = "disabled";

export const metricsEnabled = "enabled";

export const metricsPollerQuota = "poller-quota";

export const metricsPollerWaitTime = "poller-wait-time";

export const numberOfPollsInRollingAverage = 5;

export let metricsPollerQuotaBuckets = MustMakeExponentialValueBuckets(1, 2, 10);

export let metricsPollerWaitTimeBuckets = MustMakeExponentialDurationBuckets(1*Millisecond, 2, 14);
