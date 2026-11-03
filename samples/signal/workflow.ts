import type { workflow_Context } from '../../src/workflow/context.js';
import { WithActivityOptions } from '../../src/workflow/activity_options.js';
import { ExecuteActivity, GetLogger, GetSignalChannel } from '../../src/workflow/workflow.js';

export const COMPLETE_SIGNAL = 'complete';
const ONE_MINUTE_NS = 60 * 1_000_000_000;

// SimpleSignalWorkflow waits for a boolean signal named "complete".
// Each signal triggers an activity. The workflow exits when the signal value is true.
export async function simpleSignalWorkflow(ctx: workflow_Context): Promise<void> {
  const logger = GetLogger(ctx);
  logger.info('SimpleSignalWorkflow started');

  const completeChan = GetSignalChannel(ctx, COMPLETE_SIGNAL);
  const activityCtx = WithActivityOptions(ctx, {
    TaskList: '',
    ScheduleToCloseTimeout: 0,
    ScheduleToStartTimeout: ONE_MINUTE_NS,
    StartToCloseTimeout: ONE_MINUTE_NS,
    HeartbeatTimeout: 0,
    WaitForCancellation: false,
    ActivityID: '',
  });
  const complete = { value: false };

  while (await completeChan.Receive(ctx, complete)) {
    logger.info('Signal received', `complete=${complete.value}`);

    const result = { value: '' };
    const future = await ExecuteActivity(activityCtx, simpleSignalActivity, complete.value);
    await future.Get(activityCtx, result);
    logger.info('Activity result', `result=${result.value}`);

    if (complete.value) {
      return;
    }
  }
}

// SimpleSignalActivity logs whether the workflow will complete and returns a status message.
export async function simpleSignalActivity(_ctx: unknown, complete: boolean): Promise<string> {
  console.log(`[INFO] SimpleSignalActivity started, complete=${complete}`);
  return complete ? 'Workflow will complete now' : 'Workflow will continue to run';
}
