"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Camera,
  Video,
  Share2,
  Target,
  FileText,
  Paintbrush,
} from "lucide-react";
import AnimateIn from "@/components/ui/AnimateIn";

const rotatingWords = ["Faster", "For More Money", "With Confidence", "With Care"];

const marketingServices = [
  { icon: Camera, title: "Professional Photography", description: "Magazine-quality photos that showcase every detail of your home." },
  { icon: Video, title: "Cinematic Videography", description: "Drone footage and walkthrough videos that tell your home's story." },
  { icon: Share2, title: "Social Media Campaigns", description: "Targeted content across Instagram, Facebook, YouTube, and TikTok." },
  { icon: Target, title: "Paid Advertising", description: "Strategic ad campaigns that reach qualified buyers actively searching." },
  { icon: FileText, title: "Content Strategy", description: "Custom marketing plans designed to maximize exposure and demand." },
  { icon: Paintbrush, title: "Staging Consultation", description: "Expert advice on presenting your home to attract premium offers." },
];

const processSteps = [
  { step: "01", title: "Consultation", description: "We meet, discuss your goals, and build a plan." },
  { step: "02", title: "Preparation", description: "Pricing strategy, staging, and home prep." },
  { step: "03", title: "Media Production", description: "Professional photos, video, and content creation." },
  { step: "04", title: "Launch & Marketing", description: "Your home hits the market with full campaign support." },
  { step: "05", title: "Showings & Offers", description: "We manage interest, showings, and incoming offers." },
  { step: "06", title: "Negotiation & Close", description: "Expert negotiation to get you the best result." },
];

export default function SellPageClient() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-background-tertiary">
        <div className="absolute inset-0 bg-gradient-to-b from-background-tertiary via-background to-background" />
        <div className="absolute top-1/3 right-1/4 h-[400px] w-[400px] rounded-full bg-accent/5 blur-[100px]" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 pt-24 text-center">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mb-6 text-xs font-medium tracking-[0.3em] text-accent uppercase">For Sellers</motion.p>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}>
            <h1 className="font-heading text-5xl font-light leading-[1.1] tracking-tight text-text-primary sm:text-6xl md:text-7xl">Sell Your Home</h1>
            <div className="mt-2 h-[1.2em] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span key={wordIndex} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -40, opacity: 0 }} transition={{ duration: 0.5 }} className="block font-heading text-4xl font-light italic tracking-tight text-accent sm:text-5xl md:text-6xl">{rotatingWords[wordIndex]}</motion.span>
              </AnimatePresence>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.8 }} className="mt-10">
            <a href="#cma-form" className="group inline-flex items-center gap-3 border border-accent bg-accent px-8 py-4 text-xs font-medium tracking-[0.2em] text-background uppercase transition-all duration-300 hover:bg-transparent hover:text-accent">
              Get a Free Marketing Plan
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Marketing Difference */}
      <section className="bg-background py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <AnimateIn>
            <div className="text-center">
              <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">The Difference</p>
              <h2 className="mt-4 font-heading text-4xl font-light tracking-tight text-text-primary md:text-5xl">Marketing, Not Just Listing</h2>
              <p className="mx-auto mt-4 max-w-xl text-text-secondary">Your home deserves more than a sign on the lawn. I market properties the way brands market products — with strategy, content, and reach.</p>
            </div>
          </AnimateIn>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {marketingServices.map((service, i) => (
              <AnimateIn key={service.title} delay={i * 0.1}>
                <div className="border border-border bg-background-secondary p-8 transition-all duration-500 hover:border-accent/30">
                  <service.icon className="h-7 w-7 text-accent" />
                  <h3 className="mt-5 font-heading text-xl font-medium text-text-primary">{service.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">{service.description}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-background-secondary py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <AnimateIn>
            <div className="text-center">
              <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">The Process</p>
              <h2 className="mt-4 font-heading text-4xl font-light tracking-tight text-text-primary md:text-5xl">How It Works</h2>
            </div>
          </AnimateIn>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((step, i) => (
              <AnimateIn key={step.step} delay={i * 0.1}>
                <div className="relative border-l border-accent/30 pl-8 py-2">
                  <span className="font-heading text-5xl font-light text-accent/20">{step.step}</span>
                  <h3 className="mt-2 font-heading text-xl font-medium text-text-primary">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">{step.description}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* CMA Form */}
      <section id="cma-form" className="bg-background py-24 md:py-32">
        <div className="mx-auto max-w-2xl px-6 lg:px-10">
          <AnimateIn>
            <div className="text-center">
              <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">Get Started</p>
              <h2 className="mt-4 font-heading text-4xl font-light tracking-tight text-text-primary md:text-5xl">Get a Free Marketing Plan</h2>
              <p className="mx-auto mt-4 max-w-md text-text-secondary">Tell me about your property and I&apos;ll create a custom marketing strategy for your home.</p>
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="mt-12 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <input type="text" placeholder="Full Name" className="border border-border bg-background-secondary px-5 py-4 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-accent" required />
                <input type="email" placeholder="Email Address" className="border border-border bg-background-secondary px-5 py-4 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-accent" required />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <input type="tel" placeholder="Phone Number" className="border border-border bg-background-secondary px-5 py-4 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-accent" />
                <input type="text" placeholder="Property Address" className="border border-border bg-background-secondary px-5 py-4 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-accent" required />
              </div>
              <select className="w-full border border-border bg-background-secondary px-5 py-4 text-sm text-text-muted outline-none transition-colors focus:border-accent">
                <option value="">Timeline to Sell</option>
                <option value="asap">As soon as possible</option>
                <option value="1-3">1 - 3 months</option>
                <option value="3-6">3 - 6 months</option>
                <option value="6+">6+ months</option>
                <option value="curious">Just curious</option>
              </select>
              <button type="submit" className="group flex w-full items-center justify-center gap-3 border border-accent bg-accent px-8 py-4 text-xs font-medium tracking-[0.2em] text-background uppercase transition-all duration-300 hover:bg-transparent hover:text-accent">
                Request My Free Marketing Plan
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </form>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
