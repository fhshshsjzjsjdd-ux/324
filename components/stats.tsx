import { stats } from "@/content/site";
import { BLEED, MUTED } from "./ui";

export function Stats() {
  return (
    <dl className={`mb-4 grid grid-cols-2 items-start gap-x-6 gap-y-8 xl:grid-cols-4 ${BLEED}`}>
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col-reverse">
          <dt className={`mt-2 text-base leading-snug ${MUTED}`}>{stat.label}</dt>
          <dd className="serif-num text-4xl leading-none sm:text-5xl xl:text-[2.5rem]">{stat.value}</dd>
        </div>
      ))}
    </dl>
  );
}
