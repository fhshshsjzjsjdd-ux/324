import { Fragment, type ReactNode } from "react";

const SHORT_WORD = /(?<=^|[\s«(\u00A0])([А-Яа-яЁёA-Za-z]{1,2}) /g;
const NUMBER = /(\d[\d.,%+]*) (?=[А-Яа-яЁёA-Za-z$])/g;

/** Russian typesetting: glue short words and numbers to the next word, keep dashes off line starts. */
export function typograph(text: string) {
  return text.replace(SHORT_WORD, "$1\u00A0").replace(NUMBER, "$1\u00A0").replace(/ —/g, "\u00A0—");
}

export function TextLink({
  href,
  className = "",
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  const external = /^https?:/.test(href);
  return (
    <a
      href={href}
      className={`u-link ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

/** Tiny markup for copy: `code` and [label](href). */
export function Rich({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(/`([^`]+)`|\[([^\]]+)\]\(([^)\s]+)\)/g)) {
    const start = match.index ?? 0;
    if (start > last) parts.push(<Fragment key={`t${last}`}>{typograph(text.slice(last, start))}</Fragment>);
    if (match[1] !== undefined) {
      parts.push(
        <code key={start} className="inline-code">
          {match[1]}
        </code>,
      );
    } else {
      parts.push(
        <TextLink key={start} href={match[3]}>
          {typograph(match[2])}
        </TextLink>,
      );
    }
    last = start + match[0].length;
  }
  if (last < text.length) parts.push(<Fragment key={`t${last}`}>{typograph(text.slice(last))}</Fragment>);
  return <>{parts}</>;
}
