import { describe, expect, it } from "vitest";
import {
  WorkflowAPI,
  createCadenceClients,
  createCadenceTransport,
  createWorkflowClient,
} from "../src/index.js";

describe("Cadence client scaffold", () => {
  it("exports generated Cadence service descriptors", () => {
    expect(WorkflowAPI.typeName).toBe("uber.cadence.api.v1.WorkflowAPI");
  });

  it("creates typed service clients without opening a network connection", () => {
    const options = { baseUrl: "http://127.0.0.1:7833" };

    expect(createWorkflowClient(options)).toBeTypeOf("object");
    expect(createCadenceClients(options).workflow).toBeTypeOf("object");
  });

  it("selects grpc or connect transport based on protocol", () => {
    const baseUrl = "http://127.0.0.1:7833";

    const grpcTransport = createCadenceTransport({ baseUrl, protocol: "grpc" });
    const connectTransport = createCadenceTransport({ baseUrl, protocol: "connect" });

    expect(grpcTransport).toBeTypeOf("object");
    expect(connectTransport).toBeTypeOf("object");
    expect(grpcTransport).not.toBe(connectTransport);
  });
});

describe("built package exports", () => {
  it("loads compiled entrypoints from dist", async () => {
    const dist = await import("../dist/index.js");

    expect(dist.WorkflowAPI.typeName).toBe("uber.cadence.api.v1.WorkflowAPI");
    expect(dist.createWorkflowClient({ baseUrl: "http://127.0.0.1:7833" })).toBeTypeOf("object");
  });

  it("resolves generated deep imports with .js specifiers", async () => {
    const common = await import(
      "../dist/gen/uber/cadence/api/v1/common_pb.js"
    );

    expect(common.WorkflowExecutionSchema).toBeTypeOf("object");
  });
});
