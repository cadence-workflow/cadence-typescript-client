// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { background, withTimeout } from '../../runtime/context.js';
import { Millisecond, Second } from '../../runtime/time.js';
import { expect } from 'vitest';
import { NewConcurrentRetrier, Retry } from './retry.js';
import { NewExponentialRetryPolicy, done } from './retrypolicy.js';
import { ServiceBusyError } from '../../../errors/idl_errors.js';

export type errCategory = number;

export class someError extends globalThis.Error {
  constructor(init?: Partial<someError>) {
    super(typeof init?.message === "string" ? init.message : "");
    this.name = "someError";
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
    if (typeof init?.message !== "string") {
      this.message = this.Error();
    }
  }

  Error(): string {
    return "Some Error";
  }

}

export async function TestRetry(): Promise<void> {
  const always = (err: Error | null): boolean => {
    return true;
  };
  const never = (err: Error | null): boolean => {
    return false;
  };

  const succeedOnAttemptNum = 5;
  const tests: {
    name: string;
    maxAttempts: number;
    maxTime: number;
    isRetryable: (err: Error | null) => boolean;
    err: errCategory;
    expectedCalls: number;
  }[] = [
    {
      name: "success",
      maxAttempts: 2 * succeedOnAttemptNum,
      maxTime: Second,
      isRetryable: always,
      err: noErr,
      expectedCalls: succeedOnAttemptNum,
    },
    {
      name: "too many tries",
      maxAttempts: 3,
      maxTime: Second,
      isRetryable: always,
      err: anyErr,
      expectedCalls: 4,
    },
    {
      name: "success with always custom retry",
      maxAttempts: 2 * succeedOnAttemptNum,
      maxTime: Second,
      isRetryable: always,
      err: noErr,
      expectedCalls: succeedOnAttemptNum,
    },
    {
      name: "success with never custom retry",
      maxAttempts: 2 * succeedOnAttemptNum,
      maxTime: Second,
      isRetryable: never,
      err: anyErr,
      expectedCalls: 1,
    },
    {
      name: "timed out eventually",
      maxAttempts: 5,
      maxTime: 50 * Millisecond,
      isRetryable: always,
      err: anyErr,
      expectedCalls: 3,
    },
    {
      name: "timed out due to long minimum delay",
      maxAttempts: 5,
      maxTime: 10 * Millisecond,
      isRetryable: always,
      err: serviceBusyErr,
      expectedCalls: 1,
    },
  ];

  for (const test of tests) {
    const testLocal = test;
    let i = 0;
    const op = (): void => {
      i++;

      if (i === succeedOnAttemptNum) {
        return;
      }

      switch (testLocal.err) {
        case noErr:
          throw new someError({});
        case anyErr:
          throw new someError({});
        case serviceBusyErr:
          throw new ServiceBusyError({ message: "" });
        default:
          throw "unreachable";
      }
    };

    const policy = NewExponentialRetryPolicy(10 * Millisecond);
    policy.SetMaximumInterval(50 * Millisecond);
    policy.SetMaximumAttempts(testLocal.maxAttempts);

    const [ctx, cancel] = withTimeout(background(), testLocal.maxTime);
    let err: Error | null = null;
    try {
      await Retry(ctx, op, policy, testLocal.isRetryable);
    } catch (caught) {
      if (!(caught instanceof Error)) {
        throw caught;
      }
      err = caught;
    }

    try {
      if (testLocal.err === noErr) {
        expect(err).toBeNull();
      } else {
        expect(err).not.toBeNull();
      }
      expect(i).toEqual(testLocal.expectedCalls);
    } finally {
      cancel();
    }
  }
}

export async function TestConcurrentRetrier(): Promise<void> {
  const policy = NewExponentialRetryPolicy(1 * Millisecond);
  policy.SetMaximumInterval(10 * Millisecond);
  policy.SetMaximumAttempts(4);

  const retrier = NewConcurrentRetrier(policy);
  await retrier.Failed();
  expect(retrier.failureCount).toEqual(1);
  await retrier.Succeeded();
  expect(retrier.failureCount).toEqual(0);
  const sleepDuration = await retrier.throttleInternal();
  expect(sleepDuration).toEqual(done);

  await retrier.Failed();
  await retrier.Failed();
  expect(retrier.failureCount).toEqual(2);

  for (let i = 0; i < 3; i++) {
    const val = await retrier.throttleInternal();
    console.log(`Duration: ${val}`);
    expect(val > 0).toBe(true);
  }

  await retrier.Succeeded();
  expect(retrier.failureCount).toEqual(0);

  for (let i = 0; i < 3; i++) {
    const val = await retrier.throttleInternal();
    console.log(`Duration: ${val}`);
    expect(val).toEqual(done);
  }
}

export const anyErr = 1;

export const noErr = 0;

export const serviceBusyErr = 2;
