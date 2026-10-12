"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Star, Spark, Squiggle, Arrow } from "./ui/Doodles";

type Sticker = {
  node: React.ReactNode;
  cls: string;
  x: string;
  y: string;
  rotate: number;
};

const STICKERS: Sticker[] = [
  { node: <Star className="h-full w-full" />, cls: "text-pop-blue", x: "8%", y: "18%", rotate: -12 },
  { node: <Spark className="h-full w-full" />, cls: "text-pop-red", x: "26%", y: "60%", rotate: 8 },
  { node: <Squiggle className="h-full w-full" />, cls: "text-pop-green", x: "46%", y: "28%", rotate: -4 },
  { node: <Arrow className="h-full w-full" />, cls: "text-pop-purple", x: "64%", y: "62%", rotate: 14 },
  { node: <Star className="h-full w-full" />, cls: "text-pop-orange", x: "80%", y: "22%", rotate: 20 },
  { node: <Spark className="h-full w-full" />, cls: "text-pop-pink", x: "88%", y: "58%", rotate: -16 },
];

/** A bordered play area of grab-and-fling doodle stickers with bounce. */
export function StickerPlayground() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section className="bg-transparent px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div
          ref={ref}
          className="relative h-[360px] overflow-hidden rounded-3xl border-4 border-ink bg-card shadow-[8px_8px_0_0_#15121c] sm:h-[320px]"
        >
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="label-mono text-ink/40">Go on —</span>
            <span className="font-display text-4xl text-ink/15 sm:text-6xl">
              GRAB &amp; FLING
            </span>
          </div>

          {STICKERS.map((s, i) => (
            <motion.button
              key={i}
              type="button"
              aria-label="Draggable sticker"
              drag
              dragConstraints={ref}
              dragElastic={0.5}
              dragTransition={{ bounceStiffness: 400, bounceDamping: 12 }}
              whileDrag={{ scale: 1.25, cursor: "grabbing" }}
              whileHover={{ scale: 1.15, rotate: s.rotate + 10 }}
              initial={{ rotate: s.rotate }}
              style={{ left: s.x, top: s.y }}
              className={`absolute flex h-14 w-14 cursor-grab touch-none items-center justify-center rounded-2xl border-2 border-ink bg-paper p-2.5 shadow-[3px_3px_0_0_#15121c] ${s.cls}`}
            >
              {s.node}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
