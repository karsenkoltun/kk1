"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Home, Clock, DollarSign, Star } from "lucide-react";
import AnimateIn from "@/components/ui/AnimateIn";

const stats = [
  { target: 300, suffix: "+", label: "Homes Marketed", icon: Home, decimals: 0 },
  { target: 8, suffix: "+", label: "Years Experience", icon: Clock, decimals: 0 },
  { target: 150, suffix: "M+", label: "In Real Estate", prefix: "$", icon: DollarSign, decimals: 0 },
  { target: 5.0, suffix: "", label: "Google Rating", icon: Star, decimals: 1 },
];

function useCountUp(
  target: number,
  decimals: number,
  duration: number = 2000,
  trigger: boolean = false
) {
  const [value, setValue] = useState(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!trigger) return;

    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;

      setValue(Number(current.toFixed(decimals)));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameRef.current);
  }, [target, decimals, duration, trigger]);

  return value;
}

function StatItem({
  stat,
  index,
  isLast,
}: {
  stat: (typeof stats)[number];
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  const handleInView = useCallback(() => {
    setInView(true);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          handleInView();
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [handleInView]);

  const count = useCountUp(stat.target, stat.decimals, 2000, inView);

  return (
    <AnimateIn delay={index * 0.1} direction="up">
      <div ref={ref} className="relative flex items-center justify-center">
        <div className="text-center">
          <stat.icon className="mx-auto mb-3 h-5 w-5 text-accent/50" strokeWidth={1.5} />
          <p className="font-heading text-4xl font-semibold tracking-tight text-warm md:text-5xl">
            {stat.prefix ?? ""}
            {stat.decimals > 0 ? count.toFixed(stat.decimals) : count}
            {stat.suffix}
          </p>
          <p className="mt-2 text-xs tracking-[0.2em] text-text-muted uppercase">
            {stat.label}
          </p>
        </div>

        {/* Subtle divider line between stats (not after last) */}
        {!isLast && (
          <div className="absolute right-0 top-1/2 hidden h-12 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-border to-transparent md:block" />
        )}
      </div>
    </AnimateIn>
  );
}

export default function StatsBar() {
  return (
    <section className="border-y border-border bg-background-secondary">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, i) => (
            <StatItem
              key={stat.label}
              stat={stat}
              index={i}
              isLast={i === stats.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
