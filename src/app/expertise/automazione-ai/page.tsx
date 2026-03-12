import type { Metadata } from "next";
import ExpertisePageTemplate from "@/components/ExpertisePage";

export const metadata: Metadata = {
  title: "Automazione AI & Workflow — Processi intelligenti",
  description:
    "Automazione processi aziendali con AI: n8n, Make, Zapier, Python e integrazione LLM. Riduci il lavoro manuale del 70%.",
};

export default function AutomazioneAiPage() {
  return (
    <ExpertisePageTemplate
      tag="Expertise"
      title="Automazione AI & [Workflow]"
      subtitle="Fai lavorare la tecnologia al posto tuo"
      description="L'automazione intelligente non sostituisce le persone: le libera dal lavoro ripetitivo per concentrarsi su quello che conta davvero."
      accentColor="var(--cyan)"
      phases={[
        {
          number: "01",
          title: "Process Mapping",
          description:
            "Mappatura dei processi aziendali, identificazione dei task ripetitivi, stima del tempo recuperabile e del ROI dell'automazione.",
        },
        {
          number: "02",
          title: "Tool Selection",
          description:
            "Selezione degli strumenti ottimali: n8n, Make, Zapier per workflow no-code; Python/FastAPI per automazioni custom; integrazione con OpenAI, Claude, Gemini.",
        },
        {
          number: "03",
          title: "Implementazione",
          description:
            "Costruzione dei workflow, testing, gestione errori e fallback. Integrazione con i sistemi esistenti (CRM, ERP, email, Slack, Google Workspace).",
        },
        {
          number: "04",
          title: "Training & Handoff",
          description:
            "Training del team sull'uso e manutenzione dei workflow. Documentazione completa. Monitoraggio post-lancio e ottimizzazione.",
        },
      ]}
      deliverables={[
        { text: "Mappa dei processi automatizzabili con ROI stimato" },
        { text: "Workflow automatizzati e testati" },
        { text: "Integrazione con sistemi esistenti" },
        { text: "Dashboard di monitoraggio automazioni" },
        { text: "Documentazione tecnica completa" },
        { text: "Sessioni di training per il team" },
      ]}
      relatedCases={[
        { title: "LegalFlow AI", href: "/progetti", service: "AI Automation" },
        { title: "WUP Coach Booking", href: "/progetti", service: "Workflow Automation" },
      ]}
    />
  );
}
