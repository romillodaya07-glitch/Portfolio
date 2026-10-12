"use client";

import { taglines } from "@/lib/content";

const starColors = [
  "text-pop-yellow",
  "text-pop-green",
  "text-pop-red",
  "text-pop-pink",
  "text-white",
];

/** Bold scrolling ticker band of the brand lines. */
export function Ticker() {
  const items = [...taglines, ...taglines];
  return (
    <div className="relative overflow-hidden border-y-4 border-ink bg-pop-purple py-5 sm:py-6">
      <div className="marquee-mask flex overflow-hidden">
        <div
          className="flex shrink-0 items-center gap-8 pr-8 animate-marquee"
          style={{ ["--marquee-duration" as string]: "30s" }}
        >
          {items.map((t, i) => (
            <span key={`${t}-${i}`} className="flex items-center gap-8">
              <span className="whitespace-nowrap font-display text-2xl text-white sm:text-4xl">
                {t}
              </span>
              <span
                className={`text-xl ${starColors[i % starColors.length]}`}
                aria-hidden="true"
              >
                ✸
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
