"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Search,
  ChevronDown,
  ArrowRight,
  Phone,
  Home,
  TrendingUp,
  User,
  Star,
  Award,
} from "lucide-react";
import { cn } from "@/lib/utils";
import SplitText from "@/components/ui/SplitText";

/* ------------------------------------------------
   Rotating taglines
   ------------------------------------------------ */
const rotatingWords = [
  "Done Differently.",
  "Made Personal.",
  "Built on Trust.",
  "With Karsen Koltun.",
];

/* ------------------------------------------------
   Tab definitions
   ------------------------------------------------ */
interface HeroTab {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const heroTabs: HeroTab[] = [
  { id: "buy", label: "Buy Smarter", icon: Home },
  { id: "sell", label: "Sell For More", icon: TrendingUp },
  { id: "move", label: "Move Strategically", icon: Phone },
  { id: "karsen", label: "Meet Karsen", icon: User },
];

/* ------------------------------------------------
   Sell tab — 3-step process
   ------------------------------------------------ */
const sellSteps = [
  {
    step: "01",
    title: "Get Your Home Valuation",
    description:
      "Understand your home's true market value with a complimentary, data-driven analysis.",
  },
  {
    step: "02",
    title: "Custom Marketing Strategy",
    description:
      "A tailored plan combining professional media, digital campaigns, and targeted outreach.",
  },
  {
    step: "03",
    title: "Sell For Top Dollar",
    description:
      "Strategic pricing and negotiation to maximize your final sale price.",
  },
];

/* ------------------------------------------------
   Move tab — testimonial
   ------------------------------------------------ */
const heroTestimonial = {
  quote:
    "Karsen made the entire process seamless. His strategic approach gave us complete confidence.",
  name: "Sarah & James M.",
  role: "Lower Mission, Kelowna",
};

/* ------------------------------------------------
   Karsen tab — credentials
   ------------------------------------------------ */
const karsenCredentials = [
  { icon: Award, value: "300+", label: "Homes Marketed" },
  { icon: Star, value: "5.0", label: "Google Rating" },
  { icon: TrendingUp, value: "$150M+", label: "Career Volume" },
];

/* ------------------------------------------------
   Search dropdown options
   ------------------------------------------------ */
const locationOptions = [
  "All Kelowna",
  "Lower Mission",
  "Upper Mission",
  "Glenmore",
  "Downtown",
  "Rutland",
  "Lake Country",
];

const priceMinOptions = ["Any", "$300K", "$500K", "$750K", "$1M", "$1.5M", "$2M"];
const priceMaxOptions = ["Any", "$500K", "$750K", "$1M", "$1.5M", "$2M", "$3M", "$5M+"];
const bedsOptions = ["Any", "1+", "2+", "3+", "4+", "5+"];

/* ------------------------------------------------
   Dropdown component
   ------------------------------------------------ */
interface DropdownProps {
  label: string;
  value: string;
  options: string[];
  onChange: (val: string) => void;
}

function Dropdown({ label, value, options, onChange }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative flex-1 min-w-0 sm:min-w-[130px]">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "flex w-full items-center justify-between gap-2 px-3 py-3 text-left sm:px-4",
          "text-sm text-text-secondary transition-colors duration-200",
          "hover:text-text-primary focus:outline-none",
          open && "text-text-primary"
        )}
        type="button"
      >
        <span className="flex flex-col">
          <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-text-muted">
            {label}
          </span>
          <span className="mt-0.5 text-sm text-text-primary">{value}</span>
        </span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 text-text-muted transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute left-0 top-full z-50 mt-1 w-full min-w-[160px] overflow-hidden rounded-lg border border-border bg-background-secondary/95 shadow-xl shadow-black/40 backdrop-blur-xl"
          >
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={cn(
                  "block w-full px-4 py-2.5 text-left text-sm transition-colors duration-150",
                  opt === value
                    ? "bg-accent/10 text-accent"
                    : "text-text-secondary hover:bg-background-tertiary hover:text-text-primary"
                )}
              >
                {opt}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------
   Tab content — Sell
   ------------------------------------------------ */
function SellTabContent() {
  return (
    <div className="glass rounded-2xl p-6 sm:p-8">
      {/* 3-step process */}
      <div className="grid gap-6 sm:grid-cols-3 sm:gap-4">
        {sellSteps.map((step, i) => (
          <div
            key={step.step}
            className="relative flex flex-col items-center text-center"
          >
            {/* Step number badge */}
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-accent/30 bg-accent/10">
              <span className="text-sm font-semibold text-accent">
                {step.step}
              </span>
            </div>
            {/* Connector line (desktop only) */}
            {i < sellSteps.length - 1 && (
              <div className="absolute top-[22px] left-[calc(50%+28px)] hidden h-px w-[calc(100%-56px)] bg-gradient-to-r from-accent/30 to-accent/10 sm:block" />
            )}
            <h3 className="mt-4 text-sm font-medium tracking-wide text-text-primary">
              {step.title}
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-text-secondary">
              {step.description}
            </p>
          </div>
        ))}
      </div>
      {/* CTA */}
      <div className="mt-8 text-center">
        <Link
          href="/home-value"
          className="group inline-flex items-center gap-3 border border-warm bg-warm px-8 py-3.5 text-xs font-medium tracking-[0.2em] text-background uppercase transition-all duration-300 hover:bg-warm-hover hover:shadow-lg hover:shadow-warm/10"
        >
          Get a Free Home Valuation
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

/* ------------------------------------------------
   Tab content — Move Strategically
   ------------------------------------------------ */
function MoveTabContent() {
  return (
    <div className="glass rounded-2xl p-6 sm:p-8">
      <div className="flex flex-col items-center text-center">
        {/* Icon */}
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-accent/20 bg-accent/5">
          <Phone className="h-6 w-6 text-accent" />
        </div>
        {/* Copy */}
        <h3 className="mt-5 font-heading text-2xl font-light tracking-tight text-text-primary sm:text-3xl">
          Your Next Move,{" "}
          <span className="italic text-accent">Strategically Planned</span>
        </h3>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-text-secondary">
          Whether you&apos;re upsizing, downsizing, or relocating to the
          Okanagan &mdash; I&apos;ll build a custom plan that aligns your
          timeline, budget, and goals.
        </p>
        {/* Testimonial quote */}
        <div className="mt-6 border-t border-border/50 pt-6">
          <blockquote className="font-heading text-base font-light italic leading-relaxed text-text-secondary">
            &ldquo;{heroTestimonial.quote}&rdquo;
          </blockquote>
          <p className="mt-2 text-xs tracking-[0.15em] text-accent uppercase">
            {heroTestimonial.name} &middot;{" "}
            <span className="text-text-muted">{heroTestimonial.role}</span>
          </p>
        </div>
        {/* CTA */}
        <div className="mt-6">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 border border-warm bg-warm px-8 py-3.5 text-xs font-medium tracking-[0.2em] text-background uppercase transition-all duration-300 hover:bg-warm-hover hover:shadow-lg hover:shadow-warm/10"
          >
            Book a Strategy Call
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------
   Tab content — Meet Karsen
   ------------------------------------------------ */
function KarsenTabContent() {
  return (
    <div className="glass rounded-2xl p-6 sm:p-8">
      <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:gap-8 sm:text-left">
        {/* Headshot placeholder */}
        <div className="shrink-0">
          <div className="relative h-24 w-24 overflow-hidden rounded-full border border-accent/20 bg-background-secondary sm:h-28 sm:w-28">
            <div className="flex h-full w-full items-center justify-center">
              <User className="h-8 w-8 text-text-muted/40" />
            </div>
          </div>
        </div>
        {/* Content */}
        <div className="mt-5 sm:mt-0">
          <h3 className="font-heading text-2xl font-light tracking-tight text-text-primary">
            Karsen Koltun
          </h3>
          <p className="mt-1 text-xs tracking-[0.15em] text-accent uppercase">
            Realtor &middot; Royal LePage
          </p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-text-secondary">
            8+ years of marketing across real estate, hospitality, and tech. I
            bring a completely different approach &mdash; one rooted in strategy,
            content, and digital marketing.
          </p>
          {/* Credential stats */}
          <div className="mt-5 flex items-center justify-center gap-6 sm:justify-start">
            {karsenCredentials.map((cred) => (
              <div key={cred.label} className="text-center">
                <p className="font-heading text-xl font-light text-warm">
                  {cred.value}
                </p>
                <p className="mt-0.5 text-[10px] tracking-[0.15em] text-text-muted uppercase">
                  {cred.label}
                </p>
              </div>
            ))}
          </div>
          {/* CTA */}
          <div className="mt-6 flex justify-center sm:justify-start">
            <Link
              href="/about"
              className="group inline-flex items-center gap-3 border border-border px-8 py-3.5 text-xs font-medium tracking-[0.2em] text-text-primary uppercase transition-all duration-300 hover:border-warm hover:text-warm"
            >
              Learn More About Me
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------
   Hero Component
   ------------------------------------------------ */
export default function Hero() {
  const router = useRouter();
  const [wordIndex, setWordIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("buy");
  const sectionRef = useRef<HTMLElement>(null);

  /* Search state */
  const [location, setLocation] = useState("All Kelowna");
  const [priceMin, setPriceMin] = useState("Any");
  const [priceMax, setPriceMax] = useState("Any");
  const [beds, setBeds] = useState("Any");

  /* Parallax */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const headingY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0.55, 0.92]);

  /* Rotating word timer */
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  /* Handle search */
  function handleSearch() {
    const params = new URLSearchParams();
    if (location !== "All Kelowna") params.set("location", location);
    if (priceMin !== "Any") params.set("priceMin", priceMin);
    if (priceMax !== "Any") params.set("priceMax", priceMax);
    if (beds !== "Any") params.set("beds", beds);
    const query = params.toString();
    router.push(`/search${query ? `?${query}` : ""}`);
  }

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* ---- Background layers ---- */}
      <div className="absolute inset-0">
        {/* Dark cinematic gradient base */}
        <div className="absolute inset-0 bg-gradient-to-b from-background-tertiary via-background to-background" />

        {/* City lights / video placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs tracking-[0.3em] text-text-muted/15 uppercase select-none">
            Video Background
          </span>
        </div>

        {/* Dark gradient overlay with parallax opacity */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/50 to-background"
          style={{ opacity: overlayOpacity }}
        />
      </div>

      {/* ---- Subtle grid pattern ---- */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(126,200,227,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(126,200,227,0.2) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* ---- Film grain ---- */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ---- Glow orbs ---- */}
      {/* Baby blue orb — top left */}
      <div className="absolute top-[15%] left-[10%] h-[500px] w-[500px] rounded-full bg-accent/[0.04] blur-[140px]" />
      {/* Baby blue orb — mid right */}
      <div className="absolute top-[40%] right-[5%] h-[350px] w-[350px] rounded-full bg-accent/[0.03] blur-[100px]" />
      {/* Warm orb — bottom center */}
      <div className="absolute bottom-[10%] left-[35%] h-[450px] w-[450px] rounded-full bg-warm/[0.03] blur-[130px]" />
      {/* Warm orb — top right subtle */}
      <div className="absolute top-[5%] right-[20%] h-[300px] w-[300px] rounded-full bg-warm/[0.02] blur-[120px]" />

      {/* ---- Main content ---- */}
      <motion.div
        style={{ y: headingY }}
        className="relative z-10 mx-auto max-w-5xl px-4 pt-20 text-center sm:px-6"
      >
        {/* Subtle top label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 text-xs font-medium tracking-[0.3em] text-accent/80 uppercase"
        >
          Kelowna &middot; Okanagan &middot; Real Estate
        </motion.p>

        {/* Main headline with SplitText rotating word */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h1 className="glow-text-warm font-heading text-5xl font-light leading-[1.1] tracking-tight text-text-primary sm:text-6xl md:text-7xl lg:text-8xl">
            Kelowna Real Estate
          </h1>
          <div className="relative mt-3 flex items-center justify-center sm:mt-4 min-h-[48px] sm:min-h-[60px] md:min-h-[75px] lg:min-h-[90px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={wordIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.25 } }}
                transition={{ duration: 0.15 }}
              >
                <SplitText
                  text={rotatingWords[wordIndex]}
                  className="font-heading text-4xl font-light italic tracking-tight text-warm sm:text-5xl md:text-6xl lg:text-7xl"
                  delay={40}
                  duration={0.6}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 30, rotateX: -40 }}
                  to={{ opacity: 1, y: 0, rotateX: 0 }}
                  threshold={0}
                  rootMargin="0px"
                  textAlign="center"
                  tag="span"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Thin divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-8 h-px w-48 origin-center bg-gradient-to-r from-transparent via-accent/30 to-transparent"
        />

        {/* ---- Tab navigation ---- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
        >
          {heroTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "group relative flex items-center gap-1.5 rounded-full px-3 py-3 text-[10px] font-medium tracking-[0.1em] uppercase transition-all duration-300",
                  "sm:gap-2 sm:px-6 sm:py-3 sm:text-xs sm:tracking-[0.15em]",
                  isActive
                    ? "border border-warm/40 bg-warm/10 text-warm shadow-[0_0_20px_rgba(232,213,163,0.08)]"
                    : "border border-border/60 bg-transparent text-text-muted hover:border-text-muted/40 hover:text-text-secondary"
                )}
              >
                <tab.icon
                  className={cn(
                    "h-3.5 w-3.5 transition-colors duration-300",
                    isActive
                      ? "text-warm"
                      : "text-text-muted group-hover:text-text-secondary"
                  )}
                />
                {tab.label}
                {/* Animated indicator border */}
                {isActive && (
                  <motion.div
                    layoutId="activeTabGlow"
                    className="absolute inset-0 rounded-full border border-warm/20"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* ---- Tab content panel ---- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mx-auto mt-10 max-w-4xl"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* ---- Buy tab: search bar ---- */}
              {activeTab === "buy" && (
                <>
                  <div className="glass rounded-2xl p-2">
                    <div className="flex flex-col items-stretch gap-0 md:flex-row md:items-center">
                      <div className="flex flex-1 flex-col divide-y divide-border/40 md:flex-row md:divide-y-0 md:divide-x">
                        <Dropdown
                          label="Location"
                          value={location}
                          options={locationOptions}
                          onChange={setLocation}
                        />
                        <Dropdown
                          label="Price Min"
                          value={priceMin}
                          options={priceMinOptions}
                          onChange={setPriceMin}
                        />
                        <Dropdown
                          label="Price Max"
                          value={priceMax}
                          options={priceMaxOptions}
                          onChange={setPriceMax}
                        />
                        <Dropdown
                          label="Beds"
                          value={beds}
                          options={bedsOptions}
                          onChange={setBeds}
                        />
                      </div>

                      <div className="p-2 md:pl-0">
                        <button
                          onClick={handleSearch}
                          className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-warm px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-background transition-all duration-300 hover:bg-warm-hover hover:shadow-lg hover:shadow-warm/10 sm:px-8 sm:py-3.5 md:w-auto"
                          type="button"
                        >
                          <Search className="h-4 w-4" />
                          Search
                        </button>
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-center text-xs tracking-wide text-text-muted/60">
                    Search luxury properties across the Okanagan
                  </p>
                </>
              )}

              {/* ---- Sell tab: stepper ---- */}
              {activeTab === "sell" && <SellTabContent />}

              {/* ---- Move tab: strategy call ---- */}
              {activeTab === "move" && <MoveTabContent />}

              {/* ---- Karsen tab: about ---- */}
              {activeTab === "karsen" && <KarsenTabContent />}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* ---- Scroll indicator ---- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-[10px] font-medium tracking-[0.4em] text-text-muted/50 uppercase">
            Scroll
          </span>
          <div className="relative h-12 w-px">
            {/* Static faint track */}
            <div className="absolute inset-0 bg-text-muted/10" />
            {/* Animated traveling line */}
            <motion.div
              animate={{ y: [0, 32, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 h-4 w-px bg-gradient-to-b from-accent/50 to-transparent"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
