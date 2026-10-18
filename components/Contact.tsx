"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from "framer-motion";
import { contact } from "@/lib/content";
import { Magnetic } from "./Magnetic";
import { burst } from "@/lib/confetti";
import { ContactForm } from "./ContactForm";
import styles from "./Contact.module.css";

const cardColors = [styles.cardRed, styles.cardGreen, styles.cardPurple, styles.cardOrange];

const stars = [
  { id: "spark-one", label: "first star", symbol: "✦", className: styles.starOne },
  { id: "spark-two", label: "second star", symbol: "✧", className: styles.starTwo },
  { id: "spark-three", label: "third star", symbol: "✳", className: styles.starThree },
] as const;

const flightPath = "M 14 112 C 42 55, 90 58, 116 110 S 180 172, 208 116 S 258 62, 286 112 C 264 174, 204 185, 160 143 S 60 65, 14 112";

export function Contact() {
  const stageRef = useRef<HTMLDivElement>(null);
  const flightZoneRef = useRef<HTMLDivElement>(null);
  const flightPathRef = useRef<SVGPathElement>(null);
  const flightLength = useRef(0);
  const reduceMotion = useReducedMotion();
  const [collected, setCollected] = useState<string[]>([]);
  const planeX = useMotionValue(-15);
  const planeY = useMotionValue(0);
  const planeRotation = useMotionValue(0);

  useEffect(() => {
    const path = flightPathRef.current;
    const stage = flightZoneRef.current;
    const transform = path?.getScreenCTM();
    if (!path || !stage || !transform) return;

    flightLength.current = path.getTotalLength();
    const point = path.getPointAtLength(0);
    const ahead = path.getPointAtLength(2);
    const screenPoint = new DOMPoint(point.x, point.y).matrixTransform(transform);
    const screenAhead = new DOMPoint(ahead.x, ahead.y).matrixTransform(transform);
    const bounds = stage.getBoundingClientRect();
    planeX.set(screenPoint.x - bounds.left - 30);
    planeY.set(screenPoint.y - bounds.top - 30);
    planeRotation.set(
      Math.atan2(screenAhead.y - screenPoint.y, screenAhead.x - screenPoint.x) * (180 / Math.PI) + 43,
    );
  }, [planeRotation, planeX, planeY]);

  useAnimationFrame((time) => {
    const path = flightPathRef.current;
    const stage = flightZoneRef.current;
    if (reduceMotion || document.visibilityState !== "visible" || !path || !stage) return;

    if (!flightLength.current) flightLength.current = path.getTotalLength();
    const distance = ((time % 14000) / 14000) * flightLength.current;
    const point = path.getPointAtLength(distance);
    const ahead = path.getPointAtLength(Math.min(distance + 2, flightLength.current));
    const transform = path.getScreenCTM();
    if (!transform) return;

    const screenPoint = new DOMPoint(point.x, point.y).matrixTransform(transform);
    const screenAhead = new DOMPoint(ahead.x, ahead.y).matrixTransform(transform);
    const bounds = stage.getBoundingClientRect();
    planeX.set(screenPoint.x - bounds.left - 30);
    planeY.set(screenPoint.y - bounds.top - 30);
    planeRotation.set(
      Math.atan2(screenAhead.y - screenPoint.y, screenAhead.x - screenPoint.x) * (180 / Math.PI) + 43,
    );
  });

  const collectStar = (id: string) => {
    setCollected((current) => current.includes(id) ? current : [...current, id]);
  };

  return (
    <section
      id="contact"
      className={styles.section}
      aria-labelledby="contact-title"
    >
      <div className={styles.container}>
        <div className={styles.heroGrid}>
          <div className={styles.copyColumn}>
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.5 }}
            >
              <span className={styles.kicker}>
                <span aria-hidden="true">✦</span> Let&apos;s connect
              </span>
              <h1 id="contact-title" className={styles.headline}>
                <span>Got an</span>
                <span>interesting</span>
                <span>problem?</span>
              </h1>
            </motion.div>

            <motion.div
              className={styles.formPanel}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.55, delay: reduceMotion ? 0 : 0.1 }}
            >
              <ContactForm />
            </motion.div>
          </div>

          <aside
            className={styles.doodleStage}
            ref={stageRef}
            aria-labelledby="doodle-title"
          >
            <h2 id="doodle-title" className={styles.visuallyHidden}>
              Play with the stars
            </h2>

            <div className={styles.stageTop}>
              <div className={styles.stickyNote} aria-hidden="true">
                <span>Same energy.<br />Different chapters.</span>
              </div>
              <svg className={styles.noteAccent} viewBox="0 0 54 48" aria-hidden="true">
                <path d="M8 42 17 8m6 31L34 3m3 39 10-26" />
              </svg>
              <span className={`${styles.twinkleGlyph} ${styles.topSpark}`} aria-hidden="true">✦</span>
            </div>

            <div className={styles.flightZone} ref={flightZoneRef}>
              <svg className={styles.flightRoute} viewBox="0 0 300 220" preserveAspectRatio="none" aria-hidden="true">
                <path ref={flightPathRef} d={flightPath} />
              </svg>
              <motion.div
                className={styles.paperPlane}
                style={{ x: planeX, y: planeY, rotate: planeRotation }}
                aria-hidden="true"
              >
                <svg viewBox="0 0 82 82">
                  <path d="M5 35 76 7 54 76 38 49 5 35Z" />
                  <path d="m38 49 38-42-48 34" />
                </svg>
              </motion.div>

              <motion.div
                className={styles.smileFace}
                drag
                dragConstraints={stageRef}
                dragMomentum={false}
                whileDrag={reduceMotion ? undefined : { scale: 1.08, rotate: 8 }}
                aria-hidden="true"
              >
                <svg viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" />
                  <circle className={styles.faceEye} cx="35" cy="40" r="4" />
                  <circle className={styles.faceEye} cx="64" cy="40" r="4" />
                  <path className={styles.faceSmile} d="M29 57c5 19 37 23 44 0" />
                </svg>
              </motion.div>

              {stars.map((star, index) => {
                const found = collected.includes(star.id);
                return (
                  <motion.button
                    key={star.id}
                    type="button"
                    className={`${styles.starDoodle} ${star.className} ${found ? styles.starFound : ""}`}
                    aria-label={`${found ? "Collected" : "Collect"} ${star.label}; drag it around or tap it`}
                    aria-pressed={found}
                    disabled={found}
                    drag={!found}
                    dragConstraints={stageRef}
                    dragMomentum={false}
                    whileDrag={reduceMotion ? undefined : { scale: 1.3, rotate: 25 }}
                    whileHover={!found && !reduceMotion ? { scale: 1.18, rotate: -12 } : undefined}
                    animate={{ opacity: found ? 0 : 1, scale: found ? 0 : 1 }}
                    transition={{ duration: reduceMotion ? 0 : 0.35, delay: reduceMotion ? 0 : index * 0.12 }}
                    onClick={() => collectStar(star.id)}
                  >
                    <span className={styles.twinkleGlyph} aria-hidden="true">{star.symbol}</span>
                  </motion.button>
                );
              })}
            </div>

            <div className={styles.stageFooter}>
              <p className={styles.ideasNote}>Good ideas start with a hello.</p>
              <div className={styles.gameHint} role="status" aria-live="polite">
                <span className={styles.gameScore}>
                  {collected.length === stars.length ? "All stars found!" : `${collected.length} / ${stars.length} stars`}
                </span>
                <span>{collected.length === stars.length ? "Lovely work." : "Tap or drag to collect them."}</span>
              </div>
            </div>
          </aside>
        </div>

        <div className={styles.directSection}>
          <div className={styles.directLabel}>
            <p>Or reach me directly</p>
            <svg viewBox="0 0 54 48" aria-hidden="true">
              <path d="M42 4C37 25 24 34 9 37m0 0 13 4M9 37l8-12" />
            </svg>
          </div>

          <div className={styles.linksGrid}>
            {contact.links.map((link, index) => {
              const href = link.label === "Website" ? "/" : link.href;
              const external = href.startsWith("http");

              return (
                <motion.div
                  key={link.label}
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: reduceMotion ? 0 : 0.4, delay: reduceMotion ? 0 : index * 0.07 }}
                >
                  <Magnetic strength={0.22}>
                    <a
                      href={href}
                      data-cursor="Open"
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      onClick={(event) => burst(event.clientX, event.clientY)}
                      className={`${styles.contactLink} ${cardColors[index % cardColors.length]}`}
                    >
                      <span className={styles.linkTop}>
                        <span className={styles.linkTitle}>{link.label}</span>
                        <span className={styles.linkArrow} aria-hidden="true">↗</span>
                      </span>
                      <span className={styles.linkHandle}>{link.handle}</span>
                    </a>
                  </Magnetic>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className={styles.closingCard}>
          <div>
            <span className={styles.closingKicker}>Your next chapter starts here</span>
            <p>Let&apos;s make something good.</p>
          </div>
          <span className={styles.closingSpark} aria-hidden="true">✦</span>
        </div>
      </div>
    </section>
  );
}
