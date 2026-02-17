"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone, MapPin, Calendar } from "lucide-react";
import AnimateIn from "@/components/ui/AnimateIn";

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
    value: "karsen@karsenkoltun.com",
    href: "mailto:karsen@karsenkoltun.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "(250) 123-4567",
    href: "tel:+12501234567",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Kelowna, BC",
    href: null,
  },
];

export default function ContactPageClient() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-background-tertiary">
        <div className="absolute inset-0 bg-gradient-to-b from-background-tertiary via-background to-background" />
        <div className="absolute top-1/3 left-1/4 h-[400px] w-[400px] rounded-full bg-accent/5 blur-[100px]" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 pt-24 text-center">
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
            Let&apos;s <span className="italic text-accent">Talk</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mx-auto mt-6 max-w-lg text-text-secondary"
          >
            Whether you&apos;re buying, selling, or simply looking to connect
            &mdash; I&apos;d love to hear from you.
          </motion.p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="bg-background py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-16 md:grid-cols-5">
            {/* Left Column — Contact Info & Calendar */}
            <div className="md:col-span-2">
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
                        <detail.icon className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
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

              {/* Book a Call */}
              <AnimateIn delay={0.2}>
                <div className="mt-14">
                  <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
                    Schedule
                  </p>
                  <h3 className="mt-4 font-heading text-2xl font-light tracking-tight text-text-primary">
                    Book a Call
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                    Pick a time that works for you and let&apos;s chat about
                    your real estate goals.
                  </p>
                  <div className="mt-6 flex min-h-[320px] items-center justify-center border border-border bg-background-secondary">
                    <div className="text-center">
                      <Calendar className="mx-auto h-10 w-10 text-accent/40" />
                      <p className="mt-4 text-sm text-text-muted">
                        GHL Calendar Embed
                      </p>
                    </div>
                  </div>
                </div>
              </AnimateIn>
            </div>

            {/* Right Column — Contact Form */}
            <div className="md:col-span-3">
              <AnimateIn direction="right">
                <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
                  Send a Message
                </p>
                <h2 className="mt-4 font-heading text-3xl font-light tracking-tight text-text-primary md:text-4xl">
                  How Can I Help?
                </h2>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="mt-10 space-y-5"
                >
                  {/* Name & Email */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <input
                      type="text"
                      placeholder="Full Name"
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

                  {/* Phone */}
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full border border-border bg-background-secondary px-5 py-4 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-accent"
                  />

                  {/* Inquiry Type */}
                  <select
                    className="w-full border border-border bg-background-secondary px-5 py-4 text-sm text-text-muted outline-none transition-colors focus:border-accent"
                    required
                  >
                    {inquiryOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>

                  {/* Message */}
                  <textarea
                    placeholder="Tell me a bit about what you're looking for..."
                    rows={6}
                    className="w-full resize-none border border-border bg-background-secondary px-5 py-4 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-accent"
                  />

                  {/* Submit */}
                  <button
                    type="submit"
                    className="group flex w-full items-center justify-center gap-3 border border-accent bg-accent px-8 py-4 text-xs font-medium tracking-[0.2em] text-background uppercase transition-all duration-300 hover:bg-transparent hover:text-accent"
                  >
                    Send Message
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </form>
              </AnimateIn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
