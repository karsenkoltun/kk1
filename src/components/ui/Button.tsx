"use client";

import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  showArrow?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
}

interface ButtonAsButton
  extends ButtonBaseProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> {
  href?: undefined;
}

interface ButtonAsLink extends ButtonBaseProps {
  href: string;
  disabled?: boolean;
  type?: never;
  onClick?: never;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<ButtonVariant, string> = {
  primary: cn(
    "border border-warm bg-warm text-background",
    "hover:bg-transparent hover:text-warm hover:border-warm",
    "disabled:opacity-40 disabled:pointer-events-none"
  ),
  secondary: cn(
    "border border-accent text-accent",
    "hover:bg-accent/10 hover:text-accent-hover",
    "disabled:opacity-40 disabled:pointer-events-none"
  ),
  ghost: cn(
    "border border-transparent text-text-secondary",
    "hover:text-accent",
    "disabled:opacity-40 disabled:pointer-events-none"
  ),
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-5 py-2.5 text-[10px] tracking-[0.2em] gap-2",
  md: "px-8 py-4 text-xs tracking-[0.2em] gap-3",
  lg: "px-10 py-5 text-xs tracking-[0.2em] gap-3",
};

export default function Button({
  variant = "primary",
  size = "md",
  href,
  showArrow = false,
  loading = false,
  children,
  className,
  ...rest
}: ButtonProps) {
  const baseClasses = cn(
    "group inline-flex items-center justify-center font-medium uppercase transition-all duration-300",
    variantStyles[variant],
    sizeStyles[size],
    loading && "pointer-events-none opacity-70",
    className
  );

  const content = (
    <>
      {loading ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : null}
      <span>{children}</span>
      {showArrow && !loading ? (
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      ) : null}
    </>
  );

  if (href) {
    const { disabled } = rest as ButtonAsLink;
    if (disabled) {
      return (
        <span className={cn(baseClasses, "pointer-events-none opacity-40")} aria-disabled="true">
          {content}
        </span>
      );
    }
    return (
      <Link href={href} className={baseClasses}>
        {content}
      </Link>
    );
  }

  const buttonProps = rest as Omit<ButtonAsButton, keyof ButtonBaseProps>;

  return (
    <button className={baseClasses} disabled={loading || buttonProps.disabled} {...buttonProps}>
      {content}
    </button>
  );
}
