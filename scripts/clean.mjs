import { rmSync } from "node:fs";
import { resolve } from "node:path";

for (const path of ["dist", "coverage", ".vitest"]) {
  rmSync(resolve(path), { recursive: true, force: true });
}
