// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { workflow_Context } from './context.js';
import { workflow_Future } from './deterministic_wrappers.js';
import { NewBatchFuture as batch_NewBatchFuture } from '../internal/batch/batch_future.js';

export interface workflow_BatchFuture {
  IsReady(): boolean;
  Get(ctx: workflow_Context, valuePtr: unknown): void;
  GetFutures(): workflow_Future[];
}

/**
 * NewBatchFuture creates a bounded-concurrency helper for doing bulk work in your workflow.
 * It does not reduce the amount of history your workflow stores, so any event-count
 * or history-size limits are unaffected - you must still be cautious about the total
 * amount of work you do in any workflow.
 * 
 * When NewBatchFuture is called, futures created by the factories will be started concurrently until the concurrency limit (batchSize) is reached.
 * The remaining factories will be queued and started as previous futures complete, maintaining the specified concurrency level.
 */
export async function NewBatchFuture(ctx: workflow_Context, batchSize: number, factories: ((p0: workflow_Context) => workflow_Future)[]): Promise<workflow_BatchFuture> {
  return await batch_NewBatchFuture(ctx, batchSize, factories);
}
