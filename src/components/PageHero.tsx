"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface PageHeroProps {
  tag?: string;
  title: string;
  subtitle?: string;
  description?: string;
  accentColor?: string;
}

export default function PageHero({
  tag,
  title,
  subtitle,
  description,
  accentColor = "var(--cyan)",
}: PageHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      const elements = heroRef.current?.querySelectorAll(".animate-in");
      if (elements) {
        tl.fromTo(
          elements,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
          }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="pt-40 pb-24 md:pt-48 md:pb-32 px-6 md:px-10 relative overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70% 50% at 50% 0%, rgba(4,92,180,0.08) 0%, transparent 70%)`,
        }}
      />

      <div className="max-w-screen-xl mx-auto relative z-10">
        {tag && (
          <span className="tag mb-6 block w-fit animate-in" style={{ opacity: 0 }}>
            {tag}
          </span>
        )}

        <h1
          className="heading-xl mb-6 max-w-4xl animate-in"
          style={{
            fontFamily: "Syne, sans-serif",
            opacity: 0,
          }}
          dangerouslySetInnerHTML={{
            __html: title.replace(
              /\[([^\]]+)\]/g,
              `<span style="color: ${accentColor}">$1</span>`
            ),
          }}
        />

        {subtitle && (
          <p
            className="text-xl md:text-2xl font-medium mb-6 animate-in"
            style={{
              fontFamily: "Syne, sans-serif",
              color: accentColor,
              opacity: 0,
            }}
          >
            {subtitle}
          </p>
        )}

        {description && (
          <p
            className="text-base md:text-lg max-w-2xl leading-relaxed animate-in"
            style={{ color: "rgba(240,240,240,0.5)", opacity: 0 }}
          >
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
