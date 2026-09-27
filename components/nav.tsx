import { Fragment } from "react";
import { navExternal, navSections, site } from "@/content/site";

function externalProps(href: string) {
  return /^https?:/.test(href) ? { target: "_blank", rel: "noopener noreferrer" } : {};
}

const NAV_LINK = "hover:underline hover:underline-offset-4";

export function DesktopNav() {
  return (
    <nav
      aria-label="Основная навигация"
      className="fixed right-8 top-2 z-40 hidden pt-4 text-right text-lg tracking-tight md:block"
    >
      <ul>
        {navSections.map((link, i) => (
          <li key={link.href} className={i === navSections.length - 1 ? "mb-10" : "mb-2"}>
            <a href={link.href} className={NAV_LINK}>
              {link.label}
            </a>
          </li>
        ))}
        {navExternal.map((link) => (
          <li key={link.label} className="mb-2">
            <a href={link.href} className={NAV_LINK} {...externalProps(link.href)}>
              {link.label}
            </a>
          </li>
        ))}
        <li className="mt-10">
          <a href={site.links.login} className={NAV_LINK}>
            Войти
          </a>
        </li>
      </ul>
    </nav>
  );
}

export function MobileTopNav() {
  return (
    <nav
      aria-label="Навигация"
      className="mb-6 flex flex-row items-center justify-between px-7 pb-2 pt-4 text-lg md:hidden"
    >
      <div className="flex flex-row gap-6">
        <a href="#models" className={NAV_LINK}>
          Модели
        </a>
        <a href="#pricing" className={NAV_LINK}>
          Цены
        </a>
      </div>
      <a href={site.links.login} className={NAV_LINK}>
        Войти
      </a>
    </nav>
  );
}

export function MobileFooterNav() {
  return (
    <nav aria-label="Ссылки" className="flex w-full flex-row flex-wrap px-7 py-2 pb-10 text-lg md:hidden">
      {navExternal.map((link, i) => (
        <Fragment key={link.label}>
          {i > 0 ? <span className="mx-1 text-gray-400 dark:text-gray-500">/</span> : null}
          <a href={link.href} {...externalProps(link.href)}>
            {link.label}
          </a>
        </Fragment>
      ))}
    </nav>
  );
}
