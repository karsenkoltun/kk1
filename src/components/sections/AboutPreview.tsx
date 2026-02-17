"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AnimateIn from "@/components/ui/AnimateIn";

export default function AboutPreview() {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-16 md:grid-cols-2">
          {/* Photo placeholder */}
          <AnimateIn direction="left">
            <div className="relative aspect-[3/4] max-w-md mx-auto md:mx-0">
              <div className="absolute inset-0 bg-gradient-to-br from-background-secondary to-background-tertiary" />
              {/* Gold accent border */}
              <div className="absolute -bottom-4 -right-4 h-full w-full border border-accent/30" />
              {/* Placeholder text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs tracking-[0.3em] text-text-muted uppercase">
                  Photo of Karsen
                </span>
              </div>
            </div>
          </AnimateIn>

          {/* Content */}
          <AnimateIn direction="right" delay={0.2}>
            <div>
              <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
                Who is Karsen Koltun
              </p>
              <h2 className="mt-4 font-heading text-4xl font-light leading-[1.2] tracking-tight text-text-primary md:text-5xl">
                Not Your Typical
                <br />
                <span className="italic text-accent">Real Estate Agent</span>
              </h2>
              <div className="mt-8 space-y-4 text-base leading-relaxed text-text-secondary">
                <p>
                  I&apos;ve spent 8+ years in marketing across real estate,
                  hospitality, fitness, and tech. I&apos;ve personally marketed
                  over 300 homes across British Columbia.
                </p>
                <p>
                  I bring a completely different approach to selling homes —
                  one rooted in strategy, content, and digital marketing. Not
                  just putting a sign on the lawn.
                </p>
                <p>
                  Whether you&apos;re buying your first home or selling your
                  forever home, I&apos;ll make sure you&apos;re taken care of.
                </p>
              </div>
              <Link
                href="/about"
                className="group mt-8 inline-flex items-center gap-3 text-sm font-medium tracking-[0.15em] text-accent uppercase transition-colors hover:text-accent-hover"
              >
                Read My Story
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
