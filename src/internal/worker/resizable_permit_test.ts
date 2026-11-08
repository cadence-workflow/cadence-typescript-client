// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { background, withCancel, withTimeout } from '../runtime/context.js';
import { Millisecond } from '../runtime/time.js';
import { WaitGroup } from '../runtime/sync.js';
import { expect } from 'vitest';
import { NewResizablePermit } from './resizable_permit.js';

export async function TestPermit_Simulation(): Promise<void> {
  const tests: {
    name: string;
    capacity: number[];
    goroutines: number;
    maxTestDuration: number;
    expectFailuresRange: number[];
  }[] = [
    {
      name: "enough permit, no blocking",
      maxTestDuration: 200 * Millisecond,
      capacity: [10000],
      goroutines: 1000,
      expectFailuresRange: [0, 0],
    },
    {
      name: "not enough permit, blocking but all acquire",
      maxTestDuration: 800 * Millisecond,
      capacity: [200],
      goroutines: 1000,
      expectFailuresRange: [0, 0],
    },
    {
      name: "not enough permit for some to acquire, fail some",
      maxTestDuration: 250 * Millisecond,
      capacity: [200],
      goroutines: 1000,
      expectFailuresRange: [400, 600],
    },
    {
      name: "not enough permit at beginning but due to capacity change, blocking but all acquire",
      maxTestDuration: 250 * Millisecond,
      capacity: [200, 400, 600],
      goroutines: 1000,
      expectFailuresRange: [0, 0],
    },
    {
      name: "enough permit at beginning but due to capacity change, some would fail",
      maxTestDuration: 250 * Millisecond,
      capacity: [600, 400, 200],
      goroutines: 1000,
      expectFailuresRange: [1, 500],
    },
    {
      name: "not enough permit for any acquire, fail all",
      maxTestDuration: 300 * Millisecond,
      capacity: [0],
      goroutines: 1000,
      expectFailuresRange: [1000, 1000],
    },
  ];

  for (const tt of tests) {
    const wg = new WaitGroup();
    const permit = NewResizablePermit(tt.capacity[0]);

    wg.Add(1);
    void (async () => {
      try {
        for (let i = 1; i < tt.capacity.length; i++) {
          await new Promise<void>((resolve) => {
            globalThis.setTimeout(() => resolve(), 50);
          });
          permit.SetQuota(tt.capacity[i]);
        }
      } finally {
        wg.Done();
      }
    })();

    const failures = {
      value: 0,
      Inc(): void {
        this.value++;
      },
      Load(): number {
        return this.value;
      },
    };

    const [ctx, cancel] = withTimeout(background(), tt.maxTestDuration);

    const aquireChan = Math.trunc(tt.goroutines / 2);
    for (let i = 0; i < tt.goroutines - aquireChan; i++) {
      wg.Add(1);
      void (async () => {
        try {
          try {
            await permit.Acquire(ctx);
          } catch (err) {
            if (!(err instanceof Error)) {
              throw err;
            }
            failures.Inc();
            return;
          }

          await new Promise<void>((resolve) => {
            globalThis.setTimeout(
              () => resolve(),
              100 + Math.floor(Math.random() * 50),
            );
          });
          permit.Release();
        } finally {
          wg.Done();
        }
      })();
    }

    for (let i = 0; i < aquireChan; i++) {
      wg.Add(1);
      void (async () => {
        try {
          const [permitChan, done] = await permit.AcquireChan(ctx);
          const result = await permitChan.recv();
          if (result.received) {
            await new Promise<void>((resolve) => {
              globalThis.setTimeout(
                () => resolve(),
                100 + Math.floor(Math.random() * 50),
              );
            });
            permit.Release();
          } else {
            failures.Inc();
          }
          await done();
        } finally {
          wg.Done();
        }
      })();
    }

    await wg.Wait();

    expect(permit.Count()).toEqual(0);
    expect(permit.Quota()).toEqual(tt.capacity[tt.capacity.length - 1]);

    const expectFailureMin = tt.expectFailuresRange[0];
    const expectFailureMax = tt.expectFailuresRange[1];
    expect(failures.Load()).toBeGreaterThanOrEqual(expectFailureMin);
    expect(failures.Load()).toBeLessThanOrEqual(expectFailureMax);

    cancel();
  }
}

/**
 * Test_Permit_Acquire tests the basic acquire functionality
 * before each acquire will wait 100ms
 */
export async function Test_Permit_Acquire(): Promise<void> {
  {
    const permit = NewResizablePermit(1);
    await permit.Acquire(background());
    expect(permit.Count()).toEqual(1);
  }

  {
    const permit = NewResizablePermit(1);
    const [ctx, cancel] = withTimeout(background(), 10 * Millisecond);
    await new Promise<void>((resolve) => {
      globalThis.setTimeout(() => resolve(), 100 * Millisecond);
    });

    let err: Error | null = null;
    try {
      await permit.Acquire(ctx);
    } catch (caught) {
      if (!(caught instanceof Error)) throw caught;
      err = caught;
    }
    expect(err).not.toBeNull();
    expect(err!.message).toContain('context deadline exceeded');
    expect(permit.Count()).toEqual(0);
    cancel();
  }

  {
    const permit = NewResizablePermit(1);
    const [ctx, cancel] = withCancel(background());
    cancel();

    let err: Error | null = null;
    try {
      await permit.Acquire(ctx);
    } catch (caught) {
      if (!(caught instanceof Error)) throw caught;
      err = caught;
    }
    expect(err).not.toBeNull();
    expect(err!.message).toContain('canceled');
    expect(permit.Count()).toEqual(0);
  }

  {
    const permit = NewResizablePermit(1);
    const [ctx, cancel] = withTimeout(background(), 10 * Millisecond);
    await permit.Acquire(ctx);

    let err: Error | null = null;
    try {
      await permit.Acquire(ctx);
    } catch (caught) {
      if (!(caught instanceof Error)) throw caught;
      err = caught;
    }
    expect(err).not.toBeNull();
    expect(err!.message).toContain('failed to acquire permit');
    expect(permit.Count()).toEqual(1);
    cancel();
  }
}

export async function Test_Permit_Release(): Promise<void> {
	const cases: {
		name: string;
		quota: number;
		acquire: number;
		release: number;
		expectPanic: boolean;
	}[] = [
		{ name: "release all acquired permits", quota: 10, acquire: 5, release: 5, expectPanic: false },
		{ name: "release partial acquired permit", quota: 10, acquire: 5, release: 1, expectPanic: false },
		{ name: "release non acquired permit", quota: 10, acquire: 5, release: 0, expectPanic: false },
		{ name: "release more than acquired permit", quota: 10, acquire: 5, release: 10, expectPanic: true },
	];

	for (const tt of cases) {
		const permit = NewResizablePermit(tt.quota);

		for (let i = 0; i < tt.acquire; i++) {
			try {
				await permit.Acquire(background());
			} catch (err) {
				if (!(err instanceof Error)) throw err;
				expect(err).toBeNull();
			}
		}

		const releaseOp = (): void => {
			for (let i = 0; i < tt.release; i++) {
				permit.Release();
			}
		};

		if (tt.expectPanic) {
			expect(releaseOp).toThrow();
		} else {
			expect(releaseOp).not.toThrow();
			expect(permit.Count()).toEqual(tt.acquire - tt.release);
		}
	}
}

export async function Test_Permit_AcquireChan(): Promise<void> {
  throw new globalThis.Error("not implemented"); // @stub
}
