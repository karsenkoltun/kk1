import type { Metadata } from "next";
import { Users, Calendar, Mic } from "lucide-react";
import JoinForm from "@/components/forms/JoinForm";

export const metadata: Metadata = {
  title: "Kelowna Founders Club",
  description:
    "Connecting Kelowna's next generation of entrepreneurs. Monthly events, guest speakers, and a community built on growth.",
  keywords: [
    "Kelowna entrepreneurs",
    "Kelowna founders club",
    "Okanagan business community",
    "Kelowna networking events",
  ],
  alternates: { canonical: "https://karsenkoltun.ca/about/founders-club" },
};

const pastSpeakers = [
  "Dan Martell",
  "Local Tech Founders",
  "Okanagan Business Leaders",
  "Startup Advisors",
];

export default function FoundersClubPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background pt-32 pb-16">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
          <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
            Community
          </p>
          <h1 className="mt-4 font-heading text-4xl font-light tracking-tight text-text-primary sm:text-5xl md:text-6xl">
            Kelowna{" "}
            <span className="italic text-accent">Founders Club</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-text-secondary">
            Connecting Kelowna&apos;s next generation of entrepreneurs. Monthly
            events, world-class speakers, and a community built on growth.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-background pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-12 md:grid-cols-3">
            <div className="border border-border bg-background-secondary p-8">
              <Users className="h-7 w-7 text-accent" />
              <h3 className="mt-5 font-heading text-xl font-medium text-text-primary">
                Community
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                A curated group of ambitious builders, founders, and creatives
                in the Okanagan. Real connections, not networking fluff.
              </p>
            </div>
            <div className="border border-border bg-background-secondary p-8">
              <Calendar className="h-7 w-7 text-accent" />
              <h3 className="mt-5 font-heading text-xl font-medium text-text-primary">
                Monthly Events
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                Regular gatherings featuring guest speakers, workshops, and
                opportunities to connect with like-minded people.
              </p>
            </div>
            <div className="border border-border bg-background-secondary p-8">
              <Mic className="h-7 w-7 text-accent" />
              <h3 className="mt-5 font-heading text-xl font-medium text-text-primary">
                Guest Speakers
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                Learn from founders and leaders who&apos;ve built and scaled
                businesses. Past speakers include Dan Martell and local
                Okanagan entrepreneurs.
              </p>
            </div>
          </div>

          {/* Past Speakers */}
          <div className="mt-16 text-center">
            <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
              Past Speakers & Guests
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-6">
              {pastSpeakers.map((speaker) => (
                <span
                  key={speaker}
                  className="border border-border px-6 py-3 text-sm text-text-secondary"
                >
                  {speaker}
                </span>
              ))}
            </div>
          </div>

          {/* Join Form */}
          <div className="mx-auto mt-20 max-w-xl text-center">
            <h2 className="font-heading text-3xl font-light tracking-tight text-text-primary md:text-4xl">
              Join the Club
            </h2>
            <p className="mt-4 text-text-secondary">
              Sign up to get notified about upcoming events and become part of
              the community.
            </p>
            <JoinForm />
          </div>
        </div>
      </section>
    </>
  );
}
