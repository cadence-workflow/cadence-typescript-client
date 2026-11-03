export interface Cache {
  Exist(key: string): Promise<boolean>;
  Get(key: string): Promise<unknown | undefined>;
  Put(key: string, value: unknown): Promise<unknown>;
  PutIfNotExist(key: string, value: unknown): Promise<unknown>;
  Delete(key: string): Promise<void>;
  Release(key: string): Promise<void>;
  Size(): Promise<number>;
}

/**
 * RemovedFunc is a type for notifying applications when an item is
 * scheduled for removal from the Cache. If f is a function with the
 * appropriate signature and i is the interface{} scheduled for
 * deletion, Cache calls go f(i)
 */
export type RemovedFunc = (p0: unknown) => void | Promise<void>;

/**
 * Options control the behavior of the cache
 */
export interface cache_Options {
  TTL: number;
  InitialCapacity: number;
  Pin: boolean;
  RemovedFunc?: RemovedFunc;
}
