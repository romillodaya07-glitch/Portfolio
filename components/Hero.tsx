"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { meta, heroLine } from "@/lib/content";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { Star, Spark, Squiggle, Arrow } from "./ui/Doodles";
import { CyclingTagline } from "./CyclingTagline";

const NAME = "ROMIL";
const SURNAME = "LODAYA";
const NAME_HOVER = ["#2f4bff", "#ff4b3e", "#1faa59", "#7b5cff", "#ff7a00"];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  // Cursor-reactive blobs: pointer offset from center, parallaxed per blob.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 60, damping: 20 });
  const py = useSpring(my, { stiffness: 60, damping: 20 });
  const b1x = useTransform(px, (v) => v * 40);
  const b1y = useTransform(py, (v) => v * 40);
  const b2x = useTransform(px, (v) => v * -55);
  const b2y = useTransform(py, (v) => v * -35);
  const b3x = useTransform(px, (v) => v * 30);
  const b3y = useTransform(py, (v) => v * -45);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  const letters = (word: string) => word.split("");

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden bg-transparent pt-28 sm:pt-32"
    >
      {/* Rainbow blobs — drift on their own and lean toward the cursor */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <motion.div
          style={{ x: b1x, y: b1y }}
          className="animate-blob-drift absolute -left-20 top-6 h-[34vw] w-[34vw] rounded-full bg-pop-blue/30 blur-3xl"
        />
        <motion.div
          style={{ x: b2x, y: b2y }}
          className="animate-blob-drift absolute right-[8%] top-1/4 h-[30vw] w-[30vw] rounded-full bg-pop-orange/30 blur-3xl [animation-delay:-5s]"
        />
        <motion.div
          style={{ x: b3x, y: b3y }}
          className="animate-blob-drift absolute bottom-6 left-1/3 h-[28vw] w-[28vw] rounded-full bg-pop-purple/25 blur-3xl [animation-delay:-9s]"
        />
        <motion.div
          style={{ x: b1x, y: b3y }}
          className="animate-blob-drift absolute bottom-[12%] right-1/4 h-[22vw] w-[22vw] rounded-full bg-pop-green/25 blur-3xl [animation-delay:-13s]"
        />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100svh-8rem)] max-w-7xl flex-col justify-start px-5 sm:px-8 lg:justify-center">
        <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-5 inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full border-2 border-ink bg-gold px-4 py-1.5 text-center label-mono text-ink shadow-[3px_3px_0_0_#15121c] sm:rotate-[-2deg]"
            >
              <span className="h-2 w-2 rounded-full bg-pop-red" />
              {meta.roles.join(" · ")}
            </motion.div>

            <h1 className="font-display leading-[0.82] tracking-tightest text-ink">
              <span className="sr-only">{meta.name}</span>
              <span
                aria-hidden="true"
                className="ts-pop block whitespace-nowrap text-[clamp(3rem,1rem+10.5vw,7.5rem)]"
              >
                {letters(NAME).map((c, i) => (
                  <span key={i} className="inline-block overflow-hidden align-bottom">
                    <motion.span
                      initial={{ y: "110%" }}
                      animate={{ y: "0%" }}
                      transition={{
                        duration: 0.9,
                        delay: 0.15 + i * 0.05,
                        ease: EASE_OUT_EXPO,
                      }}
                      whileHover={{
                        y: -14,
                        rotate: i % 2 ? 7 : -7,
                        color: NAME_HOVER[i % NAME_HOVER.length],
                        transition: { type: "spring", stiffness: 500, damping: 12 },
                      }}
                      className="inline-block cursor-default"
                    >
                      {c}
                    </motion.span>
                  </span>
                ))}
              </span>
              <span
                aria-hidden="true"
                className="ts-soft block whitespace-nowrap text-[clamp(3rem,1rem+10.5vw,7.5rem)] text-outline"
              >
                {letters(SURNAME).map((c, i) => (
                  <span key={i} className="inline-block overflow-hidden align-bottom">
                    <motion.span
                      initial={{ y: "110%" }}
                      animate={{ y: "0%" }}
                      transition={{
                        duration: 0.9,
                        delay: 0.4 + i * 0.05,
                        ease: EASE_OUT_EXPO,
                      }}
                      className="inline-block"
                    >
                      {c}
                    </motion.span>
                  </span>
                ))}
              </span>
            </h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="mt-6 w-full min-w-0 max-w-xl"
            >
              <CyclingTagline />
              <p className="mt-4 text-lg font-medium text-ink/70 sm:text-xl">
                &ldquo;{heroLine}&rdquo;
              </p>
            </motion.div>

            <Star className="absolute -top-4 right-10 hidden h-10 w-10 animate-spin-slow text-pop-purple sm:block" />
            <Spark className="absolute bottom-20 -left-3 hidden h-6 w-6 text-pop-red lg:block" />
          </div>

          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 4 }}
            animate={{ opacity: 1, scale: 1, rotate: 2 }}
            transition={{ duration: 1, delay: 0.3, ease: EASE_OUT_EXPO }}
            className="relative mx-auto w-full max-w-[20rem] sm:max-w-[22rem]"
          >
            <div className="relative aspect-[4/5] max-h-[58svh] overflow-hidden rounded-[2rem] border-4 border-ink bg-card shadow-[10px_10px_0_0_#2f4bff]">
              <motion.div style={{ y: imgY }} className="absolute inset-0 scale-110">
                <Image
                  src="/photos/hero-spotlight.jpeg"
                  alt="Romil Lodaya in a grey suit under a dramatic spotlight, smiling with hands in pockets"
                  fill
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 1024px) 90vw, 40vw"
                  className="object-cover object-top"
                />
              </motion.div>
            </div>
            <div className="absolute -bottom-4 -left-4 rotate-[-6deg] rounded-full border-2 border-ink bg-pop-green px-5 py-2 text-sm font-black uppercase tracking-wide text-ink shadow-[3px_3px_0_0_#15121c]">
              Builder · Creator · Dreamer
            </div>
            <Squiggle className="absolute -right-2 -top-6 hidden h-6 w-16 text-pop-orange lg:block" />
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to about"
        style={{ opacity: fade }}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 label-mono text-ink/60"
      >
        Scroll
        <Arrow className="h-4 w-9 rotate-90 text-pop-red" />
      </motion.a>
    </section>
  );
}
