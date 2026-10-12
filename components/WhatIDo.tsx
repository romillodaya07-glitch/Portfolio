"use client";

import { motion } from "framer-motion";
import { pillars } from "@/lib/content";
import { staggerContainer, popIn, inViewProps } from "@/lib/motion";
import { SectionHeading } from "./ui/SectionHeading";

const accent: Record<string, { bg: string; text: string }> = {
  electric: { bg: "bg-pop-blue", text: "text-white" },
  gold: { bg: "bg-pop-orange", text: "text-white" },
  purple: { bg: "bg-pop-purple", text: "text-white" },
};

export function WhatIDo() {
  return (
    <section id="work" className="relative bg-transparent py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading kicker="What I do" badgeClass="bg-pop-green text-white">
            Three ways
            <br />I create value
          </SectionHeading>
          <p className="max-w-sm font-medium text-ink/65">
            Strategy, marketing, and people — different lenses on the same
            question: how do we build something that matters?
          </p>
        </div>

        <motion.div
          variants={staggerContainer(0.14, 0.05)}
          {...inViewProps}
          className="mt-16 grid gap-6 md:grid-cols-3"
        >
          {pillars.map((p) => {
            const a = accent[p.accent] ?? accent.electric;
            return (
              <motion.article
                key={p.title}
                variants={popIn}
                className={`group relative flex flex-col overflow-hidden rounded-3xl border-4 border-ink ${a.bg} ${a.text} p-8 shadow-[8px_8px_0_0_#15121c] transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[12px_12px_0_0_#15121c]`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-6xl">{p.no}</span>
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink bg-paper text-ink transition-transform duration-200 group-hover:rotate-45"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </div>
                <h3 className="ts-hard mt-10 font-display text-3xl">{p.title}</h3>
                <p className="mt-4 font-medium leading-relaxed text-white/90">
                  {p.body}
                </p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
