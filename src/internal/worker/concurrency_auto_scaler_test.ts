// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { Logger } from 'winston';
import { ConcurrencyAutoScaler, autoScalerEvent, newRollingAverage, NewConcurrencyAutoScaler } from './concurrency_auto_scaler.js';
import { Millisecond } from '../runtime/time.js';
import type { GoClock } from '../runtime/clock.js';
import { expect } from 'vitest';
import { NewResizablePermit } from './resizable_permit.js';
import { NoopScope } from '../runtime/tally.js';

export interface eventLog {
  eventType: autoScalerEvent;
  enabled: boolean;
  pollerQuota: number;
}

export async function createTestConcurrencyAutoScaler(logger: Logger, clock: GoClock): Promise<ConcurrencyAutoScaler> {
  return await NewConcurrencyAutoScaler({
    Concurrency: {
      PollerPermit: NewResizablePermit(100),
      TaskPermit: NewResizablePermit(1000),
    },
    Cooldown: 2 * testTickTime,
    Tick: testTickTime,
    PollerMaxCount: 200,
    PollerMinCount: 50,
    Logger: logger,
    Scope: NoopScope,
    Clock: clock,
    PollerWaitTimeLowerBound: 16 * Millisecond,
    PollerWaitTimeUpperBound: 256 * Millisecond,
  });
}

export async function TestConcurrencyAutoScaler(): Promise<void> {
  throw new globalThis.Error("not implemented"); // @stub
}

export async function TestRollingAverage(): Promise<void> {
  const cases: {
    name: string;
    cap: number;
    input: number[];
    expected: number[];
  }[] = [
    {
      name: "cap is 0",
      cap: 0,
      input: [1, 2, 3, 4, 5, 6, 7],
      expected: [0, 0, 0, 0, 0, 0, 0],
    },
    {
      name: "cap is 1",
      cap: 1,
      input: [1, 2, 3, 4, 5, 6, 7],
      expected: [1, 2, 3, 4, 5, 6, 7],
    },
    {
      name: "cap is 2",
      cap: 2,
      input: [1, 2, 3, 4, 5, 6, 7],
      expected: [1, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5],
    },
    {
      name: "cap is 3",
      cap: 3,
      input: [1, 2, 3, 4, 5, 6, 7],
      expected: [1, 1.5, 2, 3, 4, 5, 6],
    },
    {
      name: "cap is 4",
      cap: 4,
      input: [1, 2, 3, 4, 5, 6, 7],
      expected: [1, 1.5, 2, 2.5, 3.5, 4.5, 5.5],
    },
  ];

  for (const tt of cases) {
    const r = await newRollingAverage<number>(tt.cap);
    for (let i = 0; i < tt.input.length; i++) {
      await r.Add(tt.input[i]);
      expect(await r.Average()).toEqual(tt.expected[i]);
    }
  }
}

export async function TestRollingAverage_Race(): Promise<void> {
  throw new globalThis.Error("not implemented"); // @stub
}

export const testTickTime = 1000000000;

export const testTimeFormat = "15:04:05";
