"use client";

import { useMemo, useState } from "react";
import { SearchIcon } from "@/components/icons";
import { Shot } from "@/components/shot";
import { filters, models, type Filter } from "@/content/models";
import { site } from "@/content/site";
import { usd } from "@/lib/format";

const ROW = "grid grid-cols-[minmax(0,1fr)_4.25rem_4.25rem] gap-x-3 sm:grid-cols-[minmax(0,1fr)_4rem_4.5rem_4.5rem]";

export function CatalogShot() {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return models.filter(
      (m) =>
        (filter === "all" || m.tags.includes(filter)) &&
        (!q || `${m.name} ${m.id} ${m.provider}`.toLowerCase().includes(q)),
    );
  }, [filter, query]);

  return (
    <Shot tone="lilac" scaled={false}>
      <div className="px-3 py-6 sm:px-10 sm:py-12 xl:px-14">
        <div className="overflow-hidden rounded-xl border border-black/10 bg-white text-[14px] leading-snug text-black shadow-[0_28px_56px_-28px_rgba(70,50,140,0.45)]">
          <label className="flex items-center gap-3 border-b border-black/[0.06] px-4 py-3">
            <SearchIcon className="size-4 shrink-0 text-black/40" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Найти модель или провайдера"
              aria-label="Поиск по каталогу моделей"
              className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-black/35 [&::-webkit-search-cancel-button]:hidden"
            />
            <span className="hidden shrink-0 text-black/40 sm:inline">300+ моделей</span>
          </label>

          <div
            role="group"
            aria-label="Фильтр моделей"
            className="flex gap-1.5 overflow-x-auto border-b border-black/[0.06] px-4 py-2.5 [scrollbar-width:none]"
          >
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
                className={`shrink-0 rounded-full px-3 py-1 transition-colors ${filter === f.id ? "bg-black text-white" : "bg-black/[0.045] text-black/60 hover:bg-black/[0.08] hover:text-black"}`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className={`${ROW} border-b border-black/[0.06] px-4 py-2 text-[12px] text-black/40`} aria-hidden>
            <span>Модель</span>
            <span className="hidden text-right sm:block">Контекст</span>
            <span className="text-right">Вход</span>
            <span className="text-right">Выход</span>
          </div>

          <ul className="h-80 overflow-y-auto overscroll-contain">
            {visible.map((m) => (
              <li key={m.id} className={`${ROW} items-center border-b border-black/[0.045] px-4 py-2.5 last:border-0`}>
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    aria-hidden
                    className="grid size-7 shrink-0 place-items-center rounded-full text-[11px] font-semibold text-white"
                    style={{ background: m.color }}
                  >
                    {m.provider[0]}
                  </span>
                  <div className="min-w-0">
                    <div className="truncate font-medium">{m.name}</div>
                    <div className="truncate font-mono text-[12px] tracking-normal text-black/45">{m.id}</div>
                  </div>
                </div>
                <span className="hidden text-right tabular-nums text-black/55 sm:block">{m.context}</span>
                <span className="text-right tabular-nums">{usd(m.input, 2)}</span>
                <span className="text-right tabular-nums">{usd(m.output, 2)}</span>
              </li>
            ))}
            {visible.length === 0 ? (
              <li className="px-4 py-12 text-center text-black/45">Такой модели пока нет — напишите нам, подключим.</li>
            ) : null}
          </ul>
          <p className="sr-only" aria-live="polite">
            Найдено моделей: {visible.length}
          </p>

          <div className="flex items-center justify-between gap-4 border-t border-black/[0.06] px-4 py-3 text-[13px] text-black/50">
            <span>Цены — за 1 млн токенов</span>
            <a href={site.links.docs} className="font-medium text-black hover:underline">
              Весь каталог →
            </a>
          </div>
        </div>
      </div>
    </Shot>
  );
}
