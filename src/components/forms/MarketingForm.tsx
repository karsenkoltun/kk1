"use client";

import { ArrowRight } from "lucide-react";

export default function MarketingForm() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="mt-8 space-y-4 text-left"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          type="text"
          placeholder="Your Name"
          className="border border-border bg-background-secondary px-5 py-4 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-accent"
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          className="border border-border bg-background-secondary px-5 py-4 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-accent"
          required
        />
      </div>
      <input
        type="text"
        placeholder="Business / Brand Name"
        className="w-full border border-border bg-background-secondary px-5 py-4 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-accent"
      />
      <textarea
        placeholder="Tell me about your project and goals..."
        rows={4}
        className="w-full border border-border bg-background-secondary px-5 py-4 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-accent resize-none"
      />
      <button
        type="submit"
        className="group flex w-full items-center justify-center gap-3 border border-accent bg-accent px-8 py-4 text-xs font-medium tracking-[0.2em] text-background uppercase transition-all duration-300 hover:bg-transparent hover:text-accent"
      >
        Submit Application
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </form>
  );
}
