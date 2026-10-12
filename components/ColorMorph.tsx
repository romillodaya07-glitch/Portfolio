"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

/**
 * Fixed background wash whose tint shifts across scroll, so the whole page
 * reads as one evolving canvas. Sits behind all content (transparent sections
 * let it show through). Kept to very light tints for text legibility.
 */
export function ColorMorph() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 22,
    restDelta: 0.001,
  });
  const backgroundColor = useTransform(
    smooth,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    ["#faf4e6", "#ecf1ff", "#fff0e4", "#e9faf0", "#f2ecff", "#fff6e2"]
  );

  return (
    <motion.div
      aria-hidden="true"
      style={{ backgroundColor }}
      className="fixed inset-0 -z-10"
    />
  );
}
