// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { resultHandler } from './internal_worker_base.js';

export interface timerInfo {
  timerID: string;
}

export interface workflowTimerClient {
  Now(): number;
  NewTimer(d: number, callback: resultHandler): timerInfo | undefined;
  RequestCancelTimer(timerID: string): void;
}
