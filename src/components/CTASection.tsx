"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!titleRef.current) return;

      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
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
      className="py-32 md:py-48 px-6 md:px-10 section-divider relative overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(4,107,210,0.1) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-screen-xl mx-auto relative z-10 text-center">
        <span className="tag mb-8 block w-fit mx-auto">Parliamoci</span>

        <h2
          ref={titleRef}
          className="heading-xl mb-8 max-w-4xl mx-auto opacity-0"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          Un&apos;idea, un progetto, o semplicemente vuoi sfidare lo{" "}
          <span style={{ color: "var(--cyan)" }}>status quo</span>?
        </h2>

        <p
          className="text-base md:text-lg mb-12 max-w-xl mx-auto leading-relaxed"
          style={{ color: "rgba(240,240,240,0.45)" }}
        >
          Trasformiamo la tua visione in realtà. Niente meeting infiniti, niente
          promesse vuote. Solo risultati.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/contatti" className="btn-primary text-base !py-4 !px-8">
            Parliamone!
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M3.5 9h11M10 5l4.5 4-4.5 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <a
            href="mailto:info@lucasammarco.com"
            className="btn-outline text-base !py-4 !px-8"
          >
            info@lucasammarco.com
          </a>
        </div>
      </div>
    </section>
  );
}
