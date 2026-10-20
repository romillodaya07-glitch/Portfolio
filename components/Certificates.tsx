"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./Certificates.module.css";

export const CERTIFICATES_DRIVE_URL =
  "https://drive.google.com/drive/folders/1_WDuBfff9ngww1PtiwAxMESJi5UyhAIO?usp=sharing";

const categories = [
  { icon: "📣", label: "Marketing", tone: "pink", description: "Marketing courses and learning." },
  { icon: "▥", label: "Strategy", tone: "yellow", description: "Strategy and planning courses." },
  { icon: "✎", label: "Design & Content", tone: "purple", description: "Design and content learning." },
  { icon: "♧", label: "Leadership", tone: "mint", description: "Leadership and people-focused learning." },
  { icon: "▣", label: "Tech & Tools", tone: "blue", description: "Technology and tools learning." },
  { icon: "✿", label: "Personal Growth", tone: "pink", description: "Personal growth and development." },
] as const;

function MedalIcon() {
  return (
    <svg className={styles.medalIcon} viewBox="0 0 64 72" aria-hidden="true">
      <path d="m18 42-8 26 18-9 7 10 8-27" fill="#ff4b86" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <path d="m37 42 8 26 7-9 9 7-6-29" fill="#ff4b86" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <circle cx="33" cy="26" r="21" fill="#ffd527" stroke="currentColor" strokeWidth="4" />
      <circle cx="33" cy="26" r="13" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <path d="m33 16 3 7 7 .5-5.5 4.5 2 7-6.5-4-6.5 4 2-7-5.5-4.5 7-.5z" fill="currentColor" />
    </svg>
  );
}

export function Certificates() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();
  const selected = categories.find((category) => category.label === selectedCategory);

  return (
    <motion.section
      className={styles.section}
      aria-labelledby="certifications-title"
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: reduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles.frame}>
        <div className={styles.hero}>
          <div className={styles.copy}>
            <span className={styles.badge}><span aria-hidden="true">✿</span> Certifications</span>
            <h2 id="certifications-title">You thought<br />I stop? <span>Nahh.</span></h2>
            <p className={styles.handLine}>
              Upwards of <strong>36+</strong> Certificates<br />
              at the <mark>age of 20?</mark><br />
              And with still a degree left.
            </p>
            <p className={styles.description}>
              Because learning new things, exploring different fields and building skills isn&apos;t a phase for me. It&apos;s a habit. Here&apos;s a collection of the certifications, courses, and programmes that have shaped my journey so far.
            </p>
            <a
              className={styles.driveButton}
              href={CERTIFICATES_DRIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Explore all certificates in Google Drive, opens in a new tab"
            >
              <span>Explore All Certificates <span aria-hidden="true">↗</span></span>
              <svg viewBox="0 0 48 42" aria-hidden="true" className={styles.driveMark}>
                <path fill="#00832d" d="M15.5 2h13L11 32H0z" />
                <path fill="#0066da" d="M11 32h33l-6.5 10H4z" />
                <path fill="#ffba00" d="M28.5 2 48 32l-6.5 10L22 12z" />
              </svg>
            </a>
            <p className={styles.driveCaption}><span aria-hidden="true">🔒</span> Opens my Google Drive</p>
          </div>

          <div className={styles.characterScene}>
            <div className={styles.characterGlow} aria-hidden="true" />
            <Image
              className={styles.character}
              src="/photos/certifications-character.png"
              alt="Romil’s cartoon character in a black hoodie holding seven colorful books about marketing, strategy, content, community, branding, leadership, and tools"
              width={1536}
              height={1024}
              sizes="(max-width: 760px) 92vw, 48vw"
            />
          </div>
        </div>

        <div className={styles.categoryStrip}>
          <div className={styles.countCard}>
            <MedalIcon />
            <div className={styles.countCopy}>
              <strong>36+</strong>
              <b>Certificates</b>
              <small>(and counting...)</small>
            </div>
          </div>
          <div className={styles.categoriesArea}>
            <p className={styles.stripIntro}>Across different fields, because I like to explore, learn and grow.</p>
            <div className={styles.categoryList} aria-label="Certificate categories">
              {categories.map((category) => (
                <button
                  type="button"
                  key={category.label}
                  className={`${styles.category} ${styles[category.tone]} ${selectedCategory === category.label ? styles.categorySelected : ""}`}
                  aria-pressed={selectedCategory === category.label}
                  onClick={() => setSelectedCategory((current) => current === category.label ? null : category.label)}
                >
                  <span aria-hidden="true">{category.icon}</span>{category.label}
                </button>
              ))}
            </div>
            <p className={styles.categoryDescription} aria-live="polite">
              {selected ? selected.description : "Select a topic to explore the collection."}
            </p>
          </div>
          <p className={styles.sideNote}>A little bit of everything<br />that makes me, me.<span aria-hidden="true">↶</span></p>
        </div>
      </div>
    </motion.section>
  );
}
