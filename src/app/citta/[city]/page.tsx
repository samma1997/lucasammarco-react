import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { FAQ } from '@/components/sections/FAQ';
import { CTA } from '@/components/sections/CTA';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/FadeIn';
import { CITIES, getCityBySlug } from '@/data/cities';
import { SERVICES } from '@/data/services';
import { SITE_CONFIG } from '@/lib/constants';

export async function generateStaticParams() {
  return CITIES.map((city) => ({ city: city.slug }));
}

interface Props {
  params: Promise<{ city: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) return {};

  const title = `Web Developer ${city.name} — Siti Web, SEO e Software Custom`;
  const description = `Cerchi un web developer a ${city.name}? Luca Sammarco offre sviluppo web, SEO, software custom e soluzioni AI per aziende e professionisti a ${city.name} e provincia.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_CONFIG.url}/citta/${city.slug}`,
    },
    openGraph: {
      title: `${title} | Luca Sammarco`,
      description,
      url: `${SITE_CONFIG.url}/citta/${city.slug}`,
    },
  };
}

export default async function CityPage({ params }: Props) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Luca Sammarco',
    description: `Web Developer & SEO Specialist che serve ${city.name} e provincia`,
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Monza',
      addressRegion: 'MB',
      addressCountry: 'IT',
    },
    areaServed: {
      '@type': 'City',
      name: city.name,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://lucasammarco.com' },
      { '@type': 'ListItem', position: 2, name: `Web Developer ${city.name}`, item: `https://lucasammarco.com/citta/${city.slug}` },
    ],
  };

  const cityFaq = [
    {
      question: `Servi clienti a ${city.name} pur essendo basato a Monza?`,
      answer: `Assolutamente sì. Lavoro in remoto con clienti in tutta Italia, incluso ${city.name}. Per i clienti della ${city.region} posso organizzare anche incontri di persona. La distanza non è mai un ostacolo per la qualità del lavoro.`,
    },
    {
      question: `Quanto costa un sito web professionale a ${city.name}?`,
      answer: `Il costo dipende dalla complessità del progetto. Un sito vetrina professionale parte da 1.500€, un e-commerce da 3.000€, una web app personalizzata da 5.000€. Contattami per un preventivo gratuito e dettagliato.`,
    },
    {
      question: `Offri servizi SEO per aziende di ${city.name}?`,
      answer: `Sì, offro strategie SEO complete per aziende di ${city.name}: ottimizzazione tecnica, local SEO, content strategy e link building per aumentare la visibilità su Google nelle ricerche locali.`,
    },
    {
      question: `Lavori con PMI o solo con grandi aziende?`,
      answer: `Lavoro con aziende di ogni dimensione, dalle startup ai professionisti, dalle PMI alle medio-grandi imprese. Ogni progetto riceve la stessa attenzione e qualità, adattata al budget disponibile.`,
    },
    {
      question: `Quanto tempo ci vuole per realizzare un sito web?`,
      answer: `Un sito vetrina richiede 2-3 settimane, un e-commerce 3-5 settimane, una web app 4-8 settimane. I tempi dipendono dalla complessità e dalla velocità di risposta del cliente per approvazioni e contenuti.`,
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-[#0f172a] to-[#1a2744] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 h-96 w-96 rounded-full bg-[#045CB4] blur-3xl opacity-20" />
          <div className="absolute bottom-1/4 left-1/4 h-64 w-64 rounded-full bg-[#58D0F5] blur-3xl opacity-10" />
        </div>
        <Container className="relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Web Developer {city.name}</span>
          </nav>

          <FadeIn className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#045CB4]/30 bg-[#045CB4]/10 px-4 py-2 text-sm font-medium text-[#58D0F5] mb-6">
              <span className="h-2 w-2 rounded-full bg-[#EAFD9C]" />
              {city.region}, Italia
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Web Developer a {city.name}
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed mb-8">
              Sono Luca Sammarco, web developer & SEO specialist basato a Monza, {city.description}.
              Aiuto aziende e professionisti di {city.name} a crescere online con siti web,
              software custom e strategie SEO efficaci.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/preventivo" size="lg" variant="secondary">
                Preventivo Gratuito
              </Button>
              <Button href="/contatti" size="lg" variant="ghost" className="text-white border border-white/30 hover:bg-white/10">
                Contattami
              </Button>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Services for this city */}
      <section className="py-20 bg-white">
        <Container>
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Servizi per aziende a {city.name}
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Dall&apos;ottimizzazione SEO allo sviluppo software, tutte le soluzioni
              digitali che ti servono per crescere nel mercato di {city.name}.
            </p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => (
              <StaggerItem key={service.id}>
                <Link
                  href={`/servizi/${service.slug}`}
                  className="group flex flex-col h-full rounded-2xl border border-slate-200 bg-white p-6 hover:border-blue-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#045CB4] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed flex-1 mb-4">
                    {service.description}
                  </p>
                  <span className="text-sm font-medium text-[#045CB4] inline-flex items-center gap-1">
                    Scopri di pi&ugrave;
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* Why local developer */}
      <section className="py-20 bg-[#f8fafc]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Perch&eacute; scegliere un developer che conosce il mercato italiano
              </h2>
              <p className="text-slate-500 leading-relaxed mb-6">
                Lavorare con un professionista che parla la tua lingua, conosce il mercato
                locale e &egrave; disponibile per incontri in presenza fa la differenza.
              </p>
              <ul className="space-y-4">
                {[
                  `Comunicazione in italiano, senza barriere linguistiche`,
                  `Conoscenza del mercato ${city.name} e ${city.region}`,
                  `Disponibile per meeting di persona se necessario`,
                  `Fatturazione italiana, IVA inclusa`,
                  `Supporto nello stesso fuso orario`,
                  `Comprensione delle normative GDPR italiane`,
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 mt-0.5">
                      <svg className="h-3.5 w-3.5 text-[#045CB4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>

            <FadeIn direction="left" delay={0.2}>
              <div className="rounded-2xl bg-[#0f172a] p-8 text-white">
                <h3 className="text-xl font-bold mb-4">
                  Lavoro con te da remoto su {city.name}
                </h3>
                <p className="text-slate-300 leading-relaxed mb-6">
                  Nonostante sia basato a Monza, gestisco progetti in tutta Italia con
                  la stessa efficienza e qualit&agrave;. Utilizzo strumenti di collaborazione
                  moderni per tenerti sempre aggiornato.
                </p>
                <div className="space-y-3 mb-8">
                  {[
                    'Video call settimanali di aggiornamento',
                    'Accesso a dashboard progetto in real-time',
                    'Slack / WhatsApp per comunicazioni rapide',
                    'Demo e consegne puntuali concordate',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#EAFD9C] flex-shrink-0" />
                      <span className="text-slate-300 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <Button href="/contatti" className="w-full justify-center">
                  Inizia il tuo progetto
                </Button>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      <FAQ
        items={cityFaq}
        title={`Domande su servizi web a ${city.name}`}
      />

      <CTA />
    </>
  );
}
