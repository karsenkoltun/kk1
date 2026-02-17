import { cn } from "@/lib/utils";

type SkeletonVariant = "text" | "image" | "card" | "circle";

interface SkeletonProps {
  className?: string;
  variant?: SkeletonVariant;
}

const variantStyles: Record<SkeletonVariant, string> = {
  text: "h-4 w-full rounded",
  image: "aspect-video w-full rounded",
  card: "h-64 w-full rounded",
  circle: "h-12 w-12 rounded-full",
};

export default function Skeleton({
  className,
  variant = "text",
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-shimmer bg-background-secondary",
        variantStyles[variant],
        className
      )}
      aria-hidden="true"
    />
  );
}
