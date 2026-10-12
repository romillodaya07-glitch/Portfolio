/**
 * Hand-drawn doodle accents (stars, arrows, underlines, squiggles).
 * Pure inline SVG so they inherit currentColor and stay crisp at any size.
 */

export function Star({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 2c.6 3.9 2.1 6 6 6.6-3.9.6-6 2.1-6.6 6-.6-3.9-2.1-6-6-6.6 3.9-.6 6-2.1 6.6-6Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Arrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M2 13c9 3 22 4 34-1-3 3-5 5-6 9m6-9c-3-2-5-4-6-8"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Underline({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 18"
      fill="none"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M3 12c40-8 96-11 194-6"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Squiggle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 16" fill="none" className={className} aria-hidden="true">
      <path
        d="M2 8c6-8 12 8 18 0s12-8 18 0 12 8 18 0 12-8 20 0"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Spark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 3v6M12 15v6M3 12h6M15 12h6"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
