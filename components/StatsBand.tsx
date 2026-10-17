"use client";

import { motion } from "framer-motion";
import { stats } from "@/lib/content";
import { staggerContainer, popIn, inViewProps } from "@/lib/motion";

const accent: Record<string, string> = {
  blue: "text-pop-blue",
  orange: "text-pop-orange",
  green: "text-pop-green",
  pink: "text-pop-pink",
  purple: "text-pop-purple",
};

/** Bold dark impact band with oversized rainbow figures. */
export function StatsBand() {
  return (
    <section className="relative bg-ink py-16 sm:py-20">
      <motion.ul
        variants={staggerContainer(0.1, 0.05)}
        {...inViewProps}
        className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-10 px-5 sm:px-8 lg:grid-cols-4"
      >
        {stats.map((s) => (
          <motion.li key={s.label} variants={popIn} className="text-center">
            <span
              className={`block font-display text-[clamp(2.75rem,1.5rem+5vw,5rem)] leading-none tracking-tightest ${
                accent[s.accent] ?? "text-pop-blue"
              }`}
              style={{ textShadow: "3px 3px 0 rgba(0,0,0,0.5)" }}
            >
              {s.value}
            </span>
            <span className="mt-3 block text-sm font-semibold text-paper/70">
              {s.label}
            </span>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
