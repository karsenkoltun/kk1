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
  visible: {
    opacity: 1,
    transition: { duration: 0.4, when: "beforeChildren" as const, staggerChildren: 0.07 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, when: "afterChildren" as const },
  },
};

const menuItemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
};

const dropdownVariants = {
  hidden: { opacity: 0, y: 8, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
  exit: { opacity: 0, y: 6, scale: 0.97, transition: { duration: 0.18 } },
};

/* ------------------------------------------------
   Helper: check if pathname matches a link
   ------------------------------------------------ */
function isActive(
  pathname: string,
  href: string,
  children?: { href: string }[]
): boolean {
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

  /* Lock body scroll when overlay is open — handles iOS overscroll */
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
    };
  }, [menuOpen]);

  /* Auto-close overlay on route change */
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  /* Close overlay callback */
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      {/* ---- Top navigation bar ---- */}
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
          scrolled
            ? "border-b border-warm/15 bg-background/60 shadow-[0_4px_30px_rgba(232,213,163,0.06)] backdrop-blur-2xl"
            : "border-b border-warm/8 bg-background/20 backdrop-blur-sm"
        )}
      >
        {/* Warm glow line at bottom of navbar */}
        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 h-px transition-opacity duration-500",
            scrolled ? "opacity-100" : "opacity-50"
          )}
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(232,213,163,0.3) 20%, rgba(232,213,163,0.5) 50%, rgba(232,213,163,0.3) 80%, transparent)",
          }}
        />

        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4 lg:px-10">
          {/* Logo */}
          <Link href="/" className="group relative z-10" onClick={closeMenu}>
            <span className="font-heading text-xl font-semibold tracking-[0.25em] text-text-primary uppercase transition-colors duration-300 group-hover:text-warm sm:text-2xl sm:tracking-[0.3em]">
              Karsen Koltun
            </span>
          </Link>

          {/* Desktop Nav — hidden below lg */}
          <div className="hidden items-center gap-0 lg:flex">
            {NAV_LINKS.map((link) => {
              const active = isActive(
                pathname,
                link.href,
                "children" in link ? link.children : undefined
              );

              /* CTA button — "Get in Touch" */
              if (link.isButton) {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "ml-3 whitespace-nowrap rounded-sm border px-5 py-2.5 text-xs font-medium tracking-[0.15em] uppercase transition-all duration-300",
                      active
                        ? "border-warm bg-warm text-background shadow-[0_0_15px_rgba(232,213,163,0.2)]"
                        : "border-warm/60 bg-transparent text-warm hover:border-warm hover:bg-warm hover:text-background hover:shadow-[0_0_15px_rgba(232,213,163,0.2)]"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              }

              /* Dropdown — About Karsen */
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
                        "flex items-center gap-1.5 whitespace-nowrap px-3 py-2 text-xs font-medium tracking-[0.12em] uppercase transition-colors duration-300",
                        active
                          ? "text-warm"
                          : "text-text-secondary hover:text-warm"
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
                          className="absolute left-0 top-full mt-1 min-w-[260px] rounded-lg border border-warm/15 bg-background-secondary/95 p-2 shadow-xl shadow-black/40 backdrop-blur-xl"
                        >
                          {link.children.map((child) => {
                            const childActive = pathname === child.href;
                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                className={cn(
                                  "block rounded-md px-4 py-3 text-xs tracking-[0.1em] uppercase transition-colors duration-200 hover:bg-background/50",
                                  childActive
                                    ? "text-warm"
                                    : "text-text-secondary hover:text-warm"
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
                    "whitespace-nowrap px-3 py-2 text-xs font-medium tracking-[0.12em] uppercase transition-colors duration-300",
                    active
                      ? "text-warm"
                      : "text-text-secondary hover:text-warm"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Desktop phone number */}
            <a
              href="tel:+12501234567"
              className="ml-3 flex shrink-0 items-center gap-2 whitespace-nowrap text-xs tracking-[0.1em] text-text-muted transition-colors duration-300 hover:text-warm"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>(250) 123-4567</span>
            </a>
          </div>

          {/* Hamburger — visible only below lg, larger touch target */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="relative z-[60] -mr-2 flex h-11 w-11 items-center justify-center text-text-primary transition-colors hover:text-warm lg:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
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
            className="fixed inset-0 z-[55] overflow-y-auto overscroll-contain bg-background/[0.97] backdrop-blur-2xl"
          >
            {/* Subtle background glow orbs in overlay */}
            <div className="absolute top-[20%] left-[10%] h-[300px] w-[300px] rounded-full bg-warm/[0.04] blur-[100px]" />
            <div className="absolute bottom-[20%] right-[10%] h-[250px] w-[250px] rounded-full bg-accent/[0.03] blur-[100px]" />

            <div className="flex min-h-full flex-col items-center justify-center px-6 py-28">
              <nav className="flex flex-col items-center gap-1">
                {/* Primary Links with staggered animation */}
                {NAV_LINKS.map((link) => {
                  const active = isActive(
                    pathname,
                    link.href,
                    "children" in link ? link.children : undefined
                  );

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
                            "py-3 font-heading text-3xl font-light tracking-wider transition-colors active:opacity-70 hover:text-warm sm:text-4xl md:text-5xl",
                            active ? "text-warm" : "text-text-primary"
                          )}
                        >
                          {link.label}
                        </Link>
                        <div className="mt-1 mb-3 flex flex-col items-center gap-0.5">
                          {link.children.map((child) => {
                            const childActive = pathname === child.href;
                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={closeMenu}
                                className={cn(
                                  "px-4 py-2 text-sm tracking-[0.15em] uppercase transition-colors active:opacity-70 hover:text-warm",
                                  childActive
                                    ? "text-warm"
                                    : "text-text-muted"
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
                          "block py-3 font-heading text-3xl font-light tracking-wider transition-colors active:opacity-70 hover:text-warm sm:text-4xl md:text-5xl",
                          link.isButton
                            ? "text-warm"
                            : active
                              ? "text-warm"
                              : "text-text-primary"
                        )}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Divider */}
                <motion.div
                  variants={menuItemVariants}
                  className="my-5 h-px w-16 bg-gradient-to-r from-transparent via-warm/40 to-transparent"
                />

                {/* Secondary Links */}
                {SECONDARY_LINKS.map((link) => (
                  <motion.div key={link.href} variants={menuItemVariants}>
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      className={cn(
                        "block px-4 py-2.5 text-sm tracking-[0.2em] uppercase transition-colors active:opacity-70 hover:text-warm",
                        pathname === link.href
                          ? "text-warm"
                          : "text-text-muted"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Phone in overlay */}
                <motion.div variants={menuItemVariants} className="mt-6">
                  <a
                    href="tel:+12501234567"
                    className="flex items-center gap-2 px-4 py-3 text-sm tracking-[0.1em] text-text-muted transition-colors active:opacity-70 hover:text-warm"
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
