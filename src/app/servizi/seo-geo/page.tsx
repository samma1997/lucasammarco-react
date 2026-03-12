import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import StepsSection from "@/components/StepsSection";
import ExpertiseCards from "@/components/ExpertiseCards";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "SEO & GEO as a Service — Visibilità che converte",
  description:
    "Domina le ricerche organiche con strategie SEO data-driven e ottimizzazione GEO. Audit, strategia, contenuti e monitoraggio continuo.",
};

const steps = [
  {
    number: "01",
    title: "Audit & Analisi",
    description:
      "Analizziamo il tuo sito, i competitor e il mercato per identificare le opportunità di crescita organica. Audit tecnico completo, analisi backlink e mappatura del posizionamento attuale.",
  },
  {
    number: "02",
    title: "Strategia & Keyword",
    description:
      "Definiamo la strategia SEO basata su dati reali, keyword research avanzata e analisi dell'intento di ricerca. Ogni keyword è scelta per massimizzare il ROI.",
  },
  {
    number: "03",
    title: "Ottimizzazione & Contenuti",
    description:
      "Implementiamo le ottimizzazioni tecniche, creiamo contenuti SEO-driven e costruiamo autorità attraverso link building qualitativo e ottimizzazione on-page.",
  },
  {
    number: "04",
    title: "Monitoraggio & Crescita",
    description:
      "Monitoriamo i risultati con dashboard in tempo reale, ottimizziamo continuamente e scaliamo il traffico organico mese dopo mese.",
  },
];

const expertiseCards = [
  {
    title: "Audit SEO & Ottimizzazione",
    href: "/expertise/audit-seo",
    description: "Analisi tecnica completa e roadmap di ottimizzazione prioritizzata.",
  },
  {
    title: "Strategia GEO & Local SEO",
    href: "/expertise/geo-local-seo",
    description: "Domina le ricerche locali e conquista il tuo territorio.",
  },
  {
    title: "Analisi e Posizionamento Strategico",
    href: "/expertise/analisi-strategica",
    description: "Positioning strategico per differenziarti dalla concorrenza.",
  },
];

export default function SeoGeoPage() {
  return (
    <main>
      <PageHero
        tag="SEO & GEO as a Service"
        title="Dominare le ricerche, [conquistare il mercato]"
        subtitle="Allineare visibilità, mercato e conversioni"
        description="Costruiamo la tua presenza organica su basi solide. Non trucchi temporanei, non black hat: strategie SEO durature che portano traffico qualificato e clienti reali."
        accentColor="var(--cyan)"
      />
      <StepsSection steps={steps} title="Come ti porto in cima" />
      <ExpertiseCards cards={expertiseCards} title="Expertise che supportano questo servizio" />
      <CTASection />
      <Footer />
    </main>
  );
}
