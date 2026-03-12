export interface Project {
  id: string;
  title: string;
  category: 'web' | 'app' | 'ecommerce' | 'software' | 'ai';
  categoryLabel: string;
  description: string;
  longDescription: string;
  technologies: string[];
  results: string[];
  featured: boolean;
  year: number;
  gradient: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'wup-coach',
    title: 'WUP Coach Booking',
    category: 'app',
    categoryLabel: 'Web App',
    description:
      'Piattaforma di prenotazione sessioni coaching con sistema di pagamento integrato, dashboard coach e gestione disponibilità in real-time.',
    longDescription:
      'Sistema completo di booking per coach professionisti. Include autenticazione OAuth, calendario dinamico con gestione fusi orari, pagamenti Stripe con abbonamenti, notifiche email automatiche e dashboard analytics per i coach.',
    technologies: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Tailwind CSS'],
    results: [
      '+340% prenotazioni vs sistema precedente',
      'Riduzione no-show del 60% con reminder AI',
      '4.9/5 valutazione media utenti',
    ],
    featured: true,
    year: 2024,
    gradient: 'from-blue-600 to-cyan-500',
  },
  {
    id: 'dubai-market',
    title: 'Dubai Market Pulse',
    category: 'software',
    categoryLabel: 'Dashboard AI',
    description:
      'Dashboard di analisi del mercato immobiliare di Dubai con AI predittiva, dati in real-time e report automatizzati per investitori internazionali.',
    longDescription:
      'Piattaforma analytics avanzata che aggrega dati da multiple fonti (DLD, Bayut, Dubizzle) per fornire insights predittivi sul mercato immobiliare di Dubai. Machine learning per previsioni prezzi, heatmap interattive, alert personalizzati.',
    technologies: ['React', 'Python', 'FastAPI', 'OpenAI', 'Recharts', 'PostgreSQL'],
    results: [
      'Analisi di 50.000+ transazioni/mese',
      'Accuratezza previsioni prezzi: 87%',
      '200+ investitori attivi in piattaforma',
    ],
    featured: true,
    year: 2024,
    gradient: 'from-purple-600 to-pink-500',
  },
  {
    id: 'sammapix',
    title: 'SammaPix',
    category: 'app',
    categoryLabel: 'SaaS AI',
    description:
      'SaaS per la generazione e gestione di immagini AI per professionisti del marketing. Workflow automation e brand kit integrato.',
    longDescription:
      'Piattaforma SaaS che permette ai team marketing di generare, editare e gestire immagini AI in modo collaborativo. Include brand kit, template personalizzati, approvazioni team e API per integrazioni.',
    technologies: ['Next.js', 'Replicate API', 'AWS S3', 'Stripe', 'React', 'Supabase'],
    results: [
      'Beta: 500+ utenti in 3 mesi',
      'Riduzione costi content creation del 70%',
      'NPS score: 72',
    ],
    featured: true,
    year: 2025,
    gradient: 'from-orange-500 to-yellow-400',
  },
  {
    id: 'ecommerce-fashion',
    title: 'Fashion Store Milano',
    category: 'ecommerce',
    categoryLabel: 'E-Commerce',
    description:
      'E-commerce Shopify custom per brand fashion milanese con raccomandazioni AI, virtual try-on e omnichannel integration.',
    longDescription:
      'Negozio online custom su Shopify con tema proprietario, integrazione con gestionale, raccomandazioni prodotti basate su AI, Instagram Shopping e Google Shopping. Ottimizzazione checkout che ha ridotto l\'abbandono del carrello del 35%.',
    technologies: ['Shopify', 'Liquid', 'JavaScript', 'OpenAI', 'Google Analytics'],
    results: [
      '+180% revenue online in 12 mesi',
      'Carrello medio aumentato del 28%',
      'Tasso conversione: 3.8% (media settore: 1.5%)',
    ],
    featured: false,
    year: 2024,
    gradient: 'from-pink-500 to-rose-400',
  },
  {
    id: 'crm-manifattura',
    title: 'CRM Manifattura Brianza',
    category: 'software',
    categoryLabel: 'Software Custom',
    description:
      'CRM custom per azienda manifatturiera con gestione ordini, preventivi automatici, integrazione ERP e tracking commesse in real-time.',
    longDescription:
      'Sistema CRM sviluppato su misura per una PMI manifatturiera della Brianza. Include gestione completa del ciclo di vendita, generazione preventivi con calcolo margini, integrazione con il software gestionale esistente e dashboard produzione.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'REST API', 'Docker'],
    results: [
      'Riduzione tempi offerta del 60%',
      'Visibilità totale pipeline commerciale',
      'Integrazione con SAP Business One',
    ],
    featured: false,
    year: 2023,
    gradient: 'from-green-600 to-teal-500',
  },
  {
    id: 'seo-domination',
    title: 'SEO Domination — Studio Legale',
    category: 'web',
    categoryLabel: 'SEO & Web',
    description:
      'Progetto SEO completo per studio legale a Milano: da 0 a 50 keyword in top 3, triplicando le richieste di consulenza organiche.',
    longDescription:
      'Strategia SEO integrata per studio legale milanese specializzato in diritto societario. Reworking completo del sito, content strategy con 40 articoli ottimizzati, local SEO avanzato e link building verticale.',
    technologies: ['WordPress', 'Elementor', 'Screaming Frog', 'Ahrefs', 'Google Search Console'],
    results: [
      '50 keyword in top 3 Google',
      '+280% richieste consulenza organiche',
      'Domain Authority: da 8 a 42 in 18 mesi',
    ],
    featured: false,
    year: 2023,
    gradient: 'from-slate-700 to-slate-500',
  },
];

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);
