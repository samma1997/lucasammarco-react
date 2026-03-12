import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Approccio — Un'offerta utile, un'organizzazione viva",
  description:
    "Il mio approccio al lavoro: visione innovativa, esecuzione esigente, organizzazione efficiente e attenzione al fattore umano.",
};

const pillars = [
  {
    number: "01",
    title: "Visione Innovativa",
    description:
      "Ogni progetto inizia con una domanda: qual è il vero problema da risolvere? Non mi limito a eseguire richieste — esploro, propongo, sfido le assunzioni. L'innovazione nasce quando si osa guardare oltre l'ovvio.",
    color: "var(--cyan)",
  },
  {
    number: "02",
    title: "Esecuzione Esigente",
    description:
      "La qualità non è negoziabile. Codice pulito, design curato, deliverable puntuali. Sono esigente con me stesso tanto quanto sono esigente con i risultati che porto ai clienti. L'eccellenza operativa è il mio standard.",
    color: "var(--lime)",
  },
  {
    number: "03",
    title: "Organizzazione Efficiente",
    description:
      "Processi chiari, comunicazione diretta, nessun overhead inutile. Lavoro con metodi agili adattati alla realtà di ogni progetto. Ogni sprint ha un obiettivo, ogni milestone è misurabile.",
    color: "var(--primary-light)",
  },
  {
    number: "04",
    title: "Fattore Umano",
    description:
      "La tecnologia è un mezzo, non un fine. Lavoro con persone, per persone. Ascolto, capisco il contesto, costruisco relazioni di fiducia. Il successo del tuo progetto è il mio successo.",
    color: "var(--cyan)",
  },
];

const concepts = [
  {
    title: "Convinzione",
    description:
      "Prendo solo progetti in cui credo. Se non sono convinto che posso portarti valore reale, te lo dico subito. Questa selezione mi permette di essere al 100% su ogni progetto che accetto.",
  },
  {
    title: "Bisogno",
    description:
      "Parto sempre dal bisogno reale, non dalla soluzione precostituita. Ascolto, faccio le domande scomode, scavo fino a trovare il vero problema. Solo allora definisco la strategia.",
  },
  {
    title: "Trasformazione",
    description:
      "L'obiettivo non è consegnare un prodotto: è trasformare la tua situazione. Misuro il successo dai risultati che generi, non dalle ore fatturate o dai deliverable consegnati.",
  },
];

export default function ApproccioPage() {
  return (
    <main>
      <PageHero
        tag="Approccio"
        title="[Un'offerta utile], un'organizzazione viva, una crescita sostenibile"
        description="Il modo in cui lavoro non è un processo standardizzato. È una filosofia costruita su anni di esperienza nel fare — non nel prometterlo."
        accentColor="var(--cyan)"
      />

      {/* Pillars */}
      <section className="py-24 md:py-32 px-6 md:px-10 section-divider">
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-16">
            <span className="tag mb-4 block w-fit">I 4 Pilastri</span>
            <h2 className="heading-lg" style={{ fontFamily: "'AlmarenaNeueDisplay', sans-serif" }}>
              Come opero
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--border)]">
            {pillars.map((pillar, i) => (
              <div
                key={i}
                className="bg-[var(--bg)] p-10 md:p-12 group hover:bg-white/[0.02] transition-colors"
              >
                <div
                  className="text-xs tracking-widest uppercase mb-6"
                  style={{ color: pillar.color }}
                >
                  {pillar.number}
                </div>
                <h3
                  className="text-2xl md:text-3xl font-semibold mb-5"
                  style={{ fontFamily: "'AlmarenaNeueDisplay', sans-serif" }}
                >
                  {pillar.title}
                </h3>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "rgba(240,240,240,0.45)" }}
                >
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Concepts */}
      <section className="py-24 md:py-32 px-6 md:px-10 section-divider">
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-16">
            <span className="tag mb-4 block w-fit">Filosofia</span>
            <h2 className="heading-lg" style={{ fontFamily: "'AlmarenaNeueDisplay', sans-serif" }}>
              Tre principi
              <br />
              <span style={{ color: "var(--lime)" }}>irrinunciabili</span>
            </h2>
          </div>

          <div className="flex flex-col">
            {concepts.map((concept, i) => (
              <div
                key={i}
                className="flex flex-col md:flex-row gap-8 md:gap-16 py-12 border-b border-[var(--border)] group"
              >
                <div
                  className="flex-none md:w-48 text-5xl font-bold"
                  style={{
                    fontFamily: "'AlmarenaNeueDisplay', sans-serif",
                    color: "rgba(255,255,255,0.06)",
                    transition: "color 0.3s",
                  }}
                >
                  0{i + 1}
                </div>
                <div className="flex-1">
                  <h3
                    className="text-xl md:text-2xl font-semibold mb-4"
                    style={{ fontFamily: "'AlmarenaNeueDisplay', sans-serif" }}
                  >
                    {concept.title}
                  </h3>
                  <p
                    className="text-base leading-relaxed max-w-2xl"
                    style={{ color: "rgba(240,240,240,0.45)" }}
                  >
                    {concept.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  );
}
