// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { internal_Context } from './context.js';
import { Context } from './runtime/context.js';
import { IHeader as shared_IHeader } from '../generated/thrift/cadence-idl/com/uber/cadence/Header.js';

export interface internal_ContextPropagator {
  Inject(_ctx: Context, p1: internal_HeaderWriter): void;
  Extract(_ctx: Context, p1: internal_HeaderReader): Context;
  InjectFromWorkflow(_ctx: internal_Context, p1: internal_HeaderWriter): void;
  ExtractToWorkflow(_ctx: internal_Context, p1: internal_HeaderReader): internal_Context;
}

export interface internal_HeaderReader {
  ForEachKey(handler: (p0: string, p1: Buffer) => void | Promise<void>): void;
}

export interface internal_HeaderWriter {
  Set(p0: string, p1: Buffer): void;
}

export class headerReader implements internal_HeaderReader {
  constructor(init?: Partial<headerReader>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  header?: shared_IHeader;

  ForEachKey(handler: (p0: string, p1: Buffer) => void | Promise<void>): void {
    if (this.header == null) {
      return;
    }
    for (const [key, value] of this.header!.fields ?? new Map<string, Buffer>()) {
      handler(key, value);
    }
  }

}

export class headerWriter implements internal_HeaderWriter {
  constructor(init?: Partial<headerWriter>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  header?: shared_IHeader;

  Set(key: string, value: Buffer | undefined): void {
    if (this.header == null) {
      return;
    }
    this.header!.fields!.set(key, value!);
  }

}

/**
 * NewHeaderReader returns a header reader interface
 */
export function NewHeaderReader(header: shared_IHeader): internal_HeaderReader {
  return new headerReader({ header });
}

/**
 * NewHeaderWriter returns a header writer interface
 */
export function NewHeaderWriter(header: shared_IHeader | undefined): internal_HeaderWriter {
  if (header != null && header.fields == null) {
    header.fields = new Map<string, Buffer>();
  }
  return new headerWriter({ header });
}
