"use client";

import React, { useRef, useState, useMemo, useEffect } from "react";

/* ------------------------------------------------
   Types & defaults
   ------------------------------------------------ */
type BlurPosition = "top" | "bottom" | "left" | "right";
type BlurCurve = "linear" | "bezier" | "ease-in" | "ease-out" | "ease-in-out";
type BlurTarget = "parent" | "page";

interface GradualBlurProps {
  /** Which edge the blur emanates from */
  position?: BlurPosition;
  /** Max blur strength in rem */
  strength?: number;
  /** Height (or width for left/right) of the blur zone */
  height?: string;
  /** Number of layered blur divs (more = smoother) */
  divCount?: number;
  /** Use exponential blur ramp instead of linear */
  exponential?: boolean;
  /** z-index */
  zIndex?: number;
  /** Opacity of the blur layers */
  opacity?: number;
  /** Interpolation curve */
  curve?: BlurCurve;
  /** Target container: "parent" positions absolute, "page" positions fixed */
  target?: BlurTarget;
  /** Extra className for the wrapper */
  className?: string;
  /** Extra inline styles */
  style?: React.CSSProperties;
}

const CURVE_FUNCTIONS: Record<BlurCurve, (p: number) => number> = {
  linear: (p) => p,
  bezier: (p) => p * p * (3 - 2 * p),
  "ease-in": (p) => p * p,
  "ease-out": (p) => 1 - Math.pow(1 - p, 2),
  "ease-in-out": (p) =>
    p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2,
};

const GRADIENT_DIRECTION: Record<BlurPosition, string> = {
  top: "to top",
  bottom: "to bottom",
  left: "to left",
  right: "to right",
};

/* ------------------------------------------------
   Component
   ------------------------------------------------ */
function GradualBlur({
  position = "bottom",
  strength = 2,
  height = "6rem",
  divCount = 5,
  exponential = false,
  zIndex = 1000,
  opacity = 1,
  curve = "linear",
  target = "parent",
  className = "",
  style = {},
}: GradualBlurProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  /* Build the layered blur divs */
  const blurDivs = useMemo(() => {
    const divs: React.ReactNode[] = [];
    const increment = 100 / divCount;
    const curveFunc = CURVE_FUNCTIONS[curve] || CURVE_FUNCTIONS.linear;
    const direction = GRADIENT_DIRECTION[position] || "to bottom";

    for (let i = 1; i <= divCount; i++) {
      let progress = i / divCount;
      progress = curveFunc(progress);

      const blurValue = exponential
        ? Math.pow(2, progress * 4) * 0.0625 * strength
        : 0.0625 * (progress * divCount + 1) * strength;

      const p1 = Math.round((increment * i - increment) * 10) / 10;
      const p2 = Math.round(increment * i * 10) / 10;
      const p3 = Math.round((increment * i + increment) * 10) / 10;
      const p4 = Math.round((increment * i + increment * 2) * 10) / 10;

      let gradient = `transparent ${p1}%, black ${p2}%`;
      if (p3 <= 100) gradient += `, black ${p3}%`;
      if (p4 <= 100) gradient += `, transparent ${p4}%`;

      const maskImage = `linear-gradient(${direction}, ${gradient})`;

      divs.push(
        <div
          key={i}
          style={{
            position: "absolute",
            inset: 0,
            maskImage,
            WebkitMaskImage: maskImage,
            backdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
            WebkitBackdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
            opacity,
          }}
        />
      );
    }
    return divs;
  }, [divCount, curve, position, exponential, strength, opacity]);

  /* Container positioning */
  const containerStyle = useMemo((): React.CSSProperties => {
    const isVertical = position === "top" || position === "bottom";
    const isPageTarget = target === "page";

    const base: React.CSSProperties = {
      position: isPageTarget ? "fixed" : "absolute",
      pointerEvents: "none",
      opacity: mounted ? 1 : 0,
      transition: "opacity 0.3s ease-out",
      zIndex,
      isolation: "isolate",
      ...style,
    };

    if (isVertical) {
      base.height = height;
      base.width = "100%";
      base[position] = 0;
      base.left = 0;
      base.right = 0;
    } else {
      base.width = height;
      base.height = "100%";
      base[position] = 0;
      base.top = 0;
      base.bottom = 0;
    }

    return base;
  }, [position, target, height, zIndex, style, mounted]);

  return (
    <div
      ref={containerRef}
      className={`gradual-blur ${className}`}
      style={containerStyle}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        {blurDivs}
      </div>
    </div>
  );
}

export default React.memo(GradualBlur);
