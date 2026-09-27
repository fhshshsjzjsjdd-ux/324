import { plans } from "@/content/site";
import { PRIMARY_BUTTON } from "./cta";
import { ArrowRight, CheckIcon } from "./icons";
import { typograph } from "./rich";
import { MUTED } from "./ui";

export function Pricing() {
  return (
    <div className="grid gap-x-6 gap-y-10 lg:grid-cols-3">
      {plans.map((plan) => (
        <section
          key={plan.name}
          aria-label={plan.name}
          className={`flex flex-col pt-4 ${plan.featured ? "border-t-2 border-black dark:border-white" : "border-t border-black/15 dark:border-white/20"}`}
        >
          <h3 className="font-semibold">{plan.name}</h3>
          <p className={`text-base lg:min-h-[3.25rem] ${MUTED}`}>{typograph(plan.caption)}</p>
          <p className="mt-6 flex h-12 items-baseline gap-2">
            {/^[$\d]/.test(plan.price) ? (
              <span className="serif-num text-5xl leading-none">{plan.price}</span>
            ) : (
              <span className="flex items-baseline">
                {/* Invisible serif strut keeps the baseline in line with the numeric prices. */}
                <span aria-hidden className="serif-num invisible w-0 text-5xl leading-none">
                  $
                </span>
                <span className="text-2xl font-semibold leading-none">{plan.price}</span>
              </span>
            )}
            {plan.period ? <span className={`text-base ${MUTED}`}>{plan.period}</span> : null}
          </p>
          <ul className="mt-6 flex-1 space-y-2 text-base">
            {plan.features.map((feature) => (
              <li key={feature} className="flex gap-2.5">
                <CheckIcon className="mt-1 size-4 shrink-0 text-gray-400" />
                <span>{typograph(feature)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            {plan.featured ? (
              <a href={plan.cta.href} className={PRIMARY_BUTTON}>
                {plan.cta.label}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            ) : (
              <a href={plan.cta.href} className="u-link text-base font-medium">
                {plan.cta.label}
              </a>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
