"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Star, Spark, Squiggle, Arrow } from "./ui/Doodles";
import styles from "./StickerPlayground.module.css";

type Sticker = {
  id: string;
  label: string;
  node: React.ReactNode;
  colorClass: string;
  x: string;
  y: string;
  rotate: number;
};

const STICKERS: Sticker[] = [
  { id: "blue-star", label: "blue star", node: <Star className="h-full w-full" />, colorClass: styles.blue, x: "8%", y: "18%", rotate: -12 },
  { id: "coral-spark", label: "coral spark", node: <Spark className="h-full w-full" />, colorClass: styles.coral, x: "24%", y: "61%", rotate: 8 },
  { id: "mint-squiggle", label: "mint squiggle", node: <Squiggle className="h-full w-full" />, colorClass: styles.mint, x: "42%", y: "20%", rotate: -4 },
  { id: "violet-arrow", label: "violet arrow", node: <Arrow className="h-full w-full" />, colorClass: styles.violet, x: "59%", y: "64%", rotate: 14 },
  { id: "orange-star", label: "orange star", node: <Star className="h-full w-full" />, colorClass: styles.orange, x: "72%", y: "16%", rotate: 20 },
  { id: "pink-spark", label: "pink spark", node: <Spark className="h-full w-full" />, colorClass: styles.pink, x: "64%", y: "47%", rotate: -16 },
];

/** A keyboard-accessible drag-and-collect game with a gentle bouncing target. */
export function StickerPlayground() {
  const boardRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [collected, setCollected] = useState<string[]>([]);
  const [round, setRound] = useState(0);
  const allCollected = collected.length === STICKERS.length;

  const collect = (id: string) => {
    setCollected((current) => current.includes(id) ? current : [...current, id]);
  };

  const finishDrag = (
    id: string,
    event: MouseEvent | TouchEvent | PointerEvent,
  ) => {
    const target = targetRef.current?.getBoundingClientRect();
    if (!target) return;

    const point = "changedTouches" in event ? event.changedTouches.item(0) : event;
    if (!point || !("clientX" in point)) return;
    const insideTarget = point.clientX >= target.left
      && point.clientX <= target.right
      && point.clientY >= target.top
      && point.clientY <= target.bottom;

    if (insideTarget) collect(id);
  };

  return (
    <section className={styles.section} aria-labelledby="sticker-game-title">
      <div className={styles.gameCard}>
        <header className={styles.gameHeader}>
          <div className={styles.headingGroup}>
            <span className={styles.gameKicker}><span aria-hidden="true">✦</span> Tiny playground</span>
            <h2 id="sticker-game-title">Grab a little joy</h2>
            <p>Drag the doodles into the yellow orbit, or tap one to collect it.</p>
          </div>
          <div className={styles.scoreGroup}>
            <span className={styles.scoreLabel}>Good energy</span>
            <span className={styles.score} role="status" aria-live="polite">
              {allCollected ? "All collected!" : `${collected.length} / ${STICKERS.length}`}
            </span>
            <div className={styles.progressTrack} aria-hidden="true">
              <span style={{ width: `${(collected.length / STICKERS.length) * 100}%` }} />
            </div>
          </div>
        </header>

        <div className={styles.gameBoard} ref={boardRef}>
          <div className={styles.boardGlow} aria-hidden="true" />
          <div className={styles.boardHint} aria-hidden="true">GO ON — GRAB &amp; FLING</div>
          <div className={styles.orbit} aria-hidden="true" />
          <div className={styles.target} ref={targetRef} aria-hidden="true">
            <span className={styles.targetStar}>✦</span>
            <span>{allCollected ? "NICE!" : "DROP"}<br />{allCollected ? "WORK" : "HERE"}</span>
          </div>

          {STICKERS.map((sticker, index) => {
            const found = collected.includes(sticker.id);
            return (
              <motion.button
                key={`${round}-${sticker.id}`}
                type="button"
                aria-label={`${found ? "Collected" : "Collect"} ${sticker.label}; drag to the yellow target or tap`}
                aria-pressed={found}
                disabled={found}
                drag={!found}
                dragConstraints={boardRef}
                dragElastic={reduceMotion ? 0 : 0.38}
                dragTransition={{ bounceStiffness: reduceMotion ? 900 : 380, bounceDamping: reduceMotion ? 40 : 13 }}
                whileDrag={reduceMotion ? undefined : { scale: 1.18, rotate: sticker.rotate + 8, zIndex: 10 }}
                whileHover={!found && !reduceMotion ? { scale: 1.12, rotate: sticker.rotate + 7 } : undefined}
                initial={reduceMotion ? false : { rotate: sticker.rotate, scale: 0.86, opacity: 0 }}
                animate={{
                  rotate: sticker.rotate,
                  scale: found ? 0.45 : 1,
                  opacity: found ? 0 : 1,
                }}
                transition={{
                  duration: reduceMotion ? 0 : 0.36,
                  delay: reduceMotion ? 0 : index * 0.06,
                }}
                onClick={() => collect(sticker.id)}
                onDragEnd={(event) => finishDrag(sticker.id, event)}
                style={{ left: sticker.x, top: sticker.y }}
                className={`${styles.sticker} ${sticker.colorClass}`}
              >
                <span
                  className={styles.stickerArt}
                  style={{ "--float-delay": `${index * 0.13}s` } as React.CSSProperties}
                >
                  {sticker.node}
                </span>
              </motion.button>
            );
          })}

          {allCollected && (
            <motion.div
              className={styles.winMessage}
              initial={reduceMotion ? false : { opacity: 0, y: 10, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              role="status"
            >
              <span aria-hidden="true">✦</span> You made the day brighter!
            </motion.div>
          )}
        </div>

        <footer className={styles.gameFooter}>
          <span><span className={styles.footerDot} aria-hidden="true" /> A tiny break for your cursor</span>
          <button
            type="button"
            className={styles.resetButton}
            onClick={() => {
              setCollected([]);
              setRound((current) => current + 1);
            }}
          >
            {allCollected ? "Play again ↻" : "Start over ↻"}
          </button>
        </footer>
      </div>
    </section>
  );
}
