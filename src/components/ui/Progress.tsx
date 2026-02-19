"use client";

import { cn } from "@/lib/utils";

interface ProgressProps {
  /** 0 – 100 */
  value: number;
  className?: string;
}

export default function Progress({ value, className }: ProgressProps) {
  return (
    <div
      className={cn(
        "h-1.5 w-full overflow-hidden rounded-full bg-background-secondary",
        className
      )}
    >
      <div
        className="h-full rounded-full bg-warm transition-all duration-500 ease-out"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
