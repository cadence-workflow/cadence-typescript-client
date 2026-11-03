import { internal_BackfillInfo, internal_BackfillRequest, internal_CreateScheduleRequest, internal_DescribeScheduleResponse, internal_ListSchedulesResponse, internal_ScheduleAction, internal_ScheduleActionDescription, internal_ScheduleCatchUpPolicy, internal_ScheduleInfo, internal_ScheduleListEntry, internal_ScheduleOverlapPolicy, internal_SchedulePauseInfo, internal_SchedulePolicies, internal_ScheduleSpec, internal_ScheduleStartWorkflowAction, internal_ScheduleStartWorkflowActionDescription, internal_ScheduleState, internal_UpdateScheduleRequest } from './schedule.js';
import { IBackfillInfo as shared_IBackfillInfo } from '../generated/thrift/cadence-idl/com/uber/cadence/BackfillInfo.js';
import { IBackfillScheduleRequest as shared_IBackfillScheduleRequest } from '../generated/thrift/cadence-idl/com/uber/cadence/BackfillScheduleRequest.js';
import { ICreateScheduleRequest as shared_ICreateScheduleRequest } from '../generated/thrift/cadence-idl/com/uber/cadence/CreateScheduleRequest.js';
import { IDescribeScheduleResponse as shared_IDescribeScheduleResponse } from '../generated/thrift/cadence-idl/com/uber/cadence/DescribeScheduleResponse.js';
import { IListSchedulesResponse as shared_IListSchedulesResponse } from '../generated/thrift/cadence-idl/com/uber/cadence/ListSchedulesResponse.js';
import { IRetryPolicy as shared_IRetryPolicy } from '../generated/thrift/cadence-idl/com/uber/cadence/RetryPolicy.js';
import { IScheduleAction as shared_IScheduleAction, ScheduleAction } from '../generated/thrift/cadence-idl/com/uber/cadence/ScheduleAction.js';
import { ScheduleCatchUpPolicy as shared_ScheduleCatchUpPolicy } from '../generated/thrift/cadence-idl/com/uber/cadence/ScheduleCatchUpPolicy.js';
import { IScheduleInfo as shared_IScheduleInfo } from '../generated/thrift/cadence-idl/com/uber/cadence/ScheduleInfo.js';
import { IScheduleListEntry as shared_IScheduleListEntry } from '../generated/thrift/cadence-idl/com/uber/cadence/ScheduleListEntry.js';
import { ScheduleOverlapPolicy as shared_ScheduleOverlapPolicy } from '../generated/thrift/cadence-idl/com/uber/cadence/ScheduleOverlapPolicy.js';
import { ISchedulePauseInfo as shared_ISchedulePauseInfo } from '../generated/thrift/cadence-idl/com/uber/cadence/SchedulePauseInfo.js';
import { ISchedulePolicies as shared_ISchedulePolicies, SchedulePolicies } from '../generated/thrift/cadence-idl/com/uber/cadence/SchedulePolicies.js';
import { IScheduleSpec as shared_IScheduleSpec, ScheduleSpec } from '../generated/thrift/cadence-idl/com/uber/cadence/ScheduleSpec.js';
import { IScheduleStartWorkflowAction as shared_IScheduleStartWorkflowAction, ScheduleStartWorkflowAction } from '../generated/thrift/cadence-idl/com/uber/cadence/ScheduleStartWorkflowAction.js';
import { IScheduleState as shared_IScheduleState } from '../generated/thrift/cadence-idl/com/uber/cadence/ScheduleState.js';
import { IUpdateScheduleRequest as shared_IUpdateScheduleRequest, UpdateScheduleRequest } from '../generated/thrift/cadence-idl/com/uber/cadence/UpdateScheduleRequest.js';
import { Second } from './runtime/time.js';
import { Int32Ceil, Int32Ptr, Int64Ptr, BoolPtr, StringPtr } from './common/convert.js';
import { Memo } from '../generated/thrift/cadence-idl/com/uber/cadence/Memo.js';
import { SearchAttributes } from '../generated/thrift/cadence-idl/com/uber/cadence/SearchAttributes.js';
import { TaskList } from '../generated/thrift/cadence-idl/com/uber/cadence/TaskList.js';
import { WorkflowType } from '../generated/thrift/cadence-idl/com/uber/cadence/WorkflowType.js';
import { encodeArg } from './internal_worker.js';
import { defaultDecisionTaskTimeoutInSecs } from './internal_workflow_client.js';
import { DefaultBackoffCoefficient } from './common/backoff/retrypolicy.js';
import { internal_RetryPolicy } from './client.js';
import { internal_DataConverter } from './encoded.js';

export function scheduleOverlapPolicyToThrift(p: internal_ScheduleOverlapPolicy): shared_ScheduleOverlapPolicy | undefined {
    switch (p) {
        case internal_ScheduleOverlapPolicy.ScheduleOverlapPolicyUnspecified: {
            return undefined;
        }
        case internal_ScheduleOverlapPolicy.ScheduleOverlapPolicySkipNew: {
            const v = shared_ScheduleOverlapPolicy.SKIP_NEW;
            return v;
        }
        case internal_ScheduleOverlapPolicy.ScheduleOverlapPolicyBuffer: {
            const v = shared_ScheduleOverlapPolicy.BUFFER;
            return v;
        }
        case internal_ScheduleOverlapPolicy.ScheduleOverlapPolicyConcurrent: {
            const v = shared_ScheduleOverlapPolicy.CONCURRENT;
            return v;
        }
        case internal_ScheduleOverlapPolicy.ScheduleOverlapPolicyCancelPrevious: {
            const v = shared_ScheduleOverlapPolicy.CANCEL_PREVIOUS;
            return v;
        }
        case internal_ScheduleOverlapPolicy.ScheduleOverlapPolicyTerminatePrevious: {
            const v = shared_ScheduleOverlapPolicy.TERMINATE_PREVIOUS;
            return v;
        }
        default: {
            const v = shared_ScheduleOverlapPolicy.INVALID;
            return v;
        }
    }
}

export function scheduleOverlapPolicyFromThrift(p: shared_ScheduleOverlapPolicy | undefined): internal_ScheduleOverlapPolicy {
  throw new globalThis.Error("not implemented"); // @stub
}

export function scheduleCatchUpPolicyToThrift(p: internal_ScheduleCatchUpPolicy): shared_ScheduleCatchUpPolicy | undefined {
  switch (p) {
    case internal_ScheduleCatchUpPolicy.ScheduleCatchUpPolicyUnspecified: {
      return undefined;
    }
    case internal_ScheduleCatchUpPolicy.ScheduleCatchUpPolicySkip: {
      const v = shared_ScheduleCatchUpPolicy.SKIP;
      return v;
    }
    case internal_ScheduleCatchUpPolicy.ScheduleCatchUpPolicyOne: {
      const v = shared_ScheduleCatchUpPolicy.ONE;
      return v;
    }
    case internal_ScheduleCatchUpPolicy.ScheduleCatchUpPolicyAll: {
      const v = shared_ScheduleCatchUpPolicy.ALL;
      return v;
    }
    default: {
      const v = shared_ScheduleCatchUpPolicy.INVALID;
      return v;
    }
  }
}

export function scheduleCatchUpPolicyFromThrift(p: shared_ScheduleCatchUpPolicy | undefined): internal_ScheduleCatchUpPolicy {
  throw new globalThis.Error("not implemented"); // @stub
}

export function timeToThriftNano(t: number): number | undefined {
  if (t === 0) {
    return;
  }
  return Int64Ptr(t);
}

export function thriftNanoToTime(n: number | undefined): number {
  throw new globalThis.Error("not implemented"); // @stub
}

export function durationToThriftSeconds(d: number): number | undefined {
    if (d === 0) {
        return undefined;
    }
    return Int32Ptr(Int32Ceil(d / 1e9));
}

export function thriftSecondsToDuration(n: number | undefined): number {
  throw new globalThis.Error("not implemented"); // @stub
}

export function scheduleSpecToThrift(spec: internal_ScheduleSpec | undefined): shared_IScheduleSpec | undefined {
    if (spec == null) {
        return undefined;
    }
    return new ScheduleSpec({
        cronExpression: StringPtr(spec.CronExpression),
        startTimeNano: timeToThriftNano(spec.StartTime),
        endTimeNano: timeToThriftNano(spec.EndTime),
        jitterInSeconds: durationToThriftSeconds(spec.Jitter),
    });
}

export function scheduleRetryPolicyToThrift(p: internal_RetryPolicy | undefined): shared_IRetryPolicy | undefined {
    if (p == null) {
        return undefined;
    }
    let backoffCoeff = p.BackoffCoefficient;
    if (backoffCoeff === 0) {
        backoffCoeff = DefaultBackoffCoefficient;
    }
    return {
        initialIntervalInSeconds: durationToThriftSeconds(p.InitialInterval),
        backoffCoefficient: Int32Ptr(backoffCoeff),
        maximumIntervalInSeconds: durationToThriftSeconds(p.MaximumInterval),
        expirationIntervalInSeconds: durationToThriftSeconds(p.ExpirationInterval),
        maximumAttempts: Int32Ptr(p.MaximumAttempts),
        nonRetriableErrorReasons: p.NonRetriableErrorReasons!,
    };
}

export function scheduleStartWorkflowActionToThrift(a: internal_ScheduleStartWorkflowAction | undefined, dc: internal_DataConverter): shared_IScheduleStartWorkflowAction | undefined {
    if (a == null) {
        return undefined;
    }
    if (a.WorkflowType === '') {
        throw new Error('StartWorkflow: WorkflowType is required');
    }
    if (a.TaskList === '') {
        throw new Error('StartWorkflow: TaskList is required');
    }
    if (a.ExecutionStartToCloseTimeout <= 0) {
        throw new Error('StartWorkflow: ExecutionStartToCloseTimeout is required');
    }

    let decisionTaskTimeout = a.DecisionTaskStartToCloseTimeout;
    if (decisionTaskTimeout < 0) {
        throw new Error('StartWorkflow: DecisionTaskStartToCloseTimeout must not be negative');
    }
    if (decisionTaskTimeout === 0) {
        decisionTaskTimeout = defaultDecisionTaskTimeoutInSecs * Second;
    }

    let memo: Memo | undefined;
    if (a.Memo != null && Object.keys(a.Memo!).length > 0) {
        const fields: Array<[string, Buffer]> = [];
        for (const [k, v] of Object.entries(a.Memo!)) {
            try {
                const b = encodeArg(dc, v);
                fields.push([k, b]);
            } catch (err) {
                const e = err instanceof Error ? err : new globalThis.Error(String(err));
                throw new Error(`encode memo field ${JSON.stringify(k)}: ${e.message}`);
            }
        }
        memo = new Memo({ fields: new Map(fields) });
    }

    let searchAttr: SearchAttributes | undefined;
    if (a.SearchAttributes != null && Object.keys(a.SearchAttributes!).length > 0) {
        const fields: Array<[string, Buffer]> = [];
        for (const [k, v] of Object.entries(a.SearchAttributes!)) {
            try {
                const encoded = JSON.stringify(v);
                if (encoded === undefined) {
                    throw new Error('unsupported value');
                }
                fields.push([k, Buffer.from(encoded, 'utf8')]);
            } catch (err) {
                const e = err instanceof Error ? err : new globalThis.Error(String(err));
                throw new Error(`encode search attribute ${JSON.stringify(k)}: ${e.message}`);
            }
        }
        searchAttr = new SearchAttributes({ indexedFields: new Map(fields) });
    }

    const input = a.Input != null && a.Input.length > 0 ? a.Input : undefined;

    return new ScheduleStartWorkflowAction({
        workflowType: new WorkflowType({ name: StringPtr(a.WorkflowType!) }),
        taskList: new TaskList({ name: StringPtr(a.TaskList!) }),
        input,
        workflowIdPrefix: StringPtr(a.WorkflowIDPrefix!),
        executionStartToCloseTimeoutSeconds: durationToThriftSeconds(a.ExecutionStartToCloseTimeout),
        taskStartToCloseTimeoutSeconds: durationToThriftSeconds(decisionTaskTimeout),
        retryPolicy: scheduleRetryPolicyToThrift(a.RetryPolicy!),
        memo,
        searchAttributes: searchAttr
    });
}

export function scheduleActionToThrift(a: internal_ScheduleAction | undefined, dc: internal_DataConverter): shared_IScheduleAction | undefined {
    if (a == null) {
        return undefined;
    }
    if (a.StartWorkflow == null) {
        throw new Error('Action.StartWorkflow is required when Action is set');
    }
    const sw = scheduleStartWorkflowActionToThrift(a.StartWorkflow!, dc);
    return new ScheduleAction({ startWorkflow: sw });
}

export function schedulePoliciesToThrift(p: internal_SchedulePolicies | undefined): shared_ISchedulePolicies | undefined {
    if (p == null) {
        return undefined;
    }
    return new SchedulePolicies({
        overlapPolicy: scheduleOverlapPolicyToThrift(p.OverlapPolicy),
        catchUpPolicy: scheduleCatchUpPolicyToThrift(p.CatchUpPolicy),
        catchUpWindowInSeconds: durationToThriftSeconds(p.CatchUpWindow),
        pauseOnFailure: BoolPtr(p.PauseOnFailure),
        bufferLimit: Int32Ptr(p.BufferLimit),
        concurrencyLimit: Int32Ptr(p.ConcurrencyLimit),
    });
}

export function scheduleCreateRequestToThrift(domain: string, r: internal_CreateScheduleRequest | undefined, dc: internal_DataConverter): shared_ICreateScheduleRequest {
  throw new globalThis.Error("not implemented"); // @stub
}

export function scheduleUpdateRequestToThrift(domain: string, r: internal_UpdateScheduleRequest | undefined, dc: internal_DataConverter): shared_IUpdateScheduleRequest {
    if (r == null) {
        throw new Error('Update: request is required');
    }
    if (r.ScheduleID === '') {
        throw new Error('Update: ScheduleID is required');
    }
    if (r.Spec == null && r.Action == null && r.Policies == null && Object.keys(r.SearchAttributes ?? {}).length === 0) {
        throw new Error('Update: at least one of Spec, Action, Policies, or SearchAttributes must be set');
    }
    if (r.Spec != null && r.Spec.CronExpression === '') {
        throw new Error('Update: Spec.CronExpression is required when Spec is set');
    }

    const action = scheduleActionToThrift(r.Action!, dc);

    let searchAttr: SearchAttributes | undefined;
    if (Object.keys(r.SearchAttributes ?? {}).length > 0) {
        const fields: Array<[string, Buffer]> = [];
        for (const [k, v] of Object.entries(r.SearchAttributes ?? {})) {
            try {
                const encoded = JSON.stringify(v);
                if (encoded === undefined) {
                    throw new Error('unsupported value');
                }
                fields.push([k, Buffer.from(encoded, 'utf8')]);
            } catch (err) {
                const e = err instanceof Error ? err : new globalThis.Error(String(err));
                throw new Error(`encode search attribute ${JSON.stringify(k)}: ${e.message}`);
            }
        }
        searchAttr = new SearchAttributes({ indexedFields: new Map(fields) });
    }

    return new UpdateScheduleRequest({
        domain: StringPtr(domain),
        scheduleId: StringPtr(r.ScheduleID),
        spec: scheduleSpecToThrift(r.Spec!),
        action,
        policies: schedulePoliciesToThrift(r.Policies!),
        searchAttributes: searchAttr,
    });
}

export function backfillRequestToThrift(domain: string, scheduleID: string, r: internal_BackfillRequest | undefined): shared_IBackfillScheduleRequest {
  throw new globalThis.Error("not implemented"); // @stub
}

export function scheduleSpecFromThrift(spec: shared_IScheduleSpec | undefined): internal_ScheduleSpec | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function scheduleRetryPolicyFromThrift(p: shared_IRetryPolicy | undefined): internal_RetryPolicy | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function scheduleStartWorkflowActionDescriptionFromThrift(a: shared_IScheduleStartWorkflowAction | undefined): internal_ScheduleStartWorkflowActionDescription | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function scheduleActionDescriptionFromThrift(a: shared_IScheduleAction | undefined): internal_ScheduleActionDescription | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function schedulePoliciesFromThrift(p: shared_ISchedulePolicies | undefined): internal_SchedulePolicies | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function schedulePauseInfoFromThrift(pi: shared_ISchedulePauseInfo | undefined): internal_SchedulePauseInfo | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function scheduleStateFromThrift(st: shared_IScheduleState | undefined): internal_ScheduleState | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function backfillInfoFromThrift(b: shared_IBackfillInfo | undefined): internal_BackfillInfo | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function scheduleInfoFromThrift(si: shared_IScheduleInfo | undefined): internal_ScheduleInfo | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function scheduleListEntryFromThrift(e: shared_IScheduleListEntry | undefined): internal_ScheduleListEntry | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function describeScheduleResponseFromThrift(r: shared_IDescribeScheduleResponse | undefined): internal_DescribeScheduleResponse | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}

export function listSchedulesResponseFromThrift(r: shared_IListSchedulesResponse | undefined): internal_ListSchedulesResponse | undefined {
  throw new globalThis.Error("not implemented"); // @stub
}
