import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import LocationMarquee from "@/components/LocationMarquee";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorks from "@/components/HowItWorks";
import PricingSection from "@/components/PricingSection";
import WaitlistForm from "@/components/WaitlistForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <LocationMarquee />
        <FeaturesSection />
        <HowItWorks />
        <PricingSection />
        <WaitlistForm />
      </main>
      <Footer />
    </>
  );
}
