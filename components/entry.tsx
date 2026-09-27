import type { ReactNode } from "react";
import type { EntryCopy } from "@/content/site";
import { Rich, typograph } from "./rich";
import { BLEED, MUTED, TEXT_COL } from "./ui";

export function Entry({ id, label, title, text, children }: EntryCopy & { children?: ReactNode }) {
  return (
    <article id={id} aria-labelledby={`${id}-title`} className="my-12 scroll-mt-8">
      <p className={MUTED}>{label}</p>
      <div className={`my-6 text-pretty ${TEXT_COL}`}>
        <h2 id={`${id}-title`} className="inline font-semibold">
          <a href={`#${id}`} className="u-link">
            {typograph(title)}
          </a>
        </h2>
        {"\u00A0— "}
        <Rich text={text} />
      </div>
      {children ? <div className={BLEED}>{children}</div> : null}
    </article>
  );
}
