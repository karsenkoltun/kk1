import Hero from "@/components/sections/Hero";
import StatsBar from "@/components/sections/StatsBar";
import AboutPreview from "@/components/sections/AboutPreview";
import FeaturedListings from "@/components/sections/FeaturedListings";
import Testimonials from "@/components/sections/Testimonials";
import BeyondRealEstate from "@/components/sections/BeyondRealEstate";
import SocialBar from "@/components/sections/SocialBar";
import Newsletter from "@/components/sections/Newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <AboutPreview />
      <FeaturedListings />
      <Testimonials />
      <BeyondRealEstate />
      <SocialBar />
      <Newsletter />
    </>
  );
}
