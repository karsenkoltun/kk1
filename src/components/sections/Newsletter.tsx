"use client";

import { ArrowRight } from "lucide-react";
import AnimateIn from "@/components/ui/AnimateIn";

export default function Newsletter() {
  return (
    <section className="bg-background-tertiary py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
        <AnimateIn>
          <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
            Stay Updated
          </p>
          <h2 className="mt-4 font-heading text-4xl font-light tracking-tight text-text-primary md:text-5xl">
            Kelowna Market Insights
          </h2>
          <p className="mx-auto mt-4 max-w-md text-text-secondary">
            Get monthly market updates, new listings, and real estate tips
            delivered straight to your inbox.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-0"
          >
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 border border-border bg-background px-6 py-4 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-accent sm:border-r-0"
              required
            />
            <button
              type="submit"
              className="group flex items-center justify-center gap-2 border border-accent bg-accent px-8 py-4 text-xs font-medium tracking-[0.2em] text-background uppercase transition-all duration-300 hover:bg-transparent hover:text-accent"
            >
              Subscribe
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </form>

          <p className="mt-4 text-xs text-text-muted">
            No spam. Unsubscribe anytime.
          </p>
        </AnimateIn>
      </div>
    </section>
  );
}
