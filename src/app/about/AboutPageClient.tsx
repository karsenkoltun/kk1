"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Lightbulb,
  Users,
  Target,
  Mail,
} from "lucide-react";
import AnimateIn from "@/components/ui/AnimateIn";
import { Timeline } from "@/components/ui/timeline";

/* ──────────────────────────────────────────────
   Data
   ────────────────────────────────────────────── */

const timelineData = [
  {
    title: "2024",
    content: (
      <div>
        <p className="mb-4 font-heading text-xl font-medium text-text-primary md:text-2xl">
          KK Real Estate Brand
        </p>
        <p className="mb-8 text-sm leading-relaxed text-text-secondary md:text-base">
          Brought together real estate, marketing, and community under one
          premium brand. Launched karsenkoltun.ca as the digital home for a
          new era of strategic, luxury-focused real estate in the Okanagan.
        </p>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex h-28 items-center justify-center rounded-lg border border-warm/10 bg-background shadow-[0_0_24px_rgba(232,213,163,0.04)] sm:h-36 md:h-44 lg:h-60"
            >
              <span className="text-[10px] tracking-widest text-text-muted/40 uppercase">
                Photo {i}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "2023",
    content: (
      <div>
        <p className="mb-4 font-heading text-xl font-medium text-text-primary md:text-2xl">
          Kelowna Founders Club
        </p>
        <p className="mb-4 text-sm leading-relaxed text-text-secondary md:text-base">
          Created a curated community for ambitious entrepreneurs, founders,
          and professionals in the Okanagan. Built to connect people who are
          building something meaningful — and want to do it together.
        </p>
        <p className="mb-8 text-sm leading-relaxed text-text-secondary md:text-base">
          What started as an idea to bring together like-minded people became
          one of the most talked-about private communities in the region.
        </p>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex h-28 items-center justify-center rounded-lg border border-accent/10 bg-background shadow-[0_0_24px_rgba(126,200,227,0.04)] sm:h-36 md:h-44 lg:h-60"
            >
              <span className="text-[10px] tracking-widest text-text-muted/40 uppercase">
                Photo {i}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "2022",
    content: (
      <div>
        <p className="mb-4 font-heading text-xl font-medium text-text-primary md:text-2xl">
          Top Producer
        </p>
        <p className="mb-8 text-sm leading-relaxed text-text-secondary md:text-base">
          Recognized as one of Kelowna&apos;s top-producing agents with over
          $150M+ in career volume. Built on referrals, reputation, and a
          marketing-first approach that sets listings apart.
        </p>
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <span className="text-warm">&#10003;</span> $150M+ in career sales volume
          </div>
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <span className="text-warm">&#10003;</span> 300+ families helped buy &amp; sell
          </div>
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <span className="text-warm">&#10003;</span> 5.0 Google rating from real clients
          </div>
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <span className="text-warm">&#10003;</span> Royal LePage top performer
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "2018",
    content: (
      <div>
        <p className="mb-4 font-heading text-xl font-medium text-text-primary md:text-2xl">
          Founded Marketing Agency
        </p>
        <p className="mb-8 text-sm leading-relaxed text-text-secondary md:text-base">
          Launched a full-service marketing agency, partnering with premium
          brands to create campaigns that drive real results. Brought the
          same strategic, design-forward approach from real estate into the
          broader business world.
        </p>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="flex h-28 items-center justify-center rounded-lg border border-warm/10 bg-background shadow-[0_0_24px_rgba(232,213,163,0.04)] sm:h-36 md:h-44 lg:h-60"
            >
              <span className="text-[10px] tracking-widest text-text-muted/40 uppercase">
                Photo {i}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "2015",
    content: (
      <div>
        <p className="mb-4 font-heading text-xl font-medium text-text-primary md:text-2xl">
          Entered Real Estate
        </p>
        <p className="mb-8 text-sm leading-relaxed text-text-secondary md:text-base">
          Started my real estate career and sold over $10 million in home
          sales in my first year. Knew from day one this was more than a
          job — it was a calling.
        </p>
      </div>
    ),
  },
  {
    title: "Roots",
    content: (
      <div>
        <p className="mb-4 font-heading text-xl font-medium text-text-primary md:text-2xl">
          Born &amp; Raised in Kelowna
        </p>
        <p className="mb-8 text-sm leading-relaxed text-text-secondary md:text-base">
          Growing up around the business, I learned the value of real estate
          and hard work at a young age. The Okanagan isn&apos;t just where I
          work — it&apos;s home. That local knowledge and deep connection to
          this community is what sets me apart.
        </p>
      </div>
    ),
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
  return (
    <>
      {/* ───────── Hero — Full-width cinematic ───────── */}
      <section className="relative flex min-h-[85vh] items-end overflow-hidden bg-background">
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #0C1220 0%, #1a2744 30%, #1e293b 60%, #111827 100%)",
          }}
        />
        <div className="absolute top-0 right-0 h-[500px] w-[600px] rounded-full bg-warm/4 blur-[150px]" />
        <div className="absolute bottom-0 left-1/3 h-[400px] w-[500px] rounded-full bg-accent/3 blur-[120px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

        {/* Navbar placeholder: subtle warm glow line at bottom */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(232,213,163,0.2) 30%, rgba(232,213,163,0.3) 50%, rgba(232,213,163,0.2) 70%, transparent)",
          }}
        />

        {/* Right side: Photo placeholder */}
        <div className="absolute top-0 right-0 hidden h-full w-1/2 lg:block">
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-32 w-32 rounded-full border border-warm/15 bg-warm/5" />
              <p className="mt-4 text-xs tracking-widest text-text-muted uppercase">
                Photo Coming Soon
              </p>
            </div>
          </div>
        </div>

        {/* Text content */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 pt-28 pb-16 sm:px-6 sm:pt-32 sm:pb-20 lg:px-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-heading text-sm tracking-[0.2em] text-warm/80 uppercase"
          >
            Karsen Koltun
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-4 max-w-lg font-heading text-5xl font-light italic leading-[1.1] tracking-tight text-text-primary sm:text-6xl md:text-7xl"
          >
            Guiding You to Strategic Real Estate Success.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-6 text-sm tracking-wider text-text-secondary"
          >
            Luxury Real Estate Broker &middot; Entrepreneur &middot; Kelowna
            Native
          </motion.p>
        </div>
      </section>

      {/* ───────── Meet Karsen Koltun ───────── */}
      <section className="bg-background py-16 md:py-28 lg:py-36">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
          <AnimateIn>
            <h2 className="font-heading text-4xl font-light tracking-tight text-text-primary md:text-5xl">
              Meet Karsen Koltun
            </h2>
            <p className="mt-4 text-text-secondary italic">
              A blend of luxury real estate expertise &amp; entrepreneurial drive
            </p>
            <div className="mx-auto mt-10 max-w-3xl space-y-6">
              <p className="text-base leading-[1.9] text-text-secondary">
                I&apos;m Karsen Koltun, and I live and breathe Kelowna. As a
                top-producing real estate broker and entrepreneur, I help clients
                and investors successfully navigate the competitive Okanagan
                market with a level of strategy you won&apos;t find anywhere
                else.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ───────── Journey Timeline (Aceternity scroll-animated) ───────── */}
      <section className="bg-background-secondary py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <AnimateIn>
            <div className="mb-4 text-center">
              <p className="text-xs font-medium tracking-[0.3em] text-warm uppercase">
                From Kelowna, For Kelowna
              </p>
              <h2 className="mt-4 font-heading text-4xl font-light tracking-tight text-text-primary md:text-5xl">
                My Journey
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-text-secondary">
                From growing up in the Okanagan to becoming one of Kelowna&apos;s
                top-producing agents — here&apos;s the story so far.
              </p>
            </div>
          </AnimateIn>
        </div>
        <Timeline data={timelineData} />
      </section>

      {/* ───────── By The Numbers ───────── */}
      <section className="border-y border-border bg-background py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, i) => (
              <AnimateIn key={stat.label} delay={i * 0.1}>
                <div className="text-center">
                  <p className="font-heading text-4xl font-light tracking-tight text-warm md:text-5xl">
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
              <div className="h-px w-16 bg-warm/40" />
              <div className="h-2 w-2 rotate-45 border border-warm/40" />
              <div className="h-px w-16 bg-warm/40" />
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
                <div className="group flex h-full flex-col border border-border bg-background p-8 transition-all duration-500 hover:border-warm/30 hover:shadow-[0_0_40px_rgba(232,213,163,0.06)]">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center border border-warm/20 bg-warm/5 transition-all duration-500 group-hover:border-warm/40 group-hover:bg-warm/10">
                    <value.icon className="h-6 w-6 text-warm" />
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
                  <div className="flex h-full flex-col overflow-hidden border border-border bg-background-secondary transition-all duration-500 hover:border-warm/30">
                    {/* Image Placeholder */}
                    <div className="relative flex h-56 items-center justify-center bg-background">
                      <span className="text-xs tracking-widest text-text-muted uppercase">
                        Image Coming Soon
                      </span>
                      {/* Tag */}
                      <div className="absolute top-4 left-4 border border-warm/30 bg-background/80 px-3 py-1 text-[10px] font-medium tracking-[0.2em] text-warm uppercase backdrop-blur-sm">
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
                      <div className="mt-8 inline-flex items-center gap-2 text-xs font-medium tracking-[0.2em] text-warm uppercase">
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
        {/* Ambient warm glow */}
        <div className="absolute top-1/2 left-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-warm/5 blur-[150px]" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center lg:px-10">
          <AnimateIn>
            <p className="text-xs font-medium tracking-[0.3em] text-warm uppercase">
              Next Step
            </p>
            <h2 className="mt-4 font-heading text-4xl font-light tracking-tight text-text-primary md:text-5xl lg:text-6xl">
              Let&apos;s <em className="italic text-warm">Connect</em>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
              Whether you&apos;re looking to buy, sell, or just want to
              connect — I&apos;m always happy to chat. Reach out and
              let&apos;s see how I can help.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 border border-warm bg-warm px-10 py-4 text-xs font-medium tracking-[0.2em] text-background uppercase transition-all duration-300 hover:bg-warm-hover hover:shadow-[0_0_20px_rgba(232,213,163,0.2)]"
              >
                Let&apos;s Talk
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a
                href="mailto:karsen@karsenkoltun.com"
                className="group inline-flex items-center gap-3 border border-border px-10 py-4 text-xs font-medium tracking-[0.2em] text-text-primary uppercase transition-all duration-300 hover:border-warm hover:text-warm"
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
