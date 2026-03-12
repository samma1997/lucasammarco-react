import type { Metadata } from "next";
import ExpertisePageTemplate from "@/components/ExpertisePage";

export const metadata: Metadata = {
  title: "Sito Vetrina Corporate — Presenza digitale d'impatto",
  description:
    "Siti vetrina corporate con Next.js: design premium, performance Core Web Vitals 100/100, ottimizzazione SEO completa.",
};

export default function SitoVetrinaPage() {
  return (
    <ExpertisePageTemplate
      tag="Expertise"
      title="Sito Vetrina [Corporate]"
      subtitle="Prima impressione impeccabile, sempre"
      description="Il sito vetrina è il tuo biglietto da visita digitale. Deve trasmettere professionalità, caricare in meno di 1 secondo e convincere i visitatori a contattarti."
      accentColor="var(--primary-light)"
      phases={[
        {
          number: "01",
          title: "Brand & Content Strategy",
          description:
            "Definizione del brief creativo, architettura informativa e strategia dei contenuti. Chi sei, cosa fai, perché sceglierti.",
        },
        {
          number: "02",
          title: "Design Premium",
          description:
            "Design su misura con attenzione ai dettagli: tipografia, spaziatura, micro-interazioni. Responsive design mobile-first.",
        },
        {
          number: "03",
          title: "Sviluppo Next.js",
          description:
            "Sviluppo con Next.js 15 App Router, TypeScript e Tailwind CSS. Performance ottimizzata, animazioni GSAP, Core Web Vitals 100/100.",
        },
        {
          number: "04",
          title: "SEO & Launch",
          description:
            "Ottimizzazione SEO on-page, meta tags, structured data, sitemap. Deploy su Vercel con CDN globale.",
        },
      ]}
      deliverables={[
        { text: "Design Figma completo desktop e mobile" },
        { text: "Sito Next.js con CMS integrato (opzionale)" },
        { text: "Core Web Vitals 100/100" },
        { text: "SEO on-page ottimizzato" },
        { text: "Google Analytics 4 configurato" },
        { text: "Documentazione per modifiche autonome" },
      ]}
    />
  );
}
