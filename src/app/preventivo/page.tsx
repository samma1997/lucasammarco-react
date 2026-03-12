'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/animations/FadeIn';

const steps = ['Tipo Progetto', 'Budget', 'Timeline', 'Descrizione', 'Contatti'];

const projectTypes = [
  { id: 'sito-web', label: 'Sito Web', icon: '🌐', desc: 'Vetrina, portfolio, landing page' },
  { id: 'ecommerce', label: 'E-Commerce', icon: '🛒', desc: 'Negozio online, Shopify, WooCommerce' },
  { id: 'web-app', label: 'Web App / SaaS', icon: '⚡', desc: 'Applicazione web, piattaforma SaaS' },
  { id: 'software', label: 'Software Custom', icon: '💻', desc: 'CRM, gestionale, dashboard' },
  { id: 'seo', label: 'SEO & GEO', icon: '🎯', desc: 'Ottimizzazione motori di ricerca' },
  { id: 'ai', label: 'Soluzioni AI', icon: '🤖', desc: 'Chatbot, automazione, AI integration' },
];

const budgets = [
  { id: '<2000', label: 'Meno di 2.000€' },
  { id: '2000-5000', label: '2.000€ – 5.000€' },
  { id: '5000-10000', label: '5.000€ – 10.000€' },
  { id: '10000-25000', label: '10.000€ – 25.000€' },
  { id: '>25000', label: 'Oltre 25.000€' },
  { id: 'da-definire', label: 'Da definire insieme' },
];

const timelines = [
  { id: '<1mese', label: 'Meno di 1 mese', desc: 'Urgente' },
  { id: '1-2mesi', label: '1–2 mesi', desc: 'Standard' },
  { id: '2-4mesi', label: '2–4 mesi', desc: 'Progetto medio' },
  { id: '>4mesi', label: 'Oltre 4 mesi', desc: 'Progetto complesso' },
  { id: 'flessibile', label: 'Flessibile', desc: 'Nessuna scadenza fissa' },
];

export default function PreventivoPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    projectType: '',
    budget: '',
    timeline: '',
    description: '',
    nome: '',
    email: '',
    telefono: '',
    azienda: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  if (submitted) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center bg-[#f8fafc]">
        <Container>
          <div className="max-w-lg mx-auto text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 mx-auto mb-6">
              <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Richiesta inviata!</h1>
            <p className="text-slate-500 mb-2">
              Grazie <strong>{formData.nome}</strong>! Ho ricevuto la tua richiesta di preventivo.
            </p>
            <p className="text-slate-500 mb-8">
              Ti contatter&ograve; entro 24 ore all&apos;indirizzo{' '}
              <strong>{formData.email}</strong> con tutti i dettagli.
            </p>
            <Button href="/" size="lg">
              Torna alla Home
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <>
      <section className="pt-32 pb-8 bg-gradient-to-b from-[#f8fafc] to-white">
        <Container>
          <FadeIn className="text-center max-w-2xl mx-auto">
            <nav className="flex items-center justify-center gap-2 text-sm text-slate-500 mb-6">
              <Link href="/" className="hover:text-[#045CB4] transition-colors">Home</Link>
              <span>/</span>
              <span className="text-slate-700">Preventivo</span>
            </nav>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
              Richiedi un Preventivo
            </h1>
            <p className="text-xl text-slate-500">
              Raccontami del tuo progetto. Rispondo con un preventivo dettagliato entro 24 ore.
            </p>
          </FadeIn>
        </Container>
      </section>

      <section className="py-12 bg-white">
        <Container>
          <div className="max-w-2xl mx-auto">
            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-[#045CB4]">
                  Step {currentStep + 1} di {steps.length}: {steps[currentStep]}
                </span>
                <span className="text-sm text-slate-500">{Math.round(progress)}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100">
                <motion.div
                  className="h-2 rounded-full bg-[#045CB4]"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              <div className="flex justify-between mt-2">
                {steps.map((step, i) => (
                  <span
                    key={step}
                    className={`text-xs font-medium hidden sm:block ${
                      i <= currentStep ? 'text-[#045CB4]' : 'text-slate-300'
                    }`}
                  >
                    {step}
                  </span>
                ))}
              </div>
            </div>

            {/* Step content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm"
              >
                {/* Step 0: Project Type */}
                {currentStep === 0 && (
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 mb-6">
                      Che tipo di progetto hai in mente?
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {projectTypes.map((type) => (
                        <button
                          key={type.id}
                          onClick={() => setFormData({ ...formData, projectType: type.id })}
                          className={`flex items-start gap-3 rounded-xl border-2 p-4 text-left transition-all ${
                            formData.projectType === type.id
                              ? 'border-[#045CB4] bg-blue-50'
                              : 'border-slate-200 hover:border-blue-200 hover:bg-blue-50/50'
                          }`}
                        >
                          <span className="text-2xl">{type.icon}</span>
                          <div>
                            <p className="font-semibold text-slate-900">{type.label}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{type.desc}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 1: Budget */}
                {currentStep === 1 && (
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 mb-6">
                      Qual &egrave; il tuo budget indicativo?
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {budgets.map((budget) => (
                        <button
                          key={budget.id}
                          onClick={() => setFormData({ ...formData, budget: budget.id })}
                          className={`rounded-xl border-2 p-4 text-left font-semibold text-slate-700 transition-all ${
                            formData.budget === budget.id
                              ? 'border-[#045CB4] bg-blue-50 text-[#045CB4]'
                              : 'border-slate-200 hover:border-blue-200'
                          }`}
                        >
                          {budget.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Timeline */}
                {currentStep === 2 && (
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 mb-6">
                      Entro quando ti serve?
                    </h2>
                    <div className="space-y-3">
                      {timelines.map((tl) => (
                        <button
                          key={tl.id}
                          onClick={() => setFormData({ ...formData, timeline: tl.id })}
                          className={`flex w-full items-center justify-between rounded-xl border-2 p-4 text-left transition-all ${
                            formData.timeline === tl.id
                              ? 'border-[#045CB4] bg-blue-50'
                              : 'border-slate-200 hover:border-blue-200'
                          }`}
                        >
                          <span className="font-semibold text-slate-900">{tl.label}</span>
                          <span className="text-sm text-slate-500">{tl.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3: Description */}
                {currentStep === 3 && (
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">
                      Descrivi il tuo progetto
                    </h2>
                    <p className="text-slate-500 mb-6">
                      Pi&ugrave; dettagli fornisci, pi&ugrave; preciso sar&agrave; il preventivo.
                    </p>
                    <textarea
                      rows={8}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-[#045CB4] focus:outline-none focus:ring-2 focus:ring-[#045CB4]/20 transition resize-none"
                      placeholder="Descrivi il tuo progetto: cosa vorresti realizzare, quali funzionalit&agrave; ti servono, se hai gi&agrave; materiali o riferimenti, eventuali vincoli tecnici..."
                    />
                  </div>
                )}

                {/* Step 4: Contact */}
                {currentStep === 4 && (
                  <form onSubmit={handleSubmit}>
                    <h2 className="text-xl font-bold text-slate-900 mb-6">
                      I tuoi dati di contatto
                    </h2>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1.5">Nome e Cognome *</label>
                          <input
                            type="text"
                            required
                            value={formData.nome}
                            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-[#045CB4] focus:outline-none focus:ring-2 focus:ring-[#045CB4]/20 transition"
                            placeholder="Mario Rossi"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1.5">Azienda</label>
                          <input
                            type="text"
                            value={formData.azienda}
                            onChange={(e) => setFormData({ ...formData, azienda: e.target.value })}
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-[#045CB4] focus:outline-none focus:ring-2 focus:ring-[#045CB4]/20 transition"
                            placeholder="Azienda Srl"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1.5">Email *</label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-[#045CB4] focus:outline-none focus:ring-2 focus:ring-[#045CB4]/20 transition"
                            placeholder="mario@azienda.it"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1.5">Telefono</label>
                          <input
                            type="tel"
                            value={formData.telefono}
                            onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-[#045CB4] focus:outline-none focus:ring-2 focus:ring-[#045CB4]/20 transition"
                            placeholder="+39 333 000 0000"
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={handlePrev}
                disabled={currentStep === 0}
                className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Indietro
              </button>

              {currentStep < steps.length - 1 ? (
                <Button onClick={handleNext} size="md">
                  Avanti
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
              ) : (
                <Button onClick={() => handleSubmit({ preventDefault: () => {} } as React.FormEvent)} size="md">
                  Invia Richiesta
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </Button>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
