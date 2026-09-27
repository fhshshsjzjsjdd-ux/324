"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { CheckIcon, CopyIcon } from "@/components/icons";
import { WindowDots } from "@/components/shot";

export type CodeTab = { label: string; source: string; panel: ReactNode };

export function CodeTabs({ tabs }: { tabs: CodeTab[] }) {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();

  function select(index: number) {
    const next = (index + tabs.length) % tabs.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      select(active + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      select(active - 1);
    }
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(tabs[active].source);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard can be unavailable (insecure context, permissions) — the code is still selectable.
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border border-black/10 bg-white text-black shadow-[0_28px_56px_-28px_rgba(110,50,20,0.45)]">
      <div className="flex items-center gap-3 border-b border-black/[0.06] px-3 py-2 text-[13px] sm:px-4">
        <WindowDots className="hidden w-14 sm:flex" />
        <div
          role="tablist"
          aria-label="Язык примера"
          onKeyDown={onKeyDown}
          className="flex rounded-lg bg-black/[0.045] p-0.5 sm:mx-auto"
        >
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${id}-tab-${i}`}
              aria-selected={active === i}
              aria-controls={`${id}-panel-${i}`}
              tabIndex={active === i ? 0 : -1}
              onClick={() => setActive(i)}
              className={`rounded-md px-2.5 py-1 font-medium transition-colors sm:px-3 ${active === i ? "bg-white text-black shadow-sm" : "text-black/50 hover:text-black"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="ml-auto flex w-14 justify-end sm:ml-0">
          <button
            type="button"
            onClick={copy}
            aria-label={copied ? "Скопировано" : "Скопировать код"}
            title={copied ? "Скопировано" : "Скопировать код"}
            className="grid size-7 place-items-center rounded-md text-black/45 transition-colors hover:bg-black/[0.05] hover:text-black"
          >
            {copied ? <CheckIcon className="size-4 text-emerald-600" /> : <CopyIcon className="size-4" />}
          </button>
          <span className="sr-only" aria-live="polite">
            {copied ? "Код скопирован" : ""}
          </span>
        </div>
      </div>
      {tabs.map((tab, i) => (
        <div
          key={tab.label}
          role="tabpanel"
          id={`${id}-panel-${i}`}
          aria-labelledby={`${id}-tab-${i}`}
          hidden={active !== i}
          className="py-4"
        >
          {tab.panel}
        </div>
      ))}
    </div>
  );
}
