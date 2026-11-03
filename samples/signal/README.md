# Signal Workflow Sample

## Prerequisites

Same as hello_world. See [hello_world/README.md](../hello_world/README.md).

## Steps

### 1. Start the worker

```bash
# From the repository root (installs are only needed the first time):
npm install
npm --prefix samples install
npm --prefix samples run signal
```

### 2. Start a workflow run (separate terminal)

```bash
cadence --env development --domain cadence-samples \
  workflow start \
  --workflow_type cadence_samples.SimpleSignalWorkflow \
  --tl cadence-samples-worker \
  --et 3600
```

Note the workflow ID printed in the output.

### 3. Send signals

The workflow loops until it receives a signal with value `true`.

Send a signal to keep it running:

```bash
cadence --env development --domain cadence-samples \
  workflow signal \
  --wid <workflow_id> \
  --name complete \
  --input 'false'
```

Send a signal to complete the workflow:

```bash
cadence --env development --domain cadence-samples \
  workflow signal \
  --wid <workflow_id> \
  --name complete \
  --input 'true'
```

### 4. View the result

```bash
cadence --env development --domain cadence-samples \
  workflow show \
  --wid <workflow_id>
```
