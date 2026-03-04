/* global process */
import cors from "cors";
import express from "express";
import fsSync from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadEnvFromFile(filePath) {
  if (!fsSync.existsSync(filePath)) return;

  const content = fsSync.readFileSync(filePath, "utf8");
  const lines = content.split(/\r?\n/);

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;

    const separatorIndex = line.indexOf("=");
    if (separatorIndex <= 0) continue;

    const key = line.slice(0, separatorIndex).trim();
    let value = line.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

loadEnvFromFile(path.join(__dirname, ".env"));

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, "data");
const DATA_FILE = path.join(DATA_DIR, "submissions.jsonl");

const QWEN_BASE_URL =
  process.env.QWEN_BASE_URL || "https://dashscope.aliyuncs.com/compatible-mode/v1";
const QWEN_MODEL = process.env.QWEN_MODEL || "qwen-plus";

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["POST", "GET"],
  }),
);
app.use(express.json({ limit: "1mb" }));

function normalizeMessages(messages) {
  if (!Array.isArray(messages)) return [];

  return messages
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const role = item.role === "assistant" ? "assistant" : "user";
      const content = String(item.content || "").trim();
      if (!content) return null;
      return { role, content };
    })
    .filter(Boolean);
}

function extractAssistantText(data) {
  const content = data?.choices?.[0]?.message?.content;
  if (typeof content === "string") {
    return content.trim();
  }

  if (Array.isArray(content)) {
    return content
      .map((item) => {
        if (typeof item === "string") return item;
        if (item?.text) return item.text;
        return "";
      })
      .join(" ")
      .trim();
  }

  return "";
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

app.post("/api/chat", async (req, res) => {
  const apiKey = process.env.QWEN_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      ok: false,
      error: "服务端未配置 QWEN_API_KEY，请先在 server/.env 中填写。",
    });
  }

  const normalizedMessages = normalizeMessages(req.body?.messages);
  if (!normalizedMessages.length) {
    return res.status(400).json({ ok: false, error: "消息内容不能为空。" });
  }

  const aiName = String(req.body?.aiName || "AI助手").trim() || "AI助手";
  const userSystemPrompt = String(req.body?.systemPrompt || "").trim();

  const conservatismRaw = Number(req.body?.conservatism);
  const flexibilityRaw = Number(req.body?.flexibility);

  // Backward compatibility for older frontend payloads.
  const legacyCreativity = Number(req.body?.creativity);
  const legacyStrictness = Number(req.body?.strictness);

  const safeConservatism = Number.isFinite(conservatismRaw)
    ? conservatismRaw
    : Number.isFinite(legacyCreativity)
      ? legacyCreativity
      : 50;

  const safeFlexibility = Number.isFinite(flexibilityRaw)
    ? flexibilityRaw
    : Number.isFinite(legacyStrictness)
      ? 100 - legacyStrictness
      : 50;

  const temperature = Math.max(0, Math.min(1.5, (safeConservatism / 100) * 1.5));
  const topP = Math.max(0.1, Math.min(1, 0.1 + (safeFlexibility / 100) * 0.9));

  const systemPrompt = [
    `你是${aiName}，正在参与招聘场景下的价值对齐对话。`,
    "请用简洁、礼貌、可执行的中文回复，并与用户观点保持对齐。",
    userSystemPrompt,
  ]
    .filter(Boolean)
    .join("\n");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);

  try {
    const response = await fetch(`${QWEN_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.QWEN_MODEL || QWEN_MODEL,
        temperature,
        top_p: topP,
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          ...normalizedMessages,
        ],
      }),
      signal: controller.signal,
    });

    let data = null;
    try {
      data = await response.json();
    } catch {
      data = null;
    }

    if (!response.ok) {
      const upstreamMessage =
        data?.error?.message || data?.message || "Qwen 服务调用失败。";
      return res.status(502).json({ ok: false, error: upstreamMessage });
    }

    const reply = extractAssistantText(data);
    if (!reply) {
      return res
        .status(502)
        .json({ ok: false, error: "Qwen 未返回有效回复内容。" });
    }

    return res.json({ ok: true, reply });
  } catch (error) {
    const isTimeout = error?.name === "AbortError";
    return res.status(500).json({
      ok: false,
      error: isTimeout ? "AI 响应超时，请稍后重试。" : "服务器调用 AI 失败。",
    });
  } finally {
    clearTimeout(timeout);
  }
});

app.post("/api/submit", async (req, res) => {
  try {
    const payload = req.body;
    if (!payload || typeof payload !== "object") {
      return res.status(400).json({ ok: false, error: "Invalid payload" });
    }

    const entry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      receivedAt: new Date().toISOString(),
      ...payload,
    };

    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.appendFile(DATA_FILE, `${JSON.stringify(entry)}\n`, "utf8");

    return res.json({ ok: true, id: entry.id });
  } catch (error) {
    console.error("submit failed", error);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});





