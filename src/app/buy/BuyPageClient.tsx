"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MapPin, Search } from "lucide-react";
import AnimateIn from "@/components/ui/AnimateIn";

/* ─── Rotating hero phrases ─── */
const rotatingPhrases = [
  "In Kelowna",
  "That Fits Your Budget",
  "That Fits Your Criteria",
  "At The Best Price",
];

/* ─── Buyer experience steps ─── */
const buyerSteps = [
  {
    number: "01",
    title: "Discovery Consultation",
    description:
      "We begin with a private consultation to understand your lifestyle, priorities, and budget. Every detail matters when finding your perfect home.",
  },
  {
    number: "02",
    title: "Curated Property Search",
    description:
      "Leveraging deep market knowledge and off-market connections, I curate a selection of properties that align precisely with your criteria.",
  },
  {
    number: "03",
    title: "Private Viewings & Analysis",
    description:
      "Experience each property through private viewings accompanied by detailed market analysis, comparable sales data, and investment insights.",
  },
  {
    number: "04",
    title: "Strategic Negotiation",
    description:
      "With expert negotiation strategies, I advocate fiercely on your behalf to secure the best possible terms and price for your new home.",
  },
  {
    number: "05",
    title: "Seamless Closing",
    description:
      "From accepted offer to key handover, I coordinate every detail with inspectors, lenders, and lawyers to ensure a smooth closing experience.",
  },
];

/* ─── Neighborhood data ─── */
const neighborhoods = [
  {
    name: "Lower Mission",
    description:
      "Tree-lined streets, lakefront living, and walkable boutique shops. Kelowna's most sought-after neighborhood for families and professionals.",
    priceRange: "$800K - $3M+",
  },
  {
    name: "Upper Mission",
    description:
      "Elevated panoramic views, sprawling estates, and serene hillside living. Ideal for those seeking privacy and luxury above the city.",
    priceRange: "$900K - $4M+",
  },
  {
    name: "Glenmore",
    description:
      "Family-friendly community with excellent schools, parks, and easy access to downtown. A balanced blend of suburban comfort and urban convenience.",
    priceRange: "$600K - $1.5M",
  },
  {
    name: "Downtown",
    description:
      "Vibrant urban core with waterfront condos, fine dining, and cultural attractions. Perfect for those who want everything at their doorstep.",
    priceRange: "$400K - $2M+",
  },
  {
    name: "Rutland",
    description:
      "An emerging neighborhood with excellent value, growing amenities, and strong investment potential. Ideal for first-time buyers and investors.",
    priceRange: "$450K - $900K",
  },
  {
    name: "Lake Country",
    description:
      "Quiet lakeside charm with wineries, orchards, and stunning waterfront properties. A haven for those seeking a relaxed Okanagan lifestyle.",
    priceRange: "$650K - $2.5M+",
  },
];

export default function BuyPageClient() {
  /* ─── Rotating text state ─── */
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % rotatingPhrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  /* ─── Form state ─── */
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "",
    neighborhoods: "",
    timeline: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire up form submission
    console.log("Buyer consultation form submitted:", form);
  };

  return (
    <main>
      {/* ════════════════════════════════════════
          HERO SECTION
          ════════════════════════════════════════ */}
      <section className="relative flex min-h-[85vh] items-center justify-center bg-gradient-to-b from-background-tertiary to-background">
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

        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center lg:px-10">
          <AnimateIn delay={0.1} direction="none">
            <p className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-accent">
              Your Home Search Starts Here
            </p>
          </AnimateIn>

          <AnimateIn delay={0.25}>
            <h1 className="font-heading text-5xl font-light leading-[1.1] tracking-tight md:text-7xl">
              Buy a Home
              <br />
              <span className="relative inline-block h-[1.2em] w-full overflow-hidden align-bottom">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={rotatingPhrases[phraseIndex]}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0 text-accent"
                  >
                    {rotatingPhrases[phraseIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>
          </AnimateIn>

          <AnimateIn delay={0.45}>
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-text-secondary">
              Whether you are searching for a lakefront estate, a family home,
              or your first property in Kelowna, I provide the expertise and
              market access to find exactly what you are looking for.
            </p>
          </AnimateIn>

          <AnimateIn delay={0.6}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/search"
                className="group inline-flex items-center gap-3 border border-accent bg-accent px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] text-background transition-all hover:bg-accent-hover"
              >
                <Search className="h-4 w-4" />
                Browse Listings
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="#consultation"
                className="inline-flex items-center gap-3 border border-border px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] text-text-primary transition-all hover:border-accent hover:text-accent"
              >
                Book a Consultation
              </a>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ════════════════════════════════════════
          BUYER EXPERIENCE SECTION
          ════════════════════════════════════════ */}
      <section className="bg-background py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            {/* Left column — intro */}
            <div>
              <AnimateIn>
                <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-accent">
                  The Buyer Experience
                </p>
              </AnimateIn>
              <AnimateIn delay={0.1}>
                <h2 className="font-heading text-4xl font-light tracking-tight md:text-5xl">
                  Working With Karsen
                </h2>
              </AnimateIn>
              <AnimateIn delay={0.2}>
                <p className="mt-6 text-text-secondary leading-relaxed">
                  Buying a home is one of the most significant decisions you
                  will ever make. My approach is rooted in deep market
                  expertise, transparent communication, and an unwavering
                  commitment to protecting your interests at every stage of the
                  process.
                </p>
              </AnimateIn>
              <AnimateIn delay={0.3}>
                <p className="mt-4 text-text-secondary leading-relaxed">
                  From the first consultation to the moment you receive your
                  keys, I handle every detail so you can focus on envisioning
                  your new life in Kelowna.
                </p>
              </AnimateIn>
            </div>

            {/* Right column — steps */}
            <div className="space-y-10">
              {buyerSteps.map((step, i) => (
                <AnimateIn key={step.number} delay={i * 0.1} direction="right">
                  <div className="group flex gap-6">
                    <span className="font-heading text-3xl font-light text-accent/30 transition-colors group-hover:text-accent">
                      {step.number}
                    </span>
                    <div>
                      <h3 className="font-heading text-xl font-light text-text-primary">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-text-secondary">
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
          NEIGHBORHOOD SPOTLIGHTS
          ════════════════════════════════════════ */}
      <section className="bg-background-secondary py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="text-center">
            <AnimateIn>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-accent">
                Explore Kelowna
              </p>
            </AnimateIn>
            <AnimateIn delay={0.1}>
              <h2 className="font-heading text-4xl font-light tracking-tight md:text-5xl">
                Neighborhood Spotlights
              </h2>
            </AnimateIn>
            <AnimateIn delay={0.2}>
              <p className="mx-auto mt-6 max-w-2xl text-text-secondary">
                Every neighborhood in Kelowna offers a distinct lifestyle.
                Discover the community that fits your vision and let me guide
                you to the best opportunities within it.
              </p>
            </AnimateIn>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {neighborhoods.map((hood, i) => (
              <AnimateIn key={hood.name} delay={i * 0.08}>
                <div className="group h-full rounded-sm border border-border bg-background p-8 transition-all hover:border-accent/40">
                  <div className="mb-5 flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-accent" />
                    <h3 className="font-heading text-2xl font-light text-text-primary">
                      {hood.name}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {hood.description}
                  </p>
                  <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
                    <span className="text-xs font-medium uppercase tracking-[0.15em] text-text-muted">
                      Price Range
                    </span>
                    <span className="text-sm font-medium text-accent">
                      {hood.priceRange}
                    </span>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          BUYER CONSULTATION FORM
          ════════════════════════════════════════ */}
      <section
        id="consultation"
        className="bg-background py-24 md:py-32"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            {/* Left column — copy */}
            <div>
              <AnimateIn>
                <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-accent">
                  Get Started
                </p>
              </AnimateIn>
              <AnimateIn delay={0.1}>
                <h2 className="font-heading text-4xl font-light tracking-tight md:text-5xl">
                  Book Your Buyer
                  <br />
                  Consultation
                </h2>
              </AnimateIn>
              <AnimateIn delay={0.2}>
                <p className="mt-6 leading-relaxed text-text-secondary">
                  Share a few details about what you are looking for and I will
                  prepare a personalized property selection tailored to your
                  needs, budget, and preferred neighborhoods.
                </p>
              </AnimateIn>
              <AnimateIn delay={0.3}>
                <div className="mt-10 space-y-6">
                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent/20 text-xs font-medium text-accent">
                      1
                    </span>
                    <p className="text-sm leading-relaxed text-text-secondary">
                      Fill out the form with your preferences and timeline.
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent/20 text-xs font-medium text-accent">
                      2
                    </span>
                    <p className="text-sm leading-relaxed text-text-secondary">
                      I will review your criteria and prepare a curated list of
                      matching properties.
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent/20 text-xs font-medium text-accent">
                      3
                    </span>
                    <p className="text-sm leading-relaxed text-text-secondary">
                      We schedule a private consultation to discuss your options
                      and next steps.
                    </p>
                  </div>
                </div>
              </AnimateIn>
            </div>

            {/* Right column — form */}
            <AnimateIn delay={0.15} direction="right">
              <form
                onSubmit={handleSubmit}
                className="space-y-5 rounded-sm border border-border bg-background-secondary p-8 md:p-10"
              >
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-text-muted"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="w-full border border-border bg-background-secondary px-5 py-4 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none"
                  />
                </div>

                {/* Email & Phone */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-text-muted"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@email.com"
                      className="w-full border border-border bg-background-secondary px-5 py-4 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-text-muted"
                    >
                      Phone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="(250) 000-0000"
                      className="w-full border border-border bg-background-secondary px-5 py-4 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none"
                    />
                  </div>
                </div>

                {/* Budget & Timeline */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="budget"
                      className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-text-muted"
                    >
                      Budget Range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={form.budget}
                      onChange={handleChange}
                      className="w-full border border-border bg-background-secondary px-5 py-4 text-sm text-text-primary focus:border-accent focus:outline-none"
                    >
                      <option value="">Select a range</option>
                      <option value="under-500k">Under $500K</option>
                      <option value="500k-750k">$500K - $750K</option>
                      <option value="750k-1m">$750K - $1M</option>
                      <option value="1m-1.5m">$1M - $1.5M</option>
                      <option value="1.5m-2.5m">$1.5M - $2.5M</option>
                      <option value="2.5m-plus">$2.5M+</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="timeline"
                      className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-text-muted"
                    >
                      Timeline
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={form.timeline}
                      onChange={handleChange}
                      className="w-full border border-border bg-background-secondary px-5 py-4 text-sm text-text-primary focus:border-accent focus:outline-none"
                    >
                      <option value="">Select a timeline</option>
                      <option value="immediately">Immediately</option>
                      <option value="1-3-months">1 - 3 Months</option>
                      <option value="3-6-months">3 - 6 Months</option>
                      <option value="6-12-months">6 - 12 Months</option>
                      <option value="just-exploring">Just Exploring</option>
                    </select>
                  </div>
                </div>

                {/* Preferred Neighborhoods */}
                <div>
                  <label
                    htmlFor="neighborhoods"
                    className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-text-muted"
                  >
                    Preferred Neighborhoods
                  </label>
                  <input
                    id="neighborhoods"
                    name="neighborhoods"
                    type="text"
                    value={form.neighborhoods}
                    onChange={handleChange}
                    placeholder="e.g. Lower Mission, Glenmore, Lake Country"
                    className="w-full border border-border bg-background-secondary px-5 py-4 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-text-muted"
                  >
                    Tell Me More
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Describe your ideal home, must-haves, or any questions you have..."
                    className="w-full resize-none border border-border bg-background-secondary px-5 py-4 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="group inline-flex w-full items-center justify-center gap-3 border border-accent bg-accent px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] text-background transition-all hover:bg-accent-hover"
                >
                  Request Consultation
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            </AnimateIn>
          </div>
        </div>
      </section>
    </main>
  );
}
