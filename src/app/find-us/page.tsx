'use client'

import { useEffect, useRef } from 'react'
import Footer from '@/components/Footer'
import FlipButton from '@/components/FlipButton'

const TRANSPORT_ITEMS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="9" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="12" cy="21" r="1" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="20" cy="21" r="1" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    label: 'By Car',
    description:
      'Paid parking is available in several lots within a 2-minute walk. We recommend the West End Parking Garage at 603 Munger Ave for the most convenient access.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    label: 'By DART',
    description:
      'Take the Green or Orange Line to the West End Station — we are a 3-minute walk from the platform. DART runs frequently from downtown Dallas and surrounding suburbs.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: 'By Rideshare',
    description:
      'Set your drop-off point to "501 Elm St, Dallas, TX 75202". Uber and Lyft pick-up/drop-off zones are available directly in front of the main entrance.',
  },
]

export default function FindUsPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const transportRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx: { revert: () => void } | null = null

    const initGSAP = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        gsap.fromTo(
          heroRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.1 }
        )

        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: { trigger: cardRef.current, start: 'top 85%', once: true },
          }
        )

        gsap.fromTo(
          mapRef.current,
          { opacity: 0, scale: 0.97 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: { trigger: mapRef.current, start: 'top 85%', once: true },
          }
        )

        const transportItems = transportRef.current?.querySelectorAll('.transport-item')
        if (transportItems) {
          gsap.fromTo(
            transportItems,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: 'power3.out',
              stagger: 0.12,
              scrollTrigger: {
                trigger: transportRef.current,
                start: 'top 82%',
                once: true,
              },
            }
          )
        }

        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: { trigger: ctaRef.current, start: 'top 88%', once: true },
          }
        )
      })
    }

    initGSAP()
    return () => ctx?.revert()
  }, [])

  return (
    <div
      className="theme-dark"
      style={{ backgroundColor: 'var(--theme-bg)', color: 'var(--theme-text)', minHeight: '100vh' }}
    >
      <style>{`
        .find-us-page {
          padding-top: var(--section-space-page-top);
        }
        /* Hero — with bg image overlay */
        .find-us-hero-wrap {
          position: relative;
          overflow: hidden;
        }
        .find-us-hero-bg {
          position: absolute;
          inset: 0;
          background-image: url('/images/location/location-bg.avif');
          background-size: cover;
          background-position: center;
          z-index: 0;
        }
        .find-us-hero-overlay {
          position: absolute;
          inset: 0;
          background: rgba(25, 15, 10, 0.72);
          z-index: 1;
        }
        .find-us-hero {
          position: relative;
          z-index: 2;
          padding-inline: var(--site-margin);
          max-width: 100rem;
          margin: 0 auto;
          padding-top: var(--section-space-page-top);
          padding-bottom: var(--section-space-large);
        }
        .find-us-hero h1 {
          color: var(--theme-text);
          margin-bottom: 1.25rem;
          max-width: 16ch;
        }
        .find-us-subtitle {
          font-size: var(--font-size-text-large);
          opacity: 0.65;
          font-family: 'Aileron', Arial, sans-serif;
          max-width: 52ch;
        }
        /* Body */
        .find-us-body {
          padding-inline: var(--site-margin);
          max-width: 100rem;
          margin: 0 auto;
          padding-top: var(--section-space-main);
          padding-bottom: var(--section-space-large);
        }
        .find-us-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-4);
          align-items: start;
          margin-bottom: var(--section-space-main);
        }
        @media (max-width: 860px) {
          .find-us-grid {
            grid-template-columns: 1fr;
          }
        }
        /* Location card */
        .location-card {
          border: 1px solid var(--theme-border);
          padding: var(--space-2);
          border-radius: 4px;
        }
        .location-card-label {
          font-family: 'Robotocondensed', Arial, sans-serif;
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          opacity: 0.4;
          margin-bottom: 0.75rem;
        }
        .location-address {
          font-family: 'Facultyglyphic', 'Palatino Linotype', serif;
          font-size: var(--font-size-h3);
          line-height: 1.3;
          color: var(--theme-text);
          margin-bottom: var(--space-15);
        }
        .location-hours {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 0.4rem 1.5rem;
          font-size: var(--font-size-text-small);
          margin-bottom: var(--space-2);
        }
        .location-hours-day {
          opacity: 0.55;
        }
        .location-hours-time {
          font-weight: 600;
          text-align: right;
        }
        .location-divider {
          width: 100%;
          height: 1px;
          background: var(--theme-border);
          margin: var(--space-15) 0;
        }
        .location-map-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: 'Robotocondensed', Arial, sans-serif;
          font-size: var(--font-size-h5);
          font-weight: 500;
          letter-spacing: 0.04em;
          color: var(--theme-text);
          text-decoration: none;
          opacity: 0.75;
          transition: opacity 0.2s ease;
        }
        .location-map-link:hover {
          opacity: 1;
        }
        /* Map embed */
        .map-container {
          width: 100%;
          aspect-ratio: 4 / 3;
          border-radius: 4px;
          overflow: hidden;
          border: 1px solid var(--theme-border);
          position: relative;
        }
        .map-container iframe {
          width: 100%;
          height: 100%;
          border: 0;
          display: block;
        }
        /* Transport section */
        .transport-section-label {
          font-family: 'Robotocondensed', Arial, sans-serif;
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          opacity: 0.4;
          margin-bottom: var(--space-2);
        }
        .transport-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-2);
        }
        @media (max-width: 700px) {
          .transport-grid {
            grid-template-columns: 1fr;
          }
        }
        .transport-item {
          opacity: 0;
          border: 1px solid var(--theme-border);
          padding: var(--space-15);
          border-radius: 4px;
        }
        .transport-icon {
          color: var(--theme-text);
          opacity: 0.6;
          margin-bottom: 1rem;
        }
        .transport-label {
          font-family: 'Robotocondensed', Arial, sans-serif;
          font-size: var(--font-size-h5);
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 0.6rem;
          color: var(--theme-text);
        }
        .transport-desc {
          font-size: var(--font-size-text-small);
          line-height: 1.65;
          opacity: 0.6;
        }
        /* CTA section */
        .find-us-cta {
          margin-top: var(--section-space-main);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          text-align: center;
          gap: var(--space-2);
        }
        .find-us-cta-text {
          font-family: 'Facultyglyphic', 'Palatino Linotype', serif;
          font-size: var(--font-size-h3);
          max-width: 40ch;
          opacity: 0.8;
        }
      `}</style>

      <main className="find-us-page">
        {/* Hero with background image */}
        <div className="find-us-hero-wrap">
          <div className="find-us-hero-bg" aria-hidden="true" />
          <div className="find-us-hero-overlay" aria-hidden="true" />
          <div className="find-us-hero" ref={heroRef} style={{ opacity: 0 }}>
            <h1>Find Your Way to MoMoney</h1>
            <p className="find-us-subtitle">
              Perfectly placed for adventure at the heart of the West End
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="find-us-body">
          {/* Location card + map */}
          <div className="find-us-grid">
            <div ref={cardRef} style={{ opacity: 0 }}>
              <div className="location-card">
                <p className="location-card-label">Our Location</p>
                <p className="location-address">
                  501 Elm St<br />Dallas, TX 75202
                </p>

                <p className="location-card-label">Hours</p>
                <div className="location-hours">
                  <span className="location-hours-day">Sun – Thu</span>
                  <span className="location-hours-time">10AM – 8PM</span>
                  <span className="location-hours-day">Fri – Sat</span>
                  <span className="location-hours-time">10AM – 9PM</span>
                </div>

                <div className="location-divider" />

                <a
                  href="https://maps.app.goo.gl/ngVA3AWMYgd6GAKVA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="location-map-link"
                  aria-label="Open in Google Maps"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  Open in Google Maps
                </a>
              </div>
            </div>

            {/* Map embed */}
            <div ref={mapRef} style={{ opacity: 0 }}>
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3354.7!2d-96.8006!3d32.7827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864e991e9b1e9c1d%3A0x0!2s501+Elm+St%2C+Dallas%2C+TX+75202!5e0!3m2!1sen!2sus!4v1700000000000"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="MoMoney Museum location on Google Maps"
                />
              </div>
            </div>
          </div>

          {/* Getting there */}
          <div ref={transportRef}>
            <p className="transport-section-label">Getting There</p>
            <div className="transport-grid">
              {TRANSPORT_ITEMS.map((item) => (
                <div key={item.label} className="transport-item">
                  <div className="transport-icon" aria-hidden="true">{item.icon}</div>
                  <p className="transport-label">{item.label}</p>
                  <p className="transport-desc">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="find-us-cta" ref={ctaRef} style={{ opacity: 0 }}>
            <p className="find-us-cta-text">
              Ready to experience money like never before?
            </p>
            <FlipButton href="/tickets/general-admission">Book Tickets</FlipButton>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
