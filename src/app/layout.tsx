import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SITE_CONFIG } from '@/lib/constants';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.title,
    template: `%s | Luca Sammarco`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    'web developer Monza',
    'sviluppatore web Italia',
    'SEO specialist Monza',
    'Next.js developer',
    'React developer',
    'software custom',
    'soluzioni AI',
    'e-commerce',
    'automazione aziendale',
  ],
  authors: [{ name: 'Luca Sammarco', url: SITE_CONFIG.url }],
  creator: 'Luca Sammarco',
  publisher: 'Luca Sammarco',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: SITE_CONFIG.url,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    siteName: 'Luca Sammarco',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    creator: '@lucasammarco',
  },
  alternates: {
    canonical: SITE_CONFIG.url,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_CONFIG.url}/#localbusiness`,
  name: 'Luca Sammarco',
  description: SITE_CONFIG.description,
  url: SITE_CONFIG.url,
  telephone: SITE_CONFIG.phone,
  email: SITE_CONFIG.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Monza',
    addressRegion: 'MB',
    addressCountry: 'IT',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 45.5845,
    longitude: 9.2744,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  priceRange: '\u20ac\u20ac',
  currenciesAccepted: 'EUR',
  areaServed: {
    '@type': 'Country',
    name: 'Italia',
  },
  sameAs: [
    SITE_CONFIG.social.linkedin,
    SITE_CONFIG.social.github,
    SITE_CONFIG.social.twitter,
  ],
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Luca Sammarco',
  jobTitle: 'Web Developer & SEO Specialist',
  url: SITE_CONFIG.url,
  sameAs: [SITE_CONFIG.social.linkedin, SITE_CONFIG.social.github],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Monza',
    addressRegion: 'Lombardia',
    addressCountry: 'IT',
  },
  knowsAbout: [
    'Next.js',
    'React',
    'TypeScript',
    'SEO',
    'Web Development',
    'AI Integration',
    'E-Commerce',
    'Software Development',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }} className="antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
