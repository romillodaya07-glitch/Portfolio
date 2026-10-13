"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { taglines } from "@/lib/content";
import { EASE_OUT_EXPO } from "@/lib/motion";

/** Cycles through the brand lines with a masked swap. */
export function CyclingTagline() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const t = setInterval(() => setI((v) => (v + 1) % taglines.length), 2600);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="ts-pop flex max-w-full items-baseline gap-3 font-display text-xl text-ink sm:text-3xl">
      <span aria-hidden="true" className="text-pop-red">
        ★
      </span>
      <span className="relative block h-[1.4em] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={taglines[i]}
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-110%" }}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
            className="block whitespace-nowrap"
          >
            {taglines[i]}
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  );
}
