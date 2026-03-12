'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_ITEMS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100'
          : 'bg-transparent'
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#045CB4] text-white font-bold text-lg transition-transform group-hover:scale-105">
              LS
            </div>
            <span className="text-lg font-bold text-slate-900">
              Luca{' '}
              <span className="text-[#045CB4]">Sammarco</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              if ('children' in item && item.children) {
                return (
                  <div key={item.label} className="relative">
                    <button
                      onClick={() => setServicesOpen(!servicesOpen)}
                      onBlur={() => setTimeout(() => setServicesOpen(false), 150)}
                      className={cn(
                        'flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                        pathname.startsWith('/servizi')
                          ? 'text-[#045CB4] bg-blue-50'
                          : 'text-slate-600 hover:text-[#045CB4] hover:bg-slate-50'
                      )}
                    >
                      {item.label}
                      <svg
                        className={cn('h-4 w-4 transition-transform', servicesOpen && 'rotate-180')}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <AnimatePresence>
                      {servicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-2 w-64 rounded-2xl bg-white shadow-xl border border-slate-100 overflow-hidden"
                        >
                          <div className="p-2">
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className="block rounded-xl px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-[#045CB4] transition-colors"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    pathname === item.href
                      ? 'text-[#045CB4] bg-blue-50'
                      : 'text-slate-600 hover:text-[#045CB4] hover:bg-slate-50'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button href="/preventivo" size="md">
              Preventivo Gratuito
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex md:hidden items-center justify-center rounded-lg p-2 text-slate-600 hover:bg-slate-100"
            aria-label="Menu"
          >
            <span className="flex flex-col gap-1.5">
              <span
                className={cn(
                  'block h-0.5 w-6 bg-current transition-all duration-300',
                  mobileOpen && 'translate-y-2 rotate-45'
                )}
              />
              <span
                className={cn(
                  'block h-0.5 w-6 bg-current transition-all duration-300',
                  mobileOpen && 'opacity-0'
                )}
              />
              <span
                className={cn(
                  'block h-0.5 w-6 bg-current transition-all duration-300',
                  mobileOpen && '-translate-y-2 -rotate-45'
                )}
              />
            </span>
          </button>
        </div>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-white border-t border-slate-100 shadow-lg"
          >
            <div className="px-4 py-4 space-y-1">
              {NAV_ITEMS.map((item) => {
                if ('children' in item && item.children) {
                  return (
                    <div key={item.label}>
                      <p className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        {item.label}
                      </p>
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block rounded-lg px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-[#045CB4] transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  );
                }
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-[#045CB4] transition-colors"
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="pt-2">
                <Button href="/preventivo" className="w-full justify-center">
                  Preventivo Gratuito
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
