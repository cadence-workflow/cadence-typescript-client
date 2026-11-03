import type { workflow_Context } from '../../src/workflow/context.js';
import { NewSelector, NewTimer } from '../../src/workflow/deterministic_wrappers.js';
import { GetInfo, GetLogger, GetSignalChannel, SetQueryHandler } from '../../src/workflow/workflow.js';

export interface Vote {
  location: string;
  meal: string;
  requests: string;
}

const VOTE_SIGNAL = 'lunch_order';
const OPTIONS_QUERY = 'options';
const TEN_MINUTES_NS = 10 * 60 * 1_000_000_000;

// LunchVoteWorkflow collects lunch votes via signals for 10 minutes.
// Results are queryable via the "options" query handler.
export async function lunchVoteWorkflow(ctx: workflow_Context): Promise<void> {
  const logger = GetLogger(ctx);
  logger.info('LunchVoteWorkflow started');

  const votes: Vote[] = [];

  await SetQueryHandler(ctx, OPTIONS_QUERY, () => {
    return buildQueryResponse(ctx, votes);
  });

  const votesChan = GetSignalChannel(ctx, VOTE_SIGNAL);

  // Sleep for 10 minutes, collecting votes via signal until the timer fires.
  let timerFired = false;
  const selector = NewSelector(ctx);
  selector.AddReceive(votesChan, async (channel, more) => {
    if (!more) {
      timerFired = true;
      return;
    }

    const received = { value: undefined as Vote | undefined };
    await channel.Receive(ctx, received);
    if (received.value === undefined) return;

    votes.push(received.value);
    logger.info('Vote received', `location=${received.value.location}`, `meal=${received.value.meal}`);
  });
  selector.AddFuture(NewTimer(ctx, TEN_MINUTES_NS), () => {
    timerFired = true;
  });

  while (!timerFired) {
    await selector.Select(ctx);
  }

  logger.info('LunchVoteWorkflow completed', `totalVotes=${votes.length}`);
}

interface QueryResponse {
  cadenceResponseType: 'formattedData';
  format: 'text/markdown';
  data: string;
}

function buildQueryResponse(ctx: workflow_Context, votes: Vote[]): QueryResponse {
  const { ID: workflowId, RunID: runId } = GetInfo(ctx).WorkflowExecution;

  const voteTable = buildVoteTable(votes);
  const menuTable = buildMenuTable();

  const data = `
## Lunch Options

We're voting on where to order lunch today. Select the option you want to vote for.

---

### Current Votes

${voteTable}

### Menu Options

${menuTable}

---

### Cast Your Vote

{% signal signalName="lunch_order" label="Farmhouse - Red Thai Curry" domain="cadence-samples" workflowId="${workflowId}" runId="${runId}" input={"location":"Farmhouse","meal":"Red Thai Curry","requests":"spicy"} /%}
{% signal signalName="lunch_order" label="Ethiopian Wat" domain="cadence-samples" workflowId="${workflowId}" runId="${runId}" input={"location":"Ethiopian","meal":"Wat with Injera","requests":""} /%}
{% signal signalName="lunch_order" label="Ler Ros - Tofu Bahn Mi" domain="cadence-samples" workflowId="${workflowId}" runId="${runId}" input={"location":"Ler Ros","meal":"Tofu Bahn Mi","requests":""} /%}

*Vote closes after 10 minutes*
`.trim();

  return { cadenceResponseType: 'formattedData', format: 'text/markdown', data };
}

function buildVoteTable(votes: Vote[]): string {
  if (votes.length === 0) {
    return '| Location | Meal | Requests |\n|----------|------|----------|\n| *No votes yet* | | |';
  }
  const rows = votes.map((v) => `| ${v.location} | ${v.meal} | ${v.requests} |`).join('\n');
  return `| Location | Meal | Requests |\n|----------|------|-----------|\n${rows}`;
}

function buildMenuTable(): string {
  const options = [
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Red_roast_duck_curry.jpg/200px-Red_roast_duck_curry.jpg',
      desc: '**Farmhouse - Red Thai Curry**: A dish in Thai cuisine made from curry paste, coconut milk, meat, seafood, vegetables, and herbs.',
    },
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/B%C3%A1nh_m%C3%AC_th%E1%BB%8Bt_n%C6%B0%E1%BB%9Bng.png/200px-B%C3%A1nh_m%C3%AC_th%E1%BB%8Bt_n%C6%B0%E1%BB%9Bng.png',
      desc: '**Ler Ros - Tofu Bahn Mi**: A Vietnamese sandwich with a baguette filled with lemongrass tofu, vegetables, and fresh herbs.',
    },
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Ethiopian_wat.jpg/960px-Ethiopian_wat.jpg',
      desc: '**Ethiopian Wat**: A traditional Ethiopian stew made from spices, vegetables, and legumes, served with injera flatbread.',
    },
  ];

  const rows = options.map((o) => `| ![food](${o.image}) | ${o.desc} |`).join('\n');
  return `| Picture | Description |\n|---------|-------------|\n${rows}\n\n*(source: wikipedia)*`;
}
