import type { Metadata } from "next";
import Link from "next/link";
import { Search, MapPin, SlidersHorizontal } from "lucide-react";

export const metadata: Metadata = {
  title: "Search Listings",
  description:
    "Search all available properties in Kelowna and the Okanagan. Filter by price, location, bedrooms, and more.",
};

export default function SearchPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background pt-32 pb-16">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-10">
          <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
            MLS Listings
          </p>
          <h1 className="mt-4 font-heading text-5xl font-light tracking-tight text-text-primary md:text-6xl">
            Search <span className="italic text-accent">Properties</span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-text-secondary">
            Browse all available listings across Kelowna and the Okanagan.
            Updated daily from the MLS.
          </p>
        </div>
      </section>

      {/* IDX Placeholder */}
      <section className="bg-background pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          {/* Search bar placeholder */}
          <div className="border border-border bg-background-secondary p-6">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex flex-1 items-center gap-3 border border-border bg-background px-4 py-3">
                <Search className="h-4 w-4 text-text-muted" />
                <span className="text-sm text-text-muted">
                  Search by address, neighborhood, or MLS number...
                </span>
              </div>
              <div className="flex items-center gap-3 border border-border bg-background px-4 py-3">
                <SlidersHorizontal className="h-4 w-4 text-text-muted" />
                <span className="text-sm text-text-muted">Filters</span>
              </div>
              <button className="border border-accent bg-accent px-6 py-3 text-xs font-medium tracking-[0.2em] text-background uppercase transition-all duration-300 hover:bg-transparent hover:text-accent">
                Search
              </button>
            </div>
          </div>

          {/* IDX embed area */}
          <div className="mt-8 flex min-h-[500px] items-center justify-center border border-border bg-background-secondary">
            <div className="text-center">
              <MapPin className="mx-auto h-12 w-12 text-accent/30" />
              <h3 className="mt-4 font-heading text-2xl font-light text-text-primary">
                IDX Integration Area
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-text-muted">
                This is where the IDX property search will be embedded. Once
                you&apos;ve selected and configured your IDX provider
                (myRealPage, iHomefinder, etc.), the interactive map search and
                listing cards will appear here.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 text-xs font-medium tracking-[0.2em] text-accent uppercase hover:text-accent-hover"
              >
                Contact Karsen to get started
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
