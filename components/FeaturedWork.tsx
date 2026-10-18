import Image from "next/image";
import Link from "next/link";
import { brands } from "@/lib/content";
import { SectionHeading } from "./ui/SectionHeading";

export function FeaturedWork() {
  return (
    <section
      id="featured-work"
      aria-label="Featured work"
      className="relative overflow-hidden bg-[#faf4e6] py-20 sm:py-24"
    >
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-5 bg-[linear-gradient(135deg,#aeb8ff_25%,transparent_25%),linear-gradient(225deg,#aeb8ff_25%,transparent_25%)] bg-[length:28px_20px]" />
      <div className="mx-auto max-w-7xl px-5 pt-4 sm:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <SectionHeading kicker="Featured work" badgeClass="bg-pop-yellow text-ink">
              Ideas into action.
            </SectionHeading>
            <p className="mt-5 max-w-xl font-medium leading-relaxed text-ink/70">
              A few of the brands and teams I have had the chance to build with.
            </p>
          </div>
          <Link
            href="/work"
            className="inline-flex min-h-11 w-fit items-center gap-2 rounded-full border-2 border-ink bg-white px-5 py-2.5 text-sm font-black uppercase tracking-wide text-ink shadow-[3px_3px_0_0_#15121c] transition-transform hover:-translate-y-0.5 focus-visible:outline-offset-4"
          >
            See my work <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <ul className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {brands.slice(0, 3).map((brand) => (
            <li key={brand.name}>
              <Link
                href="/work"
                className="group flex min-h-28 items-center justify-between gap-4 rounded-2xl border-2 border-ink bg-white px-5 py-5 shadow-[4px_4px_0_0_#15121c] transition-transform hover:-translate-y-1 focus-visible:outline-offset-4 sm:px-6"
              >
                <span className="flex h-14 w-28 shrink-0 items-center justify-center rounded-xl bg-paper p-2">
                  <Image
                    src={brand.logo}
                    alt=""
                    width={112}
                    height={56}
                    className="max-h-12 w-full object-contain"
                  />
                </span>
                <span className="flex-1 font-display text-lg leading-tight text-ink sm:text-xl">
                  {brand.name}
                </span>
                <span aria-hidden="true" className="text-xl text-electric transition-transform group-hover:-translate-y-1 group-hover:translate-x-1">
                  ↗
                </span>
                <span className="sr-only">View related work</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
