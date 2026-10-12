"use client";

import { motion } from "framer-motion";
import { experience } from "@/lib/content";
import { staggerContainer, riseIn, inViewProps } from "@/lib/motion";
import { SectionHeading } from "./ui/SectionHeading";

const dotColors = [
  "bg-pop-blue",
  "bg-pop-red",
  "bg-pop-green",
  "bg-pop-purple",
  "bg-pop-orange",
  "bg-pop-pink",
];

export function Experience() {
  return (
    <section id="experience" className="relative bg-pop-yellow/20 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeading kicker="Experience" badgeClass="bg-pop-purple text-white">
          Where I&apos;ve built
        </SectionHeading>

        <motion.ol
          variants={staggerContainer(0.14, 0.05)}
          {...inViewProps}
          className="mt-16 space-y-4"
        >
          {experience.map((job, i) => (
            <motion.li
              key={job.company}
              variants={riseIn}
              className="group grid gap-3 rounded-2xl border-2 border-ink bg-card p-6 shadow-[5px_5px_0_0_#15121c] transition-transform duration-200 hover:-translate-y-1 md:grid-cols-[auto_1fr_auto] md:items-baseline md:gap-6"
            >
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink ${
                  dotColors[i % dotColors.length]
                } font-display text-sm text-white`}
              >
                0{i + 1}
              </span>

              <div>
                <h3 className="font-display text-2xl text-ink md:text-3xl">
                  {job.company}
                </h3>
                {job.role && (
                  <p className="mt-1 label-mono text-electric">{job.role}</p>
                )}
                {job.location && (
                  <p className="mt-1 text-sm font-semibold text-ink/50">
                    {job.location}
                  </p>
                )}
                <p className="mt-3 max-w-xl font-medium text-ink/65">{job.body}</p>

                {/* Nested role progression */}
                {job.roles && (
                  <ol className="mt-5 space-y-0 border-l-2 border-dashed border-ink/25 pl-5">
                    {job.roles.map((r) => (
                      <li key={r.title} className="relative pb-5 last:pb-0">
                        <span
                          className={`absolute -left-[1.6rem] top-1 h-3.5 w-3.5 rounded-full border-2 border-ink ${
                            dotColors[i % dotColors.length]
                          }`}
                        />
                        <p className="font-display text-base text-ink sm:text-lg">
                          {r.title}
                        </p>
                        <p className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 label-mono text-ink/50">
                          <span className="rounded-full bg-ink px-2 py-0.5 text-[0.6rem] text-paper">
                            {r.type}
                          </span>
                          {r.period}
                        </p>
                      </li>
                    ))}
                  </ol>
                )}
              </div>

              <span className="whitespace-nowrap rounded-full bg-ink px-3 py-1 label-mono text-paper md:justify-self-end">
                {job.period}
              </span>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
