import { Shot } from "@/components/shot";

const CYCLE = "5s";
const TO_ANTHROPIC = "M200 64 V138 L184 160 C184 192 72 190 72 218";
const TO_OPENAI = "M200 138 V218";

type NodeTone = "error" | "ok" | "idle";

function ProviderNode({ x, name, status, tone }: { x: number; name: string; status: string; tone: NodeTone }) {
  const color = { error: "#d4353b", ok: "#1f8a4c", idle: "#8a94a3" }[tone];
  const cx = x + 96;
  const cy = 234;
  return (
    <g>
      <text x={x + 14} y={243} fontSize="12.5" fontWeight="600" fill={tone === "idle" ? "#66768a" : "#141414"}>
        {name}
      </text>
      <text x={x + 14} y={262} fontSize="10.5" fill={color}>
        {status}
      </text>
      <circle cx={cx} cy={cy} r="7" fill={color} fillOpacity={tone === "idle" ? 0.25 : 0.14} />
      {tone === "error" ? (
        <path d={`M${cx - 2.5} ${cy - 2.5}l5 5m0-5l-5 5`} stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      ) : null}
      {tone === "ok" ? (
        <path
          d={`M${cx - 3} ${cy}l2 2.2l4-4.4`}
          stroke={color}
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : null}
    </g>
  );
}

export function FallbackShot() {
  return (
    <Shot
      tone="sky"
      size="half"
      scaled={false}
      className="xl:aspect-[4/3]"
      label="Схема фолбэка: Anthropic ответил ошибкой 529, и запрос автоматически ушёл в OpenAI"
    >
      <div className="flex h-full items-center justify-center px-2 py-6 xl:py-2">
        <svg viewBox="0 0 400 300" className="w-full max-w-[26rem]">
          <defs>
            <filter id="fallback-shadow" x="-20%" y="-20%" width="140%" height="160%">
              <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#1e3a5f" floodOpacity="0.12" />
            </filter>
          </defs>

          <g fill="none" strokeLinecap="round">
            <path d="M200 64V116" stroke="#8ea6bf" strokeWidth="1.5" />
            <path d="M184 160C184 192 72 190 72 218" stroke="#e6a0a0" strokeWidth="1.5" strokeDasharray="4 5" />
            <path d="M200 160V218" stroke="#2f9e58" strokeWidth="2" />
            <path d="M216 160C216 192 328 190 328 218" stroke="#b3c2d3" strokeWidth="1.5" strokeDasharray="1 5" />
          </g>
          <text x="208" y="93" fontSize="9" fill="#5d7088" className="font-mono" letterSpacing="0">
            POST /v1/chat/completions
          </text>

          {/* Request pulses; hidden entirely for reduced-motion users. */}
          <g className="hidden motion-safe:inline">
            <circle r="4" fill="#1d2939">
              <animateMotion dur={CYCLE} repeatCount="indefinite" calcMode="linear" keyPoints="0;1;1" keyTimes="0;0.34;1" path={TO_ANTHROPIC} />
              <animate attributeName="opacity" dur={CYCLE} repeatCount="indefinite" values="1;1;0;0" keyTimes="0;0.34;0.4;1" />
            </circle>
            <circle r="4" fill="#1d2939" opacity="0">
              <animateMotion dur={CYCLE} repeatCount="indefinite" calcMode="linear" keyPoints="0;0;1;1" keyTimes="0;0.44;0.62;1" path={TO_OPENAI} />
              <animate attributeName="opacity" dur={CYCLE} repeatCount="indefinite" values="0;0;1;1;0;0" keyTimes="0;0.44;0.45;0.62;0.7;1" />
            </circle>
          </g>

          <g filter="url(#fallback-shadow)">
            <rect x="130" y="24" width="140" height="40" rx="10" fill="#fff" />
            <rect x="150" y="116" width="100" height="44" rx="22" fill="#141414" />
            <rect x="16" y="218" width="112" height="58" rx="11" fill="#fff" />
            <rect x="144" y="218" width="112" height="58" rx="11" fill="#fff" />
            <rect x="272" y="218" width="112" height="58" rx="11" fill="#fff" fillOpacity="0.65" />
          </g>

          <g className="hidden motion-safe:inline" fill="none" strokeWidth="2">
            <rect x="16" y="218" width="112" height="58" rx="11" stroke="#e5484d" opacity="0">
              <animate attributeName="opacity" dur={CYCLE} repeatCount="indefinite" values="0;0;1;1;0" keyTimes="0;0.33;0.36;0.9;1" />
            </rect>
            <rect x="144" y="218" width="112" height="58" rx="11" stroke="#2f9e58" opacity="0">
              <animate attributeName="opacity" dur={CYCLE} repeatCount="indefinite" values="0;0;1;1;0" keyTimes="0;0.61;0.64;0.92;1" />
            </rect>
          </g>

          <text x="200" y="48.5" textAnchor="middle" fontSize="13" fontWeight="500" fill="#141414">
            Ваш сервис
          </text>
          <text x="200" y="145" textAnchor="middle" fontSize="19" fill="#fff" className="wordmark">
            Relay
          </text>

          <ProviderNode x={16} name="Anthropic" status="529 · перегружен" tone="error" />
          <ProviderNode x={144} name="OpenAI" status="200 · 1,2 с" tone="ok" />
          <ProviderNode x={272} name="Google" status="в резерве" tone="idle" />
        </svg>
      </div>
    </Shot>
  );
}
