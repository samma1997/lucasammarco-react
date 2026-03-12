import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SERVICES } from '@/data/services';
import { ServiceTemplate } from '@/components/sections/ServiceTemplate';
import { SITE_CONFIG } from '@/lib/constants';

const SLUG = 'ai-services';

export async function generateMetadata(): Promise<Metadata> {
  const service = SERVICES.find((s) => s.slug === SLUG);
  if (!service) return {};
  return {
    title: `${service.title} — Monza, Italia`,
    description: service.description,
    alternates: {
      canonical: `${SITE_CONFIG.url}/servizi/${SLUG}`,
    },
    openGraph: {
      title: `${service.title} | Luca Sammarco`,
      description: service.description,
      url: `${SITE_CONFIG.url}/servizi/${SLUG}`,
    },
  };
}

export default function ServicePage() {
  const service = SERVICES.find((s) => s.slug === SLUG);
  if (!service) notFound();
  return <ServiceTemplate service={service} />;
}
