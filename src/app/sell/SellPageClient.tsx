"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Camera,
  BarChart3,
  Globe,
  Megaphone,
  Paintbrush,
  Video,
  Check,
  X,
  Quote,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import AnimateIn from "@/components/ui/AnimateIn";
import Honeypot from "@/components/forms/Honeypot";

/* ─── Stats row data ─── */
const sellerStats = [
  { value: "300+", label: "Homes Marketed" },
  { value: "27", label: "Average Days on Market" },
  { value: "98%", label: "List-to-Sale Ratio" },
];

/* ─── Marketing service cards ─── */
const marketingServices = [
  {
    icon: Camera,
    title: "Professional Photography",
    description:
      "Magazine-quality HDR photography with expert lighting, staging direction, and aerial perspectives that make your listing unforgettable.",
  },
  {
    icon: BarChart3,
    title: "Market Analytics",
    description:
      "Data-driven pricing strategy using real-time market analysis, comparable sales, and predictive modeling to position your home perfectly.",
  },
  {
    icon: Globe,
    title: "Digital Presence",
    description:
      "Custom property website, SEO-optimized listing syndication across 50+ platforms, and Google Ads campaigns targeting active buyers.",
  },
  {
    icon: Megaphone,
    title: "Social Media Campaigns",
    description:
      "Targeted content across Instagram, Facebook, YouTube, and TikTok with paid amplification reaching thousands of qualified buyers.",
  },
  {
    icon: Paintbrush,
    title: "Staging & Design",
    description:
      "Professional staging consultation and interior styling that transforms your space, highlighting its best features for maximum buyer appeal.",
  },
  {
    icon: Video,
    title: "Cinematic Videography",
    description:
      "4K drone footage, cinematic walkthrough tours, and lifestyle videos that tell your home's story and captivate buyers emotionally.",
  },
];

/* ─── Why Karsen comparison ─── */
const comparisonItems = [
  {
    traditional: "Phone photos and basic MLS listing",
    karsen: "Professional photography, video, drone, and custom property website",
  },
  {
    traditional: "Generic listing description",
    karsen: "Compelling copywriting and targeted digital marketing campaigns",
  },
  {
    traditional: "Wait-and-hope approach",
    karsen: "Proactive outreach to buyer agents and social media promotion",
  },
  {
    traditional: "Sporadic communication",
    karsen: "Weekly performance reports and transparent, always-available updates",
  },
  {
    traditional: "Standard contract negotiation",
    karsen: "Strategic multi-offer negotiation to maximize your final sale price",
  },
  {
    traditional: "Closing day coordination",
    karsen: "White-glove service from listing to key handover with every detail managed",
  },
];

/* ─── 4-step marketing process ─── */
const processSteps = [
  {
    step: "01",
    title: "Consultation & Pricing Strategy",
    description:
      "We start with an in-depth consultation and market analysis to determine the optimal pricing strategy for your home.",
  },
  {
    step: "02",
    title: "Luxury Marketing & Staging",
    description:
      "Your home is professionally staged and showcased through high-end photography, cinematic videography, and sophisticated marketing collateral.",
  },
  {
    step: "03",
    title: "Maximum Exposure",
    description:
      "We leverage targeted digital advertising, social media, email campaigns, and our exclusive network to attract qualified buyers.",
  },
  {
    step: "04",
    title: "Strategic Negotiation",
    description:
      "I'll negotiate on your behalf, presenting you with the best offers and guiding you through a seamless closing process.",
  },
];

/* ─── Seller testimonial ─── */
const sellerTestimonial = {
  quote:
    "Karsen's marketing was on another level. Our home had more interest in the first weekend than we ever imagined. We sold above asking in just 12 days.",
  name: "Sarah & James W.",
  location: "Lower Mission, Kelowna",
};

/* ─── Input style constant ─── */
const inputClasses =
  "w-full border-b border-text-secondary/30 bg-transparent px-1 py-4 text-base text-text-primary placeholder:text-text-secondary/50 outline-none transition-colors duration-300 focus:border-accent sm:py-3.5 sm:text-sm";

export default function SellPageClient() {
  /* ─── Parallax hero ─── */
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  /* ─── CMA form ─── */
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [honey, setHoney] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);

    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          source: "Sell Page - CMA Request",
          tags: ["seller-lead", "cma-request", "kelowna"],
          customFields: {
            property_address: formData.address,
          },
          _honey: honey,
        }),
      });

      setFormSubmitted(true);
    } catch (err) {
      console.error("Sell form submission error:", err);
      setFormSubmitted(true);
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <>
      {/* ════════════════════════════════════════
          HERO — Full-bleed background image + form
          ════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative flex min-h-screen items-center overflow-hidden"
      >
        {/* Background gradient with parallax */}
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, #070B14 0%, #0C1220 20%, #1a2744 45%, #1e293b 65%, #111827 85%, #070B14 100%)",
            }}
          />
          {/* Ambient glow orbs */}
          <div className="absolute top-1/4 right-1/3 h-[500px] w-[600px] rounded-full bg-warm/5 blur-[150px]" />
          <div className="absolute bottom-1/3 left-0 h-[400px] w-[500px] rounded-full bg-accent/4 blur-[120px]" />
          <div className="absolute top-0 right-0 h-[300px] w-[400px] rounded-full bg-warm/3 blur-[100px]" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-background/30" />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-24 pb-16 sm:px-6 sm:pt-28 sm:pb-20 lg:px-10"
        >
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left column — copy */}
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="font-heading text-5xl font-light leading-[1.1] tracking-tight text-text-primary sm:text-6xl md:text-7xl"
              >
                List Your Home
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="mt-5 max-w-lg text-lg leading-relaxed text-text-secondary"
              >
                Sell with the leading luxury real estate agent in Kelowna.
              </motion.p>

              {/* Checkmark bullet points */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.55 }}
                className="mt-8 space-y-4"
              >
                {[
                  "Sell for the highest price possible",
                  "Receive elite marketing and exposure",
                  "Work directly with Karsen",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-warm/90">
                      <Check className="h-3.5 w-3.5 text-background" strokeWidth={3} />
                    </div>
                    <span className="text-base text-text-primary">{item}</span>
                  </div>
                ))}
              </motion.div>

              {/* CTA button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7 }}
                className="mt-10"
              >
                <a
                  href="#cma-form"
                  className="group inline-flex items-center gap-3 border-2 border-warm bg-warm px-8 py-4 text-sm font-semibold tracking-wide text-background transition-all duration-300 hover:bg-warm-hover"
                >
                  Get a Free Home Valuation
                </a>
              </motion.div>
            </div>

            {/* Right column — form card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="ml-auto w-full max-w-md"
            >
              <div className="bg-background/70 p-8 backdrop-blur-xl sm:p-10">
                {formSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center justify-center py-8 text-center"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-accent/30 bg-accent/10">
                      <CheckCircle2 className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className="mt-6 font-heading text-2xl font-light text-text-primary">
                      Request Received
                    </h3>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-text-secondary">
                      Thank you. I&apos;ll review your property details and reach out
                      within 24 hours to discuss your home&apos;s value.
                    </p>
                    <button
                      onClick={() => {
                        setFormSubmitted(false);
                        setFormData({ name: "", address: "", phone: "", email: "" });
                      }}
                      className="mt-8 text-xs font-medium tracking-[0.15em] text-accent uppercase transition-colors hover:text-accent-hover"
                    >
                      Submit Another Request
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <Honeypot value={honey} onChange={setHoney} />
                    <h3 className="text-sm font-semibold tracking-[0.15em] text-text-primary uppercase">
                      Ready for a Successful Sale?
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                      Provide your property details, and I&apos;ll personally reach out to
                      discuss your home&apos;s value and tailored selling strategy.
                    </p>

                    <div className="mt-8 space-y-1">
                      <input
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Full Name"
                        className={inputClasses}
                      />
                      <input
                        name="address"
                        type="text"
                        required
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Address"
                        className={inputClasses}
                      />
                      <input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        className={inputClasses}
                      />
                      <input
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email Address"
                        className={inputClasses}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={formSubmitting}
                      className="mt-8 w-full border-2 border-warm bg-warm py-4 text-sm font-semibold tracking-wide text-background transition-all duration-300 hover:bg-warm-hover disabled:opacity-60"
                    >
                      {formSubmitting ? "Submitting..." : "Request Your Valuation"}
                    </button>

                    <p className="mt-4 text-center text-xs text-text-muted">
                      100% confidential. No obligation.
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        >
          <a href="#stats" className="group flex flex-col items-center gap-2">
            <ChevronDown className="h-6 w-6 animate-bounce text-text-secondary/60" />
          </a>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════
          STATS ROW
          ════════════════════════════════════════ */}
      <section id="stats" className="border-y border-border bg-background-secondary">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {sellerStats.map((stat, i) => (
              <AnimateIn key={stat.label} delay={i * 0.1} direction="none">
                <div className="flex flex-col items-center justify-center py-10 text-center sm:py-12">
                  <span className="font-heading text-4xl font-light tracking-tight text-warm md:text-5xl">
                    {stat.value}
                  </span>
                  <span className="mt-2 text-xs font-medium tracking-[0.2em] text-text-secondary uppercase">
                    {stat.label}
                  </span>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          MARKETING DIFFERENCE — 6 Service Cards
          ════════════════════════════════════════ */}
      <section className="bg-background py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <AnimateIn>
            <div className="text-center">
              <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
                The Difference
              </p>
              <h2 className="mt-4 font-heading text-4xl font-light tracking-tight text-text-primary md:text-5xl">
                Marketing, Not Just Listing
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-text-secondary leading-relaxed">
                Your home deserves more than a sign on the lawn. I market properties the
                way brands market products &mdash; with strategy, content, and reach.
              </p>
            </div>
          </AnimateIn>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {marketingServices.map((service, i) => (
              <AnimateIn key={service.title} delay={i * 0.08}>
                <div className="group relative h-full overflow-hidden border border-border bg-background-secondary p-8 transition-all duration-500 hover:border-accent/40">
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/0 to-accent/0 transition-all duration-500 group-hover:from-accent/5 group-hover:via-transparent group-hover:to-accent/3" />
                  <div className="relative">
                    <div className="flex h-12 w-12 items-center justify-center border border-accent/20 bg-accent/5 transition-colors duration-300 group-hover:border-accent/40 group-hover:bg-accent/10">
                      <service.icon className="h-5 w-5 text-accent" />
                    </div>
                    <h3 className="mt-6 font-heading text-xl font-medium text-text-primary">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                      {service.description}
                    </p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SELLER TESTIMONIAL QUOTE
          ════════════════════════════════════════ */}
      <section className="bg-background-secondary py-20 md:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <AnimateIn direction="none">
            <div className="relative text-center">
              <Quote className="mx-auto mb-6 h-10 w-10 text-accent/20" />
              <blockquote className="font-heading text-2xl font-light leading-relaxed tracking-tight text-text-primary italic md:text-3xl">
                &ldquo;{sellerTestimonial.quote}&rdquo;
              </blockquote>
              <div className="mt-8">
                <p className="text-sm font-medium text-accent">
                  {sellerTestimonial.name}
                </p>
                <p className="mt-1 text-xs tracking-[0.15em] text-text-muted uppercase">
                  {sellerTestimonial.location}
                </p>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ════════════════════════════════════════
          WHY KARSEN — Comparison Section
          ════════════════════════════════════════ */}
      <section id="why-karsen" className="bg-background py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <AnimateIn>
            <div className="text-center">
              <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
                Why Karsen?
              </p>
              <h2 className="mt-4 font-heading text-4xl font-light tracking-tight text-text-primary md:text-5xl">
                Not All Agents Are the Same
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-text-secondary">
                See the difference between a traditional listing approach and a
                full-service marketing strategy designed to maximize your results.
              </p>
            </div>
          </AnimateIn>

          <AnimateIn delay={0.15}>
            <div className="mt-12 overflow-hidden border border-border sm:mt-16">
              <div className="hidden sm:block">
                <div className="grid grid-cols-2">
                  <div className="border-b border-r border-border bg-background-secondary px-6 py-5 sm:px-8">
                    <span className="text-xs font-medium tracking-[0.2em] text-text-muted uppercase">
                      Traditional Agent
                    </span>
                  </div>
                  <div className="border-b border-border bg-accent/5 px-6 py-5 sm:px-8">
                    <span className="text-xs font-medium tracking-[0.2em] text-accent uppercase">
                      With Karsen
                    </span>
                  </div>
                </div>

                {comparisonItems.map((item, i) => (
                  <div
                    key={i}
                    className={`grid grid-cols-2 ${
                      i < comparisonItems.length - 1 ? "border-b border-border" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3 border-r border-border bg-background-secondary px-6 py-5 sm:px-8">
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-text-muted/60" />
                      <span className="text-sm leading-relaxed text-text-secondary">
                        {item.traditional}
                      </span>
                    </div>
                    <div className="flex items-start gap-3 bg-accent/5 px-6 py-5 sm:px-8">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span className="text-sm leading-relaxed text-text-primary">
                        {item.karsen}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-0 sm:hidden">
                <div className="border-b border-border bg-background-secondary px-5 py-4">
                  <span className="text-xs font-medium tracking-[0.2em] text-text-muted uppercase">
                    Traditional Agent
                  </span>
                </div>
                {comparisonItems.map((item, i) => (
                  <div
                    key={`trad-${i}`}
                    className="flex items-start gap-3 border-b border-border bg-background-secondary px-5 py-4"
                  >
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-text-muted/60" />
                    <span className="text-sm leading-relaxed text-text-secondary">
                      {item.traditional}
                    </span>
                  </div>
                ))}
                <div className="border-b border-border bg-accent/5 px-5 py-4">
                  <span className="text-xs font-medium tracking-[0.2em] text-accent uppercase">
                    With Karsen
                  </span>
                </div>
                {comparisonItems.map((item, i) => (
                  <div
                    key={`karsen-${i}`}
                    className="flex items-start gap-3 bg-accent/5 px-5 py-4 border-b border-border last:border-b-0"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span className="text-sm leading-relaxed text-text-primary">
                      {item.karsen}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ════════════════════════════════════════
          MY PROVEN MARKETING PROCESS — 4-Step Cards
          ════════════════════════════════════════ */}
      <section className="bg-background-secondary py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <AnimateIn>
            <div className="text-center">
              <h2 className="font-heading text-4xl font-light italic tracking-tight text-text-primary md:text-5xl">
                My Proven Marketing Process
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-text-secondary">
                A strategic, step-by-step approach to sell your home for top dollar.
              </p>
            </div>
          </AnimateIn>

          {/* Downward chevron */}
          <div className="mt-10 flex justify-center">
            <ChevronDown className="h-6 w-6 text-text-muted/40" />
          </div>

          {/* Top row: 3 numbered cards + Karsen photo placeholder */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.slice(0, 3).map((step, i) => (
              <AnimateIn key={step.step} delay={i * 0.1}>
                <div className="group relative flex h-full flex-col overflow-hidden border border-warm/10 bg-background/60 backdrop-blur-sm transition-all duration-500 hover:border-warm/30 hover:shadow-[0_0_30px_rgba(232,213,163,0.06)]">
                  {/* Image placeholder */}
                  <div className="relative flex h-40 items-center justify-center bg-background-secondary">
                    <span className="text-xs tracking-widest text-text-muted/40 uppercase">
                      Image
                    </span>
                    {/* Step number badge */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-warm/30 bg-background/80 backdrop-blur-sm">
                        <span className="text-xs font-medium text-text-secondary">
                          {step.step}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-heading text-lg font-medium leading-tight text-text-primary">
                      {step.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary">
                      {step.description}
                    </p>
                  </div>
                </div>
              </AnimateIn>
            ))}

            {/* 4th card: Karsen photo placeholder with step 4 */}
            <AnimateIn delay={0.3}>
              <div className="relative flex h-full flex-col overflow-hidden border border-warm/10 bg-background-secondary">
                <div className="flex flex-1 items-center justify-center bg-background-secondary p-4">
                  <div className="text-center">
                    <div className="mx-auto h-24 w-24 rounded-full border border-warm/20 bg-warm/5" />
                    <p className="mt-4 text-xs tracking-widest text-text-muted uppercase">
                      Photo Coming Soon
                    </p>
                  </div>
                </div>
              </div>
            </AnimateIn>
          </div>

          {/* Bottom row: Horizontal flow with arrow connectors */}
          <div className="mt-8 hidden items-stretch gap-4 lg:flex">
            {processSteps.map((step, i) => (
              <div key={`flow-${step.step}`} className="flex flex-1 items-center gap-4">
                <div className="flex-1 border border-border bg-background/40 p-5 backdrop-blur-sm transition-all duration-500 hover:border-warm/20">
                  <h4 className="font-heading text-base font-medium leading-tight text-text-primary italic">
                    {step.title}
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-text-secondary">
                    {step.description}
                  </p>
                  {i === processSteps.length - 1 && (
                    <a
                      href="#cma-form"
                      className="mt-4 inline-block border border-warm bg-warm px-5 py-2.5 text-xs font-semibold tracking-wide text-background transition-all duration-300 hover:bg-warm-hover hover:shadow-[0_0_15px_rgba(232,213,163,0.2)]"
                    >
                      Book Your Consultation
                    </a>
                  )}
                </div>
                {i < processSteps.length - 1 && (
                  <ArrowRight className="h-4 w-4 shrink-0 text-text-muted/40" />
                )}
              </div>
            ))}
          </div>

          {/* Mobile: Vertical steps with book consultation */}
          <div className="mt-8 space-y-4 lg:hidden">
            {processSteps.map((step) => (
              <div
                key={`mobile-${step.step}`}
                className="border border-border bg-background/40 p-5 backdrop-blur-sm"
              >
                <h4 className="font-heading text-base font-medium text-text-primary italic">
                  {step.title}
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-text-secondary">
                  {step.description}
                </p>
              </div>
            ))}
            <div className="pt-2 text-center">
              <a
                href="#cma-form"
                className="inline-block border border-warm bg-warm px-8 py-3.5 text-sm font-semibold tracking-wide text-background transition-all duration-300 hover:bg-warm-hover"
              >
                Book Your Consultation
              </a>
            </div>
          </div>

          {/* Downward chevron */}
          <div className="mt-12 flex justify-center">
            <ChevronDown className="h-6 w-6 text-text-muted/40" />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          BOTTOM CTA — Get a Free Marketing Plan
          ════════════════════════════════════════ */}
      <section id="cma-form" className="bg-background py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
          <AnimateIn>
            <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
              Get Started
            </p>
            <h2 className="mt-4 font-heading text-4xl font-light tracking-tight text-text-primary md:text-5xl">
              Ready to List Your Home?
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-text-secondary">
              Tell me about your property and I&apos;ll create a custom marketing
              strategy tailored to your home, your neighborhood, and your goals.
            </p>
            <div className="mt-10">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="group inline-flex items-center gap-3 border border-warm bg-warm px-10 py-4 text-sm font-semibold tracking-wide text-background transition-all duration-300 hover:bg-warm-hover"
              >
                Get a Free Home Valuation
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
