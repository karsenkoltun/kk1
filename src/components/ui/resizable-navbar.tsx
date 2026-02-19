"use client";

import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import React, { useRef, useState } from "react";
import Link from "next/link";

/* ================================================
   Resizable Navbar Primitives
   Adapted from Aceternity UI for Karsen Koltun
   dark luxury theme (navy + baby blue + warm gold)
   ================================================ */

/* ---- Types ---- */

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
    children?: { name: string; link: string }[];
  }[];
  className?: string;
  onItemClick?: () => void;
  pathname?: string;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

/* ---- Navbar (scroll-aware wrapper) ---- */

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 100);
  });

  return (
    <motion.div
      ref={ref}
      className={cn("fixed inset-x-0 top-0 z-50 w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible }
            )
          : child
      )}
    </motion.div>
  );
};

/* ---- NavBody (desktop bar) ---- */

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(24px)" : "blur(4px)",
        boxShadow: visible
          ? "0 0 30px rgba(232, 213, 163, 0.06), 0 4px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(232, 213, 163, 0.05)"
          : "none",
        width: visible ? "55%" : "100%",
        y: visible ? 12 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      style={{
        minWidth: "680px",
      }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full px-4 py-2 lg:flex",
        visible
          ? "bg-background/80 border border-warm/10"
          : "bg-background/20 border border-transparent",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

/* ---- NavItems (desktop links with hover pill + dropdown) ---- */

export const NavItems = ({
  items,
  className,
  onItemClick,
  pathname = "/",
}: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);

  const isActive = (href: string, children?: { link: string }[]) => {
    if (href === "/") return pathname === "/";
    if (pathname === href) return true;
    if (children?.some((c) => pathname === c.link)) return true;
    return pathname.startsWith(href + "/");
  };

  return (
    <motion.div
      onMouseLeave={() => {
        setHovered(null);
        setDropdownOpen(null);
      }}
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-1 lg:flex",
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          key={`nav-${idx}`}
          className="relative"
          onMouseEnter={() => {
            setHovered(idx);
            if (item.children) setDropdownOpen(idx);
          }}
          onMouseLeave={() => {
            if (item.children) setDropdownOpen(null);
          }}
        >
          <Link
            href={item.link}
            onClick={onItemClick}
            className={cn(
              "relative px-3 py-2 text-[11px] font-medium uppercase tracking-[0.12em] transition-colors duration-200",
              isActive(item.link, item.children)
                ? "text-warm"
                : "text-text-secondary hover:text-text-primary"
            )}
          >
            {hovered === idx && (
              <motion.div
                layoutId="navbar-hovered"
                className="absolute inset-0 h-full w-full rounded-full bg-background-tertiary/80"
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              />
            )}
            <span className="relative z-20">{item.name}</span>
          </Link>

          {/* Dropdown */}
          <AnimatePresence>
            {item.children && dropdownOpen === idx && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.97 }}
                transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute left-1/2 top-full z-50 mt-1 -translate-x-1/2 min-w-[240px] overflow-hidden rounded-lg border border-border bg-background-secondary/95 shadow-xl shadow-black/40 backdrop-blur-xl"
              >
                {item.children.map((child, cIdx) => (
                  <Link
                    key={`dropdown-${cIdx}`}
                    href={child.link}
                    onClick={onItemClick}
                    className={cn(
                      "block px-5 py-3 text-xs font-medium tracking-wide transition-colors duration-150",
                      pathname === child.link
                        ? "bg-warm/10 text-warm"
                        : "text-text-secondary hover:bg-background-tertiary hover:text-text-primary"
                    )}
                  >
                    {child.name}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </motion.div>
  );
};

/* ---- MobileNav (mobile bar) ---- */

export const MobileNav = ({
  children,
  className,
  visible,
}: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(24px)" : "blur(4px)",
        boxShadow: visible
          ? "0 0 30px rgba(232, 213, 163, 0.06), 0 4px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(232, 213, 163, 0.05)"
          : "none",
        width: visible ? "92%" : "100%",
        paddingRight: visible ? "12px" : "0px",
        paddingLeft: visible ? "12px" : "0px",
        borderRadius: visible ? "8px" : "0px",
        y: visible ? 12 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between px-4 py-2 lg:hidden",
        visible
          ? "bg-background/80 border border-warm/10"
          : "bg-background/20 border border-transparent",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

/* ---- MobileNavHeader ---- */

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className
      )}
    >
      {children}
    </div>
  );
};

/* ---- MobileNavMenu (overlay) ---- */

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />
          {/* Menu panel */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={cn(
              "absolute inset-x-0 top-full z-50 mx-2 mt-2 flex flex-col gap-4 rounded-xl border border-border bg-background-secondary/95 px-6 py-8 shadow-2xl shadow-black/40 backdrop-blur-2xl",
              className
            )}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

/* ---- MobileNavToggle ---- */

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="relative z-[60] p-2 text-text-secondary transition-colors duration-200 hover:text-warm"
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
    </button>
  );
};

/* ---- NavbarLogo ---- */

export const NavbarLogo = () => {
  return (
    <Link
      href="/"
      className="relative z-20 flex items-center gap-1 px-2 py-1"
    >
      <span className="font-heading text-lg font-light tracking-wide text-text-primary sm:text-xl">
        KARSEN
      </span>
      <span className="font-heading text-lg font-light tracking-wide text-warm sm:text-xl">
        KOLTUN
      </span>
    </Link>
  );
};

/* ---- NavbarButton ---- */

export const NavbarButton = ({
  href,
  children,
  className,
  variant = "primary",
  onClick,
  ...props
}: {
  href?: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
} & Omit<React.ComponentPropsWithoutRef<"a">, "onClick">) => {
  const baseStyles =
    "px-5 py-2.5 rounded-full text-xs font-medium uppercase tracking-[0.15em] transition-all duration-300 cursor-pointer inline-block text-center";

  const variantStyles = {
    primary:
      "border border-warm/60 text-warm hover:bg-warm hover:text-background hover:shadow-[0_0_20px_rgba(232,213,163,0.15)]",
    secondary:
      "border border-border text-text-secondary hover:border-warm/50 hover:text-warm",
  };

  if (href) {
    return (
      <Link
        href={href}
        className={cn(baseStyles, variantStyles[variant], className)}
        onClick={onClick}
        {...(props as React.ComponentPropsWithoutRef<"a">)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={cn(baseStyles, variantStyles[variant], className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
