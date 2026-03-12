import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import StepsSection from "@/components/StepsSection";
import ExpertiseCards from "@/components/ExpertiseCards";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Sviluppo Software Custom — Dalla visione al prodotto",
  description:
    "Sviluppo software su misura: web app, piattaforme SaaS, e-commerce avanzati. Architettura solida, codice pulito, deploy veloce.",
};

const steps = [
  {
    number: "01",
    title: "Discovery & Architettura",
    description:
      "Definiamo insieme requisiti, user stories e architettura tecnica. Scegliamo lo stack tecnologico ottimale per scalabilità, performance e maintainability a lungo termine.",
  },
  {
    number: "02",
    title: "Design & Prototipazione",
    description:
      "Progettiamo l'UX/UI con wireframe e prototipi interattivi. Validiamo il design con utenti reali prima di scrivere una sola riga di codice produzione.",
  },
  {
    number: "03",
    title: "Sviluppo Agile",
    description:
      "Sviluppiamo in sprint bisettimanali con deliverable tangibili ad ogni ciclo. Codice testato, documentato e revisionato. Nessuna sorpresa, massima trasparenza.",
  },
  {
    number: "04",
    title: "Deploy & Supporto",
    description:
      "Deploy su infrastruttura cloud ottimizzata, monitoring attivo e supporto continuativo. Il prodotto cresce con te: feature aggiuntive, ottimizzazioni, manutenzione.",
  },
];

const expertiseCards = [
  {
    title: "Web App & Piattaforme SaaS",
    href: "/expertise/web-app-saas",
    description: "Applicazioni web scalabili e piattaforme SaaS di nuova generazione.",
  },
  {
    title: "E-Commerce Avanzato",
    href: "/expertise/ecommerce",
    description: "Soluzioni e-commerce performanti che convertono e scalano.",
  },
  {
    title: "App Mobile Cross-Platform",
    href: "/expertise/app-mobile",
    description: "App mobile iOS e Android con un'unica codebase ottimizzata.",
  },
];

export default function SoftwarePage() {
  return (
    <main>
      <PageHero
        tag="Sviluppo Software Custom"
        title="Dalla visione al prodotto, [senza compromessi]"
        subtitle="Trasformare le esigenze in soluzioni digitali performanti"
        description="Costruiamo prodotti digitali su misura che risolvono problemi reali. Nessuna soluzione preconfezionata: ogni progetto è unico, ogni architettura è pensata per durare."
        accentColor="var(--lime)"
      />
      <StepsSection steps={steps} title="Dal brief al lancio" />
      <ExpertiseCards cards={expertiseCards} title="Expertise che supportano questo servizio" />
      <CTASection />
      <Footer />
    </main>
  );
}
