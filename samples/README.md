# Cadence TypeScript Client — Samples

TypeScript samples for the cadence-typescript-client, mirroring the structure of
https://github.com/cadence-workflow/cadence-samples/tree/master/new_samples.

## Samples

| Sample | Description |
|--------|-------------|
| [hello_world](hello_world/) | Basic workflow that takes an input and returns a greeting via an activity |
| [signal](signal/) | Workflow that waits for boolean signals and exits when signalled to complete |
| [query](query/) | Lunch vote workflow with a query handler that returns formatted markdown results |

## Prerequisites

- Node.js 20+
- A running Cadence server (see [hello_world/README.md](hello_world/README.md))
- The `cadence-samples` domain registered
- **`cadence --env development`** on CLI commands when using local docker-compose (see hello_world README)

## Setup

```bash
npm install
npm --prefix samples install
npm --prefix samples run typecheck
```

Run these commands from the repository root. The first command installs the SDK
dependencies; the second installs the sample runner.

## Running a sample

```bash
npm --prefix samples run hello_world
npm --prefix samples run signal
npm --prefix samples run query
```

The workers use the SDK's real Cadence transport and generated worker/runtime
APIs. Stop a running worker with Ctrl+C.
