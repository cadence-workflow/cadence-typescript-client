// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { common_debug_Activities, common_debug_ActivityInfo, common_debug_ActivityTracker, common_debug_PollerTracker, common_debug_Stopper } from './types.js';

/**
 * pollerTrackerNoopImpl implements the PollerTracker interface
 */
export class pollerTrackerNoopImpl implements common_debug_PollerTracker {
  constructor(init?: Partial<pollerTrackerNoopImpl>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  Start(): common_debug_Stopper {
    return new stopperNoopImpl({});
  }

  Stats(): number {
    return 0;
  }

}

/**
 * stopperNoopImpl implements the Stopper interface
 */
export class stopperNoopImpl implements common_debug_Stopper {
  constructor(init?: Partial<stopperNoopImpl>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  Stop(): void {
  }

}

/**
 * activityTrackerNoopImpl implements the ActivityTracker interface
 */
export class activityTrackerNoopImpl implements common_debug_ActivityTracker {
  constructor(init?: Partial<activityTrackerNoopImpl>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  Start(info: common_debug_ActivityInfo): common_debug_Stopper {
    return new stopperNoopImpl({});
  }

  Stats(): common_debug_Activities {
    return [];
  }

}

/**
 * NewNoopPollerTracker creates a new PollerTracker instance
 */
export function NewNoopPollerTracker(): common_debug_PollerTracker {
  return new pollerTrackerNoopImpl({});
}

/**
 * NewNoopActivityTracker creates a new PollerTracker instance
 */
export function NewNoopActivityTracker(): common_debug_ActivityTracker {
  return new activityTrackerNoopImpl({});
}
