import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Informazioni Legali",
  description: "Informazioni legali, P.IVA e dettagli societari di Luca Sammarco.",
};

export default function InformazioniLegaliPage() {
  return (
    <main>
      <PageHero
        tag="Legale"
        title="Informazioni Legali"
        accentColor="var(--cyan)"
      />
      <section className="py-16 px-6 md:px-10 section-divider">
        <div className="max-w-3xl mx-auto">
          <div
            className="flex flex-col gap-8 text-base leading-relaxed"
            style={{ color: "rgba(240,240,240,0.55)" }}
          >
            <div>
              <h2 className="text-white font-semibold mb-2" style={{ fontFamily: "Syne, sans-serif" }}>
                Titolare del sito
              </h2>
              <p>Luca Sammarco</p>
              <p>Monza (MB), Italia</p>
              <p>Email: info@lucasammarco.com</p>
            </div>
            <div>
              <h2 className="text-white font-semibold mb-2" style={{ fontFamily: "Syne, sans-serif" }}>
                Partita IVA
              </h2>
              <p>IT — (in aggiornamento)</p>
            </div>
            <div>
              <h2 className="text-white font-semibold mb-2" style={{ fontFamily: "Syne, sans-serif" }}>
                Responsabilità
              </h2>
              <p>
                Le informazioni contenute in questo sito sono fornite a titolo
                informativo. Luca Sammarco non si assume responsabilità per
                l&apos;uso delle informazioni presenti.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
