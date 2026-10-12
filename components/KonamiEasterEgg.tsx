"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { rain } from "@/lib/confetti";

const SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

/** Secret Konami code → confetti rain + a celebratory toast. */
export function KonamiEasterEgg() {
  const [toast, setToast] = useState(false);

  useEffect(() => {
    let idx = 0;
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === SEQUENCE[idx]) {
        idx += 1;
        if (idx === SEQUENCE.length) {
          idx = 0;
          rain(3400);
          setToast(true);
          window.setTimeout(() => setToast(false), 3200);
        }
      } else {
        idx = key === SEQUENCE[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="fixed bottom-6 left-1/2 z-[86] -translate-x-1/2 rounded-full border-2 border-ink bg-gold px-6 py-3 font-display text-lg text-ink shadow-[4px_4px_0_0_#15121c]"
          role="status"
        >
          🎉 Same energy, always!
        </motion.div>
      )}
    </AnimatePresence>
  );
}
