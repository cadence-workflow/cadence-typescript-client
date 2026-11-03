// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { Mutex } from 'async-mutex';
import { RegisterActivityOptions } from './activity.js';
import { activity } from './internal_activity.js';
import { syncWorkflowDefinition, workflow, newSyncWorkflowDefinition } from './internal_workflow.js';
import { RegisterWorkflowOptions, internal_WorkflowType } from './workflow.js';
import { Once } from './runtime/sync.js';
import { activityExecutor, getFunctionName, validateFnFormat, workflowExecutor } from './internal_worker.js';

export class registry {
  constructor(init?: Partial<registry>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  Mutex: Mutex = new Mutex();

  workflowFuncMap: Record<string, workflow> = {};

  workflowAliasMap: Record<string, string> = {};

  activityFuncMap: Record<string, activity> = {};

  activityAliasMap: Record<string, string> = {};

  next?: registry;

  async RegisterWorkflow(af: unknown): Promise<void> {
    await this.RegisterWorkflowWithOptions(af, {
      DisableAlreadyRegisteredCheck: false,
      EnableShortName: false,
      Name: "",
    });
  }

  async RegisterWorkflowWithOptions(wf: unknown, options: RegisterWorkflowOptions): Promise<void> {
    const fnType = wf;
    validateFnFormat(fnType, true);

    const fnName = getFunctionName(wf);
    const alias = options.Name;
    let registerName = fnName;

    if (options.EnableShortName) {
      registerName = getShortFunctionName(fnName);
    }
    if (alias.length > 0) {
      registerName = alias;
    }

    await this.Lock();
    try {
      if (!options.DisableAlreadyRegisteredCheck) {
        const [, ok] = this.getWorkflowNoLock(registerName);
        if (ok) {
          throw `workflow name "${registerName}" is already registered`;
        }
      }

      this.workflowFuncMap[registerName] = new workflowExecutor({
        fn: wf,
        path: "",
        workflowType: "",
      });

      if (alias.length > 0 || options.EnableShortName) {
        this.workflowAliasMap[fnName] = registerName;
      }
    } finally {
      this.Unlock();
    }
  }

  async RegisterActivity(af: unknown): Promise<void> {
    await this.RegisterActivityWithOptions(af, {
      DisableAlreadyRegisteredCheck: false,
      EnableAutoHeartbeat: false,
      EnableShortName: false,
      Name: "",
    });
  }

  async RegisterActivityWithOptions(af: unknown, options: RegisterActivityOptions): Promise<void> {
    if (af != null && typeof af === 'object') {
      await this.registerActivityStruct(af, options);
    } else {
      await this.registerActivityFunction(af, options);
    }
  }

  async GetRegisteredWorkflows(): Promise<workflow[]> {
    await this.Lock();
    const result: workflow[] = [];
    for (const wf of Object.values(this.workflowFuncMap ?? {})) {
      result.push(wf);
    }
    this.Unlock();
    if (this.next != null) {
      const nextWFs = await this.next!.GetRegisteredWorkflows();
      result.push(...nextWFs);
    }
    return result;
  }

  async registerActivityFunction(af: unknown, options: RegisterActivityOptions): Promise<void> {
    const fnType = af;
    try {
      validateFnFormat(fnType, false);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
      throw new Error(`failed to register activity method: ${err.message}`);
    }

    const fnName = getFunctionName(af);
    const alias = options.Name;
    let registerName = fnName;

    if (options.EnableShortName) {
      registerName = getShortFunctionName(fnName);
    }
    if (alias.length > 0) {
      registerName = alias;
    }

    await this.Lock();
    try {
      if (!options.DisableAlreadyRegisteredCheck) {
        const [, ok] = this.getActivityNoLock(registerName);
        if (ok) {
          throw new Error(`activity type "${registerName}" is already registered`);
        }
      }

      this.activityFuncMap[registerName] = new activityExecutor({
        name: registerName,
        fn: af,
        options,
        path: fnName,
      });

      if (alias.length > 0 || options.EnableShortName) {
        this.activityAliasMap[fnName] = registerName;
      }
    } finally {
      this.Unlock();
    }
  }

  async registerActivityStruct(aStruct: unknown, options: RegisterActivityOptions): Promise<void> {
    await this.Lock();
    try {
      const methods: string[] = [];
      const seen = new Set<string>();
      let prototype = Object.getPrototypeOf(aStruct);

      while (prototype != null && prototype !== Object.prototype) {
        for (const name of Object.getOwnPropertyNames(prototype)) {
          if (
            name !== "constructor" &&
            !seen.has(name) &&
            name.length > 0 &&
            name[0] === name[0].toUpperCase() &&
            name[0] !== name[0].toLowerCase()
          ) {
            seen.add(name);
            methods.push(name);
          }
        }
        prototype = Object.getPrototypeOf(prototype);
      }

      methods.sort();

      const structName =
        (aStruct as { constructor?: { name?: string } }).constructor?.name ?? "";
      let count = 0;

      for (const methodName of methods) {
        const methodValue = (aStruct as Record<string, unknown>)[methodName];
        try {
          validateFnFormat(methodValue, false);
        } catch (err) {
          if (!(err instanceof Error)) {
            throw err;
          }
          throw new Error(
            `failed to register activity method ${methodName} of ${structName}: ${err.message}`,
          );
        }

        const structPrefix = options.Name;
        let registerName = getFunctionName(methodValue);

        if (options.EnableShortName) {
          registerName = getShortFunctionName(registerName);
        }
        if (structPrefix.length > 0) {
          registerName = structPrefix + getShortFunctionName(registerName);
        }

        if (!options.DisableAlreadyRegisteredCheck) {
          const [, ok] = this.getActivityNoLock(registerName);
          if (ok) {
            throw new Error(`activity type "${registerName}" is already registered`);
          }
        }

        this.activityFuncMap[registerName] = new activityExecutor({
          name: registerName,
          fn: methodValue,
          options,
          path: methodName,
        });

        if (structPrefix.length > 0 || options.EnableShortName) {
          this.activityAliasMap[methodName] = registerName;
        }
        count++;
      }

      if (count === 0) {
        throw new Error(`no activities (public methods) found in ${structName} structure`);
      }
    } finally {
      this.Unlock();
    }
  }

  async getWorkflowAlias(fnName: string): Promise<[string, boolean]> {
    await this.Lock();
    const alias = this.workflowAliasMap[fnName]! ?? "";
    const ok = fnName in this.workflowAliasMap;
    if (!ok && this.next != null) {
      this.Unlock();
      return this.next!.getWorkflowAlias(fnName);
    }
    this.Unlock();
    return [alias, ok];
  }

  async getWorkflowFn(fnName: string): Promise<[unknown | undefined, boolean]> {
    await this.Lock();
    let wf = this.workflowFuncMap[fnName]!;
    let ok = fnName in this.workflowFuncMap;
    if (!ok) {
      const registerName = fnName.endsWith("-fm") ? fnName.slice(0, -3) : fnName;
      wf = this.workflowFuncMap[registerName]!;
      ok = registerName in this.workflowFuncMap;
    }
    if (!ok && this.next != null) {
      this.Unlock();
      return await this.next!.getWorkflowFn(fnName);
    }
    this.Unlock();
    if (ok) {
      return [wf.GetFunction(), ok];
    }
    return [undefined, ok];
  }

  getWorkflowNoLock(registerName: string): [unknown | undefined, boolean] {
    const a = this.workflowFuncMap[registerName]!;
    const ok = registerName in this.workflowFuncMap;
    if (!ok && this.next != null) {
      return this.next!.getWorkflowNoLock(registerName);
    }
    if (ok) {
      return [a.GetFunction(), ok];
    }
    return [undefined, ok];
  }

  async GetRegisteredWorkflowTypes(): Promise<string[]> {
    await this.Lock();
    const result = Object.keys(this.workflowFuncMap);
    this.Unlock();
    if (this.next != null) {
      const nextTypes = await this.next!.GetRegisteredWorkflowTypes();
      result.push(...nextTypes);
    }
    return result;
  }

  async getActivityAlias(fnName: string): Promise<[string, boolean]> {
    await this.Lock();
    const alias = this.activityAliasMap[fnName]!;
    const ok = fnName in this.activityAliasMap;
    if (!ok && this.next != null) {
      this.Unlock();
      return await this.next!.getActivityAlias(fnName);
    }
    this.Unlock();
    return [alias, ok];
  }

  async addActivityWithLock(fnName: string, a: activity): Promise<void> {
    await this.Lock();
    try {
      this.activityFuncMap[fnName]! = a;
    } finally {
      this.Unlock();
    }
  }

  async GetActivity(fnName: string): Promise<[activity, boolean]> {
    await this.Lock();
    let a = this.activityFuncMap[fnName]!;
    let ok = fnName in this.activityFuncMap;
    if (!ok) {
      const registerName = fnName.endsWith("-fm") ? fnName.slice(0, -3) : fnName;
      a = this.activityFuncMap[registerName]!;
      ok = registerName in this.activityFuncMap;
    }
    if (!ok && this.next != null) {
      this.Unlock();
      return await this.next.GetActivity(fnName);
    }
    this.Unlock();
    return [a, ok];
  }

  getActivityNoLock(registerName: string): [activity, boolean] {
    const a = this.activityFuncMap[registerName]!;
    const ok = registerName in this.activityFuncMap;
    if (!ok && this.next != null) {
      return this.next!.getActivityNoLock(registerName);
    }
    return [a, ok];
  }

  async getRegisteredActivities(): Promise<activity[]> {
    await this.Lock();
    const activities: activity[] = [];
    for (const a of Object.values(this.activityFuncMap ?? {})) {
      activities.push(a);
    }
    this.Unlock();
    if (this.next != null) {
      const nextActivities = await this.next!.getRegisteredActivities();
      activities.push(...nextActivities);
    }
    return activities;
  }

  async getWorkflowDefinition(wt: internal_WorkflowType): Promise<syncWorkflowDefinition> {
    let lookup = getFunctionName(wt.Name);
    const [alias, ok] = await this.getWorkflowAlias(lookup);
    if (ok) {
      lookup = alias;
    }

    const [wf, found] = await this.getWorkflowFn(lookup);
    if (!found) {
      const supported = (await this.GetRegisteredWorkflowTypes()).join(", ");
      throw new Error(`${errMsgUnknownWorkflowType}: ${lookup}. Supported types: [${supported}]`);
    }

    const wd = new workflowExecutor({
      workflowType: lookup,
      fn: wf,
      path: "",
    });
    return newSyncWorkflowDefinition(wd);
  }

  async Lock(): Promise<void> {
    await this.Mutex.acquire();
  }

  TryLock(): boolean {
    if (this.Mutex.isLocked()) {
      return false;
    }
    void this.Mutex.acquire();
    return true;
  }

  Unlock(): void {
    this.Mutex.release();
  }

}

export function newRegistry(): registry {
  return new registry({
    Mutex: new Mutex(),
    workflowFuncMap: {},
    workflowAliasMap: {},
    activityFuncMap: {},
    activityAliasMap: {},
    next: getGlobalRegistry(),
  });
}

export function getGlobalRegistry(): registry {
  once.Do(() => {
    globalRegistry = new registry();
  });
  return globalRegistry;
}

export function getShortFunctionName(fnName: string): string {
  const elements = fnName.split(".");
  return elements[elements.length - 1];
}

export const errMsgUnknownWorkflowType = "unable to find workflow type";

export let once = new Once();

/**
 * Singleton to hold the host registration details.
 */
export let globalRegistry: any = undefined;
