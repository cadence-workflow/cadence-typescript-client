/*
 * INTEGRATION — the GENERATED client's SignalWorkflow reaches a REAL server
 * =========================================================================
 * Proves, against a live Cadence frontend, that our GENERATED SDK client code
 * path actually performs the SignalWorkflowExecution RPC and the server receives
 * and records it — not a mock, not the old hand-written engine.
 *
 * Execution path under test (all GENERATED code):
 *   NewClient(...).SignalWorkflow(ctx, wfId, runId, name, arg)
 *     → internal_workflow_client.workflowClient.SignalWorkflow   (generated)
 *       → encodeArg(dataConverter, arg)                          (generated)
 *       → signalWorkflow() free func builds SignalWorkflowExecutionRequest (generated)
 *         → Retry(... isServiceTransientError ...)               (generated)
 *           → service.SignalWorkflowExecution(req)               → GrpcServiceBridge (wire only)
 *                                                                 → real Cadence :7833
 *
 * The ONLY non-generated pieces are: (1) the gRPC wire bridge (grpc_bridge.ts),
 * (2) the control-plane start + history read (harness.ts, IDL/proto), used to set
 * up an open workflow to signal and to verify the server saw the signal.
 *
 * Setup: a Cadence frontend on 127.0.0.1:7833 with the `default` domain.
 * No worker runs the workflow — it stays open, which is all we need to receive a
 * signal and see it in history.
 */
import { describe, expect, it } from 'vitest';

import { getAllEvents, newWorkflowClient, startWorkflow } from './harness.js';

const SIGNAL_NAME = 'generated-signal';

describe('generated workflow client -> real Cadence server', () => {
  it('delivers a signal the real server records', async () => {
    const control = newWorkflowClient('gen-signal-client');
    const workflowID = `cadence-it-generated-signal-${Date.now()}`;
    const { workflowId, runId } = await startWorkflow(control.client, {
      workflowID,
      workflowType: 'cadence_it.GeneratedSignalTarget',
      taskList: 'cadence-it-generated-signal',
      executionTimeoutSeconds: 120,
    });

    try {
      const payload = { hello: 'from-generated', n: 7 };
      await control.client.SignalWorkflow(
        control.context,
        workflowId,
        runId,
        SIGNAL_NAME,
        payload,
      );

      const events = await getAllEvents(control.client, workflowId, runId);
      const signaled = events.filter((event) => event.workflowExecutionSignaledEventAttributes);
      expect(signaled).toHaveLength(1);

      const attrs = signaled[0].workflowExecutionSignaledEventAttributes!;
      expect(attrs.signalName).toBe(SIGNAL_NAME);
      expect(attrs.input?.toString('utf8')).toContain('from-generated');
      expect(attrs.input?.toString('utf8')).toContain('"n":7');
    } finally {
      await control.client.TerminateWorkflow(
        control.context,
        workflowId,
        runId,
        'integration cleanup',
        Buffer.alloc(0),
      );
      control.close();
    }
  }, 60_000);
});
