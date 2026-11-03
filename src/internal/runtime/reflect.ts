// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
// TypeScript analogs of Go's reflect-based byte-slice tests. Two DIFFERENT Go questions
// map onto two primitives here — conflating them mis-routes decode fast paths:
//
// isByteSlice(v) — the VALUE question: Go `x.([]byte)` type assertion, or
// `v.Type().Elem().Kind() == reflect.Uint8` on a value. Go []byte is rendered as Node
// Buffer in SDK-owned signatures (transport-adapter internals may use Uint8Array where a
// generated RPC contract requires it); Buffer is a Uint8Array subclass, so a single
// `instanceof Uint8Array` check is exact for both. It — correctly — excludes a plain
// number[] (a Go []int): a JS number array carries no runtime element-type tag. It also
// excludes a `{ value: Buffer }` box and any box-shaped struct (e.g. a value wrapper
// class holding bytes): Go's `x.([]byte)` fails on those too. The return type is a TS
// TYPE PREDICATE, accurate for the instanceof test, so `if (isByteSlice(v))` narrows and
// byte operations type-check without a hand-written cast.
//
// isByteSliceTarget(v) — the DECODE-TARGET question: Go
// `IsTypeByteSlice(reflect.TypeOf(p))`, whose definition accepts []byte AND *[]byte
// (`t == typeOfByteSlice || t == reflect.PtrTo(typeOfByteSlice)`). Under the decode
// protocol a Go *[]byte is a `{ value: T }` box, so a box currently holding bytes is the
// pointer half and must pass — that is what selects the raw byte-copy fast path in
// FromData / futureImpl.Get when the caller's decode target is a byte slice
// (json-decoding those raw bytes instead would corrupt them). A box holding anything
// else stays false.
// goFuncName(fn) — Go's runtime.FuncForPC(reflect.ValueOf(fn).Pointer()).Name() analog.
// Go's reflected name is unique per function definition ("pkg.TestX.func2"), which is what
// keeps two different closures both written `workflowFn := func(...)` from colliding in a
// name-keyed registry. A JS closure only carries its variable-name `fn.name`, so every such
// closure spells "workflowFn" — this map restores Go's uniqueness by keying on the function
// VALUE: the first value with a given base name keeps the bare name (module-level named
// functions are single values, so their public type names are unchanged), later distinct
// values get "#2", "#3", …. Names are stable for the life of the value (WeakMap), so
// register/execute/mock lookups through the same value always agree.
const funcNameByValue = new WeakMap<Function, string>();
const funcNameCounts = new Map<string, number>();

// Go's reflected-name lookup takes interface{}, so callers legitimately hold the
// function behind unknown/{}-typed slots; narrow once inside.
export function goFuncName(fnValue: unknown): string {
    const fn = fnValue as Function;
    let name = funcNameByValue.get(fn);
    if (name !== undefined) {
        return name;
    }
    let base = fn.name !== '' ? fn.name : 'func';
    // Go spells a method value "T.M-fm"; strip the marker as Go callers do.
    if (base.endsWith('-fm')) {
        base = base.slice(0, -3);
    }
    // JS spells a bound method "bound M" (Function.prototype.bind prepends the
    // marker, once per bind). Go's reflected name for a method value is a pure
    // function of the DEFINITION ("pkg.Type.Execute-fm"): binding obj.Execute
    // again yields the same name, and a replayed history's qualified type name
    // folds to the bare "Execute" on lookup. So a bound method takes the bare
    // method name WITHOUT the per-value uniquifier -- every bind of one method
    // must agree, or register (one bind) and history lookup (a name) can never
    // meet. Two distinct classes' same-named methods colliding fails loudly in
    // the registry's already-registered panic, as Go does after its short-name
    // fold.
    let boundMethod = false;
    while (base.startsWith('bound ')) {
        base = base.slice(6);
        boundMethod = true;
    }
    if (base === '') {
        base = 'func';
        boundMethod = false;
    }
    if (boundMethod) {
        funcNameByValue.set(fn, base);
        return base;
    }
    // A class/object METHOD DEFINITION (shorthand `Method() {}` — its source starts with
    // the name, not `function`/`(`/`class`) is unique per DEFINITION, exactly like Go's
    // reflected method name: two structs' same-named methods short-fold to the same bare
    // name (colliding loudly in one registry, as Go does), and never take the per-value
    // uniquifier — that exists only for anonymous closures sharing a variable name.
    if (/^(?:async\s+)?(?:\*\s*)?[A-Za-z_$][\w$]*\s*\(/.test(String(fn)) && !String(fn).startsWith('function')) {
        funcNameByValue.set(fn, base);
        return base;
    }
    const n = (funcNameCounts.get(base) ?? 0) + 1;
    funcNameCounts.set(base, n);
    name = n === 1 ? base : `${base}#${n}`;
    funcNameByValue.set(fn, name);
    return name;
}

// goKindAssignable(from, toZero) — Go's decode-time type check, answered structurally.
// Go rejects a value whose runtime type cannot land in the destination (reflect's
// AssignableTo on the raw-assign path, json.Unmarshal's kind check on the decode path);
// that rejection IS the corrupt-signal skip semantics. TypeScript erases declared types,
// but under the decode protocol the destination box holds the Go ZERO VALUE, so the
// destination's kind is readable at runtime. Rules mirror what the two Go checks agree on:
//   - no info on either side (zero/decoded undefined-or-null) → assignable; Go treats an
//     invalid `from` as a skip-without-error and a json `null` as a no-op success.
//   - Date zero → assignable (Go time.Time unmarshals from a JSON string via
//     UnmarshalJSON, so a kind test would falsely reject it).
//   - bytes zero → bytes or string (JSON carries []byte as a base64 string).
//   - array zero → array; plain-object zero → plain object; primitive zero → same typeof.
export function goKindAssignable(from: unknown, toZero: unknown): boolean {
    if (toZero === undefined || toZero === null || from === undefined || from === null) {
        return true;
    }
    if (toZero instanceof Date) {
        return true;
    }
    if (toZero instanceof Uint8Array) {
        return from instanceof Uint8Array || typeof from === 'string';
    }
    if (Array.isArray(toZero)) {
        return Array.isArray(from);
    }
    if (typeof toZero === 'object') {
        return typeof from === 'object' && !Array.isArray(from) && !(from instanceof Uint8Array);
    }
    return typeof from === typeof toZero;
}

// goCheckedDecodedValue — the json.Unmarshal half of the check as an EXPRESSION, so a
// decode site can wrap its parse result in place: `box.value = goCheckedDecodedValue(v,
// box.value)`. Throws the Go-shaped unmarshal error on a kind mismatch; the surrounding
// decode error handling (Go returns json's error up the same path) converts it exactly
// like a parse failure.
export function goCheckedDecodedValue(decoded: unknown, toZero: unknown): unknown {
    if (!goKindAssignable(decoded, toZero)) {
        const kind = Array.isArray(decoded) ? 'array' : typeof decoded;
        const want = Array.isArray(toZero) ? 'array' : typeof toZero;
        throw new Error(`json: cannot unmarshal ${kind} into Go value of kind ${want}`);
    }
    // Go json carries []byte as a base64 string; a byte destination gets the bytes back.
    if (toZero instanceof Uint8Array && typeof decoded === 'string') {
        return Buffer.from(decoded, 'base64');
    }
    // Go json.Unmarshal decodes INTO the typed destination, so the result carries the
    // destination's type. When the zero seed is a CLASS instance (goZeroOfSameType or a
    // constructed zero), transplant its prototype onto the parsed plain object so nominal
    // checks (instanceof, type-assertion lowerings) hold exactly as they do in Go.
    if (decoded !== null && typeof decoded === 'object' && !Array.isArray(decoded)
        && !(decoded instanceof Uint8Array) && !(decoded instanceof Date)
        && toZero !== null && typeof toZero === 'object'
        && Object.getPrototypeOf(decoded) === Object.prototype) {
        const proto = Object.getPrototypeOf(toZero);
        if (proto !== null && proto !== Object.prototype) {
            Object.setPrototypeOf(decoded, proto);
        }
        goJSONFieldFold(decoded as Record<string, unknown>, toZero as Record<string, unknown>);
    }
    return decoded;
}

// goJSONFieldFold — json.Unmarshal's struct-field matching, applied onto the zero seed's
// key spellings. Go matches a JSON key to a struct field by tag/exact name first, then
// CASE-INSENSITIVELY ("activityId" lands in field ActivityID whose tag differs only by
// case — the standard Go convention), and fields with no matching key keep their zero
// value. A zero seed with no own keys is Go's map destination: every key kept verbatim.
function goJSONFieldFold(decoded: Record<string, unknown>, zero: Record<string, unknown>): void {
    const zeroKeys = Object.keys(zero);
    if (zeroKeys.length === 0) {
        return;
    }
    const byLower = new Map<string, string>();
    for (const zk of zeroKeys) {
        if (!byLower.has(zk.toLowerCase())) {
            byLower.set(zk.toLowerCase(), zk);
        }
    }
    for (const dk of Object.keys(decoded)) {
        const zk = byLower.get(dk.toLowerCase());
        if (zk !== undefined && zk !== dk && !Object.prototype.hasOwnProperty.call(decoded, zk)) {
            decoded[zk] = decoded[dk];
            delete decoded[dk];
        }
    }
    for (const zk of zeroKeys) {
        if (!Object.prototype.hasOwnProperty.call(decoded, zk)) {
            decoded[zk] = zero[zk];
            continue;
        }
        const dv = decoded[zk];
        const zv = zero[zk];
        if (dv !== null && typeof dv === 'object' && !Array.isArray(dv)
            && !(dv instanceof Uint8Array) && !(dv instanceof Date)
            && zv !== null && typeof zv === 'object' && !Array.isArray(zv)
            && !(zv instanceof Uint8Array) && !(zv instanceof Date) && !(zv instanceof Map)) {
            goJSONFieldFold(dv as Record<string, unknown>, zv as Record<string, unknown>);
        }
    }
}

// goZeroOfSameType — `reflect.New(reflect.TypeOf(v))`'s seed: a zero value carrying v's
// RUNTIME type, so a decode into the box yields a value of the same type as the exemplar
// (goCheckedDecodedValue reads the seed's prototype back onto the decoded object).
export function goZeroOfSameType(exemplar: unknown): unknown {
    if (exemplar === null || exemplar === undefined) {
        return undefined;
    }
    if (exemplar instanceof Uint8Array) {
        return Buffer.alloc(0);
    }
    if (exemplar instanceof Date) {
        return new Date(0);
    }
    if (Array.isArray(exemplar)) {
        return [];
    }
    switch (typeof exemplar) {
        case 'object':
            return Object.create(Object.getPrototypeOf(exemplar));
        case 'string':
            return '';
        case 'number':
            return 0;
        case 'boolean':
            return false;
        case 'bigint':
            return BigInt(0);
        default:
            return undefined;
    }
}

// goJSONStringify — JSON.stringify under Go's json.Marshal byte rule: every []byte value
// (Node Buffer included) renders as a base64 STRING, not Buffer's own
// `{"type":"Buffer","data":[...]}` toJSON shape. The replacer reads the raw value off its
// holder because JSON.stringify applies toJSON before the replacer sees the value.
// Returns undefined exactly where JSON.stringify does, so callers' unsupported-value
// checks keep their meaning.
export function goJSONStringify(obj: unknown): string | undefined {
    // Go json.Marshal(nil) renders "null" — an absent value is encodable, only
    // unsupported TYPES (functions, cycles) take the error path.
    return JSON.stringify(obj === undefined ? null : obj, function (this: unknown, key: string, value: unknown) {
        const raw = (this as Record<string, unknown>)[key];
        if (raw instanceof Uint8Array) {
            return Buffer.from(raw).toString('base64');
        }
        return value;
    });
}

// goLeadingContextArgCount — Go's "is parameter 0 a Context" test, answered from the
// payload. Go reads it off the erased parameter TYPE (`isFooContext(fnType.In(0))`);
// a JS function value only carries its arity, and "has at least one parameter" is NOT
// the same question — a handler whose single parameter is a data struct would lose that
// argument to the context slot. The SDK's own encoding recovers the answer: every
// encoded argument is one newline-terminated JSON value, so the difference between the
// declared arity and the payload's value count is exactly the number of leading context
// parameters (0 or 1). A non-newline-terminated payload is the raw single-value byte
// fast path, one argument by construction.
export function goLeadingContextArgCount(fn: Function, data: Uint8Array | undefined): number {
    let count = 0;
    if (data != null && data.length > 0) {
        if (data[data.length - 1] !== 0x0a) {
            count = 1;
        } else {
            const text = Buffer.from(data).toString('utf8');
            count = text.split('\n').filter((l) => l.trim() !== '').length;
        }
    }
    return fn.length > count ? 1 : 0;
}

// goFirstParamIsContext — Go's `fnType.In(0).Implements(contextInterface)` test, the
// no-payload counterpart of goLeadingContextArgCount (validation sites hold only the
// function value, no encoded arguments to count against). The parameter TYPE is erased,
// but the translated source keeps Go's parameter NAMES, and a Go context parameter is
// conventionally named ctx (this codebase never deviates); the first declared parameter
// name is readable off Function.prototype.toString. A bound or native function exposes
// no parameter source at all — Go still reads the real parameter types there, and a
// bound method value is overwhelmingly a translated Go method whose first parameter IS
// the context, so arity is the remaining faithful signal for that shape.
export function goFirstParamIsContext(fn: unknown): boolean {
    if (typeof fn !== 'function' || fn.length < 1) {
        return false;
    }
    const src = globalThis.Function.prototype.toString.call(fn);
    if (src.includes('[native code]')) {
        return true;
    }
    const m = /^[^(]*\(\s*([A-Za-z_$][\w$]*)/.exec(src);
    if (m == null) {
        return false;
    }
    // Bundlers deduplicate shadowed names by suffixing a counter (ctx -> ctx2), so the
    // digits are part of the same spelling.
    return /^_*(ctx|context)\d*$/i.test(m[1]);
}

// Go fmt.Sprint value formatting. JavaScript's String() is not fmt-faithful: it
// comma-joins arrays ("1,2,3" where Go prints "[1 2 3]") and prints "null"/"undefined"
// where Go prints "<nil>". Bodies whose output is compared or logged (Go's own
// stringer/debug helpers) must format through this.
// Invariant: mirrors fmt.Sprint exactly for the kinds Go's reflect-based printers
// reach — nil, booleans, numbers, strings, byte slices (element NUMBERS, not text:
// fmt.Sprint([]byte("ab")) is "[97 98]"), slices/arrays (space-separated, recursive),
// maps ("map[k:v ...]" with keys sorted, as fmt does since Go 1.12), and structs
// ("{v1 v2}" — field VALUES only, space-separated).
export function goSprint(v: unknown): string {
    if (v === null || v === undefined) {
        return '<nil>';
    }
    if (Array.isArray(v) || v instanceof Uint8Array) {
        return `[${Array.from(v as ArrayLike<unknown>, (e) => goSprint(e)).join(' ')}]`;
    }
    if (v instanceof Map) {
        const keys = Array.from((v as Map<unknown, unknown>).keys());
        keys.sort((a, b) => (globalThis.String(a) < globalThis.String(b) ? -1 : 1));
        return `map[${keys
            .map((k) => `${goSprint(k)}:${goSprint((v as Map<unknown, unknown>).get(k))}`)
            .join(' ')}]`;
    }
    if (typeof v === 'object') {
        return `{${goStructEntries(v as object)
            .map(([, val]) => goSprint(val))
            .join(' ')}}`;
    }
    return globalThis.String(v);
}

// The Go struct-field walk (v.NumField() / t.Field(i).Name). Object.keys is not that
// walk on this SDK's emitted IDL classes: their instances carry internal
// underscore-prefixed codec properties (_annotations, _fieldAnnotations) Go's NumField
// never sees, and their declared property names are camelCase where Go's reflected
// field names are PascalCase. An instance is recognized as an IDL class by the
// _annotations marker property; plain translated structs keep their keys verbatim.
// Known residue: the Go name is restored by uppercasing the first letter, which is
// right for the corpus's printed fields but cannot recover thriftrw's Id/ID split.
export function goStructEntries(obj: object): Array<[string, unknown]> {
    const isIDLInstance = Object.prototype.hasOwnProperty.call(obj, '_annotations');
    const out: Array<[string, unknown]> = [];
    for (const key of Object.keys(obj)) {
        if (key.startsWith('_')) {
            continue;
        }
        const name = isIDLInstance ? key.charAt(0).toUpperCase() + key.slice(1) : key;
        out.push([name, (obj as Record<string, unknown>)[key]]);
    }
    return out;
}

export function isByteSlice(v: unknown): v is Uint8Array {
    return v instanceof Uint8Array;
}

export function isByteSliceTarget(v: unknown): boolean {
    if (v instanceof Uint8Array) {
        return true;
    }
    return typeof v === 'object' && v !== null && 'value' in v
        && (v as { value: unknown }).value instanceof Uint8Array;
}

// goFnLastParamIsByteSlice(fn) — the erased half of Go's raw-payload passthrough guard,
// `fnType.NumIn() == N && IsTypeByteSlice(fnType.In(N-1))` (the executor branch that hands a
// registered workflow/activity/query function its input bytes UNDECODED when the function's
// only data parameter is declared []byte). Parameter TYPES are erased at JS runtime, so the
// answer is restored at DECLARATION time: the generator emits goMarkLastParamByteSlice(f)
// beside every top-level translated function whose emitted last parameter is Buffer (the
// canonical []byte rendering). Only the erased half lives here — arity stays on the value
// (`fn.length === N` at the call site), mirroring Go's two conjuncts. An unmarked function
// (a closure the marker pass cannot see) answers false, which routes it through the data
// converter — exactly the pre-marker behavior, never a new failure mode.
const lastParamByteSliceFns = new WeakSet<Function>();

export function goMarkLastParamByteSlice<T extends Function>(fn: T): T {
    lastParamByteSliceFns.add(fn);
    return fn;
}

// Takes unknown for the same reason as goFuncName: the Go original is reflect-based
// and its callers pass interface{}-typed slots.
export function goFnLastParamIsByteSlice(fn: unknown): boolean {
    return lastParamByteSliceFns.has(fn as Function);
}

// goFnResultIsRef(fn) — the erased half of Go's decode-into-**T result path. Go
// deserializes a recorded function result with reflect.New on the function's declared
// return type, so a **T result gets its intermediate pointer allocated during decode.
// TypeScript erases return types at runtime; the fact is restored at DECLARATION time:
// the generator emits goMarkResultRef(f) beside every top-level translated function whose
// emitted result type is the Ref<...> pointer-cell lowering of **T. The result decoder
// consumes the fact to wrap the decoded pointee in the intermediate Ref; an unmarked
// function decodes flat — exactly the pre-marker behavior.
const refResultFns = new WeakSet<Function>();

export function goMarkResultRef<T extends Function>(fn: T): T {
    refResultFns.add(fn);
    return fn;
}

// Takes unknown for the same reason as goFuncName: callers hold interface{}-typed slots.
export function goFnResultIsRef(fn: unknown): boolean {
    return refResultFns.has(fn as Function);
}
