// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { WaitGroup } from '../../runtime/sync.js';
import { isByteSliceTarget, isByteSlice } from '../../runtime/reflect.js';
import { Channel } from '../../runtime/channel.js';

/**
 * MergeDictoRight copies the contents of src to dest
 */
export function MergeDictoRight(src: Record<string, string>, dest: Record<string, string>): void {
  for (const [k, v] of Object.entries(src ?? {})) {
    dest[k] = v;
  }
}

/**
 * MergeDicts creates a union of the two dicts
 */
export function MergeDicts(dic1: Record<string, string>, dic2: Record<string, string>): Record<string, string> {
  const resultDict: Record<string, string> = {};
  MergeDictoRight(dic1, resultDict);
  MergeDictoRight(dic2, resultDict);
  return resultDict;
}

/**
 * AwaitWaitGroup calls Wait on the given wait
 * Returns true if the Wait() call succeeded before the timeout
 * Returns false if the Wait() did not return before the timeout
 */
export async function AwaitWaitGroup(wg: WaitGroup, timeout: number): Promise<boolean> {
  return await new Promise<boolean>((resolve) => {
    let settled = false;
    const timer = setTimeout(() => {
      if (!settled) {
        settled = true;
        resolve(false);
      }
    }, timeout / 1_000_000);

    void wg.Wait().then(() => {
      if (!settled) {
        settled = true;
        clearTimeout(timer);
        resolve(true);
      }
    });
  });
}

/**
 * IsTypeByteSlice checks whether the type passed in is a ByteSlice type
 */
export function IsTypeByteSlice(inType: unknown): boolean {
  return isByteSliceTarget(inType);
}
