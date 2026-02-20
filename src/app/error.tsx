"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[GlobalError]", error);
  }, [error]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6 text-center">
      {/* Subtle radial gradient background */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 40%, rgba(201,168,76,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Icon */}
      <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-warm/20 bg-warm/5">
        <svg
          className="h-8 w-8 text-warm"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          />
        </svg>
      </div>

      {/* Heading */}
      <h1 className="font-heading text-4xl font-semibold text-text-primary sm:text-5xl">
        Something went wrong
      </h1>

      {/* Description */}
      <p className="mt-4 max-w-md text-lg text-text-secondary">
        We hit an unexpected issue. This has been logged and we&apos;re looking
        into it.
      </p>

      {/* CTA buttons */}
      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <button
          onClick={reset}
          className="inline-flex items-center justify-center rounded-sm bg-warm px-8 py-3 text-sm font-medium tracking-wide text-background transition-colors hover:bg-warm-hover"
        >
          Try Again
        </button>
        <a
          href="/"
          className="inline-flex items-center justify-center rounded-sm border border-border-light px-8 py-3 text-sm font-medium tracking-wide text-text-primary transition-colors hover:border-accent hover:text-accent"
        >
          Go Home
        </a>
      </div>

      {/* Error digest for support */}
      {error.digest && (
        <p className="mt-8 text-xs text-text-muted">
          Error ID: {error.digest}
        </p>
      )}
    </div>
  );
}
