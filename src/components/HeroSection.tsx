'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ---------------------------------------------------------------------------
// Pixel overlay SVG — a tight grid of small rectangles that flicker on/off
// via GSAP stagger when the hero enters / leaves the viewport.
// ---------------------------------------------------------------------------
function PixelOverlay() {
  const cols = 40
  const rows = 22
  const w = 100 / cols
  const h = 100 / rows

  const paths: React.ReactNode[] = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      paths.push(
        <rect
          key={`${r}-${c}`}
          x={`${c * w}%`}
          y={`${r * h}%`}
          width={`${w}%`}
          height={`${h}%`}
        />,
      )
    }
  }

  return (
    <svg
      className="pixel-overlay-svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        fill: '#004923', // slightly darker green so pixels read as texture
        opacity: 0.55,
      }}
    >
      {paths}
    </svg>
  )
}

// ---------------------------------------------------------------------------
// HeroSection
// ---------------------------------------------------------------------------
export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const pixelSvgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const ctx = gsap.context(() => {
      // ---- 1. Pixel flicker: set all rects invisible initially ------------
      const rects = sectionRef.current?.querySelectorAll<SVGRectElement>(
        '.pixel-overlay-svg rect',
      )
      if (rects && rects.length) {
        gsap.set(rects, { opacity: 0 })

        if (!prefersReduced) {
          // Flicker ON as the hero bottom leaves the viewport center
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'bottom center-=100',
            end: 'bottom top',
            onEnter: () => {
              gsap.to(rects, {
                opacity: 1,
                duration: 0.05,
                stagger: { each: 0.02, from: 'random' },
                ease: 'none',
              })
            },
            onLeaveBack: () => {
              gsap.to(rects, {
                opacity: 0,
                duration: 0.05,
                stagger: { each: 0.02, from: 'random' },
                ease: 'none',
              })
            },
          })
        }
      }

      // ---- 2. Scroll morph: content scales + fades as user scrolls past --
      if (!prefersReduced && wrapperRef.current && contentRef.current) {
        gsap.to(wrapperRef.current, {
          scale: 0.92,
          borderRadius: '2rem',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.4,
          },
        })

        gsap.to(contentRef.current, {
          yPercent: 12,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '60% top',
            scrub: 0.25,
          },
        })
      }

      // ---- 3. Entrance animation — content fades + slides up on load ------
      if (!prefersReduced && contentRef.current) {
        const children = contentRef.current.children
        gsap.fromTo(
          children,
          { opacity: 0, yPercent: 30 },
          {
            opacity: 1,
            yPercent: 0,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.12,
            delay: 0.1,
          },
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100svh',
        backgroundColor: '#00592b',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Scaling wrapper — morphs on scroll */}
      <div
        ref={wrapperRef}
        style={{
          position: 'absolute',
          inset: 0,
          transformOrigin: 'center top',
          willChange: 'transform',
        }}
      >
        {/* Pixel overlay lives inside the wrapper so it scales together */}
        <div
          ref={pixelSvgRef}
          style={{ position: 'absolute', inset: 0, zIndex: 2 }}
        >
          <PixelOverlay />
        </div>

        {/* Decorative large background letter — gives visual depth */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            userSelect: 'none',
          }}
        >
          <span
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(20rem, 60vw, 80rem)',
              lineHeight: 1,
              color: 'transparent',
              WebkitTextStroke: '1px rgba(28,229,133,0.08)',
              letterSpacing: '-0.05em',
              whiteSpace: 'nowrap',
            }}
          >
            $
          </span>
        </div>
      </div>

      {/* Foreground content */}
      <div
        ref={contentRef}
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '90rem',
          width: '100%',
          padding: 'clamp(1.5rem, 4vw, 4rem)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(1rem, 2vw, 1.75rem)',
        }}
      >
        {/* Main headline */}
        <h1
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(3.5rem, 10vw, 14rem)',
            lineHeight: 0.85,
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
            color: '#f1f0ec',
            margin: 0,
          }}
        >
          GET TO KNOW<br />
          YOUR DOUGH
        </h1>

        {/* Sub-headline */}
        <p
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(1.1rem, 2.5vw, 2.2rem)',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: '#1ce585',
            margin: 0,
          }}
        >
          WE PUT THE FUN IN FUNDS
        </p>

        {/* Body copy */}
        <p
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(0.95rem, 1.4vw, 1.25rem)',
            lineHeight: 1.55,
            color: 'rgba(241,240,236,0.75)',
            maxWidth: '38rem',
            margin: 0,
          }}
        >
          Money: it&apos;s all about change. Discover its story at MoMoney, the
          interactive Museum of Money — where finance meets fun and every dollar
          holds a story worth telling.
        </p>

        {/* CTA */}
        <div style={{ marginTop: 'clamp(0.5rem, 1vw, 1rem)' }}>
          <Link
            href="/tickets/general-admission"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: 'clamp(0.75rem, 1.5vw, 1rem) clamp(1.5rem, 3vw, 2.5rem)',
              backgroundColor: '#1ce585',
              color: '#00592b',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(0.85rem, 1.2vw, 1.05rem)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              textDecoration: 'none',
              borderRadius: '0.35rem',
              transition: 'background-color 0.2s ease, transform 0.15s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.backgroundColor = '#f1f0ec'
              el.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.backgroundColor = '#1ce585'
              el.style.transform = 'translateY(0)'
            }}
          >
            Book Tickets
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>

      {/* Bottom gradient fade into next section */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '12rem',
          background:
            'linear-gradient(to bottom, transparent, rgba(0,89,43,0.9))',
          zIndex: 5,
          pointerEvents: 'none',
        }}
      />
    </section>
  )
}
