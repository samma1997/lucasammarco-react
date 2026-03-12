import type { Metadata } from "next";
import ExpertisePageTemplate from "@/components/ExpertisePage";

export const metadata: Metadata = {
  title: "E-Commerce Avanzato — Vendite online che scalano",
  description:
    "Soluzioni e-commerce performanti con Next.js Commerce, Shopify headless o WooCommerce. Ottimizzate per conversioni e SEO.",
};

export default function EcommercePage() {
  return (
    <ExpertisePageTemplate
      tag="Expertise"
      title="E-Commerce [Avanzato]"
      subtitle="Vendite online performanti e scalabili"
      description="L'e-commerce del futuro è headless, veloce e SEO-first. Costruiamo soluzioni che convertono e scalano, indipendentemente dal volume di traffico."
      accentColor="var(--lime)"
      phases={[
        {
          number: "01",
          title: "E-Commerce Audit",
          description:
            "Analisi delle performance attuali: conversion rate, funnel di acquisto, abbandono carrello, UX e SEO tecnico. Identificazione delle opportunità quick win.",
        },
        {
          number: "02",
          title: "Platform & Stack Selection",
          description:
            "Scelta della piattaforma ottimale (Next.js Commerce, Shopify Headless, WooCommerce) in base a volume, complessità e budget.",
        },
        {
          number: "03",
          title: "CRO & UX Optimization",
          description:
            "Ottimizzazione del funnel di acquisto, product pages, checkout e mobile experience. A/B testing per massimizzare il conversion rate.",
        },
        {
          number: "04",
          title: "SEO E-Commerce",
          description:
            "Ottimizzazione SEO specifica per e-commerce: product schema, category pages, faceted navigation, canonical URLs e performance.",
        },
      ]}
      deliverables={[
        { text: "E-Commerce audit completo" },
        { text: "Analisi e-commerce con benchmark di settore" },
        { text: "Implementazione piattaforma ottimizzata" },
        { text: "Dashboard analytics e tracking e-commerce" },
        { text: "Strategia SEO per categorie e prodotti" },
        { text: "Report CRO con A/B test results" },
      ]}
    />
  );
}
