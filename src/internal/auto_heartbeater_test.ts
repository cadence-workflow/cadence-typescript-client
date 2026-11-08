// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { Channel } from './runtime/channel.js';
import { background, withCancel } from './runtime/context.js';
import { Second } from './runtime/time.js';
import { WaitGroup } from './runtime/sync.js';
import { expect } from 'vitest';
import { newHeartbeater } from './auto_heartbeater.js';
import { StringPtr } from './common/convert.js';
import { AwaitWaitGroup } from './common/util/util.js';
import { WorkflowExecution } from '../generated/thrift/cadence-idl/com/uber/cadence/WorkflowExecution.js';
import { NewFakeClock } from './runtime/clock.js';
import { NewGoMockClient } from './runtime/gomock.js';
import { NoopLogger } from './runtime/logging.js';

export async function TestAutoHearbeater_Run(): Promise<void> {
    const activityType = "test-activity";
    const workflowExecution = new WorkflowExecution({
        workflowId: StringPtr("test-workflow"),
        runId: StringPtr("test-run"),
    });

    {
        const stopCh = new Channel<{}>();
        const invoker = NewGoMockClient();
        const logger = NoopLogger();
        const clock = NewFakeClock();
        const hearbeater = newHeartbeater(
            stopCh,
            invoker,
            logger,
            clock,
            activityType,
            workflowExecution,
        );

        stopCh.close();

        await hearbeater.Run(background(), Second);
    }

    {
        const stopCh = new Channel<{}>();
        const invoker = NewGoMockClient();
        const logger = NoopLogger();
        const clock = NewFakeClock();
        const hearbeater = newHeartbeater(
            stopCh,
            invoker,
            logger,
            clock,
            activityType,
            workflowExecution,
        );

        const [ctx, cancel] = withCancel(background());
        cancel();

        await hearbeater.Run(ctx, Second);
    }

    {
        const stopCh = new Channel<{}>();
        const invoker = NewGoMockClient();
        invoker.EXPECT().BackgroundHeartbeat().Return(undefined).Once();
        const logger = NoopLogger();
        const clock = NewFakeClock();
        const hearbeater = newHeartbeater(
            stopCh,
            invoker,
            logger,
            clock,
            activityType,
            workflowExecution,
        );

        const [ctx, cancel] = withCancel(background());
        const wg = new WaitGroup();
        wg.Add(1);

        void (async () => {
            await hearbeater.Run(ctx, Second);
            wg.Done();
        })();

        await clock.BlockUntil(1);
        clock.Advance(Second / 2);
        cancel();

        expect(await AwaitWaitGroup(wg, Second)).toBe(true);
    }

    {
        const stopCh = new Channel<{}>();
        const invoker = NewGoMockClient();
        invoker.EXPECT().BackgroundHeartbeat().Return(new Error("assert.AnError")).Once();
        const logger = NoopLogger();
        const clock = NewFakeClock();
        const hearbeater = newHeartbeater(
            stopCh,
            invoker,
            logger,
            clock,
            activityType,
            workflowExecution,
        );

        const [ctx, cancel] = withCancel(background());
        const wg = new WaitGroup();
        wg.Add(1);

        void (async () => {
            await hearbeater.Run(ctx, Second);
            wg.Done();
        })();

        await clock.BlockUntil(1);
        clock.Advance(Second / 2);
        cancel();

        expect(await AwaitWaitGroup(wg, Second)).toBe(true);
    }
}
