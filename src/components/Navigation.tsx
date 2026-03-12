"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

const offerItems = [
  { label: "SEO & GEO as a Service", href: "/servizi/seo-geo" },
  { label: "Sviluppo Software Custom", href: "/servizi/software" },
  { label: "Trasformazione Digitale & AI", href: "/servizi/trasformazione-digitale" },
];

const expertiseItems = [
  { label: "Audit SEO & Ottimizzazione", href: "/expertise/audit-seo" },
  { label: "Strategia GEO & Local SEO", href: "/expertise/geo-local-seo" },
  { label: "Analisi e Posizionamento Strategico", href: "/expertise/analisi-strategica" },
  { label: "Web App & Piattaforme SaaS", href: "/expertise/web-app-saas" },
  { label: "E-Commerce Avanzato", href: "/expertise/ecommerce" },
  { label: "Sito Vetrina Corporate", href: "/expertise/sito-vetrina" },
  { label: "Automazione AI & Workflow", href: "/expertise/automazione-ai" },
  { label: "App Mobile Cross-Platform", href: "/expertise/app-mobile" },
  { label: "Data Strategy & Business Intelligence", href: "/expertise/data-strategy" },
];

export default function Navigation() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubMenu, setMobileSubMenu] = useState<string | null>(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      window.requestAnimationFrame(() => {
        const currentY = window.scrollY;
        if (currentY > 100) {
          if (currentY > lastScrollY.current) {
            setIsVisible(false);
          } else {
            setIsVisible(true);
          }
        } else {
          setIsVisible(true);
        }
        lastScrollY.current = currentY;
        ticking.current = false;
      });
      ticking.current = true;
    }
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (e.clientY < 40) setIsVisible(true);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleScroll, handleMouseMove]);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  const navStyle: React.CSSProperties = {
    transform: isVisible ? "translateY(0)" : "translateY(-100%)",
    transition: "transform 0.4s cubic-bezier(0.76, 0, 0.24, 1)",
  };

  return (
    <>
      <nav
        ref={navRef}
        style={navStyle}
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-5"
      >
        <div className="max-w-screen-xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-[var(--fg)] font-semibold text-[15px] tracking-tight z-10"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Luca Sammarco
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Offerta Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown("offerta")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className="flex items-center gap-1 text-[13px] text-[var(--fg)] opacity-70 hover:opacity-100 transition-opacity font-medium">
                Offerta
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {openDropdown === "offerta" && (
                <div className="absolute top-full left-0 mt-3 w-72 rounded-2xl border border-[var(--border)] bg-[rgba(15,15,15,0.95)] nav-dropdown p-3 shadow-2xl">
                  {offerItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-3 rounded-xl text-[13px] text-[var(--fg)] opacity-60 hover:opacity-100 hover:bg-white/5 transition-all"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/approccio" className="text-[13px] text-[var(--fg)] opacity-70 hover:opacity-100 transition-opacity font-medium">
              Approccio
            </Link>

            {/* Expertise Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown("expertise")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className="flex items-center gap-1 text-[13px] text-[var(--fg)] opacity-70 hover:opacity-100 transition-opacity font-medium">
                Expertise
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {openDropdown === "expertise" && (
                <div className="absolute top-full left-0 mt-3 w-80 rounded-2xl border border-[var(--border)] bg-[rgba(15,15,15,0.95)] nav-dropdown p-3 shadow-2xl grid grid-cols-1 gap-0">
                  {expertiseItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2.5 rounded-xl text-[13px] text-[var(--fg)] opacity-60 hover:opacity-100 hover:bg-white/5 transition-all"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/progetti" className="text-[13px] text-[var(--fg)] opacity-70 hover:opacity-100 transition-opacity font-medium">
              Progetti
            </Link>

            <Link href="/chi-sono" className="text-[13px] text-[var(--fg)] opacity-70 hover:opacity-100 transition-opacity font-medium">
              Chi Sono
            </Link>
          </div>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <Link
              href="/contatti"
              className="hidden lg:flex btn-primary text-[13px] !py-2.5 !px-5"
            >
              Contattami
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>

            {/* Hamburger */}
            <button
              className="lg:hidden flex flex-col gap-1.5 p-2 z-[110] relative"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              <span
                style={{
                  width: 22,
                  height: 1.5,
                  background: "var(--fg)",
                  display: "block",
                  transition: "all 0.3s ease",
                  transformOrigin: "center",
                  transform: mobileOpen ? "rotate(45deg) translate(2px, 3px)" : "none",
                }}
              />
              <span
                style={{
                  width: 22,
                  height: 1.5,
                  background: "var(--fg)",
                  display: "block",
                  transition: "all 0.3s ease",
                  opacity: mobileOpen ? 0 : 1,
                }}
              />
              <span
                style={{
                  width: 22,
                  height: 1.5,
                  background: "var(--fg)",
                  display: "block",
                  transition: "all 0.3s ease",
                  transformOrigin: "center",
                  transform: mobileOpen ? "rotate(-45deg) translate(2px, -3px)" : "none",
                }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className="mobile-menu lg:hidden"
        style={{ transform: mobileOpen ? "translateX(0)" : "translateX(100%)" }}
      >
        <div className="flex flex-col h-full px-6 pt-24 pb-10 overflow-y-auto">
          <nav className="flex flex-col gap-0">
            {/* Offerta */}
            <div className="border-b border-[var(--border)]">
              <button
                className="flex items-center justify-between w-full py-5 text-2xl font-semibold"
                style={{ fontFamily: "Syne, sans-serif" }}
                onClick={() => setMobileSubMenu(mobileSubMenu === "offerta" ? null : "offerta")}
              >
                Offerta
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ transform: mobileSubMenu === "offerta" ? "rotate(90deg)" : "none", transition: "transform 0.3s ease" }}>
                  <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {mobileSubMenu === "offerta" && (
                <div className="flex flex-col gap-2 pb-4 pl-4">
                  {offerItems.map((item) => (
                    <Link key={item.href} href={item.href} className="text-base opacity-60 py-2">
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/approccio" className="py-5 text-2xl font-semibold border-b border-[var(--border)]" style={{ fontFamily: "Syne, sans-serif" }}>
              Approccio
            </Link>

            {/* Expertise */}
            <div className="border-b border-[var(--border)]">
              <button
                className="flex items-center justify-between w-full py-5 text-2xl font-semibold"
                style={{ fontFamily: "Syne, sans-serif" }}
                onClick={() => setMobileSubMenu(mobileSubMenu === "expertise" ? null : "expertise")}
              >
                Expertise
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ transform: mobileSubMenu === "expertise" ? "rotate(90deg)" : "none", transition: "transform 0.3s ease" }}>
                  <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {mobileSubMenu === "expertise" && (
                <div className="flex flex-col gap-2 pb-4 pl-4">
                  {expertiseItems.map((item) => (
                    <Link key={item.href} href={item.href} className="text-base opacity-60 py-2">
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/progetti" className="py-5 text-2xl font-semibold border-b border-[var(--border)]" style={{ fontFamily: "Syne, sans-serif" }}>
              Progetti
            </Link>

            <Link href="/chi-sono" className="py-5 text-2xl font-semibold border-b border-[var(--border)]" style={{ fontFamily: "Syne, sans-serif" }}>
              Chi Sono
            </Link>
          </nav>

          <div className="mt-auto pt-8">
            <Link href="/contatti" className="btn-primary w-full justify-center text-base">
              Contattami
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <div className="mt-6 flex flex-col gap-2 text-sm opacity-40">
              <span>info@lucasammarco.com</span>
              <span>Monza, Italia</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
