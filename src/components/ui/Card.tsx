import Link from "next/link";
import { cn } from "@/lib/utils";

type CardPadding = "sm" | "md" | "lg";

interface CardProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  padding?: CardPadding;
}

const paddingMap: Record<CardPadding, string> = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8 md:p-10",
};

export default function Card({
  href,
  children,
  className,
  hoverable = true,
  padding = "md",
}: CardProps) {
  const cardClasses = cn(
    "border border-border bg-background-secondary transition-all duration-500",
    paddingMap[padding],
    hoverable && "hover:border-accent/30",
    href && hoverable && "cursor-pointer",
    className
  );

  if (href) {
    return (
      <Link href={href} className={cn(cardClasses, "block")}>
        {children}
      </Link>
    );
  }

  return (
    <div className={cardClasses}>
      {children}
    </div>
  );
}
