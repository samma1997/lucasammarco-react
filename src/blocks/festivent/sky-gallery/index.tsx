'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TYPO, IMG } from '../_shared'
import { KEYFRAMES } from '../_shared/keyframes'

gsap.registerPlugin(ScrollTrigger)

export default function SkyGallery() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.fv-parallax-img').forEach((el, i) => {
        const dir = i % 2 === 0 ? -30 : 30
        gsap.to(el, {
          y: dir,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <style>{KEYFRAMES}</style>
      <section ref={sectionRef} className="fv-sky-section" style={{
        padding: 'clamp(6rem, 12vw, 10rem) clamp(1rem, 3vw, 3rem)',
        backgroundImage: `url(${IMG}/sky.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {/* Overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0,0,0,0.1)',
          pointerEvents: 'none',
        }} />

        {/* Floating gallery photos */}
        <div className="fv-sky-gallery-photos" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
          <img className="fv-parallax-img" src={`${IMG}/gallery-1.jpg`} alt="" style={{
            position: 'absolute', top: '10%', left: '5%',
            width: 'clamp(120px, 14vw, 200px)', borderRadius: '1rem',
            aspectRatio: '454/568',
            objectFit: 'cover',
            transform: 'rotate(-6deg) translateY(50%)', boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          }} />
          <img className="fv-parallax-img" src={`${IMG}/gallery-2.jpg`} alt="" style={{
            position: 'absolute', top: '15%', right: '6%',
            width: 'clamp(140px, 16vw, 220px)', borderRadius: '1rem',
            aspectRatio: '454/568',
            objectFit: 'cover',
            transform: 'rotate(4deg) translateY(50%)', boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          }} />
          <img className="fv-parallax-img" src={`${IMG}/gallery-3.jpg`} alt="" style={{
            position: 'absolute', bottom: '12%', left: '8%',
            width: 'clamp(130px, 15vw, 210px)', borderRadius: '1rem',
            aspectRatio: '454/568',
            objectFit: 'cover',
            transform: 'rotate(3deg) translateY(50%)', boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          }} />
          <img className="fv-parallax-img" src={`${IMG}/ambiance-1.jpg`} alt="" style={{
            position: 'absolute', bottom: '18%', right: '5%',
            width: 'clamp(110px, 13vw, 180px)', borderRadius: '1rem',
            aspectRatio: '454/568',
            objectFit: 'cover',
            transform: 'rotate(-4deg) translateY(50%)', boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          }} />
        </div>

        <div className="fv-reveal" style={{ position: 'relative', zIndex: 2, maxWidth: 800 }}>
          <p style={{
            fontFamily: "'futura-pt-condensed', sans-serif",
            fontWeight: 800,
            fontSize: TYPO.headlineMedium,
            textTransform: 'uppercase',
            letterSpacing: '-0.01em',
            color: 'rgba(254,247,222,0.8)',
            marginBottom: '0.5rem',
          }}>
            C&eacute;l&eacute;brer, se rassembler et &ecirc;tre &eacute;pat&eacute;
          </p>
          <h2 style={{
            fontFamily: "'Metro Sans', sans-serif",
            fontWeight: 700,
            textTransform: 'uppercase',
            lineHeight: 1.05,
            fontSize: TYPO.displayLarge,
            color: '#fef7de',
            marginBottom: '1rem',
            textShadow: '0 4px 20px rgba(0,0,0,0.15)',
          }}>
            ENTRE CIEL ET TERRE
          </h2>
          <p style={{
            fontFamily: "'futura-pt-condensed', sans-serif",
            fontWeight: 800,
            fontSize: TYPO.headlineMedium,
            textTransform: 'uppercase',
            letterSpacing: '-0.01em',
            color: 'rgba(254,247,222,0.8)',
            marginBottom: '2rem',
          }}>
            Festivit&eacute;s pour petits et grands
          </p>
          <a href="#" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.85rem 2rem',
            border: '2px solid #fef7de',
            borderRadius: '100px',
            color: '#fef7de',
            fontWeight: 700,
            fontSize: TYPO.bodyMedium,
            textDecoration: 'none',
            textTransform: 'uppercase',
            fontFamily: "'Metro Sans', sans-serif",
            transition: 'all 0.3s',
            background: 'transparent',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = '#fef7de'; e.currentTarget.style.color = '#154e85' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#fef7de' }}
          >
            <span className="fv-btn-label">D&Eacute;COUVRIR LE FESTIVENT</span>
          </a>
        </div>
      </section>
    </>
  )
}
