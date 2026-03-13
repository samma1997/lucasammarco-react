'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Footer from '@/components/Footer'
import FlipButton from '@/components/FlipButton'

gsap.registerPlugin(ScrollTrigger)

export default function AboutPage() {
  const heroRef = useRef<HTMLHeadingElement>(null)
  const heroSubRef = useRef<HTMLParagraphElement>(null)
  const crewSectionRef = useRef<HTMLElement>(null)
  const conceptSectionRef = useRef<HTMLElement>(null)
  const missionSectionRef = useRef<HTMLElement>(null)
  const ctaSectionRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Hero entrance */
      gsap.fromTo(
        heroRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }
      )

      gsap.fromTo(
        heroSubRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.3 }
      )

      /* Sections fade + slide up on scroll */
      const sections = [
        crewSectionRef.current,
        conceptSectionRef.current,
        missionSectionRef.current,
      ]

      sections.forEach((el) => {
        if (!el) return
        gsap.fromTo(
          el,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          }
        )
      })

      /* Stats counter-style stagger */
      if (statsRef.current) {
        const items = statsRef.current.querySelectorAll<HTMLElement>('.about-stat')
        gsap.fromTo(
          items,
          { y: 40, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.65,
            ease: 'back.out(1.4)',
            stagger: 0.12,
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      /* Concept image cards stagger */
      const conceptCards =
        conceptSectionRef.current?.querySelectorAll<HTMLElement>('.concept-card') ?? []
      if (conceptCards.length) {
        gsap.fromTo(
          conceptCards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: conceptSectionRef.current,
              start: 'top 78%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      /* CTA section */
      if (ctaSectionRef.current) {
        gsap.fromTo(
          ctaSectionRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: ctaSectionRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <>
      <style>{`
        .about-page {
          background-color: var(--yellow-bg);
          color: var(--theme-text-dark);
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* ---- Hero ---- */
        .about-hero {
          padding-top: var(--section-space-page-top);
          padding-bottom: var(--section-space-main);
          padding-inline: var(--site-margin);
          max-width: 100rem;
          margin-inline: auto;
          position: relative;
        }

        .about-hero__eyebrow {
          font-family: 'Robotocondensed', Arial, sans-serif;
          font-size: var(--font-size-h5);
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(64, 16, 17, 0.5);
          margin-bottom: 1.25rem;
          display: block;
        }

        .about-hero__heading {
          max-width: 20ch;
          color: var(--theme-text-dark);
          line-height: 0.88;
        }

        .about-hero__sub {
          margin-top: var(--space-3);
          font-size: var(--font-size-text-large);
          line-height: 1.55;
          color: rgba(64, 16, 17, 0.65);
          max-width: 52ch;
        }

        .about-hero__deco {
          position: absolute;
          top: 0;
          right: 0;
          width: clamp(180px, 28vw, 420px);
          height: clamp(180px, 28vw, 420px);
          border-radius: 50%;
          background: rgba(64, 16, 17, 0.06);
          pointer-events: none;
        }

        /* ---- Divider ---- */
        .about-divider {
          width: 100%;
          height: 1px;
          background: rgba(64, 16, 17, 0.15);
        }

        /* ---- Stats bar ---- */
        .about-stats-bar {
          padding-block: var(--space-4);
          padding-inline: var(--site-margin);
          max-width: 100rem;
          margin-inline: auto;
        }

        .about-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(1rem, 3vw, 2rem);
        }

        @media (max-width: 767px) {
          .about-stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 400px) {
          .about-stats-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .about-stat {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          padding: clamp(1.25rem, 2vw, 2rem);
          border: 1px solid rgba(64, 16, 17, 0.15);
          border-radius: 10px;
          background: rgba(64, 16, 17, 0.04);
        }

        .about-stat__value {
          font-family: 'Bueno', Impact, sans-serif;
          font-size: var(--font-size-h2);
          font-weight: 700;
          line-height: 0.9;
          text-transform: uppercase;
          color: var(--theme-text-dark);
        }

        .about-stat__label {
          font-family: 'Robotocondensed', Arial, sans-serif;
          font-size: var(--font-size-h5);
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(64, 16, 17, 0.55);
        }

        /* ---- Sections ---- */
        .about-section {
          padding-top: var(--section-space-main);
          padding-bottom: var(--section-space-main);
          padding-inline: var(--site-margin);
          max-width: 100rem;
          margin-inline: auto;
        }

        .about-section--two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(2.5rem, 6vw, 8rem);
          align-items: center;
        }

        @media (max-width: 900px) {
          .about-section--two-col {
            grid-template-columns: 1fr;
            gap: var(--space-3);
          }
        }

        .about-section__label {
          font-family: 'Robotocondensed', Arial, sans-serif;
          font-size: var(--font-size-h5);
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(64, 16, 17, 0.45);
          margin-bottom: 1rem;
          display: block;
        }

        .about-section__heading {
          color: var(--theme-text-dark);
          margin-bottom: var(--space-2);
        }

        .about-section__body {
          font-size: var(--font-size-text-large);
          line-height: 1.6;
          color: rgba(64, 16, 17, 0.7);
        }

        .about-section__body + .about-section__body {
          margin-top: var(--space-15);
        }

        /* ---- Concept image cards ---- */
        .concept-cards-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(0.75rem, 1.5vw, 1.25rem);
        }

        @media (max-width: 400px) {
          .concept-cards-grid {
            grid-template-columns: 1fr;
          }
        }

        .concept-card {
          border-radius: 10px;
          overflow: hidden;
          position: relative;
          aspect-ratio: 4 / 3;
          background: rgba(64, 16, 17, 0.08);
        }

        .concept-card:first-child {
          grid-column: span 2;
          aspect-ratio: 16 / 9;
        }

        @media (max-width: 400px) {
          .concept-card:first-child {
            grid-column: span 1;
          }
        }

        .concept-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .concept-card__label {
          position: absolute;
          bottom: 0.875rem;
          left: 0.875rem;
          font-family: 'Robotocondensed', Arial, sans-serif;
          font-size: var(--font-size-h6);
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #f1f0ec;
          background: rgba(25, 15, 10, 0.72);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          padding: 0.3em 0.8em;
          border-radius: 6px;
        }

        /* ---- Mission section ---- */
        .about-mission {
          background: var(--theme-text-dark);
          padding-block: var(--section-space-large);
          padding-inline: var(--site-margin);
        }

        .about-mission__inner {
          max-width: 100rem;
          margin-inline: auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(2.5rem, 6vw, 8rem);
          align-items: start;
        }

        @media (max-width: 860px) {
          .about-mission__inner {
            grid-template-columns: 1fr;
          }
        }

        .about-mission__heading {
          color: var(--yellow-bg);
          line-height: 0.88;
        }

        .about-mission__label {
          font-family: 'Robotocondensed', Arial, sans-serif;
          font-size: var(--font-size-h5);
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255, 236, 0, 0.45);
          margin-bottom: 1rem;
          display: block;
        }

        .about-mission__body {
          font-size: var(--font-size-text-large);
          line-height: 1.6;
          color: rgba(241, 240, 236, 0.65);
        }

        .about-mission__body + .about-mission__body {
          margin-top: var(--space-15);
        }

        .about-mission__pillars {
          margin-top: var(--space-3);
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .about-mission__pillar {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1.25rem;
          border: 1px solid rgba(255, 236, 0, 0.15);
          border-radius: 10px;
          background: rgba(255, 236, 0, 0.04);
        }

        .about-mission__pillar-icon {
          font-size: 1.5rem;
          flex-shrink: 0;
          margin-top: 0.1em;
        }

        .about-mission__pillar-title {
          font-family: 'Facultyglyphic', 'Palatino Linotype', sans-serif;
          font-size: var(--font-size-h4);
          font-weight: 400;
          color: var(--yellow-bg);
          margin-bottom: 0.35rem;
        }

        .about-mission__pillar-desc {
          font-size: var(--font-size-text-small);
          line-height: 1.5;
          color: rgba(241, 240, 236, 0.5);
        }

        /* ---- CTA ---- */
        .about-cta {
          padding-block: var(--section-space-large);
          padding-inline: var(--site-margin);
          max-width: 100rem;
          margin-inline: auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: var(--space-2);
        }

        .about-cta__eyebrow {
          font-family: 'Robotocondensed', Arial, sans-serif;
          font-size: var(--font-size-h5);
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(64, 16, 17, 0.5);
        }

        .about-cta__heading {
          color: var(--theme-text-dark);
          max-width: 16ch;
        }

        .about-cta__sub {
          font-size: var(--font-size-text-large);
          color: rgba(64, 16, 17, 0.6);
          max-width: 46ch;
          line-height: 1.5;
        }

        .about-cta__actions {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: center;
          margin-top: var(--space-1);
        }
      `}</style>

      <div className="about-page theme-yellow">
        {/* ---- Hero ---- */}
        <section className="about-hero">
          <div className="about-hero__deco" aria-hidden="true" />
          <span className="about-hero__eyebrow">Our Story</span>
          <h1 className="u-text-h1 about-hero__heading" ref={heroRef}>
            Once upon a dime... MoMoney was born
          </h1>
          <p className="about-hero__sub" ref={heroSubRef}>
            We built the museum we always wanted to visit — one that makes the wild, messy,
            endlessly human story of money impossible to look away from.
          </p>
        </section>

        <div className="about-divider" />

        {/* ---- Stats bar ---- */}
        <div className="about-stats-bar">
          <div className="about-stats-grid" ref={statsRef}>
            {[
              { value: '10', label: 'Immersive Exhibits' },
              { value: '2', label: 'Floors of Discovery' },
              { value: '5K+', label: 'Sq Ft of Experience' },
              { value: '100%', label: 'Worth Every Penny' },
            ].map((stat) => (
              <div key={stat.label} className="about-stat">
                <span className="about-stat__value">{stat.value}</span>
                <span className="about-stat__label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="about-divider" />

        {/* ---- Crew section ---- */}
        <section className="about-section about-section--two-col" ref={crewSectionRef}>
          <div>
            <span className="about-section__label">Who we are</span>
            <h2 className="u-text-h2 about-section__heading">
              We&rsquo;re the MoMoney crew
            </h2>
          </div>
          <div>
            <p className="about-section__body">
              MoMoney isn&rsquo;t a stuffy institution — it&rsquo;s a crew of storytellers,
              designers, educators, and full-on money nerds who believe financial literacy
              deserves a stage worthy of its importance.
            </p>
            <p className="about-section__body">
              We spent years frustrated that the most powerful force in modern life — money —
              was taught through dry textbooks and fear. So we burned the textbook and built a
              museum instead. Every exhibit, every activation, every neon sign in this building
              exists because we asked one question: what if learning about money felt
              like the best night out you&rsquo;ve ever had?
            </p>
            <p className="about-section__body">
              The answer is MoMoney. And we&rsquo;re just getting started.
            </p>
          </div>
        </section>

        <div className="about-divider" />

        {/* ---- Concept section ---- */}
        <section className="about-section about-section--two-col" ref={conceptSectionRef}>
          <div className="concept-cards-grid">
            <div className="concept-card">
              <Image
                src="/images/showcase/6976bcdf8a5346d44569dcaa_02 BB MoMoney Museum-BAT08798.avif"
                alt="MoMoney Museum interior"
                fill
                sizes="(max-width: 900px) 100vw, 45vw"
                style={{ objectFit: 'cover' }}
              />
              <span className="concept-card__label">Ground Floor</span>
            </div>
            <div className="concept-card">
              <Image
                src="/images/showcase/697a747e577ab58c0bf5445c_16. Lazer Maze.avif"
                alt="The MoMoney Bank laser maze"
                fill
                sizes="(max-width: 900px) 50vw, 22vw"
                style={{ objectFit: 'cover' }}
              />
              <span className="concept-card__label">Laser Maze</span>
            </div>
            <div className="concept-card">
              <Image
                src="/images/showcase/6976c76622bf4018cd90ae6a_18. Vault Posedown.avif"
                alt="Vault photo ops"
                fill
                sizes="(max-width: 900px) 50vw, 22vw"
                style={{ objectFit: 'cover' }}
              />
              <span className="concept-card__label">The Vault</span>
            </div>
          </div>

          <div>
            <span className="about-section__label">The Experience</span>
            <h2 className="u-text-h2 about-section__heading">
              Built different, on purpose
            </h2>
            <p className="about-section__body">
              Across two floors and ten exhibits, MoMoney turns passive visitors into active
              participants. Design your own currency in Money, Rebooted. Stage a cinematic
              bank heist in The MoMoney Bank. Pan for gold in the Den, then test your
              trading instincts on the live Market Madness floor.
            </p>
            <p className="about-section__body">
              Our AI-powered MoKnowledge Lab hands out real financial literacy
              certifications — because inspiration without knowledge is just a vibe.
              Every experience is engineered to be shareable, repeatable, and genuinely
              life-changing.
            </p>
          </div>
        </section>

        {/* ---- Mission section (dark panel) ---- */}
        <section className="about-mission" ref={missionSectionRef}>
          <div className="about-mission__inner">
            <div>
              <span className="about-mission__label">Our Mission</span>
              <h2 className="u-text-h2 about-mission__heading">
                Making financial literacy irresistible
              </h2>
            </div>
            <div>
              <p className="about-mission__body">
                Financial illiteracy costs Americans billions every year — in bad debt,
                missed opportunities, and plain old stress. We exist to close that gap,
                one unforgettable visit at a time.
              </p>
              <p className="about-mission__body">
                MoMoney is proof that education and entertainment belong together. When
                people are excited, curious, and having fun, they learn faster and retain
                more. That&rsquo;s not an opinion — it&rsquo;s neuroscience. And it&rsquo;s
                our entire design philosophy.
              </p>

              <div className="about-mission__pillars">
                {[
                  {
                    icon: '💡',
                    title: 'Educate',
                    desc: 'Real financial knowledge baked into every activation — from barter theory to blockchain.',
                  },
                  {
                    icon: '✦',
                    title: 'Engage',
                    desc: 'Hands-on, sensory, social experiences that stick long after you leave the building.',
                  },
                  {
                    icon: '◎',
                    title: 'Empower',
                    desc: 'Visitors leave with tools, certifications, and the confidence to make money moves.',
                  },
                ].map((pillar) => (
                  <div key={pillar.title} className="about-mission__pillar">
                    <span className="about-mission__pillar-icon" aria-hidden="true">
                      {pillar.icon}
                    </span>
                    <div>
                      <p className="about-mission__pillar-title">{pillar.title}</p>
                      <p className="about-mission__pillar-desc">{pillar.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ---- CTA ---- */}
        <section className="about-cta" ref={ctaSectionRef}>
          <span className="about-cta__eyebrow">Come through</span>
          <h2 className="u-text-h2 about-cta__heading">Make it rain</h2>
          <p className="about-cta__sub">
            Ten exhibits, two floors, zero boring moments. Book your tickets and write your
            own chapter in the story of money.
          </p>
          <div className="about-cta__actions">
            <FlipButton href="/tickets">Book Tickets</FlipButton>
            <FlipButton href="/exhibits" variant="secondary">
              View Exhibits
            </FlipButton>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}
