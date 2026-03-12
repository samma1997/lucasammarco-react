import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { PortfolioPreview } from '@/components/sections/Portfolio';
import { Testimonials } from '@/components/sections/Testimonials';
import { CTA } from '@/components/sections/CTA';
import { Container } from '@/components/ui/Container';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/FadeIn';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
  alternates: {
    canonical: SITE_CONFIG.url,
  },
};

const whyChooseMe = [
  {
    icon: '🚀',
    title: 'Consegna Veloce',
    description:
      'MVP in 4-8 settimane, siti web in 2-4 settimane. Rispetto sempre le scadenze concordate senza compromettere la qualità.',
    stat: '< 4 settimane',
    statLabel: 'Tempo medio di consegna',
  },
  {
    icon: '🎯',
    title: 'Focus sui Risultati',
    description:
      'Non costruisco solo bei siti: costruisco macchine per generare business. Ogni decisione tecnica è orientata ai KPI del cliente.',
    stat: '+280%',
    statLabel: 'Crescita media traffico organico',
  },
  {
    icon: '🔧',
    title: 'Stack Moderno',
    description:
      'Utilizzo sempre le tecnologie più moderne e performanti: Next.js, TypeScript, cloud-native, AI. Il tuo sito non invecchia.',
    stat: '95+',
    statLabel: 'Lighthouse score garantito',
  },
  {
    icon: '🤝',
    title: 'Supporto Continuo',
    description:
      'Non sparisco dopo la consegna. Offro supporto tecnico, aggiornamenti e ottimizzazioni continue per far crescere il tuo progetto.',
    stat: '24h',
    statLabel: 'Tempo massimo di risposta',
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />

      {/* Why Choose Me */}
      <section className="py-24 bg-white">
        <Container>
          <FadeIn className="text-center mb-16">
            <span className="inline-block rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-[#045CB4] mb-4">
              Perch&eacute; Scegliermi
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Non solo codice: risultati concreti
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              8 anni di esperienza nel costruire prodotti digitali che funzionano davvero,
              con un approccio pratico e orientato ai risultati.
            </p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyChooseMe.map((item, index) => (
              <StaggerItem key={index}>
                <div className="group rounded-2xl border border-slate-200 bg-white p-6 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 text-2xl">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed mb-4">
                        {item.description}
                      </p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-[#045CB4]">{item.stat}</span>
                        <span className="text-xs text-slate-400">{item.statLabel}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      <PortfolioPreview />
      <Testimonials />
      <CTA />
    </>
  );
}
