"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Step {
  number: string;
  title: string;
  description: string;
}

interface StepsSectionProps {
  steps: Step[];
  title?: string;
}

export default function StepsSection({ steps, title = "Il processo" }: StepsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll(".step-item");
      if (!items) return;

      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 px-6 md:px-10 section-divider"
    >
      <div className="max-w-screen-xl mx-auto">
        <div className="mb-16">
          <span className="tag mb-4 block w-fit">Processo</span>
          <h2
            className="heading-lg"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            {title}
          </h2>
        </div>

        <div className="flex flex-col">
          {steps.map((step, i) => (
            <div
              key={i}
              className="step-item group flex flex-col md:flex-row md:items-start gap-6 md:gap-12 py-10 border-b border-[var(--border)] opacity-0 cursor-default"
            >
              {/* Number */}
              <div className="step-number flex-none w-20 md:w-32 text-right md:text-left">
                {step.number}
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3
                  className="text-xl md:text-2xl font-semibold mb-3 group-hover:text-[var(--lime)] transition-colors duration-300"
                  style={{ fontFamily: "Syne, sans-serif" }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-base leading-relaxed max-w-2xl"
                  style={{ color: "rgba(240,240,240,0.45)" }}
                >
                  {step.description}
                </p>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex flex-none w-12 h-12 rounded-full border border-[var(--border)] items-center justify-center group-hover:border-[var(--lime)] group-hover:bg-[var(--lime)] transition-all duration-300">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="group-hover:text-black transition-colors"
                >
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
