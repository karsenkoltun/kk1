"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star, Home, TrendingUp } from "lucide-react";
import AnimateIn from "@/components/ui/AnimateIn";

const trustElements = [
  { icon: Home, value: "300+", label: "Homes Marketed" },
  { icon: Star, value: "5.0", label: "Google Rating" },
  { icon: TrendingUp, value: "8+", label: "Years Experience" },
];

export default function HomeValueClient() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      {/* Accent glow orb */}
      <div className="absolute top-1/4 left-1/3 h-[500px] w-[500px] rounded-full bg-accent/5 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 h-[300px] w-[300px] rounded-full bg-accent/3 blur-[100px]" />

      <div className="relative z-10 mx-auto w-full max-w-3xl px-6 py-32 lg:px-10">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center"
        >
          <p className="mb-6 text-xs font-medium tracking-[0.3em] text-accent uppercase">
            Free Home Valuation
          </p>
          <h1 className="font-heading text-5xl font-light leading-[1.1] tracking-tight text-text-primary sm:text-6xl md:text-7xl">
            What&apos;s Your Home{" "}
            <span className="italic text-accent">Worth?</span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mx-auto mt-6 max-w-xl text-center text-text-secondary"
        >
          No obligations. No commitments. No pressure. Just real market data
          from someone who knows Kelowna.
        </motion.p>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          onSubmit={(e) => e.preventDefault()}
          className="mt-12 space-y-5"
        >
          {/* Row 1: Name, Email */}
          {/* Row 2: Phone, Property Address */}
          <div className="grid gap-5 sm:grid-cols-2">
            <input
              type="text"
              placeholder="Full Name"
              className="border border-border bg-background-secondary px-5 py-4 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-accent"
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              className="border border-border bg-background-secondary px-5 py-4 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-accent"
              required
            />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <input
              type="tel"
              placeholder="Phone Number"
              className="border border-border bg-background-secondary px-5 py-4 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-accent"
            />
            <input
              type="text"
              placeholder="Property Address"
              className="border border-border bg-background-secondary px-5 py-4 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-accent"
              required
            />
          </div>

          {/* Row 3: Bedrooms, Bathrooms, Recent Renovations */}
          <div className="grid gap-5 sm:grid-cols-3">
            <select
              className="border border-border bg-background-secondary px-5 py-4 text-sm text-text-muted outline-none transition-colors focus:border-accent"
              defaultValue=""
            >
              <option value="" disabled>
                Bedrooms
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6+">6+</option>
            </select>
            <select
              className="border border-border bg-background-secondary px-5 py-4 text-sm text-text-muted outline-none transition-colors focus:border-accent"
              defaultValue=""
            >
              <option value="" disabled>
                Bathrooms
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5+">5+</option>
            </select>
            <select
              className="border border-border bg-background-secondary px-5 py-4 text-sm text-text-muted outline-none transition-colors focus:border-accent"
              defaultValue=""
            >
              <option value="" disabled>
                Recent Renovations
              </option>
              <option value="none">None</option>
              <option value="minor">Minor Updates</option>
              <option value="moderate">Moderate Renovations</option>
              <option value="major">Major Renovations</option>
              <option value="full">Full Renovation</option>
            </select>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="group flex w-full items-center justify-center gap-3 border border-accent bg-accent px-8 py-4 text-xs font-medium tracking-[0.2em] text-background uppercase transition-all duration-300 hover:bg-transparent hover:text-accent"
          >
            Get My Free Home Valuation
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </motion.form>

        {/* Trust Elements */}
        <AnimateIn delay={0.9}>
          <div className="mt-16 grid grid-cols-3 gap-6">
            {trustElements.map((item) => (
              <div key={item.label} className="text-center">
                <item.icon className="mx-auto h-5 w-5 text-accent" />
                <p className="mt-3 font-heading text-2xl font-light text-text-primary">
                  {item.value}
                </p>
                <p className="mt-1 text-xs tracking-wide text-text-muted">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
