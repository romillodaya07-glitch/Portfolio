"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/lib/content";
import { staggerContainer, popIn, inViewProps } from "@/lib/motion";
import { SectionHeading } from "./ui/SectionHeading";

const accent: Record<string, { chip: string; mark: string }> = {
  blue: { chip: "bg-pop-blue", mark: "text-pop-blue" },
  green: { chip: "bg-pop-green", mark: "text-pop-green" },
  pink: { chip: "bg-pop-pink", mark: "text-pop-pink" },
  orange: { chip: "bg-pop-orange", mark: "text-pop-orange" },
  purple: { chip: "bg-pop-purple", mark: "text-pop-purple" },
};

export function Testimonials() {
  return (
    <section className="relative bg-transparent py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading kicker="Kind words" badgeClass="bg-pop-green text-white">
          What people say
        </SectionHeading>

        <motion.div
          variants={staggerContainer(0.12, 0.05)}
          {...inViewProps}
          className="mt-16 grid gap-6 md:grid-cols-3"
        >
          {testimonials.map((t, i) => {
            const a = accent[t.accent] ?? accent.blue;
            return (
              <motion.figure
                key={i}
                variants={popIn}
                className="flex flex-col rounded-3xl border-4 border-ink bg-card p-8 shadow-[6px_6px_0_0_#15121c] transition-transform duration-200 hover:-translate-y-1.5"
              >
                <span
                  className={`font-display text-6xl leading-none ${a.mark}`}
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
                <blockquote className="-mt-4 font-medium text-ink/80">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink ${a.chip} font-display text-sm text-white`}
                  >
                    {(t.name.match(/[A-Za-z]/)?.[0] ?? "★").toUpperCase()}
                  </span>
                  <span>
                    <span className="block font-display text-base text-ink">
                      {t.name}
                    </span>
                    <span className="block text-xs font-semibold text-ink/55">
                      {t.role}
                    </span>
                  </span>
                </figcaption>
              </motion.figure>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
