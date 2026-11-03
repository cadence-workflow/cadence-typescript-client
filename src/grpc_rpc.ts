/*
 * REQUIREMENTS & DESIGN CONSTRAINTS — GrpcRpc
 * ================================================
 * This is the INTEGRATION BOUNDARY the generated SDK deliberately does not generate: the
 * concrete network transport. Everything above it — the client, the workflow engine, the
 * dispatcher — is generated from the Go source. Only the socket is hand-written.
 *
 * Why this shape
 *   - ts-proto emits `WorkflowAPIClientImpl(rpc: Rpc)` where Rpc is a single method:
 *     `request(service, method, data: Uint8Array) => Promise<Uint8Array>`. That is the
 *     narrowest possible seam, so the bridge is a transport and nothing else — it never
 *     knows a message type and can never drift from the generated stubs.
 *   - Serialization is identity: ts-proto has already encoded the request and will decode
 *     the response, so grpc-js must hand the bytes through untouched. Passing a real
 *     serializer here would double-encode.
 *
 * Invariants
 *   - The gRPC path is `/<service>/<method>`; `service` is the fully-qualified proto
 *     service name ts-proto passes in (e.g. `uber.cadence.api.v1.WorkflowAPI`). Do not
 *     rewrite it — the caller owns the name.
 *   - Cadence's frontend speaks gRPC through YARPC, which REJECTS a call that does not
 *     carry `rpc-caller`, `rpc-service` and `rpc-encoding` ("missing service name, caller
 *     name, encoding"). Those are transport-level routing headers, not application data,
 *     so they belong here and are defaulted; a caller may still add its own (e.g. auth).
 *   - YARPC also requires every call to carry a TTL ("missing TTL"), which on the gRPC
 *     wire is the deadline. So a deadline is always set; long-poll callers (decision task
 *     polling) pass their own via `timeoutMs`.
 */
import { credentials, Client, Metadata, type ClientOptions } from '@grpc/grpc-js';

const identity = (b: Buffer): Buffer => b;
const toBuffer = (b: Uint8Array): Buffer => Buffer.isBuffer(b) ? b : Buffer.from(b);

export class GrpcRpc {
  private readonly client: Client;
  private readonly metadata: Metadata;
  private readonly timeoutMs: number;

  constructor(
    address: string,
    opts: {
      caller?: string;
      service?: string;
      metadata?: Metadata;
      clientOptions?: ClientOptions;
      timeoutMs?: number;
    } = {},
  ) {
    this.client = new Client(address, credentials.createInsecure(), opts.clientOptions);
    this.timeoutMs = opts.timeoutMs ?? 30_000;
    this.metadata = opts.metadata ?? new Metadata();
    // YARPC routing headers. Set only when absent so a caller can override any of them.
    const defaults: Record<string, string> = {
      'rpc-caller': opts.caller ?? 'condorance-generated-client',
      'rpc-service': opts.service ?? 'cadence-frontend',
      'rpc-encoding': 'proto',
    };
    for (const [k, v] of Object.entries(defaults)) {
      if (this.metadata.get(k).length === 0) this.metadata.set(k, v);
    }
  }

  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array> {
    const path = `/${service}/${method}`;
    return new Promise((resolve, reject) => {
      this.client.makeUnaryRequest<Buffer, Buffer>(
        path,
        identity,
        identity,
        toBuffer(data),
        this.metadata,
        { deadline: Date.now() + this.timeoutMs },
        (err, res) => (err ? reject(err) : resolve(res ?? Buffer.alloc(0))),
      );
    });
  }

  close(): void {
    this.client.close();
  }
}
