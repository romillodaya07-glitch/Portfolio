"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { skills, skillCategories, skillsPortraitAlt } from "@/lib/content";
import { staggerContainer, popIn, riseIn, inViewProps } from "@/lib/motion";
import { SectionHeading } from "./ui/SectionHeading";

const tagColors = [
  "bg-pop-blue",
  "bg-pop-red",
  "bg-pop-green",
  "bg-pop-purple",
  "bg-pop-orange",
  "bg-pop-pink",
];

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: readonly string[];
  reverse?: boolean;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee-mask flex overflow-hidden">
      <div
        className={`flex shrink-0 gap-4 pr-4 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
        style={{ ["--marquee-duration" as string]: "34s" }}
      >
        {doubled.map((s, i) => (
          <span
            key={`${s}-${i}`}
            className="flex items-center gap-4 whitespace-nowrap font-display text-2xl text-ink sm:text-3xl"
          >
            {s}
            <span className="text-pop-red">★</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden bg-transparent py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.7fr] lg:items-center lg:gap-16">
          <div>
            <SectionHeading kicker="Skills" badgeClass="bg-pop-red text-white">
              The toolkit
            </SectionHeading>
            <motion.div
              variants={staggerContainer(0.05, 0.05)}
              {...inViewProps}
              className="mt-10 flex flex-wrap gap-3"
            >
              {skills.map((s, i) => (
                <motion.span
                  key={s}
                  variants={popIn}
                  data-cursor=""
                  className={`cursor-default rounded-full border-2 border-ink ${
                    tagColors[i % tagColors.length]
                  } px-5 py-2.5 text-sm font-black text-white shadow-[3px_3px_0_0_#15121c] transition-transform duration-200 hover:-translate-y-1`}
                >
                  {s}
                </motion.span>
              ))}
            </motion.div>

            <motion.p
              variants={riseIn}
              {...inViewProps}
              className="mt-10 mb-4 label-mono text-ink/50"
            >
              Zoomed out
            </motion.p>
            <motion.div
              variants={staggerContainer(0.06)}
              {...inViewProps}
              className="flex flex-wrap gap-2.5"
            >
              {skillCategories.map((c) => (
                <motion.span
                  key={c}
                  variants={popIn}
                  className="rounded-lg border-2 border-ink bg-card px-4 py-2 text-sm font-bold text-ink"
                >
                  {c}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -3 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.9 }}
            className="relative mx-auto aspect-[3/4] w-full max-w-xs overflow-hidden rounded-[1.75rem] border-4 border-ink bg-card shadow-[10px_10px_0_0_#7b5cff]"
          >
            <Image
              src="/photos/skills-blue.jpeg"
              alt={skillsPortraitAlt}
              fill
              sizes="(max-width: 1024px) 80vw, 28vw"
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>

      {/* Full-bleed marquee */}
      <div className="mt-20 flex flex-col gap-4 border-y-4 border-ink bg-gold py-6">
        <MarqueeRow items={skills} />
        <MarqueeRow items={skillCategories} reverse />
      </div>
    </section>
  );
}
