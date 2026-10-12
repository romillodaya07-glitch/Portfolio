"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { moments, momentsIntro } from "@/lib/content";
import { staggerContainer, popIn, inViewProps } from "@/lib/motion";
import { SectionHeading } from "./ui/SectionHeading";

/**
 * Bento spans (desktop only, so mobile/tablet stay a clean uniform grid).
 * Two tall portrait pillars frame two stacked wides, with two wide tiles
 * across the bottom.
 */
const sizeClass: Record<string, string> = {
  tall: "md:row-span-2",
  wide: "md:col-span-2",
  square: "md:col-span-2",
};

export function Moments() {
  return (
    <section id="moments" className="relative bg-transparent py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          kicker="Remarkable moments"
          badgeClass="bg-pop-pink text-white"
        >
          People. Platforms.
          <br />
          Perspectives.
        </SectionHeading>
        <p className="mt-6 max-w-xl text-lg font-medium text-ink/65">
          {momentsIntro}
        </p>

        <motion.div
          variants={staggerContainer(0.1, 0.05)}
          {...inViewProps}
          className="mt-14 grid auto-rows-[15rem] grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4"
        >
          {moments.map((m) => (
            <motion.figure
              key={m.src}
              variants={popIn}
              className={`group relative overflow-hidden rounded-2xl border-4 border-ink bg-card shadow-[6px_6px_0_0_#15121c] ${
                sizeClass[m.size] ?? ""
              }`}
            >
              <Image
                src={m.src}
                alt={m.alt}
                fill
                loading="lazy"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent opacity-90" />
              <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 p-5 opacity-90 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <h3 className="font-display text-xl leading-tight text-paper">
                  {m.title}
                </h3>
                <p className="mt-1 max-h-0 overflow-hidden text-sm text-paper/75 transition-all duration-500 group-hover:max-h-24">
                  {m.caption}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
