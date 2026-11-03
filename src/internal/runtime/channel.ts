// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
export interface ChannelReceive<T> {
  value: T | undefined;
  received: boolean;
  closed: boolean;
}

import type { SelectRegistration } from "./select.js";

export interface ChannelReceive<T> {
  value: T | undefined;
  received: boolean;
  closed: boolean;
}

/** Read-only channel capability, including the internal receive-select protocol. */
export interface ReceiveChannel<T> extends AsyncIterable<T> {
  tryRecv(): ChannelReceive<T>;
  recv(): Promise<ChannelReceive<T>>;
  isClosed(): boolean;
  selectTryRecv(registration: SelectRegistration<ChannelReceive<T>>): boolean;
  selectRegisterRecv(registration: SelectRegistration<ChannelReceive<T>>): () => void;
}

interface receiveWaiter<T> {
  readonly registration?: SelectRegistration<ChannelReceive<T>>;
  readonly resolve?: (result: ChannelReceive<T>) => void;
}

interface sendWaiter<T> {
  readonly value: T;
  readonly registration?: SelectRegistration<boolean>;
  readonly resolve?: (sent: boolean) => void;
}

export class Channel<T> implements ReceiveChannel<T> {
  private readonly capacity: number;
  private readonly values: T[] = [];
  private readonly recvWaiters: Array<receiveWaiter<T>> = [];
  private readonly sendWaiters: Array<sendWaiter<T>> = [];
  private closed = false;

  constructor(bufferSize = 0) {
    this.capacity = Math.max(0, bufferSize);
  }

  tryRecv(): ChannelReceive<T> {
    if (this.values.length > 0) {
      const value = this.values.shift() as T;
      this.flushSendWaitersIntoBuffer();
      return { value, received: true, closed: false };
    }
    for (let sender = this.sendWaiters.shift(); sender; sender = this.sendWaiters.shift()) {
      if (sender.registration && !sender.registration.group.claim()) {
        continue;
      }
      sender.registration?.resolve(true);
      sender.resolve?.(true);
      return { value: sender.value, received: true, closed: false };
    }
    return { value: undefined, received: false, closed: this.closed };
  }

  trySend(value: T): boolean {
    if (this.closed) {
      return false;
    }
    for (let waiter = this.recvWaiters.shift(); waiter; waiter = this.recvWaiters.shift()) {
      if (waiter.registration && !waiter.registration.group.claim()) {
        continue;
      }
      const result = { value, received: true, closed: false };
      waiter.registration?.resolve(result);
      waiter.resolve?.(result);
      return true;
    }
    if (this.values.length < this.capacity) {
      this.values.push(value);
      return true;
    }
    return false;
  }

  recv(): Promise<ChannelReceive<T>> {
    const immediate = this.tryRecv();
    if (immediate.received || immediate.closed) {
      return Promise.resolve(immediate);
    }
    return new Promise((resolve) => {
      this.recvWaiters.push({ resolve });
    });
  }

  send(value: T): Promise<boolean> {
    if (this.trySend(value)) {
      return Promise.resolve(true);
    }
    if (this.closed) {
      return Promise.resolve(false);
    }
    return new Promise((resolve) => {
      this.sendWaiters.push({ value, resolve });
    });
  }

  /** @internal Polls one receive case without registering a waiter. */
  selectTryRecv(registration: SelectRegistration<ChannelReceive<T>>): boolean {
    if (this.values.length > 0) {
      if (!registration.group.claim()) {
        return false;
      }
      const value = this.values.shift() as T;
      this.flushSendWaitersIntoBuffer();
      registration.resolve({ value, received: true, closed: false });
      return true;
    }
    for (let i = 0; i < this.sendWaiters.length; i++) {
      const sender = this.sendWaiters[i]!;
      if (sender.registration) {
        if (!registration.group.claimPair(sender.registration.group)) {
          continue;
        }
      } else if (!registration.group.claim()) {
        return false;
      }
      this.sendWaiters.splice(i, 1);
      sender.registration?.resolve(true);
      sender.resolve?.(true);
      registration.resolve({ value: sender.value, received: true, closed: false });
      return true;
    }
    if (!this.closed || !registration.group.claim()) {
      return false;
    }
    registration.resolve({ value: undefined, received: false, closed: true });
    return true;
  }

  /** @internal Registers one blocking receive case. */
  selectRegisterRecv(registration: SelectRegistration<ChannelReceive<T>>): () => void {
    const waiter: receiveWaiter<T> = { registration };
    this.recvWaiters.push(waiter);
    return () => this.removeReceiveWaiter(waiter);
  }

  /** @internal Polls one send case without registering a waiter. */
  selectTrySend(value: T, registration: SelectRegistration<boolean>): boolean {
    if (this.closed) {
      if (!registration.group.claim()) {
        return false;
      }
      registration.reject(new Error("send on closed channel"));
      return true;
    }
    for (let i = 0; i < this.recvWaiters.length; i++) {
      const receiver = this.recvWaiters[i]!;
      if (receiver.registration) {
        if (!registration.group.claimPair(receiver.registration.group)) {
          continue;
        }
      } else if (!registration.group.claim()) {
        return false;
      }
      this.recvWaiters.splice(i, 1);
      const result = { value, received: true, closed: false };
      receiver.registration?.resolve(result);
      receiver.resolve?.(result);
      registration.resolve(true);
      return true;
    }
    if (this.values.length >= this.capacity || !registration.group.claim()) {
      return false;
    }
    this.values.push(value);
    registration.resolve(true);
    return true;
  }

  /** @internal Registers one blocking send case. */
  selectRegisterSend(value: T, registration: SelectRegistration<boolean>): () => void {
    const waiter: sendWaiter<T> = { value, registration };
    this.sendWaiters.push(waiter);
    return () => this.removeSendWaiter(waiter);
  }

  close(): void {
    if (this.closed) {
      return;
    }
    this.closed = true;

    const receives = this.recvWaiters.splice(0);
    const sends = this.sendWaiters.splice(0);
    const selectable: Array<
      | { kind: "recv"; registration: SelectRegistration<ChannelReceive<T>> }
      | { kind: "send"; registration: SelectRegistration<boolean> }
    > = [];
    for (const waiter of receives) {
      if (waiter.registration) {
        selectable.push({ kind: "recv", registration: waiter.registration });
      } else {
        waiter.resolve?.({ value: undefined, received: false, closed: true });
      }
    }
    for (const sender of sends) {
      if (sender.registration) {
        selectable.push({ kind: "send", registration: sender.registration });
      } else {
        sender.resolve?.(false);
      }
    }
    this.shuffle(selectable);
    for (const item of selectable) {
      if (!item.registration.group.claim()) {
        continue;
      }
      if (item.kind === "recv") {
        item.registration.resolve({ value: undefined, received: false, closed: true });
      } else {
        item.registration.reject(new Error("send on closed channel"));
      }
    }
  }

  isClosed(): boolean {
    return this.closed;
  }

  [Symbol.asyncIterator](): AsyncIterator<T> {
    return {
      next: async (): Promise<IteratorResult<T>> => {
        const result = await this.recv();
        if (!result.received) {
          return { done: true, value: undefined as T };
        }
        return { done: false, value: result.value as T };
      },
    };
  }

  private flushSendWaitersIntoBuffer(): void {
    while (!this.closed && this.sendWaiters.length > 0 && this.values.length < this.capacity) {
      const sender = this.sendWaiters.shift();
      if (!sender) {
        return;
      }
      if (sender.registration && !sender.registration.group.claim()) {
        continue;
      }
      this.values.push(sender.value);
      sender.registration?.resolve(true);
      sender.resolve?.(true);
    }
  }

  private removeReceiveWaiter(waiter: receiveWaiter<T>): void {
    const index = this.recvWaiters.indexOf(waiter);
    if (index >= 0) {
      this.recvWaiters.splice(index, 1);
    }
  }

  private removeSendWaiter(waiter: sendWaiter<T>): void {
    const index = this.sendWaiters.indexOf(waiter);
    if (index >= 0) {
      this.sendWaiters.splice(index, 1);
    }
  }

  private shuffle<TItem>(items: TItem[]): void {
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j]!, items[i]!];
    }
  }
}

export function newChannel<T>(bufferSize = 0): Channel<T> {
  return new Channel<T>(bufferSize);
}
