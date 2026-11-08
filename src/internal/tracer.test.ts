// Suite module for tracer_test.ts. Registration is kept out of the declaration module so that a sibling
// test module importing it for a helper does not also register this suite.
import { describe, it } from 'vitest';
import {
  TestTracingContextPropagator,
  TestTracingContextPropagatorNoSpan,
  TestTracingContextPropagatorWorkflowContext,
} from './tracer_test.js';
describe("tracer", () => {
  it("TestTracingContextPropagator", TestTracingContextPropagator);
  it("TestTracingContextPropagatorNoSpan", TestTracingContextPropagatorNoSpan);
  it("TestTracingContextPropagatorWorkflowContext", TestTracingContextPropagatorWorkflowContext);
});
