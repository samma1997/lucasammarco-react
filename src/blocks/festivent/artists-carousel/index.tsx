'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TYPO, IMG, ARTISTS } from '../_shared'

gsap.registerPlugin(ScrollTrigger)

const KEYFRAMES = `
  @keyframes fv-marquee-artists {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes artists-float {
    0% { transform: translateY(0); }
    100% { transform: translateY(-1rem); }
  }
  .fv-marquee-wrapper {
    will-change: transform;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }
  .fv-artist-card {
    animation: artists-float 8s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite alternate-reverse;
  }
  .fv-btn-label {
    transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  }
`

export default function ArtistsCarousel() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      document.querySelectorAll('.fv-reveal').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 50 }, {
          opacity: 1, y: 0, duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="artists" style={{
      padding: 'clamp(5rem, 10vw, 8rem) 0 clamp(4rem, 8vw, 6rem)',
      background: '#fef7de',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <style>{KEYFRAMES}</style>

      {/* Background blurs */}
      <img className="fv-blur-deco" src={`${IMG}/blue-blur.png`} alt="" style={{
        position: 'absolute', top: '10%', right: '-5%', width: '30%', maxWidth: 350,
        opacity: 0.25, pointerEvents: 'none',
      }} />
      <img src={`${IMG}/montgolifiere-blue.png`} alt="" style={{
        position: 'absolute', bottom: '5%', left: '2%', width: 'clamp(60px, 8vw, 120px)',
        opacity: 0.2, pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 clamp(1rem, 3vw, 3rem)', position: 'relative', zIndex: 1 }}>
        {/* Overline badge */}
        <div className="fv-reveal" style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <span style={{
            display: 'inline-block',
            padding: '0.4rem 1.2rem',
            background: '#fef7de',
            border: '1.5px solid #f15c56',
            borderRadius: '100px',
            color: '#f15c56',
            fontFamily: "'futura-pt-condensed', sans-serif",
            fontWeight: 800,
            fontSize: TYPO.titleSmall,
            textTransform: 'uppercase',
            letterSpacing: '-0.01em',
          }}>
            PROG COMPL&Egrave;TE - &Agrave; VENIR!
          </span>
        </div>

        {/* Heading */}
        <h2 className="fv-reveal" style={{
          fontFamily: "'Metro Sans', sans-serif",
          fontWeight: 700,
          textTransform: 'uppercase',
          lineHeight: 1.1,
          fontSize: TYPO.displayMedium,
          color: '#154e85',
          textAlign: 'center',
          marginBottom: '3rem',
          letterSpacing: '-0.01em',
        }}>
          PREMIERS ARTISTES 2026
        </h2>
      </div>

      {/* Marquee artist carousel */}
      <div style={{ overflow: 'hidden', padding: '1rem 0' }}>
        <div className="fv-marquee-wrapper" style={{
          display: 'flex',
          gap: '1.5rem',
          animation: 'fv-marquee-artists 30s linear infinite',
          width: 'max-content',
        }}>
          {[...ARTISTS, ...ARTISTS].map((artist, i) => {
            const rotation = i % 2 === 0 ? -2 : 2.5
            const floatDelay = `${(i * 0.8) % 8}s`
            return (
              <div key={i} className="fv-artist-card" style={{
                flex: '0 0 auto',
                width: 'clamp(260px, 22vw, 335px)',
                transform: `rotate(${rotation}deg)`,
                transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
                animationDelay: floatDelay,
              }}>
                <div style={{
                  background: artist.bg,
                  borderRadius: '20px',
                  padding: '8px',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    borderRadius: '14px',
                    overflow: 'hidden',
                    aspectRatio: '3/4',
                  }}>
                    <img src={artist.img} alt={artist.name} style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }} />
                  </div>
                </div>
                <p style={{
                  fontFamily: "'futura-pt-condensed', sans-serif",
                  fontWeight: 800,
                  fontSize: TYPO.headlineSmall,
                  textTransform: 'uppercase',
                  color: '#154e85',
                  textAlign: 'center',
                  marginTop: '0.75rem',
                  letterSpacing: '-0.01em',
                }}>{artist.name}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="fv-reveal" style={{ textAlign: 'center', marginTop: '3rem' }}>
        <a href="#" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '1rem 2.5rem',
          border: '2px solid #f15c56',
          borderRadius: '100px',
          color: '#f15c56',
          fontWeight: 700,
          fontSize: TYPO.titleLarge,
          textDecoration: 'none',
          textTransform: 'uppercase',
          fontFamily: "'Metro Sans', sans-serif",
          transition: 'all 0.3s',
          background: 'transparent',
        }}
          onMouseEnter={e => { e.currentTarget.style.background = '#f15c56'; e.currentTarget.style.color = '#fef7de' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#f15c56' }}
        >
          <span className="fv-btn-label">VOIR LA PROGRAMMATION</span>
        </a>
      </div>
    </section>
  )
}
