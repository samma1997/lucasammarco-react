'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { FadeIn } from '@/components/animations/FadeIn';

const testimonials = [
  {
    id: 1,
    name: 'Marco Bianchi',
    role: 'CEO',
    company: 'TechStart Milano',
    text: 'Luca ha trasformato completamente la nostra presenza online. In 6 mesi siamo passati da invisibili su Google a dominare le prime posizioni per le nostre keyword target. Il ROI è stato straordinario.',
    rating: 5,
    avatar: 'MB',
    color: '#045CB4',
  },
  {
    id: 2,
    name: 'Sara Colombo',
    role: 'Founder',
    company: 'EcoShop Italia',
    text: 'Il nostro e-commerce sviluppato da Luca ha triplicato il fatturato in un anno. La sua attenzione alla UX e alle conversioni è eccezionale. Consiglio vivamente a chiunque voglia vendere online seriamente.',
    rating: 5,
    avatar: 'SC',
    color: '#046BD2',
  },
  {
    id: 3,
    name: 'Giovanni Ferrara',
    role: 'Direttore Commerciale',
    company: 'Ferrara Group Srl',
    text: 'Il software gestionale custom che ci ha costruito ci ha fatto risparmiare 15 ore settimanali di lavoro manuale. È stato un investimento che si è ripagato in 3 mesi. Team professionale e puntuale.',
    rating: 5,
    avatar: 'GF',
    color: '#58D0F5',
  },
  {
    id: 4,
    name: 'Alessia Moretti',
    role: 'Marketing Manager',
    company: 'Studio Moretti Architetti',
    text: "Il chatbot AI che Luca ha integrato nel nostro sito gestisce ora l'80% delle richieste iniziali dei clienti, liberando il mio tempo per i progetti che contano. Innovativo e funzionale.",
    rating: 5,
    avatar: 'AM',
    color: '#045CB4',
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  return (
    <section className="py-24 bg-[#0f172a] overflow-hidden">
      <Container>
        <FadeIn className="text-center mb-16">
          <span className="inline-block rounded-full bg-[#045CB4]/20 px-4 py-2 text-sm font-medium text-[#58D0F5] mb-4">
            Testimonianze
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Cosa dicono i clienti
          </h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">
            Risultati reali per aziende reali. La soddisfazione del cliente è la mia
            priorità numero uno.
          </p>
        </FadeIn>

        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 md:p-10"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <svg key={i} className="h-5 w-5 text-[#EAFD9C]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <blockquote className="text-lg text-slate-200 leading-relaxed mb-8">
                &ldquo;{testimonials[current].text}&rdquo;
              </blockquote>

              <div className="flex items-center gap-4">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full text-white font-bold"
                  style={{ backgroundColor: testimonials[current].color }}
                >
                  {testimonials[current].avatar}
                </div>
                <div>
                  <p className="font-semibold text-white">{testimonials[current].name}</p>
                  <p className="text-sm text-slate-400">
                    {testimonials[current].role} — {testimonials[current].company}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current ? 'w-8 bg-[#58D0F5]' : 'w-2 bg-slate-600 hover:bg-slate-400'
                }`}
                aria-label={`Testimonianza ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
