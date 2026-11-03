// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import type { WorkflowServiceClientLike } from '../../runtime/workflow_service_client_like.js';

export interface JWTClaims {
  RegisteredClaims: unknown;
  Sub: string;
  Name: string;
  Groups: string;
  Admin: boolean;
  TTL: number;
}

export interface auth_AuthorizationProvider {
  GetAuthToken(): Buffer;
}

export class workflowServiceAuthWrapper {
  constructor(init?: Partial<workflowServiceAuthWrapper>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  service?: WorkflowServiceClientLike;

  authProvider?: auth_AuthorizationProvider;

  getYarpcJWTHeader(): unknown {
    throw new globalThis.Error("not implemented"); // @stub
  }

}

/**
 * NewWorkflowServiceWrapper creates
 */
export function NewWorkflowServiceWrapper(service: WorkflowServiceClientLike, authorizationProvider: auth_AuthorizationProvider): WorkflowServiceClientLike {
  const wrapper = new workflowServiceAuthWrapper({ service, authProvider: authorizationProvider });
  return new Proxy((service ?? {}) as object, {
    get: (target, prop) => {
      const orig = (target as any)[prop];
      if (typeof orig !== "function") return orig;
      return async (...args: any[]) => {
        const opt = await wrapper.getYarpcJWTHeader();
        return orig.call(target, ...args, opt);
      };
    },
  }) as WorkflowServiceClientLike;
}

export const jwtHeaderName = "cadence-authorization";
