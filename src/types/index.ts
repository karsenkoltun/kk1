export interface NavLink {
  label: string;
  href: string;
  isButton?: boolean;
  children?: NavLink[];
}

export interface Listing {
  id: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  image: string;
  slug: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image?: string;
  category: string;
}
