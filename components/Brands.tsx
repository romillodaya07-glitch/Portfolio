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

/** Logo + name marquee. Each logo sits in a white chip; missing logos just
 *  show the name. */
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
          className="flex shrink-0 items-center gap-8 pr-8 animate-marquee"
          style={{ ["--marquee-duration" as string]: "52s" }}
        >
          {doubled.map((b, i) => (
            <span key={`${b.name}-${i}`} className="flex items-center gap-8">
              <span className="flex items-center gap-3">
                {b.logo && (
                  <span className="flex h-12 items-center justify-center rounded-xl border-2 border-ink bg-white px-4 shadow-[3px_3px_0_0_#15121c]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={b.logo}
                      alt=""
                      aria-hidden="true"
                      className="h-7 w-auto max-w-[130px] object-contain"
                      onError={(e) => {
                        const chip = e.currentTarget.parentElement;
                        if (chip) chip.style.display = "none";
                      }}
                    />
                  </span>
                )}
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
