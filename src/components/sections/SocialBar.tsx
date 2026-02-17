"use client";

import { Instagram, Youtube, Linkedin } from "lucide-react";
import AnimateIn from "@/components/ui/AnimateIn";

const socials = [
  { icon: Instagram, label: "Instagram", count: "12K", href: "#" },
  { icon: Youtube, label: "YouTube", count: "5K", href: "#" },
  {
    icon: () => (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.8a8.18 8.18 0 0 0 4.76 1.52V6.87a4.84 4.84 0 0 1-1-.18Z" />
      </svg>
    ),
    label: "TikTok",
    count: "25K",
    href: "#",
  },
  { icon: Linkedin, label: "LinkedIn", count: "3K", href: "#" },
];

export default function SocialBar() {
  return (
    <section className="border-y border-border bg-background py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <AnimateIn>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            <span className="text-xs tracking-[0.3em] text-text-muted uppercase">
              Follow Along
            </span>
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 transition-colors hover:text-accent"
              >
                <social.icon className="h-5 w-5 text-text-muted transition-colors group-hover:text-accent" />
                <div>
                  <p className="text-sm font-semibold text-text-primary transition-colors group-hover:text-accent">
                    {social.count}
                  </p>
                  <p className="text-[10px] tracking-[0.15em] text-text-muted uppercase">
                    {social.label}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
