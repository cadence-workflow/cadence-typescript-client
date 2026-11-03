export interface Retrier {
  NextBackOff(): number;
  Reset(): void;
}

export interface backoff_Clock {
  Now(): number;
}

export interface backoff_RetryPolicy {
  ComputeNextDelay(elapsedTime: number, numAttempts: number): number;
}

/**
 * ExponentialRetryPolicy provides the implementation for retry policy using a coefficient to compute the next delay.
 * Formula used to compute the next delay is: initialInterval * math.Pow(backoffCoefficient, currentAttempt)
 */
export class ExponentialRetryPolicy implements backoff_RetryPolicy {
  constructor(init?: Partial<ExponentialRetryPolicy>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  initialInterval: number = 0;

  backoffCoefficient: number = 0;

  maximumInterval: number = 0;

  expirationInterval: number = 0;

  maximumAttempts: number = 0;

  SetInitialInterval(initialInterval: number): void {
    this.initialInterval = initialInterval;
  }

  SetBackoffCoefficient(backoffCoefficient: number): void {
    this.backoffCoefficient = backoffCoefficient;
  }

  SetMaximumInterval(maximumInterval: number): void {
    this.maximumInterval = maximumInterval;
  }

  SetExpirationInterval(expirationInterval: number): void {
    this.expirationInterval = expirationInterval;
  }

  SetMaximumAttempts(maximumAttempts: number): void {
    this.maximumAttempts = maximumAttempts;
  }

  ComputeNextDelay(elapsedTime: number, numAttempts: number): number {
    if (this.maximumAttempts !== noMaximumAttempts && numAttempts >= this.maximumAttempts) {
      return done;
    }

    if (this.expirationInterval !== NoInterval && elapsedTime > this.expirationInterval) {
      return done;
    }

    let nextInterval = this.initialInterval * Math.pow(this.backoffCoefficient, numAttempts);

    if (nextInterval <= 0) {
      return done;
    }

    if (this.maximumInterval !== NoInterval) {
      nextInterval = Math.min(nextInterval, this.maximumInterval);
    }

    if (this.expirationInterval !== NoInterval) {
      const remainingTime = Math.max(0, this.expirationInterval - elapsedTime);
      nextInterval = Math.min(remainingTime, nextInterval);
    }

    const nextDuration = Math.trunc(nextInterval);
    if (nextDuration < this.initialInterval) {
      return done;
    }

    let jitterPortion = Math.trunc(0.2 * nextInterval);
    if (jitterPortion < 1) {
      jitterPortion = 1;
    }

    nextInterval = nextInterval * 0.8 + Math.floor(Math.random() * jitterPortion);

    return Math.trunc(nextInterval);
  }

}

export class systemClock implements backoff_Clock {
  constructor(init?: Partial<systemClock>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  Now(): number {
    return Date.now() * 1_000_000;
  }

}

export class retrierImpl implements Retrier {
  constructor(init?: Partial<retrierImpl>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  policy?: backoff_RetryPolicy;

  clock?: backoff_Clock;

  currentAttempt: number = 0;

  startTime: number = 0;

  Reset(): void {
    this.startTime = this.clock!.Now();
    this.currentAttempt = 0;
  }

  NextBackOff(): number {
    const nextInterval = this.policy!.ComputeNextDelay(this.getElapsedTime(), this.currentAttempt);
    this.currentAttempt++;
    return nextInterval;
  }

  getElapsedTime(): number {
    return this.clock!.Now() - this.startTime;
  }

}

/**
 * NewExponentialRetryPolicy returns an instance of ExponentialRetryPolicy using the provided initialInterval
 */
export function NewExponentialRetryPolicy(initialInterval: number): ExponentialRetryPolicy {
  const p = new ExponentialRetryPolicy({
    initialInterval,
    backoffCoefficient: DefaultBackoffCoefficient,
    maximumInterval: defaultMaximumInterval,
    expirationInterval: defaultExpirationInterval,
    maximumAttempts: defaultMaximumAttempts,
  });

  return p;
}

/**
 * NewRetrier is used for creating a new instance of Retrier
 */
export function NewRetrier(policy: backoff_RetryPolicy, clock: backoff_Clock): Retrier {
  return new retrierImpl({
    policy,
    clock,
    startTime: clock.Now(),
    currentAttempt: 0,
  });
}

/**
 * DefaultBackoffCoefficient is default backOffCoefficient for retryPolicy
 */
export const DefaultBackoffCoefficient = 2;

/**
 * NoInterval represents Maximim interval
 */
export const NoInterval = 0;

export const defaultExpirationInterval = 60000000000;

export const defaultMaximumAttempts = 0;

export const defaultMaximumInterval = 10000000000;

export const done = -1;

export const noMaximumAttempts = 0;

/**
 * SystemClock implements Clock interface that uses time.Now().
 */
export let SystemClock = new systemClock();
