"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
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
              <Image
                src={moment.src}
                alt={moment.alt}
                fill
                loading="lazy"
                sizes="(max-width: 680px) 94vw, (max-width: 1024px) 46vw, 34vw"
                className={styles.photo}
              />
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
    </main>
  );
}
