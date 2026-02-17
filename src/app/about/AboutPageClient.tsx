"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import AnimateIn from "@/components/ui/AnimateIn";

const ventures = [
  {
    title: "Real Estate",
    description:
      "Helping buyers and sellers across the Okanagan with a marketing-first approach that gets results.",
    href: "/sell",
  },
  {
    title: "Kelowna Founders Club",
    description:
      "A curated community for ambitious entrepreneurs, founders, and professionals building in the Okanagan.",
    href: "/about/founders-club",
  },
  {
    title: "Marketing Agency",
    description:
      "Full-service content and digital marketing for premium brands and businesses that want to stand out.",
    href: "/about/marketing",
  },
];

export default function AboutPageClient() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-background">
        <div className="absolute top-1/4 left-1/3 h-[500px] w-[500px] rounded-full bg-accent/5 blur-[120px]" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 pt-24 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6 text-xs font-medium tracking-[0.3em] text-accent uppercase"
          >
            About
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="font-heading text-5xl font-light leading-[1.1] tracking-tight text-text-primary sm:text-6xl md:text-7xl"
          >
            Here&apos;s My <em className="italic text-accent">Story</em>
          </motion.h1>
        </div>
      </section>

      {/* Story — Photo + Text */}
      <section className="bg-background py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Photo Placeholder */}
            <AnimateIn direction="left">
              <div className="relative aspect-[3/4] w-full overflow-hidden border border-accent/30 bg-background-secondary">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm tracking-widest text-text-muted uppercase">
                    Photo Coming Soon
                  </span>
                </div>
                {/* Gold corner accents */}
                <div className="absolute top-0 left-0 h-16 w-16 border-t-2 border-l-2 border-accent" />
                <div className="absolute right-0 bottom-0 h-16 w-16 border-r-2 border-b-2 border-accent" />
              </div>
            </AnimateIn>

            {/* Text */}
            <AnimateIn direction="right">
              <div className="space-y-6">
                <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
                  The Beginning
                </p>
                <h2 className="font-heading text-4xl font-light tracking-tight text-text-primary md:text-5xl">
                  Built Different
                </h2>
                <p className="text-base leading-relaxed text-text-secondary">
                  I grew up in British Columbia — small towns, big mountains, and an
                  environment that taught me the value of hard work early on. I went
                  to university at UBCO in Kelowna, where I fell in love with the
                  Okanagan and decided this was the place I wanted to build my life.
                </p>
                <p className="text-base leading-relaxed text-text-secondary">
                  Before real estate, I built a marketing agency from the ground up.
                  Over 8 years in digital marketing, I&apos;ve helped brands tell
                  their stories, generate demand, and grow — producing content and
                  campaigns for 300+ homes across British Columbia. That experience
                  shaped everything about how I approach selling real estate today.
                </p>
                <p className="text-base leading-relaxed text-text-secondary">
                  When I got my real estate license, I didn&apos;t leave marketing
                  behind — I brought it with me. Every listing I take on gets the
                  full agency treatment: professional media, strategic positioning,
                  and distribution that actually reaches buyers.
                </p>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* Story Continued */}
      <section className="bg-background-secondary py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
          <AnimateIn>
            <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
              Beyond the Business
            </p>
            <h2 className="mt-4 font-heading text-4xl font-light tracking-tight text-text-primary md:text-5xl">
              Building With Intention
            </h2>
            <p className="mt-8 text-base leading-relaxed text-text-secondary">
              Real estate is what I do, but it&apos;s not all I am. I started the
              Kelowna Founders Club because I believe the Okanagan is one of the
              most underrated ecosystems for ambitious people. The club brings
              together entrepreneurs, creators, and professionals who are building
              something meaningful — and who want to do it alongside others on the
              same path.
            </p>
            <p className="mt-6 text-base leading-relaxed text-text-secondary">
              When I&apos;m not working, you&apos;ll find me exploring everything
              the Okanagan has to offer — hiking the trails, out on the lake, or
              checking out a new restaurant in town. I believe in building a life
              you don&apos;t need a vacation from, and Kelowna makes that easy.
            </p>
            <p className="mt-6 text-base leading-relaxed text-text-secondary">
              Everything I build — in real estate, in marketing, in community —
              comes back to the same idea: do it with intention, do it at a high
              level, and make it mean something.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* What I'm Working On */}
      <section className="bg-background py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <AnimateIn>
            <div className="text-center">
              <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
                The Ventures
              </p>
              <h2 className="mt-4 font-heading text-4xl font-light tracking-tight text-text-primary md:text-5xl">
                What I&apos;m Working On
              </h2>
            </div>
          </AnimateIn>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ventures.map((venture, i) => (
              <AnimateIn key={venture.title} delay={i * 0.1}>
                <Link href={venture.href} className="group block h-full">
                  <div className="flex h-full flex-col border border-border bg-background-secondary p-10 transition-all duration-500 hover:border-accent/30">
                    <h3 className="font-heading text-2xl font-medium text-text-primary">
                      {venture.title}
                    </h3>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-text-secondary">
                      {venture.description}
                    </p>
                    <div className="mt-8 inline-flex items-center gap-2 text-xs font-medium tracking-[0.2em] text-accent uppercase">
                      Learn More
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
