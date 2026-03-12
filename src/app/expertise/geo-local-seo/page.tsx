import type { Metadata } from "next";
import ExpertisePageTemplate from "@/components/ExpertisePage";

export const metadata: Metadata = {
  title: "Strategia GEO & Local SEO — Domina le ricerche locali",
  description:
    "Ottimizzazione GEO e Local SEO per dominare le ricerche nella tua area. Google Business Profile, citazioni locali e contenuti geo-targeted.",
};

export default function GeoLocalSeoPage() {
  return (
    <ExpertisePageTemplate
      tag="Expertise"
      title="Strategia GEO & [Local SEO]"
      subtitle="Domina le ricerche nel tuo territorio"
      description="Il Local SEO è la via più rapida per portare clienti locali. Con le giuste ottimizzazioni, la tua attività compare quando le persone vicine cercano quello che offri."
      accentColor="var(--lime)"
      phases={[
        {
          number: "01",
          title: "Local Audit & Competitor Analysis",
          description:
            "Analisi del posizionamento locale attuale, audit Google Business Profile, analisi dei competitor nelle tue aree target.",
        },
        {
          number: "02",
          title: "Google Business Profile Optimization",
          description:
            "Ottimizzazione completa del profilo GBP: categorie, attributi, foto, post, Q&A e gestione delle recensioni.",
        },
        {
          number: "03",
          title: "Local Content & Citazioni",
          description:
            "Creazione di contenuti geo-targeted, ottimizzazione delle pagine location, costruzione di citazioni locali coerenti (NAP).",
        },
        {
          number: "04",
          title: "Schema Markup Locale",
          description:
            "Implementazione di schema markup LocalBusiness, apertura, servizi e aree di servizio per massimizzare la visibilità nei rich results.",
        },
      ]}
      deliverables={[
        { text: "Audit Local SEO completo con gap analysis" },
        { text: "Ottimizzazione Google Business Profile" },
        { text: "Strategia contenuti geo-targeted" },
        { text: "Costruzione citazioni locali (min. 30 directory)" },
        { text: "Schema markup LocalBusiness implementato" },
        { text: "Report mensile con ranking locali" },
      ]}
    />
  );
}
