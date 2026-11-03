import { internal_FeatureFlags, newChannelContext } from './internal_utils.js';
import { internal_BackfillRequest, internal_CreateScheduleRequest, internal_DescribeScheduleResponse, internal_ListSchedulesResponse, internal_ScheduleCatchUpPolicy, internal_UpdateScheduleRequest } from './schedule.js';
import type { WorkflowServiceClientLike } from './runtime/workflow_service_client_like.js';
import { DeleteScheduleRequest } from '../generated/thrift/cadence-idl/com/uber/cadence/DeleteScheduleRequest.js';
import { StringPtr } from './common/convert.js';
import { retryWhileTransientError } from './internal_retry.js';
import { scheduleUpdateRequestToThrift } from './internal_schedule_convert_thrift.js';
import { internal_DataConverter } from './encoded.js';
import { Context } from './runtime/context.js';

export interface internal_ScheduleClient {
  Create(ctx: Context, request: internal_CreateScheduleRequest): Promise<string>;
  Describe(ctx: Context, scheduleID: string): Promise<internal_DescribeScheduleResponse>;
  Update(ctx: Context, request: internal_UpdateScheduleRequest): Promise<void>;
  Delete(ctx: Context, scheduleID: string): Promise<void>;
  Pause(ctx: Context, scheduleID: string, reason: string): Promise<void>;
  Unpause(ctx: Context, scheduleID: string, reason: string, catchUpPolicy: internal_ScheduleCatchUpPolicy): Promise<void>;
  Backfill(ctx: Context, scheduleID: string, request: internal_BackfillRequest): Promise<void>;
  List(ctx: Context, pageSize: number, nextPageToken: Buffer): Promise<internal_ListSchedulesResponse>;
}

export class scheduleClient implements internal_ScheduleClient {
  constructor(init?: Partial<scheduleClient>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  workflowService?: WorkflowServiceClientLike;

  domain: string = "";

  identity: string = "";

  dataConverter?: internal_DataConverter;

  featureFlags: internal_FeatureFlags = { WorkflowExecutionAlreadyCompletedErrorEnabled: false, AutoforwardingEnabled: false, PollerAutoScalerEnabled: false, EphemeralTaskListsEnabled: false, MetricEmitMode: 0 };

  async Create(ctx: Context, request: internal_CreateScheduleRequest): Promise<string> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async Describe(ctx: Context, scheduleID: string): Promise<internal_DescribeScheduleResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async Update(ctx: Context, request: internal_UpdateScheduleRequest): Promise<void> {
    const thriftReq = scheduleUpdateRequestToThrift(this.domain, request, this.dataConverter!);
    await retryWhileTransientError(ctx, async () => {
      const [tchCtx, cancel, opt] = newChannelContext(ctx, this.featureFlags);
      try {
        await this.workflowService!.UpdateSchedule(tchCtx, thriftReq, ...opt);
      } finally {
        cancel();
      }
    });
  }

  async Delete(ctx: Context, scheduleID: string): Promise<void> {
    if (scheduleID === "") {
      throw new globalThis.Error("Delete: scheduleID is required");
    }
    const req = new DeleteScheduleRequest({
      domain: StringPtr(this.domain),
      scheduleId: StringPtr(scheduleID),
    });
    await retryWhileTransientError(ctx, async () => {
      const [tchCtx, cancel, opt] = newChannelContext(ctx, this.featureFlags);
      try {
        await this.workflowService!.DeleteSchedule(tchCtx, req, ...opt);
      } finally {
        cancel();
      }
    });
  }

  async Pause(ctx: Context, scheduleID: string, reason: string): Promise<void> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async Unpause(ctx: Context, scheduleID: string, reason: string, catchUpPolicy: internal_ScheduleCatchUpPolicy): Promise<void> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async Backfill(ctx: Context, scheduleID: string, request: internal_BackfillRequest): Promise<void> {
    throw new globalThis.Error("not implemented"); // @stub
  }

  async List(ctx: Context, pageSize: number, nextPageToken: Buffer): Promise<internal_ListSchedulesResponse> {
    throw new globalThis.Error("not implemented"); // @stub
  }

}
