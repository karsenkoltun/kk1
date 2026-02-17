"use client";

import AnimateIn from "@/components/ui/AnimateIn";

const stats = [
  { value: "300+", label: "Homes Marketed" },
  { value: "8+", label: "Years Experience" },
  { value: "$150M+", label: "In Real Estate" },
  { value: "5.0", label: "Google Rating" },
];

export default function StatsBar() {
  return (
    <section className="border-y border-border bg-background-secondary">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, i) => (
            <AnimateIn key={stat.label} delay={i * 0.1} direction="up">
              <div className="text-center">
                <p className="font-heading text-4xl font-semibold tracking-tight text-accent md:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs tracking-[0.2em] text-text-muted uppercase">
                  {stat.label}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
