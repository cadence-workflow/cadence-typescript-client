# Hello World Sample

## Prerequisites

0. Install Cadence CLI. See instructions at https://cadenceworkflow.io/docs/cli/.
1. Use `--env development` on every `cadence` command below so the CLI talks to your local cluster (from docker-compose), not a hosted environment.
2. Run the Cadence server:
   - Clone https://github.com/cadence-workflow/cadence
   - Run `docker compose -f docker/docker-compose.yml up`
3. Open http://localhost:8088 to view Cadence UI.
4. Register the `cadence-samples` domain:

```bash
cadence --env development --domain cadence-samples domain register
```

## Steps

### 1. Start the worker

```bash
# From the repository root (installs are only needed the first time):
npm install
npm --prefix samples install
npm --prefix samples run hello_world
```

The worker connects to Cadence at `127.0.0.1:7833` and begins polling for
decision and activity tasks on the `cadence-samples-worker` task list.

### 2. Start a workflow run (separate terminal)

```bash
cadence --env development --domain cadence-samples \
  workflow start \
  --workflow_type cadence_samples.HelloWorldWorkflow \
  --tl cadence-samples-worker \
  --et 60 \
  --input '{"message":"Cadence"}'
```

The worker terminal will log the decision and activity tasks as they execute.

### 3. View the result

List recent runs:

```bash
cadence --env development --domain cadence-samples workflow list
```

Inspect a specific run:

```bash
cadence --env development --domain cadence-samples \
  workflow show \
  --wid <workflow_id>
```
