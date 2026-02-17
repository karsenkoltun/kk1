import { cn } from "@/lib/utils";
import AnimateIn from "@/components/ui/AnimateIn";

type PageHeroSize = "sm" | "md" | "lg";

interface PageHeroProps {
  label?: string;
  heading: string;
  accentText?: string;
  description?: string;
  children?: React.ReactNode;
  size?: PageHeroSize;
}

const sizeMap: Record<PageHeroSize, string> = {
  sm: "min-h-[50vh]",
  md: "min-h-[60vh]",
  lg: "min-h-[75vh]",
};

export default function PageHero({
  label,
  heading,
  accentText,
  description,
  children,
  size = "md",
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative flex items-center justify-center overflow-hidden",
        sizeMap[size]
      )}
    >
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background-tertiary via-background to-background" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Subtle glow orb */}
      <div className="absolute top-1/3 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-accent/5 blur-[120px]" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 py-32 text-center">
        <AnimateIn direction="up">
          {label ? (
            <p className="mb-6 text-xs font-medium tracking-[0.3em] text-accent uppercase">
              {label}
            </p>
          ) : null}

          <h1 className="font-heading text-4xl font-light leading-[1.1] tracking-tight text-text-primary sm:text-5xl md:text-6xl lg:text-7xl">
            {heading}
            {accentText ? (
              <>
                {" "}
                <span className="italic text-accent">{accentText}</span>
              </>
            ) : null}
          </h1>

          {description ? (
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
              {description}
            </p>
          ) : null}

          {children ? (
            <div className="mt-10">
              {children}
            </div>
          ) : null}
        </AnimateIn>
      </div>
    </section>
  );
}
