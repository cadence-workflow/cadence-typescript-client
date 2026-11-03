import { WorkerOptions } from '../../src/internal/worker.js';
import type { WorkflowServiceClientLike } from '../../src/internal/runtime/workflow_service_client_like.js';
import { New } from '../../src/worker/worker.js';
import { newWorkflowServiceClient } from '../../src/workflow_service_client.js';
import { helloWorldWorkflow, helloWorldActivity } from './workflow.js';

const HOST_PORT = '127.0.0.1:7833';
const DOMAIN = 'cadence-samples';
const TASK_LIST = 'cadence-samples-worker';
const CLIENT_NAME = 'cadence-samples-worker';

async function main(): Promise<void> {
  const service = newWorkflowServiceClient({ address: HOST_PORT, caller: CLIENT_NAME });
  const worker = await New(
    service as unknown as WorkflowServiceClientLike,
    DOMAIN,
    TASK_LIST,
    new WorkerOptions({ Identity: CLIENT_NAME }),
  );

  await worker.RegisterWorkflowWithOptions(helloWorldWorkflow, {
    Name: 'cadence_samples.HelloWorldWorkflow',
    EnableShortName: false,
    DisableAlreadyRegisteredCheck: false,
  });
  await worker.RegisterActivityWithOptions(helloWorldActivity, {
    Name: 'cadence_samples.HelloWorldActivity',
    EnableShortName: false,
    DisableAlreadyRegisteredCheck: false,
    EnableAutoHeartbeat: false,
  });

  await worker.Start();

  console.log(`Worker polling (domain=${DOMAIN}, taskList=${TASK_LIST}). Press Ctrl+C to stop.`);
  console.log('');
  console.log('To start a workflow run:');
  console.log(`  cadence --env development --domain ${DOMAIN} workflow start --workflow_type cadence_samples.HelloWorldWorkflow --tl ${TASK_LIST} --et 60 --input '{"message":"Cadence"}'`);

  let stopping = false;
  const stop = (): void => {
    if (stopping) return;
    stopping = true;
    void worker.Stop()
      .then(() => service.close())
      .catch((err: unknown) => {
        console.error('Worker failed to stop', err);
        service.close();
        process.exitCode = 1;
      });
  };
  process.once('SIGINT', stop);
  process.once('SIGTERM', stop);
}

main().catch((err) => { console.error('Worker failed to start', err); process.exit(1); });
