// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { Int64 } from '@creditkarma/thrift-server-core';
import { workflowEnvironmentImpl, workflowExecutionEventHandlerImpl, historySizeEstimationBuffer, validateVersion, wrapLogger, replayAwareZapCore, scheduledActivity, scheduledCancellation, scheduledChildWorkflow, scheduledTimer, createSearchAttributesForChangeVersion, getChangeVersion, validateAndSerializeSearchAttributes, getChangeVersions, newWorkflowExecutionEventHandler, mergeSearchAttributes } from './internal_event_handlers.js';
import { registry, newRegistry, errMsgUnknownWorkflowType } from './registry.js';
import { Second } from './runtime/time.js';
import { installGoTestW3CPropagator } from './runtime/tracing_test.js';
import { expect } from 'vitest';
import { getDefaultDataConverter, defaultDataConverter, DefaultDataConverter } from './encoded.js';
import { newTestDataConverter } from './encoded_test.js';
import { StringPtr, EventTypePtr, BoolPtr } from './common/convert.js';
import { MarkerRecordedEventAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/MarkerRecordedEventAttributes.js';
import { mutableSideEffectMarkerName, sideEffectMarkerName, versionMarkerName, makeDecisionID, newDecisionsHelper, decisionTypeUpsertSearchAttributes } from './internal_decision_state_machine.js';
import { createTestEventWorkflowExecutionStarted, testDomain, createTestEventDecisionTaskScheduled, createTestEventDecisionTaskStarted } from './internal_task_handlers_test.js';
import { estimateHistorySize } from './internal_utils.js';
import { TaskList } from '../generated/thrift/cadence-idl/com/uber/cadence/TaskList.js';
import { WorkflowExecutionStartedEventAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/WorkflowExecutionStartedEventAttributes.js';
import { InfoLevel, LoggerFromCore, ObserverCore, CoreFromLogger, NoopLogger } from './runtime/logging.js';
import { Ref } from './runtime/ref.js';
import { internal_SessionInfo } from './session.js';
import { ErrCanceled, Background, internal_Context } from './context.js';
import { EventType } from '../generated/thrift/cadence-idl/com/uber/cadence/EventType.js';
import { HistoryEvent } from '../generated/thrift/cadence-idl/com/uber/cadence/HistoryEvent.js';
import { ActivityTaskCanceledEventAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/ActivityTaskCanceledEventAttributes.js';
import { ActivityTaskCompletedEventAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/ActivityTaskCompletedEventAttributes.js';
import { ActivityTaskFailedEventAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/ActivityTaskFailedEventAttributes.js';
import { CancelTimerFailedEventAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/CancelTimerFailedEventAttributes.js';
import { RequestCancelExternalWorkflowExecutionInitiatedEventAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/RequestCancelExternalWorkflowExecutionInitiatedEventAttributes.js';
import { ScheduleActivityTaskDecisionAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/ScheduleActivityTaskDecisionAttributes.js';
import { StartChildWorkflowExecutionDecisionAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/StartChildWorkflowExecutionDecisionAttributes.js';
import { StartTimerDecisionAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/StartTimerDecisionAttributes.js';
import { TimerCanceledEventAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/TimerCanceledEventAttributes.js';
import { WorkflowExecution } from '../generated/thrift/cadence-idl/com/uber/cadence/WorkflowExecution.js';
import { WorkflowExecutionCancelRequestedEventAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/WorkflowExecutionCancelRequestedEventAttributes.js';
import { internal_CanceledError, internal_CustomError } from './error.js';
import { CadenceChangeVersion, ExecuteWithMinVersion, ExecuteWithVersion, internal_Version, GetWorkflowInfo, WorkflowInfo } from './workflow.js';
import { createRootTestContext } from './internal_coroutines_test.js';
import { getWorkflowEnvOptions, setWorkflowEnvOptionsIfNotExist, syncWorkflowDefinition } from './internal_workflow.js';
import { QueryTypeQueryTypes } from './client.js';
import { internal_ActivityOptions } from './activity.js';
import { Header } from '../generated/thrift/cadence-idl/com/uber/cadence/Header.js';
import { WorkflowType } from '../generated/thrift/cadence-idl/com/uber/cadence/WorkflowType.js';
import { NewTestScope } from './runtime/tally.js';
import { trace } from '@opentelemetry/api';
import { DecisionTaskScheduledEventAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/DecisionTaskScheduledEventAttributes.js';
import { SearchAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/SearchAttributes.js';

export function TestReplayAwareLogger(): void {
    const [core, observed] = ObserverCore(InfoLevel);
    let logger = LoggerFromCore(core);

    const isReplay = new Ref(false);
    const enableLoggingInReplay = new Ref(false);
    logger = LoggerFromCore(
        wrapLogger(isReplay, enableLoggingInReplay)(CoreFromLogger(logger)),
    );

    logger.info("normal info");

    isReplay.value = true;
    logger.info("replay info");

    isReplay.value = false;
    enableLoggingInReplay.value = true;
    logger.info("normal2 info");

    isReplay.value = true;
    logger.info("replay2 info");

    const messages: string[] = [];
    for (const log of observed.All()) {
        messages.push(log.Message);
    }

    expect(messages).toHaveLength(3);
    expect(messages).toContain("normal info");
    expect(messages).not.toContain("replay info");
    expect(messages).toContain("normal2 info");
    expect(messages).toContain("replay2 info");

    isReplay.value = true;
    enableLoggingInReplay.value = true;
    const parentCore = wrapLogger(isReplay, enableLoggingInReplay);
    const wrappedCore = parentCore(core).With([{ key: "value" }]) as replayAwareZapCore;
    expect(wrappedCore.isReplay).toEqual(isReplay);
    expect(wrappedCore.enableLoggingInReplay).toEqual(enableLoggingInReplay);
}

export function testDecodeValueHelper(env: workflowEnvironmentImpl): void {
    const equals = (a: unknown, b: unknown): boolean => {
        const ao = a as internal_ActivityOptions;
        const bo = b as internal_ActivityOptions;
        return ao.TaskList === bo.TaskList;
    };
    const value = new internal_ActivityOptions({
        ActivityID: "",
        HeartbeatTimeout: 0,
        RetryPolicy: undefined,
        ScheduleToCloseTimeout: 0,
        ScheduleToStartTimeout: 0,
        StartToCloseTimeout: 0,
        TaskList: "test-tasklist",
        WaitForCancellation: false,
    });
    const blob = env.encodeValue(value);
    let isEqual = env.isEqualValue(value, blob, equals);
    expect(isEqual).toBe(true);

    value.TaskList = "value-changed";
    isEqual = env.isEqualValue(value, blob, equals);
    expect(isEqual).toBe(false);
}

export function TestDecodedValue(): void {
	const env = new workflowEnvironmentImpl({
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
	testDecodeValueHelper(env);
}

export function TestDecodedValue_WithDataConverter(): void {
    const env = new workflowEnvironmentImpl({
        dataConverter: newTestDataConverter(),
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
    testDecodeValueHelper(env);
}

export function Test_DecodedValuePtr(): void {
    const env = new workflowEnvironmentImpl({
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
            MetricEmitMode: 0
        },
        isReplay: false,
        mutableSideEffect: {},
        openSessions: {},
        pendingLaTasks: {},
        sideEffectResult: {},
        unstartedLaTasks: {},
        workflowInterceptorFactories: []
    });
    const equals = (a: unknown, b: unknown): boolean => {
        const ao = a as internal_ActivityOptions;
        const bo = b as internal_ActivityOptions;
        return ao.TaskList === bo.TaskList;
    };
    const value = new internal_ActivityOptions({
        ActivityID: "",
        HeartbeatTimeout: 0,
        ScheduleToCloseTimeout: 0,
        ScheduleToStartTimeout: 0,
        StartToCloseTimeout: 0,
        TaskList: "test-tasklist",
        WaitForCancellation: false
    });
    const blob = env.encodeValue(value);
    let isEqual = env.isEqualValue(value, blob, equals);
    expect(isEqual).toBe(true);

    value.TaskList = "value-changed";
    isEqual = env.isEqualValue(value, blob, equals);
    expect(isEqual).toBe(false);
}

export function Test_DecodedValueNil(): void {
  const env = new workflowEnvironmentImpl({
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
  const equals = (a: unknown, b: unknown): boolean => a == null && b == null;

  let value: unknown = undefined;
  let blob = env.encodeValue(value);
  let isEqual = env.isEqualValue(value, blob, equals);
  expect(isEqual).toBe(true);

  blob = env.encodeValue('any-non-nil-value');
  isEqual = env.isEqualValue(value, blob, equals);
  expect(isEqual).toBe(false);

  blob = env.encodeValue(undefined);
  isEqual = env.isEqualValue('non-nil-value', blob, equals);
  expect(isEqual).toBe(false);
}

export async function Test_ValidateAndSerializeSearchAttributes(): Promise<void> {
    await expect(
        validateAndSerializeSearchAttributes(undefined),
    ).rejects.toThrow('search attributes is empty');

    let attr: Record<string, unknown> = {
        JustKey: BigInt(1),
    };
    // @go-weakened: stdlib JSON diagnostic text differs between Go and TypeScript
    await expect(
        validateAndSerializeSearchAttributes(attr),
    ).rejects.toThrow('encode search attribute [JustKey] error:');

    attr = {
        key: 1,
    };
    const searchAttr = await validateAndSerializeSearchAttributes(attr);
    expect(searchAttr.indexedFields!.size).toEqual(1);
    const resp = JSON.parse(searchAttr.indexedFields!.get('key')!.toString('utf8'));
    expect(resp).toEqual(1);
}

export async function Test_UpsertSearchAttributes(): Promise<void> {
  const env = new workflowEnvironmentImpl({
    decisionsHelper: await newDecisionsHelper(),
    workflowInfo: GetWorkflowInfo(await createRootTestContext()),
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

  await expect(env.UpsertSearchAttributes(undefined)).rejects.toBeInstanceOf(Error);

  await env.UpsertSearchAttributes({
    [CadenceChangeVersion]: ["change2-1", "change1-1"],
  });

  const ok = env.decisionsHelper!.decisions.has(
    makeDecisionID(decisionTypeUpsertSearchAttributes, "change2-1").String(),
  );
  expect(ok).toBe(true);
  expect(env.counterID).toEqual(0);

  await env.UpsertSearchAttributes({ key: 1 });
  expect(env.counterID).toEqual(1);
}

export async function Test_MergeSearchAttributes(): Promise<void> {
    const tests: {
        name: string;
        current: SearchAttributes | undefined;
        upsert: SearchAttributes | undefined;
        expected: SearchAttributes | undefined;
    }[] = [
        {
            name: "currentIsNil",
            current: undefined,
            upsert: new SearchAttributes({}),
            expected: undefined,
        },
        {
            name: "currentIsEmpty",
            current: new SearchAttributes({ indexedFields: new Map() }),
            upsert: new SearchAttributes({}),
            expected: undefined,
        },
        {
            name: "normalMerge",
            current: new SearchAttributes({
                indexedFields: new Map([
                    ["CustomIntField", Buffer.from("1")],
                    ["CustomKeywordField", Buffer.from("keyword")],
                ]),
            }),
            upsert: new SearchAttributes({
                indexedFields: new Map([
                    ["CustomIntField", Buffer.from("2")],
                    ["CustomBoolField", Buffer.from("true")],
                ]),
            }),
            expected: new SearchAttributes({
                indexedFields: new Map([
                    ["CustomIntField", Buffer.from("2")],
                    ["CustomKeywordField", Buffer.from("keyword")],
                    ["CustomBoolField", Buffer.from("true")],
                ]),
            }),
        },
    ];

    for (const test of tests) {
        const result = await mergeSearchAttributes(test.current, test.upsert);
        expect(result).toEqual(test.expected);
    }
}

export function Test_GetChangeVersion(): void {
    const tests: {
        name: string;
        changeID: string;
        version: internal_Version;
        expected: string;
    }[] = [
        {
            name: "default",
            changeID: "cid",
            version: -1,
            expected: "cid--1",
        },
        {
            name: "normal_case",
            changeID: "cid",
            version: 1,
            expected: "cid-1",
        },
    ];

    for (const testLocal of tests) {
        const result = getChangeVersion(testLocal.changeID, testLocal.version);
        expect(result).toEqual(testLocal.expected);
    }
}

export function Test_GetChangeVersions(): void {
    const tests: {
        name: string;
        changeID: string;
        version: internal_Version;
        existingChangeVersions: Record<string, internal_Version>;
        expected: string[];
    }[] = [
        {
            name: "single_change_id",
            changeID: "cid",
            version: 1,
            existingChangeVersions: {},
            expected: ["cid-1"],
        },
        {
            name: "multi_change_ids",
            changeID: "cid2",
            version: 1,
            existingChangeVersions: {
                cid: 1,
            },
            expected: ["cid2-1", "cid-1"],
        },
    ];

    for (const test of tests) {
        const testLocal = test;
        const result = getChangeVersions(
            testLocal.changeID,
            testLocal.version,
            testLocal.existingChangeVersions,
        );
        expect(result).toEqual(testLocal.expected);
    }
}

export function Test_CreateSearchAttributesForChangeVersion(): void {
    const result = createSearchAttributesForChangeVersion("cid", 1, {});
    const val = result[CadenceChangeVersion];
    const ok = CadenceChangeVersion in result;
    expect(ok).toBe(true);
    expect(val).toEqual(["cid-1"]);
}

export function TestHistoryEstimationforSmallEvents(): void {
    const taskList = "tasklist";
    const testEvents = [
        createTestEventWorkflowExecutionStarted(
            1,
            new WorkflowExecutionStartedEventAttributes({
                taskList: new TaskList({ name: taskList }),
            }),
        ),
        createTestEventDecisionTaskScheduled(
            2,
            new DecisionTaskScheduledEventAttributes({
                taskList: new TaskList({ name: taskList }),
            }),
        ),
        createTestEventDecisionTaskStarted(3),
        new HistoryEvent({
            eventId: new Int64(4),
            eventType: EventTypePtr(EventType.DecisionTaskFailed),
        }),
        new HistoryEvent({
            eventId: new Int64(5),
            eventType: EventTypePtr(EventType.WorkflowExecutionSignaled),
        }),
        createTestEventDecisionTaskScheduled(
            6,
            new DecisionTaskScheduledEventAttributes({
                taskList: new TaskList({ name: taskList }),
            }),
        ),
        createTestEventDecisionTaskStarted(7),
    ];
    const [core] = ObserverCore(InfoLevel);
    const logger = LoggerFromCore(core);
    const w = new workflowExecutionEventHandlerImpl({ logger });
    w.logger = logger;
    let historySizeSum = 0;
    for (const event of testEvents) {
        const sum = estimateHistorySize(logger, event);
        historySizeSum += sum;
    }
    const trueSize = testEvents.length * historySizeEstimationBuffer;
    expect(historySizeSum).toEqual(trueSize);
}

export function TestHistoryEstimationforPackedEvents(): void {
    let byteArray: Buffer = Buffer.alloc(0);
    byteArray = Buffer.concat([byteArray, Buffer.from([100])]);
    const taskList = "tasklist";
    const testEvents = [
        createTestEventWorkflowExecutionStarted(
            1,
            new WorkflowExecutionStartedEventAttributes({
                taskList: new TaskList({ name: taskList }),
                input: byteArray,
                continuedFailureDetails: byteArray,
            }),
        ),
        createTestEventWorkflowExecutionStarted(
            2,
            new WorkflowExecutionStartedEventAttributes({
                taskList: new TaskList({ name: taskList }),
                input: byteArray,
                continuedFailureDetails: byteArray,
            }),
        ),
        createTestEventWorkflowExecutionStarted(
            3,
            new WorkflowExecutionStartedEventAttributes({
                taskList: new TaskList({ name: taskList }),
                input: byteArray,
                continuedFailureDetails: byteArray,
            }),
        ),
    ];
    const [core] = ObserverCore(InfoLevel);
    const logger = LoggerFromCore(core);
    const w = new workflowExecutionEventHandlerImpl({ logger });
    w.logger = logger;
    let historySizeSum = 0;
    for (const event of testEvents) {
        const sum = estimateHistorySize(logger, event);
        historySizeSum += sum;
    }
    const trueSize =
        testEvents.length * historySizeEstimationBuffer +
        byteArray.length * 2 * testEvents.length;
    expect(historySizeSum).toEqual(trueSize);
}

export async function TestProcessQuery_KnownQueryTypes(): Promise<void> {
  const rootCtx = await setWorkflowEnvOptionsIfNotExist(Background());
  const eo = getWorkflowEnvOptions(rootCtx)!;
  eo.queryHandlers!["a"] = undefined;

  const weh = new workflowExecutionEventHandlerImpl({
    dataConverter: DefaultDataConverter,
    workflowDefinition: new syncWorkflowDefinition({
      rootCtx,
    }),
  });

  let result: Buffer;
  let err: Error | null = null;
  try {
    result = await weh.ProcessQuery(QueryTypeQueryTypes, undefined);
  } catch (e) {
    if (!(e instanceof Error)) throw e;
    err = e;
  }

  expect(err).toBeNull();
  expect(result!.toString()).toEqual("[\"__open_sessions\",\"__query_types\",\"__stack_trace\",\"a\"]\n");
}

export async function TestWorkflowExecutionEventHandler_ProcessEvent_WorkflowExecutionStarted(): Promise<void> {
    const testRegistry = await newRegistry();
    await testRegistry.RegisterWorkflowWithOptions(
        (ctx: internal_Context): void => {},
        {
            Name: "test",
            EnableShortName: false,
            DisableAlreadyRegisteredCheck: false,
        },
    );

    const weh = await testWorkflowExecutionEventHandler(testRegistry);

    const testHeaderStruct = new Header({
        fields: new Map([["test", Buffer.from("test")]]),
    });
    const testInput = Buffer.from("testInput");
    const event = new HistoryEvent({
        eventType: EventTypePtr(EventType.WorkflowExecutionStarted),
        workflowExecutionStartedEventAttributes: new WorkflowExecutionStartedEventAttributes({
            workflowType: new WorkflowType({
                name: StringPtr("test"),
            }),
            input: testInput,
            header: testHeaderStruct,
        }),
    });

    await weh.ProcessEvent(event, false, false);

    const errorRegistry = await newRegistry();
    const errorWeh = await testWorkflowExecutionEventHandler(errorRegistry);
    const errorEvent = new HistoryEvent({
        eventType: EventTypePtr(EventType.WorkflowExecutionStarted),
        workflowExecutionStartedEventAttributes: new WorkflowExecutionStartedEventAttributes({
            workflowType: new WorkflowType({
                name: StringPtr("test"),
            }),
        }),
    });

    let caught = false;
    try {
        await errorWeh.ProcessEvent(errorEvent, false, false);
    } catch (err) {
        if (!(err instanceof Error)) throw err;
        caught = true;
        expect(err.message).toContain(errMsgUnknownWorkflowType);
    }
    expect(caught).toBe(true);
}

export async function TestWorkflowExecutionEventHandler_ProcessEvent_Noops(): Promise<void> {
    for (const tc of [
        EventType.WorkflowExecutionCompleted,
        EventType.WorkflowExecutionTimedOut,
        EventType.WorkflowExecutionFailed,
        EventType.DecisionTaskScheduled,
        EventType.DecisionTaskTimedOut,
        EventType.DecisionTaskFailed,
        EventType.ActivityTaskStarted,
        EventType.DecisionTaskCompleted,
        EventType.WorkflowExecutionCanceled,
        EventType.WorkflowExecutionContinuedAsNew,
    ]) {
        const registryInstance = await newRegistry();
        const weh = await testWorkflowExecutionEventHandler(registryInstance);
        const event = new HistoryEvent({
            eventType: EventTypePtr(tc),
        });
        await weh.ProcessEvent(event, false, false);
    }
}

export async function TestWorkflowExecutionEventHandler_ProcessEvent_nil(): Promise<void> {
    const registry = await newRegistry();
    const weh = await testWorkflowExecutionEventHandler(registry);

    let err: Error | null = null;
    try {
        await weh.ProcessEvent(undefined, false, false);
    } catch (caught) {
        if (!(caught instanceof Error)) throw caught;
        err = caught;
    }

    expect(err).not.toBeNull();
    if (err !== null) {
        expect(err.message).toContain("nil event provided");
    }
}

export async function TestWorkflowExecutionEventHandler_ProcessEvent_no_error_events(): Promise<void> {
    const cases: {
        event: HistoryEvent;
        prepareHandler?: (impl: workflowExecutionEventHandlerImpl) => void;
    }[] = [
        {
            event: new HistoryEvent({
                eventType: -1 as EventType,
            }),
        },
        {
            event: new HistoryEvent({
                eventType: EventType.ActivityTaskCompleted,
                eventId: new Int64(2),
                activityTaskCompletedEventAttributes: new ActivityTaskCompletedEventAttributes({
                    result: Buffer.from("test"),
                    scheduledEventId: new Int64(1),
                }),
            }),
            prepareHandler: (impl) => {
                const decision = impl.decisionsHelper!.scheduleActivityTask(
                    new ScheduleActivityTaskDecisionAttributes({
                        activityId: StringPtr("test-activity"),
                    }),
                );
                decision.setData(new scheduledActivity({
                    handled: true,
                    waitForCancelRequest: false,
                }));
                impl.decisionsHelper!.getDecisions(true);
                impl.decisionsHelper!.handleActivityTaskScheduled(1, "test-activity");
            },
        },
        {
            event: new HistoryEvent({
                eventType: EventType.ActivityTaskFailed,
                eventId: new Int64(3),
                activityTaskFailedEventAttributes: new ActivityTaskFailedEventAttributes({
                    reason: StringPtr("test-reason"),
                    scheduledEventId: new Int64(2),
                }),
            }),
            prepareHandler: (impl) => {
                const decision = impl.decisionsHelper!.scheduleActivityTask(
                    new ScheduleActivityTaskDecisionAttributes({
                        activityId: StringPtr("test-activity"),
                    }),
                );
                decision.setData(new scheduledActivity({
                    handled: false,
                    waitForCancelRequest: false,
                    callback: (_result, err) => {
                        expect(err instanceof internal_CustomError).toBe(true);
                        expect((err as internal_CustomError).reason).toEqual("test-reason");
                    },
                }));
                impl.decisionsHelper!.getDecisions(true);
                impl.decisionsHelper!.handleActivityTaskScheduled(2, "test-activity");
            },
        },
        {
            event: new HistoryEvent({
                eventType: EventType.ActivityTaskCanceled,
                eventId: new Int64(4),
                activityTaskCanceledEventAttributes: new ActivityTaskCanceledEventAttributes({
                    details: Buffer.from("test-details"),
                    scheduledEventId: new Int64(3),
                }),
            }),
            prepareHandler: (impl) => {
                const decision = impl.decisionsHelper!.scheduleActivityTask(
                    new ScheduleActivityTaskDecisionAttributes({
                        activityId: StringPtr("test-activity"),
                    }),
                );
                decision.setData(new scheduledActivity({
                    handled: false,
                    waitForCancelRequest: false,
                    callback: (_result, err) => {
                        expect(err instanceof internal_CanceledError).toBe(true);
                    },
                }));
                impl.decisionsHelper!.getDecisions(true);
                impl.decisionsHelper!.handleActivityTaskScheduled(3, "test-activity");
                decision.cancel();
                decision.handleDecisionSent();
            },
        },
        {
            event: new HistoryEvent({
                eventType: EventType.TimerCanceled,
                eventId: new Int64(5),
                timerCanceledEventAttributes: new TimerCanceledEventAttributes({
                    timerId: StringPtr("test-timer"),
                    startedEventId: new Int64(4),
                }),
            }),
            prepareHandler: (impl) => {
                const decision = impl.decisionsHelper!.startTimer(
                    new StartTimerDecisionAttributes({
                        timerId: StringPtr("test-timer"),
                    }),
                );
                decision.setData(new scheduledTimer({
                    handled: false,
                    callback: (_result, err) => {
                        expect(err instanceof internal_CanceledError).toBe(true);
                    },
                }));
                impl.decisionsHelper!.getDecisions(true);
                impl.decisionsHelper!.handleTimerStarted("test-timer");
                decision.cancel();
                decision.handleDecisionSent();
            },
        },
        {
            event: new HistoryEvent({
                eventType: EventType.CancelTimerFailed,
                eventId: new Int64(6),
                cancelTimerFailedEventAttributes: new CancelTimerFailedEventAttributes({
                    timerId: StringPtr("test-timer"),
                    cause: StringPtr("test-cause"),
                }),
            }),
            prepareHandler: (impl) => {
                const decision = impl.decisionsHelper!.startTimer(
                    new StartTimerDecisionAttributes({
                        timerId: StringPtr("test-timer"),
                    }),
                );
                decision.setData(new scheduledTimer({
                    handled: false,
                    callback: (_result, err) => {
                        expect(err instanceof internal_CustomError).toBe(true);
                        expect((err as internal_CustomError).reason).toEqual("test-cause");
                    },
                }));
                impl.decisionsHelper!.getDecisions(true);
                impl.decisionsHelper!.handleTimerStarted("test-timer");
                decision.cancel();
                decision.handleDecisionSent();
            },
        },
        {
            event: new HistoryEvent({
                eventType: EventType.WorkflowExecutionCancelRequested,
                eventId: new Int64(7),
                workflowExecutionCancelRequestedEventAttributes: new WorkflowExecutionCancelRequestedEventAttributes({
                    cause: StringPtr("test-cause"),
                }),
            }),
            prepareHandler: (impl) => {
                let cancelCalled = false;
                impl.cancelHandler = () => {
                    cancelCalled = true;
                };
                impl.completeHandler = () => {
                    expect(cancelCalled).toBe(true);
                };
            },
        },
        {
            event: new HistoryEvent({
                eventType: EventType.RequestCancelExternalWorkflowExecutionInitiated,
                eventId: new Int64(8),
                requestCancelExternalWorkflowExecutionInitiatedEventAttributes:
                    new RequestCancelExternalWorkflowExecutionInitiatedEventAttributes({
                        decisionTaskCompletedEventId: new Int64(7),
                        domain: StringPtr(testDomain),
                        workflowExecution: new WorkflowExecution({
                            workflowId: StringPtr("wid"),
                        }),
                        childWorkflowOnly: BoolPtr(true),
                    }),
            }),
            prepareHandler: (impl) => {
                let decision = impl.decisionsHelper!.startChildWorkflowExecution(
                    new StartChildWorkflowExecutionDecisionAttributes({
                        domain: StringPtr(testDomain),
                        workflowId: StringPtr("wid"),
                    }),
                );
                decision.setData(new scheduledChildWorkflow({
                    handled: true,
                    waitForCancellation: false,
                }));
                impl.decisionsHelper!.getDecisions(true);
                impl.decisionsHelper!.handleStartChildWorkflowExecutionInitiated("wid");
                impl.decisionsHelper!.handleChildWorkflowExecutionStarted("wid");
                decision = impl.decisionsHelper!.requestCancelExternalWorkflowExecution(
                    testDomain,
                    "wid",
                    "",
                    "",
                    true,
                );
                decision.setData(new scheduledCancellation({
                    handled: false,
                    callback: (_result, err) => {
                        expect(err instanceof internal_CanceledError).toBe(true);
                    },
                }));
                impl.decisionsHelper!.getDecisions(true);
                impl.decisionsHelper!.handleRequestCancelExternalWorkflowExecutionInitiated(7, "wid", "");
                decision.handleDecisionSent();
            },
        },
    ];

    for (const tc of cases) {
        const registry = await newRegistry();
        const weh = await testWorkflowExecutionEventHandler(registry);

        tc.prepareHandler?.(weh);

        weh.completeHandler = (_result, err) => {
            expect(err).toBeNull();
        };

        let err: Error | null = null;
        try {
            await weh.ProcessEvent(tc.event, false, false);
        } catch (caught) {
            if (!(caught instanceof Error)) {
                throw caught;
            }
            err = caught;
        }
        expect(err).toBeNull();
    }
}

export async function TestSideEffect(): Promise<void> {
  const weh = await testWorkflowExecutionEventHandler(await newRegistry());
  weh.isReplay = true;
  weh.sideEffectResult[weh.counterID] = Buffer.from("test");
  await weh.SideEffect(
    () => {
      throw new Error("side effect should not be called during replay");
    },
    (result, err) => {
      expect(err).toBeNull();
      expect(result.toString()).toEqual("test");
    },
  );

  const successWeh = await testWorkflowExecutionEventHandler(await newRegistry());
  await successWeh.SideEffect(
    () => Buffer.from("test"),
    (result, err) => {
      expect(err).toBeNull();
      expect(result.toString()).toEqual("test");
    },
  );
}

export function TestGetVersion_validation(): void {
  expect(() => validateVersion("test", 1, 2, 3)).toThrow(
    'Workflow code removed support of version 1. for "test" changeID. The oldest supported version is 2',
  );

  expect(() => validateVersion("test", 3, 1, 2)).toThrow(
    'Workflow code is too old to support version 3 for "test" changeID. The maximum supported version is 2',
  );

  validateVersion("test", 2, 1, 3);
}

export async function TestGetVersion(): Promise<void> {
    {
        const registry = await newRegistry();
        const weh = await testWorkflowExecutionEventHandler(registry);
        weh.changeVersions = { test: 2 };
        const res = await weh.GetVersion("test", 1, 3);
        expect(res).toEqual(2);
    }

    {
        const registry = await newRegistry();
        const weh = await testWorkflowExecutionEventHandler(registry);
        weh.changeVersions = { test: 2 };
        const res = await weh.GetVersion("test", 1, 3, ExecuteWithVersion(3));
        expect(res).toEqual(2);
    }

    {
        const registry = await newRegistry();
        const weh = await testWorkflowExecutionEventHandler(registry);
        weh.changeVersions = { test: 2 };
        const res = await weh.GetVersion("test", 1, 3, ExecuteWithMinVersion());
        expect(res).toEqual(2);
    }

    {
        const registry = await newRegistry();
        const weh = await testWorkflowExecutionEventHandler(registry);
        weh.isReplay = true;
        const res = await weh.GetVersion("test", -1, 3);
        expect(res).toEqual(-1);
        expect(weh.changeVersions).toHaveProperty("test");
        expect(weh.changeVersions["test"]).toEqual(-1);
    }

    {
        const registry = await newRegistry();
        const weh = await testWorkflowExecutionEventHandler(registry);
        const res = await weh.GetVersion("test", -1, 3);
        expect(res).toEqual(3);
        expect(weh.changeVersions).toHaveProperty("test");
        expect(weh.changeVersions["test"]).toEqual(3);
        expect(weh.workflowInfo!.SearchAttributes!.indexedFields!.get(CadenceChangeVersion)).toEqual(Buffer.from('["test-3"]'));
    }

    {
        const registry = await newRegistry();
        const weh = await testWorkflowExecutionEventHandler(registry);
        const res = await weh.GetVersion("test", -1, 3, ExecuteWithVersion(2));
        expect(res).toEqual(2);
        expect(weh.changeVersions).toHaveProperty("test");
        expect(weh.changeVersions["test"]).toEqual(2);
        expect(weh.workflowInfo!.SearchAttributes!.indexedFields!.get(CadenceChangeVersion)).toEqual(Buffer.from('["test-2"]'));
    }

    {
        const registry = await newRegistry();
        const weh = await testWorkflowExecutionEventHandler(registry);
        const res = await weh.GetVersion("test", -1, 3, ExecuteWithVersion(-1));
        expect(res).toEqual(-1);
        expect(weh.changeVersions).toHaveProperty("test");
        expect(weh.changeVersions["test"]).toEqual(-1);
        expect(weh.workflowInfo!.SearchAttributes).toBeUndefined();
    }

    {
        const registry = await newRegistry();
        const weh = await testWorkflowExecutionEventHandler(registry);
        const res = await weh.GetVersion("test", 1, 3, ExecuteWithMinVersion());
        expect(res).toEqual(1);
        expect(weh.changeVersions).toHaveProperty("test");
        expect(weh.changeVersions["test"]).toEqual(1);
        expect(weh.workflowInfo!.SearchAttributes!.indexedFields!.get(CadenceChangeVersion)).toEqual(Buffer.from('["test-1"]'));
    }

    {
        const registry = await newRegistry();
        const weh = await testWorkflowExecutionEventHandler(registry);
        const res = await weh.GetVersion("test", -1, 3, ExecuteWithMinVersion());
        expect(res).toEqual(-1);
        expect(weh.changeVersions).toHaveProperty("test");
        expect(weh.changeVersions["test"]).toEqual(-1);
        expect(weh.workflowInfo!.SearchAttributes).toBeUndefined();
    }

    {
        const registry = await newRegistry();
        const weh = await testWorkflowExecutionEventHandler(registry);
        await expect(weh.GetVersion("test", -1, 3, ExecuteWithVersion(10))).rejects.toThrow('Workflow code is too old to support version 10 for "test" changeID. The maximum supported version is 3');
        expect(weh.workflowInfo!.SearchAttributes).toBeUndefined();
    }

    {
        const registry = await newRegistry();
        const weh = await testWorkflowExecutionEventHandler(registry);
        await expect(weh.GetVersion("test", 1, 3, ExecuteWithVersion(0))).rejects.toThrow('Workflow code removed support of version 0. for "test" changeID. The oldest supported version is 1');
        expect(weh.workflowInfo!.SearchAttributes).toBeUndefined();
    }
}

export async function TestMutableSideEffect(): Promise<void> {
  {
    const weh = await testWorkflowExecutionEventHandler(await newRegistry());
    weh.mutableSideEffect["test-id"] = Buffer.from('"existing-value"');
    weh.isReplay = true;

    const result = weh.MutableSideEffect(
      "test-id",
      () => {
        throw new Error("side effect function should not be called during replay with existing value");
      },
      (a, b) => a === b,
    );
    const value = { value: "" };
    result.Get(value);
    expect(value.value).toEqual("existing-value");
  }

  {
    const weh = await testWorkflowExecutionEventHandler(await newRegistry());
    weh.isReplay = true;
    expect(() =>
      weh.MutableSideEffect(
        "test-id",
        () => "new-value",
        (a, b) => a === b,
      ),
    ).toThrow(
      "Non deterministic workflow code change detected. MutableSideEffect API call doesn't have a correspondent event in the workflow history. MutableSideEffect ID: test-id",
    );
  }

  {
    const weh = await testWorkflowExecutionEventHandler(await newRegistry());

    const result = weh.MutableSideEffect(
      "test-id",
      () => "existing-value",
      (a, b) => a === b,
    );

    const value = { value: "" };
    result.Get(value);
    expect(value.value).toEqual("existing-value");
  }

  {
    const weh = await testWorkflowExecutionEventHandler(await newRegistry());
    weh.mutableSideEffect["test-id"] = Buffer.from('"existing-value"');

    const result = weh.MutableSideEffect(
      "test-id",
      () => "existing-value",
      (a, b) => a === b,
    );

    const value = { value: "" };
    result.Get(value);
    expect(value.value).toEqual("existing-value");
  }

  {
    const weh = await testWorkflowExecutionEventHandler(await newRegistry());
    weh.mutableSideEffect["test-id"] = Buffer.from('"existing-value"');

    const result = weh.MutableSideEffect(
      "test-id",
      () => "new-value",
      (a, b) => a === b,
    );

    const value = { value: "" };
    result.Get(value);
    expect(value.value).toEqual("new-value");
    expect(
      weh.mutableSideEffect["test-id"].subarray(
        0,
        weh.mutableSideEffect["test-id"].length - 1,
      ),
    ).toEqual(Buffer.from('"new-value"'));
  }
}

export async function TestEventHandler_handleMarkerRecorded(): Promise<void> {
    const cases = [
        {
            marker: new MarkerRecordedEventAttributes({
                markerName: StringPtr(sideEffectMarkerName),
                details: getSerializedDetails(1, Buffer.from('test')),
            }),
            assertResult: (result: workflowExecutionEventHandlerImpl) => {
                expect(result.sideEffectResult).toHaveProperty(1);
                expect(result.sideEffectResult[1]).toEqual(Buffer.from('test'));
            },
        },
        {
            marker: new MarkerRecordedEventAttributes({
                markerName: StringPtr(versionMarkerName),
                details: getSerializedDetails('test-version', 1),
            }),
            assertResult: (result: workflowExecutionEventHandlerImpl) => {
                expect(result.changeVersions).toHaveProperty('test-version');
                expect(result.changeVersions['test-version']).toEqual(1);
            },
        },
        {
            marker: new MarkerRecordedEventAttributes({
                markerName: StringPtr(mutableSideEffectMarkerName),
                details: getSerializedDetails('test-marker', 'test'),
            }),
            assertResult: (result: workflowExecutionEventHandlerImpl) => {
                expect(result.mutableSideEffect).toHaveProperty('test-marker');
                expect(result.mutableSideEffect['test-marker']).toEqual(Buffer.from('test'));
            },
        },
    ];

    for (const tc of cases) {
        const registry = await newRegistry();
        const weh = await testWorkflowExecutionEventHandler(registry);
        await weh.handleMarkerRecorded(1, tc.marker);
    }
}

export async function TestEventHandler_handleMarkerRecorded_failures(): Promise<void> {
    const registry = await newRegistry();
    const weh = await testWorkflowExecutionEventHandler(registry);

    const cases: {
        name: string;
        marker: MarkerRecordedEventAttributes;
        assertErrorStr: string;
    }[] = [
        {
            name: "unknown marker",
            marker: new MarkerRecordedEventAttributes({
                markerName: StringPtr("unknown"),
            }),
            assertErrorStr: 'unknown marker name "unknown" for eventID "1"',
        },
        {
            name: "side effect with invalid details",
            marker: new MarkerRecordedEventAttributes({
                markerName: StringPtr(sideEffectMarkerName),
                details: Buffer.from("invalid"),
            }),
            assertErrorStr: "extract side effect: unable to decode argument:",
        },
        {
            name: "version with invalid details",
            marker: new MarkerRecordedEventAttributes({
                markerName: StringPtr(versionMarkerName),
                details: Buffer.from("invalid"),
            }),
            assertErrorStr: "extract change id: unable to decode argument:",
        },
        {
            name: "mutable side effect with invalid details",
            marker: new MarkerRecordedEventAttributes({
                markerName: StringPtr(mutableSideEffectMarkerName),
                details: Buffer.from("invalid"),
            }),
            assertErrorStr: "extract fixed id: unable to decode argument:",
        },
    ];

    for (const tc of cases) {
        await expect(weh.handleMarkerRecorded(1, tc.marker)).rejects.toThrow(tc.assertErrorStr);
    }
}

export async function TestWorkflowEnvironment_sessions(): Promise<void> {
  const handler = await testWorkflowExecutionEventHandler(await newRegistry());
  const testSession = new internal_SessionInfo({
    SessionID: "test-session",
    HostName: "test-host",
    resourceID: "",
    sessionState: 0,
    tasklist: "",
  });
  handler.AddSession(testSession);
  let list = await handler.getOpenSessions();
  expect(list).toContain(testSession);
  handler.RemoveSession(testSession.SessionID);
  list = await handler.getOpenSessions();
  expect(list).toHaveLength(0);
}

export async function TestWorkflowExecutionEnvironment_NewTimer_immediate_calls(): Promise<void> {
    {
        const handler = await testWorkflowExecutionEventHandler(await newRegistry());
        let handlerCalled = false;
        const res = handler.NewTimer(0, (result: Buffer, err: Error | null) => {
            expect(err).toBeNull();
            handlerCalled = true;
        });
        expect(handlerCalled).toBe(true);
        expect(res).toBeUndefined();
    }

    {
        const handler = await testWorkflowExecutionEventHandler(await newRegistry());
        let handlerCalled = false;
        const res = handler.NewTimer(-2 * Second, (result: Buffer, err: Error | null) => {
            handlerCalled = true;
            expect(err).not.toBeNull();
            expect(err?.message).toContain('negative duration provided');
        });
        expect(res).toBeUndefined();
        expect(handlerCalled).toBe(true);
    }

    {
        const handler = await testWorkflowExecutionEventHandler(await newRegistry());
        const timer = handler.NewTimer(Second, (result: Buffer, err: Error | null) => {
            expect(err).toBe(ErrCanceled);
        });
        handler.RequestCancelTimer(timer!.timerID);
    }
}

export async function testWorkflowExecutionEventHandler(registry: registry): Promise<workflowExecutionEventHandlerImpl> {
  const testWorkflowInfo = new WorkflowInfo({
    Attempt: 0,
    DecisionStartedEventID: 0,
    Domain: "",
    ExecutionStartToCloseTimeoutSeconds: 0,
    HistoryBytesServer: 0,
    HistoryCount: 0,
    OriginalRunId: "",
    TaskListName: "",
    TaskStartToCloseTimeoutSeconds: 0,
    TotalHistoryBytes: 0,
    WorkflowExecution: { ID: "", RunID: "" },
    WorkflowType: {
      Name: "test",
      Path: "",
    },
    lastCompletionResult: Buffer.alloc(0),
  });

  return await newWorkflowExecutionEventHandler(
    testWorkflowInfo,
    (result: Buffer, err: Error | null) => {},
    NoopLogger(),
    true,
    NewTestScope("test", {}),
    registry,
    new defaultDataConverter({}),
    undefined,
    trace.getTracer("noop"),
    undefined,
    {
      AutoforwardingEnabled: false,
      EphemeralTaskListsEnabled: false,
      MetricEmitMode: 0,
      PollerAutoScalerEnabled: false,
      WorkflowExecutionAlreadyCompletedErrorEnabled: false,
    },
  );
}

export function getSerializedDetails<T, V>(id: T, data: V): Buffer {
  const converter = new defaultDataConverter({});
  const res = converter.ToData(id, data);
  return res;
}

export const goTracingTestPropagatorInstalled = installGoTestW3CPropagator(); // registers the SDK-owned W3C test propagator globally
