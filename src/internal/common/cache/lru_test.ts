// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { Millisecond } from '../../runtime/time.js';
import { WaitGroup } from '../../runtime/sync.js';
import { expect } from 'vitest';
import { NewLRU, NewLRUWithInitialCapacity, New, lru } from './lru.js';

export async function TestLRU(): Promise<void> {
    const cache = await NewLRU(5);

    await cache.Put("A", "Foo");
    expect(await cache.Get("A")).toEqual("Foo");
    expect(await cache.Get("B")).toBeUndefined();
    expect(await cache.Size()).toEqual(1);

    await cache.Put("B", "Bar");
    await cache.Put("C", "Cid");
    await cache.Put("D", "Delt");
    expect(await cache.Size()).toEqual(4);

    expect(await cache.Get("B")).toEqual("Bar");
    expect(await cache.Get("C")).toEqual("Cid");
    expect(await cache.Get("D")).toEqual("Delt");

    await cache.Put("A", "Foo2");
    expect(await cache.Get("A")).toEqual("Foo2");

    await cache.Put("E", "Epsi");
    expect(await cache.Get("E")).toEqual("Epsi");
    expect(await cache.Get("A")).toEqual("Foo2");
    expect(await cache.Get("B")).toBeUndefined();

    await cache.Get("C");
    await cache.Put("F", "Felp");
    expect(await cache.Get("D")).toBeUndefined();

    await cache.Delete("A");
    expect(await cache.Get("A")).toBeUndefined();
}

export async function TestExist(): Promise<void> {
  const cache = await NewLRUWithInitialCapacity(5, 5);

  expect(await cache.Exist("A")).toBe(false);

  await cache.Put("A", "Foo");
  expect(await cache.Exist("A")).toBe(true);
  expect(await cache.Exist("B")).toBe(false);

  await cache.Put("B", "Bar");
  expect(await cache.Exist("B")).toBe(true);

  await cache.Delete("A");
  expect(await cache.Exist("A")).toBe(false);
}

export async function TestPutIfNotExistSuccess(): Promise<void> {
  const cache = await New(2, undefined);

  let existing = await cache.PutIfNotExist("A", "Foo");
  expect(existing).toEqual("Foo");

  existing = await cache.PutIfNotExist("A", "Bar");
  expect(existing).toEqual("Foo");

  expect(await cache.Get("A")).toEqual("Foo");
}

export async function TestNoPutInPin(): Promise<void> {
  const cache = await New(2, {
    Pin: true,
    InitialCapacity: 0,
    TTL: 0,
  });

  await expect(cache.Put("A", "Foo")).rejects.toThrow();
}

export async function TestPinningTTL(): Promise<void> {
  const cache = await New(3, {
    InitialCapacity: 0,
    Pin: true,
    TTL: Millisecond * 100,
  }) as lru;

  let currentTime = 123 * 1_000_000;
  cache.now = () => currentTime;

  await cache.PutIfNotExist("A", "Foo");
  await cache.PutIfNotExist("B", "Bar");

  try {
    await cache.Release("B");
  } catch (err) {
    if (!(err instanceof Error)) throw err;
  }

  currentTime = currentTime + Millisecond * 300;
  expect(await cache.Get("A")).toEqual("Foo");

  await cache.PutIfNotExist("C", "Baz");

  let capacityError: Error | undefined;
  try {
    await cache.PutIfNotExist("D", "Qux");
  } catch (err) {
    if (!(err instanceof Error)) throw err;
    capacityError = err;
  }
  expect(capacityError).toBeInstanceOf(Error);
  expect(capacityError?.message).toContain("Cache capacity is fully occupied with pinned elements");

  expect(await cache.Get("B")).toBeUndefined();
}

export async function TestLRUWithTTL(): Promise<void> {
  const cache = await New(5, {
    InitialCapacity: 0,
    Pin: false,
    TTL: Millisecond * 100,
  }) as lru;

  let currentTime = 0;
  cache.now = () => currentTime;

  await cache.Put("A", "foo");
  expect(await cache.Get("A")).toEqual("foo");

  currentTime = currentTime + Millisecond * 300;

  expect(await cache.Get("A")).toBeUndefined();
  expect(await cache.Size()).toEqual(0);
}

export async function TestLRUCacheConcurrentAccess(): Promise<void> {
	const cache = await NewLRU(5);
	const values = {
		A: "foo",
		B: "bar",
		C: "zed",
		D: "dank",
		E: "ezpz",
	};

	for (const [key, value] of Object.entries(values)) {
		await cache.Put(key, value);
	}

	let release!: () => void;
	const start = new Promise<void>((resolve) => {
		release = resolve;
	});
	const wg = new WaitGroup();

	for (let i = 0; i < 20; i++) {
		wg.Add(1);

		void (async () => {
			try {
				await start;

				for (let j = 0; j < 1000; j++) {
					await cache.Get("A");
				}
			} finally {
				wg.Done();
			}
		})();
	}

	release();
	await wg.Wait();
}

export async function TestRemoveFunc(): Promise<void> {
  throw new globalThis.Error("not implemented"); // @stub
}

export async function TestRemovedFuncWithTTL(): Promise<void> {
  throw new globalThis.Error("not implemented"); // @stub
}
