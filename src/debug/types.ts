// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { common_debug_Activities, common_debug_ActivityInfo, common_debug_ActivityTracker, common_debug_Debugger, common_debug_PollerTracker, common_debug_Stopper, common_debug_WorkerStats } from '../internal/common/debug/types.js';

/**
 * Activities is a list of executing activities on the worker
 * Deprecated: in development and very likely to change
 */
export type cadence_debug_Activities = common_debug_Activities;

/**
 * ActivityInfo contains details on the executing activity
 * Deprecated: in development and very likely to change
 */
export type cadence_debug_ActivityInfo = common_debug_ActivityInfo;

/**
 * ActivityTracker is a worker option to track executing activities on a worker
 * Deprecated: in development and very likely to change
 */
export type cadence_debug_ActivityTracker = common_debug_ActivityTracker;

/**
 * Debugger exposes stats collected on a running Worker
 * Deprecated: in development and very likely to change
 */
export type cadence_debug_Debugger = common_debug_Debugger;

/**
 * PollerTracker is an interface to track running pollers on a worker
 * Deprecated: in development and very likely to change
 */
export type cadence_debug_PollerTracker = common_debug_PollerTracker;

/**
 * Stopper is an interface for tracking stop events in an ongoing process or goroutine.
 * Implementations should ensure that Stop() is used to signal and track the stop event
 * and not to clean up any resources opened by worker
 * Deprecated: in development and very likely to change
 */
export type cadence_debug_Stopper = common_debug_Stopper;

/**
 * WorkerStats provides a set of methods that can be used to collect
 * stats on the Worker for debugging purposes.
 * Deprecated: in development and very likely to change
 */
export type cadence_debug_WorkerStats = common_debug_WorkerStats;
