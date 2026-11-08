// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { expect } from 'vitest';

import { Error as proto_Error } from './proto/error.js';
import { Error as thrift_Error } from './thrift/error.js';
import { AccessDeniedError, BadRequestError, CancellationAlreadyRequestedError, ClientVersionNotSupportedError, DomainAlreadyExistsError, DomainNotActiveError, EntityNotExistsError, FeatureNotEnabledError, InternalServiceError, LimitExceededError, QueryFailedError, ServiceBusyError, WorkflowExecutionAlreadyCompletedError, WorkflowExecutionAlreadyStartedError } from '../../errors/idl_errors.js';
export function TestErrors(): void {
  const errors: Array<Error | null> = [
    null,
    new AccessDeniedError(),
    new BadRequestError(),
    new CancellationAlreadyRequestedError({}),
    new ClientVersionNotSupportedError({}),
    new DomainAlreadyExistsError({}),
    new DomainNotActiveError({}),
    new EntityNotExistsError({}),
    new FeatureNotEnabledError({}),
    new WorkflowExecutionAlreadyCompletedError({}),
    new InternalServiceError(),
    new LimitExceededError({}),
    new QueryFailedError({}),
    new ServiceBusyError({}),
    new WorkflowExecutionAlreadyStartedError({}),
    new globalThis.Error(),
  ];

  for (const err of errors) {
    thrift_Error(err);
    expect(proto_Error(err)).toEqual(err);
  }

  const timeout = new globalThis.Error("timeout");
  thrift_Error(timeout);
}
