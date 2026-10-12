"use client";

import { motion } from "framer-motion";
import { brands } from "@/lib/content";
import { riseIn, inViewProps } from "@/lib/motion";

const starColors = [
  "text-pop-yellow",
  "text-pop-red",
  "text-pop-green",
  "text-pop-pink",
  "text-pop-orange",
];

/** Logo + name marquee. Missing logo files hide gracefully (name still shows). */
export function Brands() {
  const doubled = [...brands, ...brands];
  return (
    <section className="relative overflow-hidden border-y-4 border-ink bg-electric py-14">
      <motion.p
        variants={riseIn}
        {...inViewProps}
        className="mb-8 px-5 text-center label-mono text-white/80 sm:px-8"
      >
        Brands &amp; teams I&apos;ve worked with
      </motion.p>

      <div className="marquee-mask flex overflow-hidden">
        <div
          className="flex shrink-0 items-center gap-10 pr-10 animate-marquee"
          style={{ ["--marquee-duration" as string]: "46s" }}
        >
          {doubled.map((b, i) => (
            <span key={`${b.name}-${i}`} className="flex items-center gap-10">
              <span className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={b.logo}
                  alt=""
                  aria-hidden="true"
                  className="h-9 w-auto max-w-[120px] shrink-0 object-contain sm:h-10"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <span className="whitespace-nowrap font-display text-2xl tracking-tight text-white sm:text-3xl">
                  {b.name}
                </span>
              </span>
              <span
                className={`shrink-0 text-xl ${starColors[i % starColors.length]}`}
                aria-hidden="true"
              >
                ★
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
