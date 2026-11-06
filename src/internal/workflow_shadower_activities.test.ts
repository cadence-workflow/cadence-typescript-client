// Suite module for workflow_shadower_activities_test.ts. Registration is kept out of the declaration module so that a sibling
// test module importing it for a helper does not also register this suite.
import { describe, it } from 'vitest';
import {
  TestWorkflowShadowerActivitiesSuite,
} from './workflow_shadower_activities_test.js';

describe("workflow_shadower_activities", () => {
  it("TestWorkflowShadowerActivitiesSuite", TestWorkflowShadowerActivitiesSuite);
});
