'use client'

import { useEffect, useRef } from 'react'
import Footer from '@/components/Footer'
import FlipButton from '@/components/FlipButton'

const PRICING = [
  { label: 'Adult', age: '13+', price: 36 },
  { label: 'Child', age: '4–12', price: 28 },
  { label: 'Under 4', age: '0–3', price: null },
  { label: 'Senior', age: '65+', price: 32 },
  { label: 'Military', age: 'Active & veterans', price: 30 },
]

const INCLUDED = [
  { icon: '◈', text: 'All permanent exhibits' },
  { icon: '◈', text: 'Interactive money-themed experiences' },
  { icon: '◈', text: 'Photo ops at every turn' },
  { icon: '◈', text: 'Access to the Money Lab' },
  { icon: '◈', text: 'Gift shop browsing' },
  { icon: '◈', text: 'Free re-entry on same day' },
]

export default function GeneralAdmissionPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const pricingRef = useRef<HTMLDivElement>(null)
  const includedRef = useRef<HTMLDivElement>(null)
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

        const priceRows = pricingRef.current?.querySelectorAll('.price-row')
        if (priceRows) {
          gsap.fromTo(
            priceRows,
            { opacity: 0, x: -30 },
            {
              opacity: 1,
              x: 0,
              duration: 0.65,
              ease: 'power3.out',
              stagger: 0.1,
              scrollTrigger: {
                trigger: pricingRef.current,
                start: 'top 82%',
                once: true,
              },
            }
          )
        }

        const includedItems = includedRef.current?.querySelectorAll('.included-item')
        if (includedItems) {
          gsap.fromTo(
            includedItems,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power3.out',
              stagger: 0.08,
              scrollTrigger: {
                trigger: includedRef.current,
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
      className="theme-pink"
      style={{ backgroundColor: 'var(--theme-bg)', color: 'var(--theme-text)', minHeight: '100vh' }}
    >
      <style>{`
        .tickets-page {
          padding-top: var(--section-space-page-top);
        }
        /* Hero */
        .tickets-hero {
          padding-inline: var(--site-margin);
          max-width: 100rem;
          margin: 0 auto;
          padding-bottom: var(--section-space-main);
          border-bottom: 1px solid var(--theme-border);
        }
        .tickets-hero h1 {
          color: var(--theme-text);
          margin-bottom: 1rem;
        }
        .tickets-subtitle {
          font-size: var(--font-size-text-large);
          opacity: 0.6;
          font-family: 'Aileron', Arial, sans-serif;
          max-width: 55ch;
        }
        /* Body */
        .tickets-body {
          padding-inline: var(--site-margin);
          max-width: 100rem;
          margin: 0 auto;
          padding-top: var(--section-space-main);
          padding-bottom: var(--section-space-large);
        }
        .tickets-grid {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: var(--space-4);
          align-items: start;
        }
        @media (max-width: 960px) {
          .tickets-grid {
            grid-template-columns: 1fr;
          }
        }
        /* Pricing table */
        .pricing-wrap {
          border: 1px solid var(--theme-border);
          border-radius: 4px;
          overflow: hidden;
        }
        .pricing-header {
          padding: var(--space-15) var(--space-2);
          border-bottom: 1px solid var(--theme-border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }
        .pricing-header-label {
          font-family: 'Robotocondensed', Arial, sans-serif;
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          opacity: 0.45;
        }
        .pricing-badge {
          font-family: 'Aileron', Arial, sans-serif;
          font-size: var(--font-size-text-small);
          font-weight: 600;
          background: var(--theme-text);
          color: var(--theme-bg);
          padding: 0.25rem 0.75rem;
          border-radius: 100vw;
          opacity: 0.85;
        }
        .price-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--space-15) var(--space-2);
          border-bottom: 1px solid var(--theme-border);
          gap: 1.5rem;
          opacity: 0;
        }
        .price-row:last-child {
          border-bottom: none;
        }
        .price-row-left {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }
        .price-label {
          font-family: 'Facultyglyphic', 'Palatino Linotype', serif;
          font-size: var(--font-size-h3);
          line-height: 1;
          color: var(--theme-text);
        }
        .price-age {
          font-size: var(--font-size-text-small);
          opacity: 0.45;
          font-family: 'Aileron', Arial, sans-serif;
        }
        .price-amount {
          font-family: 'Bueno', Impact, sans-serif;
          font-size: var(--font-size-h2);
          font-weight: 700;
          line-height: 1;
          color: var(--theme-text);
          text-transform: uppercase;
          flex-shrink: 0;
        }
        .price-amount-free {
          font-family: 'Bueno', Impact, sans-serif;
          font-size: var(--font-size-h3);
          font-weight: 700;
          color: var(--theme-text);
          text-transform: uppercase;
          flex-shrink: 0;
        }
        /* Included */
        .included-wrap {
          position: sticky;
          top: 6rem;
        }
        .included-label {
          font-family: 'Robotocondensed', Arial, sans-serif;
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          opacity: 0.45;
          margin-bottom: var(--space-15);
        }
        .included-title {
          font-family: 'Bueno', Impact, sans-serif;
          font-size: var(--font-size-h2);
          font-weight: 700;
          text-transform: uppercase;
          line-height: 0.85;
          margin-bottom: var(--space-2);
          color: var(--theme-text);
        }
        .included-list {
          list-style: none;
          padding: 0;
          margin: 0 0 var(--space-3) 0;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }
        .included-item {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          opacity: 0;
        }
        .included-icon {
          font-size: 0.8rem;
          opacity: 0.5;
          flex-shrink: 0;
        }
        .included-text {
          font-family: 'Aileron', Arial, sans-serif;
          font-size: var(--font-size-text-main);
          line-height: 1.4;
          color: var(--theme-text);
          opacity: 0.8;
        }
        .included-note {
          font-size: var(--font-size-text-small);
          opacity: 0.45;
          font-family: 'Aileron', Arial, sans-serif;
          line-height: 1.6;
          margin-bottom: var(--space-2);
        }
        /* CTA Section */
        .tickets-cta-section {
          margin-top: var(--section-space-main);
          padding-top: var(--section-space-main);
          border-top: 1px solid var(--theme-border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-2);
          flex-wrap: wrap;
        }
        .tickets-cta-text {
          font-family: 'Facultyglyphic', 'Palatino Linotype', serif;
          font-size: var(--font-size-h3);
          max-width: 40ch;
          opacity: 0.8;
        }
      `}</style>

      <main className="tickets-page">
        {/* Hero */}
        <div className="tickets-hero" ref={heroRef} style={{ opacity: 0 }}>
          <h1>General Admission</h1>
          <p className="tickets-subtitle">
            Timed entry, fully refundable up to 24 hours in advance
          </p>
        </div>

        {/* Body */}
        <div className="tickets-body">
          <div className="tickets-grid">
            {/* Pricing table */}
            <div ref={pricingRef}>
              <div className="pricing-wrap">
                <div className="pricing-header">
                  <span className="pricing-header-label">Ticket Pricing</span>
                  <span className="pricing-badge">Timed Entry</span>
                </div>
                {PRICING.map((item) => (
                  <div key={item.label} className="price-row">
                    <div className="price-row-left">
                      <span className="price-label">{item.label}</span>
                      <span className="price-age">{item.age}</span>
                    </div>
                    {item.price === null ? (
                      <span className="price-amount-free">Free</span>
                    ) : (
                      <span className="price-amount">${item.price}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* What's included */}
            <div className="included-wrap" ref={includedRef}>
              <p className="included-label">What&apos;s Included</p>
              <p className="included-title">Everything</p>
              <ul className="included-list">
                {INCLUDED.map((item) => (
                  <li key={item.text} className="included-item">
                    <span className="included-icon" aria-hidden="true">{item.icon}</span>
                    <span className="included-text">{item.text}</span>
                  </li>
                ))}
              </ul>
              <p className="included-note">
                Timed-entry tickets are valid for same-day re-entry. All sales are fully
                refundable up to 24 hours before your visit.
              </p>
            </div>
          </div>

          {/* CTA section */}
          <div className="tickets-cta-section" ref={ctaRef} style={{ opacity: 0 }}>
            <p className="tickets-cta-text">
              Ready to see money in a whole new way?
            </p>
            <FlipButton href="https://momoney.com/tickets" external>
              Book Now
            </FlipButton>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
