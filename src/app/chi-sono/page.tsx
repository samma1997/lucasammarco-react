import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/FadeIn';
import { CTA } from '@/components/sections/CTA';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Chi Sono — Web Developer & SEO Specialist a Monza',
  description:
    'Sono Luca Sammarco, web developer e SEO specialist a Monza. 8+ anni di esperienza nella creazione di siti web, software custom e strategie SEO per aziende italiane.',
  alternates: {
    canonical: `${SITE_CONFIG.url}/chi-sono`,
  },
};

const skills = [
  { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
  { category: 'Backend', items: ['Node.js', 'Python', 'FastAPI', 'PostgreSQL', 'Redis'] },
  { category: 'AI & Tools', items: ['OpenAI API', 'Claude API', 'LangChain', 'Make', 'n8n'] },
  { category: 'SEO & Analytics', items: ['Google Analytics 4', 'Search Console', 'Ahrefs', 'SEMrush', 'Screaming Frog'] },
  { category: 'DevOps', items: ['Vercel', 'AWS', 'Docker', 'GitHub Actions', 'Railway'] },
  { category: 'E-Commerce', items: ['Shopify', 'WooCommerce', 'Stripe', 'PayPal', 'Custom Checkout'] },
];

const timeline = [
  {
    year: '2016',
    title: 'Inizio del viaggio',
    description: 'Ho iniziato a programmare da autodidatta, realizzando i primi siti web per piccole attività locali in Brianza.',
  },
  {
    year: '2018',
    title: 'Specializzazione SEO',
    description: "Ho approfondito la SEO ottenendo le prime certificazioni Google e iniziando a lavorare sulla visibilità organica di siti web.",
  },
  {
    year: '2020',
    title: 'Stack moderno',
    description: "Adozione completa di React, Next.js e TypeScript. Primo progetto SaaS completato con successo per una startup milanese.",
  },
  {
    year: '2022',
    title: 'Freelance full-time',
    description: "Transizione a freelance full-time. Ampliamento del portfolio con software custom, e-commerce avanzati e web app.",
  },
  {
    year: '2023',
    title: 'AI Integration',
    description: "Integrazione dell'AI nei progetti clienti: chatbot GPT-4, analisi dati AI, automazione workflow. Prima specializzazione GEO optimization.",
  },
  {
    year: '2024-oggi',
    title: 'Full-stack + AI',
    description: "Sviluppo di prodotti SaaS propri e consulenza ad aziende per la trasformazione digitale AI-first. Team in crescita.",
  },
];

const stats = [
  { value: '50+', label: 'Progetti completati' },
  { value: '30+', label: 'Clienti soddisfatti' },
  { value: '8+', label: 'Anni di esperienza' },
  { value: '20+', label: 'Città servite' },
];

export default function ChiSonoPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://lucasammarco.com' },
      { '@type': 'ListItem', position: 2, name: 'Chi Sono', item: 'https://lucasammarco.com/chi-sono' },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-[#f8fafc] to-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
                <Link href="/" className="hover:text-[#045CB4] transition-colors">Home</Link>
                <span>/</span>
                <span className="text-slate-700">Chi Sono</span>
              </nav>
              <span className="inline-block rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-[#045CB4] mb-4">
                Chi Sono
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
                Ciao, sono Luca Sammarco
              </h1>
              <p className="text-xl text-slate-500 leading-relaxed mb-6">
                Web Developer & SEO Specialist basato a Monza, in Lombardia. Da oltre 8 anni
                aiuto aziende e professionisti a crescere online con soluzioni digitali su misura.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                La mia passione &egrave; costruire prodotti digitali che funzionano davvero: non solo
                belli da vedere, ma efficaci nel generare risultati concreti per il business.
                Combino competenze tecniche avanzate con una mentalit&agrave; orientata ai dati e ai
                risultati.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/preventivo" size="lg">
                  Lavoriamo insieme
                </Button>
                <Button href="/portfolio" size="lg" variant="outline">
                  Vedi i miei lavori
                </Button>
              </div>
            </FadeIn>

            <FadeIn direction="left" delay={0.2}>
              {/* Avatar placeholder */}
              <div className="relative">
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-[#045CB4] to-[#58D0F5] flex items-center justify-center max-w-md mx-auto">
                  <span className="text-white font-bold text-8xl opacity-30">LS</span>
                </div>
                {/* Floating badges */}
                <div className="absolute -bottom-4 -left-4 rounded-2xl bg-white border border-slate-200 shadow-lg p-4">
                  <p className="text-2xl font-bold text-[#045CB4]">95+</p>
                  <p className="text-xs text-slate-500">Lighthouse Score</p>
                </div>
                <div className="absolute -top-4 -right-4 rounded-2xl bg-[#EAFD9C] border border-lime-200 shadow-lg p-4">
                  <p className="text-2xl font-bold text-slate-900">8+</p>
                  <p className="text-xs text-slate-600">Anni exp.</p>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Stats */}
          <FadeIn delay={0.3} className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center p-4 rounded-2xl bg-[#f8fafc] border border-slate-100">
                <p className="text-3xl font-bold text-[#045CB4]">{stat.value}</p>
                <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </FadeIn>
        </Container>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <Container>
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Il mio percorso</h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Da autodidatta curioso a professionista del digitale. Ogni anno un nuovo
              capitolo di crescita.
            </p>
          </FadeIn>

          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200" />
            <StaggerContainer className="space-y-8">
              {timeline.map((item, index) => (
                <StaggerItem key={index}>
                  <div className="relative flex gap-6">
                    <div className="relative z-10 flex-shrink-0">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#045CB4] text-white font-bold text-sm shadow-lg shadow-blue-500/20">
                        {item.year}
                      </div>
                    </div>
                    <div className="flex-1 pt-3">
                      <h3 className="text-lg font-bold text-slate-900 mb-1">{item.title}</h3>
                      <p className="text-slate-500 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </Container>
      </section>

      {/* Tech Stack */}
      <section className="py-20 bg-[#f8fafc]">
        <Container>
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Tech Stack</h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Le tecnologie che utilizzo quotidianamente per costruire prodotti digitali
              scalabili e performanti.
            </p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill) => (
              <StaggerItem key={skill.category}>
                <div className="rounded-2xl bg-white border border-slate-200 p-6">
                  <h3 className="font-bold text-slate-900 mb-4">{skill.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item) => (
                      <span
                        key={item}
                        className="inline-block rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-[#045CB4]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      <CTA />
    </>
  );
}
