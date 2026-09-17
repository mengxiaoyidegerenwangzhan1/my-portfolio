import { spawnSync } from "node:child_process";
import { cpSync, writeFileSync } from "node:fs";

const result = spawnSync(process.execPath, ["node_modules/vite/bin/vite.js", "build"], {
  env: { ...process.env, GITHUB_PAGES: "true" },
  stdio: "inherit",
});
if (result.status !== 0) process.exit(result.status || 1);

// Keep previous hashed bundles so an already-open page still works during rollout.
cpSync("dist/client", "docs", { recursive: true });
writeFileSync("docs/.nojekyll", "");
