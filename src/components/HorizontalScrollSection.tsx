"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    number: "01",
    title: "SEO & GEO as a Service",
    tagline: "Allineare visibilità, mercato e conversioni",
    description:
      "Domina i risultati di ricerca con strategie SEO data-driven e ottimizzazione GEO avanzata. Portiamo il tuo brand dove i tuoi clienti cercano, costruendo visibilità duratura e traffico qualificato.",
    href: "/servizi/seo-geo",
    color: "var(--cyan)",
    svgPath: "M10 80 C30 60, 70 20, 120 40 S180 80, 240 60",
  },
  {
    number: "02",
    title: "Sviluppo Software Custom",
    tagline: "Trasformare le esigenze in soluzioni digitali performanti",
    description:
      "Costruiamo prodotti digitali su misura che risolvono problemi reali. Da web app complesse a piattaforme SaaS, ogni riga di codice serve uno scopo: far crescere il tuo business.",
    href: "/servizi/software",
    color: "var(--lime)",
    svgPath: "M20 60 L80 20 L140 60 L200 20 L260 60",
  },
  {
    number: "03",
    title: "Trasformazione Digitale & AI",
    tagline: "Unire talenti, tecnologia e processi per crescere",
    description:
      "Integriamo intelligenza artificiale nei processi aziendali per automatizzare, ottimizzare e scalare. Non solo consulenza: eseguiamo la trasformazione insieme a te, passo dopo passo.",
    href: "/servizi/trasformazione-digitale",
    color: "var(--primary)",
    svgPath: "M10 40 Q80 10, 130 50 T250 40",
  },
];

function SlideCard({ slide, index }: { slide: (typeof slides)[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const path = svgRef.current;
    if (!card || !path) return;

    // SVG stroke animation
    const length = path.getTotalLength();
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    ScrollTrigger.create({
      trigger: card,
      start: "top 70%",
      onEnter: () => {
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: "power2.out",
        });
      },
    });
  }, []);

  return (
    <div
      ref={cardRef}
      className="slide-card flex-none w-[85vw] md:w-[65vw] lg:w-[50vw] h-full flex flex-col justify-between p-8 md:p-12 rounded-3xl border border-[var(--border)] mr-6"
      style={{
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div>
        {/* Number */}
        <div
          className="text-[120px] leading-none font-bold mb-4"
          style={{
            fontFamily: "Syne, sans-serif",
            color: "rgba(255,255,255,0.04)",
            letterSpacing: "-0.05em",
          }}
        >
          {slide.number}
        </div>

        {/* SVG decoration */}
        <svg
          className="w-full mb-8"
          height="80"
          viewBox="0 0 280 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            ref={svgRef}
            d={slide.svgPath}
            stroke={slide.color}
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>

      <div>
        <p
          className="text-xs tracking-widest uppercase mb-4"
          style={{ color: slide.color }}
        >
          {slide.tagline}
        </p>
        <h3
          className="heading-md mb-4"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          {slide.title}
        </h3>
        <p
          className="text-sm leading-relaxed mb-8 max-w-md"
          style={{ color: "rgba(240,240,240,0.5)" }}
        >
          {slide.description}
        </p>
        <Link
          href={slide.href}
          className="inline-flex items-center gap-2 text-sm font-medium"
          style={{ color: slide.color }}
        >
          Scopri di più
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default function HorizontalScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const sticky = stickyRef.current;
    const track = trackRef.current;

    if (!container || !sticky || !track) return;

    const ctx = gsap.context(() => {
      const totalWidth = track.scrollWidth - sticky.offsetWidth;

      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: `+=${totalWidth + window.innerHeight}`,
        pin: sticky,
        scrub: 1,
        onUpdate: (self) => {
          gsap.set(track, { x: -self.progress * totalWidth });
        },
      });

      // Title fade on scroll
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: container,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="h-scroll-container relative">
      <div ref={stickyRef} className="h-scroll-sticky flex flex-col">
        {/* Section header */}
        <div
          ref={titleRef}
          className="px-6 md:px-10 pt-16 pb-8 opacity-0"
          style={{ maxWidth: "100vw" }}
        >
          <div className="max-w-screen-xl mx-auto flex items-end justify-between">
            <div>
              <span className="tag mb-4 block w-fit">Offerta</span>
              <h2
                className="heading-lg"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                Cosa posso fare
                <br />
                <span style={{ color: "var(--cyan)" }}>per te</span>
              </h2>
            </div>
            <p
              className="hidden lg:block text-sm max-w-xs text-right leading-relaxed"
              style={{ color: "rgba(240,240,240,0.4)" }}
            >
              Tre aree di intervento, una visione unica: trasformare la tua
              presenza digitale in un asset competitivo.
            </p>
          </div>
        </div>

        {/* Horizontal scroll track */}
        <div className="flex-1 overflow-hidden px-6 md:px-10 pb-12">
          <div
            ref={trackRef}
            className="flex items-stretch h-full"
            style={{ willChange: "transform" }}
          >
            {slides.map((slide, i) => (
              <SlideCard key={i} slide={slide} index={i} />
            ))}
            {/* Extra space at end */}
            <div className="flex-none w-[20vw]" />
          </div>
        </div>
      </div>
    </div>
  );
}
