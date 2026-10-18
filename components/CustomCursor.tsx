"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

function isBlueSurfaceAtPoint(x: number, y: number) {
  let element = document.elementFromPoint(x, y);
  const layers: Array<{
    red: number;
    green: number;
    blue: number;
    alpha: number;
    opacity: number;
  }> = [];

  while (element) {
    if (element.matches("img, video, canvas, iframe")) return false;

    const style = window.getComputedStyle(element);
    const color = style.backgroundColor.match(/[\d.]+/g)?.map(Number);

    if (color && color.length >= 3) {
      layers.push({
        red: color[0] ?? 0,
        green: color[1] ?? 0,
        blue: color[2] ?? 0,
        alpha: color[3] ?? 1,
        opacity: Number(style.opacity),
      });
    }

    element = element.parentElement;
  }

  let ancestorOpacity = 1;
  for (let index = layers.length - 1; index >= 0; index -= 1) {
    layers[index].alpha *= layers[index].opacity * ancestorOpacity;
    ancestorOpacity *= layers[index].opacity;
  }

  let [red, green, blue] = [255, 255, 255];
  for (const layer of [...layers].reverse()) {
    red = layer.red * layer.alpha + red * (1 - layer.alpha);
    green = layer.green * layer.alpha + green * (1 - layer.alpha);
    blue = layer.blue * layer.alpha + blue * (1 - layer.alpha);
  }

  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const delta = max - min;
  let hue = 0;

  if (delta > 0) {
    if (max === red) hue = ((green - blue) / delta) % 6;
    else if (max === green) hue = (blue - red) / delta + 2;
    else hue = (red - green) / delta + 4;
    hue *= 60;
    if (hue < 0) hue += 360;
  }

  const saturation = max === 0 ? 0 : delta / max;
  return hue >= 195 && hue <= 255 && saturation >= 0.28;
}

/**
 * Blend-mode dot + trailing ring, desktop only.
 * Grows and labels itself when hovering interactive elements.
 * Never rendered for touch / coarse pointers or reduced-motion users.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState("");
  const [onBlue, setOnBlue] = useState(false);

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
      const overBlue = isBlueSurfaceAtPoint(e.clientX, e.clientY);
      setOnBlue((current) => (current === overBlue ? current : overBlue));
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
        className="fixed left-0 top-0 h-2 w-2 rounded-full"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ backgroundColor: onBlue ? "#ffffff" : "#2f4bff" }}
        transition={{ duration: 0.12 }}
      />
      <motion.div
        className={`fixed left-0 top-0 flex items-center justify-center rounded-full border ${
          onBlue ? "" : "mix-blend-difference"
        }`}
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering ? 64 : 34,
          height: hovering ? 64 : 34,
          backgroundColor: hovering
            ? "rgba(232,67,31,0.12)"
            : "rgba(232,67,31,0)",
          borderColor: onBlue
            ? "rgba(255,255,255,0.9)"
            : hovering
              ? "rgba(232,67,31,0.9)"
              : "rgba(24,21,16,0.3)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
      >
        {label && (
          <span
            className={`text-[10px] font-bold uppercase tracking-widest ${
              onBlue ? "text-white" : "text-electric"
            }`}
          >
            {label}
          </span>
        )}
      </motion.div>
    </div>
  );
}
