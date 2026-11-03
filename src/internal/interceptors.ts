// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { internal_Context } from './context.js';
import { internal_Value } from './encoded.js';
import { WorkflowInfo, internal_Channel, internal_ChildWorkflowFuture, internal_Future, internal_GetVersionOption, internal_Version } from './workflow.js';
import type { Scope } from './runtime/tally.js';
import { Logger } from 'winston';

export interface internal_WorkflowInterceptor {
  ExecuteWorkflow(ctx: internal_Context, workflowType: string, ...args: unknown[]): Promise<unknown[]>;
  ExecuteActivity(ctx: internal_Context, activityType: string, ...args: unknown[]): Promise<internal_Future>;
  ExecuteLocalActivity(ctx: internal_Context, activityType: string, ...args: unknown[]): Promise<internal_Future>;
  ExecuteChildWorkflow(ctx: internal_Context, childWorkflowType: string, ...args: unknown[]): Promise<internal_ChildWorkflowFuture>;
  GetWorkflowInfo(ctx: internal_Context): WorkflowInfo;
  GetLogger(ctx: internal_Context): Logger;
  GetMetricsScope(ctx: internal_Context): Scope;
  Now(ctx: internal_Context): number;
  NewTimer(ctx: internal_Context, d: number): internal_Future;
  Sleep(ctx: internal_Context, d: number): Promise<void>;
  RequestCancelExternalWorkflow(ctx: internal_Context, workflowID: string, runID: string): Promise<internal_Future>;
  SignalExternalWorkflow(ctx: internal_Context, workflowID: string, runID: string, signalName: string, arg: unknown): internal_Future;
  UpsertSearchAttributes(ctx: internal_Context, attributes: Record<string, unknown>): Promise<void>;
  GetSignalChannel(ctx: internal_Context, signalName: string): internal_Channel;
  SideEffect(ctx: internal_Context, f: (p0: internal_Context) => unknown | Promise<unknown>): Promise<internal_Value>;
  MutableSideEffect(ctx: internal_Context, id: string, f: (p0: internal_Context) => unknown | Promise<unknown>, equals: (p0: unknown, p1: unknown) => boolean): internal_Value;
  GetVersion(ctx: internal_Context, changeID: string, minSupported: internal_Version, maxSupported: internal_Version, ...opts: internal_GetVersionOption[]): Promise<internal_Version>;
  SetQueryHandler(ctx: internal_Context, queryType: string, handler: unknown): Promise<void>;
  IsReplaying(ctx: internal_Context): boolean;
  HasLastCompletionResult(ctx: internal_Context): boolean;
  GetLastCompletionResult(ctx: internal_Context, ...d: unknown[]): void;
}

export interface internal_WorkflowInterceptorFactory {
  NewInterceptor(info: WorkflowInfo, next: internal_WorkflowInterceptor): internal_WorkflowInterceptor;
}

/**
 * WorkflowInterceptorBase is a helper type that can simplify creation of WorkflowInterceptorChainFactories
 */
export class internal_WorkflowInterceptorBase implements internal_WorkflowInterceptor {
  constructor(init?: Partial<internal_WorkflowInterceptorBase>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  Next?: internal_WorkflowInterceptor;

  async ExecuteWorkflow(ctx: internal_Context, workflowType: string, ...args: unknown[]): Promise<unknown[]> {
    return this.Next!.ExecuteWorkflow(ctx, workflowType, ...args);
  }

  async ExecuteActivity(ctx: internal_Context, activityType: string, ...args: unknown[]): Promise<internal_Future> {
    return this.Next!.ExecuteActivity(ctx, activityType, ...args);
  }

  async ExecuteLocalActivity(ctx: internal_Context, activityType: string, ...args: unknown[]): Promise<internal_Future> {
    return this.Next!.ExecuteLocalActivity(ctx, activityType, ...args);
  }

  async ExecuteChildWorkflow(ctx: internal_Context, childWorkflowType: string, ...args: unknown[]): Promise<internal_ChildWorkflowFuture> {
    return this.Next!.ExecuteChildWorkflow(ctx, childWorkflowType, ...args);
  }

  GetWorkflowInfo(ctx: internal_Context): WorkflowInfo {
    return this.Next!.GetWorkflowInfo(ctx);
  }

  GetLogger(ctx: internal_Context): Logger {
    return this.Next!.GetLogger(ctx);
  }

  GetMetricsScope(ctx: internal_Context): Scope {
    return this.Next!.GetMetricsScope(ctx);
  }

  Now(ctx: internal_Context): number {
    return this.Next!.Now(ctx);
  }

  NewTimer(ctx: internal_Context, d: number): internal_Future {
    return this.Next!.NewTimer(ctx, d);
  }

  async Sleep(ctx: internal_Context, d: number): Promise<void> {
    return this.Next!.Sleep(ctx, d);
  }

  async RequestCancelExternalWorkflow(ctx: internal_Context, workflowID: string, runID: string): Promise<internal_Future> {
    return this.Next!.RequestCancelExternalWorkflow(ctx, workflowID, runID);
  }

  SignalExternalWorkflow(ctx: internal_Context, workflowID: string, runID: string, signalName: string, arg: unknown): internal_Future {
    return this.Next!.SignalExternalWorkflow(ctx, workflowID, runID, signalName, arg);
  }

  async UpsertSearchAttributes(ctx: internal_Context, attributes: Record<string, unknown>): Promise<void> {
    return this.Next!.UpsertSearchAttributes(ctx, attributes);
  }

  GetSignalChannel(ctx: internal_Context, signalName: string): internal_Channel {
    return this.Next!.GetSignalChannel(ctx, signalName);
  }

  async SideEffect(ctx: internal_Context, f: (p0: internal_Context) => unknown | Promise<unknown>): Promise<internal_Value> {
    return this.Next!.SideEffect(ctx, f);
  }

  MutableSideEffect(ctx: internal_Context, id: string, f: (p0: internal_Context) => unknown | Promise<unknown>, equals: (p0: unknown, p1: unknown) => boolean): internal_Value {
    return this.Next!.MutableSideEffect(ctx, id, f, equals);
  }

  async GetVersion(ctx: internal_Context, changeID: string, minSupported: internal_Version, maxSupported: internal_Version, ...opts: internal_GetVersionOption[]): Promise<internal_Version> {
    return this.Next!.GetVersion(ctx, changeID, minSupported, maxSupported, ...opts);
  }

  async SetQueryHandler(ctx: internal_Context, queryType: string, handler: unknown): Promise<void> {
    return this.Next!.SetQueryHandler(ctx, queryType, handler);
  }

  IsReplaying(ctx: internal_Context): boolean {
    return this.Next!.IsReplaying(ctx);
  }

  HasLastCompletionResult(ctx: internal_Context): boolean {
    return this.Next!.HasLastCompletionResult(ctx);
  }

  GetLastCompletionResult(ctx: internal_Context, ...d: unknown[]): void {
      this.Next!.GetLastCompletionResult(ctx, ...d);
  }

}
