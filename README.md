# Cadence TypeScript Client

TypeScript SDK foundation for Cadence clients. The repository follows the Cadence Python client's IDL dependency model: Cadence protobuf definitions live under `idls/`, generated language bindings live under `src/gen/`, and `make generate` refreshes generated code. Generated bindings are checked in so regular builds do not require code generation.

## Development

Install dependencies:

```bash
npm install
```

Prepare IDL and generate TypeScript bindings:

```bash
npm run generate
```

`scripts/prepare-idl.mjs` initializes the checked-out `idls` submodule when needed. In local workspaces without a submodule checkout, it can also seed `idls/proto/` from a sibling `../cadence-idl` checkout.

`npm run clean` removes build and test artifacts only. Checked-in generated bindings under `src/gen/` are preserved so `npm run build` works without rerunning code generation.

Run the local checks:

```bash
npm run build
npm test
```

Or run the same flow through Make:

```bash
make pr
```

## Architecture

- **Dependencies:** native ESM, NodeNext module resolution, explicit package exports, an npm v3 lockfile, and runtime dependencies separated from generation and test tooling.
- **IDL:** Buf generates checked-in Protobuf-ES v2 descriptors from the Cadence IDL submodule with `npm run generate`.
- **gRPC:** `@connectrpc/connect-node` supplies HTTP/2 gRPC and Connect transports; `createWorkflowClient()` defaults to native gRPC for Cadence servers.

## gRPC Usage

```ts
import { createWorkflowClient } from "cadence-typescript-client";

const workflow = createWorkflowClient({
  baseUrl: "http://127.0.0.1:7833",
  protocol: "grpc",
});
```

The generated Cadence API descriptors are exported from `cadence-typescript-client/api/v1` and `cadence-typescript-client/admin/v1`. Raw generated files are available under the `./gen/*` package export for advanced usage.
