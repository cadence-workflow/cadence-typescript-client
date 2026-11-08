// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { expect } from 'vitest';
import { NewNoopActivityTracker, NewNoopPollerTracker } from './workerstats_noop.js';

export function TestWorkerStats(): void {
    const pollerTracker = NewNoopPollerTracker();
    const activityTracker = NewNoopActivityTracker();
    expect(pollerTracker).not.toBeNull();
    expect(pollerTracker.Start()).not.toBeNull();
    expect(pollerTracker.Stats()).toEqual(0);
    expect(() => pollerTracker.Start().Stop()).not.toThrow();
    expect(activityTracker.Start({ ActivityType: "", TaskList: "" })).not.toBeNull();
    expect(activityTracker.Stats()).toEqual([]);
}
