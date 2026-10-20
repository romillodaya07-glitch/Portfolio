"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
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
      {children}

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
        </div>
      )}
    </>
  );
}
