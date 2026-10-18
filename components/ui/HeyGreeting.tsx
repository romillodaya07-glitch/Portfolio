"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GREETINGS = ["Hi, I am", "Hey, I'm", "Hello, I'm", "Yo, I'm"];

export function HeyGreeting({
  defaultGreeting = "Hi, I am",
}: {
  defaultGreeting?: string;
}) {
  const start = Math.max(0, GREETINGS.indexOf(defaultGreeting));
  const [greetingIndex, setGreetingIndex] = useState(start);

  const cycleGreeting = () => {
    setGreetingIndex((prev) => (prev + 1) % GREETINGS.length);
  };

  return (
    <div className="relative inline-flex items-center gap-1 sm:gap-2 select-none mb-1 sm:mb-2 ml-1">
      <motion.svg
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 400 }}
        viewBox="0 0 34 34"
        fill="none"
        className="w-5 h-5 sm:w-7 sm:h-7 text-ink shrink-0 -translate-y-1"
        aria-hidden="true"
      >
        <motion.path
          d="M 5 21 L 18 16"
          stroke="currentColor"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <motion.path
          d="M 10 12 L 20 2"
          stroke="currentColor"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <motion.path
          d="M 23 13 L 28 3"
          stroke="currentColor"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
      </motion.svg>

      <motion.button
        type="button"
        onClick={cycleGreeting}
        title="Click to say hi!"
        initial={{ y: 8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        whileHover={{ scale: 1.06, rotate: -2 }}
        whileTap={{ scale: 0.94 }}
        transition={{ duration: 0.4, delay: 0.15, type: "spring" }}
        className="group relative cursor-pointer font-hand text-lg sm:text-xl md:text-2xl font-normal tracking-wide text-ink -rotate-[8deg] normal-case not-italic focus:outline-none"
      >
        <span className="relative z-10 flex items-center gap-1">
          <AnimatePresence mode="wait">
            <motion.span
              key={greetingIndex}
              initial={{ y: 6, opacity: 0, rotate: -3 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -6, opacity: 0, rotate: 3 }}
              transition={{ duration: 0.18 }}
              className="inline-block"
            >
              {GREETINGS[greetingIndex]}
            </motion.span>
          </AnimatePresence>
        </span>
      </motion.button>

      <motion.svg
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        whileHover={{ y: -3, scale: 1.08 }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        viewBox="0 0 52 42"
        fill="none"
        className="w-8 h-7 sm:w-11 sm:h-9 text-ink shrink-0 translate-y-1"
        aria-hidden="true"
      >
        <motion.path
          d="M 4 20 C 16 2, 38 2, 43 24 C 45 30, 44 34, 42 38"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <motion.path
          d="M 34 30 L 42 39 L 49 31"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>
    </div>
  );
}
