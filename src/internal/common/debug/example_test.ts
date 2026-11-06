// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { Mutex } from 'async-mutex';
import { common_debug_Activities, common_debug_ActivityInfo, common_debug_ActivityTracker, common_debug_PollerTracker, common_debug_Stopper } from './types.js';
import { AtomicInt32 } from '../../runtime/atomic.js';
import { Once } from '../../runtime/sync.js';

/**
 * pollerTrackerImpl implements the PollerTracker interface
 */
export class pollerTrackerImpl implements common_debug_PollerTracker {
  constructor(init?: Partial<pollerTrackerImpl>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  pollerCount: AtomicInt32 = new AtomicInt32();

  Start(): common_debug_Stopper {
    this.pollerCount.Inc();
    return new stopperImpl({ pollerTracker: this });
  }

  Stats(): number {
    return this.pollerCount.Load();
  }

}

/**
 * stopperImpl implements the Stopper interface
 */
export class stopperImpl implements common_debug_Stopper {
  constructor(init?: Partial<stopperImpl>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  pollerTracker?: pollerTrackerImpl;

  Stop(): void {
    this.pollerTracker!.pollerCount.Dec();
  }

}

/**
 * activityTrackerImpl implements the ActivityTracker interface
 */
export class activityTrackerImpl implements common_debug_ActivityTracker {
  constructor(init?: Partial<activityTrackerImpl>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  RWMutex: Mutex = new Mutex();

  activityCount: Map<string, number> = new Map(); // Go keyed by common_debug_ActivityInfo VALUE; JS objects compare by reference — key with [k.TaskList, k.ActivityType].join("|") (every field of common_debug_ActivityInfo, declared order); recover the fields with key.split("|") in that same order; this is a Map — use .get/.set/.delete, never [] indexing or delete-on-index

  Start(info: common_debug_ActivityInfo): common_debug_Stopper {
    const key = [info.TaskList, info.ActivityType].join("|");
    this.activityCount.set(key, (this.activityCount.get(key) ?? 0) + 1);
    return new activityStopperImpl({
      Once: new Once(),
      info,
      tracker: this
    });
  }

  Stats(): common_debug_Activities {
    const activities: common_debug_Activities = [];

    for (const [key, count] of this.activityCount) {
      if (count > 0) {
        const [TaskList, ActivityType] = key.split("|");
        activities.push({
          Info: { TaskList, ActivityType },
          Count: count,
        });
      }
    }

    activities.sort((a, b) => a.Info.ActivityType < b.Info.ActivityType ? -1 : a.Info.ActivityType > b.Info.ActivityType ? 1 : 0);
    return activities;
  }

}

/**
 * activityStopperImpl implements the Stopper interface
 */
export class activityStopperImpl implements common_debug_Stopper {
  constructor(init?: Partial<activityStopperImpl>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  Once: Once = new Once();

  info: common_debug_ActivityInfo = { TaskList: "", ActivityType: "" };

  tracker?: activityTrackerImpl;

  Stop(): void {
    this.Once.Do(() => {
      const tracker = this.tracker!;
      const key = [this.info.TaskList, this.info.ActivityType].join("|");
      const count = (tracker.activityCount.get(key) ?? 0) - 1;
      tracker.activityCount.set(key, count);
      if (count === 0) {
        tracker.activityCount.delete(key);
      }
    });
  }

}

export async function Example(): Promise<void> {
  const pollerTracker: common_debug_PollerTracker = new pollerTrackerImpl({
    pollerCount: new AtomicInt32(),
  });

  console.log(`poller stats: ${pollerTracker.Stats()}`);

  let stopper1 = pollerTracker.Start();
  console.log(`poller stats: ${pollerTracker.Stats()}`);

  let stopper2 = pollerTracker.Start();
  console.log(`poller stats: ${pollerTracker.Stats()}`);

  stopper1.Stop();
  stopper2.Stop();
  console.log(`poller stats: ${pollerTracker.Stats()}`);

  const activityTracker: common_debug_ActivityTracker = new activityTrackerImpl({
    RWMutex: new Mutex(),
    activityCount: new Map(),
  });

  const info1: common_debug_ActivityInfo = {
    TaskList: "task-list",
    ActivityType: "activity1",
  };

  const info2: common_debug_ActivityInfo = {
    TaskList: "task-list",
    ActivityType: "activity2",
  };

  stopper1 = activityTracker.Start(info1);
  stopper2 = activityTracker.Start(info2);

  let jsonActivities = JSON.stringify(
    activityTracker.Stats() === undefined ? null : activityTracker.Stats(),
    null,
    2,
  );
  console.log(jsonActivities);

  stopper1.Stop();
  stopper1.Stop();
  jsonActivities = JSON.stringify(
    activityTracker.Stats() === undefined ? null : activityTracker.Stats(),
    null,
    2,
  );
  console.log(jsonActivities);

  stopper2.Stop();

  jsonActivities = JSON.stringify(
    activityTracker.Stats() === undefined ? null : activityTracker.Stats(),
    null,
    2,
  );
  console.log(jsonActivities);
}
