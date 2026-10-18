"use client";

import { motion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { HeyGreeting } from "./HeyGreeting";
import { BlueMarkerStroke } from "./BlueMarkerStroke";

const NAME = "ROMIL";
const SURNAME = "LODAYA";
const NAME_HOVER = ["#2f4bff", "#ff4b3e", "#1faa59", "#7b5cff", "#ff7a00"];

function letters(word: string) {
  return word.split("");
}

export function NameLockup({
  greeting = "Hi, I am",
  as: Heading = "h1",
}: {
  greeting?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className="mt-1">
      <div className="relative mb-1 pl-1 sm:mb-2">
        <HeyGreeting defaultGreeting={greeting} />
      </div>

      <Heading className="font-display leading-[0.8] tracking-tightest text-ink">
        <span className="relative block origin-bottom-left -rotate-[3deg] -skew-x-[5deg] whitespace-nowrap text-[clamp(3rem,10vw,9rem)]">
          <BlueMarkerStroke className="-left-[5%] -right-[8%] top-[56%] -translate-y-1/2 h-[48%] w-[113%] -rotate-[2deg]" />
          <span className="relative z-10">
            {letters(NAME).map((letter, index) => (
              <span key={index} className="inline-block overflow-hidden align-bottom">
                <motion.span
                  initial={{ y: "115%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.8, delay: 0.12 + index * 0.05, ease: EASE_OUT_EXPO }}
                  whileHover={{
                    y: -10,
                    rotate: index % 2 ? 5 : -5,
                    color: NAME_HOVER[index % NAME_HOVER.length],
                    transition: { type: "spring", stiffness: 500, damping: 12 },
                  }}
                  className={`inline-block cursor-pointer select-none transition-colors duration-200 ${index === 0 ? "text-pop-red" : "text-ink"}`}
                >
                  {letter}
                </motion.span>
              </span>
            ))}
          </span>
        </span>

        <span className="text-sticker-white -mt-1 block -rotate-[1deg] whitespace-nowrap text-[clamp(3rem,10vw,9rem)] sm:-mt-2">
          {letters(SURNAME).map((letter, index) => (
            <span key={index} className="inline-block overflow-hidden align-bottom">
              <motion.span
                initial={{ y: "115%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.05, ease: EASE_OUT_EXPO }}
                whileHover={{
                  y: -8,
                  rotate: index % 2 ? -4 : 4,
                  transition: { type: "spring", stiffness: 500, damping: 12 },
                }}
                className="inline-block cursor-pointer select-none"
              >
                {letter}
              </motion.span>
            </span>
          ))}
        </span>
      </Heading>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6, ease: EASE_OUT_EXPO }}
        className="mt-3 inline-flex max-w-full -rotate-[1deg] items-center rounded-full border-[2.5px] border-ink bg-[#ffcc22] px-3 py-1.5 text-ink shadow-[3px_3px_0_0_#15121c] sm:mt-4 sm:px-5 sm:py-2"
      >
        <span className="whitespace-nowrap font-display text-[8px] tracking-[0.1em] sm:text-[10px] sm:tracking-[0.16em] md:text-xs">
          BRAND STRATEGIST &nbsp;•&nbsp; MARKETER &nbsp;•&nbsp; BUILDER
        </span>
      </motion.div>
    </div>
  );
}
