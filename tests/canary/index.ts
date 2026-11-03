import type { client_Client } from '../../src/client/client.js';
import type { activity_RegisterOptions } from '../../src/activity/activity.js';
import type {
  worker_Worker,
} from '../../src/worker/worker.js';
import type { workflow_RegisterOptions } from '../../src/workflow/workflow.js';
import {
  cancellationExternalWorkflow,
  cancellationWorkflow,
} from './cancellation.js';
import {
  concurrentExecutionActivity,
  concurrentExecutionWorkflow,
} from './concurrent_exec.js';
import {
  ACTIVITY_TYPE_CONCURRENT_EXECUTION,
  ACTIVITY_TYPE_ECHO,
  ACTIVITY_TYPE_QUERY_ONE,
  ACTIVITY_TYPE_QUERY_TWO,
  ACTIVITY_TYPE_RETRY_ON_FAILURE,
  ACTIVITY_TYPE_RETRY_ON_TIMEOUT,
  ACTIVITY_TYPE_SIGNAL,
  ACTIVITY_TYPE_TIMEOUT,
  WORKFLOW_TYPE_CANCELLATION,
  WORKFLOW_TYPE_CANCELLATION_EXTERNAL,
  WORKFLOW_TYPE_CONCURRENT_EXECUTION,
  WORKFLOW_TYPE_ECHO,
  WORKFLOW_TYPE_QUERY,
  WORKFLOW_TYPE_RETRY,
  WORKFLOW_TYPE_SANITY,
  WORKFLOW_TYPE_SIGNAL,
  WORKFLOW_TYPE_SIGNAL_EXTERNAL,
  WORKFLOW_TYPE_TIMEOUT,
} from './constants.js';
import { echoActivity, echoWorkflow } from './echo.js';
import {
  createQueryStatusActivities,
  queryWorkflow,
} from './query.js';
import {
  retryOnFailureActivity,
  retryOnTimeoutActivity,
  retryWorkflow,
} from './retry.js';
import { sanityWorkflow } from './sanity.js';
import {
  createSignalParentActivity,
  signalExternalWorkflow,
  signalWorkflow,
} from './signal.js';
import { timeoutActivity, timeoutWorkflow } from './timeout.js';

export {
  DEFAULT_SANITY_CHILD_WORKFLOWS,
  SANITY_WORKFLOW_TIMEOUT,
  WORKFLOW_TYPE_SANITY,
} from './constants.js';

export async function registerCanary(
  worker: worker_Worker,
  client: client_Client,
): Promise<void> {
  const signalParentActivity = createSignalParentActivity(client);
  const {
    queryStatusOneActivity,
    queryStatusTwoActivity,
  } = createQueryStatusActivities(client);

  await worker.RegisterActivityWithOptions(
    echoActivity,
    activityOptions(ACTIVITY_TYPE_ECHO),
  );
  await worker.RegisterActivityWithOptions(
    signalParentActivity,
    activityOptions(ACTIVITY_TYPE_SIGNAL),
  );
  await worker.RegisterActivityWithOptions(
    concurrentExecutionActivity,
    activityOptions(ACTIVITY_TYPE_CONCURRENT_EXECUTION),
  );
  await worker.RegisterActivityWithOptions(
    queryStatusOneActivity,
    activityOptions(ACTIVITY_TYPE_QUERY_ONE),
  );
  await worker.RegisterActivityWithOptions(
    queryStatusTwoActivity,
    activityOptions(ACTIVITY_TYPE_QUERY_TWO),
  );
  await worker.RegisterActivityWithOptions(
    timeoutActivity,
    activityOptions(ACTIVITY_TYPE_TIMEOUT),
  );
  await worker.RegisterActivityWithOptions(
    retryOnTimeoutActivity,
    activityOptions(ACTIVITY_TYPE_RETRY_ON_TIMEOUT),
  );
  await worker.RegisterActivityWithOptions(
    retryOnFailureActivity,
    activityOptions(ACTIVITY_TYPE_RETRY_ON_FAILURE),
  );

  await worker.RegisterWorkflowWithOptions(
    sanityWorkflow,
    workflowOptions(WORKFLOW_TYPE_SANITY),
  );
  await worker.RegisterWorkflowWithOptions(
    echoWorkflow,
    workflowOptions(WORKFLOW_TYPE_ECHO),
  );
  await worker.RegisterWorkflowWithOptions(
    signalWorkflow,
    workflowOptions(WORKFLOW_TYPE_SIGNAL),
  );
  await worker.RegisterWorkflowWithOptions(
    signalExternalWorkflow,
    workflowOptions(WORKFLOW_TYPE_SIGNAL_EXTERNAL),
  );
  await worker.RegisterWorkflowWithOptions(
    concurrentExecutionWorkflow,
    workflowOptions(WORKFLOW_TYPE_CONCURRENT_EXECUTION),
  );
  await worker.RegisterWorkflowWithOptions(
    queryWorkflow,
    workflowOptions(WORKFLOW_TYPE_QUERY),
  );
  await worker.RegisterWorkflowWithOptions(
    timeoutWorkflow,
    workflowOptions(WORKFLOW_TYPE_TIMEOUT),
  );
  await worker.RegisterWorkflowWithOptions(
    cancellationWorkflow,
    workflowOptions(WORKFLOW_TYPE_CANCELLATION),
  );
  await worker.RegisterWorkflowWithOptions(
    cancellationExternalWorkflow,
    workflowOptions(WORKFLOW_TYPE_CANCELLATION_EXTERNAL),
  );
  await worker.RegisterWorkflowWithOptions(
    retryWorkflow,
    workflowOptions(WORKFLOW_TYPE_RETRY),
  );
}

function activityOptions(name: string): activity_RegisterOptions {
  return {
    Name: name,
    EnableShortName: false,
    DisableAlreadyRegisteredCheck: false,
    EnableAutoHeartbeat: false,
  };
}

function workflowOptions(name: string): workflow_RegisterOptions {
  return {
    Name: name,
    EnableShortName: false,
    DisableAlreadyRegisteredCheck: false,
  };
}
