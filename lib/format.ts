const formatters = new Map<string, Intl.NumberFormat>();

function formatter(min: number, max: number) {
  const key = `${min}:${max}`;
  let nf = formatters.get(key);
  if (!nf) {
    nf = new Intl.NumberFormat("ru-RU", { minimumFractionDigits: min, maximumFractionDigits: max });
    formatters.set(key, nf);
  }
  return nf;
}

/** `$4 820`, `$0,28` — русские разделители, знак доллара впереди. */
export function usd(value: number, fractionDigits = 0) {
  return `$${formatter(fractionDigits, Math.max(fractionDigits, 4)).format(value)}`;
}
