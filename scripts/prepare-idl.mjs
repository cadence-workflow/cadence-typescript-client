import { cpSync, existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const idlsDir = resolve(root, "idls");
const protoDir = resolve(idlsDir, "proto");
const siblingIdlDir = resolve(root, "../cadence-idl");

if (existsSync(protoDir)) {
  console.log("Cadence IDL is already available at idls/proto");
  process.exit(0);
}

if (existsSync(resolve(siblingIdlDir, "proto"))) {
  mkdirSync(protoDir, { recursive: true });
  cpSync(resolve(siblingIdlDir, "proto"), protoDir, { recursive: true });
  console.log("Seeded idls/proto from sibling ../cadence-idl checkout");
  process.exit(0);
}

if (existsSync(resolve(root, ".git"))) {
  const result = spawnSync("git", ["submodule", "update", "--init", "--recursive", "idls"], {
    cwd: root,
    stdio: "inherit",
  });
  process.exit(result.status ?? 1);
}

console.error(
  "Cadence IDL is missing. Clone https://github.com/cadence-workflow/cadence-idl into idls/ or initialize this repository and run git submodule update --init --recursive idls.",
);
process.exit(1);
