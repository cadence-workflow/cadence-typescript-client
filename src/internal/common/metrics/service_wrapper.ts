// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { Mutex } from 'async-mutex';
import type { WorkflowServiceClientLike } from '../../runtime/workflow_service_client_like.js';
import type { Scope } from '../../runtime/tally.js';
import { CadenceRequest, CadenceError, CadenceInvalidRequest, CadenceLatency } from './constants.js';
import { EmitLatency } from './emit.js';
import { Default1ms100s } from './histograms.js';
import { BadRequestError, DomainAlreadyExistsError, EntityNotExistsError, QueryFailedError, WorkflowExecutionAlreadyCompletedError, WorkflowExecutionAlreadyStartedError } from '../../../errors/idl_errors.js';

export class workflowServiceMetricsWrapper {
  constructor(init?: Partial<workflowServiceMetricsWrapper>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  service?: WorkflowServiceClientLike;

  scope?: Scope;

  childScopes: Record<string, Scope> = {};

  mutex: Mutex = new Mutex();

  async getScope(scopeName: string): Promise<Scope> {
    const release = await this.mutex.acquire();
    let scope = this.childScopes[scopeName]!;
    const ok = scopeName in this.childScopes;
    if (ok) {
      release();
      return scope;
    }
    scope = this.scope!.SubScope(scopeName);
    this.childScopes[scopeName] = scope;
    release();
    return scope;
  }

  async getOperationScope(scopeName: string): Promise<operationScope> {
    const scope = await this.getScope(scopeName);
    scope.Counter(CadenceRequest).Inc(1);

    return new operationScope({
      scope,
      startTime: Date.now() * 1_000_000,
    });
  }

}

export class operationScope {
  constructor(init?: Partial<operationScope>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  scope?: Scope;

  startTime: number = 0;

  handleError(err: Error | null): void {
    EmitLatency(this.scope!, CadenceLatency, Date.now() * 1_000_000 - this.startTime, Default1ms100s);
    if (err != null) {
      if (
        err instanceof EntityNotExistsError ||
        err instanceof BadRequestError ||
        err instanceof DomainAlreadyExistsError ||
        err instanceof WorkflowExecutionAlreadyStartedError ||
        err instanceof WorkflowExecutionAlreadyCompletedError ||
        err instanceof QueryFailedError
      ) {
        this.scope!.Counter(CadenceInvalidRequest).Inc(1);
      } else {
        this.scope!.Counter(CadenceError).Inc(1);
      }
    }
  }

}

/**
 * NewWorkflowServiceWrapper creates a new wrapper to WorkflowService that will emit metrics for each service call.
 */
export function NewWorkflowServiceWrapper(service: WorkflowServiceClientLike, scope: Scope): WorkflowServiceClientLike {
  const wrapper = new workflowServiceMetricsWrapper({ service, scope });
  return new Proxy((service ?? {}) as object, {
    get: (target, prop) => {
      const orig = (target as any)[prop];
      if (typeof orig !== "function") return orig;
      return async (...args: any[]) => {
        const opScope = await wrapper.getOperationScope("cadence-" + String(prop));
        try {
          const result = await orig.call(target, ...args);
          opScope.handleError(null);
          return result;
        } catch (err) {
          opScope.handleError(err as globalThis.Error);
          throw err;
        }
      };
    },
  }) as WorkflowServiceClientLike;
}

export const scopeDeleteDomain = "cadence-DeleteDomain";

export const scopeNameCountWorkflowExecutions = "cadence-CountWorkflowExecutions";

export const scopeNameDeprecateDomain = "cadence-DeprecateDomain";

export const scopeNameDescribeDomain = "cadence-DescribeDomain";

export const scopeNameDescribeTaskList = "cadence-DescribeTaskList";

export const scopeNameDescribeWorkflowExecution = "cadence-DescribeWorkflowExecution";

export const scopeNameDiagnoseWorkflowExecution = "cadence-DiagnoseWorkflowExecution";

export const scopeNameFailoverDomain = "cadence-FailoverDomain";

export const scopeNameGetClusterInfo = "cadence-GetClusterInfo";

export const scopeNameGetSearchAttributes = "cadence-GetSearchAttributes";

export const scopeNameGetTaskListsByDomain = "cadence-GetTaskListsByDomain";

export const scopeNameGetWorkflowExecutionHistory = "cadence-GetWorkflowExecutionHistory";

export const scopeNameGetWorkflowExecutionRawHistory = "cadence-GetWorkflowExecutionRawHistory";

export const scopeNameListArchivedWorkflowExecutions = "cadence-ListArchivedWorkflowExecutions";

export const scopeNameListClosedWorkflowExecutions = "cadence-ListClosedWorkflowExecutions";

export const scopeNameListDomains = "cadence-ListDomains";

export const scopeNameListFailoverHistory = "cadence-ListFailoverHistory";

export const scopeNameListOpenWorkflowExecutions = "cadence-ListOpenWorkflowExecutions";

export const scopeNameListTaskListPartitions = "cadence-ListTaskListPartitions";

export const scopeNameListWorkflowExecutions = "cadence-ListWorkflowExecutions";

export const scopeNamePollForActivityTask = "cadence-PollForActivityTask";

export const scopeNamePollForDecisionTask = "cadence-PollForDecisionTask";

export const scopeNamePollForWorkflowExecutionRawHistory = "cadence-PollForWorkflowExecutionRawHistory";

export const scopeNameQueryWorkflow = "cadence-QueryWorkflow";

export const scopeNameRecordActivityTaskHeartbeat = "cadence-RecordActivityTaskHeartbeat";

export const scopeNameRecordActivityTaskHeartbeatByID = "cadence-RecordActivityTaskHeartbeatByID";

export const scopeNameRegisterDomain = "cadence-RegisterDomain";

export const scopeNameRequestCancelWorkflowExecution = "cadence-RequestCancelWorkflowExecution";

export const scopeNameResetStickyTaskList = "cadence-ResetStickyTaskList";

export const scopeNameResetWorkflowExecution = "cadence-ResetWorkflowExecution";

export const scopeNameRespondActivityTaskCanceled = "cadence-RespondActivityTaskCanceled";

export const scopeNameRespondActivityTaskCanceledByID = "cadence-RespondActivityTaskCanceledByID";

export const scopeNameRespondActivityTaskCompleted = "cadence-RespondActivityTaskCompleted";

export const scopeNameRespondActivityTaskCompletedByID = "cadence-RespondActivityTaskCompletedByID";

export const scopeNameRespondActivityTaskFailed = "cadence-RespondActivityTaskFailed";

export const scopeNameRespondActivityTaskFailedByID = "cadence-RespondActivityTaskFailedByID";

export const scopeNameRespondDecisionTaskCompleted = "cadence-RespondDecisionTaskCompleted";

export const scopeNameRespondDecisionTaskFailed = "cadence-RespondDecisionTaskFailed";

export const scopeNameRespondQueryTaskCompleted = "cadence-RespondQueryTaskCompleted";

export const scopeNameScanWorkflowExecutions = "cadence-ScanWorkflowExecutions";

export const scopeNameSignalWithStartWorkflowExecution = "cadence-SignalWithStartWorkflowExecution";

export const scopeNameSignalWithStartWorkflowExecutionAsync = "cadence-SignalWithStartWorkflowExecutionAsync";

export const scopeNameSignalWorkflowExecution = "cadence-SignalWorkflowExecution";

export const scopeNameStartWorkflowExecution = "cadence-StartWorkflowExecution";

export const scopeNameStartWorkflowExecutionAsync = "cadence-StartWorkflowExecutionAsync";

export const scopeNameTerminateWorkflowExecution = "cadence-TerminateWorkflowExecution";

export const scopeNameUpdateDomain = "cadence-UpdateDomain";

export const scopeRefreshWorkflowTasks = "cadence-RefreshWorkflowTasks";

export const scopeRestartWorkflowExecution = "cadence-RestartWorkflowExecution";
