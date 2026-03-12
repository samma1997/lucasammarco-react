"use client";

import { useState } from "react";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function ContattiPage() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    azienda: "",
    messaggio: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate form submission
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <main>
      <PageHero
        tag="Contatti"
        title="Iniziamo a [parlare]"
        description="Hai un progetto in mente? Vuoi capire se posso aiutarti? Scrivimi — rispondo entro 24 ore."
        accentColor="var(--cyan)"
      />

      <section className="py-16 md:py-24 px-6 md:px-10 section-divider">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Form */}
            <div>
              {submitted ? (
                <div className="py-16 text-center">
                  <div
                    className="w-16 h-16 rounded-full border-2 flex items-center justify-center mx-auto mb-6"
                    style={{ borderColor: "var(--lime)" }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 13l4 4L19 7"
                        stroke="var(--lime)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3
                    className="text-2xl font-semibold mb-3"
                    style={{ fontFamily: "'AlmarenaNeueDisplay', sans-serif" }}
                  >
                    Messaggio inviato!
                  </h3>
                  <p style={{ color: "rgba(240,240,240,0.45)" }}>
                    Ti rispondo entro 24 ore. Grazie per avermi contattato.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="nome"
                        className="block text-xs tracking-widest uppercase mb-2"
                        style={{ color: "rgba(240,240,240,0.35)" }}
                      >
                        Nome *
                      </label>
                      <input
                        id="nome"
                        type="text"
                        required
                        value={formData.nome}
                        onChange={(e) =>
                          setFormData({ ...formData, nome: e.target.value })
                        }
                        className="w-full bg-transparent border-b border-[var(--border)] text-[var(--fg)] py-3 text-base focus:outline-none focus:border-[var(--cyan)] transition-colors"
                        placeholder="Il tuo nome"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs tracking-widest uppercase mb-2"
                        style={{ color: "rgba(240,240,240,0.35)" }}
                      >
                        Email *
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full bg-transparent border-b border-[var(--border)] text-[var(--fg)] py-3 text-base focus:outline-none focus:border-[var(--cyan)] transition-colors"
                        placeholder="tua@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="azienda"
                      className="block text-xs tracking-widest uppercase mb-2"
                      style={{ color: "rgba(240,240,240,0.35)" }}
                    >
                      Azienda
                    </label>
                    <input
                      id="azienda"
                      type="text"
                      value={formData.azienda}
                      onChange={(e) =>
                        setFormData({ ...formData, azienda: e.target.value })
                      }
                      className="w-full bg-transparent border-b border-[var(--border)] text-[var(--fg)] py-3 text-base focus:outline-none focus:border-[var(--cyan)] transition-colors"
                      placeholder="Nome azienda (opzionale)"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="messaggio"
                      className="block text-xs tracking-widest uppercase mb-2"
                      style={{ color: "rgba(240,240,240,0.35)" }}
                    >
                      Messaggio *
                    </label>
                    <textarea
                      id="messaggio"
                      required
                      rows={5}
                      value={formData.messaggio}
                      onChange={(e) =>
                        setFormData({ ...formData, messaggio: e.target.value })
                      }
                      className="w-full bg-transparent border-b border-[var(--border)] text-[var(--fg)] py-3 text-base focus:outline-none focus:border-[var(--cyan)] transition-colors resize-none"
                      placeholder="Raccontami del tuo progetto..."
                    />
                  </div>

                  <div className="flex items-center gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary disabled:opacity-50"
                    >
                      {loading ? "Invio in corso..." : "Invia messaggio"}
                      {!loading && (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path
                            d="M3 8h10M9 4l4 4-4 4"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-8">
              {/* Booking button */}
              <div
                className="rounded-3xl p-8 border border-[var(--border)]"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                <h3
                  className="text-xl font-semibold mb-3"
                  style={{ fontFamily: "'AlmarenaNeueDisplay', sans-serif" }}
                >
                  Prenota una call
                </h3>
                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{ color: "rgba(240,240,240,0.45)" }}
                >
                  Preferisci parlare direttamente? Prenota una call di 30 minuti
                  per esplorare come posso aiutarti.
                </p>
                <a
                  href="https://calendly.com/lucasammarco"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-24 h-24 rounded-full border-2 border-[var(--lime)] text-[var(--lime)] font-semibold text-sm text-center hover:bg-[var(--lime)] hover:text-black transition-all duration-300 leading-snug"
                >
                  Prenota
                  <br />
                  call
                </a>
              </div>

              {/* Contact info */}
              <div
                className="rounded-3xl p-8 border border-[var(--border)]"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                <h3
                  className="text-xl font-semibold mb-6"
                  style={{ fontFamily: "'AlmarenaNeueDisplay', sans-serif" }}
                >
                  Contatti diretti
                </h3>
                <div className="flex flex-col gap-5">
                  <a
                    href="mailto:info@lucasammarco.com"
                    className="flex items-center gap-4 group"
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-none border border-[var(--border)]"
                      style={{ transition: "all 0.3s ease" }}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M2 4l6 4 6-4M2 4h12v8H2V4z"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <div
                        className="text-xs tracking-widest uppercase mb-0.5"
                        style={{ color: "rgba(240,240,240,0.25)" }}
                      >
                        Email
                      </div>
                      <div
                        className="text-sm group-hover:text-[var(--cyan)] transition-colors"
                      >
                        info@lucasammarco.com
                      </div>
                    </div>
                  </a>

                  <a
                    href="https://linkedin.com/in/lucasammarco"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-none border border-[var(--border)]">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M2 5h2v7H2V5zM3 4a1 1 0 100-2 1 1 0 000 2zM6 5h1.9v1h.05C8.3 5.4 9.1 5 10 5c1.9 0 2 1.3 2 3v4h-2V8.5c0-.8 0-1.7-1-1.7S8 7.5 8 8.5V12H6V5z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <div>
                      <div
                        className="text-xs tracking-widest uppercase mb-0.5"
                        style={{ color: "rgba(240,240,240,0.25)" }}
                      >
                        LinkedIn
                      </div>
                      <div className="text-sm group-hover:text-[var(--cyan)] transition-colors">
                        linkedin.com/in/lucasammarco
                      </div>
                    </div>
                  </a>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-none border border-[var(--border)]">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M7 2a4 4 0 100 8A4 4 0 007 2zM2 12s1-2 5-2 5 2 5 2"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <div
                        className="text-xs tracking-widest uppercase mb-0.5"
                        style={{ color: "rgba(240,240,240,0.25)" }}
                      >
                        Sede
                      </div>
                      <div className="text-sm">Monza, Italia</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
