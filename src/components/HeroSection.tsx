"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import CustomCursor from "./CustomCursor";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      // Animate title words
      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll(".word");
        tl.fromTo(
          words,
          { yPercent: 120, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.06,
            ease: "power3.out",
          },
          0
        );
      }

      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          0.5
        );
      }

      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current.children,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
          0.7
        );
      }

      if (scrollIndicatorRef.current) {
        tl.fromTo(
          scrollIndicatorRef.current,
          { opacity: 0 },
          { opacity: 0.4, duration: 0.6 },
          1
        );
        gsap.to(scrollIndicatorRef.current, {
          y: 8,
          repeat: -1,
          yoyo: true,
          duration: 1.2,
          ease: "sine.inOut",
          delay: 1.2,
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const titleWords = ["Trasformo", "idee", "in", "prodotti", "digitali", "che", "generano", "crescita"];

  return (
    <section
      ref={heroRef}
      className="home-hero relative min-h-screen flex flex-col justify-end pb-16 md:pb-20 px-6 md:px-10 overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      <CustomCursor />

      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(4,92,180,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Grid decoration */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="max-w-screen-xl mx-auto w-full relative z-10">
        {/* Tag */}
        <div className="mb-8">
          <span className="tag">Monza, Italia — Disponibile</span>
        </div>

        {/* Title */}
        <h1
          ref={titleRef}
          className="heading-xl mb-8 max-w-5xl"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          {titleWords.map((word, i) => (
            <span
              key={i}
              className="split-wrapper inline-block mr-[0.25em]"
            >
              <span className="word inline-block" style={{ opacity: 0 }}>
                {word}
              </span>
            </span>
          ))}
        </h1>

        {/* Subtitle + CTA row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <p
            ref={subtitleRef}
            className="text-base md:text-lg max-w-xl leading-relaxed opacity-0"
            style={{ color: "rgba(240,240,240,0.55)" }}
          >
            Strategia digitale, sviluppo software e innovazione AI per aziende
            che vogliono dominare il mercato
          </p>

          <div ref={ctaRef} className="flex items-center gap-4">
            <Link href="/contatti" className="btn-primary">
              Parliamone
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
            <Link href="/progetti" className="btn-outline">
              Vedi progetti
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0"
      >
        <span className="text-[11px] tracking-widest uppercase" style={{ color: "rgba(240,240,240,0.3)" }}>
          Scroll
        </span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
          <rect x="1" y="1" width="14" height="22" rx="7" stroke="rgba(240,240,240,0.2)" strokeWidth="1.5" />
          <rect x="6" y="4" width="4" height="6" rx="2" fill="rgba(88,208,245,0.6)" />
        </svg>
      </div>
    </section>
  );
}
