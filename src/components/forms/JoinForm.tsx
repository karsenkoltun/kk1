"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function JoinForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);

    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: email.split("@")[0],
          email,
          source: "Founders Club - Join Form",
          tags: ["founders-club", "community-interest", "kelowna"],
        }),
      });

      setSubmitted(true);
    } catch (err) {
      console.error("Join form submission error:", err);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="mt-8 border border-success/20 bg-success/5 px-6 py-8 text-center">
        <p className="font-heading text-xl font-light text-text-primary">
          You&apos;re In!
        </p>
        <p className="mt-2 text-sm text-text-secondary">
          I&apos;ll reach out with details about our next event.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setEmail("");
          }}
          className="mt-4 text-xs font-medium tracking-[0.15em] text-accent uppercase transition-colors hover:text-accent-hover"
        >
          Submit Another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-0"
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        className="flex-1 border border-border bg-background-secondary px-5 py-4 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-accent sm:border-r-0"
        required
      />
      <button
        type="submit"
        disabled={submitting}
        className="group flex items-center justify-center gap-2 border border-warm bg-warm px-6 py-4 text-xs font-medium tracking-[0.2em] text-background uppercase transition-all duration-300 hover:bg-warm-hover disabled:opacity-60"
      >
        {submitting ? "Joining..." : "Join"}
        {!submitting && (
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        )}
      </button>
    </form>
  );
}
