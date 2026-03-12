import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { FAQ } from '@/components/sections/FAQ';
import { CTA } from '@/components/sections/CTA';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/FadeIn';
import type { Service } from '@/data/services';

interface ServiceTemplateProps {
  service: Service;
}

export function ServiceTemplate({ service }: ServiceTemplateProps) {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.longDescription,
    provider: {
      '@type': 'Person',
      name: 'Luca Sammarco',
      url: 'https://lucasammarco.com',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Italia',
    },
    url: `https://lucasammarco.com/servizi/${service.slug}`,
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://lucasammarco.com' },
      { '@type': 'ListItem', position: 2, name: 'Servizi', item: 'https://lucasammarco.com/servizi' },
      { '@type': 'ListItem', position: 3, name: service.title, item: `https://lucasammarco.com/servizi/${service.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero */}
      <section
        className="pt-32 pb-20 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${service.color}08 0%, #f8fafc 100%)`,
        }}
      >
        <div
          className="absolute top-0 right-0 h-96 w-96 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: service.color }}
        />
        <Container className="relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
            <Link href="/" className="hover:text-[#045CB4] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/servizi" className="hover:text-[#045CB4] transition-colors">Servizi</Link>
            <span>/</span>
            <span className="text-slate-700 font-medium">{service.shortTitle}</span>
          </nav>

          <FadeIn className="max-w-3xl">
            <span
              className="inline-block rounded-full px-4 py-2 text-sm font-medium mb-4"
              style={{ backgroundColor: `${service.color}15`, color: service.color }}
            >
              {service.shortTitle}
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
              {service.title}
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed mb-8">
              {service.longDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/preventivo" size="lg">
                Richiedi Preventivo Gratuito
              </Button>
              <Button href="/contatti" size="lg" variant="outline">
                Parliamone
              </Button>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Cosa include il servizio
              </h2>
              <p className="text-slate-500 leading-relaxed mb-8">
                Un servizio completo, dal primo brief alla consegna finale e oltre.
                Nessun costo nascosto, tutto incluso nel preventivo.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div
                      className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full mt-0.5"
                      style={{ backgroundColor: `${service.color}15` }}
                    >
                      <svg
                        className="h-3.5 w-3.5"
                        style={{ color: service.color }}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>

            <FadeIn direction="left" delay={0.2}>
              <div className="rounded-2xl bg-[#0f172a] p-8 text-white">
                <h3 className="text-xl font-bold mb-6">
                  Perch&eacute; questo servizio?
                </h3>
                <div className="space-y-4">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <span
                        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg"
                        style={{ backgroundColor: `${service.color}30` }}
                      >
                        <svg
                          className="h-4 w-4"
                          style={{ color: service.color }}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-slate-700">
                  <Button href="/preventivo" className="w-full justify-center">
                    Ottieni un Preventivo
                  </Button>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="py-20 bg-[#f8fafc]">
        <Container>
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Come lavoro
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Un processo chiaro e trasparente, con comunicazione costante ad ogni step.
              Sai sempre dove siamo e cosa accade dopo.
            </p>
          </FadeIn>

          <StaggerContainer className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200 hidden md:block md:left-1/2 md:-translate-x-px" />

            <div className="space-y-8">
              {service.process.map((step, index) => (
                <StaggerItem key={step.step}>
                  <div className={`relative flex gap-6 md:gap-0 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    {/* Step number (center on md) */}
                    <div className="relative z-10 flex-shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-full text-white font-bold text-lg shadow-lg"
                        style={{ backgroundColor: service.color }}
                      >
                        {step.step}
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`flex-1 md:w-5/12 ${index % 2 === 0 ? 'md:pr-16 md:text-right md:ml-0 md:mr-auto' : 'md:pl-16 md:ml-auto md:mr-0'}`}>
                      <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                        <p className="text-slate-500 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </Container>
      </section>

      {/* FAQ */}
      <FAQ
        items={service.faq}
        title="Domande Frequenti"
        subtitle={`Tutto quello che devi sapere sul servizio ${service.shortTitle}.`}
      />

      <CTA />
    </>
  );
}
