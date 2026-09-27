import type { ReactNode } from "react";

const TONES = {
  peach: "bg-peach",
  sky: "bg-sky",
  lilac: "bg-lilac",
  mint: "bg-mint",
  butter: "bg-butter",
  rose: "bg-rose",
  sand: "bg-sand",
  stone: "bg-stone",
} as const;

export type Tone = keyof typeof TONES;

type ShotProps = {
  tone: Tone;
  /** "half" shots sit two-up on wide screens and use a larger scale factor. */
  size?: "full" | "half";
  /**
   * Scaled shots behave like screenshots: every size inside is derived from the
   * shot width (see `.shot-stage`). Interactive shots stay fluid for readability.
   */
  scaled?: boolean;
  /** Accessible description for purely illustrative shots. */
  label?: string;
  className?: string;
  children: ReactNode;
};

export function Shot({ tone, size = "full", scaled = true, label, className = "", children }: ShotProps) {
  return (
    <figure
      data-size={size}
      role={label ? "img" : undefined}
      aria-label={label}
      className={`shot grain m-0 ${TONES[tone]} ${className}`}
    >
      <div className={scaled ? "shot-stage" : "relative h-full"} aria-hidden={label ? true : undefined}>
        {children}
      </div>
    </figure>
  );
}

export function TwoUp({ children }: { children: [ReactNode, ReactNode] }) {
  const [first, second] = children;
  return (
    <div className="grid grid-cols-12 gap-2 md:gap-6">
      <div className="col-span-12 xl:col-span-6">{first}</div>
      <div className="col-span-12 xl:col-span-6">{second}</div>
    </div>
  );
}

export function WindowDots({ className = "" }: { className?: string }) {
  return (
    <span className={`flex gap-[0.4em] ${className}`} aria-hidden>
      {["#ff5f57", "#febc2e", "#28c840"].map((color) => (
        <span key={color} className="size-[0.7em] rounded-full" style={{ background: color }} />
      ))}
    </span>
  );
}
