'use client'

import { useEffect, useRef } from 'react'
import Footer from '@/components/Footer'
import FlipButton from '@/components/FlipButton'

interface Feature {
  id: number
  icon: string
  number: string
  title: string
  description: string
  accentColor: string
}

const FEATURES: Feature[] = [
  {
    id: 1,
    icon: '✏',
    number: '01',
    title: 'Design Your Currency',
    description:
      'Channel your inner central banker. Use our custom printing stations to design, engrave, and take home your very own banknote — complete with serial numbers and watermarks.',
    accentColor: '#1ce585',
  },
  {
    id: 2,
    icon: '📈',
    number: '02',
    title: 'Stock Market Simulator',
    description:
      'Practice trading in real-time with virtual money. React to breaking news, market swings, and economic events in our fully simulated trading floor environment.',
    accentColor: '#f580db',
  },
  {
    id: 3,
    icon: '🔢',
    number: '03',
    title: 'Inflation Calculator',
    description:
      'See how money changes over time. Compare the purchasing power of $100 across 200 years of economic history and discover the forces that shape the value of currency.',
    accentColor: '#ffec00',
  },
]

export default function MoneyLabPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const descRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx: { revert?: () => void } = {}

    const initGsap = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        // Hero
        gsap.from('.moneylab-hero-title', {
          y: 80,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        })
        gsap.from('.moneylab-hero-subtitle', {
          y: 45,
          opacity: 0,
          duration: 0.9,
          delay: 0.2,
          ease: 'power3.out',
        })

        // Description section
        gsap.from('.moneylab-desc-text', {
          scrollTrigger: {
            trigger: descRef.current,
            start: 'top 80%',
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power2.out',
        })

        // Feature blocks
        gsap.from('.feature-block', {
          scrollTrigger: {
            trigger: featuresRef.current,
            start: 'top 75%',
          },
          y: 60,
          opacity: 0,
          duration: 0.75,
          stagger: 0.18,
          ease: 'power2.out',
        })

        // CTA
        gsap.from('.moneylab-cta-inner', {
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 85%',
          },
          scale: 0.95,
          opacity: 0,
          duration: 0.7,
          ease: 'back.out(1.5)',
        })
      })
    }

    initGsap()

    return () => {
      if (ctx.revert) ctx.revert()
    }
  }, [])

  return (
    <main
      className="theme-green"
      style={{
        backgroundColor: '#00592b',
        color: '#1ce585',
        minHeight: '100vh',
      }}
    >
      <style>{`
        .moneylab-hero {
          padding-top: var(--section-space-page-top);
          padding-bottom: var(--section-space-small);
          padding-inline: var(--site-margin);
          border-bottom: 1px solid rgba(28, 229, 133, 0.12);
        }
        .moneylab-hero-eyebrow {
          font-family: 'Robotocondensed', Arial, sans-serif;
          font-size: var(--font-size-h5);
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          opacity: 0.45;
          margin-bottom: 0.5rem;
        }
        .moneylab-hero-title {
          font-family: 'Bueno', Impact, sans-serif;
          font-size: var(--font-size-h1);
          font-weight: 700;
          line-height: 0.85;
          text-transform: uppercase;
          color: #1ce585;
          margin-bottom: 1.25rem;
        }
        .moneylab-hero-subtitle {
          font-family: 'Aileron', Arial, sans-serif;
          font-size: var(--font-size-text-large);
          font-weight: 400;
          line-height: 1.4;
          max-width: 50ch;
          opacity: 0.65;
        }
        .moneylab-desc {
          padding-block: var(--section-space-small);
          padding-inline: var(--site-margin);
          max-width: 100rem;
          margin-inline: auto;
          border-bottom: 1px solid rgba(28, 229, 133, 0.1);
        }
        .moneylab-desc-inner {
          max-width: 72ch;
        }
        .moneylab-desc-label {
          font-family: 'Robotocondensed', Arial, sans-serif;
          font-size: var(--font-size-h5);
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          opacity: 0.45;
          margin-bottom: 1rem;
        }
        .moneylab-desc-text {
          font-family: 'Aileron', Arial, sans-serif;
          font-size: var(--font-size-text-large);
          font-weight: 400;
          line-height: 1.55;
          opacity: 0.75;
          margin-bottom: 0.75rem;
        }
        .moneylab-features {
          padding-block: var(--section-space-main);
          padding-inline: var(--site-margin);
          max-width: 100rem;
          margin-inline: auto;
        }
        .moneylab-features-heading {
          font-family: 'Bueno', Impact, sans-serif;
          font-size: var(--font-size-h2);
          font-weight: 700;
          line-height: 0.85;
          text-transform: uppercase;
          color: #1ce585;
          margin-bottom: clamp(2rem, 4vw, 3.5rem);
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(1.25rem, 2.5vw, 2rem);
        }
        @media (max-width: 899px) {
          .features-grid {
            grid-template-columns: 1fr;
          }
        }
        .feature-block {
          border: 1px solid rgba(28, 229, 133, 0.15);
          border-radius: 6px;
          padding: clamp(1.75rem, 3.5vw, 2.5rem);
          display: flex;
          flex-direction: column;
          gap: 1rem;
          transition: border-color 0.3s ease, background 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .feature-block:hover {
          border-color: rgba(28, 229, 133, 0.4);
          background: rgba(28, 229, 133, 0.04);
        }
        .feature-block-top-bar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
        }
        .feature-icon-area {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .feature-emoji {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          line-height: 1;
          user-select: none;
        }
        .feature-number {
          font-family: 'Bueno', Impact, sans-serif;
          font-size: var(--font-size-h2);
          font-weight: 700;
          line-height: 1;
          opacity: 0.08;
          color: #1ce585;
        }
        .feature-title {
          font-family: 'Facultyglyphic', 'Palatino Linotype', sans-serif;
          font-size: var(--font-size-h3);
          font-weight: 400;
          line-height: 1.15;
          color: #1ce585;
          margin: 0;
        }
        .feature-desc {
          font-family: 'Aileron', Arial, sans-serif;
          font-size: var(--font-size-text-main);
          font-weight: 400;
          line-height: 1.55;
          opacity: 0.65;
          flex: 1;
        }
        .moneylab-cta {
          padding-block: var(--section-space-small);
          padding-inline: var(--site-margin);
          max-width: 100rem;
          margin-inline: auto;
        }
        .moneylab-cta-inner {
          background: rgba(28, 229, 133, 0.07);
          border: 1px solid rgba(28, 229, 133, 0.2);
          border-radius: 8px;
          padding: clamp(2.5rem, 5vw, 4rem) clamp(1.75rem, 4vw, 3rem);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .moneylab-cta-text {
          flex: 1;
          min-width: 240px;
        }
        .moneylab-cta-heading {
          font-family: 'Bueno', Impact, sans-serif;
          font-size: var(--font-size-h2);
          font-weight: 700;
          line-height: 0.9;
          text-transform: uppercase;
          color: #1ce585;
          margin-bottom: 0.75rem;
        }
        .moneylab-cta-sub {
          font-family: 'Aileron', Arial, sans-serif;
          font-size: var(--font-size-text-main);
          font-weight: 400;
          line-height: 1.5;
          opacity: 0.65;
          max-width: 48ch;
        }
      `}</style>

      {/* Hero */}
      <div className="moneylab-hero" ref={heroRef}>
        <div style={{ maxWidth: '100rem', marginInline: 'auto' }}>
          <p className="moneylab-hero-eyebrow">MoMoney Museum</p>
          <h1 className="moneylab-hero-title">Money Lab</h1>
          <p className="moneylab-hero-subtitle">
            Where curiosity meets currency
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="moneylab-desc" ref={descRef}>
        <div className="moneylab-desc-inner">
          <p className="moneylab-desc-label">About the Lab</p>
          <p className="moneylab-desc-text">
            The Money Lab is MoMoney's most immersive space — a hands-on laboratory where visitors of all ages become scientists of finance. Forget passive exhibits. Here, you do.
          </p>
          <p className="moneylab-desc-text">
            Design and print your own currency. Simulate real market conditions on our trading floor. Run the numbers on inflation across two centuries of economic data. Every station is built to make abstract concepts tangible and unforgettable.
          </p>
        </div>
      </div>

      {/* Feature blocks */}
      <section className="moneylab-features" ref={featuresRef}>
        <h2 className="moneylab-features-heading">What You'll Do</h2>
        <div className="features-grid">
          {FEATURES.map((feature) => (
            <div key={feature.id} className="feature-block">
              <div
                className="feature-block-top-bar"
                style={{ backgroundColor: feature.accentColor }}
              />
              <div className="feature-icon-area">
                <span className="feature-emoji" aria-hidden="true">
                  {feature.icon}
                </span>
                <span className="feature-number" aria-hidden="true">
                  {feature.number}
                </span>
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="moneylab-cta" ref={ctaRef}>
        <div className="moneylab-cta-inner">
          <div className="moneylab-cta-text">
            <h2 className="moneylab-cta-heading">Ready to Experiment?</h2>
            <p className="moneylab-cta-sub">
              The Money Lab is included with all general admission tickets. Book yours now and reserve your spot at the lab stations.
            </p>
          </div>
          <FlipButton href="/tickets" variant="primary">
            Visit Money Lab
          </FlipButton>
        </div>
      </section>

      <Footer />
    </main>
  )
}
