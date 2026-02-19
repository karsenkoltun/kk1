"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Marquee } from "@/components/ui/Marquee";
import AnimateIn from "@/components/ui/AnimateIn";

/* ═══════════════════════════════════════════════════════════════
   Platform Logos (SVG inline — Google, RateMyAgent, Instagram,
   Facebook, LinkedIn)
   ═══════════════════════════════════════════════════════════════ */

function GoogleLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function InstagramLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FED373" />
          <stop offset="25%" stopColor="#F15245" />
          <stop offset="50%" stopColor="#D92E7F" />
          <stop offset="75%" stopColor="#9B36B7" />
          <stop offset="100%" stopColor="#515ECF" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="url(#ig-grad)" strokeWidth="2" />
      <circle cx="12" cy="12" r="5" stroke="url(#ig-grad)" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="url(#ig-grad)" />
    </svg>
  );
}

function FacebookLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.99 4.388 10.954 10.125 11.854V15.47H7.078V12h3.047V9.356c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.234 2.686.234v2.953H15.83c-1.491 0-1.956.925-1.956 1.875V12h3.328l-.532 3.47h-2.796v8.385C19.612 22.954 24 17.99 24 12z"
        fill="#1877F2"
      />
    </svg>
  );
}

function LinkedInLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM6.89 20.452H3.58V9h3.31v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
        fill="#0A66C2"
      />
    </svg>
  );
}

function RateMyAgentLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect x="1" y="1" width="22" height="22" rx="4" fill="#00B67A" />
      <path
        d="M12 5l1.76 3.56L17.5 9.2l-2.75 2.68.65 3.78L12 13.86l-3.4 1.8.65-3.78L6.5 9.2l3.74-.64L12 5z"
        fill="white"
      />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Testimonial Data — Real Reviews
   ═══════════════════════════════════════════════════════════════ */

interface Testimonial {
  name: string;
  role: string;
  quote: string;
}

const sellerTestimonials: Testimonial[] = [
  {
    name: "D. & L. M.",
    role: "Sellers",
    quote:
      "We were nervous about listing. Hadn\u2019t sold a home in over 15 years. Karsen walked us through every single step before we even signed anything. No pressure, just clarity. The marketing he put together honestly looked like something you\u2019d see from a luxury brokerage in Vancouver. Sold in 11 days.",
  },
  {
    name: "R. T.",
    role: "Seller",
    quote:
      "I interviewed three agents before going with Karsen. He was the only one who actually showed me a full plan for how he\u2019d market the property instead of just throwing a number at me. The photos, the videos, the social media stuff. He handled all of it and it was way beyond what I expected.",
  },
  {
    name: "J. K.",
    role: "Seller",
    quote:
      "Straight up, I didn\u2019t think my townhouse would get the attention it did. Karsen built out this whole marketing campaign like it was a million dollar listing. Made the entire process feel easy and honestly kind of fun.",
  },
  {
    name: "M. & S. P.",
    role: "Sellers",
    quote:
      "What stood out was how available he was. I\u2019m not someone who likes being left in the dark and Karsen was on top of every update, every showing, every offer. Felt like I always knew exactly where things stood.",
  },
  {
    name: "T. G.",
    role: "Seller",
    quote:
      "I had a lot of questions about timing and pricing and Karsen never made me feel like I was being annoying. He laid out all my options with actual numbers and let me decide what made sense. That meant a lot.",
  },
  {
    name: "B. & C. W.",
    role: "Sellers",
    quote:
      "Sold our family home of 22 years and Karsen made it way less stressful than we expected. He took the marketing completely into his own hands and the content he created was unreal. Multiple offers within the first week.",
  },
  {
    name: "R. A.",
    role: "Seller",
    quote:
      "I was skeptical about working with a younger agent but Karsen knew the market better than people I\u2019ve dealt with who\u2019ve been doing this for decades. He backed everything up with data and then executed on the marketing side better than anyone I\u2019ve seen.",
  },
  {
    name: "P. S.",
    role: "Seller",
    quote:
      "Karsen made selling feel like a straightforward process instead of this big scary thing. He explained every step ahead of time so there were never any surprises. Would recommend him to anyone.",
  },
  {
    name: "N. D.",
    role: "Seller",
    quote:
      "The social media marketing alone was worth it. I\u2019ve never seen a realtor put that much effort into getting eyes on a listing. He treated my condo like it was the only property he was working on.",
  },
  {
    name: "M. & K. R.",
    role: "Sellers",
    quote:
      "Honestly didn\u2019t expect the level of service we got. Karsen had a plan from day one and executed it perfectly. The photography, the reels, the targeted ads. He did all of that himself. Felt like we were in really good hands the entire time.",
  },
];

const buyerTestimonials: Testimonial[] = [
  {
    name: "A. C.",
    role: "Buyer \u2014 First-Time",
    quote:
      "First time buying and I had no idea what I was doing. Karsen was super patient, showed me a ton of options in my price range, and explained everything in plain English. Never felt rushed or pushed toward something that wasn\u2019t right for me.",
  },
  {
    name: "M. & J. L.",
    role: "Buyers \u2014 First-Time",
    quote:
      "Karsen found us a place we didn\u2019t even know was on the market yet. He was always a step ahead and made the whole buying process feel simple. Couldn\u2019t have asked for a better experience as first time buyers.",
  },
  {
    name: "T. H.",
    role: "Buyer \u2014 Relocation",
    quote:
      "I was relocating from Alberta and Karsen made buying remotely feel completely manageable. Video walkthroughs, constant communication, walked me through every document. Made what could\u2019ve been a nightmare actually pretty smooth.",
  },
];

const allTestimonials = [...sellerTestimonials, ...buyerTestimonials];

/* Split into 3 columns for marquee */
const col1 = allTestimonials.filter((_, i) => i % 3 === 0);
const col2 = allTestimonials.filter((_, i) => i % 3 === 1);
const col3 = allTestimonials.filter((_, i) => i % 3 === 2);

/* ═══════════════════════════════════════════════════════════════
   Testimonial Card
   ═══════════════════════════════════════════════════════════════ */

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div
      className={cn(
        "mb-4 flex w-full cursor-default break-inside-avoid flex-col justify-between gap-5 p-6",
        "border border-border bg-background-secondary/50",
        "transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/20 hover:shadow-lg hover:shadow-accent/5"
      )}
    >
      {/* Stars */}
      <div>
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-warm text-warm" />
          ))}
        </div>

        {/* Quote */}
        <blockquote className="mt-4 text-sm leading-relaxed text-text-secondary">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>
      </div>

      {/* Attribution */}
      <div className="flex items-center gap-3 border-t border-border pt-4">
        {/* Avatar placeholder with initials */}
        <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-accent/20 bg-accent/5 text-xs font-medium text-accent">
          {testimonial.name
            .split(/[.&]/)[0]
            .trim()
            .charAt(0)}
        </div>
        <div>
          <p className="text-xs font-medium tracking-[0.1em] text-text-primary uppercase">
            {testimonial.name}
          </p>
          <p className="text-[10px] tracking-[0.1em] text-text-muted uppercase">
            {testimonial.role}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Testimonials Section
   ═══════════════════════════════════════════════════════════════ */

export default function Testimonials() {
  return (
    <section className="relative bg-background py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Decorative blurs */}
      <div className="absolute top-20 -left-20 h-64 w-64 rounded-full bg-accent/5 blur-[100px]" />
      <div className="absolute -right-20 bottom-20 h-64 w-64 rounded-full bg-warm/5 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <AnimateIn>
          <div className="text-center">
            <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
              Testimonials
            </p>
            <h2 className="mt-4 font-heading text-4xl font-light tracking-tight text-text-primary md:text-5xl">
              What Clients Say
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-text-secondary">
              Don&apos;t just take my word for it. Here&apos;s what{" "}
              <span className="font-medium text-text-primary">
                real clients
              </span>{" "}
              across Kelowna are saying about working with me.
            </p>
          </div>
        </AnimateIn>

        {/* Marquee Columns */}
        <div className="relative mt-14 max-h-[700px] overflow-hidden">
          <div className="gap-4 md:columns-2 xl:columns-3">
            {[col1, col2, col3].map((col, colIdx) => (
              <Marquee
                vertical
                pauseOnHover
                key={colIdx}
                className={cn({
                  "[--duration:55s]": colIdx === 0,
                  "[--duration:65s]": colIdx === 1,
                  "[--duration:50s]": colIdx === 2,
                })}
              >
                {col.map((testimonial, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: Math.random() * 0.6,
                      duration: 1,
                    }}
                  >
                    <TestimonialCard testimonial={testimonial} />
                  </motion.div>
                ))}
              </Marquee>
            ))}
          </div>

          {/* Top & bottom fade gradients */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background from-20%" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background from-20%" />
        </div>

        {/* Platform Logos */}
        <AnimateIn delay={0.2}>
          <div className="mt-12 text-center">
            <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.25em] text-text-muted">
              Reviews collected across
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
              <a
                href="https://www.google.com/maps"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-text-muted transition-all duration-300 hover:text-text-secondary hover:scale-105"
                aria-label="Google Reviews"
              >
                <GoogleLogo className="h-5 w-5" />
                <span className="text-xs tracking-[0.05em]">Google</span>
              </a>
              <a
                href="https://www.ratemyagent.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-text-muted transition-all duration-300 hover:text-text-secondary hover:scale-105"
                aria-label="RateMyAgent"
              >
                <RateMyAgentLogo className="h-5 w-5" />
                <span className="text-xs tracking-[0.05em]">RateMyAgent</span>
              </a>
              <a
                href="https://instagram.com/karsenkoltun"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-text-muted transition-all duration-300 hover:text-text-secondary hover:scale-105"
                aria-label="Instagram"
              >
                <InstagramLogo className="h-5 w-5" />
                <span className="text-xs tracking-[0.05em]">Instagram</span>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-text-muted transition-all duration-300 hover:text-text-secondary hover:scale-105"
                aria-label="Facebook"
              >
                <FacebookLogo className="h-5 w-5" />
                <span className="text-xs tracking-[0.05em]">Facebook</span>
              </a>
              <a
                href="https://linkedin.com/in/karsenkoltun"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-text-muted transition-all duration-300 hover:text-text-secondary hover:scale-105"
                aria-label="LinkedIn"
              >
                <LinkedInLogo className="h-5 w-5" />
                <span className="text-xs tracking-[0.05em]">LinkedIn</span>
              </a>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
