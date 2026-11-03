// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { Mutex } from 'async-mutex';
import { internal_ParentClosePolicy, internal_WorkflowIDReusePolicy, BuiltinQueryTypes } from './client.js';
import { internal_CancelFunc, internal_Context, WithValue, ErrCanceled, WithCancel, background } from './context.js';
import { internal_DataConverter, internal_Value, getDefaultDataConverter } from './encoded.js';
import { workflowPanicError, ErrNoData, IsCanceledError, newWorkflowPanicError } from './error.js';
import { internal_ContextPropagator, NewHeaderWriter, NewHeaderReader } from './headers.js';
import { internal_WorkflowInterceptor, internal_WorkflowInterceptorFactory } from './interceptors.js';
import { executeLocalActivityParams, deSerializeFunctionResult, executeActivityParams, getValidatedActivityFunction, getValidatedActivityOptions, activityOptions, getValidatedLocalActivityOptions, validateFunctionArgs, validateRetryPolicy, getActivityOptions, getKind } from './internal_activity.js';
import { workflowDefinition, workflowEnvironment } from './internal_worker_base.js';
import { registry } from './registry.js';
import { EncodedValue, WorkflowInfo, internal_Bugports, internal_Channel, internal_ChildWorkflowFuture, internal_Future, internal_GetVersionOption, internal_Selector, internal_Settable, internal_Version, internal_WaitGroup, internal_WorkflowType, NewFuture, GetWorkflowInfo, Go, Now, Sleep, needRetryError, getWorkflowHeader, internal_WorkflowExecution, errDomainNotSet, errWorkflowIDNotSet, signalExternalWorkflow, NewTimer, CadenceChangeVersion, NewChannel, NewBufferedChannel, errWorkflowOptionBadRequest, WithDataConverter, WithExecutionStartToCloseTimeout, WithTaskList, WithWorkflowDomain, WithWorkflowTaskList, WithWorkflowTaskStartToCloseTimeout, withContextPropagators } from './workflow.js';
import { Channel } from './runtime/channel.js';
import { Second } from './runtime/time.js';
import type { Scope } from './runtime/tally.js';
import { AtomicBool } from './runtime/atomic.js';
import { Ref } from './runtime/ref.js';
import { goFnLastParamIsByteSlice, isByteSlice, isByteSliceTarget } from './runtime/reflect.js';
import { CronOverlapPolicy as shared_CronOverlapPolicy } from '../generated/thrift/cadence-idl/com/uber/cadence/CronOverlapPolicy.js';
import { IHeader as shared_IHeader } from '../generated/thrift/cadence-idl/com/uber/cadence/Header.js';
import { IRetryPolicy as shared_IRetryPolicy } from '../generated/thrift/cadence-idl/com/uber/cadence/RetryPolicy.js';
import { IsTypeByteSlice } from './common/util/util.js';
import { decodeArg, encodeArgs, decodeAndAssignValue, encodeArg, decodeArgs, getWorkflowFunctionName } from './internal_worker.js';
import * as cron from 'cron-parser';
import { ErrSessionFailed, getSessionInfo, isSessionCreationActivity, sessionStateFailed, sessionStateOpen } from './session.js';
import { TaskListKind } from '../generated/thrift/cadence-idl/com/uber/cadence/TaskListKind.js';
import { internal_ActivityType } from './activity.js';
import { CorruptedSignalsCounter, UnhandledSignalsCounter } from './common/metrics/constants.js';
import { newEncodedValues } from './workflow_testsuite.js';
import { Int32Ptr, StringPtr } from './common/convert.js';
import { defaultDecisionTaskTimeoutInSecs } from './internal_workflow_client.js';
import { Logger } from 'winston';

export interface asyncFuture extends internal_Future {
  GetAsync(callback: receiveCallback): [unknown | undefined, boolean];
  RemoveReceiveCallback(callback: receiveCallback): void;
  ChainFuture(f: internal_Future): void;
  GetValueAndError(): unknown;
  Set(value: unknown, err: Error | null): void;
}

export interface dispatcher {
  ExecuteUntilAllBlocked(): Promise<void>;
  IsDone(): boolean;
  Close(): Promise<void>;
  StackTrace(): Promise<string>;
}

export interface receiveCallback {
  fn?: (p0: unknown, p1: boolean) => boolean;
}

/**
 * Single case statement of the Select
 */
export interface selectCase {
  channel?: channelImpl;
  receiveFunc?: (p0: internal_Channel, p1: boolean) => void | Promise<void>;
  sendFunc?: () => void | Promise<void>;
  sendValue?: unknown;
  future?: asyncFuture;
  futureFunc?: (p0: internal_Future) => void | Promise<void>;
}

export interface sendCallback {
  value?: unknown;
  fn?: () => boolean;
}

/**
 * unblockFunc is passed evaluated by a coroutine yield. When it returns false the yield returns to a caller.
 * stackDepth is the depth of stack from the last blocking call relevant to user.
 * Used to truncate internal stack frames from thread stack.
 */
export type unblockFunc = (p0: string, p1: number) => boolean;

export interface workflow {
  Execute(ctx: internal_Context, input: Buffer): Promise<Buffer>;
  WorkflowType(): internal_WorkflowType;
  GetFunction(): unknown;
}

export interface workflowResult {
  workflowResult?: Buffer;
  error?: Error | null;
}

export class syncWorkflowDefinition implements workflowDefinition {
  constructor(init?: Partial<syncWorkflowDefinition>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  workflow?: workflow;

  dispatcher?: dispatcher;

  cancel?: internal_CancelFunc;

  rootCtx?: internal_Context;

  async Execute(env: workflowEnvironment, header: shared_IHeader, input: Buffer): Promise<void> {
    const [interceptors, envInterceptor] = newWorkflowInterceptors(env, env.GetWorkflowInterceptors());
    let [dispatcher, rootCtx] = newDispatcher(
      newWorkflowContext(env, interceptors, envInterceptor),
      async (ctx) => {
        const r: workflowResult = {};

        const state = getState(this.rootCtx!);
        await state.yield("yield before executing to setup state");

        try {
          r.workflowResult = await this.workflow!.Execute(this.rootCtx!, input);
          r.error = null;
        } catch (err) {
          if (!(err instanceof Error)) throw err;
          r.error = err;
        }

        const rpp = getWorkflowResultPointerPointer(ctx);
        rpp.value = r;
      },
    );

    for (const ctxProp of env.GetContextPropagators()) {
      try {
        rootCtx = ctxProp.ExtractToWorkflow(rootCtx, NewHeaderReader(header));
      } catch (err) {
        if (!(err instanceof Error)) throw err;
        throw `Unable to propagate context ${err.message}`;
      }
    }

    [this.rootCtx, this.cancel] = await WithCancel(rootCtx);
    this.dispatcher = dispatcher;

    getWorkflowEnvironment(this.rootCtx!).RegisterCancelHandler(async () => {
      await this.cancel!();
    });

    getWorkflowEnvironment(this.rootCtx!).RegisterSignalHandler(async (name: string, result: Buffer) => {
      const eo = getWorkflowEnvOptions(this.rootCtx!)!;
      const ch = eo.getSignalChannel(this.rootCtx!, name) as channelImpl;
      const ok = ch.SendAsync(result);
      if (!ok) {
        throw new Error(`Exceeded channel buffer size for signal: ${name}`);
      }
    });

    getWorkflowEnvironment(this.rootCtx!).RegisterQueryHandler(async (queryType: string, queryArgs: Buffer): Promise<Buffer> => {
      const eo = getWorkflowEnvOptions(this.rootCtx!)!;
      const handler = eo.queryHandlers[queryType];
      if (!(queryType in eo.queryHandlers)) {
        throw new Error(
          `unknown queryType ${queryType}. KnownQueryTypes=[${eo.KnownQueryTypes().join(" ")}]`,
        );
      }
      return await handler(queryArgs);
    });
  }

  async OnDecisionTaskStarted(): Promise<void> {
    await executeDispatcher(this.rootCtx!, this.dispatcher!);
  }

  async StackTrace(): Promise<string> {
    return this.dispatcher!.StackTrace();
  }

  KnownQueryTypes(): string[] {
    return getWorkflowEnvOptions(this.rootCtx!)!.KnownQueryTypes();
  }

  async Close(): Promise<void> {
    if (this.dispatcher != null) {
      await this.dispatcher!.Close();
    }
  }

}

export class futureImpl implements internal_Future, internal_Settable, asyncFuture {
  constructor(init?: Partial<futureImpl>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  value?: unknown;

  err?: Error | null;

  ready: boolean = false;

  channel?: channelImpl;

  chained: asyncFuture[] = [];

  async Get(ctx: internal_Context, value: unknown | undefined): Promise<void> {
    const more = await this.channel!.Receive(ctx, undefined);
    if (more) {
      throw "not closed";
    }
    if (!this.ready) {
      throw "not ready";
    }
    if (this.err != null || this.value == null || value == null) {
      if (this.err != null) {
        throw this.err;
      }
      return;
    }
    if (typeof value !== "object") {
      throw new Error("value parameter is not a pointer");
    }

    if (isByteSlice(this.value) && !IsTypeByteSlice(value)) {
      decodeArg(getDataConverterFromWorkflowContext(ctx), this.value as Buffer, value);
      return;
    }

    if (Object.prototype.hasOwnProperty.call(value, "value")) {
      (value as { value: unknown }).value = this.value;
    } else if (typeof this.value === "object" && this.value !== null) {
      Object.assign(value, this.value);
    }
  }

  GetAsync(callback: receiveCallback): [unknown | undefined, boolean] {
      const [, , more] = this.channel!.receiveAsyncImpl(callback);
      if (more) {
        return [undefined, false];
      }
      if (!this.ready) {
        throw "not ready";
      }
      return [this.value!, true];
    }

  RemoveReceiveCallback(callback: receiveCallback): void {
    this.channel!.removeReceiveCallback(callback);
  }

  IsReady(): boolean {
    return this.ready;
  }

  Set(value: unknown | undefined, err: Error | null): void {
    if (this.ready) {
      throw "already set";
    }
    this.value = value;
    this.err = err;
    this.ready = true;
    this.channel!.Close();
    for (const ch of this.chained) {
      ch.Set(this.value!, this.err!);
    }
  }

  SetValue(value: unknown): void {
    if (this.ready) {
      throw "already set";
    }
    this.Set(value, null);
  }

  SetError(err: Error | null): void {
    if (this.ready) {
      throw "already set";
    }
    this.Set(undefined, err);
  }

  Chain(future: internal_Future): void {
    if (this.ready) {
      throw "already set";
    }

    const ch = future;
    if (ch == null || typeof (ch as asyncFuture).IsReady !== "function" || typeof (ch as asyncFuture).ChainFuture !== "function" || typeof (ch as asyncFuture).GetValueAndError !== "function") {
      throw "cannot chain Future that wasn't created with workflow.NewFuture";
    }

    const asyncCh = ch as asyncFuture;
    if (!asyncCh.IsReady()) {
      asyncCh.ChainFuture(this);
      return;
    }

    const [val, err] = asyncCh.GetValueAndError() as [unknown, Error | null];
    this.value = val;
    this.err = err;
    this.ready = true;
  }

  ChainFuture(future: internal_Future): void {
    this.chained.push(future as asyncFuture);
  }

  GetValueAndError(): unknown {
    return [this.value!, this.err!];
  }

}

/**
 * Implements WaitGroup interface
 */
export class waitGroupImpl implements internal_WaitGroup {
  constructor(init?: Partial<waitGroupImpl>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  n: number = 0;

  waiting: boolean = false;

  future?: internal_Future;

  settable?: internal_Settable;

  Add(delta: number): void {
    this.n = this.n + delta;
    if (this.n < 0) {
      throw "negative WaitGroup counter";
    }
    if (this.n > 0 || !this.waiting) {
      return;
    }
    if (this.n === 0) {
      this.settable!.Set(false, null);
    }
  }

  Done(): void {
    this.Add(-1);
  }

  async Wait(ctx: internal_Context): Promise<void> {
    if (this.n <= 0) {
      return;
    }
    if (this.waiting) {
      throw "WaitGroup is reused before previous Wait has returned";
    }

    this.waiting = true;
    const waitingBox = { value: this.waiting };
    try {
      await this.future!.Get(ctx, waitingBox);
    } finally {
      this.waiting = waitingBox.value as boolean;
    }
    const [future, settable] = NewFuture(ctx);
    this.future = future;
    this.settable = settable;
  }

}

export class channelImpl implements internal_Channel {
  constructor(init?: Partial<channelImpl>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  name: string = "";

  size: number = 0;

  buffer: unknown[] = [];

  blockedSends: sendCallback[] = [];

  blockedReceives: receiveCallback[] = [];

  closed: boolean = false;

  recValue?: unknown;

  dataConverter?: internal_DataConverter;

  env?: workflowEnvironment;

  async Receive(ctx: internal_Context, valuePtr: unknown | undefined): Promise<boolean> {
    const state = getState(ctx);
    let hasResult = false;
    let result: unknown = undefined;
    let more = false;
    const callback: receiveCallback = {
      fn: (v: unknown, m: boolean): boolean => {
        result = v;
        hasResult = true;
        more = m;
        return true;
      },
    };

    for (;;) {
      hasResult = false;
      const [v, ok, m] = this.receiveAsyncImpl(callback);

      if (!ok && !m) {
        return m;
      }

      if (ok || !m) {
        try {
          this.assignValue(v, valuePtr);
          state.unblocked();
          return m;
        } catch (err) {
          if (!(err instanceof Error)) {
            throw err;
          }
          continue;
        }
      }

      for (;;) {
        if (hasResult) {
          try {
            this.assignValue(result, valuePtr);
            state.unblocked();
            return more;
          } catch (err) {
            if (!(err instanceof Error)) {
              throw err;
            }
            break;
          }
        }

        try {
          await state.yield(`blocked on ${this.name}.Receive`);
        } catch (err) {
          if (!(err instanceof Error)) {
            throw err;
          }
        }
      }
    }
  }

  ReceiveAsync(valuePtr: unknown): boolean {
    const [ok] = this.ReceiveAsyncWithMoreFlag(valuePtr);
    return ok;
  }

  ReceiveAsyncWithMoreFlag(valuePtr: unknown | undefined): [boolean, boolean] {
    for (;;) {
      const [v, ok, more] = this.receiveAsyncImpl(undefined);
      if (!ok && !more) {
        return [ok, more];
      }

      try {
        this.assignValue(v, valuePtr);
      } catch (err) {
        if (!(err instanceof Error)) throw err;
        continue;
      }

      return [ok, more];
    }
  }

  receiveAsyncImpl(callback: receiveCallback | undefined): [unknown | undefined, boolean, boolean] {
    if (this.recValue != null) {
      const r = this.recValue!;
      this.recValue = undefined;
      return [r, true, true];
    }
    if (this.buffer.length > 0) {
      const r = this.buffer[0]!;
      this.buffer.shift();

      while (this.blockedSends.length > 0) {
        const b = this.blockedSends[0]!;
        this.blockedSends.shift();
        if (b.fn!()) {
          this.buffer.push(b.value!);
          break;
        }
      }

      return [r, true, true];
    }
    if (this.closed) {
      return [undefined, false, false];
    }
    while (this.blockedSends.length > 0) {
      const b = this.blockedSends[0]!;
      this.blockedSends.shift();
      if (b.fn!()) {
        return [b.value!, true, true];
      }
    }
    if (callback != null) {
      this.blockedReceives.push(callback!);
    }
    return [undefined, false, true];
  }

  removeReceiveCallback(callback: receiveCallback): void {
    for (let i = 0; i < this.blockedReceives.length; i++) {
      const blockedCallback = this.blockedReceives[i];
      if (callback === blockedCallback) {
        this.blockedReceives.splice(i, 1);
        break;
      }
    }
  }

  removeSendCallback(callback: sendCallback): void {
    for (let i = 0; i < this.blockedSends.length; i++) {
      const blockedCallback = this.blockedSends[i];
      if (callback === blockedCallback) {
        this.blockedSends.splice(i, 1);
        break;
      }
    }
  }

  async Send(ctx: internal_Context, v: unknown | undefined): Promise<void> {
    const state = getState(ctx);
    let valueConsumed = false;
    const callback: sendCallback = {
      value: v,
      fn: () => {
        valueConsumed = true;
        return true;
      },
    };
    const ok = this.sendAsyncImpl(v!, callback);
    if (ok) {
      state.unblocked();
      return;
    }
    for (;;) {
      if (valueConsumed) {
        state.unblocked();
        return;
      }

      if (this.closed) {
        throw "Closed channel";
      }
      await state.yield(`blocked on ${this.name}.Send`);
    }
  }

  SendAsync(v: unknown): boolean {
    return this.sendAsyncImpl(v, undefined);
  }

  sendAsyncImpl(v: unknown, pair: sendCallback | undefined): boolean {
    if (this.closed) {
      throw "Closed channel";
    }
    while (this.blockedReceives.length > 0) {
      const blockedGet = this.blockedReceives[0]!.fn!;
      this.blockedReceives[0] = undefined as any;
      this.blockedReceives = this.blockedReceives.slice(1);
      if (blockedGet(v, true)) {
        return true;
      }
    }
    if (this.buffer.length < this.size) {
      this.buffer.push(v);
      return true;
    }
    if (pair != null) {
      this.blockedSends.push(pair!);
    }
    return false;
  }

  Close(): void {
    this.closed = true;
    const copy = [...this.blockedReceives];
    for (const callback of copy) {
      callback.fn!(undefined, false);
    }
  }

  assignValue(from: unknown, to: unknown): void {
    try {
      decodeAndAssignValue(this.dataConverter!, from, to);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
      this.env!.GetLogger().error(
        `Corrupt signal received on channel ${this.name}. Error deserializing`,
        { error: err },
      );
      this.env!.GetMetricsScope().Counter(CorruptedSignalsCounter).Inc(1);
      throw err;
    }
  }

}

/**
 * Implements Selector interface
 */
export class selectorImpl implements internal_Selector {
  constructor(init?: Partial<selectorImpl>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  name: string = "";

  cases: selectCase[] = [];

  defaultFunc?: () => void | Promise<void>;

  AddReceive(c: internal_Channel, f: (p0: internal_Channel, p1: boolean) => void | Promise<void>): internal_Selector {
    this.cases.push({ channel: c as channelImpl, receiveFunc: f });
    return this;
  }

  AddSend(c: internal_Channel, v: unknown, f: () => void | Promise<void>): internal_Selector {
    this.cases.push({
      channel: c as channelImpl,
      sendFunc: f,
      sendValue: v,
    });
    return this;
  }

  AddFuture(future: internal_Future, f: (p0: internal_Future) => void | Promise<void>): internal_Selector {
    if (future == null || typeof (future as asyncFuture).GetAsync !== "function") {
      throw "cannot chain Future that wasn't created with workflow.NewFuture";
    }
    const asyncF = future as asyncFuture;
    this.cases.push({ future: asyncF, futureFunc: f });
    return this;
  }

  AddDefault(f: () => void | Promise<void>): void {
    this.defaultFunc = f;
  }

  async Select(ctx: internal_Context): Promise<void> {
    const state = getState(ctx);
    const readyBranch = { run: undefined as (() => void | Promise<void>) | undefined };
    const cleanups: (() => void)[] = [];

    try {
      for (const pair of this.cases) {
        if (pair.receiveFunc != null) {
          const f = pair.receiveFunc!;
          const c = pair.channel!;
          const callback: receiveCallback = {
            fn: (v: unknown, more: boolean): boolean => {
              if (readyBranch.run != null) {
                return false;
              }
              readyBranch.run = async () => {
                c.recValue = v;
                await f(c, more);
              };
              return true;
            },
          };

          const [v, ok, more] = c.receiveAsyncImpl(callback);
          if (ok || !more) {
            readyBranch.run = async () => {};
            if (more) {
              c.recValue = v;
            }
            await f(c, more);
            return;
          }

          cleanups.push(() => {
            c.removeReceiveCallback(callback);
          });
        } else if (pair.sendFunc != null) {
          const f = pair.sendFunc!;
          const c = pair.channel!;
          const callback: sendCallback = {
            value: pair.sendValue!,
            fn: (): boolean => {
              if (readyBranch.run != null) {
                return false;
              }
              readyBranch.run = async () => {
                await f();
              };
              return true;
            },
          };

          const ok = c.sendAsyncImpl(pair.sendValue!, callback);
          if (ok) {
            readyBranch.run = async () => {};
            await f();
            return;
          }

          cleanups.push(() => {
            c.removeSendCallback(callback);
          });
        } else if (pair.futureFunc != null) {
          const p = pair;
          const f = p.futureFunc!;
          const callback: receiveCallback = {
            fn: (_v: unknown, _more: boolean): boolean => {
              if (readyBranch.run != null) {
                return false;
              }
              readyBranch.run = async () => {
                p.futureFunc = undefined;
                await f(p.future!);
              };
              return true;
            },
          };

          const [, ok] = p.future!.GetAsync(callback);
          if (ok) {
            readyBranch.run = async () => {};
            p.futureFunc = undefined;
            await f(p.future!);
            return;
          }

          cleanups.push(() => {
            p.future!.RemoveReceiveCallback(callback);
          });
        }
      }

      if (this.defaultFunc != null) {
        const f = this.defaultFunc!;
        await f();
        return;
      }

      for (;;) {
        if (readyBranch.run != null) {
          await readyBranch.run();
          state.unblocked();
          return;
        }
        await state.yield(`blocked on ${this.name}.Select`);
      }
    } finally {
      for (const cleanup of cleanups) {
        cleanup();
      }
    }
  }

}

export class coroutineState {
  constructor(init?: Partial<coroutineState>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  name: string = "";

  dispatcher?: dispatcherImpl;

  aboutToBlock?: Channel<boolean>;

  unblock?: Channel<unblockFunc>;

  keptBlocked: boolean = false;

  closed: boolean = false;

  blocked: AtomicBool = new AtomicBool();

  panicError?: workflowPanicError;

  async initialYield(stackDepth: number, status: string): Promise<void> {
    if (this.blocked.Swap(true)) {
      throw "trying to block on coroutine which is already blocked, most likely a wrong Context is used to do blocking" +
        " call (like Future.Get() or Channel.Receive()";
    }
    let keepBlocked = true;
    while (keepBlocked) {
      const { value: f } = await this.unblock!.recv();
      keepBlocked = f!(status, stackDepth + 1);
    }
    this.blocked.Swap(false);
  }

  async yield(status: string): Promise<void> {
    await this.aboutToBlock!.send(true);
    await this.initialYield(3, status);
    this.keptBlocked = true;
  }

  unblocked(): void {
    this.keptBlocked = false;
  }

  async call(): Promise<void> {
    await this.unblock!.send((status: string, stackDepth: number): boolean => {
      return false;
    });
    await this.aboutToBlock!.recv();
  }

  close(): void {
    this.closed = true;
    this.aboutToBlock!.trySend(true);
  }

  async stackTrace(): Promise<string> {
    if (this.closed) {
      return "";
    }

    const stackCh = new Channel<string>(1);
    await this.unblock!.send((status, stackDepth) => {
      stackCh.trySend(getStackTrace(this.name, status, stackDepth + 2));
      return true;
    });

    const { value } = await stackCh.recv();
    return value ?? "";
  }

  exit(): void {
    if (!this.closed) {
      void this.unblock!.send((_status: string, _stackDepth: number): boolean => {
        throw null;
      });
    }
  }

}

export class dispatcherImpl implements dispatcher {
  constructor(init?: Partial<dispatcherImpl>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  sequence: number = 0;

  channelSequence: number = 0;

  selectorSequence: number = 0;

  coroutines: coroutineState[] = [];

  executing: boolean = false;

  mutex: Mutex = new Mutex();

  closed: boolean = false;

  newCoroutine(ctx: internal_Context, f: (p0: internal_Context) => void | Promise<void>): internal_Context {
      return this.newNamedCoroutine(ctx, `${this.sequence + 1}`, f);
    }

  newNamedCoroutine(ctx: internal_Context, name: string, f: (p0: internal_Context) => void | Promise<void>): internal_Context {
    const state = this.newState(name);
    const spawned = WithValue(ctx, coroutinesContextKey, state);
    const createdBy = (new Error().stack ?? "").split("\n").slice(2).join("\n");

    void (async (crt: coroutineState) => {
      try {
        await crt.initialYield(1, "");
        await f(spawned);
      } catch (r) {
        if (r != null) {
          let st = getStackTrace(name, "panic", 4);
          if (createdBy !== "") {
            st = `${st}\ncreated by:\n${createdBy}`;
          }
          crt.panicError = newWorkflowPanicError(r, st);
        }
      } finally {
        crt.close();
      }
    })(state);

    return spawned;
  }

  newState(name: string): coroutineState {
    const c = new coroutineState({
      name,
      dispatcher: this,
      aboutToBlock: new Channel<boolean>(1),
      unblock: new Channel<unblockFunc>(),
      blocked: new AtomicBool(),
      closed: false,
      keptBlocked: false,
    });
    this.sequence++;
    this.coroutines.push(c);
    return c;
  }

  async ExecuteUntilAllBlocked(): Promise<void> {
      const release = await this.mutex.acquire();
      if (this.closed) {
        throw "dispatcher is closed";
      }
      if (this.executing) {
        throw "call to ExecuteUntilAllBlocked (possibly from a coroutine) while it is already running";
      }
      this.executing = true;
      release();

      try {
        let allBlocked = false;
        while (!allBlocked) {
          allBlocked = true;
          const lastSequence = this.sequence;
          for (let i = 0; i < this.coroutines.length; i++) {
            const c = this.coroutines[i]!;
            if (!c.closed) {
              await c.call();
            }
            if (c.closed) {
              this.coroutines.splice(i, 1);
              i--;
              if (c.panicError != null) {
                throw c.panicError!;
              }
              allBlocked = false;
            } else {
              allBlocked = allBlocked && (c.keptBlocked || c.closed);
            }
          }
          allBlocked = allBlocked && lastSequence === this.sequence;
          if (this.coroutines.length === 0) {
            break;
          }
        }
      } finally {
        this.executing = false;
      }
    }

  IsDone(): boolean {
    return this.coroutines.length === 0;
  }

  async Close(): Promise<void> {
    const release = await this.mutex.acquire();
    if (this.closed) {
      release();
      return;
    }
    this.closed = true;
    release();
    for (let i = 0; i < this.coroutines.length; i++) {
      const c = this.coroutines[i]!;
      if (!c.closed) {
        c.exit();
      }
    }
  }

  async StackTrace(): Promise<string> {
    let result = "";
    for (let i = 0; i < this.coroutines.length; i++) {
      const c = this.coroutines[i]!;
      if (!c.closed) {
        if (result.length > 0) {
          result += "\n\n";
        }
        result += await c.stackTrace();
      }
    }
    return result;
  }

}

/**
 * The current timeout resolution implementation is in seconds and uses math.Ceil() as the duration. But is
 * subjected to change in the future.
 */
export class workflowOptions {
  constructor(init?: Partial<workflowOptions>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  taskListName?: string;

  executionStartToCloseTimeoutSeconds?: number;

  taskStartToCloseTimeoutSeconds?: number;

  domain?: string;

  workflowID: string = "";

  waitForCancellation: boolean = false;

  signalChannels: Record<string, internal_Channel> = {};

  queryHandlers: Record<string, (p0: Buffer) => Buffer | Promise<Buffer>> = {};

  workflowIDReusePolicy: internal_WorkflowIDReusePolicy = 0;

  dataConverter?: internal_DataConverter;

  retryPolicy?: shared_IRetryPolicy;

  cronSchedule: string = "";

  cronOverlapPolicy: shared_CronOverlapPolicy = 0;

  contextPropagators: internal_ContextPropagator[] = [];

  memo: Record<string, unknown> = {};

  searchAttributes: Record<string, unknown> = {};

  parentClosePolicy: internal_ParentClosePolicy = 0;

  bugports: internal_Bugports = { StartChildWorkflowsOnCanceledContext: false };

  getSignalChannel(ctx: internal_Context, signalName: string): internal_Channel {
    if (signalName in this.signalChannels) {
      return this.signalChannels[signalName]!;
    }
    const ch = NewBufferedChannel(ctx, defaultSignalChannelSize);
    this.signalChannels[signalName] = ch;
    return ch;
  }

  getUnhandledSignalNames(): string[] {
    const unhandledSignals: string[] = [];
    for (const [k, c] of Object.entries(this.signalChannels ?? {})) {
      const ch = c as channelImpl;
      const [v, ok] = ch.receiveAsyncImpl(undefined);
      if (ok) {
        unhandledSignals.push(k);
        ch.recValue = v;
      }
    }
    return unhandledSignals;
  }

  KnownQueryTypes(): string[] {
    const keys = BuiltinQueryTypes();

    for (const k of Object.keys(this.queryHandlers)) {
      keys.push(k);
    }

    keys.sort();
    return keys;
  }

}

export class executeWorkflowParams extends workflowOptions {
  constructor(init?: Partial<executeWorkflowParams>) {
    super(init);
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  workflowType?: internal_WorkflowType;

  input: Buffer = Buffer.alloc(0);

  header?: shared_IHeader;

  attempt: number = 0;

  scheduledTime: number = 0;

  lastCompletionResult: Buffer = Buffer.alloc(0);

}

/**
 * decodeFutureImpl
 */
export class decodeFutureImpl extends futureImpl implements internal_Future, internal_Settable, asyncFuture {
  constructor(init?: Partial<decodeFutureImpl>) {
    super(init);
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  fn?: unknown;

  async Get(ctx: internal_Context, value: unknown | undefined): Promise<void> {
    const more = await this.channel!.Receive(ctx, undefined);
    if (more) {
      throw "not closed";
    }
    if (!this.ready) {
      throw "not ready";
    }
    if (this.err != null || this.value == null || value == null) {
      if (this.err != null) {
        throw this.err;
      }
      return;
    }
    if (typeof value !== 'object') {
      throw new Error("value parameter is not a pointer");
    }
    await deSerializeFunctionResult(
      this.fn!,
      this.value as Buffer,
      value!,
      getDataConverterFromWorkflowContext(ctx),
      this.channel!.env!.GetRegistry()
    );
    if (this.err != null) {
      throw this.err;
    }
  }

}

export class childWorkflowFutureImpl extends decodeFutureImpl implements internal_ChildWorkflowFuture, internal_Future, internal_Settable, asyncFuture {
  constructor(init?: Partial<childWorkflowFutureImpl>) {
    super(init);
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  executionFuture?: futureImpl;

  GetChildWorkflowExecution(): internal_Future {
    return this.executionFuture!;
  }

  async SignalChildWorkflow(ctx: internal_Context, signalName: string, data: unknown): Promise<internal_Future> {
    const childExec: { value: internal_WorkflowExecution } = {
      value: { ID: "", RunID: "" }
    };
    try {
      await this.GetChildWorkflowExecution().Get(ctx, childExec);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
      return this.GetChildWorkflowExecution();
    }

    const childWorkflowOnly = true;
    return signalExternalWorkflow(ctx, childExec.value.ID, "", signalName, data, childWorkflowOnly);
  }

}

export class queryHandler {
  constructor(init?: Partial<queryHandler>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  fn?: unknown;

  queryType: string = "";

  dataConverter?: internal_DataConverter;

  validateHandlerFn(): void {
    const fnType = this.fn!;

    if (typeof fnType !== "function") {
      throw new Error(`query handler must be function but was ${typeof fnType}`);
    }
  }

  async execute(input: Buffer): Promise<Buffer> {
    const formatValue = (value: unknown): string =>
      value instanceof Error
        ? value.message
        : typeof (value as { String?: () => string }).String === "function"
          ? (value as { String?: () => string }).String!()
          : globalThis.String(value);

    try {
      const fn = this.fn!;
      let args: unknown[];

      if ((fn as Function).length === 1 && goFnLastParamIsByteSlice(fn)) {
        args = [input];
      } else {
        let decoded: unknown[];
        try {
          decoded = decodeArgs(this.dataConverter!, fn, input);
        } catch (caught) {
          if (!(caught instanceof Error)) {
            throw caught;
          }
          throw new Error(
            `unable to decode the input for queryType: ${this.queryType}, with error: ${formatValue(caught)}`
          );
        }
        args = [...decoded];
      }

      const ret = await (fn as (...args: unknown[]) => unknown)(...args);
      const retValues: unknown[] = ret == null ? [] : Array.isArray(ret) ? ret : [ret];

      const retValue = retValues[0];
      let result: Buffer = Buffer.alloc(0);

      if (retValue != null) {
        result = encodeArg(this.dataConverter, retValue);
      }

      const errValue = retValues[1];
      if (errValue == null) {
        return result;
      }

      if (
        !(errValue instanceof Error) &&
        typeof (errValue as { Error?: unknown }).Error !== "function"
      ) {
        throw new Error(
          `failed to parse error result as it is not of error interface: ${formatValue(errValue)}`
        );
      }

      throw errValue;
    } catch (p) {
      if (p instanceof Error) {
        throw p;
      }

      const stackTrace = getStackTraceRaw("query handler [panic]:", 4, 0);
      const panic =
        p === panicIllegalAccessCoroutinueState
          ? "query handler must not use cadence context to do things like workflow.NewChannel(), " +
            "workflow.Go() or to call any workflow blocking functions like Channel.Get() or Future.Get()"
          : formatValue(p);

      throw new Error(`query handler panic: ${panic}, stack trace: ${stackTrace}`);
    }
  }

}

export class workflowEnvironmentInterceptor implements internal_WorkflowInterceptor {
  constructor(init?: Partial<workflowEnvironmentInterceptor>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  env?: workflowEnvironment;

  interceptorChainHead?: internal_WorkflowInterceptor;

  fn?: unknown;

  async ExecuteWorkflow(ctx: internal_Context, workflowType: string, ...inputArgs: unknown[]): Promise<unknown[]> {
    const args: unknown[] = [ctx];
    for (const arg of inputArgs) {
      if (isByteSliceTarget(arg)) {
        args.push(arg);
      } else {
        args.push((arg as { value: unknown }).value);
      }
    }
    const ret = await (this.fn! as (...a: unknown[]) => unknown)(...args);
    return ret == null ? [] : Array.isArray(ret) ? ret : [ret];
  }

  async ExecuteActivity(ctx: internal_Context, typeName: string, ...args: unknown[]): Promise<internal_Future> {
    const dataConverter = getDataConverterFromWorkflowContext(ctx);
    const registry = getRegistryFromWorkflowContext(ctx);
    const [future, settable] = newDecodeFuture(ctx, typeName);

    let activityType: internal_ActivityType;
    try {
      activityType = await getValidatedActivityFunction(typeName, args, registry);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
      settable.Set(null, err);
      return future;
    }

    let options: activityOptions;
    try {
      options = getValidatedActivityOptions(ctx);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
      settable.Set(null, err);
      return future;
    }

    const sessionInfo = getSessionInfo(ctx);
    let oldTaskListName = "";
    let restoreSession = false;

    if (sessionInfo != null) {
      const isCreationActivity = isSessionCreationActivity(typeName);
      if (sessionInfo.sessionState === sessionStateFailed && !isCreationActivity) {
        settable.Set(null, ErrSessionFailed);
        return future;
      }
      if (sessionInfo.sessionState === sessionStateOpen && !isCreationActivity) {
        oldTaskListName = options.TaskListName;
        options.TaskListName = sessionInfo.tasklist;
        if (this.env!.GetFeatureFlags().EphemeralTaskListsEnabled) {
          options.TaskListKind = TaskListKind.EPHEMERAL;
        }
        restoreSession = true;
      }
    }

    try {
      const header = getHeadersFromContext(ctx);
      const input = encodeArgs(dataConverter, args);
      const params = new executeActivityParams({
        activityOptions: options,
        ActivityType: activityType,
        Input: input,
        DataConverter: dataConverter,
        Header: header,
      });

      const done = ctx.Done();
      const ctxDone = done as channelImpl;
      const cancellable = done instanceof channelImpl;
      const cancellationCallback: receiveCallback = {};
      const activity = await getWorkflowEnvironment(ctx).ExecuteActivity(params, (r: Buffer, e: Error | null) => {
        settable.Set(r, e);
        if (cancellable) {
          ctxDone.removeReceiveCallback(cancellationCallback);
        }
      });

      if (cancellable) {
        cancellationCallback.fn = (_v: unknown, _more: boolean): boolean => {
          if (ctx.Err() === ErrCanceled) {
            this.env!.RequestCancelActivity(activity.activityID);
          }
          return false;
        };
        const [, ok, more] = ctxDone.receiveAsyncImpl(cancellationCallback);
        if (ok || !more) {
          cancellationCallback.fn!(null, more);
        }
      }

      return future;
    } finally {
      if (restoreSession) {
        options.TaskListName = oldTaskListName;
        options.TaskListKind = TaskListKind.NORMAL;
      }
    }
  }

  async ExecuteLocalActivity(ctx: internal_Context, activityType: string, ...args: unknown[]): Promise<internal_Future> {
    const header = getHeadersFromContext(ctx);
    const activityFn = ctx.Value(localActivityFnContextKey);
    if (activityFn == null) {
      throw "ExecuteLocalActivity: Expected context key " + localActivityFnContextKey + " is missing";
    }

    const [future, settable] = newDecodeFuture(ctx, activityFn);

    try {
      validateFunctionArgs(activityFn, args, false);
    } catch (e) {
      if (!(e instanceof Error)) throw e;
      settable.Set(undefined, e);
      return future;
    }

    let options: ReturnType<typeof getValidatedLocalActivityOptions>;
    try {
      options = getValidatedLocalActivityOptions(ctx);
    } catch (e) {
      if (!(e instanceof Error)) throw e;
      settable.Set(undefined, e);
      return future;
    }

    const params = new executeLocalActivityParams({
      localActivityOptions: { ...options },
      ActivityFn: activityFn,
      ActivityType: activityType,
      InputArgs: args,
      WorkflowInfo: GetWorkflowInfo(ctx),
      DataConverter: getDataConverterFromWorkflowContext(ctx),
      ScheduledTime: Now(ctx),
      Header: header,
      Attempt: 0,
    });

    Go(ctx, async (ctx: internal_Context) => {
      for (;;) {
        const f = await this.scheduleLocalActivity(ctx, params);
        const resultBox: { value: Buffer } = { value: Buffer.alloc(0) };
        let err: Error | null = null;

        try {
          await f.Get(ctx, resultBox);
        } catch (e) {
          if (!(e instanceof Error)) throw e;
          err = e;
        }

        if (err instanceof needRetryError && err.Backoff > 0) {
          try {
            await Sleep(ctx, err.Backoff);
          } catch (e) {
            if (!(e instanceof Error)) throw e;
          }
          params.Attempt = err.Attempt + 1;
          continue;
        }

        settable.Set(resultBox.value, err);
        return;
      }
    });

    return future;
  }

  async scheduleLocalActivity(ctx: internal_Context, params: executeLocalActivityParams): Promise<futureImpl> {
    const f = new futureImpl({
      channel: NewChannel(ctx) as channelImpl,
      chained: [],
      ready: false
    });
    const ctxDone = ctx.Done() as channelImpl;
    const cancellable = ctx.Done() instanceof channelImpl;
    const cancellationCallback: receiveCallback = {};

    const la = await this.env!.ExecuteLocalActivity(params, (lar) => {
      if (cancellable) {
        ctxDone.removeReceiveCallback(cancellationCallback);
      }

      if (lar.err == null || IsCanceledError(lar.err) || lar.backoff <= 0) {
        f.Set(lar.result, lar.err ?? null);
        return;
      }

      f.Set(undefined, new needRetryError({ Backoff: lar.backoff, Attempt: lar.attempt }));
    });

    if (cancellable) {
      cancellationCallback.fn = (v: unknown, more: boolean): boolean => {
        if (ctx.Err() === ErrCanceled) {
          void this.env!.RequestCancelLocalActivity(la.activityID).catch((err) => {
            if (!(err instanceof Error)) throw err;
          });
        }
        return false;
      };

      const [, ok, more] = ctxDone.receiveAsyncImpl(cancellationCallback);
      if (ok || !more) {
        cancellationCallback.fn(undefined, more);
      }
    }

    return f;
  }

  async ExecuteChildWorkflow(ctx: internal_Context, childWorkflowType: string, ...args: unknown[]): Promise<internal_ChildWorkflowFuture> {
    const [mainFuture, mainSettable] = newDecodeFuture(ctx, childWorkflowType);
    const [executionFuture, executionSettable] = NewFuture(ctx);
    const result = Object.setPrototypeOf(mainFuture, childWorkflowFutureImpl.prototype) as childWorkflowFutureImpl;
    result.executionFuture = executionFuture as futureImpl;

    let correctChildCancellation = true;
    const workflowOptionsFromCtx = getWorkflowEnvOptions(ctx)!;

    if (ctx.Err() != null) {
      if (workflowOptionsFromCtx.bugports.StartChildWorkflowsOnCanceledContext) {
        correctChildCancellation = false;
      } else {
        mainSettable.SetError(ctx.Err());
        executionSettable.SetError(ctx.Err());
        return result;
      }
    }

    const dc = workflowOptionsFromCtx.dataConverter;
    const env = getWorkflowEnvironment(ctx);
    const [wfType, input] = await getValidatedWorkflowFunction(
      childWorkflowType,
      args,
      dc,
      env.GetRegistry(),
    );

    const options = getValidatedWorkflowOptions(ctx);
    options.dataConverter = dc;
    options.contextPropagators = workflowOptionsFromCtx.contextPropagators;
    options.memo = workflowOptionsFromCtx.memo;
    options.searchAttributes = workflowOptionsFromCtx.searchAttributes;

    const params = new executeWorkflowParams({
      ...options,
      input,
      workflowType: wfType,
      header: getWorkflowHeader(ctx, options.contextPropagators),
      scheduledTime: Now(ctx),
      attempt: 0,
      lastCompletionResult: Buffer.alloc(0),
    });

    let childWorkflowExecution: internal_WorkflowExecution | undefined;

    const ctxDone = ctx.Done()! as channelImpl;
    const cancellable = ctxDone instanceof channelImpl;
    const cancellationCallback: receiveCallback = {};
    let shouldCancelAsync = false;

    try {
      env.ExecuteChildWorkflow(
        params,
        async (r: Buffer, e: Error | null): Promise<void> => {
          mainSettable.Set(r, e);
          if (cancellable) {
            ctxDone.removeReceiveCallback(cancellationCallback);
          }
        },
        async (r: internal_WorkflowExecution, e: Error | null): Promise<void> => {
          if (e == null) {
            childWorkflowExecution = r;
          }
          executionSettable.Set(r, e);

          if (shouldCancelAsync && e == null && !mainFuture.IsReady()) {
            if (!workflowOptionsFromCtx.bugports.StartChildWorkflowsOnCanceledContext) {
              try {
                await env.RequestCancelChildWorkflow(options.domain!, childWorkflowExecution!.ID);
              } catch (err) {
                if (!(err instanceof Error)) throw err;
              }
            }
          }
        },
      );
    } catch (err) {
      if (!(err instanceof Error)) throw err;
      executionSettable.Set(undefined, err);
      mainSettable.Set(undefined, err);
      return result;
    }

    if (cancellable) {
      cancellationCallback.fn = (_v: unknown, _more: boolean): boolean => {
        if (ctx.Err() === ErrCanceled) {
          if (childWorkflowExecution != null && !mainFuture.IsReady()) {
            void env.RequestCancelChildWorkflow(options.domain!, childWorkflowExecution.ID).catch((err) => {
              if (!(err instanceof Error)) throw err;
            });
          } else if (childWorkflowExecution == null && correctChildCancellation) {
            shouldCancelAsync = true;
          }
        }
        return false;
      };

      const [, ok, more] = ctxDone.receiveAsyncImpl(cancellationCallback);
      if (ok || !more) {
        cancellationCallback.fn(undefined, more);
      }
    }

    return result;
  }

  GetWorkflowInfo(ctx: internal_Context): WorkflowInfo {
    return this.env!.WorkflowInfo();
  }

  GetLogger(ctx: internal_Context): Logger {
    return this.env!.GetLogger();
  }

  GetMetricsScope(ctx: internal_Context): Scope {
    return this.env!.GetMetricsScope();
  }

  Now(ctx: internal_Context): number {
    return this.env!.Now();
  }

  NewTimer(ctx: internal_Context, d: number): internal_Future {
    const [future, settable] = NewFuture(ctx);
    if (d <= 0) {
      settable.Set(true, null);
      return future;
    }

    const ctxDone = ctx.Done() as channelImpl;
    const cancellable = ctxDone instanceof channelImpl;
    const cancellationCallback: receiveCallback = {};
    const t = this.env!.NewTimer(d, (r: Buffer, e: Error | null) => {
      settable.Set(undefined, e);
      if (cancellable) {
        ctxDone.removeReceiveCallback(cancellationCallback);
      }
    });

    if (t != null && cancellable) {
      cancellationCallback.fn = (v: unknown, more: boolean): boolean => {
        if (!future.IsReady()) {
          this.env!.RequestCancelTimer(t.timerID);
        }
        return false;
      };
      const [, ok, more] = ctxDone.receiveAsyncImpl(cancellationCallback);
      if (ok || !more) {
        cancellationCallback.fn!(undefined, more);
      }
    }
    return future;
  }

  async Sleep(ctx: internal_Context, d: number): Promise<void> {
    const t = NewTimer(ctx, d);
    await t.Get(ctx, undefined);
  }

  async RequestCancelExternalWorkflow(ctx: internal_Context, workflowID: string, runID: string): Promise<internal_Future> {
    const ctx1 = setWorkflowEnvOptionsIfNotExist(ctx);
    const options = getWorkflowEnvOptions(ctx1)!;
    const [future, settable] = NewFuture(ctx1);

    if (options.domain == null || options.domain === "") {
      settable.Set(undefined, errDomainNotSet);
      return future;
    }

    if (workflowID === "") {
      settable.Set(undefined, errWorkflowIDNotSet);
      return future;
    }

    const resultCallback = (result: Buffer, err: Error | null): void => {
      settable.Set(result, err);
    };

    this.env!.RequestCancelExternalWorkflow(
      options.domain,
      workflowID,
      runID,
      resultCallback,
    );

    return future;
  }

  SignalExternalWorkflow(ctx: internal_Context, workflowID: string, runID: string, signalName: string, arg: unknown): internal_Future {
    const childWorkflowOnly = false;
    return signalExternalWorkflow(ctx, workflowID, runID, signalName, arg, childWorkflowOnly);
  }

  async UpsertSearchAttributes(ctx: internal_Context, attributes: Record<string, unknown>): Promise<void> {
    if (CadenceChangeVersion in attributes) {
      throw new globalThis.Error("CadenceChangeVersion is a reserved key that cannot be set, please use other key");
    }
    await this.env!.UpsertSearchAttributes(attributes);
  }

  GetSignalChannel(ctx: internal_Context, signalName: string): internal_Channel {
    return getWorkflowEnvOptions(ctx)!.getSignalChannel(ctx, signalName);
  }

  async SideEffect(ctx: internal_Context, f: (p0: internal_Context) => unknown | Promise<unknown>): Promise<EncodedValue> {
    const dc = getDataConverterFromWorkflowContext(ctx);
    const [future, settable] = NewFuture(ctx);
    const wrapperFunc = (): Buffer => {
      const r = f(ctx);
      return encodeArg(dc, r);
    };
    const resultCallback = (result: Buffer, err: Error | null): void => {
      settable.Set(new EncodedValue({ value: result, dataConverter: dc }), err);
    };
    this.env!.SideEffect(wrapperFunc, resultCallback);
    const encoded: { value: EncodedValue } = {
      value: new EncodedValue({ value: undefined, dataConverter: undefined }),
    };
    await future.Get(ctx, encoded);
    return encoded.value;
  }

  MutableSideEffect(ctx: internal_Context, id: string, f: (p0: internal_Context) => unknown | Promise<unknown>, equals: (p0: unknown, p1: unknown) => boolean): internal_Value {
    const wrapperFunc = () => f(ctx);
    return this.env!.MutableSideEffect(id, wrapperFunc, equals);
  }

  async GetVersion(ctx: internal_Context, changeID: string, minSupported: internal_Version, maxSupported: internal_Version, ...opts: internal_GetVersionOption[]): Promise<internal_Version> {
    return this.env!.GetVersion(changeID, minSupported, maxSupported, ...opts);
  }

  async SetQueryHandler(ctx: internal_Context, queryType: string, handler: unknown): Promise<void> {
    if (queryType.startsWith("__")) {
      throw new Error("queryType starts with '__' is reserved for internal use");
    }
    await setQueryHandler(ctx, queryType, handler);
  }

  IsReplaying(ctx: internal_Context): boolean {
    return this.env!.IsReplaying();
  }

  HasLastCompletionResult(ctx: internal_Context): boolean {
    const info = this.GetWorkflowInfo(ctx);
    return info.lastCompletionResult.length > 0;
  }

  GetLastCompletionResult(ctx: internal_Context, ...d: unknown[]): void {
    const info = this.GetWorkflowInfo(ctx);
    if (info.lastCompletionResult.length === 0) {
      throw ErrNoData;
    }

    const encodedVal = newEncodedValues(
      info.lastCompletionResult,
      getDataConverterFromWorkflowContext(ctx),
    );
    encodedVal.Get(...d);
  }

}

/**
 * Pointer to pointer to workflow result
 */
export function getWorkflowResultPointerPointer(ctx: internal_Context): Ref<workflowResult | undefined> {
  const rpp = ctx.Value(workflowResultContextKey);
  if (rpp == null) {
    throw "getWorkflowResultPointerPointer: Not a workflow context";
  }
  return rpp as Ref<workflowResult | undefined>;
}

export function getWorkflowEnvironment(ctx: internal_Context): workflowEnvironment {
  const wc = ctx.Value(workflowEnvironmentContextKey);
  if (wc == null) {
    throw "getWorkflowContext: Not a workflow context";
  }
  return wc as workflowEnvironment;
}

export function getEnvInterceptor(ctx: internal_Context): workflowEnvironmentInterceptor {
  const wc = ctx.Value(workflowEnvInterceptorContextKey);
  if (wc == null) {
    throw "getWorkflowContext: Not a workflow context";
  }
  return wc as workflowEnvironmentInterceptor;
}

export function getWorkflowInterceptor(ctx: internal_Context): internal_WorkflowInterceptor {
  const wc = ctx.Value(workflowInterceptorsContextKey);
  if (wc == null) {
    throw "getWorkflowInterceptor: Not a workflow context";
  }
  return wc as internal_WorkflowInterceptor;
}

export function newWorkflowContext(env: workflowEnvironment, interceptors: internal_WorkflowInterceptor, envInterceptor: workflowEnvironmentInterceptor): internal_Context {
  let rootCtx = WithValue(background, workflowEnvironmentContextKey, env);
  rootCtx = WithValue(rootCtx, workflowEnvInterceptorContextKey, envInterceptor);
  rootCtx = WithValue(rootCtx, workflowInterceptorsContextKey, interceptors);

  const resultPtr = new Ref<workflowResult | undefined>(undefined);
  rootCtx = WithValue(rootCtx, workflowResultContextKey, resultPtr);

  const wInfo = env.WorkflowInfo();
  rootCtx = WithWorkflowDomain(rootCtx, wInfo.Domain);
  rootCtx = WithWorkflowTaskList(rootCtx, wInfo.TaskListName);
  rootCtx = WithExecutionStartToCloseTimeout(rootCtx, wInfo.ExecutionStartToCloseTimeoutSeconds * Second);
  rootCtx = WithWorkflowTaskStartToCloseTimeout(rootCtx, wInfo.TaskStartToCloseTimeoutSeconds * Second);
  rootCtx = WithTaskList(rootCtx, wInfo.TaskListName);
  rootCtx = WithDataConverter(rootCtx, env.GetDataConverter());
  rootCtx = withContextPropagators(rootCtx, env.GetContextPropagators());
  getActivityOptions(rootCtx)!.OriginalTaskListName = wInfo.TaskListName;

  return rootCtx;
}

export function newWorkflowInterceptors(env: workflowEnvironment, factories: internal_WorkflowInterceptorFactory[]): [internal_WorkflowInterceptor, workflowEnvironmentInterceptor] {
  const envInterceptor = new workflowEnvironmentInterceptor({ env });
  let interceptor: internal_WorkflowInterceptor = envInterceptor;
  for (let i = factories.length - 1; i >= 0; i--) {
    interceptor = factories[i].NewInterceptor(env.WorkflowInfo(), interceptor);
  }
  envInterceptor.interceptorChainHead = interceptor;
  return [interceptor, envInterceptor];
}

/**
 * NewDispatcher creates a new Dispatcher instance with a root coroutine function.
 * Context passed to the root function is child of the passed rootCtx.
 * This way rootCtx can be used to pass values to the coroutine code.
 */
export function newDispatcher(rootCtx: internal_Context, root: (p0: internal_Context) => void | Promise<void>): [dispatcherImpl, internal_Context] {
  const result = new dispatcherImpl({
    channelSequence: 0,
    closed: false,
    coroutines: [],
    executing: false,
    mutex: new Mutex(),
    selectorSequence: 0,
    sequence: 0,
  });
  const ctxWithState = result.newCoroutine(rootCtx, root);
  return [result, ctxWithState];
}

export function getStackTrace(coroutineName: string, status: string, stackDepth: number): string {
  const top = `coroutine ${coroutineName} [${status}]:`;
  return getStackTraceRaw(top, stackDepth + 1, 2);
}

export function getStackTraceRaw(top: string, omitTop: number, omitBottom: number): string {
    const rawStack = (new Error().stack ?? "").trimEnd();
    if (disableCleanStackTraces) {
        return rawStack;
    }
    let lines = rawStack.split("\n");
    lines = lines.slice(omitTop, lines.length - omitBottom);
    lines = [top, ...lines];
    return lines.join("\n");
}

/**
 * NewWorkflowDefinition creates a WorkflowDefinition from a Workflow
 */
export function newSyncWorkflowDefinition(workflow: workflow): syncWorkflowDefinition {
  return new syncWorkflowDefinition({ workflow });
}

export async function getValidatedWorkflowFunction(workflowFunc: unknown, args: unknown[], dataConverter: internal_DataConverter | undefined, r: registry | undefined): Promise<[internal_WorkflowType, Buffer]> {
	const fType = workflowFunc;
	let fnName = "";

	switch (getKind(fType)) {
		case "string":
			fnName = workflowFunc as string;
			break;

		case "function":
			validateFunctionArgs(workflowFunc, args, true);
			fnName = await getWorkflowFunctionName(r!, workflowFunc);
			break;

		default:
			throw new Error(
				`invalid type 'workflowFunc' parameter provided, it can be either worker function or name of the worker type: ${
					workflowFunc instanceof Error
						? workflowFunc.message
						: typeof (workflowFunc as { String?: unknown }).String === "function"
							? (workflowFunc as { String(): string }).String()
							: globalThis.String(workflowFunc)
				}`,
			);
	}

	if (dataConverter == null) {
		dataConverter = getDefaultDataConverter();
	}

	const input = encodeArgs(dataConverter, args);
	return [{ Name: fnName, Path: "" }, input];
}

export function getValidatedWorkflowOptions(ctx: internal_Context): workflowOptions {
  const p = getWorkflowEnvOptions(ctx);
  if (p == null) {
    throw errWorkflowOptionBadRequest;
  }

  const info = GetWorkflowInfo(ctx);

  if (p.domain == null || p.domain === "") {
    p.domain = StringPtr(info.Domain);
  }

  if (p.taskListName == null || p.taskListName === "") {
    p.taskListName = StringPtr(info.TaskListName);
  }

  if (p.taskStartToCloseTimeoutSeconds == null || p.taskStartToCloseTimeoutSeconds! < 0) {
    throw new Error("missing or negative DecisionTaskStartToCloseTimeout");
  }

  if (p.taskStartToCloseTimeoutSeconds === 0) {
    p.taskStartToCloseTimeoutSeconds = Int32Ptr(defaultDecisionTaskTimeoutInSecs);
  }

  if (p.executionStartToCloseTimeoutSeconds == null || p.executionStartToCloseTimeoutSeconds <= 0) {
    throw new Error("missing or invalid ExecutionStartToCloseTimeout");
  }

  validateRetryPolicy(p.retryPolicy!);
  validateCronSchedule(p.cronSchedule);

  return p;
}

export function validateCronSchedule(cronSchedule: string): void {
    if (cronSchedule.length === 0) {
        return;
    }

    cron.CronExpressionParser.parse(cronSchedule);
}

export function getWorkflowEnvOptions(ctx: internal_Context): workflowOptions | undefined {
  const options = ctx.Value(workflowEnvOptionsContextKey);
  if (options != null) {
    return options as workflowOptions;
  }
  return undefined;
}

export function setWorkflowEnvOptionsIfNotExist(ctx: internal_Context): internal_Context {
  const options = getWorkflowEnvOptions(ctx);
  const newOptions = options != null
    ? Object.assign(new workflowOptions(), options)
    : new workflowOptions();

  if (options == null) {
    newOptions.signalChannels = {};
    newOptions.queryHandlers = {};
  }

  if (newOptions.dataConverter == null) {
    newOptions.dataConverter = getDefaultDataConverter();
  }

  return WithValue(ctx, workflowEnvOptionsContextKey, newOptions);
}

export function getDataConverterFromWorkflowContext(ctx: internal_Context): internal_DataConverter {
  const options = getWorkflowEnvOptions(ctx);
  if (options == null || options.dataConverter == null) {
    return getDefaultDataConverter();
  }
  return options.dataConverter!;
}

export function getRegistryFromWorkflowContext(ctx: internal_Context): registry {
  const env = getWorkflowEnvironment(ctx);
  return env.GetRegistry();
}

export function getContextPropagatorsFromWorkflowContext(ctx: internal_Context): internal_ContextPropagator[] {
  const options = getWorkflowEnvOptions(ctx);
  return options!.contextPropagators;
}

export function getHeadersFromContext(ctx: internal_Context): shared_IHeader {
    const header: shared_IHeader = {
        fields: new Map<string, Buffer>(),
    };
    const contextPropagators = getContextPropagatorsFromWorkflowContext(ctx);
    for (const ctxProp of contextPropagators) {
        ctxProp.InjectFromWorkflow(ctx, NewHeaderWriter(header));
    }
    return header;
}

/**
 * GetUnhandledSignalNames returns signal names that have  unconsumed signals.
 */
export function GetUnhandledSignalNames(ctx: internal_Context): string[] {
  return getWorkflowEnvOptions(ctx)!.getUnhandledSignalNames();
}

/**
 * newDecodeFuture creates a new future as well as associated Settable that is used to set its value.
 * fn - the decoded value needs to be validated against a function.
 */
export function newDecodeFuture(ctx: internal_Context, fn: unknown): [internal_Future, internal_Settable] {
  const base = new futureImpl({
    channel: NewChannel(ctx) as channelImpl,
    chained: [],
    ready: false,
  });
  const impl = new decodeFutureImpl({ ...base, fn });
  return [impl, impl];
}

/**
 * setQueryHandler sets query handler for given queryType.
 */
export async function setQueryHandler(ctx: internal_Context, queryType: string, handler: unknown): Promise<void> {
  const qh = new queryHandler({
    fn: handler,
    queryType,
    dataConverter: getDataConverterFromWorkflowContext(ctx),
  });
  qh.validateHandlerFn();

  getWorkflowEnvOptions(ctx)!.queryHandlers[queryType] = qh.execute.bind(qh);
}

/**
 * executeDispatcher executed coroutines in the calling thread and calls workflow completion callbacks
 * if root workflow function returned
 */
export async function executeDispatcher(ctx: internal_Context, dispatcher: dispatcher): Promise<void> {
  const env = getWorkflowEnvironment(ctx);
  try {
    await dispatcher.ExecuteUntilAllBlocked();
  } catch (panicErr) {
    if (!(panicErr instanceof Error)) throw panicErr;
    try {
      await env.Complete(Buffer.alloc(0), panicErr);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
    }
    return;
  }

  const rp = getWorkflowResultPointerPointer(ctx).value;
  if (rp == null) {
    return;
  }

  const us = getWorkflowEnvOptions(ctx)!.getUnhandledSignalNames();
  if (us.length > 0) {
    env.GetLogger().info("Workflow has unhandled signals", { SignalNames: us });
    env.GetMetricsScope().Counter(UnhandledSignalsCounter).Inc(1);
  }

  try {
    await env.Complete(rp.workflowResult ?? Buffer.alloc(0), rp.error ?? null);
  } catch (err) {
    if (!(err instanceof Error)) throw err;
  }
}

export function getState(ctx: internal_Context): coroutineState {
  const s = ctx.Value(coroutinesContextKey);
  if (s == null) {
    throw "getState: not workflow context";
  }
  const state = s as coroutineState;
  if (state.dispatcher!.closed) {
    throw null;
  }
  if (!state.dispatcher!.executing) {
    throw panicIllegalAccessCoroutinueState;
  }
  return state;
}

export const coroutinesContextKey = "coroutines";

export const defaultSignalChannelSize = 100000;

/**
 * For troubleshooting stack pretty printing only.
 * Set to true to see full stack trace that includes framework methods.
 */
export const disableCleanStackTraces = false;

export const localActivityFnContextKey = "localActivityFn";

export const panicIllegalAccessCoroutinueState = "getState: illegal access from outside of workflow context";

export const workflowEnvInterceptorContextKey = "envInterceptor";

export const workflowEnvOptionsContextKey = "wfEnvOptions";

export const workflowEnvironmentContextKey = "workflowEnv";

export const workflowInterceptorsContextKey = "workflowInterceptor";

export const workflowResultContextKey = "workflowResult";

export let stackBuf = Buffer.alloc(0);
