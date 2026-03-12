import type { Metadata } from "next";
import ExpertisePageTemplate from "@/components/ExpertisePage";

export const metadata: Metadata = {
  title: "Web App & Piattaforme SaaS — Applicazioni scalabili",
  description:
    "Sviluppo di web application e piattaforme SaaS con Next.js, React, TypeScript. Architetture scalabili, performance ottimizzata.",
};

export default function WebAppSaasPage() {
  return (
    <ExpertisePageTemplate
      tag="Expertise"
      title="Web App & [Piattaforme SaaS]"
      subtitle="Applicazioni che scalano con il business"
      description="Costruiamo web application e piattaforme SaaS con le tecnologie più moderne. Architetture solide, performance eccellenti, UX che converte."
      accentColor="var(--cyan)"
      phases={[
        {
          number: "01",
          title: "Product Definition",
          description:
            "Definizione del product scope, user stories, personas e MVP. Workshop di product discovery per allineare vision tecnica e obiettivi di business.",
        },
        {
          number: "02",
          title: "Architecture Design",
          description:
            "Progettazione dell'architettura: database schema, API design, infrastruttura cloud, security model e piano di scalabilità.",
        },
        {
          number: "03",
          title: "UX/UI Design System",
          description:
            "Wireframe, prototipi Figma e design system completo. User testing e iterazioni fino alla validazione del design.",
        },
        {
          number: "04",
          title: "Sviluppo & Testing",
          description:
            "Sviluppo agile con sprint bisettimanali. TDD, code review, integration testing. CI/CD pipeline configurata dall'inizio.",
        },
        {
          number: "05",
          title: "Launch & Scale",
          description:
            "Deploy su infrastruttura Vercel/AWS ottimizzata. Monitoring, alerting, analytics. Roadmap post-launch per feature aggiuntive.",
        },
      ]}
      deliverables={[
        { text: "Product Requirements Document (PRD)" },
        { text: "Architettura tecnica documentata" },
        { text: "Design system Figma completo" },
        { text: "Codebase con test coverage > 80%" },
        { text: "Documentazione API" },
        { text: "Infrastruttura cloud configurata e monitorata" },
        { text: "Piano di scalabilità" },
      ]}
      relatedCases={[
        { title: "Dubai Market Pulse", href: "/progetti", service: "SaaS Platform" },
        { title: "WUP Coach Booking", href: "/progetti", service: "Web App" },
      ]}
    />
  );
}
