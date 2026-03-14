'use client'

import { useRef, useEffect, useState, type CSSProperties } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  MF_COLORS,
  MF_TYPO,
  MF_TRACKING,
  MF_LEADING,
  MF_CONTENT_WIDTH,
  MF_CAPABILITIES,
  IMG,
} from '../_shared'

gsap.registerPlugin(ScrollTrigger)

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const FONT_STACK =
  'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'

/* ------------------------------------------------------------------ */
/*  Capability Card                                                    */
/* ------------------------------------------------------------------ */

function CapabilityCard({
  title,
  description,
  image,
}: {
  title: string
  description: string
  image: string
}) {
  const [imgError, setImgError] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="mf-cap-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...cardStyles.wrapper,
        borderColor: hovered ? 'rgba(255,255,255,0.2)' : MF_COLORS.border,
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      {/* Image area */}
      <div style={cardStyles.imageArea}>
        {!imgError ? (
          <img
            src={image}
            alt={title}
            onError={() => setImgError(true)}
            style={cardStyles.image}
          />
        ) : (
          <div style={cardStyles.placeholder}>
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              aria-hidden="true"
            >
              <rect
                x="8"
                y="12"
                width="32"
                height="24"
                rx="4"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="2"
              />
              <circle
                cx="18"
                cy="22"
                r="3"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="2"
              />
              <path
                d="M8 32l10-8 6 5 8-6 8 6"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Content area */}
      <div style={cardStyles.content}>
        <h3 style={cardStyles.title}>{title}</h3>
        <p style={cardStyles.description}>{description}</p>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Card styles                                                        */
/* ------------------------------------------------------------------ */

const cardStyles = {
  wrapper: {
    border: `1px solid ${MF_COLORS.border}`,
    borderRadius: '16px',
    overflow: 'hidden',
    background: MF_COLORS.base,
    transition: 'border-color 0.3s ease, transform 0.3s ease',
    willChange: 'transform',
  } satisfies CSSProperties,

  imageArea: {
    aspectRatio: '4 / 3',
    width: '100%',
    overflow: 'hidden',
    background: MF_COLORS.surface,
    position: 'relative',
  } satisfies CSSProperties,

  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  } satisfies CSSProperties,

  placeholder: {
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg, #171717, #1a1a2e)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    inset: 0,
  } satisfies CSSProperties,

  content: {
    padding: '1.5rem',
  } satisfies CSSProperties,

  title: {
    fontSize: '1.25rem',
    fontWeight: 600,
    color: MF_COLORS.white,
    margin: '0 0 0.5rem',
    fontFamily: FONT_STACK,
  } satisfies CSSProperties,

  description: {
    fontSize: '0.875rem',
    color: MF_COLORS.textMuted,
    lineHeight: 1.6,
    margin: 0,
    fontFamily: FONT_STACK,
  } satisfies CSSProperties,
}

/* ------------------------------------------------------------------ */
/*  Section styles                                                     */
/* ------------------------------------------------------------------ */

const CSS_MEDIA = `
@media (max-width: 768px) {
  .mf-cap-grid {
    grid-template-columns: 1fr !important;
  }
  .mf-cap-section-inner {
    padding-top: 3.5rem !important;
    padding-bottom: 3.5rem !important;
  }
}
`

const sectionStyles = {
  section: {
    backgroundColor: MF_COLORS.base,
    fontFamily: FONT_STACK,
  } satisfies CSSProperties,

  inner: {
    maxWidth: MF_CONTENT_WIDTH,
    margin: '0 auto',
    padding: '6rem 1.5rem',
  } satisfies CSSProperties,

  heading: {
    fontSize: MF_TYPO.sectionHeading,
    letterSpacing: MF_TRACKING.sectionHeading,
    lineHeight: MF_LEADING.heading,
    fontWeight: 700,
    color: MF_COLORS.white,
    margin: '0 0 3rem',
    fontFamily: FONT_STACK,
  } satisfies CSSProperties,

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '40px',
  } satisfies CSSProperties,
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function CapabilitiesGrid() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const cardsContainer = cardsRef.current
    if (!section || !cardsContainer) return

    const cards = cardsContainer.querySelectorAll('.mf-cap-card')

    gsap.set(cards, { opacity: 0, y: 40 })

    const tl = gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        once: true,
      },
    })

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS_MEDIA }} />

      <section ref={sectionRef} style={sectionStyles.section}>
        <div
          className="mf-cap-section-inner"
          style={sectionStyles.inner}
        >
          <h2 style={sectionStyles.heading}>
            Focus on what actually matters.
          </h2>

          <div
            ref={cardsRef}
            className="mf-cap-grid"
            style={sectionStyles.grid}
          >
            {MF_CAPABILITIES.map((cap) => (
              <CapabilityCard
                key={cap.title}
                title={cap.title}
                description={cap.description}
                image={cap.image}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
