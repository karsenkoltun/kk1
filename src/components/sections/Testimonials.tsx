"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import AnimateIn from "@/components/ui/AnimateIn";

const testimonials = [
  {
    id: "1",
    quote:
      "Karsen's marketing approach was unlike anything we'd seen from other agents. Our home sold in 5 days, above asking. The content he created made our property stand out from everything else on the market.",
    name: "Sarah & James M.",
    role: "Sellers — Lower Mission",
  },
  {
    id: "2",
    quote:
      "As first-time buyers, we were nervous about the process. Karsen made it seamless. He found us a home that was perfect for our budget and lifestyle. Couldn't recommend him more.",
    name: "Alex T.",
    role: "Buyer — Glenmore",
  },
  {
    id: "3",
    quote:
      "The level of professionalism and attention to detail was exceptional. From the photography to the social media campaigns, every aspect of the sale was handled with care.",
    name: "David & Lisa P.",
    role: "Sellers — Upper Mission",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () =>
    setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <section className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
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

        <div className="mt-16 relative">
          <Quote className="mx-auto h-10 w-10 text-accent/20" />

          <div className="mt-8 min-h-[200px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <blockquote className="font-heading text-2xl font-light leading-relaxed text-text-primary italic md:text-3xl">
                  &ldquo;{testimonials[current].quote}&rdquo;
                </blockquote>
                <div className="mt-8">
                  <p className="text-sm font-medium tracking-[0.15em] text-accent uppercase">
                    {testimonials[current].name}
                  </p>
                  <p className="mt-1 text-xs tracking-[0.1em] text-text-muted uppercase">
                    {testimonials[current].role}
                  </p>
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

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
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
        </div>
      </div>
    </section>
  );
}
