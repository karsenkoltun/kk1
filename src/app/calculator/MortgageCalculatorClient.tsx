"use client";

import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Info,
  Shield,
  TrendingDown,
  DollarSign,
  Calendar,
  Percent,
  Home,
  AlertTriangle,
  CheckCircle2,
  Calculator,
  ArrowUpRight,
  Mail,
  Send,
  Loader2,
  User,
  Phone,
} from "lucide-react";
import AnimateIn from "@/components/ui/AnimateIn";
import {
  calculateMortgage,
  generateAmortization,
  getYearlySummary,
  formatCurrency,
  formatPercent,
  getFrequencyLabel,
  type MortgageInputs,
  type MortgageResults,
  type PaymentFrequency,
  type YearlySummary,
} from "@/lib/mortgage";

/* ═══════════════════════════════════════════════════════════════
   Constants
   ═══════════════════════════════════════════════════════════════ */

const DEFAULT_INPUTS: MortgageInputs = {
  homePrice: 500_000,
  downPayment: 25_000,
  annualRate: 0.0489,
  amortYears: 25,
  frequency: "monthly" as PaymentFrequency,
  propertyTaxAnnual: 3_000,
  homeInsuranceAnnual: 1_800,
  strataMonthly: 0,
  isFirstTimeBuyer: false,
  extraMonthlyPayment: 0,
};

const AMORT_OPTIONS = [5, 10, 15, 20, 25, 30];

const FREQUENCY_OPTIONS: { value: PaymentFrequency; label: string }[] = [
  { value: "monthly", label: "Monthly" },
  { value: "semi-monthly", label: "Semi-Monthly" },
  { value: "bi-weekly", label: "Bi-Weekly" },
  { value: "accelerated-bi-weekly", label: "Accel. Bi-Weekly" },
  { value: "weekly", label: "Weekly" },
  { value: "accelerated-weekly", label: "Accel. Weekly" },
];

/* Chart colors tuned to the dark luxury palette */
const CHART_COLORS = {
  pi: "#7EC8E3",
  tax: "#14B8A6",
  insurance: "#A78BFA",
  cmhc: "#F59E0B",
  strata: "#F43F5E",
};

/* ═══════════════════════════════════════════════════════════════
   Helpers
   ═══════════════════════════════════════════════════════════════ */

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}

function parseCurrencyInput(raw: string): number {
  return Number(raw.replace(/[^0-9.]/g, "")) || 0;
}

/* ═══════════════════════════════════════════════════════════════
   Tooltip Component
   ═══════════════════════════════════════════════════════════════ */

function Tooltip({ text }: { text: string }) {
  const [show, setShow] = useState(false);

  return (
    <span className="relative inline-flex">
      <button
        type="button"
        aria-label="More info"
        className="ml-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full border border-accent/30 text-[10px] text-accent transition-colors hover:border-accent hover:bg-accent/10"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
      >
        i
      </button>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="absolute bottom-full left-1/2 z-50 mb-2 w-64 -translate-x-1/2 rounded-lg border border-border bg-background-secondary p-3 text-xs leading-relaxed text-text-secondary shadow-lg"
          >
            {text}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-border" />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Donut Chart (SVG)
   ═══════════════════════════════════════════════════════════════ */

interface DonutSegment {
  label: string;
  value: number;
  color: string;
}

function DonutChart({
  segments,
  centerLabel,
  centerValue,
}: {
  segments: DonutSegment[];
  centerLabel: string;
  centerValue: string;
}) {
  const total = segments.reduce((sum, s) => sum + s.value, 0);
  if (total === 0) return null;

  const radius = 80;
  const stroke = 24;
  const circumference = 2 * Math.PI * radius;
  let cumulativeOffset = 0;

  return (
    <div className="relative mx-auto w-full max-w-[280px]">
      <svg viewBox="0 0 200 200" className="w-full">
        {segments
          .filter((s) => s.value > 0)
          .map((seg) => {
            const pct = seg.value / total;
            const dashLength = pct * circumference;
            const dashOffset = -cumulativeOffset * circumference;
            cumulativeOffset += pct;

            return (
              <circle
                key={seg.label}
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke={seg.color}
                strokeWidth={stroke}
                strokeDasharray={`${dashLength} ${circumference - dashLength}`}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
                transform="rotate(-90 100 100)"
                className="transition-all duration-500"
              />
            );
          })}
      </svg>

      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-text-muted">
          {centerLabel}
        </span>
        <span className="mt-1 font-heading text-3xl font-semibold tracking-tight text-text-primary md:text-4xl">
          {centerValue}
        </span>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2">
        {segments
          .filter((s) => s.value > 0)
          .map((seg) => (
            <div key={seg.label} className="flex items-center gap-1.5">
              <div
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: seg.color }}
              />
              <span className="text-[11px] text-text-secondary">
                {seg.label}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════════════════════════ */

export default function MortgageCalculatorClient() {
  /* ─── State ─── */
  const [inputs, setInputs] = useState<MortgageInputs>(DEFAULT_INPUTS);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showAmortization, setShowAmortization] = useState(false);
  const [expandedYear, setExpandedYear] = useState<number | null>(null);

  /* ─── Lead capture state ─── */
  const [leadForm, setLeadForm] = useState({
    name: "",
    email: "",
    phone: "",
    timeline: "",
  });
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadError, setLeadError] = useState("");

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.email) return;

    setLeadSubmitting(true);
    setLeadError("");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadForm.name,
          email: leadForm.email,
          phone: leadForm.phone || undefined,
          source: "Mortgage Calculator",
          tags: [
            "calculator-lead",
            "bc-buyer",
            ...(inputs.isFirstTimeBuyer ? ["first-time-buyer"] : []),
          ],
          customFields: {
            home_price_searched: String(inputs.homePrice),
            down_payment: String(inputs.downPayment),
            down_payment_pct: (downPaymentPct * 100).toFixed(1),
            monthly_payment_est: results.monthlyPI.toFixed(0),
            interest_rate_used: (inputs.annualRate * 100).toFixed(2),
            amortization: String(inputs.amortYears),
            cmhc_required: String(results.cmhcRequired),
            first_time_buyer: String(inputs.isFirstTimeBuyer),
            purchase_timeline: leadForm.timeline || "Not specified",
            source_url: typeof window !== "undefined" ? window.location.href : "",
          },
        }),
      });

      if (res.ok) {
        setLeadSubmitted(true);
      } else {
        setLeadError("Something went wrong. Please try again.");
      }
    } catch {
      setLeadError("Network error. Please try again.");
    } finally {
      setLeadSubmitting(false);
    }
  };

  /* ─── Derived calculations (real-time) ─── */
  const results: MortgageResults = useMemo(
    () => calculateMortgage(inputs),
    [inputs]
  );

  const downPaymentPct = useMemo(
    () => (inputs.homePrice > 0 ? inputs.downPayment / inputs.homePrice : 0),
    [inputs.homePrice, inputs.downPayment]
  );

  const yearlySummary: YearlySummary[] = useMemo(() => {
    if (!showAmortization) return [];
    const schedule = generateAmortization(
      results.totalMortgageAmount,
      inputs.annualRate,
      inputs.amortYears
    );
    return getYearlySummary(schedule);
  }, [
    showAmortization,
    results.totalMortgageAmount,
    inputs.annualRate,
    inputs.amortYears,
  ]);

  /* ─── Updaters ─── */
  const updateInput = useCallback(
    <K extends keyof MortgageInputs>(key: K, value: MortgageInputs[K]) => {
      setInputs((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const setHomePrice = useCallback(
    (price: number) => {
      const clamped = clamp(price, 50_000, 10_000_000);
      const pct = inputs.homePrice > 0
        ? inputs.downPayment / inputs.homePrice
        : 0.05;
      setInputs((prev) => ({
        ...prev,
        homePrice: clamped,
        downPayment: Math.round(clamped * pct),
      }));
    },
    [inputs.homePrice, inputs.downPayment]
  );

  const setDownPaymentDollar = useCallback(
    (dp: number) => {
      updateInput("downPayment", clamp(dp, 0, inputs.homePrice));
    },
    [inputs.homePrice, updateInput]
  );

  const setDownPaymentPct = useCallback(
    (pct: number) => {
      const clampedPct = clamp(pct, 0, 1);
      updateInput("downPayment", Math.round(inputs.homePrice * clampedPct));
    },
    [inputs.homePrice, updateInput]
  );

  /* ─── Parallax hero ─── */
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  /* ─── Donut segments ─── */
  const donutSegments: DonutSegment[] = useMemo(() => {
    const segs: DonutSegment[] = [
      { label: "Principal & Interest", value: results.monthlyPI, color: CHART_COLORS.pi },
      { label: "Property Tax", value: results.propertyTaxMonthly, color: CHART_COLORS.tax },
      { label: "Insurance", value: results.homeInsuranceMonthly, color: CHART_COLORS.insurance },
    ];
    if (results.cmhcRequired) {
      segs.push({
        label: "CMHC",
        value: results.cmhcPremium / (inputs.amortYears * 12),
        color: CHART_COLORS.cmhc,
      });
    }
    if (inputs.strataMonthly > 0) {
      segs.push({
        label: "Strata/HOA",
        value: inputs.strataMonthly,
        color: CHART_COLORS.strata,
      });
    }
    return segs;
  }, [results, inputs.amortYears, inputs.strataMonthly]);

  /* ─── Label input style ─── */
  const labelClass =
    "mb-2 flex items-center text-xs font-medium uppercase tracking-[0.15em] text-text-muted";
  const inputClass =
    "w-full border border-border bg-background-secondary px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors duration-300 tabular-nums";
  const selectClass = `${inputClass} appearance-none cursor-pointer`;

  /* ═══════════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════════ */

  return (
    <>
      {/* ════════════════════════════════════════
          HERO
          ════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-gradient-to-b from-background-tertiary to-background"
      >
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background-tertiary via-background/80 to-background" />
          <div className="absolute top-1/3 left-1/4 h-[450px] w-[450px] rounded-full bg-accent/5 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/3 h-[350px] w-[350px] rounded-full bg-warm/5 blur-[100px]" />
        </motion.div>

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

        <div className="relative z-10 mx-auto max-w-4xl px-4 pt-24 pb-12 text-center sm:px-6 lg:px-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-accent"
          >
            Mortgage Calculator
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="font-heading text-4xl font-light leading-[1.1] tracking-tight sm:text-5xl md:text-6xl"
          >
            Calculate Your
            <br />
            <span className="text-accent">BC Mortgage Payment</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary"
          >
            Accurate Canadian calculations with semi-annual compounding, CMHC
            insurance, BC Property Transfer Tax, and real-time results. No
            guesswork, just clarity.
          </motion.p>
        </div>
      </section>

      {/* ════════════════════════════════════════
          CALCULATOR BODY
          ════════════════════════════════════════ */}
      <section className="bg-background py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[45fr_55fr] lg:gap-12">
            {/* ═══════════ LEFT COLUMN — INPUTS ═══════════ */}
            <div className="space-y-6">
              <AnimateIn>
                <div className="border border-border bg-background-secondary p-6 md:p-8">
                  <h2 className="mb-6 font-heading text-xl font-medium text-text-primary">
                    Mortgage Details
                  </h2>

                  {/* ── Home Price ── */}
                  <div className="mb-6">
                    <label className={labelClass}>
                      <Home className="mr-1.5 h-3.5 w-3.5 text-accent" />
                      Home Price
                      <Tooltip text="The purchase price of the home you are looking at. Kelowna averages around $785K for single-family homes." />
                    </label>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-text-muted">$</span>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={inputs.homePrice.toLocaleString("en-CA")}
                        onChange={(e) =>
                          setHomePrice(parseCurrencyInput(e.target.value))
                        }
                        className={inputClass}
                        aria-label="Home price"
                      />
                    </div>
                    <input
                      type="range"
                      min={50_000}
                      max={3_000_000}
                      step={5_000}
                      value={inputs.homePrice}
                      onChange={(e) => setHomePrice(Number(e.target.value))}
                      className="mt-3 w-full accent-accent"
                      aria-label="Home price slider"
                    />
                    <div className="mt-1 flex justify-between text-[10px] text-text-muted">
                      <span>$50K</span>
                      <span>$3M</span>
                    </div>
                  </div>

                  {/* ── Down Payment ── */}
                  <div className="mb-6">
                    <label className={labelClass}>
                      <DollarSign className="mr-1.5 h-3.5 w-3.5 text-accent" />
                      Down Payment
                      <Tooltip text="The cash you pay upfront. Below 20% requires CMHC mortgage insurance. Canada has tiered minimum requirements." />
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-text-muted">$</span>
                        <input
                          type="text"
                          inputMode="numeric"
                          value={inputs.downPayment.toLocaleString("en-CA")}
                          onChange={(e) =>
                            setDownPaymentDollar(
                              parseCurrencyInput(e.target.value)
                            )
                          }
                          className={inputClass}
                          aria-label="Down payment dollars"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          inputMode="decimal"
                          value={(downPaymentPct * 100).toFixed(1)}
                          onChange={(e) => {
                            const pct =
                              parseFloat(e.target.value.replace(/[^0-9.]/g, "")) /
                              100;
                            if (!isNaN(pct)) setDownPaymentPct(pct);
                          }}
                          className={inputClass}
                          aria-label="Down payment percentage"
                        />
                        <span className="text-sm text-text-muted">%</span>
                      </div>
                    </div>

                    {/* Min DP warning */}
                    {results.belowMinimumDown && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-3 flex items-start gap-2 rounded border border-warning/30 bg-warning/5 p-3"
                      >
                        <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-warning" />
                        <p className="text-xs leading-relaxed text-warning">
                          Minimum required:{" "}
                          {formatCurrency(results.minimumDownPayment)} (
                          {(
                            (results.minimumDownPayment / inputs.homePrice) *
                            100
                          ).toFixed(1)}
                          %)
                        </p>
                      </motion.div>
                    )}

                    {/* CMHC badge */}
                    {results.cmhcRequired && (
                      <div className="mt-3 flex items-center gap-2 text-xs text-text-secondary">
                        <Shield className="h-3.5 w-3.5 text-accent" />
                        CMHC Insurance Required &mdash;{" "}
                        {formatCurrency(results.cmhcPremium)} added to mortgage
                      </div>
                    )}
                  </div>

                  {/* ── Interest Rate ── */}
                  <div className="mb-6">
                    <label className={labelClass}>
                      <Percent className="mr-1.5 h-3.5 w-3.5 text-accent" />
                      Interest Rate
                      <Tooltip text="The annual rate quoted by your lender. Canadian mortgages use semi-annual compounding by law, which this calculator applies automatically." />
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        inputMode="decimal"
                        value={(inputs.annualRate * 100).toFixed(2)}
                        onChange={(e) => {
                          const val = parseFloat(
                            e.target.value.replace(/[^0-9.]/g, "")
                          );
                          if (!isNaN(val))
                            updateInput(
                              "annualRate",
                              clamp(val / 100, 0.005, 0.15)
                            );
                        }}
                        className={`${inputClass} max-w-[120px]`}
                        aria-label="Interest rate"
                      />
                      <span className="text-sm text-text-muted">%</span>
                    </div>
                    <input
                      type="range"
                      min={0.5}
                      max={10}
                      step={0.05}
                      value={inputs.annualRate * 100}
                      onChange={(e) =>
                        updateInput("annualRate", Number(e.target.value) / 100)
                      }
                      className="mt-3 w-full accent-accent"
                      aria-label="Interest rate slider"
                    />
                    <div className="mt-1 flex justify-between text-[10px] text-text-muted">
                      <span>0.5%</span>
                      <span>10%</span>
                    </div>
                  </div>

                  {/* ── Amortization ── */}
                  <div className="mb-6">
                    <label className={labelClass}>
                      <Calendar className="mr-1.5 h-3.5 w-3.5 text-accent" />
                      Amortization Period
                      <Tooltip text="Total time to pay off your mortgage. 25 years is standard in Canada. 30 years available for first-time buyers on insured mortgages." />
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {AMORT_OPTIONS.map((yr) => (
                        <button
                          key={yr}
                          type="button"
                          onClick={() => updateInput("amortYears", yr)}
                          className={`border px-4 py-2.5 text-xs font-medium tracking-wider transition-all duration-300 ${
                            inputs.amortYears === yr
                              ? "border-accent bg-accent/10 text-accent"
                              : "border-border bg-background text-text-secondary hover:border-accent/40 hover:text-text-primary"
                          }`}
                        >
                          {yr} yr
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* ── Payment Frequency ── */}
                  <div className="mb-2">
                    <label className={labelClass}>
                      Payment Frequency
                      <Tooltip text="Accelerated bi-weekly is the most popular choice in Canada. You effectively make 13 monthly payments per year, saving thousands in interest." />
                    </label>
                    <select
                      value={inputs.frequency}
                      onChange={(e) =>
                        updateInput(
                          "frequency",
                          e.target.value as PaymentFrequency
                        )
                      }
                      className={selectClass}
                      aria-label="Payment frequency"
                    >
                      {FREQUENCY_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* ── First-Time Buyer toggle ── */}
                  <div className="mt-5 flex items-center gap-3">
                    <button
                      type="button"
                      role="switch"
                      aria-checked={inputs.isFirstTimeBuyer}
                      onClick={() =>
                        updateInput(
                          "isFirstTimeBuyer",
                          !inputs.isFirstTimeBuyer
                        )
                      }
                      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-300 ${
                        inputs.isFirstTimeBuyer
                          ? "bg-accent"
                          : "bg-border"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-300 ${
                          inputs.isFirstTimeBuyer ? "translate-x-5" : ""
                        }`}
                      />
                    </button>
                    <span className="text-xs font-medium text-text-secondary">
                      First-Time Home Buyer
                    </span>
                    <Tooltip text="First-time buyers in BC may be exempt from Property Transfer Tax on homes up to $500K, and eligible for 30-year amortization on insured mortgages." />
                  </div>
                </div>
              </AnimateIn>

              {/* ── Advanced Options (Expandable) ── */}
              <AnimateIn delay={0.1}>
                <button
                  type="button"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex w-full items-center justify-between border border-border bg-background-secondary px-6 py-4 text-xs font-medium uppercase tracking-[0.15em] text-text-secondary transition-all duration-300 hover:border-accent/40 hover:text-text-primary"
                >
                  <span className="flex items-center gap-2">
                    <Info className="h-3.5 w-3.5 text-accent" />
                    Advanced Options
                  </span>
                  {showAdvanced ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
                <AnimatePresence>
                  {showAdvanced && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-5 border border-t-0 border-border bg-background-secondary p-6">
                        {/* Property Tax */}
                        <div>
                          <label className={labelClass}>
                            Annual Property Tax
                            <Tooltip text="Kelowna property taxes vary by assessed value. A rough estimate is 0.4-0.6% of home value. Check bc assessment for exact figures." />
                          </label>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-text-muted">$</span>
                            <input
                              type="text"
                              inputMode="numeric"
                              value={inputs.propertyTaxAnnual.toLocaleString(
                                "en-CA"
                              )}
                              onChange={(e) =>
                                updateInput(
                                  "propertyTaxAnnual",
                                  parseCurrencyInput(e.target.value)
                                )
                              }
                              className={inputClass}
                              aria-label="Annual property tax"
                            />
                            <span className="text-xs text-text-muted whitespace-nowrap">
                              /yr
                            </span>
                          </div>
                        </div>

                        {/* Home Insurance */}
                        <div>
                          <label className={labelClass}>
                            Annual Home Insurance
                          </label>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-text-muted">$</span>
                            <input
                              type="text"
                              inputMode="numeric"
                              value={inputs.homeInsuranceAnnual.toLocaleString(
                                "en-CA"
                              )}
                              onChange={(e) =>
                                updateInput(
                                  "homeInsuranceAnnual",
                                  parseCurrencyInput(e.target.value)
                                )
                              }
                              className={inputClass}
                              aria-label="Annual home insurance"
                            />
                            <span className="text-xs text-text-muted whitespace-nowrap">
                              /yr
                            </span>
                          </div>
                        </div>

                        {/* Strata / HOA */}
                        <div>
                          <label className={labelClass}>
                            Monthly Strata / HOA Fees
                          </label>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-text-muted">$</span>
                            <input
                              type="text"
                              inputMode="numeric"
                              value={inputs.strataMonthly.toLocaleString(
                                "en-CA"
                              )}
                              onChange={(e) =>
                                updateInput(
                                  "strataMonthly",
                                  parseCurrencyInput(e.target.value)
                                )
                              }
                              className={inputClass}
                              aria-label="Monthly strata fees"
                            />
                            <span className="text-xs text-text-muted whitespace-nowrap">
                              /mo
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </AnimateIn>
            </div>

            {/* ═══════════ RIGHT COLUMN — OUTPUTS ═══════════ */}
            <div className="space-y-6">
              {/* ── Hero Payment Display ── */}
              <AnimateIn delay={0.05} direction="right">
                <div className="border border-border bg-background-secondary p-6 text-center md:p-8">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-muted">
                    Your Estimated {getFrequencyLabel(inputs.frequency)} Payment
                  </p>
                  <motion.p
                    key={results.frequencyPayment.toFixed(0)}
                    initial={{ opacity: 0.6, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="mt-3 font-heading text-5xl font-semibold tracking-tight text-accent md:text-6xl"
                  >
                    {formatCurrency(results.frequencyPayment)}
                  </motion.p>
                  <p className="mt-2 text-sm text-text-secondary">
                    Total monthly housing cost:{" "}
                    <span className="font-medium text-text-primary">
                      {formatCurrency(results.totalMonthlyHousing)}
                    </span>
                  </p>
                </div>
              </AnimateIn>

              {/* ── Donut Chart ── */}
              <AnimateIn delay={0.1} direction="right">
                <div className="border border-border bg-background-secondary p-6 md:p-8">
                  <h3 className="mb-6 text-center text-xs font-medium uppercase tracking-[0.2em] text-text-muted">
                    Payment Breakdown
                  </h3>
                  <DonutChart
                    segments={donutSegments}
                    centerLabel={getFrequencyLabel(inputs.frequency)}
                    centerValue={formatCurrency(results.totalMonthlyHousing)}
                  />
                </div>
              </AnimateIn>

              {/* ── Cost Breakdown List ── */}
              <AnimateIn delay={0.15} direction="right">
                <div className="border border-border bg-background-secondary p-6 md:p-8">
                  <h3 className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-text-muted">
                    Monthly Cost Breakdown
                  </h3>
                  <div className="space-y-3">
                    {[
                      {
                        label: "Principal & Interest",
                        value: results.monthlyPI,
                        color: CHART_COLORS.pi,
                      },
                      {
                        label: "Property Tax",
                        value: results.propertyTaxMonthly,
                        color: CHART_COLORS.tax,
                      },
                      {
                        label: "Home Insurance",
                        value: results.homeInsuranceMonthly,
                        color: CHART_COLORS.insurance,
                      },
                      ...(results.cmhcRequired
                        ? [
                            {
                              label: "CMHC (amortized)",
                              value:
                                results.cmhcPremium /
                                (inputs.amortYears * 12),
                              color: CHART_COLORS.cmhc,
                            },
                          ]
                        : []),
                      ...(inputs.strataMonthly > 0
                        ? [
                            {
                              label: "Strata / HOA",
                              value: inputs.strataMonthly,
                              color: CHART_COLORS.strata,
                            },
                          ]
                        : []),
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between border-b border-border/50 pb-3 last:border-0 last:pb-0"
                      >
                        <span className="flex items-center gap-2 text-sm text-text-secondary">
                          <span
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                          {item.label}
                        </span>
                        <span className="text-sm font-medium tabular-nums text-text-primary">
                          {formatCurrency(item.value)}
                        </span>
                      </div>
                    ))}
                    {/* Total */}
                    <div className="flex items-center justify-between border-t border-accent/20 pt-3">
                      <span className="text-sm font-semibold text-text-primary">
                        Total
                      </span>
                      <span className="text-sm font-semibold tabular-nums text-accent">
                        {formatCurrency(results.totalMonthlyHousing)}
                      </span>
                    </div>
                  </div>
                </div>
              </AnimateIn>

              {/* ── Summary Metric Cards ── */}
              <AnimateIn delay={0.2} direction="right">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      label: "Total Mortgage",
                      value: formatCurrency(results.totalMortgageAmount),
                      icon: DollarSign,
                    },
                    {
                      label: "Total Interest",
                      value: formatCurrency(results.totalInterest),
                      icon: TrendingDown,
                    },
                    {
                      label: "Mortgage Payoff",
                      value: results.payoffDate,
                      icon: Calendar,
                    },
                    {
                      label: "BC Property Transfer Tax",
                      value: formatCurrency(
                        results.bcPTT - results.bcPTTSavings
                      ),
                      icon: Home,
                      sub:
                        results.bcPTTSavings > 0
                          ? `Saving ${formatCurrency(results.bcPTTSavings)} (FTHB)`
                          : undefined,
                    },
                  ].map((card) => (
                    <div
                      key={card.label}
                      className="border border-border bg-background-secondary p-4 transition-all duration-300 hover:border-accent/30"
                    >
                      <card.icon className="mb-2 h-4 w-4 text-accent" />
                      <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-text-muted">
                        {card.label}
                      </p>
                      <p className="mt-1 text-lg font-semibold tabular-nums text-text-primary">
                        {card.value}
                      </p>
                      {card.sub && (
                        <p className="mt-1 text-[10px] text-success">
                          {card.sub}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </AnimateIn>

              {/* ── Stress Test Card ── */}
              <AnimateIn delay={0.25} direction="right">
                <div className="border border-border bg-background-secondary p-6 md:p-8">
                  <div className="flex items-start gap-3">
                    <Shield className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    <div>
                      <h3 className="text-sm font-semibold text-text-primary">
                        Mortgage Stress Test
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-text-secondary">
                        Canadian lenders require you to qualify at the higher of
                        your contract rate + 2% or 5.25%. This ensures you can
                        handle rate increases.
                      </p>
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-text-muted">
                            Your Rate
                          </p>
                          <p className="mt-1 text-lg font-semibold tabular-nums text-accent">
                            {formatCurrency(results.monthlyPI)}
                            <span className="text-xs font-normal text-text-muted">
                              /mo
                            </span>
                          </p>
                          <p className="text-[10px] text-text-muted">
                            at {(inputs.annualRate * 100).toFixed(2)}%
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-text-muted">
                            Qualifying Rate
                          </p>
                          <p className="mt-1 text-lg font-semibold tabular-nums text-warm">
                            {formatCurrency(results.stressTestPayment)}
                            <span className="text-xs font-normal text-text-muted">
                              /mo
                            </span>
                          </p>
                          <p className="text-[10px] text-text-muted">
                            at{" "}
                            {(results.stressTestRate * 100).toFixed(2)}%
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimateIn>

              {/* ── Lead Capture Form (GHL Integration) ── */}
              <AnimateIn delay={0.3} direction="right">
                <div className="border border-accent/20 bg-background-secondary p-6 md:p-8">
                  {leadSubmitted ? (
                    /* ─── Success ─── */
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="flex flex-col items-center py-6 text-center"
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-accent/30 bg-accent/10">
                        <CheckCircle2 className="h-7 w-7 text-accent" />
                      </div>
                      <h3 className="mt-5 font-heading text-xl font-light text-text-primary">
                        You&apos;re All Set
                      </h3>
                      <p className="mt-2 max-w-sm text-sm leading-relaxed text-text-secondary">
                        Thanks for reaching out. I&apos;ll review your mortgage
                        details and be in touch within 24 hours to discuss your
                        options.
                      </p>
                    </motion.div>
                  ) : (
                    /* ─── Form ─── */
                    <>
                      <div className="mb-6 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center border border-accent/20 bg-accent/5">
                          <Mail className="h-4 w-4 text-accent" />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-text-primary">
                            Get Personalized Advice
                          </h3>
                          <p className="text-xs text-text-secondary">
                            I&apos;ll review your numbers and help you plan your
                            next steps.
                          </p>
                        </div>
                      </div>

                      <form onSubmit={handleLeadSubmit} className="space-y-4">
                        {/* Name */}
                        <div>
                          <label className={labelClass}>
                            <User className="mr-1.5 h-3.5 w-3.5 text-accent" />
                            Full Name
                          </label>
                          <input
                            type="text"
                            required
                            value={leadForm.name}
                            onChange={(e) =>
                              setLeadForm((p) => ({
                                ...p,
                                name: e.target.value,
                              }))
                            }
                            placeholder="Your full name"
                            className={inputClass}
                          />
                        </div>

                        {/* Email */}
                        <div>
                          <label className={labelClass}>
                            <Mail className="mr-1.5 h-3.5 w-3.5 text-accent" />
                            Email
                          </label>
                          <input
                            type="email"
                            required
                            value={leadForm.email}
                            onChange={(e) =>
                              setLeadForm((p) => ({
                                ...p,
                                email: e.target.value,
                              }))
                            }
                            placeholder="you@email.com"
                            className={inputClass}
                          />
                        </div>

                        {/* Phone & Timeline */}
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className={labelClass}>
                              <Phone className="mr-1.5 h-3.5 w-3.5 text-accent" />
                              Phone
                              <span className="ml-1 text-text-muted/50 normal-case tracking-normal">
                                (optional)
                              </span>
                            </label>
                            <input
                              type="tel"
                              value={leadForm.phone}
                              onChange={(e) =>
                                setLeadForm((p) => ({
                                  ...p,
                                  phone: e.target.value,
                                }))
                              }
                              placeholder="(250) 000-0000"
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label className={labelClass}>
                              <Calendar className="mr-1.5 h-3.5 w-3.5 text-accent" />
                              Timeline
                            </label>
                            <select
                              value={leadForm.timeline}
                              onChange={(e) =>
                                setLeadForm((p) => ({
                                  ...p,
                                  timeline: e.target.value,
                                }))
                              }
                              className={selectClass}
                            >
                              <option value="">Select</option>
                              <option value="Immediately">Immediately</option>
                              <option value="1-3 months">1-3 Months</option>
                              <option value="3-6 months">3-6 Months</option>
                              <option value="6-12 months">6-12 Months</option>
                              <option value="Just exploring">
                                Just Exploring
                              </option>
                            </select>
                          </div>
                        </div>

                        {/* What gets sent — transparency note */}
                        <p className="text-[10px] leading-relaxed text-text-muted">
                          Your calculator results (home price, down payment, rate,
                          amortization) will be included so I can give you tailored
                          advice.
                        </p>

                        {/* Error */}
                        {leadError && (
                          <p className="text-xs text-red-400">{leadError}</p>
                        )}

                        {/* Submit */}
                        <button
                          type="submit"
                          disabled={leadSubmitting}
                          className="group flex w-full items-center justify-center gap-3 border border-warm bg-warm px-6 py-4 text-xs font-medium uppercase tracking-[0.2em] text-background transition-all duration-300 hover:bg-warm-hover disabled:opacity-60"
                        >
                          {leadSubmitting ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="h-3.5 w-3.5" />
                              Get My Personalized Breakdown
                              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                            </>
                          )}
                        </button>
                      </form>
                    </>
                  )}
                </div>
              </AnimateIn>
            </div>
          </div>

          {/* ════════════════════════════════════════
              AMORTIZATION SCHEDULE (Full-width)
              ════════════════════════════════════════ */}
          <div className="mt-12">
            <AnimateIn>
              <button
                type="button"
                onClick={() => setShowAmortization(!showAmortization)}
                className="flex w-full items-center justify-between border border-border bg-background-secondary px-6 py-5 transition-all duration-300 hover:border-accent/40"
              >
                <span className="flex items-center gap-2 text-sm font-medium text-text-primary">
                  <Calendar className="h-4 w-4 text-accent" />
                  Amortization Schedule — Yearly Summary
                </span>
                {showAmortization ? (
                  <ChevronUp className="h-4 w-4 text-text-secondary" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-text-secondary" />
                )}
              </button>
            </AnimateIn>

            <AnimatePresence>
              {showAmortization && yearlySummary.length > 0 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden"
                >
                  <div className="border border-t-0 border-border bg-background-secondary">
                    {/* Header */}
                    <div className="hidden grid-cols-6 gap-2 border-b border-border px-6 py-3 text-[10px] font-medium uppercase tracking-[0.15em] text-text-muted sm:grid">
                      <span>Year</span>
                      <span className="text-right">Annual Payments</span>
                      <span className="text-right">Principal</span>
                      <span className="text-right">Interest</span>
                      <span className="text-right">Balance</span>
                      <span className="text-right">Cumulative Interest</span>
                    </div>

                    {/* Rows */}
                    <div className="max-h-[500px] overflow-y-auto">
                      {yearlySummary.map((yr) => (
                        <div
                          key={yr.year}
                          className="border-b border-border/50 last:border-0"
                        >
                          <div className="grid grid-cols-3 gap-2 px-6 py-3 text-xs sm:grid-cols-6">
                            <span className="font-medium text-text-primary">
                              Year {yr.year}
                            </span>
                            <span className="text-right tabular-nums text-text-secondary">
                              {formatCurrency(yr.annualPayments)}
                            </span>
                            <span className="text-right tabular-nums text-accent">
                              {formatCurrency(yr.principalPaid)}
                            </span>
                            <span className="hidden text-right tabular-nums text-warm sm:block">
                              {formatCurrency(yr.interestPaid)}
                            </span>
                            <span className="hidden text-right tabular-nums text-text-secondary sm:block">
                              {formatCurrency(yr.remainingBalance)}
                            </span>
                            <span className="hidden text-right tabular-nums text-text-muted sm:block">
                              {formatCurrency(yr.cumulativeInterest)}
                            </span>
                          </div>

                          {/* Progress bar for principal vs interest */}
                          <div className="mx-6 mb-3 flex h-1.5 overflow-hidden rounded-full bg-border/50">
                            <div
                              className="rounded-l-full bg-accent transition-all duration-500"
                              style={{
                                width: `${
                                  (yr.principalPaid /
                                    (yr.principalPaid + yr.interestPaid)) *
                                  100
                                }%`,
                              }}
                            />
                            <div
                              className="rounded-r-full bg-warm transition-all duration-500"
                              style={{
                                width: `${
                                  (yr.interestPaid /
                                    (yr.principalPaid + yr.interestPaid)) *
                                  100
                                }%`,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Legend */}
                    <div className="flex items-center justify-center gap-6 border-t border-border px-6 py-3">
                      <span className="flex items-center gap-1.5 text-[10px] text-text-secondary">
                        <span className="h-2 w-2 rounded-full bg-accent" />
                        Principal
                      </span>
                      <span className="flex items-center gap-1.5 text-[10px] text-text-secondary">
                        <span className="h-2 w-2 rounded-full bg-warm" />
                        Interest
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          EDUCATIONAL CONTENT (SEO)
          ════════════════════════════════════════ */}
      <section className="bg-background-secondary py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <AnimateIn>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-accent">
              Understanding Your Mortgage
            </p>
            <h2 className="font-heading text-3xl font-light tracking-tight md:text-4xl">
              How Canadian Mortgages Work
            </h2>
          </AnimateIn>

          <div className="mt-10 space-y-10">
            <AnimateIn delay={0.1}>
              <div>
                <h3 className="font-heading text-xl font-medium text-text-primary">
                  Semi-Annual Compounding
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  Unlike American mortgages that compound monthly, Canadian
                  mortgage interest is compounded semi-annually by law under the
                  Bank Act. This means your effective monthly rate is slightly
                  lower than simply dividing the annual rate by twelve. This
                  calculator uses the correct Canadian formula, ensuring your
                  payment estimates are accurate to the penny.
                </p>
              </div>
            </AnimateIn>

            <AnimateIn delay={0.15}>
              <div>
                <h3 className="font-heading text-xl font-medium text-text-primary">
                  CMHC Mortgage Insurance
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  When your down payment is less than 20% of the purchase price,
                  Canadian law requires mortgage default insurance through CMHC,
                  Sagen, or Canada Guaranty. The premium ranges from 2.8% to
                  4.0% of the mortgage amount depending on your loan-to-value
                  ratio, and is added directly to your mortgage principal. For
                  first-time buyers choosing a 30-year amortization, an
                  additional 0.20% surcharge applies.
                </p>
              </div>
            </AnimateIn>

            <AnimateIn delay={0.2}>
              <div>
                <h3 className="font-heading text-xl font-medium text-text-primary">
                  BC Property Transfer Tax
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  British Columbia charges a Property Transfer Tax on all real
                  estate purchases. The tax is calculated on tiered brackets:
                  1% on the first $200,000, 2% from $200,001 to $2,000,000, 3%
                  from $2,000,001 to $3,000,000, and 5% above $3,000,000.
                  First-time home buyers may qualify for a full exemption on
                  properties up to $500,000 or a partial exemption up to
                  $525,000.
                </p>
              </div>
            </AnimateIn>

            <AnimateIn delay={0.25}>
              <div>
                <h3 className="font-heading text-xl font-medium text-text-primary">
                  Accelerated Payments Save Thousands
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  Choosing accelerated bi-weekly payments is one of the simplest
                  ways to pay off your mortgage faster. By paying half your
                  monthly payment every two weeks, you effectively make the
                  equivalent of 13 monthly payments per year instead of 12. On
                  a typical Kelowna mortgage, this can save tens of thousands
                  of dollars in interest and shave years off your amortization.
                </p>
              </div>
            </AnimateIn>
          </div>

          {/* Final CTA */}
          <AnimateIn delay={0.3}>
            <div className="mt-16 text-center">
              <p className="mb-6 text-text-secondary">
                Have questions about your mortgage options? I am here to help.
              </p>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 border border-accent bg-transparent px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] text-accent transition-all duration-300 hover:bg-accent/10"
              >
                Talk to Karsen
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── Mobile Sticky Payment Bar ── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 backdrop-blur-lg px-4 py-3 lg:hidden">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-text-muted">
              {getFrequencyLabel(inputs.frequency)} Payment
            </p>
            <p className="font-heading text-2xl font-semibold tracking-tight text-accent">
              {formatCurrency(results.frequencyPayment)}
            </p>
          </div>
          <Link
            href="/contact"
            className="flex items-center gap-2 border border-warm bg-warm px-5 py-3 text-[10px] font-medium uppercase tracking-[0.15em] text-background transition-all hover:bg-warm-hover"
          >
            Get Pre-Approved
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* Spacer for mobile sticky bar */}
      <div className="h-[72px] lg:hidden" />
    </>
  );
}
