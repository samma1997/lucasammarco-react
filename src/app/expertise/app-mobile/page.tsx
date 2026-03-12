import type { Metadata } from "next";
import ExpertisePageTemplate from "@/components/ExpertisePage";

export const metadata: Metadata = {
  title: "App Mobile Cross-Platform — iOS e Android con React Native",
  description:
    "Sviluppo app mobile cross-platform con React Native ed Expo. Un'unica codebase per iOS e Android, performance native.",
};

export default function AppMobilePage() {
  return (
    <ExpertisePageTemplate
      tag="Expertise"
      title="App Mobile [Cross-Platform]"
      subtitle="Raggiungi i tuoi utenti ovunque"
      description="Con React Native e Expo, costruiamo app mobile che sembrano native su iOS e Android, con un'unica codebase. Tempi dimezzati, qualità massima."
      accentColor="var(--lime)"
      phases={[
        {
          number: "01",
          title: "Mobile Strategy",
          description:
            "Definizione della strategia mobile: obiettivi, target users, feature set MVP, distribuzione (App Store, Google Play, enterprise).",
        },
        {
          number: "02",
          title: "UX/UI Mobile Design",
          description:
            "Design delle interfacce seguendo le HIG di Apple e Material Design di Google. Prototipi interattivi e user testing.",
        },
        {
          number: "03",
          title: "Sviluppo React Native",
          description:
            "Sviluppo con React Native + Expo. Integrazione con API backend, notifiche push, geolocalizzazione, camera, biometria e store nativi.",
        },
        {
          number: "04",
          title: "Pubblicazione & Maintenance",
          description:
            "Pubblicazione su App Store e Google Play. OTA updates con Expo Updates. Analytics, crash reporting e manutenzione continuativa.",
        },
      ]}
      deliverables={[
        { text: "App iOS e Android da un'unica codebase" },
        { text: "Design system mobile completo" },
        { text: "Integrazione backend e API" },
        { text: "Pubblicazione sugli store" },
        { text: "Analytics e crash reporting configurati" },
        { text: "Piano di manutenzione e update" },
      ]}
      relatedCases={[
        { title: "NutriTrack Pro", href: "/progetti", service: "App Mobile" },
      ]}
    />
  );
}
