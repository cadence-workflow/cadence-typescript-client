import type { workflow_Context } from '../../src/workflow/context.js';
import { WithActivityOptions } from '../../src/workflow/activity_options.js';
import { ExecuteActivity, GetLogger } from '../../src/workflow/workflow.js';

const ONE_MINUTE_NS = 60 * 1_000_000_000;

export interface HelloInput {
  message: string;
}

// HelloWorldWorkflow calls HelloWorldActivity and returns a greeting string.
export async function helloWorldWorkflow(ctx: workflow_Context, input: HelloInput): Promise<string> {
  const logger = GetLogger(ctx);
  logger.info('HelloWorldWorkflow started');

  const activityCtx = WithActivityOptions(ctx, {
    TaskList: '',
    ScheduleToCloseTimeout: 0,
    ScheduleToStartTimeout: ONE_MINUTE_NS,
    StartToCloseTimeout: ONE_MINUTE_NS,
    HeartbeatTimeout: 0,
    WaitForCancellation: false,
    ActivityID: '',
  });
  const greeting = { value: '' };
  const future = await ExecuteActivity(activityCtx, helloWorldActivity, input);
  await future.Get(activityCtx, greeting);

  logger.info('Workflow result', `greeting=${greeting.value}`);
  return greeting.value;
}

// HelloWorldActivity formats and returns a greeting for the given input.
export async function helloWorldActivity(_ctx: unknown, input: HelloInput): Promise<string> {
  console.log('[INFO] HelloWorldActivity started');
  return `Hello, ${input.message}!`;
}
