"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import AnimateIn from "@/components/ui/AnimateIn";

export default function AboutPreview() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineWidth = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);

  return (
    <section ref={sectionRef} className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-16 md:grid-cols-2">
          {/* Photo placeholder with gold border offset */}
          <AnimateIn direction="left">
            <div className="relative mx-auto max-w-md md:mx-0">
              <div className="relative aspect-[3/4]">
                {/* Main photo container */}
                <div className="absolute inset-0 bg-gradient-to-br from-background-secondary to-background-tertiary" />

                {/* Placeholder text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs tracking-[0.3em] text-text-muted uppercase">
                    Photo of Karsen
                  </span>
                </div>

                {/* Gold border offset - bottom right */}
                <div className="absolute -bottom-4 -right-4 h-full w-full border border-accent/30" />

                {/* Second gold offset - top left for framing */}
                <div className="absolute -top-4 -left-4 h-24 w-24 border-t border-l border-accent/20" />
              </div>

              {/* Small gold accent dot */}
              <div className="absolute -bottom-8 -right-8 h-3 w-3 bg-accent/40" />
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

              {/* Animated accent line that draws on scroll */}
              <motion.div
                className="mt-6 h-px w-16 origin-left bg-accent/50"
                style={{ scaleX: lineWidth }}
              />

              <div className="mt-6 space-y-4 text-base leading-relaxed text-text-secondary">
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

              {/* Signature-style element */}
              <div className="mt-10 border-t border-border pt-6">
                <p className="font-heading text-2xl font-light italic tracking-wide text-text-muted/40">
                  — Karsen Koltun
                </p>
                <p className="mt-1 text-[10px] tracking-[0.3em] text-text-muted/30 uppercase">
                  Realtor &middot; Royal LePage
                </p>
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
