import { cn } from "@/lib/utils";

type ContainerSize = "sm" | "md" | "lg";

interface ContainerProps {
  size?: ContainerSize;
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

const sizeMap: Record<ContainerSize, string> = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-7xl",
};

export default function Container({
  size = "lg",
  children,
  className,
  as: Component = "div",
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto px-6 lg:px-10",
        sizeMap[size],
        className
      )}
    >
      {children}
    </Component>
  );
}
