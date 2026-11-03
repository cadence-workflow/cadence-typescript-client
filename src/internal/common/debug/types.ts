/**
 * Activities is a list of executing activities on the worker
 * Deprecated: in development and very likely to change
 */
export type common_debug_Activities = ({ Info: common_debug_ActivityInfo; Count: number })[];

/**
 * ActivityInfo contains details on the executing activity
 * Deprecated: in development and very likely to change
 */
export interface common_debug_ActivityInfo {
  TaskList: string;
  ActivityType: string;
}

export interface common_debug_ActivityTracker {
  Start(info: common_debug_ActivityInfo): common_debug_Stopper;
  Stats(): common_debug_Activities;
}

export interface common_debug_Debugger {
  GetWorkerStats(): common_debug_WorkerStats;
}

export interface common_debug_PollerTracker {
  Start(): common_debug_Stopper;
  Stats(): number;
}

export interface common_debug_Stopper {
  Stop(): void;
}

/**
 * WorkerStats provides a set of methods that can be used to collect
 * stats on the Worker for debugging purposes.
 * Deprecated: in development and very likely to change
 */
export interface common_debug_WorkerStats {
  PollerTracker?: common_debug_PollerTracker;
  ActivityTracker?: common_debug_ActivityTracker;
}
