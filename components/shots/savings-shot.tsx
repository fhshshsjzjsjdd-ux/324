import { MOCK_CARD } from "@/components/ui";
import { Shot } from "@/components/shot";

const CACHE = [
  { hit: true, what: "точное совпадение", ms: "2 мс", cost: "$0" },
  { hit: true, what: "похожий запрос · 0,97", ms: "4 мс", cost: "$0" },
  { hit: false, what: "openai/gpt-5-mini", ms: "640 мс", cost: "$0,0004" },
  { hit: true, what: "точное совпадение", ms: "1 мс", cost: "$0" },
  { hit: true, what: "похожий запрос · 0,95", ms: "5 мс", cost: "$0" },
  { hit: false, what: "anthropic/claude-haiku-4.5", ms: "780 мс", cost: "$0,0011" },
];

function Bar({ label, value, pct, className }: { label: string; value: string; pct: number; className: string }) {
  return (
    <div>
      <div className="mb-1 flex justify-between">
        <span className="text-black/60">{label}</span>
        <span className="font-medium tabular-nums">{value}</span>
      </div>
      <div className="h-2 rounded-full bg-black/[0.05]">
        <div className={`h-full rounded-full ${className}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="size-2 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}

export function SavingsShot() {
  return (
    <Shot tone="mint" label="Экономия: через Relay счёт на 38% ниже, 41% запросов отдаётся из кэша">
      <div className="flex gap-5 p-10 @max-xl:flex-col @max-xl:p-5">
        <div className={`${MOCK_CARD} flex w-[42%] flex-col @max-xl:w-full`}>
          <p className="text-xs text-black/50">Расходы за сентябрь</p>
          <p className="serif-num mt-2 text-5xl leading-none">−38%</p>
          <p className="mt-2 text-xs text-black/50">по сравнению с прямыми запросами к провайдерам</p>
          <div className="mt-6 space-y-3 text-xs">
            <Bar label="Напрямую" value="$4 820" pct={100} className="bg-black/15" />
            <Bar label="Через Relay" value="$2 990" pct={62} className="bg-[#1f6b45]" />
          </div>
          <div className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-5 text-2xs text-black/55">
            <Legend color="#1f6b45" label="кэш −$1 120" />
            <Legend color="#7fb894" label="роутинг −$710" />
          </div>
        </div>

        <div className={`${MOCK_CARD} min-w-0 flex-1`}>
          <div className="flex items-baseline justify-between">
            <p className="text-sm font-semibold">Кэш</p>
            <p className="text-2xs text-black/45">последние запросы</p>
          </div>
          <ul className="mt-3 divide-y divide-black/[0.06] text-xs">
            {CACHE.map((row, i) => (
              <li key={i} className="grid grid-cols-[3.4em_minmax(0,1fr)_auto_4.8em] items-center gap-3 py-2">
                <span
                  className={`rounded px-1.5 py-0.5 text-center font-mono text-2xs font-semibold tracking-normal ${row.hit ? "bg-[#dff3e6] text-[#1f6b45]" : "bg-black/[0.05] text-black/50"}`}
                >
                  {row.hit ? "HIT" : "MISS"}
                </span>
                <span className={`truncate ${row.hit ? "" : "font-mono tracking-normal text-black/70"}`}>{row.what}</span>
                <span className="text-right tabular-nums text-black/50">{row.ms}</span>
                <span className="text-right tabular-nums">{row.cost}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex items-center gap-3 text-2xs text-black/55">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-black/[0.06]">
              <div className="h-full w-[41%] rounded-full bg-[#1f6b45]" />
            </div>
            <span>41% запросов — из кэша</span>
          </div>
        </div>
      </div>
    </Shot>
  );
}
