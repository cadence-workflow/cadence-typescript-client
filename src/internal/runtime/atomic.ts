// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
export class AtomicBool {
  private v: boolean;
  constructor(v: boolean = false) { this.v = v; }
  Load(): boolean { return this.v; }
  Store(n: boolean): void { this.v = n; }
  Swap(n: boolean): boolean { const old = this.v; this.v = n; return old; }
  Toggle(): boolean { this.v = !this.v; return this.v; }
  CAS(old: boolean, updated: boolean): boolean { if (this.v === old) { this.v = updated; return true; } return false; }
  CompareAndSwap(old: boolean, updated: boolean): boolean { return this.CAS(old, updated); }
}
