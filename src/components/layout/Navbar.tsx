"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { NAV_LINKS, SECONDARY_LINKS } from "@/constants/site";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-background/95 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          {/* Logo */}
          <Link href="/" className="group relative z-10">
            <span className="font-heading text-2xl font-semibold tracking-[0.15em] text-text-primary uppercase">
              Karsen Koltun
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => {
              if (link.isButton) {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="ml-4 rounded-none border border-accent bg-accent px-6 py-2.5 text-xs font-medium tracking-[0.2em] text-background uppercase transition-all duration-300 hover:bg-transparent hover:text-accent"
                  >
                    {link.label}
                  </Link>
                );
              }

              if ("children" in link && link.children) {
                return (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => setAboutOpen(true)}
                    onMouseLeave={() => setAboutOpen(false)}
                  >
                    <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium tracking-[0.15em] text-text-secondary uppercase transition-colors duration-300 hover:text-text-primary">
                      {link.label}
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 transition-transform duration-300",
                          aboutOpen && "rotate-180"
                        )}
                      />
                    </button>

                    <AnimatePresence>
                      {aboutOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 top-full mt-1 min-w-[240px] border border-border bg-background-secondary/95 backdrop-blur-md p-2"
                        >
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block px-4 py-3 text-xs tracking-[0.1em] text-text-secondary uppercase transition-colors duration-200 hover:text-accent hover:bg-background/50"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-xs font-medium tracking-[0.15em] text-text-secondary uppercase transition-colors duration-300 hover:text-text-primary"
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative z-[60] p-2 text-text-primary transition-colors hover:text-accent"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Full-screen overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[55] bg-background/98 backdrop-blur-xl"
          >
            <div className="flex h-full flex-col items-center justify-center">
              <nav className="flex flex-col items-center gap-2">
                {/* Primary Links */}
                {NAV_LINKS.map((link) => {
                  if ("children" in link && link.children) {
                    return (
                      <div key={link.href} className="flex flex-col items-center">
                        <Link
                          href={link.href}
                          onClick={() => setMenuOpen(false)}
                          className="py-3 font-heading text-4xl font-light tracking-wider text-text-primary transition-colors hover:text-accent md:text-5xl"
                        >
                          {link.label}
                        </Link>
                        <div className="flex flex-col items-center gap-1 mt-1 mb-2">
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setMenuOpen(false)}
                              className="py-1 text-sm tracking-[0.15em] text-text-muted uppercase transition-colors hover:text-accent"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        "py-3 font-heading text-4xl font-light tracking-wider transition-colors hover:text-accent md:text-5xl",
                        link.isButton ? "text-accent" : "text-text-primary"
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}

                {/* Divider */}
                <div className="my-6 h-px w-16 bg-border" />

                {/* Secondary Links */}
                {SECONDARY_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="py-2 text-sm tracking-[0.2em] text-text-muted uppercase transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
