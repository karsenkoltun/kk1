"use client";

import Link from "next/link";
import { ArrowRight, Bed, Bath, Maximize } from "lucide-react";
import AnimateIn from "@/components/ui/AnimateIn";

const placeholderListings = [
  {
    id: "1",
    address: "3421 Lakeshore Road",
    area: "Lower Mission",
    price: 1250000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 3200,
  },
  {
    id: "2",
    address: "1890 Abbott Street",
    area: "Downtown Kelowna",
    price: 875000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1450,
  },
  {
    id: "3",
    address: "5612 Upper Mission Drive",
    area: "Upper Mission",
    price: 2100000,
    bedrooms: 5,
    bathrooms: 4,
    sqft: 4800,
  },
  {
    id: "4",
    address: "782 Glenmore Drive",
    area: "Glenmore",
    price: 695000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 2100,
  },
];

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function FeaturedListings() {
  return (
    <section className="bg-background-secondary py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <AnimateIn>
          <div className="flex flex-col items-center text-center">
            <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
              Featured Properties
            </p>
            <h2 className="mt-4 font-heading text-4xl font-light tracking-tight text-text-primary md:text-5xl">
              Active Listings
            </h2>
            <p className="mt-4 max-w-lg text-text-secondary">
              Explore curated properties across the Okanagan. Updated daily from
              the MLS.
            </p>
          </div>
        </AnimateIn>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {placeholderListings.map((listing, i) => (
            <AnimateIn key={listing.id} delay={i * 0.1}>
              <div className="group cursor-pointer border border-border bg-background transition-all duration-500 hover:border-accent/30">
                {/* Image placeholder */}
                <div className="relative aspect-[4/3] overflow-hidden bg-background-tertiary">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs tracking-[0.2em] text-text-muted uppercase">
                      Listing Photo
                    </span>
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-accent/0 transition-all duration-500 group-hover:bg-accent/10" />
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
                  <p className="mt-1 text-xs tracking-[0.15em] text-text-muted uppercase">
                    {listing.area}
                  </p>
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
