export const SECOND = 1_000_000_000;
export const MINUTE = 60 * SECOND;

export const ACTIVITY_TYPE_ECHO = 'activity.echo';
export const ACTIVITY_TYPE_SIGNAL = 'activity.signal';
export const ACTIVITY_TYPE_CONCURRENT_EXECUTION = 'activity.concurrent-execution';
export const ACTIVITY_TYPE_QUERY_ONE = 'activity.query1';
export const ACTIVITY_TYPE_QUERY_TWO = 'activity.query2';
export const ACTIVITY_TYPE_TIMEOUT = 'activity.timeout';
export const ACTIVITY_TYPE_RETRY_ON_TIMEOUT = 'activity.retry-on-timeout';
export const ACTIVITY_TYPE_RETRY_ON_FAILURE = 'activity.retry-on-failure';

export const WORKFLOW_TYPE_ECHO = 'workflow.echo';
export const WORKFLOW_TYPE_SANITY = 'workflow.sanity';
export const WORKFLOW_TYPE_SIGNAL = 'workflow.signal';
export const WORKFLOW_TYPE_SIGNAL_EXTERNAL = 'workflow.signal.external';
export const WORKFLOW_TYPE_CONCURRENT_EXECUTION = 'workflow.concurrent-execution';
export const WORKFLOW_TYPE_QUERY = 'workflow.query';
export const WORKFLOW_TYPE_TIMEOUT = 'workflow.timeout';
export const WORKFLOW_TYPE_CANCELLATION = 'workflow.cancellation';
export const WORKFLOW_TYPE_CANCELLATION_EXTERNAL = 'workflow.cancellation.external';
export const WORKFLOW_TYPE_RETRY = 'workflow.retry';

export const ACTIVITY_TIMEOUT = 10 * SECOND;
export const CHILD_WORKFLOW_TIMEOUT = 2 * MINUTE;
export const SANITY_WORKFLOW_TIMEOUT = 5 * MINUTE;

export const DEFAULT_SANITY_CHILD_WORKFLOWS = [
  WORKFLOW_TYPE_ECHO,
  WORKFLOW_TYPE_SIGNAL,
  WORKFLOW_TYPE_CONCURRENT_EXECUTION,
  WORKFLOW_TYPE_QUERY,
  WORKFLOW_TYPE_TIMEOUT,
  WORKFLOW_TYPE_CANCELLATION,
  WORKFLOW_TYPE_RETRY,
] as const;
