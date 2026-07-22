import { createClient } from "@connectrpc/connect";
import type { Client, Interceptor, Transport } from "@connectrpc/connect";
import { createConnectTransport, createGrpcTransport } from "@connectrpc/connect-node";
import { AdminAPI } from "./gen/uber/cadence/admin/v1/service_pb.js";
import { DomainAPI } from "./gen/uber/cadence/api/v1/service_domain_pb.js";
import { MetaAPI } from "./gen/uber/cadence/api/v1/service_meta_pb.js";
import { VisibilityAPI } from "./gen/uber/cadence/api/v1/service_visibility_pb.js";
import { WorkflowAPI } from "./gen/uber/cadence/api/v1/service_workflow_pb.js";
import { WorkerAPI } from "./gen/uber/cadence/api/v1/service_worker_pb.js";

export type CadenceProtocol = "grpc" | "connect";

export interface CadenceTransportOptions {
  baseUrl: string;
  protocol?: CadenceProtocol;
  interceptors?: Interceptor[];
}

export interface CadenceClients {
  admin: Client<typeof AdminAPI>;
  domain: Client<typeof DomainAPI>;
  meta: Client<typeof MetaAPI>;
  visibility: Client<typeof VisibilityAPI>;
  workflow: Client<typeof WorkflowAPI>;
  worker: Client<typeof WorkerAPI>;
}

export function createCadenceTransport(options: CadenceTransportOptions): Transport {
  const { baseUrl, interceptors, protocol = "grpc" } = options;

  if (protocol === "connect") {
    return interceptors === undefined
      ? createConnectTransport({ baseUrl, httpVersion: "2" })
      : createConnectTransport({ baseUrl, httpVersion: "2", interceptors });
  }

  return interceptors === undefined
    ? createGrpcTransport({ baseUrl })
    : createGrpcTransport({ baseUrl, interceptors });
}

export function createWorkflowClient(
  options: CadenceTransportOptions,
): Client<typeof WorkflowAPI> {
  return createClient(WorkflowAPI, createCadenceTransport(options));
}

export function createCadenceClients(options: CadenceTransportOptions): CadenceClients {
  const transport = createCadenceTransport(options);

  return {
    admin: createClient(AdminAPI, transport),
    domain: createClient(DomainAPI, transport),
    meta: createClient(MetaAPI, transport),
    visibility: createClient(VisibilityAPI, transport),
    workflow: createClient(WorkflowAPI, transport),
    worker: createClient(WorkerAPI, transport),
  };
}

export {
  AdminAPI,
  DomainAPI,
  MetaAPI,
  VisibilityAPI,
  WorkflowAPI,
  WorkerAPI,
};
