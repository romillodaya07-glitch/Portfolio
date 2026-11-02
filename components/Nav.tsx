"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { navRoutes } from "@/lib/content";
import { Magnetic } from "./Magnetic";
import { burst } from "@/lib/confetti";
import { DiwaliCelebration } from "./DiwaliCelebration";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div
        className={`pointer-events-auto mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-500 sm:px-8 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <Link
          href="/"
          data-cursor="Home"
          className="group flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink bg-gold font-display text-lg text-ink shadow-[3px_3px_0_0_#15121c] transition-transform duration-200 hover:-rotate-6"
        >
          RL
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 rounded-full border-2 border-ink bg-card px-2 py-1.5 shadow-[4px_4px_0_0_#15121c] md:flex"
        >
          {navRoutes.map((r) => {
            const active = pathname === r.href;
            return (
              <Link
                key={r.href}
                href={r.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-4 py-1.5 text-sm font-bold transition-colors ${
                  active
                    ? "bg-electric text-white"
                    : "text-ink/70 hover:bg-ink hover:text-paper"
                }`}
              >
                {r.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {pathname === "/" && <DiwaliCelebration />}
          <Magnetic strength={0.5}>
            <Link
              href="/contact"
              data-cursor="Say hi"
              onClick={(e) => burst(e.clientX, e.clientY)}
              className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-electric px-5 py-2.5 text-sm font-black text-white shadow-[4px_4px_0_0_#15121c] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#15121c]"
            >
              Let&apos;s build
              <span aria-hidden="true">↗</span>
            </Link>
          </Magnetic>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          {pathname === "/" && <DiwaliCelebration />}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink bg-card shadow-[3px_3px_0_0_#15121c]"
          >
            <span className="relative block h-3 w-5">
              <span
                className={`absolute left-0 block h-0.5 w-5 bg-ink transition-all ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-3 block h-0.5 w-5 bg-ink transition-all ${
                  open ? "-rotate-45 !top-1.5" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-auto mx-4 overflow-hidden rounded-3xl border-2 border-ink bg-card p-3 shadow-[6px_6px_0_0_#15121c] md:hidden"
          >
            {navRoutes.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className={`block rounded-2xl px-4 py-3 text-lg font-bold transition-colors ${
                  pathname === r.href
                    ? "bg-electric text-white"
                    : "text-ink/80 hover:bg-ink hover:text-paper"
                }`}
              >
                {r.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-1 block rounded-2xl bg-electric px-4 py-3 text-lg font-black text-white"
            >
              Let&apos;s build ↗
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
