/**
 * Single source of truth for all site copy.
 * Edit text here without touching component code.
 *
 * [FILL IN: ...] markers indicate facts not present in the source material.
 * Do not invent — Romil should supply these.
 */

export const meta = {
  name: "Romil Lodaya",
  roles: ["Brand Strategist", "Marketer", "Builder"],
  title: "Romil Lodaya — Brand Strategist, Marketer, Builder",
  description:
    "Romil Lodaya works at the intersection of strategy, creativity, and people — building brands and systems that create real impact.",
} as const;

/** Brand lines — mixed and matched across hero, section headers, footer. */
export const taglines = [
  "Ideas. People. Impact.",
  "A more creative tomorrow.",
  "Build. Create. Grow.",
  "Builder. Creator. Dreamer.",
  "Same energy, always.",
  "More than content.",
] as const;

export const heroLine = "I don't just create content, I create connection.";

export const heroDescription =
  "I turn ideas into brands, stories into attention, and ambitious plans into things people can actually use.";
export const heroServices = [
  {
    number: "01",
    title: "Strategy",
    copy: "Turn ideas into clear, scalable plans.",
    color: "text-pop-red",
  },
  {
    number: "02",
    title: "Creative",
    copy: "Make brands and stories people remember.",
    color: "text-electric",
  },
  {
    number: "03",
    title: "Community",
    copy: "Bring people together around good ideas.",
    color: "text-pop-orange",
  },
] as const;

export const about = {
  kicker: "About",
  headline: "Builder. Creator. Dreamer.",
  body: [
    "I work at the intersection of strategy, creativity, and people — building brands and systems that create real impact.",
    "Strategy gives me the map. Marketing gives me the voice. People give it all meaning. I care less about content for its own sake and more about the connection it creates.",
  ],
  signature: "Real. Creative. People First. Growth.",
  imageAlt:
    "Romil Lodaya in a green sweatshirt, arms crossed, leaning against a palm tree and smiling",
} as const;

/** The Growth → Learn → Share cycle. */
export const ethos = {
  kicker: "How I move",
  headline: "Curiosity is the engine.",
  cycle: [
    { label: "Growth", line: "Growth is the result of curiosity." },
    { label: "Learn", line: "Learning is the fuel." },
    { label: "Share", line: "Sharing creates impact." },
  ],
} as const;

/** What I Do — three pillars. */
export const pillars = [
  {
    no: "01",
    title: "Strategy",
    body: "Finds clarity in chaos and builds smart, actionable strategies that drive measurable growth.",
    accent: "electric",
  },
  {
    no: "02",
    title: "Marketing",
    body: "Creates content and campaigns that connect, convert, and build meaningful brands.",
    accent: "gold",
  },
  {
    no: "03",
    title: "Human Resources",
    body: "Builds teams, shapes culture, and designs systems that bring out the best in people.",
    accent: "purple",
  },
] as const;

/** My Principles — values. */
export const principles = [
  { title: "Ownership", body: "Take responsibility. Always." },
  { title: "Impact", body: "Create value that outlives you." },
  { title: "Growth", body: "Never stop upgrading yourself." },
] as const;

/** My Framework — 3-step approach. */
export const framework = [
  { step: "01", title: "Clarity", body: "Cut the noise. Name the real problem." },
  { step: "02", title: "Execution", body: "Ship it. Momentum beats perfection." },
  { step: "03", title: "Growth", body: "Measure, learn, and compound the wins." },
] as const;

/** A single role within a company (for nested sub-timelines). */
export type ExperienceRole = {
  title: string;
  type: string;
  period: string;
};

/** A company in the experience timeline. `roles` holds a nested progression. */
export type ExperienceJob = {
  company: string;
  role?: string;
  period: string;
  location?: string;
  body: string;
  roles?: readonly ExperienceRole[];
};

/** Experience timeline — roles and dates per LinkedIn (reverse chronological). */
export const experience: readonly ExperienceJob[] = [
  {
    company: "Wottl",
    period: "Jan 2025 — Present · 1 yr 9 mos",
    location: "Remote",
    body: "Working shoulder-to-shoulder with the founder across hiring, operations, and online reputation — and moderating 3,500+ community comments to keep the brand's voice consistent at scale.",
    roles: [
      {
        title: "Founder's Office — Influencer Marketing · HR · ORM",
        type: "Full-time",
        period: "Feb 2026 — Sep 2026 · 8 mos",
      },
      {
        title: "Senior — Founder's Office · HR & ORM",
        type: "Full-time",
        period: "Nov 2025 — Feb 2026 · 4 mos",
      },
      {
        title: "Founder's Office & Human Resource",
        type: "Full-time",
        period: "Mar 2025 — Nov 2025 · 9 mos",
      },
      {
        title: "Founder's Office Intern",
        type: "Internship",
        period: "Jan 2025 — Mar 2025 · 3 mos",
      },
    ],
  },
  {
    company: "Bling Square Events",
    role: "Growth Strategist Intern",
    period: "June 2025 — Aug 2025",
    body: "Growth and partnerships — engaging clients and prospects to deepen existing relationships and open new opportunities.",
  },
  {
    company: "Fingrowth Media",
    role: "Digital Marketing Intern",
    period: "Nov 2024 — Dec 2024",
    body: "Researched marketing campaigns across the globe and turned the insights into sharp, scroll-stopping scripts for social content.",
  },
  {
    company: "Schbang",
    role: "Learning & Development Intern",
    period: "Oct 2024 — Nov 2024",
    body: "Inside one of India's leading creative and digital agencies — helping plan external training programs and sharpening how teams learn and grow.",
  },
  {
    company: "Barcode Entertainment",
    role: "Human Resources Trainee · Strategic Brand Solutions",
    period: "Aug 2024",
    body: "A first run at people operations — HRIS, recruitment support, and the systems behind a growing brand-solutions team.",
  },
  {
    company: "Collective Artists Network",
    role: "Human Resource Intern",
    period: "May 2024 — Aug 2024",
    body: "Supported people operations at a talent and creator powerhouse — recruitment, records, and the human side of scale.",
  },
];

/** Remarkable moments — photo-driven highlights. */
export const momentsIntro = "People. Platforms. Perspectives. A more grounded me.";

export const moments = [
  {
    src: "/photos/moment-ogilvy.jpeg",
    title: "Met VR Rajesh, Group CEO of Ogilvy India",
    caption:
      "A conversation that stretches how you see things — the kind that leaves you with new perspectives.",
    alt: "Romil Lodaya standing in front of a large red Ogilvy sign, looking up",
    size: "tall",
  },
  {
    src: "/photos/moment-esummit.jpeg",
    title: "E-Summit 2025 — Gen E",
    caption:
      "Celebrating National Entrepreneurship Day and the era of the entrepreneur.",
    alt: "Romil Lodaya in a blazer beside an E-Summit 2025 screen at an entrepreneurship event",
    size: "wide",
  },
  {
    src: "/photos/moment-marina.jpeg",
    title: "On to bigger things",
    caption: "More ideas. More people. More impact.",
    alt: "Romil Lodaya by a marina at night, city lights reflecting on the water",
    size: "tall",
  },
  {
    src: "/photos/moment-sammie-social-samosa.png",
    title: "Sammie by Social Samosa",
    caption:
      "At the Best Social Media Brands Summit, co-powered by Snapchat — rooms full of the people shaping the feed.",
    alt: "Romil Lodaya smiling and giving a thumbs up in front of the Sammie by Social Samosa summit display",
    size: "wide",
  },
  {
    src: "/photos/moment-rotaract.jpeg",
    title: "On the mic — Rotaract, Mumbai Salt City",
    caption: "Speaking to a room, not at it.",
    alt: "Romil Lodaya speaking into a microphone at a Rotaract Club of Mumbai Salt City podium",
    size: "square",
  },
  {
    src: "/photos/moment-grass.jpeg",
    title: "Same energy, always",
    caption: "The work is serious. Taking yourself too seriously isn't.",
    alt: "Romil Lodaya lying on grass in sunlight, smiling and making a peace sign",
    size: "square",
  },
] as const;

/**
 * Brands worked with — logo + name marquee.
 * Drop transparent logo files (PNG or SVG) into public/logos/ using the
 * filenames below; each appears before the name automatically. If a file is
 * missing it's hidden gracefully and just the name shows.
 */
export const brands = [
  { name: "Malbros Furnitures", logo: "/logos/malbros.webp" },
  { name: "Collective Artists Network", logo: "/logos/collective.webp" },
  { name: "Izzari", logo: "/logos/izzari.avif" },
  { name: "Vahdam Teas", logo: "/logos/vahdam.webp" },
  { name: "Zenner", logo: "/logos/zenner.webp" },
  { name: "Avaya", logo: "/logos/avaya.webp" },
  { name: "Billcut", logo: "/logos/billcut.jpeg" },
  { name: "Schbang", logo: "/logos/schbang.webp" },
  { name: "Penguin Random House", logo: "/logos/penguin-random-house.webp" },
] as const;

/** Impact stats band — edit the numbers/labels as the work grows. */
export const stats = [
  { value: "3,500+", label: "Community comments moderated at scale", accent: "blue" },
  { value: "9", label: "Brands & teams worked with", accent: "orange" },
  { value: "6", label: "Companies across strategy, marketing & HR", accent: "green" },
  { value: "2+ yrs", label: "Building brands, teams & systems", accent: "pink" },
] as const;

/** Services — "work with me" offerings, drawn from the three pillars. */
export const servicesIntro = "Three ways we can work together.";
export const services = [
  {
    no: "01",
    title: "Brand & Growth Strategy",
    body: "Positioning, messaging, and a clear plan to grow — turning chaos into an actionable roadmap you can run with.",
    accent: "blue",
  },
  {
    no: "02",
    title: "Content & Campaigns",
    body: "Social content, campaigns, and copy that connect, convert, and build a brand people actually remember.",
    accent: "orange",
  },
  {
    no: "03",
    title: "People & Operations",
    body: "Hiring, culture, and the systems behind a growing team — bringing out the best in the people doing the work.",
    accent: "purple",
  },
] as const;
export const servicesCta = "Have a brand to build?";

/**
 * Tools used — icon grid. `slug` maps to a mark in components/ui/BrandLogos;
 * `color` is each brand's official hex (Simple Icons), used to tint the logo.
 */
export const tools = [
  { name: "Google Workspace", slug: "google", color: "#4285F4" },
  { name: "Notion", slug: "notion", color: "#0B0B0F" },
  { name: "Claude", slug: "claude", color: "#D97757" },
  { name: "OpenAI", slug: "openai", color: "#0D0D0D" },
  { name: "Canva", slug: "canva", color: "#00C4CC" },
  { name: "Meta Business Suite", slug: "meta", color: "#0866FF" },
  { name: "Slack", slug: "slack", color: "#4A154B" },
  { name: "Trello", slug: "trello", color: "#0052CC" },
] as const;

/** Contact link cards. URLs not present in source material. */
export const contact = {
  headline: "On to bigger things.",
  sub: "More ideas. More people. More impact. Together?",
  closer: "Let's connect. Let's grow. Let's build.",
  links: [
    {
      label: "Website",
      handle: "romil-lodaya.vercel.app",
      href: "https://romil-lodaya.vercel.app/",
      accent: "electric",
    },
    {
      label: "Instagram",
      handle: "@romil_07",
      href: "https://www.instagram.com/romil_07/",
      accent: "pop-purple",
    },
    {
      label: "LinkedIn",
      handle: "/in/romil-lodaya07",
      href: "https://www.linkedin.com/in/romil-lodaya07",
      accent: "electric",
    },
    {
      label: "Email",
      handle: "romil.lodaya07@gmail.com",
      href: "mailto:romil.lodaya07@gmail.com",
      accent: "gold",
    },
  ],
} as const;

export const footer = {
  tagline: "Build. Create. Grow.",
  builtBy: "Crafted by Tanish Momaya™",
  year: new Date().getFullYear(),
} as const;

/** Routes for the multi-page nav. */
export const navRoutes = [
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/moments", label: "Moments" },
  { href: "/contact", label: "Contact" },
] as const;

/** Home explore cards — big links into the site. */
export const explore = [
  {
    href: "/about",
    label: "About",
    line: "Builder. Creator. Dreamer.",
    accent: "electric",
  },
  {
    href: "/work",
    label: "Work",
    line: "Strategy, marketing & people.",
    accent: "gold",
  },
  {
    href: "/moments",
    label: "Moments",
    line: "People. Platforms. Perspectives.",
    accent: "purple",
  },
  {
    href: "/contact",
    label: "Contact",
    line: "Let's connect. Let's build.",
    accent: "red",
  },
] as const;
