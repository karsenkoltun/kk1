"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
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
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const headingY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0.6, 0.9]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Video background placeholder */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background-tertiary via-background to-background" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs tracking-[0.3em] text-text-muted/20 uppercase select-none">
            Video Background
          </span>
        </div>
        {/* Dark gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/60 to-background"
          style={{ opacity: overlayOpacity }}
        />
      </div>

      {/* Faint grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(201,168,76,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.3) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Subtle animated grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative gradient orbs */}
      <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-accent/5 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/3 h-[400px] w-[400px] rounded-full bg-accent/3 blur-[100px]" />

      <motion.div
        style={{ y: headingY }}
        className="relative z-10 mx-auto max-w-5xl px-6 text-center"
      >
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
          <div className="relative mt-2 h-[50px] overflow-hidden sm:mt-4 sm:h-[65px] md:h-[80px] lg:h-[95px]">
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIndex}
                initial={{ y: 50, opacity: 0, filter: "blur(4px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -50, opacity: 0, filter: "blur(4px)" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-x-0 block font-heading text-4xl font-light italic tracking-tight text-accent sm:text-5xl md:text-6xl lg:text-7xl"
              >
                {rotatingWords[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Thin horizontal line divider above CTA */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-10 h-px w-48 origin-center bg-gradient-to-r from-transparent via-accent/40 to-transparent"
        />

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-5"
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

        {/* Thin horizontal line divider below CTA */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-10 h-px w-48 origin-center bg-gradient-to-r from-transparent via-accent/40 to-transparent"
        />
      </motion.div>

      {/* Elegant scroll indicator with thin animated line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-[10px] font-medium tracking-[0.4em] text-text-muted/60 uppercase">
            Scroll
          </span>
          <div className="relative h-12 w-px">
            {/* Static faint track */}
            <div className="absolute inset-0 bg-text-muted/10" />
            {/* Animated traveling line */}
            <motion.div
              animate={{ y: [0, 32, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 h-4 w-px bg-gradient-to-b from-accent/60 to-transparent"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
