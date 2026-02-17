import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6 text-center">
      {/* Subtle radial gradient background */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 40%, rgba(96,165,250,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Large 404 display */}
      <p
        className="font-heading text-[10rem] font-bold leading-none tracking-tight text-accent/10 sm:text-[14rem]"
        aria-hidden="true"
      >
        404
      </p>

      {/* Heading */}
      <h1 className="-mt-10 font-heading text-4xl font-semibold text-text-primary sm:text-5xl">
        Page not found
      </h1>

      {/* Description */}
      <p className="mt-4 max-w-md text-lg text-text-secondary">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      {/* CTA buttons */}
      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-sm bg-warm px-8 py-3 text-sm font-medium tracking-wide text-background transition-colors hover:bg-warm-hover"
        >
          Go Home
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-sm border border-border-light px-8 py-3 text-sm font-medium tracking-wide text-text-primary transition-colors hover:border-accent hover:text-accent"
        >
          Contact Karsen
        </Link>
      </div>
    </div>
  );
}
