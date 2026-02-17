"use client";

import Link from "next/link";
import { Instagram, Youtube, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const footerNav = [
  { label: "Sell", href: "/sell" },
  { label: "Buy", href: "/buy" },
  { label: "Home Value", href: "/home-value" },
  { label: "Search", href: "/search" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
];

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand Column */}
          <div>
            <Link href="/" className="inline-block">
              <span className="font-heading text-2xl font-semibold tracking-[0.15em] text-text-primary uppercase">
                Karsen Koltun
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-text-muted max-w-xs">
              Premium real estate services in Kelowna, BC. A different approach
              to buying and selling homes in the Okanagan.
            </p>
            <div className="mt-6 flex gap-4">
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

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-medium tracking-[0.2em] text-text-secondary uppercase">
              Navigation
            </h3>
            <nav className="mt-4 flex flex-col gap-3">
              {footerNav.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-text-muted transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
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
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t border-border pt-8">
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
            <p className="text-xs text-text-muted">
              &copy; {new Date().getFullYear()} Karsen Koltun. All rights
              reserved. Royal LePage Kelowna.
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
