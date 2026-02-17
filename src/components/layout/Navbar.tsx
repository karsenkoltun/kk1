"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { NAV_LINKS, SECONDARY_LINKS } from "@/constants/site";
import { cn } from "@/lib/utils";

/* ------------------------------------------------
   Animation variants
   ------------------------------------------------ */
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, when: "beforeChildren", staggerChildren: 0.07 } },
  exit: { opacity: 0, transition: { duration: 0.3, when: "afterChildren" } },
};

const menuItemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
};

const dropdownVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] as const } },
  exit: { opacity: 0, y: 8, scale: 0.97, transition: { duration: 0.18 } },
};

/* ------------------------------------------------
   Helper: check if a pathname matches a link
   ------------------------------------------------ */
function isActive(pathname: string, href: string, children?: { href: string }[]): boolean {
  if (href === "/") return pathname === "/";
  if (pathname === href) return true;
  if (children?.some((c) => pathname === c.href)) return true;
  return pathname.startsWith(href + "/");
}

/* ------------------------------------------------
   Navbar Component
   ------------------------------------------------ */
export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  /* Scroll listener */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Lock body scroll when overlay is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  /* Close overlay on route change */
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      {/* ---- Top navigation bar ---- */}
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
          scrolled
            ? "bg-background/90 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-black/20"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          {/* Logo */}
          <Link href="/" className="group relative z-10" onClick={closeMenu}>
            <span className="font-heading text-2xl font-semibold tracking-[0.15em] text-text-primary uppercase transition-colors duration-300 group-hover:text-accent">
              Karsen Koltun
            </span>
          </Link>

          {/* Desktop Nav — hidden below lg */}
          <div className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => {
              const active = isActive(pathname, link.href, "children" in link ? link.children : undefined);

              /* CTA button link */
              if (link.isButton) {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "ml-4 rounded-none border border-accent px-6 py-2.5 text-xs font-medium tracking-[0.2em] uppercase transition-all duration-300",
                      active
                        ? "bg-accent text-background"
                        : "bg-accent text-background hover:bg-transparent hover:text-accent"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              }

              /* Dropdown (About Karsen) */
              if ("children" in link && link.children) {
                return (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => setAboutOpen(true)}
                    onMouseLeave={() => setAboutOpen(false)}
                  >
                    <button
                      className={cn(
                        "flex items-center gap-1.5 px-4 py-2 text-xs font-medium tracking-[0.15em] uppercase transition-colors duration-300",
                        active ? "text-accent" : "text-text-secondary hover:text-text-primary"
                      )}
                    >
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
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="absolute left-0 top-full mt-1 min-w-[260px] border border-border bg-background-secondary/95 backdrop-blur-xl p-2 shadow-xl shadow-black/30"
                        >
                          {link.children.map((child) => {
                            const childActive = pathname === child.href;
                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                className={cn(
                                  "block px-4 py-3 text-xs tracking-[0.1em] uppercase transition-colors duration-200 hover:bg-background/50",
                                  childActive ? "text-accent" : "text-text-secondary hover:text-accent"
                                )}
                              >
                                {child.label}
                              </Link>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              /* Standard link */
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 text-xs font-medium tracking-[0.15em] uppercase transition-colors duration-300",
                    active ? "text-accent" : "text-text-secondary hover:text-text-primary"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Desktop phone number */}
            <a
              href="tel:+12501234567"
              className="ml-5 flex items-center gap-2 text-xs tracking-[0.1em] text-text-muted transition-colors duration-300 hover:text-accent"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>(250) 123-4567</span>
            </a>
          </div>

          {/* Hamburger — visible only below lg */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="relative z-[60] p-2 text-text-primary transition-colors hover:text-accent lg:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* ---- Full-screen overlay menu (mobile / tablet) ---- */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[55] bg-background/98 backdrop-blur-xl"
          >
            <div className="flex h-full flex-col items-center justify-center overflow-y-auto py-24">
              <nav className="flex flex-col items-center gap-2">
                {/* Primary Links with staggered animation */}
                {NAV_LINKS.map((link) => {
                  const active = isActive(pathname, link.href, "children" in link ? link.children : undefined);

                  if ("children" in link && link.children) {
                    return (
                      <motion.div
                        key={link.href}
                        variants={menuItemVariants}
                        className="flex flex-col items-center"
                      >
                        <Link
                          href={link.href}
                          onClick={closeMenu}
                          className={cn(
                            "py-3 font-heading text-4xl font-light tracking-wider transition-colors hover:text-accent md:text-5xl",
                            active ? "text-accent" : "text-text-primary"
                          )}
                        >
                          {link.label}
                        </Link>
                        <div className="mt-1 mb-2 flex flex-col items-center gap-1">
                          {link.children.map((child) => {
                            const childActive = pathname === child.href;
                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={closeMenu}
                                className={cn(
                                  "py-1 text-sm tracking-[0.15em] uppercase transition-colors hover:text-accent",
                                  childActive ? "text-accent" : "text-text-muted"
                                )}
                              >
                                {child.label}
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    );
                  }

                  return (
                    <motion.div key={link.href} variants={menuItemVariants}>
                      <Link
                        href={link.href}
                        onClick={closeMenu}
                        className={cn(
                          "block py-3 font-heading text-4xl font-light tracking-wider transition-colors hover:text-accent md:text-5xl",
                          link.isButton
                            ? "text-accent"
                            : active
                              ? "text-accent"
                              : "text-text-primary"
                        )}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Divider */}
                <motion.div variants={menuItemVariants} className="my-6 h-px w-16 bg-border" />

                {/* Secondary Links with stagger */}
                {SECONDARY_LINKS.map((link) => (
                  <motion.div key={link.href} variants={menuItemVariants}>
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      className={cn(
                        "block py-2 text-sm tracking-[0.2em] uppercase transition-colors hover:text-accent",
                        pathname === link.href ? "text-accent" : "text-text-muted"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Phone in overlay */}
                <motion.div variants={menuItemVariants} className="mt-8">
                  <a
                    href="tel:+12501234567"
                    className="flex items-center gap-2 text-sm tracking-[0.1em] text-text-muted transition-colors hover:text-accent"
                  >
                    <Phone className="h-4 w-4" />
                    (250) 123-4567
                  </a>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
