// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { RegisterActivityOptions, RegistryActivityInfo, cadence_internal_ActivityInfo } from './activity.js';
import { internal_Context } from './context.js';
import { internal_DataConverter, internal_Value, internal_Values, getDefaultDataConverter } from './encoded.js';
import { internal_ContextPropagator } from './headers.js';
import { testWorkflowEnvironmentImpl, newTestWorkflowEnvironmentImpl, getMockMethodForGetVersion } from './internal_workflow_testsuite.js';
import { WorkerOptions, internal_ActivityRegistry, internal_Registry, internal_WorkflowRegistry } from './worker.js';
import { RegisterWorkflowOptions, RegistryWorkflowInfo, WorkflowInfo, internal_Version } from './workflow.js';
import { Channel } from './runtime/channel.js';
import { Context } from './runtime/context.js';
import type { Scope } from './runtime/tally.js';
import { GoMockCall, GoTestifyMock } from './runtime/testify_mock.js';
import { IHeader as shared_IHeader } from '../generated/thrift/cadence-idl/com/uber/cadence/Header.js';
import { getActivityFunctionName, validateFnFormat, getWorkflowFunctionName } from './internal_worker.js';
import { activity } from './internal_activity.js';
import { workflow } from './internal_workflow.js';
import { ErrNoData } from './error.js';
import { getWorkflowMemo, serializeSearchAttributes } from './internal_workflow_client.js';
import { Logger } from 'winston';

/**
 * EncodedValues is a type alias used to encapsulate/extract encoded arguments from workflow/activity.
 */
export class EncodedValues implements internal_Values {
  constructor(init?: Partial<EncodedValues>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  values?: Buffer;

  dataConverter?: internal_DataConverter;

  Get(...valuePtr: unknown[]): void {
    if (!this.HasValues()) {
      throw ErrNoData;
    }
    this.dataConverter!.FromData(this.values!, ...valuePtr);
  }

  HasValues(): boolean {
    return this.values != null;
  }

}

/**
 * WorkflowTestSuite is the test suite to run unit tests for workflow/activity.
 */
export class WorkflowTestSuite {
  constructor(init?: Partial<WorkflowTestSuite>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  logger?: Logger;

  scope?: Scope;

  ctxProps: internal_ContextPropagator[] = [];

  header?: shared_IHeader;

  NewTestWorkflowEnvironment(): TestWorkflowEnvironment {
    return new TestWorkflowEnvironment({
      Mock: new GoTestifyMock(),
      impl: newTestWorkflowEnvironmentImpl(this, undefined),
    });
  }

  NewTestActivityEnvironment(): TestActivityEnvironment {
    return new TestActivityEnvironment({
      impl: newTestWorkflowEnvironmentImpl(this, undefined),
    });
  }

  SetLogger(logger: Logger): void {
    this.logger = logger;
  }

  GetLogger(): Logger {
    return this.logger!;
  }

  SetMetricsScope(scope: Scope): void {
    this.scope = scope;
  }

  SetContextPropagators(ctxProps: internal_ContextPropagator[]): void {
    this.ctxProps = ctxProps;
  }

  SetHeader(header: shared_IHeader): void {
    this.header = header;
  }

}

/**
 * TestWorkflowEnvironment is the environment that you use to test workflow
 */
export class TestWorkflowEnvironment implements internal_ActivityRegistry, internal_Registry, internal_WorkflowRegistry {
  constructor(init?: Partial<TestWorkflowEnvironment>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  Mock: GoTestifyMock = new GoTestifyMock();

  impl?: testWorkflowEnvironmentImpl;

  async RegisterWorkflow(w: unknown): Promise<void> {
    await this.impl!.RegisterWorkflow(w);
  }

  async RegisterWorkflowWithOptions(w: unknown, options: RegisterWorkflowOptions): Promise<void> {
    if (this.Mock.ExpectedCalls.length > 0) {
      throw "RegisterWorkflow calls cannot follow mock related ones like OnWorkflow or similar";
    }
    await this.impl!.RegisterWorkflowWithOptions(w, options);
  }

  async RegisterActivity(a: unknown): Promise<void> {
    await this.impl!.RegisterActivity(a);
  }

  async RegisterActivityWithOptions(a: unknown, options: RegisterActivityOptions): Promise<void> {
    if (this.Mock.ExpectedCalls.length > 0) {
      throw "RegisterActivity calls cannot follow mock related ones like OnActivity or similar";
    }
    await this.impl!.RegisterActivityWithOptions(a, options);
  }

  async GetRegisteredWorkflows(): Promise<RegistryWorkflowInfo[]> {
    return this.impl!.GetRegisteredWorkflows();
  }

  async GetRegisteredActivities(): Promise<RegistryActivityInfo[]> {
    return this.impl!.GetRegisteredActivities();
  }

  SetStartTime(startTime: number): void {
    this.impl!.setStartTime(startTime);
  }

  async OnActivity(activity: unknown, ...args: unknown[]): Promise<MockCallWrapper> {
    let call!: GoMockCall;
    if (typeof activity === 'function') {
      validateFnFormat(activity, false);
      const fnName = await getActivityFunctionName(this.impl!.registry!, activity);
      call = this.Mock.On(fnName, ...args);
    } else if (typeof activity === 'string') {
      call = this.Mock.On(activity as string, ...args);
    } else {
      throw "activity must be function or string";
    }
    return this.wrapCall(call);
  }

  async OnWorkflow(workflow: unknown, ...args: unknown[]): Promise<MockCallWrapper> {
    const fType = workflow;
    let call!: GoMockCall;

    switch (typeof fType) {
      case 'function': {
        validateFnFormat(fType, true);
        let fnName = await getWorkflowFunctionName(this.impl!.registry!, workflow);
        const [alias, ok] = await this.impl!.registry!.getWorkflowAlias(fnName);
        if (ok) {
          fnName = alias;
        }
        call = this.Mock.On(fnName, ...args);
        break;
      }
      case 'string':
        call = this.Mock.On(workflow as string, ...args);
        break;
      default:
        throw 'activity must be function or string';
    }

    return this.wrapCall(call);
  }

  OnSignalExternalWorkflow(domainName: unknown, workflowID: unknown, runID: unknown, signalName: unknown, arg: unknown): MockCallWrapper {
    const call = this.Mock.On(mockMethodForSignalExternalWorkflow, domainName, workflowID, runID, signalName, arg);
    return this.wrapCall(call);
  }

  OnRequestCancelExternalWorkflow(domainName: string, workflowID: string, runID: string): MockCallWrapper {
    const call = this.Mock.On(mockMethodForRequestCancelExternalWorkflow, domainName, workflowID, runID);
    return this.wrapCall(call);
  }

  OnGetVersion(changeID: string, minSupported: internal_Version, maxSupported: internal_Version): MockCallWrapper {
    const call = this.Mock.On(getMockMethodForGetVersion(changeID), changeID, minSupported, maxSupported);
    return this.wrapCall(call);
  }

  OnUpsertSearchAttributes(attributes: Record<string, unknown>): MockCallWrapper {
    const call = this.Mock.On(mockMethodForUpsertSearchAttributes, attributes);
    return this.wrapCall(call);
  }

  wrapCall(call: GoMockCall): MockCallWrapper {
    const callWrapper = new MockCallWrapper({ call, env: this });
    call.Run(this.impl!.getMockRunFn(callWrapper));
    return callWrapper;
  }

  async ExecuteWorkflow(workflowFn: unknown, ...args: unknown[]): Promise<void> {
    this.impl!.testWorkflowEnvironmentShared!.mock = this.Mock;
    await this.impl!.executeWorkflow(workflowFn, ...args);
  }

  Now(): number {
    return this.impl!.Now();
  }

  SetWorkerOptions(options: WorkerOptions): TestWorkflowEnvironment {
    this.impl!.setWorkerOptions(options);
    return this;
  }

  SetWorkerStopChannel(c: Channel<{}>): void {
    this.impl!.setWorkerStopChannel(c);
  }

  SetTestTimeout(idleTimeout: number): TestWorkflowEnvironment {
    this.impl!.testWorkflowEnvironmentShared!.testTimeout = idleTimeout;
    return this;
  }

  SetWorkflowTimeout(executionTimeout: number): TestWorkflowEnvironment {
    this.impl!.executionTimeout = executionTimeout;
    this.impl!.workflowInfo!.ExecutionStartToCloseTimeoutSeconds = Math.trunc(executionTimeout / 1e9);
    return this;
  }

  SetWorkflowCronSchedule(cron: string): TestWorkflowEnvironment {
    this.impl!.setCronSchedule(cron);
    return this;
  }

  SetWorkflowCronMaxIterations(maxIterations: number): TestWorkflowEnvironment {
    this.impl!.setCronMaxIterationas(maxIterations);
    return this;
  }

  SetOnActivityStartedListener(listener: (p0: cadence_internal_ActivityInfo, p1: Context, p2: internal_Values) => void | Promise<void>): TestWorkflowEnvironment {
    this.impl!.testWorkflowEnvironmentShared!.onActivityStartedListener = listener;
    return this;
  }

  SetOnActivityCompletedListener(listener: (p0: cadence_internal_ActivityInfo, p1: internal_Value | undefined, p2: Error | null) => void | Promise<void>): TestWorkflowEnvironment {
    this.impl!.testWorkflowEnvironmentShared!.onActivityCompletedListener = listener;
    return this;
  }

  SetOnActivityCanceledListener(listener: (p0: cadence_internal_ActivityInfo) => void | Promise<void>): TestWorkflowEnvironment {
    this.impl!.testWorkflowEnvironmentShared!.onActivityCanceledListener = listener;
    return this;
  }

  SetOnActivityHeartbeatListener(listener: (p0: cadence_internal_ActivityInfo, p1: internal_Values) => void | Promise<void>): TestWorkflowEnvironment {
    this.impl!.testWorkflowEnvironmentShared!.onActivityHeartbeatListener = listener;
    return this;
  }

  SetOnChildWorkflowStartedListener(listener: (p0: WorkflowInfo, p1: internal_Context, p2: internal_Values) => void | Promise<void>): TestWorkflowEnvironment {
    this.impl!.testWorkflowEnvironmentShared!.onChildWorkflowStartedListener = listener;
    return this;
  }

  SetOnChildWorkflowCompletedListener(listener: (p0: WorkflowInfo, p1: internal_Value, p2: Error | null) => void | Promise<void>): TestWorkflowEnvironment {
    this.impl!.testWorkflowEnvironmentShared!.onChildWorkflowCompletedListener = listener;
    return this;
  }

  SetOnChildWorkflowCanceledListener(listener: (p0: WorkflowInfo) => void | Promise<void>): TestWorkflowEnvironment {
    this.impl!.testWorkflowEnvironmentShared!.onChildWorkflowCanceledListener = listener;
    return this;
  }

  SetOnTimerScheduledListener(listener: (p0: string, p1: number) => void | Promise<void>): TestWorkflowEnvironment {
    this.impl!.testWorkflowEnvironmentShared!.onTimerScheduledListener! = listener;
    return this;
  }

  SetOnTimerFiredListener(listener: (p0: string) => void | Promise<void>): TestWorkflowEnvironment {
    this.impl!.testWorkflowEnvironmentShared!.onTimerFiredListener! = listener;
    return this;
  }

  SetOnTimerCancelledListener(listener: (p0: string) => void | Promise<void>): TestWorkflowEnvironment {
    this.impl!.testWorkflowEnvironmentShared!.onTimerCancelledListener = listener;
    return this;
  }

  SetOnLocalActivityStartedListener(listener: (p0: cadence_internal_ActivityInfo, p1: Context, p2: unknown[]) => void | Promise<void>): TestWorkflowEnvironment {
    this.impl!.testWorkflowEnvironmentShared!.onLocalActivityStartedListener! = listener;
    return this;
  }

  SetOnLocalActivityCompletedListener(listener: (p0: cadence_internal_ActivityInfo, p1: internal_Value | undefined, p2: Error | null) => void | Promise<void>): TestWorkflowEnvironment {
    this.impl!.testWorkflowEnvironmentShared!.onLocalActivityCompletedListener! = listener;
    return this;
  }

  SetOnLocalActivityCanceledListener(listener: (p0: cadence_internal_ActivityInfo) => void | Promise<void>): TestWorkflowEnvironment {
    this.impl!.testWorkflowEnvironmentShared!.onLocalActivityCanceledListener! = listener;
    return this;
  }

  IsWorkflowCompleted(): boolean {
    return this.impl!.isTestCompleted;
  }

  GetWorkflowResult(valuePtr: unknown | undefined): void {
    if (!this.impl!.isTestCompleted) {
      throw "workflow is not completed";
    }
    if (this.impl!.testError != null) {
      throw this.impl!.testError!;
    }
    if (
      this.impl!.testResult == null ||
      this.impl!.testResult!.HasValue() === false ||
      valuePtr == null
    ) {
      return;
    }
    this.impl!.testResult!.Get(valuePtr);
  }

  GetWorkflowError(): Error | null {
    return this.impl!.testError!;
  }

  async CompleteActivity(taskToken: Buffer, result: unknown, err: Error | null): Promise<void> {
    return this.impl!.CompleteActivity(taskToken, result, err);
  }

  async CancelWorkflow(): Promise<void> {
    await this.impl!.cancelWorkflow((_result: Buffer, _err: Error | null) => {});
  }

  SignalWorkflow(name: string, input: unknown): void {
    this.impl!.signalWorkflow(name, input, true);
  }

  SignalWorkflowSkippingDecision(name: string, input: unknown): void {
    this.impl!.signalWorkflow(name, input, false);
  }

  SignalWorkflowByID(workflowID: string, signalName: string, input: unknown): void {
    this.impl!.signalWorkflowByID(workflowID, signalName, input);
  }

  async QueryWorkflow(queryType: string, ...args: unknown[]): Promise<internal_Value> {
    return this.impl!.queryWorkflow(queryType, ...args);
  }

  RegisterDelayedCallback(callback: () => void | Promise<void>, delayDuration: number): void {
    this.impl!.registerDelayedCallback(callback, delayDuration);
  }

  async SetActivityTaskList(tasklist: string, ...activityFn: unknown[]): Promise<void> {
    await this.impl!.setActivityTaskList(tasklist, ...activityFn);
  }

  SetLastCompletionResult(result: unknown): void {
    this.impl!.setLastCompletionResult(result);
  }

  SetMemoOnStart(memo: Record<string, unknown>): void {
    const memoStruct = getWorkflowMemo(memo, this.impl!.GetDataConverter());
    this.impl!.workflowInfo!.Memo = memoStruct;
  }

  SetSearchAttributesOnStart(searchAttributes: Record<string, unknown>): void {
    const attr = serializeSearchAttributes(searchAttributes);
    this.impl!.workflowInfo!.SearchAttributes = attr;
  }

  AssertCalled(t: unknown, methodName: string, ...arguments_: unknown[]): boolean {
    return this.Mock.AssertCalled(t, methodName, ...arguments_);
  }

  AssertExpectations(t: unknown): boolean {
    return this.Mock.AssertExpectations(t);
  }

  AssertNotCalled(t: unknown, methodName: string, ...arguments_: unknown[]): boolean {
    return this.Mock.AssertNotCalled(t, methodName, ...arguments_);
  }

  AssertNumberOfCalls(t: unknown, methodName: string, expectedCalls: number): boolean {
    return this.Mock.AssertNumberOfCalls(t, methodName, expectedCalls);
  }

  Called(...arguments_: unknown[]): unknown[] {
    return this.Mock.Called(...arguments_);
  }

  IsMethodCallable(t: unknown, methodName: string, ...arguments_: unknown[]): boolean {
    return this.Mock.IsMethodCallable(t, methodName, ...arguments_);
  }

  async MethodCalled(methodName: string, ...arguments_: unknown[]): Promise<unknown[]> {
    return this.Mock.MethodCalled(methodName, ...arguments_);
  }

  On(methodName: string, ...arguments_: unknown[]): GoMockCall {
    return this.Mock.On(methodName, ...arguments_);
  }

  String(): string {
    return this.Mock.String();
  }

  Test(t: unknown): void {
    return this.Mock.Test(t);
  }

  TestData(): Record<string, unknown> {
    return this.Mock.TestData();
  }

}

/**
 * TestActivityEnvironment is the environment that you use to test activity
 */
export class TestActivityEnvironment implements internal_ActivityRegistry {
  constructor(init?: Partial<TestActivityEnvironment>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  impl?: testWorkflowEnvironmentImpl;

  async RegisterActivity(a: unknown): Promise<void> {
    await this.impl!.RegisterActivity(a);
  }

  async RegisterActivityWithOptions(a: unknown, options: RegisterActivityOptions): Promise<void> {
    await this.impl!.RegisterActivityWithOptions(a, options);
  }

  async GetRegisteredActivities(): Promise<RegistryActivityInfo[]> {
    return this.impl!.GetRegisteredActivities();
  }

  async ExecuteActivity(activityFn: unknown, ...args: unknown[]): Promise<internal_Value> {
    return this.impl!.executeActivity(activityFn, ...args);
  }

  async ExecuteLocalActivity(activityFn: unknown, ...args: unknown[]): Promise<internal_Value> {
    return this.impl!.executeLocalActivity(activityFn, ...args);
  }

  SetWorkerOptions(options: WorkerOptions): TestActivityEnvironment {
    this.impl!.setWorkerOptions(options);
    return this;
  }

  SetTestTimeout(idleTimeout: number): TestActivityEnvironment {
    this.impl!.testWorkflowEnvironmentShared!.testTimeout = idleTimeout;
    return this;
  }

  SetHeartbeatDetails(details: unknown): void {
    this.impl!.setHeartbeatDetails(details);
  }

  SetWorkerStopChannel(c: Channel<{}>): void {
    this.impl!.setWorkerStopChannel(c);
  }

}

/**
 * MockCallWrapper is a wrapper to mock.Call. It offers the ability to wait on workflow's clock instead of wall clock.
 */
export class MockCallWrapper {
  constructor(init?: Partial<MockCallWrapper>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  call?: GoMockCall;

  env?: TestWorkflowEnvironment;

  runFn?: (p0: unknown[]) => void | Promise<void>;

  waitDuration?: () => number;

  Once(): MockCallWrapper {
    return this.Times(1);
  }

  Twice(): MockCallWrapper {
    return this.Times(2);
  }

  Times(i: number): MockCallWrapper {
    this.call!.Times(i);
    return this;
  }

  Maybe(): MockCallWrapper {
    this.call!.Maybe();
    return this;
  }

  Run(fn: (p0: unknown[]) => void | Promise<void>): MockCallWrapper {
    this.runFn = fn;
    return this;
  }

  After(d: number): MockCallWrapper {
    this.waitDuration = () => d
    return this
  }

  AfterFn(fn: () => number): MockCallWrapper {
    this.waitDuration = fn;
    return this;
  }

  Return(...returnArguments: unknown[]): MockCallWrapper {
    this.call!.Return(...returnArguments);
    return this;
  }

}

export function newEncodedValues(values: Buffer, dc: internal_DataConverter | undefined): EncodedValues {
  if (dc == null) {
    dc = getDefaultDataConverter();
  }
  return new EncodedValues({ values, dataConverter: dc });
}

export const mockMethodForGetVersion = "workflow.GetVersion";

export const mockMethodForRequestCancelExternalWorkflow = "workflow.RequestCancelExternalWorkflow";

export const mockMethodForSignalExternalWorkflow = "workflow.SignalExternalWorkflow";

export const mockMethodForUpsertSearchAttributes = "workflow.UpsertSearchAttributes";

/**
 * ErrMockStartChildWorkflowFailed is special error used to indicate the mocked child workflow should fail to start.
 * This error is also exposed as public as testsuite.ErrMockStartChildWorkflowFailed
 */
export let ErrMockStartChildWorkflowFailed = new Error("start child workflow failed: %v");
