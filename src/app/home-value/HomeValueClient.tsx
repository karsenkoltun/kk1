"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";
import AnimateIn from "@/components/ui/AnimateIn";

const inputClasses =
  "w-full border border-border bg-background-secondary/50 px-5 py-4 text-sm text-text-primary placeholder:text-text-muted outline-none transition-all duration-300 focus:border-warm focus:bg-background-secondary/80";

export default function HomeValueClient() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    neighborhood: "",
    phone: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      {/* Background effects */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #070B14 0%, #0C1220 20%, #1a2744 45%, #1e293b 65%, #111827 85%, #070B14 100%)",
        }}
      />
      <div className="absolute top-1/4 right-1/3 h-[500px] w-[600px] rounded-full bg-warm/5 blur-[150px]" />
      <div className="absolute bottom-1/3 left-0 h-[400px] w-[500px] rounded-full bg-accent/4 blur-[120px]" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/20" />

      {/* KARSEN KOLTUN branding top center */}
      <div className="relative z-10 flex justify-center pt-28 pb-4">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading text-sm font-semibold tracking-[0.35em] text-text-primary uppercase"
        >
          Karsen Koltun
        </motion.p>
      </div>

      {/* Warm glow line */}
      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <div
          className="h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(232,213,163,0.3) 20%, rgba(232,213,163,0.5) 50%, rgba(232,213,163,0.3) 80%, transparent)",
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-12 pb-20 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left column */}
          <div>
            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="font-heading text-5xl font-light leading-[1.1] tracking-tight text-text-primary sm:text-6xl md:text-7xl"
            >
              Get a Free Home Valuation
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-6 max-w-lg text-text-secondary leading-relaxed"
            >
              Get an expert assessment of what your home is really worth in
              today&apos;s market.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mt-4 max-w-lg text-text-secondary leading-relaxed"
            >
              Book a no-obligation visit with me and I&apos;ll personally
              evaluate your home&apos;s value and selling potential.
            </motion.p>

            {/* Form card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="mt-10"
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="border border-warm/15 bg-background/70 p-10 text-center backdrop-blur-xl"
                  >
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-accent/30 bg-accent/10">
                      <CheckCircle className="h-8 w-8 text-accent" />
                    </div>
                    <h2 className="mt-6 font-heading text-3xl font-light text-text-primary">
                      Thank You!
                    </h2>
                    <p className="mx-auto mt-4 max-w-md text-text-secondary">
                      I&apos;ll review your property details and reach out
                      within 24 hours to schedule your free evaluation.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: "",
                          address: "",
                          neighborhood: "",
                          phone: "",
                        });
                      }}
                      className="mt-8 text-xs font-medium tracking-[0.15em] text-warm uppercase transition-colors hover:text-warm-hover"
                    >
                      Submit Another Request
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="border border-warm/15 bg-background/70 p-8 backdrop-blur-xl sm:p-10"
                  >
                    <h3 className="font-heading text-2xl font-light text-text-primary">
                      Get a Free Home Valuation
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                      Book a no-obligation visit with me and I&apos;ll
                      personally evaluate your home&apos;s value and selling
                      potential.
                    </p>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-1">
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
                        name="neighborhood"
                        type="text"
                        value={formData.neighborhood}
                        onChange={handleChange}
                        placeholder="Neighborhood"
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

                      <div className="pt-4">
                        <button
                          type="submit"
                          className="w-full border border-warm bg-warm py-4 text-sm font-semibold tracking-wide text-background transition-all duration-300 hover:bg-warm-hover hover:shadow-[0_0_20px_rgba(232,213,163,0.2)]"
                        >
                          Schedule My Free Evaluation
                        </button>
                      </div>

                      <p className="pt-3 text-center text-xs text-text-muted">
                        100% confidential. No pressure. Let&apos;s see what your
                        property is worth.
                      </p>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Right column: Karsen photo placeholder */}
          <AnimateIn direction="right" delay={0.4}>
            <div className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden border border-warm/10 bg-background-secondary lg:max-w-none">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="h-24 w-24 rounded-full border border-warm/20 bg-warm/5" />
                <span className="text-sm tracking-widest text-text-muted uppercase">
                  Photo Coming Soon
                </span>
              </div>
              {/* Warm corner accents */}
              <div className="absolute top-0 left-0 h-16 w-16 border-t border-l border-warm/30" />
              <div className="absolute right-0 bottom-0 h-16 w-16 border-r border-b border-warm/30" />
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
