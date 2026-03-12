import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Informativa sulla privacy e trattamento dei dati personali.",
};

export default function PrivacyPage() {
  return (
    <main>
      <PageHero
        tag="Privacy"
        title="Privacy Policy"
        accentColor="var(--cyan)"
      />
      <section className="py-16 px-6 md:px-10 section-divider">
        <div className="max-w-3xl mx-auto">
          <div
            className="flex flex-col gap-8 text-base leading-relaxed"
            style={{ color: "rgba(240,240,240,0.55)" }}
          >
            <div>
              <h2 className="text-white font-semibold mb-3" style={{ fontFamily: "'AlmarenaNeueDisplay', sans-serif" }}>
                Titolare del trattamento
              </h2>
              <p>Luca Sammarco — info@lucasammarco.com</p>
            </div>
            <div>
              <h2 className="text-white font-semibold mb-3" style={{ fontFamily: "'AlmarenaNeueDisplay', sans-serif" }}>
                Dati raccolti
              </h2>
              <p>
                Questo sito raccoglie i dati inviati volontariamente tramite il
                modulo di contatto (nome, email, azienda, messaggio). I dati
                sono utilizzati esclusivamente per rispondere alle richieste.
              </p>
            </div>
            <div>
              <h2 className="text-white font-semibold mb-3" style={{ fontFamily: "'AlmarenaNeueDisplay', sans-serif" }}>
                Cookie
              </h2>
              <p>
                Questo sito utilizza esclusivamente cookie tecnici necessari al
                funzionamento. Non vengono utilizzati cookie di profilazione o
                tracciamento di terze parti.
              </p>
            </div>
            <div>
              <h2 className="text-white font-semibold mb-3" style={{ fontFamily: "'AlmarenaNeueDisplay', sans-serif" }}>
                Diritti dell&apos;utente
              </h2>
              <p>
                Ai sensi del GDPR (Reg. UE 2016/679), hai diritto di accesso,
                rettifica, cancellazione e portabilità dei dati. Per esercitare
                i tuoi diritti contatta: info@lucasammarco.com
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
