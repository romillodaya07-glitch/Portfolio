"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { moments, momentsIntro } from "@/lib/content";
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

const checkpoints = [
  { id: "places", title: "New places", icon: "pin" },
  { id: "people", title: "Amazing people", icon: "people" },
  { id: "ideas", title: "Crazy ideas", icon: "idea" },
  { id: "growth", title: "Bigger opportunities", icon: "growth" },
  { id: "next", title: "The next chapter", icon: "globe" },
] as const;

const tokens = [
  { id: "star", label: "yellow star", symbol: "✦", className: styles.tokenStar, left: "14%", top: "8%" },
  { id: "spark", label: "blue spark", symbol: "✳", className: styles.tokenSpark, left: "48%", top: "7%" },
  { id: "arrow", label: "coral arrow", symbol: "↗", className: styles.tokenArrow, left: "82%", top: "8%" },
] as const;

type CheckpointIconName = (typeof checkpoints)[number]["icon"];

function CheckpointIcon({ name }: { name: CheckpointIconName }) {
  switch (name) {
    case "pin":
      return <><path d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z" /><circle cx="12" cy="9" r="2.2" /></>;
    case "people":
      return <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.3" /><path d="M3.5 20c.4-3.2 2.2-5 5.5-5s5.2 1.8 5.6 5M14.3 15.8c2.8-.7 5.8.7 6.3 3.8" /></>;
    case "idea":
      return <><path d="M9 18h6m-5 3h4m-2-19a7 7 0 0 0-4.4 12.4c.9.7 1.4 1.5 1.5 2.6h5.8c.1-1.1.6-1.9 1.5-2.6A7 7 0 0 0 12 2Z" /><path d="M12 5v3m-4.8-.2 2 2m7.6-2-2 2" /></>;
    case "growth":
      return <><path d="M4 20V12h4v8m4 0V8h4v12m4 0V4h4v16M2 20h22" /></>;
    case "globe":
      return <><circle cx="12" cy="12" r="9" /><path d="M3.5 9h17M3.5 15h17M12 3c2.2 2.5 3.3 5.5 3.3 9S14.2 18.5 12 21M12 3C9.8 5.5 8.7 8.5 8.7 12s1.1 6.5 3.3 9" /></>;
    default:
      return <></>;
  }
}

function MomentTrail() {
  const boardRef = useRef<HTMLDivElement>(null);
  const checkpointRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [selectedToken, setSelectedToken] = useState<string | null>(null);
  const [placements, setPlacements] = useState<Record<string, number>>({});
  const [round, setRound] = useState(0);

  const placeToken = (tokenId: string, checkpointIndex: number) => {
    if (placements[tokenId] !== undefined) return;
    if (Object.values(placements).includes(checkpointIndex)) return;
    setPlacements((current) => ({ ...current, [tokenId]: checkpointIndex }));
    setSelectedToken(null);
  };

  const dropToken = (tokenId: string, point: { x: number; y: number }) => {
    let closestIndex = -1;
    let closestDistance = Number.POSITIVE_INFINITY;

    checkpointRefs.current.forEach((checkpoint, index) => {
      if (!checkpoint) return;
      const bounds = checkpoint.getBoundingClientRect();
      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;
      const distance = Math.hypot(point.x - centerX, point.y - centerY);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex >= 0 && closestDistance < 105) {
      placeToken(tokenId, closestIndex);
    }
  };

  const score = Object.keys(placements).length;
  const complete = score === tokens.length;

  return (
    <section className={styles.trailSection} aria-labelledby="moments-trail-title">
      <div className={styles.trailHeader}>
        <div>
          <span className={styles.trailKicker}>A little memory game</span>
          <h2 id="moments-trail-title">Every moment<br />builds the next one.</h2>
        </div>
        <p>
          Pick up the little doodles and place them along the journey. Each one
          marks a part of the story worth keeping.
        </p>
      </div>

      <div className={styles.trailBoard} ref={boardRef}>
        <svg className={styles.routeDesktop} viewBox="0 0 1000 180" preserveAspectRatio="none" aria-hidden="true">
          <path d="M4 92 C88 8 158 174 250 92 S412 8 500 92 S664 174 750 92 S915 8 996 92" />
        </svg>
        <svg className={styles.routeMobile} viewBox="0 0 120 560" preserveAspectRatio="none" aria-hidden="true">
          <path d="M58 2 C12 58 106 94 58 150 S12 242 58 298 S106 390 58 446 S28 516 58 558" />
        </svg>

        <div className={styles.trailNote}>
          <span>Every moment<br />is a building block.</span>
          <div className={styles.trailPhoto}>
            <Image
              src="/photos/moment-marina.jpeg"
              alt="A favorite evening by the marina"
              fill
              sizes="130px"
              className="object-cover"
            />
          </div>
        </div>

        <div className={styles.checkpointRow}>
          {checkpoints.map((checkpoint, index) => {
            const placedToken = Object.entries(placements).find(([, target]) => target === index)?.[0];
            const canPlace = selectedToken !== null && !placedToken;

            return (
              <button
                key={checkpoint.id}
                ref={(element) => { checkpointRefs.current[index] = element; }}
                type="button"
                className={`${styles.checkpoint} ${placedToken ? styles.checkpointCollected : ""} ${canPlace ? styles.checkpointReady : ""}`}
                aria-label={placedToken ? `${checkpoint.title}, doodle collected` : `Place selected doodle at ${checkpoint.title}`}
                aria-pressed={Boolean(placedToken)}
                onClick={() => selectedToken && placeToken(selectedToken, index)}
              >
                <span className={styles.checkpointIcon} aria-hidden="true">
                  {placedToken ? <span className={styles.placedGlyph}>{tokens.find((token) => token.id === placedToken)?.symbol}</span> : (
                    <svg viewBox="0 0 24 24" fill="none">
                      <CheckpointIcon name={checkpoint.icon} />
                    </svg>
                  )}
                </span>
                <span className={styles.checkpointLabel}>{checkpoint.title}</span>
              </button>
            );
          })}
        </div>

        {tokens.map((token) => {
          const collected = placements[token.id] !== undefined;
          return (
            <motion.button
              key={`${token.id}-${round}`}
              type="button"
              className={`${styles.dragToken} ${token.className} ${selectedToken === token.id ? styles.tokenSelected : ""}`}
              aria-label={`${token.label}${collected ? ", collected" : ", select or drag to a journey point"}`}
              aria-pressed={selectedToken === token.id}
              disabled={collected}
              drag={!collected}
              dragConstraints={boardRef}
              dragMomentum={false}
              whileDrag={{ scale: 1.2, rotate: 14, cursor: "grabbing" }}
              whileHover={!collected ? { scale: 1.1, rotate: -8 } : undefined}
              animate={collected ? { opacity: 0, scale: 0.45 } : { opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              style={{ left: token.left, top: token.top }}
              onClick={() => setSelectedToken((current) => current === token.id ? null : token.id)}
              onDragEnd={(_, info) => dropToken(token.id, info.point)}
            >
              <span aria-hidden="true">{token.symbol}</span>
            </motion.button>
          );
        })}

        <div className={styles.trailHelp}>
          <span className={styles.score} aria-live="polite">{complete ? "Story complete!" : `${score} / ${tokens.length} collected`}</span>
          <span>
            {complete
              ? "Nice. Every chapter leaves something with you."
              : "Drag a doodle onto a point — or select it, then tap a point."}
          </span>
          {complete && (
            <button
              type="button"
              className={styles.resetButton}
              onClick={() => { setPlacements({}); setSelectedToken(null); setRound((current) => current + 1); }}
            >
              Play again ↻
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

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

      <MomentTrail />
    </main>
  );
}
