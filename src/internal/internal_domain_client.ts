import { DescribeDomainRequest as shared_DescribeDomainRequest } from '../generated/thrift/cadence-idl/com/uber/cadence/DescribeDomainRequest.js';
// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { internal_DomainClient } from './client.js';
import { internal_FeatureFlags, newChannelContext } from './internal_utils.js';
import type { WorkflowServiceClientLike } from './runtime/workflow_service_client_like.js';
import { Context } from './runtime/context.js';
import type { Scope } from './runtime/tally.js';
import { IDescribeDomainResponse as shared_IDescribeDomainResponse } from '../generated/thrift/cadence-idl/com/uber/cadence/DescribeDomainResponse.js';
import { IFailoverDomainRequest as shared_IFailoverDomainRequest } from '../generated/thrift/cadence-idl/com/uber/cadence/FailoverDomainRequest.js';
import { IRegisterDomainRequest as shared_IRegisterDomainRequest } from '../generated/thrift/cadence-idl/com/uber/cadence/RegisterDomainRequest.js';
import { IUpdateDomainRequest as shared_IUpdateDomainRequest } from '../generated/thrift/cadence-idl/com/uber/cadence/UpdateDomainRequest.js';
import { StringPtr } from './common/convert.js';
import { retryWhileTransientError } from './internal_retry.js';

/**
 * domainClient is the client for managing domains.
 */
export class domainClient implements internal_DomainClient {
  constructor(init?: Partial<domainClient>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  workflowService?: WorkflowServiceClientLike;

  metricsScope?: Scope;

  identity: string = "";

  featureFlags: internal_FeatureFlags = { WorkflowExecutionAlreadyCompletedErrorEnabled: false, AutoforwardingEnabled: false, PollerAutoScalerEnabled: false, EphemeralTaskListsEnabled: false, MetricEmitMode: 0 };

  async Register(ctx: Context, request: shared_IRegisterDomainRequest): Promise<void> {
    await retryWhileTransientError(ctx, async () => {
      const [tchCtx, cancel, opt] = newChannelContext(ctx, this.featureFlags);
      try {
        await this.workflowService!.RegisterDomain(tchCtx, request, ...opt);
      } finally {
        cancel();
      }
    });
  }

  async Describe(ctx: Context, name: string): Promise<shared_IDescribeDomainResponse> {
    const request = new shared_DescribeDomainRequest({
      name: StringPtr(name),
    });

    let response: shared_IDescribeDomainResponse | undefined;

    await retryWhileTransientError(ctx, async () => {
      const [tchCtx, cancel, opt] = newChannelContext(ctx, this.featureFlags);
      try {
        response = await this.workflowService!.DescribeDomain(tchCtx, request, ...opt);
      } finally {
        cancel();
      }
    });

    return response!;
  }

  async Update(ctx: Context, request: shared_IUpdateDomainRequest): Promise<void> {
    await retryWhileTransientError(ctx, async () => {
      const [tchCtx, cancel, opt] = newChannelContext(ctx, this.featureFlags);
      try {
        await this.workflowService!.UpdateDomain(tchCtx, request, ...opt);
      } finally {
        cancel();
      }
    });
  }

  async Failover(ctx: Context, request: shared_IFailoverDomainRequest): Promise<void> {
    await retryWhileTransientError(ctx, async () => {
      const [tchCtx, cancel, opt] = newChannelContext(ctx, this.featureFlags);
      try {
        await this.workflowService!.FailoverDomain(tchCtx, request, ...opt);
      } finally {
        cancel();
      }
    });
  }

}
