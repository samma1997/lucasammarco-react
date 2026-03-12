import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/FadeIn';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Blog — Web Development, SEO e AI',
  description:
    'Articoli e guide su Next.js, SEO, intelligenza artificiale e sviluppo web. Strategie pratiche per far crescere il tuo business online.',
  alternates: {
    canonical: `${SITE_CONFIG.url}/blog`,
  },
};

const articles = [
  {
    id: 1,
    title: 'GEO Optimization: come ottimizzare il sito per ChatGPT e Google AI',
    excerpt: "L'AI search sta cambiando le regole del gioco SEO. Scopri come ottimizzare il tuo sito per essere citato nelle risposte AI di ChatGPT, Google AI Overviews e Perplexity.",
    category: 'SEO',
    date: '10 Marzo 2025',
    readTime: '8 min',
    slug: 'geo-optimization-ai-search',
    gradient: 'from-blue-600 to-cyan-500',
  },
  {
    id: 2,
    title: 'Next.js 15 vs Nuxt 3: quale scegliere per il tuo progetto nel 2025?',
    excerpt: "Confronto dettagliato tra Next.js 15 e Nuxt 3: performance, developer experience, ecosistema e casi d'uso ideali per ogni framework.",
    category: 'Development',
    date: '5 Marzo 2025',
    readTime: '12 min',
    slug: 'nextjs-15-vs-nuxt-3',
    gradient: 'from-slate-700 to-slate-500',
  },
  {
    id: 3,
    title: 'Come costruire un chatbot AI per il tuo e-commerce con GPT-4',
    excerpt: "Guida pratica per integrare un chatbot intelligente nel tuo negozio online: gestione FAQ, raccomandazioni prodotti e escalation umana.",
    category: 'AI',
    date: '28 Febbraio 2025',
    readTime: '15 min',
    slug: 'chatbot-ai-ecommerce-gpt4',
    gradient: 'from-purple-600 to-pink-500',
  },
  {
    id: 4,
    title: "Core Web Vitals 2025: la guida completa all'ottimizzazione",
    excerpt: "Tutto quello che devi sapere su LCP, INP e CLS nel 2025. Strategie pratiche per ottenere 90+ su Lighthouse e migliorare il ranking su Google.",
    category: 'Performance',
    date: '20 Febbraio 2025',
    readTime: '10 min',
    slug: 'core-web-vitals-2025-guida',
    gradient: 'from-green-600 to-teal-500',
  },
  {
    id: 5,
    title: 'Make vs Zapier vs n8n: quale tool di automazione scegliere nel 2025',
    excerpt: "Confronto approfondito tra i principali strumenti di workflow automation. Pro, contro, prezzi e casi d'uso per aiutarti a scegliere.",
    category: 'Automazione',
    date: '15 Febbraio 2025',
    readTime: '9 min',
    slug: 'make-vs-zapier-vs-n8n-2025',
    gradient: 'from-orange-500 to-yellow-400',
  },
  {
    id: 6,
    title: 'Local SEO 2025: dominare le ricerche locali con Google Maps',
    excerpt: "Strategia completa di Local SEO per aziende italiane: Google Business Profile, citazioni NAP, recensioni e content marketing locale.",
    category: 'SEO',
    date: '8 Febbraio 2025',
    readTime: '11 min',
    slug: 'local-seo-2025-google-maps',
    gradient: 'from-red-500 to-rose-400',
  },
];

const categories = ['Tutti', 'SEO', 'Development', 'AI', 'Performance', 'Automazione'];

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-[#f8fafc] to-white">
        <Container>
          <FadeIn className="max-w-3xl">
            <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
              <Link href="/" className="hover:text-[#045CB4] transition-colors">Home</Link>
              <span>/</span>
              <span className="text-slate-700">Blog</span>
            </nav>
            <span className="inline-block rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-[#045CB4] mb-4">
              Blog
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
              Insights su Web, SEO e AI
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed">
              Articoli pratici su sviluppo web, strategie SEO, intelligenza artificiale e
              tutto quello che serve per crescere online nel 2025.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Categories */}
      <div className="border-b border-slate-100 bg-white">
        <Container>
          <div className="flex flex-wrap gap-2 py-4">
            {categories.map((cat) => (
              <span
                key={cat}
                className={`rounded-full px-4 py-2 text-sm font-medium cursor-pointer transition-all ${
                  cat === 'Tutti'
                    ? 'bg-[#045CB4] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-[#045CB4]'
                }`}
              >
                {cat}
              </span>
            ))}
          </div>
        </Container>
      </div>

      {/* Articles */}
      <section className="py-16 bg-white">
        <Container>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <StaggerItem key={article.id}>
                <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
                  {/* Visual */}
                  <div className={`h-48 bg-gradient-to-br ${article.gradient} relative overflow-hidden flex items-end p-6`}>
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_50%,white,transparent)]" />
                    <span className="relative inline-block rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1">
                      {article.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                      <span>{article.date}</span>
                      <span>&bull;</span>
                      <span>{article.readTime} di lettura</span>
                    </div>
                    <h2 className="text-lg font-bold text-slate-900 mb-3 leading-snug group-hover:text-[#045CB4] transition-colors flex-1">
                      {article.title}
                    </h2>
                    <p className="text-sm text-slate-500 leading-relaxed mb-4">
                      {article.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-[#045CB4]">
                      Leggi l&apos;articolo
                      <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>
    </>
  );
}
