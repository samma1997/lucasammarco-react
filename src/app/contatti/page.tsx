'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/animations/FadeIn';
import { SITE_CONFIG } from '@/lib/constants';

export default function ContattiPage() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefono: '',
    messaggio: '',
    budget: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic here
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-[#f8fafc] to-white">
        <Container>
          <FadeIn className="max-w-2xl">
            <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
              <Link href="/" className="hover:text-[#045CB4] transition-colors">Home</Link>
              <span>/</span>
              <span className="text-slate-700">Contatti</span>
            </nav>
            <span className="inline-block rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-[#045CB4] mb-4">
              Contatti
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
              Parliamo del tuo progetto
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed">
              Hai un&apos;idea? Una sfida da risolvere? Vuoi migliorare la tua presenza online?
              Scrivimi e rispondo entro 24 ore.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <FadeIn>
                <div className="rounded-2xl bg-[#f8fafc] border border-slate-100 p-6">
                  <h2 className="font-bold text-slate-900 mb-6">Informazioni di Contatto</h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-100">
                        <svg className="h-5 w-5 text-[#045CB4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-500">Email</p>
                        <a href={`mailto:${SITE_CONFIG.email}`} className="font-medium text-[#045CB4] hover:underline">
                          {SITE_CONFIG.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-100">
                        <svg className="h-5 w-5 text-[#045CB4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-500">Telefono</p>
                        <a href={`tel:${SITE_CONFIG.phone}`} className="font-medium text-[#045CB4] hover:underline">
                          {SITE_CONFIG.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-100">
                        <svg className="h-5 w-5 text-[#045CB4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-500">Sede</p>
                        <p className="font-medium text-slate-900">Monza (MB), Italia</p>
                        <p className="text-sm text-slate-500">Lavoro con clienti in tutta Italia</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-100">
                        <svg className="h-5 w-5 text-[#045CB4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-500">Orari</p>
                        <p className="font-medium text-slate-900">Lun–Ven: 9:00–18:00</p>
                        <p className="text-sm text-slate-500">Risposta entro 24h</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social */}
                <div className="rounded-2xl bg-[#0f172a] p-6 text-white mt-6">
                  <h3 className="font-bold mb-4">Seguimi sui social</h3>
                  <div className="flex gap-3">
                    <a
                      href={SITE_CONFIG.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2 text-sm font-medium text-slate-300 hover:bg-[#045CB4] hover:text-white transition-all"
                    >
                      LinkedIn
                    </a>
                    <a
                      href={SITE_CONFIG.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2 text-sm font-medium text-slate-300 hover:bg-[#045CB4] hover:text-white transition-all"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <FadeIn direction="left">
                {submitted ? (
                  <div className="rounded-2xl bg-green-50 border border-green-200 p-8 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mx-auto mb-4">
                      <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">Messaggio inviato!</h2>
                    <p className="text-slate-600">
                      Grazie per avermi contattato. Ti risponder&ograve; entro 24 ore.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="nome" className="block text-sm font-medium text-slate-700 mb-1.5">
                          Nome e Cognome *
                        </label>
                        <input
                          id="nome"
                          type="text"
                          required
                          value={formData.nome}
                          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-[#045CB4] focus:outline-none focus:ring-2 focus:ring-[#045CB4]/20 transition"
                          placeholder="Mario Rossi"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
                          Email *
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-[#045CB4] focus:outline-none focus:ring-2 focus:ring-[#045CB4]/20 transition"
                          placeholder="mario@azienda.it"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="telefono" className="block text-sm font-medium text-slate-700 mb-1.5">
                          Telefono
                        </label>
                        <input
                          id="telefono"
                          type="tel"
                          value={formData.telefono}
                          onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-[#045CB4] focus:outline-none focus:ring-2 focus:ring-[#045CB4]/20 transition"
                          placeholder="+39 333 000 0000"
                        />
                      </div>
                      <div>
                        <label htmlFor="budget" className="block text-sm font-medium text-slate-700 mb-1.5">
                          Budget indicativo
                        </label>
                        <select
                          id="budget"
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 focus:border-[#045CB4] focus:outline-none focus:ring-2 focus:ring-[#045CB4]/20 transition bg-white"
                        >
                          <option value="">Seleziona budget</option>
                          <option value="<1000">Meno di 1.000€</option>
                          <option value="1000-3000">1.000€ – 3.000€</option>
                          <option value="3000-7000">3.000€ – 7.000€</option>
                          <option value="7000-15000">7.000€ – 15.000€</option>
                          <option value=">15000">Oltre 15.000€</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="messaggio" className="block text-sm font-medium text-slate-700 mb-1.5">
                        Descrivi il tuo progetto *
                      </label>
                      <textarea
                        id="messaggio"
                        required
                        rows={5}
                        value={formData.messaggio}
                        onChange={(e) => setFormData({ ...formData, messaggio: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-[#045CB4] focus:outline-none focus:ring-2 focus:ring-[#045CB4]/20 transition resize-none"
                        placeholder="Raccontami del tuo progetto: cosa vorresti realizzare, quali problemi vuoi risolvere, eventuali riferimenti..."
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full justify-center">
                      Invia Messaggio
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </Button>
                    <p className="text-center text-sm text-slate-500">
                      Rispondo entro 24 ore. Nessun impegno, nessuna pressione.
                    </p>
                  </form>
                )}
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
