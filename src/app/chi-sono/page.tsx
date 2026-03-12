import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Chi Sono — Luca Sammarco, Consulente Digitale a Monza",
  description:
    "Luca Sammarco: web developer, SEO specialist e AI consultant. Il tuo partner strategico per la crescita digitale.",
};

const competenze = [
  "Next.js & React",
  "TypeScript",
  "SEO Tecnico & Strategico",
  "GEO & Local SEO",
  "AI & LLM Integration",
  "Python & Automazione",
  "Node.js & API Design",
  "Data Analytics",
  "Product Strategy",
  "UX/UI Design",
];

export default function ChiSonoPage() {
  return (
    <main>
      <PageHero
        tag="Chi Sono"
        title="Il tuo partner strategico e [l'esecutore] della tua accelerazione"
        description="Non sono un consulente che si limita a fare slide. Sono chi rimane finché il problema è risolto e il prodotto funziona."
        accentColor="var(--lime)"
      />

      {/* Bio section */}
      <section className="py-24 md:py-32 px-6 md:px-10 section-divider">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left — photo placeholder */}
            <div>
              <div
                className="aspect-[4/5] rounded-3xl overflow-hidden mb-6"
                style={{
                  background:
                    "linear-gradient(135deg, #045CB4 0%, #046BD2 40%, #58D0F5 100%)",
                }}
              >
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{
                    fontSize: "120px",
                    fontFamily: "'AlmarenaNeueDisplay', sans-serif",
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.1)",
                    letterSpacing: "-0.05em",
                  }}
                >
                  LS
                </div>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: "8+", label: "Anni di esperienza" },
                  { value: "50+", label: "Progetti completati" },
                  { value: "30+", label: "Clienti soddisfatti" },
                ].map((stat, i) => (
                  <div key={i} className="text-center p-4 rounded-2xl border border-[var(--border)]">
                    <div
                      className="text-2xl font-bold mb-1"
                      style={{ fontFamily: "'AlmarenaNeueDisplay', sans-serif", color: "var(--cyan)" }}
                    >
                      {stat.value}
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: "rgba(240,240,240,0.35)" }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — content */}
            <div>
              <h2
                className="heading-md mb-6"
                style={{ fontFamily: "'AlmarenaNeueDisplay', sans-serif" }}
              >
                Luca Sammarco
              </h2>
              <p
                className="text-base mb-4 font-medium"
                style={{ color: "var(--cyan)" }}
              >
                Web Developer · SEO Specialist · AI Consultant
              </p>

              <div
                className="flex flex-col gap-4 mb-10 text-base leading-relaxed"
                style={{ color: "rgba(240,240,240,0.55)" }}
              >
                <p>
                  Sono un consulente digitale con base a Monza. Lavoro con
                  aziende che vogliono crescere online attraverso strategie SEO,
                  prodotti software su misura e l&apos;integrazione intelligente
                  dell&apos;AI nei loro processi.
                </p>
                <p>
                  Ho iniziato come sviluppatore web, costruendo applicazioni
                  complesse con React, Next.js e Node.js. Nel tempo ho ampliato
                  la visione verso la strategia SEO, l&apos;ottimizzazione per i
                  motori di ricerca generativi (GEO) e l&apos;automazione AI.
                </p>
                <p>
                  Oggi offro un approccio integrato: non solo il sito bello, non
                  solo il ranking su Google, non solo l&apos;AI per sentirsi
                  innovativi — ma la combinazione strategica di tutto questo per
                  generare crescita reale e misurabile.
                </p>
              </div>

              {/* Skills */}
              <div className="mb-10">
                <div
                  className="text-xs tracking-widest uppercase mb-4"
                  style={{ color: "rgba(240,240,240,0.25)" }}
                >
                  Stack & Competenze
                </div>
                <div className="flex flex-wrap gap-2">
                  {competenze.map((skill, i) => (
                    <span key={i} className="tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contatti" className="btn-primary">
                  Parliamone
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <a
                  href="https://linkedin.com/in/lucasammarco"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                >
                  LinkedIn
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 12L12 2M12 2H6M12 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Siamo Doers */}
      <section className="py-24 md:py-32 px-6 md:px-10 section-divider">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <span className="tag mb-6 block w-fit">Filosofia</span>
              <h2
                className="heading-lg mb-6"
                style={{ fontFamily: "'AlmarenaNeueDisplay', sans-serif" }}
              >
                Siamo
                <br />
                <span style={{ color: "var(--lime)" }}>Doers</span>
              </h2>
              <p
                className="text-base leading-relaxed mb-6"
                style={{ color: "rgba(240,240,240,0.5)" }}
              >
                "Doers" non è un claim di marketing. È il DNA con cui affronto
                ogni progetto. Le idee restano idee finché qualcuno non le
                costruisce. Io le costruisco.
              </p>
              <p
                className="text-base leading-relaxed"
                style={{ color: "rgba(240,240,240,0.5)" }}
              >
                Niente riunioni infinite per pianificare altre riunioni. Niente
                presentazioni PowerPoint che sostituiscono l&apos;esecuzione. Si
                definisce, si costruisce, si misura, si migliora. In loop.
              </p>
            </div>

            <div>
              <span className="tag mb-6 block w-fit">Approccio</span>
              <h2
                className="heading-lg mb-6"
                style={{ fontFamily: "'AlmarenaNeueDisplay', sans-serif" }}
              >
                Product centric,
                <br />
                <span style={{ color: "var(--cyan)" }}>business driven</span>
              </h2>
              <p
                className="text-base leading-relaxed mb-6"
                style={{ color: "rgba(240,240,240,0.5)" }}
              >
                Ogni feature che costruiamo deve rispondere a una domanda:
                &quot;questo genera valore per il business?&quot; Se la risposta
                è no, non la costruiamo — indipendentemente da quanto sia
                tecnicamente interessante.
              </p>
              <p
                className="text-base leading-relaxed"
                style={{ color: "rgba(240,240,240,0.5)" }}
              >
                Il prodotto è al centro, ma le metriche di business sono la
                bussola. Traffico organico, conversion rate, CAC, LTV: queste
                sono le cose che contano davvero.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  );
}
