"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  MapPin,
  Search,
  BookOpen,
  Calculator,
  TrendingUp,
  CheckCircle2,
  Star,
} from "lucide-react";
import AnimateIn from "@/components/ui/AnimateIn";

/* ─── Rotating hero phrases ─── */
const rotatingPhrases = [
  "In Kelowna",
  "That Fits Your Budget",
  "That Fits Your Criteria",
  "At The Best Price",
];

/* ─── Buyer stats ─── */
const buyerStats = [
  { value: "$785K", label: "Avg Home Price" },
  { value: "450+", label: "Active Listings" },
  { value: "35", label: "Avg Days to Close" },
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

/* ─── Neighborhood data with price tiers ─── */
const neighborhoods = [
  {
    name: "Lower Mission",
    description:
      "Tree-lined streets, lakefront living, and walkable boutique shops. Kelowna's most sought-after neighborhood for families and professionals.",
    priceRange: "$800K - $3M+",
    priceTier: "luxury" as const,
    popular: true,
  },
  {
    name: "Upper Mission",
    description:
      "Elevated panoramic views, sprawling estates, and serene hillside living. Ideal for those seeking privacy and luxury above the city.",
    priceRange: "$900K - $4M+",
    priceTier: "luxury" as const,
    popular: false,
  },
  {
    name: "Glenmore",
    description:
      "Family-friendly community with excellent schools, parks, and easy access to downtown. A balanced blend of suburban comfort and urban convenience.",
    priceRange: "$600K - $1.5M",
    priceTier: "mid" as const,
    popular: false,
  },
  {
    name: "Downtown",
    description:
      "Vibrant urban core with waterfront condos, fine dining, and cultural attractions. Perfect for those who want everything at their doorstep.",
    priceRange: "$400K - $2M+",
    priceTier: "entry" as const,
    popular: false,
  },
  {
    name: "Rutland",
    description:
      "An emerging neighborhood with excellent value, growing amenities, and strong investment potential. Ideal for first-time buyers and investors.",
    priceRange: "$450K - $900K",
    priceTier: "entry" as const,
    popular: false,
  },
  {
    name: "Lake Country",
    description:
      "Quiet lakeside charm with wineries, orchards, and stunning waterfront properties. A haven for those seeking a relaxed Okanagan lifestyle.",
    priceRange: "$650K - $2.5M+",
    priceTier: "mid" as const,
    popular: false,
  },
];

/* ─── Price filter options ─── */
const priceFilters = [
  { label: "All Areas", value: "all" },
  { label: "Under $700K", value: "entry" },
  { label: "$700K - $1.5M", value: "mid" },
  { label: "$1.5M+", value: "luxury" },
] as const;

/* ─── Buyer resources ─── */
const buyerResources = [
  {
    icon: BookOpen,
    title: "First-Time Buyer Guide",
    description:
      "Everything you need to know about buying your first home in Kelowna, from pre-approval to closing day. A step-by-step roadmap built for clarity.",
    cta: "Read the Guide",
    href: "/blog",
  },
  {
    icon: Calculator,
    title: "Mortgage Calculator",
    description:
      "Estimate your monthly payments, compare rates, and understand your buying power. Plan with confidence before you start your search.",
    cta: "Calculate Now",
    href: "/calculator",
  },
  {
    icon: TrendingUp,
    title: "Market Report",
    description:
      "Stay ahead with the latest Kelowna real estate market data, price trends, inventory levels, and expert insights updated monthly.",
    cta: "View Report",
    href: "/contact",
  },
];

/* ─── Input style constant ─── */
const inputClasses =
  "w-full border border-border bg-background px-4 py-4 text-base text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors duration-300 sm:px-5 sm:text-sm";

export default function BuyPageClient() {
  /* ─── Rotating text ─── */
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % rotatingPhrases.length);
    }, 3000);
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

  /* ─── Neighborhood filter ─── */
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredNeighborhoods =
    activeFilter === "all"
      ? neighborhoods
      : neighborhoods.filter((n) => n.priceTier === activeFilter);

  /* ─── Consultation form ─── */
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "",
    neighborhoods: "",
    timeline: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

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
    setFormSubmitted(true);
  };

  return (
    <main>
      {/* ════════════════════════════════════════
          HERO — Parallax + Rotating Text
          ════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-gradient-to-b from-background-tertiary to-background"
      >
        {/* Parallax background layer */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background-tertiary via-background/80 to-background" />
          <div className="absolute top-1/3 left-1/4 h-[450px] w-[450px] rounded-full bg-accent/5 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/3 h-[350px] w-[350px] rounded-full bg-accent/3 blur-[100px]" />
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

        <div className="relative z-10 mx-auto max-w-7xl px-4 pt-24 text-center sm:px-6 lg:px-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-accent"
          >
            Your Home Search Starts Here
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            <h1 className="font-heading text-4xl font-light leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Buy a Home
            </h1>
            <div className="relative mt-2 h-[45px] overflow-hidden sm:mt-3 sm:h-[55px] md:h-[70px] lg:h-[85px]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={rotatingPhrases[phraseIndex]}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-x-0 block font-heading text-3xl font-light italic tracking-tight text-accent sm:text-4xl md:text-5xl lg:text-6xl"
                >
                  {rotatingPhrases[phraseIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-text-secondary"
          >
            Whether you are searching for a lakefront estate, a family home, or
            your first property in Kelowna, I provide the expertise and market
            access to find exactly what you are looking for.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/search"
              className="group inline-flex items-center gap-3 border border-warm bg-warm px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] text-background transition-all duration-300 hover:bg-warm-hover"
            >
              <Search className="h-4 w-4" />
              Browse Listings
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="#consultation"
              className="inline-flex items-center gap-3 border border-border px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] text-text-primary transition-all duration-300 hover:border-accent hover:text-accent"
            >
              Book a Consultation
            </a>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          BUYER STATS ROW
          ════════════════════════════════════════ */}
      <section className="border-y border-border bg-background-secondary">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {buyerStats.map((stat, i) => (
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
          BUYER EXPERIENCE — Connected Timeline
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
                <p className="mt-6 leading-relaxed text-text-secondary">
                  Buying a home is one of the most significant decisions you will
                  ever make. My approach is rooted in deep market expertise,
                  transparent communication, and an unwavering commitment to
                  protecting your interests at every stage of the process.
                </p>
              </AnimateIn>
              <AnimateIn delay={0.3}>
                <p className="mt-4 leading-relaxed text-text-secondary">
                  From the first consultation to the moment you receive your keys,
                  I handle every detail so you can focus on envisioning your new
                  life in Kelowna.
                </p>
              </AnimateIn>
            </div>

            {/* Right column — vertical timeline */}
            <div className="relative">
              {/* Connecting vertical line */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent/40 via-accent/20 to-accent/5" />

              <div className="space-y-0">
                {buyerSteps.map((step, i) => (
                  <AnimateIn key={step.number} delay={i * 0.08} direction="right">
                    <div className="relative flex gap-6 pb-10 last:pb-0">
                      {/* Timeline dot */}
                      <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center border border-accent/30 bg-background transition-colors duration-300 hover:border-accent hover:bg-accent/10">
                        <span className="font-heading text-lg font-light text-accent">
                          {step.number}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="pt-1">
                        <h3 className="font-heading text-xl font-medium text-text-primary">
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
        </div>
      </section>

      {/* ════════════════════════════════════════
          NEIGHBORHOOD SPOTLIGHTS — With Filtering
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
                Every neighborhood in Kelowna offers a distinct lifestyle. Discover
                the community that fits your vision and let me guide you to the best
                opportunities within it.
              </p>
            </AnimateIn>
          </div>

          {/* Price range filter buttons */}
          <AnimateIn delay={0.3} direction="none">
            <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
              {priceFilters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  className={`border px-6 py-3 text-xs font-medium tracking-[0.15em] uppercase transition-all duration-300 ${
                    activeFilter === filter.value
                      ? "border-warm bg-warm text-background"
                      : "border-border bg-transparent text-text-secondary hover:border-accent/50 hover:text-text-primary"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </AnimateIn>

          {/* Neighborhood cards */}
          <motion.div
            layout
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredNeighborhoods.map((hood) => (
                <motion.div
                  key={hood.name}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="group relative h-full overflow-hidden border border-border bg-background p-8 transition-all duration-500 hover:border-accent/40">
                    {/* Popular badge */}
                    {hood.popular && (
                      <div className="absolute top-0 right-0">
                        <div className="flex items-center gap-1.5 bg-warm px-4 py-1.5">
                          <Star className="h-3 w-3 fill-background text-background" />
                          <span className="text-[10px] font-semibold tracking-[0.15em] text-background uppercase">
                            Most Popular
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Hover glow */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/0 to-accent/0 transition-all duration-500 group-hover:from-accent/5 group-hover:via-transparent group-hover:to-accent/3" />

                    <div className="relative">
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
                        <span className="text-sm font-medium text-warm">
                          {hood.priceRange}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          BUYER RESOURCES — 3 Cards
          ════════════════════════════════════════ */}
      <section className="bg-background py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <AnimateIn>
            <div className="text-center">
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-accent">
                Tools & Insights
              </p>
              <h2 className="font-heading text-4xl font-light tracking-tight text-text-primary md:text-5xl">
                Buyer Resources
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-text-secondary">
                Arm yourself with knowledge before making one of the biggest
                decisions of your life. These resources are designed to give you
                clarity and confidence.
              </p>
            </div>
          </AnimateIn>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {buyerResources.map((resource, i) => (
              <AnimateIn key={resource.title} delay={i * 0.1}>
                <div className="group flex h-full flex-col border border-border bg-background-secondary p-8 transition-all duration-500 hover:border-accent/40">
                  {/* Hover glow */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/0 to-accent/0 transition-all duration-500 group-hover:from-accent/5 group-hover:via-transparent group-hover:to-accent/3" />

                  <div className="flex h-12 w-12 items-center justify-center border border-accent/20 bg-accent/5 transition-colors duration-300 group-hover:border-accent/40 group-hover:bg-accent/10">
                    <resource.icon className="h-5 w-5 text-accent" />
                  </div>

                  <h3 className="mt-6 font-heading text-xl font-medium text-text-primary">
                    {resource.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary">
                    {resource.description}
                  </p>

                  <Link
                    href={resource.href}
                    className="mt-6 inline-flex items-center gap-2 text-xs font-medium tracking-[0.15em] text-accent uppercase transition-colors hover:text-accent-hover"
                  >
                    {resource.cta}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          BUYER CONSULTATION FORM
          ════════════════════════════════════════ */}
      <section id="consultation" className="bg-background-secondary py-24 md:py-32">
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
                  prepare a personalized property selection tailored to your needs,
                  budget, and preferred neighborhoods.
                </p>
              </AnimateIn>
              <AnimateIn delay={0.3}>
                <div className="mt-10 space-y-6">
                  {[
                    "Fill out the form with your preferences and timeline.",
                    "I will review your criteria and prepare a curated list of matching properties.",
                    "We schedule a private consultation to discuss your options and next steps.",
                  ].map((text, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent/20 text-xs font-medium text-accent">
                        {i + 1}
                      </span>
                      <p className="text-sm leading-relaxed text-text-secondary">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </AnimateIn>
            </div>

            {/* Right column — form */}
            <AnimateIn delay={0.15} direction="right">
              <div className="border border-border bg-background p-8 md:p-10">
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
                      Consultation Requested
                    </h3>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-text-secondary">
                      Thank you for reaching out. I will review your preferences and
                      prepare a curated property selection. Expect to hear from me
                      within 24 hours.
                    </p>
                    <button
                      onClick={() => {
                        setFormSubmitted(false);
                        setForm({
                          name: "",
                          email: "",
                          phone: "",
                          budget: "",
                          neighborhoods: "",
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
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="buy-name"
                        className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-text-muted"
                      >
                        Full Name
                      </label>
                      <input
                        id="buy-name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className={inputClasses}
                      />
                    </div>

                    {/* Email & Phone */}
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="buy-email"
                          className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-text-muted"
                        >
                          Email
                        </label>
                        <input
                          id="buy-email"
                          name="email"
                          type="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder="you@email.com"
                          className={inputClasses}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="buy-phone"
                          className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-text-muted"
                        >
                          Phone
                        </label>
                        <input
                          id="buy-phone"
                          name="phone"
                          type="tel"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="(250) 000-0000"
                          className={inputClasses}
                        />
                      </div>
                    </div>

                    {/* Budget & Timeline */}
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="buy-budget"
                          className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-text-muted"
                        >
                          Budget Range
                        </label>
                        <select
                          id="buy-budget"
                          name="budget"
                          value={form.budget}
                          onChange={handleChange}
                          className={inputClasses}
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
                          htmlFor="buy-timeline"
                          className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-text-muted"
                        >
                          Timeline
                        </label>
                        <select
                          id="buy-timeline"
                          name="timeline"
                          value={form.timeline}
                          onChange={handleChange}
                          className={inputClasses}
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
                        htmlFor="buy-neighborhoods"
                        className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-text-muted"
                      >
                        Preferred Neighborhoods
                      </label>
                      <input
                        id="buy-neighborhoods"
                        name="neighborhoods"
                        type="text"
                        value={form.neighborhoods}
                        onChange={handleChange}
                        placeholder="e.g. Lower Mission, Glenmore, Lake Country"
                        className={inputClasses}
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="buy-message"
                        className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-text-muted"
                      >
                        Tell Me More
                      </label>
                      <textarea
                        id="buy-message"
                        name="message"
                        rows={4}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Describe your ideal home, must-haves, or any questions you have..."
                        className={`${inputClasses} resize-none`}
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="group inline-flex w-full items-center justify-center gap-3 border border-warm bg-warm px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] text-background transition-all duration-300 hover:bg-warm-hover"
                    >
                      Request Consultation
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </form>
                )}
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>
    </main>
  );
}
