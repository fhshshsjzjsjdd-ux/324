import { CodeBlock } from "@/components/code";
import { Shot } from "@/components/shot";
import { snippets } from "@/content/snippets";
import { CodeTabs } from "./code-tabs";

export function CodeShot() {
  return (
    <Shot tone="peach" scaled={false}>
      <div className="relative px-3 py-6 sm:px-10 sm:pb-16 sm:pt-12 xl:px-14">
        <CodeTabs
          tabs={snippets.map((s) => ({
            label: s.label,
            source: s.code,
            panel: <CodeBlock code={s.code} lang={s.lang} highlight={s.highlight} />,
          }))}
        />
        <div
          aria-hidden
          className="mt-4 flex flex-col items-end gap-1.5 sm:absolute sm:bottom-6 sm:right-6 sm:mt-0 xl:right-8"
        >
          <div className="max-w-[16rem] rounded-2xl rounded-br-md bg-clay px-4 py-2.5 text-[14px] leading-snug text-white shadow-[0_12px_24px_-12px_rgba(120,50,20,0.6)]">
            Привет! Я Claude. Чем могу помочь?
          </div>
          <div className="rounded-full bg-white/85 px-2.5 py-0.5 font-mono text-[11px] tracking-normal text-black/55 shadow-sm">
            200 OK · 0,8 с · anthropic
          </div>
        </div>
      </div>
    </Shot>
  );
}
