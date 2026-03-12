import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Progetti — Case study e lavori recenti",
  description:
    "Portfolio progetti: Dubai Market Pulse, WUP Coach Booking, SammaPix e altri prodotti digitali realizzati con Next.js, React e strategie SEO.",
};

const projects = [
  {
    title: "Dubai Market Pulse",
    description:
      "Piattaforma SaaS per l'analisi del mercato immobiliare di Dubai. Dashboard in tempo reale, integrazione dati DLD, algoritmi predittivi e report automatizzati per investitori e agenzie.",
    service: "Sviluppo Software & Data Strategy",
    tags: ["Next.js", "Python", "PostgreSQL", "API REST"],
    gradient: "linear-gradient(135deg, #045CB4 0%, #046BD2 50%, #58D0F5 100%)",
    year: "2024",
  },
  {
    title: "WUP Coach Booking",
    description:
      "Sistema completo di prenotazione sessioni per centri sportivi e coach. Gestione calendario, pagamenti integrati, notifiche automatiche e dashboard analytics per i gestori.",
    service: "Web App & Automazione",
    tags: ["React", "Node.js", "Stripe", "Prisma"],
    gradient: "linear-gradient(135deg, #0A0A0A 0%, #1a1a2e 50%, #045CB4 100%)",
    year: "2024",
  },
  {
    title: "SammaPix",
    description:
      "Piattaforma di fotografia e contenuti visivi. Portfolio dinamico, sistema di licensing immagini, pagamenti e download protetti. Brand identity completamente custom.",
    service: "Brand Development & Product Design",
    tags: ["Next.js", "Cloudinary", "Stripe", "TypeScript"],
    gradient: "linear-gradient(135deg, #EAFD9C 0%, #a8c44a 50%, #2d4a00 100%)",
    year: "2023",
  },
  {
    title: "Costruttori Digitali",
    description:
      "Portale informativo per un'agenzia di costruzioni. SEO tecnico avanzato, content strategy e ottimizzazione per ricerche locali. Risultato: +340% traffico organico in 6 mesi.",
    service: "SEO & GEO as a Service",
    tags: ["WordPress", "SEO Tecnico", "Local SEO", "Analytics"],
    gradient: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
    year: "2023",
  },
  {
    title: "LegalFlow AI",
    description:
      "Piattaforma AI per la gestione documentale di uno studio legale. Classificazione automatica documenti, riassunti AI, ricerca semantica e workflow personalizzati.",
    service: "Trasformazione Digitale & AI",
    tags: ["Python", "OpenAI", "FastAPI", "React"],
    gradient: "linear-gradient(135deg, #0f0f23 0%, #1a0f3a 50%, #2d1b69 100%)",
    year: "2024",
  },
  {
    title: "NutriTrack Pro",
    description:
      "App mobile per il tracking nutrizionale con integrazione AI. Riconoscimento alimenti da foto, piani alimentari personalizzati e sync con wearable devices.",
    service: "App Mobile Cross-Platform",
    tags: ["React Native", "TensorFlow", "Node.js", "MongoDB"],
    gradient: "linear-gradient(135deg, #064e3b 0%, #065f46 50%, #10b981 100%)",
    year: "2023",
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  return (
    <div className="group">
      {/* Image */}
      <div
        className="aspect-[16/10] rounded-2xl mb-6 overflow-hidden relative"
        style={{ background: project.gradient }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center opacity-10"
          style={{
            fontSize: "100px",
            fontFamily: "'AlmarenaNeueDisplay', sans-serif",
            fontWeight: 700,
            letterSpacing: "-0.05em",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>
        <div
          className="absolute bottom-4 left-4 right-4 flex justify-between items-end"
        >
          <span className="tag bg-[rgba(10,10,10,0.6)] backdrop-blur-sm">
            {project.service}
          </span>
          <span
            className="text-xs px-3 py-1 rounded-full"
            style={{
              background: "rgba(10,10,10,0.6)",
              backdropFilter: "blur(8px)",
              color: "rgba(240,240,240,0.5)",
            }}
          >
            {project.year}
          </span>
        </div>
      </div>

      {/* Content */}
      <h3
        className="text-xl font-semibold mb-3 group-hover:text-[var(--cyan)] transition-colors"
        style={{ fontFamily: "'AlmarenaNeueDisplay', sans-serif" }}
      >
        {project.title}
      </h3>
      <p
        className="text-sm leading-relaxed mb-4"
        style={{ color: "rgba(240,240,240,0.45)" }}
      >
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag, i) => (
          <span key={i} className="tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ProgettiPage() {
  return (
    <main>
      <PageHero
        tag="Progetti"
        title="[Risultati concreti], non solo promesse"
        description="Una selezione dei progetti più significativi. Ogni prodotto è una storia di problema risolto e crescita generata."
        accentColor="var(--lime)"
      />

      <section className="py-24 px-6 md:px-10 section-divider">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-8">
            {projects.map((project, i) => (
              <ProjectCard key={i} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  );
}
