# cadence-typescript-client — v4-luna

A TypeScript port of the [Uber Cadence Go client](https://github.com/uber-go/cadence-client),
produced by the [condorance](https://github.com/condorance/condorance) Go→TypeScript
generator with `gpt-5.6-luna` filling function bodies over a deterministic skeleton.

**The generated worker engine runs workflows end-to-end against a real Cadence server
with zero manual patches to generated code.** The server hands the engine a decision
task; the engine decodes the history, replays it, drives the workflow function through
its coroutine dispatcher, consumes signals, runs activities, decodes arguments,
serializes results, and the server records `WorkflowExecutionCompleted`. The drop ships
with a 50-file integration test suite verified against a live server — coverage exceeds the
upstream go-client integration suite for several APIs (async activity completion,
MutableSideEffect, SignalExternalWorkflow are e2e-tested here but unit-test-only
upstream). See [COVERAGE.md](COVERAGE.md) for the case-by-case matrix against the 42
upstream integration cases, the canary suite, and the cadence-samples recipes.

## What is generated, what is hand-written

Everything that contains translated Go logic is generated. The hand-written surface is the
host wiring any SDK needs — an entry point has to exist somewhere — and nothing else:

| Layer | Files | Status |
|---|---|---|
| Engine: pollers, task handlers, coroutine dispatcher, decision state machine, history replay, signal channels, arg/result serialization | `src/internal/**`, `src/worker/**`, `src/workflow/**`, `src/client/**`, … | **Generated** (LLM body fill over a deterministic skeleton) |
| IDL types and codecs | `src/generated/**` (ts-proto / thrift artifacts), `src/compatibility/**` | **Generated** |
| Runtime shims (`Ref`, channels, clock, context, sync, …) | `src/internal/runtime/*` | **Generated deterministically** — emitted by the generator from its own templates on every run; no LLM output, no per-run edits |
| Service-client binding | `src/workflow_service_client.ts` | **Hand-written** — a Proxy that binds the *generated* `WorkflowServiceClientLike` interface to the wire through the *generated* per-method codec table; contains no translated logic |
| Network socket | the socket halves of `src/grpc_rpc.ts` and `src/thrift_yarpc_transport.ts` | **Hand-written** — payload construction and dispatch around them are generated |
| Integration tests | `tests/integration/*.test.ts` (50 files) | **Hand-written** test harness (registers workflows, starts workers, and drives the server through the SDK client) |

Rule of thumb: if a file translates a Go function, it is generated and is never edited by
hand — fixes go into the generator and the file is regenerated.

## The proven end-to-end path

The integration tests exercise this chain against a live server; all of it is generated except
the socket:

```
worker.New → internal.NewWorker
  → decision-task poller           PollForDecisionTask (long-poll loop)
  → workflow task handler          decodes the history event stream
  → history replay                 re-executes the workflow deterministically per decision task
  → coroutine dispatcher           suspends and resumes workflow coroutines
  → argument decode                start input → the workflow function's parameters
  → the workflow function          GetSignalChannel(ctx).Receive(ctx, box) blocks on an empty channel
  → signal delivery                each signal arrives on its own decision task and wakes the coroutine
  → decision generation            CompleteWorkflowExecution once the function returns
  → RespondDecisionTaskCompleted   accepted by the server
  → result serialization           the return value lands in the WorkflowExecutionCompleted event
```

## How to test

1. Start a Cadence server with its gRPC frontend available at `127.0.0.1:7833`.
   The suite uses the built-in `default` domain; set `CADENCE_DOMAIN` to override it.
   The suite does not depend on Docker or a particular container name.

2. Install and run the integration tests:

   ```sh
   npm install
   npm run typecheck:integration
   npm run test:integration
   ```

   The tests start the generated worker in-process and use the SDK client for workflow
   starts, signals, queries, cancellation, termination, descriptions, and history reads.

3. A run is green only when the expected terminal event is present in server history.
   The shared client harness reads structured history directly from Cadence, and each
   test asserts the relevant close status and events.

   `SMOKE_TRACE=1` wraps the transport in a logging proxy (every RPC and every swallowed
   throw becomes visible) and surfaces unhandled rejections.

## Feature status

Measured against the live server, not inferred. "Verified" means the server recorded the
expected history for that shape.

| Workflow feature | Status |
|---|---|
| Worker registration, decision-task poll loop | ✅ verified |
| Workflow start → function executes | ✅ verified |
| Suspend on an empty signal channel, resume per signal (3 signals, each on its own decision task; sticky and full-replay delivery) | ✅ verified |
| Signal payload decode | ✅ verified (byte-exact) |
| Start-argument delivery into the workflow function | ✅ verified (string arg, byte-exact) |
| Return-value delivery into the completion event | ✅ verified (with and without arguments) |
| Server-side `WorkflowExecutionCompleted` | ✅ verified (all three workflow shapes) |
| Timers (`Sleep`) | ✅ verified |
| Activities: execute, failure propagation, RetryPolicy, heartbeat (manual + auto), timeout-driven retry, `GetActivityInfo` | ✅ verified |
| Local activities: execute, retry, info, context propagation | ✅ verified |
| Child workflows: execute, cancel, memo, parent-close policies, retry, timeout | ✅ verified |
| Queries: `SetQueryHandler`, consistent query, `__stack_trace`, oversized-result error | ✅ verified |
| Cancel, terminate + describe, workflow-ID reuse policies | ✅ verified |
| `ContinueAsNew` (incl. header/memo carryover), cron + `GetLastCompletionResult` | ✅ verified |
| `SideEffect`, `MutableSideEffect`, `GetVersion` (V1-V6 migration ladder, 6×6 replay matrix) | ✅ verified |
| `SignalExternalWorkflow`, `SignalWithStartWorkflow` | ✅ verified |
| Async activity completion (`ErrResultPending` → `CompleteActivity` / `CompleteActivityByID`) | ✅ verified |
| `UpsertSearchAttributes`, basic visibility listing | ✅ verified |
| Sessions (`CreateSession` / `CompleteSession`, resource-specific task list) | ✅ verified |
| Domain client: register, update, describe, failover (single-node global domain) | ✅ verified |
| `WorkflowReplayer`; nondeterminism detection (fail-policy + query paths); replay-varying retry options | ✅ verified |
| Multi-argument and struct-typed workflow arguments | ✅ verified (shapes + parallel tests) |
| opentracing span-context serialization (`TestOverrideSpanContext`) | ✗ not implemented — `internal/tracer.ts` is stubbed. Generic context-value propagation (`ContextPropagator`) IS verified; only the Jaeger-style traceID/spanID/baggage header lane is missing |
| Search-attribute *queries* (`ListWorkflow` with a query string, `CountWorkflow`) | ⏳ untested — requires an Elasticsearch-backed server; the upsert/write side is verified |
| `internal_workflow_testsuite` (the mock environment for unit-testing user workflows) | ✗ not usable — 42 tsc errors remain in that one file; excluded from the compile gate; does not affect the production worker/client paths |

## Regenerating

This tree is an output artifact. The generator, its prompts, and the integration-test sources
live in the condorance repository; regeneration runs the closure pipeline against the Go
client source and replaces `src/**` wholesale. Do not hand-edit generated files — a
regeneration overwrites them.
