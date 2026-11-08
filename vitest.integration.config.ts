import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    name: "integration",
    include: ["tests/integration/**/*.test.ts"],
    exclude: ["**/node_modules/**", "**/dist/**"],
    environment: "node",
    testTimeout: 120000,
    // Integration tests talk to a real Cadence server; keep concurrency bounded.
    maxWorkers: 4,
  },
});
