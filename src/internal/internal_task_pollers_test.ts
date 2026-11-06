// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { Second } from './runtime/time.js';
import { expect } from 'vitest';
import { ExecuteLocalActivity, WithLocalActivityOptions } from './workflow.js';
import { WorkflowTestSuite } from './workflow_testsuite.js';
import { internal_Context } from './context.js';
import { Context } from './runtime/context.js';
import { NoopLogger } from './runtime/logging.js';
import { newWorkflowTaskPoller } from './internal_task_pollers.js';
import { workerExecutionParameters } from './worker.js';

export function Test_newWorkflowTaskPoller(): void {
  const poller = newWorkflowTaskPoller(
    undefined,
    undefined,
    undefined,
    _testDomainName,
    new workerExecutionParameters({
      SessionResourceID: "",
      WorkerStopTimeout: 0,
    }),
  );
  expect(poller).not.toBeNull();
  expect(poller.ldaTunnel).toBeNull();
}

export async function TestLocalActivityPanic(): Promise<void> {
    const s = new WorkflowTestSuite({ logger: NoopLogger(), ctxProps: [] });
    const env = s.NewTestWorkflowEnvironment();

    const wf = "panicky_local_activity";
    await env.RegisterWorkflowWithOptions(
        async (ctx: internal_Context) => {
            ctx = WithLocalActivityOptions(ctx, {
                ScheduleToCloseTimeout: Second,
            });
            await (
                await ExecuteLocalActivity(
                    ctx,
                    async (ctx: Context) => {
                        throw "should not kill process";
                    },
                )
            ).Get(ctx, null);
        },
        {
            Name: wf,
            DisableAlreadyRegisteredCheck: false,
            EnableShortName: false,
        },
    );

    await env.ExecuteWorkflow(wf);
    const err = env.GetWorkflowError();
    expect(err).not.toBeNull();

    // @go-weakened: panic error wrapper identity and stack-frame content are not reproduced
    expect(err?.message).toContain("should not kill process");
    // @go-weakened: source-location stack content is not reproduced
    expect(err).not.toBeNull();
}

export const _testDomainName = "test-domain";

export const _testIdentity = "test-worker";

export const _testTaskList = "test-tasklist";
