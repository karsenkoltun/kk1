import type { Metadata } from "next";
import {
  BarChart3,
  Globe,
  Palette,
  Zap,
} from "lucide-react";
import MarketingForm from "@/components/forms/MarketingForm";

export const metadata: Metadata = {
  title: "Marketing with Karsen Koltun",
  description:
    "Helping brands grow through digital marketing. Strategy, content, and results across real estate, hospitality, fitness, and tech.",
  keywords: [
    "Kelowna digital marketing",
    "real estate marketing Kelowna",
    "Okanagan brand strategy",
    "social media marketing Kelowna",
  ],
  alternates: { canonical: "https://karsenkoltun.ca/about/marketing" },
};

const services = [
  {
    icon: Palette,
    title: "Content & Creative",
    description:
      "Photography, videography, social media content, and brand storytelling that connects with your audience.",
  },
  {
    icon: BarChart3,
    title: "Paid Advertising",
    description:
      "Strategic campaigns across Meta, Google, and TikTok that drive real leads and measurable ROI.",
  },
  {
    icon: Globe,
    title: "Digital Strategy",
    description:
      "Full-funnel marketing plans tailored to your business. From brand positioning to lead generation.",
  },
  {
    icon: Zap,
    title: "Marketing Automation",
    description:
      "CRM setup, email sequences, and automated follow-up systems that nurture leads while you focus on your business.",
  },
];

const industries = [
  "Real Estate",
  "Hospitality",
  "Fitness & Wellness",
  "Tech & SaaS",
  "Local Business",
  "E-Commerce",
];

export default function MarketingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background pt-32 pb-16">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
          <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
            Agency
          </p>
          <h1 className="mt-4 font-heading text-4xl font-light tracking-tight text-text-primary sm:text-5xl md:text-6xl">
            Marketing with{" "}
            <span className="italic text-accent">Karsen Koltun</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-text-secondary">
            Helping brands grow through digital marketing. Strategy, content,
            and paid media that drives real results.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="bg-background pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-6 sm:grid-cols-2">
            {services.map((service) => (
              <div
                key={service.title}
                className="border border-border bg-background-secondary p-8 transition-all duration-500 hover:border-accent/30"
              >
                <service.icon className="h-7 w-7 text-accent" />
                <h3 className="mt-5 font-heading text-xl font-medium text-text-primary">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          {/* Industries */}
          <div className="mt-16 text-center">
            <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
              Industries Served
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              {industries.map((industry) => (
                <span
                  key={industry}
                  className="border border-border px-5 py-2.5 text-sm text-text-secondary"
                >
                  {industry}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mx-auto mt-20 max-w-xl text-center">
            <h2 className="font-heading text-3xl font-light tracking-tight text-text-primary md:text-4xl">
              Let&apos;s Work Together
            </h2>
            <p className="mt-4 text-text-secondary">
              Interested in working together? Fill out a quick application and
              I&apos;ll be in touch.
            </p>
            <MarketingForm />
          </div>
        </div>
      </section>
    </>
  );
}
