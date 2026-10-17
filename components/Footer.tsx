"use client";

import { footer, meta, contact, taglines } from "@/lib/content";

export function Footer() {
  return (
    <footer className="bg-ink py-16 text-paper">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-6xl leading-none tracking-tightest text-paper sm:text-8xl">
              Romil<span className="text-pop-orange">.</span>
            </p>
            <p className="mt-4 label-mono text-paper/60">{footer.tagline}</p>
          </div>

          <nav aria-label="Social links" className="flex flex-wrap gap-3">
            {contact.links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="rounded-full border-2 border-paper/30 px-4 py-2 text-sm font-bold text-paper/70 transition-colors hover:border-pop-orange hover:bg-pop-orange hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-paper/15 pt-8 label-mono text-paper/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {footer.year} {meta.name} — {taglines[4]}
          </p>
          <p>{footer.builtBy}</p>
        </div>
      </div>
    </footer>
  );
}
