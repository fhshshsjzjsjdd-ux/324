"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "./icons";

/** A quiet dot in the corner that grows into a "back to top" button once you scroll. */
export function ScrollDot() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const update = () => setOpen(window.scrollY > 480);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0 })}
      aria-label="Наверх"
      aria-hidden={!open}
      tabIndex={open ? 0 : -1}
      className={`fixed bottom-5 right-5 z-50 grid place-items-center rounded-full border border-neutral-700 bg-black text-white transition-all duration-200 ease-out dark:border-neutral-300 dark:bg-white dark:text-black ${open ? "size-12 cursor-pointer" : "pointer-events-none size-3"}`}
    >
      <ArrowUp className={`size-5 transition-opacity duration-150 ${open ? "opacity-100" : "opacity-0"}`} />
    </button>
  );
}
