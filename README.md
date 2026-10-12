# Romil Lodaya — Portfolio

Bold, animated personal-brand site. Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Lenis smooth scroll.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Editing content

**All copy lives in [`lib/content.ts`](lib/content.ts)** — edit text there without touching component code. Search the file for `[FILL IN: ...]` markers and replace them with real values:

- Experience dates (Wottl Marketing, Schbang, Collective Artists Network)
- Contact URLs / handles (Website, Instagram, LinkedIn, Email)
- Footer "built by" credit line

## Photos

Live in [`public/photos`](public/photos) with semantic filenames (`hero-spotlight`, `about-tree`, `moment-ogilvy`, …). Swap a file in place to change an image; alt text is defined alongside each usage in `lib/content.ts` or the component.

One event photo (`moment-rotaract.jpeg`) relies on the browser applying its embedded EXIF orientation. If it ever displays sideways, re-export it upright.

## Structure

```
app/            layout, page, global styles
components/     one file per section (Hero, About, WhatIDo, …) + Nav, cursor, smooth scroll
components/ui/  reusable bits (SectionHeading, Reveal, Doodles)
lib/content.ts  ← all text
lib/motion.ts   shared Framer Motion variants
```

## Sections

Hero → About → What I Do → Principles & Framework → Experience → Skills → Remarkable Moments → Brands → Tools → Contact → Footer.

## Notes

- Animations use `transform`/`opacity` only and fully respect `prefers-reduced-motion` (smooth scroll, custom cursor, and cycling text all disable themselves).
- Custom cursor and magnetic hover are desktop-only (fine pointer); touch devices get standard interactions.
- Deploy-ready for Vercel — push the repo and import, no config needed.

## Deploy

```bash
npm run build && npm run start   # production check
```

Or connect the repo to Vercel and deploy.
