"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AnimateIn from "@/components/ui/AnimateIn";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Simulate submission
    setIsSubmitted(true);
  };

  return (
    <section className="relative overflow-hidden bg-background-tertiary py-16 md:py-24 lg:py-32">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(201,168,76,0.4) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Faint gradient glow */}
      <div className="absolute -top-40 right-1/4 h-[400px] w-[400px] rounded-full bg-accent/3 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <AnimateIn>
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
            {/* Left side: text content */}
            <div>
              <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
                Stay Updated
              </p>
              <h2 className="mt-4 font-heading text-4xl font-light tracking-tight text-text-primary md:text-5xl">
                Kelowna Market
                <br />
                <span className="italic text-accent">Insights</span>
              </h2>
              <p className="mt-6 max-w-md text-text-secondary leading-relaxed">
                Get monthly market updates, new listings, and real estate tips
                delivered straight to your inbox. Stay ahead of the Okanagan
                market.
              </p>

              {/* Trust indicators */}
              <div className="mt-8 flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span className="text-xs text-text-muted">Monthly updates</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span className="text-xs text-text-muted">Market data</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span className="text-xs text-text-muted">Free</span>
                </div>
              </div>
            </div>

            {/* Right side: form or success state */}
            <div>
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
                      className="flex flex-col gap-3"
                    >
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email address"
                        className="w-full border border-border bg-background px-6 py-4 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-accent"
                        required
                      />
                      <button
                        type="submit"
                        className="group flex w-full items-center justify-center gap-2 border border-accent bg-accent px-8 py-4 text-xs font-medium tracking-[0.2em] text-background uppercase transition-all duration-300 hover:bg-transparent hover:text-accent"
                      >
                        Subscribe
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </button>
                    </form>

                    {/* Privacy text */}
                    <p className="mt-4 text-xs text-text-muted/60">
                      No spam, ever. Unsubscribe anytime. We respect your privacy.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center justify-center border border-border bg-background p-12 text-center"
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
                      <CheckCircle className="h-12 w-12 text-emerald-500" strokeWidth={1.5} />
                    </motion.div>
                    <h3 className="mt-6 font-heading text-2xl font-light text-text-primary">
                      You&apos;re on the list!
                    </h3>
                    <p className="mt-3 text-sm text-text-secondary">
                      Welcome aboard. Keep an eye on your inbox for the next
                      Kelowna market update.
                    </p>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setEmail("");
                      }}
                      className="mt-6 text-xs tracking-[0.15em] text-text-muted uppercase transition-colors hover:text-accent"
                    >
                      Subscribe another email
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
