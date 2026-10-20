"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_OUT_EXPO } from "@/lib/motion";
import styles from "./PageTransition.module.css";

const COLORS = ["#3156ff", "#ff4b3e", "#1faa59", "#7b5cff", "#ff7a00"];

/** Keep the playful horizontal push effect exclusive to the About → Work route. */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const previousPath = useRef(pathname);
  const [showAboutWorkTransition, setShowAboutWorkTransition] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const cameFromAbout = previousPath.current === "/about";
    previousPath.current = pathname;

    if (cameFromAbout && pathname === "/work") {
      setShowAboutWorkTransition(true);
    } else {
      setShowAboutWorkTransition(false);
    }
  }, [pathname]);

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

      {showAboutWorkTransition && (
        <div className={styles.stage} aria-hidden="true">
          <motion.div
            className={styles.colorScreens}
            initial={reduceMotion ? { opacity: 0 } : { x: "-100%" }}
            animate={
              reduceMotion
                ? { opacity: [0, 1, 0] }
                : { x: ["-100%", "0%", "0%", "100%"] }
            }
            transition={
              reduceMotion
                ? { duration: 0.55, ease: "linear" }
                : { duration: 2.7, times: [0, 0.18, 0.82, 1], ease: [0.72, 0, 0.25, 1] }
            }
            onAnimationComplete={() => setShowAboutWorkTransition(false)}
          >
            {COLORS.map((color) => (
              <span key={color} style={{ backgroundColor: color }} />
            ))}
          </motion.div>

          {!reduceMotion && (
            <motion.p
              className={styles.routeLabel}
              initial={{ opacity: 0, y: 16, rotate: -4 }}
              animate={{ opacity: [0, 1, 1, 0], y: [16, 0, 0, -10], rotate: [-4, 0, 0, 3] }}
              transition={{ duration: 2.6, times: [0, 0.18, 0.78, 1], ease: EASE_OUT_EXPO }}
            >
              ABOUT <span>↗</span> WORK
            </motion.p>
          )}

          <motion.img
            className={styles.pusher}
            src="/photos/about-work-push-cutout.png"
            alt=""
            draggable={false}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -65, rotate: -3 }}
            animate={
              reduceMotion
                ? { opacity: [0, 1, 0] }
                : { opacity: [0, 1, 1, 0], x: [-65, 0, 0, 150], rotate: [-3, 0, -1, 4] }
            }
            transition={
              reduceMotion
                ? { duration: 0.55, ease: "linear" }
                : { duration: 2.65, times: [0, 0.18, 0.8, 1], ease: EASE_OUT_EXPO }
            }
          />
        </div>
      )}
    </>
  );
}
