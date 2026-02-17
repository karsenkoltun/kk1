"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

const rotatingWords = [
  "Done Differently",
  "Made Personal",
  "Built on Trust",
  "With Karsen Koltun",
];

const ctaButtons = [
  { label: "Sell Your Home", href: "/sell", variant: "primary" as const },
  { label: "Buy a Home", href: "/buy", variant: "secondary" as const },
  { label: "Get Your Home Value", href: "/home-value", variant: "secondary" as const },
];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background — placeholder gradient until real video/photos */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background-tertiary via-background to-background" />
        {/* Subtle animated grain overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Decorative gradient orbs */}
      <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-accent/5 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/3 h-[400px] w-[400px] rounded-full bg-accent/3 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Subtle top label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 text-xs font-medium tracking-[0.3em] text-accent uppercase"
        >
          Kelowna &middot; Okanagan &middot; Real Estate
        </motion.p>

        {/* Main headline with rotating word */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h1 className="font-heading text-5xl font-light leading-[1.1] tracking-tight text-text-primary sm:text-6xl md:text-7xl lg:text-8xl">
            Kelowna Real Estate
          </h1>
          <div className="mt-2 h-[1.2em] overflow-hidden sm:mt-4">
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIndex}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
                className="block font-heading text-4xl font-light italic tracking-tight text-accent sm:text-5xl md:text-6xl lg:text-7xl"
              >
                {rotatingWords[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-5"
        >
          {ctaButtons.map((cta) => (
            <Link
              key={cta.href}
              href={cta.href}
              className={
                cta.variant === "primary"
                  ? "group flex w-full items-center justify-center gap-3 border border-accent bg-accent px-8 py-4 text-xs font-medium tracking-[0.2em] text-background uppercase transition-all duration-300 hover:bg-transparent hover:text-accent sm:w-auto"
                  : "group flex w-full items-center justify-center gap-3 border border-border px-8 py-4 text-xs font-medium tracking-[0.2em] text-text-primary uppercase transition-all duration-300 hover:border-accent hover:text-accent sm:w-auto"
              }
            >
              {cta.label}
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[10px] tracking-[0.3em] text-text-muted uppercase">
              Scroll
            </span>
            <div className="h-8 w-px bg-gradient-to-b from-text-muted to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
