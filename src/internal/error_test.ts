import { ScheduleActivityTaskDecisionAttributes as shared_ScheduleActivityTaskDecisionAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/ScheduleActivityTaskDecisionAttributes.js';
import { ActivityTaskTimedOutEventAttributes as shared_ActivityTaskTimedOutEventAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/ActivityTaskTimedOutEventAttributes.js';
import { Int64 } from '@creditkarma/thrift-server-core';
import { Header as shared_Header } from '../generated/thrift/cadence-idl/com/uber/cadence/Header.js';
import { newTestWorkflowEnv } from './test_helpers_test.js';
import { getDefaultDataConverter } from './encoded.js';
import { newDecisionsHelper, decisionStateInitiated } from './internal_decision_state_machine.js';
import { scheduledSignal, workflowEnvironmentImpl, workflowExecutionEventHandlerImpl, scheduledActivity } from './internal_event_handlers.js';
import { createTestEventSignalExternalWorkflowExecutionFailed, createTestEventActivityTaskTimedOut } from './internal_task_handlers_test.js';
import { SignalExternalWorkflowExecutionDecisionAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/SignalExternalWorkflowExecutionDecisionAttributes.js';
import { SignalExternalWorkflowExecutionFailedCause } from '../generated/thrift/cadence-idl/com/uber/cadence/SignalExternalWorkflowExecutionFailedCause.js';
import { SignalExternalWorkflowExecutionFailedEventAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/SignalExternalWorkflowExecutionFailedEventAttributes.js';
import { StringPtr } from './common/convert.js';
// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { TestActivityEnvironment, WorkflowTestSuite } from './workflow_testsuite.js';
import { expect } from 'vitest';
import { TimeoutType as shared_TimeoutType } from '../generated/thrift/cadence-idl/com/uber/cadence/TimeoutType.js';
import { ErrorDetailsValues, NewContinueAsNewError, internal_ContinueAsNewError, NewCanceledError, internal_CanceledError, ErrNoData, ErrTooManyArg, internal_GenericError, IsCanceledError, NewHeartbeatTimeoutError, NewTimeoutError, NewCustomError, internal_UnknownExternalWorkflowExecutionError, internal_CustomError, internal_TimeoutError } from './error.js';
import { NewStringMapPropagator } from './internal_workflow_client_test.js';
import { internal_Context } from './context.js';
import { NoopLogger } from './runtime/logging.js';

export interface testStruct {
  Name: string;
  Age: number;
}

export interface testStruct2 {
  Name: string;
  Age: number;
  Favorites?: string[];
}

export class testErrorStruct extends globalThis.Error {
  constructor(init?: Partial<testErrorStruct>) {
    super(typeof init?.message === "string" ? init.message : "");
    this.name = "testErrorStruct";
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
    if (typeof init?.message !== "string") {
      this.message = this.Error();
    }
  }

  message: string = "";

  Error(): string {
    return this.message;
  }

}

/**
 * Creates a new workflow environment with the correct logger configured.
 */
export function newTestActivityEnv(): TestActivityEnvironment {
  const s = new WorkflowTestSuite({ ctxProps: [] });
  s.SetLogger(NoopLogger());
  const env = s.NewTestActivityEnvironment();
  return env;
}

export async function Test_GenericError(): Promise<void> {
  const errorActivityFn = (): void => {
    throw new Error("error:foo");
  };
  const env = newTestActivityEnv();
  await env.RegisterActivity(errorActivityFn);

  let activityError: Error | null = null;
  try {
    await env.ExecuteActivity(errorActivityFn);
  } catch (err) {
    if (!(err instanceof Error)) throw err;
    activityError = err;
  }
  expect(activityError).not.toBeNull();
  expect(activityError).toEqual(
    new internal_GenericError({ err: "error:foo" }),
  );

  const errorWorkflowFn = (_ctx: internal_Context): void => {
    throw new Error("error:foo");
  };
  const workflowEnv = newTestWorkflowEnv();
  await workflowEnv.RegisterWorkflow(errorWorkflowFn);

  try {
    await workflowEnv.ExecuteWorkflow(errorWorkflowFn);
  } catch (err) {
    if (!(err instanceof Error)) throw err;
  }
  const workflowError = workflowEnv.GetWorkflowError();
  expect(workflowError).not.toBeNull();
  expect(workflowError).toEqual(
    new internal_GenericError({ err: "error:foo" }),
  );
}

export async function Test_ActivityNotRegistered(): Promise<void> {
  const [registeredActivityFn, unregisteredActivitFn] = [
    "RegisteredActivity",
    "UnregisteredActivityFn",
  ];
  const env = newTestActivityEnv();

  await env.RegisterActivityWithOptions(
    () => {},
    {
      Name: registeredActivityFn,
      DisableAlreadyRegisteredCheck: false,
      EnableAutoHeartbeat: false,
      EnableShortName: false,
    },
  );

  let err: Error | null = null;
  try {
    await env.ExecuteActivity(unregisteredActivitFn);
  } catch (caught) {
    if (!(caught instanceof Error)) throw caught;
    err = caught;
  }

  expect(err).not.toBeNull();
  if (err !== null) {
    expect(err.message).toContain(
      `unable to find activityType=${unregisteredActivitFn}`,
    );
    expect(err.message).toContain(registeredActivityFn);
  }
}

export function Test_TimeoutError(): void {
    const timeoutErr = NewTimeoutError(shared_TimeoutType.SCHEDULE_TO_START);
    expect(timeoutErr.HasDetails()).toBe(false);

    const data = { value: '' };
    let detailsError: unknown;
    try {
        timeoutErr.Details(data);
    } catch (err) {
        if (!(err instanceof Error)) throw err;
        detailsError = err;
    }
    expect(detailsError).toBe(ErrNoData);

    const heartbeatErr = NewHeartbeatTimeoutError(testErrorDetails1);
    expect(heartbeatErr.HasDetails()).toBe(true);
    heartbeatErr.Details(data);
    expect(data.value).toEqual(testErrorDetails1);
}

export async function Test_TimeoutError_WithDetails(): Promise<void> {
    await testTimeoutErrorDetails(shared_TimeoutType.HEARTBEAT);
    await testTimeoutErrorDetails(shared_TimeoutType.SCHEDULE_TO_CLOSE);
    await testTimeoutErrorDetails(shared_TimeoutType.START_TO_CLOSE);
}

export async function testTimeoutErrorDetails(timeoutType: shared_TimeoutType): Promise<void> {
    const contextDecisionsHelper = await newDecisionsHelper();
    const context = new workflowEnvironmentImpl({
        decisionsHelper: contextDecisionsHelper,
        dataConverter: getDefaultDataConverter(),
        changeVersions: {},
        contextPropagators: [],
        counterID: 0,
        currentLocalTime: 0,
        currentReplayTime: 0,
        enableLoggingInReplay: false,
        featureFlags: {
            WorkflowExecutionAlreadyCompletedErrorEnabled: false,
            AutoforwardingEnabled: false,
            PollerAutoScalerEnabled: false,
            EphemeralTaskListsEnabled: false,
            MetricEmitMode: 0,
        },
        isReplay: false,
        mutableSideEffect: {},
        openSessions: {},
        pendingLaTasks: {},
        sideEffectResult: {},
        unstartedLaTasks: {},
        workflowInterceptorFactories: [],
    });

    const h = await newDecisionsHelper();
    let actualErr: Error | null = null;
    const activityID = "activityID";

    context.decisionsHelper!.scheduledEventIDToActivityID[5] = activityID;

    const di = h.newActivityDecisionStateMachine(
        new shared_ScheduleActivityTaskDecisionAttributes({
            activityId: StringPtr(activityID)!,
        }),
    );
    di.state = decisionStateInitiated;
    di.setData(
        new scheduledActivity({
            callback: (_r, e) => {
                actualErr = e;
            },
            handled: false,
            waitForCancelRequest: false,
        }),
    );

    context.decisionsHelper!.addDecision(di);

    const encodedDetails1 = context.dataConverter!.ToData(testErrorDetails1);
    const event = createTestEventActivityTaskTimedOut(
        7,
        new shared_ActivityTaskTimedOutEventAttributes({
            details: encodedDetails1,
            scheduledEventId: new Int64(5),
            startedEventId: new Int64(6),
            timeoutType,
        }),
    );

    const weh = new workflowExecutionEventHandlerImpl(context);
    weh.handleActivityTaskTimedOut(event);

    expect(actualErr instanceof internal_TimeoutError).toBe(true);
    const err = actualErr as internal_TimeoutError;
    expect(err.HasDetails()).toBe(true);

    const data = { value: "" };
    err.Details(data);
    expect(data.value).toEqual(testErrorDetails1);
}

export async function Test_CustomError(): Promise<void> {
  let a1 = { value: "" };
  let a2 = { value: 0 };
  let a3 = { value: { Name: "", Age: 0 } };
  let err0 = NewCustomError(customErrReasonA, testErrorDetails1);
  expect(err0.HasDetails()).toBe(true);
  err0.Details(a1);
  expect(a1.value).toEqual(testErrorDetails1);
  a1.value = "";
  err0 = NewCustomError(customErrReasonA, testErrorDetails1, testErrorDetails2, testErrorDetails3);
  expect(err0.HasDetails()).toBe(true);
  err0.Details(a1, a2, a3);
  expect(a1.value).toEqual(testErrorDetails1);
  expect(a2.value).toEqual(testErrorDetails2);
  expect(a3.value).toEqual(testErrorDetails3);

  const errorActivityFn = (): void => {
    throw err0;
  };
  const env = newTestActivityEnv();
  try {
    await env.RegisterActivity(errorActivityFn);
  } catch (e) {
    if (!(e instanceof Error)) throw e;
  }

  let activityErr: Error | null = null;
  try {
    await env.ExecuteActivity(errorActivityFn);
  } catch (e) {
    if (!(e instanceof Error)) throw e;
    activityErr = e;
  }
  expect(activityErr).not.toBeNull();
  expect(activityErr instanceof internal_CustomError).toBe(true);
  const err1 = activityErr as internal_CustomError;
  expect(err1.HasDetails()).toBe(true);
  let b1 = { value: "" };
  let b2 = { value: 0 };
  let b3 = { value: { Name: "", Age: 0 } };
  err1.Details(b1, b2, b3);
  expect(b1.value).toEqual(testErrorDetails1);
  expect(b2.value).toEqual(testErrorDetails2);
  expect(b3.value).toEqual(testErrorDetails3);

  expect(() => NewCustomError("cadenceInternal:testReason")).toThrow();
  const newReason = "another reason";
  const err2 = NewCustomError(newReason);
  expect(!err2.HasDetails()).toBe(true);
  let detailsError: unknown;
  try {
    err2.Details();
  } catch (e) {
    detailsError = e;
  }
  expect(detailsError).toBe(ErrNoData);
  expect(err2.Reason()).toEqual(newReason);
  const err3 = NewCustomError(newReason, undefined);
  expect(err3.HasDetails()).toBe(true);

  const errorWorkflowFn = (ctx: internal_Context): void => {
    throw err0;
  };
  const wfEnv = newTestWorkflowEnv();
  try {
    await wfEnv.RegisterWorkflow(errorWorkflowFn);
  } catch (e) {
    if (!(e instanceof Error)) throw e;
  }
  try {
    await wfEnv.ExecuteWorkflow(errorWorkflowFn);
  } catch (e) {
    if (!(e instanceof Error)) throw e;
  }
  const workflowErr = wfEnv.GetWorkflowError();
  expect(workflowErr).not.toBeNull();
  expect(workflowErr instanceof internal_CustomError).toBe(true);
  const err4 = workflowErr as internal_CustomError;
  expect(err4.HasDetails()).toBe(true);
  err4.Details(b1, b2, b3);
  expect(b1.value).toEqual(testErrorDetails1);
  expect(b2.value).toEqual(testErrorDetails2);
  expect(b3.value).toEqual(testErrorDetails3);
}

export async function Test_CustomError_Pointer(): Promise<void> {
  const a1 = {
    value: { Age: 0, Name: "", Favorites: undefined }
  };
  const err1 = NewCustomError(customErrReasonA, testErrorDetails4);
  expect(err1.HasDetails()).toBe(true);
  err1.Details(a1);
  expect(a1.value).toEqual(testErrorDetails4);

  const a2 = {
    value: { Age: 0, Name: "", Favorites: undefined }
  };
  const err2 = NewCustomError(customErrReasonA, testErrorDetails4);
  expect(err2.HasDetails()).toBe(true);
  err2.Details(a2);
  expect(a2.value).toEqual(testErrorDetails4);

  const errorActivityFn = (): void => {
    throw err1;
  };
  const env = newTestActivityEnv();
  try {
    await env.RegisterActivity(errorActivityFn);
  } catch (e) {
    if (!(e instanceof Error)) throw e;
  }

  let err: Error | null = null;
  try {
    await env.ExecuteActivity(errorActivityFn);
  } catch (e) {
    if (!(e instanceof Error)) throw e;
    err = e;
  }
  expect(err).not.toBeNull();
  expect(err instanceof internal_CustomError).toBe(true);
  const err3 = err as internal_CustomError;
  expect(err3.HasDetails()).toBe(true);
  const b1 = {
    value: { Age: 0, Name: "", Favorites: undefined }
  };
  err3.Details(b1);
  expect(b1.value).toEqual(testErrorDetails4);

  const errorActivityFn2 = (): void => {
    throw err2;
  };
  try {
    await env.RegisterActivity(errorActivityFn2);
  } catch (e) {
    if (!(e instanceof Error)) throw e;
  }

  err = null;
  try {
    await env.ExecuteActivity(errorActivityFn2);
  } catch (e) {
    if (!(e instanceof Error)) throw e;
    err = e;
  }
  expect(err).not.toBeNull();
  expect(err instanceof internal_CustomError).toBe(true);
  const err4 = err as internal_CustomError;
  expect(err4.HasDetails()).toBe(true);
  const b2 = {
    value: { Age: 0, Name: "", Favorites: undefined }
  };
  err4.Details(b2);
  expect(b2.value).toEqual(testErrorDetails4);

  const errorWorkflowFn = (ctx: internal_Context): void => {
    throw err1;
  };
  const wfEnv = newTestWorkflowEnv();
  try {
    await wfEnv.RegisterWorkflow(errorWorkflowFn);
  } catch (e) {
    if (!(e instanceof Error)) throw e;
  }
  try {
    await wfEnv.ExecuteWorkflow(errorWorkflowFn);
  } catch (e) {
    if (!(e instanceof Error)) throw e;
  }
  err = wfEnv.GetWorkflowError();
  expect(err).not.toBeNull();
  expect(err instanceof internal_CustomError).toBe(true);
  const err5 = err as internal_CustomError;
  expect(err5.HasDetails()).toBe(true);
  err5.Details(b1);
  err5.Details(b1);
  expect(b1.value).toEqual(testErrorDetails4);

  const errorWorkflowFn2 = (ctx: internal_Context): void => {
    throw err2;
  };
  const wfEnv2 = newTestWorkflowEnv();
  try {
    await wfEnv2.RegisterWorkflow(errorWorkflowFn2);
  } catch (e) {
    if (!(e instanceof Error)) throw e;
  }
  try {
    await wfEnv2.ExecuteWorkflow(errorWorkflowFn2);
  } catch (e) {
    if (!(e instanceof Error)) throw e;
  }
  err = wfEnv2.GetWorkflowError();
  expect(err).not.toBeNull();
  expect(err instanceof internal_CustomError).toBe(true);
  const err6 = err as internal_CustomError;
  expect(err6.HasDetails()).toBe(true);
  err6.Details(b2);
  err6.Details(b2);
  expect(b2.value).toEqual(testErrorDetails4);
}

export function Test_CustomError_WrongDecodedType(): void {
  const err = NewCustomError("reason", testErrorDetails1, testErrorDetails2);
  const d1 = { value: "" };
  const d2 = { value: "" };
  expect(() => err.Details(d1, d2)).toThrow();

  const err2 = NewCustomError("reason", testErrorDetails3);
  const d3 = { value: { Name: "", Age: 0, Favorites: undefined } };
  expect(() => err2.Details(d3)).toThrow();
}

export async function Test_CanceledError(): Promise<void> {
  let a1 = { value: "" };
  let a2 = { value: 0 };
  let a3 = { value: { Name: "", Age: 0 } };

  let err0 = NewCanceledError(testErrorDetails1);
  expect(err0.HasDetails()).toBe(true);
  err0.Details(a1);
  expect(a1.value).toEqual(testErrorDetails1);

  a1.value = "";
  err0 = NewCanceledError(testErrorDetails1, testErrorDetails2, testErrorDetails3);
  expect(err0.HasDetails()).toBe(true);
  err0.Details(a1, a2, a3);
  expect(a1.value).toEqual(testErrorDetails1);
  expect(a2.value).toEqual(testErrorDetails2);
  expect(a3.value).toEqual(testErrorDetails3);

  const errorActivityFn = (): void => {
    throw err0;
  };
  const env = newTestActivityEnv();
  await env.RegisterActivity(errorActivityFn);

  let err: Error | null = null;
  try {
    await env.ExecuteActivity(errorActivityFn);
  } catch (e) {
    if (!(e instanceof Error)) throw e;
    err = e;
  }

  expect(err).not.toBeNull();
  expect(err instanceof internal_CanceledError).toBe(true);

  const err1 = err as internal_CanceledError;
  expect(err1.HasDetails()).toBe(true);

  let b1 = { value: "" };
  let b2 = { value: 0 };
  let b3 = { value: { Name: "", Age: 0 } };
  err1.Details(b1, b2, b3);
  expect(b1.value).toEqual(testErrorDetails1);
  expect(b2.value).toEqual(testErrorDetails2);
  expect(b3.value).toEqual(testErrorDetails3);

  const err2 = NewCanceledError();
  expect(err2.HasDetails()).toBe(false);

  const errorWorkflowFn = (ctx: internal_Context): void => {
    throw err0;
  };
  const wfEnv = newTestWorkflowEnv();
  await wfEnv.RegisterWorkflow(errorWorkflowFn);
  await wfEnv.ExecuteWorkflow(errorWorkflowFn);

  err = wfEnv.GetWorkflowError();
  expect(err).not.toBeNull();

  const err3 = err as internal_CanceledError;
  expect(err3 instanceof internal_CanceledError).toBe(true);
  expect(err3.HasDetails()).toBe(true);
  err3.Details(b1, b2, b3);
  expect(b1.value).toEqual(testErrorDetails1);
  expect(b2.value).toEqual(testErrorDetails2);
  expect(b3.value).toEqual(testErrorDetails3);
}

export function Test_IsCanceledError(): void {
  const tests: { name: string; err: Error | null; expected: boolean }[] = [
    {
      name: "empty detail",
      err: NewCanceledError(),
      expected: true,
    },
    {
      name: "with detail",
      err: NewCanceledError("details"),
      expected: true,
    },
    {
      name: "not canceled error",
      err: new Error("details"),
      expected: false,
    },
  ];

  for (const test of tests) {
    expect(IsCanceledError(test.err)).toEqual(test.expected);
  }
}

export function TestErrorDetailsValues(): void {
  let e = new ErrorDetailsValues([]);

  expect(() => e.Get()).toThrow(ErrNoData);

  e = new ErrorDetailsValues([testErrorDetails1, testErrorDetails2, testErrorDetails3]);

  const a1Box: { value: string } = { value: "" };
  const a2Box: { value: number } = { value: 0 };
  const a3Box: { value: testStruct } = { value: { Name: "", Age: 0 } };

  expect(e.HasValues()).toBe(true);

  e.Get(a1Box);
  expect(a1Box.value).toEqual(testErrorDetails1);

  e.Get(a1Box, a2Box, a3Box);
  expect(a1Box.value).toEqual(testErrorDetails1);
  expect(a2Box.value).toEqual(testErrorDetails2);
  expect(a3Box.value).toEqual(testErrorDetails3);

  expect(() => e.Get(a1Box, a2Box, a3Box, a3Box)).toThrow(ErrTooManyArg);
}

export function TestErrorDetailsValues_WrongDecodedType(): void {
    const e = new ErrorDetailsValues([testErrorDetails1]);
    const d1 = { value: 0 };
    expect(() => e.Get(d1)).toThrow();
}

export function TestErrorDetailsValues_AssignableType(): void {
  const e = new ErrorDetailsValues([new testErrorStruct({ message: "my message" })]);
  const errorOut: { value: Error | null } = { value: null };
  e.Get(errorOut);
  expect(errorOut.value).not.toBeNull();
  expect(errorOut.value?.message).toEqual("my message");
}

export async function Test_SignalExternalWorkflowExecutionFailedError(): Promise<void> {
  const context = new workflowEnvironmentImpl({
    changeVersions: {},
    contextPropagators: [],
    counterID: 0,
    currentLocalTime: 0,
    currentReplayTime: 0,
    enableLoggingInReplay: false,
    featureFlags: {
      WorkflowExecutionAlreadyCompletedErrorEnabled: false,
      AutoforwardingEnabled: false,
      PollerAutoScalerEnabled: false,
      EphemeralTaskListsEnabled: false,
      MetricEmitMode: 0,
    },
    isReplay: false,
    mutableSideEffect: {},
    openSessions: {},
    pendingLaTasks: {},
    sideEffectResult: {},
    unstartedLaTasks: {},
    workflowInterceptorFactories: [],
    decisionsHelper: await newDecisionsHelper(),
    dataConverter: getDefaultDataConverter(),
  });
  const h = await newDecisionsHelper();
  let actualErr: Error | null = null;
  const initiatedEventID = 101;
  const signalID = "signalID";

  context.decisionsHelper!.scheduledEventIDToSignalID[initiatedEventID] = signalID;
  const di = h.newSignalExternalWorkflowStateMachine(
    new SignalExternalWorkflowExecutionDecisionAttributes({}),
    signalID,
  );
  di.state = decisionStateInitiated;
  di.setData(
    new scheduledSignal({
      callback: (r, e) => {
        actualErr = e;
      },
      handled: false,
    }),
  );
  context.decisionsHelper!.addDecision(di);

  const weh = new workflowExecutionEventHandlerImpl({
    ...context,
  });
  const event = createTestEventSignalExternalWorkflowExecutionFailed(
    1,
    new SignalExternalWorkflowExecutionFailedEventAttributes({
      initiatedEventId: new Int64(initiatedEventID),
      cause:
        SignalExternalWorkflowExecutionFailedCause.UNKNOWN_EXTERNAL_WORKFLOW_EXECUTION,
    }),
  );
  weh.handleSignalExternalWorkflowExecutionFailed(event);
  expect(actualErr instanceof internal_UnknownExternalWorkflowExecutionError).toBe(true);
}

export async function Test_ContinueAsNewError(): Promise<void> {
  const a1 = 1234;
  const a2 = "some random input";

  const continueAsNewWfName = "continueAsNewWorkflowFn";
  const continueAsNewWorkflowFn = async (
    ctx: internal_Context,
    testInt: number,
    testString: string,
  ): Promise<void> => {
    throw await NewContinueAsNewError(ctx, continueAsNewWfName, a1, a2);
  };

  const header = new shared_Header({
    fields: new Map([["test", Buffer.from("test-data")]]),
  });

  const ctxProps = [await NewStringMapPropagator(["test"])];
  const s = new WorkflowTestSuite({
    header,
    ctxProps,
  });
  s.SetLogger(NoopLogger());

  const wfEnv = s.NewTestWorkflowEnvironment();
  wfEnv.Test(undefined);
  await wfEnv.RegisterWorkflowWithOptions(
    continueAsNewWorkflowFn,
    {
      Name: continueAsNewWfName,
      EnableShortName: false,
      DisableAlreadyRegisteredCheck: false,
    },
  );
  await wfEnv.ExecuteWorkflow(continueAsNewWorkflowFn, 101, "another random string");

  const err = wfEnv.GetWorkflowError();

  expect(err).not.toBeNull();
  const continueAsNewErr = err as internal_ContinueAsNewError;
  expect(continueAsNewErr instanceof internal_ContinueAsNewError).toBe(true);
  expect(continueAsNewErr.WorkflowType().Name).toEqual(continueAsNewWfName);

  const args = continueAsNewErr.Args();
  expect(typeof args[0] === "number").toBe(true);
  const intArg = args[0] as number;
  expect(intArg).toEqual(a1);

  expect(typeof args[1] === "string").toBe(true);
  const stringArg = args[1] as string;
  expect(stringArg).toEqual(a2);

  expect(continueAsNewErr.params!.header).toEqual(header);
}

/**
 * assume this is some error reason defined by activity implementation.
 */
export const customErrReasonA = "CustomReasonA";

export let testErrorDetails1 = "my details";

export let testErrorDetails2 = 123;

export let testErrorDetails3 = { Name: "a string", Age: 321 };

export let testErrorDetails4 = { Name: "a string", Age: 321, Favorites: ["eat", "code"] };
