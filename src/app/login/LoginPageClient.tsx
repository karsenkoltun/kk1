"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { cn } from "@/lib/utils";
import { IconBrandGoogle } from "@tabler/icons-react";

export default function LoginPageClient() {
  return (
    <section className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-24">
      <div className="shadow-input mx-auto w-full max-w-md rounded-2xl bg-background-secondary p-8">
        {/* Heading */}
        <h2 className="font-heading text-3xl font-light tracking-wider text-text-primary">
          Welcome Back
        </h2>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-text-secondary">
          Sign in to save your favourite listings, track your home value, and
          get personalized Kelowna real estate insights.
        </p>

        {/* Divider */}
        <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

        {/* Google OAuth Button */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className={cn(
            "group/btn shadow-input relative flex h-12 w-full items-center justify-center gap-3 rounded-lg",
            "bg-background px-4 font-medium text-text-primary",
            "border border-border transition-all duration-300",
            "hover:border-accent/30 hover:bg-background-secondary"
          )}
          type="button"
        >
          <IconBrandGoogle className="h-5 w-5 text-text-secondary" />
          <span className="text-sm tracking-wide text-text-secondary">
            Continue with Google
          </span>
          <BottomGradient />
        </button>

        {/* Footer text */}
        <p className="mt-6 text-center text-xs text-text-muted">
          By continuing, you agree to our{" "}
          <a
            href="/terms"
            className="text-accent transition-colors hover:text-accent-hover"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="/privacy"
            className="text-accent transition-colors hover:text-accent-hover"
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </section>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-warm to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};
