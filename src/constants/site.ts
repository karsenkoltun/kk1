export const SITE_CONFIG = {
  name: "Karsen Koltun",
  title: "Karsen Koltun | Kelowna Real Estate",
  description:
    "Premium real estate services in Kelowna, BC. Buy, sell, or get your home value with Karsen Koltun.",
  url: "https://karsenkoltun.ca",
  location: "Kelowna, BC",
  brokerage: "Royal LePage",
};

interface NavItem {
  label: string;
  href: string;
  isButton?: boolean;
  children?: { label: string; href: string }[];
}

export const NAV_LINKS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Search Listings", href: "/search" },
  { label: "List Your Home", href: "/sell" },
  { label: "Mortgage Calculator", href: "/calculator" },
  {
    label: "About Karsen",
    href: "/about",
    children: [
      { label: "My Story", href: "/about" },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "Get in Touch", href: "/contact", isButton: true },
];

export const SECONDARY_LINKS = [
  { label: "Blog", href: "/blog" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];
