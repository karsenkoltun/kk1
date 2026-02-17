"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Lightbulb,
  Users,
  Target,
  Instagram,
  Linkedin,
  Mail,
} from "lucide-react";
import AnimateIn from "@/components/ui/AnimateIn";

/* ──────────────────────────────────────────────
   Data
   ────────────────────────────────────────────── */

const timeline = [
  {
    year: "2016",
    title: "Started in Marketing",
    description:
      "Entered the digital marketing space and began learning the craft of storytelling, content strategy, and brand building from the ground up.",
  },
  {
    year: "2018",
    title: "Founded Agency",
    description:
      "Launched a full-service marketing agency, partnering with premium brands to create campaigns that drive real results.",
  },
  {
    year: "2020",
    title: "Moved to Kelowna",
    description:
      "Relocated to the Okanagan and fell in love with Kelowna — its mountains, lake lifestyle, and tight-knit community.",
  },
  {
    year: "2022",
    title: "Got Real Estate License",
    description:
      "Earned my real estate license and brought a marketing-first approach to an industry ready for disruption.",
  },
  {
    year: "2023",
    title: "Founded Kelowna Founders Club",
    description:
      "Created a curated community for ambitious entrepreneurs, founders, and professionals building in the Okanagan.",
  },
  {
    year: "2024",
    title: "Launched KK Real Estate Brand",
    description:
      "Brought together real estate, marketing, and community under one premium brand — Karsen Koltun Real Estate.",
  },
];

const stats = [
  { value: "300+", label: "Homes" },
  { value: "8+", label: "Years" },
  { value: "$150M+", label: "Volume" },
  { value: "5.0", label: "Google Rating" },
];

const values = [
  {
    icon: Award,
    title: "Integrity",
    description:
      "Every decision is guided by honesty and transparency. I treat every client relationship like a long-term partnership, not a transaction.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "I bring a marketing-first, technology-forward approach to real estate that sets listings apart and reaches the right buyers faster.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "From the Founders Club to local partnerships, I invest in the people and places that make the Okanagan extraordinary.",
  },
  {
    icon: Target,
    title: "Excellence",
    description:
      "Every listing, every campaign, every interaction is held to the highest standard. Good enough is never good enough.",
  },
];

const ventures = [
  {
    title: "Real Estate",
    description:
      "Helping buyers and sellers across the Okanagan with a marketing-first approach that gets results.",
    href: "/sell",
    tag: "Core",
  },
  {
    title: "Kelowna Founders Club",
    description:
      "A curated community for ambitious entrepreneurs, founders, and professionals building in the Okanagan.",
    href: "/about/founders-club",
    tag: "Community",
  },
  {
    title: "Marketing Agency",
    description:
      "Full-service content and digital marketing for premium brands and businesses that want to stand out.",
    href: "/about/marketing",
    tag: "Agency",
  },
];

/* ──────────────────────────────────────────────
   Component
   ────────────────────────────────────────────── */

export default function AboutPageClient() {
  const [activeTimeline, setActiveTimeline] = useState<number | null>(null);

  return (
    <>
      {/* ───────── Hero ───────── */}
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-background">
        {/* Ambient blurs */}
        <div className="absolute top-1/4 left-1/3 h-[600px] w-[600px] rounded-full bg-accent/5 blur-[140px]" />
        <div className="absolute right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full bg-accent/3 blur-[100px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-20 lg:px-10">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Text */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-6 text-xs font-medium tracking-[0.3em] text-accent uppercase"
              >
                About Karsen
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="font-heading text-5xl font-light leading-[1.1] tracking-tight text-text-primary sm:text-6xl md:text-7xl"
              >
                Here&apos;s My{" "}
                <em className="italic text-accent">Story</em>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="mt-6 max-w-lg text-lg leading-relaxed text-text-secondary"
              >
                Real estate agent, marketer, and community builder based in
                Kelowna, BC. I bring a marketing-first approach to everything
                I do.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.8 }}
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-3 border border-accent bg-accent px-8 py-4 text-xs font-medium tracking-[0.2em] text-background uppercase transition-all duration-300 hover:bg-transparent hover:text-accent"
                >
                  Get in Touch
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.instagram.com/karsenkoltun/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center border border-border transition-all duration-300 hover:border-accent hover:text-accent"
                  >
                    <Instagram className="h-4 w-4 text-text-secondary" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/karsenkoltun/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center border border-border transition-all duration-300 hover:border-accent hover:text-accent"
                  >
                    <Linkedin className="h-4 w-4 text-text-secondary" />
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Photo placeholder with gold corner accents */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden border border-accent/20 bg-background-secondary lg:max-w-none">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div className="h-20 w-20 rounded-full border border-accent/30 bg-accent/5" />
                  <span className="text-sm tracking-widest text-text-muted uppercase">
                    Photo Coming Soon
                  </span>
                </div>
                {/* Gold corner accents */}
                <div className="absolute top-0 left-0 h-20 w-20 border-t-2 border-l-2 border-accent" />
                <div className="absolute top-0 right-0 h-20 w-20 border-t-2 border-r-2 border-accent" />
                <div className="absolute bottom-0 left-0 h-20 w-20 border-b-2 border-l-2 border-accent" />
                <div className="absolute right-0 bottom-0 h-20 w-20 border-r-2 border-b-2 border-accent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───────── By The Numbers ───────── */}
      <section className="border-y border-border bg-background-secondary py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, i) => (
              <AnimateIn key={stat.label} delay={i * 0.1}>
                <div className="text-center">
                  <p className="font-heading text-4xl font-light tracking-tight text-accent md:text-5xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-xs font-medium tracking-[0.2em] text-text-muted uppercase">
                    {stat.label}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Story — The Beginning ───────── */}
      <section className="bg-background py-16 md:py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid items-center gap-12 lg:gap-20 lg:grid-cols-2">
            {/* Text */}
            <AnimateIn direction="left">
              <div className="space-y-8">
                <div>
                  <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
                    The Beginning
                  </p>
                  <h2 className="mt-4 font-heading text-4xl font-light leading-[1.15] tracking-tight text-text-primary md:text-5xl">
                    Built Different
                  </h2>
                </div>
                <div className="space-y-6">
                  <p className="text-base leading-[1.8] text-text-secondary">
                    I grew up in British Columbia — small towns, big mountains,
                    and an environment that taught me the value of hard work
                    early on. I went to university at UBCO in Kelowna, where I
                    fell in love with the Okanagan and decided this was the
                    place I wanted to build my life.
                  </p>
                  <p className="text-base leading-[1.8] text-text-secondary">
                    Before real estate, I built a marketing agency from the
                    ground up. Over 8 years in digital marketing, I&apos;ve
                    helped brands tell their stories, generate demand, and
                    grow — producing content and campaigns for 300+ homes
                    across British Columbia. That experience shaped everything
                    about how I approach selling real estate today.
                  </p>
                  <p className="text-base leading-[1.8] text-text-secondary">
                    When I got my real estate license, I didn&apos;t leave
                    marketing behind — I brought it with me. Every listing I
                    take on gets the full agency treatment: professional media,
                    strategic positioning, and distribution that actually
                    reaches buyers.
                  </p>
                </div>
                {/* Decorative line */}
                <div className="flex items-center gap-4 pt-2">
                  <div className="h-px w-12 bg-accent" />
                  <p className="text-xs font-medium tracking-[0.2em] text-accent uppercase">
                    Marketing Meets Real Estate
                  </p>
                </div>
              </div>
            </AnimateIn>

            {/* Second Photo Placeholder */}
            <AnimateIn direction="right">
              <div className="relative aspect-square w-full overflow-hidden border border-accent/20 bg-background-secondary">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm tracking-widest text-text-muted uppercase">
                    Photo Coming Soon
                  </span>
                </div>
                <div className="absolute top-0 left-0 h-16 w-16 border-t-2 border-l-2 border-accent" />
                <div className="absolute right-0 bottom-0 h-16 w-16 border-r-2 border-b-2 border-accent" />
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ───────── Timeline — The Journey ───────── */}
      <section className="bg-background-secondary py-16 md:py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <AnimateIn>
            <div className="mb-12 text-center md:mb-20">
              <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
                The Journey
              </p>
              <h2 className="mt-4 font-heading text-4xl font-light tracking-tight text-text-primary md:text-5xl">
                Key Milestones
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-text-secondary">
                From marketing to real estate to community building — every
                step has been intentional.
              </p>
            </div>
          </AnimateIn>

          {/* Timeline Grid */}
          <div className="relative">
            {/* Center line (desktop) */}
            <div className="absolute top-0 left-1/2 hidden h-full w-px -translate-x-1/2 bg-border lg:block" />

            <div className="space-y-8 lg:space-y-16">
              {timeline.map((item, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <AnimateIn
                    key={item.year}
                    delay={i * 0.1}
                    direction={isLeft ? "left" : "right"}
                  >
                    <div
                      className="relative lg:grid lg:grid-cols-2 lg:gap-12"
                      onMouseEnter={() => setActiveTimeline(i)}
                      onMouseLeave={() => setActiveTimeline(null)}
                    >
                      {/* Content — alternates left/right on desktop */}
                      <div
                        className={`${
                          isLeft
                            ? "lg:col-start-1 lg:text-right lg:pr-16"
                            : "lg:col-start-2 lg:pl-16"
                        }`}
                      >
                        <div
                          className={`border border-border bg-background p-8 transition-all duration-500 ${
                            activeTimeline === i
                              ? "border-accent/40 shadow-[0_0_40px_rgba(201,168,76,0.08)]"
                              : ""
                          }`}
                        >
                          <span className="font-heading text-3xl font-light text-accent">
                            {item.year}
                          </span>
                          <h3 className="mt-3 font-heading text-xl font-medium text-text-primary">
                            {item.title}
                          </h3>
                          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      {/* Empty column for the other side */}
                      {isLeft ? (
                        <div className="hidden lg:col-start-2 lg:block" />
                      ) : (
                        <div className="hidden lg:col-start-1 lg:row-start-1 lg:block" />
                      )}

                      {/* Center dot */}
                      <div className="absolute top-8 left-1/2 hidden h-4 w-4 -translate-x-1/2 lg:block">
                        <div
                          className={`h-full w-full rounded-full border-2 transition-all duration-500 ${
                            activeTimeline === i
                              ? "border-accent bg-accent"
                              : "border-accent/50 bg-background-secondary"
                          }`}
                        />
                      </div>
                    </div>
                  </AnimateIn>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Story Continued — Building With Intention ───────── */}
      <section className="bg-background py-16 md:py-28 lg:py-36">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <AnimateIn>
            <div className="text-center">
              <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
                Beyond the Business
              </p>
              <h2 className="mt-4 font-heading text-4xl font-light tracking-tight text-text-primary md:text-5xl">
                Building With Intention
              </h2>
            </div>
            <div className="mt-12 space-y-8">
              <p className="text-center text-lg leading-[1.9] text-text-secondary">
                Real estate is what I do, but it&apos;s not all I am. I
                started the Kelowna Founders Club because I believe the
                Okanagan is one of the most underrated ecosystems for ambitious
                people. The club brings together entrepreneurs, creators, and
                professionals who are building something meaningful — and who
                want to do it alongside others on the same path.
              </p>
              <p className="text-center text-lg leading-[1.9] text-text-secondary">
                When I&apos;m not working, you&apos;ll find me exploring
                everything the Okanagan has to offer — hiking the trails, out
                on the lake, or checking out a new restaurant in town. I
                believe in building a life you don&apos;t need a vacation from,
                and Kelowna makes that easy.
              </p>
              <p className="text-center text-lg leading-[1.9] text-text-secondary">
                Everything I build — in real estate, in marketing, in
                community — comes back to the same idea: do it with intention,
                do it at a high level, and make it mean something.
              </p>
            </div>
            {/* Decorative divider */}
            <div className="mt-12 flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-accent/40" />
              <div className="h-2 w-2 rotate-45 border border-accent/40" />
              <div className="h-px w-16 bg-accent/40" />
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ───────── Core Values ───────── */}
      <section className="bg-background-secondary py-16 md:py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <AnimateIn>
            <div className="mb-12 text-center md:mb-20">
              <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
                What I Stand For
              </p>
              <h2 className="mt-4 font-heading text-4xl font-light tracking-tight text-text-primary md:text-5xl">
                Core Values
              </h2>
            </div>
          </AnimateIn>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => (
              <AnimateIn key={value.title} delay={i * 0.1}>
                <div className="group flex h-full flex-col border border-border bg-background p-8 transition-all duration-500 hover:border-accent/30 hover:shadow-[0_0_40px_rgba(201,168,76,0.06)]">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center border border-accent/20 bg-accent/5 transition-all duration-500 group-hover:border-accent/40 group-hover:bg-accent/10">
                    <value.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-heading text-xl font-medium text-text-primary">
                    {value.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary">
                    {value.description}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Ventures ───────── */}
      <section className="bg-background py-16 md:py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <AnimateIn>
            <div className="text-center">
              <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
                The Ventures
              </p>
              <h2 className="mt-4 font-heading text-4xl font-light tracking-tight text-text-primary md:text-5xl">
                What I&apos;m Working On
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-text-secondary">
                Three interconnected ventures, one mission — to build
                something meaningful in the Okanagan.
              </p>
            </div>
          </AnimateIn>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {ventures.map((venture, i) => (
              <AnimateIn key={venture.title} delay={i * 0.12}>
                <Link href={venture.href} className="group block h-full">
                  <div className="flex h-full flex-col overflow-hidden border border-border bg-background-secondary transition-all duration-500 hover:border-accent/30">
                    {/* Image Placeholder */}
                    <div className="relative flex h-56 items-center justify-center bg-background">
                      <span className="text-xs tracking-widest text-text-muted uppercase">
                        Image Coming Soon
                      </span>
                      {/* Tag */}
                      <div className="absolute top-4 left-4 border border-accent/30 bg-background/80 px-3 py-1 text-[10px] font-medium tracking-[0.2em] text-accent uppercase backdrop-blur-sm">
                        {venture.tag}
                      </div>
                    </div>
                    {/* Content */}
                    <div className="flex flex-1 flex-col p-8">
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
                  </div>
                </Link>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Let's Connect CTA ───────── */}
      <section className="relative overflow-hidden bg-background-secondary py-16 md:py-28 lg:py-36">
        {/* Ambient accent glow */}
        <div className="absolute top-1/2 left-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-[150px]" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center lg:px-10">
          <AnimateIn>
            <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
              Next Step
            </p>
            <h2 className="mt-4 font-heading text-4xl font-light tracking-tight text-text-primary md:text-5xl lg:text-6xl">
              Let&apos;s <em className="italic text-accent">Connect</em>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
              Whether you&apos;re looking to buy, sell, or just want to
              connect — I&apos;m always happy to chat. Reach out and
              let&apos;s see how I can help.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 border border-accent bg-accent px-10 py-4 text-xs font-medium tracking-[0.2em] text-background uppercase transition-all duration-300 hover:bg-transparent hover:text-accent"
              >
                Let&apos;s Talk
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a
                href="mailto:karsen@karsenkoltun.com"
                className="group inline-flex items-center gap-3 border border-border px-10 py-4 text-xs font-medium tracking-[0.2em] text-text-primary uppercase transition-all duration-300 hover:border-accent hover:text-accent"
              >
                <Mail className="h-3.5 w-3.5" />
                Email Me
              </a>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
