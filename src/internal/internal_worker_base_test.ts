// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { taskPoller } from './internal_task_pollers.js';
import { expect } from 'vitest';
import { NewNoopPollerTracker } from './common/debug/workerstats_noop.js';
import { newBaseWorker } from './internal_worker_base.js';
import { InfoLevel, LoggerFromCore, ObserverCore } from './runtime/logging.js';
import { NoopScope } from './runtime/tally.js';
import { BadRequestError } from '../errors/idl_errors.js';

export class testTaskWorker implements taskPoller {
  constructor(init?: Partial<testTaskWorker>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  async PollTask(): Promise<unknown> {
    throw new Error("poll in test will fail");
  }

  async ProcessTask(task: unknown): Promise<void> {
    return;
  }

}

export class nonRetryableTaskWorker implements taskPoller {
  constructor(init?: Partial<nonRetryableTaskWorker>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  async PollTask(): Promise<unknown> {
    throw new BadRequestError({ message: "bad request" });
  }

  async ProcessTask(task: unknown): Promise<void> {
    return;
  }

}

export async function TestBaseWorker_pollTask_no_warnLogOnShutdown(): Promise<void> {
  const [core, observed] = ObserverCore(InfoLevel);
  const logger = LoggerFromCore(core);
  const worker = await newBaseWorker(
    {
      maxConcurrentTask: 1,
      pollerCountWithoutAutoScaling: 1,
      identity: "test-identity",
      pollerTracker: NewNoopPollerTracker(),
      taskWorker: new testTaskWorker(),
      host: "",
      maxTaskPerSecond: 0,
      pollerAutoScaler: {
        Enabled: false,
        Cooldown: 0,
        PollerMinCount: 0,
        PollerMaxCount: 0,
        PollerInitCount: 0,
        PollerWaitTimeUpperBound: 0,
        PollerWaitTimeLowerBound: 0,
      },
      pollerRate: 0,
      shutdownTimeout: 0,
      workerType: "",
    },
    logger,
    NoopScope,
    undefined,
  );

  await worker.Start();
  await worker.Stop();
  await worker.pollTask();

  expect(observed.FilterMessage("poller permit acquire error").Len()).toEqual(0);
}

export async function TestBaseWorker_processTask_warnLogOnOtherError(): Promise<void> {
  const [core, observed] = ObserverCore(InfoLevel);
  const logger = LoggerFromCore(core);
  const worker = await newBaseWorker(
    {
      host: "",
      identity: "test-identity",
      maxConcurrentTask: 1,
      maxTaskPerSecond: 0,
      pollerAutoScaler: {
        Enabled: false,
        Cooldown: 0,
        PollerMinCount: 0,
        PollerMaxCount: 0,
        PollerInitCount: 0,
        PollerWaitTimeUpperBound: 0,
        PollerWaitTimeLowerBound: 0,
      },
      pollerCountWithoutAutoScaling: 1,
      pollerRate: 0,
      pollerTracker: NewNoopPollerTracker(),
      shutdownTimeout: 0,
      taskWorker: new testTaskWorker({}),
      workerType: "",
    },
    logger,
    NoopScope,
    undefined,
  );

  try {
    await worker.Start();
  } catch (err) {
    if (!(err instanceof Error)) throw err;
  }

  await worker.limiterContextCancel!(new Error("test error"));

  try {
    await worker.pollTask();
  } catch (err) {
    if (!(err instanceof Error)) throw err;
  }

  try {
    await worker.Stop();
  } catch (err) {
    if (!(err instanceof Error)) throw err;
  }

  expect(observed.FilterMessage("poller permit acquire error").Len()).toBeGreaterThanOrEqual(1);
}

export async function TestBaseWorker_pollTask_logsNonRetriableError(): Promise<void> {
  const [core, observed] = ObserverCore(InfoLevel);
  const logger = LoggerFromCore(core);

  const worker = await newBaseWorker(
    {
      maxConcurrentTask: 1,
      pollerCountWithoutAutoScaling: 1,
      identity: "test-identity",
      pollerTracker: NewNoopPollerTracker(),
      taskWorker: new nonRetryableTaskWorker(),
      host: "",
      maxTaskPerSecond: 0,
      pollerAutoScaler: {
        Enabled: false,
        Cooldown: 0,
        PollerMinCount: 0,
        PollerMaxCount: 0,
        PollerInitCount: 0,
        PollerWaitTimeUpperBound: 0,
        PollerWaitTimeLowerBound: 0,
      },
      pollerRate: 0,
      shutdownTimeout: 0,
      workerType: "",
    },
    logger,
    NoopScope,
    undefined,
  );

  await worker.concurrency!.TaskPermit!.Acquire(worker.limiterContext!);
  await worker.pollTask();

  await worker.concurrency!.TaskPermit!.Acquire(worker.limiterContext!);
  await worker.pollTask();

  expect(
    observed.FilterMessage(
      "Worker received non-retriable error from PollTask; continue polling.",
    ).Len(),
  ).toEqual(2);
}
