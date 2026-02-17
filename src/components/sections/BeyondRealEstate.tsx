"use client";

import Link from "next/link";
import { ArrowRight, Users, Megaphone } from "lucide-react";
import AnimateIn from "@/components/ui/AnimateIn";

const ventures = [
  {
    icon: Users,
    title: "Kelowna Founders Club",
    description:
      "Connecting Kelowna's next generation of entrepreneurs. Monthly events, guest speakers, and a community built on growth.",
    href: "/about/founders-club",
    cta: "Learn More",
  },
  {
    icon: Megaphone,
    title: "Marketing with KK",
    description:
      "Helping brands grow through digital marketing. Strategy, content, and paid media across real estate, hospitality, fitness, and tech.",
    href: "/about/marketing",
    cta: "Work Together",
  },
];

export default function BeyondRealEstate() {
  return (
    <section className="bg-background-secondary py-24 md:py-32">
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

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {ventures.map((venture, i) => (
            <AnimateIn key={venture.title} delay={i * 0.15}>
              <Link
                href={venture.href}
                className="group block border border-border bg-background p-10 transition-all duration-500 hover:border-accent/30"
              >
                <venture.icon className="h-8 w-8 text-accent" />
                <h3 className="mt-6 font-heading text-2xl font-medium tracking-tight text-text-primary transition-colors group-hover:text-accent md:text-3xl">
                  {venture.title}
                </h3>
                <p className="mt-4 leading-relaxed text-text-secondary">
                  {venture.description}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-xs font-medium tracking-[0.2em] text-accent uppercase">
                  {venture.cta}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
