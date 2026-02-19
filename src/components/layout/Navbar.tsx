"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import { NAV_LINKS, SECONDARY_LINKS } from "@/constants/site";
import { cn } from "@/lib/utils";
import {
  Navbar as NavbarWrapper,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";

/* ------------------------------------------------
   Map NAV_LINKS to the format NavItems expects
   ------------------------------------------------ */
const navItems = NAV_LINKS.filter((link) => !link.isButton).map((link) => ({
  name: link.label,
  link: link.href,
  children: link.children?.map((child) => ({
    name: child.label,
    link: child.href,
  })),
}));

/* Get the CTA link */
const ctaLink = NAV_LINKS.find((link) => link.isButton);

/* ------------------------------------------------
   Navbar Component
   ------------------------------------------------ */
export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  /* Lock body scroll when mobile menu is open (handles iOS overscroll) */
  useEffect(() => {
    if (isMobileMenuOpen) {
      const scrollY = window.scrollY;
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${scrollY}px`;
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
  }, [isMobileMenuOpen]);

  /* Auto-close on route change */
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const closeMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  /* Helper: check if a path is active */
  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (pathname === href) return true;
    return pathname.startsWith(href + "/");
  };

  return (
    <NavbarWrapper>
      {/* ---- Desktop Navigation ---- */}
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} pathname={pathname} />
        <div className="relative z-20 flex items-center gap-3">
          {/* Phone number */}
          <a
            href="tel:+12504218260"
            className="hidden items-center gap-2 text-[11px] tracking-[0.1em] text-text-muted transition-colors duration-300 hover:text-warm xl:flex"
          >
            <Phone className="h-3 w-3" />
            <span>(250) 421-8260</span>
          </a>
          {/* CTA */}
          {ctaLink && (
            <NavbarButton href={ctaLink.href} variant="primary">
              {ctaLink.label}
            </NavbarButton>
          )}
        </div>
      </NavBody>

      {/* ---- Mobile Navigation ---- */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={closeMenu}
        >
          {/* Primary links */}
          {NAV_LINKS.filter((l) => !l.isButton).map((link) => (
            <div key={link.href}>
              <Link
                href={link.href}
                onClick={closeMenu}
                className={cn(
                  "block py-2 font-heading text-2xl font-light tracking-wider transition-colors",
                  isLinkActive(link.href)
                    ? "text-warm"
                    : "text-text-primary hover:text-warm"
                )}
              >
                {link.label}
              </Link>
              {/* Dropdown children inline */}
              {link.children && (
                <div className="ml-4 mb-1 flex flex-col gap-0.5">
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={closeMenu}
                      className={cn(
                        "py-1.5 text-xs tracking-[0.15em] uppercase transition-colors",
                        pathname === child.href
                          ? "text-warm"
                          : "text-text-muted hover:text-warm"
                      )}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Divider */}
          <div className="my-2 h-px w-full bg-gradient-to-r from-transparent via-warm/30 to-transparent" />

          {/* Secondary links */}
          {SECONDARY_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className={cn(
                "block py-1.5 text-xs tracking-[0.15em] uppercase transition-colors",
                pathname === link.href
                  ? "text-warm"
                  : "text-text-muted hover:text-warm"
              )}
            >
              {link.label}
            </Link>
          ))}

          {/* Phone */}
          <a
            href="tel:+12504218260"
            className="flex items-center gap-2 py-2 text-sm tracking-[0.1em] text-text-muted transition-colors hover:text-warm"
          >
            <Phone className="h-4 w-4" />
            (250) 421-8260
          </a>

          {/* CTA button */}
          {ctaLink && (
            <NavbarButton
              href={ctaLink.href}
              onClick={closeMenu}
              variant="primary"
              className="mt-2 w-full text-center"
            >
              {ctaLink.label}
            </NavbarButton>
          )}
        </MobileNavMenu>
      </MobileNav>
    </NavbarWrapper>
  );
}
