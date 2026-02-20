"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Lightbulb,
  Users,
  Target,
  Mail,
  ExternalLink,
} from "lucide-react";
import AnimateIn from "@/components/ui/AnimateIn";
import { Timeline } from "@/components/ui/timeline";

/* ──────────────────────────────────────────────
   Reusable image grid component for timeline
   ────────────────────────────────────────────── */

function TimelineImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg border border-warm/10 bg-background shadow-[0_0_24px_rgba(232,213,163,0.04)] ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
      />
    </div>
  );
}

/* ──────────────────────────────────────────────
   Timeline Data — My Story
   ────────────────────────────────────────────── */

const timelineData = [
  {
    title: "Now",
    content: (
      <div>
        <p className="mb-4 font-heading text-xl font-medium text-text-primary md:text-2xl">
          A Prominent Brand in Kelowna
        </p>
        <p className="mb-8 text-sm leading-relaxed text-text-secondary md:text-base">
          Grown my real estate brand to be a prominent name in Kelowna — known
          for real estate and marketing. Combining strategic marketing expertise
          with deep local knowledge to deliver an experience that stands apart
          in the Okanagan market.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <TimelineImage
            src="/images/about/karsen-portrait-lights.jpg"
            alt="Karsen Koltun professional portrait"
            className="aspect-[3/4] sm:aspect-[3/4]"
          />
          <TimelineImage
            src="/images/about/karsen-portrait-peace.jpg"
            alt="Karsen Koltun portrait"
            className="aspect-[3/4] sm:aspect-[3/4]"
          />
        </div>
      </div>
    ),
  },
  {
    title: "Feb 2026",
    content: (
      <div>
        <p className="mb-4 font-heading text-xl font-medium text-text-primary md:text-2xl">
          Rookie of the Year
        </p>
        <p className="mb-4 text-sm leading-relaxed text-text-secondary md:text-base">
          Won Rookie of the Year at Royal LePage Kelowna — a recognition of
          the hustle, strategy, and results delivered since day one.
        </p>
        <a
          href="https://www.instagram.com/p/DUZHe1RkpNJ/"
          target="_blank"
          rel="noopener noreferrer"
          className="mb-8 inline-flex items-center gap-2 text-xs font-medium tracking-[0.15em] text-warm uppercase transition-colors hover:text-warm-hover"
        >
          View on Instagram
          <ExternalLink className="h-3 w-3" />
        </a>
        <div className="mt-4">
          <TimelineImage
            src="/images/about/rookie-of-the-year.jpg"
            alt="Karsen Koltun holding Royal LePage Rookie of the Year award"
            className="aspect-[4/3] max-w-md"
          />
        </div>
      </div>
    ),
  },
  {
    title: "Jan 2026",
    content: (
      <div>
        <p className="mb-4 font-heading text-xl font-medium text-text-primary md:text-2xl">
          Founders Club Event 2
        </p>
        <p className="mb-4 text-sm leading-relaxed text-text-secondary md:text-base">
          Hosted the second Kelowna Founders Club event — New Year 2026
          Kickoff. Continued building momentum for the entrepreneurial
          community in the Okanagan.
        </p>
        <a
          href="https://www.kelownafounders.club/event-details/new-year-2026-kickoff"
          target="_blank"
          rel="noopener noreferrer"
          className="mb-8 inline-flex items-center gap-2 text-xs font-medium tracking-[0.15em] text-warm uppercase transition-colors hover:text-warm-hover"
        >
          View Event Details
          <ExternalLink className="h-3 w-3" />
        </a>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <TimelineImage
            src="/images/about/event2-crowd.jpg"
            alt="Kelowna Founders Club Event 2 — audience"
            className="aspect-[4/3]"
          />
          <TimelineImage
            src="/images/about/event2-speaking.jpg"
            alt="Karsen speaking at Founders Club Event 2"
            className="aspect-[4/3]"
          />
        </div>
      </div>
    ),
  },
  {
    title: "Oct 2025",
    content: (
      <div>
        <p className="mb-4 font-heading text-xl font-medium text-text-primary md:text-2xl">
          Founders Club Event 1
        </p>
        <p className="mb-4 text-sm leading-relaxed text-text-secondary md:text-base">
          Launched the first ever Kelowna Founders Club event — a Halloween
          2025 Mastermind. Brought together driven entrepreneurs for an evening
          of connection and collaboration.
        </p>
        <a
          href="https://www.kelownafounders.club/event-details/halloween-2025-mastermind"
          target="_blank"
          rel="noopener noreferrer"
          className="mb-8 inline-flex items-center gap-2 text-xs font-medium tracking-[0.15em] text-warm uppercase transition-colors hover:text-warm-hover"
        >
          View Event Details
          <ExternalLink className="h-3 w-3" />
        </a>
        <div className="mt-4 space-y-4">
          <TimelineImage
            src="/images/about/event1-crowd.jpg"
            alt="Karsen presenting to a packed lecture hall at Founders Club Event 1"
            className="aspect-[16/9]"
          />
          <div className="grid grid-cols-2 gap-4">
            <TimelineImage
              src="/images/about/event1-audience.jpg"
              alt="Audience at Kelowna Founders Club Event 1"
              className="aspect-[4/3]"
            />
            <TimelineImage
              src="/images/about/event1-speaking.jpg"
              alt="Karsen speaking at Founders Club Event 1"
              className="aspect-[4/3]"
            />
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Aug 2025",
    content: (
      <div>
        <p className="mb-4 font-heading text-xl font-medium text-text-primary md:text-2xl">
          Founded the Kelowna Founders Club
        </p>
        <p className="mb-8 text-sm leading-relaxed text-text-secondary md:text-base">
          Began putting together a community of driven individuals to inspire
          the youth and grow businesses and entrepreneurs in the Okanagan.
          What started as an idea to connect like-minded people became one of
          the most talked-about communities in the region.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <TimelineImage
            src="/images/about/stage-speaking-1.jpg"
            alt="Karsen on stage speaking to audience"
            className="aspect-[3/4]"
          />
          <TimelineImage
            src="/images/about/stage-speaking-2.jpg"
            alt="Karsen speaking on stage"
            className="aspect-[3/4]"
          />
        </div>
      </div>
    ),
  },
  {
    title: "Dec 2024",
    content: (
      <div>
        <p className="mb-4 font-heading text-xl font-medium text-text-primary md:text-2xl">
          Founded a Marketing Agency
        </p>
        <p className="mb-8 text-sm leading-relaxed text-text-secondary md:text-base">
          Launched a marketing agency working with over 30 companies — from
          small startups to large corporations — scaling marketing initiatives
          and launching businesses to profitability through ads, social media,
          online presence, and other tactics. Grew the agency to a full-time
          team of 12.
        </p>
      </div>
    ),
  },
  {
    title: "Jul 2024",
    content: (
      <div>
        <p className="mb-4 font-heading text-xl font-medium text-text-primary md:text-2xl">
          Got My Real Estate License
        </p>
        <p className="mb-8 text-sm leading-relaxed text-text-secondary md:text-base">
          Became one of the youngest realtors in BC. After years of learning
          the industry from the inside, it was time to step into the role I
          was built for — helping people buy and sell homes with a
          marketing-first approach.
        </p>
      </div>
    ),
  },
  {
    title: "Aug 2018",
    content: (
      <div>
        <p className="mb-4 font-heading text-xl font-medium text-text-primary md:text-2xl">
          Joined Royal LePage Kelowna
        </p>
        <p className="mb-8 text-sm leading-relaxed text-text-secondary md:text-base">
          Got hired at Royal LePage Kelowna as an administrative assistant.
          Started learning the real estate business from the ground up —
          understanding the systems, the clients, and the strategies that make
          a brokerage run.
        </p>
      </div>
    ),
  },
  {
    title: "Jun 2005",
    content: (
      <div>
        <p className="mb-4 font-heading text-xl font-medium text-text-primary md:text-2xl">
          Born &amp; Raised in Kelowna
        </p>
        <p className="mb-8 text-sm leading-relaxed text-text-secondary md:text-base">
          Grew up in a family of real estate agents and was molded by the
          knowledge and culture of my mom Petrina Owen, a prominent real
          estate agent in Lake Country. The Okanagan isn&apos;t just where I
          work — it&apos;s home. That local knowledge and deep connection to
          this community is what sets me apart.
        </p>
      </div>
    ),
  },
];

const stats = [
  { value: "30+", label: "Companies Served" },
  { value: "12", label: "Agency Team" },
  { value: "20", label: "Years Old" },
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

        {/* Right side: Karsen portrait */}
        <div className="absolute top-0 right-0 hidden h-full w-1/2 lg:block">
          <Image
            src="/images/about/karsen-portrait-arms.jpg"
            alt="Karsen Koltun"
            fill
            className="object-cover object-top"
            sizes="50vw"
            priority
          />
          {/* Gradient overlay to blend into dark bg */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#111827] via-[#111827]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-[#0C1220]/40" />
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
                real estate agent, marketing agency founder, and community
                builder, I help clients and investors successfully navigate the
                competitive Okanagan market with a level of strategy you
                won&apos;t find anywhere else.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ───────── My Story Timeline ───────── */}
      <section className="bg-background-secondary py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <AnimateIn>
            <div className="mb-4 text-center">
              <p className="text-xs font-medium tracking-[0.3em] text-warm uppercase">
                From Kelowna, For Kelowna
              </p>
              <h2 className="mt-4 font-heading text-4xl font-light tracking-tight text-text-primary md:text-5xl">
                My Story
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-text-secondary">
                From growing up in a family of real estate agents to building a
                brand in Kelowna — here&apos;s the journey so far.
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
                href="mailto:karsen@royallepage.ca"
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
