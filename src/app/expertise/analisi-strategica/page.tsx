import type { Metadata } from "next";
import ExpertisePageTemplate from "@/components/ExpertisePage";

export const metadata: Metadata = {
  title: "Analisi e Posizionamento Strategico — Differenziati dalla concorrenza",
  description:
    "Analisi di mercato, competitor analysis e positioning strategico per differenziare il tuo brand e dominare la tua nicchia.",
};

export default function AnalisiStrategicaPage() {
  return (
    <ExpertisePageTemplate
      tag="Expertise"
      title="Analisi e [Posizionamento Strategico]"
      subtitle="Differenziati o scompari"
      description="In un mercato affollato, il posizionamento strategico è la differenza tra essere scelti e essere ignorati. Costruiamo insieme la tua USP basata su dati reali."
      accentColor="var(--primary-light)"
      phases={[
        {
          number: "01",
          title: "Market Research",
          description:
            "Analisi del mercato di riferimento, trend, dimensionamento del TAM/SAM/SOM e identificazione delle opportunità non presidiate.",
        },
        {
          number: "02",
          title: "Competitor Analysis",
          description:
            "Deep dive sui competitor: strategie digitali, contenuti, backlink, offerte, prezzi, recensioni. Mappa dei punti di forza e debolezza.",
        },
        {
          number: "03",
          title: "Positioning Workshop",
          description:
            "Workshop strategico per definire il posizionamento unico, la value proposition e i messaggi chiave differenzianti.",
        },
        {
          number: "04",
          title: "Strategia Go-to-Market",
          description:
            "Piano operativo per comunicare il posizionamento attraverso tutti i canali digitali con messaggi coerenti e misurabili.",
        },
      ]}
      deliverables={[
        { text: "Report di analisi mercato e competitor" },
        { text: "Mappa di posizionamento competitivo" },
        { text: "Documento positioning e value proposition" },
        { text: "Messaggi chiave per ogni canale" },
        { text: "Piano go-to-market con KPI" },
        { text: "Presentazione esecutiva per il team" },
      ]}
    />
  );
}
