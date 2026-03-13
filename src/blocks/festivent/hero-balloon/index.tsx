'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { FestiventLogoSVG } from '../_shared/components'
import { TYPO, IMG, JUMBO_HEIGHT } from '../_shared'

const KEYFRAMES = `
  @keyframes fv-hero-fly-1 {
    0% { bottom: 0; right: 0; transform: rotate(-4deg) translate(100%, 100%); }
    50% { bottom: 100%; right: 20%; transform: rotate(-4deg) translate(0, 0); }
    100% { bottom: 100%; right: 20%; transform: rotate(-4deg) translate(0, 0); }
  }
  @keyframes fv-hero-fly-2 {
    0% { bottom: 0; left: 0; transform: rotate(1deg) translate(-25%, 100%); }
    10% { bottom: 0; left: 0; transform: rotate(1deg) translate(-25%, 100%); }
    60% { bottom: 100%; left: 0; transform: rotate(1deg) translate(-20%, 0); }
    100% { bottom: 100%; left: 0; transform: rotate(1deg) translate(-20%, 0); }
  }
  @keyframes fv-hero-fly-3 {
    0% { bottom: 0; left: 0; transform: translate(-35%, 100%) rotate(1deg); }
    50% { bottom: 0; left: 0; transform: translate(-35%, 100%) rotate(1deg); }
    100% { bottom: 100%; left: 0; transform: translate(-35%, 0) rotate(1deg); }
  }
  @keyframes fv-hero-fly-4 {
    0% { bottom: 0; left: 45%; transform: translateY(100%) rotate(4deg); }
    30% { bottom: 0; left: 45%; transform: translateY(100%) rotate(4deg); }
    80% { bottom: 100%; left: 45%; transform: translateY(0) rotate(4deg); }
    100% { bottom: 100%; left: 45%; transform: translateY(0) rotate(4deg); }
  }
  @keyframes fv-float-1 {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(2deg); }
  }
  @keyframes fv-float-2 {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-15px) rotate(-1.5deg); }
  }
  @keyframes fv-float-3 {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-25px); }
  }
  @keyframes fv-pulse {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
  }
  .fv-btn-label {
    transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  }
  @media (max-width: 768px) {
    .fv-hero-sponsors { flex-direction: column !important; gap: 1.5rem !important; }
  }
`

export default function HeroBalloon() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [curtainVisible, setCurtainVisible] = useState(true)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Curtain entrance animation
      const tl = gsap.timeline()
      tl.to('.fv-curtain-sky', { y: '-100%', duration: 1.2, ease: 'power3.inOut', delay: 0.3 })
      tl.to('.fv-curtain', { opacity: 0, duration: 0.4, ease: 'power2.out', onComplete: () => setCurtainVisible(false) })
      // Hero entrance animations chained after curtain
      tl.fromTo('.fv-hero-badge-line1', { opacity: 0, y: 30 }, { opacity: 1, y: 0, rotate: -6, duration: 0.8, ease: 'power3.out' }, '-=0.2')
      tl.fromTo('.fv-hero-badge-line2', { opacity: 0, y: 30 }, { opacity: 1, y: 0, rotate: 2, duration: 0.8, ease: 'power3.out' }, '-=0.6')
      tl.fromTo('.fv-hero-logo', { opacity: 0, scale: 0.85, y: 40 }, { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'power3.out' }, '-=0.6')
      tl.fromTo('.fv-hero-sponsors', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.6')
      tl.fromTo('.fv-hero-cta', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')

      // Blur decorations float
      document.querySelectorAll('.fv-blur-deco').forEach((el, i) => {
        gsap.to(el, {
          y: `${(i % 2 === 0 ? -1 : 1) * (12 + i * 4)}`,
          x: `${(i % 3 === 0 ? 1 : -1) * (6 + i * 2)}`,
          duration: 4 + i * 0.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} style={{ position: 'relative', fontFamily: "'Metro Sans', sans-serif" }}>
      <style>{KEYFRAMES}</style>

      {/* Loading Curtain */}
      {curtainVisible && (
        <div className="fv-curtain" style={{
          position: 'fixed', inset: 0, zIndex: 200,
          background: '#f89e5d',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <img className="fv-curtain-sky" src={`${IMG}/sky.png`} alt="" style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover',
          }} />
          <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
            <FestiventLogoSVG width={300} color="#fff" />
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '4rem 1.5rem 6rem',
        background: 'linear-gradient(180deg, #f7826e 0%, #e8685e 20%, #c76a7a 40%, #7a88b8 60%, #5a9fd4 80%, #c7eafb 100%)',
      }}>
        {/* Blur decorations */}
        <img className="fv-blur-deco" src={`${IMG}/blue-blur-alt.png`} alt="" style={{
          position: 'absolute', width: 1000, top: -420, right: 0,
          pointerEvents: 'none', zIndex: 10, mixBlendMode: 'screen',
        }} />
        <img className="fv-blur-deco" src={`${IMG}/red-blur.png`} alt="" style={{
          position: 'absolute', width: 2500, top: -540, left: -1400,
          transform: 'rotate(-18deg)', pointerEvents: 'none', mixBlendMode: 'screen',
        }} />
        <img className="fv-blur-deco" src={`${IMG}/red-blur.png`} alt="" style={{
          position: 'absolute', width: 2000, top: 600,
          transform: 'rotate(-2deg) translate(-49%)', pointerEvents: 'none', mixBlendMode: 'screen',
        }} />
        <img className="fv-blur-deco" src={`${IMG}/red-blur.png`} alt="" style={{
          position: 'absolute', width: 2600, top: 400,
          transform: 'rotate(-15deg) translate(-50%)', pointerEvents: 'none', mixBlendMode: 'screen',
        }} />
        <img className="fv-blur-deco" src={`${IMG}/red-blur.png`} alt="" style={{
          position: 'absolute', width: 4600, opacity: 0.16,
          transform: 'rotate(-15deg) translate(-50%, -50%)', pointerEvents: 'none', mixBlendMode: 'screen',
        }} />

        {/* Montgolfieres */}
        <img src={`${IMG}/montgolfiere.png`} alt="" style={{
          position: 'absolute', bottom: 0, right: 0,
          width: 632, pointerEvents: 'none', zIndex: 1,
          animation: 'fv-hero-fly-1 20s linear infinite',
        }} />
        <img src={`${IMG}/montgolfiere-blur.png`} alt="" style={{
          position: 'absolute', bottom: 0, left: 0,
          width: 1000, pointerEvents: 'none',
          animation: 'fv-hero-fly-2 20s linear infinite',
        }} />
        <img src={`${IMG}/montgolfiere.png`} alt="" style={{
          position: 'absolute', bottom: 0, left: 0,
          width: 1100, pointerEvents: 'none',
          animation: 'fv-hero-fly-3 20s linear infinite',
        }} />
        <img src={`${IMG}/montgolfiere-blur.png`} alt="" style={{
          position: 'absolute', bottom: 0, left: '45%',
          width: 376, pointerEvents: 'none',
          filter: 'blur(20px)',
          animation: 'fv-hero-fly-4 20s linear infinite',
        }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1100 }}>
          {/* Date badge */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div className="fv-hero-badge-line1" style={{
              fontFamily: "'futura-pt-condensed', sans-serif",
              fontWeight: 800,
              fontSize: TYPO.headlineMedium,
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
              color: '#fff',
              transform: 'rotate(-6deg)',
              zIndex: 10,
              position: 'relative',
              opacity: 0,
            }}>
              Du 29 juillet
            </div>
            <div className="fv-hero-badge-line2" style={{
              fontFamily: "'futura-pt-condensed', sans-serif",
              fontWeight: 800,
              fontSize: TYPO.headlineMedium,
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
              color: '#fff',
              transform: 'rotate(2deg) translate(-10%)',
              marginTop: '1.4em',
              marginLeft: '-0.8em',
              opacity: 0,
            }}>
              au 2 ao&ucirc;t 2026
            </div>
          </div>

          {/* Large Festivent SVG logo */}
          <div className="fv-hero-logo" style={{ opacity: 0, display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '80vw', maxWidth: 1100 }}>
              <FestiventLogoSVG width={1100} color="#fff" />
            </div>
          </div>

          {/* Sponsors */}
          <div className="fv-hero-sponsors" style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '3rem',
            marginTop: '2rem',
            opacity: 0,
          }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{
                fontFamily: "'futura-pt-condensed', sans-serif",
                fontWeight: 800,
                fontSize: TYPO.bodySmall,
                textTransform: 'uppercase',
                letterSpacing: '-0.01em',
                color: 'rgba(255,255,255,0.7)',
                display: 'block',
                marginBottom: '0.4rem',
              }}>PARTENAIRE EN TITRE</span>
              <div style={{
                background: 'rgba(255,255,255,0.15)',
                borderRadius: '8px',
                padding: '0.5rem 1.5rem',
                color: '#fff',
                fontWeight: 700,
                fontSize: TYPO.bodyMedium,
              }}>L&eacute;vis</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <span style={{
                fontFamily: "'futura-pt-condensed', sans-serif",
                fontWeight: 800,
                fontSize: TYPO.bodySmall,
                textTransform: 'uppercase',
                letterSpacing: '-0.01em',
                color: 'rgba(255,255,255,0.7)',
                display: 'block',
                marginBottom: '0.4rem',
              }}>PR&Eacute;SENT&Eacute; PAR</span>
              <div style={{
                background: 'rgba(255,255,255,0.15)',
                borderRadius: '8px',
                padding: '0.5rem 1.5rem',
                color: '#fff',
                fontWeight: 700,
                fontSize: TYPO.bodyMedium,
              }}>Loto-Qu&eacute;bec</div>
            </div>
          </div>

          {/* Jumbo CTA button */}
          <div className="fv-hero-cta" style={{ marginTop: '2.5rem', opacity: 0 }}>
            <a href="#tickets" style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              height: JUMBO_HEIGHT,
              borderRadius: `calc(0.5 * ${JUMBO_HEIGHT})`,
              padding: '0 4rem',
              border: '2px solid #fff',
              color: '#fff',
              fontWeight: 700,
              fontSize: TYPO.labelLarge,
              textDecoration: 'none',
              textTransform: 'uppercase',
              fontFamily: "'Metro Sans', sans-serif",
              letterSpacing: '0.02em',
              transition: 'all 0.3s',
              background: 'transparent',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#f15c56' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#fff' }}
            >
              <span className="fv-btn-label">J&apos;ach&egrave;te mon billet!</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
