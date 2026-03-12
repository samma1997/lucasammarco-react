"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Dubai Market Pulse",
    description: "Piattaforma SaaS per analisi immobiliare Dubai",
    service: "Sviluppo Software & Data Strategy",
    href: "/progetti",
    gradient: "linear-gradient(135deg, #045CB4 0%, #046BD2 50%, #58D0F5 100%)",
    year: "2024",
  },
  {
    title: "WUP Coach Booking",
    description: "Sistema di prenotazione coach per centri sportivi",
    service: "Web App & Automazione",
    href: "/progetti",
    gradient: "linear-gradient(135deg, #0A0A0A 0%, #1a1a2e 50%, #045CB4 100%)",
    year: "2024",
  },
  {
    title: "SammaPix",
    description: "Piattaforma di fotografia e contenuti visivi",
    service: "Brand Development & Product Design",
    href: "/progetti",
    gradient: "linear-gradient(135deg, #EAFD9C 0%, #a8c44a 50%, #2d4a00 100%)",
    year: "2023",
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;

    gsap.set(image, { clipPath: "inset(30% 30% 30% 30% round 16px)" });

    ScrollTrigger.create({
      trigger: cardRef.current,
      start: "top 75%",
      onEnter: () => {
        gsap.to(image, {
          clipPath: "inset(0% 0% 0% 0% round 16px)",
          duration: 1,
          ease: "power2.out",
        });
      },
    });
  }, []);

  return (
    <Link href={project.href} className="project-card group block">
      <div ref={cardRef} className="mb-6">
        {/* Image */}
        <div
          ref={imageRef}
          className="project-image w-full aspect-[4/3] rounded-2xl mb-4 overflow-hidden"
          style={{ background: project.gradient }}
        >
          <div
            className="w-full h-full flex items-center justify-center opacity-20"
            style={{ fontSize: "80px", fontFamily: "Syne, sans-serif", fontWeight: 700 }}
          >
            {index + 1 < 10 ? `0${index + 1}` : index + 1}
          </div>
        </div>

        {/* Meta */}
        <div className="flex items-center justify-between mb-3">
          <span className="tag">{project.service}</span>
          <span
            className="text-xs"
            style={{ color: "rgba(240,240,240,0.3)" }}
          >
            {project.year}
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-xl font-semibold mb-2 group-hover:text-[var(--cyan)] transition-colors"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          {project.title}
        </h3>
        <p
          className="text-sm leading-relaxed"
          style={{ color: "rgba(240,240,240,0.45)" }}
        >
          {project.description}
        </p>
      </div>
    </Link>
  );
}

export default function BusinessCases() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 section-divider overflow-hidden">
      {/* Marquee */}
      <div
        className="mb-16 overflow-hidden"
        style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
      >
        <div ref={marqueeRef} className="marquee-inner py-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={i}
              className="flex-none text-[80px] font-bold opacity-[0.06] pr-16 whitespace-nowrap"
              style={{
                fontFamily: "Syne, sans-serif",
                letterSpacing: "-0.03em",
              }}
            >
              Progetti &mdash; Case Study &mdash;
            </span>
          ))}
        </div>
      </div>

      <div className="px-6 md:px-10">
        <div className="max-w-screen-xl mx-auto">
          {/* Header */}
          <div className="flex items-end justify-between mb-16">
            <div>
              <span className="tag mb-4 block w-fit">Business Cases</span>
              <h2
                className="heading-lg"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                Risultati
                <br />
                <span style={{ color: "var(--lime)" }}>concreti</span>
              </h2>
            </div>
            <Link
              href="/progetti"
              className="hidden md:flex btn-outline"
            >
              Tutti i progetti
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

          {/* Projects grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            {projects.map((project, i) => (
              <ProjectCard key={i} project={project} index={i} />
            ))}
          </div>

          <div className="mt-8 md:hidden">
            <Link href="/progetti" className="btn-outline w-full justify-center">
              Tutti i progetti
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
