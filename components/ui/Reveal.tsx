"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { riseIn, inViewProps } from "@/lib/motion";

/** Single scroll-reveal element. */
export function Reveal({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "span";
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag variants={riseIn} {...inViewProps} className={className}>
      {children}
    </MotionTag>
  );
}
