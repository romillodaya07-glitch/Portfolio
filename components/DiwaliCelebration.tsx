"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const snowflakes = Array.from({ length: 22 }, (_, index) => ({
  left: `${(index * 47 + 11) % 100}%`,
  delay: `-${(index * 1.73) % 20}s`,
  duration: `${17 + ((index * 7) % 12)}s`,
  size: `${8 + ((index * 5) % 8)}px`,
  opacity: 0.28 + ((index * 13) % 35) / 100,
}));

export function ChristmasToggle() {
  const [enabled, setEnabled] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const saved = window.localStorage.getItem("romil-christmas-theme") === "on";
    setEnabled(saved);
    if (saved) document.documentElement.dataset.theme = "christmas";
  }, []);

  const toggleTheme = () => {
    const next = !enabled;
    if (next) {
      document.documentElement.dataset.theme = "christmas";
      window.localStorage.setItem("romil-christmas-theme", "on");
    } else {
      delete document.documentElement.dataset.theme;
      window.localStorage.removeItem("romil-christmas-theme");
    }
    setEnabled(next);
  };

  return (
    <>
      <button
        type="button"
        onClick={toggleTheme}
        aria-pressed={enabled}
        aria-label={enabled ? "Turn off Christmas theme" : "Light Up Christmas"}
        className={`pointer-events-auto inline-flex min-h-10 items-center gap-2 whitespace-nowrap rounded-full border-2 border-ink px-3 py-2 text-xs font-black text-ink shadow-[3px_3px_0_0_#15121c] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_#15121c] sm:px-4 sm:text-sm ${enabled ? "bg-[#f5e5b7]" : "bg-card"}`}
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5 shrink-0">
          <path d="M12 3 5.3 11h3.1l-3.2 4h4l-2.1 3h10l-2.1-3h4l-3.2-4h3.1L12 3Z" fill="#286247" stroke="#193c2b" strokeWidth="1.25" strokeLinejoin="round" />
          <path d="M12 18v3" stroke="#80552d" strokeWidth="1.7" strokeLinecap="round" />
          <path d="m12 3 .55 1.25L14 4.8l-1.45.55L12 6.8l-.55-1.45L10 4.8l1.45-.55L12 3Z" fill="#D8A843" />
        </svg>
        <span>{enabled ? "Christmas is on" : "Light Up Christmas"}</span>
        {enabled && <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#9d2738]" />}
      </button>

      {enabled && (
        <div className="christmas-snow" aria-hidden="true">
          {snowflakes.map((flake, index) => (
            <span
              key={index}
              className="christmas-snowflake"
              style={{
                left: flake.left,
                top: reduceMotion ? `${(index * 29) % 90}vh` : undefined,
                animationDelay: reduceMotion ? "0s" : flake.delay,
                animationDuration: reduceMotion ? "0s" : flake.duration,
                fontSize: flake.size,
                opacity: flake.opacity,
              }}
            >
              ❄
            </span>
          ))}
        </div>
      )}
    </>
  );
}
