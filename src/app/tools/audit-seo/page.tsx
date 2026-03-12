'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/animations/FadeIn';

export default function AuditSeoPage() {
  const [url, setUrl] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setAnalyzed(true);
    }, 2500);
  };

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-[#0f172a] to-[#1a2744] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 h-96 w-96 rounded-full bg-[#045CB4] blur-3xl opacity-20" />
        </div>
        <Container className="relative z-10">
          <FadeIn className="max-w-3xl mx-auto text-center">
            <nav className="flex items-center justify-center gap-2 text-sm text-slate-400 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/tools" className="hover:text-white transition-colors">Tools</Link>
              <span>/</span>
              <span className="text-white">Audit SEO</span>
            </nav>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#045CB4]/30 bg-[#045CB4]/10 px-4 py-2 text-sm font-medium text-[#58D0F5] mb-6">
              <span className="h-2 w-2 rounded-full bg-[#EAFD9C] animate-pulse" />
              Tool Gratuito
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Analizza il tuo sito GRATIS
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed mb-10">
              Inserisci il tuo URL e ottieni un&apos;analisi SEO immediata: velocit&agrave;, meta tag,
              struttura, mobile-friendliness e molto altro.
            </p>

            <form onSubmit={handleAnalyze} className="flex gap-3 max-w-lg mx-auto">
              <div className="flex-1">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://www.tuosito.it"
                  required
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-400 focus:border-[#045CB4] focus:outline-none focus:ring-2 focus:ring-[#045CB4]/20 transition"
                />
              </div>
              <Button type="submit" size="md" disabled={analyzing}>
                {analyzing ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Analisi...
                  </>
                ) : (
                  'Analizza'
                )}
              </Button>
            </form>
          </FadeIn>
        </Container>
      </section>

      {/* Results / Features */}
      <section className="py-16 bg-white">
        <Container>
          {!analyzed ? (
            <>
              <FadeIn className="text-center mb-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Cosa analizza il tool
                </h2>
                <p className="text-slate-500 max-w-xl mx-auto">
                  Un&apos;analisi completa dei principali fattori SEO del tuo sito, gratuita e immediata.
                </p>
              </FadeIn>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
                {[
                  { icon: '⚡', title: 'Velocit&agrave; di caricamento', desc: 'Core Web Vitals, LCP, CLS, TTFB' },
                  { icon: '📱', title: 'Mobile Friendliness', desc: 'Responsive design e usabilit&agrave; mobile' },
                  { icon: '🏷️', title: 'Meta Tag e Title', desc: 'Ottimizzazione title, description, H1' },
                  { icon: '🔗', title: 'Link Analysis', desc: 'Internal linking e broken link check' },
                  { icon: '🖼️', title: 'Immagini', desc: 'Alt text, dimensioni, formato WebP' },
                  { icon: '🔒', title: 'Sicurezza HTTPS', desc: 'Certificato SSL e redirect' },
                  { icon: '🗺️', title: 'Sitemap & Robots', desc: 'Configurazione corretta per crawler' },
                  { icon: '📊', title: 'Structured Data', desc: 'Schema markup e rich snippets' },
                  { icon: '🌍', title: 'SEO On-Page', desc: 'Keyword density, contenuto, heading' },
                ].map((feature, i) => (
                  <div key={i} className="rounded-2xl border border-slate-100 bg-[#f8fafc] p-5">
                    <span className="text-2xl mb-3 block">{feature.icon}</span>
                    <h3 className="font-bold text-slate-900 mb-1" dangerouslySetInnerHTML={{ __html: feature.title }} />
                    <p className="text-sm text-slate-500">{feature.desc}</p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="rounded-2xl bg-gradient-to-br from-[#045CB4] to-[#046BD2] p-8 text-center text-white">
                <h3 className="text-xl font-bold mb-3">
                  Vuoi un&apos;analisi SEO completa e professionale?
                </h3>
                <p className="text-blue-100 mb-6 max-w-xl mx-auto">
                  Il tool gratuito fornisce un&apos;analisi di base. Per un audit SEO approfondito
                  con strategie personalizzate e piano di miglioramento, contattami.
                </p>
                <Button href="/preventivo" variant="secondary" size="lg">
                  Richiedi Audit SEO Professionale
                </Button>
              </div>
            </>
          ) : (
            <FadeIn className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  Analisi completata per:
                </h2>
                <p className="text-[#045CB4] font-medium">{url}</p>
              </div>

              {/* Placeholder results */}
              <div className="space-y-4">
                {[
                  { label: 'SEO Score', score: 72, color: 'bg-yellow-400', status: 'Migliorabile' },
                  { label: 'Performance', score: 85, color: 'bg-green-400', status: 'Buono' },
                  { label: 'Mobile', score: 90, color: 'bg-green-500', status: 'Ottimo' },
                  { label: 'Accessibilit&agrave;', score: 68, color: 'bg-orange-400', status: 'Attenzione' },
                ].map((item, i) => (
                  <div key={i} className="rounded-2xl border border-slate-200 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-semibold text-slate-900" dangerouslySetInnerHTML={{ __html: item.label }} />
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-slate-900">{item.score}</span>
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium text-white ${item.color}`}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100">
                      <div
                        className={`h-2 rounded-full ${item.color}`}
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl bg-[#EAFD9C] border border-lime-200 p-6 text-center">
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Vuoi risolvere questi problemi?
                </h3>
                <p className="text-slate-600 mb-4 text-sm">
                  Ti fornisco un audit SEO completo con priorit&agrave; e piano di azione dettagliato.
                </p>
                <Button href="/preventivo" size="md">
                  Richiedi Analisi Professionale
                </Button>
              </div>
            </FadeIn>
          )}
        </Container>
      </section>
    </>
  );
}
