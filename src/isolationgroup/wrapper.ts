// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import type { WorkflowServiceClientLike } from '../internal/runtime/workflow_service_client_like.js';
import { NewWorkflowServiceWrapper } from '../internal/common/isolationgroup/service_wrapper.js';

/**
 * NewIsolationGroupWrapper creates a client wrapper that sets isolation group header for all requests to cadence server
 */
export function NewIsolationGroupWrapper(service: WorkflowServiceClientLike, isolationGroup: string): WorkflowServiceClientLike {
  return NewWorkflowServiceWrapper(service, isolationGroup);
}
