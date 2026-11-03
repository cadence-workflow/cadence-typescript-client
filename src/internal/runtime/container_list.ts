// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
export class Element {
  Value: unknown;
  // Ring links; managed by the owning List. Public so List can relink across instances.
  next: Element | null = null;
  prev: Element | null = null;
  list: List | null = null;
  constructor(value: unknown = undefined) { this.Value = value; }
  Next(): Element | null {
    const p = this.next;
    if (this.list !== null && p !== (this.list as any).root) { return p; }
    return null;
  }
  Prev(): Element | null {
    const p = this.prev;
    if (this.list !== null && p !== (this.list as any).root) { return p; }
    return null;
  }
}

export class List {
  // Sentinel ring node; root.next is the front, root.prev is the back.
  root: Element = new Element();
  private len: number = 0;
  constructor() { this.init(); }
  private init(): List {
    this.root.next = this.root;
    this.root.prev = this.root;
    this.len = 0;
    return this;
  }
  Len(): number { return this.len; }
  Front(): Element | null { return this.len === 0 ? null : this.root.next; }
  Back(): Element | null { return this.len === 0 ? null : this.root.prev; }
  private insert(e: Element, at: Element): Element {
    e.prev = at;
    e.next = at.next;
    (e.prev as Element).next = e;
    (e.next as Element).prev = e;
    e.list = this;
    this.len++;
    return e;
  }
  private insertValue(v: unknown, at: Element): Element {
    const e = new Element(v);
    return this.insert(e, at);
  }
  private move(e: Element, at: Element): void {
    if (e === at) { return; }
    (e.prev as Element).next = e.next;
    (e.next as Element).prev = e.prev;
    e.prev = at;
    e.next = at.next;
    (e.prev as Element).next = e;
    (e.next as Element).prev = e;
  }
  // Remove unlinks e and returns its Value (Go's *List.Remove contract).
  Remove(e: Element): unknown {
    if (e.list === this) {
      (e.prev as Element).next = e.next;
      (e.next as Element).prev = e.prev;
      e.next = null;
      e.prev = null;
      e.list = null;
      this.len--;
    }
    return e.Value;
  }
  PushFront(v: unknown): Element { return this.insertValue(v, this.root); }
  PushBack(v: unknown): Element { return this.insertValue(v, this.root.prev as Element); }
  MoveToFront(e: Element): void { if (e.list === this && this.root.next !== e) { this.move(e, this.root); } }
  MoveToBack(e: Element): void { if (e.list === this && this.root.prev !== e) { this.move(e, this.root.prev as Element); } }
}
