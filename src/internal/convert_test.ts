// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { Second } from './runtime/time.js';
import { expect } from 'vitest';
import { StringPtr, Float64Ptr, Int32Ptr } from './common/convert.js';
import { convertActiveClusterSelectionPolicy, convertQueryConsistencyLevel, convertRetryPolicy } from './convert.js';
import { ActiveClusterSelectionPolicy } from '../generated/thrift/cadence-idl/com/uber/cadence/ActiveClusterSelectionPolicy.js';
import { ClusterAttribute } from '../generated/thrift/cadence-idl/com/uber/cadence/ClusterAttribute.js';
import { internal_ActiveClusterSelectionPolicy, internal_QueryConsistencyLevel, internal_RetryPolicy } from './client.js';
import { QueryConsistencyLevel } from '../generated/thrift/cadence-idl/com/uber/cadence/QueryConsistencyLevel.js';
import { RetryPolicy } from '../generated/thrift/cadence-idl/com/uber/cadence/RetryPolicy.js';

export function TestConvertRetryPolicy(): void {
    const tests: {
        name: string;
        retryPolicy: internal_RetryPolicy | undefined;
        thriftPolicy: ReturnType<typeof convertRetryPolicy>;
    }[] = [
        {
            name: "nil retry policy - return nil",
            retryPolicy: undefined,
            thriftPolicy: undefined,
        },
        {
            name: "non-zero backoff coefficient - use provided",
            retryPolicy: {
                InitialInterval: 1 * Second,
                MaximumInterval: 10 * Second,
                BackoffCoefficient: 2.0,
                MaximumAttempts: 3,
                NonRetriableErrorReasons: ["error1", "error2"],
                ExpirationInterval: 10 * Second,
            },
            thriftPolicy: new RetryPolicy({
                initialIntervalInSeconds: Int32Ptr(1)!,
                maximumIntervalInSeconds: Int32Ptr(10)!,
                backoffCoefficient: Float64Ptr(2.0)!,
                maximumAttempts: Int32Ptr(3)!,
                nonRetriableErrorReasons: ["error1", "error2"],
                expirationIntervalInSeconds: Int32Ptr(10)!,
            }),
        },
        {
            name: "zero backoff coefficient - use default",
            retryPolicy: {
                InitialInterval: 1 * Second,
                MaximumInterval: 10 * Second,
                BackoffCoefficient: 0.0,
                MaximumAttempts: 3,
                NonRetriableErrorReasons: ["error1", "error2"],
                ExpirationInterval: 10 * Second,
            },
            thriftPolicy: new RetryPolicy({
                initialIntervalInSeconds: Int32Ptr(1)!,
                maximumIntervalInSeconds: Int32Ptr(10)!,
                backoffCoefficient: Float64Ptr(2.0)!,
                maximumAttempts: Int32Ptr(3)!,
                nonRetriableErrorReasons: ["error1", "error2"],
                expirationIntervalInSeconds: Int32Ptr(10)!,
            }),
        },
    ];

    for (const test of tests) {
        const thriftPolicy = convertRetryPolicy(test.retryPolicy);
        expect(thriftPolicy).toEqual(test.thriftPolicy);
    }
}

export function TestConvertActiveClusterSelectionPolicy(): void {
    const tests: {
        name: string;
        policy: internal_ActiveClusterSelectionPolicy | undefined;
        thriftPolicy: ActiveClusterSelectionPolicy | undefined;
        wantErr: boolean;
    }[] = [
        {
            name: "nil policy - return nil",
            policy: undefined,
            thriftPolicy: undefined,
            wantErr: false,
        },
        {
            name: "empty policy",
            policy: {},
            thriftPolicy: new ActiveClusterSelectionPolicy({}),
            wantErr: false,
        },
        {
            name: "valid policy",
            policy: {
                ClusterAttribute: {
                    Scope: "region",
                    Name: "us-east-1",
                },
            },
            thriftPolicy: new ActiveClusterSelectionPolicy({
                clusterAttribute: new ClusterAttribute({
                    scope: StringPtr("region"),
                    name: StringPtr("us-east-1"),
                }),
            }),
            wantErr: false,
        },
    ];

    for (const test of tests) {
        if (test.wantErr) {
            expect(() => convertActiveClusterSelectionPolicy(test.policy)).toThrow();
        } else {
            const thriftPolicy = convertActiveClusterSelectionPolicy(test.policy);
            expect(thriftPolicy).toEqual(test.thriftPolicy);
        }
    }
}

export function TestConvertQueryConsistencyLevel(): void {
    const tests: {
        name: string;
        level: internal_QueryConsistencyLevel;
        expectedThrift: QueryConsistencyLevel | undefined;
    }[] = [
        {
            name: "QueryConsistencyLevelUnspecified - return nil",
            level: internal_QueryConsistencyLevel.QueryConsistencyLevelUnspecified,
            expectedThrift: undefined,
        },
        {
            name: "QueryConsistencyLevelEventual - return eventual",
            level: internal_QueryConsistencyLevel.QueryConsistencyLevelEventual,
            expectedThrift: QueryConsistencyLevel.EVENTUAL,
        },
        {
            name: "QueryConsistencyLevelStrong - return strong",
            level: internal_QueryConsistencyLevel.QueryConsistencyLevelStrong,
            expectedThrift: QueryConsistencyLevel.STRONG,
        },
        {
            name: "invalid level (999) - return nil",
            level: 999 as internal_QueryConsistencyLevel,
            expectedThrift: undefined,
        },
    ];

    for (const test of tests) {
        const result = convertQueryConsistencyLevel(test.level);
        expect(result).toEqual(test.expectedThrift);
    }
}
