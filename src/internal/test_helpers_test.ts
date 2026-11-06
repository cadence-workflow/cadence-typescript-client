// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { TestWorkflowEnvironment, WorkflowTestSuite } from './workflow_testsuite.js';
import { NoopLogger } from './runtime/logging.js';

/**
 * Creates a new workflow environment with the correct logger / testing.T configured.
 */
export function newTestWorkflowEnv(): TestWorkflowEnvironment {
  const s = new WorkflowTestSuite({ ctxProps: [] });
  s.SetLogger(NoopLogger());
  const env = s.NewTestWorkflowEnvironment();
  env.Test(undefined);
  return env;
}
