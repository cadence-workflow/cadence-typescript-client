// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { expect } from 'vitest';
import { EnableVerboseLogging } from './internal_public.js';
import { NewWorker, WorkerOptions } from './worker.js';
import { internal_ShadowOptions } from './workflow_shadower.js';

export function TestMain(): void {
  EnableVerboseLogging(true);
}

export async function Test_NewWorker(): Promise<void> {
  const makeOptions = (overrides: Partial<WorkerOptions> = {}): WorkerOptions =>
    new WorkerOptions({
      AutoScalerOptions: {
        Enabled: false,
        Cooldown: 0,
        PollerMinCount: 0,
        PollerMaxCount: 0,
        PollerInitCount: 0,
        PollerWaitTimeUpperBound: 0,
        PollerWaitTimeLowerBound: 0,
      },
      ContextPropagators: [],
      DisableActivityWorker: false,
      DisableStickyExecution: false,
      DisableWorkflowWorker: false,
      EnableLoggingInReplay: false,
      EnableSessionWorker: false,
      EnableShadowWorker: false,
      FeatureFlags: {
        WorkflowExecutionAlreadyCompletedErrorEnabled: false,
        AutoforwardingEnabled: false,
        PollerAutoScalerEnabled: false,
        EphemeralTaskListsEnabled: false,
        MetricEmitMode: 0,
      },
      Identity: "",
      IsolationGroup: "",
      MaxConcurrentActivityExecutionSize: 0,
      MaxConcurrentActivityTaskPollers: 0,
      MaxConcurrentDecisionTaskExecutionSize: 0,
      MaxConcurrentDecisionTaskPollers: 0,
      MaxConcurrentLocalActivityExecutionSize: 0,
      MaxConcurrentSessionExecutionSize: 0,
      MinConcurrentActivityTaskPollers: 0,
      MinConcurrentDecisionTaskPollers: 0,
      NonDeterministicWorkflowPolicy: 0,
      PollerAutoScalerCooldown: 0,
      PollerAutoScalerDryRun: false,
      PollerAutoScalerTargetUtilization: 0,
      ShadowOptions: new internal_ShadowOptions(),
      StickyScheduleToStartTimeout: 0,
      TaskListActivitiesPerSecond: 0,
      WorkerActivitiesPerSecond: 0,
      WorkerBugPorts: { DisableStrictNonDeterminismCheck: false },
      WorkerDecisionTasksPerSecond: 0,
      WorkerLocalActivitiesPerSecond: 0,
      WorkerStats: {},
      WorkerStopTimeout: 0,
      WorkflowInterceptorChainFactories: [],
      ...overrides,
    });

  const tests: { name: string; options: WorkerOptions; expectErr: string }[] = [
    {
      name: "happy with default value",
      options: makeOptions(),
      expectErr: "",
    },
    {
      name: "happy with explicit decision task poller set to 1 if sticky task list is disabled",
      options: makeOptions({
        MaxConcurrentDecisionTaskPollers: 1,
        DisableStickyExecution: true,
      }),
      expectErr: "",
    },
    {
      name: "invalid worker with explicit decision task poller set to 1",
      options: makeOptions({
        MaxConcurrentDecisionTaskPollers: 1,
      }),
      expectErr: "DecisionTaskPollers must be >= 2 or use default value",
    },
  ];

  for (const tt of tests) {
    let worker: unknown = null;
    let err: unknown = null;

    try {
      worker = await NewWorker(undefined, "test-domain", "test-tasklist", tt.options);
    } catch (caught) {
      err = caught;
    }

    if (tt.expectErr !== "") {
      expect(err).not.toBeNull();
      expect(err instanceof Error ? err.message : String(err)).toContain(tt.expectErr);
      expect(worker).toBeNull();
    } else {
      expect(err).toBeNull();
      expect(worker).not.toBeNull();
    }
  }
}
