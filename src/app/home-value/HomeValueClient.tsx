"use client";

import { motion } from "framer-motion";
import AnimateIn from "@/components/ui/AnimateIn";
import HomeValuationForm from "@/components/forms/HomeValuationForm";

export default function HomeValueClient() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      {/* Background effects */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #070B14 0%, #0C1220 20%, #1a2744 45%, #1e293b 65%, #111827 85%, #070B14 100%)",
        }}
      />
      <div className="absolute top-1/4 right-1/3 h-[500px] w-[600px] rounded-full bg-warm/5 blur-[150px]" />
      <div className="absolute bottom-1/3 left-0 h-[400px] w-[500px] rounded-full bg-accent/4 blur-[120px]" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/20" />

      {/* KARSEN KOLTUN branding top center */}
      <div className="relative z-10 flex justify-center pt-28 pb-4">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading text-sm font-semibold tracking-[0.35em] text-text-primary uppercase"
        >
          Karsen Koltun
        </motion.p>
      </div>

      {/* Warm glow line */}
      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <div
          className="h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(232,213,163,0.3) 20%, rgba(232,213,163,0.5) 50%, rgba(232,213,163,0.3) 80%, transparent)",
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-8 pb-16 sm:px-6 sm:pt-12 sm:pb-20 lg:px-10">
        <div className="grid items-start gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left column */}
          <div>
            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="font-heading text-5xl font-light leading-[1.1] tracking-tight text-text-primary sm:text-6xl md:text-7xl"
            >
              Get a Free Home Valuation
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-6 max-w-lg text-text-secondary leading-relaxed"
            >
              Get an expert assessment of what your home is really worth in
              today&apos;s market.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mt-4 max-w-lg text-text-secondary leading-relaxed"
            >
              Book a no-obligation visit with me and I&apos;ll personally
              evaluate your home&apos;s value and selling potential.
            </motion.p>

            {/* Multi-step form card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="mt-10"
            >
              <div className="border border-warm/15 bg-background/70 p-8 backdrop-blur-xl sm:p-10">
                <HomeValuationForm />

                <p className="mt-5 text-center text-xs text-text-muted">
                  100% confidential. No pressure. Let&apos;s see what your
                  property is worth.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right column: Karsen photo placeholder */}
          <AnimateIn direction="right" delay={0.4}>
            <div className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden border border-warm/10 bg-background-secondary lg:max-w-none">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="h-24 w-24 rounded-full border border-warm/20 bg-warm/5" />
                <span className="text-sm tracking-widest text-text-muted uppercase">
                  Photo Coming Soon
                </span>
              </div>
              {/* Warm corner accents */}
              <div className="absolute top-0 left-0 h-16 w-16 border-t border-l border-warm/30" />
              <div className="absolute right-0 bottom-0 h-16 w-16 border-r border-b border-warm/30" />
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
