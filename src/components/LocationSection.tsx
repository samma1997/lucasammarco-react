'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function LocationSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current
    if (!section || !content) return

    const ctx = gsap.context(() => {
      // Fade in content block on scroll
      gsap.fromTo(
        content,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reset',
          },
        }
      )

      // Subtle parallax on background image
      gsap.fromTo(
        overlayRef.current,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: '#190f0a',
        color: '#f1f0ec',
        fontFamily: '"Montserrat", sans-serif',
      }}
      className="location-section"
    >
      <style>{`
        .location-section {
          position: relative;
          overflow: hidden;
          min-height: clamp(28rem, 60vh, 44rem);
          display: flex;
          align-items: center;
        }
        .location-bg {
          position: absolute;
          inset: -10% 0;
          z-index: 0;
        }
        .location-bg-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(
            135deg,
            rgba(25, 15, 10, 0.88) 0%,
            rgba(25, 15, 10, 0.65) 50%,
            rgba(25, 15, 10, 0.4) 100%
          );
        }
        .location-content {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 90rem;
          margin: 0 auto;
          padding: clamp(3.5rem, 8vw, 10rem) clamp(1rem, 5vw, 4rem);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(2rem, 5vw, 6rem);
          align-items: center;
        }
        @media (max-width: 767px) {
          .location-content {
            grid-template-columns: 1fr;
          }
        }
        .location-eyebrow {
          font-size: clamp(0.7rem, 1vw, 0.85rem);
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(241, 240, 236, 0.5);
          margin-bottom: 1rem;
        }
        .location-headline {
          font-size: clamp(2.5rem, 5.5vw, 5rem);
          font-weight: 900;
          line-height: 0.9;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          color: #f1f0ec;
          margin-bottom: clamp(1.5rem, 3vw, 2.5rem);
        }
        .location-headline em {
          font-style: normal;
          color: #f580db;
        }
        .location-divider {
          width: 3rem;
          height: 2px;
          background: rgba(241, 240, 236, 0.2);
          margin-bottom: clamp(1.5rem, 3vw, 2.5rem);
        }
        .location-details {
          display: flex;
          flex-direction: column;
          gap: clamp(1.25rem, 2vw, 1.75rem);
        }
        .location-detail-item {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }
        .location-detail-label {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(241, 240, 236, 0.4);
        }
        .location-detail-value {
          font-size: clamp(0.9rem, 1.3vw, 1.1rem);
          font-weight: 500;
          color: #f1f0ec;
          line-height: 1.5;
        }
        .location-hours-split {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }
        .location-directions-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background: #f1f0ec;
          color: #190f0a;
          font-family: "Montserrat", sans-serif;
          font-size: clamp(0.8rem, 1vw, 0.9rem);
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 0.9rem 2rem;
          border-radius: 100px;
          border: 2px solid #f1f0ec;
          transition: background 0.3s ease, color 0.3s ease;
          width: fit-content;
          margin-top: 0.5rem;
        }
        .location-directions-btn:hover {
          background: transparent;
          color: #f1f0ec;
        }
        .location-directions-btn-arrow {
          transition: transform 0.3s ease;
        }
        .location-directions-btn:hover .location-directions-btn-arrow {
          transform: translateX(4px);
        }
        .location-map-col {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .location-badge {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          background: rgba(241, 240, 236, 0.06);
          border: 1px solid rgba(241, 240, 236, 0.1);
          border-radius: 1rem;
          padding: 1.5rem 2rem;
        }
        .location-badge-stat {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 900;
          line-height: 1;
          color: #f580db;
        }
        .location-badge-label {
          font-size: 0.8rem;
          font-weight: 500;
          opacity: 0.55;
          letter-spacing: 0.04em;
        }
        .location-badges-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }
        .location-map-iframe-wrap {
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 1.25rem;
          overflow: hidden;
          border: 1px solid rgba(241, 240, 236, 0.1);
          background: rgba(241, 240, 236, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .location-map-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          opacity: 0.4;
          text-align: center;
          padding: 2rem;
        }
        .location-map-icon {
          font-size: 2.5rem;
        }
        .location-map-text {
          font-size: 0.85rem;
          font-weight: 500;
          letter-spacing: 0.04em;
        }
      `}</style>

      {/* Background image layer with parallax */}
      <div className="location-bg" ref={overlayRef}>
        <Image
          src="/images/location/location-bg.avif"
          alt="Museum of Money Dallas location"
          fill
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority={false}
        />
        <div className="location-bg-overlay" />
      </div>

      {/* Content */}
      <div className="location-content" ref={contentRef}>
        {/* Left: Info */}
        <div>
          <p className="location-eyebrow">Find Us</p>
          <h2 className="location-headline">
            Visit us in <em>Dallas</em>
          </h2>
          <div className="location-divider" />

          <div className="location-details">
            <div className="location-detail-item">
              <span className="location-detail-label">Address</span>
              <span className="location-detail-value">501 Elm St, Dallas, TX 75202</span>
            </div>

            <div className="location-detail-item">
              <span className="location-detail-label">Opening Hours</span>
              <div className="location-hours-split">
                <span className="location-detail-value">Sun — Thu: 10AM to 8PM</span>
                <span className="location-detail-value">Fri &amp; Sat: 10AM to 9PM</span>
              </div>
            </div>

            <a
              href="https://maps.app.goo.gl/ngVA3AWMYgd6GAKVA"
              target="_blank"
              rel="noopener noreferrer"
              className="location-directions-btn"
            >
              Get Directions
              <span className="location-directions-btn-arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        {/* Right: Stats + map placeholder */}
        <div className="location-map-col">
          <div className="location-badges-grid">
            <div className="location-badge">
              <span className="location-badge-stat">30+</span>
              <span className="location-badge-label">Interactive Exhibits</span>
            </div>
            <div className="location-badge">
              <span className="location-badge-stat">10K+</span>
              <span className="location-badge-label">Visitors Monthly</span>
            </div>
            <div className="location-badge">
              <span className="location-badge-stat">4.9★</span>
              <span className="location-badge-label">Google Rating</span>
            </div>
            <div className="location-badge">
              <span className="location-badge-stat">All</span>
              <span className="location-badge-label">Ages Welcome</span>
            </div>
          </div>

          <div className="location-map-iframe-wrap">
            <div className="location-map-placeholder">
              <span className="location-map-icon">📍</span>
              <span className="location-map-text">501 Elm St, Dallas, TX 75202</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
