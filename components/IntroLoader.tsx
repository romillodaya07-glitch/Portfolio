"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/motion";

const NAME = "ROMIL".split("");
const BARS = ["#2f4bff", "#ff4b3e", "#1faa59", "#7b5cff", "#ff7a00"];
const KEY = "rl-intro-seen";

/** First-load branded loader: ROMIL assembles, then rainbow bars wipe away. */
export function IntroLoader() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {
      seen = false;
    }
    if (seen || reduced) return;

    setShow(true);
    document.documentElement.style.overflow = "hidden";
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }
    const t = setTimeout(() => {
      setShow(false);
      document.documentElement.style.overflow = "";
    }, 2000);
    return () => {
      clearTimeout(t);
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[95] flex"
          aria-hidden="true"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {BARS.map((c, i) => (
            <motion.span
              key={i}
              className="h-full flex-1"
              style={{ background: c, transformOrigin: "top" }}
              initial={{ scaleY: 1 }}
              animate={{ scaleY: 0 }}
              transition={{
                duration: 0.55,
                delay: 1.2 + i * 0.07,
                ease: EASE_OUT_EXPO,
              }}
            />
          ))}

          <motion.div
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.35, delay: 1.15 }}
          >
            <span className="font-display text-[clamp(3rem,10vw,8rem)] text-paper">
              {NAME.map((c, i) => (
                <span key={i} className="inline-block overflow-hidden align-bottom">
                  <motion.span
                    className="inline-block"
                    initial={{ y: "120%" }}
                    animate={{ y: "0%" }}
                    transition={{
                      duration: 0.5,
                      delay: 0.1 + i * 0.09,
                      ease: EASE_OUT_EXPO,
                    }}
                  >
                    {c}
                  </motion.span>
                </span>
              ))}
              <span className="text-gold">.</span>
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
