import { cn } from "@/lib/utils";

type BadgeVariant = "accent" | "muted" | "success" | "new";
type BadgeSize = "sm" | "md";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
}

const variantStyles: Record<BadgeVariant, string> = {
  accent: "border-accent/30 bg-accent/10 text-accent",
  muted: "border-border bg-background text-text-secondary",
  success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  new: "border-accent bg-accent text-background",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-2.5 py-0.5 text-[10px]",
  md: "px-3.5 py-1 text-xs",
};

export default function Badge({
  children,
  variant = "accent",
  size = "sm",
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-medium tracking-[0.1em] uppercase",
        variantStyles[variant],
        sizeStyles[size]
      )}
    >
      {children}
    </span>
  );
}
