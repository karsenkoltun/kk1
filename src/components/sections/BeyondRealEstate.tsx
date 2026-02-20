"use client";

import Link from "next/link";
import { ArrowRight, Users, Megaphone, Camera } from "lucide-react";
import AnimateIn from "@/components/ui/AnimateIn";

const ventures = [
  {
    icon: Users,
    title: "Kelowna Founders Club",
    description:
      "Connecting Kelowna's next generation of entrepreneurs. Monthly events, guest speakers, and a community built on growth.",
    href: "/about",
    cta: "Learn More",
    imagePlaceholder: "Founders Club Event",
  },
  {
    icon: Megaphone,
    title: "Marketing Agency",
    description:
      "Founded a full-service marketing agency working with 30+ companies. From small startups to large corporations, scaling brands to profitability.",
    href: "/about",
    cta: "My Story",
    imagePlaceholder: "Marketing Campaign",
  },
  {
    icon: Camera,
    title: "Content & Social Media",
    description:
      "Building brands through storytelling. From property walkthroughs to lifestyle content, creating media that connects and converts.",
    href: "/about",
    cta: "See the Work",
    imagePlaceholder: "Content Creation",
  },
];

export default function BeyondRealEstate() {
  return (
    <section className="bg-background-secondary py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <AnimateIn>
          <div className="text-center">
            <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
              Beyond Real Estate
            </p>
            <h2 className="mt-4 font-heading text-4xl font-light tracking-tight text-text-primary md:text-5xl">
              More Than an Agent
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-text-secondary">
              Real estate is at the core, but there&apos;s more to the story.
            </p>
          </div>
        </AnimateIn>

        {/* Full-width alternating layout */}
        <div className="mt-16 space-y-8">
          {ventures.map((venture, i) => {
            const isReversed = i % 2 !== 0;

            return (
              <AnimateIn
                key={venture.title}
                delay={i * 0.15}
                direction={isReversed ? "right" : "left"}
              >
                <Link
                  href={venture.href}
                  className="group block border border-border bg-background transition-all duration-500 hover:border-accent/30"
                >
                  <div
                    className={`flex flex-col ${
                      isReversed ? "md:flex-row-reverse" : "md:flex-row"
                    }`}
                  >
                    {/* Image placeholder with overlay gradient */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-background-tertiary md:aspect-auto md:w-1/2">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs tracking-[0.3em] text-text-muted/40 uppercase">
                          {venture.imagePlaceholder}
                        </span>
                      </div>
                      {/* Overlay gradient */}
                      <div
                        className={`absolute inset-0 ${
                          isReversed
                            ? "bg-gradient-to-l from-background/60 via-transparent to-transparent"
                            : "bg-gradient-to-r from-background/60 via-transparent to-transparent"
                        } md:opacity-100`}
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-accent/0 transition-all duration-500 group-hover:bg-accent/5" />
                    </div>

                    {/* Content */}
                    <div className="flex w-full flex-col justify-center p-8 md:w-1/2 md:p-12 lg:p-16">
                      <venture.icon
                        className="h-8 w-8 text-accent"
                        strokeWidth={1.5}
                      />
                      <h3 className="mt-6 font-heading text-2xl font-medium tracking-tight text-text-primary transition-colors group-hover:text-accent md:text-3xl lg:text-4xl">
                        {venture.title}
                      </h3>
                      <p className="mt-4 max-w-md leading-relaxed text-text-secondary">
                        {venture.description}
                      </p>
                      <span className="mt-8 inline-flex items-center gap-2 text-xs font-medium tracking-[0.2em] text-accent uppercase">
                        {venture.cta}
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-2" />
                      </span>
                    </div>
                  </div>
                </Link>
              </AnimateIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
