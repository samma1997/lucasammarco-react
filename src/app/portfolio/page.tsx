'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { FadeIn } from '@/components/animations/FadeIn';
import { CTA } from '@/components/sections/CTA';
import { PROJECTS } from '@/data/portfolio';
import { Badge } from '@/components/ui/Badge';

const categories = [
  { id: 'all', label: 'Tutti' },
  { id: 'web', label: 'Web' },
  { id: 'app', label: 'App & SaaS' },
  { id: 'ecommerce', label: 'E-Commerce' },
  { id: 'software', label: 'Software' },
  { id: 'ai', label: 'AI' },
] as const;

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filtered = activeFilter === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-[#f8fafc] to-white">
        <Container>
          <FadeIn className="max-w-3xl">
            <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
              <Link href="/" className="hover:text-[#045CB4] transition-colors">Home</Link>
              <span>/</span>
              <span className="text-slate-700">Portfolio</span>
            </nav>
            <span className="inline-block rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-[#045CB4] mb-4">
              Portfolio
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
              Progetti che parlano da soli
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed">
              Una selezione di progetti realizzati per clienti in tutta Italia.
              Ogni progetto &egrave; una storia di sfida, soluzione e risultati concreti.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Filters */}
      <section className="sticky top-16 md:top-20 z-40 bg-white/90 backdrop-blur-sm border-b border-slate-100 py-4">
        <Container>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  activeFilter === cat.id
                    ? 'bg-[#045CB4] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-[#045CB4]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Projects Grid */}
      <section className="py-16 bg-white">
        <Container>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Visual */}
                  <div className={`relative h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}>
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_50%,white,transparent)]" />
                    <span className="text-white font-bold text-4xl opacity-30">
                      {project.title.charAt(0)}
                    </span>
                    <div className="absolute top-4 left-4">
                      <span className="inline-block rounded-full bg-black/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1">
                        {project.categoryLabel}
                      </span>
                    </div>
                    {project.featured && (
                      <div className="absolute top-4 right-4">
                        <span className="inline-block rounded-full bg-[#EAFD9C] text-slate-900 text-xs font-bold px-3 py-1">
                          Featured
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h2 className="text-lg font-bold text-slate-900 group-hover:text-[#045CB4] transition-colors">
                        {project.title}
                      </h2>
                      <span className="text-sm text-slate-400 flex-shrink-0">{project.year}</span>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="inline-block rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Results */}
                    <div className="space-y-1.5 pt-4 border-t border-slate-100">
                      {project.results.map((result) => (
                        <div key={result} className="flex items-start gap-2 text-xs text-slate-600">
                          <svg className="h-3.5 w-3.5 text-[#045CB4] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                          {result}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <p className="text-center text-slate-500 py-16">
              Nessun progetto trovato per questa categoria.
            </p>
          )}
        </Container>
      </section>

      <CTA />
    </>
  );
}
