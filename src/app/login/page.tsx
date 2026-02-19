import type { Metadata } from "next";
import LoginPageClient from "./LoginPageClient";

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Sign in to your Karsen Koltun Real Estate account to save listings, track your home value, and more.",
};

export default function LoginPage() {
  return <LoginPageClient />;
}
