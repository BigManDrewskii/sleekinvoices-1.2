import { LandingNavigation } from "@/components/LandingNavigation";
import {
  HeroSection,
  ProductDemoSection,
  FeaturesSection,
  CryptoPaymentsSection,
  ComparisonSection,
  PricingSection,
  FAQSection,
  CTASection,
  LandingFooter,
} from "@/components/landing";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNavigation />

      <HeroSection />
      <ProductDemoSection />
      <FeaturesSection />
      <CryptoPaymentsSection />
      <ComparisonSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <LandingFooter />
    </div>
  );
}
