"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const flakes = Array.from({ length: 72 }, (_, index) => ({
  left: `${(index * 37.7) % 100}%`,
  delay: `${-((index * 1.73) % 18)}s`,
  duration: `${12 + ((index * 13) % 13)}s`,
  size: `${4 + ((index * 7) % 9)}px`,
  drift: `${((index * 31) % 90) - 45}px`,
  opacity: 0.55 + ((index * 17) % 42) / 100,
}));

const gifts = [
  { left: "17%", delay: "1.5s", duration: "13s", size: 23 },
  { left: "72%", delay: "6s", duration: "16s", size: 29 },
  { left: "91%", delay: "10s", duration: "14s", size: 20 },
];

function playJingle() {
  const AudioContextClass = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return;
  const context = new AudioContextClass();
  const notes = [659.25, 783.99, 987.77, 783.99, 880, 1046.5];
  notes.forEach((frequency, index) => {
    const start = context.currentTime + index * 0.16;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.11, start + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.42);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(start);
    oscillator.stop(start + 0.44);
  });
  window.setTimeout(() => void context.close(), 1500);
}

export function ChristmasMode() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const intervalRef = useRef<number | null>(null);

  const toggle = useCallback(() => {
    setActive((currentlyActive) => {
      const nextActive = !currentlyActive;
      if (nextActive) {
        setSoundOn(true);
        playJingle();
      } else if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return nextActive;
    });
  }, []);

  useEffect(() => {
    if (active && soundOn) {
      intervalRef.current = window.setInterval(playJingle, 18000);
    }
    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [active, soundOn]);

  return (
    <>
      <div className="christmas-controls pointer-events-auto inline-flex items-center gap-1.5">
        <button
          type="button"
          onClick={toggle}
          aria-pressed={active}
          aria-label={active ? "Turn Christmas mode off" : "Turn Christmas mode on"}
          className={`inline-flex min-h-10 items-center gap-1.5 whitespace-nowrap rounded-full border-2 border-ink px-3 py-2 text-xs font-black text-ink shadow-[3px_3px_0_0_#15121c] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_#15121c] sm:px-4 sm:text-sm ${active ? "bg-[#fff0b0]" : "bg-card"}`}
        >
          <span aria-hidden="true" className="text-base leading-none sm:text-lg">{active ? "🎄" : "🎅"}</span>
          <span>{active ? "Ho Ho! On" : "Ho Ho!"}</span>
        </button>
        {active && (
          <button
            type="button"
            onClick={() => setSoundOn((on) => !on)}
            aria-label={soundOn ? "Mute Christmas bells" : "Turn Christmas bells on"}
            aria-pressed={soundOn}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink bg-card text-base shadow-[3px_3px_0_0_#15121c] transition-transform hover:-translate-y-0.5"
          >
            <span aria-hidden="true">{soundOn ? "🔔" : "🔕"}</span>
          </button>
        )}
      </div>
      <span className="sr-only" role="status" aria-live="polite">
        {active ? `Christmas mode on. Snow is falling. Bells ${soundOn ? "on" : "muted"}.` : "Christmas mode off."}
      </span>

      {active && (
        <div className="christmas-overlay" aria-hidden="true">
          {!reduceMotion && flakes.map((flake, index) => (
            <span key={`snow-${index}`} className="christmas-snowflake" style={{
              left: flake.left, animationDelay: flake.delay, animationDuration: flake.duration,
              width: flake.size, height: flake.size, opacity: flake.opacity,
              "--snow-drift": flake.drift,
            } as React.CSSProperties} />
          ))}
          {!reduceMotion && gifts.map((gift, index) => (
            <span key={`gift-${index}`} className="christmas-gift" style={{
              left: gift.left, animationDelay: gift.delay, animationDuration: gift.duration,
              width: gift.size, height: gift.size,
            }}><i /><b /></span>
          ))}
        </div>
      )}
    </>
  );
}
