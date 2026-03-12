import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/FadeIn';
import { CTA } from '@/components/sections/CTA';
import { SERVICES } from '@/data/services';

export const metadata: Metadata = {
  title: 'Servizi Web, SEO, AI e Software Custom',
  description:
    'Scopri tutti i servizi di Luca Sammarco: SEO, sviluppo software, web app, soluzioni AI, automazione aziendale ed e-commerce avanzato per far crescere il tuo business.',
  alternates: {
    canonical: 'https://lucasammarco.com/servizi',
  },
};

const iconMap: Record<string, React.ReactNode> = {
  search: (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  code: (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  layers: (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
    </svg>
  ),
  brain: (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  zap: (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  'shopping-cart': (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
};

export default function ServiziPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-[#f8fafc] to-white">
        <Container>
          <FadeIn className="max-w-3xl">
            <span className="inline-block rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-[#045CB4] mb-4">
              Servizi
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
              Soluzioni digitali complete per il tuo business
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed">
              Dalla strategia SEO allo sviluppo software, dall&apos;AI all&apos;e-commerce:
              tutto quello che ti serve per crescere online con un unico punto di riferimento.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <Container>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <StaggerItem key={service.id}>
                <Link
                  href={`/servizi/${service.slug}`}
                  className="group flex flex-col h-full rounded-2xl border border-slate-200 bg-white p-8 hover:border-blue-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl mb-6 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${service.color}15`, color: service.color }}
                  >
                    {iconMap[service.icon]}
                  </div>

                  <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#045CB4] transition-colors">
                    {service.title}
                  </h2>
                  <p className="text-slate-500 leading-relaxed mb-6 flex-1">
                    {service.description}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {service.features.slice(0, 3).map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-slate-600">
                        <svg className="h-4 w-4 text-[#045CB4] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#045CB4]">
                    Scopri di pi&ugrave;
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      <CTA />
    </>
  );
}
