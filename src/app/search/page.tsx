import type { Metadata } from "next";
import Link from "next/link";
import {
  Search,
  MapPin,
  Bed,
  Bath,
  Maximize,
  ArrowRight,
  Info,
  Home,
  Building2,
  Building,
  Trees,
  LayoutGrid,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Search Listings",
  description:
    "Search all available properties in Kelowna and the Okanagan. Filter by price, location, bedrooms, and more.",
};

type ListingStatus = "Active" | "Pending" | "Sold";

interface PlaceholderListing {
  id: string;
  address: string;
  area: string;
  city: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  status: ListingStatus;
  type: string;
}

const propertyTabs = [
  { label: "All", icon: LayoutGrid },
  { label: "Houses", icon: Home },
  { label: "Condos", icon: Building2 },
  { label: "Townhomes", icon: Building },
  { label: "Land", icon: Trees },
];

const filterChips = [
  "Price Range",
  "Bedrooms",
  "Bathrooms",
  "Neighborhoods",
];

const placeholderListings: PlaceholderListing[] = [
  {
    id: "1",
    address: "3421 Lakeshore Road",
    area: "Lower Mission",
    city: "Kelowna",
    price: 1250000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 3200,
    status: "Active",
    type: "House",
  },
  {
    id: "2",
    address: "1890 Abbott Street",
    area: "Downtown Kelowna",
    city: "Kelowna",
    price: 875000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1450,
    status: "Active",
    type: "Condo",
  },
  {
    id: "3",
    address: "5612 Upper Mission Drive",
    area: "Upper Mission",
    city: "Kelowna",
    price: 2100000,
    bedrooms: 5,
    bathrooms: 4,
    sqft: 4800,
    status: "Pending",
    type: "House",
  },
  {
    id: "4",
    address: "782 Glenmore Drive",
    area: "Glenmore",
    city: "Kelowna",
    price: 695000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 2100,
    status: "Active",
    type: "House",
  },
  {
    id: "5",
    address: "210 Sunset Drive, Unit 304",
    area: "West Kelowna",
    city: "West Kelowna",
    price: 549000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1100,
    status: "Active",
    type: "Condo",
  },
  {
    id: "6",
    address: "1455 Kelglen Crescent",
    area: "South Pandosy",
    city: "Kelowna",
    price: 785000,
    bedrooms: 3,
    bathrooms: 3,
    sqft: 1850,
    status: "Sold",
    type: "Townhome",
  },
];

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(price);
}

const statusColors: Record<ListingStatus, string> = {
  Active: "bg-emerald-500/90 text-white",
  Pending: "bg-amber-500/90 text-white",
  Sold: "bg-red-500/90 text-white",
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

      {/* Search Interface */}
      <section className="bg-background pb-6">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          {/* Property Type Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {propertyTabs.map((tab, i) => (
              <span
                key={tab.label}
                className={
                  i === 0
                    ? "flex items-center gap-2 border border-accent bg-accent px-5 py-3 text-xs font-medium tracking-[0.15em] text-background uppercase"
                    : "flex items-center gap-2 border border-border bg-background-secondary px-5 py-3 text-xs font-medium tracking-[0.15em] text-text-muted uppercase transition-colors duration-300 hover:border-accent/40 hover:text-text-primary cursor-pointer"
                }
              >
                <tab.icon className="h-3.5 w-3.5" />
                {tab.label}
              </span>
            ))}
          </div>

          {/* Search Bar */}
          <div className="mt-6 border border-border bg-background-secondary p-5">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex flex-1 items-center gap-3 border border-border bg-background px-4 py-3.5">
                <Search className="h-4 w-4 text-text-muted" />
                <span className="text-sm text-text-muted">
                  Search by address, neighborhood, or MLS number...
                </span>
              </div>
              <span className="flex items-center justify-center gap-2 border border-accent bg-accent px-8 py-3.5 text-xs font-medium tracking-[0.2em] text-background uppercase cursor-pointer transition-all duration-300 hover:bg-transparent hover:text-accent">
                <Search className="h-3.5 w-3.5" />
                Search
              </span>
            </div>

            {/* Filter Chips */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="text-xs tracking-wide text-text-muted uppercase">
                Filters:
              </span>
              {filterChips.map((chip) => (
                <span
                  key={chip}
                  className="flex items-center gap-1.5 border border-border bg-background px-4 py-2 text-xs text-text-muted transition-colors duration-300 hover:border-accent/40 hover:text-text-primary cursor-pointer"
                >
                  {chip}
                  <svg
                    className="h-3 w-3 opacity-50"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              ))}
            </div>
          </div>

          {/* Results count */}
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-text-muted">
              Showing{" "}
              <span className="text-text-primary">
                {placeholderListings.length}
              </span>{" "}
              properties
            </p>
            <span className="text-xs tracking-wide text-text-muted">
              Sort: Newest First
            </span>
          </div>
        </div>
      </section>

      {/* Listing Cards Grid */}
      <section className="bg-background pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {placeholderListings.map((listing) => (
              <div
                key={listing.id}
                className="group border border-border bg-background-secondary transition-all duration-500 hover:border-accent/30"
              >
                {/* Image Placeholder */}
                <div className="relative aspect-[4/3] overflow-hidden bg-background-tertiary">
                  <div className="absolute inset-0 flex items-center justify-center transition-transform duration-700 group-hover:scale-110">
                    <span className="text-xs tracking-[0.2em] text-text-muted uppercase">
                      Listing Photo
                    </span>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-accent/0 transition-all duration-500 group-hover:bg-accent/10" />

                  {/* Status badge */}
                  <div
                    className={`absolute top-3 right-3 z-10 px-3 py-1 text-[10px] font-semibold tracking-[0.15em] uppercase ${statusColors[listing.status]}`}
                  >
                    {listing.status}
                  </div>

                  {/* Type badge */}
                  <div className="absolute top-3 left-3 z-10 bg-background/90 px-3 py-1 backdrop-blur-sm">
                    <span className="text-[10px] font-medium tracking-[0.15em] text-text-primary uppercase">
                      {listing.type}
                    </span>
                  </div>

                  {/* Price tag */}
                  <div className="absolute bottom-0 left-0 bg-background/90 px-4 py-2 backdrop-blur-sm">
                    <p className="font-heading text-lg font-semibold text-accent">
                      {formatPrice(listing.price)}
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5">
                  <h3 className="font-heading text-lg font-medium text-text-primary transition-colors group-hover:text-accent">
                    {listing.address}
                  </h3>

                  {/* Location */}
                  <div className="mt-1.5 flex items-center gap-1.5">
                    <MapPin className="h-3 w-3 text-accent/50" />
                    <p className="text-xs tracking-[0.15em] text-text-muted uppercase">
                      {listing.area}, {listing.city}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="mt-4 flex items-center gap-4 border-t border-border pt-4">
                    <span className="flex items-center gap-1.5 text-xs text-text-muted">
                      <Bed className="h-3.5 w-3.5" />
                      {listing.bedrooms}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-text-muted">
                      <Bath className="h-3.5 w-3.5" />
                      {listing.bathrooms}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-text-muted">
                      <Maximize className="h-3.5 w-3.5" />
                      {listing.sqft.toLocaleString()} sqft
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IDX Notice */}
      <section className="bg-background pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="border border-accent/20 bg-accent/5 p-8 md:p-10">
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-accent/30 bg-accent/10">
                <Info className="h-5 w-5 text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="font-heading text-xl font-medium text-text-primary">
                  IDX Integration Coming Soon
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  Full MLS integration with interactive map search, saved
                  searches, and real-time listing alerts is on its way. Once the
                  IDX provider is configured (myRealPage, iHomefinder, or
                  similar), this page will display live, searchable listings
                  pulled directly from the MLS.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <span className="border border-border bg-background px-3 py-1.5 text-[11px] tracking-[0.1em] text-text-muted">
                    Live MLS Data
                  </span>
                  <span className="border border-border bg-background px-3 py-1.5 text-[11px] tracking-[0.1em] text-text-muted">
                    Interactive Map
                  </span>
                  <span className="border border-border bg-background px-3 py-1.5 text-[11px] tracking-[0.1em] text-text-muted">
                    Saved Searches
                  </span>
                  <span className="border border-border bg-background px-3 py-1.5 text-[11px] tracking-[0.1em] text-text-muted">
                    Listing Alerts
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-background-secondary py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
          <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
            Personalized Service
          </p>
          <h2 className="mt-4 font-heading text-4xl font-light tracking-tight text-text-primary md:text-5xl">
            Can&apos;t Find What You&apos;re{" "}
            <span className="italic text-accent">Looking For?</span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-text-secondary">
            Whether you have specific requirements or just want an expert&apos;s
            perspective on the current market, I&apos;m here to help. Tell me
            what you&apos;re looking for and I&apos;ll find it.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 border border-accent bg-accent px-8 py-4 text-xs font-medium tracking-[0.2em] text-background uppercase transition-all duration-300 hover:bg-transparent hover:text-accent"
            >
              Contact Karsen
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/home-value"
              className="group inline-flex items-center gap-3 border border-border px-8 py-4 text-xs font-medium tracking-[0.2em] text-text-muted uppercase transition-all duration-300 hover:border-accent hover:text-accent"
            >
              Get a Home Valuation
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
