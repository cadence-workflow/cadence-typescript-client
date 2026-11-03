/*
 * End-to-end integration: DOMAIN CLIENT UPDATE + DESCRIBE (mirrors go-client
 * TestDomainUpdate).
 *
 * Uses the generated DomainClient against the real server: Update the domain's
 * description, then Describe the domain and assert the new description landed.
 * The description is timestamped so every run proves a fresh round trip.
 */
import { describe, it, expect } from 'vitest';
import { NewDomainClient } from '../../src/internal/client.js';
import { background } from '../../src/internal/runtime/context.js';
import { newWorkflowServiceClient } from '../../src/workflow_service_client.js';

export const DOMAIN = process.env.CADENCE_DOMAIN ?? 'default';

describe('generated domain client -> real Cadence server (update + describe)', () => {
  it('Update changes the domain description and Describe reads it back', async () => {
    const service = newWorkflowServiceClient({ address: '127.0.0.1:7833', caller: 'condorance-smoke' });
    const client = NewDomainClient(service as any, { Identity: 'condorance-smoke-domain' } as never);

    try {
      const description = `condorance-smoke-description-${Date.now()}`;
      await client.Update(background() as any, {
        name: DOMAIN,
        updatedInfo: { description },
      } as never);

      const domain = await client.Describe(background() as any, DOMAIN);
      expect(domain.domainInfo?.description).toBe(description);
      expect(domain.domainInfo?.name).toBe(DOMAIN);
    } finally {
      service.close();
    }
  }, 30_000);
});
