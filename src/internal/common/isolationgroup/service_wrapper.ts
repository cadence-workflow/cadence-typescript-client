// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import type { WorkflowServiceClientLike } from '../../runtime/workflow_service_client_like.js';
import * as grpc from '@grpc/grpc-js';

export class workflowServiceIsolationGroupWrapper {
  constructor(init?: Partial<workflowServiceIsolationGroupWrapper>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  service?: WorkflowServiceClientLike;

  isolationGroupIdentifier: string = "";

  getIsolationGroupIdentifier(): unknown {
    const metadata = new grpc.Metadata();
    metadata.set(isolationGroupHeader, this.isolationGroupIdentifier);
    return { metadata };
  }

}

/**
 * NewWorkflowServiceWrapper creates
 */
export function NewWorkflowServiceWrapper(service: WorkflowServiceClientLike, isolationGroup: string): WorkflowServiceClientLike {
  const wrapper = new workflowServiceIsolationGroupWrapper({ service, isolationGroupIdentifier: isolationGroup });
  return new Proxy((service ?? {}) as object, {
    get: (target, prop) => {
      const orig = (target as any)[prop];
      if (typeof orig !== "function") return orig;
      return (...args: any[]) => orig.call(target, ...args, wrapper.getIsolationGroupIdentifier());
    },
  }) as WorkflowServiceClientLike;
}

export const isolationGroupHeader = "cadence-client-isolation-group";
