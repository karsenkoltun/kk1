"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import AnimateIn from "@/components/ui/AnimateIn";

const testimonials = [
  {
    id: "1",
    quote:
      "Karsen's marketing approach was unlike anything we'd seen from other agents. Our home sold in 5 days, above asking. The content he created made our property stand out from everything else on the market.",
    name: "Sarah & James M.",
    role: "Sellers — Lower Mission",
    rating: 5,
  },
  {
    id: "2",
    quote:
      "As first-time buyers, we were nervous about the process. Karsen made it seamless. He found us a home that was perfect for our budget and lifestyle. Couldn't recommend him more.",
    name: "Alex T.",
    role: "Buyer — Glenmore",
    rating: 5,
  },
  {
    id: "3",
    quote:
      "The level of professionalism and attention to detail was exceptional. From the photography to the social media campaigns, every aspect of the sale was handled with care.",
    name: "David & Lisa P.",
    role: "Sellers — Upper Mission",
    rating: 5,
  },
  {
    id: "4",
    quote:
      "Karsen went above and beyond at every step. His knowledge of the Kelowna market and his marketing expertise gave us complete confidence throughout the entire process.",
    name: "Michelle R.",
    role: "Seller — Glenmore",
    rating: 5,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating
              ? "fill-accent text-accent"
              : "fill-transparent text-border"
          }`}
        />
      ))}
    </div>
  );
}

function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof testimonials)[number];
}) {
  return (
    <div className="flex h-full flex-col px-2">
      <StarRating rating={testimonial.rating} />
      <blockquote className="mt-5 flex-1 font-heading text-xl font-light leading-relaxed text-text-primary italic md:text-2xl">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <div className="mt-6 border-t border-border pt-5">
        <p className="text-sm font-medium tracking-[0.15em] text-accent uppercase">
          {testimonial.name}
        </p>
        <p className="mt-1 text-xs tracking-[0.1em] text-text-muted uppercase">
          {testimonial.role}
        </p>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // For desktop we show 2 at a time, so max start index differs
  const maxDesktopIndex = Math.max(0, testimonials.length - 2);

  const prev = useCallback(() => {
    setCurrent((c) => (c === 0 ? maxDesktopIndex : c - 1));
  }, [maxDesktopIndex]);

  const next = useCallback(() => {
    setCurrent((c) => (c >= maxDesktopIndex ? 0 : c + 1));
  }, [maxDesktopIndex]);

  // Autoplay with 7 second interval, pause on hover
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      next();
    }, 7000);

    return () => clearInterval(interval);
  }, [isPaused, next]);

  // Get testimonials to display (2 on desktop, 1 on mobile)
  const visibleTestimonials = [
    testimonials[current],
    testimonials[Math.min(current + 1, testimonials.length - 1)],
  ];

  return (
    <section className="bg-background py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <AnimateIn>
          <div className="text-center">
            <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
              Testimonials
            </p>
            <h2 className="mt-4 font-heading text-4xl font-light tracking-tight text-text-primary md:text-5xl">
              What Clients Say
            </h2>
          </div>
        </AnimateIn>

        <div
          className="mt-16"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Testimonial display area */}
          <div className="min-h-[320px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Desktop: 2 side by side / Mobile: 1 */}
                <div className="grid gap-12 md:grid-cols-2">
                  {/* Always show first card */}
                  <TestimonialCard testimonial={visibleTestimonials[0]} />

                  {/* Second card only on desktop, and only if different from first */}
                  {visibleTestimonials[1] &&
                    visibleTestimonials[1].id !== visibleTestimonials[0].id && (
                      <div className="hidden md:block">
                        <TestimonialCard testimonial={visibleTestimonials[1]} />
                      </div>
                    )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="mt-10 flex items-center justify-center gap-6">
            <button
              onClick={prev}
              className="flex h-12 w-12 items-center justify-center border border-border text-text-muted transition-all duration-300 hover:border-accent hover:text-accent"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Progress dots */}
            <div className="flex gap-2">
              {testimonials.slice(0, maxDesktopIndex + 1).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 transition-all duration-300 ${
                    i === current
                      ? "w-8 bg-accent"
                      : "w-2 bg-border hover:bg-text-muted"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="flex h-12 w-12 items-center justify-center border border-border text-text-muted transition-all duration-300 hover:border-accent hover:text-accent"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Google Review Attribution */}
          <div className="mt-8 flex items-center justify-center gap-2">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
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
            <span className="text-[11px] tracking-[0.1em] text-text-muted">
              Reviews from Google &middot; 5.0 average rating
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
