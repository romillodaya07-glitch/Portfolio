"use client";

import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const fireworks = [
  { left: "8%", top: "19%", color: "#ff4b3e", delay: 0.35 },
  { left: "19%", top: "72%", color: "#3859ff", delay: 0.9 },
  { left: "78%", top: "18%", color: "#ffca38", delay: 0.6 },
  { left: "91%", top: "66%", color: "#f03388", delay: 1.05 },
  { left: "53%", top: "11%", color: "#1faa79", delay: 1.35 },
  { left: "30%", top: "28%", color: "#ff9f1c", delay: 0.75 },
  { left: "69%", top: "43%", color: "#f03388", delay: 1.45 },
  { left: "39%", top: "82%", color: "#3859ff", delay: 1.7 },
  { left: "6%", top: "52%", color: "#1faa79", delay: 1.15 },
  { left: "94%", top: "32%", color: "#ff4b3e", delay: 1.9 },
];

const confetti = [
  { left: "5%", color: "#ff4b3e", delay: 0.25, drift: 22, rotate: 260 },
  { left: "12%", color: "#ffd43d", delay: 0.7, drift: -18, rotate: 360 },
  { left: "23%", color: "#3859ff", delay: 0.45, drift: 26, rotate: 310 },
  { left: "31%", color: "#f03388", delay: 1.1, drift: -24, rotate: 400 },
  { left: "42%", color: "#1faa79", delay: 0.55, drift: 17, rotate: 290 },
  { left: "50%", color: "#ff9f1c", delay: 0.9, drift: -28, rotate: 370 },
  { left: "61%", color: "#ffd43d", delay: 0.35, drift: 21, rotate: 330 },
  { left: "72%", color: "#3859ff", delay: 1.2, drift: -16, rotate: 420 },
  { left: "83%", color: "#ff4b3e", delay: 0.65, drift: 24, rotate: 300 },
  { left: "94%", color: "#f03388", delay: 0.4, drift: -20, rotate: 390 },
  { left: "16%", color: "#1faa79", delay: 1.3, drift: 19, rotate: 340 },
  { left: "37%", color: "#ff9f1c", delay: 0.8, drift: -22, rotate: 280 },
  { left: "67%", color: "#ff4b3e", delay: 0.5, drift: 18, rotate: 440 },
  { left: "88%", color: "#ffd43d", delay: 1, drift: -25, rotate: 320 },
  { left: "2%", color: "#ff9f1c", delay: 1.45, drift: 28, rotate: 390 },
  { left: "9%", color: "#3859ff", delay: 1.7, drift: -23, rotate: 330 },
  { left: "20%", color: "#ffd43d", delay: 1.55, drift: 16, rotate: 410 },
  { left: "28%", color: "#1faa79", delay: 1.9, drift: -26, rotate: 350 },
  { left: "34%", color: "#ff4b3e", delay: 1.35, drift: 20, rotate: 300 },
  { left: "46%", color: "#f03388", delay: 1.65, drift: -19, rotate: 430 },
  { left: "55%", color: "#3859ff", delay: 1.8, drift: 25, rotate: 370 },
  { left: "64%", color: "#1faa79", delay: 1.5, drift: -22, rotate: 310 },
  { left: "75%", color: "#ff9f1c", delay: 1.95, drift: 19, rotate: 420 },
  { left: "81%", color: "#ffd43d", delay: 1.4, drift: -27, rotate: 340 },
  { left: "97%", color: "#f03388", delay: 1.75, drift: -16, rotate: 400 },
  { left: "14%", color: "#ff4b3e", delay: 2.1, drift: 22, rotate: 360 },
  { left: "58%", color: "#ffca38", delay: 2.25, drift: -20, rotate: 390 },
];

const sparkles = [
  { x: -38, y: -23, delay: 0 },
  { x: 34, y: -31, delay: 0.12 },
  { x: 48, y: 14, delay: 0.2 },
  { x: -27, y: 34, delay: 0.08 },
  { x: 2, y: -48, delay: 0.24 },
  { x: -48, y: 4, delay: 0.16 },
  { x: 42, y: 36, delay: 0.28 },
  { x: -14, y: -39, delay: 0.32 },
  { x: 15, y: 46, delay: 0.4 },
  { x: -42, y: -42, delay: 0.36 },
];

export function DiwaliCelebration() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(false);
  const [hasLitDiya, setHasLitDiya] = useState(false);
  const [run, setRun] = useState(0);
  const [origin, setOrigin] = useState({ x: 0.5, y: 0.12 });
  const timerRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    },
    []
  );

  const lightDiya = (event: MouseEvent<HTMLButtonElement>) => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);

    const x = event.detail === 0 ? window.innerWidth / 2 : event.clientX;
    const y = event.detail === 0 ? 80 : event.clientY;
    setOrigin({
      x: Math.min(0.96, Math.max(0.04, x / window.innerWidth)),
      y: Math.min(0.9, Math.max(0.04, y / window.innerHeight)),
    });
    setRun((current) => current + 1);
    setActive(true);
    setHasLitDiya(true);
    timerRef.current = window.setTimeout(() => {
      setActive(false);
      timerRef.current = null;
    }, 5200);
  };

  return (
    <>
      <button
        type="button"
        onClick={lightDiya}
        aria-label="Light a Diya"
        className={`pointer-events-auto inline-flex min-h-10 items-center gap-1.5 whitespace-nowrap rounded-full border-2 border-ink px-3 py-2 text-xs font-black text-ink shadow-[3px_3px_0_0_#15121c] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_#15121c] sm:px-4 sm:text-sm ${
          hasLitDiya ? "bg-[#fff0b0]" : "bg-card"
        }`}
      >
        <motion.span
          aria-hidden="true"
          animate={
            active && !reduceMotion
              ? { scale: [1, 1.32, 0.96, 1.18], rotate: [0, -8, 5, 0] }
              : { scale: 1, rotate: 0 }
          }
          transition={{ duration: 0.8, repeat: active && !reduceMotion ? Infinity : 0 }}
          style={{ filter: hasLitDiya ? "drop-shadow(0 0 7px #ffb000)" : undefined }}
          className="text-base leading-none sm:text-lg"
        >
          🪔
        </motion.span>
        <span>Light a Diya</span>
        {hasLitDiya && (
          <span
            aria-hidden="true"
            className="ml-0.5 h-1.5 w-1.5 rounded-full bg-[#ffb000] shadow-[0_0_8px_3px_rgba(255,176,0,0.55)]"
          />
        )}
      </button>

      <span className="sr-only" role="status" aria-live="polite">
        {active ? "A little light goes a long way. Happy Diwali!" : ""}
      </span>

      <AnimatePresence>
        {active && (
          <motion.div
            key={run}
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[60] overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: reduceMotion ? 0 : 0.45 } }}
          >
            <motion.div
              className="absolute rounded-full"
              style={{
                left: `${origin.x * 100}%`,
                top: `${origin.y * 100}%`,
              marginLeft: "-34vmax",
              marginTop: "-34vmax",
                width: "68vmax",
                height: "68vmax",
                background:
                  "radial-gradient(circle, rgba(255,211,91,0.42) 0%, rgba(255,181,55,0.19) 28%, rgba(255,181,55,0) 70%)",
              }}
              initial={{ scale: 0.12, opacity: 0.9 }}
              animate={reduceMotion ? { scale: 0.8, opacity: 0.45 } : { scale: [0.12, 2.2], opacity: [0.9, 0] }}
              transition={{ duration: reduceMotion ? 0 : 1.55, ease: [0.16, 1, 0.3, 1] }}
            />

            {!reduceMotion && (
              <>
                {sparkles.map((sparkle, index) => (
                  <motion.span
                    key={`sparkle-${run}-${index}`}
                    className="absolute text-xl text-[#ffd43d] drop-shadow-[0_0_8px_rgba(255,212,61,0.9)]"
                    style={{ left: `${origin.x * 100}%`, top: `${origin.y * 100}%` }}
                    initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                    animate={{ x: sparkle.x, y: sparkle.y, scale: [0, 1.1, 0.7], opacity: [0, 1, 0] }}
                    transition={{ duration: 1.05, delay: sparkle.delay, ease: "easeOut" }}
                  >
                    ✦
                  </motion.span>
                ))}

                {fireworks.map((firework, index) => (
                  <motion.div
                    key={`firework-${run}-${index}`}
                    className="absolute h-14 w-14"
                    style={{ left: firework.left, top: firework.top, color: firework.color }}
                    initial={{ scale: 0.15, opacity: 0, rotate: -18 }}
                    animate={{
                      scale: [0.15, 1.12, 0.92, 0.15],
                      opacity: [0, 1, 1, 0],
                      rotate: [-18, 8, 28],
                      x: [0, index % 2 === 0 ? 7 : -7, 0],
                    }}
                    transition={{ duration: 1.8, delay: firework.delay, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {Array.from({ length: 12 }, (_, ray) => (
                      <motion.span
                        key={ray}
                        className="absolute left-1/2 top-1/2 h-3 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full"
                        style={{
                          backgroundColor: firework.color,
                          boxShadow: `0 0 9px ${firework.color}`,
                          transform: `translate(-50%, -50%) rotate(${ray * 30}deg) translateY(-20px)`,
                        }}
                      />
                    ))}
                    <span className="absolute inset-0 grid place-items-center text-2xl drop-shadow-[0_0_10px_currentColor]">
                      ✦
                    </span>
                  </motion.div>
                ))}

                {confetti.map((piece, index) => (
                  <motion.span
                    key={`confetti-${run}-${index}`}
                    className="absolute top-0 h-3 w-2 rounded-sm"
                    style={{ left: piece.left, backgroundColor: piece.color }}
                    initial={{ y: "-8vh", x: 0, rotate: 0, opacity: 0 }}
                    animate={{ y: "108vh", x: piece.drift, rotate: piece.rotate, opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 3.9, delay: piece.delay, ease: "easeIn" }}
                  />
                ))}
              </>
            )}

            <div className="pointer-events-none absolute inset-0 z-10 grid place-items-center px-4">
              <motion.div
                id="diwali-greeting"
                className="w-[min(90vw,34rem)] rounded-3xl border-2 border-ink bg-card/95 px-5 py-4 text-center text-ink shadow-[5px_5px_0_0_#15121c] backdrop-blur-sm sm:px-7 sm:py-5"
                initial={reduceMotion ? false : { y: 16, scale: 0.94, opacity: 0 }}
                animate={{ y: 0, scale: 1, opacity: 1 }}
                transition={{ duration: reduceMotion ? 0 : 0.55, delay: reduceMotion ? 0 : 0.22, type: "spring", stiffness: 220, damping: 20 }}
              >
                <span className="mb-1 block text-xl" aria-hidden="true">✨ 🪔 ✨</span>
                <span className="block font-display text-lg font-black leading-tight sm:text-2xl">
                  A little light goes a long way.
                </span>
                <span className="mt-1 block text-sm font-bold text-ink/70 sm:text-base">
                  Happy Diwali!
                </span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
