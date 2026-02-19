import type { BlogPost } from "@/types";

/* ─── Real blog posts (with full content) ─── */
import lowerMission from "./lower-mission-kelowna-real-estate-neighbourhood-guide";
import upperMission from "./upper-mission-kelowna-homes";
import glenmore from "./glenmore-kelowna-real-estate-family-neighbourhood-guide";
import rutland from "./rutland-kelowna-homes-for-sale-affordable-neighbourhood";
import lakeCountry from "./living-in-lake-country-bc-everything-you-need-to-know";
import westKelowna from "./west-kelowna-vs-kelowna";
import blackMountain from "./black-mountain-kelowna-real-estate-pros-cons-home-prices";
import downtownCondos from "./downtown-kelowna-condos-for-sale-buyers-guide";
import mckinleyBeach from "./mckinley-beach-kelowna-master-planned-community";
import southEastKelowna from "./south-east-kelowna-real-estate-acreages-country-living";
import firstTimeBuyer from "./first-time-home-buyer-kelowna-guide";
import bcIncentives from "./bc-first-time-home-buyer-grants-incentives";
import affordability from "./how-much-house-can-you-afford-kelowna";
import condoVsTownhouse from "./condo-vs-townhouse-vs-house-kelowna";
import hiddenCosts from "./hidden-costs-buying-home-bc";
import newVsResale from "./new-build-vs-resale-home-kelowna";
import homeInspection from "./home-inspection-kelowna-what-to-look-for";
import strataFees from "./strata-fees-bc-explained";
import multipleOffers from "./how-to-win-multiple-offer-situation-kelowna-real-estate";
import movingFromVancouver from "./moving-to-kelowna-from-vancouver";
import sellHomeFast from "./sell-home-fast-kelowna";
import homeValue from "./home-value-kelowna-free-valuation-guide";
import bestTimeToSell from "./best-time-to-sell-home-kelowna";
import homeStaging from "./home-staging-tips-kelowna";
import realtorFees from "./realtor-fees-bc-transparent-breakdown";
import renovationsValue from "./renovations-that-add-value-kelowna-home";
import basementReno from "./basement-renovation-cost-kelowna";
import marketReport from "./kelowna-real-estate-market-report";
import buyersOrSellers from "./kelowna-buyers-market-or-sellers-market-2025";
import priceHistory from "./kelowna-home-prices-history-10-year-look";

/* ─── Skeleton posts (listing-only, no content yet) ─── */
const skeletonPosts: BlogPost[] = [
  {
    slug: "kelowna-market-update-spring-2024",
    title: "Kelowna Real Estate Market Update: Spring 2024",
    excerpt:
      "An in-depth analysis of latest trends shaping the Kelowna real estate market this spring.",
    date: "April 10, 2024",
    category: "Market Trends",
  },
  {
    slug: "top-closing-costs-buyers",
    title: "The Top Closing Costs Buyers Should Prepare For",
    excerpt:
      "Learn about the often-overlooked closing costs and fees you need to budget for when buying a home in Kelowna.",
    date: "March 2, 2024",
    category: "Home Buying",
  },
  {
    slug: "sell-kelowna-home-highest-price",
    title: "How to Sell Your Kelowna Home for the Highest Price",
    excerpt:
      "Expert tips and proven strategies to maximize the sale price of your property.",
    date: "March 25, 2024",
    category: "Home Selling",
  },
  {
    slug: "best-neighborhoods-families",
    title: "Best Neighborhoods in Kelowna for Families",
    excerpt:
      "From Glenmore to Upper Mission, here are the top neighborhoods for families looking to settle in the Okanagan.",
    date: "February 18, 2024",
    category: "Neighborhoods",
  },
  {
    slug: "first-time-buyer-guide",
    title: "The Ultimate First-Time Buyer's Guide to Kelowna",
    excerpt:
      "Everything you need to know about buying your first home in Kelowna — from pre-approval to closing day.",
    date: "February 5, 2024",
    category: "Home Buying",
  },
  {
    slug: "preparing-home-for-sale",
    title: "How to Prepare Your Home for Sale in 2024",
    excerpt:
      "The steps that actually matter when getting your home ready for the market. Staging, pricing, and first impressions.",
    date: "January 20, 2024",
    category: "Home Selling",
  },
  {
    slug: "okanagan-lifestyle-guide",
    title: "The Okanagan Lifestyle: Why Kelowna Is Canada's Best-Kept Secret",
    excerpt:
      "Wine country, lakefront living, and year-round recreation. Discover what makes Kelowna one of Canada's most desirable places to live.",
    date: "January 8, 2024",
    category: "Lifestyle",
  },
  {
    slug: "mortgage-rate-forecast",
    title: "Mortgage Rates in 2024: What Buyers Should Expect",
    excerpt:
      "An overview of where mortgage rates are headed and what that means for your purchasing power in the Kelowna market.",
    date: "December 15, 2023",
    category: "Market Trends",
  },
  {
    slug: "spring-market-seller-tips",
    title: "5 Things Every Seller Should Do Before Spring",
    excerpt:
      "Spring is historically the busiest season for real estate in the Okanagan. Here is how to position your home to sell quickly and for top dollar.",
    date: "December 1, 2023",
    category: "Home Selling",
  },
];

/*
 * ════════════════════════════════════════════════════
 *  ALL POSTS — add new imports above and push here
 * ════════════════════════════════════════════════════
 */
const posts: BlogPost[] = [lowerMission, upperMission, glenmore, rutland, lakeCountry, westKelowna, blackMountain, downtownCondos, mckinleyBeach, southEastKelowna, firstTimeBuyer, bcIncentives, affordability, condoVsTownhouse, hiddenCosts, newVsResale, homeInspection, strataFees, multipleOffers, movingFromVancouver, sellHomeFast, homeValue, bestTimeToSell, homeStaging, realtorFees, renovationsValue, basementReno, marketReport, buyersOrSellers, priceHistory, ...skeletonPosts];

export default posts;
