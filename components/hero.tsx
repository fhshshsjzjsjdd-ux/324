import { hero, site } from "@/content/site";
import { Cta } from "./cta";
import { Rich } from "./rich";
import { TEXT_COL } from "./ui";

export function Hero() {
  return (
    <header className={`mb-16 ${TEXT_COL}`}>
      <h1 className="wordmark mb-6 mt-0 -mr-[calc(100%/11)] text-7xl md:mr-0 md:text-8xl">{site.name}</h1>
      <p className="text-pretty">
        <Rich text={hero.lead} />
      </p>
      <p className="mt-4 text-pretty">
        <Rich text={hero.body} />
      </p>
      <Cta className="mt-8" />
    </header>
  );
}
