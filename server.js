// Minimal local backend so the "Run Python TPT Generator" button in the
// browser can actually invoke generator.py, instead of just copying a
// command to the clipboard.
//
// Start with:  npm run server   (or: node server.js)
// Runs on:     http://localhost:5050
//
// This is intentionally simple (no auth, no queue) because it's meant to
// run on localhost next to `npm run dev`, never deployed publicly.

import express from "express";
import cors from "cors";
import { spawn } from "child_process";
import { mkdirSync, writeFileSync, existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 5050;
const TOPICS_DIR = path.join(__dirname, "topics");
const OUTPUT_DIR = path.join(__dirname, "output");

const app = express();
app.use(cors());
app.use(express.json({ limit: "2mb" }));

// Serve generated files (PDFs, cover, zip) so the browser can download them.
app.use("/output", express.static(OUTPUT_DIR));

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.post("/api/generate", (req, res) => {
  let relTopicPath;
  let topicId;

  if (req.body && req.body.topicPath) {
    relTopicPath = req.body.topicPath;
    topicId = path.basename(relTopicPath, ".json");
  } else {
    const config = req.body;

    if (!config || !config.title || !config.operation) {
      return res.status(400).json({
        ok: false,
        error: "Missing required fields (title, operation) in topic config.",
      });
    }

    topicId =
      config.id ||
      (config.title || "worksheet")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") ||
      `topic-${Date.now()}`;

    config.id = topicId;
    config.operand_min = config.operand_min ?? 1;
    config.operand_max = config.operand_max ?? 10;
    config.max_sum = config.max_sum ?? (config.operation === '+' ? config.operand_max * 2 : config.operand_max);

    if (!existsSync(TOPICS_DIR)) mkdirSync(TOPICS_DIR, { recursive: true });
    const topicPath = path.join(TOPICS_DIR, `_web-${topicId}.json`);
    writeFileSync(topicPath, JSON.stringify(config, null, 2), "utf-8");
    relTopicPath = path.relative(__dirname, topicPath);
  }

  const pythonCmd = process.platform === "win32" ? "python" : "python3";
  const py = spawn(pythonCmd, ["generator.py", relTopicPath], {
    cwd: __dirname,
  });

  let stdout = "";
  let stderr = "";
  py.stdout.on("data", (d) => (stdout += d.toString()));
  py.stderr.on("data", (d) => (stderr += d.toString()));

  py.on("error", (err) => {
    // e.g. "python" not found on PATH
    res.status(500).json({
      ok: false,
      error: `Failed to start Python process (${pythonCmd}): ${err.message}. Is Python installed and on your PATH?`,
    });
  });

  py.on("close", (code) => {
    if (code !== 0) {
      return res.status(500).json({
        ok: false,
        error: "generator.py exited with an error.",
        stdout,
        stderr,
      });
    }
    res.json({
      ok: true,
      topicId,
      stdout,
      zipUrl: `/output/${topicId}/${topicId}-tpt-bundle.zip`,
      outputDir: `output/${topicId}`,
    });
  });
});

app.listen(PORT, () => {
  console.log(`TPT generator backend running at http://localhost:${PORT}`);
  console.log(`Waiting for requests from the app at http://localhost:5173 ...`);
});
