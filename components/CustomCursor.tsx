"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Blend-mode dot + trailing ring, desktop only.
 * Grows and labels itself when hovering interactive elements.
 * Never rendered for touch / coarse pointers or reduced-motion users.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState("");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 30, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 320, damping: 30, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    setEnabled(true);
    document.body.classList.add("custom-cursor");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const interactive = (e.target as HTMLElement)?.closest?.(
        "a, button, [data-cursor]"
      ) as HTMLElement | null;
      setHovering(!!interactive);
      setLabel(interactive?.dataset?.cursor ?? "");
    };

    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.body.classList.remove("custom-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[80]" aria-hidden="true">
      <motion.div
        className="fixed left-0 top-0 h-2 w-2 rounded-full bg-electric"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        className="fixed left-0 top-0 flex items-center justify-center rounded-full border border-ink/40 mix-blend-difference"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering ? 64 : 34,
          height: hovering ? 64 : 34,
          backgroundColor: hovering
            ? "rgba(232,67,31,0.12)"
            : "rgba(232,67,31,0)",
          borderColor: hovering ? "rgba(232,67,31,0.9)" : "rgba(24,21,16,0.3)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
      >
        {label && (
          <span className="text-[10px] font-bold uppercase tracking-widest text-electric">
            {label}
          </span>
        )}
      </motion.div>
    </div>
  );
}
