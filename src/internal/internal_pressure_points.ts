// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { workflowWorker, newWorkflowWorker, workerExecutionParameters } from './internal_worker.js';
import { registry } from './registry.js';
import type { WorkflowServiceClientLike } from './runtime/workflow_service_client_like.js';
import { Second } from './runtime/time.js';
import { Logger } from 'winston';

export interface pressurePointMgr {
  Execute(pressurePointName: string): Promise<void>;
}

export class pressurePointMgrImpl implements pressurePointMgr {
  constructor(init?: Partial<pressurePointMgrImpl>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  config: Record<string, Record<string, string>> = {};

  logger?: Logger;

  async Execute(pressurePointName: string): Promise<void> {
    if (pressurePointName in this.config) {
      const config = this.config[pressurePointName]!;
      if (pressurePointConfigProbability in config) {
        const value = config[pressurePointConfigProbability];
        if (/^[+-]?\d+$/.test(value)) {
          const probability = Number(value);
          if (Number.isSafeInteger(probability) && Math.floor(Math.random() * 100) < probability) {
            this.logger!.debug("pressurePointMgrImpl.Execute drop task.", {
              PressurePointName: pressurePointName,
              probability,
            });
            throw new Error("pressurepoint configured");
          }
        }
      } else if (pressurePointConfigSleep in config) {
        const value = config[pressurePointConfigSleep];
        if (/^[+-]?\d+$/.test(value)) {
          const timeout = Number(value);
          if (Number.isSafeInteger(timeout) && timeout > 0) {
            this.logger!.debug("pressurePointMgrImpl.Execute sleep.", {
              PressurePointName: pressurePointName,
              DurationSeconds: timeout,
            });
            await new Promise<void>((resolve) => setTimeout(resolve, (timeout * Second) / 1e6));
            return;
          }
        }
      }
    }
  }

}

/**
 * newWorkflowWorkerWithPressurePoints returns an instance of a workflow worker.
 */
export function newWorkflowWorkerWithPressurePoints(service: WorkflowServiceClientLike, domain: string, params: workerExecutionParameters, pressurePoints: Record<string, Record<string, string>>, registry: registry): workflowWorker {
  return newWorkflowWorker(
    service,
    domain,
    params,
    new pressurePointMgrImpl({ config: pressurePoints, logger: params.Logger! }),
    registry,
    undefined,
  );
}

/**
 * PressurePoints
 */
export const pressurePointConfigProbability = "probability";

/**
 * PressurePoints
 */
export const pressurePointConfigSleep = "sleep";

/**
 * PressurePoints
 */
export const pressurePointTypeActivityTaskScheduleTimeout = "activity-task-schedule-timeout";

/**
 * PressurePoints
 */
export const pressurePointTypeActivityTaskStartTimeout = "activity-task-start-timeout";

/**
 * PressurePoints
 */
export const pressurePointTypeDecisionTaskCompleted = "decision-task-complete";

/**
 * PressurePoints
 */
export const pressurePointTypeDecisionTaskStartTimeout = "decision-task-start-timeout";

/**
 * PressurePoints
 */
export const workerOptionsConfig = "worker-options";

/**
 * PressurePoints
 */
export const workerOptionsConfigConcurrentPollRoutineSize = "ConcurrentPollRoutineSize";
