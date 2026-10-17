"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { services, servicesIntro, servicesCta } from "@/lib/content";
import { staggerContainer, popIn, riseIn, inViewProps } from "@/lib/motion";
import { SectionHeading } from "./ui/SectionHeading";

const accent: Record<string, string> = {
  blue: "bg-pop-blue",
  orange: "bg-pop-orange",
  purple: "bg-pop-purple",
  green: "bg-pop-green",
  pink: "bg-pop-pink",
};

export function Services() {
  return (
    <section className="relative bg-transparent py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading kicker="Work with me" badgeClass="bg-pop-pink text-white">
            What I can do
            <br />
            for you
          </SectionHeading>
          <p className="max-w-sm font-medium text-ink/65">{servicesIntro}</p>
        </div>

        <motion.div
          variants={staggerContainer(0.14, 0.05)}
          {...inViewProps}
          className="mt-16 grid gap-6 md:grid-cols-3"
        >
          {services.map((s) => (
            <motion.article
              key={s.title}
              variants={popIn}
              className={`group relative flex flex-col overflow-hidden rounded-3xl border-4 border-ink ${
                accent[s.accent] ?? "bg-pop-blue"
              } p-8 text-white shadow-[8px_8px_0_0_#15121c] transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[12px_12px_0_0_#15121c]`}
            >
              <span className="font-display text-5xl">{s.no}</span>
              <h3 className="ts-hard mt-8 font-display text-2xl">{s.title}</h3>
              <p className="mt-4 font-medium leading-relaxed text-white/90">
                {s.body}
              </p>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          variants={riseIn}
          {...inViewProps}
          className="mt-12 flex flex-col items-start gap-5 rounded-3xl border-4 border-ink bg-card p-8 shadow-[8px_8px_0_0_#15121c] sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="ts-pop font-display text-3xl text-ink sm:text-4xl">
            {servicesCta}
          </p>
          <Link
            href="/contact"
            data-cursor="Say hi"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border-2 border-ink bg-electric px-6 py-3 font-black text-white shadow-[4px_4px_0_0_#15121c] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#15121c]"
          >
            Let&apos;s build <span aria-hidden="true">↗</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
