/*
 * End-to-end integration: DOMAIN FAILOVER (mirrors go-client TestFailoverDomain).
 *
 * Upstream runs this on a SINGLE auto-setup server: the domain is registered
 * as a GLOBAL domain and the failover targets "cluster0" — the server's one
 * and only (already-active) cluster. That degenerate failover still exercises
 * the full API path: Register(IsGlobalDomain) -> Failover -> Describe assert
 * ActiveClusterName.
 */
import { describe, it, expect } from 'vitest';
import { NewDomainClient } from '../../src/internal/client.js';
import { background } from '../../src/internal/runtime/context.js';
import { newWorkflowServiceClient } from '../../src/workflow_service_client.js';

export const FAILOVER_DOMAIN = 'condorance-smoke-xdc-domain';
export const ACTIVE_CLUSTER = 'cluster0';

describe('generated domain client -> real Cadence server (global-domain failover)', () => {
  it('Failover sets the active cluster and Describe reads it back', async () => {
    const service = newWorkflowServiceClient({ address: '127.0.0.1:7833', caller: 'condorance-smoke' });
    const client = NewDomainClient(service as any, { Identity: 'condorance-smoke-failover' } as never);

    try {
      // Register the global domain; a rerun finds it already registered.
      // Invariant: a FRESHLY registered domain is not yet in the server's domain
      // cache — an immediate Failover is rejected as retryable and the client
      // retries past the test deadline. Wait out the cache refresh on first run.
      try {
        await client.Register(background() as any, {
          name: FAILOVER_DOMAIN,
          workflowExecutionRetentionPeriodInDays: 1,
          isGlobalDomain: true,
        } as never);
        await new Promise((r) => setTimeout(r, 12_000));
      } catch (err) {
        const name = (err as Error)?.constructor?.name ?? '';
        const msg = String((err as Error)?.message ?? err);
        if (!/DomainAlreadyExists/i.test(name + ' ' + msg)) throw err;
      }

      await client.Failover(background() as any, {
        domainName: FAILOVER_DOMAIN,
        domainActiveClusterName: ACTIVE_CLUSTER,
      } as never);

      const domain = await client.Describe(background() as any, FAILOVER_DOMAIN);
      expect(domain.replicationConfiguration?.activeClusterName).toBe(ACTIVE_CLUSTER);
      expect(domain.domainInfo?.name).toBe(FAILOVER_DOMAIN);
    } finally {
      service.close();
    }
  }, 60_000);
});
