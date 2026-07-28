#!/usr/bin/env node
/**
 * P2 guard — extract <script> from ops/board/index.html and syntax-check it.
 * Catches unterminated strings / parse errors that blank the entire Operations Board.
 *
 * Usage (from website repo root):
 *   node scripts/check-ops-board.js
 *   node scripts/check-ops-board.js path/to/ops/board/index.html
 *
 * Exit 0 = OK, exit 1 = syntax error or file missing.
 */
const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const htmlPath = path.resolve(
  process.argv[2] || path.join(__dirname, "..", "ops", "board", "index.html")
);

if (!fs.existsSync(htmlPath)) {
  console.error("[check-ops-board] missing file:", htmlPath);
  process.exit(1);
}

const html = fs.readFileSync(htmlPath, "utf8");
const start = html.indexOf("<script>");
const end = html.lastIndexOf("</script>");
if (start < 0 || end < 0 || end <= start) {
  console.error("[check-ops-board] no <script> block found in", htmlPath);
  process.exit(1);
}

const script = html.slice(start + "<script>".length, end);
const tmpDir = process.env.TEMP || process.env.TMP || "/tmp";
const tmpJs = path.join(tmpDir, "mgs-ops-board-check.js");
fs.writeFileSync(tmpJs, script, "utf8");

const r = spawnSync(process.execPath, ["--check", tmpJs], {
  encoding: "utf8",
});

try {
  fs.unlinkSync(tmpJs);
} catch (_) {
  /* ignore */
}

if (r.status !== 0) {
  console.error("[check-ops-board] SYNTAX ERROR — do not deploy ops/board");
  if (r.stderr) process.stderr.write(r.stderr);
  if (r.stdout) process.stdout.write(r.stdout);
  process.exit(1);
}

console.log("[check-ops-board] OK", htmlPath, "(" + script.length + " chars)");
process.exit(0);
