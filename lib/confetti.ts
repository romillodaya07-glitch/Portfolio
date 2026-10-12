/**
 * Tiny dependency-free confetti using the Web Animations API.
 * `burst` explodes particles from a point; `rain` showers from the top.
 * Both no-op under prefers-reduced-motion.
 */

const COLORS = [
  "#2f4bff",
  "#ff4b3e",
  "#1faa59",
  "#7b5cff",
  "#ff7a00",
  "#ffcf33",
  "#ff5ca8",
];

let layer: HTMLElement | null = null;

function reduced(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function getLayer(): HTMLElement | null {
  if (typeof document === "undefined") return null;
  if (!layer || !document.body.contains(layer)) {
    layer = document.createElement("div");
    layer.setAttribute("aria-hidden", "true");
    layer.style.cssText =
      "position:fixed;inset:0;pointer-events:none;z-index:85;overflow:hidden";
    document.body.appendChild(layer);
  }
  return layer;
}

function piece(c: string): HTMLElement {
  const p = document.createElement("span");
  const size = 7 + Math.random() * 9;
  p.style.cssText = `position:absolute;width:${size}px;height:${size}px;background:${c};border-radius:${
    Math.random() < 0.45 ? "2px" : "50%"
  };will-change:transform,opacity`;
  return p;
}

/** Explode `count` particles outward (and up) from screen point (x, y). */
export function burst(x: number, y: number, count = 30): void {
  if (reduced()) return;
  const l = getLayer();
  if (!l) return;
  for (let i = 0; i < count; i++) {
    const p = piece(COLORS[i % COLORS.length]);
    p.style.left = `${x}px`;
    p.style.top = `${y}px`;
    l.appendChild(p);
    const angle = Math.random() * Math.PI * 2;
    const dist = 90 + Math.random() * 200;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist - (70 + Math.random() * 90);
    const rot = Math.random() * 720 - 360;
    const dur = 700 + Math.random() * 800;
    const anim = p.animate(
      [
        { transform: "translate(0,0) rotate(0deg) scale(1)", opacity: 1 },
        {
          transform: `translate(${dx}px, ${dy + 240}px) rotate(${rot}deg) scale(0.3)`,
          opacity: 0,
        },
      ],
      { duration: dur, easing: "cubic-bezier(0.16,1,0.3,1)", fill: "forwards" }
    );
    anim.onfinish = () => p.remove();
  }
}

/** Shower confetti from the top of the viewport for `duration` ms. */
export function rain(duration = 3200): void {
  if (reduced()) return;
  const l = getLayer();
  if (!l) return;
  const end = Date.now() + duration;
  const iv = window.setInterval(() => {
    for (let i = 0; i < 6; i++) {
      const p = piece(COLORS[Math.floor(Math.random() * COLORS.length)]);
      p.style.left = `${Math.random() * window.innerWidth}px`;
      p.style.top = "-24px";
      l.appendChild(p);
      const dur = 2400 + Math.random() * 1800;
      const drift = Math.random() * 180 - 90;
      const rot = Math.random() * 1080 - 540;
      const anim = p.animate(
        [
          { transform: "translate(0,0) rotate(0deg)", opacity: 1 },
          {
            transform: `translate(${drift}px, ${window.innerHeight + 80}px) rotate(${rot}deg)`,
            opacity: 1,
          },
        ],
        { duration: dur, easing: "linear", fill: "forwards" }
      );
      anim.onfinish = () => p.remove();
    }
    if (Date.now() > end) window.clearInterval(iv);
  }, 90);
}
