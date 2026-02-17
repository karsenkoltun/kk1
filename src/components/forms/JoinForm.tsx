"use client";

import { ArrowRight } from "lucide-react";

export default function JoinForm() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-0"
    >
      <input
        type="email"
        placeholder="Your email address"
        className="flex-1 border border-border bg-background-secondary px-5 py-4 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-accent sm:border-r-0"
        required
      />
      <button
        type="submit"
        className="group flex items-center justify-center gap-2 border border-accent bg-accent px-6 py-4 text-xs font-medium tracking-[0.2em] text-background uppercase transition-all duration-300 hover:bg-transparent hover:text-accent"
      >
        Join
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </form>
  );
}
