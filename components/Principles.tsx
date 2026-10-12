"use client";

import { motion } from "framer-motion";
import { principles } from "@/lib/content";
import { staggerContainer, riseIn, popIn, inViewProps } from "@/lib/motion";
import { SectionHeading } from "./ui/SectionHeading";
import { FrameworkFunnel } from "./FrameworkFunnel";

const cardColors = ["bg-pop-green", "bg-pop-red", "bg-pop-purple"];

export function Principles() {
  return (
    <section id="principles" className="relative bg-transparent py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          kicker="Principles & framework"
          align="center"
          badgeClass="bg-pop-blue text-white"
        >
          What I stand on
        </SectionHeading>

        {/* My Principles — values */}
        <motion.div
          variants={staggerContainer(0.12, 0.05)}
          {...inViewProps}
          className="mx-auto mt-16 grid max-w-5xl gap-5 sm:grid-cols-3"
        >
          {principles.map((p, i) => (
            <motion.div
              key={p.title}
              variants={popIn}
              className={`${cardColors[i]} rounded-3xl border-4 border-ink p-8 text-white shadow-[6px_6px_0_0_#15121c] transition-transform duration-200 hover:-translate-y-1.5`}
            >
              <span className="font-display text-3xl">0{i + 1}</span>
              <h3 className="ts-hard mt-3 font-display text-3xl">{p.title}</h3>
              <p className="mt-3 font-medium text-white/90">{p.body}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* My Framework — 3-step funnel */}
        <div className="mt-24">
          <motion.p
            variants={riseIn}
            {...inViewProps}
            className="mb-2 text-center label-mono text-ink/50"
          >
            My framework — any project, three moves
          </motion.p>
          <FrameworkFunnel />
        </div>
      </div>
    </section>
  );
}
