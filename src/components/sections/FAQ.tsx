'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { FadeIn } from '@/components/animations/FadeIn';
import { cn } from '@/lib/utils';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  title?: string;
  subtitle?: string;
  dark?: boolean;
}

export function FAQ({ items, title = 'Domande Frequenti', subtitle, dark = false }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className={cn('py-24', dark ? 'bg-[#0f172a]' : 'bg-white')}>
      <Container>
        <FadeIn className="text-center mb-12">
          <h2 className={cn('text-3xl sm:text-4xl font-bold mb-4', dark ? 'text-white' : 'text-slate-900')}>
            {title}
          </h2>
          {subtitle && (
            <p className={cn('text-lg max-w-2xl mx-auto', dark ? 'text-slate-400' : 'text-slate-500')}>
              {subtitle}
            </p>
          )}
        </FadeIn>

        <div className="max-w-3xl mx-auto space-y-3">
          {items.map((item, index) => (
            <FadeIn key={index} delay={index * 0.05}>
              <div
                className={cn(
                  'rounded-2xl border overflow-hidden transition-all duration-200',
                  dark
                    ? openIndex === index
                      ? 'border-[#045CB4]/50 bg-slate-800'
                      : 'border-slate-700 bg-slate-800/50'
                    : openIndex === index
                    ? 'border-blue-200 bg-blue-50/50'
                    : 'border-slate-200 bg-white'
                )}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className={cn(
                    'flex w-full items-center justify-between px-6 py-4 text-left font-semibold transition-colors',
                    dark
                      ? 'text-white hover:text-[#58D0F5]'
                      : 'text-slate-900 hover:text-[#045CB4]'
                  )}
                >
                  {item.question}
                  <motion.span
                    animate={{ rotate: openIndex === index ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                      'flex-shrink-0 ml-4',
                      dark ? 'text-slate-400' : 'text-slate-400',
                      openIndex === index && (dark ? 'text-[#58D0F5]' : 'text-[#045CB4]')
                    )}
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </motion.span>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className={cn('px-6 pb-4 leading-relaxed', dark ? 'text-slate-300' : 'text-slate-600')}>
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
