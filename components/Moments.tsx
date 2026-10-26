"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { moments, momentsIntro } from "@/lib/content";
import { ResumePanel } from "./ResumePanel";
import styles from "./Moments.module.css";

const momentOrder = [
  "moment-ogilvy.jpeg",
  "moment-esummit.jpeg",
  "moment-sammie-social-samosa.png",
  "moment-rotaract.jpeg",
  "moment-grass.jpeg",
  "moment-marina.jpeg",
];

const orderedMoments = momentOrder
  .map((filename) => moments.find((moment) => moment.src.endsWith(filename)))
  .filter((moment): moment is (typeof moments)[number] => Boolean(moment));

export function Moments() {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [selectedMoment, setSelectedMoment] = useState<(typeof orderedMoments)[number] | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!selectedMoment) return;

    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedMoment(null);
      if (event.key === "Tab") {
        event.preventDefault();
        closeButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previouslyFocusedRef.current?.focus();
    };
  }, [selectedMoment]);

  return (
    <main id="moments" className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.badge}><i aria-hidden="true">✦</i> Remarkable moments</span>
          <h1><span>People. Platforms.</span><span>Perspectives.</span></h1>
          <p>{momentsIntro}</p>
        </div>
        <aside className={styles.marginNote} aria-label="Same energy, different chapters">
          <span>Same energy.<br />Different chapters.</span>
          <svg viewBox="0 0 90 42" aria-hidden="true"><path d="M3 4c20 30 42 32 75 17m-18-8 20 8-15 14" /></svg>
        </aside>
        <span className={`${styles.heroDoodle} ${styles.heroDoodleOne}`} aria-hidden="true">✳</span>
        <span className={`${styles.heroDoodle} ${styles.heroDoodleTwo}`} aria-hidden="true">〰</span>
      </header>

      <div className={styles.gallery} aria-label="Photo memories">
        {orderedMoments.map((moment, index) => (
          <motion.figure
            key={moment.src}
            className={`${styles.momentCard} ${styles[`momentCard${index + 1}`]}`}
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.48, delay: index * 0.045 }}
          >
            <div className={styles.photoFrame}>
              <motion.button
                type="button"
                className={styles.photoButton}
                onClick={() => setSelectedMoment(moment)}
                whileTap={reduceMotion ? undefined : { scale: 0.985 }}
                aria-label={`View full image: ${moment.title}`}
              >
                <Image
                  src={moment.src}
                  alt={moment.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 680px) 94vw, (max-width: 1024px) 46vw, 34vw"
                  className={styles.photo}
                />
                <span className={styles.zoomHint} aria-hidden="true">View photo ↗</span>
              </motion.button>
              <span className={styles.tape} aria-hidden="true" />
              <figcaption className={styles.caption}>
                <h2>{moment.title}</h2>
                <p>{moment.caption}</p>
              </figcaption>
            </div>
          </motion.figure>
        ))}
      </div>

      <ResumePanel />

      {mounted &&
        createPortal(
          <AnimatePresence>
            {selectedMoment && (
              <motion.div
                className={styles.lightboxBackdrop}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.22 }}
                onClick={() => setSelectedMoment(null)}
              >
                <motion.section
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="moment-lightbox-title"
                  className={styles.lightbox}
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.94, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 10 }}
                  transition={{ type: "spring", stiffness: 260, damping: 25 }}
                  onClick={(event) => event.stopPropagation()}
                >
                  <button
                    ref={closeButtonRef}
                    type="button"
                    className={styles.lightboxClose}
                    onClick={() => setSelectedMoment(null)}
                    aria-label="Close full image"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                  <div className={styles.lightboxPhoto}>
                    <Image
                      src={selectedMoment.src}
                      alt={selectedMoment.alt}
                      fill
                      sizes="(max-width: 680px) 94vw, 90vw"
                      className={styles.lightboxImage}
                      priority
                    />
                  </div>
                  <div className={styles.lightboxCaption}>
                    <h2 id="moment-lightbox-title">{selectedMoment.title}</h2>
                    <p>{selectedMoment.caption}</p>
                    <span>Press Esc or click outside to close</span>
                  </div>
                </motion.section>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </main>
  );
}
