"use client";

import { useState } from "react";
import { CheckCircle, Check, Lock, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AnimateIn from "@/components/ui/AnimateIn";

const bulletPoints = [
  "Insider Market Reports",
  "Early Access to Luxury Listings",
  "Proven Selling & Buying Strategies",
];

const trustLogos = ["RE/MAX", "Forbes", "CLHMS", "Google Reviews"];

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
  };

  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-28 lg:py-36">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background-secondary/30 to-background" />
      <div className="absolute top-0 right-1/4 h-[500px] w-[500px] rounded-full bg-warm/4 blur-[150px]" />
      <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-accent/3 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <AnimateIn>
          {/* Top section: Content + Visual */}
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: Content */}
            <div>
              <div className="mb-6 flex items-center gap-3">
                <div className="h-px w-8 bg-warm/60" />
                <p className="text-xs font-medium tracking-[0.3em] text-warm uppercase">
                  Exclusive Market Insights
                </p>
                <div className="h-px w-8 bg-warm/60" />
              </div>

              <h2 className="font-heading text-4xl font-light leading-[1.1] tracking-tight text-text-primary md:text-5xl lg:text-6xl">
                Stay Ahead of the
                <br />
                Kelowna Market
              </h2>

              <p className="mt-6 max-w-lg text-text-secondary leading-relaxed">
                Get Monthly Market Updates, Exclusive Listings, and Expert Tips
                to Help You Buy or Sell with Confidence
              </p>

              {/* Checkmark bullet points */}
              <div className="mt-8 space-y-4">
                {bulletPoints.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-warm/15 text-warm">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </div>
                    <span className="text-base text-text-primary">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Report Visual Placeholder */}
            <div className="relative flex items-center justify-center">
              {/* Report mock */}
              <div className="relative">
                {/* Main report card */}
                <div className="relative w-64 overflow-hidden rounded-lg border border-warm/20 bg-background-secondary shadow-2xl shadow-black/40 md:w-72">
                  <div className="bg-gradient-to-br from-background-secondary to-background p-8 text-center">
                    <p className="text-[10px] font-medium tracking-[0.3em] text-warm/60 uppercase">
                      Kelowna
                    </p>
                    <p className="mt-1 font-heading text-xl font-light text-text-primary">
                      Real Estate Report
                    </p>
                    <div className="mx-auto mt-3 h-px w-12 bg-warm/30" />
                    <p className="mt-3 font-heading text-3xl font-light text-warm">
                      2025
                    </p>
                  </div>
                  <div className="space-y-2 p-6">
                    <div className="h-2 w-full rounded-full bg-border" />
                    <div className="h-2 w-4/5 rounded-full bg-border" />
                    <div className="h-2 w-3/5 rounded-full bg-border" />
                    <div className="mt-4 h-2 w-full rounded-full bg-border" />
                    <div className="h-2 w-2/3 rounded-full bg-border" />
                  </div>
                </div>

                {/* Phone mockup */}
                <div className="absolute -right-8 -bottom-6 w-28 rounded-xl border border-warm/15 bg-background-secondary p-2 shadow-xl shadow-black/30 md:-right-12 md:w-32">
                  <div className="rounded-lg bg-background p-3 text-center">
                    <div className="mx-auto h-8 w-8 rounded-full border border-warm/20 bg-warm/5" />
                    <div className="mt-2 space-y-1.5">
                      <div className="h-1.5 w-full rounded-full bg-border" />
                      <div className="h-1.5 w-3/4 rounded-full bg-border" />
                    </div>
                  </div>
                </div>

                {/* "FREE MONTHLY REPORT" badge */}
                <div className="absolute -top-4 -right-4 flex h-20 w-20 items-center justify-center rounded-full border border-warm/30 bg-background-secondary shadow-lg shadow-black/20 md:-right-6">
                  <div className="text-center">
                    <p className="text-[9px] font-bold tracking-wider text-warm uppercase">
                      Free
                    </p>
                    <p className="text-[8px] font-medium tracking-wider text-text-secondary uppercase">
                      Monthly
                    </p>
                    <p className="text-[8px] font-medium tracking-wider text-text-secondary uppercase">
                      Report
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimateIn>

        {/* Bottom bar: Form */}
        <AnimateIn delay={0.2}>
          <div className="mt-16 overflow-hidden rounded-lg border border-warm/15 bg-background-secondary/80 shadow-xl shadow-black/20 backdrop-blur-xl">
            {/* Warm glow line at top */}
            <div
              className="h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(232,213,163,0.4) 30%, rgba(232,213,163,0.5) 50%, rgba(232,213,163,0.4) 70%, transparent)",
              }}
            />

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col items-center gap-4 p-6 md:flex-row md:gap-5 md:p-8"
                  >
                    {/* Label */}
                    <div className="shrink-0 text-center md:text-left">
                      <h3 className="font-heading text-lg font-light text-text-primary md:text-xl">
                        Get Your{" "}
                        <em className="italic text-warm">Free</em> Kelowna
                        Market Report
                      </h3>
                      <p className="mt-1 text-xs text-text-secondary">
                        Delivered straight to your inbox
                      </p>
                    </div>

                    {/* Inputs */}
                    <div className="flex w-full flex-1 flex-col gap-3 sm:flex-row">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your Email Address"
                        className="w-full border border-border bg-background px-5 py-3.5 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-warm sm:w-auto sm:flex-1"
                        required
                      />
                      <select
                        value={interest}
                        onChange={(e) => setInterest(e.target.value)}
                        className="w-full border border-border bg-background px-5 py-3.5 text-sm text-text-muted outline-none transition-colors focus:border-warm appearance-none cursor-pointer sm:w-48"
                      >
                        <option value="">Buying or Selling?</option>
                        <option value="buying">Buying</option>
                        <option value="selling">Selling</option>
                        <option value="both">Both</option>
                        <option value="curious">Just Curious</option>
                      </select>
                    </div>

                    {/* Privacy + Button */}
                    <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
                      <p className="hidden items-center gap-1.5 text-[10px] text-text-muted lg:flex">
                        <Lock className="h-3 w-3" />
                        No Spam. Unsubscribe Anytime.
                      </p>
                      <button
                        type="submit"
                        className="w-full whitespace-nowrap border border-warm bg-warm px-8 py-3.5 text-sm font-semibold tracking-wide text-background transition-all duration-300 hover:bg-warm-hover hover:shadow-[0_0_20px_rgba(232,213,163,0.2)] sm:w-auto"
                      >
                        Send Me the Report
                      </button>
                    </div>
                  </form>
                  <p className="border-t border-border/50 px-6 py-3 text-center text-[10px] text-text-muted lg:hidden">
                    <Lock className="mr-1 inline h-3 w-3" />
                    No Spam. Unsubscribe Anytime.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center justify-center p-10 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.2,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    <CheckCircle
                      className="h-12 w-12 text-emerald-500"
                      strokeWidth={1.5}
                    />
                  </motion.div>
                  <h3 className="mt-6 font-heading text-2xl font-light text-text-primary">
                    You&apos;re on the list!
                  </h3>
                  <p className="mt-3 text-sm text-text-secondary">
                    Your free Kelowna Market Report will arrive in your inbox
                    shortly.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setEmail("");
                      setInterest("");
                    }}
                    className="mt-6 text-xs tracking-[0.15em] text-text-muted uppercase transition-colors hover:text-warm"
                  >
                    Subscribe another email
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </AnimateIn>

        {/* Trust bar */}
        <AnimateIn delay={0.3}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 md:gap-8">
            <p className="text-xs font-medium tracking-wider text-text-muted">
              Trusted by 500+ Clients
            </p>
            <div className="h-6 w-px bg-border" />
            {trustLogos.map((logo) => (
              <span
                key={logo}
                className="text-xs font-bold tracking-wider text-text-muted/70 uppercase"
              >
                {logo}
              </span>
            ))}
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-3.5 w-3.5 fill-warm text-warm"
                />
              ))}
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
