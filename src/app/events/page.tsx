'use client'

import { useEffect, useRef } from 'react'
import Footer from '@/components/Footer'
import FlipButton from '@/components/FlipButton'

interface Event {
  id: number
  title: string
  schedule: string
  description: string
  pricing: string
  ctaLabel: string
  ctaHref: string
  accentColor: string
  bgTint: string
}

const EVENTS: Event[] = [
  {
    id: 1,
    title: 'Family Fun Fridays',
    schedule: 'Every Friday',
    description:
      'Bring the whole family for special hands-on activities designed to make money history exciting for all ages. Games, crafts, and interactive exhibits take center stage.',
    pricing: '$20 / family',
    ctaLabel: 'Book Now',
    ctaHref: '/tickets',
    accentColor: '#f580db',
    bgTint: 'rgba(245, 128, 219, 0.08)',
  },
  {
    id: 2,
    title: 'Money Lab Workshop',
    schedule: 'Saturdays at 2 PM',
    description:
      'Roll up your sleeves for a hands-on financial literacy workshop. Design banknotes, simulate stock trading, and explore how economies work through immersive activities.',
    pricing: 'Included with admission',
    ctaLabel: 'Learn More',
    ctaHref: '/money-lab',
    accentColor: '#1ce585',
    bgTint: 'rgba(28, 229, 133, 0.06)',
  },
  {
    id: 3,
    title: 'Private Museum Nights',
    schedule: 'Available year-round',
    description:
      'Exclusive after-hours access for groups of 20 or more. Host your corporate event, birthday celebration, or private gathering in a truly one-of-a-kind setting.',
    pricing: 'Contact for pricing',
    ctaLabel: 'Enquire',
    ctaHref: '/contact',
    accentColor: '#ffec00',
    bgTint: 'rgba(255, 236, 0, 0.08)',
  },
  {
    id: 4,
    title: 'School Field Trips',
    schedule: 'Monday – Friday (term time)',
    description:
      'Curriculum-aligned educational programs for K-12 students. Our educators guide classes through the museum with age-appropriate content and interactive challenges.',
    pricing: 'Group rates available',
    ctaLabel: 'Plan a Visit',
    ctaHref: '/contact',
    accentColor: '#9eb5ff',
    bgTint: 'rgba(158, 181, 255, 0.1)',
  },
]

export default function EventsPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx: { revert?: () => void } = {}

    const initGsap = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        gsap.from('.events-hero-title', {
          y: 70,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        })
        gsap.from('.events-hero-subtitle', {
          y: 40,
          opacity: 0,
          duration: 0.9,
          delay: 0.2,
          ease: 'power3.out',
        })

        gsap.from('.event-card', {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
          },
          x: -40,
          opacity: 0,
          duration: 0.75,
          stagger: 0.15,
          ease: 'power2.out',
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
      className="theme-blue"
      style={{
        backgroundColor: '#9eb5ff',
        color: '#0023d1',
        minHeight: '100vh',
      }}
    >
      <style>{`
        .events-hero {
          padding-top: var(--section-space-page-top);
          padding-bottom: var(--section-space-small);
          padding-inline: var(--site-margin);
          border-bottom: 1px solid rgba(0, 35, 209, 0.15);
        }
        .events-hero-eyebrow {
          font-family: 'Robotocondensed', Arial, sans-serif;
          font-size: var(--font-size-h5);
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          opacity: 0.5;
          margin-bottom: 0.5rem;
        }
        .events-hero-title {
          font-family: 'Bueno', Impact, sans-serif;
          font-size: var(--font-size-h1);
          font-weight: 700;
          line-height: 0.85;
          text-transform: uppercase;
          color: #0023d1;
          margin-bottom: 1.25rem;
        }
        .events-hero-subtitle {
          font-family: 'Aileron', Arial, sans-serif;
          font-size: var(--font-size-text-large);
          font-weight: 400;
          line-height: 1.4;
          max-width: 50ch;
          opacity: 0.65;
        }
        .events-section {
          padding-block: var(--section-space-main);
          padding-inline: var(--site-margin);
          max-width: 100rem;
          margin-inline: auto;
        }
        .events-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(1.25rem, 2.5vw, 2rem);
        }
        @media (max-width: 767px) {
          .events-grid {
            grid-template-columns: 1fr;
          }
        }
        .event-card {
          border: 2px solid rgba(0, 35, 209, 0.18);
          border-radius: 6px;
          padding: clamp(1.75rem, 3.5vw, 2.5rem);
          display: flex;
          flex-direction: column;
          gap: 1rem;
          transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .event-card::before {
          content: '';
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        .event-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0, 35, 209, 0.15);
          border-color: rgba(0, 35, 209, 0.4);
        }
        .event-card-accent-bar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
        }
        .event-card-schedule {
          font-family: 'Robotocondensed', Arial, sans-serif;
          font-size: var(--font-size-h5);
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          opacity: 0.55;
        }
        .event-card-title {
          font-family: 'Facultyglyphic', 'Palatino Linotype', sans-serif;
          font-size: var(--font-size-h3);
          font-weight: 400;
          line-height: 1.15;
          color: #0023d1;
          margin: 0;
        }
        .event-card-description {
          font-family: 'Aileron', Arial, sans-serif;
          font-size: var(--font-size-text-main);
          font-weight: 400;
          line-height: 1.55;
          opacity: 0.7;
          flex: 1;
        }
        .event-card-pricing-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
          padding-top: 0.75rem;
          border-top: 1px solid rgba(0, 35, 209, 0.12);
        }
        .event-card-pricing {
          font-family: 'Robotocondensed', Arial, sans-serif;
          font-size: var(--font-size-h4);
          font-weight: 500;
          letter-spacing: 0.04em;
          color: #0023d1;
        }
      `}</style>

      {/* Hero */}
      <div className="events-hero" ref={heroRef}>
        <div style={{ maxWidth: '100rem', marginInline: 'auto' }}>
          <p className="events-hero-eyebrow">MoMoney Museum</p>
          <h1 className="events-hero-title">Events</h1>
          <p className="events-hero-subtitle">
            Special experiences at the Museum of Money
          </p>
        </div>
      </div>

      {/* Events grid */}
      <section className="events-section" ref={cardsRef}>
        <div className="events-grid">
          {EVENTS.map((event) => (
            <div
              key={event.id}
              className="event-card"
              style={{ backgroundColor: event.bgTint }}
            >
              <div
                className="event-card-accent-bar"
                style={{ backgroundColor: event.accentColor }}
              />
              <p className="event-card-schedule">{event.schedule}</p>
              <h3 className="event-card-title">{event.title}</h3>
              <p className="event-card-description">{event.description}</p>
              <div className="event-card-pricing-row">
                <span className="event-card-pricing">{event.pricing}</span>
                <FlipButton href={event.ctaHref} variant="primary">
                  {event.ctaLabel}
                </FlipButton>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
