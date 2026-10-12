"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { maskUp, staggerContainer, riseIn, inViewProps } from "@/lib/motion";
import { Star } from "./Doodles";

/**
 * Playful section header: a chunky pill badge, then a heavy display headline.
 */
export function SectionHeading({
  kicker,
  children,
  align = "left",
  className = "",
  badgeClass = "bg-ink text-paper",
}: {
  kicker: string;
  children: ReactNode;
  align?: "left" | "center";
  className?: string;
  badgeClass?: string;
}) {
  return (
    <motion.div
      variants={staggerContainer(0.12)}
      {...inViewProps}
      className={`${align === "center" ? "text-center" : ""} ${className}`}
    >
      <motion.div
        variants={riseIn}
        className={`mb-5 flex ${align === "center" ? "justify-center" : ""}`}
      >
        <span
          className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 label-mono ${badgeClass}`}
        >
          <Star className="h-3 w-3" />
          {kicker}
        </span>
      </motion.div>
      <h2 className="ts-pop font-display text-[clamp(2.75rem,1.3rem+6vw,6.5rem)] leading-[0.88] tracking-tightest text-ink">
        <span className="block overflow-hidden pb-[0.08em]">
          <motion.span variants={maskUp} className="block">
            {children}
          </motion.span>
        </span>
      </h2>
    </motion.div>
  );
}
