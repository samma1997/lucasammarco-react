import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import HorizontalScrollSection from "@/components/HorizontalScrollSection";
import ValuePropositions from "@/components/ValuePropositions";
import BusinessCases from "@/components/BusinessCases";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Luca Sammarco — Consulente Digitale, SEO & AI a Monza",
  description:
    "Trasformo idee in prodotti digitali che generano crescita. Strategia digitale, sviluppo software e innovazione AI per aziende che vogliono dominare il mercato.",
};

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <HorizontalScrollSection />
      <ValuePropositions />
      <BusinessCases />
      <CTASection />
      <Footer />
    </main>
  );
}
