// Suite module for workflow_replayer_utils_test.ts. Registration is kept out of the declaration module so that a sibling
// test module importing it for a helper does not also register this suite.
import { describe, it } from 'vitest';
import {
  TestMatchReplayWithHistory,
  TestIsDecisionMatchEvent,
} from './workflow_replayer_utils_test.js';

describe("workflow_replayer_utils", () => {
  it("TestMatchReplayWithHistory", TestMatchReplayWithHistory);
  it("TestIsDecisionMatchEvent", TestIsDecisionMatchEvent);
});
