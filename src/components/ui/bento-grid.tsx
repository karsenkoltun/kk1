"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

/* ================================================
   Bento Grid Primitives
   Adapted from Aceternity UI for Karsen Koltun
   dark luxury theme
   ================================================ */

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[20rem] md:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  href,
  category,
  date,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  href?: string;
  category?: string;
  date?: string;
}) => {
  const inner = (
    <div
      className={cn(
        "row-span-1 flex h-full flex-col justify-between overflow-hidden rounded-xl border border-border/60 bg-background-secondary p-4 transition-all duration-300",
        "hover:border-accent/20 hover:shadow-[0_0_30px_rgba(126,200,227,0.06),0_8px_32px_rgba(0,0,0,0.3)]",
      )}
    >
      {/* Header / image area */}
      {header}

      {/* Content area */}
      <div className="mt-auto pt-3 transition duration-200 group-hover/bento:translate-x-1">
        <div className="flex items-center gap-3">
          {icon}
          {category && (
            <span className="rounded-full bg-accent/10 px-2.5 py-1 text-[10px] font-semibold tracking-[0.1em] text-accent uppercase">
              {category}
            </span>
          )}
          {date && (
            <span className="text-[10px] tracking-wide text-text-muted">
              {date}
            </span>
          )}
        </div>
        <div className="mt-2 mb-1 font-heading text-lg font-medium leading-snug tracking-tight text-text-primary transition-colors duration-200 group-hover/bento:text-accent">
          {title}
        </div>
        <div className="line-clamp-2 text-xs font-normal leading-relaxed text-text-secondary">
          {description}
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className={cn("group/bento", className)}>
        {inner}
      </Link>
    );
  }

  return (
    <div className={cn("group/bento", className)}>
      {inner}
    </div>
  );
};
