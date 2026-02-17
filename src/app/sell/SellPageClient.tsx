"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
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
} from "lucide-react";
import AnimateIn from "@/components/ui/AnimateIn";

/* ─── Rotating hero phrases ─── */
const rotatingWords = ["Faster", "For More Money", "With Confidence", "With Care"];

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

/* ─── 6-step selling process ─── */
const processSteps = [
  {
    step: "01",
    title: "Initial Consultation",
    description:
      "We meet to discuss your goals, timeline, and expectations. I tour your home and begin building a strategy tailored to your property.",
  },
  {
    step: "02",
    title: "Pricing & Preparation",
    description:
      "Deep market analysis determines the optimal price. I advise on staging, repairs, and updates that deliver the highest return on investment.",
  },
  {
    step: "03",
    title: "Media Production",
    description:
      "Professional photographers, videographers, and drone operators capture your home at its absolute best. A custom property website goes live.",
  },
  {
    step: "04",
    title: "Launch & Marketing",
    description:
      "Your home hits the market with a coordinated multi-channel campaign: MLS, social media, paid ads, email blasts, and agent networking.",
  },
  {
    step: "05",
    title: "Showings & Offers",
    description:
      "I manage all inquiries, coordinate private and open showings, and present every offer with clear analysis so you can make informed decisions.",
  },
  {
    step: "06",
    title: "Negotiation & Close",
    description:
      "Expert negotiation ensures you achieve the best possible price and terms. I coordinate inspections, appraisals, and closing logistics seamlessly.",
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
  "w-full border border-border bg-background px-5 py-4 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors duration-300 focus:border-accent";

export default function SellPageClient() {
  /* ─── Rotating text ─── */
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  /* ─── Parallax hero ─── */
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  /* ─── CMA form ─── */
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    timeline: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire up form submission
    console.log("CMA form submitted:", formData);
    setFormSubmitted(true);
  };

  return (
    <>
      {/* ════════════════════════════════════════
          HERO — Parallax + Rotating Text
          ════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-background-tertiary"
      >
        {/* Parallax background layer */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background-tertiary via-background/80 to-background" />
          <div className="absolute top-1/4 right-1/4 h-[500px] w-[500px] rounded-full bg-accent/5 blur-[120px]" />
          <div className="absolute bottom-1/4 left-1/4 h-[350px] w-[350px] rounded-full bg-accent/3 blur-[100px]" />
        </motion.div>

        {/* Subtle grid overlay */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 pt-24 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6 text-xs font-medium tracking-[0.3em] text-accent uppercase"
          >
            Premium Home Marketing
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <h1 className="font-heading text-5xl font-light leading-[1.1] tracking-tight text-text-primary sm:text-6xl md:text-7xl">
              Sell Your Home
            </h1>
            <div className="mt-3 h-[1.2em] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIndex}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -40, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="block font-heading text-4xl font-light italic tracking-tight text-accent sm:text-5xl md:text-6xl"
                >
                  {rotatingWords[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-text-secondary"
          >
            Your home deserves more than a listing. It deserves a full-scale marketing
            campaign built to attract the right buyers and maximize your sale price.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <a
              href="#cma-form"
              className="group inline-flex items-center gap-3 border border-accent bg-accent px-8 py-4 text-xs font-medium tracking-[0.2em] text-background uppercase transition-all duration-300 hover:bg-transparent hover:text-accent"
            >
              Get a Free Marketing Plan
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#why-karsen"
              className="inline-flex items-center gap-3 border border-border px-8 py-4 text-xs font-medium tracking-[0.2em] text-text-primary uppercase transition-all duration-300 hover:border-accent hover:text-accent"
            >
              See the Difference
            </a>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          STATS ROW
          ════════════════════════════════════════ */}
      <section className="border-y border-border bg-background-secondary">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {sellerStats.map((stat, i) => (
              <AnimateIn key={stat.label} delay={i * 0.1} direction="none">
                <div className="flex flex-col items-center justify-center py-10 text-center sm:py-12">
                  <span className="font-heading text-4xl font-light tracking-tight text-accent md:text-5xl">
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
                  {/* Hover glow */}
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
            <div className="mt-16 overflow-hidden border border-border">
              {/* Header row */}
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

              {/* Comparison rows */}
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
          </AnimateIn>
        </div>
      </section>

      {/* ════════════════════════════════════════
          6-STEP PROCESS — Vertical Timeline
          ════════════════════════════════════════ */}
      <section className="bg-background-secondary py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <AnimateIn>
            <div className="text-center">
              <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
                The Process
              </p>
              <h2 className="mt-4 font-heading text-4xl font-light tracking-tight text-text-primary md:text-5xl">
                Six Steps to Sold
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-text-secondary">
                A proven, systematic approach that takes the stress out of selling and
                puts more money in your pocket.
              </p>
            </div>
          </AnimateIn>

          {/* Timeline */}
          <div className="relative mt-16">
            {/* Connecting vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent/40 via-accent/20 to-accent/5 sm:left-8" />

            <div className="space-y-0">
              {processSteps.map((step, i) => (
                <AnimateIn key={step.step} delay={i * 0.08}>
                  <div className="relative flex gap-6 pb-12 last:pb-0 sm:gap-8">
                    {/* Timeline dot */}
                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center border border-accent/30 bg-background-secondary sm:h-16 sm:w-16">
                      <span className="font-heading text-lg font-light text-accent sm:text-xl">
                        {step.step}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="pt-1 sm:pt-3">
                      <h3 className="font-heading text-xl font-medium text-text-primary sm:text-2xl">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-text-secondary sm:text-base">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          CMA FORM — Get a Free Marketing Plan
          ════════════════════════════════════════ */}
      <section id="cma-form" className="bg-background py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            {/* Left column — copy */}
            <div>
              <AnimateIn>
                <p className="mb-4 text-xs font-medium tracking-[0.3em] text-accent uppercase">
                  Get Started
                </p>
              </AnimateIn>
              <AnimateIn delay={0.1}>
                <h2 className="font-heading text-4xl font-light tracking-tight text-text-primary md:text-5xl">
                  Get a Free
                  <br />
                  Marketing Plan
                </h2>
              </AnimateIn>
              <AnimateIn delay={0.2}>
                <p className="mt-6 leading-relaxed text-text-secondary">
                  Tell me about your property and I will create a custom marketing
                  strategy tailored to your home, your neighborhood, and your goals.
                  This includes a comprehensive market analysis and a detailed plan for
                  how I would position and market your listing.
                </p>
              </AnimateIn>
              <AnimateIn delay={0.3}>
                <div className="mt-10 space-y-6">
                  {[
                    "Fill out the form with your property details and timeline.",
                    "I will prepare a detailed CMA and custom marketing plan.",
                    "We schedule a consultation to review your plan and next steps.",
                  ].map((text, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent/20 text-xs font-medium text-accent">
                        {i + 1}
                      </span>
                      <p className="text-sm leading-relaxed text-text-secondary">{text}</p>
                    </div>
                  ))}
                </div>
              </AnimateIn>
            </div>

            {/* Right column — form */}
            <AnimateIn delay={0.15} direction="right">
              <div className="border border-border bg-background-secondary p-8 md:p-10">
                {formSubmitted ? (
                  /* ─── Success state ─── */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-accent/30 bg-accent/10">
                      <CheckCircle2 className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className="mt-6 font-heading text-2xl font-light text-text-primary">
                      Request Received
                    </h3>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-text-secondary">
                      Thank you for your interest. I will review your property details and
                      prepare a custom marketing plan. Expect to hear from me within 24
                      hours.
                    </p>
                    <button
                      onClick={() => {
                        setFormSubmitted(false);
                        setFormData({
                          name: "",
                          email: "",
                          phone: "",
                          address: "",
                          timeline: "",
                          message: "",
                        });
                      }}
                      className="mt-8 text-xs font-medium tracking-[0.15em] text-accent uppercase transition-colors hover:text-accent-hover"
                    >
                      Submit Another Request
                    </button>
                  </motion.div>
                ) : (
                  /* ─── Form ─── */
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="sell-name"
                          className="mb-2 block text-xs font-medium tracking-[0.15em] text-text-muted uppercase"
                        >
                          Full Name
                        </label>
                        <input
                          id="sell-name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          className={inputClasses}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="sell-email"
                          className="mb-2 block text-xs font-medium tracking-[0.15em] text-text-muted uppercase"
                        >
                          Email
                        </label>
                        <input
                          id="sell-email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="you@email.com"
                          className={inputClasses}
                        />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="sell-phone"
                          className="mb-2 block text-xs font-medium tracking-[0.15em] text-text-muted uppercase"
                        >
                          Phone
                        </label>
                        <input
                          id="sell-phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="(250) 000-0000"
                          className={inputClasses}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="sell-address"
                          className="mb-2 block text-xs font-medium tracking-[0.15em] text-text-muted uppercase"
                        >
                          Property Address
                        </label>
                        <input
                          id="sell-address"
                          name="address"
                          type="text"
                          required
                          value={formData.address}
                          onChange={handleChange}
                          placeholder="123 Lakeshore Rd"
                          className={inputClasses}
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="sell-timeline"
                        className="mb-2 block text-xs font-medium tracking-[0.15em] text-text-muted uppercase"
                      >
                        Timeline to Sell
                      </label>
                      <select
                        id="sell-timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        className={inputClasses}
                      >
                        <option value="">Select a timeline</option>
                        <option value="asap">As soon as possible</option>
                        <option value="1-3">1 - 3 months</option>
                        <option value="3-6">3 - 6 months</option>
                        <option value="6+">6+ months</option>
                        <option value="curious">Just curious</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="sell-message"
                        className="mb-2 block text-xs font-medium tracking-[0.15em] text-text-muted uppercase"
                      >
                        Anything Else?
                      </label>
                      <textarea
                        id="sell-message"
                        name="message"
                        rows={3}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell me about your property, recent upgrades, or any questions..."
                        className={`${inputClasses} resize-none`}
                      />
                    </div>

                    <button
                      type="submit"
                      className="group flex w-full items-center justify-center gap-3 border border-accent bg-accent px-8 py-4 text-xs font-medium tracking-[0.2em] text-background uppercase transition-all duration-300 hover:bg-transparent hover:text-accent"
                    >
                      Request My Free Marketing Plan
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </form>
                )}
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>
    </>
  );
}
