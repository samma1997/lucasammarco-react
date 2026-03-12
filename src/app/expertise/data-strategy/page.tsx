import type { Metadata } from "next";
import ExpertisePageTemplate from "@/components/ExpertisePage";

export const metadata: Metadata = {
  title: "Data Strategy & Business Intelligence — Decisioni basate sui dati",
  description:
    "Strategia dati, dashboard BI e analytics avanzati. Trasforma i tuoi dati in insights azionabili e decisioni più veloci.",
};

export default function DataStrategyPage() {
  return (
    <ExpertisePageTemplate
      tag="Expertise"
      title="Data Strategy & [Business Intelligence]"
      subtitle="I dati che hai già valgono più di quanto pensi"
      description="La maggior parte delle aziende ha dati preziosi dispersi in silos. Li colleghiamo, li puliamo e li trasformiamo in dashboard che guidano le decisioni."
      accentColor="var(--primary-light)"
      phases={[
        {
          number: "01",
          title: "Data Audit",
          description:
            "Mappatura di tutte le sorgenti dati esistenti: CRM, e-commerce, analytics, social, ERP. Identificazione dei gap e delle opportunità.",
        },
        {
          number: "02",
          title: "Data Architecture",
          description:
            "Progettazione dell'architettura dati: data warehouse, ETL pipeline, data modeling. Scelta degli strumenti (BigQuery, Supabase, dbt).",
        },
        {
          number: "03",
          title: "Dashboard & Visualization",
          description:
            "Costruzione di dashboard interattive con Metabase, Looker Studio o custom. KPI chiari, drill-down e alerting automatico.",
        },
        {
          number: "04",
          title: "Cultura del Dato",
          description:
            "Training del team per leggere e usare i dati nelle decisioni quotidiane. Data literacy e governance per mantenere la qualità nel tempo.",
        },
      ]}
      deliverables={[
        { text: "Data audit e mappatura sorgenti" },
        { text: "Architettura dati documentata" },
        { text: "Pipeline ETL automatizzata" },
        { text: "Dashboard executive e operative" },
        { text: "Alerting automatico su KPI critici" },
        { text: "Training per il team e documentazione" },
      ]}
      relatedCases={[
        { title: "Dubai Market Pulse", href: "/progetti", service: "Data Platform" },
      ]}
    />
  );
}
