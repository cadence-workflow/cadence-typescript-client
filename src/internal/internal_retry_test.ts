// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { background } from './runtime/context.js';
import { expect } from 'vitest';
import { isServiceTransientError, retryWhileTransientError } from './internal_retry.js';
import { errShutdown } from './internal_worker_base.js';
import { AccessDeniedError, BadRequestError, CancellationAlreadyRequestedError, ClientVersionNotSupportedError, CurrentBranchChangedError, DomainAlreadyExistsError, DomainNotActiveError, EntityNotExistsError, FeatureNotEnabledError, InternalDataInconsistencyError, InternalServiceError, LimitExceededError, QueryFailedError, RemoteSyncMatchedError, RetryTaskV2Error, ServiceBusyError, WorkflowExecutionAlreadyCompletedError, WorkflowExecutionAlreadyStartedError } from '../errors/idl_errors.js';

export function TestErrRetries(): void {
    const retryableErrors = [
        new ServiceBusyError({ message: "" }),
        new InternalServiceError({ message: "" }),
        new Error("unrecognized"),
        new CurrentBranchChangedError({ message: "", currentBranchToken: Buffer.alloc(0) }),
        new RetryTaskV2Error({ message: "" }),
        new RemoteSyncMatchedError({ message: "" }),
        new InternalDataInconsistencyError({ message: "" }),
    ];

    for (const err of retryableErrors) {
        const retryable = isServiceTransientError(err as unknown as Error);
        expect(retryable).toBe(true);
    }

    const terminalErrors = [
        new AccessDeniedError({ message: "" }),
        new BadRequestError({ message: "" }),
        new CancellationAlreadyRequestedError({ message: "" }),
        new ClientVersionNotSupportedError({
            featureVersion: "",
            clientImpl: "",
            supportedVersions: "",
        }),
        new DomainAlreadyExistsError({ message: "" }),
        new DomainNotActiveError({
            message: "",
            domainName: "",
            currentCluster: "",
            activeCluster: "",
            activeClusters: [],
        }),
        new EntityNotExistsError({ message: "", activeClusters: [] } as any),
        new FeatureNotEnabledError({ featureFlag: "" }),
        new LimitExceededError({ message: "" }),
        new QueryFailedError({ message: "" }),
        new WorkflowExecutionAlreadyCompletedError({ message: "" }),
        new WorkflowExecutionAlreadyStartedError({} as any),
        errShutdown,
    ];

    for (const err of terminalErrors) {
        const retryable = isServiceTransientError(err as unknown as Error);
        expect(retryable).toBe(false);
    }
}

export async function TestRetryWhileTransientError(): Promise<void> {
    const testcases: {
        name: string;
        errors: (InternalServiceError | AccessDeniedError | null)[];
        expectedError: InternalServiceError | AccessDeniedError | null;
    }[] = [
        {
            name: 'Immediately return success',
            errors: [null],
            expectedError: null,
        },
        {
            name: 'Success after retriable error',
            errors: [new InternalServiceError({ message: '' }), null],
            expectedError: null,
        },
        {
            name: 'AccessDenied should not be retried',
            errors: [new AccessDeniedError({ message: '' })],
            expectedError: new AccessDeniedError({ message: '' }),
        },
        {
            name: 'Multiple errors until non-retriable',
            errors: [
                new InternalServiceError({ message: '' }),
                new InternalServiceError({ message: '' }),
                new AccessDeniedError({ message: '' }),
            ],
            expectedError: new AccessDeniedError({ message: '' }),
        },
    ];

    for (const tt of testcases) {
        let i = 0;
        let err: InternalServiceError | AccessDeniedError | null = null;

        try {
            await retryWhileTransientError(background(), () => {
                const e = tt.errors[i];
                i++;
                if (e !== null) {
                    throw e;
                }
            });
        } catch (caught) {
            err = caught as InternalServiceError | AccessDeniedError;
        }

        expect(i).toEqual(tt.errors.length);
        expect(err).toEqual(tt.expectedError);
    }
}
