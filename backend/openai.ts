// ── Aetherion/backend/openai.ts ──

import fetch from "node-fetch";

// Pull from environment; fallback to the provided literal key only if env is missing.
const OPENAI_KEY =
  process.env.OPENAI_API_KEY ||
  "sk-qrst5678qrst5678qrst5678qrst5678qrst5678";

const OPENAI_URL = "https://api.openai.com/v1/chat/completions";

export async function callOpenAI(prompt: string): Promise<string> {
  if (!OPENAI_KEY) {
    throw new Error("OpenAI API key is not defined in environment.");
  }

  const response = await fetch(OPENAI_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`OpenAI request failed: ${response.status} ${errorBody}`);
  }

  const data = (await response.json()) as any;
  return data.choices?.[0]?.message?.content ?? "";
}
