import { site } from "@/content/site";
import { MUTED } from "./ui";

export function SiteFooter() {
  return (
    <footer className={`mt-24 flex flex-wrap gap-x-5 gap-y-1 text-base ${MUTED}`}>
      <span>
        © {new Date().getFullYear()} {site.name}
      </span>
      <a href={site.links.privacy} className="hover:text-black dark:hover:text-white">
        Политика конфиденциальности
      </a>
      <a href={site.links.terms} className="hover:text-black dark:hover:text-white">
        Оферта
      </a>
    </footer>
  );
}
