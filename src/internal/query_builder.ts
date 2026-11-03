// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { StringsBuilder } from './runtime/strings_builder.js';

export interface QueryBuilder {
  WorkflowTypes(p0: string[]): QueryBuilder;
  ExcludeWorkflowTypes(p0: string[]): QueryBuilder;
  WorkflowStatus(p0: WorkflowStatus[]): QueryBuilder;
  StartTime(p0: number, p1: number): QueryBuilder;
  CloseTime(p0: number, p1: number): QueryBuilder;
  Build(): string;
}

/**
 * WorkflowStatus represents the status of a workflow
 */
export enum WorkflowStatus {
  WorkflowStatusOpen = "OPEN",
  WorkflowStatusClosed = "CLOSED",
  WorkflowStatusALL = "ALL",
  WorkflowStatusCanceled = "CANCELED",
  WorkflowStatusCompleted = "COMPLETED",
  WorkflowStatusContinuedAsNew = "CONTINUED_AS_NEW",
  WorkflowStatusFailed = "FAILED",
  WorkflowStatusTerminated = "TERMINATED",
  WorkflowStatusTimedOut = "TIMED_OUT",
}

export class queryBuilderImpl implements QueryBuilder {
  constructor(init?: Partial<queryBuilderImpl>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  builder: StringsBuilder = new StringsBuilder();

  WorkflowTypes(types: string[]): QueryBuilder {
    const workflowTypeQueries = types.map((workflowType) => `${keyWorkflowType} = "${workflowType}"`);
    this.appendPartialQuery(workflowTypeQueries.join(" or "));
    return this;
  }

  ExcludeWorkflowTypes(types: string[]): QueryBuilder {
    if (types.length === 0) {
      return this;
    }
    const excludeTypeQueries = types.map((workflowType) => `${keyWorkflowType} != "${workflowType}"`);
    this.appendPartialQuery(excludeTypeQueries.join(" and "));
    return this;
  }

  WorkflowStatus(statuses: WorkflowStatus[]): QueryBuilder {
    const workflowStatusQueries: string[] = [];
    for (const status of statuses) {
      let statusQuery = "";
      switch (status) {
        case WorkflowStatus.WorkflowStatusOpen:
          statusQuery = keyCloseTime + " = missing";
          break;
        case WorkflowStatus.WorkflowStatusClosed:
          statusQuery = keyCloseTime + " != missing";
          break;
        case WorkflowStatus.WorkflowStatusALL:
          return this;
        default:
          statusQuery = keyCloseStatus + ' = "' + String(status) + '"';
      }
      workflowStatusQueries.push(statusQuery);
    }
    this.appendPartialQuery(workflowStatusQueries.join(" or "));
    return this;
  }

  StartTime(minStartTime: number, maxStartTime: number): QueryBuilder {
    const startTimeQueries: string[] = [];
    if (minStartTime !== 0) {
      startTimeQueries.push(`${keyStartTime} >= ${minStartTime}`);
    }
    if (maxStartTime !== maxTimestamp) {
      startTimeQueries.push(`${keyStartTime} <= ${maxStartTime}`);
    }

    this.appendPartialQuery(startTimeQueries.join(" and "));
    return this;
  }

  CloseTime(minCloseTime: number, maxCloseTime: number): QueryBuilder {
    const closeTimeQueries: string[] = [];
    if (minCloseTime !== 0) {
      closeTimeQueries.push(`${keyCloseTime} >= ${minCloseTime}`);
    }
    if (maxCloseTime !== maxTimestamp) {
      closeTimeQueries.push(`${keyCloseTime} <= ${maxCloseTime}`);
    }

    this.appendPartialQuery(closeTimeQueries.join(" and "));
    return this;
  }

  Build(): string {
    return this.builder.String();
  }

  appendPartialQuery(query: string): void {
    if (query.length === 0) {
      return;
    }

    if (this.builder.Len() !== 0) {
      this.builder.WriteString(" and ");
    }

    this.builder.WriteRune("(");
    this.builder.WriteString(query);
    this.builder.WriteRune(")");
  }

}

/**
 * NewQueryBuilder creates a new visibility QueryBuilder
 */
export function NewQueryBuilder(): QueryBuilder {
  return new queryBuilderImpl({ builder: new StringsBuilder() });
}

/**
 * ToWorkflowStatus converts workflow status from string type to WorkflowStatus type
 */
export function ToWorkflowStatus(statusString: string): WorkflowStatus {
  const status = statusString.toUpperCase();

  switch (status) {
    case WorkflowStatus.WorkflowStatusOpen:
    case WorkflowStatus.WorkflowStatusClosed:
    case WorkflowStatus.WorkflowStatusCompleted:
    case WorkflowStatus.WorkflowStatusFailed:
    case WorkflowStatus.WorkflowStatusCanceled:
    case WorkflowStatus.WorkflowStatusTerminated:
    case WorkflowStatus.WorkflowStatusContinuedAsNew:
    case WorkflowStatus.WorkflowStatusTimedOut:
    case WorkflowStatus.WorkflowStatusALL:
      return status as WorkflowStatus;
    default:
      throw new Error(`unknown workflow status: ${statusString}`);
  }
}

export const keyCloseStatus = "CloseStatus";

export const keyCloseTime = "CloseTime";

export const keyStartTime = "StartTime";

export const keyWorkflowType = "WorkflowType";

/**
 * WorkflowStatusCompleted is the WorkflowStatus for completed workflow
 */
export let WorkflowStatusCompleted = WorkflowStatus.WorkflowStatusCompleted;

/**
 * WorkflowStatusFailed is the WorkflowStatus for failed workflows
 */
export let WorkflowStatusFailed = WorkflowStatus.WorkflowStatusFailed;

/**
 * WorkflowStatusCanceled is the WorkflowStatus for canceled workflows
 */
export let WorkflowStatusCanceled = WorkflowStatus.WorkflowStatusCanceled;

/**
 * WorkflowStatusTerminated is the WorkflowStatus for terminated workflows
 */
export let WorkflowStatusTerminated = WorkflowStatus.WorkflowStatusTerminated;

/**
 * WorkflowStatusContinuedAsNew is the WorkflowStatus for continuedAsNew workflows
 */
export let WorkflowStatusContinuedAsNew = WorkflowStatus.WorkflowStatusContinuedAsNew;

/**
 * WorkflowStatusTimedOut is the WorkflowStatus for timedout workflows
 */
export let WorkflowStatusTimedOut = WorkflowStatus.WorkflowStatusTimedOut;

export let maxTimestamp = 9223372036854774784;
