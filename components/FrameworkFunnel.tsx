"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { framework } from "@/lib/content";
import { staggerContainer, riseIn, inViewProps } from "@/lib/motion";

/** Colors per tier — blue → gold → orange-red, top-lit for depth. */
const palette = [
  { lite: "#7aa0ff", base: "#2f5cff", dark: "#0b2ecc", glow: "#3a6bff", w: "100%" },
  { lite: "#ffd968", base: "#ffb703", dark: "#c77f00", glow: "#ffb703", w: "80%" },
  { lite: "#ff9a5c", base: "#ff5a1f", dark: "#c9330d", glow: "#ff5a1f", w: "62%" },
];

/** A single funnel tier that drops + fades in across a slice of scroll. */
function Tier({
  f,
  i,
  total,
  progress,
}: {
  f: (typeof framework)[number];
  i: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const p = palette[i];
  const start = i / (total + 0.5);
  const end = (i + 1) / (total + 0.5);
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [70, 0]);
  const scale = useTransform(progress, [start, end], [0.8, 1]);

  return (
    <motion.div
      className="fn-tier"
      style={
        {
          width: p.w,
          marginTop: i === 0 ? 0 : "-16px",
          opacity,
          y,
          scale,
          "--lite": p.lite,
          "--base": p.base,
          "--dark": p.dark,
          "--glow": p.glow,
        } as unknown as React.CSSProperties
      }
    >
      <div className="fn-wall" aria-hidden="true" />
      <div className="fn-rim" aria-hidden="true" />
      <div className="fn-label">
        <span className="text-[11px] font-black uppercase tracking-widest text-white/70">
          {f.step}
        </span>
        <span className="font-display text-2xl text-white sm:text-3xl">
          {f.title}
        </span>
      </div>
    </motion.div>
  );
}

/** Clarity → Execution → Growth as a stacked 3D funnel that fills on scroll. */
export function FrameworkFunnel() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.55"],
  });
  const baseOpacity = useTransform(scrollYProgress, [0.75, 1], [0, 1]);

  return (
    <div className="mt-14">
      <div ref={ref} className="mx-auto max-w-md">
        {framework.map((f, i) => (
          <Tier
            key={f.title}
            f={f}
            i={i}
            total={framework.length}
            progress={scrollYProgress}
          />
        ))}
        <motion.div
          className="fn-base mx-auto"
          style={{ width: "76%", opacity: baseOpacity }}
          aria-hidden="true"
        />
      </div>

      {/* Legend — keeps the descriptions accessible and on-page */}
      <motion.dl
        variants={staggerContainer(0.1, 0.1)}
        {...inViewProps}
        className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-3"
      >
        {framework.map((f, i) => (
          <motion.div key={f.title} variants={riseIn} className="text-center">
            <dt
              className="font-display text-lg"
              style={{ color: palette[i].base }}
            >
              {f.title}
            </dt>
            <dd className="mt-1 text-sm font-medium text-ink/65">{f.body}</dd>
          </motion.div>
        ))}
      </motion.dl>
    </div>
  );
}
