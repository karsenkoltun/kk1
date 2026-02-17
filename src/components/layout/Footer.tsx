"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Instagram,
  Youtube,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------
   Data
   ------------------------------------------------ */
const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Search Listings", href: "/search" },
  { label: "About Karsen", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const serviceLinks = [
  { label: "List Your Home", href: "/sell" },
  { label: "Buy a Home", href: "/buy" },
  { label: "Home Valuation", href: "/home-value" },
  { label: "Founders Club", href: "/about/founders-club" },
  { label: "Marketing with KK", href: "/about/marketing" },
];

const socialLinks = [
  {
    icon: Instagram,
    href: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "#",
    label: "Instagram",
  },
  {
    icon: Youtube,
    href: process.env.NEXT_PUBLIC_YOUTUBE_URL || "#",
    label: "YouTube",
  },
  {
    icon: Linkedin,
    href: process.env.NEXT_PUBLIC_LINKEDIN_URL || "#",
    label: "LinkedIn",
  },
];

/* ------------------------------------------------
   Footer Component
   ------------------------------------------------ */
export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: Connect to newsletter API (Mailchimp, ConvertKit, etc.)
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <footer className="border-t border-border bg-background">
      {/* ---- Newsletter Row ---- */}
      <div className="border-b border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-10 md:flex-row md:justify-between lg:px-10">
          <div className="text-center md:text-left">
            <h3 className="font-heading text-xl font-semibold tracking-wide text-text-primary">
              Stay in the Loop
            </h3>
            <p className="mt-1 text-sm text-text-muted">
              Market insights, new listings, and Kelowna real estate updates.
            </p>
          </div>

          <form
            onSubmit={handleNewsletter}
            className="flex w-full max-w-md items-stretch gap-0"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 border border-border bg-background-secondary px-4 py-3 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors duration-300 focus:border-accent"
            />
            <button
              type="submit"
              className={cn(
                "flex items-center gap-2 border border-l-0 border-warm bg-warm px-5 py-3 text-xs font-medium tracking-[0.15em] text-background uppercase transition-all duration-300 hover:bg-warm-hover",
                submitted && "bg-green-600 border-green-600 hover:bg-green-600"
              )}
            >
              {submitted ? (
                "Subscribed!"
              ) : (
                <>
                  <Send className="h-3.5 w-3.5" />
                  Subscribe
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* ---- Main Footer Content — 4 Column Grid ---- */}
      <div className="mx-auto max-w-7xl px-6 py-10 md:py-16 lg:px-10">
        <div className="grid gap-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-4">
          {/* Column 1: Brand / Description */}
          <div>
            <Link href="/" className="inline-block">
              <span className="font-heading text-2xl font-semibold tracking-[0.15em] text-text-primary uppercase">
                Karsen Koltun
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-text-muted">
              Premium real estate services in Kelowna, BC. A different approach
              to buying and selling homes in the Okanagan.
            </p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center border border-border text-text-muted transition-all duration-300 hover:border-accent hover:text-accent"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xs font-medium tracking-[0.2em] text-text-secondary uppercase">
              Quick Links
            </h3>
            <nav className="mt-4 flex flex-col gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-accent"
                >
                  <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" />
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="text-xs font-medium tracking-[0.2em] text-text-secondary uppercase">
              Services
            </h3>
            <nav className="mt-4 flex flex-col gap-3">
              {serviceLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-accent"
                >
                  <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" />
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-xs font-medium tracking-[0.2em] text-text-secondary uppercase">
              Get in Touch
            </h3>
            <div className="mt-4 flex flex-col gap-4">
              <a
                href="mailto:karsen@karsenkoltun.com"
                className="flex items-center gap-3 text-sm text-text-muted transition-colors hover:text-accent"
              >
                <Mail className="h-4 w-4 shrink-0" />
                karsen@karsenkoltun.com
              </a>
              <a
                href="tel:+12501234567"
                className="flex items-center gap-3 text-sm text-text-muted transition-colors hover:text-accent"
              >
                <Phone className="h-4 w-4 shrink-0" />
                (250) 123-4567
              </a>
              <div className="flex items-center gap-3 text-sm text-text-muted">
                <MapPin className="h-4 w-4 shrink-0" />
                Kelowna, BC
              </div>
            </div>

            {/* Kelowna Map Placeholder */}
            <div className="mt-6 aspect-[4/3] w-full border border-border bg-background-secondary flex items-center justify-center overflow-hidden">
              {/* Replace with Google Maps embed or Mapbox component */}
              <div className="flex flex-col items-center gap-2 text-text-muted">
                <MapPin className="h-6 w-6 text-accent/60" />
                <span className="text-xs tracking-[0.1em] uppercase">
                  Kelowna, BC
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ---- Brokerage Attribution ---- */}
        <div className="mt-12 flex items-center justify-center gap-2 text-xs text-text-muted">
          <span className="inline-block h-px w-8 bg-border" />
          <span className="tracking-[0.15em] uppercase">
            Royal LePage Kelowna
          </span>
          <span className="inline-block h-px w-8 bg-border" />
        </div>

        {/* ---- Bottom Bar ---- */}
        <div className="mt-8 border-t border-border pt-8">
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
            <p className="text-xs text-text-muted">
              &copy; {new Date().getFullYear()} Karsen Koltun. All rights
              reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="text-xs text-text-muted transition-colors hover:text-accent"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-xs text-text-muted transition-colors hover:text-accent"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
