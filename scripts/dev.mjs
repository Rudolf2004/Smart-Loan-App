import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const serverDir = path.join(rootDir, "server");
const viteCli = path.join(rootDir, "node_modules", "vite", "bin", "vite.js");
const tsxCli = path.join(serverDir, "node_modules", "tsx", "dist", "cli.mjs");

const children = [
  spawn(process.execPath, [viteCli], { cwd: rootDir, stdio: "inherit" }),
  spawn(process.execPath, [tsxCli, "watch", "src/index.ts"], {
    cwd: serverDir,
    stdio: "inherit",
  }),
];

let stopping = false;

function stop(exitCode = 0) {
  if (stopping) return;
  stopping = true;
  for (const child of children) {
    if (!child.killed) child.kill();
  }
  process.exitCode = exitCode;
}

for (const child of children) {
  child.on("error", (error) => {
    console.error(`Unable to start a development service: ${error.message}`);
    stop(1);
  });
  child.on("exit", (code, signal) => {
    if (!stopping && (code !== 0 || signal)) stop(code || 1);
  });
}

process.on("SIGINT", () => stop());
process.on("SIGTERM", () => stop());
