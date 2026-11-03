// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { internal_ActiveClusterSelectionPolicy, internal_ClusterAttribute, internal_QueryConsistencyLevel, internal_RetryPolicy } from './client.js';
import { Second } from './runtime/time.js';
import { IActiveClusterSelectionPolicy as shared_IActiveClusterSelectionPolicy, ActiveClusterSelectionPolicy as shared_ActiveClusterSelectionPolicy } from '../generated/thrift/cadence-idl/com/uber/cadence/ActiveClusterSelectionPolicy.js';
import { IClusterAttribute as shared_IClusterAttribute, ClusterAttribute as shared_ClusterAttribute } from '../generated/thrift/cadence-idl/com/uber/cadence/ClusterAttribute.js';
import { QueryConsistencyLevel as shared_QueryConsistencyLevel } from '../generated/thrift/cadence-idl/com/uber/cadence/QueryConsistencyLevel.js';
import { IRetryPolicy as shared_IRetryPolicy, RetryPolicy as shared_RetryPolicy } from '../generated/thrift/cadence-idl/com/uber/cadence/RetryPolicy.js';
import { DefaultBackoffCoefficient } from './common/backoff/retrypolicy.js';
import { Float64Ptr, Int32Ceil, Int32Ptr } from './common/convert.js';

export function convertRetryPolicy(retryPolicy: internal_RetryPolicy | undefined): shared_IRetryPolicy | undefined {
    if (retryPolicy == null) {
        return undefined;
    }

    const thriftRetryPolicy = new shared_RetryPolicy({
        initialIntervalInSeconds: Int32Ptr(Int32Ceil(retryPolicy.InitialInterval / 1e9)),
        maximumIntervalInSeconds: Int32Ptr(Int32Ceil(retryPolicy.MaximumInterval / 1e9)),
        backoffCoefficient: retryPolicy.BackoffCoefficient,
        maximumAttempts: retryPolicy.MaximumAttempts,
        nonRetriableErrorReasons: retryPolicy.NonRetriableErrorReasons!,
        expirationIntervalInSeconds: Int32Ptr(Int32Ceil(retryPolicy.ExpirationInterval / 1e9)),
    });

    if (thriftRetryPolicy.backoffCoefficient === 0) {
        thriftRetryPolicy.backoffCoefficient = Float64Ptr(DefaultBackoffCoefficient);
    }

    return thriftRetryPolicy;
}

export function convertFromThriftRetryPolicy(p: shared_IRetryPolicy | undefined): internal_RetryPolicy | undefined {
  if (p == null) {
    return undefined;
  }
  return {
    InitialInterval: Second * (p.initialIntervalInSeconds ?? 0),
    BackoffCoefficient: p.backoffCoefficient ?? 0,
    MaximumInterval: Second * (p.maximumIntervalInSeconds ?? 0),
    ExpirationInterval: Second * (p.expirationIntervalInSeconds ?? 0),
    MaximumAttempts: p.maximumAttempts ?? 0,
    NonRetriableErrorReasons: p.nonRetriableErrorReasons!,
  };
}

export function convertActiveClusterSelectionPolicy(policy: internal_ActiveClusterSelectionPolicy | undefined): shared_IActiveClusterSelectionPolicy | undefined {
    if (policy == null) {
        return undefined;
    }
    return new shared_ActiveClusterSelectionPolicy({
        clusterAttribute: convertClusterAttribute(policy.ClusterAttribute!),
    });
}

export function convertClusterAttribute(attr: internal_ClusterAttribute | undefined): shared_IClusterAttribute | undefined {
    if (attr == null) {
        return undefined;
    }
    return new shared_ClusterAttribute({
        scope: attr.Scope!,
        name: attr.Name!,
    });
}

export function convertQueryConsistencyLevel(level: internal_QueryConsistencyLevel): shared_QueryConsistencyLevel | undefined {
    switch (level) {
        case internal_QueryConsistencyLevel.QueryConsistencyLevelEventual:
            return shared_QueryConsistencyLevel.EVENTUAL;
        case internal_QueryConsistencyLevel.QueryConsistencyLevelStrong:
            return shared_QueryConsistencyLevel.STRONG;
        default:
            return undefined;
    }
}
