# Query Workflow Sample

Demonstrates query handlers and signals together. A lunch vote workflow
accepts vote signals and exposes the current tally via a query.

## Prerequisites

Same as hello_world. See [hello_world/README.md](../hello_world/README.md).

## Steps

### 1. Start the worker

```bash
# From the repository root (installs are only needed the first time):
npm install
npm --prefix samples install
npm --prefix samples run query
```

### 2. Start a workflow run (separate terminal)

```bash
cadence --env development --domain cadence-samples \
  workflow start \
  --workflow_type cadence_samples.LunchVoteWorkflow \
  --tl cadence-samples-worker \
  --et 3600
```

Note the workflow ID printed in the output.

### 3. Query current votes

```bash
cadence --env development --domain cadence-samples \
  workflow query \
  --wid <workflow_id> \
  --qt options
```

### 4. Cast a vote (signal)

```bash
cadence --env development --domain cadence-samples \
  workflow signal \
  --wid <workflow_id> \
  --name lunch_order \
  --input '{"location":"Farmhouse","meal":"Red Thai Curry","requests":"spicy"}'
```

Run the query again to see the updated tally.

### 5. View the full history

```bash
cadence --env development --domain cadence-samples \
  workflow show \
  --wid <workflow_id>
```
