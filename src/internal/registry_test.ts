// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { internal_Context } from './context.js';
import { expect } from 'vitest';
import { getWorkflowFunctionName, getActivityFunctionName } from './internal_worker.js';
import { newRegistry, registry } from './registry.js';

export class testWorkflowStruct {
  constructor(init?: Partial<testWorkflowStruct>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  Method(ctx: internal_Context): void {
    return;
  }

}

export class testActivityStruct {
  constructor(init?: Partial<testActivityStruct>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  Method(): void {
    return;
  }

}

export async function TestWorkflowRegistration(): Promise<void> {
  const w = new testWorkflowStruct({});
  const tests: {
    msg: string;
    register: (r: registry) => Promise<void>;
    registerPanic: boolean;
    workflowType: string;
    altWorkflowType: string;
    resolveByFunction: unknown;
    resolveByAlias: string;
  }[] = [
    {
      msg: "register workflow function",
      register: async (r: registry) => {
        await r.RegisterWorkflow(testWorkflowFunction);
      },
      registerPanic: false,
      workflowType: "testWorkflowFunction",
      altWorkflowType: "",
      resolveByFunction: testWorkflowFunction,
      resolveByAlias: "",
    },
    {
      msg: "register workflow function with short name",
      register: async (r: registry) => {
        await r.RegisterWorkflowWithOptions(testWorkflowFunction, {
          EnableShortName: true,
          DisableAlreadyRegisteredCheck: false,
          Name: "",
        });
      },
      registerPanic: false,
      workflowType: "testWorkflowFunction",
      altWorkflowType: "",
      resolveByFunction: testWorkflowFunction,
      resolveByAlias: "",
    },
    {
      msg: "register workflow function with alias",
      register: async (r: registry) => {
        await r.RegisterWorkflowWithOptions(testWorkflowFunction, {
          Name: "workflow.alias",
          DisableAlreadyRegisteredCheck: false,
          EnableShortName: false,
        });
      },
      registerPanic: false,
      workflowType: "workflow.alias",
      altWorkflowType: "",
      resolveByFunction: testWorkflowFunction,
      resolveByAlias: "workflow.alias",
    },
    {
      msg: "register workflow struct function (backwards compatible)",
      register: async (r: registry) => {
        await r.RegisterWorkflow(w.Method);
      },
      registerPanic: false,
      workflowType: "Method",
      altWorkflowType: "Method",
      resolveByFunction: w.Method,
      resolveByAlias: "",
    },
    {
      msg: "register duplicated workflow in one registry (should panic)",
      register: async (r: registry) => {
        await r.RegisterWorkflow(testWorkflowFunction);
        await r.RegisterWorkflow(testWorkflowFunction);
      },
      registerPanic: true,
      workflowType: "",
      altWorkflowType: "",
      resolveByFunction: undefined,
      resolveByAlias: "",
    },
    {
      msg: "register duplicated workflow with already registered check disabled",
      register: async (r: registry) => {
        await r.RegisterWorkflow(testWorkflowFunction);
        await r.RegisterWorkflowWithOptions(testWorkflowFunction, {
          DisableAlreadyRegisteredCheck: true,
          EnableShortName: false,
          Name: "",
        });
      },
      registerPanic: false,
      workflowType: "testWorkflowFunction",
      altWorkflowType: "",
      resolveByFunction: testWorkflowFunction,
      resolveByAlias: "",
    },
    {
      msg: "register duplicated workflow in chained registry (should panic)",
      register: async (r: registry) => {
        await r.next!.RegisterWorkflow(testWorkflowFunction);
        await r.RegisterWorkflow(testWorkflowFunction);
      },
      registerPanic: true,
      workflowType: "",
      altWorkflowType: "",
      resolveByFunction: undefined,
      resolveByAlias: "",
    },
  ];

  for (const tt of tests) {
    const r = await newRegistry();

    if (tt.registerPanic) {
      await expect(tt.register(r)).rejects.toThrow();
      continue;
    }

    await tt.register(r);

    const workflowType = (await r.GetRegisteredWorkflows())[0].WorkflowType().Name;
    // @go-weakened: Go package-qualified reflection names are normalized to bare JavaScript function names.
    expect(workflowType).toEqual(tt.workflowType);

    const [, ok] = await r.getWorkflowFn(tt.workflowType);
    expect(ok).toBe(true);

    if (tt.altWorkflowType.length > 0) {
      const [, altOk] = await r.getWorkflowFn(tt.altWorkflowType);
      expect(altOk).toBe(true);
    }

    const resolvedWorkflowType = await getWorkflowFunctionName(r, tt.resolveByFunction);
    // @go-weakened: Go package-qualified reflection names are normalized to bare JavaScript function names.
    expect(resolvedWorkflowType).toEqual(tt.workflowType);

    if (tt.resolveByAlias !== "") {
      const resolvedAliasWorkflowType = await getWorkflowFunctionName(r, tt.resolveByAlias);
      expect(resolvedAliasWorkflowType).toEqual(tt.workflowType);
    }
  }
}

export async function TestActivityRegistration(): Promise<void> {
  const tests: {
    msg: string;
    register: (r: registry) => Promise<void>;
    registerPanic: boolean;
    activityType: string;
    altActivityType: string;
    resolveByFunction: unknown;
    resolveByAlias: string;
  }[] = [
    {
      msg: "register activity function",
      register: async (r: registry) => {
        await r.RegisterActivity(testActivityFunction);
      },
      registerPanic: false,
      activityType: "testActivityFunction",
      altActivityType: "",
      resolveByFunction: testActivityFunction,
      resolveByAlias: "",
    },
    {
      msg: "register activity function with short name",
      register: async (r: registry) => {
        await r.RegisterActivityWithOptions(testActivityFunction, {
          EnableShortName: true,
          DisableAlreadyRegisteredCheck: false,
          EnableAutoHeartbeat: false,
          Name: "",
        });
      },
      registerPanic: false,
      activityType: "testActivityFunction",
      altActivityType: "",
      resolveByFunction: testActivityFunction,
      resolveByAlias: "",
    },
    {
      msg: "register activity function with an alias",
      register: async (r: registry) => {
        await r.RegisterActivityWithOptions(testActivityFunction, {
          Name: "activity.alias",
          DisableAlreadyRegisteredCheck: false,
          EnableAutoHeartbeat: false,
          EnableShortName: false,
        });
      },
      registerPanic: false,
      activityType: "activity.alias",
      altActivityType: "",
      resolveByFunction: testActivityFunction,
      resolveByAlias: "activity.alias",
    },
    {
      msg: "register activity struct",
      register: async (r: registry) => {
        await r.RegisterActivity(new testActivityStruct({}));
      },
      registerPanic: false,
      activityType: "Method",
      altActivityType: "Method",
      resolveByFunction: new testActivityStruct({}).Method,
      resolveByAlias: "",
    },
    {
      msg: "register activity struct with short name",
      register: async (r: registry) => {
        await r.RegisterActivityWithOptions(new testActivityStruct({}), {
          EnableShortName: true,
          DisableAlreadyRegisteredCheck: false,
          EnableAutoHeartbeat: false,
          Name: "",
        });
      },
      registerPanic: false,
      activityType: "Method",
      altActivityType: "",
      resolveByFunction: new testActivityStruct({}).Method,
      resolveByAlias: "",
    },
    {
      msg: "register activity struct with a prefix",
      register: async (r: registry) => {
        await r.RegisterActivityWithOptions(new testActivityStruct({}), {
          Name: "prefix.",
          DisableAlreadyRegisteredCheck: false,
          EnableAutoHeartbeat: false,
          EnableShortName: false,
        });
      },
      registerPanic: false,
      activityType: "prefix.Method",
      altActivityType: "",
      resolveByFunction: new testActivityStruct({}).Method,
      resolveByAlias: "prefix.Method",
    },
    {
      msg: "register duplicated activity function in one registry (should panic)",
      register: async (r: registry) => {
        const duplicatedActivityAlias = "activity.alias";
        await r.RegisterActivityWithOptions(testActivityFunction, {
          Name: duplicatedActivityAlias,
          DisableAlreadyRegisteredCheck: false,
          EnableAutoHeartbeat: false,
          EnableShortName: false,
        });
        await r.RegisterActivityWithOptions(testActivityFunction, {
          Name: duplicatedActivityAlias,
          DisableAlreadyRegisteredCheck: false,
          EnableAutoHeartbeat: false,
          EnableShortName: false,
        });
      },
      registerPanic: true,
      activityType: "",
      altActivityType: "",
      resolveByFunction: undefined,
      resolveByAlias: "",
    },
    {
      msg: "register duplicated activity struct with already registered check disabled",
      register: async (r: registry) => {
        await r.RegisterActivity(new testActivityStruct({}));
        await r.RegisterActivityWithOptions(new testActivityStruct({}), {
          DisableAlreadyRegisteredCheck: true,
          EnableAutoHeartbeat: false,
          EnableShortName: false,
          Name: "",
        });
      },
      registerPanic: false,
      activityType: "Method",
      altActivityType: "",
      resolveByFunction: new testActivityStruct({}).Method,
      resolveByAlias: "",
    },
    {
      msg: "register duplicated activity function in chained registry (should panic)",
      register: async (r: registry) => {
        await r.next!.RegisterActivity(testActivityFunction);
        await r.RegisterActivity(testActivityFunction);
      },
      registerPanic: true,
      activityType: "",
      altActivityType: "",
      resolveByFunction: undefined,
      resolveByAlias: "",
    },
  ];

  for (const tt of tests) {
    const r = await newRegistry();

    if (tt.registerPanic) {
      await expect(tt.register(r)).rejects.toThrow();
      continue;
    }

    await tt.register(r);

    const activities = await r.getRegisteredActivities();
    const activityType = activities[0].ActivityType().Name;
    // @go-weakened: Go reflection-qualified type/function names are represented by bare JavaScript function names.
    expect(activityType).toEqual(tt.activityType);

    const [, ok] = await r.GetActivity(tt.activityType);
    expect(ok).toBe(true);

    if (tt.altActivityType.length > 0) {
      const [, altOk] = await r.GetActivity(tt.altActivityType);
      expect(altOk).toBe(true);
    }

    let resolvedActivityType = await getActivityFunctionName(r, tt.resolveByFunction);
    // @go-weakened: Go reflection-qualified type/function names are represented by bare JavaScript function names.
    expect(resolvedActivityType).toEqual(tt.activityType);

    if (tt.resolveByAlias !== "") {
      resolvedActivityType = await getActivityFunctionName(r, tt.resolveByAlias);
      // @go-weakened: Go reflection-qualified type/function names are represented by bare JavaScript function names.
      expect(resolvedActivityType).toEqual(tt.activityType);
    }
  }
}

export function testActivityFunction(): void { return; }

export function testWorkflowFunction(ctx: internal_Context): void { return; }
