import type { Metadata } from "next";
import ExpertisePageTemplate from "@/components/ExpertisePage";

export const metadata: Metadata = {
  title: "Audit SEO & Ottimizzazione — Analisi tecnica completa",
  description:
    "Audit SEO tecnico approfondito con roadmap di ottimizzazione prioritizzata. Identifico e risolvo i problemi che frenano il tuo posizionamento.",
};

export default function AuditSeoPage() {
  return (
    <ExpertisePageTemplate
      tag="Expertise"
      title="Audit SEO & [Ottimizzazione]"
      subtitle="Analisi tecnica completa e roadmap prioritizzata"
      description="Un audit SEO non è un check-list. È una radiografia del sito che identifica cosa frena la crescita organica e come sbloccarla."
      accentColor="var(--cyan)"
      phases={[
        {
          number: "01",
          title: "Crawling & Technical Analysis",
          description:
            "Scansione completa del sito con Screaming Frog e strumenti proprietari. Identificazione di errori 4xx, redirect chains, duplicate content, problemi di indicizzazione.",
        },
        {
          number: "02",
          title: "Core Web Vitals & Performance",
          description:
            "Analisi approfondita di LCP, FID/INP, CLS. PageSpeed Insights, GTmetrix e analisi del codice sorgente per identificare tutti i colli di bottiglia.",
        },
        {
          number: "03",
          title: "On-Page & Content Audit",
          description:
            "Review di tag title, meta description, struttura heading, internal linking, schema markup. Analisi qualitativa dei contenuti e opportunità di ottimizzazione.",
        },
        {
          number: "04",
          title: "Backlink Profile Analysis",
          description:
            "Analisi del profilo backlink con Ahrefs/Majestic. Identificazione di link tossici, opportunità di link building, analisi competitor.",
        },
        {
          number: "05",
          title: "Roadmap & Prioritizzazione",
          description:
            "Consegna di una roadmap dettagliata con impatto stimato, effort e priorità. Quick wins vs interventi strutturali. Piano di implementazione realistica.",
        },
      ]}
      deliverables={[
        { text: "Report tecnico completo (50+ pagine) con tutti i problemi identificati" },
        { text: "Heatmap delle criticità per impatto SEO" },
        { text: "Roadmap di ottimizzazione con timeline e priorità" },
        { text: "Quick wins implementabili in 48 ore" },
        { text: "Baseline KPI per misurare i miglioramenti" },
        { text: "Call di presentazione e Q&A sui risultati" },
      ]}
      relatedCases={[
        { title: "Dubai Market Pulse", href: "/progetti", service: "SEO Strategy" },
        { title: "Costruttori Digitali", href: "/progetti", service: "SEO Tecnico" },
      ]}
    />
  );
}
