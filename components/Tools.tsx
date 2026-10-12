"use client";

import { motion } from "framer-motion";
import { tools } from "@/lib/content";
import { staggerContainer, popIn, inViewProps } from "@/lib/motion";
import { SectionHeading } from "./ui/SectionHeading";
import { BrandLogo } from "./ui/BrandLogos";

export function Tools() {
  return (
    <section className="relative bg-transparent py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading kicker="Tools" align="center" badgeClass="bg-pop-orange text-white">
          The daily stack
        </SectionHeading>

        <motion.ul
          variants={staggerContainer(0.06, 0.05)}
          {...inViewProps}
          className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {tools.map((t) => (
            <motion.li
              key={t.name}
              variants={popIn}
              style={{ ["--brand" as string]: t.color }}
              className="group flex flex-col items-center gap-3 rounded-2xl border-2 border-ink bg-card p-6 text-center shadow-[5px_5px_0_0_#15121c] transition-transform duration-200 hover:-translate-y-1.5"
            >
              <span
                className="flex h-14 w-14 items-center justify-center rounded-xl border-2 border-ink bg-paper transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-6"
                style={{ color: t.color }}
                aria-hidden="true"
              >
                <BrandLogo slug={t.slug} className="h-7 w-7" />
              </span>
              <span className="text-sm font-bold text-ink">{t.name}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
