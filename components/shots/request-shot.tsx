import { CodeBlock } from "@/components/code";
import { Shot } from "@/components/shot";

const REQUEST = `{
  "model": "anthropic/claude-sonnet-4.5",
  "fallbacks": [
    "openai/gpt-5",
    "google/gemini-2.5-pro"
  ],
  "retry": { "attempts": 2 },
  "timeout": "10s",
  "messages": [ … ]
}`;

export function RequestShot() {
  return (
    <Shot tone="sand" size="half" className="xl:aspect-[4/3]" label="Пример запроса с цепочкой фолбэков и ретраями">
      <div className="flex h-full items-center justify-center p-6">
        <div className="w-full max-w-[25em] overflow-hidden rounded-xl border border-black/10 bg-white shadow-[0_1em_2em_-1em_rgba(70,50,20,0.3)]">
          <div className="flex items-center gap-2 border-b border-black/[0.06] px-4 py-2.5 text-xs">
            <span className="rounded-md bg-emerald-50 px-1.5 py-0.5 font-mono font-semibold tracking-normal text-emerald-700">
              POST
            </span>
            <span className="font-mono tracking-normal text-black/55">/v1/chat/completions</span>
          </div>
          <div className="py-3">
            <CodeBlock code={REQUEST} lang="json" numbers={false} />
          </div>
        </div>
      </div>
    </Shot>
  );
}
