"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_OUT_EXPO } from "@/lib/motion";

const BARS = ["#2f4bff", "#ff4b3e", "#1faa59", "#7b5cff", "#ff7a00"];

/**
 * Route changes play a staggered rainbow "wipe" that retracts upward to reveal
 * the new page, while the page content fades + lifts in behind it.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  // Skip the wipe on the very first paint (the IntroLoader owns the intro);
  // only wipe on subsequent route changes.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE_OUT_EXPO }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        <motion.div
          key={`${pathname}-wipe`}
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[70] flex"
        >
          {BARS.map((c, i) => (
            <motion.span
              key={i}
              className="h-full flex-1"
              style={{ background: c, transformOrigin: "top" }}
              initial={{ scaleY: mounted ? 1 : 0 }}
              animate={{ scaleY: 0 }}
              transition={{
                duration: 0.55,
                delay: i * 0.07,
                ease: EASE_OUT_EXPO,
              }}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
