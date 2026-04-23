import {
  Navbar,
  HeroSection,
  ProblemSection,
  SolutionSection,
  FeatureSection,
  ProcessSection,
  TrustSection,
  CTASection,
  Footer,
} from '@/components/landing';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f7fbf6]">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <FeatureSection />
      <ProcessSection />
      <TrustSection />
      <CTASection />
      <Footer />
    </main>
  );
}
