"use client";

import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { type CSSProperties, type KeyboardEvent, type PointerEvent, useEffect, useRef, useState } from "react";
import { heroDescription, heroServices } from "@/lib/content";
import { Arrow, Spark, Star, Squiggle } from "./ui/Doodles";
import { NameLockup } from "./ui/NameLockup";
import styles from "./Hero.module.css";

type LayerPose = { x: number; y: number; scale: number; rotate: number };
type LayerId = "character" | "plane" | "books" | "laptop" | "coffee" | "plant" | "star" | "note";

const CREATIVE_STORAGE_KEY = "romil-portfolio-hero-layout-v1";
const LAYERS: { id: LayerId; label: string }[] = [
  { id: "character", label: "Character" },
  { id: "plane", label: "Paper plane" },
  { id: "books", label: "Book stack" },
  { id: "laptop", label: "Laptop" },
  { id: "coffee", label: "Coffee" },
  { id: "plant", label: "Plant" },
  { id: "star", label: "Star doodle" },
  { id: "note", label: "Impact note" },
];

const EMPTY_POSE: LayerPose = { x: 0, y: 0, scale: 1, rotate: 0 };

function PlaneArtwork() {
  return (
    <svg className={styles.flightPath} viewBox="0 0 260 140" fill="none" aria-hidden="true">
      <path className={styles.flightTrail} d="M0 60C40 24 68 27 99 66S164 100 215 31" />
    </svg>
  );
}

function PaperPlaneIcon() {
  return (
    <svg className={styles.planeIcon} viewBox="0 0 42 36" fill="none" aria-hidden="true">
      <path d="M1 9 40 1 20 35 15 18 1 9Z" fill="#FFD62F" stroke="#16131B" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="m15 18 25-17-20 34-5-17Z" fill="#FFB900" stroke="#16131B" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="m1 9 14 9" stroke="#F5A600" strokeWidth="1.5" />
    </svg>
  );
}

function StatMark({ type }: { type: "linkedin" | "people" | "years" | "views" }) {
  if (type === "linkedin") return <span className={`${styles.statMark} ${styles.linkedinMark}`} aria-hidden="true">in</span>;
  if (type === "views") return <span className={`${styles.statMark} ${styles.viewsMark}`} aria-hidden="true"><span /></span>;
  if (type === "years") return <span className={`${styles.statMark} ${styles.yearsMark}`} aria-hidden="true">✦</span>;
  return (
    <span className={`${styles.statMark} ${styles.peopleMark}`} aria-hidden="true">
      <i /><i /><i />
    </span>
  );
}

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    id: LayerId;
    pointerId: number;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);
  const reduceMotion = useReducedMotion();
  const [creativeMode, setCreativeMode] = useState(false);
  const [selectedLayer, setSelectedLayer] = useState<LayerId>("character");
  const [layouts, setLayouts] = useState<Partial<Record<LayerId, LayerPose>>>({});
  const [layoutLoaded, setLayoutLoaded] = useState(false);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const cueOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(CREATIVE_STORAGE_KEY);
      if (saved) setLayouts(JSON.parse(saved) as Partial<Record<LayerId, LayerPose>>);
    } catch {
      // The hero works normally when storage is unavailable.
    }
    setLayoutLoaded(true);
  }, []);

  useEffect(() => {
    if (!layoutLoaded) return;
    try {
      window.localStorage.setItem(CREATIVE_STORAGE_KEY, JSON.stringify(layouts));
    } catch {
      // Saving is optional; editing remains available for this visit.
    }
  }, [layouts, layoutLoaded]);

  const setPose = (id: LayerId, update: Partial<LayerPose>) => {
    setLayouts((current) => ({
      ...current,
      [id]: { ...EMPTY_POSE, ...current[id], ...update },
    }));
  };

  const poseStyle = (id: LayerId): CSSProperties => {
    const pose = { ...EMPTY_POSE, ...layouts[id] };
    return {
      transform: `translate3d(${pose.x}px, ${pose.y}px, 0) rotate(${pose.rotate}deg) scale(${pose.scale})`,
    };
  };

  const handleCreativePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!creativeMode) return;
    const target = (event.target as HTMLElement).closest<HTMLElement>("[data-creative-id]");
    const id = target?.dataset.creativeId as LayerId | undefined;
    if (!target || !id || (event.target as HTMLElement).closest("button, input, select")) return;
    event.preventDefault();
    setSelectedLayer(id);
    target.setPointerCapture(event.pointerId);
    const pose = { ...EMPTY_POSE, ...layouts[id] };
    dragRef.current = {
      id,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: pose.x,
      originY: pose.y,
    };
  };

  const handleCreativePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!creativeMode || !drag || drag.pointerId !== event.pointerId) return;
    setPose(drag.id, {
      x: drag.originX + event.clientX - drag.startX,
      y: drag.originY + event.clientY - drag.startY,
    });
  };

  const handleCreativeKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!creativeMode || !["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) return;
    const target = (event.target as HTMLElement).closest<HTMLElement>("[data-creative-id]");
    const id = target?.dataset.creativeId as LayerId | undefined;
    if (!id) return;
    event.preventDefault();
    setSelectedLayer(id);
    const step = event.shiftKey ? 12 : 4;
    const pose = { ...EMPTY_POSE, ...layouts[id] };
    if (event.key === "ArrowLeft") setPose(id, { x: pose.x - step });
    if (event.key === "ArrowRight") setPose(id, { x: pose.x + step });
    if (event.key === "ArrowUp") setPose(id, { y: pose.y - step });
    if (event.key === "ArrowDown") setPose(id, { y: pose.y + step });
  };

  const handleScenePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (creativeMode || reduceMotion || event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const horizontal = (event.clientX - (bounds.left + bounds.width / 2)) / bounds.width;
    const vertical = (event.clientY - (bounds.top + bounds.height / 2)) / bounds.height;
    const face = event.currentTarget.querySelector<HTMLElement>(`.${styles.characterFrame}`);
    const background = event.currentTarget.querySelector<HTMLElement>(`.${styles.glowParallax}`);
    face?.style.setProperty("--head-tilt", `${Math.max(-1.6, Math.min(1.6, horizontal * 3.2))}deg`);
    background?.style.setProperty("--scene-x", `${horizontal * 12}px`);
    background?.style.setProperty("--scene-y", `${vertical * 10}px`);
  };

  const resetScene = () => {
    setLayouts({});
    setSelectedLayer("character");
  };

  return (
    <section
      id="top"
      ref={heroRef}
      className={styles.hero}
      aria-label="Romil Lodaya introduction"
      onPointerMove={handleScenePointerMove}
    >
      <div className={`${styles.glowParallax} ${styles.backgroundGlow}`} aria-hidden="true" />
      <div className={styles.paperTexture} aria-hidden="true" />

      <div className={styles.contentGrid}>
        <div className={styles.copyColumn}>
          <div className={styles.lockupWrap}>
            <NameLockup greeting="Hey, I'm" as="h1" />
            <Spark className={`${styles.helloSpark} h-6 w-6 text-ink`} />
          </div>

          <p className={styles.intro}>{heroDescription}</p>

          <div className={styles.actions}>
            <Link href="/work" className={`${styles.button} ${styles.primaryButton}`}>
              View My Work <span aria-hidden="true">↗</span>
            </Link>
            <Link href="/contact" className={`${styles.button} ${styles.secondaryButton}`}>
              Get in Touch
            </Link>
          </div>

          <ul className={styles.services} aria-label="What I do">
            {heroServices.map((service) => (
              <li key={service.title} className={styles.service}>
                <span className={`${styles.serviceNumber} ${service.color}`}>{service.number}</span>
                <h2>{service.title}</h2>
                <p>{service.copy}</p>
              </li>
            ))}
          </ul>
        </div>

        <div
          className={`${styles.scene} ${creativeMode ? styles.isCreative : ""}`}
          ref={sceneRef}
          onPointerDown={handleCreativePointerDown}
          onPointerMove={handleCreativePointerMove}
          onPointerUp={() => { dragRef.current = null; }}
          onPointerCancel={() => { dragRef.current = null; }}
          onKeyDown={handleCreativeKeyDown}
          onClick={(event) => {
            if (!creativeMode) return;
            const target = (event.target as HTMLElement).closest<HTMLElement>("[data-creative-id]");
            const id = target?.dataset.creativeId as LayerId | undefined;
            if (id) setSelectedLayer(id);
          }}
          onPointerLeave={() => {
            const face = sceneRef.current?.querySelector<HTMLElement>(`.${styles.characterFrame}`);
            const background = sceneRef.current?.querySelector<HTMLElement>(`.${styles.glowParallax}`);
            face?.style.setProperty("--head-tilt", "0deg");
            background?.style.setProperty("--scene-x", "0px");
            background?.style.setProperty("--scene-y", "0px");
          }}
        >
          <div className={styles.sceneGlow} aria-hidden="true" />
          <div className={styles.sceneDoodles} aria-hidden={creativeMode ? undefined : true}>
            <div
              className={`${styles.movableLayer} ${styles.starLayer}`}
              data-creative-id="star"
              tabIndex={creativeMode ? 0 : -1}
              aria-label="Star decoration"
              style={poseStyle("star")}
            >
              <Star className="h-12 w-12 text-pop-yellow drop-shadow-[2px_2px_0_#15121c]" />
            </div>
            <Squiggle className={styles.squiggle} />
            <span className={styles.miniSparkle}>✦</span>
            <span className={styles.impactArrow}>↗</span>
          </div>

          <div
            className={`${styles.movableLayer} ${styles.planeLayer}`}
            data-creative-id="plane"
            tabIndex={creativeMode ? 0 : -1}
            aria-label="Yellow paper plane"
            style={poseStyle("plane")}
          >
            <PaperPlaneIcon />
          </div>

          <PlaneArtwork />

          <div className={styles.plantBack} aria-hidden="true">
            <i /><i /><i /><i /><i /><i />
          </div>

          <div className={styles.desk} aria-hidden="true">
            <span className={styles.deskEdge} />
          </div>

          <div
            className={`${styles.movableLayer} ${styles.characterLayer}`}
            data-creative-id="character"
            tabIndex={creativeMode ? 0 : -1}
            aria-label="Animated portrait character"
            style={poseStyle("character")}
          >
            <div className={styles.characterFrame}>
              <div className={styles.characterBob}>
                <Image
                  src="/photos/hero-character.png"
                  alt="A 3D animated illustration of Romil in a black shirt and wristwatch"
                  fill
                  priority
                  sizes="(max-width: 900px) 94vw, 52vw"
                  className={styles.characterImage}
                />
              </div>
              <span className={`${styles.eyelid} ${styles.eyelidLeft}`} aria-hidden="true" />
              <span className={`${styles.eyelid} ${styles.eyelidRight}`} aria-hidden="true" />
            </div>
          </div>

          <div
            className={`${styles.movableLayer} ${styles.booksLayer}`}
            data-creative-id="books"
            tabIndex={creativeMode ? 0 : -1}
            aria-label="Four business and personal development books"
            style={poseStyle("books")}
          >
            <div className={`${styles.book} ${styles.bookSubtle}`}>The Subtle Art of Not Giving a F*ck</div>
            <div className={`${styles.book} ${styles.bookAtomic}`}>Atomic Habits</div>
            <div className={`${styles.book} ${styles.bookMoney}`}>The Psychology of Money</div>
            <div className={`${styles.book} ${styles.bookZero}`}>Zero to One</div>
          </div>

          <div
            className={`${styles.movableLayer} ${styles.laptopLayer}`}
            data-creative-id="laptop"
            tabIndex={creativeMode ? 0 : -1}
            aria-label="Blue laptop with a plain lid"
            style={poseStyle("laptop")}
          >
            <div className={styles.laptop} aria-hidden="true">
              <div className={styles.laptopScreen} />
              <div className={styles.laptopBase} />
            </div>
          </div>

          <div
            className={`${styles.movableLayer} ${styles.coffeeLayer}`}
            data-creative-id="coffee"
            tabIndex={creativeMode ? 0 : -1}
            aria-label="Coffee cup"
            style={poseStyle("coffee")}
          >
            <div className={styles.coffeeCup} aria-hidden="true"><span /><i /></div>
          </div>

          <div className={styles.notebook} aria-hidden="true"><span>notes &amp; next steps</span></div>
          <div
            className={`${styles.movableLayer} ${styles.plantLayer}`}
            data-creative-id="plant"
            tabIndex={creativeMode ? 0 : -1}
            aria-label="Small desk plant"
            style={poseStyle("plant")}
          >
            <div className={styles.potPlant} aria-hidden="true"><i /><i /><i /><i /><span /></div>
          </div>
          <div
            className={`${styles.movableLayer} ${styles.noteLayer}`}
            data-creative-id="note"
            tabIndex={creativeMode ? 0 : -1}
            aria-label="Ideas to impact sticky note"
            style={poseStyle("note")}
          >
            <div className={styles.stickyNote}>Ideas <span>→</span><br />Impact</div>
          </div>

          <button
            type="button"
            className={styles.creativeToggle}
            aria-pressed={creativeMode}
            onClick={() => setCreativeMode((value) => !value)}
          >
            <span aria-hidden="true">✳</span> {creativeMode ? "Exit Creative Mode" : "Creative Mode"}
          </button>
        </div>
      </div>

      <ul className={styles.statsStrip} aria-label="Selected impact stats">
        <li className={styles.stat}>
          <StatMark type="linkedin" />
          <div><strong>12K+</strong><span>LinkedIn Followers</span></div>
        </li>
        <li className={styles.stat}>
          <StatMark type="people" />
          <div><strong>120+</strong><span>Rotaract Projects</span></div>
        </li>
        <li className={styles.stat}>
          <StatMark type="years" />
          <div><strong>5+</strong><span>Years</span></div>
        </li>
        <li className={styles.stat}>
          <StatMark type="views" />
          <div><strong>5M+</strong><span>Views &amp; Impressions</span></div>
        </li>
      </ul>

      <div className={styles.scrollCue}>
        <motion.a
          href="#featured-work"
          aria-label="Scroll to featured work"
          style={{ opacity: cueOpacity }}
        >
          <span>Scroll to explore</span><Arrow className="h-5 w-9 rotate-90 text-pop-red" />
        </motion.a>
      </div>

      {creativeMode && typeof document !== "undefined" && createPortal(
        <aside className={styles.creativePanel} aria-label="Creative mode controls">
          <div className={styles.panelHeading}>
            <div><strong>Creative Mode</strong><span>Drag an element or use the arrow keys.</span></div>
            <button type="button" onClick={() => setCreativeMode(false)} aria-label="Close Creative Mode">×</button>
          </div>
          <label className={styles.controlLabel} htmlFor="hero-layer-select">Selected element</label>
          <select id="hero-layer-select" value={selectedLayer} onChange={(event) => setSelectedLayer(event.target.value as LayerId)}>
            {LAYERS.map((layer) => <option key={layer.id} value={layer.id}>{layer.label}</option>)}
          </select>
          <label className={styles.rangeLabel} htmlFor="hero-layer-size"><span>Size</span><output>{Math.round(({ ...EMPTY_POSE, ...layouts[selectedLayer] }).scale * 100)}%</output></label>
          <input
            id="hero-layer-size"
            type="range"
            min="65"
            max="140"
            value={Math.round(({ ...EMPTY_POSE, ...layouts[selectedLayer] }).scale * 100)}
            onChange={(event) => setPose(selectedLayer, { scale: Number(event.target.value) / 100 })}
          />
          <label className={styles.rangeLabel} htmlFor="hero-layer-rotation"><span>Rotation</span><output>{Math.round(({ ...EMPTY_POSE, ...layouts[selectedLayer] }).rotate)}°</output></label>
          <input
            id="hero-layer-rotation"
            type="range"
            min="-30"
            max="30"
            value={Math.round(({ ...EMPTY_POSE, ...layouts[selectedLayer] }).rotate)}
            onChange={(event) => setPose(selectedLayer, { rotate: Number(event.target.value) })}
          />
          <button type="button" className={styles.resetLayout} onClick={resetScene}>Reset saved layout</button>
          <p className={styles.savedHint}>Your layout saves on this device.</p>
        </aside>,
        document.body,
      )}
    </section>
  );
}
