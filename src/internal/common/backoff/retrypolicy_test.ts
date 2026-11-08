// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { ExponentialRetryPolicy, Retrier, backoff_Clock, backoff_RetryPolicy, NewExponentialRetryPolicy, done, NoInterval, noMaximumAttempts, NewRetrier } from './retrypolicy.js';
import { Millisecond, Minute, Second } from '../../runtime/time.js';
import { expect } from 'vitest';
import { max } from 'node:math';

export class TestClock implements backoff_Clock {
  constructor(init?: Partial<TestClock>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  currentTime: number = 0;

  Now(): number {
    return this.currentTime;
  }

  moveClock(duration: number): void {
    this.currentTime += duration;
  }

}

export function TestExponentialBackoff(): void {
    const policy = createPolicy(Second);
    policy.SetMaximumInterval(10 * Second);

    const expectedResult = [1, 2, 4, 8, 10];
    for (let i = 0; i < expectedResult.length; i++) {
        expectedResult[i] = expectedResult[i] * Second;
    }

    const [r] = createRetrier(policy);
    for (const expected of expectedResult) {
        const [min, max] = getNextBackoffRange(expected);
        const next = r.NextBackOff();
        expect(next >= min).toBe(true);
        expect(next < max).toBe(true);
    }
}

export function TestNumberOfAttempts(): void {
  const policy = createPolicy(Second);
  policy.SetMaximumAttempts(5);

  const [r] = createRetrier(policy);
  let next = 0;
  for (let i = 0; i < 6; i++) {
    next = r.NextBackOff();
  }

  expect(next).toEqual(done);
}

/**
 * Test to make sure relative maximum interval for each retry is honoured
 */
export function TestMaximumInterval(): void {
  const policy = createPolicy(Second);
  policy.SetMaximumInterval(10 * Second);

  const expectedResult = [1, 2, 4, 8, 10, 10, 10, 10, 10, 10];
  for (let i = 0; i < expectedResult.length; i++) {
    expectedResult[i] = expectedResult[i] * Second;
  }

  const [r, testClock] = createRetrier(policy);
  for (const expected of expectedResult) {
    const [min, max] = getNextBackoffRange(expected);
    const next = r.NextBackOff();
    expect(next >= min).toBe(true);
    expect(next < max).toBe(true);
  }
}

export function TestBackoffCoefficient(): void {
  const policy = createPolicy(2 * Second);
  policy.SetBackoffCoefficient(1.0);

  const [r] = createRetrier(policy);
  const [min, max] = getNextBackoffRange(2 * Second);
  for (let i = 0; i < 10; i++) {
    const next = r.NextBackOff();
    expect(next >= min).toBe(true);
    expect(next < max).toBe(true);
  }
}

export function TestExpirationInterval(): void {
  const policy = createPolicy(2 * Second);
  policy.SetExpirationInterval(5 * Minute);

  const [r, clock] = createRetrier(policy);
  clock.moveClock(6 * Minute);
  const next = r.NextBackOff();

  expect(next).toEqual(done);
}

export function TestExpirationOverflow(): void {
    const policy = createPolicy(2 * Second);
    policy.SetExpirationInterval(5 * Second);

    const [r, clock] = createRetrier(policy);
    let next = r.NextBackOff();
    let [min, max] = getNextBackoffRange(2 * Second);
    expect(next >= min).toBe(true);
    expect(next < max).toBe(true);

    clock.moveClock(2 * Second);

    next = r.NextBackOff();
    [min, max] = getNextBackoffRange(3 * Second);
    expect(next >= min).toBe(true);
    expect(next < max).toBe(true);
}

export function TestDefaultPublishRetryPolicy(): void {
    const policy = NewExponentialRetryPolicy(50 * Millisecond);
    policy.SetExpirationInterval(Minute);
    policy.SetMaximumInterval(10 * Second);

    const [r, clock] = createRetrier(policy);
    const expectedResult = [
        50 * Millisecond,
        100 * Millisecond,
        200 * Millisecond,
        400 * Millisecond,
        800 * Millisecond,
        1600 * Millisecond,
        3200 * Millisecond,
        6400 * Millisecond,
        10000 * Millisecond,
        10000 * Millisecond,
        10000 * Millisecond,
        10000 * Millisecond,
        7250 * Millisecond,
        done,
    ];

    for (const expected of expectedResult) {
        const next = r.NextBackOff();
        if (expected === done) {
            expect(next).toEqual(done);
        } else {
            const [min] = getNextBackoffRange(expected);
            expect(next >= min).toBe(true);
            clock.moveClock(expected);
        }
    }
}

export function TestNoMaxAttempts(): void {
  const policy = createPolicy(50 * Millisecond);
  policy.SetExpirationInterval(Minute);
  policy.SetMaximumInterval(10 * Second);

  const [r, clock] = createRetrier(policy);
  for (let i = 0; i < 100; i++) {
    const next = r.NextBackOff();
    expect(next > 0 || next === done).toBe(true);
    clock.moveClock(next);
  }
}

export function TestUnbounded(): void {
    const policy = createPolicy(50 * Millisecond);
    const [r, clock] = createRetrier(policy);
    for (let i = 0; i < 100; i++) {
        const next = r.NextBackOff();
        expect(next > 0 || next === done).toBe(true);
        clock.moveClock(next);
    }
}

export function createPolicy(initialInterval: number): ExponentialRetryPolicy {
  const policy = NewExponentialRetryPolicy(initialInterval);
  policy.SetBackoffCoefficient(2);
  policy.SetMaximumInterval(NoInterval);
  policy.SetExpirationInterval(NoInterval);
  policy.SetMaximumAttempts(noMaximumAttempts);
  return policy;
}

export function createRetrier(policy: backoff_RetryPolicy): [Retrier, TestClock] {
  const clock = new TestClock({ currentTime: 0 });
  return [NewRetrier(policy, clock), clock];
}

export function getNextBackoffRange(duration: number): [number, number] {
  const rangeMin = Math.trunc(0.8 * duration);
  return [rangeMin, duration];
}
