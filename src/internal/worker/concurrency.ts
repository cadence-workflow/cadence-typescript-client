// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { Channel } from '../runtime/channel.js';
import { Context } from '../runtime/context.js';

/**
 * ConcurrencyLimit contains synchronization primitives for dynamically controlling the concurrencies in workers
 */
export interface ConcurrencyLimit {
  PollerPermit?: Permit;
  TaskPermit?: Permit;
}

export interface Permit {
  Acquire(_ctx: Context): Promise<void>;
  AcquireChan(_ctx: Context): [Channel<{}>, () => void | Promise<void>];
  Count(): number;
  Quota(): number;
  Release(): void;
  SetQuota(p0: number): void;
}
