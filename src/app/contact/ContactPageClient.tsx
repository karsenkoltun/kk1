"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Instagram,
  Linkedin,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import AnimateIn from "@/components/ui/AnimateIn";
import { cn } from "@/lib/utils";

/* ──────────────────────────────────────────────
   Data
   ────────────────────────────────────────────── */

const inquiryOptions = [
  { value: "", label: "What can I help with?" },
  { value: "buying", label: "Buying a Home" },
  { value: "selling", label: "Selling a Home" },
  { value: "valuation", label: "Home Valuation" },
  { value: "marketing", label: "Marketing Services" },
  { value: "founders-club", label: "Founders Club" },
  { value: "general", label: "General Inquiry" },
  { value: "other", label: "Other" },
];

const contactDetails = [
  {
    icon: Mail,
    label: "Email",
    value: "karsen@royallepage.ca",
    href: "mailto:karsen@royallepage.ca",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "(250) 421-8260",
    href: "tel:+12504218260",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Kelowna, BC",
    href: null,
  },
];

const officeHours = [
  { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
  { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
  { day: "Sunday", hours: "By Appointment" },
];

const socialLinks = [
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://www.instagram.com/karsenkoltun/",
    handle: "@karsenkoltun",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/karsenkoltun/",
    handle: "Karsen Koltun",
  },
];

const faqs = [
  {
    question: "What areas of Kelowna do you specialize in?",
    answer:
      "I work across the entire Okanagan region, with deep expertise in Kelowna, West Kelowna, Lake Country, and Peachland. Whether you're looking for a lakefront property, a family home in a top school district, or an investment property, I know the market inside and out.",
  },
  {
    question: "What makes your approach to selling homes different?",
    answer:
      "I come from a marketing agency background, so every listing I take on gets the full agency treatment. That means professional photography, cinematic video tours, strategic social media campaigns, and targeted digital advertising — not just a sign on the lawn and a listing on MLS.",
  },
  {
    question: "How quickly can you help me get my home on the market?",
    answer:
      "Once we decide to move forward, I can typically have a full marketing package ready within 7-14 days. This includes professional media production, staging consultation, pricing strategy, and a custom launch plan tailored to your property and timeline.",
  },
  {
    question: "Do you work with first-time home buyers?",
    answer:
      "Absolutely. I love working with first-time buyers and walking them through the entire process step by step. From getting pre-approved, to understanding the market, to closing day — I make sure you feel confident and informed at every stage.",
  },
  {
    question: "What is the Kelowna Founders Club?",
    answer:
      "The Kelowna Founders Club is a curated community I founded for ambitious entrepreneurs, founders, and professionals building in the Okanagan. It's a space for networking, collaboration, and growth. If you're interested in joining, reach out and I'll share more details.",
  },
];

/* ──────────────────────────────────────────────
   Helpers
   ────────────────────────────────────────────── */

interface FormField {
  value: string;
  touched: boolean;
  error: string;
}

const initialField: FormField = { value: "", touched: false, error: "" };

function validateField(name: string, value: string): string {
  if (name === "name" && value.trim().length < 2) return "Please enter your name";
  if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
    return "Please enter a valid email";
  if (name === "inquiry" && !value) return "Please select an inquiry type";
  if (name === "message" && value.trim().length < 10)
    return "Please enter at least 10 characters";
  return "";
}

/* ──────────────────────────────────────────────
   FAQ Accordion Item
   ────────────────────────────────────────────── */

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between py-6 text-left transition-colors duration-300 hover:text-accent"
      >
        <span className="pr-8 font-heading text-lg font-medium text-text-primary md:text-xl">
          {question}
        </span>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-accent transition-transform duration-300",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-sm leading-relaxed text-text-secondary">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Component
   ────────────────────────────────────────────── */

export default function ContactPageClient() {
  /* Form state */
  const [fields, setFields] = useState<Record<string, FormField>>({
    name: { ...initialField },
    email: { ...initialField },
    phone: { ...initialField },
    inquiry: { ...initialField },
    message: { ...initialField },
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  /* FAQ state */
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  /* Handlers */
  const updateField = (name: string, value: string) => {
    setFields((prev) => ({
      ...prev,
      [name]: {
        value,
        touched: prev[name].touched,
        error: prev[name].touched ? validateField(name, value) : "",
      },
    }));
  };

  const touchField = (name: string) => {
    setFields((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        touched: true,
        error: validateField(name, prev[name].value),
      },
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    /* Touch all required fields */
    const required = ["name", "email", "inquiry", "message"];
    const updated = { ...fields };
    let hasErrors = false;

    required.forEach((name) => {
      const error = validateField(name, updated[name].value);
      updated[name] = { ...updated[name], touched: true, error };
      if (error) hasErrors = true;
    });

    setFields(updated);
    if (hasErrors) return;

    /* Submit to GHL via /api/lead */
    setSubmitting(true);
    try {
      const inquiryLabel = inquiryOptions.find(
        (o) => o.value === fields.inquiry.value
      )?.label || fields.inquiry.value;

      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fields.name.value,
          email: fields.email.value,
          phone: fields.phone.value || undefined,
          source: "Contact Form",
          tags: ["contact-form", `inquiry-${fields.inquiry.value}`],
          customFields: {
            inquiry_type: inquiryLabel,
            message: fields.message.value,
          },
        }),
      });

      setSubmitted(true);
    } catch (err) {
      console.error("Contact form submission error:", err);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const getFieldClass = (name: string) =>
    cn(
      "w-full border bg-background-secondary px-4 py-3 text-sm text-text-primary placeholder:text-text-muted outline-none transition-all duration-300 sm:px-5 sm:py-4 sm:text-sm",
      fields[name].touched && fields[name].error
        ? "border-error focus:border-error"
        : fields[name].touched && !fields[name].error && fields[name].value
          ? "border-success/40 focus:border-success"
          : "border-border focus:border-accent"
    );

  return (
    <>
      {/* ───────── Hero ───────── */}
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-background">
        <div className="absolute inset-0 bg-gradient-to-b from-background-tertiary/40 via-background to-background" />
        <div className="absolute top-1/3 left-1/4 h-[500px] w-[500px] rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute right-1/3 bottom-1/3 h-[300px] w-[300px] rounded-full bg-accent/3 blur-[80px]" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 pt-28 pb-12 text-center sm:px-6 sm:pt-32 sm:pb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6 text-xs font-medium tracking-[0.3em] text-accent uppercase"
          >
            Contact
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="font-heading text-5xl font-light leading-[1.1] tracking-tight text-text-primary sm:text-6xl md:text-7xl"
          >
            Let&apos;s <em className="italic text-accent">Talk</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-text-secondary"
          >
            Whether you&apos;re buying, selling, or simply looking to
            connect &mdash; I&apos;d love to hear from you.
          </motion.p>

          {/* Quick contact chips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href="mailto:karsen@royallepage.ca"
              className="inline-flex items-center gap-2 border border-border bg-background-secondary/50 px-5 py-2.5 text-xs font-medium tracking-wider text-text-secondary transition-all duration-300 hover:border-accent hover:text-accent"
            >
              <Mail className="h-3.5 w-3.5" />
              karsen@royallepage.ca
            </a>
            <a
              href="tel:+12504218260"
              className="inline-flex items-center gap-2 border border-border bg-background-secondary/50 px-5 py-2.5 text-xs font-medium tracking-wider text-text-secondary transition-all duration-300 hover:border-accent hover:text-accent"
            >
              <Phone className="h-3.5 w-3.5" />
              (250) 421-8260
            </a>
          </motion.div>
        </div>
      </section>

      {/* ───────── Contact Content ───────── */}
      <section className="bg-background py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-10 lg:gap-16 lg:grid-cols-5">
            {/* ── Left Column ── */}
            <div className="lg:col-span-2">
              {/* Contact Info */}
              <AnimateIn>
                <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
                  Get in Touch
                </p>
                <h2 className="mt-4 font-heading text-3xl font-light tracking-tight text-text-primary md:text-4xl">
                  Contact Info
                </h2>
                <div className="mt-10 space-y-6">
                  {contactDetails.map((detail) => {
                    const Content = (
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-accent/20 bg-accent/5">
                          <detail.icon className="h-4 w-4 text-accent" />
                        </div>
                        <div>
                          <p className="text-xs font-medium tracking-[0.15em] text-text-muted uppercase">
                            {detail.label}
                          </p>
                          <p className="mt-1 text-text-primary">
                            {detail.value}
                          </p>
                        </div>
                      </div>
                    );

                    return detail.href ? (
                      <a
                        key={detail.label}
                        href={detail.href}
                        className="block transition-opacity duration-300 hover:opacity-80"
                      >
                        {Content}
                      </a>
                    ) : (
                      <div key={detail.label}>{Content}</div>
                    );
                  })}
                </div>
              </AnimateIn>

              {/* Social Links */}
              <AnimateIn delay={0.1}>
                <div className="mt-10">
                  <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
                    Follow Along
                  </p>
                  <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 border border-border px-4 py-3 transition-all duration-300 hover:border-accent"
                      >
                        <social.icon className="h-4 w-4 text-text-muted transition-colors group-hover:text-accent" />
                        <span className="text-xs font-medium tracking-wider text-text-secondary transition-colors group-hover:text-text-primary">
                          {social.handle}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </AnimateIn>

              {/* Office Hours */}
              <AnimateIn delay={0.15}>
                <div className="mt-10">
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-accent" />
                    <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
                      Office Hours
                    </p>
                  </div>
                  <div className="mt-4 space-y-3">
                    {officeHours.map((item) => (
                      <div
                        key={item.day}
                        className="flex items-center justify-between border-b border-border/50 pb-3"
                      >
                        <span className="text-sm text-text-secondary">
                          {item.day}
                        </span>
                        <span className="text-sm font-medium text-text-primary">
                          {item.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimateIn>

              {/* Google Maps Placeholder */}
              <AnimateIn delay={0.2}>
                <div className="mt-10">
                  <div className="relative flex min-h-[240px] items-center justify-center overflow-hidden border border-border bg-background-secondary">
                    {/* Decorative grid pattern */}
                    <div
                      className="absolute inset-0 opacity-5"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(96,165,250,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,0.3) 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                      }}
                    />
                    <div className="relative text-center">
                      <MapPin className="mx-auto h-10 w-10 text-accent/40" />
                      <p className="mt-4 text-sm font-medium text-text-muted">
                        Map Coming Soon
                      </p>
                      <p className="mt-1 text-xs text-text-muted/60">
                        Kelowna, British Columbia
                      </p>
                    </div>
                  </div>
                </div>
              </AnimateIn>

              {/* Book a Call — Prominent GHL Calendar */}
              <AnimateIn delay={0.25}>
                <div className="mt-14 border border-accent/20 bg-background-secondary p-8">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-accent" />
                    <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
                      Schedule a Call
                    </p>
                  </div>
                  <h3 className="mt-4 font-heading text-2xl font-light tracking-tight text-text-primary">
                    Book a Call With Me
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                    Pick a time that works for you and let&apos;s chat about
                    your real estate goals. No pressure, just a conversation.
                  </p>
                  <div className="mt-6 flex min-h-[360px] items-center justify-center border border-border bg-background">
                    <div className="text-center">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-accent/20 bg-accent/5">
                        <Calendar className="h-7 w-7 text-accent/60" />
                      </div>
                      <p className="text-sm font-medium text-text-muted">
                        GHL Calendar Embed
                      </p>
                      <p className="mt-1 text-xs text-text-muted/60">
                        Calendar integration coming soon
                      </p>
                    </div>
                  </div>
                </div>
              </AnimateIn>
            </div>

            {/* ── Right Column — Contact Form ── */}
            <div className="lg:col-span-3">
              <AnimateIn direction="right">
                <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
                  Send a Message
                </p>
                <h2 className="mt-4 font-heading text-3xl font-light tracking-tight text-text-primary md:text-4xl">
                  How Can I Help?
                </h2>

                <AnimatePresence mode="wait">
                  {submitted ? (
                    /* ── Success State ── */
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="mt-10 flex flex-col items-center justify-center border border-success/20 bg-success/5 px-8 py-20 text-center"
                    >
                      <CheckCircle2 className="h-14 w-14 text-success" />
                      <h3 className="mt-6 font-heading text-2xl font-light text-text-primary">
                        Message Sent!
                      </h3>
                      <p className="mt-3 max-w-md text-sm leading-relaxed text-text-secondary">
                        Thanks for reaching out. I typically respond within 24
                        hours. In the meantime, feel free to book a call if
                        you&apos;d like to chat sooner.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setSubmitted(false);
                          setFields({
                            name: { ...initialField },
                            email: { ...initialField },
                            phone: { ...initialField },
                            inquiry: { ...initialField },
                            message: { ...initialField },
                          });
                        }}
                        className="mt-8 text-xs font-medium tracking-[0.2em] text-accent uppercase transition-opacity hover:opacity-80"
                      >
                        Send Another Message
                      </button>
                    </motion.div>
                  ) : (
                    /* ── Form ── */
                    <motion.form
                      key="form"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -20 }}
                      onSubmit={handleSubmit}
                      className="mt-10 space-y-5"
                      noValidate
                    >
                      {/* Name & Email */}
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <input
                            type="text"
                            placeholder="Full Name *"
                            value={fields.name.value}
                            onChange={(e) =>
                              updateField("name", e.target.value)
                            }
                            onBlur={() => touchField("name")}
                            className={getFieldClass("name")}
                          />
                          {fields.name.touched && fields.name.error && (
                            <p className="mt-1.5 flex items-center gap-1.5 text-xs text-error">
                              <AlertCircle className="h-3 w-3" />
                              {fields.name.error}
                            </p>
                          )}
                        </div>
                        <div>
                          <input
                            type="email"
                            placeholder="Email Address *"
                            value={fields.email.value}
                            onChange={(e) =>
                              updateField("email", e.target.value)
                            }
                            onBlur={() => touchField("email")}
                            className={getFieldClass("email")}
                          />
                          {fields.email.touched && fields.email.error && (
                            <p className="mt-1.5 flex items-center gap-1.5 text-xs text-error">
                              <AlertCircle className="h-3 w-3" />
                              {fields.email.error}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Phone */}
                      <div>
                        <input
                          type="tel"
                          placeholder="Phone Number"
                          value={fields.phone.value}
                          onChange={(e) =>
                            updateField("phone", e.target.value)
                          }
                          onBlur={() => touchField("phone")}
                          className={getFieldClass("phone")}
                        />
                      </div>

                      {/* Inquiry Type */}
                      <div>
                        <select
                          value={fields.inquiry.value}
                          onChange={(e) =>
                            updateField("inquiry", e.target.value)
                          }
                          onBlur={() => touchField("inquiry")}
                          className={cn(
                            getFieldClass("inquiry"),
                            !fields.inquiry.value && "text-text-muted"
                          )}
                        >
                          {inquiryOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        {fields.inquiry.touched && fields.inquiry.error && (
                          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-error">
                            <AlertCircle className="h-3 w-3" />
                            {fields.inquiry.error}
                          </p>
                        )}
                      </div>

                      {/* Message */}
                      <div>
                        <textarea
                          placeholder="Tell me a bit about what you're looking for... *"
                          rows={7}
                          value={fields.message.value}
                          onChange={(e) =>
                            updateField("message", e.target.value)
                          }
                          onBlur={() => touchField("message")}
                          className={cn(
                            getFieldClass("message"),
                            "resize-none"
                          )}
                        />
                        {fields.message.touched && fields.message.error && (
                          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-error">
                            <AlertCircle className="h-3 w-3" />
                            {fields.message.error}
                          </p>
                        )}
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={submitting}
                        className="group flex w-full items-center justify-center gap-3 border border-warm bg-warm px-8 py-4 text-xs font-medium tracking-[0.2em] text-background uppercase transition-all duration-300 hover:bg-warm-hover disabled:opacity-60"
                      >
                        {submitting ? "Sending..." : "Send Message"}
                        {!submitting && (
                          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                        )}
                      </button>

                      <p className="text-center text-xs text-text-muted">
                        I typically respond within 24 hours.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </AnimateIn>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── FAQ Section ───────── */}
      <section className="bg-background-secondary py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <AnimateIn>
            <div className="mb-16 text-center">
              <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
                Common Questions
              </p>
              <h2 className="mt-4 font-heading text-4xl font-light tracking-tight text-text-primary md:text-5xl">
                Frequently Asked
              </h2>
              <p className="mx-auto mt-6 max-w-lg text-text-secondary">
                Have a question? Here are some of the most common things
                people ask about working with me.
              </p>
            </div>
          </AnimateIn>

          <AnimateIn delay={0.1}>
            <div className="border-t border-border">
              {faqs.map((faq, i) => (
                <FAQItem
                  key={i}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFAQ === i}
                  onToggle={() =>
                    setOpenFAQ(openFAQ === i ? null : i)
                  }
                />
              ))}
            </div>
          </AnimateIn>

          <AnimateIn delay={0.2}>
            <div className="mt-12 text-center">
              <p className="text-sm text-text-secondary">
                Don&apos;t see your question here?{" "}
                <a
                  href="mailto:karsen@royallepage.ca"
                  className="font-medium text-accent transition-opacity hover:opacity-80"
                >
                  Email me directly
                </a>{" "}
                and I&apos;ll get back to you.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
