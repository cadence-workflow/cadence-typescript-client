# Cadence TypeScript SDK

[Cadence](https://github.com/cadence-workflow/cadence) is a distributed, scalable,
durable, and highly available orchestration engine for executing asynchronous,
long-running business logic.

If you would like to propose a feature, join the
[CNCF Slack workspace](https://communityinviter.com/apps/cloud-native/cncf) and
start a discussion in **#cadence-users**.

This repository is the foundation of a Cadence SDK for TypeScript.

## Project Status

The SDK is under active development and is **not yet ready for production use**.
It is not currently published to npm.

## Installation

The package is not yet available from npm. To develop it locally, clone the
repository and install its dependencies:

```bash
git clone --recurse-submodules https://github.com/cadence-workflow/cadence-typescript-client.git
cd cadence-typescript-client
npm install
```

The project requires Node.js `>=22` and npm `>=10.9.3`.

## Usage

Create a typed client for the Cadence Workflow API:

```ts
import { createWorkflowClient } from "cadence-typescript-client";

const workflow = createWorkflowClient({
  baseUrl: "http://127.0.0.1:7833",
});
```

Native gRPC is the default protocol. You can also create every currently
supported service client with one shared transport:

```ts
import { createCadenceClients } from "cadence-typescript-client";

const cadence = createCadenceClients({
  baseUrl: "http://127.0.0.1:7833",
  protocol: "grpc",
});

const response = await cadence.workflow.getClusterInfo({});
```

Generated Cadence API types are exported from
`cadence-typescript-client/api/v1` and
`cadence-typescript-client/admin/v1`. Raw generated modules are available
through the `cadence-typescript-client/gen/*` package export for advanced use.

## Development

### Setup

Install the dependencies:

```bash
make install
```

Or use npm directly:

```bash
npm install
```

### Generate Protobuf Files

Regenerate TypeScript bindings after changing files under `idls/proto/`:

```bash
make generate
```

Or run the npm script directly:

```bash
npm run generate
```

Generation prepares the `idls` submodule when needed and writes checked-in
Protobuf-ES bindings to `src/gen/`. Regular builds do not require regeneration.

### Test

Run the main checks:

```bash
make lint-proto
make typecheck
make build
make test
```

Run the complete pull request check:

```bash
make pr
```

### Development Commands

The repository workflow is centered on these Make targets:

```bash
make install
make generate
make lint-proto
make typecheck
make build
make test
make clean
make pr
```

`make clean` removes build and test artifacts while preserving the checked-in
generated bindings.

## License

Apache 2.0 License; see [LICENSE](LICENSE) for details.
