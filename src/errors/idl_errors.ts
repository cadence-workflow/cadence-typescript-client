// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
/**
 * IDL error types (thrift exceptions) as real, constructable Error subclasses.
 * The proto/thrift generated artifacts represent these as a data interface + codec
 * (not a class), so `new X()` / `x instanceof X` cannot work against them. Go uses
 * them as errors (construct, throw, errors.As), so the SDK routes those references
 * here. Mirrors how local Go error structs become `class X extends Error`.
 *
 * `.message` is set to Go's thriftrw `.Error()`/`.String()` format,
 * `TypeName{Field: value, ...}`, so wrapping an IDL error into another error string
 * (Go `fmt.Errorf("...: %v", err)`) reproduces Go byte-for-byte. Field names are the
 * exported Go names (thriftrw capitalizes the .thrift field), derived here from the
 * init keys — a generation-time transform, NOT runtime reflection.
 */

function goThriftErrorString(typeName: string, init?: Record<string, unknown>): string {
  if (init === undefined) {
    return typeName + "{}";
  }
  const parts = Object.entries(init).map(([key, value]) => {
    const field = key.length === 0 ? key : key.charAt(0).toUpperCase() + key.slice(1);
    return field + ": " + String(value);
  });
  return typeName + "{" + parts.join(", ") + "}";
}

export class AccessDeniedError extends Error {
  constructor(init?: Record<string, unknown>) {
    super();
    if (init !== undefined) {
      Object.assign(this, init);
    }
    this.name = "AccessDeniedError";
    this.message = goThriftErrorString("AccessDeniedError", init);
  }
  Error(): string {
    return this.message;
  }
  GetMessage(): string {
    return this.message;
  }
}

export class BadRequestError extends Error {
  constructor(init?: Record<string, unknown>) {
    super();
    if (init !== undefined) {
      Object.assign(this, init);
    }
    this.name = "BadRequestError";
    this.message = goThriftErrorString("BadRequestError", init);
  }
  Error(): string {
    return this.message;
  }
  GetMessage(): string {
    return this.message;
  }
}

export class CancellationAlreadyRequestedError extends Error {
  constructor(init?: Record<string, unknown>) {
    super();
    if (init !== undefined) {
      Object.assign(this, init);
    }
    this.name = "CancellationAlreadyRequestedError";
    this.message = goThriftErrorString("CancellationAlreadyRequestedError", init);
  }
  Error(): string {
    return this.message;
  }
  GetMessage(): string {
    return this.message;
  }
}

export class ClientVersionNotSupportedError extends Error {
  featureVersion?: string;
  clientImpl?: string;
  supportedVersions?: string;
  constructor(init?: Record<string, unknown>) {
    super();
    if (init !== undefined) {
      Object.assign(this, init);
    }
    this.name = "ClientVersionNotSupportedError";
    this.message = goThriftErrorString("ClientVersionNotSupportedError", init);
  }
  Error(): string {
    return this.message;
  }
  GetFeatureVersion(): string {
    return this.featureVersion ?? "";
  }
  GetClientImpl(): string {
    return this.clientImpl ?? "";
  }
  GetSupportedVersions(): string {
    return this.supportedVersions ?? "";
  }
}

export class CurrentBranchChangedError extends Error {
  currentBranchToken?: Buffer;
  constructor(init?: Record<string, unknown>) {
    super();
    if (init !== undefined) {
      Object.assign(this, init);
    }
    this.name = "CurrentBranchChangedError";
    this.message = goThriftErrorString("CurrentBranchChangedError", init);
  }
  Error(): string {
    return this.message;
  }
  GetMessage(): string {
    return this.message;
  }
  GetCurrentBranchToken(): Buffer {
    return this.currentBranchToken ?? Buffer.alloc(0);
  }
}

export class DomainAlreadyExistsError extends Error {
  constructor(init?: Record<string, unknown>) {
    super();
    if (init !== undefined) {
      Object.assign(this, init);
    }
    this.name = "DomainAlreadyExistsError";
    this.message = goThriftErrorString("DomainAlreadyExistsError", init);
  }
  Error(): string {
    return this.message;
  }
  GetMessage(): string {
    return this.message;
  }
}

export class DomainNotActiveError extends Error {
  domainName?: string;
  currentCluster?: string;
  activeCluster?: string;
  activeClusters?: string[];
  constructor(init?: Record<string, unknown>) {
    super();
    if (init !== undefined) {
      Object.assign(this, init);
    }
    this.name = "DomainNotActiveError";
    this.message = goThriftErrorString("DomainNotActiveError", init);
  }
  Error(): string {
    return this.message;
  }
  GetMessage(): string {
    return this.message;
  }
  GetDomainName(): string {
    return this.domainName ?? "";
  }
  GetCurrentCluster(): string {
    return this.currentCluster ?? "";
  }
  GetActiveCluster(): string {
    return this.activeCluster ?? "";
  }
  GetActiveClusters(): string[] {
    return this.activeClusters ?? [];
  }
}

export class EntityNotExistsError extends Error {
  currentCluster?: string;
  activeCluster?: string;
  activeClusters?: string[];
  constructor(init?: Record<string, unknown>) {
    super();
    if (init !== undefined) {
      Object.assign(this, init);
    }
    this.name = "EntityNotExistsError";
    this.message = goThriftErrorString("EntityNotExistsError", init);
  }
  Error(): string {
    return this.message;
  }
  GetMessage(): string {
    return this.message;
  }
  GetCurrentCluster(): string {
    return this.currentCluster ?? "";
  }
  GetActiveCluster(): string {
    return this.activeCluster ?? "";
  }
  GetActiveClusters(): string[] {
    return this.activeClusters ?? [];
  }
}

export class EventAlreadyStartedError extends Error {
  constructor(init?: Record<string, unknown>) {
    super();
    if (init !== undefined) {
      Object.assign(this, init);
    }
    this.name = "EventAlreadyStartedError";
    this.message = goThriftErrorString("EventAlreadyStartedError", init);
  }
  Error(): string {
    return this.message;
  }
  GetMessage(): string {
    return this.message;
  }
}

export class FeatureNotEnabledError extends Error {
  featureFlag?: string;
  constructor(init?: Record<string, unknown>) {
    super();
    if (init !== undefined) {
      Object.assign(this, init);
    }
    this.name = "FeatureNotEnabledError";
    this.message = goThriftErrorString("FeatureNotEnabledError", init);
  }
  Error(): string {
    return this.message;
  }
  GetFeatureFlag(): string {
    return this.featureFlag ?? "";
  }
}

export class InternalDataInconsistencyError extends Error {
  constructor(init?: Record<string, unknown>) {
    super();
    if (init !== undefined) {
      Object.assign(this, init);
    }
    this.name = "InternalDataInconsistencyError";
    this.message = goThriftErrorString("InternalDataInconsistencyError", init);
  }
  Error(): string {
    return this.message;
  }
  GetMessage(): string {
    return this.message;
  }
}

export class InternalServiceError extends Error {
  constructor(init?: Record<string, unknown>) {
    super();
    if (init !== undefined) {
      Object.assign(this, init);
    }
    this.name = "InternalServiceError";
    this.message = goThriftErrorString("InternalServiceError", init);
  }
  Error(): string {
    return this.message;
  }
  GetMessage(): string {
    return this.message;
  }
}

export class LimitExceededError extends Error {
  constructor(init?: Record<string, unknown>) {
    super();
    if (init !== undefined) {
      Object.assign(this, init);
    }
    this.name = "LimitExceededError";
    this.message = goThriftErrorString("LimitExceededError", init);
  }
  Error(): string {
    return this.message;
  }
  GetMessage(): string {
    return this.message;
  }
}

export class QueryFailedError extends Error {
  constructor(init?: Record<string, unknown>) {
    super();
    if (init !== undefined) {
      Object.assign(this, init);
    }
    this.name = "QueryFailedError";
    this.message = goThriftErrorString("QueryFailedError", init);
  }
  Error(): string {
    return this.message;
  }
  GetMessage(): string {
    return this.message;
  }
}

export class RemoteSyncMatchedError extends Error {
  constructor(init?: Record<string, unknown>) {
    super();
    if (init !== undefined) {
      Object.assign(this, init);
    }
    this.name = "RemoteSyncMatchedError";
    this.message = goThriftErrorString("RemoteSyncMatchedError", init);
  }
  Error(): string {
    return this.message;
  }
  GetMessage(): string {
    return this.message;
  }
}

export class RetryTaskV2Error extends Error {
  domainId?: string;
  workflowId?: string;
  runId?: string;
  startEventId?: number | { toNumber(): number };
  startEventVersion?: number | { toNumber(): number };
  endEventId?: number | { toNumber(): number };
  endEventVersion?: number | { toNumber(): number };
  constructor(init?: Record<string, unknown>) {
    super();
    if (init !== undefined) {
      Object.assign(this, init);
    }
    this.name = "RetryTaskV2Error";
    this.message = goThriftErrorString("RetryTaskV2Error", init);
  }
  Error(): string {
    return this.message;
  }
  GetMessage(): string {
    return this.message;
  }
  GetDomainId(): string {
    return this.domainId ?? "";
  }
  GetWorkflowId(): string {
    return this.workflowId ?? "";
  }
  GetRunId(): string {
    return this.runId ?? "";
  }
  GetStartEventId(): number {
    const v = this.startEventId;
    return v == null ? 0 : typeof v === "number" ? v : v.toNumber();
  }
  GetStartEventVersion(): number {
    const v = this.startEventVersion;
    return v == null ? 0 : typeof v === "number" ? v : v.toNumber();
  }
  GetEndEventId(): number {
    const v = this.endEventId;
    return v == null ? 0 : typeof v === "number" ? v : v.toNumber();
  }
  GetEndEventVersion(): number {
    const v = this.endEventVersion;
    return v == null ? 0 : typeof v === "number" ? v : v.toNumber();
  }
}

export class ServiceBusyError extends Error {
  reason?: string;
  constructor(init?: Record<string, unknown>) {
    super();
    if (init !== undefined) {
      Object.assign(this, init);
    }
    this.name = "ServiceBusyError";
    this.message = goThriftErrorString("ServiceBusyError", init);
  }
  Error(): string {
    return this.message;
  }
  GetMessage(): string {
    return this.message;
  }
  GetReason(): string {
    return this.reason ?? "";
  }
}

export class ShardOwnershipLostError extends Error {
  owner?: string;
  constructor(init?: Record<string, unknown>) {
    super();
    if (init !== undefined) {
      Object.assign(this, init);
    }
    this.name = "ShardOwnershipLostError";
    this.message = goThriftErrorString("ShardOwnershipLostError", init);
  }
  Error(): string {
    return this.message;
  }
  GetMessage(): string {
    return this.message;
  }
  GetOwner(): string {
    return this.owner ?? "";
  }
}

export class StickyWorkerUnavailableError extends Error {
  constructor(init?: Record<string, unknown>) {
    super();
    if (init !== undefined) {
      Object.assign(this, init);
    }
    this.name = "StickyWorkerUnavailableError";
    this.message = goThriftErrorString("StickyWorkerUnavailableError", init);
  }
  Error(): string {
    return this.message;
  }
  GetMessage(): string {
    return this.message;
  }
}

export class TaskListNotOwnedByHostError extends Error {
  ownedByIdentity?: string;
  myIdentity?: string;
  tasklistName?: string;
  constructor(init?: Record<string, unknown>) {
    super();
    if (init !== undefined) {
      Object.assign(this, init);
    }
    this.name = "TaskListNotOwnedByHostError";
    this.message = goThriftErrorString("TaskListNotOwnedByHostError", init);
  }
  Error(): string {
    return this.message;
  }
  GetOwnedByIdentity(): string {
    return this.ownedByIdentity ?? "";
  }
  GetMyIdentity(): string {
    return this.myIdentity ?? "";
  }
  GetTasklistName(): string {
    return this.tasklistName ?? "";
  }
}

export class WorkflowExecutionAlreadyCompletedError extends Error {
  constructor(init?: Record<string, unknown>) {
    super();
    if (init !== undefined) {
      Object.assign(this, init);
    }
    this.name = "WorkflowExecutionAlreadyCompletedError";
    this.message = goThriftErrorString("WorkflowExecutionAlreadyCompletedError", init);
  }
  Error(): string {
    return this.message;
  }
  GetMessage(): string {
    return this.message;
  }
}

export class WorkflowExecutionAlreadyStartedError extends Error {
  startRequestId?: string;
  runId?: string;
  constructor(init?: Record<string, unknown>) {
    super();
    if (init !== undefined) {
      Object.assign(this, init);
    }
    this.name = "WorkflowExecutionAlreadyStartedError";
    this.message = goThriftErrorString("WorkflowExecutionAlreadyStartedError", init);
  }
  Error(): string {
    return this.message;
  }
  GetMessage(): string {
    return this.message;
  }
  GetStartRequestId(): string {
    return this.startRequestId ?? "";
  }
  GetRunId(): string {
    return this.runId ?? "";
  }
}
