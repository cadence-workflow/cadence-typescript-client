import type { Context } from '../../src/internal/runtime/context.js';
import { Ref } from '../../src/internal/runtime/ref.js';
import type { workflow_Context } from '../../src/workflow/context.js';
import { ExecuteActivity } from '../../src/workflow/workflow.js';
import { ACTIVITY_TYPE_ECHO } from './constants.js';
import { withCanaryActivityOptions } from './options.js';

export interface EchoInput {
  int_value: number;
  optional_int_value: number | null;
  float_value: number;
  string_value: string;
  optional_string_value: string | null;
  list_value: string[];
  map_value: Record<string, string>;
}

export function newEchoInput(): EchoInput {
  return {
    // Python uses sys.maxsize. JSON numbers cannot losslessly carry int64 values in
    // JavaScript, so use the largest integer supported by the default converter.
    int_value: Number.MAX_SAFE_INTEGER,
    optional_int_value: Number.MAX_SAFE_INTEGER,
    float_value: Number.MAX_VALUE,
    string_value: 'canary_echo_test',
    optional_string_value: 'canary_echo_test',
    list_value: ['canary', '.', 'EchoWorkflow'],
    map_value: {
      'us-east-1': 'dca1a',
      'us-west-1': 'sjc1a',
    },
  };
}

export async function echoActivity(_ctx: Context, value: EchoInput): Promise<EchoInput> {
  if (!echoInputsEqual(value, newEchoInput())) {
    throw new Error('echo activity received an unexpected input');
  }
  return value;
}

export async function echoWorkflow(ctx: workflow_Context): Promise<void> {
  const expected = newEchoInput();
  const activityCtx = withCanaryActivityOptions(ctx);
  const future = await ExecuteActivity(activityCtx, ACTIVITY_TYPE_ECHO, expected);
  const actual = new Ref<EchoInput | undefined>(undefined);
  await future.Get(activityCtx, actual);

  if (actual.value === undefined || !echoInputsEqual(actual.value, expected)) {
    throw new Error('echo activity returned an unexpected output');
  }
}

function echoInputsEqual(left: EchoInput, right: EchoInput): boolean {
  return left.int_value === right.int_value
    && left.optional_int_value === right.optional_int_value
    && left.float_value === right.float_value
    && left.string_value === right.string_value
    && left.optional_string_value === right.optional_string_value
    && left.list_value.length === right.list_value.length
    && left.list_value.every((value, index) => value === right.list_value[index])
    && Object.keys(left.map_value).length === Object.keys(right.map_value).length
    && Object.entries(left.map_value).every(([key, value]) => right.map_value[key] === value);
}
