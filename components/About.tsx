"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { about, ethos } from "@/lib/content";
import { staggerContainer, riseIn, inViewProps } from "@/lib/motion";
import { SectionHeading } from "./ui/SectionHeading";
import { Star } from "./ui/Doodles";

const ethosColors = ["bg-pop-blue", "bg-pop-orange", "bg-pop-green"];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="about" className="relative bg-transparent py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Photo */}
          <div ref={ref} className="relative order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 40, rotate: -4 }}
              whileInView={{ opacity: 1, y: 0, rotate: -3 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.9 }}
              className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[1.75rem] border-4 border-ink bg-card shadow-[10px_10px_0_0_#ffcf33] lg:sticky lg:top-28"
            >
              <motion.div style={{ y: imgY }} className="absolute inset-0 scale-110">
                <Image
                  src="/photos/about-tree.jpeg"
                  alt={about.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 90vw, 32vw"
                  className="object-cover"
                />
              </motion.div>
            </motion.div>
            <Star className="absolute -right-2 -top-5 h-9 w-9 animate-spin-slow text-pop-red" />
          </div>

          {/* Copy */}
          <div className="order-1 lg:order-2">
            <SectionHeading kicker="About" badgeClass="bg-pop-blue text-white">
              Builder. Creator.
              <br />
              <span className="text-pop-orange">Dreamer.</span>
            </SectionHeading>

            <motion.div
              variants={staggerContainer(0.12, 0.1)}
              {...inViewProps}
              className="mt-10 space-y-6"
            >
              {about.body.map((p) => (
                <motion.p
                  key={p}
                  variants={riseIn}
                  className="max-w-2xl text-lg font-medium leading-relaxed text-ink/75 sm:text-xl"
                >
                  {p}
                </motion.p>
              ))}
              <motion.p
                variants={riseIn}
                className="label-mono pt-2 text-electric"
              >
                {about.signature}
              </motion.p>
            </motion.div>

            {/* Ethos cycle */}
            <motion.div
              variants={staggerContainer(0.1, 0.05)}
              {...inViewProps}
              className="mt-14 grid gap-4 sm:grid-cols-3"
            >
              {ethos.cycle.map((c, i) => (
                <motion.div
                  key={c.label}
                  variants={riseIn}
                  className={`${ethosColors[i]} rounded-2xl border-2 border-ink p-5 text-white shadow-[5px_5px_0_0_#15121c] transition-transform duration-200 hover:-translate-y-1`}
                >
                  <span className="font-display text-3xl">0{i + 1}</span>
                  <h3 className="ts-hard mt-2 font-display text-2xl">{c.label}</h3>
                  <p className="mt-1 text-sm font-medium text-white/85">
                    {c.line}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
