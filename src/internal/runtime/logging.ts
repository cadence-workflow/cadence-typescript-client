// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
/*
 * GoZapCore — SDK-owned structural shim for `go.uber.org/zap/zapcore.Core`.
 * ============================================================================
 * `zapcore.Core` is a low-level logging INTERFACE a source project may implement
 * or wrap, delegating some methods while overriding others. No npm logger
 * reproduces this method surface —
 * winston's `Logger` has `.warn`/`.error`/`.child`, none of `Enabled`/`With`/
 * `Check`/`Write`/`Sync` — so mapping the interface to a concrete lib class makes
 * every delegation a TS2339. This is the same situation as `GoThriftStructLike`:
 * for an external interface with no faithful npm equivalent, the sound target is an
 * SDK-owned structural interface carrying the exact Go method names, not a lib pick.
 *
 * `go.uber.org/zap.Logger` (the logger you USE to emit records) is a DIFFERENT type
 * and still maps to winston's `Logger` — only `zapcore.Core` maps here.
 *
 * Params are intentionally permissive (`unknown`): the Go param types (Entry, Field,
 * CheckedEntry, Level) have no canonical TS shape, and a Core implementation only
 * needs the method NAMES to line up for delegation to type-check.
 */
import { createLogger, format, transports, Logger } from 'winston';

export interface GoZapCore {
  Enabled(level: unknown): boolean;
  With(fields: unknown): GoZapCore;
  Check(entry: unknown, checkedEntry: unknown): unknown;
  Write(entry: unknown, fields: unknown): void;
  Sync(): void;
}

/*
 * NoopLogger — the lowering for `zap.NewNop()`.
 * ============================================================================
 * A Go call site that needs a logger but has none to hand passes `zap.NewNop()`, a
 * logger that discards everything (`NewTracingContextPropagator(zap.NewNop(), tracer)`).
 * The winston analog is a real logger with every transport silenced, so the value that
 * flows into a `Logger` parameter is a genuine Logger — `child()`, `warn()`, `error()`
 * and the rest all resolve and do nothing.
 *
 * This exists because the alternative is a value the model has to invent. Left to
 * itself it reaches for `{} as any` or `undefined`, both of which either fail to
 * type-check against a `Logger` parameter or crash on the first `.child(...)`.
 */
// One MEMOIZED instance: Go's zap.NewNop() values are reflect.DeepEqual-equal, so
// translated tests deep-compare two independently obtained noop loggers. Two winston
// instances differ in internal stream state; the singleton restores Go's equality.
let noopLoggerSingleton: Logger | undefined;

export function NoopLogger(): Logger {
  noopLoggerSingleton ??= createLogger({ silent: true });
  return noopLoggerSingleton;
}

/*
 * DefaultLogger — the lowering for zap's production-config logger.
 * ============================================================================
 * A Go worker with no logger configured builds one:
 *
 *   config := zap.NewProductionConfig()
 *   config.EncoderConfig.EncodeTime = zapcore.ISO8601TimeEncoder
 *   logger, _ := config.Build()
 *
 * `zap.NewProductionConfig()` is a bundle — info level, JSON encoding, ISO8601
 * timestamps, a stderr sink — and winston has no single call that reproduces it, so
 * the composed target is SDK-owned. Left to invent one, the model reaches for the
 * module at runtime (`require('winston').createLogger(...)`), which is `undefined` in
 * this ESM SDK and throws on the first worker start with no logger.
 *
 * The `.Build()` error result is dropped, matching the Go call site's `logger, _`.
 */
export function DefaultLogger(): Logger {
  return createLogger({
    level: 'info',
    format: format.combine(format.timestamp(), format.json()),
    transports: [new transports.Console()],
  });
}

/*
 * The zap level constants — the lowering for `zap.DebugLevel` / `zapcore.InfoLevel` and
 * their siblings.
 * ============================================================================
 * These are the numeric values zapcore itself uses, kept exactly so a level comparison
 * translated from Go keeps its meaning. They are the argument `ObserverCore` filters on,
 * so a test asking for `ErrorLevel` really does observe nothing when the code under test
 * logs at debug.
 */
export const DebugLevel = -1;
export const InfoLevel = 0;
export const WarnLevel = 1;
export const ErrorLevel = 2;
export const DPanicLevel = 3;
export const PanicLevel = 4;
export const FatalLevel = 5;

// winston names its levels; zap numbers them. Anything unrecognised is treated as info,
// the level winston itself defaults to.
const goZapLevelByName: Record<string, number> = {
  silly: DebugLevel,
  debug: DebugLevel,
  verbose: DebugLevel,
  info: InfoLevel,
  warn: WarnLevel,
  error: ErrorLevel,
};

const goZapNameByLevel: Record<number, string> = {
  [DebugLevel]: 'debug',
  [InfoLevel]: 'info',
  [WarnLevel]: 'warn',
  [ErrorLevel]: 'error',
  [DPanicLevel]: 'dpanic',
  [PanicLevel]: 'panic',
  [FatalLevel]: 'fatal',
};

// Winston's default levels have no DPanic/Panic/Fatal distinction. They are all
// error-severity records at this representation boundary; the source core remains
// responsible for any policy layered around them.
const winstonNameByZapLevel: Record<number, string> = {
  [DebugLevel]: 'debug',
  [InfoLevel]: 'info',
  [WarnLevel]: 'warn',
  [ErrorLevel]: 'error',
  [DPanicLevel]: 'error',
  [PanicLevel]: 'error',
  [FatalLevel]: 'error',
};

/*
 * CoreFromLogger — expose a winston Logger through zapcore.Core's protocol.
 * ============================================================================
 * Zap's WithOptions(WrapCore(transform)) applies a project-owned Core transform:
 * Logger -> Core -> transform(Core) -> Logger. Winston has no Core surface, so this
 * adapter provides only the representation boundary. It deliberately contains no
 * replay, sampling, or project policy; those remain in the translated transform.
 */
export function CoreFromLogger(logger: Logger): GoZapCore {
  const core: GoZapCore = {
    Enabled: (level: unknown): boolean =>
      logger.isLevelEnabled(winstonNameByZapLevel[Number(level)] ?? 'info'),
    With: (fields: unknown): GoZapCore =>
      CoreFromLogger(logger.child((fields ?? {}) as Record<string, unknown>)),
    Check: (entry: unknown, checkedEntry: unknown): unknown => {
      const e = (entry ?? {}) as { Level?: unknown };
      if (!core.Enabled(e.Level ?? InfoLevel)) {
        return checkedEntry;
      }
      const ce = (checkedEntry ?? { cores: [] }) as { cores?: GoZapCore[] };
      (ce.cores ??= []).push(core);
      return ce;
    },
    Write: (entry: unknown, fields: unknown): void => {
      const e = (entry ?? {}) as { Message?: unknown; Level?: unknown };
      const levelName = winstonNameByZapLevel[Number(e.Level ?? InfoLevel)] ?? 'info';
      const method = (logger as unknown as Record<string, unknown>)[levelName];
      if (typeof method === 'function') {
        Reflect.apply(method, logger, [
          String(e.Message ?? ''),
          (fields ?? {}) as Record<string, unknown>,
        ]);
      }
    },
    Sync: (): void => undefined,
  };
  return core;
}

/*
 * GoObservedLogEntry / GoObservedLogs — the lowering for `zaptest/observer`.
 * ============================================================================
 * A Go unit test asserts on what the code under test LOGGED: it installs an observing
 * core, runs the code, then reads the captured entries back. Nothing in npm carries this
 * surface — winston can capture output, but not as `All()` / `FilterMessage(m)` / entries
 * with a `ContextMap()` — so, as with `GoZapCore` itself, the target is SDK-owned.
 *
 * `ContextMap()` returns the structured fields of one record, which is the whole point:
 * the test reads `event.ContextMap()["poller_quota"]` rather than parsing a message.
 */
export interface GoObservedLogEntry {
  Message: string;
  Level: number;
  ContextMap(): Record<string, unknown>;
}

export interface GoObservedLogs {
  All(): GoObservedLogEntry[];
  TakeAll(): GoObservedLogEntry[];
  FilterMessage(msg: string): GoObservedLogs;
  Len(): number;
}

// FilterMessage hands back a SNAPSHOT rather than a live view, matching Go: the filtered
// result is its own ObservedLogs, and draining it must not drain the original.
class goObservedLogs implements GoObservedLogs {
  constructor(private readonly entries: GoObservedLogEntry[]) {}

  All(): GoObservedLogEntry[] {
    return this.entries.slice();
  }

  TakeAll(): GoObservedLogEntry[] {
    const taken = this.entries.slice();
    this.entries.length = 0;
    return taken;
  }

  FilterMessage(msg: string): GoObservedLogs {
    return new goObservedLogs(this.entries.filter((e) => e.Message === msg));
  }

  Len(): number {
    return this.entries.length;
  }
}

/*
 * ObserverCore — the lowering for `observer.New(level)`.
 * ============================================================================
 * Go returns the pair `(core, logs)` and the test destructures it, so this returns a
 * tuple in the same order. The core honours the level it was given — a test that asks for
 * `ErrorLevel` and then asserts the log is empty is asserting exactly that filter.
 *
 * `With(fields)` returns a DERIVED core that merges the accumulated fields into every
 * later record, the way zap does; returning the same core would silently drop the fields
 * a `logger.With(...)` chain added, and those are what `ContextMap()` is read for.
 */
export function ObserverCore(level?: unknown): [GoZapCore, GoObservedLogs] {
  const entries: GoObservedLogEntry[] = [];
  const min = level === undefined ? DebugLevel : Number(level);

  const makeCore = (bound: Record<string, unknown>): GoZapCore => {
    const core: GoZapCore = {
      Enabled: (l: unknown): boolean => Number(l) >= min,
      With: (fields: unknown): GoZapCore => makeCore({ ...bound, ...(fields as Record<string, unknown>) }),
      // zap's Check protocol: a core that wants the entry ADDS ITSELF to the
      // CheckedEntry; declining returns the CheckedEntry unchanged. A wrapper core
      // can suppress by returning the CheckedEntry without delegating — so "no
      // cores accumulated" is the no-write signal.
      Check: (entry: unknown, checkedEntry: unknown): unknown => {
        const e = entry as { Level?: unknown };
        if (!core.Enabled(e?.Level ?? min)) {
          return checkedEntry;
        }
        const ce = (checkedEntry ?? { cores: [] }) as { cores?: GoZapCore[] };
        (ce.cores ??= []).push(core);
        return ce;
      },
      Write: (entry: unknown, fields: unknown): void => {
        const e = (entry ?? {}) as { Message?: unknown; Level?: unknown };
        const lvl = Number(e.Level ?? InfoLevel);
        if (lvl < min) {
          return;
        }
        const ctx = { ...bound, ...((fields ?? {}) as Record<string, unknown>) };
        entries.push({
          Message: String(e.Message ?? ''),
          Level: lvl,
          ContextMap: (): Record<string, unknown> => ({ ...ctx }),
        });
      },
      Sync: (): void => undefined,
    };
    return core;
  };

  return [makeCore({}), new goObservedLogs(entries)];
}

/*
 * LoggerFromCore — the lowering for `zap.New(core)`.
 * ============================================================================
 * The value that reaches the code under test is a `Logger` (the SDK's zap.Logger target
 * is winston's), but every record it emits has to land in the core the test is observing.
 *
 * Delivery must be SYNCHRONOUS. A winston transport is a stream, so a record written
 * through the normal pipeline arrives on a later tick — and the Go test reads `obs.All()`
 * on the very next statement, which would observe nothing.
 *
 * Delivery must also happen BEFORE winston's own merge step. `Logger.log` folds an
 * Error meta into the record — `info.message` becomes `"<msg> <err.message>"` — so a
 * record read after that step no longer carries the message the Go test filters on
 * (`obs.FilterMessage(msg)` is an EXACT match, and zap never mutates the message).
 * The level helpers (`.error(msg, err)` and friends) are therefore intercepted directly:
 * each forwards the pristine message and metas to the core and returns without entering
 * winston's log pipeline (the logger is silent with no transports, so nothing is lost).
 * The value stays a real winston `Logger`. Its `.child(metadata)` is adapted through
 * `core.With(metadata)` so project-owned wrapper cores and bound fields survive on
 * derived loggers; a raw `.write(info)` — where no merge has happened — is
 * intercepted as before.
 *
 * Delivery also goes through `core.Check` first, exactly like zap: a wrapper core can
 * suppress a record there, and a core that wants the entry adds itself to the
 * CheckedEntry. Only the cores that opted in get `Write` — bypassing Check would log
 * every record a wrapper meant to drop.
 */
export function LoggerFromCore(core: GoZapCore): Logger {
  const logger = createLogger({ level: 'silly', silent: true, transports: [] });
  const deliver = (levelName: string, message: unknown, metas: unknown[]): void => {
    const fields: Record<string, unknown> = {};
    for (const m of metas) {
      if (m instanceof Error) {
        // zap spells this field "error" (zap.Error(err)); winston callers pass the Error bare.
        fields['error'] = m;
      } else if (m !== null && typeof m === 'object') {
        Object.assign(fields, m as Record<string, unknown>);
      } else if (m !== undefined) {
        fields['value'] = m;
      }
    }
    const entry = { Message: String(message ?? ''), Level: goZapLevelByName[levelName] ?? InfoLevel };
    const ce = core.Check(entry, undefined) as { cores?: GoZapCore[] } | undefined;
    for (const c of ce?.cores ?? []) {
      c.Write(entry, fields);
    }
  };
  for (const levelName of Object.keys(goZapLevelByName)) {
    (logger as unknown as Record<string, unknown>)[levelName] = (
      (message: unknown, ...metas: unknown[]): Logger => {
        deliver(levelName, message, metas);
        return logger;
      }
    );
  }
  logger.child = ((metadata: Record<string, unknown>): Logger =>
    LoggerFromCore(core.With(metadata))) as typeof logger.child;
  const write = logger.write.bind(logger);
  logger.write = ((info: unknown): boolean => {
    const { message, level, ...fields } = (info ?? {}) as Record<string, unknown>;
    deliver(String(level ?? 'info'), message, [fields]);
    return write(info as Parameters<typeof write>[0]);
  }) as typeof logger.write;
  return logger;
}

// The name a numeric zap level prints as, for a test that formats a captured entry.
export function LevelName(level: unknown): string {
  return goZapNameByLevel[Number(level)] ?? 'info';
}
