export type Lang = "python" | "ts" | "bash" | "json";

type Kind = "plain" | "com" | "str" | "var" | "flag" | "num" | "kw" | "fn" | "prop" | "builtin";

const KEYWORDS: Record<Lang, ReadonlySet<string>> = {
  python: new Set(["import", "from", "as", "def", "return", "await", "async", "with", "for", "in", "if", "else", "None", "True", "False"]),
  ts: new Set(["import", "from", "const", "let", "await", "new", "export", "default", "return", "async", "function"]),
  bash: new Set(["curl"]),
  json: new Set(["true", "false", "null"]),
};

const BUILTINS: ReadonlySet<string> = new Set(["print", "console", "os", "process"]);

const COMMENT: Record<Lang, string> = { python: "#.*", bash: "#.*", ts: "//.*", json: "(?!)" };
const STRING = String.raw`"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'`;

function pattern(lang: Lang) {
  return new RegExp(
    [
      `(${COMMENT[lang]})`,
      `(${STRING})`,
      String.raw`(\$[A-Za-z_]\w*)`,
      String.raw`((?<=\s)--?[A-Za-z][\w-]*)`,
      String.raw`(\b\d+(?:\.\d+)?\b)`,
      String.raw`([A-Za-z_]\w*)`,
    ].join("|"),
    "g",
  );
}

function tokenize(line: string, lang: Lang) {
  const tokens: { kind: Kind; text: string }[] = [];
  let last = 0;
  for (const m of line.matchAll(pattern(lang))) {
    const [text, com, str, envVar, flag, num, ident] = m;
    const start = m.index ?? 0;
    if (start > last) tokens.push({ kind: "plain", text: line.slice(last, start) });
    const rest = line.slice(start + text.length);
    let kind: Kind = "plain";
    if (com) kind = "com";
    else if (str) kind = /^\s*:/.test(rest) ? "prop" : "str";
    else if (envVar) kind = "var";
    else if (flag) kind = "flag";
    else if (num) kind = "num";
    else if (ident) {
      if (KEYWORDS[lang].has(ident)) kind = "kw";
      else if (rest.startsWith("(")) kind = "fn";
      // Python kwargs have no spaces around "=", assignments do.
      else if ((lang === "python" && /^=(?!=)/.test(rest)) || (lang === "ts" && /^\s*:/.test(rest))) kind = "prop";
      else if (BUILTINS.has(ident)) kind = "builtin";
    }
    tokens.push({ kind, text });
    last = start + text.length;
  }
  if (last < line.length) tokens.push({ kind: "plain", text: line.slice(last) });
  return tokens;
}

export function CodeBlock({
  code,
  lang,
  highlight = [],
  numbers = true,
}: {
  code: string;
  lang: Lang;
  /** 1-based line numbers to mark as added */
  highlight?: number[];
  numbers?: boolean;
}) {
  const marked = new Set(highlight);
  return (
    <pre className="code">
      <code>
        {code.split("\n").map((line, i) => (
          <span key={i} className={marked.has(i + 1) ? "code-line code-line--add" : "code-line"}>
            {numbers ? (
              <span className="code-ln" aria-hidden>
                {i + 1}
              </span>
            ) : null}
            <span className="code-src">
              {line.length === 0
                ? " "
                : tokenize(line, lang).map((t, j) =>
                    t.kind === "plain" ? (
                      t.text
                    ) : (
                      <span key={j} className={`tok-${t.kind}`}>
                        {t.text}
                      </span>
                    ),
                  )}
            </span>
          </span>
        ))}
      </code>
    </pre>
  );
}
