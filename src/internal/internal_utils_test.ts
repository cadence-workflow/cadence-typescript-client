// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { Minute } from './runtime/time.js';
import { expect } from 'vitest';
import { chanTimeout, contextBuilder, defaultRPCTimeout, constructError, featureFlagsHeader, internal_FeatureFlags, getErrorDetails, fromInternalFeatureFlags } from './internal_utils.js';
import { getDefaultDataConverter } from './encoded.js';
import { TimeoutType } from '../generated/thrift/cadence-idl/com/uber/cadence/TimeoutType.js';
import { errReasonTimeout, internal_TimeoutError, NewCanceledError, errReasonCanceled, NewTimeoutError, NewCustomError } from './error.js';
import { testErrorDetails1, testErrorDetails4, testStruct, customErrReasonA } from './error_test.js';
import { encodeArgs, encodeArg } from './internal_worker.js';
import { newEncodedValues, EncodedValues } from './workflow_testsuite.js';
import { NewValues, NewValue } from './client.js';

export function TestChannelBuilderOptions(): void {
  const builder = new contextBuilder({ Timeout: defaultRPCTimeout });

  const opt1 = chanTimeout(Minute);
  opt1(builder);

  expect(builder.Timeout).toEqual(Minute);
}

export function TestNewValues(): void {
  const heartbeatDetail = "status-report-to-workflow";
  const heartbeatDetail2 = 1;
  const heartbeatDetail3: testStruct = {
    Name: heartbeatDetail,
    Age: heartbeatDetail2,
  };
  const details: unknown[] = [heartbeatDetail, heartbeatDetail2, heartbeatDetail3];
  const data = encodeArgs(undefined, details);
  const res = { value: "" };
  const res2 = { value: 0 };
  const res3 = { value: { Name: "", Age: 0 } };
  NewValues(data).Get(res, res2, res3);
  expect(res.value).toEqual(heartbeatDetail);
  expect(res2.value).toEqual(heartbeatDetail2);
  expect(res3.value).toEqual(heartbeatDetail3);
}

export function TestNewValue(): void {
  const heartbeatDetail = "status-report-to-workflow";
  const data = encodeArg(undefined, heartbeatDetail);
  const res = { value: "" };
  NewValue(data).Get(res);
  expect(res.value).toEqual(heartbeatDetail);
}

export function TestGetErrorDetails_CustomError(): void {
    const dc = getDefaultDataConverter();
    const details = dc.ToData("error details");

    const val = newEncodedValues(details, dc) as EncodedValues;
    const customErr1 = NewCustomError(customErrReasonA, val);
    let [reason, data] = getErrorDetails(customErr1, dc);
    expect(reason).toEqual(customErrReasonA);
    expect(data).toEqual(val.values);

    const customErr2 = NewCustomError(customErrReasonA, testErrorDetails1);
    const val2 = encodeArgs(dc, [testErrorDetails1]);
    [reason, data] = getErrorDetails(customErr2, dc);
    expect(reason).toEqual(customErrReasonA);
    expect(data).toEqual(val2);
}

export function TestGetErrorDetails_CancelError(): void {
	const dc = getDefaultDataConverter();
	const details = dc.ToData("error details");

	const val = newEncodedValues(details, dc) as EncodedValues;
	const canceledErr1 = NewCanceledError(val);
	let [reason, data] = getErrorDetails(canceledErr1, dc);
	expect(reason).toEqual(errReasonCanceled);
	expect(data).toEqual(val.values);

	const canceledErr2 = NewCanceledError(testErrorDetails1);
	const val2 = encodeArgs(dc, [testErrorDetails1]);
	[reason, data] = getErrorDetails(canceledErr2, dc);
	expect(reason).toEqual(errReasonCanceled);
	expect(data).toEqual(val2);
}

export function TestGetErrorDetails_TimeoutError(): void {
    const dc = getDefaultDataConverter();
    const details = dc.ToData("error details");

    const val = newEncodedValues(details, dc) as EncodedValues;
    const timeoutErr1 = NewTimeoutError(TimeoutType.SCHEDULE_TO_START, val);
    let [reason, data] = getErrorDetails(timeoutErr1, dc);
    expect(reason).toEqual(`${errReasonTimeout} ${TimeoutType[TimeoutType.SCHEDULE_TO_START]}`);
    expect(data).toEqual(val.values);

    const timeoutErr2 = NewTimeoutError(TimeoutType.HEARTBEAT, testErrorDetails4);
    const val2 = encodeArgs(dc, [testErrorDetails4]);
    [reason, data] = getErrorDetails(timeoutErr2, dc);
    expect(reason).toEqual(`${errReasonTimeout} ${TimeoutType[TimeoutType.HEARTBEAT]}`);
    expect(data).toEqual(val2);
}

export function Test_getErrorDetails_nil(): void {
  // @go-unlowerable: typed nil — Go interface-typed nil error values cannot be represented distinctly from null in TypeScript
}

export function TestConstructError_TimeoutError(): void {
    const dc = getDefaultDataConverter();
    const details = dc.ToData(testErrorDetails1);

    let reason = `${errReasonTimeout} ${TimeoutType[TimeoutType.HEARTBEAT]}`;
    let constructedErr = constructError(reason, details, dc);
    expect(constructedErr instanceof internal_TimeoutError).toBe(true);
    let timeoutErr = constructedErr as internal_TimeoutError;
    expect(timeoutErr.HasDetails()).toBe(true);

    const detailValue = { value: '' };
    timeoutErr.Details(detailValue);
    expect(detailValue.value).toEqual(testErrorDetails1);

    reason = errReasonTimeout;
    const heartbeatDetails = dc.ToData(TimeoutType.HEARTBEAT);
    constructedErr = constructError(reason, heartbeatDetails, dc);
    expect(constructedErr instanceof internal_TimeoutError).toBe(true);
    timeoutErr = constructedErr as internal_TimeoutError;
    expect(timeoutErr.TimeoutType()).toEqual(TimeoutType.HEARTBEAT);
    expect(timeoutErr.HasDetails()).toBe(false);
}

export function TestFeatureFlagsHeader(): void {
  const tests: {
    name: string;
    flags: internal_FeatureFlags;
    expected: string;
  }[] = [
    {
      name: "all flags disabled",
      flags: {
        AutoforwardingEnabled: false,
        EphemeralTaskListsEnabled: false,
        MetricEmitMode: 0,
        PollerAutoScalerEnabled: false,
        WorkflowExecutionAlreadyCompletedErrorEnabled: false,
      },
      expected: "{}",
    },
    {
      name: "WorkflowExecutionAlreadyCompletedErrorEnabled only",
      flags: {
        AutoforwardingEnabled: false,
        EphemeralTaskListsEnabled: false,
        MetricEmitMode: 0,
        PollerAutoScalerEnabled: false,
        WorkflowExecutionAlreadyCompletedErrorEnabled: true,
      },
      expected: '{"WorkflowExecutionAlreadyCompletedErrorEnabled":true}',
    },
    {
      name: "AutoforwardingEnabled only",
      flags: {
        AutoforwardingEnabled: true,
        EphemeralTaskListsEnabled: false,
        MetricEmitMode: 0,
        PollerAutoScalerEnabled: false,
        WorkflowExecutionAlreadyCompletedErrorEnabled: false,
      },
      expected: '{"autoforwardingEnabled":true}',
    },
    {
      name: "multiple flags enabled",
      flags: {
        AutoforwardingEnabled: true,
        EphemeralTaskListsEnabled: false,
        MetricEmitMode: 0,
        PollerAutoScalerEnabled: false,
        WorkflowExecutionAlreadyCompletedErrorEnabled: true,
      },
      expected:
        '{"WorkflowExecutionAlreadyCompletedErrorEnabled":true,"autoforwardingEnabled":true}',
    },
    {
      name: "client-side-only flags are excluded",
      flags: {
        AutoforwardingEnabled: false,
        EphemeralTaskListsEnabled: true,
        MetricEmitMode: 0,
        PollerAutoScalerEnabled: true,
        WorkflowExecutionAlreadyCompletedErrorEnabled: false,
      },
      expected: "{}",
    },
    {
      name: "mixed flags - only server-side flags included",
      flags: {
        AutoforwardingEnabled: true,
        EphemeralTaskListsEnabled: true,
        MetricEmitMode: 0,
        PollerAutoScalerEnabled: true,
        WorkflowExecutionAlreadyCompletedErrorEnabled: true,
      },
      expected:
        '{"WorkflowExecutionAlreadyCompletedErrorEnabled":true,"autoforwardingEnabled":true}',
    },
  ];

  for (const tt of tests) {
    const result = featureFlagsHeader(tt.flags);
    expect(result).toEqual(tt.expected);
  }
}

export function TestFromInternalFeatureFlags(): void {
    const tests: { name: string; input: internal_FeatureFlags }[] = [
        {
            name: "empty flags",
            input: {
                AutoforwardingEnabled: false,
                EphemeralTaskListsEnabled: false,
                MetricEmitMode: 0,
                PollerAutoScalerEnabled: false,
                WorkflowExecutionAlreadyCompletedErrorEnabled: false,
            },
        },
        {
            name: "all flags set",
            input: {
                WorkflowExecutionAlreadyCompletedErrorEnabled: true,
                AutoforwardingEnabled: true,
                PollerAutoScalerEnabled: true,
                EphemeralTaskListsEnabled: true,
                MetricEmitMode: 0,
            },
        },
    ];

    for (const tt of tests) {
        const result = fromInternalFeatureFlags(tt.input);

        expect(result.workflowExecutionAlreadyCompletedErrorEnabled).toEqual(
            tt.input.WorkflowExecutionAlreadyCompletedErrorEnabled,
        );
        expect(result.autoforwardingEnabled).toEqual(tt.input.AutoforwardingEnabled);
    }
}
