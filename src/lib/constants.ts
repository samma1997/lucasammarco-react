export const SITE_CONFIG = {
  name: 'Luca Sammarco',
  title: 'Luca Sammarco — Web Developer & SEO Specialist a Monza',
  description:
    'Web Developer & SEO Specialist a Monza. Creo siti web, applicazioni, software custom e soluzioni AI per far crescere il tuo business online.',
  url: 'https://lucasammarco.com',
  locale: 'it_IT',
  author: 'Luca Sammarco',
  location: 'Monza, Italia',
  email: 'info@lucasammarco.com',
  phone: '+39 333 000 0000',
  social: {
    linkedin: 'https://linkedin.com/in/lucasammarco',
    github: 'https://github.com/lucasammarco',
    twitter: 'https://twitter.com/lucasammarco',
  },
} as const;

export const NAV_ITEMS = [
  { label: 'Chi Sono', href: '/chi-sono' },
  {
    label: 'Servizi',
    href: '/servizi',
    children: [
      { label: 'SEO & GEO as a Service', href: '/servizi/seo-geo' },
      { label: 'Sviluppo Software Custom', href: '/servizi/software' },
      { label: 'Web App & SaaS', href: '/servizi/web-app' },
      { label: 'Soluzioni AI-Powered', href: '/servizi/ai-services' },
      { label: 'Automazione Aziendale', href: '/servizi/automazione' },
      { label: 'E-Commerce Avanzato', href: '/servizi/ecommerce' },
    ],
  },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contatti', href: '/contatti' },
] as const;
