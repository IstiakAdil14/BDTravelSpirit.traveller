import HeroSection from "@/components/landing/landingPageComponent/hero";
import ExploreBangladesh from "@/components/landing/landingPageComponent/explore-bangladesh";
import MostPopularDestinations from "@/components/landing/landingPageComponent/most-popular-destinations";
import OurTourLocationsForYou from "@/components/landing/landingPageComponent/our-tour-locations-for-you";
import HowItWorks from "@/components/landing/landingPageComponent/how-it-works";
import TravelWithBestTourOperators from "@/components/landing/landingPageComponent/travel-with-best-tour-operators";
import WhyPartner from "@/components/landing/landingPageComponent/features";
import Testimonials from "@/components/landing/landingPageComponent/testimonials";
import FinalCTA from "@/components/landing/landingPageComponent/cta";

export default function Home() {
  return (
    <main className="min-h-screen mt-16">
      <HeroSection />
      <ExploreBangladesh />
      <MostPopularDestinations />
      <OurTourLocationsForYou />
      <HowItWorks />
      <TravelWithBestTourOperators />
      <WhyPartner />
      <Testimonials />
      <FinalCTA />
    </main>
  );
}
