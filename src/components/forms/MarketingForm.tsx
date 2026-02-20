"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import Honeypot from "@/components/forms/Honeypot";

export default function MarketingForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    business: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [honey, setHoney] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          source: "Marketing Services - Application",
          tags: ["marketing-lead", "agency-inquiry"],
          customFields: {
            business_name: form.business,
            project_details: form.message,
          },
          _honey: honey,
        }),
      });

      setSubmitted(true);
    } catch (err) {
      console.error("Marketing form submission error:", err);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mt-8 flex flex-col items-center border border-success/20 bg-success/5 px-6 py-12 text-center"
      >
        <CheckCircle2 className="h-12 w-12 text-success" />
        <h3 className="mt-5 font-heading text-2xl font-light text-text-primary">
          Application Received
        </h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-text-secondary">
          Thank you for your interest. I&apos;ll review your details and reach
          out within 48 hours to discuss your project.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setForm({ name: "", email: "", business: "", message: "" });
          }}
          className="mt-6 text-xs font-medium tracking-[0.15em] text-accent uppercase transition-colors hover:text-accent-hover"
        >
          Submit Another
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 space-y-4 text-left"
    >
      <Honeypot value={honey} onChange={setHoney} />
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="border border-border bg-background-secondary px-5 py-4 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-accent"
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email Address"
          className="border border-border bg-background-secondary px-5 py-4 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-accent"
          required
        />
      </div>
      <input
        type="text"
        name="business"
        value={form.business}
        onChange={handleChange}
        placeholder="Business / Brand Name"
        className="w-full border border-border bg-background-secondary px-5 py-4 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-accent"
      />
      <textarea
        name="message"
        value={form.message}
        onChange={handleChange}
        placeholder="Tell me about your project and goals..."
        rows={4}
        className="w-full border border-border bg-background-secondary px-5 py-4 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-accent resize-none"
      />
      <button
        type="submit"
        disabled={submitting}
        className="group flex w-full items-center justify-center gap-3 border border-warm bg-warm px-8 py-4 text-xs font-medium tracking-[0.2em] text-background uppercase transition-all duration-300 hover:bg-warm-hover disabled:opacity-60"
      >
        {submitting ? "Submitting..." : "Submit Application"}
        {!submitting && (
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        )}
      </button>
    </form>
  );
}
