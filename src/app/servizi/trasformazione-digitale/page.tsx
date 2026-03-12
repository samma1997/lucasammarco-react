import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import StepsSection from "@/components/StepsSection";
import ExpertiseCards from "@/components/ExpertiseCards";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Trasformazione Digitale & AI — Innovazione che genera valore",
  description:
    "Integriamo AI e automazione nei processi aziendali per aumentare efficienza e competitività. Consulenza strategica ed esecuzione concreta.",
};

const steps = [
  {
    number: "01",
    title: "Analisi Operativa",
    description:
      "Mappiamo i processi aziendali esistenti, identificando colli di bottiglia, inefficienze e opportunità di automazione. Assessment completo dello stato digitale attuale.",
  },
  {
    number: "02",
    title: "Mappatura Competenze",
    description:
      "Valutiamo le competenze digitali del team, definiamo i gap da colmare e progettiamo il piano di upskilling. La trasformazione funziona solo se le persone sono pronte.",
  },
  {
    number: "03",
    title: "Implementazione Agile",
    description:
      "Implementiamo le soluzioni AI e digitali in modo iterativo, con quick wins immediati e trasformazioni strutturali progressive. Nessuno shock organizzativo.",
  },
  {
    number: "04",
    title: "Performance Management",
    description:
      "Definiamo KPI, misuriamo i risultati e ottimizziamo continuamente. La trasformazione non è un progetto: è un processo continuo di miglioramento.",
  },
];

const expertiseCards = [
  {
    title: "Automazione AI & Workflow",
    href: "/expertise/automazione-ai",
    description: "Automatizza processi ripetitivi con AI e strumenti no-code/low-code.",
  },
  {
    title: "Data Strategy & Business Intelligence",
    href: "/expertise/data-strategy",
    description: "Trasforma i dati in decisioni strategiche con dashboard e analytics avanzati.",
  },
  {
    title: "Analisi e Posizionamento Strategico",
    href: "/expertise/analisi-strategica",
    description: "Positioning strategico per differenziarti dalla concorrenza digitale.",
  },
];

export default function TrasformazioneDigitalePage() {
  return (
    <main>
      <PageHero
        tag="Trasformazione Digitale & AI"
        title="Unire talenti, tecnologia e [processi per crescere]"
        subtitle="Innovazione che genera valore reale"
        description="Non solo consulenza: eseguiamo la trasformazione digitale insieme a te. AI, automazione e strategie data-driven per rendere la tua azienda più efficiente e competitiva."
        accentColor="var(--primary-light)"
      />
      <StepsSection steps={steps} title="Il percorso di trasformazione" />
      <ExpertiseCards cards={expertiseCards} title="Expertise che supportano questo servizio" />
      <CTASection />
      <Footer />
    </main>
  );
}
