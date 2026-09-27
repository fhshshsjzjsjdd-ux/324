import { faq } from "@/content/site";
import { Rich, typograph } from "./rich";
import { TEXT_COL } from "./ui";

export function Faq() {
  return (
    <div className={`border-t border-black/10 dark:border-white/15 ${TEXT_COL}`}>
      {faq.map((item) => (
        <details key={item.q} className="group border-b border-black/10 dark:border-white/15">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-4 font-medium [&::-webkit-details-marker]:hidden">
            <span>{typograph(item.q)}</span>
            <span
              aria-hidden
              className="mt-0.5 text-xl leading-none text-gray-400 transition-transform duration-200 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="pb-5 text-pretty text-gray-600 dark:text-gray-300">
            <Rich text={item.a} />
          </p>
        </details>
      ))}
    </div>
  );
}
