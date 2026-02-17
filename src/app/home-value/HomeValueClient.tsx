"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Star,
  Home,
  TrendingUp,
  CheckCircle,
  MapPin,
  User,
  ClipboardList,
} from "lucide-react";
import AnimateIn from "@/components/ui/AnimateIn";
import { cn } from "@/lib/utils";

const trustElements = [
  { icon: Home, value: "300+", label: "Homes Marketed" },
  { icon: Star, value: "5.0", label: "Google Rating" },
  { icon: TrendingUp, value: "8+", label: "Years Experience" },
];

const steps = [
  { number: 1, title: "Property Info", icon: MapPin },
  { number: 2, title: "Property Details", icon: ClipboardList },
  { number: 3, title: "Contact Info", icon: User },
];

const inputClasses =
  "w-full border border-border bg-background-secondary px-5 py-4 text-sm text-text-primary placeholder:text-text-muted outline-none transition-all duration-300 focus:border-accent focus:bg-background-secondary/80";

const selectClasses =
  "w-full border border-border bg-background-secondary px-5 py-4 text-sm text-text-muted outline-none transition-all duration-300 focus:border-accent appearance-none cursor-pointer";

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
  }),
};

export default function HomeValueClient() {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const goNext = () => {
    if (currentStep < 3) {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    }
  };

  const goPrev = () => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      {/* Accent glow orbs */}
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

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-12"
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              /* Success Screen */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="border border-border bg-background-secondary p-10 text-center md:p-14"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-accent/30 bg-accent/10">
                  <CheckCircle className="h-8 w-8 text-accent" />
                </div>
                <h2 className="mt-6 font-heading text-3xl font-light text-text-primary md:text-4xl">
                  Thank You!
                </h2>
                <p className="mx-auto mt-4 max-w-md text-text-secondary">
                  I&apos;ll send your personalized home valuation within 24
                  hours. Keep an eye on your inbox.
                </p>
                <div className="mt-8 inline-block border border-accent/20 bg-accent/5 px-6 py-3">
                  <p className="text-xs tracking-[0.2em] text-accent uppercase">
                    Estimated Response Time: Within 24 Hours
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="border border-border bg-background-secondary"
              >
                {/* Step Indicator */}
                <div className="border-b border-border px-6 py-6 md:px-10">
                  <div className="flex items-center justify-between">
                    {steps.map((step, i) => (
                      <div key={step.number} className="flex items-center">
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              "flex h-9 w-9 items-center justify-center border transition-all duration-300",
                              currentStep >= step.number
                                ? "border-accent bg-accent text-background"
                                : "border-border bg-background text-text-muted"
                            )}
                          >
                            {currentStep > step.number ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : (
                              <step.icon className="h-4 w-4" />
                            )}
                          </div>
                          <div className="hidden sm:block">
                            <p
                              className={cn(
                                "text-[10px] font-medium tracking-[0.2em] uppercase transition-colors duration-300",
                                currentStep >= step.number
                                  ? "text-accent"
                                  : "text-text-muted"
                              )}
                            >
                              Step {step.number}
                            </p>
                            <p
                              className={cn(
                                "text-xs transition-colors duration-300",
                                currentStep >= step.number
                                  ? "text-text-primary"
                                  : "text-text-muted"
                              )}
                            >
                              {step.title}
                            </p>
                          </div>
                        </div>
                        {i < steps.length - 1 && (
                          <div
                            className={cn(
                              "mx-3 h-px w-8 transition-colors duration-300 sm:mx-4 sm:w-12 md:w-16",
                              currentStep > step.number
                                ? "bg-accent"
                                : "bg-border"
                            )}
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-5 h-px w-full bg-border">
                    <motion.div
                      className="h-full bg-accent"
                      initial={{ width: "0%" }}
                      animate={{
                        width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
                      }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    />
                  </div>
                </div>

                {/* Form Content */}
                <form onSubmit={handleSubmit}>
                  <div className="overflow-hidden px-6 py-8 md:px-10 md:py-10">
                    <AnimatePresence mode="wait" custom={direction}>
                      {/* Step 1: Property Info */}
                      {currentStep === 1 && (
                        <motion.div
                          key="step1"
                          custom={direction}
                          variants={slideVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="space-y-5"
                        >
                          <div>
                            <label className="mb-2 block text-[11px] font-medium tracking-[0.2em] text-text-muted uppercase">
                              Property Address *
                            </label>
                            <input
                              type="text"
                              placeholder="123 Lakeshore Road, Kelowna, BC"
                              className={inputClasses}
                              required
                            />
                          </div>

                          <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                              <label className="mb-2 block text-[11px] font-medium tracking-[0.2em] text-text-muted uppercase">
                                Property Type *
                              </label>
                              <select
                                className={selectClasses}
                                defaultValue=""
                              >
                                <option value="" disabled>
                                  Select type
                                </option>
                                <option value="detached">
                                  Detached House
                                </option>
                                <option value="semi">Semi-Detached</option>
                                <option value="townhome">Townhome</option>
                                <option value="condo">
                                  Condo / Apartment
                                </option>
                                <option value="duplex">Duplex</option>
                                <option value="acreage">
                                  Acreage / Rural
                                </option>
                                <option value="land">Vacant Land</option>
                                <option value="other">Other</option>
                              </select>
                            </div>
                            <div>
                              <label className="mb-2 block text-[11px] font-medium tracking-[0.2em] text-text-muted uppercase">
                                Year Built
                              </label>
                              <input
                                type="text"
                                placeholder="e.g. 2005"
                                className={inputClasses}
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Step 2: Property Details */}
                      {currentStep === 2 && (
                        <motion.div
                          key="step2"
                          custom={direction}
                          variants={slideVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="space-y-5"
                        >
                          <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                              <label className="mb-2 block text-[11px] font-medium tracking-[0.2em] text-text-muted uppercase">
                                Bedrooms
                              </label>
                              <select
                                className={selectClasses}
                                defaultValue=""
                              >
                                <option value="" disabled>
                                  Select
                                </option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6+">6+</option>
                              </select>
                            </div>
                            <div>
                              <label className="mb-2 block text-[11px] font-medium tracking-[0.2em] text-text-muted uppercase">
                                Bathrooms
                              </label>
                              <select
                                className={selectClasses}
                                defaultValue=""
                              >
                                <option value="" disabled>
                                  Select
                                </option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5+">5+</option>
                              </select>
                            </div>
                          </div>

                          <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                              <label className="mb-2 block text-[11px] font-medium tracking-[0.2em] text-text-muted uppercase">
                                Square Footage
                              </label>
                              <input
                                type="text"
                                placeholder="e.g. 2,400"
                                className={inputClasses}
                              />
                            </div>
                            <div>
                              <label className="mb-2 block text-[11px] font-medium tracking-[0.2em] text-text-muted uppercase">
                                Lot Size
                              </label>
                              <input
                                type="text"
                                placeholder="e.g. 6,000 sqft or 0.25 acres"
                                className={inputClasses}
                              />
                            </div>
                          </div>

                          <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                              <label className="mb-2 block text-[11px] font-medium tracking-[0.2em] text-text-muted uppercase">
                                Recent Renovations
                              </label>
                              <select
                                className={selectClasses}
                                defaultValue=""
                              >
                                <option value="" disabled>
                                  Select
                                </option>
                                <option value="none">None</option>
                                <option value="minor">Minor Updates</option>
                                <option value="moderate">
                                  Moderate Renovations
                                </option>
                                <option value="major">
                                  Major Renovations
                                </option>
                                <option value="full">Full Renovation</option>
                              </select>
                            </div>
                            <div>
                              <label className="mb-2 block text-[11px] font-medium tracking-[0.2em] text-text-muted uppercase">
                                Garage
                              </label>
                              <select
                                className={selectClasses}
                                defaultValue=""
                              >
                                <option value="" disabled>
                                  Select
                                </option>
                                <option value="none">No Garage</option>
                                <option value="single">Single</option>
                                <option value="double">Double</option>
                                <option value="triple">Triple</option>
                                <option value="carport">Carport</option>
                              </select>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Step 3: Contact Info */}
                      {currentStep === 3 && (
                        <motion.div
                          key="step3"
                          custom={direction}
                          variants={slideVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="space-y-5"
                        >
                          <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                              <label className="mb-2 block text-[11px] font-medium tracking-[0.2em] text-text-muted uppercase">
                                Full Name *
                              </label>
                              <input
                                type="text"
                                placeholder="Your full name"
                                className={inputClasses}
                                required
                              />
                            </div>
                            <div>
                              <label className="mb-2 block text-[11px] font-medium tracking-[0.2em] text-text-muted uppercase">
                                Email Address *
                              </label>
                              <input
                                type="email"
                                placeholder="you@email.com"
                                className={inputClasses}
                                required
                              />
                            </div>
                          </div>

                          <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                              <label className="mb-2 block text-[11px] font-medium tracking-[0.2em] text-text-muted uppercase">
                                Phone Number
                              </label>
                              <input
                                type="tel"
                                placeholder="(250) 000-0000"
                                className={inputClasses}
                              />
                            </div>
                            <div>
                              <label className="mb-2 block text-[11px] font-medium tracking-[0.2em] text-text-muted uppercase">
                                Timeline to Sell
                              </label>
                              <select
                                className={selectClasses}
                                defaultValue=""
                              >
                                <option value="" disabled>
                                  Select timeline
                                </option>
                                <option value="asap">As soon as possible</option>
                                <option value="1-3">1 - 3 months</option>
                                <option value="3-6">3 - 6 months</option>
                                <option value="6-12">6 - 12 months</option>
                                <option value="12+">12+ months</option>
                                <option value="curious">
                                  Just curious about value
                                </option>
                              </select>
                            </div>
                          </div>

                          <div>
                            <label className="mb-2 block text-[11px] font-medium tracking-[0.2em] text-text-muted uppercase">
                              Anything else I should know?
                            </label>
                            <textarea
                              placeholder="Special features, recent upgrades, unique selling points..."
                              rows={4}
                              className={cn(inputClasses, "resize-none")}
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between border-t border-border px-6 py-6 md:px-10">
                    {currentStep > 1 ? (
                      <button
                        type="button"
                        onClick={goPrev}
                        className="group flex items-center gap-2 text-xs font-medium tracking-[0.2em] text-text-muted uppercase transition-colors duration-300 hover:text-text-primary"
                      >
                        <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
                        Previous Step
                      </button>
                    ) : (
                      <div />
                    )}

                    {currentStep < 3 ? (
                      <button
                        type="button"
                        onClick={goNext}
                        className="group flex items-center gap-3 border border-accent bg-accent px-8 py-4 text-xs font-medium tracking-[0.2em] text-background uppercase transition-all duration-300 hover:bg-transparent hover:text-accent"
                      >
                        Next Step
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="group flex items-center gap-3 border border-accent bg-accent px-8 py-4 text-xs font-medium tracking-[0.2em] text-background uppercase transition-all duration-300 hover:bg-transparent hover:text-accent"
                      >
                        Get My Valuation
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </button>
                    )}
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

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
