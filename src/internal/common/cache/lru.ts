// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { Mutex } from 'async-mutex';
import { Cache, RemovedFunc, cache_Options } from './cache.js';
import { Element, List } from '../../runtime/container_list.js';

/**
 * lru is a concurrent fixed size cache that evicts elements in lru order
 */
export class lru implements Cache {
  constructor(init?: Partial<lru>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  mut: Mutex = new Mutex();

  byAccess?: List;

  byKey: Record<string, Element> = {};

  maxSize: number = 0;

  ttl: number = 0;

  pin: boolean = false;

  rmFunc?: RemovedFunc;

  now?: () => number;

  async Exist(key: string): Promise<boolean> {
    await this.mut.acquire();
    try {
      const ok = key in this.byKey!;
      return ok;
    } finally {
      this.mut.release();
    }
  }

  async Get(key: string): Promise<unknown | undefined> {
    await this.mut.acquire();
    try {
      const elt = this.byKey[key]!;
      if (elt == null) {
        return undefined;
      }

      const cacheEntryLocal = elt.Value as cacheEntry;

      if (this.pin) {
        cacheEntryLocal.refCount++;
      }

      if (
        cacheEntryLocal.refCount === 0 &&
        cacheEntryLocal.expiration !== 0 &&
        this.now!() > cacheEntryLocal.expiration
      ) {
        if (this.rmFunc != null) {
          const rmFunc = this.rmFunc!;
          void (async () => {
            await rmFunc(cacheEntryLocal.value);
          })();
        }
        this.byAccess!.Remove(elt);
        delete this.byKey[cacheEntryLocal.key];
        return undefined;
      }

      this.byAccess!.MoveToFront(elt);
      return cacheEntryLocal.value;
    } finally {
      this.mut.release();
    }
  }

  async Put(key: string, value: unknown): Promise<unknown> {
    if (this.pin) {
      throw "Cannot use Put API in Pin mode. Use Delete and PutIfNotExist if necessary";
    }
    const val = await this.putInternal(key, value, true);
    return val;
  }

  async PutIfNotExist(key: string, value: unknown): Promise<unknown> {
    const existing = await this.putInternal(key, value, false);

    if (existing == null) {
      return value;
    }

    return existing;
  }

  async Delete(key: string): Promise<void> {
    await this.mut.acquire();
    try {
      const elt = this.byKey[key];
      if (elt != null) {
        const entry = this.byAccess!.Remove(elt) as cacheEntry;
        const rmFunc = this.rmFunc;
        if (rmFunc != null) {
          void (async () => {
            await rmFunc(entry.value);
          })();
        }
        delete this.byKey[key];
      }
    } finally {
      this.mut.release();
    }
  }

  async Release(key: string): Promise<void> {
    await this.mut.acquire();
    try {
      const elt = this.byKey[key]!;
      const cacheEntryLocal = elt.Value as cacheEntry;
      cacheEntryLocal.refCount--;
    } finally {
      this.mut.release();
    }
  }

  async Size(): Promise<number> {
    await this.mut.acquire();
    try {
      return Object.keys(this.byKey).length;
    } finally {
      this.mut.release();
    }
  }

  async putInternal(key: string, value: unknown, allowUpdate: boolean): Promise<unknown | undefined> {
    await this.mut.acquire();
    try {
      const elt = this.byKey[key]!;
      if (elt != null) {
        const entry = elt.Value as cacheEntry;
        const existing = entry.value;
        if (allowUpdate) {
          entry.value = value;
        }
        if (this.ttl !== 0) {
          entry.expiration = this.now!() + this.ttl;
        }
        this.byAccess!.MoveToFront(elt);
        if (this.pin) {
          entry.refCount++;
        }
        return existing;
      }

      const entry = new cacheEntry({
        key,
        value,
        expiration: 0,
        refCount: 0
      });

      if (this.pin) {
        entry.refCount++;
      }

      if (this.ttl !== 0) {
        entry.expiration = this.now!() + this.ttl;
      }

      this.byKey[key] = this.byAccess!.PushFront(entry);
      if (Object.keys(this.byKey).length === this.maxSize) {
        const oldest = this.byAccess!.Back()!.Value as cacheEntry;

        if (oldest.refCount > 0) {
          this.byAccess!.Remove(this.byAccess!.Front()!);
          delete this.byKey[key];
          throw ErrCacheFull;
        }

        this.byAccess!.Remove(this.byAccess!.Back()!);
        if (this.rmFunc != null) {
          const rmFunc = this.rmFunc!;
          void (async (removedValue: unknown) => {
            await rmFunc(removedValue);
          })(oldest.value);
        }
        delete this.byKey[oldest.key];
      }

      return undefined;
    } finally {
      this.mut.release();
    }
  }

}

export class cacheEntry {
  constructor(init?: Partial<cacheEntry>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  key: string = "";

  expiration: number = 0;

  value?: unknown;

  refCount: number = 0;

}

/**
 * New creates a new cache with the given options
 */
export function New(maxSize: number, opts: cache_Options | undefined): Cache {
  if (opts == null) {
    opts = {
      InitialCapacity: 0,
      Pin: false,
      TTL: 0,
    };
  }

  return new lru({
    mut: new Mutex(),
    byAccess: new List(),
    byKey: {},
    ttl: opts.TTL,
    maxSize,
    pin: opts.Pin,
    rmFunc: opts.RemovedFunc!,
    now: () => Date.now() * 1_000_000,
  });
}

/**
 * NewLRU creates a new LRU cache of the given size, setting initial capacity
 * to the max size
 */
export async function NewLRU(maxSize: number): Promise<Cache> {
  return New(maxSize, undefined);
}

/**
 * NewLRUWithInitialCapacity creates a new LRU cache with an initial capacity
 * and a max size
 */
export async function NewLRUWithInitialCapacity(initialCapacity: number, maxSize: number): Promise<Cache> {
  return New(maxSize, {
    InitialCapacity: initialCapacity,
    Pin: false,
    TTL: 0,
  });
}

/**
 * ErrCacheFull is returned if Put fails due to cache being filled with pinned elements
 */
export let ErrCacheFull = new Error("Cache capacity is fully occupied with pinned elements");
