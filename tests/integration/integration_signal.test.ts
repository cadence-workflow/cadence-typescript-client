/*
 * End-to-end integration: the GENERATED client, over the hand-written transport, against a REAL
 * Cadence server. Nothing between the test and the socket is hand-written except the
 * transport — NewClient, the Client implementation and the signalWorkflow helper are all
 * generated from the Go source.
 *
 * The assertion is deliberately on the ERROR path for a workflow that does not exist: it
 * proves the whole round trip (request struct built by generated code -> thrift encode ->
 * real frontend -> declared thrift exception -> decoded -> thrown back through the
 * generated call stack) without needing a worker to be running.
 *
 * NOTE on Context: the client lane takes Go's STDLIB context.Context, which the SDK models
 * with its own runtime shim — NOT the workflow `internal_Context` from internal/context.ts.
 * They are different types with different method casing (`deadline()` vs `Deadline()`);
 * passing the workflow one compiles only through a cast and then fails at `ctx.deadline()`.
 */
import { describe, it, expect } from 'vitest';
import { newWorkflowServiceClient } from '../../src/workflow_service_client.js';
import { clientFromService, DOMAIN, signalWorkflow } from './harness.js';

describe('generated client -> real Cadence server', () => {
  it("SignalWorkflow surfaces the server's typed error for an unknown workflow", async () => {
    const service = newWorkflowServiceClient({ address: '127.0.0.1:7833', caller: 'condorance-smoke' });
    const client = clientFromService(service, DOMAIN, 'condorance-smoke');
    try {
      const { Retry } = await import('../../src/internal/common/backoff/retry.js');
      void Retry;
      await signalWorkflow(client, 'no-such-workflow-id', 'my-signal', { hello: 'world' });
      throw new Error('expected the server to reject an unknown workflow');
    } catch (e: any) {
      console.log('server said:', e?.message);
      console.log(String(e?.stack).split('\n').slice(0, 6).join('\n'));
      expect(String(e?.message)).toMatch(/does not exist|EntityNotExists|already completed/i);
    } finally {
      service.close();
    }
  }, 30000);
});
