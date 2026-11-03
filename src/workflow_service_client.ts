/*
 * REQUIREMENTS & DESIGN CONSTRAINTS — WorkflowServiceClient adapter
 * ========================================================================================
 * Binds the generated `WorkflowServiceClientLike` interface to the real Cadence frontend.
 *
 * Why a Proxy and not 53 hand-written methods
 *   Every method of the generated interface has the SAME shape —
 *   `Method(ctx, request, ...opts): Promise<Response>` — and the procedure table
 *   (workflow_service_procedures.ts, generated from the thrift IDL) already carries the
 *   per-method codecs. A Proxy therefore implements the whole interface with one rule and
 *   cannot fall behind when the SDK regenerates with more methods. A hand-written list
 *   would silently miss a method and fail at runtime with "not a function".
 *
 * Invariants
 *   - The Go `ctx` parameter is accepted and IGNORED for cancellation: Go's context
 *     carries the deadline, but the transport sets its own gRPC deadline and cancellation
 *     is not wired. A long-poll must therefore pass its own timeout — see longPollMethods.
 *   - A method absent from the procedure table throws immediately rather than returning
 *     undefined, so a gap surfaces at the call site instead of as a confusing downstream
 *     `cannot read property of undefined`.
 *   - A void procedure resolves undefined, matching the generated `Promise<void>`.
 */
import { ThriftYarpcTransport, type ThriftYarpcOptions } from './thrift_yarpc_transport.js';
import { WorkflowServiceProcedures } from './workflow_service_procedures.js';

/**
 * Long-poll procedures: the server holds the request open waiting for work. The gRPC
 * deadline must outlive the server's own poll timeout (60s for Cadence), or the call is
 * cancelled mid-poll and the worker looks like it is making no progress while actually
 * being killed on every iteration.
 */
const longPollMethods = new Set(['PollForDecisionTask', 'PollForActivityTask', 'GetWorkflowExecutionHistory']);
const longPollTimeoutMs = 90_000;

export interface WorkflowServiceClientOptions extends ThriftYarpcOptions {
  /** Frontend address, e.g. `127.0.0.1:7833` (Cadence's gRPC port). */
  address: string;
}

export function newWorkflowServiceClient(opts: WorkflowServiceClientOptions) {
  const transport = new ThriftYarpcTransport(opts.address, opts);
  const table = WorkflowServiceProcedures as Record<string, any>;

  const client = new Proxy({} as Record<string, unknown>, {
    get(_target, prop) {
      if (prop === 'close') return () => transport.close();
      if (typeof prop !== 'string') return undefined;
      const proc = table[prop];
      if (!proc) {
        return () => {
          throw new Error(`WorkflowServiceClient: no thrift procedure named ${String(prop)}`);
        };
      }
      return (_ctx: unknown, request: unknown) =>
        transport.call(prop, proc, request, longPollMethods.has(prop) ? longPollTimeoutMs : undefined);
    },
  });

  return client as unknown as { close(): void } & Record<string, (ctx: unknown, req: any) => Promise<any>>;
}
