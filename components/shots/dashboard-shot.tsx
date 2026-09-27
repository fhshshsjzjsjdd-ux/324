import { Shot, WindowDots } from "@/components/shot";
import { site } from "@/content/site";
import { usd } from "@/lib/format";

const SERIES = [
  { name: "Claude", color: "#d97757", share: 0.4 },
  { name: "GPT", color: "#2b2b2b", share: 0.3 },
  { name: "Gemini", color: "#7aa5f0", share: 0.18 },
  { name: "Другие", color: "#d2cbbb", share: 0.12 },
];

// Deterministic PRNG so the chart is identical on every build.
function mulberry32(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const random = mulberry32(42);
const DAYS = Array.from({ length: 30 }, (_, day) => {
  const weekend = day % 7 === 5 || day % 7 === 6;
  const level = (0.72 + day / 75) * (weekend ? 0.6 : 1);
  return SERIES.map((s) => s.share * level * (0.8 + random() * 0.4));
});
const TOTALS = DAYS.map((day) => day.reduce((a, b) => a + b, 0));
const PEAK = Math.max(...TOTALS);

const KPIS = [
  { label: "Запросы", value: "1,24 млн", delta: "+12%" },
  { label: "Токены", value: "2,1 млрд", delta: "+9%" },
  { label: "Расходы", value: "$3 418", delta: "−6%" },
  { label: "Задержка p50", value: "612 мс", delta: "−41 мс" },
];

const KEYS = [
  { name: "prod-chat", spent: 812, budget: 1000 },
  { name: "support-bot", spent: 214, budget: 300 },
  { name: "search-rerank", spent: 96, budget: 500 },
  { name: "staging", spent: 50, budget: 50 },
];

const NAV = ["Обзор", "Логи", "Ключи", "Модели", "Команда", "Счета", "Настройки"];

export function DashboardShot() {
  return (
    <Shot tone="butter" label="Дашборд Relay: расходы по моделям за 30 дней и бюджеты API-ключей">
      <div className="p-8 @max-xl:p-4">
        <div className="overflow-hidden rounded-xl border border-black/10 bg-white shadow-[0_1.5em_3em_-1.5em_rgba(90,70,20,0.35)]">
          <div className="flex items-center border-b border-black/[0.06] px-4 py-2">
            <WindowDots className="w-16" />
            <span className="mx-auto rounded-md bg-black/[0.04] px-3 py-0.5 text-2xs text-black/45">
              {new URL(site.links.login).host}
            </span>
            <span className="w-16" />
          </div>
          <div className="flex">
            <aside className="w-40 shrink-0 border-r border-black/[0.06] p-3 @max-xl:hidden">
              <div className="wordmark mb-3 px-2 text-lg">{site.name}</div>
              <ul className="space-y-0.5 text-xs">
                {NAV.map((item, i) => (
                  <li key={item} className={`rounded-md px-2 py-1.5 ${i === 0 ? "bg-black/[0.05] font-medium" : "text-black/55"}`}>
                    {item}
                  </li>
                ))}
              </ul>
            </aside>

            <div className="min-w-0 flex-1 p-5 @max-xl:p-4">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">Обзор</p>
                <span className="rounded-md border border-black/10 px-2 py-0.5 text-2xs text-black/55">30 дней ▾</span>
              </div>

              <div className="mt-3 grid grid-cols-4 gap-3 @max-xl:grid-cols-2">
                {KPIS.map((kpi) => (
                  <div key={kpi.label} className="rounded-lg border border-black/[0.06] px-3 py-2">
                    <p className="text-2xs text-black/45">{kpi.label}</p>
                    <p className="mt-0.5 text-base font-semibold tabular-nums">{kpi.value}</p>
                    <p className="text-2xs text-[#1f8a4c]">{kpi.delta}</p>
                  </div>
                ))}
              </div>

              <div className="mt-3 rounded-lg border border-black/[0.06] p-3">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="font-medium">Расходы по моделям</span>
                  <span className="flex gap-3 text-2xs text-black/55">
                    {SERIES.map((s) => (
                      <span key={s.name} className="flex items-center gap-1">
                        <span className="size-2 rounded-sm" style={{ background: s.color }} />
                        {s.name}
                      </span>
                    ))}
                  </span>
                </div>
                <div className="mt-3 flex h-24 items-end gap-[0.2em]">
                  {DAYS.map((day, i) => (
                    <div
                      key={i}
                      className="flex flex-1 flex-col-reverse overflow-hidden rounded-t-[0.15em]"
                      style={{ height: `${(TOTALS[i] / PEAK) * 100}%` }}
                    >
                      {day.map((value, j) => (
                        <div key={j} style={{ height: `${(value / TOTALS[i]) * 100}%`, background: SERIES[j].color }} />
                      ))}
                    </div>
                  ))}
                </div>
                <div className="mt-1.5 flex justify-between text-2xs text-black/40">
                  <span>1 сен</span>
                  <span>15 сен</span>
                  <span>30 сен</span>
                </div>
              </div>

              <div className="mt-3 rounded-lg border border-black/[0.06]">
                {KEYS.map((key) => {
                  const pct = Math.round((key.spent / key.budget) * 100);
                  const exhausted = pct >= 100;
                  return (
                    <div
                      key={key.name}
                      className="grid grid-cols-[8em_minmax(0,1fr)_8.5em] items-center gap-4 border-b border-black/[0.05] px-3 py-2 text-xs last:border-0"
                    >
                      <span className="font-mono tracking-normal">{key.name}</span>
                      <div className="h-1.5 overflow-hidden rounded-full bg-black/[0.06]">
                        <div
                          className={`h-full rounded-full ${exhausted ? "bg-[#e5484d]" : "bg-black"}`}
                          style={{ width: `${Math.min(pct, 100)}%` }}
                        />
                      </div>
                      <span className="text-right tabular-nums">
                        {usd(key.spent)} <span className="text-black/40">/ {usd(key.budget)}</span>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Shot>
  );
}
