import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    name: "unit",
    include: ["src/**/*.test.ts"],
    exclude: ["tests/**", "**/node_modules/**", "**/dist/**"],
    environment: "node",
    testTimeout: 30000,
    setupFiles: ["./vitest.setup.ts"],
  },
});
