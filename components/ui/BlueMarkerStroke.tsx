"use client";

import { motion } from "framer-motion";

export function BlueMarkerStroke({ className = "" }: { className?: string }) {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      transition={{ duration: 0.75, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformOrigin: "left center" }}
      className={`pointer-events-none absolute select-none z-0 ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 640 78"
        fill="none"
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        {/* Chisel tip on the left, like a real marker start */}
        <path
          d="M 4 28
             C 3 22, 7 18, 14 18
             L 48 16
             C 42 28, 42 46, 50 60
             L 16 62
             C 7 62, 3 52, 4 40 Z"
          fill="#3b63ff"
        />
        {/* Main highlighter slash — slightly wavy, thicker through the letters */}
        <path
          d="M 28 16
             C 22 16, 14 20, 12 28
             L 18 62
             C 20 70, 30 74, 44 74
             L 590 70
             C 610 69, 628 62, 634 52
             C 640 42, 636 30, 624 22
             L 602 10
             C 594 6, 580 7, 562 8
             L 52 12
             C 40 12, 32 14, 28 16 Z"
          fill="#3b63ff"
        />
        {/* Soft darker edge so it reads as marker ink, not a flat bar */}
        <path
          d="M 40 58
             C 180 66, 400 64, 600 58
             C 610 57, 616 62, 606 66
             C 420 74, 180 74, 44 68
             C 32 66, 32 60, 40 58 Z"
          fill="#2a4de6"
          opacity="0.35"
        />
      </svg>
    </motion.div>
  );
}
