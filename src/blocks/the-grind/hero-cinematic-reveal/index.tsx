'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'

// ---------------------------------------------------------------------------
// SVG Logo — abstract geometric mark with multiple paths for stroke animation
// ---------------------------------------------------------------------------
function LogoSVG({ className }: { className?: string }) {
  return (
    <svg
      data-tg-hero-logo
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: 'clamp(80px, 12vw, 160px)',
        height: 'clamp(80px, 12vw, 160px)',
      }}
      aria-hidden="true"
    >
      {/* Outer ring */}
      <path
        data-tg-logo-path
        d="M100 10 C150 10 190 50 190 100 C190 150 150 190 100 190 C50 190 10 150 10 100 C10 50 50 10 100 10Z"
        stroke="white"
        strokeWidth="2"
        fill="none"
      />
      {/* Inner triangle */}
      <path
        data-tg-logo-path
        d="M100 40 L160 150 L40 150 Z"
        stroke="white"
        strokeWidth="2"
        fill="none"
      />
      {/* Horizontal line */}
      <path
        data-tg-logo-path
        d="M30 120 L170 120"
        stroke="white"
        strokeWidth="2"
        fill="none"
      />
      {/* Vertical line */}
      <path
        data-tg-logo-path
        d="M100 30 L100 170"
        stroke="white"
        strokeWidth="2"
        fill="none"
      />
      {/* Small inner circle */}
      <path
        data-tg-logo-path
        d="M100 70 C120 70 135 85 135 100 C135 115 120 130 100 130 C80 130 65 115 65 100 C65 85 80 70 100 70Z"
        stroke="white"
        strokeWidth="2"
        fill="none"
      />
      {/* Diagonal cross left */}
      <path
        data-tg-logo-path
        d="M55 55 L145 145"
        stroke="white"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Diagonal cross right */}
      <path
        data-tg-logo-path
        d="M145 55 L55 145"
        stroke="white"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  )
}

// ---------------------------------------------------------------------------
// Heading lines for split-text animation
// ---------------------------------------------------------------------------
const HEADING_LINES = ['YOUR JOURNEY', 'STARTS HERE']
const SUBTITLE = 'Community first. Physical & Mental.'
const CTA_TEXT = 'Join The Grind'

// ---------------------------------------------------------------------------
// HeroCinematicReveal
// ---------------------------------------------------------------------------
export default function HeroCinematicReveal() {
  const sectionRef = useRef<HTMLElement>(null)
  const photoWrapperRef = useRef<HTMLDivElement>(null)
  const photo1Ref = useRef<HTMLDivElement>(null)
  const photo2Ref = useRef<HTMLDivElement>(null)
  const photo3Ref = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const overlayTopRef = useRef<HTMLDivElement>(null)
  const overlayBottomRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const photoWrapper = photoWrapperRef.current
    const photo1 = photo1Ref.current
    const photo2 = photo2Ref.current
    const photo3 = photo3Ref.current
    const logoContainer = logoRef.current
    const overlayTop = overlayTopRef.current
    const overlayBottom = overlayBottomRef.current
    const heading = headingRef.current
    const bottom = bottomRef.current
    const bg = bgRef.current

    if (
      !section || !photoWrapper || !photo1 || !photo2 || !photo3 ||
      !logoContainer || !overlayTop || !overlayBottom || !heading ||
      !bottom || !bg
    ) return

    const ctx = gsap.context(() => {
      const logoSvg = logoContainer.querySelector('[data-tg-hero-logo]')
      const logoPaths = logoContainer.querySelectorAll<SVGPathElement>('[data-tg-logo-path]')
      const headingLines = heading.querySelectorAll<HTMLDivElement>('[data-tg-heading-line]')
      const bottomItems = bottom.querySelectorAll<HTMLElement>('[data-tg-bottom-item]')

      const tl = gsap.timeline({ timeScale: 1.25 })

      // ---------------------------------------------------------------
      // 1. SVG logo appears — scale 0.8→1, autoAlpha 0→1
      // ---------------------------------------------------------------
      tl.fromTo(
        logoContainer,
        { scale: 0.8, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 0.9, ease: 'power2.out' },
        0.2,
      )

      // ---------------------------------------------------------------
      // 2. Photo 1 reveals — clip-path inset(100% 0% 0% 0%) → inset(0%)
      // ---------------------------------------------------------------
      tl.fromTo(
        photo1,
        { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.5 },
        { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: 1.4, ease: 'power3.inOut' },
        0.4,
      )

      // ---------------------------------------------------------------
      // 3. Photo 2 reveals — same clip-path animation
      // ---------------------------------------------------------------
      tl.fromTo(
        photo2,
        { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.5 },
        { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: 1.4, ease: 'power3.inOut' },
        1.0,
      )

      // ---------------------------------------------------------------
      // 4. Third media reveals — same clip-path
      // ---------------------------------------------------------------
      tl.fromTo(
        photo3,
        { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.5 },
        { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: 1.4, ease: 'power3.inOut' },
        1.6,
      )

      // ---------------------------------------------------------------
      // 5. SVG stroke animation — strokeDashoffset → 0, then fill white
      // ---------------------------------------------------------------
      if (logoPaths.length > 0) {
        logoPaths.forEach((path) => {
          const length = path.getTotalLength()
          gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
          })
        })

        tl.to(
          logoPaths,
          {
            strokeDashoffset: 0,
            duration: 1.2,
            ease: 'power2.inOut',
            stagger: 0.07,
          },
          2.2,
        )

        tl.to(
          logoPaths,
          {
            fill: 'white',
            duration: 0.5,
            ease: 'power1.in',
            stagger: 0.07,
          },
          3.4,
        )
      }

      // ---------------------------------------------------------------
      // 6. SVG fades out
      // ---------------------------------------------------------------
      tl.to(
        logoContainer,
        { autoAlpha: 0, duration: 0.6, ease: 'power2.in' },
        4.2,
      )

      // ---------------------------------------------------------------
      // 7. Photo wrapper expands — width/height to near-viewport
      // ---------------------------------------------------------------
      tl.to(
        photoWrapper,
        {
          width: 'calc(100vw - 2rem)',
          height: 'calc(100vh - 2rem)',
          duration: 1.2,
          ease: 'expo.inOut',
        },
        4.5,
      )

      // ---------------------------------------------------------------
      // 8. Background height shrinks from 100vh to 70vh
      // ---------------------------------------------------------------
      tl.to(
        bg,
        {
          height: '70vh',
          duration: 1.6,
          ease: 'expo.inOut',
        },
        4.8,
      )

      // ---------------------------------------------------------------
      // 9. Overlays fade in — top/bottom gradients at opacity 0.47
      // ---------------------------------------------------------------
      tl.to(
        [overlayTop, overlayBottom],
        {
          opacity: 0.47,
          duration: 0.8,
          ease: 'power2.out',
        },
        5.5,
      )

      // ---------------------------------------------------------------
      // 10. Heading reveals — split lines, yPercent 110→0
      // ---------------------------------------------------------------
      if (headingLines.length > 0) {
        tl.fromTo(
          headingLines,
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 0.8,
            ease: 'expo.out',
            stagger: 0.1,
          },
          5.8,
        )
      }

      // ---------------------------------------------------------------
      // 11. Bottom items fade up — y:30→0, autoAlpha 0→1
      // ---------------------------------------------------------------
      if (bottomItems.length > 0) {
        tl.fromTo(
          bottomItems,
          { y: 30, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            ease: 'expo.out',
            stagger: 0.15,
          },
          6.2,
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
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#0a0a0a',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Background wrapper that shrinks from 100vh to 70vh */}
      <div
        ref={bgRef}
        data-tg-hero-bg
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Photo wrapper — starts small, expands to near-viewport */}
        <div
          ref={photoWrapperRef}
          data-tg-hero-photo-wrapper
          style={{
            position: 'relative',
            width: 'clamp(280px, 40vw, 500px)',
            height: 'clamp(360px, 50vh, 600px)',
            borderRadius: '0.75rem',
            overflow: 'hidden',
            willChange: 'width, height',
          }}
        >
          {/* Photo 1 */}
          <div
            ref={photo1Ref}
            data-tg-hero-photo
            style={{
              position: 'absolute',
              inset: 0,
              clipPath: 'inset(100% 0% 0% 0%)',
              willChange: 'clip-path, transform',
            }}
          >
            <Image
              src="/blocks/the-grind/images/hero/photo1.webp"
              alt="The Grind community training"
              fill
              sizes="100vw"
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>

          {/* Photo 2 */}
          <div
            ref={photo2Ref}
            data-tg-hero-photo
            style={{
              position: 'absolute',
              inset: 0,
              clipPath: 'inset(100% 0% 0% 0%)',
              willChange: 'clip-path, transform',
            }}
          >
            <Image
              src="/blocks/the-grind/images/hero/photo2.webp"
              alt="The Grind fitness environment"
              fill
              sizes="100vw"
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>

          {/* Photo 3 (replaces video) */}
          <div
            ref={photo3Ref}
            data-tg-hero-photo
            style={{
              position: 'absolute',
              inset: 0,
              clipPath: 'inset(100% 0% 0% 0%)',
              willChange: 'clip-path, transform',
            }}
          >
            <Image
              src="/blocks/the-grind/images/grid/1.webp"
              alt="The Grind training session"
              fill
              sizes="100vw"
              style={{ objectFit: 'cover' }}
            />
          </div>

          {/* SVG Logo Overlay */}
          <div
            ref={logoRef}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              opacity: 0,
              visibility: 'hidden',
            }}
          >
            <LogoSVG />
          </div>

          {/* Top gradient overlay */}
          <div
            ref={overlayTopRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '40%',
              background: 'linear-gradient(to bottom, rgba(10,10,10,0.9) 0%, transparent 100%)',
              opacity: 0,
              zIndex: 5,
              pointerEvents: 'none',
            }}
          />

          {/* Bottom gradient overlay */}
          <div
            ref={overlayBottomRef}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '50%',
              background: 'linear-gradient(to top, rgba(10,10,10,0.95) 0%, transparent 100%)',
              opacity: 0,
              zIndex: 5,
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* Heading — positioned over the expanded photo wrapper */}
        <div
          ref={headingRef}
          data-tg-hero-heading
          style={{
            position: 'absolute',
            bottom: 'clamp(6rem, 15vh, 10rem)',
            left: 'clamp(1.5rem, 4vw, 4rem)',
            zIndex: 15,
            overflow: 'hidden',
          }}
        >
          {HEADING_LINES.map((line, i) => (
            <div
              key={i}
              style={{ overflow: 'hidden' }}
            >
              <div
                data-tg-heading-line
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: 900,
                  fontSize: 'clamp(2.5rem, 7vw, 6rem)',
                  lineHeight: 1,
                  textTransform: 'uppercase',
                  letterSpacing: '-0.03em',
                  color: '#f5f5f5',
                  transform: 'translateY(110%)',
                  willChange: 'transform',
                }}
              >
                {line}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom items — subtitle + CTA */}
        <div
          ref={bottomRef}
          data-tg-hero-bottom
          style={{
            position: 'absolute',
            bottom: 'clamp(2rem, 5vh, 4rem)',
            left: 'clamp(1.5rem, 4vw, 4rem)',
            right: 'clamp(1.5rem, 4vw, 4rem)',
            zIndex: 15,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <p
            data-tg-bottom-item
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 400,
              fontSize: 'clamp(0.85rem, 1.2vw, 1.1rem)',
              color: 'rgba(245,245,245,0.7)',
              letterSpacing: '0.02em',
              opacity: 0,
              visibility: 'hidden',
              margin: 0,
            }}
          >
            {SUBTITLE}
          </p>

          <a
            data-tg-bottom-item
            href="#join"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: 'clamp(0.7rem, 1vw, 0.9rem) clamp(1.5rem, 2.5vw, 2.2rem)',
              backgroundColor: '#e8ff3d',
              color: '#0a0a0a',
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(0.75rem, 0.95vw, 0.9rem)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              textDecoration: 'none',
              borderRadius: '0.25rem',
              border: 'none',
              opacity: 0,
              visibility: 'hidden',
              transition: 'background-color 0.2s ease, transform 0.15s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget
              el.style.backgroundColor = '#f5f5f5'
              el.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget
              el.style.backgroundColor = '#e8ff3d'
              el.style.transform = 'translateY(0)'
            }}
          >
            {CTA_TEXT}
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* MOBILE ADJUSTMENTS                                                  */}
      {/* ------------------------------------------------------------------ */}
      <style>{`
        @media (max-width: 767px) {
          [data-tg-hero-heading] {
            bottom: 7rem !important;
          }
          [data-tg-hero-bottom] {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </section>
  )
}
