import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://lucasammarco.com";
  const now = new Date();

  const pages = [
    { path: "/", priority: 1.0 },
    { path: "/approccio", priority: 0.8 },
    { path: "/chi-sono", priority: 0.8 },
    { path: "/progetti", priority: 0.8 },
    { path: "/contatti", priority: 0.9 },
    { path: "/servizi/seo-geo", priority: 0.9 },
    { path: "/servizi/software", priority: 0.9 },
    { path: "/servizi/trasformazione-digitale", priority: 0.9 },
    { path: "/expertise/audit-seo", priority: 0.7 },
    { path: "/expertise/geo-local-seo", priority: 0.7 },
    { path: "/expertise/analisi-strategica", priority: 0.7 },
    { path: "/expertise/web-app-saas", priority: 0.7 },
    { path: "/expertise/ecommerce", priority: 0.7 },
    { path: "/expertise/sito-vetrina", priority: 0.7 },
    { path: "/expertise/automazione-ai", priority: 0.7 },
    { path: "/expertise/app-mobile", priority: 0.7 },
    { path: "/expertise/data-strategy", priority: 0.7 },
  ];

  return pages.map(({ path, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority,
  }));
}
