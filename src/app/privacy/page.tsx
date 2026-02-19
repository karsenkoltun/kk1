import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for karsenkoltun.ca.",
};

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-background pt-32 pb-16">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
          <h1 className="font-heading text-5xl font-light tracking-tight text-text-primary md:text-6xl">
            Privacy <span className="italic text-accent">Policy</span>
          </h1>
          <p className="mt-4 text-text-secondary">
            Last updated: February 2026
          </p>
        </div>
      </section>

      <section className="bg-background pb-24 md:pb-32">
        <div className="mx-auto max-w-3xl space-y-8 px-6 lg:px-10">
          <div>
            <h2 className="font-heading text-2xl font-medium text-text-primary">
              Information We Collect
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              We collect information you provide directly to us, including your
              name, email address, phone number, and property details when you
              fill out forms on our website. We also collect certain information
              automatically when you visit our site, such as your IP address,
              browser type, and pages visited.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-medium text-text-primary">
              How We Use Your Information
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              We use the information we collect to provide real estate services,
              respond to your inquiries, send you market updates and newsletters
              you&apos;ve subscribed to, and improve our website and services.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-medium text-text-primary">
              Third-Party Services
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              We may use third-party services such as GoHighLevel for CRM and
              marketing automation, IDX providers for listing data, and
              analytics tools to understand how our site is used. These services
              have their own privacy policies.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-medium text-text-primary">
              Contact
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              If you have questions about this privacy policy, please contact us
              at karsen@karsenkoltun.com.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
