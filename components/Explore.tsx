"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { explore } from "@/lib/content";
import { staggerContainer, popIn, inViewProps } from "@/lib/motion";
import { SectionHeading } from "./ui/SectionHeading";

const blockColor: Record<string, string> = {
  electric: "bg-pop-blue",
  gold: "bg-pop-orange",
  purple: "bg-pop-purple",
  red: "bg-pop-red",
};

export function Explore() {
  return (
    <section className="relative bg-transparent py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading kicker="Index" badgeClass="bg-ink text-paper">
          Look around
        </SectionHeading>

        <motion.div
          variants={staggerContainer(0.1, 0.05)}
          {...inViewProps}
          className="mt-14 grid gap-5 sm:grid-cols-2"
        >
          {explore.map((e, i) => (
            <motion.div key={e.href} variants={popIn}>
              <Link
                href={e.href}
                data-cursor="Open"
                className={`group flex min-h-[200px] flex-col justify-between overflow-hidden rounded-3xl border-4 border-ink ${
                  blockColor[e.accent] ?? "bg-pop-blue"
                } p-8 text-white shadow-[8px_8px_0_0_#15121c] transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[12px_12px_0_0_#15121c]`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-xl">0{i + 1}</span>
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink bg-paper text-ink transition-transform duration-200 group-hover:rotate-45"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </div>
                <div>
                  <h3 className="ts-hard font-display text-5xl sm:text-6xl">
                    {e.label}
                  </h3>
                  <p className="mt-2 font-medium text-white/85">{e.line}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
