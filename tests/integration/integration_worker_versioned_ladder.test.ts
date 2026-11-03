/*
 * End-to-end integration: VERSIONED WORKFLOW LADDER (V1-V6) — the GetVersion migration
 * story (mirrors go-client TestVersionedWorkflowV1..V6 and versioned_workflow_test.go).
 *
 * Six versions of one workflow evolve an activity call behind GetVersion:
 *   V1: no GetVersion, runs Foo.
 *   V2: GetVersion(DefaultVersion..1, ExecuteWithMinVersion) -> still records DefaultVersion, runs Foo.
 *   V3: GetVersion(DefaultVersion..1) -> records 1, runs Bar.
 *   V4: GetVersion(1..1) -> records 1, runs Bar.
 *   V5: GetVersion(1..2, ExecuteWithVersion(1)) -> records 1, runs Bar.
 *   V6: GetVersion(1..2) -> records 2, runs Baz.
 *
 * Each version starts a LIVE run on the real server, then the run's history is
 * replayed under every other version through WorkflowReplayer.ReplayWorkflowExecution.
 * The upstream compatibility matrix must hold: compatible versions replay clean,
 * incompatible versions error.
 */
import { describe, it, expect } from 'vitest';
import { background } from '../../src/internal/runtime/context.js';
import { NoopLogger } from '../../src/internal/runtime/logging.js';
import { WorkerOptions } from '../../src/internal/worker.js';
import { WithActivityOptions } from '../../src/workflow/activity_options.js';
import { ExecuteActivity, GetVersion, ExecuteWithVersion, ExecuteWithMinVersion, DefaultVersion } from '../../src/workflow/workflow.js';
import { New as NewWorker, NewWorkflowReplayerWithOptions } from '../../src/worker/worker.js';
import { newWorkflowServiceClient } from '../../src/workflow_service_client.js';
import { clientFromService, showWorkflow, startWorkflow } from './harness.js';

export const DOMAIN = process.env.CADENCE_DOMAIN ?? 'default';
export const CHANGE_ID = 'test-change';
export const WORKFLOW_NAME = 'VersionedWorkflow';

// internal_Version is an enum brand; versions are plain numbers at runtime.
export const V = (n: number) => n as never;

export const ONE_MINUTE_NS = 60_000_000_000;
export const TWENTY_SECONDS_NS = 20_000_000_000;

export async function FooActivity(_ctx: unknown): Promise<string> { return 'foo'; }
export async function BarActivity(_ctx: unknown): Promise<string> { return 'bar'; }
export async function BazActivity(_ctx: unknown): Promise<string> { return 'baz'; }

function withOpts(ctx: any): any {
  return WithActivityOptions(ctx as never, {
    TaskList: '', // inherit the workflow task list
    ScheduleToCloseTimeout: 0,
    ScheduleToStartTimeout: ONE_MINUTE_NS,
    StartToCloseTimeout: ONE_MINUTE_NS,
    HeartbeatTimeout: TWENTY_SECONDS_NS,
  } as never);
}

async function runActivity(ctx: any, name: string): Promise<void> {
  const future = await ExecuteActivity(ctx, name);
  const box: { value: unknown } = { value: undefined };
  await future.Get(ctx, box);
}

// The six versions, one-to-one with upstream versioned_workflow_test.go.
export async function VersionedWorkflowV1(ctx: any): Promise<void> {
  await runActivity(withOpts(ctx), 'FooActivity');
}
export async function VersionedWorkflowV2(ctx: any): Promise<void> {
  const actx = withOpts(ctx);
  const version = await GetVersion(actx, CHANGE_ID, DefaultVersion, V(1), ExecuteWithMinVersion());
  if (version === DefaultVersion) return runActivity(actx, 'FooActivity');
  return runActivity(actx, 'BarActivity');
}
export async function VersionedWorkflowV3(ctx: any): Promise<void> {
  const actx = withOpts(ctx);
  const version = await GetVersion(actx, CHANGE_ID, DefaultVersion, V(1));
  if (version === DefaultVersion) return runActivity(actx, 'FooActivity');
  return runActivity(actx, 'BarActivity');
}
export async function VersionedWorkflowV4(ctx: any): Promise<void> {
  const actx = withOpts(ctx);
  await GetVersion(actx, CHANGE_ID, V(1), V(1));
  return runActivity(actx, 'BarActivity');
}
export async function VersionedWorkflowV5(ctx: any): Promise<void> {
  const actx = withOpts(ctx);
  const version = await GetVersion(actx, CHANGE_ID, V(1), V(2), ExecuteWithVersion(V(1)));
  if (Number(version) === 1) return runActivity(actx, 'BarActivity');
  return runActivity(actx, 'BazActivity');
}
export async function VersionedWorkflowV6(ctx: any): Promise<void> {
  const actx = withOpts(ctx);
  const version = await GetVersion(actx, CHANGE_ID, V(1), V(2));
  if (Number(version) === 1) return runActivity(actx, 'BarActivity');
  return runActivity(actx, 'BazActivity');
}

export const VERSIONS: Record<number, (ctx: any) => Promise<void>> = {
  1: VersionedWorkflowV1, 2: VersionedWorkflowV2, 3: VersionedWorkflowV3,
  4: VersionedWorkflowV4, 5: VersionedWorkflowV5, 6: VersionedWorkflowV6,
};

// Upstream compatibility matrix: started-on-version -> versions whose replay succeeds
// (always includes itself). Everything else in 1..6 must FAIL to replay.
export const COMPATIBLE: Record<number, number[]> = {
  1: [1, 2, 3],
  2: [1, 2, 3],
  3: [2, 3, 4, 5, 6],
  4: [2, 3, 4, 5, 6],
  5: [2, 3, 4, 5, 6],
  6: [5, 6],
};

describe('generated worker engine -> real Cadence server (versioned workflow ladder V1-V6)', () => {
  for (let started = 1; started <= 6; started++) {
    it(`a run started on V${started} replays exactly on ${JSON.stringify(COMPATIBLE[started])}`, async () => {
      const service = newWorkflowServiceClient({ address: '127.0.0.1:7833', caller: 'condorance-smoke' });
      const client = clientFromService(
        service,
        DOMAIN,
        `condorance-smoke-versioned-client-v${started}`,
      );
      const taskList = `condorance-smoke-versioned-v${started}-${Date.now()}`;
      const workflowID = `condorance-smoke-versioned-v${started}-${Date.now()}`;
      const worker = await NewWorker(
        service as any, DOMAIN, taskList,
        new WorkerOptions({ Identity: `condorance-smoke-versioned-worker-v${started}` }) as any,
      );
      worker.RegisterWorkflowWithOptions(VERSIONS[started], {
        Name: WORKFLOW_NAME, EnableShortName: false, DisableAlreadyRegisteredCheck: true,
      } as never);
      for (const [name, fn] of [['FooActivity', FooActivity], ['BarActivity', BarActivity], ['BazActivity', BazActivity]] as const) {
        worker.RegisterActivityWithOptions(fn, {
          Name: name, EnableShortName: false, DisableAlreadyRegisteredCheck: true, EnableAutoHeartbeat: false,
        } as never);
      }
      worker.Start();

      try {
        await startWorkflow(client, {
          workflowID,
          taskList,
          workflowType: WORKFLOW_NAME,
          executionTimeoutSeconds: 60,
          decisionTimeoutSeconds: 10,
        });
        let history = '';
        await waitUntil(async () => {
          history = await showWorkflow(client, workflowID);
          return /(?<!Child)WorkflowExecution(Completed|Failed|TimedOut)\b/.test(history);
        }, 30_000, `V${started} live run never reached a terminal event`);
        expect(history).toMatch(/WorkflowExecutionCompleted/);

        // Replay the recorded run under every version; empty RunID = latest run.
        for (let replayed = 1; replayed <= 6; replayed++) {
          const replayer = NewWorkflowReplayerWithOptions({
            FeatureFlags: {
              WorkflowExecutionAlreadyCompletedErrorEnabled: false,
              AutoforwardingEnabled: false,
              PollerAutoScalerEnabled: false,
              EphemeralTaskListsEnabled: false,
              MetricEmitMode: 0,
            },
          } as never);
          replayer.RegisterWorkflowWithOptions(VERSIONS[replayed], {
            Name: WORKFLOW_NAME, EnableShortName: false, DisableAlreadyRegisteredCheck: true,
          } as never);
          let replayErr: unknown;
          try {
            await replayer.ReplayWorkflowExecution(
              background() as any, service as any, NoopLogger(), DOMAIN,
              { ID: workflowID, RunID: '' } as never,
            );
          } catch (err) {
            replayErr = err;
          }
          if (COMPATIBLE[started].includes(replayed)) {
            expect(replayErr, `V${started} history must replay on V${replayed}, got: ${replayErr}`).toBeUndefined();
          } else {
            expect(replayErr, `V${started} history must NOT replay on V${replayed}`).toBeTruthy();
          }
        }
      } finally {
        worker.Stop();
        service.close();
      }
    }, 120_000);
  }
});

async function waitUntil(cond: () => boolean | Promise<boolean>, timeoutMs: number, what: string): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (await cond()) return;
    await new Promise((r) => setTimeout(r, 100));
  }
  throw new Error(`timed out after ${timeoutMs}ms: ${what}`);
}
