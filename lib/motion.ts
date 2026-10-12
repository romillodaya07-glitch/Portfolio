import type { Variants } from "framer-motion";

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/** Container that staggers its children into view. */
export const staggerContainer = (stagger = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

/** Rise + fade for a single child. */
export const riseIn: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
};

/** Larger rise for headline blocks. */
export const riseInLg: Variants = {
  hidden: { opacity: 0, y: 48 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE_OUT_EXPO },
  },
};

/** Word / letter mask reveal (paired with an overflow-hidden wrapper). */
export const maskUp: Variants = {
  hidden: { y: "110%" },
  show: {
    y: "0%",
    transition: { duration: 0.8, ease: EASE_OUT_EXPO },
  },
};

/** Scale-in for cards — springy pop for a playful feel. */
export const popIn: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.94 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 18, mass: 0.7 },
  },
};

/** Shared whileInView props for sections. */
export const inViewProps = {
  initial: "hidden",
  whileInView: "show",
  viewport: { once: true, margin: "-12% 0px -12% 0px" },
} as const;
