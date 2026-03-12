"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: "→",
    title: "Product centric,\nBusiness driven",
    description:
      "Ogni decisione tecnica è guidata da obiettivi di business reali. Non costruiamo per costruire: costruiamo per far crescere.",
  },
  {
    icon: "◆",
    title: "Eccellenza\noperativa",
    description:
      "Processi ottimizzati, codice pulito, deliverable misurabili. L'eccellenza non è un obiettivo, è uno standard.",
  },
  {
    icon: "▲",
    title: "DNA di\nDoers",
    description:
      "Non solo strategia: esecuzione concreta. Le idee restano idee finché qualcuno non le realizza. Io le realizzo.",
  },
  {
    icon: "○",
    title: "Trasparenza\ntotale",
    description:
      "Comunicazione chiara, nessuna sorpresa sui costi, reportistica dettagliata. Sai sempre dove siamo e dove andiamo.",
  },
];

export default function ValuePropositions() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll(".value-card");
      if (!cards) return;

      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 px-6 md:px-10 section-divider"
    >
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <span className="tag mb-6 block w-fit">Postura</span>
          <h2
            className="heading-lg max-w-2xl"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Come lavoro,
            <br />
            perché funziona
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--border)]">
          {values.map((value, i) => (
            <div
              key={i}
              className="value-card bg-[var(--bg)] p-8 md:p-10 group hover:bg-white/[0.02] transition-colors duration-300 opacity-0"
            >
              <div
                className="text-2xl mb-8 block"
                style={{ color: "var(--cyan)", fontFamily: "monospace" }}
              >
                {value.icon}
              </div>
              <h3
                className="text-xl font-semibold mb-4 whitespace-pre-line leading-snug"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                {value.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(240,240,240,0.45)" }}
              >
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
