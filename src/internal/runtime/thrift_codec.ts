// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import * as thrift from "@creditkarma/thrift-server-core";

// GoThriftStructLike is the SDK-owned bridge type for "a value Go treats as a serializable thrift
// struct" — the target of BOTH Go thrift bridges: the Apache `thrift.TStruct` interface
// ({Read, Write}) and thriftrw's `ThriftObject` ({ToWire, FromWire}). It mirrors Go's STRUCTURAL
// interface satisfaction: any of the four method spellings (Go-cased Read/Write, @creditkarma
// lowercase read/write) marks the value, and all are optional so a hand-written stand-in (e.g. a
// test mock) satisfies it exactly as it would satisfy Go's `thrift.TStruct`.
//
// Why an SDK-owned interface instead of the vendor `@creditkarma StructLike` class: every OTHER
// pipeline-canonical shim (context/atomic/container-list/bytes/tally/sync) targets an SDK-owned
// runtime type, not a third-party class. StructLike is a CONCRETE class with a wide surface
// (_annotations, _fieldAnnotations, a lowercase `write`), so a value that structurally serializes
// itself — which Go's `thrift.TStruct` accepts — is NOT assignable to it, and tsc rejects it. This
// interface is the permissive, SDK-owned analog; real generated structs (`extends thrift.StructLike`,
// carrying `.write`) remain assignable to it. Method params are `...args: any[]` so both the Go-cased
// two-arg `Read(ctx, protocol)` and the @creditkarma one-arg `read(protocol)` fit.
//
// Soundness note: GoThriftStructLike is intentionally NOT assignable to `thrift.StructLike` (the
// widening goes struct→interface, never the reverse). The helpers below therefore never pass a
// GoThriftStructLike value into a @creditkarma API that requires StructLike — they only call the
// value's own write/read method and hand @creditkarma the transport/protocol, so the boundary holds.
export interface GoThriftStructLike {
    Read?(...args: any[]): unknown;
    Write?(...args: any[]): unknown;
    read?(...args: any[]): unknown;
    write?(...args: any[]): unknown;
}

// Method-casing bridge for the two thrift struct shapes this runtime must accept, kept consistent
// with isThriftStruct below (which recognizes BOTH). Go's thrift.TStruct interface exposes EXPORTED
// (capitalized) instance methods Write(proto)/Read(proto); @creditkarma's thrift-server target emits
// a lowercase instance write(proto) plus a STATIC read(proto). isThriftStruct deliberately treats a
// value as a thrift struct if it carries EITHER `write` or `Write` (mirroring Go's structural
// interface satisfaction), so the encode/decode helpers must honor the same contract — otherwise a
// value isThriftStruct accepts would crash here. The @creditkarma method is always preferred; the
// capitalized fallback fires only when it is absent, so real generated structs are unaffected.
function writeThriftStruct(v: GoThriftStructLike, protocol: thrift.TProtocol): void {
    const m = v as { write?: unknown; Write?: unknown };
    if (typeof m.write === "function") {
        (m.write as (p: thrift.TProtocol) => void).call(v, protocol);
        return;
    }
    if (typeof m.Write === "function") {
        (m.Write as (p: thrift.TProtocol) => void).call(v, protocol);
        return;
    }
    throw new TypeError("thrift struct has no write/Write method");
}

// readThriftStructInPlace decodes into the array slot at index i, honoring both shapes. @creditkarma
// exposes a STATIC read(proto) that returns a fresh value (so we replace the slot). A Go-cased
// structural implementer instead has an INSTANCE Read(proto) that decodes INTO the receiver (Go's
// TListDeserialize semantics: ts[i].Read(...)), so we call it in place and keep the slot.
function readThriftStructInPlace(ts: GoThriftStructLike[], i: number, protocol: thrift.TProtocol): void {
    const ctor = ts[i].constructor as unknown as { read?(input: thrift.TProtocol): GoThriftStructLike };
    if (typeof ctor.read === "function") {
        ts[i] = ctor.read(protocol);
        return;
    }
    const inst = ts[i] as { read?: unknown; Read?: unknown };
    if (typeof inst.Read === "function") {
        (inst.Read as (p: thrift.TProtocol) => void).call(ts[i], protocol);
        return;
    }
    if (typeof inst.read === "function") {
        (inst.read as (p: thrift.TProtocol) => void).call(ts[i], protocol);
        return;
    }
    throw new TypeError("thrift struct has no static/instance read/Read method");
}

// Go thriftrw serializes a struct in two stages: obj.ToWire() -> wire.Value, then
// protocol.Binary.Encode(value, writer) -> bytes. @creditkarma models the same two operations as a
// polymorphic instance write(protocol) on every generated struct (all extend thrift.StructLike) and
// a static read(protocol) on the struct class. These helpers wrap the transport/protocol dance so a
// body calls thriftEncode(obj) / thriftDecode(bytes, XClass). The Go ThriftObject interface
// corresponds to GoThriftStructLike; there is no wire.Value or protocol.Binary object in TypeScript.
// The helpers handle only the raw struct payload — any version preamble stays application logic.
export function thriftEncode(obj: GoThriftStructLike): Buffer {
    const transport = new thrift.BufferedTransport();
    const protocol = new thrift.BinaryProtocol(transport);
    writeThriftStruct(obj, protocol);
    return transport.flush();
}

export function thriftDecode<T extends GoThriftStructLike>(
    bytes: Buffer,
    ctor: { read(input: thrift.TProtocol): T },
): T {
    const transport = thrift.BufferedTransport.receiver(bytes);
    const protocol = new thrift.BinaryProtocol(transport);
    return ctor.read(protocol);
}

// isThriftStruct is the TypeScript analog of Go's reflection test that a value implements the
// thrift TStruct interface (reflect.TypeOf(v).Implements(tStructType)). Go's check is INTERFACE
// SATISFACTION — structural, not nominal — so the faithful TS analog is a duck-typed check that the
// value carries the thrift write method, NOT a nominal `instanceof thrift.StructLike`. instanceof
// would reject any value that structurally implements the protocol without extending the concrete
// base (e.g. a hand-written stand-in), which Go's interface test would accept. We accept either the
// @creditkarma instance method `write` or a capitalized `Write` (Go-cased stand-ins) so both real
// generated structs and structural implementers satisfy it, mirroring Go. Go's accompanying
// pointer-kind guard (reflect.ValueOf(v).Kind() == reflect.Ptr) is vacuous in TS (all objects are
// references) and is not reproduced here.
export function isThriftStruct(v: unknown): boolean {
    if (v instanceof thrift.StructLike) {
        return true;
    }
    if (v === null || typeof v !== "object") {
        return false;
    }
    const cand = v as { write?: unknown; Write?: unknown };
    return typeof cand.write === "function" || typeof cand.Write === "function";
}

// thriftEncodeList serializes a list of thrift structs into ONE buffer, mirroring Go's
// TListSerialize: a single serializer/transport receives each struct's write() back-to-back with no
// length framing (thrift binary is a streaming protocol). Equivalent to concatenating per-struct
// encodes because BinaryProtocol writes each struct followed by its own STOP marker.
export function thriftEncodeList(ts: GoThriftStructLike[]): Buffer {
    const transport = new thrift.BufferedTransport();
    const protocol = new thrift.BinaryProtocol(transport);
    for (const v of ts) {
        writeThriftStruct(v, protocol);
    }
    const buf = transport.flush();
    recordEncodedPayloadClasses(buf, ts);
    return buf;
}

// Go's decoder seeds each decode destination from its STATIC type (reflect.New on the
// function's parameter types), so a thrift payload always meets typed targets. TypeScript
// erases those types: a decode target reached through an erased signature (an activity or
// workflow function's arguments) is an untyped { value: undefined } box, and the dispatch
// that reads the seeded value's type cannot see thrift. For a payload that never leaves
// the process, the classes are still knowable — the encode side records each struct's
// constructor against the produced buffer, and an unseeded target recovers a typed zero
// here before decoding. A payload that crossed a process boundary has no record and is
// unaffected (the decode behaves exactly as before).
const encodedPayloadClasses = new WeakMap<object, Array<(new (init?: unknown) => unknown) | undefined>>();

function recordEncodedPayloadClasses(buf: Buffer, values: unknown[]): void {
    encodedPayloadClasses.set(
        buf,
        values.map((v) =>
            v !== null && typeof v === "object"
                ? ((v as object).constructor as new (init?: unknown) => unknown)
                : undefined,
        ),
    );
}

// seedDecodeTargetsFromPayload seeds each UNSEEDED { value } box in `to` with a zero
// instance of the class recorded for the same position of the buffer's in-process encode.
// Already-seeded boxes and non-box targets are left alone — a caller that supplied its own
// typed zero keeps authority over the destination type, exactly like Go's typed pointer.
export function seedDecodeTargetsFromPayload(buf: unknown, to: unknown[]): void {
    if (buf === null || typeof buf !== "object") {
        return;
    }
    const classes = encodedPayloadClasses.get(buf as object);
    if (classes == null || classes.length !== to.length) {
        return;
    }
    for (let i = 0; i < to.length; i++) {
        const box = to[i] as { value?: unknown } | null;
        if (box === null || typeof box !== "object" || !("value" in box) || box.value != null) {
            continue;
        }
        const cls = classes[i];
        if (typeof cls === "function" && cls !== (Object as unknown) && cls !== (Buffer as unknown)) {
            try {
                box.value = new cls({});
            } catch {
                // A class whose constructor rejects an empty init keeps the box unseeded;
                // the decode then behaves exactly as it would without a record.
            }
        }
    }
}

// thriftDecodeList deserializes a buffer into a list of thrift structs, mirroring Go's
// TListDeserialize: one transport over the whole buffer is read sequentially, decoding each element
// via its own class's static read(). Go reads INTO the existing pointer (ts[i].Read(...)); the TS
// static read() returns a fresh value, so we replace the array element in place. Mutates ts.
export function thriftDecodeList(ts: GoThriftStructLike[], bytes: Buffer): void {
    const transport = thrift.BufferedTransport.receiver(bytes);
    const protocol = new thrift.BinaryProtocol(transport);
    for (let i = 0; i < ts.length; i++) {
        readThriftStructInPlace(ts, i, protocol);
    }
}
