"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Bed, Bath, Maximize, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import AnimateIn from "@/components/ui/AnimateIn";

type ListingStatus = "Active" | "Pending" | "Sold";

interface Listing {
  id: string;
  address: string;
  area: string;
  city: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  status: ListingStatus;
  featured?: boolean;
}

const placeholderListings: Listing[] = [
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
    featured: true,
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

const activeCount = placeholderListings.filter((l) => l.status === "Active").length;

function ListingCard({ listing, index }: { listing: Listing; index: number }) {
  return (
    <AnimateIn delay={index * 0.1}>
      <div className="group min-w-[85vw] cursor-pointer border border-border bg-background transition-all duration-500 hover:border-accent/30 sm:min-w-[280px] md:min-w-0">
        {/* Image placeholder */}
        <div className="relative aspect-[4/3] overflow-hidden bg-background-tertiary">
          {/* Hover zoom effect on placeholder */}
          <div className="absolute inset-0 flex items-center justify-center transition-transform duration-700 group-hover:scale-110">
            <span className="text-xs tracking-[0.2em] text-text-muted uppercase">
              Listing Photo
            </span>
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-accent/0 transition-all duration-500 group-hover:bg-accent/10" />

          {/* Featured badge */}
          {listing.featured && (
            <div className="absolute top-3 left-3 z-10 bg-accent px-3 py-1">
              <span className="text-[10px] font-semibold tracking-[0.2em] text-background uppercase">
                Featured
              </span>
            </div>
          )}

          {/* Status badge */}
          <div
            className={cn(
              "absolute top-3 right-3 z-10 px-3 py-1 text-[10px] font-semibold tracking-[0.15em] uppercase",
              statusColors[listing.status]
            )}
          >
            {listing.status}
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

          {/* City with map pin */}
          <div className="mt-1.5 flex items-center gap-1.5">
            <MapPin className="h-3 w-3 text-accent/50" />
            <p className="text-xs tracking-[0.15em] text-text-muted uppercase">
              {listing.area}, {listing.city}
            </p>
          </div>

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
    </AnimateIn>
  );
}

export default function FeaturedListings() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="bg-background-secondary py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <AnimateIn>
          <div className="flex flex-col items-center text-center">
            <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
              Featured Properties
            </p>
            <h2 className="mt-4 font-heading text-4xl font-light tracking-tight text-text-primary md:text-5xl">
              Active Listings
            </h2>
            <p className="mt-2 text-sm text-text-muted">
              {activeCount} Active Listing{activeCount !== 1 ? "s" : ""}
            </p>
            <p className="mt-3 max-w-lg text-text-secondary">
              Explore curated properties across the Okanagan. Updated daily from
              the MLS.
            </p>
          </div>
        </AnimateIn>

        {/* Mobile: horizontal scroll carousel / Desktop: grid */}
        <div
          ref={scrollRef}
          className="mt-16 flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-2 md:overflow-visible md:pb-0 lg:grid-cols-4 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {placeholderListings.map((listing, i) => (
            <div key={listing.id} className="snap-start">
              <ListingCard listing={listing} index={i} />
            </div>
          ))}
        </div>

        <AnimateIn delay={0.4}>
          <div className="mt-12 text-center">
            <Link
              href="/search"
              className="group inline-flex items-center gap-3 border border-accent px-8 py-4 text-xs font-medium tracking-[0.2em] text-accent uppercase transition-all duration-300 hover:bg-accent hover:text-background"
            >
              View All Listings
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
