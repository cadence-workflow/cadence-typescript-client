import { dirname } from "node:path";
import { beforeAll, expect } from "vitest";

beforeAll(() => {
  const testPath = expect.getState().testPath;
  if (testPath) {
    process.chdir(dirname(testPath));
  }
});
