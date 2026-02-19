import type { Metadata } from "next";
import MortgageCalculatorClient from "./MortgageCalculatorClient";

export const metadata: Metadata = {
  title: "Mortgage Calculator",
  description:
    "Calculate your BC mortgage payment with accurate Canadian semi-annual compounding, CMHC insurance, Property Transfer Tax, and real-time results. Built for Kelowna home buyers.",
  keywords: [
    "BC mortgage calculator",
    "Kelowna mortgage calculator",
    "Canadian mortgage payment calculator",
    "CMHC insurance calculator BC",
    "property transfer tax calculator BC",
    "first-time home buyer BC",
    "mortgage payment Kelowna",
    "accelerated bi-weekly mortgage savings",
  ],
  alternates: {
    canonical: "https://karsenkoltun.ca/calculator",
  },
};

export default function CalculatorPage() {
  return <MortgageCalculatorClient />;
}
