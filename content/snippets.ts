import type { Lang } from "@/components/code";
import { site } from "./site";

export type Snippet = { label: string; lang: Lang; code: string; highlight: number[] };

const MODEL = "anthropic/claude-sonnet-4.5";
const PROMPT = "Привет! Кто ты?";

export const snippets: Snippet[] = [
  {
    label: "Python",
    lang: "python",
    highlight: [5],
    code: `import os
from openai import OpenAI

client = OpenAI(
    base_url="${site.apiBase}",
    api_key=os.environ["${site.apiKeyEnv}"],
)

reply = client.chat.completions.create(
    model="${MODEL}",
    messages=[{"role": "user", "content": "${PROMPT}"}],
)
print(reply.choices[0].message.content)`,
  },
  {
    label: "TypeScript",
    lang: "ts",
    highlight: [4],
    code: `import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "${site.apiBase}",
  apiKey: process.env.${site.apiKeyEnv},
});

const reply = await client.chat.completions.create({
  model: "${MODEL}",
  messages: [{ role: "user", content: "${PROMPT}" }],
});
console.log(reply.choices[0].message.content);`,
  },
  {
    label: "cURL",
    lang: "bash",
    highlight: [1],
    code: `curl ${site.apiBase}/chat/completions \\
  -H "Authorization: Bearer $${site.apiKeyEnv}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "${MODEL}",
    "messages": [{"role": "user", "content": "${PROMPT}"}]
  }'`,
  },
];
