import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Script from "next/script";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import BackToTop from "@/components/ui/BackToTop";
import ScrollRestoration from "@/components/ui/ScrollRestoration";
import PageBlurEdges from "@/components/ui/PageBlurEdges";
import ChatWidget from "@/components/chat/ChatWidget";
import AuthProvider from "@/components/providers/AuthProvider";
import "./globals.css";

/* ─── Fonts ─────────────────────────────────────────── */

const cormorant = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

/* ─── Constants ─────────────────────────────────────── */

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://karsenkoltun.ca";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/* ─── Viewport ──────────────────────────────────────── */

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
};

/* ─── Metadata ──────────────────────────────────────── */

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Karsen Koltun | Kelowna Real Estate",
    template: "%s | Karsen Koltun",
  },
  description:
    "Premium real estate services in Kelowna, BC. Buy, sell, or get your home value with Karsen Koltun at Royal LePage.",
  keywords: [
    "Kelowna real estate",
    "Karsen Koltun",
    "buy home Kelowna",
    "sell home Kelowna",
    "Okanagan real estate",
    "luxury homes Kelowna",
    "Royal LePage Kelowna",
    "Kelowna realtor",
    "Okanagan homes for sale",
  ],
  authors: [{ name: "Karsen Koltun" }],
  creator: "Karsen Koltun",
  publisher: "Karsen Koltun",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: BASE_URL,
    siteName: "Karsen Koltun | Kelowna Real Estate",
    title: "Karsen Koltun | Kelowna Real Estate",
    description:
      "Premium real estate services in Kelowna, BC. Buy, sell, or get your home value with Karsen Koltun at Royal LePage.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Karsen Koltun — Kelowna Real Estate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Karsen Koltun | Kelowna Real Estate",
    description:
      "Premium real estate services in Kelowna, BC. Buy, sell, or get your home value with Karsen Koltun at Royal LePage.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

/* ─── JSON-LD Structured Data ───────────────────────── */

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Karsen Koltun",
  description:
    "Premium real estate services in Kelowna, BC. Buy, sell, or get your home value with Karsen Koltun at Royal LePage.",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  image: `${BASE_URL}/og-image.jpg`,
  telephone: "",
  email: "",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kelowna",
    addressRegion: "BC",
    addressCountry: "CA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 49.888,
    longitude: -119.496,
  },
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: 49.888,
      longitude: -119.496,
    },
    geoRadius: "50000",
  },
  memberOf: {
    "@type": "Organization",
    name: "Royal LePage",
  },
  sameAs: [],
};

/* ─── Root Layout ───────────────────────────────────── */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${cormorant.variable} ${inter.variable} antialiased`}>
        <AuthProvider>
          <ScrollRestoration />
          <ScrollProgress />
          <Navbar />
          <PageBlurEdges />
          <main>{children}</main>
          <Footer />
          <BackToTop />
          <ChatWidget />
        </AuthProvider>

        {/* Google Analytics — only loads when NEXT_PUBLIC_GA_ID is set */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
