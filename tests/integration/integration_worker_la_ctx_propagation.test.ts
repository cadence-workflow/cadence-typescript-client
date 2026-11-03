/*
 * End-to-end integration: CONTEXT PROPAGATION THROUGH A LOCAL ACTIVITY — a value placed in
 * the WORKFLOW context with workflow.WithValue crosses into a local activity's
 * context via the worker's ContextPropagators (mirrors go-client
 * TestWorkflowWithLocalActivityCtxPropagation).
 *
 * Chain under test: workflow WithValue -> ExecuteLocalActivity captures a header via
 * getHeadersFromContext (propagator.InjectFromWorkflow) -> the local-activity runner
 * rehydrates the activity context (propagator.Extract) -> the activity reads
 * ctx.value(key) and returns the string duplicated, exactly like the upstream
 * DuplicateStringInContext fixture.
 */
import { describe, it, expect } from 'vitest';
import { internal_Context } from '../../src/internal/context.js';
import { internal_ContextPropagator, internal_HeaderReader, internal_HeaderWriter } from '../../src/internal/headers.js';
import { withValue as runtimeWithValue, Context as RuntimeContext } from '../../src/internal/runtime/context.js';
import { Ref } from '../../src/internal/runtime/ref.js';
import { WorkerOptions } from '../../src/internal/worker.js';
import { New as NewWorker } from '../../src/worker/worker.js';
import { WithLocalActivityOptions } from '../../src/workflow/activity_options.js';
import { WithValue } from '../../src/workflow/context.js';
import { ExecuteLocalActivity } from '../../src/workflow/workflow.js';
import { newWorkflowServiceClient } from '../../src/workflow_service_client.js';
import { clientFromService, showWorkflow, startWorkflow } from './harness.js';

export const DOMAIN = process.env.CADENCE_DOMAIN ?? 'default';
export const TASK_LIST = `condorance-smoke-ctxprop-tasklist-${Date.now()}`;
export const CTX_KEY = 'smoke-ctx-key';
export const CTX_VALUE = 'test-data-in-context';
export const TEN_SECONDS_NS = 10_000_000_000;

// Mirrors go-client's string-keyed test propagator: one key rides the header both
// on the activity-context side (Inject/Extract) and the workflow side.
export class SmokeStringPropagator implements internal_ContextPropagator {
  Inject(ctx: RuntimeContext, writer: internal_HeaderWriter): void {
    const v = ctx.value<string>(CTX_KEY);
    if (v != null) writer.Set(CTX_KEY, Buffer.from(v));
  }

  Extract(ctx: RuntimeContext, reader: internal_HeaderReader): RuntimeContext {
    let out = ctx;
    reader.ForEachKey((key, value) => {
      if (key === CTX_KEY) out = runtimeWithValue(out, CTX_KEY, value.toString());
    });
    return out;
  }

  InjectFromWorkflow(ctx: internal_Context, writer: internal_HeaderWriter): void {
    const v = ctx.Value(CTX_KEY);
    if (v != null) writer.Set(CTX_KEY, Buffer.from(String(v)));
  }

  ExtractToWorkflow(ctx: internal_Context, reader: internal_HeaderReader): internal_Context {
    let out = ctx;
    reader.ForEachKey((key, value) => {
      if (key === CTX_KEY) out = WithValue(out as never, CTX_KEY, value.toString()) as unknown as internal_Context;
    });
    return out;
  }
}

const observed = { laSaw: '' };

export async function DuplicateStringInContextLA(ctx: RuntimeContext): Promise<string> {
  const s = ctx.value<string>(CTX_KEY) ?? '';
  observed.laSaw = s;
  return s + s;
}

export async function CtxPropagationWF(ctx: any): Promise<string> {
  let wctx = WithValue(ctx, CTX_KEY, CTX_VALUE);
  wctx = WithLocalActivityOptions(wctx, {
    ScheduleToCloseTimeout: TEN_SECONDS_NS,
  } as never);
  const future = await ExecuteLocalActivity(wctx, DuplicateStringInContextLA);
  const box = new Ref<unknown>(undefined);
  await future.Get(wctx, box);
  return `wf-saw:${box.value}`;
}

describe('generated worker engine -> real Cadence server (local-activity ctx propagation)', () => {
  it('a workflow WithValue crosses into the local activity via ContextPropagators', async () => {
    const service = newWorkflowServiceClient({ address: '127.0.0.1:7833', caller: 'condorance-smoke' });
    const client = clientFromService(service, DOMAIN, 'condorance-smoke-ctxprop-client');
    const worker = await NewWorker(
      service as any, DOMAIN, TASK_LIST,
      new WorkerOptions({
        Identity: 'condorance-smoke-ctxprop-worker',
        DisableActivityWorker: true,
        ContextPropagators: [new SmokeStringPropagator()],
      }) as any,
    );
    worker.RegisterWorkflow(CtxPropagationWF);
    worker.Start();

    const workflowID = `condorance-smoke-ctxprop-${Date.now()}`;
    try {
      await startWorkflow(client, {
        workflowID,
        taskList: TASK_LIST,
        workflowType: 'CtxPropagationWF',
        executionTimeoutSeconds: 120,
        decisionTimeoutSeconds: 10,
      });

      let history = '';
      await waitUntil(async () => {
        history = await showWorkflow(client, workflowID);
        return /WorkflowExecutionCompleted|WorkflowExecutionFailed|WorkflowExecutionTimedOut/.test(history);
      }, 45_000, 'workflow never reached a terminal event');

      expect(observed.laSaw).toBe(CTX_VALUE);
      expect(history).toContain(`wf-saw:${CTX_VALUE}${CTX_VALUE}`);
      expect(history).toMatch(/WorkflowExecutionCompleted/);
    } finally {
      worker.Stop();
      service.close();
    }
  }, 120_000);
});

async function waitUntil(cond: () => boolean | Promise<boolean>, timeoutMs: number, what: string): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (await cond()) return;
    await new Promise((r) => setTimeout(r, 100));
  }
  throw new Error(`timed out after ${timeoutMs}ms: ${what}`);
}
