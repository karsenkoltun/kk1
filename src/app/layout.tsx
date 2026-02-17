import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

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

export const metadata: Metadata = {
  title: {
    default: "Karsen Koltun | Kelowna Real Estate",
    template: "%s | Karsen Koltun",
  },
  description:
    "Premium real estate services in Kelowna, BC. Buy, sell, or get your home value with Karsen Koltun.",
  keywords: [
    "Kelowna real estate",
    "Karsen Koltun",
    "buy home Kelowna",
    "sell home Kelowna",
    "Okanagan real estate",
    "luxury homes Kelowna",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${inter.variable} antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
