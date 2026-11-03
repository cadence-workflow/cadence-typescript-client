// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import type { WorkflowServiceClientLike } from '../internal/runtime/workflow_service_client_like.js';
import { DomainAPI } from '../generated/proto/cadence-idl/uber/cadence/api/v1/service_domain.js';
import { VisibilityAPI } from '../generated/proto/cadence-idl/uber/cadence/api/v1/service_visibility.js';
import { WorkerAPI } from '../generated/proto/cadence-idl/uber/cadence/api/v1/service_worker.js';
import { WorkflowAPI } from '../generated/proto/cadence-idl/uber/cadence/api/v1/service_workflow.js';
import { NewThrift2ProtoAdapter as compatibility_NewThrift2ProtoAdapter } from '../internal/compatibility/adapter.js';
import { workflow } from '../internal/internal_workflow.js';

/**
 * NewThrift2ProtoAdapter creates an adapter for mapping calls from Thrift to Protobuf types.
 * This is intended to be used as compatibility layer for older client version to be able to
 * communicate with newer cadence server using GRPC.
 */
export function NewThrift2ProtoAdapter(domain: DomainAPI, workflow: WorkflowAPI, worker: WorkerAPI, visibility: VisibilityAPI): WorkflowServiceClientLike {
  return compatibility_NewThrift2ProtoAdapter(domain, workflow, worker, visibility);
}
