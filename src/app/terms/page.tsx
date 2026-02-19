import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for karsenkoltun.ca.",
};

export default function TermsPage() {
  return (
    <>
      <section className="bg-background pt-32 pb-16">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
          <h1 className="font-heading text-5xl font-light tracking-tight text-text-primary md:text-6xl">
            Terms of <span className="italic text-accent">Service</span>
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
              Use of This Website
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              By accessing and using karsenkoltun.ca, you agree to these terms
              of service. This website is provided for informational purposes
              and to facilitate real estate services in the Kelowna and Okanagan
              area.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-medium text-text-primary">
              Listing Information
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              Property listings displayed on this site are provided through IDX
              data feeds from the Association of Interior Realtors. While we
              strive for accuracy, listing information may not always be
              up-to-date. Please verify all details directly.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-medium text-text-primary">
              Brokerage Disclosure
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              Karsen Koltun is a licensed real estate agent with Royal LePage
              Kelowna. All real estate transactions are conducted through the
              brokerage in accordance with British Columbia real estate
              regulations.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-medium text-text-primary">
              Contact
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              For questions about these terms, please contact
              karsen@karsenkoltun.com.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
