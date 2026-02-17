import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label?: string;
  heading: string;
  accentText?: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}

export default function SectionHeader({
  label,
  heading,
  accentText,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      {label ? (
        <p className="mb-4 text-xs font-medium tracking-[0.3em] text-accent uppercase">
          {label}
        </p>
      ) : null}

      <h2 className="font-heading text-3xl font-light leading-tight tracking-tight text-text-primary sm:text-4xl md:text-5xl">
        {heading}
        {accentText ? (
          <>
            {" "}
            <span className="italic text-accent">{accentText}</span>
          </>
        ) : null}
      </h2>

      {description ? (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed text-text-secondary",
            align === "center" && "mx-auto max-w-2xl"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
