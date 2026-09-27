import { hero, site } from "@/content/site";
import { ArrowRight } from "./icons";
import { TextLink } from "./rich";
import { MUTED } from "./ui";

export const PRIMARY_BUTTON =
  "group inline-flex items-center gap-2 rounded-full bg-black py-2.5 pl-5 pr-4 text-base font-medium text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200";

export function Cta({ note = true, className = "" }: { note?: boolean; className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-6 gap-y-3 ${className}`}>
      <a href={site.links.signup} className={PRIMARY_BUTTON}>
        {hero.cta}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </a>
      <TextLink href={site.links.docs} className="text-base">
        {hero.secondary}
      </TextLink>
      {note ? <p className={`basis-full text-base ${MUTED}`}>{hero.note}</p> : null}
    </div>
  );
}
