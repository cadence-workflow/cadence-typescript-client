// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
/*
 * Ref<T> — a shared mutable box for a Go `*primitive` that is aliased so one holder's write is
 * observed by another (e.g. metrics `WrapScope(isReplay *bool)`: the worker mutates the pointee
 * during replay and every metric wrapper reads it to suppress metrics). Flattening such a pointer
 * to a value COPY silently drops the shared mutation — the box preserves it because all holders
 * share the SAME Ref instance and see each other's `.value` writes. `Ref.property(owner, key)`
 * preserves Go's `&owner.field` aliasing by reading and writing the live property rather than a
 * construction-time copy. `value` remains an own enumerable property: translated
 * reflect.DeepEqual/mock helpers compare object keys recursively, so they must observe only the
 * live pointee and never the backing closures. Read the current value with `.value`; forward the
 * box itself (not `.value`) to keep sharing it.
 */
export class Ref<T> {
  #storedValue: T;
  #readValue?: () => T;
  #writeValue?: (value: T) => void;

  declare value: T;

  constructor(value: T) {
    this.#storedValue = value;
    Object.defineProperty(this, "value", {
      enumerable: true,
      get: (): T => (this.#readValue ? this.#readValue() : this.#storedValue),
      set: (next: T): void => {
        if (this.#writeValue) {
          this.#writeValue(next);
          return;
        }
        this.#storedValue = next;
      },
    });
  }

  static property<Owner extends object, Key extends keyof Owner>(
    owner: Owner,
    key: Key,
  ): Ref<Owner[Key]> {
    const ref = new Ref(owner[key]);
    ref.#readValue = (): Owner[Key] => owner[key];
    ref.#writeValue = (value: Owner[Key]): void => {
      owner[key] = value;
    };
    return ref;
  }

  /**
   * Go's encoding/json follows pointers transparently — `json.Marshal(**T)` emits the
   * pointee, never a wrapper object. Ref is the pointer lowering, so it must serialize
   * as its pointee too; without this a Ref-returning activity ships `{"value":...}`
   * across the data-converter boundary and the caller decodes a wrapped object.
   */
  toJSON(): T {
    return this.value;
  }
}
