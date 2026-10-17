"use client";

import { motion } from "framer-motion";
import { contact } from "@/lib/content";
import { staggerContainer, riseIn, riseInLg, inViewProps } from "@/lib/motion";
import { Magnetic } from "./Magnetic";
import { Star, Spark } from "./ui/Doodles";
import { burst } from "@/lib/confetti";
import { ContactForm } from "./ContactForm";

// Four distinct colors, none matching the blue section background.
const cardColors = [
  "bg-pop-red",
  "bg-pop-green",
  "bg-pop-purple",
  "bg-pop-orange",
];

export function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-electric py-24 text-white sm:py-32"
    >
      <Star className="absolute right-[12%] top-16 hidden h-12 w-12 animate-spin-slow text-gold sm:block" />
      <Spark className="absolute bottom-24 left-[8%] hidden h-8 w-8 text-pop-pink lg:block" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          variants={staggerContainer(0.1)}
          {...inViewProps}
          className="max-w-4xl"
        >
          <motion.span
            variants={riseIn}
            className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-gold px-4 py-1.5 label-mono text-ink shadow-[3px_3px_0_0_#15121c]"
          >
            <Star className="h-3 w-3" /> Let&apos;s talk
          </motion.span>
          <motion.h2
            variants={riseInLg}
            className="ts-hard mt-6 font-display text-[clamp(3rem,1.4rem+7vw,7.5rem)] leading-[0.88] tracking-tightest"
          >
            {contact.headline}
          </motion.h2>
          <motion.p
            variants={riseIn}
            className="mt-6 max-w-2xl text-xl font-medium text-white/90 sm:text-2xl"
          >
            {contact.sub}
          </motion.p>
        </motion.div>

        <motion.div
          variants={riseIn}
          {...inViewProps}
          className="mt-12 max-w-2xl"
        >
          <ContactForm />
        </motion.div>

        <motion.p
          variants={riseIn}
          {...inViewProps}
          className="mt-16 mb-6 label-mono text-white/70"
        >
          Or reach me directly
        </motion.p>

        <motion.div
          variants={staggerContainer(0.1, 0.1)}
          {...inViewProps}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {contact.links.map((l, i) => (
            <motion.div key={l.label} variants={riseIn}>
              <Magnetic strength={0.25}>
                <a
                  href={l.href}
                  data-cursor="Open"
                  onClick={(e) => burst(e.clientX, e.clientY)}
                  className={`group flex h-full flex-col justify-between gap-10 rounded-3xl border-4 border-ink ${
                    cardColors[i % cardColors.length]
                  } p-6 text-white shadow-[6px_6px_0_0_#15121c] transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[10px_10px_0_0_#15121c]`}
                >
                  <div className="flex items-center justify-between">
                    <span className="ts-hard font-display text-2xl">{l.label}</span>
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink bg-paper text-ink transition-transform duration-200 group-hover:rotate-45"
                      aria-hidden="true"
                    >
                      ↗
                    </span>
                  </div>
                  <span className="text-sm font-medium text-white/80">
                    {l.handle}
                  </span>
                </a>
              </Magnetic>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          variants={riseIn}
          {...inViewProps}
          className="mt-16 font-display text-2xl sm:text-4xl"
        >
          {contact.closer}
        </motion.p>
      </div>
    </section>
  );
}
