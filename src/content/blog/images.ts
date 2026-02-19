/**
 * Blog post hero images — Unsplash (free for commercial use).
 * Keyed by slug. Used on both the listing grid and individual post pages.
 *
 * All URLs use Unsplash's CDN with optimised sizing:
 *   - hero:  1600×900 (21:9 aspect on post pages)
 *   - card:  800×600  (4:3 aspect on grid cards)
 */

type BlogImage = { hero: string; card: string; alt: string };

const blogImages: Record<string, BlogImage> = {
  /* ─── Neighbourhoods ─── */
  "lower-mission-kelowna-real-estate-neighbourhood-guide": {
    hero: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600&h=900&fit=crop",
    card: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=600&fit=crop",
    alt: "Lakefront view at sunset in the Okanagan",
  },
  "upper-mission-kelowna-homes": {
    hero: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&h=900&fit=crop",
    card: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
    alt: "Luxury home with panoramic views",
  },
  "glenmore-kelowna-real-estate-family-neighbourhood-guide": {
    hero: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600&h=900&fit=crop",
    card: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
    alt: "Family-friendly neighbourhood with tree-lined streets",
  },
  "rutland-kelowna-homes-for-sale-affordable-neighbourhood": {
    hero: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1600&h=900&fit=crop",
    card: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop",
    alt: "Affordable family home with front yard",
  },
  "living-in-lake-country-bc-everything-you-need-to-know": {
    hero: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&h=900&fit=crop",
    card: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    alt: "Beautiful lake surrounded by mountains",
  },
  "west-kelowna-vs-kelowna": {
    hero: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&h=900&fit=crop",
    card: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop",
    alt: "Mountain landscape view of the Okanagan valley",
  },
  "black-mountain-kelowna-real-estate-pros-cons-home-prices": {
    hero: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&h=900&fit=crop",
    card: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
    alt: "Modern home exterior in a hillside community",
  },
  "downtown-kelowna-condos-for-sale-buyers-guide": {
    hero: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&h=900&fit=crop",
    card: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
    alt: "Modern downtown condo building",
  },
  "mckinley-beach-kelowna-master-planned-community": {
    hero: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&h=900&fit=crop",
    card: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
    alt: "Master-planned community with modern homes",
  },
  "south-east-kelowna-real-estate-acreages-country-living": {
    hero: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&h=900&fit=crop",
    card: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop",
    alt: "Scenic countryside acreage with orchards",
  },

  /* ─── Home Buying ─── */
  "first-time-home-buyer-kelowna-guide": {
    hero: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&h=900&fit=crop",
    card: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
    alt: "Person holding house keys at front door",
  },
  "bc-first-time-home-buyer-grants-incentives": {
    hero: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1600&h=900&fit=crop",
    card: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=600&fit=crop",
    alt: "Financial planning documents and calculator",
  },
  "how-much-house-can-you-afford-kelowna": {
    hero: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&h=900&fit=crop",
    card: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop",
    alt: "Person reviewing financial documents",
  },
  "condo-vs-townhouse-vs-house-kelowna": {
    hero: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600&h=900&fit=crop",
    card: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop",
    alt: "Variety of residential property types",
  },
  "hidden-costs-buying-home-bc": {
    hero: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1600&h=900&fit=crop",
    card: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=600&fit=crop",
    alt: "Stack of coins representing hidden costs",
  },
  "new-build-vs-resale-home-kelowna": {
    hero: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&h=900&fit=crop",
    card: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
    alt: "New modern home construction",
  },
  "home-inspection-kelowna-what-to-look-for": {
    hero: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1600&h=900&fit=crop",
    card: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop",
    alt: "Home inspector checking property details",
  },
  "strata-fees-bc-explained": {
    hero: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&h=900&fit=crop",
    card: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
    alt: "Modern condominium building exterior",
  },
  "how-to-win-multiple-offer-situation-kelowna-real-estate": {
    hero: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&h=900&fit=crop",
    card: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    alt: "People reviewing real estate offer documents",
  },

  /* ─── Home Selling ─── */
  "sell-home-fast-kelowna": {
    hero: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1600&h=900&fit=crop",
    card: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=600&fit=crop",
    alt: "Home for sale with sold sign",
  },
  "home-value-kelowna-free-valuation-guide": {
    hero: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=1600&h=900&fit=crop",
    card: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&h=600&fit=crop",
    alt: "Beautiful residential property exterior",
  },
  "best-time-to-sell-home-kelowna": {
    hero: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1600&h=900&fit=crop",
    card: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=600&fit=crop",
    alt: "Calendar and seasonal real estate planning",
  },
  "home-staging-tips-kelowna": {
    hero: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1600&h=900&fit=crop",
    card: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=600&fit=crop",
    alt: "Beautifully staged living room interior",
  },
  "realtor-fees-bc-transparent-breakdown": {
    hero: "https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=1600&h=900&fit=crop",
    card: "https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=800&h=600&fit=crop",
    alt: "Real estate agent discussing fees with client",
  },
  "renovations-that-add-value-kelowna-home": {
    hero: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1600&h=900&fit=crop",
    card: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
    alt: "Modern kitchen renovation with new countertops",
  },
  "basement-renovation-cost-kelowna": {
    hero: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1600&h=900&fit=crop",
    card: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&h=600&fit=crop",
    alt: "Finished basement renovation with modern design",
  },

  /* ─── Market Trends ─── */
  "kelowna-real-estate-market-report": {
    hero: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1600&h=900&fit=crop",
    card: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop",
    alt: "Real estate market data and analytics",
  },
  "kelowna-buyers-market-or-sellers-market-2025": {
    hero: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1600&h=900&fit=crop",
    card: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=600&fit=crop",
    alt: "Market trend analysis with charts",
  },
  "kelowna-home-prices-history-10-year-look": {
    hero: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1600&h=900&fit=crop",
    card: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&h=600&fit=crop",
    alt: "Historical price trend graphs",
  },

  /* ─── Lifestyle ─── */
  "moving-to-kelowna-from-vancouver": {
    hero: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1600&h=900&fit=crop",
    card: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
    alt: "Scenic view of Kelowna waterfront cityscape",
  },

  /* ─── Skeleton posts ─── */
  "kelowna-market-update-spring-2024": {
    hero: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=1600&h=900&fit=crop",
    card: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800&h=600&fit=crop",
    alt: "Spring real estate market overview",
  },
  "top-closing-costs-buyers": {
    hero: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&h=900&fit=crop",
    card: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop",
    alt: "Reviewing closing cost documents",
  },
  "sell-kelowna-home-highest-price": {
    hero: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&h=900&fit=crop",
    card: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
    alt: "Luxury home exterior with curb appeal",
  },
  "best-neighborhoods-families": {
    hero: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1600&h=900&fit=crop",
    card: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&h=600&fit=crop",
    alt: "Beautiful family neighbourhood",
  },
  "first-time-buyer-guide": {
    hero: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&h=900&fit=crop",
    card: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
    alt: "First-time buyer receiving house keys",
  },
  "preparing-home-for-sale": {
    hero: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=1600&h=900&fit=crop",
    card: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=800&h=600&fit=crop",
    alt: "Home being prepared for sale",
  },
  "okanagan-lifestyle-guide": {
    hero: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&h=900&fit=crop",
    card: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
    alt: "Okanagan lakeside lifestyle",
  },
  "mortgage-rate-forecast": {
    hero: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1600&h=900&fit=crop",
    card: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
    alt: "Mortgage rate charts and financial planning",
  },
  "spring-market-seller-tips": {
    hero: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=1600&h=900&fit=crop",
    card: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&h=600&fit=crop",
    alt: "Spring home with blooming garden",
  },
};

export default blogImages;
