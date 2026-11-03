/*
 * REQUIREMENTS & DESIGN CONSTRAINTS — ThriftYarpcTransport
 * ========================================================================================
 * The INTEGRATION BOUNDARY the generated SDK deliberately does not generate: the concrete
 * network transport. Everything above it — client, workflow engine, dispatcher, decision
 * state machine — is generated from the Go source. Only the socket is hand-written.
 *
 * Why thrift and not proto
 *   The generated `WorkflowServiceClientLike` is thrift-shaped, because the Go source it
 *   was translated from targets the thrift client. Cadence's frontend serves that same
 *   thrift API over gRPC through YARPC, at `/WorkflowService/<Method>` with
 *   `rpc-encoding: thrift`. So the generated structs go over the wire UNCHANGED and this
 *   file needs no per-message field mapping — it never names a request field, and
 *   therefore cannot drift from the generated types.
 *
 * Wire format (YARPC thrift)
 *   Request  = the procedure's `<Method>_args` struct: one field, id 1, holding the
 *              request struct. The arg's field NAME differs per procedure and is
 *              irrelevant to the binary encoding — only the field id and type are on the
 *              wire — so one generic encoder serves every method.
 *   Response = the procedure's `<Method>_result` struct: field id 0 is `success`, and
 *              every other field id is a declared exception. A void procedure has no
 *              field 0 at all.
 *
 * Invariants
 *   - YARPC rejects a call missing `rpc-caller` / `rpc-service` / `rpc-encoding`
 *     ("missing service name, caller name, encoding") or a deadline ("missing TTL").
 *     Both are transport-level, so both are set here and defaulted.
 *   - Serialization through grpc-js is IDENTITY: the thrift codec has already produced
 *     the bytes. A real grpc-js serializer would double-encode.
 *   - An exception field in the result is thrown as an instance of the SDK's own IDL-error
 *     class (`errors/idl_errors`), not the @creditkarma artifact and not a wrapper. The
 *     generated engine classifies Cadence errors with `err instanceof EntityNotExistsError`
 *     against the SDK class; anything else — including the @creditkarma class carrying
 *     every field — fails that check, so a permanent error reads as transient and the call
 *     retries until its deadline.
 */
import { credentials, Client, Metadata, type ClientOptions } from '@grpc/grpc-js';
import * as thrift from '@creditkarma/thrift-server-core';
import { EntityNotExistsError } from './errors/idl_errors.js';

const identity = (b: Buffer): Buffer => b;

/** A generated thrift struct codec: `{ encode(args, output), decode(input) }`. */
export interface ThriftStructCodec<TArgs, TValue> {
  encode(args: TArgs, output: thrift.TProtocol): void;
  decode(input: thrift.TProtocol): TValue;
}

/**
 * One procedure's wire contract: the codec for its single request argument, the codec for
 * its success value (absent for a void procedure), and the codecs for its declared
 * exceptions keyed by thrift field id.
 */
export interface ThriftProcedure<TReq, TRes> {
  request: ThriftStructCodec<TReq, unknown>;
  success?: ThriftStructCodec<unknown, TRes>;
  /**
   * Declared exceptions keyed by thrift field id: the thrift codec that decodes the wire
   * payload, and the SDK IDL-error class the decoded fields are constructed into. These
   * come from two different modules on purpose — see decodeResult.
   */
  exceptions?: Record<number, {
    codec: { decode(input: thrift.TProtocol): unknown };
    cls: new (init?: Record<string, unknown>) => Error;
  }>;
}

export interface ThriftYarpcOptions {
  caller?: string;
  service?: string;
  /** YARPC thrift service name; forms the gRPC path `/<thriftService>/<method>`. */
  thriftService?: string;
  metadata?: Metadata;
  clientOptions?: ClientOptions;
  timeoutMs?: number;
}

export class ThriftYarpcTransport {
  private readonly client: Client;
  private readonly metadata: Metadata;
  private readonly thriftService: string;
  private readonly defaultTimeoutMs: number;

  constructor(address: string, opts: ThriftYarpcOptions = {}) {
    this.client = new Client(address, credentials.createInsecure(), opts.clientOptions);
    this.thriftService = opts.thriftService ?? 'WorkflowService';
    this.defaultTimeoutMs = opts.timeoutMs ?? 30_000;
    this.metadata = opts.metadata ?? new Metadata();
    const defaults: Record<string, string> = {
      'rpc-caller': opts.caller ?? 'condorance-generated-client',
      'rpc-service': opts.service ?? 'cadence-frontend',
      'rpc-encoding': 'thrift',
      // Client-version application headers (bare gRPC metadata keys — YARPC's gRPC inbound
      // reads non-reserved metadata directly as application headers; an `rpc-header-`
      // prefix is rejected as "reserved header in application headers"). The server
      // RECORDS these from the worker's RespondDecisionTaskCompleted into the workflow's
      // mutable state and later consults them (versionChecker) to decide whether the
      // workflow's worker supports direct query dispatch. Without them a `workflow query`
      // is never handed to a waiting poller — it hangs until the caller's deadline —
      // while signals/decisions work fine.
      'cadence-client-library-version': '1.3.0',
      'cadence-client-feature-version': '1.7.0',
      'cadence-client-name': 'uber-go',
      'cadence-caller-type': 'sdk',
      'cadence-client-feature-flags':
        '{"workflowExecutionAlreadyCompletedErrorEnabled":true}',
    };
    for (const [k, v] of Object.entries(defaults)) {
      if (this.metadata.get(k).length === 0) this.metadata.set(k, v);
    }
  }

  /**
   * Invoke one thrift procedure. `timeoutMs` overrides the default deadline — a long-poll
   * (PollForDecisionTask) must outlive the server's own poll timeout or the call is
   * cancelled mid-poll and the worker appears to make no progress.
   */
  async call<TReq, TRes>(
    method: string,
    proc: ThriftProcedure<TReq, TRes>,
    request: TReq,
    timeoutMs?: number,
  ): Promise<TRes | undefined> {
    const out = new thrift.BufferedTransport();
    const writer = new thrift.BinaryProtocol(out);
    writer.writeStructBegin(`${method}_args`);
    writer.writeFieldBegin('request', thrift.TType.STRUCT, 1);
    proc.request.encode(request, writer);
    writer.writeFieldEnd();
    writer.writeFieldStop();
    writer.writeStructEnd();

    const raw = await this.unary(`/${this.thriftService}/${method}`, out.flush(), timeoutMs);
    return this.decodeResult(proc, raw);
  }

  private unary(path: string, payload: Buffer, timeoutMs?: number): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      this.client.makeUnaryRequest<Buffer, Buffer>(
        path,
        identity,
        identity,
        payload,
        this.metadata,
        { deadline: Date.now() + (timeoutMs ?? this.defaultTimeoutMs) },
        (err, res) => (err ? reject(err) : resolve(res ?? Buffer.alloc(0))),
      );
    });
  }

  /**
   * Walk the `<Method>_result` struct. Field 0 is the success value; any other field id is
   * a declared exception, read into its generated CLASS and thrown, so the generated
   * engine's `instanceof` classification works. An empty body is a void procedure.
   */
  private decodeResult<TReq, TRes>(
    proc: ThriftProcedure<TReq, TRes>,
    raw: Buffer,
  ): TRes | undefined {
    if (raw.length === 0) return undefined;
    const reader = new thrift.BinaryProtocol(new thrift.BufferedTransport(raw));
    reader.readStructBegin();
    let value: TRes | undefined;
    for (;;) {
      const field = reader.readFieldBegin();
      if (field.fieldType === thrift.TType.STOP) break;
      if (field.fieldId === 0 && proc.success) {
        value = proc.success.decode(reader);
      } else if (field.fieldId !== undefined && proc.exceptions?.[field.fieldId]) {
        const spec = proc.exceptions[field.fieldId]!;
        throw new spec.cls(spec.codec.decode(reader) as Record<string, unknown>);
      } else {
        reader.skip(field.fieldType);
      }
      reader.readFieldEnd();
    }
    reader.readStructEnd();
    return value;
  }

  close(): void {
    this.client.close();
  }
}
